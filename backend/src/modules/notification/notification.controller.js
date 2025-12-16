/**
 * Notification Controller
 * Handles HTTP requests for notification management
 */

import BaseController from "../shared/base.controller.js";
import NotificationRepository from "./notification.repository.js";
import NotificationValidation from "./notification.validation.js";

class NotificationController extends BaseController {
  constructor(dependencies = {}) {
    super({
      notificationRepository: dependencies.notificationRepository || NotificationRepository,
    });
  }

  // ==================== NOTIFICATION CRUD ====================

  /**
   * Create a new notification
   * POST /api/notifications
   */
  async create(req, res) {
    const validated = this.validate(req.body, NotificationValidation.createNotificationSchema);
    const notification = await this.service("notificationRepository").create(validated);

    return this.created(res, {
      data: notification,
      message: "Notification created successfully",
    });
  }

  /**
   * Get all notifications with pagination and filters
   * GET /api/notifications
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, [
      "user", "type", "channel", "status", "priority", "event", "batch_id"
    ]);
    const sort = this.getSort(req, "-created_at");

    // Handle read filter
    if (req.query.is_read !== undefined) {
      if (req.query.is_read === "true") {
        filters.read_at = { $ne: null };
      } else {
        filters.read_at = null;
      }
    }

    // Date range filters
    if (req.query.created_at_from) {
      filters.created_at = { ...filters.created_at, $gte: new Date(req.query.created_at_from) };
    }
    if (req.query.created_at_to) {
      filters.created_at = { ...filters.created_at, $lte: new Date(req.query.created_at_to) };
    }

    const result = await this.service("notificationRepository").findAll(
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
   * Get notification by ID
   * GET /api/notifications/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const notification = await this.service("notificationRepository").findById(id, {
      populate: ["user", "event", "candidate", "category"],
    });

    if (!notification) {
      return this.notFound(res, { resource: "Notification" });
    }

    return this.success(res, {
      data: notification,
    });
  }

  /**
   * Update notification
   * PUT /api/notifications/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, NotificationValidation.updateNotificationSchema);
    const notification = await this.service("notificationRepository").update(id, validated);

    return this.success(res, {
      data: notification,
      message: "Notification updated successfully",
    });
  }

  /**
   * Delete notification (soft delete)
   * DELETE /api/notifications/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    await this.service("notificationRepository").delete(id);

    return this.success(res, {
      message: "Notification deleted successfully",
    });
  }

  // ==================== USER NOTIFICATIONS ====================

  /**
   * Get notifications for a user
   * GET /api/notifications/user/:userId
   */
  async getByUser(req, res) {
    const { userId } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("notificationRepository").findByUser(userId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get my notifications (current user)
   * GET /api/notifications/me
   */
  async getMyNotifications(req, res) {
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const { page, limit } = this.getPagination(req);
    const result = await this.service("notificationRepository").findByUser(userId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get unread notifications for current user
   * GET /api/notifications/me/unread
   */
  async getUnread(req, res) {
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const limit = parseInt(req.query.limit, 10) || 20;
    const notifications = await this.service("notificationRepository").findUnread(userId, limit);

    return this.success(res, {
      data: notifications,
    });
  }

  /**
   * Get unread count for current user
   * GET /api/notifications/me/unread/count
   */
  async getUnreadCount(req, res) {
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const count = await this.service("notificationRepository").getUnreadCount(userId);

    return this.success(res, {
      data: { count },
    });
  }

  // ==================== READ STATUS MANAGEMENT ====================

  /**
   * Mark notification as read
   * PUT /api/notifications/:id/read
   */
  async markAsRead(req, res) {
    const { id } = req.params;
    const notification = await this.service("notificationRepository").markAsRead(id);

    return this.success(res, {
      data: notification,
      message: "Notification marked as read",
    });
  }

  /**
   * Mark notification as clicked
   * PUT /api/notifications/:id/clicked
   */
  async markAsClicked(req, res) {
    const { id } = req.params;
    const notification = await this.service("notificationRepository").markAsClicked(id);

    return this.success(res, {
      data: notification,
      message: "Notification marked as clicked",
    });
  }

  /**
   * Mark all notifications as read for current user
   * PUT /api/notifications/me/read-all
   */
  async markAllAsRead(req, res) {
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const result = await this.service("notificationRepository").markAllAsRead(userId);

    return this.success(res, {
      data: result,
      message: "All notifications marked as read",
    });
  }

  /**
   * Bulk mark notifications as read
   * PUT /api/notifications/bulk/read
   */
  async bulkMarkAsRead(req, res) {
    const validated = this.validate(req.body, NotificationValidation.bulkMarkAsReadSchema);
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    // Mark each notification as read
    const results = await Promise.allSettled(
      validated.notification_ids.map((id) =>
        this.service("notificationRepository").markAsRead(id)
      )
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return this.success(res, {
      data: { succeeded, failed },
      message: `${succeeded} notifications marked as read`,
    });
  }

  // ==================== NOTIFICATION TYPE QUERIES ====================

  /**
   * Get notifications by type for current user
   * GET /api/notifications/me/type/:type
   */
  async getByType(req, res) {
    const { type } = req.params;
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const limit = parseInt(req.query.limit, 10) || 20;
    const notifications = await this.service("notificationRepository").findByType(userId, type, limit);

    return this.success(res, {
      data: notifications,
    });
  }

  // ==================== EVENT NOTIFICATIONS ====================

  /**
   * Get notifications by event
   * GET /api/notifications/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("notificationRepository").findAll(
      { event: eventId },
      page,
      limit,
      { sort: { created_at: -1 } }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== DELIVERY STATUS ====================

  /**
   * Get notifications by channel
   * GET /api/notifications/channel/:channel
   */
  async getByChannel(req, res) {
    const { channel } = req.params;
    const { status } = req.query;
    const limit = parseInt(req.query.limit, 10) || 100;

    const notifications = await this.service("notificationRepository").findByChannel(
      channel,
      status || null,
      limit
    );

    return this.success(res, {
      data: notifications,
    });
  }

  /**
   * Get pending notifications for delivery
   * GET /api/notifications/pending/:channel
   */
  async getPending(req, res) {
    const { channel } = req.params;
    const limit = parseInt(req.query.limit, 10) || 100;

    const notifications = await this.service("notificationRepository").findPendingForDelivery(
      channel,
      limit
    );

    return this.success(res, {
      data: notifications,
    });
  }

  /**
   * Get notifications ready for retry
   * GET /api/notifications/retry
   */
  async getReadyForRetry(req, res) {
    const limit = parseInt(req.query.limit, 10) || 50;
    const notifications = await this.service("notificationRepository").findReadyForRetry(limit);

    return this.success(res, {
      data: notifications,
    });
  }

  // ==================== DELIVERY ACTIONS ====================

  /**
   * Mark notification as sent
   * PUT /api/notifications/:id/sent
   */
  async markAsSent(req, res) {
    const { id } = req.params;
    const { provider_id } = req.body;

    const notification = await this.service("notificationRepository").markAsSent(
      id,
      provider_id || null
    );

    return this.success(res, {
      data: notification,
      message: "Notification marked as sent",
    });
  }

  /**
   * Mark notification as delivered
   * PUT /api/notifications/:id/delivered
   */
  async markAsDelivered(req, res) {
    const { id } = req.params;
    const notification = await this.service("notificationRepository").markAsDelivered(id);

    return this.success(res, {
      data: notification,
      message: "Notification marked as delivered",
    });
  }

  /**
   * Mark notification as failed
   * PUT /api/notifications/:id/failed
   */
  async markAsFailed(req, res) {
    const { id } = req.params;
    const { error_message, should_retry } = req.body;

    if (!error_message) {
      return this.badRequest(res, { message: "error_message is required" });
    }

    const notification = await this.service("notificationRepository").markAsFailed(
      id,
      error_message,
      should_retry !== false
    );

    return this.success(res, {
      data: notification,
      message: "Notification marked as failed",
    });
  }

  /**
   * Queue notification for delivery
   * PUT /api/notifications/:id/queue
   */
  async queue(req, res) {
    const { id } = req.params;
    const notification = await this.service("notificationRepository").queue(id);

    return this.success(res, {
      data: notification,
      message: "Notification queued for delivery",
    });
  }

  // ==================== BULK OPERATIONS ====================

  /**
   * Bulk create notifications for multiple users
   * POST /api/notifications/bulk
   */
  async bulkCreate(req, res) {
    const validated = this.validate(req.body, NotificationValidation.bulkCreateNotificationsSchema);
    const { user_ids, ...notificationData } = validated;

    // Create notifications for each user
    const results = await Promise.allSettled(
      user_ids.map((userId) =>
        this.service("notificationRepository").create({
          ...notificationData,
          user: userId,
        })
      )
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return this.created(res, {
      data: { succeeded, failed },
      message: `${succeeded} notifications created`,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { NotificationController };
export default new NotificationController();
