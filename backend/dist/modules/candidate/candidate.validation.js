"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _candidateConstants = require("../../utils/constants/candidate.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Candidate Validation Schemas
 * Validates all candidate-related requests for profile management and admin operations
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Reusable sub-schemas
var projectSchema = _joi["default"].object({
  title: _joi["default"].string().trim().required(),
  description: _joi["default"].string().trim().optional(),
  url: _joi["default"].string().uri().optional(),
  image: _joi["default"].string().uri().optional(),
  date: _joi["default"].date().optional()
});
var educationSchema = _joi["default"].object({
  institution: _joi["default"].string().trim().required(),
  qualification: _joi["default"].string().trim().required(),
  field: _joi["default"].string().trim().optional(),
  start_date: _joi["default"].date().optional(),
  end_date: _joi["default"].date().optional(),
  current: _joi["default"]["boolean"]()["default"](false),
  description: _joi["default"].string().trim().optional()
});
var experienceSchema = _joi["default"].object({
  company: _joi["default"].string().trim().required(),
  position: _joi["default"].string().trim().required(),
  start_date: _joi["default"].date().optional(),
  end_date: _joi["default"].date().optional(),
  current: _joi["default"]["boolean"]()["default"](false),
  description: _joi["default"].string().trim().optional()
});
var achievementSchema = _joi["default"].object({
  title: _joi["default"].string().trim().required(),
  description: _joi["default"].string().trim().optional(),
  date: _joi["default"].date().optional(),
  organization: _joi["default"].string().trim().optional()
});
var endorsementSchema = _joi["default"].object({
  name: _joi["default"].string().trim().required(),
  position: _joi["default"].string().trim().optional(),
  message: _joi["default"].string().trim().optional(),
  image: _joi["default"].string().uri().optional()
});
var socialLinksSchema = _joi["default"].object({
  linkedin: _joi["default"].string().uri().optional(),
  twitter: _joi["default"].string().uri().optional(),
  github: _joi["default"].string().uri().optional(),
  portfolio: _joi["default"].string().uri().optional(),
  facebook: _joi["default"].string().uri().optional(),
  instagram: _joi["default"].string().uri().optional()
}).optional();
var CandidateValidation = /*#__PURE__*/function () {
  function CandidateValidation() {
    _classCallCheck(this, CandidateValidation);
  }
  return _createClass(CandidateValidation, null, [{
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
// ==================== CANDIDATE CREATION ====================
/**
 * Create candidate validation (admin)
 */
_defineProperty(CandidateValidation, "createCandidateSchema", _joi["default"].object({
  first_name: _joi["default"].string().trim().min(2).max(100).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters"
  }),
  last_name: _joi["default"].string().trim().min(2).max(100).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters"
  }),
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  phone_number: _joi["default"].string().trim().optional(),
  slug: _joi["default"].string().lowercase().trim().optional(),
  bio: _joi["default"].string().trim().max(2000).optional().messages({
    "string.max": "Bio cannot exceed 2000 characters"
  }),
  profile_image: _joi["default"].string().uri().optional(),
  cover_image: _joi["default"].string().uri().optional(),
  gallery: _joi["default"].array().items(_joi["default"].string().uri())["default"]([]),
  video_url: _joi["default"].string().uri().optional(),
  projects: _joi["default"].array().items(projectSchema)["default"]([]),
  skills: _joi["default"].array().items(_joi["default"].string().trim())["default"]([]),
  education: _joi["default"].array().items(educationSchema)["default"]([]),
  experience: _joi["default"].array().items(experienceSchema)["default"]([]),
  achievements: _joi["default"].array().items(achievementSchema)["default"]([]),
  social_links: socialLinksSchema,
  event: ObjectId().required().messages({
    "string.empty": "Event ID is required"
  }),
  categories: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one category is required",
    "any.required": "Categories are required"
  }),
  status: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_candidateConstants.STATUS)))["default"](_candidateConstants.STATUS.PENDING),
  is_featured: _joi["default"]["boolean"]()["default"](false),
  is_published: _joi["default"]["boolean"]()["default"](false),
  display_order: _joi["default"].number().integer().min(0)["default"](0),
  vote_count: _joi["default"].number().integer().min(0)["default"](0),
  view_count: _joi["default"].number().integer().min(0)["default"](0),
  why_nominate_me: _joi["default"].string().trim().max(1000).optional().messages({
    "string.max": "Why nominate me cannot exceed 1000 characters"
  }),
  impact_statement: _joi["default"].string().trim().max(1000).optional().messages({
    "string.max": "Impact statement cannot exceed 1000 characters"
  }),
  endorsements: _joi["default"].array().items(endorsementSchema)["default"]([]),
  nomination_date: _joi["default"].date()["default"](Date.now),
  tags: _joi["default"].array().items(_joi["default"].string().trim())["default"]([]),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional()
}));
// ==================== PROFILE UPDATE ====================
/**
 * Update candidate profile validation (candidate self-update)
 * Excludes admin-only fields
 */
