import { Router } from "express";
import SlideController from "./slide.controller.js";
import {
  authenticate,
  authorize,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/slides/active
 * Get active (published) slides
 * Public access
 */
router.get("/active", SlideController.getActive.bind(SlideController));

/**
 * GET /api/slides/scheduled
 * Get scheduled slides within validity period
 * Public access
 */
router.get("/scheduled", SlideController.getScheduled.bind(SlideController));

/**
 * GET /api/slides/type/:type
 * Get slides by type
 * Public access
 */
router.get("/type/:type", SlideController.getByType.bind(SlideController));

/**
 * GET /api/slides/position/:position
 * Get slides by position
 * Public access
 */
router.get("/position/:position", SlideController.getByPosition.bind(SlideController));

/**
 * GET /api/slides/event/:eventId
 * Get slides by event
 * Public access
 */
router.get("/event/:eventId", SlideController.getByEvent.bind(SlideController));

// ==================== ANALYTICS (PUBLIC) ====================

/**
 * POST /api/slides/:id/view
 * Increment view count
 * Public access (tracking)
 */
router.post("/:id/view", SlideController.incrementViewCount.bind(SlideController));

/**
 * POST /api/slides/:id/click
 * Increment click count
 * Public access (tracking)
 */
router.post("/:id/click", SlideController.incrementClickCount.bind(SlideController));

// ==================== ADMIN BULK OPERATIONS ====================

/**
 * PUT /api/slides/reorder
 * Reorder slides
 * Requires: Admin, Organiser
 */
router.put(
  "/reorder",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDES_REORDERED, ENTITY_TYPE.SLIDE),
  SlideController.reorder.bind(SlideController)
);

/**
 * PUT /api/slides/bulk/status
 * Bulk update slide status
 * Requires: Admin
 */
router.put(
  "/bulk/status",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.SLIDES_BULK_STATUS_UPDATED, ENTITY_TYPE.SLIDE),
  SlideController.bulkUpdateStatus.bind(SlideController)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/slides
 * Create a new slide
 * Requires: Admin, Organiser
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_CREATED, ENTITY_TYPE.SLIDE),
  SlideController.create.bind(SlideController)
);

/**
 * GET /api/slides
 * List all slides with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SlideController.list.bind(SlideController)
);

/**
 * GET /api/slides/:id
 * Get slide by ID
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SlideController.getById.bind(SlideController)
);

/**
 * PUT /api/slides/:id
 * Update slide
 * Requires: Admin, Organiser
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_UPDATED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.update.bind(SlideController)
);

/**
 * DELETE /api/slides/:id
 * Delete slide (soft delete)
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.SLIDE_DELETED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.delete.bind(SlideController)
);

// ==================== STATUS MANAGEMENT ====================

/**
 * PUT /api/slides/:id/publish
 * Publish slide
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/publish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_PUBLISHED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.publish.bind(SlideController)
);

/**
 * PUT /api/slides/:id/unpublish
 * Unpublish slide (revert to draft)
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/unpublish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_UNPUBLISHED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.unpublish.bind(SlideController)
);

/**
 * PUT /api/slides/:id/archive
 * Archive slide
 * Requires: Admin
 */
router.put(
  "/:id/archive",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.SLIDE_ARCHIVED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.archive.bind(SlideController)
);

/**
 * PUT /api/slides/:id/toggle-active
 * Toggle slide active status
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/toggle-active",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_TOGGLED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.toggleActive.bind(SlideController)
);

// ==================== IMAGE MANAGEMENT ====================

/**
 * POST /api/slides/:id/image
 * Upload slide image
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/image",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_IMAGE_UPLOADED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
  }),
  SlideController.uploadImage.bind(SlideController)
);

// ==================== CLONING ====================

/**
 * POST /api/slides/:id/clone
 * Clone a slide
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/clone",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SLIDE_CLONED, ENTITY_TYPE.SLIDE, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Cloned slide ${req.params.id}`,
  }),
  SlideController.clone.bind(SlideController)
);

export default router;
