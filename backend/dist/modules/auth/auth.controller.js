"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AuthController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _authService = _interopRequireDefault(require("./auth.service.js"));
var _authValidation = _interopRequireDefault(require("./auth.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Auth Controller
 * Handles HTTP requests for authentication operations
 */
var AuthController = exports.AuthController = /*#__PURE__*/function (_BaseController) {
  function AuthController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, AuthController);
    return _callSuper(this, AuthController, [{
      authService: dependencies.authService || _authService["default"]
    }]);
  }

  // ==================== USER AUTHENTICATION ====================

  /**
   * Register a new user
   * POST /api/auth/register
   */
  _inherits(AuthController, _BaseController);
  return _createClass(AuthController, [{
    key: "register",
    value: function () {
      var _register = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].registerSchema);
              _context.n = 1;
              return this.service("authService").registerUser(validated);
            case 1:
              result = _context.v;
              return _context.a(2, this.created(res, {
                data: {
                  user: result.user,
                  access_token: result.accessToken,
                  refresh_token: result.refreshToken,
                  expires_in: result.expiresIn
                },
                message: result.message
              }));
          }
        }, _callee, this);
      }));
      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }
      return register;
    }()
    /**
     * Login user
     * POST /api/auth/login
     */
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var validated, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].loginSchema);
              _context2.n = 1;
              return this.service("authService").loginUser(validated, {
                ipAddress: this.getClientIP(req),
                userAgent: req.headers["user-agent"]
              });
            case 1:
              result = _context2.v;
              return _context2.a(2, this.success(res, {
                data: {
                  user: result.user,
                  access_token: result.accessToken,
                  refresh_token: result.refreshToken,
                  expires_in: result.expiresIn
                },
                message: "Login successful"
              }));
          }
        }, _callee2, this);
      }));
      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * Logout user
     * POST /api/auth/logout
     */
    )
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var userId, refreshToken;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              userId = this.getUserId(req);
              refreshToken = req.body.refresh_token;
              _context3.n = 1;
              return this.service("authService").logoutUser(userId, refreshToken);
            case 1:
              return _context3.a(2, this.success(res, {
                message: "Logged out successfully"
              }));
          }
        }, _callee3, this);
      }));
      function logout(_x5, _x6) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * Refresh access token
     * POST /api/auth/refresh-token
     */
    )
  }, {
    key: "refreshToken",
    value: (function () {
      var _refreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var validated, result;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].refreshTokenSchema);
              _context4.n = 1;
              return this.service("authService").refreshAccessToken(validated.refresh_token);
            case 1:
              result = _context4.v;
              return _context4.a(2, this.success(res, {
                data: {
                  access_token: result.accessToken,
                  refresh_token: result.refreshToken,
                  expires_in: result.expiresIn
                },
                message: "Token refreshed successfully"
              }));
          }
        }, _callee4, this);
      }));
      function refreshToken(_x7, _x8) {
        return _refreshToken.apply(this, arguments);
      }
      return refreshToken;
    }()
    /**
     * Verify email
     * POST /api/auth/verify-email
     */
    )
  }, {
    key: "verifyEmail",
    value: (function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var validated;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].verifyEmailSchema);
              _context5.n = 1;
              return this.service("authService").verifyEmail(validated, "user");
            case 1:
              return _context5.a(2, this.success(res, {
                message: "Email verified successfully"
              }));
          }
        }, _callee5, this);
      }));
      function verifyEmail(_x9, _x0) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
    /**
     * Resend verification email
     * POST /api/auth/resend-verification
     */
    )
  }, {
    key: "resendVerification",
    value: (function () {
      var _resendVerification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var validated;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].resendVerificationSchema);
              _context6.n = 1;
              return this.service("authService").resendVerificationEmail(validated.email);
            case 1:
              return _context6.a(2, this.success(res, {
                message: "Verification email sent"
              }));
          }
        }, _callee6, this);
      }));
      function resendVerification(_x1, _x10) {
        return _resendVerification.apply(this, arguments);
      }
      return resendVerification;
    }()
    /**
     * Request password reset
     * POST /api/auth/forgot-password
     */
    )
  }, {
    key: "forgotPassword",
    value: (function () {
      var _forgotPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var validated;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].forgotPasswordSchema);
              _context7.n = 1;
              return this.service("authService").requestPasswordReset(validated, "user");
            case 1:
              return _context7.a(2, this.success(res, {
                message: "If an account exists with this email, a password reset link has been sent"
              }));
          }
        }, _callee7, this);
      }));
      function forgotPassword(_x11, _x12) {
        return _forgotPassword.apply(this, arguments);
      }
      return forgotPassword;
    }()
    /**
     * Reset password
     * POST /api/auth/reset-password
     */
    )
  }, {
    key: "resetPassword",
    value: (function () {
      var _resetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var validated;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].resetPasswordSchema);
              _context8.n = 1;
              return this.service("authService").resetPassword(validated, "user");
            case 1:
              return _context8.a(2, this.success(res, {
                message: "Password reset successfully"
              }));
          }
        }, _callee8, this);
      }));
      function resetPassword(_x13, _x14) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }()
    /**
     * Change password (authenticated)
     * POST /api/auth/change-password
     */
    )
  }, {
    key: "changePassword",
    value: (function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var userId, validated, _t;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              console.log("Change password request received");
              userId = this.getUserId(req);
              _context9.p = 1;
              console.log("Request body:", req.body);
              validated = this.validate(req.body, _authValidation["default"].changePasswordSchema);
              _context9.n = 2;
              return this.service("authService").changePassword(userId, validated, "user");
            case 2:
              _context9.n = 4;
              break;
            case 3:
              _context9.p = 3;
              _t = _context9.v;
              return _context9.a(2, this.error(res, {
                message: _t,
                status_code: _t.status_code || 400
              }));
            case 4:
              return _context9.a(2, this.success(res, {
                message: "Password changed successfully"
              }));
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function changePassword(_x15, _x16) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
    /**
     * Change candidate password (authenticated)
     * POST /api/auth/candidate/change-password
     */
    )
  }, {
    key: "candidateChangePassword",
    value: (function () {
      var _candidateChangePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var candidateId, validated;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              candidateId = this.getUserId(req);
              validated = this.validate(req.body, _authValidation["default"].changePasswordSchema);
              _context0.n = 1;
              return this.service("authService").changePassword(candidateId, validated, "candidate");
            case 1:
              return _context0.a(2, this.success(res, {
                message: "Password changed successfully"
              }));
          }
        }, _callee0, this);
      }));
      function candidateChangePassword(_x17, _x18) {
        return _candidateChangePassword.apply(this, arguments);
      }
      return candidateChangePassword;
    }()
    /**
     * Get current user profile
     * GET /api/auth/me
     */
    )
  }, {
    key: "me",
    value: (function () {
      var _me = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var userId, user;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              userId = this.getUserId(req);
              _context1.n = 1;
              return this.service("authService").getCurrentUser(userId, "user");
            case 1:
              user = _context1.v;
              return _context1.a(2, this.success(res, {
                data: user
              }));
          }
        }, _callee1, this);
      }));
      function me(_x19, _x20) {
        return _me.apply(this, arguments);
      }
      return me;
    }() // ==================== CANDIDATE AUTHENTICATION ====================
    /**
     * Candidate login
     * POST /api/auth/candidate/login
     */
    )
  }, {
    key: "candidateLogin",
    value: function () {
      var _candidateLogin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var validated, result;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].candidateLoginSchema);
              _context10.n = 1;
              return this.service("authService").loginCandidate(validated, {
                ipAddress: this.getClientIP(req),
                userAgent: req.headers["user-agent"]
              });
            case 1:
              result = _context10.v;
              return _context10.a(2, this.success(res, {
                data: {
                  candidate: result.candidate,
                  access_token: result.accessToken,
                  refresh_token: result.refreshToken,
                  expires_in: result.expiresIn
                },
                message: "Login successful"
              }));
          }
        }, _callee10, this);
      }));
      function candidateLogin(_x21, _x22) {
        return _candidateLogin.apply(this, arguments);
      }
      return candidateLogin;
    }()
    /**
     * Candidate logout
     * POST /api/auth/candidate/logout
     */
  }, {
    key: "candidateLogout",
    value: (function () {
      var _candidateLogout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var candidateId, refreshToken;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              candidateId = this.getUserId(req);
              refreshToken = req.body.refresh_token;
              _context11.n = 1;
              return this.service("authService").logoutCandidate(candidateId, refreshToken);
            case 1:
              return _context11.a(2, this.success(res, {
                message: "Logged out successfully"
              }));
          }
        }, _callee11, this);
      }));
      function candidateLogout(_x23, _x24) {
        return _candidateLogout.apply(this, arguments);
      }
      return candidateLogout;
    }()
    /**
     * Candidate forgot password
     * POST /api/auth/candidate/forgot-password
     */
    )
  }, {
    key: "candidateForgotPassword",
    value: (function () {
      var _candidateForgotPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var validated;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].forgotPasswordSchema);
              _context12.n = 1;
              return this.service("authService").requestPasswordReset(validated, "candidate");
            case 1:
              return _context12.a(2, this.success(res, {
                message: "If an account exists with this email, a password reset link has been sent"
              }));
          }
        }, _callee12, this);
      }));
      function candidateForgotPassword(_x25, _x26) {
        return _candidateForgotPassword.apply(this, arguments);
      }
      return candidateForgotPassword;
    }()
    /**
     * Candidate reset password
     * POST /api/auth/candidate/reset-password
     */
    )
  }, {
    key: "candidateResetPassword",
    value: (function () {
      var _candidateResetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var validated;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              validated = this.validate(req.body, _authValidation["default"].resetPasswordSchema);
              _context13.n = 1;
              return this.service("authService").resetPassword(validated, "candidate");
            case 1:
              return _context13.a(2, this.success(res, {
                message: "Password reset successfully"
              }));
          }
        }, _callee13, this);
      }));
      function candidateResetPassword(_x27, _x28) {
        return _candidateResetPassword.apply(this, arguments);
      }
      return candidateResetPassword;
    }()
    /**
     * Get current candidate profile
     * GET /api/auth/candidate/me
     */
    )
  }, {
    key: "candidateMe",
    value: (function () {
      var _candidateMe = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var candidateId, candidate;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              candidateId = this.getUserId(req);
              _context14.n = 1;
              return this.service("authService").getCurrentUser(candidateId, "candidate");
            case 1:
              candidate = _context14.v;
              return _context14.a(2, this.success(res, {
                data: candidate
              }));
          }
        }, _callee14, this);
      }));
      function candidateMe(_x29, _x30) {
        return _candidateMe.apply(this, arguments);
      }
      return candidateMe;
    }())
  }]);
}(_baseController["default"]); // Export both class and singleton instance
var _default = exports["default"] = new AuthController();