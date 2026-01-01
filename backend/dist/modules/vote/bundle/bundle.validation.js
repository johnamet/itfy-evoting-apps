"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBundleStatusSchema = exports.updateBundleSchema = exports.markAsPopularSchema = exports.incrementPurchasesSchema = exports.featureBundleSchema = exports["default"] = exports.createBundleSchema = exports.bundleQuerySchema = exports.bundleIdSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _eventConstants = require("../../../utils/constants/event.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Bundle module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Create bundle validation
var createBundleSchema = exports.createBundleSchema = _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200).required(),
  description: _joi["default"].string().trim().max(1000).optional(),
  slug: _joi["default"].string().lowercase().trim().optional(),
  event: ObjectId().required(),
  categories: _joi["default"].array().items(ObjectId())["default"]([]),
  vote_count: _joi["default"].number().integer().min(1).required(),
  price: _joi["default"].number().min(0).required(),
  currency: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_eventConstants.CURRENCY))).uppercase()["default"](_eventConstants.CURRENCY.GHS),
  discount_percentage: _joi["default"].number().min(0).max(100)["default"](0),
  original_price: _joi["default"].number().min(0).optional(),
  is_featured: _joi["default"]["boolean"]()["default"](false),
  is_popular: _joi["default"]["boolean"]()["default"](false),
  display_order: _joi["default"].number().integer().min(0)["default"](0),
  status: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_voteConstants.BUNDLE_STATUS)))["default"](_voteConstants.BUNDLE_STATUS.ACTIVE),
  validity_start: _joi["default"].date().optional(),
  validity_end: _joi["default"].date().when("validity_start", {
    is: _joi["default"].exist(),
    then: _joi["default"].date().greater(_joi["default"].ref("validity_start")),
    otherwise: _joi["default"].date()
  }).optional(),
  total_purchases: _joi["default"].number().integer().min(0)["default"](0),
  total_revenue: _joi["default"].number().min(0)["default"](0),
  icon: _joi["default"].string().uri().optional(),
  color_theme: _joi["default"].string().trim().optional(),
  features: _joi["default"].array().items(_joi["default"].string().trim())["default"]([]),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional()
});

// Update bundle validation
var updateBundleSchema = exports.updateBundleSchema = _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200),
  description: _joi["default"].string().trim().max(1000),
  slug: _joi["default"].string().lowercase().trim(),
  categories: _joi["default"].array().items(ObjectId()),
  vote_count: _joi["default"].number().integer().min(1),
  price: _joi["default"].number().min(0),
  currency: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_eventConstants.CURRENCY))).uppercase(),
  discount_percentage: _joi["default"].number().min(0).max(100),
  original_price: _joi["default"].number().min(0),
  is_featured: _joi["default"]["boolean"](),
  is_popular: _joi["default"]["boolean"](),
  display_order: _joi["default"].number().integer().min(0),
  status: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_voteConstants.BUNDLE_STATUS))),
  validity_start: _joi["default"].date(),
  validity_end: _joi["default"].date(),
  total_purchases: _joi["default"].number().integer().min(0),
  total_revenue: _joi["default"].number().min(0),
  icon: _joi["default"].string().uri(),
  color_theme: _joi["default"].string().trim(),
  features: _joi["default"].array().items(_joi["default"].string().trim()),
  metadata: _joi["default"].object().unknown(true),
  updated_by: ObjectId()
}).min(1);

// Bundle ID parameter validation
var bundleIdSchema = exports.bundleIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var bundleQuerySchema = exports.bundleQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  event: ObjectId(),
  status: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_voteConstants.BUNDLE_STATUS))),
  is_featured: _joi["default"]["boolean"](),
  is_popular: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  min_price: _joi["default"].number().min(0),
  max_price: _joi["default"].number().min(0),
  sort: _joi["default"].string().valid("name", "price", "vote_count", "total_purchases", "display_order", "created_at", "-name", "-price", "-vote_count", "-total_purchases", "-display_order", "-created_at")["default"]("display_order")
});

// Update bundle status validation
var updateBundleStatusSchema = exports.updateBundleStatusSchema = _joi["default"].object({
  status: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_voteConstants.BUNDLE_STATUS))).required()
});

// Feature bundle validation
var featureBundleSchema = exports.featureBundleSchema = _joi["default"].object({
  is_featured: _joi["default"]["boolean"]().required()
});

// Mark as popular validation
var markAsPopularSchema = exports.markAsPopularSchema = _joi["default"].object({
  is_popular: _joi["default"]["boolean"]().required()
});

// Increment purchases validation
var incrementPurchasesSchema = exports.incrementPurchasesSchema = _joi["default"].object({
  amount: _joi["default"].number().min(0).required()
});
var _default = exports["default"] = {
  createBundleSchema: createBundleSchema,
  updateBundleSchema: updateBundleSchema,
  bundleIdSchema: bundleIdSchema,
  bundleQuerySchema: bundleQuerySchema,
  updateBundleStatusSchema: updateBundleStatusSchema,
  featureBundleSchema: featureBundleSchema,
  markAsPopularSchema: markAsPopularSchema,
  incrementPurchasesSchema: incrementPurchasesSchema
};