/**
 * Authentication & Authorization Middleware
 * Handles JWT verification, role-based access control, and token blacklisting
 * Integrates with AuthHelpers, cache (Redis), and repositories
 */

import { AuthHelpers } from "../utils/helpers/auth.helper.js";
import { ResponseHelper, HTTP_STATUS } from "../utils/helpers/response.helper.js";
import { ERROR_MESSAGES } from "../utils/constants/error.constants.js";
import { ROLES, PERMISSIONS } from "../utils/constants/user.constants.js";
import cache from "../utils/cache/cache.utils.js";
import UserRepository from "../modules/user/user.repository.js";
import CandidateRepository from "../modules/candidate/candidate.repository.js";

/**
 * Extract JWT token from Authorization header
 * @param {Object} req - Express request object
 * @returns {string|null} - Extracted token or null
 * @private
 */
const extractToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  // Support both "Bearer <token>" and "<token>" formats
  const parts = authHeader.split(" ");

  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return null;
};

/**
 * Main authentication middleware
 * Verifies JWT token, checks blacklist, and attaches user to request
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 */
export const authenticate = async (req, res, next) => {
  try {
    // 1. Extract token from header
    const token = extractToken(req);

    if (!token) {
      return ResponseHelper.error(res, {
        message: "Authentication required. Please provide a valid token.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 2. Check if token is blacklisted
    const isBlacklisted = await AuthHelpers.isTokenBlacklisted(token);

    if (isBlacklisted) {
      return ResponseHelper.error(res, {
        message: "This token has been revoked. Please log in again.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 3. Verify JWT signature and expiration
    let payload;
    try {
      payload = AuthHelpers.verifyToken(token);
    } catch (error) {
      const message = error.message.includes("expired")
        ? ERROR_MESSAGES.TOKEN_EXPIRED
        : ERROR_MESSAGES.INVALID_TOKEN;

      return ResponseHelper.error(res, {
        message,
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 4. Check if user exists and is active
    const user = await UserRepository.findById(payload.sub, {
      select: "email role is_active status deleted_at permissions",
      lean: true,
    });

    if (!user) {
      return ResponseHelper.error(res, {
        message: "User account not found.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 5. Validate user status
    if (user.deleted_at) {
      return ResponseHelper.error(res, {
        message: "This account has been deleted.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    if (user.status === "inactive") {
      return ResponseHelper.error(res, {
        message: "Your account has been deactivated. Contact support.",
        status_code: HTTP_STATUS.FORBIDDEN,
      });
    }

    if (user.status === "suspended") {
      return ResponseHelper.error(res, {
        message: "Your account has been suspended. Contact support.",
        status_code: HTTP_STATUS.FORBIDDEN,
      });
    }

    // 6. Attach user info to request object
    req.user = {
      id: user._id.toString(),
      _id: user._id,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions || [],
    };

    req.token = token;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return ResponseHelper.error(res, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errors: error,
    });
  }
};

/**
 * Candidate authentication middleware
 * Verifies JWT token for candidate users
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 */
export const authenticateCandidate = async (req, res, next) => {
  try {
    // 1. Extract token from header
    const token = extractToken(req);

    if (!token) {
      return ResponseHelper.error(res, {
        message: "Authentication required. Please provide a valid token.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 2. Check if token is blacklisted
    const isBlacklisted = await AuthHelpers.isTokenBlacklisted(token);

    if (isBlacklisted) {
      return ResponseHelper.error(res, {
        message: "This token has been revoked. Please log in again.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 3. Verify JWT signature and expiration
    let payload;
    try {
      payload = AuthHelpers.verifyToken(token);
    } catch (error) {
      const message = error.message.includes("expired")
        ? ERROR_MESSAGES.TOKEN_EXPIRED
        : ERROR_MESSAGES.INVALID_TOKEN;

      return ResponseHelper.error(res, {
        message,
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 4. Check if candidate exists and is active
    const candidate = await CandidateRepository.findById(payload.sub, {
      select: "name email code status event categories deleted_at",
      lean: true,
    });

    if (!candidate) {
      return ResponseHelper.error(res, {
        message: "Candidate account not found.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    // 5. Validate candidate status
    if (candidate.deleted_at) {
      return ResponseHelper.error(res, {
        message: "This account has been deleted.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    if (candidate.status === "suspended") {
      return ResponseHelper.error(res, {
        message: "Your candidacy has been suspended. Contact the organizer.",
        status_code: HTTP_STATUS.FORBIDDEN,
      });
    }

    // 6. Attach candidate info to request object
    req.user = {
      id: candidate._id.toString(),
      _id: candidate._id,
      email: candidate.email,
      name: candidate.name,
      code: candidate.code,
      role: "candidate",
      status: candidate.status,
      event: candidate.event,
      categories: candidate.categories,
    };

    req.token = token;

    next();
  } catch (error) {
    console.error("Candidate authentication error:", error);
    return ResponseHelper.error(res, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errors: error,
    });
  }
};

/**
 * Role-based authorization middleware factory
 * Creates middleware that checks if user has required role(s)
 *
 * @param {...string} allowedRoles - Roles that can access the route
 * @returns {Function} Express middleware
 *
 * @example
 * router.get('/admin-only', authenticate, authorize(ROLES.ADMIN), controller.action);
 * router.post('/events', authenticate, authorize(ROLES.ORGANISER, ROLES.ADMIN), controller.create);
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Must be authenticated first
    if (!req.user) {
      return ResponseHelper.error(res, {
        message: "Authentication required.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }


    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role) && req.user.role !== "super" && req.user.role !== "super_admin") {
      return ResponseHelper.error(res, {
        message: `Access restricted to: ${allowedRoles.join(", ")}`,
        status_code: HTTP_STATUS.FORBIDDEN,
      });
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Attempts to authenticate but doesn't fail if token is missing
 * Useful for routes that have different behavior for authenticated vs unauthenticated users
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 *
 * @example
 * router.get('/events', optionalAuth, controller.list); // Public but may show more to authenticated
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      // No token provided - continue as unauthenticated
      return next();
    }

    // Check blacklist
    const isBlacklisted = await AuthHelpers.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return next(); // Continue as unauthenticated
    }

    // Verify token
    try {
      const payload = AuthHelpers.verifyToken(token);

      // Get user
      const user = await UserRepository.findById(payload.sub, {
        select: "email role is_active status deleted_at permissions",
        lean: true,
      });

      if (user && !user.deleted_at && user.is_active && user.status !== "suspended") {
        req.user = {
          id: user._id.toString(),
          _id: user._id,
          email: user.email,
          role: user.role,
          status: user.status,
          permissions: user.permissions || [],
        };
        req.token = token;
      }
    } catch (error) {
      // Token invalid/expired - continue as unauthenticated
      // Don't log as error since this is expected behavior
    }

    next();
  } catch (error) {
    console.error("Optional auth error:", error);
    // Continue even on error
    next();
  }
};

/**
 * Ownership verification middleware factory
 * Ensures user owns the resource they're trying to access/modify
 *
 * @param {Function} getResourceOwnerId - Async function that extracts owner ID from request
 * @returns {Function} Express middleware
 *
 * @example
 * // For user profile routes
 * router.put('/users/:id', authenticate, requireOwnership(
 *   async (req) => req.params.id
 * ), controller.update);
 *
 * // For event routes (organiser owns events)
 * router.put('/events/:id', authenticate, requireOwnership(
 *   async (req) => {
 *     const event = await EventRepository.findById(req.params.id);
 *     return event?.created_by;
 *   }
 * ), controller.update);
 */
export const requireOwnership = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      // Must be authenticated
      if (!req.user) {
        return ResponseHelper.error(res, {
          message: "Authentication required.",
          status_code: HTTP_STATUS.UNAUTHORIZED,
        });
      }

      // Super admins and admins can access everything
      if ([ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(req.user.role)) {
        return next();
      }

      // Get resource owner ID
      const resourceOwnerId = await getResourceOwnerId(req);

      if (!resourceOwnerId) {
        return ResponseHelper.error(res, {
          message: "Resource not found.",
          status_code: HTTP_STATUS.NOT_FOUND,
        });
      }

      // Check ownership
      if (resourceOwnerId.toString() !== req.user.id) {
        return ResponseHelper.error(res, {
          message: "You don't have permission to access this resource.",
          status_code: HTTP_STATUS.FORBIDDEN,
        });
      }

      next();
    } catch (error) {
      console.error("Ownership check error:", error);
      return ResponseHelper.error(res, {
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errors: error,
      });
    }
  };
};

/**
 * Rate limiting middleware for authentication endpoints
 * Prevents brute force attacks on login/register
 *
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMinutes - Time window in minutes
 * @returns {Function} Express middleware
 *
 * @example
 * router.post('/login', authRateLimit(5, 15), controller.login);
 */
export const authRateLimit = (maxAttempts = 5, windowMinutes = 15) => {
  return async (req, res, next) => {
    try {
      const identifier = req.body.email || req.ip;
      const key = `auth_rate_limit:${identifier}`;

      const attempts = await cache.get(key);

      if (attempts && parseInt(attempts, 10) >= maxAttempts) {
        return ResponseHelper.error(res, {
          message: `Too many attempts. Please try again in ${windowMinutes} minutes.`,
          status_code: HTTP_STATUS.TOO_MANY_REQUESTS,
        });
      }

      // Increment counter
      if (!attempts) {
        await cache.set(key, "1", "EX", windowMinutes * 60);
      } else {
        await cache.incr(key);
      }

      next();
    } catch (error) {
      console.error("Rate limit error:", error);
      // Continue on error (fail open)
      next();
    }
  };
};

/**
 * Email verification check middleware
 * Ensures user has verified their email before accessing certain routes
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 */
export const requireEmailVerification = async (req, res, next) => {
  try {
    if (!req.user) {
      return ResponseHelper.error(res, {
        message: "Authentication required.",
        status_code: HTTP_STATUS.UNAUTHORIZED,
      });
    }

    const user = await UserRepository.findById(req.user.id, {
      select: "email_verified_at",
      lean: true,
    });

    if (!user || !user.email_verified_at) {
      return ResponseHelper.error(res, {
        message: ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
        status_code: HTTP_STATUS.FORBIDDEN,
      });
    }

    next();
  } catch (error) {
    console.error("Email verification check error:", error);
    return ResponseHelper.error(res, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errors: error,
    });
  }
};

/**
 * Permission check middleware
 * For fine-grained role permissions (read, write, update, delete, super)
 *
 * @param {...string} requiredPermissions - Permissions needed (any one of them)
 * @returns {Function} Express middleware
 *
 * @example
 * router.delete('/events/:id', authenticate, requirePermission(PERMISSIONS.DELETE, PERMISSIONS.SUPER), controller.delete);
 */
export const requirePermission = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return ResponseHelper.error(res, {
          message: "Authentication required.",
          status_code: HTTP_STATUS.UNAUTHORIZED,
        });
      }

      // Super admins have all permissions
      if (req.user.role === ROLES.SUPER_ADMIN) {
        return next();
      }

      const userPermissions = req.user.permissions || [];

      // Check if user has "super" permission
      if (userPermissions.includes(PERMISSIONS.SUPER)) {
        return next();
      }

      // Check if user has any of the required permissions
      const hasPermission = requiredPermissions.some((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        return ResponseHelper.error(res, {
          message: `Required permissions: ${requiredPermissions.join(", ")}`,
          status_code: HTTP_STATUS.FORBIDDEN,
        });
      }

      next();
    } catch (error) {
      console.error("Permission check error:", error);
      return ResponseHelper.error(res, {
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errors: error,
      });
    }
  };
};

/**
 * Admin-only middleware
 * Shortcut for authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN)
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 */
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return ResponseHelper.error(res, {
      message: "Authentication required.",
      status_code: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  if (![ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(req.user.role)) {
    return ResponseHelper.error(res, {
      message: ERROR_MESSAGES.ADMIN_ONLY,
      status_code: HTTP_STATUS.FORBIDDEN,
    });
  }

  next();
};

/**
 * Super admin-only middleware
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 */
export const superAdminOnly = (req, res, next) => {
  if (!req.user) {
    return ResponseHelper.error(res, {
      message: "Authentication required.",
      status_code: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  if (req.user.role !== ROLES.SUPER_ADMIN) {
    return ResponseHelper.error(res, {
      message: ERROR_MESSAGES.SUPER_ADMIN_REQUIRED,
      status_code: HTTP_STATUS.FORBIDDEN,
    });
  }

  next();
};

/**
 * Export all middleware functions
 */
export default {
  authenticate,
  authenticateCandidate,
  authorize,
  optionalAuth,
  requireOwnership,
  authRateLimit,
  requireEmailVerification,
  requirePermission,
  adminOnly,
  superAdminOnly,
};
