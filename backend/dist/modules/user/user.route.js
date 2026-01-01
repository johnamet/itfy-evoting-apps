"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userController = _interopRequireDefault(require("./user.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== CURRENT USER PROFILE ====================

/**
 * GET /api/users/profile
 * Get current user profile
 * Requires: Authentication
 */
router.get("/profile", _authMiddleware.authenticate, _userController["default"].getProfile.bind(_userController["default"]));

/**
 * PUT /api/users/profile
 * Update current user profile
 * Requires: Authentication
 */
router.put("/profile", _authMiddleware.authenticate, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.PROFILE_UPDATED, _activityConstants.ENTITY_TYPE.USER), _userController["default"].updateProfile.bind(_userController["default"]));

// ==================== ADMIN STATISTICS ====================

/**
 * GET /api/users/stats
 * Get user statistics
 * Requires: Admin
 */
router.get("/stats", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _userController["default"].getStats.bind(_userController["default"]));

/**
 * GET /api/users/:id/statistics
 * Get individual user statistics
 * Requires: Admin
 */
router.get("/:id/statistics", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _userController["default"].getUserStatistics.bind(_userController["default"]));

// ==================== DELETED USERS (SUPER ADMIN ONLY) ====================

/**
 * GET /api/users/deleted
 * List all soft-deleted users
 * Requires: Super Admin
 */
router.get("/deleted", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USERS_ACCESSED, _activityConstants.ENTITY_TYPE.USER, {
  getDescription: function getDescription() {
    return "Accessed deleted users list";
  },
  severity: "info"
}), _userController["default"].listDeleted.bind(_userController["default"]));

/**
 * POST /api/users/:id/restore
 * Restore a soft-deleted user
 * Requires: Super Admin
 */
router.post("/:id/restore", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_RESTORED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Restored deleted user ".concat(req.params.id);
  },
  severity: "warning"
}), _userController["default"].restoreUser.bind(_userController["default"]));

/**
 * DELETE /api/users/:id/hard
 * Permanently delete user (hard delete)
 * Requires: Super Admin
 */
router["delete"]("/:id/hard", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_HARD_DELETED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "PERMANENTLY deleted user ".concat(req.params.id);
  },
  severity: "critical"
}), _userController["default"].hardDeleteUser.bind(_userController["default"]));

// ==================== ADMIN BULK OPERATIONS ====================

/**
 * POST /api/users/bulk/status
 * Bulk update user status
 * Requires: Admin
 */
router.post("/bulk/status", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USERS_BULK_STATUS_UPDATED, _activityConstants.ENTITY_TYPE.USER), _userController["default"].bulkUpdateStatus.bind(_userController["default"]));

/**
 * POST /api/users/bulk/action
 * Bulk perform action on users
 * Requires: Admin
 */
router.post("/bulk/action", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USERS_BULK_ACTION, _activityConstants.ENTITY_TYPE.USER, {
  getDescription: function getDescription(req) {
    return "Performed bulk action: ".concat(req.body.action);
  }
}), _userController["default"].bulkAction.bind(_userController["default"]));

/**
 * POST /api/users/bulk/delete
 * Bulk soft delete users
 * Requires: Admin
 */
router.post("/bulk/delete", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USERS_BULK_DELETED, _activityConstants.ENTITY_TYPE.USER, {
  getDescription: function getDescription(req) {
    var _req$body$userIds;
    return "Bulk deleted ".concat((_req$body$userIds = req.body.userIds) === null || _req$body$userIds === void 0 ? void 0 : _req$body$userIds.length, " users");
  },
  severity: "warning"
}), _userController["default"].bulkDelete.bind(_userController["default"]));

/**
 * POST /api/users/bulk/restore
 * Bulk restore deleted users
 * Requires: Super Admin
 */
router.post("/bulk/restore", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USERS_BULK_RESTORED, _activityConstants.ENTITY_TYPE.USER, {
  getDescription: function getDescription(req) {
    var _req$body$userIds2;
    return "Bulk restored ".concat((_req$body$userIds2 = req.body.userIds) === null || _req$body$userIds2 === void 0 ? void 0 : _req$body$userIds2.length, " users");
  },
  severity: "warning"
}), _userController["default"].bulkRestore.bind(_userController["default"]));

