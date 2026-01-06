/**
 * Cache-Aside (Read-Through) Utilities
 * Smart caching pattern for database reads
 * 
 * Features:
 * - Automatic cache-aside pattern with TTL
 * - JSON serialization/deserialization
 * - Cache stampede prevention with locking
 * - Graceful fallback on cache failures
 * - Skip cache option for fresh data
 */

import cache from "./cache.utils.js";
import { CacheKeyGenerator } from "./cache-invalidation.utils.js";
import { CACHE_TTL, ENTITY_TTL, CACHE_FLAGS } from "../constants/cache.constants.js";

/**
 * Execute a function with cache-aside pattern
 * Checks cache first, fetches from source if miss, then caches result
 * 
 * @param {string} cacheKey - Cache key for this data
 * @param {Function} fetchFn - Async function to fetch data on cache miss
 * @param {Object} options - Cache options
 * @param {number} options.ttl - TTL in seconds (default: 900 = 15 min)
 * @param {boolean} options.skipCache - Skip cache, always fetch fresh
 * @param {boolean} options.forceRefresh - Force refresh cache even if exists
 * @param {boolean} options.cacheNull - Whether to cache null/empty results (default: false)
 * @returns {Promise<any>} - Cached or freshly fetched data
 */
export async function withCache(cacheKey, fetchFn, options = {}) {
  const {
    ttl = CACHE_TTL.MEDIUM,
    skipCache = false,
    forceRefresh = false,
    cacheNull = false,
  } = options;

  // Skip cache entirely if requested
  if (skipCache) {
    return fetchFn();
  }

  try {
    // Try to get from cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = await cache.get(cacheKey);
      if (cached !== null) {
        try {
          const parsed = JSON.parse(cached);
          // Add cache metadata
          if (typeof parsed === "object" && parsed !== null) {
            parsed._fromCache = true;
            parsed._cachedAt = parsed._cachedAt || new Date().toISOString();
          }
          return parsed;
        } catch {
          // If parse fails, return raw value
          return cached;
        }
      }
    }

    // Cache miss or force refresh - fetch from source
    const data = await fetchFn();

    // Don't cache null/undefined unless explicitly requested
    if (data === null || data === undefined) {
      if (cacheNull) {
        await cache.set(cacheKey, JSON.stringify(null), "EX", Math.min(ttl, 60));
      }
      return data;
    }

    // Add cache timestamp
    const toCache = typeof data === "object" && data !== null
      ? { ...data, _cachedAt: new Date().toISOString() }
      : data;

    // Store in cache
    await cache.set(cacheKey, JSON.stringify(toCache), "EX", ttl);

    return data;
  } catch (error) {
    // On cache error, fall back to direct fetch
    console.warn(`Cache-aside failed for ${cacheKey}:`, error.message);
    return fetchFn();
  }
}

/**
 * Cache wrapper with stampede prevention using lock
 * Prevents multiple simultaneous fetches for the same key
 * 
 * @param {string} cacheKey - Cache key
 * @param {Function} fetchFn - Fetch function
 * @param {Object} options - Cache options
 * @returns {Promise<any>}
 */
export async function withCacheLock(cacheKey, fetchFn, options = {}) {
  const { ttl = CACHE_TTL.MEDIUM, lockTimeout = 5 } = options;
  const lockKey = `lock:${cacheKey}`;

  try {
    // Try to get from cache first
    const cached = await cache.get(cacheKey);
    if (cached !== null) {
      try {
        return JSON.parse(cached);
      } catch {
        return cached;
      }
    }

    // Try to acquire lock (NX = only if not exists)
    const lockAcquired = await cache.set(lockKey, "1", "EX", lockTimeout, "NX");

    if (lockAcquired === "OK" || lockAcquired === true) {
      try {
        // We have the lock - fetch and cache
        const data = await fetchFn();
        
        if (data !== null && data !== undefined) {
          await cache.set(cacheKey, JSON.stringify(data), "EX", ttl);
        }

        return data;
      } finally {
        // Release lock
        await cache.del(lockKey);
      }
    } else {
      // Another process is fetching - wait and retry cache
      await new Promise(resolve => setTimeout(resolve, 100));
      const cached = await cache.get(cacheKey);
      if (cached !== null) {
        try {
          return JSON.parse(cached);
        } catch {
          return cached;
        }
      }
      // Still no cache - fetch directly (rare edge case)
      return fetchFn();
    }
  } catch (error) {
    console.warn(`Cache lock failed for ${cacheKey}:`, error.message);
    return fetchFn();
  }
}

/**
 * Entity-specific cache helpers
 */
