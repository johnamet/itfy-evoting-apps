/**
 * Vote module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { VOTE_STATUS as STATUS } from "../../utils/constants/vote.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create vote validation
export const createVoteSchema = Joi.object({
  candidate: ObjectId().required(),
  category: ObjectId().required(),
  event: ObjectId().required(),
  payment: ObjectId().required(),
  vote_code: Joi.string().trim().required(),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.ACTIVE),
  ip_hash: Joi.string().trim().optional(),
  user_agent: Joi.string().trim().optional(),
  metadata: Joi.object().unknown(true).default({}),
  cast_at: Joi.date().default(Date.now),
});

// Update vote validation
export const updateVoteSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)),
  refund_reason: Joi.string().trim().max(500),
  metadata: Joi.object().unknown(true),
}).min(1);

// Vote ID parameter validation
export const voteIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const voteQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  event: ObjectId(),
  candidate: ObjectId(),
  category: ObjectId(),
  payment: ObjectId(),
  status: Joi.string().valid(...Object.values(STATUS)),
  vote_code: Joi.string().trim(),
  cast_at_from: Joi.date(),
  cast_at_to: Joi.date(),
  sort: Joi.string().valid(
    "cast_at", "created_at", "-cast_at", "-created_at"
  ).default("-cast_at"),
});

// Refund vote validation
export const refundVoteSchema = Joi.object({
  refund_reason: Joi.string().trim().min(10).max(500).required(),
});

// Bulk create votes validation
export const bulkCreateVotesSchema = Joi.object({
  votes: Joi.array().items(
    Joi.object({
      candidate: ObjectId().required(),
      category: ObjectId().required(),
      event: ObjectId().required(),
      payment: ObjectId().required(),
      vote_code: Joi.string().trim().required(),
      ip_hash: Joi.string().trim().optional(),
      user_agent: Joi.string().trim().optional(),
    })
  ).min(1).required(),
});

// Verify vote validation
export const verifyVoteSchema = Joi.object({
  vote_code: Joi.string().trim().required(),
  candidate: ObjectId().optional(),
});

export default {
  createVoteSchema,
  updateVoteSchema,
  voteIdSchema,
  voteQuerySchema,
  refundVoteSchema,
  bulkCreateVotesSchema,
  verifyVoteSchema,
};
