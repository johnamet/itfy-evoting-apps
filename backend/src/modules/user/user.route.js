import { Router } from "express";
import UserController from "./user.controller.js";
import {
  authenticate,
  authorize,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== CURRENT USER PROFILE ====================

/**
 * GET /api/users/profile
 * Get current user profile
 * Requires: Authentication
 */
router.get(
  "/profile",
  authenticate,
  UserController.getProfile.bind(UserController)
);

/**
 * PUT /api/users/profile
 * Update current user profile
 * Requires: Authentication
 */
router.put(
  "/profile",
  authenticate,
  logActivity(ACTION_TYPE.PROFILE_UPDATED, ENTITY_TYPE.USER),
  UserController.updateProfile.bind(UserController)
);

// ==================== ADMIN STATISTICS ====================

/**
 * GET /api/users/stats
 * Get user statistics
 * Requires: Admin
 */
router.get(
  "/stats",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  UserController.getStats.bind(UserController)
);

/**
 * GET /api/users/:id/statistics
 * Get individual user statistics
 * Requires: Admin
 */
router.get(
  "/:id/statistics",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  UserController.getUserStatistics.bind(UserController)
);

// ==================== DELETED USERS (SUPER ADMIN ONLY) ====================

/**
 * GET /api/users/deleted
 * List all soft-deleted users
 * Requires: Super Admin
 */
router.get(
  "/deleted",
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  logActivity(ACTION_TYPE.USERS_ACCESSED, ENTITY_TYPE.USER, {
    getDescription: () => "Accessed deleted users list",
    severity: "info",
  }),
  UserController.listDeleted.bind(UserController)
);

/**
 * POST /api/users/:id/restore
 * Restore a soft-deleted user
 * Requires: Super Admin
 */
router.post(
  "/:id/restore",
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  logActivity(ACTION_TYPE.USER_RESTORED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Restored deleted user ${req.params.id}`,
    severity: "warning",
  }),
  UserController.restoreUser.bind(UserController)
);

/**
 * DELETE /api/users/:id/hard
 * Permanently delete user (hard delete)
 * Requires: Super Admin
 */
router.delete(
  "/:id/hard",
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  logActivity(ACTION_TYPE.USER_HARD_DELETED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `PERMANENTLY deleted user ${req.params.id}`,
    severity: "critical",
  }),
  UserController.hardDeleteUser.bind(UserController)
);

// ==================== ADMIN BULK OPERATIONS ====================

/**
 * POST /api/users/bulk/status
 * Bulk update user status
 * Requires: Admin
 */
router.post(
  "/bulk/status",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USERS_BULK_STATUS_UPDATED, ENTITY_TYPE.USER),
  UserController.bulkUpdateStatus.bind(UserController)
);

/**
 * POST /api/users/bulk/action
 * Bulk perform action on users
 * Requires: Admin
 */
router.post(
  "/bulk/action",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USERS_BULK_ACTION, ENTITY_TYPE.USER, {
    getDescription: (req) => `Performed bulk action: ${req.body.action}`,
  }),
  UserController.bulkAction.bind(UserController)
);

/**
 * POST /api/users/bulk/delete
 * Bulk soft delete users
 * Requires: Admin
 */
router.post(
  "/bulk/delete",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USERS_BULK_DELETED, ENTITY_TYPE.USER, {
    getDescription: (req) => `Bulk deleted ${req.body.userIds?.length} users`,
    severity: "warning",
  }),
  UserController.bulkDelete.bind(UserController)
);

/**
 * POST /api/users/bulk/restore
 * Bulk restore deleted users
 * Requires: Super Admin
 */
router.post(
  "/bulk/restore",
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  logActivity(ACTION_TYPE.USERS_BULK_RESTORED, ENTITY_TYPE.USER, {
    getDescription: (req) => `Bulk restored ${req.body.userIds?.length} users`,
    severity: "warning",
  }),
  UserController.bulkRestore.bind(UserController)
);

// ==================== SEARCH & EXPORT ====================

/**
 * POST /api/users/search
 * Advanced user search
 * Requires: Admin
 */
router.post(
  "/search",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  UserController.searchUsers.bind(UserController)
);

/**
 * GET /api/users/export
 * Export users to CSV/Excel
 * Requires: Admin
 */
router.get(
  "/export",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USERS_EXPORTED, ENTITY_TYPE.USER, {
    getDescription: (req) => `Exported users in ${req.query.format || 'csv'} format`,
  }),
  UserController.exportUsers.bind(UserController)
);

// ==================== ACTIVITY LOGS ====================

/**
 * GET /api/users/:id/activity
 * Get user activity log
 * Requires: Admin
 */
router.get(
  "/:id/activity",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  UserController.getUserActivity.bind(UserController)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/users
 * Create a new user
 * Requires: Admin
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_CREATED, ENTITY_TYPE.USER),
  UserController.create.bind(UserController)
);

/**
 * GET /api/users
 * List all users with filters
 * Supports include_deleted parameter for Super Admin
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  UserController.list.bind(UserController)
);

/**
 * GET /api/users/:id
 * Get user by ID
 * Supports include_deleted parameter
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  UserController.getById.bind(UserController)
);

/**
 * PUT /api/users/:id
 * Update user
 * Requires: Admin
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_UPDATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
  }),
  UserController.update.bind(UserController)
);

/**
 * DELETE /api/users/:id
 * Delete user (soft delete)
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_DELETED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
  }),
  UserController.delete.bind(UserController)
);

// ==================== ROLE & PERMISSIONS ====================

/**
 * PUT /api/users/:id/role
 * Update user role
 * Requires: Super Admin
 */
router.put(
  "/:id/role",
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  logActivity(ACTION_TYPE.USER_ROLE_UPDATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Updated role for user ${req.params.id} to ${req.body.role}`,
    severity: "warning",
  }),
  UserController.updateRole.bind(UserController)
);

