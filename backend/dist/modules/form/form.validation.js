"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _formConstants = require("../../utils/constants/form.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7, _Joi$string8, _Joi$string9, _Joi$string0, _Joi$string1;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Form Validation Schemas
 * Validates all form-related requests for dynamic form management
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// ==================== REUSABLE SUB-SCHEMAS ====================

// Field option schema
var fieldOptionSchema = _joi["default"].object({
  label: _joi["default"].string().trim().required(),
  value: _joi["default"].string().trim().required()
});

// Field validation schema
var fieldValidationSchema = _joi["default"].object({
  required: _joi["default"]["boolean"]()["default"](false),
  min_length: _joi["default"].number().integer().min(0).optional(),
  max_length: _joi["default"].number().integer().min(0).optional(),
  min_value: _joi["default"].number().optional(),
  max_value: _joi["default"].number().optional(),
  pattern: _joi["default"].string().optional(),
  custom_message: _joi["default"].string().trim().optional()
}).optional();

// Field conditional schema
var fieldConditionalSchema = _joi["default"].object({
  show_if: _joi["default"].object({
    field_id: _joi["default"].string().required(),
    operator: _joi["default"].string().valid("equals", "not_equals", "contains", "greater_than", "less_than").required(),
    value: _joi["default"].any().required()
  }).required()
}).optional();

// Form field schema
var formFieldSchema = _joi["default"].object({
  field_id: _joi["default"].string().trim().required(),
  label: _joi["default"].string().trim().required(),
  field_type: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_formConstants.FIELD_TYPE))).required(),
  placeholder: _joi["default"].string().trim().optional(),
  help_text: _joi["default"].string().trim().optional(),
  default_value: _joi["default"].any().optional(),
  options: _joi["default"].array().items(fieldOptionSchema).optional(),
  validation: fieldValidationSchema,
  conditional: fieldConditionalSchema,
  display_order: _joi["default"].number().integer().min(0)["default"](0),
  is_duplicate_check_field: _joi["default"]["boolean"]()["default"](false),
  is_identifier_field: _joi["default"]["boolean"]()["default"](false),
  metadata: _joi["default"].object().unknown(true)["default"]({})
});

// Duplicate detection schema
var duplicateDetectionSchema = _joi["default"].object({
  enabled: _joi["default"]["boolean"]()["default"](true),
  method: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_formConstants.DUPLICATE_CHECK_METHOD)))["default"](_formConstants.DUPLICATE_CHECK_METHOD.FIELD_SIMILARITY),
  threshold: _joi["default"].number().min(0).max(100)["default"](85),
  check_fields: _joi["default"].array().items(_joi["default"].string())["default"]([]),
  auto_flag: _joi["default"]["boolean"]()["default"](true)
}).optional();

// Multi-category nomination schema
var multiCategoryNominationSchema = _joi["default"].object({
  enabled: _joi["default"]["boolean"]()["default"](false),
  max_categories: _joi["default"].number().integer().min(1)["default"](3),
  require_same_nominee: _joi["default"]["boolean"]()["default"](true)
}).optional();

// Form settings schema
var formSettingsSchema = _joi["default"].object({
  allow_multiple_submissions: _joi["default"]["boolean"]()["default"](false),
  require_authentication: _joi["default"]["boolean"]()["default"](false),
  capture_ip: _joi["default"]["boolean"]()["default"](true),
  enable_captcha: _joi["default"]["boolean"]()["default"](true),
  auto_approve: _joi["default"]["boolean"]()["default"](false),
  send_confirmation_email: _joi["default"]["boolean"]()["default"](true),
  confirmation_email_template: _joi["default"].string().trim().optional(),
  redirect_url: _joi["default"].string().uri().optional(),
  custom_css: _joi["default"].string().optional()
}).optional();

// Submission limits schema
var submissionLimitsSchema = _joi["default"].object({
  max_submissions: _joi["default"].number().integer().min(0).optional(),
  max_submissions_per_user: _joi["default"].number().integer().min(1)["default"](1),
  max_submissions_per_ip: _joi["default"].number().integer().min(1)["default"](3),
  rate_limit: _joi["default"].object({
    window_minutes: _joi["default"].number().integer().min(1)["default"](60),
    max_requests: _joi["default"].number().integer().min(1)["default"](10)
  }).optional()
}).optional();

// Field mapping schema (for nomination forms)
var fieldMappingItemSchema = _joi["default"].object({
  form_field_id: _joi["default"].string().trim().required().messages({
    "string.empty": "Form field ID is required"
  }),
  candidate_field: _joi["default"].string().trim().required().messages({
    "string.empty": "Candidate field is required"
  }),
  transform: _joi["default"].string().valid("uppercase", "lowercase", "trim", "capitalize").optional()
});

