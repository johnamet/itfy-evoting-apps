"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _notificationConstants = require("../../utils/constants/notification.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /**
 * Notification Model
 * This file defines the Notification schema and model for managing user notifications
 */
var Schema = _mongoose["default"].Schema;
var NotificationSchema = new Schema({
  // Recipient
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
    index: true
  },
  // Notification details
  type: {
    type: String,
    "enum": Object.values(_notificationConstants.NOTIFICATION_TYPE),
    required: [true, "Notification type is required"],
    index: true
  },
  title: {
    type: String,
    required: [true, "Notification title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  message: {
    type: String,
    required: [true, "Notification message is required"],
    trim: true,
    maxlength: [1000, "Message cannot exceed 1000 characters"]
  },
  // Delivery channel
  channel: {
    type: String,
    "enum": Object.values(_notificationConstants.NOTIFICATION_CHANNEL),
    "default": _notificationConstants.NOTIFICATION_CHANNEL.IN_APP,
    index: true
  },
  // Status tracking
  status: {
    type: String,
    "enum": Object.values(_notificationConstants.NOTIFICATION_STATUS),
    "default": _notificationConstants.NOTIFICATION_STATUS.PENDING,
    index: true
  },
  priority: {
    type: String,
    "enum": Object.values(_notificationConstants.NOTIFICATION_PRIORITY),
    "default": _notificationConstants.NOTIFICATION_PRIORITY.NORMAL,
    index: true
  },
  // Related entities
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    "default": null,
    index: true
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
    "default": null
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    "default": null
  },
  vote: {
    type: Schema.Types.ObjectId,
    ref: "Vote",
    "default": null
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    "default": null
  },
  form: {
    type: Schema.Types.ObjectId,
    ref: "Form",
    "default": null
  },
  submission: {
    type: Schema.Types.ObjectId,
    ref: "FormSubmission",
    "default": null
  },
  // Action metadata
  action_url: {
    type: String,
    trim: true,
    "default": null,
    validate: {
      validator: function validator(v) {
        if (!v) return true;
        return /^\/[a-zA-Z0-9\-_\/]*$/.test(v);
      },
      message: "Action URL must be a valid path starting with /"
    }
  },
  action_text: {
    type: String,
    trim: true,
    maxlength: [50, "Action text cannot exceed 50 characters"],
    "default": null
  },
  // Additional metadata
  metadata: {
    type: Schema.Types.Mixed,
    "default": {}
  },
  // Tracking fields
  sent_at: {
    type: Date,
    "default": null,
    index: true
  },
  read_at: {
    type: Date,
    "default": null,
    index: true
  },
  clicked_at: {
    type: Date,
    "default": null
  },
  // Email-specific fields
  email_to: {
    type: String,
    trim: true,
    lowercase: true,
    "default": null
  },
  email_subject: {
    type: String,
    trim: true,
    "default": null
  },
  email_provider_id: {
    type: String,
    trim: true,
    "default": null,
    index: true
  },
  email_template_id: {
    type: String,
    trim: true,
    "default": null
  },
  // SMS-specific fields
  sms_to: {
    type: String,
    trim: true,
    "default": null
  },
  sms_provider_id: {
    type: String,
    trim: true,
    "default": null
  },
  // Batch support
  batch_id: {
    type: String,
    trim: true,
    "default": null,
    index: true
  },
  // Error tracking
  error_message: {
    type: String,
    trim: true,
    "default": null
  },
  retry_count: {
    type: Number,
    "default": 0,
    min: 0
  },
  max_retries: {
    type: Number,
    "default": 3,
    min: 0
  },
  next_retry_at: {
    type: Date,
    "default": null
  },
  // Expiration
  expires_at: {
    type: Date,
    "default": null,
    index: true
  }

  // Soft delete and timestamps (handled by BaseModel)
}, {
  timestamps: false // Using manual timestamps from BaseModel
});

