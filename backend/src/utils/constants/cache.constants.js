/**
 * Cache Constants
 * TTL values and cache key patterns
 */

/**
 * Cache TTL (Time To Live) in seconds
 * Based on data volatility and access patterns
 */
export const CACHE_TTL = {
  // Very short-lived (frequently changing data)
  REAL_TIME: 30, // 30 seconds - live metrics, counters
  SHORT: 300, // 5 minutes - active voting, recent activity
  
  // Medium duration (moderately stable data)
  MEDIUM: 900, // 15 minutes - user profiles, event details
  STANDARD: 1800, // 30 minutes - lists, paginated results
  
  // Long duration (relatively stable data)
  LONG: 3600, // 1 hour - aggregations, statistics
  EXTENDED: 7200, // 2 hours - historical data, completed events
  
  // Very long (rarely changing)
  PERMANENT: 86400, // 24 hours - configuration, static content
  WEEK: 604800, // 7 days - archived data
};

/**
 * Entity-specific TTL recommendations
 */
export const ENTITY_TTL = {
  user: {
    profile: CACHE_TTL.MEDIUM,
    list: CACHE_TTL.STANDARD,
    stats: CACHE_TTL.LONG,
    history: CACHE_TTL.MEDIUM,
  },
  event: {
    details: CACHE_TTL.MEDIUM,
    list: CACHE_TTL.STANDARD,
    dashboard: CACHE_TTL.SHORT, // Active events change frequently
    stats: CACHE_TTL.LONG,
    archived: CACHE_TTL.EXTENDED,
  },
  candidate: {
    profile: CACHE_TTL.MEDIUM,
    list: CACHE_TTL.SHORT, // During voting, candidates get updated
    votes: CACHE_TTL.REAL_TIME, // Live vote counts
    stats: CACHE_TTL.MEDIUM,
  },
  category: {
    details: CACHE_TTL.MEDIUM,
    list: CACHE_TTL.STANDARD,
    results: CACHE_TTL.LONG,
  },
  vote: {
    list: CACHE_TTL.SHORT,
    stats: CACHE_TTL.MEDIUM,
    analytics: CACHE_TTL.LONG,
  },
  payment: {
    details: CACHE_TTL.MEDIUM,
    list: CACHE_TTL.STANDARD,
    stats: CACHE_TTL.LONG,
  },
  analytics: {
    dashboard: CACHE_TTL.SHORT,
    trends: CACHE_TTL.MEDIUM,
    comparison: CACHE_TTL.LONG,
  },
  activity: {
    recent: CACHE_TTL.SHORT,
    history: CACHE_TTL.MEDIUM,
    timeline: CACHE_TTL.LONG,
  },
};

/**
 * Cache key prefixes for different types
 */
export const CACHE_PREFIX = {
  ENTITY: "entity",
  LIST: "list",
  STATS: "stats",
  AGGREGATION: "agg",
  RELATIONSHIP: "rel",
  DASHBOARD: "dash",
  ANALYTICS: "analytics",
  SEARCH: "search",
  COUNT: "count",
};

/**
 * Cache invalidation strategies
 */
export const INVALIDATION_STRATEGY = {
  // Invalidate immediately on write
  WRITE_THROUGH: "write_through",
  
  // Invalidate after write completes
  WRITE_BEHIND: "write_behind",
  
  // Invalidate based on TTL only
  TTL_ONLY: "ttl_only",
  
  // Invalidate related caches
  CASCADE: "cascade",
};

/**
 * Cache behavior flags
 */
export const CACHE_FLAGS = {
  SKIP_CACHE: "skipCache",
  FORCE_REFRESH: "forceRefresh",
  CACHE_ONLY: "cacheOnly",
};

export default {
  CACHE_TTL,
  ENTITY_TTL,
  CACHE_PREFIX,
  INVALIDATION_STRATEGY,
  CACHE_FLAGS,
};
