#!/usr/bin/env node

/**
 * The Event model for the application.
 * This file defines the Event class which extends the BaseModel class.
 */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _eventConstants = require("../../utils/constants/event.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Event = /*#__PURE__*/function (_BaseModel) {
  function Event() {
    var _this;
    _classCallCheck(this, Event);
    var schemaDefinition = {
      name: {
        type: String,
        required: true,
        trim: true
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      location: {
        type: {
          name: {
            type: String,
            required: true,
            trim: true
          },
          address: {
            type: String,
            required: true,
            trim: false
          },
          city: {
            type: String,
            required: true,
            trim: true
          },
          coordinates: {
            type: {
              lat: {
                type: Number,
                required: true
              },
              lng: {
                type: Number,
                required: true
              }
            },
            required: false
          },
          country: {
            type: String,
            required: false,
            trim: true
          },
          zipCode: {
            type: String,
            required: false,
            trim: true
          },
          website: {
            type: String,
            required: false,
            trim: true
          },
          phone: {
            type: String,
            required: false,
            trim: true
          },
          venueInfo: {
            type: [String],
            required: false,
            trim: true
          },
          directions: {
            type: [String],
            required: false,
            trim: true
          }
        },
        required: true,
        "default": {}
      },
      gallery: {
        type: [String],
        "default": []
      },
      start_date: {
        type: Date,
        required: true,
        "default": function _default() {
          return Date.now();
        }
      },
      end_date: {
        type: Date,
        required: true,
        "default": function _default() {
          return Date.now();
        }
      },
      speakers: {
        type: [Object],
        "default": []
      },
      guestOfHonor: {
        type: [Object],
        "default": []
      },
      sponsors: {
        type: [Object],
        "default": []
      },
      color_theme: {
        type: String,
        required: false,
        trim: true
      },
      related_events: [{
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        "default": []
      }],
      categories: [{
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Categories",
        "default": []
      }],
      timeline: {
        type: [{
          title: {
            type: String,
            required: true,
            trim: true
          },
          description: {
            type: String,
            required: false,
            trim: true
          },
          time: {
            type: Date,
            required: true
          }
        }]
      },
      registration_form: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Form",
        required: false
      },
      status: {
        type: String,
        "default": _eventConstants.STATUS.PENDING,
        "enum": Object.values(_eventConstants.STATUS)
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
      max_attendees: {
        type: Number,
        required: false,
        min: 0
      },
      current_attendees: {
        type: Number,
        "default": 0,
        min: 0
      },
      registration_deadline: {
        type: Date,
        required: false
      },
      registration_fee: {
        type: {
          amount: {
            type: Number,
            required: true,
            min: 0
          },
          currency: {
            type: String,
            "default": _eventConstants.CURRENCY.GHS,
            trim: true
          },
          is_free: {
            type: Boolean,
            "default": true
          }
        },
        required: false
      },
      tags: {
        type: [String],
        "default": [],
        index: true
      },
      organizer: {
        type: {
          name: {
            type: String,
            required: true,
            trim: true
          },
          email: {
            type: String,
            required: false,
            trim: true,
            lowercase: true
          },
          phone: {
            type: String,
            required: false,
            trim: true
          }
        },
        required: false
      },
      contact_email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
      },
      event_type: {
        type: String,
        "enum": Object.values(_eventConstants.EVENT_TYPE),
        required: false
      },
      visibility: {
        type: String,
        "enum": Object.values(_eventConstants.VISIBILITY),
        "default": _eventConstants.VISIBILITY.PUBLIC
      },
      cover_image: {
        type: String,
        required: false
      },
      social_links: {
        type: {
          facebook: String,
          twitter: String,
          linkedin: String,
          instagram: String
        },
        required: false
      },
      requirements: {
        type: [String],
        "default": []
      },
      cancellation_policy: {
        type: String,
        required: false,
        trim: true
      },
      created_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      updated_by: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        required: false,
        "default": null
      }
    };
    var options = {
      timestamps: true
    };
    _this = _callSuper(this, Event, [schemaDefinition, options]);

    // Create index for unique event names
    _this.schema.index({
      name: 1
    }, {
      unique: true
    });
    _this.schema.index({
      slug: 1
    }, {
      unique: true,
      sparse: true
    });

    // Create compound indexes for common queries
    _this.schema.index({
      status: 1,
      start_date: 1
    });
    _this.schema.index({
      is_featured: 1,
      is_published: 1
    });
    _this.schema.index({
      categories: 1,
      status: 1
    });

    // Pre-save hook to handle date validation and status management
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var now, autoManageStatus, _iterator, _step, item, _t, _t2;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              now = new Date(); // Generate slug from name if not provided
              if (!this.slug && this.name) {
                this.slug = this.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
              }

              // Validate that end_date is after start_date
              if (!(this.end_date <= this.start_date)) {
                _context.n = 1;
                break;
              }
              throw new Error("End date must be after start date");
            case 1:
              // Auto-manage status based on dates (only if status is not manually set to specific values)
              // Skip auto-status if status is CANCELLED or manually set
              autoManageStatus = ![_eventConstants.STATUS.CANCELLED].includes(this.status);
              if (autoManageStatus) {
                if (this.end_date < now) {
                  // Event has ended - archive it
                  this.status = _eventConstants.STATUS.ARCHIVED;
                } else if (this.start_date <= now && this.end_date >= now) {
                  // Event is currently happening
                  this.status = _eventConstants.STATUS.ACTIVE;
                } else if (this.start_date > now) {
                  // Event hasn't started yet
                  this.status = _eventConstants.STATUS.UPCOMING;
                }
              }

              // Validate registration deadline is before start_date
              if (!(this.registration_deadline && this.registration_deadline > this.start_date)) {
                _context.n = 2;
                break;
              }
              throw new Error("Registration deadline must be before event start date");
            case 2:
              if (!(this.max_attendees && this.current_attendees > this.max_attendees)) {
                _context.n = 3;
                break;
              }
              throw new Error("Current attendees cannot exceed maximum attendees");
            case 3:
              if (!(this.timeline && this.timeline.length > 0)) {
                _context.n = 11;
                break;
              }
              _iterator = _createForOfIteratorHelper(this.timeline);
              _context.p = 4;
              _iterator.s();
            case 5:
              if ((_step = _iterator.n()).done) {
                _context.n = 7;
                break;
              }
              item = _step.value;
              if (!(item.time < this.start_date || item.time > this.end_date)) {
                _context.n = 6;
                break;
              }
              throw new Error("Timeline events must be within event start and end dates");
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
              // Sort timeline by time
              this.timeline.sort(function (a, b) {
                return a.time - b.time;
              });
            case 11:
              next();
              _context.n = 13;
              break;
            case 12:
              _context.p = 12;
              _t2 = _context.v;
              next(_t2);
            case 13:
              return _context.a(2);
          }
        }, _callee, this, [[4, 8, 9, 10], [0, 12]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Virtual: Check if registration is open
    _this.schema.virtual("isRegistrationOpen").get(function () {
      if (!this.registration_deadline) return true;
      var now = new Date();
      return now < this.registration_deadline && now < this.start_date;
    });

    // Virtual: Check if event is full
    _this.schema.virtual("isFull").get(function () {
      if (!this.max_attendees) return false;
      return this.current_attendees >= this.max_attendees;
    });

    // Virtual: Get event duration in milliseconds
    _this.schema.virtual("duration").get(function () {
      return this.end_date - this.start_date;
    });

    // Virtual: Get event duration in hours
    _this.schema.virtual("durationInHours").get(function () {
      return Math.round((this.end_date - this.start_date) / (1000 * 60 * 60));
    });

    // Virtual: Get spots remaining
    _this.schema.virtual("spotsRemaining").get(function () {
      if (!this.max_attendees) return null;
      return Math.max(0, this.max_attendees - this.current_attendees);
    });

    // Virtual: Check if event is upcoming
    _this.schema.virtual("isUpcoming").get(function () {
      var now = new Date();
      return this.start_date > now;
    });

    // Virtual: Check if event is active/ongoing
    _this.schema.virtual("isActive").get(function () {
      var now = new Date();
      return this.start_date <= now && this.end_date >= now;
    });

    // Virtual: Check if event has ended
    _this.schema.virtual("hasEnded").get(function () {
      var now = new Date();
      return this.end_date < now;
    });

    // Virtual: Days until event starts
    _this.schema.virtual("daysUntilStart").get(function () {
      var now = new Date();
      if (this.start_date <= now) return 0;
      return Math.ceil((this.start_date - now) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find upcoming events
    _this.schema.statics.findUpcoming = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var limit,
        now,
        _args2 = arguments;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            limit = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 10;
            now = new Date();
            return _context2.a(2, this.find({
              start_date: {
                $gt: now
              },
              is_published: true
            }).sort({
              start_date: 1
            }).limit(limit).exec());
        }
      }, _callee2, this);
    }));

    // Static method: Find featured events
    _this.schema.statics.findFeatured = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var limit,
        _args3 = arguments;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            limit = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 5;
            return _context3.a(2, this.find({
              is_featured: true,
              is_published: true
            }).sort({
              start_date: 1
            }).limit(limit).exec());
        }
      }, _callee3, this);
    }));

    // Static method: Find active events
    _this.schema.statics.findActive = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var now;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            now = new Date();
            return _context4.a(2, this.find({
              start_date: {
                $lte: now
              },
              end_date: {
                $gte: now
              },
              is_published: true
            }).sort({
              start_date: 1
            }).exec());
        }
      }, _callee4, this);
    }));

    // Instance method: Register attendee
    _this.schema.methods.registerAttendee = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (!this.isFull) {
              _context5.n = 1;
              break;
            }
            throw new Error("Event is full");
          case 1:
            if (this.isRegistrationOpen) {
              _context5.n = 2;
              break;
            }
            throw new Error("Registration is closed");
          case 2:
            this.current_attendees += 1;
            return _context5.a(2, this.save());
        }
      }, _callee5, this);
    }));

    // Instance method: Unregister attendee
    _this.schema.methods.unregisterAttendee = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (!(this.current_attendees <= 0)) {
              _context6.n = 1;
              break;
            }
            throw new Error("No attendees to unregister");
          case 1:
            this.current_attendees -= 1;
            return _context6.a(2, this.save());
        }
      }, _callee6, this);
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
  _inherits(Event, _BaseModel);
  return _createClass(Event);
}(_baseModel.BaseModel);
var _default2 = exports["default"] = new Event().getModel("Event");