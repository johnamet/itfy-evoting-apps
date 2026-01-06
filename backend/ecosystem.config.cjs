/**
 * PM2 Ecosystem Configuration
 * ITFY E-Voting Backend
 */

module.exports = {
  apps: [
    {
      name: "itfy-evoting-backend",

      // IMPORTANT: path is relative to cwd
      script: "dist/app.js",

      // Run inside backend directory
      cwd: "/var/www/itfy-evoting-apps/backend",

      // Single instance (safe for Express)
      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,

      max_restarts: 10,
      restart_delay: 3000,
      min_uptime: "10s",

      max_memory_restart: "1G",

      // Logs (make sure backend/logs exists)
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      log_file: "logs/pm2-combined.log",
      time: true,

      env: {
        NODE_ENV: "production",
        PORT: 3000,
        LOG_LEVEL: "info",
      },

      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
        LOG_LEVEL: "debug",
      },

      env_staging: {
        NODE_ENV: "staging",
        PORT: 3000,
        LOG_LEVEL: "debug",
      },
    },
  ],
};
