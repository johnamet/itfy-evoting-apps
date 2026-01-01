"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthManager = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Authentication Manager for Console
 * Handles user authentication within the CLI
 */
var AuthManager = exports.AuthManager = /*#__PURE__*/function () {
  function AuthManager(config) {
    _classCallCheck(this, AuthManager);
    this.config = config;
    this.currentSession = null;
    this.sessionExpiry = null;
  }

  /**
   * Authenticate user with email and password
   */
  return _createClass(AuthManager, [{
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(email, password) {
        var mongoUri, User, user, isValid, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Connect to database
              mongoUri = this.config.get('MONGODB_URI');
              if (mongoUri) {
                _context.n = 1;
                break;
              }
              throw new Error('Database not configured');
            case 1:
              if (!(_mongoose["default"].connection.readyState !== 1)) {
                _context.n = 2;
                break;
              }
              _context.n = 2;
              return _mongoose["default"].connect(mongoUri);
            case 2:
              // Get User model
              User = this.getUserModel(); // Find user with password
              _context.n = 3;
              return User.findOne({
                email: email.toLowerCase(),
                role: {
                  $in: ['super_admin', 'admin', 'organiser', 'moderator']
                }
              }).select('+password_hash');
            case 3:
              user = _context.v;
              if (user) {
                _context.n = 4;
                break;
              }
              throw new Error('Invalid credentials or insufficient permissions');
            case 4:
              if (!(user.status === 'suspended' || user.status === 'deleted')) {
                _context.n = 5;
                break;
              }
              throw new Error('Account is suspended or deleted');
            case 5:
              _context.n = 6;
              return _bcrypt["default"].compare(password, user.password_hash);
            case 6:
              isValid = _context.v;
              if (isValid) {
                _context.n = 7;
                break;
              }
              throw new Error('Invalid credentials');
            case 7:
              _context.n = 8;
              return User.updateOne({
                _id: user._id
              }, {
                last_login: new Date(),
                login_attempts: 0
              });
            case 8:
              // Create session
              this.currentSession = {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions || []
              };

              // Set session expiry (4 hours for console)
              this.sessionExpiry = Date.now() + 4 * 60 * 60 * 1000;
              return _context.a(2, this.currentSession);
            case 9:
              _context.p = 9;
              _t = _context.v;
              throw new Error("Login failed: ".concat(_t.message));
            case 10:
              return _context.a(2);
          }
        }, _callee, this, [[0, 9]]);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * Logout current user
     */
    )
  }, {
    key: "logout",
    value: function logout() {
      this.currentSession = null;
      this.sessionExpiry = null;
      return true;
    }

    /**
     * Check if session is valid
     */
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      if (!this.currentSession) return false;
      if (Date.now() > this.sessionExpiry) {
        this.logout();
        return false;
      }
      return true;
    }

    /**
     * Get current user
     */
  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      if (!this.isAuthenticated()) return null;
      return this.currentSession;
    }

    /**
     * Check if user has specific role
     */
  }, {
    key: "hasRole",
    value: function hasRole(role) {
      if (!this.currentSession) return false;
      var roleHierarchy = {
        'super_admin': ['super_admin', 'admin', 'organiser', 'moderator'],
        'admin': ['admin', 'organiser', 'moderator'],
        'organiser': ['organiser', 'moderator'],
        'moderator': ['moderator']
      };
      var userRoles = roleHierarchy[this.currentSession.role] || [];
      return userRoles.includes(role);
    }

    /**
     * Check if user has specific permission
     */
  }, {
    key: "hasPermission",
    value: function hasPermission(permission) {
      if (!this.currentSession) return false;
      return this.currentSession.permissions.includes(permission) || this.currentSession.permissions.includes('super');
    }

    /**
     * Refresh session
     */
  }, {
    key: "refreshSession",
    value: function refreshSession() {
      if (this.currentSession) {
        this.sessionExpiry = Date.now() + 4 * 60 * 60 * 1000;
      }
    }

    /**
     * Change password for current user
     */
  }, {
    key: "changePassword",
    value: (function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(currentPassword, newPassword) {
        var User, user, isValid, newHash, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (this.currentSession) {
                _context2.n = 1;
                break;
              }
              throw new Error('Not authenticated');
            case 1:
              _context2.p = 1;
              User = this.getUserModel();
              _context2.n = 2;
              return User.findById(this.currentSession._id).select('+password_hash');
            case 2:
              user = _context2.v;
              if (user) {
                _context2.n = 3;
                break;
              }
              throw new Error('User not found');
            case 3:
              _context2.n = 4;
              return _bcrypt["default"].compare(currentPassword, user.password_hash);
            case 4:
              isValid = _context2.v;
              if (isValid) {
                _context2.n = 5;
                break;
              }
              throw new Error('Current password is incorrect');
            case 5:
              _context2.n = 6;
              return _bcrypt["default"].hash(newPassword, 12);
            case 6:
              newHash = _context2.v;
              _context2.n = 7;
              return User.updateOne({
                _id: user._id
              }, {
                password_hash: newHash
              });
            case 7:
              return _context2.a(2, true);
            case 8:
              _context2.p = 8;
              _t2 = _context2.v;
              throw new Error("Password change failed: ".concat(_t2.message));
            case 9:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 8]]);
      }));
      function changePassword(_x3, _x4) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
    /**
     * Get User model
     */
    )
  }, {
    key: "getUserModel",
    value: function getUserModel() {
      if (_mongoose["default"].models.User) {
        return _mongoose["default"].models.User;
      }
      var userSchema = new _mongoose["default"].Schema({
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
        login_attempts: {
          type: Number,
          "default": 0
        }
      }, {
        timestamps: true
      });
      return _mongoose["default"].model('User', userSchema);
    }
  }]);
}();