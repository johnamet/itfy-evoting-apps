"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _formRepository = _interopRequireDefault(require("./form.repository.js"));
var _formValidation = _interopRequireDefault(require("./form.validation.js"));
var _formConstants = require("../../utils/constants/form.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
_baseService["default"].setValidation(_formValidation["default"]);

/**
 * Form Service
 * Handles business logic for dynamic form management including field mapping for candidate creation
 */
var FormService = exports.FormService = /*#__PURE__*/function (_BaseService) {
  function FormService() {
    var _this;
    _classCallCheck(this, FormService);
    _this = _callSuper(this, FormService);
    _this.repository = _formRepository["default"];
    return _this;
  }

  // ==================== FORM CRUD ====================

  /**
   * Create a new form
   * @param {Object} formData - Form data
   * @param {string|mongoose.Types.ObjectId} createdBy - User ID who created the form
   * @returns {Promise<Object>} - Created form
   */
  _inherits(FormService, _BaseService);
  return _createClass(FormService, [{
    key: "createForm",
    value: function () {
      var _createForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(formData, createdBy) {
        var _validated$candidate_, validated, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate input
              validated = this.validate(formData, _formValidation["default"].createFormSchema);
              data = _objectSpread(_objectSpread({}, validated), {}, {
                created_by: createdBy
              }); // Validate nomination form field mappings if provided
              if (validated.form_type === _formConstants.FORM_TYPE.NOMINATION && (_validated$candidate_ = validated.candidate_field_mapping) !== null && _validated$candidate_ !== void 0 && _validated$candidate_.enabled) {
                this.validateFieldMapping(validated.candidate_field_mapping.mappings);
              }
              _context.n = 1;
              return this.repository.create(data);
            case 1:
              return _context.a(2, _context.v);
            case 2:
              _context.p = 2;
              _t = _context.v;
              throw new Error("Create form failed: ".concat(_t.message));
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function createForm(_x, _x2) {
        return _createForm.apply(this, arguments);
      }
      return createForm;
    }()
    /**
     * Update form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} updateData - Update data
     * @param {string|mongoose.Types.ObjectId} updatedBy - User ID who updated the form
     * @returns {Promise<Object>} - Updated form
     */
  }, {
    key: "updateForm",
    value: (function () {
      var _updateForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(formId, updateData, updatedBy) {
        var _validated$candidate_2, validated, data, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              // Validate input
              validated = this.validate(updateData, _formValidation["default"].updateFormSchema); // Validate field mappings if being updated
              if ((_validated$candidate_2 = validated.candidate_field_mapping) !== null && _validated$candidate_2 !== void 0 && _validated$candidate_2.enabled) {
                this.validateFieldMapping(validated.candidate_field_mapping.mappings);
              }
              data = _objectSpread(_objectSpread({}, validated), {}, {
                updated_by: updatedBy
              });
              _context2.n = 1;
              return this.repository.updateById(formId, data);
            case 1:
              return _context2.a(2, _context2.v);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              throw new Error("Update form failed: ".concat(_t2.message));
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function updateForm(_x3, _x4, _x5) {
        return _updateForm.apply(this, arguments);
      }
      return updateForm;
    }()
    /**
     * Get form by ID with all details
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Form with details
     */
    )
  }, {
    key: "getFormById",
    value: (function () {
      var _getFormById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(formId) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return this.repository.findById(formId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "categories", "created_by", "updated_by"]
              }));
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Get form failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function getFormById(_x6) {
        return _getFormById.apply(this, arguments);
      }
      return getFormById;
    }()
    /**
     * Get form by slug
     * @param {string} slug - Form slug
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Form
     */
    )
  }, {
    key: "getFormBySlug",
    value: (function () {
      var _getFormBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(slug) {
        var options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              _context4.n = 2;
              return this.repository.findOne({
                slug: slug
              }, options);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Get form by slug failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function getFormBySlug(_x7) {
        return _getFormBySlug.apply(this, arguments);
      }
      return getFormBySlug;
    }()
    /**
     * Get forms by event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [filters] - Additional filters
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Items per page
     * @returns {Promise<Object>} - Paginated forms
     */
    )
  }, {
    key: "getFormsByEvent",
    value: (function () {
      var _getFormsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(eventId) {
        var filters,
          page,
          limit,
          query,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              filters = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              page = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 1;
              limit = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : 10;
              _context5.p = 1;
              query = _objectSpread({
                event: eventId
              }, filters);
              _context5.n = 2;
              return this.repository.findAll(query, page, limit, {
                populate: ["categories", "created_by"],
                sort: {
                  created_at: -1
                }
              });
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Get forms by event failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function getFormsByEvent(_x8) {
        return _getFormsByEvent.apply(this, arguments);
      }
      return getFormsByEvent;
    }()
    /**
     * Get nomination forms by event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [filters] - Additional filters
     * @returns {Promise<Array>} - Nomination forms
     */
    )
  }, {
    key: "getNominationForms",
    value: (function () {
      var _getNominationForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(eventId) {
        var filters,
          query,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              filters = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.p = 1;
              query = _objectSpread({
                event: eventId,
                form_type: _formConstants.FORM_TYPE.NOMINATION
              }, filters);
              _context6.n = 2;
              return this.repository.findAll(query, 1, 100, {
                populate: ["categories"],
                sort: {
                  created_at: -1
                }
              });
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Get nomination forms failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function getNominationForms(_x9) {
        return _getNominationForms.apply(this, arguments);
      }
      return getNominationForms;
    }()
    /**
     * Get all published, active nomination forms (public)
     * Returns forms with event and category details
     * @returns {Promise<Array>} - Public nomination forms
     */
    )
  }, {
    key: "getPublicNominationForms",
    value: (function () {
      var _getPublicNominationForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var query, result, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              query = {
                form_type: _formConstants.FORM_TYPE.NOMINATION,
                is_published: true,
                status: _formConstants.FORM_STATUS.ACTIVE
              };
              _context7.n = 1;
              return this.repository.findAll(query, 1, 100, {
                populate: ["event", "categories"],
                sort: {
                  created_at: -1
                }
              });
            case 1:
              result = _context7.v;
              return _context7.a(2, result.data || []);
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              throw new Error("Get public nomination forms failed: ".concat(_t7.message));
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function getPublicNominationForms() {
        return _getPublicNominationForms.apply(this, arguments);
      }
      return getPublicNominationForms;
    }() // ==================== FIELD MAPPING ====================
    /**
     * Update candidate field mapping for nomination form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} mappingData - Mapping configuration
     * @param {Array} mappingData.mappings - Array of field mappings
     * @param {boolean} mappingData.auto_create_candidate - Auto create candidate on approval
     * @param {boolean} mappingData.send_welcome_email - Send welcome email
     * @returns {Promise<Object>} - Updated form
     */
    )
  }, {
    key: "updateFieldMapping",
    value: function () {
      var _updateFieldMapping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(formId, mappingData) {
        var _validated$auto_creat, _validated$send_welco, validated, form, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              // Validate input
              validated = this.validate(mappingData, _formValidation["default"].updateFieldMappingSchema); // Validate the form is a nomination form
              _context8.n = 1;
              return this.repository.findById(formId);
            case 1:
              form = _context8.v;
              if (form) {
                _context8.n = 2;
                break;
              }
              throw new Error("Form not found");
            case 2:
              if (!(form.form_type !== _formConstants.FORM_TYPE.NOMINATION)) {
                _context8.n = 3;
                break;
              }
              throw new Error("Field mapping is only available for nomination forms");
            case 3:
              // Validate mappings
              this.validateFieldMapping(validated.mappings);

              // Update the field mapping
              _context8.n = 4;
              return this.repository.updateById(formId, {
                candidate_field_mapping: {
                  enabled: true,
                  mappings: validated.mappings,
                  auto_create_candidate: (_validated$auto_creat = validated.auto_create_candidate) !== null && _validated$auto_creat !== void 0 ? _validated$auto_creat : true,
                  send_welcome_email: (_validated$send_welco = validated.send_welcome_email) !== null && _validated$send_welco !== void 0 ? _validated$send_welco : true
                }
              });
            case 4:
              return _context8.a(2, _context8.v);
            case 5:
              _context8.p = 5;
              _t8 = _context8.v;
              throw new Error("Update field mapping failed: ".concat(_t8.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 5]]);
      }));
      function updateFieldMapping(_x0, _x1) {
        return _updateFieldMapping.apply(this, arguments);
      }
      return updateFieldMapping;
    }()
    /**
     * Validate field mapping configuration
     * @param {Array} mappings - Array of field mappings
     * @throws {Error} - If validation fails
     */
  }, {
    key: "validateFieldMapping",
    value: function validateFieldMapping(mappings) {
      if (!mappings || !Array.isArray(mappings)) {
        throw new Error("Mappings must be an array");
      }

      // Required candidate fields
      var requiredFields = ["first_name", "last_name", "email"];
      var mappedFields = mappings.map(function (m) {
        return m.candidate_field;
      });

      // Check if all required fields are mapped
      var missingFields = requiredFields.filter(function (field) {
        return !mappedFields.includes(field);
      });
      if (missingFields.length > 0) {
        throw new Error("Missing required field mappings: ".concat(missingFields.join(", ")));
      }

      // Check for duplicate mappings
      var duplicates = mappedFields.filter(function (field, index) {
        return mappedFields.indexOf(field) !== index;
      });
      if (duplicates.length > 0) {
        throw new Error("Duplicate field mappings found: ".concat(duplicates.join(", ")));
      }

      // Validate each mapping has required properties
      var _iterator = _createForOfIteratorHelper(mappings),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mapping = _step.value;
          if (!mapping.form_field_id) {
            throw new Error("Each mapping must have form_field_id");
          }
          if (!mapping.candidate_field) {
            throw new Error("Each mapping must have candidate_field");
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * Get field mapping for form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Field mapping configuration
     */
  }, {
    key: "getFieldMapping",
    value: (function () {
      var _getFieldMapping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(formId) {
        var _form$candidate_field, _form$candidate_field2, _form$candidate_field3, _form$candidate_field4, _form$candidate_field5, _form$candidate_field6, form, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.repository.findById(formId, {
                select: "candidate_field_mapping fields form_type"
              });
            case 1:
              form = _context9.v;
              if (form) {
                _context9.n = 2;
                break;
              }
              throw new Error("Form not found");
            case 2:
              if (!(form.form_type !== _formConstants.FORM_TYPE.NOMINATION)) {
                _context9.n = 3;
                break;
              }
              throw new Error("Field mapping is only available for nomination forms");
            case 3:
              return _context9.a(2, {
                enabled: ((_form$candidate_field = form.candidate_field_mapping) === null || _form$candidate_field === void 0 ? void 0 : _form$candidate_field.enabled) || false,
                mappings: ((_form$candidate_field2 = form.candidate_field_mapping) === null || _form$candidate_field2 === void 0 ? void 0 : _form$candidate_field2.mappings) || [],
                auto_create_candidate: (_form$candidate_field3 = (_form$candidate_field4 = form.candidate_field_mapping) === null || _form$candidate_field4 === void 0 ? void 0 : _form$candidate_field4.auto_create_candidate) !== null && _form$candidate_field3 !== void 0 ? _form$candidate_field3 : true,
                send_welcome_email: (_form$candidate_field5 = (_form$candidate_field6 = form.candidate_field_mapping) === null || _form$candidate_field6 === void 0 ? void 0 : _form$candidate_field6.send_welcome_email) !== null && _form$candidate_field5 !== void 0 ? _form$candidate_field5 : true,
                form_fields: form.fields || []
              });
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              throw new Error("Get field mapping failed: ".concat(_t9.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 4]]);
      }));
      function getFieldMapping(_x10) {
        return _getFieldMapping.apply(this, arguments);
      }
      return getFieldMapping;
    }()
    /**
     * Extract candidate data from submission using field mapping
     * @param {Object} submissionData - Submission data (Map or Object)
     * @param {Array} mappings - Field mappings
     * @returns {Object} - Extracted candidate data
     */
    )
  }, {
    key: "extractCandidateData",
    value: function extractCandidateData(submissionData, mappings) {
      var candidateData = {};

      // Convert Map to Object if needed
      var data = submissionData instanceof Map ? Object.fromEntries(submissionData) : submissionData;
      var _iterator2 = _createForOfIteratorHelper(mappings),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mapping = _step2.value;
          var form_field_id = mapping.form_field_id,
            candidate_field = mapping.candidate_field,
            transform = mapping.transform;
          var value = data[form_field_id];
          if (value !== undefined && value !== null && value !== "") {
            // Apply transformation
            value = this.applyTransform(value, transform);

            // Handle nested fields (e.g., social_links.linkedin)
            if (candidate_field.includes(".")) {
              var _candidate_field$spli = candidate_field.split("."),
                _candidate_field$spli2 = _slicedToArray(_candidate_field$spli, 2),
                parent = _candidate_field$spli2[0],
                child = _candidate_field$spli2[1];
              if (!candidateData[parent]) {
                candidateData[parent] = {};
              }
              candidateData[parent][child] = value;
            } else {
              candidateData[candidate_field] = value;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return candidateData;
    }

    /**
     * Apply transformation to field value
     * @param {any} value - Field value
     * @param {string} transform - Transform type
     * @returns {any} - Transformed value
     */
  }, {
    key: "applyTransform",
    value: function applyTransform(value, transform) {
      if (typeof value !== "string") return value;
      switch (transform) {
        case "uppercase":
          return value.toUpperCase();
        case "lowercase":
          return value.toLowerCase();
        case "trim":
          return value.trim();
        case "capitalize":
          return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        default:
          return value;
      }
    }

    // ==================== FORM MANAGEMENT ====================

    /**
     * Publish form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Updated form
     */
  }, {
    key: "publishForm",
    value: function () {
      var _publishForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(formId) {
        var _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.repository.updateById(formId, {
                status: _formConstants.FORM_STATUS.ACTIVE,
                is_published: true
              });
            case 1:
              return _context0.a(2, _context0.v);
            case 2:
              _context0.p = 2;
              _t0 = _context0.v;
              throw new Error("Publish form failed: ".concat(_t0.message));
            case 3:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 2]]);
      }));
      function publishForm(_x11) {
        return _publishForm.apply(this, arguments);
      }
      return publishForm;
    }()
    /**
     * Close form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Updated form
     */
  }, {
    key: "closeForm",
    value: (function () {
      var _closeForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(formId) {
        var _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this.repository.updateById(formId, {
                status: _formConstants.FORM_STATUS.CLOSED
              });
            case 1:
              return _context1.a(2, _context1.v);
            case 2:
              _context1.p = 2;
              _t1 = _context1.v;
              throw new Error("Close form failed: ".concat(_t1.message));
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function closeForm(_x12) {
        return _closeForm.apply(this, arguments);
      }
      return closeForm;
    }()
    /**
     * Delete form (soft delete)
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Deleted form
     */
    )
  }, {
    key: "deleteForm",
    value: (function () {
      var _deleteForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(formId) {
        var _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.repository["delete"]({
                _id: formId
              });
            case 1:
              return _context10.a(2, _context10.v);
            case 2:
              _context10.p = 2;
              _t10 = _context10.v;
              throw new Error("Delete form failed: ".concat(_t10.message));
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function deleteForm(_x13) {
        return _deleteForm.apply(this, arguments);
      }
      return deleteForm;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new FormService();