"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotificationSchema = exports.sendNotificationSchema = exports.notificationQuerySchema = exports.notificationIdSchema = exports.markAsReadSchema = exports.markAsClickedSchema = exports["default"] = exports.createNotificationSchema = exports.bulkMarkAsReadSchema = exports.bulkCreateNotificationsSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _notificationConstants = require("../../utils/constants/notification.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7, _Joi$string8, _Joi$string9, _Joi$string0, _Joi$string1, _Joi$string10, _Joi$string11;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Notification module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Create notification validation
var createNotificationSchema = exports.createNotificationSchema = _joi["default"].object({
  user: ObjectId().required(),
  type: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_TYPE))).required(),
  title: _joi["default"].string().trim().max(200).required(),
  message: _joi["default"].string().trim().max(1000).required(),
  channel: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_CHANNEL)))["default"](_notificationConstants.NOTIFICATION_CHANNEL.IN_APP),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_STATUS)))["default"](_notificationConstants.NOTIFICATION_STATUS.PENDING),
  priority: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_PRIORITY)))["default"](_notificationConstants.NOTIFICATION_PRIORITY.NORMAL),
  event: ObjectId().optional(),
  candidate: ObjectId().optional(),
  category: ObjectId().optional(),
  vote: ObjectId().optional(),
  payment: ObjectId().optional(),
  form: ObjectId().optional(),
  submission: ObjectId().optional(),
  action_url: _joi["default"].string().trim().pattern(/^\/[a-zA-Z0-9\-_\/]*$/).optional(),
  action_text: _joi["default"].string().trim().max(50).optional(),
  metadata: _joi["default"].object().unknown(true)["default"]({}),
  email_to: _joi["default"].string().trim().lowercase().email().optional(),
  email_subject: _joi["default"].string().trim().optional(),
  email_template_id: _joi["default"].string().trim().optional(),
  sms_to: _joi["default"].string().trim().optional(),
  batch_id: _joi["default"].string().trim().optional(),
  max_retries: _joi["default"].number().integer().min(0)["default"](3),
  expires_at: _joi["default"].date().optional()
});

// Update notification validation
var updateNotificationSchema = exports.updateNotificationSchema = _joi["default"].object({
  status: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_STATUS))),
  priority: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_PRIORITY))),
  sent_at: _joi["default"].date(),
  read_at: _joi["default"].date(),
  clicked_at: _joi["default"].date(),
  email_provider_id: _joi["default"].string().trim(),
  sms_provider_id: _joi["default"].string().trim(),
  error_message: _joi["default"].string().trim(),
  retry_count: _joi["default"].number().integer().min(0),
  next_retry_at: _joi["default"].date(),
  metadata: _joi["default"].object().unknown(true)
}).min(1);

// Notification ID parameter validation
var notificationIdSchema = exports.notificationIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var notificationQuerySchema = exports.notificationQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  user: ObjectId(),
  type: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_TYPE))),
  channel: (_Joi$string8 = _joi["default"].string()).valid.apply(_Joi$string8, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_CHANNEL))),
  status: (_Joi$string9 = _joi["default"].string()).valid.apply(_Joi$string9, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_STATUS))),
  priority: (_Joi$string0 = _joi["default"].string()).valid.apply(_Joi$string0, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_PRIORITY))),
  event: ObjectId(),
  batch_id: _joi["default"].string().trim(),
  is_read: _joi["default"]["boolean"](),
  created_at_from: _joi["default"].date(),
  created_at_to: _joi["default"].date(),
  sort: _joi["default"].string().valid("created_at", "sent_at", "priority", "-created_at", "-sent_at", "-priority")["default"]("-created_at")
});

// Mark as read validation
var markAsReadSchema = exports.markAsReadSchema = _joi["default"].object({
  read_at: _joi["default"].date()["default"](Date.now)
});

// Mark as clicked validation
var markAsClickedSchema = exports.markAsClickedSchema = _joi["default"].object({
  clicked_at: _joi["default"].date()["default"](Date.now)
});

// Bulk mark as read validation
var bulkMarkAsReadSchema = exports.bulkMarkAsReadSchema = _joi["default"].object({
  notification_ids: _joi["default"].array().items(ObjectId()).min(1).required()
});

// Send notification validation
var sendNotificationSchema = exports.sendNotificationSchema = _joi["default"].object({
  notification_id: ObjectId().required(),
  force_resend: _joi["default"]["boolean"]()["default"](false)
});

// Bulk create notifications validation
var bulkCreateNotificationsSchema = exports.bulkCreateNotificationsSchema = _joi["default"].object({
  user_ids: _joi["default"].array().items(ObjectId()).min(1).required(),
  type: (_Joi$string1 = _joi["default"].string()).valid.apply(_Joi$string1, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_TYPE))).required(),
  title: _joi["default"].string().trim().max(200).required(),
  message: _joi["default"].string().trim().max(1000).required(),
  channel: (_Joi$string10 = _joi["default"].string()).valid.apply(_Joi$string10, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_CHANNEL)))["default"](_notificationConstants.NOTIFICATION_CHANNEL.IN_APP),
  priority: (_Joi$string11 = _joi["default"].string()).valid.apply(_Joi$string11, _toConsumableArray(Object.values(_notificationConstants.NOTIFICATION_PRIORITY)))["default"](_notificationConstants.NOTIFICATION_PRIORITY.NORMAL),
  event: ObjectId().optional(),
  action_url: _joi["default"].string().trim().pattern(/^\/[a-zA-Z0-9\-_\/]*$/).optional(),
  action_text: _joi["default"].string().trim().max(50).optional(),
  metadata: _joi["default"].object().unknown(true).optional()
});
var _default = exports["default"] = {
  createNotificationSchema: createNotificationSchema,
  updateNotificationSchema: updateNotificationSchema,
  notificationIdSchema: notificationIdSchema,
  notificationQuerySchema: notificationQuerySchema,
  markAsReadSchema: markAsReadSchema,
  markAsClickedSchema: markAsClickedSchema,
  bulkMarkAsReadSchema: bulkMarkAsReadSchema,
  sendNotificationSchema: sendNotificationSchema,
  bulkCreateNotificationsSchema: bulkCreateNotificationsSchema
};