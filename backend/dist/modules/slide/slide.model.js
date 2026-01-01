"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _slideConstants = require("../../utils/constants/slide.constants.js");
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
 * The Slide model definition for frontend hero/banner sections
 */
var Slide = /*#__PURE__*/function (_BaseModel) {
  function Slide() {
    var _this;
    _classCallCheck(this, Slide);
    var schemaDefinition = {
      title: {
        type: String,
        required: true,
        trim: true
      },
      subtitle: {
        type: String,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      slide_type: {
        type: String,
        "enum": Object.values(_slideConstants.SLIDE_TYPE),
        "default": _slideConstants.SLIDE_TYPE.HERO,
        index: true
      },
      status: {
        type: String,
        "enum": Object.values(_slideConstants.SLIDE_STATUS),
        "default": _slideConstants.SLIDE_STATUS.DRAFT,
        index: true
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        "default": null,
        index: true
      },
      image: {
        type: {
          url: {
            type: String,
            required: true
          },
          alt: {
            type: String,
            "default": ""
          },
          public_id: {
            type: String
          }
        },
        required: true
      },
      mobile_image: {
        type: {
          url: {
            type: String
          },
          alt: {
            type: String,
            "default": ""
          },
          public_id: {
            type: String
          }
        },
        "default": null
      },
      background_color: {
        type: String,
        "default": null
      },
      text_color: {
        type: String,
        "default": "#ffffff"
      },
      overlay_opacity: {
        type: Number,
        min: 0,
        max: 100,
        "default": 40
      },
      button: {
        type: {
          text: {
            type: String,
            required: true
          },
          url: {
            type: String,
            required: true
          },
          style: {
            type: String,
            "enum": Object.values(_slideConstants.BUTTON_STYLE),
            "default": _slideConstants.BUTTON_STYLE.PRIMARY
          },
          opens_in_new_tab: {
            type: Boolean,
            "default": false
          }
        },
        "default": null
      },
      secondary_button: {
        type: {
          text: {
            type: String,
            required: true
          },
          url: {
            type: String,
            required: true
          },
          style: {
            type: String,
            "enum": Object.values(_slideConstants.BUTTON_STYLE),
            "default": _slideConstants.BUTTON_STYLE.SECONDARY
          },
          opens_in_new_tab: {
            type: Boolean,
            "default": false
          }
        },
        "default": null
      },
      position: {
        type: String,
        "enum": Object.values(_slideConstants.SLIDE_POSITION),
        "default": _slideConstants.SLIDE_POSITION.MIDDLE
      },
      animation: {
        type: String,
        "enum": Object.values(_slideConstants.ANIMATION_TYPE),
        "default": _slideConstants.ANIMATION_TYPE.FADE
      },
      animation_duration: {
        type: Number,
        min: 0,
        max: 10000,
        "default": 5000
      },
      display_order: {
        type: Number,
        "default": 0,
        index: true
      },
      start_date: {
        type: Date,
        "default": null
      },
      end_date: {
        type: Date,
        "default": null
      },
      is_published: {
        type: Boolean,
        "default": false,
        index: true
      },
      view_count: {
        type: Number,
        "default": 0,
        min: 0
      },
      click_count: {
        type: Number,
        "default": 0,
        min: 0
      },
      metadata: {
        type: Map,
        of: String,
        "default": {}
      }
    };
    var options = {
      softDelete: true,
      timestamps: true
    };
    _this = _callSuper(this, Slide, [schemaDefinition, options]);

    // Create indexes
    _this.schema.index({
      slide_type: 1,
      status: 1,
      is_published: 1
    });
    _this.schema.index({
      event: 1,
      is_published: 1
    });
    _this.schema.index({
      display_order: 1
    });
    _this.schema.index({
      start_date: 1,
      end_date: 1
    });
    _this.schema.index({
      created_at: -1
    });

    // Virtual: Is active
    _this.schema.virtual("isActive").get(function () {
      if (!this.is_published) return false;
      if (this.status !== _slideConstants.SLIDE_STATUS.ACTIVE) return false;
      var now = new Date();

      // Check if slide is within active date range
      if (this.start_date && now < this.start_date) return false;
      if (this.end_date && now > this.end_date) return false;
      return true;
    });

    // Virtual: Is scheduled
    _this.schema.virtual("isScheduled").get(function () {
      if (!this.start_date) return false;
      var now = new Date();
      return this.status === _slideConstants.SLIDE_STATUS.SCHEDULED && now < this.start_date;
    });

    // Virtual: Is expired
    _this.schema.virtual("isExpired").get(function () {
      if (!this.end_date) return false;
      var now = new Date();
      return now > this.end_date;
    });

    // Virtual: Click-through rate
    _this.schema.virtual("clickThroughRate").get(function () {
      if (this.view_count === 0) return 0;
      return Math.round(this.click_count / this.view_count * 10000) / 100;
    });

    // Virtual: Days until start
    _this.schema.virtual("daysUntilStart").get(function () {
      if (!this.start_date) return null;
      var now = new Date();
      if (now >= this.start_date) return 0;
      return Math.ceil((this.start_date - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Days until end
    _this.schema.virtual("daysUntilEnd").get(function () {
      if (!this.end_date) return null;
      var now = new Date();
      if (now >= this.end_date) return 0;
      return Math.ceil((this.end_date - now) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find active slides
    _this.schema.statics.findActive = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var slideType,
        options,
        now,
        filter,
        query,
        _args = arguments;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            slideType = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            now = new Date();
            filter = {
              is_published: true,
              status: _slideConstants.SLIDE_STATUS.ACTIVE,
              $or: [{
                start_date: null,
                end_date: null
              }, {
                start_date: {
                  $lte: now
                },
                end_date: {
                  $gte: now
                }
              }, {
                start_date: null,
                end_date: {
                  $gte: now
                }
              }, {
                start_date: {
                  $lte: now
                },
                end_date: null
              }]
            };
            if (slideType) filter.slide_type = slideType;
            query = this.find(filter).sort({
              display_order: 1
            });
            if (options.populate) query.populate(options.populate);
            _context.n = 1;
            return query.exec();
          case 1:
            return _context.a(2, _context.v);
        }
      }, _callee, this);
    }));

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
                event: eventId,
                is_published: true
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
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    // Static method: Find scheduled slides
    _this.schema.statics.findScheduled = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var options,
        now,
        query,
        _args3 = arguments;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
            now = new Date();
            query = this.find({
              status: _slideConstants.SLIDE_STATUS.SCHEDULED,
              start_date: {
                $gt: now
              }
            }).sort({
              start_date: 1
            });
            if (options.populate) query.populate(options.populate);
            _context3.n = 1;
            return query.exec();
          case 1:
            return _context3.a(2, _context3.v);
        }
      }, _callee3, this);
    }));

    // Static method: Get statistics
    _this.schema.statics.getStatistics = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _stats$totalViews$, _stats$totalClicks$, _stats$total$, _stats$active$, _stats$inactive$, _stats$draft$, _stats$scheduled$, _stats$published$;
      var slideType,
        matchStage,
        _yield$this$aggregate,
        _yield$this$aggregate2,
        stats,
        totalViews,
        totalClicks,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            slideType = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : null;
            matchStage = slideType ? {
              slide_type: slideType
            } : {};
            _context4.n = 1;
            return this.aggregate([{
              $match: matchStage
            }, {
              $facet: {
                total: [{
                  $count: "count"
                }],
                active: [{
                  $match: {
                    status: _slideConstants.SLIDE_STATUS.ACTIVE
                  }
                }, {
                  $count: "count"
                }],
                inactive: [{
                  $match: {
                    status: _slideConstants.SLIDE_STATUS.INACTIVE
                  }
                }, {
                  $count: "count"
                }],
                draft: [{
                  $match: {
                    status: _slideConstants.SLIDE_STATUS.DRAFT
                  }
                }, {
                  $count: "count"
                }],
                scheduled: [{
                  $match: {
                    status: _slideConstants.SLIDE_STATUS.SCHEDULED
                  }
                }, {
                  $count: "count"
                }],
                published: [{
                  $match: {
                    is_published: true
                  }
                }, {
                  $count: "count"
                }],
                totalViews: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$view_count"
                    }
                  }
                }],
                totalClicks: [{
                  $group: {
                    _id: null,
                    total: {
                      $sum: "$click_count"
                    }
                  }
                }],
                byType: [{
                  $group: {
                    _id: "$slide_type",
                    count: {
                      $sum: 1
                    }
                  }
                }, {
                  $sort: {
                    count: -1
                  }
                }]
              }
            }]);
          case 1:
            _yield$this$aggregate = _context4.v;
            _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
            stats = _yield$this$aggregate2[0];
            totalViews = (stats === null || stats === void 0 || (_stats$totalViews$ = stats.totalViews[0]) === null || _stats$totalViews$ === void 0 ? void 0 : _stats$totalViews$.total) || 0;
            totalClicks = (stats === null || stats === void 0 || (_stats$totalClicks$ = stats.totalClicks[0]) === null || _stats$totalClicks$ === void 0 ? void 0 : _stats$totalClicks$.total) || 0;
            return _context4.a(2, {
              total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
              active: (stats === null || stats === void 0 || (_stats$active$ = stats.active[0]) === null || _stats$active$ === void 0 ? void 0 : _stats$active$.count) || 0,
              inactive: (stats === null || stats === void 0 || (_stats$inactive$ = stats.inactive[0]) === null || _stats$inactive$ === void 0 ? void 0 : _stats$inactive$.count) || 0,
              draft: (stats === null || stats === void 0 || (_stats$draft$ = stats.draft[0]) === null || _stats$draft$ === void 0 ? void 0 : _stats$draft$.count) || 0,
              scheduled: (stats === null || stats === void 0 || (_stats$scheduled$ = stats.scheduled[0]) === null || _stats$scheduled$ === void 0 ? void 0 : _stats$scheduled$.count) || 0,
              published: (stats === null || stats === void 0 || (_stats$published$ = stats.published[0]) === null || _stats$published$ === void 0 ? void 0 : _stats$published$.count) || 0,
              totalViews: totalViews,
              totalClicks: totalClicks,
              averageCTR: totalViews > 0 ? Math.round(totalClicks / totalViews * 10000) / 100 : 0,
              byType: (stats === null || stats === void 0 ? void 0 : stats.byType) || []
            });
        }
      }, _callee4, this);
    }));

    // Instance method: Increment view count
    _this.schema.methods.incrementViews = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var count,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            count = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : 1;
            this.view_count += count;
            _context5.n = 1;
            return this.save();
          case 1:
            return _context5.a(2, _context5.v);
        }
      }, _callee5, this);
    }));

    // Instance method: Increment click count
    _this.schema.methods.incrementClicks = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var count,
        _args6 = arguments;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            count = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : 1;
            this.click_count += count;
            _context6.n = 1;
            return this.save();
          case 1:
            return _context6.a(2, _context6.v);
        }
      }, _callee6, this);
    }));

    // Instance method: Publish slide
    _this.schema.methods.publish = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            this.is_published = true;
            if (this.status === _slideConstants.SLIDE_STATUS.DRAFT) {
              this.status = _slideConstants.SLIDE_STATUS.ACTIVE;
            }
            _context7.n = 1;
            return this.save();
          case 1:
            return _context7.a(2, _context7.v);
        }
      }, _callee7, this);
    }));

    // Instance method: Unpublish slide
    _this.schema.methods.unpublish = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            this.is_published = false;
            _context8.n = 1;
            return this.save();
          case 1:
            return _context8.a(2, _context8.v);
        }
      }, _callee8, this);
    }));

    // Instance method: Activate slide
    _this.schema.methods.activate = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            this.status = _slideConstants.SLIDE_STATUS.ACTIVE;
            _context9.n = 1;
            return this.save();
          case 1:
            return _context9.a(2, _context9.v);
        }
      }, _callee9, this);
    }));

    // Instance method: Deactivate slide
    _this.schema.methods.deactivate = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            this.status = _slideConstants.SLIDE_STATUS.INACTIVE;
            _context0.n = 1;
            return this.save();
          case 1:
            return _context0.a(2, _context0.v);
        }
      }, _callee0, this);
    }));

    // Pre-save hook
    _this.schema.pre("save", /*#__PURE__*/function () {
      var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(next) {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              try {
                // Auto-publish scheduled slides that have reached their start date
                if (this.status === _slideConstants.SLIDE_STATUS.SCHEDULED && this.start_date && new Date() >= this.start_date) {
                  this.status = _slideConstants.SLIDE_STATUS.ACTIVE;
                }

                // Auto-deactivate slides that have passed their end date
                if (this.status === _slideConstants.SLIDE_STATUS.ACTIVE && this.end_date && new Date() > this.end_date) {
                  this.status = _slideConstants.SLIDE_STATUS.INACTIVE;
                }
                next();
              } catch (error) {
                next(error);
              }
            case 1:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      return function (_x2) {
        return _ref1.apply(this, arguments);
      };
    }());

    // Ensure virtuals are included in JSON and Object outputs
    _this.schema.set("toJSON", {
      virtuals: true
    });
    _this.schema.set("toObject", {
      virtuals: true
    });
    return _this;
  }
  _inherits(Slide, _BaseModel);
  return _createClass(Slide);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Slide().getModel("Slide");