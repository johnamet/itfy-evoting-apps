/**
 * Cache Invalidation Utilities
 * Smart cache key generation and invalidation patterns
 * Features:
 * - Standardized cache key naming conventions
 * - Entity-based cache invalidation
 * - Relationship-aware cache clearing
 * - Pattern-based bulk invalidation
 */

import cache from "./cache.utils.js";

/**
 * Cache Key Generator
 * Creates standardized cache keys for consistent management
 */
class CacheKeyGenerator {
  /**
   * Generate entity cache key
   * @param {string} entity - Entity type (e.g., 'user', 'event', 'candidate')
   * @param {string} id - Entity ID
   * @param {string} [suffix] - Optional suffix (e.g., 'profile', 'votes')
   * @returns {string} Cache key
   */
  static entity(entity, id, suffix = null) {
    return suffix ? `${entity}:${id}:${suffix}` : `${entity}:${id}`;
  }

  /**
   * Generate list cache key with filters
   * @param {string} entity - Entity type
   * @param {Object} filters - Query filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {string} Cache key
   */
  static list(entity, filters = {}, page = 1, limit = 10) {
    const filterHash = this._hashFilters(filters);
    return `${entity}:list:${filterHash}:p${page}:l${limit}`;
  }

  /**
   * Generate aggregation/stats cache key
   * @param {string} entity - Entity type
   * @param {string} operation - Operation type (e.g., 'stats', 'count', 'dashboard')
   * @param {Object} params - Operation parameters
   * @returns {string} Cache key
   */
  static aggregation(entity, operation, params = {}) {
    const paramHash = this._hashFilters(params);
    return `${entity}:${operation}:${paramHash}`;
  }

  /**
   * Generate relationship cache key
   * @param {string} parent - Parent entity
   * @param {string} parentId - Parent ID
   * @param {string} child - Child entity
   * @param {Object} filters - Additional filters
   * @returns {string} Cache key
   */
  static relationship(parent, parentId, child, filters = {}) {
    const filterHash = this._hashFilters(filters);
    return `${parent}:${parentId}:${child}:${filterHash}`;
  }

  /**
   * Generate pattern for bulk invalidation
   * @param {string} entity - Entity type
   * @param {string} [pattern] - Pattern suffix (default: *)
   * @returns {string} Cache pattern
   */
  static pattern(entity, pattern = "*") {
    return `${entity}:${pattern}`;
  }

  /**
   * Hash filters into consistent string
   * @private
   */
  static _hashFilters(filters) {
    if (!filters || Object.keys(filters).length === 0) return "default";
    
    // Sort keys for consistency
    const sorted = Object.keys(filters)
      .sort()
      .map(key => `${key}=${JSON.stringify(filters[key])}`)
      .join("|");
    
    // Simple hash (for production, consider using crypto)
    return Buffer.from(sorted).toString("base64").substring(0, 16);
  }
}

/**
 * Cache Invalidation Service
 * Handles intelligent cache invalidation for write operations
 */
class CacheInvalidationService {
  /**
   * Invalidate entity and related caches
   * @param {string} entity - Entity type
   * @param {string} id - Entity ID
   * @param {Object} [options] - Invalidation options
   * @param {string[]} [options.relations] - Related entities to invalidate
   * @param {Object} [options.context] - Additional context (eventId, categoryId, etc.)
   * @returns {Promise<number>} Number of keys invalidated
   */
  static async invalidateEntity(entity, id, options = {}) {
    const keysToDelete = [];

    // 1. Invalidate direct entity cache
    keysToDelete.push(CacheKeyGenerator.entity(entity, id));

    // 2. Invalidate entity with all possible suffixes
    const commonSuffixes = ["profile", "details", "stats", "votes", "submissions"];
    commonSuffixes.forEach(suffix => {
      keysToDelete.push(CacheKeyGenerator.entity(entity, id, suffix));
    });

    // 3. Invalidate all list caches for this entity type
    await this._invalidatePattern(`${entity}:list:*`);

    // 4. Invalidate aggregation caches
    await this._invalidatePattern(`${entity}:stats:*`);
    await this._invalidatePattern(`${entity}:count:*`);
    await this._invalidatePattern(`${entity}:dashboard:*`);

    // 5. Invalidate relationships
    if (options.relations && options.relations.length > 0) {
      for (const relation of options.relations) {
        await this._invalidatePattern(`${relation}:*:${entity}:*`);
        await this._invalidatePattern(`${entity}:${id}:${relation}:*`);
      }
    }

    // 6. Context-based invalidation (e.g., event-specific caches)
    if (options.context) {
      await this._invalidateContextCaches(entity, options.context);
    }

    // Delete specific keys
    const deletePromises = keysToDelete.map(key => cache.del(key));
    await Promise.all(deletePromises);

    return keysToDelete.length;
  }

