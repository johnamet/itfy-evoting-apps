"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SMS_PROVIDER = exports.NOTIFICATION_TYPE = exports.NOTIFICATION_TEMPLATE = exports.NOTIFICATION_STATUS = exports.NOTIFICATION_PRIORITY = exports.NOTIFICATION_CHANNEL = exports.EMAIL_PROVIDER = exports.DELIVERY_PREFERENCE = void 0;
/**
 * Notification constants
 * This file contains all notification-related constants used across the notification module
 */

/**
 * Notification types
 */
var NOTIFICATION_TYPE = exports.NOTIFICATION_TYPE = {
  // Vote-related
  VOTE_CAST: "vote_cast",
  VOTE_REFUNDED: "vote_refunded",
  VOTING_STARTED: "voting_started",
  VOTING_ENDING_SOON: "voting_ending_soon",
  VOTING_ENDED: "voting_ended",
  RESULTS_PUBLISHED: "results_published",
  // Payment-related
  PAYMENT_SUCCESS: "payment_success",
  PAYMENT_FAILED: "payment_failed",
  PAYMENT_PENDING: "payment_pending",
  REFUND_PROCESSED: "refund_processed",
  REFUND_FAILED: "refund_failed",
  // Form/Nomination-related
  FORM_SUBMITTED: "form_submitted",
  NOMINATION_APPROVED: "nomination_approved",
  NOMINATION_REJECTED: "nomination_rejected",
  NOMINATION_CONVERTED: "nomination_converted",
  // Event-related
  EVENT_CREATED: "event_created",
  EVENT_STARTED: "event_started",
  EVENT_ENDING_SOON: "event_ending_soon",
  EVENT_ENDED: "event_ended",
  EVENT_CANCELLED: "event_cancelled",
  EVENT_UPDATED: "event_updated",
  // Candidate-related
  CANDIDATE_APPROVED: "candidate_approved",
  CANDIDATE_REJECTED: "candidate_rejected",
  CANDIDATE_LEADING: "candidate_leading",
  CANDIDATE_PROFILE_UPDATED: "candidate_profile_updated",
  CANDIDATE_PROFILE_COMPLETED: "candidate_profile_completed",
  // Coupon/Bundle-related
  COUPON_RECEIVED: "coupon_received",
  COUPON_EXPIRING_SOON: "coupon_expiring_soon",
  BUNDLE_PROMOTION: "bundle_promotion",
  // Security/Admin
  SUSPICIOUS_ACTIVITY: "suspicious_activity",
  ACCOUNT_SECURITY: "account_security",
  LOGIN_ALERT: "login_alert",
  PASSWORD_CHANGED: "password_changed",
  EMAIL_VERIFIED: "email_verified",
  // User status
  USER_ACTIVATED: "user_activated",
  USER_DEACTIVATED: "user_deactivated",
  USER_SUSPENDED: "user_suspended",
  // System
  SYSTEM_ANNOUNCEMENT: "system_announcement",
  SYSTEM_MAINTENANCE: "system_maintenance",
  WEEKLY_DIGEST: "weekly_digest",
  ACHIEVEMENT_UNLOCKED: "achievement_unlocked",
  SYSTEM: "system"
};

/**
 * Notification channels
 */
var NOTIFICATION_CHANNEL = exports.NOTIFICATION_CHANNEL = {
  IN_APP: "in_app",
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
  WEBHOOK: "webhook"
};

/**
 * Notification status
 */
var NOTIFICATION_STATUS = exports.NOTIFICATION_STATUS = {
  PENDING: "pending",
  QUEUED: "queued",
  SENT: "sent",
  DELIVERED: "delivered",
  FAILED: "failed",
  BOUNCED: "bounced",
  READ: "read",
  CLICKED: "clicked"
};

/**
 * Notification priority
 */
var NOTIFICATION_PRIORITY = exports.NOTIFICATION_PRIORITY = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
  URGENT: "urgent"
};

/**
 * Notification delivery preferences
 */
var DELIVERY_PREFERENCE = exports.DELIVERY_PREFERENCE = {
  ALL: "all",
  IMPORTANT_ONLY: "important_only",
  NONE: "none"
};

/**
 * Email provider types
 */
var EMAIL_PROVIDER = exports.EMAIL_PROVIDER = {
  SENDGRID: "sendgrid",
  MAILGUN: "mailgun",
  SES: "ses",
  SMTP: "smtp"
};

/**
 * SMS provider types
 */
var SMS_PROVIDER = exports.SMS_PROVIDER = {
  TWILIO: "twilio",
  AFRICASTALKING: "africastalking",
  TERMII: "termii"
};

/**
 * Notification templates
 */
var NOTIFICATION_TEMPLATE = exports.NOTIFICATION_TEMPLATE = {
  VOTE_CONFIRMATION: "vote_confirmation",
  PAYMENT_RECEIPT: "payment_receipt",
  EVENT_REMINDER: "event_reminder",
  RESULTS_ANNOUNCEMENT: "results_announcement",
  NOMINATION_UPDATE: "nomination_update",
  SECURITY_ALERT: "security_alert",
  WEEKLY_SUMMARY: "weekly_summary"
};

// Default export
var _default = exports["default"] = NOTIFICATION_TYPE;