// Candidate field mapping schema
var candidateFieldMappingSchema = _joi["default"].object({
  enabled: _joi["default"]["boolean"]()["default"](false),
  mappings: _joi["default"].array().items(fieldMappingItemSchema)["default"]([]),
  auto_create_candidate: _joi["default"]["boolean"]()["default"](true),
  send_welcome_email: _joi["default"]["boolean"]()["default"](true)
}).optional();
var FormValidation = /*#__PURE__*/function () {
  function FormValidation() {
    _classCallCheck(this, FormValidation);
  }
  return _createClass(FormValidation, null, [{
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
// ==================== FORM CRUD ====================
/**
 * Create form validation
 */
_defineProperty(FormValidation, "createFormSchema", _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200).required().messages({
    "string.empty": "Form name is required",
    "string.min": "Form name must be at least 3 characters",
    "string.max": "Form name cannot exceed 200 characters"
  }),
  description: _joi["default"].string().trim().max(2000).optional().messages({
    "string.max": "Description cannot exceed 2000 characters"
  }),
  slug: _joi["default"].string().lowercase().trim().optional(),
  form_type: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_formConstants.FORM_TYPE))).required().messages({
    "any.only": "Form type must be one of: ".concat(Object.values(_formConstants.FORM_TYPE).join(", ")),
    "string.empty": "Form type is required"
  }),
  event: ObjectId().required().messages({
    "string.empty": "Event ID is required"
  }),
  categories: _joi["default"].array().items(ObjectId())["default"]([]),
  fields: _joi["default"].array().items(formFieldSchema).min(1).required().messages({
    "array.min": "At least one field is required",
    "any.required": "Form fields are required"
  }),
  candidate_field_mapping: candidateFieldMappingSchema,
  duplicate_detection: duplicateDetectionSchema,
  multi_category_nomination: multiCategoryNominationSchema,
  settings: formSettingsSchema,
  submission_limits: submissionLimitsSchema,
  status: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_formConstants.FORM_STATUS)))["default"](_formConstants.FORM_STATUS.DRAFT),
  open_date: _joi["default"].date().optional(),
  close_date: _joi["default"].date().when("open_date", {
    is: _joi["default"].exist(),
    then: _joi["default"].date().greater(_joi["default"].ref("open_date")).messages({
      "date.greater": "Close date must be after open date"
    }),
    otherwise: _joi["default"].date()
  }).optional(),
  is_published: _joi["default"]["boolean"]()["default"](false)
}));
/**
 * Update form validation
 */
_defineProperty(FormValidation, "updateFormSchema", _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200).messages({
    "string.min": "Form name must be at least 3 characters",
    "string.max": "Form name cannot exceed 200 characters"
  }),
  description: _joi["default"].string().trim().max(2000).messages({
    "string.max": "Description cannot exceed 2000 characters"
  }),
  slug: _joi["default"].string().lowercase().trim(),
  form_type: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_formConstants.FORM_TYPE))).messages({
    "any.only": "Form type must be one of: ".concat(Object.values(_formConstants.FORM_TYPE).join(", "))
  }),
  categories: _joi["default"].array().items(ObjectId()),
  fields: _joi["default"].array().items(formFieldSchema).min(1).messages({
    "array.min": "At least one field is required"
  }),
  candidate_field_mapping: candidateFieldMappingSchema,
  duplicate_detection: duplicateDetectionSchema,
  multi_category_nomination: multiCategoryNominationSchema,
  settings: formSettingsSchema,
  submission_limits: submissionLimitsSchema,
  status: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_formConstants.FORM_STATUS))),
  open_date: _joi["default"].date(),
  close_date: _joi["default"].date(),
  is_published: _joi["default"]["boolean"]()
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
}));
// ==================== FIELD MAPPING ====================
/**
 * Update field mapping validation
 */
_defineProperty(FormValidation, "updateFieldMappingSchema", _joi["default"].object({
  mappings: _joi["default"].array().items(fieldMappingItemSchema).min(1).required().messages({
    "array.min": "At least one field mapping is required",
    "any.required": "Mappings are required"
  }),
  auto_create_candidate: _joi["default"]["boolean"]()["default"](true),
  send_welcome_email: _joi["default"]["boolean"]()["default"](true)
}));
// ==================== QUERY & PARAMETERS ====================
/**
 * Form ID parameter validation
 */
_defineProperty(FormValidation, "formIdSchema", _joi["default"].object({
  id: ObjectId().required().messages({
    "string.empty": "Form ID is required"
  })
}));
/**
 * Query parameters validation
 */
_defineProperty(FormValidation, "formQuerySchema", _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  event: ObjectId(),
  form_type: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_formConstants.FORM_TYPE))),
  status: (_Joi$string8 = _joi["default"].string()).valid.apply(_Joi$string8, _toConsumableArray(Object.values(_formConstants.FORM_STATUS))),
  is_published: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  sort: _joi["default"].string().valid("name", "total_submissions", "created_at", "-name", "-total_submissions", "-created_at")["default"]("-created_at")
}));
/**
 * Get forms by event validation
 */
_defineProperty(FormValidation, "getFormsByEventSchema", _joi["default"].object({
  eventId: ObjectId().required().messages({
    "string.empty": "Event ID is required"
  }),
  filters: _joi["default"].object({
    form_type: (_Joi$string9 = _joi["default"].string()).valid.apply(_Joi$string9, _toConsumableArray(Object.values(_formConstants.FORM_TYPE))),
    status: (_Joi$string0 = _joi["default"].string()).valid.apply(_Joi$string0, _toConsumableArray(Object.values(_formConstants.FORM_STATUS))),
    is_published: _joi["default"]["boolean"]()
  }).optional(),
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10)
}));
// ==================== STATUS MANAGEMENT ====================
/**
 * Update form status validation
 */
_defineProperty(FormValidation, "updateFormStatusSchema", _joi["default"].object({
  status: (_Joi$string1 = _joi["default"].string()).valid.apply(_Joi$string1, _toConsumableArray(Object.values(_formConstants.FORM_STATUS))).required().messages({
    "any.only": "Status must be one of: ".concat(Object.values(_formConstants.FORM_STATUS).join(", ")),
    "string.empty": "Status is required"
  })
}));
/**
 * Publish form validation
 */
_defineProperty(FormValidation, "publishFormSchema", _joi["default"].object({
  is_published: _joi["default"]["boolean"]().required().messages({
    "any.required": "is_published field is required"
  })
}));
var _default = exports["default"] = FormValidation;