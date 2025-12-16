/**
 * Activity Controller
 * Handles HTTP requests for activity logging and audit trails
 */

import BaseController from "../shared/base.controller.js";
import ActivityService from "./activity.service.js";
import ActivityValidation from "./activity.validation.js";

class ActivityController extends BaseController {
  constructor(dependencies = {}) {
    super({
      activityService: dependencies.activityService || ActivityService,
    });
  }

  // ==================== ACTIVITY QUERIES ====================

  /**
   * Get all activities with pagination and filters
   * GET /api/activities
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, [
      "user", "action", "entity_type", "entity_id", "event",
      "severity", "session_id", "ip_address"
    ]);
    const sort = this.getSort(req, "-timestamp");

    // Date range filters
    if (req.query.timestamp_from) {
      filters.timestamp = { ...filters.timestamp, $gte: new Date(req.query.timestamp_from) };
    }
    if (req.query.timestamp_to) {
      filters.timestamp = { ...filters.timestamp, $lte: new Date(req.query.timestamp_to) };
    }

    const result = await this.service("activityService").repository.findAll(
      filters,
      page,
      limit,
      { sort, populate: ["user", "event"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get activity by ID
   * GET /api/activities/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const activity = await this.service("activityService").repository.findById(id, {
      populate: ["user", "event"],
    });

    if (!activity) {
      return this.notFound(res, { resource: "Activity" });
    }

    return this.success(res, {
      data: activity,
    });
  }

  // ==================== USER ACTIVITY ====================

  /**
   * Get user activity history
   * GET /api/activities/user/:userId
   */
  async getUserHistory(req, res) {
    const { userId } = req.params;
    const { page, limit } = this.getPagination(req);
    const filters = this.getFilters(req, ["action"]);

    // Date range filters
    if (req.query.timestamp_from) {
      filters.timestamp = { ...filters.timestamp, $gte: new Date(req.query.timestamp_from) };
    }
    if (req.query.timestamp_to) {
      filters.timestamp = { ...filters.timestamp, $lte: new Date(req.query.timestamp_to) };
    }

    const result = await this.service("activityService").getUserHistory(userId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get my activity (current user)
   * GET /api/activities/me
   */
  async getMyActivity(req, res) {
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const { page, limit } = this.getPagination(req);
    const result = await this.service("activityService").getUserHistory(userId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== EVENT ACTIVITY ====================

  /**
   * Get event activity
   * GET /api/activities/event/:eventId
   */
  async getEventActivity(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const filters = this.getFilters(req, ["action", "severity"]);

    const result = await this.service("activityService").repository.findAll(
      { event: eventId, ...filters },
      page,
      limit,
      { sort: { timestamp: -1 }, populate: ["user"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== ENTITY ACTIVITY ====================

  /**
   * Get entity activity
   * GET /api/activities/entity/:entityType/:entityId
   */
  async getEntityActivity(req, res) {
    const { entityType, entityId } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("activityService").repository.findAll(
      { entity_type: entityType, entity_id: entityId },
      page,
      limit,
      { sort: { timestamp: -1 }, populate: ["user"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== SECURITY EVENTS ====================

  /**
   * Get security events
   * GET /api/activities/security
   */
  async getSecurityEvents(req, res) {
    const { page, limit } = this.getPagination(req);

    // Date range filters
    let timestampFrom, timestampTo;
    if (req.query.timestamp_from) {
      timestampFrom = new Date(req.query.timestamp_from);
    }
    if (req.query.timestamp_to) {
      timestampTo = new Date(req.query.timestamp_to);
    }

    const result = await this.service("activityService").getSecurityEvents(page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get failed login attempts
   * GET /api/activities/failed-logins
   */
  async getFailedLogins(req, res) {
    const { page, limit } = this.getPagination(req);
    const { hours } = req.query;

    const hoursAgo = parseInt(hours, 10) || 24;
    const since = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);

    const result = await this.service("activityService").repository.findAll(
      {
        action: "FAILED_LOGIN",
        timestamp: { $gte: since },
      },
      page,
      limit,
      { sort: { timestamp: -1 } }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== ANALYTICS ====================

  /**
   * Get activity summary for an event
   * GET /api/activities/summary/:eventId
   */
  async getEventSummary(req, res) {
    const { eventId } = req.params;
    const summary = await this.service("activityService").getEventSummary(eventId);

    return this.success(res, {
      data: summary,
    });
  }

  /**
   * Get activity timeline
   * GET /api/activities/timeline/:eventId
   */
  async getTimeline(req, res) {
    const { eventId } = req.params;
    const { interval, start_date, end_date } = req.query;

    const timeline = await this.service("activityService").getActivityTimeline(
      eventId,
      interval || "day",
      start_date ? new Date(start_date) : undefined,
      end_date ? new Date(end_date) : undefined
    );

    return this.success(res, {
      data: timeline,
    });
  }

  /**
   * Get activity by action type
   * GET /api/activities/action/:action
   */
  async getByAction(req, res) {
    const { action } = req.params;
    const { page, limit } = this.getPagination(req);
    const eventId = req.query.event;

    const filters = { action };
    if (eventId) {
      filters.event = eventId;
    }

    const result = await this.service("activityService").repository.findAll(
      filters,
      page,
      limit,
      { sort: { timestamp: -1 }, populate: ["user", "event"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get recent activities
   * GET /api/activities/recent
   */
  async getRecent(req, res) {
    const limit = parseInt(req.query.limit, 10) || 20;
    const eventId = req.query.event;

    const filters = {};
    if (eventId) {
      filters.event = eventId;
    }

    const result = await this.service("activityService").repository.findAll(
      filters,
      1,
      limit,
      { sort: { timestamp: -1 }, populate: ["user", "event"] }
    );

    return this.success(res, {
      data: result.data,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { ActivityController };
export default new ActivityController();
