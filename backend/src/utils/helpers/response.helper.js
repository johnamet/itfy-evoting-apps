/**
 * Response Helper Utility
 * Provides standardized API response functions for consistent
 * response formats across the application
 */

/**
 * HTTP Status Codes commonly used
 */
export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export class ResponseHelper {
  /**
   * Send a success response
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {*} options.data - Response data
   * @param {string} options.message - Success message
   * @param {number} options.status_code - HTTP status code (default: 200)
   * @returns {Object} - Express response
   */
  static success(res, { data = null, message = "Success", status_code = HTTP_STATUS.OK } = {}) {
    return res.status(status_code).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send an error response
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {number} options.status_code - HTTP status code (default: 500)
   * @param {*} options.errors - Additional error details (shown in development only)
   * @returns {Object} - Express response
   */
  static error(res, { message = "An error occurred", status_code = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null } = {}) {
    const response = {
      success: false,
      message,
    };

    // Include error details in development mode
    if (errors && process.env.NODE_ENV === "development") {
      response.errors = errors;
    }

    return res.status(status_code).json(response);
  }

  /**
   * Send a paginated response
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {Array} options.data - Array of items
   * @param {number} options.page - Current page number
   * @param {number} options.limit - Items per page
   * @param {number} options.total_items - Total number of items
   * @param {string} options.message - Success message
   * @returns {Object} - Express response
   */
  static paginated(res, { data, page, limit, total_items, message = "Data fetched successfully" }) {
    const total_pages = Math.ceil(total_items / limit);
    const has_next = page < total_pages;
    const has_prev = page > 1;

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total_items,
        total_pages,
        has_next,
        has_prev,
      },
    });
  }

  /**
   * Send a created response (201)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {*} options.data - Created resource data
   * @param {string} options.message - Success message
   * @returns {Object} - Express response
   */
  static created(res, { data, message = "Resource created successfully" } = {}) {
    return this.success(res, {
      data,
      message,
      status_code: HTTP_STATUS.CREATED,
    });
  }

  /**
   * Send a no content response (204)
   * @param {Object} res - Express response object
   * @returns {Object} - Express response
   */
  static noContent(res) {
    return res.status(HTTP_STATUS.NO_CONTENT).send();
  }

  /**
   * Send a bad request response (400)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {*} options.errors - Validation errors or details
   * @returns {Object} - Express response
   */
  static badRequest(res, { message = "Bad request", errors = null } = {}) {
    return this.error(res, {
      message,
      status_code: HTTP_STATUS.BAD_REQUEST,
      errors,
    });
  }

  /**
   * Send an unauthorized response (401)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @returns {Object} - Express response
   */
  static unauthorized(res, { message = "Unauthorized access" } = {}) {
    return this.error(res, {
      message,
      status_code: HTTP_STATUS.UNAUTHORIZED,
    });
  }

  /**
   * Send a forbidden response (403)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @returns {Object} - Express response
   */
  static forbidden(res, { message = "Access forbidden" } = {}) {
    return this.error(res, {
      message,
      status_code: HTTP_STATUS.FORBIDDEN,
    });
  }

  /**
   * Send a not found response (404)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {string} options.resource - Resource type that wasn't found
   * @returns {Object} - Express response
   */
  static notFound(res, { message = null, resource = "Resource" } = {}) {
    return this.error(res, {
      message: message || `${resource} not found`,
      status_code: HTTP_STATUS.NOT_FOUND,
    });
  }

  /**
   * Send a conflict response (409)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @returns {Object} - Express response
   */
  static conflict(res, { message = "Resource conflict" } = {}) {
    return this.error(res, {
      message,
      status_code: HTTP_STATUS.CONFLICT,
    });
  }

  /**
   * Send a validation error response (422)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {*} options.errors - Validation error details
   * @returns {Object} - Express response
   */
  static validationError(res, { message = "Validation failed", errors = null } = {}) {
    const response = {
      success: false,
      message,
    };

    // Always include validation errors regardless of environment
    if (errors) {
      response.errors = errors;
    }

    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(response);
  }

  /**
   * Send a too many requests response (429)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {number} options.retry_after - Seconds until retry is allowed
   * @returns {Object} - Express response
   */
  static tooManyRequests(res, { message = "Too many requests", retry_after = null } = {}) {
    if (retry_after) {
      res.set("Retry-After", retry_after);
    }
    return this.error(res, {
      message,
      status_code: HTTP_STATUS.TOO_MANY_REQUESTS,
    });
  }

  /**
   * Send a server error response (500)
   * @param {Object} res - Express response object
   * @param {Object} options - Response options
   * @param {string} options.message - Error message
   * @param {Error} options.error - Error object (stack shown in development)
   * @returns {Object} - Express response
   */
  static serverError(res, { message = "Internal server error", error = null } = {}) {
    const errors = error && process.env.NODE_ENV === "development" 
      ? { stack: error.stack, details: error.message }
      : null;

    return this.error(res, {
      message,
      status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errors,
    });
  }
}

// Convenience function exports for direct imports
export const sendSuccess = ResponseHelper.success.bind(ResponseHelper);
export const sendError = ResponseHelper.error.bind(ResponseHelper);
export const sendPaginated = ResponseHelper.paginated.bind(ResponseHelper);
export const sendCreated = ResponseHelper.created.bind(ResponseHelper);
export const sendNoContent = ResponseHelper.noContent.bind(ResponseHelper);
export const sendBadRequest = ResponseHelper.badRequest.bind(ResponseHelper);
export const sendUnauthorized = ResponseHelper.unauthorized.bind(ResponseHelper);
export const sendForbidden = ResponseHelper.forbidden.bind(ResponseHelper);
export const sendNotFound = ResponseHelper.notFound.bind(ResponseHelper);
export const sendConflict = ResponseHelper.conflict.bind(ResponseHelper);
export const sendValidationError = ResponseHelper.validationError.bind(ResponseHelper);
export const sendTooManyRequests = ResponseHelper.tooManyRequests.bind(ResponseHelper);
export const sendServerError = ResponseHelper.serverError.bind(ResponseHelper);
