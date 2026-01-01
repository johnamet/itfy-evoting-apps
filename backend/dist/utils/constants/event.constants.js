"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VISIBILITY = exports.STATUS = exports.EVENT_TYPE = exports.CURRENCY = void 0;
/**
 * Constant file for events
 */

var STATUS = exports.STATUS = {
  ACTIVE: "active",
  UPCOMING: "upcoming",
  ARCHIVED: "archived",
  CANCELLED: "cancelled",
  DELETED: "deleted",
  PENDING: "pending"
};
var EVENT_TYPE = exports.EVENT_TYPE = {
  CONFERENCE: "conference",
  WORKSHOP: "workshop",
  SEMINAR: "seminar",
  NETWORKING: "networking",
  WEBINAR: "webinar",
  HYBRID: "hybrid",
  OTHER: "other"
};
var VISIBILITY = exports.VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
  UNLISTED: "unlisted"
};
var CURRENCY = exports.CURRENCY = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  GHS: "GH₵",
  NGN: "₦",
  ZAR: "R",
  INR: "₹",
  JPY: "¥",
  CNY: "¥"
};
var _default = exports["default"] = STATUS;