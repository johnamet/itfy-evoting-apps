"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _formController = _interopRequireDefault(require("./form.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/forms/public/nominations
 * Get all active, published nomination forms (public)
 * Returns forms grouped by event with their categories
 */
router.get("/public/nominations", _formController["default"].getPublicNominationForms.bind(_formController["default"]));

/**
 * GET /api/forms/slug/:slug
 * Get form by slug (public for published forms)
 */
router.get("/slug/:slug", _formController["default"].getBySlug.bind(_formController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/forms
 * Create a new form
 * Requires: Admin, Organiser
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.FORM_CREATED, _activityConstants.ENTITY_TYPE.FORM), _formController["default"].create.bind(_formController["default"]));

/**
 * GET /api/forms
 * List all forms with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _formController["default"].list.bind(_formController["default"]));

/**
 * GET /api/forms/:id
 * Get form by ID
 * Optional auth - public for published, auth for unpublished
 */
router.get("/:id", _authMiddleware.optionalAuth, _formController["default"].getById.bind(_formController["default"]));

/**
 * PUT /api/forms/:id
 * Update form
 * Requires: Admin, Organiser
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.FORM_UPDATED, _activityConstants.ENTITY_TYPE.FORM, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _formController["default"].update.bind(_formController["default"]));

/**
 * DELETE /api/forms/:id
 * Soft delete form
 * Requires: Admin
 */
router["delete"]("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.FORM_DELETED, _activityConstants.ENTITY_TYPE.FORM, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _formController["default"]["delete"].bind(_formController["default"]));

// ==================== EVENT-BASED QUERIES ====================

/**
 * GET /api/forms/event/:eventId
 * Get forms by event
 * Requires: Admin
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _formController["default"].getByEvent.bind(_formController["default"]));

/**
 * GET /api/forms/event/:eventId/nominations
 * Get nomination forms by event
 * Requires: Admin
 */
router.get("/event/:eventId/nominations", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _formController["default"].getNominationForms.bind(_formController["default"]));

// ==================== FORM STATUS MANAGEMENT ====================

/**
 * PUT /api/forms/:id/publish
 * Publish form
 * Requires: Admin, Organiser
 */
router.put("/:id/publish", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.FORM_PUBLISHED, _activityConstants.ENTITY_TYPE.FORM, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Published form ".concat(req.params.id);
  }
}), _formController["default"].publish.bind(_formController["default"]));

/**
 * PUT /api/forms/:id/close
 * Close form
 * Requires: Admin, Organiser
 */
router.put("/:id/close", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.FORM_CLOSED, _activityConstants.ENTITY_TYPE.FORM, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Closed form ".concat(req.params.id);
  }
}), _formController["default"].close.bind(_formController["default"]));

// ==================== FIELD MAPPING ====================

/**
 * GET /api/forms/:id/field-mapping
 * Get field mapping configuration
 * Requires: Admin, Organiser
 */
router.get("/:id/field-mapping", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _formController["default"].getFieldMapping.bind(_formController["default"]));

/**
 * PUT /api/forms/:id/field-mapping
 * Update field mapping configuration
 * Requires: Admin, Organiser
 */
router.put("/:id/field-mapping", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.FORM_FIELD_MAPPING_UPDATED, _activityConstants.ENTITY_TYPE.FORM, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _formController["default"].updateFieldMapping.bind(_formController["default"]));
var _default = exports["default"] = router;