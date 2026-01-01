"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _activityController = _interopRequireDefault(require("./activity.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Activity Routes
 * Activity logging and audit trail endpoints
 */

var router = _express["default"].Router();

// ==================== PUBLIC/AUTHENTICATED ROUTES ====================

/**
 * Get recent activities
 * GET /api/activities/recent
 */
router.get("/recent", _authMiddleware.authenticate, function (req, res) {
  return _activityController["default"].getRecent(req, res);
});

/**
 * Get my activity (current user)
 * GET /api/activities/me
 */
router.get("/me", _authMiddleware.authenticate, function (req, res) {
  return _activityController["default"].getMyActivity(req, res);
});

// ==================== ADMIN/ORGANIZER ROUTES ====================

/**
 * Get all activities with filters
 * GET /api/activities
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].list(req, res);
});

/**
 * Get activity by ID
 * GET /api/activities/:id
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getById(req, res);
});

/**
 * Get user activity history
 * GET /api/activities/user/:userId
 */
router.get("/user/:userId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getUserHistory(req, res);
});

/**
 * Get event activity
 * GET /api/activities/event/:eventId
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getEventActivity(req, res);
});

/**
 * Get entity activity
 * GET /api/activities/entity/:entityType/:entityId
 */
router.get("/entity/:entityType/:entityId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getEntityActivity(req, res);
});

/**
 * Get security events
 * GET /api/activities/security
 */
router.get("/security", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN]), function (req, res) {
  return _activityController["default"].getSecurityEvents(req, res);
});

/**
 * Get failed login attempts
 * GET /api/activities/failed-logins
 */
router.get("/failed-logins", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN]), function (req, res) {
  return _activityController["default"].getFailedLogins(req, res);
});

/**
 * Get event summary
 * GET /api/activities/summary/:eventId
 */
router.get("/summary/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getEventSummary(req, res);
});

/**
 * Get activity timeline
 * GET /api/activities/timeline/:eventId
 */
router.get("/timeline/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getTimeline(req, res);
});

/**
 * Get activities by action type
 * GET /api/activities/action/:action
 */
router.get("/action/:action", _authMiddleware.authenticate, (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _activityController["default"].getByAction(req, res);
});
var _default = exports["default"] = router;