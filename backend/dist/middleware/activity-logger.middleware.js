"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logDataChange = exports.logAuth = exports.logActivityDirect = exports.logActivity = exports["default"] = exports.batchLogActivities = void 0;
var _agendaService = _interopRequireDefault(require("../services/agenda.service.js"));
var _activityConstants = require("../utils/constants/activity.constants.js");
var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));
var _geoipLite = _interopRequireDefault(require("geoip-lite"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * Activity Logger Middleware
 * Async activity logging for routes using Agenda.js
 * Zero-latency, fire-and-forget logging
 */
/**
 * Parse user agent string to extract device, browser, and OS info
 * @param {string} userAgent - User agent string from request headers
 * @returns {Object} Parsed device information
 */
var parseUserAgent = function parseUserAgent(userAgent) {
  if (!userAgent) return null;
  var parser = new _uaParserJs["default"](userAgent);
  var result = parser.getResult();

  // Determine device type
  var deviceType = "desktop";
  if (result.device.type === "mobile") deviceType = "mobile";else if (result.device.type === "tablet") deviceType = "tablet";else if (result.device.type) deviceType = result.device.type;
  return {
    device_type: deviceType,
    browser: {
      name: result.browser.name || "unknown",
      version: result.browser.version || "unknown"
    },
    os: {
      name: result.os.name || "unknown",
      version: result.os.version || "unknown"
    }
  };
};

/**
 * Get location information from IP address
 * @param {string} ip - IP address
 * @returns {Object} Location information
 */
var getLocationFromIP = function getLocationFromIP(ip) {
  if (!ip || ip === "::1" || ip === "127.0.0.1" || ip === "localhost") {
    return null;
  }

  // Extract IPv4 from IPv6 format (::ffff:192.168.1.1)
  var ipv4Match = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)/);
  var cleanIp = ipv4Match ? ipv4Match[1] : ip;
  var geo = _geoipLite["default"].lookup(cleanIp);
  if (!geo) return null;
  return {
    country: geo.country || "unknown",
    region: geo.region || "unknown",
    city: geo.city || "unknown",
    timezone: geo.timezone || "unknown"
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
var logActivity = exports.logActivity = function logActivity(action, entityType) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (req, res, next) {
    // Store original send to intercept response
    var originalSend = res.send;
    res.send = function (data) {
      // Only log successful responses (2xx status codes)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        var _req$user, _req$user2, _req$session;
        // Extract entity ID from various sources
        var entityId = null;
        if (options.getEntityId) {
          entityId = options.getEntityId(req, res);
        } else {
          // Try common patterns
          entityId = req.params.id || req.params.candidateId || req.params.eventId || req.params.categoryId || res.locals.entityId || res.locals.createdId || null;
        }

        // Generate description
        var description = options.getDescription ? options.getDescription(req, res) : "".concat(action, " completed successfully");

        // Generate metadata
        var metadata = options.getMetadata ? options.getMetadata(req, res) : {};

        // Extract event context if available
        var eventId = req.params.eventId || req.body && req.body.event_id || res.locals.eventId || null;

        // Parse user agent and IP location
        var ipAddress = req.ip || req.connection.remoteAddress;
        var userAgent = req.headers["user-agent"];
        var device = parseUserAgent(userAgent);
        var location = getLocationFromIP(ipAddress);

        // Queue activity log (async, non-blocking)
        _agendaService["default"].now("log-activity", {
          userId: ((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user._id) || ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.id) || null,
          action: action,
          entityType: entityType,
          entityId: entityId,
          eventId: eventId,
          description: description,
          severity: options.severity || "info",
          ipAddress: ipAddress,
          userAgent: userAgent,
          device: device,
          location: location,
          sessionId: req.sessionID || ((_req$session = req.session) === null || _req$session === void 0 ? void 0 : _req$session.id) || null,
          metadata: metadata
        })["catch"](function (error) {
          // Fail silently - don't break the response
          console.error("[Activity Logger] Failed to queue activity: ".concat(error.message));
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
var logAuth = exports.logAuth = function logAuth(action) {
  var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return function (req, res, next) {
    var originalSend = res.send;
    res.send = function (data) {
      if (success && res.statusCode >= 200 && res.statusCode < 300) {
        var _req$user3, _req$session2, _req$body, _req$user4;
        var userId = ((_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3._id) || res.locals.userId;
        var ipAddress = req.ip || req.connection.remoteAddress;
        var userAgent = req.headers["user-agent"];
        var device = parseUserAgent(userAgent);
        var location = getLocationFromIP(ipAddress);
        _agendaService["default"].now("log-activity", {
          userId: userId,
          action: action,
          entityType: _activityConstants.ENTITY_TYPE.USER,
          entityId: userId,
          description: "User ".concat(action.toLowerCase(), " ").concat(success ? "successful" : "failed"),
          severity: success ? "info" : "warning",
          ipAddress: ipAddress,
          userAgent: userAgent,
          device: device,
          location: location,
          sessionId: req.sessionID || ((_req$session2 = req.session) === null || _req$session2 === void 0 ? void 0 : _req$session2.id) || null,
          metadata: {
            success: success,
            email: ((_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.email) || ((_req$user4 = req.user) === null || _req$user4 === void 0 ? void 0 : _req$user4.email)
          }
        })["catch"](function (error) {
          console.error("[Activity Logger] Failed to log auth: ".concat(error.message));
        });
      } else if (!success) {
        var _req$body2;
        // Log failed auth immediately, even on error response
        var _ipAddress = req.ip || req.connection.remoteAddress;
        var _userAgent = req.headers["user-agent"];
        var _device = parseUserAgent(_userAgent);
        var _location = getLocationFromIP(_ipAddress);
        _agendaService["default"].now("log-activity", {
          userId: null,
          action: _activityConstants.ACTION_TYPE.FAILED_LOGIN,
          entityType: _activityConstants.ENTITY_TYPE.USER,
          description: "Failed login attempt",
          severity: "warning",
          ipAddress: _ipAddress,
          userAgent: _userAgent,
          device: _device,
          location: _location,
          metadata: {
            email: (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.email,
            reason: res.locals.failureReason || "invalid_credentials"
          }
        })["catch"](function (error) {
          console.error("[Activity Logger] Failed to log failed auth: ".concat(error.message));
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
var logDataChange = exports.logDataChange = function logDataChange(action, entityType, getChanges) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
      var beforeData, originalSend;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return getChanges(req, "before")["catch"](function () {
              return null;
            });
          case 1:
            beforeData = _context.v;
            res.locals.beforeData = beforeData;
            originalSend = res.send;
            res.send = function (data) {
              if (res.statusCode >= 200 && res.statusCode < 300) {
                // Capture "after" state
                Promise.resolve(getChanges(req, "after", res)).then(function (afterData) {
                  var _req$user5;
                  var entityId = req.params.id || res.locals.entityId;
                  var ipAddress = req.ip || req.connection.remoteAddress;
                  var userAgent = req.headers["user-agent"];
                  var device = parseUserAgent(userAgent);
                  var location = getLocationFromIP(ipAddress);
                  _agendaService["default"].now("log-activity", {
                    userId: (_req$user5 = req.user) === null || _req$user5 === void 0 ? void 0 : _req$user5._id,
                    action: action,
                    entityType: entityType,
                    entityId: entityId,
                    description: "".concat(entityType, " ").concat(action.toLowerCase()),
                    severity: "info",
                    ipAddress: ipAddress,
                    userAgent: userAgent,
                    device: device,
                    location: location,
                    changes: {
                      before: beforeData,
                      after: afterData
                    }
                  })["catch"](function (error) {
                    console.error("[Activity Logger] Failed to log data change: ".concat(error.message));
                  });
                })["catch"](function (error) {
                  console.error("[Activity Logger] Failed to capture after state: ".concat(error.message));
                });
              }
              return originalSend.call(this, data);
            };
            next();
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

/**
 * Batch log multiple activities (for bulk operations)
 * Call this directly in controllers for bulk operations
 * @param {Array} activities - Array of activity objects
 * @returns {Promise<void>}
 */
var batchLogActivities = exports.batchLogActivities = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(activities) {
    var _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return _agendaService["default"].now("batch-log-activities", {
            activities: activities
          });
        case 1:
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t = _context2.v;
          console.error("[Activity Logger] Failed to batch log: ".concat(_t.message));
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function batchLogActivities(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Direct activity logger (bypass middleware)
 * Use this in services or controllers when you need manual control
 * @param {Object} activityData - Activity data
 * @returns {Promise<void>}
 */
var logActivityDirect = exports.logActivityDirect = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(activityData) {
    var _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return _agendaService["default"].now("log-activity", activityData);
        case 1:
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t2 = _context3.v;
          console.error("[Activity Logger] Failed to log activity: ".concat(_t2.message));
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function logActivityDirect(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  logActivity: logActivity,
  logAuth: logAuth,
  logDataChange: logDataChange,
  batchLogActivities: batchLogActivities,
  logActivityDirect: logActivityDirect
};