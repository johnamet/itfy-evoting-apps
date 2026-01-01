"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.superAdminOnly = exports.requirePermission = exports.requireOwnership = exports.requireEmailVerification = exports.optionalAuth = exports["default"] = exports.authorize = exports.authenticateCandidate = exports.authenticate = exports.authRateLimit = exports.adminOnly = void 0;
var _authHelper = require("../utils/helpers/auth.helper.js");
var _responseHelper = require("../utils/helpers/response.helper.js");
var _errorConstants = require("../utils/constants/error.constants.js");
var _userConstants = require("../utils/constants/user.constants.js");
var _cacheUtils = _interopRequireDefault(require("../utils/cache/cache.utils.js"));
var _userRepository = _interopRequireDefault(require("../modules/user/user.repository.js"));
var _candidateRepository = _interopRequireDefault(require("../modules/candidate/candidate.repository.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * Authentication & Authorization Middleware
 * Handles JWT verification, role-based access control, and token blacklisting
 * Integrates with AuthHelpers, cache (Redis), and repositories
 */
/**
 * Extract JWT token from Authorization header
 * @param {Object} req - Express request object
 * @returns {string|null} - Extracted token or null
 * @private
 */
var extractToken = function extractToken(req) {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }

  // Support both "Bearer <token>" and "<token>" formats
  var parts = authHeader.split(" ");
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
var authenticate = exports.authenticate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var token, isBlacklisted, payload, message, user, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          // 1. Extract token from header
          token = extractToken(req);
          if (token) {
            _context.n = 1;
            break;
          }
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Authentication required. Please provide a valid token.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 1:
          _context.n = 2;
          return _authHelper.AuthHelpers.isTokenBlacklisted(token);
        case 2:
          isBlacklisted = _context.v;
          if (!isBlacklisted) {
            _context.n = 3;
            break;
          }
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "This token has been revoked. Please log in again.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 3:
          _context.p = 3;
          payload = _authHelper.AuthHelpers.verifyToken(token);
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          message = _t.message.includes("expired") ? _errorConstants.ERROR_MESSAGES.TOKEN_EXPIRED : _errorConstants.ERROR_MESSAGES.INVALID_TOKEN;
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: message,
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 5:
          _context.n = 6;
          return _userRepository["default"].findById(payload.sub, {
            select: "email role is_active status deleted_at permissions",
            lean: true
          });
        case 6:
          user = _context.v;
          if (user) {
            _context.n = 7;
            break;
          }
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "User account not found.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 7:
          if (!user.deleted_at) {
            _context.n = 8;
            break;
          }
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "This account has been deleted.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 8:
          if (!(user.status === "inactive")) {
            _context.n = 9;
            break;
          }
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Your account has been deactivated. Contact support.",
            status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
          }));
        case 9:
          if (!(user.status === "suspended")) {
            _context.n = 10;
            break;
          }
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Your account has been suspended. Contact support.",
            status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
          }));
        case 10:
          // 6. Attach user info to request object
          req.user = {
            id: user._id.toString(),
            _id: user._id,
            email: user.email,
            role: user.role,
            status: user.status,
            permissions: user.permissions || []
          };
          req.token = token;
          next();
          _context.n = 12;
          break;
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          console.error("Authentication error:", _t2);
          return _context.a(2, _responseHelper.ResponseHelper.error(res, {
            message: _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            status_code: _responseHelper.HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errors: _t2
          }));
        case 12:
          return _context.a(2);
      }
    }, _callee, null, [[3, 4], [0, 11]]);
  }));
  return function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Candidate authentication middleware
 * Verifies JWT token for candidate users
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next middleware
 * @returns {void}
 */
