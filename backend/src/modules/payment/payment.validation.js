/**
 * Payment module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { STATUS, PAYMENT_METHOD } from "../../utils/constants/payment.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create payment validation
export const createPaymentSchema = Joi.object({
  transaction_reference: Joi.string().trim().required(),
  paystack_reference: Joi.string().trim().optional(),
  paystack_access_code: Joi.string().trim().optional(),
  bundle: ObjectId().required(),
  event: ObjectId().required(),
  coupon: ObjectId().optional(),
  vote_code: Joi.string().trim().required(),
  votes_purchased: Joi.number().integer().min(1).required(),
  votes_cast: Joi.number().integer().min(0).default(0),
  votes_remaining: Joi.number().integer().min(0).default(0),
  amount_paid: Joi.number().min(0).required(),
  original_amount: Joi.number().min(0).required(),
  discount_amount: Joi.number().min(0).default(0),
  currency: Joi.string().uppercase().default("GHS"),
  voter_email: Joi.string().trim().lowercase().email().required(),
  voter_phone: Joi.string().trim().optional(),
  voter_name: Joi.string().trim().optional(),
  payment_method: Joi.string().valid(...Object.values(PAYMENT_METHOD)).default(PAYMENT_METHOD.CARD),
  payment_status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.PENDING),
  webhook_received: Joi.boolean().default(false),
  auto_vote_cast: Joi.boolean().default(false),
  ip_address: Joi.string().trim().optional(),
  ip_hash: Joi.string().trim().optional(),
  user_agent: Joi.string().trim().optional(),
  paystack_metadata: Joi.object().unknown(true).default({}),
  metadata: Joi.object().unknown(true).default({}),
});

// Update payment validation
export const updatePaymentSchema = Joi.object({
  paystack_reference: Joi.string().trim(),
  paystack_access_code: Joi.string().trim(),
  votes_cast: Joi.number().integer().min(0),
  votes_remaining: Joi.number().integer().min(0),
  payment_status: Joi.string().valid(...Object.values(STATUS)),
  webhook_received: Joi.boolean(),
  auto_vote_cast: Joi.boolean(),
  paystack_metadata: Joi.object().unknown(true),
  metadata: Joi.object().unknown(true),
  paid_at: Joi.date(),
  failed_at: Joi.date(),
  refunded_at: Joi.date(),
  refund_reason: Joi.string().trim().max(500),
}).min(1);

// Payment ID parameter validation
export const paymentIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const paymentQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  event: ObjectId(),
  bundle: ObjectId(),
  payment_status: Joi.string().valid(...Object.values(STATUS)),
  payment_method: Joi.string().valid(...Object.values(PAYMENT_METHOD)),
  voter_email: Joi.string().trim().lowercase().email(),
  vote_code: Joi.string().trim(),
  transaction_reference: Joi.string().trim(),
  webhook_received: Joi.boolean(),
  created_at_from: Joi.date(),
  created_at_to: Joi.date(),
  sort: Joi.string().valid(
    "created_at", "amount_paid", "paid_at", "-created_at", "-amount_paid", "-paid_at"
  ).default("-created_at"),
});

// Initialize payment validation
export const initializePaymentSchema = Joi.object({
  bundle_id: ObjectId().required(),
  event_id: ObjectId().required(),
  voter_email: Joi.string().trim().lowercase().email().required(),
  voter_phone: Joi.string().trim().optional(),
  voter_name: Joi.string().trim().optional(),
  coupon_code: Joi.string().trim().uppercase().optional(),
  callback_url: Joi.string().uri().optional(),
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

// Cast vote from payment validation
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

export default {
  createPaymentSchema,
  updatePaymentSchema,
  paymentIdSchema,
  paymentQuerySchema,
  initializePaymentSchema,
  verifyPaymentSchema,
  updatePaymentStatusSchema,
  refundPaymentSchema,
  castVoteSchema,
  webhookSchema,
};
