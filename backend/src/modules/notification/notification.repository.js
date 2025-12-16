/**
 * Notification Repository
 * This file defines the NotificationRepository class which extends the BaseRepository
 * It contains notification-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository";
import NotificationModel from "../models/notification.model";
import {
  NOTIFICATION_STATUS,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from "../../utils/constants/notification.constants";

class NotificationRepository extends BaseRepository {
  constructor() {
    super(NotificationModel);
  }

  /**
   * Create a new notification
   * @param {Object} notificationData - Notification data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created notification
   */
  async create(notificationData, options = {}) {
    try {
      // Validate required fields
      if (!notificationData.user) {
        throw new Error("User is required");
      }
      if (!notificationData.type) {
        throw new Error("Notification type is required");
      }
      if (!notificationData.title) {
        throw new Error("Notification title is required");
      }
      if (!notificationData.message) {
        throw new Error("Notification message is required");
      }

      return await super.create(notificationData, options);
    } catch (error) {
      throw new Error(`Create notification failed: ${error.message}`);
    }
  }

  /**
   * Update a notification
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @param {Object} updates - Update data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Updated notification
   */
  async update(notificationId, updates, options = {}) {
    try {
      return await this.updateById(notificationId, updates, options);
    } catch (error) {
      throw new Error(`Update notification failed: ${error.message}`);
    }
  }

  /**
   * Soft delete a notification
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Deleted notification
   */
  async delete(notificationId, options = {}) {
    try {
      return await super.delete({ _id: notificationId }, options);
    } catch (error) {
      throw new Error(`Delete notification failed: ${error.message}`);
    }
  }

  /**
   * Restore a soft-deleted notification
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Restored notification
   */
  async restore(notificationId, options = {}) {
    try {
      return await super.restore({ _id: notificationId }, options);
    } catch (error) {
      throw new Error(`Restore notification failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a notification
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Force deleted notification
   */
  async forceDelete(notificationId, options = {}) {
    try {
      return await super.forceDelete({ _id: notificationId }, options);
    } catch (error) {
      throw new Error(`Force delete notification failed: ${error.message}`);
    }
  }

  /**
   * Find notifications for a user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated notifications
   */
  async findByUser(userId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll({ user: userId }, page, limit, {
        ...options,
        sort: { created_at: -1 },
      });
    } catch (error) {
      throw new Error(`Find notifications by user failed: ${error.message}`);
    }
  }

  /**
   * Find unread notifications for a user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {number} [limit=20] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Unread notifications
   */
  async findUnread(userId, limit = 20, options = {}) {
    try {
      const query = this.model
        .find({
          user: userId,
          read_at: null,
          deleted_at: null,
        })
        .sort({ created_at: -1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find unread notifications failed: ${error.message}`);
    }
  }

  /**
   * Get unread count for a user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @returns {Promise<number>} - Unread count
   */
  async getUnreadCount(userId) {
    try {
      return await this.model.countDocuments({
        user: userId,
        read_at: null,
        deleted_at: null,
      });
    } catch (error) {
      throw new Error(`Get unread count failed: ${error.message}`);
    }
  }

  /**
   * Mark notification as read
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @returns {Promise<Object>} - Updated notification
   */
  async markAsRead(notificationId) {
    try {
      const notification = await this.model.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      return await notification.markAsRead();
    } catch (error) {
      throw new Error(`Mark notification as read failed: ${error.message}`);
    }
  }

  /**
   * Mark notification as clicked
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @returns {Promise<Object>} - Updated notification
   */
  async markAsClicked(notificationId) {
    try {
      const notification = await this.model.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      return await notification.markAsClicked();
    } catch (error) {
      throw new Error(`Mark notification as clicked failed: ${error.message}`);
    }
  }

  /**
   * Mark all notifications as read for a user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @returns {Promise<Object>} - Update result
   */
  async markAllAsRead(userId) {
    try {
      const now = new Date();
      const result = await this.model.updateMany(
        {
          user: userId,
          read_at: null,
          deleted_at: null,
        },
        {
          $set: {
            read_at: now,
            status: NOTIFICATION_STATUS.READ,
          },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Mark all as read failed: ${error.message}`);
    }
  }

  /**
   * Mark notification as sent
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @param {string} [providerId] - Provider ID
   * @returns {Promise<Object>} - Updated notification
   */
  async markAsSent(notificationId, providerId = null) {
    try {
      const notification = await this.model.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      return await notification.markAsSent(providerId);
    } catch (error) {
      throw new Error(`Mark notification as sent failed: ${error.message}`);
    }
  }

  /**
   * Mark notification as delivered
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @returns {Promise<Object>} - Updated notification
   */
  async markAsDelivered(notificationId) {
    try {
      const notification = await this.model.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      return await notification.markAsDelivered();
    } catch (error) {
      throw new Error(`Mark notification as delivered failed: ${error.message}`);
    }
  }

  /**
   * Mark notification as failed
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @param {string} errorMessage - Error message
   * @param {boolean} [shouldRetry=true] - Whether to schedule retry
   * @returns {Promise<Object>} - Updated notification
   */
  async markAsFailed(notificationId, errorMessage, shouldRetry = true) {
    try {
      const notification = await this.model.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      return await notification.markAsFailed(errorMessage, shouldRetry);
    } catch (error) {
      throw new Error(`Mark notification as failed failed: ${error.message}`);
    }
  }

  /**
   * Queue notification for delivery
   * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
   * @returns {Promise<Object>} - Updated notification
   */
  async queue(notificationId) {
    try {
      const notification = await this.model.findById(notificationId);

      if (!notification) {
        throw new Error("Notification not found");
      }

      return await notification.queue();
    } catch (error) {
      throw new Error(`Queue notification failed: ${error.message}`);
    }
  }

  /**
   * Find notifications by type for a user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string} type - Notification type
   * @param {number} [limit=20] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Notifications
   */
  async findByType(userId, type, limit = 20, options = {}) {
    try {
      if (!Object.values(NOTIFICATION_TYPE).includes(type)) {
        throw new Error(`Invalid notification type: ${type}`);
      }

      const query = this.model
        .find({
          user: userId,
          type,
          deleted_at: null,
        })
        .sort({ created_at: -1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find notifications by type failed: ${error.message}`);
    }
  }

  /**
   * Find notifications by channel
   * @param {string} channel - Channel
   * @param {string} [status] - Optional status filter
   * @param {number} [limit=100] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Notifications
   */
  async findByChannel(channel, status = null, limit = 100, options = {}) {
    try {
      if (!Object.values(NOTIFICATION_CHANNEL).includes(channel)) {
        throw new Error(`Invalid channel: ${channel}`);
      }

      const query = {
        channel,
        deleted_at: null,
      };

      if (status) {
        if (!Object.values(NOTIFICATION_STATUS).includes(status)) {
          throw new Error(`Invalid status: ${status}`);
        }
        query.status = status;
      }

      const queryBuilder = this.model.find(query).sort({ created_at: -1 }).limit(limit);

      this._applyOptions(queryBuilder, options);
      return await queryBuilder.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find notifications by channel failed: ${error.message}`);
    }
  }

  /**
   * Find notifications by priority
   * @param {string} priority - Priority
   * @param {string} [status] - Optional status filter
   * @param {number} [limit=100] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Notifications
   */
  async findByPriority(priority, status = null, limit = 100, options = {}) {
    try {
      if (!Object.values(NOTIFICATION_PRIORITY).includes(priority)) {
        throw new Error(`Invalid priority: ${priority}`);
      }

      const query = {
        priority,
        deleted_at: null,
      };

      if (status) query.status = status;

      const queryBuilder = this.model.find(query).sort({ created_at: -1 }).limit(limit);

      this._applyOptions(queryBuilder, options);
      return await queryBuilder.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find notifications by priority failed: ${error.message}`);
    }
  }

  /**
   * Find pending notifications for delivery
   * @param {string} channel - Channel
   * @param {number} [limit=100] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Pending notifications
   */
  async findPendingForDelivery(channel, limit = 100, options = {}) {
    try {
      if (!Object.values(NOTIFICATION_CHANNEL).includes(channel)) {
        throw new Error(`Invalid channel: ${channel}`);
      }

      const query = this.model
        .find({
          channel,
          status: { $in: [NOTIFICATION_STATUS.PENDING, NOTIFICATION_STATUS.QUEUED] },
          deleted_at: null,
        })
        .sort({ priority: -1, created_at: 1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.exec();
    } catch (error) {
      throw new Error(`Find pending notifications failed: ${error.message}`);
    }
  }

  /**
   * Find notifications ready for retry
   * @param {number} [limit=50] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Notifications to retry
   */
  async findReadyForRetry(limit = 50, options = {}) {
    try {
      const now = new Date();

      const query = this.model
        .find({
          status: NOTIFICATION_STATUS.FAILED,
          retry_count: { $lt: 3 },
          $or: [{ next_retry_at: null }, { next_retry_at: { $lte: now } }],
          deleted_at: null,
        })
        .sort({ priority: -1, created_at: 1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.exec();
    } catch (error) {
      throw new Error(`Find notifications for retry failed: ${error.message}`);
    }
  }

  /**
   * Find expired notifications
   * @param {number} [limit=100] - Limit
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Expired notifications
   */
  async findExpired(limit = 100, options = {}) {
    try {
      const now = new Date();

      const query = this.model
        .find({
          expires_at: { $lt: now },
          deleted_at: null,
        })
        .sort({ expires_at: 1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find expired notifications failed: ${error.message}`);
    }
  }

  /**
   * Find notifications by event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Notifications
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model
        .find({
          event: eventId,
          deleted_at: null,
        })
        .sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find notifications by event failed: ${error.message}`);
    }
  }

  /**
   * Find notifications by batch
   * @param {string} batchId - Batch ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Notifications
   */
  async findByBatch(batchId, options = {}) {
    try {
      const query = this.model
        .find({
          batch_id: batchId,
          deleted_at: null,
        })
        .sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find notifications by batch failed: ${error.message}`);
    }
  }

  /**
   * Get batch statistics
   * @param {string} batchId - Batch ID
   * @returns {Promise<Object>} - Batch statistics
   */
  async getBatchStatistics(batchId) {
    try {
      const [stats] = await this.model.aggregate([
        { $match: { batch_id: batchId, deleted_at: null } },
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
            sent: [{ $match: { sent_at: { $ne: null } } }, { $count: "count" }],
            read: [{ $match: { read_at: { $ne: null } } }, { $count: "count" }],
            clicked: [{ $match: { clicked_at: { $ne: null } } }, { $count: "count" }],
            failed: [{ $match: { status: NOTIFICATION_STATUS.FAILED } }, { $count: "count" }],
          },
        },
      ]);

      const total = stats?.total[0]?.count || 0;

      return {
        total,
        byStatus: stats?.byStatus || [],
        sent: stats?.sent[0]?.count || 0,
        read: stats?.read[0]?.count || 0,
        clicked: stats?.clicked[0]?.count || 0,
        failed: stats?.failed[0]?.count || 0,
        deliveryRate: total > 0 ? Math.round(((stats?.sent[0]?.count || 0) / total) * 10000) / 100 : 0,
        readRate: total > 0 ? Math.round(((stats?.read[0]?.count || 0) / total) * 10000) / 100 : 0,
        clickRate: total > 0 ? Math.round(((stats?.clicked[0]?.count || 0) / total) * 10000) / 100 : 0,
      };
    } catch (error) {
      throw new Error(`Get batch statistics failed: ${error.message}`);
    }
  }

  /**
   * Get user statistics
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @returns {Promise<Object>} - User statistics
   */
  async getUserStatistics(userId) {
    try {
      return await this.model.getUserStatistics(userId);
    } catch (error) {
      throw new Error(`Get user statistics failed: ${error.message}`);
    }
  }

  /**
   * Get system statistics
   * @returns {Promise<Object>} - System statistics
   */
  async getSystemStatistics() {
    try {
      return await this.model.getSystemStatistics();
    } catch (error) {
      throw new Error(`Get system statistics failed: ${error.message}`);
    }
  }

  /**
   * Delete old notifications
   * @param {number} [daysOld=90] - Days threshold
   * @returns {Promise<Object>} - Delete result
   */
  async deleteOld(daysOld = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const result = await this.model.updateMany(
        {
          created_at: { $lt: cutoffDate },
          deleted_at: null,
        },
        {
          $set: { deleted_at: new Date() },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Delete old notifications failed: ${error.message}`);
    }
  }

  /**
   * Delete expired notifications
   * @returns {Promise<Object>} - Delete result
   */
  async deleteExpired() {
    try {
      const now = new Date();

      const result = await this.model.updateMany(
        {
          expires_at: { $lt: now },
          deleted_at: null,
        },
        {
          $set: { deleted_at: new Date() },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Delete expired notifications failed: ${error.message}`);
    }
  }

  /**
   * Bulk create notifications
   * @param {Array<Object>} notificationsData - Array of notification data
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Created notifications
   */
  async bulkCreate(notificationsData, options = {}) {
    try {
      // Validate all notifications
      for (const data of notificationsData) {
        if (!data.user) throw new Error("User is required for all notifications");
        if (!data.type) throw new Error("Type is required for all notifications");
        if (!data.title) throw new Error("Title is required for all notifications");
        if (!data.message) throw new Error("Message is required for all notifications");
      }

      return await this.model.insertMany(notificationsData, options);
    } catch (error) {
      throw new Error(`Bulk create notifications failed: ${error.message}`);
    }
  }

  /**
   * Bulk delete notifications
   * @param {Array<string|mongoose.Types.ObjectId>} notificationIds - Notification IDs
   * @returns {Promise<Object>} - Delete result
   */
  async bulkDelete(notificationIds) {
    try {
      const result = await this.model.updateMany(
        { _id: { $in: notificationIds } },
        { $set: { deleted_at: new Date() } }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Bulk delete notifications failed: ${error.message}`);
    }
  }

  /**
   * Get notifications grouped by date
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {number} [days=7] - Number of days
   * @returns {Promise<Array>} - Notifications grouped by date
   */
  async getGroupedByDate(userId, days = 7) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const notifications = await this.model.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            created_at: { $gte: startDate },
            deleted_at: null,
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
            },
            notifications: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);

      return notifications;
    } catch (error) {
      throw new Error(`Get notifications grouped by date failed: ${error.message}`);
    }
  }
}

export default new NotificationRepository();
