"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _analyticsController = _interopRequireDefault(require("./analytics.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Analytics Routes
 * Cross-module reporting and dashboard endpoints
 */

var router = _express["default"].Router();
router.use(_authMiddleware.authenticate);

// ==================== PROTECTED ROUTES (Admin/Organizer) ====================

// Dashboard overview with system health
router.get("/platform/overview", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getDashboardOverview(req, res);
});

// Platform-wide dashboard
router.get("/platform/dashboard", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getPlatformDashboard(req, res);
});

// Comprehensive voting analytics
router.get("/voting", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getVotingAnalytics(req, res);
});

// Comprehensive payment analytics
router.get("/payments", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getPaymentAnalytics(req, res);
});

// Device analytics
router.get("/devices", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getDeviceAnalytics(req, res);
});

// Region analytics
router.get("/regions", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getRegionAnalytics(req, res);
});

// Event-specific dashboard
router.get("/event/:eventId/dashboard", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getEventDashboard(req, res);
});

// Voting trends
router.get("/event/:eventId/voting-trends", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getVotingTrends(req, res);
});

// Revenue trends
router.get("/event/:eventId/revenue-trends", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getRevenueTrends(req, res);
});

// User engagement
router.get("/event/:eventId/engagement", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getUserEngagement(req, res);
});

// Candidate ranking
router.get("/event/:eventId/candidate-ranking", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getCandidateRanking(req, res);
});

// Conversion funnel
router.get("/event/:eventId/funnel", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getConversionFunnel(req, res);
});

// Activity heatmap
router.get("/event/:eventId/heatmap", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getActivityHeatmap(req, res);
});

// Real-time metrics
router.get("/event/:eventId/realtime", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].getRealTimeMetrics(req, res);
});

// Compare events
router.post("/compare-events", (0, _authMiddleware.authorize)([_userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER]), function (req, res) {
  return _analyticsController["default"].compareEvents(req, res);
});
var _default = exports["default"] = router;