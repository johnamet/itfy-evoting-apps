"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventCommands = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Event Commands
 * Handles event-related operations
 */
var EventCommands = exports.EventCommands = /*#__PURE__*/function () {
  function EventCommands(router) {
    _classCallCheck(this, EventCommands);
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
  }

  /**
   * Get Event model
   */
  return _createClass(EventCommands, [{
    key: "getEventModel",
    value: (function () {
      var _getEventModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var eventSchema;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.ensureConnection();
            case 1:
              if (!_mongoose["default"].models.Event) {
                _context.n = 2;
                break;
              }
              return _context.a(2, _mongoose["default"].models.Event);
            case 2:
              eventSchema = new _mongoose["default"].Schema({
                name: {
                  type: String,
                  required: true
                },
                slug: {
                  type: String
                },
                description: {
                  type: String
                },
                status: {
                  type: String,
                  "default": 'draft'
                },
                start_date: {
                  type: Date
                },
                end_date: {
                  type: Date
                },
                voting_start: {
                  type: Date
                },
                voting_end: {
                  type: Date
                },
                banner_url: {
                  type: String
                },
                logo_url: {
                  type: String
                },
                venue: {
                  type: String
                },
                organiser: {
                  type: _mongoose["default"].Schema.Types.ObjectId,
                  ref: 'User'
                },
                is_featured: {
                  type: Boolean,
                  "default": false
                },
                is_public: {
                  type: Boolean,
                  "default": true
                }
              }, {
                timestamps: true
              });
              return _context.a(2, _mongoose["default"].model('Event', eventSchema));
          }
        }, _callee, this);
      }));
      function getEventModel() {
        return _getEventModel.apply(this, arguments);
      }
      return getEventModel;
    }()
    /**
     * Get Category model
     */
    )
  }, {
    key: "getCategoryModel",
    value: (function () {
      var _getCategoryModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var categorySchema;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.ensureConnection();
            case 1:
              if (!_mongoose["default"].models.Category) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, _mongoose["default"].models.Category);
            case 2:
              categorySchema = new _mongoose["default"].Schema({
                name: {
                  type: String,
                  required: true
                },
                description: {
                  type: String
                },
                event: {
                  type: _mongoose["default"].Schema.Types.ObjectId,
                  ref: 'Event'
                },
                status: {
                  type: String,
                  "default": 'active'
                },
                max_votes_per_voter: {
                  type: Number,
                  "default": 1
                }
              }, {
                timestamps: true
              });
              return _context2.a(2, _mongoose["default"].model('Category', categorySchema));
          }
        }, _callee2, this);
      }));
      function getCategoryModel() {
        return _getCategoryModel.apply(this, arguments);
      }
      return getCategoryModel;
    }()
    /**
     * List events
     */
    )
  }, {
    key: "listEvents",
    value: (function () {
      var _listEvents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(args) {
        var options, spinner, Event, query, limit, page, skip, _yield$Promise$all, _yield$Promise$all2, events, total, headers, rows, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              options = this.parseArgs(args);
              spinner = this.ui.spinner('Fetching events...');
              _context3.p = 1;
              _context3.n = 2;
              return this.getEventModel();
            case 2:
              Event = _context3.v;
              query = {};
              if (options.status) {
                query.status = options.status;
              }
              limit = parseInt(options.limit) || 20;
              page = parseInt(options.page) || 1;
              skip = (page - 1) * limit;
              _context3.n = 3;
              return Promise.all([Event.find(query).select('name status start_date end_date voting_start voting_end is_featured createdAt').sort({
                createdAt: -1
              }).skip(skip).limit(limit).lean(), Event.countDocuments(query)]);
            case 3:
              _yield$Promise$all = _context3.v;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              events = _yield$Promise$all2[0];
              total = _yield$Promise$all2[1];
              spinner.stop();
              if (!(events.length === 0)) {
                _context3.n = 4;
                break;
              }
              this.ui.info('No events found');
              return _context3.a(2);
            case 4:
              this.ui.header("Events (".concat(page, "/").concat(Math.ceil(total / limit), " - ").concat(total, " total)"), 'calendar');
              headers = ['Name', 'Status', 'Start Date', 'End Date', 'Featured'];
              rows = events.map(function (event) {
                return [event.name.substring(0, 30), event.status, event.start_date ? new Date(event.start_date).toLocaleDateString() : 'N/A', event.end_date ? new Date(event.end_date).toLocaleDateString() : 'N/A', event.is_featured ? 'Yes' : 'No'];
              });
              this.ui.table(headers, rows);
              this.ui.newLine();
              this.ui.info("Showing ".concat(events.length, " of ").concat(total, " events"));
              _context3.n = 6;
              break;
            case 5:
              _context3.p = 5;
              _t = _context3.v;
              spinner.stop();
              this.ui.error("Failed to list events: ".concat(_t.message));
            case 6:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 5]]);
      }));
      function listEvents(_x) {
        return _listEvents.apply(this, arguments);
      }
      return listEvents;
    }()
    /**
     * View event details
     */
    )
  }, {
    key: "viewEvent",
    value: (function () {
      var _viewEvent = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(identifier) {
        var spinner, Event, Category, query, event, categoryCount, voteCount, Vote, _t2, _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              if (identifier) {
                _context4.n = 1;
                break;
              }
              this.ui.error('Please provide an event ID or slug');
              this.ui.info('Usage: event:view <id|slug>');
              return _context4.a(2);
            case 1:
              spinner = this.ui.spinner('Fetching event...');
              _context4.p = 2;
              _context4.n = 3;
              return this.getEventModel();
            case 3:
              Event = _context4.v;
              _context4.n = 4;
              return this.getCategoryModel();
            case 4:
              Category = _context4.v;
              query = _mongoose["default"].Types.ObjectId.isValid(identifier) ? {
                _id: identifier
              } : {
                slug: identifier
              };
              _context4.n = 5;
              return Event.findOne(query).populate('organiser', 'name email').lean();
            case 5:
              event = _context4.v;
              if (event) {
                _context4.n = 6;
                break;
              }
              spinner.stop();
              this.ui.error('Event not found');
              return _context4.a(2);
            case 6:
              _context4.n = 7;
              return Category.countDocuments({
                event: event._id
              });
            case 7:
              categoryCount = _context4.v;
              // Get vote count (if Vote model exists)
              voteCount = 0;
              _context4.p = 8;
              if (!_mongoose["default"].models.Vote) {
                _context4.n = 10;
                break;
              }
              Vote = _mongoose["default"].models.Vote;
              _context4.n = 9;
              return Vote.countDocuments({
                event: event._id
              });
            case 9:
              voteCount = _context4.v;
            case 10:
              _context4.n = 12;
              break;
            case 11:
              _context4.p = 11;
              _t2 = _context4.v;
            case 12:
              spinner.stop();
              this.ui.header('Event Details', 'calendar');
              this.ui.keyValue('ID', event._id.toString(), 20);
              this.ui.keyValue('Name', event.name, 20);
              this.ui.keyValue('Slug', event.slug || 'N/A', 20);
              this.ui.keyValue('Status', event.status, 20);
              this.ui.keyValue('Featured', event.is_featured ? 'Yes' : 'No', 20);
              this.ui.keyValue('Public', event.is_public !== false ? 'Yes' : 'No', 20);
              this.ui.newLine();
              this.ui.subheader('Dates');
              this.ui.keyValue('Event Start', event.start_date ? new Date(event.start_date).toLocaleString() : 'Not set', 20);
              this.ui.keyValue('Event End', event.end_date ? new Date(event.end_date).toLocaleString() : 'Not set', 20);
              this.ui.keyValue('Voting Start', event.voting_start ? new Date(event.voting_start).toLocaleString() : 'Not set', 20);
              this.ui.keyValue('Voting End', event.voting_end ? new Date(event.voting_end).toLocaleString() : 'Not set', 20);
              this.ui.newLine();
              this.ui.subheader('Statistics');
              this.ui.keyValue('Categories', categoryCount.toString(), 20);
              this.ui.keyValue('Total Votes', voteCount.toString(), 20);
              this.ui.newLine();
              if (event.organiser) {
                this.ui.subheader('Organiser');
                this.ui.keyValue('Name', event.organiser.name, 20);
                this.ui.keyValue('Email', event.organiser.email, 20);
              }
              if (event.description) {
                this.ui.newLine();
                this.ui.subheader('Description');
                this.ui.print(event.description, 'dim');
              }
              _context4.n = 14;
              break;
            case 13:
              _context4.p = 13;
              _t3 = _context4.v;
              spinner.stop();
              this.ui.error("Failed to fetch event: ".concat(_t3.message));
            case 14:
              return _context4.a(2);
          }
        }, _callee4, this, [[8, 11], [2, 13]]);
      }));
      function viewEvent(_x2) {
        return _viewEvent.apply(this, arguments);
      }
      return viewEvent;
    }()
    /**
     * Show event statistics
     */
    )
  }, {
    key: "stats",
    value: (function () {
      var _stats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var spinner, Event, _yield$Promise$all3, _yield$Promise$all4, totalEvents, activeEvents, draftEvents, completedEvents, featuredEvents, now, votingInProgress, recentEvents, _iterator, _step, event, date, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              spinner = this.ui.spinner('Calculating statistics...');
              _context5.p = 1;
              _context5.n = 2;
              return this.getEventModel();
            case 2:
              Event = _context5.v;
              _context5.n = 3;
              return Promise.all([Event.countDocuments(), Event.countDocuments({
                status: 'active'
              }), Event.countDocuments({
                status: 'draft'
              }), Event.countDocuments({
                status: 'completed'
              }), Event.countDocuments({
                is_featured: true
              })]);
            case 3:
              _yield$Promise$all3 = _context5.v;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 5);
              totalEvents = _yield$Promise$all4[0];
              activeEvents = _yield$Promise$all4[1];
              draftEvents = _yield$Promise$all4[2];
              completedEvents = _yield$Promise$all4[3];
              featuredEvents = _yield$Promise$all4[4];
              // Get events with voting in progress
              now = new Date();
              _context5.n = 4;
              return Event.countDocuments({
                voting_start: {
                  $lte: now
                },
                voting_end: {
                  $gte: now
                }
              });
            case 4:
              votingInProgress = _context5.v;
              spinner.stop();
              this.ui.header('Event Statistics', 'chart');
              this.ui.keyValue('Total Events', totalEvents.toString(), 25);
              this.ui.keyValue('Active', activeEvents.toString(), 25);
              this.ui.keyValue('Draft', draftEvents.toString(), 25);
              this.ui.keyValue('Completed', completedEvents.toString(), 25);
              this.ui.keyValue('Featured', featuredEvents.toString(), 25);
              this.ui.keyValue('Voting In Progress', votingInProgress.toString(), 25);

              // Recent events
              _context5.n = 5;
              return Event.find().select('name status createdAt').sort({
                createdAt: -1
              }).limit(5).lean();
            case 5:
              recentEvents = _context5.v;
              if (recentEvents.length > 0) {
                this.ui.newLine();
                this.ui.subheader('Recent Events');
                _iterator = _createForOfIteratorHelper(recentEvents);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    event = _step.value;
                    date = new Date(event.createdAt).toLocaleDateString();
                    this.ui.listItem("".concat(event.name, " (").concat(event.status, ") - ").concat(date));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
              _context5.n = 7;
              break;
            case 6:
              _context5.p = 6;
              _t4 = _context5.v;
              spinner.stop();
              this.ui.error("Failed to get statistics: ".concat(_t4.message));
            case 7:
              return _context5.a(2);
          }
        }, _callee5, this, [[1, 6]]);
      }));
      function stats() {
        return _stats.apply(this, arguments);
      }
      return stats;
    }()
    /**
     * Ensure database connection
     */
    )
  }, {
    key: "ensureConnection",
    value: (function () {
      var _ensureConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var mongoUri;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              if (!(_mongoose["default"].connection.readyState !== 1)) {
                _context6.n = 2;
                break;
              }
              mongoUri = this.config.get('MONGODB_URI');
              if (mongoUri) {
                _context6.n = 1;
                break;
              }
              throw new Error('MongoDB URI not configured');
            case 1:
              _context6.n = 2;
              return _mongoose["default"].connect(mongoUri);
            case 2:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function ensureConnection() {
        return _ensureConnection.apply(this, arguments);
      }
      return ensureConnection;
    }()
    /**
     * Parse command arguments
     */
    )
  }, {
    key: "parseArgs",
    value: function parseArgs(args) {
      var options = {};
      var _iterator2 = _createForOfIteratorHelper(args),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var arg = _step2.value;
          if (arg.startsWith('--')) {
            var _arg$slice$split = arg.slice(2).split('='),
              _arg$slice$split2 = _slicedToArray(_arg$slice$split, 2),
              key = _arg$slice$split2[0],
              value = _arg$slice$split2[1];
            options[key] = value || true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return options;
    }
  }]);
}();