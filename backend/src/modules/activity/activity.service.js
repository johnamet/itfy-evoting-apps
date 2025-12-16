/**
 * Activity Service
 * Business logic for activity logging and audit trails
 */

import ActivityRepository from "./activity.repository.js";
import { ACTION_TYPE, ENTITY_TYPE, SEVERITY } from "../../utils/constants/activity.constants.js";

class ActivityService {
  /**
   * Log an activity with automatic enrichment
   * @param {Object} params - Activity parameters
   * @param {mongoose.Types.ObjectId} [params.userId] - User ID
   * @param {string} params.action - Action type
   * @param {string} params.entityType - Entity type
   * @param {mongoose.Types.ObjectId} [params.entityId] - Entity ID
   * @param {mongoose.Types.ObjectId} [params.eventId] - Event ID (for context)
   * @param {string} params.description - Human-readable description
   * @param {string} [params.severity] - Severity level
   * @param {string} [params.ipAddress] - IP address
   * @param {string} [params.userAgent] - User agent
   * @param {Object} [params.metadata] - Additional metadata
   * @param {Object} [params.changes] - Before/after snapshots
   * @param {string} [params.sessionId] - Session ID
   * @returns {Promise<Object>} - Created activity
   */
  async log({
    userId = null,
    action,
    entityType,
    entityId = null,
    eventId = null,
    description,
    severity = SEVERITY.INFO,
    ipAddress = null,
    userAgent = null,
    metadata = {},
    changes = null,
    sessionId = null,
  }) {
    try {
      // Auto-assign severity for certain actions
      if (!severity) {
        if (
          [
            ACTION_TYPE.FAILED_LOGIN,
            ACTION_TYPE.SUSPICIOUS_ACTIVITY,
            ACTION_TYPE.PAYMENT_FAILED,
          ].includes(action)
        ) {
          severity = SEVERITY.WARNING;
        } else if ([ACTION_TYPE.PERMISSION_CHANGE].includes(action)) {
          severity = SEVERITY.CRITICAL;
        }
      }

      const activityData = {
        user: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        event: eventId,
        description,
        severity,
        ip_address: ipAddress,
        user_agent: userAgent,
        metadata,
        changes,
        session_id: sessionId,
        timestamp: new Date(),
      };

      return await ActivityRepository.logActivity(activityData);
    } catch (error) {
      // Log errors but don't break the main flow
      console.error(`Activity logging failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Log user authentication events
   * @param {mongoose.Types.ObjectId} userId - User ID
   * @param {string} action - LOGIN or LOGOUT
   * @param {string} ipAddress - IP address
   * @param {string} userAgent - User agent
   * @param {boolean} [success=true] - Whether login succeeded
   * @returns {Promise<Object>} - Created activity
   */
  async logAuth(userId, action, ipAddress, userAgent, success = true) {
    const actionType = success ? action : ACTION_TYPE.FAILED_LOGIN;
    const severity = success ? SEVERITY.INFO : SEVERITY.WARNING;

    return await this.log({
      userId,
      action: actionType,
      entityType: ENTITY_TYPE.USER,
      entityId: userId,
      description: success
        ? `User ${action} successfully`
        : `Failed login attempt for user`,
      severity,
      ipAddress,
      userAgent,
    });
  }

  /**
   * Log vote casting with metadata
   * @param {mongoose.Types.ObjectId} userId - User ID
   * @param {mongoose.Types.ObjectId} voteId - Vote ID
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} metadata - Vote metadata (candidate, category, etc.)
   * @param {string} ipAddress - IP address
   * @returns {Promise<Object>} - Created activity
   */
  async logVote(userId, voteId, eventId, metadata, ipAddress) {
    return await this.log({
      userId,
      action: ACTION_TYPE.VOTE_CAST,
      entityType: ENTITY_TYPE.VOTE,
      entityId: voteId,
      eventId,
      description: `Vote cast for candidate ${metadata.candidateName} in category ${metadata.categoryName}`,
      severity: SEVERITY.INFO,
      ipAddress,
      metadata,
    });
  }

  /**
   * Log payment events
   * @param {mongoose.Types.ObjectId} userId - User ID
   * @param {mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {string} action - Payment action type
   * @param {Object} metadata - Payment metadata
   * @returns {Promise<Object>} - Created activity
   */
  async logPayment(userId, paymentId, eventId, action, metadata) {
    const severity =
      action === ACTION_TYPE.PAYMENT_FAILED ? SEVERITY.ERROR : SEVERITY.INFO;

    return await this.log({
      userId,
      action,
      entityType: ENTITY_TYPE.PAYMENT,
      entityId: paymentId,
      eventId,
      description: `Payment ${action.replace("payment_", "")} - Amount: ${metadata.amount} ${metadata.currency}`,
      severity,
      metadata,
    });
  }

  /**
   * Log entity changes with before/after snapshots
   * @param {mongoose.Types.ObjectId} userId - User ID
   * @param {string} action - Action type
   * @param {string} entityType - Entity type
   * @param {mongoose.Types.ObjectId} entityId - Entity ID
   * @param {Object} before - Before state
   * @param {Object} after - After state
   * @param {mongoose.Types.ObjectId} [eventId] - Event ID
   * @returns {Promise<Object>} - Created activity
   */
  async logChange(userId, action, entityType, entityId, before, after, eventId = null) {
    return await this.log({
      userId,
      action,
      entityType,
      entityId,
      eventId,
      description: `${entityType} ${action.replace(`${entityType}_`, "")}`,
      severity: SEVERITY.INFO,
      changes: { before, after },
    });
  }

  /**
   * Get user activity history
   * @param {mongoose.Types.ObjectId} userId - User ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @returns {Promise<Object>} - Paginated activities
   */
  async getUserHistory(userId, page = 1, limit = 50) {
    return await ActivityRepository.findUserHistory(userId, page, limit, {
      populate: "event",
    });
  }

  /**
   * Get security events
   * @param {number} [page=1] - Page number
   * @param {number} [limit=50] - Limit per page
   * @returns {Promise<Object>} - Paginated security events
   */
  async getSecurityEvents(page = 1, limit = 50) {
    return await ActivityRepository.findSecurityEvents(page, limit, {
      populate: "user event",
    });
  }

  /**
   * Generate audit report for date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {Object} [filters={}] - Additional filters
   * @returns {Promise<Object>} - Audit report
   */
  async generateAuditReport(startDate, endDate, filters = {}) {
    const [activities, actionStats, timeline] = await Promise.all([
      ActivityRepository.findByTimeRange(startDate, endDate, filters, 1, 1000),
      ActivityRepository.getActionStatistics(startDate, endDate),
      ActivityRepository.getTimeline(startDate, endDate, "day", filters),
    ]);

    return {
      period: { startDate, endDate },
      totalActivities: activities.metadata.total,
      activities: activities.data,
      actionStatistics: actionStats,
      timeline,
    };
  }

  /**
   * Detect suspicious activity patterns
   * @returns {Promise<Array>} - Suspicious patterns
   */
  async detectSuspiciousPatterns() {
    return await ActivityRepository.detectSuspiciousPatterns(20, 10);
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { ActivityService };
export default new ActivityService();
