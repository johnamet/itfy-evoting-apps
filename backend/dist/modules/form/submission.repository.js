"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _submissionModel = _interopRequireDefault(require("./submission.model.js"));
var _formConstants = require("../../utils/constants/form.constants.js");
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
 * FormSubmission Repository
 * This file defines the FormSubmissionRepository class which extends the BaseRepository
 * It contains submission-specific data access methods
 */
var FormSubmissionRepository = /*#__PURE__*/function (_BaseRepository) {
  function FormSubmissionRepository() {
    _classCallCheck(this, FormSubmissionRepository);
    return _callSuper(this, FormSubmissionRepository, [_submissionModel["default"]]);
  }

  /**
   * Create a new submission
   * @param {Object} submissionData - Submission data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created submission
   */
  _inherits(FormSubmissionRepository, _BaseRepository);
  return _createClass(FormSubmissionRepository, [{
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(submissionData) {
        var options,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              if (submissionData.form) {
                _context.n = 2;
                break;
              }
              throw new Error("Form ID is required");
            case 2:
              if (submissionData.event) {
                _context.n = 3;
                break;
              }
              throw new Error("Event ID is required");
            case 3:
              if (submissionData.submission_data) {
                _context.n = 4;
                break;
              }
              throw new Error("Submission data is required");
            case 4:
              _context.n = 5;
              return _superPropGet(FormSubmissionRepository, "create", this, 3)([submissionData, options]);
            case 5:
              return _context.a(2, _context.v);
            case 6:
              _context.p = 6;
              _t = _context.v;
              throw new Error("Create submission failed: ".concat(_t.message));
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
     * Update a submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {Object} updates - Update data
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Updated submission
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(submissionId, updates) {
        var options,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.updateById(submissionId, updates, options);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Update submission failed: ".concat(_t2.message));
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
     * Soft delete a submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Deleted submission
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(submissionId) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return _superPropGet(FormSubmissionRepository, "delete", this, 3)([{
                _id: submissionId
              }, options]);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Delete submission failed: ".concat(_t3.message));
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
     * Restore a soft-deleted submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Restored submission
     */
    )
  }, {
    key: "restore",
    value: (function () {
      var _restore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(submissionId) {
        var options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              _context4.n = 2;
              return _superPropGet(FormSubmissionRepository, "restore", this, 3)([{
                _id: submissionId
              }, options]);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Restore submission failed: ".concat(_t4.message));
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
     * Permanently delete a submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Force deleted submission
     */
    )
  }, {
    key: "forceDelete",
    value: (function () {
      var _forceDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(submissionId) {
        var options,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              _context5.n = 2;
              return _superPropGet(FormSubmissionRepository, "forceDelete", this, 3)([{
                _id: submissionId
              }, options]);
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Force delete submission failed: ".concat(_t5.message));
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
     * Find all submissions for a specific form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated submissions
     */
    )
  }, {
    key: "findByForm",
    value: (function () {
      var _findByForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(formId) {
        var page,
          limit,
          options,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
              limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 20;
              options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
              _context6.p = 1;
              _context6.n = 2;
              return this.findAll({
                form: formId
              }, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find submissions by form failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findByForm(_x7) {
        return _findByForm.apply(this, arguments);
      }
      return findByForm;
    }()
    /**
     * Find all submissions for a specific event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated submissions
     */
    )
  }, {
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(eventId) {
        var page,
          limit,
          options,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              page = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 1;
              limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 20;
              options = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
              _context7.p = 1;
              _context7.n = 2;
              return this.findAll({
                event: eventId
              }, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find submissions by event failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findByEvent(_x8) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Find submissions by status
     * @param {string} status - Submission status
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated submissions
     */
    )
  }, {
    key: "findByStatus",
    value: (function () {
      var _findByStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(status) {
        var formId,
          page,
          limit,
          options,
          filter,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              formId = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : null;
              page = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 1;
              limit = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : 20;
              options = _args8.length > 4 && _args8[4] !== undefined ? _args8[4] : {};
              _context8.p = 1;
              if (Object.values(_formConstants.SUBMISSION_STATUS).includes(status)) {
                _context8.n = 2;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 2:
              filter = {
                status: status
              };
              if (formId) filter.form = formId;
              _context8.n = 3;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 3:
              return _context8.a(2, _context8.v);
            case 4:
              _context8.p = 4;
              _t8 = _context8.v;
              throw new Error("Find submissions by status failed: ".concat(_t8.message));
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 4]]);
      }));
      function findByStatus(_x9) {
        return _findByStatus.apply(this, arguments);
      }
      return findByStatus;
    }()
    /**
     * Find all submissions by nominee identifier (multi-category nominations)
     * @param {string} nomineeIdentifier - Nominee identifier hash
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Array of submissions
     */
    )
  }, {
    key: "findByNominee",
    value: (function () {
      var _findByNominee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(nomineeIdentifier) {
        var options,
          query,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              query = this.model.find({
                nominee_identifier: nomineeIdentifier
              }).sort({
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
              throw new Error("Find submissions by nominee failed: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function findByNominee(_x0) {
        return _findByNominee.apply(this, arguments);
      }
      return findByNominee;
    }()
    /**
     * Find submissions by category
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated submissions
     */
    )
  }, {
    key: "findByCategory",
    value: (function () {
      var _findByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(categoryId) {
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
                category: categoryId
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
              throw new Error("Find submissions by category failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function findByCategory(_x1) {
        return _findByCategory.apply(this, arguments);
      }
      return findByCategory;
    }()
    /**
     * Find submissions by submission number
     * @param {string} submissionNumber - Submission number
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Submission or null
     */
    )
  }, {
    key: "findBySubmissionNumber",
    value: (function () {
      var _findBySubmissionNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(submissionNumber) {
        var options,
          query,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              query = this.model.findOne({
                submission_number: submissionNumber
              });
              this._applyOptions(query, options);
              _context1.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Find submission by number failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function findBySubmissionNumber(_x10) {
        return _findBySubmissionNumber.apply(this, arguments);
      }
      return findBySubmissionNumber;
    }()
    /**
     * Find duplicate submissions
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated duplicate submissions
     */
    )
  }, {
    key: "findDuplicates",
    value: (function () {
      var _findDuplicates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(formId) {
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
                form: formId,
                "duplicate_check.is_duplicate": true
              }, page, limit, _objectSpread({
                sort: {
                  "duplicate_check.similarity_score": -1
                }
              }, options));
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Find duplicate submissions failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function findDuplicates(_x11) {
        return _findDuplicates.apply(this, arguments);
      }
      return findDuplicates;
    }()
    /**
     * Find submissions pending review
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated pending submissions
     */
    )
  }, {
    key: "findPendingReview",
    value: (function () {
      var _findPendingReview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var formId,
          page,
          limit,
          options,
          filter,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              formId = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : null;
              page = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 1;
              limit = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : 20;
              options = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : {};
              _context11.p = 1;
              filter = {
                status: _formConstants.SUBMISSION_STATUS.PENDING
              };
              if (formId) filter.form = formId;
              _context11.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: 1
                }
              }, options));
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Find pending submissions failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function findPendingReview() {
        return _findPendingReview.apply(this, arguments);
      }
      return findPendingReview;
    }()
    /**
     * Find submissions under review
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated submissions under review
     */
    )
  }, {
    key: "findUnderReview",
    value: (function () {
      var _findUnderReview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var formId,
          page,
          limit,
          options,
          filter,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              formId = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : null;
              page = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 1;
              limit = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : 20;
              options = _args12.length > 3 && _args12[3] !== undefined ? _args12[3] : {};
              _context12.p = 1;
              filter = {
                status: _formConstants.SUBMISSION_STATUS.UNDER_REVIEW
              };
              if (formId) filter.form = formId;
              _context12.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: 1
                }
              }, options));
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Find submissions under review failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function findUnderReview() {
        return _findUnderReview.apply(this, arguments);
      }
      return findUnderReview;
    }()
    /**
     * Find approved submissions
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated approved submissions
     */
    )
  }, {
    key: "findApproved",
    value: (function () {
      var _findApproved = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var formId,
          page,
          limit,
          options,
          filter,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              formId = _args13.length > 0 && _args13[0] !== undefined ? _args13[0] : null;
              page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
              limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 20;
              options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
              _context13.p = 1;
              filter = {
                status: _formConstants.SUBMISSION_STATUS.APPROVED
              };
              if (formId) filter.form = formId;
              _context13.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  "approval.approved_at": -1
                }
              }, options));
            case 2:
              return _context13.a(2, _context13.v);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Find approved submissions failed: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function findApproved() {
        return _findApproved.apply(this, arguments);
      }
      return findApproved;
    }()
    /**
     * Find rejected submissions
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated rejected submissions
     */
    )
  }, {
    key: "findRejected",
    value: (function () {
      var _findRejected = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var formId,
          page,
          limit,
          options,
          filter,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              formId = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;
              page = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 1;
              limit = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 20;
              options = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
              _context14.p = 1;
              filter = {
                status: _formConstants.SUBMISSION_STATUS.REJECTED
              };
              if (formId) filter.form = formId;
              _context14.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  "approval.approved_at": -1
                }
              }, options));
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Find rejected submissions failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function findRejected() {
        return _findRejected.apply(this, arguments);
      }
      return findRejected;
    }()
    /**
     * Find submissions converted to candidates
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated converted submissions
     */
    )
  }, {
    key: "findConverted",
    value: (function () {
      var _findConverted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var formId,
          page,
          limit,
          options,
          filter,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              formId = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : null;
              page = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 1;
              limit = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : 20;
              options = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
              _context15.p = 1;
              filter = {
                converted_to_candidate: true
              };
              if (formId) filter.form = formId;
              _context15.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  "approval.approved_at": -1
                }
              }, options));
            case 2:
              return _context15.a(2, _context15.v);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw new Error("Find converted submissions failed: ".concat(_t15.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 3]]);
      }));
      function findConverted() {
        return _findConverted.apply(this, arguments);
      }
      return findConverted;
    }()
    /**
     * Group submissions by nominee identifier
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Array>} - Grouped submissions
     */
    )
  }, {
    key: "groupByNominee",
    value: (function () {
      var _groupByNominee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(formId) {
        var grouped, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.model.aggregate([{
                $match: {
                  form: formId,
                  nominee_identifier: {
                    $ne: null
                  }
                }
              }, {
                $group: {
                  _id: "$nominee_identifier",
                  submissions: {
                    $push: "$$ROOT"
                  },
                  count: {
                    $sum: 1
                  },
                  categories: {
                    $addToSet: "$category"
                  },
                  statuses: {
                    $addToSet: "$status"
                  },
                  hasDuplicates: {
                    $max: "$duplicate_check.is_duplicate"
                  },
                  avgSimilarity: {
                    $avg: "$duplicate_check.similarity_score"
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }]);
            case 1:
              grouped = _context16.v;
              return _context16.a(2, grouped);
            case 2:
              _context16.p = 2;
              _t16 = _context16.v;
              throw new Error("Group submissions by nominee failed: ".concat(_t16.message));
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 2]]);
      }));
      function groupByNominee(_x12) {
        return _groupByNominee.apply(this, arguments);
      }
      return groupByNominee;
    }()
    /**
     * Get submission statistics for a form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Submission statistics
     */
    )
  }, {
    key: "getFormStatistics",
    value: (function () {
      var _getFormStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(formId) {
        var _stats$total$, _stats$duplicates$, _stats$converted$, _stats$avgSimilarity$, _stats$uniqueNominees, _yield$this$model$agg, _yield$this$model$agg2, stats, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.model.aggregate([{
                $match: {
                  form: formId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  byStatus: [{
                    $group: {
                      _id: "$status",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }],
                  byCategory: [{
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
                  duplicates: [{
                    $match: {
                      "duplicate_check.is_duplicate": true
                    }
                  }, {
                    $count: "count"
                  }],
                  converted: [{
                    $match: {
                      converted_to_candidate: true
                    }
                  }, {
                    $count: "count"
                  }],
                  avgSimilarity: [{
                    $match: {
                      "duplicate_check.is_duplicate": true
                    }
                  }, {
                    $group: {
                      _id: null,
                      average: {
                        $avg: "$duplicate_check.similarity_score"
                      }
                    }
                  }],
                  uniqueNominees: [{
                    $match: {
                      nominee_identifier: {
                        $ne: null
                      }
                    }
                  }, {
                    $group: {
                      _id: "$nominee_identifier"
                    }
                  }, {
                    $count: "count"
                  }]
                }
              }]);
            case 1:
              _yield$this$model$agg = _context17.v;
              _yield$this$model$agg2 = _slicedToArray(_yield$this$model$agg, 1);
              stats = _yield$this$model$agg2[0];
              return _context17.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
                byStatus: (stats === null || stats === void 0 ? void 0 : stats.byStatus) || [],
                byCategory: (stats === null || stats === void 0 ? void 0 : stats.byCategory) || [],
                duplicates: (stats === null || stats === void 0 || (_stats$duplicates$ = stats.duplicates[0]) === null || _stats$duplicates$ === void 0 ? void 0 : _stats$duplicates$.count) || 0,
                converted: (stats === null || stats === void 0 || (_stats$converted$ = stats.converted[0]) === null || _stats$converted$ === void 0 ? void 0 : _stats$converted$.count) || 0,
                avgDuplicateSimilarity: Math.round(((stats === null || stats === void 0 || (_stats$avgSimilarity$ = stats.avgSimilarity[0]) === null || _stats$avgSimilarity$ === void 0 ? void 0 : _stats$avgSimilarity$.average) || 0) * 10) / 10,
                uniqueNominees: (stats === null || stats === void 0 || (_stats$uniqueNominees = stats.uniqueNominees[0]) === null || _stats$uniqueNominees === void 0 ? void 0 : _stats$uniqueNominees.count) || 0
              });
            case 2:
              _context17.p = 2;
              _t17 = _context17.v;
              throw new Error("Get form statistics failed: ".concat(_t17.message));
            case 3:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 2]]);
      }));
      function getFormStatistics(_x13) {
        return _getFormStatistics.apply(this, arguments);
      }
      return getFormStatistics;
    }()
    /**
     * Get event-wide submission statistics
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Event statistics
     */
    )
  }, {
    key: "getEventStatistics",
    value: (function () {
      var _getEventStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(eventId) {
        var _stats$total$2, _stats$duplicates$2, _stats$converted$2, _stats$uniqueNominees2, _yield$this$model$agg3, _yield$this$model$agg4, stats, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.model.aggregate([{
                $match: {
                  event: eventId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  byStatus: [{
                    $group: {
                      _id: "$status",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }],
                  byForm: [{
                    $group: {
                      _id: "$form",
                      count: {
                        $sum: 1
                      }
                    }
                  }, {
                    $sort: {
                      count: -1
                    }
                  }],
                  byCategory: [{
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
                  duplicates: [{
                    $match: {
                      "duplicate_check.is_duplicate": true
                    }
                  }, {
                    $count: "count"
                  }],
                  converted: [{
                    $match: {
                      converted_to_candidate: true
                    }
                  }, {
                    $count: "count"
                  }],
                  uniqueNominees: [{
                    $match: {
                      nominee_identifier: {
                        $ne: null
                      }
                    }
                  }, {
                    $group: {
                      _id: "$nominee_identifier"
                    }
                  }, {
                    $count: "count"
                  }]
                }
              }]);
            case 1:
              _yield$this$model$agg3 = _context18.v;
              _yield$this$model$agg4 = _slicedToArray(_yield$this$model$agg3, 1);
              stats = _yield$this$model$agg4[0];
              return _context18.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$2 = stats.total[0]) === null || _stats$total$2 === void 0 ? void 0 : _stats$total$2.count) || 0,
                byStatus: (stats === null || stats === void 0 ? void 0 : stats.byStatus) || [],
                byForm: (stats === null || stats === void 0 ? void 0 : stats.byForm) || [],
                byCategory: (stats === null || stats === void 0 ? void 0 : stats.byCategory) || [],
                duplicates: (stats === null || stats === void 0 || (_stats$duplicates$2 = stats.duplicates[0]) === null || _stats$duplicates$2 === void 0 ? void 0 : _stats$duplicates$2.count) || 0,
                converted: (stats === null || stats === void 0 || (_stats$converted$2 = stats.converted[0]) === null || _stats$converted$2 === void 0 ? void 0 : _stats$converted$2.count) || 0,
                uniqueNominees: (stats === null || stats === void 0 || (_stats$uniqueNominees2 = stats.uniqueNominees[0]) === null || _stats$uniqueNominees2 === void 0 ? void 0 : _stats$uniqueNominees2.count) || 0
              });
            case 2:
              _context18.p = 2;
              _t18 = _context18.v;
              throw new Error("Get event statistics failed: ".concat(_t18.message));
            case 3:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 2]]);
      }));
      function getEventStatistics(_x14) {
        return _getEventStatistics.apply(this, arguments);
      }
      return getEventStatistics;
    }()
    /**
     * Check for duplicates for a new submission
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} submissionData - Submission data to check
     * @param {number} [threshold=80] - Similarity threshold (0-100)
     * @returns {Promise<Array>} - Potential duplicates with similarity scores
     */
    )
  }, {
    key: "checkDuplicates",
    value: (function () {
      var _checkDuplicates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(formId, submissionData) {
        var threshold,
          _form$duplicate_detec,
          form,
          duplicates,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              threshold = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : 80;
              _context19.p = 1;
              _context19.n = 2;
              return this.model.db.collection("forms").findOne({
                _id: formId
              });
            case 2:
              form = _context19.v;
              if (!(!form || !((_form$duplicate_detec = form.duplicate_detection) !== null && _form$duplicate_detec !== void 0 && _form$duplicate_detec.enabled))) {
                _context19.n = 3;
                break;
              }
              return _context19.a(2, []);
            case 3:
              _context19.n = 4;
              return _submissionModel["default"].checkForDuplicates(formId, submissionData, threshold);
            case 4:
              duplicates = _context19.v;
              return _context19.a(2, duplicates);
            case 5:
              _context19.p = 5;
              _t19 = _context19.v;
              throw new Error("Check duplicates failed: ".concat(_t19.message));
            case 6:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 5]]);
      }));
      function checkDuplicates(_x15, _x16) {
        return _checkDuplicates.apply(this, arguments);
      }
      return checkDuplicates;
    }()
    /**
     * Approve submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
     * @param {string} [notes] - Optional approval notes
     * @returns {Promise<Object>} - Updated submission
     */
    )
  }, {
    key: "approve",
    value: (function () {
      var _approve = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(submissionId, reviewerId) {
        var notes,
          submission,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              notes = _args20.length > 2 && _args20[2] !== undefined ? _args20[2] : "";
              _context20.p = 1;
              _context20.n = 2;
              return this.model.findById(submissionId);
            case 2:
              submission = _context20.v;
              if (submission) {
                _context20.n = 3;
                break;
              }
              throw new Error("Submission not found");
            case 3:
              _context20.n = 4;
              return submission.approve(reviewerId, notes);
            case 4:
              return _context20.a(2, _context20.v);
            case 5:
              _context20.p = 5;
              _t20 = _context20.v;
              throw new Error("Approve submission failed: ".concat(_t20.message));
            case 6:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 5]]);
      }));
      function approve(_x17, _x18) {
        return _approve.apply(this, arguments);
      }
      return approve;
    }()
    /**
     * Reject submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
     * @param {string} reason - Rejection reason
     * @returns {Promise<Object>} - Updated submission
     */
    )
  }, {
    key: "reject",
    value: (function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(submissionId, reviewerId, reason) {
        var submission, _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              _context21.n = 1;
              return this.model.findById(submissionId);
            case 1:
              submission = _context21.v;
              if (submission) {
                _context21.n = 2;
                break;
              }
              throw new Error("Submission not found");
            case 2:
              _context21.n = 3;
              return submission.reject(reviewerId, reason);
            case 3:
              return _context21.a(2, _context21.v);
            case 4:
              _context21.p = 4;
              _t21 = _context21.v;
              throw new Error("Reject submission failed: ".concat(_t21.message));
            case 5:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 4]]);
      }));
      function reject(_x19, _x20, _x21) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
    /**
     * Mark submission as duplicate
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
     * @param {Array<string|mongoose.Types.ObjectId>} matchedSubmissions - IDs of matched submissions
     * @param {number} similarityScore - Similarity score (0-100)
     * @returns {Promise<Object>} - Updated submission
     */
    )
  }, {
    key: "markAsDuplicate",
    value: (function () {
      var _markAsDuplicate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(submissionId, reviewerId, matchedSubmissions, similarityScore) {
        var submission, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _context22.n = 1;
              return this.model.findById(submissionId);
            case 1:
              submission = _context22.v;
              if (submission) {
                _context22.n = 2;
                break;
              }
              throw new Error("Submission not found");
            case 2:
              _context22.n = 3;
              return submission.markAsDuplicate(reviewerId, matchedSubmissions, similarityScore);
            case 3:
              return _context22.a(2, _context22.v);
            case 4:
              _context22.p = 4;
              _t22 = _context22.v;
              throw new Error("Mark as duplicate failed: ".concat(_t22.message));
            case 5:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 4]]);
      }));
      function markAsDuplicate(_x22, _x23, _x24, _x25) {
        return _markAsDuplicate.apply(this, arguments);
      }
      return markAsDuplicate;
    }()
    /**
     * Convert submission to candidate
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} userId - User performing conversion
     * @param {Object} [additionalData] - Additional candidate data
     * @returns {Promise<Object>} - Created candidate
     */
    )
  }, {
    key: "convertToCandidate",
    value: (function () {
      var _convertToCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(submissionId, userId) {
        var additionalData,
          submission,
          _args23 = arguments,
          _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              additionalData = _args23.length > 2 && _args23[2] !== undefined ? _args23[2] : {};
              _context23.p = 1;
              _context23.n = 2;
              return this.model.findById(submissionId);
            case 2:
              submission = _context23.v;
              if (submission) {
                _context23.n = 3;
                break;
              }
              throw new Error("Submission not found");
            case 3:
              _context23.n = 4;
              return submission.convertToCandidate(userId, additionalData);
            case 4:
              return _context23.a(2, _context23.v);
            case 5:
              _context23.p = 5;
              _t23 = _context23.v;
              throw new Error("Convert to candidate failed: ".concat(_t23.message));
            case 6:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 5]]);
      }));
      function convertToCandidate(_x26, _x27) {
        return _convertToCandidate.apply(this, arguments);
      }
      return convertToCandidate;
    }()
    /**
     * Bulk approve submissions
     * @param {Array<string|mongoose.Types.ObjectId>} submissionIds - Submission IDs
     * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
     * @param {string} [notes] - Optional approval notes
     * @returns {Promise<Object>} - Bulk update result
     */
    )
  }, {
    key: "bulkApprove",
    value: (function () {
      var _bulkApprove = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(submissionIds, reviewerId) {
        var notes,
          result,
          _args24 = arguments,
          _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              notes = _args24.length > 2 && _args24[2] !== undefined ? _args24[2] : "";
              _context24.p = 1;
              _context24.n = 2;
              return this.model.updateMany({
                _id: {
                  $in: submissionIds
                },
                status: {
                  $in: [_formConstants.SUBMISSION_STATUS.PENDING, _formConstants.SUBMISSION_STATUS.UNDER_REVIEW]
                }
              }, {
                $set: {
                  status: _formConstants.SUBMISSION_STATUS.APPROVED,
                  "approval.approved_by": reviewerId,
                  "approval.approved_at": new Date(),
                  "approval.notes": notes
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
              throw new Error("Bulk approve submissions failed: ".concat(_t24.message));
            case 4:
              return _context24.a(2);
          }
        }, _callee24, this, [[1, 3]]);
      }));
      function bulkApprove(_x28, _x29) {
        return _bulkApprove.apply(this, arguments);
      }
      return bulkApprove;
    }()
    /**
     * Bulk reject submissions
     * @param {Array<string|mongoose.Types.ObjectId>} submissionIds - Submission IDs
     * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
     * @param {string} reason - Rejection reason
     * @returns {Promise<Object>} - Bulk update result
     */
    )
  }, {
    key: "bulkReject",
    value: (function () {
      var _bulkReject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(submissionIds, reviewerId, reason) {
        var result, _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.model.updateMany({
                _id: {
                  $in: submissionIds
                },
                status: {
                  $in: [_formConstants.SUBMISSION_STATUS.PENDING, _formConstants.SUBMISSION_STATUS.UNDER_REVIEW]
                }
              }, {
                $set: {
                  status: _formConstants.SUBMISSION_STATUS.REJECTED,
                  "approval.approved_by": reviewerId,
                  "approval.approved_at": new Date(),
                  "approval.notes": reason
                }
              });
            case 1:
              result = _context25.v;
              return _context25.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context25.p = 2;
              _t25 = _context25.v;
              throw new Error("Bulk reject submissions failed: ".concat(_t25.message));
            case 3:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 2]]);
      }));
      function bulkReject(_x30, _x31, _x32) {
        return _bulkReject.apply(this, arguments);
      }
      return bulkReject;
    }()
    /**
     * Set submission under review
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
     * @returns {Promise<Object>} - Updated submission
     */
    )
  }, {
    key: "setUnderReview",
    value: (function () {
      var _setUnderReview = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(submissionId, reviewerId) {
        var _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              _context26.p = 0;
              _context26.n = 1;
              return this.updateById(submissionId, {
                status: _formConstants.SUBMISSION_STATUS.UNDER_REVIEW,
                "approval.approved_by": reviewerId
              });
            case 1:
              return _context26.a(2, _context26.v);
            case 2:
              _context26.p = 2;
              _t26 = _context26.v;
              throw new Error("Set under review failed: ".concat(_t26.message));
            case 3:
              return _context26.a(2);
          }
        }, _callee26, this, [[0, 2]]);
      }));
      function setUnderReview(_x33, _x34) {
        return _setUnderReview.apply(this, arguments);
      }
      return setUnderReview;
    }()
    /**
     * Find submissions by date range
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated submissions
     */
    )
  }, {
    key: "findByDateRange",
    value: (function () {
      var _findByDateRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(startDate, endDate) {
        var formId,
          page,
          limit,
          options,
          filter,
          _args27 = arguments,
          _t27;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              formId = _args27.length > 2 && _args27[2] !== undefined ? _args27[2] : null;
              page = _args27.length > 3 && _args27[3] !== undefined ? _args27[3] : 1;
              limit = _args27.length > 4 && _args27[4] !== undefined ? _args27[4] : 20;
              options = _args27.length > 5 && _args27[5] !== undefined ? _args27[5] : {};
              _context27.p = 1;
              filter = {
                created_at: {
                  $gte: startDate,
                  $lte: endDate
                }
              };
              if (formId) filter.form = formId;
              _context27.n = 2;
              return this.findAll(filter, page, limit, _objectSpread({
                sort: {
                  created_at: -1
                }
              }, options));
            case 2:
              return _context27.a(2, _context27.v);
            case 3:
              _context27.p = 3;
              _t27 = _context27.v;
              throw new Error("Find submissions by date range failed: ".concat(_t27.message));
            case 4:
              return _context27.a(2);
          }
        }, _callee27, this, [[1, 3]]);
      }));
      function findByDateRange(_x35, _x36) {
        return _findByDateRange.apply(this, arguments);
      }
      return findByDateRange;
    }()
    /**
     * Get submissions aggregated by time period
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {string} period - Time period ('day', 'week', 'month', 'year')
     * @returns {Promise<Array>} - Aggregated data
     */
    )
  }, {
    key: "aggregateByTimePeriod",
    value: (function () {
      var _aggregateByTimePeriod = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(formId) {
        var period,
          groupFormats,
          aggregated,
          _args28 = arguments,
          _t28;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              period = _args28.length > 1 && _args28[1] !== undefined ? _args28[1] : "day";
              _context28.p = 1;
              groupFormats = {
                day: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$created_at"
                  }
                },
                week: {
                  $isoWeek: "$created_at"
                },
                month: {
                  $dateToString: {
                    format: "%Y-%m",
                    date: "$created_at"
                  }
                },
                year: {
                  $year: "$created_at"
                }
              };
              if (groupFormats[period]) {
                _context28.n = 2;
                break;
              }
              throw new Error("Invalid period: ".concat(period, ". Use: day, week, month, year"));
            case 2:
              _context28.n = 3;
              return this.model.aggregate([{
                $match: {
                  form: formId
                }
              }, {
                $group: {
                  _id: groupFormats[period],
                  count: {
                    $sum: 1
                  },
                  approved: {
                    $sum: {
                      $cond: [{
                        $eq: ["$status", _formConstants.SUBMISSION_STATUS.APPROVED]
                      }, 1, 0]
                    }
                  },
                  rejected: {
                    $sum: {
                      $cond: [{
                        $eq: ["$status", _formConstants.SUBMISSION_STATUS.REJECTED]
                      }, 1, 0]
                    }
                  },
                  pending: {
                    $sum: {
                      $cond: [{
                        $eq: ["$status", _formConstants.SUBMISSION_STATUS.PENDING]
                      }, 1, 0]
                    }
                  },
                  duplicates: {
                    $sum: {
                      $cond: ["$duplicate_check.is_duplicate", 1, 0]
                    }
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }]);
            case 3:
              aggregated = _context28.v;
              return _context28.a(2, aggregated);
            case 4:
              _context28.p = 4;
              _t28 = _context28.v;
              throw new Error("Aggregate by time period failed: ".concat(_t28.message));
            case 5:
              return _context28.a(2);
          }
        }, _callee28, this, [[1, 4]]);
      }));
      function aggregateByTimePeriod(_x37) {
        return _aggregateByTimePeriod.apply(this, arguments);
      }
      return aggregateByTimePeriod;
    }()
    /**
     * Export submissions for a form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [filters] - Optional filters
     * @returns {Promise<Array>} - Submissions data for export
     */
    )
  }, {
    key: "exportSubmissions",
    value: (function () {
      var _exportSubmissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(formId) {
        var filters,
          query,
          submissions,
          _args29 = arguments,
          _t29;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              filters = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : {};
              _context29.p = 1;
              query = _objectSpread({
                form: formId
              }, filters);
              _context29.n = 2;
              return this.model.find(query).populate("category", "name").populate("approval.approved_by", "name email").sort({
                created_at: -1
              }).lean().exec();
            case 2:
              submissions = _context29.v;
              return _context29.a(2, submissions.map(function (sub) {
                var _sub$category, _sub$approval, _sub$approval2, _sub$duplicate_check, _sub$duplicate_check2;
                return _objectSpread({
                  submission_number: sub.submission_number,
                  category: ((_sub$category = sub.category) === null || _sub$category === void 0 ? void 0 : _sub$category.name) || "N/A",
                  status: sub.status,
                  submitted_at: sub.created_at,
                  approved_at: ((_sub$approval = sub.approval) === null || _sub$approval === void 0 ? void 0 : _sub$approval.approved_at) || null,
                  approved_by: ((_sub$approval2 = sub.approval) === null || _sub$approval2 === void 0 || (_sub$approval2 = _sub$approval2.approved_by) === null || _sub$approval2 === void 0 ? void 0 : _sub$approval2.name) || "N/A",
                  is_duplicate: ((_sub$duplicate_check = sub.duplicate_check) === null || _sub$duplicate_check === void 0 ? void 0 : _sub$duplicate_check.is_duplicate) || false,
                  similarity_score: ((_sub$duplicate_check2 = sub.duplicate_check) === null || _sub$duplicate_check2 === void 0 ? void 0 : _sub$duplicate_check2.similarity_score) || 0,
                  converted_to_candidate: sub.converted_to_candidate
                }, Object.fromEntries(sub.submission_data || new Map()));
              }));
            case 3:
              _context29.p = 3;
              _t29 = _context29.v;
              throw new Error("Export submissions failed: ".concat(_t29.message));
            case 4:
              return _context29.a(2);
          }
        }, _callee29, this, [[1, 3]]);
      }));
      function exportSubmissions(_x38) {
        return _exportSubmissions.apply(this, arguments);
      }
      return exportSubmissions;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new FormSubmissionRepository();