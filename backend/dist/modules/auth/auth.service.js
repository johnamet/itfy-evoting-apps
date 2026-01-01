"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AuthService = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _userRepository = _interopRequireDefault(require("../user/user.repository.js"));
var _candidateRepository = _interopRequireDefault(require("../candidate/candidate.repository.js"));
var _authValidation = _interopRequireDefault(require("./auth.validation.js"));
var _authHelper = require("../../utils/helpers/auth.helper.js");
var _cacheUtils = require("../../utils/cache/cache.utils.js");
var _agendaService = _interopRequireDefault(require("../../services/agenda.service.js"));
var _fileService = _interopRequireDefault(require("../../services/file.service.js"));
var _candidateConstants = require("../../utils/constants/candidate.constants.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _authConstants = require("../../utils/constants/auth.constants.js");
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
 * Centralized Authentication Service
 * Handles authentication for both users and candidates
 * Supports login, registration, password management, and token operations
 */
_baseService["default"].setValidation(_authValidation["default"]);
var AuthService = exports.AuthService = /*#__PURE__*/function (_BaseService) {
  function AuthService() {
    var _this;
    _classCallCheck(this, AuthService);
    _this = _callSuper(this, AuthService);
    _this.userRepository = _userRepository["default"];
    _this.candidateRepository = _candidateRepository["default"];
    return _this;
  }

  // ==================== USER AUTHENTICATION ====================

  /**
   * Register a new user
   * @param {Object} data - { name, email, password, confirmPassword, role }
   * @returns {Promise<Object>} - { user, accessToken, refreshToken }
   */
  _inherits(AuthService, _BaseService);
  return _createClass(AuthService, [{
    key: "registerUser",
    value: function () {
      var _registerUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
        var validated, existingUser, passwordHash, user, verificationToken, verificationUrl, accessToken, refreshToken, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate input
              validated = this.validate(data, _authValidation["default"].registerSchema); // Check if user already exists
              _context.n = 1;
              return this.userRepository.findByEmail(validated.email);
            case 1:
              existingUser = _context.v;
              if (!existingUser) {
                _context.n = 2;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS);
            case 2:
              _context.n = 3;
              return _authHelper.AuthHelpers.hashPassword(validated.password);
            case 3:
              passwordHash = _context.v;
              _context.n = 4;
              return this.userRepository.create({
                name: validated.name,
                email: validated.email,
                password_hash: passwordHash,
                role: validated.role || _userConstants.ROLES.VOTER,
                email_verified: false
              });
            case 4:
              user = _context.v;
              _context.n = 5;
              return _authHelper.AuthHelpers.generateAndStoreVerificationToken(user._id.toString());
            case 5:
              verificationToken = _context.v;
              // Queue verification email
              verificationUrl = "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/verify-email?token=").concat(verificationToken);
              _context.n = 6;
              return _agendaService["default"].now("send-email-verification", {
                email: user.email,
                name: user.name,
                verificationUrl: verificationUrl
              });
            case 6:
              // Generate auth tokens
              accessToken = _authHelper.AuthHelpers.generateToken(user._id.toString(), user.role, "access");
              refreshToken = _authHelper.AuthHelpers.generateToken(user._id.toString(), user.role, "refresh"); // Store refresh token
              _context.n = 7;
              return _authHelper.AuthHelpers.storeRefreshToken(user._id.toString(), refreshToken);
            case 7:
              return _context.a(2, {
                success: true,
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  email_verified: user.email_verified
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: _authConstants.JWT_EXPIRATION.ACCESS_TOKEN,
                message: "Registration successful. Please check your email to verify your account."
              });
            case 8:
              _context.p = 8;
              _t = _context.v;
              throw new Error("User registration failed: ".concat(_t.message));
            case 9:
              return _context.a(2);
          }
        }, _callee, this, [[0, 8]]);
      }));
      function registerUser(_x) {
        return _registerUser.apply(this, arguments);
      }
      return registerUser;
    }()
    /**
     * Login user
     * @param {Object} data - { email, password }
     * @param {Object} metadata - { ip, userAgent }
     * @returns {Promise<Object>} - { user, accessToken, refreshToken }
     */
  }, {
    key: "loginUser",
    value: (function () {
      var _loginUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
        var metadata,
          validated,
          rateLimitKey,
          attempts,
          user,
          passwordHash,
          isValid,
          minutesLeft,
          accessToken,
          refreshToken,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              metadata = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].loginSchema); // Rate limiting
              rateLimitKey = "login_attempts:".concat(metadata.ip || "unknown", ":").concat(validated.email);
              _context2.n = 2;
              return _cacheUtils.cache.get(rateLimitKey);
            case 2:
              attempts = _context2.v;
              if (!(attempts && parseInt(attempts) >= _authConstants.MAX_LOGIN_ATTEMPTS)) {
                _context2.n = 3;
                break;
              }
              throw new Error("Too many login attempts. Please try again in ".concat(_authConstants.ACCOUNT_LOCK_DURATION_MINUTES, " minutes."));
            case 3:
              _context2.n = 4;
              return this.userRepository.model.findOne({
                email: validated.email
              }).select("+password_hash +login_attempts +locked_until");
            case 4:
              user = _context2.v;
              // Use dummy hash if user doesn't exist (prevent timing attacks)
              passwordHash = (user === null || user === void 0 ? void 0 : user.password_hash) || "$2b$10$X/invalid/hash/that/will/never/match/anythingXXXXXXXXXXXXXXXXX";
              _context2.n = 5;
              return _bcryptjs["default"].compare(validated.password, passwordHash);
            case 5:
              isValid = _context2.v;
              if (user) {
                _context2.n = 7;
                break;
              }
              _context2.n = 6;
              return this._incrementRateLimit(rateLimitKey);
            case 6:
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_CREDENTIALS);
            case 7:
              if (!(user.locked_until && user.locked_until > new Date())) {
                _context2.n = 8;
                break;
              }
              minutesLeft = Math.ceil((user.locked_until - new Date()) / 60000);
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_LOCKED.replace("{duration}", minutesLeft));
            case 8:
              if (isValid) {
                _context2.n = 11;
                break;
              }
              _context2.n = 9;
              return this._handleFailedLogin(user, this.userRepository);
            case 9:
              _context2.n = 10;
              return this._incrementRateLimit(rateLimitKey);
            case 10:
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_CREDENTIALS);
            case 11:
              if (!(user.login_attempts > 0)) {
                _context2.n = 12;
                break;
              }
              _context2.n = 12;
              return this.userRepository.updateById(user._id, {
                login_attempts: 0,
                locked_until: null
              });
            case 12:
              _context2.n = 13;
              return _cacheUtils.cache.del(rateLimitKey);
            case 13:
              _context2.n = 14;
              return this.userRepository.updateById(user._id, {
                last_login: new Date()
              });
            case 14:
              // Generate tokens
              accessToken = _authHelper.AuthHelpers.generateToken(user._id.toString(), user.role, "access");
              refreshToken = _authHelper.AuthHelpers.generateToken(user._id.toString(), user.role, "refresh"); // Store refresh token
              _context2.n = 15;
              return _authHelper.AuthHelpers.storeRefreshToken(user._id.toString(), refreshToken);
            case 15:
              if (!metadata.userAgent) {
                _context2.n = 16;
                break;
              }
              _context2.n = 16;
              return _cacheUtils.cache.set("device:".concat(user._id), JSON.stringify({
                userAgent: metadata.userAgent,
                ip: metadata.ip,
                lastLogin: new Date()
              }), "EX", 30 * 24 * 60 * 60 // 30 days
              );
            case 16:
              return _context2.a(2, {
                success: true,
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  email_verified: user.email_verified
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: _authConstants.JWT_EXPIRATION.ACCESS_TOKEN
              });
            case 17:
              _context2.p = 17;
              _t2 = _context2.v;
              throw new Error("User login failed: ".concat(_t2.message));
            case 18:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 17]]);
      }));
      function loginUser(_x2) {
        return _loginUser.apply(this, arguments);
      }
      return loginUser;
    }() // ==================== CANDIDATE AUTHENTICATION ====================
    /**
     * Register a new candidate (with password)
     * @param {Object} data - { name, email, password, eventId, categories, bio, phone, social_media }
     * @returns {Promise<Object>} - { candidate, accessToken, refreshToken }
     */
    )
  }, {
    key: "registerCandidate",
    value: function () {
      var _registerCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
        var validated, existingCandidate, passwordHash, candidate, accessToken, refreshToken, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              // Validate input
              validated = this.validate(data, _authValidation["default"].candidateRegisterSchema); // Check if candidate already exists
              _context3.n = 1;
              return this.candidateRepository.findByEmail(validated.email, validated.eventId);
            case 1:
              existingCandidate = _context3.v;
              if (!existingCandidate) {
                _context3.n = 2;
                break;
              }
              throw new Error("A candidate with this email already exists for this event");
            case 2:
              _context3.n = 3;
              return _authHelper.AuthHelpers.hashPassword(validated.password);
            case 3:
              passwordHash = _context3.v;
              _context3.n = 4;
              return this.candidateRepository.create({
                name: validated.name,
                email: validated.email,
                password_hash: passwordHash,
                event: validated.eventId,
                categories: validated.categories,
                bio: validated.bio,
                phone: validated.phone,
                social_media: validated.social_media,
                status: _candidateConstants.STATUS.PENDING,
                is_published: false
              });
            case 4:
              candidate = _context3.v;
              _context3.n = 5;
              return _agendaService["default"].now("send-candidate-welcome-email", {
                email: candidate.email,
                name: candidate.name,
                candidateCode: candidate.candidate_code
              });
            case 5:
              // Generate auth tokens
              accessToken = _authHelper.AuthHelpers.generateToken(candidate._id.toString(), "candidate", "access");
              refreshToken = _authHelper.AuthHelpers.generateToken(candidate._id.toString(), "candidate", "refresh"); // Store refresh token
              _context3.n = 6;
              return _authHelper.AuthHelpers.storeRefreshToken(candidate._id.toString(), refreshToken);
            case 6:
              return _context3.a(2, {
                success: true,
                candidate: {
                  _id: candidate._id,
                  name: candidate.name,
                  email: candidate.email,
                  candidate_code: candidate.candidate_code,
                  status: candidate.status,
                  event: candidate.event
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: _authConstants.JWT_EXPIRATION.ACCESS_TOKEN,
                message: "Registration successful. Your profile will be reviewed by the administrator."
              });
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              throw new Error("Candidate registration failed: ".concat(_t3.message));
            case 8:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 7]]);
      }));
      function registerCandidate(_x3) {
        return _registerCandidate.apply(this, arguments);
      }
      return registerCandidate;
    }()
    /**
     * Login candidate (by candidate code or email)
     * @param {Object} data - { identifier, password, eventId }
     * @param {Object} metadata - { ip, userAgent }
     * @returns {Promise<Object>} - { candidate, accessToken, refreshToken }
     */
  }, {
    key: "loginCandidate",
    value: (function () {
      var _loginCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(data) {
        var metadata,
          _candidate,
          validated,
          rateLimitKey,
          attempts,
          candidate,
          passwordHash,
          isValid,
          minutesLeft,
          accessToken,
          refreshToken,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              metadata = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].candidateLoginSchema); // Rate limiting
              rateLimitKey = "login_attempts:".concat(metadata.ip || "unknown", ":candidate:").concat(validated.identifier);
              _context4.n = 2;
              return _cacheUtils.cache.get(rateLimitKey);
            case 2:
              attempts = _context4.v;
              if (!(attempts && parseInt(attempts) >= _authConstants.MAX_LOGIN_ATTEMPTS)) {
                _context4.n = 3;
                break;
              }
              throw new Error("Too many login attempts. Please try again in ".concat(_authConstants.ACCOUNT_LOCK_DURATION_MINUTES, " minutes."));
            case 3:
              if (!validated.identifier.toUpperCase().startsWith("CAN-")) {
                _context4.n = 5;
                break;
              }
              _context4.n = 4;
              return this.candidateRepository.model.findOne({
                candidate_code: validated.identifier.toUpperCase()
              }).select("+password_hash +login_attempts +locked_until");
            case 4:
              candidate = _context4.v;
              _context4.n = 8;
              break;
            case 5:
              if (validated.eventId) {
                _context4.n = 6;
                break;
              }
              throw new Error("Event ID is required for email-based login");
            case 6:
              _context4.n = 7;
              return this.candidateRepository.model.findOne({
                email: validated.identifier.toLowerCase(),
                event: validated.eventId
              }).select("+password_hash +login_attempts +locked_until");
            case 7:
              candidate = _context4.v;
            case 8:
              console.log("Candidate found:", candidate);

              // Use dummy hash if candidate doesn't exist (prevent timing attacks)
              passwordHash = ((_candidate = candidate) === null || _candidate === void 0 ? void 0 : _candidate.password_hash) || "$2b$10$X/invalid/hash/that/will/never/match/anythingXXXXXXXXXXXXXXXXX";
              console.log("Using password hash:", validated.password, passwordHash);
              _context4.n = 9;
              return _authHelper.AuthHelpers.comparePassword(validated.password, passwordHash);
            case 9:
              isValid = _context4.v;
              console.log("Password valid:", isValid);

              // Check if candidate exists AFTER password comparison (constant time)
              if (candidate) {
                _context4.n = 11;
                break;
              }
              _context4.n = 10;
              return this._incrementRateLimit(rateLimitKey);
            case 10:
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_CREDENTIALS);
            case 11:
              if (!(candidate.locked_until && candidate.locked_until > new Date())) {
                _context4.n = 12;
                break;
              }
              minutesLeft = Math.ceil((candidate.locked_until - new Date()) / 60000);
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_LOCKED.replace("{duration}", minutesLeft));
            case 12:
              if (isValid) {
                _context4.n = 15;
                break;
              }
              _context4.n = 13;
              return this._handleFailedLogin(candidate, this.candidateRepository);
            case 13:
              _context4.n = 14;
              return this._incrementRateLimit(rateLimitKey);
            case 14:
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_CREDENTIALS);
            case 15:
              if (!(candidate.status !== _candidateConstants.STATUS.APPROVED && candidate.status !== _candidateConstants.STATUS.PROFILE_UPDATE_PENDING)) {
                _context4.n = 16;
                break;
              }
              throw new Error("Account is ".concat(candidate.status, ". Please contact the event administrator."));
            case 16:
              if (!(candidate.login_attempts > 0)) {
                _context4.n = 17;
                break;
              }
              _context4.n = 17;
              return this.candidateRepository.updateById(candidate._id, {
                login_attempts: 0,
                locked_until: null
              });
            case 17:
              _context4.n = 18;
              return _cacheUtils.cache.del(rateLimitKey);
            case 18:
              _context4.n = 19;
              return this.candidateRepository.updateLastLogin(candidate._id);
            case 19:
              // Generate tokens
              accessToken = _authHelper.AuthHelpers.generateToken(candidate._id.toString(), "candidate", "access");
              refreshToken = _authHelper.AuthHelpers.generateToken(candidate._id.toString(), "candidate", "refresh"); // Store refresh token
              _context4.n = 20;
              return _authHelper.AuthHelpers.storeRefreshToken(candidate._id.toString(), refreshToken);
            case 20:
              if (!metadata.userAgent) {
                _context4.n = 21;
                break;
              }
              _context4.n = 21;
              return _cacheUtils.cache.set("device:candidate:".concat(candidate._id), JSON.stringify({
                userAgent: metadata.userAgent,
                ip: metadata.ip,
                lastLogin: new Date()
              }), "EX", 30 * 24 * 60 * 60 // 30 days
              );
            case 21:
              return _context4.a(2, {
                success: true,
                candidate: {
                  _id: candidate._id,
                  name: candidate.name,
                  email: candidate.email,
                  candidate_code: candidate.candidate_code,
                  status: candidate.status,
                  event: candidate.event,
                  is_published: candidate.is_published,
                  profile_image: _fileService["default"].getFileUrl(candidate.profile_image),
                  cover_image: _fileService["default"].getFileUrl(candidate.cover_image),
                  gallery: _fileService["default"].getFileUrls(candidate.gallery)
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: _authConstants.JWT_EXPIRATION.ACCESS_TOKEN
              });
            case 22:
              _context4.p = 22;
              _t4 = _context4.v;
              throw new Error("Candidate login failed: ".concat(_t4.message));
            case 23:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 22]]);
      }));
      function loginCandidate(_x4) {
        return _loginCandidate.apply(this, arguments);
      }
      return loginCandidate;
    }() // ==================== PASSWORD MANAGEMENT ====================
    /**
     * Change password (for authenticated user or candidate)
     * @param {string} userId - User or candidate ID
     * @param {Object} data - { currentPassword, newPassword, confirmPassword }
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "changePassword",
    value: function () {
      var _changePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId, data) {
        var userType,
          validated,
          repository,
          account,
          isValidPassword,
          isSamePassword,
          hashedPassword,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              userType = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : "user";
              _context5.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].changePasswordSchema);
              repository = userType === "candidate" ? this.candidateRepository : this.userRepository; // Get user/candidate with password
              _context5.n = 2;
              return repository.model.findById(userId).select("+password_hash");
            case 2:
              account = _context5.v;
              if (account) {
                _context5.n = 3;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
            case 3:
              _context5.n = 4;
              return _authHelper.AuthHelpers.comparePassword(validated.currentPassword, account.password_hash);
            case 4:
              isValidPassword = _context5.v;
              if (isValidPassword) {
                _context5.n = 5;
                break;
              }
              throw new Error("Current password is incorrect");
            case 5:
              _context5.n = 6;
              return _authHelper.AuthHelpers.comparePassword(validated.newPassword, account.password_hash);
            case 6:
              isSamePassword = _context5.v;
              if (!isSamePassword) {
                _context5.n = 7;
                break;
              }
              throw new Error("New password must be different from current password");
            case 7:
              _context5.n = 8;
              return _authHelper.AuthHelpers.hashPassword(validated.newPassword);
            case 8:
              hashedPassword = _context5.v;
              _context5.n = 9;
              return repository.updateById(userId, {
                password_hash: hashedPassword
              });
            case 9:
              _context5.n = 10;
              return _authHelper.AuthHelpers.deleteRefreshToken(userId);
            case 10:
              _context5.n = 11;
              return _agendaService["default"].now("send-password-changed-email", {
                email: account.email,
                name: account.name
              });
            case 11:
              return _context5.a(2, {
                success: true,
                message: "Password changed successfully. Please login with your new password."
              });
            case 12:
              _context5.p = 12;
              _t5 = _context5.v;
              throw new Error("Change password failed: ".concat(_t5.message));
            case 13:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 12]]);
      }));
      function changePassword(_x5, _x6) {
        return _changePassword.apply(this, arguments);
      }
      return changePassword;
    }()
    /**
     * Request password reset (forgot password)
     * @param {Object} data - { email }
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
  }, {
    key: "requestPasswordReset",
    value: (function () {
      var _requestPasswordReset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(data) {
        var userType,
          validated,
          repository,
          account,
          resetToken,
          resetUrl,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              userType = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : "user";
              _context6.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].forgotPasswordSchema);
              repository = userType === "candidate" ? this.candidateRepository : this.userRepository;
              _context6.n = 2;
              return repository.findByEmail(validated.email);
            case 2:
              account = _context6.v;
              if (account) {
                _context6.n = 4;
                break;
              }
              _context6.n = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 3:
              return _context6.a(2, {
                success: true,
                message: "If an account exists with this email, a reset link has been sent."
              });
            case 4:
              _context6.n = 5;
              return _authHelper.AuthHelpers.generateAndStoreResetToken(account._id.toString());
            case 5:
              resetToken = _context6.v;
              resetUrl = "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/").concat(userType === "candidate" ? "candidate" : "user", "/reset-password?token=").concat(resetToken); // Queue reset email
              _context6.n = 6;
              return _agendaService["default"].now("send-password-reset-email", {
                email: account.email,
                name: account.name,
                resetUrl: resetUrl
              });
            case 6:
              return _context6.a(2, {
                success: true,
                message: "If an account exists with this email, a reset link has been sent."
              });
            case 7:
              _context6.p = 7;
              _t6 = _context6.v;
              throw new Error("Request password reset failed: ".concat(_t6.message));
            case 8:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 7]]);
      }));
      function requestPasswordReset(_x7) {
        return _requestPasswordReset.apply(this, arguments);
      }
      return requestPasswordReset;
    }()
    /**
     * Reset password using token
     * @param {Object} data - { token, password, confirmPassword }
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "resetPassword",
    value: (function () {
      var _resetPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(data) {
        var userType,
          validated,
          userId,
          payload,
          repository,
          account,
          hashedPassword,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              userType = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : "user";
              _context7.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].resetPasswordSchema); // Get user ID from reset token
              _context7.n = 2;
              return _authHelper.AuthHelpers.getUserIdFromResetToken(validated.token);
            case 2:
              userId = _context7.v;
              if (userId) {
                _context7.n = 3;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.PASSWORD_RESET_TOKEN_EXPIRED);
            case 3:
              // Verify JWT signature
              payload = _authHelper.AuthHelpers.verifyToken(validated.token);
              if (!(!payload || payload.sub !== userId)) {
                _context7.n = 4;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_TOKEN);
            case 4:
              repository = userType === "candidate" ? this.candidateRepository : this.userRepository;
              _context7.n = 5;
              return repository.findById(userId);
            case 5:
              account = _context7.v;
              if (account) {
                _context7.n = 6;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
            case 6:
              _context7.n = 7;
              return _authHelper.AuthHelpers.hashPassword(validated.password);
            case 7:
              hashedPassword = _context7.v;
              _context7.n = 8;
              return repository.updateById(userId, {
                password_hash: hashedPassword,
                login_attempts: 0,
                locked_until: null
              });
            case 8:
              _context7.n = 9;
              return _authHelper.AuthHelpers.deleteResetToken(validated.token);
            case 9:
              _context7.n = 10;
              return _authHelper.AuthHelpers.deleteRefreshToken(userId);
            case 10:
              _context7.n = 11;
              return _agendaService["default"].now("send-password-changed-email", {
                email: account.email,
                name: account.name
              });
            case 11:
              return _context7.a(2, {
                success: true,
                message: "Password reset successfully. Please login with your new password."
              });
            case 12:
              _context7.p = 12;
              _t7 = _context7.v;
              throw new Error("Reset password failed: ".concat(_t7.message));
            case 13:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 12]]);
      }));
      function resetPassword(_x8) {
        return _resetPassword.apply(this, arguments);
      }
      return resetPassword;
    }() // ==================== CURRENT USER ====================
    /**
     * Get current user or candidate profile
     * @param {string} userId - User or candidate ID
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "getCurrentUser",
    value: function () {
      var _getCurrentUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(userId) {
        var userType,
          repository,
          account,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              userType = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : "user";
              _context8.p = 1;
              repository = userType === "candidate" ? this.candidateRepository : this.userRepository;
              _context8.n = 2;
              return repository.findById(userId);
            case 2:
              account = _context8.v;
              if (account) {
                _context8.n = 3;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
            case 3:
              if (!(userType === "candidate")) {
                _context8.n = 4;
                break;
              }
              return _context8.a(2, {
                _id: account._id,
                name: account.name,
                email: account.email,
                candidate_code: account.candidate_code,
                status: account.status,
                event: account.event,
                categories: account.categories,
                bio: account.bio,
                phone: account.phone,
                social_media: account.social_media,
                profile_image: _fileService["default"].getFileUrl(account.profile_image),
                cover_image: _fileService["default"].getFileUrl(account.cover_image),
                gallery: _fileService["default"].getFileUrls(account.gallery),
                is_published: account.is_published,
                total_votes: account.total_votes,
                created_at: account.created_at,
                updated_at: account.updated_at
              });
            case 4:
              return _context8.a(2, {
                _id: account._id,
                name: account.name,
                email: account.email,
                role: account.role,
                email_verified: account.email_verified,
                profile_image: _fileService["default"].getFileUrl(account.profile_image),
                created_at: account.created_at,
                updated_at: account.updated_at
              });
            case 5:
              _context8.p = 5;
              _t8 = _context8.v;
              throw new Error("Get current user failed: ".concat(_t8.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 5]]);
      }));
      function getCurrentUser(_x9) {
        return _getCurrentUser.apply(this, arguments);
      }
      return getCurrentUser;
    }() // ==================== TOKEN MANAGEMENT ====================
    /**
     * Refresh access token using refresh token
     * @param {Object} data - { refreshToken }
     * @returns {Promise<Object>} - { accessToken, refreshToken }
     */
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(data) {
        var validated, payload, userId, role, storedToken, repository, account, newAccessToken, newRefreshToken, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              // Validate input
              validated = this.validate(data, _authValidation["default"].refreshTokenSchema); // Verify token signature
              payload = _authHelper.AuthHelpers.verifyToken(validated.refreshToken);
              if (payload) {
                _context9.n = 1;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_TOKEN);
            case 1:
              userId = payload.sub;
              role = payload.role; // Get stored refresh token
              _context9.n = 2;
              return _authHelper.AuthHelpers.getStoredRefreshToken(userId);
            case 2:
              storedToken = _context9.v;
              if (!(storedToken !== validated.refreshToken)) {
                _context9.n = 4;
                break;
              }
              _context9.n = 3;
              return _authHelper.AuthHelpers.deleteRefreshToken(userId);
            case 3:
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_TOKEN);
            case 4:
              // Determine repository
              repository = role === "candidate" ? this.candidateRepository : this.userRepository; // Verify account still exists
              _context9.n = 5;
              return repository.findById(userId);
            case 5:
              account = _context9.v;
              if (account) {
                _context9.n = 6;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
            case 6:
              // Generate new tokens
              newAccessToken = _authHelper.AuthHelpers.generateToken(userId, role, "access");
              newRefreshToken = _authHelper.AuthHelpers.generateToken(userId, role, "refresh"); // Store new refresh token
              _context9.n = 7;
              return _authHelper.AuthHelpers.storeRefreshToken(userId, newRefreshToken);
            case 7:
              return _context9.a(2, {
                success: true,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn: _authConstants.JWT_EXPIRATION.ACCESS_TOKEN
              });
            case 8:
              _context9.p = 8;
              _t9 = _context9.v;
              throw new Error("Refresh token failed: ".concat(_t9.message));
            case 9:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 8]]);
      }));
      function refreshToken(_x0) {
        return _refreshToken.apply(this, arguments);
      }
      return refreshToken;
    }()
    /**
     * Refresh access token using refresh token (alias for controller compatibility)
     * @param {string} refreshToken - The refresh token
     * @returns {Promise<Object>} - { accessToken, refreshToken }
     */
  }, {
    key: "refreshAccessToken",
    value: (function () {
      var _refreshAccessToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(refreshToken) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, this.refreshToken({
                refreshToken: refreshToken
              }));
          }
        }, _callee0, this);
      }));
      function refreshAccessToken(_x1) {
        return _refreshAccessToken.apply(this, arguments);
      }
      return refreshAccessToken;
    }()
    /**
     * Logout user or candidate
     * @param {string} userId - User or candidate ID
     * @param {Object} data - { refresh_token, access_token }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "logout",
    value: (function () {
      var _logout = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(userId) {
        var data,
          validated,
          payload,
          ttl,
          _args1 = arguments,
          _t0,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              data = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              validated = this.validate(data, _authValidation["default"].logoutSchema); // Delete refresh token
              if (!validated.refresh_token) {
                _context1.n = 2;
                break;
              }
              _context1.n = 2;
              return _authHelper.AuthHelpers.deleteRefreshToken(userId);
            case 2:
              if (!validated.access_token) {
                _context1.n = 6;
                break;
              }
              _context1.p = 3;
              payload = _authHelper.AuthHelpers.verifyToken(validated.access_token);
              ttl = payload.exp - Math.floor(Date.now() / 1000);
              if (!(ttl > 0)) {
                _context1.n = 4;
                break;
              }
              _context1.n = 4;
              return _authHelper.AuthHelpers.blacklistToken(validated.accessToken, ttl);
            case 4:
              _context1.n = 6;
              break;
            case 5:
              _context1.p = 5;
              _t0 = _context1.v;
            case 6:
              return _context1.a(2, {
                success: true,
                message: "Logged out successfully"
              });
            case 7:
              _context1.p = 7;
              _t1 = _context1.v;
              throw new Error("Logout failed: ".concat(_t1.message));
            case 8:
              return _context1.a(2);
          }
        }, _callee1, this, [[3, 5], [1, 7]]);
      }));
      function logout(_x10) {
        return _logout.apply(this, arguments);
      }
      return logout;
    }()
    /**
     * Logout user (alias for controller compatibility)
     * @param {string} userId - User ID
     * @param {string} refreshToken - Refresh token to invalidate
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "logoutUser",
    value: (function () {
      var _logoutUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(userId, refreshToken) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              return _context10.a(2, this.logout(userId, {
                refresh_token: refreshToken
              }));
          }
        }, _callee10, this);
      }));
      function logoutUser(_x11, _x12) {
        return _logoutUser.apply(this, arguments);
      }
      return logoutUser;
    }()
    /**
     * Logout candidate (alias for controller compatibility)
     * @param {string} candidateId - Candidate ID
     * @param {string} refreshToken - Refresh token to invalidate
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "logoutCandidate",
    value: (function () {
      var _logoutCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(candidateId, refreshToken) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              return _context11.a(2, this.logout(candidateId, {
                refresh_token: refreshToken
              }));
          }
        }, _callee11, this);
      }));
      function logoutCandidate(_x13, _x14) {
        return _logoutCandidate.apply(this, arguments);
      }
      return logoutCandidate;
    }() // ==================== EMAIL VERIFICATION ====================
    /**
     * Verify email using token
     * @param {Object} data - { token }
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "verifyEmail",
    value: function () {
      var _verifyEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(data) {
        var userType,
          validated,
          userId,
          payload,
          repository,
          account,
          _args12 = arguments,
          _t10;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              userType = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : "user";
              _context12.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].verifyEmailSchema); // Get user ID from verification token
              _context12.n = 2;
              return _authHelper.AuthHelpers.getUserIdFromVerificationToken(validated.token);
            case 2:
              userId = _context12.v;
              if (userId) {
                _context12.n = 3;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.TOKEN_EXPIRED);
            case 3:
              // Verify JWT signature
              payload = _authHelper.AuthHelpers.verifyToken(validated.token);
              if (!(!payload || payload.sub !== userId)) {
                _context12.n = 4;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.INVALID_TOKEN);
            case 4:
              repository = userType === "candidate" ? this.candidateRepository : this.userRepository;
              _context12.n = 5;
              return repository.findById(userId);
            case 5:
              account = _context12.v;
              if (account) {
                _context12.n = 6;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
            case 6:
              if (!account.email_verified) {
                _context12.n = 7;
                break;
              }
              throw new Error(_authConstants.ERROR_MESSAGES.EMAIL_ALREADY_VERIFIED);
            case 7:
              _context12.n = 8;
              return repository.updateById(userId, {
                email_verified: true,
                email_verified_at: new Date()
              });
            case 8:
              _context12.n = 9;
              return _authHelper.AuthHelpers.deleteVerificationToken(validated.token);
            case 9:
              return _context12.a(2, {
                success: true,
                message: "Email verified successfully"
              });
            case 10:
              _context12.p = 10;
              _t10 = _context12.v;
              throw new Error("Email verification failed: ".concat(_t10.message));
            case 11:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 10]]);
      }));
      function verifyEmail(_x15) {
        return _verifyEmail.apply(this, arguments);
      }
      return verifyEmail;
    }()
    /**
     * Resend verification email
     * @param {Object} data - { email }
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
  }, {
    key: "resendVerification",
    value: (function () {
      var _resendVerification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(data) {
        var userType,
          validated,
          repository,
          account,
          verificationToken,
          verificationUrl,
          _args13 = arguments,
          _t11;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              userType = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : "user";
              _context13.p = 1;
              // Validate input
              validated = this.validate(data, _authValidation["default"].resendVerificationSchema);
              repository = userType === "candidate" ? this.candidateRepository : this.userRepository;
              _context13.n = 2;
              return repository.findByEmail(validated.email);
            case 2:
              account = _context13.v;
              if (account) {
                _context13.n = 4;
                break;
              }
              _context13.n = 3;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 3:
              return _context13.a(2, {
                success: true,
                message: "If an account exists with this email, a verification link has been sent."
              });
            case 4:
              if (!account.email_verified) {
                _context13.n = 5;
                break;
              }
              return _context13.a(2, {
                success: true,
                message: "Email is already verified."
              });
            case 5:
              _context13.n = 6;
              return _authHelper.AuthHelpers.generateAndStoreVerificationToken(account._id.toString());
            case 6:
              verificationToken = _context13.v;
              verificationUrl = "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/").concat(userType === "candidate" ? "candidate" : "user", "/verify-email?token=").concat(verificationToken); // Queue verification email
              _context13.n = 7;
              return _agendaService["default"].now("send-email-verification", {
                email: account.email,
                name: account.name,
                verificationUrl: verificationUrl
              });
            case 7:
              return _context13.a(2, {
                success: true,
                message: "If an account exists with this email, a verification link has been sent."
              });
            case 8:
              _context13.p = 8;
              _t11 = _context13.v;
              throw new Error("Resend verification failed: ".concat(_t11.message));
            case 9:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 8]]);
      }));
      function resendVerification(_x16) {
        return _resendVerification.apply(this, arguments);
      }
      return resendVerification;
    }()
    /**
     * Resend verification email (alias for controller compatibility)
     * @param {string} email - User email
     * @param {string} userType - 'user' or 'candidate'
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "resendVerificationEmail",
    value: (function () {
      var _resendVerificationEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(email) {
        var userType,
          _args14 = arguments;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              userType = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : "user";
              return _context14.a(2, this.resendVerification({
                email: email
              }, userType));
          }
        }, _callee14, this);
      }));
      function resendVerificationEmail(_x17) {
        return _resendVerificationEmail.apply(this, arguments);
      }
      return resendVerificationEmail;
    }() // ==================== PRIVATE HELPERS ====================
    /**
     * Handle failed login attempt
     * @param {Object} account - User or candidate document
     * @param {Object} repository - Repository instance
     * @private
     */
    )
  }, {
    key: "_handleFailedLogin",
    value: function () {
      var _handleFailedLogin2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(account, repository) {
        var attempts, updates;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              attempts = (account.login_attempts || 0) + 1;
              updates = {
                login_attempts: attempts
              };
              if (!(attempts >= _authConstants.MAX_LOGIN_ATTEMPTS)) {
                _context15.n = 1;
                break;
              }
              updates.locked_until = new Date(Date.now() + _authConstants.ACCOUNT_LOCK_DURATION_MINUTES * 60000);

              // Queue account locked email
              _context15.n = 1;
              return _agendaService["default"].now("send-account-locked-email", {
                email: account.email,
                name: account.name,
                duration: _authConstants.ACCOUNT_LOCK_DURATION_MINUTES
              });
            case 1:
              _context15.n = 2;
              return repository.updateById(account._id, updates);
            case 2:
              return _context15.a(2);
          }
        }, _callee15);
      }));
      function _handleFailedLogin(_x18, _x19) {
        return _handleFailedLogin2.apply(this, arguments);
      }
      return _handleFailedLogin;
    }()
    /**
     * Increment rate limit counter
     * @param {string} key - Cache key
     * @private
     */
  }, {
    key: "_incrementRateLimit",
    value: (function () {
      var _incrementRateLimit2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(key) {
        var current;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return _cacheUtils.cache.get(key);
            case 1:
              current = _context16.v;
              if (current) {
                _context16.n = 3;
                break;
              }
              _context16.n = 2;
              return _cacheUtils.cache.set(key, "1", "EX", _authConstants.ACCOUNT_LOCK_DURATION_MINUTES * 60);
            case 2:
              _context16.n = 4;
              break;
            case 3:
              _context16.n = 4;
              return _cacheUtils.cache.incr(key);
            case 4:
              return _context16.a(2);
          }
        }, _callee16);
      }));
      function _incrementRateLimit(_x20) {
        return _incrementRateLimit2.apply(this, arguments);
      }
      return _incrementRateLimit;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new AuthService();