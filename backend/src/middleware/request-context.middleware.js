/**
 * Request Context Middleware
 * Provides:
 * - Unique request ID generation for tracing
 * - Request timing/duration tracking
 * - User context extraction
 * - Correlation ID propagation (for microservices)
 */

import crypto from "crypto";
import { AsyncLocalStorage } from "async_hooks";
import logger from "../utils/logger.js";

// Async local storage for request context
const requestContext = new AsyncLocalStorage();

/**
 * Generate a unique request ID
 * @returns {string} - Unique request ID
 */
const generateRequestId = () => {
  return `req_${Date.now().toString(36)}_${crypto.randomBytes(6).toString("hex")}`;
};

/**
 * Request context middleware
 * Adds request ID, timing, and correlation ID support
 * 
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const requestContextMiddleware = (req, res, next) => {
  // Generate or extract request ID
  const requestId =
    req.headers["x-request-id"] ||
    req.headers["x-correlation-id"] ||
    generateRequestId();

  // Record start time for duration tracking
  const startTime = process.hrtime.bigint();
  const startTimestamp = Date.now();

  // Create request context
  const context = {
    requestId,
    method: req.method,
    path: req.path,
    url: req.originalUrl,
    ip: getClientIP(req),
    userAgent: req.headers["user-agent"],
    startTime: startTimestamp,
    startHrTime: startTime,
  };

  // Add request ID to request object
  req.requestId = requestId;
  req.startTime = startTimestamp;

  // Set response headers
  res.setHeader("X-Request-ID", requestId);

  // Track response and log on finish
  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - startTime) / 1e6; // Convert to ms

    // Log request completion
    const logData = {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration.toFixed(2)}ms`,
      contentLength: res.getHeader("content-length"),
      userId: req.user?.id || null,
    };

    // Choose log level based on status code
    if (res.statusCode >= 500) {
      logger.error("Request completed with server error", logData);
    } else if (res.statusCode >= 400) {
      logger.warn("Request completed with client error", logData);
    } else if (duration > 1000) {
      logger.warn("Slow request detected", logData);
    } else {
      logger.http("Request completed", logData);
    }
  });

  // Run the rest of the middleware chain with context
  requestContext.run(context, () => {
    next();
  });
};

/**
 * Get current request context
 * @returns {Object|undefined} - Current request context
 */
export const getRequestContext = () => {
  return requestContext.getStore();
};

/**
 * Get current request ID
 * @returns {string|undefined} - Current request ID
 */
export const getRequestId = () => {
  return requestContext.getStore()?.requestId;
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
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    return ips[0];
  }

  const realIP = req.headers["x-real-ip"];
  if (realIP) return realIP;

  return req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip || "unknown";
};

/**
 * Middleware to extract and normalize client IP
 */
export const clientIPMiddleware = (req, res, next) => {
  req.clientIP = getClientIP(req);
  next();
};

export default {
  requestContextMiddleware,
  clientIPMiddleware,
  getRequestContext,
  getRequestId,
};
