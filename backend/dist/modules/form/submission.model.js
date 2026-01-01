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
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
 * The form submission model definition for the form module
 * Handles submissions from dynamic forms with duplicate detection
 */
var FormSubmission = /*#__PURE__*/function (_BaseModel) {
  function FormSubmission() {
    var _this;
    _classCallCheck(this, FormSubmission);
    var schemaDefinition = {
      form: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Form",
        required: true,
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
      submission_data: {
        type: Map,
        of: _mongoose["default"].Schema.Types.Mixed,
        required: true
      },
      normalized_data: {
        type: Map,
        of: String,
        "default": {}
      },
      status: {
        type: String,
        "enum": Object.values(_formConstants.SUBMISSION_STATUS),
        "default": _formConstants.SUBMISSION_STATUS.PENDING,
        index: true
      },
      submitted_by: {
        type: Object,
        required: true,
        "default": {}
      },
      ip_address: {
        type: String,
        index: true
      },
      ip_hash: {
        type: String,
        index: true
      },
      user_agent: {
        type: String
      },
      session_id: {
        type: String,
        index: true
      },
      duplicate_check: {
        is_duplicate: {
          type: Boolean,
          "default": false,
          index: true
        },
        similarity_score: {
          type: Number,
          min: 0,
          max: 100,
          "default": 0
        },
        matched_submissions: [{
          submission_id: {
            type: _mongoose["default"].Schema.Types.ObjectId,
            ref: "FormSubmission"
          },
          similarity: Number,
          matched_fields: [String]
        }],
        checked_at: Date
      },
      nominee_identifier: {
        type: String,
        index: true
      },
      approval: {
        reviewed_by: {
          type: _mongoose["default"].Schema.Types.ObjectId,
          ref: "User"
        },
        reviewed_at: Date,
        review_notes: String,
        rejection_reason: String
      },
      candidate: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Candidate",
        "default": null
      },
      attachments: [{
        field_id: String,
        filename: String,
        url: String,
        size: Number,
        mime_type: String,
        uploaded_at: Date
      }],
      metadata: {
        type: Map,
        of: String,
        "default": {}
      },
      submission_number: {
        type: String,
        unique: true,
        index: true
      },
      confirmation_sent: {
        type: Boolean,
        "default": false
      },
      confirmation_sent_at: {
        type: Date
      }
    };
    var options = {
      softDelete: true,
      timestamps: true
    };
    _this = _callSuper(this, FormSubmission, [schemaDefinition, options]);

    // Create compound indexes
    _this.schema.index({
      form: 1,
      status: 1
    });
    _this.schema.index({
      event: 1,
      status: 1
    });
    _this.schema.index({
      form: 1,
      nominee_identifier: 1
    });
    _this.schema.index({
      "duplicate_check.is_duplicate": 1,
      status: 1
    });
    _this.schema.index({
      ip_hash: 1,
      form: 1
    });
    _this.schema.index({
      submitted_by: 1,
      form: 1
    });

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var _formDoc$slug, count, formDoc, prefix, _iterator, _step, _step$value, key, value, identifierFields, identifierParts, _i, _identifierFields, field, _value, crypto, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              if (!(this.isNew && !this.submission_number)) {
                _context.n = 3;
                break;
              }
              _context.n = 1;
              return this.constructor.countDocuments({
                form: this.form
              });
            case 1:
              count = _context.v;
              _context.n = 2;
              return _mongoose["default"].model("Form").findById(this.form);
            case 2:
              formDoc = _context.v;
              prefix = (formDoc === null || formDoc === void 0 || (_formDoc$slug = formDoc.slug) === null || _formDoc$slug === void 0 ? void 0 : _formDoc$slug.substring(0, 3).toUpperCase()) || "SUB";
              this.submission_number = "".concat(prefix, "-").concat(Date.now(), "-").concat(count + 1);
            case 3:
              // Normalize data for duplicate checking
              if (this.submission_data) {
                this.normalized_data = new Map();
                _iterator = _createForOfIteratorHelper(this.submission_data.entries());
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];
                    if (typeof value === "string") {
                      this.normalized_data.set(key, value.toLowerCase().trim().replace(/\s+/g, " "));
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }

              // Generate nominee identifier for multi-category tracking
              if (!(!this.nominee_identifier && this.submission_data)) {
                _context.n = 5;
                break;
              }
              identifierFields = ["email", "phone", "first_name", "last_name", "name"];
              identifierParts = [];
              for (_i = 0, _identifierFields = identifierFields; _i < _identifierFields.length; _i++) {
                field = _identifierFields[_i];
                _value = this.submission_data.get(field);
                if (_value) {
                  identifierParts.push(String(_value).toLowerCase().trim());
                }
              }
              if (!(identifierParts.length > 0)) {
                _context.n = 5;
                break;
              }
              _context.n = 4;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("crypto"));
              });
            case 4:
              crypto = _context.v;
              this.nominee_identifier = crypto.createHash("sha256").update(identifierParts.join("|")).digest("hex").substring(0, 16);
            case 5:
              // Update approval metadata when status changes
              if (this.isModified("status")) {
                if (this.status === _formConstants.SUBMISSION_STATUS.APPROVED && !this.approval.reviewed_at) {
                  this.approval.reviewed_at = new Date();
                } else if (this.status === _formConstants.SUBMISSION_STATUS.REJECTED && !this.approval.reviewed_at) {
                  this.approval.reviewed_at = new Date();
                }
              }
              next();
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              next(_t);
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[0, 6]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Post-save hook to update form statistics
    _this.schema.post("save", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(doc) {
        var Form, form, totalSubmissions, approvedSubmissions, rejectedSubmissions, duplicateSubmissions, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              Form = _mongoose["default"].model("Form");
              _context2.n = 1;
              return Form.findById(doc.form);
            case 1:
              form = _context2.v;
              if (!form) {
                _context2.n = 6;
                break;
              }
              _context2.n = 2;
              return doc.constructor.countDocuments({
                form: doc.form
              });
            case 2:
              totalSubmissions = _context2.v;
              _context2.n = 3;
              return doc.constructor.countDocuments({
                form: doc.form,
                status: _formConstants.SUBMISSION_STATUS.APPROVED
              });
            case 3:
              approvedSubmissions = _context2.v;
              _context2.n = 4;
              return doc.constructor.countDocuments({
                form: doc.form,
                status: _formConstants.SUBMISSION_STATUS.REJECTED
              });
            case 4:
              rejectedSubmissions = _context2.v;
              _context2.n = 5;
              return doc.constructor.countDocuments({
                form: doc.form,
                "duplicate_check.is_duplicate": true
              });
            case 5:
              duplicateSubmissions = _context2.v;
              _context2.n = 6;
              return Form.findByIdAndUpdate(doc.form, {
                total_submissions: totalSubmissions,
                approved_submissions: approvedSubmissions,
                rejected_submissions: rejectedSubmissions,
                duplicate_submissions: duplicateSubmissions
              });
            case 6:
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t2 = _context2.v;
              console.error("Error updating form statistics:", _t2);
            case 8:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 7]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    // Virtual: Is pending
    _this.schema.virtual("isPending").get(function () {
      return this.status === _formConstants.SUBMISSION_STATUS.PENDING || this.status === _formConstants.SUBMISSION_STATUS.UNDER_REVIEW;
    });

    // Virtual: Is approved
    _this.schema.virtual("isApproved").get(function () {
      return this.status === _formConstants.SUBMISSION_STATUS.APPROVED;
    });

    // Virtual: Is rejected
    _this.schema.virtual("isRejected").get(function () {
      return this.status === _formConstants.SUBMISSION_STATUS.REJECTED;
    });

    // Virtual: Days since submission
    _this.schema.virtual("daysSinceSubmission").get(function () {
      var now = new Date();
      return Math.floor((now - this.created_at) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find submissions by form
    _this.schema.statics.findByForm = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(formId) {
        var options,
          query,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              query = this.find({
                form: formId
              }).sort({
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

    // Static method: Find submissions by event
    _this.schema.statics.findByEvent = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(eventId) {
        var options,
          query,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              query = this.find({
                event: eventId
              }).sort({
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
      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }();

    // Static method: Find submissions by status
    _this.schema.statics.findByStatus = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(status) {
        var formId,
          options,
          filter,
          query,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              formId = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : null;
              options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              filter = {
                status: status
              };
              if (formId) filter.form = formId;
              query = this.find(filter).sort({
                created_at: -1
              });
              if (options.populate) query.populate(options.populate);
              _context5.n = 1;
              return query.exec();
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }();

    // Static method: Find submissions by nominee identifier
    _this.schema.statics.findByNominee = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(nomineeIdentifier) {
        var options,
          query,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              query = this.find({
                nominee_identifier: nomineeIdentifier
              }).sort({
                created_at: -1
              });
              if (options.populate) query.populate(options.populate);
              _context6.n = 1;
              return query.exec();
            case 1:
              return _context6.a(2, _context6.v);
          }
        }, _callee6, this);
      }));
      return function (_x6) {
        return _ref6.apply(this, arguments);
      };
    }();

    // Static method: Find duplicate submissions
    _this.schema.statics.findDuplicates = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var formId,
        options,
        filter,
        query,
        _args7 = arguments;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            formId = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : null;
            options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
            filter = {
              "duplicate_check.is_duplicate": true
            };
            if (formId) filter.form = formId;
            query = this.find(filter).sort({
              "duplicate_check.similarity_score": -1
            });
            if (options.populate) query.populate(options.populate);
            _context7.n = 1;
            return query.exec();
          case 1:
            return _context7.a(2, _context7.v);
        }
      }, _callee7, this);
    }));

    // Static method: Check for duplicates
    _this.schema.statics.checkForDuplicates = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(formId, submissionData, checkFields) {
        var threshold,
          Form,
          form,
          fieldsToCheck,
          existingSubmissions,
          matches,
          _iterator2,
          _step2,
          existing,
          matchedFields,
          totalSimilarity,
          _iterator3,
          _step3,
          fieldId,
          newValue,
          existingValue,
          similarity,
          avgSimilarity,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              threshold = _args8.length > 3 && _args8[3] !== undefined ? _args8[3] : 85;
              Form = _mongoose["default"].model("Form");
              _context8.n = 1;
              return Form.findById(formId);
            case 1:
              form = _context8.v;
              if (!(!form || !form.duplicate_detection.enabled)) {
                _context8.n = 2;
                break;
              }
              return _context8.a(2, {
                hasDuplicates: false,
                matches: []
              });
            case 2:
              fieldsToCheck = checkFields || form.duplicate_detection.check_fields;
              if (!(!fieldsToCheck || fieldsToCheck.length === 0)) {
                _context8.n = 3;
                break;
              }
              return _context8.a(2, {
                hasDuplicates: false,
                matches: []
              });
            case 3:
              _context8.n = 4;
              return this.find({
                form: formId,
                status: {
                  $ne: _formConstants.SUBMISSION_STATUS.REJECTED
                }
              }).lean();
            case 4:
              existingSubmissions = _context8.v;
              matches = [];
              _iterator2 = _createForOfIteratorHelper(existingSubmissions);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  existing = _step2.value;
                  matchedFields = [];
                  totalSimilarity = 0;
                  _iterator3 = _createForOfIteratorHelper(fieldsToCheck);
                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      fieldId = _step3.value;
                      newValue = submissionData.get ? submissionData.get(fieldId) : submissionData[fieldId];
                      existingValue = existing.submission_data.get ? existing.submission_data.get(fieldId) : existing.submission_data[fieldId];
                      if (newValue && existingValue) {
                        similarity = calculateSimilarity(String(newValue), String(existingValue));
                        if (similarity >= threshold) {
                          matchedFields.push(fieldId);
                          totalSimilarity += similarity;
                        }
                      }
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                  if (matchedFields.length > 0) {
                    avgSimilarity = totalSimilarity / matchedFields.length;
                    matches.push({
                      submission_id: existing._id,
                      similarity: Math.round(avgSimilarity),
                      matched_fields: matchedFields
                    });
                  }
                }

                // Sort by similarity score
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              matches.sort(function (a, b) {
                return b.similarity - a.similarity;
              });
              return _context8.a(2, {
                hasDuplicates: matches.length > 0,
                matches: matches.slice(0, 10) // Return top 10 matches
              });
          }
        }, _callee8, this);
      }));
      return function (_x7, _x8, _x9) {
        return _ref8.apply(this, arguments);
      };
    }();

    // Instance method: Approve submission
    _this.schema.methods.approve = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(reviewedBy) {
        var notes,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              notes = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : "";
              this.status = _formConstants.SUBMISSION_STATUS.APPROVED;
              this.approval.reviewed_by = reviewedBy;
              this.approval.reviewed_at = new Date();
              this.approval.review_notes = notes;
              _context9.n = 1;
              return this.save();
            case 1:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      return function (_x0) {
        return _ref9.apply(this, arguments);
      };
    }();

    // Instance method: Reject submission
    _this.schema.methods.reject = /*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(reviewedBy) {
        var reason,
          _args0 = arguments;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              reason = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : "";
              this.status = _formConstants.SUBMISSION_STATUS.REJECTED;
              this.approval.reviewed_by = reviewedBy;
              this.approval.reviewed_at = new Date();
              this.approval.rejection_reason = reason;
              _context0.n = 1;
              return this.save();
            case 1:
              return _context0.a(2, _context0.v);
          }
        }, _callee0, this);
      }));
      return function (_x1) {
        return _ref0.apply(this, arguments);
      };
    }();

    // Instance method: Mark as duplicate
    _this.schema.methods.markAsDuplicate = /*#__PURE__*/function () {
      var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(matches) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              this.status = _formConstants.SUBMISSION_STATUS.DUPLICATE;
              this.duplicate_check.is_duplicate = true;
              this.duplicate_check.matched_submissions = matches;
              this.duplicate_check.checked_at = new Date();
              if (matches.length > 0) {
                this.duplicate_check.similarity_score = Math.max.apply(Math, _toConsumableArray(matches.map(function (m) {
                  return m.similarity;
                })));
              }
              _context1.n = 1;
              return this.save();
            case 1:
              return _context1.a(2, _context1.v);
          }
        }, _callee1, this);
      }));
      return function (_x10) {
        return _ref1.apply(this, arguments);
      };
    }();

    // Instance method: Convert to candidate
    _this.schema.methods.convertToCandidate = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var Candidate, candidateData, candidate;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            if (!this.candidate) {
              _context10.n = 1;
              break;
            }
            throw new Error("Submission already converted to candidate");
          case 1:
            if (!(this.status !== _formConstants.SUBMISSION_STATUS.APPROVED)) {
              _context10.n = 2;
              break;
            }
            throw new Error("Only approved submissions can be converted to candidates");
          case 2:
            Candidate = _mongoose["default"].model("Candidate"); // Map submission data to candidate fields
            candidateData = {
              first_name: this.submission_data.get("first_name") || "",
              last_name: this.submission_data.get("last_name") || "",
              email: this.submission_data.get("email") || "",
              phone_number: this.submission_data.get("phone") || this.submission_data.get("phone_number"),
              bio: this.submission_data.get("bio") || this.submission_data.get("description"),
              event: this.event,
              categories: this.categories,
              status: "pending",
              nomination_date: this.created_at
            }; // Create candidate
            _context10.n = 3;
            return Candidate.create(candidateData);
          case 3:
            candidate = _context10.v;
            // Update submission
            this.candidate = candidate._id;
            _context10.n = 4;
            return this.save();
          case 4:
            return _context10.a(2, candidate);
        }
      }, _callee10, this);
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
  _inherits(FormSubmission, _BaseModel);
  return _createClass(FormSubmission);
}(_baseModel.BaseModel); // Helper function to calculate string similarity
function calculateSimilarity(str1, str2) {
  var s1 = String(str1).toLowerCase().trim();
  var s2 = String(str2).toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 100;

  // Levenshtein distance based similarity
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === 0 || len2 === 0) return 0;
  var matrix = Array(len2 + 1).fill(null).map(function () {
    return Array(len1 + 1).fill(null);
  });
  for (var i = 0; i <= len1; i++) matrix[0][i] = i;
  for (var j = 0; j <= len2; j++) matrix[j][0] = j;
  for (var _j = 1; _j <= len2; _j++) {
    for (var _i2 = 1; _i2 <= len1; _i2++) {
      var cost = s1[_i2 - 1] === s2[_j - 1] ? 0 : 1;
      matrix[_j][_i2] = Math.min(matrix[_j][_i2 - 1] + 1, matrix[_j - 1][_i2] + 1, matrix[_j - 1][_i2 - 1] + cost);
    }
  }
  var distance = matrix[len2][len1];
  var maxLen = Math.max(len1, len2);
  var similarity = (maxLen - distance) / maxLen * 100;
  return Math.round(similarity);
}
var _default = exports["default"] = new FormSubmission().getModel("FormSubmission");