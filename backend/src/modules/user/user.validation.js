/**
 * User module validation schemas using Joi
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { ROLES, PERMSSIONS, STATUS } from "../../utils/constants/user.constants.js";

const ObjectId = JoiObjectId(Joi);

// Reusable field schemas
const userSchemas = {
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(8).max(128).required(),
  role: Joi.string().valid(...Object.values(ROLES)).required(),
  permissions: Joi.array().items(Joi.string().valid(...Object.values(PERMSSIONS))).default([PERMSSIONS.READ]),
  bio: Joi.string().trim().max(1000).allow("", null),
  photo_url: Joi.string().uri().allow("", null),
  status: Joi.string().valid(...Object.values(STATUS)),
  other_info: Joi.object().unknown(true).default({}),
};

// Create user validation
export const createUserSchema = Joi.object({
  name: userSchemas.name,
  email: userSchemas.email,
  password: userSchemas.password,
  role: userSchemas.role.default(ROLES.USER),
  permissions: userSchemas.permissions,
  bio: userSchemas.bio,
  photo_url: userSchemas.photo_url,
  status: userSchemas.status.default(STATUS.ACTIVE),
  other_info: userSchemas.other_info,
});

// Update user validation
export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  email: Joi.string().trim().lowercase().email(),
  role: Joi.string().valid(...Object.values(ROLES)),
  permissions: Joi.array().items(Joi.string().valid(...Object.values(PERMSSIONS))),
  bio: userSchemas.bio,
  photo_url: userSchemas.photo_url,
  status: userSchemas.status,
  other_info: userSchemas.other_info,
  email_verified: Joi.boolean(),
}).min(1);

// Login validation
export const loginSchema = Joi.object({
  email: userSchemas.email,
  password: Joi.string().required(),
});

// Register validation (similar to create but no role/permissions)
export const registerSchema = Joi.object({
  name: userSchemas.name,
  email: userSchemas.email,
  password: userSchemas.password,
  bio: userSchemas.bio,
  photo_url: userSchemas.photo_url,
});

// Change password validation
export const changePasswordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string().min(8).max(128).required(),
  confirm_password: Joi.string().valid(Joi.ref("new_password")).required().messages({
    "any.only": "Passwords must match",
  }),
});

// Reset password request validation
export const resetPasswordRequestSchema = Joi.object({
  email: userSchemas.email,
});

// Reset password validation
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  new_password: Joi.string().min(8).max(128).required(),
  confirm_password: Joi.string().valid(Joi.ref("new_password")).required().messages({
    "any.only": "Passwords must match",
  }),
});

// Email verification validation
export const emailVerificationSchema = Joi.object({
  token: Joi.string().required(),
});

// User ID parameter validation
export const userIdSchema = Joi.object({
  id: ObjectId().required(),
});

// Query parameters validation
export const userQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  role: Joi.string().valid(...Object.values(ROLES)),
  status: Joi.string().valid(...Object.values(STATUS)),
  search: Joi.string().trim().max(100),
  sort: Joi.string().valid("name", "email", "created_at", "last_login", "-name", "-email", "-created_at", "-last_login").default("-created_at"),
});

// Update permissions validation
export const updatePermissionsSchema = Joi.object({
  permissions: Joi.array().items(Joi.string().valid(...Object.values(PERMSSIONS))).min(1).required(),
});

// Update role validation
export const updateRoleSchema = Joi.object({
  role: userSchemas.role,
});

export default {
  createUserSchema,
  updateUserSchema,
  loginSchema,
  registerSchema,
  changePasswordSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema,
  emailVerificationSchema,
  userIdSchema,
  userQuerySchema,
  updatePermissionsSchema,
  updateRoleSchema,
};
