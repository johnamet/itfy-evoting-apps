/**
 * The base model for all models
 * This file defines a reusable base model that can be extended by other models
 * It contains common methods, fields, and hooks for consistency across the application
 */

import mongoose from "mongoose";

/**
 * @typedef {Object} BaseSchemaOptions
 * @property {boolean} [softDelete=true] - Enable soft delete functionality
 * // Removed timestamps option to avoid duplication; using manual fields
 */

/**
 * @class BaseModel
 * @abstract
 */
export class BaseModel {
  constructor(schemaDefinition, options = {}) {
    if (new.target === BaseModel) {
      throw new Error("BaseModel is an abstract class and cannot be instantiated directly");
    }

    this.schemaDefinition = schemaDefinition;
    this.options = {
      softDelete: true,
      ...options,
      timestamps: false,  // Force false to use manual snake_case fields
    };

    const baseSchema = {
      ...this.schemaDefinition,
      created_at: {
        type: Date,
        default: Date.now,
        immutable: true,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      },
      deleted_at: {
        type: Date,
        default: null,
      },
    };

    this.schema = new mongoose.Schema(baseSchema, this.options);

    // Pre-save hook with error handling (manual timestamp update)
    this.schema.pre("save", function (next) {
      try {
        if (!this.isNew && this.deleted_at) {
          return next(new Error("Cannot update a deleted document"));
        }
        this.updated_at = Date.now();
        next();
      } catch (error) {
        next(error);
      }
    });

    // Conditional soft-delete middleware
    if (this.options.softDelete) {
      const softDeleteFilter = function () {
        if (!this._includeDeleted) {
          this.where({ deleted_at: null });
        }
      };

      this.schema.pre("find", softDeleteFilter);
      this.schema.pre("findOne", softDeleteFilter);
      this.schema.pre("updateMany", softDeleteFilter);
      this.schema.pre("updateOne", softDeleteFilter);
      this.schema.pre("findOneAndUpdate", softDeleteFilter);
      this.schema.pre("countDocuments", softDeleteFilter);  // Added for count accuracy
    }

    // Static: Find all with pagination
    this.schema.statics.findAll = async function (filters = {}, page = 1, limit = 10, options = {}) {
      try {
        const skip = (page - 1) * limit;
        const query = this.find(filters).skip(skip).limit(limit);

        if (options.includeDeleted) {
          query._includeDeleted = true;  // Bypass soft-delete
        }

        const data = await query.select(options.select).lean(options.lean).exec();
        const total = await this.countDocuments(filters).exec();  // Note: Doesn't bypass yet; fix if needed

        return {
          data,
          metadata: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        };
      } catch (error) {
        throw new Error(`Find all failed: ${error.message}`);
      }
    };

    // Static: Soft delete a document
    this.schema.statics.softDelete = async function (id) {
      try {
        return await this.findByIdAndUpdate(id, { deleted_at: Date.now() }, { new: true }).exec();
      } catch (error) {
        throw new Error(`Soft delete failed: ${error.message}`);
      }
    };

    // Static: Restore a soft-deleted document
    this.schema.statics.restore = async function (id) {
      try {
        const query = this.findByIdAndUpdate(id, { deleted_at: null }, { new: true });
        query._includeDeleted = true;  // Bypass filter to find deleted doc
        const doc = await query.exec();
        if (!doc) return null;
        if (!doc.deleted_at) throw new Error('Document is not deleted');  // Check post-restore
        return doc;
      } catch (error) {
        throw new Error(`Restore failed: ${error.message}`);
      }
    };

    // Static: Hard delete a document permanently
    this.schema.statics.forceDelete = async function (id) {
      try {
        const query = this.findByIdAndDelete(id);
        query._includeDeleted = true;  // Allow deleting deleted docs
        return await query.exec();
      } catch (error) {
        throw new Error(`Force delete failed: ${error.message}`);
      }
    };

    // Static: Execute a callback within a Mongoose transaction
    this.schema.statics.transaction = async function (callback) {
      const session = await mongoose.startSession();
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
    };

    // Instance method: Deserialize with options
    this.schema.methods.deserialize = function (options = {}) {
      const obj = this.toObject();
      delete obj.__v;

      const excludeFields = options.exclude || ['password_hash', 'deleted_at'];
      excludeFields.forEach(field => {
        if (obj[field] !== undefined) delete obj[field];
      });

      return obj;
    };

    // Virtual: isDeleted status
    this.schema.virtual("isDeleted").get(function () {
      return !!this.deleted_at;
    });
  }

  /**
   * Get the Mongoose model
   * @param {string} modelName - Name of the model
   * @returns {mongoose.Model} Mongoose model
   */
  getModel(modelName) {
    return mongoose.model(modelName, this.schema);
  }
}