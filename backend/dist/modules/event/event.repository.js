"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _eventModel = _interopRequireDefault(require("./event.model.js"));
var _eventConstants = require("../../utils/constants/event.constants.js");
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Event Repository
 * This file defines the EventRepository class which extends the BaseRepository
 * It contains event-specific data access methods
 */
var EventRepository = /*#__PURE__*/function (_BaseRepository) {
  function EventRepository() {
    _classCallCheck(this, EventRepository);
    return _callSuper(this, EventRepository, [_eventModel["default"]]);
  }

  /**
   * Find upcoming events
   * @param {number} [limit=10] - Maximum number of events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of upcoming events
   */
  _inherits(EventRepository, _BaseRepository);
  return _createClass(EventRepository, [{
    key: "findUpcoming",
    value: (function () {
      var _findUpcoming = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var limit,
          options,
          now,
          query,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              limit = _args.length > 0 && _args[0] !== undefined ? _args[0] : 10;
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              now = new Date();
              query = this.model.find({
                start_date: {
                  $gt: now
                },
                is_published: true,
                status: _eventConstants.STATUS.UPCOMING
              }).sort({
                start_date: 1
              }).limit(limit);
              this._applyOptions(query, options);
              _context.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context.a(2, _context.v);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Find upcoming events failed: ".concat(_t.message));
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function findUpcoming() {
        return _findUpcoming.apply(this, arguments);
      }
      return findUpcoming;
    }()
    /**
     * Find featured events
     * @param {number} [limit=5] - Maximum number of events to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of featured events
     */
    )
  }, {
    key: "findFeatured",
    value: (function () {
      var _findFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var limit,
          options,
          query,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              limit = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 5;
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              query = this.model.find({
                is_featured: true,
                is_published: true
              }).sort({
                start_date: 1
              }).limit(limit);
              this._applyOptions(query, options);
              _context2.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find featured events failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findFeatured() {
        return _findFeatured.apply(this, arguments);
      }
      return findFeatured;
    }()
    /**
     * Find active/ongoing events
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of active events
     */
    )
  }, {
    key: "findActive",
    value: (function () {
      var _findActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var options,
          now,
          query,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _context3.p = 1;
              now = new Date();
              query = this.model.find({
                start_date: {
                  $lte: now
                },
                end_date: {
                  $gte: now
                },
                is_published: true,
                status: _eventConstants.STATUS.ACTIVE
              }).sort({
                start_date: 1
              });
              this._applyOptions(query, options);
              _context3.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find active events failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findActive() {
        return _findActive.apply(this, arguments);
      }
      return findActive;
    }()
    /**
     * Find archived events
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated archived events
     */
    )
  }, {
    key: "findArchived",
    value: (function () {
      var _findArchived = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var page,
          limit,
          options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              page = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 1;
              limit = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 10;
              options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              _context4.p = 1;
              _context4.n = 2;
              return this.findAll({
                status: _eventConstants.STATUS.ARCHIVED
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  end_date: -1
                }
              }));
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Find archived events failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function findArchived() {
        return _findArchived.apply(this, arguments);
      }
      return findArchived;
    }()
    /**
     * Find events by category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
     */
    )
  }, {
    key: "findByCategory",
    value: (function () {
      var _findByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(categoryId) {
        var page,
          limit,
          options,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              page = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 1;
              limit = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 10;
              options = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
              _context5.p = 1;
              _context5.n = 2;
              return this.findAll({
                categories: categoryId,
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Find events by category failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function findByCategory(_x) {
        return _findByCategory.apply(this, arguments);
      }
      return findByCategory;
    }()
    /**
     * Find events by date range
     * @param {Date} startDate - Start of date range
     * @param {Date} endDate - End of date range
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
     */
    )
  }, {
    key: "findByDateRange",
    value: (function () {
      var _findByDateRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(startDate, endDate) {
        var page,
          limit,
          options,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              page = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 1;
              limit = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : 10;
              options = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : {};
              _context6.p = 1;
              _context6.n = 2;
              return this.findAll({
                start_date: {
                  $gte: startDate,
                  $lte: endDate
                },
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find events by date range failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findByDateRange(_x2, _x3) {
        return _findByDateRange.apply(this, arguments);
      }
      return findByDateRange;
    }()
    /**
     * Find events by location (city)
     * @param {string} city - City name
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
     */
    )
  }, {
    key: "findByLocation",
    value: (function () {
      var _findByLocation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(city) {
        var page,
          limit,
          options,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              page = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 1;
              limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 10;
              options = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
              _context7.p = 1;
              _context7.n = 2;
              return this.findAll({
                "location.city": city,
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find events by location failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findByLocation(_x4) {
        return _findByLocation.apply(this, arguments);
      }
      return findByLocation;
    }()
    /**
     * Find events by tags
     * @param {string|Array<string>} tags - Tag(s) to search for
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
     */
    )
  }, {
    key: "findByTags",
    value: (function () {
      var _findByTags = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(tags) {
        var page,
          limit,
          options,
          tagArray,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              page = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 1;
              limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 10;
              options = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
              _context8.p = 1;
              tagArray = Array.isArray(tags) ? tags : [tags];
              _context8.n = 2;
              return this.findAll({
                tags: {
                  $in: tagArray
                },
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Find events by tags failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findByTags(_x5) {
        return _findByTags.apply(this, arguments);
      }
      return findByTags;
    }()
    /**
     * Find events by event type
     * @param {string} eventType - Event type
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
     */
    )
  }, {
    key: "findByType",
    value: (function () {
      var _findByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(eventType) {
        var page,
          limit,
          options,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              page = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 1;
              limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 10;
              options = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
              _context9.p = 1;
              _context9.n = 2;
              return this.findAll({
                event_type: eventType,
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Find events by type failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findByType(_x6) {
        return _findByType.apply(this, arguments);
      }
      return findByType;
    }()
    /**
     * Search events by name or description
     * @param {string} searchTerm - Search term
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated search results
     */
    )
  }, {
    key: "search",
    value: (function () {
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(searchTerm) {
        var page,
          limit,
          options,
          regex,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              page = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : 1;
              limit = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : 10;
              options = _args0.length > 3 && _args0[3] !== undefined ? _args0[3] : {};
              _context0.p = 1;
              regex = new RegExp(searchTerm, "i");
              _context0.n = 2;
              return this.findAll({
                $or: [{
                  name: regex
                }, {
                  description: regex
                }, {
                  tags: regex
                }],
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Search events failed: ".concat(_t0.message));
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
     * Find events created by a specific user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
     */
    )
  }, {
    key: "findByCreator",
    value: (function () {
      var _findByCreator = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(userId) {
        var page,
          limit,
          options,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              page = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : 1;
              limit = _args1.length > 2 && _args1[2] !== undefined ? _args1[2] : 10;
              options = _args1.length > 3 && _args1[3] !== undefined ? _args1[3] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.findAll({
                created_by: userId
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  created_at: -1
                }
              }));
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find events by creator failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findByCreator(_x8) {
        return _findByCreator.apply(this, arguments);
      }
      return findByCreator;
    }()
    /**
     * Find events with available spots
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events with spots
     */
    )
  }, {
    key: "findWithAvailableSpots",
    value: (function () {
      var _findWithAvailableSpots = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var page,
          limit,
          options,
          now,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              page = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 1;
              limit = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 10;
              options = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : {};
              _context10.p = 1;
              now = new Date();
              _context10.n = 2;
              return this.findAll({
                is_published: true,
                start_date: {
                  $gt: now
                },
                $expr: {
                  $lt: ["$current_attendees", "$max_attendees"]
                }
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find events with available spots failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findWithAvailableSpots() {
        return _findWithAvailableSpots.apply(this, arguments);
      }
      return findWithAvailableSpots;
    }()
    /**
     * Find free events
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Query options
     * @returns {Promise<{data: Array, metadata: Object}>} - Paginated free events
     */
    )
  }, {
    key: "findFreeEvents",
    value: (function () {
      var _findFreeEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var page,
          limit,
          options,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              page = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : 1;
              limit = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 10;
              options = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.findAll({
                "registration_fee.is_free": true,
                is_published: true
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  start_date: 1
                }
              }));
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Find free events failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function findFreeEvents() {
        return _findFreeEvents.apply(this, arguments);
      }
      return findFreeEvents;
    }()
    /**
     * Register an attendee for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object|null>} - Updated event
     */
    )
  }, {
    key: "registerAttendee",
    value: (function () {
      var _registerAttendee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(eventId) {
        var event, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.model.findById(eventId);
            case 1:
              event = _context12.v;
              if (event) {
                _context12.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context12.n = 3;
              return event.registerAttendee();
            case 3:
              return _context12.a(2, _context12.v);
            case 4:
              _context12.p = 4;
              _t12 = _context12.v;
              throw new Error("Register attendee failed: ".concat(_t12.message));
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 4]]);
      }));
      function registerAttendee(_x9) {
        return _registerAttendee.apply(this, arguments);
      }
      return registerAttendee;
    }()
    /**
     * Unregister an attendee from an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object|null>} - Updated event
     */
    )
  }, {
    key: "unregisterAttendee",
    value: (function () {
      var _unregisterAttendee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(eventId) {
        var event, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.model.findById(eventId);
            case 1:
              event = _context13.v;
              if (event) {
                _context13.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context13.n = 3;
              return event.unregisterAttendee();
            case 3:
              return _context13.a(2, _context13.v);
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw new Error("Unregister attendee failed: ".concat(_t13.message));
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 4]]);
      }));
      function unregisterAttendee(_x0) {
        return _unregisterAttendee.apply(this, arguments);
      }
      return unregisterAttendee;
    }()
    /**
     * Update event status
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} status - New status
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated event
     */
    )
  }, {
    key: "updateStatus",
    value: (function () {
      var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(eventId, status) {
        var options,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              options = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : {};
              _context14.p = 1;
              if (Object.values(_eventConstants.STATUS).includes(status)) {
                _context14.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              _context14.n = 3;
              return this.updateById(eventId, {
                status: status
              }, options);
            case 3:
              return _context14.a(2, _context14.v);
            case 4:
              _context14.p = 4;
              _t14 = _context14.v;
              throw new Error("Update status failed: ".concat(_t14.message));
            case 5:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 4]]);
      }));
      function updateStatus(_x1, _x10) {
        return _updateStatus.apply(this, arguments);
      }
      return updateStatus;
    }()
    /**
     * Toggle featured status
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated event
     */
    )
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(eventId) {
        var options,
          event,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              options = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
              _context15.p = 1;
              _context15.n = 2;
              return this.findById(eventId);
            case 2:
              event = _context15.v;
              if (event) {
                _context15.n = 3;
                break;
              }
              throw new Error("Event not found");
            case 3:
              _context15.n = 4;
              return this.updateById(eventId, {
                is_featured: !event.is_featured
              }, options);
            case 4:
              return _context15.a(2, _context15.v);
            case 5:
              _context15.p = 5;
              _t15 = _context15.v;
              throw new Error("Toggle featured failed: ".concat(_t15.message));
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 5]]);
      }));
      function toggleFeatured(_x11) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Toggle published status
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Updated event
     */
    )
  }, {
    key: "togglePublished",
    value: (function () {
      var _togglePublished = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(eventId) {
        var options,
          event,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              options = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
              _context16.p = 1;
              _context16.n = 2;
              return this.findById(eventId);
            case 2:
              event = _context16.v;
              if (event) {
                _context16.n = 3;
                break;
              }
              throw new Error("Event not found");
            case 3:
              _context16.n = 4;
              return this.updateById(eventId, {
                is_published: !event.is_published
              }, options);
            case 4:
              return _context16.a(2, _context16.v);
            case 5:
              _context16.p = 5;
              _t16 = _context16.v;
              throw new Error("Toggle published failed: ".concat(_t16.message));
            case 6:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 5]]);
      }));
      function togglePublished(_x12) {
        return _togglePublished.apply(this, arguments);
      }
      return togglePublished;
    }()
    /**
     * Get event statistics
     * @returns {Promise<Object>} - Event statistics
     */
    )
  }, {
    key: "getStatistics",
    value: (function () {
      var _getStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var _yield$this$aggregate, _yield$this$aggregate2, stats, _t17;
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
                  published: [{
                    $match: {
                      is_published: true
                    }
                  }, {
                    $count: "count"
                  }],
                  upcoming: [{
                    $match: {
                      status: _eventConstants.STATUS.UPCOMING,
                      is_published: true
                    }
                  }, {
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _eventConstants.STATUS.ACTIVE,
                      is_published: true
                    }
                  }, {
                    $count: "count"
                  }],
                  archived: [{
                    $match: {
                      status: _eventConstants.STATUS.ARCHIVED
                    }
                  }, {
                    $count: "count"
                  }],
                  featured: [{
                    $match: {
                      is_featured: true,
                      is_published: true
                    }
                  }, {
                    $count: "count"
                  }],
                  totalAttendees: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$current_attendees"
                      }
                    }
                  }]
                }
              }, {
                $project: {
                  total: {
                    $arrayElemAt: ["$total.count", 0]
                  },
                  published: {
                    $arrayElemAt: ["$published.count", 0]
                  },
                  upcoming: {
                    $arrayElemAt: ["$upcoming.count", 0]
                  },
                  active: {
                    $arrayElemAt: ["$active.count", 0]
                  },
                  archived: {
                    $arrayElemAt: ["$archived.count", 0]
                  },
                  featured: {
                    $arrayElemAt: ["$featured.count", 0]
                  },
                  totalAttendees: {
                    $arrayElemAt: ["$totalAttendees.total", 0]
                  }
                }
              }]);
            case 1:
              _yield$this$aggregate = _context17.v;
              _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
              stats = _yield$this$aggregate2[0];
              return _context17.a(2, {
                total: (stats === null || stats === void 0 ? void 0 : stats.total) || 0,
                published: (stats === null || stats === void 0 ? void 0 : stats.published) || 0,
                upcoming: (stats === null || stats === void 0 ? void 0 : stats.upcoming) || 0,
                active: (stats === null || stats === void 0 ? void 0 : stats.active) || 0,
                archived: (stats === null || stats === void 0 ? void 0 : stats.archived) || 0,
                featured: (stats === null || stats === void 0 ? void 0 : stats.featured) || 0,
                totalAttendees: (stats === null || stats === void 0 ? void 0 : stats.totalAttendees) || 0
              });
            case 2:
              _context17.p = 2;
              _t17 = _context17.v;
              throw new Error("Get statistics failed: ".concat(_t17.message));
            case 3:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 2]]);
      }));
      function getStatistics() {
        return _getStatistics.apply(this, arguments);
      }
      return getStatistics;
    }()
    /**
     * Get popular events by attendee count
     * @param {number} [limit=10] - Maximum number of events to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of popular events
     */
    )
  }, {
    key: "findPopular",
    value: (function () {
      var _findPopular = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        var limit,
          options,
          query,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              limit = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : 10;
              options = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
              _context18.p = 1;
              query = this.model.find({
                is_published: true
              }).sort({
                current_attendees: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context18.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context18.a(2, _context18.v);
            case 3:
              _context18.p = 3;
              _t18 = _context18.v;
              throw new Error("Find popular events failed: ".concat(_t18.message));
            case 4:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 3]]);
      }));
      function findPopular() {
        return _findPopular.apply(this, arguments);
      }
      return findPopular;
    }()
    /**
     * Find events by proximity to coordinates
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @param {number} [maxDistance=50000] - Maximum distance in meters (default 50km)
     * @param {number} [limit=10] - Maximum number of events to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of nearby events
     */
    )
  }, {
    key: "findNearby",
    value: (function () {
      var _findNearby = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(lat, lng) {
        var maxDistance,
          limit,
          options,
          query,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              maxDistance = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : 50000;
              limit = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : 10;
              options = _args19.length > 4 && _args19[4] !== undefined ? _args19[4] : {};
              _context19.p = 1;
              query = this.model.find({
                "location.coordinates": {
                  $near: {
                    $geometry: {
                      type: "Point",
                      coordinates: [lng, lat]
                    },
                    $maxDistance: maxDistance
                  }
                },
                is_published: true
              }).limit(limit);
              this._applyOptions(query, options);
              _context19.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context19.a(2, _context19.v);
            case 3:
              _context19.p = 3;
              _t19 = _context19.v;
              throw new Error("Find nearby events failed: ".concat(_t19.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function findNearby(_x13, _x14) {
        return _findNearby.apply(this, arguments);
      }
      return findNearby;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new EventRepository();