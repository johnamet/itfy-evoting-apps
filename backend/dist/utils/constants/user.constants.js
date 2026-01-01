"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.STATUS = exports.ROLES = exports.PERMISSIONS = void 0;
// User roles
var ROLES = exports.ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  ORGANISER: "organiser",
  MODERATOR: "moderator"
};

// User permissions
var PERMISSIONS = exports.PERMISSIONS = {
  READ: "read",
  WRITE: "write",
  UPDATE: "update",
  //update includes soft deleting
  DELETE: "delete",
  // delete means hard deleting so exists exclusively for admins
  SUPER: "super"
};
var STATUS = exports.STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  DELETED: "deleted"
};
var _default = exports["default"] = ROLES;