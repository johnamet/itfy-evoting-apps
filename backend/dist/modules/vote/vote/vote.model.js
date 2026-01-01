"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../../shared/base.model.js");
var _voteConstants = require("../../../utils/constants/vote.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
 * The vote model definition for the vote module
 */
var Vote = /*#__PURE__*/function (_BaseModel) {
  function Vote() {
    var _this;
    _classCallCheck(this, Vote);
    var schemaDefinition = {
      candidate: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Candidate",
        required: true,
        index: true
      },
      category: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
      },
      payment: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
        index: true
      },
      vote_code: {
        type: String,
        required: true,
        index: true,
        trim: true
      },
      status: {
        type: String,
        "enum": Object.values(_voteConstants.VOTE_STATUS),
        "default": _voteConstants.VOTE_STATUS.ACTIVE,
        index: true
      },
      ip_hash: {
        type: String,
        required: false,
        index: true
      },
      user_agent: {
        type: String,
        required: false
      },
      metadata: {
        type: Map,
        of: String,
        "default": {}
      },
      cast_at: {
        type: Date,
        "default": Date.now,
        index: true
      },
      refunded_at: {
        type: Date,
        "default": null
      },
      refund_reason: {
        type: String,
        trim: true
      }
    };
    var options = {
      softDelete: true,
      timestamps: true
    };
    _this = _callSuper(this, Vote, [schemaDefinition, options]);

    // Create compound indexes for common queries
    _this.schema.index({
      event: 1,
      candidate: 1
    });
    _this.schema.index({
      event: 1,
      category: 1
    });
    _this.schema.index({
      candidate: 1,
      status: 1
    });
    _this.schema.index({
      payment: 1,
      status: 1
    });
    _this.schema.index({
      vote_code: 1,
      candidate: 1
    });
    _this.schema.index({
      cast_at: -1
    });

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(next) {
        var Category, category, Candidate, candidate, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate that voting is open for this category
              Category = _mongoose["default"].model("Category");
              _context.n = 1;
              return Category.findById(this.category);
            case 1:
              category = _context.v;
              if (category) {
                _context.n = 2;
                break;
              }
              throw new Error("Category not found");
            case 2:
              if (category.is_voting_open) {
                _context.n = 3;
                break;
              }
              throw new Error("Voting is not open for this category");
            case 3:
              // Validate that candidate can receive votes
              Candidate = _mongoose["default"].model("Candidate");
              _context.n = 4;
              return Candidate.findById(this.candidate);
            case 4:
              candidate = _context.v;
              if (candidate) {
                _context.n = 5;
                break;
              }
              throw new Error("Candidate not found");
            case 5:
              if (candidate.canReceiveVotes) {
                _context.n = 6;
                break;
              }
              throw new Error("Candidate cannot receive votes");
            case 6:
              if (candidate.categories.includes(this.category.toString())) {
                _context.n = 7;
                break;
              }
              throw new Error("Candidate does not belong to this category");
            case 7:
              // Set refunded_at when status changes to refunded
              if (this.isModified("status") && this.status === _voteConstants.VOTE_STATUS.REFUNDED && !this.refunded_at) {
                this.refunded_at = new Date();
              }
              next();
              _context.n = 9;
              break;
            case 8:
              _context.p = 8;
              _t = _context.v;
              next(_t);
            case 9:
              return _context.a(2);
          }
        }, _callee, this, [[0, 8]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    // Post-save hook to increment candidate vote count
    _this.schema.post("save", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(doc) {
        var Candidate, Category, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              if (!(doc.status === _voteConstants.VOTE_STATUS.ACTIVE)) {
                _context2.n = 2;
                break;
              }
              Candidate = _mongoose["default"].model("Candidate");
              _context2.n = 1;
              return Candidate.findByIdAndUpdate(doc.candidate, {
                $inc: {
                  vote_count: 1
                }
              });
            case 1:
              Category = _mongoose["default"].model("Category");
              _context2.n = 2;
              return Category.findByIdAndUpdate(doc.category, {
                $inc: {
                  total_votes: 1
                }
              });
            case 2:
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              console.error("Error incrementing vote count:", _t2);
            case 4:
              return _context2.a(2);
          }
        }, _callee2, null, [[0, 3]]);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    // Virtual: Is active
    _this.schema.virtual("isActive").get(function () {
      return this.status === _voteConstants.VOTE_STATUS.ACTIVE;
    });

    // Virtual: Is refunded
    _this.schema.virtual("isRefunded").get(function () {
      return this.status === _voteConstants.VOTE_STATUS.REFUNDED;
    });

    // Virtual: Days since cast
    _this.schema.virtual("daysSinceCast").get(function () {
      if (!this.cast_at) return 0;
      var now = new Date();
      return Math.floor((now - this.cast_at) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find votes by event
    _this.schema.statics.findByEvent = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(eventId) {
        var options,
          query,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              query = this.find({
                event: eventId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).sort({
                cast_at: -1
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

    // Static method: Find votes by candidate
    _this.schema.statics.findByCandidate = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(candidateId) {
        var options,
          query,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              query = this.find({
                candidate: candidateId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).sort({
                cast_at: -1
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

    // Static method: Find votes by category
    _this.schema.statics.findByCategory = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(categoryId) {
        var options,
          query,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              query = this.find({
                category: categoryId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).sort({
                cast_at: -1
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

    // Static method: Find votes by payment
    _this.schema.statics.findByPayment = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(paymentId) {
        var options,
          query,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              query = this.find({
                payment: paymentId
              }).sort({
                cast_at: -1
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

    // Static method: Find votes by vote code
    _this.schema.statics.findByVoteCode = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(voteCode) {
        var options,
          query,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              query = this.find({
                vote_code: voteCode
              }).sort({
                cast_at: -1
              });
              if (options.populate) query.populate(options.populate);
              _context7.n = 1;
              return query.exec();
            case 1:
              return _context7.a(2, _context7.v);
          }
        }, _callee7, this);
      }));
      return function (_x7) {
        return _ref7.apply(this, arguments);
      };
    }();

    // Static method: Count votes for candidate
    _this.schema.statics.countForCandidate = /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(candidateId) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.countDocuments({
                candidate: candidateId,
                status: _voteConstants.VOTE_STATUS.ACTIVE
              }).exec();
            case 1:
              return _context8.a(2, _context8.v);
          }
        }, _callee8, this);
      }));
      return function (_x8) {
        return _ref8.apply(this, arguments);
      };
    }();

    // Static method: Get vote statistics for event
    _this.schema.statics.getEventStatistics = /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(eventId) {
        var _stats$total$, _stats$active$, _stats$refunded$;
        var _yield$this$aggregate, _yield$this$aggregate2, stats;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              _context9.n = 1;
              return this.aggregate([{
                $match: {
                  event: eventId
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  active: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.ACTIVE
                    }
                  }, {
                    $count: "count"
                  }],
                  refunded: [{
                    $match: {
                      status: _voteConstants.VOTE_STATUS.REFUNDED
                    }
                  }, {
                    $count: "count"
                  }],
                  byDate: [{
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
                  }]
                }
              }]);
            case 1:
              _yield$this$aggregate = _context9.v;
              _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
              stats = _yield$this$aggregate2[0];
              return _context9.a(2, {
                total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
                active: (stats === null || stats === void 0 || (_stats$active$ = stats.active[0]) === null || _stats$active$ === void 0 ? void 0 : _stats$active$.count) || 0,
                refunded: (stats === null || stats === void 0 || (_stats$refunded$ = stats.refunded[0]) === null || _stats$refunded$ === void 0 ? void 0 : _stats$refunded$.count) || 0,
                byDate: (stats === null || stats === void 0 ? void 0 : stats.byDate) || []
              });
          }
        }, _callee9, this);
      }));
      return function (_x9) {
        return _ref9.apply(this, arguments);
      };
    }();

    // Instance method: Refund vote
    _this.schema.methods.refund = /*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(reason) {
        var Candidate, Category;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              if (!(this.status === _voteConstants.VOTE_STATUS.REFUNDED)) {
                _context0.n = 1;
                break;
              }
              throw new Error("Vote is already refunded");
            case 1:
              // Decrement candidate vote count
              Candidate = _mongoose["default"].model("Candidate");
              _context0.n = 2;
              return Candidate.findByIdAndUpdate(this.candidate, {
                $inc: {
                  vote_count: -1
                }
              });
            case 2:
              // Decrement category vote count
              Category = _mongoose["default"].model("Category");
              _context0.n = 3;
              return Category.findByIdAndUpdate(this.category, {
                $inc: {
                  total_votes: -1
                }
              });
            case 3:
              this.status = _voteConstants.VOTE_STATUS.REFUNDED;
              this.refunded_at = new Date();
              this.refund_reason = reason;
              _context0.n = 4;
              return this.save();
            case 4:
              return _context0.a(2, _context0.v);
          }
        }, _callee0, this);
      }));
      return function (_x0) {
        return _ref0.apply(this, arguments);
      };
    }();

    // Ensure virtuals are included in JSON and Object outputs
    _this.schema.set("toJSON", {
      virtuals: true
    });
    _this.schema.set("toObject", {
      virtuals: true
    });
    return _this;
  }
  _inherits(Vote, _BaseModel);
  return _createClass(Vote);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Vote().getModel("Vote");