_defineProperty(CandidateValidation, "updateProfileSchema", _joi["default"].object({
  first_name: _joi["default"].string().trim().min(2).max(100).messages({
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters"
  }),
  last_name: _joi["default"].string().trim().min(2).max(100).messages({
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters"
  }),
  phone_number: _joi["default"].string().trim(),
  bio: _joi["default"].string().trim().max(2000).messages({
    "string.max": "Bio cannot exceed 2000 characters"
  }),
  profile_image: _joi["default"].string().uri(),
  cover_image: _joi["default"].string().uri(),
  gallery: _joi["default"].array().items(_joi["default"].string().uri()),
  video_url: _joi["default"].string().uri(),
  projects: _joi["default"].array().items(projectSchema),
  skills: _joi["default"].array().items(_joi["default"].string().trim()),
  education: _joi["default"].array().items(educationSchema),
  experience: _joi["default"].array().items(experienceSchema),
  achievements: _joi["default"].array().items(achievementSchema),
  social_links: socialLinksSchema,
  why_nominate_me: _joi["default"].string().trim().max(1000).messages({
    "string.max": "Why nominate me cannot exceed 1000 characters"
  }),
  impact_statement: _joi["default"].string().trim().max(1000).messages({
    "string.max": "Impact statement cannot exceed 1000 characters"
  }),
  endorsements: _joi["default"].array().items(endorsementSchema),
  tags: _joi["default"].array().items(_joi["default"].string().trim())
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
}));
/**
 * Complete pending profile validation (candidate from nomination)
 */
_defineProperty(CandidateValidation, "completePendingProfileSchema", _joi["default"].object({
  first_name: _joi["default"].string().trim().min(2).max(100).messages({
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters"
  }),
  last_name: _joi["default"].string().trim().min(2).max(100).messages({
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters"
  }),
  phone_number: _joi["default"].string().trim(),
  bio: _joi["default"].string().trim().max(2000).required().messages({
    "string.empty": "Bio is required to complete your profile",
    "string.max": "Bio cannot exceed 2000 characters"
  }),
  profile_image: _joi["default"].string().uri(),
  cover_image: _joi["default"].string().uri(),
  gallery: _joi["default"].array().items(_joi["default"].string().uri()),
  video_url: _joi["default"].string().uri(),
  projects: _joi["default"].array().items(projectSchema),
  skills: _joi["default"].array().items(_joi["default"].string().trim()),
  education: _joi["default"].array().items(educationSchema),
  experience: _joi["default"].array().items(experienceSchema),
  achievements: _joi["default"].array().items(achievementSchema),
  social_links: socialLinksSchema,
  why_nominate_me: _joi["default"].string().trim().max(1000).messages({
    "string.max": "Why nominate me cannot exceed 1000 characters"
  }),
  impact_statement: _joi["default"].string().trim().max(1000).messages({
    "string.max": "Impact statement cannot exceed 1000 characters"
  }),
  endorsements: _joi["default"].array().items(endorsementSchema),
  tags: _joi["default"].array().items(_joi["default"].string().trim())
}));
/**
 * Update candidate validation (admin)
 * Can update all fields including admin-only fields
 */