/**
 * PUT /api/users/:id/permissions
 * Update user permissions
 * Requires: Super Admin
 */
router.put(
  "/:id/permissions",
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  logActivity(ACTION_TYPE.USER_PERMISSIONS_UPDATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    severity: "warning",
  }),
  UserController.updatePermissions.bind(UserController)
);

// ==================== USER STATUS ====================

/**
 * PUT /api/users/:id/activate
 * Activate user
 * Requires: Admin
 */
router.put(
  "/:id/activate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_ACTIVATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
  }),
  UserController.activate.bind(UserController)
);

/**
 * PUT /api/users/:id/deactivate
 * Deactivate user
 * Requires: Admin
 */
router.put(
  "/:id/deactivate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_DEACTIVATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
  }),
  UserController.deactivate.bind(UserController)
);

/**
 * PUT /api/users/:id/suspend
 * Suspend user
 * Requires: Admin
 */
router.put(
  "/:id/suspend",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_SUSPENDED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    severity: "warning",
  }),
  UserController.suspend.bind(UserController)
);

/**
 * PUT /api/users/:id/reactivate
 * Reactivate user (unsuspend)
 * Requires: Admin
 */
router.put(
  "/:id/reactivate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_ACTIVATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
  }),
  UserController.reactivate.bind(UserController)
);

/**
 * PUT /api/users/:id/verify-email
 * Force verify user email
 * Requires: Admin
 */
router.put(
  "/:id/verify-email",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.USER_UPDATED, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Admin force verified email for user ${req.params.id}`,
  }),
  UserController.forceVerifyEmail.bind(UserController)
);

/**
 * POST /api/users/:id/send-password-reset
 * Send password reset email
 * Requires: Admin
 */
router.post(
  "/:id/send-password-reset",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.PASSWORD_RESET_SENT, ENTITY_TYPE.USER, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Admin sent password reset for user ${req.params.id}`,
  }),
  UserController.sendPasswordReset.bind(UserController)
);

export default router;