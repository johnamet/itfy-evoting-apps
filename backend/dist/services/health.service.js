"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.healthService = exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cacheUtils = require("../utils/cache/cache.utils.js");
var _agendaService = require("./agenda.service.js");
var _os = _interopRequireDefault(require("os"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * System Health Service
 * Provides comprehensive health monitoring and status reporting
 * for the e-voting platform's backend services
 */
var HealthService = /*#__PURE__*/function () {
  function HealthService() {
    _classCallCheck(this, HealthService);
    this.startTime = Date.now();
  }

  /**
   * Get comprehensive system health status
   * @returns {Promise<Object>} Health status with scores
   */
  return _createClass(HealthService, [{
    key: "getSystemHealth",
    value: (function () {
      var _getSystemHealth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var checks, _checks$map, _checks$map2, dbCheck, cacheCheck, agendaCheck, systemMetrics, healthScore;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return Promise.allSettled([this.checkDatabase(), this.checkCache(), this.checkAgenda(), this.getSystemMetrics()]);
            case 1:
              checks = _context.v;
              _checks$map = checks.map(function (result) {
                var _result$reason;
                return result.status === "fulfilled" ? result.value : {
                  status: "error",
                  error: (_result$reason = result.reason) === null || _result$reason === void 0 ? void 0 : _result$reason.message
                };
              }), _checks$map2 = _slicedToArray(_checks$map, 4), dbCheck = _checks$map2[0], cacheCheck = _checks$map2[1], agendaCheck = _checks$map2[2], systemMetrics = _checks$map2[3]; // Calculate health score (each service contributes to the score)
              healthScore = this.calculateHealthScore({
                database: dbCheck,
                cache: cacheCheck,
                agenda: agendaCheck,
                system: systemMetrics
              });
              return _context.a(2, {
                status: healthScore >= 80 ? "healthy" : healthScore >= 50 ? "degraded" : "unhealthy",
                score: healthScore,
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
                services: {
                  database: dbCheck,
                  cache: cacheCheck,
                  agenda: agendaCheck
                },
                system: systemMetrics
              });
          }
        }, _callee, this);
      }));
      function getSystemHealth() {
        return _getSystemHealth.apply(this, arguments);
      }
      return getSystemHealth;
    }()
    /**
     * Check database connectivity and performance
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "checkDatabase",
    value: (function () {
      var _checkDatabase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var startTime, state, stateMap, responseTime, stats, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              startTime = Date.now();
              state = _mongoose["default"].connection.readyState; // State: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
              stateMap = {
                0: "disconnected",
                1: "connected",
                2: "connecting",
                3: "disconnecting"
              };
              if (!(state !== 1)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, {
                status: "unhealthy",
                state: stateMap[state] || "unknown",
                responseTime: Date.now() - startTime
              });
            case 1:
              _context2.n = 2;
              return _mongoose["default"].connection.db.admin().ping();
            case 2:
              responseTime = Date.now() - startTime; // Get database stats
              _context2.n = 3;
              return _mongoose["default"].connection.db.stats();
            case 3:
              stats = _context2.v;
              return _context2.a(2, {
                status: responseTime < 100 ? "healthy" : responseTime < 500 ? "degraded" : "slow",
                state: "connected",
                responseTime: responseTime,
                collections: stats.collections || 0,
                objects: stats.objects || 0,
                dataSize: this.formatBytes(stats.dataSize || 0),
                indexSize: this.formatBytes(stats.indexSize || 0)
              });
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              return _context2.a(2, {
                status: "unhealthy",
                error: _t.message
              });
          }
        }, _callee2, this, [[0, 4]]);
      }));
      function checkDatabase() {
        return _checkDatabase.apply(this, arguments);
      }
      return checkDatabase;
    }()
    /**
     * Check cache (Redis or in-memory) status
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "checkCache",
    value: (function () {
      var _checkCache = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var health, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              if (_cacheUtils.cache) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, {
                status: "unavailable",
                store: "none"
              });
            case 1:
              _context3.n = 2;
              return _cacheUtils.cache.health();
            case 2:
              health = _context3.v;
              return _context3.a(2, {
                status: health.status,
                store: health.store,
                keys: health.keys || 0
              });
            case 3:
              _context3.p = 3;
              _t2 = _context3.v;
              return _context3.a(2, {
                status: "unhealthy",
                error: _t2.message
              });
          }
        }, _callee3, null, [[0, 3]]);
      }));
      function checkCache() {
        return _checkCache.apply(this, arguments);
      }
      return checkCache;
    }()
    /**
     * Check Agenda job queue status
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "checkAgenda",
    value: (function () {
      var _checkAgenda = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var status, jobStats, jobs, _t3, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              status = _agendaService.agendaManager.getStatus(); // Get pending and running jobs count if agenda is ready
              jobStats = {
                pending: 0,
                running: 0,
                failed: 0
              };
              if (!(status.isReady && _agendaService.agendaManager.agenda)) {
                _context4.n = 4;
                break;
              }
              _context4.p = 1;
              _context4.n = 2;
              return _agendaService.agendaManager.agenda.jobs({});
            case 2:
              jobs = _context4.v;
              jobStats.total = jobs.length;
              jobStats.pending = jobs.filter(function (j) {
                return !j.attrs.lastRunAt && !j.attrs.lockedAt;
              }).length;
              jobStats.running = jobs.filter(function (j) {
                return j.attrs.lockedAt && !j.attrs.lastFinishedAt;
              }).length;
              jobStats.failed = jobs.filter(function (j) {
                return j.attrs.failCount > 0;
              }).length;
              _context4.n = 4;
              break;
            case 3:
              _context4.p = 3;
              _t3 = _context4.v;
            case 4:
              return _context4.a(2, {
                status: status.isReady ? "healthy" : "initializing",
                uptime: status.uptime,
                startTime: status.startTime,
                jobs: jobStats
              });
            case 5:
              _context4.p = 5;
              _t4 = _context4.v;
              return _context4.a(2, {
                status: "unhealthy",
                error: _t4.message
              });
          }
        }, _callee4, null, [[1, 3], [0, 5]]);
      }));
      function checkAgenda() {
        return _checkAgenda.apply(this, arguments);
      }
      return checkAgenda;
    }()
    /**
     * Get system resource metrics
     * @returns {Object}
     */
    )
  }, {
    key: "getSystemMetrics",
    value: function getSystemMetrics() {
      try {
        var _cpuUsage$, _cpuUsage$2, _cpuUsage$3;
        var totalMem = _os["default"].totalmem();
        var freeMem = _os["default"].freemem();
        var usedMem = totalMem - freeMem;
        var memUsagePercent = (usedMem / totalMem * 100).toFixed(1);
        var cpuUsage = _os["default"].loadavg();
        var cpuCount = _os["default"].cpus().length;

        // Process memory usage
        var processMemory = process.memoryUsage();
        return {
          status: memUsagePercent < 80 ? "healthy" : memUsagePercent < 90 ? "degraded" : "critical",
          memory: {
            total: this.formatBytes(totalMem),
            free: this.formatBytes(freeMem),
            used: this.formatBytes(usedMem),
            usagePercent: parseFloat(memUsagePercent)
          },
          cpu: {
            cores: cpuCount,
            loadAvg: {
              "1min": ((_cpuUsage$ = cpuUsage[0]) === null || _cpuUsage$ === void 0 ? void 0 : _cpuUsage$.toFixed(2)) || 0,
              "5min": ((_cpuUsage$2 = cpuUsage[1]) === null || _cpuUsage$2 === void 0 ? void 0 : _cpuUsage$2.toFixed(2)) || 0,
              "15min": ((_cpuUsage$3 = cpuUsage[2]) === null || _cpuUsage$3 === void 0 ? void 0 : _cpuUsage$3.toFixed(2)) || 0
            }
          },
          process: {
            memory: {
              heapUsed: this.formatBytes(processMemory.heapUsed),
              heapTotal: this.formatBytes(processMemory.heapTotal),
              rss: this.formatBytes(processMemory.rss),
              external: this.formatBytes(processMemory.external)
            },
            pid: process.pid,
            uptime: Math.floor(process.uptime())
          },
          platform: _os["default"].platform(),
          nodeVersion: process.version
        };
      } catch (error) {
        return {
          status: "unknown",
          error: error.message
        };
      }
    }

    /**
     * Calculate overall health score (0-100)
     * @param {Object} services - Service health checks
     * @returns {number}
     */
  }, {
    key: "calculateHealthScore",
    value: function calculateHealthScore(services) {
      var _services$database, _services$database2, _services$database3, _services$database4, _services$cache, _services$cache2, _services$agenda, _services$agenda2, _services$system, _services$system2, _services$system3;
      var weights = {
        database: 40,
        // Database is critical
        cache: 20,
        // Cache is important but not critical
        agenda: 20,
        // Job queue is important
        system: 20 // System resources
      };
      var score = 0;

      // Database score
      if (((_services$database = services.database) === null || _services$database === void 0 ? void 0 : _services$database.status) === "healthy") {
        score += weights.database;
      } else if (((_services$database2 = services.database) === null || _services$database2 === void 0 ? void 0 : _services$database2.status) === "degraded" || ((_services$database3 = services.database) === null || _services$database3 === void 0 ? void 0 : _services$database3.status) === "slow") {
        score += weights.database * 0.7;
      } else if (((_services$database4 = services.database) === null || _services$database4 === void 0 ? void 0 : _services$database4.state) === "connected") {
        score += weights.database * 0.5;
      }

      // Cache score
      if (((_services$cache = services.cache) === null || _services$cache === void 0 ? void 0 : _services$cache.status) === "healthy") {
        score += weights.cache;
      } else if (((_services$cache2 = services.cache) === null || _services$cache2 === void 0 ? void 0 : _services$cache2.status) === "unavailable") {
        // No cache is still acceptable
        score += weights.cache * 0.5;
      }

      // Agenda score
      if (((_services$agenda = services.agenda) === null || _services$agenda === void 0 ? void 0 : _services$agenda.status) === "healthy") {
        score += weights.agenda;
      } else if (((_services$agenda2 = services.agenda) === null || _services$agenda2 === void 0 ? void 0 : _services$agenda2.status) === "initializing") {
        score += weights.agenda * 0.7;
      }

      // System score
      if (((_services$system = services.system) === null || _services$system === void 0 ? void 0 : _services$system.status) === "healthy") {
        score += weights.system;
      } else if (((_services$system2 = services.system) === null || _services$system2 === void 0 ? void 0 : _services$system2.status) === "degraded") {
        score += weights.system * 0.7;
      } else if (((_services$system3 = services.system) === null || _services$system3 === void 0 ? void 0 : _services$system3.status) === "critical") {
        score += weights.system * 0.3;
      }
      return Math.round(score);
    }

    /**
     * Format bytes to human-readable string
     * @param {number} bytes
     * @returns {string}
     */
  }, {
    key: "formatBytes",
    value: function formatBytes(bytes) {
      if (bytes === 0) return "0 B";
      var k = 1024;
      var sizes = ["B", "KB", "MB", "GB", "TB"];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(2)), " ").concat(sizes[i]);
    }

    /**
     * Get quick health status (for simple health checks)
     * @returns {Promise<Object>}
     */
  }, {
    key: "getQuickHealth",
    value: (function () {
      var _getQuickHealth = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var dbState, agendaState;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              dbState = _mongoose["default"].connection.readyState === 1;
              agendaState = _agendaService.agendaManager.getStatus().isReady;
              return _context5.a(2, {
                status: dbState ? "ok" : "error",
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV,
                services: {
                  database: dbState ? "connected" : "disconnected",
                  cache: _cacheUtils.cache ? "connected" : "disconnected",
                  agenda: agendaState ? "ready" : "initializing"
                }
              });
          }
        }, _callee5);
      }));
      function getQuickHealth() {
        return _getQuickHealth.apply(this, arguments);
      }
      return getQuickHealth;
    }())
  }]);
}(); // Export singleton instance
var healthService = exports.healthService = new HealthService();
var _default = exports["default"] = healthService;