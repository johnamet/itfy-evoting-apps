/**
 * Coupon module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { COUPON_STATUS as STATUS, DISCOUNT_TYPE } from "../../../utils/constants/vote.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create coupon validation
export const createCouponSchema = Joi.object({
  code: Joi.string().trim().uppercase().min(3).max(50).required(),
  description: Joi.string().trim().max(500).optional(),
  event: ObjectId().required(),
  applicable_bundles: Joi.array().items(ObjectId()).default([]),
  discount_type: Joi.string().valid(...Object.values(DISCOUNT_TYPE)).required(),
  discount_value: Joi.number().min(0).required(),
  max_discount_amount: Joi.number().min(0).optional(),
  min_purchase_amount: Joi.number().min(0).default(0),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.ACTIVE),
  max_total_uses: Joi.number().integer().min(1).optional(),
  max_uses_per_user: Joi.number().integer().min(1).default(1),
  current_redemptions: Joi.number().integer().min(0).default(0),
  validity_start: Joi.date().optional(),
  validity_end: Joi.date().when("validity_start", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("validity_start")),
    otherwise: Joi.date(),
  }).optional(),
  is_public: Joi.boolean().default(false),
  terms_and_conditions: Joi.string().trim().max(2000).optional(),
  metadata: Joi.object().unknown(true).default({}),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional(),
});

// Update coupon validation
export const updateCouponSchema = Joi.object({
  code: Joi.string().trim().uppercase().min(3).max(50),
  description: Joi.string().trim().max(500),
  applicable_bundles: Joi.array().items(ObjectId()),
  discount_type: Joi.string().valid(...Object.values(DISCOUNT_TYPE)),
  discount_value: Joi.number().min(0),
  max_discount_amount: Joi.number().min(0),
  min_purchase_amount: Joi.number().min(0),
  status: Joi.string().valid(...Object.values(STATUS)),
  max_total_uses: Joi.number().integer().min(1),
  max_uses_per_user: Joi.number().integer().min(1),
  current_redemptions: Joi.number().integer().min(0),
  validity_start: Joi.date(),
  validity_end: Joi.date(),
  is_public: Joi.boolean(),
  terms_and_conditions: Joi.string().trim().max(2000),
  metadata: Joi.object().unknown(true),
  updated_by: ObjectId(),
}).min(1);

// Coupon ID parameter validation
export const couponIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const couponQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  event: ObjectId(),
  status: Joi.string().valid(...Object.values(STATUS)),
  discount_type: Joi.string().valid(...Object.values(DISCOUNT_TYPE)),
  is_public: Joi.boolean(),
  search: Joi.string().trim().max(100),
  sort: Joi.string().valid(
    "code", "discount_value", "current_redemptions", "validity_end", "created_at",
    "-code", "-discount_value", "-current_redemptions", "-validity_end", "-created_at"
  ).default("-created_at"),
});

// Apply coupon validation
export const applyCouponSchema = Joi.object({
  code: Joi.string().trim().uppercase().required(),
  bundle_id: ObjectId().required(),
  purchase_amount: Joi.number().min(0).required(),
});

// Validate coupon validation
export const validateCouponSchema = Joi.object({
  code: Joi.string().trim().uppercase().required(),
  bundle_id: ObjectId().optional(),
  user_id: ObjectId().optional(),
});

// Update coupon status validation
export const updateCouponStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
});

// Increment redemptions validation
export const incrementRedemptionsSchema = Joi.object({
  increment: Joi.number().integer().min(1).default(1),
});

export default {
  createCouponSchema,
  updateCouponSchema,
  couponIdSchema,
  couponQuerySchema,
  applyCouponSchema,
  validateCouponSchema,
  updateCouponStatusSchema,
  incrementRedemptionsSchema,
};
