"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SubmissionService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _submissionRepository = _interopRequireDefault(require("./submission.repository.js"));
var _formRepository = _interopRequireDefault(require("./form.repository.js"));
var _formService = _interopRequireDefault(require("./form.service.js"));
var _candidateService = _interopRequireDefault(require("../candidate/candidate.service.js"));
var _activityService = _interopRequireDefault(require("../activity/activity.service.js"));
var _ipHelper = require("../../utils/helpers/ip.helper.js");
var _formConstants = require("../../utils/constants/form.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * Submission Service
 * Handles nomination/registration form submissions, duplicate detection, and approval workflows
 */
var SubmissionService = exports.SubmissionService = /*#__PURE__*/function (_BaseService) {
  function SubmissionService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SubmissionService);
    _this = _callSuper(this, SubmissionService);
    _this.repository = dependencies.repository || _submissionRepository["default"];
    _this.formRepository = dependencies.formRepository || _formRepository["default"];
    _this.formService = dependencies.formService || _formService["default"];
    _this.candidateService = dependencies.candidateService || _candidateService["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    return _this;
  }

  // ==================== SUBMISSION MANAGEMENT ====================

  /**
   * Submit a form (nomination or registration)
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} submissionData - Form field data (key-value pairs)
   * @param {Object} metadata - Submission metadata (ip_address, user_agent, submitted_by, etc.)
   * @returns {Promise<Object>} - Created submission with duplicate check results
   */
  _inherits(SubmissionService, _BaseService);
  return _createClass(SubmissionService, [{
    key: "submitForm",
    value: function () {
      var _submitForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(formId, submissionData) {
        var metadata,
          _form$multi_category_,
          _form$duplicate_detec,
          _duplicateCheckResult,
          form,
          validation,
          normalizedData,
          nomineeIdentifier,
          identifierFields,
          ipHash,
          submissionNumber,
          submission,
          duplicateCheckResult,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              metadata = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              _context.p = 1;
              _context.n = 2;
              return this.formRepository.findById(formId, {
                populate: ["event", "categories"]
              });
            case 2:
              form = _context.v;
              if (form) {
                _context.n = 3;
                break;
              }
              throw new Error("Form not found");
            case 3:
              if (!(form.status !== "active" || !form.is_published)) {
                _context.n = 4;
                break;
              }
              throw new Error("Form is not currently accepting submissions");
            case 4:
              // Validate submission data against form fields
              validation = form.validateSubmission(submissionData);
              if (validation.valid) {
                _context.n = 5;
                break;
              }
              throw new Error("Validation failed: ".concat(JSON.stringify(validation.errors)));
            case 5:
              // Normalize submission data for duplicate detection
              normalizedData = this.normalizeSubmissionData(submissionData, form.fields); // Generate nominee identifier if multi-category nomination
              nomineeIdentifier = null;
              if ((_form$multi_category_ = form.multi_category_nomination) !== null && _form$multi_category_ !== void 0 && _form$multi_category_.enabled) {
                identifierFields = form.fields.filter(function (f) {
                  return f.is_identifier_field;
                }).map(function (f) {
                  return submissionData[f.field_id] || "";
                }).join("|");
                nomineeIdentifier = _crypto["default"].createHash("sha256").update(identifierFields.toLowerCase()).digest("hex");
              }

              // Hash IP address for privacy using IPHelper
              ipHash = _ipHelper.IPHelper.hash(metadata.ip_address); // Generate submission number
              _context.n = 6;
              return this.generateSubmissionNumber(formId);
            case 6:
              submissionNumber = _context.v;
              _context.n = 7;
              return this.repository.create({
                form: formId,
                event: form.event._id || form.event,
                categories: metadata.categories || form.categories,
                submission_data: submissionData,
                normalized_data: normalizedData,
                status: form.settings.auto_approve ? _formConstants.SUBMISSION_STATUS.APPROVED : _formConstants.SUBMISSION_STATUS.PENDING,
                submitted_by: metadata.submitted_by || null,
                ip_address: metadata.ip_address,
                ip_hash: ipHash,
                user_agent: metadata.user_agent,
                session_id: metadata.session_id,
                nominee_identifier: nomineeIdentifier,
                submission_number: submissionNumber
              });
            case 7:
              submission = _context.v;
              // Run duplicate detection if enabled
              duplicateCheckResult = null;
              if (!((_form$duplicate_detec = form.duplicate_detection) !== null && _form$duplicate_detec !== void 0 && _form$duplicate_detec.enabled)) {
                _context.n = 9;
                break;
              }
              _context.n = 8;
              return this.checkDuplicates(submission._id);
            case 8:
              duplicateCheckResult = _context.v;
            case 9:
              _context.n = 10;
              return form.incrementSubmissions(submission.status);
            case 10:
              // Send confirmation email if enabled
              if (form.settings.send_confirmation_email && !form.settings.auto_approve) {
                // TODO: Send confirmation email
              }

              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: metadata.submitted_by || null,
                action: _activityConstants.ACTION_TYPE.FORM_SUBMISSION,
                entityType: _activityConstants.ENTITY_TYPE.FORM_SUBMISSION,
                entityId: submission._id,
                eventId: form.event._id || form.event,
                description: "Submitted ".concat(form.form_type, " form: ").concat(form.name),
                metadata: {
                  formId: formId,
                  submissionNumber: submissionNumber,
                  hasDuplicates: ((_duplicateCheckResult = duplicateCheckResult) === null || _duplicateCheckResult === void 0 ? void 0 : _duplicateCheckResult.is_duplicate) || false
                },
                ipAddress: metadata.ip_address
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context.a(2, {
                submission: submission,
                duplicateCheck: duplicateCheckResult
              });
            case 11:
              _context.p = 11;
              _t = _context.v;
              throw new Error("Submit form failed: ".concat(_t.message));
            case 12:
              return _context.a(2);
          }
        }, _callee, this, [[1, 11]]);
      }));
      function submitForm(_x, _x2) {
        return _submitForm.apply(this, arguments);
      }
      return submitForm;
    }()
    /**
     * Check for duplicates for a submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {number} [threshold] - Optional custom threshold (overrides form setting)
     * @returns {Promise<Object>} - Duplicate check result
     */
  }, {
    key: "checkDuplicates",
    value: (function () {
      var _checkDuplicates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(submissionId) {
        var threshold,
          _form$duplicate_detec2,
          submission,
          form,
          checkThreshold,
          duplicates,
          isDuplicate,
          highestScore,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              threshold = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
              _context2.p = 1;
              _context2.n = 2;
              return this.repository.findById(submissionId, {
                populate: ["form"]
              });
            case 2:
              submission = _context2.v;
              if (submission) {
                _context2.n = 3;
                break;
              }
              throw new Error("Submission not found");
            case 3:
              form = submission.form;
              if ((_form$duplicate_detec2 = form.duplicate_detection) !== null && _form$duplicate_detec2 !== void 0 && _form$duplicate_detec2.enabled) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2, {
                is_duplicate: false,
                matched_submissions: [],
                similarity_score: 0
              });
            case 4:
              checkThreshold = threshold || form.duplicate_detection.threshold || 85; // Run duplicate check
              _context2.n = 5;
              return this.repository.checkDuplicates(form._id, submission.submission_data, checkThreshold);
            case 5:
              duplicates = _context2.v;
              isDuplicate = duplicates.length > 0;
              highestScore = Math.max.apply(Math, _toConsumableArray(duplicates.map(function (d) {
                return d.similarity;
              })).concat([0])); // Update submission with duplicate check results
              _context2.n = 6;
              return this.repository.updateById(submissionId, {
                "duplicate_check.is_duplicate": isDuplicate,
                "duplicate_check.similarity_score": highestScore,
                "duplicate_check.matched_submissions": duplicates.map(function (d) {
                  return {
                    submission_id: d.submission_id,
                    similarity: d.similarity,
                    matched_fields: d.matched_fields || []
                  };
                }),
                "duplicate_check.checked_at": new Date(),
                status: isDuplicate && form.duplicate_detection.auto_flag ? _formConstants.SUBMISSION_STATUS.DUPLICATE : submission.status
              });
            case 6:
              if (!(isDuplicate && form.duplicate_detection.auto_flag)) {
                _context2.n = 7;
                break;
              }
              _context2.n = 7;
              return form.incrementSubmissions(_formConstants.SUBMISSION_STATUS.DUPLICATE);
            case 7:
              return _context2.a(2, {
                is_duplicate: isDuplicate,
                similarity_score: highestScore,
                matched_submissions: duplicates
              });
            case 8:
              _context2.p = 8;
              _t2 = _context2.v;
              throw new Error("Check duplicates failed: ".concat(_t2.message));
            case 9:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 8]]);
      }));
      function checkDuplicates(_x3) {
        return _checkDuplicates.apply(this, arguments);
      }
      return checkDuplicates;
    }()
    /**
     * Get suspected duplicates for admin review
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [filters] - Additional filters
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @returns {Promise<Object>} - Paginated duplicates with grouping
     */
    )
  }, {
    key: "getSuspectedDuplicates",
    value: (function () {
      var _getSuspectedDuplicates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(formId) {
        var page,
          limit,
          duplicates,
          grouped,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              page = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 1;
              limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 20;
              _context3.p = 1;
              _context3.n = 2;
              return this.repository.findDuplicates(formId, page, limit, {
                populate: ["submitted_by", "categories"]
              });
            case 2:
              duplicates = _context3.v;
              _context3.n = 3;
              return this.repository.groupByNominee(formId);
            case 3:
              grouped = _context3.v;
              return _context3.a(2, {
                duplicates: duplicates,
                grouped: grouped
              });
            case 4:
              _context3.p = 4;
              _t3 = _context3.v;
              throw new Error("Get suspected duplicates failed: ".concat(_t3.message));
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4]]);
      }));
      function getSuspectedDuplicates(_x4) {
        return _getSuspectedDuplicates.apply(this, arguments);
      }
      return getSuspectedDuplicates;
    }() // ==================== APPROVAL WORKFLOW ====================
    /**
     * Approve submission and create candidate profile if nomination form
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
     * @param {Object} options - Approval options
     * @param {string} options.notes - Approval notes
     * @param {boolean} options.createCandidate - Whether to create candidate (default: true for nomination forms)
     * @param {boolean} options.sendEmail - Whether to send welcome email (default: true)
     * @param {Object} options.candidateOverrides - Override data for candidate creation
     * @returns {Promise<Object>} - Approval result with candidate if created
     */
    )
  }, {
    key: "approveSubmission",
    value: function () {
      var _approveSubmission = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(submissionId, adminId) {
        var options,
          _form$candidate_field,
          _options$createCandid,
          _candidate,
          _options$sendEmail2,
          submission,
          form,
          approved,
          candidate,
          _options$sendEmail,
          candidateData,
          finalCandidateData,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              _context4.p = 1;
              _context4.n = 2;
              return this.repository.findById(submissionId, {
                populate: ["form", "event", "categories"]
              });
            case 2:
              submission = _context4.v;
              if (submission) {
                _context4.n = 3;
                break;
              }
              throw new Error("Submission not found");
            case 3:
              if (!(submission.status === _formConstants.SUBMISSION_STATUS.APPROVED)) {
                _context4.n = 4;
                break;
              }
              throw new Error("Submission already approved");
            case 4:
              form = submission.form; // Approve submission
              _context4.n = 5;
              return this.repository.approve(submissionId, adminId, options.notes || "");
            case 5:
              approved = _context4.v;
              candidate = null; // Create candidate if it's a nomination form and field mapping is enabled
              if (!(form.form_type === _formConstants.FORM_TYPE.NOMINATION && (_form$candidate_field = form.candidate_field_mapping) !== null && _form$candidate_field !== void 0 && _form$candidate_field.enabled && ((_options$createCandid = options.createCandidate) !== null && _options$createCandid !== void 0 ? _options$createCandid : form.candidate_field_mapping.auto_create_candidate))) {
                _context4.n = 8;
                break;
              }
              // Extract candidate data using field mapping
              candidateData = _formService["default"].extractCandidateData(submission.submission_data, form.candidate_field_mapping.mappings); // Merge with overrides
              finalCandidateData = _objectSpread(_objectSpread({}, candidateData), options.candidateOverrides); // Create placeholder candidate
              _context4.n = 6;
              return _candidateService["default"].createFromNomination(finalCandidateData, submission.event._id || submission.event, submission.categories.map(function (c) {
                return c._id || c;
              }), submissionId, adminId // Track which admin approved and created the candidate
              );
            case 6:
              candidate = _context4.v;
              _context4.n = 7;
              return this.repository.updateById(submissionId, {
                candidate: candidate._id
              });
            case 7:
              if (!((_options$sendEmail = options.sendEmail) !== null && _options$sendEmail !== void 0 ? _options$sendEmail : form.candidate_field_mapping.send_welcome_email)) {
                _context4.n = 8;
                break;
              }
              _context4.n = 8;
              return _candidateService["default"].sendWelcomeEmail(candidate._id);
            case 8:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.SUBMISSION_APPROVED,
                entityType: _activityConstants.ENTITY_TYPE.FORM_SUBMISSION,
                entityId: submissionId,
                eventId: submission.event._id || submission.event,
                description: "Approved ".concat(form.form_type, " submission ").concat(submission.submission_number),
                metadata: {
                  formId: form._id,
                  candidateCreated: !!candidate,
                  candidateId: (_candidate = candidate) === null || _candidate === void 0 ? void 0 : _candidate._id
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context4.a(2, {
                submission: approved,
                candidate: candidate,
                emailSent: !!candidate && ((_options$sendEmail2 = options.sendEmail) !== null && _options$sendEmail2 !== void 0 ? _options$sendEmail2 : form.candidate_field_mapping.send_welcome_email)
              });
            case 9:
              _context4.p = 9;
              _t4 = _context4.v;
              throw new Error("Approve submission failed: ".concat(_t4.message));
            case 10:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 9]]);
      }));
      function approveSubmission(_x5, _x6) {
        return _approveSubmission.apply(this, arguments);
      }
      return approveSubmission;
    }()
    /**
     * Reject submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
     * @param {string} reason - Rejection reason
     * @returns {Promise<Object>} - Rejected submission
     */
  }, {
    key: "rejectSubmission",
    value: (function () {
      var _rejectSubmission = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(submissionId, adminId, reason) {
        var submission, rejected, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.repository.findById(submissionId, {
                populate: ["form", "event"]
              });
            case 1:
              submission = _context5.v;
              if (submission) {
                _context5.n = 2;
                break;
              }
              throw new Error("Submission not found");
            case 2:
              _context5.n = 3;
              return this.repository.reject(submissionId, adminId, reason);
            case 3:
              rejected = _context5.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.SUBMISSION_REJECTED,
                entityType: _activityConstants.ENTITY_TYPE.FORM_SUBMISSION,
                entityId: submissionId,
                eventId: submission.event._id || submission.event,
                description: "Rejected ".concat(submission.form.form_type, " submission ").concat(submission.submission_number),
                metadata: {
                  formId: submission.form._id,
                  reason: reason
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context5.a(2, rejected);
            case 4:
              _context5.p = 4;
              _t5 = _context5.v;
              throw new Error("Reject submission failed: ".concat(_t5.message));
            case 5:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 4]]);
      }));
      function rejectSubmission(_x7, _x8, _x9) {
        return _rejectSubmission.apply(this, arguments);
      }
      return rejectSubmission;
    }()
    /**
     * Resolve duplicate submission
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
     * @param {Object} resolution - Resolution details
     * @param {string} resolution.action - "approve", "reject", "merge"
     * @param {string|mongoose.Types.ObjectId} [resolution.mergeWith] - ID to merge with (if action="merge")
     * @param {string} [resolution.notes] - Resolution notes
     * @returns {Promise<Object>} - Resolution result
     */
    )
  }, {
    key: "resolveDuplicate",
    value: (function () {
      var _resolveDuplicate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(submissionId, adminId, resolution) {
        var _submission$duplicate, submission, result, _t6, _t7;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.repository.findById(submissionId);
            case 1:
              submission = _context6.v;
              if (submission) {
                _context6.n = 2;
                break;
              }
              throw new Error("Submission not found");
            case 2:
              if ((_submission$duplicate = submission.duplicate_check) !== null && _submission$duplicate !== void 0 && _submission$duplicate.is_duplicate) {
                _context6.n = 3;
                break;
              }
              throw new Error("Submission is not flagged as duplicate");
            case 3:
              result = null;
              _t6 = resolution.action;
              _context6.n = _t6 === "approve" ? 4 : _t6 === "reject" ? 6 : _t6 === "merge" ? 8 : 11;
              break;
            case 4:
              _context6.n = 5;
              return this.approveSubmission(submissionId, adminId, {
                notes: resolution.notes || "Approved despite duplicate flag"
              });
            case 5:
              result = _context6.v;
              return _context6.a(3, 12);
            case 6:
              _context6.n = 7;
              return this.rejectSubmission(submissionId, adminId, resolution.notes || "Rejected as duplicate");
            case 7:
              result = _context6.v;
              return _context6.a(3, 12);
            case 8:
              if (resolution.mergeWith) {
                _context6.n = 9;
                break;
              }
              throw new Error("mergeWith is required for merge action");
            case 9:
              _context6.n = 10;
              return this.repository.markAsDuplicate(submissionId, adminId, [resolution.mergeWith], submission.duplicate_check.similarity_score);
            case 10:
              result = _context6.v;
              // Log merge activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.SUBMISSION_MERGED,
                entityType: _activityConstants.ENTITY_TYPE.FORM_SUBMISSION,
                entityId: submissionId,
                description: "Merged duplicate submission with ".concat(resolution.mergeWith),
                metadata: {
                  mergedWith: resolution.mergeWith,
                  notes: resolution.notes
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context6.a(3, 12);
            case 11:
              throw new Error("Invalid resolution action: ".concat(resolution.action));
            case 12:
              return _context6.a(2, result);
            case 13:
              _context6.p = 13;
              _t7 = _context6.v;
              throw new Error("Resolve duplicate failed: ".concat(_t7.message));
            case 14:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 13]]);
      }));
      function resolveDuplicate(_x0, _x1, _x10) {
        return _resolveDuplicate.apply(this, arguments);
      }
      return resolveDuplicate;
    }() // ==================== QUERY METHODS ====================
    /**
     * Get submission by ID
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Submission
     */
    )
  }, {
    key: "getSubmissionById",
    value: function () {
      var _getSubmissionById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(submissionId) {
        var options,
          _args7 = arguments,
          _t8;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              _context7.p = 1;
              _context7.n = 2;
              return this.repository.findById(submissionId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["form", "event", "categories", "submitted_by", "candidate", "approval.reviewed_by"]
              }));
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t8 = _context7.v;
              throw new Error("Get submission failed: ".concat(_t8.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function getSubmissionById(_x11) {
        return _getSubmissionById.apply(this, arguments);
      }
      return getSubmissionById;
    }()
    /**
     * Get submissions for a form
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @param {Object} [filters] - Additional filters (status, duplicate, etc.)
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @returns {Promise<Object>} - Paginated submissions
     */
  }, {
    key: "getFormSubmissions",
    value: (function () {
      var _getFormSubmissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(formId) {
        var filters,
          page,
          limit,
          query,
          _args8 = arguments,
          _t9;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              filters = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              page = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 1;
              limit = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : 20;
              _context8.p = 1;
              query = _objectSpread({
                form: formId
              }, filters);
              _context8.n = 2;
              return this.repository.findAll(query, page, limit, {
                populate: ["submitted_by", "categories", "candidate"],
                sort: {
                  created_at: -1
                }
              });
            case 2:
              return _context8.a(2, _context8.v);
            case 3:
              _context8.p = 3;
              _t9 = _context8.v;
              throw new Error("Get form submissions failed: ".concat(_t9.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function getFormSubmissions(_x12) {
        return _getFormSubmissions.apply(this, arguments);
      }
      return getFormSubmissions;
    }()
    /**
     * Get pending submissions for review
     * @param {string|mongoose.Types.ObjectId} [formId] - Optional form filter
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @returns {Promise<Object>} - Paginated pending submissions
     */
    )
  }, {
    key: "getPendingSubmissions",
    value: (function () {
      var _getPendingSubmissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var formId,
          page,
          limit,
          _args9 = arguments,
          _t0;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              formId = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : null;
              page = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 1;
              limit = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 20;
              _context9.p = 1;
              _context9.n = 2;
              return this.repository.findPendingReview(formId, page, limit, {
                populate: ["form", "submitted_by", "categories"]
              });
            case 2:
              return _context9.a(2, _context9.v);
            case 3:
              _context9.p = 3;
              _t0 = _context9.v;
              throw new Error("Get pending submissions failed: ".concat(_t0.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function getPendingSubmissions() {
        return _getPendingSubmissions.apply(this, arguments);
      }
      return getPendingSubmissions;
    }()
    /**
     * Get submissions by nominee (multi-category nominations)
     * @param {string} nomineeIdentifier - Nominee identifier hash
     * @returns {Promise<Array>} - All submissions for this nominee
     */
    )
  }, {
    key: "getSubmissionsByNominee",
    value: (function () {
      var _getSubmissionsByNominee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(nomineeIdentifier) {
        var _t1;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.repository.findByNominee(nomineeIdentifier, {
                populate: ["form", "categories", "submitted_by"]
              });
            case 1:
              return _context0.a(2, _context0.v);
            case 2:
              _context0.p = 2;
              _t1 = _context0.v;
              throw new Error("Get submissions by nominee failed: ".concat(_t1.message));
            case 3:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 2]]);
      }));
      function getSubmissionsByNominee(_x13) {
        return _getSubmissionsByNominee.apply(this, arguments);
      }
      return getSubmissionsByNominee;
    }()
    /**
     * Get form statistics
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<Object>} - Form submission statistics
     */
    )
  }, {
    key: "getFormStatistics",
    value: (function () {
      var _getFormStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(formId) {
        var _t10;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this.repository.getFormStatistics(formId);
            case 1:
              return _context1.a(2, _context1.v);
            case 2:
              _context1.p = 2;
              _t10 = _context1.v;
              throw new Error("Get form statistics failed: ".concat(_t10.message));
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function getFormStatistics(_x14) {
        return _getFormStatistics.apply(this, arguments);
      }
      return getFormStatistics;
    }() // ==================== UTILITY METHODS ====================
    /**
     * Generate unique submission number
     * @param {string|mongoose.Types.ObjectId} formId - Form ID
     * @returns {Promise<string>} - Submission number
     */
    )
  }, {
    key: "generateSubmissionNumber",
    value: function () {
      var _generateSubmissionNumber = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(formId) {
        var timestamp, random, formShort;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              timestamp = Date.now().toString(36).toUpperCase();
              random = Math.random().toString(36).substring(2, 6).toUpperCase();
              formShort = formId.toString().substring(formId.toString().length - 4).toUpperCase();
              return _context10.a(2, "SUB-".concat(formShort, "-").concat(timestamp, "-").concat(random));
          }
        }, _callee10);
      }));
      function generateSubmissionNumber(_x15) {
        return _generateSubmissionNumber.apply(this, arguments);
      }
      return generateSubmissionNumber;
    }()
    /**
     * Normalize submission data for duplicate detection
     * @param {Object} submissionData - Raw submission data
     * @param {Array} formFields - Form field definitions
     * @returns {Map} - Normalized data
     */
  }, {
    key: "normalizeSubmissionData",
    value: function normalizeSubmissionData(submissionData, formFields) {
      var normalized = {};
      var _iterator = _createForOfIteratorHelper(formFields),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          var value = submissionData[field.field_id];
          if (value !== undefined && value !== null && value !== "") {
            var normalizedValue = value;

            // Normalize based on field type
            if (typeof value === "string") {
              normalizedValue = value.toLowerCase().trim();

              // Remove special characters for duplicate checking
              if (field.is_duplicate_check_field) {
                normalizedValue = normalizedValue.replace(/[^\w\s]/g, "");
              }
            }
            normalized[field.field_id] = normalizedValue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return normalized;
    }

    /**
     * Bulk approve submissions
     * @param {Array<string>} submissionIds - Submission IDs
     * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
     * @param {Object} [options] - Approval options
     * @returns {Promise<Object>} - Bulk approval result
     */
  }, {
    key: "bulkApproveSubmissions",
    value: (function () {
      var _bulkApproveSubmissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(submissionIds, adminId) {
        var options,
          result,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.bulkApprove(submissionIds, adminId, options.notes || "");
            case 2:
              result = _context11.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.BULK_SUBMISSION_APPROVAL,
                entityType: _activityConstants.ENTITY_TYPE.FORM_SUBMISSION,
                description: "Bulk approved ".concat(result.modified, " submissions"),
                metadata: {
                  count: result.modified,
                  submissionIds: submissionIds
                }
              })["catch"](function (err) {
                return console.error("Activity log failed:", err);
              });
              return _context11.a(2, result);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Bulk approve submissions failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function bulkApproveSubmissions(_x16, _x17) {
        return _bulkApproveSubmissions.apply(this, arguments);
      }
      return bulkApproveSubmissions;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new SubmissionService();