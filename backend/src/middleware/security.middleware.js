/**
 * Security Middleware Configuration
 * Production-hardened security headers and protections
 * Includes:
 * - Enhanced Helmet configuration
 * - CORS with strict origin validation
 * - Input sanitization (XSS, NoSQL injection)
 * - Request validation
 * - Security headers
 */

import helmet from "helmet";
import mongoSanitize from "mongo-sanitize";
import logger from "../utils/logger.js";

/**
 * Production-ready Helmet configuration
 * Configures HTTP security headers
 */
export const helmetConfig = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Needed for Swagger UI
      scriptSrc: ["'self'", "'unsafe-inline'"], // Needed for Swagger UI
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      upgradeInsecureRequests: process.env.NODE_ENV === "production" ? [] : null,
    },
    reportOnly: false,
  },

  // Cross-Origin settings
  crossOriginEmbedderPolicy: false, // Disable for API usage
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },

  // DNS Prefetch Control
  dnsPrefetchControl: { allow: false },

  // Frameguard (clickjacking protection)
  frameguard: { action: "deny" },

  // Hide X-Powered-By header
  hidePoweredBy: true,

  // HSTS (HTTP Strict Transport Security)
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  },

  // IE No Open
  ieNoOpen: true,

  // No Sniff
  noSniff: true,

  // Origin Agent Cluster
  originAgentCluster: true,

  // Permitted Cross-Domain Policies
  permittedCrossDomainPolicies: { permittedPolicies: "none" },

  // Referrer Policy
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },

  // X-XSS-Protection (legacy but still useful)
  xssFilter: true,
});

/**
 * CORS configuration factory
 * Creates CORS options based on environment
 * @returns {Object} - CORS configuration
 */
export const createCorsConfig = () => {
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : ["*"];

  const isProduction = process.env.NODE_ENV === "production";

  return {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // In production, strictly check allowed origins
      if (isProduction) {
        if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        logger.warn("CORS blocked request", { origin, allowedOrigins });
        return callback(new Error("Not allowed by CORS"), false);
      }

      // In development, allow all origins
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Request-ID",
      "X-Correlation-ID",
    ],
    exposedHeaders: [
      "X-Request-ID",
      "RateLimit-Limit",
      "RateLimit-Remaining",
      "RateLimit-Reset",
    ],
    maxAge: 86400, // 24 hours - cache preflight requests
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
};

/**
 * Input sanitization middleware
 * Protects against NoSQL injection and XSS attacks
 */
export const sanitizeInput = (req, res, next) => {
  // Sanitize body
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query && typeof req.query === "object") {
    req.query = sanitizeObject(req.query);
  }

  // Sanitize params
  if (req.params && typeof req.params === "object") {
    req.params = sanitizeObject(req.params);
  }

  next();
};

/**
 * Recursively sanitize an object
 * @param {Object} obj - Object to sanitize
 * @returns {Object} - Sanitized object
 */
const sanitizeObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  if (obj && typeof obj === "object") {
    // Use mongo-sanitize for NoSQL injection protection
    const sanitized = mongoSanitize(obj);

    // Additional XSS sanitization for strings
    for (const key of Object.keys(sanitized)) {
      if (typeof sanitized[key] === "string") {
        sanitized[key] = sanitizeString(sanitized[key]);
      } else if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
        sanitized[key] = sanitizeObject(sanitized[key]);
      }
    }

    return sanitized;
  }

  return obj;
};

/**
 * Sanitize a string value
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;

  // Remove null bytes
  str = str.replace(/\0/g, "");

  // Basic XSS prevention - escape HTML special characters
  // Note: For full XSS protection, use DOMPurify on the frontend
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

/**
 * Validate Content-Type header for POST/PUT/PATCH requests
 */
export const validateContentType = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  const method = req.method.toUpperCase();

  // Only validate for methods that typically have bodies
  if (["POST", "PUT", "PATCH"].includes(method)) {
    // Skip for file uploads
    if (contentType.includes("multipart/form-data")) {
      return next();
    }

    // Skip for empty bodies
    const contentLength = parseInt(req.headers["content-length"] || "0", 10);
    if (contentLength === 0) {
      return next();
    }

    // Require JSON content type
    if (!contentType.includes("application/json") && !contentType.includes("application/x-www-form-urlencoded")) {
      logger.warn("Invalid Content-Type header", {
        contentType,
        method,
        path: req.path,
      });
      
      return res.status(415).json({
        success: false,
        message: "Unsupported Media Type. Use application/json.",
      });
    }
  }

  next();
};

/**
 * Block common attack patterns in URLs
 */
export const blockSuspiciousPatterns = (req, res, next) => {
  const url = req.originalUrl.toLowerCase();

  // Patterns that indicate potential attacks
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /<script/i, // Script injection
    /javascript:/i, // JavaScript protocol
    /vbscript:/i, // VBScript protocol
    /data:text\/html/i, // Data URI XSS
    /on\w+=/i, // Event handlers (onclick, onerror, etc.)
    /eval\(/i, // eval() injection
    /\$\{.*\}/i, // Template literal injection
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      logger.warn("Blocked suspicious request", {
        url: req.originalUrl,
        pattern: pattern.toString(),
        ip: req.clientIP || req.ip,
      });

      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
  }

  next();
};

/**
 * Add security headers not covered by Helmet
 */
export const additionalSecurityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Disable client-side caching for sensitive data
  if (req.path.includes("/api/") && !req.path.includes("/public")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
  }

  // Feature Policy / Permissions Policy
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

  next();
};

export default {
  helmetConfig,
  createCorsConfig,
  sanitizeInput,
  validateContentType,
  blockSuspiciousPatterns,
  additionalSecurityHeaders,
};
