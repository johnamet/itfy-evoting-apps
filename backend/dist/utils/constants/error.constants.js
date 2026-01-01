"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MESSAGES = exports.DEFAULT_PAGINATION = void 0;
var _fileConstants = require("./file.constants.js");
// ========================================
// DEFAULT PAGINATION SETTINGS
// ========================================
var DEFAULT_PAGINATION = exports.DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100
};

// ========================================
// ERROR MESSAGES (User-Friendly + Dev-Friendly)
// ========================================
var ERROR_MESSAGES = exports.ERROR_MESSAGES = {
  // === GENERAL ===
  INTERNAL_SERVER_ERROR: "Something went wrong on our end. Please try again later.",
  SERVICE_UNAVAILABLE: "Service is temporarily unavailable. We're working on it!",
  INVALID_REQUEST: "Invalid request. Please check your input and try again.",
  MISSING_REQUIRED_FIELDS: "Some required fields are missing. Please fill them all.",
  // === AUTH ===
  INVALID_CREDENTIALS: "Incorrect email or password. Please try again.",
  INVALID_PASSWORD: "Password must contain uppercase, lowercase, number, and special character.",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in.",
  ACCOUNT_LOCKED: "Too many failed attempts. Your account is locked for 15 minutes.",
  INVALID_TOKEN: "Invalid or expired token. Please request a new one.",
  TOKEN_EXPIRED: "Your session has expired. Please log in again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access denied. You don't have permission for this resource.",
  // === PASSWORD ===
  WEAK_PASSWORD: "Password is too weak. Use at least 8 characters with uppercase, lowercase, number, and symbol.",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match. Please confirm correctly.",
  CURRENT_PASSWORD_INCORRECT: "Current password is incorrect.",
  // === FILE UPLOAD ===
  FILE_TOO_LARGE: "File size exceeds ".concat(_fileConstants.MAX_FILE_SIZE_MB, "MB limit."),
  INVALID_FILE_TYPE: "Invalid file type. Only JPEG, PNG, PDF, and Word documents are allowed.",
  FILE_UPLOAD_FAILED: "Failed to upload file. Please try again.",
  // === ADMIN ===
  ADMIN_ONLY: "This action is restricted to administrators only.",
  SUPER_ADMIN_REQUIRED: "Super admin privileges required.",
  // === VALIDATION ===
  INVALID_OBJECT_ID: "Invalid ID format. Please check and try again.",
  INVALID_DATE: "Invalid date format. Use YYYY-MM-DD.",
  INVALID_URL: "Please enter a valid URL (e.g., https://example.com).",
  INVALID_PAGE: "Invalid page number. Must be a positive integer.",
  INVALID_LIMIT: "Invalid limit. Must be between 1 and ".concat(DEFAULT_PAGINATION.MAX_LIMIT, "."),
  // === NETWORK / EXTERNAL ===
  EXTERNAL_API_FAILED: "Failed to connect to external service. Please try again later.",
  EMAIL_SEND_FAILED: "Failed to send email. Please check your inbox or spam folder.",
  // === RATE LIMIT ===
  TOO_MANY_REQUESTS: "Too many requests. Please slow down and try again later."
};