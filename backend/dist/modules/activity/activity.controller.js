"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ActivityController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _activityService = _interopRequireDefault(require("./activity.service.js"));
var _activityValidation = _interopRequireDefault(require("./activity.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Activity Controller
 * Handles HTTP requests for activity logging and audit trails
 */
var ActivityController = exports.ActivityController = /*#__PURE__*/function (_BaseController) {
  function ActivityController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ActivityController);
    return _callSuper(this, ActivityController, [{
      activityService: dependencies.activityService || _activityService["default"]
    }]);
  }

  // ==================== ACTIVITY QUERIES ====================

  /**
   * Get all activities with pagination and filters
   * GET /api/activities
   */
  _inherits(ActivityController, _BaseController);
  return _createClass(ActivityController, [{
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["user", "action", "entity_type", "entity_id", "event", "severity", "session_id", "ip_address"]);
              sort = this.getSort(req, "-timestamp"); // Date range filters
              if (req.query.timestamp_from) {
                filters.timestamp = _objectSpread(_objectSpread({}, filters.timestamp), {}, {
                  $gte: new Date(req.query.timestamp_from)
                });
              }
              if (req.query.timestamp_to) {
                filters.timestamp = _objectSpread(_objectSpread({}, filters.timestamp), {}, {
                  $lte: new Date(req.query.timestamp_to)
                });
              }
              _context.n = 1;
              return this.service("activityService").repository.findAll(filters, page, limit, {
                sort: sort,
                populate: ["user", "event"]
              });
            case 1:
              result = _context.v;
              return _context.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee, this);
      }));
      function list(_x, _x2) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get activity by ID
     * GET /api/activities/:id
     */
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var id, activity;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              id = req.params.id;
              _context2.n = 1;
              return this.service("activityService").repository.findById(id, {
                populate: ["user", "event"]
              });
            case 1:
              activity = _context2.v;
              if (activity) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, this.notFound(res, {
                resource: "Activity"
              }));
            case 2:
              return _context2.a(2, this.success(res, {
                data: activity
              }));
          }
        }, _callee2, this);
      }));
      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }() // ==================== USER ACTIVITY ====================
    /**
     * Get user activity history
     * GET /api/activities/user/:userId
     */
    )
  }, {
    key: "getUserHistory",
    value: function () {
      var _getUserHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var userId, _this$getPagination2, page, limit, filters, result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              userId = req.params.userId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              filters = this.getFilters(req, ["action"]); // Date range filters
              if (req.query.timestamp_from) {
                filters.timestamp = _objectSpread(_objectSpread({}, filters.timestamp), {}, {
                  $gte: new Date(req.query.timestamp_from)
                });
              }
              if (req.query.timestamp_to) {
                filters.timestamp = _objectSpread(_objectSpread({}, filters.timestamp), {}, {
                  $lte: new Date(req.query.timestamp_to)
                });
              }
              _context3.n = 1;
              return this.service("activityService").getUserHistory(userId, page, limit);
            case 1:
              result = _context3.v;
              return _context3.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee3, this);
      }));
      function getUserHistory(_x5, _x6) {
        return _getUserHistory.apply(this, arguments);
      }
      return getUserHistory;
    }()
    /**
     * Get my activity (current user)
     * GET /api/activities/me
     */
  }, {
    key: "getMyActivity",
    value: (function () {
      var _getMyActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var userId, _this$getPagination3, page, limit, result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              userId = this.getUserId(req);
              if (userId) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2, this.unauthorized(res));
            case 1:
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit;
              _context4.n = 2;
              return this.service("activityService").getUserHistory(userId, page, limit);
            case 2:
              result = _context4.v;
              return _context4.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee4, this);
      }));
      function getMyActivity(_x7, _x8) {
        return _getMyActivity.apply(this, arguments);
      }
      return getMyActivity;
    }() // ==================== EVENT ACTIVITY ====================
    /**
     * Get event activity
     * GET /api/activities/event/:eventId
     */
    )
  }, {
    key: "getEventActivity",
    value: function () {
      var _getEventActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var eventId, _this$getPagination4, page, limit, filters, result;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit;
              filters = this.getFilters(req, ["action", "severity"]);
              _context5.n = 1;
              return this.service("activityService").repository.findAll(_objectSpread({
                event: eventId
              }, filters), page, limit, {
                sort: {
                  timestamp: -1
                },
                populate: ["user"]
              });
            case 1:
              result = _context5.v;
              return _context5.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee5, this);
      }));
      function getEventActivity(_x9, _x0) {
        return _getEventActivity.apply(this, arguments);
      }
      return getEventActivity;
    }() // ==================== ENTITY ACTIVITY ====================
    /**
     * Get entity activity
     * GET /api/activities/entity/:entityType/:entityId
     */
  }, {
    key: "getEntityActivity",
    value: function () {
      var _getEntityActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var _req$params, entityType, entityId, _this$getPagination5, page, limit, result;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _req$params = req.params, entityType = _req$params.entityType, entityId = _req$params.entityId;
              _this$getPagination5 = this.getPagination(req), page = _this$getPagination5.page, limit = _this$getPagination5.limit;
              _context6.n = 1;
              return this.service("activityService").repository.findAll({
                entity_type: entityType,
                entity_id: entityId
              }, page, limit, {
                sort: {
                  timestamp: -1
                },
                populate: ["user"]
              });
            case 1:
              result = _context6.v;
              return _context6.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee6, this);
      }));
      function getEntityActivity(_x1, _x10) {
        return _getEntityActivity.apply(this, arguments);
      }
      return getEntityActivity;
    }() // ==================== SECURITY EVENTS ====================
    /**
     * Get security events
     * GET /api/activities/security
     */
  }, {
    key: "getSecurityEvents",
    value: function () {
      var _getSecurityEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var _this$getPagination6, page, limit, timestampFrom, timestampTo, result;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _this$getPagination6 = this.getPagination(req), page = _this$getPagination6.page, limit = _this$getPagination6.limit; // Date range filters
              if (req.query.timestamp_from) {
                timestampFrom = new Date(req.query.timestamp_from);
              }
              if (req.query.timestamp_to) {
                timestampTo = new Date(req.query.timestamp_to);
              }
              _context7.n = 1;
              return this.service("activityService").getSecurityEvents(page, limit);
            case 1:
              result = _context7.v;
              return _context7.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee7, this);
      }));
      function getSecurityEvents(_x11, _x12) {
        return _getSecurityEvents.apply(this, arguments);
      }
      return getSecurityEvents;
    }()
    /**
     * Get failed login attempts
     * GET /api/activities/failed-logins
     */
  }, {
    key: "getFailedLogins",
    value: (function () {
      var _getFailedLogins = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var _this$getPagination7, page, limit, hours, hoursAgo, since, result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _this$getPagination7 = this.getPagination(req), page = _this$getPagination7.page, limit = _this$getPagination7.limit;
              hours = req.query.hours;
              hoursAgo = parseInt(hours, 10) || 24;
              since = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
              _context8.n = 1;
              return this.service("activityService").repository.findAll({
                action: "FAILED_LOGIN",
                timestamp: {
                  $gte: since
                }
              }, page, limit, {
                sort: {
                  timestamp: -1
                }
              });
            case 1:
              result = _context8.v;
              return _context8.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee8, this);
      }));
      function getFailedLogins(_x13, _x14) {
        return _getFailedLogins.apply(this, arguments);
      }
      return getFailedLogins;
    }() // ==================== ANALYTICS ====================
    /**
     * Get activity summary for an event
     * GET /api/activities/summary/:eventId
     */
    )
  }, {
    key: "getEventSummary",
    value: function () {
      var _getEventSummary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var eventId, summary;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              eventId = req.params.eventId;
              _context9.n = 1;
              return this.service("activityService").getEventSummary(eventId);
            case 1:
              summary = _context9.v;
              return _context9.a(2, this.success(res, {
                data: summary
              }));
          }
        }, _callee9, this);
      }));
      function getEventSummary(_x15, _x16) {
        return _getEventSummary.apply(this, arguments);
      }
      return getEventSummary;
    }()
    /**
     * Get activity timeline
     * GET /api/activities/timeline/:eventId
     */
  }, {
    key: "getTimeline",
    value: (function () {
      var _getTimeline = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var eventId, _req$query, interval, start_date, end_date, timeline;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query = req.query, interval = _req$query.interval, start_date = _req$query.start_date, end_date = _req$query.end_date;
              _context0.n = 1;
              return this.service("activityService").getActivityTimeline(eventId, interval || "day", start_date ? new Date(start_date) : undefined, end_date ? new Date(end_date) : undefined);
            case 1:
              timeline = _context0.v;
              return _context0.a(2, this.success(res, {
                data: timeline
              }));
          }
        }, _callee0, this);
      }));
      function getTimeline(_x17, _x18) {
        return _getTimeline.apply(this, arguments);
      }
      return getTimeline;
    }()
    /**
     * Get activity by action type
     * GET /api/activities/action/:action
     */
    )
  }, {
    key: "getByAction",
    value: (function () {
      var _getByAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var action, _this$getPagination8, page, limit, eventId, filters, result;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              action = req.params.action;
              _this$getPagination8 = this.getPagination(req), page = _this$getPagination8.page, limit = _this$getPagination8.limit;
              eventId = req.query.event;
              filters = {
                action: action
              };
              if (eventId) {
                filters.event = eventId;
              }
              _context1.n = 1;
              return this.service("activityService").repository.findAll(filters, page, limit, {
                sort: {
                  timestamp: -1
                },
                populate: ["user", "event"]
              });
            case 1:
              result = _context1.v;
              return _context1.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee1, this);
      }));
      function getByAction(_x19, _x20) {
        return _getByAction.apply(this, arguments);
      }
      return getByAction;
    }()
    /**
     * Get recent activities
     * GET /api/activities/recent
     */
    )
  }, {
    key: "getRecent",
    value: (function () {
      var _getRecent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var limit, eventId, filters, result;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              limit = parseInt(req.query.limit, 10) || 20;
              eventId = req.query.event;
              filters = {};
              if (eventId) {
                filters.event = eventId;
              }
              _context10.n = 1;
              return this.service("activityService").repository.findAll(filters, 1, limit, {
                sort: {
                  timestamp: -1
                },
                populate: ["user", "event"]
              });
            case 1:
              result = _context10.v;
              return _context10.a(2, this.success(res, {
                data: result.data
              }));
          }
        }, _callee10, this);
      }));
      function getRecent(_x21, _x22) {
        return _getRecent.apply(this, arguments);
      }
      return getRecent;
    }())
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new ActivityController();