"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BundleController = void 0;
var _baseController = _interopRequireDefault(require("../../shared/base.controller.js"));
var _bundleService = _interopRequireDefault(require("./bundle.service.js"));
var _bundleValidation = _interopRequireDefault(require("./bundle.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Bundle Controller
 * Handles HTTP requests for vote bundle management
 */
var BundleController = exports.BundleController = /*#__PURE__*/function (_BaseController) {
  function BundleController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BundleController);
    return _callSuper(this, BundleController, [{
      bundleService: dependencies.bundleService || _bundleService["default"]
    }]);
  }

  // ==================== BUNDLE CRUD ====================

  /**
   * Create a new bundle
   * POST /api/bundles
   */
  _inherits(BundleController, _BaseController);
  return _createClass(BundleController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, adminId, bundle;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _bundleValidation["default"].createBundleSchema);
              adminId = this.getUserId(req);
              _context.n = 1;
              return this.service("bundleService").createBundle(validated, adminId);
            case 1:
              bundle = _context.v;
              return _context.a(2, this.created(res, {
                data: bundle,
                message: "Bundle created successfully"
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
     * Get all bundles with pagination and filters
     * GET /api/bundles
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
              filters = this.getFilters(req, ["event", "status", "is_featured", "is_popular"]);
              sort = this.getSort(req, "display_order");
              search = this.getSearch(req); // Price range filters
              if (req.query.min_price) {
                filters.price = _objectSpread(_objectSpread({}, filters.price), {}, {
                  $gte: parseFloat(req.query.min_price)
                });
              }
              if (req.query.max_price) {
                filters.price = _objectSpread(_objectSpread({}, filters.price), {}, {
                  $lte: parseFloat(req.query.max_price)
                });
              }
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
              return this.service("bundleService").repository.findAll(filters, page, limit, {
                sort: sort
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
     * Get bundle by ID
     * GET /api/bundles/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, bundle;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("bundleService").getBundleById(id);
            case 1:
              bundle = _context3.v;
              return _context3.a(2, this.success(res, {
                data: bundle
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
     * Get bundle by slug
     * GET /api/bundles/slug/:slug
     */
    )
  }, {
    key: "getBySlug",
    value: (function () {
      var _getBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var slug, bundle;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              slug = req.params.slug;
              _context4.n = 1;
              return this.service("bundleService").getBundleBySlug(slug);
            case 1:
              bundle = _context4.v;
              return _context4.a(2, this.success(res, {
                data: bundle
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
     * Update bundle
     * PUT /api/bundles/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, validated, adminId, bundle;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _bundleValidation["default"].updateBundleSchema);
              adminId = this.getUserId(req);
              _context5.n = 1;
              return this.service("bundleService").updateBundle(id, validated, adminId);
            case 1:
              bundle = _context5.v;
              return _context5.a(2, this.success(res, {
                data: bundle,
                message: "Bundle updated successfully"
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
     * Delete bundle (soft delete)
     * DELETE /api/bundles/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id, adminId;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context6.n = 1;
              return this.service("bundleService").deleteBundle(id, adminId);
            case 1:
              return _context6.a(2, this.success(res, {
                message: "Bundle deleted successfully"
              }));
          }
        }, _callee6, this);
      }));
      function _delete(_x1, _x10) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== STATUS MANAGEMENT ====================
    /**
     * Activate bundle
     * PUT /api/bundles/:id/activate
     */
    )
  }, {
    key: "activate",
    value: function () {
      var _activate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var id, adminId, bundle;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context7.n = 1;
              return this.service("bundleService").activateBundle(id, adminId);
            case 1:
              bundle = _context7.v;
              return _context7.a(2, this.success(res, {
                data: bundle,
                message: "Bundle activated successfully"
              }));
          }
        }, _callee7, this);
      }));
      function activate(_x11, _x12) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
    /**
     * Deactivate bundle
     * PUT /api/bundles/:id/deactivate
     */
  }, {
    key: "deactivate",
    value: (function () {
      var _deactivate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, adminId, bundle;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context8.n = 1;
              return this.service("bundleService").deactivateBundle(id, adminId);
            case 1:
              bundle = _context8.v;
              return _context8.a(2, this.success(res, {
                data: bundle,
                message: "Bundle deactivated successfully"
              }));
          }
        }, _callee8, this);
      }));
      function deactivate(_x13, _x14) {
        return _deactivate.apply(this, arguments);
      }
      return deactivate;
    }()
    /**
     * Toggle featured status
     * PUT /api/bundles/:id/toggle-featured
     */
    )
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var id, adminId, bundle;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context9.n = 1;
              return this.service("bundleService").toggleFeatured(id, adminId);
            case 1:
              bundle = _context9.v;
              return _context9.a(2, this.success(res, {
                data: bundle,
                message: "Bundle ".concat(bundle.is_featured ? "featured" : "unfeatured", " successfully")
              }));
          }
        }, _callee9, this);
      }));
      function toggleFeatured(_x15, _x16) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Toggle popular status
     * PUT /api/bundles/:id/toggle-popular
     */
    )
  }, {
    key: "togglePopular",
    value: (function () {
      var _togglePopular = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var id, adminId, bundle;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context0.n = 1;
              return this.service("bundleService").togglePopular(id, adminId);
            case 1:
              bundle = _context0.v;
              return _context0.a(2, this.success(res, {
                data: bundle,
                message: "Bundle ".concat(bundle.is_popular ? "marked" : "unmarked", " as popular successfully")
              }));
          }
        }, _callee0, this);
      }));
      function togglePopular(_x17, _x18) {
        return _togglePopular.apply(this, arguments);
      }
      return togglePopular;
    }() // ==================== EVENT-BASED QUERIES ====================
    /**
     * Get bundles by event
     * GET /api/bundles/event/:eventId
     */
    )
  }, {
    key: "getByEvent",
    value: function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var eventId, _this$getPagination2, page, limit, result;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              _context1.n = 1;
              return this.service("bundleService").getBundlesByEvent(eventId, page, limit);
            case 1:
              result = _context1.v;
              return _context1.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee1, this);
      }));
      function getByEvent(_x19, _x20) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get available bundles for event (active and within validity)
     * GET /api/bundles/event/:eventId/available
     */
  }, {
    key: "getAvailableByEvent",
    value: (function () {
      var _getAvailableByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var eventId, bundles;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              eventId = req.params.eventId;
              _context10.n = 1;
              return this.service("bundleService").getAvailableBundles(eventId);
            case 1:
              bundles = _context10.v;
              return _context10.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee10, this);
      }));
      function getAvailableByEvent(_x21, _x22) {
        return _getAvailableByEvent.apply(this, arguments);
      }
      return getAvailableByEvent;
    }() // ==================== SPECIAL QUERIES ====================
    /**
     * Get public bundles
     * GET /api/bundles/public
     */
    )
  }, {
    key: "getPublicBundles",
    value: function () {
      var _getPublicBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var _this$getPagination3, page, limit, filters, sort, search, result;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit;
              filters = {
                status: "active"
              };
              sort = this.getSort(req, "display_order");
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
              _context11.n = 1;
              return this.service("bundleService").repository.findAll(filters, page, limit, {
                sort: sort,
                populate: [{
                  path: "event",
                  select: "name id"
                }, {
                  path: "categories",
                  select: "name id is_voting_open"
                }]
              });
            case 1:
              result = _context11.v;
              return _context11.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee11, this);
      }));
      function getPublicBundles(_x23, _x24) {
        return _getPublicBundles.apply(this, arguments);
      }
      return getPublicBundles;
    }()
    /**
     * Get featured bundles
     * GET /api/bundles/featured
     */
  }, {
    key: "getFeatured",
    value: (function () {
      var _getFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var eventId, bundles;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              eventId = req.query.event || null;
              _context12.n = 1;
              return this.service("bundleService").getFeaturedBundles(eventId);
            case 1:
              bundles = _context12.v;
              return _context12.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee12, this);
      }));
      function getFeatured(_x25, _x26) {
        return _getFeatured.apply(this, arguments);
      }
      return getFeatured;
    }()
    /**
     * Get popular bundles
     * GET /api/bundles/popular
     */
    )
  }, {
    key: "getPopular",
    value: (function () {
      var _getPopular = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var eventId, limit, bundles;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              eventId = req.query.event || null;
              limit = parseInt(req.query.limit, 10) || 5;
              _context13.n = 1;
              return this.service("bundleService").getPopularBundles(eventId, limit);
            case 1:
              bundles = _context13.v;
              return _context13.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee13, this);
      }));
      function getPopular(_x27, _x28) {
        return _getPopular.apply(this, arguments);
      }
      return getPopular;
    }()
    /**
     * Get best value bundles
     * GET /api/bundles/best-value
     */
    )
  }, {
    key: "getBestValue",
    value: (function () {
      var _getBestValue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var eventId, limit, bundles;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              eventId = req.query.event;
              limit = parseInt(req.query.limit, 10) || 5;
              if (eventId) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2, this.badRequest(res, {
                message: "event query parameter is required"
              }));
            case 1:
              _context14.n = 2;
              return this.service("bundleService").getBestValueBundles(eventId, limit);
            case 2:
              bundles = _context14.v;
              return _context14.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee14, this);
      }));
      function getBestValue(_x29, _x30) {
        return _getBestValue.apply(this, arguments);
      }
      return getBestValue;
    }()
    /**
     * Get bundles by category
     * GET /api/bundles/category/:categoryId
     */
    )
  }, {
    key: "getByCategory",
    value: (function () {
      var _getByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var categoryId, bundles;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              categoryId = req.params.categoryId;
              _context15.n = 1;
              return this.service("bundleService").getBundlesByCategory(categoryId);
            case 1:
              bundles = _context15.v;
              return _context15.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee15, this);
      }));
      function getByCategory(_x31, _x32) {
        return _getByCategory.apply(this, arguments);
      }
      return getByCategory;
    }()
    /**
     * Get bundles by price range
     * GET /api/bundles/price-range
     */
    )
  }, {
    key: "getByPriceRange",
    value: (function () {
      var _getByPriceRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var _req$query, min_price, max_price, eventId, bundles;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _req$query = req.query, min_price = _req$query.min_price, max_price = _req$query.max_price, eventId = _req$query.event;
              if (!(!min_price || !max_price)) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2, this.badRequest(res, {
                message: "min_price and max_price query parameters are required"
              }));
            case 1:
              _context16.n = 2;
              return this.service("bundleService").getBundlesByPriceRange(parseFloat(min_price), parseFloat(max_price), eventId || null);
            case 2:
              bundles = _context16.v;
              return _context16.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee16, this);
      }));
      function getByPriceRange(_x33, _x34) {
        return _getByPriceRange.apply(this, arguments);
      }
      return getByPriceRange;
    }()
    /**
     * Get bundles expiring soon
     * GET /api/bundles/expiring-soon
     */
    )
  }, {
    key: "getExpiringSoon",
    value: (function () {
      var _getExpiringSoon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var days, eventId, bundles;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              days = parseInt(req.query.days, 10) || 7;
              eventId = req.query.event || null;
              _context17.n = 1;
              return this.service("bundleService").getExpiringSoonBundles(days, eventId);
            case 1:
              bundles = _context17.v;
              return _context17.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee17, this);
      }));
      function getExpiringSoon(_x35, _x36) {
        return _getExpiringSoon.apply(this, arguments);
      }
      return getExpiringSoon;
    }()
    /**
     * Get expired bundles
     * GET /api/bundles/expired
     */
    )
  }, {
    key: "getExpired",
    value: (function () {
      var _getExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var eventId, bundles;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              eventId = req.query.event || null;
              _context18.n = 1;
              return this.service("bundleService").getExpiredBundles(eventId);
            case 1:
              bundles = _context18.v;
              return _context18.a(2, this.success(res, {
                data: bundles
              }));
          }
        }, _callee18, this);
      }));
      function getExpired(_x37, _x38) {
        return _getExpired.apply(this, arguments);
      }
      return getExpired;
    }() // ==================== VALIDATION ====================
    /**
     * Validate bundle availability for purchase
     * GET /api/bundles/:id/validate
     */
    )
  }, {
    key: "validateAvailability",
    value: function () {
      var _validateAvailability = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
        var id, result;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              id = req.params.id;
              _context19.n = 1;
              return this.service("bundleService").validateBundleAvailability(id);
            case 1:
              result = _context19.v;
              return _context19.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee19, this);
      }));
      function validateAvailability(_x39, _x40) {
        return _validateAvailability.apply(this, arguments);
      }
      return validateAvailability;
    }()
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new BundleController();