"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCommands = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * User Management Commands
 * Handles CRUD operations for users
 */
var UserCommands = exports.UserCommands = /*#__PURE__*/function () {
  function UserCommands(router) {
    _classCallCheck(this, UserCommands);
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
    this.authManager = router.authManager;
  }

  /**
   * Get User model
   */
  return _createClass(UserCommands, [{
    key: "getUserModel",
    value: (function () {
      var _getUserModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var userSchema;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.ensureConnection();
            case 1:
              if (!_mongoose["default"].models.User) {
                _context.n = 2;
                break;
              }
              return _context.a(2, _mongoose["default"].models.User);
            case 2:
              userSchema = new _mongoose["default"].Schema({
                name: {
                  type: String,
                  required: true
                },
                email: {
                  type: String,
                  required: true
                },
                password_hash: {
                  type: String,
                  required: true,
                  select: false
                },
                role: {
                  type: String,
                  required: true
                },
                permissions: {
                  type: [String],
                  "default": []
                },
                email_verified: {
                  type: Boolean,
                  "default": false
                },
                status: {
                  type: String,
                  "default": 'active'
                },
                last_login: {
                  type: Date
                },
                bio: {
                  type: String
                },
                photo_url: {
                  type: String
                }
              }, {
                timestamps: true
              });
              return _context.a(2, _mongoose["default"].model('User', userSchema));
          }
        }, _callee, this);
      }));
      function getUserModel() {
        return _getUserModel.apply(this, arguments);
      }
      return getUserModel;
    }()
    /**
     * Ensure database connection
     */
    )
  }, {
    key: "ensureConnection",
    value: (function () {
      var _ensureConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var mongoUri;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(_mongoose["default"].connection.readyState !== 1)) {
                _context2.n = 1;
                break;
              }
              mongoUri = this.config.get('MONGODB_URI');
              _context2.n = 1;
              return _mongoose["default"].connect(mongoUri);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function ensureConnection() {
        return _ensureConnection.apply(this, arguments);
      }
      return ensureConnection;
    }()
    /**
     * List users
     */
    )
  }, {
    key: "listUsers",
    value: (function () {
      var _listUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(args) {
        var options, spinner, User, query, limit, page, skip, _yield$Promise$all, _yield$Promise$all2, users, total, headers, rows, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = this.parseArgs(args);
              spinner = this.ui.spinner('Fetching users...');
              _context3.p = 1;
              _context3.n = 2;
              return this.getUserModel();
            case 2:
              User = _context3.v;
              query = {};
              if (options.role) {
                query.role = options.role;
              }
              if (options.status) {
                query.status = options.status;
              }
              limit = parseInt(options.limit) || 20;
              page = parseInt(options.page) || 1;
              skip = (page - 1) * limit;
              _context3.n = 3;
              return Promise.all([User.find(query).select('name email role status last_login createdAt').sort({
                createdAt: -1
              }).skip(skip).limit(limit).lean(), User.countDocuments(query)]);
            case 3:
              _yield$Promise$all = _context3.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              users = _yield$Promise$all2[0];
              total = _yield$Promise$all2[1];
              spinner.stop();
              if (!(users.length === 0)) {
                _context3.n = 4;
                break;
              }
              this.ui.info('No users found');
              return _context3.a(2);
            case 4:
              this.ui.header("Users (".concat(page, "/").concat(Math.ceil(total / limit), " - ").concat(total, " total)"), 'user');
              headers = ['Name', 'Email', 'Role', 'Status', 'Last Login'];
              rows = users.map(function (user) {
                return [user.name, user.email, user.role, user.status || 'active', user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'];
              });
              this.ui.table(headers, rows);
              this.ui.newLine();
              this.ui.info("Showing ".concat(users.length, " of ").concat(total, " users"));
              if (total > limit) {
                this.ui.info("Use --page=<n> to see more (e.g., user:list --page=2)");
              }
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t = _context3.v;
              spinner.stop();
              this.ui.error("Failed to list users: ".concat(_t.message));
            case 6:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 5]]);
      }));
      function listUsers(_x) {
        return _listUsers.apply(this, arguments);
      }
      return listUsers;
    }()
    /**
     * Create a new user
     */
    )
  }, {
    key: "createUser",
    value: (function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var userData, roleChoice, passwordMatch, confirm, rolePermissions, spinner, User, existing, passwordHash, user, _t2, _t3, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              this.ui.header('Create New User', 'user');
              _context4.n = 1;
              return this.ui.question('Full name', {
                validate: function validate(val) {
                  return val.length >= 2 ? true : 'Name must be at least 2 characters';
                }
              });
            case 1:
              _t2 = _context4.v;
              _context4.n = 2;
              return this.ui.question('Email', {
                validate: function validate(val) {
                  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailRegex.test(val) ? true : 'Invalid email address';
                }
              });
            case 2:
              _t3 = _context4.v;
              userData = {
                name: _t2,
                email: _t3
              };
              _context4.n = 3;
              return this.ui.select('Select role:', [{
                value: 'admin',
                label: 'Admin - Full system access'
              }, {
                value: 'organiser',
                label: 'Organiser - Can manage events and categories'
              }, {
                value: 'moderator',
                label: 'Moderator - Can moderate content'
              }]);
            case 3:
              roleChoice = _context4.v;
              userData.role = roleChoice.value || roleChoice;

              // Password
              passwordMatch = false;
            case 4:
              if (passwordMatch) {
                _context4.n = 7;
                break;
              }
              _context4.n = 5;
              return this.ui.question('Password (min 8 chars)', {
                hidden: true,
                validate: function validate(val) {
                  return val.length >= 8 ? true : 'Password must be at least 8 characters';
                }
              });
            case 5:
              userData.password = _context4.v;
              _context4.n = 6;
              return this.ui.question('Confirm password', {
                hidden: true
              });
            case 6:
              confirm = _context4.v;
              if (userData.password === confirm) {
                passwordMatch = true;
              } else {
                this.ui.error('Passwords do not match');
              }
              _context4.n = 4;
              break;
            case 7:
              // Permissions based on role
              rolePermissions = {
                super_admin: ['read', 'write', 'update', 'delete', 'super'],
                admin: ['read', 'write', 'update', 'delete'],
                organiser: ['read', 'write', 'update'],
                moderator: ['read', 'write']
              };
              userData.permissions = rolePermissions[userData.role] || ['read'];
              spinner = this.ui.spinner('Creating user...');
              _context4.p = 8;
              _context4.n = 9;
              return this.getUserModel();
            case 9:
              User = _context4.v;
              _context4.n = 10;
              return User.findOne({
                email: userData.email
              });
            case 10:
              existing = _context4.v;
              if (!existing) {
                _context4.n = 11;
                break;
              }
              spinner.stop();
              this.ui.error('A user with this email already exists');
              return _context4.a(2);
            case 11:
              _context4.n = 12;
              return _bcrypt["default"].hash(userData.password, 12);
            case 12:
              passwordHash = _context4.v;
              _context4.n = 13;
              return User.create({
                name: userData.name,
                email: userData.email,
                password_hash: passwordHash,
                role: userData.role,
                permissions: userData.permissions,
                email_verified: true,
                status: 'active'
              });
            case 13:
              user = _context4.v;
              spinner.stop();
              this.ui.success("User created successfully!");
              this.ui.keyValue('ID', user._id.toString());
              this.ui.keyValue('Name', user.name);
              this.ui.keyValue('Email', user.email);
              this.ui.keyValue('Role', user.role);
              _context4.n = 15;
              break;
            case 14:
              _context4.p = 14;
              _t4 = _context4.v;
              spinner.stop();
              this.ui.error("Failed to create user: ".concat(_t4.message));
            case 15:
              return _context4.a(2);
          }
        }, _callee4, this, [[8, 14]]);
      }));
      function createUser() {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
    /**
     * View user details
     */
    )
  }, {
    key: "viewUser",
    value: (function () {
      var _viewUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(identifier) {
        var spinner, _user$permissions, User, query, user, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              if (identifier) {
                _context5.n = 1;
                break;
              }
              this.ui.error('Please provide an email or user ID');
              this.ui.info('Usage: user:view <email|id>');
              return _context5.a(2);
            case 1:
              spinner = this.ui.spinner('Fetching user...');
              _context5.p = 2;
              _context5.n = 3;
              return this.getUserModel();
            case 3:
              User = _context5.v;
              query = _mongoose["default"].Types.ObjectId.isValid(identifier) ? {
                _id: identifier
              } : {
                email: identifier
              };
              _context5.n = 4;
              return User.findOne(query).lean();
            case 4:
              user = _context5.v;
              spinner.stop();
              if (user) {
                _context5.n = 5;
                break;
              }
              this.ui.error('User not found');
              return _context5.a(2);
            case 5:
              this.ui.header('User Details', 'user');
              this.ui.keyValue('ID', user._id.toString(), 20);
              this.ui.keyValue('Name', user.name, 20);
              this.ui.keyValue('Email', user.email, 20);
              this.ui.keyValue('Role', user.role, 20);
              this.ui.keyValue('Permissions', ((_user$permissions = user.permissions) === null || _user$permissions === void 0 ? void 0 : _user$permissions.join(', ')) || 'None', 20);
              this.ui.keyValue('Status', user.status || 'active', 20);
              this.ui.keyValue('Email Verified', user.email_verified ? 'Yes' : 'No', 20);
              this.ui.keyValue('Last Login', user.last_login ? new Date(user.last_login).toLocaleString() : 'Never', 20);
              this.ui.keyValue('Created', new Date(user.createdAt).toLocaleString(), 20);
              this.ui.keyValue('Updated', new Date(user.updatedAt).toLocaleString(), 20);
              if (user.bio) {
                this.ui.newLine();
                this.ui.subheader('Bio');
                this.ui.print(user.bio, 'dim');
              }
              _context5.n = 7;
              break;
            case 6:
              _context5.p = 6;
              _t5 = _context5.v;
              spinner.stop();
              this.ui.error("Failed to fetch user: ".concat(_t5.message));
            case 7:
              return _context5.a(2);
          }
        }, _callee5, this, [[2, 6]]);
      }));
      function viewUser(_x2) {
        return _viewUser.apply(this, arguments);
      }
      return viewUser;
    }()
    /**
     * Edit user
     */
    )
  }, {
    key: "editUser",
    value: (function () {
      var _editUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(identifier) {
        var User, query, user, updates, newName, newEmail, newStatus, statusValue, confirm, spinner, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (identifier) {
                _context6.n = 1;
                break;
              }
              this.ui.error('Please provide an email or user ID');
              return _context6.a(2);
            case 1:
              _context6.p = 1;
              _context6.n = 2;
              return this.getUserModel();
            case 2:
              User = _context6.v;
              query = _mongoose["default"].Types.ObjectId.isValid(identifier) ? {
                _id: identifier
              } : {
                email: identifier
              };
              _context6.n = 3;
              return User.findOne(query);
            case 3:
              user = _context6.v;
              if (user) {
                _context6.n = 4;
                break;
              }
              this.ui.error('User not found');
              return _context6.a(2);
            case 4:
              this.ui.header("Edit User: ".concat(user.name), 'user');
              this.ui.info('Press Enter to keep current value');
              this.ui.newLine();
              updates = {};
              _context6.n = 5;
              return this.ui.question('Name', {
                defaultValue: user.name
              });
            case 5:
              newName = _context6.v;
              if (newName !== user.name) updates.name = newName;
              _context6.n = 6;
              return this.ui.question('Email', {
                defaultValue: user.email
              });
            case 6:
              newEmail = _context6.v;
              if (newEmail !== user.email) updates.email = newEmail;
              _context6.n = 7;
              return this.ui.select('Status:', [{
                value: user.status || 'active',
                label: "".concat(user.status || 'active', " (current)")
              }, {
                value: 'active',
                label: 'Active'
              }, {
                value: 'inactive',
                label: 'Inactive'
              }, {
                value: 'suspended',
                label: 'Suspended'
              }]);
            case 7:
              newStatus = _context6.v;
              statusValue = newStatus.value || newStatus;
              if (statusValue !== user.status) updates.status = statusValue;
              if (!(Object.keys(updates).length === 0)) {
                _context6.n = 8;
                break;
              }
              this.ui.info('No changes made');
              return _context6.a(2);
            case 8:
              _context6.n = 9;
              return this.ui.confirm('Save changes?', true);
            case 9:
              confirm = _context6.v;
              if (confirm) {
                _context6.n = 10;
                break;
              }
              this.ui.info('Cancelled');
              return _context6.a(2);
            case 10:
              spinner = this.ui.spinner('Updating user...');
              _context6.n = 11;
              return User.updateOne({
                _id: user._id
              }, updates);
            case 11:
              spinner.stop();
              this.ui.success('User updated successfully!');
              _context6.n = 13;
              break;
            case 12:
              _context6.p = 12;
              _t6 = _context6.v;
              this.ui.error("Failed to edit user: ".concat(_t6.message));
            case 13:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 12]]);
      }));
      function editUser(_x3) {
        return _editUser.apply(this, arguments);
      }
      return editUser;
    }()
    /**
     * Delete user
     */
    )
  }, {
    key: "deleteUser",
    value: (function () {
      var _deleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(identifier) {
        var User, query, user, currentUser, adminCount, confirm, hardDelete, spinner, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              if (identifier) {
                _context7.n = 1;
                break;
              }
              this.ui.error('Please provide an email or user ID');
              return _context7.a(2);
            case 1:
              _context7.p = 1;
              _context7.n = 2;
              return this.getUserModel();
            case 2:
              User = _context7.v;
              query = _mongoose["default"].Types.ObjectId.isValid(identifier) ? {
                _id: identifier
              } : {
                email: identifier
              };
              _context7.n = 3;
              return User.findOne(query);
            case 3:
              user = _context7.v;
              if (user) {
                _context7.n = 4;
                break;
              }
              this.ui.error('User not found');
              return _context7.a(2);
            case 4:
              // Prevent deleting yourself
              currentUser = this.authManager.getCurrentUser();
              if (!(currentUser && currentUser._id === user._id.toString())) {
                _context7.n = 5;
                break;
              }
              this.ui.error('You cannot delete your own account');
              return _context7.a(2);
            case 5:
              if (!(user.role === 'super_admin')) {
                _context7.n = 7;
                break;
              }
              _context7.n = 6;
              return User.countDocuments({
                role: 'super_admin'
              });
            case 6:
              adminCount = _context7.v;
              if (!(adminCount <= 1)) {
                _context7.n = 7;
                break;
              }
              this.ui.error('Cannot delete the last super admin');
              return _context7.a(2);
            case 7:
              this.ui.warning("You are about to delete user: ".concat(user.name, " (").concat(user.email, ")"));
              _context7.n = 8;
              return this.ui.confirm('Are you sure?', false);
            case 8:
              confirm = _context7.v;
              if (confirm) {
                _context7.n = 9;
                break;
              }
              this.ui.info('Cancelled');
              return _context7.a(2);
            case 9:
              _context7.n = 10;
              return this.ui.confirm('Permanently delete? (No = soft delete)', false);
            case 10:
              hardDelete = _context7.v;
              spinner = this.ui.spinner('Deleting user...');
              if (!hardDelete) {
                _context7.n = 12;
                break;
              }
              _context7.n = 11;
              return User.deleteOne({
                _id: user._id
              });
            case 11:
              _context7.n = 13;
              break;
            case 12:
              _context7.n = 13;
              return User.updateOne({
                _id: user._id
              }, {
                status: 'deleted'
              });
            case 13:
              spinner.stop();
              this.ui.success("User ".concat(hardDelete ? 'permanently deleted' : 'soft deleted', " successfully!"));
              _context7.n = 15;
              break;
            case 14:
              _context7.p = 14;
              _t7 = _context7.v;
              this.ui.error("Failed to delete user: ".concat(_t7.message));
            case 15:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 14]]);
      }));
      function deleteUser(_x4) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
    /**
     * Change user role
     */
    )
  }, {
    key: "changeRole",
    value: (function () {
      var _changeRole = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(identifier, newRole) {
        var validRoles, roleChoice, User, query, user, currentUser, rolePermissions, spinner, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              if (identifier) {
                _context8.n = 1;
                break;
              }
              this.ui.error('Please provide an email or user ID');
              return _context8.a(2);
            case 1:
              validRoles = ['super_admin', 'admin', 'organiser', 'moderator'];
              if (newRole) {
                _context8.n = 3;
                break;
              }
              _context8.n = 2;
              return this.ui.select('Select new role:', validRoles.map(function (r) {
                return {
                  value: r,
                  label: r
                };
              }));
            case 2:
              roleChoice = _context8.v;
              newRole = roleChoice.value || roleChoice;
            case 3:
              if (validRoles.includes(newRole)) {
                _context8.n = 4;
                break;
              }
              this.ui.error("Invalid role. Must be one of: ".concat(validRoles.join(', ')));
              return _context8.a(2);
            case 4:
              _context8.p = 4;
              _context8.n = 5;
              return this.getUserModel();
            case 5:
              User = _context8.v;
              query = _mongoose["default"].Types.ObjectId.isValid(identifier) ? {
                _id: identifier
              } : {
                email: identifier
              };
              _context8.n = 6;
              return User.findOne(query);
            case 6:
              user = _context8.v;
              if (user) {
                _context8.n = 7;
                break;
              }
              this.ui.error('User not found');
              return _context8.a(2);
            case 7:
              // Prevent changing your own role
              currentUser = this.authManager.getCurrentUser();
              if (!(currentUser && currentUser._id === user._id.toString())) {
                _context8.n = 8;
                break;
              }
              this.ui.error('You cannot change your own role');
              return _context8.a(2);
            case 8:
              if (!(newRole === 'super_admin' && !this.authManager.hasRole('super_admin'))) {
                _context8.n = 9;
                break;
              }
              this.ui.error('Only super admins can promote users to super admin');
              return _context8.a(2);
            case 9:
              rolePermissions = {
                super_admin: ['read', 'write', 'update', 'delete', 'super'],
                admin: ['read', 'write', 'update', 'delete'],
                organiser: ['read', 'write', 'update'],
                moderator: ['read', 'write']
              };
              spinner = this.ui.spinner('Updating role...');
              _context8.n = 10;
              return User.updateOne({
                _id: user._id
              }, {
                role: newRole,
                permissions: rolePermissions[newRole]
              });
            case 10:
              spinner.stop();
              this.ui.success("User role changed from ".concat(user.role, " to ").concat(newRole));
              _context8.n = 12;
              break;
            case 11:
              _context8.p = 11;
              _t8 = _context8.v;
              this.ui.error("Failed to change role: ".concat(_t8.message));
            case 12:
              return _context8.a(2);
          }
        }, _callee8, this, [[4, 11]]);
      }));
      function changeRole(_x5, _x6) {
        return _changeRole.apply(this, arguments);
      }
      return changeRole;
    }()
    /**
     * Reset user password
     */
    )
  }, {
    key: "resetPassword",
    value: (function () {
      var _resetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(identifier) {
        var User, query, user, passwordMatch, newPassword, confirm, spinner, passwordHash, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              if (identifier) {
                _context9.n = 1;
                break;
              }
              this.ui.error('Please provide an email or user ID');
              return _context9.a(2);
            case 1:
              _context9.p = 1;
              _context9.n = 2;
              return this.getUserModel();
            case 2:
              User = _context9.v;
              query = _mongoose["default"].Types.ObjectId.isValid(identifier) ? {
                _id: identifier
              } : {
                email: identifier
              };
              _context9.n = 3;
              return User.findOne(query);
            case 3:
              user = _context9.v;
              if (user) {
                _context9.n = 4;
                break;
              }
              this.ui.error('User not found');
              return _context9.a(2);
            case 4:
              this.ui.info("Resetting password for: ".concat(user.name, " (").concat(user.email, ")"));
              passwordMatch = false;
            case 5:
              if (passwordMatch) {
                _context9.n = 8;
                break;
              }
              _context9.n = 6;
              return this.ui.question('New password (min 8 chars)', {
                hidden: true,
                validate: function validate(val) {
                  return val.length >= 8 ? true : 'Password must be at least 8 characters';
                }
              });
            case 6:
              newPassword = _context9.v;
              _context9.n = 7;
              return this.ui.question('Confirm password', {
                hidden: true
              });
            case 7:
              confirm = _context9.v;
              if (newPassword === confirm) {
                passwordMatch = true;
              } else {
                this.ui.error('Passwords do not match');
              }
              _context9.n = 5;
              break;
            case 8:
              spinner = this.ui.spinner('Resetting password...');
              _context9.n = 9;
              return _bcrypt["default"].hash(newPassword, 12);
            case 9:
              passwordHash = _context9.v;
              _context9.n = 10;
              return User.updateOne({
                _id: user._id
              }, {
                password_hash: passwordHash
              });
            case 10:
              spinner.stop();
              this.ui.success('Password reset successfully!');
              _context9.n = 12;
              break;
            case 11:
              _context9.p = 11;
              _t9 = _context9.v;
              this.ui.error("Failed to reset password: ".concat(_t9.message));
            case 12:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 11]]);
      }));
      function resetPassword(_x7) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
    /**
     * Parse command arguments
     */
    )
  }, {
    key: "parseArgs",
    value: function parseArgs(args) {
      var options = {};
      var _iterator = _createForOfIteratorHelper(args),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var arg = _step.value;
          if (arg.startsWith('--')) {
            var _arg$slice$split = arg.slice(2).split('='),
              _arg$slice$split2 = _slicedToArray(_arg$slice$split, 2),
              key = _arg$slice$split2[0],
              value = _arg$slice$split2[1];
            options[key] = value || true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return options;
    }
  }]);
}();