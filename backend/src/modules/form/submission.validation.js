/**
 * Form Submission module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { SUBMISSION_STATUS as STATUS } from "../../utils/constants/form.constants.js";

const ObjectId = JoiObjectId(Joi);

// Attachment schema
const attachmentSchema = Joi.object({
  field_id: Joi.string().required(),
  filename: Joi.string().trim().required(),
  url: Joi.string().uri().required(),
  size: Joi.number().integer().min(0).optional(),
  mime_type: Joi.string().trim().optional(),
  uploaded_at: Joi.date().default(Date.now),
});

// Duplicate check result schema
const duplicateCheckSchema = Joi.object({
  is_duplicate: Joi.boolean().default(false),
  similarity_score: Joi.number().min(0).max(100).default(0),
  matched_submissions: Joi.array().items(
    Joi.object({
      submission_id: ObjectId().required(),
      similarity: Joi.number().min(0).max(100).required(),
      matched_fields: Joi.array().items(Joi.string()).default([]),
    })
  ).default([]),
  checked_at: Joi.date().default(Date.now),
}).optional();

// Approval schema
const approvalSchema = Joi.object({
  reviewed_by: ObjectId().optional(),
  reviewed_at: Joi.date().default(Date.now),
  review_notes: Joi.string().trim().max(1000).optional(),
  rejection_reason: Joi.string().trim().max(500).optional(),
}).optional();

// Create form submission validation
export const createSubmissionSchema = Joi.object({
  form: ObjectId().required(),
  event: ObjectId().required(),
  categories: Joi.array().items(ObjectId()).default([]),
  submission_data: Joi.object().required(),
  normalized_data: Joi.object().default({}),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.PENDING),
  submitted_by: ObjectId().optional(),
  ip_address: Joi.string().trim().optional(),
  ip_hash: Joi.string().trim().optional(),
  user_agent: Joi.string().trim().optional(),
  session_id: Joi.string().trim().optional(),
  duplicate_check: duplicateCheckSchema,
  nominee_identifier: Joi.string().trim().optional(),
  attachments: Joi.array().items(attachmentSchema).default([]),
  metadata: Joi.object().unknown(true).default({}),
  confirmation_sent: Joi.boolean().default(false),
});

// Update submission validation
export const updateSubmissionSchema = Joi.object({
  submission_data: Joi.object(),
  normalized_data: Joi.object(),
  status: Joi.string().valid(...Object.values(STATUS)),
  duplicate_check: duplicateCheckSchema,
  nominee_identifier: Joi.string().trim(),
  approval: approvalSchema,
  candidate: ObjectId(),
  attachments: Joi.array().items(attachmentSchema),
  metadata: Joi.object().unknown(true),
  confirmation_sent: Joi.boolean(),
  confirmation_sent_at: Joi.date(),
}).min(1);

// Submission ID parameter validation
export const submissionIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const submissionQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  form: ObjectId(),
  event: ObjectId(),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_duplicate: Joi.boolean(),
  submitted_by: ObjectId(),
  nominee_identifier: Joi.string().trim(),
  search: Joi.string().trim().max(100),
  created_at_from: Joi.date(),
  created_at_to: Joi.date(),
  sort: Joi.string().valid(
    "created_at", "status", "-created_at", "-status"
  ).default("-created_at"),
});

// Approve submission validation
export const approveSubmissionSchema = Joi.object({
  reviewed_by: ObjectId().required(),
  review_notes: Joi.string().trim().max(1000).optional(),
  candidate_id: ObjectId().optional(),
});

// Reject submission validation
export const rejectSubmissionSchema = Joi.object({
  reviewed_by: ObjectId().required(),
  rejection_reason: Joi.string().trim().min(10).max(500).required(),
  review_notes: Joi.string().trim().max(1000).optional(),
});

// Update submission status validation
export const updateSubmissionStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
  reviewed_by: ObjectId().when("status", {
    is: Joi.valid(STATUS.APPROVED, STATUS.REJECTED),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  rejection_reason: Joi.when("status", {
    is: STATUS.REJECTED,
    then: Joi.string().trim().min(10).max(500).required(),
    otherwise: Joi.forbidden(),
  }),
  review_notes: Joi.string().trim().max(1000).optional(),
});

// Mark as duplicate validation
export const markAsDuplicateSchema = Joi.object({
  is_duplicate: Joi.boolean().required(),
  matched_submission_id: ObjectId().optional(),
  similarity_score: Joi.number().min(0).max(100).optional(),
});

export default {
  createSubmissionSchema,
  updateSubmissionSchema,
  submissionIdSchema,
  submissionQuerySchema,
  approveSubmissionSchema,
  rejectSubmissionSchema,
  updateSubmissionStatusSchema,
  markAsDuplicateSchema,
};
