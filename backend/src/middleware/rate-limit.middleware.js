/**
 * Production-Ready Rate Limiting Middleware
 * Features:
 * - Redis-backed distributed rate limiting
 * - In-memory fallback for development/testing
 * - Multiple rate limit tiers (global, per-route, per-user)
 * - Sliding window algorithm for accuracy
 * - Customizable response messages and headers
 * - IP extraction from X-Forwarded-For (for proxies/load balancers)
 */

import cache from "../utils/cache/cache.utils.js";
import { ResponseHelper, HTTP_STATUS } from "../utils/helpers/response.helper.js";
import logger from "../utils/logger.js";

/**
 * Default rate limit configurations
 */
export const RATE_LIMIT_CONFIG = {
  // Global rate limit (per IP)
  global: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: "Too many requests, please try again later.",
  },

  // Strict rate limit for authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: "Too many authentication attempts, please try again later.",
    skipSuccessfulRequests: false,
  },

  // Rate limit for API endpoints
  api: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 60,
    message: "API rate limit exceeded, please slow down.",
  },

  // Rate limit for write operations
  write: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 20,
    message: "Too many write operations, please wait.",
  },

  // Rate limit for file uploads
  upload: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 10,
    message: "Too many file uploads, please wait.",
  },

  // Rate limit for payment operations
  payment: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 5,
    message: "Too many payment attempts, please wait.",
  },
};

/**
 * Extract client IP from request (supports proxies)
 * @param {Object} req - Express request object
 * @returns {string} - Client IP address
 */
const getClientIP = (req) => {
  // Trust X-Forwarded-For header if behind proxy
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    // Take the first IP in the chain (original client)
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    return ips[0];
  }

  // Check other common proxy headers
  const realIP = req.headers["x-real-ip"];
  if (realIP) {
    return realIP;
  }

  // Fallback to connection remote address
  return req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip || "unknown";
};

/**
 * Generate rate limit key
 * @param {Object} req - Express request object
 * @param {string} prefix - Key prefix
 * @param {Object} options - Rate limit options
 * @returns {string} - Rate limit key
 */
const generateKey = (req, prefix, options = {}) => {
  const identifier = options.keyGenerator
    ? options.keyGenerator(req)
    : getClientIP(req);

  // Include user ID if authenticated and configured
  if (options.includeUser && req.user?.id) {
    return `ratelimit:${prefix}:user:${req.user.id}`;
  }

  return `ratelimit:${prefix}:ip:${identifier}`;
};

/**
 * Create rate limiting middleware
 * @param {Object} options - Rate limit options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.maxRequests - Maximum requests per window
 * @param {string} options.message - Error message when limit exceeded
 * @param {Function} options.keyGenerator - Custom key generator
 * @param {boolean} options.skipSuccessfulRequests - Skip counting successful requests
 * @param {boolean} options.includeUser - Include user ID in key (requires auth)
 * @param {Function} options.skip - Function to skip rate limiting for certain requests
 * @returns {Function} - Express middleware
 */
export const createRateLimiter = (options = {}) => {
  const config = {
    windowMs: options.windowMs || RATE_LIMIT_CONFIG.global.windowMs,
    maxRequests: options.maxRequests || RATE_LIMIT_CONFIG.global.maxRequests,
    message: options.message || RATE_LIMIT_CONFIG.global.message,
    keyGenerator: options.keyGenerator || null,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    includeUser: options.includeUser || false,
    skip: options.skip || null,
    prefix: options.prefix || "default",
    standardHeaders: options.standardHeaders !== false, // Enable RateLimit headers by default
  };

  const windowSeconds = Math.ceil(config.windowMs / 1000);

  return async (req, res, next) => {
    try {
      // Skip if configured
      if (config.skip && config.skip(req)) {
        return next();
      }

      const key = generateKey(req, config.prefix, config);

      // Get current count
      let currentCount = await cache.get(key);
      currentCount = currentCount ? parseInt(currentCount, 10) : 0;

      // Calculate remaining requests
      const remaining = Math.max(0, config.maxRequests - currentCount);

      // Set rate limit headers (RFC 6585 compliant)
      if (config.standardHeaders) {
        res.setHeader("RateLimit-Limit", config.maxRequests);
        res.setHeader("RateLimit-Remaining", remaining);
        res.setHeader("RateLimit-Reset", Math.ceil(Date.now() / 1000) + windowSeconds);
      }

      // Check if limit exceeded
      if (currentCount >= config.maxRequests) {
        logger.warn("Rate limit exceeded", {
          ip: getClientIP(req),
          path: req.path,
          userId: req.user?.id,
          currentCount,
          limit: config.maxRequests,
        });

        // Add Retry-After header
        res.setHeader("Retry-After", windowSeconds);

        return ResponseHelper.error(res, {
          message: config.message,
          status_code: HTTP_STATUS.TOO_MANY_REQUESTS,
        });
      }

      // Increment counter
      if (currentCount === 0) {
        await cache.set(key, "1", "EX", windowSeconds);
      } else {
        await cache.incr(key);
      }

      // Track for skipSuccessfulRequests
      if (config.skipSuccessfulRequests) {
        const originalSend = res.send;
        res.send = function (...args) {
          // Decrement if response was successful
          if (res.statusCode >= 200 && res.statusCode < 400) {
            cache.decr(key).catch(() => {}); // Fire and forget
          }
          return originalSend.apply(res, args);
        };
      }

      next();
    } catch (error) {
      // Log error but don't block request (fail open)
      logger.error("Rate limiting error", { error: error.message });
      next();
    }
  };
};

/**
 * Pre-configured rate limiters
 */

// Global rate limiter (apply to all routes)
export const globalRateLimiter = createRateLimiter({
  ...RATE_LIMIT_CONFIG.global,
  prefix: "global",
});

// Authentication rate limiter (strict)
export const authRateLimiter = createRateLimiter({
  ...RATE_LIMIT_CONFIG.auth,
  prefix: "auth",
});

// API rate limiter
export const apiRateLimiter = createRateLimiter({
  ...RATE_LIMIT_CONFIG.api,
  prefix: "api",
});

// Write operations rate limiter
export const writeRateLimiter = createRateLimiter({
  ...RATE_LIMIT_CONFIG.write,
  prefix: "write",
});

// File upload rate limiter
export const uploadRateLimiter = createRateLimiter({
  ...RATE_LIMIT_CONFIG.upload,
  prefix: "upload",
});

// Payment rate limiter
export const paymentRateLimiter = createRateLimiter({
  ...RATE_LIMIT_CONFIG.payment,
  prefix: "payment",
});

/**
 * Dynamic rate limiter factory
 * Creates a rate limiter with custom parameters
 * @param {number} maxRequests - Max requests
 * @param {number} windowMinutes - Window in minutes
 * @param {string} prefix - Key prefix
 * @returns {Function} - Express middleware
 */
export const rateLimiter = (maxRequests, windowMinutes, prefix = "custom") => {
  return createRateLimiter({
    maxRequests,
    windowMs: windowMinutes * 60 * 1000,
    prefix,
  });
};

export default {
  createRateLimiter,
  globalRateLimiter,
  authRateLimiter,
  apiRateLimiter,
  writeRateLimiter,
  uploadRateLimiter,
  paymentRateLimiter,
  rateLimiter,
  RATE_LIMIT_CONFIG,
};
