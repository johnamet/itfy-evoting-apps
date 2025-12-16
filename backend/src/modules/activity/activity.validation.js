/**
 * Activity module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { ACTION_TYPE, ENTITY_TYPE, SEVERITY } from "../../utils/constants/activity.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create activity validation
export const createActivitySchema = Joi.object({
  user: ObjectId().optional(),
  action: Joi.string().valid(...Object.values(ACTION_TYPE)).required(),
  entity_type: Joi.string().valid(...Object.values(ENTITY_TYPE)).required(),
  entity_id: ObjectId().optional(),
  event: ObjectId().optional(),
  description: Joi.string().trim().required(),
  severity: Joi.string().valid(...Object.values(SEVERITY)).default(SEVERITY.INFO),
  ip_address: Joi.string().trim().optional(),
  user_agent: Joi.string().trim().optional(),
  metadata: Joi.object().unknown(true).default({}),
  changes: Joi.object({
    before: Joi.any().optional(),
    after: Joi.any().optional(),
  }).optional(),
  session_id: Joi.string().trim().optional(),
  timestamp: Joi.date().default(Date.now),
});

// Activity ID parameter validation
export const activityIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const activityQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  user: ObjectId(),
  action: Joi.string().valid(...Object.values(ACTION_TYPE)),
  entity_type: Joi.string().valid(...Object.values(ENTITY_TYPE)),
  entity_id: ObjectId(),
  event: ObjectId(),
  severity: Joi.string().valid(...Object.values(SEVERITY)),
  session_id: Joi.string().trim(),
  ip_address: Joi.string().trim(),
  timestamp_from: Joi.date(),
  timestamp_to: Joi.date(),
  sort: Joi.string().valid(
    "timestamp", "action", "severity", "-timestamp", "-action", "-severity"
  ).default("-timestamp"),
});

// Get user activity validation
export const getUserActivitySchema = Joi.object({
  user_id: ObjectId().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  action: Joi.string().valid(...Object.values(ACTION_TYPE)).optional(),
  timestamp_from: Joi.date().optional(),
  timestamp_to: Joi.date().optional(),
});

// Get event activity validation
export const getEventActivitySchema = Joi.object({
  event_id: ObjectId().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  action: Joi.string().valid(...Object.values(ACTION_TYPE)).optional(),
  severity: Joi.string().valid(...Object.values(SEVERITY)).optional(),
});

// Get entity activity validation
export const getEntityActivitySchema = Joi.object({
  entity_type: Joi.string().valid(...Object.values(ENTITY_TYPE)).required(),
  entity_id: ObjectId().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

// Get security events validation
export const getSecurityEventsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  timestamp_from: Joi.date().optional(),
  timestamp_to: Joi.date().optional(),
});

// Log authentication activity validation
export const logAuthActivitySchema = Joi.object({
  user_id: ObjectId().required(),
  action: Joi.string().valid(
    ACTION_TYPE.LOGIN,
    ACTION_TYPE.LOGOUT,
    ACTION_TYPE.FAILED_LOGIN,
    ACTION_TYPE.PASSWORD_RESET
  ).required(),
  ip_address: Joi.string().trim().required(),
  user_agent: Joi.string().trim().optional(),
  success: Joi.boolean().required(),
  metadata: Joi.object().unknown(true).optional(),
});

// Log vote activity validation
export const logVoteActivitySchema = Joi.object({
  user_id: ObjectId().optional(),
  vote_id: ObjectId().required(),
  event_id: ObjectId().required(),
  ip_address: Joi.string().trim().optional(),
  metadata: Joi.object().unknown(true).optional(),
});

export default {
  createActivitySchema,
  activityIdSchema,
  activityQuerySchema,
  getUserActivitySchema,
  getEventActivitySchema,
  getEntityActivitySchema,
  getSecurityEventsSchema,
  logAuthActivitySchema,
  logVoteActivitySchema,
};
