"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * The base model for all models
 * This file defines a reusable base model that can be extended by other models
 * It contains common methods, fields, and hooks for consistency across the application
 */
/**
 * @typedef {Object} BaseSchemaOptions
 * @property {boolean} [softDelete=true] - Enable soft delete functionality
 * // Removed timestamps option to avoid duplication; using manual fields
 */
/**
 * @class BaseModel
 * @abstract
 */
var BaseModel = exports.BaseModel = /*#__PURE__*/function () {
  function BaseModel(schemaDefinition) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, BaseModel);
    if ((this instanceof BaseModel ? this.constructor : void 0) === BaseModel) {
      throw new Error("BaseModel is an abstract class and cannot be instantiated directly");
    }
    this.schemaDefinition = schemaDefinition;
    this.options = _objectSpread(_objectSpread({
      softDelete: true
    }, options), {}, {
      timestamps: false // Force false to use manual snake_case fields
    });
    var baseSchema = _objectSpread(_objectSpread({}, this.schemaDefinition), {}, {
      created_at: {
        type: Date,
        "default": Date.now,
        immutable: true
      },
      updated_at: {
        type: Date,
        "default": Date.now
      },
      deleted_at: {
        type: Date,
        "default": null
      }
    });
    this.schema = new _mongoose["default"].Schema(baseSchema, this.options);

    // Pre-save hook with error handling (manual timestamp update)
    this.schema.pre("save", function (next) {
      try {
        if (!this.isNew && this.deleted_at) {
          return next(new Error("Cannot update a deleted document"));
        }
        this.updated_at = Date.now();
        next();
      } catch (error) {
        next(error);
      }
    });

    // Conditional soft-delete middleware
    if (this.options.softDelete) {
      var softDeleteFilter = function softDeleteFilter() {
        if (!this._includeDeleted) {
          this.where({
            deleted_at: null
          });
        }
      };
      this.schema.pre("find", softDeleteFilter);
      this.schema.pre("findOne", softDeleteFilter);
      this.schema.pre("updateMany", softDeleteFilter);
      this.schema.pre("updateOne", softDeleteFilter);
      this.schema.pre("findOneAndUpdate", softDeleteFilter);
      this.schema.pre("countDocuments", softDeleteFilter); // Added for count accuracy
    }

    // Static: Find all with pagination
    this.schema.statics.findAll = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var filters,
        page,
        limit,
        options,
        skip,
        query,
        data,
        total,
        _args = arguments,
        _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            filters = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
            limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 10;
            options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            _context.p = 1;
            skip = (page - 1) * limit;
            query = this.find(filters).skip(skip).limit(limit);
            if (options.includeDeleted) {
              query._includeDeleted = true; // Bypass soft-delete
            }
            _context.n = 2;
            return query.select(options.select).lean(options.lean).exec();
          case 2:
            data = _context.v;
            _context.n = 3;
            return this.countDocuments(filters).exec();
          case 3:
            total = _context.v;
            return _context.a(2, {
              data: data,
              metadata: {
                page: page,
                limit: limit,
                total: total,
                pages: Math.ceil(total / limit)
              }
            });
          case 4:
            _context.p = 4;
            _t = _context.v;
            throw new Error("Find all failed: ".concat(_t.message));
          case 5:
            return _context.a(2);
        }
      }, _callee, this, [[1, 4]]);
    }));

    // Static: Soft delete a document
    this.schema.statics.softDelete = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
        var _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.findByIdAndUpdate(id, {
                deleted_at: Date.now()
              }, {
                "new": true
              }).exec();
            case 1:
              return _context2.a(2, _context2.v);
            case 2:
              _context2.p = 2;
              _t2 = _context2.v;
              throw new Error("Soft delete failed: ".concat(_t2.message));
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    // Static: Restore a soft-deleted document
    this.schema.statics.restore = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        var query, doc, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              query = this.findByIdAndUpdate(id, {
                deleted_at: null
              }, {
                "new": true
              });
              query._includeDeleted = true; // Bypass filter to find deleted doc
              _context3.n = 1;
              return query.exec();
            case 1:
              doc = _context3.v;
              if (doc) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, null);
            case 2:
              if (doc.deleted_at) {
                _context3.n = 3;
                break;
              }
              throw new Error('Document is not deleted');
            case 3:
              return _context3.a(2, doc);
            case 4:
              _context3.p = 4;
              _t3 = _context3.v;
              throw new Error("Restore failed: ".concat(_t3.message));
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 4]]);
      }));
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    // Static: Hard delete a document permanently
    this.schema.statics.forceDelete = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
        var query, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              query = this.findByIdAndDelete(id);
              query._includeDeleted = true; // Allow deleting deleted docs
              _context4.n = 1;
              return query.exec();
            case 1:
              return _context4.a(2, _context4.v);
            case 2:
              _context4.p = 2;
              _t4 = _context4.v;
              throw new Error("Force delete failed: ".concat(_t4.message));
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 2]]);
      }));
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    // Static: Execute a callback within a Mongoose transaction
    this.schema.statics.transaction = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(callback) {
        var session, result, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.n = 1;
              return _mongoose["default"].startSession();
            case 1:
              session = _context5.v;
              session.startTransaction();
              _context5.p = 2;
              _context5.n = 3;
              return callback(session);
            case 3:
              result = _context5.v;
              _context5.n = 4;
              return session.commitTransaction();
            case 4:
              return _context5.a(2, result);
            case 5:
              _context5.p = 5;
              _t5 = _context5.v;
              _context5.n = 6;
              return session.abortTransaction();
            case 6:
              throw _t5;
            case 7:
              _context5.p = 7;
              session.endSession();
              return _context5.f(7);
            case 8:
              return _context5.a(2);
          }
        }, _callee5, null, [[2, 5, 7, 8]]);
      }));
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    // Instance method: Deserialize with options
    this.schema.methods.deserialize = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var obj = this.toObject();
      delete obj.__v;
      var excludeFields = options.exclude || ['password_hash', 'deleted_at'];
      excludeFields.forEach(function (field) {
        if (obj[field] !== undefined) delete obj[field];
      });
      return obj;
    };

    // Virtual: isDeleted status
    this.schema.virtual("isDeleted").get(function () {
      return !!this.deleted_at;
    });
  }

  /**
   * Get the Mongoose model
   * @param {string} modelName - Name of the model
   * @returns {mongoose.Model} Mongoose model
   */
  return _createClass(BaseModel, [{
    key: "getModel",
    value: function getModel(modelName) {
      return _mongoose["default"].model(modelName, this.schema);
    }
  }]);
}();