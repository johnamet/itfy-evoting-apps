"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VoteController = void 0;
var _baseController = _interopRequireDefault(require("../../shared/base.controller.js"));
var _voteService = _interopRequireDefault(require("./vote.service.js"));
var _voteValidation = _interopRequireDefault(require("./vote.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
 * Vote Controller
 * Handles HTTP requests for vote casting and management
 */
var VoteController = exports.VoteController = /*#__PURE__*/function (_BaseController) {
  function VoteController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, VoteController);
    return _callSuper(this, VoteController, [{
      voteService: dependencies.voteService || _voteService["default"]
    }]);
  }

  // ==================== VOTE CASTING ====================

  /**
   * Cast a vote
   * POST /api/votes
   */
  _inherits(VoteController, _BaseController);
  return _createClass(VoteController, [{
    key: "cast",
    value: function () {
      var _cast = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var _req$body, vote_code, candidate_id, category_id, event_id, ipAddress, userAgent, vote;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _req$body = req.body, vote_code = _req$body.vote_code, candidate_id = _req$body.candidate_id, category_id = _req$body.category_id, event_id = _req$body.event_id;
              ipAddress = this.getClientIP(req);
              userAgent = req.headers["user-agent"];
              _context.n = 1;
              return this.service("voteService").castVote({
                voteCode: vote_code,
                candidateId: candidate_id,
                categoryId: category_id,
                eventId: event_id,
                ipAddress: ipAddress,
                userAgent: userAgent,
                metadata: req.body.metadata || {}
              });
            case 1:
              vote = _context.v;
              return _context.a(2, this.created(res, {
                data: vote,
                message: "Vote cast successfully"
              }));
          }
        }, _callee, this);
      }));
      function cast(_x, _x2) {
        return _cast.apply(this, arguments);
      }
      return cast;
    }()
    /**
     * Validate vote eligibility before casting
     * POST /api/votes/validate-eligibility
     */
  }, {
    key: "validateEligibility",
    value: (function () {
      var _validateEligibility = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _req$body2, vote_code, category_id, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _req$body2 = req.body, vote_code = _req$body2.vote_code, category_id = _req$body2.category_id;
              if (!(!vote_code || !category_id)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, this.badRequest(res, {
                message: "vote_code and category_id are required"
              }));
            case 1:
              _context2.n = 2;
              return this.service("voteService").validateVoteEligibility(vote_code, category_id);
            case 2:
              result = _context2.v;
              return _context2.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee2, this);
      }));
      function validateEligibility(_x3, _x4) {
        return _validateEligibility.apply(this, arguments);
      }
      return validateEligibility;
    }() // ==================== VOTE QUERIES ====================
    /**
     * Get all votes with pagination and filters
     * GET /api/votes
     */
    )
  }, {
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, result;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["event", "candidate", "category", "payment", "status", "vote_code"]);
              sort = this.getSort(req, "-cast_at"); // Date range filters
              if (req.query.cast_at_from) {
                filters.cast_at = _objectSpread(_objectSpread({}, filters.cast_at), {}, {
                  $gte: new Date(req.query.cast_at_from)
                });
              }
              if (req.query.cast_at_to) {
                filters.cast_at = _objectSpread(_objectSpread({}, filters.cast_at), {}, {
                  $lte: new Date(req.query.cast_at_to)
                });
              }
              _context3.n = 1;
              return this.service("voteService").repository.findAll(filters, page, limit, {
                sort: sort,
                populate: ["candidate", "category"]
              });
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
      function list(_x5, _x6) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get vote by ID
     * GET /api/votes/:id
     */
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var id, vote;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = req.params.id;
              _context4.n = 1;
              return this.service("voteService").getVoteById(id, {
                populate: ["candidate", "category", "event"]
              });
            case 1:
              vote = _context4.v;
              return _context4.a(2, this.success(res, {
                data: vote
              }));
          }
        }, _callee4, this);
      }));
      function getById(_x7, _x8) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Get votes by vote code
     * GET /api/votes/code/:code
     */
    )
  }, {
    key: "getByVoteCode",
    value: (function () {
      var _getByVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var code, votes;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              code = req.params.code;
              _context5.n = 1;
              return this.service("voteService").getVotesByVoteCode(code.toUpperCase(), {
                populate: ["candidate", "category"]
              });
            case 1:
              votes = _context5.v;
              return _context5.a(2, this.success(res, {
                data: votes
              }));
          }
        }, _callee5, this);
      }));
      function getByVoteCode(_x9, _x0) {
        return _getByVoteCode.apply(this, arguments);
      }
      return getByVoteCode;
    }()
    /**
     * Get votes by candidate
     * GET /api/votes/candidate/:candidateId
     */
    )
  }, {
    key: "getByCandidate",
    value: (function () {
      var _getByCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var candidateId, _this$getPagination2, page, limit, result;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              candidateId = req.params.candidateId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              _context6.n = 1;
              return this.service("voteService").getVotesByCandidate(candidateId, page, limit);
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
      function getByCandidate(_x1, _x10) {
        return _getByCandidate.apply(this, arguments);
      }
      return getByCandidate;
    }()
    /**
     * Get votes by category
     * GET /api/votes/category/:categoryId
     */
    )
  }, {
    key: "getByCategory",
    value: (function () {
      var _getByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var categoryId, _this$getPagination3, page, limit, result;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              categoryId = req.params.categoryId;
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit;
              _context7.n = 1;
              return this.service("voteService").getVotesByCategory(categoryId, page, limit);
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
      function getByCategory(_x11, _x12) {
        return _getByCategory.apply(this, arguments);
      }
      return getByCategory;
    }()
    /**
     * Get votes by event
     * GET /api/votes/event/:eventId
     */
    )
  }, {
    key: "getByEvent",
    value: (function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var eventId, _this$getPagination4, page, limit, result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit;
              _context8.n = 1;
              return this.service("voteService").getVotesByEvent(eventId, page, limit);
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
      function getByEvent(_x13, _x14) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }() // ==================== VOTE MANAGEMENT (ADMIN) ====================
    /**
     * Refund a vote (admin only)
     * POST /api/votes/:id/refund
     */
    )
  }, {
    key: "refund",
    value: function () {
      var _refund = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var id, validated, adminId, vote;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _voteValidation["default"].refundVoteSchema);
              adminId = this.getUserId(req);
              _context9.n = 1;
              return this.service("voteService").refundVote(id, validated.refund_reason, adminId);
            case 1:
              vote = _context9.v;
              return _context9.a(2, this.success(res, {
                data: vote,
                message: "Vote refunded successfully"
              }));
          }
        }, _callee9, this);
      }));
      function refund(_x15, _x16) {
        return _refund.apply(this, arguments);
      }
      return refund;
    }() // ==================== VOTE COUNTS ====================
    /**
     * Get vote count by candidate
     * GET /api/votes/count/candidate/:candidateId
     */
  }, {
    key: "countByCandidate",
    value: function () {
      var _countByCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var candidateId, count;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              candidateId = req.params.candidateId;
              _context0.n = 1;
              return this.service("voteService").getVoteCountByCandidate(candidateId);
            case 1:
              count = _context0.v;
              return _context0.a(2, this.success(res, {
                data: {
                  candidate_id: candidateId,
                  vote_count: count
                }
              }));
          }
        }, _callee0, this);
      }));
      function countByCandidate(_x17, _x18) {
        return _countByCandidate.apply(this, arguments);
      }
      return countByCandidate;
    }()
    /**
     * Get vote count by category
     * GET /api/votes/count/category/:categoryId
     */
  }, {
    key: "countByCategory",
    value: (function () {
      var _countByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var categoryId, count;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              categoryId = req.params.categoryId;
              _context1.n = 1;
              return this.service("voteService").getVoteCountByCategory(categoryId);
            case 1:
              count = _context1.v;
              return _context1.a(2, this.success(res, {
                data: {
                  category_id: categoryId,
                  vote_count: count
                }
              }));
          }
        }, _callee1, this);
      }));
      function countByCategory(_x19, _x20) {
        return _countByCategory.apply(this, arguments);
      }
      return countByCategory;
    }()
    /**
     * Get vote count by event
     * GET /api/votes/count/event/:eventId
     */
    )
  }, {
    key: "countByEvent",
    value: (function () {
      var _countByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var eventId, count;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              eventId = req.params.eventId;
              _context10.n = 1;
              return this.service("voteService").getVoteCountByEvent(eventId);
            case 1:
              count = _context10.v;
              return _context10.a(2, this.success(res, {
                data: {
                  event_id: eventId,
                  vote_count: count
                }
              }));
          }
        }, _callee10, this);
      }));
      function countByEvent(_x21, _x22) {
        return _countByEvent.apply(this, arguments);
      }
      return countByEvent;
    }() // ==================== RESULTS & ANALYTICS ====================
    /**
     * Get category results
     * GET /api/votes/results/category/:categoryId
     */
    )
  }, {
    key: "getCategoryResults",
    value: function () {
      var _getCategoryResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var categoryId, results;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              categoryId = req.params.categoryId;
              _context11.n = 1;
              return this.service("voteService").getCategoryResults(categoryId);
            case 1:
              results = _context11.v;
              return _context11.a(2, this.success(res, {
                data: results
              }));
          }
        }, _callee11, this);
      }));
      function getCategoryResults(_x23, _x24) {
        return _getCategoryResults.apply(this, arguments);
      }
      return getCategoryResults;
    }()
    /**
     * Get event results
     * GET /api/votes/results/event/:eventId
     */
  }, {
    key: "getEventResults",
    value: (function () {
      var _getEventResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var eventId, results;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              eventId = req.params.eventId;
              _context12.n = 1;
              return this.service("voteService").getEventResults(eventId);
            case 1:
              results = _context12.v;
              return _context12.a(2, this.success(res, {
                data: results
              }));
          }
        }, _callee12, this);
      }));
      function getEventResults(_x25, _x26) {
        return _getEventResults.apply(this, arguments);
      }
      return getEventResults;
    }()
    /**
     * Get voting trends
     * GET /api/votes/trends/:eventId
     */
    )
  }, {
    key: "getVotingTrends",
    value: (function () {
      var _getVotingTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var eventId, _req$query, interval, start_date, end_date, trends;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query = req.query, interval = _req$query.interval, start_date = _req$query.start_date, end_date = _req$query.end_date;
              _context13.n = 1;
              return this.service("voteService").getVotingTrends(eventId, interval || "day", start_date ? new Date(start_date) : undefined, end_date ? new Date(end_date) : undefined);
            case 1:
              trends = _context13.v;
              return _context13.a(2, this.success(res, {
                data: trends
              }));
          }
        }, _callee13, this);
      }));
      function getVotingTrends(_x27, _x28) {
        return _getVotingTrends.apply(this, arguments);
      }
      return getVotingTrends;
    }()
    /**
     * Get vote distribution by category
     * GET /api/votes/distribution/:eventId
     */
    )
  }, {
    key: "getVoteDistribution",
    value: (function () {
      var _getVoteDistribution = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var eventId, distribution;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              eventId = req.params.eventId;
              _context14.n = 1;
              return this.service("voteService").getVoteDistribution(eventId);
            case 1:
              distribution = _context14.v;
              return _context14.a(2, this.success(res, {
                data: distribution
              }));
          }
        }, _callee14, this);
      }));
      function getVoteDistribution(_x29, _x30) {
        return _getVoteDistribution.apply(this, arguments);
      }
      return getVoteDistribution;
    }()
    /**
     * Get top candidates
     * GET /api/votes/top-candidates/:eventId
     */
    )
  }, {
    key: "getTopCandidates",
    value: (function () {
      var _getTopCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var eventId, limit, topCandidates;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              eventId = req.params.eventId;
              limit = parseInt(req.query.limit, 10) || 10;
              _context15.n = 1;
              return this.service("voteService").getTopCandidates(eventId, limit);
            case 1:
              topCandidates = _context15.v;
              return _context15.a(2, this.success(res, {
                data: topCandidates
              }));
          }
        }, _callee15, this);
      }));
      function getTopCandidates(_x31, _x32) {
        return _getTopCandidates.apply(this, arguments);
      }
      return getTopCandidates;
    }()
    /**
     * Get voting statistics
     * GET /api/votes/stats/:eventId
     */
    )
  }, {
    key: "getVotingStats",
    value: (function () {
      var _getVotingStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var eventId, stats;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              eventId = req.params.eventId;
              _context16.n = 1;
              return this.service("voteService").getVotingStats(eventId);
            case 1:
              stats = _context16.v;
              return _context16.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee16, this);
      }));
      function getVotingStats(_x33, _x34) {
        return _getVotingStats.apply(this, arguments);
      }
      return getVotingStats;
    }() // ==================== SECURITY & MONITORING ====================
    /**
     * Detect suspicious voting patterns
     * GET /api/votes/suspicious/:eventId
     */
    )
  }, {
    key: "detectSuspicious",
    value: function () {
      var _detectSuspicious = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var eventId, threshold, minutes, patterns;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              eventId = req.params.eventId;
              threshold = parseInt(req.query.threshold, 10) || 10;
              minutes = parseInt(req.query.minutes, 10) || 5;
              _context17.n = 1;
              return this.service("voteService").detectSuspiciousPatterns(eventId, threshold, minutes);
            case 1:
              patterns = _context17.v;
              return _context17.a(2, this.success(res, {
                data: patterns
              }));
          }
        }, _callee17, this);
      }));
      function detectSuspicious(_x35, _x36) {
        return _detectSuspicious.apply(this, arguments);
      }
      return detectSuspicious;
    }() // ==================== VOTER HISTORY ====================
    /**
     * Get voter history by vote code
     * GET /api/votes/history/:code
     */
  }, {
    key: "getVoterHistory",
    value: function () {
      var _getVoterHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var code, history;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              code = req.params.code;
              _context18.n = 1;
              return this.service("voteService").getVoterHistory(code.toUpperCase());
            case 1:
              history = _context18.v;
              return _context18.a(2, this.success(res, {
                data: history
              }));
          }
        }, _callee18, this);
      }));
      function getVoterHistory(_x37, _x38) {
        return _getVoterHistory.apply(this, arguments);
      }
      return getVoterHistory;
    }()
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new VoteController();