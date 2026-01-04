/* eslint-disable no-undef */
/**
 * Cache Manager
 * Unified Redis + in-memory cache for tokens, rate limiting, sessions
 * Features:
 * - Robust Redis connection with retries and fallbacks
 * - In-memory cache for dev/test or Redis failures
 * - Standardized get/set/del/exists/incr methods
 * - TTL support and expiration management
 * - Health checks and graceful shutdown
 */

import Redis from "ioredis";

class CacheManager {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.inMemoryStore = new Map(); // Fallback for test/dev
    this.inMemoryTimers = new Map(); // To track TTL timers
    this.useInMemory =
      process.env.USE_IN_MEMORY_CACHE === "true" ||
      process.env.NODE_ENV === "test";
    this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    this.maxRetries = parseInt(process.env.REDIS_MAX_RETRIES, 10) || 5;
    this.retryDelay = parseInt(process.env.REDIS_RETRY_DELAY_MS, 10) || 2000;
    this.retryCount = 0;
  }

  /**
   * Connect to Redis with retry logic
   */
  async connect() {
    if (this.isConnected || this.useInMemory) {
      if (this.useInMemory) {
        console.log("Using in-memory cache (dev/test mode)");
      }
      return;
    }

    try {
      console.log(
        `Connecting to Redis: ${this.redisUrl.replace(/:[^:@]+@/, ":***@")}`
      );

      this.client = new Redis(this.redisUrl, {
        maxRetriesPerRequest: 3,
        connectTimeout: 10000,
        lazyConnect: true,
        retryStrategy: (times) => {
          if (times > this.maxRetries) return null;
          return Math.min(times * this.retryDelay, 10000);
        },
      });

      this.client.on("connect", () => {
        this.isConnected = true;
        this.retryCount = 0;
        console.log("Redis connected");
      });

      this.client.on("error", (err) => {
        console.error("Redis error:", err.message);
        this.isConnected = false;
      });

      this.client.on("close", () => {
        console.warn("Redis connection closed");
        this.isConnected = false;
      });

      this.client.on("reconnecting", () => {
        console.log("Redis reconnecting...");
      });

      await this.client.connect();
    } catch (error) {
      console.error("Redis connection failed:", error.message);
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => this.connect(), this.retryDelay);
      } else {
        console.warn("Redis failed. Falling back to in-memory cache.");
        this.useInMemory = true;
      }
    }
  }

  /**
   * Get value from cache
   * @param {string} key
   * @returns {Promise<string|null>}
   */
  async get(key) {
    try {
      if (this.useInMemory) {
        return this.inMemoryStore.get(key) || null;
      }
      return await this.client.get(key);
    } catch (error) {
      console.warn(`Cache GET failed (${key}):`, error.message);
      return this.inMemoryStore.get(key) || null;
    }
  }

  /**
   * Set value with TTL
   * @param {string} key
   * @param {string} value
   * @param {string} [mode='EX'] - 'EX' for seconds, 'PX' for milliseconds
   * @param {number} [ttlSeconds] - TTL in seconds (or ms if mode='PX')
   */
  async set(key, value, mode = "EX", ttlSeconds) {
    try {
      if (this.useInMemory) {
        this.inMemoryStore.set(key, String(value)); // ✅ FIX: Always store as string

        if (ttlSeconds) {
          this._setInMemoryTTL(key, ttlSeconds, mode);
        }
        return "OK";
      }

      if (ttlSeconds) {
        return await this.client.set(key, value, mode, ttlSeconds);
      } else {
        return await this.client.set(key, value);
      }
    } catch (error) {
      console.warn(`Cache SET failed (${key}):`, error.message);
      this.inMemoryStore.set(key, String(value));
      return null;
    }
  }

  /**
   * Delete key
   * @param {string} key
   * @returns {Promise<number>} Number of keys deleted
   */
  async del(key) {
    try {
      if (this.useInMemory) {
        const existed = this.inMemoryStore.has(key);
        this.inMemoryStore.delete(key);
        this._clearInMemoryTimer(key); // ✅ FIX: Clear timer to prevent leak
        return existed ? 1 : 0;
      }
      return await this.client.del(key);
    } catch (error) {
      console.warn(`Cache DEL failed (${key}):`, error.message);
      this.inMemoryStore.delete(key);
      this._clearInMemoryTimer(key);
      return 0;
    }
  }

  /**
   * Check if key exists
   * @param {string} key
   * @returns {Promise<number>} 1 if exists, 0 if not
   */
  async exists(key) {
    try {
      if (this.useInMemory) {
        return this.inMemoryStore.has(key) ? 1 : 0;
      }
      return await this.client.exists(key);
    } catch (error) {
      console.warn(`Cache EXISTS failed (${key}):`, error.message);
      return this.inMemoryStore.has(key) ? 1 : 0;
    }
  }

  /**
   * Increment counter (for rate limiting)
   * @param {string} key
   * @returns {Promise<number>}
   */
  async incr(key) {
    try {
      if (this.useInMemory) {
        const current = this.inMemoryStore.get(key);
        const value = current ? parseInt(current, 10) + 1 : 1;
        this.inMemoryStore.set(key, String(value));
        return value;
      }
      return await this.client.incr(key);
    } catch (error) {
      console.warn(`Cache INCR failed (${key}):`, error.message);
      const current = this.inMemoryStore.get(key);
      const value = current ? parseInt(current, 10) + 1 : 1;
      this.inMemoryStore.set(key, String(value));
      return value;
    }
  }

  /**
   * Decrement counter (for rate limiting with skipSuccessfulRequests)
   * @param {string} key
   * @returns {Promise<number>}
   */
  async decr(key) {
    try {
      if (this.useInMemory) {
        const current = this.inMemoryStore.get(key);
        const value = current ? Math.max(0, parseInt(current, 10) - 1) : 0;
        this.inMemoryStore.set(key, String(value));
        return value;
      }
      return await this.client.decr(key);
    } catch (error) {
      console.warn(`Cache DECR failed (${key}):`, error.message);
      const current = this.inMemoryStore.get(key);
      const value = current ? Math.max(0, parseInt(current, 10) - 1) : 0;
      this.inMemoryStore.set(key, String(value));
      return value;
    }
  }

  /**
   * Increment by specific amount
   * @param {string} key
   * @param {number} amount
   * @returns {Promise<number>}
   */
  async incrBy(key, amount) {
    try {
      if (this.useInMemory) {
        const current = this.inMemoryStore.get(key);
        const value = (current ? parseInt(current, 10) : 0) + amount;
        this.inMemoryStore.set(key, String(value));
        return value;
      }
      return await this.client.incrby(key, amount);
    } catch (error) {
      console.warn(`Cache INCRBY failed (${key}):`, error.message);
      const current = this.inMemoryStore.get(key);
      const value = (current ? parseInt(current, 10) : 0) + amount;
      this.inMemoryStore.set(key, String(value));
      return value;
    }
  }

  /**
   * Set expiration on existing key
   * @param {string} key
   * @param {number} seconds
   * @returns {Promise<number>} 1 if timeout was set, 0 if key doesn't exist
   */
  async expire(key, seconds) {
    try {
      if (this.useInMemory) {
        if (!this.inMemoryStore.has(key)) {
          return 0;
        }
        this._setInMemoryTTL(key, seconds, "EX");
        return 1;
      }
      return await this.client.expire(key, seconds);
    } catch (error) {
      console.warn(`Cache EXPIRE failed (${key}):`, error.message);
      return 0;
    }
  }

  /**
   * Get remaining TTL
   * @param {string} key
   * @returns {Promise<number>} TTL in seconds, -1 if no expiry, -2 if key doesn't exist
   */
  async ttl(key) {
    try {
      if (this.useInMemory) {
        if (!this.inMemoryStore.has(key)) {
          return -2;
        }
        // In-memory doesn't track TTL accurately, return -1 (no expiry)
        return -1;
      }
      return await this.client.ttl(key);
    } catch (error) {
      console.warn(`Cache TTL failed (${key}):`, error.message);
      return -2;
    }
  }

  /**
   * Get multiple keys at once
   * @param {string[]} keys
   * @returns {Promise<(string|null)[]>}
   */
  async mget(...keys) {
    try {
      if (this.useInMemory) {
        return keys.map((key) => this.inMemoryStore.get(key) || null);
      }
      return await this.client.mget(...keys);
    } catch (error) {
      console.warn(`Cache MGET failed:`, error.message);
      return keys.map((key) => this.inMemoryStore.get(key) || null);
    }
  }

  /**
   * Set multiple keys at once
   * @param {Object} keyValuePairs - { key1: value1, key2: value2 }
   * @returns {Promise<string>}
   */
  async mset(keyValuePairs) {
    try {
      if (this.useInMemory) {
        Object.entries(keyValuePairs).forEach(([key, value]) => {
          this.inMemoryStore.set(key, String(value));
        });
        return "OK";
      }

      const args = [];
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        args.push(key, value);
      });
      return await this.client.mset(...args);
    } catch (error) {
      console.warn(`Cache MSET failed:`, error.message);
      return null;
    }
  }

  /**
   * Delete multiple keys
   * @param {string[]} keys
   * @returns {Promise<number>} Number of keys deleted
   */
  async mdel(...keys) {
    try {
      if (this.useInMemory) {
        let count = 0;
        keys.forEach((key) => {
          if (this.inMemoryStore.has(key)) {
            this.inMemoryStore.delete(key);
            this._clearInMemoryTimer(key);
            count++;
          }
        });
        return count;
      }
      return await this.client.del(...keys);
    } catch (error) {
      console.warn(`Cache MDEL failed:`, error.message);
      return 0;
    }
  }

  /**
   * Health check
   * @returns {Promise<{ status: string, store: string, keys?: number }>}
   */
  async health() {
    try {
      if (this.useInMemory) {
        return {
          status: "healthy",
          store: "in-memory",
          keys: this.inMemoryStore.size,
        };
      }
      await this.client.ping();
      const info = await this.client.info("stats");
      const keysMatch = info.match(/keys=(\d+)/);
      return {
        status: "healthy",
        store: "redis",
        keys: keysMatch ? parseInt(keysMatch[1]) : undefined,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        store: this.useInMemory ? "in-memory" : "redis",
        error: error.message,
      };
    }
  }

  /**
   * Delete keys matching a pattern (wildcard support)
   * @param {string} pattern - Pattern with wildcards (e.g., 'user:*', 'event:123:*')
   * @returns {Promise<number>} Number of keys deleted
   */
  async deletePattern(pattern) {
    try {
      if (this.useInMemory) {
        // Convert glob pattern to regex
        const regex = new RegExp(
          "^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$"
        );
        
        let count = 0;
        for (const key of this.inMemoryStore.keys()) {
          if (regex.test(key)) {
            this.inMemoryStore.delete(key);
            this._clearInMemoryTimer(key);
            count++;
          }
        }
        return count;
      }

      // Redis SCAN for pattern matching (more efficient than KEYS)
      let cursor = "0";
      let deletedCount = 0;
      
      do {
        const [newCursor, keys] = await this.client.scan(
          cursor,
          "MATCH",
          pattern,
          "COUNT",
          100
        );
        cursor = newCursor;

        if (keys.length > 0) {
          deletedCount += await this.client.del(...keys);
        }
      } while (cursor !== "0");

      return deletedCount;
    } catch (error) {
      console.warn(`Pattern deletion failed (${pattern}):`, error.message);
      return 0;
    }
  }

  /**
   * Get keys matching a pattern
   * @param {string} pattern - Pattern with wildcards
   * @returns {Promise<string[]>} Matching keys
   */
  async getKeys(pattern) {
    try {
      if (this.useInMemory) {
        const regex = new RegExp(
          "^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$"
        );
        return Array.from(this.inMemoryStore.keys()).filter(key =>
          regex.test(key)
        );
      }

      const keys = [];
      let cursor = "0";
      
      do {
        const [newCursor, matchedKeys] = await this.client.scan(
          cursor,
          "MATCH",
          pattern,
          "COUNT",
          100
        );
        cursor = newCursor;
        keys.push(...matchedKeys);
      } while (cursor !== "0");

      return keys;
    } catch (error) {
      console.warn(`Get keys failed (${pattern}):`, error.message);
      return [];
    }
  }

  /**
   * Flush all (use with caution)
   */
  async flush() {
    try {
      if (this.useInMemory) {
        this.inMemoryStore.clear();
        // Clear all timers to prevent memory leaks
        this.inMemoryTimers.forEach((timer) => clearTimeout(timer));
        this.inMemoryTimers.clear();
        return "OK";
      }
      await this.client.flushall();
      return "OK";
    } catch (error) {
      console.error("Cache flush failed:", error.message);
      return null;
    }
  }

  /**
   * Graceful shutdown
   */
  async disconnect() {
    if (this.client && !this.useInMemory) {
      await this.client.quit();
      console.log("Redis disconnected");
    }

    // Clear all in-memory timers
    if (this.useInMemory) {
      this.inMemoryTimers.forEach((timer) => clearTimeout(timer));
      this.inMemoryTimers.clear();
      this.inMemoryStore.clear();
    }

    this.isConnected = false;
  }

  // ================================
  // PRIVATE HELPERS
  // ================================

  /**
   * Set TTL for in-memory key (prevents memory leaks)
   * @param {string} key
   * @param {number} ttl
   * @param {string} mode - 'EX' (seconds) or 'PX' (milliseconds)
   * @private
   */
  _setInMemoryTTL(key, ttl, mode = "EX") {
    // Clear existing timer to prevent leaks
    this._clearInMemoryTimer(key);

    const ms = mode === "PX" ? ttl : ttl * 1000;
    const timer = setTimeout(() => {
      this.inMemoryStore.delete(key);
      this.inMemoryTimers.delete(key);
    }, ms);

    this.inMemoryTimers.set(key, timer);
  }

  /**
   * Clear TTL timer for key
   * @param {string} key
   * @private
   */
  _clearInMemoryTimer(key) {
    const timer = this.inMemoryTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.inMemoryTimers.delete(key);
    }
  }
}

// Export singleton
export const cache = new CacheManager();
export default cache;