// ==================== SEARCH & EXPORT ====================

/**
 * POST /api/users/search
 * Advanced user search
 * Requires: Admin
 */
router.post("/search", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _userController["default"].searchUsers.bind(_userController["default"]));

/**
 * GET /api/users/export
 * Export users to CSV/Excel
 * Requires: Admin
 */
router.get("/export", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USERS_EXPORTED, _activityConstants.ENTITY_TYPE.USER, {
  getDescription: function getDescription(req) {
    return "Exported users in ".concat(req.query.format || 'csv', " format");
  }
}), _userController["default"].exportUsers.bind(_userController["default"]));

// ==================== ACTIVITY LOGS ====================

/**
 * GET /api/users/:id/activity
 * Get user activity log
 * Requires: Admin
 */
router.get("/:id/activity", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _userController["default"].getUserActivity.bind(_userController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/users
 * Create a new user
 * Requires: Admin
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_CREATED, _activityConstants.ENTITY_TYPE.USER), _userController["default"].create.bind(_userController["default"]));

/**
 * GET /api/users
 * List all users with filters
 * Supports include_deleted parameter for Super Admin
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _userController["default"].list.bind(_userController["default"]));

/**
 * GET /api/users/:id
 * Get user by ID
 * Supports include_deleted parameter
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _userController["default"].getById.bind(_userController["default"]));

/**
 * PUT /api/users/:id
 * Update user
 * Requires: Admin
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_UPDATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _userController["default"].update.bind(_userController["default"]));

/**
 * DELETE /api/users/:id
 * Delete user (soft delete)
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_DELETED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _userController["default"]["delete"].bind(_userController["default"]));

// ==================== ROLE & PERMISSIONS ====================

/**
 * PUT /api/users/:id/role
 * Update user role
 * Requires: Super Admin
 */
router.put("/:id/role", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_ROLE_UPDATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Updated role for user ".concat(req.params.id, " to ").concat(req.body.role);
  },
  severity: "warning"
}), _userController["default"].updateRole.bind(_userController["default"]));

/**
 * PUT /api/users/:id/permissions
 * Update user permissions
 * Requires: Super Admin
 */
router.put("/:id/permissions", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_PERMISSIONS_UPDATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  severity: "warning"
}), _userController["default"].updatePermissions.bind(_userController["default"]));

// ==================== USER STATUS ====================

/**
 * PUT /api/users/:id/activate
 * Activate user
 * Requires: Admin
 */
router.put("/:id/activate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_ACTIVATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _userController["default"].activate.bind(_userController["default"]));

/**
 * PUT /api/users/:id/deactivate
 * Deactivate user
 * Requires: Admin
 */
router.put("/:id/deactivate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_DEACTIVATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _userController["default"].deactivate.bind(_userController["default"]));

/**
 * PUT /api/users/:id/suspend
 * Suspend user
 * Requires: Admin
 */
router.put("/:id/suspend", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_SUSPENDED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  severity: "warning"
}), _userController["default"].suspend.bind(_userController["default"]));

/**
 * PUT /api/users/:id/reactivate
 * Reactivate user (unsuspend)
 * Requires: Admin
 */
router.put("/:id/reactivate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_ACTIVATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _userController["default"].reactivate.bind(_userController["default"]));

/**
 * PUT /api/users/:id/verify-email
 * Force verify user email
 * Requires: Admin
 */
router.put("/:id/verify-email", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.USER_UPDATED, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Admin force verified email for user ".concat(req.params.id);
  }
}), _userController["default"].forceVerifyEmail.bind(_userController["default"]));

/**
 * POST /api/users/:id/send-password-reset
 * Send password reset email
 * Requires: Admin
 */
router.post("/:id/send-password-reset", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.PASSWORD_RESET_SENT, _activityConstants.ENTITY_TYPE.USER, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Admin sent password reset for user ".concat(req.params.id);
  }
}), _userController["default"].sendPasswordReset.bind(_userController["default"]));
var _default = exports["default"] = router;