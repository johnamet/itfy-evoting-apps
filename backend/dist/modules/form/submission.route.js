"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _submissionController = _interopRequireDefault(require("./submission.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC SUBMISSION ====================

/**
 * POST /api/submissions
 * Submit a form (public or authenticated)
 * Optional auth - allows anonymous submissions if form settings allow
 */
router.post("/", _authMiddleware.optionalAuth, _submissionController["default"].submit.bind(_submissionController["default"]));

// ==================== USER SUBMISSIONS ====================

/**
 * GET /api/submissions/me
 * Get current user's submissions
 * Requires: Authentication
 */
router.get("/me", _authMiddleware.authenticate, _submissionController["default"].getMySubmissions.bind(_submissionController["default"]));

// ==================== ADMIN LIST & QUERY ROUTES ====================

/**
 * GET /api/submissions
 * List all submissions with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _submissionController["default"].list.bind(_submissionController["default"]));

/**
 * GET /api/submissions/form/:formId
 * Get submissions by form
 * Requires: Admin
 */
router.get("/form/:formId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _submissionController["default"].getByForm.bind(_submissionController["default"]));

/**
 * GET /api/submissions/form/:formId/duplicates
 * Get suspected duplicates for a form
 * Requires: Admin
 */
router.get("/form/:formId/duplicates", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _submissionController["default"].getSuspectedDuplicates.bind(_submissionController["default"]));

/**
 * GET /api/submissions/event/:eventId
 * Get submissions by event
 * Requires: Admin
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _submissionController["default"].getByEvent.bind(_submissionController["default"]));

/**
 * GET /api/submissions/nominee/:identifier
 * Get submissions by nominee identifier (multi-category nominations)
 * Requires: Admin
 */
router.get("/nominee/:identifier", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _submissionController["default"].getByNominee.bind(_submissionController["default"]));

/**
 * GET /api/submissions/user/:userId
 * Get submissions by user
 * Requires: Admin
 */
router.get("/user/:userId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _submissionController["default"].getByUser.bind(_submissionController["default"]));

// ==================== SINGLE SUBMISSION ROUTES ====================

/**
 * GET /api/submissions/:id
 * Get submission by ID
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _submissionController["default"].getById.bind(_submissionController["default"]));

/**
 * PUT /api/submissions/:id
 * Update submission
 * Requires: Admin
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SUBMISSION_UPDATED, _activityConstants.ENTITY_TYPE.FORM_SUBMISSION, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  }
}), _submissionController["default"].update.bind(_submissionController["default"]));

// ==================== APPROVAL WORKFLOW ====================

/**
 * POST /api/submissions/:id/approve
 * Approve submission (and optionally create candidate)
 * Requires: Admin, Organiser
 */
router.post("/:id/approve", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SUBMISSION_APPROVED, _activityConstants.ENTITY_TYPE.FORM_SUBMISSION, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Approved submission ".concat(req.params.id);
  }
}), _submissionController["default"].approve.bind(_submissionController["default"]));

/**
 * POST /api/submissions/:id/reject
 * Reject submission
 * Requires: Admin, Organiser
 */
router.post("/:id/reject", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.SUBMISSION_REJECTED, _activityConstants.ENTITY_TYPE.FORM_SUBMISSION, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Rejected submission ".concat(req.params.id);
  }
}), _submissionController["default"].reject.bind(_submissionController["default"]));

/**
 * POST /api/submissions/:id/resolve-duplicate
 * Resolve duplicate submission
 * Requires: Admin, Organiser
 */
router.post("/:id/resolve-duplicate", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.DUPLICATE_RESOLVED, _activityConstants.ENTITY_TYPE.FORM_SUBMISSION, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Resolved duplicate for submission ".concat(req.params.id);
  }
}), _submissionController["default"].resolveDuplicate.bind(_submissionController["default"]));

// ==================== DUPLICATE DETECTION ====================

/**
 * POST /api/submissions/:id/check-duplicates
 * Manually trigger duplicate check for a submission
 * Requires: Admin
 */
router.post("/:id/check-duplicates", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _submissionController["default"].checkDuplicates.bind(_submissionController["default"]));
var _default = exports["default"] = router;