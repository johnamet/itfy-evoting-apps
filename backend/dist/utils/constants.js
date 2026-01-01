"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SALT_ROUNDS = exports.RATE_LIMIT = exports.PAGINATION = exports.JWT_EXPIRATION = void 0;
/**
 * Application Constants
 * Central location for app-wide constants
 */

// Password hashing
var SALT_ROUNDS = exports.SALT_ROUNDS = 12;

// JWT Expiration times
var JWT_EXPIRATION = exports.JWT_EXPIRATION = {
  ACCESS_TOKEN: "15m",
  REFRESH_TOKEN: "7d",
  RESET_TOKEN: "1h",
  VERIFICATION_TOKEN: "24h"
};

// Pagination defaults
var PAGINATION = exports.PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// Rate limiting
var RATE_LIMIT = exports.RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000,
  // 15 minutes
  MAX_REQUESTS: 100,
  AUTH_MAX_REQUESTS: 5 // Stricter for auth endpoints
};
var _default = exports["default"] = {
  SALT_ROUNDS: SALT_ROUNDS,
  JWT_EXPIRATION: JWT_EXPIRATION,
  PAGINATION: PAGINATION,
  RATE_LIMIT: RATE_LIMIT
};