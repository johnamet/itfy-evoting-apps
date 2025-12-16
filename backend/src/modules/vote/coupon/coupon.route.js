import { Router } from "express";
import CouponController from "./coupon.controller.js";
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
 * GET /api/coupons/public
 * Get public coupons
 * Public access
 */
router.get("/public", optionalAuth, CouponController.getPublic.bind(CouponController));

/**
 * GET /api/coupons/code/:code
 * Get coupon by code
 * Public access (for validation display)
 */
router.get("/code/:code", optionalAuth, CouponController.getByCode.bind(CouponController));

/**
 * POST /api/coupons/validate
 * Validate coupon for a bundle
 * Public access (for checkout validation)
 */
router.post("/validate", optionalAuth, CouponController.validateCoupon.bind(CouponController));

/**
 * POST /api/coupons/apply
 * Apply coupon to a purchase (calculate discount)
 * Public access (for checkout)
 */
router.post("/apply", optionalAuth, CouponController.applyCoupon.bind(CouponController));

// ==================== EVENT-BASED QUERIES (PUBLIC) ====================

/**
 * GET /api/coupons/event/:eventId/active
 * Get active coupons for event
 * Public access
 */
router.get(
  "/event/:eventId/active",
  optionalAuth,
  CouponController.getActiveByEvent.bind(CouponController)
);

// ==================== ADMIN CODE GENERATION ====================

/**
 * POST /api/coupons/generate-code
 * Generate a unique coupon code
 * Requires: Admin, Organiser
 */
router.post(
  "/generate-code",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  CouponController.generateCode.bind(CouponController)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/coupons
 * Create a new coupon
 * Requires: Admin, Organiser
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.COUPON_CREATED, ENTITY_TYPE.COUPON),
  CouponController.create.bind(CouponController)
);

/**
 * GET /api/coupons
 * List all coupons with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CouponController.list.bind(CouponController)
);

/**
 * GET /api/coupons/event/:eventId
 * Get coupons by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CouponController.getByEvent.bind(CouponController)
);

/**
 * GET /api/coupons/:id
 * Get coupon by ID
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  CouponController.getById.bind(CouponController)
);

/**
 * PUT /api/coupons/:id
 * Update coupon
 * Requires: Admin, Organiser
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.COUPON_UPDATED, ENTITY_TYPE.COUPON, {
    getEntityId: (req) => req.params.id,
  }),
  CouponController.update.bind(CouponController)
);

/**
 * DELETE /api/coupons/:id
 * Delete coupon (soft delete)
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.COUPON_DELETED, ENTITY_TYPE.COUPON, {
    getEntityId: (req) => req.params.id,
  }),
  CouponController.delete.bind(CouponController)
);

// ==================== STATUS MANAGEMENT ====================

/**
 * PUT /api/coupons/:id/activate
 * Activate coupon
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/activate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.COUPON_ACTIVATED, ENTITY_TYPE.COUPON, {
    getEntityId: (req) => req.params.id,
  }),
  CouponController.activate.bind(CouponController)
);

/**
 * PUT /api/coupons/:id/deactivate
 * Deactivate coupon
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/deactivate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.COUPON_DEACTIVATED, ENTITY_TYPE.COUPON, {
    getEntityId: (req) => req.params.id,
  }),
  CouponController.deactivate.bind(CouponController)
);

// ==================== STATISTICS ====================

/**
 * GET /api/coupons/:id/stats
 * Get coupon statistics
 * Requires: Admin
 */
router.get(
  "/:id/stats",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  CouponController.getStats.bind(CouponController)
);

/**
 * GET /api/coupons/:id/user-redemptions
 * Get user's redemption count for a coupon
 * Requires: Admin or authenticated user checking own redemptions
 */
router.get(
  "/:id/user-redemptions",
  authenticate,
  CouponController.getUserRedemptions.bind(CouponController)
);

export default router;
