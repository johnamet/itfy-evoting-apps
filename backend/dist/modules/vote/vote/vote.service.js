"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VoteService = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseService = _interopRequireDefault(require("../../shared/base.service.js"));
var _voteRepository = _interopRequireDefault(require("./vote.repository.js"));
var _paymentService = _interopRequireDefault(require("../../payment/payment.service.js"));
var _candidateRepository = _interopRequireDefault(require("../../candidate/candidate.repository.js"));
var _categoryRepository = _interopRequireDefault(require("../../category/category.repository.js"));
var _eventRepository = _interopRequireDefault(require("../../event/event.repository.js"));
var _activityService = _interopRequireDefault(require("../../activity/activity.service.js"));
var _notificationService = _interopRequireDefault(require("../../../services/notification.service.js"));
var _agendaService = _interopRequireDefault(require("../../../services/agenda.service.js"));
var _voteValidation = _interopRequireDefault(require("./vote.validation.js"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _categoryConstants = require("../../../utils/constants/category.constants.js");
var _candidateConstants = require("../../../utils/constants/candidate.constants.js");
var _activityConstants = require("../../../utils/constants/activity.constants.js");
var _ipHelper = require("../../../utils/helpers/ip.helper.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
 * Vote Service
 * Handles business logic for vote casting and management
 */
// Set validation schemas for BaseService.validate()
_baseService["default"].setValidation(_voteValidation["default"]);
var VoteService = exports.VoteService = /*#__PURE__*/function (_BaseService) {
  function VoteService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, VoteService);
    _this = _callSuper(this, VoteService);
    _this.repository = dependencies.repository || _voteRepository["default"];
    _this.candidateRepository = dependencies.candidateRepository || _candidateRepository["default"];
    _this.categoryRepository = dependencies.categoryRepository || _categoryRepository["default"];
    _this.eventRepository = dependencies.eventRepository || _eventRepository["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    _this.paymentService = dependencies.paymentService || _paymentService["default"];
    return _this;
  }

  /**
  * Vote Service - Cast Vote Method (Updated for Category-Based Bundle Tracking)
  * This replaces the castVote method in vote.service.js
  */

  /**
   * Cast a vote - Updated to handle category-based vote tracking
   * @param {Object} voteData - Vote data
   * @returns {Promise<Object>} - Created vote
   */
  _inherits(VoteService, _BaseService);
  return _createClass(VoteService, [{
    key: "castVote",
    value: (function () {
      var _castVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(voteData) {
        var _votingSummary$catego, voteCode, candidateId, categoryId, ipAddress, userAgent, _voteData$metadata, metadata, payment, availableVotes, unrestrictedVotes, canVoteInCategory, candidate, category, existingVote, ipHash, vote, populatedVote, votingSummary, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              voteCode = voteData.voteCode, candidateId = voteData.candidateId, categoryId = voteData.categoryId, ipAddress = voteData.ipAddress, userAgent = voteData.userAgent, _voteData$metadata = voteData.metadata, metadata = _voteData$metadata === void 0 ? {} : _voteData$metadata; // Validate vote code and payment
              _context.n = 1;
              return this.paymentService.getPaymentByVoteCode(voteCode, {
                populate: ["bundles.bundle", "event", "votes_by_category.category"]
              });
            case 1:
              payment = _context.v;
              if (payment) {
                _context.n = 2;
                break;
              }
              throw new Error("Invalid vote code");
            case 2:
              if (!(payment.payment_status !== "COMPLETED")) {
                _context.n = 3;
                break;
              }
              throw new Error("Payment not completed");
            case 3:
              // Check if there are votes available for this category
              availableVotes = payment.getAvailableVotesForCategory(categoryId);
              if (!(availableVotes <= 0)) {
                _context.n = 5;
                break;
              }
              // Check if there are unrestricted votes that can be used
              unrestrictedVotes = payment.votes_remaining - payment.votes_cast;
              if (!(unrestrictedVotes <= 0)) {
                _context.n = 4;
                break;
              }
              throw new Error("No votes remaining for this category");
            case 4:
              // Check if any bundle allows voting in this category
              canVoteInCategory = payment.bundles.some(function (b) {
                if (!b.applicable_categories || b.applicable_categories.length === 0) {
                  return true; // Unrestricted bundle
                }
                return b.applicable_categories.some(function (cat) {
                  return cat.toString() === categoryId.toString();
                });
              });
              if (canVoteInCategory) {
                _context.n = 5;
                break;
              }
              throw new Error("Your vote bundles are not valid for this category");
            case 5:
              _context.n = 6;
              return this.candidateRepository.findById(candidateId);
            case 6:
              candidate = _context.v;
              if (candidate) {
                _context.n = 7;
                break;
              }
              throw new Error("Candidate not found");
            case 7:
              if (!(candidate.status !== _candidateConstants.STATUS.APPROVED)) {
                _context.n = 8;
                break;
              }
              throw new Error("Candidate is not available for voting");
            case 8:
              _context.n = 9;
              return this.categoryRepository.findById(categoryId);
            case 9:
              category = _context.v;
              if (category) {
                _context.n = 10;
                break;
              }
              throw new Error("Category not found");
            case 10:
              if (!(category.status !== _categoryConstants.STATUS.VOTING_OPEN)) {
                _context.n = 11;
                break;
              }
              throw new Error("Voting is not open for this category");
            case 11:
              if (candidate.categories.some(function (cat) {
                return cat.toString() === categoryId;
              })) {
                _context.n = 12;
                break;
              }
              throw new Error("Candidate does not belong to this category");
            case 12:
              if (!(category.event.toString() !== payment.event.toString())) {
                _context.n = 13;
                break;
              }
              throw new Error("Category does not belong to the event");
            case 13:
              _context.n = 14;
              return this.repository.findDuplicateVote(voteCode, categoryId, payment._id);
            case 14:
              existingVote = _context.v;
              if (!existingVote) {
                _context.n = 15;
                break;
              }
              throw new Error("You have already voted in this category");
            case 15:
              // Hash IP address for privacy
              ipHash = _ipHelper.IPHelper.hash(ipAddress); // Create vote
              _context.n = 16;
              return this.repository.create({
                candidate: candidateId,
                category: categoryId,
                event: payment.event,
                payment: payment._id,
                vote_code: voteCode.toUpperCase(),
                status: _voteConstants.VOTE_STATUS.ACTIVE,
                ip_hash: ipHash,
                user_agent: userAgent,
                metadata: metadata,
                cast_at: new Date()
              });
            case 16:
              vote = _context.v;
              _context.n = 17;
              return payment.useVotesForCategory(categoryId, 1);
            case 17:
              _context.n = 18;
              return this.candidateRepository.incrementVoteCount(candidateId);
            case 18:
              _context.n = 19;
              return this.repository.findById(vote._id, {
                populate: ["candidate", "category", "event"]
              });
            case 19:
              populatedVote = _context.v;
              // Get updated voting summary
              votingSummary = payment.getVotingSummary(); // Queue vote confirmation email via Agenda (non-blocking)
              _context.n = 20;
              return _agendaService["default"].now("send-vote-confirmation-email", {
                voteId: vote._id.toString(),
                voterEmail: payment.voter_email,
                voterName: payment.voter_name || payment.voter_email,
                eventName: populatedVote.event.name,
                categoryName: populatedVote.category.name,
                candidateName: populatedVote.candidate.name,
                voteCode: voteCode,
                votesRemaining: votingSummary.votes_remaining,
                categoryVotesRemaining: ((_votingSummary$catego = votingSummary.categories.find(function (c) {
                  return c.category_id.toString() === categoryId.toString();
                })) === null || _votingSummary$catego === void 0 ? void 0 : _votingSummary$catego.votes_remaining) || 0,
                castedAt: vote.cast_at
              });
            case 20:
              _context.n = 21;
              return _notificationService["default"].sendNotification({
                recipientEmail: payment.voter_email,
                type: "VOTE_CAST",
                title: "Vote Confirmed",
                message: "Your vote for ".concat(populatedVote.candidate.name, " in ").concat(populatedVote.category.name, " has been recorded"),
                metadata: {
                  voteId: vote._id,
                  candidateId: candidateId,
                  categoryId: categoryId,
                  votesRemaining: votingSummary.votes_remaining
                }
              });
            case 21:
              // Log activity (fire-and-forget)
              this.activityService.logVote(null, vote._id, payment.event, {
                candidateId: candidateId,
                categoryId: categoryId,
                voteCode: voteCode,
                candidateName: populatedVote.candidate.name,
                categoryName: populatedVote.category.name,
                votesRemaining: votingSummary.votes_remaining
              }, ipAddress)["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context.a(2, _objectSpread(_objectSpread({}, populatedVote.toObject()), {}, {
                voting_summary: votingSummary
              }));
            case 22:
              _context.p = 22;
              _t = _context.v;
              throw new Error("Failed to cast vote: ".concat(_t.message));
            case 23:
              return _context.a(2);
          }
        }, _callee, this, [[0, 22]]);
      }));
      function castVote(_x) {
        return _castVote.apply(this, arguments);
      }
      return castVote;
    }()
    /**
     * Validate vote eligibility - Updated for category-based voting
     * @param {string} voteCode - Vote code
     * @param {string} categoryId - Category ID
     * @returns {Promise<Object>} - Validation result
     */
    )
  }, {
    key: "validateVoteEligibility",
    value: (function () {
      var _validateVoteEligibility = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(voteCode, categoryId) {
        var payment, category, existingVote, availableVotes, hasUnrestrictedVotes, votingSummary, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.paymentService.getPaymentByVoteCode(voteCode, {
                populate: ["bundles.bundle", "event", "votes_by_category.category"]
              });
            case 1:
              payment = _context2.v;
              if (payment) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, {
                isEligible: false,
                reason: "Invalid vote code"
              });
            case 2:
              if (!(payment.payment_status !== "COMPLETED")) {
                _context2.n = 3;
                break;
              }
              return _context2.a(2, {
                isEligible: false,
                reason: "Payment not completed",
                payment: payment
              });
            case 3:
              _context2.n = 4;
              return this.categoryRepository.findById(categoryId);
            case 4:
              category = _context2.v;
              if (category) {
                _context2.n = 5;
                break;
              }
              return _context2.a(2, {
                isEligible: false,
                reason: "Category not found"
              });
            case 5:
              if (!(category.status !== _categoryConstants.STATUS.VOTING_OPEN)) {
                _context2.n = 6;
                break;
              }
              return _context2.a(2, {
                isEligible: false,
                reason: "Voting is not open for this category"
              });
            case 6:
              _context2.n = 7;
              return this.repository.findDuplicateVote(voteCode, categoryId, payment._id);
            case 7:
              existingVote = _context2.v;
              if (!existingVote) {
                _context2.n = 8;
                break;
              }
              return _context2.a(2, {
                isEligible: false,
                reason: "You have already voted in this category"
              });
            case 8:
              // Check if there are votes available for this category
              availableVotes = payment.getAvailableVotesForCategory(categoryId); // If no category-specific votes, check if unrestricted votes can be used
              if (!(availableVotes <= 0)) {
                _context2.n = 9;
                break;
              }
              hasUnrestrictedVotes = payment.bundles.some(function (b) {
                return (!b.applicable_categories || b.applicable_categories.length === 0) && b.votes_allocated - b.votes_used > 0;
              });
              if (hasUnrestrictedVotes) {
                _context2.n = 9;
                break;
              }
              return _context2.a(2, {
                isEligible: false,
                reason: "No votes available for this category",
                payment: payment
              });
            case 9:
              votingSummary = payment.getVotingSummary();
              return _context2.a(2, {
                isEligible: true,
                payment: payment,
                category: category,
                votesRemaining: payment.votes_remaining,
                categoryVotesAvailable: availableVotes,
                votingSummary: votingSummary
              });
            case 10:
              _context2.p = 10;
              _t2 = _context2.v;
              throw new Error("Failed to validate vote eligibility: ".concat(_t2.message));
            case 11:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 10]]);
      }));
      function validateVoteEligibility(_x2, _x3) {
        return _validateVoteEligibility.apply(this, arguments);
      }
      return validateVoteEligibility;
    }()
    /**
     * Cast a vote
     * @param {Object} voteData - Vote data
     * @returns {Promise<Object>} - Created vote
     */
    )
  }, {
    key: "castVote_deprecated",
    value: (function () {
      var _castVote_deprecated = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(voteData) {
        var validatedData, voteCode, candidateId, categoryId, ipAddress, userAgent, _voteData$metadata2, metadata, voteCodeValidation, payment, candidate, category, existingVote, ipHash, vote, populatedVote, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate({
                vote_code: voteData.voteCode,
                candidate: voteData.candidateId,
                category: voteData.categoryId,
                event: voteData.eventId,
                payment: voteData.paymentId,
                ip_hash: voteData.ipAddress,
                user_agent: voteData.userAgent,
                metadata: voteData.metadata || {}
              }, _voteValidation["default"].createVoteSchema);
              voteCode = voteData.voteCode, candidateId = voteData.candidateId, categoryId = voteData.categoryId, ipAddress = voteData.ipAddress, userAgent = voteData.userAgent, _voteData$metadata2 = voteData.metadata, metadata = _voteData$metadata2 === void 0 ? {} : _voteData$metadata2; // Validate vote code and payment
              _context3.n = 1;
              return this.paymentService.validateVoteCode(voteCode);
            case 1:
              voteCodeValidation = _context3.v;
              if (voteCodeValidation.isValid) {
                _context3.n = 2;
                break;
              }
              throw new Error(voteCodeValidation.reason);
            case 2:
              payment = voteCodeValidation.payment; // Validate candidate
              _context3.n = 3;
              return this.candidateRepository.findById(candidateId);
            case 3:
              candidate = _context3.v;
              if (candidate) {
                _context3.n = 4;
                break;
              }
              throw new Error("Candidate not found");
            case 4:
              if (!(candidate.status !== _candidateConstants.STATUS.APPROVED)) {
                _context3.n = 5;
                break;
              }
              throw new Error("Candidate is not available for voting");
            case 5:
              _context3.n = 6;
              return this.categoryRepository.findById(categoryId);
            case 6:
              category = _context3.v;
              if (category) {
                _context3.n = 7;
                break;
              }
              throw new Error("Category not found");
            case 7:
              if (!(category.status !== _categoryConstants.STATUS.VOTING_OPEN)) {
                _context3.n = 8;
                break;
              }
              throw new Error("Voting is not open for this category");
            case 8:
              if (candidate.categories.some(function (cat) {
                return cat.toString() === categoryId;
              })) {
                _context3.n = 9;
                break;
              }
              throw new Error("Candidate does not belong to this category");
            case 9:
              if (!(category.event.toString() !== payment.event.toString())) {
                _context3.n = 10;
                break;
              }
              throw new Error("Category does not belong to the event");
            case 10:
              _context3.n = 11;
              return this.repository.findDuplicateVote(voteCode, categoryId, payment._id);
            case 11:
              existingVote = _context3.v;
              if (!existingVote) {
                _context3.n = 12;
                break;
              }
              throw new Error("You have already voted in this category");
            case 12:
              // Hash IP address for privacy using standardized utility
              ipHash = _ipHelper.IPHelper.hash(ipAddress); // Create vote
              _context3.n = 13;
              return this.repository.create({
                candidate: candidateId,
                category: categoryId,
                event: payment.event,
                payment: payment._id,
                vote_code: voteCode.toUpperCase(),
                status: _voteConstants.VOTE_STATUS.ACTIVE,
                ip_hash: ipHash,
                user_agent: userAgent,
                metadata: metadata,
                cast_at: new Date()
              });
            case 13:
              vote = _context3.v;
              _context3.n = 14;
              return this.paymentService.useVote(voteCode);
            case 14:
              _context3.n = 15;
              return this.candidateRepository.incrementVoteCount(candidateId);
            case 15:
              _context3.n = 16;
              return this.repository.findById(vote._id, {
                populate: ["candidate", "category", "event"]
              });
            case 16:
              populatedVote = _context3.v;
              _context3.n = 17;
              return _agendaService["default"].now("send-vote-confirmation-email", {
                voteId: vote._id.toString(),
                voterEmail: payment.voter_email,
                voterName: payment.voter_name || payment.voter_email,
                eventName: populatedVote.event.name,
                categoryName: populatedVote.category.name,
                candidateName: populatedVote.candidate.name,
                voteCode: voteCode,
                votesRemaining: payment.votes_remaining - 1,
                castedAt: vote.cast_at
              });
            case 17:
              _context3.n = 18;
              return _notificationService["default"].sendNotification({
                recipientEmail: payment.voter_email,
                type: "VOTE_CAST",
                title: "Vote Confirmed",
                message: "Your vote for ".concat(populatedVote.candidate.name, " in ").concat(populatedVote.category.name, " has been recorded"),
                metadata: {
                  voteId: vote._id,
                  candidateId: candidateId,
                  categoryId: categoryId
                }
              });
            case 18:
              // Log activity (fire-and-forget)
              this.activityService.logVote(null,
              // No userId for anonymous voting
              vote._id, payment.event, {
                candidateId: candidateId,
                categoryId: categoryId,
                voteCode: voteCode,
                candidateName: populatedVote.candidate.name,
                categoryName: populatedVote.category.name
              }, ipAddress)["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context3.a(2, populatedVote);
            case 19:
              _context3.p = 19;
              _t3 = _context3.v;
              throw new Error("Failed to cast vote: ".concat(_t3.message));
            case 20:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 19]]);
      }));
      function castVote_deprecated(_x4) {
        return _castVote_deprecated.apply(this, arguments);
      }
      return castVote_deprecated;
    }()
    /**
     * Refund a vote (admin only)
     * @param {string} voteId - Vote ID
     * @param {string} reason - Refund reason
     * @param {string} adminId - Admin ID
     * @returns {Promise<Object>} - Refunded vote
     */
    )
  }, {
    key: "refundVote",
    value: (function () {
      var _refundVote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(voteId, reason, adminId) {
        var vote, refundedVote, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.repository.findById(voteId, {
                populate: ["candidate", "category", "event", "payment"]
              });
            case 1:
              vote = _context4.v;
              if (vote) {
                _context4.n = 2;
                break;
              }
              throw new Error("Vote not found");
            case 2:
              if (!(vote.status === _voteConstants.VOTE_STATUS.REFUNDED)) {
                _context4.n = 3;
                break;
              }
              throw new Error("Vote already refunded");
            case 3:
              _context4.n = 4;
              return this.repository.updateById(voteId, {
                status: _voteConstants.VOTE_STATUS.REFUNDED,
                refunded_at: new Date(),
                refund_reason: reason
              });
            case 4:
              refundedVote = _context4.v;
              _context4.n = 5;
              return this.paymentService.restoreVote(vote.vote_code);
            case 5:
              _context4.n = 6;
              return this.candidateRepository.decrementVoteCount(vote.candidate._id);
            case 6:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.VOTE,
                entityId: voteId,
                eventId: vote.event._id,
                description: "Refunded vote for ".concat(vote.candidate.name),
                metadata: {
                  candidateId: vote.candidate._id,
                  categoryId: vote.category._id,
                  voteCode: vote.vote_code,
                  reason: reason
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context4.a(2, refundedVote);
            case 7:
              _context4.p = 7;
              _t4 = _context4.v;
              throw new Error("Failed to refund vote: ".concat(_t4.message));
            case 8:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 7]]);
      }));
      function refundVote(_x5, _x6, _x7) {
        return _refundVote.apply(this, arguments);
      }
      return refundVote;
    }()
    /**
     * Get vote by ID
     * @param {string} voteId - Vote ID
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Vote
     */
    )
  }, {
    key: "getVoteById",
    value: (function () {
      var _getVoteById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(voteId) {
        var options,
          vote,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              _context5.n = 2;
              return this.repository.findById(voteId, options);
            case 2:
              vote = _context5.v;
              if (vote) {
                _context5.n = 3;
                break;
              }
              throw new Error("Vote not found");
            case 3:
              return _context5.a(2, vote);
            case 4:
              _context5.p = 4;
              _t5 = _context5.v;
              throw new Error("Failed to get vote: ".concat(_t5.message));
            case 5:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 4]]);
      }));
      function getVoteById(_x8) {
        return _getVoteById.apply(this, arguments);
      }
      return getVoteById;
    }()
    /**
     * Get votes by candidate
     * @param {string} candidateId - Candidate ID
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated votes
     */
    )
  }, {
    key: "getVotesByCandidate",
    value: (function () {
      var _getVotesByCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(candidateId) {
        var page,
          limit,
          options,
          votes,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
              limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 10;
              options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
              _context6.p = 1;
              _context6.n = 2;
              return this.repository.findAll({
                candidate: candidateId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  cast_at: -1
                }
              }));
            case 2:
              votes = _context6.v;
              return _context6.a(2, votes);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Failed to get votes: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function getVotesByCandidate(_x9) {
        return _getVotesByCandidate.apply(this, arguments);
      }
      return getVotesByCandidate;
    }()
    /**
     * Get votes by category
     * @param {string} categoryId - Category ID
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated votes
     */
    )
  }, {
    key: "getVotesByCategory",
    value: (function () {
      var _getVotesByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(categoryId) {
        var page,
          limit,
          options,
          votes,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              page = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 1;
              limit = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : 10;
              options = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : {};
              _context7.p = 1;
              _context7.n = 2;
              return this.repository.findAll({
                category: categoryId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  cast_at: -1
                }
              }));
            case 2:
              votes = _context7.v;
              return _context7.a(2, votes);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Failed to get votes: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function getVotesByCategory(_x0) {
        return _getVotesByCategory.apply(this, arguments);
      }
      return getVotesByCategory;
    }()
    /**
     * Get votes by event
     * @param {string} eventId - Event ID
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated votes
     */
    )
  }, {
    key: "getVotesByEvent",
    value: (function () {
      var _getVotesByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(eventId) {
        var page,
          limit,
          options,
          votes,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              page = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 1;
              limit = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : 10;
              options = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : {};
              _context8.p = 1;
              _context8.n = 2;
              return this.repository.findAll({
                event: eventId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  cast_at: -1
                }
              }));
            case 2:
              votes = _context8.v;
              return _context8.a(2, votes);
            case 3:
              _context8.p = 3;
              _t8 = _context8.v;
              throw new Error("Failed to get votes: ".concat(_t8.message));
            case 4:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 3]]);
      }));
      function getVotesByEvent(_x1) {
        return _getVotesByEvent.apply(this, arguments);
      }
      return getVotesByEvent;
    }()
    /**
     * Get votes by vote code
     * @param {string} voteCode - Vote code
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Votes
     */
    )
  }, {
    key: "getVotesByVoteCode",
    value: (function () {
      var _getVotesByVoteCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(voteCode) {
        var options,
          votes,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              _context9.n = 2;
              return this.repository.findByVoteCode(voteCode, options);
            case 2:
              votes = _context9.v;
              return _context9.a(2, votes);
            case 3:
              _context9.p = 3;
              _t9 = _context9.v;
              throw new Error("Failed to get votes: ".concat(_t9.message));
            case 4:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 3]]);
      }));
      function getVotesByVoteCode(_x10) {
        return _getVotesByVoteCode.apply(this, arguments);
      }
      return getVotesByVoteCode;
    }()
    /**
     * Get vote count by candidate
     * @param {string} candidateId - Candidate ID
     * @returns {Promise<number>} - Vote count
     */
    )
  }, {
    key: "getVoteCountByCandidate",
    value: (function () {
      var _getVoteCountByCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(candidateId) {
        var count, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.repository.countByCandidate(candidateId);
            case 1:
              count = _context0.v;
              return _context0.a(2, count);
            case 2:
              _context0.p = 2;
              _t0 = _context0.v;
              throw new Error("Failed to get vote count: ".concat(_t0.message));
            case 3:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 2]]);
      }));
      function getVoteCountByCandidate(_x11) {
        return _getVoteCountByCandidate.apply(this, arguments);
      }
      return getVoteCountByCandidate;
    }()
    /**
     * Get vote count by category
     * @param {string} categoryId - Category ID
     * @returns {Promise<number>} - Vote count
     */
    )
  }, {
    key: "getVoteCountByCategory",
    value: (function () {
      var _getVoteCountByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(categoryId) {
        var count, _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this.repository.countByCategory(categoryId);
            case 1:
              count = _context1.v;
              return _context1.a(2, count);
            case 2:
              _context1.p = 2;
              _t1 = _context1.v;
              throw new Error("Failed to get vote count: ".concat(_t1.message));
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function getVoteCountByCategory(_x12) {
        return _getVoteCountByCategory.apply(this, arguments);
      }
      return getVoteCountByCategory;
    }()
    /**
     * Get vote count by event
     * @param {string} eventId - Event ID
     * @returns {Promise<number>} - Vote count
     */
    )
  }, {
    key: "getVoteCountByEvent",
    value: (function () {
      var _getVoteCountByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(eventId) {
        var count, _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.repository.countByEvent(eventId);
            case 1:
              count = _context10.v;
              return _context10.a(2, count);
            case 2:
              _context10.p = 2;
              _t10 = _context10.v;
              throw new Error("Failed to get vote count: ".concat(_t10.message));
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function getVoteCountByEvent(_x13) {
        return _getVoteCountByEvent.apply(this, arguments);
      }
      return getVoteCountByEvent;
    }()
    /**
     * Get real-time results for a category
     * @param {string} categoryId - Category ID
     * @returns {Promise<Array>} - Candidate results
     */
    )
  }, {
    key: "getCategoryResults",
    value: (function () {
      var _getCategoryResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(categoryId) {
        var category, results, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return this.categoryRepository.findById(categoryId);
            case 1:
              category = _context11.v;
              if (category) {
                _context11.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              _context11.n = 3;
              return this.repository.getCategoryResults(categoryId);
            case 3:
              results = _context11.v;
              return _context11.a(2, results);
            case 4:
              _context11.p = 4;
              _t11 = _context11.v;
              throw new Error("Failed to get category results: ".concat(_t11.message));
            case 5:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 4]]);
      }));
      function getCategoryResults(_x14) {
        return _getCategoryResults.apply(this, arguments);
      }
      return getCategoryResults;
    }()
    /**
     * Get real-time results for an event
     * @param {string} eventId - Event ID
     * @returns {Promise<Object>} - Event results by category
     */
    )
  }, {
    key: "getEventResults",
    value: (function () {
      var _getEventResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(eventId) {
        var event, results, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.eventRepository.findById(eventId);
            case 1:
              event = _context12.v;
              if (event) {
                _context12.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context12.n = 3;
              return this.repository.getEventResults(eventId);
            case 3:
              results = _context12.v;
              return _context12.a(2, results);
            case 4:
              _context12.p = 4;
              _t12 = _context12.v;
              throw new Error("Failed to get event results: ".concat(_t12.message));
            case 5:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 4]]);
      }));
      function getEventResults(_x15) {
        return _getEventResults.apply(this, arguments);
      }
      return getEventResults;
    }()
    /**
     * Get voting trends over time
     * @param {string} eventId - Event ID
     * @param {string} interval - Time interval (hour, day, week)
     * @param {Date} startDate - Start date
     * @param {Date} endDate - End date
     * @returns {Promise<Array>} - Voting trends
     */
    )
  }, {
    key: "getVotingTrends",
    value: (function () {
      var _getVotingTrends = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(eventId) {
        var interval,
          startDate,
          endDate,
          trends,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              interval = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : "day";
              startDate = _args13.length > 2 ? _args13[2] : undefined;
              endDate = _args13.length > 3 ? _args13[3] : undefined;
              _context13.p = 1;
              _context13.n = 2;
              return this.repository.getVotingTrends(eventId, interval, startDate, endDate);
            case 2:
              trends = _context13.v;
              return _context13.a(2, trends);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Failed to get voting trends: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function getVotingTrends(_x16) {
        return _getVotingTrends.apply(this, arguments);
      }
      return getVotingTrends;
    }()
    /**
     * Get vote distribution by category
     * @param {string} eventId - Event ID
     * @returns {Promise<Array>} - Vote distribution
     */
    )
  }, {
    key: "getVoteDistribution",
    value: (function () {
      var _getVoteDistribution = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(eventId) {
        var distribution, _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _context14.n = 1;
              return this.repository.getVoteDistribution(eventId);
            case 1:
              distribution = _context14.v;
              return _context14.a(2, distribution);
            case 2:
              _context14.p = 2;
              _t14 = _context14.v;
              throw new Error("Failed to get vote distribution: ".concat(_t14.message));
            case 3:
              return _context14.a(2);
          }
        }, _callee14, this, [[0, 2]]);
      }));
      function getVoteDistribution(_x17) {
        return _getVoteDistribution.apply(this, arguments);
      }
      return getVoteDistribution;
    }()
    /**
     * Get top candidates across all categories
     * @param {string} eventId - Event ID
     * @param {number} limit - Number of candidates to return
     * @returns {Promise<Array>} - Top candidates
     */
    )
  }, {
    key: "getTopCandidates",
    value: (function () {
      var _getTopCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(eventId) {
        var limit,
          topCandidates,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              limit = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 10;
              _context15.p = 1;
              _context15.n = 2;
              return this.repository.getTopCandidates(eventId, limit);
            case 2:
              topCandidates = _context15.v;
              return _context15.a(2, topCandidates);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw new Error("Failed to get top candidates: ".concat(_t15.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 3]]);
      }));
      function getTopCandidates(_x18) {
        return _getTopCandidates.apply(this, arguments);
      }
      return getTopCandidates;
    }()
    /**
     * Get voting statistics for an event
     * @param {string} eventId - Event ID
     * @returns {Promise<Object>} - Voting statistics
     */
    )
  }, {
    key: "getVotingStats",
    value: (function () {
      var _getVotingStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(eventId) {
        var stats, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.repository.getVotingStatsByEvent(eventId);
            case 1:
              stats = _context16.v;
              return _context16.a(2, stats);
            case 2:
              _context16.p = 2;
              _t16 = _context16.v;
              throw new Error("Failed to get voting statistics: ".concat(_t16.message));
            case 3:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 2]]);
      }));
      function getVotingStats(_x19) {
        return _getVotingStats.apply(this, arguments);
      }
      return getVotingStats;
    }()
    /**
     * Detect suspicious voting patterns
     * @param {string} eventId - Event ID
     * @param {number} threshold - Threshold for suspicious activity
     * @param {number} minutes - Time window in minutes
     * @returns {Promise<Array>} - Suspicious patterns
     */
    )
  }, {
    key: "detectSuspiciousPatterns",
    value: (function () {
      var _detectSuspiciousPatterns = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(eventId) {
        var threshold,
          minutes,
          patterns,
          _args17 = arguments,
          _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              threshold = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 10;
              minutes = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : 5;
              _context17.p = 1;
              _context17.n = 2;
              return this.repository.detectSuspiciousPatterns(eventId, threshold, minutes);
            case 2:
              patterns = _context17.v;
              // Log suspicious activity (fire-and-forget)
              if (patterns.length > 0) {
                this.activityService.log({
                  action: _activityConstants.ACTION_TYPE.WARNING,
                  entityType: _activityConstants.ENTITY_TYPE.VOTE,
                  eventId: eventId,
                  description: "Detected ".concat(patterns.length, " suspicious voting pattern(s)"),
                  metadata: {
                    threshold: threshold,
                    minutes: minutes,
                    patternsCount: patterns.length,
                    patterns: patterns.slice(0, 5) // Log first 5 patterns
                  }
                })["catch"](function (err) {
                  return console.error("Activity log error:", err);
                });
              }
              return _context17.a(2, patterns);
            case 3:
              _context17.p = 3;
              _t17 = _context17.v;
              throw new Error("Failed to detect suspicious patterns: ".concat(_t17.message));
            case 4:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function detectSuspiciousPatterns(_x20) {
        return _detectSuspiciousPatterns.apply(this, arguments);
      }
      return detectSuspiciousPatterns;
    }()
    /**
     * Validate if user can vote in a category
     * @param {string} voteCode - Vote code
     * @param {string} categoryId - Category ID
     * @returns {Promise<Object>} - Validation result
     */
    )
  }, {
    key: "validateVoteEligibility_deprecated",
    value: (function () {
      var _validateVoteEligibility_deprecated = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(voteCode, categoryId) {
        var voteCodeValidation, payment, category, existingVote, _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              _context18.p = 0;
              _context18.n = 1;
              return this.paymentService.validateVoteCode(voteCode);
            case 1:
              voteCodeValidation = _context18.v;
              if (voteCodeValidation.isValid) {
                _context18.n = 2;
                break;
              }
              return _context18.a(2, {
                isEligible: false,
                reason: voteCodeValidation.reason
              });
            case 2:
              payment = voteCodeValidation.payment; // Validate category
              _context18.n = 3;
              return this.categoryRepository.findById(categoryId);
            case 3:
              category = _context18.v;
              if (category) {
                _context18.n = 4;
                break;
              }
              return _context18.a(2, {
                isEligible: false,
                reason: "Category not found"
              });
            case 4:
              if (!(category.status !== _categoryConstants.STATUS.VOTING_OPEN)) {
                _context18.n = 5;
                break;
              }
              return _context18.a(2, {
                isEligible: false,
                reason: "Voting is not open for this category"
              });
            case 5:
              _context18.n = 6;
              return this.repository.findDuplicateVote(voteCode, categoryId, payment._id);
            case 6:
              existingVote = _context18.v;
              if (!existingVote) {
                _context18.n = 7;
                break;
              }
              return _context18.a(2, {
                isEligible: false,
                reason: "You have already voted in this category"
              });
            case 7:
              return _context18.a(2, {
                isEligible: true,
                payment: payment,
                category: category,
                votesRemaining: payment.votes_remaining
              });
            case 8:
              _context18.p = 8;
              _t18 = _context18.v;
              throw new Error("Failed to validate vote eligibility: ".concat(_t18.message));
            case 9:
              return _context18.a(2);
          }
        }, _callee18, this, [[0, 8]]);
      }));
      function validateVoteEligibility_deprecated(_x21, _x22) {
        return _validateVoteEligibility_deprecated.apply(this, arguments);
      }
      return validateVoteEligibility_deprecated;
    }()
    /**
     * Get voter history by vote code
     * @param {string} voteCode - Vote code
     * @returns {Promise<Object>} - Voter history
     */
    )
  }, {
    key: "getVoterHistory",
    value: (function () {
      var _getVoterHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(voteCode) {
        var validation, payment, votes, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.paymentService.validateVoteCode(voteCode);
            case 1:
              validation = _context19.v;
              if (validation.payment) {
                _context19.n = 2;
                break;
              }
              throw new Error("Invalid vote code");
            case 2:
              payment = validation.payment;
              _context19.n = 3;
              return this.repository.findByVoteCode(voteCode, {
                populate: ["candidate", "category"]
              });
            case 3:
              votes = _context19.v;
              return _context19.a(2, {
                voteCode: voteCode,
                voterEmail: payment.voter_email,
                eventName: payment.event.name,
                bundleName: payment.bundle.name,
                votesPurchased: payment.votes_purchased,
                votesCast: payment.votes_cast,
                votesRemaining: payment.votes_remaining,
                votes: votes.map(function (vote) {
                  return {
                    candidateName: vote.candidate.name,
                    categoryName: vote.category.name,
                    castAt: vote.cast_at,
                    status: vote.status
                  };
                })
              });
            case 4:
              _context19.p = 4;
              _t19 = _context19.v;
              throw new Error("Failed to get voter history: ".concat(_t19.message));
            case 5:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 4]]);
      }));
      function getVoterHistory(_x23) {
        return _getVoterHistory.apply(this, arguments);
      }
      return getVoterHistory;
    }()
    /**
     * Aggregate vote counts and update candidate/category totals
     * Used by scheduled job to keep vote counts in sync
     * @param {string} [eventId] - Event ID (optional, aggregates all if not provided)
     * @returns {Promise<Object>} - Aggregation results
     */
    )
  }, {
    key: "aggregateVoteCounts",
    value: (function () {
      var _aggregateVoteCounts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(eventId) {
        var _this2 = this;
        var matchStage, candidateCounts, categoryCounts, candidateUpdates, categoryUpdates, result, _t20;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              matchStage = {
                status: _voteConstants.VOTE_STATUS.ACTIVE
              };
              if (eventId) {
                matchStage.event = new _mongoose["default"].Types.ObjectId(eventId);
              }

              // Aggregate vote counts per candidate
              _context22.n = 1;
              return this.repository.aggregate([{
                $match: matchStage
              }, {
                $group: {
                  _id: "$candidate",
                  vote_count: {
                    $sum: 1
                  }
                }
              }]);
            case 1:
              candidateCounts = _context22.v;
              _context22.n = 2;
              return this.repository.aggregate([{
                $match: matchStage
              }, {
                $group: {
                  _id: "$category",
                  total_votes: {
                    $sum: 1
                  }
                }
              }]);
            case 2:
              categoryCounts = _context22.v;
              _context22.n = 3;
              return Promise.all(candidateCounts.map(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(_ref) {
                  var _id, vote_count;
                  return _regenerator().w(function (_context20) {
                    while (1) switch (_context20.n) {
                      case 0:
                        _id = _ref._id, vote_count = _ref.vote_count;
                        return _context20.a(2, _this2.candidateRepository.updateById(_id, {
                          vote_count: vote_count
                        }));
                    }
                  }, _callee20);
                }));
                return function (_x25) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 3:
              candidateUpdates = _context22.v;
              _context22.n = 4;
              return Promise.all(categoryCounts.map(/*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(_ref3) {
                  var _id, total_votes;
                  return _regenerator().w(function (_context21) {
                    while (1) switch (_context21.n) {
                      case 0:
                        _id = _ref3._id, total_votes = _ref3.total_votes;
                        return _context21.a(2, _this2.categoryRepository.updateById(_id, {
                          total_votes: total_votes
                        }));
                    }
                  }, _callee21);
                }));
                return function (_x26) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 4:
              categoryUpdates = _context22.v;
              result = {
                candidatesUpdated: candidateUpdates.filter(Boolean).length,
                categoriesUpdated: categoryUpdates.filter(Boolean).length,
                aggregatedAt: new Date()
              };
              console.log("\u2705 Vote counts aggregated: ".concat(result.candidatesUpdated, " candidates, ").concat(result.categoriesUpdated, " categories"));
              return _context22.a(2, result);
            case 5:
              _context22.p = 5;
              _t20 = _context22.v;
              throw new Error("Failed to aggregate vote counts: ".concat(_t20.message));
            case 6:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 5]]);
      }));
      function aggregateVoteCounts(_x24) {
        return _aggregateVoteCounts.apply(this, arguments);
      }
      return aggregateVoteCounts;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new VoteService();