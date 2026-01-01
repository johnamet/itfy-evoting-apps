"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PaymentService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _paymentRepository = _interopRequireDefault(require("./payment.repository.js"));
var _bundleRepository = _interopRequireDefault(require("../vote/bundle/bundle.repository.js"));
var _eventRepository = _interopRequireDefault(require("../event/event.repository.js"));
var _couponRepository = _interopRequireDefault(require("../vote/coupon/coupon.repository.js"));
var _bundleService = _interopRequireDefault(require("../vote/bundle/bundle.service.js"));
var _couponService = _interopRequireDefault(require("../vote/coupon/coupon.service.js"));
var _activityService = _interopRequireDefault(require("../activity/activity.service.js"));
var _notificationService = _interopRequireDefault(require("../../services/notification.service.js"));
var _emailService = _interopRequireDefault(require("../../services/email.service.js"));
var _agendaService = _interopRequireDefault(require("../../services/agenda.service.js"));
var PaymentValidation = _interopRequireWildcard(require("./payment.validation.js"));
var _paymentConstants = require("../../utils/constants/payment.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
var _crypto = _interopRequireDefault(require("crypto"));
var _axios = _interopRequireDefault(require("axios"));
var _dotenv = require("dotenv");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t21 in e) "default" !== _t21 && {}.hasOwnProperty.call(e, _t21) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t21)) && (i.get || i.set) ? o(f, _t21, i) : f[_t21] = e[_t21]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
 * Payment Service
 * Handles business logic for payment processing with Paystack
 */
