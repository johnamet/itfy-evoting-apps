/**
 * Bundle module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { BUNDLE_STATUS as STATUS } from "../../../utils/constants/vote.constants.js";
import { CURRENCY } from "../../../utils/constants/event.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create bundle validation
export const createBundleSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().trim().max(1000).optional(),
  slug: Joi.string().lowercase().trim().optional(),
  event: ObjectId().required(),
  categories: Joi.array().items(ObjectId()).default([]),
  vote_count: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().valid(...Object.values(CURRENCY)).uppercase().default(CURRENCY.GHS),
  discount_percentage: Joi.number().min(0).max(100).default(0),
  original_price: Joi.number().min(0).optional(),
  is_featured: Joi.boolean().default(false),
  is_popular: Joi.boolean().default(false),
  display_order: Joi.number().integer().min(0).default(0),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.ACTIVE),
  validity_start: Joi.date().optional(),
  validity_end: Joi.date().when("validity_start", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("validity_start")),
    otherwise: Joi.date(),
  }).optional(),
  total_purchases: Joi.number().integer().min(0).default(0),
  total_revenue: Joi.number().min(0).default(0),
  icon: Joi.string().uri().optional(),
  color_theme: Joi.string().trim().optional(),
  features: Joi.array().items(Joi.string().trim()).default([]),
  metadata: Joi.object().unknown(true).default({}),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional(),
});

// Update bundle validation
export const updateBundleSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200),
  description: Joi.string().trim().max(1000),
  slug: Joi.string().lowercase().trim(),
  categories: Joi.array().items(ObjectId()),
  vote_count: Joi.number().integer().min(1),
  price: Joi.number().min(0),
  currency: Joi.string().valid(...Object.values(CURRENCY)).uppercase(),
  discount_percentage: Joi.number().min(0).max(100),
  original_price: Joi.number().min(0),
  is_featured: Joi.boolean(),
  is_popular: Joi.boolean(),
  display_order: Joi.number().integer().min(0),
  status: Joi.string().valid(...Object.values(STATUS)),
  validity_start: Joi.date(),
  validity_end: Joi.date(),
  total_purchases: Joi.number().integer().min(0),
  total_revenue: Joi.number().min(0),
  icon: Joi.string().uri(),
  color_theme: Joi.string().trim(),
  features: Joi.array().items(Joi.string().trim()),
  metadata: Joi.object().unknown(true),
  updated_by: ObjectId(),
}).min(1);

// Bundle ID parameter validation
export const bundleIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const bundleQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  event: ObjectId(),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_featured: Joi.boolean(),
  is_popular: Joi.boolean(),
  search: Joi.string().trim().max(100),
  min_price: Joi.number().min(0),
  max_price: Joi.number().min(0),
  sort: Joi.string().valid(
    "name", "price", "vote_count", "total_purchases", "display_order", "created_at",
    "-name", "-price", "-vote_count", "-total_purchases", "-display_order", "-created_at"
  ).default("display_order"),
});

// Update bundle status validation
export const updateBundleStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
});

// Feature bundle validation
export const featureBundleSchema = Joi.object({
  is_featured: Joi.boolean().required(),
});

// Mark as popular validation
export const markAsPopularSchema = Joi.object({
  is_popular: Joi.boolean().required(),
});

// Increment purchases validation
export const incrementPurchasesSchema = Joi.object({
  amount: Joi.number().min(0).required(),
});

export default {
  createBundleSchema,
  updateBundleSchema,
  bundleIdSchema,
  bundleQuerySchema,
  updateBundleStatusSchema,
  featureBundleSchema,
  markAsPopularSchema,
  incrementPurchasesSchema,
};
