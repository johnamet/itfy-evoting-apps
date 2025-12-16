/**
 * Notification module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_STATUS,
  NOTIFICATION_PRIORITY,
} from "../../utils/constants/notification.constants.js";

const ObjectId = JoiObjectId(Joi);

// Create notification validation
export const createNotificationSchema = Joi.object({
  user: ObjectId().required(),
  type: Joi.string().valid(...Object.values(NOTIFICATION_TYPE)).required(),
  title: Joi.string().trim().max(200).required(),
  message: Joi.string().trim().max(1000).required(),
  channel: Joi.string().valid(...Object.values(NOTIFICATION_CHANNEL)).default(NOTIFICATION_CHANNEL.IN_APP),
  status: Joi.string().valid(...Object.values(NOTIFICATION_STATUS)).default(NOTIFICATION_STATUS.PENDING),
  priority: Joi.string().valid(...Object.values(NOTIFICATION_PRIORITY)).default(NOTIFICATION_PRIORITY.NORMAL),
  event: ObjectId().optional(),
  candidate: ObjectId().optional(),
  category: ObjectId().optional(),
  vote: ObjectId().optional(),
  payment: ObjectId().optional(),
  form: ObjectId().optional(),
  submission: ObjectId().optional(),
  action_url: Joi.string().trim().pattern(/^\/[a-zA-Z0-9\-_\/]*$/).optional(),
  action_text: Joi.string().trim().max(50).optional(),
  metadata: Joi.object().unknown(true).default({}),
  email_to: Joi.string().trim().lowercase().email().optional(),
  email_subject: Joi.string().trim().optional(),
  email_template_id: Joi.string().trim().optional(),
  sms_to: Joi.string().trim().optional(),
  batch_id: Joi.string().trim().optional(),
  max_retries: Joi.number().integer().min(0).default(3),
  expires_at: Joi.date().optional(),
});

// Update notification validation
export const updateNotificationSchema = Joi.object({
  status: Joi.string().valid(...Object.values(NOTIFICATION_STATUS)),
  priority: Joi.string().valid(...Object.values(NOTIFICATION_PRIORITY)),
  sent_at: Joi.date(),
  read_at: Joi.date(),
  clicked_at: Joi.date(),
  email_provider_id: Joi.string().trim(),
  sms_provider_id: Joi.string().trim(),
  error_message: Joi.string().trim(),
  retry_count: Joi.number().integer().min(0),
  next_retry_at: Joi.date(),
  metadata: Joi.object().unknown(true),
}).min(1);

// Notification ID parameter validation
export const notificationIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const notificationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  user: ObjectId(),
  type: Joi.string().valid(...Object.values(NOTIFICATION_TYPE)),
  channel: Joi.string().valid(...Object.values(NOTIFICATION_CHANNEL)),
  status: Joi.string().valid(...Object.values(NOTIFICATION_STATUS)),
  priority: Joi.string().valid(...Object.values(NOTIFICATION_PRIORITY)),
  event: ObjectId(),
  batch_id: Joi.string().trim(),
  is_read: Joi.boolean(),
  created_at_from: Joi.date(),
  created_at_to: Joi.date(),
  sort: Joi.string().valid(
    "created_at", "sent_at", "priority", "-created_at", "-sent_at", "-priority"
  ).default("-created_at"),
});

// Mark as read validation
export const markAsReadSchema = Joi.object({
  read_at: Joi.date().default(Date.now),
});

// Mark as clicked validation
export const markAsClickedSchema = Joi.object({
  clicked_at: Joi.date().default(Date.now),
});

// Bulk mark as read validation
export const bulkMarkAsReadSchema = Joi.object({
  notification_ids: Joi.array().items(ObjectId()).min(1).required(),
});

// Send notification validation
export const sendNotificationSchema = Joi.object({
  notification_id: ObjectId().required(),
  force_resend: Joi.boolean().default(false),
});

// Bulk create notifications validation
export const bulkCreateNotificationsSchema = Joi.object({
  user_ids: Joi.array().items(ObjectId()).min(1).required(),
  type: Joi.string().valid(...Object.values(NOTIFICATION_TYPE)).required(),
  title: Joi.string().trim().max(200).required(),
  message: Joi.string().trim().max(1000).required(),
  channel: Joi.string().valid(...Object.values(NOTIFICATION_CHANNEL)).default(NOTIFICATION_CHANNEL.IN_APP),
  priority: Joi.string().valid(...Object.values(NOTIFICATION_PRIORITY)).default(NOTIFICATION_PRIORITY.NORMAL),
  event: ObjectId().optional(),
  action_url: Joi.string().trim().pattern(/^\/[a-zA-Z0-9\-_\/]*$/).optional(),
  action_text: Joi.string().trim().max(50).optional(),
  metadata: Joi.object().unknown(true).optional(),
});

export default {
  createNotificationSchema,
  updateNotificationSchema,
  notificationIdSchema,
  notificationQuerySchema,
  markAsReadSchema,
  markAsClickedSchema,
  bulkMarkAsReadSchema,
  sendNotificationSchema,
  bulkCreateNotificationsSchema,
};
