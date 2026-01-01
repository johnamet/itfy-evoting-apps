"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _couponController = _interopRequireDefault(require("./coupon.controller.js"));
var _authMiddleware = require("../../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../../utils/constants/user.constants.js");
var _activityConstants = require("../../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/coupons/public
 * Get public coupons
 * Public access
 */
router.get("/public", _authMiddleware.optionalAuth, _couponController["default"].getPublic.bind(_couponController["default"]));

/**
 * GET /api/coupons/code/:code
 * Get coupon by code
 * Public access (for validation display)
 */
router.get("/code/:code", _authMiddleware.optionalAuth, _couponController["default"].getByCode.bind(_couponController["default"]));

/**
 * POST /api/coupons/validate
 * Validate coupon for a bundle
 * Public access (for checkout validation)
 */
router.post("/validate", _authMiddleware.optionalAuth, _couponController["default"].validateCoupon.bind(_couponController["default"]));

/**
 * POST /api/coupons/apply
 * Apply coupon to a purchase (calculate discount)
 * Public access (for checkout)
 */
router.post("/apply", _authMiddleware.optionalAuth, _couponController["default"].applyCoupon.bind(_couponController["default"]));

// ==================== EVENT-BASED QUERIES (PUBLIC) ====================

/**
 * GET /api/coupons/event/:eventId/active
 * Get active coupons for event
 * Public access
 */
router.get("/event/:eventId/active", _authMiddleware.optionalAuth, _couponController["default"].getActiveByEvent.bind(_couponController["default"]));

// ==================== ADMIN CODE GENERATION ====================

/**
 * POST /api/coupons/generate-code
 * Generate a unique coupon code
 * Requires: Admin, Organiser
 */
router.post("/generate-code", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _couponController["default"].generateCode.bind(_couponController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/coupons
 * Create a new coupon
 * Requires: Admin, Organiser
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.COUPON_CREATED, _activityConstants.ENTITY_TYPE.COUPON), _couponController["default"].create.bind(_couponController["default"]));

/**
 * GET /api/coupons
 * List all coupons with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _couponController["default"].list.bind(_couponController["default"]));

/**
 * GET /api/coupons/event/:eventId
 * Get coupons by event
 * Requires: Admin
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _couponController["default"].getByEvent.bind(_couponController["default"]));

/**
 * GET /api/coupons/:id
 * Get coupon by ID
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _couponController["default"].getById.bind(_couponController["default"]));

/**
 * PUT /api/coupons/:id
 * Update coupon
 * Requires: Admin, Organiser
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.COUPON_UPDATED, _activityConstants.ENTITY_TYPE.COUPON, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _couponController["default"].update.bind(_couponController["default"]));

/**
 * DELETE /api/coupons/:id
 * Delete coupon (soft delete)
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.COUPON_DELETED, _activityConstants.ENTITY_TYPE.COUPON, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _couponController["default"]["delete"].bind(_couponController["default"]));

// ==================== STATUS MANAGEMENT ====================

/**
 * PUT /api/coupons/:id/activate
 * Activate coupon
 * Requires: Admin, Organiser
 */
router.put("/:id/activate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.COUPON_ACTIVATED, _activityConstants.ENTITY_TYPE.COUPON, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _couponController["default"].activate.bind(_couponController["default"]));

/**
 * PUT /api/coupons/:id/deactivate
 * Deactivate coupon
 * Requires: Admin, Organiser
 */
router.put("/:id/deactivate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.COUPON_DEACTIVATED, _activityConstants.ENTITY_TYPE.COUPON, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _couponController["default"].deactivate.bind(_couponController["default"]));

// ==================== STATISTICS ====================

/**
 * GET /api/coupons/:id/stats
 * Get coupon statistics
 * Requires: Admin
 */
router.get("/:id/stats", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _couponController["default"].getStats.bind(_couponController["default"]));

/**
 * GET /api/coupons/:id/user-redemptions
 * Get user's redemption count for a coupon
 * Requires: Admin or authenticated user checking own redemptions
 */
router.get("/:id/user-redemptions", _authMiddleware.authenticate, _couponController["default"].getUserRedemptions.bind(_couponController["default"]));
var _default = exports["default"] = router;