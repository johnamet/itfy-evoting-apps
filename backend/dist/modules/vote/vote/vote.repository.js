"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../../shared/base.repository.js");
var _voteModel = _interopRequireDefault(require("./vote.model.js"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
 * Vote Repository
 * This file defines the VoteRepository class which extends the BaseRepository
 * It contains vote-specific data access methods
 */
var VoteRepository = /*#__PURE__*/function (_BaseRepository) {
  function VoteRepository() {
    _classCallCheck(this, VoteRepository);
    return _callSuper(this, VoteRepository, [_voteModel["default"]]);
  }

  /**
   * Find all votes for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of votes
   */
  _inherits(VoteRepository, _BaseRepository);
  return _createClass(VoteRepository, [{
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
                event: eventId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Find votes by event failed: ".concat(_t.message));
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
     * Find all votes for a specific candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of votes
     */
    )
  }, {
    key: "findByCandidate",
    value: (function () {
      var _findByCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(candidateId) {
        var options,
          query,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              query = this.model.find({
                candidate: candidateId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context2.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find votes by candidate failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findByCandidate(_x2) {
        return _findByCandidate.apply(this, arguments);
      }
      return findByCandidate;
    }()
    /**
     * Find all votes for a specific category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of votes
     */
    )
  }, {
    key: "findByCategory",
    value: (function () {
      var _findByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(categoryId) {
        var options,
          query,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              query = this.model.find({
                category: categoryId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context3.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find votes by category failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findByCategory(_x3) {
        return _findByCategory.apply(this, arguments);
      }
      return findByCategory;
    }()
    /**
     * Find all votes for a specific payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of votes
     */
    )
  }, {
    key: "findByPayment",
    value: (function () {
      var _findByPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(paymentId) {
        var options,
          query,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              query = this.model.find({
                payment: paymentId
              }).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context4.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Find votes by payment failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function findByPayment(_x4) {
        return _findByPayment.apply(this, arguments);
      }
      return findByPayment;
    }()
    /**
     * Find all votes by vote code
     * @param {string} voteCode - Vote code
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of votes
     */
    )
  }, {
    key: "findByVoteCode",
    value: (function () {
      var _findByVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(voteCode) {
        var options,
          query,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              query = this.model.find({
                vote_code: voteCode.toUpperCase()
              }).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context5.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Find votes by vote code failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function findByVoteCode(_x5) {
        return _findByVoteCode.apply(this, arguments);
      }
      return findByVoteCode;
    }()
    /**
     * Count votes for a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<number>} - Vote count
     */
    )
  }, {
    key: "countForCandidate",
    value: (function () {
      var _countForCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(candidateId) {
        var _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.model.countDocuments({
                candidate: candidateId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).exec();
            case 1:
              return _context6.a(2, _context6.v);
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              throw new Error("Count votes for candidate failed: ".concat(_t6.message));
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function countForCandidate(_x6) {
        return _countForCandidate.apply(this, arguments);
      }
      return countForCandidate;
    }()
    /**
     * Count votes for a category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<number>} - Vote count
     */
    )
  }, {
    key: "countForCategory",
    value: (function () {
      var _countForCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(categoryId) {
        var _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.model.countDocuments({
                category: categoryId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).exec();
            case 1:
              return _context7.a(2, _context7.v);
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              throw new Error("Count votes for category failed: ".concat(_t7.message));
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function countForCategory(_x7) {
        return _countForCategory.apply(this, arguments);
      }
      return countForCategory;
    }()
    /**
     * Count votes for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<number>} - Vote count
     */
    )
  }, {
    key: "countForEvent",
    value: (function () {
      var _countForEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(eventId) {
        var _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.model.countDocuments({
                event: eventId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).exec();
            case 1:
              return _context8.a(2, _context8.v);
            case 2:
              _context8.p = 2;
              _t8 = _context8.v;
              throw new Error("Count votes for event failed: ".concat(_t8.message));
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function countForEvent(_x8) {
        return _countForEvent.apply(this, arguments);
      }
      return countForEvent;
    }()
    /**
     * Find refunded votes
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of refunded votes
     */
    )
  }, {
    key: "findRefunded",
    value: (function () {
      var _findRefunded = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var eventId,
          options,
          filter,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              eventId = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : null;
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              filter = {
                status: _voteConstants.VOTE_STATUS.REFUNDED
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                refunded_at: -1
              });
              this._applyOptions(query, options);
              _context9.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Find refunded votes failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findRefunded() {
        return _findRefunded.apply(this, arguments);
      }
      return findRefunded;
    }()
    /**
     * Find recent votes
     * @param {number} [limit=50] - Maximum number to return
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Recent votes
     */
    )
  }, {
    key: "findRecent",
    value: (function () {
      var _findRecent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var limit,
          eventId,
          options,
          filter,
          query,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              limit = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : 50;
              eventId = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : null;
              options = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : {};
              _context0.p = 1;
              filter = {
                status: _voteConstants.VOTE_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                cast_at: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context0.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Find recent votes failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function findRecent() {
        return _findRecent.apply(this, arguments);
      }
      return findRecent;
    }()
    /**
     * Find votes by date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Votes in date range
     */
    )
  }, {
    key: "findByDateRange",
    value: (function () {
      var _findByDateRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(startDate, endDate) {
        var eventId,
          options,
          filter,
          query,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              eventId = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : null;
              options = _args1.length > 3 && _args1[3] !== undefined ? _args1[3] : {};
              _context1.p = 1;
              filter = {
                cast_at: {
                  $gte: startDate,
                  $lte: endDate
                },
                status: _voteConstants.VOTE_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context1.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find votes by date range failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findByDateRange(_x9, _x0) {
        return _findByDateRange.apply(this, arguments);
      }
      return findByDateRange;
    }()
    /**
     * Find votes by IP hash (for fraud detection)
     * @param {string} ipHash - IP hash
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Votes from this IP
     */
    )
  }, {
    key: "findByIpHash",
    value: (function () {
      var _findByIpHash = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(ipHash) {
        var options,
          query,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              query = this.model.find({
                ip_hash: ipHash
              }).sort({
                cast_at: -1
              });
              this._applyOptions(query, options);
              _context10.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find votes by IP hash failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findByIpHash(_x1) {
        return _findByIpHash.apply(this, arguments);
      }
      return findByIpHash;
    }()
    /**
     * Get vote statistics for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Vote statistics
     */
    )
  }, {
    key: "getEventStatistics",
    value: (function () {
      var _getEventStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(eventId) {
        var _stats$total$, _stats$active$, _stats$refunded$, _yield$this$aggregate, _yield$this$aggregate2, stats, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
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
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  refunded: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.REFUNDED
                    }
                  }, {
                    $count: "count"
                  }],
                  byCandidate: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: "$candidate",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }, {
                    $limit: 10
                  }],
                  byCategory: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: "$category",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }],
                  byDate: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: "$cast_at"
                        }
                      },
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      _id: 1
                    }
                  }],
                  byHour: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: {
                        $dateToString: {
                          format: "%Y-%m-%d %H:00",
                          date: "$cast_at"
                        }
                      },
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      _id: 1
                    }
                  }]
                }
              }]);
            case 1:
              _yield$this$aggregate = _context11.v;
              _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
              stats = _yield$this$aggregate2[0];
              return _context11.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
                active: (stats === null || stats === void 0 || (_stats$active$ = stats.active[0]) === null || _stats$active$ === void 0 ? void 0 : _stats$active$.count) || 0,
                refunded: (stats === null || stats === void 0 || (_stats$refunded$ = stats.refunded[0]) === null || _stats$refunded$ === void 0 ? void 0 : _stats$refunded$.count) || 0,
                byCandidate: (stats === null || stats === void 0 ? void 0 : stats.byCandidate) || [],
                byCategory: (stats === null || stats === void 0 ? void 0 : stats.byCategory) || [],
                byDate: (stats === null || stats === void 0 ? void 0 : stats.byDate) || [],
                byHour: (stats === null || stats === void 0 ? void 0 : stats.byHour) || []
              });
            case 2:
              _context11.p = 2;
              _t11 = _context11.v;
              throw new Error("Get event statistics failed: ".concat(_t11.message));
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 2]]);
      }));
      function getEventStatistics(_x10) {
        return _getEventStatistics.apply(this, arguments);
      }
      return getEventStatistics;
    }()
    /**
     * Get vote statistics for a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Candidate vote statistics
     */
    )
  }, {
    key: "getCandidateStatistics",
    value: (function () {
      var _getCandidateStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(candidateId) {
        var _stats$total$2, _stats$active$2, _stats$refunded$2, _yield$this$aggregate3, _yield$this$aggregate4, stats, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.aggregate([{
                $match: {
                  candidate: candidateId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  refunded: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.REFUNDED
                    }
                  }, {
                    $count: "count"
                  }],
                  byDate: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: "$cast_at"
                        }
                      },
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      _id: 1
                    }
                  }],
                  recentVotes: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $sort: {
                      cast_at: -1
                    }
                  }, {
                    $limit: 10
                  }]
                }
              }]);
            case 1:
              _yield$this$aggregate3 = _context12.v;
              _yield$this$aggregate4 = _slicedToArray(_yield$this$aggregate3, 1);
              stats = _yield$this$aggregate4[0];
              return _context12.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$2 = stats.total[0]) === null || _stats$total$2 === void 0 ? void 0 : _stats$total$2.count) || 0,
                active: (stats === null || stats === void 0 || (_stats$active$2 = stats.active[0]) === null || _stats$active$2 === void 0 ? void 0 : _stats$active$2.count) || 0,
                refunded: (stats === null || stats === void 0 || (_stats$refunded$2 = stats.refunded[0]) === null || _stats$refunded$2 === void 0 ? void 0 : _stats$refunded$2.count) || 0,
                byDate: (stats === null || stats === void 0 ? void 0 : stats.byDate) || [],
                recentVotes: (stats === null || stats === void 0 ? void 0 : stats.recentVotes) || []
              });
            case 2:
              _context12.p = 2;
              _t12 = _context12.v;
              throw new Error("Get candidate statistics failed: ".concat(_t12.message));
            case 3:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 2]]);
      }));
      function getCandidateStatistics(_x11) {
        return _getCandidateStatistics.apply(this, arguments);
      }
      return getCandidateStatistics;
    }()
    /**
     * Get vote statistics for a category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Category vote statistics
     */
    )
  }, {
    key: "getCategoryStatistics",
    value: (function () {
      var _getCategoryStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(categoryId) {
        var _stats$total$3, _stats$active$3, _stats$refunded$3, _yield$this$aggregate5, _yield$this$aggregate6, stats, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.aggregate([{
                $match: {
                  category: categoryId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  refunded: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.REFUNDED
                    }
                  }, {
                    $count: "count"
                  }],
                  byCandidate: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: "$candidate",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }],
                  byDate: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $group: {
                      _id: {
                        $dateToString: {
                          format: "%Y-%m-%d",
                          date: "$cast_at"
                        }
                      },
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      _id: 1
                    }
                  }]
                }
              }]);
            case 1:
              _yield$this$aggregate5 = _context13.v;
              _yield$this$aggregate6 = _slicedToArray(_yield$this$aggregate5, 1);
              stats = _yield$this$aggregate6[0];
              return _context13.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$3 = stats.total[0]) === null || _stats$total$3 === void 0 ? void 0 : _stats$total$3.count) || 0,
                active: (stats === null || stats === void 0 || (_stats$active$3 = stats.active[0]) === null || _stats$active$3 === void 0 ? void 0 : _stats$active$3.count) || 0,
                refunded: (stats === null || stats === void 0 || (_stats$refunded$3 = stats.refunded[0]) === null || _stats$refunded$3 === void 0 ? void 0 : _stats$refunded$3.count) || 0,
                byCandidate: (stats === null || stats === void 0 ? void 0 : stats.byCandidate) || [],
                byDate: (stats === null || stats === void 0 ? void 0 : stats.byDate) || []
              });
            case 2:
              _context13.p = 2;
              _t13 = _context13.v;
              throw new Error("Get category statistics failed: ".concat(_t13.message));
            case 3:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 2]]);
      }));
      function getCategoryStatistics(_x12) {
        return _getCategoryStatistics.apply(this, arguments);
      }
      return getCategoryStatistics;
    }()
    /**
     * Refund a vote
     * @param {string|mongoose.Types.ObjectId} voteId - Vote ID
     * @param {string} reason - Refund reason
     * @returns {Promise<Object>} - Refunded vote
     */
    )
  }, {
    key: "refund",
    value: (function () {
      var _refund = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(voteId, reason) {
        var vote, _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _context14.n = 1;
              return this.model.findById(voteId);
            case 1:
              vote = _context14.v;
              if (vote) {
                _context14.n = 2;
                break;
              }
              throw new Error("Vote not found");
            case 2:
              _context14.n = 3;
              return vote.refund(reason);
            case 3:
              return _context14.a(2, _context14.v);
            case 4:
              _context14.p = 4;
              _t14 = _context14.v;
              throw new Error("Refund vote failed: ".concat(_t14.message));
            case 5:
              return _context14.a(2);
          }
        }, _callee14, this, [[0, 4]]);
      }));
      function refund(_x13, _x14) {
        return _refund.apply(this, arguments);
      }
      return refund;
    }()
    /**
     * Bulk refund votes by payment
     * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
     * @param {string} reason - Refund reason
     * @returns {Promise<Array>} - Refunded votes
     */
    )
  }, {
    key: "bulkRefundByPayment",
    value: (function () {
      var _bulkRefundByPayment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(paymentId, reason) {
        var votes, refundedVotes, _iterator, _step, vote, refunded, _t15, _t16;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this.model.find({
                payment: paymentId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              });
            case 1:
              votes = _context15.v;
              refundedVotes = [];
              _iterator = _createForOfIteratorHelper(votes);
              _context15.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context15.n = 6;
                break;
              }
              vote = _step.value;
              _context15.n = 4;
              return vote.refund(reason);
            case 4:
              refunded = _context15.v;
              refundedVotes.push(refunded);
            case 5:
              _context15.n = 3;
              break;
            case 6:
              _context15.n = 8;
              break;
            case 7:
              _context15.p = 7;
              _t15 = _context15.v;
              _iterator.e(_t15);
            case 8:
              _context15.p = 8;
              _iterator.f();
              return _context15.f(8);
            case 9:
              return _context15.a(2, refundedVotes);
            case 10:
              _context15.p = 10;
              _t16 = _context15.v;
              throw new Error("Bulk refund by payment failed: ".concat(_t16.message));
            case 11:
              return _context15.a(2);
          }
        }, _callee15, this, [[2, 7, 8, 9], [0, 10]]);
      }));
      function bulkRefundByPayment(_x15, _x16) {
        return _bulkRefundByPayment.apply(this, arguments);
      }
      return bulkRefundByPayment;
    }()
    /**
     * Get voting trends (votes per day/hour)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} [period='day'] - 'day' or 'hour'
     * @returns {Promise<Array>} - Voting trends
     */
    )
  }, {
    key: "getVotingTrends",
    value: (function () {
      var _getVotingTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(eventId) {
        var period,
          dateFormat,
          trends,
          _args16 = arguments,
          _t17;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              period = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : "day";
              _context16.p = 1;
              dateFormat = period === "hour" ? "%Y-%m-%d %H:00" : "%Y-%m-%d";
              _context16.n = 2;
              return this.aggregate([{
                $match: {
                  event: eventId,
                  status: _voteConstants.VOTE_STATUS.ACTIVE
                }
              }, {
                $group: {
                  _id: {
                    $dateToString: {
                      format: dateFormat,
                      date: "$cast_at"
                    }
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }]);
            case 2:
              trends = _context16.v;
              return _context16.a(2, trends);
            case 3:
              _context16.p = 3;
              _t17 = _context16.v;
              throw new Error("Get voting trends failed: ".concat(_t17.message));
            case 4:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 3]]);
      }));
      function getVotingTrends(_x17) {
        return _getVotingTrends.apply(this, arguments);
      }
      return getVotingTrends;
    }()
    /**
     * Get top candidates by votes in event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [limit=10] - Maximum number to return
     * @returns {Promise<Array>} - Top candidates
     */
    )
  }, {
    key: "getTopCandidates",
    value: (function () {
      var _getTopCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(eventId) {
        var limit,
          topCandidates,
          _args17 = arguments,
          _t18;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              limit = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 10;
              _context17.p = 1;
              _context17.n = 2;
              return this.aggregate([{
                $match: {
                  event: eventId,
                  status: _voteConstants.VOTE_STATUS.ACTIVE
                }
              }, {
                $group: {
                  _id: "$candidate",
                  voteCount: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  voteCount: -1
                }
              }, {
                $limit: limit
              }, {
                $lookup: {
                  from: "candidates",
                  localField: "_id",
                  foreignField: "_id",
                  as: "candidate"
                }
              }, {
                $unwind: "$candidate"
              }]);
            case 2:
              topCandidates = _context17.v;
              return _context17.a(2, topCandidates);
            case 3:
              _context17.p = 3;
              _t18 = _context17.v;
              throw new Error("Get top candidates failed: ".concat(_t18.message));
            case 4:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function getTopCandidates(_x18) {
        return _getTopCandidates.apply(this, arguments);
      }
      return getTopCandidates;
    }()
    /**
     * Get top categories by votes in event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [limit=10] - Maximum number to return
     * @returns {Promise<Array>} - Top categories
     */
    )
  }, {
    key: "getTopCategories",
    value: (function () {
      var _getTopCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(eventId) {
        var limit,
          topCategories,
          _args18 = arguments,
          _t19;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              limit = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : 10;
              _context18.p = 1;
              _context18.n = 2;
              return this.aggregate([{
                $match: {
                  event: eventId,
                  status: _voteConstants.VOTE_STATUS.ACTIVE
                }
              }, {
                $group: {
                  _id: "$category",
                  voteCount: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  voteCount: -1
                }
              }, {
                $limit: limit
              }, {
                $lookup: {
                  from: "categories",
                  localField: "_id",
                  foreignField: "_id",
                  as: "category"
                }
              }, {
                $unwind: "$category"
              }]);
            case 2:
              topCategories = _context18.v;
              return _context18.a(2, topCategories);
            case 3:
              _context18.p = 3;
              _t19 = _context18.v;
              throw new Error("Get top categories failed: ".concat(_t19.message));
            case 4:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 3]]);
      }));
      function getTopCategories(_x19) {
        return _getTopCategories.apply(this, arguments);
      }
      return getTopCategories;
    }()
    /**
     * Detect suspicious voting patterns (fraud detection)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [threshold=10] - Votes threshold from same IP
     * @returns {Promise<Array>} - Suspicious IPs
     */
    )
  }, {
    key: "detectSuspiciousActivity",
    value: (function () {
      var _detectSuspiciousActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(eventId) {
        var threshold,
          suspicious,
          _args19 = arguments,
          _t20;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              threshold = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : 10;
              _context19.p = 1;
              _context19.n = 2;
              return this.aggregate([{
                $match: {
                  event: eventId,
                  status: _voteConstants.VOTE_STATUS.ACTIVE,
                  ip_hash: {
                    $exists: true
                  }
                }
              }, {
                $group: {
                  _id: "$ip_hash",
                  voteCount: {
                    $sum: 1
                  },
                  candidates: {
                    $addToSet: "$candidate"
                  },
                  votes: {
                    $push: "$$ROOT"
                  }
                }
              }, {
                $match: {
                  voteCount: {
                    $gte: threshold
                  }
                }
              }, {
                $sort: {
                  voteCount: -1
                }
              }]);
            case 2:
              suspicious = _context19.v;
              return _context19.a(2, suspicious);
            case 3:
              _context19.p = 3;
              _t20 = _context19.v;
              throw new Error("Detect suspicious activity failed: ".concat(_t20.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function detectSuspiciousActivity(_x20) {
        return _detectSuspiciousActivity.apply(this, arguments);
      }
      return detectSuspiciousActivity;
    }()
    /**
     * Get vote velocity (votes per minute) for event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [minutes=60] - Time window in minutes
     * @returns {Promise<number>} - Votes per minute
     */
    )
  }, {
    key: "getVoteVelocity",
    value: (function () {
      var _getVoteVelocity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(eventId) {
        var minutes,
          since,
          count,
          _args20 = arguments,
          _t21;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              minutes = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : 60;
              _context20.p = 1;
              since = new Date(Date.now() - minutes * 60 * 1000);
              _context20.n = 2;
              return this.model.countDocuments({
                event: eventId,
                status: _voteConstants.VOTE_STATUS.ACTIVE,
                cast_at: {
                  $gte: since
                }
              }).exec();
            case 2:
              count = _context20.v;
              return _context20.a(2, Math.round(count / minutes * 10) / 10);
            case 3:
              _context20.p = 3;
              _t21 = _context20.v;
              throw new Error("Get vote velocity failed: ".concat(_t21.message));
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 3]]);
      }));
      function getVoteVelocity(_x21) {
        return _getVoteVelocity.apply(this, arguments);
      }
      return getVoteVelocity;
    }()
    /**
     * Cast a single vote
     * @param {Object} voteData - Vote data
     * @param {string|mongoose.Types.ObjectId} voteData.candidate - Candidate ID
     * @param {string|mongoose.Types.ObjectId} voteData.category - Category ID
     * @param {string|mongoose.Types.ObjectId} voteData.event - Event ID
     * @param {string|mongoose.Types.ObjectId} voteData.payment - Payment ID
     * @param {string} voteData.vote_code - Vote code
     * @param {string} [voteData.ip_address] - IP address
     * @param {string} [voteData.user_agent] - User agent
     * @returns {Promise<Object>} - Created vote
     */
    )
  }, {
    key: "castVote",
    value: (function () {
      var _castVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(voteData) {
        var _t22;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              _context21.n = 1;
              return this.create(voteData);
            case 1:
              return _context21.a(2, _context21.v);
            case 2:
              _context21.p = 2;
              _t22 = _context21.v;
              throw new Error("Cast vote failed: ".concat(_t22.message));
            case 3:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 2]]);
      }));
      function castVote(_x22) {
        return _castVote.apply(this, arguments);
      }
      return castVote;
    }()
    /**
     * Cast multiple votes in bulk (for bundle purchases)
     * @param {Object} params - Bulk vote parameters
     * @param {string|mongoose.Types.ObjectId} params.candidate - Candidate ID
     * @param {string|mongoose.Types.ObjectId} params.category - Category ID
     * @param {string|mongoose.Types.ObjectId} params.event - Event ID
     * @param {string|mongoose.Types.ObjectId} params.payment - Payment ID
     * @param {string} params.vote_code - Vote code
     * @param {number} params.count - Number of votes to cast
     * @param {string} [params.ip_address] - IP address
     * @param {string} [params.user_agent] - User agent
     * @param {Object} [params.metadata] - Additional metadata
     * @returns {Promise<Array>} - Array of created votes
     */
    )
  }, {
    key: "castVotes",
    value: (function () {
      var _castVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(params) {
        var candidate, category, event, payment, vote_code, count, ip_address, user_agent, metadata, votesData, now, ip_hash, crypto, i, createdVotes, Candidate, Category, _t23;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              candidate = params.candidate, category = params.category, event = params.event, payment = params.payment, vote_code = params.vote_code, count = params.count, ip_address = params.ip_address, user_agent = params.user_agent, metadata = params.metadata;
              if (!(!count || count < 1)) {
                _context22.n = 1;
                break;
              }
              throw new Error("Vote count must be at least 1");
            case 1:
              // Prepare bulk vote data
              votesData = [];
              now = new Date(); // Hash IP address if provided
              ip_hash = null;
              if (ip_address) {
                crypto = require("crypto");
                ip_hash = crypto.createHash("sha256").update(ip_address).digest("hex");
              }
              for (i = 0; i < count; i++) {
                votesData.push({
                  candidate: candidate,
                  category: category,
                  event: event,
                  payment: payment,
                  vote_code: vote_code,
                  status: _voteConstants.VOTE_STATUS.ACTIVE,
                  ip_hash: ip_hash,
                  user_agent: user_agent,
                  metadata: metadata || {},
                  cast_at: now
                });
              }

              // Bulk insert votes
              _context22.n = 2;
              return this.model.insertMany(votesData);
            case 2:
              createdVotes = _context22.v;
              // Update candidate vote count
              Candidate = require("mongoose").model("Candidate");
              _context22.n = 3;
              return Candidate.findByIdAndUpdate(candidate, {
                $inc: {
                  vote_count: count
                }
              });
            case 3:
              // Update category vote count
              Category = require("mongoose").model("Category");
              _context22.n = 4;
              return Category.findByIdAndUpdate(category, {
                $inc: {
                  total_votes: count
                }
              });
            case 4:
              return _context22.a(2, createdVotes);
            case 5:
              _context22.p = 5;
              _t23 = _context22.v;
              throw new Error("Cast votes in bulk failed: ".concat(_t23.message));
            case 6:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 5]]);
      }));
      function castVotes(_x23) {
        return _castVotes.apply(this, arguments);
      }
      return castVotes;
    }()
    /**
     * Cast votes for multiple candidates (distributed voting)
     * @param {Object} params - Parameters
     * @param {string|mongoose.Types.ObjectId} params.event - Event ID
     * @param {string|mongoose.Types.ObjectId} params.payment - Payment ID
     * @param {string} params.vote_code - Vote code
     * @param {Array} params.votes - Array of vote distributions
     * @param {string|mongoose.Types.ObjectId} params.votes[].candidate - Candidate ID
     * @param {string|mongoose.Types.ObjectId} params.votes[].category - Category ID
     * @param {number} params.votes[].count - Number of votes for this candidate
     * @param {string} [params.ip_address] - IP address
     * @param {string} [params.user_agent] - User agent
     * @returns {Promise<Array>} - Array of all created votes
     */
    )
  }, {
    key: "castDistributedVotes",
    value: (function () {
      var _castDistributedVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(params) {
        var event, payment, vote_code, votes, ip_address, user_agent, allCreatedVotes, _iterator2, _step2, voteDistribution, createdVotes, _t24, _t25;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              event = params.event, payment = params.payment, vote_code = params.vote_code, votes = params.votes, ip_address = params.ip_address, user_agent = params.user_agent;
              allCreatedVotes = [];
              _iterator2 = _createForOfIteratorHelper(votes);
              _context23.p = 1;
              _iterator2.s();
            case 2:
              if ((_step2 = _iterator2.n()).done) {
                _context23.n = 5;
                break;
              }
              voteDistribution = _step2.value;
              _context23.n = 3;
              return this.castVotes({
                candidate: voteDistribution.candidate,
                category: voteDistribution.category,
                event: event,
                payment: payment,
                vote_code: vote_code,
                count: voteDistribution.count,
                ip_address: ip_address,
                user_agent: user_agent
              });
            case 3:
              createdVotes = _context23.v;
              allCreatedVotes.push.apply(allCreatedVotes, _toConsumableArray(createdVotes));
            case 4:
              _context23.n = 2;
              break;
            case 5:
              _context23.n = 7;
              break;
            case 6:
              _context23.p = 6;
              _t24 = _context23.v;
              _iterator2.e(_t24);
            case 7:
              _context23.p = 7;
              _iterator2.f();
              return _context23.f(7);
            case 8:
              return _context23.a(2, allCreatedVotes);
            case 9:
              _context23.p = 9;
              _t25 = _context23.v;
              throw new Error("Cast distributed votes failed: ".concat(_t25.message));
            case 10:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 6, 7, 8], [0, 9]]);
      }));
      function castDistributedVotes(_x24) {
        return _castDistributedVotes.apply(this, arguments);
      }
      return castDistributedVotes;
    }()
    /**
     * Verify votes by vote code
     * @param {string} voteCode - Vote code
     * @returns {Promise<Object>} - Verification details
     */
    )
  }, {
    key: "verifyVotes",
    value: (function () {
      var _verifyVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(voteCode) {
        var votes, activeVotes, refundedVotes, _t26;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.findByVoteCode(voteCode, {
                populate: "candidate category"
              });
            case 1:
              votes = _context24.v;
              if (!(!votes || votes.length === 0)) {
                _context24.n = 2;
                break;
              }
              return _context24.a(2, {
                verified: false,
                message: "No votes found with this code"
              });
            case 2:
              activeVotes = votes.filter(function (v) {
                return v.status === _voteConstants.VOTE_STATUS.ACTIVE;
              });
              refundedVotes = votes.filter(function (v) {
                return v.status === _voteConstants.VOTE_STATUS.REFUNDED;
              });
              return _context24.a(2, {
                verified: true,
                total_votes: votes.length,
                active_votes: activeVotes.length,
                refunded_votes: refundedVotes.length,
                votes: votes,
                cast_at: votes[0].cast_at
              });
            case 3:
              _context24.p = 3;
              _t26 = _context24.v;
              throw new Error("Verify votes failed: ".concat(_t26.message));
            case 4:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 3]]);
      }));
      function verifyVotes(_x25) {
        return _verifyVotes.apply(this, arguments);
      }
      return verifyVotes;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new VoteRepository();