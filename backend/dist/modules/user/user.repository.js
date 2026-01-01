"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRepository = exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _userModel = _interopRequireDefault(require("./user.model.js"));
var _errorConstants = require("../../utils/constants/error.constants.js");
var _userConstants = require("../../utils/constants/user.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * The user repository for the user module
 * This file provides data access functions for user-related operations
 * It extends BaseRepository and adds user-specific business logic
 */
var UserRepository = /*#__PURE__*/function (_BaseRepository) {
  function UserRepository() {
    _classCallCheck(this, UserRepository);
    return _callSuper(this, UserRepository, [_userModel["default"]]);
  }

  /**
   * Create a new user
   * @param {Object} data - User data to save
   * @param {Object} [options] - Options like {lean: true}
   * @returns {Promise<Object>} - The created user document
   * @throws {Error} If user creation fails or email is duplicate
   */
  _inherits(UserRepository, _BaseRepository);
  return _createClass(UserRepository, [{
    key: "createUser",
    value: (function () {
      var _createUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
        var options,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              if (!(!data.email || !data.password_hash || !data.role)) {
                _context.n = 2;
                break;
              }
              throw new Error(_errorConstants.ERROR_MESSAGES.MISSING_REQUIRED_FIELDS);
            case 2:
              _context.n = 3;
              return this.create(data, options);
            case 3:
              return _context.a(2, _context.v);
            case 4:
              _context.p = 4;
              _t = _context.v;
              if (!_t.message.includes("Duplicate key")) {
                _context.n = 5;
                break;
              }
              throw new Error(_errorConstants.ERROR_MESSAGES.DUPLICATE_EMAIL);
            case 5:
              throw new Error("User creation failed: ".concat(_t.message));
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 4]]);
      }));
      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }
      return createUser;
    }()
    /**
    * Update a user by id
    * @param {string} id - The user's ID
    * @param {Object} data - Fields to update
    * @param {Object} [options] - Options like { lean: true, includeDeleted: true }
    * @returns {Promise<Object|null>} - The updated user document or null if not found
    * @throws {Error} If update fails  
    */
    )
  }, {
    key: "updateById",
    value: (function () {
      var _updateById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id, data) {
        var options,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.update({
                _id: id
              }, data, options);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Update user failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function updateById(_x2, _x3) {
        return _updateById.apply(this, arguments);
      }
      return updateById;
    }()
    /**
     * Find a user by id
     * @param {string} id - The user's ID
     * @param {Object} [options] - Options like { lean: true, select: 'email role' }
     * @returns {Promise<Object|null>} - The user document or null if not found
     * @throws {Error} If query fails
     */
    )
  }, {
    key: "findById",
    value: (function () {
      var _findById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return this.findOne({
                _id: id
              }, options);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Find user by ID failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function findById(_x4) {
        return _findById.apply(this, arguments);
      }
      return findById;
    }()
    /**
     * Find a user by email address
     * @param {string} email - The user's email address
     * @param {Object} [options] - Options like { lean: true, select: 'password_hash status' }
     * @returns {Promise<Object|null>} - The user document or null if not found
     * @throws {Error} If query fails
     */
    )
  }, {
    key: "findByEmail",
    value: (function () {
      var _findByEmail = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(email) {
        var options,
          select,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              select = options.select || "-photo_url -created_at -updated_at";
              _context4.n = 2;
              return this.findOne({
                email: email
              }, _objectSpread(_objectSpread({}, options), {}, {
                select: select
              }));
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Find user by email failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function findByEmail(_x5) {
        return _findByEmail.apply(this, arguments);
      }
      return findByEmail;
    }()
    /**
     * Verify user credentials (email + password)
     * @param {string} email - User's email
     * @param {string} password - Plain text password
     * @returns {Promise<Object|null>} - User if valid, null if not
     * @throws {Error} If query fails
     */
    )
  }, {
    key: "verifyCredentials",
    value: (function () {
      var _verifyCredentials = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(email, password) {
        var user, isValid, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.findByEmail(email, {
                select: "+password_hash"
              });
            case 1:
              user = _context5.v;
              if (!(!user || !user.verifyPassword)) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2, null);
            case 2:
              _context5.n = 3;
              return user.verifyPassword(password);
            case 3:
              isValid = _context5.v;
              return _context5.a(2, isValid ? user : null);
            case 4:
              _context5.p = 4;
              _t5 = _context5.v;
              throw new Error("Credential verification failed: ".concat(_t5.message));
            case 5:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 4]]);
      }));
      function verifyCredentials(_x6, _x7) {
        return _verifyCredentials.apply(this, arguments);
      }
      return verifyCredentials;
    }()
    /**
    * Search users across roles with profile name matching
    * @param {string} searchTerm - Term to search in email, name
    * @param {number} [page=1] - Page number
    * @param {number} [limit=10] - Results per page
    * @param {Object} [options] - Options: lean, select, sort, populate, includeDeleted
    * @returns {Promise<{ data: Array, metadata: Object }>}
    * @throws {Error} If search fails
    */
    )
  }, {
    key: "searchUsers",
    value: (function () {
      var _searchUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(searchTerm) {
        var page,
          limit,
          options,
          select,
          _options$sort,
          sort,
          pipeline,
          result,
          _ref,
          _ref$data,
          data,
          _ref$metadata,
          metadata,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
              limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 10;
              options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
              _context6.p = 1;
              select = options.select, _options$sort = options.sort, sort = _options$sort === void 0 ? {
                created_at: -1
              } : _options$sort;
              pipeline = [
              // Join profiles
              {
                $lookup: {
                  from: "users",
                  localField: "_id",
                  as: "admin"
                }
              },
              // Build searchable fields
              {
                $addFields: {
                  searchable: {
                    $concatArrays: [["$email"], {
                      $cond: [{
                        $gt: [{
                          $size: "$admin"
                        }, 0]
                      }, [{
                        $getField: {
                          field: "name",
                          input: {
                            $arrayElemAt: ["$admin", 0]
                          }
                        }
                      }], []]
                    }]
                  }
                }
              },
              // Match search term
              {
                $match: _objectSpread({
                  $or: [{
                    email: {
                      $regex: searchTerm,
                      $options: "i"
                    }
                  }, {
                    searchable: {
                      $regex: searchTerm,
                      $options: "i"
                    }
                  }]
                }, options.includeDeleted ? {} : {
                  deleted_at: null
                })
              },
              // Project unified profile
              {
                $addFields: {
                  profile: {
                    $arrayElemAt: ['admin', 0]
                  }
                }
              },
              // Final projection
              {
                $project: {
                  email: 1,
                  role: 1,
                  is_active: 1,
                  status: 1,
                  photo_url: 1,
                  created_at: 1,
                  updated_at: 1,
                  profile: {
                    $cond: [{
                      $ne: ["$profile", null]
                    }, {
                      _id: "$profile._id",
                      name: "$profile.name",
                      bio: "$profile.bio",
                      role: "$profile.role",
                      permissions: "$profile.permissions"
                    }, null]
                  }
                }
              }].concat(_toConsumableArray(select ? [{
                $project: this._parseSelectFields(select)
              }] : []), [
              // Facet for pagination
              {
                $facet: {
                  data: [{
                    $sort: sort
                  }, {
                    $skip: (page - 1) * limit
                  }, {
                    $limit: limit
                  }],
                  metadata: [{
                    $count: "total"
                  }]
                }
              }, {
                $project: {
                  data: 1,
                  metadata: {
                    page: {
                      $literal: page
                    },
                    limit: {
                      $literal: limit
                    },
                    total: {
                      $ifNull: [{
                        $arrayElemAt: ["$metadata.total", 0]
                      }, 0]
                    },
                    pages: {
                      $ceil: {
                        $divide: [{
                          $ifNull: [{
                            $arrayElemAt: ["$metadata.total", 0]
                          }, 0]
                        }, limit]
                      }
                    }
                  }
                }
              }]);
              _context6.n = 2;
              return this.aggregate(pipeline, {
                allowDiskUse: true
              });
            case 2:
              result = _context6.v;
              _ref = result[0] || {}, _ref$data = _ref.data, data = _ref$data === void 0 ? [] : _ref$data, _ref$metadata = _ref.metadata, metadata = _ref$metadata === void 0 ? {} : _ref$metadata;
              return _context6.a(2, {
                data: data,
                metadata: metadata[0] || {
                  page: Number(page),
                  limit: Number(limit),
                  total: 0,
                  pages: 0
                }
              });
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("User search failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function searchUsers(_x8) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
    /**
     * Soft delete a user (override to cascade to profile if needed)
     * @param {string} id - User ID
     * @returns {Promise<Object|null>}
     */
    )
  }, {
    key: "deleteUser",
    value: (function () {
      var _deleteUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(id) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              return _context7.a(2, this["delete"]({
                _id: id
              }));
          }
        }, _callee7, this);
      }));
      function deleteUser(_x9) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }()
    /**
     * Restore a soft-deleted user
     * @param {string} id - User ID
     * @param {Object} [options]
     * @returns {Promise<Object|null>}
     */
    )
  }, {
    key: "restoreUser",
    value: (function () {
      var _restoreUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(id) {
        var options,
          _args8 = arguments;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              return _context8.a(2, this.restore({
                _id: id
              }, options));
          }
        }, _callee8, this);
      }));
      function restoreUser(_x0) {
        return _restoreUser.apply(this, arguments);
      }
      return restoreUser;
    }()
    /**
    * Get users eligible for token generation
    * @param {Object} [options]
    * @returns {Promise<Array>}
    */
    )
  }, {
    key: "getEligibleUsers",
    value: (function () {
      var _getEligibleUsers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
        var options,
          filters,
          _args9 = arguments;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
              filters = {
                status: _userConstants.STATUS.ACTIVE,
                deleted_at: null
              };
              _context9.n = 1;
              return this.findAll(filters, 1, 1000, options);
            case 1:
              return _context9.a(2, _context9.v.data);
          }
        }, _callee9, this);
      }));
      function getEligibleUsers() {
        return _getEligibleUsers.apply(this, arguments);
      }
      return getEligibleUsers;
    }()
    /**
     * Hard delete user
     * @param {string} id - User ID
     * @returns {Promise<Object|null>}
     * @param {Object} [options]
     * @returns {Promise<Object|null>}
     */
    )
  }, {
    key: "hardDelete",
    value: (function () {
      var _hardDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(id) {
        var options,
          _args0 = arguments;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              return _context0.a(2, this.forceDelete({
                _id: id
              }, options));
          }
        }, _callee0, this);
      }));
      function hardDelete(_x1) {
        return _hardDelete.apply(this, arguments);
      }
      return hardDelete;
    }() // === PRIVATE HELPER ===
    )
  }, {
    key: "_parseSelectFields",
    value: function _parseSelectFields(selectStr) {
      return Object.fromEntries(selectStr.split(" ").filter(Boolean).map(function (field) {
        return [field.replace(/^-/, ""), field.startsWith("-") ? 0 : 1];
      }));
    }
  }]);
}(_baseRepository.BaseRepository);
var userRepository = exports.userRepository = new UserRepository();
var _default = exports["default"] = userRepository;