// ==================== Indexes ====================

// Compound indexes for common queries
NotificationSchema.index({
  user: 1,
  status: 1,
  created_at: -1
});
NotificationSchema.index({
  user: 1,
  read_at: 1,
  created_at: -1
});
NotificationSchema.index({
  user: 1,
  type: 1,
  created_at: -1
});
NotificationSchema.index({
  batch_id: 1,
  status: 1
});
NotificationSchema.index({
  channel: 1,
  status: 1,
  sent_at: 1
});
NotificationSchema.index({
  priority: 1,
  status: 1,
  created_at: 1
});
NotificationSchema.index({
  expires_at: 1
}, {
  sparse: true
});

// ==================== Virtual Properties ====================

NotificationSchema.virtual("isRead").get(function () {
  return this.read_at !== null;
});
NotificationSchema.virtual("isClicked").get(function () {
  return this.clicked_at !== null;
});
NotificationSchema.virtual("isSent").get(function () {
  return this.sent_at !== null;
});
NotificationSchema.virtual("isExpired").get(function () {
  if (!this.expires_at) return false;
  return new Date() > this.expires_at;
});
NotificationSchema.virtual("canRetry").get(function () {
  return this.status === _notificationConstants.NOTIFICATION_STATUS.FAILED && this.retry_count < this.max_retries && (!this.next_retry_at || new Date() >= this.next_retry_at);
});
NotificationSchema.virtual("timeToRead").get(function () {
  if (!this.read_at || !this.sent_at) return null;
  return Math.round((this.read_at - this.sent_at) / 1000); // seconds
});
NotificationSchema.virtual("timeToClick").get(function () {
  if (!this.clicked_at || !this.sent_at) return null;
  return Math.round((this.clicked_at - this.sent_at) / 1000); // seconds
});

// ==================== Static Methods ====================

/**
 * Find unread notifications for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @param {number} [limit=20] - Limit
 * @returns {Promise<Array>} - Unread notifications
 */
NotificationSchema.statics.findUnread = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(userId) {
    var limit,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          limit = _args.length > 1 && _args[1] !== undefined ? _args[1] : 20;
          _context.n = 1;
          return this.find({
            user: userId,
            read_at: null,
            deleted_at: null
          }).sort({
            created_at: -1
          }).limit(limit).lean();
        case 1:
          return _context.a(2, _context.v);
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Get unread count for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @returns {Promise<number>} - Unread count
 */
NotificationSchema.statics.getUnreadCount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId) {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return this.countDocuments({
            user: userId,
            read_at: null,
            deleted_at: null
          });
        case 1:
          return _context2.a(2, _context2.v);
      }
    }, _callee2, this);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Find notifications by type for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @param {string} type - Notification type
 * @param {number} [limit=20] - Limit
 * @returns {Promise<Array>} - Notifications
 */
NotificationSchema.statics.findByType = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(userId, type) {
    var limit,
      _args3 = arguments;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          limit = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 20;
          _context3.n = 1;
          return this.find({
            user: userId,
            type: type,
            deleted_at: null
          }).sort({
            created_at: -1
          }).limit(limit).lean();
        case 1:
          return _context3.a(2, _context3.v);
      }
    }, _callee3, this);
  }));
  return function (_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Find notifications by channel
 * @param {string} channel - Channel
 * @param {string} status - Status
 * @param {number} [limit=100] - Limit
 * @returns {Promise<Array>} - Notifications
 */
NotificationSchema.statics.findByChannel = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(channel, status) {
    var limit,
      query,
      _args4 = arguments;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 100;
          query = {
            channel: channel,
            deleted_at: null
          };
          if (status) query.status = status;
          _context4.n = 1;
          return this.find(query).sort({
            created_at: -1
          }).limit(limit).lean();
        case 1:
          return _context4.a(2, _context4.v);
      }
    }, _callee4, this);
  }));
  return function (_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Find pending notifications for delivery
 * @param {string} channel - Channel
 * @param {number} [limit=100] - Limit
 * @returns {Promise<Array>} - Pending notifications
 */
NotificationSchema.statics.findPendingForDelivery = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(channel) {
    var limit,
      _args5 = arguments;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          limit = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 100;
          _context5.n = 1;
          return this.find({
            channel: channel,
            status: {
              $in: [_notificationConstants.NOTIFICATION_STATUS.PENDING, _notificationConstants.NOTIFICATION_STATUS.QUEUED]
            },
            deleted_at: null
          }).sort({
            priority: -1,
            created_at: 1
          }).limit(limit);
        case 1:
          return _context5.a(2, _context5.v);
      }
    }, _callee5, this);
  }));
  return function (_x7) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Find notifications ready for retry
 * @param {number} [limit=50] - Limit
 * @returns {Promise<Array>} - Notifications to retry
 */
