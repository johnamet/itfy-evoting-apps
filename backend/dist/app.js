"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireWildcard(require("dotenv"));
var _appDatabase = _interopRequireDefault(require("./database/app.database.js"));
var _agendaService = _interopRequireDefault(require("./services/agenda.service.js"));
var _healthService = require("./services/health.service.js");
var _cacheUtils = _interopRequireDefault(require("./utils/cache/cache.utils.js"));
var _appRoutes = _interopRequireDefault(require("./routes/app.routes.js"));
var _swaggerConfig = require("./config/swagger.config.js");
var _baseController = _interopRequireDefault(require("./modules/shared/base.controller.js"));
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /* eslint-disable no-undef */ /**
 * ITFY E-Voting Backend Application
 * Main entry point - Sets up Express server with MongoDB and Agenda
 */
// Load environment variables
_dotenv["default"].config();
(0, _dotenv.configDotenv)();
_baseController["default"].setValidation(_joi["default"]);
var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================

// Security headers
app.use((0, _helmet["default"])());

// CORS configuration
app.use((0, _cors["default"])({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

// Body parsing
app.use(_express["default"].json({
  limit: "10mb"
}));
app.use(_express["default"].urlencoded({
  extended: true,
  limit: "10mb"
}));

// Static file serving for uploads
app.use("/uploads", _express["default"]["static"]("uploads"));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use((0, _morgan["default"])("dev"));
} else {
  app.use((0, _morgan["default"])("combined"));
}

// ========================================
// API DOCUMENTATION
// ========================================
(0, _swaggerConfig.setupAPIDocs)(app);

// ========================================
// ROUTES
// ========================================

// Quick health check (for load balancers, etc.)
app.get("/api/v1/health", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var health;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _healthService.healthService.getQuickHealth();
        case 1:
          health = _context.v;
          res.json(health);
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// Comprehensive system health check
app.get("/api/v1/health/detailed", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var health, statusCode, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return _healthService.healthService.getSystemHealth();
        case 1:
          health = _context2.v;
          statusCode = health.status === "healthy" ? 200 : health.status === "degraded" ? 200 : 503;
          res.status(statusCode).json(health);
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t = _context2.v;
          res.status(500).json({
            status: "error",
            error: _t.message,
            timestamp: new Date().toISOString()
          });
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// API routes
app.use("/api/v1", function (req, res, next) {
  res.setHeader("X-Powered-By", "ITFY E-Voting");
  next();
});
app.use("/api/v1", _appRoutes["default"]);
app.use("/api/v1/", function (req, res) {
  res.json({
    message: "Welcome to the ITFY E-Voting API v1\nVisit /api/v1/health to check server status.",
    api_routes: {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      events: "/api/v1/events",
      categories: "/api/v1/categories",
      candidates: "/api/v1/candidates",
      votes: "/api/v1/votes",
      bundles: "/api/v1/bundles",
      payments: "/api/v1/payments",
      notifications: "/api/v1/notifications"
    },
    api_routes_docs: {
      swagger_ui: "/api-docs",
      redoc: "/api-docs/redoc"
    }
  });
});

// 404 handler
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error("Error:", err);
  var statusCode = err.statusCode || 500;
  var message = err.message || "Internal server error";
  res.status(statusCode).json(_objectSpread({
    success: false,
    message: message
  }, process.env.NODE_ENV === "development" && {
    stack: err.stack
  }));
});

// ========================================
// SERVER INITIALIZATION
// ========================================
function startServer() {
  return _startServer.apply(this, arguments);
} // ========================================
// GRACEFUL SHUTDOWN
// ========================================
function _startServer() {
  _startServer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          // 1. Connect to MongoDB
          console.log("🔌 Connecting to MongoDB...");
          _context3.n = 1;
          return _appDatabase["default"].connect();
        case 1:
          console.log("✅ MongoDB connected successfully");

          // 2. Connect to Redis cache
          console.log("🔌 Connecting to Redis cache...");
          _context3.n = 2;
          return _cacheUtils["default"].connect();
        case 2:
          console.log("✅ Cache connected successfully");

          // 3. Initialize Agenda job queue
          console.log("🔌 Initializing Agenda.js...");
          _context3.n = 3;
          return _agendaService["default"].initialize();
        case 3:
          console.log("✅ Agenda.js initialized successfully");

          // 4. Setup recurring tasks
          console.log("⚙️ Setting up recurring tasks...");
          _context3.n = 4;
          return _agendaService["default"].setupRecurringTasks();
        case 4:
          console.log("✅ Recurring tasks configured");

          // 5. Start Express server
          app.listen(PORT, function () {
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("\uD83D\uDE80 ITFY E-Voting Server is running");
            console.log("\uD83D\uDCCD Port: ".concat(PORT));
            console.log("\uD83C\uDF0D Environment: ".concat(process.env.NODE_ENV || "development"));
            console.log("\u23F0 Started at: ".concat(new Date().toISOString()));
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          });
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t2 = _context3.v;
          console.error("❌ Failed to start server:", _t2);
          process.exit(1);
        case 6:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 5]]);
  }));
  return _startServer.apply(this, arguments);
}
function gracefulShutdown(_x5) {
  return _gracefulShutdown.apply(this, arguments);
} // Handle shutdown signals
function _gracefulShutdown() {
  _gracefulShutdown = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(signal) {
    var mongoose, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          console.log("\n\u26A0\uFE0F ".concat(signal, " received. Starting graceful shutdown..."));
          _context4.p = 1;
          // Stop accepting new requests
          console.log("🛑 Stopping Express server...");
          // server.close() if you have a server reference

          // Stop Agenda job processing
          console.log("🛑 Stopping Agenda.js...");
          _context4.n = 2;
          return _agendaService["default"].stop();
        case 2:
          // Close database connection
          console.log("🛑 Closing MongoDB connection...");
          _context4.n = 3;
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("mongoose"));
          });
        case 3:
          mongoose = _context4.v;
          _context4.n = 4;
          return mongoose["default"].connection.close();
        case 4:
          // Close cache connection
          console.log("🛑 Closing cache connection...");
          _context4.n = 5;
          return _cacheUtils["default"].disconnect();
        case 5:
          console.log("✅ Graceful shutdown completed");
          process.exit(0);
          _context4.n = 7;
          break;
        case 6:
          _context4.p = 6;
          _t3 = _context4.v;
          console.error("❌ Error during shutdown:", _t3);
          process.exit(1);
        case 7:
          return _context4.a(2);
      }
    }, _callee4, null, [[1, 6]]);
  }));
  return _gracefulShutdown.apply(this, arguments);
}
process.on("SIGTERM", function () {
  return gracefulShutdown("SIGTERM");
});
process.on("SIGINT", function () {
  return gracefulShutdown("SIGINT");
});

// Handle uncaught exceptions
process.on("uncaughtException", function (error) {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

// Handle unhandled promise rejections
process.on("unhandledRejection", function (reason, promise) {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

// Start the server
startServer();
var _default = exports["default"] = app;