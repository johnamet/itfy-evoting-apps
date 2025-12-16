import { Router } from "express";
import NotificationController from "./notification.controller.js";
import {
  authenticate,
  authorize,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== USER NOTIFICATIONS (AUTHENTICATED) ====================

/**
 * GET /api/notifications/me
 * Get current user's notifications
 * Requires: Authentication
 */
router.get(
  "/me",
  authenticate,
  NotificationController.getMyNotifications.bind(NotificationController)
);

/**
 * GET /api/notifications/me/unread
 * Get current user's unread notifications
 * Requires: Authentication
 */
router.get(
  "/me/unread",
  authenticate,
  NotificationController.getUnread.bind(NotificationController)
);

/**
 * GET /api/notifications/me/unread/count
 * Get current user's unread notification count
 * Requires: Authentication
 */
router.get(
  "/me/unread/count",
  authenticate,
  NotificationController.getUnreadCount.bind(NotificationController)
);

/**
 * PUT /api/notifications/me/read-all
 * Mark all notifications as read for current user
 * Requires: Authentication
 */
router.put(
  "/me/read-all",
  authenticate,
  NotificationController.markAllAsRead.bind(NotificationController)
);

/**
 * GET /api/notifications/me/type/:type
 * Get notifications by type for current user
 * Requires: Authentication
 */
router.get(
  "/me/type/:type",
  authenticate,
  NotificationController.getByType.bind(NotificationController)
);

// ==================== BULK OPERATIONS ====================

/**
 * POST /api/notifications/bulk
 * Bulk create notifications for multiple users
 * Requires: Admin
 */
router.post(
  "/bulk",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.NOTIFICATIONS_BULK_CREATED, ENTITY_TYPE.NOTIFICATION),
  NotificationController.bulkCreate.bind(NotificationController)
);

/**
 * PUT /api/notifications/bulk/read
 * Bulk mark notifications as read
 * Requires: Authentication
 */
router.put(
  "/bulk/read",
  authenticate,
  NotificationController.bulkMarkAsRead.bind(NotificationController)
);

// ==================== ADMIN QUERY ROUTES ====================

/**
 * GET /api/notifications/pending/:channel
 * Get pending notifications for a channel
 * Requires: Admin
 */
router.get(
  "/pending/:channel",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.getPending.bind(NotificationController)
);

/**
 * GET /api/notifications/retry
 * Get notifications ready for retry
 * Requires: Admin
 */
router.get(
  "/retry",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.getReadyForRetry.bind(NotificationController)
);

/**
 * GET /api/notifications/channel/:channel
 * Get notifications by channel
 * Requires: Admin
 */
router.get(
  "/channel/:channel",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.getByChannel.bind(NotificationController)
);

/**
 * GET /api/notifications/event/:eventId
 * Get notifications by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  NotificationController.getByEvent.bind(NotificationController)
);

/**
 * GET /api/notifications/user/:userId
 * Get notifications for a specific user
 * Requires: Admin
 */
router.get(
  "/user/:userId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.getByUser.bind(NotificationController)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/notifications
 * Create a notification
 * Requires: Admin
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.NOTIFICATION_CREATED, ENTITY_TYPE.NOTIFICATION),
  NotificationController.create.bind(NotificationController)
);

/**
 * GET /api/notifications
 * List all notifications with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.list.bind(NotificationController)
);

/**
 * GET /api/notifications/:id
 * Get notification by ID
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.getById.bind(NotificationController)
);

/**
 * PUT /api/notifications/:id
 * Update notification
 * Requires: Admin
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.NOTIFICATION_UPDATED, ENTITY_TYPE.NOTIFICATION, {
    getEntityId: (req) => req.params.id,
  }),
  NotificationController.update.bind(NotificationController)
);

/**
 * DELETE /api/notifications/:id
 * Delete notification (soft delete)
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.NOTIFICATION_DELETED, ENTITY_TYPE.NOTIFICATION, {
    getEntityId: (req) => req.params.id,
  }),
  NotificationController.delete.bind(NotificationController)
);

// ==================== READ STATUS MANAGEMENT ====================

/**
 * PUT /api/notifications/:id/read
 * Mark notification as read
 * Requires: Authentication
 */
router.put(
  "/:id/read",
  authenticate,
  NotificationController.markAsRead.bind(NotificationController)
);

/**
 * PUT /api/notifications/:id/clicked
 * Mark notification as clicked
 * Requires: Authentication
 */
router.put(
  "/:id/clicked",
  authenticate,
  NotificationController.markAsClicked.bind(NotificationController)
);

// ==================== DELIVERY STATUS (INTERNAL/ADMIN) ====================

/**
 * PUT /api/notifications/:id/sent
 * Mark notification as sent
 * Requires: Admin
 */
router.put(
  "/:id/sent",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.markAsSent.bind(NotificationController)
);

/**
 * PUT /api/notifications/:id/delivered
 * Mark notification as delivered
 * Requires: Admin
 */
router.put(
  "/:id/delivered",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.markAsDelivered.bind(NotificationController)
);

/**
 * PUT /api/notifications/:id/failed
 * Mark notification as failed
 * Requires: Admin
 */
router.put(
  "/:id/failed",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.markAsFailed.bind(NotificationController)
);

/**
 * PUT /api/notifications/:id/queue
 * Queue notification for delivery
 * Requires: Admin
 */
router.put(
  "/:id/queue",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  NotificationController.queue.bind(NotificationController)
);

export default router;
