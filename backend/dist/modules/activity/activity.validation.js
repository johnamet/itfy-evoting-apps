"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logVoteActivitySchema = exports.logAuthActivitySchema = exports.getUserActivitySchema = exports.getSecurityEventsSchema = exports.getEventActivitySchema = exports.getEntityActivitySchema = exports["default"] = exports.createActivitySchema = exports.activityQuerySchema = exports.activityIdSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _activityConstants = require("../../utils/constants/activity.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7, _Joi$string8, _Joi$string9, _Joi$string0;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Activity module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Create activity validation
var createActivitySchema = exports.createActivitySchema = _joi["default"].object({
  user: ObjectId().optional(),
  action: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_activityConstants.ACTION_TYPE))).required(),
  entity_type: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_activityConstants.ENTITY_TYPE))).required(),
  entity_id: ObjectId().optional(),
  event: ObjectId().optional(),
  description: _joi["default"].string().trim().required(),
  severity: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_activityConstants.SEVERITY)))["default"](_activityConstants.SEVERITY.INFO),
  ip_address: _joi["default"].string().trim().optional(),
  user_agent: _joi["default"].string().trim().optional(),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  changes: _joi["default"].object({
    before: _joi["default"].any().optional(),
    after: _joi["default"].any().optional()
  }).optional(),
  session_id: _joi["default"].string().trim().optional(),
  timestamp: _joi["default"].date()["default"](Date.now)
});

// Activity ID parameter validation
var activityIdSchema = exports.activityIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var activityQuerySchema = exports.activityQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  user: ObjectId(),
  action: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_activityConstants.ACTION_TYPE))),
  entity_type: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_activityConstants.ENTITY_TYPE))),
  entity_id: ObjectId(),
  event: ObjectId(),
  severity: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_activityConstants.SEVERITY))),
  session_id: _joi["default"].string().trim(),
  ip_address: _joi["default"].string().trim(),
  timestamp_from: _joi["default"].date(),
  timestamp_to: _joi["default"].date(),
  sort: _joi["default"].string().valid("timestamp", "action", "severity", "-timestamp", "-action", "-severity")["default"]("-timestamp")
});

// Get user activity validation
var getUserActivitySchema = exports.getUserActivitySchema = _joi["default"].object({
  user_id: ObjectId().required(),
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  action: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_activityConstants.ACTION_TYPE))).optional(),
  timestamp_from: _joi["default"].date().optional(),
  timestamp_to: _joi["default"].date().optional()
});

// Get event activity validation
var getEventActivitySchema = exports.getEventActivitySchema = _joi["default"].object({
  event_id: ObjectId().required(),
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  action: (_Joi$string8 = _joi["default"].string()).valid.apply(_Joi$string8, _toConsumableArray(Object.values(_activityConstants.ACTION_TYPE))).optional(),
  severity: (_Joi$string9 = _joi["default"].string()).valid.apply(_Joi$string9, _toConsumableArray(Object.values(_activityConstants.SEVERITY))).optional()
});

// Get entity activity validation
var getEntityActivitySchema = exports.getEntityActivitySchema = _joi["default"].object({
  entity_type: (_Joi$string0 = _joi["default"].string()).valid.apply(_Joi$string0, _toConsumableArray(Object.values(_activityConstants.ENTITY_TYPE))).required(),
  entity_id: ObjectId().required(),
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10)
});

// Get security events validation
var getSecurityEventsSchema = exports.getSecurityEventsSchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  timestamp_from: _joi["default"].date().optional(),
  timestamp_to: _joi["default"].date().optional()
});

// Log authentication activity validation
var logAuthActivitySchema = exports.logAuthActivitySchema = _joi["default"].object({
  user_id: ObjectId().required(),
  action: _joi["default"].string().valid(_activityConstants.ACTION_TYPE.LOGIN, _activityConstants.ACTION_TYPE.LOGOUT, _activityConstants.ACTION_TYPE.FAILED_LOGIN, _activityConstants.ACTION_TYPE.PASSWORD_RESET).required(),
  ip_address: _joi["default"].string().trim().required(),
  user_agent: _joi["default"].string().trim().optional(),
  success: _joi["default"]["boolean"]().required(),
  metadata: _joi["default"].object().unknown(true).optional()
});

// Log vote activity validation
var logVoteActivitySchema = exports.logVoteActivitySchema = _joi["default"].object({
  user_id: ObjectId().optional(),
  vote_id: ObjectId().required(),
  event_id: ObjectId().required(),
  ip_address: _joi["default"].string().trim().optional(),
  metadata: _joi["default"].object().unknown(true).optional()
});
var _default = exports["default"] = {
  createActivitySchema: createActivitySchema,
  activityIdSchema: activityIdSchema,
  activityQuerySchema: activityQuerySchema,
  getUserActivitySchema: getUserActivitySchema,
  getEventActivitySchema: getEventActivitySchema,
  getEntityActivitySchema: getEntityActivitySchema,
  getSecurityEventsSchema: getSecurityEventsSchema,
  logAuthActivitySchema: logAuthActivitySchema,
  logVoteActivitySchema: logVoteActivitySchema
};