_defineProperty(CandidateValidation, "updateCandidateSchema", _joi["default"].object({
  first_name: _joi["default"].string().trim().min(2).max(100).messages({
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters"
  }),
  last_name: _joi["default"].string().trim().min(2).max(100).messages({
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters"
  }),
  email: _joi["default"].string().trim().lowercase().email().messages({
    "string.email": "Email must be a valid email address"
  }),
  phone_number: _joi["default"].string().trim(),
  slug: _joi["default"].string().lowercase().trim(),
  bio: _joi["default"].string().trim().max(2000).messages({
    "string.max": "Bio cannot exceed 2000 characters"
  }),
  profile_image: _joi["default"].string().uri(),
  cover_image: _joi["default"].string().uri(),
  gallery: _joi["default"].array().items(_joi["default"].string().uri()),
  video_url: _joi["default"].string().uri(),
  projects: _joi["default"].array().items(projectSchema),
  skills: _joi["default"].array().items(_joi["default"].string().trim()),
  education: _joi["default"].array().items(educationSchema),
  experience: _joi["default"].array().items(experienceSchema),
  achievements: _joi["default"].array().items(achievementSchema),
  social_links: socialLinksSchema,
  categories: _joi["default"].array().items(ObjectId()).min(1).messages({
    "array.min": "At least one category is required"
  }),
  status: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_candidateConstants.STATUS))),
  is_featured: _joi["default"]["boolean"](),
  is_published: _joi["default"]["boolean"](),
  display_order: _joi["default"].number().integer().min(0),
  vote_count: _joi["default"].number().integer().min(0),
  view_count: _joi["default"].number().integer().min(0),
  why_nominate_me: _joi["default"].string().trim().max(1000).messages({
    "string.max": "Why nominate me cannot exceed 1000 characters"
  }),
  impact_statement: _joi["default"].string().trim().max(1000).messages({
    "string.max": "Impact statement cannot exceed 1000 characters"
  }),
  endorsements: _joi["default"].array().items(endorsementSchema),
  tags: _joi["default"].array().items(_joi["default"].string().trim()),
  metadata: _joi["default"].object().unknown(true),
  updated_by: ObjectId()
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
}));
// ==================== CATEGORY MANAGEMENT ====================
/**
 * Add category validation
 */
_defineProperty(CandidateValidation, "addCategorySchema", _joi["default"].object({
  categoryId: ObjectId().required().messages({
    "string.empty": "Category ID is required"
  })
}));
/**
 * Update admin verified categories validation
 */
_defineProperty(CandidateValidation, "updateAdminVerifiedCategoriesSchema", _joi["default"].object({
  categoryIds: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one category is required",
    "any.required": "Category IDs are required"
  })
}));
// ==================== ADMIN OPERATIONS ====================
/**
 * Candidate ID parameter validation
 */
_defineProperty(CandidateValidation, "candidateIdSchema", _joi["default"].object({
  id: ObjectId().required().messages({
    "string.empty": "Candidate ID is required"
  })
}));
/**
 * Query parameters validation
 */
_defineProperty(CandidateValidation, "candidateQuerySchema", _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  event: ObjectId(),
  category: ObjectId(),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_candidateConstants.STATUS))),
  is_featured: _joi["default"]["boolean"](),
  is_published: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  tags: _joi["default"].alternatives()["try"](_joi["default"].string().trim(), _joi["default"].array().items(_joi["default"].string().trim())),
  sort: _joi["default"].string().valid("first_name", "last_name", "vote_count", "view_count", "nomination_date", "created_at", "-first_name", "-last_name", "-vote_count", "-view_count", "-nomination_date", "-created_at")["default"]("-created_at")
}));
/**
 * Approve candidate validation
 */
