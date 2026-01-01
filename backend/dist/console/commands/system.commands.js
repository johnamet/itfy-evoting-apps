"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemCommands = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t5 in e) "default" !== _t5 && {}.hasOwnProperty.call(e, _t5) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t5)) && (i.get || i.set) ? o(f, _t5, i) : f[_t5] = e[_t5]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * System Commands
 * Handles configuration and system-level operations
 */
var SystemCommands = exports.SystemCommands = /*#__PURE__*/function () {
  function SystemCommands(router) {
    _classCallCheck(this, SystemCommands);
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
  }

  /**
   * Show current configuration
   */
  return _createClass(SystemCommands, [{
    key: "showConfig",
    value: (function () {
      var _showConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var summary, dbState;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this.ui.header('System Configuration', 'gear');
              summary = this.config.getSummary(); // Server section
              this.ui.subheader('Server');
              this.ui.keyValue('Environment', summary.server.nodeEnv, 20);
              this.ui.keyValue('Port', summary.server.port, 20);
              this.ui.keyValue('CORS Origin', summary.server.corsOrigin, 20);
              this.ui.newLine();

              // Database section
              this.ui.subheader('Database');
              this.ui.keyValue('URI', summary.database.uri, 20);
              dbState = _mongoose["default"].connection.readyState === 1 ? 'Connected' : 'Disconnected';
              this.ui.keyValue('Status', dbState, 20);
              this.ui.newLine();

              // Cache section
              this.ui.subheader('Cache');
              this.ui.keyValue('URL', summary.cache.url, 20);
              this.ui.newLine();

              // JWT section
              this.ui.subheader('JWT');
              this.ui.keyValue('Configured', summary.jwt.configured ? 'Yes' : 'No', 20);
              this.ui.keyValue('Expiration', summary.jwt.expiration, 20);
              this.ui.newLine();

              // Email section
              this.ui.subheader('Email');
              this.ui.keyValue('Configured', summary.email.configured ? 'Yes' : 'No', 20);
              this.ui.keyValue('Host', summary.email.host, 20);
              this.ui.newLine();

              // Frontend section
              this.ui.subheader('Frontend');
              this.ui.keyValue('URL', summary.frontend.url, 20);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function showConfig() {
        return _showConfig.apply(this, arguments);
      }
      return showConfig;
    }()
    /**
     * Set a configuration value
     */
    )
  }, {
    key: "setConfig",
    value: (function () {
      var _setConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(key, value) {
        var sensitiveKeys, confirm, spinner, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (key) {
                _context2.n = 1;
                break;
              }
              this.ui.error('Please provide a configuration key');
              this.ui.info('Usage: config:set <key> <value>');
              return _context2.a(2);
            case 1:
              if (value) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return this.ui.question("Enter value for ".concat(key));
            case 2:
              value = _context2.v;
            case 3:
              // Sensitive keys that require special handling
              sensitiveKeys = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'EMAIL_PASS', 'PAYSTACK_SECRET_KEY'];
              if (!sensitiveKeys.includes(key)) {
                _context2.n = 5;
                break;
              }
              this.ui.warning('This is a sensitive configuration key.');
              _context2.n = 4;
              return this.ui.confirm('Are you sure you want to update it?', false);
            case 4:
              confirm = _context2.v;
              if (confirm) {
                _context2.n = 5;
                break;
              }
              this.ui.info('Cancelled');
              return _context2.a(2);
            case 5:
              spinner = this.ui.spinner('Updating configuration...');
              _context2.p = 6;
              _context2.n = 7;
              return this.config.updateValue(key, value);
            case 7:
              spinner.stop();
              this.ui.success("Configuration updated: ".concat(key));
              if (!sensitiveKeys.includes(key)) {
                this.ui.keyValue('New Value', value);
              }
              this.ui.newLine();
              this.ui.warning('Some changes may require a server restart to take effect.');
              _context2.n = 9;
              break;
            case 8:
              _context2.p = 8;
              _t = _context2.v;
              spinner.stop();
              this.ui.error("Failed to update configuration: ".concat(_t.message));
            case 9:
              return _context2.a(2);
          }
        }, _callee2, this, [[6, 8]]);
      }));
      function setConfig(_x, _x2) {
        return _setConfig.apply(this, arguments);
      }
      return setConfig;
    }()
    /**
     * Reload configuration from file
     */
    )
  }, {
    key: "reloadConfig",
    value: (function () {
      var _reloadConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var spinner, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              spinner = this.ui.spinner('Reloading configuration...');
              _context3.p = 1;
              _context3.n = 2;
              return this.config.load();
            case 2:
              spinner.stop();
              this.ui.success('Configuration reloaded from .env file');
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _t2 = _context3.v;
              spinner.stop();
              this.ui.error("Failed to reload configuration: ".concat(_t2.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function reloadConfig() {
        return _reloadConfig.apply(this, arguments);
      }
      return reloadConfig;
    }()
    /**
     * Clear cache
     */
    )
  }, {
    key: "clearCache",
    value: (function () {
      var _clearCache = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var confirm, spinner, redisUrl, Redis, redis, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.n = 1;
              return this.ui.confirm('Clear all cache data?', false);
            case 1:
              confirm = _context4.v;
              if (confirm) {
                _context4.n = 2;
                break;
              }
              this.ui.info('Cancelled');
              return _context4.a(2);
            case 2:
              spinner = this.ui.spinner('Clearing cache...');
              _context4.p = 3;
              // Try to connect to Redis and flush
              redisUrl = this.config.get('REDIS_URL');
              if (!redisUrl) {
                _context4.n = 6;
                break;
              }
              _context4.n = 4;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('ioredis'));
              });
            case 4:
              Redis = _context4.v["default"];
              redis = new Redis(redisUrl);
              _context4.n = 5;
              return redis.flushdb();
            case 5:
              redis.disconnect();
            case 6:
              spinner.stop();
              this.ui.success('Cache cleared successfully');
              _context4.n = 8;
              break;
            case 7:
              _context4.p = 7;
              _t3 = _context4.v;
              spinner.stop();
              this.ui.error("Failed to clear cache: ".concat(_t3.message));
              this.ui.info('Note: Redis may not be running or configured');
            case 8:
              return _context4.a(2);
          }
        }, _callee4, this, [[3, 7]]);
      }));
      function clearCache() {
        return _clearCache.apply(this, arguments);
      }
      return clearCache;
    }()
    /**
     * Show cache statistics
     */
    )
  }, {
    key: "cacheStats",
    value: (function () {
      var _cacheStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var spinner, redisUrl, Redis, redis, info, dbSize, lines, stats, _iterator, _step, line, _line$split, _line$split2, key, value, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              spinner = this.ui.spinner('Fetching cache statistics...');
              _context5.p = 1;
              redisUrl = this.config.get('REDIS_URL');
              if (redisUrl) {
                _context5.n = 2;
                break;
              }
              spinner.stop();
              this.ui.warning('Redis not configured');
              return _context5.a(2);
            case 2:
              _context5.n = 3;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('ioredis'));
              });
            case 3:
              Redis = _context5.v["default"];
              redis = new Redis(redisUrl, {
                connectTimeout: 5000
              });
              _context5.n = 4;
              return redis.info();
            case 4:
              info = _context5.v;
              _context5.n = 5;
              return redis.dbsize();
            case 5:
              dbSize = _context5.v;
              spinner.stop();
              this.ui.header('Cache Statistics', 'thunder');

              // Parse Redis INFO
              lines = info.split('\r\n');
              stats = {};
              _iterator = _createForOfIteratorHelper(lines);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  line = _step.value;
                  if (line.includes(':')) {
                    _line$split = line.split(':'), _line$split2 = _slicedToArray(_line$split, 2), key = _line$split2[0], value = _line$split2[1];
                    stats[key] = value;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              this.ui.keyValue('Status', 'Connected', 25);
              this.ui.keyValue('Keys', dbSize.toLocaleString(), 25);
              this.ui.keyValue('Used Memory', stats.used_memory_human || 'N/A', 25);
              this.ui.keyValue('Peak Memory', stats.used_memory_peak_human || 'N/A', 25);
              this.ui.keyValue('Uptime (days)', stats.uptime_in_days || 'N/A', 25);
              this.ui.keyValue('Connected Clients', stats.connected_clients || 'N/A', 25);
              this.ui.keyValue('Total Connections', stats.total_connections_received || 'N/A', 25);
              this.ui.keyValue('Total Commands', stats.total_commands_processed || 'N/A', 25);
              redis.disconnect();
              _context5.n = 7;
              break;
            case 6:
              _context5.p = 6;
              _t4 = _context5.v;
              spinner.stop();
              this.ui.error("Failed to get cache stats: ".concat(_t4.message));
            case 7:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 6]]);
      }));
      function cacheStats() {
        return _cacheStats.apply(this, arguments);
      }
      return cacheStats;
    }())
  }]);
}();