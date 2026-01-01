"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../../shared/base.model.js");
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _eventConstants = require("../../../utils/constants/event.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
 * The bundle model definition for the vote module
 */
var Bundle = /*#__PURE__*/function (_BaseModel) {
  function Bundle() {
    var _this;
    _classCallCheck(this, Bundle);
    var schemaDefinition = {
      name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
      },
      categories: [{
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Category"
      }],
      vote_count: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        required: true,
        "default": _eventConstants.CURRENCY.GHS,
        uppercase: true,
        "enum": Object.values(_eventConstants.CURRENCY)
      },
      discount_percentage: {
        type: Number,
        "default": 0,
        min: 0,
        max: 100
      },
      original_price: {
        type: Number,
        required: false,
        min: 0
      },
      is_featured: {
        type: Boolean,
        "default": false,
        index: true
      },
      is_popular: {
        type: Boolean,
        "default": false,
        index: true
      },
      display_order: {
        type: Number,
        "default": 0
      },
      status: {
        type: String,
        "enum": Object.values(_voteConstants.BUNDLE_STATUS),
        "default": _voteConstants.BUNDLE_STATUS.ACTIVE,
        index: true
      },
      validity_start: {
        type: Date,
        "default": null
      },
      validity_end: {
        type: Date,
        "default": null
      },
      total_purchases: {
        type: Number,
        "default": 0,
        min: 0
      },
      total_revenue: {
        type: Number,
        "default": 0,
        min: 0
      },
      icon: {
        type: String,
        "default": null
      },
      color_theme: {
        type: String,
        "default": null
      },
      features: {
        type: [String],
        "default": []
      },
      metadata: {
        type: Map,
        of: String,
        "default": {}
      },
      created_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      updated_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        "default": null
      }
    };
    var options = {
      softDelete: true,
      timestamps: true
    };
    _this = _callSuper(this, Bundle, [schemaDefinition, options]);

    // Create indexes
    _this.schema.index({
      event: 1,
      status: 1
    });
    _this.schema.index({
      event: 1,
      is_featured: 1
    });
    _this.schema.index({
      slug: 1
    }, {
      unique: true,
      sparse: true
    });
    _this.schema.index({
      display_order: 1
    });
    _this.schema.index({
      price: 1
    });

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var baseSlug, Category, categories, _iterator, _step, category, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Generate slug if not provided
              if (!this.slug && this.name) {
                baseSlug = this.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
                this.slug = "".concat(baseSlug, "-").concat(this.event.toString().slice(-6));
              }

              // Calculate original price if discount is applied
              if (this.discount_percentage > 0 && !this.original_price) {
                this.original_price = this.price / (1 - this.discount_percentage / 100);
              }

              // Validate validity dates
              if (!(this.validity_start && this.validity_end)) {
                _context.n = 1;
                break;
              }
              if (!(this.validity_end <= this.validity_start)) {
                _context.n = 1;
                break;
              }
              throw new Error("Validity end date must be after start date");
            case 1:
              if (!(this.categories && this.categories.length > 0)) {
                _context.n = 9;
                break;
              }
              Category = _mongoose["default"].model("Category");
              _context.n = 2;
              return Category.find({
                _id: {
                  $in: this.categories
                }
              });
            case 2:
              categories = _context.v;
              _iterator = _createForOfIteratorHelper(categories);
              _context.p = 3;
              _iterator.s();
            case 4:
              if ((_step = _iterator.n()).done) {
                _context.n = 6;
                break;
              }
              category = _step.value;
              if (!(category.event.toString() !== this.event.toString())) {
                _context.n = 5;
                break;
              }
              throw new Error("All categories must belong to the bundle's event");
            case 5:
              _context.n = 4;
              break;
            case 6:
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              _iterator.e(_t);
            case 8:
              _context.p = 8;
              _iterator.f();
              return _context.f(8);
            case 9:
              next();
              _context.n = 11;
              break;
            case 10:
              _context.p = 10;
              _t2 = _context.v;
              next(_t2);
            case 11:
              return _context.a(2);
          }
        }, _callee, this, [[3, 7, 8, 9], [0, 10]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Virtual: Is valid (within validity period)
    _this.schema.virtual("isValid").get(function () {
      if (!this.validity_start && !this.validity_end) return true;
      var now = new Date();
      if (this.validity_start && now < this.validity_start) return false;
      if (this.validity_end && now > this.validity_end) return false;
      return true;
    });

    // Virtual: Is available (active and valid)
    _this.schema.virtual("isAvailable").get(function () {
      return this.status === _voteConstants.BUNDLE_STATUS.ACTIVE && this.isValid;
    });

    // Virtual: Price per vote
    _this.schema.virtual("pricePerVote").get(function () {
      return this.vote_count > 0 ? this.price / this.vote_count : 0;
    });

    // Virtual: Savings amount
    _this.schema.virtual("savingsAmount").get(function () {
      if (!this.original_price) return 0;
      return this.original_price - this.price;
    });

    // Virtual: Is restricted (category-specific)
    _this.schema.virtual("isRestricted").get(function () {
      return this.categories && this.categories.length > 0;
    });

    // Virtual: Days until expiry
    _this.schema.virtual("daysUntilExpiry").get(function () {
      if (!this.validity_end) return null;
      var now = new Date();
      if (this.validity_end <= now) return 0;
      return Math.ceil((this.validity_end - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Average revenue per purchase
    _this.schema.virtual("averageRevenuePerPurchase").get(function () {
      if (this.total_purchases === 0) return 0;
      return this.total_revenue / this.total_purchases;
    });

    // Static method: Find bundles by event
    _this.schema.statics.findByEvent = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(eventId) {
        var options,
          query,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              query = this.find({
                event: eventId
              }).sort({
                display_order: 1,
                price: 1
              });
              if (options.populate) query.populate(options.populate);
              _context2.n = 1;
              return query.exec();
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2, this);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    // Static method: Find available bundles for event
    _this.schema.statics.findAvailableByEvent = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(eventId) {
        var options,
          now,
          query,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              now = new Date();
              query = this.find({
                event: eventId,
                status: _voteConstants.BUNDLE_STATUS.ACTIVE,
                $or: [{
                  validity_start: null,
                  validity_end: null
                }, {
                  validity_start: {
                    $lte: now
                  },
                  validity_end: {
                    $gte: now
                  }
                }, {
                  validity_start: null,
                  validity_end: {
                    $gte: now
                  }
                }, {
                  validity_start: {
                    $lte: now
                  },
                  validity_end: null
                }]
              }).sort({
                display_order: 1,
                price: 1
              });
              if (options.populate) query.populate(options.populate);
              _context3.n = 1;
              return query.exec();
            case 1:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    // Static method: Find featured bundles
    _this.schema.statics.findFeatured = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var eventId,
        options,
        filter,
        query,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            eventId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            filter = {
              is_featured: true,
              status: _voteConstants.BUNDLE_STATUS.ACTIVE
            };
            if (eventId) filter.event = eventId;
            query = this.find(filter).sort({
              display_order: 1
            });
            if (options.populate) query.populate(options.populate);
            _context4.n = 1;
            return query.exec();
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4, this);
    }));

    // Static method: Find popular bundles
    _this.schema.statics.findPopular = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var eventId,
        options,
        filter,
        query,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            eventId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
            options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            filter = {
              is_popular: true,
              status: _voteConstants.BUNDLE_STATUS.ACTIVE
            };
            if (eventId) filter.event = eventId;
            query = this.find(filter).sort({
              total_purchases: -1
            });
            if (options.populate) query.populate(options.populate);
            _context5.n = 1;
            return query.exec();
          case 1:
            return _context5.a(2, _context5.v);
        }
      }, _callee5, this);
    }));

    // Static method: Find bundle by slug
    _this.schema.statics.findBySlug = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(slug) {
        var options,
          query,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              query = this.findOne({
                slug: slug
              });
              if (options.populate) query.populate(options.populate);
              _context6.n = 1;
              return query.exec();
            case 1:
              return _context6.a(2, _context6.v);
          }
        }, _callee6, this);
      }));
      return function (_x4) {
        return _ref6.apply(this, arguments);
      };
    }();

    // Static method: Find bundles for category
    _this.schema.statics.findByCategory = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(categoryId) {
        var options,
          query,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              query = this.find({
                $or: [{
                  categories: categoryId
                }, {
                  categories: {
                    $size: 0
                  }
                }],
                status: _voteConstants.BUNDLE_STATUS.ACTIVE
              }).sort({
                display_order: 1,
                price: 1
              });
              if (options.populate) query.populate(options.populate);
              _context7.n = 1;
              return query.exec();
            case 1:
              return _context7.a(2, _context7.v);
          }
        }, _callee7, this);
      }));
      return function (_x5) {
        return _ref7.apply(this, arguments);
      };
    }();

    // Static method: Get bundle statistics
    _this.schema.statics.getStatistics = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var eventId,
        matchStage,
        _yield$this$aggregate,
        _yield$this$aggregate2,
        stats,
        _args8 = arguments;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            eventId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : null;
            matchStage = eventId ? {
              event: eventId
            } : {};
            _context8.n = 1;
            return this.aggregate([{
              $match: matchStage
            }, {
              $facet: {
                total: [{
                  $count: "count"
                }],
                active: [{
                  $match: {
                    status: _voteConstants.BUNDLE_STATUS.ACTIVE
                  }
                }, {
                  $count: "count"
                }],
                totalRevenue: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$total_revenue"
                    }
                  }
                }],
                totalPurchases: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$total_purchases"
                    }
                  }
                }],
                avgPrice: [{
                  $group: {
                    _id: null,
                    average: {
                      $avg: "$price"
                    }
                  }
                }]
              }
            }, {
              $project: {
                total: {
                  $arrayElemAt: ["$total.count", 0]
                },
                active: {
                  $arrayElemAt: ["$active.count", 0]
                },
                totalRevenue: {
                  $arrayElemAt: ["$totalRevenue.total", 0]
                },
                totalPurchases: {
                  $arrayElemAt: ["$totalPurchases.total", 0]
                },
                averagePrice: {
                  $arrayElemAt: ["$avgPrice.average", 0]
                }
              }
            }]);
          case 1:
            _yield$this$aggregate = _context8.v;
            _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
            stats = _yield$this$aggregate2[0];
            return _context8.a(2, {
              total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
              active: (stats === null || stats === void 0 ? void 0 : stats.active) || 0,
              totalRevenue: (stats === null || stats === void 0 ? void 0 : stats.totalRevenue) || 0,
              totalPurchases: (stats === null || stats === void 0 ? void 0 : stats.totalPurchases) || 0,
              averagePrice: Math.round(((stats === null || stats === void 0 ? void 0 : stats.averagePrice) || 0) * 100) / 100
            });
        }
      }, _callee8, this);
    }));

    // Instance method: Record purchase
    _this.schema.methods.recordPurchase = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(amount) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              this.total_purchases += 1;
              this.total_revenue += amount;
              _context9.n = 1;
              return this.save();
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      return function (_x6) {
        return _ref9.apply(this, arguments);
      };
    }();

    // Instance method: Check if bundle applies to category
    _this.schema.methods.appliesToCategory = function (categoryId) {
      // If no categories specified, applies to all
      if (!this.categories || this.categories.length === 0) return true;

      // Otherwise, check if category is in the list
      return this.categories.some(function (cat) {
        return cat.toString() === categoryId.toString();
      });
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
  _inherits(Bundle, _BaseModel);
  return _createClass(Bundle);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Bundle().getModel("Bundle");