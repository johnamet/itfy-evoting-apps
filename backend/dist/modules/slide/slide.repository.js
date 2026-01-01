"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _slideModel = _interopRequireDefault(require("./slide.model.js"));
var _slideConstants = require("../../utils/constants/slide.constants.js");
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Slide Repository
 * This file defines the SlideRepository class which extends the BaseRepository
 * It contains slide-specific data access methods
 */
var SlideRepository = /*#__PURE__*/function (_BaseRepository) {
  function SlideRepository() {
    _classCallCheck(this, SlideRepository);
    return _callSuper(this, SlideRepository, [_slideModel["default"]]);
  }

  /**
   * Create a new slide
   * @param {Object} slideData - Slide data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created slide
   */
  _inherits(SlideRepository, _BaseRepository);
  return _createClass(SlideRepository, [{
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(slideData) {
        var options,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              if (slideData.title) {
                _context.n = 2;
                break;
              }
              throw new Error("Slide title is required");
            case 2:
              if (!(!slideData.image || !slideData.image.url)) {
                _context.n = 3;
                break;
              }
              throw new Error("Slide image is required");
            case 3:
              _context.n = 4;
              return _superPropGet(SlideRepository, "create", this, 3)([slideData, options]);
            case 4:
              return _context.a(2, _context.v);
            case 5:
              _context.p = 5;
              _t = _context.v;
              throw new Error("Create slide failed: ".concat(_t.message));
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 5]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }() // Note: Use inherited updateById(slideId, updates, options) for updates
    /**
     * Soft delete a slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Deleted slide
     */
    )
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(slideId) {
        var options,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              _context2.n = 2;
              return _superPropGet(SlideRepository, "delete", this, 3)([{
                _id: slideId
              }, options]);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Delete slide failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Restore a soft-deleted slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Restored slide
     */
  }, {
    key: "restore",
    value: (function () {
      var _restore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(slideId) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return _superPropGet(SlideRepository, "restore", this, 3)([{
                _id: slideId
              }, options]);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Restore slide failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function restore(_x3) {
        return _restore.apply(this, arguments);
      }
      return restore;
    }()
    /**
     * Permanently delete a slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Force deleted slide
     */
    )
  }, {
    key: "forceDelete",
    value: (function () {
      var _forceDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(slideId) {
        var options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              _context4.n = 2;
              return _superPropGet(SlideRepository, "forceDelete", this, 3)([{
                _id: slideId
              }, options]);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Force delete slide failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function forceDelete(_x4) {
        return _forceDelete.apply(this, arguments);
      }
      return forceDelete;
    }()
    /**
     * Find active slides
     * @param {string} [slideType] - Optional slide type filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of active slides
     */
    )
  }, {
    key: "findActive",
    value: (function () {
      var _findActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var slideType,
          options,
          now,
          filter,
          query,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              slideType = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              now = new Date();
              filter = {
                is_published: true,
                status: _slideConstants.SLIDE_STATUS.ACTIVE,
                $or: [{
                  start_date: null,
                  end_date: null
                }, {
                  start_date: {
                    $lte: now
                  },
                  end_date: {
                    $gte: now
                  }
                }, {
                  start_date: null,
                  end_date: {
                    $gte: now
                  }
                }, {
                  start_date: {
                    $lte: now
                  },
                  end_date: null
                }]
              };
              if (slideType) filter.slide_type = slideType;
              query = this.model.find(filter).sort({
                display_order: 1
              });
              this._applyOptions(query, options);
              _context5.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Find active slides failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function findActive() {
        return _findActive.apply(this, arguments);
      }
      return findActive;
    }()
    /**
     * Find published slides
     * @param {string} [slideType] - Optional slide type filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of published slides
     */
    )
  }, {
    key: "findPublished",
    value: (function () {
      var _findPublished = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var slideType,
          options,
          filter,
          query,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              slideType = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : null;
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.p = 1;
              filter = {
                is_published: true
              };
              if (slideType) filter.slide_type = slideType;
              query = this.model.find(filter).sort({
                display_order: 1
              });
              this._applyOptions(query, options);
              _context6.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find published slides failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findPublished() {
        return _findPublished.apply(this, arguments);
      }
      return findPublished;
    }()
    /**
     * Find draft slides
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of draft slides
     */
    )
  }, {
    key: "findDraft",
    value: (function () {
      var _findDraft = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var options,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              options = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
              _context7.p = 1;
              query = this.model.find({
                status: _slideConstants.SLIDE_STATUS.DRAFT
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context7.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find draft slides failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findDraft() {
        return _findDraft.apply(this, arguments);
      }
      return findDraft;
    }()
    /**
     * Find scheduled slides
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of scheduled slides
     */
    )
  }, {
    key: "findScheduled",
    value: (function () {
      var _findScheduled = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var options,
          now,
          query,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              options = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
              _context8.p = 1;
              now = new Date();
              query = this.model.find({
                status: _slideConstants.SLIDE_STATUS.SCHEDULED,
                start_date: {
                  $gt: now
                }
              }).sort({
                start_date: 1
              });
              this._applyOptions(query, options);
              _context8.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Find scheduled slides failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findScheduled() {
        return _findScheduled.apply(this, arguments);
      }
      return findScheduled;
    }()
    /**
     * Find slides by type
     * @param {string} slideType - Slide type
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of slides
     */
    )
  }, {
    key: "findByType",
    value: (function () {
      var _findByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(slideType) {
        var options,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              if (Object.values(_slideConstants.SLIDE_TYPE).includes(slideType)) {
                _context9.n = 2;
                break;
              }
              throw new Error("Invalid slide type: ".concat(slideType));
            case 2:
              query = this.model.find({
                slide_type: slideType
              }).sort({
                display_order: 1
              });
              this._applyOptions(query, options);
              _context9.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context9.a(2, _context9.v);
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              throw new Error("Find slides by type failed: ".concat(_t9.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 4]]);
      }));
      function findByType(_x5) {
        return _findByType.apply(this, arguments);
      }
      return findByType;
    }()
    /**
     * Find slides by status
     * @param {string} status - Slide status
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of slides
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(status) {
        var options,
          query,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              _context0.p = 1;
              if (Object.values(_slideConstants.SLIDE_STATUS).includes(status)) {
                _context0.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              query = this.model.find({
                status: status
              }).sort({
                display_order: 1
              });
              this._applyOptions(query, options);
              _context0.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context0.a(2, _context0.v);
            case 4:
              _context0.p = 4;
              _t0 = _context0.v;
              throw new Error("Find slides by status failed: ".concat(_t0.message));
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 4]]);
      }));
      function findByStatus(_x6) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Find slides by event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of slides
     */
    )
  }, {
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(eventId) {
        var options,
          query,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              query = this.model.find({
                event: eventId,
                is_published: true
              }).sort({
                display_order: 1
              });
              this._applyOptions(query, options);
              _context1.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find slides by event failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findByEvent(_x7) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Find hero slides
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of hero slides
     */
    )
  }, {
    key: "findHeroSlides",
    value: (function () {
      var _findHeroSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var options,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              options = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.findActive(_slideConstants.SLIDE_TYPE.HERO, options);
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find hero slides failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findHeroSlides() {
        return _findHeroSlides.apply(this, arguments);
      }
      return findHeroSlides;
    }()
    /**
     * Find banner slides
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of banner slides
     */
    )
  }, {
    key: "findBannerSlides",
    value: (function () {
      var _findBannerSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var options,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.findActive(_slideConstants.SLIDE_TYPE.BANNER, options);
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Find banner slides failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function findBannerSlides() {
        return _findBannerSlides.apply(this, arguments);
      }
      return findBannerSlides;
    }()
    /**
     * Find expired slides
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of expired slides
     */
    )
  }, {
    key: "findExpired",
    value: (function () {
      var _findExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var options,
          now,
          query,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              options = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : {};
              _context12.p = 1;
              now = new Date();
              query = this.model.find({
                end_date: {
                  $lt: now
                },
                status: {
                  $ne: _slideConstants.SLIDE_STATUS.INACTIVE
                }
              }).sort({
                end_date: -1
              });
              this._applyOptions(query, options);
              _context12.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Find expired slides failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function findExpired() {
        return _findExpired.apply(this, arguments);
      }
      return findExpired;
    }()
    /**
     * Find slides expiring soon
     * @param {number} [daysThreshold=7] - Days threshold
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of slides expiring soon
     */
    )
  }, {
    key: "findExpiringSoon",
    value: (function () {
      var _findExpiringSoon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var daysThreshold,
          options,
          now,
          futureDate,
          query,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              daysThreshold = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : 7;
              options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
              _context13.p = 1;
              now = new Date();
              futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + daysThreshold);
              query = this.model.find({
                end_date: {
                  $gte: now,
                  $lte: futureDate
                },
                status: _slideConstants.SLIDE_STATUS.ACTIVE
              }).sort({
                end_date: 1
              });
              this._applyOptions(query, options);
              _context13.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context13.a(2, _context13.v);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Find expiring slides failed: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function findExpiringSoon() {
        return _findExpiringSoon.apply(this, arguments);
      }
      return findExpiringSoon;
    }()
    /**
     * Get slide statistics
     * @param {string} [slideType] - Optional slide type filter
     * @returns {Promise<Object>} - Slide statistics
     */
    )
  }, {
    key: "getStatistics",
    value: (function () {
      var _getStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var slideType,
          _stats$totalViews$,
          _stats$totalClicks$,
          _stats$total$,
          _stats$active$,
          _stats$inactive$,
          _stats$draft$,
          _stats$scheduled$,
          _stats$published$,
          matchStage,
          _yield$this$model$agg,
          _yield$this$model$agg2,
          stats,
          totalViews,
          totalClicks,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              slideType = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;
              _context14.p = 1;
              matchStage = slideType ? {
                slide_type: slideType
              } : {};
              _context14.n = 2;
              return this.model.aggregate([{
                $match: matchStage
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _slideConstants.SLIDE_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  inactive: [{
                    $match: {
                      status: _slideConstants.SLIDE_STATUS.INACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  draft: [{
                    $match: {
                      status: _slideConstants.SLIDE_STATUS.DRAFT
                    }
                  }, {
                    $count: "count"
                  }],
                  scheduled: [{
                    $match: {
                      status: _slideConstants.SLIDE_STATUS.SCHEDULED
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
                  totalViews: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$view_count"
                      }
                    }
                  }],
                  totalClicks: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$click_count"
                      }
                    }
                  }],
                  byType: [{
                    $group: {
                      _id: "$slide_type",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }]
                }
              }]);
            case 2:
              _yield$this$model$agg = _context14.v;
              _yield$this$model$agg2 = _slicedToArray(_yield$this$model$agg, 1);
              stats = _yield$this$model$agg2[0];
              totalViews = (stats === null || stats === void 0 || (_stats$totalViews$ = stats.totalViews[0]) === null || _stats$totalViews$ === void 0 ? void 0 : _stats$totalViews$.total) || 0;
              totalClicks = (stats === null || stats === void 0 || (_stats$totalClicks$ = stats.totalClicks[0]) === null || _stats$totalClicks$ === void 0 ? void 0 : _stats$totalClicks$.total) || 0;
              return _context14.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
                active: (stats === null || stats === void 0 || (_stats$active$ = stats.active[0]) === null || _stats$active$ === void 0 ? void 0 : _stats$active$.count) || 0,
                inactive: (stats === null || stats === void 0 || (_stats$inactive$ = stats.inactive[0]) === null || _stats$inactive$ === void 0 ? void 0 : _stats$inactive$.count) || 0,
                draft: (stats === null || stats === void 0 || (_stats$draft$ = stats.draft[0]) === null || _stats$draft$ === void 0 ? void 0 : _stats$draft$.count) || 0,
                scheduled: (stats === null || stats === void 0 || (_stats$scheduled$ = stats.scheduled[0]) === null || _stats$scheduled$ === void 0 ? void 0 : _stats$scheduled$.count) || 0,
                published: (stats === null || stats === void 0 || (_stats$published$ = stats.published[0]) === null || _stats$published$ === void 0 ? void 0 : _stats$published$.count) || 0,
                totalViews: totalViews,
                totalClicks: totalClicks,
                averageCTR: totalViews > 0 ? Math.round(totalClicks / totalViews * 10000) / 100 : 0,
                byType: (stats === null || stats === void 0 ? void 0 : stats.byType) || []
              });
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Get slide statistics failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function getStatistics() {
        return _getStatistics.apply(this, arguments);
      }
      return getStatistics;
    }()
    /**
     * Increment view count
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @param {number} [count=1] - Increment count
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "incrementViews",
    value: (function () {
      var _incrementViews = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(slideId) {
        var count,
          slide,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              count = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 1;
              _context15.p = 1;
              _context15.n = 2;
              return this.model.findById(slideId);
            case 2:
              slide = _context15.v;
              if (slide) {
                _context15.n = 3;
                break;
              }
              throw new Error("Slide not found");
            case 3:
              _context15.n = 4;
              return slide.incrementViews(count);
            case 4:
              return _context15.a(2, _context15.v);
            case 5:
              _context15.p = 5;
              _t15 = _context15.v;
              throw new Error("Increment slide views failed: ".concat(_t15.message));
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 5]]);
      }));
      function incrementViews(_x8) {
        return _incrementViews.apply(this, arguments);
      }
      return incrementViews;
    }()
    /**
     * Increment click count
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @param {number} [count=1] - Increment count
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "incrementClicks",
    value: (function () {
      var _incrementClicks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(slideId) {
        var count,
          slide,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              count = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 1;
              _context16.p = 1;
              _context16.n = 2;
              return this.model.findById(slideId);
            case 2:
              slide = _context16.v;
              if (slide) {
                _context16.n = 3;
                break;
              }
              throw new Error("Slide not found");
            case 3:
              _context16.n = 4;
              return slide.incrementClicks(count);
            case 4:
              return _context16.a(2, _context16.v);
            case 5:
              _context16.p = 5;
              _t16 = _context16.v;
              throw new Error("Increment slide clicks failed: ".concat(_t16.message));
            case 6:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 5]]);
      }));
      function incrementClicks(_x9) {
        return _incrementClicks.apply(this, arguments);
      }
      return incrementClicks;
    }()
    /**
     * Publish slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "publish",
    value: (function () {
      var _publish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(slideId) {
        var slide, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.model.findById(slideId);
            case 1:
              slide = _context17.v;
              if (slide) {
                _context17.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              _context17.n = 3;
              return slide.publish();
            case 3:
              return _context17.a(2, _context17.v);
            case 4:
              _context17.p = 4;
              _t17 = _context17.v;
              throw new Error("Publish slide failed: ".concat(_t17.message));
            case 5:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 4]]);
      }));
      function publish(_x0) {
        return _publish.apply(this, arguments);
      }
      return publish;
    }()
    /**
     * Unpublish slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "unpublish",
    value: (function () {
      var _unpublish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(slideId) {
        var slide, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.model.findById(slideId);
            case 1:
              slide = _context18.v;
              if (slide) {
                _context18.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              _context18.n = 3;
              return slide.unpublish();
            case 3:
              return _context18.a(2, _context18.v);
            case 4:
              _context18.p = 4;
              _t18 = _context18.v;
              throw new Error("Unpublish slide failed: ".concat(_t18.message));
            case 5:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 4]]);
      }));
      function unpublish(_x1) {
        return _unpublish.apply(this, arguments);
      }
      return unpublish;
    }()
    /**
     * Activate slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "activate",
    value: (function () {
      var _activate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(slideId) {
        var slide, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.model.findById(slideId);
            case 1:
              slide = _context19.v;
              if (slide) {
                _context19.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              _context19.n = 3;
              return slide.activate();
            case 3:
              return _context19.a(2, _context19.v);
            case 4:
              _context19.p = 4;
              _t19 = _context19.v;
              throw new Error("Activate slide failed: ".concat(_t19.message));
            case 5:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 4]]);
      }));
      function activate(_x10) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
    /**
     * Deactivate slide
     * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "deactivate",
    value: (function () {
      var _deactivate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(slideId) {
        var slide, _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _context20.n = 1;
              return this.model.findById(slideId);
            case 1:
              slide = _context20.v;
              if (slide) {
                _context20.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              _context20.n = 3;
              return slide.deactivate();
            case 3:
              return _context20.a(2, _context20.v);
            case 4:
              _context20.p = 4;
              _t20 = _context20.v;
              throw new Error("Deactivate slide failed: ".concat(_t20.message));
            case 5:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 4]]);
      }));
      function deactivate(_x11) {
        return _deactivate.apply(this, arguments);
      }
      return deactivate;
    }()
    /**
     * Reorder slides
     * @param {Array<{id: string, order: number}>} slideOrders - Array of slide IDs and their new orders
     * @returns {Promise<Object>} - Update result
     */
    )
  }, {
    key: "reorderSlides",
    value: (function () {
      var _reorderSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(slideOrders) {
        var bulkOps, result, _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              bulkOps = slideOrders.map(function (_ref) {
                var id = _ref.id,
                  order = _ref.order;
                return {
                  updateOne: {
                    filter: {
                      _id: id
                    },
                    update: {
                      $set: {
                        display_order: order
                      }
                    }
                  }
                };
              });
              _context21.n = 1;
              return this.model.bulkWrite(bulkOps);
            case 1:
              result = _context21.v;
              return _context21.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context21.p = 2;
              _t21 = _context21.v;
              throw new Error("Reorder slides failed: ".concat(_t21.message));
            case 3:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 2]]);
      }));
      function reorderSlides(_x12) {
        return _reorderSlides.apply(this, arguments);
      }
      return reorderSlides;
    }()
    /**
     * Auto-deactivate expired slides
     * @returns {Promise<Object>} - Update result
     */
    )
  }, {
    key: "autoDeactivateExpired",
    value: (function () {
      var _autoDeactivateExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
        var now, result, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              now = new Date();
              _context22.n = 1;
              return this.model.updateMany({
                end_date: {
                  $lt: now
                },
                status: _slideConstants.SLIDE_STATUS.ACTIVE
              }, {
                $set: {
                  status: _slideConstants.SLIDE_STATUS.INACTIVE
                }
              });
            case 1:
              result = _context22.v;
              return _context22.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context22.p = 2;
              _t22 = _context22.v;
              throw new Error("Auto deactivate expired slides failed: ".concat(_t22.message));
            case 3:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 2]]);
      }));
      function autoDeactivateExpired() {
        return _autoDeactivateExpired.apply(this, arguments);
      }
      return autoDeactivateExpired;
    }()
    /**
     * Auto-activate scheduled slides
     * @returns {Promise<Object>} - Update result
     */
    )
  }, {
    key: "autoActivateScheduled",
    value: (function () {
      var _autoActivateScheduled = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
        var now, result, _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              now = new Date();
              _context23.n = 1;
              return this.model.updateMany({
                status: _slideConstants.SLIDE_STATUS.SCHEDULED,
                start_date: {
                  $lte: now
                }
              }, {
                $set: {
                  status: _slideConstants.SLIDE_STATUS.ACTIVE
                }
              });
            case 1:
              result = _context23.v;
              return _context23.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context23.p = 2;
              _t23 = _context23.v;
              throw new Error("Auto activate scheduled slides failed: ".concat(_t23.message));
            case 3:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 2]]);
      }));
      function autoActivateScheduled() {
        return _autoActivateScheduled.apply(this, arguments);
      }
      return autoActivateScheduled;
    }()
    /**
     * Bulk update slide status
     * @param {Array<string|mongoose.Types.ObjectId>} slideIds - Slide IDs
     * @param {string} status - New status
     * @returns {Promise<Object>} - Update result
     */
    )
  }, {
    key: "bulkUpdateStatus",
    value: (function () {
      var _bulkUpdateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(slideIds, status) {
        var result, _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              if (Object.values(_slideConstants.SLIDE_STATUS).includes(status)) {
                _context24.n = 1;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 1:
              _context24.n = 2;
              return this.model.updateMany({
                _id: {
                  $in: slideIds
                }
              }, {
                $set: {
                  status: status
                }
              });
            case 2:
              result = _context24.v;
              return _context24.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 3:
              _context24.p = 3;
              _t24 = _context24.v;
              throw new Error("Bulk update slide status failed: ".concat(_t24.message));
            case 4:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 3]]);
      }));
      function bulkUpdateStatus(_x13, _x14) {
        return _bulkUpdateStatus.apply(this, arguments);
      }
      return bulkUpdateStatus;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new SlideRepository();