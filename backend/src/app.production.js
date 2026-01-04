/* eslint-disable no-undef */
/**
 * ITFY E-Voting Backend Application
 * Main entry point - Production-ready Express server with MongoDB and Agenda
 * 
 * Production Features:
 * - Compression for response payloads
 * - Structured logging with Winston
 * - Request ID tracking for distributed tracing
 * - Enhanced security middleware (Helmet, CORS, sanitization)
 * - Rate limiting with Redis backing
 * - Prometheus metrics endpoint
 * - Graceful shutdown with proper cleanup
 * - Health checks for container orchestration
 */

import express from "express";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import db from "./database/app.database.js";
import agendaManager from "./services/agenda.service.js";
import { healthService } from "./services/health.service.js";
import cache from "./utils/cache/cache.utils.js";
import router from "./routes/app.routes.js";
import { setupAPIDocs } from "./config/swagger.config.js";
import BaseController from "./modules/shared/base.controller.js";
import Joi from "joi";

// Production middleware
import logger, { httpLogFormat, closeLogger } from "./utils/logger.js";
import {
  helmetConfig,
  createCorsConfig,
  sanitizeInput,
  validateContentType,
  blockSuspiciousPatterns,
  additionalSecurityHeaders,
} from "./middleware/security.middleware.js";
import {
  requestContextMiddleware,
  clientIPMiddleware,
} from "./middleware/request-context.middleware.js";
import {
  globalRateLimiter,
} from "./middleware/rate-limit.middleware.js";
import {
  metricsMiddleware,
  metricsHandler,
} from "./services/metrics.service.js";

// Initialize Joi validation for controllers
BaseController.setValidation(Joi);

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Server reference for graceful shutdown
let server = null;
let isShuttingDown = false;

// ========================================
// TRUST PROXY (for load balancers/reverse proxies)
// ========================================
if (isProduction) {
  // Trust first proxy (e.g., nginx, AWS ALB)
  app.set("trust proxy", 1);
}

// ========================================
// CORE MIDDLEWARE
// ========================================

// Request context and client IP (must be first)
app.use(clientIPMiddleware);
app.use(requestContextMiddleware);

// Security headers (enhanced Helmet config)
app.use(helmetConfig);

// CORS configuration
app.use(cors(createCorsConfig()));

// Additional security headers not covered by Helmet
app.use(additionalSecurityHeaders);

// Block suspicious request patterns
app.use(blockSuspiciousPatterns);

// Response compression (skip for small responses)
app.use(compression({
  level: 6, // Balanced compression level
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't accept it
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
}));

// Body parsing with size limits
app.use(express.json({
  limit: "10mb",
  strict: true,
  verify: (req, res, buf) => {
    // Store raw body for webhook signature verification
    req.rawBody = buf;
  },
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Input sanitization (XSS, NoSQL injection protection)
app.use(sanitizeInput);

// Content-Type validation
app.use(validateContentType);

// Static file serving for uploads (with caching headers)
app.use("/uploads", express.static("uploads", {
  maxAge: isProduction ? "1d" : 0, // Cache for 1 day in production
  etag: true,
  lastModified: true,
}));

// HTTP request logging (Morgan with Winston stream)
app.use((req, res, next) => {
  // Skip logging for health checks and metrics
  if (req.path === "/api/v1/health" || req.path === "/metrics") {
    return next();
  }
  httpLogFormat.stream.write(
    `${req.method} ${req.path} ${res.statusCode} - ${req.clientIP}`
  );
  next();
});

// Prometheus metrics collection
app.use(metricsMiddleware);

// Global rate limiting (applies to all routes)
if (isProduction) {
  app.use(globalRateLimiter);
}

// ========================================
// API DOCUMENTATION
// ========================================
setupAPIDocs(app);

// ========================================
// HEALTH & MONITORING ROUTES
// ========================================

// Liveness probe (for Kubernetes/container orchestration)
app.get("/health/live", (req, res) => {
  res.status(200).json({ status: "alive", timestamp: new Date().toISOString() });
});

// Readiness probe (checks if app is ready to serve traffic)
app.get("/health/ready", async (req, res) => {
  try {
    if (isShuttingDown) {
      return res.status(503).json({ status: "shutting_down" });
    }

    const health = await healthService.getQuickHealth();
    const isReady = health.services.database === "connected";

    res.status(isReady ? 200 : 503).json({
      status: isReady ? "ready" : "not_ready",
      ...health,
    });
  } catch (error) {
    res.status(503).json({ status: "error", error: error.message });
  }
});

// Quick health check (for load balancers)
app.get("/api/v1/health", async (req, res) => {
  const health = await healthService.getQuickHealth();
  res.json(health);
});

// Comprehensive system health check
app.get("/api/v1/health/detailed", async (req, res) => {
  try {
    const health = await healthService.getSystemHealth();
    const statusCode = health.status === "healthy" ? 200 : 
                       health.status === "degraded" ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    logger.error("Health check failed", { error: error.message });
    res.status(500).json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Prometheus metrics endpoint
app.get("/metrics", metricsHandler);

// ========================================
// API ROUTES
// ========================================

// API version header
app.use("/api/v1", (req, res, next) => {
  res.setHeader("X-API-Version", "v1");
  next();
});

// Main API routes
app.use("/api/v1", router);

// API info endpoint
app.get("/api/v1/", (req, res) => {
  res.json({
    message: "Welcome to the ITFY E-Voting API v1",
    version: "1.1.0",
    documentation: {
      swagger: "/api-docs",
      redoc: "/api-docs/redoc",
    },
    endpoints: {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      events: "/api/v1/events",
      categories: "/api/v1/categories",
      candidates: "/api/v1/candidates",
      votes: "/api/v1/votes",
      bundles: "/api/v1/bundles",
      payments: "/api/v1/payments",
      notifications: "/api/v1/notifications",
    },
    health: "/api/v1/health",
  });
});

// ========================================
// ERROR HANDLERS
// ========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    requestId: req.requestId,
  });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log error with context
  logger.error("Unhandled error", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.requestId,
  });

  const statusCode = err.statusCode || err.status || 500;
  const message = isProduction && statusCode === 500
    ? "Internal server error"
    : err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    requestId: req.requestId,
    ...(!isProduction && { stack: err.stack }),
  });
});

