"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _categoryConstants = require("../../utils/constants/category.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
 * The category model definition for the category module
 */
var Category = /*#__PURE__*/function (_BaseModel) {
  function Category() {
    var _this;
    _classCallCheck(this, Category);
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
      icon: {
        type: String,
        "default": null
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
      },
      candidates: {
        type: [_mongoose["default"].Schema.Types.ObjectId],
        ref: "Candidate",
        "default": []
      },
      status: {
        type: String,
        required: true,
        "default": _categoryConstants.STATUS.ACTIVE,
        "enum": Object.values(_categoryConstants.STATUS)
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: true
      },
      is_voting_open: {
        type: Boolean,
        "default": false,
        index: true
      },
      voting_start_date: {
        type: Date,
        "default": null
      },
      voting_deadline: {
        type: Date,
        "default": null
      },
      total_votes: {
        type: Number,
        "default": 0,
        min: 0
      },
      min_candidates: {
        type: Number,
        "default": 2,
        min: 1
      },
      max_candidates: {
        type: Number,
        "default": null,
        min: 1
      },
      display_order: {
        type: Number,
        "default": 0
      },
      is_featured: {
        type: Boolean,
        "default": false,
        index: true
      },
      voting_rules: {
        type: String,
        trim: true
      },
      allow_write_in: {
        type: Boolean,
        "default": false
      },
      require_authentication: {
        type: Boolean,
        "default": true
      },
      results_visibility: {
        type: String,
        "enum": Object.values(_categoryConstants.RESULTS_VISIBILITY),
        "default": _categoryConstants.RESULTS_VISIBILITY.PUBLIC
      },
      show_results_before_deadline: {
        type: Boolean,
        "default": false
      },
      color_theme: {
        type: String,
        "default": null
      },
      image: {
        type: String,
        "default": null
      },
      nomination_form: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Form",
        "default": null
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
    _this = _callSuper(this, Category, [schemaDefinition, options]);

    // Create indexes
    _this.schema.index({
      event: 1,
      name: 1
    });
    _this.schema.index({
      event: 1,
      is_voting_open: 1
    });
    _this.schema.index({
      slug: 1
    }, {
      unique: true,
      sparse: true
    });
    _this.schema.index({
      display_order: 1
    });

    // Pre-save hook for validation and auto-management
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var now, votingHasStarted, votingHasEnded, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              now = new Date(); // Generate slug from name if not provided
              if (!this.slug && this.name) {
                this.slug = this.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
              }

              // Validate voting dates
              if (!(this.voting_start_date && this.voting_deadline)) {
                _context.n = 1;
                break;
              }
              if (!(this.voting_deadline <= this.voting_start_date)) {
                _context.n = 1;
                break;
              }
              throw new Error("Voting deadline must be after voting start date");
            case 1:
              // Auto-manage voting status based on dates
              if (this.voting_start_date && this.voting_deadline) {
                votingHasStarted = this.voting_start_date <= now;
                votingHasEnded = this.voting_deadline <= now;
                if (votingHasEnded) {
                  // Voting has ended
                  this.is_voting_open = false;
                  if (this.status !== _categoryConstants.STATUS.ARCHIVED) {
                    this.status = _categoryConstants.STATUS.CLOSED;
                  }
                } else if (votingHasStarted && !votingHasEnded) {
                  // Voting is currently open
                  if (this.status === _categoryConstants.STATUS.ACTIVE) {
                    this.is_voting_open = true;
                  }
                } else {
                  // Voting hasn't started yet
                  this.is_voting_open = false;
                }
              }

              // Validate is_voting_open can only be true if status is ACTIVE
              if (!(this.is_voting_open && this.status !== _categoryConstants.STATUS.ACTIVE)) {
                _context.n = 2;
                break;
              }
              throw new Error("Voting can only be open when category status is ACTIVE");
            case 2:
              if (!(this.is_voting_open && !this.voting_deadline)) {
                _context.n = 3;
                break;
              }
              throw new Error("Voting deadline is required when voting is open");
            case 3:
              if (!(this.max_candidates && this.min_candidates)) {
                _context.n = 4;
                break;
              }
              if (!(this.max_candidates < this.min_candidates)) {
                _context.n = 4;
                break;
              }
              throw new Error("Maximum candidates cannot be less than minimum candidates");
            case 4:
              if (!(this.candidates && this.candidates.length > 0)) {
                _context.n = 6;
                break;
              }
              if (!(this.candidates.length < this.min_candidates)) {
                _context.n = 5;
                break;
              }
              throw new Error("Category must have at least ".concat(this.min_candidates, " candidate(s)"));
            case 5:
              if (!(this.max_candidates && this.candidates.length > this.max_candidates)) {
                _context.n = 6;
                break;
              }
              throw new Error("Category cannot have more than ".concat(this.max_candidates, " candidates"));
            case 6:
              next();
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              next(_t);
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[0, 7]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Virtual: Check if voting is currently active
    _this.schema.virtual("isVotingActive").get(function () {
      if (!this.is_voting_open) return false;
      if (!this.voting_deadline) return this.is_voting_open;
      var now = new Date();
      return this.is_voting_open && this.voting_deadline > now;
    });

    // Virtual: Check if voting has ended
    _this.schema.virtual("hasVotingEnded").get(function () {
      if (!this.voting_deadline) return false;
      var now = new Date();
      return this.voting_deadline <= now;
    });

    // Virtual: Check if voting hasn't started yet
    _this.schema.virtual("isVotingUpcoming").get(function () {
      if (!this.voting_start_date) return false;
      var now = new Date();
      return this.voting_start_date > now;
    });

    // Virtual: Days until voting starts
    _this.schema.virtual("daysUntilVotingStarts").get(function () {
      if (!this.voting_start_date) return null;
      var now = new Date();
      if (this.voting_start_date <= now) return 0;
      return Math.ceil((this.voting_start_date - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Days until voting deadline
    _this.schema.virtual("daysUntilDeadline").get(function () {
      if (!this.voting_deadline) return null;
      var now = new Date();
      if (this.voting_deadline <= now) return 0;
      return Math.ceil((this.voting_deadline - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Hours until voting deadline
    _this.schema.virtual("hoursUntilDeadline").get(function () {
      if (!this.voting_deadline) return null;
      var now = new Date();
      if (this.voting_deadline <= now) return 0;
      return Math.ceil((this.voting_deadline - now) / (1000 * 60 * 60));
    });

    // Virtual: Voting duration in days
    _this.schema.virtual("votingDurationInDays").get(function () {
      if (!this.voting_start_date || !this.voting_deadline) return null;
      return Math.ceil((this.voting_deadline - this.voting_start_date) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Candidate count
    _this.schema.virtual("candidateCount").get(function () {
      return this.candidates ? this.candidates.length : 0;
    });

    // Virtual: Check if category has enough candidates
    _this.schema.virtual("hasMinimumCandidates").get(function () {
      var count = this.candidates ? this.candidates.length : 0;
      return count >= this.min_candidates;
    });

    // Virtual: Check if category is at max candidates
    _this.schema.virtual("isAtMaxCandidates").get(function () {
      if (!this.max_candidates) return false;
      var count = this.candidates ? this.candidates.length : 0;
      return count >= this.max_candidates;
    });

    // Virtual: Remaining candidate slots
    _this.schema.virtual("remainingCandidateSlots").get(function () {
      if (!this.max_candidates) return null;
      var count = this.candidates ? this.candidates.length : 0;
      return Math.max(0, this.max_candidates - count);
    });

    // Virtual: Check if results can be viewed
    _this.schema.virtual("canViewResults").get(function () {
      if (this.results_visibility === "public") return true;
      if (this.show_results_before_deadline) return true;
      return this.hasVotingEnded;
    });

    // Virtual: Average votes per candidate
    _this.schema.virtual("averageVotesPerCandidate").get(function () {
      var count = this.candidates ? this.candidates.length : 0;
      if (count === 0) return 0;
      return Math.round(this.total_votes / count);
    });

    // Static method: Find categories by event
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
                display_order: 1
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

    // Static method: Find active voting categories
    _this.schema.statics.findActiveVoting = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var eventId,
        now,
        filter,
        _args3 = arguments;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            eventId = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
            now = new Date();
            filter = {
              is_voting_open: true,
              status: _categoryConstants.STATUS.ACTIVE,
              voting_deadline: {
                $gt: now
              }
            };
            if (eventId) filter.event = eventId;
            _context3.n = 1;
            return this.find(filter).sort({
              voting_deadline: 1
            }).exec();
          case 1:
            return _context3.a(2, _context3.v);
        }
      }, _callee3, this);
    }));

    // Static method: Find upcoming voting categories
    _this.schema.statics.findUpcomingVoting = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var eventId,
        now,
        filter,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            eventId = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            now = new Date();
            filter = {
              voting_start_date: {
                $gt: now
              },
              status: _categoryConstants.STATUS.ACTIVE
            };
            if (eventId) filter.event = eventId;
            _context4.n = 1;
            return this.find(filter).sort({
              voting_start_date: 1
            }).exec();
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4, this);
    }));

    // Static method: Find closed voting categories
    _this.schema.statics.findClosedVoting = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var eventId,
        now,
        filter,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            eventId = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : null;
            now = new Date();
            filter = {
              $or: [{
                voting_deadline: {
                  $lte: now
                }
              }, {
                status: _categoryConstants.STATUS.CLOSED
              }]
            };
            if (eventId) filter.event = eventId;
            _context5.n = 1;
            return this.find(filter).sort({
              voting_deadline: -1
            }).exec();
          case 1:
            return _context5.a(2, _context5.v);
        }
      }, _callee5, this);
    }));

    // Instance method: Open voting
    _this.schema.methods.openVoting = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var now;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (this.voting_deadline) {
              _context6.n = 1;
              break;
            }
            throw new Error("Voting deadline must be set before opening voting");
          case 1:
            if (this.hasMinimumCandidates) {
              _context6.n = 2;
              break;
            }
            throw new Error("Category must have at least ".concat(this.min_candidates, " candidate(s) to open voting"));
          case 2:
            if (!(this.status !== _categoryConstants.STATUS.ACTIVE)) {
              _context6.n = 3;
              break;
            }
            throw new Error("Category must be active to open voting");
          case 3:
            now = new Date();
            if (!(this.voting_deadline <= now)) {
              _context6.n = 4;
              break;
            }
            throw new Error("Voting deadline has already passed");
          case 4:
            this.is_voting_open = true;
            if (!this.voting_start_date) {
              this.voting_start_date = now;
            }
            _context6.n = 5;
            return this.save();
          case 5:
            return _context6.a(2, _context6.v);
        }
      }, _callee6, this);
    }));

    // Instance method: Close voting
    _this.schema.methods.closeVoting = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            this.is_voting_open = false;
            this.status = _categoryConstants.STATUS.CLOSED;
            _context7.n = 1;
            return this.save();
          case 1:
            return _context7.a(2, _context7.v);
        }
      }, _callee7, this);
    }));

    // Instance method: Add candidate
    _this.schema.methods.addCandidate = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(candidateId) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this.isAtMaxCandidates) {
                _context8.n = 1;
                break;
              }
              throw new Error("Category has reached maximum of ".concat(this.max_candidates, " candidates"));
            case 1:
              if (!this.candidates.includes(candidateId)) {
                _context8.n = 2;
                break;
              }
              throw new Error("Candidate already exists in this category");
            case 2:
              this.candidates.push(candidateId);
              _context8.n = 3;
              return this.save();
            case 3:
              return _context8.a(2, _context8.v);
          }
        }, _callee8, this);
      }));
      return function (_x3) {
        return _ref8.apply(this, arguments);
      };
    }();

    // Instance method: Remove candidate
    _this.schema.methods.removeCandidate = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(candidateId) {
        var index;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!this.is_voting_open) {
                _context9.n = 1;
                break;
              }
              throw new Error("Cannot remove candidates while voting is open");
            case 1:
              index = this.candidates.indexOf(candidateId);
              if (!(index === -1)) {
                _context9.n = 2;
                break;
              }
              throw new Error("Candidate not found in this category");
            case 2:
              this.candidates.splice(index, 1);
              _context9.n = 3;
              return this.save();
            case 3:
              return _context9.a(2, _context9.v);
          }
        }, _callee9, this);
      }));
      return function (_x4) {
        return _ref9.apply(this, arguments);
      };
    }();

    // Instance method: Increment total votes
    _this.schema.methods.incrementVotes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var count,
        _args0 = arguments;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            count = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : 1;
            this.total_votes += count;
            _context0.n = 1;
            return this.save();
          case 1:
            return _context0.a(2, _context0.v);
        }
      }, _callee0, this);
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
  _inherits(Category, _BaseModel);
  return _createClass(Category);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Category().getModel("Category");