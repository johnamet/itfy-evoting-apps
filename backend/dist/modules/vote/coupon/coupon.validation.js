"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCouponSchema = exports.updateCouponStatusSchema = exports.updateCouponSchema = exports.incrementRedemptionsSchema = exports["default"] = exports.createCouponSchema = exports.couponQuerySchema = exports.couponIdSchema = exports.applyCouponSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Coupon module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Create coupon validation
var createCouponSchema = exports.createCouponSchema = _joi["default"].object({
  code: _joi["default"].string().trim().uppercase().min(3).max(50).required(),
  description: _joi["default"].string().trim().max(500).optional(),
  event: ObjectId().required(),
  applicable_bundles: _joi["default"].array().items(ObjectId())["default"]([]),
  discount_type: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_voteConstants.DISCOUNT_TYPE))).required(),
  discount_value: _joi["default"].number().min(0).required(),
  max_discount_amount: _joi["default"].number().min(0).optional(),
  min_purchase_amount: _joi["default"].number().min(0)["default"](0),
  status: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_voteConstants.COUPON_STATUS)))["default"](_voteConstants.COUPON_STATUS.ACTIVE),
  max_total_uses: _joi["default"].number().integer().min(1).optional(),
  max_uses_per_user: _joi["default"].number().integer().min(1)["default"](1),
  current_redemptions: _joi["default"].number().integer().min(0)["default"](0),
  validity_start: _joi["default"].date().optional(),
  validity_end: _joi["default"].date().when("validity_start", {
    is: _joi["default"].exist(),
    then: _joi["default"].date().greater(_joi["default"].ref("validity_start")),
    otherwise: _joi["default"].date()
  }).optional(),
  is_public: _joi["default"]["boolean"]()["default"](false),
  terms_and_conditions: _joi["default"].string().trim().max(2000).optional(),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional()
});

// Update coupon validation
var updateCouponSchema = exports.updateCouponSchema = _joi["default"].object({
  code: _joi["default"].string().trim().uppercase().min(3).max(50),
  description: _joi["default"].string().trim().max(500),
  applicable_bundles: _joi["default"].array().items(ObjectId()),
  discount_type: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_voteConstants.DISCOUNT_TYPE))),
  discount_value: _joi["default"].number().min(0),
  max_discount_amount: _joi["default"].number().min(0),
  min_purchase_amount: _joi["default"].number().min(0),
  status: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_voteConstants.COUPON_STATUS))),
  max_total_uses: _joi["default"].number().integer().min(1),
  max_uses_per_user: _joi["default"].number().integer().min(1),
  current_redemptions: _joi["default"].number().integer().min(0),
  validity_start: _joi["default"].date(),
  validity_end: _joi["default"].date(),
  is_public: _joi["default"]["boolean"](),
  terms_and_conditions: _joi["default"].string().trim().max(2000),
  metadata: _joi["default"].object().unknown(true),
  updated_by: ObjectId()
}).min(1);

// Coupon ID parameter validation
var couponIdSchema = exports.couponIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var couponQuerySchema = exports.couponQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  event: ObjectId(),
  status: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_voteConstants.COUPON_STATUS))),
  discount_type: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_voteConstants.DISCOUNT_TYPE))),
  is_public: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  sort: _joi["default"].string().valid("code", "discount_value", "current_redemptions", "validity_end", "created_at", "-code", "-discount_value", "-current_redemptions", "-validity_end", "-created_at")["default"]("-created_at")
});

// Apply coupon validation
var applyCouponSchema = exports.applyCouponSchema = _joi["default"].object({
  code: _joi["default"].string().trim().uppercase().required(),
  bundle_id: ObjectId().required(),
  purchase_amount: _joi["default"].number().min(0).required()
});

// Validate coupon validation
var validateCouponSchema = exports.validateCouponSchema = _joi["default"].object({
  code: _joi["default"].string().trim().uppercase().required(),
  bundle_id: ObjectId().optional(),
  user_id: ObjectId().optional()
});

// Update coupon status validation
var updateCouponStatusSchema = exports.updateCouponStatusSchema = _joi["default"].object({
  status: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_voteConstants.COUPON_STATUS))).required()
});

// Increment redemptions validation
var incrementRedemptionsSchema = exports.incrementRedemptionsSchema = _joi["default"].object({
  increment: _joi["default"].number().integer().min(1)["default"](1)
});
var _default = exports["default"] = {
  createCouponSchema: createCouponSchema,
  updateCouponSchema: updateCouponSchema,
  couponIdSchema: couponIdSchema,
  couponQuerySchema: couponQuerySchema,
  applyCouponSchema: applyCouponSchema,
  validateCouponSchema: validateCouponSchema,
  updateCouponStatusSchema: updateCouponStatusSchema,
  incrementRedemptionsSchema: incrementRedemptionsSchema
};