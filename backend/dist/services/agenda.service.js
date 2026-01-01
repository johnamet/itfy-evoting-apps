"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.agendaManager = void 0;
var _agenda = _interopRequireDefault(require("agenda"));
var _emailService = _interopRequireDefault(require("./email.service.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t39 in e) "default" !== _t39 && {}.hasOwnProperty.call(e, _t39) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t39)) && (i.get || i.set) ? o(f, _t39, i) : f[_t39] = e[_t39]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Agenda.js Service for E-Voting Platform
 * Handles asynchronous job processing for:
 * - Vote processing and verification
 * - Payment verification (Paystack/Flutterwave webhooks)
 * - Email notifications (vote confirmation, results, reminders)
 * - Scheduled tasks (event closing, results publishing, analytics)
 * - Fraud detection and vote counting
 */
var AgendaManager = /*#__PURE__*/function () {
  function AgendaManager() {
    _classCallCheck(this, AgendaManager);
    this.agenda = null;
    this.isReady = false;
    this.startTime = null;
  }

  /**
   * Initialize Agenda with MongoDB connection
   */
  return _createClass(AgendaManager, [{
    key: "initialize",
    value: (function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var mongoUri, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/itfy-evoting";
              this.agenda = new _agenda["default"]({
                db: {
                  address: mongoUri,
                  collection: "agenda_jobs",
                  options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                  }
                },
                processEvery: process.env.AGENDA_PROCESS_EVERY || "10 seconds",
                maxConcurrency: parseInt(process.env.AGENDA_MAX_CONCURRENCY, 10) || 20,
                defaultConcurrency: 5,
                defaultLockLifetime: 10000,
                // 10 seconds
                lockLimit: 0,
                ensureIndex: true
              });

              // Event listeners
              this.agenda.on("ready", function () {
                console.log("✅ Agenda.js is ready and connected to MongoDB");
                _this.isReady = true;
                _this.startTime = new Date();
              });
              this.agenda.on("error", function (error) {
                console.error("❌ Agenda.js connection error:", error);
                _this.isReady = false;
              });
              this.agenda.on("start", function (job) {
                console.log("\uD83D\uDE80 Job started: ".concat(job.attrs.name, " [").concat(job.attrs._id, "]"));
              });
              this.agenda.on("complete", function (job) {
                console.log("\u2705 Job completed: ".concat(job.attrs.name, " [").concat(job.attrs._id, "]"));
              });
              this.agenda.on("fail", function (error, job) {
                console.error("\u274C Job failed: ".concat(job.attrs.name, " [").concat(job.attrs._id, "]"), error);
              });

              // Define all jobs
              this._defineJobs();

              // Start processing
              _context.n = 1;
              return this.agenda.start();
            case 1:
              console.log("✅ Agenda.js started processing jobs");
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("❌ Failed to initialize Agenda:", _t);
              throw _t;
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Define all job types and their handlers
     * @private
     */
    )
  }, {
    key: "_defineJobs",
    value: function _defineJobs() {
      var _this2 = this;
      // ========================================
      // 1. VOTE PROCESSING JOBS
      // ========================================

      /**
       * Verify payment for vote purchase
       */
      this.agenda.define("verify-vote-payment", {
        priority: "high",
        concurrency: 10
      }, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(job) {
          var _job$attrs$data, voteId, paymentReference, _yield$import, VoteService, paymentVerified, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                _job$attrs$data = job.attrs.data, voteId = _job$attrs$data.voteId, paymentReference = _job$attrs$data.paymentReference;
                _context2.p = 1;
                console.log("🔍 Verifying vote payment:", {
                  voteId: voteId,
                  paymentReference: paymentReference
                });
                _context2.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/vote/vote.service.js"));
                });
              case 2:
                _yield$import = _context2.v;
                VoteService = _yield$import["default"];
                _context2.n = 3;
                return VoteService.verifyPayment(voteId, paymentReference);
              case 3:
                paymentVerified = _context2.v;
                if (!paymentVerified) {
                  _context2.n = 5;
                  break;
                }
                _context2.n = 4;
                return _this2.now("send-vote-confirmation-email", {
                  voteId: voteId
                });
              case 4:
                _context2.n = 6;
                break;
              case 5:
                console.warn("⚠️ Payment verification failed for vote:", voteId);
              case 6:
                _context2.n = 8;
                break;
              case 7:
                _context2.p = 7;
                _t2 = _context2.v;
                console.error("❌ Failed to verify vote payment:", _t2);
                throw _t2;
              case 8:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 7]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      /**
       * Process vote counting and aggregation
       */
      this.agenda.define("aggregate-vote-counts", {
        priority: "normal",
        concurrency: 5
      }, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(job) {
          var eventId, _yield$import2, VoteService, _t3;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                eventId = job.attrs.data.eventId;
                _context3.p = 1;
                console.log("📊 Aggregating vote counts for event:", eventId);
                _context3.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/vote/vote/vote.service.js"));
                });
              case 2:
                _yield$import2 = _context3.v;
                VoteService = _yield$import2["default"];
                _context3.n = 3;
                return VoteService.aggregateVoteCounts(eventId);
              case 3:
                console.log("✅ Vote counts aggregated successfully");
                _context3.n = 5;
                break;
              case 4:
                _context3.p = 4;
                _t3 = _context3.v;
                console.error("❌ Failed to aggregate vote counts:", _t3);
                throw _t3;
              case 5:
                return _context3.a(2);
            }
          }, _callee3, null, [[1, 4]]);
        }));
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());

      /**
       * Detect suspicious voting patterns (fraud detection)
       */
      this.agenda.define("detect-fraud-patterns", {
        priority: "normal",
        concurrency: 3
      }, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(job) {
          var eventId, _yield$import3, ActivityService, _t4;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.p = _context4.n) {
              case 0:
                eventId = job.attrs.data.eventId;
                _context4.p = 1;
                console.log("🔍 Detecting fraud patterns for event:", eventId);
                _context4.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/activity/activity.service.js"));
                });
              case 2:
                _yield$import3 = _context4.v;
                ActivityService = _yield$import3["default"];
                _context4.n = 3;
                return ActivityService.detectSuspiciousPatterns();
              case 3:
                console.log("✅ Fraud detection completed");
                _context4.n = 5;
                break;
              case 4:
                _context4.p = 4;
                _t4 = _context4.v;
                console.error("❌ Failed to detect fraud patterns:", _t4);
              case 5:
                return _context4.a(2);
            }
          }, _callee4, null, [[1, 4]]);
        }));
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());

      // ========================================
      // 2. EMAIL NOTIFICATION JOBS
      // ========================================

      /**
       * Send vote confirmation email
       */
      this.agenda.define("send-vote-confirmation-email", {
        priority: "low",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(job) {
          var voteId, _vote$voter, _vote$voter2, _vote$event, _vote$candidate, _vote$category, _yield$import4, VoteRepository, vote, _t5;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                voteId = job.attrs.data.voteId;
                _context5.p = 1;
                console.log("📧 Sending vote confirmation email for vote:", voteId);
                _context5.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/vote/vote.repository.js"));
                });
              case 2:
                _yield$import4 = _context5.v;
                VoteRepository = _yield$import4["default"];
                _context5.n = 3;
                return VoteRepository.findById(voteId, {
                  populate: ["voter", "candidate", "event", "category"]
                });
              case 3:
                vote = _context5.v;
                if (vote) {
                  _context5.n = 4;
                  break;
                }
                console.warn("⚠️ Vote not found:", voteId);
                return _context5.a(2);
              case 4:
                _context5.n = 5;
                return _emailService["default"].sendVoteConfirmationEmail({
                  to: (_vote$voter = vote.voter) === null || _vote$voter === void 0 ? void 0 : _vote$voter.email,
                  name: (_vote$voter2 = vote.voter) === null || _vote$voter2 === void 0 ? void 0 : _vote$voter2.name,
                  eventName: (_vote$event = vote.event) === null || _vote$event === void 0 ? void 0 : _vote$event.title,
                  candidateName: (_vote$candidate = vote.candidate) === null || _vote$candidate === void 0 ? void 0 : _vote$candidate.name,
                  categoryName: (_vote$category = vote.category) === null || _vote$category === void 0 ? void 0 : _vote$category.name,
                  voteCount: vote.vote_count || 1,
                  voteCode: vote.vote_code,
                  amount: vote.amount,
                  currency: vote.currency,
                  paymentDate: vote.payment_date
                });
              case 5:
                console.log("✅ Vote confirmation email sent");
                _context5.n = 7;
                break;
              case 6:
                _context5.p = 6;
                _t5 = _context5.v;
                console.error("❌ Failed to send vote confirmation email:", _t5);
              case 7:
                return _context5.a(2);
            }
          }, _callee5, null, [[1, 6]]);
        }));
        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());

      /**
       * Send email verification
       */
      this.agenda.define("send-email-verification", {
        priority: "high",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(job) {
          var _job$attrs$data2, email, name, verificationUrl, _t6;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                _job$attrs$data2 = job.attrs.data, email = _job$attrs$data2.email, name = _job$attrs$data2.name, verificationUrl = _job$attrs$data2.verificationUrl;
                _context6.p = 1;
                console.log("📧 Sending email verification to:", email);
                _context6.n = 2;
                return _emailService["default"].sendEmailVerificationEmail(email, name, verificationUrl);
              case 2:
                console.log("✅ Verification email sent");
                _context6.n = 4;
                break;
              case 3:
                _context6.p = 3;
                _t6 = _context6.v;
                console.error("❌ Failed to send verification email:", _t6);
              case 4:
                return _context6.a(2);
            }
          }, _callee6, null, [[1, 3]]);
        }));
        return function (_x5) {
          return _ref5.apply(this, arguments);
        };
      }());

      /**
       * Send password reset email
       */
      this.agenda.define("send-password-reset-email", {
        priority: "high",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(job) {
          var _job$attrs$data3, email, name, resetUrl, _t7;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.p = _context7.n) {
              case 0:
                _job$attrs$data3 = job.attrs.data, email = _job$attrs$data3.email, name = _job$attrs$data3.name, resetUrl = _job$attrs$data3.resetUrl;
                _context7.p = 1;
                console.log("📧 Sending password reset email to:", email);
                _context7.n = 2;
                return _emailService["default"].sendPasswordResetEmail(email, name, resetUrl);
              case 2:
                console.log("✅ Password reset email sent");
                _context7.n = 4;
                break;
              case 3:
                _context7.p = 3;
                _t7 = _context7.v;
                console.error("❌ Failed to send password reset email:", _t7);
              case 4:
                return _context7.a(2);
            }
          }, _callee7, null, [[1, 3]]);
        }));
        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }());

      /**
       * Send password changed confirmation
       */
      this.agenda.define("send-password-changed-email", {
        priority: "normal",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(job) {
          var _job$attrs$data4, email, name, _t8;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.p = _context8.n) {
              case 0:
                _job$attrs$data4 = job.attrs.data, email = _job$attrs$data4.email, name = _job$attrs$data4.name;
                _context8.p = 1;
                console.log("📧 Sending password changed confirmation to:", email);
                _context8.n = 2;
                return _emailService["default"].sendPasswordChangedEmail(email, name);
              case 2:
                console.log("✅ Password changed email sent");
                _context8.n = 4;
                break;
              case 3:
                _context8.p = 3;
                _t8 = _context8.v;
                console.error("❌ Failed to send password changed email:", _t8);
              case 4:
                return _context8.a(2);
            }
          }, _callee8, null, [[1, 3]]);
        }));
        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      }());

      /**
       * Send account locked notification
       */
      this.agenda.define("send-account-locked-email", {
        priority: "high",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(job) {
          var _job$attrs$data5, email, name, duration, _t9;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.p = _context9.n) {
              case 0:
                _job$attrs$data5 = job.attrs.data, email = _job$attrs$data5.email, name = _job$attrs$data5.name, duration = _job$attrs$data5.duration;
                _context9.p = 1;
                console.log("📧 Sending account locked email to:", email);
                _context9.n = 2;
                return _emailService["default"].sendAccountLockedEmail(email, name, duration);
              case 2:
                console.log("✅ Account locked email sent");
                _context9.n = 4;
                break;
              case 3:
                _context9.p = 3;
                _t9 = _context9.v;
                console.error("❌ Failed to send account locked email:", _t9);
              case 4:
                return _context9.a(2);
            }
          }, _callee9, null, [[1, 3]]);
        }));
        return function (_x8) {
          return _ref8.apply(this, arguments);
        };
      }());

      /**
       * Generic send email job
       * Handles any email with template and context
       */
      this.agenda.define("send email", {
        priority: "normal",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(job) {
          var _job$attrs$data6, to, subject, template, context, _t0;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.p = _context0.n) {
              case 0:
                _job$attrs$data6 = job.attrs.data, to = _job$attrs$data6.to, subject = _job$attrs$data6.subject, template = _job$attrs$data6.template, context = _job$attrs$data6.context;
                _context0.p = 1;
                console.log("\uD83D\uDCE7 Sending ".concat(template, " email to:"), to);
                _context0.n = 2;
                return _emailService["default"].sendTemplateEmail({
                  to: to,
                  subject: subject,
                  template: template,
                  context: context
                });
              case 2:
                console.log("\u2705 ".concat(template, " email sent to ").concat(to));
                _context0.n = 4;
                break;
              case 3:
                _context0.p = 3;
                _t0 = _context0.v;
                console.error("\u274C Failed to send ".concat(template, " email:"), _t0);
                throw _t0;
              case 4:
                return _context0.a(2);
            }
          }, _callee0, null, [[1, 3]]);
        }));
        return function (_x9) {
          return _ref9.apply(this, arguments);
        };
      }());

      /**
       * Send payment success notification email
       */
      this.agenda.define("send-payment-success-email", {
        priority: "high",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(job) {
          var _job$attrs$data7, voterEmail, voterName, eventName, bundleName, voteCode, votesCount, amountPaid, currency, transactionReference, paidAt, _t1;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.p = _context1.n) {
              case 0:
                _job$attrs$data7 = job.attrs.data, voterEmail = _job$attrs$data7.voterEmail, voterName = _job$attrs$data7.voterName, eventName = _job$attrs$data7.eventName, bundleName = _job$attrs$data7.bundleName, voteCode = _job$attrs$data7.voteCode, votesCount = _job$attrs$data7.votesCount, amountPaid = _job$attrs$data7.amountPaid, currency = _job$attrs$data7.currency, transactionReference = _job$attrs$data7.transactionReference, paidAt = _job$attrs$data7.paidAt;
                _context1.p = 1;
                console.log("📧 Sending payment success email to:", voterEmail);
                _context1.n = 2;
                return _emailService["default"].sendPaymentSuccessEmail({
                  to: voterEmail,
                  name: voterName,
                  eventName: eventName,
                  bundleName: bundleName,
                  voteCode: voteCode,
                  votesCount: votesCount,
                  amount: amountPaid,
                  currency: currency,
                  transactionReference: transactionReference,
                  paidAt: paidAt
                });
              case 2:
                console.log("✅ Payment success email sent");
                _context1.n = 4;
                break;
              case 3:
                _context1.p = 3;
                _t1 = _context1.v;
                console.error("❌ Failed to send payment success email:", _t1);
              case 4:
                return _context1.a(2);
            }
          }, _callee1, null, [[1, 3]]);
        }));
        return function (_x0) {
          return _ref0.apply(this, arguments);
        };
      }());

      /**
       * Send candidate welcome email
       */
      this.agenda.define("send-candidate-welcome-email", {
        priority: "normal",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(job) {
          var _job$attrs$data8, email, name, candidateCode, eventName, _t10;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.p = _context10.n) {
              case 0:
                _job$attrs$data8 = job.attrs.data, email = _job$attrs$data8.email, name = _job$attrs$data8.name, candidateCode = _job$attrs$data8.candidateCode, eventName = _job$attrs$data8.eventName;
                _context10.p = 1;
                console.log("📧 Sending candidate welcome email to:", email);
                _context10.n = 2;
                return _emailService["default"].sendCandidateWelcomeEmail(email, name, candidateCode, eventName);
              case 2:
                console.log("✅ Candidate welcome email sent");
                _context10.n = 4;
                break;
              case 3:
                _context10.p = 3;
                _t10 = _context10.v;
                console.error("❌ Failed to send candidate welcome email:", _t10);
              case 4:
                return _context10.a(2);
            }
          }, _callee10, null, [[1, 3]]);
        }));
        return function (_x1) {
          return _ref1.apply(this, arguments);
        };
      }());

      /**
       * Send event reminder emails
       */
      this.agenda.define("send-event-reminder-emails", {
        priority: "low",
        concurrency: 10
      }, /*#__PURE__*/function () {
        var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(job) {
          var _job$attrs$data9, eventId, reminderType, _yield$import5, EventRepository, _yield$import6, UserRepository, event, users, _iterator, _step, user, _t11, _t12;
          return _regenerator().w(function (_context11) {
            while (1) switch (_context11.p = _context11.n) {
              case 0:
                _job$attrs$data9 = job.attrs.data, eventId = _job$attrs$data9.eventId, reminderType = _job$attrs$data9.reminderType;
                _context11.p = 1;
                console.log("📧 Sending event reminder emails:", {
                  eventId: eventId,
                  reminderType: reminderType
                });
                _context11.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/event/event.repository.js"));
                });
              case 2:
                _yield$import5 = _context11.v;
                EventRepository = _yield$import5["default"];
                _context11.n = 3;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/user/user.repository.js"));
                });
              case 3:
                _yield$import6 = _context11.v;
                UserRepository = _yield$import6["default"];
                _context11.n = 4;
                return EventRepository.findById(eventId);
              case 4:
                event = _context11.v;
                if (event) {
                  _context11.n = 5;
                  break;
                }
                console.warn("⚠️ Event not found:", eventId);
                return _context11.a(2);
              case 5:
                _context11.n = 6;
                return UserRepository.findAll({}, 1, 1000);
              case 6:
                users = _context11.v;
                _iterator = _createForOfIteratorHelper(users.data);
                _context11.p = 7;
                _iterator.s();
              case 8:
                if ((_step = _iterator.n()).done) {
                  _context11.n = 10;
                  break;
                }
                user = _step.value;
                _context11.n = 9;
                return _emailService["default"].sendEventReminderEmail({
                  to: user.email,
                  name: user.name,
                  eventName: event.title,
                  eventEndDate: event.end_date,
                  reminderType: reminderType
                });
              case 9:
                _context11.n = 8;
                break;
              case 10:
                _context11.n = 12;
                break;
              case 11:
                _context11.p = 11;
                _t11 = _context11.v;
                _iterator.e(_t11);
              case 12:
                _context11.p = 12;
                _iterator.f();
                return _context11.f(12);
              case 13:
                console.log("✅ Event reminder emails sent");
                _context11.n = 15;
                break;
              case 14:
                _context11.p = 14;
                _t12 = _context11.v;
                console.error("❌ Failed to send event reminder emails:", _t12);
              case 15:
                return _context11.a(2);
            }
          }, _callee11, null, [[7, 11, 12, 13], [1, 14]]);
        }));
        return function (_x10) {
          return _ref10.apply(this, arguments);
        };
      }());

      /**
       * Send candidate profile approved email
       */
      this.agenda.define("send-candidate-profile-approved-email", {
        priority: "normal",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(job) {
          var _job$attrs$data0, email, name, eventId, _yield$import7, EventRepository, event, _t13;
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.p = _context12.n) {
              case 0:
                _job$attrs$data0 = job.attrs.data, email = _job$attrs$data0.email, name = _job$attrs$data0.name, eventId = _job$attrs$data0.eventId;
                _context12.p = 1;
                console.log("📧 Sending profile approved email to:", email);
                _context12.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/event/event.repository.js"));
                });
              case 2:
                _yield$import7 = _context12.v;
                EventRepository = _yield$import7["default"];
                _context12.n = 3;
                return EventRepository.findById(eventId);
              case 3:
                event = _context12.v;
                _context12.n = 4;
                return _emailService["default"].sendCandidateProfileApprovedEmail(email, name, event);
              case 4:
                console.log("✅ Profile approved email sent");
                _context12.n = 6;
                break;
              case 5:
                _context12.p = 5;
                _t13 = _context12.v;
                console.error("❌ Failed to send profile approved email:", _t13);
              case 6:
                return _context12.a(2);
            }
          }, _callee12, null, [[1, 5]]);
        }));
        return function (_x11) {
          return _ref11.apply(this, arguments);
        };
      }());

      /**
       * Send candidate profile rejected email
       */
      this.agenda.define("send-candidate-profile-rejected-email", {
        priority: "normal",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(job) {
          var _job$attrs$data1, email, name, reason, _t14;
          return _regenerator().w(function (_context13) {
            while (1) switch (_context13.p = _context13.n) {
              case 0:
                _job$attrs$data1 = job.attrs.data, email = _job$attrs$data1.email, name = _job$attrs$data1.name, reason = _job$attrs$data1.reason;
                _context13.p = 1;
                console.log("📧 Sending profile rejected email to:", email);
                _context13.n = 2;
                return _emailService["default"].sendCandidateProfileRejectedEmail(email, name, reason);
              case 2:
                console.log("✅ Profile rejected email sent");
                _context13.n = 4;
                break;
              case 3:
                _context13.p = 3;
                _t14 = _context13.v;
                console.error("❌ Failed to send profile rejected email:", _t14);
              case 4:
                return _context13.a(2);
            }
          }, _callee13, null, [[1, 3]]);
        }));
        return function (_x12) {
          return _ref12.apply(this, arguments);
        };
      }());

      /**
       * Send admin profile update alert email
       */
      this.agenda.define("send-admin-profile-update-alert-email", {
        priority: "normal",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(job) {
          var _job$attrs$data10, adminEmail, candidateName, eventTitle, changedFields, _t15;
          return _regenerator().w(function (_context14) {
            while (1) switch (_context14.p = _context14.n) {
              case 0:
                _job$attrs$data10 = job.attrs.data, adminEmail = _job$attrs$data10.adminEmail, candidateName = _job$attrs$data10.candidateName, eventTitle = _job$attrs$data10.eventTitle, changedFields = _job$attrs$data10.changedFields;
                _context14.p = 1;
                console.log("📧 Sending admin alert email to:", adminEmail);
                _context14.n = 2;
                return _emailService["default"].sendAdminProfileUpdateAlertEmail(adminEmail, candidateName, eventTitle, changedFields);
              case 2:
                console.log("✅ Admin alert email sent");
                _context14.n = 4;
                break;
              case 3:
                _context14.p = 3;
                _t15 = _context14.v;
                console.error("❌ Failed to send admin alert email:", _t15);
              case 4:
                return _context14.a(2);
            }
          }, _callee14, null, [[1, 3]]);
        }));
        return function (_x13) {
          return _ref13.apply(this, arguments);
        };
      }());

      // ========================================
      // 3. SCHEDULED TASKS
      // ========================================

      /**
       * Close expired events (runs hourly)
       * Triggers cascading cleanup jobs
       */
      this.agenda.define("close-expired-events", {
        priority: "normal",
        concurrency: 1
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var _yield$import8, EventRepository, expiredEvents, count, _iterator2, _step2, event, _t16, _t17;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              console.log("🔒 Closing expired events...");
              _context15.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../modules/event/event.repository.js"));
              });
            case 1:
              _yield$import8 = _context15.v;
              EventRepository = _yield$import8["default"];
              _context15.n = 2;
              return EventRepository.findAll({
                status: "active",
                end_date: {
                  $lt: new Date()
                }
              }, 1, 100);
            case 2:
              expiredEvents = _context15.v;
              count = 0;
              _iterator2 = _createForOfIteratorHelper(expiredEvents.data);
              _context15.p = 3;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context15.n = 8;
                break;
              }
              event = _step2.value;
              _context15.n = 5;
              return EventRepository.updateById(event._id, {
                status: "closed"
              });
            case 5:
              _context15.n = 6;
              return _this2.now("close-event-cascade", {
                eventId: event._id
              });
            case 6:
              count++;
            case 7:
              _context15.n = 4;
              break;
            case 8:
              _context15.n = 10;
              break;
            case 9:
              _context15.p = 9;
              _t16 = _context15.v;
              _iterator2.e(_t16);
            case 10:
              _context15.p = 10;
              _iterator2.f();
              return _context15.f(10);
            case 11:
              console.log("\u2705 Closed ".concat(count, " expired events"));
              _context15.n = 13;
              break;
            case 12:
              _context15.p = 12;
              _t17 = _context15.v;
              console.error("❌ Failed to close expired events:", _t17);
            case 13:
              return _context15.a(2);
          }
        }, _callee15, null, [[3, 9, 10, 11], [0, 12]]);
      })));

      /**
       * Handle immediate cascading actions when event closes
       * 1. Unfeature event
       * 2. Archive categories
       * 3. Publish results
       * 4. Schedule delayed candidate archival (1 week)
       */
      this.agenda.define("close-event-cascade", {
        priority: "high",
        concurrency: 5
      }, /*#__PURE__*/function () {
        var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(job) {
          var eventId, _yield$import9, EventRepository, _yield$import0, CategoryRepository, categories, _iterator3, _step3, category, oneWeekFromNow, _t18, _t19;
          return _regenerator().w(function (_context16) {
            while (1) switch (_context16.p = _context16.n) {
              case 0:
                eventId = job.attrs.data.eventId;
                _context16.p = 1;
                console.log("🔄 Processing event closure cascade for:", eventId);
                _context16.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/event/event.repository.js"));
                });
              case 2:
                _yield$import9 = _context16.v;
                EventRepository = _yield$import9["default"];
                _context16.n = 3;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/category/category.repository.js"));
                });
              case 3:
                _yield$import0 = _context16.v;
                CategoryRepository = _yield$import0["default"];
                _context16.n = 4;
                return EventRepository.updateById(eventId, {
                  is_featured: false,
                  featured_at: null
                });
              case 4:
                console.log("✅ Event unfeatured");

                // 2. Archive and unfeature all categories for this event
                _context16.n = 5;
                return CategoryRepository.findAll({
                  event_id: eventId
                }, 1, 1000);
              case 5:
                categories = _context16.v;
                _iterator3 = _createForOfIteratorHelper(categories.data);
                _context16.p = 6;
                _iterator3.s();
              case 7:
                if ((_step3 = _iterator3.n()).done) {
                  _context16.n = 9;
                  break;
                }
                category = _step3.value;
                _context16.n = 8;
                return CategoryRepository.updateById(category._id, {
                  status: "archived",
                  archived_at: new Date(),
                  is_featured: false,
                  featured_at: null
                });
              case 8:
                _context16.n = 7;
                break;
              case 9:
                _context16.n = 11;
                break;
              case 10:
                _context16.p = 10;
                _t18 = _context16.v;
                _iterator3.e(_t18);
              case 11:
                _context16.p = 11;
                _iterator3.f();
                return _context16.f(11);
              case 12:
                console.log("\u2705 Archived and unfeatured ".concat(categories.data.length, " categories"));

                // 3. Queue results publishing
                _context16.n = 13;
                return _this2.now("publish-event-results", {
                  eventId: eventId
                });
              case 13:
                // 4. Schedule candidate archival for 1 week from now
                oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
                _context16.n = 14;
                return _this2.schedule("archive-event-candidates", {
                  eventId: eventId
                }, oneWeekFromNow);
              case 14:
                console.log("\uD83D\uDCC5 Scheduled candidate archival for ".concat(oneWeekFromNow.toISOString()));
                console.log("✅ Event closure cascade completed");
                _context16.n = 16;
                break;
              case 15:
                _context16.p = 15;
                _t19 = _context16.v;
                console.error("❌ Failed to process event closure cascade:", _t19);
                throw _t19;
              case 16:
                return _context16.a(2);
            }
          }, _callee16, null, [[6, 10, 11, 12], [1, 15]]);
        }));
        return function (_x14) {
          return _ref15.apply(this, arguments);
        };
      }());

      /**
       * Archive candidates and lock accounts (1 week after event closes)
       */
      this.agenda.define("archive-event-candidates", {
        priority: "normal",
        concurrency: 5
      }, /*#__PURE__*/function () {
        var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(job) {
          var eventId, _yield$import1, CandidateRepository, candidates, archivedCount, lockedCount, _iterator4, _step4, candidate, _yield$import10, EventRepository, _t20, _t21;
          return _regenerator().w(function (_context17) {
            while (1) switch (_context17.p = _context17.n) {
              case 0:
                eventId = job.attrs.data.eventId;
                _context17.p = 1;
                console.log("📦 Archiving candidates for closed event:", eventId);
                _context17.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/candidate/candidate.repository.js"));
                });
              case 2:
                _yield$import1 = _context17.v;
                CandidateRepository = _yield$import1["default"];
                _context17.n = 3;
                return CandidateRepository.findAll({
                  event_id: eventId
                }, 1, 1000);
              case 3:
                candidates = _context17.v;
                archivedCount = 0;
                lockedCount = 0;
                _iterator4 = _createForOfIteratorHelper(candidates.data);
                _context17.p = 4;
                _iterator4.s();
              case 5:
                if ((_step4 = _iterator4.n()).done) {
                  _context17.n = 9;
                  break;
                }
                candidate = _step4.value;
                _context17.n = 6;
                return CandidateRepository.updateById(candidate._id, {
                  status: "locked",
                  locked_at: new Date(),
                  locked_reason: "Event has ended"
                });
              case 6:
                lockedCount++;

                // Archive candidate
                _context17.n = 7;
                return CandidateRepository.updateById(candidate._id, {
                  is_archived: true,
                  archived_at: new Date()
                });
              case 7:
                archivedCount++;

                // Optional: Send notification email to candidate
                _context17.n = 8;
                return _this2.now("send-candidate-account-locked-email", {
                  candidateId: candidate._id,
                  reason: "event_ended"
                });
              case 8:
                _context17.n = 5;
                break;
              case 9:
                _context17.n = 11;
                break;
              case 10:
                _context17.p = 10;
                _t20 = _context17.v;
                _iterator4.e(_t20);
              case 11:
                _context17.p = 11;
                _iterator4.f();
                return _context17.f(11);
              case 12:
                console.log("\u2705 Locked ".concat(lockedCount, " and archived ").concat(archivedCount, " candidates"));

                // Optionally archive the event itself
                _context17.n = 13;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/event/event.repository.js"));
                });
              case 13:
                _yield$import10 = _context17.v;
                EventRepository = _yield$import10["default"];
                _context17.n = 14;
                return EventRepository.updateById(eventId, {
                  is_archived: true,
                  archived_at: new Date()
                });
              case 14:
                console.log("✅ Event archived");
                _context17.n = 16;
                break;
              case 15:
                _context17.p = 15;
                _t21 = _context17.v;
                console.error("❌ Failed to archive event candidates:", _t21);
                throw _t21;
              case 16:
                return _context17.a(2);
            }
          }, _callee17, null, [[4, 10, 11, 12], [1, 15]]);
        }));
        return function (_x15) {
          return _ref16.apply(this, arguments);
        };
      }());

      /**
       * Send candidate account locked notification
       */
      this.agenda.define("send-candidate-account-locked-email", {
        priority: "low",
        concurrency: 20
      }, /*#__PURE__*/function () {
        var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(job) {
          var _job$attrs$data11, candidateId, reason, _candidate$event, _yield$import11, CandidateRepository, candidate, _t22;
          return _regenerator().w(function (_context18) {
            while (1) switch (_context18.p = _context18.n) {
              case 0:
                _job$attrs$data11 = job.attrs.data, candidateId = _job$attrs$data11.candidateId, reason = _job$attrs$data11.reason;
                _context18.p = 1;
                console.log("📧 Sending account locked email to candidate:", candidateId);
                _context18.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/candidate/candidate.repository.js"));
                });
              case 2:
                _yield$import11 = _context18.v;
                CandidateRepository = _yield$import11["default"];
                _context18.n = 3;
                return CandidateRepository.findById(candidateId, {
                  populate: ["event"]
                });
              case 3:
                candidate = _context18.v;
                if (candidate) {
                  _context18.n = 4;
                  break;
                }
                console.warn("⚠️ Candidate not found:", candidateId);
                return _context18.a(2);
              case 4:
                _context18.n = 5;
                return _emailService["default"].sendCandidateAccountLockedEmail({
                  to: candidate.email,
                  name: candidate.name,
                  eventName: (_candidate$event = candidate.event) === null || _candidate$event === void 0 ? void 0 : _candidate$event.title,
                  reason: reason === "event_ended" ? "The voting event has ended and your account has been archived." : "Your account has been locked.",
                  lockedAt: candidate.locked_at
                });
              case 5:
                console.log("✅ Account locked email sent");
                _context18.n = 7;
                break;
              case 6:
                _context18.p = 6;
                _t22 = _context18.v;
                console.error("❌ Failed to send account locked email:", _t22);
              case 7:
                return _context18.a(2);
            }
          }, _callee18, null, [[1, 6]]);
        }));
        return function (_x16) {
          return _ref17.apply(this, arguments);
        };
      }());

      /**
       * Publish event results
       */
      this.agenda.define("publish-event-results", {
        priority: "high",
        concurrency: 5
      }, /*#__PURE__*/function () {
        var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(job) {
          var eventId, _yield$import12, EventRepository, _yield$import13, AnalyticsService, results, _t23;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.p = _context19.n) {
              case 0:
                eventId = job.attrs.data.eventId;
                _context19.p = 1;
                console.log("📊 Publishing results for event:", eventId);
                _context19.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/event/event.repository.js"));
                });
              case 2:
                _yield$import12 = _context19.v;
                EventRepository = _yield$import12["default"];
                _context19.n = 3;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/analytics/analytics.service.js"));
                });
              case 3:
                _yield$import13 = _context19.v;
                AnalyticsService = _yield$import13["default"];
                _context19.n = 4;
                return AnalyticsService.getEventDashboard(eventId);
              case 4:
                results = _context19.v;
                _context19.n = 5;
                return EventRepository.updateById(eventId, {
                  results_published: true,
                  results_published_at: new Date()
                });
              case 5:
                console.log("✅ Event results published");
                _context19.n = 7;
                break;
              case 6:
                _context19.p = 6;
                _t23 = _context19.v;
                console.error("❌ Failed to publish event results:", _t23);
              case 7:
                return _context19.a(2);
            }
          }, _callee19, null, [[1, 6]]);
        }));
        return function (_x17) {
          return _ref18.apply(this, arguments);
        };
      }());

      /**
       * Generate daily analytics (runs at midnight)
       */
      this.agenda.define("generate-daily-analytics", {
        priority: "low",
        concurrency: 1
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
        var _yield$import14, AnalyticsService, _t24;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              console.log("📊 Generating daily analytics...");
              _context20.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../modules/analytics/analytics.service.js"));
              });
            case 1:
              _yield$import14 = _context20.v;
              AnalyticsService = _yield$import14["default"];
              _context20.n = 2;
              return AnalyticsService.getPlatformDashboard();
            case 2:
              console.log("✅ Daily analytics generated");
              _context20.n = 4;
              break;
            case 3:
              _context20.p = 3;
              _t24 = _context20.v;
              console.error("❌ Failed to generate daily analytics:", _t24);
            case 4:
              return _context20.a(2);
          }
        }, _callee20, null, [[0, 3]]);
      })));

      /**
       * Clean up old agenda jobs (runs weekly)
       */
      this.agenda.define("cleanup-old-jobs", {
        priority: "low",
        concurrency: 1
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
        var oneMonthAgo, numRemoved, _t25;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              console.log("🧹 Cleaning up old agenda jobs...");
              oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              _context21.n = 1;
              return _this2.agenda.cancel({
                lastFinishedAt: {
                  $lt: oneMonthAgo
                },
                nextRunAt: null
              });
            case 1:
              numRemoved = _context21.v;
              console.log("\u2705 Cleaned up ".concat(numRemoved, " old jobs"));
              _context21.n = 3;
              break;
            case 2:
              _context21.p = 2;
              _t25 = _context21.v;
              console.error("❌ Failed to clean up old jobs:", _t25);
            case 3:
              return _context21.a(2);
          }
        }, _callee21, null, [[0, 2]]);
      })));

      /**
       * Clean up expired tokens (runs daily)
       */
      this.agenda.define("cleanup-expired-tokens", {
        priority: "low",
        concurrency: 1
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
        var _yield$import15, cache, _t26;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              console.log("🧹 Cleaning up expired tokens...");
              _context22.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../utils/cache/cache.utils.js"));
              });
            case 1:
              _yield$import15 = _context22.v;
              cache = _yield$import15.cache;
              // Redis automatically expires keys with TTL, but we can clean up manually if needed
              console.log("✅ Expired tokens cleaned up (handled by Redis TTL)");
              _context22.n = 3;
              break;
            case 2:
              _context22.p = 2;
              _t26 = _context22.v;
              console.error("❌ Failed to clean up tokens:", _t26);
            case 3:
              return _context22.a(2);
          }
        }, _callee22, null, [[0, 2]]);
      })));

      /**
       * Send voting deadline reminders
       */
      this.agenda.define("send-voting-deadline-reminders", {
        priority: "normal",
        concurrency: 1
      }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
        var _yield$import16, EventRepository, tomorrow, dayAfter, endingSoon, _iterator5, _step5, event, _t27, _t28;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              console.log("📧 Sending voting deadline reminders...");
              _context23.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../modules/event/event.repository.js"));
              });
            case 1:
              _yield$import16 = _context23.v;
              EventRepository = _yield$import16["default"];
              // Find events ending in 24 hours
              tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              dayAfter = new Date(tomorrow);
              dayAfter.setDate(dayAfter.getDate() + 1);
              _context23.n = 2;
              return EventRepository.findAll({
                status: "active",
                end_date: {
                  $gte: tomorrow,
                  $lt: dayAfter
                }
              }, 1, 100);
            case 2:
              endingSoon = _context23.v;
              _iterator5 = _createForOfIteratorHelper(endingSoon.data);
              _context23.p = 3;
              _iterator5.s();
            case 4:
              if ((_step5 = _iterator5.n()).done) {
                _context23.n = 6;
                break;
              }
              event = _step5.value;
              _context23.n = 5;
              return _this2.now("send-event-reminder-emails", {
                eventId: event._id,
                reminderType: "24_hours_left"
              });
            case 5:
              _context23.n = 4;
              break;
            case 6:
              _context23.n = 8;
              break;
            case 7:
              _context23.p = 7;
              _t27 = _context23.v;
              _iterator5.e(_t27);
            case 8:
              _context23.p = 8;
              _iterator5.f();
              return _context23.f(8);
            case 9:
              console.log("\u2705 Sent reminders for ".concat(endingSoon.data.length, " events"));
              _context23.n = 11;
              break;
            case 10:
              _context23.p = 10;
              _t28 = _context23.v;
              console.error("❌ Failed to send voting deadline reminders:", _t28);
            case 11:
              return _context23.a(2);
          }
        }, _callee23, null, [[3, 7, 8, 9], [0, 10]]);
      })));

      // ========================================
      // 7. ACTIVITY LOGGING JOBS
      // ========================================

      /**
       * Log user activity (async, non-blocking)
       * High concurrency for minimal latency impact
       */
      this.agenda.define("log-activity", {
        priority: "low",
        concurrency: 50
      }, /*#__PURE__*/function () {
        var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(job) {
          var _job$attrs$data12, userId, action, entityType, entityId, eventId, description, severity, ipAddress, userAgent, metadata, changes, sessionId, _yield$import17, ActivityRepository, _t29;
          return _regenerator().w(function (_context24) {
            while (1) switch (_context24.p = _context24.n) {
              case 0:
                _job$attrs$data12 = job.attrs.data, userId = _job$attrs$data12.userId, action = _job$attrs$data12.action, entityType = _job$attrs$data12.entityType, entityId = _job$attrs$data12.entityId, eventId = _job$attrs$data12.eventId, description = _job$attrs$data12.description, severity = _job$attrs$data12.severity, ipAddress = _job$attrs$data12.ipAddress, userAgent = _job$attrs$data12.userAgent, metadata = _job$attrs$data12.metadata, changes = _job$attrs$data12.changes, sessionId = _job$attrs$data12.sessionId;
                _context24.p = 1;
                _context24.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/activity/activity.repository.js"));
                });
              case 2:
                _yield$import17 = _context24.v;
                ActivityRepository = _yield$import17["default"];
                _context24.n = 3;
                return ActivityRepository.create({
                  user: userId || null,
                  action: action,
                  entity_type: entityType,
                  entity_id: entityId || null,
                  event: eventId || null,
                  description: description,
                  severity: severity || "info",
                  ip_address: ipAddress || null,
                  user_agent: userAgent || null,
                  metadata: metadata || {},
                  changes: changes || null,
                  session_id: sessionId || null,
                  timestamp: new Date()
                });
              case 3:
                _context24.n = 5;
                break;
              case 4:
                _context24.p = 4;
                _t29 = _context24.v;
                // Don't throw - activity logging should never break main flow
                console.error("\u274C Activity logging failed for action ".concat(action, ":"), _t29.message);
              case 5:
                return _context24.a(2);
            }
          }, _callee24, null, [[1, 4]]);
        }));
        return function (_x18) {
          return _ref23.apply(this, arguments);
        };
      }());

      /**
       * Batch log multiple activities (for bulk operations)
       * Use when logging many activities at once (e.g., bulk imports)
       */
      this.agenda.define("batch-log-activities", {
        priority: "low",
        concurrency: 10
      }, /*#__PURE__*/function () {
        var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(job) {
          var activities, _yield$import18, ActivityRepository, activitiesWithTimestamps, _t30;
          return _regenerator().w(function (_context25) {
            while (1) switch (_context25.p = _context25.n) {
              case 0:
                activities = job.attrs.data.activities;
                _context25.p = 1;
                if (!(!Array.isArray(activities) || activities.length === 0)) {
                  _context25.n = 2;
                  break;
                }
                console.warn("⚠️ No activities provided for batch logging");
                return _context25.a(2);
              case 2:
                _context25.n = 3;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/activity/activity.repository.js"));
                });
              case 3:
                _yield$import18 = _context25.v;
                ActivityRepository = _yield$import18["default"];
                // Prepare activities with timestamps
                activitiesWithTimestamps = activities.map(function (activity) {
                  return {
                    user: activity.userId || null,
                    action: activity.action,
                    entity_type: activity.entityType,
                    entity_id: activity.entityId || null,
                    event: activity.eventId || null,
                    description: activity.description,
                    severity: activity.severity || "info",
                    ip_address: activity.ipAddress || null,
                    user_agent: activity.userAgent || null,
                    metadata: activity.metadata || {},
                    changes: activity.changes || null,
                    session_id: activity.sessionId || null,
                    timestamp: new Date()
                  };
                }); // Bulk insert for performance
                _context25.n = 4;
                return ActivityRepository.model.insertMany(activitiesWithTimestamps, {
                  ordered: false
                });
              case 4:
                console.log("\u2705 Batch logged ".concat(activitiesWithTimestamps.length, " activities"));
                _context25.n = 6;
                break;
              case 5:
                _context25.p = 5;
                _t30 = _context25.v;
                console.error("❌ Batch activity logging failed:", _t30.message);
              case 6:
                return _context25.a(2);
            }
          }, _callee25, null, [[1, 5]]);
        }));
        return function (_x19) {
          return _ref24.apply(this, arguments);
        };
      }());

      /**
       * Archive old activities (runs monthly)
       * Move activities older than retention period to cold storage
       */
      this.agenda.define("archive-old-activities", {
        priority: "low",
        concurrency: 1
      }, /*#__PURE__*/function () {
        var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(job) {
          var _job$attrs$data$reten, retentionMonths, _yield$import19, ActivityRepository, cutoffDate, count, result, _t31;
          return _regenerator().w(function (_context26) {
            while (1) switch (_context26.p = _context26.n) {
              case 0:
                _job$attrs$data$reten = job.attrs.data.retentionMonths, retentionMonths = _job$attrs$data$reten === void 0 ? 24 : _job$attrs$data$reten;
                _context26.p = 1;
                console.log("\uD83D\uDDC4\uFE0F Archiving activities older than ".concat(retentionMonths, " months..."));
                _context26.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/activity/activity.repository.js"));
                });
              case 2:
                _yield$import19 = _context26.v;
                ActivityRepository = _yield$import19["default"];
                cutoffDate = new Date();
                cutoffDate.setMonth(cutoffDate.getMonth() - retentionMonths);

                // Count old activities
                _context26.n = 3;
                return ActivityRepository.model.countDocuments({
                  timestamp: {
                    $lt: cutoffDate
                  }
                });
              case 3:
                count = _context26.v;
                if (!(count === 0)) {
                  _context26.n = 4;
                  break;
                }
                console.log("✅ No old activities to archive");
                return _context26.a(2);
              case 4:
                _context26.n = 5;
                return ActivityRepository.model.updateMany({
                  timestamp: {
                    $lt: cutoffDate
                  }
                }, {
                  $set: {
                    is_archived: true,
                    archived_at: new Date()
                  }
                });
              case 5:
                result = _context26.v;
                console.log("\u2705 Archived ".concat(result.modifiedCount, " old activities"));

                // Option 2: Export to file/cold storage before deletion (future enhancement)
                // const oldActivities = await ActivityRepository.model.find({ timestamp: { $lt: cutoffDate } }).lean();
                // await exportToS3(oldActivities);
                // await ActivityRepository.model.deleteMany({ timestamp: { $lt: cutoffDate } });
                _context26.n = 7;
                break;
              case 6:
                _context26.p = 6;
                _t31 = _context26.v;
                console.error("❌ Failed to archive old activities:", _t31);
                throw _t31;
              case 7:
                return _context26.a(2);
            }
          }, _callee26, null, [[1, 6]]);
        }));
        return function (_x20) {
          return _ref25.apply(this, arguments);
        };
      }());

      /**
       * Detect and log suspicious activity patterns
       * Runs periodically to identify fraud/security issues
       */
      this.agenda.define("detect-suspicious-activities", {
        priority: "normal",
        concurrency: 3
      }, /*#__PURE__*/function () {
        var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(job) {
          var _job$attrs$data13, eventId, _job$attrs$data13$thr, thresholdMinutes, _job$attrs$data13$thr2, threshold, _yield$import20, ActivityRepository, suspiciousActivities, _iterator6, _step6, pattern, _t32, _t33;
          return _regenerator().w(function (_context27) {
            while (1) switch (_context27.p = _context27.n) {
              case 0:
                _job$attrs$data13 = job.attrs.data, eventId = _job$attrs$data13.eventId, _job$attrs$data13$thr = _job$attrs$data13.thresholdMinutes, thresholdMinutes = _job$attrs$data13$thr === void 0 ? 5 : _job$attrs$data13$thr, _job$attrs$data13$thr2 = _job$attrs$data13.threshold, threshold = _job$attrs$data13$thr2 === void 0 ? 10 : _job$attrs$data13$thr2;
                _context27.p = 1;
                console.log("🔍 Detecting suspicious activity patterns...");
                _context27.n = 2;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require("../modules/activity/activity.repository.js"));
                });
              case 2:
                _yield$import20 = _context27.v;
                ActivityRepository = _yield$import20["default"];
                _context27.n = 3;
                return ActivityRepository.detectSuspiciousPatterns(threshold, thresholdMinutes);
              case 3:
                suspiciousActivities = _context27.v;
                if (!(suspiciousActivities.length > 0)) {
                  _context27.n = 12;
                  break;
                }
                console.warn("\u26A0\uFE0F Found ".concat(suspiciousActivities.length, " suspicious patterns"));

                // Log each suspicious pattern
                _iterator6 = _createForOfIteratorHelper(suspiciousActivities);
                _context27.p = 4;
                _iterator6.s();
              case 5:
                if ((_step6 = _iterator6.n()).done) {
                  _context27.n = 7;
                  break;
                }
                pattern = _step6.value;
                _context27.n = 6;
                return _this2.now("log-activity", {
                  userId: null,
                  action: "SUSPICIOUS_ACTIVITY",
                  entityType: "SYSTEM",
                  description: "Suspicious pattern detected: ".concat(pattern.count, " actions from IP ").concat(pattern._id, " in ").concat(thresholdMinutes, " minutes"),
                  severity: "warning",
                  ipAddress: pattern._id,
                  metadata: {
                    pattern: pattern,
                    threshold: threshold,
                    thresholdMinutes: thresholdMinutes
                  }
                });
              case 6:
                _context27.n = 5;
                break;
              case 7:
                _context27.n = 9;
                break;
              case 8:
                _context27.p = 8;
                _t32 = _context27.v;
                _iterator6.e(_t32);
              case 9:
                _context27.p = 9;
                _iterator6.f();
                return _context27.f(9);
              case 10:
                _context27.n = 11;
                return _this2.now("send-security-alert-email", {
                  alertType: "suspicious_activity",
                  patterns: suspiciousActivities
                });
              case 11:
                _context27.n = 13;
                break;
              case 12:
                console.log("✅ No suspicious patterns detected");
              case 13:
                _context27.n = 15;
                break;
              case 14:
                _context27.p = 14;
                _t33 = _context27.v;
                console.error("❌ Failed to detect suspicious activities:", _t33);
              case 15:
                return _context27.a(2);
            }
          }, _callee27, null, [[4, 8, 9, 10], [1, 14]]);
        }));
        return function (_x21) {
          return _ref26.apply(this, arguments);
        };
      }());
    }

    // ========================================
    // PUBLIC API METHODS
    // ========================================

    /**
     * Schedule a job to run immediately
     * @param {string} jobName - Name of the job
     * @param {Object} data - Job data
     * @returns {Promise<Job>}
     */
  }, {
    key: "now",
    value: function () {
      var _now = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(jobName, data) {
        var job, _t34;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              if (!this.isReady) {
                console.warn("⚠️ Agenda not ready. Queuing job:", jobName);
              }
              _context28.p = 1;
              job = this.agenda.create(jobName, data);
              job.schedule(new Date());
              _context28.n = 2;
              return job.save();
            case 2:
              console.log("\uD83D\uDCC5 Job scheduled: ".concat(jobName));
              return _context28.a(2, job);
            case 3:
              _context28.p = 3;
              _t34 = _context28.v;
              console.error("\u274C Failed to schedule job ".concat(jobName, ":"), _t34);
              throw _t34;
            case 4:
              return _context28.a(2);
          }
        }, _callee28, this, [[1, 3]]);
      }));
      function now(_x22, _x23) {
        return _now.apply(this, arguments);
      }
      return now;
    }()
    /**
     * Schedule a job to run at a specific time
     * @param {string} jobName - Name of the job
     * @param {Object} data - Job data
     * @param {Date|string} when - When to run (Date or cron expression)
     * @returns {Promise<Job>}
     */
  }, {
    key: "schedule",
    value: (function () {
      var _schedule = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(jobName, data) {
        var when,
          job,
          _args29 = arguments,
          _t35;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              when = _args29.length > 2 && _args29[2] !== undefined ? _args29[2] : new Date();
              if (!this.isReady) {
                console.warn("⚠️ Agenda not ready. Job may not be scheduled:", jobName);
              }
              _context29.p = 1;
              job = this.agenda.create(jobName, data);
              job.schedule(when);
              _context29.n = 2;
              return job.save();
            case 2:
              console.log("\uD83D\uDCC5 Job scheduled: ".concat(jobName, " at ").concat(when));
              return _context29.a(2, job);
            case 3:
              _context29.p = 3;
              _t35 = _context29.v;
              console.error("\u274C Failed to schedule job ".concat(jobName, ":"), _t35);
              throw _t35;
            case 4:
              return _context29.a(2);
          }
        }, _callee29, this, [[1, 3]]);
      }));
      function schedule(_x24, _x25) {
        return _schedule.apply(this, arguments);
      }
      return schedule;
    }()
    /**
     * Schedule a recurring job
     * @param {string} interval - Cron expression
     * @param {string} jobName - Name of the job
     * @param {Object} data - Job data
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "every",
    value: (function () {
      var _every = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(interval, jobName) {
        var data,
          _args30 = arguments,
          _t36;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              data = _args30.length > 2 && _args30[2] !== undefined ? _args30[2] : {};
              if (this.isReady) {
                _context30.n = 1;
                break;
              }
              throw new Error("Agenda is not ready. Call initialize() first.");
            case 1:
              _context30.p = 1;
              _context30.n = 2;
              return this.agenda.every(interval, jobName, data);
            case 2:
              console.log("\uD83D\uDD04 Recurring job scheduled: ".concat(jobName, " (").concat(interval, ")"));
              _context30.n = 4;
              break;
            case 3:
              _context30.p = 3;
              _t36 = _context30.v;
              console.error("\u274C Failed to schedule recurring job ".concat(jobName, ":"), _t36);
              throw _t36;
            case 4:
              return _context30.a(2);
          }
        }, _callee30, this, [[1, 3]]);
      }));
      function every(_x26, _x27) {
        return _every.apply(this, arguments);
      }
      return every;
    }()
    /**
     * Cancel jobs matching query
     * @param {Object} query - MongoDB query
     * @returns {Promise<number>}
     */
    )
  }, {
    key: "cancel",
    value: (function () {
      var _cancel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(query) {
        var numRemoved, _t37;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.p = _context31.n) {
            case 0:
              if (this.isReady) {
                _context31.n = 1;
                break;
              }
              throw new Error("Agenda is not ready.");
            case 1:
              _context31.p = 1;
              _context31.n = 2;
              return this.agenda.cancel(query);
            case 2:
              numRemoved = _context31.v;
              console.log("\uD83D\uDDD1\uFE0F Canceled ".concat(numRemoved, " jobs"));
              return _context31.a(2, numRemoved);
            case 3:
              _context31.p = 3;
              _t37 = _context31.v;
              console.error("❌ Failed to cancel jobs:", _t37);
              throw _t37;
            case 4:
              return _context31.a(2);
          }
        }, _callee31, this, [[1, 3]]);
      }));
      function cancel(_x28) {
        return _cancel.apply(this, arguments);
      }
      return cancel;
    }()
    /**
     * Get jobs matching query
     * @param {Object} query - MongoDB query
     * @returns {Promise<Array>}
     */
    )
  }, {
    key: "getJobs",
    value: (function () {
      var _getJobs = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(query) {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              if (this.isReady) {
                _context32.n = 1;
                break;
              }
              throw new Error("Agenda is not ready.");
            case 1:
              _context32.n = 2;
              return this.agenda.jobs(query);
            case 2:
              return _context32.a(2, _context32.v);
          }
        }, _callee32, this);
      }));
      function getJobs(_x29) {
        return _getJobs.apply(this, arguments);
      }
      return getJobs;
    }()
    /**
     * Setup all recurring tasks
     */
    )
  }, {
    key: "setupRecurringTasks",
    value: (function () {
      var _setupRecurringTasks = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33() {
        var _t38;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              _context33.p = 0;
              console.log("⚙️ Setting up recurring tasks...");

              // Close expired events every hour
              _context33.n = 1;
              return this.every("0 * * * *", "close-expired-events");
            case 1:
              _context33.n = 2;
              return this.every("*/5 * * * *", "aggregate-vote-counts", {});
            case 2:
              _context33.n = 3;
              return this.every("0 * * * *", "detect-fraud-patterns", {});
            case 3:
              _context33.n = 4;
              return this.every("0 0 * * *", "generate-daily-analytics");
            case 4:
              _context33.n = 5;
              return this.every("0 3 * * 0", "cleanup-old-jobs");
            case 5:
              _context33.n = 6;
              return this.every("0 4 * * *", "cleanup-expired-tokens");
            case 6:
              _context33.n = 7;
              return this.every("0 10 * * *", "send-voting-deadline-reminders");
            case 7:
              _context33.n = 8;
              return this.every("0 * * * *", "detect-suspicious-activities", {
                thresholdMinutes: 5,
                threshold: 10
              });
            case 8:
              _context33.n = 9;
              return this.every("0 2 1 * *", "archive-old-activities", {
                retentionMonths: 24
              });
            case 9:
              console.log("✅ Recurring tasks configured");
              _context33.n = 11;
              break;
            case 10:
              _context33.p = 10;
              _t38 = _context33.v;
              console.error("❌ Failed to setup recurring tasks:", _t38);
            case 11:
              return _context33.a(2);
          }
        }, _callee33, this, [[0, 10]]);
      }));
      function setupRecurringTasks() {
        return _setupRecurringTasks.apply(this, arguments);
      }
      return setupRecurringTasks;
    }()
    /**
     * Get Agenda health status
     * @returns {Object}
     */
    )
  }, {
    key: "getStatus",
    value: function getStatus() {
      return {
        isReady: this.isReady,
        uptime: this.startTime ? Date.now() - this.startTime.getTime() : 0,
        startTime: this.startTime
      };
    }

    /**
     * Graceful shutdown
     */
  }, {
    key: "stop",
    value: (function () {
      var _stop = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34() {
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              if (!this.agenda) {
                _context34.n = 2;
                break;
              }
              console.log("🛑 Stopping Agenda.js...");
              _context34.n = 1;
              return this.agenda.stop();
            case 1:
              this.isReady = false;
              console.log("✅ Agenda.js stopped gracefully");
            case 2:
              return _context34.a(2);
          }
        }, _callee34, this);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }())
  }]);
}(); // Export singleton instance
var agendaManager = exports.agendaManager = new AgendaManager();
var _default = exports["default"] = agendaManager;