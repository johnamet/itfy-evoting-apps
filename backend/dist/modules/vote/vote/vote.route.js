"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _voteController = _interopRequireDefault(require("./vote.controller.js"));
var _authMiddleware = require("../../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../../utils/constants/user.constants.js");
var _activityConstants = require("../../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC VOTING ROUTES ====================

/**
 * POST /api/votes
 * Cast a vote
 * Public access (vote code based)
 */
router.post("/", _authMiddleware.optionalAuth, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.VOTE_CAST, _activityConstants.ENTITY_TYPE.VOTE), _voteController["default"].cast.bind(_voteController["default"]));

/**
 * POST /api/votes/validate-eligibility
 * Validate vote eligibility before casting
 * Public access
 */
router.post("/validate-eligibility", _authMiddleware.optionalAuth, _voteController["default"].validateEligibility.bind(_voteController["default"]));

/**
 * GET /api/votes/code/:code
 * Get votes by vote code
 * Public access (voter can check their votes)
 */
router.get("/code/:code", _authMiddleware.optionalAuth, _voteController["default"].getByVoteCode.bind(_voteController["default"]));

/**
 * GET /api/votes/history/:code
 * Get voter history by vote code
 * Public access (voter can check their history)
 */
router.get("/history/:code", _authMiddleware.optionalAuth, _voteController["default"].getVoterHistory.bind(_voteController["default"]));

// ==================== PUBLIC RESULTS (Event-dependent visibility) ====================

/**
 * GET /api/votes/results/category/:categoryId
 * Get category results
 * Public access (visibility depends on event settings)
 */
router.get("/results/category/:categoryId", _authMiddleware.optionalAuth, _voteController["default"].getCategoryResults.bind(_voteController["default"]));

/**
 * GET /api/votes/results/event/:eventId
 * Get event results
 * Public access (visibility depends on event settings)
 */
router.get("/results/event/:eventId", _authMiddleware.optionalAuth, _voteController["default"].getEventResults.bind(_voteController["default"]));

// ==================== PUBLIC VOTE COUNTS ====================

/**
 * GET /api/votes/count/candidate/:candidateId
 * Get vote count by candidate
 * Public access (visibility depends on event settings)
 */
router.get("/count/candidate/:candidateId", _authMiddleware.optionalAuth, _voteController["default"].countByCandidate.bind(_voteController["default"]));

/**
 * GET /api/votes/count/category/:categoryId
 * Get vote count by category
 * Public access
 */
router.get("/count/category/:categoryId", _authMiddleware.optionalAuth, _voteController["default"].countByCategory.bind(_voteController["default"]));

/**
 * GET /api/votes/count/event/:eventId
 * Get vote count by event
 * Public access
 */
router.get("/count/event/:eventId", _authMiddleware.optionalAuth, _voteController["default"].countByEvent.bind(_voteController["default"]));

// ==================== ADMIN ANALYTICS ====================

/**
 * GET /api/votes/trends/:eventId
 * Get voting trends
 * Requires: Admin
 */
router.get("/trends/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _voteController["default"].getVotingTrends.bind(_voteController["default"]));

/**
 * GET /api/votes/distribution/:eventId
 * Get vote distribution by category
 * Requires: Admin
 */
router.get("/distribution/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _voteController["default"].getVoteDistribution.bind(_voteController["default"]));

/**
 * GET /api/votes/top-candidates/:eventId
 * Get top candidates
 * Requires: Admin
 */
router.get("/top-candidates/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _voteController["default"].getTopCandidates.bind(_voteController["default"]));

/**
 * GET /api/votes/stats/:eventId
 * Get voting statistics
 * Requires: Admin
 */
router.get("/stats/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _voteController["default"].getVotingStats.bind(_voteController["default"]));

// ==================== SECURITY & MONITORING ====================

/**
 * GET /api/votes/suspicious/:eventId
 * Detect suspicious voting patterns
 * Requires: Admin
 */
router.get("/suspicious/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), _voteController["default"].detectSuspicious.bind(_voteController["default"]));

// ==================== ADMIN VOTE QUERIES ====================

/**
 * GET /api/votes
 * List all votes with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _voteController["default"].list.bind(_voteController["default"]));

/**
 * GET /api/votes/candidate/:candidateId
 * Get votes by candidate
 * Requires: Admin
 */
router.get("/candidate/:candidateId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _voteController["default"].getByCandidate.bind(_voteController["default"]));

/**
 * GET /api/votes/category/:categoryId
 * Get votes by category
 * Requires: Admin
 */
router.get("/category/:categoryId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _voteController["default"].getByCategory.bind(_voteController["default"]));

/**
 * GET /api/votes/event/:eventId
 * Get votes by event
 * Requires: Admin
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _voteController["default"].getByEvent.bind(_voteController["default"]));

/**
 * GET /api/votes/:id
 * Get vote by ID
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _voteController["default"].getById.bind(_voteController["default"]));

// ==================== VOTE MANAGEMENT ====================

/**
 * POST /api/votes/:id/refund
 * Refund a vote
 * Requires: Admin
 */
router.post("/:id/refund", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.VOTE_REFUNDED, _activityConstants.ENTITY_TYPE.VOTE, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  severity: "warning"
}), _voteController["default"].refund.bind(_voteController["default"]));
var _default = exports["default"] = router;