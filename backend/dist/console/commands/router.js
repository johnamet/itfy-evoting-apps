"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandRouter = void 0;
var _authCommands = require("./auth.commands.js");
var _userCommands = require("./user.commands.js");
var _systemCommands = require("./system.commands.js");
var _serverCommands = require("./server.commands.js");
var _databaseCommands = require("./database.commands.js");
var _eventCommands = require("./event.commands.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
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
 * Command Router
 * Routes console commands to appropriate handlers
 */
var CommandRouter = exports.CommandRouter = /*#__PURE__*/function () {
  function CommandRouter(app) {
    _classCallCheck(this, CommandRouter);
    this.app = app;
    this.ui = app.ui;
    this.config = app.config;
    this.authManager = app.authManager;
    this.serverManager = app.serverManager;

    // Initialize command handlers
    this.authCommands = new _authCommands.AuthCommands(this);
    this.userCommands = new _userCommands.UserCommands(this);
    this.systemCommands = new _systemCommands.SystemCommands(this);
    this.serverCommands = new _serverCommands.ServerCommands(this);
    this.databaseCommands = new _databaseCommands.DatabaseCommands(this);
    this.eventCommands = new _eventCommands.EventCommands(this);

    // Register all commands
    this.commands = this.registerCommands();
  }

  /**
   * Register all available commands
   */
  return _createClass(CommandRouter, [{
    key: "registerCommands",
    value: function registerCommands() {
      var _this = this;
      return {
        // General commands
        help: {
          name: 'help',
          aliases: ['h', '?'],
          description: 'Show available commands',
          usage: 'help [command]',
          handler: function () {
            var _handler = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(args) {
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    return _context.a(2, _this.showHelp(args[0]));
                }
              }, _callee);
            }));
            function handler(_x) {
              return _handler.apply(this, arguments);
            }
            return handler;
          }()
        },
        clear: {
          name: 'clear',
          aliases: ['cls'],
          description: 'Clear the console screen',
          handler: function handler() {
            return _this.ui.clear();
          }
        },
        exit: {
          name: 'exit',
          aliases: ['quit', 'q'],
          description: 'Exit the console',
          handler: function handler() {
            return _this.app.shutdown();
          }
        },
        version: {
          name: 'version',
          aliases: ['v'],
          description: 'Show version information',
          handler: function handler() {
            return _this.showVersion();
          }
        },
        // Auth commands
        login: {
          name: 'login',
          aliases: ['signin'],
          description: 'Authenticate with email and password',
          usage: 'login [email]',
          handler: function handler(args) {
            return _this.authCommands.login(args[0]);
          }
        },
        logout: {
          name: 'logout',
          aliases: ['signout'],
          description: 'End current session',
          requiresAuth: true,
          handler: function handler() {
            return _this.authCommands.logout();
          }
        },
        whoami: {
          name: 'whoami',
          aliases: ['me'],
          description: 'Show current user info',
          requiresAuth: true,
          handler: function handler() {
            return _this.authCommands.whoami();
          }
        },
        passwd: {
          name: 'passwd',
          aliases: ['password', 'changepassword'],
          description: 'Change your password',
          requiresAuth: true,
          handler: function handler() {
            return _this.authCommands.changePassword();
          }
        },
        // User management commands
        'user:list': {
          name: 'user:list',
          aliases: ['users', 'user:ls'],
          description: 'List all users',
          usage: 'user:list [--role=admin] [--limit=10]',
          requiresAuth: true,
          handler: function handler(args) {
            return _this.userCommands.listUsers(args);
          }
        },
        'user:create': {
          name: 'user:create',
          aliases: ['user:add'],
          description: 'Create a new user',
          usage: 'user:create',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler() {
            return _this.userCommands.createUser();
          }
        },
        'user:view': {
          name: 'user:view',
          aliases: ['user:show', 'user:get'],
          description: 'View user details',
          usage: 'user:view <email|id>',
          requiresAuth: true,
          handler: function handler(args) {
            return _this.userCommands.viewUser(args[0]);
          }
        },
        'user:edit': {
          name: 'user:edit',
          aliases: ['user:update'],
          description: 'Edit user details',
          usage: 'user:edit <email|id>',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler(args) {
            return _this.userCommands.editUser(args[0]);
          }
        },
        'user:delete': {
          name: 'user:delete',
          aliases: ['user:rm', 'user:remove'],
          description: 'Delete a user',
          usage: 'user:delete <email|id>',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler(args) {
            return _this.userCommands.deleteUser(args[0]);
          }
        },
        'user:role': {
          name: 'user:role',
          aliases: ['user:setrole'],
          description: 'Change user role',
          usage: 'user:role <email|id> <role>',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler(args) {
            return _this.userCommands.changeRole(args[0], args[1]);
          }
        },
        'user:reset': {
          name: 'user:reset',
          aliases: ['user:resetpass'],
          description: 'Reset user password',
          usage: 'user:reset <email|id>',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler(args) {
            return _this.userCommands.resetPassword(args[0]);
          }
        },
        // Server commands
        'server:start': {
          name: 'server:start',
          aliases: ['start'],
          description: 'Start the backend server',
          usage: 'server:start [--mode=dev|production]',
          handler: function handler(args) {
            return _this.serverCommands.start(args);
          }
        },
        'server:stop': {
          name: 'server:stop',
          aliases: ['stop'],
          description: 'Stop the backend server',
          handler: function handler() {
            return _this.serverCommands.stop();
          }
        },
        'server:restart': {
          name: 'server:restart',
          aliases: ['restart'],
          description: 'Restart the backend server',
          handler: function handler(args) {
            return _this.serverCommands.restart(args);
          }
        },
        'server:status': {
          name: 'server:status',
          aliases: ['status'],
          description: 'Show server status',
          handler: function handler() {
            return _this.serverCommands.status();
          }
        },
        'server:logs': {
          name: 'server:logs',
          aliases: ['logs'],
          description: 'Show server logs',
          usage: 'server:logs [--lines=50]',
          handler: function handler(args) {
            return _this.serverCommands.logs(args);
          }
        },
        'server:health': {
          name: 'server:health',
          aliases: ['health'],
          description: 'Check server health',
          handler: function handler() {
            return _this.serverCommands.health();
          }
        },
        // Database commands
        'db:status': {
          name: 'db:status',
          aliases: ['database'],
          description: 'Show database connection status',
          handler: function handler() {
            return _this.databaseCommands.status();
          }
        },
        'db:connect': {
          name: 'db:connect',
          description: 'Connect to database',
          handler: function handler() {
            return _this.databaseCommands.connect();
          }
        },
        'db:disconnect': {
          name: 'db:disconnect',
          description: 'Disconnect from database',
          handler: function handler() {
            return _this.databaseCommands.disconnect();
          }
        },
        'db:stats': {
          name: 'db:stats',
          aliases: ['db:info'],
          description: 'Show database statistics',
          requiresAuth: true,
          handler: function handler() {
            return _this.databaseCommands.stats();
          }
        },
        'db:seed': {
          name: 'db:seed',
          description: 'Run database seeders',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler() {
            return _this.databaseCommands.seed();
          }
        },
        'db:backup': {
          name: 'db:backup',
          description: 'Create database backup',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler() {
            return _this.databaseCommands.backup();
          }
        },
        // System commands
        'config:show': {
          name: 'config:show',
          aliases: ['config'],
          description: 'Show current configuration',
          requiresAuth: true,
          handler: function handler() {
            return _this.systemCommands.showConfig();
          }
        },
        'config:set': {
          name: 'config:set',
          description: 'Set a configuration value',
          usage: 'config:set <key> <value>',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler(args) {
            return _this.systemCommands.setConfig(args[0], args.slice(1).join(' '));
          }
        },
        'config:reload': {
          name: 'config:reload',
          description: 'Reload configuration from file',
          requiresAuth: true,
          handler: function handler() {
            return _this.systemCommands.reloadConfig();
          }
        },
        'cache:clear': {
          name: 'cache:clear',
          aliases: ['cache:flush'],
          description: 'Clear cache',
          requiresAuth: true,
          adminOnly: true,
          handler: function handler() {
            return _this.systemCommands.clearCache();
          }
        },
        'cache:stats': {
          name: 'cache:stats',
          description: 'Show cache statistics',
          requiresAuth: true,
          handler: function handler() {
            return _this.systemCommands.cacheStats();
          }
        },
        // Event commands
        'event:list': {
          name: 'event:list',
          aliases: ['events'],
          description: 'List all events',
          usage: 'event:list [--status=active]',
          requiresAuth: true,
          handler: function handler(args) {
            return _this.eventCommands.listEvents(args);
          }
        },
        'event:view': {
          name: 'event:view',
          aliases: ['event:show'],
          description: 'View event details',
          usage: 'event:view <id>',
          requiresAuth: true,
          handler: function handler(args) {
            return _this.eventCommands.viewEvent(args[0]);
          }
        },
        'event:stats': {
          name: 'event:stats',
          description: 'Show event statistics',
          requiresAuth: true,
          handler: function handler() {
            return _this.eventCommands.stats();
          }
        },
        // Misc commands
        setup: {
          name: 'setup',
          description: 'Run setup wizard again',
          handler: function handler() {
            return _this.app.runSetupWizard();
          }
        }
      };
    }

    /**
     * Execute a command
     */
  }, {
    key: "execute",
    value: (function () {
      var _execute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(input, user) {
        var _this$parseInput, _this$parseInput2, commandName, args, command, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _this$parseInput = this.parseInput(input), _this$parseInput2 = _toArray(_this$parseInput), commandName = _this$parseInput2[0], args = _arrayLikeToArray(_this$parseInput2).slice(1);
              if (commandName) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              // Find command (including aliases)
              command = this.findCommand(commandName);
              if (command) {
                _context2.n = 2;
                break;
              }
              this.ui.error("Unknown command: ".concat(commandName));
              this.ui.info('Type "help" for available commands');
              return _context2.a(2);
            case 2:
              if (!(command.requiresAuth && !this.authManager.isAuthenticated())) {
                _context2.n = 3;
                break;
              }
              this.ui.error('This command requires authentication. Please login first.');
              return _context2.a(2);
            case 3:
              if (!(command.adminOnly && !this.authManager.hasRole('admin'))) {
                _context2.n = 4;
                break;
              }
              this.ui.error('This command requires admin privileges.');
              return _context2.a(2);
            case 4:
              _context2.p = 4;
              _context2.n = 5;
              return command.handler(args);
            case 5:
              _context2.n = 7;
              break;
            case 6:
              _context2.p = 6;
              _t = _context2.v;
              this.ui.error("Command failed: ".concat(_t.message));
            case 7:
              return _context2.a(2);
          }
        }, _callee2, this, [[4, 6]]);
      }));
      function execute(_x2, _x3) {
        return _execute.apply(this, arguments);
      }
      return execute;
    }()
    /**
     * Parse input into command and arguments
     */
    )
  }, {
    key: "parseInput",
    value: function parseInput(input) {
      var parts = [];
      var current = '';
      var inQuotes = false;
      var quoteChar = '';
      var _iterator = _createForOfIteratorHelper(input),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _char = _step.value;
          if ((_char === '"' || _char === "'") && !inQuotes) {
            inQuotes = true;
            quoteChar = _char;
          } else if (_char === quoteChar && inQuotes) {
            inQuotes = false;
            quoteChar = '';
          } else if (_char === ' ' && !inQuotes) {
            if (current) {
              parts.push(current);
              current = '';
            }
          } else {
            current += _char;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (current) {
        parts.push(current);
      }
      return parts;
    }

    /**
     * Find command by name or alias
     */
  }, {
    key: "findCommand",
    value: function findCommand(name) {
      var lowerName = name.toLowerCase();

      // Check direct match
      if (this.commands[lowerName]) {
        return this.commands[lowerName];
      }

      // Check aliases
      for (var _i = 0, _Object$values = Object.values(this.commands); _i < _Object$values.length; _i++) {
        var cmd = _Object$values[_i];
        if (cmd.aliases && cmd.aliases.includes(lowerName)) {
          return cmd;
        }
      }
      return null;
    }

    /**
     * Show help
     */
  }, {
    key: "showHelp",
    value: function showHelp(commandName) {
      var _this2 = this;
      if (commandName) {
        var command = this.findCommand(commandName);
        if (command) {
          this.ui.header("Help: ".concat(command.name), 'info');
          this.ui.keyValue('Description', command.description);
          if (command.aliases) {
            this.ui.keyValue('Aliases', command.aliases.join(', '));
          }
          if (command.usage) {
            this.ui.keyValue('Usage', command.usage);
          }
          if (command.requiresAuth) {
            this.ui.keyValue('Requires Auth', 'Yes');
          }
          if (command.adminOnly) {
            this.ui.keyValue('Admin Only', 'Yes');
          }
        } else {
          this.ui.error("Command not found: ".concat(commandName));
        }
        return;
      }

      // Group commands by category
      var categories = {
        'General': ['help', 'clear', 'exit', 'version', 'setup'],
        'Authentication': ['login', 'logout', 'whoami', 'passwd'],
        'User Management': ['user:list', 'user:create', 'user:view', 'user:edit', 'user:delete', 'user:role', 'user:reset'],
        'Server': ['server:start', 'server:stop', 'server:restart', 'server:status', 'server:logs', 'server:health'],
        'Database': ['db:status', 'db:connect', 'db:disconnect', 'db:stats', 'db:seed', 'db:backup'],
        'System': ['config:show', 'config:set', 'config:reload', 'cache:clear', 'cache:stats'],
        'Events': ['event:list', 'event:view', 'event:stats']
      };
      this.ui.header('ITFY E-Voting Admin Console', 'rocket');
      for (var _i2 = 0, _Object$entries = Object.entries(categories); _i2 < _Object$entries.length; _i2++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          category = _Object$entries$_i[0],
          commandNames = _Object$entries$_i[1];
        var categoryCommands = commandNames.map(function (name) {
          return _this2.commands[name];
        }).filter(Boolean);
        if (categoryCommands.length > 0) {
          this.ui.showHelp(categoryCommands, category);
          this.ui.newLine();
        }
      }
    }

    /**
     * Show version information
     */
  }, {
    key: "showVersion",
    value: function showVersion() {
      this.ui.header('Version Information', 'info');
      this.ui.keyValue('Console Version', '1.0.0');
      this.ui.keyValue('Backend Version', '1.1.0');
      this.ui.keyValue('Node.js', process.version);
      this.ui.keyValue('Platform', process.platform);
      this.ui.keyValue('Architecture', process.arch);
    }
  }]);
}();