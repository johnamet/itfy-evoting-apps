"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CategoryService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _categoryRepository = _interopRequireDefault(require("./category.repository.js"));
var _categoryValidation = _interopRequireDefault(require("./category.validation.js"));
var _candidateRepository = _interopRequireDefault(require("../candidate/candidate.repository.js"));
var _eventRepository = _interopRequireDefault(require("../event/event.repository.js"));
var _agendaService = _interopRequireDefault(require("../../services/agenda.service.js"));
var _categoryConstants = require("../../utils/constants/category.constants.js");
var _notificationConstants = require("../../utils/constants/notification.constants.js");
var _notificationService = _interopRequireDefault(require("../../services/notification.service.js"));
var _excluded = ["skip", "limit", "sort"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t26 in e) "default" !== _t26 && {}.hasOwnProperty.call(e, _t26) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t26)) && (i.get || i.set) ? o(f, _t26, i) : f[_t26] = e[_t26]); return f; })(e, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Category Service
 * Handles business logic for voting category management
 * 
 * Features:
 * - CRUD operations for categories
 * - Voting lifecycle (open/close voting, manage deadlines)
 * - Candidate management (add/remove candidates from categories)
 * - Featured categories
 * - Category statistics and analytics
 * - Display order management
 * - Vote counting and results
 */
_baseService["default"].setValidation(_categoryValidation["default"]);
var CategoryService = exports.CategoryService = /*#__PURE__*/function (_BaseService) {
  function CategoryService() {
    var _this;
    _classCallCheck(this, CategoryService);
    _this = _callSuper(this, CategoryService);
    _this.repository = _categoryRepository["default"];
    _this.candidateRepository = _candidateRepository["default"];
    _this.eventRepository = _eventRepository["default"];
    return _this;
  }

  // ==================== CRUD OPERATIONS ====================

  /**
   * Create a new category
   * @param {Object} data - Category data
   * @param {string} userId - User ID creating the category
   * @returns {Promise<Object>} - Created category
   */
  _inherits(CategoryService, _BaseService);
  return _createClass(CategoryService, [{
    key: "createCategory",
    value: function () {
      var _createCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data, userId) {
        var validated, event, existing, category, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate input
              validated = this.validate(data, _categoryValidation["default"].createCategorySchema); // Verify event exists
              _context.n = 1;
              return this.eventRepository.findById(validated.event);
            case 1:
              event = _context.v;
              if (event) {
                _context.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context.n = 3;
              return this.repository.findOne({
                event: validated.event,
                name: validated.name
              });
            case 3:
              existing = _context.v;
              if (!existing) {
                _context.n = 4;
                break;
              }
              throw new Error("A category with this name already exists for this event");
            case 4:
              _context.n = 5;
              return this.repository.create(_objectSpread(_objectSpread({}, validated), {}, {
                created_by: userId,
                total_votes: 0
              }));
            case 5:
              category = _context.v;
              _context.n = 6;
              return _notificationService["default"].create({
                userId: event.created_by,
                type: _notificationConstants.NOTIFICATION_TYPE.CATEGORY_CREATED,
                title: "New Category Created",
                message: "Category \"".concat(category.name, "\" was created for event \"").concat(event.title, "\""),
                eventId: event._id,
                categoryId: category._id,
                actionUrl: "/admin/events/".concat(event._id, "/categories/").concat(category._id)
              });
            case 6:
              return _context.a(2, category);
            case 7:
              _context.p = 7;
              _t = _context.v;
              throw new Error("Create category failed: ".concat(_t.message));
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[0, 7]]);
      }));
      function createCategory(_x, _x2) {
        return _createCategory.apply(this, arguments);
      }
      return createCategory;
    }()
    /**
     * Get category by ID
     * @param {string} categoryId - Category ID
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Category
     */
  }, {
    key: "getCategoryById",
    value: (function () {
      var _getCategoryById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(categoryId) {
        var options,
          category,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.repository.findById(categoryId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "candidates", "created_by", "updated_by"]
              }));
            case 2:
              category = _context2.v;
              if (category) {
                _context2.n = 3;
                break;
              }
              throw new Error("Category not found");
            case 3:
              return _context2.a(2, category);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              throw new Error("Get category failed: ".concat(_t2.message));
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 4]]);
      }));
      function getCategoryById(_x3) {
        return _getCategoryById.apply(this, arguments);
      }
      return getCategoryById;
    }()
    /**
     * Get category by slug
     * @param {string} slug - Category slug
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Category
     */
    )
  }, {
    key: "getCategoryBySlug",
    value: (function () {
      var _getCategoryBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(slug) {
        var options,
          category,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return this.repository.findBySlug(slug, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "candidates"]
              }));
            case 2:
              category = _context3.v;
              if (category) {
                _context3.n = 3;
                break;
              }
              throw new Error("Category not found");
            case 3:
              return _context3.a(2, category);
            case 4:
              _context3.p = 4;
              _t3 = _context3.v;
              throw new Error("Get category by slug failed: ".concat(_t3.message));
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4]]);
      }));
      function getCategoryBySlug(_x4) {
        return _getCategoryBySlug.apply(this, arguments);
      }
      return getCategoryBySlug;
    }()
    /**
     * Get all categories for an event
     * @param {string} eventId - Event ID
     * @param {Object} filters - Query filters
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @returns {Promise<Object>} - Paginated categories
     */
    )
  }, {
    key: "getCategoriesByEvent",
    value: (function () {
      var _getCategoriesByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(eventId) {
        var filters,
          page,
          limit,
          query,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              filters = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              page = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 1;
              limit = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : 20;
              _context4.p = 1;
              query = _objectSpread({
                event: eventId
              }, filters);
              _context4.n = 2;
              return this.repository.findAll(query, page, limit, {
                populate: ["candidates"],
                sort: {
                  display_order: 1,
                  name: 1
                }
              });
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Get categories by event failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function getCategoriesByEvent(_x5) {
        return _getCategoriesByEvent.apply(this, arguments);
      }
      return getCategoriesByEvent;
    }()
    /**
     * Find all categories with filters and options
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (skip, limit, sort, etc.)
     * @returns {Promise<Array>} - List of categories
     */
    )
  }, {
    key: "findAll",
    value: (function () {
      var _findAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var filters,
          options,
          _options$skip,
          skip,
          _options$limit,
          limit,
          _options$sort,
          sort,
          queryOptions,
          page,
          result,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              filters = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              _options$skip = options.skip, skip = _options$skip === void 0 ? 0 : _options$skip, _options$limit = options.limit, limit = _options$limit === void 0 ? 10 : _options$limit, _options$sort = options.sort, sort = _options$sort === void 0 ? {
                display_order: 1
              } : _options$sort, queryOptions = _objectWithoutProperties(options, _excluded);
              page = Math.floor(skip / limit) + 1;
              _context5.n = 2;
              return this.repository.findAll(filters, page, limit, _objectSpread({
                sort: sort,
                populate: ["event", "candidates"]
              }, queryOptions));
            case 2:
              result = _context5.v;
              return _context5.a(2, result.data);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Find all categories failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function findAll() {
        return _findAll.apply(this, arguments);
      }
      return findAll;
    }()
    /**
     * Count categories matching filters
     * @param {Object} filters - Query filters
     * @returns {Promise<number>} - Count of categories
     */
    )
  }, {
    key: "count",
    value: (function () {
      var _count = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var filters,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              filters = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
              _context6.p = 1;
              _context6.n = 2;
              return this.repository.count(filters);
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Count categories failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
    /**
     * Update category
     * @param {string} categoryId - Category ID
     * @param {Object} data - Update data
     * @param {string} userId - User ID performing update
     * @returns {Promise<Object>} - Updated category
     */
    )
  }, {
    key: "updateCategory",
    value: (function () {
      var _updateCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(categoryId, data, userId) {
        var validated, category, existing, updated, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              // Validate input
              validated = this.validate(data, _categoryValidation["default"].updateCategorySchema); // Check if category exists
              _context7.n = 1;
              return this.repository.findById(categoryId);
            case 1:
              category = _context7.v;
              if (category) {
                _context7.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (!(validated.name && validated.name !== category.name)) {
                _context7.n = 4;
                break;
              }
              _context7.n = 3;
              return this.repository.findOne({
                event: category.event,
                name: validated.name,
                _id: {
                  $ne: categoryId
                }
              });
            case 3:
              existing = _context7.v;
              if (!existing) {
                _context7.n = 4;
                break;
              }
              throw new Error("A category with this name already exists for this event");
            case 4:
              _context7.n = 5;
              return this.repository.updateById(categoryId, _objectSpread(_objectSpread({}, validated), {}, {
                updated_by: userId
              }));
            case 5:
              updated = _context7.v;
              return _context7.a(2, updated);
            case 6:
              _context7.p = 6;
              _t7 = _context7.v;
              throw new Error("Update category failed: ".concat(_t7.message));
            case 7:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 6]]);
      }));
      function updateCategory(_x6, _x7, _x8) {
        return _updateCategory.apply(this, arguments);
      }
      return updateCategory;
    }()
    /**
     * Delete category (soft delete)
     * @param {string} categoryId - Category ID
     * @returns {Promise<Object>} - Deleted category
     */
    )
  }, {
    key: "deleteCategory",
    value: (function () {
      var _deleteCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(categoryId) {
        var category, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.repository.findById(categoryId);
            case 1:
              category = _context8.v;
              if (category) {
                _context8.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (!category.is_voting_open) {
                _context8.n = 3;
                break;
              }
              throw new Error("Cannot delete a category with active voting");
            case 3:
              _context8.n = 4;
              return this.repository["delete"]({
                _id: categoryId
              });
            case 4:
              return _context8.a(2, _context8.v);
            case 5:
              _context8.p = 5;
              _t8 = _context8.v;
              throw new Error("Delete category failed: ".concat(_t8.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 5]]);
      }));
      function deleteCategory(_x9) {
        return _deleteCategory.apply(this, arguments);
      }
      return deleteCategory;
    }() // ==================== VOTING MANAGEMENT ====================
    /**
     * Open voting for a category
     * @param {string} categoryId - Category ID
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
    )
  }, {
    key: "openVoting",
    value: function () {
      var _openVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(categoryId, userId) {
        var category, updated, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.repository.findById(categoryId, {
                populate: ["event", "candidates"]
              });
            case 1:
              category = _context9.v;
              if (category) {
                _context9.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (!category.is_voting_open) {
                _context9.n = 3;
                break;
              }
              throw new Error("Voting is already open");
            case 3:
              if (!(category.status !== _categoryConstants.STATUS.ACTIVE)) {
                _context9.n = 4;
                break;
              }
              throw new Error("Cannot open voting for ".concat(category.status, " category"));
            case 4:
              if (!(!category.candidates || category.candidates.length < category.min_candidates)) {
                _context9.n = 5;
                break;
              }
              throw new Error("Category must have at least ".concat(category.min_candidates, " candidates"));
            case 5:
              _context9.n = 6;
              return this.repository.openVoting(categoryId);
            case 6:
              updated = _context9.v;
              _context9.n = 7;
              return _notificationService["default"].create({
                type: _notificationConstants.NOTIFICATION_TYPE.VOTING_STARTED,
                title: "Voting Started",
                message: "Voting is now open for \"".concat(category.name, "\""),
                eventId: category.event._id || category.event,
                categoryId: category._id,
                actionUrl: "/events/".concat(category.event._id || category.event, "/categories/").concat(category._id, "/vote")
              });
            case 7:
              return _context9.a(2, updated);
            case 8:
              _context9.p = 8;
              _t9 = _context9.v;
              throw new Error("Open voting failed: ".concat(_t9.message));
            case 9:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 8]]);
      }));
      function openVoting(_x0, _x1) {
        return _openVoting.apply(this, arguments);
      }
      return openVoting;
    }()
    /**
     * Close voting for a category
     * @param {string} categoryId - Category ID
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
  }, {
    key: "closeVoting",
    value: (function () {
      var _closeVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(categoryId, userId) {
        var category, updated, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.repository.findById(categoryId, {
                populate: ["event"]
              });
            case 1:
              category = _context0.v;
              if (category) {
                _context0.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (category.is_voting_open) {
                _context0.n = 3;
                break;
              }
              throw new Error("Voting is not open");
            case 3:
              _context0.n = 4;
              return this.repository.closeVoting(categoryId);
            case 4:
              updated = _context0.v;
              _context0.n = 5;
              return this.repository.updateStatus(categoryId, _categoryConstants.STATUS.CLOSED);
            case 5:
              _context0.n = 6;
              return _agendaService["default"].now("publish-category-results", {
                categoryId: category._id,
                eventId: category.event._id || category.event
              });
            case 6:
              _context0.n = 7;
              return _notificationService["default"].create({
                type: _notificationConstants.NOTIFICATION_TYPE.VOTING_ENDED,
                title: "Voting Closed",
                message: "Voting has closed for \"".concat(category.name, "\""),
                eventId: category.event._id || category.event,
                categoryId: category._id,
                actionUrl: "/events/".concat(category.event._id || category.event, "/categories/").concat(category._id, "/results")
              });
            case 7:
              return _context0.a(2, updated);
            case 8:
              _context0.p = 8;
              _t0 = _context0.v;
              throw new Error("Close voting failed: ".concat(_t0.message));
            case 9:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 8]]);
      }));
      function closeVoting(_x10, _x11) {
        return _closeVoting.apply(this, arguments);
      }
      return closeVoting;
    }()
    /**
     * Get active voting categories
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Active voting categories
     */
    )
  }, {
    key: "getActiveVoting",
    value: (function () {
      var _getActiveVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var eventId,
          options,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              eventId = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : null;
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.repository.findActiveVoting(eventId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "candidates"]
              }));
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Get active voting failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function getActiveVoting() {
        return _getActiveVoting.apply(this, arguments);
      }
      return getActiveVoting;
    }()
    /**
     * Get upcoming voting categories
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Upcoming voting categories
     */
    )
  }, {
    key: "getUpcomingVoting",
    value: (function () {
      var _getUpcomingVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var eventId,
          options,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              eventId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : null;
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.repository.findUpcomingVoting(eventId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "candidates"]
              }));
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Get upcoming voting failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function getUpcomingVoting() {
        return _getUpcomingVoting.apply(this, arguments);
      }
      return getUpcomingVoting;
    }()
    /**
     * Get closed voting categories
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Closed voting categories
     */
    )
  }, {
    key: "getClosedVoting",
    value: (function () {
      var _getClosedVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var eventId,
          options,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              eventId = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : null;
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findClosedVoting(eventId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "candidates"]
              }));
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Get closed voting failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function getClosedVoting() {
        return _getClosedVoting.apply(this, arguments);
      }
      return getClosedVoting;
    }() // ==================== CANDIDATE MANAGEMENT ====================
    /**
     * Add candidate to category
     * @param {string} categoryId - Category ID
     * @param {string} candidateId - Candidate ID
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
    )
  }, {
    key: "addCandidate",
    value: function () {
      var _addCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(categoryId, candidateId, userId) {
        var category, candidate, updated, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.repository.findById(categoryId);
            case 1:
              category = _context12.v;
              if (category) {
                _context12.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              _context12.n = 3;
              return this.candidateRepository.findById(candidateId);
            case 3:
              candidate = _context12.v;
              if (candidate) {
                _context12.n = 4;
                break;
              }
              throw new Error("Candidate not found");
            case 4:
              if (!(candidate.event.toString() !== category.event.toString())) {
                _context12.n = 5;
                break;
              }
              throw new Error("Candidate must be from the same event");
            case 5:
              if (!(category.max_candidates && category.candidates.length >= category.max_candidates)) {
                _context12.n = 6;
                break;
              }
              throw new Error("Category has reached maximum of ".concat(category.max_candidates, " candidates"));
            case 6:
              _context12.n = 7;
              return this.repository.addCandidate(categoryId, candidateId);
            case 7:
              updated = _context12.v;
              if (candidate.categories.includes(categoryId)) {
                _context12.n = 8;
                break;
              }
              _context12.n = 8;
              return this.candidateRepository.updateById(candidateId, {
                $addToSet: {
                  categories: categoryId
                }
              });
            case 8:
              return _context12.a(2, updated);
            case 9:
              _context12.p = 9;
              _t12 = _context12.v;
              throw new Error("Add candidate failed: ".concat(_t12.message));
            case 10:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 9]]);
      }));
      function addCandidate(_x12, _x13, _x14) {
        return _addCandidate.apply(this, arguments);
      }
      return addCandidate;
    }()
    /**
     * Remove candidate from category
     * @param {string} categoryId - Category ID
     * @param {string} candidateId - Candidate ID
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
  }, {
    key: "removeCandidate",
    value: (function () {
      var _removeCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(categoryId, candidateId, userId) {
        var category, updated, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.repository.findById(categoryId);
            case 1:
              category = _context13.v;
              if (category) {
                _context13.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (!category.is_voting_open) {
                _context13.n = 3;
                break;
              }
              throw new Error("Cannot remove candidates while voting is open");
            case 3:
              _context13.n = 4;
              return this.repository.removeCandidate(categoryId, candidateId);
            case 4:
              updated = _context13.v;
              _context13.n = 5;
              return this.candidateRepository.updateById(candidateId, {
                $pull: {
                  categories: categoryId
                }
              });
            case 5:
              return _context13.a(2, updated);
            case 6:
              _context13.p = 6;
              _t13 = _context13.v;
              throw new Error("Remove candidate failed: ".concat(_t13.message));
            case 7:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 6]]);
      }));
      function removeCandidate(_x15, _x16, _x17) {
        return _removeCandidate.apply(this, arguments);
      }
      return removeCandidate;
    }() // ==================== FEATURED CATEGORIES ====================
    /**
     * Get featured categories
     * @param {string} eventId - Optional event ID filter
     * @param {number} limit - Maximum number to return
     * @returns {Promise<Array>} - Featured categories
     */
    )
  }, {
    key: "getFeaturedCategories",
    value: function () {
      var _getFeaturedCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var eventId,
          limit,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              eventId = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;
              limit = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 5;
              _context14.p = 1;
              _context14.n = 2;
              return this.repository.findFeatured(eventId, limit, {
                populate: ["event", "candidates"]
              });
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Get featured categories failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function getFeaturedCategories() {
        return _getFeaturedCategories.apply(this, arguments);
      }
      return getFeaturedCategories;
    }()
    /**
     * Toggle featured status
     * @param {string} categoryId - Category ID
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(categoryId, userId) {
        var _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this.repository.toggleFeatured(categoryId);
            case 1:
              return _context15.a(2, _context15.v);
            case 2:
              _context15.p = 2;
              _t15 = _context15.v;
              throw new Error("Toggle featured failed: ".concat(_t15.message));
            case 3:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 2]]);
      }));
      function toggleFeatured(_x18, _x19) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }() // ==================== DISPLAY ORDER ====================
    /**
     * Update category display order
     * @param {string} categoryId - Category ID
     * @param {number} order - New display order
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
    )
  }, {
    key: "updateDisplayOrder",
    value: function () {
      var _updateDisplayOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(categoryId, order, userId) {
        var _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.repository.updateDisplayOrder(categoryId, order);
            case 1:
              return _context16.a(2, _context16.v);
            case 2:
              _context16.p = 2;
              _t16 = _context16.v;
              throw new Error("Update display order failed: ".concat(_t16.message));
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 2]]);
      }));
      function updateDisplayOrder(_x20, _x21, _x22) {
        return _updateDisplayOrder.apply(this, arguments);
      }
      return updateDisplayOrder;
    }()
    /**
     * Bulk update display orders
     * @param {Array<{id: string, order: number}>} updates - Array of updates
     * @param {string} userId - User ID performing action
     * @returns {Promise<Array>} - Updated categories
     */
  }, {
    key: "bulkUpdateDisplayOrder",
    value: (function () {
      var _bulkUpdateDisplayOrder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(updates, userId) {
        var _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.repository.bulkUpdateDisplayOrder(updates);
            case 1:
              return _context17.a(2, _context17.v);
            case 2:
              _context17.p = 2;
              _t17 = _context17.v;
              throw new Error("Bulk update display order failed: ".concat(_t17.message));
            case 3:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 2]]);
      }));
      function bulkUpdateDisplayOrder(_x23, _x24) {
        return _bulkUpdateDisplayOrder.apply(this, arguments);
      }
      return bulkUpdateDisplayOrder;
    }() // ==================== STATUS MANAGEMENT ====================
    /**
     * Update category status
     * @param {string} categoryId - Category ID
     * @param {string} status - New status
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
    )
  }, {
    key: "updateStatus",
    value: function () {
      var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(categoryId, status, userId) {
        var category, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.repository.findById(categoryId);
            case 1:
              category = _context18.v;
              if (category) {
                _context18.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (!(status === _categoryConstants.STATUS.CLOSED && category.is_voting_open)) {
                _context18.n = 3;
                break;
              }
              throw new Error("Close voting first before changing status to closed");
            case 3:
              _context18.n = 4;
              return this.repository.updateStatus(categoryId, status);
            case 4:
              return _context18.a(2, _context18.v);
            case 5:
              _context18.p = 5;
              _t18 = _context18.v;
              throw new Error("Update status failed: ".concat(_t18.message));
            case 6:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 5]]);
      }));
      function updateStatus(_x25, _x26, _x27) {
        return _updateStatus.apply(this, arguments);
      }
      return updateStatus;
    }()
    /**
     * Archive category
     * @param {string} categoryId - Category ID
     * @param {string} userId - User ID performing action
     * @returns {Promise<Object>} - Updated category
     */
  }, {
    key: "archiveCategory",
    value: (function () {
      var _archiveCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(categoryId, userId) {
        var category, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.repository.findById(categoryId);
            case 1:
              category = _context19.v;
              if (category) {
                _context19.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (!category.is_voting_open) {
                _context19.n = 3;
                break;
              }
              throw new Error("Cannot archive a category with active voting");
            case 3:
              _context19.n = 4;
              return this.repository.updateById(categoryId, {
                status: _categoryConstants.STATUS.ARCHIVED,
                is_featured: false,
                archived_at: new Date(),
                updated_by: userId
              });
            case 4:
              return _context19.a(2, _context19.v);
            case 5:
              _context19.p = 5;
              _t19 = _context19.v;
              throw new Error("Archive category failed: ".concat(_t19.message));
            case 6:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 5]]);
      }));
      function archiveCategory(_x28, _x29) {
        return _archiveCategory.apply(this, arguments);
      }
      return archiveCategory;
    }() // ==================== STATISTICS & ANALYTICS ====================
    /**
     * Get category statistics for an event
     * @param {string} eventId - Event ID
     * @returns {Promise<Object>} - Category statistics
     */
    )
  }, {
    key: "getStatisticsByEvent",
    value: function () {
      var _getStatisticsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(eventId) {
        var _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _context20.n = 1;
              return this.repository.getStatisticsByEvent(eventId);
            case 1:
              return _context20.a(2, _context20.v);
            case 2:
              _context20.p = 2;
              _t20 = _context20.v;
              throw new Error("Get statistics failed: ".concat(_t20.message));
            case 3:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 2]]);
      }));
      function getStatisticsByEvent(_x30) {
        return _getStatisticsByEvent.apply(this, arguments);
      }
      return getStatisticsByEvent;
    }()
    /**
     * Get category results
     * @param {string} categoryId - Category ID
     * @param {string} userId - Optional user ID for permission check
     * @returns {Promise<Object>} - Category results
     */
  }, {
    key: "getCategoryResults",
    value: (function () {
      var _getCategoryResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(categoryId) {
        var userId,
          category,
          _yield$import,
          VoteRepository,
          results,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              userId = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : null;
              _context21.p = 1;
              _context21.n = 2;
              return this.repository.findById(categoryId, {
                populate: ["event", "candidates"]
              });
            case 2:
              category = _context21.v;
              if (category) {
                _context21.n = 3;
                break;
              }
              throw new Error("Category not found");
            case 3:
              if (!(category.results_visibility === _categoryConstants.RESULTS_VISIBILITY.ADMIN_ONLY && !userId)) {
                _context21.n = 4;
                break;
              }
              throw new Error("Authentication required to view results");
            case 4:
              if (!(category.is_voting_open && !category.show_results_before_deadline)) {
                _context21.n = 5;
                break;
              }
              throw new Error("Results are not available until voting closes");
            case 5:
              _context21.n = 6;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../vote/vote/vote.repository.js"));
              });
            case 6:
              _yield$import = _context21.v;
              VoteRepository = _yield$import["default"];
              _context21.n = 7;
              return VoteRepository.aggregate([{
                $match: {
                  category: categoryId,
                  status: "completed"
                }
              }, {
                $group: {
                  _id: "$candidate",
                  total_votes: {
                    $sum: "$vote_count"
                  },
                  unique_voters: {
                    $addToSet: "$voter"
                  },
                  total_amount: {
                    $sum: "$amount"
                  }
                }
              }, {
                $lookup: {
                  from: "candidates",
                  localField: "_id",
                  foreignField: "_id",
                  as: "candidate"
                }
              }, {
                $unwind: "$candidate"
              }, {
                $project: {
                  candidate_id: "$_id",
                  candidate_name: "$candidate.name",
                  candidate_code: "$candidate.candidate_code",
                  total_votes: 1,
                  unique_voters: {
                    $size: "$unique_voters"
                  },
                  total_amount: 1
                }
              }, {
                $sort: {
                  total_votes: -1,
                  candidate_name: 1
                }
              }]);
            case 7:
              results = _context21.v;
              return _context21.a(2, {
                category: {
                  _id: category._id,
                  name: category.name,
                  total_votes: category.total_votes,
                  is_voting_open: category.is_voting_open,
                  voting_deadline: category.voting_deadline,
                  status: category.status
                },
                results: results,
                updated_at: new Date()
              });
            case 8:
              _context21.p = 8;
              _t21 = _context21.v;
              throw new Error("Get category results failed: ".concat(_t21.message));
            case 9:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 8]]);
      }));
      function getCategoryResults(_x31) {
        return _getCategoryResults.apply(this, arguments);
      }
      return getCategoryResults;
    }()
    /**
     * Search categories
     * @param {string} searchTerm - Search term
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Matching categories
     */
    )
  }, {
    key: "searchCategories",
    value: (function () {
      var _searchCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(searchTerm) {
        var eventId,
          options,
          _args22 = arguments,
          _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              eventId = _args22.length > 1 && _args22[1] !== undefined ? _args22[1] : null;
              options = _args22.length > 2 && _args22[2] !== undefined ? _args22[2] : {};
              _context22.p = 1;
              _context22.n = 2;
              return this.repository.search(searchTerm, eventId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "candidates"]
              }));
            case 2:
              return _context22.a(2, _context22.v);
            case 3:
              _context22.p = 3;
              _t22 = _context22.v;
              throw new Error("Search categories failed: ".concat(_t22.message));
            case 4:
              return _context22.a(2);
          }
        }, _callee22, this, [[1, 3]]);
      }));
      function searchCategories(_x32) {
        return _searchCategories.apply(this, arguments);
      }
      return searchCategories;
    }()
    /**
     * Increment vote count
     * @param {string} categoryId - Category ID
     * @param {number} count - Number of votes to add
     * @returns {Promise<Object>} - Updated category
     */
    )
  }, {
    key: "incrementVotes",
    value: (function () {
      var _incrementVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(categoryId) {
        var count,
          _args23 = arguments,
          _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              count = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : 1;
              _context23.p = 1;
              _context23.n = 2;
              return this.repository.incrementVotes(categoryId, count);
            case 2:
              return _context23.a(2, _context23.v);
            case 3:
              _context23.p = 3;
              _t23 = _context23.v;
              throw new Error("Increment votes failed: ".concat(_t23.message));
            case 4:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 3]]);
      }));
      function incrementVotes(_x33) {
        return _incrementVotes.apply(this, arguments);
      }
      return incrementVotes;
    }() // ==================== CATEGORY CANDIDATES ====================
    /**
     * Get candidates for a category
     * @param {string} categoryId - Category ID
     * @param {Object} options - Query options (skip, limit, sort)
     * @returns {Promise<Array>} - List of candidates
     */
    )
  }, {
    key: "getCategoryCandidates",
    value: function () {
      var _getCategoryCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(categoryId) {
        var options,
          category,
          _args24 = arguments,
          _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              options = _args24.length > 1 && _args24[1] !== undefined ? _args24[1] : {};
              _context24.p = 1;
              if (!(!categoryId || categoryId === 'undefined' || categoryId === 'null')) {
                _context24.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              _context24.n = 3;
              return this.repository.findById(categoryId, {
                populate: {
                  path: "candidates",
                  options: {
                    skip: options.skip || 0,
                    limit: options.limit || 20,
                    sort: options.sort || {
                      total_votes: -1
                    }
                  },
                  match: {
                    status: "approved",
                    is_published: true
                  }
                }
              });
            case 3:
              category = _context24.v;
              if (category) {
                _context24.n = 4;
                break;
              }
              throw new Error("Category not found");
            case 4:
              return _context24.a(2, category.candidates || []);
            case 5:
              _context24.p = 5;
              _t24 = _context24.v;
              if (!_t24.message.includes("not found")) {
                _context24.n = 6;
                break;
              }
              throw _t24;
            case 6:
              throw new Error("Get category candidates failed: ".concat(_t24.message));
            case 7:
              return _context24.a(2);
          }
        }, _callee24, this, [[1, 5]]);
      }));
      function getCategoryCandidates(_x34) {
        return _getCategoryCandidates.apply(this, arguments);
      }
      return getCategoryCandidates;
    }()
    /**
     * Count candidates in a category
     * @param {string} categoryId - Category ID
     * @returns {Promise<number>} - Number of candidates
     */
  }, {
    key: "countCategoryCandidates",
    value: (function () {
      var _countCategoryCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(categoryId) {
        var category, _yield$import2, _CandidateRepository, _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              if (!(!categoryId || categoryId === 'undefined' || categoryId === 'null')) {
                _context25.n = 1;
                break;
              }
              throw new Error("Category not found");
            case 1:
              _context25.n = 2;
              return this.repository.findById(categoryId);
            case 2:
              category = _context25.v;
              if (category) {
                _context25.n = 3;
                break;
              }
              throw new Error("Category not found");
            case 3:
              _context25.n = 4;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../candidate/candidate.repository.js"));
              });
            case 4:
              _yield$import2 = _context25.v;
              _CandidateRepository = _yield$import2["default"];
              _context25.n = 5;
              return _CandidateRepository.count({
                categories: categoryId,
                status: "approved",
                is_published: true
              });
            case 5:
              return _context25.a(2, _context25.v);
            case 6:
              _context25.p = 6;
              _t25 = _context25.v;
              if (!_t25.message.includes("not found")) {
                _context25.n = 7;
                break;
              }
              throw _t25;
            case 7:
              throw new Error("Count category candidates failed: ".concat(_t25.message));
            case 8:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 6]]);
      }));
      function countCategoryCandidates(_x35) {
        return _countCategoryCandidates.apply(this, arguments);
      }
      return countCategoryCandidates;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new CategoryService();