import { Router } from "express";
import CategoryController from "./category.controller.js";
import {
  authenticate,
  authorize,
  optionalAuth,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/categories/featured
 * Get featured categories (public)
 */
router.get("/featured", CategoryController.getFeatured.bind(CategoryController));

// ==================== ADMIN ROUTES ====================

/**
 * POST /api/categories
 * Create a new category
 * Requires: Admin, Organiser
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CATEGORY_CREATED, ENTITY_TYPE.CATEGORY),
  CategoryController.create.bind(CategoryController)
);

/**
 * GET /api/categories
 * List all categories with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CategoryController.list.bind(CategoryController)
);

/**
 * PUT /api/categories/reorder
 * Reorder multiple categories
 * Requires: Admin, Organiser
 */
router.put(
  "/reorder",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CATEGORIES_REORDERED, ENTITY_TYPE.CATEGORY),
  CategoryController.reorder.bind(CategoryController)
);

/**
 * GET /api/categories/:id
 * Get category by ID
 * Requires: Admin or public access for active categories
 */
router.get(
  "/:id",
  optionalAuth,
  CategoryController.getById.bind(CategoryController)
);

/**
 * PUT /api/categories/:id
 * Update a category
 * Requires: Admin, Organiser
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CATEGORY_UPDATE, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.update.bind(CategoryController)
);

/**
 * DELETE /api/categories/:id
 * Soft delete a category
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.CATEGORY_DELETE, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.delete.bind(CategoryController)
);

// ==================== VOTING LIFECYCLE ====================

/**
 * PUT /api/categories/:id/voting/open
 * Open voting for a category
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/voting/open",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.VOTING_OPENED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Opened voting for category ${req.params.id}`,
  }),
  CategoryController.openVoting.bind(CategoryController)
);

/**
 * PUT /api/categories/:id/voting/close
 * Close voting for a category
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/voting/close",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.VOTING_CLOSED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Closed voting for category ${req.params.id}`,
  }),
  CategoryController.closeVoting.bind(CategoryController)
);

/**
 * PUT /api/categories/:id/voting/deadline
 * Update voting deadline
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/voting/deadline",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.DEADLINE_UPDATED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.updateDeadline.bind(CategoryController)
);

/**
 * PUT /api/categories/:id/voting/extend
 * Extend voting deadline
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/voting/extend",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.DEADLINE_EXTENDED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.extendDeadline.bind(CategoryController)
);

// ==================== CANDIDATE MANAGEMENT ====================

/**
 * GET /api/categories/:id/candidates
 * Get candidates in a category
 * Public access allowed for active categories
 */
router.get(
  "/:id/candidates",
  optionalAuth,
  CategoryController.getCandidates.bind(CategoryController)
);

/**
 * POST /api/categories/:id/candidates
 * Add candidates to a category
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/candidates",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATES_ADDED_TO_CATEGORY, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.addCandidates.bind(CategoryController)
);

/**
 * DELETE /api/categories/:id/candidates
 * Remove candidates from a category
 * Requires: Admin, Organiser
 */
router.delete(
  "/:id/candidates",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATES_REMOVED_FROM_CATEGORY, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.removeCandidates.bind(CategoryController)
);

// ==================== FEATURED ====================

/**
 * PUT /api/categories/:id/featured
 * Toggle featured status
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/featured",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CATEGORY_FEATURED_TOGGLED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.toggleFeatured.bind(CategoryController)
);

// ==================== DISPLAY ORDER ====================

/**
 * PUT /api/categories/:id/order
 * Update single category display order
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/order",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CATEGORY_ORDER_UPDATED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
  }),
  CategoryController.updateOrder.bind(CategoryController)
);

// ==================== STATISTICS & RESULTS ====================

/**
 * GET /api/categories/:id/stats
 * Get category statistics
 * Requires: Admin
 */
router.get(
  "/:id/stats",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CategoryController.getStats.bind(CategoryController)
);

/**
 * GET /api/categories/:id/results
 * Get category results
 * Public access allowed for published results
 */
router.get(
  "/:id/results",
  optionalAuth,
  CategoryController.getResults.bind(CategoryController)
);

/**
 * PUT /api/categories/:id/results/publish
 * Publish category results
 * Requires: Admin
 */
router.put(
  "/:id/results/publish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.RESULTS_PUBLISHED, ENTITY_TYPE.CATEGORY, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Published results for category ${req.params.id}`,
  }),
  CategoryController.publishResults.bind(CategoryController)
);

/**
 * GET /api/categories/:id/vote-counts
 * Get vote counts by candidate
 * Requires: Admin
 */
router.get(
  "/:id/vote-counts",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CategoryController.getVoteCounts.bind(CategoryController)
);

export default router;

// ==================== EVENT-SPECIFIC ROUTES ====================
// These should be mounted under /api/events/:eventId/categories in event routes

/**
 * Event category routes (to be mounted separately)
 */
export const eventCategoryRouter = Router({ mergeParams: true });

/**
 * GET /api/events/:eventId/categories
 * Get categories by event
 * Requires: Admin
 */
eventCategoryRouter.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CategoryController.getByEvent.bind(CategoryController)
);

/**
 * GET /api/events/:eventId/categories/public
 * Get public categories for voting
 * Public access
 */
eventCategoryRouter.get(
  "/public",
  CategoryController.getPublicByEvent.bind(CategoryController)
);
