"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateVotingDatesSchema = exports.updateResultsVisibilitySchema = exports.updateCategoryStatusSchema = exports.updateCategorySchema = exports.toggleVotingSchema = exports.removeCandidateSchema = exports.featureCategorySchema = exports["default"] = exports.createCategorySchema = exports.categoryQuerySchema = exports.categoryIdSchema = exports.addCandidateSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _categoryConstants = require("../../utils/constants/category.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Category module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Create category validation
var createCategorySchema = exports.createCategorySchema = _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200).required(),
  description: _joi["default"].string().trim().max(2000).optional(),
  icon: _joi["default"].string().uri().optional(),
  slug: _joi["default"].string().lowercase().trim().optional(),
  candidates: _joi["default"].array().items(ObjectId())["default"]([]),
  status: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_categoryConstants.STATUS)))["default"](_categoryConstants.STATUS.ACTIVE),
  event: ObjectId().required(),
  is_voting_open: _joi["default"]["boolean"]()["default"](false),
  voting_start_date: _joi["default"].date().optional(),
  voting_deadline: _joi["default"].date().when("voting_start_date", {
    is: _joi["default"].exist(),
    then: _joi["default"].date().greater(_joi["default"].ref("voting_start_date")),
    otherwise: _joi["default"].date()
  }).optional(),
  total_votes: _joi["default"].number().integer().min(0)["default"](0),
  min_candidates: _joi["default"].number().integer().min(1)["default"](2),
  max_candidates: _joi["default"].number().integer().min(_joi["default"].ref("min_candidates")).optional(),
  display_order: _joi["default"].number().integer().min(0)["default"](0),
  is_featured: _joi["default"]["boolean"]()["default"](false),
  voting_rules: _joi["default"].string().trim().max(1000).optional(),
  allow_write_in: _joi["default"]["boolean"]()["default"](false),
  require_authentication: _joi["default"]["boolean"]()["default"](true),
  results_visibility: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_categoryConstants.RESULTS_VISIBILITY)))["default"](_categoryConstants.RESULTS_VISIBILITY.PUBLIC)
});

// Update category validation
var updateCategorySchema = exports.updateCategorySchema = _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200),
  description: _joi["default"].string().trim().max(2000),
  icon: _joi["default"].string().uri(),
  slug: _joi["default"].string().lowercase().trim(),
  candidates: _joi["default"].array().items(ObjectId()),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_categoryConstants.STATUS))),
  is_voting_open: _joi["default"]["boolean"](),
  voting_start_date: _joi["default"].date(),
  voting_deadline: _joi["default"].date(),
  total_votes: _joi["default"].number().integer().min(0),
  min_candidates: _joi["default"].number().integer().min(1),
  max_candidates: _joi["default"].number().integer().min(1),
  display_order: _joi["default"].number().integer().min(0),
  is_featured: _joi["default"]["boolean"](),
  voting_rules: _joi["default"].string().trim().max(1000),
  allow_write_in: _joi["default"]["boolean"](),
  require_authentication: _joi["default"]["boolean"](),
  results_visibility: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_categoryConstants.RESULTS_VISIBILITY)))
}).min(1);

// Category ID parameter validation
var categoryIdSchema = exports.categoryIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var categoryQuerySchema = exports.categoryQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  event: ObjectId(),
  status: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_categoryConstants.STATUS))),
  is_voting_open: _joi["default"]["boolean"](),
  is_featured: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  sort: _joi["default"].string().valid("name", "display_order", "total_votes", "voting_deadline", "created_at", "-name", "-display_order", "-total_votes", "-voting_deadline", "-created_at")["default"]("display_order")
});

// Add candidate to category validation
var addCandidateSchema = exports.addCandidateSchema = _joi["default"].object({
  candidate_id: ObjectId().required()
});

// Remove candidate from category validation
var removeCandidateSchema = exports.removeCandidateSchema = _joi["default"].object({
  candidate_id: ObjectId().required()
});

// Open/Close voting validation
var toggleVotingSchema = exports.toggleVotingSchema = _joi["default"].object({
  is_voting_open: _joi["default"]["boolean"]().required()
});

// Update category status validation
var updateCategoryStatusSchema = exports.updateCategoryStatusSchema = _joi["default"].object({
  status: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_categoryConstants.STATUS))).required()
});

// Feature category validation
var featureCategorySchema = exports.featureCategorySchema = _joi["default"].object({
  is_featured: _joi["default"]["boolean"]().required()
});

// Update results visibility validation
var updateResultsVisibilitySchema = exports.updateResultsVisibilitySchema = _joi["default"].object({
  results_visibility: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_categoryConstants.RESULTS_VISIBILITY))).required()
});

// Update voting dates validation
var updateVotingDatesSchema = exports.updateVotingDatesSchema = _joi["default"].object({
  voting_start_date: _joi["default"].date().required(),
  voting_deadline: _joi["default"].date().greater(_joi["default"].ref("voting_start_date")).required()
});
var _default = exports["default"] = {
  createCategorySchema: createCategorySchema,
  updateCategorySchema: updateCategorySchema,
  categoryIdSchema: categoryIdSchema,
  categoryQuerySchema: categoryQuerySchema,
  addCandidateSchema: addCandidateSchema,
  removeCandidateSchema: removeCandidateSchema,
  toggleVotingSchema: toggleVotingSchema,
  updateCategoryStatusSchema: updateCategoryStatusSchema,
  featureCategorySchema: featureCategorySchema,
  updateResultsVisibilitySchema: updateResultsVisibilitySchema,
  updateVotingDatesSchema: updateVotingDatesSchema
};