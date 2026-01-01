/**
 * Payment module validation schemas using Joi
 * Updated to support multiple bundles
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { STATUS, PAYMENT_METHOD } from "../../utils/constants/payment.constants.js";

const ObjectId = JoiObjectId(Joi);

// Bundle item schema for multiple bundles
const bundleItemSchema = Joi.object({
  bundle_id: ObjectId().required(),
  quantity: Joi.number().integer().min(1).default(1),
  category: ObjectId()
});

// Initialize payment validation - Updated for multiple bundles
export const initializePaymentSchema = Joi.object({
  bundles: Joi.array()
    .items(bundleItemSchema)
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one bundle is required',
      'any.required': 'Bundles array is required',
    }),
  event_id: ObjectId().required(),
  voter_email: Joi.string().trim().lowercase().email().required(),
  voter_phone: Joi.string().trim().optional(),
  voter_name: Joi.string().trim().optional(),
  coupon_code: Joi.string().trim().uppercase().optional(),
  callback_url: Joi.string().uri().optional(),
  candidate_id: ObjectId().optional(), // For auto-casting votes
  metadata: Joi.object().unknown(true).optional(),
});

// Verify payment validation
export const verifyPaymentSchema = Joi.object({
  reference: Joi.string().trim().required(),
});

// Update payment status validation
export const updatePaymentStatusSchema = Joi.object({
  payment_status: Joi.string().valid(...Object.values(STATUS)).required(),
  paid_at: Joi.when("payment_status", {
    is: STATUS.COMPLETED,
    then: Joi.date().default(Date.now),
    otherwise: Joi.forbidden(),
  }),
  failed_at: Joi.when("payment_status", {
    is: STATUS.FAILED,
    then: Joi.date().default(Date.now),
    otherwise: Joi.forbidden(),
  }),
});

// Refund payment validation
export const refundPaymentSchema = Joi.object({
  refund_reason: Joi.string().trim().min(10).max(500).required(),
});

// Cast vote from payment validation - Updated for category tracking
export const castVoteSchema = Joi.object({
  candidate_id: ObjectId().required(),
  category_id: ObjectId().required(),
  votes_count: Joi.number().integer().min(1).default(1),
});

// Webhook validation
export const webhookSchema = Joi.object({
  event: Joi.string().required(),
  data: Joi.object().required(),
});

// Validate vote code for category
export const validateVoteCodeForCategorySchema = Joi.object({
  vote_code: Joi.string().trim().required(),
  category_id: ObjectId().required(),
});

export default {
  initializePaymentSchema,
  verifyPaymentSchema,
  updatePaymentStatusSchema,
  refundPaymentSchema,
  castVoteSchema,
  webhookSchema,
  validateVoteCodeForCategorySchema,
};