// ========================================
// SERVER INITIALIZATION
// ========================================

async function startServer() {
  try {
    // 1. Connect to MongoDB
    logger.info("Connecting to MongoDB...");
    await db.connect();
    logger.info("MongoDB connected successfully");

    // 2. Connect to Redis cache
    logger.info("Connecting to Redis cache...");
    await cache.connect();
    logger.info("Cache connected successfully");

    // 3. Initialize Agenda job queue
    logger.info("Initializing Agenda.js...");
    await agendaManager.initialize();
    logger.info("Agenda.js initialized successfully");

    // 4. Setup recurring tasks
    logger.info("Setting up recurring tasks...");
    await agendaManager.setupRecurringTasks();
    logger.info("Recurring tasks configured");

    // 5. Start Express server
    server = app.listen(PORT, () => {
      logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      logger.info("ITFY E-Voting Server is running", {
        port: PORT,
        environment: process.env.NODE_ENV || "development",
        nodeVersion: process.version,
        pid: process.pid,
      });
      logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      // Signal PM2 that app is ready (for graceful reloads)
      if (process.send) {
        process.send("ready");
      }
    });

    // Set server timeout
    server.timeout = 30000; // 30 seconds
    server.keepAliveTimeout = 65000; // Slightly higher than ALB idle timeout
    server.headersTimeout = 66000; // Slightly higher than keepAliveTimeout

  } catch (error) {
    logger.error("Failed to start server", { error: error.message, stack: error.stack });
    process.exit(1);
  }
}

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

async function gracefulShutdown(signal) {
  if (isShuttingDown) {
    logger.warn("Shutdown already in progress, ignoring signal", { signal });
    return;
  }

  isShuttingDown = true;
  logger.warn(`${signal} received. Starting graceful shutdown...`);

  const shutdownTimeout = setTimeout(() => {
    logger.error("Graceful shutdown timed out, forcing exit");
    process.exit(1);
  }, 30000); // 30 second timeout

  try {
    // 1. Stop accepting new connections
    if (server) {
      logger.info("Stopping HTTP server...");
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      logger.info("HTTP server stopped");
    }

    // 2. Stop Agenda job processing
    logger.info("Stopping Agenda.js...");
    await agendaManager.stop();
    logger.info("Agenda.js stopped");

    // 3. Close database connection
    logger.info("Closing MongoDB connection...");
    const mongoose = await import("mongoose");
    await mongoose.default.connection.close();
    logger.info("MongoDB connection closed");

    // 4. Close cache connection
    logger.info("Closing cache connection...");
    await cache.disconnect();
    logger.info("Cache connection closed");

    // 5. Close logger
    await closeLogger();

    clearTimeout(shutdownTimeout);
    logger.info("Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    clearTimeout(shutdownTimeout);
    logger.error("Error during shutdown", { error: error.message });
    process.exit(1);
  }
}

// ========================================
// PROCESS EVENT HANDLERS
// ========================================

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions (log and exit)
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", {
    error: error.message,
    stack: error.stack,
  });
  // Exit with failure - let process manager restart
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection", {
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : undefined,
  });
  // Don't exit for unhandled rejections in production
  // Node.js 15+ exits by default, so this keeps the app running
});

// Handle warnings
process.on("warning", (warning) => {
  logger.warn("Node.js Warning", {
    name: warning.name,
    message: warning.message,
    stack: warning.stack,
  });
});

// ========================================
// START THE SERVER
// ========================================
startServer();

export default app;
