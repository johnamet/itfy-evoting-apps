"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleApp = void 0;
var _readline = _interopRequireDefault(require("readline"));
var _events = require("events");
var _wizard = require("./setup/wizard.js");
var _manager = require("./auth/manager.js");
var _router = require("./commands/router.js");
var _ui = require("./utils/ui.js");
var _config = require("./utils/config.js");
var _manager2 = require("./server/manager.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t5 in e) "default" !== _t5 && {}.hasOwnProperty.call(e, _t5) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t5)) && (i.get || i.set) ? o(f, _t5, i) : f[_t5] = e[_t5]); return f; })(e, t); }
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
 * Main Console Application
 * Orchestrates the CLI interface, authentication, and command routing
 * FIXED: Proper readline handling to prevent double input display
 */
var ConsoleApp = exports.ConsoleApp = /*#__PURE__*/function (_EventEmitter) {
  function ConsoleApp() {
    var _this;
    _classCallCheck(this, ConsoleApp);
    _this = _callSuper(this, ConsoleApp);
    _this.ui = new _ui.UI();
    _this.config = new _config.Config();
    _this.authManager = null;
    _this.commandRouter = null;
    _this.serverManager = null;
    _this.currentUser = null;
    _this.isRunning = false;
    _this.rl = null;
    return _this;
  }

  /**
   * Start the console application
   */
  _inherits(ConsoleApp, _EventEmitter);
  return _createClass(ConsoleApp, [{
    key: "start",
    value: (function () {
      var _start = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var needsSetup, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              this.ui.clear();
              this.ui.printBanner();
              _context.p = 1;
              _context.n = 2;
              return this.checkFirstRun();
            case 2:
              needsSetup = _context.v;
              if (!needsSetup) {
                _context.n = 3;
                break;
              }
              _context.n = 3;
              return this.runSetupWizard();
            case 3:
              _context.n = 4;
              return this.config.load();
            case 4:
              // Initialize managers
              this.authManager = new _manager.AuthManager(this.config);
              this.serverManager = new _manager2.ServerManager(this.config);
              this.commandRouter = new _router.CommandRouter(this);

              // Start interactive session
              _context.n = 5;
              return this.runInteractiveSession();
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              this.ui.error("Fatal error: ".concat(_t.message));
              process.exit(1);
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[1, 6]]);
      }));
      function start() {
        return _start.apply(this, arguments);
      }
      return start;
    }()
    /**
     * Check if first-time setup is needed
     */
    )
  }, {
    key: "checkFirstRun",
    value: (function () {
      var _checkFirstRun = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var envExists, hasAdmin, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.config.envFileExists();
            case 1:
              envExists = _context2.v;
              if (!envExists) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return this.checkAdminExists();
            case 2:
              _t2 = _context2.v;
              _context2.n = 4;
              break;
            case 3:
              _t2 = false;
            case 4:
              hasAdmin = _t2;
              return _context2.a(2, !envExists || !hasAdmin);
          }
        }, _callee2, this);
      }));
      function checkFirstRun() {
        return _checkFirstRun.apply(this, arguments);
      }
      return checkFirstRun;
    }()
    /**
     * Check if any admin user exists in the database
     */
    )
  }, {
    key: "checkAdminExists",
    value: (function () {
      var _checkAdminExists = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var mongoose, dbUri, User, adminCount, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.config.load();
            case 1:
              _context3.n = 2;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('mongoose'));
              });
            case 2:
              mongoose = _context3.v;
              dbUri = process.env.MONGODB_URI || this.config.get('MONGODB_URI');
              if (dbUri) {
                _context3.n = 3;
                break;
              }
              return _context3.a(2, false);
            case 3:
              _context3.n = 4;
              return mongoose["default"].connect(dbUri, {
                serverSelectionTimeoutMS: 5000
              });
            case 4:
              // Check for admin users
              User = mongoose["default"].model('User', new mongoose["default"].Schema({
                role: String,
                email: String,
                name: String
              }));
              _context3.n = 5;
              return User.countDocuments({
                role: {
                  $in: ['super_admin', 'admin']
                }
              });
            case 5:
              adminCount = _context3.v;
              _context3.n = 6;
              return mongoose["default"].disconnect();
            case 6:
              return _context3.a(2, adminCount > 0);
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              return _context3.a(2, false);
          }
        }, _callee3, this, [[0, 7]]);
      }));
      function checkAdminExists() {
        return _checkAdminExists.apply(this, arguments);
      }
      return checkAdminExists;
    }()
    /**
     * Run the first-time setup wizard
     */
    )
  }, {
    key: "runSetupWizard",
    value: (function () {
      var _runSetupWizard = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var wizard, setupComplete;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              wizard = new _wizard.SetupWizard(this.ui, this.config);
              _context4.n = 1;
              return wizard.run();
            case 1:
              setupComplete = _context4.v;
              if (!setupComplete) {
                this.ui.error('Setup cancelled. Cannot continue without configuration.');
                process.exit(1);
              }
              this.ui.success('Setup completed successfully!');
              this.ui.newLine();
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function runSetupWizard() {
        return _runSetupWizard.apply(this, arguments);
      }
      return runSetupWizard;
    }()
    /**
     * Run the main interactive session
     * FIXED: Proper readline configuration to prevent double input display
     */
    )
  }, {
    key: "runInteractiveSession",
    value: (function () {
      var _runInteractiveSession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _this2 = this;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              this.isRunning = true;

              // Clear any lingering input from setup wizard
              process.stdin.pause();
              process.stdin.setRawMode && process.stdin.setRawMode(false);

              // Small delay to ensure stdin is clean
              _context6.n = 1;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 1:
              // Create readline interface with proper configuration
              this.rl = _readline["default"].createInterface({
                input: process.stdin,
                output: process.stdout,
                prompt: this.ui.getPrompt(),
                terminal: true,
                historySize: 100,
                removeHistoryDuplicates: true,
                // Prevent double echo
                completer: undefined
              });

              // Pass readline reference to UI for proper handling
              this.ui.setReadlineInterface(this.rl);

              // Handle line input
              this.rl.on('line', /*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(line) {
                  var input;
                  return _regenerator().w(function (_context5) {
                    while (1) switch (_context5.n) {
                      case 0:
                        input = line.trim();
                        if (!input) {
                          _context5.n = 2;
                          break;
                        }
                        // Pause readline while processing to prevent interference
                        _this2.rl.pause();
                        _context5.n = 1;
                        return _this2.handleInput(input);
                      case 1:
                        // Resume and show prompt
                        if (_this2.isRunning) {
                          _this2.rl.resume();
                          _this2.rl.setPrompt(_this2.ui.getPrompt(_this2.currentUser));
                          _this2.rl.prompt();
                        }
                        _context5.n = 3;
                        break;
                      case 2:
                        // Empty input, just show prompt again
                        if (_this2.isRunning) {
                          _this2.rl.prompt();
                        }
                      case 3:
                        return _context5.a(2);
                    }
                  }, _callee5);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());

              // Handle close
              this.rl.on('close', function () {
                _this2.shutdown();
              });

              // Handle SIGINT (Ctrl+C)
              this.rl.on('SIGINT', function () {
                _this2.ui.newLine();
                _this2.ui.warning('Press Ctrl+C again to exit, or type "exit" to quit gracefully');
                _this2.rl.prompt();
              });

              // Handle SIGTERM
              process.on('SIGTERM', function () {
                _this2.shutdown();
              });

              // Show initial prompt
              this.ui.info('Welcome to ITFY E-Voting Admin Console');
              this.ui.info('Type "help" for available commands, "login" to authenticate');
              this.ui.newLine();
              this.rl.prompt();
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function runInteractiveSession() {
        return _runInteractiveSession.apply(this, arguments);
      }
      return runInteractiveSession;
    }()
    /**
     * Handle user input
     */
    )
  }, {
    key: "handleInput",
    value: (function () {
      var _handleInput = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(input) {
        var _t4;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.commandRouter.execute(input, this.currentUser);
            case 1:
              _context7.n = 3;
              break;
            case 2:
              _context7.p = 2;
              _t4 = _context7.v;
              this.ui.error(_t4.message);
            case 3:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 2]]);
      }));
      function handleInput(_x2) {
        return _handleInput.apply(this, arguments);
      }
      return handleInput;
    }()
    /**
     * Set the current authenticated user
     */
    )
  }, {
    key: "setCurrentUser",
    value: function setCurrentUser(user) {
      this.currentUser = user;
    }

    /**
     * Clear the current user session
     */
  }, {
    key: "clearCurrentUser",
    value: function clearCurrentUser() {
      this.currentUser = null;
    }

    /**
     * Shutdown the console
     */
  }, {
    key: "shutdown",
    value: function shutdown() {
      var _this$serverManager;
      if (!this.isRunning) return;
      this.isRunning = false;

      // Close readline interface
      if (this.rl) {
        this.rl.close();
      }
      this.ui.newLine();
      this.ui.info('Shutting down console...');

      // Stop server if running
      if ((_this$serverManager = this.serverManager) !== null && _this$serverManager !== void 0 && _this$serverManager.isServerRunning()) {
        this.ui.info('Stopping backend server...');
        try {
          this.serverManager.stopServer();
        } catch (error) {
          // Ignore errors during shutdown
        }
      }
      this.ui.success('Goodbye!');

      // Force exit after a short delay
      setTimeout(function () {
        process.exit(0);
      }, 100);
    }
  }]);
}(_events.EventEmitter);