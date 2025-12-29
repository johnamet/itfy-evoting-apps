/**
 * Activity constants for the activity module
 */

const ACTION_TYPE = {
  // User authentication
  LOGIN: "login",
  LOGOUT: "logout",
  PASSWORD_RESET: "password_reset",
  PASSWORD_CHANGE: "password_change",
   USER_HARD_DELETED: "USER_HARD_DELETED",
  USER_RESTORED: "USER_RESTORED",
  USERS_BULK_ACTION: "USERS_BULK_ACTION",
  USERS_BULK_DELETED: "USERS_BULK_DELETED",
  USERS_BULK_RESTORED: "USERS_BULK_RESTORED",
  USERS_EXPORTED: "USERS_EXPORTED",
  PASSWORD_RESET_SENT: "PASSWORD_RESET_SENT",
  USERS_ACCESSED: "USERS_ACCESSED",
  
  // User management
  USER_CREATED: "user_created",
  USER_UPDATED: "user_updated",
  USER_DELETED: "user_deleted",
  USER_ACTIVATED: "user_activated",
  USER_DEACTIVATED: "user_deactivated",
  USER_SUSPENDED: "user_suspended",
  USER_ROLE_UPDATED: "user_role_updated",
  USER_PERMISSIONS_UPDATED: "user_permissions_updated",
  USERS_BULK_STATUS_UPDATED: "users_bulk_status_updated",
  PROFILE_UPDATED: "profile_updated",
  
  // Event actions
  EVENT_CREATE: "event_create",
  EVENT_UPDATE: "event_update",
  EVENT_DELETE: "event_delete",
  EVENT_PUBLISH: "event_publish",
  EVENT_ARCHIVE: "event_archive",
  EVENT_COMPLETE: "event_complete",
  EVENT_DUPLICATE: "event_duplicate",
  EVENT_UNPUBLISH: "event_unpublish",
  
  // Candidate actions
  CANDIDATE_CREATE: "candidate_create",
  CANDIDATE_UPDATE: "candidate_update",
  CANDIDATE_DELETE: "candidate_delete",
  CANDIDATE_APPROVE: "candidate_approve",
  CANDIDATE_REJECT: "candidate_reject",
  
  // Category actions
  CATEGORY_CREATE: "category_create",
  CATEGORY_UPDATE: "category_update",
  CATEGORY_DELETE: "category_delete",
  CATEGORY_CLOSE: "category_close",
  
  // Vote actions
  VOTE_CAST: "vote_cast",
  VOTE_REFUND: "vote_refund",
  BULK_VOTE_CAST: "bulk_vote_cast",
  
  // Payment actions
  PAYMENT_INITIATED: "payment_initiated",
  PAYMENT_COMPLETED: "payment_completed",
  PAYMENT_FAILED: "payment_failed",
  PAYMENT_REFUNDED: "payment_refunded",
  
  // Form actions
  FORM_CREATE: "form_create",
  FORM_SUBMIT: "form_submit",
  FORM_SUBMISSION: "form_submission",
  SUBMISSION_APPROVE: "submission_approve",
  SUBMISSION_APPROVED: "submission_approved",
  SUBMISSION_REJECT: "submission_reject",
  SUBMISSION_REJECTED: "submission_rejected",
  SUBMISSION_MERGED: "submission_merged",
  BULK_SUBMISSION_APPROVAL: "bulk_submission_approval",
  
  // Bundle/Coupon actions
  BUNDLE_PURCHASE: "bundle_purchase",
  COUPON_REDEEM: "coupon_redeem",
  COUPON_CREATE: "coupon_create",
  
  // Security events
  FAILED_LOGIN: "failed_login",
  PERMISSION_CHANGE: "permission_change",
  SUSPICIOUS_ACTIVITY: "suspicious_activity",
  
  // System events
  SYSTEM_EVENT: "system_event",
  SCHEDULED_TASK: "scheduled_task",
};

const ENTITY_TYPE = {
  USER: "user",
  EVENT: "event",
  CANDIDATE: "candidate",
  CATEGORY: "category",
  VOTE: "vote",
  PAYMENT: "payment",
  FORM: "form",
  FORM_SUBMISSION: "form_submission",
  SUBMISSION: "submission",
  BUNDLE: "bundle",
  COUPON: "coupon",
  SYSTEM: "system",
};

const SEVERITY = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  CRITICAL: "critical",
};

export { ACTION_TYPE, ENTITY_TYPE, SEVERITY };
export default ACTION_TYPE;
