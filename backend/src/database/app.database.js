/* eslint-disable no-undef */
/**
 * Database Configuration & Connection Manager
 * Centralizes MongoDB connection, model registration, and health checks
 * Supports: connection pooling, retries, graceful shutdown, health endpoint, cache integration
 */

import mongoose from "mongoose";
import cache from "../utils/cache/cache.utils.js";

// Import all models
import userModel from "../modules/user/user.model.js";
import eventModel from "../modules/event/event.model.js";
import candidateModel from "../modules/candidate/candidate.model.js";
import categoryModel from "../modules/category/category.model.js";
import voteModel from "../modules/vote/vote/vote.model.js";
import bundleModel from "../modules/vote/bundle/bundle.model.js";
import couponModel from "../modules/vote/coupon/coupon.model.js";
import paymentModel from "../modules/payment/payment.model.js";
import formModel from "../modules/form/form.model.js";
import submissionModel from "../modules/form/submission.model.js";
import slideModel from "../modules/slide/slide.model.js";
import notificationModel from "../modules/notification/notification.model.js";
import activityModel from "../modules/activity/activity.model.js";

class DatabaseManager {
  constructor() {
    this.isConnected = false;
    this.connectionRetries = 0;
    this.maxRetries = parseInt(process.env.DB_MAX_RETRIES, 10) || 5;
    this.retryDelayMs = parseInt(process.env.DB_RETRY_DELAY_MS, 10) || 5000;
    this.models = new Map();
  }

  /**
   * Initialize database connection with retry logic
   */
  async connect() {
    if (this.isConnected) {
      console.log("MongoDB already connected.");
      return;
    }

    const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/itfy-evoting";

    const mongooseOptions = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      autoIndex: process.env.NODE_ENV !== "production", // Disable in prod
      connectTimeoutMS: 10000,
    };

    try {
      console.log(`Connecting to MongoDB... (${dbUri.replace(/mongodb:\/\/[^@]+@/, "mongodb://***@")})`);

      await mongoose.connect(dbUri, mongooseOptions);

      this.isConnected = true;
      this.connectionRetries = 0;

      this._registerModels();
      this._setupEventListeners();

      // Connect cache after database
      await this._connectCache();

      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);

