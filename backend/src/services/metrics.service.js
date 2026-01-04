/**
 * Prometheus Metrics Service
 * Exposes application metrics for monitoring:
 * - HTTP request metrics (duration, count, status codes)
 * - System metrics (CPU, memory, event loop lag)
 * - Application-specific metrics (votes, payments, etc.)
 * - Custom business metrics
 */

import os from "os";
import v8 from "v8";

/**
 * Metrics collector class
 * Lightweight implementation without external dependencies
 * Compatible with Prometheus text format
 */
class MetricsCollector {
  constructor() {
    this.metrics = new Map();
    this.startTime = Date.now();

    // Initialize default metrics
    this.initializeDefaultMetrics();
  }

  /**
   * Initialize default system and application metrics
   */
  initializeDefaultMetrics() {
    // HTTP request counter
    this.createCounter("http_requests_total", "Total HTTP requests", ["method", "path", "status"]);

    // HTTP request duration histogram
    this.createHistogram("http_request_duration_seconds", "HTTP request duration in seconds", ["method", "path"], [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]);

    // Active connections gauge
    this.createGauge("http_active_connections", "Number of active HTTP connections");

    // Application-specific counters
    this.createCounter("votes_cast_total", "Total votes cast", ["event_id"]);
    this.createCounter("payments_processed_total", "Total payments processed", ["status"]);
    this.createCounter("auth_attempts_total", "Authentication attempts", ["type", "status"]);
    this.createCounter("emails_sent_total", "Total emails sent", ["template"]);

    // Error counters
    this.createCounter("errors_total", "Total errors", ["type", "code"]);
  }

  /**
   * Create a counter metric
   */
  createCounter(name, help, labels = []) {
    this.metrics.set(name, {
      type: "counter",
      help,
      labels,
      values: new Map(),
    });
  }

  /**
   * Create a gauge metric
   */
  createGauge(name, help, labels = []) {
    this.metrics.set(name, {
      type: "gauge",
      help,
      labels,
      values: new Map(),
    });
  }

  /**
   * Create a histogram metric
   */
  createHistogram(name, help, labels = [], buckets = [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]) {
    this.metrics.set(name, {
      type: "histogram",
      help,
      labels,
      buckets,
      values: new Map(),
    });
  }

  /**
   * Generate label key from labels object
   */
  labelKey(labels) {
    if (!labels || Object.keys(labels).length === 0) return "";
    return Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}="${v}"`)
      .join(",");
  }

  /**
   * Increment a counter
   */
  incCounter(name, labels = {}, value = 1) {
    const metric = this.metrics.get(name);
    if (!metric || metric.type !== "counter") return;

    const key = this.labelKey(labels);
    const current = metric.values.get(key) || 0;
    metric.values.set(key, current + value);
  }

  /**
   * Set a gauge value
   */
  setGauge(name, value, labels = {}) {
    const metric = this.metrics.get(name);
    if (!metric || metric.type !== "gauge") return;

    const key = this.labelKey(labels);
    metric.values.set(key, value);
  }

  /**
   * Observe a histogram value
   */
  observeHistogram(name, value, labels = {}) {
    const metric = this.metrics.get(name);
    if (!metric || metric.type !== "histogram") return;

    const key = this.labelKey(labels);
    let histogram = metric.values.get(key);

    if (!histogram) {
      histogram = {
        buckets: metric.buckets.reduce((acc, b) => ({ ...acc, [b]: 0 }), {}),
        sum: 0,
        count: 0,
      };
      metric.values.set(key, histogram);
    }

    // Update bucket counts
    for (const bucket of metric.buckets) {
      if (value <= bucket) {
        histogram.buckets[bucket]++;
      }
    }

    histogram.sum += value;
    histogram.count++;
  }

  /**
   * Get current system metrics
   */
  getSystemMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const uptime = process.uptime();

    return {
      // Process memory
      process_memory_heap_used_bytes: memUsage.heapUsed,
      process_memory_heap_total_bytes: memUsage.heapTotal,
      process_memory_external_bytes: memUsage.external,
      process_memory_rss_bytes: memUsage.rss,

      // V8 heap stats
      ...this.getV8HeapStats(),

      // CPU
      process_cpu_user_seconds_total: cpuUsage.user / 1e6,
      process_cpu_system_seconds_total: cpuUsage.system / 1e6,

      // Uptime
      process_uptime_seconds: uptime,
      process_start_time_seconds: (Date.now() - uptime * 1000) / 1000,

      // System
      nodejs_version_info: { version: process.version, major: parseInt(process.version.slice(1)) },
      os_cpu_count: os.cpus().length,
      os_memory_total_bytes: os.totalmem(),
      os_memory_free_bytes: os.freemem(),
      os_load_average: os.loadavg(),
    };
  }

  /**
   * Get V8 heap statistics
   */
  getV8HeapStats() {
    const heapStats = v8.getHeapStatistics();
    return {
      nodejs_heap_size_total_bytes: heapStats.total_heap_size,
      nodejs_heap_size_used_bytes: heapStats.used_heap_size,
      nodejs_heap_size_limit_bytes: heapStats.heap_size_limit,
      nodejs_external_memory_bytes: heapStats.external_memory,
    };
  }

  /**
   * Format metrics in Prometheus text format
   */
  formatPrometheus() {
    const lines = [];

    // Add system metrics
    const systemMetrics = this.getSystemMetrics();
    for (const [name, value] of Object.entries(systemMetrics)) {
      if (typeof value === "number") {
        lines.push(`# TYPE ${name} gauge`);
        lines.push(`${name} ${value}`);
      }
    }

    // Add custom metrics
    for (const [name, metric] of this.metrics) {
      lines.push(`# HELP ${name} ${metric.help}`);
      lines.push(`# TYPE ${name} ${metric.type}`);

      if (metric.type === "histogram") {
        for (const [labelKey, histogram] of metric.values) {
          const labels = labelKey ? `{${labelKey}}` : "";
          for (const [bucket, count] of Object.entries(histogram.buckets)) {
            const bucketLabel = labelKey ? `${labelKey},le="${bucket}"` : `le="${bucket}"`;
            lines.push(`${name}_bucket{${bucketLabel}} ${count}`);
          }
          const infLabel = labelKey ? `${labelKey},le="+Inf"` : `le="+Inf"`;
          lines.push(`${name}_bucket{${infLabel}} ${histogram.count}`);
          lines.push(`${name}_sum${labels} ${histogram.sum}`);
          lines.push(`${name}_count${labels} ${histogram.count}`);
        }
      } else {
        for (const [labelKey, value] of metric.values) {
          const labels = labelKey ? `{${labelKey}}` : "";
          lines.push(`${name}${labels} ${value}`);
        }
      }
    }

    return lines.join("\n");
  }

  /**
   * Get metrics as JSON
   */
  toJSON() {
    const result = {
      system: this.getSystemMetrics(),
      application: {},
    };

    for (const [name, metric] of this.metrics) {
      result.application[name] = {
        type: metric.type,
        help: metric.help,
        values: Object.fromEntries(metric.values),
      };
    }

    return result;
  }
}

