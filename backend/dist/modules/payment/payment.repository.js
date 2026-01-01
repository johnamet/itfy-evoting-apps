"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _paymentModel = _interopRequireDefault(require("./payment.model.js"));
var _paymentConstants = require("../../utils/constants/payment.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Payment Repository
 * This file defines the PaymentRepository class which extends the BaseRepository
 * It contains payment-specific data access methods
 */
var PaymentRepository = /*#__PURE__*/function (_BaseRepository) {
  function PaymentRepository() {
    _classCallCheck(this, PaymentRepository);
    return _callSuper(this, PaymentRepository, [_paymentModel["default"]]);
  }

  /**
   * Create a new payment
   * @param {Object} paymentData - Payment data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created payment
   */
  _inherits(PaymentRepository, _BaseRepository);
  return _createClass(PaymentRepository, [{
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(paymentData) {
        var options,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              if (paymentData.bundles) {
                _context.n = 2;
                break;
              }
              throw new Error("Bundle ID is required");
            case 2:
              if (paymentData.event) {
                _context.n = 3;
                break;
              }
              throw new Error("Event ID is required");
            case 3:
              if (paymentData.voter_email) {
                _context.n = 4;
                break;
              }
              throw new Error("Voter email is required");
            case 4:
              if (!(!paymentData.amount_paid || paymentData.amount_paid <= 0)) {
                _context.n = 5;
                break;
              }
              throw new Error("Valid payment amount is required");
            case 5:
              if (!(!paymentData.votes_purchased || paymentData.votes_purchased <= 0)) {
                _context.n = 6;
                break;
              }
              throw new Error("Valid votes purchased count is required");
            case 6:
              _context.n = 7;
              return _superPropGet(PaymentRepository, "create", this, 3)([paymentData, options]);
            case 7:
              return _context.a(2, _context.v);
            case 8:
              _context.p = 8;
              _t = _context.v;
              throw new Error("Create payment failed: ".concat(_t.message));
            case 9:
              return _context.a(2);
          }
        }, _callee, this, [[1, 8]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Update a payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {Object} updates - Update data
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "updatePaymentById",
    value: (function () {
      var _updatePaymentById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(paymentId, updates) {
        var options,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.updateById(paymentId, updates, options);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Update payment failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function updatePaymentById(_x2, _x3) {
        return _updatePaymentById.apply(this, arguments);
      }
      return updatePaymentById;
    }()
    /**
     * Soft delete a payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Deleted payment
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(paymentId) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return _superPropGet(PaymentRepository, "delete", this, 3)([{
                _id: paymentId
              }, options]);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Delete payment failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Restore a soft-deleted payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Restored payment
     */
    )
  }, {
    key: "restore",
    value: (function () {
      var _restore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(paymentId) {
        var options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              _context4.n = 2;
              return _superPropGet(PaymentRepository, "restore", this, 3)([{
                _id: paymentId
              }, options]);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Restore payment failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function restore(_x5) {
        return _restore.apply(this, arguments);
      }
      return restore;
    }()
    /**
     * Permanently delete a payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Force deleted payment
     */
    )
  }, {
    key: "forceDelete",
    value: (function () {
      var _forceDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(paymentId) {
        var options,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              _context5.n = 2;
              return _superPropGet(PaymentRepository, "forceDelete", this, 3)([{
                _id: paymentId
              }, options]);
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Force delete payment failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function forceDelete(_x6) {
        return _forceDelete.apply(this, arguments);
      }
      return forceDelete;
    }()
    /**
     * Find payment by vote code
     * @param {string} voteCode - Vote code
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Payment or null
     */
    )
  }, {
    key: "findByVoteCode",
    value: (function () {
      var _findByVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(voteCode) {
        var options,
          query,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.p = 1;
              query = this.model.findOne({
                vote_code: voteCode.toUpperCase()
              });
              this._applyOptions(query, options);
              _context6.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find payment by vote code failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findByVoteCode(_x7) {
        return _findByVoteCode.apply(this, arguments);
      }
      return findByVoteCode;
    }()
    /**
     * Find payment by transaction reference
     * @param {string} transactionReference - Transaction reference
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Payment or null
     */
    )
  }, {
    key: "findByTransactionReference",
    value: (function () {
      var _findByTransactionReference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(transactionReference) {
        var options,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              _context7.p = 1;
              query = this.model.findOne({
                transaction_reference: transactionReference
              });
              this._applyOptions(query, options);
              _context7.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find payment by transaction reference failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findByTransactionReference(_x8) {
        return _findByTransactionReference.apply(this, arguments);
      }
      return findByTransactionReference;
    }()
    /**
     * Find payment by Paystack reference
     * @param {string} paystackReference - Paystack reference
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Payment or null
     */
    )
  }, {
    key: "findByPaystackReference",
    value: (function () {
      var _findByPaystackReference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(paystackReference) {
        var options,
          query,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              _context8.p = 1;
              query = this.model.findOne({
                paystack_reference: paystackReference
              });
              this._applyOptions(query, options);
              _context8.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Find payment by paystack reference failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findByPaystackReference(_x9) {
        return _findByPaystackReference.apply(this, arguments);
      }
      return findByPaystackReference;
    }()
    /**
     * Find payment by Paystack access code
     * @param {string} accessCode - Paystack access code
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Payment or null
     */
    )
  }, {
    key: "findByAccessCode",
    value: (function () {
      var _findByAccessCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(accessCode) {
        var options,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              query = this.model.findOne({
                paystack_access_code: accessCode
              });
              this._applyOptions(query, options);
              _context9.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Find payment by access code failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findByAccessCode(_x0) {
        return _findByAccessCode.apply(this, arguments);
      }
      return findByAccessCode;
    }()
    /**
     * Find all payments for a specific event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(eventId) {
        var page,
          limit,
          options,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              page = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : 1;
              limit = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : 20;
              options = _args0.length > 3 && _args0[3] !== undefined ? _args0[3] : {};
              _context0.p = 1;
              _context0.n = 2;
              return this.findAll({
                event: eventId
              }, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Find payments by event failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function findByEvent(_x1) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Find all payments by email
     * @param {string} email - Voter email
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "findByEmail",
    value: (function () {
      var _findByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(email) {
        var eventId,
          page,
          limit,
          options,
          filter,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              eventId = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : null;
              page = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : 1;
              limit = _args1.length > 3 && _args1[3] !== undefined ? _args1[3] : 20;
              options = _args1.length > 4 && _args1[4] !== undefined ? _args1[4] : {};
              _context1.p = 1;
              filter = {
                voter_email: email.toLowerCase()
              };
              if (eventId) filter.event = eventId;
              _context1.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find payments by email failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findByEmail(_x10) {
        return _findByEmail.apply(this, arguments);
      }
      return findByEmail;
    }()
    /**
     * Find payments by bundle
     * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "findByBundle",
    value: (function () {
      var _findByBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(bundleId) {
        var page,
          limit,
          options,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              page = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 1;
              limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 20;
              options = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.findAll({
                bundle: bundleId
              }, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find payments by bundle failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findByBundle(_x11) {
        return _findByBundle.apply(this, arguments);
      }
      return findByBundle;
    }()
    /**
     * Find payments by status
     * @param {string} status - Payment status
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(status) {
        var eventId,
          page,
          limit,
          options,
          filter,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              eventId = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : null;
              page = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 1;
              limit = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : 20;
              options = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : {};
              _context11.p = 1;
              if (Object.values(_paymentConstants.STATUS).includes(status)) {
                _context11.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              filter = {
                payment_status: status
              };
              if (eventId) filter.event = eventId;
              _context11.n = 3;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 3:
              return _context11.a(2, _context11.v);
            case 4:
              _context11.p = 4;
              _t11 = _context11.v;
              throw new Error("Find payments by status failed: ".concat(_t11.message));
            case 5:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 4]]);
      }));
      function findByStatus(_x12) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Find pending payments
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated pending payments
     */
    )
  }, {
    key: "findPending",
    value: (function () {
      var _findPending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var eventId,
          page,
          limit,
          options,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              eventId = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : null;
              page = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 1;
              limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 20;
              options = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.findByStatus(_paymentConstants.STATUS.PENDING, eventId, page, limit, options);
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Find pending payments failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function findPending() {
        return _findPending.apply(this, arguments);
      }
      return findPending;
    }()
    /**
     * Find completed payments
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated completed payments
     */
    )
  }, {
    key: "findCompleted",
    value: (function () {
      var _findCompleted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var eventId,
          page,
          limit,
          options,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              eventId = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : null;
              page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
              limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 20;
              options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
              _context13.p = 1;
              _context13.n = 2;
              return this.findByStatus(_paymentConstants.STATUS.COMPLETED, eventId, page, limit, _objectSpread({
                sort: {
                  confirmed_at: -1
                }
              }, options));
            case 2:
              return _context13.a(2, _context13.v);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Find completed payments failed: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function findCompleted() {
        return _findCompleted.apply(this, arguments);
      }
      return findCompleted;
    }()
    /**
     * Find failed payments
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated failed payments
     */
    )
  }, {
    key: "findFailed",
    value: (function () {
      var _findFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var eventId,
          page,
          limit,
          options,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              eventId = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;
              page = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 1;
              limit = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 20;
              options = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
              _context14.p = 1;
              _context14.n = 2;
              return this.findByStatus(_paymentConstants.STATUS.FAILED, eventId, page, limit, _objectSpread({
                sort: {
                  failed_at: -1
                }
              }, options));
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Find failed payments failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function findFailed() {
        return _findFailed.apply(this, arguments);
      }
      return findFailed;
    }()
    /**
     * Find refunded payments
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated refunded payments
     */
    )
  }, {
    key: "findRefunded",
    value: (function () {
      var _findRefunded = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var eventId,
          page,
          limit,
          options,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              eventId = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : null;
              page = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 1;
              limit = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : 20;
              options = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
              _context15.p = 1;
              _context15.n = 2;
              return this.findByStatus(_paymentConstants.STATUS.REFUNDED, eventId, page, limit, _objectSpread({
                sort: {
                  refunded_at: -1
                }
              }, options));
            case 2:
              return _context15.a(2, _context15.v);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw new Error("Find refunded payments failed: ".concat(_t15.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 3]]);
      }));
      function findRefunded() {
        return _findRefunded.apply(this, arguments);
      }
      return findRefunded;
    }()
    /**
     * Find payments with unused votes
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments with unused votes
     */
    )
  }, {
    key: "findWithUnusedVotes",
    value: (function () {
      var _findWithUnusedVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var eventId,
          page,
          limit,
          options,
          filter,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              eventId = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : null;
              page = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 1;
              limit = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : 20;
              options = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
              _context16.p = 1;
              filter = {
                payment_status: _paymentConstants.STATUS.COMPLETED,
                $expr: {
                  $gt: ["$votes_remaining", 0]
                }
              };
              if (eventId) filter.event = eventId;
              _context16.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  votes_remaining: -1
                }
              }, options));
            case 2:
              return _context16.a(2, _context16.v);
            case 3:
              _context16.p = 3;
              _t16 = _context16.v;
              throw new Error("Find payments with unused votes failed: ".concat(_t16.message));
            case 4:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 3]]);
      }));
      function findWithUnusedVotes() {
        return _findWithUnusedVotes.apply(this, arguments);
      }
      return findWithUnusedVotes;
    }()
    /**
     * Find payments without webhooks
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments without webhooks
     */
    )
  }, {
    key: "findWithoutWebhook",
    value: (function () {
      var _findWithoutWebhook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var eventId,
          page,
          limit,
          options,
          filter,
          _args17 = arguments,
          _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              eventId = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : null;
              page = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 1;
              limit = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : 20;
              options = _args17.length > 3 && _args17[3] !== undefined ? _args17[3] : {};
              _context17.p = 1;
              filter = {
                payment_status: _paymentConstants.STATUS.COMPLETED,
                webhook_received: false
              };
              if (eventId) filter.event = eventId;
              _context17.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: 1
                }
              }, options));
            case 2:
              return _context17.a(2, _context17.v);
            case 3:
              _context17.p = 3;
              _t17 = _context17.v;
              throw new Error("Find payments without webhook failed: ".concat(_t17.message));
            case 4:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function findWithoutWebhook() {
        return _findWithoutWebhook.apply(this, arguments);
      }
      return findWithoutWebhook;
    }()
    /**
     * Find payments by payment method
     * @param {string} paymentMethod - Payment method
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "findByPaymentMethod",
    value: (function () {
      var _findByPaymentMethod = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(paymentMethod) {
        var eventId,
          page,
          limit,
          options,
          filter,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              eventId = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : null;
              page = _args18.length > 2 && _args18[2] !== undefined ? _args18[2] : 1;
              limit = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : 20;
              options = _args18.length > 4 && _args18[4] !== undefined ? _args18[4] : {};
              _context18.p = 1;
              if (Object.values(_paymentConstants.PAYMENT_METHOD).includes(paymentMethod)) {
                _context18.n = 2;
                break;
              }
              throw new Error("Invalid payment method: ".concat(paymentMethod));
            case 2:
              filter = {
                payment_method: paymentMethod
              };
              if (eventId) filter.event = eventId;
              _context18.n = 3;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 3:
              return _context18.a(2, _context18.v);
            case 4:
              _context18.p = 4;
              _t18 = _context18.v;
              throw new Error("Find payments by method failed: ".concat(_t18.message));
            case 5:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 4]]);
      }));
      function findByPaymentMethod(_x13) {
        return _findByPaymentMethod.apply(this, arguments);
      }
      return findByPaymentMethod;
    }()
    /**
     * Find payments by date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated payments
     */
    )
  }, {
    key: "findByDateRange",
    value: (function () {
      var _findByDateRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(startDate, endDate) {
        var eventId,
          page,
          limit,
          options,
          filter,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              eventId = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : null;
              page = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : 1;
              limit = _args19.length > 4 && _args19[4] !== undefined ? _args19[4] : 20;
              options = _args19.length > 5 && _args19[5] !== undefined ? _args19[5] : {};
              _context19.p = 1;
              filter = {
                created_at: {
                  $gte: startDate,
                  $lte: endDate
                }
              };
              if (eventId) filter.event = eventId;
              _context19.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context19.a(2, _context19.v);
            case 3:
              _context19.p = 3;
              _t19 = _context19.v;
              throw new Error("Find payments by date range failed: ".concat(_t19.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function findByDateRange(_x14, _x15) {
        return _findByDateRange.apply(this, arguments);
      }
      return findByDateRange;
    }()
    /**
     * Get payment statistics for an event
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @returns {Promise<Object>} - Payment statistics
     */
    )
  }, {
    key: "getStatistics",
    value: (function () {
      var _getStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
        var eventId,
          _stats$total$,
          _stats$completed$,
          _stats$pending$,
          _stats$failed$,
          _stats$refunded$,
          _stats$totalRevenue$,
          _stats$totalRefunded$,
          _stats$totalDiscounts,
          _stats$totalRevenue$2,
          _stats$totalRefunded$2,
          _stats$totalVotesPurc,
          _stats$totalVotesCast,
          _stats$totalVotesPurc2,
          _stats$totalVotesCast2,
          _stats$avgAmount$,
          _stats$uniqueVoters$,
          _stats$withUnusedVote,
          matchStage,
          _yield$this$model$agg,
          _yield$this$model$agg2,
          stats,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              eventId = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : null;
              _context20.p = 1;
              matchStage = eventId ? {
                event: eventId
              } : {};
              _context20.n = 2;
              return this.model.aggregate([{
                $match: matchStage
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  completed: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $count: "count"
                  }],
                  pending: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.PENDING
                    }
                  }, {
                    $count: "count"
                  }],
                  failed: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.FAILED
                    }
                  }, {
                    $count: "count"
                  }],
                  refunded: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.REFUNDED
                    }
                  }, {
                    $count: "count"
                  }],
                  totalRevenue: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$amount_paid"
                      }
                    }
                  }],
                  totalRefunded: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.REFUNDED
                    }
                  }, {
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$refund_amount"
                      }
                    }
                  }],
                  totalDiscounts: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$discount_amount"
                      }
                    }
                  }],
                  totalVotesPurchased: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$votes_purchased"
                      }
                    }
                  }],
                  totalVotesCast: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$votes_cast"
                      }
                    }
                  }],
                  avgAmount: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$amount_paid"
                      }
                    }
                  }],
                  byPaymentMethod: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $group: {
                      _id: "$payment_method",
                      count: {
                        $sum: 1
                      },
                      total: {
                        $sum: "$amount_paid"
                      }
                    }
                  }, {
                    $sort: {
                      total: -1
                    }
                  }],
                  uniqueVoters: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED
                    }
                  }, {
                    $group: {
                      _id: "$voter_email"
                    }
                  }, {
                    $count: "count"
                  }],
                  withUnusedVotes: [{
                    $match: {
                      payment_status: _paymentConstants.STATUS.COMPLETED,
                      $expr: {
                        $gt: ["$votes_remaining", 0]
                      }
                    }
                  }, {
                    $count: "count"
                  }]
                }
              }]);
            case 2:
              _yield$this$model$agg = _context20.v;
              _yield$this$model$agg2 = _slicedToArray(_yield$this$model$agg, 1);
              stats = _yield$this$model$agg2[0];
              return _context20.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
                completed: (stats === null || stats === void 0 || (_stats$completed$ = stats.completed[0]) === null || _stats$completed$ === void 0 ? void 0 : _stats$completed$.count) || 0,
                pending: (stats === null || stats === void 0 || (_stats$pending$ = stats.pending[0]) === null || _stats$pending$ === void 0 ? void 0 : _stats$pending$.count) || 0,
                failed: (stats === null || stats === void 0 || (_stats$failed$ = stats.failed[0]) === null || _stats$failed$ === void 0 ? void 0 : _stats$failed$.count) || 0,
                refunded: (stats === null || stats === void 0 || (_stats$refunded$ = stats.refunded[0]) === null || _stats$refunded$ === void 0 ? void 0 : _stats$refunded$.count) || 0,
                totalRevenue: Math.round(((stats === null || stats === void 0 || (_stats$totalRevenue$ = stats.totalRevenue[0]) === null || _stats$totalRevenue$ === void 0 ? void 0 : _stats$totalRevenue$.total) || 0) * 100) / 100,
                totalRefunded: Math.round(((stats === null || stats === void 0 || (_stats$totalRefunded$ = stats.totalRefunded[0]) === null || _stats$totalRefunded$ === void 0 ? void 0 : _stats$totalRefunded$.total) || 0) * 100) / 100,
                totalDiscounts: Math.round(((stats === null || stats === void 0 || (_stats$totalDiscounts = stats.totalDiscounts[0]) === null || _stats$totalDiscounts === void 0 ? void 0 : _stats$totalDiscounts.total) || 0) * 100) / 100,
                netRevenue: Math.round((((stats === null || stats === void 0 || (_stats$totalRevenue$2 = stats.totalRevenue[0]) === null || _stats$totalRevenue$2 === void 0 ? void 0 : _stats$totalRevenue$2.total) || 0) - ((stats === null || stats === void 0 || (_stats$totalRefunded$2 = stats.totalRefunded[0]) === null || _stats$totalRefunded$2 === void 0 ? void 0 : _stats$totalRefunded$2.total) || 0)) * 100) / 100,
                totalVotesPurchased: (stats === null || stats === void 0 || (_stats$totalVotesPurc = stats.totalVotesPurchased[0]) === null || _stats$totalVotesPurc === void 0 ? void 0 : _stats$totalVotesPurc.total) || 0,
                totalVotesCast: (stats === null || stats === void 0 || (_stats$totalVotesCast = stats.totalVotesCast[0]) === null || _stats$totalVotesCast === void 0 ? void 0 : _stats$totalVotesCast.total) || 0,
                totalVotesRemaining: ((stats === null || stats === void 0 || (_stats$totalVotesPurc2 = stats.totalVotesPurchased[0]) === null || _stats$totalVotesPurc2 === void 0 ? void 0 : _stats$totalVotesPurc2.total) || 0) - ((stats === null || stats === void 0 || (_stats$totalVotesCast2 = stats.totalVotesCast[0]) === null || _stats$totalVotesCast2 === void 0 ? void 0 : _stats$totalVotesCast2.total) || 0),
                averageAmount: Math.round(((stats === null || stats === void 0 || (_stats$avgAmount$ = stats.avgAmount[0]) === null || _stats$avgAmount$ === void 0 ? void 0 : _stats$avgAmount$.average) || 0) * 100) / 100,
                byPaymentMethod: (stats === null || stats === void 0 ? void 0 : stats.byPaymentMethod) || [],
                uniqueVoters: (stats === null || stats === void 0 || (_stats$uniqueVoters$ = stats.uniqueVoters[0]) === null || _stats$uniqueVoters$ === void 0 ? void 0 : _stats$uniqueVoters$.count) || 0,
                paymentsWithUnusedVotes: (stats === null || stats === void 0 || (_stats$withUnusedVote = stats.withUnusedVotes[0]) === null || _stats$withUnusedVote === void 0 ? void 0 : _stats$withUnusedVote.count) || 0
              });
            case 3:
              _context20.p = 3;
              _t20 = _context20.v;
              throw new Error("Get payment statistics failed: ".concat(_t20.message));
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 3]]);
      }));
      function getStatistics() {
        return _getStatistics.apply(this, arguments);
      }
      return getStatistics;
    }()
    /**
     * Get revenue aggregated by time period
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} period - Time period ('day', 'week', 'month', 'year')
     * @returns {Promise<Array>} - Aggregated revenue data
     */
    )
  }, {
    key: "aggregateRevenueByTimePeriod",
    value: (function () {
      var _aggregateRevenueByTimePeriod = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(eventId) {
        var period,
          groupFormats,
          aggregated,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              period = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : "day";
              _context21.p = 1;
              groupFormats = {
                day: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$confirmed_at"
                  }
                },
                week: {
                  $isoWeek: "$confirmed_at"
                },
                month: {
                  $dateToString: {
                    format: "%Y-%m",
                    date: "$confirmed_at"
                  }
                },
                year: {
                  $year: "$confirmed_at"
                }
              };
              if (groupFormats[period]) {
                _context21.n = 2;
                break;
              }
              throw new Error("Invalid period: ".concat(period, ". Use: day, week, month, year"));
            case 2:
              _context21.n = 3;
              return this.model.aggregate([{
                $match: {
                  event: eventId,
                  payment_status: _paymentConstants.STATUS.COMPLETED
                }
              }, {
                $group: {
                  _id: groupFormats[period],
                  count: {
                    $sum: 1
                  },
                  revenue: {
                    $sum: "$amount_paid"
                  },
                  votesPurchased: {
                    $sum: "$votes_purchased"
                  },
                  votesCast: {
                    $sum: "$votes_cast"
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }]);
            case 3:
              aggregated = _context21.v;
              return _context21.a(2, aggregated);
            case 4:
              _context21.p = 4;
              _t21 = _context21.v;
              throw new Error("Aggregate revenue by time period failed: ".concat(_t21.message));
            case 5:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 4]]);
      }));
      function aggregateRevenueByTimePeriod(_x16) {
        return _aggregateRevenueByTimePeriod.apply(this, arguments);
      }
      return aggregateRevenueByTimePeriod;
    }()
    /**
     * Mark payment as completed
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {Object} paystackData - Paystack webhook data
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "markAsCompleted",
    value: (function () {
      var _markAsCompleted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(paymentId) {
        var paystackData,
          payment,
          _args22 = arguments,
          _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              paystackData = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : {};
              _context22.p = 1;
              _context22.n = 2;
              return this.model.findById(paymentId);
            case 2:
              payment = _context22.v;
              if (payment) {
                _context22.n = 3;
                break;
              }
              throw new Error("Payment not found");
            case 3:
              _context22.n = 4;
              return payment.markAsCompleted(paystackData);
            case 4:
              return _context22.a(2, _context22.v);
            case 5:
              _context22.p = 5;
              _t22 = _context22.v;
              throw new Error("Mark payment as completed failed: ".concat(_t22.message));
            case 6:
              return _context22.a(2);
          }
        }, _callee22, this, [[1, 5]]);
      }));
      function markAsCompleted(_x17) {
        return _markAsCompleted.apply(this, arguments);
      }
      return markAsCompleted;
    }()
    /**
     * Mark payment as failed
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {string} reason - Failure reason
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "markAsFailed",
    value: (function () {
      var _markAsFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(paymentId, reason) {
        var payment, _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _context23.n = 1;
              return this.model.findById(paymentId);
            case 1:
              payment = _context23.v;
              if (payment) {
                _context23.n = 2;
                break;
              }
              throw new Error("Payment not found");
            case 2:
              _context23.n = 3;
              return payment.markAsFailed(reason);
            case 3:
              return _context23.a(2, _context23.v);
            case 4:
              _context23.p = 4;
              _t23 = _context23.v;
              throw new Error("Mark payment as failed failed: ".concat(_t23.message));
            case 5:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 4]]);
      }));
      function markAsFailed(_x18, _x19) {
        return _markAsFailed.apply(this, arguments);
      }
      return markAsFailed;
    }()
    /**
     * Process refund for a payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {string} reason - Refund reason
     * @param {number} [amount] - Optional partial refund amount
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "processRefund",
    value: (function () {
      var _processRefund = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(paymentId, reason) {
        var amount,
          payment,
          _args24 = arguments,
          _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              amount = _args24.length > 2 && _args24[2] !== undefined ? _args24[2] : null;
              _context24.p = 1;
              _context24.n = 2;
              return this.model.findById(paymentId);
            case 2:
              payment = _context24.v;
              if (payment) {
                _context24.n = 3;
                break;
              }
              throw new Error("Payment not found");
            case 3:
              _context24.n = 4;
              return payment.processRefund(reason, amount);
            case 4:
              return _context24.a(2, _context24.v);
            case 5:
              _context24.p = 5;
              _t24 = _context24.v;
              throw new Error("Process refund failed: ".concat(_t24.message));
            case 6:
              return _context24.a(2);
          }
        }, _callee24, this, [[1, 5]]);
      }));
      function processRefund(_x20, _x21) {
        return _processRefund.apply(this, arguments);
      }
      return processRefund;
    }()
    /**
     * Increment votes cast for a payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {number} [count=1] - Number of votes to increment
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "incrementVotesCast",
    value: (function () {
      var _incrementVotesCast = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(paymentId) {
        var count,
          payment,
          _args25 = arguments,
          _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              count = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : 1;
              _context25.p = 1;
              _context25.n = 2;
              return this.model.findById(paymentId);
            case 2:
              payment = _context25.v;
              if (payment) {
                _context25.n = 3;
                break;
              }
              throw new Error("Payment not found");
            case 3:
              _context25.n = 4;
              return payment.incrementVotesCast(count);
            case 4:
              return _context25.a(2, _context25.v);
            case 5:
              _context25.p = 5;
              _t25 = _context25.v;
              throw new Error("Increment votes cast failed: ".concat(_t25.message));
            case 6:
              return _context25.a(2);
          }
        }, _callee25, this, [[1, 5]]);
      }));
      function incrementVotesCast(_x22) {
        return _incrementVotesCast.apply(this, arguments);
      }
      return incrementVotesCast;
    }()
    /**
     * Record webhook attempt
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @returns {Promise<Object>} - Updated payment
     */
    )
  }, {
    key: "recordWebhook",
    value: (function () {
      var _recordWebhook = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(paymentId) {
        var payment, _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              _context26.p = 0;
              _context26.n = 1;
              return this.model.findById(paymentId);
            case 1:
              payment = _context26.v;
              if (payment) {
                _context26.n = 2;
                break;
              }
              throw new Error("Payment not found");
            case 2:
              _context26.n = 3;
              return payment.recordWebhook();
            case 3:
              return _context26.a(2, _context26.v);
            case 4:
              _context26.p = 4;
              _t26 = _context26.v;
              throw new Error("Record webhook failed: ".concat(_t26.message));
            case 5:
              return _context26.a(2);
          }
        }, _callee26, this, [[0, 4]]);
      }));
      function recordWebhook(_x23) {
        return _recordWebhook.apply(this, arguments);
      }
      return recordWebhook;
    }()
    /**
     * Find stale pending payments (pending for more than specified hours)
     * @param {number} [hoursThreshold=24] - Hours threshold
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated stale pending payments
     */
    )
  }, {
    key: "findStalePending",
    value: (function () {
      var _findStalePending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
        var hoursThreshold,
          eventId,
          page,
          limit,
          options,
          cutoffDate,
          filter,
          _args27 = arguments,
          _t27;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              hoursThreshold = _args27.length > 0 && _args27[0] !== undefined ? _args27[0] : 24;
              eventId = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : null;
              page = _args27.length > 2 && _args27[2] !== undefined ? _args27[2] : 1;
              limit = _args27.length > 3 && _args27[3] !== undefined ? _args27[3] : 20;
              options = _args27.length > 4 && _args27[4] !== undefined ? _args27[4] : {};
              _context27.p = 1;
              cutoffDate = new Date();
              cutoffDate.setHours(cutoffDate.getHours() - hoursThreshold);
              filter = {
                payment_status: _paymentConstants.STATUS.PENDING,
                created_at: {
                  $lt: cutoffDate
                }
              };
              if (eventId) filter.event = eventId;
              _context27.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: 1
                }
              }, options));
            case 2:
              return _context27.a(2, _context27.v);
            case 3:
              _context27.p = 3;
              _t27 = _context27.v;
              throw new Error("Find stale pending payments failed: ".concat(_t27.message));
            case 4:
              return _context27.a(2);
          }
        }, _callee27, this, [[1, 3]]);
      }));
      function findStalePending() {
        return _findStalePending.apply(this, arguments);
      }
      return findStalePending;
    }()
    /**
     * Bulk update payment status
     * @param {Array<string|mongoose.Types.ObjectId>} paymentIds - Payment IDs
     * @param {string} status - New status
     * @returns {Promise<Object>} - Bulk update result
     */
    )
  }, {
    key: "bulkUpdateStatus",
    value: (function () {
      var _bulkUpdateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(paymentIds, status) {
        var result, _t28;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              if (Object.values(_paymentConstants.STATUS).includes(status)) {
                _context28.n = 1;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 1:
              _context28.n = 2;
              return this.model.updateMany({
                _id: {
                  $in: paymentIds
                }
              }, {
                $set: {
                  payment_status: status
                }
              });
            case 2:
              result = _context28.v;
              return _context28.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 3:
              _context28.p = 3;
              _t28 = _context28.v;
              throw new Error("Bulk update payment status failed: ".concat(_t28.message));
            case 4:
              return _context28.a(2);
          }
        }, _callee28, this, [[0, 3]]);
      }));
      function bulkUpdateStatus(_x24, _x25) {
        return _bulkUpdateStatus.apply(this, arguments);
      }
      return bulkUpdateStatus;
    }()
    /**
     * Export payments for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [filters] - Optional filters
     * @returns {Promise<Array>} - Payments data for export
     */
    )
  }, {
    key: "exportPayments",
    value: (function () {
      var _exportPayments = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(eventId) {
        var filters,
          query,
          payments,
          _args29 = arguments,
          _t29;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              filters = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : {};
              _context29.p = 1;
              query = _objectSpread({
                event: eventId
              }, filters);
              _context29.n = 2;
              return this.model.find(query).populate("bundle", "name vote_count price").populate("coupon", "code discount_type discount_value").sort({
                created_at: -1
              }).lean().exec();
            case 2:
              payments = _context29.v;
              return _context29.a(2, payments.map(function (payment) {
                var _payment$bundle, _payment$coupon;
                return {
                  transaction_reference: payment.transaction_reference,
                  paystack_reference: payment.paystack_reference || "N/A",
                  vote_code: payment.vote_code,
                  voter_email: payment.voter_email,
                  voter_name: payment.voter_name || "N/A",
                  voter_phone: payment.voter_phone || "N/A",
                  bundle: ((_payment$bundle = payment.bundle) === null || _payment$bundle === void 0 ? void 0 : _payment$bundle.name) || "N/A",
                  votes_purchased: payment.votes_purchased,
                  votes_cast: payment.votes_cast,
                  votes_remaining: payment.votes_remaining,
                  original_amount: payment.original_amount,
                  discount_amount: payment.discount_amount,
                  amount_paid: payment.amount_paid,
                  currency: payment.currency,
                  payment_method: payment.payment_method,
                  payment_status: payment.payment_status,
                  coupon_used: ((_payment$coupon = payment.coupon) === null || _payment$coupon === void 0 ? void 0 : _payment$coupon.code) || "N/A",
                  created_at: payment.created_at,
                  confirmed_at: payment.confirmed_at || "N/A",
                  webhook_received: payment.webhook_received
                };
              }));
            case 3:
              _context29.p = 3;
              _t29 = _context29.v;
              throw new Error("Export payments failed: ".concat(_t29.message));
            case 4:
              return _context29.a(2);
          }
        }, _callee29, this, [[1, 3]]);
      }));
      function exportPayments(_x26) {
        return _exportPayments.apply(this, arguments);
      }
      return exportPayments;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new PaymentRepository();