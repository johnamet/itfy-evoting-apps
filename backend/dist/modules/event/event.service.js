"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.EventService = void 0;
var _baseService = _interopRequireDefault(require("../shared/base.service.js"));
var _eventRepository = _interopRequireDefault(require("./event.repository.js"));
var _categoryRepository = _interopRequireDefault(require("../category/category.repository.js"));
var _candidateRepository = _interopRequireDefault(require("../candidate/candidate.repository.js"));
var _formRepository = _interopRequireDefault(require("../form/form.repository.js"));
var _activityService = _interopRequireDefault(require("../activity/activity.service.js"));
var _notificationService = _interopRequireDefault(require("../../services/notification.service.js"));
var _agendaService = _interopRequireDefault(require("../../services/agenda.service.js"));
var _eventValidation = _interopRequireDefault(require("./event.validation.js"));
var _eventConstants = require("../../utils/constants/event.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
var _excluded = ["_id", "created_at", "updated_at", "deleted_at", "published_at", "current_attendees", "total_revenue", "__v"],
  _excluded2 = ["skip", "limit", "sort"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
 * Event Service
 * Business logic for event management
 */
// Set validation schemas for BaseService.validate()
_baseService["default"].setValidation(_eventValidation["default"]);
var EventService = exports.EventService = /*#__PURE__*/function (_BaseService) {
  function EventService() {
    var _this;
    var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, EventService);
    _this = _callSuper(this, EventService);
    _this.repository = dependencies.repository || _eventRepository["default"];
    _this.categoryRepository = dependencies.categoryRepository || _categoryRepository["default"];
    _this.candidateRepository = dependencies.candidateRepository || _candidateRepository["default"];
    _this.formRepository = dependencies.formRepository || _formRepository["default"];
    _this.activityService = dependencies.activityService || _activityService["default"];
    return _this;
  }

  // ==================== EVENT LIFECYCLE ====================

  /**
   * Create a new event
   * @param {Object} eventData - Event data
   * @param {string|mongoose.Types.ObjectId} adminId - Creating admin ID
   * @returns {Promise<Object>} - Created event
   */
  _inherits(EventService, _BaseService);
  return _createClass(EventService, [{
    key: "createEvent",
    value: function () {
      var _createEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(eventData, adminId) {
        var validatedData, now, startDate, event, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(eventData, _eventValidation["default"].createEventSchema); // Set created_by
              validatedData.created_by = adminId;

              // Set initial status based on dates
              now = new Date();
              startDate = new Date(validatedData.start_date);
              if (!validatedData.status) {
                validatedData.status = startDate > now ? _eventConstants.STATUS.UPCOMING : _eventConstants.STATUS.ACTIVE;
              }

              // Create event
              _context.n = 1;
              return this.repository.create(validatedData);
            case 1:
              event = _context.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_CREATED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: event._id,
                eventId: event._id,
                description: "Created event: ".concat(event.name),
                metadata: {
                  eventName: event.name
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context.a(2, event);
            case 2:
              _context.p = 2;
              _t = _context.v;
              throw new Error("Create event failed: ".concat(_t.message));
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function createEvent(_x, _x2) {
        return _createEvent.apply(this, arguments);
      }
      return createEvent;
    }()
    /**
     * Update an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} updateData - Update data
     * @param {string|mongoose.Types.ObjectId} adminId - Updating admin ID
     * @returns {Promise<Object>} - Updated event
     */
  }, {
    key: "updateEvent",
    value: (function () {
      var _updateEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(eventId, updateData, adminId) {
        var validatedData, event, updated, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              // Validate input data using BaseService.validate()
              validatedData = this.validate(updateData, _eventValidation["default"].updateEventSchema);
              _context2.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context2.v;
              if (event) {
                _context2.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context2.n = 3;
              return this.repository.updateById(eventId, validatedData);
            case 3:
              updated = _context2.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_UPDATED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Updated event: ".concat(updated.name),
                metadata: {
                  changes: Object.keys(updateData)
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context2.a(2, updated);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              throw new Error("Update event failed: ".concat(_t2.message));
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 4]]);
      }));
      function updateEvent(_x3, _x4, _x5) {
        return _updateEvent.apply(this, arguments);
      }
      return updateEvent;
    }()
    /**
     * Publish an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Published event
     */
    )
  }, {
    key: "publishEvent",
    value: (function () {
      var _publishEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(eventId, adminId) {
        var event, published, eventDate, oneDayBefore, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _context3.p = 0;
              _context3.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context3.v;
              if (event) {
                _context3.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!event.is_published) {
                _context3.n = 3;
                break;
              }
              throw new Error("Event is already published");
            case 3:
              if (!(!event.name || !event.description || !event.start_date || !event.end_date)) {
                _context3.n = 4;
                break;
              }
              throw new Error("Event must have name, description, and dates before publishing");
            case 4:
              _context3.n = 5;
              return this.repository.updateById(eventId, {
                is_published: true,
                published_at: new Date()
              });
            case 5:
              published = _context3.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_PUBLISHED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Published event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });

              // Schedule event reminder emails
              eventDate = new Date(event.end_date);
              oneDayBefore = new Date(eventDate);
              oneDayBefore.setDate(oneDayBefore.getDate() - 1);
              if (!(oneDayBefore > new Date())) {
                _context3.n = 6;
                break;
              }
              _context3.n = 6;
              return _agendaService["default"].schedule(oneDayBefore, "send-event-reminder-emails", {
                eventId: eventId.toString(),
                reminderType: "24_hours_left"
              });
            case 6:
              return _context3.a(2, published);
            case 7:
              _context3.p = 7;
              _t3 = _context3.v;
              throw new Error("Publish event failed: ".concat(_t3.message));
            case 8:
              return _context3.a(2);
          }
        }, _callee3, this, [[0, 7]]);
      }));
      function publishEvent(_x6, _x7) {
        return _publishEvent.apply(this, arguments);
      }
      return publishEvent;
    }()
    /**
     * Unpublish an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Unpublished event
     */
    )
  }, {
    key: "unpublishEvent",
    value: (function () {
      var _unpublishEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(eventId, adminId) {
        var event, unpublished, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              _context4.p = 0;
              _context4.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context4.v;
              if (event) {
                _context4.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context4.n = 3;
              return this.repository.updateById(eventId, {
                is_published: false
              });
            case 3:
              unpublished = _context4.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_UNPUBLISHED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Unpublished event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context4.a(2, unpublished);
            case 4:
              _context4.p = 4;
              _t4 = _context4.v;
              throw new Error("Unpublish event failed: ".concat(_t4.message));
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this, [[0, 4]]);
      }));
      function unpublishEvent(_x8, _x9) {
        return _unpublishEvent.apply(this, arguments);
      }
      return unpublishEvent;
    }()
    /**
     * Archive an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Archived event
     */
    )
  }, {
    key: "archiveEvent",
    value: (function () {
      var _archiveEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(eventId, adminId) {
        var event, archived, _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context5.v;
              if (event) {
                _context5.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!(event.status === _eventConstants.STATUS.ARCHIVED)) {
                _context5.n = 3;
                break;
              }
              throw new Error("Event is already archived");
            case 3:
              _context5.n = 4;
              return this.repository.updateById(eventId, {
                status: _eventConstants.STATUS.ARCHIVED,
                is_published: false
              });
            case 4:
              archived = _context5.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_ARCHIVED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Archived event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });

              // Schedule results publishing if not already published
              if (event.results_published) {
                _context5.n = 5;
                break;
              }
              _context5.n = 5;
              return _agendaService["default"].now("publish-event-results", {
                eventId: eventId.toString()
              });
            case 5:
              return _context5.a(2, archived);
            case 6:
              _context5.p = 6;
              _t5 = _context5.v;
              throw new Error("Archive event failed: ".concat(_t5.message));
            case 7:
              return _context5.a(2);
          }
        }, _callee5, this, [[0, 6]]);
      }));
      function archiveEvent(_x0, _x1) {
        return _archiveEvent.apply(this, arguments);
      }
      return archiveEvent;
    }()
    /**
     * Clone an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID to clone
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @param {Object} [overrides] - Data to override in cloned event
     * @returns {Promise<Object>} - Cloned event
     */
    )
  }, {
    key: "cloneEvent",
    value: (function () {
      var _cloneEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(eventId, adminId) {
        var overrides,
          originalEvent,
          _id,
          created_at,
          updated_at,
          deleted_at,
          published_at,
          current_attendees,
          total_revenue,
          __v,
          cloneData,
          newEventData,
          clonedEvent,
          _args6 = arguments,
          _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              overrides = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
              _context6.p = 1;
              _context6.n = 2;
              return this.repository.findById(eventId, {
                lean: true
              });
            case 2:
              originalEvent = _context6.v;
              if (originalEvent) {
                _context6.n = 3;
                break;
              }
              throw new Error("Event not found");
            case 3:
              // Remove fields that shouldn't be cloned
              _id = originalEvent._id, created_at = originalEvent.created_at, updated_at = originalEvent.updated_at, deleted_at = originalEvent.deleted_at, published_at = originalEvent.published_at, current_attendees = originalEvent.current_attendees, total_revenue = originalEvent.total_revenue, __v = originalEvent.__v, cloneData = _objectWithoutProperties(originalEvent, _excluded); // Apply overrides
              newEventData = _objectSpread(_objectSpread(_objectSpread({}, cloneData), overrides), {}, {
                name: overrides.name || "".concat(originalEvent.name, " (Copy)"),
                slug: overrides.slug || "".concat(originalEvent.slug, "-copy-").concat(Date.now()),
                is_published: false,
                status: _eventConstants.STATUS.DRAFT,
                created_by: adminId
              });
              _context6.n = 4;
              return this.repository.create(newEventData);
            case 4:
              clonedEvent = _context6.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_CREATED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: clonedEvent._id,
                eventId: clonedEvent._id,
                description: "Cloned event from: ".concat(originalEvent.name),
                metadata: {
                  originalEventId: eventId,
                  originalEventName: originalEvent.name
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context6.a(2, clonedEvent);
            case 5:
              _context6.p = 5;
              _t6 = _context6.v;
              throw new Error("Clone event failed: ".concat(_t6.message));
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this, [[1, 5]]);
      }));
      function cloneEvent(_x10, _x11) {
        return _cloneEvent.apply(this, arguments);
      }
      return cloneEvent;
    }() // ==================== VOTING MANAGEMENT ====================
    /**
     * Start voting for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated event
     */
    )
  }, {
    key: "startVoting",
    value: function () {
      var _startVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(eventId, adminId) {
        var event, now, votingStart, updated, _t7;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.p = 0;
              _context7.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context7.v;
              if (event) {
                _context7.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!event.voting_active) {
                _context7.n = 3;
                break;
              }
              throw new Error("Voting is already active");
            case 3:
              now = new Date();
              votingStart = event.voting_start || now;
              _context7.n = 4;
              return this.repository.updateById(eventId, {
                voting_active: true,
                voting_start: votingStart
              });
            case 4:
              updated = _context7.v;
              _context7.n = 5;
              return _notificationService["default"].notifyEventVotingStarted(eventId);
            case 5:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.VOTING_STARTED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Started voting for event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context7.a(2, updated);
            case 6:
              _context7.p = 6;
              _t7 = _context7.v;
              throw new Error("Start voting failed: ".concat(_t7.message));
            case 7:
              return _context7.a(2);
          }
        }, _callee7, this, [[0, 6]]);
      }));
      function startVoting(_x12, _x13) {
        return _startVoting.apply(this, arguments);
      }
      return startVoting;
    }()
    /**
     * Stop voting for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated event
     */
  }, {
    key: "stopVoting",
    value: (function () {
      var _stopVoting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(eventId, adminId) {
        var event, updated, _t8;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.p = _context8.n) {
            case 0:
              _context8.p = 0;
              _context8.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context8.v;
              if (event) {
                _context8.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (event.voting_active) {
                _context8.n = 3;
                break;
              }
              throw new Error("Voting is not active");
            case 3:
              _context8.n = 4;
              return this.repository.updateById(eventId, {
                voting_active: false,
                voting_end: new Date()
              });
            case 4:
              updated = _context8.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.VOTING_ENDED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Stopped voting for event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context8.a(2, updated);
            case 5:
              _context8.p = 5;
              _t8 = _context8.v;
              throw new Error("Stop voting failed: ".concat(_t8.message));
            case 6:
              return _context8.a(2);
          }
        }, _callee8, this, [[0, 5]]);
      }));
      function stopVoting(_x14, _x15) {
        return _stopVoting.apply(this, arguments);
      }
      return stopVoting;
    }()
    /**
     * Publish results for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated event
     */
    )
  }, {
    key: "publishResults",
    value: (function () {
      var _publishResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(eventId, adminId) {
        var event, updated, _t9;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.p = _context9.n) {
            case 0:
              _context9.p = 0;
              _context9.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context9.v;
              if (event) {
                _context9.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!event.results_published) {
                _context9.n = 3;
                break;
              }
              throw new Error("Results are already published");
            case 3:
              if (!event.voting_active) {
                _context9.n = 4;
                break;
              }
              throw new Error("Cannot publish results while voting is active. Stop voting first.");
            case 4:
              _context9.n = 5;
              return this.repository.updateById(eventId, {
                results_published: true,
                results_published_at: new Date()
              });
            case 5:
              updated = _context9.v;
              _context9.n = 6;
              return _notificationService["default"].notifyEventResultsPublished(eventId);
            case 6:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.RESULTS_PUBLISHED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Published results for event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context9.a(2, updated);
            case 7:
              _context9.p = 7;
              _t9 = _context9.v;
              throw new Error("Publish results failed: ".concat(_t9.message));
            case 8:
              return _context9.a(2);
          }
        }, _callee9, this, [[0, 7]]);
      }));
      function publishResults(_x16, _x17) {
        return _publishResults.apply(this, arguments);
      }
      return publishResults;
    }() // ==================== QUERY METHODS ====================
    /**
     * Get event by ID with full details
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Event
     */
    )
  }, {
    key: "getEventById",
    value: function () {
      var _getEventById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(eventId) {
        var options,
          _args0 = arguments,
          _t0;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.p = _context0.n) {
            case 0:
              options = _args0.length > 1 && _args0[1] !== undefined ? _args0[1] : {};
              _context0.p = 1;
              _context0.n = 2;
              return this.repository.findById(eventId, _objectSpread(_objectSpread({}, options), {}, {
                populate: [{
                  path: "created_by",
                  select: "first_name last_name email role"
                }, {
                  path: "registration_form",
                  select: "name form_type"
                }]
              }));
            case 2:
              return _context0.a(2, _context0.v);
            case 3:
              _context0.p = 3;
              _t0 = _context0.v;
              throw new Error("Get event by ID failed: ".concat(_t0.message));
            case 4:
              return _context0.a(2);
          }
        }, _callee0, this, [[1, 3]]);
      }));
      function getEventById(_x18) {
        return _getEventById.apply(this, arguments);
      }
      return getEventById;
    }()
    /**
     * Get event by slug
     * @param {string} slug - Event slug
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Event
     */
  }, {
    key: "getEventBySlug",
    value: (function () {
      var _getEventBySlug = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(slug) {
        var options,
          _args1 = arguments,
          _t1;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.p = _context1.n) {
            case 0:
              options = _args1.length > 1 && _args1[1] !== undefined ? _args1[1] : {};
              _context1.p = 1;
              _context1.n = 2;
              return this.repository.findOne({
                slug: slug
              }, _objectSpread(_objectSpread({}, options), {}, {
                populate: [{
                  path: "created_by",
                  select: "first_name last_name email role"
                }, {
                  path: "registration_form",
                  select: "name form_type"
                }]
              }));
            case 2:
              return _context1.a(2, _context1.v);
            case 3:
              _context1.p = 3;
              _t1 = _context1.v;
              throw new Error("Get event by slug failed: ".concat(_t1.message));
            case 4:
              return _context1.a(2);
          }
        }, _callee1, this, [[1, 3]]);
      }));
      function getEventBySlug(_x19) {
        return _getEventBySlug.apply(this, arguments);
      }
      return getEventBySlug;
    }()
    /**
     * Get upcoming events
     * @param {number} [limit=10] - Max events to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Upcoming events
     */
    )
  }, {
    key: "getUpcomingEvents",
    value: (function () {
      var _getUpcomingEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
        var limit,
          options,
          _args10 = arguments,
          _t10;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              limit = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : 10;
              options = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
              _context10.p = 1;
              _context10.n = 2;
              return this.repository.findUpcoming(limit, options);
            case 2:
              return _context10.a(2, _context10.v);
            case 3:
              _context10.p = 3;
              _t10 = _context10.v;
              throw new Error("Get upcoming events failed: ".concat(_t10.message));
            case 4:
              return _context10.a(2);
          }
        }, _callee10, this, [[1, 3]]);
      }));
      function getUpcomingEvents() {
        return _getUpcomingEvents.apply(this, arguments);
      }
      return getUpcomingEvents;
    }()
    /**
     * Get active/ongoing events
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Active events
     */
    )
  }, {
    key: "getActiveEvents",
    value: (function () {
      var _getActiveEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var options,
          _args11 = arguments,
          _t11;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.p = _context11.n) {
            case 0:
              options = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : {};
              _context11.p = 1;
              _context11.n = 2;
              return this.repository.findActive(options);
            case 2:
              return _context11.a(2, _context11.v);
            case 3:
              _context11.p = 3;
              _t11 = _context11.v;
              throw new Error("Get active events failed: ".concat(_t11.message));
            case 4:
              return _context11.a(2);
          }
        }, _callee11, this, [[1, 3]]);
      }));
      function getActiveEvents() {
        return _getActiveEvents.apply(this, arguments);
      }
      return getActiveEvents;
    }()
    /**
     * Get featured events
     * @param {number} [limit=5] - Max events to return
     * @param {Object} [options] - Query options
     * @returns {Promise<Array>} - Featured events
     */
    )
  }, {
    key: "getFeaturedEvents",
    value: (function () {
      var _getFeaturedEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
        var limit,
          options,
          _args12 = arguments,
          _t12;
        return _regenerator().w(function (_context12) {
          while (1) switch (_context12.p = _context12.n) {
            case 0:
              limit = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : 5;
              options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
              _context12.p = 1;
              _context12.n = 2;
              return this.repository.findFeatured(limit, options);
            case 2:
              return _context12.a(2, _context12.v);
            case 3:
              _context12.p = 3;
              _t12 = _context12.v;
              throw new Error("Get featured events failed: ".concat(_t12.message));
            case 4:
              return _context12.a(2);
          }
        }, _callee12, this, [[1, 3]]);
      }));
      function getFeaturedEvents() {
        return _getFeaturedEvents.apply(this, arguments);
      }
      return getFeaturedEvents;
    }()
    /**
     * Search events
     * @param {string} query - Search query
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Items per page
     * @param {Object} [options] - Query options
     * @returns {Promise<Object>} - Paginated results
     */
    )
  }, {
    key: "searchEvents",
    value: (function () {
      var _searchEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(query) {
        var page,
          limit,
          options,
          _args13 = arguments,
          _t13;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.p = _context13.n) {
            case 0:
              page = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : 1;
              limit = _args13.length > 2 && _args13[2] !== undefined ? _args13[2] : 10;
              options = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : {};
              _context13.p = 1;
              _context13.n = 2;
              return this.repository.search(query, page, limit, options);
            case 2:
              return _context13.a(2, _context13.v);
            case 3:
              _context13.p = 3;
              _t13 = _context13.v;
              throw new Error("Search events failed: ".concat(_t13.message));
            case 4:
              return _context13.a(2);
          }
        }, _callee13, this, [[1, 3]]);
      }));
      function searchEvents(_x20) {
        return _searchEvents.apply(this, arguments);
      }
      return searchEvents;
    }() // ==================== REGISTRATION MANAGEMENT ====================
    /**
     * Check if event registration is open
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<boolean>} - True if registration is open
     */
    )
  }, {
    key: "isRegistrationOpen",
    value: function () {
      var _isRegistrationOpen = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(eventId) {
        var event, now, registrationStart, registrationEnd, _t14;
        return _regenerator().w(function (_context14) {
          while (1) switch (_context14.p = _context14.n) {
            case 0:
              _context14.p = 0;
              _context14.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context14.v;
              if (event) {
                _context14.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              now = new Date();
              registrationStart = event.registration_start || event.start_date;
              registrationEnd = event.registration_end || event.end_date;
              return _context14.a(2, event.is_published && event.registration_enabled && now >= new Date(registrationStart) && now <= new Date(registrationEnd) && event.current_attendees < event.max_attendees);
            case 3:
              _context14.p = 3;
              _t14 = _context14.v;
              throw new Error("Check registration open failed: ".concat(_t14.message));
            case 4:
              return _context14.a(2);
          }
        }, _callee14, this, [[0, 3]]);
      }));
      function isRegistrationOpen(_x21) {
        return _isRegistrationOpen.apply(this, arguments);
      }
      return isRegistrationOpen;
    }()
    /**
     * Check if event voting is active
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<boolean>} - True if voting is active
     */
  }, {
    key: "isVotingActive",
    value: (function () {
      var _isVotingActive = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(eventId) {
        var event, now, votingStart, votingEnd, _t15;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.p = _context15.n) {
            case 0:
              _context15.p = 0;
              _context15.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context15.v;
              if (event) {
                _context15.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (event.voting_active) {
                _context15.n = 3;
                break;
              }
              return _context15.a(2, false);
            case 3:
              now = new Date();
              votingStart = event.voting_start;
              votingEnd = event.voting_end;
              if (!(votingStart && now < new Date(votingStart))) {
                _context15.n = 4;
                break;
              }
              return _context15.a(2, false);
            case 4:
              if (!(votingEnd && now > new Date(votingEnd))) {
                _context15.n = 5;
                break;
              }
              return _context15.a(2, false);
            case 5:
              return _context15.a(2, true);
            case 6:
              _context15.p = 6;
              _t15 = _context15.v;
              throw new Error("Check voting active failed: ".concat(_t15.message));
            case 7:
              return _context15.a(2);
          }
        }, _callee15, this, [[0, 6]]);
      }));
      function isVotingActive(_x22) {
        return _isVotingActive.apply(this, arguments);
      }
      return isVotingActive;
    }()
    /**
     * Get event statistics
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Event statistics
     */
    )
  }, {
    key: "getEventStatistics",
    value: (function () {
      var _getEventStatistics = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(eventId) {
        var event, categoryCount, formsCount, _t16;
        return _regenerator().w(function (_context16) {
          while (1) switch (_context16.p = _context16.n) {
            case 0:
              _context16.p = 0;
              _context16.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context16.v;
              if (event) {
                _context16.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context16.n = 3;
              return this.categoryRepository.count({
                event: eventId
              });
            case 3:
              categoryCount = _context16.v;
              _context16.n = 4;
              return this.formRepository.count({
                event: eventId
              });
            case 4:
              formsCount = _context16.v;
              return _context16.a(2, {
                eventId: event._id,
                eventName: event.name,
                status: event.status,
                isPublished: event.is_published,
                votingActive: event.voting_active,
                resultsPublished: event.results_published,
                categories: categoryCount,
                forms: formsCount,
                currentAttendees: event.current_attendees || 0,
                maxAttendees: event.max_attendees || 0,
                totalRevenue: event.total_revenue || 0,
                startDate: event.start_date,
                endDate: event.end_date,
                votingStart: event.voting_start,
                votingEnd: event.voting_end
              });
            case 5:
              _context16.p = 5;
              _t16 = _context16.v;
              throw new Error("Get event statistics failed: ".concat(_t16.message));
            case 6:
              return _context16.a(2);
          }
        }, _callee16, this, [[0, 5]]);
      }));
      function getEventStatistics(_x23) {
        return _getEventStatistics.apply(this, arguments);
      }
      return getEventStatistics;
    }() // ==================== QUERY PROXY METHODS ====================
    /**
     * List events with filters and options
     * @param {Object} filters - Query filters
     * @param {Object} options - Query options (skip, limit, sort, etc.)
     * @returns {Promise<Array>} - List of events
     */
    )
  }, {
    key: "listEvents",
    value: function () {
      var _listEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
        var filters,
          options,
          _options$skip,
          skip,
          _options$limit,
          limit,
          _options$sort,
          sort,
          queryOptions,
          page,
          result,
          _args17 = arguments,
          _t17;
        return _regenerator().w(function (_context17) {
          while (1) switch (_context17.p = _context17.n) {
            case 0:
              filters = _args17.length > 0 && _args17[0] !== undefined ? _args17[0] : {};
              options = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : {};
              _context17.p = 1;
              _options$skip = options.skip, skip = _options$skip === void 0 ? 0 : _options$skip, _options$limit = options.limit, limit = _options$limit === void 0 ? 10 : _options$limit, _options$sort = options.sort, sort = _options$sort === void 0 ? '-created_at' : _options$sort, queryOptions = _objectWithoutProperties(options, _excluded2);
              page = Math.floor(skip / limit) + 1;
              _context17.n = 2;
              return this.repository.findAll(filters, page, limit, _objectSpread({
                sort: sort
              }, queryOptions));
            case 2:
              result = _context17.v;
              return _context17.a(2, result.data);
            case 3:
              _context17.p = 3;
              _t17 = _context17.v;
              throw new Error("List events failed: ".concat(_t17.message));
            case 4:
              return _context17.a(2);
          }
        }, _callee17, this, [[1, 3]]);
      }));
      function listEvents() {
        return _listEvents.apply(this, arguments);
      }
      return listEvents;
    }()
    /**
     * Count events matching filters
     * @param {Object} filters - Query filters
     * @returns {Promise<number>} - Count of events
     */
  }, {
    key: "countEvents",
    value: (function () {
      var _countEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
        var filters,
          _args18 = arguments,
          _t18;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.p = _context18.n) {
            case 0:
              filters = _args18.length > 0 && _args18[0] !== undefined ? _args18[0] : {};
              _context18.p = 1;
              _context18.n = 2;
              return this.repository.count(filters);
            case 2:
              return _context18.a(2, _context18.v);
            case 3:
              _context18.p = 3;
              _t18 = _context18.v;
              throw new Error("Count events failed: ".concat(_t18.message));
            case 4:
              return _context18.a(2);
          }
        }, _callee18, this, [[1, 3]]);
      }));
      function countEvents() {
        return _countEvents.apply(this, arguments);
      }
      return countEvents;
    }()
    /**
     * Delete an event (soft delete)
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Deleted event
     */
    )
  }, {
    key: "deleteEvent",
    value: (function () {
      var _deleteEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(eventId, adminId) {
        var event, _t19;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.p = _context19.n) {
            case 0:
              _context19.p = 0;
              _context19.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context19.v;
              if (event) {
                _context19.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context19.n = 3;
              return this.repository["delete"](eventId);
            case 3:
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_DELETED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Deleted event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context19.a(2, event);
            case 4:
              _context19.p = 4;
              _t19 = _context19.v;
              throw new Error("Delete event failed: ".concat(_t19.message));
            case 5:
              return _context19.a(2);
          }
        }, _callee19, this, [[0, 4]]);
      }));
      function deleteEvent(_x24, _x25) {
        return _deleteEvent.apply(this, arguments);
      }
      return deleteEvent;
    }()
    /**
     * Update event status
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} status - New status
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated event
     */
    )
  }, {
    key: "updateEventStatus",
    value: (function () {
      var _updateEventStatus = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(eventId, status, adminId) {
        var event, updated, _t20;
        return _regenerator().w(function (_context20) {
          while (1) switch (_context20.p = _context20.n) {
            case 0:
              _context20.p = 0;
              _context20.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context20.v;
              if (event) {
                _context20.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context20.n = 3;
              return this.repository.updateStatus(eventId, status);
            case 3:
              updated = _context20.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_UPDATED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Updated event status to: ".concat(status),
                metadata: {
                  previousStatus: event.status,
                  newStatus: status
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context20.a(2, updated);
            case 4:
              _context20.p = 4;
              _t20 = _context20.v;
              throw new Error("Update event status failed: ".concat(_t20.message));
            case 5:
              return _context20.a(2);
          }
        }, _callee20, this, [[0, 4]]);
      }));
      function updateEventStatus(_x26, _x27, _x28) {
        return _updateEventStatus.apply(this, arguments);
      }
      return updateEventStatus;
    }()
    /**
     * Cancel an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string} reason - Cancellation reason
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Cancelled event
     */
    )
  }, {
    key: "cancelEvent",
    value: (function () {
      var _cancelEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(eventId, reason, adminId) {
        var event, cancelled, _t21;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.p = _context21.n) {
            case 0:
              _context21.p = 0;
              _context21.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context21.v;
              if (event) {
                _context21.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!(event.status === _eventConstants.STATUS.CANCELLED)) {
                _context21.n = 3;
                break;
              }
              throw new Error("Event is already cancelled");
            case 3:
              _context21.n = 4;
              return this.repository.updateById(eventId, {
                status: _eventConstants.STATUS.CANCELLED,
                is_published: false,
                cancellation_reason: reason,
                cancelled_at: new Date()
              });
            case 4:
              cancelled = _context21.v;
              // Notify participants about cancellation
              _notificationService["default"].notifyEventCancelled(eventId, reason)["catch"](function (err) {
                return console.error("Notification error:", err);
              });

              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_CANCELLED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Cancelled event: ".concat(event.name),
                metadata: {
                  reason: reason
                }
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context21.a(2, cancelled);
            case 5:
              _context21.p = 5;
              _t21 = _context21.v;
              throw new Error("Cancel event failed: ".concat(_t21.message));
            case 6:
              return _context21.a(2);
          }
        }, _callee21, this, [[0, 5]]);
      }));
      function cancelEvent(_x29, _x30, _x31) {
        return _cancelEvent.apply(this, arguments);
      }
      return cancelEvent;
    }()
    /**
     * Complete an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Completed event
     */
    )
  }, {
    key: "completeEvent",
    value: (function () {
      var _completeEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(eventId, adminId) {
        var event, completed, _t22;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.p = _context22.n) {
            case 0:
              _context22.p = 0;
              _context22.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context22.v;
              if (event) {
                _context22.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              if (!(event.status === _eventConstants.STATUS.COMPLETED)) {
                _context22.n = 3;
                break;
              }
              throw new Error("Event is already completed");
            case 3:
              _context22.n = 4;
              return this.repository.updateById(eventId, {
                status: _eventConstants.STATUS.COMPLETED,
                voting_active: false,
                completed_at: new Date()
              });
            case 4:
              completed = _context22.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: _activityConstants.ACTION_TYPE.EVENT_COMPLETED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: "Completed event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context22.a(2, completed);
            case 5:
              _context22.p = 5;
              _t22 = _context22.v;
              throw new Error("Complete event failed: ".concat(_t22.message));
            case 6:
              return _context22.a(2);
          }
        }, _callee22, this, [[0, 5]]);
      }));
      function completeEvent(_x32, _x33) {
        return _completeEvent.apply(this, arguments);
      }
      return completeEvent;
    }()
    /**
     * Toggle featured status for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
     * @returns {Promise<Object>} - Updated event
     */
    )
  }, {
    key: "toggleFeatured",
    value: (function () {
      var _toggleFeatured = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(eventId, adminId) {
        var event, updated, _t23;
        return _regenerator().w(function (_context23) {
          while (1) switch (_context23.p = _context23.n) {
            case 0:
              _context23.p = 0;
              _context23.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context23.v;
              if (event) {
                _context23.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context23.n = 3;
              return this.repository.toggleFeatured(eventId);
            case 3:
              updated = _context23.v;
              // Log activity (fire-and-forget)
              this.activityService.log({
                userId: adminId,
                action: updated.is_featured ? _activityConstants.ACTION_TYPE.EVENT_FEATURED : _activityConstants.ACTION_TYPE.EVENT_UNFEATURED,
                entityType: _activityConstants.ENTITY_TYPE.EVENT,
                entityId: eventId,
                eventId: eventId,
                description: updated.is_featured ? "Featured event: ".concat(event.name) : "Unfeatured event: ".concat(event.name)
              })["catch"](function (err) {
                return console.error("Activity log error:", err);
              });
              return _context23.a(2, updated);
            case 4:
              _context23.p = 4;
              _t23 = _context23.v;
              throw new Error("Toggle featured failed: ".concat(_t23.message));
            case 5:
              return _context23.a(2);
          }
        }, _callee23, this, [[0, 4]]);
      }));
      function toggleFeatured(_x34, _x35) {
        return _toggleFeatured.apply(this, arguments);
      }
      return toggleFeatured;
    }()
    /**
     * Count upcoming events
     * @returns {Promise<number>} - Count of upcoming events
     */
    )
  }, {
    key: "countUpcomingEvents",
    value: (function () {
      var _countUpcomingEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24() {
        var now, _t24;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.p = _context24.n) {
            case 0:
              _context24.p = 0;
              now = new Date();
              _context24.n = 1;
              return this.repository.count({
                start_date: {
                  $gt: now
                },
                is_published: true,
                status: _eventConstants.STATUS.UPCOMING
              });
            case 1:
              return _context24.a(2, _context24.v);
            case 2:
              _context24.p = 2;
              _t24 = _context24.v;
              throw new Error("Count upcoming events failed: ".concat(_t24.message));
            case 3:
              return _context24.a(2);
          }
        }, _callee24, this, [[0, 2]]);
      }));
      function countUpcomingEvents() {
        return _countUpcomingEvents.apply(this, arguments);
      }
      return countUpcomingEvents;
    }()
    /**
     * Get categories for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Array>} - List of categories
     */
    )
  }, {
    key: "getEventCategories",
    value: (function () {
      var _getEventCategories = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(eventId) {
        var event, result, _t25;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              _context25.p = 0;
              _context25.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context25.v;
              if (event) {
                _context25.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context25.n = 3;
              return this.categoryRepository.findAll({
                event: eventId
              }, 1, 100, {
                lean: true
              });
            case 3:
              result = _context25.v;
              return _context25.a(2, result.data);
            case 4:
              _context25.p = 4;
              _t25 = _context25.v;
              throw new Error("Get event categories failed: ".concat(_t25.message));
            case 5:
              return _context25.a(2);
          }
        }, _callee25, this, [[0, 4]]);
      }));
      function getEventCategories(_x36) {
        return _getEventCategories.apply(this, arguments);
      }
      return getEventCategories;
    }()
    /**
     * Get candidates for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} filters - Additional filters
     * @param {Object} options - Query options
     * @returns {Promise<Array>} - List of candidates
     */
    )
  }, {
    key: "getEventCandidates",
    value: (function () {
      var _getEventCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(eventId) {
        var filters,
          options,
          event,
          _options$skip2,
          skip,
          _options$limit2,
          limit,
          page,
          result,
          _args26 = arguments,
          _t26;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.p = _context26.n) {
            case 0:
              filters = _args26.length > 1 && _args26[1] !== undefined ? _args26[1] : {};
              options = _args26.length > 2 && _args26[2] !== undefined ? _args26[2] : {};
              _context26.p = 1;
              _context26.n = 2;
              return this.repository.findById(eventId);
            case 2:
              event = _context26.v;
              if (event) {
                _context26.n = 3;
                break;
              }
              throw new Error("Event not found");
            case 3:
              _options$skip2 = options.skip, skip = _options$skip2 === void 0 ? 0 : _options$skip2, _options$limit2 = options.limit, limit = _options$limit2 === void 0 ? 10 : _options$limit2;
              page = Math.floor(skip / limit) + 1;
              _context26.n = 4;
              return this.candidateRepository.findAll(_objectSpread({
                event: eventId
              }, filters), page, limit, {
                lean: true
              });
            case 4:
              result = _context26.v;
              return _context26.a(2, result.data);
            case 5:
              _context26.p = 5;
              _t26 = _context26.v;
              throw new Error("Get event candidates failed: ".concat(_t26.message));
            case 6:
              return _context26.a(2);
          }
        }, _callee26, this, [[1, 5]]);
      }));
      function getEventCandidates(_x37) {
        return _getEventCandidates.apply(this, arguments);
      }
      return getEventCandidates;
    }()
    /**
     * Count candidates for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @param {Object} filters - Additional filters
     * @returns {Promise<number>} - Count of candidates
     */
    )
  }, {
    key: "countEventCandidates",
    value: (function () {
      var _countEventCandidates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(eventId) {
        var filters,
          _args27 = arguments,
          _t27;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.p = _context27.n) {
            case 0:
              filters = _args27.length > 1 && _args27[1] !== undefined ? _args27[1] : {};
              _context27.p = 1;
              _context27.n = 2;
              return this.candidateRepository.count(_objectSpread({
                event: eventId
              }, filters));
            case 2:
              return _context27.a(2, _context27.v);
            case 3:
              _context27.p = 3;
              _t27 = _context27.v;
              throw new Error("Count event candidates failed: ".concat(_t27.message));
            case 4:
              return _context27.a(2);
          }
        }, _callee27, this, [[1, 3]]);
      }));
      function countEventCandidates(_x38) {
        return _countEventCandidates.apply(this, arguments);
      }
      return countEventCandidates;
    }()
    /**
     * Get vote summary for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Vote summary
     */
    )
  }, {
    key: "getEventVoteSummary",
    value: (function () {
      var _getEventVoteSummary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(eventId) {
        var event, candidates, totalVotes, _t28;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.p = _context28.n) {
            case 0:
              _context28.p = 0;
              _context28.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context28.v;
              if (event) {
                _context28.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context28.n = 3;
              return this.candidateRepository.findAll({
                event: eventId
              }, 1, 100, {
                lean: true,
                sort: {
                  vote_count: -1
                }
              });
            case 3:
              candidates = _context28.v;
              totalVotes = candidates.data.reduce(function (sum, c) {
                return sum + (c.vote_count || 0);
              }, 0);
              return _context28.a(2, {
                eventId: event._id,
                eventName: event.name,
                totalVotes: totalVotes,
                votingActive: event.voting_active,
                resultsPublished: event.results_published,
                candidates: candidates.data.map(function (c) {
                  return {
                    candidateId: c._id,
                    name: c.name,
                    voteCount: c.vote_count || 0,
                    percentage: totalVotes > 0 ? ((c.vote_count || 0) / totalVotes * 100).toFixed(2) : 0
                  };
                })
              });
            case 4:
              _context28.p = 4;
              _t28 = _context28.v;
              throw new Error("Get event vote summary failed: ".concat(_t28.message));
            case 5:
              return _context28.a(2);
          }
        }, _callee28, this, [[0, 4]]);
      }));
      function getEventVoteSummary(_x39) {
        return _getEventVoteSummary.apply(this, arguments);
      }
      return getEventVoteSummary;
    }()
    /**
     * Get results for an event
     * @param {string|mongoose.Types.ObjectId} eventId - Event ID
     * @returns {Promise<Object>} - Event results
     */
    )
  }, {
    key: "getEventResults",
    value: (function () {
      var _getEventResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(eventId) {
        var _this2 = this;
        var event, categoriesResult, results, _t29;
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.p = _context30.n) {
            case 0:
              _context30.p = 0;
              _context30.n = 1;
              return this.repository.findById(eventId);
            case 1:
              event = _context30.v;
              if (event) {
                _context30.n = 2;
                break;
              }
              throw new Error("Event not found");
            case 2:
              _context30.n = 3;
              return this.categoryRepository.findAll({
                event: eventId
              }, 1, 100, {
                lean: true
              });
            case 3:
              categoriesResult = _context30.v;
              _context30.n = 4;
              return Promise.all(categoriesResult.data.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(category) {
                  var candidatesResult;
                  return _regenerator().w(function (_context29) {
                    while (1) switch (_context29.n) {
                      case 0:
                        _context29.n = 1;
                        return _this2.candidateRepository.findAll({
                          event: eventId,
                          category: category._id
                        }, 1, 100, {
                          lean: true,
                          sort: {
                            vote_count: -1
                          }
                        });
                      case 1:
                        candidatesResult = _context29.v;
                        return _context29.a(2, {
                          category: {
                            id: category._id,
                            name: category.name
                          },
                          candidates: candidatesResult.data.map(function (c) {
                            return {
                              id: c._id,
                              name: c.name,
                              voteCount: c.vote_count || 0,
                              position: c.position
                            };
                          }),
                          winner: candidatesResult.data[0] || null
                        });
                    }
                  }, _callee29);
                }));
                return function (_x41) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 4:
              results = _context30.v;
              return _context30.a(2, {
                eventId: event._id,
                eventName: event.name,
                status: event.status,
                resultsPublished: event.results_published,
                resultsPublishedAt: event.results_published_at,
                categories: results
              });
            case 5:
              _context30.p = 5;
              _t29 = _context30.v;
              throw new Error("Get event results failed: ".concat(_t29.message));
            case 6:
              return _context30.a(2);
          }
        }, _callee30, this, [[0, 5]]);
      }));
      function getEventResults(_x40) {
        return _getEventResults.apply(this, arguments);
      }
      return getEventResults;
    }())
  }]);
}(_baseService["default"]); // Export both for testability (class) and convenience (singleton instance)
var _default = exports["default"] = new EventService();