      if (this.connectionRetries < this.maxRetries) {
        this.connectionRetries++;
        console.log(`Retrying connection in ${this.retryDelayMs / 1000}s... (Attempt ${this.connectionRetries}/${this.maxRetries})`);
        setTimeout(() => this.connect(), this.retryDelayMs);
      } else {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
    }
  }

  /**
   * Register all models with BaseModel behavior
   * @private
   */
  _registerModels() {
    const modelRegistry = [
      { name: "User", model: userModel },
      { name: "Event", model: eventModel },
      { name: "Candidate", model: candidateModel },
      { name: "Category", model: categoryModel },
      { name: "Vote", model: voteModel },
      { name: "Bundle", model: bundleModel },
      { name: "Coupon", model: couponModel },
      { name: "Payment", model: paymentModel },
      { name: "Form", model: formModel },
      { name: "FormSubmission", model: submissionModel },
      { name: "Slide", model: slideModel },
      { name: "Notification", model: notificationModel },
      { name: "Activity", model: activityModel },
    ];

    modelRegistry.forEach(({ name, model }) => {
      if (model && model.modelName) {
        this.models.set(name, model);
        console.log(`Model registered: ${name}`);
      } else {
        console.warn(`Warning: Model ${name} is not valid or not exported correctly`);
      }
    });

    // Apply BaseModel global query helpers
    this._applyGlobalQueryHelpers();
  }

  /**
   * Apply soft-delete bypass and default filters globally
   * @private
   */
  _applyGlobalQueryHelpers() {
    // Soft delete helper
    mongoose.Query.prototype.softDelete = function () {
      return this.findOneAndUpdate(
        {},
        { deleted_at: new Date() },
        { new: true }
      );
    };

    // Auto-exclude soft-deleted unless includeDeleted flag is set
    const originalExec = mongoose.Query.prototype.exec;
    mongoose.Query.prototype.exec = async function (...args) {
      if (!this._includeDeleted && !this.op?.includes("aggregate")) {
        // Only apply filter if deleted_at field exists in schema
        const schema = this.model?.schema;
        if (schema && schema.path("deleted_at")) {
          this.where({ deleted_at: null });
        }
      }
      return originalExec.apply(this, args);
    };
  }

  /**
   * Connect to cache system
   * @private
   */
  async _connectCache() {
    try {
      await cache.connect();
      console.log("Cache system initialized");
    } catch (error) {
      console.warn("Cache connection failed (non-critical):", error.message);
    }
  }

  /**
   * Setup Mongoose event listeners
   * @private
   */
  _setupEventListeners() {
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("Mongoose connected to MongoDB");
      this.isConnected = true;
    });

    db.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      this.isConnected = false;
    });

    db.on("disconnected", () => {
      console.warn("Mongoose disconnected from MongoDB");
      this.isConnected = false;
    });

    db.on("reconnected", () => {
      console.log("Mongoose reconnected");
      this.isConnected = true;
    });

    // Graceful shutdown
    process.on("SIGINT", () => this.gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => this.gracefulShutdown("SIGTERM"));
  }

  /**
   * Graceful shutdown with connection close
   * @param {string} signal
   */
  async gracefulShutdown(signal) {
    console.log(`Received ${signal}. Closing MongoDB connection...`);
    try {
      // Close cache connection
      await cache.disconnect();
      console.log("Cache disconnected");

      // Close database connection
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
  }

  /**
   * Health check endpoint
   * @returns {Promise<{ status: string, db: string, cache: string, uptime: number }>}
   */
  async healthCheck() {
    const uptime = process.uptime();

    if (!this.isConnected) {
      return {
        status: "unhealthy",
        db: "disconnected",
        cache: "unknown",
        uptime,
        error: "Database not connected",
      };
    }

    try {
      // Ping MongoDB
      await mongoose.connection.db.admin().ping();
      
      // Check cache health
      const cacheHealth = await cache.health();

      return {
        status: "healthy",
        db: "connected",
        cache: cacheHealth.status,
        uptime,
        models: Array.from(this.models.keys()),
        cacheStore: cacheHealth.store,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        db: "error",
        cache: "unknown",
        uptime,
        error: error.message,
      };
    }
  }

  /**
   * Get registered model by name
   * @param {string} name
   * @returns {mongoose.Model|null}
   */
  getModel(name) {
    return this.models.get(name) || null;
  }

  /**
   * Get all registered model names
   * @returns {string[]}
   */
  getModelNames() {
    return Array.from(this.models.keys());
  }

  /**
   * Start a transaction session
   * @returns {Promise<mongoose.ClientSession>}
   */
  async startSession() {
    if (!this.isConnected) {
      throw new Error("Database not connected. Cannot start session.");
    }
    return await mongoose.startSession();
  }

  /**
   * Execute a callback within a transaction
   * @param {Function} callback - Async function with session parameter
   * @returns {Promise<any>} - Result of callback
   */
  async transaction(callback) {
    const session = await this.startSession();
    session.startTransaction();
    try {
      const result = await callback(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Reset connection (for testing)
   */
  async reset() {
    if (process.env.NODE_ENV !== "test") {
      throw new Error("Database reset only allowed in test environment");
    }
    
    // Flush cache
    await cache.flush();
    
    // Drop database
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    
    this.isConnected = false;
    this.models.clear();
  }

  /**
   * Seed database with initial data (for development)
   * @returns {Promise<void>}
   */
  async seed() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Seeding not allowed in production");
    }
    
    console.log("Database seeding should be done via separate seed scripts");
    console.log("Run: npm run seed");
  }

  /**
   * Get database statistics
   * @returns {Promise<Object>}
   */
  async getStats() {
    if (!this.isConnected) {
      return { error: "Database not connected" };
    }

    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      
      // Get collection counts
      const collections = {};
      for (const [name, model] of this.models) {
        try {
          const count = await model.countDocuments();
          collections[name] = count;
        } catch (err) {
          collections[name] = "error";
        }
      }

      return {
        database: stats.db,
        collections: stats.collections,
        dataSize: stats.dataSize,
        indexSize: stats.indexSize,
        storageSize: stats.storageSize,
        documentCounts: collections,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}

// Export singleton instance
export const db = new DatabaseManager();
export default db;