export const EntityCache = {
  /**
   * Get or fetch entity by ID
   * @param {string} entityType - Entity type (user, event, candidate, etc.)
   * @param {string} id - Entity ID
   * @param {Function} fetchFn - Fetch function
   * @param {Object} options - Cache options
   */
  async getById(entityType, id, fetchFn, options = {}) {
    const ttl = ENTITY_TTL[entityType]?.details || CACHE_TTL.MEDIUM;
    const cacheKey = CacheKeyGenerator.entity(entityType, id);
    return withCache(cacheKey, fetchFn, { ttl, ...options });
  },

  /**
   * Get or fetch entity with suffix
   * @param {string} entityType - Entity type
   * @param {string} id - Entity ID
   * @param {string} suffix - Cache key suffix (stats, details, etc.)
   * @param {Function} fetchFn - Fetch function
   * @param {Object} options - Cache options
   */
  async getWithSuffix(entityType, id, suffix, fetchFn, options = {}) {
    const ttlMap = ENTITY_TTL[entityType] || {};
    const ttl = ttlMap[suffix] || CACHE_TTL.MEDIUM;
    const cacheKey = CacheKeyGenerator.entity(entityType, id, suffix);
    return withCache(cacheKey, fetchFn, { ttl, ...options });
  },

  /**
   * Get or fetch list with filters
   * @param {string} entityType - Entity type
   * @param {Object} filters - Query filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Function} fetchFn - Fetch function
   * @param {Object} options - Cache options
   */
  async getList(entityType, filters, page, limit, fetchFn, options = {}) {
    const ttl = ENTITY_TTL[entityType]?.list || CACHE_TTL.STANDARD;
    const cacheKey = CacheKeyGenerator.list(entityType, filters, page, limit);
    return withCache(cacheKey, fetchFn, { ttl, ...options });
  },

  /**
   * Get or fetch aggregation/stats
   * @param {string} entityType - Entity type
   * @param {string} operation - Operation (stats, count, dashboard)
   * @param {Object} params - Operation parameters
   * @param {Function} fetchFn - Fetch function
   * @param {Object} options - Cache options
   */
  async getAggregation(entityType, operation, params, fetchFn, options = {}) {
    const ttlMap = ENTITY_TTL[entityType] || {};
    const ttl = ttlMap[operation] || ttlMap.stats || CACHE_TTL.LONG;
    const cacheKey = CacheKeyGenerator.aggregation(entityType, operation, params);
    return withCache(cacheKey, fetchFn, { ttl, ...options });
  },

  /**
   * Get or fetch relationship data
   * @param {string} parent - Parent entity type
   * @param {string} parentId - Parent ID
   * @param {string} child - Child entity type
   * @param {Object} filters - Additional filters
   * @param {Function} fetchFn - Fetch function
   * @param {Object} options - Cache options
   */
  async getRelationship(parent, parentId, child, filters, fetchFn, options = {}) {
    const ttl = CACHE_TTL.STANDARD;
    const cacheKey = CacheKeyGenerator.relationship(parent, parentId, child, filters);
    return withCache(cacheKey, fetchFn, { ttl, ...options });
  },
};

/**
 * Helper to check cache options from request
 * @param {Object} options - Request options or query params
 * @returns {Object} - Processed cache options
 */
export function getCacheOptions(options = {}) {
  return {
    skipCache: options[CACHE_FLAGS.SKIP_CACHE] === true || options.skipCache === true,
    forceRefresh: options[CACHE_FLAGS.FORCE_REFRESH] === true || options.forceRefresh === true,
  };
}

/**
 * Decorator-style function to wrap a service method with caching
 * @param {string} entityType - Entity type for cache key
 * @param {string} keyType - Key type: 'entity', 'list', 'aggregation'
 * @param {Function} keyExtractor - Function to extract cache key params from method args
 * @param {Object} options - Cache options
 * @returns {Function} - Wrapper function
 */
export function cached(entityType, keyType, keyExtractor, options = {}) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args) {
      const keyParams = keyExtractor(...args);
      const cacheOpts = getCacheOptions(args[args.length - 1] || {});

      let cacheKey;
      let ttl;

      switch (keyType) {
        case "entity":
          cacheKey = CacheKeyGenerator.entity(entityType, keyParams.id, keyParams.suffix);
          ttl = ENTITY_TTL[entityType]?.details || CACHE_TTL.MEDIUM;
          break;
        case "list":
          cacheKey = CacheKeyGenerator.list(entityType, keyParams.filters, keyParams.page, keyParams.limit);
          ttl = ENTITY_TTL[entityType]?.list || CACHE_TTL.STANDARD;
          break;
        case "aggregation":
          cacheKey = CacheKeyGenerator.aggregation(entityType, keyParams.operation, keyParams.params);
          ttl = ENTITY_TTL[entityType]?.stats || CACHE_TTL.LONG;
          break;
        default:
          return originalMethod.apply(this, args);
      }

      return withCache(
        cacheKey,
        () => originalMethod.apply(this, args),
        { ttl, ...options, ...cacheOpts }
      );
    };

    return descriptor;
  };
}

export default {
  withCache,
  withCacheLock,
  EntityCache,
  getCacheOptions,
  cached,
};
