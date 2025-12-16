/**
 * Form Validation Schemas
 * Validates all form-related requests for dynamic form management
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import {
  FORM_TYPE,
  FORM_STATUS,
  FIELD_TYPE,
  DUPLICATE_CHECK_METHOD,
} from "../../utils/constants/form.constants.js";

const ObjectId = JoiObjectId(Joi);

// ==================== REUSABLE SUB-SCHEMAS ====================

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

// Field mapping schema (for nomination forms)
const fieldMappingItemSchema = Joi.object({
  form_field_id: Joi.string().trim().required()
    .messages({
      "string.empty": "Form field ID is required",
    }),
  candidate_field: Joi.string().trim().required()
    .messages({
      "string.empty": "Candidate field is required",
    }),
  transform: Joi.string().valid("uppercase", "lowercase", "trim", "capitalize").optional(),
});

// Candidate field mapping schema
const candidateFieldMappingSchema = Joi.object({
  enabled: Joi.boolean().default(false),
  mappings: Joi.array().items(fieldMappingItemSchema).default([]),
  auto_create_candidate: Joi.boolean().default(true),
  send_welcome_email: Joi.boolean().default(true),
}).optional();

class FormValidation {
  // ==================== FORM CRUD ====================

  /**
   * Create form validation
   */
  static createFormSchema = Joi.object({
    name: Joi.string().trim().min(3).max(200).required()
      .messages({
        "string.empty": "Form name is required",
        "string.min": "Form name must be at least 3 characters",
        "string.max": "Form name cannot exceed 200 characters",
      }),
    description: Joi.string().trim().max(2000).optional()
      .messages({
        "string.max": "Description cannot exceed 2000 characters",
      }),
    slug: Joi.string().lowercase().trim().optional(),
    form_type: Joi.string().valid(...Object.values(FORM_TYPE)).required()
      .messages({
        "any.only": `Form type must be one of: ${Object.values(FORM_TYPE).join(", ")}`,
        "string.empty": "Form type is required",
      }),
    event: ObjectId().required()
      .messages({
        "string.empty": "Event ID is required",
      }),
    categories: Joi.array().items(ObjectId()).default([]),
    fields: Joi.array().items(formFieldSchema).min(1).required()
      .messages({
        "array.min": "At least one field is required",
        "any.required": "Form fields are required",
      }),
    candidate_field_mapping: candidateFieldMappingSchema,
    duplicate_detection: duplicateDetectionSchema,
    multi_category_nomination: multiCategoryNominationSchema,
    settings: formSettingsSchema,
    submission_limits: submissionLimitsSchema,
    status: Joi.string().valid(...Object.values(FORM_STATUS)).default(FORM_STATUS.DRAFT),
    open_date: Joi.date().optional(),
    close_date: Joi.date().when("open_date", {
      is: Joi.exist(),
      then: Joi.date().greater(Joi.ref("open_date"))
        .messages({
          "date.greater": "Close date must be after open date",
        }),
      otherwise: Joi.date(),
    }).optional(),
    is_published: Joi.boolean().default(false),
  });

  /**
   * Update form validation
   */
  static updateFormSchema = Joi.object({
    name: Joi.string().trim().min(3).max(200)
      .messages({
        "string.min": "Form name must be at least 3 characters",
        "string.max": "Form name cannot exceed 200 characters",
      }),
    description: Joi.string().trim().max(2000)
      .messages({
        "string.max": "Description cannot exceed 2000 characters",
      }),
    slug: Joi.string().lowercase().trim(),
    form_type: Joi.string().valid(...Object.values(FORM_TYPE))
      .messages({
        "any.only": `Form type must be one of: ${Object.values(FORM_TYPE).join(", ")}`,
      }),
    categories: Joi.array().items(ObjectId()),
    fields: Joi.array().items(formFieldSchema).min(1)
      .messages({
        "array.min": "At least one field is required",
      }),
    candidate_field_mapping: candidateFieldMappingSchema,
    duplicate_detection: duplicateDetectionSchema,
    multi_category_nomination: multiCategoryNominationSchema,
    settings: formSettingsSchema,
    submission_limits: submissionLimitsSchema,
    status: Joi.string().valid(...Object.values(FORM_STATUS)),
    open_date: Joi.date(),
    close_date: Joi.date(),
    is_published: Joi.boolean(),
  }).min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    });

  // ==================== FIELD MAPPING ====================

  /**
   * Update field mapping validation
   */
  static updateFieldMappingSchema = Joi.object({
    mappings: Joi.array().items(fieldMappingItemSchema).min(1).required()
      .messages({
        "array.min": "At least one field mapping is required",
        "any.required": "Mappings are required",
      }),
    auto_create_candidate: Joi.boolean().default(true),
    send_welcome_email: Joi.boolean().default(true),
  });

  // ==================== QUERY & PARAMETERS ====================

  /**
   * Form ID parameter validation
   */
  static formIdSchema = Joi.object({
    id: ObjectId().required()
      .messages({
        "string.empty": "Form ID is required",
      }),
  });

  /**
   * Query parameters validation
   */
  static formQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    event: ObjectId(),
    form_type: Joi.string().valid(...Object.values(FORM_TYPE)),
    status: Joi.string().valid(...Object.values(FORM_STATUS)),
    is_published: Joi.boolean(),
    search: Joi.string().trim().max(100),
    sort: Joi.string().valid(
      "name", "total_submissions", "created_at", "-name", "-total_submissions", "-created_at"
    ).default("-created_at"),
  });

  /**
   * Get forms by event validation
   */
  static getFormsByEventSchema = Joi.object({
    eventId: ObjectId().required()
      .messages({
        "string.empty": "Event ID is required",
      }),
    filters: Joi.object({
      form_type: Joi.string().valid(...Object.values(FORM_TYPE)),
      status: Joi.string().valid(...Object.values(FORM_STATUS)),
      is_published: Joi.boolean(),
    }).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  });

  // ==================== STATUS MANAGEMENT ====================

  /**
   * Update form status validation
   */
  static updateFormStatusSchema = Joi.object({
    status: Joi.string().valid(...Object.values(FORM_STATUS)).required()
      .messages({
        "any.only": `Status must be one of: ${Object.values(FORM_STATUS).join(", ")}`,
        "string.empty": "Status is required",
      }),
  });

  /**
   * Publish form validation
   */
  static publishFormSchema = Joi.object({
    is_published: Joi.boolean().required()
      .messages({
        "any.required": "is_published field is required",
      }),
  });

  // ==================== VALIDATION HELPERS ====================

  /**
   * Validate data against schema
   * @param {Object} data - Data to validate
   * @param {Joi.Schema} schema - Joi schema
   * @returns {Object} - Validated data
   * @throws {Error} - Validation error
   */
  static validate(data, schema) {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      throw new Error(messages);
    }

    return value;
  }
}

export default FormValidation;
