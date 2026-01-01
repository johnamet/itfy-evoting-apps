"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AnalyticsController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _analyticsService = _interopRequireDefault(require("./analytics.service.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
 * Analytics Controller
 * Handles HTTP requests for cross-module reporting and dashboards
 */
var AnalyticsController = exports.AnalyticsController = /*#__PURE__*/function (_BaseController) {
  function AnalyticsController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, AnalyticsController);
    return _callSuper(this, AnalyticsController, [{
      analyticsService: dependencies.analyticsService || _analyticsService["default"]
    }]);
  }

  // ==================== DASHBOARDS ====================

  /**
   * Get comprehensive event dashboard analytics
   * GET /api/analytics/event/:eventId/dashboard
   */
  _inherits(AnalyticsController, _BaseController);
  return _createClass(AnalyticsController, [{
    key: "getEventDashboard",
    value: function () {
      var _getEventDashboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var eventId, dashboard;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              eventId = req.params.eventId;
              _context.n = 1;
              return this.service("analyticsService").getEventDashboard(eventId);
            case 1:
              dashboard = _context.v;
              return _context.a(2, this.success(res, {
                data: dashboard
              }));
          }
        }, _callee, this);
      }));
      function getEventDashboard(_x, _x2) {
        return _getEventDashboard.apply(this, arguments);
      }
      return getEventDashboard;
    }()
    /**
     * Get comprehensive dashboard overview with system health
     * GET /api/analytics/platform/overview
     */
  }, {
    key: "getDashboardOverview",
    value: (function () {
      var _getDashboardOverview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var period, overview;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              period = req.query.period;
              _context2.n = 1;
              return this.service("analyticsService").getDashboardOverview({
                period: period
              });
            case 1:
              overview = _context2.v;
              return _context2.a(2, this.success(res, {
                message: "Dashboard overview retrieved successfully",
                data: overview
              }));
          }
        }, _callee2, this);
      }));
      function getDashboardOverview(_x3, _x4) {
        return _getDashboardOverview.apply(this, arguments);
      }
      return getDashboardOverview;
    }()
    /**
     * Get platform-wide dashboard analytics
     * GET /api/analytics/platform/dashboard
     */
    )
  }, {
    key: "getPlatformDashboard",
    value: (function () {
      var _getPlatformDashboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var dashboard;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.service("analyticsService").getPlatformDashboard();
            case 1:
              dashboard = _context3.v;
              return _context3.a(2, this.success(res, {
                data: dashboard
              }));
          }
        }, _callee3, this);
      }));
      function getPlatformDashboard(_x5, _x6) {
        return _getPlatformDashboard.apply(this, arguments);
      }
      return getPlatformDashboard;
    }()
    /**
     * Get comprehensive voting analytics
     * GET /api/analytics/voting
     */
    )
  }, {
    key: "getVotingAnalytics",
    value: (function () {
      var _getVotingAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var _req$query, period, start_date, end_date, event_id, analytics;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _req$query = req.query, period = _req$query.period, start_date = _req$query.start_date, end_date = _req$query.end_date, event_id = _req$query.event_id;
              _context4.n = 1;
              return this.service("analyticsService").getVotingAnalytics({
                period: period,
                startDate: start_date ? new Date(start_date) : undefined,
                endDate: end_date ? new Date(end_date) : undefined,
                eventId: event_id
              });
            case 1:
              analytics = _context4.v;
              return _context4.a(2, this.success(res, {
                data: analytics
              }));
          }
        }, _callee4, this);
      }));
      function getVotingAnalytics(_x7, _x8) {
        return _getVotingAnalytics.apply(this, arguments);
      }
      return getVotingAnalytics;
    }()
    /**
     * Get comprehensive payment analytics
     * GET /api/analytics/payments
     */
    )
  }, {
    key: "getPaymentAnalytics",
    value: (function () {
      var _getPaymentAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var _req$query2, period, start_date, end_date, event_id, analytics;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _req$query2 = req.query, period = _req$query2.period, start_date = _req$query2.start_date, end_date = _req$query2.end_date, event_id = _req$query2.event_id;
              _context5.n = 1;
              return this.service("analyticsService").getPaymentAnalytics({
                period: period,
                startDate: start_date ? new Date(start_date) : undefined,
                endDate: end_date ? new Date(end_date) : undefined,
                eventId: event_id
              });
            case 1:
              analytics = _context5.v;
              return _context5.a(2, this.success(res, {
                data: analytics
              }));
          }
        }, _callee5, this);
      }));
      function getPaymentAnalytics(_x9, _x0) {
        return _getPaymentAnalytics.apply(this, arguments);
      }
      return getPaymentAnalytics;
    }() // ==================== TRENDS ====================
    /**
     * Get voting trends for an event
     * GET /api/analytics/event/:eventId/voting-trends
     */
    )
  }, {
    key: "getVotingTrends",
    value: function () {
      var _getVotingTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var eventId, _req$query3, interval, start_date, end_date, trends;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query3 = req.query, interval = _req$query3.interval, start_date = _req$query3.start_date, end_date = _req$query3.end_date;
              _context6.n = 1;
              return this.service("analyticsService").getVotingTrends(eventId, interval || "day", start_date ? new Date(start_date) : undefined, end_date ? new Date(end_date) : undefined);
            case 1:
              trends = _context6.v;
              return _context6.a(2, this.success(res, {
                data: trends
              }));
          }
        }, _callee6, this);
      }));
      function getVotingTrends(_x1, _x10) {
        return _getVotingTrends.apply(this, arguments);
      }
      return getVotingTrends;
    }()
    /**
     * Get revenue trends for an event
     * GET /api/analytics/event/:eventId/revenue-trends
     */
  }, {
    key: "getRevenueTrends",
    value: (function () {
      var _getRevenueTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var eventId, _req$query4, interval, start_date, end_date, endDate, startDate, trends;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query4 = req.query, interval = _req$query4.interval, start_date = _req$query4.start_date, end_date = _req$query4.end_date; // Defaults for date range
              endDate = end_date ? new Date(end_date) : new Date();
              startDate = start_date ? new Date(start_date) : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
              _context7.n = 1;
              return this.service("analyticsService").getRevenueTrends(eventId, startDate, endDate, interval || "day");
            case 1:
              trends = _context7.v;
              return _context7.a(2, this.success(res, {
                data: trends
              }));
          }
        }, _callee7, this);
      }));
      function getRevenueTrends(_x11, _x12) {
        return _getRevenueTrends.apply(this, arguments);
      }
      return getRevenueTrends;
    }() // ==================== ENGAGEMENT ====================
    /**
     * Get user engagement metrics for an event
     * GET /api/analytics/event/:eventId/engagement
     */
    )
  }, {
    key: "getUserEngagement",
    value: function () {
      var _getUserEngagement = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var eventId, _req$query5, start_date, end_date, endDate, startDate, engagement;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query5 = req.query, start_date = _req$query5.start_date, end_date = _req$query5.end_date; // Defaults for date range
              endDate = end_date ? new Date(end_date) : new Date();
              startDate = start_date ? new Date(start_date) : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
              _context8.n = 1;
              return this.service("analyticsService").getUserEngagement(eventId, startDate, endDate);
            case 1:
              engagement = _context8.v;
              return _context8.a(2, this.success(res, {
                data: engagement
              }));
          }
        }, _callee8, this);
      }));
      function getUserEngagement(_x13, _x14) {
        return _getUserEngagement.apply(this, arguments);
      }
      return getUserEngagement;
    }() // ==================== COMPARISONS ====================
    /**
     * Compare multiple events
     * POST /api/analytics/compare-events
     */
  }, {
    key: "compareEvents",
    value: function () {
      var _compareEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var event_ids, comparison;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              event_ids = req.body.event_ids;
              if (!(!event_ids || !Array.isArray(event_ids) || event_ids.length === 0)) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, this.badRequest(res, {
                message: "event_ids array is required"
              }));
            case 1:
              if (!(event_ids.length > 10)) {
                _context9.n = 2;
                break;
              }
              return _context9.a(2, this.badRequest(res, {
                message: "Cannot compare more than 10 events at once"
              }));
            case 2:
              _context9.n = 3;
              return this.service("analyticsService").compareEvents(event_ids);
            case 3:
              comparison = _context9.v;
              return _context9.a(2, this.success(res, {
                data: comparison
              }));
          }
        }, _callee9, this);
      }));
      function compareEvents(_x15, _x16) {
        return _compareEvents.apply(this, arguments);
      }
      return compareEvents;
    }() // ==================== RANKINGS ====================
    /**
     * Get candidate performance ranking
     * GET /api/analytics/event/:eventId/candidate-ranking
     */
  }, {
    key: "getCandidateRanking",
    value: function () {
      var _getCandidateRanking = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var eventId, _req$query6, category_id, limit, ranking;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query6 = req.query, category_id = _req$query6.category_id, limit = _req$query6.limit;
              _context0.n = 1;
              return this.service("analyticsService").getCandidateRanking(eventId, category_id || null, parseInt(limit, 10) || 20);
            case 1:
              ranking = _context0.v;
              return _context0.a(2, this.success(res, {
                data: ranking
              }));
          }
        }, _callee0, this);
      }));
      function getCandidateRanking(_x17, _x18) {
        return _getCandidateRanking.apply(this, arguments);
      }
      return getCandidateRanking;
    }() // ==================== FUNNEL ANALYSIS ====================
    /**
     * Get conversion funnel analysis
     * GET /api/analytics/event/:eventId/funnel
     */
  }, {
    key: "getConversionFunnel",
    value: function () {
      var _getConversionFunnel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var eventId, funnel;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              eventId = req.params.eventId;
              _context1.n = 1;
              return this.service("analyticsService").getConversionFunnel(eventId);
            case 1:
              funnel = _context1.v;
              return _context1.a(2, this.success(res, {
                data: funnel
              }));
          }
        }, _callee1, this);
      }));
      function getConversionFunnel(_x19, _x20) {
        return _getConversionFunnel.apply(this, arguments);
      }
      return getConversionFunnel;
    }() // ==================== ACTIVITY ANALYSIS ====================
    /**
     * Get activity heatmap (hourly distribution by day)
     * GET /api/analytics/event/:eventId/heatmap
     */
  }, {
    key: "getActivityHeatmap",
    value: function () {
      var _getActivityHeatmap = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var eventId, _req$query7, start_date, end_date, endDate, startDate, heatmap;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query7 = req.query, start_date = _req$query7.start_date, end_date = _req$query7.end_date; // Defaults for date range
              endDate = end_date ? new Date(end_date) : new Date();
              startDate = start_date ? new Date(start_date) : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
              _context10.n = 1;
              return this.service("analyticsService").getActivityHeatmap(eventId, startDate, endDate);
            case 1:
              heatmap = _context10.v;
              return _context10.a(2, this.success(res, {
                data: heatmap
              }));
          }
        }, _callee10, this);
      }));
      function getActivityHeatmap(_x21, _x22) {
        return _getActivityHeatmap.apply(this, arguments);
      }
      return getActivityHeatmap;
    }() // ==================== REAL-TIME METRICS ====================
    /**
     * Get real-time event metrics
     * GET /api/analytics/event/:eventId/realtime
     */
  }, {
    key: "getRealTimeMetrics",
    value: function () {
      var _getRealTimeMetrics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var eventId, minutes, metrics;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              eventId = req.params.eventId;
              minutes = req.query.minutes;
              _context11.n = 1;
              return this.service("analyticsService").getRealTimeMetrics(eventId, parseInt(minutes, 10) || 15);
            case 1:
              metrics = _context11.v;
              return _context11.a(2, this.success(res, {
                data: metrics
              }));
          }
        }, _callee11, this);
      }));
      function getRealTimeMetrics(_x23, _x24) {
        return _getRealTimeMetrics.apply(this, arguments);
      }
      return getRealTimeMetrics;
    }()
    /**
     * Get device analytics
     * GET /api/analytics/devices
     */
  }, {
    key: "getDeviceAnalytics",
    value: (function () {
      var _getDeviceAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var _req$query8, period, start_date, end_date, event_id, analytics;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _req$query8 = req.query, period = _req$query8.period, start_date = _req$query8.start_date, end_date = _req$query8.end_date, event_id = _req$query8.event_id;
              _context12.n = 1;
              return this.service("analyticsService").getDeviceAnalytics({
                period: period,
                start_date: start_date,
                end_date: end_date,
                event_id: event_id
              });
            case 1:
              analytics = _context12.v;
              return _context12.a(2, this.success(res, {
                data: analytics
              }));
          }
        }, _callee12, this);
      }));
      function getDeviceAnalytics(_x25, _x26) {
        return _getDeviceAnalytics.apply(this, arguments);
      }
      return getDeviceAnalytics;
    }()
    /**
     * Get region analytics
     * GET /api/analytics/regions
     */
    )
  }, {
    key: "getRegionAnalytics",
    value: (function () {
      var _getRegionAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var _req$query9, period, start_date, end_date, event_id, analytics;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _req$query9 = req.query, period = _req$query9.period, start_date = _req$query9.start_date, end_date = _req$query9.end_date, event_id = _req$query9.event_id;
              _context13.n = 1;
              return this.service("analyticsService").getRegionAnalytics({
                period: period,
                start_date: start_date,
                end_date: end_date,
                event_id: event_id
              });
            case 1:
              analytics = _context13.v;
              return _context13.a(2, this.success(res, {
                data: analytics
              }));
          }
        }, _callee13, this);
      }));
      function getRegionAnalytics(_x27, _x28) {
        return _getRegionAnalytics.apply(this, arguments);
      }
      return getRegionAnalytics;
    }())
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new AnalyticsController();