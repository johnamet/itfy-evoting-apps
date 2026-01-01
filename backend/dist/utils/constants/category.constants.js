"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STATUS = exports.RESULTS_VISIBILITY = void 0;
/**
 * The category constants for the category module
 */

var STATUS = exports.STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DELETED: "deleted",
  ARCHIVED: "archived",
  CLOSED: "closed"
};
var RESULTS_VISIBILITY = exports.RESULTS_VISIBILITY = {
  PUBLIC: "public",
  AUTHENTICATED: "authenticated",
  ADMIN_ONLY: "admin_only"
};
var _default = exports["default"] = STATUS;