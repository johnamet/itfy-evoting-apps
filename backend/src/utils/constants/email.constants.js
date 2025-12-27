/**
 * Email constants
 * This file contains all email-related constants including templates
 */

/**
 * Email template names
 * Maps to .hbs files in src/templates/emails/
 */
export const EMAIL_TEMPLATES = {
  // Auth & Account
  WELCOME: "welcome",
  EMAIL_VERIFICATION: "email-verification",
  PASSWORD_RESET: "password-reset",
  PASSWORD_CHANGED: "password-changed",
  ACCOUNT_LOCKED: "account-locked",
  ACCOUNT_RESTORED: "account-restored",
  ACCOUNT_DELETED: "account-deleted",

  // Vote-related
  VOTE_CONFIRMATION: "vote-confirmation",
  VOTE_RECEIPT: "vote-receipt",
  VOTE_REFUNDED: "vote-refunded",
  VOTING_STARTED: "voting-started",
  VOTING_ENDING_SOON: "voting-ending-soon",
  VOTING_ENDED: "voting-ended",
  RESULTS_PUBLISHED: "results-published",

  // Payment-related
  PAYMENT_SUCCESS: "payment-success",
  PAYMENT_FAILED: "payment-failed",
  PAYMENT_PENDING: "payment-pending",
  PAYMENT_RECEIPT: "payment-receipt",
  REFUND_PROCESSED: "refund-processed",
  REFUND_FAILED: "refund-failed",

  // Form/Nomination-related
  FORM_SUBMITTED: "form-submitted",
  NOMINATION_CONFIRMATION: "nomination-confirmation",
  NOMINATION_APPROVED: "nomination-approved",
  NOMINATION_REJECTED: "nomination-rejected",
  NOMINATION_CONVERTED: "nomination-converted",

  // Event-related
  EVENT_CREATED: "event-created",
  EVENT_STARTED: "event-started",
  EVENT_REMINDER: "event-reminder",
  EVENT_ENDING_SOON: "event-ending-soon",
  EVENT_ENDED: "event-ended",
  EVENT_CANCELLED: "event-cancelled",
  EVENT_UPDATED: "event-updated",
  EVENT_INVITATION: "event-invitation",

  // Candidate-related
  CANDIDATE_APPROVED: "candidate-approved",
  CANDIDATE_REJECTED: "candidate-rejected",
  CANDIDATE_LEADING: "candidate-leading",
  CANDIDATE_WINNER: "candidate-winner",

  // Candidate Portal
  CANDIDATE_WELCOME: "candidate-welcome",
  CANDIDATE_PROFILE_APPROVED: "candidate-profile-approved",
  CANDIDATE_PROFILE_REJECTED: "candidate-profile-rejected",
  ADMIN_PROFILE_UPDATE_ALERT: "admin-profile-update-alert",

  // Coupon/Bundle-related
  COUPON_RECEIVED: "coupon-received",
  COUPON_EXPIRING_SOON: "coupon-expiring-soon",
  BUNDLE_PROMOTION: "bundle-promotion",

  // Security/Admin
  SUSPICIOUS_ACTIVITY: "suspicious-activity",
  LOGIN_ALERT: "login-alert",
  SECURITY_ALERT: "security-alert",

  // System
  SYSTEM_ANNOUNCEMENT: "system-announcement",
  SYSTEM_MAINTENANCE: "system-maintenance",
  WEEKLY_DIGEST: "weekly-digest",
};

/**
 * Email subjects mapping
 * Default subjects for each template type
 */
