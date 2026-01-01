"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _paymentConstants = require("../../utils/constants/payment.constants.js");
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * The payment model definition for the vote module
 * Updated to support multiple bundles per payment
 */
var Payment = /*#__PURE__*/function (_BaseModel) {
  function Payment() {
    var _this;
    _classCallCheck(this, Payment);
    var schemaDefinition = {
      transaction_reference: {
        type: String,
        unique: true,
        index: true
      },
      paystack_reference: {
        type: String,
        unique: true,
        sparse: true,
        index: true
      },
      paystack_access_code: {
        type: String,
        index: true
      },
      // Changed from single bundle to array of bundles
      bundles: [{
        bundle: {
          type: _mongoose["default"].Schema.Types.ObjectId,
          ref: "Bundle",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          "default": 1
        },
        votes_allocated: {
          type: Number,
          required: true,
          min: 1
        },
        votes_used: {
          type: Number,
          "default": 0,
          min: 0
        },
        price_per_unit: {
          type: Number,
          required: true,
          min: 0
        },
        total_price: {
          type: Number,
          required: true,
          min: 0
        },
        applicable_categories: [{
          type: _mongoose["default"].Schema.Types.ObjectId,
          ref: "Category"
        }],
        _id: false
      }],
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
      },
      coupon: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Coupon",
        "default": null
      },
      vote_code: {
        type: String,
        required: true,
        unique: true,
        index: true
      },
      votes_purchased: {
        type: Number,
        required: true,
        min: 1
      },
      votes_cast: {
        type: Number,
        "default": 0,
        min: 0
      },
      votes_remaining: {
        type: Number,
        "default": 0,
        min: 0
      },
      // Track votes by category
      votes_by_category: [{
        category: {
          type: _mongoose["default"].Schema.Types.ObjectId,
          ref: "Category",
          required: true
        },
        votes_available: {
          type: Number,
          required: true,
          min: 0
        },
        votes_used: {
          type: Number,
          "default": 0,
          min: 0
        },
        bundle_sources: [{
          bundle: {
            type: _mongoose["default"].Schema.Types.ObjectId,
            ref: "Bundle"
          },
          votes_allocated: Number,
          votes_used: Number
        }],
        _id: false
      }],
      amount_paid: {
        type: Number,
        required: true,
        min: 0
      },
      original_amount: {
        type: Number,
        required: true,
        min: 0
      },
      discount_amount: {
        type: Number,
        "default": 0,
        min: 0
      },
      currency: {
        type: String,
        required: true,
        "default": "GHS",
        uppercase: true
      },
      voter_email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
      },
      voter_phone: {
        type: String,
        trim: true
      },
      voter_name: {
        type: String,
        trim: true
      },
      payment_method: {
        type: String,
        "enum": Object.values(_paymentConstants.PAYMENT_METHOD),
        "default": null,
        required: false
      },
      payment_status: {
        type: String,
        "enum": Object.values(_paymentConstants.STATUS),
        "default": _paymentConstants.STATUS.PENDING,
        index: true
      },
      webhook_received: {
        type: Boolean,
        "default": false,
        index: true
      },
      auto_vote_cast: {
        type: Boolean,
        "default": false
      },
      ip_address: {
        type: String
      },
      ip_hash: {
        type: String,
        index: true
      },
      user_agent: {
        type: String
      },
      paystack_metadata: {
        type: Map,
        of: _mongoose["default"].Schema.Types.Mixed,
        "default": {}
      },
      authorization: {
        type: {
          authorization_code: String,
          card_type: String,
          last4: String,
          exp_month: String,
          exp_year: String,
          bin: String,
          bank: String,
          channel: String,
          signature: String,
          reusable: Boolean,
          country_code: String
        },
        "default": null
      },
      customer: {
        type: {
          paystack_customer_id: String,
          customer_code: String
        },
        "default": null
      },
      confirmed_at: {
        type: Date,
        "default": null
      },
      failed_at: {
        type: Date,
        "default": null
      },
      refunded_at: {
        type: Date,
        "default": null
      },
      refund_reason: {
        type: String,
        trim: true
      },
      refund_amount: {
        type: Number,
        "default": 0,
        min: 0
      },
      failure_reason: {
        type: String,
        trim: true
      },
      webhook_attempts: {
        type: Number,
        "default": 0,
        min: 0
      },
      last_webhook_at: {
        type: Date,
        "default": null
      },
      metadata: {
        type: Map,
        of: _mongoose["default"].Schema.Types.Mixed,
        "default": {}
      }
    };
    var options = {
      softDelete: true,
      timestamps: true
    };
    _this = _callSuper(this, Payment, [schemaDefinition, options]);

    // Create indexes
    _this.schema.index({
      event: 1,
      payment_status: 1
    });
    _this.schema.index({
      voter_email: 1,
      event: 1
    });
    _this.schema.index({
      payment_status: 1,
      webhook_received: 1
    });
    _this.schema.index({
      created_at: -1
    });
    _this.schema.index({
      confirmed_at: -1
    });
    _this.schema.index({
      "bundles.bundle": 1
    });
    _this.schema.index({
      "votes_by_category.category": 1
    });

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var _this2 = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              try {
                // Generate vote code if not provided
                if (!this.vote_code) {
                  this.vote_code = this.generateVoteCode();
                }

                // Generate transaction reference if not provided
                if (!this.transaction_reference) {
                  this.transaction_reference = this.generateTransactionReference();
                }

                // Hash IP address for privacy
                if (this.ip_address && !this.ip_hash) {
                  this.ip_hash = _crypto["default"].createHash("sha256").update(this.ip_address).digest("hex");
                }

                // Calculate total votes remaining
                this.votes_remaining = this.votes_purchased - this.votes_cast;

                // Update bundle-level votes used/remaining
                this.bundles.forEach(function (bundleItem) {
                  bundleItem.votes_used = Math.min(bundleItem.votes_allocated, bundleItem.votes_allocated - (_this2.votes_remaining > 0 ? Math.min(_this2.votes_remaining, bundleItem.votes_allocated) : 0));
                });

                // Set confirmed_at when status changes to completed
                if (this.isModified("payment_status") && this.payment_status === _paymentConstants.STATUS.COMPLETED && !this.confirmed_at) {
                  this.confirmed_at = new Date();
                }

                // Set failed_at when status changes to failed
                if (this.isModified("payment_status") && this.payment_status === _paymentConstants.STATUS.FAILED && !this.failed_at) {
                  this.failed_at = new Date();
                }

                // Set refunded_at when status changes to refunded
                if (this.isModified("payment_status") && this.payment_status === _paymentConstants.STATUS.REFUNDED && !this.refunded_at) {
                  this.refunded_at = new Date();
                }
                next();
              } catch (error) {
                next(error);
              }
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Instance method: Get available votes for a specific category
    _this.schema.methods.getAvailableVotesForCategory = function (categoryId) {
      var categoryVotes = this.votes_by_category.find(function (vc) {
        return vc.category.toString() === categoryId.toString();
      });
      return categoryVotes ? categoryVotes.votes_available - categoryVotes.votes_used : 0;
    };

    // Instance method: Use votes for a specific category
    _this.schema.methods.useVotesForCategory = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(categoryId) {
        var _this3 = this;
        var votesToUse,
          categoryIndex,
          categoryVotes,
          availableVotes,
          remainingToAllocate,
          _iterator,
          _step,
          _loop,
          _args3 = arguments,
          _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              votesToUse = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 1;
              categoryIndex = this.votes_by_category.findIndex(function (vc) {
                return vc.category.toString() === categoryId.toString();
              });
              if (!(categoryIndex === -1)) {
                _context3.n = 1;
                break;
              }
              throw new Error("Category not available for voting with this payment");
            case 1:
              categoryVotes = this.votes_by_category[categoryIndex];
              availableVotes = categoryVotes.votes_available - categoryVotes.votes_used;
              if (!(availableVotes < votesToUse)) {
                _context3.n = 2;
                break;
              }
              throw new Error("Insufficient votes for this category. Available: ".concat(availableVotes, ", Requested: ").concat(votesToUse));
            case 2:
              // Update category votes
              categoryVotes.votes_used += votesToUse;

              // Update bundle-level tracking
              remainingToAllocate = votesToUse;
              _iterator = _createForOfIteratorHelper(categoryVotes.bundle_sources);
              _context3.p = 3;
              _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                var bundleSource, bundleAvailable, toUse, mainBundleIndex;
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.n) {
                    case 0:
                      bundleSource = _step.value;
                      if (!(remainingToAllocate <= 0)) {
                        _context2.n = 1;
                        break;
                      }
                      return _context2.a(2, 1);
                    case 1:
                      bundleAvailable = bundleSource.votes_allocated - bundleSource.votes_used;
                      toUse = Math.min(bundleAvailable, remainingToAllocate);
                      if (toUse > 0) {
                        bundleSource.votes_used += toUse;
                        remainingToAllocate -= toUse;

                        // Update main bundles array
                        mainBundleIndex = _this3.bundles.findIndex(function (b) {
                          return b.bundle.toString() === bundleSource.bundle.toString();
                        });
                        if (mainBundleIndex !== -1) {
                          _this3.bundles[mainBundleIndex].votes_used += toUse;
                        }
                      }
                    case 2:
                      return _context2.a(2);
                  }
                }, _loop);
              });
              _iterator.s();
            case 4:
              if ((_step = _iterator.n()).done) {
                _context3.n = 7;
                break;
              }
              return _context3.d(_regeneratorValues(_loop()), 5);
            case 5:
              if (!_context3.v) {
                _context3.n = 6;
                break;
              }
              return _context3.a(3, 7);
            case 6:
              _context3.n = 4;
              break;
            case 7:
              _context3.n = 9;
              break;
            case 8:
              _context3.p = 8;
              _t = _context3.v;
              _iterator.e(_t);
            case 9:
              _context3.p = 9;
              _iterator.f();
              return _context3.f(9);
            case 10:
              // Update overall votes cast
              this.votes_cast += votesToUse;
              this.votes_remaining = this.votes_purchased - this.votes_cast;
              _context3.n = 11;
              return this.save();
            case 11:
              return _context3.a(2, _context3.v);
          }
        }, _callee2, this, [[3, 8, 9, 10]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    // Instance method: Get voting summary
    _this.schema.methods.getVotingSummary = function () {
      return {
        vote_code: this.vote_code,
        total_votes: this.votes_purchased,
        votes_used: this.votes_cast,
        votes_remaining: this.votes_remaining,
        bundles: this.bundles.map(function (b) {
          return {
            bundle_id: b.bundle,
            quantity: b.quantity,
            votes_allocated: b.votes_allocated,
            votes_used: b.votes_used,
            votes_remaining: b.votes_allocated - b.votes_used,
            applicable_categories: b.applicable_categories
          };
        }),
        categories: this.votes_by_category.map(function (vc) {
          return {
            category_id: vc.category,
            votes_available: vc.votes_available,
            votes_used: vc.votes_used,
            votes_remaining: vc.votes_available - vc.votes_used
          };
        })
      };
    };

    // Static method: Generate vote code
    _this.schema.statics.generateVoteCode = function () {
      var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      var part1 = Array.from({
        length: 5
      }, function () {
        return chars.charAt(Math.floor(Math.random() * chars.length));
      }).join("");
      var part2 = Array.from({
        length: 5
      }, function () {
        return chars.charAt(Math.floor(Math.random() * chars.length));
      }).join("");
      return "VOTE-".concat(part1, "-").concat(part2);
    };

    // Static method: Generate transaction reference
    _this.schema.statics.generateTransactionReference = function () {
      var timestamp = Date.now();
      var random = Math.floor(Math.random() * 1000000);
      return "TXN-".concat(timestamp, "-").concat(random);
    };

    // Instance method: Generate vote code
    _this.schema.methods.generateVoteCode = function () {
      return this.constructor.generateVoteCode();
    };

    // Instance method: Generate transaction reference
    _this.schema.methods.generateTransactionReference = function () {
      return this.constructor.generateTransactionReference();
    };

    // Ensure virtuals are included in JSON and Object outputs
    _this.schema.set("toJSON", {
      virtuals: true
    });
    _this.schema.set("toObject", {
      virtuals: true
    });
    return _this;
  }
  _inherits(Payment, _BaseModel);
  return _createClass(Payment);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Payment().getModel("Payment");