"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.EventController = void 0;
var _baseController = _interopRequireDefault(require("../shared/base.controller.js"));
var _eventService = _interopRequireDefault(require("./event.service.js"));
var _eventValidation = _interopRequireWildcard(require("./event.validation.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
 * Event Controller
 * Handles HTTP requests for event management operations
 */
var EventController = exports.EventController = /*#__PURE__*/function (_BaseController) {
  function EventController() {
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, EventController);
    return _callSuper(this, EventController, [{
      eventService: dependencies.eventService || _eventService["default"]
    }]);
  }

  // ==================== EVENT CRUD ====================

  /**
   * Create a new event
   * POST /api/events
   */
  _inherits(EventController, _BaseController);
  return _createClass(EventController, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
        var validated, adminId, event;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              validated = this.validate(req.body, _eventValidation.createEventSchema);
              adminId = this.getUserId(req);
              _context.n = 1;
              return this.service("eventService").createEvent(validated, adminId);
            case 1:
              event = _context.v;
              return _context.a(2, this.created(res, {
                data: event,
                message: "Event created successfully"
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
     * Get all events with pagination and filters
     * GET /api/events
     */
  }, {
    key: "list",
    value: (function () {
      var _list = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
        var _this$getPagination, page, limit, skip, filters, sort, search, _yield$Promise$all, _yield$Promise$all2, events, total;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$getPagination = this.getPagination(req), page = _this$getPagination.page, limit = _this$getPagination.limit, skip = _this$getPagination.skip;
              filters = this.getFilters(req, ["status", "is_published", "is_featured", "event_type", "visibility", "created_by"]);
              sort = this.getSort(req, "-created_at");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  name: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  description: {
                    $regex: search,
                    $options: "i"
                  }
                }, {
                  tags: {
                    $in: [new RegExp(search, "i")]
                  }
                }];
              }
              _context2.n = 1;
              return Promise.all([this.service("eventService").listEvents(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("eventService").countEvents(filters)]);
            case 1:
              _yield$Promise$all = _context2.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              events = _yield$Promise$all2[0];
              total = _yield$Promise$all2[1];
              return _context2.a(2, this.paginated(res, {
                data: events,
                page: page,
                limit: limit,
                total_items: total
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
     * Get published events (public)
     * GET /api/events/public
     */
    )
  }, {
    key: "listPublic",
    value: (function () {
      var _listPublic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
        var _this$getPagination2, page, limit, skip, filters, sort, search, _yield$Promise$all3, _yield$Promise$all4, events, total;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _this$getPagination2 = this.getPagination(req), page = _this$getPagination2.page, limit = _this$getPagination2.limit, skip = _this$getPagination2.skip;
              filters = _objectSpread({
                is_published: true,
                visibility: "public"
              }, this.getFilters(req, ["status", "is_featured", "event_type"]));
              sort = this.getSort(req, "-start_date");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  name: {
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
              _context3.n = 1;
              return Promise.all([this.service("eventService").listEvents(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("eventService").countEvents(filters)]);
            case 1:
              _yield$Promise$all3 = _context3.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              events = _yield$Promise$all4[0];
              total = _yield$Promise$all4[1];
              return _context3.a(2, this.paginated(res, {
                data: events,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee3, this);
      }));
      function listPublic(_x5, _x6) {
        return _listPublic.apply(this, arguments);
      }
      return listPublic;
    }()
    /**
     * Get event by ID
     * GET /api/events/:id
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
        var id, event;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              id = req.params.id;
              _context4.n = 1;
              return this.service("eventService").getEventById(id);
            case 1:
              event = _context4.v;
              if (event) {
                _context4.n = 2;
                break;
              }
              return _context4.a(2, this.notFound(res, {
                resource: "Event"
              }));
            case 2:
              return _context4.a(2, this.success(res, {
                data: event
              }));
          }
        }, _callee4, this);
      }));
      function getById(_x7, _x8) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * Get event by slug (public)
     * GET /api/events/slug/:slug
     */
    )
  }, {
    key: "getBySlug",
    value: (function () {
      var _getBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
        var slug, event;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              slug = req.params.slug;
              _context5.n = 1;
              return this.service("eventService").getEventBySlug(slug);
            case 1:
              event = _context5.v;
              if (event) {
                _context5.n = 2;
                break;
              }
              return _context5.a(2, this.notFound(res, {
                resource: "Event"
              }));
            case 2:
              return _context5.a(2, this.success(res, {
                data: event
              }));
          }
        }, _callee5, this);
      }));
      function getBySlug(_x9, _x0) {
        return _getBySlug.apply(this, arguments);
      }
      return getBySlug;
    }()
    /**
     * Update event
     * PUT /api/events/:id
     */
    )
  }, {
    key: "update",
    value: (function () {
      var _update = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
        var id, validated, adminId, event;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _eventValidation.updateEventSchema);
              adminId = this.getUserId(req);
              _context6.n = 1;
              return this.service("eventService").updateEvent(id, validated, adminId);
            case 1:
              event = _context6.v;
              return _context6.a(2, this.success(res, {
                data: event,
                message: "Event updated successfully"
              }));
          }
        }, _callee6, this);
      }));
      function update(_x1, _x10) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
    /**
     * Delete event (soft delete)
     * DELETE /api/events/:id
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
        var id, adminId;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context7.n = 1;
              return this.service("eventService").deleteEvent(id, adminId);
            case 1:
              return _context7.a(2, this.success(res, {
                message: "Event deleted successfully"
              }));
          }
        }, _callee7, this);
      }));
      function _delete(_x11, _x12) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }() // ==================== EVENT LIFECYCLE ====================
    /**
     * Publish event
     * PUT /api/events/:id/publish
     */
    )
  }, {
    key: "publish",
    value: function () {
      var _publish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
        var id, adminId, event;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context8.n = 1;
              return this.service("eventService").publishEvent(id, adminId);
            case 1:
              event = _context8.v;
              return _context8.a(2, this.success(res, {
                data: event,
                message: "Event published successfully"
              }));
          }
        }, _callee8, this);
      }));
      function publish(_x13, _x14) {
        return _publish.apply(this, arguments);
      }
      return publish;
    }()
    /**
     * Unpublish event
     * PUT /api/events/:id/unpublish
     */
  }, {
    key: "unpublish",
    value: (function () {
      var _unpublish = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
        var id, adminId, event;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context9.n = 1;
              return this.service("eventService").unpublishEvent(id, adminId);
            case 1:
              event = _context9.v;
              return _context9.a(2, this.success(res, {
                data: event,
                message: "Event unpublished successfully"
              }));
          }
        }, _callee9, this);
      }));
      function unpublish(_x15, _x16) {
        return _unpublish.apply(this, arguments);
      }
      return unpublish;
    }()
    /**
     * Update event status
     * PUT /api/events/:id/status
     */
    )
  }, {
    key: "updateStatus",
    value: (function () {
      var _updateStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
        var id, validated, adminId, event;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              id = req.params.id;
              validated = this.validate(req.body, _eventValidation.updateEventStatusSchema);
              adminId = this.getUserId(req);
              _context0.n = 1;
              return this.service("eventService").updateEventStatus(id, validated.status, adminId);
            case 1:
              event = _context0.v;
              return _context0.a(2, this.success(res, {
                data: event,
                message: "Event status updated successfully"
              }));
          }
        }, _callee0, this);
      }));
      function updateStatus(_x17, _x18) {
        return _updateStatus.apply(this, arguments);
      }
      return updateStatus;
    }()
    /**
     * Cancel event
     * PUT /api/events/:id/cancel
     */
    )
  }, {
    key: "cancel",
    value: (function () {
      var _cancel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
        var id, reason, adminId, event;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              id = req.params.id;
              reason = req.body.reason;
              adminId = this.getUserId(req);
              _context1.n = 1;
              return this.service("eventService").cancelEvent(id, reason, adminId);
            case 1:
              event = _context1.v;
              return _context1.a(2, this.success(res, {
                data: event,
                message: "Event cancelled successfully"
              }));
          }
        }, _callee1, this);
      }));
      function cancel(_x19, _x20) {
        return _cancel.apply(this, arguments);
      }
      return cancel;
    }()
    /**
     * Complete event
     * PUT /api/events/:id/complete
     */
    )
  }, {
    key: "complete",
    value: (function () {
      var _complete = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
        var id, adminId, event;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context10.n = 1;
              return this.service("eventService").completeEvent(id, adminId);
            case 1:
              event = _context10.v;
              return _context10.a(2, this.success(res, {
                data: event,
                message: "Event completed successfully"
              }));
          }
        }, _callee10, this);
      }));
      function complete(_x21, _x22) {
        return _complete.apply(this, arguments);
      }
      return complete;
    }() // ==================== EVENT FEATURES ====================
    /**
     * Toggle featured status
     * PUT /api/events/:id/featured
     */
    )
  }, {
    key: "toggleFeatured",
    value: function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
        var id, adminId, event;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context11.n = 1;
              return this.service("eventService").toggleFeatured(id, adminId);
            case 1:
              event = _context11.v;
              return _context11.a(2, this.success(res, {
                data: event,
                message: event.is_featured ? "Event featured" : "Event unfeatured"
              }));
          }
        }, _callee11, this);
      }));
      function toggleFeatured(_x23, _x24) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Get featured events (public)
     * GET /api/events/featured
     */
  }, {
    key: "getFeatured",
    value: (function () {
      var _getFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
        var _this$getPagination3, limit, events;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.n) {
            case 0:
              _this$getPagination3 = this.getPagination(req), limit = _this$getPagination3.limit;
              _context12.n = 1;
              return this.service("eventService").getFeaturedEvents(limit);
            case 1:
              events = _context12.v;
              return _context12.a(2, this.success(res, {
                data: events
              }));
          }
        }, _callee12, this);
      }));
      function getFeatured(_x25, _x26) {
        return _getFeatured.apply(this, arguments);
      }
      return getFeatured;
    }()
    /**
     * Get upcoming events (public)
     * GET /api/events/upcoming
     */
    )
  }, {
    key: "getUpcoming",
    value: (function () {
      var _getUpcoming = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
        var _this$getPagination4, page, limit, skip, events, total;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              _this$getPagination4 = this.getPagination(req), page = _this$getPagination4.page, limit = _this$getPagination4.limit, skip = _this$getPagination4.skip;
              _context13.n = 1;
              return this.service("eventService").getUpcomingEvents(limit, {
                skip: skip
              });
            case 1:
              events = _context13.v;
              _context13.n = 2;
              return this.service("eventService").countUpcomingEvents();
            case 2:
              total = _context13.v;
              return _context13.a(2, this.paginated(res, {
                data: events,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee13, this);
      }));
      function getUpcoming(_x27, _x28) {
        return _getUpcoming.apply(this, arguments);
      }
      return getUpcoming;
    }() // ==================== EVENT CATEGORIES ====================
    /**
     * Get event categories
     * GET /api/events/:id/categories
     */
    )
  }, {
    key: "getCategories",
    value: function () {
      var _getCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
        var id, categories;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.n) {
            case 0:
              id = req.params.id;
              _context14.n = 1;
              return this.service("eventService").getEventCategories(id);
            case 1:
              categories = _context14.v;
              return _context14.a(2, this.success(res, {
                data: categories
              }));
          }
        }, _callee14, this);
      }));
      function getCategories(_x29, _x30) {
        return _getCategories.apply(this, arguments);
      }
      return getCategories;
    }() // ==================== EVENT CANDIDATES ====================
    /**
     * Get event candidates
     * GET /api/events/:id/candidates
     */
  }, {
    key: "getCandidates",
    value: function () {
      var _getCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
        var id, _this$getPagination5, page, limit, skip, filters, _yield$Promise$all5, _yield$Promise$all6, candidates, total;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              id = req.params.id;
              _this$getPagination5 = this.getPagination(req), page = _this$getPagination5.page, limit = _this$getPagination5.limit, skip = _this$getPagination5.skip;
              filters = this.getFilters(req, ["status", "category"]);
              _context15.n = 1;
              return Promise.all([this.service("eventService").getEventCandidates(id, filters, {
                skip: skip,
                limit: limit
              }), this.service("eventService").countEventCandidates(id, filters)]);
            case 1:
              _yield$Promise$all5 = _context15.v;
              _yield$Promise$all6 = _slicedToArray(_yield$Promise$all5, 2);
              candidates = _yield$Promise$all6[0];
              total = _yield$Promise$all6[1];
              return _context15.a(2, this.paginated(res, {
                data: candidates,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee15, this);
      }));
      function getCandidates(_x31, _x32) {
        return _getCandidates.apply(this, arguments);
      }
      return getCandidates;
    }() // ==================== EVENT STATISTICS ====================
    /**
     * Get event statistics
     * GET /api/events/:id/stats
     */
  }, {
    key: "getStats",
    value: function () {
      var _getStats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
        var id, stats;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.n) {
            case 0:
              id = req.params.id;
              _context16.n = 1;
              return this.service("eventService").getEventStatistics(id);
            case 1:
              stats = _context16.v;
              return _context16.a(2, this.success(res, {
                data: stats
              }));
          }
        }, _callee16, this);
      }));
      function getStats(_x33, _x34) {
        return _getStats.apply(this, arguments);
      }
      return getStats;
    }()
    /**
     * Get event vote summary
     * GET /api/events/:id/votes/summary
     */
  }, {
    key: "getVoteSummary",
    value: (function () {
      var _getVoteSummary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
        var id, summary;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.n) {
            case 0:
              id = req.params.id;
              _context17.n = 1;
              return this.service("eventService").getEventVoteSummary(id);
            case 1:
              summary = _context17.v;
              return _context17.a(2, this.success(res, {
                data: summary
              }));
          }
        }, _callee17, this);
      }));
      function getVoteSummary(_x35, _x36) {
        return _getVoteSummary.apply(this, arguments);
      }
      return getVoteSummary;
    }() // ==================== EVENT RESULTS ====================
    /**
     * Get event results (public if published)
     * GET /api/events/:id/results
     */
    )
  }, {
    key: "getResults",
    value: function () {
      var _getResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
        var id, results;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              id = req.params.id;
              _context18.n = 1;
              return this.service("eventService").getEventResults(id);
            case 1:
              results = _context18.v;
              return _context18.a(2, this.success(res, {
                data: results
              }));
          }
        }, _callee18, this);
      }));
      function getResults(_x37, _x38) {
        return _getResults.apply(this, arguments);
      }
      return getResults;
    }()
    /**
     * Publish event results
     * PUT /api/events/:id/results/publish
     */
  }, {
    key: "publishResults",
    value: (function () {
      var _publishResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
        var id, adminId, event;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context19.n = 1;
              return this.service("eventService").publishResults(id, adminId);
            case 1:
              event = _context19.v;
              return _context19.a(2, this.success(res, {
                data: event,
                message: "Results published successfully"
              }));
          }
        }, _callee19, this);
      }));
      function publishResults(_x39, _x40) {
        return _publishResults.apply(this, arguments);
      }
      return publishResults;
    }() // ==================== ADMIN OPERATIONS ====================
    /**
     * Get all events for admin (including unpublished)
     * GET /api/admin/events
     */
    )
  }, {
    key: "adminList",
    value: function () {
      var _adminList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
        var _this$getPagination6, page, limit, skip, filters, sort, search, _yield$Promise$all7, _yield$Promise$all8, events, total;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.n) {
            case 0:
              _this$getPagination6 = this.getPagination(req), page = _this$getPagination6.page, limit = _this$getPagination6.limit, skip = _this$getPagination6.skip;
              filters = this.getFilters(req, ["status", "is_published", "is_featured", "created_by"]);
              sort = this.getSort(req, "-created_at");
              search = this.getSearch(req);
              if (search) {
                filters.$or = [{
                  name: {
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
              _context20.n = 1;
              return Promise.all([this.service("eventService").listEvents(filters, {
                skip: skip,
                limit: limit,
                sort: sort
              }), this.service("eventService").countEvents(filters)]);
            case 1:
              _yield$Promise$all7 = _context20.v;
              _yield$Promise$all8 = _slicedToArray(_yield$Promise$all7, 2);
              events = _yield$Promise$all8[0];
              total = _yield$Promise$all8[1];
              return _context20.a(2, this.paginated(res, {
                data: events,
                page: page,
                limit: limit,
                total_items: total
              }));
          }
        }, _callee20, this);
      }));
      function adminList(_x41, _x42) {
        return _adminList.apply(this, arguments);
      }
      return adminList;
    }()
    /**
     * Duplicate event
     * POST /api/events/:id/duplicate
     */
  }, {
    key: "duplicate",
    value: (function () {
      var _duplicate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
        var id, adminId, event;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              id = req.params.id;
              adminId = this.getUserId(req);
              _context21.n = 1;
              return this.service("eventService").cloneEvent(id, adminId);
            case 1:
              event = _context21.v;
              return _context21.a(2, this.created(res, {
                data: event,
                message: "Event duplicated successfully"
              }));
          }
        }, _callee21, this);
      }));
      function duplicate(_x43, _x44) {
        return _duplicate.apply(this, arguments);
      }
      return duplicate;
    }())
  }]);
}(_baseController["default"]); // Export both class and singleton instance
var _default = exports["default"] = new EventController();