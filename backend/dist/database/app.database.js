"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.db = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cacheUtils = _interopRequireDefault(require("../utils/cache/cache.utils.js"));
var _userModel = _interopRequireDefault(require("../modules/user/user.model.js"));
var _eventModel = _interopRequireDefault(require("../modules/event/event.model.js"));
var _candidateModel = _interopRequireDefault(require("../modules/candidate/candidate.model.js"));
var _categoryModel = _interopRequireDefault(require("../modules/category/category.model.js"));
var _voteModel = _interopRequireDefault(require("../modules/vote/vote/vote.model.js"));
var _bundleModel = _interopRequireDefault(require("../modules/vote/bundle/bundle.model.js"));
var _couponModel = _interopRequireDefault(require("../modules/vote/coupon/coupon.model.js"));
var _paymentModel = _interopRequireDefault(require("../modules/payment/payment.model.js"));
var _formModel = _interopRequireDefault(require("../modules/form/form.model.js"));
var _submissionModel = _interopRequireDefault(require("../modules/form/submission.model.js"));
var _slideModel = _interopRequireDefault(require("../modules/slide/slide.model.js"));
var _notificationModel = _interopRequireDefault(require("../modules/notification/notification.model.js"));
var _activityModel = _interopRequireDefault(require("../modules/activity/activity.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-undef */ /**
 * Database Configuration & Connection Manager
 * Centralizes MongoDB connection, model registration, and health checks
 * Supports: connection pooling, retries, graceful shutdown, health endpoint, cache integration
 */ // Import all models
var DatabaseManager = /*#__PURE__*/function () {
  function DatabaseManager() {
    _classCallCheck(this, DatabaseManager);
    this.isConnected = false;
    this.connectionRetries = 0;
    this.maxRetries = parseInt(process.env.DB_MAX_RETRIES, 10) || 5;
    this.retryDelayMs = parseInt(process.env.DB_RETRY_DELAY_MS, 10) || 5000;
    this.models = new Map();
  }

  /**
   * Initialize database connection with retry logic
   */
  return _createClass(DatabaseManager, [{
    key: "connect",
    value: (function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var dbUri, mongooseOptions, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!this.isConnected) {
                _context.n = 1;
                break;
              }
              console.log("MongoDB already connected.");
              return _context.a(2);
            case 1:
              dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/itfy-evoting";
              mongooseOptions = {
                maxPoolSize: 10,
                // Maintain up to 10 socket connections
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4,
                // Use IPv4, skip trying IPv6
                autoIndex: process.env.NODE_ENV !== "production",
                // Disable in prod
                connectTimeoutMS: 10000
              };
              _context.p = 2;
              console.log("Connecting to MongoDB... (".concat(dbUri.replace(/mongodb:\/\/[^@]+@/, "mongodb://***@"), ")"));
              _context.n = 3;
              return _mongoose["default"].connect(dbUri, mongooseOptions);
            case 3:
              this.isConnected = true;
              this.connectionRetries = 0;
              this._registerModels();
              this._setupEventListeners();

              // Connect cache after database
              _context.n = 4;
              return this._connectCache();
            case 4:
              console.log("MongoDB connected successfully");
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error("MongoDB connection failed:", _t.message);
              if (this.connectionRetries < this.maxRetries) {
                this.connectionRetries++;
                console.log("Retrying connection in ".concat(this.retryDelayMs / 1000, "s... (Attempt ").concat(this.connectionRetries, "/").concat(this.maxRetries, ")"));
                setTimeout(function () {
                  return _this.connect();
                }, this.retryDelayMs);
              } else {
                console.error("Max retries reached. Exiting...");
                process.exit(1);
              }
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[2, 5]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     * Register all models with BaseModel behavior
     * @private
     */
    )
  }, {
    key: "_registerModels",
    value: function _registerModels() {
      var _this2 = this;
      var modelRegistry = [{
        name: "User",
        model: _userModel["default"]
      }, {
        name: "Event",
        model: _eventModel["default"]
      }, {
        name: "Candidate",
        model: _candidateModel["default"]
      }, {
        name: "Category",
        model: _categoryModel["default"]
      }, {
        name: "Vote",
        model: _voteModel["default"]
      }, {
        name: "Bundle",
        model: _bundleModel["default"]
      }, {
        name: "Coupon",
        model: _couponModel["default"]
      }, {
        name: "Payment",
        model: _paymentModel["default"]
      }, {
        name: "Form",
        model: _formModel["default"]
      }, {
        name: "FormSubmission",
        model: _submissionModel["default"]
      }, {
        name: "Slide",
        model: _slideModel["default"]
      }, {
        name: "Notification",
        model: _notificationModel["default"]
      }, {
        name: "Activity",
        model: _activityModel["default"]
      }];
      modelRegistry.forEach(function (_ref) {
        var name = _ref.name,
          model = _ref.model;
        if (model && model.modelName) {
          _this2.models.set(name, model);
          console.log("Model registered: ".concat(name));
        } else {
          console.warn("Warning: Model ".concat(name, " is not valid or not exported correctly"));
        }
      });

      // Apply BaseModel global query helpers
      this._applyGlobalQueryHelpers();
    }

    /**
     * Apply soft-delete bypass and default filters globally
     * @private
     */
  }, {
    key: "_applyGlobalQueryHelpers",
    value: function _applyGlobalQueryHelpers() {
      // Soft delete helper
      _mongoose["default"].Query.prototype.softDelete = function () {
        return this.findOneAndUpdate({}, {
          deleted_at: new Date()
        }, {
          "new": true
        });
      };

      // Auto-exclude soft-deleted unless includeDeleted flag is set
      var originalExec = _mongoose["default"].Query.prototype.exec;
      _mongoose["default"].Query.prototype.exec = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this$op;
        var _this$model,
          schema,
          _len,
          args,
          _key,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!this._includeDeleted && !((_this$op = this.op) !== null && _this$op !== void 0 && _this$op.includes("aggregate"))) {
                // Only apply filter if deleted_at field exists in schema
                schema = (_this$model = this.model) === null || _this$model === void 0 ? void 0 : _this$model.schema;
                if (schema && schema.path("deleted_at")) {
                  this.where({
                    deleted_at: null
                  });
                }
              }
              for (_len = _args2.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args2[_key];
              }
              return _context2.a(2, originalExec.apply(this, args));
          }
        }, _callee2, this);
      }));
    }

    /**
     * Connect to cache system
     * @private
     */
  }, {
    key: "_connectCache",
    value: (function () {
      var _connectCache2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return _cacheUtils["default"].connect();
            case 1:
              console.log("Cache system initialized");
              _context3.n = 3;
              break;
            case 2:
              _context3.p = 2;
              _t2 = _context3.v;
              console.warn("Cache connection failed (non-critical):", _t2.message);
            case 3:
              return _context3.a(2);
          }
        }, _callee3, null, [[0, 2]]);
      }));
      function _connectCache() {
        return _connectCache2.apply(this, arguments);
      }
      return _connectCache;
    }()
    /**
     * Setup Mongoose event listeners
     * @private
     */
    )
  }, {
    key: "_setupEventListeners",
    value: function _setupEventListeners() {
      var _this3 = this;
      var db = _mongoose["default"].connection;
      db.on("connected", function () {
        console.log("Mongoose connected to MongoDB");
        _this3.isConnected = true;
      });
      db.on("error", function (err) {
        console.error("Mongoose connection error:", err);
        _this3.isConnected = false;
      });
      db.on("disconnected", function () {
        console.warn("Mongoose disconnected from MongoDB");
        _this3.isConnected = false;
      });
      db.on("reconnected", function () {
        console.log("Mongoose reconnected");
        _this3.isConnected = true;
      });

      // Graceful shutdown
      process.on("SIGINT", function () {
        return _this3.gracefulShutdown("SIGINT");
      });
      process.on("SIGTERM", function () {
        return _this3.gracefulShutdown("SIGTERM");
      });
    }

    /**
     * Graceful shutdown with connection close
     * @param {string} signal
     */
  }, {
    key: "gracefulShutdown",
    value: (function () {
      var _gracefulShutdown = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(signal) {
        var _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              console.log("Received ".concat(signal, ". Closing MongoDB connection..."));
              _context4.p = 1;
              _context4.n = 2;
              return _cacheUtils["default"].disconnect();
            case 2:
              console.log("Cache disconnected");

              // Close database connection
              _context4.n = 3;
              return _mongoose["default"].connection.close();
            case 3:
              console.log("MongoDB connection closed.");
              process.exit(0);
              _context4.n = 5;
              break;
            case 4:
              _context4.p = 4;
              _t3 = _context4.v;
              console.error("Error during shutdown:", _t3);
              process.exit(1);
            case 5:
              return _context4.a(2);
          }
        }, _callee4, null, [[1, 4]]);
      }));
      function gracefulShutdown(_x) {
        return _gracefulShutdown.apply(this, arguments);
      }
      return gracefulShutdown;
    }()
    /**
     * Health check endpoint
     * @returns {Promise<{ status: string, db: string, cache: string, uptime: number }>}
     */
    )
  }, {
    key: "healthCheck",
    value: (function () {
      var _healthCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var uptime, cacheHealth, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              uptime = process.uptime();
              if (this.isConnected) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, {
                status: "unhealthy",
                db: "disconnected",
                cache: "unknown",
                uptime: uptime,
                error: "Database not connected"
              });
            case 1:
              _context5.p = 1;
              _context5.n = 2;
              return _mongoose["default"].connection.db.admin().ping();
            case 2:
              _context5.n = 3;
              return _cacheUtils["default"].health();
            case 3:
              cacheHealth = _context5.v;
              return _context5.a(2, {
                status: "healthy",
                db: "connected",
                cache: cacheHealth.status,
                uptime: uptime,
                models: Array.from(this.models.keys()),
                cacheStore: cacheHealth.store
              });
            case 4:
              _context5.p = 4;
              _t4 = _context5.v;
              return _context5.a(2, {
                status: "unhealthy",
                db: "error",
                cache: "unknown",
                uptime: uptime,
                error: _t4.message
              });
          }
        }, _callee5, this, [[1, 4]]);
      }));
      function healthCheck() {
        return _healthCheck.apply(this, arguments);
      }
      return healthCheck;
    }()
    /**
     * Get registered model by name
     * @param {string} name
     * @returns {mongoose.Model|null}
     */
    )
  }, {
    key: "getModel",
    value: function getModel(name) {
      return this.models.get(name) || null;
    }

    /**
     * Get all registered model names
     * @returns {string[]}
     */
  }, {
    key: "getModelNames",
    value: function getModelNames() {
      return Array.from(this.models.keys());
    }

    /**
     * Start a transaction session
     * @returns {Promise<mongoose.ClientSession>}
     */
  }, {
    key: "startSession",
    value: (function () {
      var _startSession = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (this.isConnected) {
                _context6.n = 1;
                break;
              }
              throw new Error("Database not connected. Cannot start session.");
            case 1:
              _context6.n = 2;
              return _mongoose["default"].startSession();
            case 2:
              return _context6.a(2, _context6.v);
          }
        }, _callee6, this);
      }));
      function startSession() {
        return _startSession.apply(this, arguments);
      }
      return startSession;
    }()
    /**
     * Execute a callback within a transaction
     * @param {Function} callback - Async function with session parameter
     * @returns {Promise<any>} - Result of callback
     */
    )
  }, {
    key: "transaction",
    value: (function () {
      var _transaction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(callback) {
        var session, result, _t5;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.n = 1;
              return this.startSession();
            case 1:
              session = _context7.v;
              session.startTransaction();
              _context7.p = 2;
              _context7.n = 3;
              return callback(session);
            case 3:
              result = _context7.v;
              _context7.n = 4;
              return session.commitTransaction();
            case 4:
              return _context7.a(2, result);
            case 5:
              _context7.p = 5;
              _t5 = _context7.v;
              _context7.n = 6;
              return session.abortTransaction();
            case 6:
              throw _t5;
            case 7:
              _context7.p = 7;
              session.endSession();
              return _context7.f(7);
            case 8:
              return _context7.a(2);
          }
        }, _callee7, this, [[2, 5, 7, 8]]);
      }));
      function transaction(_x2) {
        return _transaction.apply(this, arguments);
      }
      return transaction;
    }()
    /**
     * Reset connection (for testing)
     */
    )
  }, {
    key: "reset",
    value: (function () {
      var _reset = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(process.env.NODE_ENV !== "test")) {
                _context8.n = 1;
                break;
              }
              throw new Error("Database reset only allowed in test environment");
            case 1:
              _context8.n = 2;
              return _cacheUtils["default"].flush();
            case 2:
              _context8.n = 3;
              return _mongoose["default"].connection.dropDatabase();
            case 3:
              _context8.n = 4;
              return _mongoose["default"].connection.close();
            case 4:
              this.isConnected = false;
              this.models.clear();
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }()
    /**
     * Seed database with initial data (for development)
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "seed",
    value: (function () {
      var _seed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!(process.env.NODE_ENV === "production")) {
                _context9.n = 1;
                break;
              }
              throw new Error("Seeding not allowed in production");
            case 1:
              console.log("Database seeding should be done via separate seed scripts");
              console.log("Run: npm run seed");
            case 2:
              return _context9.a(2);
          }
        }, _callee9);
      }));
      function seed() {
        return _seed.apply(this, arguments);
      }
      return seed;
    }()
    /**
     * Get database statistics
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "getStats",
    value: (function () {
      var _getStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
        var _db, stats, collections, _iterator, _step, _step$value, name, model, count, _t6, _t7, _t8;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              if (this.isConnected) {
                _context0.n = 1;
                break;
              }
              return _context0.a(2, {
                error: "Database not connected"
              });
            case 1:
              _context0.p = 1;
              _db = _mongoose["default"].connection.db;
              _context0.n = 2;
              return _db.stats();
            case 2:
              stats = _context0.v;
              // Get collection counts
              collections = {};
              _iterator = _createForOfIteratorHelper(this.models);
              _context0.p = 3;
              _iterator.s();
            case 4:
              if ((_step = _iterator.n()).done) {
                _context0.n = 9;
                break;
              }
              _step$value = _slicedToArray(_step.value, 2), name = _step$value[0], model = _step$value[1];
              _context0.p = 5;
              _context0.n = 6;
              return model.countDocuments();
            case 6:
              count = _context0.v;
              collections[name] = count;
              _context0.n = 8;
              break;
            case 7:
              _context0.p = 7;
              _t6 = _context0.v;
              collections[name] = "error";
            case 8:
              _context0.n = 4;
              break;
            case 9:
              _context0.n = 11;
              break;
            case 10:
              _context0.p = 10;
              _t7 = _context0.v;
              _iterator.e(_t7);
            case 11:
              _context0.p = 11;
              _iterator.f();
              return _context0.f(11);
            case 12:
              return _context0.a(2, {
                database: stats.db,
                collections: stats.collections,
                dataSize: stats.dataSize,
                indexSize: stats.indexSize,
                storageSize: stats.storageSize,
                documentCounts: collections
              });
            case 13:
              _context0.p = 13;
              _t8 = _context0.v;
              return _context0.a(2, {
                error: _t8.message
              });
          }
        }, _callee0, this, [[5, 7], [3, 10, 11, 12], [1, 13]]);
      }));
      function getStats() {
        return _getStats.apply(this, arguments);
      }
      return getStats;
    }())
  }]);
}(); // Export singleton instance
var db = exports.db = new DatabaseManager();
var _default = exports["default"] = db;