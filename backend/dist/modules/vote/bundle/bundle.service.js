"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BundleService = void 0;
var _baseService = _interopRequireDefault(require("../../shared/base.service.js"));
var _bundleRepository = _interopRequireDefault(require("./bundle.repository.js"));
var _eventRepository = _interopRequireDefault(require("../../event/event.repository.js"));
var _categoryRepository = _interopRequireDefault(require("../../category/category.repository.js"));
var _paymentRepository = _interopRequireDefault(require("../../payment/payment.repository.js"));
var _activityService = _interopRequireDefault(require("../../activity/activity.service.js"));
var _bundleValidation = _interopRequireDefault(require("./bundle.validation.js"));
var _voteConstants = require("../../../utils/constants/vote.constants.js");
var _activityConstants = require("../../../utils/constants/activity.constants.js");
var _eventConstants = require("../../../utils/constants/event.constants.js");
var _stringHelper = require("../../../utils/helpers/string.helper.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
 * Bundle Service
 * Handles business logic for vote bundle management
 */
// Set validation schemas for BaseService.validate()
_baseService["default"].setValidation(_bundleValidation["default"]);
var BundleService = exports.BundleService = /*#__PURE__*/function (_BaseService) {
  function BundleService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BundleService);
    _this = _callSuper(this, BundleService);
    _this.repository = dependencies.repository || _bundleRepository["default"];
    _this.eventRepository = dependencies.eventRepository || _eventRepository["default"];
    _this.categoryRepository = dependencies.categoryRepository || _categoryRepository["default"];
    _this.paymentRepository = dependencies.paymentRepository || _paymentRepository["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    return _this;
  }

  /**
   * Create a new bundle
   * @param {Object} bundleData - Bundle data
   * @param {string} adminId - Admin creating the bundle
   * @returns {Promise<Object>} - Created bundle
   */
  _inherits(BundleService, _BaseService);
  return _createClass(BundleService, [{
    key: "createBundle",
    value: (function () {
      var _createBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(bundleData, adminId) {
        var validatedData, event, slug, counter, existingBundle, categories, pricePerVote, bundleToCreate, bundle, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(_objectSpread(_objectSpread({}, bundleData), {}, {
                created_by: adminId
              }), _bundleValidation["default"].createBundleSchema); // Validate event exists
              _context.n = 1;
              return this.eventRepository.findById(bundleData.event);
            case 1:
              event = _context.v;
              if (event) {
                _context.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              // Generate unique slug
              slug = (0, _stringHelper.slugify)(bundleData.name);
              counter = 1;
              _context.n = 3;
              return this.repository.findBySlug(slug);
            case 3:
              existingBundle = _context.v;
            case 4:
              if (!existingBundle) {
                _context.n = 6;
                break;
              }
              slug = "".concat((0, _stringHelper.slugify)(bundleData.name), "-").concat(counter);
              _context.n = 5;
              return this.repository.findBySlug(slug);
            case 5:
              existingBundle = _context.v;
              counter++;
              _context.n = 4;
              break;
            case 6:
              if (!(bundleData.categories && bundleData.categories.length > 0)) {
                _context.n = 8;
                break;
              }
              _context.n = 7;
              return this.categoryRepository.findAll({
                _id: {
                  $in: bundleData.categories
                },
                event: bundleData.event
              }, 1, bundleData.categories.length);
            case 7:
              categories = _context.v;
              if (!(categories.data.length !== bundleData.categories.length)) {
                _context.n = 8;
                break;
              }
              throw new Error("One or more categories not found or do not belong to this event");
            case 8:
              // Calculate price per vote for validation
              pricePerVote = bundleData.price / bundleData.vote_count;
              if (!(pricePerVote <= 0)) {
                _context.n = 9;
                break;
              }
              throw new Error("Price per vote must be greater than 0");
            case 9:
              // Set original price if discount is provided
              if (bundleData.discount_percentage && bundleData.discount_percentage > 0) {
                if (!bundleData.original_price) {
                  bundleData.original_price = bundleData.price / (1 - bundleData.discount_percentage / 100);
                }
              }

              // Validate validity dates
              if (!(bundleData.validity_start && bundleData.validity_end)) {
                _context.n = 10;
                break;
              }
              if (!(new Date(bundleData.validity_start) >= new Date(bundleData.validity_end))) {
                _context.n = 10;
                break;
              }
              throw new Error("Validity start date must be before end date");
            case 10:
              bundleToCreate = _objectSpread(_objectSpread({}, bundleData), {}, {
                slug: slug,
                status: bundleData.status || _voteConstants.BUNDLE_STATUS.ACTIVE
              });
              _context.n = 11;
              return this.repository.create(bundleToCreate);
            case 11:
              bundle = _context.v;
              // Log activity (fire-and-forget - don't block on non-critical operation)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundle._id,
                eventId: bundle.event,
                description: "Created bundle: ".concat(bundle.name),
                metadata: {
                  bundleName: bundle.name,
                  voteCount: bundle.vote_count,
                  price: bundle.price,
                  currency: bundle.currency
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context.a(2, bundle);
            case 12:
              _context.p = 12;
              _t = _context.v;
              throw new Error("Failed to create bundle: ".concat(_t.message));
            case 13:
              return _context.a(2);
          }
        }, _callee, this, [[0, 12]]);
      }));
      function createBundle(_x, _x2) {
        return _createBundle.apply(this, arguments);
      }
      return createBundle;
    }()
    /**
     * Update a bundle
     * @param {string} bundleId - Bundle ID
     * @param {Object} updateData - Update data
     * @param {string} adminId - Admin updating the bundle
     * @returns {Promise<Object>} - Updated bundle
     */
    )
  }, {
    key: "updateBundle",
    value: (function () {
      var _updateBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(bundleId, updateData, adminId) {
        var validatedData, bundle, categories, newPrice, newVoteCount, pricePerVote, validityStart, validityEnd, updatedBundle, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(_objectSpread(_objectSpread({}, updateData), {}, {
                updated_by: adminId
              }), _bundleValidation["default"].updateBundleSchema);
              _context2.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context2.v;
              if (bundle) {
                _context2.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              // Prevent updating slug directly
              if (updateData.slug) {
                delete updateData.slug;
              }

              // Prevent changing event
              if (!(updateData.event && updateData.event.toString() !== bundle.event.toString())) {
                _context2.n = 3;
                break;
              }
              throw new Error("Cannot change bundle event");
            case 3:
              if (!(updateData.categories && updateData.categories.length > 0)) {
                _context2.n = 5;
                break;
              }
              _context2.n = 4;
              return this.categoryRepository.findAll({
                _id: {
                  $in: updateData.categories
                },
                event: bundle.event
              }, 1, updateData.categories.length);
            case 4:
              categories = _context2.v;
              if (!(categories.data.length !== updateData.categories.length)) {
                _context2.n = 5;
                break;
              }
              throw new Error("One or more categories not found or do not belong to this event");
            case 5:
              // Validate price per vote if price or vote_count changed
              newPrice = updateData.price !== undefined ? updateData.price : bundle.price;
              newVoteCount = updateData.vote_count !== undefined ? updateData.vote_count : bundle.vote_count;
              pricePerVote = newPrice / newVoteCount;
              if (!(pricePerVote <= 0)) {
                _context2.n = 6;
                break;
              }
              throw new Error("Price per vote must be greater than 0");
            case 6:
              // Recalculate original price if discount changes
              if (updateData.discount_percentage !== undefined) {
                if (updateData.discount_percentage > 0 && !updateData.original_price) {
                  updateData.original_price = newPrice / (1 - updateData.discount_percentage / 100);
                }
              }

              // Validate validity dates
              validityStart = updateData.validity_start !== undefined ? updateData.validity_start : bundle.validity_start;
              validityEnd = updateData.validity_end !== undefined ? updateData.validity_end : bundle.validity_end;
              if (!(validityStart && validityEnd)) {
                _context2.n = 7;
                break;
              }
              if (!(new Date(validityStart) >= new Date(validityEnd))) {
                _context2.n = 7;
                break;
              }
              throw new Error("Validity start date must be before end date");
            case 7:
              _context2.n = 8;
              return this.repository.updateById(bundleId, updateData);
            case 8:
              updatedBundle = _context2.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundleId,
                eventId: bundle.event,
                description: "Updated bundle: ".concat(bundle.name),
                metadata: {
                  bundleName: bundle.name,
                  changes: Object.keys(updateData)
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context2.a(2, updatedBundle);
            case 9:
              _context2.p = 9;
              _t2 = _context2.v;
              throw new Error("Failed to update bundle: ".concat(_t2.message));
            case 10:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 9]]);
      }));
      function updateBundle(_x3, _x4, _x5) {
        return _updateBundle.apply(this, arguments);
      }
      return updateBundle;
    }()
    /**
     * Delete a bundle (soft delete)
     * @param {string} bundleId - Bundle ID
     * @param {string} adminId - Admin deleting the bundle
     * @returns {Promise<Object>} - Deleted bundle
     */
    )
  }, {
    key: "deleteBundle",
    value: (function () {
      var _deleteBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(bundleId, adminId) {
        var bundle, purchaseCount, deletedBundle, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context3.v;
              if (bundle) {
                _context3.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              _context3.n = 3;
              return this.paymentRepository.countByBundle(bundleId);
            case 3:
              purchaseCount = _context3.v;
              if (!(purchaseCount > 0)) {
                _context3.n = 4;
                break;
              }
              throw new Error("Cannot delete bundle with existing purchases. Deactivate it instead.");
            case 4:
              _context3.n = 5;
              return this.repository["delete"]({
                _id: bundleId
              });
            case 5:
              deletedBundle = _context3.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.DELETE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundleId,
                eventId: bundle.event,
                description: "Deleted bundle: ".concat(bundle.name),
                metadata: {
                  bundleName: bundle.name,
                  voteCount: bundle.vote_count,
                  price: bundle.price
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context3.a(2, deletedBundle);
            case 6:
              _context3.p = 6;
              _t3 = _context3.v;
              throw new Error("Failed to delete bundle: ".concat(_t3.message));
            case 7:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 6]]);
      }));
      function deleteBundle(_x6, _x7) {
        return _deleteBundle.apply(this, arguments);
      }
      return deleteBundle;
    }()
    /**
     * Activate a bundle
     * @param {string} bundleId - Bundle ID
     * @param {string} adminId - Admin activating the bundle
     * @returns {Promise<Object>} - Activated bundle
     */
    )
  }, {
    key: "activateBundle",
    value: (function () {
      var _activateBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(bundleId, adminId) {
        var bundle, event, activatedBundle, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context4.v;
              if (bundle) {
                _context4.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              if (!(bundle.status === _voteConstants.BUNDLE_STATUS.ACTIVE)) {
                _context4.n = 3;
                break;
              }
              throw new Error("Bundle is already active");
            case 3:
              _context4.n = 4;
              return this.eventRepository.findById(bundle.event);
            case 4:
              event = _context4.v;
              if (!(event.status === _eventConstants.STATUS.ARCHIVED)) {
                _context4.n = 5;
                break;
              }
              throw new Error("Cannot activate bundle for archived event");
            case 5:
              _context4.n = 6;
              return this.repository.updateById(bundleId, {
                status: _voteConstants.BUNDLE_STATUS.ACTIVE
              });
            case 6:
              activatedBundle = _context4.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundleId,
                eventId: bundle.event,
                description: "Activated bundle: ".concat(bundle.name),
                metadata: {
                  bundleName: bundle.name
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context4.a(2, activatedBundle);
            case 7:
              _context4.p = 7;
              _t4 = _context4.v;
              throw new Error("Failed to activate bundle: ".concat(_t4.message));
            case 8:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 7]]);
      }));
      function activateBundle(_x8, _x9) {
        return _activateBundle.apply(this, arguments);
      }
      return activateBundle;
    }()
    /**
     * Deactivate a bundle
     * @param {string} bundleId - Bundle ID
     * @param {string} adminId - Admin deactivating the bundle
     * @returns {Promise<Object>} - Deactivated bundle
     */
    )
  }, {
    key: "deactivateBundle",
    value: (function () {
      var _deactivateBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(bundleId, adminId) {
        var bundle, deactivatedBundle, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context5.v;
              if (bundle) {
                _context5.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              if (!(bundle.status === _voteConstants.BUNDLE_STATUS.INACTIVE)) {
                _context5.n = 3;
                break;
              }
              throw new Error("Bundle is already inactive");
            case 3:
              _context5.n = 4;
              return this.repository.updateById(bundleId, {
                status: _voteConstants.BUNDLE_STATUS.INACTIVE
              });
            case 4:
              deactivatedBundle = _context5.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundleId,
                eventId: bundle.event,
                description: "Deactivated bundle: ".concat(bundle.name),
                metadata: {
                  bundleName: bundle.name
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context5.a(2, deactivatedBundle);
            case 5:
              _context5.p = 5;
              _t5 = _context5.v;
              throw new Error("Failed to deactivate bundle: ".concat(_t5.message));
            case 6:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 5]]);
      }));
      function deactivateBundle(_x0, _x1) {
        return _deactivateBundle.apply(this, arguments);
      }
      return deactivateBundle;
    }()
    /**
     * Toggle featured status
     * @param {string} bundleId - Bundle ID
     * @param {string} adminId - Admin toggling featured status
     * @returns {Promise<Object>} - Updated bundle
     */
    )
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(bundleId, adminId) {
        var bundle, updatedBundle, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.p = 0;
              _context6.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context6.v;
              if (bundle) {
                _context6.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              _context6.n = 3;
              return this.repository.toggleFeatured(bundleId);
            case 3:
              updatedBundle = _context6.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundleId,
                eventId: bundle.event,
                description: "".concat(updatedBundle.is_featured ? "Featured" : "Unfeatured", " bundle: ").concat(bundle.name),
                metadata: {
                  bundleName: bundle.name,
                  isFeatured: updatedBundle.is_featured
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context6.a(2, updatedBundle);
            case 4:
              _context6.p = 4;
              _t6 = _context6.v;
              throw new Error("Failed to toggle featured status: ".concat(_t6.message));
            case 5:
              return _context6.a(2);
          }
        }, _callee6, this, [[0, 4]]);
      }));
      function toggleFeatured(_x10, _x11) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Toggle popular status
     * @param {string} bundleId - Bundle ID
     * @param {string} adminId - Admin toggling popular status
     * @returns {Promise<Object>} - Updated bundle
     */
    )
  }, {
    key: "togglePopular",
    value: (function () {
      var _togglePopular = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(bundleId, adminId) {
        var bundle, updatedBundle, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context7.v;
              if (bundle) {
                _context7.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              _context7.n = 3;
              return this.repository.togglePopular(bundleId);
            case 3:
              updatedBundle = _context7.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: bundleId,
                eventId: bundle.event,
                description: "".concat(updatedBundle.is_popular ? "Marked popular" : "Unmarked popular", " bundle: ").concat(bundle.name),
                metadata: {
                  bundleName: bundle.name,
                  isPopular: updatedBundle.is_popular
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context7.a(2, updatedBundle);
            case 4:
              _context7.p = 4;
              _t7 = _context7.v;
              throw new Error("Failed to toggle popular status: ".concat(_t7.message));
            case 5:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 4]]);
      }));
      function togglePopular(_x12, _x13) {
        return _togglePopular.apply(this, arguments);
      }
      return togglePopular;
    }()
    /**
     * Get bundle by ID
     * @param {string} bundleId - Bundle ID
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Bundle
     */
    )
  }, {
    key: "getBundleById",
    value: (function () {
      var _getBundleById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(bundleId) {
        var options,
          bundle,
          _args8 = arguments,
          _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              _context8.p = 1;
              _context8.n = 2;
              return this.repository.findById(bundleId, options);
            case 2:
              bundle = _context8.v;
              if (bundle) {
                _context8.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              return _context8.a(2, bundle);
            case 4:
              _context8.p = 4;
              _t8 = _context8.v;
              throw new Error("Failed to get bundle: ".concat(_t8.message));
            case 5:
              return _context8.a(2);
          }
        }, _callee8, this, [[1, 4]]);
      }));
      function getBundleById(_x14) {
        return _getBundleById.apply(this, arguments);
      }
      return getBundleById;
    }()
    /**
     * Get bundle by slug
     * @param {string} slug - Bundle slug
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Bundle
     */
    )
  }, {
    key: "getBundleBySlug",
    value: (function () {
      var _getBundleBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(slug) {
        var options,
          bundle,
          _args9 = arguments,
          _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
              _context9.p = 1;
              _context9.n = 2;
              return this.repository.findBySlug(slug, options);
            case 2:
              bundle = _context9.v;
              if (bundle) {
                _context9.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              return _context9.a(2, bundle);
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              throw new Error("Failed to get bundle: ".concat(_t9.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[1, 4]]);
      }));
      function getBundleBySlug(_x15) {
        return _getBundleBySlug.apply(this, arguments);
      }
      return getBundleBySlug;
    }()
    /**
     * Get all bundles for an event
     * @param {string} eventId - Event ID
     * @param {number} page - Page number
     * @param {number} limit - Items per page
     * @param {Object} options - Query options
     * @returns {Promise<Object>} - Paginated bundles
     */
    )
  }, {
    key: "getBundlesByEvent",
    value: (function () {
      var _getBundlesByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(eventId) {
        var page,
          limit,
          options,
          bundles,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              page = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : 1;
              limit = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : 10;
              options = _args0.length > 3 && _args0[3] !== undefined ? _args0[3] : {};
              _context0.p = 1;
              _context0.n = 2;
              return this.repository.findAll({
                event: eventId
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  display_order: 1,
                  price: 1
                }
              }));
            case 2:
              bundles = _context0.v;
              return _context0.a(2, bundles);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Failed to get bundles: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function getBundlesByEvent(_x16) {
        return _getBundlesByEvent.apply(this, arguments);
      }
      return getBundlesByEvent;
    }()
    /**
     * Get available bundles for an event (active and within validity)
     * @param {string} eventId - Event ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Available bundles
     */
    )
  }, {
    key: "getAvailableBundles",
    value: (function () {
      var _getAvailableBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(eventId) {
        var options,
          bundles,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.repository.findAvailableByEvent(eventId, options);
            case 2:
              bundles = _context1.v;
              return _context1.a(2, bundles);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Failed to get available bundles: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function getAvailableBundles(_x17) {
        return _getAvailableBundles.apply(this, arguments);
      }
      return getAvailableBundles;
    }()
    /**
     * Get featured bundles
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Featured bundles
     */
    )
  }, {
    key: "getFeaturedBundles",
    value: (function () {
      var _getFeaturedBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var eventId,
          options,
          bundles,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              eventId = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : null;
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.repository.findFeatured(eventId, options);
            case 2:
              bundles = _context10.v;
              return _context10.a(2, bundles);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Failed to get featured bundles: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function getFeaturedBundles() {
        return _getFeaturedBundles.apply(this, arguments);
      }
      return getFeaturedBundles;
    }()
    /**
     * Get popular bundles (most purchased)
     * @param {string} eventId - Optional event ID filter
     * @param {number} limit - Maximum number to return
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Popular bundles
     */
    )
  }, {
    key: "getPopularBundles",
    value: (function () {
      var _getPopularBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var eventId,
          limit,
          options,
          bundles,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              eventId = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : null;
              limit = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 5;
              options = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findPopular(eventId, limit, options);
            case 2:
              bundles = _context11.v;
              return _context11.a(2, bundles);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Failed to get popular bundles: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function getPopularBundles() {
        return _getPopularBundles.apply(this, arguments);
      }
      return getPopularBundles;
    }()
    /**
     * Get best value bundles (lowest price per vote)
     * @param {string} eventId - Event ID
     * @param {number} limit - Maximum number to return
     * @returns {Promise<Array>} - Best value bundles
     */
    )
  }, {
    key: "getBestValueBundles",
    value: (function () {
      var _getBestValueBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(eventId) {
        var limit,
          bundles,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              limit = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 5;
              _context12.p = 1;
              _context12.n = 2;
              return this.repository.findBestValue(eventId, limit);
            case 2:
              bundles = _context12.v;
              return _context12.a(2, bundles);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Failed to get best value bundles: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function getBestValueBundles(_x18) {
        return _getBestValueBundles.apply(this, arguments);
      }
      return getBestValueBundles;
    }()
    /**
     * Get bundles applicable to a category
     * @param {string} categoryId - Category ID
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Applicable bundles
     */
    )
  }, {
    key: "getBundlesByCategory",
    value: (function () {
      var _getBundlesByCategory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(categoryId) {
        var options,
          category,
          bundles,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              options = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
              _context13.p = 1;
              _context13.n = 2;
              return this.categoryRepository.findById(categoryId);
            case 2:
              category = _context13.v;
              if (category) {
                _context13.n = 3;
                break;
              }
              throw new Error("Category not found");
            case 3:
              _context13.n = 4;
              return this.repository.findByCategory(categoryId, options);
            case 4:
              bundles = _context13.v;
              return _context13.a(2, bundles);
            case 5:
              _context13.p = 5;
              _t13 = _context13.v;
              throw new Error("Failed to get bundles by category: ".concat(_t13.message));
            case 6:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 5]]);
      }));
      function getBundlesByCategory(_x19) {
        return _getBundlesByCategory.apply(this, arguments);
      }
      return getBundlesByCategory;
    }()
    /**
     * Get bundles by price range
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Bundles in price range
     */
    )
  }, {
    key: "getBundlesByPriceRange",
    value: (function () {
      var _getBundlesByPriceRange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(minPrice, maxPrice) {
        var eventId,
          options,
          bundles,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              eventId = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : null;
              options = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
              _context14.p = 1;
              if (!(minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)) {
                _context14.n = 2;
                break;
              }
              throw new Error("Invalid price range");
            case 2:
              _context14.n = 3;
              return this.repository.findByPriceRange(minPrice, maxPrice, eventId, options);
            case 3:
              bundles = _context14.v;
              return _context14.a(2, bundles);
            case 4:
              _context14.p = 4;
              _t14 = _context14.v;
              throw new Error("Failed to get bundles by price range: ".concat(_t14.message));
            case 5:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 4]]);
      }));
      function getBundlesByPriceRange(_x20, _x21) {
        return _getBundlesByPriceRange.apply(this, arguments);
      }
      return getBundlesByPriceRange;
    }()
    /**
     * Get bundles expiring soon
     * @param {number} days - Number of days threshold
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Bundles expiring soon
     */
    )
  }, {
    key: "getExpiringSoonBundles",
    value: (function () {
      var _getExpiringSoonBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
        var days,
          eventId,
          options,
          bundles,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              days = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : 7;
              eventId = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : null;
              options = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : {};
              _context15.p = 1;
              _context15.n = 2;
              return this.repository.findExpiringSoon(days, eventId, options);
            case 2:
              bundles = _context15.v;
              return _context15.a(2, bundles);
            case 3:
              _context15.p = 3;
              _t15 = _context15.v;
              throw new Error("Failed to get expiring bundles: ".concat(_t15.message));
            case 4:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 3]]);
      }));
      function getExpiringSoonBundles() {
        return _getExpiringSoonBundles.apply(this, arguments);
      }
      return getExpiringSoonBundles;
    }()
    /**
     * Get expired bundles
     * @param {string} eventId - Optional event ID filter
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - Expired bundles
     */
    )
  }, {
    key: "getExpiredBundles",
    value: (function () {
      var _getExpiredBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
        var eventId,
          options,
          bundles,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              eventId = _args16.length > 0 && _args16[0] !== undefined ? _args16[0] : null;
              options = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : {};
              _context16.p = 1;
              _context16.n = 2;
              return this.repository.findExpired(eventId, options);
            case 2:
              bundles = _context16.v;
              return _context16.a(2, bundles);
            case 3:
              _context16.p = 3;
              _t16 = _context16.v;
              throw new Error("Failed to get expired bundles: ".concat(_t16.message));
            case 4:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 3]]);
      }));
      function getExpiredBundles() {
        return _getExpiredBundles.apply(this, arguments);
      }
      return getExpiredBundles;
    }()
    /**
     * Validate bundle availability for purchase
     * @param {string} bundleId - Bundle ID
     * @returns {Promise<Object>} - Validation result with bundle
     */
    )
  }, {
    key: "validateBundleAvailability",
    value: (function () {
      var _validateBundleAvailability = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(bundleId) {
        var bundle, now, event, _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              _context17.p = 0;
              _context17.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context17.v;
              if (bundle) {
                _context17.n = 2;
                break;
              }
              return _context17.a(2, {
                isAvailable: false,
                reason: "Bundle not found"
              });
            case 2:
              if (!(bundle.status !== _voteConstants.BUNDLE_STATUS.ACTIVE)) {
                _context17.n = 3;
                break;
              }
              return _context17.a(2, {
                isAvailable: false,
                reason: "Bundle is not active",
                bundle: bundle
              });
            case 3:
              // Check validity dates
              now = new Date();
              if (!(bundle.validity_start && new Date(bundle.validity_start) > now)) {
                _context17.n = 4;
                break;
              }
              return _context17.a(2, {
                isAvailable: false,
                reason: "Bundle will be available from ".concat(bundle.validity_start),
                bundle: bundle
              });
            case 4:
              if (!(bundle.validity_end && new Date(bundle.validity_end) < now)) {
                _context17.n = 5;
                break;
              }
              return _context17.a(2, {
                isAvailable: false,
                reason: "Bundle has expired",
                bundle: bundle
              });
            case 5:
              _context17.n = 6;
              return this.eventRepository.findById(bundle.event);
            case 6:
              event = _context17.v;
              if (!(!event || event.status === _eventConstants.STATUS.ARCHIVED)) {
                _context17.n = 7;
                break;
              }
              return _context17.a(2, {
                isAvailable: false,
                reason: "Event is not available",
                bundle: bundle
              });
            case 7:
              return _context17.a(2, {
                isAvailable: true,
                bundle: bundle
              });
            case 8:
              _context17.p = 8;
              _t17 = _context17.v;
              throw new Error("Failed to validate bundle availability: ".concat(_t17.message));
            case 9:
              return _context17.a(2);
          }
        }, _callee17, this, [[0, 8]]);
      }));
      function validateBundleAvailability(_x22) {
        return _validateBundleAvailability.apply(this, arguments);
      }
      return validateBundleAvailability;
    }()
    /**
     * Calculate final price with discount
     * @param {string} bundleId - Bundle ID
     * @param {Object} coupon - Optional coupon data
     * @returns {Promise<Object>} - Price breakdown
     */
    )
  }, {
    key: "calculatePrice",
    value: (function () {
      var _calculatePrice = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(bundleId) {
        var coupon,
          bundle,
          basePrice,
          discount,
          bonusVotes,
          finalPrice,
          breakdown,
          couponDiscount,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              coupon = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : null;
              _context18.p = 1;
              _context18.n = 2;
              return this.repository.findById(bundleId);
            case 2:
              bundle = _context18.v;
              if (bundle) {
                _context18.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              basePrice = bundle.price;
              discount = 0;
              bonusVotes = 0;
              finalPrice = basePrice;
              breakdown = {
                basePrice: basePrice,
                bundleDiscount: bundle.discount_percentage,
                originalPrice: bundle.original_price || basePrice
              }; // Apply bundle discount if exists
              if (bundle.discount_percentage > 0) {
                discount = basePrice * (bundle.discount_percentage / 100);
              }

              // Apply coupon if provided
              if (coupon) {
                breakdown.couponCode = coupon.code;
                if (coupon.discount_type === "PERCENTAGE") {
                  couponDiscount = basePrice * (coupon.discount_value / 100);
                  discount += couponDiscount;
                  breakdown.couponDiscount = couponDiscount;
                  breakdown.couponType = "percentage";
                  breakdown.couponValue = coupon.discount_value;
                } else if (coupon.discount_type === "FIXED") {
                  discount += coupon.discount_value;
                  breakdown.couponDiscount = coupon.discount_value;
                  breakdown.couponType = "fixed";
                  breakdown.couponValue = coupon.discount_value;
                } else if (coupon.discount_type === "BONUS_VOTES") {
                  bonusVotes = coupon.discount_value;
                  breakdown.bonusVotes = bonusVotes;
                  breakdown.couponType = "bonus_votes";
                }
              }
              finalPrice = Math.max(basePrice - discount, 0);
              return _context18.a(2, _objectSpread(_objectSpread({}, breakdown), {}, {
                totalDiscount: discount,
                finalPrice: finalPrice,
                totalVotes: bundle.vote_count + bonusVotes,
                currency: bundle.currency,
                pricePerVote: finalPrice / (bundle.vote_count + bonusVotes)
              }));
            case 4:
              _context18.p = 4;
              _t18 = _context18.v;
              throw new Error("Failed to calculate price: ".concat(_t18.message));
            case 5:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 4]]);
      }));
      function calculatePrice(_x23) {
        return _calculatePrice.apply(this, arguments);
      }
      return calculatePrice;
    }()
    /**
     * Record a purchase for a bundle
     * @param {string} bundleId - Bundle ID
     * @param {number} amount - Amount paid
     * @returns {Promise<Object>} - Updated bundle
     */
    )
  }, {
    key: "recordPurchase",
    value: (function () {
      var _recordPurchase = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(bundleId, amount) {
        var bundle, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.repository.recordPurchase(bundleId, amount);
            case 1:
              bundle = _context19.v;
              return _context19.a(2, bundle);
            case 2:
              _context19.p = 2;
              _t19 = _context19.v;
              throw new Error("Failed to record purchase: ".concat(_t19.message));
            case 3:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 2]]);
      }));
      function recordPurchase(_x24, _x25) {
        return _recordPurchase.apply(this, arguments);
      }
      return recordPurchase;
    }()
    /**
     * Reorder bundles for an event
     * @param {string} eventId - Event ID
     * @param {Array<{bundleId: string, displayOrder: number}>} orderData - New order
     * @param {string} adminId - Admin reordering bundles
     * @returns {Promise<Array>} - Updated bundles
     */
    )
  }, {
    key: "reorderBundles",
    value: (function () {
      var _reorderBundles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(eventId, orderData, adminId) {
        var _this2 = this;
        var event, bundleIds, bundles, updatePromises, updatedBundles, _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _context20.n = 1;
              return this.eventRepository.findById(eventId);
            case 1:
              event = _context20.v;
              if (event) {
                _context20.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              // Validate all bundles belong to the event
              bundleIds = orderData.map(function (item) {
                return item.bundleId;
              });
              _context20.n = 3;
              return this.repository.findAll({
                _id: {
                  $in: bundleIds
                },
                event: eventId
              }, 1, bundleIds.length);
            case 3:
              bundles = _context20.v;
              if (!(bundles.data.length !== bundleIds.length)) {
                _context20.n = 4;
                break;
              }
              throw new Error("One or more bundles not found or do not belong to this event");
            case 4:
              // Update display orders
              updatePromises = orderData.map(function (item) {
                return _this2.repository.updateById(item.bundleId, {
                  display_order: item.displayOrder
                });
              });
              _context20.n = 5;
              return Promise.all(updatePromises);
            case 5:
              updatedBundles = _context20.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.UPDATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                eventId: eventId,
                description: "Reordered ".concat(bundleIds.length, " bundles"),
                metadata: {
                  bundleCount: bundleIds.length,
                  bundleIds: bundleIds
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context20.a(2, updatedBundles);
            case 6:
              _context20.p = 6;
              _t20 = _context20.v;
              throw new Error("Failed to reorder bundles: ".concat(_t20.message));
            case 7:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 6]]);
      }));
      function reorderBundles(_x26, _x27, _x28) {
        return _reorderBundles.apply(this, arguments);
      }
      return reorderBundles;
    }()
    /**
     * Clone a bundle
     * @param {string} bundleId - Bundle ID to clone
     * @param {Object} overrides - Override data
     * @param {string} adminId - Admin cloning the bundle
     * @returns {Promise<Object>} - Cloned bundle
     */
    )
  }, {
    key: "cloneBundle",
    value: (function () {
      var _cloneBundle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(bundleId) {
        var overrides,
          adminId,
          bundle,
          cloneData,
          clonedBundle,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              overrides = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : {};
              adminId = _args21.length > 2 ? _args21[2] : undefined;
              _context21.p = 1;
              _context21.n = 2;
              return this.repository.findById(bundleId);
            case 2:
              bundle = _context21.v;
              if (bundle) {
                _context21.n = 3;
                break;
              }
              throw new Error("Bundle not found");
            case 3:
              // Create clone data
              cloneData = {
                name: overrides.name || "".concat(bundle.name, " (Copy)"),
                description: bundle.description,
                event: overrides.event || bundle.event,
                categories: overrides.categories || bundle.categories,
                vote_count: overrides.vote_count || bundle.vote_count,
                price: overrides.price || bundle.price,
                currency: bundle.currency,
                discount_percentage: bundle.discount_percentage,
                original_price: bundle.original_price,
                is_featured: false,
                is_popular: false,
                status: overrides.status || _voteConstants.BUNDLE_STATUS.INACTIVE,
                // Clone as inactive by default
                validity_start: overrides.validity_start || null,
                validity_end: overrides.validity_end || null
              };
              _context21.n = 4;
              return this.createBundle(cloneData, adminId);
            case 4:
              clonedBundle = _context21.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.CREATE,
                entityType: _activityConstants.ENTITY_TYPE.BUNDLE,
                entityId: clonedBundle._id,
                eventId: clonedBundle.event,
                description: "Cloned bundle from: ".concat(bundle.name),
                metadata: {
                  originalBundleId: bundleId,
                  originalBundleName: bundle.name,
                  newBundleName: clonedBundle.name
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context21.a(2, clonedBundle);
            case 5:
              _context21.p = 5;
              _t21 = _context21.v;
              throw new Error("Failed to clone bundle: ".concat(_t21.message));
            case 6:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 5]]);
      }));
      function cloneBundle(_x29) {
        return _cloneBundle.apply(this, arguments);
      }
      return cloneBundle;
    }()
    /**
     * Get bundle statistics
     * @param {string} bundleId - Bundle ID
     * @returns {Promise<Object>} - Bundle statistics
     */
    )
  }, {
    key: "getBundleStats",
    value: (function () {
      var _getBundleStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(bundleId) {
        var bundle, purchaseStats, pricePerVote, totalRevenue, totalPurchases, totalVotesSold, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _context22.n = 1;
              return this.repository.findById(bundleId);
            case 1:
              bundle = _context22.v;
              if (bundle) {
                _context22.n = 2;
                break;
              }
              throw new Error("Bundle not found");
            case 2:
              _context22.n = 3;
              return this.paymentRepository.getStatsByBundle(bundleId);
            case 3:
              purchaseStats = _context22.v;
              // Calculate metrics
              pricePerVote = bundle.price / bundle.vote_count;
              totalRevenue = purchaseStats.totalRevenue || 0;
              totalPurchases = bundle.total_purchases || 0;
              totalVotesSold = totalPurchases * bundle.vote_count;
              return _context22.a(2, {
                bundleId: bundle._id,
                bundleName: bundle.name,
                voteCount: bundle.vote_count,
                price: bundle.price,
                currency: bundle.currency,
                pricePerVote: pricePerVote,
                totalPurchases: totalPurchases,
                totalRevenue: totalRevenue,
                totalVotesSold: totalVotesSold,
                discountPercentage: bundle.discount_percentage,
                isFeatured: bundle.is_featured,
                isPopular: bundle.is_popular,
                status: bundle.status,
                validityStart: bundle.validity_start,
                validityEnd: bundle.validity_end,
                createdAt: bundle.created_at
              });
            case 4:
              _context22.p = 4;
              _t22 = _context22.v;
              throw new Error("Failed to get bundle statistics: ".concat(_t22.message));
            case 5:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 4]]);
      }));
      function getBundleStats(_x30) {
        return _getBundleStats.apply(this, arguments);
      }
      return getBundleStats;
    }()
    /**
     * Get bundle performance comparison for an event
     * @param {string} eventId - Event ID
     * @returns {Promise<Array>} - Bundle performance data
     */
    )
  }, {
    key: "getBundlePerformance",
    value: (function () {
      var _getBundlePerformance = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(eventId) {
        var _this3 = this;
        var bundles, performanceData, _t23;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.repository.findByEvent(eventId, {
                lean: true
              });
            case 1:
              bundles = _context24.v;
              _context24.n = 2;
              return Promise.all(bundles.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(bundle) {
                  var purchaseStats;
                  return _regenerator().w(function (_context23) {
                    while (1) switch (_context23.n) {
                      case 0:
                        _context23.n = 1;
                        return _this3.paymentRepository.getStatsByBundle(bundle._id);
                      case 1:
                        purchaseStats = _context23.v;
                        return _context23.a(2, {
                          bundleId: bundle._id,
                          bundleName: bundle.name,
                          voteCount: bundle.vote_count,
                          price: bundle.price,
                          pricePerVote: bundle.price / bundle.vote_count,
                          totalPurchases: bundle.total_purchases,
                          totalRevenue: purchaseStats.totalRevenue || 0,
                          totalVotesSold: bundle.total_purchases * bundle.vote_count,
                          conversionRate: 0,
                          // Would need view tracking
                          isFeatured: bundle.is_featured,
                          isPopular: bundle.is_popular
                        });
                    }
                  }, _callee23);
                }));
                return function (_x32) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 2:
              performanceData = _context24.v;
              // Sort by revenue
              performanceData.sort(function (a, b) {
                return b.totalRevenue - a.totalRevenue;
              });
              return _context24.a(2, performanceData);
            case 3:
              _context24.p = 3;
              _t23 = _context24.v;
              throw new Error("Failed to get bundle performance: ".concat(_t23.message));
            case 4:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 3]]);
      }));
      function getBundlePerformance(_x31) {
        return _getBundlePerformance.apply(this, arguments);
      }
      return getBundlePerformance;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new BundleService();