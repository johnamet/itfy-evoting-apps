/**
 * Notification Model
 * This file defines the Notification schema and model for managing user notifications
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model";
import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_STATUS,
  NOTIFICATION_PRIORITY,
} from "../../utils/constants/notification.constants";

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    // Recipient
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },

    // Notification details
    type: {
      type: String,
      enum: Object.values(NOTIFICATION_TYPE),
      required: [true, "Notification type is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },

    // Delivery channel
    channel: {
      type: String,
      enum: Object.values(NOTIFICATION_CHANNEL),
      default: NOTIFICATION_CHANNEL.IN_APP,
      index: true,
    },

    // Status tracking
    status: {
      type: String,
      enum: Object.values(NOTIFICATION_STATUS),
      default: NOTIFICATION_STATUS.PENDING,
      index: true,
    },

    priority: {
      type: String,
      enum: Object.values(NOTIFICATION_PRIORITY),
      default: NOTIFICATION_PRIORITY.NORMAL,
      index: true,
    },

    // Related entities
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: null,
      index: true,
    },

    candidate: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      default: null,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    vote: {
      type: Schema.Types.ObjectId,
      ref: "Vote",
      default: null,
    },

    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    form: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      default: null,
    },

    submission: {
      type: Schema.Types.ObjectId,
      ref: "FormSubmission",
      default: null,
    },

    // Action metadata
    action_url: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^\/[a-zA-Z0-9\-_\/]*$/.test(v);
        },
        message: "Action URL must be a valid path starting with /",
      },
    },

    action_text: {
      type: String,
      trim: true,
      maxlength: [50, "Action text cannot exceed 50 characters"],
      default: null,
    },

    // Additional metadata
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },

    // Tracking fields
    sent_at: {
      type: Date,
      default: null,
      index: true,
    },

    read_at: {
      type: Date,
      default: null,
      index: true,
    },

    clicked_at: {
      type: Date,
      default: null,
    },

    // Email-specific fields
    email_to: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    email_subject: {
      type: String,
      trim: true,
      default: null,
    },

    email_provider_id: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },

    email_template_id: {
      type: String,
      trim: true,
      default: null,
    },

    // SMS-specific fields
    sms_to: {
      type: String,
      trim: true,
      default: null,
    },

    sms_provider_id: {
      type: String,
      trim: true,
      default: null,
    },

    // Batch support
    batch_id: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },

    // Error tracking
    error_message: {
      type: String,
      trim: true,
      default: null,
    },

    retry_count: {
      type: Number,
      default: 0,
      min: 0,
    },

    max_retries: {
      type: Number,
      default: 3,
      min: 0,
    },

    next_retry_at: {
      type: Date,
      default: null,
    },

    // Expiration
    expires_at: {
      type: Date,
      default: null,
      index: true,
    },

    // Soft delete and timestamps (handled by BaseModel)
  },
  {
    timestamps: false, // Using manual timestamps from BaseModel
  }
);

// ==================== Indexes ====================

// Compound indexes for common queries
NotificationSchema.index({ user: 1, status: 1, created_at: -1 });
NotificationSchema.index({ user: 1, read_at: 1, created_at: -1 });
NotificationSchema.index({ user: 1, type: 1, created_at: -1 });
NotificationSchema.index({ batch_id: 1, status: 1 });
NotificationSchema.index({ channel: 1, status: 1, sent_at: 1 });
NotificationSchema.index({ priority: 1, status: 1, created_at: 1 });
NotificationSchema.index({ expires_at: 1 }, { sparse: true });

// ==================== Virtual Properties ====================

NotificationSchema.virtual("isRead").get(function () {
  return this.read_at !== null;
});

NotificationSchema.virtual("isClicked").get(function () {
  return this.clicked_at !== null;
});

NotificationSchema.virtual("isSent").get(function () {
  return this.sent_at !== null;
});

NotificationSchema.virtual("isExpired").get(function () {
  if (!this.expires_at) return false;
  return new Date() > this.expires_at;
});

NotificationSchema.virtual("canRetry").get(function () {
  return (
    this.status === NOTIFICATION_STATUS.FAILED &&
    this.retry_count < this.max_retries &&
    (!this.next_retry_at || new Date() >= this.next_retry_at)
  );
});

NotificationSchema.virtual("timeToRead").get(function () {
  if (!this.read_at || !this.sent_at) return null;
  return Math.round((this.read_at - this.sent_at) / 1000); // seconds
});

NotificationSchema.virtual("timeToClick").get(function () {
  if (!this.clicked_at || !this.sent_at) return null;
  return Math.round((this.clicked_at - this.sent_at) / 1000); // seconds
});

// ==================== Static Methods ====================

/**
 * Find unread notifications for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @param {number} [limit=20] - Limit
 * @returns {Promise<Array>} - Unread notifications
 */
