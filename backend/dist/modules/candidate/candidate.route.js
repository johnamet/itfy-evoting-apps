"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _candidateController = _interopRequireDefault(require("./candidate.controller.js"));
var _fileService = _interopRequireDefault(require("../../services/file.service.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
var _userConstants = require("../../utils/constants/user.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Candidate Routes
 * Defines all candidate management endpoints for admins and candidates
 */

var router = (0, _express.Router)();

// ==================== PUBLIC ROUTES ====================

/**
 * @route   GET /api/candidates/public
 * @desc    Get all published and approved candidates (public)
 * @access  Public
 */
router.get("/public", function (req, res) {
  return _candidateController["default"].listPublic(req, res);
});

/**
 * @route   GET /api/candidates/slug/:slug
 * @desc    Get candidate by slug (public)
 * @access  Public
 */
router.get("/slug/:slug", function (req, res) {
  return _candidateController["default"].getBySlug(req, res);
});

/**
 * @route   GET /api/candidates/code/:code
 * @desc    Get candidate by unique code (public)
 * @access  Public
 */
router.get("/code/:code", function (req, res) {
  return _candidateController["default"].getByCode(req, res);
});

// ==================== CANDIDATE SELF-SERVICE ROUTES ====================

/**
 * @route   GET /api/candidates/profile
 * @desc    Get own profile (authenticated candidate)
 * @access  Private (candidate)
 */
router.get("/profile", _authMiddleware.authenticateCandidate, function (req, res) {
  return _candidateController["default"].getProfile(req, res);
});

/**
 * @route   PUT /api/candidates/profile
 * @desc    Update own profile (authenticated candidate)
 * @access  Private (candidate)
 */
router.put("/profile", _authMiddleware.authenticateCandidate, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE), function (req, res) {
  return _candidateController["default"].updateProfile(req, res);
});

/**
 * @route   GET /api/candidates/profile/history
 * @desc    Get profile update history (authenticated candidate)
 * @access  Private (candidate)
 */
router.get("/profile/history", _authMiddleware.authenticateCandidate, function (req, res) {
  return _candidateController["default"].getProfileHistory(req, res);
});

/**
 * @route   GET /api/candidates/profile/stats
 * @desc    Get own statistics (authenticated candidate)
 * @access  Private (candidate)
 */
router.get("/profile/stats", _authMiddleware.authenticateCandidate, function (req, res) {
  return _candidateController["default"].getMyStats(req, res);
});

/**
 * @route   POST /api/candidates/profile/image
 * @desc    Upload profile image (authenticated candidate)
 * @access  Private (candidate)
 */
router.post("/profile/image", _authMiddleware.authenticateCandidate, _fileService["default"].uploadCandidatePhoto, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription() {
    return "Uploaded profile image";
  }
}), function (req, res) {
  return _candidateController["default"].uploadProfileImage(req, res);
});

/**
 * @route   DELETE /api/candidates/profile/image
 * @desc    Delete profile image (authenticated candidate)
 * @access  Private (candidate)
 */
router["delete"]("/profile/image", _authMiddleware.authenticateCandidate, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription() {
    return "Deleted profile image";
  }
}), function (req, res) {
  return _candidateController["default"].deleteProfileImage(req, res);
});

/**
 * @route   POST /api/candidates/profile/cover
 * @desc    Upload cover image (authenticated candidate)
 * @access  Private (candidate)
 */
router.post("/profile/cover", _authMiddleware.authenticateCandidate, _fileService["default"].uploadCandidatePhoto, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription() {
    return "Uploaded cover image";
  }
}), function (req, res) {
  return _candidateController["default"].uploadCoverImage(req, res);
});

/**
 * @route   POST /api/candidates/profile/gallery
 * @desc    Upload gallery images (authenticated candidate)
 * @access  Private (candidate)
 */
router.post("/profile/gallery", _authMiddleware.authenticateCandidate, _fileService["default"].uploadMultipleImages, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    var _req$files;
    return "Uploaded ".concat(((_req$files = req.files) === null || _req$files === void 0 ? void 0 : _req$files.length) || 0, " gallery images");
  }
}), function (req, res) {
  return _candidateController["default"].uploadGalleryImages(req, res);
});

/**
 * @route   DELETE /api/candidates/profile/gallery
 * @desc    Delete gallery image (authenticated candidate)
 * @access  Private (candidate)
 */
router["delete"]("/profile/gallery", _authMiddleware.authenticateCandidate, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription() {
    return "Deleted gallery image";
  }
}), function (req, res) {
  return _candidateController["default"].deleteGalleryImage(req, res);
});

/**
 * @route   POST /api/candidates/profile/categories
 * @desc    Request to be added to additional category (authenticated candidate)
 * @access  Private (candidate)
 */
router.post("/profile/categories", _authMiddleware.authenticateCandidate, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    return "Requested addition to category ".concat(req.body.categoryId);
  }
}), function (req, res) {
  return _candidateController["default"].requestCategoryAddition(req, res);
});

// ==================== BULK OPERATIONS (ADMIN) ====================

/**
 * @route   POST /api/candidates/bulk/approve
 * @desc    Bulk approve candidates
 * @access  Private (admin)
 */
router.post("/bulk/approve", _authMiddleware.authenticate, _authMiddleware.adminOnly, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_APPROVE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    var _req$body$candidateId;
    return "Bulk approved ".concat(((_req$body$candidateId = req.body.candidateIds) === null || _req$body$candidateId === void 0 ? void 0 : _req$body$candidateId.length) || 0, " candidates");
  }
}), function (req, res) {
  return _candidateController["default"].bulkApprove(req, res);
});

