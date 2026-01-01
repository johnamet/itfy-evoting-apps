"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _slideController = _interopRequireDefault(require("./slide.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/slides/active
 * Get active (published) slides
 * Public access
 */
router.get("/active", _slideController["default"].getActive.bind(_slideController["default"]));

/**
 * GET /api/slides/scheduled
 * Get scheduled slides within validity period
 * Public access
 */
router.get("/scheduled", _slideController["default"].getScheduled.bind(_slideController["default"]));

/**
 * GET /api/slides/type/:type
 * Get slides by type
 * Public access
 */
router.get("/type/:type", _slideController["default"].getByType.bind(_slideController["default"]));

/**
 * GET /api/slides/position/:position
 * Get slides by position
 * Public access
 */
router.get("/position/:position", _slideController["default"].getByPosition.bind(_slideController["default"]));

/**
 * GET /api/slides/event/:eventId
 * Get slides by event
 * Public access
 */
router.get("/event/:eventId", _slideController["default"].getByEvent.bind(_slideController["default"]));

// ==================== ANALYTICS (PUBLIC) ====================

/**
 * POST /api/slides/:id/view
 * Increment view count
 * Public access (tracking)
 */
router.post("/:id/view", _slideController["default"].incrementViewCount.bind(_slideController["default"]));

/**
 * POST /api/slides/:id/click
 * Increment click count
 * Public access (tracking)
 */
router.post("/:id/click", _slideController["default"].incrementClickCount.bind(_slideController["default"]));

// ==================== ADMIN BULK OPERATIONS ====================

/**
 * PUT /api/slides/reorder
 * Reorder slides
 * Requires: Admin, Organiser
 */
router.put("/reorder", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDES_REORDERED, _activityConstants.ENTITY_TYPE.SLIDE), _slideController["default"].reorder.bind(_slideController["default"]));

/**
 * PUT /api/slides/bulk/status
 * Bulk update slide status
 * Requires: Admin
 */
router.put("/bulk/status", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDES_BULK_STATUS_UPDATED, _activityConstants.ENTITY_TYPE.SLIDE), _slideController["default"].bulkUpdateStatus.bind(_slideController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/slides
 * Create a new slide
 * Requires: Admin, Organiser
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_CREATED, _activityConstants.ENTITY_TYPE.SLIDE), _slideController["default"].create.bind(_slideController["default"]));

/**
 * GET /api/slides
 * List all slides with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _slideController["default"].list.bind(_slideController["default"]));

/**
 * GET /api/slides/:id
 * Get slide by ID
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _slideController["default"].getById.bind(_slideController["default"]));

/**
 * PUT /api/slides/:id
 * Update slide
 * Requires: Admin, Organiser
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_UPDATED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"].update.bind(_slideController["default"]));

/**
 * DELETE /api/slides/:id
 * Delete slide (soft delete)
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_DELETED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"]["delete"].bind(_slideController["default"]));

// ==================== STATUS MANAGEMENT ====================

/**
 * PUT /api/slides/:id/publish
 * Publish slide
 * Requires: Admin, Organiser
 */
router.put("/:id/publish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_PUBLISHED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"].publish.bind(_slideController["default"]));

/**
 * PUT /api/slides/:id/unpublish
 * Unpublish slide (revert to draft)
 * Requires: Admin, Organiser
 */
router.put("/:id/unpublish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_UNPUBLISHED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"].unpublish.bind(_slideController["default"]));

/**
 * PUT /api/slides/:id/archive
 * Archive slide
 * Requires: Admin
 */
router.put("/:id/archive", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_ARCHIVED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"].archive.bind(_slideController["default"]));

/**
 * PUT /api/slides/:id/toggle-active
 * Toggle slide active status
 * Requires: Admin, Organiser
 */
router.put("/:id/toggle-active", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_TOGGLED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"].toggleActive.bind(_slideController["default"]));

// ==================== IMAGE MANAGEMENT ====================

/**
 * POST /api/slides/:id/image
 * Upload slide image
 * Requires: Admin, Organiser
 */
router.post("/:id/image", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_IMAGE_UPLOADED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _slideController["default"].uploadImage.bind(_slideController["default"]));

// ==================== CLONING ====================

/**
 * POST /api/slides/:id/clone
 * Clone a slide
 * Requires: Admin, Organiser
 */
router.post("/:id/clone", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SLIDE_CLONED, _activityConstants.ENTITY_TYPE.SLIDE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Cloned slide ".concat(req.params.id);
  }
}), _slideController["default"].clone.bind(_slideController["default"]));
var _default = exports["default"] = router;