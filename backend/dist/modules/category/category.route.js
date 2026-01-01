"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventCategoryRouter = exports["default"] = void 0;
var _express = require("express");
var _categoryController = _interopRequireDefault(require("./category.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/categories/public
 * Get all active categories (public)
 */
router.get("/public", _categoryController["default"].listPublic.bind(_categoryController["default"]));

/**
 * GET /api/categories/featured
 * Get featured categories (public)
 */
router.get("/featured", _categoryController["default"].getFeatured.bind(_categoryController["default"]));

/**
 * GET /api/categories/slug/:slug
 * Get category by slug (public)
 */
router.get("/slug/:slug", _categoryController["default"].getBySlug.bind(_categoryController["default"]));

// ==================== ADMIN ROUTES ====================

/**
 * POST /api/categories
 * Create a new category
 * Requires: Admin, Organiser
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CATEGORY_CREATED, _activityConstants.ENTITY_TYPE.CATEGORY), _categoryController["default"].create.bind(_categoryController["default"]));

/**
 * GET /api/categories
 * List all categories with filters
 * Public access (returns only active/published categories for non-admin users)
 */
router.get("/", _authMiddleware.optionalAuth, _categoryController["default"].list.bind(_categoryController["default"]));

/**
 * PUT /api/categories/reorder
 * Reorder multiple categories
 * Requires: Admin, Organiser
 */
router.put("/reorder", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CATEGORIES_REORDERED, _activityConstants.ENTITY_TYPE.CATEGORY), _categoryController["default"].reorder.bind(_categoryController["default"]));

/**
 * GET /api/categories/:id
 * Get category by ID
 * Requires: Admin or public access for active categories
 */
router.get("/:id", _authMiddleware.optionalAuth, _categoryController["default"].getById.bind(_categoryController["default"]));

/**
 * PUT /api/categories/:id
 * Update a category
 * Requires: Admin, Organiser
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CATEGORY_UPDATE, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].update.bind(_categoryController["default"]));

/**
 * DELETE /api/categories/:id
 * Soft delete a category
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CATEGORY_DELETE, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"]["delete"].bind(_categoryController["default"]));

// ==================== VOTING LIFECYCLE ====================

/**
 * PUT /api/categories/:id/voting/open
 * Open voting for a category
 * Requires: Admin, Organiser
 */
router.put("/:id/voting/open", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.VOTING_OPENED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Opened voting for category ".concat(req.params.id);
  }
}), _categoryController["default"].openVoting.bind(_categoryController["default"]));

/**
 * PUT /api/categories/:id/voting/close
 * Close voting for a category
 * Requires: Admin, Organiser
 */
router.put("/:id/voting/close", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.VOTING_CLOSED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Closed voting for category ".concat(req.params.id);
  }
}), _categoryController["default"].closeVoting.bind(_categoryController["default"]));

/**
 * PUT /api/categories/:id/voting/deadline
 * Update voting deadline
 * Requires: Admin, Organiser
 */
router.put("/:id/voting/deadline", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.DEADLINE_UPDATED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].updateDeadline.bind(_categoryController["default"]));

/**
 * PUT /api/categories/:id/voting/extend
 * Extend voting deadline
 * Requires: Admin, Organiser
 */
router.put("/:id/voting/extend", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.DEADLINE_EXTENDED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].extendDeadline.bind(_categoryController["default"]));

// ==================== CANDIDATE MANAGEMENT ====================

/**
 * GET /api/categories/:id/candidates
 * Get candidates in a category
 * Public access allowed for active categories
 */
router.get("/:id/candidates", _authMiddleware.optionalAuth, _categoryController["default"].getCandidates.bind(_categoryController["default"]));

/**
 * POST /api/categories/:id/candidates
 * Add candidates to a category
 * Requires: Admin, Organiser
 */
router.post("/:id/candidates", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATES_ADDED_TO_CATEGORY, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].addCandidates.bind(_categoryController["default"]));

/**
 * DELETE /api/categories/:id/candidates
 * Remove candidates from a category
 * Requires: Admin, Organiser
 */
router["delete"]("/:id/candidates", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATES_REMOVED_FROM_CATEGORY, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].removeCandidates.bind(_categoryController["default"]));

// ==================== FEATURED ====================

/**
 * PUT /api/categories/:id/featured
 * Toggle featured status
 * Requires: Admin, Organiser
 */
router.put("/:id/featured", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CATEGORY_FEATURED_TOGGLED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].toggleFeatured.bind(_categoryController["default"]));

// ==================== DISPLAY ORDER ====================

/**
 * PUT /api/categories/:id/order
 * Update single category display order
 * Requires: Admin, Organiser
 */
router.put("/:id/order", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CATEGORY_ORDER_UPDATED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _categoryController["default"].updateOrder.bind(_categoryController["default"]));

// ==================== STATISTICS & RESULTS ====================

/**
 * GET /api/categories/:id/stats
 * Get category statistics
 * Requires: Admin
 */
router.get("/:id/stats", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _categoryController["default"].getStats.bind(_categoryController["default"]));

/**
 * GET /api/categories/:id/results
 * Get category results
 * Public access allowed for published results
 */
router.get("/:id/results", _authMiddleware.optionalAuth, _categoryController["default"].getResults.bind(_categoryController["default"]));

/**
 * PUT /api/categories/:id/results/publish
 * Publish category results
 * Requires: Admin
 */
router.put("/:id/results/publish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.RESULTS_PUBLISHED, _activityConstants.ENTITY_TYPE.CATEGORY, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Published results for category ".concat(req.params.id);
  }
}), _categoryController["default"].publishResults.bind(_categoryController["default"]));

/**
 * GET /api/categories/:id/vote-counts
 * Get vote counts by candidate
 * Requires: Admin
 */
router.get("/:id/vote-counts", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _categoryController["default"].getVoteCounts.bind(_categoryController["default"]));
var _default = exports["default"] = router; // ==================== EVENT-SPECIFIC ROUTES ====================
// These should be mounted under /api/events/:eventId/categories in event routes
/**
 * Event category routes (to be mounted separately)
 */
var eventCategoryRouter = exports.eventCategoryRouter = (0, _express.Router)({
  mergeParams: true
});

/**
 * GET /api/events/:eventId/categories
 * Get categories by event
 * Requires: Admin
 */
eventCategoryRouter.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _categoryController["default"].getByEvent.bind(_categoryController["default"]));

/**
 * GET /api/events/:eventId/categories/public
 * Get public categories for voting
 * Public access
 */
eventCategoryRouter.get("/public", _categoryController["default"].getPublicByEvent.bind(_categoryController["default"]));