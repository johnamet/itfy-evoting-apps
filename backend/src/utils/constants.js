/**
 * Application Constants
 * Central location for app-wide constants
 */

// Password hashing
export const SALT_ROUNDS = 12;

// JWT Expiration times
export const JWT_EXPIRATION = {
  ACCESS_TOKEN: "15m",
  REFRESH_TOKEN: "7d",
  RESET_TOKEN: "1h",
  VERIFICATION_TOKEN: "24h",
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Rate limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  AUTH_MAX_REQUESTS: 5, // Stricter for auth endpoints
};

export default {
  SALT_ROUNDS,
  JWT_EXPIRATION,
  PAGINATION,
  RATE_LIMIT,
};
