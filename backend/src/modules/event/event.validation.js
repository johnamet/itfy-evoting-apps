/**
 * Event module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { STATUS, EVENT_TYPE, VISIBILITY, CURRENCY } from "../../utils/constants/event.constants.js";

const ObjectId = JoiObjectId(Joi);

// Reusable sub-schemas
const locationSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().required(),
  city: Joi.string().trim().required(),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
  }).optional(),
  country: Joi.string().trim().optional(),
  zipCode: Joi.string().trim().optional(),
  website: Joi.string().uri().optional(),
  phone: Joi.string().trim().optional(),
  venueInfo: Joi.array().items(Joi.string()).optional(),
  directions: Joi.array().items(Joi.string()).optional(),
});

const timelineItemSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  time: Joi.date().required(),
});

const registrationFeeSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  currency: Joi.string().valid(...Object.values(CURRENCY)).default(CURRENCY.GHS),
  is_free: Joi.boolean().default(true),
});

const organizerSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().lowercase().email().optional(),
  phone: Joi.string().trim().optional(),
});

const socialLinksSchema = Joi.object({
  facebook: Joi.string().uri().optional(),
  twitter: Joi.string().uri().optional(),
  linkedin: Joi.string().uri().optional(),
  instagram: Joi.string().uri().optional(),
}).optional();

// Create event validation
export const createEventSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200).required(),
  description: Joi.string().trim().min(10).required(),
  location: locationSchema.required(),
  gallery: Joi.array().items(Joi.string().uri()).default([]),
  start_date: Joi.date().min("now").required(),
  end_date: Joi.date().greater(Joi.ref("start_date")).required(),
  speakers: Joi.array().items(Joi.object()).default([]),
  guestOfHonor: Joi.array().items(Joi.object()).default([]),
  sponsors: Joi.array().items(Joi.object()).default([]),
  related_events: Joi.array().items(ObjectId()).default([]),
  categories: Joi.array().items(ObjectId()).default([]),
  timeline: Joi.array().items(timelineItemSchema).default([]),
  registration_form: ObjectId().optional(),
  status: Joi.string().valid(...Object.values(STATUS)).default(STATUS.PENDING),
  is_featured: Joi.boolean().default(false),
  is_published: Joi.boolean().default(false),
  max_attendees: Joi.number().integer().min(0).optional(),
  current_attendees: Joi.number().integer().min(0).default(0),
  registration_deadline: Joi.date().less(Joi.ref("start_date")).optional(),
  registration_fee: registrationFeeSchema.optional(),
  tags: Joi.array().items(Joi.string().trim()).default([]),
  organizer: organizerSchema.optional(),
  contact_email: Joi.string().trim().lowercase().email().optional(),
  event_type: Joi.string().valid(...Object.values(EVENT_TYPE)).optional(),
  visibility: Joi.string().valid(...Object.values(VISIBILITY)).default(VISIBILITY.PUBLIC),
  cover_image: Joi.string().uri().optional(),
  social_links: socialLinksSchema,
  requirements: Joi.array().items(Joi.string().trim()).default([]),
  cancellation_policy: Joi.string().trim().optional(),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional(),
});

// Update event validation
export const updateEventSchema = Joi.object({
  name: Joi.string().trim().min(3).max(200),
  description: Joi.string().trim().min(10),
  location: locationSchema,
  gallery: Joi.array().items(Joi.string().uri()),
  start_date: Joi.date().min("now"),
  end_date: Joi.date().when("start_date", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("start_date")),
    otherwise: Joi.date(),
  }),
  speakers: Joi.array().items(Joi.object()),
  guestOfHonor: Joi.array().items(Joi.object()),
  sponsors: Joi.array().items(Joi.object()),
  related_events: Joi.array().items(ObjectId()),
  categories: Joi.array().items(ObjectId()),
  timeline: Joi.array().items(timelineItemSchema),
  registration_form: ObjectId(),
  status: Joi.string().valid(...Object.values(STATUS)),
  is_featured: Joi.boolean(),
  is_published: Joi.boolean(),
  max_attendees: Joi.number().integer().min(0),
  current_attendees: Joi.number().integer().min(0),
  registration_deadline: Joi.date(),
  registration_fee: registrationFeeSchema,
  tags: Joi.array().items(Joi.string().trim()),
  organizer: organizerSchema,
  contact_email: Joi.string().trim().lowercase().email(),
  event_type: Joi.string().valid(...Object.values(EVENT_TYPE)),
  visibility: Joi.string().valid(...Object.values(VISIBILITY)),
  cover_image: Joi.string().uri(),
  social_links: socialLinksSchema,
  requirements: Joi.array().items(Joi.string().trim()),
  cancellation_policy: Joi.string().trim(),
  updated_by: ObjectId(),
}).min(1);

// Event ID parameter validation
export const eventIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const eventQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string().valid(...Object.values(STATUS)),
  event_type: Joi.string().valid(...Object.values(EVENT_TYPE)),
  visibility: Joi.string().valid(...Object.values(VISIBILITY)),
  is_featured: Joi.boolean(),
  is_published: Joi.boolean(),
  search: Joi.string().trim().max(100),
  start_date_from: Joi.date(),
  start_date_to: Joi.date(),
  end_date_from: Joi.date(),
  end_date_to: Joi.date(),
  tags: Joi.alternatives().try(
    Joi.string().trim(),
    Joi.array().items(Joi.string().trim())
  ),
  sort: Joi.string().valid(
    "name", "start_date", "end_date", "created_at", "current_attendees",
    "-name", "-start_date", "-end_date", "-created_at", "-current_attendees"
  ).default("-created_at"),
});

// Publish event validation
export const publishEventSchema = Joi.object({
  is_published: Joi.boolean().required(),
});

// Feature event validation
export const featureEventSchema = Joi.object({
  is_featured: Joi.boolean().required(),
});

// Update event status validation
export const updateEventStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(STATUS)).required(),
});

// Add category to event validation
export const addCategorySchema = Joi.object({
  category_id: ObjectId().required(),
});

// Remove category from event validation
export const removeCategorySchema = Joi.object({
  category_id: ObjectId().required(),
});

// Update attendees count validation
export const updateAttendeesSchema = Joi.object({
  current_attendees: Joi.number().integer().min(0).required(),
});

export default {
  createEventSchema,
  updateEventSchema,
  eventIdSchema,
  eventQuerySchema,
  publishEventSchema,
  featureEventSchema,
  updateEventStatusSchema,
  addCategorySchema,
  removeCategorySchema,
  updateAttendeesSchema,
};
