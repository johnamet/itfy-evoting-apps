"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AnalyticsService = void 0;
var _eventRepository = _interopRequireDefault(require("../event/event.repository.js"));
var _candidateRepository = _interopRequireDefault(require("../candidate/candidate.repository.js"));
var _categoryRepository = _interopRequireDefault(require("../category/category.repository.js"));
var _voteRepository = _interopRequireDefault(require("../vote/vote/vote.repository.js"));
var _bundleRepository = _interopRequireDefault(require("../vote/bundle/bundle.repository.js"));
var _couponRepository = _interopRequireDefault(require("../vote/coupon/coupon.repository.js"));
var _formRepository = _interopRequireDefault(require("../form/form.repository.js"));
var _submissionRepository = _interopRequireDefault(require("../form/submission.repository.js"));
var _activityRepository = _interopRequireDefault(require("../activity/activity.repository.js"));
var _paymentModel = _interopRequireDefault(require("../payment/payment.model.js"));
var _userModel = _interopRequireDefault(require("../user/user.model.js"));
var _healthService = require("../../services/health.service.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Analytics Service
 * Cross-module reporting, dashboards, and time-series analysis
 */
var AnalyticsService = exports.AnalyticsService = /*#__PURE__*/function () {
  function AnalyticsService() {
    _classCallCheck(this, AnalyticsService);
  }
  return _createClass(AnalyticsService, [{
    key: "getEventDashboard",
    value: (
    /**
     * Get comprehensive event analytics dashboard
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Complete event analytics
     */
    function () {
      var _getEventDashboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventId) {
        var _yield$Promise$all, _yield$Promise$all2, candidates, categories, votes, bundles, coupons, forms, submissions, payments, conversionRate, averageRevenuePerVote, roi, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return Promise.all([_candidateRepository["default"].getStatisticsByEvent(eventId), _categoryRepository["default"].getStatisticsByEvent(eventId), _voteRepository["default"].getStatisticsByEvent(eventId), _bundleRepository["default"].getStatisticsByEvent(eventId), _couponRepository["default"].getStatisticsByEvent(eventId), _formRepository["default"].getStatistics(eventId), _submissionRepository["default"].getEventStatistics(eventId), _paymentModel["default"].getStatistics(eventId)]);
            case 1:
              _yield$Promise$all = _context.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 8);
              candidates = _yield$Promise$all2[0];
              categories = _yield$Promise$all2[1];
              votes = _yield$Promise$all2[2];
              bundles = _yield$Promise$all2[3];
              coupons = _yield$Promise$all2[4];
              forms = _yield$Promise$all2[5];
              submissions = _yield$Promise$all2[6];
              payments = _yield$Promise$all2[7];
              // Calculate derived metrics
              conversionRate = submissions.total > 0 ? votes.totalVotes / submissions.total * 100 : 0;
              averageRevenuePerVote = votes.totalVotes > 0 ? payments.totalRevenue / votes.totalVotes : 0;
              roi = {
                revenue: payments.totalRevenue,
                votesCast: votes.totalVotes,
                bundlesSold: bundles.totalPurchases,
                averageRevenuePerVote: Math.round(averageRevenuePerVote * 100) / 100
              };
              return _context.a(2, {
                eventId: eventId,
                candidates: candidates,
                categories: categories,
                votes: votes,
                bundles: bundles,
                coupons: coupons,
                forms: forms,
                submissions: submissions,
                payments: payments,
                metrics: {
                  conversionRate: Math.round(conversionRate * 100) / 100,
                  roi: roi
                },
                generatedAt: new Date()
              });
            case 2:
              _context.p = 2;
              _t = _context.v;
              throw new Error("Get event dashboard failed: ".concat(_t.message));
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function getEventDashboard(_x) {
        return _getEventDashboard.apply(this, arguments);
      }
      return getEventDashboard;
    }()
    /**
     * Get comprehensive dashboard overview with system health
     * This is the main endpoint for admin dashboard statistics
     * @param {Object} params - Query parameters
     * @param {string} [params.period] - Time period for comparison (e.g., 'day', 'week', 'month')
     * @returns {Promise<Object>} - Dashboard overview data
     */
    )
  }, {
    key: "getDashboardOverview",
    value: (function () {
      var _getDashboardOverview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var params,
          _yield$Promise$all3,
          _yield$Promise$all4,
          eventStats,
          userCount,
          candidateCount,
          categoryCount,
          voteStats,
          paymentStats,
          systemHealth,
          growthRate,
          overallParticipationRate,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _context2.p = 1;
              _context2.n = 2;
              return Promise.all([_eventRepository["default"].getStatistics(), _userModel["default"].countDocuments({
                deleted_at: null
              }), _candidateRepository["default"].model.countDocuments({
                deleted_at: null
              }), _categoryRepository["default"].model.countDocuments({
                deleted_at: null
              }), this._getVoteStatistics(), this._getPaymentStatistics(), _healthService.healthService.getSystemHealth()]);
            case 2:
              _yield$Promise$all3 = _context2.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 7);
              eventStats = _yield$Promise$all4[0];
              userCount = _yield$Promise$all4[1];
              candidateCount = _yield$Promise$all4[2];
              categoryCount = _yield$Promise$all4[3];
              voteStats = _yield$Promise$all4[4];
              paymentStats = _yield$Promise$all4[5];
              systemHealth = _yield$Promise$all4[6];
              _context2.n = 3;
              return this._calculateGrowthRates(params.period);
            case 3:
              growthRate = _context2.v;
              // Calculate overall participation rate
              // (total votes / (total candidates * average voters per event))
              overallParticipationRate = this._calculateParticipationRate(voteStats.totalVotes, eventStats.active, candidateCount);
              return _context2.a(2, {
                totalUsers: userCount,
                totalEvents: eventStats.total,
                totalVotes: voteStats.totalVotes,
                totalRevenue: paymentStats.totalRevenue,
                activeEvents: eventStats.active,
                completedEvents: eventStats.archived,
                upcomingEvents: eventStats.upcoming,
                totalCandidates: candidateCount,
                totalCategories: categoryCount,
                overallParticipationRate: overallParticipationRate,
                systemHealthScore: systemHealth.score,
                systemHealth: {
                  status: systemHealth.status,
                  score: systemHealth.score,
                  services: systemHealth.services,
                  uptime: systemHealth.uptime
                },
                growthRate: growthRate,
                voteStats: {
                  totalVotes: voteStats.totalVotes,
                  totalAmount: voteStats.totalAmount,
                  averagePerEvent: voteStats.averagePerEvent
                },
                paymentStats: {
                  totalRevenue: paymentStats.totalRevenue,
                  totalTransactions: paymentStats.totalTransactions,
                  averageTransaction: paymentStats.averageTransaction,
                  successRate: paymentStats.successRate
                },
                timestamp: new Date().toISOString()
              });
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              throw new Error("Get dashboard overview failed: ".concat(_t2.message));
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 4]]);
      }));
      function getDashboardOverview() {
        return _getDashboardOverview.apply(this, arguments);
      }
      return getDashboardOverview;
    }()
    /**
     * Get vote statistics
     * @private
     */
    )
  }, {
    key: "_getVoteStatistics",
    value: (function () {
      var _getVoteStatistics2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var stats, result, eventCount, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return _voteRepository["default"].model.aggregate([{
                $match: {
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: null,
                  totalVotes: {
                    $sum: "$votes"
                  },
                  totalAmount: {
                    $sum: "$amount"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }]);
            case 1:
              stats = _context3.v;
              result = stats[0] || {
                totalVotes: 0,
                totalAmount: 0,
                count: 0
              }; // Get average per event
              _context3.n = 2;
              return _eventRepository["default"].model.countDocuments({
                deleted_at: null
              });
            case 2:
              eventCount = _context3.v;
              return _context3.a(2, {
                totalVotes: result.totalVotes || 0,
                totalAmount: result.totalAmount || 0,
                transactionCount: result.count || 0,
                averagePerEvent: eventCount > 0 ? Math.round(result.totalVotes / eventCount) : 0
              });
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              console.error("Failed to get vote statistics:", _t3);
              return _context3.a(2, {
                totalVotes: 0,
                totalAmount: 0,
                transactionCount: 0,
                averagePerEvent: 0
              });
          }
        }, _callee3, null, [[0, 3]]);
      }));
      function _getVoteStatistics() {
        return _getVoteStatistics2.apply(this, arguments);
      }
      return _getVoteStatistics;
    }()
    /**
     * Get payment statistics
     * @private
     */
    )
  }, {
    key: "_getPaymentStatistics",
    value: (function () {
      var _getPaymentStatistics2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var stats, successfulPayments, totalTransactions, totalSuccessful, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return _paymentModel["default"].aggregate([{
                $match: {
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: "$status",
                  total: {
                    $sum: "$amount_paid"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }]);
            case 1:
              stats = _context4.v;
              successfulPayments = stats.find(function (s) {
                return s._id === "completed";
              }) || {
                total: 0,
                count: 0
              };
              totalTransactions = stats.reduce(function (acc, s) {
                return acc + s.count;
              }, 0);
              totalSuccessful = successfulPayments.count;
              return _context4.a(2, {
                totalRevenue: successfulPayments.total || 0,
                totalTransactions: totalTransactions,
                averageTransaction: totalSuccessful > 0 ? Math.round(successfulPayments.total / totalSuccessful) : 0,
                successRate: totalTransactions > 0 ? Math.round(totalSuccessful / totalTransactions * 100) : 0
              });
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              console.error("Failed to get payment statistics:", _t4);
              return _context4.a(2, {
                totalRevenue: 0,
                totalTransactions: 0,
                averageTransaction: 0,
                successRate: 0
              });
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function _getPaymentStatistics() {
        return _getPaymentStatistics2.apply(this, arguments);
      }
      return _getPaymentStatistics;
    }()
    /**
     * Calculate growth rates compared to previous period
     * @private
     */
    )
  }, {
    key: "_calculateGrowthRates",
    value: (function () {
      var _calculateGrowthRates2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var period,
          _currentVotes$,
          _previousVotes$,
          _currentRevenue$,
          _previousRevenue$,
          now,
          currentStart,
          previousStart,
          previousEnd,
          _yield$Promise$all5,
          _yield$Promise$all6,
          currentUsers,
          currentEvents,
          currentVotes,
          currentRevenue,
          _yield$Promise$all7,
          _yield$Promise$all8,
          previousUsers,
          previousEvents,
          previousVotes,
          previousRevenue,
          calculateGrowth,
          _args5 = arguments,
          _t5,
          _t6;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              period = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : "month";
              _context5.p = 1;
              now = new Date();
              _t5 = period;
              _context5.n = _t5 === "day" ? 2 : _t5 === "week" ? 3 : _t5 === "month" ? 4 : 4;
              break;
            case 2:
              currentStart = new Date(now.setHours(0, 0, 0, 0));
              previousEnd = new Date(currentStart);
              previousStart = new Date(previousEnd.getTime() - 24 * 60 * 60 * 1000);
              return _context5.a(3, 5);
            case 3:
              currentStart = new Date(now.setDate(now.getDate() - now.getDay()));
              currentStart.setHours(0, 0, 0, 0);
              previousEnd = new Date(currentStart);
              previousStart = new Date(previousEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
              return _context5.a(3, 5);
            case 4:
              currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
              previousEnd = new Date(currentStart);
              previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              return _context5.a(3, 5);
            case 5:
              _context5.n = 6;
              return Promise.all([_userModel["default"].countDocuments({
                created_at: {
                  $gte: currentStart
                },
                deleted_at: null
              }), _eventRepository["default"].model.countDocuments({
                created_at: {
                  $gte: currentStart
                },
                deleted_at: null
              }), _voteRepository["default"].model.aggregate([{
                $match: {
                  created_at: {
                    $gte: currentStart
                  },
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$votes"
                  }
                }
              }]), _paymentModel["default"].aggregate([{
                $match: {
                  created_at: {
                    $gte: currentStart
                  },
                  status: "completed",
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$amount_paid"
                  }
                }
              }])]);
            case 6:
              _yield$Promise$all5 = _context5.v;
              _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 4);
              currentUsers = _yield$Promise$all6[0];
              currentEvents = _yield$Promise$all6[1];
              currentVotes = _yield$Promise$all6[2];
              currentRevenue = _yield$Promise$all6[3];
              _context5.n = 7;
              return Promise.all([_userModel["default"].countDocuments({
                created_at: {
                  $gte: previousStart,
                  $lt: previousEnd
                },
                deleted_at: null
              }), _eventRepository["default"].model.countDocuments({
                created_at: {
                  $gte: previousStart,
                  $lt: previousEnd
                },
                deleted_at: null
              }), _voteRepository["default"].model.aggregate([{
                $match: {
                  created_at: {
                    $gte: previousStart,
                    $lt: previousEnd
                  },
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$votes"
                  }
                }
              }]), _paymentModel["default"].aggregate([{
                $match: {
                  created_at: {
                    $gte: previousStart,
                    $lt: previousEnd
                  },
                  status: "completed",
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$amount_paid"
                  }
                }
              }])]);
            case 7:
              _yield$Promise$all7 = _context5.v;
              _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 4);
              previousUsers = _yield$Promise$all8[0];
              previousEvents = _yield$Promise$all8[1];
              previousVotes = _yield$Promise$all8[2];
              previousRevenue = _yield$Promise$all8[3];
              calculateGrowth = function calculateGrowth(current, previous) {
                if (previous === 0) return current > 0 ? 100 : 0;
                return Math.round((current - previous) / previous * 100 * 10) / 10;
              };
              return _context5.a(2, {
                users: calculateGrowth(currentUsers, previousUsers),
                events: calculateGrowth(currentEvents, previousEvents),
                votes: calculateGrowth(((_currentVotes$ = currentVotes[0]) === null || _currentVotes$ === void 0 ? void 0 : _currentVotes$.total) || 0, ((_previousVotes$ = previousVotes[0]) === null || _previousVotes$ === void 0 ? void 0 : _previousVotes$.total) || 0),
                revenue: calculateGrowth(((_currentRevenue$ = currentRevenue[0]) === null || _currentRevenue$ === void 0 ? void 0 : _currentRevenue$.total) || 0, ((_previousRevenue$ = previousRevenue[0]) === null || _previousRevenue$ === void 0 ? void 0 : _previousRevenue$.total) || 0)
              });
            case 8:
              _context5.p = 8;
              _t6 = _context5.v;
              console.error("Failed to calculate growth rates:", _t6);
              return _context5.a(2, {
                users: 0,
                events: 0,
                votes: 0,
                revenue: 0
              });
          }
        }, _callee5, null, [[1, 8]]);
      }));
      function _calculateGrowthRates() {
        return _calculateGrowthRates2.apply(this, arguments);
      }
      return _calculateGrowthRates;
    }()
    /**
     * Calculate overall participation rate
     * @private
     */
    )
  }, {
    key: "_calculateParticipationRate",
    value: function _calculateParticipationRate(totalVotes, activeEvents, totalCandidates) {
      // Simple metric: votes per candidate (as percentage)
      // This represents how engaged voters are with the candidates
      if (totalCandidates === 0) return 0;

      // Normalize to percentage (assuming 100 votes per candidate is 100% participation)
      var votesPerCandidate = totalVotes / totalCandidates;
      var targetVotesPerCandidate = 100; // Baseline target

      var rate = Math.min(votesPerCandidate / targetVotesPerCandidate * 100, 100);
      return Math.round(rate * 10) / 10;
    }

    /**
     * Get platform-wide analytics
     * @returns {Promise<Object>} - Platform analytics
     */
  }, {
    key: "getPlatformDashboard",
    value: (function () {
      var _getPlatformDashboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _yield$Promise$all9, _yield$Promise$all0, events, forms, bundles, categories, coupons, _t7;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return Promise.all([_eventRepository["default"].getStatistics(), _formRepository["default"].getStatistics(), _bundleRepository["default"].getOverallStatistics(), _categoryRepository["default"].getOverallStatistics(), _couponRepository["default"].getOverallStatistics()]);
            case 1:
              _yield$Promise$all9 = _context6.v;
              _yield$Promise$all0 = _slicedToArray(_yield$Promise$all9, 5);
              events = _yield$Promise$all0[0];
              forms = _yield$Promise$all0[1];
              bundles = _yield$Promise$all0[2];
              categories = _yield$Promise$all0[3];
              coupons = _yield$Promise$all0[4];
              return _context6.a(2, {
                events: events,
                forms: forms,
                bundles: bundles,
                categories: categories,
                coupons: coupons,
                generatedAt: new Date()
              });
            case 2:
              _context6.p = 2;
              _t7 = _context6.v;
              throw new Error("Get platform dashboard failed: ".concat(_t7.message));
            case 3:
              return _context6.a(2);
          }
        }, _callee6, null, [[0, 2]]);
      }));
      function getPlatformDashboard() {
        return _getPlatformDashboard.apply(this, arguments);
      }
      return getPlatformDashboard;
    }()
    /**
     * Get comprehensive voting analytics
     * @param {Object} params - Query parameters
     * @param {string} [params.period] - Time period
     * @param {Date} [params.startDate] - Start date
     * @param {Date} [params.endDate] - End date
     * @param {string} [params.eventId] - Optional event filter
     * @returns {Promise<Object>} - Voting analytics
     */
    )
  }, {
    key: "getVotingAnalytics",
    value: (function () {
      var _getVotingAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var params,
          startDate,
          endDate,
          eventId,
          end,
          start,
          matchFilter,
          votesByDay,
          votesByCategory,
          totalVotes,
          votesByCategoryWithPercentage,
          topCandidates,
          periodLength,
          previousStart,
          previousEnd,
          previousMatchFilter,
          previousVotes,
          previousVotesMap,
          topCandidatesWithTrend,
          _args7 = arguments,
          _t8;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
              _context7.p = 1;
              startDate = params.startDate, endDate = params.endDate, eventId = params.eventId; // Default date range
              end = endDate || new Date();
              start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
              matchFilter = {
                created_at: {
                  $gte: start,
                  $lte: end
                }
              };
              if (eventId) matchFilter.event = eventId;

              // Get voting trends by day
              _context7.n = 2;
              return _voteRepository["default"].model.aggregate([{
                $match: matchFilter
              }, {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$created_at"
                    }
                  },
                  count: {
                    $sum: "$votes"
                  },
                  amount: {
                    $sum: "$amount"
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }, {
                $project: {
                  date: "$_id",
                  count: 1,
                  amount: 1,
                  _id: 0
                }
              }]);
            case 2:
              votesByDay = _context7.v;
              _context7.n = 3;
              return _voteRepository["default"].model.aggregate([{
                $match: matchFilter
              }, {
                $lookup: {
                  from: "candidates",
                  localField: "candidate",
                  foreignField: "_id",
                  as: "candidateInfo"
                }
              }, {
                $unwind: "$candidateInfo"
              }, {
                $lookup: {
                  from: "categories",
                  localField: "candidateInfo.category",
                  foreignField: "_id",
                  as: "categoryInfo"
                }
              }, {
                $unwind: "$categoryInfo"
              }, {
                $group: {
                  _id: "$categoryInfo.name",
                  count: {
                    $sum: "$votes"
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $project: {
                  category: "$_id",
                  count: 1,
                  _id: 0
                }
              }]);
            case 3:
              votesByCategory = _context7.v;
              // Calculate percentages
              totalVotes = votesByCategory.reduce(function (sum, cat) {
                return sum + cat.count;
              }, 0);
              votesByCategoryWithPercentage = votesByCategory.map(function (cat) {
                return _objectSpread(_objectSpread({}, cat), {}, {
                  percentage: totalVotes > 0 ? Math.round(cat.count / totalVotes * 100) : 0
                });
              }); // Get top candidates
              _context7.n = 4;
              return _voteRepository["default"].model.aggregate([{
                $match: matchFilter
              }, {
                $group: {
                  _id: "$candidate",
                  votes: {
                    $sum: "$votes"
                  }
                }
              }, {
                $sort: {
                  votes: -1
                }
              }, {
                $limit: 10
              }, {
                $lookup: {
                  from: "candidates",
                  localField: "_id",
                  foreignField: "_id",
                  as: "candidateInfo"
                }
              }, {
                $unwind: "$candidateInfo"
              }, {
                $lookup: {
                  from: "events",
                  localField: "candidateInfo.event",
                  foreignField: "_id",
                  as: "eventInfo"
                }
              }, {
                $unwind: "$eventInfo"
              }, {
                $project: {
                  candidateId: "$_id",
                  name: "$candidateInfo.name",
                  code: "$candidateInfo.code",
                  votes: 1,
                  event: "$eventInfo.name",
                  _id: 0
                }
              }]);
            case 4:
              topCandidates = _context7.v;
              // Calculate trends - compare with previous period
              periodLength = end.getTime() - start.getTime();
              previousStart = new Date(start.getTime() - periodLength);
              previousEnd = start;
              previousMatchFilter = {
                created_at: {
                  $gte: previousStart,
                  $lt: previousEnd
                }
              };
              if (eventId) previousMatchFilter.event = eventId;
              _context7.n = 5;
              return _voteRepository["default"].model.aggregate([{
                $match: previousMatchFilter
              }, {
                $group: {
                  _id: "$candidate",
                  votes: {
                    $sum: "$votes"
                  }
                }
              }]);
            case 5:
              previousVotes = _context7.v;
              // Create a map of previous votes
              previousVotesMap = new Map();
              previousVotes.forEach(function (pv) {
                previousVotesMap.set(pv._id.toString(), pv.votes);
              });

              // Add trend calculation to top candidates
              topCandidatesWithTrend = topCandidates.map(function (candidate) {
                var previousVoteCount = previousVotesMap.get(candidate.candidateId.toString()) || 0;
                var currentVotes = candidate.votes;
                var trend = 0;
                if (previousVoteCount > 0) {
                  trend = (currentVotes - previousVoteCount) / previousVoteCount * 100;
                } else if (currentVotes > 0) {
                  trend = 100; // New candidate with votes
                }
                return {
                  name: candidate.name,
                  code: candidate.code,
                  votes: currentVotes,
                  event: candidate.event,
                  trend: Math.round(trend * 10) / 10 // Round to 1 decimal place
                };
              });
              return _context7.a(2, {
                totalVotes: totalVotes,
                votesByDay: votesByDay,
                votesByCategory: votesByCategoryWithPercentage,
                topCandidates: topCandidatesWithTrend,
                period: {
                  startDate: start,
                  endDate: end
                }
              });
            case 6:
              _context7.p = 6;
              _t8 = _context7.v;
              throw new Error("Get voting analytics failed: ".concat(_t8.message));
            case 7:
              return _context7.a(2);
          }
        }, _callee7, null, [[1, 6]]);
      }));
      function getVotingAnalytics() {
        return _getVotingAnalytics.apply(this, arguments);
      }
      return getVotingAnalytics;
    }()
    /**
     * Get comprehensive payment analytics
     * @param {Object} params - Query parameters
     * @param {string} [params.period] - Time period
     * @param {Date} [params.startDate] - Start date
     * @param {Date} [params.endDate] - End date
     * @param {string} [params.eventId] - Optional event filter
     * @returns {Promise<Object>} - Payment analytics
     */
    )
  }, {
    key: "getPaymentAnalytics",
    value: (function () {
      var _getPaymentAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var params,
          startDate,
          endDate,
          eventId,
          end,
          start,
          matchFilter,
          revenueByDay,
          paymentMethods,
          totalStats,
          stats,
          averageTransactionValue,
          _args8 = arguments,
          _t9;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              params = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
              _context8.p = 1;
              startDate = params.startDate, endDate = params.endDate, eventId = params.eventId; // Default date range
              end = endDate || new Date();
              start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
              matchFilter = {
                created_at: {
                  $gte: start,
                  $lte: end
                },
                status: "completed"
              };
              if (eventId) matchFilter.event = eventId;

              // Get revenue by day
              _context8.n = 2;
              return _paymentModel["default"].aggregate([{
                $match: matchFilter
              }, {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$created_at"
                    }
                  },
                  amount: {
                    $sum: "$amount"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }, {
                $project: {
                  date: "$_id",
                  amount: 1,
                  count: 1,
                  _id: 0
                }
              }]);
            case 2:
              revenueByDay = _context8.v;
              _context8.n = 3;
              return _paymentModel["default"].aggregate([{
                $match: matchFilter
              }, {
                $group: {
                  _id: "$payment_method",
                  count: {
                    $sum: 1
                  },
                  amount: {
                    $sum: "$amount"
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $project: {
                  method: "$_id",
                  count: 1,
                  amount: 1,
                  _id: 0
                }
              }]);
            case 3:
              paymentMethods = _context8.v;
              _context8.n = 4;
              return _paymentModel["default"].aggregate([{
                $match: matchFilter
              }, {
                $group: {
                  _id: null,
                  totalRevenue: {
                    $sum: "$amount"
                  },
                  totalTransactions: {
                    $sum: 1
                  }
                }
              }]);
            case 4:
              totalStats = _context8.v;
              stats = totalStats[0] || {
                totalRevenue: 0,
                totalTransactions: 0
              };
              averageTransactionValue = stats.totalTransactions > 0 ? stats.totalRevenue / stats.totalTransactions : 0;
              return _context8.a(2, {
                totalRevenue: stats.totalRevenue,
                totalTransactions: stats.totalTransactions,
                averageTransactionValue: Math.round(averageTransactionValue * 100) / 100,
                revenueByDay: revenueByDay,
                paymentMethods: paymentMethods,
                period: {
                  startDate: start,
                  endDate: end
                }
              });
            case 5:
              _context8.p = 5;
              _t9 = _context8.v;
              throw new Error("Get payment analytics failed: ".concat(_t9.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, null, [[1, 5]]);
      }));
      function getPaymentAnalytics() {
        return _getPaymentAnalytics.apply(this, arguments);
      }
      return getPaymentAnalytics;
    }()
    /**
     * Get time-series voting trends for an event
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} [interval='day'] - Time interval (hour, day, week)
     * @param {Date} [startDate] - Start date (defaults to event start)
     * @param {Date} [endDate] - End date (defaults to now)
     * @returns {Promise<Array>} - Time-series vote data
     */
    )
  }, {
    key: "getVotingTrends",
    value: (function () {
      var _getVotingTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(eventId) {
        var interval,
          startDate,
          endDate,
          _args9 = arguments,
          _t0;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              interval = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : "day";
              startDate = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : null;
              endDate = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : null;
              _context9.p = 1;
              if (!endDate) endDate = new Date();
              if (!startDate) {
                // Default to 30 days ago if no start date
                startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
              }
              _context9.n = 2;
              return _voteRepository["default"].getVotingTrends(eventId, startDate, endDate, interval);
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t0 = _context9.v;
              throw new Error("Get voting trends failed: ".concat(_t0.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, null, [[1, 3]]);
      }));
      function getVotingTrends(_x2) {
        return _getVotingTrends.apply(this, arguments);
      }
      return getVotingTrends;
    }()
    /**
     * Get revenue trends over time
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {string} [interval='day'] - Time interval
     * @returns {Promise<Array>} - Revenue time-series data
     */
    )
  }, {
    key: "getRevenueTrends",
    value: (function () {
      var _getRevenueTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(eventId, startDate, endDate) {
        var interval,
          dateFormat,
          pipeline,
          _args0 = arguments,
          _t1,
          _t10;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              interval = _args0.length > 3 && _args0[3] !== undefined ? _args0[3] : "day";
              _context0.p = 1;
              _t1 = interval;
              _context0.n = _t1 === "hour" ? 2 : _t1 === "week" ? 3 : _t1 === "month" ? 4 : 5;
              break;
            case 2:
              dateFormat = "%Y-%m-%d %H:00";
              return _context0.a(3, 6);
            case 3:
              dateFormat = "%Y-W%U";
              return _context0.a(3, 6);
            case 4:
              dateFormat = "%Y-%m";
              return _context0.a(3, 6);
            case 5:
              dateFormat = "%Y-%m-%d";
            case 6:
              pipeline = [{
                $match: {
                  event: eventId,
                  created_at: {
                    $gte: startDate,
                    $lte: endDate
                  },
                  status: "completed"
                }
              }, {
                $group: {
                  _id: {
                    $dateToString: {
                      format: dateFormat,
                      date: "$created_at"
                    }
                  },
                  revenue: {
                    $sum: "$amount"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }];
              _context0.n = 7;
              return _paymentModel["default"].aggregate(pipeline);
            case 7:
              return _context0.a(2, _context0.v);
            case 8:
              _context0.p = 8;
              _t10 = _context0.v;
              throw new Error("Get revenue trends failed: ".concat(_t10.message));
            case 9:
              return _context0.a(2);
          }
        }, _callee0, null, [[1, 8]]);
      }));
      function getRevenueTrends(_x3, _x4, _x5) {
        return _getRevenueTrends.apply(this, arguments);
      }
      return getRevenueTrends;
    }()
    /**
     * Get user engagement metrics
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @returns {Promise<Object>} - Engagement metrics
     */
    )
  }, {
    key: "getUserEngagement",
    value: (function () {
      var _getUserEngagement = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(eventId, startDate, endDate) {
        var activities, uniqueUsers, actionsPerUser, actionBreakdown, _t11;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return _activityRepository["default"].findByTimeRange(startDate, endDate, {
                event: eventId
              }, 1, 10000);
            case 1:
              activities = _context1.v;
              // Calculate unique users
              uniqueUsers = new Set(activities.data.map(function (a) {
                var _a$user;
                return (_a$user = a.user) === null || _a$user === void 0 ? void 0 : _a$user.toString();
              })); // Calculate actions per user
              actionsPerUser = activities.data.length / uniqueUsers.size || 0; // Get action breakdown
              actionBreakdown = activities.data.reduce(function (acc, activity) {
                acc[activity.action] = (acc[activity.action] || 0) + 1;
                return acc;
              }, {});
              return _context1.a(2, {
                totalActions: activities.data.length,
                uniqueUsers: uniqueUsers.size,
                averageActionsPerUser: Math.round(actionsPerUser * 100) / 100,
                actionBreakdown: actionBreakdown,
                period: {
                  startDate: startDate,
                  endDate: endDate
                }
              });
            case 2:
              _context1.p = 2;
              _t11 = _context1.v;
              throw new Error("Get user engagement failed: ".concat(_t11.message));
            case 3:
              return _context1.a(2);
          }
        }, _callee1, null, [[0, 2]]);
      }));
      function getUserEngagement(_x6, _x7, _x8) {
        return _getUserEngagement.apply(this, arguments);
      }
      return getUserEngagement;
    }()
    /**
     * Compare event performance
     * @param {Array<mongoose.Types.ObjectId>} eventIds - Array of event IDs
     * @returns {Promise<Array>} - Comparative event data
     */
    )
  }, {
    key: "compareEvents",
    value: (function () {
      var _compareEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(eventIds) {
        var comparisons, _t12;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return Promise.all(eventIds.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(eventId) {
                  var _yield$Promise$all1, _yield$Promise$all10, votes, payments, candidates, submissions;
                  return _regenerator().w(function (_context10) {
                    while (1) switch (_context10.n) {
                      case 0:
                        _context10.n = 1;
                        return Promise.all([_voteRepository["default"].getStatisticsByEvent(eventId), _paymentModel["default"].getStatistics(eventId), _candidateRepository["default"].getStatisticsByEvent(eventId), _submissionRepository["default"].getEventStatistics(eventId)]);
                      case 1:
                        _yield$Promise$all1 = _context10.v;
                        _yield$Promise$all10 = _slicedToArray(_yield$Promise$all1, 4);
                        votes = _yield$Promise$all10[0];
                        payments = _yield$Promise$all10[1];
                        candidates = _yield$Promise$all10[2];
                        submissions = _yield$Promise$all10[3];
                        return _context10.a(2, {
                          eventId: eventId,
                          votes: votes.totalVotes,
                          revenue: payments.totalRevenue,
                          candidates: candidates.total,
                          submissions: submissions.total,
                          conversionRate: submissions.total > 0 ? votes.totalVotes / submissions.total * 100 : 0
                        });
                    }
                  }, _callee10);
                }));
                return function (_x0) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
              comparisons = _context11.v;
              return _context11.a(2, comparisons);
            case 2:
              _context11.p = 2;
              _t12 = _context11.v;
              throw new Error("Compare events failed: ".concat(_t12.message));
            case 3:
              return _context11.a(2);
          }
        }, _callee11, null, [[0, 2]]);
      }));
      function compareEvents(_x9) {
        return _compareEvents.apply(this, arguments);
      }
      return compareEvents;
    }()
    /**
     * Get candidate performance ranking
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {mongoose.Types.ObjectId} [categoryId] - Optional category filter
     * @param {number} [limit=20] - Number of top candidates
     * @returns {Promise<Array>} - Ranked candidates with vote counts
     */
    )
  }, {
    key: "getCandidateRanking",
    value: (function () {
      var _getCandidateRanking = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(eventId) {
        var categoryId,
          limit,
          _args12 = arguments,
          _t13;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              categoryId = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : null;
              limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 20;
              _context12.p = 1;
              _context12.n = 2;
              return _voteRepository["default"].getCandidateLeaderboard(eventId, categoryId, limit);
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t13 = _context12.v;
              throw new Error("Get candidate ranking failed: ".concat(_t13.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, null, [[1, 3]]);
      }));
      function getCandidateRanking(_x1) {
        return _getCandidateRanking.apply(this, arguments);
      }
      return getCandidateRanking;
    }()
    /**
     * Get conversion funnel analysis
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Funnel metrics
     */
    )
  }, {
    key: "getConversionFunnel",
    value: (function () {
      var _getConversionFunnel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(eventId) {
        var _yield$Promise$all11, _yield$Promise$all12, submissions, votes, payments, funnel, _t14;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return Promise.all([_submissionRepository["default"].getEventStatistics(eventId), _voteRepository["default"].getStatisticsByEvent(eventId), _paymentModel["default"].getStatistics(eventId)]);
            case 1:
              _yield$Promise$all11 = _context13.v;
              _yield$Promise$all12 = _slicedToArray(_yield$Promise$all11, 3);
              submissions = _yield$Promise$all12[0];
              votes = _yield$Promise$all12[1];
              payments = _yield$Promise$all12[2];
              funnel = {
                submissions: submissions.total,
                conversions: submissions.converted,
                votes: votes.totalVotes,
                payments: payments.completed,
                dropoff: {
                  submissionToConversion: submissions.total > 0 ? (submissions.total - submissions.converted) / submissions.total * 100 : 0,
                  conversionToVote: submissions.converted > 0 ? (submissions.converted - votes.totalVotes) / submissions.converted * 100 : 0,
                  voteToPayment: votes.totalVotes > 0 ? (votes.totalVotes - payments.completed) / votes.totalVotes * 100 : 0
                }
              };
              return _context13.a(2, funnel);
            case 2:
              _context13.p = 2;
              _t14 = _context13.v;
              throw new Error("Get conversion funnel failed: ".concat(_t14.message));
            case 3:
              return _context13.a(2);
          }
        }, _callee13, null, [[0, 2]]);
      }));
      function getConversionFunnel(_x10) {
        return _getConversionFunnel.apply(this, arguments);
      }
      return getConversionFunnel;
    }()
    /**
     * Get activity heatmap (hourly activity distribution)
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @returns {Promise<Object>} - Heatmap data
     */
    )
  }, {
    key: "getActivityHeatmap",
    value: (function () {
      var _getActivityHeatmap = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(eventId, startDate, endDate) {
        var timeline, heatmap, _t15;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _context14.n = 1;
              return _activityRepository["default"].getTimeline(startDate, endDate, "hour", {
                event: eventId
              });
            case 1:
              timeline = _context14.v;
              // Group by day of week and hour
              heatmap = timeline.reduce(function (acc, item) {
                var date = new Date(item._id.date);
                var dayOfWeek = date.getDay();
                var hour = date.getHours();
                if (!acc[dayOfWeek]) acc[dayOfWeek] = {};
                acc[dayOfWeek][hour] = (acc[dayOfWeek][hour] || 0) + item.count;
                return acc;
              }, {});
              return _context14.a(2, heatmap);
            case 2:
              _context14.p = 2;
              _t15 = _context14.v;
              throw new Error("Get activity heatmap failed: ".concat(_t15.message));
            case 3:
              return _context14.a(2);
          }
        }, _callee14, null, [[0, 2]]);
      }));
      function getActivityHeatmap(_x11, _x12, _x13) {
        return _getActivityHeatmap.apply(this, arguments);
      }
      return getActivityHeatmap;
    }()
    /**
     * Get real-time event metrics (last N minutes)
     * @param {mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [minutes=15] - Time window in minutes
     * @returns {Promise<Object>} - Real-time metrics
     */
    )
  }, {
    key: "getRealTimeMetrics",
    value: (function () {
      var _getRealTimeMetrics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(eventId) {
        var minutes,
          timeWindow,
          _yield$Promise$all13,
          _yield$Promise$all14,
          voteVelocity,
          recentActivities,
          _args15 = arguments,
          _t16;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              minutes = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 15;
              _context15.p = 1;
              timeWindow = new Date(Date.now() - minutes * 60 * 1000);
              _context15.n = 2;
              return Promise.all([_voteRepository["default"].getVoteVelocity(eventId, minutes), _activityRepository["default"].findByTimeRange(timeWindow, new Date(), {
                event: eventId
              }, 1, 100)]);
            case 2:
              _yield$Promise$all13 = _context15.v;
              _yield$Promise$all14 = _slicedToArray(_yield$Promise$all13, 2);
              voteVelocity = _yield$Promise$all14[0];
              recentActivities = _yield$Promise$all14[1];
              return _context15.a(2, {
                voteVelocity: voteVelocity,
                // votes per minute
                recentActivities: recentActivities.data.length,
                timestamp: new Date(),
                timeWindow: minutes
              });
            case 3:
              _context15.p = 3;
              _t16 = _context15.v;
              throw new Error("Get real-time metrics failed: ".concat(_t16.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, null, [[1, 3]]);
      }));
      function getRealTimeMetrics(_x14) {
        return _getRealTimeMetrics.apply(this, arguments);
      }
      return getRealTimeMetrics;
    }()
    /**
     * Get device analytics (device types, browsers, OS)
     * @param {Object} params - Query parameters
     * @param {string} [params.period] - Time period (7d, 30d, 90d, 1y)
     * @param {Date} [params.start_date] - Start date
     * @param {Date} [params.end_date] - End date
     * @param {mongoose.Types.ObjectId} [params.event_id] - Filter by event
     * @returns {Promise<Object>} - Device analytics
     */
    )
  }, {
    key: "getDeviceAnalytics",
    value: (function () {
      var _getDeviceAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var params,
          ActivityModel,
          dateQuery,
          eventQuery,
          deviceTypes,
          browsers,
          operatingSystems,
          totalActivities,
          deviceTypesWithPercentage,
          browsersWithPercentage,
          osWithPercentage,
          _args16 = arguments,
          _t17;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              params = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : {};
              _context16.p = 1;
              ActivityModel = _activityRepository["default"].model; // Build date range query
              dateQuery = {};
              if (params.start_date && params.end_date) {
                dateQuery.timestamp = {
                  $gte: new Date(params.start_date),
                  $lte: new Date(params.end_date)
                };
              }

              // Build event filter
              eventQuery = params.event_id ? {
                event: params.event_id
              } : {}; // Aggregate device types
              _context16.n = 2;
              return ActivityModel.aggregate([{
                $match: _objectSpread(_objectSpread(_objectSpread({}, dateQuery), eventQuery), {}, {
                  "device.device_type": {
                    $exists: true,
                    $ne: null
                  }
                })
              }, {
                $group: {
                  _id: "$device.device_type",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }]);
            case 2:
              deviceTypes = _context16.v;
              _context16.n = 3;
              return ActivityModel.aggregate([{
                $match: _objectSpread(_objectSpread(_objectSpread({}, dateQuery), eventQuery), {}, {
                  "device.browser.name": {
                    $exists: true,
                    $ne: null
                  }
                })
              }, {
                $group: {
                  _id: "$device.browser.name",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $limit: 10 // Top 10 browsers
              }]);
            case 3:
              browsers = _context16.v;
              _context16.n = 4;
              return ActivityModel.aggregate([{
                $match: _objectSpread(_objectSpread(_objectSpread({}, dateQuery), eventQuery), {}, {
                  "device.os.name": {
                    $exists: true,
                    $ne: null
                  }
                })
              }, {
                $group: {
                  _id: "$device.os.name",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $limit: 10 // Top 10 operating systems
              }]);
            case 4:
              operatingSystems = _context16.v;
              // Calculate total and percentages
              totalActivities = deviceTypes.reduce(function (sum, item) {
                return sum + item.count;
              }, 0);
              deviceTypesWithPercentage = deviceTypes.map(function (item) {
                return {
                  type: item._id,
                  count: item.count,
                  percentage: totalActivities > 0 ? (item.count / totalActivities * 100).toFixed(1) : 0
                };
              });
              browsersWithPercentage = browsers.map(function (item) {
                return {
                  name: item._id,
                  count: item.count,
                  percentage: totalActivities > 0 ? (item.count / totalActivities * 100).toFixed(1) : 0
                };
              });
              osWithPercentage = operatingSystems.map(function (item) {
                return {
                  name: item._id,
                  count: item.count,
                  percentage: totalActivities > 0 ? (item.count / totalActivities * 100).toFixed(1) : 0
                };
              });
              return _context16.a(2, {
                totalActivities: totalActivities,
                deviceTypes: deviceTypesWithPercentage,
                browsers: browsersWithPercentage,
                operatingSystems: osWithPercentage,
                period: {
                  startDate: params.start_date,
                  endDate: params.end_date
                }
              });
            case 5:
              _context16.p = 5;
              _t17 = _context16.v;
              throw new Error("Get device analytics failed: ".concat(_t17.message));
            case 6:
              return _context16.a(2);
          }
        }, _callee16, null, [[1, 5]]);
      }));
      function getDeviceAnalytics() {
        return _getDeviceAnalytics.apply(this, arguments);
      }
      return getDeviceAnalytics;
    }()
    /**
     * Get region analytics (countries, cities)
     * @param {Object} params - Query parameters
     * @param {string} [params.period] - Time period (7d, 30d, 90d, 1y)
     * @param {Date} [params.start_date] - Start date
     * @param {Date} [params.end_date] - End date
     * @param {mongoose.Types.ObjectId} [params.event_id] - Filter by event
     * @returns {Promise<Object>} - Region analytics
     */
    )
  }, {
    key: "getRegionAnalytics",
    value: (function () {
      var _getRegionAnalytics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var params,
          ActivityModel,
          dateQuery,
          eventQuery,
          countries,
          regions,
          cities,
          totalActivities,
          countriesWithPercentage,
          regionsWithPercentage,
          citiesWithPercentage,
          _args17 = arguments,
          _t18;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              params = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : {};
              _context17.p = 1;
              ActivityModel = _activityRepository["default"].model; // Build date range query
              dateQuery = {};
              if (params.start_date && params.end_date) {
                dateQuery.timestamp = {
                  $gte: new Date(params.start_date),
                  $lte: new Date(params.end_date)
                };
              }

              // Build event filter
              eventQuery = params.event_id ? {
                event: params.event_id
              } : {}; // Aggregate by country
              _context17.n = 2;
              return ActivityModel.aggregate([{
                $match: _objectSpread(_objectSpread(_objectSpread({}, dateQuery), eventQuery), {}, {
                  "location.country": {
                    $exists: true,
                    $ne: null
                  }
                })
              }, {
                $group: {
                  _id: "$location.country",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $limit: 20 // Top 20 countries
              }]);
            case 2:
              countries = _context17.v;
              _context17.n = 3;
              return ActivityModel.aggregate([{
                $match: _objectSpread(_objectSpread(_objectSpread({}, dateQuery), eventQuery), {}, {
                  "location.region": {
                    $exists: true,
                    $ne: null
                  }
                })
              }, {
                $group: {
                  _id: {
                    country: "$location.country",
                    region: "$location.region"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $limit: 15 // Top 15 regions
              }]);
            case 3:
              regions = _context17.v;
              _context17.n = 4;
              return ActivityModel.aggregate([{
                $match: _objectSpread(_objectSpread(_objectSpread({}, dateQuery), eventQuery), {}, {
                  "location.city": {
                    $exists: true,
                    $ne: null
                  }
                })
              }, {
                $group: {
                  _id: {
                    country: "$location.country",
                    city: "$location.city"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }, {
                $limit: 15 // Top 15 cities
              }]);
            case 4:
              cities = _context17.v;
              // Calculate total and percentages
              totalActivities = countries.reduce(function (sum, item) {
                return sum + item.count;
              }, 0);
              countriesWithPercentage = countries.map(function (item) {
                return {
                  country: item._id,
                  count: item.count,
                  percentage: totalActivities > 0 ? (item.count / totalActivities * 100).toFixed(1) : 0
                };
              });
              regionsWithPercentage = regions.map(function (item) {
                return {
                  country: item._id.country,
                  region: item._id.region,
                  count: item.count,
                  percentage: totalActivities > 0 ? (item.count / totalActivities * 100).toFixed(1) : 0
                };
              });
              citiesWithPercentage = cities.map(function (item) {
                return {
                  country: item._id.country,
                  city: item._id.city,
                  count: item.count,
                  percentage: totalActivities > 0 ? (item.count / totalActivities * 100).toFixed(1) : 0
                };
              });
              return _context17.a(2, {
                totalActivities: totalActivities,
                countries: countriesWithPercentage,
                regions: regionsWithPercentage,
                cities: citiesWithPercentage,
                period: {
                  startDate: params.start_date,
                  endDate: params.end_date
                }
              });
            case 5:
              _context17.p = 5;
              _t18 = _context17.v;
              throw new Error("Get region analytics failed: ".concat(_t18.message));
            case 6:
              return _context17.a(2);
          }
        }, _callee17, null, [[1, 5]]);
      }));
      function getRegionAnalytics() {
        return _getRegionAnalytics.apply(this, arguments);
      }
      return getRegionAnalytics;
    }())
  }]);
}(); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new AnalyticsService();