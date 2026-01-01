"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerCommands = void 0;
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Server Commands
 * Controls the backend server (start, stop, restart, status)
 */
var ServerCommands = exports.ServerCommands = /*#__PURE__*/function () {
  function ServerCommands(router) {
    _classCallCheck(this, ServerCommands);
    this.router = router;
    this.ui = router.ui;
    this.serverManager = router.serverManager;
    this.config = router.config;
  }

  /**
   * Start the server
   */
  return _createClass(ServerCommands, [{
    key: "start",
    value: (function () {
      var _start = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(args) {
        var options, mode, port, portInUse, kill, silent, result, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = this.parseArgs(args);
              mode = options.mode || 'dev'; // Check if already running
              if (!this.serverManager.isServerRunning()) {
                _context.n = 2;
                break;
              }
              this.ui.warning('Server is already running');
              _context.n = 1;
              return this.status();
            case 1:
              return _context.a(2);
            case 2:
              // Check if port is in use
              port = this.config.get('PORT', '3000');
              _context.n = 3;
              return this.serverManager.isPortInUse(port);
            case 3:
              portInUse = _context.v;
              if (!portInUse) {
                _context.n = 7;
                break;
              }
              this.ui.warning("Port ".concat(port, " is already in use"));
              _context.n = 4;
              return this.ui.confirm('Kill existing process?', false);
            case 4:
              kill = _context.v;
              if (!kill) {
                _context.n = 6;
                break;
              }
              _context.n = 5;
              return this.serverManager.killProcessOnPort(port);
            case 5:
              this.ui.success('Killed existing process');
              _context.n = 7;
              break;
            case 6:
              this.ui.info('Server start cancelled');
              return _context.a(2);
            case 7:
              this.ui.header('Starting Server', 'rocket');
              this.ui.keyValue('Mode', mode, 15);
              this.ui.keyValue('Port', port, 15);
              this.ui.newLine();
              silent = options.silent === 'true' || options.silent === true;
              _context.p = 8;
              if (!silent) {
                this.ui.info('Server output will be shown below. Press Ctrl+C to stop.');
                this.ui.newLine();
              }
              _context.n = 9;
              return this.serverManager.startServer({
                mode: mode === 'production' ? 'production' : 'dev',
                silent: silent
              });
            case 9:
              result = _context.v;
              if (silent) {
                this.ui.success("Server started (PID: ".concat(result.pid, ")"));
                this.ui.info("Running in background. Use 'server:logs' to view output.");
              }
              _context.n = 11;
              break;
            case 10:
              _context.p = 10;
              _t = _context.v;
              this.ui.error("Failed to start server: ".concat(_t.message));
            case 11:
              return _context.a(2);
          }
        }, _callee, this, [[8, 10]]);
      }));
      function start(_x) {
        return _start.apply(this, arguments);
      }
      return start;
    }()
    /**
     * Stop the server
     */
    )
  }, {
    key: "stop",
    value: (function () {
      var _stop = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var confirm, spinner, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (this.serverManager.isServerRunning()) {
                _context2.n = 1;
                break;
              }
              this.ui.warning('Server is not running');
              return _context2.a(2);
            case 1:
              _context2.n = 2;
              return this.ui.confirm('Stop the server?', true);
            case 2:
              confirm = _context2.v;
              if (confirm) {
                _context2.n = 3;
                break;
              }
              this.ui.info('Cancelled');
              return _context2.a(2);
            case 3:
              spinner = this.ui.spinner('Stopping server...');
              _context2.p = 4;
              _context2.n = 5;
              return this.serverManager.stopServer();
            case 5:
              spinner.stop();
              this.ui.success('Server stopped');
              _context2.n = 7;
              break;
            case 6:
              _context2.p = 6;
              _t2 = _context2.v;
              spinner.stop();
              this.ui.error("Failed to stop server: ".concat(_t2.message));
            case 7:
              return _context2.a(2);
          }
        }, _callee2, this, [[4, 6]]);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }()
    /**
     * Restart the server
     */
    )
  }, {
    key: "restart",
    value: (function () {
      var _restart = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(args) {
        var options, mode, result, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = this.parseArgs(args);
              mode = options.mode || 'dev';
              this.ui.info('Restarting server...');
              _context3.p = 1;
              _context3.n = 2;
              return this.serverManager.restartServer({
                mode: mode === 'production' ? 'production' : 'dev',
                silent: options.silent === 'true'
              });
            case 2:
              result = _context3.v;
              this.ui.success("Server restarted (PID: ".concat(result.pid, ")"));
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              this.ui.error("Failed to restart server: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function restart(_x2) {
        return _restart.apply(this, arguments);
      }
      return restart;
    }()
    /**
     * Show server status
     */
    )
  }, {
    key: "status",
    value: (function () {
      var _status = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var status, statusColor, statusIcon, health, _i, _Object$entries, _Object$entries$_i, service, state, serviceIcon;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              status = this.serverManager.getStatus();
              this.ui.header('Server Status', 'server');
              statusColor = status.running ? 'green' : 'red';
              statusIcon = status.running ? '●' : '○';
              this.ui.print("  Status: ".concat(statusIcon, " ").concat(status.running ? 'Running' : 'Stopped'), statusColor);
              this.ui.newLine();
              if (!status.running) {
                _context4.n = 2;
                break;
              }
              this.ui.keyValue('PID', status.pid, 15);
              this.ui.keyValue('Port', status.port, 15);
              this.ui.keyValue('Environment', status.environment, 15);
              this.ui.keyValue('Uptime', this.formatUptime(status.uptime), 15);

              // Try to get health
              _context4.n = 1;
              return this.serverManager.getHealth();
            case 1:
              health = _context4.v;
              if (health.status === 'ok') {
                this.ui.newLine();
                this.ui.subheader('Services');
                for (_i = 0, _Object$entries = Object.entries(health.services || {}); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), service = _Object$entries$_i[0], state = _Object$entries$_i[1];
                  serviceIcon = state === 'connected' || state === 'ready' ? '✓' : '○';
                  this.ui.listItem("".concat(service, ": ").concat(state, " ").concat(serviceIcon));
                }
              }
              _context4.n = 3;
              break;
            case 2:
              this.ui.keyValue('Port (configured)', status.port, 15);
              this.ui.keyValue('Environment', status.environment, 15);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function status() {
        return _status.apply(this, arguments);
      }
      return status;
    }()
    /**
     * Show server logs
     */
    )
  }, {
    key: "logs",
    value: (function () {
      var _logs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(args) {
        var options, lines, logs, _iterator, _step, log, timestamp, color;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              options = this.parseArgs(args);
              lines = parseInt(options.lines) || 50;
              logs = this.serverManager.getLogs(lines);
              if (!(logs.length === 0)) {
                _context5.n = 1;
                break;
              }
              this.ui.info('No logs available');
              return _context5.a(2);
            case 1:
              this.ui.header("Server Logs (last ".concat(logs.length, " entries)"), 'file');
              _iterator = _createForOfIteratorHelper(logs);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  log = _step.value;
                  timestamp = new Date(log.timestamp).toLocaleTimeString();
                  color = 'white';
                  if (log.type === 'stderr' || log.type === 'error') {
                    color = 'red';
                  } else if (log.message.includes('error') || log.message.includes('Error')) {
                    color = 'red';
                  } else if (log.message.includes('warn') || log.message.includes('Warning')) {
                    color = 'yellow';
                  } else if (log.type === 'system') {
                    color = 'cyan';
                  }
                  this.ui.print("[".concat(timestamp, "] ").concat(log.message), color);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              if (options.follow === 'true') {
                this.ui.newLine();
                this.ui.info('Following logs... Press Ctrl+C to stop.');
                // Note: For full follow functionality, we'd need to implement streaming
              }
            case 2:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function logs(_x3) {
        return _logs.apply(this, arguments);
      }
      return logs;
    }()
    /**
     * Check server health
     */
    )
  }, {
    key: "health",
    value: (function () {
      var _health = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var spinner, _health2, _i2, _Object$entries2, _Object$entries2$_i, service, state, icon, color, _t4;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              spinner = this.ui.spinner('Checking health...');
              _context6.p = 1;
              _context6.n = 2;
              return this.serverManager.getHealth();
            case 2:
              _health2 = _context6.v;
              spinner.stop();
              if (!(_health2.status === 'offline')) {
                _context6.n = 3;
                break;
              }
              this.ui.warning('Server is offline');
              return _context6.a(2);
            case 3:
              if (!(_health2.status === 'error')) {
                _context6.n = 4;
                break;
              }
              this.ui.error(_health2.message || 'Health check failed');
              return _context6.a(2);
            case 4:
              this.ui.header('Server Health', 'heart');
              this.ui.keyValue('Status', _health2.status, 20);
              this.ui.keyValue('Timestamp', _health2.timestamp, 20);
              if (_health2.uptime) {
                this.ui.keyValue('Uptime', this.formatUptime(_health2.uptime), 20);
              }
              this.ui.keyValue('Environment', _health2.environment, 20);
              if (_health2.services) {
                this.ui.newLine();
                this.ui.subheader('Services');
                for (_i2 = 0, _Object$entries2 = Object.entries(_health2.services); _i2 < _Object$entries2.length; _i2++) {
                  _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), service = _Object$entries2$_i[0], state = _Object$entries2$_i[1];
                  icon = state === 'connected' || state === 'ready' ? '✓' : '○';
                  color = state === 'connected' || state === 'ready' ? 'green' : 'yellow';
                  this.ui.print("  ".concat(icon, " ").concat(service, ": ").concat(state), color);
                }
              }
              _context6.n = 6;
              break;
            case 5:
              _context6.p = 5;
              _t4 = _context6.v;
              spinner.stop();
              this.ui.error("Health check failed: ".concat(_t4.message));
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 5]]);
      }));
      function health() {
        return _health.apply(this, arguments);
      }
      return health;
    }()
    /**
     * Format uptime in human readable format
     */
    )
  }, {
    key: "formatUptime",
    value: function formatUptime(seconds) {
      var days = Math.floor(seconds / 86400);
      var hours = Math.floor(seconds % 86400 / 3600);
      var minutes = Math.floor(seconds % 3600 / 60);
      var secs = seconds % 60;
      var parts = [];
      if (days > 0) parts.push("".concat(days, "d"));
      if (hours > 0) parts.push("".concat(hours, "h"));
      if (minutes > 0) parts.push("".concat(minutes, "m"));
      parts.push("".concat(secs, "s"));
      return parts.join(' ');
    }

    /**
     * Parse command arguments
     */
  }, {
    key: "parseArgs",
    value: function parseArgs(args) {
      var options = {};
      var _iterator2 = _createForOfIteratorHelper(args),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var arg = _step2.value;
          if (arg.startsWith('--')) {
            var _arg$slice$split = arg.slice(2).split('='),
              _arg$slice$split2 = _slicedToArray(_arg$slice$split, 2),
              key = _arg$slice$split2[0],
              value = _arg$slice$split2[1];
            options[key] = value || true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return options;
    }
  }]);
}();