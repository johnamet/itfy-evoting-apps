"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notificationService = exports["default"] = void 0;
var _notificationRepository = _interopRequireDefault(require("../modules/notification/notification.repository.js"));
var _emailService = _interopRequireDefault(require("./email.service.js"));
var _notificationConstants = require("../utils/constants/notification.constants.js");
var _emailConstants = require("../utils/constants/email.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Notification Service
 * Handles notification creation and multi-channel delivery for ITFY E-Voting platform
 * Integrates with:
 * - NotificationRepository for database operations
 * - EmailService for email delivery
 * - Future: SMS, Push notifications, WebSocket
 */
var NotificationService = /*#__PURE__*/function () {
  function NotificationService() {
    _classCallCheck(this, NotificationService);
    this.repository = _notificationRepository["default"];
    this.emailService = _emailService["default"];
  }

  // ========================================
  // CORE NOTIFICATION METHODS
  // ========================================

  /**
   * Create and send notification
   * @param {Object} data - Notification data
   * @returns {Promise<Object>}
   */
  return _createClass(NotificationService, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
        var notification, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this.repository.create({
                user: data.userId,
                type: data.type,
                title: data.title,
                message: data.message,
                channel: data.channel || _notificationConstants.NOTIFICATION_CHANNEL.IN_APP,
                priority: data.priority || _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                status: _notificationConstants.NOTIFICATION_STATUS.PENDING,
                event: data.eventId,
                candidate: data.candidateId,
                category: data.categoryId,
                vote: data.voteId,
                payment: data.paymentId,
                form: data.formId,
                submission: data.submissionId,
                action_url: data.actionUrl,
                action_text: data.actionText,
                metadata: data.metadata,
                batch_id: data.batchId
              });
            case 1:
              notification = _context.v;
              if (!(data.channel === _notificationConstants.NOTIFICATION_CHANNEL.EMAIL && data.emailData)) {
                _context.n = 2;
                break;
              }
              _context.n = 2;
              return this.sendEmailNotification(notification, data.emailData);
            case 2:
              return _context.a(2, notification);
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error("❌ Notification creation failed:", _t);
              throw new Error("Notification creation failed: ".concat(_t.message));
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[0, 3]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Send email notification
     * @param {Object} notification - Notification object
     * @param {Object} emailData - Email-specific data (to, template, context)
     * @returns {Promise<Object>}
     * @private
     */
  }, {
    key: "sendEmailNotification",
    value: (function () {
      var _sendEmailNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(notification, emailData) {
        var result, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.emailService.sendTemplateEmail({
                to: emailData.to,
                subject: emailData.subject,
                template: emailData.template,
                context: emailData.context
              });
            case 1:
              result = _context2.v;
              if (!result.success) {
                _context2.n = 3;
                break;
              }
              _context2.n = 2;
              return this.repository.markAsSent(notification._id, result.messageId);
            case 2:
              _context2.n = 4;
              break;
            case 3:
              _context2.n = 4;
              return this.repository.markAsFailed(notification._id, result.error);
            case 4:
              return _context2.a(2, result);
            case 5:
              _context2.p = 5;
              _t2 = _context2.v;
              console.error("❌ Email notification send failed:", _t2);
              _context2.n = 6;
              return this.repository.markAsFailed(notification._id, _t2.message);
            case 6:
              throw _t2;
            case 7:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 5]]);
      }));
      function sendEmailNotification(_x2, _x3) {
        return _sendEmailNotification.apply(this, arguments);
      }
      return sendEmailNotification;
    }() // ========================================
    // VOTE-RELATED NOTIFICATIONS
    // ========================================
    /**
     * Send vote confirmation notification
     * @param {Object} data - { userId, userEmail, userName, eventName, candidateName, categoryName, voteCount, voteCode, amount, paymentId, voteId }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendVoteConfirmation",
    value: function () {
      var _sendVoteConfirmation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.VOTE_CAST,
                title: "Vote Confirmed! ✓",
                message: "Your ".concat(data.voteCount, " vote(s) for ").concat(data.candidateName, " in ").concat(data.eventName, " have been confirmed."),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.HIGH,
                eventId: data.eventId,
                candidateId: data.candidateId,
                voteId: data.voteId,
                paymentId: data.paymentId,
                actionUrl: "/events/".concat(data.eventId),
                actionText: "View Event",
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.VOTE_CONFIRMATION,
                  context: {
                    name: data.userName,
                    eventName: data.eventName,
                    candidateName: data.candidateName,
                    categoryName: data.categoryName,
                    voteCount: data.voteCount,
                    voteCode: data.voteCode,
                    amount: data.amount,
                    currency: data.currency || "NGN",
                    paymentDate: new Date()
                  }
                }
              });
            case 1:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      function sendVoteConfirmation(_x4) {
        return _sendVoteConfirmation.apply(this, arguments);
      }
      return sendVoteConfirmation;
    }()
    /**
     * Send voting started notification
     * @param {Object} data - { userId, userEmail, userName, eventId, eventName, eventDescription, startDate, endDate }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendVotingStarted",
    value: (function () {
      var _sendVotingStarted = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(data) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.VOTING_STARTED,
                title: "Voting Has Started! 🗳️",
                message: "Voting has started for ".concat(data.eventName, ". Cast your vote now!"),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                eventId: data.eventId,
                actionUrl: "/events/".concat(data.eventId),
                actionText: "Vote Now",
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.VOTING_STARTED,
                  context: {
                    name: data.userName,
                    eventName: data.eventName,
                    eventDescription: data.eventDescription,
                    eventUrl: "".concat(process.env.APP_URL, "/events/").concat(data.eventId),
                    startDate: data.startDate,
                    endDate: data.endDate
                  }
                }
              });
            case 1:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, this);
      }));
      function sendVotingStarted(_x5) {
        return _sendVotingStarted.apply(this, arguments);
      }
      return sendVotingStarted;
    }()
    /**
     * Send voting ending soon notification
     * @param {Object} data - { userId, userEmail, userName, eventId, eventName, endDate, hoursRemaining }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendVotingEndingSoon",
    value: (function () {
      var _sendVotingEndingSoon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(data) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.VOTING_ENDING_SOON,
                title: "Voting Ends Soon! ⏰",
                message: "Only ".concat(data.hoursRemaining, " hours left to vote in ").concat(data.eventName, ". Don't miss out!"),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.HIGH,
                eventId: data.eventId,
                actionUrl: "/events/".concat(data.eventId),
                actionText: "Vote Now",
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.VOTING_ENDING_SOON,
                  context: {
                    name: data.userName,
                    eventName: data.eventName,
                    eventUrl: "".concat(process.env.APP_URL, "/events/").concat(data.eventId),
                    endDate: data.endDate,
                    hoursRemaining: data.hoursRemaining
                  }
                }
              });
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      function sendVotingEndingSoon(_x6) {
        return _sendVotingEndingSoon.apply(this, arguments);
      }
      return sendVotingEndingSoon;
    }()
    /**
     * Send results published notification
     * @param {Object} data - { userId, userEmail, userName, eventId, eventName, winners }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendResultsPublished",
    value: (function () {
      var _sendResultsPublished = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(data) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.RESULTS_PUBLISHED,
                title: "Results Are Out! 🏆",
                message: "Results for ".concat(data.eventName, " have been published. Check out the winners!"),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                eventId: data.eventId,
                actionUrl: "/events/".concat(data.eventId, "/results"),
                actionText: "View Results",
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.RESULTS_PUBLISHED,
                  context: {
                    name: data.userName,
                    eventName: data.eventName,
                    resultsUrl: "".concat(process.env.APP_URL, "/events/").concat(data.eventId, "/results"),
                    winners: data.winners
                  }
                }
              });
            case 1:
              return _context6.a(2, _context6.v);
          }
        }, _callee6, this);
      }));
      function sendResultsPublished(_x7) {
        return _sendResultsPublished.apply(this, arguments);
      }
      return sendResultsPublished;
    }() // ========================================
    // PAYMENT-RELATED NOTIFICATIONS
    // ========================================
    /**
     * Send payment success notification
     * @param {Object} data - { userId, userEmail, userName, amount, currency, reference, paymentId, description }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendPaymentSuccess",
    value: function () {
      var _sendPaymentSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(data) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.PAYMENT_SUCCESS,
                title: "Payment Successful ✓",
                message: "Your payment of ".concat(data.currency, " ").concat(data.amount, " was successful."),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.HIGH,
                paymentId: data.paymentId,
                actionUrl: "/payments/".concat(data.paymentId),
                actionText: "View Receipt",
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.PAYMENT_SUCCESS,
                  context: {
                    name: data.userName,
                    amount: data.amount,
                    currency: data.currency,
                    reference: data.reference,
                    paymentDate: new Date(),
                    description: data.description
                  }
                }
              });
            case 1:
              return _context7.a(2, _context7.v);
          }
        }, _callee7, this);
      }));
      function sendPaymentSuccess(_x8) {
        return _sendPaymentSuccess.apply(this, arguments);
      }
      return sendPaymentSuccess;
    }()
    /**
     * Send refund processed notification
     * @param {Object} data - { userId, userEmail, userName, amount, currency, reason, refundDate, paymentId }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendRefundProcessed",
    value: (function () {
      var _sendRefundProcessed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(data) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.REFUND_PROCESSED,
                title: "Refund Processed ✓",
                message: "Your refund of ".concat(data.currency, " ").concat(data.amount, " has been processed."),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                paymentId: data.paymentId,
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.REFUND_PROCESSED,
                  context: {
                    name: data.userName,
                    amount: data.amount,
                    currency: data.currency,
                    reason: data.reason,
                    refundDate: data.refundDate || new Date()
                  }
                }
              });
            case 1:
              return _context8.a(2, _context8.v);
          }
        }, _callee8, this);
      }));
      function sendRefundProcessed(_x9) {
        return _sendRefundProcessed.apply(this, arguments);
      }
      return sendRefundProcessed;
    }() // ========================================
    // NOMINATION/FORM NOTIFICATIONS
    // ========================================
    /**
     * Send nomination confirmation notification
     * @param {Object} data - { userId, userEmail, userName, nomineeName, categoryName, eventName, eventId, submissionId }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendNominationConfirmation",
    value: function () {
      var _sendNominationConfirmation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(data) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.FORM_SUBMITTED,
                title: "Nomination Received ✓",
                message: "Your nomination for ".concat(data.nomineeName, " in ").concat(data.categoryName, " has been received."),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                eventId: data.eventId,
                submissionId: data.submissionId,
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.NOMINATION_CONFIRMATION,
                  context: {
                    name: data.userName,
                    nomineeName: data.nomineeName,
                    categoryName: data.categoryName,
                    eventName: data.eventName,
                    submissionDate: new Date()
                  }
                }
              });
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      function sendNominationConfirmation(_x0) {
        return _sendNominationConfirmation.apply(this, arguments);
      }
      return sendNominationConfirmation;
    }()
    /**
     * Send nomination approved notification
     * @param {Object} data - { userId, userEmail, userName, nomineeName, categoryName, eventName, eventId, candidateId }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendNominationApproved",
    value: (function () {
      var _sendNominationApproved = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(data) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              _context0.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.NOMINATION_APPROVED,
                title: "Nomination Approved! 🎉",
                message: "Your nomination for ".concat(data.nomineeName, " in ").concat(data.categoryName, " has been approved."),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                eventId: data.eventId,
                candidateId: data.candidateId,
                actionUrl: "/events/".concat(data.eventId, "/candidates/").concat(data.candidateId),
                actionText: "View Candidate",
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.NOMINATION_APPROVED,
                  context: {
                    name: data.userName,
                    nomineeName: data.nomineeName,
                    categoryName: data.categoryName,
                    eventName: data.eventName,
                    approvalDate: new Date()
                  }
                }
              });
            case 1:
              return _context0.a(2, _context0.v);
          }
        }, _callee0, this);
      }));
      function sendNominationApproved(_x1) {
        return _sendNominationApproved.apply(this, arguments);
      }
      return sendNominationApproved;
    }()
    /**
     * Send nomination rejected notification
     * @param {Object} data - { userId, userEmail, userName, nomineeName, categoryName, eventName, reason }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendNominationRejected",
    value: (function () {
      var _sendNominationRejected = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(data) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.NOMINATION_REJECTED,
                title: "Nomination Update",
                message: "Your nomination for ".concat(data.nomineeName, " could not be approved."),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.NOMINATION_REJECTED,
                  context: {
                    name: data.userName,
                    nomineeName: data.nomineeName,
                    categoryName: data.categoryName,
                    eventName: data.eventName,
                    reason: data.reason
                  }
                }
              });
            case 1:
              return _context1.a(2, _context1.v);
          }
        }, _callee1, this);
      }));
      function sendNominationRejected(_x10) {
        return _sendNominationRejected.apply(this, arguments);
      }
      return sendNominationRejected;
    }() // ========================================
    // SECURITY NOTIFICATIONS
    // ========================================
    /**
     * Send login alert notification
     * @param {Object} data - { userId, userEmail, userName, ipAddress, location, device }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendLoginAlert",
    value: function () {
      var _sendLoginAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(data) {
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              _context10.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.LOGIN_ALERT,
                title: "New Login Detected 🔐",
                message: "A new login was detected from ".concat(data.location || data.ipAddress),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.HIGH,
                metadata: {
                  ipAddress: data.ipAddress,
                  location: data.location,
                  device: data.device
                },
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.LOGIN_ALERT,
                  context: {
                    name: data.userName,
                    ipAddress: data.ipAddress,
                    location: data.location,
                    device: data.device,
                    loginTime: new Date()
                  }
                }
              });
            case 1:
              return _context10.a(2, _context10.v);
          }
        }, _callee10, this);
      }));
      function sendLoginAlert(_x11) {
        return _sendLoginAlert.apply(this, arguments);
      }
      return sendLoginAlert;
    }()
    /**
     * Send suspicious activity alert
     * @param {Object} data - { userId, userEmail, userName, activityType, details }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendSuspiciousActivityAlert",
    value: (function () {
      var _sendSuspiciousActivityAlert = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(data) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _context11.n = 1;
              return this.create({
                userId: data.userId,
                type: _notificationConstants.NOTIFICATION_TYPE.SUSPICIOUS_ACTIVITY,
                title: "Suspicious Activity Detected ⚠️",
                message: "Suspicious activity detected: ".concat(data.activityType),
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: _notificationConstants.NOTIFICATION_PRIORITY.URGENT,
                metadata: {
                  activityType: data.activityType,
                  details: data.details
                },
                emailData: {
                  to: data.userEmail,
                  template: _emailConstants.EMAIL_TEMPLATES.SUSPICIOUS_ACTIVITY,
                  context: {
                    name: data.userName,
                    activityType: data.activityType,
                    details: data.details,
                    detectedAt: new Date()
                  }
                }
              });
            case 1:
              return _context11.a(2, _context11.v);
          }
        }, _callee11, this);
      }));
      function sendSuspiciousActivityAlert(_x12) {
        return _sendSuspiciousActivityAlert.apply(this, arguments);
      }
      return sendSuspiciousActivityAlert;
    }() // ========================================
    // BULK NOTIFICATIONS
    // ========================================
    /**
     * Send bulk notifications to multiple users
     * @param {Array} users - Array of user objects { userId, userEmail, userName }
     * @param {Object} data - { type, title, message, template, context, eventId, priority }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendBulkNotifications",
    value: function () {
      var _sendBulkNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(users, data) {
        var batchId, results, _iterator, _step, user, notification, _t3, _t4, _t5;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              batchId = "batch_".concat(Date.now());
              results = {
                created: [],
                failed: []
              };
              _iterator = _createForOfIteratorHelper(users);
              _context12.p = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context12.n = 8;
                break;
              }
              user = _step.value;
              _context12.p = 3;
              _context12.n = 4;
              return this.create({
                userId: user.userId,
                type: data.type,
                title: data.title,
                message: data.message,
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                priority: data.priority || _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
                eventId: data.eventId,
                batchId: batchId,
                emailData: {
                  to: user.userEmail,
                  template: data.template,
                  context: _objectSpread(_objectSpread({}, data.context), {}, {
                    name: user.userName
                  })
                }
              });
            case 4:
              notification = _context12.v;
              results.created.push(notification);
              _context12.n = 6;
              break;
            case 5:
              _context12.p = 5;
              _t3 = _context12.v;
              results.failed.push({
                userId: user.userId,
                error: _t3.message
              });
            case 6:
              _context12.n = 7;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 50);
              });
            case 7:
              _context12.n = 2;
              break;
            case 8:
              _context12.n = 10;
              break;
            case 9:
              _context12.p = 9;
              _t4 = _context12.v;
              _iterator.e(_t4);
            case 10:
              _context12.p = 10;
              _iterator.f();
              return _context12.f(10);
            case 11:
              console.log("\uD83D\uDCCA Bulk notifications: ".concat(results.created.length, " created, ").concat(results.failed.length, " failed"));
              return _context12.a(2, {
                success: true,
                batchId: batchId,
                created: results.created.length,
                failed: results.failed.length,
                details: results
              });
            case 12:
              _context12.p = 12;
              _t5 = _context12.v;
              console.error("❌ Bulk notification failed:", _t5);
              throw new Error("Bulk notification failed: ".concat(_t5.message));
            case 13:
              return _context12.a(2);
          }
        }, _callee12, this, [[3, 5], [1, 9, 10, 11], [0, 12]]);
      }));
      function sendBulkNotifications(_x13, _x14) {
        return _sendBulkNotifications.apply(this, arguments);
      }
      return sendBulkNotifications;
    }() // ========================================
    // NOTIFICATION RETRIEVAL
    // ========================================
    /**
     * Get user notifications
     * @param {string} userId - User ID
     * @param {number} page - Page number
     * @param {number} limit - Limit
     * @returns {Promise<Object>}
     */
  }, {
    key: "getUserNotifications",
    value: function () {
      var _getUserNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(userId) {
        var page,
          limit,
          _args13 = arguments;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
              limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 20;
              _context13.n = 1;
              return this.repository.findByUser(userId, page, limit);
            case 1:
              return _context13.a(2, _context13.v);
          }
        }, _callee13, this);
      }));
      function getUserNotifications(_x15) {
        return _getUserNotifications.apply(this, arguments);
      }
      return getUserNotifications;
    }()
    /**
     * Get unread notifications
     * @param {string} userId - User ID
     * @param {number} limit - Limit
     * @returns {Promise<Array>}
     */
  }, {
    key: "getUnreadNotifications",
    value: (function () {
      var _getUnreadNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(userId) {
        var limit,
          _args14 = arguments;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              limit = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 20;
              _context14.n = 1;
              return this.repository.findUnread(userId, limit);
            case 1:
              return _context14.a(2, _context14.v);
          }
        }, _callee14, this);
      }));
      function getUnreadNotifications(_x16) {
        return _getUnreadNotifications.apply(this, arguments);
      }
      return getUnreadNotifications;
    }()
    /**
     * Get unread count
     * @param {string} userId - User ID
     * @returns {Promise<number>}
     */
    )
  }, {
    key: "getUnreadCount",
    value: (function () {
      var _getUnreadCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(userId) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              _context15.n = 1;
              return this.repository.getUnreadCount(userId);
            case 1:
              return _context15.a(2, _context15.v);
          }
        }, _callee15, this);
      }));
      function getUnreadCount(_x17) {
        return _getUnreadCount.apply(this, arguments);
      }
      return getUnreadCount;
    }()
    /**
     * Mark notification as read
     * @param {string} notificationId - Notification ID
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "markAsRead",
    value: (function () {
      var _markAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(notificationId) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return this.repository.markAsRead(notificationId);
            case 1:
              return _context16.a(2, _context16.v);
          }
        }, _callee16, this);
      }));
      function markAsRead(_x18) {
        return _markAsRead.apply(this, arguments);
      }
      return markAsRead;
    }()
    /**
     * Mark all notifications as read
     * @param {string} userId - User ID
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "markAllAsRead",
    value: (function () {
      var _markAllAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(userId) {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              _context17.n = 1;
              return this.repository.markAllAsRead(userId);
            case 1:
              return _context17.a(2, _context17.v);
          }
        }, _callee17, this);
      }));
      function markAllAsRead(_x19) {
        return _markAllAsRead.apply(this, arguments);
      }
      return markAllAsRead;
    }()
    /**
     * Delete notification
     * @param {string} notificationId - Notification ID
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "deleteNotification",
    value: (function () {
      var _deleteNotification = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(notificationId) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              _context18.n = 1;
              return this.repository["delete"](notificationId);
            case 1:
              return _context18.a(2, _context18.v);
          }
        }, _callee18, this);
      }));
      function deleteNotification(_x20) {
        return _deleteNotification.apply(this, arguments);
      }
      return deleteNotification;
    }() // ========================================
    // CLEANUP & MAINTENANCE
    // ========================================
    /**
     * Clean up old notifications
     * @param {number} daysOld - Days threshold
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "cleanupOldNotifications",
    value: function () {
      var _cleanupOldNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var daysOld,
          _args19 = arguments;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              daysOld = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : 90;
              _context19.n = 1;
              return this.repository.deleteOld(daysOld);
            case 1:
              return _context19.a(2, _context19.v);
          }
        }, _callee19, this);
      }));
      function cleanupOldNotifications() {
        return _cleanupOldNotifications.apply(this, arguments);
      }
      return cleanupOldNotifications;
    }()
    /**
     * Process pending email notifications
     * @param {number} limit - Limit
     * @returns {Promise<Object>}
     */
  }, {
    key: "processPendingEmails",
    value: (function () {
      var _processPendingEmails = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
        var limit,
          pending,
          results,
          _iterator2,
          _step2,
          notification,
          emailData,
          _args20 = arguments,
          _t6,
          _t7,
          _t8;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              limit = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : 100;
              _context20.p = 1;
              _context20.n = 2;
              return this.repository.findPendingForDelivery(_notificationConstants.NOTIFICATION_CHANNEL.EMAIL, limit);
            case 2:
              pending = _context20.v;
              results = {
                sent: [],
                failed: []
              };
              _iterator2 = _createForOfIteratorHelper(pending);
              _context20.p = 3;
              _iterator2.s();
            case 4:
              if ((_step2 = _iterator2.n()).done) {
                _context20.n = 9;
                break;
              }
              notification = _step2.value;
              _context20.p = 5;
              // Reconstruct email data from notification
              emailData = {
                to: notification.email_to,
                subject: notification.email_subject,
                template: notification.email_template_id,
                context: notification.metadata
              };
              _context20.n = 6;
              return this.sendEmailNotification(notification, emailData);
            case 6:
              results.sent.push(notification._id);
              _context20.n = 8;
              break;
            case 7:
              _context20.p = 7;
              _t6 = _context20.v;
              results.failed.push({
                notificationId: notification._id,
                error: _t6.message
              });
            case 8:
              _context20.n = 4;
              break;
            case 9:
              _context20.n = 11;
              break;
            case 10:
              _context20.p = 10;
              _t7 = _context20.v;
              _iterator2.e(_t7);
            case 11:
              _context20.p = 11;
              _iterator2.f();
              return _context20.f(11);
            case 12:
              return _context20.a(2, {
                success: true,
                sent: results.sent.length,
                failed: results.failed.length
              });
            case 13:
              _context20.p = 13;
              _t8 = _context20.v;
              console.error("❌ Process pending emails failed:", _t8);
              throw new Error("Process pending emails failed: ".concat(_t8.message));
            case 14:
              return _context20.a(2);
          }
        }, _callee20, this, [[5, 7], [3, 10, 11, 12], [1, 13]]);
      }));
      function processPendingEmails() {
        return _processPendingEmails.apply(this, arguments);
      }
      return processPendingEmails;
    }())
  }]);
}(); // Export singleton instance
var notificationService = exports.notificationService = new NotificationService();
var _default = exports["default"] = notificationService;