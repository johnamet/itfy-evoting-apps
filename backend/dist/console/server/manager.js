"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerManager = void 0;
var _child_process = require("child_process");
var _util = require("util");
var _path = _interopRequireDefault(require("path"));
var _promises = _interopRequireDefault(require("fs/promises"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Server Manager for Console
 * Controls the backend server (start, stop, restart)
 */
var execAsync = (0, _util.promisify)(_child_process.exec);
var ServerManager = exports.ServerManager = /*#__PURE__*/function () {
  function ServerManager(config) {
    _classCallCheck(this, ServerManager);
    this.config = config;
    this.serverProcess = null;
    this.isRunning = false;
    this.logs = [];
    this.maxLogs = 1000;
    this.startTime = null;
  }

  /**
   * Check if server is running
   */
  return _createClass(ServerManager, [{
    key: "isServerRunning",
    value: function isServerRunning() {
      return this.isRunning && this.serverProcess !== null;
    }

    /**
     * Get server status
     */
  }, {
    key: "getStatus",
    value: function getStatus() {
      var _this$serverProcess;
      return {
        running: this.isRunning,
        pid: ((_this$serverProcess = this.serverProcess) === null || _this$serverProcess === void 0 ? void 0 : _this$serverProcess.pid) || null,
        uptime: this.startTime ? Math.floor((Date.now() - this.startTime) / 1000) : 0,
        port: this.config.get('PORT', '3000'),
        environment: this.config.get('NODE_ENV', 'development')
      };
    }

    /**
     * Start the backend server
     */
  }, {
    key: "startServer",
    value: (function () {
      var _startServer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var options,
          _options$mode,
          mode,
          _options$silent,
          silent,
          cwd,
          command,
          args,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              if (!this.isRunning) {
                _context.n = 1;
                break;
              }
              throw new Error('Server is already running');
            case 1:
              _options$mode = options.mode, mode = _options$mode === void 0 ? 'dev' : _options$mode, _options$silent = options.silent, silent = _options$silent === void 0 ? false : _options$silent;
              cwd = process.cwd(); // Determine the command based on mode
              if (mode === 'production') {
                command = 'node';
                args = ['dist/app.js'];
              } else {
                command = 'npx';
                args = ['nodemon'];
              }
              return _context.a(2, new Promise(function (resolve, reject) {
                try {
                  _this.serverProcess = (0, _child_process.spawn)(command, args, {
                    cwd: cwd,
                    stdio: ['pipe', 'pipe', 'pipe'],
                    env: _objectSpread(_objectSpread({}, process.env), {}, {
                      NODE_ENV: mode === 'production' ? 'production' : 'development',
                      FORCE_COLOR: '1'
                    }),
                    detached: false
                  });
                  _this.isRunning = true;
                  _this.startTime = Date.now();
                  _this.logs = [];

                  // Handle stdout
                  _this.serverProcess.stdout.on('data', function (data) {
                    var message = data.toString();
                    _this.addLog('stdout', message);
                    if (!silent) {
                      process.stdout.write(message);
                    }
                  });

                  // Handle stderr
                  _this.serverProcess.stderr.on('data', function (data) {
                    var message = data.toString();
                    _this.addLog('stderr', message);
                    if (!silent) {
                      process.stderr.write(message);
                    }
                  });

                  // Handle close
                  _this.serverProcess.on('close', function (code) {
                    _this.isRunning = false;
                    _this.startTime = null;
                    _this.addLog('system', "Server exited with code ".concat(code));
                  });

                  // Handle error
                  _this.serverProcess.on('error', function (error) {
                    _this.isRunning = false;
                    _this.addLog('error', error.message);
                    reject(error);
                  });

                  // Wait a bit to check if server started successfully
                  setTimeout(function () {
                    if (_this.isRunning) {
                      resolve({
                        success: true,
                        pid: _this.serverProcess.pid,
                        message: 'Server started successfully'
                      });
                    }
                  }, 2000);
                } catch (error) {
                  _this.isRunning = false;
                  reject(error);
                }
              }));
          }
        }, _callee, this);
      }));
      function startServer() {
        return _startServer.apply(this, arguments);
      }
      return startServer;
    }()
    /**
     * Stop the backend server
     */
    )
  }, {
    key: "stopServer",
    value: (function () {
      var _stopServer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this2 = this;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(!this.isRunning || !this.serverProcess)) {
                _context2.n = 1;
                break;
              }
              throw new Error('Server is not running');
            case 1:
              return _context2.a(2, new Promise(function (resolve, reject) {
                try {
                  // Try graceful shutdown first
                  _this2.serverProcess.kill('SIGTERM');

                  // Force kill after timeout
                  var timeout = setTimeout(function () {
                    if (_this2.isRunning) {
                      _this2.serverProcess.kill('SIGKILL');
                    }
                  }, 5000);
                  _this2.serverProcess.on('close', function () {
                    clearTimeout(timeout);
                    _this2.isRunning = false;
                    _this2.serverProcess = null;
                    _this2.startTime = null;
                    resolve({
                      success: true,
                      message: 'Server stopped successfully'
                    });
                  });
                } catch (error) {
                  reject(error);
                }
              }));
          }
        }, _callee2, this);
      }));
      function stopServer() {
        return _stopServer.apply(this, arguments);
      }
      return stopServer;
    }()
    /**
     * Restart the backend server
     */
    )
  }, {
    key: "restartServer",
    value: (function () {
      var _restartServer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var options,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              if (!this.isRunning) {
                _context3.n = 2;
                break;
              }
              _context3.n = 1;
              return this.stopServer();
            case 1:
              _context3.n = 2;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              });
            case 2:
              return _context3.a(2, this.startServer(options));
          }
        }, _callee3, this);
      }));
      function restartServer() {
        return _restartServer.apply(this, arguments);
      }
      return restartServer;
    }()
    /**
     * Add a log entry
     */
    )
  }, {
    key: "addLog",
    value: function addLog(type, message) {
      this.logs.push({
        timestamp: new Date().toISOString(),
        type: type,
        message: message.trim()
      });

      // Keep logs under max limit
      if (this.logs.length > this.maxLogs) {
        this.logs = this.logs.slice(-this.maxLogs);
      }
    }

    /**
     * Get recent logs
     */
  }, {
    key: "getLogs",
    value: function getLogs() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
      return this.logs.slice(-count);
    }

    /**
     * Clear logs
     */
  }, {
    key: "clearLogs",
    value: function clearLogs() {
      this.logs = [];
    }

    /**
     * Check if port is in use
     */
  }, {
    key: "isPortInUse",
    value: (function () {
      var _isPortInUse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(port) {
        var _yield$execAsync, stdout, _t;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return execAsync("lsof -i :".concat(port, " -t 2>/dev/null || true"));
            case 1:
              _yield$execAsync = _context4.v;
              stdout = _yield$execAsync.stdout;
              return _context4.a(2, stdout.trim().length > 0);
            case 2:
              _context4.p = 2;
              _t = _context4.v;
              return _context4.a(2, false);
          }
        }, _callee4, null, [[0, 2]]);
      }));
      function isPortInUse(_x) {
        return _isPortInUse.apply(this, arguments);
      }
      return isPortInUse;
    }()
    /**
     * Kill process on port
     */
    )
  }, {
    key: "killProcessOnPort",
    value: (function () {
      var _killProcessOnPort = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(port) {
        var _yield$execAsync2, stdout, pids, _iterator, _step, pid, _t2, _t3;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return execAsync("lsof -i :".concat(port, " -t 2>/dev/null || true"));
            case 1:
              _yield$execAsync2 = _context5.v;
              stdout = _yield$execAsync2.stdout;
              pids = stdout.trim().split('\n').filter(Boolean);
              _iterator = _createForOfIteratorHelper(pids);
              _context5.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context5.n = 5;
                break;
              }
              pid = _step.value;
              _context5.n = 4;
              return execAsync("kill -9 ".concat(pid));
            case 4:
              _context5.n = 3;
              break;
            case 5:
              _context5.n = 7;
              break;
            case 6:
              _context5.p = 6;
              _t2 = _context5.v;
              _iterator.e(_t2);
            case 7:
              _context5.p = 7;
              _iterator.f();
              return _context5.f(7);
            case 8:
              return _context5.a(2, pids.length > 0);
            case 9:
              _context5.p = 9;
              _t3 = _context5.v;
              return _context5.a(2, false);
          }
        }, _callee5, null, [[2, 6, 7, 8], [0, 9]]);
      }));
      function killProcessOnPort(_x2) {
        return _killProcessOnPort.apply(this, arguments);
      }
      return killProcessOnPort;
    }()
    /**
     * Get server health
     */
    )
  }, {
    key: "getHealth",
    value: (function () {
      var _getHealth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var port, _yield$execAsync3, stdout, _t4;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              if (this.isRunning) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, {
                status: 'offline'
              });
            case 1:
              _context6.p = 1;
              port = this.config.get('PORT', '3000');
              _context6.n = 2;
              return execAsync("curl -s http://localhost:".concat(port, "/api/v1/health"));
            case 2:
              _yield$execAsync3 = _context6.v;
              stdout = _yield$execAsync3.stdout;
              return _context6.a(2, JSON.parse(stdout));
            case 3:
              _context6.p = 3;
              _t4 = _context6.v;
              return _context6.a(2, {
                status: 'error',
                message: 'Health check failed'
              });
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function getHealth() {
        return _getHealth.apply(this, arguments);
      }
      return getHealth;
    }()
    /**
     * Run npm command
     */
    )
  }, {
    key: "runNpmCommand",
    value: (function () {
      var _runNpmCommand = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(command) {
        var args,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              args = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : [];
              return _context7.a(2, new Promise(function (resolve, reject) {
                var proc = (0, _child_process.spawn)('npm', [command].concat(_toConsumableArray(args)), {
                  cwd: process.cwd(),
                  stdio: 'inherit'
                });
                proc.on('close', function (code) {
                  if (code === 0) {
                    resolve({
                      success: true
                    });
                  } else {
                    reject(new Error("Command failed with code ".concat(code)));
                  }
                });
                proc.on('error', reject);
              }));
          }
        }, _callee7);
      }));
      function runNpmCommand(_x3) {
        return _runNpmCommand.apply(this, arguments);
      }
      return runNpmCommand;
    }()
    /**
     * Run database seed
     */
    )
  }, {
    key: "runSeed",
    value: (function () {
      var _runSeed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              return _context8.a(2, this.runNpmCommand('run', ['seed']));
          }
        }, _callee8, this);
      }));
      function runSeed() {
        return _runSeed.apply(this, arguments);
      }
      return runSeed;
    }()
    /**
     * Run lint
     */
    )
  }, {
    key: "runLint",
    value: (function () {
      var _runLint = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              return _context9.a(2, this.runNpmCommand('run', ['lint']));
          }
        }, _callee9, this);
      }));
      function runLint() {
        return _runLint.apply(this, arguments);
      }
      return runLint;
    }()
    /**
     * Run tests
     */
    )
  }, {
    key: "runTests",
    value: (function () {
      var _runTests = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, this.runNpmCommand('test'));
          }
        }, _callee0, this);
      }));
      function runTests() {
        return _runTests.apply(this, arguments);
      }
      return runTests;
    }())
  }]);
}();