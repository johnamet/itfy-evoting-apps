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

// Load environment variables first (single call)
dotenv.config();

import db from "./database/app.database.js";
import agendaManager from "./services/agenda.service.js";
import { healthService } from "./services/health.service.js";
import cache from "./utils/cache/cache.utils.js";
import router from "./routes/app.routes.js";
import { setupAPIDocs } from "./config/swagger.config.js";
import BaseController from "./modules/shared/base.controller.js";
import Joi from "joi";

// Production middleware imports
import logger, { httpLogFormat, closeLogger } from "./utils/logger.js";
import {
  helmetConfig,
  createCorsConfig,
  sanitizeInput,
  validateContentType,
  blockSuspiciousPatterns,
  additionalSecurityHeaders,
  protectAPIDocs,
  validateProductionEnvironment,
} from "./middleware/security.middleware.js";
import {
  requestContextMiddleware,
  clientIPMiddleware,
} from "./middleware/request-context.middleware.js";
import { globalRateLimiter } from "./middleware/rate-limit.middleware.js";
import { metricsMiddleware, metricsHandler } from "./services/metrics.service.js";

// Validate production environment variables
validateProductionEnvironment();

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

// CORS configuration (production-ready)
app.use(cors(createCorsConfig()));

// Additional security headers
app.use(additionalSecurityHeaders);

// Block suspicious request patterns
app.use(blockSuspiciousPatterns);

// Response compression (skip for small responses)
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
  },
}));

// Body parsing with size limits
app.use(express.json({
  limit: "10mb",
  strict: true,
  verify: (req, res, buf) => {
    req.rawBody = buf; // Store raw body for webhook signature verification
  },
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Input sanitization (XSS, NoSQL injection protection)
app.use(sanitizeInput);

// Content-Type validation
app.use(validateContentType);

// Static file serving for uploads (with caching headers)
app.use("/uploads", express.static("uploads", {
  maxAge: isProduction ? "1d" : 0,
  etag: true,
  lastModified: true,
}));

// HTTP request logging (structured logging)
app.use((req, res, next) => {
  if (req.path === "/api/v1/health" || req.path === "/metrics") return next();
  httpLogFormat.stream.write(`${req.method} ${req.path} - ${req.clientIP || req.ip}`);
  next();
});

// Prometheus metrics collection
app.use(metricsMiddleware);

// Global rate limiting in production
if (isProduction) {
  app.use(globalRateLimiter);
}

// ========================================
// PROMETHEUS METRICS ENDPOINT
// ========================================
app.get("/metrics", metricsHandler);

// ========================================
// API DOCUMENTATION (Protected in Production)
// ========================================
// Apply protection middleware for documentation routes
app.use(["/api-docs", "/docs"], protectAPIDocs);
setupAPIDocs(app);


// ========================================
// ROUTES
// ========================================

// Quick health check (for load balancers, etc.)
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
    res.status(500).json({
      status: "error",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// API routes
app.use("/api/v1", (req, res, next) => {
  res.setHeader("X-Powered-By", "ITFY E-Voting");
  next();
});

app.use("/api/v1", router);



app.use("/api/v1/", (req, res) =>{
  res.json({
    message: "Welcome to the ITFY E-Voting API v1\nVisit /api/v1/health to check server status.",
    api_routes: {
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
    api_routes_docs: {
      swagger_ui: "/api-docs",
      redoc: "/api-docs/redoc",
    },
  });
})


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Log error with request context
  const errorContext = {
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    ip: req.clientIP || req.ip,
    userId: req.user?.id,
    statusCode: err.statusCode || 500,
  };

  // Log at appropriate level based on status code
  if (err.statusCode >= 500 || !err.statusCode) {
    logger.error("Server error", { ...errorContext, error: err.message, stack: err.stack });
  } else if (err.statusCode >= 400) {
    logger.warn("Client error", { ...errorContext, error: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = isProduction && statusCode === 500 
    ? "Internal server error" 
    : err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    requestId: req.requestId,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ========================================
// SERVER INITIALIZATION
// ========================================

async function startServer() {
  try {
    // 1. Connect to MongoDB
    logger.info("🔌 Connecting to MongoDB...");
    await db.connect();
    logger.info("✅ MongoDB connected successfully");

    // 2. Connect to Redis cache
    logger.info("🔌 Connecting to Redis cache...");
    await cache.connect();
    logger.info("✅ Cache connected successfully");

    // 3. Initialize Agenda job queue
    logger.info("🔌 Initializing Agenda.js...");
    await agendaManager.initialize();
    logger.info("✅ Agenda.js initialized successfully");

    // 4. Setup recurring tasks
    logger.info("⚙️ Setting up recurring tasks...");
    await agendaManager.setupRecurringTasks();
    logger.info("✅ Recurring tasks configured");

    // 5. Start Express server
    server = app.listen(PORT, () => {
      logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      logger.info(`🚀 ITFY E-Voting Server is running`);
      logger.info(`📍 Port: ${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      logger.info(`⏰ Started at: ${new Date().toISOString()}`);
      logger.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });

    // Set server timeout for long-running requests
    server.timeout = 120000; // 2 minutes
    server.keepAliveTimeout = 65000; // Slightly higher than ALB idle timeout
  } catch (error) {
    logger.error("❌ Failed to start server:", { error: error.message, stack: error.stack });
    process.exit(1);
  }
}

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

async function gracefulShutdown(signal) {
  // Prevent duplicate shutdown calls
  if (isShuttingDown) {
    logger.warn(`Shutdown already in progress, ignoring ${signal}`);
    return;
  }
  isShuttingDown = true;

  logger.info(`\n⚠️ ${signal} received. Starting graceful shutdown...`);

  // Set a timeout to force exit if graceful shutdown takes too long
  const forceExitTimeout = setTimeout(() => {
    logger.error("❌ Graceful shutdown timed out, forcing exit");
    process.exit(1);
  }, 30000); // 30 seconds max

  try {
    // Stop accepting new requests
    if (server) {
      logger.info("🛑 Stopping Express server...");
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      logger.info("✅ Express server stopped");
    }

    // Stop Agenda job processing
    logger.info("🛑 Stopping Agenda.js...");
    await agendaManager.stop();
    logger.info("✅ Agenda.js stopped");

    // Close database connection
    logger.info("🛑 Closing MongoDB connection...");
    const mongoose = await import("mongoose");
    await mongoose.default.connection.close();
    logger.info("✅ MongoDB connection closed");

    // Close cache connection
    logger.info("🛑 Closing cache connection...");
    await cache.disconnect();
    logger.info("✅ Cache connection closed");

    // Close logger transports
    logger.info("🛑 Closing logger...");
    await closeLogger();

    clearTimeout(forceExitTimeout);
    console.log("✅ Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    clearTimeout(forceExitTimeout);
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
}

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("❌ Uncaught Exception:", { error: error.message, stack: error.stack });
  // In production, attempt graceful shutdown
  if (isProduction) {
    gracefulShutdown("UNCAUGHT_EXCEPTION");
  } else {
    // In development, crash immediately for debugging
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error("❌ Unhandled Rejection", {
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : undefined,
  });
  // In production, attempt graceful shutdown
  if (isProduction) {
    gracefulShutdown("UNHANDLED_REJECTION");
  }
  // In development, log but continue (might be a non-critical promise)
});

// Start the server
startServer();

export default app;
