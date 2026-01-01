"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailService = exports["default"] = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _path = _interopRequireDefault(require("path"));
var _promises = _interopRequireDefault(require("fs/promises"));
var _handlebars = _interopRequireDefault(require("handlebars"));
var _emailConstants = require("../utils/constants/email.constants.js");
var _notificationConstants = require("../utils/constants/notification.constants.js");
var _dotenv = require("dotenv");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-undef */ /**
 * Email Service
 * Handles email sending for ITFY E-Voting platform using Nodemailer with:
 * - SMTP configuration (Gmail, SendGrid, AWS SES)
 * - HTML email templates (Handlebars)
 * - Integration with notification system
 * - Email verification, password reset, vote confirmations, event notifications
 */
(0, _dotenv.configDotenv)(); // Load .env variables
var EmailService = /*#__PURE__*/function () {
  function EmailService() {
    _classCallCheck(this, EmailService);
    this.transporter = null;
    this.from = process.env.EMAIL_FROM || "ITFY E-Voting <noreply@itfy-evoting.com>";
    this.templatesDir = _path["default"].join(process.cwd(), "src", "templates", "emails");
    this.isReady = false;

    // Register Handlebars helpers
    this.registerHandlebarsHelpers();

    // Initialize transporter
    this.initialize();
  }

  /**
   * Register custom Handlebars helpers
   * @private
   */
  return _createClass(EmailService, [{
    key: "registerHandlebarsHelpers",
    value: function registerHandlebarsHelpers() {
      // Equality helper for comparisons
      _handlebars["default"].registerHelper("eq", function (a, b) {
        return a === b;
      });

      // Not equal helper
      _handlebars["default"].registerHelper("ne", function (a, b) {
        return a !== b;
      });

      // Greater than helper
      _handlebars["default"].registerHelper("gt", function (a, b) {
        return a > b;
      });

      // Less than helper
      _handlebars["default"].registerHelper("lt", function (a, b) {
        return a < b;
      });

      // Logical OR helper
      _handlebars["default"].registerHelper("or", function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      });

      // Logical AND helper
      _handlebars["default"].registerHelper("and", function () {
        return Array.prototype.slice.call(arguments, 0, -1).every(Boolean);
      });

      // Format date helper
      _handlebars["default"].registerHelper("formatDate", function (date) {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      });

      // Format date and time helper
      _handlebars["default"].registerHelper("formatDateTime", function (date) {
        if (!date) return "";
        return new Date(date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      });

      // Format currency helper
      _handlebars["default"].registerHelper("formatCurrency", function (amount) {
        var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "NGN";
        if (!amount && amount !== 0) return "";
        return new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: currency
        }).format(amount);
      });

      // Format number helper
      _handlebars["default"].registerHelper("formatNumber", function (num) {
        if (!num && num !== 0) return "";
        return new Intl.NumberFormat("en-US").format(num);
      });

      // Capitalize helper
      _handlebars["default"].registerHelper("capitalize", function (str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
      });

      // Uppercase helper
      _handlebars["default"].registerHelper("uppercase", function (str) {
        if (!str) return "";
        return str.toUpperCase();
      });

      // Lowercase helper
      _handlebars["default"].registerHelper("lowercase", function (str) {
        if (!str) return "";
        return str.toLowerCase();
      });

      // Truncate helper
      _handlebars["default"].registerHelper("truncate", function (str) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        if (!str) return "";
        return str.length > length ? str.substring(0, length) + "..." : str;
      });

      // Default value helper
      _handlebars["default"].registerHelper("default", function (value, defaultValue) {
        return value || defaultValue;
      });
    }

    /**
     * Initialize email transporter
     * @private
     */
  }, {
    key: "initialize",
    value: (function () {
      var _initialize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var emailProvider, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              emailProvider = process.env.EMAIL_PROVIDER || "gmail";
              console.log("\uD83D\uDCE7 Initializing email service with provider: ".concat(emailProvider));
              _t = emailProvider.toLowerCase();
              _context.n = _t === "gmail" ? 1 : _t === "sendgrid" ? 2 : _t === "ses" ? 3 : _t === "smtp" ? 4 : 4;
              break;
            case 1:
              this.transporter = this.createGmailTransporter();
              return _context.a(3, 5);
            case 2:
              this.transporter = this.createSendGridTransporter();
              return _context.a(3, 5);
            case 3:
              this.transporter = this.createSESTransporter();
              return _context.a(3, 5);
            case 4:
              this.transporter = this.createSMTPTransporter();
            case 5:
              _context.n = 6;
              return this.transporter.verify();
            case 6:
              this.isReady = true;
              console.log("✅ Email service initialized successfully");
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t2 = _context.v;
              console.error("❌ Email service initialization failed:", _t2.message);
              this.isReady = false;

              // Fallback to console logging in development
              if (process.env.NODE_ENV !== "production") {
                console.warn("⚠️  Using console email preview in development");
                this.transporter = this.createTestTransporter();
                this.isReady = true;
              }
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[0, 7]]);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }() // ========================================
    // TRANSPORTER CONFIGURATIONS
    // ========================================
    /**
     * Create Gmail transporter
     * Requires: EMAIL_USER, EMAIL_PASSWORD (app password)
     */
    )
  }, {
    key: "createGmailTransporter",
    value: function createGmailTransporter() {
      console.log("Using Gmail transporter for ".concat(process.env.EMAIL_USER));
      return _nodemailer["default"].createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }

    /**
     * Create SendGrid transporter
     * Requires: SENDGRID_API_KEY
     */
  }, {
    key: "createSendGridTransporter",
    value: function createSendGridTransporter() {
      return _nodemailer["default"].createTransport({
        host: "smtp.sendgrid.net",
        port: 587,
        secure: false,
        auth: {
          user: "apikey",
          pass: process.env.SENDGRID_API_KEY
        }
      });
    }

    /**
     * Create AWS SES transporter
     * Requires: AWS_SES_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
     */
  }, {
    key: "createSESTransporter",
    value: function createSESTransporter() {
      return _nodemailer["default"].createTransport({
        host: "email.".concat(process.env.AWS_SES_REGION || "us-east-1", ".amazonaws.com"),
        port: 587,
        secure: false,
        auth: {
          user: process.env.AWS_ACCESS_KEY_ID,
          pass: process.env.AWS_SECRET_ACCESS_KEY
        }
      });
    }

    /**
     * Create generic SMTP transporter
     * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
     */
  }, {
    key: "createSMTPTransporter",
    value: function createSMTPTransporter() {
      return _nodemailer["default"].createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });
    }

    /**
     * Create test transporter (logs to console)
     * Used in development when SMTP is not configured
     */
  }, {
    key: "createTestTransporter",
    value: function createTestTransporter() {
      return {
        sendMail: function () {
          var _sendMail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(mailOptions) {
            var _mailOptions$text;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  console.log("\n╔════════════════════════════════════════╗");
                  console.log("║       📧 EMAIL PREVIEW (DEV MODE)     ║");
                  console.log("╠════════════════════════════════════════╣");
                  console.log("  To:", mailOptions.to);
                  console.log("  Subject:", mailOptions.subject);
                  console.log("  Text:", ((_mailOptions$text = mailOptions.text) === null || _mailOptions$text === void 0 ? void 0 : _mailOptions$text.substring(0, 150)) + "...");
                  console.log("╚════════════════════════════════════════╝\n");
                  return _context2.a(2, {
                    messageId: "test-" + Date.now()
                  });
              }
            }, _callee2);
          }));
          function sendMail(_x) {
            return _sendMail.apply(this, arguments);
          }
          return sendMail;
        }(),
        verify: function () {
          var _verify = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  return _context3.a(2, true);
              }
            }, _callee3);
          }));
          function verify() {
            return _verify.apply(this, arguments);
          }
          return verify;
        }()
      };
    }

    // ========================================
    // CORE EMAIL SENDING
    // ========================================

    /**
     * Send email
     * @param {Object} options - { to, subject, text, html, attachments }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendEmail",
    value: function () {
      var _sendEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(options) {
        var mailOptions, info, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              if (!(!this.isReady && process.env.NODE_ENV === "production")) {
                _context4.n = 1;
                break;
              }
              throw new Error("Email service not ready");
            case 1:
              mailOptions = {
                from: options.from || this.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                attachments: options.attachments
              };
              _context4.n = 2;
              return this.transporter.sendMail(mailOptions);
            case 2:
              info = _context4.v;
              console.log("\u2705 Email sent: ".concat(info.messageId, " to ").concat(options.to));
              return _context4.a(2, {
                success: true,
                messageId: info.messageId,
                response: info.response
              });
            case 3:
              _context4.p = 3;
              _t3 = _context4.v;
              console.error("❌ Email send failed:", _t3);
              return _context4.a(2, {
                success: false,
                error: _t3.message
              });
          }
        }, _callee4, this, [[0, 3]]);
      }));
      function sendEmail(_x2) {
        return _sendEmail.apply(this, arguments);
      }
      return sendEmail;
    }()
    /**
     * Send email using template
     * @param {Object} options - { to, subject, template, context }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendTemplateEmail",
    value: (function () {
      var _sendTemplateEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(options) {
        var to, subject, template, context, html, text, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              console.log("\uD83D\uDCE7 Preparing to send template email: ".concat(options.template, " to ").concat(options.to));
              to = options.to, subject = options.subject, template = options.template, context = options.context; // Load and compile template
              _context5.n = 1;
              return this.renderTemplate(template, context);
            case 1:
              html = _context5.v;
              text = this.htmlToText(html);
              _context5.n = 2;
              return this.sendEmail({
                to: to,
                subject: subject || _emailConstants.EMAIL_SUBJECTS[template] || "ITFY E-Voting Notification",
                html: html,
                text: text
              });
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t4 = _context5.v;
              console.error("❌ Template email send failed:", _t4);
              return _context5.a(2, {
                success: false,
                error: _t4.message
              });
          }
        }, _callee5, this, [[0, 3]]);
      }));
      function sendTemplateEmail(_x3) {
        return _sendTemplateEmail.apply(this, arguments);
      }
      return sendTemplateEmail;
    }() // ========================================
    // EMAIL TEMPLATES
    // ========================================
    /**
     * Load and render email template
     * @param {string} templateName - Template file name (without .hbs)
     * @param {Object} context - Template variables
     * @returns {Promise<string>} - Rendered HTML
     */
    )
  }, {
    key: "renderTemplate",
    value: function () {
      var _renderTemplate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(templateName) {
        var context,
          templatePath,
          templateSource,
          template,
          fullContext,
          _args6 = arguments,
          _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              context = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.p = 1;
              templatePath = _path["default"].join(this.templatesDir, "".concat(templateName, ".hbs"));
              _context6.n = 2;
              return _promises["default"].readFile(templatePath, "utf-8");
            case 2:
              templateSource = _context6.v;
              template = _handlebars["default"].compile(templateSource); // Add common context variables
              fullContext = _objectSpread(_objectSpread({}, context), {}, {
                appName: "ITFY E-Voting",
                appUrl: process.env.APP_URL || "http://localhost:3000",
                currentYear: new Date().getFullYear(),
                supportEmail: process.env.SUPPORT_EMAIL || "support@itfy-evoting.com",
                logoUrl: "".concat(process.env.APP_URL || "http://localhost:3000", "/logo.png"),
                primaryColor: "#4F46E5",
                secondaryColor: "#10B981"
              });
              return _context6.a(2, template(fullContext));
            case 3:
              _context6.p = 3;
              _t5 = _context6.v;
              console.error("\u274C Template render failed for ".concat(templateName, ":"), _t5.message);
              // Return basic fallback HTML
              return _context6.a(2, this.getFallbackTemplate(context));
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function renderTemplate(_x4) {
        return _renderTemplate.apply(this, arguments);
      }
      return renderTemplate;
    }()
    /**
     * Fallback template when template file is missing
     * @param {Object} context
     * @returns {string}
     * @private
     */
  }, {
    key: "getFallbackTemplate",
    value: function getFallbackTemplate(context) {
      return "\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>ITFY E-Voting</title>\n      </head>\n      <body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;\">\n        <div style=\"max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);\">\n          <div style=\"background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 30px; text-align: center;\">\n            <h1 style=\"color: white; margin: 0; font-size: 24px;\">ITFY E-Voting</h1>\n          </div>\n          <div style=\"padding: 30px;\">\n            ".concat(context.message || context.title || "", "\n            ").concat(context.content || "", "\n          </div>\n          <div style=\"background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;\">\n            <p style=\"color: #666; font-size: 12px; margin: 0;\">\n              \xA9 ").concat(new Date().getFullYear(), " ITFY E-Voting. All rights reserved.\n            </p>\n            <p style=\"color: #999; font-size: 11px; margin: 10px 0 0;\">\n              Need help? Contact us at ").concat(process.env.SUPPORT_EMAIL || "support@itfy-evoting.com", "\n            </p>\n          </div>\n        </div>\n      </body>\n      </html>\n    ");
    }

    /**
     * Convert HTML to plain text
     * @param {string} html
     * @returns {string}
     * @private
     */
  }, {
    key: "htmlToText",
    value: function htmlToText(html) {
      return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    }

    // ========================================
    // AUTHENTICATION & ACCOUNT EMAILS
    // ========================================

    /**
     * Send welcome email
     * @param {Object} data - { to, name, email, verificationUrl }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendWelcomeEmail",
    value: function () {
      var _sendWelcomeEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(data) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.WELCOME,
                context: {
                  name: data.name,
                  email: data.to || data.email,
                  verificationUrl: data.verificationUrl
                }
              });
            case 1:
              return _context7.a(2, _context7.v);
          }
        }, _callee7, this);
      }));
      function sendWelcomeEmail(_x5) {
        return _sendWelcomeEmail.apply(this, arguments);
      }
      return sendWelcomeEmail;
    }()
    /**
     * Send email verification
     * @param {Object} data - { to, name, verificationUrl, verificationCode }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendVerificationEmail",
    value: (function () {
      var _sendVerificationEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(data) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.EMAIL_VERIFICATION,
                context: {
                  name: data.name,
                  verificationUrl: data.verificationUrl,
                  verificationCode: data.verificationCode
                }
              });
            case 1:
              return _context8.a(2, _context8.v);
          }
        }, _callee8, this);
      }));
      function sendVerificationEmail(_x6) {
        return _sendVerificationEmail.apply(this, arguments);
      }
      return sendVerificationEmail;
    }()
    /**
     * Send email verification (simplified signature for auth service)
     * @param {string} email - User email
     * @param {string} name - User name
     * @param {string} verificationUrl - Verification URL with token
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendEmailVerificationEmail",
    value: (function () {
      var _sendEmailVerificationEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(email, name, verificationUrl) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return this.sendVerificationEmail({
                to: email,
                name: name,
                verificationUrl: verificationUrl
              });
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      function sendEmailVerificationEmail(_x7, _x8, _x9) {
        return _sendEmailVerificationEmail.apply(this, arguments);
      }
      return sendEmailVerificationEmail;
    }()
    /**
     * Send password reset email
     * @param {string|Object} emailOrData - Email address or data object
     * @param {string} [name] - User name (if first param is email)
     * @param {string} [resetUrl] - Reset URL (if first param is email)
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendPasswordResetEmail",
    value: (function () {
      var _sendPasswordResetEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(emailOrData, name, resetUrl) {
        var data;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (!(_typeof(emailOrData) === 'object')) {
                _context0.n = 2;
                break;
              }
              data = emailOrData;
              _context0.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.PASSWORD_RESET,
                context: {
                  name: data.name,
                  resetUrl: data.resetUrl,
                  resetToken: data.resetToken,
                  expiresIn: data.expiresIn || "1 hour"
                }
              });
            case 1:
              return _context0.a(2, _context0.v);
            case 2:
              _context0.n = 3;
              return this.sendTemplateEmail({
                to: emailOrData,
                template: _emailConstants.EMAIL_TEMPLATES.PASSWORD_RESET,
                context: {
                  name: name,
                  resetUrl: resetUrl,
                  expiresIn: "1 hour"
                }
              });
            case 3:
              return _context0.a(2, _context0.v);
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this);
      }));
      function sendPasswordResetEmail(_x0, _x1, _x10) {
        return _sendPasswordResetEmail.apply(this, arguments);
      }
      return sendPasswordResetEmail;
    }()
    /**
     * Send password changed confirmation
     * @param {string|Object} emailOrData - Email address or data object
     * @param {string} [name] - User name (if first param is email)
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendPasswordChangedEmail",
    value: (function () {
      var _sendPasswordChangedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(emailOrData, name) {
        var data;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (!(_typeof(emailOrData) === 'object')) {
                _context1.n = 2;
                break;
              }
              data = emailOrData;
              _context1.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.PASSWORD_CHANGED,
                context: {
                  name: data.name,
                  changeDate: data.changeDate || new Date().toLocaleString(),
                  ipAddress: data.ipAddress
                }
              });
            case 1:
              return _context1.a(2, _context1.v);
            case 2:
              _context1.n = 3;
              return this.sendTemplateEmail({
                to: emailOrData,
                template: _emailConstants.EMAIL_TEMPLATES.PASSWORD_CHANGED,
                context: {
                  name: name,
                  changeDate: new Date().toLocaleString()
                }
              });
            case 3:
              return _context1.a(2, _context1.v);
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function sendPasswordChangedEmail(_x11, _x12) {
        return _sendPasswordChangedEmail.apply(this, arguments);
      }
      return sendPasswordChangedEmail;
    }()
    /**
     * Send account locked notification
     * @param {string|Object} emailOrData - Email address or data object
     * @param {string} [name] - User name (if first param is email)
     * @param {string|number} [duration] - Lock duration in minutes (if first param is email)
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendAccountLockedEmail",
    value: (function () {
      var _sendAccountLockedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(emailOrData, name, duration) {
        var data;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (!(_typeof(emailOrData) === 'object')) {
                _context10.n = 2;
                break;
              }
              data = emailOrData;
              _context10.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.ACCOUNT_LOCKED,
                context: {
                  name: data.name,
                  duration: data.duration || "15 minutes",
                  reason: data.reason || "Multiple failed login attempts"
                }
              });
            case 1:
              return _context10.a(2, _context10.v);
            case 2:
              _context10.n = 3;
              return this.sendTemplateEmail({
                to: emailOrData,
                template: _emailConstants.EMAIL_TEMPLATES.ACCOUNT_LOCKED,
                context: {
                  name: name,
                  duration: "".concat(duration, " minutes"),
                  reason: "Multiple failed login attempts"
                }
              });
            case 3:
              return _context10.a(2, _context10.v);
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this);
      }));
      function sendAccountLockedEmail(_x13, _x14, _x15) {
        return _sendAccountLockedEmail.apply(this, arguments);
      }
      return sendAccountLockedEmail;
    }() // ========================================
    // VOTE-RELATED EMAILS
    // ========================================
    /**
     * Send vote confirmation email
     * @param {Object} data - { to, name, eventName, candidateName, voteCount, voteCode, amount, paymentDate }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendVoteConfirmationEmail",
    value: function () {
      var _sendVoteConfirmationEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(data) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _context11.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.VOTE_CONFIRMATION,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  candidateName: data.candidateName,
                  categoryName: data.categoryName,
                  voteCount: data.voteCount || 1,
                  voteCode: data.voteCode,
                  amount: data.amount,
                  currency: data.currency || "NGN",
                  paymentDate: data.paymentDate || new Date(),
                  receiptUrl: data.receiptUrl
                }
              });
            case 1:
              return _context11.a(2, _context11.v);
          }
        }, _callee11, this);
      }));
      function sendVoteConfirmationEmail(_x16) {
        return _sendVoteConfirmationEmail.apply(this, arguments);
      }
      return sendVoteConfirmationEmail;
    }()
    /**
     * Send vote receipt email
     * @param {Object} data - { to, name, eventName, votes, totalAmount, paymentReference, paymentDate }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendVoteReceiptEmail",
    value: (function () {
      var _sendVoteReceiptEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(data) {
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _context12.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.VOTE_RECEIPT,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  votes: data.votes,
                  // Array of { candidateName, categoryName, voteCount, amount }
                  totalAmount: data.totalAmount,
                  currency: data.currency || "NGN",
                  paymentReference: data.paymentReference,
                  voteCode: data.voteCode,
                  paymentDate: data.paymentDate || new Date()
                }
              });
            case 1:
              return _context12.a(2, _context12.v);
          }
        }, _callee12, this);
      }));
      function sendVoteReceiptEmail(_x17) {
        return _sendVoteReceiptEmail.apply(this, arguments);
      }
      return sendVoteReceiptEmail;
    }()
    /**
     * Send voting started notification
     * @param {Object} data - { to, name, eventName, eventUrl, startDate, endDate }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendVotingStartedEmail",
    value: (function () {
      var _sendVotingStartedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(data) {
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _context13.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.VOTING_STARTED,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  eventDescription: data.eventDescription,
                  eventUrl: data.eventUrl,
                  startDate: data.startDate,
                  endDate: data.endDate
                }
              });
            case 1:
              return _context13.a(2, _context13.v);
          }
        }, _callee13, this);
      }));
      function sendVotingStartedEmail(_x18) {
        return _sendVotingStartedEmail.apply(this, arguments);
      }
      return sendVotingStartedEmail;
    }()
    /**
     * Send voting ending soon reminder
     * @param {Object} data - { to, name, eventName, eventUrl, endDate, hoursRemaining }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendVotingEndingSoonEmail",
    value: (function () {
      var _sendVotingEndingSoonEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(data) {
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              _context14.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.VOTING_ENDING_SOON,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  eventUrl: data.eventUrl,
                  endDate: data.endDate,
                  hoursRemaining: data.hoursRemaining
                }
              });
            case 1:
              return _context14.a(2, _context14.v);
          }
        }, _callee14, this);
      }));
      function sendVotingEndingSoonEmail(_x19) {
        return _sendVotingEndingSoonEmail.apply(this, arguments);
      }
      return sendVotingEndingSoonEmail;
    }()
    /**
     * Send results published notification
     * @param {Object} data - { to, name, eventName, resultsUrl, winners }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendResultsPublishedEmail",
    value: (function () {
      var _sendResultsPublishedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(data) {
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              _context15.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.RESULTS_PUBLISHED,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  resultsUrl: data.resultsUrl,
                  winners: data.winners // Array of { categoryName, candidateName, voteCount }
                }
              });
            case 1:
              return _context15.a(2, _context15.v);
          }
        }, _callee15, this);
      }));
      function sendResultsPublishedEmail(_x20) {
        return _sendResultsPublishedEmail.apply(this, arguments);
      }
      return sendResultsPublishedEmail;
    }() // ========================================
    // PAYMENT-RELATED EMAILS
    // ========================================
    /**
     * Send payment success email
     * @param {Object} data - { to, name, amount, currency, reference, paymentDate, description }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendPaymentSuccessEmail",
    value: function () {
      var _sendPaymentSuccessEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(data) {
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              _context16.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.PAYMENT_SUCCESS,
                context: {
                  name: data.name,
                  amount: data.amount,
                  currency: data.currency || "NGN",
                  reference: data.reference,
                  paymentDate: data.paymentDate || new Date(),
                  description: data.description,
                  receiptUrl: data.receiptUrl
                }
              });
            case 1:
              return _context16.a(2, _context16.v);
          }
        }, _callee16, this);
      }));
      function sendPaymentSuccessEmail(_x21) {
        return _sendPaymentSuccessEmail.apply(this, arguments);
      }
      return sendPaymentSuccessEmail;
    }()
    /**
     * Send refund processed email
     * @param {Object} data - { to, name, amount, currency, reason, refundDate }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendRefundProcessedEmail",
    value: (function () {
      var _sendRefundProcessedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(data) {
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              _context17.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.REFUND_PROCESSED,
                context: {
                  name: data.name,
                  amount: data.amount,
                  currency: data.currency || "NGN",
                  reason: data.reason,
                  refundDate: data.refundDate || new Date(),
                  reference: data.reference
                }
              });
            case 1:
              return _context17.a(2, _context17.v);
          }
        }, _callee17, this);
      }));
      function sendRefundProcessedEmail(_x22) {
        return _sendRefundProcessedEmail.apply(this, arguments);
      }
      return sendRefundProcessedEmail;
    }() // ========================================
    // NOMINATION/FORM EMAILS
    // ========================================
    /**
     * Send nomination confirmation email
     * @param {Object} data - { to, name, nomineeName, categoryName, eventName }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendNominationConfirmationEmail",
    value: function () {
      var _sendNominationConfirmationEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(data) {
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              _context18.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.NOMINATION_CONFIRMATION,
                context: {
                  name: data.name,
                  nomineeName: data.nomineeName,
                  categoryName: data.categoryName,
                  eventName: data.eventName,
                  submissionDate: data.submissionDate || new Date()
                }
              });
            case 1:
              return _context18.a(2, _context18.v);
          }
        }, _callee18, this);
      }));
      function sendNominationConfirmationEmail(_x23) {
        return _sendNominationConfirmationEmail.apply(this, arguments);
      }
      return sendNominationConfirmationEmail;
    }()
    /**
     * Send nomination approved email
     * @param {Object} data - { to, name, nomineeName, categoryName, eventName }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendNominationApprovedEmail",
    value: (function () {
      var _sendNominationApprovedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(data) {
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              _context19.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.NOMINATION_APPROVED,
                context: {
                  name: data.name,
                  nomineeName: data.nomineeName,
                  categoryName: data.categoryName,
                  eventName: data.eventName,
                  approvalDate: data.approvalDate || new Date()
                }
              });
            case 1:
              return _context19.a(2, _context19.v);
          }
        }, _callee19, this);
      }));
      function sendNominationApprovedEmail(_x24) {
        return _sendNominationApprovedEmail.apply(this, arguments);
      }
      return sendNominationApprovedEmail;
    }() // ========================================
    // CANDIDATE PORTAL EMAILS
    // ========================================
    /**
     * Send candidate welcome email with credentials
     * @param {string} email - Candidate email
     * @param {string} name - Candidate name
     * @param {string} candidateCode - Generated candidate code
     * @param {string} [eventName] - Optional event name
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendCandidateWelcomeEmail",
    value: function () {
      var _sendCandidateWelcomeEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(email, name, candidateCode) {
        var eventName,
          _args20 = arguments;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              eventName = _args20.length > 3 && _args20[3] !== undefined ? _args20[3] : null;
              _context20.n = 1;
              return this.sendTemplateEmail({
                to: email,
                template: _emailConstants.EMAIL_TEMPLATES.CANDIDATE_WELCOME,
                context: {
                  name: name,
                  candidateCode: candidateCode,
                  eventName: eventName,
                  loginUrl: "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/candidate/login")
                }
              });
            case 1:
              return _context20.a(2, _context20.v);
          }
        }, _callee20, this);
      }));
      function sendCandidateWelcomeEmail(_x25, _x26, _x27) {
        return _sendCandidateWelcomeEmail.apply(this, arguments);
      }
      return sendCandidateWelcomeEmail;
    }()
    /**
     * Send candidate profile approved email
     * @param {string} email - Candidate email
     * @param {string} name - Candidate name
     * @param {Object} event - Event object with title
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendCandidateProfileApprovedEmail",
    value: (function () {
      var _sendCandidateProfileApprovedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(email, name, event) {
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              _context21.n = 1;
              return this.sendTemplateEmail({
                to: email,
                template: _emailConstants.EMAIL_TEMPLATES.CANDIDATE_PROFILE_APPROVED,
                context: {
                  name: name,
                  eventName: event.title || "the event",
                  eventUrl: "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/events/").concat(event._id),
                  profileUrl: "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/candidate/profile"),
                  approvalDate: new Date()
                }
              });
            case 1:
              return _context21.a(2, _context21.v);
          }
        }, _callee21, this);
      }));
      function sendCandidateProfileApprovedEmail(_x28, _x29, _x30) {
        return _sendCandidateProfileApprovedEmail.apply(this, arguments);
      }
      return sendCandidateProfileApprovedEmail;
    }()
    /**
     * Send candidate profile rejected email
     * @param {string} email - Candidate email
     * @param {string} name - Candidate name
     * @param {string} reason - Rejection reason
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendCandidateProfileRejectedEmail",
    value: (function () {
      var _sendCandidateProfileRejectedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(email, name, reason) {
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              _context22.n = 1;
              return this.sendTemplateEmail({
                to: email,
                template: _emailConstants.EMAIL_TEMPLATES.CANDIDATE_PROFILE_REJECTED,
                context: {
                  name: name,
                  reason: reason,
                  supportEmail: process.env.SUPPORT_EMAIL || "support@itfy-evoting.com",
                  profileUrl: "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/candidate/profile")
                }
              });
            case 1:
              return _context22.a(2, _context22.v);
          }
        }, _callee22, this);
      }));
      function sendCandidateProfileRejectedEmail(_x31, _x32, _x33) {
        return _sendCandidateProfileRejectedEmail.apply(this, arguments);
      }
      return sendCandidateProfileRejectedEmail;
    }()
    /**
     * Send admin alert for candidate profile update
     * @param {string} adminEmail - Admin email
     * @param {string} candidateName - Candidate name
     * @param {string} eventTitle - Event title
     * @param {Array<string>} changedFields - Fields that were changed
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendAdminProfileUpdateAlertEmail",
    value: (function () {
      var _sendAdminProfileUpdateAlertEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(adminEmail, candidateName, eventTitle, changedFields) {
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              _context23.n = 1;
              return this.sendTemplateEmail({
                to: adminEmail,
                template: _emailConstants.EMAIL_TEMPLATES.ADMIN_PROFILE_UPDATE_ALERT,
                context: {
                  candidateName: candidateName,
                  eventTitle: eventTitle,
                  changedFields: changedFields.join(", "),
                  changedFieldsList: changedFields,
                  reviewUrl: "".concat(process.env.FRONTEND_URL || "http://localhost:3000", "/admin/candidates/pending"),
                  updatedAt: new Date()
                }
              });
            case 1:
              return _context23.a(2, _context23.v);
          }
        }, _callee23, this);
      }));
      function sendAdminProfileUpdateAlertEmail(_x34, _x35, _x36, _x37) {
        return _sendAdminProfileUpdateAlertEmail.apply(this, arguments);
      }
      return sendAdminProfileUpdateAlertEmail;
    }() // ========================================
    // EVENT-RELATED EMAILS
    // ========================================
    /**
     * Send event reminder email
     * @param {Object} data - { to, name, eventName, eventUrl, reminderType, eventDate }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendEventReminderEmail",
    value: function () {
      var _sendEventReminderEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(data) {
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              _context24.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.EVENT_REMINDER,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  eventDescription: data.eventDescription,
                  eventUrl: data.eventUrl,
                  reminderType: data.reminderType,
                  // 'starting', 'ending'
                  eventDate: data.eventDate
                }
              });
            case 1:
              return _context24.a(2, _context24.v);
          }
        }, _callee24, this);
      }));
      function sendEventReminderEmail(_x38) {
        return _sendEventReminderEmail.apply(this, arguments);
      }
      return sendEventReminderEmail;
    }() // ========================================
    // SECURITY EMAILS
    // ========================================
    /**
     * Send candidate account locked email
     * @param {Object} data - { to, name, eventName, reason, lockedAt }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendCandidateAccountLockedEmail",
    value: function () {
      var _sendCandidateAccountLockedEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(data) {
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              _context25.n = 1;
              return this.sendTemplateEmail({
                to: data.to,
                subject: "\uD83D\uDD12 Your Candidate Account Has Been Locked",
                template: _emailConstants.EMAIL_TEMPLATES.ACCOUNT_LOCKED,
                context: {
                  name: data.name,
                  eventName: data.eventName,
                  reason: data.reason || "Your account has been locked",
                  lockedAt: data.lockedAt,
                  supportEmail: process.env.SUPPORT_EMAIL || "support@itfy-evoting.com",
                  currentYear: new Date().getFullYear()
                }
              });
            case 1:
              return _context25.a(2, _context25.v);
          }
        }, _callee25, this);
      }));
      function sendCandidateAccountLockedEmail(_x39) {
        return _sendCandidateAccountLockedEmail.apply(this, arguments);
      }
      return sendCandidateAccountLockedEmail;
    }()
    /**
     * Send login alert email
     * @param {Object} data - { to, name, ipAddress, location, device, loginTime }
     * @returns {Promise<Object>}
     */
  }, {
    key: "sendLoginAlertEmail",
    value: (function () {
      var _sendLoginAlertEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(data) {
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              _context26.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.LOGIN_ALERT,
                context: {
                  name: data.name,
                  ipAddress: data.ipAddress,
                  location: data.location,
                  device: data.device,
                  loginTime: data.loginTime || new Date()
                }
              });
            case 1:
              return _context26.a(2, _context26.v);
          }
        }, _callee26, this);
      }));
      function sendLoginAlertEmail(_x40) {
        return _sendLoginAlertEmail.apply(this, arguments);
      }
      return sendLoginAlertEmail;
    }()
    /**
     * Send suspicious activity alert
     * @param {Object} data - { to, name, activityType, details, detectedAt }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendSuspiciousActivityEmail",
    value: (function () {
      var _sendSuspiciousActivityEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(data) {
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              _context27.n = 1;
              return this.sendTemplateEmail({
                to: data.to || data.email,
                template: _emailConstants.EMAIL_TEMPLATES.SUSPICIOUS_ACTIVITY,
                context: {
                  name: data.name,
                  activityType: data.activityType,
                  details: data.details,
                  detectedAt: data.detectedAt || new Date()
                }
              });
            case 1:
              return _context27.a(2, _context27.v);
          }
        }, _callee27, this);
      }));
      function sendSuspiciousActivityEmail(_x41) {
        return _sendSuspiciousActivityEmail.apply(this, arguments);
      }
      return sendSuspiciousActivityEmail;
    }() // ========================================
    // BULK EMAIL SENDING
    // ========================================
    /**
     * Send email to multiple recipients
     * @param {Array} recipients - Array of email addresses or objects with { email, context }
     * @param {Object} options - { subject, template, context }
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendBulkEmail",
    value: function () {
      var _sendBulkEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(recipients, options) {
        var results, _iterator, _step, recipient, recipientEmail, recipientContext, result, _t6, _t7;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              results = {
                sent: [],
                failed: []
              };
              _iterator = _createForOfIteratorHelper(recipients);
              _context28.p = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context28.n = 5;
                break;
              }
              recipient = _step.value;
              recipientEmail = typeof recipient === "string" ? recipient : recipient.email;
              recipientContext = _typeof(recipient) === "object" ? _objectSpread(_objectSpread({}, options.context), recipient.context) : options.context;
              _context28.n = 3;
              return this.sendTemplateEmail({
                to: recipientEmail,
                subject: options.subject,
                template: options.template,
                context: recipientContext
              });
            case 3:
              result = _context28.v;
              if (result.success) {
                results.sent.push(recipientEmail);
              } else {
                results.failed.push({
                  email: recipientEmail,
                  error: result.error
                });
              }

              // Add small delay to avoid rate limiting
              _context28.n = 4;
              return new Promise(function (resolve) {
                return setTimeout(resolve, 100);
              });
            case 4:
              _context28.n = 2;
              break;
            case 5:
              _context28.n = 7;
              break;
            case 6:
              _context28.p = 6;
              _t6 = _context28.v;
              _iterator.e(_t6);
            case 7:
              _context28.p = 7;
              _iterator.f();
              return _context28.f(7);
            case 8:
              console.log("\uD83D\uDCCA Bulk email sent: ".concat(results.sent.length, " success, ").concat(results.failed.length, " failed"));
              return _context28.a(2, {
                success: true,
                sent: results.sent.length,
                failed: results.failed.length,
                details: results
              });
            case 9:
              _context28.p = 9;
              _t7 = _context28.v;
              console.error("❌ Bulk email failed:", _t7);
              return _context28.a(2, {
                success: false,
                error: _t7.message
              });
          }
        }, _callee28, this, [[1, 6, 7, 8], [0, 9]]);
      }));
      function sendBulkEmail(_x42, _x43) {
        return _sendBulkEmail.apply(this, arguments);
      }
      return sendBulkEmail;
    }() // ========================================
    // UTILITY METHODS
    // ========================================
    /**
     * Verify email service configuration
     * @returns {Promise<boolean>}
     */
  }, {
    key: "verify",
    value: function () {
      var _verify2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29() {
        var _t8;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              _context29.p = 0;
              _context29.n = 1;
              return this.transporter.verify();
            case 1:
              return _context29.a(2, true);
            case 2:
              _context29.p = 2;
              _t8 = _context29.v;
              console.error("❌ Email verification failed:", _t8);
              return _context29.a(2, false);
          }
        }, _callee29, this, [[0, 2]]);
      }));
      function verify() {
        return _verify2.apply(this, arguments);
      }
      return verify;
    }()
    /**
     * Get email service health status
     * @returns {Promise<Object>}
     */
  }, {
    key: "healthCheck",
    value: (function () {
      var _healthCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30() {
        var isVerified, _t9;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              _context30.p = 0;
              _context30.n = 1;
              return this.verify();
            case 1:
              isVerified = _context30.v;
              return _context30.a(2, {
                status: isVerified ? "healthy" : "unhealthy",
                channel: _notificationConstants.NOTIFICATION_CHANNEL.EMAIL,
                provider: process.env.EMAIL_PROVIDER || "smtp",
                isReady: this.isReady,
                from: this.from
              });
            case 2:
              _context30.p = 2;
              _t9 = _context30.v;
              return _context30.a(2, {
                status: "unhealthy",
                error: _t9.message
              });
          }
        }, _callee30, this, [[0, 2]]);
      }));
      function healthCheck() {
        return _healthCheck.apply(this, arguments);
      }
      return healthCheck;
    }()
    /**
     * Create test email for development
     * @param {string} to - Test recipient
     * @returns {Promise<Object>}
     */
    )
  }, {
    key: "sendTestEmail",
    value: (function () {
      var _sendTestEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(to) {
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              _context31.n = 1;
              return this.sendEmail({
                to: to,
                subject: "Test Email from ITFY E-Voting Platform",
                html: this.getFallbackTemplate({
                  message: "\n          <h3>\uD83E\uDDEA Test Email</h3>\n          <p>This is a test email from the ITFY E-Voting platform.</p>\n          <p>If you received this, the email service is working correctly! \u2705</p>\n          <p><strong>Timestamp:</strong> ".concat(new Date().toLocaleString(), "</p>\n          <p><strong>Environment:</strong> ").concat(process.env.NODE_ENV || "development", "</p>\n        ")
                })
              });
            case 1:
              return _context31.a(2, _context31.v);
          }
        }, _callee31, this);
      }));
      function sendTestEmail(_x44) {
        return _sendTestEmail.apply(this, arguments);
      }
      return sendTestEmail;
    }())
  }]);
}(); // Export singleton instance
var emailService = exports.emailService = new EmailService();
var _default = exports["default"] = emailService;