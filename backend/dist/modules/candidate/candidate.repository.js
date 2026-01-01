"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _candidateModel = _interopRequireDefault(require("./candidate.model.js"));
var _candidateConstants = require("../../utils/constants/candidate.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Candidate Repository
 * This file defines the CandidateRepository class which extends the BaseRepository
 * It contains candidate-specific data access methods
 */
var CandidateRepository = /*#__PURE__*/function (_BaseRepository) {
  function CandidateRepository() {
    _classCallCheck(this, CandidateRepository);
    return _callSuper(this, CandidateRepository, [_candidateModel["default"]]);
  }

  /**
   * Find all candidates for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of candidates
   */
  _inherits(CandidateRepository, _BaseRepository);
  return _createClass(CandidateRepository, [{
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
                vote_count: -1
              });
              this._applyOptions(query, options);
              _context.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Find candidates by event failed: ".concat(_t.message));
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
     * Find all candidates in a specific category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of candidates
     */
    )
  }, {
    key: "findByCategory",
    value: (function () {
      var _findByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(categoryId) {
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
                categories: categoryId
              }).sort({
                display_order: 1,
                vote_count: -1
              });
              this._applyOptions(query, options);
              _context2.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find candidates by category failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findByCategory(_x2) {
        return _findByCategory.apply(this, arguments);
      }
      return findByCategory;
    }()
    /**
     * Find candidates by event and category
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of candidates
     */
    )
  }, {
    key: "findByEventAndCategory",
    value: (function () {
      var _findByEventAndCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(eventId, categoryId) {
        var options,
          query,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              _context3.p = 1;
              query = this.model.find({
                event: eventId,
                categories: categoryId
              }).sort({
                display_order: 1,
                vote_count: -1
              });
              this._applyOptions(query, options);
              _context3.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find candidates by event and category failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findByEventAndCategory(_x3, _x4) {
        return _findByEventAndCategory.apply(this, arguments);
      }
      return findByEventAndCategory;
    }()
    /**
     * Find approved candidates
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of approved candidates
     */
    )
  }, {
    key: "findApproved",
    value: (function () {
      var _findApproved = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var eventId,
          options,
          filter,
          query,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              eventId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              filter = {
                status: _candidateConstants.STATUS.APPROVED,
                is_published: true
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                vote_count: -1
              });
              this._applyOptions(query, options);
              _context4.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Find approved candidates failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function findApproved() {
        return _findApproved.apply(this, arguments);
      }
      return findApproved;
    }()
    /**
     * Find pending candidates (awaiting approval)
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of pending candidates
     */
    )
  }, {
    key: "findPending",
    value: (function () {
      var _findPending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var eventId,
          options,
          filter,
          query,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              eventId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              filter = {
                status: _candidateConstants.STATUS.PENDING
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                nomination_date: 1
              });
              this._applyOptions(query, options);
              _context5.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Find pending candidates failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function findPending() {
        return _findPending.apply(this, arguments);
      }
      return findPending;
    }()
    /**
     * Find rejected candidates
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of rejected candidates
     */
    )
  }, {
    key: "findRejected",
    value: (function () {
      var _findRejected = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var eventId,
          options,
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
              filter = {
                status: _candidateConstants.STATUS.REJECTED
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                updated_at: -1
              });
              this._applyOptions(query, options);
              _context6.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find rejected candidates failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findRejected() {
        return _findRejected.apply(this, arguments);
      }
      return findRejected;
    }()
    /**
     * Find featured candidates
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {number} [limit=5] - Maximum number to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of featured candidates
     */
    )
  }, {
    key: "findFeatured",
    value: (function () {
      var _findFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var eventId,
          limit,
          options,
          filter,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              eventId = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : null;
              limit = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 5;
              options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
              _context7.p = 1;
              filter = {
                is_featured: true,
                is_published: true,
                status: _candidateConstants.STATUS.APPROVED
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                vote_count: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context7.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find featured candidates failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findFeatured() {
        return _findFeatured.apply(this, arguments);
      }
      return findFeatured;
    }()
    /**
     * Find candidate by slug
     * @param {string} slug - Candidate slug
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Candidate or null
     */
    )
  }, {
    key: "findBySlug",
    value: (function () {
      var _findBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(slug) {
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
                slug: slug
              });
              this._applyOptions(query, options);
              _context8.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Find candidate by slug failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findBySlug(_x5) {
        return _findBySlug.apply(this, arguments);
      }
      return findBySlug;
    }()
    /**
     * Find candidates by status
     * @param {string} status - Candidate status
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of candidates
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(status) {
        var eventId,
          options,
          filter,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              eventId = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
              options = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
              _context9.p = 1;
              if (Object.values(_candidateConstants.STATUS).includes(status)) {
                _context9.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              filter = {
                status: status
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                nomination_date: -1
              });
              this._applyOptions(query, options);
              _context9.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context9.a(2, _context9.v);
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              throw new Error("Find candidates by status failed: ".concat(_t9.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 4]]);
      }));
      function findByStatus(_x6) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Search candidates by name, bio, or tags
     * @param {string} searchTerm - Search term
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of matching candidates
     */
    )
  }, {
    key: "search",
    value: (function () {
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(searchTerm) {
        var eventId,
          options,
          regex,
          filter,
          query,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              eventId = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : null;
              options = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : {};
              _context0.p = 1;
              regex = new RegExp(searchTerm, "i");
              filter = {
                $or: [{
                  first_name: regex
                }, {
                  last_name: regex
                }, {
                  bio: regex
                }, {
                  tags: regex
                }],
                is_published: true,
                status: _candidateConstants.STATUS.APPROVED
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                vote_count: -1
              });
              this._applyOptions(query, options);
              _context0.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Search candidates failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function search(_x7) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
    /**
     * Find candidates by tags
     * @param {string|Array<string>} tags - Tag(s) to search for
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of candidates
     */
    )
  }, {
    key: "findByTags",
    value: (function () {
      var _findByTags = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(tags) {
        var eventId,
          options,
          tagArray,
          filter,
          query,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              eventId = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : null;
              options = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : {};
              _context1.p = 1;
              tagArray = Array.isArray(tags) ? tags : [tags];
              filter = {
                tags: {
                  $in: tagArray
                },
                is_published: true,
                status: _candidateConstants.STATUS.APPROVED
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                vote_count: -1
              });
              this._applyOptions(query, options);
              _context1.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find candidates by tags failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findByTags(_x8) {
        return _findByTags.apply(this, arguments);
      }
      return findByTags;
    }()
    /**
     * Find top candidates by vote count
     * @param {number} [limit=10] - Maximum number to return
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {string|mongoose.Types.ObjectId} [categoryId] - Optional category ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Top candidates by votes
     */
    )
  }, {
    key: "findTopByVotes",
    value: (function () {
      var _findTopByVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var limit,
          eventId,
          categoryId,
          options,
          filter,
          query,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              limit = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 10;
              eventId = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : null;
              categoryId = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : null;
              options = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
              _context10.p = 1;
              filter = {
                is_published: true,
                status: _candidateConstants.STATUS.APPROVED
              };
              if (eventId) filter.event = eventId;
              if (categoryId) filter.categories = categoryId;
              query = this.model.find(filter).sort({
                vote_count: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context10.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find top candidates by votes failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findTopByVotes() {
        return _findTopByVotes.apply(this, arguments);
      }
      return findTopByVotes;
    }()
    /**
     * Find trending candidates (by recent votes/views)
     * @param {number} [limit=10] - Maximum number to return
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Trending candidates
     */
    )
  }, {
    key: "findTrending",
    value: (function () {
      var _findTrending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var limit,
          eventId,
          options,
          filter,
          query,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              limit = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : 10;
              eventId = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : null;
              options = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
              _context11.p = 1;
              filter = {
                is_published: true,
                status: _candidateConstants.STATUS.APPROVED
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                view_count: -1,
                vote_count: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context11.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Find trending candidates failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function findTrending() {
        return _findTrending.apply(this, arguments);
      }
      return findTrending;
    }()
    /**
     * Approve a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "approve",
    value: (function () {
      var _approve = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(candidateId) {
        var candidate, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.model.findById(candidateId);
            case 1:
              candidate = _context12.v;
              if (candidate) {
                _context12.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context12.n = 3;
              return candidate.approve();
            case 3:
              return _context12.a(2, _context12.v);
            case 4:
              _context12.p = 4;
              _t12 = _context12.v;
              throw new Error("Approve candidate failed: ".concat(_t12.message));
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 4]]);
      }));
      function approve(_x9) {
        return _approve.apply(this, arguments);
      }
      return approve;
    }()
    /**
     * Reject a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string} reason - Rejection reason
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "reject",
    value: (function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(candidateId, reason) {
        var candidate, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.model.findById(candidateId);
            case 1:
              candidate = _context13.v;
              if (candidate) {
                _context13.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context13.n = 3;
              return candidate.reject(reason);
            case 3:
              return _context13.a(2, _context13.v);
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw new Error("Reject candidate failed: ".concat(_t13.message));
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 4]]);
      }));
      function reject(_x0, _x1) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
    /**
     * Increment vote count for a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {number} [count=1] - Number of votes to add
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "incrementVotes",
    value: (function () {
      var _incrementVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(candidateId) {
        var count,
          candidate,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              count = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 1;
              _context14.p = 1;
              _context14.n = 2;
              return this.model.findById(candidateId);
            case 2:
              candidate = _context14.v;
              if (candidate) {
                _context14.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              _context14.n = 4;
              return candidate.incrementVotes(count);
            case 4:
              return _context14.a(2, _context14.v);
            case 5:
              _context14.p = 5;
              _t14 = _context14.v;
              throw new Error("Increment votes failed: ".concat(_t14.message));
            case 6:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 5]]);
      }));
      function incrementVotes(_x10) {
        return _incrementVotes.apply(this, arguments);
      }
      return incrementVotes;
    }()
    /**
     * Decrement vote count for a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {number} [count=1] - Number of votes to remove
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "decrementVotes",
    value: (function () {
      var _decrementVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(candidateId) {
        var count,
          candidate,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              count = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 1;
              _context15.p = 1;
              _context15.n = 2;
              return this.model.findById(candidateId);
            case 2:
              candidate = _context15.v;
              if (candidate) {
                _context15.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              _context15.n = 4;
              return candidate.decrementVotes(count);
            case 4:
              return _context15.a(2, _context15.v);
            case 5:
              _context15.p = 5;
              _t15 = _context15.v;
              throw new Error("Decrement votes failed: ".concat(_t15.message));
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 5]]);
      }));
      function decrementVotes(_x11) {
        return _decrementVotes.apply(this, arguments);
      }
      return decrementVotes;
    }()
    /**
     * Increment view count for a candidate
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "incrementViews",
    value: (function () {
      var _incrementViews = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(candidateId) {
        var candidate, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.model.findById(candidateId);
            case 1:
              candidate = _context16.v;
              if (candidate) {
                _context16.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context16.n = 3;
              return candidate.incrementViews();
            case 3:
              return _context16.a(2, _context16.v);
            case 4:
              _context16.p = 4;
              _t16 = _context16.v;
              throw new Error("Increment views failed: ".concat(_t16.message));
            case 5:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 4]]);
      }));
      function incrementViews(_x12) {
        return _incrementViews.apply(this, arguments);
      }
      return incrementViews;
    }()
    /**
     * Add candidate to a category
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "addToCategory",
    value: (function () {
      var _addToCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(candidateId, categoryId) {
        var candidate, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.model.findById(candidateId);
            case 1:
              candidate = _context17.v;
              if (candidate) {
                _context17.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context17.n = 3;
              return candidate.addToCategory(categoryId);
            case 3:
              return _context17.a(2, _context17.v);
            case 4:
              _context17.p = 4;
              _t17 = _context17.v;
              throw new Error("Add to category failed: ".concat(_t17.message));
            case 5:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 4]]);
      }));
      function addToCategory(_x13, _x14) {
        return _addToCategory.apply(this, arguments);
      }
      return addToCategory;
    }()
    /**
     * Remove candidate from a category
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "removeFromCategory",
    value: (function () {
      var _removeFromCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(candidateId, categoryId) {
        var candidate, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.model.findById(candidateId);
            case 1:
              candidate = _context18.v;
              if (candidate) {
                _context18.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context18.n = 3;
              return candidate.removeFromCategory(categoryId);
            case 3:
              return _context18.a(2, _context18.v);
            case 4:
              _context18.p = 4;
              _t18 = _context18.v;
              throw new Error("Remove from category failed: ".concat(_t18.message));
            case 5:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 4]]);
      }));
      function removeFromCategory(_x15, _x16) {
        return _removeFromCategory.apply(this, arguments);
      }
      return removeFromCategory;
    }()
    /**
     * Update candidate status
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string} status - New status
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated candidate
     */
    )
  }, {
    key: "updateStatus",
    value: (function () {
      var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(candidateId, status) {
        var options,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              options = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : {};
              _context19.p = 1;
              if (Object.values(_candidateConstants.STATUS).includes(status)) {
                _context19.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              _context19.n = 3;
              return this.updateById(candidateId, {
                status: status
              }, options);
            case 3:
              return _context19.a(2, _context19.v);
            case 4:
              _context19.p = 4;
              _t19 = _context19.v;
              throw new Error("Update status failed: ".concat(_t19.message));
            case 5:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 4]]);
      }));
      function updateStatus(_x17, _x18) {
        return _updateStatus.apply(this, arguments);
      }
      return updateStatus;
    }()
    /**
     * Toggle featured status
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated candidate
     */
    )
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(candidateId) {
        var options,
          candidate,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              options = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : {};
              _context20.p = 1;
              _context20.n = 2;
              return this.findById(candidateId);
            case 2:
              candidate = _context20.v;
              if (candidate) {
                _context20.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              _context20.n = 4;
              return this.updateById(candidateId, {
                is_featured: !candidate.is_featured
              }, options);
            case 4:
              return _context20.a(2, _context20.v);
            case 5:
              _context20.p = 5;
              _t20 = _context20.v;
              throw new Error("Toggle featured failed: ".concat(_t20.message));
            case 6:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 5]]);
      }));
      function toggleFeatured(_x19) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Toggle published status
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated candidate
     */
    )
  }, {
    key: "togglePublished",
    value: (function () {
      var _togglePublished = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(candidateId) {
        var options,
          candidate,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              options = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : {};
              _context21.p = 1;
              _context21.n = 2;
              return this.findById(candidateId);
            case 2:
              candidate = _context21.v;
              if (candidate) {
                _context21.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              _context21.n = 4;
              return this.updateById(candidateId, {
                is_published: !candidate.is_published
              }, options);
            case 4:
              return _context21.a(2, _context21.v);
            case 5:
              _context21.p = 5;
              _t21 = _context21.v;
              throw new Error("Toggle published failed: ".concat(_t21.message));
            case 6:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 5]]);
      }));
      function togglePublished(_x20) {
        return _togglePublished.apply(this, arguments);
      }
      return togglePublished;
    }()
    /**
     * Update display order
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {number} order - New display order
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated candidate
     */
    )
  }, {
    key: "updateDisplayOrder",
    value: (function () {
      var _updateDisplayOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(candidateId, order) {
        var options,
          _args22 = arguments,
          _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              options = _args22.length > 2 && _args22[2] !== undefined ? _args22[2] : {};
              _context22.p = 1;
              _context22.n = 2;
              return this.updateById(candidateId, {
                display_order: order
              }, options);
            case 2:
              return _context22.a(2, _context22.v);
            case 3:
              _context22.p = 3;
              _t22 = _context22.v;
              throw new Error("Update display order failed: ".concat(_t22.message));
            case 4:
              return _context22.a(2);
          }
        }, _callee22, this, [[1, 3]]);
      }));
      function updateDisplayOrder(_x21, _x22) {
        return _updateDisplayOrder.apply(this, arguments);
      }
      return updateDisplayOrder;
    }()
    /**
     * Bulk update display orders
     * @param {Array<{id: string, order: number}>} updates - Array of {id, order} objects
     * @returns {Promise<Array>} - Updated candidates
     */
    )
  }, {
    key: "bulkUpdateDisplayOrder",
    value: (function () {
      var _bulkUpdateDisplayOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(updates) {
        var bulkOps, ids, _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
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
              _context23.n = 1;
              return this.model.bulkWrite(bulkOps);
            case 1:
              // Return updated candidates
              ids = updates.map(function (u) {
                return u.id;
              });
              _context23.n = 2;
              return this.model.find({
                _id: {
                  $in: ids
                }
              }).sort({
                display_order: 1
              }).exec();
            case 2:
              return _context23.a(2, _context23.v);
            case 3:
              _context23.p = 3;
              _t23 = _context23.v;
              throw new Error("Bulk update display order failed: ".concat(_t23.message));
            case 4:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 3]]);
      }));
      function bulkUpdateDisplayOrder(_x23) {
        return _bulkUpdateDisplayOrder.apply(this, arguments);
      }
      return bulkUpdateDisplayOrder;
    }()
    /**
     * Get candidate statistics for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Candidate statistics
     */
    )
  }, {
    key: "getStatisticsByEvent",
    value: (function () {
      var _getStatisticsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(eventId) {
        var _yield$this$aggregate, _yield$this$aggregate2, stats, _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.aggregate([{
                $match: {
                  event: eventId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  approved: [{
                    $match: {
                      status: _candidateConstants.STATUS.APPROVED
                    }
                  }, {
                    $count: "count"
                  }],
                  pending: [{
                    $match: {
                      status: _candidateConstants.STATUS.PENDING
                    }
                  }, {
                    $count: "count"
                  }],
                  rejected: [{
                    $match: {
                      status: _candidateConstants.STATUS.REJECTED
                    }
                  }, {
                    $count: "count"
                  }],
                  published: [{
                    $match: {
                      is_published: true
                    }
                  }, {
                    $count: "count"
                  }],
                  featured: [{
                    $match: {
                      is_featured: true
                    }
                  }, {
                    $count: "count"
                  }],
                  totalVotes: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$vote_count"
                      }
                    }
                  }],
                  totalViews: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$view_count"
                      }
                    }
                  }],
                  avgVotes: [{
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$vote_count"
                      }
                    }
                  }]
                }
              }, {
                $project: {
                  total: {
                    $arrayElemAt: ["$total.count", 0]
                  },
                  approved: {
                    $arrayElemAt: ["$approved.count", 0]
                  },
                  pending: {
                    $arrayElemAt: ["$pending.count", 0]
                  },
                  rejected: {
                    $arrayElemAt: ["$rejected.count", 0]
                  },
                  published: {
                    $arrayElemAt: ["$published.count", 0]
                  },
                  featured: {
                    $arrayElemAt: ["$featured.count", 0]
                  },
                  totalVotes: {
                    $arrayElemAt: ["$totalVotes.total", 0]
                  },
                  totalViews: {
                    $arrayElemAt: ["$totalViews.total", 0]
                  },
                  averageVotes: {
                    $arrayElemAt: ["$avgVotes.average", 0]
                  }
                }
              }]);
            case 1:
              _yield$this$aggregate = _context24.v;
              _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
              stats = _yield$this$aggregate2[0];
              return _context24.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                approved: (stats === null || stats === void 0 ? void 0 : stats.approved) || 0,
                pending: (stats === null || stats === void 0 ? void 0 : stats.pending) || 0,
                rejected: (stats === null || stats === void 0 ? void 0 : stats.rejected) || 0,
                published: (stats === null || stats === void 0 ? void 0 : stats.published) || 0,
                featured: (stats === null || stats === void 0 ? void 0 : stats.featured) || 0,
                totalVotes: (stats === null || stats === void 0 ? void 0 : stats.totalVotes) || 0,
                totalViews: (stats === null || stats === void 0 ? void 0 : stats.totalViews) || 0,
                averageVotes: Math.round((stats === null || stats === void 0 ? void 0 : stats.averageVotes) || 0)
              });
            case 2:
              _context24.p = 2;
              _t24 = _context24.v;
              throw new Error("Get statistics by event failed: ".concat(_t24.message));
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 2]]);
      }));
      function getStatisticsByEvent(_x24) {
        return _getStatisticsByEvent.apply(this, arguments);
      }
      return getStatisticsByEvent;
    }()
    /**
     * Get candidate statistics for a category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Candidate statistics
     */
    )
  }, {
    key: "getStatisticsByCategory",
    value: (function () {
      var _getStatisticsByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(categoryId) {
        var _yield$this$aggregate3, _yield$this$aggregate4, stats, _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.aggregate([{
                $match: {
                  categories: categoryId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  approved: [{
                    $match: {
                      status: _candidateConstants.STATUS.APPROVED
                    }
                  }, {
                    $count: "count"
                  }],
                  published: [{
                    $match: {
                      is_published: true
                    }
                  }, {
                    $count: "count"
                  }],
                  totalVotes: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$vote_count"
                      }
                    }
                  }],
                  avgVotes: [{
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$vote_count"
                      }
                    }
                  }]
                }
              }, {
                $project: {
                  total: {
                    $arrayElemAt: ["$total.count", 0]
                  },
                  approved: {
                    $arrayElemAt: ["$approved.count", 0]
                  },
                  published: {
                    $arrayElemAt: ["$published.count", 0]
                  },
                  totalVotes: {
                    $arrayElemAt: ["$totalVotes.total", 0]
                  },
                  averageVotes: {
                    $arrayElemAt: ["$avgVotes.average", 0]
                  }
                }
              }]);
            case 1:
              _yield$this$aggregate3 = _context25.v;
              _yield$this$aggregate4 = _slicedToArray(_yield$this$aggregate3, 1);
              stats = _yield$this$aggregate4[0];
              return _context25.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                approved: (stats === null || stats === void 0 ? void 0 : stats.approved) || 0,
                published: (stats === null || stats === void 0 ? void 0 : stats.published) || 0,
                totalVotes: (stats === null || stats === void 0 ? void 0 : stats.totalVotes) || 0,
                averageVotes: Math.round((stats === null || stats === void 0 ? void 0 : stats.averageVotes) || 0)
              });
            case 2:
              _context25.p = 2;
              _t25 = _context25.v;
              throw new Error("Get statistics by category failed: ".concat(_t25.message));
            case 3:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 2]]);
      }));
      function getStatisticsByCategory(_x25) {
        return _getStatisticsByCategory.apply(this, arguments);
      }
      return getStatisticsByCategory;
    }()
    /**
     * Find candidate by email
     * @param {string} email - Candidate email
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Candidate or null
     */
    )
  }, {
    key: "findByEmail",
    value: (function () {
      var _findByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(email) {
        var eventId,
          options,
          filter,
          query,
          _args26 = arguments,
          _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              eventId = _args26.length > 1 && _args26[1] !== undefined ? _args26[1] : null;
              options = _args26.length > 2 && _args26[2] !== undefined ? _args26[2] : {};
              _context26.p = 1;
              filter = {
                email: email.toLowerCase()
              };
              if (eventId) filter.event = eventId;
              query = this.model.findOne(filter);
              this._applyOptions(query, options);
              _context26.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context26.a(2, _context26.v);
            case 3:
              _context26.p = 3;
              _t26 = _context26.v;
              throw new Error("Find candidate by email failed: ".concat(_t26.message));
            case 4:
              return _context26.a(2);
          }
        }, _callee26, this, [[1, 3]]);
      }));
      function findByEmail(_x26) {
        return _findByEmail.apply(this, arguments);
      }
      return findByEmail;
    }()
    /**
     * Find candidate by candidate code
     * @param {string} candidateCode - Candidate code
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Candidate or null
     */
    )
  }, {
    key: "findByCandidateCode",
    value: (function () {
      var _findByCandidateCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(candidateCode) {
        var options,
          query,
          _args27 = arguments,
          _t27;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              options = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : {};
              _context27.p = 1;
              query = this.model.findOne({
                candidate_code: candidateCode.toUpperCase()
              });
              this._applyOptions(query, options);
              _context27.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context27.a(2, _context27.v);
            case 3:
              _context27.p = 3;
              _t27 = _context27.v;
              throw new Error("Find candidate by code failed: ".concat(_t27.message));
            case 4:
              return _context27.a(2);
          }
        }, _callee27, this, [[1, 3]]);
      }));
      function findByCandidateCode(_x27) {
        return _findByCandidateCode.apply(this, arguments);
      }
      return findByCandidateCode;
    }()
    /**
     * Find candidate with password (for authentication)
     * @param {string} email - Candidate email
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @returns {Promise<Object|null>} - Candidate with password or null
     */
    )
  }, {
    key: "findByEmailWithPassword",
    value: (function () {
      var _findByEmailWithPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(email) {
        var eventId,
          filter,
          _args28 = arguments,
          _t28;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              eventId = _args28.length > 1 && _args28[1] !== undefined ? _args28[1] : null;
              _context28.p = 1;
              filter = {
                email: email.toLowerCase()
              };
              if (eventId) filter.event = eventId;
              _context28.n = 2;
              return this.model.findOne(filter).select("+password_hash").exec();
            case 2:
              return _context28.a(2, _context28.v);
            case 3:
              _context28.p = 3;
              _t28 = _context28.v;
              throw new Error("Find candidate with password failed: ".concat(_t28.message));
            case 4:
              return _context28.a(2);
          }
        }, _callee28, this, [[1, 3]]);
      }));
      function findByEmailWithPassword(_x28) {
        return _findByEmailWithPassword.apply(this, arguments);
      }
      return findByEmailWithPassword;
    }()
    /**
     * Find candidate by code with password (for authentication)
     * @param {string} candidateCode - Candidate code
     * @returns {Promise<Object|null>} - Candidate with password or null
     */
    )
  }, {
    key: "findByCandidateCodeWithPassword",
    value: (function () {
      var _findByCandidateCodeWithPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(candidateCode) {
        var _t29;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              _context29.p = 0;
              _context29.n = 1;
              return this.model.findOne({
                candidate_code: candidateCode.toUpperCase()
              }).select("+password_hash").exec();
            case 1:
              return _context29.a(2, _context29.v);
            case 2:
              _context29.p = 2;
              _t29 = _context29.v;
              throw new Error("Find candidate by code with password failed: ".concat(_t29.message));
            case 3:
              return _context29.a(2);
          }
        }, _callee29, this, [[0, 2]]);
      }));
      function findByCandidateCodeWithPassword(_x29) {
        return _findByCandidateCodeWithPassword.apply(this, arguments);
      }
      return findByCandidateCodeWithPassword;
    }()
    /**
     * Find candidates needing review (pending for more than X days)
     * @param {number} [days=7] - Number of days threshold
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Candidates needing review
     */
    )
  }, {
    key: "findNeedingReview",
    value: (function () {
      var _findNeedingReview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30() {
        var days,
          eventId,
          options,
          threshold,
          filter,
          query,
          _args30 = arguments,
          _t30;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              days = _args30.length > 0 && _args30[0] !== undefined ? _args30[0] : 7;
              eventId = _args30.length > 1 && _args30[1] !== undefined ? _args30[1] : null;
              options = _args30.length > 2 && _args30[2] !== undefined ? _args30[2] : {};
              _context30.p = 1;
              threshold = new Date();
              threshold.setDate(threshold.getDate() - days);
              filter = {
                status: _candidateConstants.STATUS.PENDING,
                nomination_date: {
                  $lte: threshold
                }
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                nomination_date: 1
              });
              this._applyOptions(query, options);
              _context30.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context30.a(2, _context30.v);
            case 3:
              _context30.p = 3;
              _t30 = _context30.v;
              throw new Error("Find candidates needing review failed: ".concat(_t30.message));
            case 4:
              return _context30.a(2);
          }
        }, _callee30, this, [[1, 3]]);
      }));
      function findNeedingReview() {
        return _findNeedingReview.apply(this, arguments);
      }
      return findNeedingReview;
    }()
    /**
     * Find candidates with profile updates pending
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Candidates with profile updates
     */
    )
  }, {
    key: "findProfileUpdatesPending",
    value: (function () {
      var _findProfileUpdatesPending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31() {
        var eventId,
          options,
          filter,
          query,
          _args31 = arguments,
          _t31;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.p = _context31.n) {
            case 0:
              eventId = _args31.length > 0 && _args31[0] !== undefined ? _args31[0] : null;
              options = _args31.length > 1 && _args31[1] !== undefined ? _args31[1] : {};
              _context31.p = 1;
              filter = {
                status: _candidateConstants.STATUS.PROFILE_UPDATE_PENDING
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                updated_at: -1
              });
              this._applyOptions(query, options);
              _context31.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context31.a(2, _context31.v);
            case 3:
              _context31.p = 3;
              _t31 = _context31.v;
              throw new Error("Find profile updates pending failed: ".concat(_t31.message));
            case 4:
              return _context31.a(2);
          }
        }, _callee31, this, [[1, 3]]);
      }));
      function findProfileUpdatesPending() {
        return _findProfileUpdatesPending.apply(this, arguments);
      }
      return findProfileUpdatesPending;
    }()
    /**
     * Update candidate password
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string} passwordHash - Hashed password
     * @returns {Promise<Object|null>} - Updated candidate
     */
    )
  }, {
    key: "updatePassword",
    value: (function () {
      var _updatePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(candidateId, passwordHash) {
        var _t32;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.p = _context32.n) {
            case 0:
              _context32.p = 0;
              _context32.n = 1;
              return this.updateById(candidateId, {
                password_hash: passwordHash
              });
            case 1:
              return _context32.a(2, _context32.v);
            case 2:
              _context32.p = 2;
              _t32 = _context32.v;
              throw new Error("Update password failed: ".concat(_t32.message));
            case 3:
              return _context32.a(2);
          }
        }, _callee32, this, [[0, 2]]);
      }));
      function updatePassword(_x30, _x31) {
        return _updatePassword.apply(this, arguments);
      }
      return updatePassword;
    }()
    /**
     * Request re-approval after profile update
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Array<string>} changedFields - Fields that were changed
     * @param {string} reason - Reason for update
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "requestReApproval",
    value: (function () {
      var _requestReApproval = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(candidateId) {
        var changedFields,
          reason,
          candidate,
          _args33 = arguments,
          _t33;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              changedFields = _args33.length > 1 && _args33[1] !== undefined ? _args33[1] : [];
              reason = _args33.length > 2 && _args33[2] !== undefined ? _args33[2] : "Profile update";
              _context33.p = 1;
              _context33.n = 2;
              return this.model.findById(candidateId);
            case 2:
              candidate = _context33.v;
              if (candidate) {
                _context33.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              _context33.n = 4;
              return candidate.requestReApproval(changedFields, reason);
            case 4:
              return _context33.a(2, _context33.v);
            case 5:
              _context33.p = 5;
              _t33 = _context33.v;
              throw new Error("Request re-approval failed: ".concat(_t33.message));
            case 6:
              return _context33.a(2);
          }
        }, _callee33, this, [[1, 5]]);
      }));
      function requestReApproval(_x32) {
        return _requestReApproval.apply(this, arguments);
      }
      return requestReApproval;
    }()
    /**
     * Update last login timestamp
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "updateLastLogin",
    value: (function () {
      var _updateLastLogin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(candidateId) {
        var _t34;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.p = _context34.n) {
            case 0:
              _context34.p = 0;
              _context34.n = 1;
              return this.updateById(candidateId, {
                last_login: new Date()
              });
            case 1:
              return _context34.a(2, _context34.v);
            case 2:
              _context34.p = 2;
              _t34 = _context34.v;
              throw new Error("Update last login failed: ".concat(_t34.message));
            case 3:
              return _context34.a(2);
          }
        }, _callee34, this, [[0, 2]]);
      }));
      function updateLastLogin(_x33) {
        return _updateLastLogin.apply(this, arguments);
      }
      return updateLastLogin;
    }()
    /**
     * Admin-only: Remove category from candidate (including admin-verified)
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object|null>} - Updated candidate
     */
    )
  }, {
    key: "adminRemoveCategory",
    value: (function () {
      var _adminRemoveCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(candidateId, categoryId) {
        var candidate, _t35;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              _context35.p = 0;
              _context35.n = 1;
              return this.model.findById(candidateId);
            case 1:
              candidate = _context35.v;
              if (candidate) {
                _context35.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              if (!(candidate.categories.length <= 1)) {
                _context35.n = 3;
                break;
              }
              throw new Error("Candidate must belong to at least one category");
            case 3:
              // Remove from both categories and admin_verified_categories
              candidate.categories = candidate.categories.filter(function (cat) {
                return cat.toString() !== categoryId.toString();
              });
              candidate.admin_verified_categories = candidate.admin_verified_categories.filter(function (cat) {
                return cat.toString() !== categoryId.toString();
              });
              _context35.n = 4;
              return candidate.save();
            case 4:
              return _context35.a(2, _context35.v);
            case 5:
              _context35.p = 5;
              _t35 = _context35.v;
              throw new Error("Admin remove category failed: ".concat(_t35.message));
            case 6:
              return _context35.a(2);
          }
        }, _callee35, this, [[0, 5]]);
      }));
      function adminRemoveCategory(_x34, _x35) {
        return _adminRemoveCategory.apply(this, arguments);
      }
      return adminRemoveCategory;
    }()
    /**
     * Get leaderboard (top candidates by votes)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} [categoryId] - Optional category ID filter
     * @param {number} [limit=20] - Maximum number to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Leaderboard
     */
    )
  }, {
    key: "getLeaderboard",
    value: (function () {
      var _getLeaderboard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(eventId) {
        var categoryId,
          limit,
          options,
          filter,
          query,
          _args36 = arguments,
          _t36;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.p = _context36.n) {
            case 0:
              categoryId = _args36.length > 1 && _args36[1] !== undefined ? _args36[1] : null;
              limit = _args36.length > 2 && _args36[2] !== undefined ? _args36[2] : 20;
              options = _args36.length > 3 && _args36[3] !== undefined ? _args36[3] : {};
              _context36.p = 1;
              filter = {
                event: eventId,
                status: _candidateConstants.STATUS.APPROVED,
                is_published: true
              };
              if (categoryId) filter.categories = categoryId;
              query = this.model.find(filter).sort({
                vote_count: -1,
                view_count: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context36.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context36.a(2, _context36.v);
            case 3:
              _context36.p = 3;
              _t36 = _context36.v;
              throw new Error("Get leaderboard failed: ".concat(_t36.message));
            case 4:
              return _context36.a(2);
          }
        }, _callee36, this, [[1, 3]]);
      }));
      function getLeaderboard(_x36) {
        return _getLeaderboard.apply(this, arguments);
      }
      return getLeaderboard;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new CandidateRepository();