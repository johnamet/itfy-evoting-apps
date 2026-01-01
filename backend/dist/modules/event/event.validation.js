"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEventStatusSchema = exports.updateEventSchema = exports.updateAttendeesSchema = exports.removeCategorySchema = exports.publishEventSchema = exports.featureEventSchema = exports.eventQuerySchema = exports.eventIdSchema = exports["default"] = exports.createEventSchema = exports.addCategorySchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _eventConstants = require("../../utils/constants/event.constants.js");
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7, _Joi$string8, _Joi$string9, _Joi$string0, _Joi$string1;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; } /**
 * Event module validation schemas using Joi
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);

// Reusable sub-schemas
var locationSchema = _joi["default"].object({
  name: _joi["default"].string().trim().required(),
  address: _joi["default"].string().required(),
  city: _joi["default"].string().trim().required(),
  coordinates: _joi["default"].object({
    lat: _joi["default"].number().min(-90).max(90).required(),
    lng: _joi["default"].number().min(-180).max(180).required()
  }).optional(),
  country: _joi["default"].string().trim().optional(),
  zipCode: _joi["default"].string().trim().optional(),
  website: _joi["default"].string().uri().optional(),
  phone: _joi["default"].string().trim().optional(),
  venueInfo: _joi["default"].array().items(_joi["default"].string()).optional(),
  directions: _joi["default"].array().items(_joi["default"].string()).optional()
});
var timelineItemSchema = _joi["default"].object({
  title: _joi["default"].string().trim().required(),
  description: _joi["default"].string().trim().optional(),
  time: _joi["default"].date().required()
});
var registrationFeeSchema = _joi["default"].object({
  amount: _joi["default"].number().min(0).required(),
  currency: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_eventConstants.CURRENCY)))["default"](_eventConstants.CURRENCY.GHS),
  is_free: _joi["default"]["boolean"]()["default"](true)
});
var organizerSchema = _joi["default"].object({
  name: _joi["default"].string().trim().required(),
  email: _joi["default"].string().trim().lowercase().email().optional(),
  phone: _joi["default"].string().trim().optional()
});
var socialLinksSchema = _joi["default"].object({
  facebook: _joi["default"].string().uri().optional(),
  twitter: _joi["default"].string().uri().optional(),
  linkedin: _joi["default"].string().uri().optional(),
  instagram: _joi["default"].string().uri().optional()
}).optional();

// Create event validation
var createEventSchema = exports.createEventSchema = _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200).required(),
  description: _joi["default"].string().trim().min(10).required(),
  location: locationSchema.required(),
  gallery: _joi["default"].array().items(_joi["default"].string().uri())["default"]([]),
  start_date: _joi["default"].date().min("now").required(),
  end_date: _joi["default"].date().greater(_joi["default"].ref("start_date")).required(),
  speakers: _joi["default"].array().items(_joi["default"].object())["default"]([]),
  guestOfHonor: _joi["default"].array().items(_joi["default"].object())["default"]([]),
  sponsors: _joi["default"].array().items(_joi["default"].object())["default"]([]),
  related_events: _joi["default"].array().items(ObjectId())["default"]([]),
  categories: _joi["default"].array().items(ObjectId())["default"]([]),
  timeline: _joi["default"].array().items(timelineItemSchema)["default"]([]),
  registration_form: ObjectId().optional(),
  status: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_eventConstants.STATUS)))["default"](_eventConstants.STATUS.PENDING),
  is_featured: _joi["default"]["boolean"]()["default"](false),
  is_published: _joi["default"]["boolean"]()["default"](false),
  max_attendees: _joi["default"].number().integer().min(0).optional(),
  current_attendees: _joi["default"].number().integer().min(0)["default"](0),
  registration_deadline: _joi["default"].date().less(_joi["default"].ref("start_date")).optional(),
  registration_fee: registrationFeeSchema.optional(),
  tags: _joi["default"].array().items(_joi["default"].string().trim())["default"]([]),
  organizer: organizerSchema.optional(),
  contact_email: _joi["default"].string().trim().lowercase().email().optional(),
  event_type: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_eventConstants.EVENT_TYPE))).optional(),
  visibility: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_eventConstants.VISIBILITY)))["default"](_eventConstants.VISIBILITY.PUBLIC),
  cover_image: _joi["default"].string().uri().optional(),
  social_links: socialLinksSchema,
  requirements: _joi["default"].array().items(_joi["default"].string().trim())["default"]([]),
  cancellation_policy: _joi["default"].string().trim().optional(),
  created_by: ObjectId().required(),
  updated_by: ObjectId().optional()
});

// Update event validation
var updateEventSchema = exports.updateEventSchema = _joi["default"].object({
  name: _joi["default"].string().trim().min(3).max(200),
  description: _joi["default"].string().trim().min(10),
  location: locationSchema,
  gallery: _joi["default"].array().items(_joi["default"].string().uri()),
  start_date: _joi["default"].date().min("now"),
  end_date: _joi["default"].date().when("start_date", {
    is: _joi["default"].exist(),
    then: _joi["default"].date().greater(_joi["default"].ref("start_date")),
    otherwise: _joi["default"].date()
  }),
  speakers: _joi["default"].array().items(_joi["default"].object()),
  guestOfHonor: _joi["default"].array().items(_joi["default"].object()),
  sponsors: _joi["default"].array().items(_joi["default"].object()),
  related_events: _joi["default"].array().items(ObjectId()),
  categories: _joi["default"].array().items(ObjectId()),
  timeline: _joi["default"].array().items(timelineItemSchema),
  registration_form: ObjectId(),
  status: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_eventConstants.STATUS))),
  is_featured: _joi["default"]["boolean"](),
  is_published: _joi["default"]["boolean"](),
  max_attendees: _joi["default"].number().integer().min(0),
  current_attendees: _joi["default"].number().integer().min(0),
  registration_deadline: _joi["default"].date(),
  registration_fee: registrationFeeSchema,
  tags: _joi["default"].array().items(_joi["default"].string().trim()),
  organizer: organizerSchema,
  contact_email: _joi["default"].string().trim().lowercase().email(),
  event_type: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_eventConstants.EVENT_TYPE))),
  visibility: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_eventConstants.VISIBILITY))),
  cover_image: _joi["default"].string().uri(),
  social_links: socialLinksSchema,
  requirements: _joi["default"].array().items(_joi["default"].string().trim()),
  cancellation_policy: _joi["default"].string().trim(),
  updated_by: ObjectId()
}).min(1);

// Event ID parameter validation
var eventIdSchema = exports.eventIdSchema = _joi["default"].object({
  id: ObjectId().required()
});

// Query parameters validation
var eventQuerySchema = exports.eventQuerySchema = _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10),
  status: (_Joi$string8 = _joi["default"].string()).valid.apply(_Joi$string8, _toConsumableArray(Object.values(_eventConstants.STATUS))),
  event_type: (_Joi$string9 = _joi["default"].string()).valid.apply(_Joi$string9, _toConsumableArray(Object.values(_eventConstants.EVENT_TYPE))),
  visibility: (_Joi$string0 = _joi["default"].string()).valid.apply(_Joi$string0, _toConsumableArray(Object.values(_eventConstants.VISIBILITY))),
  is_featured: _joi["default"]["boolean"](),
  is_published: _joi["default"]["boolean"](),
  search: _joi["default"].string().trim().max(100),
  start_date_from: _joi["default"].date(),
  start_date_to: _joi["default"].date(),
  end_date_from: _joi["default"].date(),
  end_date_to: _joi["default"].date(),
  tags: _joi["default"].alternatives()["try"](_joi["default"].string().trim(), _joi["default"].array().items(_joi["default"].string().trim())),
  sort: _joi["default"].string().valid("name", "start_date", "end_date", "created_at", "current_attendees", "-name", "-start_date", "-end_date", "-created_at", "-current_attendees")["default"]("-created_at")
});

// Publish event validation
var publishEventSchema = exports.publishEventSchema = _joi["default"].object({
  is_published: _joi["default"]["boolean"]().required()
});

// Feature event validation
var featureEventSchema = exports.featureEventSchema = _joi["default"].object({
  is_featured: _joi["default"]["boolean"]().required()
});

// Update event status validation
var updateEventStatusSchema = exports.updateEventStatusSchema = _joi["default"].object({
  status: (_Joi$string1 = _joi["default"].string()).valid.apply(_Joi$string1, _toConsumableArray(Object.values(_eventConstants.STATUS))).required()
});

// Add category to event validation
var addCategorySchema = exports.addCategorySchema = _joi["default"].object({
  category_id: ObjectId().required()
});

// Remove category from event validation
var removeCategorySchema = exports.removeCategorySchema = _joi["default"].object({
  category_id: ObjectId().required()
});

// Update attendees count validation
var updateAttendeesSchema = exports.updateAttendeesSchema = _joi["default"].object({
  current_attendees: _joi["default"].number().integer().min(0).required()
});
var _default = exports["default"] = {
  createEventSchema: createEventSchema,
  updateEventSchema: updateEventSchema,
  eventIdSchema: eventIdSchema,
  eventQuerySchema: eventQuerySchema,
  publishEventSchema: publishEventSchema,
  featureEventSchema: featureEventSchema,
  updateEventStatusSchema: updateEventStatusSchema,
  addCategorySchema: addCategorySchema,
  removeCategorySchema: removeCategorySchema,
  updateAttendeesSchema: updateAttendeesSchema
};