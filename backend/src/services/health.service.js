/**
 * System Health Service
 * Provides comprehensive health monitoring and status reporting
 * for the e-voting platform's backend services
 */

import mongoose from "mongoose";
import { cache } from "../utils/cache/cache.utils.js";
import { agendaManager } from "./agenda.service.js";
import os from "os";

class HealthService {
  constructor() {
    this.startTime = Date.now();
  }

  /**
   * Get comprehensive system health status
   * @returns {Promise<Object>} Health status with scores
   */
  async getSystemHealth() {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkCache(),
      this.checkAgenda(),
      this.getSystemMetrics(),
    ]);

    const [dbCheck, cacheCheck, agendaCheck, systemMetrics] = checks.map(
      (result) => (result.status === "fulfilled" ? result.value : { status: "error", error: result.reason?.message })
    );

    // Calculate health score (each service contributes to the score)
    const healthScore = this.calculateHealthScore({
      database: dbCheck,
      cache: cacheCheck,
      agenda: agendaCheck,
      system: systemMetrics,
    });

    return {
      status: healthScore >= 80 ? "healthy" : healthScore >= 50 ? "degraded" : "unhealthy",
      score: healthScore,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      services: {
        database: dbCheck,
        cache: cacheCheck,
        agenda: agendaCheck,
      },
      system: systemMetrics,
    };
  }

  /**
   * Check database connectivity and performance
   * @returns {Promise<Object>}
   */
  async checkDatabase() {
    try {
      const startTime = Date.now();
      const state = mongoose.connection.readyState;
      
      // State: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      const stateMap = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
      };

      if (state !== 1) {
        return {
          status: "unhealthy",
          state: stateMap[state] || "unknown",
          responseTime: Date.now() - startTime,
        };
      }

      // Ping the database to check response time
      await mongoose.connection.db.admin().ping();
      const responseTime = Date.now() - startTime;

      // Get database stats
      const stats = await mongoose.connection.db.stats();

      return {
        status: responseTime < 100 ? "healthy" : responseTime < 500 ? "degraded" : "slow",
        state: "connected",
        responseTime,
        collections: stats.collections || 0,
        objects: stats.objects || 0,
        dataSize: this.formatBytes(stats.dataSize || 0),
        indexSize: this.formatBytes(stats.indexSize || 0),
      };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error.message,
      };
    }
  }

  /**
   * Check cache (Redis or in-memory) status
   * @returns {Promise<Object>}
   */
  async checkCache() {
    try {
      if (!cache) {
        return {
          status: "unavailable",
          store: "none",
        };
      }

      const health = await cache.health();
      return {
        status: health.status,
        store: health.store,
        keys: health.keys || 0,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error.message,
      };
    }
  }

  /**
   * Check Agenda job queue status
   * @returns {Promise<Object>}
   */
  async checkAgenda() {
    try {
      const status = agendaManager.getStatus();
      
      // Get pending and running jobs count if agenda is ready
      let jobStats = { pending: 0, running: 0, failed: 0 };
      
      if (status.isReady && agendaManager.agenda) {
        try {
          const jobs = await agendaManager.agenda.jobs({});
          jobStats.total = jobs.length;
          jobStats.pending = jobs.filter(j => !j.attrs.lastRunAt && !j.attrs.lockedAt).length;
          jobStats.running = jobs.filter(j => j.attrs.lockedAt && !j.attrs.lastFinishedAt).length;
          jobStats.failed = jobs.filter(j => j.attrs.failCount > 0).length;
        } catch {
          // Silently handle if jobs query fails
        }
      }

      return {
        status: status.isReady ? "healthy" : "initializing",
        uptime: status.uptime,
        startTime: status.startTime,
        jobs: jobStats,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error.message,
      };
    }
  }

  /**
   * Get system resource metrics
   * @returns {Object}
   */
  getSystemMetrics() {
    try {
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const usedMem = totalMem - freeMem;
      const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(1);

      const cpuUsage = os.loadavg();
      const cpuCount = os.cpus().length;

      // Process memory usage
      const processMemory = process.memoryUsage();

      return {
        status: memUsagePercent < 80 ? "healthy" : memUsagePercent < 90 ? "degraded" : "critical",
        memory: {
          total: this.formatBytes(totalMem),
          free: this.formatBytes(freeMem),
          used: this.formatBytes(usedMem),
          usagePercent: parseFloat(memUsagePercent),
        },
        cpu: {
          cores: cpuCount,
          loadAvg: {
            "1min": cpuUsage[0]?.toFixed(2) || 0,
            "5min": cpuUsage[1]?.toFixed(2) || 0,
            "15min": cpuUsage[2]?.toFixed(2) || 0,
          },
        },
        process: {
          memory: {
            heapUsed: this.formatBytes(processMemory.heapUsed),
            heapTotal: this.formatBytes(processMemory.heapTotal),
            rss: this.formatBytes(processMemory.rss),
            external: this.formatBytes(processMemory.external),
          },
          pid: process.pid,
          uptime: Math.floor(process.uptime()),
        },
        platform: os.platform(),
        nodeVersion: process.version,
      };
    } catch (error) {
      return {
        status: "unknown",
        error: error.message,
      };
    }
  }

  /**
   * Calculate overall health score (0-100)
   * @param {Object} services - Service health checks
   * @returns {number}
   */
  calculateHealthScore(services) {
    const weights = {
      database: 40, // Database is critical
      cache: 20,    // Cache is important but not critical
      agenda: 20,   // Job queue is important
      system: 20,   // System resources
    };

    let score = 0;

    // Database score
    if (services.database?.status === "healthy") {
      score += weights.database;
    } else if (services.database?.status === "degraded" || services.database?.status === "slow") {
      score += weights.database * 0.7;
    } else if (services.database?.state === "connected") {
      score += weights.database * 0.5;
    }

    // Cache score
    if (services.cache?.status === "healthy") {
      score += weights.cache;
    } else if (services.cache?.status === "unavailable") {
      // No cache is still acceptable
      score += weights.cache * 0.5;
    }

    // Agenda score
    if (services.agenda?.status === "healthy") {
      score += weights.agenda;
    } else if (services.agenda?.status === "initializing") {
      score += weights.agenda * 0.7;
    }

    // System score
    if (services.system?.status === "healthy") {
      score += weights.system;
    } else if (services.system?.status === "degraded") {
      score += weights.system * 0.7;
    } else if (services.system?.status === "critical") {
      score += weights.system * 0.3;
    }

    return Math.round(score);
  }

  /**
   * Format bytes to human-readable string
   * @param {number} bytes
   * @returns {string}
   */
  formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * Get quick health status (for simple health checks)
   * @returns {Promise<Object>}
   */
  async getQuickHealth() {
    const dbState = mongoose.connection.readyState === 1;
    const agendaState = agendaManager.getStatus().isReady;

    return {
      status: dbState ? "ok" : "error",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      services: {
        database: dbState ? "connected" : "disconnected",
        cache: cache ? "connected" : "disconnected",
        agenda: agendaState ? "ready" : "initializing",
      },
    };
  }
}

// Export singleton instance
export const healthService = new HealthService();
export default healthService;
