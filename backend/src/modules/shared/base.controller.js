/**
 * Base Controller Class
 *
 * Provides common functionality for all controllers:
 * - Service injection (dependency injection pattern)
 * - Request/response handling
 * - Validation with Joi
 * - Pagination extraction
 * - Response formatting (via ResponseHelper)
 * - Async error catching
 * - Logging with async context
 *
 * Usage:
 * ```javascript
 * import BaseController from '../shared/base.controller.js';
 * import UserService from './user.service.js';
 * import { createUserSchema, updateUserSchema } from './user.validation.js';
 *
 * class UserController extends BaseController {
 *   constructor(dependencies = {}) {
 *     super({
 *       userService: dependencies.userService || UserService,
 *     });
 *   }
 *
 *   async create(req, res) {
 *     const validated = this.validate(req.body, createUserSchema);
 *     const user = await this.service('userService').create(validated);
 *     return this.created(res, { data: user, message: 'User created' });
 *   }
 *
 *   async list(req, res) {
 *     const { page, limit, skip } = this.getPagination(req);
 *     const filters = this.getFilters(req, ['status', 'role']);
 *     const users = await this.service('userService').findAll(filters, { skip, limit });
 *     const total = await this.service('userService').count(filters);
 *     return this.paginated(res, { data: users, page, limit, total_items: total });
 *   }
 * }
 *
 * export { UserController };
 * export default new UserController();
 * ```
 */

import { AsyncLocalStorage } from "async_hooks";
import {
  ResponseHelper,
  HTTP_STATUS,
} from "../../utils/helpers/response.helper.js";
import {
  DEFAULT_PAGINATION,
  ERROR_MESSAGES,
} from "../../utils/constants/error.constants.js";

const asyncLocalStorage = new AsyncLocalStorage();

/**
 * @abstract
 * @class BaseController
 */
class BaseController {
  /**
   * @param {Object} services - Injected services (e.g., { userService, eventService })
   * @param {Object} [options] - Optional configuration
   * @param {boolean} [options.enableLogging=true] - Enable console logging
   */
  constructor(services = {}, options = {}) {
    if (new.target === BaseController) {
      throw new Error(
        "BaseController is abstract and cannot be instantiated directly"
      );
    }

    this._services = { ...services };
    this.options = {
      enableLogging: true,
      ...options,
    };

    // Bind context methods
    this.runInContext = this.runInContext.bind(this);
    this.getContext = this.getContext.bind(this);
  }

  // ========================================
  // 1. CONTEXT & TRACING
  // ========================================

  /**
   * Run a handler within async context (for request ID, user, etc.)
   * @param {Object} context - { requestId, userId, action, etc. }
   * @param {Function} callback - Async handler function
   * @returns {Promise<any>}
   */
  runInContext(context, callback) {
    return asyncLocalStorage.run(context, callback);
  }

  /**
   * Get current async context
   * @returns {Object|null}
   */
  getContext() {
    return asyncLocalStorage.getStore() || null;
  }

  // ========================================
  // 2. SERVICE ACCESS
  // ========================================

  /**
   * Get service by name
   * @param {string} name - Service name
   * @returns {any}
   * @throws {Error} If service not found
   */
  service(name) {
    const service = this._services[name];
    if (!service) {
      throw new Error(
        `Service '${name}' not injected into ${this.constructor.name}. Available: ${Object.keys(this._services).join(", ") || "none"}`
      );
    }
    return service;
  }

  // ========================================
  // 3. REQUEST HELPERS
  // ========================================