export const EMAIL_SUBJECTS = {
  // Auth & Account
  [EMAIL_TEMPLATES.WELCOME]: "Welcome to ITFY E-Voting! 🎉",
  [EMAIL_TEMPLATES.EMAIL_VERIFICATION]: "Verify Your Email Address",
  [EMAIL_TEMPLATES.PASSWORD_RESET]: "Reset Your Password",
  [EMAIL_TEMPLATES.PASSWORD_CHANGED]: "Your Password Has Been Changed",
  [EMAIL_TEMPLATES.ACCOUNT_LOCKED]: "Your Account Has Been Temporarily Locked",
  [EMAIL_TEMPLATES.ACCOUNT_RESTORED]: "Your Account Has Been Restored! 🎉",
  [EMAIL_TEMPLATES.ACCOUNT_DELETED]: "Your Account Has Been Deleted",

  // Vote-related
  [EMAIL_TEMPLATES.VOTE_CONFIRMATION]: "Vote Confirmed! ✓",
  [EMAIL_TEMPLATES.VOTE_RECEIPT]: "Your Voting Receipt",
  [EMAIL_TEMPLATES.VOTE_REFUNDED]: "Vote Refund Processed",
  [EMAIL_TEMPLATES.VOTING_STARTED]: "Voting Has Started! 🗳️",
  [EMAIL_TEMPLATES.VOTING_ENDING_SOON]: "Voting Ends Soon - Cast Your Vote!",
  [EMAIL_TEMPLATES.VOTING_ENDED]: "Voting Has Ended",
  [EMAIL_TEMPLATES.RESULTS_PUBLISHED]: "Results Are Out! 🏆",

  // Payment-related
  [EMAIL_TEMPLATES.PAYMENT_SUCCESS]: "Payment Successful ✓",
  [EMAIL_TEMPLATES.PAYMENT_FAILED]: "Payment Failed",
  [EMAIL_TEMPLATES.PAYMENT_PENDING]: "Payment Pending Confirmation",
  [EMAIL_TEMPLATES.PAYMENT_RECEIPT]: "Payment Receipt",
  [EMAIL_TEMPLATES.REFUND_PROCESSED]: "Refund Processed Successfully",
  [EMAIL_TEMPLATES.REFUND_FAILED]: "Refund Failed",

  // Form/Nomination-related
  [EMAIL_TEMPLATES.FORM_SUBMITTED]: "Form Submitted Successfully",
  [EMAIL_TEMPLATES.NOMINATION_CONFIRMATION]: "Nomination Received",
  [EMAIL_TEMPLATES.NOMINATION_APPROVED]: "Nomination Approved! 🎉",
  [EMAIL_TEMPLATES.NOMINATION_REJECTED]: "Nomination Update",
  [EMAIL_TEMPLATES.NOMINATION_CONVERTED]: "Nomination Converted to Candidate",

  // Event-related
  [EMAIL_TEMPLATES.EVENT_CREATED]: "New Event Created",
  [EMAIL_TEMPLATES.EVENT_STARTED]: "Event Has Started! 🎊",
  [EMAIL_TEMPLATES.EVENT_REMINDER]: "Event Reminder",
  [EMAIL_TEMPLATES.EVENT_ENDING_SOON]: "Event Ending Soon",
  [EMAIL_TEMPLATES.EVENT_ENDED]: "Event Has Ended",
  [EMAIL_TEMPLATES.EVENT_CANCELLED]: "Event Cancelled",
  [EMAIL_TEMPLATES.EVENT_UPDATED]: "Event Updated",
  [EMAIL_TEMPLATES.EVENT_INVITATION]: "You're Invited!",

  // Candidate-related
  [EMAIL_TEMPLATES.CANDIDATE_APPROVED]: "Candidate Application Approved",
  [EMAIL_TEMPLATES.CANDIDATE_REJECTED]: "Candidate Application Update",
  [EMAIL_TEMPLATES.CANDIDATE_LEADING]: "You're Leading! 🌟",
  [EMAIL_TEMPLATES.CANDIDATE_WINNER]: "Congratulations - You Won! 🏆",

  // Candidate Portal
  [EMAIL_TEMPLATES.CANDIDATE_WELCOME]: "Welcome to the Candidate Portal! 🎉",
  [EMAIL_TEMPLATES.CANDIDATE_PROFILE_APPROVED]: "Your Profile Has Been Approved! ✓",
  [EMAIL_TEMPLATES.CANDIDATE_PROFILE_REJECTED]: "Profile Update Required",
  [EMAIL_TEMPLATES.ADMIN_PROFILE_UPDATE_ALERT]: "Candidate Profile Update - Review Required",

  // Coupon/Bundle-related
  [EMAIL_TEMPLATES.COUPON_RECEIVED]: "You've Received a Coupon! 🎁",
  [EMAIL_TEMPLATES.COUPON_EXPIRING_SOON]: "Your Coupon Expires Soon",
  [EMAIL_TEMPLATES.BUNDLE_PROMOTION]: "Special Bundle Offer! 💰",

  // Security/Admin
  [EMAIL_TEMPLATES.SUSPICIOUS_ACTIVITY]: "Suspicious Activity Detected",
  [EMAIL_TEMPLATES.LOGIN_ALERT]: "New Login Detected",
  [EMAIL_TEMPLATES.SECURITY_ALERT]: "Security Alert",

  // System
  [EMAIL_TEMPLATES.SYSTEM_ANNOUNCEMENT]: "Important Announcement",
  [EMAIL_TEMPLATES.SYSTEM_MAINTENANCE]: "Scheduled Maintenance Notice",
  [EMAIL_TEMPLATES.WEEKLY_DIGEST]: "Your Weekly Digest",
};

/**
 * Email categories for grouping
 */
export const EMAIL_CATEGORY = {
  TRANSACTIONAL: "transactional", // Vote confirmations, receipts, etc.
  NOTIFICATION: "notification", // Event updates, reminders
  MARKETING: "marketing", // Promotions, digests
  SECURITY: "security", // Security alerts, login notifications
  SYSTEM: "system", // System announcements, maintenance
};

/**
 * Email priority levels (affects queue processing)
 */
export const EMAIL_PRIORITY = {
  LOW: "low", // Digests, promotions
  NORMAL: "normal", // Regular notifications
  HIGH: "high", // Vote confirmations, payment receipts
  URGENT: "urgent", // Security alerts, password resets
};

// Default export
export default EMAIL_TEMPLATES;
