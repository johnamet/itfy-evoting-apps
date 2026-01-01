"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CandidateService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _candidateRepository = _interopRequireDefault(require("./candidate.repository.js"));
var _candidateValidation = _interopRequireDefault(require("./candidate.validation.js"));
var _candidateConstants = require("../../utils/constants/candidate.constants.js");
var _notificationConstants = require("../../utils/constants/notification.constants.js");
var _notificationService = _interopRequireDefault(require("../../services/notification.service.js"));
var _agendaService = _interopRequireDefault(require("../../services/agenda.service.js"));
var _emailService = _interopRequireDefault(require("../../services/email.service.js"));
var _authHelper = require("../../utils/helpers/auth.helper.js");
var _fileService = _interopRequireDefault(require("../../services/file.service.js"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t38 in e) "default" !== _t38 && {}.hasOwnProperty.call(e, _t38) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t38)) && (i.get || i.set) ? o(f, _t38, i) : f[_t38] = e[_t38]); return f; })(e, t); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /* eslint-disable no-undef */
_baseService["default"].setValidation(_candidateValidation["default"]);

/**
 * Candidate Service
 * Handles business logic for candidate profile management, categories, and admin operations
 * 
 * NOTE: Authentication is handled by AuthService (auth.service.js)
 * - Use AuthService.registerCandidate() for registration
 * - Use AuthService.loginCandidate() for login
 * - Use AuthService.changePassword() for password changes
 * - Use AuthService.requestPasswordReset() and AuthService.resetPassword() for password resets
 */
