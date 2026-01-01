"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _candidateConstants = require("../../utils/constants/candidate.constants.js");
var _authHelper = require("../../utils/helpers/auth.helper.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * The candidate model definition for the candidate module
 */
var Candidate = /*#__PURE__*/function (_BaseModel) {
  function Candidate() {
    var _this;
    _classCallCheck(this, Candidate);
    var schemaDefinition = {
      first_name: {
        type: String,
        required: true,
        trim: true
      },
      last_name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
      password_hash: {
        type: String,
        required: true,
        select: false // Don't include in queries by default
      },
      candidate_code: {
        type: String,
        unique: true,
        uppercase: true,
        index: true
      },
      phone_number: {
        type: String,
        required: false,
        trim: true
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      },
      bio: {
        type: String,
        trim: true
      },
      profile_image: {
        type: String,
        "default": null
      },
      cover_image: {
        type: String,
        "default": null
      },
      gallery: {
        type: [String],
        "default": []
      },
      video_url: {
        type: String,
        trim: true
      },
      projects: {
        type: [{
          title: {
            type: String,
            required: true,
            trim: true
          },
          description: {
            type: String,
            trim: true
          },
          url: {
            type: String,
            trim: true
          },
          image: {
            type: String
          },
          date: {
            type: Date
          }
        }],
        "default": []
      },
      skills: {
        type: [String],
        "default": []
      },
      education: {
        type: [{
          institution: {
            type: String,
            required: true,
            trim: true
          },
          qualification: {
            type: String,
            required: true,
            trim: true
          },
          field: {
            type: String,
            trim: true
          },
          start_date: {
            type: Date
          },
          end_date: {
            type: Date
          },
          current: {
            type: Boolean,
            "default": false
          },
          description: {
            type: String,
            trim: true
          }
        }],
        "default": []
      },
      experience: {
        type: [{
          company: {
            type: String,
            required: true,
            trim: true
          },
          position: {
            type: String,
            required: true,
            trim: true
          },
          start_date: {
            type: Date
          },
          end_date: {
            type: Date
          },
          current: {
            type: Boolean,
            "default": false
          },
          description: {
            type: String,
            trim: true
          }
        }],
        "default": []
      },
      achievements: {
        type: [{
          title: {
            type: String,
            required: true,
            trim: true
          },
          description: {
            type: String,
            trim: true
          },
          date: {
            type: Date
          },
          organization: {
            type: String,
            trim: true
          }
        }],
        "default": []
      },
      social_links: {
        type: {
          linkedin: String,
          twitter: String,
          github: String,
          portfolio: String,
          facebook: String,
          instagram: String
        },
        "default": {}
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
      },
      categories: [{
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Category",
        required: true
      }],
      admin_verified_categories: [{
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Category"
      }],
      profile_update_history: [{
        updated_at: {
          type: Date,
          "default": Date.now
        },
        updated_by_candidate: {
          type: Boolean,
          "default": false
        },
        reason: {
          type: String,
          trim: true
        },
        fields_changed: {
          type: [String],
          "default": []
        },
        previous_status: {
          type: String
        },
        new_status: {
          type: String
        }
      }],
      status: {
        type: String,
        required: true,
        "enum": Object.values(_candidateConstants.STATUS),
        "default": _candidateConstants.STATUS.PENDING,
        index: true
      },
      is_featured: {
        type: Boolean,
        "default": false,
        index: true
      },
      is_published: {
        type: Boolean,
        "default": false,
        index: true
      },
      display_order: {
        type: Number,
        "default": 0
      },
      vote_count: {
        type: Number,
        "default": 0,
        min: 0,
        index: true
      },
      view_count: {
        type: Number,
        "default": 0,
        min: 0
      },
      why_nominate_me: {
        type: String,
        trim: true
      },
      impact_statement: {
        type: String,
        trim: true
      },
      endorsements: {
        type: [{
          name: {
            type: String,
            required: true,
            trim: true
          },
          position: {
            type: String,
            trim: true
          },
          message: {
            type: String,
            trim: true
          },
          image: {
            type: String
          }
        }],
        "default": []
      },
      nomination_date: {
        type: Date,
        "default": Date.now
      },
      approval_date: {
        type: Date,
        "default": null
      },
      rejection_reason: {
        type: String,
        trim: true
      },
      tags: {
        type: [String],
        "default": []
      },
      metadata: {
        type: Map,
        of: String,
        "default": {}
      },
      nomination_submission: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "FormSubmission",
        "default": null
      },
      profile_completed_at: {
        type: Date,
        "default": null
      },
      published_at: {
        type: Date,
        "default": null
      },
      last_login: {
        type: Date,
        "default": null
      },
      password_reset_token: {
        type: String,
        select: false
      },
      password_reset_expires: {
        type: Date,
        select: false
      },
      created_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        "default": null // Nullable for candidates created from public nominations
      },
      updated_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        "default": null
      }
    };
    var options = {
      softDelete: true,
      timestamps: true
    };
    _this = _callSuper(this, Candidate, [schemaDefinition, options]);

    // Create indexes
    _this.schema.index({
      event: 1,
      categories: 1
    });
    _this.schema.index({
      event: 1,
      status: 1
    });
    _this.schema.index({
      event: 1,
      is_published: 1
    });
    _this.schema.index({
      slug: 1
    }, {
      unique: true,
      sparse: true
    });
    _this.schema.index({
      email: 1,
      event: 1
    }, {
      unique: true
    });
    _this.schema.index({
      first_name: 1,
      last_name: 1
    });
    _this.schema.index({
      vote_count: -1
    });
    _this.schema.index({
      tags: 1
    });

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var CandidateModel, count, eventIdShort, baseSlug, adminCategoryIds, currentCategoryIds, removedAdminCategories, uniqueCategories, _iterator, _step, edu, _iterator2, _step2, exp, _t, _t2, _t3;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              if (!(!this.candidate_code && this.event)) {
                _context.n = 2;
                break;
              }
              CandidateModel = this.constructor;
              _context.n = 1;
              return CandidateModel.countDocuments({
                event: this.event
              });
            case 1:
              count = _context.v;
              eventIdShort = this.event.toString().slice(-4).toUpperCase();
              this.candidate_code = "CAN-".concat(eventIdShort, "-").concat(String(count + 1).padStart(4, "0"));
            case 2:
              // Generate slug if not provided
              if (!this.slug && this.first_name && this.last_name) {
                baseSlug = "".concat(this.first_name, "-").concat(this.last_name).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim(); // Add event ID to make slug unique per event
                this.slug = "".concat(baseSlug, "-").concat(this.event.toString().slice(-6));
              }

              // Set approval date when status changes to approved
              if (this.isModified("status") && this.status === _candidateConstants.STATUS.APPROVED && !this.approval_date) {
                this.approval_date = new Date();
                // Sync admin-verified categories on first approval
                if (!this.admin_verified_categories || this.admin_verified_categories.length === 0) {
                  this.admin_verified_categories = _toConsumableArray(this.categories);
                }
              }

              // Clear rejection reason if status is not rejected
              if (this.isModified("status") && this.status !== _candidateConstants.STATUS.REJECTED) {
                this.rejection_reason = null;
              }

              // Prevent removal of admin-verified categories
              if (this.isModified("categories") && this.admin_verified_categories && this.admin_verified_categories.length > 0) {
                adminCategoryIds = this.admin_verified_categories.map(function (cat) {
                  return cat.toString();
                });
                currentCategoryIds = this.categories.map(function (cat) {
                  return cat.toString();
                }); // Check if any admin-verified category was removed
                removedAdminCategories = adminCategoryIds.filter(function (id) {
                  return !currentCategoryIds.includes(id);
                });
                if (removedAdminCategories.length > 0) {
                  // Re-add admin-verified categories
                  uniqueCategories = _toConsumableArray(new Set([].concat(_toConsumableArray(this.categories), _toConsumableArray(this.admin_verified_categories))));
                  this.categories = uniqueCategories;
                }
              }

              // Validate that candidate has at least one category
              if (!(this.categories.length === 0)) {
                _context.n = 3;
                break;
              }
              throw new Error("Candidate must belong to at least one category");
            case 3:
              if (!(this.education && this.education.length > 0)) {
                _context.n = 10;
                break;
              }
              _iterator = _createForOfIteratorHelper(this.education);
              _context.p = 4;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context.n = 7;
                break;
              }
              edu = _step.value;
              if (!(edu.start_date && edu.end_date && !edu.current)) {
                _context.n = 6;
                break;
              }
              if (!(edu.end_date <= edu.start_date)) {
                _context.n = 6;
                break;
              }
              throw new Error("Education end date must be after start date");
            case 6:
              _context.n = 5;
              break;
            case 7:
              _context.n = 9;
              break;
            case 8:
              _context.p = 8;
              _t = _context.v;
              _iterator.e(_t);
            case 9:
              _context.p = 9;
              _iterator.f();
              return _context.f(9);
            case 10:
              if (!(this.experience && this.experience.length > 0)) {
                _context.n = 17;
                break;
              }
              _iterator2 = _createForOfIteratorHelper(this.experience);
              _context.p = 11;
              _iterator2.s();
            case 12:
              if ((_step2 = _iterator2.n()).done) {
                _context.n = 14;
                break;
              }
              exp = _step2.value;
              if (!(exp.start_date && exp.end_date && !exp.current)) {
                _context.n = 13;
                break;
              }
              if (!(exp.end_date <= exp.start_date)) {
                _context.n = 13;
                break;
              }
              throw new Error("Experience end date must be after start date");
            case 13:
              _context.n = 12;
              break;
            case 14:
              _context.n = 16;
              break;
            case 15:
              _context.p = 15;
              _t2 = _context.v;
              _iterator2.e(_t2);
            case 16:
              _context.p = 16;
              _iterator2.f();
              return _context.f(16);
            case 17:
              if (!this.isModified("password_hash")) {
                _context.n = 19;
                break;
              }
              _context.n = 18;
              return _authHelper.AuthHelpers.hashPassword(this.password_hash);
            case 18:
              this.password_hash = _context.v;
            case 19:
              next();
              _context.n = 21;
              break;
            case 20:
              _context.p = 20;
              _t3 = _context.v;
              next(_t3);
            case 21:
              return _context.a(2);
          }
        }, _callee, this, [[11, 15, 16, 17], [4, 8, 9, 10], [0, 20]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Virtual: Full name
    _this.schema.virtual("full_name").get(function () {
      return "".concat(this.first_name, " ").concat(this.last_name);
    });

    // Virtual: Initials
    _this.schema.virtual("initials").get(function () {
      return "".concat(this.first_name[0]).concat(this.last_name[0]).toUpperCase();
    });

    // Virtual: Is approved
    _this.schema.virtual("isApproved").get(function () {
      return this.status === _candidateConstants.STATUS.APPROVED;
    });

    // Virtual: Is pending
    _this.schema.virtual("isPending").get(function () {
      return this.status === _candidateConstants.STATUS.PENDING;
    });

    // Virtual: Is rejected
    _this.schema.virtual("isRejected").get(function () {
      return this.status === _candidateConstants.STATUS.REJECTED;
    });

    // Virtual: Can receive votes
    _this.schema.virtual("canReceiveVotes").get(function () {
      return this.status === _candidateConstants.STATUS.APPROVED && this.is_published;
    });

    // Virtual: Profile completion percentage
    _this.schema.virtual("profileCompleteness").get(function () {
      var completed = 0;
      var total = 0;

      // Required fields (always count)
      total += 5;
      if (this.first_name) completed++;
      if (this.last_name) completed++;
      if (this.email) completed++;
      if (this.bio) completed++;
      if (this.profile_image) completed++;

      // Optional but recommended fields
      total += 8;
      if (this.phone_number) completed++;
      if (this.why_nominate_me) completed++;
      if (this.impact_statement) completed++;
      if (this.skills && this.skills.length > 0) completed++;
      if (this.projects && this.projects.length > 0) completed++;
      if (this.education && this.education.length > 0) completed++;
      if (this.experience && this.experience.length > 0) completed++;
      if (this.achievements && this.achievements.length > 0) completed++;
      return Math.round(completed / total * 100);
    });

    // Virtual: Years of experience
    _this.schema.virtual("yearsOfExperience").get(function () {
      if (!this.experience || this.experience.length === 0) return 0;
      var totalMonths = 0;
      var now = new Date();
      var _iterator3 = _createForOfIteratorHelper(this.experience),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var exp = _step3.value;
          if (exp.start_date) {
            var endDate = exp.current ? now : exp.end_date || now;
            var months = (endDate - exp.start_date) / (1000 * 60 * 60 * 24 * 30);
            totalMonths += months;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return Math.round(totalMonths / 12 * 10) / 10;
    });

    // Virtual: Current position
    _this.schema.virtual("currentPosition").get(function () {
      if (!this.experience || this.experience.length === 0) return null;
      var current = this.experience.find(function (exp) {
        return exp.current;
      });
      return current ? "".concat(current.position, " at ").concat(current.company) : null;
    });

    // Virtual: Days since nomination
    _this.schema.virtual("daysSinceNomination").get(function () {
      if (!this.nomination_date) return 0;
      var now = new Date();
      return Math.floor((now - this.nomination_date) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Has social links
    _this.schema.virtual("hasSocialLinks").get(function () {
      if (!this.social_links) return false;
      return Object.values(this.social_links).some(function (link) {
        return link && typeof link === "string" && link.trim() !== "";
      });
    });

    // Virtual: Project count
    _this.schema.virtual("projectCount").get(function () {
      return this.projects ? this.projects.length : 0;
    });

    // Virtual: Endorsement count
    _this.schema.virtual("endorsementCount").get(function () {
      return this.endorsements ? this.endorsements.length : 0;
    });

    // Static method: Find by event
    _this.schema.statics.findByEvent = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(eventId) {
        var options,
          query,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              query = this.find({
                event: eventId
              }).sort({
                display_order: 1,
                vote_count: -1
              });
              if (options.populate) query.populate(options.populate);
              _context2.n = 1;
              return query.exec();
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2, this);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    // Static method: Find by category
    _this.schema.statics.findByCategory = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(categoryId) {
        var options,
          query,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              query = this.find({
                categories: categoryId
              }).sort({
                display_order: 1,
                vote_count: -1
              });
              if (options.populate) query.populate(options.populate);
              _context3.n = 1;
              return query.exec();
            case 1:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    // Static method: Find approved candidates
    _this.schema.statics.findApproved = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var eventId,
        options,
        filter,
        query,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            eventId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            filter = {
              status: _candidateConstants.STATUS.APPROVED,
              is_published: true
            };
            if (eventId) filter.event = eventId;
            query = this.find(filter).sort({
              vote_count: -1
            });
            if (options.populate) query.populate(options.populate);
            _context4.n = 1;
            return query.exec();
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4, this);
    }));

    // Static method: Find pending candidates
    _this.schema.statics.findPending = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var eventId,
        options,
        filter,
        query,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            eventId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
            options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            filter = {
              status: _candidateConstants.STATUS.PENDING
            };
            if (eventId) filter.event = eventId;
            query = this.find(filter).sort({
              nomination_date: 1
            });
            if (options.populate) query.populate(options.populate);
            _context5.n = 1;
            return query.exec();
          case 1:
            return _context5.a(2, _context5.v);
        }
      }, _callee5, this);
    }));

    // Static method: Find featured candidates
    _this.schema.statics.findFeatured = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var eventId,
        limit,
        options,
        filter,
        query,
        _args6 = arguments;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            eventId = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : null;
            limit = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 5;
            options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
            filter = {
              is_featured: true,
              is_published: true,
              status: _candidateConstants.STATUS.APPROVED
            };
            if (eventId) filter.event = eventId;
            query = this.find(filter).sort({
              vote_count: -1
            }).limit(limit);
            if (options.populate) query.populate(options.populate);
            _context6.n = 1;
            return query.exec();
          case 1:
            return _context6.a(2, _context6.v);
        }
      }, _callee6, this);
    }));

    // Instance method: Approve candidate
    _this.schema.methods.approve = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            if (!(this.status === _candidateConstants.STATUS.APPROVED)) {
              _context7.n = 1;
              break;
            }
            throw new Error("Candidate is already approved");
          case 1:
            this.status = _candidateConstants.STATUS.APPROVED;
            this.approval_date = new Date();
            this.rejection_reason = null;

            // Sync admin-verified categories
            this.admin_verified_categories = _toConsumableArray(this.categories);
            _context7.n = 2;
            return this.save();
          case 2:
            return _context7.a(2, _context7.v);
        }
      }, _callee7, this);
    }));

    // Instance method: Request re-approval after profile update
    _this.schema.methods.requestReApproval = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var changedFields,
        reason,
        previousStatus,
        _args8 = arguments;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            changedFields = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : [];
            reason = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : "Profile update";
            previousStatus = this.status; // Set status to profile update pending
            this.status = _candidateConstants.STATUS.PROFILE_UPDATE_PENDING;
            this.is_published = false;

            // Track update in history
            this.profile_update_history.push({
              updated_at: new Date(),
              updated_by_candidate: true,
              reason: reason,
              fields_changed: changedFields,
              previous_status: previousStatus,
              new_status: _candidateConstants.STATUS.PROFILE_UPDATE_PENDING
            });
            _context8.n = 1;
            return this.save();
          case 1:
            return _context8.a(2, _context8.v);
        }
      }, _callee8, this);
    }));

    // Instance method: Reject candidate
    _this.schema.methods.reject = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(reason) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!(this.status === _candidateConstants.STATUS.REJECTED)) {
                _context9.n = 1;
                break;
              }
              throw new Error("Candidate is already rejected");
            case 1:
              this.status = _candidateConstants.STATUS.REJECTED;
              this.rejection_reason = reason;
              this.approval_date = null;
              _context9.n = 2;
              return this.save();
            case 2:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      return function (_x4) {
        return _ref9.apply(this, arguments);
      };
    }();

    // Instance method: Increment vote count
    _this.schema.methods.incrementVotes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var count,
        _args0 = arguments;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            count = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : 1;
            if (this.canReceiveVotes) {
              _context0.n = 1;
              break;
            }
            throw new Error("Candidate cannot receive votes");
          case 1:
            this.vote_count += count;
            _context0.n = 2;
            return this.save();
          case 2:
            return _context0.a(2, _context0.v);
        }
      }, _callee0, this);
    }));

    // Instance method: Decrement vote count
    _this.schema.methods.decrementVotes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var count,
        _args1 = arguments;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            count = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : 1;
            if (!(this.vote_count <= 0)) {
              _context1.n = 1;
              break;
            }
            throw new Error("Vote count cannot be negative");
          case 1:
            this.vote_count = Math.max(0, this.vote_count - count);
            _context1.n = 2;
            return this.save();
          case 2:
            return _context1.a(2, _context1.v);
        }
      }, _callee1, this);
    }));

    // Instance method: Increment view count
    _this.schema.methods.incrementViews = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            this.view_count += 1;
            _context10.n = 1;
            return this.save();
          case 1:
            return _context10.a(2, _context10.v);
        }
      }, _callee10, this);
    }));

    // Instance method: Add to category
    _this.schema.methods.addToCategory = /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(categoryId) {
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              if (!this.categories.includes(categoryId)) {
                _context11.n = 1;
                break;
              }
              throw new Error("Candidate already in this category");
            case 1:
              this.categories.push(categoryId);
              _context11.n = 2;
              return this.save();
            case 2:
              return _context11.a(2, _context11.v);
          }
        }, _callee11, this);
      }));
      return function (_x5) {
        return _ref11.apply(this, arguments);
      };
    }();

    // Instance method: Remove from category (only non-admin-verified)
    _this.schema.methods.removeFromCategory = /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(categoryId) {
        var isAdminVerified, index;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              if (!(this.categories.length <= 1)) {
                _context12.n = 1;
                break;
              }
              throw new Error("Candidate must belong to at least one category");
            case 1:
              // Check if category is admin-verified
              isAdminVerified = this.admin_verified_categories.some(function (cat) {
                return cat.toString() === categoryId.toString();
              });
              if (!isAdminVerified) {
                _context12.n = 2;
                break;
              }
              throw new Error("Cannot remove admin-verified category. Please contact administrator.");
            case 2:
              index = this.categories.findIndex(function (cat) {
                return cat.toString() === categoryId.toString();
              });
              if (!(index === -1)) {
                _context12.n = 3;
                break;
              }
              throw new Error("Candidate not in this category");
            case 3:
              this.categories.splice(index, 1);
              _context12.n = 4;
              return this.save();
            case 4:
              return _context12.a(2, _context12.v);
          }
        }, _callee12, this);
      }));
      return function (_x6) {
        return _ref12.apply(this, arguments);
      };
    }();

    // Instance method: Update login timestamp
    _this.schema.methods.updateLastLogin = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            this.last_login = new Date();
            _context13.n = 1;
            return this.save();
          case 1:
            return _context13.a(2, _context13.v);
        }
      }, _callee13, this);
    }));

    // Ensure virtuals are included in JSON and Object outputs
    _this.schema.set("toJSON", {
      virtuals: true
    });
    _this.schema.set("toObject", {
      virtuals: true
    });
    return _this;
  }
  _inherits(Candidate, _BaseModel);
  return _createClass(Candidate);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Candidate().getModel("Candidate");