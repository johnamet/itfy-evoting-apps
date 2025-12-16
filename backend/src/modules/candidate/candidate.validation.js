/**
 * Candidate module validation schemas using Joi
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

// Create candidate validation
export const createCandidateSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(100).required(),
  last_name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  phone_number: Joi.string().trim().optional(),
  slug: Joi.string().lowercase().trim().optional(),
  bio: Joi.string().trim().max(2000).optional(),
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
  event: ObjectId().required(),
  categories: Joi.array().items(ObjectId()).min(1).required(),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.PENDING),
  is_featured: Joi.boolean().default(false),
  is_published: Joi.boolean().default(false),
  display_order: Joi.number().integer().min(0).default(0),
  vote_count: Joi.number().integer().min(0).default(0),
  view_count: Joi.number().integer().min(0).default(0),
  why_nominate_me: Joi.string().trim().max(1000).optional(),
  impact_statement: Joi.string().trim().max(1000).optional(),
  endorsements: Joi.array().items(endorsementSchema).default([]),
  nomination_date: Joi.date().default(Date.now),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  metadata: Joi.object().unknown(true).default({}),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional(),
});

// Update candidate validation
export const updateCandidateSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(100),
  last_name: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().lowercase().email(),
  phone_number: Joi.string().trim(),
  slug: Joi.string().lowercase().trim(),
  bio: Joi.string().trim().max(2000),
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
  categories: Joi.array().items(ObjectId()).min(1),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_featured: Joi.boolean(),
  is_published: Joi.boolean(),
  display_order: Joi.number().integer().min(0),
  vote_count: Joi.number().integer().min(0),
  view_count: Joi.number().integer().min(0),
  why_nominate_me: Joi.string().trim().max(1000),
  impact_statement: Joi.string().trim().max(1000),
  endorsements: Joi.array().items(endorsementSchema),
  tags: Joi.array().items(Joi.string().trim()),
  metadata: Joi.object().unknown(true),
  updated_by: ObjectId(),
}).min(1);

// Candidate ID parameter validation
export const candidateIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const candidateQuerySchema = Joi.object({
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

// Approve candidate validation
export const approveCandidateSchema = Joi.object({
  approval_date: Joi.date().default(Date.now),
});

// Reject candidate validation
export const rejectCandidateSchema = Joi.object({
  rejection_reason: Joi.string().trim().min(10).max(500).required(),
});

// Update candidate status validation
export const updateCandidateStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
  rejection_reason: Joi.when("status", {
    is: STATUS.REJECTED,
    then: Joi.string().trim().min(10).max(500).required(),
    otherwise: Joi.forbidden(),
  }),
});

// Increment vote count validation
export const incrementVoteCountSchema = Joi.object({
  increment: Joi.number().integer().min(1).default(1),
});

// Feature candidate validation
export const featureCandidateSchema = Joi.object({
  is_featured: Joi.boolean().required(),
});

// Publish candidate validation
export const publishCandidateSchema = Joi.object({
  is_published: Joi.boolean().required(),
});

export default {
  createCandidateSchema,
  updateCandidateSchema,
  candidateIdSchema,
  candidateQuerySchema,
  approveCandidateSchema,
  rejectCandidateSchema,
  updateCandidateStatusSchema,
  incrementVoteCountSchema,
  featureCandidateSchema,
  publishCandidateSchema,
};
