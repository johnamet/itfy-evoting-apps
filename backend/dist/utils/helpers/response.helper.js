"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendValidationError = exports.sendUnauthorized = exports.sendTooManyRequests = exports.sendSuccess = exports.sendServerError = exports.sendPaginated = exports.sendNotFound = exports.sendNoContent = exports.sendForbidden = exports.sendError = exports.sendCreated = exports.sendConflict = exports.sendBadRequest = exports.ResponseHelper = exports.HTTP_STATUS = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Response Helper Utility
 * Provides standardized API response functions for consistent
 * response formats across the application
 */

/**
 * HTTP Status Codes commonly used
 */
var HTTP_STATUS = exports.HTTP_STATUS = {
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
  SERVICE_UNAVAILABLE: 503
};
var ResponseHelper = exports.ResponseHelper = /*#__PURE__*/function () {
  function ResponseHelper() {
    _classCallCheck(this, ResponseHelper);
  }
  return _createClass(ResponseHelper, null, [{
    key: "success",
    value:
    /**
     * Send a success response
     * @param {Object} res - Express response object
     * @param {Object} options - Response options
     * @param {*} options.data - Response data
     * @param {string} options.message - Success message
     * @param {number} options.status_code - HTTP status code (default: 200)
     * @returns {Object} - Express response
     */
    function success(res) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? null : _ref$data,
        _ref$message = _ref.message,
        message = _ref$message === void 0 ? "Success" : _ref$message,
        _ref$status_code = _ref.status_code,
        status_code = _ref$status_code === void 0 ? HTTP_STATUS.OK : _ref$status_code;
      return res.status(status_code).json({
        success: true,
        message: message,
        data: data
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
  }, {
    key: "error",
    value: function error(res) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$message = _ref2.message,
        message = _ref2$message === void 0 ? "An error occurred" : _ref2$message,
        _ref2$status_code = _ref2.status_code,
        status_code = _ref2$status_code === void 0 ? HTTP_STATUS.INTERNAL_SERVER_ERROR : _ref2$status_code,
        _ref2$errors = _ref2.errors,
        errors = _ref2$errors === void 0 ? null : _ref2$errors;
      var response = {
        success: false,
        message: message
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
  }, {
    key: "paginated",
    value: function paginated(res, _ref3) {
      var data = _ref3.data,
        page = _ref3.page,
        limit = _ref3.limit,
        total_items = _ref3.total_items,
        _ref3$message = _ref3.message,
        message = _ref3$message === void 0 ? "Data fetched successfully" : _ref3$message;
      var total_pages = Math.ceil(total_items / limit);
      var has_next = page < total_pages;
      var has_prev = page > 1;
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: message,
        data: data,
        pagination: {
          page: page,
          limit: limit,
          total_items: total_items,
          total_pages: total_pages,
          has_next: has_next,
          has_prev: has_prev
        }
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
  }, {
    key: "created",
    value: function created(res) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        data = _ref4.data,
        _ref4$message = _ref4.message,
        message = _ref4$message === void 0 ? "Resource created successfully" : _ref4$message;
      return this.success(res, {
        data: data,
        message: message,
        status_code: HTTP_STATUS.CREATED
      });
    }

    /**
     * Send a no content response (204)
     * @param {Object} res - Express response object
     * @returns {Object} - Express response
     */
  }, {
    key: "noContent",
    value: function noContent(res) {
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
  }, {
    key: "badRequest",
    value: function badRequest(res) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref5$message = _ref5.message,
        message = _ref5$message === void 0 ? "Bad request" : _ref5$message,
        _ref5$errors = _ref5.errors,
        errors = _ref5$errors === void 0 ? null : _ref5$errors;
      return this.error(res, {
        message: message,
        status_code: HTTP_STATUS.BAD_REQUEST,
        errors: errors
      });
    }

    /**
     * Send an unauthorized response (401)
     * @param {Object} res - Express response object
     * @param {Object} options - Response options
     * @param {string} options.message - Error message
     * @returns {Object} - Express response
     */
  }, {
    key: "unauthorized",
    value: function unauthorized(res) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref6$message = _ref6.message,
        message = _ref6$message === void 0 ? "Unauthorized access" : _ref6$message;
      return this.error(res, {
        message: message,
        status_code: HTTP_STATUS.UNAUTHORIZED
      });
    }

    /**
     * Send a forbidden response (403)
     * @param {Object} res - Express response object
     * @param {Object} options - Response options
     * @param {string} options.message - Error message
     * @returns {Object} - Express response
     */
  }, {
    key: "forbidden",
    value: function forbidden(res) {
      var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref7$message = _ref7.message,
        message = _ref7$message === void 0 ? "Access forbidden" : _ref7$message;
      return this.error(res, {
        message: message,
        status_code: HTTP_STATUS.FORBIDDEN
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
  }, {
    key: "notFound",
    value: function notFound(res) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref8$message = _ref8.message,
        message = _ref8$message === void 0 ? null : _ref8$message,
        _ref8$resource = _ref8.resource,
        resource = _ref8$resource === void 0 ? "Resource" : _ref8$resource;
      return this.error(res, {
        message: message || "".concat(resource, " not found"),
        status_code: HTTP_STATUS.NOT_FOUND
      });
    }

    /**
     * Send a conflict response (409)
     * @param {Object} res - Express response object
     * @param {Object} options - Response options
     * @param {string} options.message - Error message
     * @returns {Object} - Express response
     */
  }, {
    key: "conflict",
    value: function conflict(res) {
      var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref9$message = _ref9.message,
        message = _ref9$message === void 0 ? "Resource conflict" : _ref9$message;
      return this.error(res, {
        message: message,
        status_code: HTTP_STATUS.CONFLICT
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
  }, {
    key: "validationError",
    value: function validationError(res) {
      var _ref0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref0$message = _ref0.message,
        message = _ref0$message === void 0 ? "Validation failed" : _ref0$message,
        _ref0$errors = _ref0.errors,
        errors = _ref0$errors === void 0 ? null : _ref0$errors;
      var response = {
        success: false,
        message: message
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
  }, {
    key: "tooManyRequests",
    value: function tooManyRequests(res) {
      var _ref1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref1$message = _ref1.message,
        message = _ref1$message === void 0 ? "Too many requests" : _ref1$message,
        _ref1$retry_after = _ref1.retry_after,
        retry_after = _ref1$retry_after === void 0 ? null : _ref1$retry_after;
      if (retry_after) {
        res.set("Retry-After", retry_after);
      }
      return this.error(res, {
        message: message,
        status_code: HTTP_STATUS.TOO_MANY_REQUESTS
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
  }, {
    key: "serverError",
    value: function serverError(res) {
      var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref10$message = _ref10.message,
        message = _ref10$message === void 0 ? "Internal server error" : _ref10$message,
        _ref10$error = _ref10.error,
        error = _ref10$error === void 0 ? null : _ref10$error;
      var errors = error && process.env.NODE_ENV === "development" ? {
        stack: error.stack,
        details: error.message
      } : null;
      return this.error(res, {
        message: message,
        status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        errors: errors
      });
    }
  }]);
}(); // Convenience function exports for direct imports
var sendSuccess = exports.sendSuccess = ResponseHelper.success.bind(ResponseHelper);
var sendError = exports.sendError = ResponseHelper.error.bind(ResponseHelper);
var sendPaginated = exports.sendPaginated = ResponseHelper.paginated.bind(ResponseHelper);
var sendCreated = exports.sendCreated = ResponseHelper.created.bind(ResponseHelper);
var sendNoContent = exports.sendNoContent = ResponseHelper.noContent.bind(ResponseHelper);
var sendBadRequest = exports.sendBadRequest = ResponseHelper.badRequest.bind(ResponseHelper);
var sendUnauthorized = exports.sendUnauthorized = ResponseHelper.unauthorized.bind(ResponseHelper);
var sendForbidden = exports.sendForbidden = ResponseHelper.forbidden.bind(ResponseHelper);
var sendNotFound = exports.sendNotFound = ResponseHelper.notFound.bind(ResponseHelper);
var sendConflict = exports.sendConflict = ResponseHelper.conflict.bind(ResponseHelper);
var sendValidationError = exports.sendValidationError = ResponseHelper.validationError.bind(ResponseHelper);
var sendTooManyRequests = exports.sendTooManyRequests = ResponseHelper.tooManyRequests.bind(ResponseHelper);
var sendServerError = exports.sendServerError = ResponseHelper.serverError.bind(ResponseHelper);