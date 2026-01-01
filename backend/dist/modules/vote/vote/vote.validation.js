"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.voteQuerySchema = exports.voteIdSchema = exports.verifyVoteSchema = exports.updateVoteSchema = exports.refundVoteSchema = exports["default"] = exports.createVoteSchema = exports.bulkCreateVotesSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Vote module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Create vote validation
var createVoteSchema = exports.createVoteSchema = _joi["default"].object({
  candidate: ObjectId().required(),
  category: ObjectId().required(),
  event: ObjectId().required(),
  payment: ObjectId().required(),
  vote_code: _joi["default"].string().trim().required(),
  status: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_voteConstants.VOTE_STATUS)))["default"](_voteConstants.VOTE_STATUS.ACTIVE),
  ip_hash: _joi["default"].string().trim().optional(),
  user_agent: _joi["default"].string().trim().optional(),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  cast_at: _joi["default"].date()["default"](Date.now)
});

// Update vote validation
var updateVoteSchema = exports.updateVoteSchema = _joi["default"].object({
  status: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_voteConstants.VOTE_STATUS))),
  refund_reason: _joi["default"].string().trim().max(500),
  metadata: _joi["default"].object().unknown(true)
}).min(1);

// Vote ID parameter validation
var voteIdSchema = exports.voteIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var voteQuerySchema = exports.voteQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  event: ObjectId(),
  candidate: ObjectId(),
  category: ObjectId(),
  payment: ObjectId(),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_voteConstants.VOTE_STATUS))),
  vote_code: _joi["default"].string().trim(),
  cast_at_from: _joi["default"].date(),
  cast_at_to: _joi["default"].date(),
  sort: _joi["default"].string().valid("cast_at", "created_at", "-cast_at", "-created_at")["default"]("-cast_at")
});

// Refund vote validation
var refundVoteSchema = exports.refundVoteSchema = _joi["default"].object({
  refund_reason: _joi["default"].string().trim().min(10).max(500).required()
});

// Bulk create votes validation
var bulkCreateVotesSchema = exports.bulkCreateVotesSchema = _joi["default"].object({
  votes: _joi["default"].array().items(_joi["default"].object({
    candidate: ObjectId().required(),
    category: ObjectId().required(),
    event: ObjectId().required(),
    payment: ObjectId().required(),
    vote_code: _joi["default"].string().trim().required(),
    ip_hash: _joi["default"].string().trim().optional(),
    user_agent: _joi["default"].string().trim().optional()
  })).min(1).required()
});

// Verify vote validation
var verifyVoteSchema = exports.verifyVoteSchema = _joi["default"].object({
  vote_code: _joi["default"].string().trim().required(),
  candidate: ObjectId().optional()
});
var _default = exports["default"] = {
  createVoteSchema: createVoteSchema,
  updateVoteSchema: updateVoteSchema,
  voteIdSchema: voteIdSchema,
  voteQuerySchema: voteQuerySchema,
  refundVoteSchema: refundVoteSchema,
  bulkCreateVotesSchema: bulkCreateVotesSchema,
  verifyVoteSchema: verifyVoteSchema
};