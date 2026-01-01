"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _bundleController = _interopRequireDefault(require("./bundle.controller.js"));
var _authMiddleware = require("../../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../../utils/constants/user.constants.js");
var _activityConstants = require("../../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/bundles/public
 * Get all public bundles
 * Public access
 */
router.get("/public", _authMiddleware.optionalAuth, _bundleController["default"].getPublicBundles.bind(_bundleController["default"]));

/**
 * GET /api/bundles/featured
 * Get featured bundles
 * Public access (optional auth for personalization)
 */
router.get("/featured", _authMiddleware.optionalAuth, _bundleController["default"].getFeatured.bind(_bundleController["default"]));

/**
 * GET /api/bundles/popular
 * Get popular bundles
 * Public access
 */
router.get("/popular", _authMiddleware.optionalAuth, _bundleController["default"].getPopular.bind(_bundleController["default"]));

/**
 * GET /api/bundles/best-value
 * Get best value bundles
 * Public access
 */
router.get("/best-value", _authMiddleware.optionalAuth, _bundleController["default"].getBestValue.bind(_bundleController["default"]));

/**
 * GET /api/bundles/price-range
 * Get bundles by price range
 * Public access
 */
router.get("/price-range", _authMiddleware.optionalAuth, _bundleController["default"].getByPriceRange.bind(_bundleController["default"]));

/**
 * GET /api/bundles/slug/:slug
 * Get bundle by slug
 * Public access
 */
router.get("/slug/:slug", _authMiddleware.optionalAuth, _bundleController["default"].getBySlug.bind(_bundleController["default"]));

/**
 * GET /api/bundles/event/:eventId
 * Get bundles by event
 * Public access
 */
router.get("/event/:eventId", _authMiddleware.optionalAuth, _bundleController["default"].getByEvent.bind(_bundleController["default"]));

/**
 * GET /api/bundles/event/:eventId/available
 * Get available bundles for event (active and within validity)
 * Public access
 */
router.get("/event/:eventId/available", _authMiddleware.optionalAuth, _bundleController["default"].getAvailableByEvent.bind(_bundleController["default"]));

/**
 * GET /api/bundles/category/:categoryId
 * Get bundles by category
 * Public access
 */
router.get("/category/:categoryId", _authMiddleware.optionalAuth, _bundleController["default"].getByCategory.bind(_bundleController["default"]));

/**
 * GET /api/bundles/:id/validate
 * Validate bundle availability for purchase
 * Public access
 */
router.get("/:id/validate", _bundleController["default"].validateAvailability.bind(_bundleController["default"]));

// ==================== ADMIN SPECIAL QUERIES ====================

/**
 * GET /api/bundles/expiring-soon
 * Get bundles expiring soon
 * Requires: Admin
 */
router.get("/expiring-soon", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _bundleController["default"].getExpiringSoon.bind(_bundleController["default"]));

/**
 * GET /api/bundles/expired
 * Get expired bundles
 * Requires: Admin
 */
router.get("/expired", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _bundleController["default"].getExpired.bind(_bundleController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/bundles
 * Create a new bundle
 * Requires: Admin, Organiser
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_CREATED, _activityConstants.ENTITY_TYPE.BUNDLE), _bundleController["default"].create.bind(_bundleController["default"]));

/**
 * GET /api/bundles
 * List all bundles with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _bundleController["default"].list.bind(_bundleController["default"]));

/**
 * GET /api/bundles/:id
 * Get bundle by ID
 * Public access (for purchase flow)
 */
router.get("/:id", _authMiddleware.optionalAuth, _bundleController["default"].getById.bind(_bundleController["default"]));

/**
 * PUT /api/bundles/:id
 * Update bundle
 * Requires: Admin, Organiser
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_UPDATED, _activityConstants.ENTITY_TYPE.BUNDLE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _bundleController["default"].update.bind(_bundleController["default"]));

/**
 * DELETE /api/bundles/:id
 * Delete bundle (soft delete)
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_DELETED, _activityConstants.ENTITY_TYPE.BUNDLE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _bundleController["default"]["delete"].bind(_bundleController["default"]));

// ==================== STATUS MANAGEMENT ====================

/**
 * PUT /api/bundles/:id/activate
 * Activate bundle
 * Requires: Admin, Organiser
 */
router.put("/:id/activate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_ACTIVATED, _activityConstants.ENTITY_TYPE.BUNDLE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _bundleController["default"].activate.bind(_bundleController["default"]));

/**
 * PUT /api/bundles/:id/deactivate
 * Deactivate bundle
 * Requires: Admin, Organiser
 */
router.put("/:id/deactivate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_DEACTIVATED, _activityConstants.ENTITY_TYPE.BUNDLE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _bundleController["default"].deactivate.bind(_bundleController["default"]));

/**
 * PUT /api/bundles/:id/toggle-featured
 * Toggle bundle featured status
 * Requires: Admin, Organiser
 */
router.put("/:id/toggle-featured", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_FEATURED_TOGGLED, _activityConstants.ENTITY_TYPE.BUNDLE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _bundleController["default"].toggleFeatured.bind(_bundleController["default"]));

/**
 * PUT /api/bundles/:id/toggle-popular
 * Toggle bundle popular status
 * Requires: Admin, Organiser
 */
router.put("/:id/toggle-popular", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.BUNDLE_POPULAR_TOGGLED, _activityConstants.ENTITY_TYPE.BUNDLE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _bundleController["default"].togglePopular.bind(_bundleController["default"]));
var _default = exports["default"] = router;