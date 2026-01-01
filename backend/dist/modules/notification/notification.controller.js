"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NotificationController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _notificationRepository = _interopRequireDefault(require("./notification.repository.js"));
var _notificationValidation = _interopRequireDefault(require("./notification.validation.js"));
var _excluded = ["user_ids"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
 * Notification Controller
 * Handles HTTP requests for notification management
 */
var NotificationController = exports.NotificationController = /*#__PURE__*/function (_BaseController) {
  function NotificationController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, NotificationController);
    return _callSuper(this, NotificationController, [{
      notificationRepository: dependencies.notificationRepository || _notificationRepository["default"]
    }]);
  }

  // ==================== NOTIFICATION CRUD ====================

  /**
   * Create a new notification
   * POST /api/notifications
   */
  _inherits(NotificationController, _BaseController);
  return _createClass(NotificationController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, notification;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _notificationValidation["default"].createNotificationSchema);
              _context.n = 1;
              return this.service("notificationRepository").create(validated);
            case 1:
              notification = _context.v;
              return _context.a(2, this.created(res, {
                data: notification,
                message: "Notification created successfully"
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
     * Get all notifications with pagination and filters
     * GET /api/notifications
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["user", "type", "channel", "status", "priority", "event", "batch_id"]);
              sort = this.getSort(req, "-created_at"); // Handle read filter
              if (req.query.is_read !== undefined) {
                if (req.query.is_read === "true") {
                  filters.read_at = {
                    $ne: null
                  };
                } else {
                  filters.read_at = null;
                }
              }

              // Date range filters
              if (req.query.created_at_from) {
                filters.created_at = _objectSpread(_objectSpread({}, filters.created_at), {}, {
                  $gte: new Date(req.query.created_at_from)
                });
              }
              if (req.query.created_at_to) {
                filters.created_at = _objectSpread(_objectSpread({}, filters.created_at), {}, {
                  $lte: new Date(req.query.created_at_to)
                });
              }
              _context2.n = 1;
              return this.service("notificationRepository").findAll(filters, page, limit, {
                sort: sort,
                populate: ["user", "event"]
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
     * Get notification by ID
     * GET /api/notifications/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var id, notification;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              id = req.params.id;
              _context3.n = 1;
              return this.service("notificationRepository").findById(id, {
                populate: ["user", "event", "candidate", "category"]
              });
            case 1:
              notification = _context3.v;
              if (notification) {
                _context3.n = 2;
                break;
              }
              return _context3.a(2, this.notFound(res, {
                resource: "Notification"
              }));
            case 2:
              return _context3.a(2, this.success(res, {
                data: notification
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
     * Update notification
     * PUT /api/notifications/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var id, validated, notification;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _notificationValidation["default"].updateNotificationSchema);
              _context4.n = 1;
              return this.service("notificationRepository").update(id, validated);
            case 1:
              notification = _context4.v;
              return _context4.a(2, this.success(res, {
                data: notification,
                message: "Notification updated successfully"
              }));
          }
        }, _callee4, this);
      }));
      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete notification (soft delete)
     * DELETE /api/notifications/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var id;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              id = req.params.id;
              _context5.n = 1;
              return this.service("notificationRepository")["delete"](id);
            case 1:
              return _context5.a(2, this.success(res, {
                message: "Notification deleted successfully"
              }));
          }
        }, _callee5, this);
      }));
      function _delete(_x9, _x0) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== USER NOTIFICATIONS ====================
    /**
     * Get notifications for a user
     * GET /api/notifications/user/:userId
     */
    )
  }, {
    key: "getByUser",
    value: function () {
      var _getByUser = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var userId, _this$getPagination2, page, limit, result;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              userId = req.params.userId;
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit;
              _context6.n = 1;
              return this.service("notificationRepository").findByUser(userId, page, limit);
            case 1:
              result = _context6.v;
              return _context6.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee6, this);
      }));
      function getByUser(_x1, _x10) {
        return _getByUser.apply(this, arguments);
      }
      return getByUser;
    }()
    /**
     * Get my notifications (current user)
     * GET /api/notifications/me
     */
  }, {
    key: "getMyNotifications",
    value: (function () {
      var _getMyNotifications = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var userId, _this$getPagination3, page, limit, result;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              userId = this.getUserId(req);
              if (userId) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2, this.unauthorized(res));
            case 1:
              _this$getPagination3 = this.getPagination(req), page = _this$getPagination3.page, limit = _this$getPagination3.limit;
              _context7.n = 2;
              return this.service("notificationRepository").findByUser(userId, page, limit);
            case 2:
              result = _context7.v;
              return _context7.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee7, this);
      }));
      function getMyNotifications(_x11, _x12) {
        return _getMyNotifications.apply(this, arguments);
      }
      return getMyNotifications;
    }()
    /**
     * Get unread notifications for current user
     * GET /api/notifications/me/unread
     */
    )
  }, {
    key: "getUnread",
    value: (function () {
      var _getUnread = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var userId, limit, notifications;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              userId = this.getUserId(req);
              if (userId) {
                _context8.n = 1;
                break;
              }
              return _context8.a(2, this.unauthorized(res));
            case 1:
              limit = parseInt(req.query.limit, 10) || 20;
              _context8.n = 2;
              return this.service("notificationRepository").findUnread(userId, limit);
            case 2:
              notifications = _context8.v;
              return _context8.a(2, this.success(res, {
                data: notifications
              }));
          }
        }, _callee8, this);
      }));
      function getUnread(_x13, _x14) {
        return _getUnread.apply(this, arguments);
      }
      return getUnread;
    }()
    /**
     * Get unread count for current user
     * GET /api/notifications/me/unread/count
     */
    )
  }, {
    key: "getUnreadCount",
    value: (function () {
      var _getUnreadCount = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var userId, count;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              userId = this.getUserId(req);
              if (userId) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, this.unauthorized(res));
            case 1:
              _context9.n = 2;
              return this.service("notificationRepository").getUnreadCount(userId);
            case 2:
              count = _context9.v;
              return _context9.a(2, this.success(res, {
                data: {
                  count: count
                }
              }));
          }
        }, _callee9, this);
      }));
      function getUnreadCount(_x15, _x16) {
        return _getUnreadCount.apply(this, arguments);
      }
      return getUnreadCount;
    }() // ==================== READ STATUS MANAGEMENT ====================
    /**
     * Mark notification as read
     * PUT /api/notifications/:id/read
     */
    )
  }, {
    key: "markAsRead",
    value: function () {
      var _markAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var id, notification;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              id = req.params.id;
              _context0.n = 1;
              return this.service("notificationRepository").markAsRead(id);
            case 1:
              notification = _context0.v;
              return _context0.a(2, this.success(res, {
                data: notification,
                message: "Notification marked as read"
              }));
          }
        }, _callee0, this);
      }));
      function markAsRead(_x17, _x18) {
        return _markAsRead.apply(this, arguments);
      }
      return markAsRead;
    }()
    /**
     * Mark notification as clicked
     * PUT /api/notifications/:id/clicked
     */
  }, {
    key: "markAsClicked",
    value: (function () {
      var _markAsClicked = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var id, notification;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              id = req.params.id;
              _context1.n = 1;
              return this.service("notificationRepository").markAsClicked(id);
            case 1:
              notification = _context1.v;
              return _context1.a(2, this.success(res, {
                data: notification,
                message: "Notification marked as clicked"
              }));
          }
        }, _callee1, this);
      }));
      function markAsClicked(_x19, _x20) {
        return _markAsClicked.apply(this, arguments);
      }
      return markAsClicked;
    }()
    /**
     * Mark all notifications as read for current user
     * PUT /api/notifications/me/read-all
     */
    )
  }, {
    key: "markAllAsRead",
    value: (function () {
      var _markAllAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var userId, result;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              userId = this.getUserId(req);
              if (userId) {
                _context10.n = 1;
                break;
              }
              return _context10.a(2, this.unauthorized(res));
            case 1:
              _context10.n = 2;
              return this.service("notificationRepository").markAllAsRead(userId);
            case 2:
              result = _context10.v;
              return _context10.a(2, this.success(res, {
                data: result,
                message: "All notifications marked as read"
              }));
          }
        }, _callee10, this);
      }));
      function markAllAsRead(_x21, _x22) {
        return _markAllAsRead.apply(this, arguments);
      }
      return markAllAsRead;
    }()
    /**
     * Bulk mark notifications as read
     * PUT /api/notifications/bulk/read
     */
    )
  }, {
    key: "bulkMarkAsRead",
    value: (function () {
      var _bulkMarkAsRead = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var _this = this;
        var validated, userId, results, succeeded, failed;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              validated = this.validate(req.body, _notificationValidation["default"].bulkMarkAsReadSchema);
              userId = this.getUserId(req);
              if (userId) {
                _context11.n = 1;
                break;
              }
              return _context11.a(2, this.unauthorized(res));
            case 1:
              _context11.n = 2;
              return Promise.allSettled(validated.notification_ids.map(function (id) {
                return _this.service("notificationRepository").markAsRead(id);
              }));
            case 2:
              results = _context11.v;
              succeeded = results.filter(function (r) {
                return r.status === "fulfilled";
              }).length;
              failed = results.filter(function (r) {
                return r.status === "rejected";
              }).length;
              return _context11.a(2, this.success(res, {
                data: {
                  succeeded: succeeded,
                  failed: failed
                },
                message: "".concat(succeeded, " notifications marked as read")
              }));
          }
        }, _callee11, this);
      }));
      function bulkMarkAsRead(_x23, _x24) {
        return _bulkMarkAsRead.apply(this, arguments);
      }
      return bulkMarkAsRead;
    }() // ==================== NOTIFICATION TYPE QUERIES ====================
    /**
     * Get notifications by type for current user
     * GET /api/notifications/me/type/:type
     */
    )
  }, {
    key: "getByType",
    value: function () {
      var _getByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var type, userId, limit, notifications;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              type = req.params.type;
              userId = this.getUserId(req);
              if (userId) {
                _context12.n = 1;
                break;
              }
              return _context12.a(2, this.unauthorized(res));
            case 1:
              limit = parseInt(req.query.limit, 10) || 20;
              _context12.n = 2;
              return this.service("notificationRepository").findByType(userId, type, limit);
            case 2:
              notifications = _context12.v;
              return _context12.a(2, this.success(res, {
                data: notifications
              }));
          }
        }, _callee12, this);
      }));
      function getByType(_x25, _x26) {
        return _getByType.apply(this, arguments);
      }
      return getByType;
    }() // ==================== EVENT NOTIFICATIONS ====================
    /**
     * Get notifications by event
     * GET /api/notifications/event/:eventId
     */
  }, {
    key: "getByEvent",
    value: function () {
      var _getByEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var eventId, _this$getPagination4, page, limit, result;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              eventId = req.params.eventId;
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit;
              _context13.n = 1;
              return this.service("notificationRepository").findAll({
                event: eventId
              }, page, limit, {
                sort: {
                  created_at: -1
                }
              });
            case 1:
              result = _context13.v;
              return _context13.a(2, this.paginated(res, {
                data: result.data,
                page: page,
                limit: limit,
                total_items: result.total
              }));
          }
        }, _callee13, this);
      }));
      function getByEvent(_x27, _x28) {
        return _getByEvent.apply(this, arguments);
      }
      return getByEvent;
    }() // ==================== DELIVERY STATUS ====================
    /**
     * Get notifications by channel
     * GET /api/notifications/channel/:channel
     */
  }, {
    key: "getByChannel",
    value: function () {
      var _getByChannel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var channel, status, limit, notifications;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              channel = req.params.channel;
              status = req.query.status;
              limit = parseInt(req.query.limit, 10) || 100;
              _context14.n = 1;
              return this.service("notificationRepository").findByChannel(channel, status || null, limit);
            case 1:
              notifications = _context14.v;
              return _context14.a(2, this.success(res, {
                data: notifications
              }));
          }
        }, _callee14, this);
      }));
      function getByChannel(_x29, _x30) {
        return _getByChannel.apply(this, arguments);
      }
      return getByChannel;
    }()
    /**
     * Get pending notifications for delivery
     * GET /api/notifications/pending/:channel
     */
  }, {
    key: "getPending",
    value: (function () {
      var _getPending = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var channel, limit, notifications;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              channel = req.params.channel;
              limit = parseInt(req.query.limit, 10) || 100;
              _context15.n = 1;
              return this.service("notificationRepository").findPendingForDelivery(channel, limit);
            case 1:
              notifications = _context15.v;
              return _context15.a(2, this.success(res, {
                data: notifications
              }));
          }
        }, _callee15, this);
      }));
      function getPending(_x31, _x32) {
        return _getPending.apply(this, arguments);
      }
      return getPending;
    }()
    /**
     * Get notifications ready for retry
     * GET /api/notifications/retry
     */
    )
  }, {
    key: "getReadyForRetry",
    value: (function () {
      var _getReadyForRetry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var limit, notifications;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              limit = parseInt(req.query.limit, 10) || 50;
              _context16.n = 1;
              return this.service("notificationRepository").findReadyForRetry(limit);
            case 1:
              notifications = _context16.v;
              return _context16.a(2, this.success(res, {
                data: notifications
              }));
          }
        }, _callee16, this);
      }));
      function getReadyForRetry(_x33, _x34) {
        return _getReadyForRetry.apply(this, arguments);
      }
      return getReadyForRetry;
    }() // ==================== DELIVERY ACTIONS ====================
    /**
     * Mark notification as sent
     * PUT /api/notifications/:id/sent
     */
    )
  }, {
    key: "markAsSent",
    value: function () {
      var _markAsSent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var id, provider_id, notification;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              id = req.params.id;
              provider_id = req.body.provider_id;
              _context17.n = 1;
              return this.service("notificationRepository").markAsSent(id, provider_id || null);
            case 1:
              notification = _context17.v;
              return _context17.a(2, this.success(res, {
                data: notification,
                message: "Notification marked as sent"
              }));
          }
        }, _callee17, this);
      }));
      function markAsSent(_x35, _x36) {
        return _markAsSent.apply(this, arguments);
      }
      return markAsSent;
    }()
    /**
     * Mark notification as delivered
     * PUT /api/notifications/:id/delivered
     */
  }, {
    key: "markAsDelivered",
    value: (function () {
      var _markAsDelivered = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var id, notification;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              id = req.params.id;
              _context18.n = 1;
              return this.service("notificationRepository").markAsDelivered(id);
            case 1:
              notification = _context18.v;
              return _context18.a(2, this.success(res, {
                data: notification,
                message: "Notification marked as delivered"
              }));
          }
        }, _callee18, this);
      }));
      function markAsDelivered(_x37, _x38) {
        return _markAsDelivered.apply(this, arguments);
      }
      return markAsDelivered;
    }()
    /**
     * Mark notification as failed
     * PUT /api/notifications/:id/failed
     */
    )
  }, {
    key: "markAsFailed",
    value: (function () {
      var _markAsFailed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
        var id, _req$body, error_message, should_retry, notification;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              id = req.params.id;
              _req$body = req.body, error_message = _req$body.error_message, should_retry = _req$body.should_retry;
              if (error_message) {
                _context19.n = 1;
                break;
              }
              return _context19.a(2, this.badRequest(res, {
                message: "error_message is required"
              }));
            case 1:
              _context19.n = 2;
              return this.service("notificationRepository").markAsFailed(id, error_message, should_retry !== false);
            case 2:
              notification = _context19.v;
              return _context19.a(2, this.success(res, {
                data: notification,
                message: "Notification marked as failed"
              }));
          }
        }, _callee19, this);
      }));
      function markAsFailed(_x39, _x40) {
        return _markAsFailed.apply(this, arguments);
      }
      return markAsFailed;
    }()
    /**
     * Queue notification for delivery
     * PUT /api/notifications/:id/queue
     */
    )
  }, {
    key: "queue",
    value: (function () {
      var _queue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
        var id, notification;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              id = req.params.id;
              _context20.n = 1;
              return this.service("notificationRepository").queue(id);
            case 1:
              notification = _context20.v;
              return _context20.a(2, this.success(res, {
                data: notification,
                message: "Notification queued for delivery"
              }));
          }
        }, _callee20, this);
      }));
      function queue(_x41, _x42) {
        return _queue.apply(this, arguments);
      }
      return queue;
    }() // ==================== BULK OPERATIONS ====================
    /**
     * Bulk create notifications for multiple users
     * POST /api/notifications/bulk
     */
    )
  }, {
    key: "bulkCreate",
    value: function () {
      var _bulkCreate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
        var _this2 = this;
        var validated, user_ids, notificationData, results, succeeded, failed;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              validated = this.validate(req.body, _notificationValidation["default"].bulkCreateNotificationsSchema);
              user_ids = validated.user_ids, notificationData = _objectWithoutProperties(validated, _excluded); // Create notifications for each user
              _context21.n = 1;
              return Promise.allSettled(user_ids.map(function (userId) {
                return _this2.service("notificationRepository").create(_objectSpread(_objectSpread({}, notificationData), {}, {
                  user: userId
                }));
              }));
            case 1:
              results = _context21.v;
              succeeded = results.filter(function (r) {
                return r.status === "fulfilled";
              }).length;
              failed = results.filter(function (r) {
                return r.status === "rejected";
              }).length;
              return _context21.a(2, this.created(res, {
                data: {
                  succeeded: succeeded,
                  failed: failed
                },
                message: "".concat(succeeded, " notifications created")
              }));
          }
        }, _callee21, this);
      }));
      function bulkCreate(_x43, _x44) {
        return _bulkCreate.apply(this, arguments);
      }
      return bulkCreate;
    }()
  }]);
}(_baseController["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new NotificationController();