NotificationSchema.statics.findUnread = async function (userId, limit = 20) {
  return await this.find({
    user: userId,
    read_at: null,
    deleted_at: null,
  })
    .sort({ created_at: -1 })
    .limit(limit)
    .lean();
};

/**
 * Get unread count for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @returns {Promise<number>} - Unread count
 */
NotificationSchema.statics.getUnreadCount = async function (userId) {
  return await this.countDocuments({
    user: userId,
    read_at: null,
    deleted_at: null,
  });
};

/**
 * Find notifications by type for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @param {string} type - Notification type
 * @param {number} [limit=20] - Limit
 * @returns {Promise<Array>} - Notifications
 */
NotificationSchema.statics.findByType = async function (userId, type, limit = 20) {
  return await this.find({
    user: userId,
    type,
    deleted_at: null,
  })
    .sort({ created_at: -1 })
    .limit(limit)
    .lean();
};

/**
 * Find notifications by channel
 * @param {string} channel - Channel
 * @param {string} status - Status
 * @param {number} [limit=100] - Limit
 * @returns {Promise<Array>} - Notifications
 */
NotificationSchema.statics.findByChannel = async function (channel, status, limit = 100) {
  const query = {
    channel,
    deleted_at: null,
  };

  if (status) query.status = status;

  return await this.find(query).sort({ created_at: -1 }).limit(limit).lean();
};

/**
 * Find pending notifications for delivery
 * @param {string} channel - Channel
 * @param {number} [limit=100] - Limit
 * @returns {Promise<Array>} - Pending notifications
 */
NotificationSchema.statics.findPendingForDelivery = async function (channel, limit = 100) {
  return await this.find({
    channel,
    status: { $in: [NOTIFICATION_STATUS.PENDING, NOTIFICATION_STATUS.QUEUED] },
    deleted_at: null,
  })
    .sort({ priority: -1, created_at: 1 })
    .limit(limit);
};

/**
 * Find notifications ready for retry
 * @param {number} [limit=50] - Limit
 * @returns {Promise<Array>} - Notifications to retry
 */
NotificationSchema.statics.findReadyForRetry = async function (limit = 50) {
  const now = new Date();

  return await this.find({
    status: NOTIFICATION_STATUS.FAILED,
    retry_count: { $lt: this.schema.path("max_retries").default(3) },
    $or: [{ next_retry_at: null }, { next_retry_at: { $lte: now } }],
    deleted_at: null,
  })
    .sort({ priority: -1, created_at: 1 })
    .limit(limit);
};

/**
 * Get notification statistics for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @returns {Promise<Object>} - Statistics
 */
NotificationSchema.statics.getUserStatistics = async function (userId) {
  const [stats] = await this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId), deleted_at: null } },
    {
      $facet: {
        total: [{ $count: "count" }],
        unread: [{ $match: { read_at: null } }, { $count: "count" }],
        read: [{ $match: { read_at: { $ne: null } } }, { $count: "count" }],
        clicked: [{ $match: { clicked_at: { $ne: null } } }, { $count: "count" }],
        byType: [
          {
            $group: {
              _id: "$type",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
        ],
        byChannel: [
          {
            $group: {
              _id: "$channel",
              count: { $sum: 1 },
            },
          },
        ],
        byPriority: [
          {
            $group: {
              _id: "$priority",
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
  ]);

  return {
    total: stats?.total[0]?.count || 0,
    unread: stats?.unread[0]?.count || 0,
    read: stats?.read[0]?.count || 0,
    clicked: stats?.clicked[0]?.count || 0,
    byType: stats?.byType || [],
    byChannel: stats?.byChannel || [],
    byPriority: stats?.byPriority || [],
  };
};

/**
 * Get system-wide notification statistics
 * @returns {Promise<Object>} - System statistics
 */
NotificationSchema.statics.getSystemStatistics = async function () {
  const [stats] = await this.aggregate([
    { $match: { deleted_at: null } },
    {
      $facet: {
        total: [{ $count: "count" }],
        byStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],
        byChannel: [
          {
            $group: {
              _id: "$channel",
              count: { $sum: 1 },
            },
          },
        ],
        byPriority: [
          {
            $group: {
              _id: "$priority",
              count: { $sum: 1 },
            },
          },
        ],
        deliveryRate: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              sent: {
                $sum: {
                  $cond: [{ $ne: ["$sent_at", null] }, 1, 0],
                },
              },
              delivered: {
                $sum: {
                  $cond: [{ $eq: ["$status", NOTIFICATION_STATUS.DELIVERED] }, 1, 0],
                },
              },
              failed: {
                $sum: {
                  $cond: [{ $eq: ["$status", NOTIFICATION_STATUS.FAILED] }, 1, 0],
                },
              },
            },
          },
        ],
      },
    },
  ]);

  const deliveryData = stats?.deliveryRate[0] || {};
  const total = deliveryData.total || 0;

  return {
    total,
    byStatus: stats?.byStatus || [],
    byChannel: stats?.byChannel || [],
    byPriority: stats?.byPriority || [],
    deliveryRate: total > 0 ? Math.round((deliveryData.delivered / total) * 10000) / 100 : 0,
    failureRate: total > 0 ? Math.round((deliveryData.failed / total) * 10000) / 100 : 0,
  };
};

