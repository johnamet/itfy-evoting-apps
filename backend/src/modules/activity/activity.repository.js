/**
 * Activity Repository
 * Data access layer for activity/audit logs
 */

import { BaseRepository } from "../shared/base.repository";
import ActivityModel from "./activity.model";
import { ACTION_TYPE,  SEVERITY } from "../../utils/constants/activity.constants";

class ActivityRepository extends BaseRepository {
  constructor() {
    super(ActivityModel);
  }

  /**
   * Log an activity
   * @param {Object} activityData - Activity data
   * @returns {Promise<Object>} - Created activity
   */
  async logActivity(activityData) {
    try {
      return await this.create(activityData);
    } catch (error) {
      throw new Error(`Log activity failed: ${error.message}`);
    }
  }

  /**
   * Find user activity history
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated activities
   */
  async findUserHistory(userId, page = 1, limit = 50, options = {}) {
    try {
      return await this.findAll({ user: userId }, page, limit, {
        ...options,
        sort: { timestamp: -1 },
      });
    } catch (error) {
      throw new Error(`Find user history failed: ${error.message}`);
    }
  }

  /**
   * Find activities by event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated activities
   */
  async findByEvent(eventId, page = 1, limit = 50, options = {}) {
    try {
      return await this.findAll({ event: eventId }, page, limit, {
        ...options,
        sort: { timestamp: -1 },
      });
    } catch (error) {
      throw new Error(`Find activities by event failed: ${error.message}`);
    }
  }

  /**
   * Find activities by entity
   * @param {string} entityType - Entity type
   * @param {string|mongoose.Types.ObjectId} entityId - Entity ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated activities
   */
  async findByEntity(entityType, entityId, page = 1, limit = 50, options = {}) {
    try {
      return await this.findAll(
        { entity_type: entityType, entity_id: entityId },
        page,
        limit,
        {
          ...options,
          sort: { timestamp: -1 },
        }
      );
    } catch (error) {
      throw new Error(`Find activities by entity failed: ${error.message}`);
    }
  }

  /**
   * Find security events
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated security events
   */
  async findSecurityEvents(page = 1, limit = 50, options = {}) {
    try {
      const filters = {
        $or: [
          { action: ACTION_TYPE.FAILED_LOGIN },
          { action: ACTION_TYPE.PERMISSION_CHANGE },
          { action: ACTION_TYPE.SUSPICIOUS_ACTIVITY },
          { severity: SEVERITY.CRITICAL },
          { severity: SEVERITY.ERROR },
        ],
      };

      return await this.findAll(filters, page, limit, {
        ...options,
        sort: { timestamp: -1 },
      });
    } catch (error) {
      throw new Error(`Find security events failed: ${error.message}`);
    }
  }

  /**
   * Find activities within time range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {Object} [filters={}] - Additional filters
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated activities
   */
  async findByTimeRange(startDate, endDate, filters = {}, page = 1, limit = 50, options = {}) {
    try {
      return await this.findAll(
        {
          ...filters,
          timestamp: { $gte: startDate, $lte: endDate },
        },
        page,
        limit,
        {
          ...options,
          sort: { timestamp: -1 },
        }
      );
    } catch (error) {
      throw new Error(`Find activities by time range failed: ${error.message}`);
    }
  }

  /**
   * Get activity statistics by action type
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Array>} - Action statistics
   */
  async getActionStatistics(startDate, endDate) {
    try {
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
    } catch (error) {
      throw new Error(`Get action statistics failed: ${error.message}`);
    }
  }

  /**
   * Get activity timeline (time-series data)
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {string} [interval='day'] - Time interval (hour, day, week, month)
   * @param {Object} [filters={}] - Additional filters
   * @returns {Promise<Array>} - Timeline data
   */
  async getTimeline(startDate, endDate, interval = "day", filters = {}) {
    try {
      let dateFormat;
      switch (interval) {
        case "hour":
          dateFormat = "%Y-%m-%d %H:00";
          break;
        case "week":
          dateFormat = "%Y-W%U";
          break;
        case "month":
          dateFormat = "%Y-%m";
          break;
        default: // day
          dateFormat = "%Y-%m-%d";
      }

      return await this.aggregate([
        {
          $match: {
            ...filters,
            timestamp: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: dateFormat, date: "$timestamp" } },
              action: "$action",
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.date": 1 } },
      ]);
    } catch (error) {
      throw new Error(`Get activity timeline failed: ${error.message}`);
    }
  }

  /**
   * Get user activity summary
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Object>} - Activity summary
   */
  async getUserActivitySummary(userId, startDate, endDate) {
    try {
      const [summary] = await this.aggregate([
        {
          $match: {
            user: userId,
            timestamp: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $facet: {
            totalActions: [{ $count: "count" }],
            byAction: [
              {
                $group: {
                  _id: "$action",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
            bySeverity: [
              {
                $group: {
                  _id: "$severity",
                  count: { $sum: 1 },
                },
              },
            ],
            lastActivity: [{ $sort: { timestamp: -1 } }, { $limit: 1 }],
          },
        },
      ]);

      return {
        totalActions: summary?.totalActions[0]?.count || 0,
        byAction: summary?.byAction || [],
        bySeverity: summary?.bySeverity || [],
        lastActivity: summary?.lastActivity[0] || null,
      };
    } catch (error) {
      throw new Error(`Get user activity summary failed: ${error.message}`);
    }
  }

  /**
   * Detect suspicious patterns (e.g., rapid actions from same IP)
   * @param {number} [threshold=20] - Action threshold
   * @param {number} [minutes=10] - Time window in minutes
   * @returns {Promise<Array>} - Suspicious IPs and patterns
   */
  async detectSuspiciousPatterns(threshold = 20, minutes = 10) {
    try {
      const timeWindow = new Date(Date.now() - minutes * 60 * 1000);

      return await this.aggregate([
        {
          $match: {
            timestamp: { $gte: timeWindow },
            ip_address: { $ne: null },
          },
        },
        {
          $group: {
            _id: {
              ip: "$ip_address",
              action: "$action",
            },
            count: { $sum: 1 },
            users: { $addToSet: "$user" },
          },
        },
        {
          $match: {
            count: { $gte: threshold },
          },
        },
        { $sort: { count: -1 } },
      ]);
    } catch (error) {
      throw new Error(`Detect suspicious patterns failed: ${error.message}`);
    }
  }
}

export default new ActivityRepository();
