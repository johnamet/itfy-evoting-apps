"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SubmissionController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _submissionService = _interopRequireDefault(require("./submission.service.js"));
var _submissionValidation = _interopRequireDefault(require("./submission.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Submission Controller
 * Handles HTTP requests for form submission management
 */
var SubmissionController = exports.SubmissionController = /*#__PURE__*/function (_BaseController) {
  function SubmissionController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SubmissionController);
    return _callSuper(this, SubmissionController, [{
      submissionService: dependencies.submissionService || _submissionService["default"]
    }]);
  }

  // ==================== SUBMISSION MANAGEMENT ====================

  /**
   * Submit a form
   * POST /api/submissions
   */
  _inherits(SubmissionController, _BaseController);
  return _createClass(SubmissionController, [{
    key: "submit",
    value: function () {
      var _submit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var _req$body, form_id, submission_data, categories, ipAddress, userAgent, userId, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _req$body = req.body, form_id = _req$body.form_id, submission_data = _req$body.submission_data, categories = _req$body.categories;
              ipAddress = this.getClientIP(req);
              userAgent = req.headers["user-agent"];
              userId = this.getUserId(req);
              _context.n = 1;
              return this.service("submissionService").submitForm(form_id, submission_data, {
                ip_address: ipAddress,
                user_agent: userAgent,
                submitted_by: userId,
                session_id: req.sessionID,
                categories: categories
              });
            case 1:
              result = _context.v;
              return _context.a(2, this.created(res, {
                data: result,
                message: "Form submitted successfully"
              }));
          }
        }, _callee, this);
      }));
      function submit(_x, _x2) {
        return _submit.apply(this, arguments);
      }
      return submit;
    }()
    /**
     * Get all submissions with pagination and filters
     * GET /api/submissions
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, search, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["form", "event", "status", "submitted_by", "nominee_identifier"]);
              sort = this.getSort(req, "-created_at");
              search = this.getSearch(req); // Handle is_duplicate filter
              if (req.query.is_duplicate !== undefined) {
                filters["duplicate_check.is_duplicate"] = req.query.is_duplicate === "true";
              }

              // Date range filters
              if (req.query.created_at_from) {
                filters.created_at = _objectSpread(_objectSpread({}, filters.created_at), {}, {
                  $gte: new Date(req.query.created_at_from)
                });
              }
              if (req.query.created_at_to) {
                filters.created_at = _objectSpread(_objectSpread({}, filters.created_at), {}, {
                  $lte: new Date(req.query.created_at_to)
                });
              }
              _context2.n = 1;
              return this.service("submissionService").repository.findAll(filters, page, limit, {
                sort: sort,
                populate: ["form", "event", "categories", "submitted_by", "candidate"]
              });
            case 1:
              result = _context2.v;
              return _context2.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee2, this);
      }));
      function list(_x3, _x4) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get submission by ID
     * GET /api/submissions/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, submission;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("submissionService").repository.findById(id, {
                populate: ["form", "event", "categories", "submitted_by", "candidate", "approval.reviewed_by"]
              });
            case 1:
              submission = _context3.v;
              if (submission) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, this.notFound(res, {
                resource: "Submission"
              }));
            case 2:
              return _context3.a(2, this.success(res, {
                data: submission
              }));
          }
        }, _callee3, this);
      }));
      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Update submission
     * PUT /api/submissions/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var id, validated, submission;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _submissionValidation["default"].updateSubmissionSchema);
              _context4.n = 1;
              return this.service("submissionService").repository.updateById(id, validated);
            case 1:
              submission = _context4.v;
              return _context4.a(2, this.success(res, {
                data: submission,
                message: "Submission updated successfully"
              }));
          }
        }, _callee4, this);
      }));
      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }
      return update;
    }() // ==================== APPROVAL WORKFLOW ====================
    /**
     * Approve submission
     * POST /api/submissions/:id/approve
     */
    )
  }, {
    key: "approve",
    value: function () {
      var _approve = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, adminId, options, result;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              options = {
                notes: req.body.review_notes,
                createCandidate: req.body.create_candidate !== false,
                sendEmail: req.body.send_email !== false,
                candidateOverrides: req.body.candidate_overrides
              };
              _context5.n = 1;
              return this.service("submissionService").approveSubmission(id, adminId, options);
            case 1:
              result = _context5.v;
              return _context5.a(2, this.success(res, {
                data: result,
                message: "Submission approved successfully"
              }));
          }
        }, _callee5, this);
      }));
      function approve(_x9, _x0) {
        return _approve.apply(this, arguments);
      }
      return approve;
    }()
    /**
     * Reject submission
     * POST /api/submissions/:id/reject
     */
  }, {
    key: "reject",
    value: (function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id, validated, adminId, submission;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _submissionValidation["default"].rejectSubmissionSchema);
              adminId = this.getUserId(req);
              _context6.n = 1;
              return this.service("submissionService").rejectSubmission(id, adminId, validated.rejection_reason);
            case 1:
              submission = _context6.v;
              return _context6.a(2, this.success(res, {
                data: submission,
                message: "Submission rejected"
              }));
          }
        }, _callee6, this);
      }));
      function reject(_x1, _x10) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
    /**
     * Resolve duplicate submission
     * POST /api/submissions/:id/resolve-duplicate
     */
    )
  }, {
    key: "resolveDuplicate",
    value: (function () {
      var _resolveDuplicate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var id, adminId, _req$body2, action, merge_with, notes, result;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _req$body2 = req.body, action = _req$body2.action, merge_with = _req$body2.merge_with, notes = _req$body2.notes;
              if (["approve", "reject", "merge"].includes(action)) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, this.badRequest(res, {
                message: "action must be 'approve', 'reject', or 'merge'"
              }));
            case 1:
              _context7.n = 2;
              return this.service("submissionService").resolveDuplicate(id, adminId, {
                action: action,
                mergeWith: merge_with,
                notes: notes
              });
            case 2:
              result = _context7.v;
              return _context7.a(2, this.success(res, {
                data: result,
                message: "Duplicate submission ".concat(action, "d successfully")
              }));
          }
        }, _callee7, this);
      }));
      function resolveDuplicate(_x11, _x12) {
        return _resolveDuplicate.apply(this, arguments);
      }
      return resolveDuplicate;
    }() // ==================== DUPLICATE DETECTION ====================
    /**
     * Check duplicates for a submission
     * POST /api/submissions/:id/check-duplicates
     */
    )
  }, {
    key: "checkDuplicates",
    value: function () {
      var _checkDuplicates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, threshold, result;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              threshold = req.body.threshold;
              _context8.n = 1;
              return this.service("submissionService").checkDuplicates(id, threshold);
            case 1:
              result = _context8.v;
              return _context8.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee8, this);
      }));
      function checkDuplicates(_x13, _x14) {
        return _checkDuplicates.apply(this, arguments);
      }
      return checkDuplicates;
    }()
    /**
     * Get suspected duplicates for a form
     * GET /api/submissions/form/:formId/duplicates
     */
  }, {
    key: "getSuspectedDuplicates",
    value: (function () {
      var _getSuspectedDuplicates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var formId, _this$getPagination2, page, limit, result;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              formId = req.params.formId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              _context9.n = 1;
              return this.service("submissionService").getSuspectedDuplicates(formId, page, limit);
            case 1:
              result = _context9.v;
              return _context9.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee9, this);
      }));
      function getSuspectedDuplicates(_x15, _x16) {
        return _getSuspectedDuplicates.apply(this, arguments);
      }
      return getSuspectedDuplicates;
    }() // ==================== FORM-BASED QUERIES ====================
    /**
     * Get submissions by form
     * GET /api/submissions/form/:formId
     */
    )
  }, {
    key: "getByForm",
    value: function () {
      var _getByForm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var formId, _this$getPagination3, page, limit, filters, result;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              formId = req.params.formId;
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit;
              filters = this.getFilters(req, ["status"]);
              _context0.n = 1;
              return this.service("submissionService").repository.findAll(_objectSpread({
                form: formId
              }, filters), page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["submitted_by", "categories"]
              });
            case 1:
              result = _context0.v;
              return _context0.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee0, this);
      }));
      function getByForm(_x17, _x18) {
        return _getByForm.apply(this, arguments);
      }
      return getByForm;
    }()
    /**
     * Get submissions by event
     * GET /api/submissions/event/:eventId
     */
  }, {
    key: "getByEvent",
    value: (function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var eventId, _this$getPagination4, page, limit, filters, result;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit;
              filters = this.getFilters(req, ["status", "form"]);
              _context1.n = 1;
              return this.service("submissionService").repository.findAll(_objectSpread({
                event: eventId
              }, filters), page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["form", "submitted_by", "categories"]
              });
            case 1:
              result = _context1.v;
              return _context1.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee1, this);
      }));
      function getByEvent(_x19, _x20) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get submissions by nominee identifier (multi-category nominations)
     * GET /api/submissions/nominee/:identifier
     */
    )
  }, {
    key: "getByNominee",
    value: (function () {
      var _getByNominee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var identifier, _this$getPagination5, page, limit, result;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              identifier = req.params.identifier;
              _this$getPagination5 = this.getPagination(req), page = _this$getPagination5.page, limit = _this$getPagination5.limit;
              _context10.n = 1;
              return this.service("submissionService").repository.findAll({
                nominee_identifier: identifier
              }, page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["form", "categories"]
              });
            case 1:
              result = _context10.v;
              return _context10.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee10, this);
      }));
      function getByNominee(_x21, _x22) {
        return _getByNominee.apply(this, arguments);
      }
      return getByNominee;
    }() // ==================== USER SUBMISSIONS ====================
    /**
     * Get submissions by user
     * GET /api/submissions/user/:userId
     */
    )
  }, {
    key: "getByUser",
    value: function () {
      var _getByUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var userId, _this$getPagination6, page, limit, result;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              userId = req.params.userId;
              _this$getPagination6 = this.getPagination(req), page = _this$getPagination6.page, limit = _this$getPagination6.limit;
              _context11.n = 1;
              return this.service("submissionService").repository.findAll({
                submitted_by: userId
              }, page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["form", "event", "categories"]
              });
            case 1:
              result = _context11.v;
              return _context11.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee11, this);
      }));
      function getByUser(_x23, _x24) {
        return _getByUser.apply(this, arguments);
      }
      return getByUser;
    }()
    /**
     * Get my submissions (current user)
     * GET /api/submissions/me
     */
  }, {
    key: "getMySubmissions",
    value: (function () {
      var _getMySubmissions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var userId, _this$getPagination7, page, limit, result;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              userId = this.getUserId(req);
              if (userId) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, this.unauthorized(res));
            case 1:
              _this$getPagination7 = this.getPagination(req), page = _this$getPagination7.page, limit = _this$getPagination7.limit;
              _context12.n = 2;
              return this.service("submissionService").repository.findAll({
                submitted_by: userId
              }, page, limit, {
                sort: {
                  created_at: -1
                },
                populate: ["form", "event", "categories", "candidate"]
              });
            case 2:
              result = _context12.v;
              return _context12.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee12, this);
      }));
      function getMySubmissions(_x25, _x26) {
        return _getMySubmissions.apply(this, arguments);
      }
      return getMySubmissions;
    }())
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new SubmissionController();