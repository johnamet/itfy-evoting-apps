"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ActivityService = void 0;
var _activityRepository = _interopRequireDefault(require("./activity.repository.js"));
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Activity Service
 * Business logic for activity logging and audit trails
 */
var ActivityService = exports.ActivityService = /*#__PURE__*/function () {
  function ActivityService() {
    _classCallCheck(this, ActivityService);
  }
  return _createClass(ActivityService, [{
    key: "repository",
    get:
    /**
     * Get the repository instance
     * @returns {ActivityRepository} - The activity repository
     */
    function get() {
      return _activityRepository["default"];
    }

    /**
     * Log an activity with automatic enrichment
     * @param {Object} params - Activity parameters
     * @param {mongoose.Types.ObjectId} [params.userId] - User ID
     * @param {string} params.action - Action type
     * @param {string} params.entityType - Entity type
     * @param {mongoose.Types.ObjectId} [params.entityId] - Entity ID
     * @param {mongoose.Types.ObjectId} [params.eventId] - Event ID (for context)
     * @param {string} params.description - Human-readable description
     * @param {string} [params.severity] - Severity level
     * @param {string} [params.ipAddress] - IP address
     * @param {string} [params.userAgent] - User agent
     * @param {Object} [params.metadata] - Additional metadata
     * @param {Object} [params.changes] - Before/after snapshots
     * @param {string} [params.sessionId] - Session ID
     * @returns {Promise<Object>} - Created activity
     */
  }, {
    key: "log",
    value: (function () {
      var _log = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
        var _ref$userId, userId, action, entityType, _ref$entityId, entityId, _ref$eventId, eventId, description, _ref$severity, severity, _ref$ipAddress, ipAddress, _ref$userAgent, userAgent, _ref$metadata, metadata, _ref$changes, changes, _ref$sessionId, sessionId, activityData, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _ref$userId = _ref.userId, userId = _ref$userId === void 0 ? null : _ref$userId, action = _ref.action, entityType = _ref.entityType, _ref$entityId = _ref.entityId, entityId = _ref$entityId === void 0 ? null : _ref$entityId, _ref$eventId = _ref.eventId, eventId = _ref$eventId === void 0 ? null : _ref$eventId, description = _ref.description, _ref$severity = _ref.severity, severity = _ref$severity === void 0 ? _activityConstants.SEVERITY.INFO : _ref$severity, _ref$ipAddress = _ref.ipAddress, ipAddress = _ref$ipAddress === void 0 ? null : _ref$ipAddress, _ref$userAgent = _ref.userAgent, userAgent = _ref$userAgent === void 0 ? null : _ref$userAgent, _ref$metadata = _ref.metadata, metadata = _ref$metadata === void 0 ? {} : _ref$metadata, _ref$changes = _ref.changes, changes = _ref$changes === void 0 ? null : _ref$changes, _ref$sessionId = _ref.sessionId, sessionId = _ref$sessionId === void 0 ? null : _ref$sessionId;
              _context.p = 1;
              // Auto-assign severity for certain actions
              if (!severity) {
                if ([_activityConstants.ACTION_TYPE.FAILED_LOGIN, _activityConstants.ACTION_TYPE.SUSPICIOUS_ACTIVITY, _activityConstants.ACTION_TYPE.PAYMENT_FAILED].includes(action)) {
                  severity = _activityConstants.SEVERITY.WARNING;
                } else if ([_activityConstants.ACTION_TYPE.PERMISSION_CHANGE].includes(action)) {
                  severity = _activityConstants.SEVERITY.CRITICAL;
                }
              }
              activityData = {
                user: userId,
                action: action,
                entity_type: entityType,
                entity_id: entityId,
                event: eventId,
                description: description,
                severity: severity,
                ip_address: ipAddress,
                user_agent: userAgent,
                metadata: metadata,
                changes: changes,
                session_id: sessionId,
                timestamp: new Date()
              };
              _context.n = 2;
              return _activityRepository["default"].logActivity(activityData);
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              // Log errors but don't break the main flow
              console.error("Activity logging failed: ".concat(_t.message));
              return _context.a(2, null);
          }
        }, _callee, null, [[1, 3]]);
      }));
      function log(_x) {
        return _log.apply(this, arguments);
      }
      return log;
    }()
    /**
     * Log user authentication events
     * @param {mongoose.Types.ObjectId} userId - User ID
     * @param {string} action - LOGIN or LOGOUT
     * @param {string} ipAddress - IP address
     * @param {string} userAgent - User agent
     * @param {boolean} [success=true] - Whether login succeeded
     * @returns {Promise<Object>} - Created activity
     */
    )
  }, {
    key: "logAuth",
    value: (function () {
      var _logAuth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId, action, ipAddress, userAgent) {
        var success,
          actionType,
          severity,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              success = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : true;
              actionType = success ? action : _activityConstants.ACTION_TYPE.FAILED_LOGIN;
              severity = success ? _activityConstants.SEVERITY.INFO : _activityConstants.SEVERITY.WARNING;
              _context2.n = 1;
              return this.log({
                userId: userId,
                action: actionType,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: success ? "User ".concat(action, " successfully") : "Failed login attempt for user",
                severity: severity,
                ipAddress: ipAddress,
                userAgent: userAgent
              });
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2, this);
      }));
      function logAuth(_x2, _x3, _x4, _x5) {
        return _logAuth.apply(this, arguments);
      }
      return logAuth;
    }()
    /**
     * Log vote casting with metadata
     * @param {mongoose.Types.ObjectId} userId - User ID
     * @param {mongoose.Types.ObjectId} voteId - Vote ID
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} metadata - Vote metadata (candidate, category, etc.)
     * @param {string} ipAddress - IP address
     * @returns {Promise<Object>} - Created activity
     */
    )
  }, {
    key: "logVote",
    value: (function () {
      var _logVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId, voteId, eventId, metadata, ipAddress) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.log({
                userId: userId,
                action: _activityConstants.ACTION_TYPE.VOTE_CAST,
                entityType: _activityConstants.ENTITY_TYPE.VOTE,
                entityId: voteId,
                eventId: eventId,
                description: "Vote cast for candidate ".concat(metadata.candidateName, " in category ").concat(metadata.categoryName),
                severity: _activityConstants.SEVERITY.INFO,
                ipAddress: ipAddress,
                metadata: metadata
              });
            case 1:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      function logVote(_x6, _x7, _x8, _x9, _x0) {
        return _logVote.apply(this, arguments);
      }
      return logVote;
    }()
    /**
     * Log payment events
     * @param {mongoose.Types.ObjectId} userId - User ID
     * @param {mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} action - Payment action type
     * @param {Object} metadata - Payment metadata
     * @returns {Promise<Object>} - Created activity
     */
    )
  }, {
    key: "logPayment",
    value: (function () {
      var _logPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId, paymentId, eventId, action, metadata) {
        var severity;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              severity = action === _activityConstants.ACTION_TYPE.PAYMENT_FAILED ? _activityConstants.SEVERITY.ERROR : _activityConstants.SEVERITY.INFO;
              _context4.n = 1;
              return this.log({
                userId: userId,
                action: action,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: paymentId,
                eventId: eventId,
                description: "Payment ".concat(action.replace("payment_", ""), " - Amount: ").concat(metadata.amount, " ").concat(metadata.currency),
                severity: severity,
                metadata: metadata
              });
            case 1:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, this);
      }));
      function logPayment(_x1, _x10, _x11, _x12, _x13) {
        return _logPayment.apply(this, arguments);
      }
      return logPayment;
    }()
    /**
     * Log entity changes with before/after snapshots
     * @param {mongoose.Types.ObjectId} userId - User ID
     * @param {string} action - Action type
     * @param {string} entityType - Entity type
     * @param {mongoose.Types.ObjectId} entityId - Entity ID
     * @param {Object} before - Before state
     * @param {Object} after - After state
     * @param {mongoose.Types.ObjectId} [eventId] - Event ID
     * @returns {Promise<Object>} - Created activity
     */
    )
  }, {
    key: "logChange",
    value: (function () {
      var _logChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId, action, entityType, entityId, before, after) {
        var eventId,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              eventId = _args5.length > 6 && _args5[6] !== undefined ? _args5[6] : null;
              _context5.n = 1;
              return this.log({
                userId: userId,
                action: action,
                entityType: entityType,
                entityId: entityId,
                eventId: eventId,
                description: "".concat(entityType, " ").concat(action.replace("".concat(entityType, "_"), "")),
                severity: _activityConstants.SEVERITY.INFO,
                changes: {
                  before: before,
                  after: after
                }
              });
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      function logChange(_x14, _x15, _x16, _x17, _x18, _x19) {
        return _logChange.apply(this, arguments);
      }
      return logChange;
    }()
    /**
     * Get user activity history
     * @param {mongoose.Types.ObjectId} userId - User ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=50] - Limit per page
     * @returns {Promise<Object>} - Paginated activities
     */
    )
  }, {
    key: "getUserHistory",
    value: (function () {
      var _getUserHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(userId) {
        var page,
          limit,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
              limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 50;
              _context6.n = 1;
              return _activityRepository["default"].findUserHistory(userId, page, limit, {
                populate: "event"
              });
            case 1:
              return _context6.a(2, _context6.v);
          }
        }, _callee6);
      }));
      function getUserHistory(_x20) {
        return _getUserHistory.apply(this, arguments);
      }
      return getUserHistory;
    }()
    /**
     * Get security events
     * @param {number} [page=1] - Page number
     * @param {number} [limit=50] - Limit per page
     * @returns {Promise<Object>} - Paginated security events
     */
    )
  }, {
    key: "getSecurityEvents",
    value: (function () {
      var _getSecurityEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var page,
          limit,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              page = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 1;
              limit = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 50;
              _context7.n = 1;
              return _activityRepository["default"].findSecurityEvents(page, limit, {
                populate: "user event"
              });
            case 1:
              return _context7.a(2, _context7.v);
          }
        }, _callee7);
      }));
      function getSecurityEvents() {
        return _getSecurityEvents.apply(this, arguments);
      }
      return getSecurityEvents;
    }()
    /**
     * Generate audit report for date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {Object} [filters={}] - Additional filters
     * @returns {Promise<Object>} - Audit report
     */
    )
  }, {
    key: "generateAuditReport",
    value: (function () {
      var _generateAuditReport = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(startDate, endDate) {
        var filters,
          _yield$Promise$all,
          _yield$Promise$all2,
          activities,
          actionStats,
          timeline,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              filters = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
              _context8.n = 1;
              return Promise.all([_activityRepository["default"].findByTimeRange(startDate, endDate, filters, 1, 1000), _activityRepository["default"].getActionStatistics(startDate, endDate), _activityRepository["default"].getTimeline(startDate, endDate, "day", filters)]);
            case 1:
              _yield$Promise$all = _context8.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
              activities = _yield$Promise$all2[0];
              actionStats = _yield$Promise$all2[1];
              timeline = _yield$Promise$all2[2];
              return _context8.a(2, {
                period: {
                  startDate: startDate,
                  endDate: endDate
                },
                totalActivities: activities.metadata.total,
                activities: activities.data,
                actionStatistics: actionStats,
                timeline: timeline
              });
          }
        }, _callee8);
      }));
      function generateAuditReport(_x21, _x22) {
        return _generateAuditReport.apply(this, arguments);
      }
      return generateAuditReport;
    }()
    /**
     * Detect suspicious activity patterns
     * @returns {Promise<Array>} - Suspicious patterns
     */
    )
  }, {
    key: "detectSuspiciousPatterns",
    value: (function () {
      var _detectSuspiciousPatterns = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return _activityRepository["default"].detectSuspiciousPatterns(20, 10);
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9);
      }));
      function detectSuspiciousPatterns() {
        return _detectSuspiciousPatterns.apply(this, arguments);
      }
      return detectSuspiciousPatterns;
    }())
  }]);
}(); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new ActivityService();