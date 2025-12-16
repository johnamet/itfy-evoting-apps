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

export default router;
