"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _joiObjectid = _interopRequireDefault(require("joi-objectid"));
var _userConstants = require("../../utils/constants/user.constants.js");
var _UserValidation, _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5;
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
 * User module validation schemas using Joi
 * Class-based pattern for consistency with BaseService.setValidation()
 */
var ObjectId = (0, _joiObjectid["default"])(_joi["default"]);
var UserValidation = /*#__PURE__*/function () {
  function UserValidation() {
    _classCallCheck(this, UserValidation);
  }
  return _createClass(UserValidation, null, [{
    key: "validate",
    value:
    /**
     * Validate data against a schema
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
        var messages = error.details.map(function (d) {
          return d.message;
        }).join("; ");
        throw new Error("Validation failed: ".concat(messages));
      }
      return value;
    }
  }]);
}();
_UserValidation = UserValidation;
// Reusable field schemas
_defineProperty(UserValidation, "fields", {
  name: _joi["default"].string().trim().min(2).max(100),
  email: _joi["default"].string().trim().lowercase().email(),
  password: _joi["default"].string().min(8).max(128),
  role: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_userConstants.ROLES))),
  permissions: _joi["default"].array().items((_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_userConstants.PERMISSIONS)))),
  bio: _joi["default"].string().trim().max(1000).allow("", null),
  photo_url: _joi["default"].string().uri().allow("", null),
  status: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_userConstants.STATUS))),
  other_info: _joi["default"].object().unknown(true)
});
// Create user validation
_defineProperty(UserValidation, "createUserSchema", _joi["default"].object({
  name: _UserValidation.fields.name.required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required"
  }),
  email: _UserValidation.fields.email.required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required"
  }),
  password: _UserValidation.fields.password.required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 128 characters",
    "any.required": "Password is required"
  }),
  role: _UserValidation.fields.role["default"](_userConstants.ROLES.ORGANISER).messages({
    "any.only": "Invalid role specified"
  }),
  permissions: _UserValidation.fields.permissions["default"]([_userConstants.PERMISSIONS.READ]),
  bio: _UserValidation.fields.bio,
  photo_url: _UserValidation.fields.photo_url.messages({
    "string.uri": "Photo URL must be a valid URL"
  }),
  status: _UserValidation.fields.status["default"](_userConstants.STATUS.ACTIVE),
  other_info: _UserValidation.fields.other_info["default"]({})
}));
// Update user validation
_defineProperty(UserValidation, "updateUserSchema", _joi["default"].object({
  name: _UserValidation.fields.name.messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters"
  }),
  bio: _UserValidation.fields.bio,
  photo_url: _UserValidation.fields.photo_url.messages({
    "string.uri": "Photo URL must be a valid URL"
  }),
  other_info: _UserValidation.fields.other_info
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
}));
// Update role validation
_defineProperty(UserValidation, "updateRoleSchema", _joi["default"].object({
  role: _UserValidation.fields.role.required().messages({
    "any.only": "Invalid role specified",
    "any.required": "Role is required"
  })
}));
// Update permissions validation
_defineProperty(UserValidation, "updatePermissionsSchema", _joi["default"].object({
  permissions: _UserValidation.fields.permissions.min(1).required().messages({
    "array.min": "At least one permission must be provided",
    "any.required": "Permissions are required"
  })
}));
// Change password validation
_defineProperty(UserValidation, "changePasswordSchema", _joi["default"].object({
  current_password: _joi["default"].string().required().messages({
    "string.empty": "Current password is required",
    "any.required": "Current password is required"
  }),
  new_password: _UserValidation.fields.password.required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
    "string.max": "New password cannot exceed 128 characters",
    "any.required": "New password is required"
  }),
  confirm_password: _joi["default"].string().valid(_joi["default"].ref("new_password")).required().messages({
    "any.only": "Passwords must match",
    "any.required": "Password confirmation is required"
  })
}));
// Admin reset password validation
_defineProperty(UserValidation, "resetPasswordSchema", _joi["default"].object({
  new_password: _UserValidation.fields.password.required().messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
    "string.max": "New password cannot exceed 128 characters",
    "any.required": "New password is required"
  })
}));
// Deactivate user validation
_defineProperty(UserValidation, "deactivateUserSchema", _joi["default"].object({
  reason: _joi["default"].string().trim().max(500).allow("", null).messages({
    "string.max": "Reason cannot exceed 500 characters"
  })
}));
// Suspend user validation
_defineProperty(UserValidation, "suspendUserSchema", _joi["default"].object({
  reason: _joi["default"].string().trim().max(500).allow("", null).messages({
    "string.max": "Reason cannot exceed 500 characters"
  })
}));
// Bulk status update validation
_defineProperty(UserValidation, "bulkStatusUpdateSchema", _joi["default"].object({
  userIds: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one user ID is required",
    "any.required": "User IDs are required"
  }),
  status: _UserValidation.fields.status.required().messages({
    "any.only": "Invalid status specified",
    "any.required": "Status is required"
  })
}));
// Bulk action validation
_defineProperty(UserValidation, "bulkActionSchema", _joi["default"].object({
  userIds: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one user ID is required",
    "any.required": "User IDs are required"
  }),
  action: _joi["default"].string().valid("activate", "deactivate", "suspend", "delete", "verify_email").required().messages({
    "any.only": "Invalid action specified",
    "any.required": "Action is required"
  }),
  reason: _joi["default"].string().trim().max(500).allow("", null).messages({
    "string.max": "Reason cannot exceed 500 characters"
  })
}));
// Bulk delete validation
_defineProperty(UserValidation, "bulkDeleteSchema", _joi["default"].object({
  userIds: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one user ID is required",
    "any.required": "User IDs are required"
  })
}));
// Bulk restore validation
_defineProperty(UserValidation, "bulkRestoreSchema", _joi["default"].object({
  userIds: _joi["default"].array().items(ObjectId()).min(1).required().messages({
    "array.min": "At least one user ID is required",
    "any.required": "User IDs are required"
  })
}));
// Advanced search validation
_defineProperty(UserValidation, "advancedSearchSchema", _joi["default"].object({
  searchTerm: _joi["default"].string().trim().max(100).required().messages({
    "string.max": "Search term cannot exceed 100 characters",
    "any.required": "Search term is required"
  }),
  filters: _joi["default"].object({
    roles: _joi["default"].array().items((_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_userConstants.ROLES)))),
    statuses: _joi["default"].array().items((_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_userConstants.STATUS)))),
    emailVerified: _joi["default"]["boolean"](),
    includeDeleted: _joi["default"]["boolean"]()
  })["default"]({})
}));
// User ID parameter validation
_defineProperty(UserValidation, "userIdSchema", _joi["default"].object({
  id: ObjectId().required().messages({
    "any.required": "User ID is required",
    "string.pattern.name": "Invalid user ID format"
  })
}));
// Query parameters validation
_defineProperty(UserValidation, "userQuerySchema", _joi["default"].object({
  page: _joi["default"].number().integer().min(1)["default"](1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1"
  }),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100"
  }),
  role: _UserValidation.fields.role.messages({
    "any.only": "Invalid role filter"
  }),
  status: _UserValidation.fields.status.messages({
    "any.only": "Invalid status filter"
  }),
  search: _joi["default"].string().trim().max(100).messages({
    "string.max": "Search term cannot exceed 100 characters"
  }),
  sort: _joi["default"].string().valid("name", "email", "created_at", "last_login", "-name", "-email", "-created_at", "-last_login")["default"]("-created_at").messages({
    "any.only": "Invalid sort field"
  })
}));
// Search users validation
_defineProperty(UserValidation, "searchSchema", _joi["default"].object({
  search_term: _joi["default"].string().trim().min(1).max(100).required().messages({
    "string.empty": "Search term is required",
    "string.min": "Search term must not be empty",
    "string.max": "Search term cannot exceed 100 characters",
    "any.required": "Search term is required"
  }),
  page: _joi["default"].number().integer().min(1)["default"](1),
  limit: _joi["default"].number().integer().min(1).max(100)["default"](20)
}));
var _default = exports["default"] = UserValidation;