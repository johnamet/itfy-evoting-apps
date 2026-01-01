"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseRepository = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _cacheInvalidationUtils = require("../../utils/cache/cache-invalidation.utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * The shared repository for all modules
 * This file defines a reusable repository that can be extended by other repositories
 * It contains common data access methods for consistency across the application
 */
var BaseRepository = exports.BaseRepository = /*#__PURE__*/function () {
  /**
   * @param {mongoose.Model} model - The Mongoose model to be used by the repository
   */
  function BaseRepository(model) {
    var _model$modelName;
    _classCallCheck(this, BaseRepository);
    if ((this instanceof BaseRepository ? this.constructor : void 0) === BaseRepository) {
      throw new Error("BaseRepository is an abstract class and cannot be instantiated directly");
    }
    this.model = model;
    this.entityName = (model === null || model === void 0 || (_model$modelName = model.modelName) === null || _model$modelName === void 0 ? void 0 : _model$modelName.toLowerCase()) || "unknown";
    this.cacheEnabled = process.env.ENABLE_REPOSITORY_CACHE !== "false";
  }

  /**
   * Extract context for cache invalidation from document data
   * @private
   * @param {Object} data - Document data
   * @returns {Object} Context object
   */
  return _createClass(BaseRepository, [{
    key: "_extractCacheContext",
    value: function _extractCacheContext(data) {
      var context = {};

      // Common context fields
      var contextFields = ["eventId", "event_id", "categoryId", "category_id", "userId", "user_id", "candidateId", "candidate_id", "formId", "form_id"];
      contextFields.forEach(function (field) {
        if (data[field]) {
          var normalizedField = field.replace(/_/g, "");
          context[normalizedField] = data[field];
        }
      });
      return context;
    }

    /**
     * Invalidate cache after write operations
     * @private
     * @param {string} operation - Operation type (create, update, delete)
     * @param {Object} document - The affected document
     * @param {Object} options - Additional options
     */
  }, {
    key: "_invalidateCache",
    value: (function () {
      var _invalidateCache2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(operation, document) {
        var options,
          _document$_id,
          id,
          context,
          strategy,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              if (!(!this.cacheEnabled || !document)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              id = ((_document$_id = document._id) === null || _document$_id === void 0 ? void 0 : _document$_id.toString()) || document.toString();
              context = this._extractCacheContext(document); // Get entity-specific invalidation strategy
              strategy = _cacheInvalidationUtils.CacheInvalidationService.getInvalidationStrategy(this.entityName); // Invalidate entity and related caches
              _context.n = 2;
              return _cacheInvalidationUtils.CacheInvalidationService.invalidateEntity(this.entityName, id, {
                relations: strategy.relations || [],
                context: context
              });
            case 2:
              if (!strategy.invalidateAggregations) {
                _context.n = 3;
                break;
              }
              _context.n = 3;
              return _cacheInvalidationUtils.CacheInvalidationService.invalidateAggregations(this.entityName);
            case 3:
              if (!this.customCacheInvalidation) {
                _context.n = 4;
                break;
              }
              _context.n = 4;
              return this.customCacheInvalidation(operation, document, context);
            case 4:
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              // Log but don't fail the operation due to cache issues
              console.error("Cache invalidation failed for ".concat(this.entityName, ":"), _t.message);
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 5]]);
      }));
      function _invalidateCache(_x, _x2) {
        return _invalidateCache2.apply(this, arguments);
      }
      return _invalidateCache;
    }()
    /**
     * Find a document by its ID
     * @param {string|mongoose.Types.ObjectId} id - The ID of the document
     * @param {Object} [options] - Options: lean, select, populate, includeDeleted
     * @returns {Promise<Object|null>} - The found document or null
     * @throws {Error} If query fails
     */
    )
  }, {
    key: "findById",
    value: (function () {
      var _findById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
        var options,
          query,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _context2.p = 1;
              query = this.model.findById(id);
              this._applyOptions(query, options);
              _context2.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Find by ID failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function findById(_x3) {
        return _findById.apply(this, arguments);
      }
      return findById;
    }()
    /**
     * Find one document by query
     * @param {Object} filters - Query filters
     * @param {Object} [options] - Options: lean, select, populate, includeDeleted
     * @returns {Promise<Object|null>} - The found document or null
     * @throws {Error} If query fails
     */
    )
  }, {
    key: "findOne",
    value: (function () {
      var _findOne = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(filters) {
        var options,
          query,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              query = this.model.findOne(filters);
              this._applyOptions(query, options);
              _context3.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find one failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findOne(_x4) {
        return _findOne.apply(this, arguments);
      }
      return findOne;
    }()
    /**
     * Find all documents with pagination
     * @param {Object} [filters={}] - Query filters
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Limit per page
     * @param {Object} [options] - Options: lean, select, sort, populate, includeDeleted
     * @returns {Promise<{ data: Array, metadata: Object }>} - Paginated results
     * @throws {Error} If query fails
     */
    )
  }, {
    key: "findAll",
    value: (function () {
      var _findAll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var filters,
          page,
          limit,
          options,
          skip,
          query,
          data,
          countQuery,
          total,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              filters = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
              page = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 1;
              limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 10;
              options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
              _context4.p = 1;
              skip = (page - 1) * limit;
              query = this.model.find(filters).skip(skip).limit(limit);
              this._applyOptions(query, options);
              if (options.sort) query.sort(options.sort);
              _context4.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              data = _context4.v;
              // Count query respects includeDeleted
              countQuery = this.model.countDocuments(filters);
              if (options.includeDeleted) countQuery._includeDeleted = true;
              _context4.n = 3;
              return countQuery.exec();
            case 3:
              total = _context4.v;
              return _context4.a(2, {
                data: data,
                metadata: {
                  page: Number(page),
                  limit: Number(limit),
                  total: total,
                  pages: Math.ceil(total / limit) || 1
                }
              });
            case 4:
              _context4.p = 4;
              _t4 = _context4.v;
              throw new Error("Find all failed: ".concat(_t4.message));
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 4]]);
      }));
      function findAll() {
        return _findAll.apply(this, arguments);
      }
      return findAll;
    }()
    /**
     * Create a new document
     * @param {Object} data - The data to create
     * @param {Object} [options] - Options: lean, exclude (for deserialize)
     * @returns {Promise<Object>} - The created document
     * @throws {Error} If creation fails
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(data) {
        var options,
          document,
          savedDoc,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              document = new this.model(data);
              _context5.n = 2;
              return document.save();
            case 2:
              savedDoc = _context5.v;
              _context5.n = 3;
              return this._invalidateCache("create", savedDoc, options);
            case 3:
              return _context5.a(2, options.lean ? savedDoc.deserialize(options) : savedDoc);
            case 4:
              _context5.p = 4;
              _t5 = _context5.v;
              if (!(_t5.code === 11000)) {
                _context5.n = 5;
                break;
              }
              throw new Error("Duplicate key error: ".concat(JSON.stringify(_t5.keyValue)));
            case 5:
              throw new Error("Creation failed: ".concat(_t5.message));
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 4]]);
      }));
      function create(_x5) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Update a document by query
     * @param {Object} query - Query to find the document
     * @param {Object} data - Data to update
     * @param {Object} [options] - Options: lean, new: true, includeDeleted
     * @returns {Promise<Object|null>} - Updated document or null
     * @throws {Error} If update fails
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(query, data) {
        var options,
          updateQuery,
          updatedDoc,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
              _context6.p = 1;
              updateQuery = this.model.findOneAndUpdate(query, _objectSpread(_objectSpread({}, data), {}, {
                updated_at: Date.now()
              }), _objectSpread({
                "new": true
              }, options));
              if (options.includeDeleted) updateQuery._includeDeleted = true;
              this._applyOptions(updateQuery, options);
              _context6.n = 2;
              return updateQuery.lean(options.lean).exec();
            case 2:
              updatedDoc = _context6.v;
              if (!updatedDoc) {
                _context6.n = 3;
                break;
              }
              _context6.n = 3;
              return this._invalidateCache("update", updatedDoc, options);
            case 3:
              return _context6.a(2, updatedDoc);
            case 4:
              _context6.p = 4;
              _t6 = _context6.v;
              throw new Error("Update failed: ".concat(_t6.message));
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 4]]);
      }));
      function update(_x6, _x7) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Update a document by ID
     * @param {string|mongoose.Types.ObjectId} id - Document ID
     * @param {Object} data - Data to update
     * @param {Object} [options] - Options: lean, includeDeleted
     * @returns {Promise<Object|null>} - Updated document
     * @throws {Error} If update fails
     */
    )
  }, {
    key: "updateById",
    value: (function () {
      var _updateById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id, data) {
        var options,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
              return _context7.a(2, this.update({
                _id: id
              }, data, options));
          }
        }, _callee7, this);
      }));
      function updateById(_x8, _x9) {
        return _updateById.apply(this, arguments);
      }
      return updateById;
    }()
    /**
     * Soft delete a document by ID
     * @param {Object} query - Query to find the document
     * @param {Object} [options] - Options: lean
     * @returns {Promise<Object|null>} - Soft-deleted document
     * @throws {Error} If delete fails
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(query) {
        var options,
          deleteQuery,
          deletedDoc,
          _args8 = arguments,
          _t7;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              _context8.p = 1;
              deleteQuery = this.model.findOneAndUpdate(query, {
                deleted_at: Date.now()
              }, {
                "new": true
              });
              if (options.includeDeleted) deleteQuery._includeDeleted = true;
              _context8.n = 2;
              return deleteQuery.lean(options.lean).exec();
            case 2:
              deletedDoc = _context8.v;
              if (!deletedDoc) {
                _context8.n = 3;
                break;
              }
              _context8.n = 3;
              return this._invalidateCache("delete", deletedDoc, options);
            case 3:
              return _context8.a(2, deletedDoc);
            case 4:
              _context8.p = 4;
              _t7 = _context8.v;
              throw new Error("Soft delete failed: ".concat(_t7.message));
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 4]]);
      }));
      function _delete(_x0) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Restore a soft-deleted document by ID
     * @param  {Object} - Query 
     * @param {Object} [options] - Options: lean
     * @returns {Promise<Object|null>} - Restored document
     * @throws {Error} If restore fails
     */
    )
  }, {
    key: "restore",
    value: (function () {
      var _restore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(query) {
        var options,
          q,
          restoredDoc,
          _args9 = arguments,
          _t8;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              q = this.model.findOneAndUpdate(query, {
                deleted_at: null
              }, {
                "new": true
              });
              q._includeDeleted = true; // Bypass filter to find deleted doc
              _context9.n = 2;
              return q.lean(options.lean).exec();
            case 2:
              restoredDoc = _context9.v;
              if (!restoredDoc) {
                _context9.n = 3;
                break;
              }
              _context9.n = 3;
              return this._invalidateCache("restore", restoredDoc, options);
            case 3:
              return _context9.a(2, restoredDoc);
            case 4:
              _context9.p = 4;
              _t8 = _context9.v;
              throw new Error("Restore failed: ".concat(_t8.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 4]]);
      }));
      function restore(_x1) {
        return _restore.apply(this, arguments);
      }
      return restore;
    }()
    /**
     * Permanently delete a document by ID
     * @param {Object} query - 
     * @param {Object} [options] - Options: includeDeleted
     * @returns {Promise<Object|null>} - Deleted document
     * @throws {Error} If force delete fails
     */
    )
  }, {
    key: "forceDelete",
    value: (function () {
      var _forceDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(query) {
        var options,
          q,
          deletedDoc,
          _args0 = arguments,
          _t9;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              _context0.p = 1;
              q = this.model.findOneAndDelete(query);
              if (options.includeDeleted) q._includeDeleted = true;
              _context0.n = 2;
              return q.exec();
            case 2:
              deletedDoc = _context0.v;
              if (!deletedDoc) {
                _context0.n = 3;
                break;
              }
              _context0.n = 3;
              return this._invalidateCache("forceDelete", deletedDoc, options);
            case 3:
              console.log('Force deleted document:', deletedDoc);
              return _context0.a(2, deletedDoc);
            case 4:
              _context0.p = 4;
              _t9 = _context0.v;
              throw new Error("Force delete failed: ".concat(_t9.message));
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 4]]);
      }));
      function forceDelete(_x10) {
        return _forceDelete.apply(this, arguments);
      }
      return forceDelete;
    }()
    /**
     * Execute a callback within a Mongoose transaction
     * @param {Function} callback - Async function with session
     * @returns {Promise<any>} - Result of callback
     * @throws {Error} If transaction fails
     */
    )
  }, {
    key: "transaction",
    value: (function () {
      var _transaction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(callback) {
        var session, result, _t0;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.n = 1;
              return _mongoose["default"].startSession();
            case 1:
              session = _context1.v;
              session.startTransaction();
              _context1.p = 2;
              _context1.n = 3;
              return callback(session);
            case 3:
              result = _context1.v;
              _context1.n = 4;
              return session.commitTransaction();
            case 4:
              return _context1.a(2, result);
            case 5:
              _context1.p = 5;
              _t0 = _context1.v;
              _context1.n = 6;
              return session.abortTransaction();
            case 6:
              throw _t0;
            case 7:
              _context1.p = 7;
              session.endSession();
              return _context1.f(7);
            case 8:
              return _context1.a(2);
          }
        }, _callee1, null, [[2, 5, 7, 8]]);
      }));
      function transaction(_x11) {
        return _transaction.apply(this, arguments);
      }
      return transaction;
    }()
    /**
     * Count documents matching filters
     * @param {Object} [filters={}] - Query filters
     * @param {Object} [options] - Options: includeDeleted
     * @returns {Promise<number>} - Count of matching documents
     * @throws {Error} If count fails
     */
    )
  }, {
    key: "count",
    value: (function () {
      var _count = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var filters,
          options,
          query,
          _args10 = arguments,
          _t1;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              filters = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : {};
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              query = this.model.countDocuments(filters);
              if (options.includeDeleted) query._includeDeleted = true;
              _context10.n = 2;
              return query.exec();
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t1 = _context10.v;
              throw new Error("Count failed: ".concat(_t1.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function count() {
        return _count.apply(this, arguments);
      }
      return count;
    }()
    /**
     * Perform aggregation
     * @param {Array} pipeline - Aggregation pipeline
     * @param {Object} [options] - Options: allowDiskUse
     * @returns {Promise<Array>} - Aggregation result
     * @throws {Error} If aggregation fails
     */
    )
  }, {
    key: "aggregate",
    value: (function () {
      var _aggregate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(pipeline) {
        var options,
          agg,
          _args11 = arguments,
          _t10;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              agg = this.model.aggregate(pipeline);
              if (options.allowDiskUse) agg.allowDiskUse(true);
              _context11.n = 2;
              return agg.exec();
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t10 = _context11.v;
              throw new Error("Aggregation failed: ".concat(_t10.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function aggregate(_x12) {
        return _aggregate.apply(this, arguments);
      }
      return aggregate;
    }() // === PRIVATE HELPER ===
    )
  }, {
    key: "_applyOptions",
    value: function _applyOptions(query, options) {
      if (options.select) query.select(options.select);
      if (options.populate) {
        // Only apply populate if it's a string or array, not a boolean flag
        if (typeof options.populate === 'string') {
          query.populate(options.populate);
        } else if (Array.isArray(options.populate)) {
          options.populate.forEach(function (p) {
            return query.populate(p);
          });
        }
        // If it's a boolean (true/false), ignore it - let the service handle population logic
      }
      if (options.includeDeleted) {
        query._includeDeleted = true;
      }
    }
  }]);
}();