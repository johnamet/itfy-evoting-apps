"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CouponController = void 0;
var _baseController = _interopRequireDefault(require("../../shared/base.controller.js"));
var _couponService = _interopRequireDefault(require("./coupon.service.js"));
var _couponValidation = _interopRequireDefault(require("./coupon.validation.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Coupon Controller
 * Handles HTTP requests for coupon management and validation
 */
var CouponController = exports.CouponController = /*#__PURE__*/function (_BaseController) {
  function CouponController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CouponController);
    return _callSuper(this, CouponController, [{
      couponService: dependencies.couponService || _couponService["default"]
    }]);
  }

  // ==================== COUPON CRUD ====================

  /**
   * Create a new coupon
   * POST /api/coupons
   */
  _inherits(CouponController, _BaseController);
  return _createClass(CouponController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, adminId, coupon;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _couponValidation["default"].createCouponSchema);
              adminId = this.getUserId(req);
              _context.n = 1;
              return this.service("couponService").createCoupon(validated, adminId);
            case 1:
              coupon = _context.v;
              return _context.a(2, this.created(res, {
                data: coupon,
                message: "Coupon created successfully"
              }));
          }
        }, _callee, this);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Get all coupons with pagination and filters
     * GET /api/coupons
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, search, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["event", "status", "discount_type", "is_public"]);
              sort = this.getSort(req, "-created_at");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  code: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  description: {
                    $regex: search,
                    $options: "i"
                  }
                }];
              }
              _context2.n = 1;
              return this.service("couponService").repository.findAll(filters, page, limit, {
                sort: sort
              });
            case 1:
              result = _context2.v;
              return _context2.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee2, this);
      }));
      function list(_x3, _x4) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
    /**
     * Get coupon by ID
     * GET /api/coupons/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, coupon;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("couponService").getCouponById(id);
            case 1:
              coupon = _context3.v;
              return _context3.a(2, this.success(res, {
                data: coupon
              }));
          }
        }, _callee3, this);
      }));
      function getById(_x5, _x6) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Get coupon by code
     * GET /api/coupons/code/:code
     */
    )
  }, {
    key: "getByCode",
    value: (function () {
      var _getByCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var code, coupon;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              code = req.params.code;
              _context4.n = 1;
              return this.service("couponService").getCouponByCode(code.toUpperCase());
            case 1:
              coupon = _context4.v;
              return _context4.a(2, this.success(res, {
                data: coupon
              }));
          }
        }, _callee4, this);
      }));
      function getByCode(_x7, _x8) {
        return _getByCode.apply(this, arguments);
      }
      return getByCode;
    }()
    /**
     * Update coupon
     * PUT /api/coupons/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id, validated, adminId, coupon;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _couponValidation["default"].updateCouponSchema);
              adminId = this.getUserId(req);
              _context5.n = 1;
              return this.service("couponService").updateCoupon(id, validated, adminId);
            case 1:
              coupon = _context5.v;
              return _context5.a(2, this.success(res, {
                data: coupon,
                message: "Coupon updated successfully"
              }));
          }
        }, _callee5, this);
      }));
      function update(_x9, _x0) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete coupon (soft delete)
     * DELETE /api/coupons/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id, adminId;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context6.n = 1;
              return this.service("couponService").deleteCoupon(id, adminId);
            case 1:
              return _context6.a(2, this.success(res, {
                message: "Coupon deleted successfully"
              }));
          }
        }, _callee6, this);
      }));
      function _delete(_x1, _x10) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== STATUS MANAGEMENT ====================
    /**
     * Activate coupon
     * PUT /api/coupons/:id/activate
     */
    )
  }, {
    key: "activate",
    value: function () {
      var _activate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var id, adminId, coupon;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context7.n = 1;
              return this.service("couponService").activateCoupon(id, adminId);
            case 1:
              coupon = _context7.v;
              return _context7.a(2, this.success(res, {
                data: coupon,
                message: "Coupon activated successfully"
              }));
          }
        }, _callee7, this);
      }));
      function activate(_x11, _x12) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
    /**
     * Deactivate coupon
     * PUT /api/coupons/:id/deactivate
     */
  }, {
    key: "deactivate",
    value: (function () {
      var _deactivate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, adminId, coupon;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context8.n = 1;
              return this.service("couponService").deactivateCoupon(id, adminId);
            case 1:
              coupon = _context8.v;
              return _context8.a(2, this.success(res, {
                data: coupon,
                message: "Coupon deactivated successfully"
              }));
          }
        }, _callee8, this);
      }));
      function deactivate(_x13, _x14) {
        return _deactivate.apply(this, arguments);
      }
      return deactivate;
    }() // ==================== VALIDATION & REDEMPTION ====================
    /**
     * Validate coupon for a bundle
     * POST /api/coupons/validate
     */
    )
  }, {
    key: "validateCoupon",
    value: function () {
      var _validateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var _req$user;
        var validated, userEmail, result;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              validated = this.validate(req.body, _couponValidation["default"].validateCouponSchema);
              userEmail = ((_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.email) || req.body.user_email;
              _context9.n = 1;
              return this.service("couponService").validateCouponForBundle(validated.code, validated.bundle_id, userEmail);
            case 1:
              result = _context9.v;
              return _context9.a(2, this.success(res, {
                data: result
              }));
          }
        }, _callee9, this);
      }));
      function validateCoupon(_x15, _x16) {
        return _validateCoupon.apply(this, arguments);
      }
      return validateCoupon;
    }()
    /**
     * Apply coupon to a purchase
     * POST /api/coupons/apply
     */
  }, {
    key: "applyCoupon",
    value: (function () {
      var _applyCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var _req$user2;
        var validated, userEmail, validationResult, coupon, discountAmount, finalAmount, _t;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              validated = this.validate(req.body, _couponValidation["default"].applyCouponSchema);
              userEmail = ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.email) || req.body.user_email; // First validate the coupon
              _context0.n = 1;
              return this.service("couponService").validateCouponForBundle(validated.code, validated.bundle_id, userEmail);
            case 1:
              validationResult = _context0.v;
              if (validationResult.isValid) {
                _context0.n = 2;
                break;
              }
              return _context0.a(2, this.badRequest(res, {
                message: validationResult.reason
              }));
            case 2:
              // Calculate discount
              coupon = validationResult.coupon;
              discountAmount = 0;
              _t = coupon.discount_type;
              _context0.n = _t === "PERCENTAGE" ? 3 : _t === "FIXED" ? 4 : _t === "BONUS_VOTES" ? 5 : 6;
              break;
            case 3:
              discountAmount = validated.purchase_amount * coupon.discount_value / 100;
              if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
                discountAmount = coupon.max_discount_amount;
              }
              return _context0.a(3, 6);
            case 4:
              discountAmount = Math.min(coupon.discount_value, validated.purchase_amount);
              return _context0.a(3, 6);
            case 5:
              // Bonus votes don't reduce the price
              discountAmount = 0;
              return _context0.a(3, 6);
            case 6:
              finalAmount = validated.purchase_amount - discountAmount;
              return _context0.a(2, this.success(res, {
                data: {
                  coupon_code: coupon.code,
                  discount_type: coupon.discount_type,
                  discount_value: coupon.discount_value,
                  discount_amount: discountAmount,
                  original_amount: validated.purchase_amount,
                  final_amount: finalAmount,
                  bonus_votes: coupon.discount_type === "BONUS_VOTES" ? coupon.discount_value : 0
                },
                message: "Coupon applied successfully"
              }));
          }
        }, _callee0, this);
      }));
      function applyCoupon(_x17, _x18) {
        return _applyCoupon.apply(this, arguments);
      }
      return applyCoupon;
    }() // ==================== EVENT-BASED QUERIES ====================
    /**
     * Get coupons by event
     * GET /api/coupons/event/:eventId
     */
    )
  }, {
    key: "getByEvent",
    value: function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var eventId, _this$getPagination2, page, limit, result;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              _context1.n = 1;
              return this.service("couponService").getCouponsByEvent(eventId, page, limit);
            case 1:
              result = _context1.v;
              return _context1.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee1, this);
      }));
      function getByEvent(_x19, _x20) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }()
    /**
     * Get active coupons for event
     * GET /api/coupons/event/:eventId/active
     */
  }, {
    key: "getActiveByEvent",
    value: (function () {
      var _getActiveByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var eventId, coupons;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              eventId = req.params.eventId;
              _context10.n = 1;
              return this.service("couponService").getActiveCoupons(eventId);
            case 1:
              coupons = _context10.v;
              return _context10.a(2, this.success(res, {
                data: coupons
              }));
          }
        }, _callee10, this);
      }));
      function getActiveByEvent(_x21, _x22) {
        return _getActiveByEvent.apply(this, arguments);
      }
      return getActiveByEvent;
    }()
    /**
     * Get public coupons
     * GET /api/coupons/public
     */
    )
  }, {
    key: "getPublic",
    value: (function () {
      var _getPublic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var eventId, coupons;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              eventId = req.query.event || null;
              _context11.n = 1;
              return this.service("couponService").getPublicCoupons(eventId);
            case 1:
              coupons = _context11.v;
              return _context11.a(2, this.success(res, {
                data: coupons
              }));
          }
        }, _callee11, this);
      }));
      function getPublic(_x23, _x24) {
        return _getPublic.apply(this, arguments);
      }
      return getPublic;
    }() // ==================== STATISTICS ====================
    /**
     * Get coupon statistics
     * GET /api/coupons/:id/stats
     */
    )
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var id, stats;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              id = req.params.id;
              _context12.n = 1;
              return this.service("couponService").getCouponStats(id);
            case 1:
              stats = _context12.v;
              return _context12.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee12, this);
      }));
      function getStats(_x25, _x26) {
        return _getStats.apply(this, arguments);
      }
      return getStats;
    }()
    /**
     * Get user's redemption count for a coupon
     * GET /api/coupons/:id/user-redemptions
     */
  }, {
    key: "getUserRedemptions",
    value: (function () {
      var _getUserRedemptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var _req$user3;
        var id, userEmail, count;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              id = req.params.id;
              userEmail = req.query.email || ((_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.email);
              if (userEmail) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2, this.badRequest(res, {
                message: "User email is required"
              }));
            case 1:
              _context13.n = 2;
              return this.service("couponService").getUserRedemptionCount(id, userEmail);
            case 2:
              count = _context13.v;
              return _context13.a(2, this.success(res, {
                data: {
                  coupon_id: id,
                  user_email: userEmail,
                  redemption_count: count
                }
              }));
          }
        }, _callee13, this);
      }));
      function getUserRedemptions(_x27, _x28) {
        return _getUserRedemptions.apply(this, arguments);
      }
      return getUserRedemptions;
    }() // ==================== UTILITY ====================
    /**
     * Generate a unique coupon code
     * POST /api/coupons/generate-code
     */
    )
  }, {
    key: "generateCode",
    value: function () {
      var _generateCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var prefix, code;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              prefix = req.body.prefix || "";
              _context14.n = 1;
              return this.service("couponService").generateCouponCode(prefix);
            case 1:
              code = _context14.v;
              return _context14.a(2, this.success(res, {
                data: {
                  code: code
                }
              }));
          }
        }, _callee14, this);
      }));
      function generateCode(_x29, _x30) {
        return _generateCode.apply(this, arguments);
      }
      return generateCode;
    }()
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new CouponController();