/**
 * @route   POST /api/candidates/bulk/reject
 * @desc    Bulk reject candidates
 * @access  Private (admin)
 */
router.post("/bulk/reject", _authMiddleware.authenticate, _authMiddleware.adminOnly, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_REJECT, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    var _req$body$candidateId2;
    return "Bulk rejected ".concat(((_req$body$candidateId2 = req.body.candidateIds) === null || _req$body$candidateId2 === void 0 ? void 0 : _req$body$candidateId2.length) || 0, " candidates");
  }
}), function (req, res) {
  return _candidateController["default"].bulkReject(req, res);
});

// ==================== ADMIN CRUD ROUTES ====================

/**
 * @route   GET /api/candidates
 * @desc    Get all candidates with pagination and filters
 * @access  Private (admin, organiser)
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), function (req, res) {
  return _candidateController["default"].list(req, res);
});

/**
 * @route   POST /api/candidates
 * @desc    Create a new candidate
 * @access  Private (admin, organiser)
 */
router.post("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_CREATE, _activityConstants.ENTITY_TYPE.CANDIDATE), function (req, res) {
  return _candidateController["default"].create(req, res);
});

/**
 * @route   GET /api/candidates/:id
 * @desc    Get candidate by ID
 * @access  Private (admin, organiser)
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), function (req, res) {
  return _candidateController["default"].getById(req, res);
});

/**
 * @route   PUT /api/candidates/:id
 * @desc    Update candidate
 * @access  Private (admin, organiser)
 */
router.put("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE), function (req, res) {
  return _candidateController["default"].update(req, res);
});

/**
 * @route   DELETE /api/candidates/:id
 * @desc    Delete candidate (soft delete)
 * @access  Private (admin)
 */
router["delete"]("/:id", _authMiddleware.authenticate, _authMiddleware.adminOnly, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_DELETE, _activityConstants.ENTITY_TYPE.CANDIDATE), function (req, res) {
  return _candidateController["default"]["delete"](req, res);
});

// ==================== STATUS MANAGEMENT (ADMIN) ====================

/**
 * @route   PUT /api/candidates/:id/approve
 * @desc    Approve candidate
 * @access  Private (admin, organiser)
 */
router.put("/:id/approve", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_APPROVE, _activityConstants.ENTITY_TYPE.CANDIDATE), function (req, res) {
  return _candidateController["default"].approve(req, res);
});

/**
 * @route   PUT /api/candidates/:id/reject
 * @desc    Reject candidate
 * @access  Private (admin, organiser)
 */
router.put("/:id/reject", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_REJECT, _activityConstants.ENTITY_TYPE.CANDIDATE), function (req, res) {
  return _candidateController["default"].reject(req, res);
});

/**
 * @route   PUT /api/candidates/:id/suspend
 * @desc    Suspend candidate
 * @access  Private (admin)
 */
router.put("/:id/suspend", _authMiddleware.authenticate, _authMiddleware.adminOnly, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    return "Suspended candidate ".concat(req.params.id);
  }
}), function (req, res) {
  return _candidateController["default"].suspend(req, res);
});

/**
 * @route   PUT /api/candidates/:id/reinstate
 * @desc    Reinstate suspended candidate
 * @access  Private (admin)
 */
router.put("/:id/reinstate", _authMiddleware.authenticate, _authMiddleware.adminOnly, (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    return "Reinstated candidate ".concat(req.params.id);
  }
}), function (req, res) {
  return _candidateController["default"].reinstate(req, res);
});

// ==================== CATEGORY MANAGEMENT ====================

/**
 * @route   GET /api/candidates/:id/categories
 * @desc    Get candidate's categories
 * @access  Private (admin, organiser)
 */
router.get("/:id/categories", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), function (req, res) {
  return _candidateController["default"].getCategories(req, res);
});

/**
 * @route   POST /api/candidates/:id/categories
 * @desc    Add candidate to categories
 * @access  Private (admin, organiser)
 */
router.post("/:id/categories", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    return "Added candidate ".concat(req.params.id, " to categories");
  }
}), function (req, res) {
  return _candidateController["default"].addToCategories(req, res);
});

/**
 * @route   DELETE /api/candidates/:id/categories
 * @desc    Remove candidate from categories
 * @access  Private (admin, organiser)
 */
router["delete"]("/:id/categories", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.CANDIDATE_UPDATE, _activityConstants.ENTITY_TYPE.CANDIDATE, {
  getDescription: function getDescription(req) {
    return "Removed candidate ".concat(req.params.id, " from categories");
  }
}), function (req, res) {
  return _candidateController["default"].removeFromCategories(req, res);
});

// ==================== STATISTICS ====================

/**
 * @route   GET /api/candidates/:id/stats
 * @desc    Get candidate statistics
 * @access  Private (admin, organiser, or candidate owner)
 */
router.get("/:id/stats", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), function (req, res) {
  return _candidateController["default"].getStats(req, res);
});

/**
 * @route   GET /api/candidates/:id/votes
 * @desc    Get candidate vote count
 * @access  Private (admin, organiser)
 */
router.get("/:id/votes", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), function (req, res) {
  return _candidateController["default"].getVotes(req, res);
});
var _default = exports["default"] = router;