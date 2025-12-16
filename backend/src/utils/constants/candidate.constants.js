/**
 * Constant file for candidates
 */

const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  PROFILE_UPDATE_PENDING: "profile_update_pending", // Candidate updated profile, awaiting re-approval
  PENDING_PROFILE_COMPLETION: "pending_profile_completion", // Created from nomination, awaiting candidate to complete profile
};

const CANDIDATE_CODE_PREFIX = {
  DEFAULT: "CAN",
};

const CANDIDATE_PERMISSIONS = {
  UPDATE_PROFILE: "update_profile",
  UPDATE_CATEGORIES: "update_categories",
  VIEW_STATISTICS: "view_statistics",
  UPLOAD_MEDIA: "upload_media",
};

const PROFILE_UPDATE_REASONS = {
  INITIAL_SUBMISSION: "initial_submission",
  CORRECTION: "correction",
  ENHANCEMENT: "enhancement",
  CATEGORY_CHANGE: "category_change",
  ADMIN_REQUEST: "admin_request",
};

const ADMIN_ONLY_FIELDS = [
  "status",
  "is_featured",
  "is_published",
  "vote_count",
  "view_count",
  "display_order",
  "approval_date",
  "rejection_reason",
  "candidate_code",
  "created_by",
  "updated_by",
];

export {
  STATUS,
  CANDIDATE_CODE_PREFIX,
  CANDIDATE_PERMISSIONS,
  PROFILE_UPDATE_REASONS,
  ADMIN_ONLY_FIELDS,
};

export default STATUS;
