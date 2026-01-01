"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatabaseCommands = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t7 in e) "default" !== _t7 && {}.hasOwnProperty.call(e, _t7) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t7)) && (i.get || i.set) ? o(f, _t7, i) : f[_t7] = e[_t7]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Database Commands
 * Handles database operations and status
 */
var DatabaseCommands = exports.DatabaseCommands = /*#__PURE__*/function () {
  function DatabaseCommands(router) {
    _classCallCheck(this, DatabaseCommands);
    this.router = router;
    this.ui = router.ui;
    this.config = router.config;
    this.serverManager = router.serverManager;
  }

  /**
   * Show database status
   */
  return _createClass(DatabaseCommands, [{
    key: "status",
    value: (function () {
      var _status = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var states, state, stateIcon, stateColor;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
              state = states[_mongoose["default"].connection.readyState] || 'unknown';
              this.ui.header('Database Status', 'database');
              stateIcon = state === 'connected' ? '●' : '○';
              stateColor = state === 'connected' ? 'green' : 'red';
              this.ui.print("  Status: ".concat(stateIcon, " ").concat(state), stateColor);
              this.ui.newLine();
              this.ui.keyValue('URI', this.config.maskSensitive(this.config.get('MONGODB_URI', '')), 20);
              if (_mongoose["default"].connection.readyState === 1) {
                this.ui.keyValue('Host', _mongoose["default"].connection.host, 20);
                this.ui.keyValue('Port', _mongoose["default"].connection.port, 20);
                this.ui.keyValue('Database', _mongoose["default"].connection.name, 20);
              }
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function status() {
        return _status.apply(this, arguments);
      }
      return status;
    }()
    /**
     * Connect to database
     */
    )
  }, {
    key: "connect",
    value: (function () {
      var _connect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var mongoUri, spinner, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              if (!(_mongoose["default"].connection.readyState === 1)) {
                _context2.n = 1;
                break;
              }
              this.ui.info('Already connected to database');
              return _context2.a(2);
            case 1:
              mongoUri = this.config.get('MONGODB_URI');
              if (mongoUri) {
                _context2.n = 2;
                break;
              }
              this.ui.error('MongoDB URI not configured');
              return _context2.a(2);
            case 2:
              spinner = this.ui.spinner('Connecting to database...');
              _context2.p = 3;
              _context2.n = 4;
              return _mongoose["default"].connect(mongoUri, {
                serverSelectionTimeoutMS: 10000
              });
            case 4:
              spinner.stop();
              this.ui.success('Connected to database');
              this.ui.keyValue('Host', _mongoose["default"].connection.host);
              this.ui.keyValue('Database', _mongoose["default"].connection.name);
              _context2.n = 6;
              break;
            case 5:
              _context2.p = 5;
              _t = _context2.v;
              spinner.stop();
              this.ui.error("Connection failed: ".concat(_t.message));
            case 6:
              return _context2.a(2);
          }
        }, _callee2, this, [[3, 5]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     * Disconnect from database
     */
    )
  }, {
    key: "disconnect",
    value: (function () {
      var _disconnect = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var spinner, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (!(_mongoose["default"].connection.readyState !== 1)) {
                _context3.n = 1;
                break;
              }
              this.ui.info('Not connected to database');
              return _context3.a(2);
            case 1:
              spinner = this.ui.spinner('Disconnecting...');
              _context3.p = 2;
              _context3.n = 3;
              return _mongoose["default"].disconnect();
            case 3:
              spinner.stop();
              this.ui.success('Disconnected from database');
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t2 = _context3.v;
              spinner.stop();
              this.ui.error("Disconnect failed: ".concat(_t2.message));
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[2, 4]]);
      }));
      function disconnect() {
        return _disconnect.apply(this, arguments);
      }
      return disconnect;
    }()
    /**
     * Show database statistics
     */
    )
  }, {
    key: "stats",
    value: (function () {
      var _stats = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var spinner, _stats2$objects, db, _stats2, collections, collectionStats, headers, rows, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.n = 1;
              return this.ensureConnection();
            case 1:
              spinner = this.ui.spinner('Fetching statistics...');
              _context5.p = 2;
              db = _mongoose["default"].connection.db;
              _context5.n = 3;
              return db.stats();
            case 3:
              _stats2 = _context5.v;
              _context5.n = 4;
              return db.listCollections().toArray();
            case 4:
              collections = _context5.v;
              spinner.stop();
              this.ui.header('Database Statistics', 'chart');
              this.ui.keyValue('Database', _stats2.db, 25);
              this.ui.keyValue('Collections', _stats2.collections, 25);
              this.ui.keyValue('Documents', ((_stats2$objects = _stats2.objects) === null || _stats2$objects === void 0 ? void 0 : _stats2$objects.toLocaleString()) || 'N/A', 25);
              this.ui.keyValue('Data Size', this.formatBytes(_stats2.dataSize), 25);
              this.ui.keyValue('Storage Size', this.formatBytes(_stats2.storageSize), 25);
              this.ui.keyValue('Indexes', _stats2.indexes, 25);
              this.ui.keyValue('Index Size', this.formatBytes(_stats2.indexSize), 25);

              // Collection details
              this.ui.newLine();
              this.ui.subheader('Collections');
              _context5.n = 5;
              return Promise.all(collections.map(/*#__PURE__*/function () {
                var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(col) {
                  var count, _t3;
                  return _regenerator().w(function (_context4) {
                    while (1) switch (_context4.p = _context4.n) {
                      case 0:
                        _context4.p = 0;
                        _context4.n = 1;
                        return db.collection(col.name).countDocuments();
                      case 1:
                        count = _context4.v;
                        return _context4.a(2, {
                          name: col.name,
                          count: count
                        });
                      case 2:
                        _context4.p = 2;
                        _t3 = _context4.v;
                        return _context4.a(2, {
                          name: col.name,
                          count: '?'
                        });
                    }
                  }, _callee4, null, [[0, 2]]);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 5:
              collectionStats = _context5.v;
              headers = ['Collection', 'Documents'];
              rows = collectionStats.sort(function (a, b) {
                return (b.count || 0) - (a.count || 0);
              }).map(function (col) {
                return [col.name, col.count.toLocaleString()];
              });
              this.ui.table(headers, rows);
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
        }, _callee5, this, [[2, 6]]);
      }));
      function stats() {
        return _stats.apply(this, arguments);
      }
      return stats;
    }()
    /**
     * Run database seeders
     */
    )
  }, {
    key: "seed",
    value: (function () {
      var _seed = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var confirm, _t5;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              _context6.n = 1;
              return this.ui.confirm('Run database seeders? This may modify data.', false);
            case 1:
              confirm = _context6.v;
              if (confirm) {
                _context6.n = 2;
                break;
              }
              this.ui.info('Cancelled');
              return _context6.a(2);
            case 2:
              this.ui.info('Running seeders...');
              this.ui.newLine();
              _context6.p = 3;
              _context6.n = 4;
              return this.serverManager.runSeed();
            case 4:
              this.ui.success('Seeders completed');
              _context6.n = 6;
              break;
            case 5:
              _context6.p = 5;
              _t5 = _context6.v;
              this.ui.error("Seeding failed: ".concat(_t5.message));
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this, [[3, 5]]);
      }));
      function seed() {
        return _seed.apply(this, arguments);
      }
      return seed;
    }()
    /**
     * Create database backup
     */
    )
  }, {
    key: "backup",
    value: (function () {
      var _backup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var mongoUri, dbName, timestamp, backupDir, confirm, _yield$import, exec, _yield$import2, promisify, execAsync, fs, _t6;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.p = _context7.n) {
            case 0:
              _context7.n = 1;
              return this.ensureConnection();
            case 1:
              mongoUri = this.config.get('MONGODB_URI');
              dbName = _mongoose["default"].connection.name;
              timestamp = new Date().toISOString().replace(/[:.]/g, '-');
              backupDir = "./backups/".concat(dbName, "-").concat(timestamp);
              this.ui.header('Database Backup', 'folder');
              this.ui.keyValue('Database', dbName, 20);
              this.ui.keyValue('Output', backupDir, 20);
              this.ui.newLine();
              _context7.n = 2;
              return this.ui.confirm('Create backup?', true);
            case 2:
              confirm = _context7.v;
              if (confirm) {
                _context7.n = 3;
                break;
              }
              this.ui.info('Cancelled');
              return _context7.a(2);
            case 3:
              this.ui.info('Creating backup...');
              this.ui.info('Note: mongodump must be installed for this to work.');
              this.ui.newLine();
              _context7.p = 4;
              _context7.n = 5;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('child_process'));
              });
            case 5:
              _yield$import = _context7.v;
              exec = _yield$import.exec;
              _context7.n = 6;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('util'));
              });
            case 6:
              _yield$import2 = _context7.v;
              promisify = _yield$import2.promisify;
              execAsync = promisify(exec); // Create backup directory
              _context7.n = 7;
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require('fs/promises'));
              });
            case 7:
              fs = _context7.v;
              _context7.n = 8;
              return fs.mkdir(backupDir, {
                recursive: true
              });
            case 8:
              _context7.n = 9;
              return execAsync("mongodump --uri=\"".concat(mongoUri, "\" --out=\"").concat(backupDir, "\""));
            case 9:
              this.ui.success("Backup created at: ".concat(backupDir));
              _context7.n = 11;
              break;
            case 10:
              _context7.p = 10;
              _t6 = _context7.v;
              this.ui.error("Backup failed: ".concat(_t6.message));
              this.ui.info('Make sure mongodump is installed (part of MongoDB Database Tools)');
            case 11:
              return _context7.a(2);
          }
        }, _callee7, this, [[4, 10]]);
      }));
      function backup() {
        return _backup.apply(this, arguments);
      }
      return backup;
    }()
    /**
     * Ensure database connection
     */
    )
  }, {
    key: "ensureConnection",
    value: (function () {
      var _ensureConnection = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
        var mongoUri;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!(_mongoose["default"].connection.readyState !== 1)) {
                _context8.n = 2;
                break;
              }
              mongoUri = this.config.get('MONGODB_URI');
              if (mongoUri) {
                _context8.n = 1;
                break;
              }
              throw new Error('MongoDB URI not configured');
            case 1:
              _context8.n = 2;
              return _mongoose["default"].connect(mongoUri);
            case 2:
              return _context8.a(2);
          }
        }, _callee8, this);
      }));
      function ensureConnection() {
        return _ensureConnection.apply(this, arguments);
      }
      return ensureConnection;
    }()
    /**
     * Format bytes to human readable
     */
    )
  }, {
    key: "formatBytes",
    value: function formatBytes(bytes) {
      if (!bytes || bytes === 0) return '0 B';
      var k = 1024;
      var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(2)), " ").concat(sizes[i]);
    }
  }]);
}();