_defineProperty(CandidateValidation, "approveCandidateSchema", _joi["default"].object({
  approval_date: _joi["default"].date()["default"](Date.now)
}));
/**
 * Reject candidate validation
 */
_defineProperty(CandidateValidation, "rejectCandidateSchema", _joi["default"].object({
  reason: _joi["default"].string().trim().min(10).max(500).required().messages({
    "string.empty": "Rejection reason is required",
    "string.min": "Rejection reason must be at least 10 characters",
    "string.max": "Rejection reason cannot exceed 500 characters"
  })
}));
/**
 * Update candidate status validation
 */
_defineProperty(CandidateValidation, "updateCandidateStatusSchema", _joi["default"].object({
  status: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_candidateConstants.STATUS))).required().messages({
    "any.only": "Status must be one of: ".concat(Object.values(_candidateConstants.STATUS).join(", ")),
    "string.empty": "Status is required"
  }),
  rejection_reason: _joi["default"].when("status", {
    is: _candidateConstants.STATUS.REJECTED,
    then: _joi["default"].string().trim().min(10).max(500).required().messages({
      "string.empty": "Rejection reason is required when rejecting",
      "string.min": "Rejection reason must be at least 10 characters",
      "string.max": "Rejection reason cannot exceed 500 characters"
    }),
    otherwise: _joi["default"].forbidden()
  })
}));
/**
 * Increment vote count validation
 */
_defineProperty(CandidateValidation, "incrementVoteCountSchema", _joi["default"].object({
  increment: _joi["default"].number().integer().min(1)["default"](1).messages({
    "number.min": "Increment must be at least 1"
  })
}));
/**
 * Feature candidate validation
 */
_defineProperty(CandidateValidation, "featureCandidateSchema", _joi["default"].object({
  is_featured: _joi["default"]["boolean"]().required().messages({
    "any.required": "is_featured field is required"
  })
}));
/**
 * Publish candidate validation
 */
_defineProperty(CandidateValidation, "publishCandidateSchema", _joi["default"].object({
  is_published: _joi["default"]["boolean"]().required().messages({
    "any.required": "is_published field is required"
  })
}));
// ==================== NOMINATION WORKFLOW ====================
/**
 * Create from nomination validation
 */
_defineProperty(CandidateValidation, "createFromNominationSchema", _joi["default"].object({
  first_name: _joi["default"].string().trim().min(2).max(100).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 100 characters"
  }),
  last_name: _joi["default"].string().trim().min(2).max(100).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 100 characters"
  }),
  email: _joi["default"].string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  phone_number: _joi["default"].string().trim().optional(),
  bio: _joi["default"].string().trim().max(2000).optional(),
  profile_image: _joi["default"].string().uri().optional(),
  social_links: socialLinksSchema
}));
/**
 * Event and category IDs for nomination
 */
_defineProperty(CandidateValidation, "nominationContextSchema", _joi["default"].object({
  eventId: ObjectId().required().messages({
    "string.empty": "Event ID is required"
  }),
  categoryIds: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one category is required",
    "any.required": "Category IDs are required"
  }),
  submissionId: ObjectId().required().messages({
    "string.empty": "Submission ID is required"
  }),
  adminId: ObjectId().optional()
}));
// ==================== SEARCH ====================
/**
 * Search candidates validation
 */
_defineProperty(CandidateValidation, "searchSchema", _joi["default"].object({
  query: _joi["default"].string().trim().min(1).max(100).required().messages({
    "string.empty": "Search query is required",
    "string.min": "Search query must be at least 1 character",
    "string.max": "Search query cannot exceed 100 characters"
  }),
  filters: _joi["default"].object({
    event: ObjectId(),
    category: ObjectId(),
    status: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_candidateConstants.STATUS))),
    is_featured: _joi["default"]["boolean"](),
    is_published: _joi["default"]["boolean"]()
  }).optional(),
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](20)
}));
var _default = exports["default"] = CandidateValidation;