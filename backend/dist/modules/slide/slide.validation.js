"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSlideStatusSchema = exports.updateSlideSchema = exports.toggleActiveSchema = exports.slideQuerySchema = exports.slideIdSchema = exports.reorderSlidesSchema = exports.incrementViewCountSchema = exports.incrementClickCountSchema = exports["default"] = exports.createSlideSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _slideConstants = require("../../utils/constants/slide.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7, _Joi$string8, _Joi$string9, _Joi$string0, _Joi$string1, _Joi$string10;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Slide module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Image schema
var imageSchema = _joi["default"].object({
  url: _joi["default"].string().uri().required(),
  alt: _joi["default"].string().trim()["default"](""),
  public_id: _joi["default"].string().trim().optional()
});

// Button schema
var buttonSchema = _joi["default"].object({
  text: _joi["default"].string().trim().required(),
  url: _joi["default"].string().uri().required(),
  style: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_slideConstants.BUTTON_STYLE)))["default"](_slideConstants.BUTTON_STYLE.PRIMARY),
  opens_in_new_tab: _joi["default"]["boolean"]()["default"](false)
});

// Create slide validation
var createSlideSchema = exports.createSlideSchema = _joi["default"].object({
  title: _joi["default"].string().trim().min(3).max(200).required(),
  subtitle: _joi["default"].string().trim().max(200).optional(),
  description: _joi["default"].string().trim().max(1000).optional(),
  slide_type: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_slideConstants.SLIDE_TYPE)))["default"](_slideConstants.SLIDE_TYPE.HERO),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_slideConstants.SLIDE_STATUS)))["default"](_slideConstants.SLIDE_STATUS.DRAFT),
  event: ObjectId().optional(),
  image: imageSchema.required(),
  mobile_image: imageSchema.optional(),
  background_color: _joi["default"].string().trim().optional(),
  text_color: _joi["default"].string().trim()["default"]("#ffffff"),
  overlay_opacity: _joi["default"].number().min(0).max(100)["default"](40),
  button: buttonSchema.optional(),
  secondary_button: buttonSchema.optional(),
  position: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_slideConstants.SLIDE_POSITION)))["default"](_slideConstants.SLIDE_POSITION.MIDDLE),
  animation: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_slideConstants.ANIMATION_TYPE)))["default"](_slideConstants.ANIMATION_TYPE.FADE),
  animation_duration: _joi["default"].number().min(0)["default"](300),
  display_order: _joi["default"].number().integer().min(0)["default"](0),
  is_active: _joi["default"]["boolean"]()["default"](true),
  start_date: _joi["default"].date().optional(),
  end_date: _joi["default"].date().when("start_date", {
    is: _joi["default"].exist(),
    then: _joi["default"].date().greater(_joi["default"].ref("start_date")),
    otherwise: _joi["default"].date()
  }).optional(),
  click_count: _joi["default"].number().integer().min(0)["default"](0),
  view_count: _joi["default"].number().integer().min(0)["default"](0),
  metadata: _joi["default"].object().unknown(true)["default"]({})
});

// Update slide validation
var updateSlideSchema = exports.updateSlideSchema = _joi["default"].object({
  title: _joi["default"].string().trim().min(3).max(200),
  subtitle: _joi["default"].string().trim().max(200),
  description: _joi["default"].string().trim().max(1000),
  slide_type: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_slideConstants.SLIDE_TYPE))),
  status: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_slideConstants.SLIDE_STATUS))),
  event: ObjectId(),
  image: imageSchema,
  mobile_image: imageSchema,
  background_color: _joi["default"].string().trim(),
  text_color: _joi["default"].string().trim(),
  overlay_opacity: _joi["default"].number().min(0).max(100),
  button: buttonSchema,
  secondary_button: buttonSchema,
  position: (_Joi$string8 = _joi["default"].string()).valid.apply(_Joi$string8, _toConsumableArray(Object.values(_slideConstants.SLIDE_POSITION))),
  animation: (_Joi$string9 = _joi["default"].string()).valid.apply(_Joi$string9, _toConsumableArray(Object.values(_slideConstants.ANIMATION_TYPE))),
  animation_duration: _joi["default"].number().min(0),
  display_order: _joi["default"].number().integer().min(0),
  is_active: _joi["default"]["boolean"](),
  start_date: _joi["default"].date(),
  end_date: _joi["default"].date(),
  click_count: _joi["default"].number().integer().min(0),
  view_count: _joi["default"].number().integer().min(0),
  metadata: _joi["default"].object().unknown(true)
}).min(1);

// Slide ID parameter validation
var slideIdSchema = exports.slideIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var slideQuerySchema = exports.slideQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  slide_type: (_Joi$string0 = _joi["default"].string()).valid.apply(_Joi$string0, _toConsumableArray(Object.values(_slideConstants.SLIDE_TYPE))),
  status: (_Joi$string1 = _joi["default"].string()).valid.apply(_Joi$string1, _toConsumableArray(Object.values(_slideConstants.SLIDE_STATUS))),
  event: ObjectId(),
  is_active: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  sort: _joi["default"].string().valid("display_order", "title", "view_count", "click_count", "created_at", "-display_order", "-title", "-view_count", "-click_count", "-created_at")["default"]("display_order")
});

// Update slide status validation
var updateSlideStatusSchema = exports.updateSlideStatusSchema = _joi["default"].object({
  status: (_Joi$string10 = _joi["default"].string()).valid.apply(_Joi$string10, _toConsumableArray(Object.values(_slideConstants.SLIDE_STATUS))).required()
});

// Toggle active validation
var toggleActiveSchema = exports.toggleActiveSchema = _joi["default"].object({
  is_active: _joi["default"]["boolean"]().required()
});

// Increment view count validation
var incrementViewCountSchema = exports.incrementViewCountSchema = _joi["default"].object({
  increment: _joi["default"].number().integer().min(1)["default"](1)
});

// Increment click count validation
var incrementClickCountSchema = exports.incrementClickCountSchema = _joi["default"].object({
  increment: _joi["default"].number().integer().min(1)["default"](1)
});

// Reorder slides validation
var reorderSlidesSchema = exports.reorderSlidesSchema = _joi["default"].object({
  slide_orders: _joi["default"].array().items(_joi["default"].object({
    id: ObjectId().required(),
    display_order: _joi["default"].number().integer().min(0).required()
  })).min(1).required()
});
var _default = exports["default"] = {
  createSlideSchema: createSlideSchema,
  updateSlideSchema: updateSlideSchema,
  slideIdSchema: slideIdSchema,
  slideQuerySchema: slideQuerySchema,
  updateSlideStatusSchema: updateSlideStatusSchema,
  toggleActiveSchema: toggleActiveSchema,
  incrementViewCountSchema: incrementViewCountSchema,
  incrementClickCountSchema: incrementClickCountSchema,
  reorderSlidesSchema: reorderSlidesSchema
};