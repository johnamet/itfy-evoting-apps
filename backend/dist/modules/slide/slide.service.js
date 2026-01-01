"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SlideService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _slideRepository = _interopRequireDefault(require("./slide.repository.js"));
var _eventRepository = _interopRequireDefault(require("../event/event.repository.js"));
var _activityService = _interopRequireDefault(require("../activity/activity.service.js"));
var _fileService = _interopRequireDefault(require("../../services/file.service.js"));
var _slideValidation = _interopRequireDefault(require("./slide.validation.js"));
var _slideConstants = require("../../utils/constants/slide.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
* Slide Service
* Handles business logic for slide management (hero/banner sections)
*/
// Set validation schemas for BaseService.validate()
_baseService["default"].setValidation(_slideValidation["default"]);
var SlideService = exports.SlideService = /*#__PURE__*/function (_BaseService) {
  function SlideService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SlideService);
    _this = _callSuper(this, SlideService);
    _this.repository = dependencies.repository || _slideRepository["default"];
    _this.eventRepository = dependencies.eventRepository || _eventRepository["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    return _this;
  }

  /**
   * Create a new slide
   * @param {Object} slideData - Slide data
   * @param {string} adminId - Admin creating the slide
   * @returns {Promise<Object>} - Created slide
   */
  _inherits(SlideService, _BaseService);
  return _createClass(SlideService, [{
    key: "createSlide",
    value: (function () {
      var _createSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(slideData, adminId) {
        var validatedData, event, existingSlides, slideToCreate, slide, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(slideData, _slideValidation["default"].createSlideSchema); // Validate event if provided
              if (!validatedData.event) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return this.eventRepository.findById(validatedData.event);
            case 1:
              event = _context.v;
              if (event) {
                _context.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!(!validatedData.display_order && validatedData.display_order !== 0)) {
                _context.n = 4;
                break;
              }
              _context.n = 3;
              return this.repository.findByType(validatedData.slide_type || _slideConstants.SLIDE_TYPE.HERO);
            case 3:
              existingSlides = _context.v;
              validatedData.display_order = existingSlides.length;
            case 4:
              slideToCreate = _objectSpread(_objectSpread({}, validatedData), {}, {
                created_by: adminId
              });
              _context.n = 5;
              return this.repository.create(slideToCreate);
            case 5:
              slide = _context.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slide._id,
                eventId: slide.event,
                description: "Created slide: ".concat(slide.title),
                metadata: {
                  slideTitle: slide.title,
                  slideType: slide.slide_type,
                  status: slide.status
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context.a(2, slide);
            case 6:
              _context.p = 6;
              _t = _context.v;
              throw new Error("Failed to create slide: ".concat(_t.message));
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[0, 6]]);
      }));
      function createSlide(_x, _x2) {
        return _createSlide.apply(this, arguments);
      }
      return createSlide;
    }()
    /**
     * Update a slide
     * @param {string} slideId - Slide ID
     * @param {Object} updateData - Update data
     * @param {string} adminId - Admin updating the slide
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "updateSlide",
    value: (function () {
      var _updateSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(slideId, updateData, adminId) {
        var _slide$event, validatedData, slide, event, updatedSlide, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(updateData, _slideValidation["default"].updateSlideSchema);
              _context2.n = 1;
              return this.repository.findById(slideId);
            case 1:
              slide = _context2.v;
              if (slide) {
                _context2.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              if (!(validatedData.event && validatedData.event !== ((_slide$event = slide.event) === null || _slide$event === void 0 ? void 0 : _slide$event.toString()))) {
                _context2.n = 4;
                break;
              }
              _context2.n = 3;
              return this.eventRepository.findById(validatedData.event);
            case 3:
              event = _context2.v;
              if (event) {
                _context2.n = 4;
                break;
              }
              throw new Error("Event not found");
            case 4:
              _context2.n = 5;
              return this.repository.updateById(slideId, validatedData);
            case 5:
              updatedSlide = _context2.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slideId,
                eventId: slide.event,
                description: "Updated slide: ".concat(slide.title),
                metadata: {
                  slideTitle: slide.title,
                  changes: Object.keys(updateData)
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context2.a(2, updatedSlide);
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              throw new Error("Failed to update slide: ".concat(_t2.message));
            case 7:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 6]]);
      }));
      function updateSlide(_x3, _x4, _x5) {
        return _updateSlide.apply(this, arguments);
      }
      return updateSlide;
    }()
    /**
     * Delete a slide (soft delete)
     * @param {string} slideId - Slide ID
     * @param {string} adminId - Admin deleting the slide
     * @param {boolean} deleteImages - Whether to delete associated images
     * @returns {Promise<Object>} - Deleted slide
     */
    )
  }, {
    key: "deleteSlide",
    value: (function () {
      var _deleteSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(slideId, adminId) {
        var deleteImages,
          slide,
          _slide$image,
          _slide$mobile_image,
          deletedSlide,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              deleteImages = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
              _context3.p = 1;
              _context3.n = 2;
              return this.repository.findById(slideId);
            case 2:
              slide = _context3.v;
              if (slide) {
                _context3.n = 3;
                break;
              }
              throw new Error("Slide not found");
            case 3:
              if (!deleteImages) {
                _context3.n = 5;
                break;
              }
              if (!((_slide$image = slide.image) !== null && _slide$image !== void 0 && _slide$image.public_id)) {
                _context3.n = 4;
                break;
              }
              _context3.n = 4;
              return _fileService["default"].deleteFile(slide.image.public_id);
            case 4:
              if (!((_slide$mobile_image = slide.mobile_image) !== null && _slide$mobile_image !== void 0 && _slide$mobile_image.public_id)) {
                _context3.n = 5;
                break;
              }
              _context3.n = 5;
              return _fileService["default"].deleteFile(slide.mobile_image.public_id);
            case 5:
              _context3.n = 6;
              return this.repository["delete"]({
                _id: slideId
              });
            case 6:
              deletedSlide = _context3.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.DELETE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slideId,
                eventId: slide.event,
                description: "Deleted slide: ".concat(slide.title),
                metadata: {
                  slideTitle: slide.title,
                  slideType: slide.slide_type,
                  imagesDeleted: deleteImages
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context3.a(2, deletedSlide);
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              throw new Error("Failed to delete slide: ".concat(_t3.message));
            case 8:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 7]]);
      }));
      function deleteSlide(_x6, _x7) {
        return _deleteSlide.apply(this, arguments);
      }
      return deleteSlide;
    }()
    /**
     * Publish a slide
     * @param {string} slideId - Slide ID
     * @param {string} adminId - Admin publishing the slide
     * @returns {Promise<Object>} - Published slide
     */
    )
  }, {
    key: "publishSlide",
    value: (function () {
      var _publishSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(slideId, adminId) {
        var slide, publishedSlide, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.repository.findById(slideId);
            case 1:
              slide = _context4.v;
              if (slide) {
                _context4.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              if (!(slide.status === _slideConstants.SLIDE_STATUS.PUBLISHED)) {
                _context4.n = 3;
                break;
              }
              throw new Error("Slide is already published");
            case 3:
              _context4.n = 4;
              return this.repository.updateById(slideId, {
                status: _slideConstants.SLIDE_STATUS.PUBLISHED
              });
            case 4:
              publishedSlide = _context4.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slideId,
                eventId: slide.event,
                description: "Published slide: ".concat(slide.title),
                metadata: {
                  slideTitle: slide.title
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context4.a(2, publishedSlide);
            case 5:
              _context4.p = 5;
              _t4 = _context4.v;
              throw new Error("Failed to publish slide: ".concat(_t4.message));
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 5]]);
      }));
      function publishSlide(_x8, _x9) {
        return _publishSlide.apply(this, arguments);
      }
      return publishSlide;
    }()
    /**
     * Unpublish a slide (revert to draft)
     * @param {string} slideId - Slide ID
     * @param {string} adminId - Admin unpublishing the slide
     * @returns {Promise<Object>} - Unpublished slide
     */
    )
  }, {
    key: "unpublishSlide",
    value: (function () {
      var _unpublishSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(slideId, adminId) {
        var slide, unpublishedSlide, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.repository.findById(slideId);
            case 1:
              slide = _context5.v;
              if (slide) {
                _context5.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              if (!(slide.status === _slideConstants.SLIDE_STATUS.DRAFT)) {
                _context5.n = 3;
                break;
              }
              throw new Error("Slide is already in draft");
            case 3:
              _context5.n = 4;
              return this.repository.updateById(slideId, {
                status: _slideConstants.SLIDE_STATUS.DRAFT
              });
            case 4:
              unpublishedSlide = _context5.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slideId,
                eventId: slide.event,
                description: "Unpublished slide: ".concat(slide.title),
                metadata: {
                  slideTitle: slide.title
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context5.a(2, unpublishedSlide);
            case 5:
              _context5.p = 5;
              _t5 = _context5.v;
              throw new Error("Failed to unpublish slide: ".concat(_t5.message));
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 5]]);
      }));
      function unpublishSlide(_x0, _x1) {
        return _unpublishSlide.apply(this, arguments);
      }
      return unpublishSlide;
    }()
    /**
     * Archive a slide
     * @param {string} slideId - Slide ID
     * @param {string} adminId - Admin archiving the slide
     * @returns {Promise<Object>} - Archived slide
     */
    )
  }, {
    key: "archiveSlide",
    value: (function () {
      var _archiveSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(slideId, adminId) {
        var slide, archivedSlide, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.repository.findById(slideId);
            case 1:
              slide = _context6.v;
              if (slide) {
                _context6.n = 2;
                break;
              }
              throw new Error("Slide not found");
            case 2:
              if (!(slide.status === _slideConstants.SLIDE_STATUS.ARCHIVED)) {
                _context6.n = 3;
                break;
              }
              throw new Error("Slide is already archived");
            case 3:
              _context6.n = 4;
              return this.repository.updateById(slideId, {
                status: _slideConstants.SLIDE_STATUS.ARCHIVED
              });
            case 4:
              archivedSlide = _context6.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slideId,
                eventId: slide.event,
                description: "Archived slide: ".concat(slide.title),
                metadata: {
                  slideTitle: slide.title
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context6.a(2, archivedSlide);
            case 5:
              _context6.p = 5;
              _t6 = _context6.v;
              throw new Error("Failed to archive slide: ".concat(_t6.message));
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 5]]);
      }));
      function archiveSlide(_x10, _x11) {
        return _archiveSlide.apply(this, arguments);
      }
      return archiveSlide;
    }()
    /**
     * Reorder slides
     * @param {Array<{slideId: string, displayOrder: number}>} orderData - New order
     * @param {string} slideType - Slide type to reorder
     * @param {string} adminId - Admin reordering slides
     * @returns {Promise<Array>} - Updated slides
     */
    )
  }, {
    key: "reorderSlides",
    value: (function () {
      var _reorderSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(orderData, slideType, adminId) {
        var _this2 = this;
        var slideIds, slides, updatePromises, updatedSlides, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              // Validate all slides exist and belong to the same type
              slideIds = orderData.map(function (item) {
                return item.slideId;
              });
              _context7.n = 1;
              return this.repository.findAll({
                _id: {
                  $in: slideIds
                },
                slide_type: slideType
              }, 1, slideIds.length);
            case 1:
              slides = _context7.v;
              if (!(slides.data.length !== slideIds.length)) {
                _context7.n = 2;
                break;
              }
              throw new Error("One or more slides not found or do not match the specified type");
            case 2:
              // Update display orders
              updatePromises = orderData.map(function (item) {
                return _this2.repository.updateById(item.slideId, {
                  display_order: item.displayOrder
                });
              });
              _context7.n = 3;
              return Promise.all(updatePromises);
            case 3:
              updatedSlides = _context7.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                description: "Reordered ".concat(slideIds.length, " ").concat(slideType, " slides"),
                metadata: {
                  slideType: slideType,
                  slideCount: slideIds.length,
                  slideIds: slideIds
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context7.a(2, updatedSlides);
            case 4:
              _context7.p = 4;
              _t7 = _context7.v;
              throw new Error("Failed to reorder slides: ".concat(_t7.message));
            case 5:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 4]]);
      }));
      function reorderSlides(_x12, _x13, _x14) {
        return _reorderSlides.apply(this, arguments);
      }
      return reorderSlides;
    }()
    /**
     * Get slide by ID
     * @param {string} slideId - Slide ID
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Slide
     */
    )
  }, {
    key: "getSlideById",
    value: (function () {
      var _getSlideById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(slideId) {
        var options,
          slide,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              _context8.p = 1;
              _context8.n = 2;
              return this.repository.findById(slideId, options);
            case 2:
              slide = _context8.v;
              if (slide) {
                _context8.n = 3;
                break;
              }
              throw new Error("Slide not found");
            case 3:
              return _context8.a(2, slide);
            case 4:
              _context8.p = 4;
              _t8 = _context8.v;
              throw new Error("Failed to get slide: ".concat(_t8.message));
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 4]]);
      }));
      function getSlideById(_x15) {
        return _getSlideById.apply(this, arguments);
      }
      return getSlideById;
    }()
    /**
     * Get all slides
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} filters - Filter criteria
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated slides
     */
    )
  }, {
    key: "getAllSlides",
    value: (function () {
      var _getAllSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var page,
          limit,
          filters,
          options,
          slides,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              page = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : 1;
              limit = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 10;
              filters = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
              options = _args9.length > 3 && _args9[3] !== undefined ? _args9[3] : {};
              _context9.p = 1;
              _context9.n = 2;
              return this.repository.findAll(filters, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  display_order: 1,
                  created_at: -1
                }
              }));
            case 2:
              slides = _context9.v;
              return _context9.a(2, slides);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Failed to get slides: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function getAllSlides() {
        return _getAllSlides.apply(this, arguments);
      }
      return getAllSlides;
    }()
    /**
     * Get slides by type
     * @param {string} slideType - Slide type
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Slides
     */
    )
  }, {
    key: "getSlidesByType",
    value: (function () {
      var _getSlidesByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(slideType) {
        var options,
          slides,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              _context0.p = 1;
              _context0.n = 2;
              return this.repository.findByType(slideType, options);
            case 2:
              slides = _context0.v;
              return _context0.a(2, slides);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Failed to get slides by type: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function getSlidesByType(_x16) {
        return _getSlidesByType.apply(this, arguments);
      }
      return getSlidesByType;
    }()
    /**
     * Get slides by position
     * @param {string} position - Slide position
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Slides
     */
    )
  }, {
    key: "getSlidesByPosition",
    value: (function () {
      var _getSlidesByPosition = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(position) {
        var options,
          slides,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.repository.findByPosition(position, options);
            case 2:
              slides = _context1.v;
              return _context1.a(2, slides);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Failed to get slides by position: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function getSlidesByPosition(_x17) {
        return _getSlidesByPosition.apply(this, arguments);
      }
      return getSlidesByPosition;
    }()
    /**
     * Get active (published) slides
     * @param {string} slideType - Optional slide type filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Active slides
     */
    )
  }, {
    key: "getActiveSlides",
    value: (function () {
      var _getActiveSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var slideType,
          options,
          slides,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              slideType = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : null;
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.repository.findActive(slideType, options);
            case 2:
              slides = _context10.v;
              return _context10.a(2, slides);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Failed to get active slides: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function getActiveSlides() {
        return _getActiveSlides.apply(this, arguments);
      }
      return getActiveSlides;
    }()
    /**
     * Get slides by event
     * @param {string} eventId - Event ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Event slides
     */
    )
  }, {
    key: "getSlidesByEvent",
    value: (function () {
      var _getSlidesByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(eventId) {
        var options,
          slides,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findByEvent(eventId, options);
            case 2:
              slides = _context11.v;
              return _context11.a(2, slides);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Failed to get event slides: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function getSlidesByEvent(_x18) {
        return _getSlidesByEvent.apply(this, arguments);
      }
      return getSlidesByEvent;
    }()
    /**
     * Get scheduled slides (within validity period)
     * @param {string} slideType - Optional slide type filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Scheduled slides
     */
    )
  }, {
    key: "getScheduledSlides",
    value: (function () {
      var _getScheduledSlides = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var slideType,
          options,
          slides,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              slideType = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : null;
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.repository.findScheduled(slideType, options);
            case 2:
              slides = _context12.v;
              return _context12.a(2, slides);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Failed to get scheduled slides: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function getScheduledSlides() {
        return _getScheduledSlides.apply(this, arguments);
      }
      return getScheduledSlides;
    }()
    /**
     * Upload slide image
     * @param {string} slideId - Slide ID
     * @param {Object} file - Image file
     * @param {string} adminId - Admin uploading the image
     * @param {boolean} isMobile - Whether this is a mobile image
     * @returns {Promise<Object>} - Updated slide
     */
    )
  }, {
    key: "uploadSlideImage",
    value: (function () {
      var _uploadSlideImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(slideId, file, adminId) {
        var isMobile,
          slide,
          existingImage,
          uploadResult,
          updateData,
          updatedSlide,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              isMobile = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : false;
              _context13.p = 1;
              _context13.n = 2;
              return this.repository.findById(slideId);
            case 2:
              slide = _context13.v;
              if (slide) {
                _context13.n = 3;
                break;
              }
              throw new Error("Slide not found");
            case 3:
              // Delete old image if exists
              existingImage = isMobile ? slide.mobile_image : slide.image;
              if (!(existingImage !== null && existingImage !== void 0 && existingImage.public_id)) {
                _context13.n = 4;
                break;
              }
              _context13.n = 4;
              return _fileService["default"].deleteFile(existingImage.public_id);
            case 4:
              _context13.n = 5;
              return _fileService["default"].uploadFile(file, {
                folder: "slides/".concat(slide._id),
                transformation: [{
                  width: isMobile ? 768 : 1920,
                  height: isMobile ? 1024 : 1080,
                  crop: "limit"
                }, {
                  quality: "auto"
                }, {
                  fetch_format: "auto"
                }]
              });
            case 5:
              uploadResult = _context13.v;
              // Update slide
              updateData = isMobile ? {
                mobile_image: {
                  url: uploadResult.secure_url,
                  public_id: uploadResult.public_id,
                  alt: slide.title
                }
              } : {
                image: {
                  url: uploadResult.secure_url,
                  public_id: uploadResult.public_id,
                  alt: slide.title
                }
              };
              _context13.n = 6;
              return this.repository.updateById(slideId, updateData);
            case 6:
              updatedSlide = _context13.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: slideId,
                eventId: slide.event,
                description: "Uploaded ".concat(isMobile ? "mobile" : "desktop", " image for slide: ").concat(slide.title),
                metadata: {
                  slideTitle: slide.title,
                  imageType: isMobile ? "mobile" : "desktop",
                  publicId: uploadResult.public_id
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context13.a(2, updatedSlide);
            case 7:
              _context13.p = 7;
              _t13 = _context13.v;
              throw new Error("Failed to upload slide image: ".concat(_t13.message));
            case 8:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 7]]);
      }));
      function uploadSlideImage(_x19, _x20, _x21) {
        return _uploadSlideImage.apply(this, arguments);
      }
      return uploadSlideImage;
    }()
    /**
     * Clone a slide
     * @param {string} slideId - Slide ID to clone
     * @param {Object} overrides - Override data
     * @param {string} adminId - Admin cloning the slide
     * @returns {Promise<Object>} - Cloned slide
     */
    )
  }, {
    key: "cloneSlide",
    value: (function () {
      var _cloneSlide = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(slideId) {
        var overrides,
          adminId,
          slide,
          cloneData,
          clonedSlide,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              overrides = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : {};
              adminId = _args14.length > 2 ? _args14[2] : undefined;
              _context14.p = 1;
              _context14.n = 2;
              return this.repository.findById(slideId);
            case 2:
              slide = _context14.v;
              if (slide) {
                _context14.n = 3;
                break;
              }
              throw new Error("Slide not found");
            case 3:
              // Create clone data
              cloneData = {
                title: overrides.title || "".concat(slide.title, " (Copy)"),
                subtitle: slide.subtitle,
                description: slide.description,
                slide_type: slide.slide_type,
                status: overrides.status || _slideConstants.SLIDE_STATUS.DRAFT,
                // Clone as draft by default
                event: overrides.event || slide.event,
                image: slide.image,
                mobile_image: slide.mobile_image,
                background_color: slide.background_color,
                text_color: slide.text_color,
                overlay_opacity: slide.overlay_opacity,
                button: slide.button,
                position: slide.position,
                animation_type: slide.animation_type,
                animation_duration: slide.animation_duration,
                is_fullscreen: slide.is_fullscreen,
                validity_start: overrides.validity_start || null,
                validity_end: overrides.validity_end || null
              };
              _context14.n = 4;
              return this.createSlide(cloneData, adminId);
            case 4:
              clonedSlide = _context14.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                entityId: clonedSlide._id,
                eventId: clonedSlide.event,
                description: "Cloned slide from: ".concat(slide.title),
                metadata: {
                  originalSlideId: slideId,
                  originalSlideTitle: slide.title,
                  newSlideTitle: clonedSlide.title
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context14.a(2, clonedSlide);
            case 5:
              _context14.p = 5;
              _t14 = _context14.v;
              throw new Error("Failed to clone slide: ".concat(_t14.message));
            case 6:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 5]]);
      }));
      function cloneSlide(_x22) {
        return _cloneSlide.apply(this, arguments);
      }
      return cloneSlide;
    }()
    /**
     * Bulk update slide status
     * @param {Array<string>} slideIds - Array of slide IDs
     * @param {string} status - New status
     * @param {string} adminId - Admin updating slides
     * @returns {Promise<Array>} - Updated slides
     */
    )
  }, {
    key: "bulkUpdateStatus",
    value: (function () {
      var _bulkUpdateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(slideIds, status, adminId) {
        var _this3 = this;
        var slides, updatePromises, updatedSlides, _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              if (Object.values(_slideConstants.SLIDE_STATUS).includes(status)) {
                _context15.n = 1;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 1:
              _context15.n = 2;
              return this.repository.findAll({
                _id: {
                  $in: slideIds
                }
              }, 1, slideIds.length);
            case 2:
              slides = _context15.v;
              if (!(slides.data.length !== slideIds.length)) {
                _context15.n = 3;
                break;
              }
              throw new Error("One or more slides not found");
            case 3:
              // Update all slides
              updatePromises = slideIds.map(function (slideId) {
                return _this3.repository.updateById(slideId, {
                  status: status
                });
              });
              _context15.n = 4;
              return Promise.all(updatePromises);
            case 4:
              updatedSlides = _context15.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.SLIDE,
                description: "Bulk updated ".concat(slideIds.length, " slides to ").concat(status),
                metadata: {
                  slideCount: slideIds.length,
                  slideIds: slideIds,
                  newStatus: status
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context15.a(2, updatedSlides);
            case 5:
              _context15.p = 5;
              _t15 = _context15.v;
              throw new Error("Failed to bulk update slides: ".concat(_t15.message));
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 5]]);
      }));
      function bulkUpdateStatus(_x23, _x24, _x25) {
        return _bulkUpdateStatus.apply(this, arguments);
      }
      return bulkUpdateStatus;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new SlideService();