/**
 * Authentication Validation Schemas
 * Validates all authentication-related requests for both users and candidates
 */

import Joi from "joi";

class AuthValidation {
  // ==================== USER AUTHENTICATION ====================

  /**
   * User registration schema
   */
  static registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters",
      }),
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
    password: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 128 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
      .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required",
      }),
    role: Joi.string().valid("voter", "organizer", "admin").optional(),
  });

  /**
   * User login schema
   */
  static loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
    password: Joi.string().required()
      .messages({
        "string.empty": "Password is required",
      }),
  });

  // ==================== CANDIDATE AUTHENTICATION ====================

  /**
   * Candidate login schema (code or email)
   */
  static candidateLoginSchema = Joi.object({
    identifier: Joi.string().trim().required()
      .messages({
        "string.empty": "Candidate code or email is required",
      }),
    password: Joi.string().required()
      .messages({
        "string.empty": "Password is required",
      }),
    eventId: Joi.string().trim().optional()
      .messages({
        "string.empty": "Event ID cannot be empty",
      }),
  });

  /**
   * Candidate registration schema
   */
  static candidateRegisterSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "string.max": "Name cannot exceed 100 characters",
      }),
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
    password: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 128 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
      .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required",
      }),
    eventId: Joi.string().trim().required()
      .messages({
        "string.empty": "Event ID is required",
      }),
    categories: Joi.array().items(Joi.string()).min(1).required()
      .messages({
        "array.min": "At least one category is required",
        "any.required": "Categories are required",
      }),
    bio: Joi.string().trim().max(1000).optional(),
    phone: Joi.string().trim().optional(),
    social_media: Joi.object().optional(),
  });

  // ==================== PASSWORD MANAGEMENT ====================

  /**
   * Change password schema (authenticated user)
   */
  static changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required()
      .messages({
        "string.empty": "Current password is required",
      }),
    newPassword: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .messages({
        "string.empty": "New password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 128 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
      .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required",
      }),

  });

  /**
   * Forgot password schema
   */
  static forgotPasswordSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
  });

  /**
   * Reset password schema
   */
  static resetPasswordSchema = Joi.object({
    token: Joi.string().required()
      .messages({
        "string.empty": "Reset token is required",
      }),
    password: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password cannot exceed 128 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
      .messages({
        "any.only": "Passwords do not match",
        "string.empty": "Confirm password is required",
      }),
  });

  // ==================== TOKEN MANAGEMENT ====================

  /**
   * Refresh token schema
   */
  static refreshTokenSchema = Joi.object({
    refresh_token: Joi.string().required()
      .messages({
        "string.empty": "Refresh token is required",
      }),
  });

  /**
   * Email verification schema
   */
  static verifyEmailSchema = Joi.object({
    token: Joi.string().required()
      .messages({
        "string.empty": "Verification token is required",
      }),
  });

  /**
   * Resend verification email schema
   */
  static resendVerificationSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
      }),
  });

  // ==================== LOGOUT ====================

  /**
   * Logout schema
   */
  static logoutSchema = Joi.object({
    refresh_token: Joi.string().optional(),
    access_token: Joi.string().optional(),
  });

  // ==================== VALIDATION HELPERS ====================

  /**
   * Validate data against schema
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
      const messages = error.details.map((detail) => detail.message).join(", ");
      throw new Error(messages);
    }

    return value;
  }
}

export default AuthValidation;
