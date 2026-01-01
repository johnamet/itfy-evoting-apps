"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _formService = _interopRequireDefault(require("./form.service.js"));
var _formValidation = _interopRequireDefault(require("./form.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Form Controller
 * Handles HTTP requests for dynamic form management
 */
var FormController = exports.FormController = /*#__PURE__*/function (_BaseController) {
  function FormController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, FormController);
    return _callSuper(this, FormController, [{
      formService: dependencies.formService || _formService["default"]
    }]);
  }

  // ==================== FORM CRUD ====================

  /**
   * Create a new form
   * POST /api/forms
   */
  _inherits(FormController, _BaseController);
  return _createClass(FormController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, adminId, form;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _formValidation["default"].createFormSchema);
              adminId = this.getUserId(req);
              _context.n = 1;
              return this.service("formService").createForm(validated, adminId);
            case 1:
              form = _context.v;
              return _context.a(2, this.created(res, {
                data: form,
                message: "Form created successfully"
              }));
          }
        }, _callee, this);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Get all forms with pagination and filters
     * GET /api/forms
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, search, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["event", "form_type", "status", "is_published"]);
              sort = this.getSort(req, "-created_at");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  description: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context2.n = 1;
              return this.service("formService").repository.findAll(filters, page, limit, {
                sort: sort,
                populate: ["event", "categories", "created_by"]
              });
            case 1:
              result = _context2.v;
              return _context2.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee2, this);
      }));
      function list(_x3, _x4) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get form by ID
     * GET /api/forms/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, form;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("formService").getFormById(id);
            case 1:
              form = _context3.v;
              if (form) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, this.notFound(res, {
                resource: "Form"
              }));
            case 2:
              return _context3.a(2, this.success(res, {
                data: form
              }));
          }
        }, _callee3, this);
      }));
      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Get form by slug
     * GET /api/forms/slug/:slug
     */
    )
  }, {
    key: "getBySlug",
    value: (function () {
      var _getBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var slug, form;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              slug = req.params.slug;
              _context4.n = 1;
              return this.service("formService").getFormBySlug(slug, {
                populate: ["event", "categories"]
              });
            case 1:
              form = _context4.v;
              if (form) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2, this.notFound(res, {
                resource: "Form"
              }));
            case 2:
              return _context4.a(2, this.success(res, {
                data: form
              }));
          }
        }, _callee4, this);
      }));
      function getBySlug(_x7, _x8) {
        return _getBySlug.apply(this, arguments);
      }
      return getBySlug;
    }()
    /**
     * Update form
     * PUT /api/forms/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, validated, adminId, form;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _formValidation["default"].updateFormSchema);
              adminId = this.getUserId(req);
              _context5.n = 1;
              return this.service("formService").updateForm(id, validated, adminId);
            case 1:
              form = _context5.v;
              return _context5.a(2, this.success(res, {
                data: form,
                message: "Form updated successfully"
              }));
          }
        }, _callee5, this);
      }));
      function update(_x9, _x0) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete form (soft delete)
     * DELETE /api/forms/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              _context6.n = 1;
              return this.service("formService").deleteForm(id);
            case 1:
              return _context6.a(2, this.success(res, {
                message: "Form deleted successfully"
              }));
          }
        }, _callee6, this);
      }));
      function _delete(_x1, _x10) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== PUBLIC QUERIES ====================
    /**
     * Get all published, active nomination forms (public)
     * GET /api/forms/public/nominations
     */
    )
  }, {
    key: "getPublicNominationForms",
    value: function () {
      var _getPublicNominationForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var forms;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.service("formService").getPublicNominationForms();
            case 1:
              forms = _context7.v;
              return _context7.a(2, this.success(res, {
                data: forms
              }));
          }
        }, _callee7, this);
      }));
      function getPublicNominationForms(_x11, _x12) {
        return _getPublicNominationForms.apply(this, arguments);
      }
      return getPublicNominationForms;
    }() // ==================== EVENT-BASED QUERIES ====================
    /**
     * Get forms by event
     * GET /api/forms/event/:eventId
     */
  }, {
    key: "getByEvent",
    value: function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var eventId, _this$getPagination2, page, limit, filters, result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              filters = this.getFilters(req, ["form_type", "status", "is_published"]);
              _context8.n = 1;
              return this.service("formService").getFormsByEvent(eventId, filters, page, limit);
            case 1:
              result = _context8.v;
              return _context8.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee8, this);
      }));
      function getByEvent(_x13, _x14) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get nomination forms by event
     * GET /api/forms/event/:eventId/nominations
     */
  }, {
    key: "getNominationForms",
    value: (function () {
      var _getNominationForms = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var eventId, filters, result;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              eventId = req.params.eventId;
              filters = this.getFilters(req, ["status", "is_published"]);
              _context9.n = 1;
              return this.service("formService").getNominationForms(eventId, filters);
            case 1:
              result = _context9.v;
              return _context9.a(2, this.success(res, {
                data: result.data
              }));
          }
        }, _callee9, this);
      }));
      function getNominationForms(_x15, _x16) {
        return _getNominationForms.apply(this, arguments);
      }
      return getNominationForms;
    }() // ==================== FORM STATUS MANAGEMENT ====================
    /**
     * Publish form
     * PUT /api/forms/:id/publish
     */
    )
  }, {
    key: "publish",
    value: function () {
      var _publish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var id, form;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              id = req.params.id;
              _context0.n = 1;
              return this.service("formService").publishForm(id);
            case 1:
              form = _context0.v;
              return _context0.a(2, this.success(res, {
                data: form,
                message: "Form published successfully"
              }));
          }
        }, _callee0, this);
      }));
      function publish(_x17, _x18) {
        return _publish.apply(this, arguments);
      }
      return publish;
    }()
    /**
     * Close form
     * PUT /api/forms/:id/close
     */
  }, {
    key: "close",
    value: (function () {
      var _close = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var id, form;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              id = req.params.id;
              _context1.n = 1;
              return this.service("formService").closeForm(id);
            case 1:
              form = _context1.v;
              return _context1.a(2, this.success(res, {
                data: form,
                message: "Form closed successfully"
              }));
          }
        }, _callee1, this);
      }));
      function close(_x19, _x20) {
        return _close.apply(this, arguments);
      }
      return close;
    }() // ==================== FIELD MAPPING ====================
    /**
     * Get field mapping configuration
     * GET /api/forms/:id/field-mapping
     */
    )
  }, {
    key: "getFieldMapping",
    value: function () {
      var _getFieldMapping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var id, mapping;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              id = req.params.id;
              _context10.n = 1;
              return this.service("formService").getFieldMapping(id);
            case 1:
              mapping = _context10.v;
              return _context10.a(2, this.success(res, {
                data: mapping
              }));
          }
        }, _callee10, this);
      }));
      function getFieldMapping(_x21, _x22) {
        return _getFieldMapping.apply(this, arguments);
      }
      return getFieldMapping;
    }()
    /**
     * Update field mapping configuration
     * PUT /api/forms/:id/field-mapping
     */
  }, {
    key: "updateFieldMapping",
    value: (function () {
      var _updateFieldMapping = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var id, validated, form;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _formValidation["default"].updateFieldMappingSchema);
              _context11.n = 1;
              return this.service("formService").updateFieldMapping(id, validated);
            case 1:
              form = _context11.v;
              return _context11.a(2, this.success(res, {
                data: form,
                message: "Field mapping updated successfully"
              }));
          }
        }, _callee11, this);
      }));
      function updateFieldMapping(_x23, _x24) {
        return _updateFieldMapping.apply(this, arguments);
      }
      return updateFieldMapping;
    }())
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new FormController();