#!/usr/bin/env node

/**
 * Activity model for audit trails and user history
 * This model tracks all significant actions in the system
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model";
import { ACTION_TYPE, ENTITY_TYPE, SEVERITY } from "../../utils/constants/activity.constants";

class Activity extends BaseModel {
  constructor() {
    const schemaDefinition = {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, // System actions may not have a user
        index: true,
      },
      action: {
        type: String,
        required: true,
        enum: Object.values(ACTION_TYPE),
        index: true,
      },
      entity_type: {
        type: String,
        required: true,
        enum: Object.values(ENTITY_TYPE),
        index: true,
      },
      entity_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Some actions may not have a specific entity
        index: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: false, // For filtering activities by event context
        index: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      severity: {
        type: String,
        enum: Object.values(SEVERITY),
        default: SEVERITY.INFO,
        index: true,
      },
      ip_address: {
        type: String,
        required: false,
        index: true,
      },
      user_agent: {
        type: String,
        required: false,
      },
      metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {},
      },
      changes: {
        type: {
          before: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
          },
          after: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
          },
        },
        required: false,
      },
      session_id: {
        type: String,
        required: false,
        index: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
        index: true,
      },
    };

    const options = {
      softDelete: false, // Activities should never be deleted (immutable audit log)
      timestamps: true,
    };

    super(schemaDefinition, options);

    // Create compound indexes for common queries
    this.schema.index({ user: 1, timestamp: -1 });
    this.schema.index({ event: 1, timestamp: -1 });
    this.schema.index({ entity_type: 1, entity_id: 1 });
    this.schema.index({ action: 1, timestamp: -1 });
    this.schema.index({ severity: 1, timestamp: -1 });
    this.schema.index({ timestamp: -1 }); // For time-series queries

    // Static method: Find user activity history
    this.schema.statics.findByUser = async function (userId, options = {}) {
      const query = this.find({ user: userId }).sort({ timestamp: -1 });
      if (options.limit) query.limit(options.limit);
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find activities by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ timestamp: -1 });
      if (options.limit) query.limit(options.limit);
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find activities by entity
    this.schema.statics.findByEntity = async function (entityType, entityId, options = {}) {
      const query = this.find({ entity_type: entityType, entity_id: entityId }).sort({
        timestamp: -1,
      });
      if (options.limit) query.limit(options.limit);
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find security events
    this.schema.statics.findSecurityEvents = async function (options = {}) {
      const query = this.find({
        $or: [
          { action: ACTION_TYPE.FAILED_LOGIN },
          { action: ACTION_TYPE.PERMISSION_CHANGE },
          { action: ACTION_TYPE.SUSPICIOUS_ACTIVITY },
          { severity: SEVERITY.CRITICAL },
          { severity: SEVERITY.ERROR },
        ],
      }).sort({ timestamp: -1 });

      if (options.limit) query.limit(options.limit);
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Get activity count by action
    this.schema.statics.getActionStatistics = async function (startDate, endDate) {
      return await this.aggregate([
        {
          $match: {
            timestamp: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: "$action",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]);
    };

    // Instance method: Serialize for API response
    this.schema.methods.deserialize = function (options = {}) {
      const obj = this.toObject();
      delete obj.__v;
      
      // Convert Map to plain object
      if (obj.metadata) {
        obj.metadata = Object.fromEntries(obj.metadata);
      }

      return obj;
    };
  }
}

export default new Activity().getModel("Activity");
