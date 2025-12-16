/**
 * User module validation schemas using Joi
 * Class-based pattern for consistency with BaseService.setValidation()
 */

import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { ROLES, PERMISSIONS, STATUS } from "../../utils/constants/user.constants.js";

const ObjectId = JoiObjectId(Joi);

class UserValidation {
  // Reusable field schemas
  static fields = {
    name: Joi.string().trim().min(2).max(100),
    email: Joi.string().trim().lowercase().email(),
    password: Joi.string().min(8).max(128),
    role: Joi.string().valid(...Object.values(ROLES)),
    permissions: Joi.array().items(Joi.string().valid(...Object.values(PERMISSIONS))),
    bio: Joi.string().trim().max(1000).allow("", null),
    photo_url: Joi.string().uri().allow("", null),
    status: Joi.string().valid(...Object.values(STATUS)),
    other_info: Joi.object().unknown(true),
  };

  // Create user validation
  static createUserSchema = Joi.object({
    name: this.fields.name.required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 100 characters",
      "any.required": "Name is required",
    }),
    email: this.fields.email.required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: this.fields.password.required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 128 characters",
      "any.required": "Password is required",
    }),
    role: this.fields.role.default(ROLES.ORGANISER).messages({
      "any.only": "Invalid role specified",
    }),
    permissions: this.fields.permissions.default([PERMISSIONS.READ]),
    bio: this.fields.bio,
    photo_url: this.fields.photo_url.messages({
      "string.uri": "Photo URL must be a valid URL",
    }),
    status: this.fields.status.default(STATUS.ACTIVE),
    other_info: this.fields.other_info.default({}),
  });

  // Update user validation
  static updateUserSchema = Joi.object({
    name: this.fields.name.messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 100 characters",
    }),
    bio: this.fields.bio,
    photo_url: this.fields.photo_url.messages({
      "string.uri": "Photo URL must be a valid URL",
    }),
    other_info: this.fields.other_info,
  }).min(1).messages({
    "object.min": "At least one field must be provided for update",
  });

  // Update role validation
  static updateRoleSchema = Joi.object({
    role: this.fields.role.required().messages({
      "any.only": "Invalid role specified",
      "any.required": "Role is required",
    }),
  });

  // Update permissions validation
  static updatePermissionsSchema = Joi.object({
    permissions: this.fields.permissions.min(1).required().messages({
      "array.min": "At least one permission must be provided",
      "any.required": "Permissions are required",
    }),
  });

  // Change password validation
  static changePasswordSchema = Joi.object({
    current_password: Joi.string().required().messages({
      "string.empty": "Current password is required",
      "any.required": "Current password is required",
    }),
    new_password: this.fields.password.required().messages({
      "string.empty": "New password is required",
      "string.min": "New password must be at least 8 characters",
      "string.max": "New password cannot exceed 128 characters",
      "any.required": "New password is required",
    }),
    confirm_password: Joi.string().valid(Joi.ref("new_password")).required().messages({
      "any.only": "Passwords must match",
      "any.required": "Password confirmation is required",
    }),
  });

  // Admin reset password validation
  static resetPasswordSchema = Joi.object({
    new_password: this.fields.password.required().messages({
      "string.empty": "New password is required",
      "string.min": "New password must be at least 8 characters",
      "string.max": "New password cannot exceed 128 characters",
      "any.required": "New password is required",
    }),
  });

  // Deactivate user validation
  static deactivateUserSchema = Joi.object({
    reason: Joi.string().trim().max(500).allow("", null).messages({
      "string.max": "Reason cannot exceed 500 characters",
    }),
  });

  // User ID parameter validation
  static userIdSchema = Joi.object({
    id: ObjectId().required().messages({
      "any.required": "User ID is required",
      "string.pattern.name": "Invalid user ID format",
    }),
  });

  // Query parameters validation
  static userQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page must be a number",
      "number.min": "Page must be at least 1",
    }),
    limit: Joi.number().integer().min(1).max(100).default(10).messages({
      "number.base": "Limit must be a number",
      "number.min": "Limit must be at least 1",
      "number.max": "Limit cannot exceed 100",
    }),
    role: this.fields.role.messages({
      "any.only": "Invalid role filter",
    }),
    status: this.fields.status.messages({
      "any.only": "Invalid status filter",
    }),
    search: Joi.string().trim().max(100).messages({
      "string.max": "Search term cannot exceed 100 characters",
    }),
    sort: Joi.string().valid(
      "name", "email", "created_at", "last_login",
      "-name", "-email", "-created_at", "-last_login"
    ).default("-created_at").messages({
      "any.only": "Invalid sort field",
    }),
  });

  // Search users validation
  static searchSchema = Joi.object({
    search_term: Joi.string().trim().min(1).max(100).required().messages({
      "string.empty": "Search term is required",
      "string.min": "Search term must not be empty",
      "string.max": "Search term cannot exceed 100 characters",
      "any.required": "Search term is required",
    }),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
  });

  /**
   * Validate data against a schema
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
      const messages = error.details.map((d) => d.message).join("; ");
      throw new Error(`Validation failed: ${messages}`);
    }

    return value;
  }
}

export default UserValidation;