// Set up validation module for this service
_baseService["default"].setValidation(PaymentValidation);
(0, _dotenv.configDotenv)();
var PaymentService = exports.PaymentService = /*#__PURE__*/function (_BaseService) {
  function PaymentService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, PaymentService);
    _this = _callSuper(this, PaymentService);
    _this.repository = dependencies.repository || _paymentRepository["default"];
    _this.bundleRepository = dependencies.bundleRepository || _bundleRepository["default"];
    _this.eventRepository = dependencies.eventRepository || _eventRepository["default"];
    _this.couponRepository = dependencies.couponRepository || _couponRepository["default"];
    _this.bundleService = dependencies.bundleService || _bundleService["default"];
    _this.couponService = dependencies.couponService || _couponService["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    _this.notificationService = dependencies.notificationService || _notificationService["default"];
    _this.emailService = dependencies.emailService || _emailService["default"];
    _this.paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    _this.paystackBaseUrl = "https://api.paystack.co";
    return _this;
  }

  /**
   * Generate unique vote code
   * @returns {Promise<string>} - Unique vote code
   */
  _inherits(PaymentService, _BaseService);
  return _createClass(PaymentService, [{
    key: "generateVoteCode",
    value: (function () {
      var _generateVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var voteCode, exists, randomPart, existing, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              exists = true;
            case 1:
              if (!exists) {
                _context.n = 3;
                break;
              }
              // Generate random 8-character code: VOTE-XXXXXXXX
              randomPart = _crypto["default"].randomBytes(4).toString("hex").toUpperCase();
              voteCode = "VOTE-".concat(randomPart);

              // Check if code already exists
              _context.n = 2;
              return this.repository.findByVoteCode(voteCode);
            case 2:
              existing = _context.v;
              exists = !!existing;
              _context.n = 1;
              break;
            case 3:
              return _context.a(2, voteCode);
            case 4:
              _context.p = 4;
              _t = _context.v;
              throw new Error("Failed to generate vote code: ".concat(_t.message));
            case 5:
              return _context.a(2);
          }
        }, _callee, this, [[0, 4]]);
      }));
      function generateVoteCode() {
        return _generateVoteCode.apply(this, arguments);
      }
      return generateVoteCode;
    }()
    /**
     * Generate unique transaction reference
     * @returns {string} - Unique transaction reference
     */
    )
  }, {
    key: "generateTransactionReference",
    value: function generateTransactionReference() {
      var timestamp = Date.now();
      var random = _crypto["default"].randomBytes(4).toString("hex").toUpperCase();
      return "TXN-".concat(timestamp, "-").concat(random);
    }

    /**
     * Payment Service - Initialize Payment Method (Updated for Multiple Bundles)
     * This is part 1 - the initializePayment method
     */

    /**
     * Initialize payment with Paystack - Updated for multiple bundles
     * @param {Object} paymentData - Payment data
     * @param {Array} paymentData.bundles - Array of {bundle_id, quantity}
     * @returns {Promise<Object>} - Payment initialization response
     */
  }, {
    key: "initializePayment",
    value: (function () {
      var _initializePayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(paymentData) {
        var validatedData, bundleItems, eventId, voterEmail, voterPhone, voterName, _validatedData$coupon, couponCode, callbackUrl, candidateId, _validatedData$metada, metadata, event, bundleValidations, bundlesData, totalVotes, subtotal, currency, _iterator, _step, item, bundleValidation, bundle, bundleEventId, quantity, bundlePrice, votesAllocated, coupon, discountAmount, primaryBundle, couponValidation, finalAmount, categoryVotesMap, votesByCategory, transactionReference, voteCode, payment, paystackPayload, paystackResponse, message, _t2, _t3;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              // Validate input data using BaseService validation
              validatedData = this.validate(paymentData, PaymentValidation.initializePaymentSchema);
              bundleItems = validatedData.bundles, eventId = validatedData.event_id, voterEmail = validatedData.voter_email, voterPhone = validatedData.voter_phone, voterName = validatedData.voter_name, _validatedData$coupon = validatedData.coupon_code, couponCode = _validatedData$coupon === void 0 ? null : _validatedData$coupon, callbackUrl = validatedData.callback_url, candidateId = validatedData.candidate_id, _validatedData$metada = validatedData.metadata, metadata = _validatedData$metada === void 0 ? {} : _validatedData$metada; // Validate event
              _context2.n = 1;
              return this.eventRepository.findById(eventId);
            case 1:
              event = _context2.v;
              if (event) {
                _context2.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              // Fetch and validate all bundles
              bundleValidations = [];
              bundlesData = [];
              totalVotes = 0;
              subtotal = 0;
              currency = null;
              _iterator = _createForOfIteratorHelper(bundleItems);
              _context2.p = 3;
              _iterator.s();
            case 4:
              if ((_step = _iterator.n()).done) {
                _context2.n = 11;
                break;
              }
              item = _step.value;
              _context2.n = 5;
              return this.bundleService.validateBundleAvailability(item.bundle_id);
            case 5:
              bundleValidation = _context2.v;
              if (bundleValidation.isAvailable) {
                _context2.n = 6;
                break;
              }
              throw new Error("Bundle ".concat(item.bundle_id, ": ").concat(bundleValidation.reason));
            case 6:
              bundle = bundleValidation.bundle; // Ensure all bundles are from the same event
              bundleEventId = _typeof(bundle.event) === 'object' ? bundle.event._id : bundle.event;
              if (!(bundleEventId.toString() !== eventId.toString())) {
                _context2.n = 7;
                break;
              }
              throw new Error("Bundle ".concat(bundle.name, " does not belong to this event"));
            case 7:
              if (!(currency === null)) {
                _context2.n = 8;
                break;
              }
              currency = bundle.currency;
              _context2.n = 9;
              break;
            case 8:
              if (!(currency !== bundle.currency)) {
                _context2.n = 9;
                break;
              }
              throw new Error("All bundles must have the same currency");
            case 9:
              quantity = item.quantity || 1;
              bundlePrice = bundle.price * quantity;
              votesAllocated = bundle.vote_count * quantity;
              bundlesData.push({
                bundle: bundle._id,
                bundleDetails: bundle,
                quantity: quantity,
                votes_allocated: votesAllocated,
                votes_used: 0,
                price_per_unit: bundle.price,
                total_price: bundlePrice,
                applicable_categories: bundle.categories || []
              });
              totalVotes += votesAllocated;
              subtotal += bundlePrice;
              bundleValidations.push(bundleValidation);
            case 10:
              _context2.n = 4;
              break;
            case 11:
              _context2.n = 13;
              break;
            case 12:
              _context2.p = 12;
              _t2 = _context2.v;
              _iterator.e(_t2);
            case 13:
              _context2.p = 13;
              _iterator.f();
              return _context2.f(13);
            case 14:
              // Validate and apply coupon if provided
              coupon = null;
              discountAmount = 0;
              if (!couponCode) {
                _context2.n = 17;
                break;
              }
              // Use the first bundle for coupon validation
              primaryBundle = bundlesData[0].bundleDetails;
              _context2.n = 15;
              return this.couponService.validateCouponForBundle(couponCode, primaryBundle._id, voterEmail);
            case 15:
              couponValidation = _context2.v;
              if (couponValidation.isValid) {
                _context2.n = 16;
                break;
              }
              throw new Error(couponValidation.reason);
            case 16:
              coupon = couponValidation.coupon;

              // Calculate discount based on coupon type
              if (coupon.discount_type === "PERCENTAGE") {
                discountAmount = subtotal * coupon.discount_value / 100;
                if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
                  discountAmount = coupon.max_discount_amount;
                }
              } else if (coupon.discount_type === "FIXED") {
                discountAmount = Math.min(coupon.discount_value, subtotal);
              } else if (coupon.discount_type === "BONUS_VOTES") {
                // Bonus votes will be added to the first bundle
                bundlesData[0].votes_allocated += coupon.discount_value;
                totalVotes += coupon.discount_value;
              }
            case 17:
              finalAmount = Math.max(subtotal - discountAmount, 0); // Build votes_by_category structure
              categoryVotesMap = new Map();
              bundlesData.forEach(function (bundleData) {
                var categories = bundleData.applicable_categories;

                // If bundle has no specific categories, it applies to all event categories
                if (!categories || categories.length === 0) {
                  // This bundle can be used for any category - we'll handle this dynamically
                  // For now, we'll create a general pool
                  var generalKey = 'unrestricted';
                  if (!categoryVotesMap.has(generalKey)) {
                    categoryVotesMap.set(generalKey, {
                      category: null,
                      // Unrestricted
                      votes_available: 0,
                      votes_used: 0,
                      bundle_sources: []
                    });
                  }
                  var entry = categoryVotesMap.get(generalKey);
                  entry.votes_available += bundleData.votes_allocated;
                  entry.bundle_sources.push({
                    bundle: bundleData.bundle,
                    votes_allocated: bundleData.votes_allocated,
                    votes_used: 0
                  });
                } else {
                  // Bundle is restricted to specific categories
                  categories.forEach(function (categoryId) {
                    var catId = categoryId.toString();
                    if (!categoryVotesMap.has(catId)) {
                      categoryVotesMap.set(catId, {
                        category: categoryId,
                        votes_available: 0,
                        votes_used: 0,
                        bundle_sources: []
                      });
                    }
                    var entry = categoryVotesMap.get(catId);
                    entry.votes_available += bundleData.votes_allocated;
                    entry.bundle_sources.push({
                      bundle: bundleData.bundle,
                      votes_allocated: bundleData.votes_allocated,
                      votes_used: 0
                    });
                  });
                }
              });
              votesByCategory = Array.from(categoryVotesMap.values()).filter(function (item) {
                return item.category !== null;
              }); // Generate transaction reference and vote code
              transactionReference = this.generateTransactionReference();
              _context2.n = 18;
              return this.generateVoteCode();
            case 18:
              voteCode = _context2.v;
              _context2.n = 19;
              return this.repository.create({
                transaction_reference: transactionReference,
                bundles: bundlesData.map(function (bd) {
                  return {
                    bundle: bd.bundle,
                    quantity: bd.quantity,
                    votes_allocated: bd.votes_allocated,
                    votes_used: bd.votes_used,
                    price_per_unit: bd.price_per_unit,
                    total_price: bd.total_price,
                    applicable_categories: bd.applicable_categories
                  };
                }),
                event: eventId,
                coupon: coupon ? coupon._id : null,
                vote_code: voteCode,
                votes_purchased: totalVotes,
                votes_cast: 0,
                votes_remaining: totalVotes,
                votes_by_category: votesByCategory,
                amount_paid: finalAmount,
                original_amount: subtotal,
                discount_amount: discountAmount,
                currency: currency || 'GHS',
                voter_email: voterEmail,
                voter_phone: voterPhone,
                voter_name: voterName,
                payment_status: _paymentConstants.STATUS.PENDING,
                metadata: _objectSpread(_objectSpread({}, metadata), {}, {
                  bundleCount: bundlesData.length,
                  eventName: event.name
                })
              });
            case 19:
              payment = _context2.v;
              // Initialize Paystack transaction
              paystackPayload = {
                email: voterEmail,
                amount: Math.round(finalAmount * 100),
                // Convert to kobo/pesewas
                callback_url: callbackUrl,
                metadata: {
                  payment_id: payment._id.toString(),
                  event_id: eventId,
                  vote_code: voteCode,
                  voter_name: voterName,
                  voter_phone: voterPhone,
                  bundle_count: bundlesData.length,
                  candidate_id: candidateId,
                  custom_fields: [{
                    display_name: "Event",
                    variable_name: "event_name",
                    value: event.name
                  }, {
                    display_name: "Vote Code",
                    variable_name: "vote_code",
                    value: voteCode
                  }, {
                    display_name: "Total Votes",
                    variable_name: "total_votes",
                    value: totalVotes.toString()
                  }]
                }
              }; // Log payload for debugging
              console.log("Paystack Payload:", JSON.stringify(paystackPayload, null, 2));
              console.log(this.paystackSecretKey);
              _context2.n = 20;
              return _axios["default"].post("".concat(this.paystackBaseUrl, "/transaction/initialize"), paystackPayload, {
                headers: {
                  Authorization: "Bearer ".concat(this.paystackSecretKey),
                  "Content-Type": "application/json"
                }
              });
            case 20:
              paystackResponse = _context2.v;
              if (paystackResponse.data.status) {
                _context2.n = 21;
                break;
              }
              throw new Error(paystackResponse.data.message || "Paystack initialization failed");
            case 21:
              _context2.n = 22;
              return this.repository.updatePaymentById(payment._id, {
                paystack_reference: paystackResponse.data.data.reference,
                paystack_access_code: paystackResponse.data.data.access_code
              });
            case 22:
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.PAYMENT_INITIATED,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: payment._id,
                eventId: eventId,
                description: "Initialized payment for ".concat(bundlesData.length, " bundle(s)"),
                metadata: {
                  voterEmail: voterEmail,
                  amount: finalAmount,
                  voteCode: voteCode,
                  bundleCount: bundlesData.length,
                  totalVotes: totalVotes
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context2.a(2, {
                payment_id: payment._id,
                transaction_reference: transactionReference,
                vote_code: voteCode,
                authorization_url: paystackResponse.data.data.authorization_url,
                access_code: paystackResponse.data.data.access_code,
                amount: finalAmount,
                total_votes: totalVotes,
                bundle_count: bundlesData.length
              });
            case 23:
              _context2.p = 23;
              _t3 = _context2.v;
              if (!(_t3.response && _t3.response.data)) {
                _context2.n = 24;
                break;
              }
              console.error("Paystack Error Detail:", JSON.stringify(_t3.response.data, null, 2));
              message = _t3.response.data.message || _t3.message;
              throw new Error("Failed to initialize payment: ".concat(message));
            case 24:
              throw new Error("Failed to initialize payment: ".concat(_t3.message));
            case 25:
              return _context2.a(2);
          }
        }, _callee2, this, [[3, 12, 13, 14], [0, 23]]);
      }));
      function initializePayment(_x) {
        return _initializePayment.apply(this, arguments);
      }
      return initializePayment;
    }()
    /**
     * Initialize payment with Paystack
     * @param {Object} paymentData - Payment data
     * @returns {Promise<Object>} - Payment initialization response
     */
    )
  }, {
    key: "initializePayment_deprecated",
    value: (function () {
      var _initializePayment_deprecated = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(paymentData) {
        var validatedData, bundleId, eventId, voterEmail, voterPhone, voterName, _validatedData$coupon2, couponCode, callbackUrl, _validatedData$metada2, metadata, bundleValidation, bundle, event, coupon, priceBreakdown, transactionReference, voteCode, payment, paystackPayload, paystackResponse, _t4;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              // Validate input data using BaseService validation
              validatedData = this.validate(paymentData, PaymentValidation.initializePaymentSchema);
              bundleId = validatedData.bundle_id, eventId = validatedData.event_id, voterEmail = validatedData.voter_email, voterPhone = validatedData.voter_phone, voterName = validatedData.voter_name, _validatedData$coupon2 = validatedData.coupon_code, couponCode = _validatedData$coupon2 === void 0 ? null : _validatedData$coupon2, callbackUrl = validatedData.callback_url, _validatedData$metada2 = validatedData.metadata, metadata = _validatedData$metada2 === void 0 ? {} : _validatedData$metada2; // Validate bundle availability
              _context3.n = 1;
              return this.bundleService.validateBundleAvailability(bundleId);
            case 1:
              bundleValidation = _context3.v;
              if (bundleValidation.isAvailable) {
                _context3.n = 2;
                break;
              }
              throw new Error(bundleValidation.reason);
            case 2:
              bundle = bundleValidation.bundle; // Validate event
              _context3.n = 3;
              return this.eventRepository.findById(eventId);
            case 3:
              event = _context3.v;
              if (event) {
                _context3.n = 4;
                break;
              }
              throw new Error("Event not found");
            case 4:
              // Validate and apply coupon if provided
              coupon = null;
              if (!couponCode) {
                _context3.n = 7;
                break;
              }
              _context3.n = 5;
              return this.couponService.validateCouponForBundle(couponCode, bundleId, voterEmail);
            case 5:
              coupon = _context3.v;
              if (coupon.isValid) {
                _context3.n = 6;
                break;
              }
              throw new Error(coupon.reason);
            case 6:
              coupon = coupon.coupon;
            case 7:
              _context3.n = 8;
              return this.bundleService.calculatePrice(bundleId, coupon);
            case 8:
              priceBreakdown = _context3.v;
              // Generate transaction reference and vote code
              transactionReference = this.generateTransactionReference();
              _context3.n = 9;
              return this.generateVoteCode();
            case 9:
              voteCode = _context3.v;
              _context3.n = 10;
              return this.repository.create({
                transaction_reference: transactionReference,
                bundle: bundleId,
                event: eventId,
                coupon: coupon ? coupon._id : null,
                vote_code: voteCode,
                votes_purchased: priceBreakdown.totalVotes,
                votes_cast: 0,
                votes_remaining: priceBreakdown.totalVotes,
                amount_paid: priceBreakdown.finalPrice,
                original_amount: priceBreakdown.basePrice,
                discount_amount: priceBreakdown.totalDiscount || 0,
                currency: bundle.currency,
                voter_email: voterEmail,
                voter_phone: voterPhone,
                voter_name: voterName,
                status: _paymentConstants.STATUS.PENDING,
                payment_method: "PAYSTACK",
                metadata: _objectSpread(_objectSpread({}, metadata), {}, {
                  bundleName: bundle.name,
                  eventName: event.name,
                  priceBreakdown: priceBreakdown
                })
              });
            case 10:
              payment = _context3.v;
              // Initialize Paystack transaction
              paystackPayload = {
                email: voterEmail,
                amount: Math.round(priceBreakdown.finalPrice * 100),
                // Convert to kobo/pesewas
                reference: transactionReference,
                currency: bundle.currency,
                callback_url: callbackUrl,
                metadata: {
                  payment_id: payment._id.toString(),
                  event_id: eventId,
                  bundle_id: bundleId,
                  vote_code: voteCode,
                  voter_name: voterName,
                  voter_phone: voterPhone,
                  custom_fields: [{
                    display_name: "Event",
                    variable_name: "event_name",
                    value: event.name
                  }, {
                    display_name: "Bundle",
                    variable_name: "bundle_name",
                    value: bundle.name
                  }, {
                    display_name: "Vote Code",
                    variable_name: "vote_code",
                    value: voteCode
                  }]
                }
              };
              _context3.n = 11;
              return _axios["default"].post("".concat(this.paystackBaseUrl, "/transaction/initialize"), paystackPayload, {
                headers: {
                  Authorization: "Bearer ".concat(this.paystackSecretKey),
                  "Content-Type": "application/json"
                }
              });
            case 11:
              paystackResponse = _context3.v;
              if (paystackResponse.data.status) {
                _context3.n = 12;
                break;
              }
              throw new Error(paystackResponse.data.message || "Paystack initialization failed");
            case 12:
              _context3.n = 13;
              return this.repository.updateById(payment._id, {
                paystack_reference: paystackResponse.data.data.reference,
                paystack_access_code: paystackResponse.data.data.access_code
              });
            case 13:
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: payment._id,
                eventId: eventId,
                description: "Initialized payment for ".concat(bundle.name),
                metadata: {
                  voterEmail: voterEmail,
                  amount: priceBreakdown.finalPrice,
                  currency: bundle.currency,
                  voteCode: voteCode,
                  bundleName: bundle.name
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context3.a(2, {
                paymentId: payment._id,
                transactionReference: transactionReference,
                voteCode: voteCode,
                authorizationUrl: paystackResponse.data.data.authorization_url,
                accessCode: paystackResponse.data.data.access_code,
                amount: priceBreakdown.finalPrice,
                currency: bundle.currency,
                priceBreakdown: priceBreakdown
              });
            case 14:
              _context3.p = 14;
              _t4 = _context3.v;
              throw new Error("Failed to initialize payment: ".concat(_t4.message));
            case 15:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 14]]);
      }));
      function initializePayment_deprecated(_x2) {
        return _initializePayment_deprecated.apply(this, arguments);
      }
      return initializePayment_deprecated;
    }()
    /**
     * Verify payment with Paystack
     * @param {string} reference - Transaction reference
     * @returns {Promise<Object>} - Verification result
     */
    )
  }, {
    key: "verifyPayment",
    value: (function () {
      var _verifyPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(reference) {
        var _payment$bundles, _updatedPayment$bundl, payment, paystackResponse, paystackData, amountPaid, _iterator2, _step2, item, updatedPayment, bundleNames, _t5, _t6;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              console.log("Starting verification for reference: ".concat(reference));

              // Find payment by reference
              payment = null;
              _context4.n = 1;
              return this.repository.findByTransactionReference(reference);
            case 1:
              payment = _context4.v;
              if (payment) {
                _context4.n = 3;
                break;
              }
              console.log("Not found by txn ref, trying paystack ref");
              _context4.n = 2;
              return this.repository.findByPaystackReference(reference);
            case 2:
              payment = _context4.v;
            case 3:
              if (payment) {
                _context4.n = 4;
                break;
              }
              throw new Error("Payment not found");
            case 4:
              console.log("Payment found: ".concat(payment._id, ", Status: ").concat(payment.payment_status, ", Bundles count: ").concat((_payment$bundles = payment.bundles) === null || _payment$bundles === void 0 ? void 0 : _payment$bundles.length));

              // Skip if already completed
              if (!(payment.payment_status === _paymentConstants.STATUS.COMPLETED)) {
                _context4.n = 5;
                break;
              }
              return _context4.a(2, {
                success: true,
                payment: payment,
                message: "Payment already verified"
              });
            case 5:
              // Verify with Paystack
              console.log("Verifying with Paystack...");
              _context4.n = 6;
              return _axios["default"].get("".concat(this.paystackBaseUrl, "/transaction/verify/").concat(reference), {
                headers: {
                  Authorization: "Bearer ".concat(this.paystackSecretKey)
                }
              });
            case 6:
              paystackResponse = _context4.v;
              if (paystackResponse.data.status) {
                _context4.n = 7;
                break;
              }
              throw new Error(paystackResponse.data.message || "Paystack verification failed");
            case 7:
              paystackData = paystackResponse.data.data;
              console.log("Paystack status: ".concat(paystackData.status));

              // Check if payment was successful
              if (!(paystackData.status !== "success")) {
                _context4.n = 9;
                break;
              }
              _context4.n = 8;
              return this.repository.updateById(payment._id, {
                payment_status: _paymentConstants.STATUS.FAILED,
                failure_reason: paystackData.gateway_response || "Payment not successful",
                paid_at: new Date(paystackData.paid_at || Date.now())
              });
            case 8:
              throw new Error("Payment failed: ".concat(paystackData.gateway_response));
            case 9:
              // Verify amount matches
              amountPaid = paystackData.amount / 100; // Convert from kobo/pesewas
              console.log("Amount paid: ".concat(amountPaid, ", Expected: ").concat(payment.amount_paid));
              if (!(Math.abs(amountPaid - payment.amount_paid) > 0.01)) {
                _context4.n = 11;
                break;
              }
              _context4.n = 10;
              return this.repository.updateById(payment._id, {
                payment_status: _paymentConstants.STATUS.FAILED,
                failure_reason: "Amount mismatch"
              });
            case 10:
              throw new Error("Payment amount mismatch");
            case 11:
              _context4.n = 12;
              return this.repository.updatePaymentById(payment._id, {
                paystack_reference: paystackData.reference,
                paystack_access_code: paystackData.access_code,
                authorization: paystackData.authorization,
                customer: paystackData.customer,
                paystack_metadata: paystackData.metadata,
                payment_status: _paymentConstants.STATUS.COMPLETED,
                paid_at: new Date(paystackData.paid_at || Date.now())
              });
            case 12:
              if (!payment.coupon) {
                _context4.n = 13;
                break;
              }
              console.log("Redeeming coupon...");
              _context4.n = 13;
              return _couponService["default"].redeemCoupon(payment.coupon.toString(), payment.voter_email);
            case 13:
              // Record bundle purchase(s)
              console.log("Recording bundle purchases...");
              if (!(payment.bundles && payment.bundles.length > 0)) {
                _context4.n = 22;
                break;
              }
              _iterator2 = _createForOfIteratorHelper(payment.bundles);
              _context4.p = 14;
              _iterator2.s();
            case 15:
              if ((_step2 = _iterator2.n()).done) {
                _context4.n = 18;
                break;
              }
              item = _step2.value;
              if (item.bundle) {
                _context4.n = 16;
                break;
              }
              console.warn("Found bundle item without bundle ID, skipping:", item);
              return _context4.a(3, 17);
            case 16:
              console.log("Recording purchase for bundle ".concat(item.bundle, " amount ").concat(item.total_price));
              _context4.n = 17;
              return _bundleService["default"].recordPurchase(item.bundle.toString(), item.total_price);
            case 17:
              _context4.n = 15;
              break;
            case 18:
              _context4.n = 20;
              break;
            case 19:
              _context4.p = 19;
              _t5 = _context4.v;
              _iterator2.e(_t5);
            case 20:
              _context4.p = 20;
              _iterator2.f();
              return _context4.f(20);
            case 21:
              _context4.n = 23;
              break;
            case 22:
              if (!payment.bundle) {
                _context4.n = 23;
                break;
              }
              // Legacy fallback
              console.log("Legacy bundle record: ".concat(payment.bundle));
              _context4.n = 23;
              return _bundleService["default"].recordPurchase(payment.bundle.toString(), payment.amount_paid);
            case 23:
              _context4.n = 24;
              return this.repository.findById(payment._id, {
                populate: ["bundles.bundle", "event", "coupon"]
              });
            case 24:
              updatedPayment = _context4.v;
              bundleNames = updatedPayment.bundles ? updatedPayment.bundles.map(function (b) {
                var _b$bundle;
                return ((_b$bundle = b.bundle) === null || _b$bundle === void 0 ? void 0 : _b$bundle.name) || "Unknown";
              }).join(", ") : ((_updatedPayment$bundl = updatedPayment.bundle) === null || _updatedPayment$bundl === void 0 ? void 0 : _updatedPayment$bundl.name) || "Unknown Bundle";
              console.log("Queueing email...");

              // Queue confirmation email via Agenda (non-blocking)
              _context4.n = 25;
              return _agendaService["default"].now("send-payment-success-email", {
                voterEmail: payment.voter_email,
                voterName: payment.voter_name || payment.voter_email,
                eventName: updatedPayment.event.name,
                bundleName: bundleNames,
                voteCode: payment.vote_code,
                votesCount: payment.votes_purchased,
                amountPaid: payment.amount_paid,
                currency: payment.currency,
                transactionReference: payment.transaction_reference,
                paidAt: updatedPayment.paid_at
              });
            case 25:
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.UPDATE,
                // Check regular constant name
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: payment._id,
                eventId: payment.event,
                description: "Payment verified: ".concat(payment.transaction_reference),
                metadata: {
                  voterEmail: payment.voter_email,
                  amount: payment.amount_paid,
                  currency: payment.currency,
                  voteCode: payment.vote_code
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context4.a(2, {
                success: true,
                payment: updatedPayment,
                message: "Payment verified successfully"
              });
            case 26:
              _context4.p = 26;
              _t6 = _context4.v;
              console.error("Critical Verification Error:", _t6);
              console.error("Stack:", _t6.stack);
              throw new Error("Failed to verify payment: ".concat(_t6.message));
            case 27:
              return _context4.a(2);
          }
        }, _callee4, this, [[14, 19, 20, 21], [0, 26]]);
      }));
      function verifyPayment(_x3) {
        return _verifyPayment.apply(this, arguments);
      }
      return verifyPayment;
    }())
  }, {
    key: "handleWebhook",
    value: function () {
      var _handleWebhook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(payload, signature) {
        var hash, event, data, _t7, _t8;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              // Verify webhook signature
              hash = _crypto["default"].createHmac("sha512", this.paystackSecretKey).update(JSON.stringify(payload)).digest("hex");
              if (!(hash !== signature)) {
                _context5.n = 1;
                break;
              }
              throw new Error("Invalid webhook signature");
            case 1:
              event = payload.event, data = payload.data; // Handle different webhook events
              _t7 = event;
              _context5.n = _t7 === "charge.success" ? 2 : _t7 === "charge.failed" ? 4 : _t7 === "transfer.success" ? 6 : _t7 === "transfer.failed" ? 8 : 10;
              break;
            case 2:
              _context5.n = 3;
              return this.handleChargeSuccess(data);
            case 3:
              return _context5.a(2, _context5.v);
            case 4:
              _context5.n = 5;
              return this.handleChargeFailed(data);
            case 5:
              return _context5.a(2, _context5.v);
            case 6:
              _context5.n = 7;
              return this.handleTransferSuccess(data);
            case 7:
              return _context5.a(2, _context5.v);
            case 8:
              _context5.n = 9;
              return this.handleTransferFailed(data);
            case 9:
              return _context5.a(2, _context5.v);
            case 10:
              return _context5.a(2, {
                success: true,
                message: "Unhandled event: ".concat(event)
              });
            case 11:
              _context5.n = 13;
              break;
            case 12:
              _context5.p = 12;
              _t8 = _context5.v;
              throw new Error("Failed to handle webhook: ".concat(_t8.message));
            case 13:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 12]]);
      }));
      function handleWebhook(_x4, _x5) {
        return _handleWebhook.apply(this, arguments);
      }
      return handleWebhook;
    }()
    /**
     * Handle successful charge
     * @param {Object} data - Charge data
     * @returns {Promise<Object>} - Processing result
     */
  }, {
    key: "handleChargeSuccess",
    value: (function () {
      var _handleChargeSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(data) {
        var reference, payment, _t9;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              reference = data.reference;
              _context6.n = 1;
              return this.repository.findByTransactionReference(reference);
            case 1:
              payment = _context6.v;
              if (payment) {
                _context6.n = 3;
                break;
              }
              _context6.n = 2;
              return this.repository.findByPaystackReference(reference);
            case 2:
              payment = _context6.v;
            case 3:
              if (payment) {
                _context6.n = 4;
                break;
              }
              return _context6.a(2, {
                success: false,
                message: "Payment not found"
              });
            case 4:
              if (!(payment.status === _paymentConstants.STATUS.COMPLETED)) {
                _context6.n = 5;
                break;
              }
              return _context6.a(2, {
                success: true,
                message: "Payment already processed"
              });
            case 5:
              _context6.n = 6;
              return this.verifyPayment(reference);
            case 6:
              return _context6.a(2, {
                success: true,
                message: "Charge processed successfully"
              });
            case 7:
              _context6.p = 7;
              _t9 = _context6.v;
              throw new Error("Failed to handle charge success: ".concat(_t9.message));
            case 8:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 7]]);
      }));
      function handleChargeSuccess(_x6) {
        return _handleChargeSuccess.apply(this, arguments);
      }
      return handleChargeSuccess;
    }()
    /**
     * Handle failed charge
     * @param {Object} data - Charge data
     * @returns {Promise<Object>} - Processing result
     */
    )
  }, {
    key: "handleChargeFailed",
    value: (function () {
      var _handleChargeFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(data) {
        var reference, payment, _t0;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              reference = data.reference;
              _context7.n = 1;
              return this.repository.findByTransactionReference(reference);
            case 1:
              payment = _context7.v;
              if (payment) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2, {
                success: false,
                message: "Payment not found"
              });
            case 2:
              _context7.n = 3;
              return this.repository.updateById(payment._id, {
                status: _paymentConstants.STATUS.FAILED,
                failure_reason: data.gateway_response || "Charge failed"
              });
            case 3:
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: payment._id,
                eventId: payment.event,
                description: "Payment failed: ".concat(payment.transaction_reference),
                metadata: {
                  voterEmail: payment.voter_email,
                  reason: data.gateway_response
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context7.a(2, {
                success: true,
                message: "Failed charge processed"
              });
            case 4:
              _context7.p = 4;
              _t0 = _context7.v;
              throw new Error("Failed to handle charge failure: ".concat(_t0.message));
            case 5:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 4]]);
      }));
      function handleChargeFailed(_x7) {
        return _handleChargeFailed.apply(this, arguments);
      }
      return handleChargeFailed;
    }()
    /**
     * Handle successful transfer (refund)
     * @param {Object} data - Transfer data
     * @returns {Promise<Object>} - Processing result
     */
    )
  }, {
    key: "handleTransferSuccess",
    value: (function () {
      var _handleTransferSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(data) {
        var _data$metadata, paymentId, payment, _t1;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              // Find payment by transfer reference in metadata
              paymentId = data.reason || ((_data$metadata = data.metadata) === null || _data$metadata === void 0 ? void 0 : _data$metadata.payment_id);
              if (paymentId) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, {
                success: false,
                message: "Payment ID not found in transfer"
              });
            case 1:
              _context8.n = 2;
              return this.repository.findById(paymentId);
            case 2:
              payment = _context8.v;
              if (payment) {
                _context8.n = 3;
                break;
              }
              return _context8.a(2, {
                success: false,
                message: "Payment not found"
              });
            case 3:
              _context8.n = 4;
              return this.repository.updateById(payment._id, {
                status: _paymentConstants.STATUS.REFUNDED,
                refund_reference: data.transfer_code,
                refunded_at: new Date(data.transferred_at || Date.now())
              });
            case 4:
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: payment._id,
                eventId: payment.event,
                description: "Refund successful: ".concat(payment.transaction_reference),
                metadata: {
                  voterEmail: payment.voter_email,
                  amount: payment.amount_paid,
                  transferCode: data.transfer_code
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context8.a(2, {
                success: true,
                message: "Refund processed successfully"
              });
            case 5:
              _context8.p = 5;
              _t1 = _context8.v;
              throw new Error("Failed to handle transfer success: ".concat(_t1.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 5]]);
      }));
      function handleTransferSuccess(_x8) {
        return _handleTransferSuccess.apply(this, arguments);
      }
      return handleTransferSuccess;
    }()
    /**
     * Handle failed transfer (refund)
     * @param {Object} data - Transfer data
     * @returns {Promise<Object>} - Processing result
     */
    )
  }, {
    key: "handleTransferFailed",
    value: (function () {
      var _handleTransferFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(data) {
        var _data$metadata2, paymentId, _t10;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              paymentId = data.reason || ((_data$metadata2 = data.metadata) === null || _data$metadata2 === void 0 ? void 0 : _data$metadata2.payment_id);
              if (paymentId) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, {
                success: false,
                message: "Payment ID not found in transfer"
              });
            case 1:
              // Log refund failure (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.ERROR,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: paymentId,
                description: "Refund failed: ".concat(data.transfer_code),
                metadata: {
                  reason: data.reason,
                  transferCode: data.transfer_code
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context9.a(2, {
                success: true,
                message: "Refund failure logged"
              });
            case 2:
              _context9.p = 2;
              _t10 = _context9.v;
              throw new Error("Failed to handle transfer failure: ".concat(_t10.message));
            case 3:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function handleTransferFailed(_x9) {
        return _handleTransferFailed.apply(this, arguments);
      }
      return handleTransferFailed;
    }()
    /**
     * Process refund for a payment
     * @param {string} paymentId - Payment ID
     * @param {string} reason - Refund reason
     * @param {string} adminId - Admin processing refund
     * @returns {Promise<Object>} - Refund result
     */
    )
  }, {
    key: "processRefund",
    value: (function () {
      var _processRefund = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(paymentId, reason, adminId) {
        var _paystackResponse$dat, payment, refundPayload, paystackResponse, _t11;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.repository.findById(paymentId, {
                populate: ["event", "bundle"]
              });
            case 1:
              payment = _context0.v;
              if (payment) {
                _context0.n = 2;
                break;
              }
              throw new Error("Payment not found");
            case 2:
              if (!(payment.status !== _paymentConstants.STATUS.COMPLETED)) {
                _context0.n = 3;
                break;
              }
              throw new Error("Only completed payments can be refunded");
            case 3:
              if (!(payment.status === _paymentConstants.STATUS.REFUNDED)) {
                _context0.n = 4;
                break;
              }
              throw new Error("Payment already refunded");
            case 4:
              if (!(payment.votes_cast > 0)) {
                _context0.n = 5;
                break;
              }
              throw new Error("Cannot refund: ".concat(payment.votes_cast, " vote(s) already cast"));
            case 5:
              // Initiate Paystack refund
              refundPayload = {
                transaction: payment.transaction_reference,
                amount: Math.round(payment.amount_paid * 100),
                // Full refund in kobo/pesewas
                currency: payment.currency,
                customer_note: reason,
                merchant_note: "Refund requested by admin: ".concat(adminId)
              };
              _context0.n = 6;
              return _axios["default"].post("".concat(this.paystackBaseUrl, "/refund"), refundPayload, {
                headers: {
                  Authorization: "Bearer ".concat(this.paystackSecretKey),
                  "Content-Type": "application/json"
                }
              });
            case 6:
              paystackResponse = _context0.v;
              if (paystackResponse.data.status) {
                _context0.n = 7;
                break;
              }
              throw new Error(paystackResponse.data.message || "Paystack refund failed");
            case 7:
              _context0.n = 8;
              return this.repository.updateById(paymentId, {
                status: _paymentConstants.STATUS.REFUNDED,
                refund_reference: (_paystackResponse$dat = paystackResponse.data.data.transaction) === null || _paystackResponse$dat === void 0 ? void 0 : _paystackResponse$dat.reference,
                refund_reason: reason,
                refunded_at: new Date(),
                refunded_by: adminId
              });
            case 8:
              if (!payment.coupon) {
                _context0.n = 9;
                break;
              }
              _context0.n = 9;
              return _couponService["default"].reverseCouponRedemption(payment.coupon.toString(), payment.voter_email);
            case 9:
              _context0.n = 10;
              return _emailService["default"].sendEmail(payment.voter_email, "Refund Processed", "refund-processed",
              // Template name
              {
                voterName: payment.voter_name || payment.voter_email,
                eventName: payment.event.name,
                bundleName: payment.bundle.name,
                amount: payment.amount_paid,
                currency: payment.currency,
                reason: reason,
                transactionReference: payment.transaction_reference
              });
            case 10:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.PAYMENT,
                entityId: paymentId,
                eventId: payment.event._id,
                description: "Refund processed: ".concat(payment.transaction_reference),
                metadata: {
                  voterEmail: payment.voter_email,
                  amount: payment.amount_paid,
                  currency: payment.currency,
                  reason: reason
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context0.a(2, {
                success: true,
                message: "Refund processed successfully",
                payment: payment
              });
            case 11:
              _context0.p = 11;
              _t11 = _context0.v;
              throw new Error("Failed to process refund: ".concat(_t11.message));
            case 12:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 11]]);
      }));
      function processRefund(_x0, _x1, _x10) {
        return _processRefund.apply(this, arguments);
      }
      return processRefund;
    }()
    /**
     * Get payment by ID
     * @param {string} paymentId - Payment ID
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Payment
     */
    )
  }, {
    key: "getPaymentById",
    value: (function () {
      var _getPaymentById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(paymentId) {
        var options,
          payment,
          _args1 = arguments,
          _t12;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.repository.findById(paymentId, options);
            case 2:
              payment = _context1.v;
              if (payment) {
                _context1.n = 3;
                break;
              }
              throw new Error("Payment not found");
            case 3:
              return _context1.a(2, payment);
            case 4:
              _context1.p = 4;
              _t12 = _context1.v;
              throw new Error("Failed to get payment: ".concat(_t12.message));
            case 5:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 4]]);
      }));
      function getPaymentById(_x11) {
        return _getPaymentById.apply(this, arguments);
      }
      return getPaymentById;
    }()
    /**
     * Get payment by vote code
     * @param {string} voteCode - Vote code
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Payment
     */
    )
  }, {
    key: "getPaymentByVoteCode",
    value: (function () {
      var _getPaymentByVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(voteCode) {
        var options,
          payment,
          _args10 = arguments,
          _t13;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.repository.findByVoteCode(voteCode, options);
            case 2:
              payment = _context10.v;
              if (payment) {
                _context10.n = 3;
                break;
              }
              throw new Error("Invalid vote code");
            case 3:
              return _context10.a(2, payment);
            case 4:
              _context10.p = 4;
              _t13 = _context10.v;
              throw new Error("Failed to get payment: ".concat(_t13.message));
            case 5:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 4]]);
      }));
      function getPaymentByVoteCode(_x12) {
        return _getPaymentByVoteCode.apply(this, arguments);
      }
      return getPaymentByVoteCode;
    }()
    /**
     * Get payment by transaction reference
     * @param {string} reference - Transaction reference
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Payment
     */
    )
  }, {
    key: "getPaymentByReference",
    value: (function () {
      var _getPaymentByReference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(reference) {
        var options,
          payment,
          _args11 = arguments,
          _t14;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findByTransactionReference(reference, options);
            case 2:
              payment = _context11.v;
              if (payment) {
                _context11.n = 3;
                break;
              }
              throw new Error("Payment not found");
            case 3:
              return _context11.a(2, payment);
            case 4:
              _context11.p = 4;
              _t14 = _context11.v;
              throw new Error("Failed to get payment: ".concat(_t14.message));
            case 5:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 4]]);
      }));
      function getPaymentByReference(_x13) {
        return _getPaymentByReference.apply(this, arguments);
      }
      return getPaymentByReference;
    }()
    /**
     * Get payments by voter email
     * @param {string} voterEmail - Voter email
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "getPaymentsByVoter",
    value: (function () {
      var _getPaymentsByVoter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(voterEmail) {
        var page,
          limit,
          options,
          payments,
          _args12 = arguments,
          _t15;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              page = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 1;
              limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 10;
              options = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.repository.findAll({
                voter_email: voterEmail.toLowerCase()
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  created_at: -1
                }
              }));
            case 2:
              payments = _context12.v;
              return _context12.a(2, payments);
            case 3:
              _context12.p = 3;
              _t15 = _context12.v;
              throw new Error("Failed to get payments: ".concat(_t15.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function getPaymentsByVoter(_x14) {
        return _getPaymentsByVoter.apply(this, arguments);
      }
      return getPaymentsByVoter;
    }()
    /**
     * Get payments by event
     * @param {string} eventId - Event ID
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "getPaymentsByEvent",
    value: (function () {
      var _getPaymentsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(eventId) {
        var page,
          limit,
          options,
          payments,
          _args13 = arguments,
          _t16;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
              limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 10;
              options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
              _context13.p = 1;
              _context13.n = 2;
              return this.repository.findAll({
                event: eventId
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  created_at: -1
                }
              }));
            case 2:
              payments = _context13.v;
              return _context13.a(2, payments);
            case 3:
              _context13.p = 3;
              _t16 = _context13.v;
              throw new Error("Failed to get payments: ".concat(_t16.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function getPaymentsByEvent(_x15) {
        return _getPaymentsByEvent.apply(this, arguments);
      }
      return getPaymentsByEvent;
    }()
    /**
     * Get payment statistics
     * @param {Object} filters - Filter criteria
     * @returns {Promise<Object>} - Payment statistics
     */
    )
  }, {
    key: "getPaymentStats",
    value: (function () {
      var _getPaymentStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var filters,
          stats,
          _args14 = arguments,
          _t17;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              filters = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : {};
              _context14.p = 1;
              _context14.n = 2;
              return this.repository.getPaymentStats(filters);
            case 2:
              stats = _context14.v;
              return _context14.a(2, stats);
            case 3:
              _context14.p = 3;
              _t17 = _context14.v;
              throw new Error("Failed to get payment statistics: ".concat(_t17.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function getPaymentStats() {
        return _getPaymentStats.apply(this, arguments);
      }
      return getPaymentStats;
    }()
    /**
     * Validate vote code for casting votes
     * @param {string} voteCode - Vote code
     * @returns {Promise<Object>} - Validation result
     */
    )
  }, {
    key: "validateVoteCode",
    value: (function () {
      var _validateVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(voteCode) {
        var payment, _t18;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this.repository.findByVoteCode(voteCode, {
                populate: ["bundle", "event"]
              });
            case 1:
              payment = _context15.v;
              if (payment) {
                _context15.n = 2;
                break;
              }
              return _context15.a(2, {
                isValid: false,
                reason: "Invalid vote code"
              });
            case 2:
              if (!(payment.status !== _paymentConstants.STATUS.COMPLETED)) {
                _context15.n = 3;
                break;
              }
              return _context15.a(2, {
                isValid: false,
                reason: "Payment not completed",
                payment: payment
              });
            case 3:
              if (!(payment.votes_remaining <= 0)) {
                _context15.n = 4;
                break;
              }
              return _context15.a(2, {
                isValid: false,
                reason: "No votes remaining",
                payment: payment
              });
            case 4:
              return _context15.a(2, {
                isValid: true,
                payment: payment
              });
            case 5:
              _context15.p = 5;
              _t18 = _context15.v;
              throw new Error("Failed to validate vote code: ".concat(_t18.message));
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 5]]);
      }));
      function validateVoteCode(_x16) {
        return _validateVoteCode.apply(this, arguments);
      }
      return validateVoteCode;
    }()
    /**
     * Decrement remaining votes after casting a vote
     * @param {string} voteCode - Vote code
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "useVote",
    value: (function () {
      var _useVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(voteCode) {
        var payment, updatedPayment, _t19;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.repository.findByVoteCode(voteCode);
            case 1:
              payment = _context16.v;
              if (payment) {
                _context16.n = 2;
                break;
              }
              throw new Error("Invalid vote code");
            case 2:
              if (!(payment.votes_remaining <= 0)) {
                _context16.n = 3;
                break;
              }
              throw new Error("No votes remaining");
            case 3:
              _context16.n = 4;
              return this.repository.useVote(payment._id);
            case 4:
              updatedPayment = _context16.v;
              return _context16.a(2, updatedPayment);
            case 5:
              _context16.p = 5;
              _t19 = _context16.v;
              throw new Error("Failed to use vote: ".concat(_t19.message));
            case 6:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 5]]);
      }));
      function useVote(_x17) {
        return _useVote.apply(this, arguments);
      }
      return useVote;
    }()
    /**
     * Increment remaining votes (for vote refund)
     * @param {string} voteCode - Vote code
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "restoreVote",
    value: (function () {
      var _restoreVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(voteCode) {
        var payment, updatedPayment, _t20;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.repository.findByVoteCode(voteCode);
            case 1:
              payment = _context17.v;
              if (payment) {
                _context17.n = 2;
                break;
              }
              throw new Error("Invalid vote code");
            case 2:
              if (!(payment.votes_cast <= 0)) {
                _context17.n = 3;
                break;
              }
              throw new Error("No votes to restore");
            case 3:
              _context17.n = 4;
              return this.repository.restoreVote(payment._id);
            case 4:
              updatedPayment = _context17.v;
              return _context17.a(2, updatedPayment);
            case 5:
              _context17.p = 5;
              _t20 = _context17.v;
              throw new Error("Failed to restore vote: ".concat(_t20.message));
            case 6:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 5]]);
      }));
      function restoreVote(_x18) {
        return _restoreVote.apply(this, arguments);
      }
      return restoreVote;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new PaymentService();