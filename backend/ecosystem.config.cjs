/**
 * PM2 Ecosystem Configuration
 * Production-ready process management for ITFY E-Voting Backend
 * 
 * Features:
 * - Cluster mode for multi-core utilization
 * - Auto-restart on crashes
 * - Memory limit monitoring
 * - Log rotation
 * - Graceful shutdown handling
 * - Environment-specific configurations
 * 
 * Usage:
 *   Development: pm2 start ecosystem.config.cjs --env development
 *   Production:  pm2 start ecosystem.config.cjs --env production
 *   Staging:     pm2 start ecosystem.config.cjs --env staging
 * 
 * Commands:
 *   pm2 logs itfy-evoting-backend
 *   pm2 monit
 *   pm2 restart itfy-evoting-backend
 *   pm2 reload itfy-evoting-backend (zero-downtime restart)
 *   pm2 stop itfy-evoting-backend
 */

module.exports = {
  apps: [
    {
      // Application name
      name: "itfy-evoting-backend",
      
      // Entry point (use compiled JS in production)
      script: "./dist/app.js",
      
      // Cluster mode for production (use all available CPU cores)
      instances: process.env.PM2_INSTANCES || "max",
      exec_mode: "cluster",
      
      // Auto-restart configuration
      autorestart: true,
      watch: false, // Disable file watching in production
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 4000, // 4 seconds between restart attempts
      
      // Memory management
      max_memory_restart: process.env.PM2_MAX_MEMORY || "1G",
      
      // Graceful shutdown
      kill_timeout: 10000, // 10 seconds for graceful shutdown
      wait_ready: true, // Wait for process.send('ready')
      listen_timeout: 10000, // Time to wait for app to listen
      
      // Logging configuration
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true, // Add timestamp to logs
      merge_logs: true, // Merge logs from all instances
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      
      // Environment variables (default/production)
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        
        // Logging
        LOG_LEVEL: "info",
        LOG_DIR: "./logs",
        
        // Performance
        UV_THREADPOOL_SIZE: 16, // Increase threadpool for I/O operations
        
        // Node.js options
        NODE_OPTIONS: "--max-old-space-size=2048 --enable-source-maps",
      },
      
      // Development environment
      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
        LOG_LEVEL: "debug",
        watch: true,
        watch_delay: 1000,
        ignore_watch: ["node_modules", "logs", "uploads", ".git", "*.log"],
      },
      
      // Staging environment
      env_staging: {
        NODE_ENV: "staging",
        PORT: 3000,
        LOG_LEVEL: "debug",
        NODE_OPTIONS: "--max-old-space-size=1024 --enable-source-maps",
      },
      
      // Increment restart delay exponentially on repeated failures
      exp_backoff_restart_delay: 100,
      
      // Source map support for stack traces
      source_map_support: true,
    },
    
    // Separate process for background jobs (if needed)
    {
      name: "itfy-evoting-worker",
      script: "./dist/worker.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      error_file: "./logs/pm2-worker-error.log",
      out_file: "./logs/pm2-worker-out.log",
      
      // Only run in production
      env_production: {
        NODE_ENV: "production",
      },
      
      // Disable in development
      env_development: {
        PM2_DISABLE: true,
      },
    },
  ],
  
  // Deployment configuration
  deploy: {
    production: {
      user: process.env.DEPLOY_USER || "deploy",
      host: process.env.DEPLOY_HOST || "production.server.com",
      ref: "origin/main",
      repo: process.env.DEPLOY_REPO || "git@github.com:itfy/evoting-backend.git",
      path: "/var/www/itfy-evoting-backend",
      "pre-deploy-local": "",
      "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.cjs --env production",
      "pre-setup": "",
      env: {
        NODE_ENV: "production",
      },
    },
    
    staging: {
      user: process.env.DEPLOY_USER || "deploy",
      host: process.env.STAGING_HOST || "staging.server.com",
      ref: "origin/develop",
      repo: process.env.DEPLOY_REPO || "git@github.com:itfy/evoting-backend.git",
      path: "/var/www/itfy-evoting-staging",
      "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.cjs --env staging",
      env: {
        NODE_ENV: "staging",
      },
    },
  },
};
