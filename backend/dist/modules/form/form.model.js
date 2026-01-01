"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _formConstants = require("../../utils/constants/form.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
 * The form model definition for the form module
 * Handles dynamic forms for nominations and event registrations
 */
var Form = /*#__PURE__*/function (_BaseModel) {
  function Form() {
    var _this;
    _classCallCheck(this, Form);
    var schemaDefinition = {
      name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
      },
      form_type: {
        type: String,
        required: true,
        "enum": Object.values(_formConstants.FORM_TYPE),
        index: true
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
      },
      categories: [{
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Category"
      }],
      fields: [{
        field_id: {
          type: String,
          required: true
        },
        label: {
          type: String,
          required: true,
          trim: true
        },
        field_type: {
          type: String,
          required: true,
          "enum": Object.values(_formConstants.FIELD_TYPE)
        },
        placeholder: {
          type: String,
          trim: true
        },
        help_text: {
          type: String,
          trim: true
        },
        default_value: {
          type: _mongoose["default"].Schema.Types.Mixed
        },
        options: [{
          label: String,
          value: String
        }],
        validation: {
          required: {
            type: Boolean,
            "default": false
          },
          min_length: Number,
          max_length: Number,
          min_value: Number,
          max_value: Number,
          pattern: String,
          custom_message: String
        },
        conditional: {
          show_if: {
            field_id: String,
            operator: {
              type: String,
              "enum": ["equals", "not_equals", "contains", "greater_than", "less_than"]
            },
            value: _mongoose["default"].Schema.Types.Mixed
          }
        },
        display_order: {
          type: Number,
          "default": 0
        },
        is_duplicate_check_field: {
          type: Boolean,
          "default": false
        },
        is_identifier_field: {
          type: Boolean,
          "default": false
        },
        metadata: {
          type: Map,
          of: String,
          "default": {}
        }
      }],
      duplicate_detection: {
        enabled: {
          type: Boolean,
          "default": true
        },
        method: {
          type: String,
          "enum": Object.values(_formConstants.DUPLICATE_CHECK_METHOD),
          "default": _formConstants.DUPLICATE_CHECK_METHOD.FIELD_SIMILARITY
        },
        threshold: {
          type: Number,
          min: 0,
          max: 100,
          "default": 85
        },
        check_fields: [String],
        auto_flag: {
          type: Boolean,
          "default": true
        }
      },
      multi_category_nomination: {
        enabled: {
          type: Boolean,
          "default": false
        },
        max_categories: {
          type: Number,
          min: 1,
          "default": 3
        },
        require_same_nominee: {
          type: Boolean,
          "default": true
        }
      },
      candidate_field_mapping: {
        enabled: {
          type: Boolean,
          "default": false
        },
        mappings: [{
          form_field_id: {
            type: String,
            required: true
          },
          candidate_field: {
            type: String,
            required: true,
            "enum": ["first_name", "last_name", "email", "phone_number", "bio", "profile_image", "cover_image", "video_url", "skills", "social_links.linkedin", "social_links.twitter", "social_links.github", "social_links.portfolio", "social_links.facebook", "social_links.instagram"]
          },
          transform: {
            type: String,
            "enum": ["none", "uppercase", "lowercase", "trim", "capitalize"],
            "default": "none"
          },
          is_required: {
            type: Boolean,
            "default": false
          }
        }],
        "default": [],
        auto_create_candidate: {
          type: Boolean,
          "default": true
        },
        send_welcome_email: {
          type: Boolean,
          "default": true
        }
      },
      settings: {
        allow_multiple_submissions: {
          type: Boolean,
          "default": false
        },
        require_authentication: {
          type: Boolean,
          "default": false
        },
        capture_ip: {
          type: Boolean,
          "default": true
        },
        enable_captcha: {
          type: Boolean,
          "default": true
        },
        auto_approve: {
          type: Boolean,
          "default": false
        },
        send_confirmation_email: {
          type: Boolean,
          "default": true
        },
        confirmation_email_template: String,
        redirect_url: String,
        custom_css: String
      },
      submission_limits: {
        max_submissions: {
          type: Number,
          "default": null
        },
        max_submissions_per_user: {
          type: Number,
          "default": 1
        },
        max_submissions_per_ip: {
          type: Number,
          "default": 3
        },
        rate_limit: {
          window_minutes: {
            type: Number,
            "default": 60
          },
          max_requests: {
            type: Number,
            "default": 10
          }
        }
      },
      status: {
        type: String,
        "enum": Object.values(_formConstants.FORM_STATUS),
        "default": _formConstants.FORM_STATUS.DRAFT,
        index: true
      },
      open_date: {
        type: Date,
        "default": null
      },
      close_date: {
        type: Date,
        "default": null
      },
      is_published: {
        type: Boolean,
        "default": false,
        index: true
      },
      total_submissions: {
        type: Number,
        "default": 0,
        min: 0
      },
      approved_submissions: {
        type: Number,
        "default": 0,
        min: 0
      },
      rejected_submissions: {
        type: Number,
        "default": 0,
        min: 0
      },
      duplicate_submissions: {
        type: Number,
        "default": 0,
        min: 0
      },
      metadata: {
        type: Map,
        of: String,
        "default": {}
      },
      created_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    _this = _callSuper(this, Form, [schemaDefinition, options]);

    // Create indexes
    _this.schema.index({
      event: 1,
      form_type: 1
    });
    _this.schema.index({
      event: 1,
      status: 1
    });
    _this.schema.index({
      slug: 1
    }, {
      unique: true,
      sparse: true
    });
    _this.schema.index({
      is_published: 1,
      status: 1
    });
    _this.schema.index({
      open_date: 1,
      close_date: 1
    });

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var baseSlug, Category, categories, _iterator, _step, category, checkFields, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Generate slug if not provided
              if (!this.slug && this.name) {
                baseSlug = this.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
                this.slug = "".concat(baseSlug, "-").concat(this.event.toString().slice(-6));
              }

              // Validate categories belong to event
              if (!(this.categories && this.categories.length > 0)) {
                _context.n = 8;
                break;
              }
              Category = _mongoose["default"].model("Category");
              _context.n = 1;
              return Category.find({
                _id: {
                  $in: this.categories
                }
              });
            case 1:
              categories = _context.v;
              _iterator = _createForOfIteratorHelper(categories);
              _context.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context.n = 5;
                break;
              }
              category = _step.value;
              if (!(category.event.toString() !== this.event.toString())) {
                _context.n = 4;
                break;
              }
              throw new Error("All categories must belong to the form's event");
            case 4:
              _context.n = 3;
              break;
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              _iterator.e(_t);
            case 7:
              _context.p = 7;
              _iterator.f();
              return _context.f(7);
            case 8:
              if (!(this.open_date && this.close_date)) {
                _context.n = 9;
                break;
              }
              if (!(this.close_date <= this.open_date)) {
                _context.n = 9;
                break;
              }
              throw new Error("Close date must be after open date");
            case 9:
              // Ensure duplicate check fields are valid
              if (this.duplicate_detection.enabled && this.duplicate_detection.check_fields.length === 0) {
                checkFields = this.fields.filter(function (f) {
                  return f.is_duplicate_check_field;
                }).map(function (f) {
                  return f.field_id;
                });
                if (checkFields.length > 0) {
                  this.duplicate_detection.check_fields = checkFields;
                }
              }

              // Validate multi-category nomination settings
              if (!(this.multi_category_nomination.enabled && this.form_type !== _formConstants.FORM_TYPE.NOMINATION)) {
                _context.n = 10;
                break;
              }
              throw new Error("Multi-category nomination only available for nomination forms");
            case 10:
              // Auto-publish if status is active and not published
              if (this.status === _formConstants.FORM_STATUS.ACTIVE && !this.is_published) {
                this.is_published = true;
              }

              // Auto-close if past close date
              if (this.close_date && new Date() > this.close_date && this.status === _formConstants.FORM_STATUS.ACTIVE) {
                this.status = _formConstants.FORM_STATUS.CLOSED;
              }
              next();
              _context.n = 12;
              break;
            case 11:
              _context.p = 11;
              _t2 = _context.v;
              next(_t2);
            case 12:
              return _context.a(2);
          }
        }, _callee, this, [[2, 6, 7, 8], [0, 11]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Virtual: Is open
    _this.schema.virtual("isOpen").get(function () {
      if (this.status !== _formConstants.FORM_STATUS.ACTIVE || !this.is_published) return false;
      var now = new Date();
      if (this.open_date && now < this.open_date) return false;
      if (this.close_date && now > this.close_date) return false;

      // Check submission limits
      if (this.submission_limits.max_submissions && this.total_submissions >= this.submission_limits.max_submissions) {
        return false;
      }
      return true;
    });

    // Virtual: Is closed
    _this.schema.virtual("isClosed").get(function () {
      if (this.status === _formConstants.FORM_STATUS.CLOSED) return true;
      var now = new Date();
      if (this.close_date && now > this.close_date) return true;
      if (this.submission_limits.max_submissions && this.total_submissions >= this.submission_limits.max_submissions) {
        return true;
      }
      return false;
    });

    // Virtual: Days until close
    _this.schema.virtual("daysUntilClose").get(function () {
      if (!this.close_date) return null;
      var now = new Date();
      if (this.close_date <= now) return 0;
      return Math.ceil((this.close_date - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Submission rate
    _this.schema.virtual("submissionRate").get(function () {
      if (!this.open_date) return 0;
      var now = new Date();
      var daysSinceOpen = Math.max(1, Math.ceil((now - this.open_date) / (1000 * 60 * 60 * 24)));
      return Math.round(this.total_submissions / daysSinceOpen * 10) / 10;
    });

    // Virtual: Approval rate
    _this.schema.virtual("approvalRate").get(function () {
      if (this.total_submissions === 0) return 0;
      return Math.round(this.approved_submissions / this.total_submissions * 100);
    });

    // Virtual: Duplicate rate
    _this.schema.virtual("duplicateRate").get(function () {
      if (this.total_submissions === 0) return 0;
      return Math.round(this.duplicate_submissions / this.total_submissions * 100);
    });

    // Virtual: Required fields
    _this.schema.virtual("requiredFields").get(function () {
      return this.fields.filter(function (f) {
        return f.validation.required;
      }).map(function (f) {
        return f.field_id;
      });
    });

    // Virtual: Identifier fields
    _this.schema.virtual("identifierFields").get(function () {
      return this.fields.filter(function (f) {
        return f.is_identifier_field;
      }).map(function (f) {
        return f.field_id;
      });
    });

    // Static method: Find forms by event
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
                created_at: -1
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

    // Static method: Find forms by type
    _this.schema.statics.findByType = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(formType) {
        var eventId,
          options,
          filter,
          query,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              eventId = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              filter = {
                form_type: formType
              };
              if (eventId) filter.event = eventId;
              query = this.find(filter).sort({
                created_at: -1
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

    // Static method: Find active forms
    _this.schema.statics.findActive = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var eventId,
        options,
        now,
        filter,
        query,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            eventId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            now = new Date();
            filter = {
              status: _formConstants.FORM_STATUS.ACTIVE,
              is_published: true,
              $or: [{
                open_date: null,
                close_date: null
              }, {
                open_date: {
                  $lte: now
                },
                close_date: {
                  $gte: now
                }
              }, {
                open_date: null,
                close_date: {
                  $gte: now
                }
              }, {
                open_date: {
                  $lte: now
                },
                close_date: null
              }]
            };
            if (eventId) filter.event = eventId;
            query = this.find(filter).sort({
              created_at: -1
            });
            if (options.populate) query.populate(options.populate);
            _context4.n = 1;
            return query.exec();
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4, this);
    }));

    // Static method: Find form by slug
    _this.schema.statics.findBySlug = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(slug) {
        var options,
          query,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              query = this.findOne({
                slug: slug
              });
              if (options.populate) query.populate(options.populate);
              _context5.n = 1;
              return query.exec();
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    // Static method: Get form statistics
    _this.schema.statics.getStatistics = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var _stats$total$, _stats$active$, _stats$draft$, _stats$closed$, _stats$totalSubmissio, _stats$totalApproved$, _stats$totalDuplicate;
      var eventId,
        matchStage,
        _yield$this$aggregate,
        _yield$this$aggregate2,
        stats,
        _args6 = arguments;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            eventId = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : null;
            matchStage = eventId ? {
              event: eventId
            } : {};
            _context6.n = 1;
            return this.aggregate([{
              $match: matchStage
            }, {
              $facet: {
                total: [{
                  $count: "count"
                }],
                active: [{
                  $match: {
                    status: _formConstants.FORM_STATUS.ACTIVE
                  }
                }, {
                  $count: "count"
                }],
                draft: [{
                  $match: {
                    status: _formConstants.FORM_STATUS.DRAFT
                  }
                }, {
                  $count: "count"
                }],
                closed: [{
                  $match: {
                    status: _formConstants.FORM_STATUS.CLOSED
                  }
                }, {
                  $count: "count"
                }],
                byType: [{
                  $group: {
                    _id: "$form_type",
                    count: {
                      $sum: 1
                    }
                  }
                }],
                totalSubmissions: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$total_submissions"
                    }
                  }
                }],
                totalApproved: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$approved_submissions"
                    }
                  }
                }],
                totalDuplicates: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$duplicate_submissions"
                    }
                  }
                }]
              }
            }]);
          case 1:
            _yield$this$aggregate = _context6.v;
            _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
            stats = _yield$this$aggregate2[0];
            return _context6.a(2, {
              total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
              active: (stats === null || stats === void 0 || (_stats$active$ = stats.active[0]) === null || _stats$active$ === void 0 ? void 0 : _stats$active$.count) || 0,
              draft: (stats === null || stats === void 0 || (_stats$draft$ = stats.draft[0]) === null || _stats$draft$ === void 0 ? void 0 : _stats$draft$.count) || 0,
              closed: (stats === null || stats === void 0 || (_stats$closed$ = stats.closed[0]) === null || _stats$closed$ === void 0 ? void 0 : _stats$closed$.count) || 0,
              byType: (stats === null || stats === void 0 ? void 0 : stats.byType) || [],
              totalSubmissions: (stats === null || stats === void 0 || (_stats$totalSubmissio = stats.totalSubmissions[0]) === null || _stats$totalSubmissio === void 0 ? void 0 : _stats$totalSubmissio.total) || 0,
              totalApproved: (stats === null || stats === void 0 || (_stats$totalApproved$ = stats.totalApproved[0]) === null || _stats$totalApproved$ === void 0 ? void 0 : _stats$totalApproved$.total) || 0,
              totalDuplicates: (stats === null || stats === void 0 || (_stats$totalDuplicate = stats.totalDuplicates[0]) === null || _stats$totalDuplicate === void 0 ? void 0 : _stats$totalDuplicate.total) || 0
            });
        }
      }, _callee6, this);
    }));

    // Instance method: Add field
    _this.schema.methods.addField = function (fieldData) {
      var fieldId = fieldData.field_id || "field_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
      this.fields.push(_objectSpread(_objectSpread({}, fieldData), {}, {
        field_id: fieldId,
        display_order: fieldData.display_order || this.fields.length
      }));
      return this.save();
    };

    // Instance method: Remove field
    _this.schema.methods.removeField = function (fieldId) {
      this.fields = this.fields.filter(function (f) {
        return f.field_id !== fieldId;
      });
      return this.save();
    };

    // Instance method: Update field
    _this.schema.methods.updateField = function (fieldId, updates) {
      var fieldIndex = this.fields.findIndex(function (f) {
        return f.field_id === fieldId;
      });
      if (fieldIndex === -1) {
        throw new Error("Field not found");
      }
      this.fields[fieldIndex] = _objectSpread(_objectSpread({}, this.fields[fieldIndex].toObject()), updates);
      return this.save();
    };

    // Instance method: Reorder fields
    _this.schema.methods.reorderFields = function (fieldOrder) {
      var _this2 = this;
      fieldOrder.forEach(function (fieldId, index) {
        var field = _this2.fields.find(function (f) {
          return f.field_id === fieldId;
        });
        if (field) {
          field.display_order = index;
        }
      });
      this.fields.sort(function (a, b) {
        return a.display_order - b.display_order;
      });
      return this.save();
    };

    // Instance method: Increment submission count
    _this.schema.methods.incrementSubmissions = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var status,
        _args7 = arguments;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            status = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : _formConstants.SUBMISSION_STATUS.PENDING;
            this.total_submissions += 1;
            if (status === _formConstants.SUBMISSION_STATUS.APPROVED) {
              this.approved_submissions += 1;
            } else if (status === _formConstants.SUBMISSION_STATUS.REJECTED) {
              this.rejected_submissions += 1;
            } else if (status === _formConstants.SUBMISSION_STATUS.DUPLICATE) {
              this.duplicate_submissions += 1;
            }
            _context7.n = 1;
            return this.save();
          case 1:
            return _context7.a(2, _context7.v);
        }
      }, _callee7, this);
    }));

    // Instance method: Validate submission data
    _this.schema.methods.validateSubmission = function (submissionData) {
      var errors = [];
      this.fields.forEach(function (field) {
        var value = submissionData[field.field_id];

        // Check required fields
        if (field.validation.required && (value === null || value === undefined || value === "")) {
          errors.push({
            field_id: field.field_id,
            message: field.validation.custom_message || "".concat(field.label, " is required")
          });
        }

        // Validate field type
        if (value !== null && value !== undefined && value !== "") {
          switch (field.field_type) {
            case _formConstants.FIELD_TYPE.EMAIL:
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors.push({
                  field_id: field.field_id,
                  message: "".concat(field.label, " must be a valid email")
                });
              }
              break;
            case _formConstants.FIELD_TYPE.PHONE:
              if (!/^\+?[1-9]\d{1,14}$/.test(value.replace(/\s/g, ""))) {
                errors.push({
                  field_id: field.field_id,
                  message: "".concat(field.label, " must be a valid phone number")
                });
              }
              break;
            case _formConstants.FIELD_TYPE.URL:
              try {
                new URL(value);
              } catch (_unused) {
                errors.push({
                  field_id: field.field_id,
                  message: "".concat(field.label, " must be a valid URL")
                });
              }
              break;
            case _formConstants.FIELD_TYPE.NUMBER:
              if (isNaN(value)) {
                errors.push({
                  field_id: field.field_id,
                  message: "".concat(field.label, " must be a number")
                });
              }
              break;
          }

          // Length validation
          if (field.validation.min_length && value.length < field.validation.min_length) {
            errors.push({
              field_id: field.field_id,
              message: "".concat(field.label, " must be at least ").concat(field.validation.min_length, " characters")
            });
          }
          if (field.validation.max_length && value.length > field.validation.max_length) {
            errors.push({
              field_id: field.field_id,
              message: "".concat(field.label, " must not exceed ").concat(field.validation.max_length, " characters")
            });
          }

          // Value validation
          if (field.validation.min_value !== undefined && Number(value) < field.validation.min_value) {
            errors.push({
              field_id: field.field_id,
              message: "".concat(field.label, " must be at least ").concat(field.validation.min_value)
            });
          }
          if (field.validation.max_value !== undefined && Number(value) > field.validation.max_value) {
            errors.push({
              field_id: field.field_id,
              message: "".concat(field.label, " must not exceed ").concat(field.validation.max_value)
            });
          }

          // Pattern validation
          if (field.validation.pattern) {
            var regex = new RegExp(field.validation.pattern);
            if (!regex.test(value)) {
              errors.push({
                field_id: field.field_id,
                message: field.validation.custom_message || "".concat(field.label, " does not match required format")
              });
            }
          }
        }
      });
      return {
        valid: errors.length === 0,
        errors: errors
      };
    };

    // Ensure virtuals are included in JSON and Object outputs
    _this.schema.set("toJSON", {
      virtuals: true
    });
    _this.schema.set("toObject", {
      virtuals: true
    });
    return _this;
  }
  _inherits(Form, _BaseModel);
  return _createClass(Form);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Form().getModel("Form");