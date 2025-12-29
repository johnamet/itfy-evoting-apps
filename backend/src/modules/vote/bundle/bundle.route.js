import { Router } from "express";
import BundleController from "./bundle.controller.js";
import {
  authenticate,
  authorize,
  optionalAuth,
} from "../../../middleware/auth.middleware.js";
import { logActivity } from "../../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/bundles/public
 * Get all public bundles
 * Public access
 */
router.get("/public", optionalAuth, BundleController.getPublicBundles.bind(BundleController));  


/**
 * GET /api/bundles/featured
 * Get featured bundles
 * Public access (optional auth for personalization)
 */
router.get("/featured", optionalAuth, BundleController.getFeatured.bind(BundleController));

/**
 * GET /api/bundles/popular
 * Get popular bundles
 * Public access
 */
router.get("/popular", optionalAuth, BundleController.getPopular.bind(BundleController));

/**
 * GET /api/bundles/best-value
 * Get best value bundles
 * Public access
 */
router.get("/best-value", optionalAuth, BundleController.getBestValue.bind(BundleController));

/**
 * GET /api/bundles/price-range
 * Get bundles by price range
 * Public access
 */
router.get("/price-range", optionalAuth, BundleController.getByPriceRange.bind(BundleController));

/**
 * GET /api/bundles/slug/:slug
 * Get bundle by slug
 * Public access
 */
router.get("/slug/:slug", optionalAuth, BundleController.getBySlug.bind(BundleController));

/**
 * GET /api/bundles/event/:eventId
 * Get bundles by event
 * Public access
 */
router.get("/event/:eventId", optionalAuth, BundleController.getByEvent.bind(BundleController));

/**
 * GET /api/bundles/event/:eventId/available
 * Get available bundles for event (active and within validity)
 * Public access
 */
router.get(
  "/event/:eventId/available",
  optionalAuth,
  BundleController.getAvailableByEvent.bind(BundleController)
);

/**
 * GET /api/bundles/category/:categoryId
 * Get bundles by category
 * Public access
 */
router.get(
  "/category/:categoryId",
  optionalAuth,
  BundleController.getByCategory.bind(BundleController)
);

/**
 * GET /api/bundles/:id/validate
 * Validate bundle availability for purchase
 * Public access
 */
router.get("/:id/validate", BundleController.validateAvailability.bind(BundleController));

// ==================== ADMIN SPECIAL QUERIES ====================

/**
 * GET /api/bundles/expiring-soon
 * Get bundles expiring soon
 * Requires: Admin
 */
router.get(
  "/expiring-soon",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  BundleController.getExpiringSoon.bind(BundleController)
);

/**
 * GET /api/bundles/expired
 * Get expired bundles
 * Requires: Admin
 */
router.get(
  "/expired",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  BundleController.getExpired.bind(BundleController)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/bundles
 * Create a new bundle
 * Requires: Admin, Organiser
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.BUNDLE_CREATED, ENTITY_TYPE.BUNDLE),
  BundleController.create.bind(BundleController)
);

/**
 * GET /api/bundles
 * List all bundles with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  BundleController.list.bind(BundleController)
);

/**
 * GET /api/bundles/:id
 * Get bundle by ID
 * Public access (for purchase flow)
 */
router.get("/:id", optionalAuth, BundleController.getById.bind(BundleController));

/**
 * PUT /api/bundles/:id
 * Update bundle
 * Requires: Admin, Organiser
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.BUNDLE_UPDATED, ENTITY_TYPE.BUNDLE, {
    getEntityId: (req) => req.params.id,
  }),
  BundleController.update.bind(BundleController)
);

/**
 * DELETE /api/bundles/:id
 * Delete bundle (soft delete)
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.BUNDLE_DELETED, ENTITY_TYPE.BUNDLE, {
    getEntityId: (req) => req.params.id,
  }),
  BundleController.delete.bind(BundleController)
);

// ==================== STATUS MANAGEMENT ====================

/**
 * PUT /api/bundles/:id/activate
 * Activate bundle
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/activate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.BUNDLE_ACTIVATED, ENTITY_TYPE.BUNDLE, {
    getEntityId: (req) => req.params.id,
  }),
  BundleController.activate.bind(BundleController)
);

/**
 * PUT /api/bundles/:id/deactivate
 * Deactivate bundle
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/deactivate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.BUNDLE_DEACTIVATED, ENTITY_TYPE.BUNDLE, {
    getEntityId: (req) => req.params.id,
  }),
  BundleController.deactivate.bind(BundleController)
);

/**
 * PUT /api/bundles/:id/toggle-featured
 * Toggle bundle featured status
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/toggle-featured",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.BUNDLE_FEATURED_TOGGLED, ENTITY_TYPE.BUNDLE, {
    getEntityId: (req) => req.params.id,
  }),
  BundleController.toggleFeatured.bind(BundleController)
);

/**
 * PUT /api/bundles/:id/toggle-popular
 * Toggle bundle popular status
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/toggle-popular",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.BUNDLE_POPULAR_TOGGLED, ENTITY_TYPE.BUNDLE, {
    getEntityId: (req) => req.params.id,
  }),
  BundleController.togglePopular.bind(BundleController)
);

export default router;