  /**
   * Invalidate list/paginated caches
   * @param {string} entity - Entity type
   * @param {Object} [filters] - Optional specific filters to invalidate
   * @returns {Promise<void>}
   */
  static async invalidateList(entity, filters = null) {
    if (filters) {
      // Invalidate specific filtered list
      const pattern = CacheKeyGenerator.list(entity, filters, "*", "*");
      await this._invalidatePattern(pattern.replace(/p\*:l\*/, "*"));
    } else {
      // Invalidate all lists for this entity
      await this._invalidatePattern(`${entity}:list:*`);
    }
  }

  /**
   * Invalidate aggregation caches
   * @param {string} entity - Entity type
   * @param {string} [operation] - Specific operation to invalidate
   * @returns {Promise<void>}
   */
  static async invalidateAggregations(entity, operation = null) {
    if (operation) {
      await this._invalidatePattern(`${entity}:${operation}:*`);
    } else {
      // Invalidate common aggregation types
      const operations = ["stats", "count", "dashboard", "analytics", "summary"];
      for (const op of operations) {
        await this._invalidatePattern(`${entity}:${op}:*`);
      }
    }
  }

  /**
   * Invalidate relationship caches
   * @param {string} parent - Parent entity
   * @param {string} parentId - Parent ID
   * @param {string} child - Child entity
   * @returns {Promise<void>}
   */
  static async invalidateRelationship(parent, parentId, child) {
    await this._invalidatePattern(`${parent}:${parentId}:${child}:*`);
  }

  /**
   * Invalidate context-specific caches (e.g., event dashboard)
   * @private
   */
  static async _invalidateContextCaches(entity, context) {
    // Event-related invalidations
    if (context.eventId) {
      await this._invalidatePattern(`event:${context.eventId}:*`);
      await this._invalidatePattern(`analytics:event:${context.eventId}:*`);
    }

    // Category-related invalidations
    if (context.categoryId) {
      await this._invalidatePattern(`category:${context.categoryId}:*`);
    }

    // User-related invalidations
    if (context.userId) {
      await this._invalidatePattern(`user:${context.userId}:history:*`);
      await this._invalidatePattern(`user:${context.userId}:stats:*`);
    }
  }

  /**
   * Invalidate cache keys matching a pattern
   * @private
   * @param {string} pattern - Pattern with wildcards
   * @returns {Promise<number>} Number of keys deleted
   */
  static async _invalidatePattern(pattern) {
    try {
      // Use cache manager's new pattern deletion method
      return await cache.deletePattern(pattern);
    } catch (error) {
      console.error(`Pattern invalidation failed (${pattern}):`, error.message);
      return 0;
    }
  }

  /**
   * Get invalidation strategy for entity type
   * @param {string} entity - Entity type
   * @returns {Object} Invalidation strategy config
   */
  static getInvalidationStrategy(entity) {
    const strategies = {
      user: {
        relations: ["candidate", "vote", "submission", "payment", "activity"],
        invalidateAggregations: true,
        contextFields: ["eventId"],
      },
      event: {
        relations: ["category", "candidate", "vote", "submission", "form", "slide"],
        invalidateAggregations: true,
        cascadeDelete: true,
      },
      candidate: {
        relations: ["vote", "user", "event", "category"],
        invalidateAggregations: true,
        contextFields: ["eventId", "categoryId", "userId"],
      },
      category: {
        relations: ["candidate", "vote"],
        invalidateAggregations: true,
        contextFields: ["eventId"],
      },
      vote: {
        relations: ["candidate", "category", "event", "user", "payment"],
        invalidateAggregations: true,
        contextFields: ["eventId", "categoryId", "candidateId", "userId"],
      },
      payment: {
        relations: ["vote", "user", "event"],
        invalidateAggregations: true,
        contextFields: ["eventId", "userId"],
      },
      submission: {
        relations: ["form", "event", "user"],
        invalidateAggregations: false,
        contextFields: ["eventId", "formId", "userId"],
      },
      form: {
        relations: ["submission", "event"],
        invalidateAggregations: false,
        contextFields: ["eventId"],
      },
    };

    return strategies[entity] || { relations: [], invalidateAggregations: false };
  }
}

export { CacheKeyGenerator, CacheInvalidationService };