NotificationSchema.statics.findReadyForRetry = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
  var limit,
    now,
    _args6 = arguments;
  return _regenerator().w(function (_context6) {
    while (1) switch (_context6.n) {
      case 0:
        limit = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : 50;
        now = new Date();
        _context6.n = 1;
        return this.find({
          status: _notificationConstants.NOTIFICATION_STATUS.FAILED,
          retry_count: {
            $lt: this.schema.path("max_retries")["default"](3)
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
      case 1:
        return _context6.a(2, _context6.v);
    }
  }, _callee6, this);
}));

/**
 * Get notification statistics for a user
 * @param {string|mongoose.Types.ObjectId} userId - User ID
 * @returns {Promise<Object>} - Statistics
 */
NotificationSchema.statics.getUserStatistics = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(userId) {
    var _stats$total$, _stats$unread$, _stats$read$, _stats$clicked$;
    var _yield$this$aggregate, _yield$this$aggregate2, stats;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          _context7.n = 1;
          return this.aggregate([{
            $match: {
              user: new _mongoose["default"].Types.ObjectId(userId),
              deleted_at: null
            }
          }, {
            $facet: {
              total: [{
                $count: "count"
              }],
              unread: [{
                $match: {
                  read_at: null
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
              byType: [{
                $group: {
                  _id: "$type",
                  count: {
                    $sum: 1
                  }
                }
              }, {
                $sort: {
                  count: -1
                }
              }],
              byChannel: [{
                $group: {
                  _id: "$channel",
                  count: {
                    $sum: 1
                  }
                }
              }],
              byPriority: [{
                $group: {
                  _id: "$priority",
                  count: {
                    $sum: 1
                  }
                }
              }]
            }
          }]);
        case 1:
          _yield$this$aggregate = _context7.v;
          _yield$this$aggregate2 = _slicedToArray(_yield$this$aggregate, 1);
          stats = _yield$this$aggregate2[0];
          return _context7.a(2, {
            total: (stats === null || stats === void 0 || (_stats$total$ = stats.total[0]) === null || _stats$total$ === void 0 ? void 0 : _stats$total$.count) || 0,
            unread: (stats === null || stats === void 0 || (_stats$unread$ = stats.unread[0]) === null || _stats$unread$ === void 0 ? void 0 : _stats$unread$.count) || 0,
            read: (stats === null || stats === void 0 || (_stats$read$ = stats.read[0]) === null || _stats$read$ === void 0 ? void 0 : _stats$read$.count) || 0,
            clicked: (stats === null || stats === void 0 || (_stats$clicked$ = stats.clicked[0]) === null || _stats$clicked$ === void 0 ? void 0 : _stats$clicked$.count) || 0,
            byType: (stats === null || stats === void 0 ? void 0 : stats.byType) || [],
            byChannel: (stats === null || stats === void 0 ? void 0 : stats.byChannel) || [],
            byPriority: (stats === null || stats === void 0 ? void 0 : stats.byPriority) || []
          });
      }
    }, _callee7, this);
  }));
  return function (_x8) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Get system-wide notification statistics
 * @returns {Promise<Object>} - System statistics
 */
