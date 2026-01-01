"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSubmissionStatusSchema = exports.updateSubmissionSchema = exports.submissionQuerySchema = exports.submissionIdSchema = exports.rejectSubmissionSchema = exports.markAsDuplicateSchema = exports["default"] = exports.createSubmissionSchema = exports.approveSubmissionSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _formConstants = require("../../utils/constants/form.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Form Submission module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Attachment schema
var attachmentSchema = _joi["default"].object({
  field_id: _joi["default"].string().required(),
  filename: _joi["default"].string().trim().required(),
  url: _joi["default"].string().uri().required(),
  size: _joi["default"].number().integer().min(0).optional(),
  mime_type: _joi["default"].string().trim().optional(),
  uploaded_at: _joi["default"].date()["default"](Date.now)
});

// Duplicate check result schema
var duplicateCheckSchema = _joi["default"].object({
  is_duplicate: _joi["default"]["boolean"]()["default"](false),
  similarity_score: _joi["default"].number().min(0).max(100)["default"](0),
  matched_submissions: _joi["default"].array().items(_joi["default"].object({
    submission_id: ObjectId().required(),
    similarity: _joi["default"].number().min(0).max(100).required(),
    matched_fields: _joi["default"].array().items(_joi["default"].string())["default"]([])
  }))["default"]([]),
  checked_at: _joi["default"].date()["default"](Date.now)
}).optional();

// Approval schema
var approvalSchema = _joi["default"].object({
  reviewed_by: ObjectId().optional(),
  reviewed_at: _joi["default"].date()["default"](Date.now),
  review_notes: _joi["default"].string().trim().max(1000).optional(),
  rejection_reason: _joi["default"].string().trim().max(500).optional()
}).optional();

// Create form submission validation
var createSubmissionSchema = exports.createSubmissionSchema = _joi["default"].object({
  form: ObjectId().required(),
  event: ObjectId().required(),
  categories: _joi["default"].array().items(ObjectId())["default"]([]),
  submission_data: _joi["default"].object().required(),
  normalized_data: _joi["default"].object()["default"]({}),
  status: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_formConstants.SUBMISSION_STATUS)))["default"](_formConstants.SUBMISSION_STATUS.PENDING),
  submitted_by: ObjectId().optional(),
  ip_address: _joi["default"].string().trim().optional(),
  ip_hash: _joi["default"].string().trim().optional(),
  user_agent: _joi["default"].string().trim().optional(),
  session_id: _joi["default"].string().trim().optional(),
  duplicate_check: duplicateCheckSchema,
  nominee_identifier: _joi["default"].string().trim().optional(),
  attachments: _joi["default"].array().items(attachmentSchema)["default"]([]),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  confirmation_sent: _joi["default"]["boolean"]()["default"](false)
});

// Update submission validation
var updateSubmissionSchema = exports.updateSubmissionSchema = _joi["default"].object({
  submission_data: _joi["default"].object(),
  normalized_data: _joi["default"].object(),
  status: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_formConstants.SUBMISSION_STATUS))),
  duplicate_check: duplicateCheckSchema,
  nominee_identifier: _joi["default"].string().trim(),
  approval: approvalSchema,
  candidate: ObjectId(),
  attachments: _joi["default"].array().items(attachmentSchema),
  metadata: _joi["default"].object().unknown(true),
  confirmation_sent: _joi["default"]["boolean"](),
  confirmation_sent_at: _joi["default"].date()
}).min(1);

// Submission ID parameter validation
var submissionIdSchema = exports.submissionIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var submissionQuerySchema = exports.submissionQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  form: ObjectId(),
  event: ObjectId(),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_formConstants.SUBMISSION_STATUS))),
  is_duplicate: _joi["default"]["boolean"](),
  submitted_by: ObjectId(),
  nominee_identifier: _joi["default"].string().trim(),
  search: _joi["default"].string().trim().max(100),
  created_at_from: _joi["default"].date(),
  created_at_to: _joi["default"].date(),
  sort: _joi["default"].string().valid("created_at", "status", "-created_at", "-status")["default"]("-created_at")
});

// Approve submission validation
var approveSubmissionSchema = exports.approveSubmissionSchema = _joi["default"].object({
  reviewed_by: ObjectId().required(),
  review_notes: _joi["default"].string().trim().max(1000).optional(),
  candidate_id: ObjectId().optional()
});

// Reject submission validation
var rejectSubmissionSchema = exports.rejectSubmissionSchema = _joi["default"].object({
  reviewed_by: ObjectId().required(),
  rejection_reason: _joi["default"].string().trim().min(10).max(500).required(),
  review_notes: _joi["default"].string().trim().max(1000).optional()
});

// Update submission status validation
var updateSubmissionStatusSchema = exports.updateSubmissionStatusSchema = _joi["default"].object({
  status: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_formConstants.SUBMISSION_STATUS))).required(),
  reviewed_by: ObjectId().when("status", {
    is: _joi["default"].valid(_formConstants.SUBMISSION_STATUS.APPROVED, _formConstants.SUBMISSION_STATUS.REJECTED),
    then: _joi["default"].required(),
    otherwise: _joi["default"].forbidden()
  }),
  rejection_reason: _joi["default"].when("status", {
    is: _formConstants.SUBMISSION_STATUS.REJECTED,
    then: _joi["default"].string().trim().min(10).max(500).required(),
    otherwise: _joi["default"].forbidden()
  }),
  review_notes: _joi["default"].string().trim().max(1000).optional()
});

// Mark as duplicate validation
var markAsDuplicateSchema = exports.markAsDuplicateSchema = _joi["default"].object({
  is_duplicate: _joi["default"]["boolean"]().required(),
  matched_submission_id: ObjectId().optional(),
  similarity_score: _joi["default"].number().min(0).max(100).optional()
});
var _default = exports["default"] = {
  createSubmissionSchema: createSubmissionSchema,
  updateSubmissionSchema: updateSubmissionSchema,
  submissionIdSchema: submissionIdSchema,
  submissionQuerySchema: submissionQuerySchema,
  approveSubmissionSchema: approveSubmissionSchema,
  rejectSubmissionSchema: rejectSubmissionSchema,
  updateSubmissionStatusSchema: updateSubmissionStatusSchema,
  markAsDuplicateSchema: markAsDuplicateSchema
};