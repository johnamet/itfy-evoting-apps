"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Authentication Validation Schemas
 * Validates all authentication-related requests for both users and candidates
 */
var AuthValidation = /*#__PURE__*/function () {
  function AuthValidation() {
    _classCallCheck(this, AuthValidation);
  }
  return _createClass(AuthValidation, null, [{
    key: "validate",
    value:
    // ==================== VALIDATION HELPERS ====================

    /**
     * Validate data against schema
     * @param {Object} data - Data to validate
     * @param {Joi.Schema} schema - Joi schema
     * @returns {Object} - Validated data
     * @throws {Error} - Validation error
     */
    function validate(data, schema) {
      var _schema$validate = schema.validate(data, {
          abortEarly: false,
          stripUnknown: true
        }),
        error = _schema$validate.error,
        value = _schema$validate.value;
      if (error) {
        var messages = error.details.map(function (detail) {
          return detail.message;
        }).join(", ");
        throw new Error(messages);
      }
      return value;
    }
  }]);
}();
// ==================== USER AUTHENTICATION ====================
/**
 * User registration schema
 */
_defineProperty(AuthValidation, "registerSchema", _joi["default"].object({
  name: _joi["default"].string().trim().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters"
  }),
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: _joi["default"].string().min(8).max(128).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 128 characters",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required"
  }),
  role: _joi["default"].string().valid("voter", "organizer", "admin").optional()
}));
/**
 * User login schema
 */
_defineProperty(AuthValidation, "loginSchema", _joi["default"].object({
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: _joi["default"].string().required().messages({
    "string.empty": "Password is required"
  })
}));
// ==================== CANDIDATE AUTHENTICATION ====================
/**
 * Candidate login schema (code or email)
 */
_defineProperty(AuthValidation, "candidateLoginSchema", _joi["default"].object({
  identifier: _joi["default"].string().trim().required().messages({
    "string.empty": "Candidate code or email is required"
  }),
  password: _joi["default"].string().required().messages({
    "string.empty": "Password is required"
  }),
  eventId: _joi["default"].string().trim().optional().messages({
    "string.empty": "Event ID cannot be empty"
  })
}));
/**
 * Candidate registration schema
 */
_defineProperty(AuthValidation, "candidateRegisterSchema", _joi["default"].object({
  name: _joi["default"].string().trim().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters"
  }),
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: _joi["default"].string().min(8).max(128).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 128 characters",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required"
  }),
  eventId: _joi["default"].string().trim().required().messages({
    "string.empty": "Event ID is required"
  }),
  categories: _joi["default"].array().items(_joi["default"].string()).min(1).required().messages({
    "array.min": "At least one category is required",
    "any.required": "Categories are required"
  }),
  bio: _joi["default"].string().trim().max(1000).optional(),
  phone: _joi["default"].string().trim().optional(),
  social_media: _joi["default"].object().optional()
}));
// ==================== PASSWORD MANAGEMENT ====================
/**
 * Change password schema (authenticated user)
 */
_defineProperty(AuthValidation, "changePasswordSchema", _joi["default"].object({
  currentPassword: _joi["default"].string().required().messages({
    "string.empty": "Current password is required"
  }),
  newPassword: _joi["default"].string().min(8).max(128).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).messages({
    "string.empty": "New password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 128 characters",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("newPassword")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required"
  })
}));
/**
 * Forgot password schema
 */
_defineProperty(AuthValidation, "forgotPasswordSchema", _joi["default"].object({
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  })
}));
/**
 * Reset password schema
 */
_defineProperty(AuthValidation, "resetPasswordSchema", _joi["default"].object({
  token: _joi["default"].string().required().messages({
    "string.empty": "Reset token is required"
  }),
  password: _joi["default"].string().min(8).max(128).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 128 characters",
    "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  }),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required"
  })
}));
// ==================== TOKEN MANAGEMENT ====================
/**
 * Refresh token schema
 */
_defineProperty(AuthValidation, "refreshTokenSchema", _joi["default"].object({
  refresh_token: _joi["default"].string().required().messages({
    "string.empty": "Refresh token is required"
  })
}));
/**
 * Email verification schema
 */
_defineProperty(AuthValidation, "verifyEmailSchema", _joi["default"].object({
  token: _joi["default"].string().required().messages({
    "string.empty": "Verification token is required"
  })
}));
/**
 * Resend verification email schema
 */
_defineProperty(AuthValidation, "resendVerificationSchema", _joi["default"].object({
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  })
}));
// ==================== LOGOUT ====================
/**
 * Logout schema
 */
_defineProperty(AuthValidation, "logoutSchema", _joi["default"].object({
  refresh_token: _joi["default"].string().optional(),
  access_token: _joi["default"].string().optional()
}));
var _default = exports["default"] = AuthValidation;