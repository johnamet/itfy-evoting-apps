"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _formModel = _interopRequireDefault(require("./form.model.js"));
var _formConstants = require("../../utils/constants/form.constants.js");
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Form Repository
 * This file defines the FormRepository class which extends the BaseRepository
 * It contains form-specific data access methods
 */
var FormRepository = /*#__PURE__*/function (_BaseRepository) {
  function FormRepository() {
    _classCallCheck(this, FormRepository);
    return _callSuper(this, FormRepository, [_formModel["default"]]);
  }

  /**
   * Create a new form
   * @param {Object} formData - Form data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created form
   */
  _inherits(FormRepository, _BaseRepository);
  return _createClass(FormRepository, [{
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(formData) {
        var options,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              if (formData.name) {
                _context.n = 2;
                break;
              }
              throw new Error("Form name is required");
            case 2:
              if (formData.event) {
                _context.n = 3;
                break;
              }
              throw new Error("Event ID is required");
            case 3:
              if (formData.form_type) {
                _context.n = 4;
                break;
              }
              throw new Error("Form type is required");
            case 4:
              _context.n = 5;
              return _superPropGet(FormRepository, "create", this, 3)([formData, options]);
            case 5:
              return _context.a(2, _context.v);
            case 6:
              _context.p = 6;
              _t = _context.v;
              throw new Error("Create form failed: ".concat(_t.message));
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[1, 6]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Update a form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} updates - Update data
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(formId, updates) {
        var options,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.updateById(formId, updates, options);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Update form failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Soft delete a form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Deleted form
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(formId) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return _superPropGet(FormRepository, "delete", this, 3)([{
                _id: formId
              }, options]);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Delete form failed: ".concat(_t3.message));
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
     * Restore a soft-deleted form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Restored form
     */
    )
  }, {
    key: "restore",
    value: (function () {
      var _restore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(formId) {
        var options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              _context4.n = 2;
              return _superPropGet(FormRepository, "restore", this, 3)([{
                _id: formId
              }, options]);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Restore form failed: ".concat(_t4.message));
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
     * Permanently delete a form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Force deleted form
     */
    )
  }, {
    key: "forceDelete",
    value: (function () {
      var _forceDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(formId) {
        var options,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              _context5.n = 2;
              return _superPropGet(FormRepository, "forceDelete", this, 3)([{
                _id: formId
              }, options]);
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Force delete form failed: ".concat(_t5.message));
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
     * Find all forms for a specific event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms
     */
    )
  }, {
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(eventId) {
        var options,
          query,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.p = 1;
              query = this.model.find({
                event: eventId
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context6.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find forms by event failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findByEvent(_x7) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Find forms by type
     * @param {string} formType - Form type
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms
     */
    )
  }, {
    key: "findByType",
    value: (function () {
      var _findByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(formType) {
        var eventId,
          options,
          filter,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              eventId = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : null;
              options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
              _context7.p = 1;
              if (Object.values(_formConstants.FORM_TYPE).includes(formType)) {
                _context7.n = 2;
                break;
              }
              throw new Error("Invalid form type: ".concat(formType));
            case 2:
              filter = {
                form_type: formType
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context7.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context7.a(2, _context7.v);
            case 4:
              _context7.p = 4;
              _t7 = _context7.v;
              throw new Error("Find forms by type failed: ".concat(_t7.message));
            case 5:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 4]]);
      }));
      function findByType(_x8) {
        return _findByType.apply(this, arguments);
      }
      return findByType;
    }()
    /**
     * Find active forms (open and accepting submissions)
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of active forms
     */
    )
  }, {
    key: "findActive",
    value: (function () {
      var _findActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var eventId,
          options,
          now,
          filter,
          query,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              eventId = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : null;
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              _context8.p = 1;
              now = new Date();
              filter = {
                status: _formConstants.FORM_STATUS.ACTIVE,
                is_published: true,
                $or: [{
                  open_date: null,
                  close_date: null
                }, {
                  open_date: {
                    $lte: now
                  },
                  close_date: {
                    $gte: now
                  }
                }, {
                  open_date: null,
                  close_date: {
                    $gte: now
                  }
                }, {
                  open_date: {
                    $lte: now
                  },
                  close_date: null
                }]
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
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
              throw new Error("Find active forms failed: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function findActive() {
        return _findActive.apply(this, arguments);
      }
      return findActive;
    }()
    /**
     * Find published forms
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of published forms
     */
    )
  }, {
    key: "findPublished",
    value: (function () {
      var _findPublished = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
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
                is_published: true
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context9.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Find published forms failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findPublished() {
        return _findPublished.apply(this, arguments);
      }
      return findPublished;
    }()
    /**
     * Find draft forms
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of draft forms
     */
    )
  }, {
    key: "findDraft",
    value: (function () {
      var _findDraft = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
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
                status: _formConstants.FORM_STATUS.DRAFT
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
              throw new Error("Find draft forms failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function findDraft() {
        return _findDraft.apply(this, arguments);
      }
      return findDraft;
    }()
    /**
     * Find closed forms
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of closed forms
     */
    )
  }, {
    key: "findClosed",
    value: (function () {
      var _findClosed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var eventId,
          options,
          now,
          filter,
          query,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              eventId = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : null;
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              now = new Date();
              filter = {
                $or: [{
                  status: _formConstants.FORM_STATUS.CLOSED
                }, {
                  close_date: {
                    $lte: now
                  }
                }]
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                close_date: -1
              });
              this._applyOptions(query, options);
              _context1.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find closed forms failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findClosed() {
        return _findClosed.apply(this, arguments);
      }
      return findClosed;
    }()
    /**
     * Find form by slug
     * @param {string} slug - Form slug
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Form or null
     */
    )
  }, {
    key: "findBySlug",
    value: (function () {
      var _findBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(slug) {
        var options,
          query,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              query = this.model.findOne({
                slug: slug
              });
              this._applyOptions(query, options);
              _context10.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find form by slug failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findBySlug(_x9) {
        return _findBySlug.apply(this, arguments);
      }
      return findBySlug;
    }()
    /**
     * Find forms by status
     * @param {string} status - Form status
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(status) {
        var eventId,
          options,
          filter,
          query,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              eventId = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : null;
              options = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
              _context11.p = 1;
              if (Object.values(_formConstants.FORM_STATUS).includes(status)) {
                _context11.n = 2;
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
              _context11.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context11.a(2, _context11.v);
            case 4:
              _context11.p = 4;
              _t11 = _context11.v;
              throw new Error("Find forms by status failed: ".concat(_t11.message));
            case 5:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 4]]);
      }));
      function findByStatus(_x0) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Find forms for a category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms
     */
    )
  }, {
    key: "findByCategory",
    value: (function () {
      var _findByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(categoryId) {
        var options,
          query,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.p = 1;
              query = this.model.find({
                categories: categoryId,
                status: _formConstants.FORM_STATUS.ACTIVE,
                is_published: true
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context12.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Find forms by category failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function findByCategory(_x1) {
        return _findByCategory.apply(this, arguments);
      }
      return findByCategory;
    }()
    /**
     * Find nomination forms
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of nomination forms
     */
    )
  }, {
    key: "findNominationForms",
    value: (function () {
      var _findNominationForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var eventId,
          options,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              eventId = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : null;
              options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
              _context13.p = 1;
              _context13.n = 2;
              return this.findByType(_formConstants.FORM_TYPE.NOMINATION, eventId, options);
            case 2:
              return _context13.a(2, _context13.v);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Find nomination forms failed: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function findNominationForms() {
        return _findNominationForms.apply(this, arguments);
      }
      return findNominationForms;
    }()
    /**
     * Find registration forms
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of registration forms
     */
    )
  }, {
    key: "findRegistrationForms",
    value: (function () {
      var _findRegistrationForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var eventId,
          options,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              eventId = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;
              options = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
              _context14.p = 1;
              _context14.n = 2;
              return this.findByType(_formConstants.FORM_TYPE.REGISTRATION, eventId, options);
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Find registration forms failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function findRegistrationForms() {
        return _findRegistrationForms.apply(this, arguments);
      }
      return findRegistrationForms;
    }()
    /**
     * Find forms with multi-category nomination enabled
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms
     */
    )
  }, {
    key: "findMultiCategoryForms",
    value: (function () {
      var _findMultiCategoryForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var eventId,
          options,
          filter,
          query,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              eventId = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : null;
              options = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
              _context15.p = 1;
              filter = {
                "multi_category_nomination.enabled": true,
                form_type: _formConstants.FORM_TYPE.NOMINATION
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context15.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context15.a(2, _context15.v);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw new Error("Find multi-category forms failed: ".concat(_t15.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 3]]);
      }));
      function findMultiCategoryForms() {
        return _findMultiCategoryForms.apply(this, arguments);
      }
      return findMultiCategoryForms;
    }()
    /**
     * Find forms with duplicate detection enabled
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms
     */
    )
  }, {
    key: "findWithDuplicateDetection",
    value: (function () {
      var _findWithDuplicateDetection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var eventId,
          options,
          filter,
          query,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              eventId = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : null;
              options = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
              _context16.p = 1;
              filter = {
                "duplicate_detection.enabled": true
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context16.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context16.a(2, _context16.v);
            case 3:
              _context16.p = 3;
              _t16 = _context16.v;
              throw new Error("Find forms with duplicate detection failed: ".concat(_t16.message));
            case 4:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 3]]);
      }));
      function findWithDuplicateDetection() {
        return _findWithDuplicateDetection.apply(this, arguments);
      }
      return findWithDuplicateDetection;
    }()
    /**
     * Find forms closing soon
     * @param {number} [daysThreshold=7] - Number of days to check
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of forms closing soon
     */
    )
  }, {
    key: "findClosingSoon",
    value: (function () {
      var _findClosingSoon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var daysThreshold,
          eventId,
          options,
          now,
          futureDate,
          filter,
          query,
          _args17 = arguments,
          _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              daysThreshold = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : 7;
              eventId = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : null;
              options = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : {};
              _context17.p = 1;
              now = new Date();
              futureDate = new Date();
              futureDate.setDate(futureDate.getDate() + daysThreshold);
              filter = {
                close_date: {
                  $gte: now,
                  $lte: futureDate
                },
                status: _formConstants.FORM_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              query = this.model.find(filter).sort({
                close_date: 1
              });
              this._applyOptions(query, options);
              _context17.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context17.a(2, _context17.v);
            case 3:
              _context17.p = 3;
              _t17 = _context17.v;
              throw new Error("Find forms closing soon failed: ".concat(_t17.message));
            case 4:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function findClosingSoon() {
        return _findClosingSoon.apply(this, arguments);
      }
      return findClosingSoon;
    }()
    /**
     * Get form statistics
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @returns {Promise<Object>} - Form statistics
     */
    )
  }, {
    key: "getStatistics",
    value: (function () {
      var _getStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        var eventId,
          _stats$total$,
          _stats$active$,
          _stats$draft$,
          _stats$closed$,
          _stats$archived$,
          _stats$published$,
          _stats$totalSubmissio,
          _stats$totalApproved$,
          _stats$totalDuplicate,
          _stats$avgSubmissions,
          matchStage,
          _yield$this$model$agg,
          _yield$this$model$agg2,
          stats,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              eventId = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : null;
              _context18.p = 1;
              matchStage = eventId ? {
                event: eventId
              } : {};
              _context18.n = 2;
              return this.model.aggregate([{
                $match: matchStage
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _formConstants.FORM_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  draft: [{
                    $match: {
                      status: _formConstants.FORM_STATUS.DRAFT
                    }
                  }, {
                    $count: "count"
                  }],
                  closed: [{
                    $match: {
                      status: _formConstants.FORM_STATUS.CLOSED
                    }
                  }, {
                    $count: "count"
                  }],
                  archived: [{
                    $match: {
                      status: _formConstants.FORM_STATUS.ARCHIVED
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
                  byType: [{
                    $group: {
                      _id: "$form_type",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }],
                  totalSubmissions: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$total_submissions"
                      }
                    }
                  }],
                  totalApproved: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$approved_submissions"
                      }
                    }
                  }],
                  totalDuplicates: [{
                    $group: {
                      _id: null,
                      total: {
                        $sum: "$duplicate_submissions"
                      }
                    }
                  }],
                  avgSubmissionsPerForm: [{
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$total_submissions"
                      }
                    }
                  }]
                }
              }]);
            case 2:
              _yield$this$model$agg = _context18.v;
              _yield$this$model$agg2 = _slicedToArray(_yield$this$model$agg, 1);
              stats = _yield$this$model$agg2[0];
              return _context18.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
                active: (stats === null || stats === void 0 || (_stats$active$ = stats.active[0]) === null || _stats$active$ === void 0 ? void 0 : _stats$active$.count) || 0,
                draft: (stats === null || stats === void 0 || (_stats$draft$ = stats.draft[0]) === null || _stats$draft$ === void 0 ? void 0 : _stats$draft$.count) || 0,
                closed: (stats === null || stats === void 0 || (_stats$closed$ = stats.closed[0]) === null || _stats$closed$ === void 0 ? void 0 : _stats$closed$.count) || 0,
                archived: (stats === null || stats === void 0 || (_stats$archived$ = stats.archived[0]) === null || _stats$archived$ === void 0 ? void 0 : _stats$archived$.count) || 0,
                published: (stats === null || stats === void 0 || (_stats$published$ = stats.published[0]) === null || _stats$published$ === void 0 ? void 0 : _stats$published$.count) || 0,
                byType: (stats === null || stats === void 0 ? void 0 : stats.byType) || [],
                totalSubmissions: (stats === null || stats === void 0 || (_stats$totalSubmissio = stats.totalSubmissions[0]) === null || _stats$totalSubmissio === void 0 ? void 0 : _stats$totalSubmissio.total) || 0,
                totalApproved: (stats === null || stats === void 0 || (_stats$totalApproved$ = stats.totalApproved[0]) === null || _stats$totalApproved$ === void 0 ? void 0 : _stats$totalApproved$.total) || 0,
                totalDuplicates: (stats === null || stats === void 0 || (_stats$totalDuplicate = stats.totalDuplicates[0]) === null || _stats$totalDuplicate === void 0 ? void 0 : _stats$totalDuplicate.total) || 0,
                averageSubmissionsPerForm: Math.round(((stats === null || stats === void 0 || (_stats$avgSubmissions = stats.avgSubmissionsPerForm[0]) === null || _stats$avgSubmissions === void 0 ? void 0 : _stats$avgSubmissions.average) || 0) * 10) / 10
              });
            case 3:
              _context18.p = 3;
              _t18 = _context18.v;
              throw new Error("Get form statistics failed: ".concat(_t18.message));
            case 4:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 3]]);
      }));
      function getStatistics() {
        return _getStatistics.apply(this, arguments);
      }
      return getStatistics;
    }()
    /**
     * Get form with submission stats
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Form with detailed statistics
     */
    )
  }, {
    key: "getWithStats",
    value: (function () {
      var _getWithStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(formId) {
        var _yield$this$model$agg3, _yield$this$model$agg4, result, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.model.aggregate([{
                $match: {
                  _id: formId
                }
              }, {
                $lookup: {
                  from: "formsubmissions",
                  localField: "_id",
                  foreignField: "form",
                  as: "submissions"
                }
              }, {
                $addFields: {
                  stats: {
                    total: {
                      $size: "$submissions"
                    },
                    pending: {
                      $size: {
                        $filter: {
                          input: "$submissions",
                          as: "sub",
                          cond: {
                            $eq: ["$$sub.status", "pending"]
                          }
                        }
                      }
                    },
                    approved: {
                      $size: {
                        $filter: {
                          input: "$submissions",
                          as: "sub",
                          cond: {
                            $eq: ["$$sub.status", "approved"]
                          }
                        }
                      }
                    },
                    rejected: {
                      $size: {
                        $filter: {
                          input: "$submissions",
                          as: "sub",
                          cond: {
                            $eq: ["$$sub.status", "rejected"]
                          }
                        }
                      }
                    },
                    duplicates: {
                      $size: {
                        $filter: {
                          input: "$submissions",
                          as: "sub",
                          cond: {
                            $eq: ["$$sub.duplicate_check.is_duplicate", true]
                          }
                        }
                      }
                    }
                  }
                }
              }, {
                $project: {
                  submissions: 0
                }
              }]);
            case 1:
              _yield$this$model$agg3 = _context19.v;
              _yield$this$model$agg4 = _slicedToArray(_yield$this$model$agg3, 1);
              result = _yield$this$model$agg4[0];
              return _context19.a(2, result);
            case 2:
              _context19.p = 2;
              _t19 = _context19.v;
              throw new Error("Get form with stats failed: ".concat(_t19.message));
            case 3:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 2]]);
      }));
      function getWithStats(_x10) {
        return _getWithStats.apply(this, arguments);
      }
      return getWithStats;
    }()
    /**
     * Update form field
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {string} fieldId - Field ID
     * @param {Object} updates - Field updates
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "updateField",
    value: (function () {
      var _updateField = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(formId, fieldId, updates) {
        var form, fieldIndex, _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _context20.n = 1;
              return this.model.findById(formId);
            case 1:
              form = _context20.v;
              if (form) {
                _context20.n = 2;
                break;
              }
              throw new Error("Form not found");
            case 2:
              fieldIndex = form.fields.findIndex(function (f) {
                return f.field_id === fieldId;
              });
              if (!(fieldIndex === -1)) {
                _context20.n = 3;
                break;
              }
              throw new Error("Field not found");
            case 3:
              form.fields[fieldIndex] = _objectSpread(_objectSpread({}, form.fields[fieldIndex].toObject()), updates);
              _context20.n = 4;
              return form.save();
            case 4:
              return _context20.a(2, _context20.v);
            case 5:
              _context20.p = 5;
              _t20 = _context20.v;
              throw new Error("Update form field failed: ".concat(_t20.message));
            case 6:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 5]]);
      }));
      function updateField(_x11, _x12, _x13) {
        return _updateField.apply(this, arguments);
      }
      return updateField;
    }()
    /**
     * Add field to form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} fieldData - Field data
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "addField",
    value: (function () {
      var _addField = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(formId, fieldData) {
        var form, _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              _context21.n = 1;
              return this.model.findById(formId);
            case 1:
              form = _context21.v;
              if (form) {
                _context21.n = 2;
                break;
              }
              throw new Error("Form not found");
            case 2:
              _context21.n = 3;
              return form.addField(fieldData);
            case 3:
              return _context21.a(2, _context21.v);
            case 4:
              _context21.p = 4;
              _t21 = _context21.v;
              throw new Error("Add form field failed: ".concat(_t21.message));
            case 5:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 4]]);
      }));
      function addField(_x14, _x15) {
        return _addField.apply(this, arguments);
      }
      return addField;
    }()
    /**
     * Remove field from form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {string} fieldId - Field ID
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "removeField",
    value: (function () {
      var _removeField = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(formId, fieldId) {
        var form, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _context22.n = 1;
              return this.model.findById(formId);
            case 1:
              form = _context22.v;
              if (form) {
                _context22.n = 2;
                break;
              }
              throw new Error("Form not found");
            case 2:
              _context22.n = 3;
              return form.removeField(fieldId);
            case 3:
              return _context22.a(2, _context22.v);
            case 4:
              _context22.p = 4;
              _t22 = _context22.v;
              throw new Error("Remove form field failed: ".concat(_t22.message));
            case 5:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 4]]);
      }));
      function removeField(_x16, _x17) {
        return _removeField.apply(this, arguments);
      }
      return removeField;
    }()
    /**
     * Publish form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "publish",
    value: (function () {
      var _publish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(formId) {
        var _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _context23.n = 1;
              return this.updateById(formId, {
                is_published: true,
                status: _formConstants.FORM_STATUS.ACTIVE
              });
            case 1:
              return _context23.a(2, _context23.v);
            case 2:
              _context23.p = 2;
              _t23 = _context23.v;
              throw new Error("Publish form failed: ".concat(_t23.message));
            case 3:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 2]]);
      }));
      function publish(_x18) {
        return _publish.apply(this, arguments);
      }
      return publish;
    }()
    /**
     * Unpublish form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "unpublish",
    value: (function () {
      var _unpublish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(formId) {
        var _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.updateById(formId, {
                is_published: false
              });
            case 1:
              return _context24.a(2, _context24.v);
            case 2:
              _context24.p = 2;
              _t24 = _context24.v;
              throw new Error("Unpublish form failed: ".concat(_t24.message));
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 2]]);
      }));
      function unpublish(_x19) {
        return _unpublish.apply(this, arguments);
      }
      return unpublish;
    }()
    /**
     * Close form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "close",
    value: (function () {
      var _close = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(formId) {
        var _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.updateById(formId, {
                status: _formConstants.FORM_STATUS.CLOSED
              });
            case 1:
              return _context25.a(2, _context25.v);
            case 2:
              _context25.p = 2;
              _t25 = _context25.v;
              throw new Error("Close form failed: ".concat(_t25.message));
            case 3:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 2]]);
      }));
      function close(_x20) {
        return _close.apply(this, arguments);
      }
      return close;
    }()
    /**
     * Auto-close expired forms
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
     * @returns {Promise<Object>} - Update result
     */
    )
  }, {
    key: "autoCloseExpired",
    value: (function () {
      var _autoCloseExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
        var eventId,
          now,
          filter,
          result,
          _args26 = arguments,
          _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              eventId = _args26.length > 0 && _args26[0] !== undefined ? _args26[0] : null;
              _context26.p = 1;
              now = new Date();
              filter = {
                close_date: {
                  $lt: now
                },
                status: _formConstants.FORM_STATUS.ACTIVE
              };
              if (eventId) filter.event = eventId;
              _context26.n = 2;
              return this.model.updateMany(filter, {
                $set: {
                  status: _formConstants.FORM_STATUS.CLOSED
                }
              });
            case 2:
              result = _context26.v;
              return _context26.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 3:
              _context26.p = 3;
              _t26 = _context26.v;
              throw new Error("Auto close expired forms failed: ".concat(_t26.message));
            case 4:
              return _context26.a(2);
          }
        }, _callee26, this, [[1, 3]]);
      }));
      function autoCloseExpired() {
        return _autoCloseExpired.apply(this, arguments);
      }
      return autoCloseExpired;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new FormRepository();