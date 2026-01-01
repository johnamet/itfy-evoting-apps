"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheKeyGenerator = exports.CacheInvalidationService = void 0;
var _cacheUtils = _interopRequireDefault(require("./cache.utils.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Cache Invalidation Utilities
 * Smart cache key generation and invalidation patterns
 * Features:
 * - Standardized cache key naming conventions
 * - Entity-based cache invalidation
 * - Relationship-aware cache clearing
 * - Pattern-based bulk invalidation
 */
/**
 * Cache Key Generator
 * Creates standardized cache keys for consistent management
 */
var CacheKeyGenerator = exports.CacheKeyGenerator = /*#__PURE__*/function () {
  function CacheKeyGenerator() {
    _classCallCheck(this, CacheKeyGenerator);
  }
  return _createClass(CacheKeyGenerator, null, [{
    key: "entity",
    value:
    /**
     * Generate entity cache key
     * @param {string} entity - Entity type (e.g., 'user', 'event', 'candidate')
     * @param {string} id - Entity ID
     * @param {string} [suffix] - Optional suffix (e.g., 'profile', 'votes')
     * @returns {string} Cache key
     */
    function entity(_entity, id) {
      var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return suffix ? "".concat(_entity, ":").concat(id, ":").concat(suffix) : "".concat(_entity, ":").concat(id);
    }

    /**
     * Generate list cache key with filters
     * @param {string} entity - Entity type
     * @param {Object} filters - Query filters
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @returns {string} Cache key
     */
  }, {
    key: "list",
    value: function list(entity) {
      var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
      var filterHash = this._hashFilters(filters);
      return "".concat(entity, ":list:").concat(filterHash, ":p").concat(page, ":l").concat(limit);
    }

    /**
     * Generate aggregation/stats cache key
     * @param {string} entity - Entity type
     * @param {string} operation - Operation type (e.g., 'stats', 'count', 'dashboard')
     * @param {Object} params - Operation parameters
     * @returns {string} Cache key
     */
  }, {
    key: "aggregation",
    value: function aggregation(entity, operation) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var paramHash = this._hashFilters(params);
      return "".concat(entity, ":").concat(operation, ":").concat(paramHash);
    }

    /**
     * Generate relationship cache key
     * @param {string} parent - Parent entity
     * @param {string} parentId - Parent ID
     * @param {string} child - Child entity
     * @param {Object} filters - Additional filters
     * @returns {string} Cache key
     */
  }, {
    key: "relationship",
    value: function relationship(parent, parentId, child) {
      var filters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var filterHash = this._hashFilters(filters);
      return "".concat(parent, ":").concat(parentId, ":").concat(child, ":").concat(filterHash);
    }

    /**
     * Generate pattern for bulk invalidation
     * @param {string} entity - Entity type
     * @param {string} [pattern] - Pattern suffix (default: *)
     * @returns {string} Cache pattern
     */
  }, {
    key: "pattern",
    value: function pattern(entity) {
      var _pattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
      return "".concat(entity, ":").concat(_pattern);
    }

    /**
     * Hash filters into consistent string
     * @private
     */
  }, {
    key: "_hashFilters",
    value: function _hashFilters(filters) {
      if (!filters || Object.keys(filters).length === 0) return "default";

      // Sort keys for consistency
      var sorted = Object.keys(filters).sort().map(function (key) {
        return "".concat(key, "=").concat(JSON.stringify(filters[key]));
      }).join("|");

      // Simple hash (for production, consider using crypto)
      return Buffer.from(sorted).toString("base64").substring(0, 16);
    }
  }]);
}();
/**
 * Cache Invalidation Service
 * Handles intelligent cache invalidation for write operations
 */
var CacheInvalidationService = exports.CacheInvalidationService = /*#__PURE__*/function () {
  function CacheInvalidationService() {
    _classCallCheck(this, CacheInvalidationService);
  }
  return _createClass(CacheInvalidationService, null, [{
    key: "invalidateEntity",
    value: (
    /**
     * Invalidate entity and related caches
     * @param {string} entity - Entity type
     * @param {string} id - Entity ID
     * @param {Object} [options] - Invalidation options
     * @param {string[]} [options.relations] - Related entities to invalidate
     * @param {Object} [options.context] - Additional context (eventId, categoryId, etc.)
     * @returns {Promise<number>} Number of keys invalidated
     */
    function () {
      var _invalidateEntity = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(entity, id) {
        var options,
          keysToDelete,
          commonSuffixes,
          _iterator,
          _step,
          relation,
          deletePromises,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              keysToDelete = []; // 1. Invalidate direct entity cache
              keysToDelete.push(CacheKeyGenerator.entity(entity, id));

              // 2. Invalidate entity with all possible suffixes
              commonSuffixes = ["profile", "details", "stats", "votes", "submissions"];
              commonSuffixes.forEach(function (suffix) {
                keysToDelete.push(CacheKeyGenerator.entity(entity, id, suffix));
              });

              // 3. Invalidate all list caches for this entity type
              _context.n = 1;
              return this._invalidatePattern("".concat(entity, ":list:*"));
            case 1:
              _context.n = 2;
              return this._invalidatePattern("".concat(entity, ":stats:*"));
            case 2:
              _context.n = 3;
              return this._invalidatePattern("".concat(entity, ":count:*"));
            case 3:
              _context.n = 4;
              return this._invalidatePattern("".concat(entity, ":dashboard:*"));
            case 4:
              if (!(options.relations && options.relations.length > 0)) {
                _context.n = 12;
                break;
              }
              _iterator = _createForOfIteratorHelper(options.relations);
              _context.p = 5;
              _iterator.s();
            case 6:
              if ((_step = _iterator.n()).done) {
                _context.n = 9;
                break;
              }
              relation = _step.value;
              _context.n = 7;
              return this._invalidatePattern("".concat(relation, ":*:").concat(entity, ":*"));
            case 7:
              _context.n = 8;
              return this._invalidatePattern("".concat(entity, ":").concat(id, ":").concat(relation, ":*"));
            case 8:
              _context.n = 6;
              break;
            case 9:
              _context.n = 11;
              break;
            case 10:
              _context.p = 10;
              _t = _context.v;
              _iterator.e(_t);
            case 11:
              _context.p = 11;
              _iterator.f();
              return _context.f(11);
            case 12:
              if (!options.context) {
                _context.n = 13;
                break;
              }
              _context.n = 13;
              return this._invalidateContextCaches(entity, options.context);
            case 13:
              // Delete specific keys
              deletePromises = keysToDelete.map(function (key) {
                return _cacheUtils["default"].del(key);
              });
              _context.n = 14;
              return Promise.all(deletePromises);
            case 14:
              return _context.a(2, keysToDelete.length);
          }
        }, _callee, this, [[5, 10, 11, 12]]);
      }));
      function invalidateEntity(_x, _x2) {
        return _invalidateEntity.apply(this, arguments);
      }
      return invalidateEntity;
    }()
    /**
     * Invalidate list/paginated caches
     * @param {string} entity - Entity type
     * @param {Object} [filters] - Optional specific filters to invalidate
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "invalidateList",
    value: (function () {
      var _invalidateList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(entity) {
        var filters,
          pattern,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              filters = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
              if (!filters) {
                _context2.n = 2;
                break;
              }
              // Invalidate specific filtered list
              pattern = CacheKeyGenerator.list(entity, filters, "*", "*");
              _context2.n = 1;
              return this._invalidatePattern(pattern.replace(/p\*:l\*/, "*"));
            case 1:
              _context2.n = 3;
              break;
            case 2:
              _context2.n = 3;
              return this._invalidatePattern("".concat(entity, ":list:*"));
            case 3:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function invalidateList(_x3) {
        return _invalidateList.apply(this, arguments);
      }
      return invalidateList;
    }()
    /**
     * Invalidate aggregation caches
     * @param {string} entity - Entity type
     * @param {string} [operation] - Specific operation to invalidate
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "invalidateAggregations",
    value: (function () {
      var _invalidateAggregations = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(entity) {
        var operation,
          operations,
          _i,
          _operations,
          op,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              operation = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
              if (!operation) {
                _context3.n = 2;
                break;
              }
              _context3.n = 1;
              return this._invalidatePattern("".concat(entity, ":").concat(operation, ":*"));
            case 1:
              _context3.n = 5;
              break;
            case 2:
              // Invalidate common aggregation types
              operations = ["stats", "count", "dashboard", "analytics", "summary"];
              _i = 0, _operations = operations;
            case 3:
              if (!(_i < _operations.length)) {
                _context3.n = 5;
                break;
              }
              op = _operations[_i];
              _context3.n = 4;
              return this._invalidatePattern("".concat(entity, ":").concat(op, ":*"));
            case 4:
              _i++;
              _context3.n = 3;
              break;
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function invalidateAggregations(_x4) {
        return _invalidateAggregations.apply(this, arguments);
      }
      return invalidateAggregations;
    }()
    /**
     * Invalidate relationship caches
     * @param {string} parent - Parent entity
     * @param {string} parentId - Parent ID
     * @param {string} child - Child entity
     * @returns {Promise<void>}
     */
    )
  }, {
    key: "invalidateRelationship",
    value: (function () {
      var _invalidateRelationship = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(parent, parentId, child) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._invalidatePattern("".concat(parent, ":").concat(parentId, ":").concat(child, ":*"));
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function invalidateRelationship(_x5, _x6, _x7) {
        return _invalidateRelationship.apply(this, arguments);
      }
      return invalidateRelationship;
    }()
    /**
     * Invalidate context-specific caches (e.g., event dashboard)
     * @private
     */
    )
  }, {
    key: "_invalidateContextCaches",
    value: (function () {
      var _invalidateContextCaches2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(entity, context) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (!context.eventId) {
                _context5.n = 2;
                break;
              }
              _context5.n = 1;
              return this._invalidatePattern("event:".concat(context.eventId, ":*"));
            case 1:
              _context5.n = 2;
              return this._invalidatePattern("analytics:event:".concat(context.eventId, ":*"));
            case 2:
              if (!context.categoryId) {
                _context5.n = 3;
                break;
              }
              _context5.n = 3;
              return this._invalidatePattern("category:".concat(context.categoryId, ":*"));
            case 3:
              if (!context.userId) {
                _context5.n = 5;
                break;
              }
              _context5.n = 4;
              return this._invalidatePattern("user:".concat(context.userId, ":history:*"));
            case 4:
              _context5.n = 5;
              return this._invalidatePattern("user:".concat(context.userId, ":stats:*"));
            case 5:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function _invalidateContextCaches(_x8, _x9) {
        return _invalidateContextCaches2.apply(this, arguments);
      }
      return _invalidateContextCaches;
    }()
    /**
     * Invalidate cache keys matching a pattern
     * @private
     * @param {string} pattern - Pattern with wildcards
     * @returns {Promise<number>} Number of keys deleted
     */
    )
  }, {
    key: "_invalidatePattern",
    value: (function () {
      var _invalidatePattern2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(pattern) {
        var _t2;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return _cacheUtils["default"].deletePattern(pattern);
            case 1:
              return _context6.a(2, _context6.v);
            case 2:
              _context6.p = 2;
              _t2 = _context6.v;
              console.error("Pattern invalidation failed (".concat(pattern, "):"), _t2.message);
              return _context6.a(2, 0);
          }
        }, _callee6, null, [[0, 2]]);
      }));
      function _invalidatePattern(_x0) {
        return _invalidatePattern2.apply(this, arguments);
      }
      return _invalidatePattern;
    }()
    /**
     * Get invalidation strategy for entity type
     * @param {string} entity - Entity type
     * @returns {Object} Invalidation strategy config
     */
    )
  }, {
    key: "getInvalidationStrategy",
    value: function getInvalidationStrategy(entity) {
      var strategies = {
        user: {
          relations: ["candidate", "vote", "submission", "payment", "activity"],
          invalidateAggregations: true,
          contextFields: ["eventId"]
        },
        event: {
          relations: ["category", "candidate", "vote", "submission", "form", "slide"],
          invalidateAggregations: true,
          cascadeDelete: true
        },
        candidate: {
          relations: ["vote", "user", "event", "category"],
          invalidateAggregations: true,
          contextFields: ["eventId", "categoryId", "userId"]
        },
        category: {
          relations: ["candidate", "vote"],
          invalidateAggregations: true,
          contextFields: ["eventId"]
        },
        vote: {
          relations: ["candidate", "category", "event", "user", "payment"],
          invalidateAggregations: true,
          contextFields: ["eventId", "categoryId", "candidateId", "userId"]
        },
        payment: {
          relations: ["vote", "user", "event"],
          invalidateAggregations: true,
          contextFields: ["eventId", "userId"]
        },
        submission: {
          relations: ["form", "event", "user"],
          invalidateAggregations: false,
          contextFields: ["eventId", "formId", "userId"]
        },
        form: {
          relations: ["submission", "event"],
          invalidateAggregations: false,
          contextFields: ["eventId"]
        }
      };
      return strategies[entity] || {
        relations: [],
        invalidateAggregations: false
      };
    }
  }]);
}();