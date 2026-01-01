#!/usr/bin/env node

/**
 * Activity model for audit trails and user history
 * This model tracks all significant actions in the system
 */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _baseModel = require("../shared/base.model.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Activity = /*#__PURE__*/function (_BaseModel) {
  function Activity() {
    var _this;
    _classCallCheck(this, Activity);
    var schemaDefinition = {
      user: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "User",
        required: false,
        // System actions may not have a user
        index: true
      },
      action: {
        type: String,
        required: true,
        "enum": Object.values(_activityConstants.ACTION_TYPE),
        index: true
      },
      entity_type: {
        type: String,
        required: true,
        "enum": Object.values(_activityConstants.ENTITY_TYPE),
        index: true
      },
      entity_id: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        required: false,
        // Some actions may not have a specific entity
        index: true
      },
      event: {
        type: _mongoose["default"].Schema.Types.ObjectId,
        ref: "Event",
        required: false,
        // For filtering activities by event context
        index: true
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      severity: {
        type: String,
        "enum": Object.values(_activityConstants.SEVERITY),
        "default": _activityConstants.SEVERITY.INFO,
        index: true
      },
      ip_address: {
        type: String,
        required: false,
        index: true
      },
      user_agent: {
        type: String,
        required: false
      },
      device: {
        type: {
          device_type: {
            type: String,
            // 'mobile', 'tablet', 'desktop'
            "enum": ["mobile", "tablet", "desktop", "unknown"]
          },
          browser: {
            name: String,
            version: String
          },
          os: {
            name: String,
            version: String
          }
        },
        required: false
      },
      location: {
        type: {
          country: String,
          region: String,
          city: String,
          timezone: String
        },
        required: false
      },
      metadata: {
        type: Map,
        of: _mongoose["default"].Schema.Types.Mixed,
        "default": {}
      },
      changes: {
        type: {
          before: {
            type: _mongoose["default"].Schema.Types.Mixed,
            "default": null
          },
          after: {
            type: _mongoose["default"].Schema.Types.Mixed,
            "default": null
          }
        },
        required: false
      },
      session_id: {
        type: String,
        required: false,
        index: true
      },
      timestamp: {
        type: Date,
        "default": Date.now,
        index: true
      }
    };
    var options = {
      softDelete: false,
      // Activities should never be deleted (immutable audit log)
      timestamps: true
    };
    _this = _callSuper(this, Activity, [schemaDefinition, options]);

    // Create compound indexes for common queries
    _this.schema.index({
      user: 1,
      timestamp: -1
    });
    _this.schema.index({
      event: 1,
      timestamp: -1
    });
    _this.schema.index({
      entity_type: 1,
      entity_id: 1
    });
    _this.schema.index({
      action: 1,
      timestamp: -1
    });
    _this.schema.index({
      severity: 1,
      timestamp: -1
    });
    _this.schema.index({
      timestamp: -1
    }); // For time-series queries

    // Static method: Find user activity history
    _this.schema.statics.findByUser = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userId) {
        var options,
          query,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              query = this.find({
                user: userId
              }).sort({
                timestamp: -1
              });
              if (options.limit) query.limit(options.limit);
              if (options.populate) query.populate(options.populate);
              _context.n = 1;
              return query.exec();
            case 1:
              return _context.a(2, _context.v);
          }
        }, _callee, this);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    // Static method: Find activities by event
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
                timestamp: -1
              });
              if (options.limit) query.limit(options.limit);
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

    // Static method: Find activities by entity
    _this.schema.statics.findByEntity = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(entityType, entityId) {
        var options,
          query,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              query = this.find({
                entity_type: entityType,
                entity_id: entityId
              }).sort({
                timestamp: -1
              });
              if (options.limit) query.limit(options.limit);
              if (options.populate) query.populate(options.populate);
              _context3.n = 1;
              return query.exec();
            case 1:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    // Static method: Find security events
    _this.schema.statics.findSecurityEvents = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var options,
        query,
        _args4 = arguments;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
            query = this.find({
              $or: [{
                action: _activityConstants.ACTION_TYPE.FAILED_LOGIN
              }, {
                action: _activityConstants.ACTION_TYPE.PERMISSION_CHANGE
              }, {
                action: _activityConstants.ACTION_TYPE.SUSPICIOUS_ACTIVITY
              }, {
                severity: _activityConstants.SEVERITY.CRITICAL
              }, {
                severity: _activityConstants.SEVERITY.ERROR
              }]
            }).sort({
              timestamp: -1
            });
            if (options.limit) query.limit(options.limit);
            if (options.populate) query.populate(options.populate);
            _context4.n = 1;
            return query.exec();
          case 1:
            return _context4.a(2, _context4.v);
        }
      }, _callee4, this);
    }));

    // Static method: Get activity count by action
    _this.schema.statics.getActionStatistics = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(startDate, endDate) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.aggregate([{
                $match: {
                  timestamp: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }
              }, {
                $group: {
                  _id: "$action",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }]);
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }();

    // Instance method: Serialize for API response
    _this.schema.methods.deserialize = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var obj = this.toObject();
      delete obj.__v;

      // Convert Map to plain object
      if (obj.metadata) {
        obj.metadata = Object.fromEntries(obj.metadata);
      }
      return obj;
    };
    return _this;
  }
  _inherits(Activity, _BaseModel);
  return _createClass(Activity);
}(_baseModel.BaseModel);
var _default = exports["default"] = new Activity().getModel("Activity");