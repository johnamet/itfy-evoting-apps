"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _async_hooks = require("async_hooks");
var _responseHelper = require("../../utils/helpers/response.helper.js");
var _errorConstants = require("../../utils/constants/error.constants.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
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
var asyncLocalStorage = new _async_hooks.AsyncLocalStorage();

/**
 * @abstract
 * @class BaseController
 */
var BaseController = /*#__PURE__*/function () {
  /**
   * @param {Object} services - Injected services (e.g., { userService, eventService })
   * @param {Object} [options] - Optional configuration
   * @param {boolean} [options.enableLogging=true] - Enable console logging
   */
  function BaseController() {
    var services = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, BaseController);
    if ((this instanceof BaseController ? this.constructor : void 0) === BaseController) {
      throw new Error("BaseController is abstract and cannot be instantiated directly");
    }
    this._services = _objectSpread({}, services);
    this.options = _objectSpread({
      enableLogging: true
    }, options);

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
  return _createClass(BaseController, [{
    key: "runInContext",
    value: function runInContext(context, callback) {
      return asyncLocalStorage.run(context, callback);
    }

    /**
     * Get current async context
     * @returns {Object|null}
     */
  }, {
    key: "getContext",
    value: function getContext() {
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
  }, {
    key: "service",
    value: function service(name) {
      var service = this._services[name];
      if (!service) {
        throw new Error("Service '".concat(name, "' not injected into ").concat(this.constructor.name, ". Available: ").concat(Object.keys(this._services).join(", ") || "none"));
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
  }, {
    key: "getPagination",
    value: function getPagination(req) {
      var page = Math.max(1, parseInt(req.query.page, 10) || _errorConstants.DEFAULT_PAGINATION.PAGE);
      var limit = Math.min(Math.max(1, parseInt(req.query.limit, 10) || _errorConstants.DEFAULT_PAGINATION.LIMIT), _errorConstants.DEFAULT_PAGINATION.MAX_LIMIT);
      var skip = (page - 1) * limit;
      return {
        page: page,
        limit: limit,
        skip: skip
      };
    }

    /**
     * Extract filters from request query
     * @param {Object} req - Express request
     * @param {string[]} allowedFields - Allowed filter fields
     * @returns {Object}
     */
  }, {
    key: "getFilters",
    value: function getFilters(req) {
      var allowedFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var filters = {};
      allowedFields.forEach(function (field) {
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
  }, {
    key: "getSort",
    value: function getSort(req) {
      var defaultSort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-created_at";
      var sortParam = req.query.sort || defaultSort;
      var sort = {};
      sortParam.split(",").forEach(function (field) {
        var trimmed = field.trim();
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
  }, {
    key: "getSelect",
    value: function getSelect(req) {
      return req.query.select || null;
    }

    /**
     * Extract search term from request query
     * @param {Object} req - Express request
     * @param {string} [paramName='search'] - Query parameter name
     * @returns {string|null}
     */
  }, {
    key: "getSearch",
    value: function getSearch(req) {
      var paramName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "search";
      return req.query[paramName] || null;
    }

    /**
     * Get authenticated user from request
     * @param {Object} req - Express request
     * @returns {Object|null}
     */
  }, {
    key: "getUser",
    value: function getUser(req) {
      return req.user || null;
    }

    /**
     * Get authenticated user ID from request
     * @param {Object} req - Express request
     * @returns {string|null}
     */
  }, {
    key: "getUserId",
    value: function getUserId(req) {
      var _req$user, _req$user2;
      return ((_req$user = req.user) === null || _req$user === void 0 || (_req$user = _req$user._id) === null || _req$user === void 0 ? void 0 : _req$user.toString()) || ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.id) || null;
    }

    /**
     * Check if user is authenticated
     * @param {Object} req - Express request
     * @returns {boolean}
     */
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated(req) {
      return !!req.user;
    }

    /**
     * Check if user has specific role
     * @param {Object} req - Express request
     * @param {string} role - Role to check
     * @returns {boolean}
     */
  }, {
    key: "hasRole",
    value: function hasRole(req, role) {
      var _req$user3;
      return ((_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.role) === role;
    }

    /**
     * Check if user has any of the specified roles
     * @param {Object} req - Express request
     * @param {string[]} roles - Roles to check
     * @returns {boolean}
     */
  }, {
    key: "hasAnyRole",
    value: function hasAnyRole(req, roles) {
      return req.user && roles.includes(req.user.role);
    }

    /**
     * Get client IP address from request
     * @param {Object} req - Express request
     * @returns {string|null}
     */
  }, {
    key: "getClientIP",
    value: function getClientIP(req) {
      var _req$headers$xForwar, _req$socket;
      return ((_req$headers$xForwar = req.headers["x-forwarded-for"]) === null || _req$headers$xForwar === void 0 || (_req$headers$xForwar = _req$headers$xForwar.split(",")[0]) === null || _req$headers$xForwar === void 0 ? void 0 : _req$headers$xForwar.trim()) || ((_req$socket = req.socket) === null || _req$socket === void 0 ? void 0 : _req$socket.remoteAddress) || req.ip || null;
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
  }, {
    key: "success",
    value: function success(res) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? null : _ref$data,
        _ref$message = _ref.message,
        message = _ref$message === void 0 ? "Success" : _ref$message,
        _ref$status_code = _ref.status_code,
        status_code = _ref$status_code === void 0 ? _responseHelper.HTTP_STATUS.OK : _ref$status_code;
      return _responseHelper.ResponseHelper.success(res, {
        data: data,
        message: message,
        status_code: status_code
      });
    }

    /**
     * Send created response (201)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {*} options.data - Created resource data
     * @param {string} [options.message='Created successfully'] - Success message
     */
  }, {
    key: "created",
    value: function created(res) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        data = _ref2.data,
        _ref2$message = _ref2.message,
        message = _ref2$message === void 0 ? "Created successfully" : _ref2$message;
      return _responseHelper.ResponseHelper.created(res, {
        data: data,
        message: message
      });
    }

    /**
     * Send no content response (204)
     * @param {Object} res - Express response
     */
  }, {
    key: "noContent",
    value: function noContent(res) {
      return _responseHelper.ResponseHelper.noContent(res);
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
  }, {
    key: "paginated",
    value: function paginated(res, _ref3) {
      var data = _ref3.data,
        page = _ref3.page,
        limit = _ref3.limit,
        total_items = _ref3.total_items,
        _ref3$message = _ref3.message,
        message = _ref3$message === void 0 ? "Data fetched successfully" : _ref3$message;
      return _responseHelper.ResponseHelper.paginated(res, {
        data: data,
        page: page,
        limit: limit,
        total_items: total_items,
        message: message
      });
    }

    /**
     * Send error response
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} options.message - Error message
     * @param {number} [options.status_code=500] - HTTP status code
     * @param {*} [options.errors] - Additional error details
     */
  }, {
    key: "error",
    value: function error(res) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$message = _ref4.message,
        message = _ref4$message === void 0 ? _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR : _ref4$message,
        _ref4$status_code = _ref4.status_code,
        status_code = _ref4$status_code === void 0 ? _responseHelper.HTTP_STATUS.INTERNAL_SERVER_ERROR : _ref4$status_code,
        _ref4$errors = _ref4.errors,
        errors = _ref4$errors === void 0 ? null : _ref4$errors;
      return _responseHelper.ResponseHelper.error(res, {
        message: message,
        status_code: status_code,
        errors: errors
      });
    }

    /**
     * Send bad request error (400)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     * @param {*} [options.errors] - Error details
     */
  }, {
    key: "badRequest",
    value: function badRequest(res) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref5$message = _ref5.message,
        message = _ref5$message === void 0 ? _errorConstants.ERROR_MESSAGES.INVALID_REQUEST : _ref5$message,
        _ref5$errors = _ref5.errors,
        errors = _ref5$errors === void 0 ? null : _ref5$errors;
      return _responseHelper.ResponseHelper.badRequest(res, {
        message: message,
        errors: errors
      });
    }

    /**
     * Send unauthorized error (401)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     */
  }, {
    key: "unauthorized",
    value: function unauthorized(res) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref6$message = _ref6.message,
        message = _ref6$message === void 0 ? _errorConstants.ERROR_MESSAGES.UNAUTHORIZED : _ref6$message;
      return _responseHelper.ResponseHelper.unauthorized(res, {
        message: message
      });
    }

    /**
     * Send forbidden error (403)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     */
  }, {
    key: "forbidden",
    value: function forbidden(res) {
      var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref7$message = _ref7.message,
        message = _ref7$message === void 0 ? _errorConstants.ERROR_MESSAGES.FORBIDDEN : _ref7$message;
      return _responseHelper.ResponseHelper.forbidden(res, {
        message: message
      });
    }

    /**
     * Send not found error (404)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     * @param {string} [options.resource] - Resource type
     */
  }, {
    key: "notFound",
    value: function notFound(res) {
      var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref8$message = _ref8.message,
        message = _ref8$message === void 0 ? null : _ref8$message,
        _ref8$resource = _ref8.resource,
        resource = _ref8$resource === void 0 ? "Resource" : _ref8$resource;
      return _responseHelper.ResponseHelper.notFound(res, {
        message: message,
        resource: resource
      });
    }

    /**
     * Send conflict error (409)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     */
  }, {
    key: "conflict",
    value: function conflict(res) {
      var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref9$message = _ref9.message,
        message = _ref9$message === void 0 ? "Resource already exists" : _ref9$message;
      return _responseHelper.ResponseHelper.conflict(res, {
        message: message
      });
    }

    /**
     * Send validation error (422)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     * @param {*} [options.errors] - Validation error details
     */
  }, {
    key: "validationError",
    value: function validationError(res) {
      var _ref0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref0$message = _ref0.message,
        message = _ref0$message === void 0 ? "Validation failed" : _ref0$message,
        _ref0$errors = _ref0.errors,
        errors = _ref0$errors === void 0 ? null : _ref0$errors;
      return _responseHelper.ResponseHelper.validationError(res, {
        message: message,
        errors: errors
      });
    }

    /**
     * Send too many requests error (429)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     * @param {number} [options.retry_after] - Retry after seconds
     */
  }, {
    key: "tooManyRequests",
    value: function tooManyRequests(res) {
      var _ref1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref1$message = _ref1.message,
        message = _ref1$message === void 0 ? _errorConstants.ERROR_MESSAGES.TOO_MANY_REQUESTS : _ref1$message,
        _ref1$retry_after = _ref1.retry_after,
        retry_after = _ref1$retry_after === void 0 ? null : _ref1$retry_after;
      return _responseHelper.ResponseHelper.tooManyRequests(res, {
        message: message,
        retry_after: retry_after
      });
    }

    /**
     * Send server error (500)
     * @param {Object} res - Express response
     * @param {Object} options - Response options
     * @param {string} [options.message] - Error message
     * @param {Error} [options.error] - Error object
     */
  }, {
    key: "serverError",
    value: function serverError(res) {
      var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref10$message = _ref10.message,
        message = _ref10$message === void 0 ? _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR : _ref10$message,
        _ref10$error = _ref10.error,
        error = _ref10$error === void 0 ? null : _ref10$error;
      return _responseHelper.ResponseHelper.serverError(res, {
        message: message,
        error: error
      });
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
  }, {
    key: "validate",
    value: function validate(data, schema) {
      if (!this.constructor.validation) {
        throw new Error("Validation library not attached. Call BaseController.setValidation(Joi) at app startup.");
      }
      var _schema$validate = schema.validate(data, {
          abortEarly: false,
          stripUnknown: true
        }),
        error = _schema$validate.error,
        value = _schema$validate.value;
      if (error) {
        var details = error.details.map(function (d) {
          return {
            field: d.path.join("."),
            message: d.message
          };
        });
        var err = new Error("Validation failed");
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
  }, {
    key: "wrap",
    value:
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
    function wrap(fn) {
      var _this = this;
      return /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
          var _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                _context.p = 0;
                _context.n = 1;
                return fn.call(_this, req, res, next);
              case 1:
                _context.n = 3;
                break;
              case 2:
                _context.p = 2;
                _t = _context.v;
                _this.handleError(res, _t, req);
              case 3:
                return _context.a(2);
            }
          }, _callee, null, [[0, 2]]);
        }));
        return function (_x, _x2, _x3) {
          return _ref11.apply(this, arguments);
        };
      }();
    }

    /**
     * Handle errors and send appropriate response
     * @param {Object} res - Express response
     * @param {Error} error - Error object
     * @param {Object} [req] - Express request (optional, for logging)
     */
  }, {
    key: "handleError",
    value: function handleError(res, error) {
      var req = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      // Log error
      this.log("error", {
        action: req === null || req === void 0 ? void 0 : req.originalUrl,
        method: req === null || req === void 0 ? void 0 : req.method,
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      });

      // Validation errors
      if (error.isValidationError) {
        return this.validationError(res, {
          message: "Validation failed",
          errors: error.details
        });
      }

      // Mongoose CastError (invalid ObjectId)
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return this.badRequest(res, {
          message: _errorConstants.ERROR_MESSAGES.INVALID_OBJECT_ID
        });
      }

      // Mongoose duplicate key error
      if (error.code === 11000) {
        var field = Object.keys(error.keyPattern || {})[0] || "field";
        return this.conflict(res, {
          message: "A record with this ".concat(field, " already exists")
        });
      }

      // Custom error status codes
      if (error.statusCode) {
        return this.error(res, {
          message: error.message,
          status_code: error.statusCode
        });
      }

      // Error message pattern matching
      var message = error.message.toLowerCase();
      if (message.includes("not found")) {
        return this.notFound(res, {
          message: error.message
        });
      }
      if (message.includes("unauthorized") || message.includes("invalid credentials") || message.includes("invalid token")) {
        return this.unauthorized(res, {
          message: error.message
        });
      }
      if (message.includes("forbidden") || message.includes("permission") || message.includes("access denied")) {
        return this.forbidden(res, {
          message: error.message
        });
      }
      if (message.includes("already exists") || message.includes("duplicate")) {
        return this.conflict(res, {
          message: error.message
        });
      }
      if (message.includes("validation failed")) {
        return this.validationError(res, {
          message: error.message
        });
      }

      // Default: Internal server error
      return this.serverError(res, {
        message: _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        error: error
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
  }, {
    key: "log",
    value: function log(level) {
      var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.options.enableLogging) return;
      var context = this.getContext() || {};
      var logEntry = _objectSpread(_objectSpread({
        timestamp: new Date().toISOString(),
        level: level,
        controller: this.constructor.name
      }, context), meta);

      // Replace with structured logger (Winston/Pino) in production
      if (level === "error") {
        console.error(JSON.stringify(logEntry));
      } else {
        console.log(JSON.stringify(logEntry));
      }
    }
  }], [{
    key: "setValidation",
    value: function setValidation(validationLibrary) {
      if (this.validation) {
        console.warn("Validation library already attached to BaseController. Overwriting...");
      }
      this.validation = validationLibrary;
    }
  }]);
}();
var _default = exports["default"] = BaseController;