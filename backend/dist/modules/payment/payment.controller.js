"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PaymentController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _paymentService = _interopRequireDefault(require("./payment.service.js"));
var _paymentValidation = _interopRequireDefault(require("./payment.validation.js"));
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
 * Payment Controller
 * Handles HTTP requests for payment processing and management
 */
var PaymentController = exports.PaymentController = /*#__PURE__*/function (_BaseController) {
  function PaymentController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PaymentController);
    return _callSuper(this, PaymentController, [{
      paymentService: dependencies.paymentService || _paymentService["default"]
    }]);
  }

  // ==================== PAYMENT INITIALIZATION ====================

  /**
   * Initialize a new payment
   * POST /api/payments/initialize
   */
  _inherits(PaymentController, _BaseController);
  return _createClass(PaymentController, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, ipAddress, userAgent, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _paymentValidation["default"].initializePaymentSchema);
              ipAddress = this.getClientIP(req);
              userAgent = req.headers["user-agent"];
              _context.n = 1;
              return this.service("paymentService").initializePayment(_objectSpread(_objectSpread({}, validated), {}, {
                ip_address: ipAddress,
                user_agent: userAgent
              }));
            case 1:
              result = _context.v;
              return _context.a(2, this.success(res, {
                data: result,
                message: "Payment initialized successfully"
              }));
          }
        }, _callee, this);
      }));
      function initialize(_x, _x2) {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Verify payment status
     * GET /api/payments/verify/:reference
     */
  }, {
    key: "verify",
    value: (function () {
      var _verify = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var reference, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              reference = req.params.reference;
              _context2.n = 1;
              return this.service("paymentService").verifyPayment(reference);
            case 1:
              result = _context2.v;
              return _context2.a(2, this.success(res, {
                data: result,
                message: result.message
              }));
          }
        }, _callee2, this);
      }));
      function verify(_x3, _x4) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
    /**
     * Handle Paystack webhook
     * POST /api/payments/webhook
     */
    )
  }, {
    key: "webhook",
    value: (function () {
      var _webhook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var signature, payload, result, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              signature = req.headers["x-paystack-signature"];
              payload = req.body;
              _context3.p = 1;
              _context3.n = 2;
              return this.service("paymentService").handleWebhook(payload, signature);
            case 2:
              result = _context3.v;
              return _context3.a(2, this.success(res, {
                data: result
              }));
            case 3:
              _context3.p = 3;
              _t = _context3.v;
              // Always return 200 to Paystack to acknowledge receipt
              console.error("Webhook error:", _t.message);
              return _context3.a(2, this.success(res, {
                message: "Webhook received"
              }));
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function webhook(_x5, _x6) {
        return _webhook.apply(this, arguments);
      }
      return webhook;
    }() // ==================== PAYMENT QUERIES ====================
    /**
     * Get all payments with pagination and filters
     * GET /api/payments
     */
    )
  }, {
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["event", "bundle", "payment_status", "payment_method", "voter_email", "vote_code", "transaction_reference", "webhook_received"]);
              sort = this.getSort(req, "-created_at"); // Date range filters
              if (req.query.created_at_from) {
                filters.created_at = _objectSpread(_objectSpread({}, filters.created_at), {}, {
                  $gte: new Date(req.query.created_at_from)
                });
              }
              if (req.query.created_at_to) {
                filters.created_at = _objectSpread(_objectSpread({}, filters.created_at), {}, {
                  $lte: new Date(req.query.created_at_to)
                });
              }
              _context4.n = 1;
              return this.service("paymentService").repository.findAll(filters, page, limit, {
                sort: sort,
                populate: ["bundle", "event", "coupon"]
              });
            case 1:
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
      function list(_x7, _x8) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get payment by ID
     * GET /api/payments/:id
     */
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, payment;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              _context5.n = 1;
              return this.service("paymentService").repository.findById(id, {
                populate: ["bundle", "event", "coupon"]
              });
            case 1:
              payment = _context5.v;
              if (payment) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2, this.notFound(res, {
                resource: "Payment"
              }));
            case 2:
              return _context5.a(2, this.success(res, {
                data: payment
              }));
          }
        }, _callee5, this);
      }));
      function getById(_x9, _x0) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Get payment by transaction reference
     * GET /api/payments/reference/:reference
     */
    )
  }, {
    key: "getByReference",
    value: (function () {
      var _getByReference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var reference, payment;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              reference = req.params.reference;
              _context6.n = 1;
              return this.service("paymentService").repository.findByTransactionReference(reference);
            case 1:
              payment = _context6.v;
              if (payment) {
                _context6.n = 2;
                break;
              }
              return _context6.a(2, this.notFound(res, {
                resource: "Payment"
              }));
            case 2:
              return _context6.a(2, this.success(res, {
                data: payment
              }));
          }
        }, _callee6, this);
      }));
      function getByReference(_x1, _x10) {
        return _getByReference.apply(this, arguments);
      }
      return getByReference;
    }()
    /**
     * Get payment by vote code
     * GET /api/payments/vote-code/:code
     */
    )
  }, {
    key: "getByVoteCode",
    value: (function () {
      var _getByVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var code, payment;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              code = req.params.code;
              _context7.n = 1;
              return this.service("paymentService").repository.findByVoteCode(code.toUpperCase());
            case 1:
              payment = _context7.v;
              if (payment) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2, this.notFound(res, {
                resource: "Payment"
              }));
            case 2:
              return _context7.a(2, this.success(res, {
                data: payment
              }));
          }
        }, _callee7, this);
      }));
      function getByVoteCode(_x11, _x12) {
        return _getByVoteCode.apply(this, arguments);
      }
      return getByVoteCode;
    }() // ==================== EVENT-BASED QUERIES ====================
    /**
     * Get payments by event
     * GET /api/payments/event/:eventId
     */
    )
  }, {
    key: "getByEvent",
    value: function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var eventId, _this$getPagination2, page, limit, filters, result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              filters = this.getFilters(req, ["payment_status", "payment_method"]);
              _context8.n = 1;
              return this.service("paymentService").repository.findAll(_objectSpread({
                event: eventId
              }, filters), page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["bundle", "coupon"]
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
      function getByEvent(_x13, _x14) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get payments by bundle
     * GET /api/payments/bundle/:bundleId
     */
  }, {
    key: "getByBundle",
    value: (function () {
      var _getByBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var bundleId, _this$getPagination3, page, limit, result;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              bundleId = req.params.bundleId;
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit;
              _context9.n = 1;
              return this.service("paymentService").repository.findAll({
                bundle: bundleId
              }, page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["event"]
              });
            case 1:
              result = _context9.v;
              return _context9.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee9, this);
      }));
      function getByBundle(_x15, _x16) {
        return _getByBundle.apply(this, arguments);
      }
      return getByBundle;
    }() // ==================== VOTE CODE MANAGEMENT ====================
    /**
     * Validate vote code
     * POST /api/payments/validate-vote-code
     */
    )
  }, {
    key: "validateVoteCode",
    value: function () {
      var _validateVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var vote_code, result;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              vote_code = req.body.vote_code;
              if (vote_code) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2, this.badRequest(res, {
                message: "vote_code is required"
              }));
            case 1:
              _context0.n = 2;
              return this.service("paymentService").validateVoteCode(vote_code.toUpperCase());
            case 2:
              result = _context0.v;
              return _context0.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee0, this);
      }));
      function validateVoteCode(_x17, _x18) {
        return _validateVoteCode.apply(this, arguments);
      }
      return validateVoteCode;
    }()
    /**
     * Get vote code status and remaining votes
     * GET /api/payments/vote-code/:code/status
     */
  }, {
    key: "getVoteCodeStatus",
    value: (function () {
      var _getVoteCodeStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var code, payment;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              code = req.params.code;
              _context1.n = 1;
              return this.service("paymentService").repository.findByVoteCode(code.toUpperCase());
            case 1:
              payment = _context1.v;
              if (payment) {
                _context1.n = 2;
                break;
              }
              return _context1.a(2, this.notFound(res, {
                message: "Invalid vote code"
              }));
            case 2:
              return _context1.a(2, this.success(res, {
                data: {
                  vote_code: payment.vote_code,
                  votes_purchased: payment.votes_purchased,
                  votes_cast: payment.votes_cast,
                  votes_remaining: payment.votes_remaining,
                  status: payment.status,
                  event_id: payment.event
                }
              }));
          }
        }, _callee1, this);
      }));
      function getVoteCodeStatus(_x19, _x20) {
        return _getVoteCodeStatus.apply(this, arguments);
      }
      return getVoteCodeStatus;
    }() // ==================== REFUND MANAGEMENT ====================
    /**
     * Refund payment
     * POST /api/payments/:id/refund
     */
    )
  }, {
    key: "refund",
    value: function () {
      var _refund = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var id, validated, adminId, payment;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _paymentValidation["default"].refundPaymentSchema);
              adminId = this.getUserId(req);
              _context10.n = 1;
              return this.service("paymentService").refundPayment(id, validated.refund_reason, adminId);
            case 1:
              payment = _context10.v;
              return _context10.a(2, this.success(res, {
                data: payment,
                message: "Payment refunded successfully"
              }));
          }
        }, _callee10, this);
      }));
      function refund(_x21, _x22) {
        return _refund.apply(this, arguments);
      }
      return refund;
    }() // ==================== STATISTICS ====================
    /**
     * Get payment statistics for an event
     * GET /api/payments/stats/:eventId
     */
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var eventId, stats;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              eventId = req.params.eventId;
              _context11.n = 1;
              return this.service("paymentService").getPaymentStats(eventId);
            case 1:
              stats = _context11.v;
              return _context11.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee11, this);
      }));
      function getStats(_x23, _x24) {
        return _getStats.apply(this, arguments);
      }
      return getStats;
    }()
    /**
     * Get revenue by bundle for an event
     * GET /api/payments/revenue/:eventId
     */
  }, {
    key: "getRevenueByBundle",
    value: (function () {
      var _getRevenueByBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var eventId, revenue;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              eventId = req.params.eventId;
              _context12.n = 1;
              return this.service("paymentService").getRevenueByBundle(eventId);
            case 1:
              revenue = _context12.v;
              return _context12.a(2, this.success(res, {
                data: revenue
              }));
          }
        }, _callee12, this);
      }));
      function getRevenueByBundle(_x25, _x26) {
        return _getRevenueByBundle.apply(this, arguments);
      }
      return getRevenueByBundle;
    }()
    /**
     * Get daily revenue for an event
     * GET /api/payments/daily-revenue/:eventId
     */
    )
  }, {
    key: "getDailyRevenue",
    value: (function () {
      var _getDailyRevenue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var eventId, _req$query, start_date, end_date, revenue;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              eventId = req.params.eventId;
              _req$query = req.query, start_date = _req$query.start_date, end_date = _req$query.end_date;
              _context13.n = 1;
              return this.service("paymentService").getDailyRevenue(eventId, start_date ? new Date(start_date) : undefined, end_date ? new Date(end_date) : undefined);
            case 1:
              revenue = _context13.v;
              return _context13.a(2, this.success(res, {
                data: revenue
              }));
          }
        }, _callee13, this);
      }));
      function getDailyRevenue(_x27, _x28) {
        return _getDailyRevenue.apply(this, arguments);
      }
      return getDailyRevenue;
    }() // ==================== VOTER HISTORY ====================
    /**
     * Get voter's payment history
     * GET /api/payments/voter/:email
     */
    )
  }, {
    key: "getVoterHistory",
    value: function () {
      var _getVoterHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var email, _this$getPagination4, page, limit, result;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              email = req.params.email;
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit;
              _context14.n = 1;
              return this.service("paymentService").repository.findAll({
                voter_email: email.toLowerCase()
              }, page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["bundle", "event"]
              });
            case 1:
              result = _context14.v;
              return _context14.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee14, this);
      }));
      function getVoterHistory(_x29, _x30) {
        return _getVoterHistory.apply(this, arguments);
      }
      return getVoterHistory;
    }()
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new PaymentController();