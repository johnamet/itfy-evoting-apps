"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.adminEventRouter = void 0;
var _express = require("express");
var _eventController = _interopRequireDefault(require("./event.controller.js"));
var _categoryRoute = require("../category/category.route.js");
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/events/public
 * List published public events
 */
router.get("/public", _eventController["default"].listPublic.bind(_eventController["default"]));

/**
 * GET /api/events/featured
 * Get featured events
 */
router.get("/featured", _eventController["default"].getFeatured.bind(_eventController["default"]));

/**
 * GET /api/events/upcoming
 * Get upcoming events
 */
router.get("/upcoming", _eventController["default"].getUpcoming.bind(_eventController["default"]));

/**
 * GET /api/events/slug/:slug
 * Get event by slug (public)
 */
router.get("/slug/:slug", _eventController["default"].getBySlug.bind(_eventController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/events
 * Create a new event
 * Requires: Admin, Organiser
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_CREATED, _activityConstants.ENTITY_TYPE.EVENT), _eventController["default"].create.bind(_eventController["default"]));

/**
 * GET /api/events
 * List all events with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _eventController["default"].list.bind(_eventController["default"]));

/**
 * GET /api/events/:id
 * Get event by ID
 * Optional auth - public for published, auth for unpublished
 */
router.get("/:id", _authMiddleware.optionalAuth, _eventController["default"].getById.bind(_eventController["default"]));

/**
 * PUT /api/events/:id
 * Update event
 * Requires: Admin, Organiser
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_UPDATED, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _eventController["default"].update.bind(_eventController["default"]));

/**
 * DELETE /api/events/:id
 * Soft delete event
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_DELETE, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _eventController["default"]["delete"].bind(_eventController["default"]));

// ==================== EVENT LIFECYCLE ====================

/**
 * PUT /api/events/:id/publish
 * Publish event
 * Requires: Admin, Organiser
 */
router.put("/:id/publish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_PUBLISH, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Published event ".concat(req.params.id);
  }
}), _eventController["default"].publish.bind(_eventController["default"]));

/**
 * PUT /api/events/:id/unpublish
 * Unpublish event
 * Requires: Admin, Organiser
 */
router.put("/:id/unpublish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_UNPUBLISH, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Unpublished event ".concat(req.params.id);
  }
}), _eventController["default"].unpublish.bind(_eventController["default"]));

/**
 * PUT /api/events/:id/status
 * Update event status
 * Requires: Admin, Organiser
 */
router.put("/:id/status", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_STATUS_UPDATED, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _eventController["default"].updateStatus.bind(_eventController["default"]));

/**
 * PUT /api/events/:id/cancel
 * Cancel event
 * Requires: Admin
 */
router.put("/:id/cancel", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_CANCELLED, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Cancelled event ".concat(req.params.id);
  },
  severity: "warning"
}), _eventController["default"].cancel.bind(_eventController["default"]));

/**
 * PUT /api/events/:id/complete
 * Complete event
 * Requires: Admin, Organiser
 */
router.put("/:id/complete", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_COMPLETE, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Completed event ".concat(req.params.id);
  }
}), _eventController["default"].complete.bind(_eventController["default"]));

// ==================== FEATURED ====================

/**
 * PUT /api/events/:id/featured
 * Toggle featured status
 * Requires: Admin
 */
router.put("/:id/featured", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_FEATURED_TOGGLED, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _eventController["default"].toggleFeatured.bind(_eventController["default"]));

// ==================== EVENT CATEGORIES ====================

/**
 * GET /api/events/:id/categories
 * Get event categories
 * Public access for published events
 */
router.get("/:id/categories", _authMiddleware.optionalAuth, _eventController["default"].getCategories.bind(_eventController["default"]));

/**
 * Mount category routes under /api/events/:eventId/categories
 * Uses eventCategoryRouter from category.route.js
 */
router.use("/:eventId/categories", _categoryRoute.eventCategoryRouter);

// ==================== EVENT CANDIDATES ====================

/**
 * GET /api/events/:id/candidates
 * Get event candidates
 * Public access for published events
 */
router.get("/:id/candidates", _authMiddleware.optionalAuth, _eventController["default"].getCandidates.bind(_eventController["default"]));

// ==================== STATISTICS ====================

/**
 * GET /api/events/:id/stats
 * Get event statistics
 * Requires: Admin
 */
router.get("/:id/stats", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _eventController["default"].getStats.bind(_eventController["default"]));

/**
 * GET /api/events/:id/votes/summary
 * Get event vote summary
 * Requires: Admin
 */
router.get("/:id/votes/summary", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _eventController["default"].getVoteSummary.bind(_eventController["default"]));

// ==================== RESULTS ====================

/**
 * GET /api/events/:id/results
 * Get event results
 * Public access for published results
 */
router.get("/:id/results", _authMiddleware.optionalAuth, _eventController["default"].getResults.bind(_eventController["default"]));

/**
 * PUT /api/events/:id/results/publish
 * Publish event results
 * Requires: Admin
 */
router.put("/:id/results/publish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_RESULTS_PUBLISHED, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Published results for event ".concat(req.params.id);
  }
}), _eventController["default"].publishResults.bind(_eventController["default"]));

// ==================== ADMIN OPERATIONS ====================

/**
 * POST /api/events/:id/duplicate
 * Duplicate event
 * Requires: Admin, Organiser
 */
router.post("/:id/duplicate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.EVENT_DUPLICATE, _activityConstants.ENTITY_TYPE.EVENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Duplicated event ".concat(req.params.id);
  }
}), _eventController["default"].duplicate.bind(_eventController["default"]));
var _default = exports["default"] = router; // ==================== ADMIN EVENT ROUTES ====================
// These can be mounted under /api/admin/events if needed
/**
 * Admin event routes (optional separate mounting)
 */
var adminEventRouter = exports.adminEventRouter = (0, _express.Router)();

/**
 * GET /api/admin/events
 * List all events for admin (including unpublished)
 * Requires: Admin
 */
adminEventRouter.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _eventController["default"].adminList.bind(_eventController["default"]));