var authenticateCandidate = exports.authenticateCandidate = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var token, isBlacklisted, payload, message, candidate, _t3, _t4;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          // 1. Extract token from header
          token = extractToken(req);
          if (token) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Authentication required. Please provide a valid token.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 1:
          _context2.n = 2;
          return _authHelper.AuthHelpers.isTokenBlacklisted(token);
        case 2:
          isBlacklisted = _context2.v;
          if (!isBlacklisted) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "This token has been revoked. Please log in again.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 3:
          _context2.p = 3;
          payload = _authHelper.AuthHelpers.verifyToken(token);
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t3 = _context2.v;
          message = _t3.message.includes("expired") ? _errorConstants.ERROR_MESSAGES.TOKEN_EXPIRED : _errorConstants.ERROR_MESSAGES.INVALID_TOKEN;
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: message,
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 5:
          _context2.n = 6;
          return _candidateRepository["default"].findById(payload.sub, {
            select: "name email code status event categories deleted_at",
            lean: true
          });
        case 6:
          candidate = _context2.v;
          if (candidate) {
            _context2.n = 7;
            break;
          }
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Candidate account not found.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 7:
          if (!candidate.deleted_at) {
            _context2.n = 8;
            break;
          }
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "This account has been deleted.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 8:
          if (!(candidate.status === "suspended")) {
            _context2.n = 9;
            break;
          }
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Your candidacy has been suspended. Contact the organizer.",
            status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
          }));
        case 9:
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
            categories: candidate.categories
          };
          req.token = token;
          next();
          _context2.n = 11;
          break;
        case 10:
          _context2.p = 10;
          _t4 = _context2.v;
          console.error("Candidate authentication error:", _t4);
          return _context2.a(2, _responseHelper.ResponseHelper.error(res, {
            message: _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            status_code: _responseHelper.HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errors: _t4
          }));
        case 11:
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 4], [0, 10]]);
  }));
  return function authenticateCandidate(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

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
var authorize = exports.authorize = function authorize() {
  for (var _len = arguments.length, allowedRoles = new Array(_len), _key = 0; _key < _len; _key++) {
    allowedRoles[_key] = arguments[_key];
  }
  return function (req, res, next) {
    // Must be authenticated first
    if (!req.user) {
      return _responseHelper.ResponseHelper.error(res, {
        message: "Authentication required.",
        status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
      });
    }

    // Check if user's role is in allowed roles
    if (!allowedRoles.includes(req.user.role) && req.user.role !== "super" && req.user.role !== "super_admin") {
      return _responseHelper.ResponseHelper.error(res, {
        message: "Access restricted to: ".concat(allowedRoles.join(", ")),
        status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
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
var optionalAuth = exports.optionalAuth = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var token, isBlacklisted, payload, user, _t5, _t6;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          token = extractToken(req);
          if (token) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, next());
        case 1:
          _context3.n = 2;
          return _authHelper.AuthHelpers.isTokenBlacklisted(token);
        case 2:
          isBlacklisted = _context3.v;
          if (!isBlacklisted) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, next());
        case 3:
          _context3.p = 3;
          payload = _authHelper.AuthHelpers.verifyToken(token); // Get user
          _context3.n = 4;
          return _userRepository["default"].findById(payload.sub, {
            select: "email role is_active status deleted_at permissions",
            lean: true
          });
        case 4:
          user = _context3.v;
          if (user && !user.deleted_at && user.is_active && user.status !== "suspended") {
            req.user = {
              id: user._id.toString(),
              _id: user._id,
              email: user.email,
              role: user.role,
              status: user.status,
              permissions: user.permissions || []
            };
            req.token = token;
          }
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t5 = _context3.v;
        case 6:
          next();
          _context3.n = 8;
          break;
        case 7:
          _context3.p = 7;
          _t6 = _context3.v;
          console.error("Optional auth error:", _t6);
          // Continue even on error
          next();
        case 8:
          return _context3.a(2);
      }
    }, _callee3, null, [[3, 5], [0, 7]]);
  }));
  return function optionalAuth(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

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
var requireOwnership = exports.requireOwnership = function requireOwnership(getResourceOwnerId) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res, next) {
      var resourceOwnerId, _t7;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.p = 0;
            if (req.user) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2, _responseHelper.ResponseHelper.error(res, {
              message: "Authentication required.",
              status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
            }));
          case 1:
            if (![_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN].includes(req.user.role)) {
              _context4.n = 2;
              break;
            }
            return _context4.a(2, next());
          case 2:
            _context4.n = 3;
            return getResourceOwnerId(req);
          case 3:
            resourceOwnerId = _context4.v;
            if (resourceOwnerId) {
              _context4.n = 4;
              break;
            }
            return _context4.a(2, _responseHelper.ResponseHelper.error(res, {
              message: "Resource not found.",
              status_code: _responseHelper.HTTP_STATUS.NOT_FOUND
            }));
          case 4:
            if (!(resourceOwnerId.toString() !== req.user.id)) {
              _context4.n = 5;
              break;
            }
            return _context4.a(2, _responseHelper.ResponseHelper.error(res, {
              message: "You don't have permission to access this resource.",
              status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
            }));
          case 5:
            next();
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t7 = _context4.v;
            console.error("Ownership check error:", _t7);
            return _context4.a(2, _responseHelper.ResponseHelper.error(res, {
              message: _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
              status_code: _responseHelper.HTTP_STATUS.INTERNAL_SERVER_ERROR,
              errors: _t7
            }));
          case 7:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 6]]);
    }));
    return function (_x0, _x1, _x10) {
      return _ref4.apply(this, arguments);
    };
  }();
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
var authRateLimit = exports.authRateLimit = function authRateLimit() {
  var maxAttempts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
  var windowMinutes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res, next) {
      var identifier, key, attempts, _t8;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            _context5.p = 0;
            identifier = req.body.email || req.ip;
            key = "auth_rate_limit:".concat(identifier);
            _context5.n = 1;
            return _cacheUtils["default"].get(key);
          case 1:
            attempts = _context5.v;
            if (!(attempts && parseInt(attempts, 10) >= maxAttempts)) {
              _context5.n = 2;
              break;
            }
            return _context5.a(2, _responseHelper.ResponseHelper.error(res, {
              message: "Too many attempts. Please try again in ".concat(windowMinutes, " minutes."),
              status_code: _responseHelper.HTTP_STATUS.TOO_MANY_REQUESTS
            }));
          case 2:
            if (attempts) {
              _context5.n = 4;
              break;
            }
            _context5.n = 3;
            return _cacheUtils["default"].set(key, "1", "EX", windowMinutes * 60);
          case 3:
            _context5.n = 5;
            break;
          case 4:
            _context5.n = 5;
            return _cacheUtils["default"].incr(key);
          case 5:
            next();
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t8 = _context5.v;
            console.error("Rate limit error:", _t8);
            // Continue on error (fail open)
            next();
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 6]]);
    }));
    return function (_x11, _x12, _x13) {
      return _ref5.apply(this, arguments);
    };
  }();
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
var requireEmailVerification = exports.requireEmailVerification = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res, next) {
    var user, _t9;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          if (req.user) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2, _responseHelper.ResponseHelper.error(res, {
            message: "Authentication required.",
            status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
          }));
        case 1:
          _context6.n = 2;
          return _userRepository["default"].findById(req.user.id, {
            select: "email_verified_at",
            lean: true
          });
        case 2:
          user = _context6.v;
          if (!(!user || !user.email_verified_at)) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, _responseHelper.ResponseHelper.error(res, {
            message: _errorConstants.ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
            status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
          }));
        case 3:
          next();
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t9 = _context6.v;
          console.error("Email verification check error:", _t9);
          return _context6.a(2, _responseHelper.ResponseHelper.error(res, {
            message: _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            status_code: _responseHelper.HTTP_STATUS.INTERNAL_SERVER_ERROR,
            errors: _t9
          }));
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function requireEmailVerification(_x14, _x15, _x16) {
    return _ref6.apply(this, arguments);
  };
}();

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
var requirePermission = exports.requirePermission = function requirePermission() {
  for (var _len2 = arguments.length, requiredPermissions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    requiredPermissions[_key2] = arguments[_key2];
  }
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res, next) {
      var userPermissions, hasPermission, _t0;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            _context7.p = 0;
            if (req.user) {
              _context7.n = 1;
              break;
            }
            return _context7.a(2, _responseHelper.ResponseHelper.error(res, {
              message: "Authentication required.",
              status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
            }));
          case 1:
            if (!(req.user.role === _userConstants.ROLES.SUPER_ADMIN)) {
              _context7.n = 2;
              break;
            }
            return _context7.a(2, next());
          case 2:
            userPermissions = req.user.permissions || []; // Check if user has "super" permission
            if (!userPermissions.includes(_userConstants.PERMISSIONS.SUPER)) {
              _context7.n = 3;
              break;
            }
            return _context7.a(2, next());
          case 3:
            // Check if user has any of the required permissions
            hasPermission = requiredPermissions.some(function (perm) {
              return userPermissions.includes(perm);
            });
            if (hasPermission) {
              _context7.n = 4;
              break;
            }
            return _context7.a(2, _responseHelper.ResponseHelper.error(res, {
              message: "Required permissions: ".concat(requiredPermissions.join(", ")),
              status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
            }));
          case 4:
            next();
            _context7.n = 6;
            break;
          case 5:
            _context7.p = 5;
            _t0 = _context7.v;
            console.error("Permission check error:", _t0);
            return _context7.a(2, _responseHelper.ResponseHelper.error(res, {
              message: _errorConstants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
              status_code: _responseHelper.HTTP_STATUS.INTERNAL_SERVER_ERROR,
              errors: _t0
            }));
          case 6:
            return _context7.a(2);
        }
      }, _callee7, null, [[0, 5]]);
    }));
    return function (_x17, _x18, _x19) {
      return _ref7.apply(this, arguments);
    };
  }();
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
var adminOnly = exports.adminOnly = function adminOnly(req, res, next) {
  if (!req.user) {
    return _responseHelper.ResponseHelper.error(res, {
      message: "Authentication required.",
      status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
    });
  }
  if (![_userConstants.ROLES.ADMIN, _userConstants.ROLES.SUPER_ADMIN].includes(req.user.role)) {
    return _responseHelper.ResponseHelper.error(res, {
      message: _errorConstants.ERROR_MESSAGES.ADMIN_ONLY,
      status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
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
var superAdminOnly = exports.superAdminOnly = function superAdminOnly(req, res, next) {
  if (!req.user) {
    return _responseHelper.ResponseHelper.error(res, {
      message: "Authentication required.",
      status_code: _responseHelper.HTTP_STATUS.UNAUTHORIZED
    });
  }
  if (req.user.role !== _userConstants.ROLES.SUPER_ADMIN) {
    return _responseHelper.ResponseHelper.error(res, {
      message: _errorConstants.ERROR_MESSAGES.SUPER_ADMIN_REQUIRED,
      status_code: _responseHelper.HTTP_STATUS.FORBIDDEN
    });
  }
  next();
};

/**
 * Export all middleware functions
 */
var _default = exports["default"] = {
  authenticate: authenticate,
  authenticateCandidate: authenticateCandidate,
  authorize: authorize,
  optionalAuth: optionalAuth,
  requireOwnership: requireOwnership,
  authRateLimit: authRateLimit,
  requireEmailVerification: requireEmailVerification,
  requirePermission: requirePermission,
  adminOnly: adminOnly,
  superAdminOnly: superAdminOnly
};