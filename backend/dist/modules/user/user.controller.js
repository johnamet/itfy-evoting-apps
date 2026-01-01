"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UserController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _userService = _interopRequireDefault(require("./user.service.js"));
var _userValidation = _interopRequireDefault(require("./user.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * User Controller
 * Handles HTTP requests for user management operations
 */
var UserController = exports.UserController = /*#__PURE__*/function (_BaseController) {
  function UserController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, UserController);
    return _callSuper(this, UserController, [{
      userService: dependencies.userService || _userService["default"]
    }]);
  }

  // ==================== USER CRUD ====================

  /**
   * Create a new user (admin only)
   * POST /api/users
   */
  _inherits(UserController, _BaseController);
  return _createClass(UserController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, adminId, user;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _userValidation["default"].createUserSchema);
              adminId = this.getUserId(req);
              _context.n = 1;
              return this.service("userService").createUser(validated, adminId);
            case 1:
              user = _context.v;
              return _context.a(2, this.created(res, {
                data: user,
                message: "User created successfully"
              }));
          }
        }, _callee, this);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Get all users with pagination and filters
     * GET /api/users
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, search, _yield$Promise$all, _yield$Promise$all2, users, total;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["status", "role", "email_verified"]);
              sort = this.getSort(req);
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  email: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context2.n = 1;
              return Promise.all([this.service("userService").findAll(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("userService").count(filters)]);
            case 1:
              _yield$Promise$all = _context2.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              users = _yield$Promise$all2[0];
              total = _yield$Promise$all2[1];
              return _context2.a(2, this.paginated(res, {
                data: users,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee2, this);
      }));
      function list(_x3, _x4) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get user by ID
     * GET /api/users/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, user;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("userService").getUserById(id);
            case 1:
              user = _context3.v;
              if (user) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, this.notFound(res, {
                resource: "User"
              }));
            case 2:
              return _context3.a(2, this.success(res, {
                data: user
              }));
          }
        }, _callee3, this);
      }));
      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Update user
     * PUT /api/users/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var id, validated, adminId, user;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _userValidation["default"].updateUserSchema);
              adminId = this.getUserId(req);
              _context4.n = 1;
              return this.service("userService").updateUser(id, validated, adminId);
            case 1:
              user = _context4.v;
              return _context4.a(2, this.success(res, {
                data: user,
                message: "User updated successfully"
              }));
          }
        }, _callee4, this);
      }));
      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete user (soft delete)
     * DELETE /api/users/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, adminId;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context5.n = 1;
              return this.service("userService").deleteUser(id, adminId);
            case 1:
              return _context5.a(2, this.success(res, {
                message: "User deleted successfully"
              }));
          }
        }, _callee5, this);
      }));
      function _delete(_x9, _x0) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== USER PROFILE ====================
    /**
     * Get current user profile
     * GET /api/users/profile
     */
    )
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var userId, user;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              userId = this.getUserId(req);
              _context6.n = 1;
              return this.service("userService").getUserById(userId);
            case 1:
              user = _context6.v;
              return _context6.a(2, this.success(res, {
                data: user
              }));
          }
        }, _callee6, this);
      }));
      function getProfile(_x1, _x10) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
    /**
     * Update current user profile
     * PUT /api/users/profile
     */
  }, {
    key: "updateProfile",
    value: (function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var userId, validated, user;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              userId = this.getUserId(req);
              validated = this.validate(req.body, _userValidation["default"].updateUserSchema);
              _context7.n = 1;
              return this.service("userService").updateUser(userId, validated, userId);
            case 1:
              user = _context7.v;
              return _context7.a(2, this.success(res, {
                data: user,
                message: "Profile updated successfully"
              }));
          }
        }, _callee7, this);
      }));
      function updateProfile(_x11, _x12) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }() // ==================== ROLE & PERMISSIONS ====================
    /**
     * Update user role (admin only)
     * PUT /api/users/:id/role
     */
    )
  }, {
    key: "updateRole",
    value: function () {
      var _updateRole = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, validated, adminId, user;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _userValidation["default"].updateRoleSchema);
              adminId = this.getUserId(req);
              _context8.n = 1;
              return this.service("userService").updateUserRole(id, validated.role, adminId);
            case 1:
              user = _context8.v;
              return _context8.a(2, this.success(res, {
                data: user,
                message: "User role updated successfully"
              }));
          }
        }, _callee8, this);
      }));
      function updateRole(_x13, _x14) {
        return _updateRole.apply(this, arguments);
      }
      return updateRole;
    }()
    /**
     * Update user permissions (admin only)
     * PUT /api/users/:id/permissions
     */
  }, {
    key: "updatePermissions",
    value: (function () {
      var _updatePermissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var id, validated, adminId, user;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _userValidation["default"].updatePermissionsSchema);
              adminId = this.getUserId(req);
              _context9.n = 1;
              return this.service("userService").updateUserPermissions(id, validated.permissions, adminId);
            case 1:
              user = _context9.v;
              return _context9.a(2, this.success(res, {
                data: user,
                message: "User permissions updated successfully"
              }));
          }
        }, _callee9, this);
      }));
      function updatePermissions(_x15, _x16) {
        return _updatePermissions.apply(this, arguments);
      }
      return updatePermissions;
    }() // ==================== USER STATUS ====================
    /**
     * Activate user (admin only)
     * PUT /api/users/:id/activate
     */
    )
  }, {
    key: "activate",
    value: function () {
      var _activate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var id, adminId, user;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context0.n = 1;
              return this.service("userService").activateUser(id, adminId);
            case 1:
              user = _context0.v;
              return _context0.a(2, this.success(res, {
                data: user,
                message: "User activated successfully"
              }));
          }
        }, _callee0, this);
      }));
      function activate(_x17, _x18) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
    /**
     * Deactivate user (admin only)
     * PUT /api/users/:id/deactivate
     */
  }, {
    key: "deactivate",
    value: (function () {
      var _deactivate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var id, adminId, user;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context1.n = 1;
              return this.service("userService").deactivateUser(id, adminId);
            case 1:
              user = _context1.v;
              return _context1.a(2, this.success(res, {
                data: user,
                message: "User deactivated successfully"
              }));
          }
        }, _callee1, this);
      }));
      function deactivate(_x19, _x20) {
        return _deactivate.apply(this, arguments);
      }
      return deactivate;
    }()
    /**
     * Suspend user (admin only)
     * PUT /api/users/:id/suspend
     */
    )
  }, {
    key: "suspend",
    value: (function () {
      var _suspend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var id, validated, adminId, user;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _userValidation["default"].suspendUserSchema);
              adminId = this.getUserId(req);
              _context10.n = 1;
              return this.service("userService").suspendUser(id, validated.reason, adminId);
            case 1:
              user = _context10.v;
              return _context10.a(2, this.success(res, {
                data: user,
                message: "User suspended successfully"
              }));
          }
        }, _callee10, this);
      }));
      function suspend(_x21, _x22) {
        return _suspend.apply(this, arguments);
      }
      return suspend;
    }()
    /**
     * Reactivate user (admin only)
     * PUT /api/users/:id/reactivate
     */
    )
  }, {
    key: "reactivate",
    value: (function () {
      var _reactivate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var id, adminId, user;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context11.n = 1;
              return this.service("userService").reactivateUser(id, adminId);
            case 1:
              user = _context11.v;
              return _context11.a(2, this.success(res, {
                data: user,
                message: "User reactivated successfully"
              }));
          }
        }, _callee11, this);
      }));
      function reactivate(_x23, _x24) {
        return _reactivate.apply(this, arguments);
      }
      return reactivate;
    }()
    /**
     * Force verify user email (admin only)
     * PUT /api/users/:id/verify-email
     */
    )
  }, {
    key: "forceVerifyEmail",
    value: (function () {
      var _forceVerifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var id, adminId, user;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context12.n = 1;
              return this.service("userService").forceVerifyEmail(id, adminId);
            case 1:
              user = _context12.v;
              return _context12.a(2, this.success(res, {
                data: user,
                message: "User email verified successfully"
              }));
          }
        }, _callee12, this);
      }));
      function forceVerifyEmail(_x25, _x26) {
        return _forceVerifyEmail.apply(this, arguments);
      }
      return forceVerifyEmail;
    }() // ==================== BULK OPERATIONS ====================
    /**
     * Bulk update user status (admin only)
     * POST /api/users/bulk/status
     */
    )
  }, {
    key: "bulkUpdateStatus",
    value: function () {
      var _bulkUpdateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var validated, adminId, result;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              validated = this.validate(req.body, _userValidation["default"].bulkStatusUpdateSchema);
              adminId = this.getUserId(req);
              _context13.n = 1;
              return this.service("userService").bulkUpdateStatus(validated.userIds, validated.status, adminId);
            case 1:
              result = _context13.v;
              return _context13.a(2, this.success(res, {
                data: result,
                message: "".concat(result.modifiedCount, " users updated successfully")
              }));
          }
        }, _callee13, this);
      }));
      function bulkUpdateStatus(_x27, _x28) {
        return _bulkUpdateStatus.apply(this, arguments);
      }
      return bulkUpdateStatus;
    }() // ==================== STATISTICS ====================
    /**
     * Get user statistics (admin only)
     * GET /api/users/stats
     */
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var stats;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              _context14.n = 1;
              return this.service("userService").getUserStats();
            case 1:
              stats = _context14.v;
              return _context14.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee14, this);
      }));
      function getStats(_x29, _x30) {
        return _getStats.apply(this, arguments);
      }
      return getStats;
    }()
    /**
    * List soft-deleted users (super admin only)
    * GET /api/users/deleted
    */
  }, {
    key: "listDeleted",
    value: (function () {
      var _listDeleted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var _this$getPagination2, page, limit, skip, sort, search, filters, _yield$Promise$all3, _yield$Promise$all4, users, total;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit, skip = _this$getPagination2.skip;
              sort = this.getSort(req);
              search = this.getSearch(req);
              filters = {
                deleted_at: {
                  $ne: null
                }
              };
              if (search) {
                filters.$or = [{
                  name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  email: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context15.n = 1;
              return Promise.all([this.service("userService").findAll(filters, {
                skip: skip,
                limit: limit,
                sort: sort,
                includeDeleted: true
              }), this.service("userService").count(filters)]);
            case 1:
              _yield$Promise$all3 = _context15.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              users = _yield$Promise$all4[0];
              total = _yield$Promise$all4[1];
              return _context15.a(2, this.paginated(res, {
                data: users,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee15, this);
      }));
      function listDeleted(_x31, _x32) {
        return _listDeleted.apply(this, arguments);
      }
      return listDeleted;
    }()
    /**
     * Restore a soft-deleted user (super admin only)
     * POST /api/users/:id/restore
     */
    )
  }, {
    key: "restoreUser",
    value: (function () {
      var _restoreUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var id, adminId, user;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context16.n = 1;
              return this.service("userService").restoreUser(id, adminId);
            case 1:
              user = _context16.v;
              return _context16.a(2, this.success(res, {
                data: user,
                message: "User restored successfully"
              }));
          }
        }, _callee16, this);
      }));
      function restoreUser(_x33, _x34) {
        return _restoreUser.apply(this, arguments);
      }
      return restoreUser;
    }()
    /**
     * Hard delete user - permanent (super admin only)
     * DELETE /api/users/:id/hard
     */
    )
  }, {
    key: "hardDeleteUser",
    value: (function () {
      var _hardDeleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var id, adminId, admin;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req); // Extra security check - ensure user is super admin
              _context17.n = 1;
              return this.service("userService").getUserById(adminId);
            case 1:
              admin = _context17.v;
              if (!(admin.role !== "super_admin")) {
                _context17.n = 2;
                break;
              }
              return _context17.a(2, this.forbidden(res, {
                message: "Only super admins can permanently delete users"
              }));
            case 2:
              _context17.n = 3;
              return this.service("userService").hardDeleteUser(id, adminId);
            case 3:
              return _context17.a(2, this.success(res, {
                message: "User permanently deleted"
              }));
          }
        }, _callee17, this);
      }));
      function hardDeleteUser(_x35, _x36) {
        return _hardDeleteUser.apply(this, arguments);
      }
      return hardDeleteUser;
    }()
    /**
     * Bulk perform action on users
     * POST /api/users/bulk/action
     */
    )
  }, {
    key: "bulkAction",
    value: (function () {
      var _bulkAction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var validated, adminId, result;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              validated = this.validate(req.body, _userValidation["default"].bulkActionSchema);
              adminId = this.getUserId(req);
              _context18.n = 1;
              return this.service("userService").bulkAction(validated.userIds, validated.action, adminId, validated.reason);
            case 1:
              result = _context18.v;
              return _context18.a(2, this.success(res, {
                data: result,
                message: "Bulk action ".concat(validated.action, " completed. Success: ").concat(result.success, ", Failed: ").concat(result.failed)
              }));
          }
        }, _callee18, this);
      }));
      function bulkAction(_x37, _x38) {
        return _bulkAction.apply(this, arguments);
      }
      return bulkAction;
    }()
    /**
     * Bulk delete users
     * POST /api/users/bulk/delete
     */
    )
  }, {
    key: "bulkDelete",
    value: (function () {
      var _bulkDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
        var validated, adminId, result;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              validated = this.validate(req.body, _userValidation["default"].bulkDeleteSchema);
              adminId = this.getUserId(req);
              _context19.n = 1;
              return this.service("userService").bulkDelete(validated.userIds, adminId);
            case 1:
              result = _context19.v;
              return _context19.a(2, this.success(res, {
                data: result,
                message: "".concat(result.deletedCount, " users deleted successfully")
              }));
          }
        }, _callee19, this);
      }));
      function bulkDelete(_x39, _x40) {
        return _bulkDelete.apply(this, arguments);
      }
      return bulkDelete;
    }()
    /**
     * Bulk restore users (super admin only)
     * POST /api/users/bulk/restore
     */
    )
  }, {
    key: "bulkRestore",
    value: (function () {
      var _bulkRestore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
        var validated, adminId, admin, result;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              validated = this.validate(req.body, _userValidation["default"].bulkRestoreSchema);
              adminId = this.getUserId(req); // Extra security check
              _context20.n = 1;
              return this.service("userService").getUserById(adminId);
            case 1:
              admin = _context20.v;
              if (!(admin.role !== "super_admin")) {
                _context20.n = 2;
                break;
              }
              return _context20.a(2, this.forbidden(res, {
                message: "Only super admins can restore deleted users"
              }));
            case 2:
              _context20.n = 3;
              return this.service("userService").bulkRestore(validated.userIds, adminId);
            case 3:
              result = _context20.v;
              return _context20.a(2, this.success(res, {
                data: result,
                message: "".concat(result.restoredCount, " users restored successfully")
              }));
          }
        }, _callee20, this);
      }));
      function bulkRestore(_x41, _x42) {
        return _bulkRestore.apply(this, arguments);
      }
      return bulkRestore;
    }()
    /**
     * Advanced user search
     * POST /api/users/search
     */
    )
  }, {
    key: "searchUsers",
    value: (function () {
      var _searchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
        var validated, result;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              validated = this.validate(req.body, _userValidation["default"].advancedSearchSchema);
              _context21.n = 1;
              return this.service("userService").advancedSearch(validated.searchTerm, validated.filters);
            case 1:
              result = _context21.v;
              return _context21.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee21, this);
      }));
      function searchUsers(_x43, _x44) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
    /**
     * Export users to CSV/Excel
     * GET /api/users/export
     */
    )
  }, {
    key: "exportUsers",
    value: (function () {
      var _exportUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
        var format, filters, search, users, csv, excel;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              format = req.query.format || "csv";
              filters = this.getFilters(req, ["status", "role", "email_verified"]);
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  email: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context22.n = 1;
              return this.service("userService").findAll(filters, {
                limit: 10000 // Max export limit
              });
            case 1:
              users = _context22.v;
              if (!(format === "csv")) {
                _context22.n = 2;
                break;
              }
              csv = this.service("userService").exportToCSV(users);
              res.setHeader("Content-Type", "text/csv");
              res.setHeader("Content-Disposition", "attachment; filename=users.csv");
              return _context22.a(2, res.send(csv));
            case 2:
              _context22.n = 3;
              return this.service("userService").exportToExcel(users);
            case 3:
              excel = _context22.v;
              res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
              res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
              return _context22.a(2, res.send(excel));
            case 4:
              return _context22.a(2);
          }
        }, _callee22, this);
      }));
      function exportUsers(_x45, _x46) {
        return _exportUsers.apply(this, arguments);
      }
      return exportUsers;
    }()
    /**
     * Get user activity log
     * GET /api/users/:id/activity
     */
    )
  }, {
    key: "getUserActivity",
    value: (function () {
      var _getUserActivity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
        var id, _this$getPagination3, page, limit, skip, activities;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              id = req.params.id;
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit, skip = _this$getPagination3.skip;
              _context23.n = 1;
              return this.service("activityService").getUserActivities(id, {
                skip: skip,
                limit: limit
              });
            case 1:
              activities = _context23.v;
              return _context23.a(2, this.paginated(res, {
                data: activities.data,
                page: page,
                limit: limit,
                total_items: activities.total
              }));
          }
        }, _callee23, this);
      }));
      function getUserActivity(_x47, _x48) {
        return _getUserActivity.apply(this, arguments);
      }
      return getUserActivity;
    }()
    /**
     * Send password reset email (admin action)
     * POST /api/users/:id/send-password-reset
     */
    )
  }, {
    key: "sendPasswordReset",
    value: (function () {
      var _sendPasswordReset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(req, res) {
        var id, adminId;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context24.n = 1;
              return this.service("userService").sendPasswordResetByAdmin(id, adminId);
            case 1:
              return _context24.a(2, this.success(res, {
                message: "Password reset email sent successfully"
              }));
          }
        }, _callee24, this);
      }));
      function sendPasswordReset(_x49, _x50) {
        return _sendPasswordReset.apply(this, arguments);
      }
      return sendPasswordReset;
    }()
    /**
     * Get individual user statistics
     * GET /api/users/:id/statistics
     */
    )
  }, {
    key: "getUserStatistics",
    value: (function () {
      var _getUserStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(req, res) {
        var id, stats;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              id = req.params.id;
              _context25.n = 1;
              return this.service("userService").getUserStatistics(id);
            case 1:
              stats = _context25.v;
              return _context25.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee25, this);
      }));
      function getUserStatistics(_x51, _x52) {
        return _getUserStatistics.apply(this, arguments);
      }
      return getUserStatistics;
    }())
  }]);
}(_baseController["default"]); // Export both class and singleton instance
var _default = exports["default"] = new UserController();