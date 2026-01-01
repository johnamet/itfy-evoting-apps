"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../../shared/base.repository.js");
var _bundleModel = _interopRequireDefault(require("./bundle.model.js"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Bundle Repository
 * This file defines the BundleRepository class which extends the BaseRepository
 * It contains bundle-specific data access methods
 */
var BundleRepository = /*#__PURE__*/function (_BaseRepository) {
  function BundleRepository() {
    _classCallCheck(this, BundleRepository);
    return _callSuper(this, BundleRepository, [_bundleModel["default"]]);
  }

  /**
   * Find all bundles for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of bundles
   */
  _inherits(BundleRepository, _BaseRepository);
  return _createClass(BundleRepository, [{
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventId) {
        var options,
          query,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              query = this.model.find({
                event: eventId
              }).sort({
                display_order: 1,
                price: 1
              });
              this._applyOptions(query, options);
              _context.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Find bundles by event failed: ".concat(_t.message));
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function findByEvent(_x) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Find available bundles for an event (active and within validity)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of available bundles
     */
    )
  }, {
    key: "findAvailableByEvent",
    value: (function () {
      var _findAvailableByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(eventId) {
        var options,
          now,
          query,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              now = new Date();
              query = this.model.find({
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
              this._applyOptions(query, options);
              _context2.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find available bundles by event failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findAvailableByEvent(_x2) {
        return _findAvailableByEvent.apply(this, arguments);
      }
      return findAvailableByEvent;
    }()
    /**
     * Find featured bundles
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of featured bundles
     */
    )
  }, {
    key: "findFeatured",
    value: (function () {
      var _findFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var eventId,
          options,
          filter,
          query,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              eventId = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              filter = {
                is_featured: true,
                status: _voteConstants.BUNDLE_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                display_order: 1,
                price: 1
              });
              this._applyOptions(query, options);
              _context3.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find featured bundles failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findFeatured() {
        return _findFeatured.apply(this, arguments);
      }
      return findFeatured;
    }()
    /**
     * Find popular bundles (most purchased)
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [limit=5] - Maximum number to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of popular bundles
     */
    )
  }, {
    key: "findPopular",
    value: (function () {
      var _findPopular = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var eventId,
          limit,
          options,
          filter,
          query,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              eventId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              limit = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 5;
              options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              _context4.p = 1;
              filter = {
                is_popular: true,
                status: _voteConstants.BUNDLE_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                total_purchases: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context4.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Find popular bundles failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function findPopular() {
        return _findPopular.apply(this, arguments);
      }
      return findPopular;
    }()
    /**
     * Find bundle by slug
     * @param {string} slug - Bundle slug
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Bundle or null
     */
    )
  }, {
    key: "findBySlug",
    value: (function () {
      var _findBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(slug) {
        var options,
          query,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              query = this.model.findOne({
                slug: slug
              });
              this._applyOptions(query, options);
              _context5.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Find bundle by slug failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function findBySlug(_x3) {
        return _findBySlug.apply(this, arguments);
      }
      return findBySlug;
    }()
    /**
     * Find bundles by status
     * @param {string} status - Bundle status
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of bundles
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(status) {
        var eventId,
          options,
          filter,
          query,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              eventId = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : null;
              options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
              _context6.p = 1;
              if (Object.values(_voteConstants.BUNDLE_STATUS).includes(status)) {
                _context6.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              filter = {
                status: status
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                display_order: 1,
                price: 1
              });
              this._applyOptions(query, options);
              _context6.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context6.a(2, _context6.v);
            case 4:
              _context6.p = 4;
              _t6 = _context6.v;
              throw new Error("Find bundles by status failed: ".concat(_t6.message));
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 4]]);
      }));
      function findByStatus(_x4) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Find bundles applicable to a category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of bundles
     */
    )
  }, {
    key: "findByCategory",
    value: (function () {
      var _findByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(categoryId) {
        var options,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              _context7.p = 1;
              query = this.model.find({
                $or: [{
                  categories: categoryId
                }, {
                  categories: {
                    $size: 0
                  }
                } // Unrestricted bundles
                ],
                status: _voteConstants.BUNDLE_STATUS.ACTIVE
              }).sort({
                display_order: 1,
                price: 1
              });
              this._applyOptions(query, options);
              _context7.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find bundles by category failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findByCategory(_x5) {
        return _findByCategory.apply(this, arguments);
      }
      return findByCategory;
    }()
    /**
     * Find bundles by price range
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of bundles
     */
    )
  }, {
    key: "findByPriceRange",
    value: (function () {
      var _findByPriceRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(minPrice, maxPrice) {
        var eventId,
          options,
          filter,
          query,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              eventId = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : null;
              options = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
              _context8.p = 1;
              filter = {
                price: {
                  $gte: minPrice,
                  $lte: maxPrice
                },
                status: _voteConstants.BUNDLE_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                price: 1
              });
              this._applyOptions(query, options);
              _context8.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Find bundles by price range failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findByPriceRange(_x6, _x7) {
        return _findByPriceRange.apply(this, arguments);
      }
      return findByPriceRange;
    }()
    /**
     * Find bundles expiring soon
     * @param {number} [days=7] - Number of days threshold
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Bundles expiring soon
     */
    )
  }, {
    key: "findExpiringSoon",
    value: (function () {
      var _findExpiringSoon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var days,
          eventId,
          options,
          now,
          threshold,
          filter,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              days = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : 7;
              eventId = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
              options = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
              _context9.p = 1;
              now = new Date();
              threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
              filter = {
                status: _voteConstants.BUNDLE_STATUS.ACTIVE,
                validity_end: {
                  $gte: now,
                  $lte: threshold
                }
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                validity_end: 1
              });
              this._applyOptions(query, options);
              _context9.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Find bundles expiring soon failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findExpiringSoon() {
        return _findExpiringSoon.apply(this, arguments);
      }
      return findExpiringSoon;
    }()
    /**
     * Find expired bundles
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Expired bundles
     */
    )
  }, {
    key: "findExpired",
    value: (function () {
      var _findExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var eventId,
          options,
          now,
          filter,
          query,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              eventId = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : null;
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              _context0.p = 1;
              now = new Date();
              filter = {
                validity_end: {
                  $lt: now
                }
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                validity_end: -1
              });
              this._applyOptions(query, options);
              _context0.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Find expired bundles failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function findExpired() {
        return _findExpired.apply(this, arguments);
      }
      return findExpired;
    }()
    /**
     * Get best value bundles (lowest price per vote)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [limit=5] - Maximum number to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Best value bundles
     */
    )
  }, {
    key: "findBestValue",
    value: (function () {
      var _findBestValue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(eventId) {
        var limit,
          options,
          bundles,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              limit = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : 5;
              options = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.aggregate([{
                $match: {
                  event: eventId,
                  status: _voteConstants.BUNDLE_STATUS.ACTIVE
                }
              }, {
                $addFields: {
                  pricePerVote: {
                    $divide: ["$price", "$vote_count"]
                  }
                }
              }, {
                $sort: {
                  pricePerVote: 1
                }
              }, {
                $limit: limit
              }]);
            case 2:
              bundles = _context1.v;
              return _context1.a(2, bundles);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find best value bundles failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findBestValue(_x8) {
        return _findBestValue.apply(this, arguments);
      }
      return findBestValue;
    }()
    /**
     * Record a purchase for a bundle
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {number} amount - Amount paid
     * @returns {Promise<Object>} - Updated bundle
     */
    )
  }, {
    key: "recordPurchase",
    value: (function () {
      var _recordPurchase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(bundleId, amount) {
        var bundle, _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.model.findById(bundleId);
            case 1:
              bundle = _context10.v;
              if (bundle) {
                _context10.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              _context10.n = 3;
              return bundle.recordPurchase(amount);
            case 3:
              return _context10.a(2, _context10.v);
            case 4:
              _context10.p = 4;
              _t10 = _context10.v;
              throw new Error("Record purchase failed: ".concat(_t10.message));
            case 5:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 4]]);
      }));
      function recordPurchase(_x9, _x0) {
        return _recordPurchase.apply(this, arguments);
      }
      return recordPurchase;
    }()
    /**
     * Toggle featured status
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated bundle
     */
    )
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(bundleId) {
        var options,
          bundle,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.findById(bundleId);
            case 2:
              bundle = _context11.v;
              if (bundle) {
                _context11.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              _context11.n = 4;
              return this.updateById(bundleId, {
                is_featured: !bundle.is_featured
              }, options);
            case 4:
              return _context11.a(2, _context11.v);
            case 5:
              _context11.p = 5;
              _t11 = _context11.v;
              throw new Error("Toggle featured failed: ".concat(_t11.message));
            case 6:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 5]]);
      }));
      function toggleFeatured(_x1) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Toggle popular status
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated bundle
     */
    )
  }, {
    key: "togglePopular",
    value: (function () {
      var _togglePopular = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(bundleId) {
        var options,
          bundle,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.findById(bundleId);
            case 2:
              bundle = _context12.v;
              if (bundle) {
                _context12.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              _context12.n = 4;
              return this.updateById(bundleId, {
                is_popular: !bundle.is_popular
              }, options);
            case 4:
              return _context12.a(2, _context12.v);
            case 5:
              _context12.p = 5;
              _t12 = _context12.v;
              throw new Error("Toggle popular failed: ".concat(_t12.message));
            case 6:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 5]]);
      }));
      function togglePopular(_x10) {
        return _togglePopular.apply(this, arguments);
      }
      return togglePopular;
    }()
    /**
     * Update bundle status
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {string} status - New status
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated bundle
     */
    )
  }, {
    key: "updateStatus",
    value: (function () {
      var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(bundleId, status) {
        var options,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              options = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : {};
              _context13.p = 1;
              if (Object.values(_voteConstants.BUNDLE_STATUS).includes(status)) {
                _context13.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              _context13.n = 3;
              return this.updateById(bundleId, {
                status: status
              }, options);
            case 3:
              return _context13.a(2, _context13.v);
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw new Error("Update status failed: ".concat(_t13.message));
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 4]]);
      }));
      function updateStatus(_x11, _x12) {
        return _updateStatus.apply(this, arguments);
      }
      return updateStatus;
    }()
    /**
     * Update display order
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {number} order - New display order
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated bundle
     */
    )
  }, {
    key: "updateDisplayOrder",
    value: (function () {
      var _updateDisplayOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(bundleId, order) {
        var options,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              options = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : {};
              _context14.p = 1;
              _context14.n = 2;
              return this.updateById(bundleId, {
                display_order: order
              }, options);
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Update display order failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function updateDisplayOrder(_x13, _x14) {
        return _updateDisplayOrder.apply(this, arguments);
      }
      return updateDisplayOrder;
    }()
    /**
     * Bulk update display orders
     * @param {Array<{id: string, order: number}>} updates - Array of {id, order} objects
     * @returns {Promise<Array>} - Updated bundles
     */
    )
  }, {
    key: "bulkUpdateDisplayOrder",
    value: (function () {
      var _bulkUpdateDisplayOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(updates) {
        var bulkOps, ids, _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              bulkOps = updates.map(function (_ref) {
                var id = _ref.id,
                  order = _ref.order;
                return {
                  updateOne: {
                    filter: {
                      _id: id
                    },
                    update: {
                      $set: {
                        display_order: order,
                        updated_at: Date.now()
                      }
                    }
                  }
                };
              });
              _context15.n = 1;
              return this.model.bulkWrite(bulkOps);
            case 1:
              ids = updates.map(function (u) {
                return u.id;
              });
              _context15.n = 2;
              return this.model.find({
                _id: {
                  $in: ids
                }
              }).sort({
                display_order: 1
              }).exec();
            case 2:
              return _context15.a(2, _context15.v);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw new Error("Bulk update display order failed: ".concat(_t15.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 3]]);
      }));
      function bulkUpdateDisplayOrder(_x15) {
        return _bulkUpdateDisplayOrder.apply(this, arguments);
      }
      return bulkUpdateDisplayOrder;
    }()
    /**
     * Get bundle statistics for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Bundle statistics
     */
    )
  }, {
    key: "getStatisticsByEvent",
    value: (function () {
      var _getStatisticsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(eventId) {
        var _yield$this$aggregate, _yield$this$aggregate2, stats, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.aggregate([{
                $match: {
                  event: eventId
                }
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
                  inactive: [{
                    $match: {
                      status: _voteConstants.BUNDLE_STATUS.INACTIVE
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
                  }],
                  avgPurchases: [{
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$total_purchases"
                      }
                    }
                  }],
                  mostPopular: [{
                    $sort: {
                      total_purchases: -1
                    }
                  }, {
                    $limit: 1
                  }, {
                    $project: {
                      name: 1,
                      total_purchases: 1
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
                  inactive: {
                    $arrayElemAt: ["$inactive.count", 0]
                  },
                  totalRevenue: {
                    $arrayElemAt: ["$totalRevenue.total", 0]
                  },
                  totalPurchases: {
                    $arrayElemAt: ["$totalPurchases.total", 0]
                  },
                  averagePrice: {
                    $arrayElemAt: ["$avgPrice.average", 0]
                  },
                  averagePurchases: {
                    $arrayElemAt: ["$avgPurchases.average", 0]
                  },
                  mostPopular: {
                    $arrayElemAt: ["$mostPopular", 0]
                  }
                }
              }]);
            case 1:
              _yield$this$aggregate = _context16.v;
              _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
              stats = _yield$this$aggregate2[0];
              return _context16.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                active: (stats === null || stats === void 0 ? void 0 : stats.active) || 0,
                inactive: (stats === null || stats === void 0 ? void 0 : stats.inactive) || 0,
                totalRevenue: Math.round(((stats === null || stats === void 0 ? void 0 : stats.totalRevenue) || 0) * 100) / 100,
                totalPurchases: (stats === null || stats === void 0 ? void 0 : stats.totalPurchases) || 0,
                averagePrice: Math.round(((stats === null || stats === void 0 ? void 0 : stats.averagePrice) || 0) * 100) / 100,
                averagePurchases: Math.round(((stats === null || stats === void 0 ? void 0 : stats.averagePurchases) || 0) * 10) / 10,
                mostPopular: (stats === null || stats === void 0 ? void 0 : stats.mostPopular) || null
              });
            case 2:
              _context16.p = 2;
              _t16 = _context16.v;
              throw new Error("Get statistics by event failed: ".concat(_t16.message));
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 2]]);
      }));
      function getStatisticsByEvent(_x16) {
        return _getStatisticsByEvent.apply(this, arguments);
      }
      return getStatisticsByEvent;
    }()
    /**
     * Get overall bundle statistics
     * @returns {Promise<Object>} - Overall statistics
     */
    )
  }, {
    key: "getOverallStatistics",
    value: (function () {
      var _getOverallStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var _yield$this$aggregate3, _yield$this$aggregate4, stats, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.aggregate([{
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
              _yield$this$aggregate3 = _context17.v;
              _yield$this$aggregate4 = _slicedToArray(_yield$this$aggregate3, 1);
              stats = _yield$this$aggregate4[0];
              return _context17.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                active: (stats === null || stats === void 0 ? void 0 : stats.active) || 0,
                totalRevenue: Math.round(((stats === null || stats === void 0 ? void 0 : stats.totalRevenue) || 0) * 100) / 100,
                totalPurchases: (stats === null || stats === void 0 ? void 0 : stats.totalPurchases) || 0,
                averagePrice: Math.round(((stats === null || stats === void 0 ? void 0 : stats.averagePrice) || 0) * 100) / 100
              });
            case 2:
              _context17.p = 2;
              _t17 = _context17.v;
              throw new Error("Get overall statistics failed: ".concat(_t17.message));
            case 3:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 2]]);
      }));
      function getOverallStatistics() {
        return _getOverallStatistics.apply(this, arguments);
      }
      return getOverallStatistics;
    }()
    /**
     * Get bundle performance comparison
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Array>} - Bundle performance data
     */
    )
  }, {
    key: "getBundlePerformance",
    value: (function () {
      var _getBundlePerformance = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(eventId) {
        var performance, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.aggregate([{
                $match: {
                  event: eventId
                }
              }, {
                $project: {
                  name: 1,
                  price: 1,
                  vote_count: 1,
                  total_purchases: 1,
                  total_revenue: 1,
                  pricePerVote: {
                    $divide: ["$price", "$vote_count"]
                  },
                  revenuePerPurchase: {
                    $cond: {
                      "if": {
                        $eq: ["$total_purchases", 0]
                      },
                      then: 0,
                      "else": {
                        $divide: ["$total_revenue", "$total_purchases"]
                      }
                    }
                  }
                }
              }, {
                $sort: {
                  total_revenue: -1
                }
              }]);
            case 1:
              performance = _context18.v;
              return _context18.a(2, performance);
            case 2:
              _context18.p = 2;
              _t18 = _context18.v;
              throw new Error("Get bundle performance failed: ".concat(_t18.message));
            case 3:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 2]]);
      }));
      function getBundlePerformance(_x17) {
        return _getBundlePerformance.apply(this, arguments);
      }
      return getBundlePerformance;
    }()
    /**
     * Check if bundle applies to category
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<boolean>} - True if applies
     */
    )
  }, {
    key: "appliesToCategory",
    value: (function () {
      var _appliesToCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(bundleId, categoryId) {
        var bundle, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.model.findById(bundleId);
            case 1:
              bundle = _context19.v;
              if (bundle) {
                _context19.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              return _context19.a(2, bundle.appliesToCategory(categoryId));
            case 3:
              _context19.p = 3;
              _t19 = _context19.v;
              throw new Error("Check bundle category application failed: ".concat(_t19.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 3]]);
      }));
      function appliesToCategory(_x18, _x19) {
        return _appliesToCategory.apply(this, arguments);
      }
      return appliesToCategory;
    }()
    /**
     * Create a new bundle
     * @param {Object} bundleData - Bundle data
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} - Created bundle
     */
    )
  }, {
    key: "createBundle",
    value: (function () {
      var _createBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(bundleData) {
        var options,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              options = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : {};
              _context20.p = 1;
              _context20.n = 2;
              return this.create(bundleData, options);
            case 2:
              return _context20.a(2, _context20.v);
            case 3:
              _context20.p = 3;
              _t20 = _context20.v;
              throw new Error("Create bundle failed: ".concat(_t20.message));
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 3]]);
      }));
      function createBundle(_x20) {
        return _createBundle.apply(this, arguments);
      }
      return createBundle;
    }()
    /**
     * Update a bundle
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} updateData - Data to update
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Updated bundle
     */
    )
  }, {
    key: "updateBundle",
    value: (function () {
      var _updateBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(bundleId, updateData) {
        var options,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              options = _args21.length > 2 && _args21[2] !== undefined ? _args21[2] : {};
              _context21.p = 1;
              _context21.n = 2;
              return this.updateById(bundleId, updateData, options);
            case 2:
              return _context21.a(2, _context21.v);
            case 3:
              _context21.p = 3;
              _t21 = _context21.v;
              throw new Error("Update bundle failed: ".concat(_t21.message));
            case 4:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 3]]);
      }));
      function updateBundle(_x21, _x22) {
        return _updateBundle.apply(this, arguments);
      }
      return updateBundle;
    }()
    /**
     * Delete a bundle (soft delete)
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Deleted bundle
     */
    )
  }, {
    key: "deleteBundle",
    value: (function () {
      var _deleteBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(bundleId) {
        var options,
          _args22 = arguments,
          _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              options = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : {};
              _context22.p = 1;
              _context22.n = 2;
              return this["delete"]({
                _id: bundleId
              }, options);
            case 2:
              return _context22.a(2, _context22.v);
            case 3:
              _context22.p = 3;
              _t22 = _context22.v;
              throw new Error("Delete bundle failed: ".concat(_t22.message));
            case 4:
              return _context22.a(2);
          }
        }, _callee22, this, [[1, 3]]);
      }));
      function deleteBundle(_x23) {
        return _deleteBundle.apply(this, arguments);
      }
      return deleteBundle;
    }()
    /**
     * Restore a deleted bundle
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Restored bundle
     */
    )
  }, {
    key: "restoreBundle",
    value: (function () {
      var _restoreBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(bundleId) {
        var options,
          _args23 = arguments,
          _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              options = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : {};
              _context23.p = 1;
              _context23.n = 2;
              return this.restore({
                _id: bundleId
              }, options);
            case 2:
              return _context23.a(2, _context23.v);
            case 3:
              _context23.p = 3;
              _t23 = _context23.v;
              throw new Error("Restore bundle failed: ".concat(_t23.message));
            case 4:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 3]]);
      }));
      function restoreBundle(_x24) {
        return _restoreBundle.apply(this, arguments);
      }
      return restoreBundle;
    }()
    /**
     * Permanently delete a bundle
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Deleted bundle
     */
    )
  }, {
    key: "permanentlyDeleteBundle",
    value: (function () {
      var _permanentlyDeleteBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(bundleId) {
        var options,
          _args24 = arguments,
          _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              options = _args24.length > 1 && _args24[1] !== undefined ? _args24[1] : {};
              _context24.p = 1;
              _context24.n = 2;
              return this.forceDelete({
                _id: bundleId
              }, options);
            case 2:
              return _context24.a(2, _context24.v);
            case 3:
              _context24.p = 3;
              _t24 = _context24.v;
              throw new Error("Permanently delete bundle failed: ".concat(_t24.message));
            case 4:
              return _context24.a(2);
          }
        }, _callee24, this, [[1, 3]]);
      }));
      function permanentlyDeleteBundle(_x25) {
        return _permanentlyDeleteBundle.apply(this, arguments);
      }
      return permanentlyDeleteBundle;
    }()
    /**
     * Duplicate a bundle (useful for creating similar bundles)
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID to duplicate
     * @param {Object} [overrides] - Fields to override in the duplicate
     * @returns {Promise<Object>} - Created duplicate bundle
     */
    )
  }, {
    key: "duplicateBundle",
    value: (function () {
      var _duplicateBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(bundleId) {
        var overrides,
          originalBundle,
          bundleData,
          _args25 = arguments,
          _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              overrides = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : {};
              _context25.p = 1;
              _context25.n = 2;
              return this.findById(bundleId);
            case 2:
              originalBundle = _context25.v;
              if (originalBundle) {
                _context25.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              // Remove fields that should not be duplicated
              bundleData = _objectSpread({
                name: "".concat(originalBundle.name, " (Copy)"),
                description: originalBundle.description,
                event: originalBundle.event,
                categories: originalBundle.categories,
                vote_count: originalBundle.vote_count,
                price: originalBundle.price,
                currency: originalBundle.currency,
                discount_percentage: originalBundle.discount_percentage,
                is_featured: false,
                // Reset featured status
                is_popular: false,
                // Reset popular status
                display_order: originalBundle.display_order,
                validity_start: originalBundle.validity_start,
                validity_end: originalBundle.validity_end,
                features: originalBundle.features
              }, overrides);
              _context25.n = 4;
              return this.create(bundleData);
            case 4:
              return _context25.a(2, _context25.v);
            case 5:
              _context25.p = 5;
              _t25 = _context25.v;
              throw new Error("Duplicate bundle failed: ".concat(_t25.message));
            case 6:
              return _context25.a(2);
          }
        }, _callee25, this, [[1, 5]]);
      }));
      function duplicateBundle(_x26) {
        return _duplicateBundle.apply(this, arguments);
      }
      return duplicateBundle;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new BundleRepository();