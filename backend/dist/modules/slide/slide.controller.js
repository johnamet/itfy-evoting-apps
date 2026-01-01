"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SlideController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _slideService = _interopRequireDefault(require("./slide.service.js"));
var _slideValidation = _interopRequireDefault(require("./slide.validation.js"));
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
 * Slide Controller
 * Handles HTTP requests for slide/banner management
 */
var SlideController = exports.SlideController = /*#__PURE__*/function (_BaseController) {
  function SlideController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SlideController);
    return _callSuper(this, SlideController, [{
      slideService: dependencies.slideService || _slideService["default"]
    }]);
  }

  // ==================== SLIDE CRUD ====================

  /**
   * Create a new slide
   * POST /api/slides
   */
  _inherits(SlideController, _BaseController);
  return _createClass(SlideController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, adminId, slide;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _slideValidation["default"].createSlideSchema);
              adminId = this.getUserId(req);
              _context.n = 1;
              return this.service("slideService").createSlide(validated, adminId);
            case 1:
              slide = _context.v;
              return _context.a(2, this.created(res, {
                data: slide,
                message: "Slide created successfully"
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
     * Get all slides with pagination and filters
     * GET /api/slides
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
              filters = this.getFilters(req, ["slide_type", "status", "event", "is_active", "position"]);
              sort = this.getSort(req, "display_order");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  title: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  subtitle: {
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
              return this.service("slideService").getAllSlides(page, limit, filters, {
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
     * Get slide by ID
     * GET /api/slides/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, slide;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("slideService").getSlideById(id);
            case 1:
              slide = _context3.v;
              return _context3.a(2, this.success(res, {
                data: slide
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
     * Update slide
     * PUT /api/slides/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var id, validated, adminId, slide;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _slideValidation["default"].updateSlideSchema);
              adminId = this.getUserId(req);
              _context4.n = 1;
              return this.service("slideService").updateSlide(id, validated, adminId);
            case 1:
              slide = _context4.v;
              return _context4.a(2, this.success(res, {
                data: slide,
                message: "Slide updated successfully"
              }));
          }
        }, _callee4, this);
      }));
      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete slide (soft delete)
     * DELETE /api/slides/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, adminId, deleteImages;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              deleteImages = req.query.delete_images === "true";
              _context5.n = 1;
              return this.service("slideService").deleteSlide(id, adminId, deleteImages);
            case 1:
              return _context5.a(2, this.success(res, {
                message: "Slide deleted successfully"
              }));
          }
        }, _callee5, this);
      }));
      function _delete(_x9, _x0) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== STATUS MANAGEMENT ====================
    /**
     * Publish slide
     * PUT /api/slides/:id/publish
     */
    )
  }, {
    key: "publish",
    value: function () {
      var _publish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id, adminId, slide;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context6.n = 1;
              return this.service("slideService").publishSlide(id, adminId);
            case 1:
              slide = _context6.v;
              return _context6.a(2, this.success(res, {
                data: slide,
                message: "Slide published successfully"
              }));
          }
        }, _callee6, this);
      }));
      function publish(_x1, _x10) {
        return _publish.apply(this, arguments);
      }
      return publish;
    }()
    /**
     * Unpublish slide (revert to draft)
     * PUT /api/slides/:id/unpublish
     */
  }, {
    key: "unpublish",
    value: (function () {
      var _unpublish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var id, adminId, slide;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context7.n = 1;
              return this.service("slideService").unpublishSlide(id, adminId);
            case 1:
              slide = _context7.v;
              return _context7.a(2, this.success(res, {
                data: slide,
                message: "Slide unpublished successfully"
              }));
          }
        }, _callee7, this);
      }));
      function unpublish(_x11, _x12) {
        return _unpublish.apply(this, arguments);
      }
      return unpublish;
    }()
    /**
     * Archive slide
     * PUT /api/slides/:id/archive
     */
    )
  }, {
    key: "archive",
    value: (function () {
      var _archive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, adminId, slide;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context8.n = 1;
              return this.service("slideService").archiveSlide(id, adminId);
            case 1:
              slide = _context8.v;
              return _context8.a(2, this.success(res, {
                data: slide,
                message: "Slide archived successfully"
              }));
          }
        }, _callee8, this);
      }));
      function archive(_x13, _x14) {
        return _archive.apply(this, arguments);
      }
      return archive;
    }()
    /**
     * Toggle slide active status
     * PUT /api/slides/:id/toggle-active
     */
    )
  }, {
    key: "toggleActive",
    value: (function () {
      var _toggleActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var id, validated, adminId, slide;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _slideValidation["default"].toggleActiveSchema);
              adminId = this.getUserId(req);
              _context9.n = 1;
              return this.service("slideService").updateSlide(id, validated, adminId);
            case 1:
              slide = _context9.v;
              return _context9.a(2, this.success(res, {
                data: slide,
                message: "Slide ".concat(validated.is_active ? "activated" : "deactivated", " successfully")
              }));
          }
        }, _callee9, this);
      }));
      function toggleActive(_x15, _x16) {
        return _toggleActive.apply(this, arguments);
      }
      return toggleActive;
    }() // ==================== FILTERING ENDPOINTS ====================
    /**
     * Get slides by type
     * GET /api/slides/type/:type
     */
    )
  }, {
    key: "getByType",
    value: function () {
      var _getByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var type, slides;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              type = req.params.type;
              _context0.n = 1;
              return this.service("slideService").getSlidesByType(type);
            case 1:
              slides = _context0.v;
              return _context0.a(2, this.success(res, {
                data: slides
              }));
          }
        }, _callee0, this);
      }));
      function getByType(_x17, _x18) {
        return _getByType.apply(this, arguments);
      }
      return getByType;
    }()
    /**
     * Get slides by position
     * GET /api/slides/position/:position
     */
  }, {
    key: "getByPosition",
    value: (function () {
      var _getByPosition = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var position, slides;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              position = req.params.position;
              _context1.n = 1;
              return this.service("slideService").getSlidesByPosition(position);
            case 1:
              slides = _context1.v;
              return _context1.a(2, this.success(res, {
                data: slides
              }));
          }
        }, _callee1, this);
      }));
      function getByPosition(_x19, _x20) {
        return _getByPosition.apply(this, arguments);
      }
      return getByPosition;
    }()
    /**
     * Get active (published) slides
     * GET /api/slides/active
     */
    )
  }, {
    key: "getActive",
    value: (function () {
      var _getActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var slideType, slides;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              slideType = req.query.slide_type || null;
              _context10.n = 1;
              return this.service("slideService").getActiveSlides(slideType);
            case 1:
              slides = _context10.v;
              return _context10.a(2, this.success(res, {
                data: slides
              }));
          }
        }, _callee10, this);
      }));
      function getActive(_x21, _x22) {
        return _getActive.apply(this, arguments);
      }
      return getActive;
    }()
    /**
     * Get slides by event
     * GET /api/slides/event/:eventId
     */
    )
  }, {
    key: "getByEvent",
    value: (function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var eventId, slides;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              eventId = req.params.eventId;
              _context11.n = 1;
              return this.service("slideService").getSlidesByEvent(eventId);
            case 1:
              slides = _context11.v;
              return _context11.a(2, this.success(res, {
                data: slides
              }));
          }
        }, _callee11, this);
      }));
      function getByEvent(_x23, _x24) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get scheduled slides (within validity period)
     * GET /api/slides/scheduled
     */
    )
  }, {
    key: "getScheduled",
    value: (function () {
      var _getScheduled = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var slideType, slides;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              slideType = req.query.slide_type || null;
              _context12.n = 1;
              return this.service("slideService").getScheduledSlides(slideType);
            case 1:
              slides = _context12.v;
              return _context12.a(2, this.success(res, {
                data: slides
              }));
          }
        }, _callee12, this);
      }));
      function getScheduled(_x25, _x26) {
        return _getScheduled.apply(this, arguments);
      }
      return getScheduled;
    }() // ==================== ORDERING & ORGANIZATION ====================
    /**
     * Reorder slides
     * PUT /api/slides/reorder
     */
    )
  }, {
    key: "reorder",
    value: function () {
      var _reorder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var validated, adminId, slideType, orderData, slides;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              validated = this.validate(req.body, _slideValidation["default"].reorderSlidesSchema);
              adminId = this.getUserId(req);
              slideType = req.query.slide_type; // Transform validation schema format to service format
              orderData = validated.slide_orders.map(function (item) {
                return {
                  slideId: item.id,
                  displayOrder: item.display_order
                };
              });
              _context13.n = 1;
              return this.service("slideService").reorderSlides(orderData, slideType, adminId);
            case 1:
              slides = _context13.v;
              return _context13.a(2, this.success(res, {
                data: slides,
                message: "Slides reordered successfully"
              }));
          }
        }, _callee13, this);
      }));
      function reorder(_x27, _x28) {
        return _reorder.apply(this, arguments);
      }
      return reorder;
    }() // ==================== IMAGE MANAGEMENT ====================
    /**
     * Upload slide image
     * POST /api/slides/:id/image
     */
  }, {
    key: "uploadImage",
    value: function () {
      var _uploadImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var id, adminId, isMobile, slide;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              isMobile = req.query.mobile === "true";
              if (req.file) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2, this.badRequest(res, {
                message: "No image file provided"
              }));
            case 1:
              _context14.n = 2;
              return this.service("slideService").uploadSlideImage(id, req.file, adminId, isMobile);
            case 2:
              slide = _context14.v;
              return _context14.a(2, this.success(res, {
                data: slide,
                message: "".concat(isMobile ? "Mobile" : "Desktop", " image uploaded successfully")
              }));
          }
        }, _callee14, this);
      }));
      function uploadImage(_x29, _x30) {
        return _uploadImage.apply(this, arguments);
      }
      return uploadImage;
    }() // ==================== CLONING & BULK OPERATIONS ====================
    /**
     * Clone a slide
     * POST /api/slides/:id/clone
     */
  }, {
    key: "clone",
    value: function () {
      var _clone = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var id, adminId, overrides, clonedSlide;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              overrides = req.body || {};
              _context15.n = 1;
              return this.service("slideService").cloneSlide(id, overrides, adminId);
            case 1:
              clonedSlide = _context15.v;
              return _context15.a(2, this.created(res, {
                data: clonedSlide,
                message: "Slide cloned successfully"
              }));
          }
        }, _callee15, this);
      }));
      function clone(_x31, _x32) {
        return _clone.apply(this, arguments);
      }
      return clone;
    }()
    /**
     * Bulk update slide status
     * PUT /api/slides/bulk/status
     */
  }, {
    key: "bulkUpdateStatus",
    value: (function () {
      var _bulkUpdateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var _req$body, slide_ids, status, adminId, slides;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _req$body = req.body, slide_ids = _req$body.slide_ids, status = _req$body.status;
              adminId = this.getUserId(req);
              if (!(!Array.isArray(slide_ids) || slide_ids.length === 0)) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2, this.badRequest(res, {
                message: "slide_ids must be a non-empty array"
              }));
            case 1:
              _context16.n = 2;
              return this.service("slideService").bulkUpdateStatus(slide_ids, status, adminId);
            case 2:
              slides = _context16.v;
              return _context16.a(2, this.success(res, {
                data: slides,
                message: "".concat(slides.length, " slides updated to ").concat(status)
              }));
          }
        }, _callee16, this);
      }));
      function bulkUpdateStatus(_x33, _x34) {
        return _bulkUpdateStatus.apply(this, arguments);
      }
      return bulkUpdateStatus;
    }() // ==================== ANALYTICS ====================
    /**
     * Increment view count
     * POST /api/slides/:id/view
     */
    )
  }, {
    key: "incrementViewCount",
    value: function () {
      var _incrementViewCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var id, slide;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              id = req.params.id;
              _context17.n = 1;
              return this.service("slideService").updateSlide(id, {
                $inc: {
                  view_count: 1
                }
              });
            case 1:
              slide = _context17.v;
              return _context17.a(2, this.success(res, {
                data: {
                  view_count: slide.view_count
                },
                message: "View count incremented"
              }));
          }
        }, _callee17, this);
      }));
      function incrementViewCount(_x35, _x36) {
        return _incrementViewCount.apply(this, arguments);
      }
      return incrementViewCount;
    }()
    /**
     * Increment click count
     * POST /api/slides/:id/click
     */
  }, {
    key: "incrementClickCount",
    value: (function () {
      var _incrementClickCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var id, slide;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              id = req.params.id;
              _context18.n = 1;
              return this.service("slideService").updateSlide(id, {
                $inc: {
                  click_count: 1
                }
              });
            case 1:
              slide = _context18.v;
              return _context18.a(2, this.success(res, {
                data: {
                  click_count: slide.click_count
                },
                message: "Click count incremented"
              }));
          }
        }, _callee18, this);
      }));
      function incrementClickCount(_x37, _x38) {
        return _incrementClickCount.apply(this, arguments);
      }
      return incrementClickCount;
    }())
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new SlideController();