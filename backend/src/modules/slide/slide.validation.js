/**
 * Slide module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import {
  SLIDE_STATUS,
  SLIDE_TYPE,
  SLIDE_POSITION,
  ANIMATION_TYPE,
  BUTTON_STYLE,
} from "../../utils/constants/slide.constants.js";

const ObjectId = JoiObjectId(Joi);

// Image schema
const imageSchema = Joi.object({
  url: Joi.string().uri().required(),
  alt: Joi.string().trim().default(""),
  public_id: Joi.string().trim().optional(),
});

// Button schema
const buttonSchema = Joi.object({
  text: Joi.string().trim().required(),
  url: Joi.string().uri().required(),
  style: Joi.string().valid(...Object.values(BUTTON_STYLE)).default(BUTTON_STYLE.PRIMARY),
  opens_in_new_tab: Joi.boolean().default(false),
});

// Create slide validation
export const createSlideSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  subtitle: Joi.string().trim().max(200).optional(),
  description: Joi.string().trim().max(1000).optional(),
  slide_type: Joi.string().valid(...Object.values(SLIDE_TYPE)).default(SLIDE_TYPE.HERO),
  status: Joi.string().valid(...Object.values(SLIDE_STATUS)).default(SLIDE_STATUS.DRAFT),
  event: ObjectId().optional(),
  image: imageSchema.required(),
  mobile_image: imageSchema.optional(),
  background_color: Joi.string().trim().optional(),
  text_color: Joi.string().trim().default("#ffffff"),
  overlay_opacity: Joi.number().min(0).max(100).default(40),
  button: buttonSchema.optional(),
  secondary_button: buttonSchema.optional(),
  position: Joi.string().valid(...Object.values(SLIDE_POSITION)).default(SLIDE_POSITION.MIDDLE),
  animation: Joi.string().valid(...Object.values(ANIMATION_TYPE)).default(ANIMATION_TYPE.FADE),
  animation_duration: Joi.number().min(0).default(300),
  display_order: Joi.number().integer().min(0).default(0),
  is_active: Joi.boolean().default(true),
  start_date: Joi.date().optional(),
  end_date: Joi.date().when("start_date", {
    is: Joi.exist(),
    then: Joi.date().greater(Joi.ref("start_date")),
    otherwise: Joi.date(),
  }).optional(),
  click_count: Joi.number().integer().min(0).default(0),
  view_count: Joi.number().integer().min(0).default(0),
  metadata: Joi.object().unknown(true).default({}),
});

// Update slide validation
export const updateSlideSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200),
  subtitle: Joi.string().trim().max(200),
  description: Joi.string().trim().max(1000),
  slide_type: Joi.string().valid(...Object.values(SLIDE_TYPE)),
  status: Joi.string().valid(...Object.values(SLIDE_STATUS)),
  event: ObjectId(),
  image: imageSchema,
  mobile_image: imageSchema,
  background_color: Joi.string().trim(),
  text_color: Joi.string().trim(),
  overlay_opacity: Joi.number().min(0).max(100),
  button: buttonSchema,
  secondary_button: buttonSchema,
  position: Joi.string().valid(...Object.values(SLIDE_POSITION)),
  animation: Joi.string().valid(...Object.values(ANIMATION_TYPE)),
  animation_duration: Joi.number().min(0),
  display_order: Joi.number().integer().min(0),
  is_active: Joi.boolean(),
  start_date: Joi.date(),
  end_date: Joi.date(),
  click_count: Joi.number().integer().min(0),
  view_count: Joi.number().integer().min(0),
  metadata: Joi.object().unknown(true),
}).min(1);

// Slide ID parameter validation
export const slideIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const slideQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  slide_type: Joi.string().valid(...Object.values(SLIDE_TYPE)),
  status: Joi.string().valid(...Object.values(SLIDE_STATUS)),
  event: ObjectId(),
  is_active: Joi.boolean(),
  search: Joi.string().trim().max(100),
  sort: Joi.string().valid(
    "display_order", "title", "view_count", "click_count", "created_at",
    "-display_order", "-title", "-view_count", "-click_count", "-created_at"
  ).default("display_order"),
});

// Update slide status validation
export const updateSlideStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(SLIDE_STATUS)).required(),
});

// Toggle active validation
export const toggleActiveSchema = Joi.object({
  is_active: Joi.boolean().required(),
});

// Increment view count validation
export const incrementViewCountSchema = Joi.object({
  increment: Joi.number().integer().min(1).default(1),
});

// Increment click count validation
export const incrementClickCountSchema = Joi.object({
  increment: Joi.number().integer().min(1).default(1),
});

// Reorder slides validation
export const reorderSlidesSchema = Joi.object({
  slide_orders: Joi.array().items(
    Joi.object({
      id: ObjectId().required(),
      display_order: Joi.number().integer().min(0).required(),
    })
  ).min(1).required(),
});

export default {
  createSlideSchema,
  updateSlideSchema,
  slideIdSchema,
  slideQuerySchema,
  updateSlideStatusSchema,
  toggleActiveSchema,
  incrementViewCountSchema,
  incrementClickCountSchema,
  reorderSlidesSchema,
};
