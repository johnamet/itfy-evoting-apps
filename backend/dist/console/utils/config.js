"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;
var _promises = _interopRequireDefault(require("fs/promises"));
var _path = _interopRequireDefault(require("path"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Configuration Manager for Console Application
 * Handles .env file management and configuration loading
 */
var Config = exports.Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);
    this.envPath = _path["default"].join(process.cwd(), '.env');
    this.config = {};
    this.isLoaded = false;
  }

  /**
   * Check if .env file exists
   */
  return _createClass(Config, [{
    key: "envFileExists",
    value: (function () {
      var _envFileExists = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _promises["default"].access(this.envPath);
            case 1:
              return _context.a(2, true);
            case 2:
              _context.p = 2;
              _t = _context.v;
              return _context.a(2, false);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function envFileExists() {
        return _envFileExists.apply(this, arguments);
      }
      return envFileExists;
    }()
    /**
     * Load configuration from .env file
     */
    )
  }, {
    key: "load",
    value: (function () {
      var _load = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var exists, content, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.envFileExists();
            case 1:
              exists = _context2.v;
              if (!exists) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return _promises["default"].readFile(this.envPath, 'utf-8');
            case 2:
              content = _context2.v;
              this.config = _dotenv["default"].parse(content);

              // Also load into process.env
              _dotenv["default"].config({
                path: this.envPath
              });
            case 3:
              this.isLoaded = true;
              return _context2.a(2, this.config);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              throw new Error("Failed to load configuration: ".concat(_t2.message));
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 4]]);
      }));
      function load() {
        return _load.apply(this, arguments);
      }
      return load;
    }()
    /**
     * Get a configuration value
     */
    )
  }, {
    key: "get",
    value: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return process.env[key] || this.config[key] || defaultValue;
    }

    /**
     * Set a configuration value (in memory only)
     */
  }, {
    key: "set",
    value: function set(key, value) {
      this.config[key] = value;
      process.env[key] = value;
    }

    /**
     * Save configuration to .env file
     */
  }, {
    key: "save",
    value: (function () {
      var _save = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var configData,
          dataToSave,
          lines,
          content,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              configData = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
              dataToSave = configData || this.config; // Build .env content
              lines = ['# ITFY E-Voting Backend Configuration', "# Generated by Admin Console on ".concat(new Date().toISOString()), '', '# ================================', '# Server Configuration', '# ================================', "NODE_ENV=".concat(dataToSave.NODE_ENV || 'development'), "PORT=".concat(dataToSave.PORT || '3000'), "CORS_ORIGIN=".concat(dataToSave.CORS_ORIGIN || '*'), '', '# ================================', '# Database Configuration', '# ================================', "MONGODB_URI=".concat(dataToSave.MONGODB_URI || 'mongodb://localhost:27017/itfy-evoting'), "DB_MAX_RETRIES=".concat(dataToSave.DB_MAX_RETRIES || '5'), "DB_RETRY_DELAY_MS=".concat(dataToSave.DB_RETRY_DELAY_MS || '5000'), '', '# ================================', '# Redis/Cache Configuration', '# ================================', "REDIS_URL=".concat(dataToSave.REDIS_URL || 'redis://localhost:6379'), "REDIS_MAX_RETRIES=".concat(dataToSave.REDIS_MAX_RETRIES || '5'), "REDIS_RETRY_DELAY_MS=".concat(dataToSave.REDIS_RETRY_DELAY_MS || '2000'), '', '# ================================', '# JWT Configuration', '# ================================', "JWT_SECRET=".concat(dataToSave.JWT_SECRET || this.generateSecret()), "JWT_REFRESH_SECRET=".concat(dataToSave.JWT_REFRESH_SECRET || this.generateSecret()), "JWT_EXPIRATION=".concat(dataToSave.JWT_EXPIRATION || '15m'), "JWT_REFRESH_EXPIRATION=".concat(dataToSave.JWT_REFRESH_EXPIRATION || '7d'), '', '# ================================', '# Email Configuration', '# ================================', "EMAIL_HOST=".concat(dataToSave.EMAIL_HOST || 'smtp.gmail.com'), "EMAIL_PORT=".concat(dataToSave.EMAIL_PORT || '587'), "EMAIL_USER=".concat(dataToSave.EMAIL_USER || ''), "EMAIL_PASS=".concat(dataToSave.EMAIL_PASS || ''), "EMAIL_FROM=".concat(dataToSave.EMAIL_FROM || 'noreply@itfy-evoting.com'), '', '# ================================', '# Frontend Configuration', '# ================================', "FRONTEND_URL=".concat(dataToSave.FRONTEND_URL || 'http://localhost:3001'), '', '# ================================', '# Payment Configuration (Optional)', '# ================================', "PAYSTACK_SECRET_KEY=".concat(dataToSave.PAYSTACK_SECRET_KEY || ''), "PAYSTACK_PUBLIC_KEY=".concat(dataToSave.PAYSTACK_PUBLIC_KEY || ''), '', '# ================================', '# File Upload Configuration', '# ================================', "UPLOAD_DIR=".concat(dataToSave.UPLOAD_DIR || './uploads'), "MAX_FILE_SIZE=".concat(dataToSave.MAX_FILE_SIZE || '10485760'), '', '# ================================', '# Console Configuration', '# ================================', "CONSOLE_SETUP_COMPLETE=".concat(dataToSave.CONSOLE_SETUP_COMPLETE || 'true')];
              content = lines.join('\n');
              _context3.n = 1;
              return _promises["default"].writeFile(this.envPath, content, 'utf-8');
            case 1:
              _context3.n = 2;
              return this.load();
            case 2:
              return _context3.a(2, true);
          }
        }, _callee3, this);
      }));
      function save() {
        return _save.apply(this, arguments);
      }
      return save;
    }()
    /**
     * Generate a random secret key
     */
    )
  }, {
    key: "generateSecret",
    value: function generateSecret() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 64;
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      var result = '';
      for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    /**
     * Get all configuration as object
     */
  }, {
    key: "getAll",
    value: function getAll() {
      return _objectSpread({}, this.config);
    }

    /**
     * Update a single value in .env file
     */
  }, {
    key: "updateValue",
    value: (function () {
      var _updateValue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(key, value) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.config[key] = value;
              _context4.n = 1;
              return this.save();
            case 1:
              return _context4.a(2, true);
          }
        }, _callee4, this);
      }));
      function updateValue(_x, _x2) {
        return _updateValue.apply(this, arguments);
      }
      return updateValue;
    }()
    /**
     * Validate required configuration
     */
    )
  }, {
    key: "validateRequired",
    value: function validateRequired() {
      var _this = this;
      var required = ['MONGODB_URI', 'JWT_SECRET'];
      var missing = required.filter(function (key) {
        return !_this.get(key);
      });
      if (missing.length > 0) {
        return {
          valid: false,
          missing: missing
        };
      }
      return {
        valid: true,
        missing: []
      };
    }

    /**
     * Get configuration summary
     */
  }, {
    key: "getSummary",
    value: function getSummary() {
      return {
        server: {
          nodeEnv: this.get('NODE_ENV', 'development'),
          port: this.get('PORT', '3000'),
          corsOrigin: this.get('CORS_ORIGIN', '*')
        },
        database: {
          uri: this.maskSensitive(this.get('MONGODB_URI', '')),
          connected: false
        },
        cache: {
          url: this.maskSensitive(this.get('REDIS_URL', '')),
          connected: false
        },
        jwt: {
          configured: !!this.get('JWT_SECRET'),
          expiration: this.get('JWT_EXPIRATION', '15m')
        },
        email: {
          configured: !!this.get('EMAIL_USER') && !!this.get('EMAIL_PASS'),
          host: this.get('EMAIL_HOST', 'smtp.gmail.com')
        },
        frontend: {
          url: this.get('FRONTEND_URL', 'http://localhost:3001')
        }
      };
    }

    /**
     * Mask sensitive information
     */
  }, {
    key: "maskSensitive",
    value: function maskSensitive(value) {
      if (!value) return '(not configured)';

      // Mask password in URIs
      return value.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
    }
  }]);
}();