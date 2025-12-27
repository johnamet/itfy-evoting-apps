/* eslint-disable no-undef */
/**
 * ITFY E-Voting Backend Application
 * Main entry point - Sets up Express server with MongoDB and Agenda
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv, { configDotenv } from "dotenv";
import db from "./database/app.database.js"
import agendaManager from "./services/agenda.service.js";
import { healthService } from "./services/health.service.js";
import cache from "./utils/cache/cache.utils.js";
import router from "./routes/app.routes.js";
import { setupAPIDocs } from "./config/swagger.config.js";
import BaseController from "./modules/shared/base.controller.js";
import Joi from "joi";

// Load environment variables
dotenv.config();

configDotenv();

BaseController.setValidation(Joi)

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static file serving for uploads
app.use("/uploads", express.static("uploads"));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// ========================================
// API DOCUMENTATION
// ========================================
setupAPIDocs(app);


// ========================================
// ROUTES
// ========================================

// Quick health check (for load balancers, etc.)
app.get("/api/v1/health", async (req, res) => {
  const health = await healthService.getQuickHealth();
  res.json(health);
});

// Comprehensive system health check
app.get("/api/v1/health/detailed", async (req, res) => {
  try {
    const health = await healthService.getSystemHealth();
    const statusCode = health.status === "healthy" ? 200 : 
                       health.status === "degraded" ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// API routes
app.use("/api/v1", (req, res, next) => {
  res.setHeader("X-Powered-By", "ITFY E-Voting");
  next();
});

app.use("/api/v1", router);



app.use("/api/v1/", (req, res) =>{
  res.json({
    message: "Welcome to the ITFY E-Voting API v1\nVisit /api/v1/health to check server status.",
    api_routes: {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      events: "/api/v1/events",
      categories: "/api/v1/categories",
      candidates: "/api/v1/candidates",
      votes: "/api/v1/votes",
      bundles: "/api/v1/bundles",
      payments: "/api/v1/payments",
      notifications: "/api/v1/notifications",
    },
    api_routes_docs: {
      swagger_ui: "/api-docs",
      redoc: "/api-docs/redoc",
    },
  });
})


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ========================================
// SERVER INITIALIZATION
// ========================================

async function startServer() {
  try {
    // 1. Connect to MongoDB
    console.log("🔌 Connecting to MongoDB...");
    await db.connect();
    console.log("✅ MongoDB connected successfully");

    // 2. Connect to Redis cache
    console.log("🔌 Connecting to Redis cache...");
    await cache.connect();
    console.log("✅ Cache connected successfully");

    // 3. Initialize Agenda job queue
    console.log("🔌 Initializing Agenda.js...");
    await agendaManager.initialize();
    console.log("✅ Agenda.js initialized successfully");

    // 4. Setup recurring tasks
    console.log("⚙️ Setting up recurring tasks...");
    await agendaManager.setupRecurringTasks();
    console.log("✅ Recurring tasks configured");

    // 5. Start Express server
    app.listen(PORT, () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`🚀 ITFY E-Voting Server is running`);
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

async function gracefulShutdown(signal) {
  console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);

  try {
    // Stop accepting new requests
    console.log("🛑 Stopping Express server...");
    // server.close() if you have a server reference

    // Stop Agenda job processing
    console.log("🛑 Stopping Agenda.js...");
    await agendaManager.stop();

    // Close database connection
    console.log("🛑 Closing MongoDB connection...");
    const mongoose = await import("mongoose");
    await mongoose.default.connection.close();

    // Close cache connection
    console.log("🛑 Closing cache connection...");
    await cache.disconnect();

    console.log("✅ Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
}

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

// Start the server
startServer();

export default app;
