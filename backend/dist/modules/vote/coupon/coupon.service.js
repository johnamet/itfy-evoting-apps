"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CouponService = void 0;
var _baseService = _interopRequireDefault(require("../../shared/base.service.js"));
var _couponRepository = _interopRequireDefault(require("./coupon.repository.js"));
var _bundleRepository = _interopRequireDefault(require("../bundle/bundle.repository.js"));
var _eventRepository = _interopRequireDefault(require("../../event/event.repository.js"));
var _activityService = _interopRequireDefault(require("../../activity/activity.service.js"));
var _couponValidation = _interopRequireDefault(require("./coupon.validation.js"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _activityConstants = require("../../../utils/constants/activity.constants.js");
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
 * Coupon Service
 * Handles business logic for coupon management and validation
 */
// Set validation schemas for BaseService.validate()
_baseService["default"].setValidation(_couponValidation["default"]);
var CouponService = exports.CouponService = /*#__PURE__*/function (_BaseService) {
  function CouponService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CouponService);
    _this = _callSuper(this, CouponService);
    _this.repository = dependencies.repository || _couponRepository["default"];
    _this.bundleRepository = dependencies.bundleRepository || _bundleRepository["default"];
    _this.eventRepository = dependencies.eventRepository || _eventRepository["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    return _this;
  }

  /**
   * Generate unique coupon code
   * @param {string} prefix - Optional prefix
   * @returns {Promise<string>} - Unique coupon code
   */
  _inherits(CouponService, _BaseService);
  return _createClass(CouponService, [{
    key: "generateCouponCode",
    value: (function () {
      var _generateCouponCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var prefix,
          code,
          exists,
          randomPart,
          existing,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              prefix = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
              _context.p = 1;
              exists = true;
            case 2:
              if (!exists) {
                _context.n = 4;
                break;
              }
              randomPart = _crypto["default"].randomBytes(4).toString("hex").toUpperCase();
              code = prefix ? "".concat(prefix, "-").concat(randomPart) : randomPart;
              _context.n = 3;
              return this.repository.findByCode(code);
            case 3:
              existing = _context.v;
              exists = !!existing;
              _context.n = 2;
              break;
            case 4:
              return _context.a(2, code);
            case 5:
              _context.p = 5;
              _t = _context.v;
              throw new Error("Failed to generate coupon code: ".concat(_t.message));
            case 6:
              return _context.a(2);
          }
        }, _callee, this, [[1, 5]]);
      }));
      function generateCouponCode() {
        return _generateCouponCode.apply(this, arguments);
      }
      return generateCouponCode;
    }()
    /**
     * Create a new coupon
     * @param {Object} couponData - Coupon data
     * @param {string} adminId - Admin creating the coupon
     * @returns {Promise<Object>} - Created coupon
     */
    )
  }, {
    key: "createCoupon",
    value: (function () {
      var _createCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(couponData, adminId) {
        var validatedData, event, existing, bundles, couponToCreate, coupon, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(_objectSpread(_objectSpread({}, couponData), {}, {
                created_by: adminId
              }), _couponValidation["default"].createCouponSchema); // Validate event exists
              _context2.n = 1;
              return this.eventRepository.findById(validatedData.event);
            case 1:
              event = _context2.v;
              if (event) {
                _context2.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (validatedData.code) {
                _context2.n = 4;
                break;
              }
              _context2.n = 3;
              return this.generateCouponCode();
            case 3:
              validatedData.code = _context2.v;
              _context2.n = 6;
              break;
            case 4:
              // Ensure code is uppercase and check uniqueness
              validatedData.code = validatedData.code.toUpperCase();
              _context2.n = 5;
              return this.repository.findByCode(validatedData.code);
            case 5:
              existing = _context2.v;
              if (!existing) {
                _context2.n = 6;
                break;
              }
              throw new Error("Coupon code already exists");
            case 6:
              if (!(validatedData.applicable_bundles && validatedData.applicable_bundles.length > 0)) {
                _context2.n = 8;
                break;
              }
              _context2.n = 7;
              return this.bundleRepository.findAll({
                _id: {
                  $in: validatedData.applicable_bundles
                },
                event: validatedData.event
              }, 1, validatedData.applicable_bundles.length);
            case 7:
              bundles = _context2.v;
              if (!(bundles.data.length !== validatedData.applicable_bundles.length)) {
                _context2.n = 8;
                break;
              }
              throw new Error("One or more bundles not found or do not belong to this event");
            case 8:
              // Note: Validation schema already validates discount_value ranges
              couponToCreate = _objectSpread(_objectSpread({}, validatedData), {}, {
                current_redemptions: 0
              });
              _context2.n = 9;
              return this.repository.create(couponToCreate);
            case 9:
              coupon = _context2.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: coupon._id,
                eventId: coupon.event,
                description: "Created coupon: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code,
                  discountType: coupon.discount_type,
                  discountValue: coupon.discount_value
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context2.a(2, coupon);
            case 10:
              _context2.p = 10;
              _t2 = _context2.v;
              throw new Error("Failed to create coupon: ".concat(_t2.message));
            case 11:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 10]]);
      }));
      function createCoupon(_x, _x2) {
        return _createCoupon.apply(this, arguments);
      }
      return createCoupon;
    }()
    /**
     * Update a coupon
     * @param {string} couponId - Coupon ID
     * @param {Object} updateData - Update data
     * @param {string} adminId - Admin updating the coupon
     * @returns {Promise<Object>} - Updated coupon
     */
    )
  }, {
    key: "updateCoupon",
    value: (function () {
      var _updateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(couponId, updateData, adminId) {
        var validatedData, coupon, bundles, discountType, discountValue, validityStart, validityEnd, updatedCoupon, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(_objectSpread(_objectSpread({}, updateData), {}, {
                updated_by: adminId
              }), _couponValidation["default"].updateCouponSchema);
              _context3.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context3.v;
              if (coupon) {
                _context3.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              if (!(updateData.applicable_bundles && updateData.applicable_bundles.length > 0)) {
                _context3.n = 4;
                break;
              }
              _context3.n = 3;
              return this.bundleRepository.findAll({
                _id: {
                  $in: updateData.applicable_bundles
                },
                event: coupon.event
              }, 1, updateData.applicable_bundles.length);
            case 3:
              bundles = _context3.v;
              if (!(bundles.data.length !== updateData.applicable_bundles.length)) {
                _context3.n = 4;
                break;
              }
              throw new Error("One or more bundles not found or do not belong to this event");
            case 4:
              // Validate discount value if changed
              discountType = updateData.discount_type || coupon.discount_type;
              discountValue = updateData.discount_value !== undefined ? updateData.discount_value : coupon.discount_value;
              if (!(discountType === _voteConstants.DISCOUNT_TYPE.PERCENTAGE && (discountValue < 0 || discountValue > 100))) {
                _context3.n = 5;
                break;
              }
              throw new Error("Percentage discount must be between 0 and 100");
            case 5:
              if (!(discountType === _voteConstants.DISCOUNT_TYPE.FIXED && discountValue <= 0)) {
                _context3.n = 6;
                break;
              }
              throw new Error("Fixed discount must be greater than 0");
            case 6:
              if (!(discountType === _voteConstants.DISCOUNT_TYPE.BONUS_VOTES && (discountValue <= 0 || !Number.isInteger(discountValue)))) {
                _context3.n = 7;
                break;
              }
              throw new Error("Bonus votes must be a positive integer");
            case 7:
              // Validate validity dates
              validityStart = updateData.validity_start !== undefined ? updateData.validity_start : coupon.validity_start;
              validityEnd = updateData.validity_end !== undefined ? updateData.validity_end : coupon.validity_end;
              if (!(validityStart && validityEnd && new Date(validityStart) >= new Date(validityEnd))) {
                _context3.n = 8;
                break;
              }
              throw new Error("Validity start date must be before end date");
            case 8:
              _context3.n = 9;
              return this.repository.updateById(couponId, updateData);
            case 9:
              updatedCoupon = _context3.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: couponId,
                eventId: coupon.event,
                description: "Updated coupon: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code,
                  changes: Object.keys(updateData)
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context3.a(2, updatedCoupon);
            case 10:
              _context3.p = 10;
              _t3 = _context3.v;
              throw new Error("Failed to update coupon: ".concat(_t3.message));
            case 11:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 10]]);
      }));
      function updateCoupon(_x3, _x4, _x5) {
        return _updateCoupon.apply(this, arguments);
      }
      return updateCoupon;
    }()
    /**
     * Delete a coupon (soft delete)
     * @param {string} couponId - Coupon ID
     * @param {string} adminId - Admin deleting the coupon
     * @returns {Promise<Object>} - Deleted coupon
     */
    )
  }, {
    key: "deleteCoupon",
    value: (function () {
      var _deleteCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(couponId, adminId) {
        var coupon, deletedCoupon, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context4.v;
              if (coupon) {
                _context4.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              _context4.n = 3;
              return this.repository["delete"]({
                _id: couponId
              });
            case 3:
              deletedCoupon = _context4.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.DELETE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: couponId,
                eventId: coupon.event,
                description: "Deleted coupon: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code,
                  discountType: coupon.discount_type,
                  discountValue: coupon.discount_value
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context4.a(2, deletedCoupon);
            case 4:
              _context4.p = 4;
              _t4 = _context4.v;
              throw new Error("Failed to delete coupon: ".concat(_t4.message));
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 4]]);
      }));
      function deleteCoupon(_x6, _x7) {
        return _deleteCoupon.apply(this, arguments);
      }
      return deleteCoupon;
    }()
    /**
     * Activate a coupon
     * @param {string} couponId - Coupon ID
     * @param {string} adminId - Admin activating the coupon
     * @returns {Promise<Object>} - Activated coupon
     */
    )
  }, {
    key: "activateCoupon",
    value: (function () {
      var _activateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(couponId, adminId) {
        var coupon, activatedCoupon, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context5.v;
              if (coupon) {
                _context5.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              if (!(coupon.status === _voteConstants.COUPON_STATUS.ACTIVE)) {
                _context5.n = 3;
                break;
              }
              throw new Error("Coupon is already active");
            case 3:
              _context5.n = 4;
              return this.repository.updateById(couponId, {
                status: _voteConstants.COUPON_STATUS.ACTIVE
              });
            case 4:
              activatedCoupon = _context5.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: couponId,
                eventId: coupon.event,
                description: "Activated coupon: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context5.a(2, activatedCoupon);
            case 5:
              _context5.p = 5;
              _t5 = _context5.v;
              throw new Error("Failed to activate coupon: ".concat(_t5.message));
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 5]]);
      }));
      function activateCoupon(_x8, _x9) {
        return _activateCoupon.apply(this, arguments);
      }
      return activateCoupon;
    }()
    /**
     * Deactivate a coupon
     * @param {string} couponId - Coupon ID
     * @param {string} adminId - Admin deactivating the coupon
     * @returns {Promise<Object>} - Deactivated coupon
     */
    )
  }, {
    key: "deactivateCoupon",
    value: (function () {
      var _deactivateCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(couponId, adminId) {
        var coupon, deactivatedCoupon, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context6.v;
              if (coupon) {
                _context6.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              if (!(coupon.status === _voteConstants.COUPON_STATUS.INACTIVE)) {
                _context6.n = 3;
                break;
              }
              throw new Error("Coupon is already inactive");
            case 3:
              _context6.n = 4;
              return this.repository.updateById(couponId, {
                status: _voteConstants.COUPON_STATUS.INACTIVE
              });
            case 4:
              deactivatedCoupon = _context6.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: couponId,
                eventId: coupon.event,
                description: "Deactivated coupon: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context6.a(2, deactivatedCoupon);
            case 5:
              _context6.p = 5;
              _t6 = _context6.v;
              throw new Error("Failed to deactivate coupon: ".concat(_t6.message));
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 5]]);
      }));
      function deactivateCoupon(_x0, _x1) {
        return _deactivateCoupon.apply(this, arguments);
      }
      return deactivateCoupon;
    }()
    /**
     * Validate coupon for a bundle
     * @param {string} code - Coupon code
     * @param {string} bundleId - Bundle ID
     * @param {string} userEmail - User email (for per-user limit check)
     * @returns {Promise<Object>} - Validation result
     */
    )
  }, {
    key: "validateCouponForBundle",
    value: (function () {
      var _validateCouponForBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(code, bundleId, userEmail) {
        var coupon, now, userRedemptions, isApplicable, bundle, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.repository.findByCode(code);
            case 1:
              coupon = _context7.v;
              if (coupon) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Invalid coupon code"
              });
            case 2:
              if (!(coupon.status !== _voteConstants.COUPON_STATUS.ACTIVE)) {
                _context7.n = 3;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Coupon is not active",
                coupon: coupon
              });
            case 3:
              // Check validity dates
              now = new Date();
              if (!(coupon.validity_start && new Date(coupon.validity_start) > now)) {
                _context7.n = 4;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Coupon will be valid from ".concat(coupon.validity_start),
                coupon: coupon
              });
            case 4:
              if (!(coupon.validity_end && new Date(coupon.validity_end) < now)) {
                _context7.n = 5;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Coupon has expired",
                coupon: coupon
              });
            case 5:
              if (!(coupon.max_total_uses && coupon.current_redemptions >= coupon.max_total_uses)) {
                _context7.n = 6;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Coupon usage limit reached",
                coupon: coupon
              });
            case 6:
              if (!userEmail) {
                _context7.n = 8;
                break;
              }
              _context7.n = 7;
              return this.repository.getUserRedemptionCount(coupon._id, userEmail);
            case 7:
              userRedemptions = _context7.v;
              if (!(userRedemptions >= coupon.max_uses_per_user)) {
                _context7.n = 8;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "You have reached the usage limit for this coupon",
                coupon: coupon
              });
            case 8:
              if (!(coupon.applicable_bundles && coupon.applicable_bundles.length > 0)) {
                _context7.n = 9;
                break;
              }
              isApplicable = coupon.applicable_bundles.some(function (bundle) {
                return bundle.toString() === bundleId;
              });
              if (isApplicable) {
                _context7.n = 9;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Coupon is not applicable to this bundle",
                coupon: coupon
              });
            case 9:
              if (!(coupon.min_purchase_amount > 0)) {
                _context7.n = 11;
                break;
              }
              _context7.n = 10;
              return this.bundleRepository.findById(bundleId);
            case 10:
              bundle = _context7.v;
              if (!(bundle && bundle.price < coupon.min_purchase_amount)) {
                _context7.n = 11;
                break;
              }
              return _context7.a(2, {
                isValid: false,
                reason: "Minimum purchase amount of ".concat(coupon.min_purchase_amount, " required"),
                coupon: coupon
              });
            case 11:
              return _context7.a(2, {
                isValid: true,
                coupon: coupon
              });
            case 12:
              _context7.p = 12;
              _t7 = _context7.v;
              throw new Error("Failed to validate coupon: ".concat(_t7.message));
            case 13:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 12]]);
      }));
      function validateCouponForBundle(_x10, _x11, _x12) {
        return _validateCouponForBundle.apply(this, arguments);
      }
      return validateCouponForBundle;
    }()
    /**
     * Redeem a coupon (increment redemption count)
     * @param {string} couponId - Coupon ID
     * @param {string} userEmail - User email
     * @returns {Promise<Object>} - Updated coupon
     */
    )
  }, {
    key: "redeemCoupon",
    value: (function () {
      var _redeemCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(couponId, userEmail) {
        var coupon, updatedCoupon, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context8.v;
              if (coupon) {
                _context8.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              _context8.n = 3;
              return this.repository.incrementRedemptions(couponId, userEmail);
            case 3:
              updatedCoupon = _context8.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: couponId,
                eventId: coupon.event,
                description: "Coupon redeemed: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code,
                  userEmail: userEmail,
                  totalRedemptions: updatedCoupon.current_redemptions
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context8.a(2, updatedCoupon);
            case 4:
              _context8.p = 4;
              _t8 = _context8.v;
              throw new Error("Failed to redeem coupon: ".concat(_t8.message));
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 4]]);
      }));
      function redeemCoupon(_x13, _x14) {
        return _redeemCoupon.apply(this, arguments);
      }
      return redeemCoupon;
    }()
    /**
     * Reverse coupon redemption (for payment refunds)
     * @param {string} couponId - Coupon ID
     * @param {string} userEmail - User email
     * @returns {Promise<Object>} - Updated coupon
     */
    )
  }, {
    key: "reverseCouponRedemption",
    value: (function () {
      var _reverseCouponRedemption = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(couponId, userEmail) {
        var coupon, updatedCoupon, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context9.v;
              if (coupon) {
                _context9.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              _context9.n = 3;
              return this.repository.decrementRedemptions(couponId, userEmail);
            case 3:
              updatedCoupon = _context9.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: couponId,
                eventId: coupon.event,
                description: "Coupon redemption reversed: ".concat(coupon.code),
                metadata: {
                  couponCode: coupon.code,
                  userEmail: userEmail,
                  totalRedemptions: updatedCoupon.current_redemptions
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context9.a(2, updatedCoupon);
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              throw new Error("Failed to reverse coupon redemption: ".concat(_t9.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 4]]);
      }));
      function reverseCouponRedemption(_x15, _x16) {
        return _reverseCouponRedemption.apply(this, arguments);
      }
      return reverseCouponRedemption;
    }()
    /**
     * Get coupon by ID
     * @param {string} couponId - Coupon ID
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Coupon
     */
    )
  }, {
    key: "getCouponById",
    value: (function () {
      var _getCouponById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(couponId) {
        var options,
          coupon,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              _context0.p = 1;
              _context0.n = 2;
              return this.repository.findById(couponId, options);
            case 2:
              coupon = _context0.v;
              if (coupon) {
                _context0.n = 3;
                break;
              }
              throw new Error("Coupon not found");
            case 3:
              return _context0.a(2, coupon);
            case 4:
              _context0.p = 4;
              _t0 = _context0.v;
              throw new Error("Failed to get coupon: ".concat(_t0.message));
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 4]]);
      }));
      function getCouponById(_x17) {
        return _getCouponById.apply(this, arguments);
      }
      return getCouponById;
    }()
    /**
     * Get coupon by code
     * @param {string} code - Coupon code
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Coupon
     */
    )
  }, {
    key: "getCouponByCode",
    value: (function () {
      var _getCouponByCode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(code) {
        var options,
          coupon,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.repository.findByCode(code, options);
            case 2:
              coupon = _context1.v;
              if (coupon) {
                _context1.n = 3;
                break;
              }
              throw new Error("Coupon not found");
            case 3:
              return _context1.a(2, coupon);
            case 4:
              _context1.p = 4;
              _t1 = _context1.v;
              throw new Error("Failed to get coupon: ".concat(_t1.message));
            case 5:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 4]]);
      }));
      function getCouponByCode(_x18) {
        return _getCouponByCode.apply(this, arguments);
      }
      return getCouponByCode;
    }()
    /**
     * Get all coupons for an event
     * @param {string} eventId - Event ID
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated coupons
     */
    )
  }, {
    key: "getCouponsByEvent",
    value: (function () {
      var _getCouponsByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(eventId) {
        var page,
          limit,
          options,
          coupons,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              page = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 1;
              limit = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 10;
              options = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.repository.findAll({
                event: eventId
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  created_at: -1
                }
              }));
            case 2:
              coupons = _context10.v;
              return _context10.a(2, coupons);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Failed to get coupons: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function getCouponsByEvent(_x19) {
        return _getCouponsByEvent.apply(this, arguments);
      }
      return getCouponsByEvent;
    }()
    /**
     * Get active coupons for an event
     * @param {string} eventId - Event ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Active coupons
     */
    )
  }, {
    key: "getActiveCoupons",
    value: (function () {
      var _getActiveCoupons = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(eventId) {
        var options,
          coupons,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findActiveByEvent(eventId, options);
            case 2:
              coupons = _context11.v;
              return _context11.a(2, coupons);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Failed to get active coupons: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function getActiveCoupons(_x20) {
        return _getActiveCoupons.apply(this, arguments);
      }
      return getActiveCoupons;
    }()
    /**
     * Get public coupons
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Public coupons
     */
    )
  }, {
    key: "getPublicCoupons",
    value: (function () {
      var _getPublicCoupons = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var eventId,
          options,
          coupons,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              eventId = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : null;
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.repository.findPublic(eventId, options);
            case 2:
              coupons = _context12.v;
              return _context12.a(2, coupons);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Failed to get public coupons: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function getPublicCoupons() {
        return _getPublicCoupons.apply(this, arguments);
      }
      return getPublicCoupons;
    }()
    /**
     * Get coupon statistics
     * @param {string} couponId - Coupon ID
     * @returns {Promise<Object>} - Coupon statistics
     */
    )
  }, {
    key: "getCouponStats",
    value: (function () {
      var _getCouponStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(couponId) {
        var coupon, stats, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.repository.findById(couponId);
            case 1:
              coupon = _context13.v;
              if (coupon) {
                _context13.n = 2;
                break;
              }
              throw new Error("Coupon not found");
            case 2:
              _context13.n = 3;
              return this.repository.getCouponStats(couponId);
            case 3:
              stats = _context13.v;
              return _context13.a(2, _objectSpread({
                couponId: coupon._id,
                couponCode: coupon.code,
                discountType: coupon.discount_type,
                discountValue: coupon.discount_value,
                currentRedemptions: coupon.current_redemptions,
                maxTotalUses: coupon.max_total_uses,
                maxUsesPerUser: coupon.max_uses_per_user,
                isActive: coupon.status === _voteConstants.COUPON_STATUS.ACTIVE,
                validityStart: coupon.validity_start,
                validityEnd: coupon.validity_end
              }, stats));
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw new Error("Failed to get coupon statistics: ".concat(_t13.message));
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 4]]);
      }));
      function getCouponStats(_x21) {
        return _getCouponStats.apply(this, arguments);
      }
      return getCouponStats;
    }()
    /**
     * Get user's redemption count for a coupon
     * @param {string} couponId - Coupon ID
     * @param {string} userEmail - User email
     * @returns {Promise<number>} - Redemption count
     */
    )
  }, {
    key: "getUserRedemptionCount",
    value: (function () {
      var _getUserRedemptionCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(couponId, userEmail) {
        var count, _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _context14.n = 1;
              return this.repository.getUserRedemptionCount(couponId, userEmail);
            case 1:
              count = _context14.v;
              return _context14.a(2, count);
            case 2:
              _context14.p = 2;
              _t14 = _context14.v;
              throw new Error("Failed to get user redemption count: ".concat(_t14.message));
            case 3:
              return _context14.a(2);
          }
        }, _callee14, this, [[0, 2]]);
      }));
      function getUserRedemptionCount(_x22, _x23) {
        return _getUserRedemptionCount.apply(this, arguments);
      }
      return getUserRedemptionCount;
    }()
    /**
     * Clone a coupon
     * @param {string} couponId - Coupon ID to clone
     * @param {Object} overrides - Override data
     * @param {string} adminId - Admin cloning the coupon
     * @returns {Promise<Object>} - Cloned coupon
     */
    )
  }, {
    key: "cloneCoupon",
    value: (function () {
      var _cloneCoupon = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(couponId) {
        var overrides,
          adminId,
          coupon,
          cloneData,
          clonedCoupon,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              overrides = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
              adminId = _args15.length > 2 ? _args15[2] : undefined;
              _context15.p = 1;
              _context15.n = 2;
              return this.repository.findById(couponId);
            case 2:
              coupon = _context15.v;
              if (coupon) {
                _context15.n = 3;
                break;
              }
              throw new Error("Coupon not found");
            case 3:
              // Create clone data
              cloneData = {
                description: coupon.description,
                event: overrides.event || coupon.event,
                applicable_bundles: overrides.applicable_bundles || coupon.applicable_bundles,
                discount_type: coupon.discount_type,
                discount_value: coupon.discount_value,
                max_discount_amount: coupon.max_discount_amount,
                min_purchase_amount: coupon.min_purchase_amount,
                status: overrides.status || _voteConstants.COUPON_STATUS.INACTIVE,
                // Clone as inactive by default
                max_total_uses: overrides.max_total_uses || coupon.max_total_uses,
                max_uses_per_user: coupon.max_uses_per_user,
                validity_start: overrides.validity_start || null,
                validity_end: overrides.validity_end || null,
                is_public: coupon.is_public,
                terms_and_conditions: coupon.terms_and_conditions
              };
              _context15.n = 4;
              return this.createCoupon(cloneData, adminId);
            case 4:
              clonedCoupon = _context15.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.COUPON,
                entityId: clonedCoupon._id,
                eventId: clonedCoupon.event,
                description: "Cloned coupon from: ".concat(coupon.code),
                metadata: {
                  originalCouponId: couponId,
                  originalCouponCode: coupon.code,
                  newCouponCode: clonedCoupon.code
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context15.a(2, clonedCoupon);
            case 5:
              _context15.p = 5;
              _t15 = _context15.v;
              throw new Error("Failed to clone coupon: ".concat(_t15.message));
            case 6:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 5]]);
      }));
      function cloneCoupon(_x24) {
        return _cloneCoupon.apply(this, arguments);
      }
      return cloneCoupon;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new CouponService();