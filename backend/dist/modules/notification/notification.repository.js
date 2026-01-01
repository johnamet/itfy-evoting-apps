"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _baseRepository = require("../shared/base.repository.js");
var _notificationModel = _interopRequireDefault(require("./notification.model.js"));
var _notificationConstants = require("../../utils/constants/notification.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * Notification Repository
 * This file defines the NotificationRepository class which extends the BaseRepository
 * It contains notification-specific data access methods
 */
var NotificationRepository = /*#__PURE__*/function (_BaseRepository) {
  function NotificationRepository() {
    _classCallCheck(this, NotificationRepository);
    return _callSuper(this, NotificationRepository, [_notificationModel["default"]]);
  }

  /**
   * Create a new notification
   * @param {Object} notificationData - Notification data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created notification
   */
  _inherits(NotificationRepository, _BaseRepository);
  return _createClass(NotificationRepository, [{
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(notificationData) {
        var options,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.p = 1;
              if (notificationData.user) {
                _context.n = 2;
                break;
              }
              throw new Error("User is required");
            case 2:
              if (notificationData.type) {
                _context.n = 3;
                break;
              }
              throw new Error("Notification type is required");
            case 3:
              if (notificationData.title) {
                _context.n = 4;
                break;
              }
              throw new Error("Notification title is required");
            case 4:
              if (notificationData.message) {
                _context.n = 5;
                break;
              }
              throw new Error("Notification message is required");
            case 5:
              _context.n = 6;
              return _superPropGet(NotificationRepository, "create", this, 3)([notificationData, options]);
            case 6:
              return _context.a(2, _context.v);
            case 7:
              _context.p = 7;
              _t = _context.v;
              throw new Error("Create notification failed: ".concat(_t.message));
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[1, 7]]);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Update a notification
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @param {Object} updates - Update data
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(notificationId, updates) {
        var options,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              _context2.p = 1;
              _context2.n = 2;
              return this.updateById(notificationId, updates, options);
            case 2:
              return _context2.a(2, _context2.v);
            case 3:
              _context2.p = 3;
              _t2 = _context2.v;
              throw new Error("Update notification failed: ".concat(_t2.message));
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 3]]);
      }));
      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Soft delete a notification
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Deleted notification
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(notificationId) {
        var options,
          _args3 = arguments,
          _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              _context3.p = 1;
              _context3.n = 2;
              return _superPropGet(NotificationRepository, "delete", this, 3)([{
                _id: notificationId
              }, options]);
            case 2:
              return _context3.a(2, _context3.v);
            case 3:
              _context3.p = 3;
              _t3 = _context3.v;
              throw new Error("Delete notification failed: ".concat(_t3.message));
            case 4:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function _delete(_x4) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * Restore a soft-deleted notification
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Restored notification
     */
    )
  }, {
    key: "restore",
    value: (function () {
      var _restore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(notificationId) {
        var options,
          _args4 = arguments,
          _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              _context4.p = 1;
              _context4.n = 2;
              return _superPropGet(NotificationRepository, "restore", this, 3)([{
                _id: notificationId
              }, options]);
            case 2:
              return _context4.a(2, _context4.v);
            case 3:
              _context4.p = 3;
              _t4 = _context4.v;
              throw new Error("Restore notification failed: ".concat(_t4.message));
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 3]]);
      }));
      function restore(_x5) {
        return _restore.apply(this, arguments);
      }
      return restore;
    }()
    /**
     * Permanently delete a notification
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Force deleted notification
     */
    )
  }, {
    key: "forceDelete",
    value: (function () {
      var _forceDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(notificationId) {
        var options,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              _context5.p = 1;
              _context5.n = 2;
              return _superPropGet(NotificationRepository, "forceDelete", this, 3)([{
                _id: notificationId
              }, options]);
            case 2:
              return _context5.a(2, _context5.v);
            case 3:
              _context5.p = 3;
              _t5 = _context5.v;
              throw new Error("Force delete notification failed: ".concat(_t5.message));
            case 4:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 3]]);
      }));
      function forceDelete(_x6) {
        return _forceDelete.apply(this, arguments);
      }
      return forceDelete;
    }()
    /**
     * Find notifications for a user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {number} [page=1] - Page number
     * @param {number} [limit=20] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated notifications
     */
    )
  }, {
    key: "findByUser",
    value: (function () {
      var _findByUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(userId) {
        var page,
          limit,
          options,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              page = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 1;
              limit = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : 20;
              options = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : {};
              _context6.p = 1;
              _context6.n = 2;
              return this.findAll({
                user: userId
              }, page, limit, _objectSpread(_objectSpread({}, options), {}, {
                sort: {
                  created_at: -1
                }
              }));
            case 2:
              return _context6.a(2, _context6.v);
            case 3:
              _context6.p = 3;
              _t6 = _context6.v;
              throw new Error("Find notifications by user failed: ".concat(_t6.message));
            case 4:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 3]]);
      }));
      function findByUser(_x7) {
        return _findByUser.apply(this, arguments);
      }
      return findByUser;
    }()
    /**
     * Find unread notifications for a user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {number} [limit=20] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Unread notifications
     */
    )
  }, {
    key: "findUnread",
    value: (function () {
      var _findUnread = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userId) {
        var limit,
          options,
          query,
          _args7 = arguments,
          _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              limit = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 20;
              options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
              _context7.p = 1;
              query = this.model.find({
                user: userId,
                read_at: null,
                deleted_at: null
              }).sort({
                created_at: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context7.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context7.a(2, _context7.v);
            case 3:
              _context7.p = 3;
              _t7 = _context7.v;
              throw new Error("Find unread notifications failed: ".concat(_t7.message));
            case 4:
              return _context7.a(2);
          }
        }, _callee7, this, [[1, 3]]);
      }));
      function findUnread(_x8) {
        return _findUnread.apply(this, arguments);
      }
      return findUnread;
    }()
    /**
     * Get unread count for a user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @returns {Promise<number>} - Unread count
     */
    )
  }, {
    key: "getUnreadCount",
    value: (function () {
      var _getUnreadCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(userId) {
        var _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.model.countDocuments({
                user: userId,
                read_at: null,
                deleted_at: null
              });
            case 1:
              return _context8.a(2, _context8.v);
            case 2:
              _context8.p = 2;
              _t8 = _context8.v;
              throw new Error("Get unread count failed: ".concat(_t8.message));
            case 3:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 2]]);
      }));
      function getUnreadCount(_x9) {
        return _getUnreadCount.apply(this, arguments);
      }
      return getUnreadCount;
    }()
    /**
     * Mark notification as read
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "markAsRead",
    value: (function () {
      var _markAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(notificationId) {
        var notification, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.model.findById(notificationId);
            case 1:
              notification = _context9.v;
              if (notification) {
                _context9.n = 2;
                break;
              }
              throw new Error("Notification not found");
            case 2:
              _context9.n = 3;
              return notification.markAsRead();
            case 3:
              return _context9.a(2, _context9.v);
            case 4:
              _context9.p = 4;
              _t9 = _context9.v;
              throw new Error("Mark notification as read failed: ".concat(_t9.message));
            case 5:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 4]]);
      }));
      function markAsRead(_x0) {
        return _markAsRead.apply(this, arguments);
      }
      return markAsRead;
    }()
    /**
     * Mark notification as clicked
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "markAsClicked",
    value: (function () {
      var _markAsClicked = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(notificationId) {
        var notification, _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              _context0.p = 0;
              _context0.n = 1;
              return this.model.findById(notificationId);
            case 1:
              notification = _context0.v;
              if (notification) {
                _context0.n = 2;
                break;
              }
              throw new Error("Notification not found");
            case 2:
              _context0.n = 3;
              return notification.markAsClicked();
            case 3:
              return _context0.a(2, _context0.v);
            case 4:
              _context0.p = 4;
              _t0 = _context0.v;
              throw new Error("Mark notification as clicked failed: ".concat(_t0.message));
            case 5:
              return _context0.a(2);
          }
        }, _callee0, this, [[0, 4]]);
      }));
      function markAsClicked(_x1) {
        return _markAsClicked.apply(this, arguments);
      }
      return markAsClicked;
    }()
    /**
     * Mark all notifications as read for a user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @returns {Promise<Object>} - Update result
     */
    )
  }, {
    key: "markAllAsRead",
    value: (function () {
      var _markAllAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(userId) {
        var now, result, _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              _context1.p = 0;
              now = new Date();
              _context1.n = 1;
              return this.model.updateMany({
                user: userId,
                read_at: null,
                deleted_at: null
              }, {
                $set: {
                  read_at: now,
                  status: _notificationConstants.NOTIFICATION_STATUS.READ
                }
              });
            case 1:
              result = _context1.v;
              return _context1.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context1.p = 2;
              _t1 = _context1.v;
              throw new Error("Mark all as read failed: ".concat(_t1.message));
            case 3:
              return _context1.a(2);
          }
        }, _callee1, this, [[0, 2]]);
      }));
      function markAllAsRead(_x10) {
        return _markAllAsRead.apply(this, arguments);
      }
      return markAllAsRead;
    }()
    /**
     * Mark notification as sent
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @param {string} [providerId] - Provider ID
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "markAsSent",
    value: (function () {
      var _markAsSent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(notificationId) {
        var providerId,
          notification,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              providerId = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : null;
              _context10.p = 1;
              _context10.n = 2;
              return this.model.findById(notificationId);
            case 2:
              notification = _context10.v;
              if (notification) {
                _context10.n = 3;
                break;
              }
              throw new Error("Notification not found");
            case 3:
              _context10.n = 4;
              return notification.markAsSent(providerId);
            case 4:
              return _context10.a(2, _context10.v);
            case 5:
              _context10.p = 5;
              _t10 = _context10.v;
              throw new Error("Mark notification as sent failed: ".concat(_t10.message));
            case 6:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 5]]);
      }));
      function markAsSent(_x11) {
        return _markAsSent.apply(this, arguments);
      }
      return markAsSent;
    }()
    /**
     * Mark notification as delivered
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "markAsDelivered",
    value: (function () {
      var _markAsDelivered = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(notificationId) {
        var notification, _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              _context11.p = 0;
              _context11.n = 1;
              return this.model.findById(notificationId);
            case 1:
              notification = _context11.v;
              if (notification) {
                _context11.n = 2;
                break;
              }
              throw new Error("Notification not found");
            case 2:
              _context11.n = 3;
              return notification.markAsDelivered();
            case 3:
              return _context11.a(2, _context11.v);
            case 4:
              _context11.p = 4;
              _t11 = _context11.v;
              throw new Error("Mark notification as delivered failed: ".concat(_t11.message));
            case 5:
              return _context11.a(2);
          }
        }, _callee11, this, [[0, 4]]);
      }));
      function markAsDelivered(_x12) {
        return _markAsDelivered.apply(this, arguments);
      }
      return markAsDelivered;
    }()
    /**
     * Mark notification as failed
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @param {string} errorMessage - Error message
     * @param {boolean} [shouldRetry=true] - Whether to schedule retry
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "markAsFailed",
    value: (function () {
      var _markAsFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(notificationId, errorMessage) {
        var shouldRetry,
          notification,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              shouldRetry = _args12.length > 2 && _args12[2] !== undefined ? _args12[2] : true;
              _context12.p = 1;
              _context12.n = 2;
              return this.model.findById(notificationId);
            case 2:
              notification = _context12.v;
              if (notification) {
                _context12.n = 3;
                break;
              }
              throw new Error("Notification not found");
            case 3:
              _context12.n = 4;
              return notification.markAsFailed(errorMessage, shouldRetry);
            case 4:
              return _context12.a(2, _context12.v);
            case 5:
              _context12.p = 5;
              _t12 = _context12.v;
              throw new Error("Mark notification as failed failed: ".concat(_t12.message));
            case 6:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 5]]);
      }));
      function markAsFailed(_x13, _x14) {
        return _markAsFailed.apply(this, arguments);
      }
      return markAsFailed;
    }()
    /**
     * Queue notification for delivery
     * @param {string|mongoose.Types.ObjectId} notificationId - Notification ID
     * @returns {Promise<Object>} - Updated notification
     */
    )
  }, {
    key: "queue",
    value: (function () {
      var _queue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(notificationId) {
        var notification, _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              _context13.p = 0;
              _context13.n = 1;
              return this.model.findById(notificationId);
            case 1:
              notification = _context13.v;
              if (notification) {
                _context13.n = 2;
                break;
              }
              throw new Error("Notification not found");
            case 2:
              _context13.n = 3;
              return notification.queue();
            case 3:
              return _context13.a(2, _context13.v);
            case 4:
              _context13.p = 4;
              _t13 = _context13.v;
              throw new Error("Queue notification failed: ".concat(_t13.message));
            case 5:
              return _context13.a(2);
          }
        }, _callee13, this, [[0, 4]]);
      }));
      function queue(_x15) {
        return _queue.apply(this, arguments);
      }
      return queue;
    }()
    /**
     * Find notifications by type for a user
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {string} type - Notification type
     * @param {number} [limit=20] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Notifications
     */
    )
  }, {
    key: "findByType",
    value: (function () {
      var _findByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(userId, type) {
        var limit,
          options,
          query,
          _args14 = arguments,
          _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              limit = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 20;
              options = _args14.length > 3 && _args14[3] !== undefined ? _args14[3] : {};
              _context14.p = 1;
              if (Object.values(_notificationConstants.NOTIFICATION_TYPE).includes(type)) {
                _context14.n = 2;
                break;
              }
              throw new Error("Invalid notification type: ".concat(type));
            case 2:
              query = this.model.find({
                user: userId,
                type: type,
                deleted_at: null
              }).sort({
                created_at: -1
              }).limit(limit);
              this._applyOptions(query, options);
              _context14.n = 3;
              return query.lean(options.lean).exec();
            case 3:
              return _context14.a(2, _context14.v);
            case 4:
              _context14.p = 4;
              _t14 = _context14.v;
              throw new Error("Find notifications by type failed: ".concat(_t14.message));
            case 5:
              return _context14.a(2);
          }
        }, _callee14, this, [[1, 4]]);
      }));
      function findByType(_x16, _x17) {
        return _findByType.apply(this, arguments);
      }
      return findByType;
    }()
    /**
     * Find notifications by channel
     * @param {string} channel - Channel
     * @param {string} [status] - Optional status filter
     * @param {number} [limit=100] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Notifications
     */
    )
  }, {
    key: "findByChannel",
    value: (function () {
      var _findByChannel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(channel) {
        var status,
          limit,
          options,
          query,
          queryBuilder,
          _args15 = arguments,
          _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              status = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : null;
              limit = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : 100;
              options = _args15.length > 3 && _args15[3] !== undefined ? _args15[3] : {};
              _context15.p = 1;
              if (Object.values(_notificationConstants.NOTIFICATION_CHANNEL).includes(channel)) {
                _context15.n = 2;
                break;
              }
              throw new Error("Invalid channel: ".concat(channel));
            case 2:
              query = {
                channel: channel,
                deleted_at: null
              };
              if (!status) {
                _context15.n = 4;
                break;
              }
              if (Object.values(_notificationConstants.NOTIFICATION_STATUS).includes(status)) {
                _context15.n = 3;
                break;
              }
              throw new Error("Invalid status: ".concat(status));
            case 3:
              query.status = status;
            case 4:
              queryBuilder = this.model.find(query).sort({
                created_at: -1
              }).limit(limit);
              this._applyOptions(queryBuilder, options);
              _context15.n = 5;
              return queryBuilder.lean(options.lean).exec();
            case 5:
              return _context15.a(2, _context15.v);
            case 6:
              _context15.p = 6;
              _t15 = _context15.v;
              throw new Error("Find notifications by channel failed: ".concat(_t15.message));
            case 7:
              return _context15.a(2);
          }
        }, _callee15, this, [[1, 6]]);
      }));
      function findByChannel(_x18) {
        return _findByChannel.apply(this, arguments);
      }
      return findByChannel;
    }()
    /**
     * Find notifications by priority
     * @param {string} priority - Priority
     * @param {string} [status] - Optional status filter
     * @param {number} [limit=100] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Notifications
     */
    )
  }, {
    key: "findByPriority",
    value: (function () {
      var _findByPriority = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(priority) {
        var status,
          limit,
          options,
          query,
          queryBuilder,
          _args16 = arguments,
          _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              status = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : null;
              limit = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : 100;
              options = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : {};
              _context16.p = 1;
              if (Object.values(_notificationConstants.NOTIFICATION_PRIORITY).includes(priority)) {
                _context16.n = 2;
                break;
              }
              throw new Error("Invalid priority: ".concat(priority));
            case 2:
              query = {
                priority: priority,
                deleted_at: null
              };
              if (status) query.status = status;
              queryBuilder = this.model.find(query).sort({
                created_at: -1
              }).limit(limit);
              this._applyOptions(queryBuilder, options);
              _context16.n = 3;
              return queryBuilder.lean(options.lean).exec();
            case 3:
              return _context16.a(2, _context16.v);
            case 4:
              _context16.p = 4;
              _t16 = _context16.v;
              throw new Error("Find notifications by priority failed: ".concat(_t16.message));
            case 5:
              return _context16.a(2);
          }
        }, _callee16, this, [[1, 4]]);
      }));
      function findByPriority(_x19) {
        return _findByPriority.apply(this, arguments);
      }
      return findByPriority;
    }()
    /**
     * Find pending notifications for delivery
     * @param {string} channel - Channel
     * @param {number} [limit=100] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Pending notifications
     */
    )
  }, {
    key: "findPendingForDelivery",
    value: (function () {
      var _findPendingForDelivery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(channel) {
        var limit,
          options,
          query,
          _args17 = arguments,
          _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              limit = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 100;
              options = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : {};
              _context17.p = 1;
              if (Object.values(_notificationConstants.NOTIFICATION_CHANNEL).includes(channel)) {
                _context17.n = 2;
                break;
              }
              throw new Error("Invalid channel: ".concat(channel));
            case 2:
              query = this.model.find({
                channel: channel,
                status: {
                  $in: [_notificationConstants.NOTIFICATION_STATUS.PENDING, _notificationConstants.NOTIFICATION_STATUS.QUEUED]
                },
                deleted_at: null
              }).sort({
                priority: -1,
                created_at: 1
              }).limit(limit);
              this._applyOptions(query, options);
              _context17.n = 3;
              return query.exec();
            case 3:
              return _context17.a(2, _context17.v);
            case 4:
              _context17.p = 4;
              _t17 = _context17.v;
              throw new Error("Find pending notifications failed: ".concat(_t17.message));
            case 5:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 4]]);
      }));
      function findPendingForDelivery(_x20) {
        return _findPendingForDelivery.apply(this, arguments);
      }
      return findPendingForDelivery;
    }()
    /**
     * Find notifications ready for retry
     * @param {number} [limit=50] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Notifications to retry
     */
    )
  }, {
    key: "findReadyForRetry",
    value: (function () {
      var _findReadyForRetry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        var limit,
          options,
          now,
          query,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              limit = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : 50;
              options = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : {};
              _context18.p = 1;
              now = new Date();
              query = this.model.find({
                status: _notificationConstants.NOTIFICATION_STATUS.FAILED,
                retry_count: {
                  $lt: 3
                },
                $or: [{
                  next_retry_at: null
                }, {
                  next_retry_at: {
                    $lte: now
                  }
                }],
                deleted_at: null
              }).sort({
                priority: -1,
                created_at: 1
              }).limit(limit);
              this._applyOptions(query, options);
              _context18.n = 2;
              return query.exec();
            case 2:
              return _context18.a(2, _context18.v);
            case 3:
              _context18.p = 3;
              _t18 = _context18.v;
              throw new Error("Find notifications for retry failed: ".concat(_t18.message));
            case 4:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 3]]);
      }));
      function findReadyForRetry() {
        return _findReadyForRetry.apply(this, arguments);
      }
      return findReadyForRetry;
    }()
    /**
     * Find expired notifications
     * @param {number} [limit=100] - Limit
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Expired notifications
     */
    )
  }, {
    key: "findExpired",
    value: (function () {
      var _findExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
        var limit,
          options,
          now,
          query,
          _args19 = arguments,
          _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              limit = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : 100;
              options = _args19.length > 1 && _args19[1] !== undefined ? _args19[1] : {};
              _context19.p = 1;
              now = new Date();
              query = this.model.find({
                expires_at: {
                  $lt: now
                },
                deleted_at: null
              }).sort({
                expires_at: 1
              }).limit(limit);
              this._applyOptions(query, options);
              _context19.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context19.a(2, _context19.v);
            case 3:
              _context19.p = 3;
              _t19 = _context19.v;
              throw new Error("Find expired notifications failed: ".concat(_t19.message));
            case 4:
              return _context19.a(2);
          }
        }, _callee19, this, [[1, 3]]);
      }));
      function findExpired() {
        return _findExpired.apply(this, arguments);
      }
      return findExpired;
    }()
    /**
     * Find notifications by event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Notifications
     */
    )
  }, {
    key: "findByEvent",
    value: (function () {
      var _findByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(eventId) {
        var options,
          query,
          _args20 = arguments,
          _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              options = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : {};
              _context20.p = 1;
              query = this.model.find({
                event: eventId,
                deleted_at: null
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context20.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context20.a(2, _context20.v);
            case 3:
              _context20.p = 3;
              _t20 = _context20.v;
              throw new Error("Find notifications by event failed: ".concat(_t20.message));
            case 4:
              return _context20.a(2);
          }
        }, _callee20, this, [[1, 3]]);
      }));
      function findByEvent(_x21) {
        return _findByEvent.apply(this, arguments);
      }
      return findByEvent;
    }()
    /**
     * Find notifications by batch
     * @param {string} batchId - Batch ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Notifications
     */
    )
  }, {
    key: "findByBatch",
    value: (function () {
      var _findByBatch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(batchId) {
        var options,
          query,
          _args21 = arguments,
          _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              options = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : {};
              _context21.p = 1;
              query = this.model.find({
                batch_id: batchId,
                deleted_at: null
              }).sort({
                created_at: -1
              });
              this._applyOptions(query, options);
              _context21.n = 2;
              return query.lean(options.lean).exec();
            case 2:
              return _context21.a(2, _context21.v);
            case 3:
              _context21.p = 3;
              _t21 = _context21.v;
              throw new Error("Find notifications by batch failed: ".concat(_t21.message));
            case 4:
              return _context21.a(2);
          }
        }, _callee21, this, [[1, 3]]);
      }));
      function findByBatch(_x22) {
        return _findByBatch.apply(this, arguments);
      }
      return findByBatch;
    }()
    /**
     * Get batch statistics
     * @param {string} batchId - Batch ID
     * @returns {Promise<Object>} - Batch statistics
     */
    )
  }, {
    key: "getBatchStatistics",
    value: (function () {
      var _getBatchStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(batchId) {
        var _stats$total$, _stats$sent$, _stats$read$, _stats$clicked$, _stats$failed$, _stats$sent$2, _stats$read$2, _stats$clicked$2, _yield$this$model$agg, _yield$this$model$agg2, stats, total, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _context22.n = 1;
              return this.model.aggregate([{
                $match: {
                  batch_id: batchId,
                  deleted_at: null
                }
              }, {
                $facet: {
                  total: [{
                    $count: "count"
                  }],
                  byStatus: [{
                    $group: {
                      _id: "$status",
                      count: {
                        $sum: 1
                      }
                    }
                  }],
                  sent: [{
                    $match: {
                      sent_at: {
                        $ne: null
                      }
                    }
                  }, {
                    $count: "count"
                  }],
                  read: [{
                    $match: {
                      read_at: {
                        $ne: null
                      }
                    }
                  }, {
                    $count: "count"
                  }],
                  clicked: [{
                    $match: {
                      clicked_at: {
                        $ne: null
                      }
                    }
                  }, {
                    $count: "count"
                  }],
                  failed: [{
                    $match: {
                      status: _notificationConstants.NOTIFICATION_STATUS.FAILED
                    }
                  }, {
                    $count: "count"
                  }]
                }
              }]);
            case 1:
              _yield$this$model$agg = _context22.v;
              _yield$this$model$agg2 = _slicedToArray(_yield$this$model$agg, 1);
              stats = _yield$this$model$agg2[0];
              total = (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0;
              return _context22.a(2, {
                total: total,
                byStatus: (stats === null || stats === void 0 ? void 0 : stats.byStatus) || [],
                sent: (stats === null || stats === void 0 || (_stats$sent$ = stats.sent[0]) === null || _stats$sent$ === void 0 ? void 0 : _stats$sent$.count) || 0,
                read: (stats === null || stats === void 0 || (_stats$read$ = stats.read[0]) === null || _stats$read$ === void 0 ? void 0 : _stats$read$.count) || 0,
                clicked: (stats === null || stats === void 0 || (_stats$clicked$ = stats.clicked[0]) === null || _stats$clicked$ === void 0 ? void 0 : _stats$clicked$.count) || 0,
                failed: (stats === null || stats === void 0 || (_stats$failed$ = stats.failed[0]) === null || _stats$failed$ === void 0 ? void 0 : _stats$failed$.count) || 0,
                deliveryRate: total > 0 ? Math.round(((stats === null || stats === void 0 || (_stats$sent$2 = stats.sent[0]) === null || _stats$sent$2 === void 0 ? void 0 : _stats$sent$2.count) || 0) / total * 10000) / 100 : 0,
                readRate: total > 0 ? Math.round(((stats === null || stats === void 0 || (_stats$read$2 = stats.read[0]) === null || _stats$read$2 === void 0 ? void 0 : _stats$read$2.count) || 0) / total * 10000) / 100 : 0,
                clickRate: total > 0 ? Math.round(((stats === null || stats === void 0 || (_stats$clicked$2 = stats.clicked[0]) === null || _stats$clicked$2 === void 0 ? void 0 : _stats$clicked$2.count) || 0) / total * 10000) / 100 : 0
              });
            case 2:
              _context22.p = 2;
              _t22 = _context22.v;
              throw new Error("Get batch statistics failed: ".concat(_t22.message));
            case 3:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 2]]);
      }));
      function getBatchStatistics(_x23) {
        return _getBatchStatistics.apply(this, arguments);
      }
      return getBatchStatistics;
    }()
    /**
     * Get user statistics
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @returns {Promise<Object>} - User statistics
     */
    )
  }, {
    key: "getUserStatistics",
    value: (function () {
      var _getUserStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(userId) {
        var _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _context23.n = 1;
              return this.model.getUserStatistics(userId);
            case 1:
              return _context23.a(2, _context23.v);
            case 2:
              _context23.p = 2;
              _t23 = _context23.v;
              throw new Error("Get user statistics failed: ".concat(_t23.message));
            case 3:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 2]]);
      }));
      function getUserStatistics(_x24) {
        return _getUserStatistics.apply(this, arguments);
      }
      return getUserStatistics;
    }()
    /**
     * Get system statistics
     * @returns {Promise<Object>} - System statistics
     */
    )
  }, {
    key: "getSystemStatistics",
    value: (function () {
      var _getSystemStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
        var _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              _context24.n = 1;
              return this.model.getSystemStatistics();
            case 1:
              return _context24.a(2, _context24.v);
            case 2:
              _context24.p = 2;
              _t24 = _context24.v;
              throw new Error("Get system statistics failed: ".concat(_t24.message));
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 2]]);
      }));
      function getSystemStatistics() {
        return _getSystemStatistics.apply(this, arguments);
      }
      return getSystemStatistics;
    }()
    /**
     * Delete old notifications
     * @param {number} [daysOld=90] - Days threshold
     * @returns {Promise<Object>} - Delete result
     */
    )
  }, {
    key: "deleteOld",
    value: (function () {
      var _deleteOld = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25() {
        var daysOld,
          cutoffDate,
          result,
          _args25 = arguments,
          _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              daysOld = _args25.length > 0 && _args25[0] !== undefined ? _args25[0] : 90;
              _context25.p = 1;
              cutoffDate = new Date();
              cutoffDate.setDate(cutoffDate.getDate() - daysOld);
              _context25.n = 2;
              return this.model.updateMany({
                created_at: {
                  $lt: cutoffDate
                },
                deleted_at: null
              }, {
                $set: {
                  deleted_at: new Date()
                }
              });
            case 2:
              result = _context25.v;
              return _context25.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 3:
              _context25.p = 3;
              _t25 = _context25.v;
              throw new Error("Delete old notifications failed: ".concat(_t25.message));
            case 4:
              return _context25.a(2);
          }
        }, _callee25, this, [[1, 3]]);
      }));
      function deleteOld() {
        return _deleteOld.apply(this, arguments);
      }
      return deleteOld;
    }()
    /**
     * Delete expired notifications
     * @returns {Promise<Object>} - Delete result
     */
    )
  }, {
    key: "deleteExpired",
    value: (function () {
      var _deleteExpired = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26() {
        var now, result, _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              _context26.p = 0;
              now = new Date();
              _context26.n = 1;
              return this.model.updateMany({
                expires_at: {
                  $lt: now
                },
                deleted_at: null
              }, {
                $set: {
                  deleted_at: new Date()
                }
              });
            case 1:
              result = _context26.v;
              return _context26.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context26.p = 2;
              _t26 = _context26.v;
              throw new Error("Delete expired notifications failed: ".concat(_t26.message));
            case 3:
              return _context26.a(2);
          }
        }, _callee26, this, [[0, 2]]);
      }));
      function deleteExpired() {
        return _deleteExpired.apply(this, arguments);
      }
      return deleteExpired;
    }()
    /**
     * Bulk create notifications
     * @param {Array<Object>} notificationsData - Array of notification data
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Created notifications
     */
    )
  }, {
    key: "bulkCreate",
    value: (function () {
      var _bulkCreate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(notificationsData) {
        var options,
          _iterator,
          _step,
          data,
          _args27 = arguments,
          _t27,
          _t28;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              options = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : {};
              _context27.p = 1;
              // Validate all notifications
              _iterator = _createForOfIteratorHelper(notificationsData);
              _context27.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context27.n = 8;
                break;
              }
              data = _step.value;
              if (data.user) {
                _context27.n = 4;
                break;
              }
              throw new Error("User is required for all notifications");
            case 4:
              if (data.type) {
                _context27.n = 5;
                break;
              }
              throw new Error("Type is required for all notifications");
            case 5:
              if (data.title) {
                _context27.n = 6;
                break;
              }
              throw new Error("Title is required for all notifications");
            case 6:
              if (data.message) {
                _context27.n = 7;
                break;
              }
              throw new Error("Message is required for all notifications");
            case 7:
              _context27.n = 3;
              break;
            case 8:
              _context27.n = 10;
              break;
            case 9:
              _context27.p = 9;
              _t27 = _context27.v;
              _iterator.e(_t27);
            case 10:
              _context27.p = 10;
              _iterator.f();
              return _context27.f(10);
            case 11:
              _context27.n = 12;
              return this.model.insertMany(notificationsData, options);
            case 12:
              return _context27.a(2, _context27.v);
            case 13:
              _context27.p = 13;
              _t28 = _context27.v;
              throw new Error("Bulk create notifications failed: ".concat(_t28.message));
            case 14:
              return _context27.a(2);
          }
        }, _callee27, this, [[2, 9, 10, 11], [1, 13]]);
      }));
      function bulkCreate(_x25) {
        return _bulkCreate.apply(this, arguments);
      }
      return bulkCreate;
    }()
    /**
     * Bulk delete notifications
     * @param {Array<string|mongoose.Types.ObjectId>} notificationIds - Notification IDs
     * @returns {Promise<Object>} - Delete result
     */
    )
  }, {
    key: "bulkDelete",
    value: (function () {
      var _bulkDelete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(notificationIds) {
        var result, _t29;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              _context28.n = 1;
              return this.model.updateMany({
                _id: {
                  $in: notificationIds
                }
              }, {
                $set: {
                  deleted_at: new Date()
                }
              });
            case 1:
              result = _context28.v;
              return _context28.a(2, {
                matched: result.matchedCount,
                modified: result.modifiedCount
              });
            case 2:
              _context28.p = 2;
              _t29 = _context28.v;
              throw new Error("Bulk delete notifications failed: ".concat(_t29.message));
            case 3:
              return _context28.a(2);
          }
        }, _callee28, this, [[0, 2]]);
      }));
      function bulkDelete(_x26) {
        return _bulkDelete.apply(this, arguments);
      }
      return bulkDelete;
    }()
    /**
     * Get notifications grouped by date
     * @param {string|mongoose.Types.ObjectId} userId - User ID
     * @param {number} [days=7] - Number of days
     * @returns {Promise<Array>} - Notifications grouped by date
     */
    )
  }, {
    key: "getGroupedByDate",
    value: (function () {
      var _getGroupedByDate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(userId) {
        var days,
          startDate,
          notifications,
          _args29 = arguments,
          _t30;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.p = _context29.n) {
            case 0:
              days = _args29.length > 1 && _args29[1] !== undefined ? _args29[1] : 7;
              _context29.p = 1;
              startDate = new Date();
              startDate.setDate(startDate.getDate() - days);
              _context29.n = 2;
              return this.model.aggregate([{
                $match: {
                  user: new mongoose.Types.ObjectId(userId),
                  created_at: {
                    $gte: startDate
                  },
                  deleted_at: null
                }
              }, {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$created_at"
                    }
                  },
                  notifications: {
                    $push: "$$ROOT"
                  },
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  _id: -1
                }
              }]);
            case 2:
              notifications = _context29.v;
              return _context29.a(2, notifications);
            case 3:
              _context29.p = 3;
              _t30 = _context29.v;
              throw new Error("Get notifications grouped by date failed: ".concat(_t30.message));
            case 4:
              return _context29.a(2);
          }
        }, _callee29, this, [[1, 3]]);
      }));
      function getGroupedByDate(_x27) {
        return _getGroupedByDate.apply(this, arguments);
      }
      return getGroupedByDate;
    }())
  }]);
}(_baseRepository.BaseRepository);
var _default = exports["default"] = new NotificationRepository();