"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STATUS = exports.PROFILE_UPDATE_REASONS = exports.CANDIDATE_PERMISSIONS = exports.CANDIDATE_CODE_PREFIX = exports.ADMIN_ONLY_FIELDS = void 0;
/**
 * Constant file for candidates
 */

var STATUS = exports.STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  PROFILE_UPDATE_PENDING: "profile_update_pending",
  // Candidate updated profile, awaiting re-approval
  PENDING_PROFILE_COMPLETION: "pending_profile_completion" // Created from nomination, awaiting candidate to complete profile
};
var CANDIDATE_CODE_PREFIX = exports.CANDIDATE_CODE_PREFIX = {
  DEFAULT: "CAN"
};
var CANDIDATE_PERMISSIONS = exports.CANDIDATE_PERMISSIONS = {
  UPDATE_PROFILE: "update_profile",
  UPDATE_CATEGORIES: "update_categories",
  VIEW_STATISTICS: "view_statistics",
  UPLOAD_MEDIA: "upload_media"
};
var PROFILE_UPDATE_REASONS = exports.PROFILE_UPDATE_REASONS = {
  INITIAL_SUBMISSION: "initial_submission",
  CORRECTION: "correction",
  ENHANCEMENT: "enhancement",
  CATEGORY_CHANGE: "category_change",
  ADMIN_REQUEST: "admin_request"
};
var ADMIN_ONLY_FIELDS = exports.ADMIN_ONLY_FIELDS = ["status", "is_featured", "is_published", "vote_count", "view_count", "display_order", "approval_date", "rejection_reason", "candidate_code", "created_by", "updated_by"];
var _default = exports["default"] = STATUS;