  /**
   * Extract pagination params from request query
   * @param {Object} req - Express request
   * @returns {{ page: number, limit: number, skip: number }}
   */
  getPagination(req) {
    const page = Math.max(1, parseInt(req.query.page, 10) || DEFAULT_PAGINATION.PAGE);
    const limit = Math.min(
      Math.max(1, parseInt(req.query.limit, 10) || DEFAULT_PAGINATION.LIMIT),
      DEFAULT_PAGINATION.MAX_LIMIT
    );
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  /**
   * Extract filters from request query
   * @param {Object} req - Express request
   * @param {string[]} allowedFields - Allowed filter fields
   * @returns {Object}
   */
  getFilters(req, allowedFields = []) {
    const filters = {};

    allowedFields.forEach((field) => {
      if (req.query[field] !== undefined && req.query[field] !== "") {
        filters[field] = req.query[field];
      }
    });

    return filters;
  }

  /**
   * Extract sort params from request query
   * @param {Object} req - Express request
   * @param {string} [defaultSort='-created_at'] - Default sort field
   * @returns {Object} - MongoDB sort object
   */
  getSort(req, defaultSort = "-created_at") {
    const sortParam = req.query.sort || defaultSort;
    const sort = {};

    sortParam.split(",").forEach((field) => {
      const trimmed = field.trim();
      if (trimmed.startsWith("-")) {
        sort[trimmed.substring(1)] = -1;
      } else {
        sort[trimmed] = 1;
      }
    });

    return sort;
  }

  /**
   * Extract select fields from request query
   * @param {Object} req - Express request
   * @returns {string|null}
   */
  getSelect(req) {
    return req.query.select || null;
  }

  /**
   * Extract search term from request query
   * @param {Object} req - Express request
   * @param {string} [paramName='search'] - Query parameter name
   * @returns {string|null}
   */
  getSearch(req, paramName = "search") {
    return req.query[paramName] || null;
  }

  /**
   * Get authenticated user from request
   * @param {Object} req - Express request
   * @returns {Object|null}
   */
  getUser(req) {
    return req.user || null;
  }

  /**
   * Get authenticated user ID from request
   * @param {Object} req - Express request
   * @returns {string|null}
   */
  getUserId(req) {
    return req.user?._id?.toString() || req.user?.id || null;
  }

  /**
   * Check if user is authenticated
   * @param {Object} req - Express request
   * @returns {boolean}
   */
  isAuthenticated(req) {
    return !!req.user;
  }

  /**
   * Check if user has specific role
   * @param {Object} req - Express request
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  hasRole(req, role) {
    return req.user?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   * @param {Object} req - Express request
   * @param {string[]} roles - Roles to check
   * @returns {boolean}
   */
  hasAnyRole(req, roles) {
    return req.user && roles.includes(req.user.role);
  }

  /**
   * Get client IP address from request
   * @param {Object} req - Express request
   * @returns {string|null}
   */
  getClientIP(req) {
    return (
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      req.ip ||
      null
    );
  }

  // ========================================
  // 4. RESPONSE HELPERS (via ResponseHelper)
  // ========================================

  /**
   * Send success response
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {*} options.data - Response data
   * @param {string} [options.message='Success'] - Success message
   * @param {number} [options.status_code=200] - HTTP status code
   */
  success(res, { data = null, message = "Success", status_code = HTTP_STATUS.OK } = {}) {
    return ResponseHelper.success(res, { data, message, status_code });
  }

  /**
   * Send created response (201)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {*} options.data - Created resource data
   * @param {string} [options.message='Created successfully'] - Success message
   */
  created(res, { data, message = "Created successfully" } = {}) {
    return ResponseHelper.created(res, { data, message });
  }

  /**
   * Send no content response (204)
   * @param {Object} res - Express response
   */
  noContent(res) {
    return ResponseHelper.noContent(res);
  }

  /**
   * Send paginated response
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {Array} options.data - Data array
   * @param {number} options.page - Current page
   * @param {number} options.limit - Items per page
   * @param {number} options.total_items - Total items count
   * @param {string} [options.message='Data fetched successfully'] - Success message
   */
  paginated(res, { data, page, limit, total_items, message = "Data fetched successfully" }) {
    return ResponseHelper.paginated(res, { data, page, limit, total_items, message });
  }

  /**
   * Send error response
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {number} [options.status_code=500] - HTTP status code
   * @param {*} [options.errors] - Additional error details
   */
  error(res, { message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR, status_code = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null } = {}) {
    return ResponseHelper.error(res, { message, status_code, errors });
  }

  /**
   * Send bad request error (400)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   * @param {*} [options.errors] - Error details
   */
  badRequest(res, { message = ERROR_MESSAGES.INVALID_REQUEST, errors = null } = {}) {
    return ResponseHelper.badRequest(res, { message, errors });
  }

  /**
   * Send unauthorized error (401)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   */
  unauthorized(res, { message = ERROR_MESSAGES.UNAUTHORIZED } = {}) {
    return ResponseHelper.unauthorized(res, { message });
  }

  /**
   * Send forbidden error (403)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   */
  forbidden(res, { message = ERROR_MESSAGES.FORBIDDEN } = {}) {
    return ResponseHelper.forbidden(res, { message });
  }

  /**
   * Send not found error (404)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   * @param {string} [options.resource] - Resource type
   */
  notFound(res, { message = null, resource = "Resource" } = {}) {
    return ResponseHelper.notFound(res, { message, resource });
  }

  /**
   * Send conflict error (409)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   */
  conflict(res, { message = "Resource already exists" } = {}) {
    return ResponseHelper.conflict(res, { message });
  }

  /**
   * Send validation error (422)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   * @param {*} [options.errors] - Validation error details
   */
  validationError(res, { message = "Validation failed", errors = null } = {}) {
    return ResponseHelper.validationError(res, { message, errors });
  }

  /**
   * Send too many requests error (429)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   * @param {number} [options.retry_after] - Retry after seconds
   */
  tooManyRequests(res, { message = ERROR_MESSAGES.TOO_MANY_REQUESTS, retry_after = null } = {}) {
    return ResponseHelper.tooManyRequests(res, { message, retry_after });
  }

  /**
   * Send server error (500)
   * @param {Object} res - Express response
   * @param {Object} options - Response options
   * @param {string} [options.message] - Error message
   * @param {Error} [options.error] - Error object
   */
  serverError(res, { message = ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error = null } = {}) {
    return ResponseHelper.serverError(res, { message, error });
  }

  // ========================================
  // 5. VALIDATION
  // ========================================

  /**
   * Validate data against Joi schema
   * Must call BaseController.setValidation(Joi) once at app startup
   *
   * @param {Object} data - Data to validate
   * @param {import('joi').Schema} schema - Joi schema
   * @returns {Object} - Validated and sanitized data
   * @throws {Error} - Validation error with details
   */
  validate(data, schema) {
    if (!this.constructor.validation) {
      throw new Error(
        "Validation library not attached. Call BaseController.setValidation(Joi) at app startup."
      );
    }

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join("."),
        message: d.message,
      }));
      const err = new Error("Validation failed");
      err.isValidationError = true;
      err.details = details;
      throw err;
    }

    return value;
  }

  /**
   * Attach validation library (Joi) - call once per app
   * @param {any} validationLibrary - Joi instance
   */
  static setValidation(validationLibrary) {
    if (this.validation) {
      console.warn(
        "Validation library already attached to BaseController. Overwriting..."
      );
    }
    this.validation = validationLibrary;
  }

  // ========================================
  // 6. ASYNC ERROR WRAPPER
  // ========================================

  /**
   * Wrap async controller method to catch errors
   * @param {Function} fn - Async controller method
   * @returns {Function} Wrapped function
   *
   * @example
   * // In routes:
   * router.post('/', controller.wrap(controller.create));
   * router.get('/:id', controller.wrap(controller.getById));
   */
  wrap(fn) {
    return async (req, res, next) => {
      try {
        await fn.call(this, req, res, next);
      } catch (error) {
        this.handleError(res, error, req);
      }
    };
  }

  /**
   * Handle errors and send appropriate response
   * @param {Object} res - Express response
   * @param {Error} error - Error object
   * @param {Object} [req] - Express request (optional, for logging)
   */
  handleError(res, error, req = null) {
    // Log error
    this.log("error", {
      action: req?.originalUrl,
      method: req?.method,
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    // Validation errors
    if (error.isValidationError) {
      return this.validationError(res, {
        message: "Validation failed",
        errors: error.details,
      });
    }

    // Mongoose CastError (invalid ObjectId)
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return this.badRequest(res, {
        message: ERROR_MESSAGES.INVALID_OBJECT_ID,
      });
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return this.conflict(res, {
        message: `A record with this ${field} already exists`,
      });
    }

    // Custom error status codes
    if (error.statusCode) {
      return this.error(res, {
        message: error.message,
        status_code: error.statusCode,
      });
    }

    // Error message pattern matching
    const message = error.message.toLowerCase();

    if (message.includes("not found")) {
      return this.notFound(res, { message: error.message });
    }

    if (message.includes("unauthorized") || message.includes("invalid credentials") || message.includes("invalid token")) {
      return this.unauthorized(res, { message: error.message });
    }

    if (message.includes("forbidden") || message.includes("permission") || message.includes("access denied")) {
      return this.forbidden(res, { message: error.message });
    }

    if (message.includes("already exists") || message.includes("duplicate")) {
      return this.conflict(res, { message: error.message });
    }

    if (message.includes("validation failed")) {
      return this.validationError(res, { message: error.message });
    }

    // Default: Internal server error
    return this.serverError(res, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error,
    });
  }

  // ========================================
  // 7. LOGGING
  // ========================================

  /**
   * Log action with context
   * @param {string} level - Log level (info, warn, error)
   * @param {Object} meta - Metadata
   */
  log(level, meta = {}) {
    if (!this.options.enableLogging) return;

    const context = this.getContext() || {};
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      controller: this.constructor.name,
      ...context,
      ...meta,
    };

    // Replace with structured logger (Winston/Pino) in production
    if (level === "error") {
      console.error(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }
}

export default BaseController;
