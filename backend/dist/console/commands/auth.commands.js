"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthCommands = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Authentication Commands
 * Handles login, logout, and session management
 */
var AuthCommands = exports.AuthCommands = /*#__PURE__*/function () {
  function AuthCommands(router) {
    _classCallCheck(this, AuthCommands);
    this.router = router;
    this.ui = router.ui;
    this.authManager = router.authManager;
    this.app = router.app;
  }

  /**
   * Login command
   */
  return _createClass(AuthCommands, [{
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(email) {
        var password, spinner, user, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (email) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return this.ui.question('Email');
            case 1:
              email = _context.v;
            case 2:
              _context.n = 3;
              return this.ui.question('Password', {
                hidden: true
              });
            case 3:
              password = _context.v;
              if (!(!email || !password)) {
                _context.n = 4;
                break;
              }
              this.ui.error('Email and password are required');
              return _context.a(2);
            case 4:
              spinner = this.ui.spinner('Authenticating...');
              _context.p = 5;
              _context.n = 6;
              return this.authManager.login(email, password);
            case 6:
              user = _context.v;
              spinner.stop();

              // Update the app's current user
              this.app.setCurrentUser(user);
              this.ui.success("Welcome back, ".concat(user.name, "!"));
              this.ui.keyValue('Role', user.role, 15);
              this.ui.keyValue('Email', user.email, 15);
              this.ui.newLine();
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              spinner.stop();
              this.ui.error(_t.message);
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[5, 7]]);
      }));
      function login(_x) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * Logout command
     */
    )
  }, {
    key: "logout",
    value: function logout() {
      this.authManager.logout();
      this.app.clearCurrentUser();
      this.ui.success('Logged out successfully');
    }

    /**
     * Show current user info
     */
  }, {
    key: "whoami",
    value: function whoami() {
      var user = this.authManager.getCurrentUser();
      if (!user) {
        this.ui.warning('Not logged in');
        return;
      }
      this.ui.header('Current User', 'user');
      this.ui.keyValue('Name', user.name);
      this.ui.keyValue('Email', user.email);
      this.ui.keyValue('Role', user.role);
      this.ui.keyValue('Permissions', user.permissions.join(', ') || 'None');
      this.ui.keyValue('User ID', user._id);
    }

    /**
     * Change password
     */
  }, {
    key: "changePassword",
    value: (function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var currentPassword, passwordMatch, newPassword, confirmPassword, spinner, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.n = 1;
              return this.ui.question('Current password', {
                hidden: true
              });
            case 1:
              currentPassword = _context2.v;
              passwordMatch = false;
            case 2:
              if (passwordMatch) {
                _context2.n = 5;
                break;
              }
              _context2.n = 3;
              return this.ui.question('New password (min 8 chars)', {
                hidden: true,
                validate: function validate(val) {
                  if (val.length < 8) return 'Password must be at least 8 characters';
                  if (!/[A-Z]/.test(val)) return 'Password must contain at least one uppercase letter';
                  if (!/[a-z]/.test(val)) return 'Password must contain at least one lowercase letter';
                  if (!/[0-9]/.test(val)) return 'Password must contain at least one number';
                  return true;
                }
              });
            case 3:
              newPassword = _context2.v;
              _context2.n = 4;
              return this.ui.question('Confirm new password', {
                hidden: true
              });
            case 4:
              confirmPassword = _context2.v;
              if (newPassword === confirmPassword) {
                passwordMatch = true;
              } else {
                this.ui.error('Passwords do not match. Please try again.');
              }
              _context2.n = 2;
              break;
            case 5:
              spinner = this.ui.spinner('Changing password...');
              _context2.p = 6;
              _context2.n = 7;
              return this.authManager.changePassword(currentPassword, newPassword);
            case 7:
              spinner.stop();
              this.ui.success('Password changed successfully!');
              _context2.n = 9;
              break;
            case 8:
              _context2.p = 8;
              _t2 = _context2.v;
              spinner.stop();
              this.ui.error(_t2.message);
            case 9:
              return _context2.a(2);
          }
        }, _callee2, this, [[6, 8]]);
      }));
      function changePassword() {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }())
  }]);
}();