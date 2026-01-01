"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webhookSchema = exports.verifyPaymentSchema = exports.validateVoteCodeForCategorySchema = exports.updatePaymentStatusSchema = exports.refundPaymentSchema = exports.initializePaymentSchema = exports["default"] = exports.castVoteSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _paymentConstants = require("../../utils/constants/payment.constants.js");
var _Joi$string;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Payment module validation schemas using Joi
 * Updated to support multiple bundles
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Bundle item schema for multiple bundles
var bundleItemSchema = _joi["default"].object({
  bundle_id: ObjectId().required(),
  quantity: _joi["default"].number().integer().min(1)["default"](1)
});

// Initialize payment validation - Updated for multiple bundles
var initializePaymentSchema = exports.initializePaymentSchema = _joi["default"].object({
  bundles: _joi["default"].array().items(bundleItemSchema).min(1).required().messages({
    'array.min': 'At least one bundle is required',
    'any.required': 'Bundles array is required'
  }),
  event_id: ObjectId().required(),
  voter_email: _joi["default"].string().trim().lowercase().email().required(),
  voter_phone: _joi["default"].string().trim().optional(),
  voter_name: _joi["default"].string().trim().optional(),
  coupon_code: _joi["default"].string().trim().uppercase().optional(),
  callback_url: _joi["default"].string().uri().optional(),
  candidate_id: ObjectId().optional(),
  // For auto-casting votes
  metadata: _joi["default"].object().unknown(true).optional()
});

// Verify payment validation
var verifyPaymentSchema = exports.verifyPaymentSchema = _joi["default"].object({
  reference: _joi["default"].string().trim().required()
});

// Update payment status validation
var updatePaymentStatusSchema = exports.updatePaymentStatusSchema = _joi["default"].object({
  payment_status: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_paymentConstants.STATUS))).required(),
  paid_at: _joi["default"].when("payment_status", {
    is: _paymentConstants.STATUS.COMPLETED,
    then: _joi["default"].date()["default"](Date.now),
    otherwise: _joi["default"].forbidden()
  }),
  failed_at: _joi["default"].when("payment_status", {
    is: _paymentConstants.STATUS.FAILED,
    then: _joi["default"].date()["default"](Date.now),
    otherwise: _joi["default"].forbidden()
  })
});

// Refund payment validation
var refundPaymentSchema = exports.refundPaymentSchema = _joi["default"].object({
  refund_reason: _joi["default"].string().trim().min(10).max(500).required()
});

// Cast vote from payment validation - Updated for category tracking
var castVoteSchema = exports.castVoteSchema = _joi["default"].object({
  candidate_id: ObjectId().required(),
  category_id: ObjectId().required(),
  votes_count: _joi["default"].number().integer().min(1)["default"](1)
});

// Webhook validation
var webhookSchema = exports.webhookSchema = _joi["default"].object({
  event: _joi["default"].string().required(),
  data: _joi["default"].object().required()
});

// Validate vote code for category
var validateVoteCodeForCategorySchema = exports.validateVoteCodeForCategorySchema = _joi["default"].object({
  vote_code: _joi["default"].string().trim().required(),
  category_id: ObjectId().required()
});
var _default = exports["default"] = {
  initializePaymentSchema: initializePaymentSchema,
  verifyPaymentSchema: verifyPaymentSchema,
  updatePaymentStatusSchema: updatePaymentStatusSchema,
  refundPaymentSchema: refundPaymentSchema,
  castVoteSchema: castVoteSchema,
  webhookSchema: webhookSchema,
  validateVoteCodeForCategorySchema: validateVoteCodeForCategorySchema
};