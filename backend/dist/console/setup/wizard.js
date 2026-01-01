"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupWizard = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
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
 * First-Time Setup Wizard
 * Guides users through initial configuration and admin account creation
 * FIXED: Properly handle input to prevent command interpretation
 */
var SetupWizard = exports.SetupWizard = /*#__PURE__*/function () {
  function SetupWizard(ui, config) {
    _classCallCheck(this, SetupWizard);
    this.ui = ui;
    this.config = config;
    this.setupData = {};
  }

  /**
   * Run the complete setup wizard
   */
  return _createClass(SetupWizard, [{
    key: "run",
    value: (function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              this.ui.clear();
              this.ui.printBanner();
              this.ui.newLine();
              this.ui.header('First-Time Setup Wizard', 'rocket');
              this.ui.info('Welcome! This wizard will help you configure the ITFY E-Voting system.');
              this.ui.info('You can press Ctrl+C at any time to cancel.');
              this.ui.newLine();
              _context.p = 1;
              _context.n = 2;
              return this.setupEnvironment();
            case 2:
              _context.n = 3;
              return this.setupDatabase();
            case 3:
              _context.n = 4;
              return this.setupCache();
            case 4:
              _context.n = 5;
              return this.setupJWT();
            case 5:
              _context.n = 6;
              return this.setupEmail();
            case 6:
              _context.n = 7;
              return this.setupFrontend();
            case 7:
              _context.n = 8;
              return this.saveConfiguration();
            case 8:
              _context.n = 9;
              return this.createFirstAdmin();
            case 9:
              _context.n = 10;
              return this.showSummary();
            case 10:
              return _context.a(2, true);
            case 11:
              _context.p = 11;
              _t = _context.v;
              if (!(_t.message === 'Setup cancelled')) {
                _context.n = 12;
                break;
              }
              return _context.a(2, false);
            case 12:
              throw _t;
            case 13:
              return _context.a(2);
          }
        }, _callee, this, [[1, 11]]);
      }));
      function run() {
        return _run.apply(this, arguments);
      }
      return run;
    }()
    /**
     * Step 1: Environment setup
     */
    )
  }, {
    key: "setupEnvironment",
    value: (function () {
      var _setupEnvironment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var nodeEnv;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.ui.header('Step 1: Environment Configuration', 'gear');
              _context2.n = 1;
              return this.ui.select('Select environment type:', [{
                value: 'development',
                label: 'Development (verbose logging, auto-index)'
              }, {
                value: 'production',
                label: 'Production (optimized, secure)'
              }, {
                value: 'staging',
                label: 'Staging (production-like testing)'
              }]);
            case 1:
              nodeEnv = _context2.v;
              this.setupData.NODE_ENV = nodeEnv.value || nodeEnv;
              _context2.n = 2;
              return this.ui.question('Server port', {
                defaultValue: '3000',
                validate: function validate(val) {
                  var port = parseInt(val);
                  if (isNaN(port) || port < 1 || port > 65535) {
                    return 'Port must be a number between 1 and 65535';
                  }
                  return true;
                }
              });
            case 2:
              this.setupData.PORT = _context2.v;
              _context2.n = 3;
              return this.ui.question('CORS origin (comma-separated for multiple)', {
                defaultValue: '*'
              });
            case 3:
              this.setupData.CORS_ORIGIN = _context2.v;
              this.ui.success('Environment configuration complete!');
              this.ui.newLine();
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function setupEnvironment() {
        return _setupEnvironment.apply(this, arguments);
      }
      return setupEnvironment;
    }()
    /**
     * Step 2: Database configuration
     */
    )
  }, {
    key: "setupDatabase",
    value: (function () {
      var _setupDatabase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var useLocal, dbName, spinner, retry, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              this.ui.header('Step 2: Database Configuration', 'database');
              this.ui.info('MongoDB is required for ITFY E-Voting.');
              this.ui.newLine();
              _context3.n = 1;
              return this.ui.confirm('Use local MongoDB (localhost)?', true);
            case 1:
              useLocal = _context3.v;
              if (!useLocal) {
                _context3.n = 3;
                break;
              }
              _context3.n = 2;
              return this.ui.question('Database name', {
                defaultValue: 'itfy-evoting'
              });
            case 2:
              dbName = _context3.v;
              this.setupData.MONGODB_URI = "mongodb://localhost:27017/".concat(dbName);
              _context3.n = 5;
              break;
            case 3:
              this.ui.info('Enter your MongoDB connection string (e.g., mongodb+srv://user:pass@cluster.mongodb.net/db)');
              _context3.n = 4;
              return this.ui.question('MongoDB URI', {
                validate: function validate(val) {
                  if (!val.startsWith('mongodb://') && !val.startsWith('mongodb+srv://')) {
                    return 'URI must start with mongodb:// or mongodb+srv://';
                  }
                  return true;
                }
              });
            case 4:
              this.setupData.MONGODB_URI = _context3.v;
            case 5:
              // Test database connection
              spinner = this.ui.spinner('Testing database connection...');
              _context3.p = 6;
              _context3.n = 7;
              return _mongoose["default"].connect(this.setupData.MONGODB_URI, {
                serverSelectionTimeoutMS: 10000
              });
            case 7:
              _context3.n = 8;
              return _mongoose["default"].disconnect();
            case 8:
              spinner.stop();
              this.ui.success('Database connection successful!');
              _context3.n = 12;
              break;
            case 9:
              _context3.p = 9;
              _t2 = _context3.v;
              spinner.stop();
              this.ui.error("Database connection failed: ".concat(_t2.message));
              _context3.n = 10;
              return this.ui.confirm('Would you like to re-enter the database URI?', true);
            case 10:
              retry = _context3.v;
              if (!retry) {
                _context3.n = 11;
                break;
              }
              return _context3.a(2, this.setupDatabase());
            case 11:
              this.ui.warning('Proceeding without database verification. Please ensure MongoDB is available when starting the server.');
            case 12:
              this.ui.newLine();
            case 13:
              return _context3.a(2);
          }
        }, _callee3, this, [[6, 9]]);
      }));
      function setupDatabase() {
        return _setupDatabase.apply(this, arguments);
      }
      return setupDatabase;
    }()
    /**
     * Step 3: Redis/Cache configuration
     */
    )
  }, {
    key: "setupCache",
    value: (function () {
      var _setupCache = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var useRedis, useLocal;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.ui.header('Step 3: Cache Configuration', 'thunder');
              this.ui.info('Redis is used for caching, rate limiting, and session management.');
              this.ui.info('An in-memory fallback is available if Redis is not configured.');
              this.ui.newLine();
              _context4.n = 1;
              return this.ui.confirm('Configure Redis?', true);
            case 1:
              useRedis = _context4.v;
              if (!useRedis) {
                _context4.n = 6;
                break;
              }
              _context4.n = 2;
              return this.ui.confirm('Use local Redis (localhost)?', true);
            case 2:
              useLocal = _context4.v;
              if (!useLocal) {
                _context4.n = 3;
                break;
              }
              this.setupData.REDIS_URL = 'redis://localhost:6379';
              _context4.n = 5;
              break;
            case 3:
              _context4.n = 4;
              return this.ui.question('Redis URL', {
                defaultValue: 'redis://localhost:6379',
                validate: function validate(val) {
                  if (!val.startsWith('redis://') && !val.startsWith('rediss://')) {
                    return 'URL must start with redis:// or rediss://';
                  }
                  return true;
                }
              });
            case 4:
              this.setupData.REDIS_URL = _context4.v;
            case 5:
              _context4.n = 7;
              break;
            case 6:
              this.setupData.REDIS_URL = '';
              this.ui.warning('Redis not configured. Using in-memory cache (not recommended for production).');
            case 7:
              this.ui.success('Cache configuration complete!');
              this.ui.newLine();
            case 8:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function setupCache() {
        return _setupCache.apply(this, arguments);
      }
      return setupCache;
    }()
    /**
     * Step 4: JWT configuration
     * FIXED: Better handling of time format inputs
     */
    )
  }, {
    key: "setupJWT",
    value: (function () {
      var _setupJWT = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var generateSecrets;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              this.ui.header('Step 4: JWT Security Configuration', 'key');
              this.ui.info('JWT tokens are used for authentication.');
              this.ui.newLine();
              _context5.n = 1;
              return this.ui.confirm('Auto-generate secure secrets?', true);
            case 1:
              generateSecrets = _context5.v;
              if (!generateSecrets) {
                _context5.n = 2;
                break;
              }
              this.setupData.JWT_SECRET = this.config.generateSecret(64);
              this.setupData.JWT_REFRESH_SECRET = this.config.generateSecret(64);
              this.ui.success('Secure secrets generated!');
              _context5.n = 5;
              break;
            case 2:
              _context5.n = 3;
              return this.ui.question('JWT Secret (min 32 chars)', {
                hidden: true,
                validate: function validate(val) {
                  if (val.length < 32) {
                    return 'Secret must be at least 32 characters long';
                  }
                  return true;
                }
              });
            case 3:
              this.setupData.JWT_SECRET = _context5.v;
              _context5.n = 4;
              return this.ui.question('JWT Refresh Secret (min 32 chars)', {
                hidden: true,
                validate: function validate(val) {
                  if (val.length < 32) {
                    return 'Secret must be at least 32 characters long';
                  }
                  return true;
                }
              });
            case 4:
              this.setupData.JWT_REFRESH_SECRET = _context5.v;
            case 5:
              // FIXED: Better prompt for time-based inputs
              this.ui.newLine();
              this.ui.info('Token expiration format: Use "m" for minutes, "h" for hours, "d" for days');
              this.ui.info('Examples: 15m (15 minutes), 1h (1 hour), 7d (7 days)');
              this.ui.newLine();
              _context5.n = 6;
              return this.ui.question('Access token expiration', {
                defaultValue: '15m',
                validate: function validate(val) {
                  // Validate time format
                  if (!/^\d+[mhd]$/.test(val)) {
                    return 'Invalid format. Use number followed by m (minutes), h (hours), or d (days). Example: 15m';
                  }
                  return true;
                }
              });
            case 6:
              this.setupData.JWT_EXPIRATION = _context5.v;
              _context5.n = 7;
              return this.ui.question('Refresh token expiration', {
                defaultValue: '7d',
                validate: function validate(val) {
                  // Validate time format
                  if (!/^\d+[mhd]$/.test(val)) {
                    return 'Invalid format. Use number followed by m (minutes), h (hours), or d (days). Example: 7d';
                  }
                  return true;
                }
              });
            case 7:
              this.setupData.JWT_REFRESH_EXPIRATION = _context5.v;
              this.ui.success('JWT configuration complete!');
              this.ui.newLine();
            case 8:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function setupJWT() {
        return _setupJWT.apply(this, arguments);
      }
      return setupJWT;
    }()
    /**
     * Step 5: Email configuration
     */
    )
  }, {
    key: "setupEmail",
    value: (function () {
      var _setupEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var configureEmail;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this.ui.header('Step 5: Email Configuration (Optional)', 'mail');
              this.ui.info('Email is used for verification, password reset, and notifications.');
              this.ui.newLine();
              _context6.n = 1;
              return this.ui.confirm('Configure email now?', false);
            case 1:
              configureEmail = _context6.v;
              if (!configureEmail) {
                _context6.n = 7;
                break;
              }
              _context6.n = 2;
              return this.ui.question('SMTP Host', {
                defaultValue: 'smtp.gmail.com'
              });
            case 2:
              this.setupData.EMAIL_HOST = _context6.v;
              _context6.n = 3;
              return this.ui.question('SMTP Port', {
                defaultValue: '587'
              });
            case 3:
              this.setupData.EMAIL_PORT = _context6.v;
              _context6.n = 4;
              return this.ui.question('SMTP Username/Email');
            case 4:
              this.setupData.EMAIL_USER = _context6.v;
              _context6.n = 5;
              return this.ui.question('SMTP Password/App Password', {
                hidden: true
              });
            case 5:
              this.setupData.EMAIL_PASS = _context6.v;
              _context6.n = 6;
              return this.ui.question('From email address', {
                defaultValue: this.setupData.EMAIL_USER || 'noreply@itfy-evoting.com'
              });
            case 6:
              this.setupData.EMAIL_FROM = _context6.v;
              this.ui.success('Email configuration complete!');
              _context6.n = 8;
              break;
            case 7:
              this.ui.warning('Email not configured. Some features will be unavailable.');
            case 8:
              this.ui.newLine();
            case 9:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function setupEmail() {
        return _setupEmail.apply(this, arguments);
      }
      return setupEmail;
    }()
    /**
     * Step 6: Frontend configuration
     */
    )
  }, {
    key: "setupFrontend",
    value: (function () {
      var _setupFrontend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              this.ui.header('Step 6: Frontend Configuration', 'folder');
              _context7.n = 1;
              return this.ui.question('Frontend URL', {
                defaultValue: 'http://localhost:3001'
              });
            case 1:
              this.setupData.FRONTEND_URL = _context7.v;
              this.ui.success('Frontend configuration complete!');
              this.ui.newLine();
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function setupFrontend() {
        return _setupFrontend.apply(this, arguments);
      }
      return setupFrontend;
    }()
    /**
     * Step 7: Save configuration
     */
    )
  }, {
    key: "saveConfiguration",
    value: (function () {
      var _saveConfiguration = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var spinner, _t3;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              this.ui.header('Saving Configuration', 'file');
              spinner = this.ui.spinner('Writing configuration to .env file...');
              _context8.p = 1;
              _context8.n = 2;
              return this.config.save(this.setupData);
            case 2:
              spinner.stop();
              this.ui.success('Configuration saved to .env file!');
              _context8.n = 4;
              break;
            case 3:
              _context8.p = 3;
              _t3 = _context8.v;
              spinner.stop();
              throw new Error("Failed to save configuration: ".concat(_t3.message));
            case 4:
              this.ui.newLine();
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function saveConfiguration() {
        return _saveConfiguration.apply(this, arguments);
      }
      return saveConfiguration;
    }()
    /**
     * Step 8: Create first admin account
     */
    )
  }, {
    key: "createFirstAdmin",
    value: (function () {
      var _createFirstAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var adminData, passwordMatch, confirmPassword, spinner, userSchema, User, existingAdmin, passwordHash, _t4, _t5, _t6;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              this.ui.header('Step 7: Create Super Admin Account', 'admin');
              this.ui.info('Create the first administrator account for the system.');
              this.ui.newLine();
              _context9.n = 1;
              return this.ui.question('Admin full name', {
                validate: function validate(val) {
                  if (val.length < 2) return 'Name must be at least 2 characters';
                  return true;
                }
              });
            case 1:
              _t4 = _context9.v;
              _context9.n = 2;
              return this.ui.question('Admin email', {
                validate: function validate(val) {
                  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(val)) return 'Please enter a valid email address';
                  return true;
                }
              });
            case 2:
              _t5 = _context9.v;
              adminData = {
                name: _t4,
                email: _t5
              };
              // Password with confirmation
              passwordMatch = false;
            case 3:
              if (passwordMatch) {
                _context9.n = 6;
                break;
              }
              _context9.n = 4;
              return this.ui.question('Admin password (min 8 chars)', {
                hidden: true,
                validate: function validate(val) {
                  if (val.length < 8) return 'Password must be at least 8 characters';
                  if (!/[A-Z]/.test(val)) return 'Password must contain at least one uppercase letter';
                  if (!/[a-z]/.test(val)) return 'Password must contain at least one lowercase letter';
                  if (!/[0-9]/.test(val)) return 'Password must contain at least one number';
                  return true;
                }
              });
            case 4:
              adminData.password = _context9.v;
              _context9.n = 5;
              return this.ui.question('Confirm password', {
                hidden: true
              });
            case 5:
              confirmPassword = _context9.v;
              if (adminData.password === confirmPassword) {
                passwordMatch = true;
              } else {
                this.ui.error('Passwords do not match. Please try again.');
              }
              _context9.n = 3;
              break;
            case 6:
              // Create admin in database
              spinner = this.ui.spinner('Creating admin account...');
              _context9.p = 7;
              _context9.n = 8;
              return _mongoose["default"].connect(this.setupData.MONGODB_URI);
            case 8:
              // Create User model
              userSchema = new _mongoose["default"].Schema({
                name: {
                  type: String,
                  required: true
                },
                email: {
                  type: String,
                  required: true,
                  unique: true
                },
                password_hash: {
                  type: String,
                  required: true
                },
                role: {
                  type: String,
                  required: true
                },
                permissions: {
                  type: [String],
                  "default": ['read', 'write', 'update', 'delete', 'super']
                },
                email_verified: {
                  type: Boolean,
                  "default": true
                },
                status: {
                  type: String,
                  "default": 'active'
                }
              }, {
                timestamps: true
              });
              User = _mongoose["default"].models.User || _mongoose["default"].model('User', userSchema); // Check if admin already exists
              _context9.n = 9;
              return User.findOne({
                email: adminData.email
              });
            case 9:
              existingAdmin = _context9.v;
              if (!existingAdmin) {
                _context9.n = 11;
                break;
              }
              spinner.stop();
              this.ui.warning("Admin with email ".concat(adminData.email, " already exists. Skipping creation."));
              _context9.n = 10;
              return _mongoose["default"].disconnect();
            case 10:
              return _context9.a(2);
            case 11:
              _context9.n = 12;
              return _bcrypt["default"].hash(adminData.password, 12);
            case 12:
              passwordHash = _context9.v;
              _context9.n = 13;
              return User.create({
                name: adminData.name,
                email: adminData.email,
                password_hash: passwordHash,
                role: 'super_admin',
                permissions: ['read', 'write', 'update', 'delete', 'super'],
                email_verified: true,
                status: 'active'
              });
            case 13:
              _context9.n = 14;
              return _mongoose["default"].disconnect();
            case 14:
              spinner.stop();
              this.ui.success('Super admin account created successfully!');
              this.adminData = adminData;
              _context9.n = 16;
              break;
            case 15:
              _context9.p = 15;
              _t6 = _context9.v;
              spinner.stop();
              throw new Error("Failed to create admin account: ".concat(_t6.message));
            case 16:
              this.ui.newLine();
            case 17:
              return _context9.a(2);
          }
        }, _callee9, this, [[7, 15]]);
      }));
      function createFirstAdmin() {
        return _createFirstAdmin.apply(this, arguments);
      }
      return createFirstAdmin;
    }()
    /**
     * Step 9: Show summary
     */
    )
  }, {
    key: "showSummary",
    value: (function () {
      var _showSummary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _this$adminData;
        var summary;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              this.ui.header('Setup Complete!', 'star');
              summary = "\nEnvironment: ".concat(this.setupData.NODE_ENV, "\nServer Port: ").concat(this.setupData.PORT, "\nDatabase:    ").concat(this.config.maskSensitive(this.setupData.MONGODB_URI), "\nCache:       ").concat(this.setupData.REDIS_URL ? this.config.maskSensitive(this.setupData.REDIS_URL) : 'In-memory', "\nAdmin Email: ").concat(((_this$adminData = this.adminData) === null || _this$adminData === void 0 ? void 0 : _this$adminData.email) || 'N/A', "\n\nYou can now:\n  1. Run 'npm run dev' to start the development server\n  2. Use 'npm run console' to access this admin console\n  3. Login with your admin credentials\n");
              this.ui.box('Configuration Summary', summary, 70);
              this.ui.newLine();
              this.ui.info('The setup is complete. Press Enter to continue to the console...');
              _context0.n = 1;
              return this.ui.question('');
            case 1:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function showSummary() {
        return _showSummary.apply(this, arguments);
      }
      return showSummary;
    }())
  }]);
}();