// Singleton instance
const metricsCollector = new MetricsCollector();

/**
 * Metrics middleware - records HTTP request metrics
 */
export const metricsMiddleware = (req, res, next) => {
  const startTime = process.hrtime.bigint();

  // Track active connections
  metricsCollector.setGauge("http_active_connections", 
    (metricsCollector.metrics.get("http_active_connections")?.values.get("") || 0) + 1
  );

  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - startTime) / 1e9; // Convert to seconds

    // Normalize path to prevent high cardinality
    const normalizedPath = normalizePath(req.route?.path || req.path);

    // Record request count
    metricsCollector.incCounter("http_requests_total", {
      method: req.method,
      path: normalizedPath,
      status: res.statusCode.toString(),
    });

    // Record duration
    metricsCollector.observeHistogram("http_request_duration_seconds", duration, {
      method: req.method,
      path: normalizedPath,
    });

    // Decrement active connections
    metricsCollector.setGauge("http_active_connections",
      Math.max(0, (metricsCollector.metrics.get("http_active_connections")?.values.get("") || 1) - 1)
    );
  });

  next();
};

/**
 * Normalize path to prevent high cardinality metrics
 */
const normalizePath = (path) => {
  if (!path) return "unknown";
  
  // Replace IDs with placeholders
  return path
    .replace(/\/[0-9a-fA-F]{24}/g, "/:id") // MongoDB ObjectIDs
    .replace(/\/\d+/g, "/:id") // Numeric IDs
    .replace(/\/[0-9a-f-]{36}/g, "/:uuid"); // UUIDs
};

/**
 * Metrics endpoint handler
 */
export const metricsHandler = (req, res) => {
  const format = req.query.format || "prometheus";

  if (format === "json") {
    res.json(metricsCollector.toJSON());
  } else {
    res.setHeader("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
    res.send(metricsCollector.formatPrometheus());
  }
};

/**
 * Record a vote metric
 */
export const recordVote = (eventId) => {
  metricsCollector.incCounter("votes_cast_total", { event_id: eventId });
};

/**
 * Record a payment metric
 */
export const recordPayment = (status) => {
  metricsCollector.incCounter("payments_processed_total", { status });
};

/**
 * Record an authentication attempt
 */
export const recordAuthAttempt = (type, success) => {
  metricsCollector.incCounter("auth_attempts_total", {
    type,
    status: success ? "success" : "failure",
  });
};

/**
 * Record an email sent
 */
export const recordEmailSent = (template) => {
  metricsCollector.incCounter("emails_sent_total", { template });
};

/**
 * Record an error
 */
export const recordError = (type, code = "unknown") => {
  metricsCollector.incCounter("errors_total", { type, code });
};

export { metricsCollector };
export default {
  metricsMiddleware,
  metricsHandler,
  metricsCollector,
  recordVote,
  recordPayment,
  recordAuthAttempt,
  recordEmailSent,
  recordError,
};
