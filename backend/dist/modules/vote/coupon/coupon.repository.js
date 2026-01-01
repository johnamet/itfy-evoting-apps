"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../../shared/base.repository.js");
var _couponModel = _interopRequireDefault(require("./coupon.model.js"));
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
 * Coupon Repository
 * This file defines the CouponRepository class which extends the BaseRepository
 * It contains coupon-specific data access methods
 */
var CouponRepository = /*#__PURE__*/function (_BaseRepository) {
  function CouponRepository() {
    _classCallCheck(this, CouponRepository);
    return _callSuper(this, CouponRepository, [_couponModel["default"]]);
  }

  /**
   * Find all coupons for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of coupons
   */
  _inherits(CouponRepository, _BaseRepository);
  return _createClass(CouponRepository, [{
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
                created_at: -1
              });
              this._applyOptions(query, options);
              _context.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Find coupons by event failed: ".concat(_t.message));
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
     * Find active coupons for an event (within validity period)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of active coupons
     */
    )
  }, {
    key: "findActiveByEvent",
    value: (function () {
      var _findActiveByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(eventId) {
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
                status: _voteConstants.COUPON_STATUS.ACTIVE,
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
                }],
                $expr: {
                  $or: [{
                    $eq: ["$max_total_uses", null]
                  }, {
                    $lt: ["$current_redemptions", "$max_total_uses"]
                  }]
                }
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context2.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find active coupons by event failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findActiveByEvent(_x2) {
        return _findActiveByEvent.apply(this, arguments);
      }
      return findActiveByEvent;
    }()
    /**
     * Find public coupons (visible to all users)
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of public coupons
     */
    )
  }, {
    key: "findPublic",
    value: (function () {
      var _findPublic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
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
                is_public: true,
                status: _voteConstants.COUPON_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context3.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find public coupons failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findPublic() {
        return _findPublic.apply(this, arguments);
      }
      return findPublic;
    }()
    /**
     * Find coupon by code
     * @param {string} code - Coupon code
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Coupon or null
     */
    )
  }, {
    key: "findByCode",
    value: (function () {
      var _findByCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(code) {
        var options,
          query,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              query = this.model.findOne({
                code: code.toUpperCase()
              });
              this._applyOptions(query, options);
              _context4.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Find coupon by code failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function findByCode(_x3) {
        return _findByCode.apply(this, arguments);
      }
      return findByCode;
    }()
    /**
     * Find coupons by status
     * @param {string} status - Coupon status
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of coupons
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(status) {
        var eventId,
          options,
          filter,
          query,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              eventId = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : null;
              options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              _context5.p = 1;
              if (Object.values(_voteConstants.COUPON_STATUS).includes(status)) {
                _context5.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              filter = {
                status: status
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context5.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context5.a(2, _context5.v);
            case 4:
              _context5.p = 4;
              _t5 = _context5.v;
              throw new Error("Find coupons by status failed: ".concat(_t5.message));
            case 5:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 4]]);
      }));
      function findByStatus(_x4) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Find expired coupons
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of expired coupons
     */
    )
  }, {
    key: "findExpired",
    value: (function () {
      var _findExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var eventId,
          options,
          now,
          filter,
          query,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              eventId = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : null;
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.p = 1;
              now = new Date();
              filter = {
                $or: [{
                  status: _voteConstants.COUPON_STATUS.EXPIRED
                }, {
                  validity_end: {
                    $lt: now
                  }
                }, {
                  $expr: {
                    $gte: ["$current_redemptions", "$max_total_uses"]
                  }
                }]
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                validity_end: -1
              });
              this._applyOptions(query, options);
              _context6.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find expired coupons failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findExpired() {
        return _findExpired.apply(this, arguments);
      }
      return findExpired;
    }()
    /**
     * Find coupons expiring soon
     * @param {number} [days=7] - Number of days threshold
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Coupons expiring soon
     */
    )
  }, {
    key: "findExpiringSoon",
    value: (function () {
      var _findExpiringSoon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var days,
          eventId,
          options,
          now,
          threshold,
          filter,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              days = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : 7;
              eventId = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : null;
              options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
              _context7.p = 1;
              now = new Date();
              threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
              filter = {
                status: _voteConstants.COUPON_STATUS.ACTIVE,
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
              _context7.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find coupons expiring soon failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findExpiringSoon() {
        return _findExpiringSoon.apply(this, arguments);
      }
      return findExpiringSoon;
    }()
    /**
     * Find coupons applicable to a bundle
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of applicable coupons
     */
    )
  }, {
    key: "findByBundle",
    value: (function () {
      var _findByBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(bundleId) {
        var options,
          query,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              _context8.p = 1;
              query = this.model.find({
                $or: [{
                  applicable_bundles: bundleId
                }, {
                  applicable_bundles: {
                    $size: 0
                  }
                } // Unrestricted coupons
                ],
                status: _voteConstants.COUPON_STATUS.ACTIVE
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context8.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Find coupons by bundle failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findByBundle(_x5) {
        return _findByBundle.apply(this, arguments);
      }
      return findByBundle;
    }()
    /**
     * Find most used coupons
     * @param {number} [limit=10] - Maximum number to return
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Most used coupons
     */
    )
  }, {
    key: "findMostUsed",
    value: (function () {
      var _findMostUsed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var limit,
          eventId,
          options,
          filter,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              limit = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : 10;
              eventId = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
              options = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
              _context9.p = 1;
              filter = {};
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                current_redemptions: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context9.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Find most used coupons failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findMostUsed() {
        return _findMostUsed.apply(this, arguments);
      }
      return findMostUsed;
    }()
    /**
     * Find unused coupons (zero redemptions)
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Unused coupons
     */
    )
  }, {
    key: "findUnused",
    value: (function () {
      var _findUnused = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var eventId,
          options,
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
              filter = {
                current_redemptions: 0
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context0.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Find unused coupons failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function findUnused() {
        return _findUnused.apply(this, arguments);
      }
      return findUnused;
    }()
    /**
     * Find coupons near usage limit
     * @param {number} [percentage=90] - Usage percentage threshold
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Coupons near limit
     */
    )
  }, {
    key: "findNearLimit",
    value: (function () {
      var _findNearLimit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var percentage,
          eventId,
          options,
          filter,
          query,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              percentage = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : 90;
              eventId = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : null;
              options = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : {};
              _context1.p = 1;
              filter = {
                max_total_uses: {
                  $ne: null
                },
                $expr: {
                  $gte: [{
                    $multiply: [{
                      $divide: ["$current_redemptions", "$max_total_uses"]
                    }, 100]
                  }, percentage]
                },
                status: _voteConstants.COUPON_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                current_redemptions: -1
              });
              this._applyOptions(query, options);
              _context1.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find coupons near limit failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findNearLimit() {
        return _findNearLimit.apply(this, arguments);
      }
      return findNearLimit;
    }()
    /**
     * Validate coupon for use
     * @param {string} code - Coupon code
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {number} bundlePrice - Bundle price
     * @returns {Promise<Object>} - Validation result
     */
    )
  }, {
    key: "validateCoupon",
    value: (function () {
      var _validateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(code, bundleId, bundlePrice) {
        var coupon, _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.model.findOne({
                code: code.toUpperCase()
              });
            case 1:
              coupon = _context10.v;
              if (coupon) {
                _context10.n = 2;
                break;
              }
              return _context10.a(2, {
                valid: false,
                message: "Coupon not found"
              });
            case 2:
              return _context10.a(2, coupon.validateForBundle(bundleId, bundlePrice));
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Validate coupon failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 3]]);
      }));
      function validateCoupon(_x6, _x7, _x8) {
        return _validateCoupon.apply(this, arguments);
      }
      return validateCoupon;
    }()
    /**
     * Calculate discount for coupon
     * @param {string} code - Coupon code
     * @param {number} bundlePrice - Bundle price
     * @param {number} bundleVotes - Bundle votes
     * @returns {Promise<Object>} - Discount calculation
     */
    )
  }, {
    key: "calculateDiscount",
    value: (function () {
      var _calculateDiscount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(code, bundlePrice, bundleVotes) {
        var coupon, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return this.model.findOne({
                code: code.toUpperCase()
              });
            case 1:
              coupon = _context11.v;
              if (coupon) {
                _context11.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              return _context11.a(2, coupon.calculateDiscount(bundlePrice, bundleVotes));
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Calculate discount failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 3]]);
      }));
      function calculateDiscount(_x9, _x0, _x1) {
        return _calculateDiscount.apply(this, arguments);
      }
      return calculateDiscount;
    }()
    /**
     * Redeem a coupon
     * @param {string} code - Coupon code
     * @returns {Promise<Object>} - Updated coupon
     */
    )
  }, {
    key: "redeem",
    value: (function () {
      var _redeem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(code) {
        var coupon, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.model.findOne({
                code: code.toUpperCase()
              });
            case 1:
              coupon = _context12.v;
              if (coupon) {
                _context12.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              _context12.n = 3;
              return coupon.redeem();
            case 3:
              return _context12.a(2, _context12.v);
            case 4:
              _context12.p = 4;
              _t12 = _context12.v;
              throw new Error("Redeem coupon failed: ".concat(_t12.message));
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 4]]);
      }));
      function redeem(_x10) {
        return _redeem.apply(this, arguments);
      }
      return redeem;
    }()
    /**
     * Update coupon status
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
     * @param {string} status - New status
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated coupon
     */
    )
  }, {
    key: "updateStatus",
    value: (function () {
      var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(couponId, status) {
        var options,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              options = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : {};
              _context13.p = 1;
              if (Object.values(_voteConstants.COUPON_STATUS).includes(status)) {
                _context13.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              _context13.n = 3;
              return this.updateById(couponId, {
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
     * Toggle public visibility
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated coupon
     */
    )
  }, {
    key: "togglePublic",
    value: (function () {
      var _togglePublic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(couponId) {
        var options,
          coupon,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              options = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
              _context14.p = 1;
              _context14.n = 2;
              return this.findById(couponId);
            case 2:
              coupon = _context14.v;
              if (coupon) {
                _context14.n = 3;
                break;
              }
              throw new Error("Coupon not found");
            case 3:
              _context14.n = 4;
              return this.updateById(couponId, {
                is_public: !coupon.is_public
              }, options);
            case 4:
              return _context14.a(2, _context14.v);
            case 5:
              _context14.p = 5;
              _t14 = _context14.v;
              throw new Error("Toggle public failed: ".concat(_t14.message));
            case 6:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 5]]);
      }));
      function togglePublic(_x13) {
        return _togglePublic.apply(this, arguments);
      }
      return togglePublic;
    }()
    /**
     * Get coupon statistics for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Coupon statistics
     */
    )
  }, {
    key: "getStatisticsByEvent",
    value: (function () {
      var _getStatisticsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(eventId) {
        var _yield$this$aggregate, _yield$this$aggregate2, stats, _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
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
                      status: _voteConstants.COUPON_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  expired: [{
                    $match: {
                      status: _voteConstants.COUPON_STATUS.EXPIRED
                    }
                  }, {
                    $count: "count"
                  }],
                  "public": [{
                    $match: {
                      is_public: true
                    }
                  }, {
                    $count: "count"
                  }],
                  totalRedemptions: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$current_redemptions"
                      }
                    }
                  }],
                  avgRedemptions: [{
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$current_redemptions"
                      }
                    }
                  }],
                  mostUsed: [{
                    $sort: {
                      current_redemptions: -1
                    }
                  }, {
                    $limit: 1
                  }, {
                    $project: {
                      code: 1,
                      current_redemptions: 1
                    }
                  }],
                  byDiscountType: [{
                    $group: {
                      _id: "$discount_type",
                      count: {
                        $sum: 1
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
                  expired: {
                    $arrayElemAt: ["$expired.count", 0]
                  },
                  "public": {
                    $arrayElemAt: ["$public.count", 0]
                  },
                  totalRedemptions: {
                    $arrayElemAt: ["$totalRedemptions.total", 0]
                  },
                  averageRedemptions: {
                    $arrayElemAt: ["$avgRedemptions.average", 0]
                  },
                  mostUsed: {
                    $arrayElemAt: ["$mostUsed", 0]
                  },
                  byDiscountType: "$byDiscountType"
                }
              }]);
            case 1:
              _yield$this$aggregate = _context15.v;
              _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
              stats = _yield$this$aggregate2[0];
              return _context15.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                active: (stats === null || stats === void 0 ? void 0 : stats.active) || 0,
                expired: (stats === null || stats === void 0 ? void 0 : stats.expired) || 0,
                "public": (stats === null || stats === void 0 ? void 0 : stats["public"]) || 0,
                totalRedemptions: (stats === null || stats === void 0 ? void 0 : stats.totalRedemptions) || 0,
                averageRedemptions: Math.round(((stats === null || stats === void 0 ? void 0 : stats.averageRedemptions) || 0) * 10) / 10,
                mostUsed: (stats === null || stats === void 0 ? void 0 : stats.mostUsed) || null,
                byDiscountType: (stats === null || stats === void 0 ? void 0 : stats.byDiscountType) || []
              });
            case 2:
              _context15.p = 2;
              _t15 = _context15.v;
              throw new Error("Get statistics by event failed: ".concat(_t15.message));
            case 3:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 2]]);
      }));
      function getStatisticsByEvent(_x14) {
        return _getStatisticsByEvent.apply(this, arguments);
      }
      return getStatisticsByEvent;
    }()
    /**
     * Get overall coupon statistics
     * @returns {Promise<Object>} - Overall statistics
     */
    )
  }, {
    key: "getOverallStatistics",
    value: (function () {
      var _getOverallStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var _yield$this$aggregate3, _yield$this$aggregate4, stats, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.aggregate([{
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _voteConstants.COUPON_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  expired: [{
                    $match: {
                      status: _voteConstants.COUPON_STATUS.EXPIRED
                    }
                  }, {
                    $count: "count"
                  }],
                  totalRedemptions: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$current_redemptions"
                      }
                    }
                  }],
                  avgRedemptions: [{
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$current_redemptions"
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
                  expired: {
                    $arrayElemAt: ["$expired.count", 0]
                  },
                  totalRedemptions: {
                    $arrayElemAt: ["$totalRedemptions.total", 0]
                  },
                  averageRedemptions: {
                    $arrayElemAt: ["$avgRedemptions.average", 0]
                  }
                }
              }]);
            case 1:
              _yield$this$aggregate3 = _context16.v;
              _yield$this$aggregate4 = _slicedToArray(_yield$this$aggregate3, 1);
              stats = _yield$this$aggregate4[0];
              return _context16.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                active: (stats === null || stats === void 0 ? void 0 : stats.active) || 0,
                expired: (stats === null || stats === void 0 ? void 0 : stats.expired) || 0,
                totalRedemptions: (stats === null || stats === void 0 ? void 0 : stats.totalRedemptions) || 0,
                averageRedemptions: Math.round(((stats === null || stats === void 0 ? void 0 : stats.averageRedemptions) || 0) * 10) / 10
              });
            case 2:
              _context16.p = 2;
              _t16 = _context16.v;
              throw new Error("Get overall statistics failed: ".concat(_t16.message));
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 2]]);
      }));
      function getOverallStatistics() {
        return _getOverallStatistics.apply(this, arguments);
      }
      return getOverallStatistics;
    }()
    /**
     * Get coupon performance (redemption rate)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Array>} - Coupon performance data
     */
    )
  }, {
    key: "getCouponPerformance",
    value: (function () {
      var _getCouponPerformance = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(eventId) {
        var performance, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.aggregate([{
                $match: {
                  event: eventId
                }
              }, {
                $project: {
                  code: 1,
                  discount_type: 1,
                  discount_value: 1,
                  current_redemptions: 1,
                  max_total_uses: 1,
                  redemptionRate: {
                    $cond: {
                      "if": {
                        $eq: ["$max_total_uses", null]
                      },
                      then: null,
                      "else": {
                        $multiply: [{
                          $divide: ["$current_redemptions", "$max_total_uses"]
                        }, 100]
                      }
                    }
                  }
                }
              }, {
                $sort: {
                  current_redemptions: -1
                }
              }]);
            case 1:
              performance = _context17.v;
              return _context17.a(2, performance);
            case 2:
              _context17.p = 2;
              _t17 = _context17.v;
              throw new Error("Get coupon performance failed: ".concat(_t17.message));
            case 3:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 2]]);
      }));
      function getCouponPerformance(_x15) {
        return _getCouponPerformance.apply(this, arguments);
      }
      return getCouponPerformance;
    }()
    /**
     * Auto-expire coupons that have passed their validity or reached max uses
     * @returns {Promise<number>} - Number of coupons expired
     */
    )
  }, {
    key: "autoExpireCoupons",
    value: (function () {
      var _autoExpireCoupons = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        var now, result, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              now = new Date();
              _context18.n = 1;
              return this.model.updateMany({
                status: _voteConstants.COUPON_STATUS.ACTIVE,
                $or: [{
                  validity_end: {
                    $lt: now
                  }
                }, {
                  $expr: {
                    $gte: ["$current_redemptions", "$max_total_uses"]
                  }
                }]
              }, {
                $set: {
                  status: _voteConstants.COUPON_STATUS.EXPIRED
                }
              });
            case 1:
              result = _context18.v;
              return _context18.a(2, result.modifiedCount);
            case 2:
              _context18.p = 2;
              _t18 = _context18.v;
              throw new Error("Auto-expire coupons failed: ".concat(_t18.message));
            case 3:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 2]]);
      }));
      function autoExpireCoupons() {
        return _autoExpireCoupons.apply(this, arguments);
      }
      return autoExpireCoupons;
    }()
    /**
     * Create a new coupon
     * @param {Object} couponData - Coupon data
     * @param {Object} [options] - Options
     * @returns {Promise<Object>} - Created coupon
     */
    )
  }, {
    key: "createCoupon",
    value: (function () {
      var _createCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(couponData) {
        var options,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              options = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : {};
              _context19.p = 1;
              _context19.n = 2;
              return this.create(couponData, options);
            case 2:
              return _context19.a(2, _context19.v);
            case 3:
              _context19.p = 3;
              _t19 = _context19.v;
              throw new Error("Create coupon failed: ".concat(_t19.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function createCoupon(_x16) {
        return _createCoupon.apply(this, arguments);
      }
      return createCoupon;
    }()
    /**
     * Update a coupon
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
     * @param {Object} updateData - Data to update
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Updated coupon
     */
    )
  }, {
    key: "updateCoupon",
    value: (function () {
      var _updateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(couponId, updateData) {
        var options,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              options = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : {};
              _context20.p = 1;
              _context20.n = 2;
              return this.updateById(couponId, updateData, options);
            case 2:
              return _context20.a(2, _context20.v);
            case 3:
              _context20.p = 3;
              _t20 = _context20.v;
              throw new Error("Update coupon failed: ".concat(_t20.message));
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 3]]);
      }));
      function updateCoupon(_x17, _x18) {
        return _updateCoupon.apply(this, arguments);
      }
      return updateCoupon;
    }()
    /**
     * Delete a coupon (soft delete)
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Deleted coupon
     */
    )
  }, {
    key: "deleteCoupon",
    value: (function () {
      var _deleteCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(couponId) {
        var options,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              options = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : {};
              _context21.p = 1;
              _context21.n = 2;
              return this["delete"]({
                _id: couponId
              }, options);
            case 2:
              return _context21.a(2, _context21.v);
            case 3:
              _context21.p = 3;
              _t21 = _context21.v;
              throw new Error("Delete coupon failed: ".concat(_t21.message));
            case 4:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 3]]);
      }));
      function deleteCoupon(_x19) {
        return _deleteCoupon.apply(this, arguments);
      }
      return deleteCoupon;
    }()
    /**
     * Restore a deleted coupon
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Restored coupon
     */
    )
  }, {
    key: "restoreCoupon",
    value: (function () {
      var _restoreCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(couponId) {
        var options,
          _args22 = arguments,
          _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              options = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : {};
              _context22.p = 1;
              _context22.n = 2;
              return this.restore({
                _id: couponId
              }, options);
            case 2:
              return _context22.a(2, _context22.v);
            case 3:
              _context22.p = 3;
              _t22 = _context22.v;
              throw new Error("Restore coupon failed: ".concat(_t22.message));
            case 4:
              return _context22.a(2);
          }
        }, _callee22, this, [[1, 3]]);
      }));
      function restoreCoupon(_x20) {
        return _restoreCoupon.apply(this, arguments);
      }
      return restoreCoupon;
    }()
    /**
     * Permanently delete a coupon
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
     * @param {Object} [options] - Options
     * @returns {Promise<Object|null>} - Deleted coupon
     */
    )
  }, {
    key: "permanentlyDeleteCoupon",
    value: (function () {
      var _permanentlyDeleteCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(couponId) {
        var options,
          _args23 = arguments,
          _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              options = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : {};
              _context23.p = 1;
              _context23.n = 2;
              return this.forceDelete({
                _id: couponId
              }, options);
            case 2:
              return _context23.a(2, _context23.v);
            case 3:
              _context23.p = 3;
              _t23 = _context23.v;
              throw new Error("Permanently delete coupon failed: ".concat(_t23.message));
            case 4:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 3]]);
      }));
      function permanentlyDeleteCoupon(_x21) {
        return _permanentlyDeleteCoupon.apply(this, arguments);
      }
      return permanentlyDeleteCoupon;
    }()
    /**
     * Generate a random unique coupon code
     * @param {number} [length=8] - Code length
     * @returns {Promise<string>} - Generated code
     */
    )
  }, {
    key: "generateUniqueCouponCode",
    value: (function () {
      var _generateUniqueCouponCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
        var length,
          chars,
          code,
          isUnique,
          i,
          existing,
          _args24 = arguments,
          _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              length = _args24.length > 0 && _args24[0] !== undefined ? _args24[0] : 8;
              _context24.p = 1;
              chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
              code = "";
              isUnique = false;
            case 2:
              if (isUnique) {
                _context24.n = 4;
                break;
              }
              code = "";
              for (i = 0; i < length; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
              }

              // Check if code already exists
              _context24.n = 3;
              return this.model.findOne({
                code: code
              });
            case 3:
              existing = _context24.v;
              if (!existing) {
                isUnique = true;
              }
              _context24.n = 2;
              break;
            case 4:
              return _context24.a(2, code);
            case 5:
              _context24.p = 5;
              _t24 = _context24.v;
              throw new Error("Generate unique coupon code failed: ".concat(_t24.message));
            case 6:
              return _context24.a(2);
          }
        }, _callee24, this, [[1, 5]]);
      }));
      function generateUniqueCouponCode() {
        return _generateUniqueCouponCode.apply(this, arguments);
      }
      return generateUniqueCouponCode;
    }()
    /**
     * Duplicate a coupon (useful for creating similar coupons)
     * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID to duplicate
     * @param {Object} [overrides] - Fields to override in the duplicate
     * @returns {Promise<Object>} - Created duplicate coupon
     */
    )
  }, {
    key: "duplicateCoupon",
    value: (function () {
      var _duplicateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(couponId) {
        var overrides,
          originalCoupon,
          newCode,
          couponData,
          _args25 = arguments,
          _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              overrides = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : {};
              _context25.p = 1;
              _context25.n = 2;
              return this.findById(couponId);
            case 2:
              originalCoupon = _context25.v;
              if (originalCoupon) {
                _context25.n = 3;
                break;
              }
              throw new Error("Coupon not found");
            case 3:
              _context25.n = 4;
              return this.generateUniqueCouponCode();
            case 4:
              newCode = _context25.v;
              // Remove fields that should not be duplicated
              couponData = _objectSpread({
                code: newCode,
                description: originalCoupon.description,
                event: originalCoupon.event,
                applicable_bundles: originalCoupon.applicable_bundles,
                discount_type: originalCoupon.discount_type,
                discount_value: originalCoupon.discount_value,
                max_discount_amount: originalCoupon.max_discount_amount,
                min_purchase_amount: originalCoupon.min_purchase_amount,
                status: _voteConstants.COUPON_STATUS.ACTIVE,
                max_total_uses: originalCoupon.max_total_uses,
                max_uses_per_user: originalCoupon.max_uses_per_user,
                current_redemptions: 0,
                // Reset redemptions
                validity_start: originalCoupon.validity_start,
                validity_end: originalCoupon.validity_end,
                is_public: originalCoupon.is_public,
                terms_and_conditions: originalCoupon.terms_and_conditions
              }, overrides);
              _context25.n = 5;
              return this.create(couponData);
            case 5:
              return _context25.a(2, _context25.v);
            case 6:
              _context25.p = 6;
              _t25 = _context25.v;
              throw new Error("Duplicate coupon failed: ".concat(_t25.message));
            case 7:
              return _context25.a(2);
          }
        }, _callee25, this, [[1, 6]]);
      }));
      function duplicateCoupon(_x22) {
        return _duplicateCoupon.apply(this, arguments);
      }
      return duplicateCoupon;
    }()
    /**
     * Bulk create coupons (useful for generating multiple codes at once)
     * @param {Object} templateData - Template data for all coupons
     * @param {number} count - Number of coupons to create
     * @param {string} [codePrefix] - Optional prefix for codes
     * @returns {Promise<Array>} - Array of created coupons
     */
    )
  }, {
    key: "bulkCreateCoupons",
    value: (function () {
      var _bulkCreateCoupons = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(templateData, count) {
        var codePrefix,
          coupons,
          i,
          code,
          couponData,
          coupon,
          _args26 = arguments,
          _t26,
          _t27,
          _t28;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              codePrefix = _args26.length > 2 && _args26[2] !== undefined ? _args26[2] : "";
              _context26.p = 1;
              coupons = [];
              i = 0;
            case 2:
              if (!(i < count)) {
                _context26.n = 6;
                break;
              }
              _t26 = codePrefix;
              _context26.n = 3;
              return this.generateUniqueCouponCode();
            case 3:
              _t27 = _context26.v;
              code = _t26 + _t27;
              couponData = _objectSpread(_objectSpread({}, templateData), {}, {
                code: code,
                current_redemptions: 0
              });
              _context26.n = 4;
              return this.create(couponData);
            case 4:
              coupon = _context26.v;
              coupons.push(coupon);
            case 5:
              i++;
              _context26.n = 2;
              break;
            case 6:
              return _context26.a(2, coupons);
            case 7:
              _context26.p = 7;
              _t28 = _context26.v;
              throw new Error("Bulk create coupons failed: ".concat(_t28.message));
            case 8:
              return _context26.a(2);
          }
        }, _callee26, this, [[1, 7]]);
      }));
      function bulkCreateCoupons(_x23, _x24) {
        return _bulkCreateCoupons.apply(this, arguments);
      }
      return bulkCreateCoupons;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new CouponRepository();