/**
 * Candidate Validation Schemas
 * Validates all candidate-related requests for profile management and admin operations
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { STATUS } from "../../utils/constants/candidate.constants.js";

const ObjectId = JoiObjectId(Joi);

// Reusable sub-schemas
const projectSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  url: Joi.string().uri().optional(),
  image: Joi.string().uri().optional(),
  date: Joi.date().optional(),
});

const educationSchema = Joi.object({
  institution: Joi.string().trim().required(),
  qualification: Joi.string().trim().required(),
  field: Joi.string().trim().optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  current: Joi.boolean().default(false),
  description: Joi.string().trim().optional(),
});

const experienceSchema = Joi.object({
  company: Joi.string().trim().required(),
  position: Joi.string().trim().required(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  current: Joi.boolean().default(false),
  description: Joi.string().trim().optional(),
});

const achievementSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  date: Joi.date().optional(),
  organization: Joi.string().trim().optional(),
});

const endorsementSchema = Joi.object({
  name: Joi.string().trim().required(),
  position: Joi.string().trim().optional(),
  message: Joi.string().trim().optional(),
  image: Joi.string().uri().optional(),
});

const socialLinksSchema = Joi.object({
  linkedin: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  github: Joi.string().uri().optional(),
  portfolio: Joi.string().uri().optional(),
  facebook: Joi.string().uri().optional(),
  instagram: Joi.string().uri().optional(),
}).optional();

class CandidateValidation {
  // ==================== CANDIDATE CREATION ====================

  /**
   * Create candidate validation (admin)
   */
  static createCandidateSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(100).required()
      .messages({
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 100 characters",
      }),
    last_name: Joi.string().trim().min(2).max(100).required()
      .messages({
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 100 characters",
      }),
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
    phone_number: Joi.string().trim().optional(),
    slug: Joi.string().lowercase().trim().optional(),
    bio: Joi.string().trim().max(2000).optional()
      .messages({
        "string.max": "Bio cannot exceed 2000 characters",
      }),
    profile_image: Joi.string().uri().optional(),
    cover_image: Joi.string().uri().optional(),
    gallery: Joi.array().items(Joi.string().uri()).default([]),
    video_url: Joi.string().uri().optional(),
    projects: Joi.array().items(projectSchema).default([]),
    skills: Joi.array().items(Joi.string().trim()).default([]),
    education: Joi.array().items(educationSchema).default([]),
    experience: Joi.array().items(experienceSchema).default([]),
    achievements: Joi.array().items(achievementSchema).default([]),
    social_links: socialLinksSchema,
    event: ObjectId().required()
      .messages({
        "string.empty": "Event ID is required",
      }),
    categories: Joi.array().items(ObjectId()).min(1).required()
      .messages({
        "array.min": "At least one category is required",
        "any.required": "Categories are required",
      }),
    status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.PENDING),
    is_featured: Joi.boolean().default(false),
    is_published: Joi.boolean().default(false),
    display_order: Joi.number().integer().min(0).default(0),
    vote_count: Joi.number().integer().min(0).default(0),
    view_count: Joi.number().integer().min(0).default(0),
    why_nominate_me: Joi.string().trim().max(1000).optional()
      .messages({
        "string.max": "Why nominate me cannot exceed 1000 characters",
      }),
    impact_statement: Joi.string().trim().max(1000).optional()
      .messages({
        "string.max": "Impact statement cannot exceed 1000 characters",
      }),
    endorsements: Joi.array().items(endorsementSchema).default([]),
    nomination_date: Joi.date().default(Date.now),
    tags: Joi.array().items(Joi.string().trim()).default([]),
    metadata: Joi.object().unknown(true).default({}),
    created_by: ObjectId().required(),
    updated_by: ObjectId().optional(),
  });

  // ==================== PROFILE UPDATE ====================

  /**
   * Update candidate profile validation (candidate self-update)
   * Excludes admin-only fields
   */
  static updateProfileSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(100)
      .messages({
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 100 characters",
      }),
    last_name: Joi.string().trim().min(2).max(100)
      .messages({
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 100 characters",
      }),
    phone_number: Joi.string().trim(),
    bio: Joi.string().trim().max(2000)
      .messages({
        "string.max": "Bio cannot exceed 2000 characters",
      }),
    profile_image: Joi.string().uri(),
    cover_image: Joi.string().uri(),
    gallery: Joi.array().items(Joi.string().uri()),
    video_url: Joi.string().uri(),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(Joi.string().trim()),
    education: Joi.array().items(educationSchema),
    experience: Joi.array().items(experienceSchema),
    achievements: Joi.array().items(achievementSchema),
    social_links: socialLinksSchema,
    why_nominate_me: Joi.string().trim().max(1000)
      .messages({
        "string.max": "Why nominate me cannot exceed 1000 characters",
      }),
    impact_statement: Joi.string().trim().max(1000)
      .messages({
        "string.max": "Impact statement cannot exceed 1000 characters",
      }),
    endorsements: Joi.array().items(endorsementSchema),
    tags: Joi.array().items(Joi.string().trim()),
  }).min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    });

  /**
   * Complete pending profile validation (candidate from nomination)
   */
  static completePendingProfileSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(100)
      .messages({
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 100 characters",
      }),
    last_name: Joi.string().trim().min(2).max(100)
      .messages({
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 100 characters",
      }),
    phone_number: Joi.string().trim(),
    bio: Joi.string().trim().max(2000).required()
      .messages({
        "string.empty": "Bio is required to complete your profile",
        "string.max": "Bio cannot exceed 2000 characters",
      }),
    profile_image: Joi.string().uri(),
    cover_image: Joi.string().uri(),
    gallery: Joi.array().items(Joi.string().uri()),
    video_url: Joi.string().uri(),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(Joi.string().trim()),
    education: Joi.array().items(educationSchema),
    experience: Joi.array().items(experienceSchema),
    achievements: Joi.array().items(achievementSchema),
    social_links: socialLinksSchema,
    why_nominate_me: Joi.string().trim().max(1000)
      .messages({
        "string.max": "Why nominate me cannot exceed 1000 characters",
      }),
    impact_statement: Joi.string().trim().max(1000)
      .messages({
        "string.max": "Impact statement cannot exceed 1000 characters",
      }),
    endorsements: Joi.array().items(endorsementSchema),
    tags: Joi.array().items(Joi.string().trim()),
  });

  /**
   * Update candidate validation (admin)
   * Can update all fields including admin-only fields
   */
  static updateCandidateSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(100)
      .messages({
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 100 characters",
      }),
    last_name: Joi.string().trim().min(2).max(100)
      .messages({
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 100 characters",
      }),
    email: Joi.string().trim().lowercase().email()
      .messages({
        "string.email": "Email must be a valid email address",
      }),
    phone_number: Joi.string().trim(),
    slug: Joi.string().lowercase().trim(),
    bio: Joi.string().trim().max(2000)
      .messages({
        "string.max": "Bio cannot exceed 2000 characters",
      }),
    profile_image: Joi.string().uri(),
    cover_image: Joi.string().uri(),
    gallery: Joi.array().items(Joi.string().uri()),
    video_url: Joi.string().uri(),
    projects: Joi.array().items(projectSchema),
    skills: Joi.array().items(Joi.string().trim()),
    education: Joi.array().items(educationSchema),
    experience: Joi.array().items(experienceSchema),
    achievements: Joi.array().items(achievementSchema),
    social_links: socialLinksSchema,
    categories: Joi.array().items(ObjectId()).min(1)
      .messages({
        "array.min": "At least one category is required",
      }),
    status: Joi.string().valid(...Object.values(STATUS)),
    is_featured: Joi.boolean(),
    is_published: Joi.boolean(),
    display_order: Joi.number().integer().min(0),
    vote_count: Joi.number().integer().min(0),
    view_count: Joi.number().integer().min(0),
    why_nominate_me: Joi.string().trim().max(1000)
      .messages({
        "string.max": "Why nominate me cannot exceed 1000 characters",
      }),
    impact_statement: Joi.string().trim().max(1000)
      .messages({
        "string.max": "Impact statement cannot exceed 1000 characters",
      }),
    endorsements: Joi.array().items(endorsementSchema),
    tags: Joi.array().items(Joi.string().trim()),
    metadata: Joi.object().unknown(true),
    updated_by: ObjectId(),
  }).min(1)
    .messages({
      "object.min": "At least one field must be provided for update",
    });

  // ==================== CATEGORY MANAGEMENT ====================

  /**
   * Add category validation
   */
  static addCategorySchema = Joi.object({
    categoryId: ObjectId().required()
      .messages({
        "string.empty": "Category ID is required",
      }),
  });

  /**
   * Update admin verified categories validation
   */
  static updateAdminVerifiedCategoriesSchema = Joi.object({
    categoryIds: Joi.array().items(ObjectId()).min(1).required()
      .messages({
        "array.min": "At least one category is required",
        "any.required": "Category IDs are required",
      }),
  });

  // ==================== ADMIN OPERATIONS ====================

  /**
   * Candidate ID parameter validation
   */
  static candidateIdSchema = Joi.object({
    id: ObjectId().required()
      .messages({
        "string.empty": "Candidate ID is required",
      }),
  });

  /**
   * Query parameters validation
   */
  static candidateQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    event: ObjectId(),
    category: ObjectId(),
    status: Joi.string().valid(...Object.values(STATUS)),
    is_featured: Joi.boolean(),
    is_published: Joi.boolean(),
    search: Joi.string().trim().max(100),
    tags: Joi.alternatives().try(
      Joi.string().trim(),
      Joi.array().items(Joi.string().trim())
    ),
    sort: Joi.string().valid(
      "first_name", "last_name", "vote_count", "view_count", "nomination_date", "created_at",
      "-first_name", "-last_name", "-vote_count", "-view_count", "-nomination_date", "-created_at"
    ).default("-created_at"),
  });

  /**
   * Approve candidate validation
   */
  static approveCandidateSchema = Joi.object({
    approval_date: Joi.date().default(Date.now),
  });

  /**
   * Reject candidate validation
   */
  static rejectCandidateSchema = Joi.object({
    reason: Joi.string().trim().min(10).max(500).required()
      .messages({
        "string.empty": "Rejection reason is required",
        "string.min": "Rejection reason must be at least 10 characters",
        "string.max": "Rejection reason cannot exceed 500 characters",
      }),
  });

  /**
   * Update candidate status validation
   */
  static updateCandidateStatusSchema = Joi.object({
    status: Joi.string().valid(...Object.values(STATUS)).required()
      .messages({
        "any.only": `Status must be one of: ${Object.values(STATUS).join(", ")}`,
        "string.empty": "Status is required",
      }),
    rejection_reason: Joi.when("status", {
      is: STATUS.REJECTED,
      then: Joi.string().trim().min(10).max(500).required()
        .messages({
          "string.empty": "Rejection reason is required when rejecting",
          "string.min": "Rejection reason must be at least 10 characters",
          "string.max": "Rejection reason cannot exceed 500 characters",
        }),
      otherwise: Joi.forbidden(),
    }),
  });

  /**
   * Increment vote count validation
   */
  static incrementVoteCountSchema = Joi.object({
    increment: Joi.number().integer().min(1).default(1)
      .messages({
        "number.min": "Increment must be at least 1",
      }),
  });

  /**
   * Feature candidate validation
   */
  static featureCandidateSchema = Joi.object({
    is_featured: Joi.boolean().required()
      .messages({
        "any.required": "is_featured field is required",
      }),
  });

  /**
   * Publish candidate validation
   */
  static publishCandidateSchema = Joi.object({
    is_published: Joi.boolean().required()
      .messages({
        "any.required": "is_published field is required",
      }),
  });

  // ==================== NOMINATION WORKFLOW ====================

  /**
   * Create from nomination validation
   */
  static createFromNominationSchema = Joi.object({
    first_name: Joi.string().trim().min(2).max(100).required()
      .messages({
        "string.empty": "First name is required",
        "string.min": "First name must be at least 2 characters",
        "string.max": "First name cannot exceed 100 characters",
      }),
    last_name: Joi.string().trim().min(2).max(100).required()
      .messages({
        "string.empty": "Last name is required",
        "string.min": "Last name must be at least 2 characters",
        "string.max": "Last name cannot exceed 100 characters",
      }),
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
    phone_number: Joi.string().trim().optional(),
    bio: Joi.string().trim().max(2000).optional(),
    profile_image: Joi.string().uri().optional(),
    social_links: socialLinksSchema,
  });

  /**
   * Event and category IDs for nomination
   */
  static nominationContextSchema = Joi.object({
    eventId: ObjectId().required()
      .messages({
        "string.empty": "Event ID is required",
      }),
    categoryIds: Joi.array().items(ObjectId()).min(1).required()
      .messages({
        "array.min": "At least one category is required",
        "any.required": "Category IDs are required",
      }),
    submissionId: ObjectId().required()
      .messages({
        "string.empty": "Submission ID is required",
      }),
    adminId: ObjectId().optional(),
  });

  // ==================== SEARCH ====================

  /**
   * Search candidates validation
   */
  static searchSchema = Joi.object({
    query: Joi.string().trim().min(1).max(100).required()
      .messages({
        "string.empty": "Search query is required",
        "string.min": "Search query must be at least 1 character",
        "string.max": "Search query cannot exceed 100 characters",
      }),
    filters: Joi.object({
      event: ObjectId(),
      category: ObjectId(),
      status: Joi.string().valid(...Object.values(STATUS)),
      is_featured: Joi.boolean(),
      is_published: Joi.boolean(),
    }).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
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

export default CandidateValidation;
