/**
 * Authentication Constants
 * Error messages, configuration, and constants for authentication service
 */

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email/code or password",
  ACCOUNT_LOCKED: "Account is locked. Please try again in {duration} minutes",
  ACCOUNT_NOT_FOUND: "Account not found",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in",
  EMAIL_ALREADY_VERIFIED: "Email is already verified",
  ACCOUNT_ALREADY_EXISTS: "An account with this email already exists",
  TOKEN_EXPIRED: "Token has expired",
  INVALID_TOKEN: "Invalid or expired token",
  PASSWORD_RESET_TOKEN_EXPIRED: "Password reset token has expired",
  INVALID_ROLE: "Invalid user role",
  ACCOUNT_PENDING: "Your account is pending approval",
  ACCOUNT_REJECTED: "Your account has been rejected",
};

// Login/Security Configuration
export const MAX_LOGIN_ATTEMPTS = 5;
export const ACCOUNT_LOCK_DURATION_MINUTES = 15;

// JWT Token Expiration
export const JWT_EXPIRATION = {
  ACCESS_TOKEN: "15m",
  REFRESH_TOKEN: "7d",
  RESET_TOKEN: "1h",
  VERIFICATION_TOKEN: "24h",
};

// Default export
export default {
  ERROR_MESSAGES,
  MAX_LOGIN_ATTEMPTS,
  ACCOUNT_LOCK_DURATION_MINUTES,
  JWT_EXPIRATION,
};
