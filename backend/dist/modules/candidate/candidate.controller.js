"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CandidateController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _candidateService = _interopRequireDefault(require("./candidate.service.js"));
var _candidateValidation = _interopRequireDefault(require("./candidate.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
 * Candidate Controller
 * Handles HTTP requests for candidate management operations
 */
var CandidateController = exports.CandidateController = /*#__PURE__*/function (_BaseController) {
  function CandidateController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CandidateController);
    return _callSuper(this, CandidateController, [{
      candidateService: dependencies.candidateService || _candidateService["default"]
    }]);
  }

  // ==================== CANDIDATE SELF-SERVICE ====================

  /**
   * Request to be added to additional category (candidate self-service)
   * POST /api/candidates/profile/categories
   */
  _inherits(CandidateController, _BaseController);
  return _createClass(CandidateController, [{
    key: "requestCategoryAddition",
    value: function () {
      var _requestCategoryAddition = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var candidateId, categoryId, candidate;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              candidateId = req.candidate._id;
              categoryId = req.body.categoryId;
              if (categoryId) {
                _context.n = 1;
                break;
              }
              return _context.a(2, this.badRequest(res, "Category ID is required"));
            case 1:
              _context.n = 2;
              return this.service("candidateService").addCategory(candidateId, categoryId);
            case 2:
              candidate = _context.v;
              return _context.a(2, this.success(res, {
                data: candidate,
                message: "Category addition request submitted successfully. Awaiting admin approval."
              }));
          }
        }, _callee, this);
      }));
      function requestCategoryAddition(_x, _x2) {
        return _requestCategoryAddition.apply(this, arguments);
      }
      return requestCategoryAddition;
    }() // ==================== PUBLIC ROUTES ====================
    /**
     * Get all published and approved candidates (public)
     * GET /api/candidates/public
     */
  }, {
    key: "listPublic",
    value: function () {
      var _listPublic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, search, _yield$Promise$all, _yield$Promise$all2, candidates, total;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = _objectSpread({
                is_published: true,
                status: "approved"
              }, this.getFilters(req, ["event", "categories"]));
              sort = this.getSort(req, "-vote_count");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  first_name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  last_name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  bio: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  candidate_code: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context2.n = 1;
              return Promise.all([this.service("candidateService").findAll(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("candidateService").count(filters)]);
            case 1:
              _yield$Promise$all = _context2.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              candidates = _yield$Promise$all2[0];
              total = _yield$Promise$all2[1];
              return _context2.a(2, this.paginated(res, {
                data: candidates,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee2, this);
      }));
      function listPublic(_x3, _x4) {
        return _listPublic.apply(this, arguments);
      }
      return listPublic;
    }()
    /**
     * Get candidate by slug (public)
     * GET /api/candidates/slug/:slug
     */
  }, {
    key: "getBySlug",
    value: (function () {
      var _getBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var slug, candidate;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              slug = req.params.slug;
              _context3.n = 1;
              return this.service("candidateService").getCandidateBySlug(slug);
            case 1:
              candidate = _context3.v;
              if (candidate) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, this.notFound(res, {
                resource: "Candidate"
              }));
            case 2:
              if (!(!candidate.is_published || candidate.status !== "approved")) {
                _context3.n = 3;
                break;
              }
              return _context3.a(2, this.notFound(res, {
                resource: "Candidate"
              }));
            case 3:
              return _context3.a(2, this.success(res, {
                data: candidate
              }));
          }
        }, _callee3, this);
      }));
      function getBySlug(_x5, _x6) {
        return _getBySlug.apply(this, arguments);
      }
      return getBySlug;
    }() // ==================== CANDIDATE CRUD (ADMIN) ====================
    /**
     * Create a new candidate (admin)
     * POST /api/candidates
     */
    )
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var validated, adminId, candidate;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              validated = this.validate(req.body, _candidateValidation["default"].createCandidateSchema);
              adminId = this.getUserId(req);
              _context4.n = 1;
              return this.service("candidateService").createCandidate(validated, adminId);
            case 1:
              candidate = _context4.v;
              return _context4.a(2, this.created(res, {
                data: candidate,
                message: "Candidate created successfully"
              }));
          }
        }, _callee4, this);
      }));
      function create(_x7, _x8) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Get all candidates with pagination and filters
     * GET /api/candidates
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var _this$getPagination2, page, limit, skip, filters, sort, search, _yield$Promise$all3, _yield$Promise$all4, candidates, total;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit, skip = _this$getPagination2.skip;
              filters = this.getFilters(req, ["status", "event", "categories"]);
              sort = this.getSort(req);
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  first_name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  last_name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  email: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  code: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context5.n = 1;
              return Promise.all([this.service("candidateService").findAll(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("candidateService").count(filters)]);
            case 1:
              _yield$Promise$all3 = _context5.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              candidates = _yield$Promise$all4[0];
              total = _yield$Promise$all4[1];
              return _context5.a(2, this.paginated(res, {
                data: candidates,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee5, this);
      }));
      function list(_x9, _x0) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get candidate by ID
     * GET /api/candidates/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id, candidate;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              _context6.n = 1;
              return this.service("candidateService").getProfile(id);
            case 1:
              candidate = _context6.v;
              if (candidate) {
                _context6.n = 2;
                break;
              }
              return _context6.a(2, this.notFound(res, {
                resource: "Candidate"
              }));
            case 2:
              return _context6.a(2, this.success(res, {
                data: candidate
              }));
          }
        }, _callee6, this);
      }));
      function getById(_x1, _x10) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Get candidate by code (public)
     * GET /api/candidates/code/:code
     */
    )
  }, {
    key: "getByCode",
    value: (function () {
      var _getByCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var code, candidate;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              code = req.params.code;
              _context7.n = 1;
              return this.service("candidateService").getCandidateByCode(code);
            case 1:
              candidate = _context7.v;
              if (candidate) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2, this.notFound(res, {
                resource: "Candidate"
              }));
            case 2:
              return _context7.a(2, this.success(res, {
                data: candidate
              }));
          }
        }, _callee7, this);
      }));
      function getByCode(_x11, _x12) {
        return _getByCode.apply(this, arguments);
      }
      return getByCode;
    }()
    /**
     * Update candidate (admin)
     * PUT /api/candidates/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, validated, adminId, candidate;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _candidateValidation["default"].updateCandidateSchema);
              adminId = this.getUserId(req);
              _context8.n = 1;
              return this.service("candidateService").updateCandidateByAdmin(id, validated, adminId);
            case 1:
              candidate = _context8.v;
              return _context8.a(2, this.success(res, {
                data: candidate,
                message: "Candidate updated successfully"
              }));
          }
        }, _callee8, this);
      }));
      function update(_x13, _x14) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete candidate (soft delete)
     * DELETE /api/candidates/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var id, adminId;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context9.n = 1;
              return this.service("candidateService").deleteCandidate(id, adminId);
            case 1:
              return _context9.a(2, this.success(res, {
                message: "Candidate deleted successfully"
              }));
          }
        }, _callee9, this);
      }));
      function _delete(_x15, _x16) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== CANDIDATE PROFILE (SELF) ====================
    /**
     * Get own profile (candidate authenticated)
     * GET /api/candidates/profile
     */
    )
  }, {
    key: "getProfile",
    value: function () {
      var _getProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var candidateId, candidate;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              candidateId = this.getUserId(req);
              _context0.n = 1;
              return this.service("candidateService").getProfile(candidateId);
            case 1:
              candidate = _context0.v;
              return _context0.a(2, this.success(res, {
                data: candidate
              }));
          }
        }, _callee0, this);
      }));
      function getProfile(_x17, _x18) {
        return _getProfile.apply(this, arguments);
      }
      return getProfile;
    }()
    /**
     * Update own profile (candidate authenticated)
     * PUT /api/candidates/profile
     */
  }, {
    key: "updateProfile",
    value: (function () {
      var _updateProfile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var candidateId, validated, candidate;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              candidateId = this.getUserId(req);
              validated = this.validate(req.body, _candidateValidation["default"].updateProfileSchema);
              _context1.n = 1;
              return this.service("candidateService").updateProfileByCandidate(candidateId, validated);
            case 1:
              candidate = _context1.v;
              return _context1.a(2, this.success(res, {
                data: candidate,
                message: "Profile updated successfully"
              }));
          }
        }, _callee1, this);
      }));
      function updateProfile(_x19, _x20) {
        return _updateProfile.apply(this, arguments);
      }
      return updateProfile;
    }()
    /**
     * Get profile update history (candidate authenticated)
     * GET /api/candidates/profile/history
     */
    )
  }, {
    key: "getProfileHistory",
    value: (function () {
      var _getProfileHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var candidateId, history;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              candidateId = this.getUserId(req);
              _context10.n = 1;
              return this.service("candidateService").getProfileUpdateHistory(candidateId);
            case 1:
              history = _context10.v;
              return _context10.a(2, this.success(res, {
                data: history
              }));
          }
        }, _callee10, this);
      }));
      function getProfileHistory(_x21, _x22) {
        return _getProfileHistory.apply(this, arguments);
      }
      return getProfileHistory;
    }()
    /**
     * Get own statistics (candidate authenticated)
     * GET /api/candidates/profile/stats
     */
    )
  }, {
    key: "getMyStats",
    value: (function () {
      var _getMyStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var candidateId, stats;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              candidateId = this.getUserId(req);
              _context11.n = 1;
              return this.service("candidateService").getCandidateStats(candidateId);
            case 1:
              stats = _context11.v;
              return _context11.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee11, this);
      }));
      function getMyStats(_x23, _x24) {
        return _getMyStats.apply(this, arguments);
      }
      return getMyStats;
    }()
    /**
     * Upload profile image (candidate authenticated)
     * POST /api/candidates/profile/image
     */
    )
  }, {
    key: "uploadProfileImage",
    value: (function () {
      var _uploadProfileImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var candidateId, imagePath, candidate, FileService, imageUrl;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              candidateId = this.getUserId(req);
              if (req.file) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, this.badRequest(res, {
                message: "No image file provided"
              }));
            case 1:
              imagePath = req.file.path || "uploads/".concat(req.file.filename);
              _context12.n = 2;
              return this.service("candidateService").updateProfileImage(candidateId, imagePath);
            case 2:
              candidate = _context12.v;
              _context12.n = 3;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 3:
              FileService = _context12.v["default"];
              imageUrl = FileService.getFileUrl(candidate.profile_image);
              return _context12.a(2, this.success(res, {
                data: {
                  image_url: imageUrl
                },
                message: "Profile image uploaded successfully"
              }));
          }
        }, _callee12, this);
      }));
      function uploadProfileImage(_x25, _x26) {
        return _uploadProfileImage.apply(this, arguments);
      }
      return uploadProfileImage;
    }()
    /**
     * Delete profile image (candidate authenticated)
     * DELETE /api/candidates/profile/image
     */
    )
  }, {
    key: "deleteProfileImage",
    value: (function () {
      var _deleteProfileImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var candidateId;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              candidateId = this.getUserId(req);
              _context13.n = 1;
              return this.service("candidateService").deleteProfileImage(candidateId);
            case 1:
              return _context13.a(2, this.success(res, {
                message: "Profile image deleted successfully"
              }));
          }
        }, _callee13, this);
      }));
      function deleteProfileImage(_x27, _x28) {
        return _deleteProfileImage.apply(this, arguments);
      }
      return deleteProfileImage;
    }()
    /**
     * Upload cover image (candidate authenticated)
     * POST /api/candidates/profile/cover
     */
    )
  }, {
    key: "uploadCoverImage",
    value: (function () {
      var _uploadCoverImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var candidateId, imagePath, candidate, FileService, imageUrl;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              candidateId = this.getUserId(req);
              if (req.file) {
                _context14.n = 1;
                break;
              }
              return _context14.a(2, this.badRequest(res, {
                message: "No image file provided"
              }));
            case 1:
              imagePath = req.file.path || "uploads/".concat(req.file.filename);
              _context14.n = 2;
              return this.service("candidateService").updateCoverImage(candidateId, imagePath);
            case 2:
              candidate = _context14.v;
              _context14.n = 3;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 3:
              FileService = _context14.v["default"];
              imageUrl = FileService.getFileUrl(candidate.cover_image);
              return _context14.a(2, this.success(res, {
                data: {
                  image_url: imageUrl
                },
                message: "Cover image uploaded successfully"
              }));
          }
        }, _callee14, this);
      }));
      function uploadCoverImage(_x29, _x30) {
        return _uploadCoverImage.apply(this, arguments);
      }
      return uploadCoverImage;
    }()
    /**
     * Upload gallery images (candidate authenticated)
     * POST /api/candidates/profile/gallery
     */
    )
  }, {
    key: "uploadGalleryImages",
    value: (function () {
      var _uploadGalleryImages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var candidateId, imagePaths, candidate, FileService, galleryUrls;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              candidateId = this.getUserId(req);
              if (!(!req.files || req.files.length === 0)) {
                _context15.n = 1;
                break;
              }
              return _context15.a(2, this.badRequest(res, {
                message: "No image files provided"
              }));
            case 1:
              imagePaths = req.files.map(function (file) {
                return file.path || "uploads/".concat(file.filename);
              });
              _context15.n = 2;
              return this.service("candidateService").addGalleryImages(candidateId, imagePaths);
            case 2:
              candidate = _context15.v;
              _context15.n = 3;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("../../services/file.service.js"));
              });
            case 3:
              FileService = _context15.v["default"];
              galleryUrls = FileService.getFileUrls(candidate.gallery);
              return _context15.a(2, this.success(res, {
                data: {
                  gallery: galleryUrls
                },
                message: "Gallery images uploaded successfully"
              }));
          }
        }, _callee15, this);
      }));
      function uploadGalleryImages(_x31, _x32) {
        return _uploadGalleryImages.apply(this, arguments);
      }
      return uploadGalleryImages;
    }()
    /**
     * Delete gallery image (candidate authenticated)
     * DELETE /api/candidates/profile/gallery
     */
    )
  }, {
    key: "deleteGalleryImage",
    value: (function () {
      var _deleteGalleryImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var candidateId, image_url;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              candidateId = this.getUserId(req);
              image_url = req.query.image_url;
              if (image_url) {
                _context16.n = 1;
                break;
              }
              return _context16.a(2, this.badRequest(res, {
                message: "Image URL is required"
              }));
            case 1:
              _context16.n = 2;
              return this.service("candidateService").removeGalleryImage(candidateId, image_url);
            case 2:
              return _context16.a(2, this.success(res, {
                message: "Gallery image deleted successfully"
              }));
          }
        }, _callee16, this);
      }));
      function deleteGalleryImage(_x33, _x34) {
        return _deleteGalleryImage.apply(this, arguments);
      }
      return deleteGalleryImage;
    }() // ==================== CANDIDATE STATUS (ADMIN) ====================
    /**
     * Approve candidate
     * PUT /api/candidates/:id/approve
     */
    )
  }, {
    key: "approve",
    value: function () {
      var _approve = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var id, adminId, candidate;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context17.n = 1;
              return this.service("candidateService").approveCandidate(id, adminId);
            case 1:
              candidate = _context17.v;
              return _context17.a(2, this.success(res, {
                data: candidate,
                message: "Candidate approved successfully"
              }));
          }
        }, _callee17, this);
      }));
      function approve(_x35, _x36) {
        return _approve.apply(this, arguments);
      }
      return approve;
    }()
    /**
     * Reject candidate
     * PUT /api/candidates/:id/reject
     */
  }, {
    key: "reject",
    value: (function () {
      var _reject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var id, reason, adminId, candidate;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              id = req.params.id;
              reason = req.body.reason;
              adminId = this.getUserId(req);
              _context18.n = 1;
              return this.service("candidateService").rejectCandidate(id, reason, adminId);
            case 1:
              candidate = _context18.v;
              return _context18.a(2, this.success(res, {
                data: candidate,
                message: "Candidate rejected"
              }));
          }
        }, _callee18, this);
      }));
      function reject(_x37, _x38) {
        return _reject.apply(this, arguments);
      }
      return reject;
    }()
    /**
     * Suspend candidate
     * PUT /api/candidates/:id/suspend
     */
    )
  }, {
    key: "suspend",
    value: (function () {
      var _suspend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
        var id, reason, adminId, candidate;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              id = req.params.id;
              reason = req.body.reason;
              adminId = this.getUserId(req);
              _context19.n = 1;
              return this.service("candidateService").suspendCandidate(id, reason, adminId);
            case 1:
              candidate = _context19.v;
              return _context19.a(2, this.success(res, {
                data: candidate,
                message: "Candidate suspended"
              }));
          }
        }, _callee19, this);
      }));
      function suspend(_x39, _x40) {
        return _suspend.apply(this, arguments);
      }
      return suspend;
    }()
    /**
     * Reinstate candidate
     * PUT /api/candidates/:id/reinstate
     */
    )
  }, {
    key: "reinstate",
    value: (function () {
      var _reinstate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
        var id, adminId, candidate;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context20.n = 1;
              return this.service("candidateService").reinstateCandidate(id, adminId);
            case 1:
              candidate = _context20.v;
              return _context20.a(2, this.success(res, {
                data: candidate,
                message: "Candidate reinstated"
              }));
          }
        }, _callee20, this);
      }));
      function reinstate(_x41, _x42) {
        return _reinstate.apply(this, arguments);
      }
      return reinstate;
    }() // ==================== CATEGORY MANAGEMENT ====================
    /**
     * Add candidate to categories
     * POST /api/candidates/:id/categories
     */
    )
  }, {
    key: "addToCategories",
    value: function () {
      var _addToCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
        var id, validated, adminId, candidate;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _candidateValidation["default"].addCategoriesSchema);
              adminId = this.getUserId(req);
              _context21.n = 1;
              return this.service("candidateService").addToCategories(id, validated.categories, adminId);
            case 1:
              candidate = _context21.v;
              return _context21.a(2, this.success(res, {
                data: candidate,
                message: "Candidate added to categories"
              }));
          }
        }, _callee21, this);
      }));
      function addToCategories(_x43, _x44) {
        return _addToCategories.apply(this, arguments);
      }
      return addToCategories;
    }()
    /**
     * Remove candidate from categories
     * DELETE /api/candidates/:id/categories
     */
  }, {
    key: "removeFromCategories",
    value: (function () {
      var _removeFromCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
        var id, validated, adminId, candidate;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _candidateValidation["default"].removeCategoriesSchema);
              adminId = this.getUserId(req);
              _context22.n = 1;
              return this.service("candidateService").removeFromCategories(id, validated.categories, adminId);
            case 1:
              candidate = _context22.v;
              return _context22.a(2, this.success(res, {
                data: candidate,
                message: "Candidate removed from categories"
              }));
          }
        }, _callee22, this);
      }));
      function removeFromCategories(_x45, _x46) {
        return _removeFromCategories.apply(this, arguments);
      }
      return removeFromCategories;
    }()
    /**
     * Get candidate's categories
     * GET /api/candidates/:id/categories
     */
    )
  }, {
    key: "getCategories",
    value: (function () {
      var _getCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
        var id, categories;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.n) {
            case 0:
              id = req.params.id;
              _context23.n = 1;
              return this.service("candidateService").getCandidateCategories(id);
            case 1:
              categories = _context23.v;
              return _context23.a(2, this.success(res, {
                data: categories
              }));
          }
        }, _callee23, this);
      }));
      function getCategories(_x47, _x48) {
        return _getCategories.apply(this, arguments);
      }
      return getCategories;
    }() // ==================== CANDIDATE STATISTICS ====================
    /**
     * Get candidate statistics
     * GET /api/candidates/:id/stats
     */
    )
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(req, res) {
        var id, stats;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              id = req.params.id;
              _context24.n = 1;
              return this.service("candidateService").getCandidateStats(id);
            case 1:
              stats = _context24.v;
              return _context24.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee24, this);
      }));
      function getStats(_x49, _x50) {
        return _getStats.apply(this, arguments);
      }
      return getStats;
    }()
    /**
     * Get candidate vote count
     * GET /api/candidates/:id/votes
     */
  }, {
    key: "getVotes",
    value: (function () {
      var _getVotes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(req, res) {
        var id, votes;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.n) {
            case 0:
              id = req.params.id;
              _context25.n = 1;
              return this.service("candidateService").getCandidateVotes(id);
            case 1:
              votes = _context25.v;
              return _context25.a(2, this.success(res, {
                data: votes
              }));
          }
        }, _callee25, this);
      }));
      function getVotes(_x51, _x52) {
        return _getVotes.apply(this, arguments);
      }
      return getVotes;
    }() // ==================== BULK OPERATIONS ====================
    /**
     * Bulk approve candidates
     * POST /api/candidates/bulk/approve
     */
    )
  }, {
    key: "bulkApprove",
    value: function () {
      var _bulkApprove = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(req, res) {
        var validated, adminId, result;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              validated = this.validate(req.body, _candidateValidation["default"].bulkOperationSchema);
              adminId = this.getUserId(req);
              _context26.n = 1;
              return this.service("candidateService").bulkApprove(validated.candidateIds, adminId);
            case 1:
              result = _context26.v;
              return _context26.a(2, this.success(res, {
                data: result,
                message: "".concat(result.modifiedCount, " candidates approved")
              }));
          }
        }, _callee26, this);
      }));
      function bulkApprove(_x53, _x54) {
        return _bulkApprove.apply(this, arguments);
      }
      return bulkApprove;
    }()
    /**
     * Bulk reject candidates
     * POST /api/candidates/bulk/reject
     */
  }, {
    key: "bulkReject",
    value: (function () {
      var _bulkReject = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(req, res) {
        var validated, adminId, result;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              validated = this.validate(req.body, _candidateValidation["default"].bulkRejectSchema);
              adminId = this.getUserId(req);
              _context27.n = 1;
              return this.service("candidateService").bulkReject(validated.candidateIds, validated.reason, adminId);
            case 1:
              result = _context27.v;
              return _context27.a(2, this.success(res, {
                data: result,
                message: "".concat(result.modifiedCount, " candidates rejected")
              }));
          }
        }, _callee27, this);
      }));
      function bulkReject(_x55, _x56) {
        return _bulkReject.apply(this, arguments);
      }
      return bulkReject;
    }() // ==================== EVENT-SPECIFIC ====================
    /**
     * Get candidates by event
     * GET /api/events/:eventId/candidates
     */
    )
  }, {
    key: "getByEvent",
    value: function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(req, res) {
        var eventId, _this$getPagination3, page, limit, skip, filters, sort, _yield$Promise$all5, _yield$Promise$all6, candidates, total;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit, skip = _this$getPagination3.skip;
              filters = _objectSpread({
                event: eventId
              }, this.getFilters(req, ["status", "categories"]));
              sort = this.getSort(req);
              _context28.n = 1;
              return Promise.all([this.service("candidateService").findAll(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("candidateService").count(filters)]);
            case 1:
              _yield$Promise$all5 = _context28.v;
              _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 2);
              candidates = _yield$Promise$all6[0];
              total = _yield$Promise$all6[1];
              return _context28.a(2, this.paginated(res, {
                data: candidates,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee28, this);
      }));
      function getByEvent(_x57, _x58) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get public candidates for voting (approved only)
     * GET /api/events/:eventId/candidates/public
     */
  }, {
    key: "getPublicByEvent",
    value: (function () {
      var _getPublicByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(req, res) {
        var eventId, _this$getPagination4, page, limit, skip, categoryId, _yield$Promise$all7, _yield$Promise$all8, candidates, total;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit, skip = _this$getPagination4.skip;
              categoryId = req.query.category;
              _context29.n = 1;
              return Promise.all([this.service("candidateService").getPublicCandidates(eventId, categoryId, {
                skip: skip,
                limit: limit
              }), this.service("candidateService").countPublicCandidates(eventId, categoryId)]);
            case 1:
              _yield$Promise$all7 = _context29.v;
              _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 2);
              candidates = _yield$Promise$all8[0];
              total = _yield$Promise$all8[1];
              return _context29.a(2, this.paginated(res, {
                data: candidates,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee29, this);
      }));
      function getPublicByEvent(_x59, _x60) {
        return _getPublicByEvent.apply(this, arguments);
      }
      return getPublicByEvent;
    }())
  }]);
}(_baseController["default"]); // Export both class and singleton instance
var _default = exports["default"] = new CandidateController();