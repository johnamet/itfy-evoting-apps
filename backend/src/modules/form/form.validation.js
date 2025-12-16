/**
 * Form module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import {
  FORM_TYPE,
  FORM_STATUS as STATUS,
  FIELD_TYPE,
  SUBMISSION_STATUS,
  DUPLICATE_CHECK_METHOD,
} from "../../utils/constants/form.constants.js";

const ObjectId = JoiObjectId(Joi);

// Field option schema
const fieldOptionSchema = Joi.object({
  label: Joi.string().trim().required(),
  value: Joi.string().trim().required(),
});

// Field validation schema
const fieldValidationSchema = Joi.object({
  required: Joi.boolean().default(false),
  min_length: Joi.number().integer().min(0).optional(),
  max_length: Joi.number().integer().min(0).optional(),
  min_value: Joi.number().optional(),
  max_value: Joi.number().optional(),
  pattern: Joi.string().optional(),
  custom_message: Joi.string().trim().optional(),
}).optional();

// Field conditional schema
const fieldConditionalSchema = Joi.object({
  show_if: Joi.object({
    field_id: Joi.string().required(),
    operator: Joi.string().valid("equals", "not_equals", "contains", "greater_than", "less_than").required(),
    value: Joi.any().required(),
  }).required(),
}).optional();

// Form field schema
const formFieldSchema = Joi.object({
  field_id: Joi.string().trim().required(),
  label: Joi.string().trim().required(),
  field_type: Joi.string().valid(...Object.values(FIELD_TYPE)).required(),
  placeholder: Joi.string().trim().optional(),
  help_text: Joi.string().trim().optional(),
  default_value: Joi.any().optional(),
  options: Joi.array().items(fieldOptionSchema).optional(),
  validation: fieldValidationSchema,
  conditional: fieldConditionalSchema,
  display_order: Joi.number().integer().min(0).default(0),
  is_duplicate_check_field: Joi.boolean().default(false),
  is_identifier_field: Joi.boolean().default(false),
  metadata: Joi.object().unknown(true).default({}),
});

// Duplicate detection schema
const duplicateDetectionSchema = Joi.object({
  enabled: Joi.boolean().default(true),
  method: Joi.string().valid(...Object.values(DUPLICATE_CHECK_METHOD)).default(DUPLICATE_CHECK_METHOD.FIELD_SIMILARITY),
  threshold: Joi.number().min(0).max(100).default(85),
  check_fields: Joi.array().items(Joi.string()).default([]),
  auto_flag: Joi.boolean().default(true),
}).optional();

// Multi-category nomination schema
const multiCategoryNominationSchema = Joi.object({
  enabled: Joi.boolean().default(false),
  max_categories: Joi.number().integer().min(1).default(3),
  require_same_nominee: Joi.boolean().default(true),
}).optional();

// Form settings schema
const formSettingsSchema = Joi.object({
  allow_multiple_submissions: Joi.boolean().default(false),
  require_authentication: Joi.boolean().default(false),
  capture_ip: Joi.boolean().default(true),
  enable_captcha: Joi.boolean().default(true),
  auto_approve: Joi.boolean().default(false),
  send_confirmation_email: Joi.boolean().default(true),
  confirmation_email_template: Joi.string().trim().optional(),
  redirect_url: Joi.string().uri().optional(),
  custom_css: Joi.string().optional(),
}).optional();

// Submission limits schema
const submissionLimitsSchema = Joi.object({
  max_submissions: Joi.number().integer().min(0).optional(),
  max_submissions_per_user: Joi.number().integer().min(1).default(1),
  max_submissions_per_ip: Joi.number().integer().min(1).default(3),
  rate_limit: Joi.object({
    window_minutes: Joi.number().integer().min(1).default(60),
    max_requests: Joi.number().integer().min(1).default(10),
  }).optional(),
}).optional();

// Create form validation
export const createFormSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().trim().max(2000).optional(),
  slug: Joi.string().lowercase().trim().optional(),
  form_type: Joi.string().valid(...Object.values(FORM_TYPE)).required(),
  event: ObjectId().required(),
  categories: Joi.array().items(ObjectId()).default([]),
  fields: Joi.array().items(formFieldSchema).min(1).required(),
  duplicate_detection: duplicateDetectionSchema,
  multi_category_nomination: multiCategoryNominationSchema,
  settings: formSettingsSchema,
  submission_limits: submissionLimitsSchema,
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.DRAFT),
  open_date: Joi.date().optional(),
  close_date: Joi.date().when("open_date", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("open_date")),
    otherwise: Joi.date(),
  }).optional(),
  is_published: Joi.boolean().default(false),
});

// Update form validation
export const updateFormSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200),
  description: Joi.string().trim().max(2000),
  slug: Joi.string().lowercase().trim(),
  form_type: Joi.string().valid(...Object.values(FORM_TYPE)),
  categories: Joi.array().items(ObjectId()),
  fields: Joi.array().items(formFieldSchema).min(1),
  duplicate_detection: duplicateDetectionSchema,
  multi_category_nomination: multiCategoryNominationSchema,
  settings: formSettingsSchema,
  submission_limits: submissionLimitsSchema,
  status: Joi.string().valid(...Object.values(STATUS)),
  open_date: Joi.date(),
  close_date: Joi.date(),
  is_published: Joi.boolean(),
}).min(1);

// Form ID parameter validation
export const formIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const formQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  event: ObjectId(),
  form_type: Joi.string().valid(...Object.values(FORM_TYPE)),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_published: Joi.boolean(),
  search: Joi.string().trim().max(100),
  sort: Joi.string().valid(
    "name", "total_submissions", "created_at", "-name", "-total_submissions", "-created_at"
  ).default("-created_at"),
});

// Update form status validation
export const updateFormStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
});

// Publish form validation
export const publishFormSchema = Joi.object({
  is_published: Joi.boolean().required(),
});

export default {
  createFormSchema,
  updateFormSchema,
  formIdSchema,
  formQuerySchema,
  updateFormStatusSchema,
  publishFormSchema,
};
