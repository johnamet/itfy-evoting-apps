/**
 * Production-Ready Winston Logger
 * Provides structured logging with:
 * - Multiple log levels (error, warn, info, http, debug)
 * - JSON format for production (easy parsing by log aggregators)
 * - Pretty format for development
 * - Request correlation (request ID tracking)
 * - Automatic sensitive data redaction
 * - Log rotation support
 * - Error stack trace handling
 * - Optional Sentry integration for error tracking
 */

import winston from "winston";
import path from "path";

// Lazy load Sentry only if configured
let Sentry = null;
const SENTRY_DSN = process.env.SENTRY_DSN;
const isProduction = process.env.NODE_ENV === "production";

// Initialize Sentry if DSN is provided
if (SENTRY_DSN && isProduction) {
  try {
    import("@sentry/node").then((module) => {
      Sentry = module;
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: process.env.NODE_ENV || "development",
        release: process.env.npm_package_version || "1.0.0",
        tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_RATE) || 0.1,
        // Don't send PII
        sendDefaultPii: false,
        // Filter out non-error events in production
        beforeSend(event) {
          // Remove sensitive data from breadcrumbs
          if (event.breadcrumbs) {
            event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
              if (breadcrumb.data) {
                breadcrumb.data = redactSensitive(breadcrumb.data);
              }
              return breadcrumb;
            });
          }
          return event;
        },
      });
      console.log("✅ Sentry error tracking initialized");
    }).catch(err => {
      console.warn("⚠️ Sentry initialization failed:", err.message);
    });
  } catch (err) {
    console.warn("⚠️ Sentry not available:", err.message);
  }
}

// Sensitive fields to redact in logs
const SENSITIVE_FIELDS = [
  "password",
  "password_hash",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "api_key",
  "apiKey",
  "secret",
  "credit_card",
  "creditCard",
  "ssn",
  "cvv",
];

/**
 * Redact sensitive information from log data
 * @param {Object} obj - Object to redact
 * @returns {Object} - Redacted object
 */
const redactSensitive = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  const redacted = Array.isArray(obj) ? [...obj] : { ...obj };

  for (const key of Object.keys(redacted)) {
    const lowerKey = key.toLowerCase();

    // Check if key matches sensitive patterns
    if (SENSITIVE_FIELDS.some((field) => lowerKey.includes(field.toLowerCase()))) {
      redacted[key] = "[REDACTED]";
    } else if (typeof redacted[key] === "object" && redacted[key] !== null) {
      redacted[key] = redactSensitive(redacted[key]);
    }
  }

  return redacted;
};

/**
 * Custom format for development (pretty print)
 */
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, requestId, ...metadata }) => {
    const reqId = requestId ? `[${requestId}]` : "";
    const meta = Object.keys(metadata).length > 0 ? `\n${JSON.stringify(redactSensitive(metadata), null, 2)}` : "";
    return `${timestamp} ${level} ${reqId} ${message}${meta}`;
  })
);

/**
 * Custom format for production (JSON)
 */
const prodFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD'T'HH:mm:ss.SSSZ" }),
  winston.format.errors({ stack: true }),
  winston.format((info) => {
    // Redact sensitive data in production
    return redactSensitive(info);
  })(),
  winston.format.json()
);

/**
 * Determine log level based on environment
 */
const getLogLevel = () => {
  const env = process.env.NODE_ENV || "development";
  const levels = {
    production: "info",
    staging: "debug",
    development: "debug",
    test: "warn",
  };
  return process.env.LOG_LEVEL || levels[env] || "info";
};

/**
 * Create transports based on environment
 */
const createTransports = () => {
  const transports = [];
  const isProduction = process.env.NODE_ENV === "production";

  // Console transport (always enabled)
  transports.push(
    new winston.transports.Console({
      format: isProduction ? prodFormat : devFormat,
      handleExceptions: true,
      handleRejections: true,
    })
  );

  // File transports for production
  if (isProduction) {
    const logDir = process.env.LOG_DIR || "logs";

    // Combined log file
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, "combined.log"),
        format: prodFormat,
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        tailable: true,
      })
    );

    // Error log file
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, "error.log"),
        level: "error",
        format: prodFormat,
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 10,
        tailable: true,
      })
    );
  }

  return transports;
};

/**
 * Create the Winston logger instance
 */
const logger = winston.createLogger({
  level: getLogLevel(),
  levels: winston.config.npm.levels,
  defaultMeta: {
    service: "itfy-evoting-backend",
    version: process.env.npm_package_version || "1.1.0",
  },
  transports: createTransports(),
  exitOnError: false,
});

/**
 * Create a child logger with request context
 * @param {Object} context - Request context (requestId, userId, etc.)
 * @returns {Object} - Child logger with context
 */
export const createRequestLogger = (context = {}) => {
  return logger.child(context);
};

/**
 * HTTP request logging middleware format
 * Compatible with morgan-like logging
 */
export const httpLogFormat = {
  stream: {
    write: (message) => {
      logger.http(message.trim());
    },
  },
};

/**
 * Log error with stack trace and send to Sentry
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export const logError = (error, context = {}) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    code: error.code,
    ...context,
  };
  
  logger.error(errorData);
  
  // Send to Sentry if available
  if (Sentry && isProduction) {
    Sentry.withScope((scope) => {
      // Add context as extras
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      
      if (context.requestId) {
        scope.setTag("requestId", context.requestId);
      }
      if (context.userId) {
        scope.setUser({ id: context.userId });
      }
      
      Sentry.captureException(error);
    });
  }
};

/**
 * Log with automatic level detection
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 */
export const log = (level, message, meta = {}) => {
  logger.log(level, message, meta);
};

/**
 * Shutdown logger gracefully
 * @returns {Promise<void>}
 */
export const closeLogger = async () => {
  return new Promise((resolve) => {
    logger.on("finish", resolve);
    logger.end();
  });
};

// Export default logger and utility functions
export default logger;
