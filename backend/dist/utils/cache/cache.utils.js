"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cache = void 0;
var _ioredis = _interopRequireDefault(require("ioredis"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-undef */ /**
 * Cache Manager
 * Unified Redis + in-memory cache for tokens, rate limiting, sessions
 * Features:
 * - Robust Redis connection with retries and fallbacks
 * - In-memory cache for dev/test or Redis failures
 * - Standardized get/set/del/exists/incr methods
 * - TTL support and expiration management
 * - Health checks and graceful shutdown
 */
var CacheManager = /*#__PURE__*/function () {
  function CacheManager() {
    _classCallCheck(this, CacheManager);
    this.client = null;
    this.isConnected = false;
    this.inMemoryStore = new Map(); // Fallback for test/dev
    this.inMemoryTimers = new Map(); // To track TTL timers
    this.useInMemory = process.env.USE_IN_MEMORY_CACHE === "true" || process.env.NODE_ENV === "test";
    this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    this.maxRetries = parseInt(process.env.REDIS_MAX_RETRIES, 10) || 5;
    this.retryDelay = parseInt(process.env.REDIS_RETRY_DELAY_MS, 10) || 2000;
    this.retryCount = 0;
  }

  /**
   * Connect to Redis with retry logic
   */
  return _createClass(CacheManager, [{
    key: "connect",
    value: (function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(this.isConnected || this.useInMemory)) {
                _context.n = 1;
                break;
              }
              if (this.useInMemory) {
                console.log("Using in-memory cache (dev/test mode)");
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              console.log("Connecting to Redis: ".concat(this.redisUrl.replace(/:[^:@]+@/, ":***@")));
              this.client = new _ioredis["default"](this.redisUrl, {
                maxRetriesPerRequest: 3,
                connectTimeout: 10000,
                lazyConnect: true,
                retryStrategy: function retryStrategy(times) {
                  if (times > _this.maxRetries) return null;
                  return Math.min(times * _this.retryDelay, 10000);
                }
              });
              this.client.on("connect", function () {
                _this.isConnected = true;
                _this.retryCount = 0;
                console.log("Redis connected");
              });
              this.client.on("error", function (err) {
                console.error("Redis error:", err.message);
                _this.isConnected = false;
              });
              this.client.on("close", function () {
                console.warn("Redis connection closed");
                _this.isConnected = false;
              });
              this.client.on("reconnecting", function () {
                console.log("Redis reconnecting...");
              });
              _context.n = 2;
              return this.client.connect();
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error("Redis connection failed:", _t.message);
              if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                setTimeout(function () {
                  return _this.connect();
                }, this.retryDelay);
              } else {
                console.warn("Redis failed. Falling back to in-memory cache.");
                this.useInMemory = true;
              }
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     * Get value from cache
     * @param {string} key
     * @returns {Promise<string|null>}
     */
    )
  }, {
    key: "get",
    value: (function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(key) {
        var _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if (!this.useInMemory) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, this.inMemoryStore.get(key) || null);
            case 1:
              _context2.n = 2;
              return this.client.get(key);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.warn("Cache GET failed (".concat(key, "):"), _t2.message);
              return _context2.a(2, this.inMemoryStore.get(key) || null);
          }
        }, _callee2, this, [[0, 3]]);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Set value with TTL
     * @param {string} key
     * @param {string} value
     * @param {string} [mode='EX'] - 'EX' for seconds, 'PX' for milliseconds
     * @param {number} [ttlSeconds] - TTL in seconds (or ms if mode='PX')
     */
    )
  }, {
    key: "set",
    value: (function () {
      var _set = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(key, value) {
        var mode,
          ttlSeconds,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              mode = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : "EX";
              ttlSeconds = _args3.length > 3 ? _args3[3] : undefined;
              _context3.p = 1;
              if (!this.useInMemory) {
                _context3.n = 2;
                break;
              }
              this.inMemoryStore.set(key, String(value)); // ✅ FIX: Always store as string

              if (ttlSeconds) {
                this._setInMemoryTTL(key, ttlSeconds, mode);
              }
              return _context3.a(2, "OK");
            case 2:
              if (!ttlSeconds) {
                _context3.n = 4;
                break;
              }
              _context3.n = 3;
              return this.client.set(key, value, mode, ttlSeconds);
            case 3:
              return _context3.a(2, _context3.v);
            case 4:
              _context3.n = 5;
              return this.client.set(key, value);
            case 5:
              return _context3.a(2, _context3.v);
            case 6:
              _context3.n = 8;
              break;
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              console.warn("Cache SET failed (".concat(key, "):"), _t3.message);
              this.inMemoryStore.set(key, String(value));
              return _context3.a(2, null);
            case 8:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 7]]);
      }));
      function set(_x2, _x3) {
        return _set.apply(this, arguments);
      }
      return set;
    }()
    /**
     * Delete key
     * @param {string} key
     * @returns {Promise<number>} Number of keys deleted
     */
    )
  }, {
    key: "del",
    value: (function () {
      var _del = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(key) {
        var existed, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              if (!this.useInMemory) {
                _context4.n = 1;
                break;
              }
              existed = this.inMemoryStore.has(key);
              this.inMemoryStore["delete"](key);
              this._clearInMemoryTimer(key); // ✅ FIX: Clear timer to prevent leak
              return _context4.a(2, existed ? 1 : 0);
            case 1:
              _context4.n = 2;
              return this.client.del(key);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              console.warn("Cache DEL failed (".concat(key, "):"), _t4.message);
              this.inMemoryStore["delete"](key);
              this._clearInMemoryTimer(key);
              return _context4.a(2, 0);
          }
        }, _callee4, this, [[0, 3]]);
      }));
      function del(_x4) {
        return _del.apply(this, arguments);
      }
      return del;
    }()
    /**
     * Check if key exists
     * @param {string} key
     * @returns {Promise<number>} 1 if exists, 0 if not
     */
    )
  }, {
    key: "exists",
    value: (function () {
      var _exists = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(key) {
        var _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              if (!this.useInMemory) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, this.inMemoryStore.has(key) ? 1 : 0);
            case 1:
              _context5.n = 2;
              return this.client.exists(key);
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              console.warn("Cache EXISTS failed (".concat(key, "):"), _t5.message);
              return _context5.a(2, this.inMemoryStore.has(key) ? 1 : 0);
          }
        }, _callee5, this, [[0, 3]]);
      }));
      function exists(_x5) {
        return _exists.apply(this, arguments);
      }
      return exists;
    }()
    /**
     * Increment counter (for rate limiting)
     * @param {string} key
     * @returns {Promise<number>}
     */
    )
  }, {
    key: "incr",
    value: (function () {
      var _incr = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(key) {
        var current, value, _current, _value, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              if (!this.useInMemory) {
                _context6.n = 1;
                break;
              }
              current = this.inMemoryStore.get(key);
              value = current ? parseInt(current, 10) + 1 : 1;
              this.inMemoryStore.set(key, String(value));
              return _context6.a(2, value);
            case 1:
              _context6.n = 2;
              return this.client.incr(key);
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              console.warn("Cache INCR failed (".concat(key, "):"), _t6.message);
              _current = this.inMemoryStore.get(key);
              _value = _current ? parseInt(_current, 10) + 1 : 1;
              this.inMemoryStore.set(key, String(_value));
              return _context6.a(2, _value);
          }
        }, _callee6, this, [[0, 3]]);
      }));
      function incr(_x6) {
        return _incr.apply(this, arguments);
      }
      return incr;
    }()
    /**
     * Set expiration on existing key
     * @param {string} key
     * @param {number} seconds
     * @returns {Promise<number>} 1 if timeout was set, 0 if key doesn't exist
     */
    )
  }, {
    key: "expire",
    value: (function () {
      var _expire = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(key, seconds) {
        var _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              if (!this.useInMemory) {
                _context7.n = 2;
                break;
              }
              if (this.inMemoryStore.has(key)) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, 0);
            case 1:
              this._setInMemoryTTL(key, seconds, "EX");
              return _context7.a(2, 1);
            case 2:
              _context7.n = 3;
              return this.client.expire(key, seconds);
            case 3:
              return _context7.a(2, _context7.v);
            case 4:
              _context7.p = 4;
              _t7 = _context7.v;
              console.warn("Cache EXPIRE failed (".concat(key, "):"), _t7.message);
              return _context7.a(2, 0);
          }
        }, _callee7, this, [[0, 4]]);
      }));
      function expire(_x7, _x8) {
        return _expire.apply(this, arguments);
      }
      return expire;
    }()
    /**
     * Get remaining TTL
     * @param {string} key
     * @returns {Promise<number>} TTL in seconds, -1 if no expiry, -2 if key doesn't exist
     */
    )
  }, {
    key: "ttl",
    value: (function () {
      var _ttl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(key) {
        var _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              if (!this.useInMemory) {
                _context8.n = 2;
                break;
              }
              if (this.inMemoryStore.has(key)) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, -2);
            case 1:
              return _context8.a(2, -1);
            case 2:
              _context8.n = 3;
              return this.client.ttl(key);
            case 3:
              return _context8.a(2, _context8.v);
            case 4:
              _context8.p = 4;
              _t8 = _context8.v;
              console.warn("Cache TTL failed (".concat(key, "):"), _t8.message);
              return _context8.a(2, -2);
          }
        }, _callee8, this, [[0, 4]]);
      }));
      function ttl(_x9) {
        return _ttl.apply(this, arguments);
      }
      return ttl;
    }()
    /**
     * Get multiple keys at once
     * @param {string[]} keys
     * @returns {Promise<(string|null)[]>}
     */
    )
  }, {
    key: "mget",
    value: (function () {
      var _mget = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var _this2 = this;
        var _len,
          keys,
          _key,
          _this$client,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              for (_len = _args9.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
                keys[_key] = _args9[_key];
              }
              _context9.p = 1;
              if (!this.useInMemory) {
                _context9.n = 2;
                break;
              }
              return _context9.a(2, keys.map(function (key) {
                return _this2.inMemoryStore.get(key) || null;
              }));
            case 2:
              _context9.n = 3;
              return (_this$client = this.client).mget.apply(_this$client, keys);
            case 3:
              return _context9.a(2, _context9.v);
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              console.warn("Cache MGET failed:", _t9.message);
              return _context9.a(2, keys.map(function (key) {
                return _this2.inMemoryStore.get(key) || null;
              }));
          }
        }, _callee9, this, [[1, 4]]);
      }));
      function mget() {
        return _mget.apply(this, arguments);
      }
      return mget;
    }()
    /**
     * Set multiple keys at once
     * @param {Object} keyValuePairs - { key1: value1, key2: value2 }
     * @returns {Promise<string>}
     */
    )
  }, {
    key: "mset",
    value: (function () {
      var _mset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(keyValuePairs) {
        var _this3 = this;
        var _this$client2, args, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              if (!this.useInMemory) {
                _context0.n = 1;
                break;
              }
              Object.entries(keyValuePairs).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];
                _this3.inMemoryStore.set(key, String(value));
              });
              return _context0.a(2, "OK");
            case 1:
              args = [];
              Object.entries(keyValuePairs).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  key = _ref4[0],
                  value = _ref4[1];
                args.push(key, value);
              });
              _context0.n = 2;
              return (_this$client2 = this.client).mset.apply(_this$client2, args);
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              console.warn("Cache MSET failed:", _t0.message);
              return _context0.a(2, null);
          }
        }, _callee0, this, [[0, 3]]);
      }));
      function mset(_x0) {
        return _mset.apply(this, arguments);
      }
      return mset;
    }()
    /**
     * Delete multiple keys
     * @param {string[]} keys
     * @returns {Promise<number>} Number of keys deleted
     */
    )
  }, {
    key: "mdel",
    value: (function () {
      var _mdel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        var _this4 = this;
        var _this$client3,
          _len2,
          keys,
          _key2,
          count,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              for (_len2 = _args1.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                keys[_key2] = _args1[_key2];
              }
              if (!this.useInMemory) {
                _context1.n = 1;
                break;
              }
              count = 0;
              keys.forEach(function (key) {
                if (_this4.inMemoryStore.has(key)) {
                  _this4.inMemoryStore["delete"](key);
                  _this4._clearInMemoryTimer(key);
                  count++;
                }
              });
              return _context1.a(2, count);
            case 1:
              _context1.n = 2;
              return (_this$client3 = this.client).del.apply(_this$client3, keys);
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              console.warn("Cache MDEL failed:", _t1.message);
              return _context1.a(2, 0);
          }
        }, _callee1, this, [[0, 3]]);
      }));
      function mdel() {
        return _mdel.apply(this, arguments);
      }
      return mdel;
    }()
    /**
     * Health check
     * @returns {Promise<{ status: string, store: string, keys?: number }>}
     */
    )
  }, {
    key: "health",
    value: (function () {
      var _health = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var info, keysMatch, _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              if (!this.useInMemory) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2, {
                status: "healthy",
                store: "in-memory",
                keys: this.inMemoryStore.size
              });
            case 1:
              _context10.n = 2;
              return this.client.ping();
            case 2:
              _context10.n = 3;
              return this.client.info("stats");
            case 3:
              info = _context10.v;
              keysMatch = info.match(/keys=(\d+)/);
              return _context10.a(2, {
                status: "healthy",
                store: "redis",
                keys: keysMatch ? parseInt(keysMatch[1]) : undefined
              });
            case 4:
              _context10.p = 4;
              _t10 = _context10.v;
              return _context10.a(2, {
                status: "unhealthy",
                store: this.useInMemory ? "in-memory" : "redis",
                error: _t10.message
              });
          }
        }, _callee10, this, [[0, 4]]);
      }));
      function health() {
        return _health.apply(this, arguments);
      }
      return health;
    }()
    /**
     * Delete keys matching a pattern (wildcard support)
     * @param {string} pattern - Pattern with wildcards (e.g., 'user:*', 'event:123:*')
     * @returns {Promise<number>} Number of keys deleted
     */
    )
  }, {
    key: "deletePattern",
    value: (function () {
      var _deletePattern = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(pattern) {
        var regex, count, _iterator, _step, key, cursor, deletedCount, _yield$this$client$sc, _yield$this$client$sc2, newCursor, _keys, _this$client4, _t11, _t12;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              if (!this.useInMemory) {
                _context11.n = 1;
                break;
              }
              // Convert glob pattern to regex
              regex = new RegExp("^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
              count = 0;
              _iterator = _createForOfIteratorHelper(this.inMemoryStore.keys());
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  key = _step.value;
                  if (regex.test(key)) {
                    this.inMemoryStore["delete"](key);
                    this._clearInMemoryTimer(key);
                    count++;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              return _context11.a(2, count);
            case 1:
              // Redis SCAN for pattern matching (more efficient than KEYS)
              cursor = "0";
              deletedCount = 0;
            case 2:
              _context11.n = 3;
              return this.client.scan(cursor, "MATCH", pattern, "COUNT", 100);
            case 3:
              _yield$this$client$sc = _context11.v;
              _yield$this$client$sc2 = _slicedToArray(_yield$this$client$sc, 2);
              newCursor = _yield$this$client$sc2[0];
              _keys = _yield$this$client$sc2[1];
              cursor = newCursor;
              if (!(_keys.length > 0)) {
                _context11.n = 5;
                break;
              }
              _t11 = deletedCount;
              _context11.n = 4;
              return (_this$client4 = this.client).del.apply(_this$client4, _toConsumableArray(_keys));
            case 4:
              deletedCount = _t11 += _context11.v;
            case 5:
              if (cursor !== "0") {
                _context11.n = 2;
                break;
              }
            case 6:
              return _context11.a(2, deletedCount);
            case 7:
              _context11.p = 7;
              _t12 = _context11.v;
              console.warn("Pattern deletion failed (".concat(pattern, "):"), _t12.message);
              return _context11.a(2, 0);
          }
        }, _callee11, this, [[0, 7]]);
      }));
      function deletePattern(_x1) {
        return _deletePattern.apply(this, arguments);
      }
      return deletePattern;
    }()
    /**
     * Get keys matching a pattern
     * @param {string} pattern - Pattern with wildcards
     * @returns {Promise<string[]>} Matching keys
     */
    )
  }, {
    key: "getKeys",
    value: (function () {
      var _getKeys = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(pattern) {
        var regex, _keys2, cursor, _yield$this$client$sc3, _yield$this$client$sc4, newCursor, matchedKeys, _t13;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              if (!this.useInMemory) {
                _context12.n = 1;
                break;
              }
              regex = new RegExp("^" + pattern.replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
              return _context12.a(2, Array.from(this.inMemoryStore.keys()).filter(function (key) {
                return regex.test(key);
              }));
            case 1:
              _keys2 = [];
              cursor = "0";
            case 2:
              _context12.n = 3;
              return this.client.scan(cursor, "MATCH", pattern, "COUNT", 100);
            case 3:
              _yield$this$client$sc3 = _context12.v;
              _yield$this$client$sc4 = _slicedToArray(_yield$this$client$sc3, 2);
              newCursor = _yield$this$client$sc4[0];
              matchedKeys = _yield$this$client$sc4[1];
              cursor = newCursor;
              _keys2.push.apply(_keys2, _toConsumableArray(matchedKeys));
            case 4:
              if (cursor !== "0") {
                _context12.n = 2;
                break;
              }
            case 5:
              return _context12.a(2, _keys2);
            case 6:
              _context12.p = 6;
              _t13 = _context12.v;
              console.warn("Get keys failed (".concat(pattern, "):"), _t13.message);
              return _context12.a(2, []);
          }
        }, _callee12, this, [[0, 6]]);
      }));
      function getKeys(_x10) {
        return _getKeys.apply(this, arguments);
      }
      return getKeys;
    }()
    /**
     * Flush all (use with caution)
     */
    )
  }, {
    key: "flush",
    value: (function () {
      var _flush = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
        var _t14;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              if (!this.useInMemory) {
                _context13.n = 1;
                break;
              }
              this.inMemoryStore.clear();
              // Clear all timers to prevent memory leaks
              this.inMemoryTimers.forEach(function (timer) {
                return clearTimeout(timer);
              });
              this.inMemoryTimers.clear();
              return _context13.a(2, "OK");
            case 1:
              _context13.n = 2;
              return this.client.flushall();
            case 2:
              return _context13.a(2, "OK");
            case 3:
              _context13.p = 3;
              _t14 = _context13.v;
              console.error("Cache flush failed:", _t14.message);
              return _context13.a(2, null);
          }
        }, _callee13, this, [[0, 3]]);
      }));
      function flush() {
        return _flush.apply(this, arguments);
      }
      return flush;
    }()
    /**
     * Graceful shutdown
     */
    )
  }, {
    key: "disconnect",
    value: (function () {
      var _disconnect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              if (!(this.client && !this.useInMemory)) {
                _context14.n = 2;
                break;
              }
              _context14.n = 1;
              return this.client.quit();
            case 1:
              console.log("Redis disconnected");
            case 2:
              // Clear all in-memory timers
              if (this.useInMemory) {
                this.inMemoryTimers.forEach(function (timer) {
                  return clearTimeout(timer);
                });
                this.inMemoryTimers.clear();
                this.inMemoryStore.clear();
              }
              this.isConnected = false;
            case 3:
              return _context14.a(2);
          }
        }, _callee14, this);
      }));
      function disconnect() {
        return _disconnect.apply(this, arguments);
      }
      return disconnect;
    }() // ================================
    // PRIVATE HELPERS
    // ================================
    /**
     * Set TTL for in-memory key (prevents memory leaks)
     * @param {string} key
     * @param {number} ttl
     * @param {string} mode - 'EX' (seconds) or 'PX' (milliseconds)
     * @private
     */
    )
  }, {
    key: "_setInMemoryTTL",
    value: function _setInMemoryTTL(key, ttl) {
      var _this5 = this;
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "EX";
      // Clear existing timer to prevent leaks
      this._clearInMemoryTimer(key);
      var ms = mode === "PX" ? ttl : ttl * 1000;
      var timer = setTimeout(function () {
        _this5.inMemoryStore["delete"](key);
        _this5.inMemoryTimers["delete"](key);
      }, ms);
      this.inMemoryTimers.set(key, timer);
    }

    /**
     * Clear TTL timer for key
     * @param {string} key
     * @private
     */
  }, {
    key: "_clearInMemoryTimer",
    value: function _clearInMemoryTimer(key) {
      var timer = this.inMemoryTimers.get(key);
      if (timer) {
        clearTimeout(timer);
        this.inMemoryTimers["delete"](key);
      }
    }
  }]);
}(); // Export singleton
var cache = exports.cache = new CacheManager();
var _default = exports["default"] = cache;