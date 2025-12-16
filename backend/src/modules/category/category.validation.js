/**
 * Category module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { STATUS, RESULTS_VISIBILITY } from "../../utils/constants/category.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create category validation
export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().trim().max(2000).optional(),
  icon: Joi.string().uri().optional(),
  slug: Joi.string().lowercase().trim().optional(),
  candidates: Joi.array().items(ObjectId()).default([]),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.ACTIVE),
  event: ObjectId().required(),
  is_voting_open: Joi.boolean().default(false),
  voting_start_date: Joi.date().optional(),
  voting_deadline: Joi.date().when("voting_start_date", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("voting_start_date")),
    otherwise: Joi.date(),
  }).optional(),
  total_votes: Joi.number().integer().min(0).default(0),
  min_candidates: Joi.number().integer().min(1).default(2),
  max_candidates: Joi.number().integer().min(Joi.ref("min_candidates")).optional(),
  display_order: Joi.number().integer().min(0).default(0),
  is_featured: Joi.boolean().default(false),
  voting_rules: Joi.string().trim().max(1000).optional(),
  allow_write_in: Joi.boolean().default(false),
  require_authentication: Joi.boolean().default(true),
  results_visibility: Joi.string().valid(...Object.values(RESULTS_VISIBILITY)).default(RESULTS_VISIBILITY.PUBLIC),
});

// Update category validation
export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(200),
  description: Joi.string().trim().max(2000),
  icon: Joi.string().uri(),
  slug: Joi.string().lowercase().trim(),
  candidates: Joi.array().items(ObjectId()),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_voting_open: Joi.boolean(),
  voting_start_date: Joi.date(),
  voting_deadline: Joi.date(),
  total_votes: Joi.number().integer().min(0),
  min_candidates: Joi.number().integer().min(1),
  max_candidates: Joi.number().integer().min(1),
  display_order: Joi.number().integer().min(0),
  is_featured: Joi.boolean(),
  voting_rules: Joi.string().trim().max(1000),
  allow_write_in: Joi.boolean(),
  require_authentication: Joi.boolean(),
  results_visibility: Joi.string().valid(...Object.values(RESULTS_VISIBILITY)),
}).min(1);

// Category ID parameter validation
export const categoryIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const categoryQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  event: ObjectId(),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_voting_open: Joi.boolean(),
  is_featured: Joi.boolean(),
  search: Joi.string().trim().max(100),
  sort: Joi.string().valid(
    "name", "display_order", "total_votes", "voting_deadline", "created_at",
    "-name", "-display_order", "-total_votes", "-voting_deadline", "-created_at"
  ).default("display_order"),
});

// Add candidate to category validation
export const addCandidateSchema = Joi.object({
  candidate_id: ObjectId().required(),
});

// Remove candidate from category validation
export const removeCandidateSchema = Joi.object({
  candidate_id: ObjectId().required(),
});

// Open/Close voting validation
export const toggleVotingSchema = Joi.object({
  is_voting_open: Joi.boolean().required(),
});

// Update category status validation
export const updateCategoryStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
});

// Feature category validation
export const featureCategorySchema = Joi.object({
  is_featured: Joi.boolean().required(),
});

// Update results visibility validation
export const updateResultsVisibilitySchema = Joi.object({
  results_visibility: Joi.string().valid(...Object.values(RESULTS_VISIBILITY)).required(),
});

// Update voting dates validation
export const updateVotingDatesSchema = Joi.object({
  voting_start_date: Joi.date().required(),
  voting_deadline: Joi.date().greater(Joi.ref("voting_start_date")).required(),
});

export default {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
  categoryQuerySchema,
  addCandidateSchema,
  removeCandidateSchema,
  toggleVotingSchema,
  updateCategoryStatusSchema,
  featureCategorySchema,
  updateResultsVisibilitySchema,
  updateVotingDatesSchema,
};