var CandidateService = exports.CandidateService = /*#__PURE__*/function (_BaseService) {
  function CandidateService() {
    var _this;
    _classCallCheck(this, CandidateService);
    _this = _callSuper(this, CandidateService);
    _this.repository = _candidateRepository["default"];
    return _this;
  }

  /**
   * Convert candidate image paths to URLs
   * @param {Object} candidate - Candidate object
   * @returns {Object} - Candidate with URLs instead of paths
   * @private
   */
  _inherits(CandidateService, _BaseService);
  return _createClass(CandidateService, [{
    key: "_convertImagesToUrls",
    value: function _convertImagesToUrls(candidate) {
      if (!candidate) return candidate;
      var candidateData = candidate.toObject ? candidate.toObject() : _objectSpread({}, candidate);

      // Convert profile image
      if (candidateData.profile_image) {
        candidateData.profile_image = _fileService["default"].getFileUrl(candidateData.profile_image);
      }

      // Convert cover image
      if (candidateData.cover_image) {
        candidateData.cover_image = _fileService["default"].getFileUrl(candidateData.cover_image);
      }

      // Convert gallery images
      if (candidateData.gallery && Array.isArray(candidateData.gallery)) {
        candidateData.gallery = _fileService["default"].getFileUrls(candidateData.gallery);
      }
      return candidateData;
    }

    /**
     * AUTHENTICATION METHODS MOVED TO AuthService
     * 
     * For authentication operations, use:
     * - AuthService.registerCandidate(data) - Register new candidate
     * - AuthService.loginCandidate(data, metadata) - Login candidate
     * - AuthService.changePassword(candidateId, data, 'candidate') - Change password
     * - AuthService.requestPasswordReset(data, 'candidate') - Request password reset
     * - AuthService.resetPassword(data, 'candidate') - Reset password with token
     */

    // ==================== LISTING & COUNTING ====================

    /**
     * Find all candidates with filters and pagination
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (skip, limit, sort, populate)
     * @returns {Promise<Array>} - Array of candidates
     */
  }, {
    key: "findAll",
    value: (function () {
      var _findAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this2 = this;
        var filters,
          options,
          _options$skip,
          skip,
          _options$limit,
          limit,
          _options$sort,
          sort,
          _options$populate,
          populate,
          query,
          candidates,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              filters = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              _options$skip = options.skip, skip = _options$skip === void 0 ? 0 : _options$skip, _options$limit = options.limit, limit = _options$limit === void 0 ? 20 : _options$limit, _options$sort = options.sort, sort = _options$sort === void 0 ? {
                created_at: -1
              } : _options$sort, _options$populate = options.populate, populate = _options$populate === void 0 ? [] : _options$populate;
              query = this.repository.model.find(filters).skip(skip).limit(limit).sort(sort); // Apply populate if specified
              if (populate.length > 0) {
                populate.forEach(function (p) {
                  return query.populate(p);
                });
              } else {
                // Default population
                query.populate("event", "name slug").populate("categories", "name slug is_voting_open");
              }
              _context.n = 2;
              return query.lean().exec();
            case 2:
              candidates = _context.v;
              return _context.a(2, candidates.map(function (candidate) {
                return _this2._convertImagesToUrls(candidate);
              }));
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Find all candidates failed: ".concat(_t.message));
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function findAll() {
        return _findAll.apply(this, arguments);
      }
      return findAll;
    }()
    /**
     * Count candidates matching filters
     * @param {Object} filters - Query filters
     * @returns {Promise<number>} - Count of matching candidates
     */
    )
  }, {
    key: "count",
    value: (function () {
      var _count = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var filters,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              filters = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.repository.model.countDocuments(filters).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Count candidates failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }() // ==================== PROFILE MANAGEMENT ====================
    /**
     * Get candidate profile
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Candidate profile
     */
    )
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(candidateId) {
        var options,
          candidate,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return this.repository.findById(candidateId, _objectSpread(_objectSpread({}, options), {}, {
                populate: ["event", "categories", "created_by"]
              }));
            case 2:
              candidate = _context3.v;
              return _context3.a(2, this._convertImagesToUrls(candidate));
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Get profile failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function getProfile(_x) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
    /**
     * Get candidate by slug (public)
     * @param {string} slug - Candidate slug
     * @returns {Promise<Object>} - Candidate profile
     */
  }, {
    key: "getCandidateBySlug",
    value: (function () {
      var _getCandidateBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(slug) {
        var candidate, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.repository.model.findOne({
                slug: slug
              }).populate("event", "name slug").populate("categories", "name slug").lean().exec();
            case 1:
              candidate = _context4.v;
              return _context4.a(2, this._convertImagesToUrls(candidate));
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              throw new Error("Get candidate by slug failed: ".concat(_t4.message));
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
      }));
      function getCandidateBySlug(_x2) {
        return _getCandidateBySlug.apply(this, arguments);
      }
      return getCandidateBySlug;
    }()
    /**
     * Get candidate by code (public)
     * @param {string} code - Candidate code
     * @returns {Promise<Object>} - Candidate profile
     */
    )
  }, {
    key: "getCandidateByCode",
    value: (function () {
      var _getCandidateByCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(code) {
        var candidate, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.repository.model.findOne({
                candidate_code: code
              }).populate("event", "name slug").populate("categories", "name slug").lean().exec();
            case 1:
              candidate = _context5.v;
              return _context5.a(2, this._convertImagesToUrls(candidate));
            case 2:
              _context5.p = 2;
              _t5 = _context5.v;
              throw new Error("Get candidate by code failed: ".concat(_t5.message));
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 2]]);
      }));
      function getCandidateByCode(_x3) {
        return _getCandidateByCode.apply(this, arguments);
      }
      return getCandidateByCode;
    }()
    /**
     * Get candidate profile update history
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Array>} - Profile update history
     */
    )
  }, {
    key: "getProfileUpdateHistory",
    value: (function () {
      var _getProfileUpdateHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(candidateId) {
        var candidate, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.repository.findById(candidateId, {
                select: "profile_update_history"
              });
            case 1:
              candidate = _context6.v;
              return _context6.a(2, (candidate === null || candidate === void 0 ? void 0 : candidate.profile_update_history) || []);
            case 2:
              _context6.p = 2;
              _t6 = _context6.v;
              throw new Error("Get profile update history failed: ".concat(_t6.message));
            case 3:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 2]]);
      }));
      function getProfileUpdateHistory(_x4) {
        return _getProfileUpdateHistory.apply(this, arguments);
      }
      return getProfileUpdateHistory;
    }()
    /**
     * Update candidate profile (candidate self-update)
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} updateData - Update data
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "updateProfileByCandidate",
    value: (function () {
      var _updateProfileByCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(candidateId, updateData) {
        var validated, attemptedFields, forbiddenFields, candidate, changedFields, _i, _attemptedFields, field, updated, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              // Validate input
              validated = this.validate(updateData, _candidateValidation["default"].updateProfileSchema); // Validate that candidate isn't updating admin-only fields
              attemptedFields = Object.keys(validated);
              forbiddenFields = attemptedFields.filter(function (field) {
                return _candidateConstants.ADMIN_ONLY_FIELDS.includes(field);
              });
              if (!(forbiddenFields.length > 0)) {
                _context7.n = 1;
                break;
              }
              throw new Error("Cannot update admin-only fields: ".concat(forbiddenFields.join(", ")));
            case 1:
              _context7.n = 2;
              return this.repository.findById(candidateId);
            case 2:
              candidate = _context7.v;
              if (candidate) {
                _context7.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              // Track changed fields
              changedFields = [];
              for (_i = 0, _attemptedFields = attemptedFields; _i < _attemptedFields.length; _i++) {
                field = _attemptedFields[_i];
                if (JSON.stringify(candidate[field]) !== JSON.stringify(validated[field])) {
                  changedFields.push(field);
                }
              }

              // If no changes, return as-is
              if (!(changedFields.length === 0)) {
                _context7.n = 4;
                break;
              }
              return _context7.a(2, candidate);
            case 4:
              _context7.n = 5;
              return this.repository.updateById(candidateId, validated);
            case 5:
              updated = _context7.v;
              if (!(candidate.status === _candidateConstants.STATUS.APPROVED || candidate.status === _candidateConstants.STATUS.PROFILE_UPDATE_PENDING)) {
                _context7.n = 7;
                break;
              }
              _context7.n = 6;
              return this.repository.requestReApproval(candidateId, changedFields, _candidateConstants.PROFILE_UPDATE_REASONS.CORRECTION);
            case 6:
              _context7.n = 7;
              return this.notifyAdminsOfProfileUpdate(candidateId, changedFields);
            case 7:
              return _context7.a(2, updated);
            case 8:
              _context7.p = 8;
              _t7 = _context7.v;
              throw new Error("Update profile by candidate failed: ".concat(_t7.message));
            case 9:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 8]]);
      }));
      function updateProfileByCandidate(_x5, _x6) {
        return _updateProfileByCandidate.apply(this, arguments);
      }
      return updateProfileByCandidate;
    }()
    /**
     * Update candidate profile (admin update)
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} updateData - Update data
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "updateProfileByAdmin",
    value: (function () {
      var _updateProfileByAdmin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(candidateId, updateData) {
        var validated, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              // Validate input - admins can update any field
              validated = this.validate(updateData, _candidateValidation["default"].updateCandidateSchema);
              _context8.n = 1;
              return this.repository.updateById(candidateId, validated);
            case 1:
              return _context8.a(2, _context8.v);
            case 2:
              _context8.p = 2;
              _t8 = _context8.v;
              throw new Error("Update profile by admin failed: ".concat(_t8.message));
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function updateProfileByAdmin(_x7, _x8) {
        return _updateProfileByAdmin.apply(this, arguments);
      }
      return updateProfileByAdmin;
    }()
    /**
     * Create new candidate (admin-only, without password)
     * For candidate self-registration with password, use AuthService.registerCandidate()
     * @param {Object} candidateData - Candidate data
     * @returns {Promise<Object>} - Created candidate
     */
    )
  }, {
    key: "createCandidate",
    value: (function () {
      var _createCandidate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(candidateData) {
        var validated, candidate, candidateObj, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              // Validate input
              validated = this.validate(candidateData, _candidateValidation["default"].createCandidateSchema); // Create candidate (admin creates without password - password set via email invite)
              _context9.n = 1;
              return this.repository.create(validated);
            case 1:
              candidate = _context9.v;
              // Remove sensitive fields from response
              candidateObj = candidate.toObject();
              delete candidateObj.password_hash;
              return _context9.a(2, candidateObj);
            case 2:
              _context9.p = 2;
              _t9 = _context9.v;
              throw new Error("Create candidate failed: ".concat(_t9.message));
            case 3:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 2]]);
      }));
      function createCandidate(_x9) {
        return _createCandidate.apply(this, arguments);
      }
      return createCandidate;
    }() // ==================== CATEGORY MANAGEMENT ====================
    /**
     * Add category to candidate (candidate self-service)
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "addCategory",
    value: function () {
      var _addCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(candidateId, categoryId) {
        var validated, candidate, updated, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              // Validate input
              validated = this.validate({
                categoryId: categoryId
              }, _candidateValidation["default"].addCategorySchema);
              _context0.n = 1;
              return this.repository.findById(candidateId);
            case 1:
              candidate = _context0.v;
              if (candidate) {
                _context0.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              if (!candidate.categories.some(function (cat) {
                return cat.toString() === validated.categoryId.toString();
              })) {
                _context0.n = 3;
                break;
              }
              throw new Error("Candidate already in this category");
            case 3:
              _context0.n = 4;
              return this.repository.addToCategory(candidateId, validated.categoryId);
            case 4:
              updated = _context0.v;
              if (!(candidate.status === _candidateConstants.STATUS.APPROVED || candidate.status === _candidateConstants.STATUS.PROFILE_UPDATE_PENDING)) {
                _context0.n = 6;
                break;
              }
              _context0.n = 5;
              return this.repository.requestReApproval(candidateId, ["categories"], _candidateConstants.PROFILE_UPDATE_REASONS.CATEGORY_CHANGE);
            case 5:
              _context0.n = 6;
              return this.notifyAdminsOfProfileUpdate(candidateId, ["categories"]);
            case 6:
              return _context0.a(2, updated);
            case 7:
              _context0.p = 7;
              _t0 = _context0.v;
              throw new Error("Add category failed: ".concat(_t0.message));
            case 8:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 7]]);
      }));
      function addCategory(_x0, _x1) {
        return _addCategory.apply(this, arguments);
      }
      return addCategory;
    }()
    /**
     * Remove category from candidate (candidate self-service)
     * This will fail if trying to remove admin-verified category
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Updated candidate
     */
  }, {
    key: "removeCategory",
    value: (function () {
      var _removeCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(candidateId, categoryId) {
        var candidate, _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              _context1.n = 1;
              return this.repository.model.findById(candidateId);
            case 1:
              candidate = _context1.v;
              if (candidate) {
                _context1.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context1.n = 3;
              return candidate.removeFromCategory(categoryId);
            case 3:
              if (!(candidate.status === _candidateConstants.STATUS.APPROVED || candidate.status === _candidateConstants.STATUS.PROFILE_UPDATE_PENDING)) {
                _context1.n = 5;
                break;
              }
              _context1.n = 4;
              return this.repository.requestReApproval(candidateId, ["categories"], _candidateConstants.PROFILE_UPDATE_REASONS.CATEGORY_CHANGE);
            case 4:
              _context1.n = 5;
              return this.notifyAdminsOfProfileUpdate(candidateId, ["categories"]);
            case 5:
              return _context1.a(2, candidate);
            case 6:
              _context1.p = 6;
              _t1 = _context1.v;
              throw new Error("Remove category failed: ".concat(_t1.message));
            case 7:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 6]]);
      }));
      function removeCategory(_x10, _x11) {
        return _removeCategory.apply(this, arguments);
      }
      return removeCategory;
    }()
    /**
     * Admin removes category from candidate (can remove admin-verified)
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "adminRemoveCategory",
    value: (function () {
      var _adminRemoveCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(candidateId, categoryId) {
        var _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.repository.adminRemoveCategory(candidateId, categoryId);
            case 1:
              return _context10.a(2, _context10.v);
            case 2:
              _context10.p = 2;
              _t10 = _context10.v;
              throw new Error("Admin remove category failed: ".concat(_t10.message));
            case 3:
              return _context10.a(2);
          }
        }, _callee10, this, [[0, 2]]);
      }));
      function adminRemoveCategory(_x12, _x13) {
        return _adminRemoveCategory.apply(this, arguments);
      }
      return adminRemoveCategory;
    }()
    /**
     * Update admin-verified categories
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Array<string|mongoose.Types.ObjectId>} categoryIds - Category IDs
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "updateAdminVerifiedCategories",
    value: (function () {
      var _updateAdminVerifiedCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(candidateId, categoryIds) {
        var validated, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              // Validate input
              validated = this.validate({
                categoryIds: categoryIds
              }, _candidateValidation["default"].updateAdminVerifiedCategoriesSchema);
              _context11.n = 1;
              return this.repository.updateById(candidateId, {
                admin_verified_categories: validated.categoryIds
              });
            case 1:
              return _context11.a(2, _context11.v);
            case 2:
              _context11.p = 2;
              _t11 = _context11.v;
              throw new Error("Update admin verified categories failed: ".concat(_t11.message));
            case 3:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 2]]);
      }));
      function updateAdminVerifiedCategories(_x14, _x15) {
        return _updateAdminVerifiedCategories.apply(this, arguments);
      }
      return updateAdminVerifiedCategories;
    }() // ==================== ADMIN OPERATIONS ====================
    /**
     * Approve candidate profile
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
     * @returns {Promise<Object>} - Approved candidate
     */
    )
  }, {
    key: "approveProfile",
    value: function () {
      var _approveProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(candidateId, adminId) {
        var candidate, _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              _context12.p = 0;
              _context12.n = 1;
              return this.repository.approve(candidateId, adminId);
            case 1:
              candidate = _context12.v;
              _context12.n = 2;
              return _agendaService["default"].now("send-candidate-profile-approved-email", {
                email: candidate.email,
                name: candidate.name,
                eventId: candidate.event._id || candidate.event
              });
            case 2:
              return _context12.a(2, candidate);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Approve profile failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[0, 3]]);
      }));
      function approveProfile(_x16, _x17) {
        return _approveProfile.apply(this, arguments);
      }
      return approveProfile;
    }()
    /**
     * Reject candidate profile
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
     * @param {string} [reason] - Rejection reason
     * @returns {Promise<Object>} - Rejected candidate
     */
  }, {
    key: "rejectProfile",
    value: (function () {
      var _rejectProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(candidateId, adminId) {
        var reason,
          validated,
          candidate,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              reason = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : "";
              _context13.p = 1;
              // Validate input
              validated = this.validate({
                reason: reason
              }, _candidateValidation["default"].rejectCandidateSchema);
              _context13.n = 2;
              return this.repository.reject(candidateId, adminId, validated.reason);
            case 2:
              candidate = _context13.v;
              _context13.n = 3;
              return _agendaService["default"].now("send-candidate-profile-rejected-email", {
                email: candidate.email,
                name: candidate.name,
                reason: validated.reason
              });
            case 3:
              return _context13.a(2, candidate);
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw new Error("Reject profile failed: ".concat(_t13.message));
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 4]]);
      }));
      function rejectProfile(_x18, _x19) {
        return _rejectProfile.apply(this, arguments);
      }
      return rejectProfile;
    }()
    /**
     * Get candidates with pending profile updates
     * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event filter
     * @returns {Promise<Array>} - Candidates with pending updates
     */
    )
  }, {
    key: "getProfileUpdatesPending",
    value: (function () {
      var _getProfileUpdatesPending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
        var eventId,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              eventId = _args14.length > 0 && _args14[0] !== undefined ? _args14[0] : null;
              _context14.p = 1;
              _context14.n = 2;
              return this.repository.findProfileUpdatesPending(eventId, {
                populate: ["event", "categories"]
              });
            case 2:
              return _context14.a(2, _context14.v);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Get profile updates pending failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 3]]);
      }));
      function getProfileUpdatesPending() {
        return _getProfileUpdatesPending.apply(this, arguments);
      }
      return getProfileUpdatesPending;
    }() // ==================== NOTIFICATIONS ====================
    /**
     * Notify admins of candidate profile update
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Array<string>} changedFields - Changed fields
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "notifyAdminsOfProfileUpdate",
    value: function () {
      var _notifyAdminsOfProfileUpdate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(candidateId) {
        var changedFields,
          candidate,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              changedFields = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : [];
              _context15.p = 1;
              _context15.n = 2;
              return this.repository.findById(candidateId, {
                populate: ["event"]
              });
            case 2:
              candidate = _context15.v;
              if (candidate) {
                _context15.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              _context15.n = 4;
              return _notificationService["default"].create({
                user: candidate.event.created_by,
                // Event creator
                type: _notificationConstants.NOTIFICATION_TYPE.CANDIDATE_PROFILE_UPDATED,
                title: "Candidate Profile Updated",
                message: "".concat(candidate.name, " has updated their profile and requires review."),
                data: {
                  candidateId: candidate._id,
                  candidateName: candidate.name,
                  eventId: candidate.event._id,
                  eventTitle: candidate.event.title,
                  changedFields: changedFields,
                  profileUpdateHistory: candidate.profile_update_history.slice(-1) // Latest update
                },
                link: "/admin/events/".concat(candidate.event._id, "/candidates/").concat(candidate._id)
              });
            case 4:
              _context15.n = 5;
              return _agendaService["default"].now("send-admin-profile-update-alert-email", {
                adminEmail: candidate.event.created_by.email,
                candidateName: candidate.name,
                eventTitle: candidate.event.title,
                changedFields: changedFields
              });
            case 5:
              _context15.n = 7;
              break;
            case 6:
              _context15.p = 6;
              _t15 = _context15.v;
              // Log error but don't fail the operation
              console.error("Failed to notify admins of profile update: ".concat(_t15.message));
            case 7:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 6]]);
      }));
      function notifyAdminsOfProfileUpdate(_x20) {
        return _notifyAdminsOfProfileUpdate.apply(this, arguments);
      }
      return notifyAdminsOfProfileUpdate;
    }() // ==================== UTILITY METHODS ====================
    /**
     * Find candidate by candidate code
     * @param {string} candidateCode - Candidate code
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Candidate or null
     */
  }, {
    key: "findByCandidateCode",
    value: function () {
      var _findByCandidateCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(candidateCode) {
        var options,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              options = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
              _context16.p = 1;
              _context16.n = 2;
              return this.repository.findByCandidateCode(candidateCode, options);
            case 2:
              return _context16.a(2, _context16.v);
            case 3:
              _context16.p = 3;
              _t16 = _context16.v;
              throw new Error("Find by candidate code failed: ".concat(_t16.message));
            case 4:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 3]]);
      }));
      function findByCandidateCode(_x21) {
        return _findByCandidateCode.apply(this, arguments);
      }
      return findByCandidateCode;
    }()
    /**
     * Find candidate by email
     * @param {string} email - Email
     * @param {string|mongoose.Types.ObjectId} [eventId] - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object|null>} - Candidate or null
     */
  }, {
    key: "findByEmail",
    value: (function () {
      var _findByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(email) {
        var eventId,
          options,
          _args17 = arguments,
          _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              eventId = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : null;
              options = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : {};
              _context17.p = 1;
              _context17.n = 2;
              return this.repository.findByEmail(email, eventId, options);
            case 2:
              return _context17.a(2, _context17.v);
            case 3:
              _context17.p = 3;
              _t17 = _context17.v;
              throw new Error("Find by email failed: ".concat(_t17.message));
            case 4:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function findByEmail(_x22) {
        return _findByEmail.apply(this, arguments);
      }
      return findByEmail;
    }()
    /**
     * Find all candidates for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Candidates
     */
    )
  }, {
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(eventId) {
        var page,
          limit,
          options,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              page = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : 1;
              limit = _args18.length > 2 && _args18[2] !== undefined ? _args18[2] : 20;
              options = _args18.length > 3 && _args18[3] !== undefined ? _args18[3] : {};
              _context18.p = 1;
              _context18.n = 2;
              return this.repository.findByEvent(eventId, page, limit, options);
            case 2:
              return _context18.a(2, _context18.v);
            case 3:
              _context18.p = 3;
              _t18 = _context18.v;
              throw new Error("Find by event failed: ".concat(_t18.message));
            case 4:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 3]]);
      }));
      function findByEvent(_x23) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Search candidates
     * @param {string} query - Search query
     * @param {Object} [filters] - Additional filters
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Matching candidates
     */
    )
  }, {
    key: "search",
    value: (function () {
      var _search = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(query) {
        var filters,
          page,
          limit,
          options,
          validated,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              filters = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : {};
              page = _args19.length > 2 && _args19[2] !== undefined ? _args19[2] : 1;
              limit = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : 20;
              options = _args19.length > 4 && _args19[4] !== undefined ? _args19[4] : {};
              _context19.p = 1;
              // Validate input
              validated = this.validate({
                query: query,
                filters: filters,
                page: page,
                limit: limit
              }, _candidateValidation["default"].searchSchema);
              _context19.n = 2;
              return this.repository.search(validated.query, validated.filters, validated.page, validated.limit, options);
            case 2:
              return _context19.a(2, _context19.v);
            case 3:
              _context19.p = 3;
              _t19 = _context19.v;
              throw new Error("Search candidates failed: ".concat(_t19.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function search(_x24) {
        return _search.apply(this, arguments);
      }
      return search;
    }() // ==================== NOMINATION WORKFLOW ====================
    /**
     * Create candidate from nomination submission
     * This creates a placeholder profile that the nominee must complete
     * @param {Object} nominationData - Extracted data from nomination form
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Array<string|mongoose.Types.ObjectId>} categoryIds - Category IDs
     * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
     * @param {string|mongoose.Types.ObjectId} [adminId] - ID of admin who approved the nomination
     * @returns {Promise<Object>} - Created candidate with temporary credentials
     */
    )
  }, {
    key: "createFromNomination",
    value: function () {
      var _createFromNomination = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(nominationData, eventId, categoryIds, submissionId) {
        var adminId,
          validatedData,
          validatedContext,
          existingCandidate,
          updateData,
          temporaryPassword,
          passwordHash,
          candidateCode,
          slug,
          candidateData,
          candidate,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              adminId = _args20.length > 4 && _args20[4] !== undefined ? _args20[4] : null;
              _context20.p = 1;
              // Validate nomination data
              validatedData = this.validate(nominationData, _candidateValidation["default"].createFromNominationSchema); // Validate nomination context (eventId, categoryIds, submissionId)
              validatedContext = this.validate({
                eventId: eventId,
                categoryIds: categoryIds,
                submissionId: submissionId,
                adminId: adminId
              }, _candidateValidation["default"].nominationContextSchema); // Check if candidate with this email already exists for this event
              _context20.n = 2;
              return this.repository.findByEmail(validatedData.email, validatedContext.eventId);
            case 2:
              existingCandidate = _context20.v;
              if (!existingCandidate) {
                _context20.n = 4;
                break;
              }
              // Update existing candidate instead of creating new one
              updateData = _objectSpread(_objectSpread({}, validatedData), {}, {
                categories: _toConsumableArray(new Set([].concat(_toConsumableArray(existingCandidate.categories.map(function (c) {
                  return c.toString();
                })), _toConsumableArray(validatedContext.categoryIds.map(function (c) {
                  return c.toString();
                }))))),
                nomination_submission: validatedContext.submissionId
              }); // If candidate was rejected, reset to pending profile completion
              if (existingCandidate.status === _candidateConstants.STATUS.REJECTED) {
                updateData.status = _candidateConstants.STATUS.PENDING_PROFILE_COMPLETION;
                updateData.rejection_reason = null;
              }
              _context20.n = 3;
              return this.repository.updateById(existingCandidate._id, updateData);
            case 3:
              return _context20.a(2, _context20.v);
            case 4:
              // Generate temporary password
              temporaryPassword = this.generateTemporaryPassword();
              _context20.n = 5;
              return _authHelper.AuthHelpers.hashPassword(temporaryPassword);
            case 5:
              passwordHash = _context20.v;
              _context20.n = 6;
              return this.generateUniqueCandidateCode();
            case 6:
              candidateCode = _context20.v;
              _context20.n = 7;
              return this.generateUniqueSlug("".concat(validatedData.first_name, "-").concat(validatedData.last_name));
            case 7:
              slug = _context20.v;
              // Create candidate with pending profile completion status
              candidateData = _objectSpread(_objectSpread({}, validatedData), {}, {
                password_hash: passwordHash,
                candidate_code: candidateCode,
                slug: slug,
                event: validatedContext.eventId,
                categories: validatedContext.categoryIds,
                status: _candidateConstants.STATUS.PENDING_PROFILE_COMPLETION,
                is_published: false,
                nomination_submission: validatedContext.submissionId,
                created_by: validatedContext.adminId // Admin who approved the nomination
              });
              _context20.n = 8;
              return this.repository.create(candidateData);
            case 8:
              candidate = _context20.v;
              // Store temporary password (will be sent via email)
              candidate._temporaryPassword = temporaryPassword;
              return _context20.a(2, candidate);
            case 9:
              _context20.p = 9;
              _t20 = _context20.v;
              throw new Error("Create from nomination failed: ".concat(_t20.message));
            case 10:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 9]]);
      }));
      function createFromNomination(_x25, _x26, _x27, _x28) {
        return _createFromNomination.apply(this, arguments);
      }
      return createFromNomination;
    }()
    /**
     * Send welcome email to newly created candidate from nomination
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<void>}
     */
  }, {
    key: "sendWelcomeEmail",
    value: (function () {
      var _sendWelcomeEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(candidateId) {
        var candidate, temporaryPassword, passwordHash, _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              _context21.n = 1;
              return this.repository.findById(candidateId, {
                populate: ["event"]
              });
            case 1:
              candidate = _context21.v;
              if (candidate) {
                _context21.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              // Check if temporary password exists (for newly created candidates)
              temporaryPassword = candidate._temporaryPassword; // If no temporary password, generate a password reset token instead
              if (temporaryPassword) {
                _context21.n = 4;
                break;
              }
              temporaryPassword = this.generateTemporaryPassword();
              _context21.n = 3;
              return _authHelper.AuthHelpers.hashPassword(temporaryPassword);
            case 3:
              passwordHash = _context21.v;
              _context21.n = 4;
              return this.repository.updateById(candidateId, {
                password_hash: passwordHash
              });
            case 4:
              _context21.n = 5;
              return _emailService["default"].sendEmail({
                to: candidate.email,
                subject: "You've Been Nominated for ".concat(candidate.event.name, " - Complete Your Profile"),
                template: "nomination-credentials",
                context: {
                  candidateName: "".concat(candidate.first_name, " ").concat(candidate.last_name),
                  eventName: candidate.event.name,
                  email: candidate.email,
                  temporaryPassword: temporaryPassword,
                  loginUrl: "".concat(process.env.APP_URL || 'http://localhost:3000', "/candidate/login"),
                  profileUrl: "".concat(process.env.APP_URL || 'http://localhost:3000', "/candidate/profile")
                }
              });
            case 5:
              _context21.n = 6;
              return _agendaService["default"].schedule("in 7 days", "send-profile-completion-reminder", {
                candidateId: candidate._id,
                email: candidate.email,
                name: "".concat(candidate.first_name, " ").concat(candidate.last_name)
              });
            case 6:
              _context21.n = 8;
              break;
            case 7:
              _context21.p = 7;
              _t21 = _context21.v;
              throw new Error("Send welcome email failed: ".concat(_t21.message));
            case 8:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 7]]);
      }));
      function sendWelcomeEmail(_x29) {
        return _sendWelcomeEmail.apply(this, arguments);
      }
      return sendWelcomeEmail;
    }()
    /**
     * Candidate completes their pending profile
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Object} profileData - Complete profile data
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "completePendingProfile",
    value: (function () {
      var _completePendingProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(candidateId, profileData) {
        var validated, candidate, attemptedFields, forbiddenFields, updated, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              // Validate input
              validated = this.validate(profileData, _candidateValidation["default"].completePendingProfileSchema);
              _context22.n = 1;
              return this.repository.findById(candidateId);
            case 1:
              candidate = _context22.v;
              if (candidate) {
                _context22.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              if (!(candidate.status !== _candidateConstants.STATUS.PENDING_PROFILE_COMPLETION)) {
                _context22.n = 3;
                break;
              }
              throw new Error("Candidate profile is not in pending completion state");
            case 3:
              // Validate that candidate isn't updating admin-only fields
              attemptedFields = Object.keys(validated);
              forbiddenFields = attemptedFields.filter(function (field) {
                return _candidateConstants.ADMIN_ONLY_FIELDS.includes(field);
              });
              if (!(forbiddenFields.length > 0)) {
                _context22.n = 4;
                break;
              }
              throw new Error("Cannot update admin-only fields: ".concat(forbiddenFields.join(", ")));
            case 4:
              _context22.n = 5;
              return this.repository.updateById(candidateId, _objectSpread(_objectSpread({}, validated), {}, {
                status: _candidateConstants.STATUS.PENDING,
                // Move to pending approval
                profile_completed_at: new Date()
              }));
            case 5:
              updated = _context22.v;
              _context22.n = 6;
              return this.notifyAdminsOfProfileCompletion(candidateId);
            case 6:
              return _context22.a(2, updated);
            case 7:
              _context22.p = 7;
              _t22 = _context22.v;
              throw new Error("Complete pending profile failed: ".concat(_t22.message));
            case 8:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 7]]);
      }));
      function completePendingProfile(_x30, _x31) {
        return _completePendingProfile.apply(this, arguments);
      }
      return completePendingProfile;
    }()
    /**
     * Publish candidate profile (make visible to public)
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "publishProfile",
    value: (function () {
      var _publishProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(candidateId) {
        var candidate, _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _context23.n = 1;
              return this.repository.findById(candidateId);
            case 1:
              candidate = _context23.v;
              if (candidate) {
                _context23.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              if (!(candidate.status !== _candidateConstants.STATUS.APPROVED)) {
                _context23.n = 3;
                break;
              }
              throw new Error("Only approved candidates can be published");
            case 3:
              _context23.n = 4;
              return this.repository.updateById(candidateId, {
                is_published: true,
                published_at: new Date()
              });
            case 4:
              return _context23.a(2, _context23.v);
            case 5:
              _context23.p = 5;
              _t23 = _context23.v;
              throw new Error("Publish profile failed: ".concat(_t23.message));
            case 6:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 5]]);
      }));
      function publishProfile(_x32) {
        return _publishProfile.apply(this, arguments);
      }
      return publishProfile;
    }()
    /**
     * Unpublish candidate profile
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "unpublishProfile",
    value: (function () {
      var _unpublishProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(candidateId) {
        var _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.repository.updateById(candidateId, {
                is_published: false
              });
            case 1:
              return _context24.a(2, _context24.v);
            case 2:
              _context24.p = 2;
              _t24 = _context24.v;
              throw new Error("Unpublish profile failed: ".concat(_t24.message));
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 2]]);
      }));
      function unpublishProfile(_x33) {
        return _unpublishProfile.apply(this, arguments);
      }
      return unpublishProfile;
    }()
    /**
     * Notify admins that a candidate has completed their profile
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "notifyAdminsOfProfileCompletion",
    value: (function () {
      var _notifyAdminsOfProfileCompletion = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(candidateId) {
        var _candidate$event$orga, candidate, _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.repository.findById(candidateId, {
                populate: ["event"]
              });
            case 1:
              candidate = _context25.v;
              if (candidate) {
                _context25.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context25.n = 3;
              return _notificationService["default"].create({
                user: candidate.event.created_by,
                type: _notificationConstants.NOTIFICATION_TYPE.CANDIDATE_PROFILE_COMPLETED,
                title: "Candidate Profile Completed",
                message: "".concat(candidate.first_name, " ").concat(candidate.last_name, " has completed their nomination profile and is ready for review."),
                data: {
                  candidateId: candidate._id,
                  candidateName: "".concat(candidate.first_name, " ").concat(candidate.last_name),
                  eventId: candidate.event._id,
                  eventTitle: candidate.event.name
                },
                link: "/admin/events/".concat(candidate.event._id, "/candidates/").concat(candidate._id)
              });
            case 3:
              _context25.n = 4;
              return _agendaService["default"].now("send-nomination-approved-email", {
                adminEmail: candidate.event.contact_email || ((_candidate$event$orga = candidate.event.organizer) === null || _candidate$event$orga === void 0 ? void 0 : _candidate$event$orga.email),
                candidateName: "".concat(candidate.first_name, " ").concat(candidate.last_name),
                eventName: candidate.event.name,
                profileUrl: "".concat(process.env.APP_URL || 'http://localhost:3000', "/admin/events/").concat(candidate.event._id, "/candidates/").concat(candidate._id)
              });
            case 4:
              _context25.n = 6;
              break;
            case 5:
              _context25.p = 5;
              _t25 = _context25.v;
              // Log error but don't fail the operation
              console.error("Failed to notify admins of profile completion: ".concat(_t25.message));
            case 6:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 5]]);
      }));
      function notifyAdminsOfProfileCompletion(_x34) {
        return _notifyAdminsOfProfileCompletion.apply(this, arguments);
      }
      return notifyAdminsOfProfileCompletion;
    }()
    /**
     * Generate temporary password for new candidates
     * @returns {string} - Temporary password
     */
    )
  }, {
    key: "generateTemporaryPassword",
    value: function generateTemporaryPassword() {
      // Generate a secure random password: 12 characters with mixed case, numbers, and symbols
      var length = 12;
      var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      var password = "";
      for (var i = 0; i < length; i++) {
        var randomIndex = _crypto["default"].randomInt(0, charset.length);
        password += charset[randomIndex];
      }
      return password;
    }

    /**
     * Generate unique candidate code
     * @returns {Promise<string>} - Unique candidate code
     */
  }, {
    key: "generateUniqueCandidateCode",
    value: (function () {
      var _generateUniqueCandidateCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
        var code, exists, random, existing;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              exists = true;
            case 1:
              if (!exists) {
                _context26.n = 3;
                break;
              }
              // Generate format: CAN-XXXXXX (6 random alphanumeric characters)
              random = _crypto["default"].randomBytes(3).toString("hex").toUpperCase();
              code = "CAN-".concat(random);

              // Check if exists
              _context26.n = 2;
              return this.repository.findByCandidateCode(code);
            case 2:
              existing = _context26.v;
              exists = !!existing;
              _context26.n = 1;
              break;
            case 3:
              return _context26.a(2, code);
          }
        }, _callee26, this);
      }));
      function generateUniqueCandidateCode() {
        return _generateUniqueCandidateCode.apply(this, arguments);
      }
      return generateUniqueCandidateCode;
    }()
    /**
     * Generate unique slug for candidate
     * @param {string} baseName - Base name for slug
     * @returns {Promise<string>} - Unique slug
     */
    )
  }, {
    key: "generateUniqueSlug",
    value: (function () {
      var _generateUniqueSlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(baseName) {
        var slug, exists, counter, testSlug, existing;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              slug = baseName.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
              exists = true;
              counter = 0;
            case 1:
              if (!exists) {
                _context27.n = 3;
                break;
              }
              testSlug = counter > 0 ? "".concat(slug, "-").concat(counter) : slug;
              _context27.n = 2;
              return this.repository.findOne({
                slug: testSlug
              });
            case 2:
              existing = _context27.v;
              if (!existing) {
                slug = testSlug;
                exists = false;
              } else {
                counter++;
              }
              _context27.n = 1;
              break;
            case 3:
              return _context27.a(2, slug);
          }
        }, _callee27, this);
      }));
      function generateUniqueSlug(_x35) {
        return _generateUniqueSlug.apply(this, arguments);
      }
      return generateUniqueSlug;
    }() // ==================== STATISTICS ====================
    /**
     * Get candidate statistics
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Candidate statistics
     */
    )
  }, {
    key: "getCandidateStats",
    value: function () {
      var _getCandidateStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(candidateId) {
        var candidate, VoteRepository, totalVotes, categoryIds, candidatesInCategories, rank, totalCategoryVotes, percentage, thirtyDaysAgo, votesOverTime, _t26;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              _context28.n = 1;
              return this.repository.findById(candidateId, {
                populate: ["event", "categories"]
              });
            case 1:
              candidate = _context28.v;
              if (candidate) {
                _context28.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              _context28.n = 3;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../vote/vote/vote.repository.js"));
              });
            case 3:
              VoteRepository = _context28.v["default"];
              _context28.n = 4;
              return VoteRepository.countForCandidate(candidateId);
            case 4:
              totalVotes = _context28.v;
              // Get all candidates in the same categories to calculate rank
              categoryIds = candidate.categories.map(function (cat) {
                return cat._id || cat;
              }); // Get votes for all candidates in the same categories
              _context28.n = 5;
              return this.repository.model.find({
                categories: {
                  $in: categoryIds
                },
                status: _candidateConstants.STATUS.APPROVED,
                is_published: true,
                event: candidate.event._id || candidate.event
              }).select("_id vote_count").lean().exec();
            case 5:
              candidatesInCategories = _context28.v;
              // Calculate rank (how many candidates have more votes)
              rank = candidatesInCategories.filter(function (c) {
                return c.vote_count > totalVotes;
              }).length + 1; // Calculate percentage of total votes in categories
              totalCategoryVotes = candidatesInCategories.reduce(function (sum, c) {
                return sum + (c.vote_count || 0);
              }, 0);
              percentage = totalCategoryVotes > 0 ? totalVotes / totalCategoryVotes * 100 : 0; // Get votes over time (last 30 days)
              thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              _context28.n = 6;
              return VoteRepository.model.aggregate([{
                $match: {
                  candidate: candidate._id,
                  cast_at: {
                    $gte: thirtyDaysAgo
                  },
                  status: "active"
                }
              }, {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$cast_at"
                    }
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  _id: 1
                }
              }, {
                $project: {
                  _id: 0,
                  date: "$_id",
                  count: 1
                }
              }]);
            case 6:
              votesOverTime = _context28.v;
              return _context28.a(2, {
                total_votes: totalVotes,
                rank: rank,
                percentage: Math.round(percentage * 100) / 100,
                votes_over_time: votesOverTime,
                view_count: candidate.view_count || 0,
                profile_completeness: candidate.profileCompleteness || 0
              });
            case 7:
              _context28.p = 7;
              _t26 = _context28.v;
              throw new Error("Get candidate stats failed: ".concat(_t26.message));
            case 8:
              return _context28.a(2);
          }
        }, _callee28, this, [[0, 7]]);
      }));
      function getCandidateStats(_x36) {
        return _getCandidateStats.apply(this, arguments);
      }
      return getCandidateStats;
    }()
    /**
     * Get candidate vote details
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Vote details
     */
  }, {
    key: "getCandidateVotes",
    value: (function () {
      var _getCandidateVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(candidateId) {
        var VoteRepository, _yield$Promise$all, _yield$Promise$all2, totalVotes, recentVotes, _t27;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              _context29.p = 0;
              _context29.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../vote/vote/vote.repository.js"));
              });
            case 1:
              VoteRepository = _context29.v["default"];
              _context29.n = 2;
              return Promise.all([VoteRepository.countForCandidate(candidateId), VoteRepository.findByCandidate(candidateId, {
                limit: 10,
                sort: {
                  cast_at: -1
                },
                lean: true
              })]);
            case 2:
              _yield$Promise$all = _context29.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              totalVotes = _yield$Promise$all2[0];
              recentVotes = _yield$Promise$all2[1];
              return _context29.a(2, {
                total_votes: totalVotes,
                recent_votes: recentVotes
              });
            case 3:
              _context29.p = 3;
              _t27 = _context29.v;
              throw new Error("Get candidate votes failed: ".concat(_t27.message));
            case 4:
              return _context29.a(2);
          }
        }, _callee29, null, [[0, 3]]);
      }));
      function getCandidateVotes(_x37) {
        return _getCandidateVotes.apply(this, arguments);
      }
      return getCandidateVotes;
    }()
    /**
     * Increment candidate view count
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "incrementViewCount",
    value: (function () {
      var _incrementViewCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(candidateId) {
        var _t28;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              _context30.p = 0;
              _context30.n = 1;
              return this.repository.model.findByIdAndUpdate(candidateId, {
                $inc: {
                  view_count: 1
                }
              }, {
                "new": false
              }).exec();
            case 1:
              _context30.n = 3;
              break;
            case 2:
              _context30.p = 2;
              _t28 = _context30.v;
              // Log error but don't fail the operation
              console.error("Failed to increment view count: ".concat(_t28.message));
            case 3:
              return _context30.a(2);
          }
        }, _callee30, this, [[0, 2]]);
      }));
      function incrementViewCount(_x38) {
        return _incrementViewCount.apply(this, arguments);
      }
      return incrementViewCount;
    }() // ==================== IMAGE MANAGEMENT ====================
    /**
     * Update candidate profile image
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string} imageUrl - Image URL
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "updateProfileImage",
    value: function () {
      var _updateProfileImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(candidateId, imageUrl) {
        var _FileService, candidate, _t29, _t30;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.p = _context31.n) {
            case 0:
              _context31.p = 0;
              _context31.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 1:
              _FileService = _context31.v["default"];
              _context31.n = 2;
              return this.repository.findById(candidateId);
            case 2:
              candidate = _context31.v;
              if (candidate) {
                _context31.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              if (!candidate.profile_image) {
                _context31.n = 7;
                break;
              }
              _context31.p = 4;
              _context31.n = 5;
              return _FileService.deleteFile(candidate.profile_image);
            case 5:
              _context31.n = 7;
              break;
            case 6:
              _context31.p = 6;
              _t29 = _context31.v;
              console.error("Failed to delete old profile image:", _t29.message);
            case 7:
              _context31.n = 8;
              return this.repository.updateById(candidateId, {
                profile_image: imageUrl
              });
            case 8:
              return _context31.a(2, _context31.v);
            case 9:
              _context31.p = 9;
              _t30 = _context31.v;
              throw new Error("Update profile image failed: ".concat(_t30.message));
            case 10:
              return _context31.a(2);
          }
        }, _callee31, this, [[4, 6], [0, 9]]);
      }));
      function updateProfileImage(_x39, _x40) {
        return _updateProfileImage.apply(this, arguments);
      }
      return updateProfileImage;
    }()
    /**
     * Delete candidate profile image
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @returns {Promise<Object>} - Updated candidate
     */
  }, {
    key: "deleteProfileImage",
    value: (function () {
      var _deleteProfileImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(candidateId) {
        var _FileService2, candidate, _t31, _t32;
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.p = _context32.n) {
            case 0:
              _context32.p = 0;
              _context32.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 1:
              _FileService2 = _context32.v["default"];
              _context32.n = 2;
              return this.repository.findById(candidateId);
            case 2:
              candidate = _context32.v;
              if (candidate) {
                _context32.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              if (!candidate.profile_image) {
                _context32.n = 7;
                break;
              }
              _context32.p = 4;
              _context32.n = 5;
              return _FileService2.deleteFile(candidate.profile_image);
            case 5:
              _context32.n = 7;
              break;
            case 6:
              _context32.p = 6;
              _t31 = _context32.v;
              console.error("Failed to delete profile image file:", _t31.message);
            case 7:
              _context32.n = 8;
              return this.repository.updateById(candidateId, {
                profile_image: null
              });
            case 8:
              return _context32.a(2, _context32.v);
            case 9:
              _context32.p = 9;
              _t32 = _context32.v;
              throw new Error("Delete profile image failed: ".concat(_t32.message));
            case 10:
              return _context32.a(2);
          }
        }, _callee32, this, [[4, 6], [0, 9]]);
      }));
      function deleteProfileImage(_x41) {
        return _deleteProfileImage.apply(this, arguments);
      }
      return deleteProfileImage;
    }()
    /**
     * Update candidate cover image
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string} imageUrl - Image URL
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "updateCoverImage",
    value: (function () {
      var _updateCoverImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(candidateId, imageUrl) {
        var _FileService3, candidate, _t33, _t34;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.p = _context33.n) {
            case 0:
              _context33.p = 0;
              _context33.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 1:
              _FileService3 = _context33.v["default"];
              _context33.n = 2;
              return this.repository.findById(candidateId);
            case 2:
              candidate = _context33.v;
              if (candidate) {
                _context33.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              if (!candidate.cover_image) {
                _context33.n = 7;
                break;
              }
              _context33.p = 4;
              _context33.n = 5;
              return _FileService3.deleteFile(candidate.cover_image);
            case 5:
              _context33.n = 7;
              break;
            case 6:
              _context33.p = 6;
              _t33 = _context33.v;
              console.error("Failed to delete old cover image:", _t33.message);
            case 7:
              _context33.n = 8;
              return this.repository.updateById(candidateId, {
                cover_image: imageUrl
              });
            case 8:
              return _context33.a(2, _context33.v);
            case 9:
              _context33.p = 9;
              _t34 = _context33.v;
              throw new Error("Update cover image failed: ".concat(_t34.message));
            case 10:
              return _context33.a(2);
          }
        }, _callee33, this, [[4, 6], [0, 9]]);
      }));
      function updateCoverImage(_x42, _x43) {
        return _updateCoverImage.apply(this, arguments);
      }
      return updateCoverImage;
    }()
    /**
     * Add images to candidate gallery
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {Array<string>} imageUrls - Array of image URLs
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "addGalleryImages",
    value: (function () {
      var _addGalleryImages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(candidateId, imageUrls) {
        var candidate, currentGallery, updatedGallery, _t35;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.p = _context34.n) {
            case 0:
              _context34.p = 0;
              _context34.n = 1;
              return this.repository.findById(candidateId);
            case 1:
              candidate = _context34.v;
              if (candidate) {
                _context34.n = 2;
                break;
              }
              throw new Error("Candidate not found");
            case 2:
              currentGallery = candidate.gallery || [];
              updatedGallery = [].concat(_toConsumableArray(currentGallery), _toConsumableArray(imageUrls));
              _context34.n = 3;
              return this.repository.updateById(candidateId, {
                gallery: updatedGallery
              });
            case 3:
              return _context34.a(2, _context34.v);
            case 4:
              _context34.p = 4;
              _t35 = _context34.v;
              throw new Error("Add gallery images failed: ".concat(_t35.message));
            case 5:
              return _context34.a(2);
          }
        }, _callee34, this, [[0, 4]]);
      }));
      function addGalleryImages(_x44, _x45) {
        return _addGalleryImages.apply(this, arguments);
      }
      return addGalleryImages;
    }()
    /**
     * Remove image from candidate gallery
     * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
     * @param {string} imageUrl - Image URL to remove
     * @returns {Promise<Object>} - Updated candidate
     */
    )
  }, {
    key: "removeGalleryImage",
    value: (function () {
      var _removeGalleryImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(candidateId, imageUrl) {
        var _FileService4, candidate, updatedGallery, _t36, _t37;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.p = _context35.n) {
            case 0:
              _context35.p = 0;
              _context35.n = 1;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 1:
              _FileService4 = _context35.v["default"];
              _context35.n = 2;
              return this.repository.findById(candidateId);
            case 2:
              candidate = _context35.v;
              if (candidate) {
                _context35.n = 3;
                break;
              }
              throw new Error("Candidate not found");
            case 3:
              // Remove image from gallery array
              updatedGallery = (candidate.gallery || []).filter(function (img) {
                return img !== imageUrl;
              }); // Delete the image file
              _context35.p = 4;
              _context35.n = 5;
              return _FileService4.deleteFile(imageUrl);
            case 5:
              _context35.n = 7;
              break;
            case 6:
              _context35.p = 6;
              _t36 = _context35.v;
              console.error("Failed to delete gallery image file:", _t36.message);
            case 7:
              _context35.n = 8;
              return this.repository.updateById(candidateId, {
                gallery: updatedGallery
              });
            case 8:
              return _context35.a(2, _context35.v);
            case 9:
              _context35.p = 9;
              _t37 = _context35.v;
              throw new Error("Remove gallery image failed: ".concat(_t37.message));
            case 10:
              return _context35.a(2);
          }
        }, _callee35, this, [[4, 6], [0, 9]]);
      }));
      function removeGalleryImage(_x46, _x47) {
        return _removeGalleryImage.apply(this, arguments);
      }
      return removeGalleryImage;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new CandidateService();