// ==================== Instance Methods ====================

/**
 * Mark notification as read
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsRead = async function () {
  if (this.read_at) return this;

  this.read_at = new Date();
  if (this.status === NOTIFICATION_STATUS.SENT || this.status === NOTIFICATION_STATUS.DELIVERED) {
    this.status = NOTIFICATION_STATUS.READ;
  }

  return await this.save();
};

/**
 * Mark notification as clicked
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsClicked = async function () {
  if (this.clicked_at) return this;

  this.clicked_at = new Date();
  if (!this.read_at) {
    this.read_at = new Date();
  }
  this.status = NOTIFICATION_STATUS.CLICKED;

  return await this.save();
};

/**
 * Mark notification as sent
 * @param {string} [providerId] - Provider ID
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsSent = async function (providerId = null) {
  this.status = NOTIFICATION_STATUS.SENT;
  this.sent_at = new Date();

  if (providerId) {
    if (this.channel === NOTIFICATION_CHANNEL.EMAIL) {
      this.email_provider_id = providerId;
    } else if (this.channel === NOTIFICATION_CHANNEL.SMS) {
      this.sms_provider_id = providerId;
    }
  }

  return await this.save();
};

/**
 * Mark notification as delivered
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsDelivered = async function () {
  this.status = NOTIFICATION_STATUS.DELIVERED;
  if (!this.sent_at) {
    this.sent_at = new Date();
  }

  return await this.save();
};

/**
 * Mark notification as failed
 * @param {string} errorMessage - Error message
 * @param {boolean} [shouldRetry=true] - Whether to schedule retry
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsFailed = async function (errorMessage, shouldRetry = true) {
  this.status = NOTIFICATION_STATUS.FAILED;
  this.error_message = errorMessage;

  if (shouldRetry && this.retry_count < this.max_retries) {
    this.retry_count += 1;
    // Exponential backoff: 5 min, 15 min, 45 min
    const delayMinutes = Math.pow(3, this.retry_count) * 5;
    this.next_retry_at = new Date(Date.now() + delayMinutes * 60 * 1000);
  }

  return await this.save();
};

/**
 * Queue notification for delivery
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.queue = async function () {
  this.status = NOTIFICATION_STATUS.QUEUED;
  return await this.save();
};

/**
 * Check if notification should be sent
 * @returns {boolean} - Whether notification should be sent
 */
NotificationSchema.methods.shouldSend = function () {
  if (this.deleted_at) return false;
  if (this.isExpired) return false;
  if (this.status !== NOTIFICATION_STATUS.PENDING && this.status !== NOTIFICATION_STATUS.QUEUED) {
    return false;
  }
  return true;
};

// ==================== Middleware ====================

/**
 * Pre-save hook to handle auto-expiration
 */
NotificationSchema.pre("save", function (next) {
  // Auto-set expiration for certain types (30 days for most notifications)
  if (!this.expires_at && this.isNew) {
    const expirationDays = this.priority === NOTIFICATION_PRIORITY.URGENT ? 90 : 30;
    this.expires_at = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
  }

  // Set email details if channel is email
  if (this.channel === NOTIFICATION_CHANNEL.EMAIL && !this.email_subject) {
    this.email_subject = this.title;
  }

  next();
});

// ==================== Export Model ====================

class NotificationModel extends BaseModel {
  constructor() {
    super("notification", NotificationSchema);
  }
}

export default new NotificationModel().getModel("Notification");
