 
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
});

// ========================================
// BASE ROUTE - API DOCUMENTATION LANDING PAGE
// ========================================
app.get("/", (req, res) => {
  const baseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get("host")}`;
  const frontendUrl = process.env.FRONTEND_URL || "https://evoting.itforyouthghana.org";
  
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ITFY E-Voting API</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1e3a5f 0%, #0f1f36 100%);
      min-height: 100vh;
      color: #e2e8f0;
      line-height: 1.6;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    header {
      text-align: center;
      margin-bottom: 50px;
    }
    
    .logo {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 1.1rem;
      color: #94a3b8;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .version-badge {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      margin-top: 15px;
    }
    
    .status-bar {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin: 30px 0;
      flex-wrap: wrap;
    }
    
    .status-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #22c55e;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }
    
    .card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 25px;
      backdrop-filter: blur(10px);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }
    
    .card h2 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #fff;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .card p {
      color: #94a3b8;
      font-size: 0.95rem;
      margin-bottom: 15px;
    }
    
    .endpoints-list {
      list-style: none;
    }
    
    .endpoints-list li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .endpoints-list li:last-child {
      border-bottom: none;
    }
    
    .method {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 4px;
      min-width: 50px;
      text-align: center;
    }
    
    .method.get { background: #22c55e; color: #fff; }
    .method.post { background: #3b82f6; color: #fff; }
    .method.put { background: #f59e0b; color: #fff; }
    .method.delete { background: #ef4444; color: #fff; }
    
    .endpoint-path {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
      font-size: 0.95rem;
    }
    
    .btn-primary {
      background: #3b82f6;
      color: white;
    }
    
    .btn-primary:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
    
    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    
    .btn-group {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .feature-item {
      padding: 15px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      text-align: center;
    }
    
    .feature-item .icon {
      font-size: 1.5rem;
      margin-bottom: 8px;
    }
    
    .feature-item h3 {
      font-size: 0.95rem;
      font-weight: 500;
      color: #fff;
      margin-bottom: 4px;
    }
    
    .feature-item p {
      font-size: 0.8rem;
      color: #64748b;
      margin: 0;
    }
    
    .code-block {
      background: #0d1117;
      border-radius: 8px;
      padding: 15px;
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      margin-top: 15px;
    }
    
    .code-block .comment { color: #6e7681; }
    .code-block .key { color: #7ee787; }
    .code-block .string { color: #a5d6ff; }
    
    footer {
      text-align: center;
      padding-top: 40px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #64748b;
      font-size: 0.9rem;
    }
    
    footer a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    footer a:hover {
      text-decoration: underline;
    }
    
    .quick-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 15px;
      flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
      h1 { font-size: 1.8rem; }
      .grid { grid-template-columns: 1fr; }
      .container { padding: 20px 15px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">🗳️</div>
      <h1>ITFY E-Voting API</h1>
      <p class="subtitle">
        A secure, scalable RESTful API powering Ghana's premier electronic voting platform. 
        Built for reliability, transparency, and real-time vote processing.
      </p>
      <span class="version-badge">v1.1.0 • Production</span>
      
      <div class="status-bar">
        <div class="status-item">
          <span class="status-dot"></span>
          <span>API Operational</span>
        </div>
        <div class="status-item">
          <span class="status-dot"></span>
          <span>Database Connected</span>
        </div>
        <div class="status-item">
          <span class="status-dot"></span>
          <span>Cache Active</span>
        </div>
      </div>
    </header>

    <div class="grid">
      <!-- Quick Start -->
      <div class="card">
        <h2>🚀 Quick Start</h2>
        <p>Get started with the ITFY E-Voting API in minutes. All endpoints require authentication unless specified otherwise.</p>
        
        <div class="code-block">
          <span class="comment"># Base URL</span><br>
          <span class="key">GET</span> <span class="string">${baseUrl}/api/v1</span><br><br>
          <span class="comment"># Authentication</span><br>
          <span class="key">POST</span> <span class="string">/api/v1/auth/login</span><br>
          <span class="comment"># Include token in headers:</span><br>
          Authorization: Bearer &lt;token&gt;
        </div>
        
        <div class="btn-group">
          <a href="/api-docs" class="btn btn-primary">📖 Swagger UI</a>
          <a href="/api-docs/redoc" class="btn btn-secondary">📚 ReDoc</a>
        </div>
      </div>

      <!-- API Endpoints -->
      <div class="card">
        <h2>📡 API Endpoints</h2>
        <p>Core endpoints for the e-voting platform:</p>
        <ul class="endpoints-list">
          <li>
            <span class="method post">POST</span>
            <span class="endpoint-path">/api/v1/auth/login</span>
          </li>
          <li>
            <span class="method get">GET</span>
            <span class="endpoint-path">/api/v1/events</span>
          </li>
          <li>
            <span class="method get">GET</span>
            <span class="endpoint-path">/api/v1/categories/:eventId</span>
          </li>
          <li>
            <span class="method get">GET</span>
            <span class="endpoint-path">/api/v1/candidates/:categoryId</span>
          </li>
          <li>
            <span class="method post">POST</span>
            <span class="endpoint-path">/api/v1/payments/initialize</span>
          </li>
          <li>
            <span class="method post">POST</span>
            <span class="endpoint-path">/api/v1/votes/cast</span>
          </li>
        </ul>
      </div>

      <!-- Features -->
      <div class="card" style="grid-column: 1 / -1;">
        <h2>✨ Platform Features</h2>
        <div class="feature-grid">
          <div class="feature-item">
            <div class="icon">🔐</div>
            <h3>JWT Authentication</h3>
            <p>Secure token-based auth with refresh tokens</p>
          </div>
          <div class="feature-item">
            <div class="icon">🎉</div>
            <h3>Event Management</h3>
            <p>Create and manage voting events</p>
          </div>
          <div class="feature-item">
            <div class="icon">👤</div>
            <h3>Candidate System</h3>
            <p>Nominations and profiles</p>
          </div>
          <div class="feature-item">
            <div class="icon">🗳️</div>
            <h3>Secure Voting</h3>
            <p>Real-time vote casting & tracking</p>
          </div>
          <div class="feature-item">
            <div class="icon">💳</div>
            <h3>Paystack Payments</h3>
            <p>Integrated payment processing</p>
          </div>
          <div class="feature-item">
            <div class="icon">📊</div>
            <h3>Live Analytics</h3>
            <p>Real-time voting statistics</p>
          </div>
          <div class="feature-item">
            <div class="icon">🔔</div>
            <h3>Notifications</h3>
            <p>Email & push notifications</p>
          </div>
          <div class="feature-item">
            <div class="icon">📈</div>
            <h3>Rate Limiting</h3>
            <p>Redis-backed request throttling</p>
          </div>
        </div>
      </div>

      <!-- Authentication -->
      <div class="card">
        <h2>🔑 Authentication</h2>
        <p>The API uses JWT (JSON Web Tokens) for authentication. Obtain a token via login and include it in subsequent requests.</p>
        
        <div class="code-block">
          <span class="comment">// Login Request</span><br>
          POST /api/v1/auth/login<br>
          {<br>
          &nbsp;&nbsp;<span class="key">"email"</span>: <span class="string">"user@example.com"</span>,<br>
          &nbsp;&nbsp;<span class="key">"password"</span>: <span class="string">"your-password"</span><br>
          }<br><br>
          <span class="comment">// Response</span><br>
          {<br>
          &nbsp;&nbsp;<span class="key">"token"</span>: <span class="string">"eyJhbGc..."</span>,<br>
          &nbsp;&nbsp;<span class="key">"refreshToken"</span>: <span class="string">"eyJhbGc..."</span><br>
          }
        </div>
      </div>

      <!-- Health & Status -->
      <div class="card">
        <h2>💚 Health & Status</h2>
        <p>Monitor API health and system status:</p>
        <ul class="endpoints-list">
          <li>
            <span class="method get">GET</span>
            <span class="endpoint-path">/api/v1/health</span>
          </li>
          <li>
            <span class="method get">GET</span>
            <span class="endpoint-path">/api/v1/health/detailed</span>
          </li>
          <li>
            <span class="method get">GET</span>
            <span class="endpoint-path">/metrics</span>
          </li>
        </ul>
        
        <div class="btn-group">
          <a href="/api/v1/health" class="btn btn-secondary" target="_blank">Check Health</a>
        </div>
      </div>
    </div>

    <footer>
      <p><strong>IT For Youth Ghana</strong> • Empowering Democratic Processes Through Technology</p>
      <div class="quick-links">
        <a href="${frontendUrl}">🌐 Frontend App</a>
        <a href="/api-docs">📖 API Documentation</a>
        <a href="/api/v1/health">💚 Health Check</a>
        <a href="mailto:support@itforyouthghana.org">📧 Support</a>
      </div>
      <p style="margin-top: 20px; font-size: 0.8rem;">
        © ${new Date().getFullYear()} ITFY E-Voting System. All rights reserved.<br>
        Environment: <strong>${process.env.NODE_ENV || 'development'}</strong> | 
        Node: <strong>${process.version}</strong>
      </p>
    </footer>
  </div>
</body>
</html>
  `);
});


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
