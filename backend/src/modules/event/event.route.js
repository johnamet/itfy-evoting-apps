import { Router } from "express";
import EventController from "./event.controller.js";
import { eventCategoryRouter } from "../category/category.route.js";
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
 * GET /api/events/public
 * List published public events
 */
router.get("/public", EventController.listPublic.bind(EventController));

/**
 * GET /api/events/featured
 * Get featured events
 */
router.get("/featured", EventController.getFeatured.bind(EventController));

/**
 * GET /api/events/upcoming
 * Get upcoming events
 */
router.get("/upcoming", EventController.getUpcoming.bind(EventController));

/**
 * GET /api/events/slug/:slug
 * Get event by slug (public)
 */
router.get("/slug/:slug", EventController.getBySlug.bind(EventController));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/events
 * Create a new event
 * Requires: Admin, Organiser
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_CREATED, ENTITY_TYPE.EVENT),
  EventController.create.bind(EventController)
);

/**
 * GET /api/events
 * List all events with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  EventController.list.bind(EventController)
);

/**
 * GET /api/events/:id
 * Get event by ID
 * Optional auth - public for published, auth for unpublished
 */
router.get(
  "/:id",
  optionalAuth,
  EventController.getById.bind(EventController)
);

/**
 * PUT /api/events/:id
 * Update event
 * Requires: Admin, Organiser
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_UPDATED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
  }),
  EventController.update.bind(EventController)
);

/**
 * DELETE /api/events/:id
 * Soft delete event
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.EVENT_DELETED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
  }),
  EventController.delete.bind(EventController)
);

// ==================== EVENT LIFECYCLE ====================

/**
 * PUT /api/events/:id/publish
 * Publish event
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/publish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_PUBLISHED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Published event ${req.params.id}`,
  }),
  EventController.publish.bind(EventController)
);

/**
 * PUT /api/events/:id/unpublish
 * Unpublish event
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/unpublish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_UNPUBLISHED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Unpublished event ${req.params.id}`,
  }),
  EventController.unpublish.bind(EventController)
);

/**
 * PUT /api/events/:id/status
 * Update event status
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/status",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_STATUS_UPDATED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
  }),
  EventController.updateStatus.bind(EventController)
);

/**
 * PUT /api/events/:id/cancel
 * Cancel event
 * Requires: Admin
 */
router.put(
  "/:id/cancel",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.EVENT_CANCELLED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Cancelled event ${req.params.id}`,
    severity: "warning",
  }),
  EventController.cancel.bind(EventController)
);

/**
 * PUT /api/events/:id/complete
 * Complete event
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/complete",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_COMPLETED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Completed event ${req.params.id}`,
  }),
  EventController.complete.bind(EventController)
);

// ==================== FEATURED ====================

/**
 * PUT /api/events/:id/featured
 * Toggle featured status
 * Requires: Admin
 */
router.put(
  "/:id/featured",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.EVENT_FEATURED_TOGGLED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
  }),
  EventController.toggleFeatured.bind(EventController)
);

// ==================== EVENT CATEGORIES ====================

/**
 * GET /api/events/:id/categories
 * Get event categories
 * Public access for published events
 */
router.get(
  "/:id/categories",
  optionalAuth,
  EventController.getCategories.bind(EventController)
);

/**
 * Mount category routes under /api/events/:eventId/categories
 * Uses eventCategoryRouter from category.route.js
 */
router.use("/:eventId/categories", eventCategoryRouter);

// ==================== EVENT CANDIDATES ====================

/**
 * GET /api/events/:id/candidates
 * Get event candidates
 * Public access for published events
 */
router.get(
  "/:id/candidates",
  optionalAuth,
  EventController.getCandidates.bind(EventController)
);

// ==================== STATISTICS ====================

/**
 * GET /api/events/:id/stats
 * Get event statistics
 * Requires: Admin
 */
router.get(
  "/:id/stats",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  EventController.getStats.bind(EventController)
);

/**
 * GET /api/events/:id/votes/summary
 * Get event vote summary
 * Requires: Admin
 */
router.get(
  "/:id/votes/summary",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  EventController.getVoteSummary.bind(EventController)
);

// ==================== RESULTS ====================

/**
 * GET /api/events/:id/results
 * Get event results
 * Public access for published results
 */
router.get(
  "/:id/results",
  optionalAuth,
  EventController.getResults.bind(EventController)
);

/**
 * PUT /api/events/:id/results/publish
 * Publish event results
 * Requires: Admin
 */
router.put(
  "/:id/results/publish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.EVENT_RESULTS_PUBLISHED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Published results for event ${req.params.id}`,
  }),
  EventController.publishResults.bind(EventController)
);

// ==================== ADMIN OPERATIONS ====================

/**
 * POST /api/events/:id/duplicate
 * Duplicate event
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/duplicate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.EVENT_DUPLICATED, ENTITY_TYPE.EVENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Duplicated event ${req.params.id}`,
  }),
  EventController.duplicate.bind(EventController)
);

export default router;

// ==================== ADMIN EVENT ROUTES ====================
// These can be mounted under /api/admin/events if needed

/**
 * Admin event routes (optional separate mounting)
 */
export const adminEventRouter = Router();

/**
 * GET /api/admin/events
 * List all events for admin (including unpublished)
 * Requires: Admin
 */
adminEventRouter.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  EventController.adminList.bind(EventController)
);
