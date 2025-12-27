/**
 * Activity Logger Middleware
 * Async activity logging for routes using Agenda.js
 * Zero-latency, fire-and-forget logging
 */

import agendaManager from "../services/agenda.service.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../utils/constants/activity.constants.js";
import UAParser from "ua-parser-js";
import geoip from "geoip-lite";

/**
 * Parse user agent string to extract device, browser, and OS info
 * @param {string} userAgent - User agent string from request headers
 * @returns {Object} Parsed device information
 */
const parseUserAgent = (userAgent) => {
  if (!userAgent) return null;
  
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  
  // Determine device type
  let deviceType = "desktop";
  if (result.device.type === "mobile") deviceType = "mobile";
  else if (result.device.type === "tablet") deviceType = "tablet";
  else if (result.device.type) deviceType = result.device.type;
  
  return {
    device_type: deviceType,
    browser: {
      name: result.browser.name || "unknown",
      version: result.browser.version || "unknown",
    },
    os: {
      name: result.os.name || "unknown",
      version: result.os.version || "unknown",
    },
  };
};

/**
 * Get location information from IP address
 * @param {string} ip - IP address
 * @returns {Object} Location information
 */
const getLocationFromIP = (ip) => {
  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip === "localhost") {
    return null;
  }
  
  // Extract IPv4 from IPv6 format (::ffff:192.168.1.1)
  const ipv4Match = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)/);
  const cleanIp = ipv4Match ? ipv4Match[1] : ip;
  
  const geo = geoip.lookup(cleanIp);
  if (!geo) return null;
  
  return {
    country: geo.country || "unknown",
    region: geo.region || "unknown",
    city: geo.city || "unknown",
    timezone: geo.timezone || "unknown",
  };
};

/**
 * Log activity after successful response
 * @param {string} action - ACTION_TYPE constant
 * @param {string} entityType - ENTITY_TYPE constant
 * @param {Object} options - Additional options
 * @param {Function} [options.getEntityId] - Function to extract entity ID from req/res
 * @param {Function} [options.getDescription] - Function to generate description
 * @param {Function} [options.getMetadata] - Function to generate metadata
 * @param {string} [options.severity] - Severity level (info, warning, error, critical)
 * @returns {Function} Express middleware
 */
export const logActivity = (action, entityType, options = {}) => {
  return (req, res, next) => {
    // Store original send to intercept response
    const originalSend = res.send;

    res.send = function (data) {
      // Only log successful responses (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Extract entity ID from various sources
        let entityId = null;
        if (options.getEntityId) {
          entityId = options.getEntityId(req, res);
        } else {
          // Try common patterns
          entityId =
            req.params.id ||
            req.params.candidateId ||
            req.params.eventId ||
            req.params.categoryId ||
            res.locals.entityId ||
            res.locals.createdId ||
            null;
        }

        // Generate description
        const description = options.getDescription
          ? options.getDescription(req, res)
          : `${action} completed successfully`;

        // Generate metadata
        const metadata = options.getMetadata ? options.getMetadata(req, res) : {};

        // Extract event context if available
        const eventId =
          req.params.eventId || req.body.event_id || res.locals.eventId || null;

        // Parse user agent and IP location
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const device = parseUserAgent(userAgent);
        const location = getLocationFromIP(ipAddress);

        // Queue activity log (async, non-blocking)
        agendaManager
          .now("log-activity", {
            userId: req.user?._id || req.user?.id || null,
            action,
            entityType,
            entityId,
            eventId,
            description,
            severity: options.severity || "info",
            ipAddress,
            userAgent,
            device,
            location,
            sessionId: req.sessionID || req.session?.id || null,
            metadata,
          })
          .catch((error) => {
            // Fail silently - don't break the response
            console.error(`[Activity Logger] Failed to queue activity: ${error.message}`);
          });
      }

      // Call original send
      return originalSend.call(this, data);
    };

    next();
  };
};

/**
 * Log authentication events (login, logout, failed login)
 * @param {string} action - LOGIN, LOGOUT, or FAILED_LOGIN
 * @param {boolean} [success=true] - Whether auth was successful
 * @returns {Function} Express middleware
 */
