"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _userRepository = _interopRequireDefault(require("./user.repository.js"));
var _userValidation = _interopRequireDefault(require("./user.validation.js"));
var _activityService = _interopRequireDefault(require("../activity/activity.service.js"));
var _emailService = _interopRequireDefault(require("../../services/email.service.js"));
var _notificationService = _interopRequireDefault(require("../../services/notification.service.js"));
var _authHelper = require("../../utils/helpers/auth.helper.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
var _notificationConstants = require("../../utils/constants/notification.constants.js");
var _agendaService = _interopRequireDefault(require("../../services/agenda.service.js"));
var _excluded = ["skip", "limit", "sort"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /* eslint-disable no-undef */ /**
 * User Service
 * Business logic for user management
 */
// Register validation class with BaseService
_baseService["default"].setValidation(_userValidation["default"]);
var UserService = exports.UserService = /*#__PURE__*/function (_BaseService) {
  function UserService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, UserService);
    _this = _callSuper(this, UserService);
    _this.repository = dependencies.repository || _userRepository["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    _this.emailService = dependencies.emailService || _emailService["default"];
    _this.notificationService = dependencies.notificationService || _notificationService["default"];
    return _this;
  }

  // ==================== USER MANAGEMENT ====================

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string|mongoose.Types.ObjectId} [creatorId] - ID of admin creating the user
   * @returns {Promise<Object>} - Created user
   */
  _inherits(UserService, _BaseService);
  return _createClass(UserService, [{
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userData) {
        var creatorId,
          validated,
          user,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              creatorId = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
              _context.p = 1;
              // Validate input data
              validated = this.validate(userData, _userValidation["default"].createUserSchema); // Hash password
              _context.n = 2;
              return _authHelper.AuthHelpers.hashPassword(validated.password);
            case 2:
              validated.password_hash = _context.v;
              delete validated.password;

              // Set default permissions based on role if not provided
              if (!validated.permissions || validated.permissions.length === 0) {
                validated.permissions = this._getDefaultPermissions(validated.role);
              }

              // Create user
              _context.n = 3;
              return this.repository.create(validated);
            case 3:
              user = _context.v;
              _context.n = 4;
              return _agendaService["default"].now('send email', {
                to: user.email,
                subject: "Welcome to ITFY E-Voting Platform",
                template: "welcome",
                context: {
                  name: user.name,
                  email: user.email,
                  role: user.role
                }
              });
            case 4:
              // Log activity (fire-and-forget)
              if (creatorId) {
                this.activityService.log({
                  userId: creatorId,
                  action: _activityConstants.ACTION_TYPE.USER_CREATED,
                  entityType: _activityConstants.ENTITY_TYPE.USER,
                  entityId: user._id,
                  description: "Created user: ".concat(user.email, " with role ").concat(user.role),
                  metadata: {
                    userEmail: user.email,
                    userRole: user.role
                  }
                })["catch"](function (err) {
                  return console.error("Activity log failed:", err);
                });
              }
              return _context.a(2, user);
            case 5:
              _context.p = 5;
              _t = _context.v;
              throw new Error("Create user failed: ".concat(_t.message));
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 5]]);
      }));
      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
    /**
     * Find all users with filters and options
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (skip, limit, sort, etc.)
     * @returns {Promise<Array>} - List of users
     */
  }, {
    key: "findAll",
    value: (function () {
      var _findAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var filters,
          options,
          _options$skip,
          skip,
          _options$limit,
          limit,
          _options$sort,
          sort,
          queryOptions,
          page,
          result,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              filters = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              _options$skip = options.skip, skip = _options$skip === void 0 ? 0 : _options$skip, _options$limit = options.limit, limit = _options$limit === void 0 ? 10 : _options$limit, _options$sort = options.sort, sort = _options$sort === void 0 ? '-created_at' : _options$sort, queryOptions = _objectWithoutProperties(options, _excluded);
              page = Math.floor(skip / limit) + 1;
              _context2.n = 2;
              return this.repository.findAll(filters, page, limit, _objectSpread({
                sort: sort
              }, queryOptions));
            case 2:
              result = _context2.v;
              return _context2.a(2, result.data);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find all users failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findAll() {
        return _findAll.apply(this, arguments);
      }
      return findAll;
    }()
    /**
     * Count users matching filters
     * @param {Object} filters - Query filters
     * @returns {Promise<number>} - Count of users
     */
    )
  }, {
    key: "count",
    value: (function () {
      var _count = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var filters,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              filters = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              _context3.p = 1;
              _context3.n = 2;
              return this.repository.count(filters);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Count users failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
    /**
     * Update user profile
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {Object} updateData - Update data
     * @param {string|mongoose.Types.ObjectId} [updaterId] - ID of admin updating the user
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "updateUser",
    value: (function () {
      var _updateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId, updateData) {
        var updaterId,
          validated,
          user,
          updated,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              updaterId = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
              _context4.p = 1;
              // Validate input data
              validated = this.validate(updateData, _userValidation["default"].updateUserSchema);
              _context4.n = 2;
              return this.repository.findById(userId);
            case 2:
              user = _context4.v;
              if (user) {
                _context4.n = 3;
                break;
              }
              throw new Error("User not found");
            case 3:
              _context4.n = 4;
              return this.repository.updateById(userId, validated);
            case 4:
              updated = _context4.v;
              // Log activity (fire-and-forget)
              if (updaterId) {
                this.activityService.log({
                  userId: updaterId,
                  action: _activityConstants.ACTION_TYPE.USER_UPDATED,
                  entityType: _activityConstants.ENTITY_TYPE.USER,
                  entityId: userId,
                  description: "Updated user: ".concat(user.email),
                  metadata: {
                    changes: Object.keys(updateData)
                  }
                })["catch"](function (err) {
                  return console.error("Activity log failed:", err);
                });
              }
              return _context4.a(2, updated);
            case 5:
              _context4.p = 5;
              _t4 = _context4.v;
              throw new Error("Update user failed: ".concat(_t4.message));
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 5]]);
      }));
      function updateUser(_x2, _x3) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
    /**
     * Update user role
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string} newRole - New role
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID performing the action
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "updateUserRole",
    value: (function () {
      var _updateUserRole = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId, newRole, adminId) {
        var _this$validate, role, user, newPermissions, updated, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              // Validate input
              _this$validate = this.validate({
                role: newRole
              }, _userValidation["default"].updateRoleSchema), role = _this$validate.role;
              _context5.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context5.v;
              if (user) {
                _context5.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              if (!(userId.toString() === adminId.toString() && user.role === _userConstants.ROLES.SUPER_ADMIN)) {
                _context5.n = 3;
                break;
              }
              throw new Error("Super admins cannot change their own role");
            case 3:
              // Update role and permissions
              newPermissions = this._getDefaultPermissions(role);
              _context5.n = 4;
              return this.repository.updateById(userId, {
                role: role,
                permissions: newPermissions
              });
            case 4:
              updated = _context5.v;
              _context5.n = 5;
              return _notificationService["default"].create({
                userId: userId,
                type: _notificationConstants.NOTIFICATION_TYPE.USER_ROLE_UPDATED,
                title: "Your Role Has Been Updated",
                message: "Your role has been changed from ".concat(user.role, " to ").concat(role)
              });
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_ROLE_UPDATED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Changed user role from ".concat(user.role, " to ").concat(role),
                metadata: {
                  oldRole: user.role,
                  newRole: role,
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context5.a(2, updated);
            case 6:
              _context5.p = 6;
              _t5 = _context5.v;
              throw new Error("Update user role failed: ".concat(_t5.message));
            case 7:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 6]]);
      }));
      function updateUserRole(_x4, _x5, _x6) {
        return _updateUserRole.apply(this, arguments);
      }
      return updateUserRole;
    }()
    /**
     * Change user password
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string} oldPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "changePassword",
    value: (function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(userId, oldPassword, newPassword) {
        var validated, user, isValid, newPasswordHash, updated, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              // Validate input
              validated = this.validate({
                current_password: oldPassword,
                new_password: newPassword,
                confirm_password: newPassword
              }, _userValidation["default"].changePasswordSchema);
              _context6.n = 1;
              return this.repository.findById(userId, {
                select: "+password_hash"
              });
            case 1:
              user = _context6.v;
              if (user) {
                _context6.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context6.n = 3;
              return _authHelper.AuthHelpers.comparePassword(validated.current_password, user.password_hash);
            case 3:
              isValid = _context6.v;
              if (isValid) {
                _context6.n = 4;
                break;
              }
              throw new Error("Current password is incorrect");
            case 4:
              _context6.n = 5;
              return _authHelper.AuthHelpers.hashPassword(validated.new_password);
            case 5:
              newPasswordHash = _context6.v;
              _context6.n = 6;
              return this.repository.updateById(userId, {
                password_hash: newPasswordHash
              });
            case 6:
              updated = _context6.v;
              _context6.n = 7;
              return _emailService["default"].sendEmail({
                to: user.email,
                subject: "Password Changed Successfully",
                template: "password-changed",
                context: {
                  name: user.name,
                  email: user.email,
                  changeDate: new Date()
                }
              });
            case 7:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: userId,
                action: _activityConstants.ACTION_TYPE.PASSWORD_CHANGED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "User changed their password"
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context6.a(2, updated);
            case 8:
              _context6.p = 8;
              _t6 = _context6.v;
              throw new Error("Change password failed: ".concat(_t6.message));
            case 9:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 8]]);
      }));
      function changePassword(_x7, _x8, _x9) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
    /**
     * Reset user password (admin action)
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string} newPassword - New password
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "resetPassword",
    value: (function () {
      var _resetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userId, newPassword, adminId) {
        var validated, user, newPasswordHash, updated, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              // Validate input
              validated = this.validate({
                new_password: newPassword
              }, _userValidation["default"].resetPasswordSchema);
              _context7.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context7.v;
              if (user) {
                _context7.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context7.n = 3;
              return _authHelper.AuthHelpers.hashPassword(validated.new_password);
            case 3:
              newPasswordHash = _context7.v;
              _context7.n = 4;
              return this.repository.updateById(userId, {
                password_hash: newPasswordHash
              });
            case 4:
              updated = _context7.v;
              _context7.n = 5;
              return _emailService["default"].sendEmail({
                to: user.email,
                subject: "Your Password Has Been Reset",
                template: "password-reset",
                context: {
                  name: user.name,
                  email: user.email,
                  temporaryPassword: newPassword
                }
              });
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.PASSWORD_RESET,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Admin reset password for user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context7.a(2, updated);
            case 6:
              _context7.p = 6;
              _t7 = _context7.v;
              throw new Error("Reset password failed: ".concat(_t7.message));
            case 7:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 6]]);
      }));
      function resetPassword(_x0, _x1, _x10) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
    /**
     * Deactivate user account
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @param {string} [reason] - Reason for deactivation
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "deactivateUser",
    value: (function () {
      var _deactivateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(userId, adminId) {
        var reason,
          validated,
          user,
          updated,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              reason = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : null;
              _context8.p = 1;
              // Validate input
              validated = this.validate({
                reason: reason
              }, _userValidation["default"].deactivateUserSchema);
              _context8.n = 2;
              return this.repository.findById(userId);
            case 2:
              user = _context8.v;
              if (user) {
                _context8.n = 3;
                break;
              }
              throw new Error("User not found");
            case 3:
              if (!(user.status === _userConstants.STATUS.INACTIVE)) {
                _context8.n = 4;
                break;
              }
              throw new Error("User is already inactive");
            case 4:
              _context8.n = 5;
              return this.repository.updateById(userId, {
                status: _userConstants.STATUS.INACTIVE
              });
            case 5:
              updated = _context8.v;
              _context8.n = 6;
              return _notificationService["default"].create({
                userId: userId,
                type: _notificationConstants.NOTIFICATION_TYPE.USER_DEACTIVATED,
                title: "Account Deactivated",
                message: validated.reason || "Your account has been deactivated. Contact support for more information."
              });
            case 6:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_DEACTIVATED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Deactivated user: ".concat(user.email),
                metadata: {
                  reason: validated.reason,
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context8.a(2, updated);
            case 7:
              _context8.p = 7;
              _t8 = _context8.v;
              throw new Error("Deactivate user failed: ".concat(_t8.message));
            case 8:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 7]]);
      }));
      function deactivateUser(_x11, _x12) {
        return _deactivateUser.apply(this, arguments);
      }
      return deactivateUser;
    }()
    /**
     * Activate user account
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "activateUser",
    value: (function () {
      var _activateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(userId, adminId) {
        var user, updated, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context9.v;
              if (user) {
                _context9.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              if (!(user.status === _userConstants.STATUS.ACTIVE)) {
                _context9.n = 3;
                break;
              }
              throw new Error("User is already active");
            case 3:
              _context9.n = 4;
              return this.repository.updateById(userId, {
                status: _userConstants.STATUS.ACTIVE
              });
            case 4:
              updated = _context9.v;
              _context9.n = 5;
              return _notificationService["default"].create({
                userId: userId,
                type: _notificationConstants.NOTIFICATION_TYPE.USER_ACTIVATED,
                title: "Account Activated",
                message: "Your account has been activated. You can now access the platform."
              });
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_ACTIVATED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Activated user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context9.a(2, updated);
            case 6:
              _context9.p = 6;
              _t9 = _context9.v;
              throw new Error("Activate user failed: ".concat(_t9.message));
            case 7:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 6]]);
      }));
      function activateUser(_x13, _x14) {
        return _activateUser.apply(this, arguments);
      }
      return activateUser;
    }()
    /**
     * Suspend user account
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string} reason - Suspension reason
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "suspendUser",
    value: (function () {
      var _suspendUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(userId, reason, adminId) {
        var user, updated, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context0.v;
              if (user) {
                _context0.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              if (!(user.status === _userConstants.STATUS.SUSPENDED)) {
                _context0.n = 3;
                break;
              }
              throw new Error("User is already suspended");
            case 3:
              _context0.n = 4;
              return this.repository.updateById(userId, {
                status: _userConstants.STATUS.SUSPENDED
              });
            case 4:
              updated = _context0.v;
              _context0.n = 5;
              return _notificationService["default"].create({
                userId: userId,
                type: _notificationConstants.NOTIFICATION_TYPE.USER_SUSPENDED,
                title: "Account Suspended",
                message: reason || "Your account has been suspended. Contact support for more information."
              });
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_SUSPENDED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Suspended user: ".concat(user.email),
                metadata: {
                  reason: reason,
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context0.a(2, updated);
            case 6:
              _context0.p = 6;
              _t0 = _context0.v;
              throw new Error("Suspend user failed: ".concat(_t0.message));
            case 7:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 6]]);
      }));
      function suspendUser(_x15, _x16, _x17) {
        return _suspendUser.apply(this, arguments);
      }
      return suspendUser;
    }()
    /**
     * Reactivate suspended user account
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "reactivateUser",
    value: (function () {
      var _reactivateUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(userId, adminId) {
        var user, updated, _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context1.v;
              if (user) {
                _context1.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              if (!(user.status === _userConstants.STATUS.ACTIVE)) {
                _context1.n = 3;
                break;
              }
              throw new Error("User is already active");
            case 3:
              _context1.n = 4;
              return this.repository.updateById(userId, {
                status: _userConstants.STATUS.ACTIVE
              });
            case 4:
              updated = _context1.v;
              _context1.n = 5;
              return _notificationService["default"].create({
                userId: userId,
                type: _notificationConstants.NOTIFICATION_TYPE.USER_ACTIVATED,
                title: "Account Reactivated",
                message: "Your account has been reactivated. You can now access the platform."
              });
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_ACTIVATED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Reactivated user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context1.a(2, updated);
            case 6:
              _context1.p = 6;
              _t1 = _context1.v;
              throw new Error("Reactivate user failed: ".concat(_t1.message));
            case 7:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 6]]);
      }));
      function reactivateUser(_x18, _x19) {
        return _reactivateUser.apply(this, arguments);
      }
      return reactivateUser;
    }()
    /**
     * Force verify user email (admin action)
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated user
     */
    )
  }, {
    key: "forceVerifyEmail",
    value: (function () {
      var _forceVerifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(userId, adminId) {
        var user, updated, _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context10.v;
              if (user) {
                _context10.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              if (!user.email_verified) {
                _context10.n = 3;
                break;
              }
              throw new Error("User email is already verified");
            case 3:
              _context10.n = 4;
              return this.repository.updateById(userId, {
                email_verified: true,
                email_verified_at: new Date()
              });
            case 4:
              updated = _context10.v;
              _context10.n = 5;
              return _notificationService["default"].create({
                userId: userId,
                type: _notificationConstants.NOTIFICATION_TYPE.SYSTEM,
                title: "Email Verified",
                message: "Your email has been verified by an administrator."
              });
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_UPDATED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Force verified email for user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context10.a(2, updated);
            case 6:
              _context10.p = 6;
              _t10 = _context10.v;
              throw new Error("Force verify email failed: ".concat(_t10.message));
            case 7:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 6]]);
      }));
      function forceVerifyEmail(_x20, _x21) {
        return _forceVerifyEmail.apply(this, arguments);
      }
      return forceVerifyEmail;
    }() // ==================== QUERY METHODS ====================
    /**
     * Get user by ID
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - User
     */
    )
  }, {
    key: "getUserById",
    value: function () {
      var _getUserById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(userId) {
        var options,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findById(userId, options);
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Get user by ID failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function getUserById(_x22) {
        return _getUserById.apply(this, arguments);
      }
      return getUserById;
    }()
    /**
     * Get user by email
     * @param {string} email - User email
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - User
     */
  }, {
    key: "getUserByEmail",
    value: (function () {
      var _getUserByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(email) {
        var options,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.repository.findByEmail(email, options);
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Get user by email failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function getUserByEmail(_x23) {
        return _getUserByEmail.apply(this, arguments);
      }
      return getUserByEmail;
    }()
    /**
     * Search users
     * @param {string} searchTerm - Search term
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated users
     */
    )
  }, {
    key: "searchUsers",
    value: (function () {
      var _searchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(searchTerm) {
        var page,
          limit,
          options,
          validated,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
              limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 20;
              options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
              _context13.p = 1;
              // Validate search parameters
              validated = this.validate({
                search_term: searchTerm,
                page: page,
                limit: limit
              }, _userValidation["default"].searchSchema);
              _context13.n = 2;
              return this.repository.searchUsers(validated.search_term, validated.page, validated.limit, options);
            case 2:
              return _context13.a(2, _context13.v);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Search users failed: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function searchUsers(_x24) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
    /**
     * Get users by role
     * @param {string} role - User role
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated users
     */
    )
  }, {
    key: "getUsersByRole",
    value: (function () {
      var _getUsersByRole = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(role) {
        var page,
          limit,
          options,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              page = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 1;
              limit = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 20;
              options = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
              _context14.p = 1;
              _context14.n = 2;
              return this.repository.findAll({
                role: role
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  created_at: -1
                }
              }));
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Get users by role failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function getUsersByRole(_x25) {
        return _getUsersByRole.apply(this, arguments);
      }
      return getUsersByRole;
    }()
    /**
     * Get overall user statistics (admin dashboard)
     * @returns {Promise<Object>} - Aggregate user statistics
     */
    )
  }, {
    key: "getUserStats",
    value: (function () {
      var _getUserStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var totalUsers, activeUsers, inactiveUsers, suspendedUsers, superAdmins, admins, moderators, voters, verifiedUsers, unverifiedUsers, sevenDaysAgo, recentRegistrations, oneDayAgo, recentLogins, _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this.repository.count({});
            case 1:
              totalUsers = _context15.v;
              _context15.n = 2;
              return this.repository.count({
                status: _userConstants.STATUS.ACTIVE
              });
            case 2:
              activeUsers = _context15.v;
              _context15.n = 3;
              return this.repository.count({
                status: _userConstants.STATUS.INACTIVE
              });
            case 3:
              inactiveUsers = _context15.v;
              _context15.n = 4;
              return this.repository.count({
                status: _userConstants.STATUS.SUSPENDED
              });
            case 4:
              suspendedUsers = _context15.v;
              _context15.n = 5;
              return this.repository.count({
                role: _userConstants.ROLES.SUPER_ADMIN
              });
            case 5:
              superAdmins = _context15.v;
              _context15.n = 6;
              return this.repository.count({
                role: _userConstants.ROLES.ADMIN
              });
            case 6:
              admins = _context15.v;
              _context15.n = 7;
              return this.repository.count({
                role: _userConstants.ROLES.MODERATOR
              });
            case 7:
              moderators = _context15.v;
              _context15.n = 8;
              return this.repository.count({
                role: _userConstants.ROLES.VOTER || _userConstants.ROLES.USER
              });
            case 8:
              voters = _context15.v;
              _context15.n = 9;
              return this.repository.count({
                email_verified: true
              });
            case 9:
              verifiedUsers = _context15.v;
              _context15.n = 10;
              return this.repository.count({
                email_verified: false
              });
            case 10:
              unverifiedUsers = _context15.v;
              // Get recent registrations (last 7 days)
              sevenDaysAgo = new Date();
              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
              _context15.n = 11;
              return this.repository.count({
                created_at: {
                  $gte: sevenDaysAgo
                }
              });
            case 11:
              recentRegistrations = _context15.v;
              // Get recent logins (last 24 hours)
              oneDayAgo = new Date();
              oneDayAgo.setDate(oneDayAgo.getDate() - 1);
              _context15.n = 12;
              return this.repository.count({
                last_login: {
                  $gte: oneDayAgo
                }
              });
            case 12:
              recentLogins = _context15.v;
              return _context15.a(2, {
                total: totalUsers,
                byStatus: {
                  active: activeUsers,
                  inactive: inactiveUsers,
                  suspended: suspendedUsers
                },
                byRole: {
                  superAdmin: superAdmins,
                  admin: admins,
                  moderator: moderators,
                  voter: voters
                },
                verification: {
                  verified: verifiedUsers,
                  unverified: unverifiedUsers
                },
                activity: {
                  recentRegistrations: recentRegistrations,
                  recentLogins: recentLogins
                }
              });
            case 13:
              _context15.p = 13;
              _t15 = _context15.v;
              throw new Error("Get user stats failed: ".concat(_t15.message));
            case 14:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 13]]);
      }));
      function getUserStats() {
        return _getUserStats.apply(this, arguments);
      }
      return getUserStats;
    }()
    /**
     * Get user statistics
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @returns {Promise<Object>} - User statistics
     */
    )
  }, {
    key: "getUserStatistics",
    value: (function () {
      var _getUserStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(userId) {
        var user, activityCount, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context16.v;
              if (user) {
                _context16.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context16.n = 3;
              return _activityService["default"].repository.count({
                userId: userId
              });
            case 3:
              activityCount = _context16.v;
              return _context16.a(2, {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                emailVerified: user.email_verified,
                lastLogin: user.last_login,
                loginAttempts: user.login_attempts,
                activityCount: activityCount,
                createdAt: user.created_at
              });
            case 4:
              _context16.p = 4;
              _t16 = _context16.v;
              throw new Error("Get user statistics failed: ".concat(_t16.message));
            case 5:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 4]]);
      }));
      function getUserStatistics(_x26) {
        return _getUserStatistics.apply(this, arguments);
      }
      return getUserStatistics;
    }()
    /**
     * Delete user by ID (soft delete)
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Deleted user
     */
    )
  }, {
    key: "deleteUser",
    value: (function () {
      var _deleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(userId, adminId) {
        var user, deleted, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context17.v;
              if (user) {
                _context17.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context17.n = 3;
              return this.repository.deleteUser(userId);
            case 3:
              deleted = _context17.v;
              _context17.n = 4;
              return _agendaService["default"].now('send email', {
                to: user.email,
                subject: "Account Deleted",
                template: "account-deleted",
                context: {
                  name: user.name,
                  email: user.email
                }
              });
            case 4:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_DELETED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Deleted user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context17.a(2, deleted);
            case 5:
              _context17.p = 5;
              _t17 = _context17.v;
              throw new Error("Delete user failed: ".concat(_t17.message));
            case 6:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 5]]);
      }));
      function deleteUser(_x27, _x28) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
    /**
     * Restore soft-deleted user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Restored user
     */
    )
  }, {
    key: "restoreUser",
    value: (function () {
      var _restoreUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(userId, adminId) {
        var user, restored, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.repository.findById(userId, {
                includeDeleted: true
              });
            case 1:
              user = _context18.v;
              if (user) {
                _context18.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context18.n = 3;
              return this.repository.restoreUser(userId);
            case 3:
              restored = _context18.v;
              _context18.n = 4;
              return _agendaService["default"].now('send email', {
                to: user.email,
                subject: "Account Restored",
                template: "account-restored",
                context: {
                  name: user.name,
                  email: user.email
                }
              });
            case 4:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_RESTORED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Restored user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context18.a(2, restored);
            case 5:
              _context18.p = 5;
              _t18 = _context18.v;
              throw new Error("Restore user failed: ".concat(_t18.message));
            case 6:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 5]]);
      }));
      function restoreUser(_x29, _x30) {
        return _restoreUser.apply(this, arguments);
      }
      return restoreUser;
    }()
    /**
    * Enhanced User Service Methods
    * Add these to your existing UserService class
    */
    // ==================== SERVICE METHODS ====================
    /**
     * Hard delete user - permanently remove from database (super admin only)
     */
    )
  }, {
    key: "hardDeleteUser",
    value: (function () {
      var _hardDeleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(userId, adminId) {
        var user, result, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.repository.findById(userId, {
                includeDeleted: true
              });
            case 1:
              user = _context19.v;
              if (user) {
                _context19.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context19.n = 3;
              return this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USER_HARD_DELETED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "PERMANENTLY deleted user: ".concat(user.email),
                metadata: {
                  userEmail: user.email,
                  userRole: user.role
                },
                severity: "critical"
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
            case 3:
              _context19.n = 4;
              return this.repository.hardDelete(userId);
            case 4:
              result = _context19.v;
              return _context19.a(2, result);
            case 5:
              _context19.p = 5;
              _t19 = _context19.v;
              throw new Error("Hard delete user failed: ".concat(_t19.message));
            case 6:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 5]]);
      }));
      function hardDeleteUser(_x31, _x32) {
        return _hardDeleteUser.apply(this, arguments);
      }
      return hardDeleteUser;
    }()
    /**
     * Bulk perform action on users
     */
    )
  }, {
    key: "bulkAction",
    value: (function () {
      var _bulkAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(userIds, action, adminId) {
        var reason,
          results,
          _iterator,
          _step,
          userId,
          _args20 = arguments,
          _t20,
          _t21,
          _t22,
          _t23;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              reason = _args20.length > 3 && _args20[3] !== undefined ? _args20[3] : null;
              _context20.p = 1;
              results = {
                success: 0,
                failed: 0,
                errors: []
              };
              _iterator = _createForOfIteratorHelper(userIds);
              _context20.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context20.n = 19;
                break;
              }
              userId = _step.value;
              _context20.p = 4;
              _t20 = action;
              _context20.n = _t20 === "activate" ? 5 : _t20 === "deactivate" ? 7 : _t20 === "suspend" ? 9 : _t20 === "delete" ? 11 : _t20 === "verify_email" ? 13 : 15;
              break;
            case 5:
              _context20.n = 6;
              return this.activateUser(userId, adminId);
            case 6:
              return _context20.a(3, 16);
            case 7:
              _context20.n = 8;
              return this.deactivateUser(userId, adminId, reason);
            case 8:
              return _context20.a(3, 16);
            case 9:
              _context20.n = 10;
              return this.suspendUser(userId, reason, adminId);
            case 10:
              return _context20.a(3, 16);
            case 11:
              _context20.n = 12;
              return this.deleteUser(userId, adminId);
            case 12:
              return _context20.a(3, 16);
            case 13:
              _context20.n = 14;
              return this.forceVerifyEmail(userId, adminId);
            case 14:
              return _context20.a(3, 16);
            case 15:
              throw new Error("Unknown action: ".concat(action));
            case 16:
              results.success++;
              _context20.n = 18;
              break;
            case 17:
              _context20.p = 17;
              _t21 = _context20.v;
              results.failed++;
              results.errors.push({
                userId: userId,
                error: _t21.message
              });
            case 18:
              _context20.n = 3;
              break;
            case 19:
              _context20.n = 21;
              break;
            case 20:
              _context20.p = 20;
              _t22 = _context20.v;
              _iterator.e(_t22);
            case 21:
              _context20.p = 21;
              _iterator.f();
              return _context20.f(21);
            case 22:
              // Log bulk action
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USERS_BULK_ACTION,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                description: "Performed bulk ".concat(action, " on ").concat(userIds.length, " users"),
                metadata: {
                  action: action,
                  totalUsers: userIds.length,
                  results: results
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context20.a(2, results);
            case 23:
              _context20.p = 23;
              _t23 = _context20.v;
              throw new Error("Bulk action failed: ".concat(_t23.message));
            case 24:
              return _context20.a(2);
          }
        }, _callee20, this, [[4, 17], [2, 20, 21, 22], [1, 23]]);
      }));
      function bulkAction(_x33, _x34, _x35) {
        return _bulkAction.apply(this, arguments);
      }
      return bulkAction;
    }()
    /**
     * Bulk delete users
     */
    )
  }, {
    key: "bulkDelete",
    value: (function () {
      var _bulkDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(userIds, adminId) {
        var deletedCount, errors, _iterator2, _step2, userId, _t24, _t25, _t26;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              deletedCount = 0;
              errors = [];
              _iterator2 = _createForOfIteratorHelper(userIds);
              _context21.p = 1;
              _iterator2.s();
            case 2:
              if ((_step2 = _iterator2.n()).done) {
                _context21.n = 7;
                break;
              }
              userId = _step2.value;
              _context21.p = 3;
              _context21.n = 4;
              return this.deleteUser(userId, adminId);
            case 4:
              deletedCount++;
              _context21.n = 6;
              break;
            case 5:
              _context21.p = 5;
              _t24 = _context21.v;
              errors.push({
                userId: userId,
                error: _t24.message
              });
            case 6:
              _context21.n = 2;
              break;
            case 7:
              _context21.n = 9;
              break;
            case 8:
              _context21.p = 8;
              _t25 = _context21.v;
              _iterator2.e(_t25);
            case 9:
              _context21.p = 9;
              _iterator2.f();
              return _context21.f(9);
            case 10:
              // Log bulk delete
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USERS_BULK_DELETED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                description: "Bulk deleted ".concat(deletedCount, " users"),
                metadata: {
                  deletedCount: deletedCount,
                  totalAttempted: userIds.length,
                  errors: errors
                },
                severity: "warning"
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context21.a(2, {
                deletedCount: deletedCount,
                errors: errors
              });
            case 11:
              _context21.p = 11;
              _t26 = _context21.v;
              throw new Error("Bulk delete failed: ".concat(_t26.message));
            case 12:
              return _context21.a(2);
          }
        }, _callee21, this, [[3, 5], [1, 8, 9, 10], [0, 11]]);
      }));
      function bulkDelete(_x36, _x37) {
        return _bulkDelete.apply(this, arguments);
      }
      return bulkDelete;
    }()
    /**
     * Bulk restore deleted users (super admin only)
     */
    )
  }, {
    key: "bulkRestore",
    value: (function () {
      var _bulkRestore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(userIds, adminId) {
        var restoredCount, errors, _iterator3, _step3, userId, _t27, _t28, _t29;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              restoredCount = 0;
              errors = [];
              _iterator3 = _createForOfIteratorHelper(userIds);
              _context22.p = 1;
              _iterator3.s();
            case 2:
              if ((_step3 = _iterator3.n()).done) {
                _context22.n = 7;
                break;
              }
              userId = _step3.value;
              _context22.p = 3;
              _context22.n = 4;
              return this.restoreUser(userId, adminId);
            case 4:
              restoredCount++;
              _context22.n = 6;
              break;
            case 5:
              _context22.p = 5;
              _t27 = _context22.v;
              errors.push({
                userId: userId,
                error: _t27.message
              });
            case 6:
              _context22.n = 2;
              break;
            case 7:
              _context22.n = 9;
              break;
            case 8:
              _context22.p = 8;
              _t28 = _context22.v;
              _iterator3.e(_t28);
            case 9:
              _context22.p = 9;
              _iterator3.f();
              return _context22.f(9);
            case 10:
              // Log bulk restore
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.USERS_BULK_RESTORED,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                description: "Bulk restored ".concat(restoredCount, " users"),
                metadata: {
                  restoredCount: restoredCount,
                  totalAttempted: userIds.length,
                  errors: errors
                },
                severity: "warning"
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context22.a(2, {
                restoredCount: restoredCount,
                errors: errors
              });
            case 11:
              _context22.p = 11;
              _t29 = _context22.v;
              throw new Error("Bulk restore failed: ".concat(_t29.message));
            case 12:
              return _context22.a(2);
          }
        }, _callee22, this, [[3, 5], [1, 8, 9, 10], [0, 11]]);
      }));
      function bulkRestore(_x38, _x39) {
        return _bulkRestore.apply(this, arguments);
      }
      return bulkRestore;
    }()
    /**
     * Advanced user search
     */
    )
  }, {
    key: "advancedSearch",
    value: (function () {
      var _advancedSearch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(searchTerm) {
        var filters,
          query,
          users,
          _args23 = arguments,
          _t30;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              filters = _args23.length > 1 && _args23[1] !== undefined ? _args23[1] : {};
              _context23.p = 1;
              query = {}; // Text search
              if (searchTerm) {
                query.$or = [{
                  name: {
                    $regex: searchTerm,
                    $options: "i"
                  }
                }, {
                  email: {
                    $regex: searchTerm,
                    $options: "i"
                  }
                }];
              }

              // Role filters
              if (filters.roles && filters.roles.length > 0) {
                query.role = {
                  $in: filters.roles
                };
              }

              // Status filters
              if (filters.statuses && filters.statuses.length > 0) {
                query.status = {
                  $in: filters.statuses
                };
              }

              // Email verification filter
              if (filters.emailVerified !== undefined) {
                query.email_verified = filters.emailVerified;
              }

              // Include deleted filter (super admin only)
              if (!filters.includeDeleted) {
                query.deleted_at = null;
              }
              _context23.n = 2;
              return this.repository.findAll(query, 1, 100, {
                sort: {
                  created_at: -1
                }
              });
            case 2:
              users = _context23.v;
              return _context23.a(2, users.data);
            case 3:
              _context23.p = 3;
              _t30 = _context23.v;
              throw new Error("Advanced search failed: ".concat(_t30.message));
            case 4:
              return _context23.a(2);
          }
        }, _callee23, this, [[1, 3]]);
      }));
      function advancedSearch(_x40) {
        return _advancedSearch.apply(this, arguments);
      }
      return advancedSearch;
    }()
    /**
     * Export users to CSV
     */
    )
  }, {
    key: "exportToCSV",
    value: function exportToCSV(users) {
      var headers = ["ID", "Name", "Email", "Role", "Status", "Email Verified", "Created At"];
      var rows = users.map(function (user) {
        return [user._id, user.name, user.email, user.role, user.status, user.email_verified ? "Yes" : "No", new Date(user.created_at).toISOString()];
      });
      var csv = [headers].concat(_toConsumableArray(rows)).map(function (row) {
        return row.map(function (cell) {
          return "\"".concat(cell, "\"");
        }).join(",");
      }).join("\n");
      return csv;
    }

    /**
     * Export users to Excel (requires xlsx package)
     */
  }, {
    key: "exportToExcel",
    value: (function () {
      var _exportToExcel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(users) {
        var XLSX, data, worksheet, workbook;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              // This requires the 'xlsx' package
              XLSX = require("xlsx");
              data = users.map(function (user) {
                return {
                  ID: user._id,
                  Name: user.name,
                  Email: user.email,
                  Role: user.role,
                  Status: user.status,
                  "Email Verified": user.email_verified ? "Yes" : "No",
                  "Last Login": user.last_login ? new Date(user.last_login).toISOString() : "Never",
                  "Created At": new Date(user.created_at).toISOString()
                };
              });
              worksheet = XLSX.utils.json_to_sheet(data);
              workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
              return _context24.a(2, XLSX.write(workbook, {
                type: "buffer",
                bookType: "xlsx"
              }));
          }
        }, _callee24);
      }));
      function exportToExcel(_x41) {
        return _exportToExcel.apply(this, arguments);
      }
      return exportToExcel;
    }()
    /**
     * Send password reset by admin
     */
    )
  }, {
    key: "sendPasswordResetByAdmin",
    value: (function () {
      var _sendPasswordResetByAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(userId, adminId) {
        var user, resetToken, _t31;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.repository.findById(userId);
            case 1:
              user = _context25.v;
              if (user) {
                _context25.n = 2;
                break;
              }
              throw new Error("User not found");
            case 2:
              _context25.n = 3;
              return _authHelper.AuthHelpers.generateAndStoreResetToken(userId);
            case 3:
              resetToken = _context25.v;
              _context25.n = 4;
              return _agendaService["default"].now('send email', {
                to: user.email,
                subject: "Password Reset Request (Admin Initiated)",
                template: "admin-password-reset",
                context: {
                  name: user.name,
                  resetToken: resetToken,
                  resetUrl: "".concat(process.env.FRONTEND_URL, "/reset-password?token=").concat(resetToken)
                }
              });
            case 4:
              // Log activity
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.PASSWORD_RESET_SENT,
                entityType: _activityConstants.ENTITY_TYPE.USER,
                entityId: userId,
                description: "Admin sent password reset for user: ".concat(user.email),
                metadata: {
                  userEmail: user.email
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context25.a(2, true);
            case 5:
              _context25.p = 5;
              _t31 = _context25.v;
              throw new Error("Send password reset failed: ".concat(_t31.message));
            case 6:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 5]]);
      }));
      function sendPasswordResetByAdmin(_x42, _x43) {
        return _sendPasswordResetByAdmin.apply(this, arguments);
      }
      return sendPasswordResetByAdmin;
    }() // ==================== HELPER METHODS ====================
    /**
     * Get default permissions for a role
     * @private
     * @param {string} role - User role
     * @returns {Array<string>} - Default permissions
     */
    )
  }, {
    key: "_getDefaultPermissions",
    value: function _getDefaultPermissions(role) {
      switch (role) {
        case _userConstants.ROLES.SUPER_ADMIN:
          return Object.values(_userConstants.PERMISSIONS);
        case _userConstants.ROLES.ADMIN:
          return [_userConstants.PERMISSIONS.READ, _userConstants.PERMISSIONS.WRITE, _userConstants.PERMISSIONS.UPDATE, _userConstants.PERMISSIONS.DELETE];
        case _userConstants.ROLES.MODERATOR:
          return [_userConstants.PERMISSIONS.READ, _userConstants.PERMISSIONS.WRITE, _userConstants.PERMISSIONS.UPDATE];
        case _userConstants.ROLES.USER:
        default:
          return [_userConstants.PERMISSIONS.READ];
      }
    }
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new UserService();