NotificationSchema.statics.getSystemStatistics = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
  var _yield$this$aggregate3, _yield$this$aggregate4, stats, deliveryData, total;
  return _regenerator().w(function (_context8) {
    while (1) switch (_context8.n) {
      case 0:
        _context8.n = 1;
        return this.aggregate([{
          $match: {
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
            byChannel: [{
              $group: {
                _id: "$channel",
                count: {
                  $sum: 1
                }
              }
            }],
            byPriority: [{
              $group: {
                _id: "$priority",
                count: {
                  $sum: 1
                }
              }
            }],
            deliveryRate: [{
              $group: {
                _id: null,
                total: {
                  $sum: 1
                },
                sent: {
                  $sum: {
                    $cond: [{
                      $ne: ["$sent_at", null]
                    }, 1, 0]
                  }
                },
                delivered: {
                  $sum: {
                    $cond: [{
                      $eq: ["$status", _notificationConstants.NOTIFICATION_STATUS.DELIVERED]
                    }, 1, 0]
                  }
                },
                failed: {
                  $sum: {
                    $cond: [{
                      $eq: ["$status", _notificationConstants.NOTIFICATION_STATUS.FAILED]
                    }, 1, 0]
                  }
                }
              }
            }]
          }
        }]);
      case 1:
        _yield$this$aggregate3 = _context8.v;
        _yield$this$aggregate4 = _slicedToArray(_yield$this$aggregate3, 1);
        stats = _yield$this$aggregate4[0];
        deliveryData = (stats === null || stats === void 0 ? void 0 : stats.deliveryRate[0]) || {};
        total = deliveryData.total || 0;
        return _context8.a(2, {
          total: total,
          byStatus: (stats === null || stats === void 0 ? void 0 : stats.byStatus) || [],
          byChannel: (stats === null || stats === void 0 ? void 0 : stats.byChannel) || [],
          byPriority: (stats === null || stats === void 0 ? void 0 : stats.byPriority) || [],
          deliveryRate: total > 0 ? Math.round(deliveryData.delivered / total * 10000) / 100 : 0,
          failureRate: total > 0 ? Math.round(deliveryData.failed / total * 10000) / 100 : 0
        });
    }
  }, _callee8, this);
}));

// ==================== Instance Methods ====================

