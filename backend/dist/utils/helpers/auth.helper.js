"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthHelpers = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _crypto = _interopRequireDefault(require("crypto"));
var _jwtConfig = require("../../config/jwt.config.js");
var _constants = require("../../utils/constants.js");
var _cacheUtils = _interopRequireDefault(require("../../utils/cache/cache.utils.js"));
var _userConstants = require("../constants/user.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * The Authentication Helper Utility
 * Handles JWT, password hashing, and refresh token management
 * Uses Redis (or in-memory fallback) for token storage & blacklisting
 */
var jwtLibrary = _jsonwebtoken["default"];
var AuthHelpers = exports.AuthHelpers = /*#__PURE__*/function () {
  function AuthHelpers() {
    _classCallCheck(this, AuthHelpers);
  }
  return _createClass(AuthHelpers, null, [{
    key: "generateToken",
    value:
    /**
     * Generates a JWT token for a user
     * @param {string} userId - The user's unique identifier
     * @param {string} role - The user's role
     * @param {string} [tokenType='access'] - 'access', 'refresh', 'reset', 'verification'
     * @returns {string} The generated JWT token
     */
    function generateToken(userId, role) {
      var tokenType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "access";
      try {
        var expiresIn = _constants.JWT_EXPIRATION["".concat(tokenType.toUpperCase(), "_TOKEN")] || _constants.JWT_EXPIRATION.ACCESS_TOKEN;
        var payload = _objectSpread(_objectSpread({
          sub: userId,
          role: role,
          iat: Math.floor(Date.now() / 1000)
        }, _jwtConfig.JWT_CONFIG.CUSTOM_CLAIMS.includeStatus && {
          status: "active"
        }), _jwtConfig.JWT_CONFIG.CUSTOM_CLAIMS.permissions && {
          permissions: this._getDefaultPermissions(role)
        });
        return jwtLibrary.sign(payload, _jwtConfig.JWT_CONFIG.SECRET_KEY, _objectSpread(_objectSpread({}, _jwtConfig.JWT_CONFIG.TOKEN_OPTIONS), {}, {
          jwtid: _crypto["default"].randomBytes(16).toString('hex'),
          expiresIn: expiresIn,
          algorithm: _jwtConfig.JWT_CONFIG.ALGORITHM,
          issuer: _jwtConfig.JWT_CONFIG.ISSUER,
          audience: _jwtConfig.JWT_CONFIG.AUDIENCE
        }));
      } catch (error) {
        throw new Error("Token generation failed: ".concat(error.message));
      }
    }

    /**
     * Verifies a JWT token and returns its payload
     * @param {string} token - The JWT token to verify
     * @returns {object} The decoded payload
     */
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      try {
        return jwtLibrary.verify(token, _jwtConfig.JWT_CONFIG.SECRET_KEY, {
          algorithms: [_jwtConfig.JWT_CONFIG.ALGORITHM],
          issuer: _jwtConfig.JWT_CONFIG.ISSUER,
          audience: _jwtConfig.JWT_CONFIG.AUDIENCE,
          ignoreExpiration: false
        });
      } catch (error) {
        throw new Error("Token verification failed: ".concat(error.message));
      }
    }

    /**
     * Hashes a plain password
     * @param {string} plainPassword
     * @returns {Promise<string>}
     */
  }, {
    key: "hashPassword",
    value: (function () {
      var _hashPassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(plainPassword) {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _bcrypt["default"].hash(plainPassword, _constants.SALT_ROUNDS);
            case 1:
              return _context.a(2, _context.v);
            case 2:
              _context.p = 2;
              _t = _context.v;
              throw new Error("Password hashing failed: ".concat(_t.message));
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      function hashPassword(_x) {
        return _hashPassword.apply(this, arguments);
      }
      return hashPassword;
    }()
    /**
     * Compares plain password with hash
     * @param {string} plainPassword
     * @param {string} hashedPassword
     * @returns {Promise<boolean>}
     */
    )
  }, {
    key: "comparePassword",
    value: (function () {
      var _comparePassword = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(plainPassword, hashedPassword) {
        var _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return _bcrypt["default"].compare(plainPassword, hashedPassword);
            case 1:
              return _context2.a(2, _context2.v);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              throw new Error("Password comparison failed: ".concat(_t2.message));
            case 3:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 2]]);
      }));
      function comparePassword(_x2, _x3) {
        return _comparePassword.apply(this, arguments);
      }
      return comparePassword;
    }()
    /**
     * Store refresh token in cache (Redis)
     * @param {string} userId
     * @param {string} refreshToken
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "storeRefreshToken",
    value: (function () {
      var _storeRefreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId, refreshToken) {
        var key, ttlSeconds, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              key = "refresh:".concat(userId);
              ttlSeconds = this._parseJwtExpiry(_constants.JWT_EXPIRATION.REFRESH_TOKEN);
              _context3.n = 1;
              return _cacheUtils["default"].set(key, refreshToken, "EX", ttlSeconds);
            case 1:
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t3 = _context3.v;
              throw new Error("Failed to store refresh token: ".concat(_t3.message));
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 2]]);
      }));
      function storeRefreshToken(_x4, _x5) {
        return _storeRefreshToken.apply(this, arguments);
      }
      return storeRefreshToken;
    }()
    /**
     * Get stored refresh token
     * @param {string} userId
     * @returns {Promise<string|null>}
     */
    )
  }, {
    key: "getStoredRefreshToken",
    value: (function () {
      var _getStoredRefreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(userId) {
        var key, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              key = "refresh:".concat(userId);
              _context4.n = 1;
              return _cacheUtils["default"].get(key);
            case 1:
              return _context4.a(2, _context4.v);
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              throw new Error("Failed to get refresh token: ".concat(_t4.message));
            case 3:
              return _context4.a(2);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function getStoredRefreshToken(_x6) {
        return _getStoredRefreshToken.apply(this, arguments);
      }
      return getStoredRefreshToken;
    }()
    /**
     * Delete refresh token (on logout, password reset)
     * @param {string} userId
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "deleteRefreshToken",
    value: (function () {
      var _deleteRefreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId) {
        var key, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              key = "refresh:".concat(userId);
              _context5.n = 1;
              return _cacheUtils["default"].del(key);
            case 1:
              _context5.n = 3;
              break;
            case 2:
              _context5.p = 2;
              _t5 = _context5.v;
              throw new Error("Failed to delete refresh token: ".concat(_t5.message));
            case 3:
              return _context5.a(2);
          }
        }, _callee5, null, [[0, 2]]);
      }));
      function deleteRefreshToken(_x7) {
        return _deleteRefreshToken.apply(this, arguments);
      }
      return deleteRefreshToken;
    }() // ========================================
    // PASSWORD RESET TOKEN MANAGEMENT (Redis-backed)
    // ========================================
    /**
     * Generate and store password reset token
     * @param {string} userId
     * @returns {Promise<string>} resetToken (JWT)
     */
    )
  }, {
    key: "generateAndStoreResetToken",
    value: function () {
      var _generateAndStoreResetToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(userId) {
        var resetToken, key, ttlSeconds, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              resetToken = this.generateToken(userId, "reset", "reset");
              key = "reset:".concat(resetToken);
              ttlSeconds = this._parseJwtExpiry(_constants.JWT_EXPIRATION.RESET_TOKEN);
              _context6.n = 1;
              return _cacheUtils["default"].set(key, userId, "EX", ttlSeconds);
            case 1:
              return _context6.a(2, resetToken);
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              throw new Error("Failed to generate reset token: ".concat(_t6.message));
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function generateAndStoreResetToken(_x8) {
        return _generateAndStoreResetToken.apply(this, arguments);
      }
      return generateAndStoreResetToken;
    }()
    /**
     * Get user ID from reset token
     * @param {string} resetToken
     * @returns {Promise<string|null>} userId
     */
  }, {
    key: "getUserIdFromResetToken",
    value: (function () {
      var _getUserIdFromResetToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(resetToken) {
        var key, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              key = "reset:".concat(resetToken);
              _context7.n = 1;
              return _cacheUtils["default"].get(key);
            case 1:
              return _context7.a(2, _context7.v);
            case 2:
              _context7.p = 2;
              _t7 = _context7.v;
              throw new Error("Failed to retrieve reset token: ".concat(_t7.message));
            case 3:
              return _context7.a(2);
          }
        }, _callee7, null, [[0, 2]]);
      }));
      function getUserIdFromResetToken(_x9) {
        return _getUserIdFromResetToken.apply(this, arguments);
      }
      return getUserIdFromResetToken;
    }()
    /**
     * Delete password reset token (after use or expiry)
     * @param {string} resetToken
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "deleteResetToken",
    value: (function () {
      var _deleteResetToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(resetToken) {
        var key, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              key = "reset:".concat(resetToken);
              _context8.n = 1;
              return _cacheUtils["default"].del(key);
            case 1:
              _context8.n = 3;
              break;
            case 2:
              _context8.p = 2;
              _t8 = _context8.v;
              throw new Error("Failed to delete reset token: ".concat(_t8.message));
            case 3:
              return _context8.a(2);
          }
        }, _callee8, null, [[0, 2]]);
      }));
      function deleteResetToken(_x0) {
        return _deleteResetToken.apply(this, arguments);
      }
      return deleteResetToken;
    }() // ========================================
    // EMAIL VERIFICATION TOKEN (Optional)
    // ========================================
    /**
     * Generate and store email verification token
     * @param {string} userId
     * @returns {Promise<string>} verificationToken
     */
    )
  }, {
    key: "generateAndStoreVerificationToken",
    value: function () {
      var _generateAndStoreVerificationToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(userId) {
        var token, key, ttlSeconds, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              token = this.generateToken(userId, "verification", "verification");
              key = "verify:".concat(token);
              ttlSeconds = this._parseJwtExpiry(_constants.JWT_EXPIRATION.VERIFICATION_TOKEN);
              _context9.n = 1;
              return _cacheUtils["default"].set(key, userId, "EX", ttlSeconds);
            case 1:
              return _context9.a(2, token);
            case 2:
              _context9.p = 2;
              _t9 = _context9.v;
              throw new Error("Failed to generate verification token: ".concat(_t9.message));
            case 3:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function generateAndStoreVerificationToken(_x1) {
        return _generateAndStoreVerificationToken.apply(this, arguments);
      }
      return generateAndStoreVerificationToken;
    }()
    /**
     * Validate verification token and get user
     * @param {string} token
     * @returns {Promise<string|null>}
     */
  }, {
    key: "getUserIdFromVerificationToken",
    value: (function () {
      var _getUserIdFromVerificationToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(token) {
        var key, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              key = "verify:".concat(token);
              _context0.n = 1;
              return _cacheUtils["default"].get(key);
            case 1:
              return _context0.a(2, _context0.v);
            case 2:
              _context0.p = 2;
              _t0 = _context0.v;
              throw new Error("Failed to verify token: ".concat(_t0.message));
            case 3:
              return _context0.a(2);
          }
        }, _callee0, null, [[0, 2]]);
      }));
      function getUserIdFromVerificationToken(_x10) {
        return _getUserIdFromVerificationToken.apply(this, arguments);
      }
      return getUserIdFromVerificationToken;
    }()
    /**
     * Delete verification token
     * @param {string} token
     */
    )
  }, {
    key: "deleteVerificationToken",
    value: (function () {
      var _deleteVerificationToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(token) {
        var key, _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              key = "verify:".concat(token);
              _context1.n = 1;
              return _cacheUtils["default"].del(key);
            case 1:
              _context1.n = 3;
              break;
            case 2:
              _context1.p = 2;
              _t1 = _context1.v;
              throw new Error("Failed to delete verification token: ".concat(_t1.message));
            case 3:
              return _context1.a(2);
          }
        }, _callee1, null, [[0, 2]]);
      }));
      function deleteVerificationToken(_x11) {
        return _deleteVerificationToken.apply(this, arguments);
      }
      return deleteVerificationToken;
    }() // ========================================
    // BLACKLIST & UTILITIES
    // ========================================
    /**
     * Blacklist any token
     * @param {string} token
     * @param {number} [ttlSeconds]
     */
    )
  }, {
    key: "blacklistToken",
    value: function () {
      var _blacklistToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(token) {
        var ttlSeconds,
          key,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              ttlSeconds = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 7 * 24 * 60 * 60;
              _context10.p = 1;
              key = "blacklist:".concat(token);
              _context10.n = 2;
              return _cacheUtils["default"].set(key, "1", "EX", ttlSeconds);
            case 2:
              _context10.n = 4;
              break;
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Failed to blacklist token: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, null, [[1, 3]]);
      }));
      function blacklistToken(_x12) {
        return _blacklistToken.apply(this, arguments);
      }
      return blacklistToken;
    }()
    /**
     * Check if token is blacklisted
     * @param {string} token
     * @returns {Promise<boolean>}
     */
  }, {
    key: "isTokenBlacklisted",
    value: (function () {
      var _isTokenBlacklisted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(token) {
        var key, result, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              key = "blacklist:".concat(token);
              _context11.n = 1;
              return _cacheUtils["default"].get(key);
            case 1:
              result = _context11.v;
              return _context11.a(2, result === "1");
            case 2:
              _context11.p = 2;
              _t11 = _context11.v;
              console.warn("Blacklist check failed:", _t11.message);
              return _context11.a(2, false);
          }
        }, _callee11, null, [[0, 2]]);
      }));
      function isTokenBlacklisted(_x13) {
        return _isTokenBlacklisted.apply(this, arguments);
      }
      return isTokenBlacklisted;
    }() // ========================================
    // PRIVATE HELPERS
    // ========================================
    /**
     * Convert JWT expiry string (e.g., "7d") to seconds
     * @param {string} expiry
     * @returns {number}
     */
    )
  }, {
    key: "_parseJwtExpiry",
    value: function _parseJwtExpiry(expiry) {
      var match = expiry.match(/^(\d+)([smhd])$/);
      if (!match) return 3600; // default 1h

      var value = parseInt(match[1], 10);
      var unit = match[2];
      var multipliers = {
        s: 1,
        m: 60,
        h: 3600,
        d: 86400
      };
      return value * multipliers[unit];
    }

    /**
     * Get default permissions by role
     * @param {string} role
     * @returns {string[]}
     */
  }, {
    key: "_getDefaultPermissions",
    value: function _getDefaultPermissions(role) {
      var perms = {
        moderator: ["read", "update"],
        organiser: ["read", "write", "update"],
        admin: ["read", "write", "update"],
        super_admin: ["super"]
      };
      return perms[role] || ["read"];
    }
  }]);
}();