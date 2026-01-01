"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _notificationController = _interopRequireDefault(require("./notification.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== USER NOTIFICATIONS (AUTHENTICATED) ====================

/**
 * GET /api/notifications/me
 * Get current user's notifications
 * Requires: Authentication
 */
router.get("/me", _authMiddleware.authenticate, _notificationController["default"].getMyNotifications.bind(_notificationController["default"]));

/**
 * GET /api/notifications/me/unread
 * Get current user's unread notifications
 * Requires: Authentication
 */
router.get("/me/unread", _authMiddleware.authenticate, _notificationController["default"].getUnread.bind(_notificationController["default"]));

/**
 * GET /api/notifications/me/unread/count
 * Get current user's unread notification count
 * Requires: Authentication
 */
router.get("/me/unread/count", _authMiddleware.authenticate, _notificationController["default"].getUnreadCount.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/me/read-all
 * Mark all notifications as read for current user
 * Requires: Authentication
 */
router.put("/me/read-all", _authMiddleware.authenticate, _notificationController["default"].markAllAsRead.bind(_notificationController["default"]));

/**
 * GET /api/notifications/me/type/:type
 * Get notifications by type for current user
 * Requires: Authentication
 */
router.get("/me/type/:type", _authMiddleware.authenticate, _notificationController["default"].getByType.bind(_notificationController["default"]));

// ==================== BULK OPERATIONS ====================

/**
 * POST /api/notifications/bulk
 * Bulk create notifications for multiple users
 * Requires: Admin
 */
router.post("/bulk", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.NOTIFICATIONS_BULK_CREATED, _activityConstants.ENTITY_TYPE.NOTIFICATION), _notificationController["default"].bulkCreate.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/bulk/read
 * Bulk mark notifications as read
 * Requires: Authentication
 */
router.put("/bulk/read", _authMiddleware.authenticate, _notificationController["default"].bulkMarkAsRead.bind(_notificationController["default"]));

// ==================== ADMIN QUERY ROUTES ====================

/**
 * GET /api/notifications/pending/:channel
 * Get pending notifications for a channel
 * Requires: Admin
 */
router.get("/pending/:channel", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].getPending.bind(_notificationController["default"]));

/**
 * GET /api/notifications/retry
 * Get notifications ready for retry
 * Requires: Admin
 */
router.get("/retry", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].getReadyForRetry.bind(_notificationController["default"]));

/**
 * GET /api/notifications/channel/:channel
 * Get notifications by channel
 * Requires: Admin
 */
router.get("/channel/:channel", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].getByChannel.bind(_notificationController["default"]));

/**
 * GET /api/notifications/event/:eventId
 * Get notifications by event
 * Requires: Admin
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _notificationController["default"].getByEvent.bind(_notificationController["default"]));

/**
 * GET /api/notifications/user/:userId
 * Get notifications for a specific user
 * Requires: Admin
 */
router.get("/user/:userId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].getByUser.bind(_notificationController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/notifications
 * Create a notification
 * Requires: Admin
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.NOTIFICATION_CREATED, _activityConstants.ENTITY_TYPE.NOTIFICATION), _notificationController["default"].create.bind(_notificationController["default"]));

/**
 * GET /api/notifications
 * List all notifications with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].list.bind(_notificationController["default"]));

/**
 * GET /api/notifications/:id
 * Get notification by ID
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].getById.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/:id
 * Update notification
 * Requires: Admin
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.NOTIFICATION_UPDATED, _activityConstants.ENTITY_TYPE.NOTIFICATION, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _notificationController["default"].update.bind(_notificationController["default"]));

/**
 * DELETE /api/notifications/:id
 * Delete notification (soft delete)
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.NOTIFICATION_DELETED, _activityConstants.ENTITY_TYPE.NOTIFICATION, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _notificationController["default"]["delete"].bind(_notificationController["default"]));

// ==================== READ STATUS MANAGEMENT ====================

/**
 * PUT /api/notifications/:id/read
 * Mark notification as read
 * Requires: Authentication
 */
router.put("/:id/read", _authMiddleware.authenticate, _notificationController["default"].markAsRead.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/:id/clicked
 * Mark notification as clicked
 * Requires: Authentication
 */
router.put("/:id/clicked", _authMiddleware.authenticate, _notificationController["default"].markAsClicked.bind(_notificationController["default"]));

// ==================== DELIVERY STATUS (INTERNAL/ADMIN) ====================

/**
 * PUT /api/notifications/:id/sent
 * Mark notification as sent
 * Requires: Admin
 */
router.put("/:id/sent", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].markAsSent.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/:id/delivered
 * Mark notification as delivered
 * Requires: Admin
 */
router.put("/:id/delivered", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].markAsDelivered.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/:id/failed
 * Mark notification as failed
 * Requires: Admin
 */
router.put("/:id/failed", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].markAsFailed.bind(_notificationController["default"]));

/**
 * PUT /api/notifications/:id/queue
 * Queue notification for delivery
 * Requires: Admin
 */
router.put("/:id/queue", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _notificationController["default"].queue.bind(_notificationController["default"]));
var _default = exports["default"] = router;