/**
 * Mark notification as read
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsRead = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
  return _regenerator().w(function (_context9) {
    while (1) switch (_context9.n) {
      case 0:
        if (!this.read_at) {
          _context9.n = 1;
          break;
        }
        return _context9.a(2, this);
      case 1:
        this.read_at = new Date();
        if (this.status === _notificationConstants.NOTIFICATION_STATUS.SENT || this.status === _notificationConstants.NOTIFICATION_STATUS.DELIVERED) {
          this.status = _notificationConstants.NOTIFICATION_STATUS.READ;
        }
        _context9.n = 2;
        return this.save();
      case 2:
        return _context9.a(2, _context9.v);
    }
  }, _callee9, this);
}));

/**
 * Mark notification as clicked
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsClicked = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
  return _regenerator().w(function (_context0) {
    while (1) switch (_context0.n) {
      case 0:
        if (!this.clicked_at) {
          _context0.n = 1;
          break;
        }
        return _context0.a(2, this);
      case 1:
        this.clicked_at = new Date();
        if (!this.read_at) {
          this.read_at = new Date();
        }
        this.status = _notificationConstants.NOTIFICATION_STATUS.CLICKED;
        _context0.n = 2;
        return this.save();
      case 2:
        return _context0.a(2, _context0.v);
    }
  }, _callee0, this);
}));

/**
 * Mark notification as sent
 * @param {string} [providerId] - Provider ID
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsSent = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
  var providerId,
    _args1 = arguments;
  return _regenerator().w(function (_context1) {
    while (1) switch (_context1.n) {
      case 0:
        providerId = _args1.length > 0 && _args1[0] !== undefined ? _args1[0] : null;
        this.status = _notificationConstants.NOTIFICATION_STATUS.SENT;
        this.sent_at = new Date();
        if (providerId) {
          if (this.channel === _notificationConstants.NOTIFICATION_CHANNEL.EMAIL) {
            this.email_provider_id = providerId;
          } else if (this.channel === _notificationConstants.NOTIFICATION_CHANNEL.SMS) {
            this.sms_provider_id = providerId;
          }
        }
        _context1.n = 1;
        return this.save();
      case 1:
        return _context1.a(2, _context1.v);
    }
  }, _callee1, this);
}));

/**
 * Mark notification as delivered
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsDelivered = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
  return _regenerator().w(function (_context10) {
    while (1) switch (_context10.n) {
      case 0:
        this.status = _notificationConstants.NOTIFICATION_STATUS.DELIVERED;
        if (!this.sent_at) {
          this.sent_at = new Date();
        }
        _context10.n = 1;
        return this.save();
      case 1:
        return _context10.a(2, _context10.v);
    }
  }, _callee10, this);
}));

/**
 * Mark notification as failed
 * @param {string} errorMessage - Error message
 * @param {boolean} [shouldRetry=true] - Whether to schedule retry
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.markAsFailed = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(errorMessage) {
    var shouldRetry,
      delayMinutes,
      _args11 = arguments;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          shouldRetry = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : true;
          this.status = _notificationConstants.NOTIFICATION_STATUS.FAILED;
          this.error_message = errorMessage;
          if (shouldRetry && this.retry_count < this.max_retries) {
            this.retry_count += 1;
            // Exponential backoff: 5 min, 15 min, 45 min
            delayMinutes = Math.pow(3, this.retry_count) * 5;
            this.next_retry_at = new Date(Date.now() + delayMinutes * 60 * 1000);
          }
          _context11.n = 1;
          return this.save();
        case 1:
          return _context11.a(2, _context11.v);
      }
    }, _callee11, this);
  }));
  return function (_x9) {
    return _ref11.apply(this, arguments);
  };
}();

/**
 * Queue notification for delivery
 * @returns {Promise<Object>} - Updated notification
 */
NotificationSchema.methods.queue = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
  return _regenerator().w(function (_context12) {
    while (1) switch (_context12.n) {
      case 0:
        this.status = _notificationConstants.NOTIFICATION_STATUS.QUEUED;
        _context12.n = 1;
        return this.save();
      case 1:
        return _context12.a(2, _context12.v);
    }
  }, _callee12, this);
}));

/**
 * Check if notification should be sent
 * @returns {boolean} - Whether notification should be sent
 */
NotificationSchema.methods.shouldSend = function () {
  if (this.deleted_at) return false;
  if (this.isExpired) return false;
  if (this.status !== _notificationConstants.NOTIFICATION_STATUS.PENDING && this.status !== _notificationConstants.NOTIFICATION_STATUS.QUEUED) {
    return false;
  }
  return true;
};

// ==================== Middleware ====================

/**
 * Pre-save hook to handle auto-expiration
 */
NotificationSchema.pre("save", function (next) {
  // Auto-set expiration for certain types (30 days for most notifications)
  if (!this.expires_at && this.isNew) {
    var expirationDays = this.priority === _notificationConstants.NOTIFICATION_PRIORITY.URGENT ? 90 : 30;
    this.expires_at = new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000);
  }

  // Set email details if channel is email
  if (this.channel === _notificationConstants.NOTIFICATION_CHANNEL.EMAIL && !this.email_subject) {
    this.email_subject = this.title;
  }
  next();
});

// ==================== Export Model ====================
var _default = exports["default"] = _mongoose["default"].model("Notification", NotificationSchema);