export const logAuth = (action, success = true) => {
  return (req, res, next) => {
    const originalSend = res.send;

    res.send = function (data) {
      if (success && res.statusCode >= 200 && res.statusCode < 300) {
        const userId = req.user?._id || res.locals.userId;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const device = parseUserAgent(userAgent);
        const location = getLocationFromIP(ipAddress);

        agendaManager
          .now("log-activity", {
            userId,
            action,
            entityType: ENTITY_TYPE.USER,
            entityId: userId,
            description: `User ${action.toLowerCase()} ${success ? "successful" : "failed"}`,
            severity: success ? "info" : "warning",
            ipAddress,
            userAgent,
            device,
            location,
            sessionId: req.sessionID || req.session?.id || null,
            metadata: {
              success,
              email: req.body?.email || req.user?.email,
            },
          })
          .catch((error) => {
            console.error(`[Activity Logger] Failed to log auth: ${error.message}`);
          });
      } else if (!success) {
        // Log failed auth immediately, even on error response
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        const device = parseUserAgent(userAgent);
        const location = getLocationFromIP(ipAddress);
        
        agendaManager
          .now("log-activity", {
            userId: null,
            action: ACTION_TYPE.FAILED_LOGIN,
            entityType: ENTITY_TYPE.USER,
            description: "Failed login attempt",
            severity: "warning",
            ipAddress,
            userAgent,
            device,
            location,
            metadata: {
              email: req.body?.email,
              reason: res.locals.failureReason || "invalid_credentials",
            },
          })
          .catch((error) => {
            console.error(`[Activity Logger] Failed to log failed auth: ${error.message}`);
          });
      }

      return originalSend.call(this, data);
    };

    next();
  };
};

/**
 * Log data changes with before/after snapshots
 * @param {string} action - ACTION_TYPE constant
 * @param {string} entityType - ENTITY_TYPE constant
 * @param {Function} getChanges - Function to extract before/after data
 * @returns {Function} Express middleware
 */
export const logDataChange = (action, entityType, getChanges) => {
  return async (req, res, next) => {
    // Capture "before" state
    const beforeData = await getChanges(req, "before").catch(() => null);
    res.locals.beforeData = beforeData;

    const originalSend = res.send;

    res.send = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Capture "after" state
        Promise.resolve(getChanges(req, "after", res))
          .then((afterData) => {
            const entityId = req.params.id || res.locals.entityId;
            const ipAddress = req.ip || req.connection.remoteAddress;
            const userAgent = req.headers["user-agent"];
            const device = parseUserAgent(userAgent);
            const location = getLocationFromIP(ipAddress);

            agendaManager
              .now("log-activity", {
                userId: req.user?._id,
                action,
                entityType,
                entityId,
                description: `${entityType} ${action.toLowerCase()}`,
                severity: "info",
                ipAddress,
                userAgent,
                device,
                location,
                changes: {
                  before: beforeData,
                  after: afterData,
                },
              })
              .catch((error) => {
                console.error(
                  `[Activity Logger] Failed to log data change: ${error.message}`
                );
              });
          })
          .catch((error) => {
            console.error(`[Activity Logger] Failed to capture after state: ${error.message}`);
          });
      }

      return originalSend.call(this, data);
    };

    next();
  };
};

/**
 * Batch log multiple activities (for bulk operations)
 * Call this directly in controllers for bulk operations
 * @param {Array} activities - Array of activity objects
 * @returns {Promise<void>}
 */
export const batchLogActivities = async (activities) => {
  try {
    await agendaManager.now("batch-log-activities", { activities });
  } catch (error) {
    console.error(`[Activity Logger] Failed to batch log: ${error.message}`);
  }
};

/**
 * Direct activity logger (bypass middleware)
 * Use this in services or controllers when you need manual control
 * @param {Object} activityData - Activity data
 * @returns {Promise<void>}
 */
export const logActivityDirect = async (activityData) => {
  try {
    await agendaManager.now("log-activity", activityData);
  } catch (error) {
    console.error(`[Activity Logger] Failed to log activity: ${error.message}`);
  }
};

export default {
  logActivity,
  logAuth,
  logDataChange,
  batchLogActivities,
  logActivityDirect,
};
