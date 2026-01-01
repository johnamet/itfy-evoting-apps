"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = void 0;
var _readline = _interopRequireDefault(require("readline"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-undef */ /**
 * UI Utilities for Console Application
 * Provides colorful output, prompts, and formatting
 */
// ANSI color codes
var colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  // Foreground
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  // Background
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

// Icons
var icons = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
  arrow: '→',
  bullet: '•',
  star: '★',
  check: '☑',
  cross: '☒',
  heart: '♥',
  server: '🖥',
  database: '🗄',
  user: '👤',
  admin: '👑',
  lock: '🔒',
  unlock: '🔓',
  key: '🔑',
  gear: '⚙',
  rocket: '🚀',
  fire: '🔥',
  thunder: '⚡',
  folder: '📁',
  file: '📄',
  mail: '📧',
  bell: '🔔',
  clock: '🕐',
  calendar: '📅',
  chart: '📊',
  vote: '🗳'
};
var UI = exports.UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);
    this.colors = colors;
    this.icons = icons;
    this.mainRl = null; // Reference to main readline interface
  }

  /**
   * Set the main readline interface
   */
  return _createClass(UI, [{
    key: "setReadlineInterface",
    value: function setReadlineInterface(rl) {
      this.mainRl = rl;
    }

    /**
     * Clear the console screen
     */
  }, {
    key: "clear",
    value: function clear() {
      console.clear();
    }

    /**
     * Print a new line
     */
  }, {
    key: "newLine",
    value: function newLine() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      for (var i = 0; i < count; i++) {
        console.log('');
      }
    }

    /**
     * Print the application banner
     */
  }, {
    key: "printBanner",
    value: function printBanner() {
      var banner = "\n".concat(colors.cyan).concat(colors.bright, "\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2551                                                                           \u2551\n\u2551   ").concat(colors.yellow, "\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557   \u2588\u2588\u2557    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2557   \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557").concat(colors.cyan, "   \u2551\n\u2551   ").concat(colors.yellow, "\u2588\u2588\u2551\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D\u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D    \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D   \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u255A\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D").concat(colors.cyan, "   \u2551\n\u2551   ").concat(colors.yellow, "\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2557   \u255A\u2588\u2588\u2588\u2588\u2554\u255D     \u2588\u2588\u2588\u2588\u2588\u2557     \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2557").concat(colors.cyan, "     \u2551\n\u2551   ").concat(colors.yellow, "\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2554\u2550\u2550\u255D    \u255A\u2588\u2588\u2554\u255D      \u2588\u2588\u2554\u2550\u2550\u255D     \u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2554\u2550\u2550\u255D").concat(colors.cyan, "     \u2551\n\u2551   ").concat(colors.yellow, "\u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551        \u2588\u2588\u2551       \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557    \u255A\u2588\u2588\u2588\u2588\u2554\u255D \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D   \u2588\u2588\u2551   \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557").concat(colors.cyan, "   \u2551\n\u2551   ").concat(colors.yellow, "\u255A\u2550\u255D   \u255A\u2550\u255D   \u255A\u2550\u255D        \u255A\u2550\u255D       \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D     \u255A\u2550\u2550\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u2550\u255D    \u255A\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D").concat(colors.cyan, "   \u2551\n\u2551                                                                           \u2551\n\u2551                    ").concat(colors.white).concat(colors.bright, "Admin Console v1.0.0").concat(colors.reset).concat(colors.cyan, "                                \u2551\n\u2551                    ").concat(colors.dim, "Management & Configuration Tool").concat(colors.reset).concat(colors.cyan, "                         \u2551\n\u2551                                                                           \u2551\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n").concat(colors.reset);
      console.log(banner);
    }

    /**
     * Get the command prompt string
     */
  }, {
    key: "getPrompt",
    value: function getPrompt() {
      var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (user) {
        var roleColor = user.role === 'super_admin' ? colors.red : colors.yellow;
        return "".concat(colors.cyan, "itfy").concat(colors.reset, ":").concat(roleColor).concat(user.name).concat(colors.reset).concat(colors.dim, "@").concat(user.role).concat(colors.reset, "> ");
      }
      return "".concat(colors.cyan, "itfy").concat(colors.reset, ":").concat(colors.dim, "guest").concat(colors.reset, "> ");
    }

    /**
     * Print colored text
     */
  }, {
    key: "print",
    value: function print(text) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'white';
      console.log("".concat(colors[color] || '').concat(text).concat(colors.reset));
    }

    /**
     * Print success message
     */
  }, {
    key: "success",
    value: function success(message) {
      console.log("".concat(colors.green).concat(icons.success, " ").concat(message).concat(colors.reset));
    }

    /**
     * Print error message
     */
  }, {
    key: "error",
    value: function error(message) {
      console.log("".concat(colors.red).concat(icons.error, " ").concat(message).concat(colors.reset));
    }

    /**
     * Print warning message
     */
  }, {
    key: "warning",
    value: function warning(message) {
      console.log("".concat(colors.yellow).concat(icons.warning, " ").concat(message).concat(colors.reset));
    }

    /**
     * Print info message
     */
  }, {
    key: "info",
    value: function info(message) {
      console.log("".concat(colors.blue).concat(icons.info, " ").concat(message).concat(colors.reset));
    }

    /**
     * Print a header
     */
  }, {
    key: "header",
    value: function header(title) {
      var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var iconStr = icon ? "".concat(icons[icon] || icon, " ") : '';
      console.log("\n".concat(colors.cyan).concat(colors.bright, "\u2550\u2550\u2550 ").concat(iconStr).concat(title, " \u2550\u2550\u2550").concat(colors.reset, "\n"));
    }

    /**
     * Print a subheader
     */
  }, {
    key: "subheader",
    value: function subheader(title) {
      console.log("".concat(colors.white).concat(colors.bright).concat(icons.arrow, " ").concat(title).concat(colors.reset));
    }

    /**
     * Print a list item
     */
  }, {
    key: "listItem",
    value: function listItem(text) {
      var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var padding = '  '.repeat(indent);
      console.log("".concat(padding).concat(colors.dim).concat(icons.bullet).concat(colors.reset, " ").concat(text));
    }

    /**
     * Print a key-value pair
     */
  }, {
    key: "keyValue",
    value: function keyValue(key, value) {
      var keyWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
      var paddedKey = key.padEnd(keyWidth);
      console.log("  ".concat(colors.cyan).concat(paddedKey).concat(colors.reset, ": ").concat(value));
    }

    /**
     * Print a table
     */
  }, {
    key: "table",
    value: function table(headers, rows) {
      var columnWidths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      // Calculate column widths if not provided
      if (!columnWidths) {
        columnWidths = headers.map(function (h, i) {
          var maxDataWidth = Math.max.apply(Math, _toConsumableArray(rows.map(function (r) {
            return String(r[i] || '').length;
          })));
          return Math.max(h.length, maxDataWidth) + 2;
        });
      }

      // Print header
      var headerRow = headers.map(function (h, i) {
        return h.padEnd(columnWidths[i]);
      }).join('│');
      var separator = columnWidths.map(function (w) {
        return '─'.repeat(w);
      }).join('┼');
      console.log("".concat(colors.cyan).concat(colors.bright).concat(headerRow).concat(colors.reset));
      console.log("".concat(colors.dim).concat(separator).concat(colors.reset));

      // Print rows
      rows.forEach(function (row) {
        var dataRow = row.map(function (cell, i) {
          return String(cell || '').padEnd(columnWidths[i]);
        }).join('│');
        console.log(dataRow);
      });
    }

    /**
     * Print a box with content
     */
  }, {
    key: "box",
    value: function box(title, content) {
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;
      var topBorder = "\u256D".concat('─'.repeat(width - 2), "\u256E");
      var bottomBorder = "\u2570".concat('─'.repeat(width - 2), "\u256F");
      var titleLine = "\u2502 ".concat(colors.bright).concat(title.padEnd(width - 4)).concat(colors.reset, " \u2502");
      var separator = "\u251C".concat('─'.repeat(width - 2), "\u2524");
      console.log("".concat(colors.cyan).concat(topBorder).concat(colors.reset));
      console.log("".concat(colors.cyan).concat(titleLine).concat(colors.reset));
      console.log("".concat(colors.cyan).concat(separator).concat(colors.reset));
      var lines = content.split('\n');
      lines.forEach(function (line) {
        var paddedLine = line.padEnd(width - 4).substring(0, width - 4);
        console.log("".concat(colors.cyan, "\u2502").concat(colors.reset, " ").concat(paddedLine, " ").concat(colors.cyan, "\u2502").concat(colors.reset));
      });
      console.log("".concat(colors.cyan).concat(bottomBorder).concat(colors.reset));
    }

    /**
     * Print a progress bar
     */
  }, {
    key: "progressBar",
    value: function progressBar(current, total) {
      var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
      var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var percentage = Math.round(current / total * 100);
      var filled = Math.round(current / total * width);
      var empty = width - filled;
      var bar = "".concat('█'.repeat(filled)).concat('░'.repeat(empty));
      var labelStr = label ? " ".concat(label) : '';
      process.stdout.write("\r".concat(colors.cyan, "[").concat(bar, "]").concat(colors.reset, " ").concat(percentage, "%").concat(labelStr));
      if (current === total) {
        console.log('');
      }
    }

    /**
     * Print a spinner (returns stop function)
     */
  }, {
    key: "spinner",
    value: function spinner(message) {
      var frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      var i = 0;
      var interval = setInterval(function () {
        process.stdout.write("\r".concat(colors.cyan).concat(frames[i]).concat(colors.reset, " ").concat(message));
        i = (i + 1) % frames.length;
      }, 80);
      return {
        stop: function stop() {
          var finalMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          clearInterval(interval);
          process.stdout.write('\r' + ' '.repeat(message.length + 4) + '\r');
          if (finalMessage) {
            console.log(finalMessage);
          }
        }
      };
    }

    /**
     * Ask a question and get input
     * FIXED: Properly handle readline interface to prevent double input display
     */
  }, {
    key: "question",
    value: (function () {
      var _question = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(prompt) {
        var _this = this;
        var options,
          _options$hidden,
          hidden,
          _options$defaultValue,
          defaultValue,
          _options$validate,
          validate,
          _args2 = arguments;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden, _options$defaultValue = options.defaultValue, defaultValue = _options$defaultValue === void 0 ? null : _options$defaultValue, _options$validate = options.validate, validate = _options$validate === void 0 ? null : _options$validate;
              return _context2.a(2, new Promise(function (resolve, reject) {
                var promptText = defaultValue ? "".concat(colors.yellow).concat(icons.arrow).concat(colors.reset, " ").concat(prompt, " ").concat(colors.dim, "[").concat(defaultValue, "]").concat(colors.reset, ": ") : "".concat(colors.yellow).concat(icons.arrow).concat(colors.reset, " ").concat(prompt, ": ");
                if (hidden) {
                  // Pause main readline to prevent conflicts
                  if (_this.mainRl) {
                    _this.mainRl.pause();
                  }

                  // For hidden input (passwords)
                  process.stdout.write(promptText);
                  var input = '';
                  var stdin = process.stdin;

                  // Save original state
                  var wasRaw = stdin.isRaw;
                  stdin.setRawMode(true);
                  stdin.resume();
                  stdin.setEncoding('utf8');
                  var _onData = function onData(_char) {
                    switch (_char) {
                      case '\n':
                      case '\r':
                      case "\x04":
                        // Ctrl+D
                        stdin.setRawMode(wasRaw);
                        stdin.pause();
                        stdin.removeListener('data', _onData);
                        console.log('');

                        // Resume main readline
                        if (_this.mainRl) {
                          _this.mainRl.resume();
                        }
                        resolve(input || defaultValue);
                        break;
                      case "\x03":
                        // Ctrl+C
                        stdin.setRawMode(wasRaw);
                        process.exit(0);
                        break;
                      case "\x7F":
                        // Backspace
                        if (input.length > 0) {
                          input = input.slice(0, -1);
                          process.stdout.write('\b \b');
                        }
                        break;
                      default:
                        input += _char;
                        process.stdout.write('*');
                        break;
                    }
                  };
                  stdin.on('data', _onData);
                } else {
                  // For normal input, create a temporary readline interface
                  // Pause main interface to prevent conflicts
                  if (_this.mainRl) {
                    _this.mainRl.pause();
                  }
                  var rl = _readline["default"].createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: true
                  });
                  rl.question(promptText, /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(answer) {
                      var result, validationResult, retryResult, _t;
                      return _regenerator().w(function (_context) {
                        while (1) switch (_context.p = _context.n) {
                          case 0:
                            rl.close();

                            // Small delay to ensure interface is fully closed
                            _context.n = 1;
                            return new Promise(function (r) {
                              return setTimeout(r, 10);
                            });
                          case 1:
                            result = answer.trim() || defaultValue;
                            if (!(validate && result)) {
                              _context.n = 6;
                              break;
                            }
                            validationResult = validate(result);
                            if (!(validationResult !== true)) {
                              _context.n = 6;
                              break;
                            }
                            _this.error(validationResult);

                            // Resume main readline before recursive call
                            if (_this.mainRl) {
                              _this.mainRl.resume();
                            }
                            _context.p = 2;
                            _context.n = 3;
                            return _this.question(prompt, options);
                          case 3:
                            retryResult = _context.v;
                            resolve(retryResult);
                            _context.n = 5;
                            break;
                          case 4:
                            _context.p = 4;
                            _t = _context.v;
                            reject(_t);
                          case 5:
                            return _context.a(2);
                          case 6:
                            // Resume main readline
                            if (_this.mainRl) {
                              _this.mainRl.resume();
                            }
                            resolve(result);
                          case 7:
                            return _context.a(2);
                        }
                      }, _callee, null, [[2, 4]]);
                    }));
                    return function (_x2) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                }
              }));
          }
        }, _callee2);
      }));
      function question(_x) {
        return _question.apply(this, arguments);
      }
      return question;
    }()
    /**
     * Ask a yes/no confirmation
     */
    )
  }, {
    key: "confirm",
    value: (function () {
      var _confirm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(message) {
        var defaultValue,
          hint,
          answer,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              defaultValue = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
              hint = defaultValue ? '[Y/n]' : '[y/N]';
              _context3.n = 1;
              return this.question("".concat(message, " ").concat(hint), {
                defaultValue: defaultValue ? 'y' : 'n'
              });
            case 1:
              answer = _context3.v;
              return _context3.a(2, ['y', 'yes', 'true', '1'].includes(answer.toLowerCase()));
          }
        }, _callee3, this);
      }));
      function confirm(_x3) {
        return _confirm.apply(this, arguments);
      }
      return confirm;
    }()
    /**
     * Show a selection menu
     */
    )
  }, {
    key: "select",
    value: (function () {
      var _select = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(message, choices) {
        var answer, num;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.info(message);
              this.newLine();
              choices.forEach(function (choice, index) {
                var num = "".concat(index + 1).padStart(2);
                console.log("  ".concat(colors.cyan).concat(num).concat(colors.reset, ". ").concat(choice.label || choice));
              });
              this.newLine();

              // Keep asking until we get a valid answer
            case 1:
              if (!true) {
                _context4.n = 5;
                break;
              }
              _context4.n = 2;
              return this.question('Enter your choice');
            case 2:
              answer = _context4.v;
              if (answer) {
                _context4.n = 3;
                break;
              }
              this.error('Please enter a number');
              return _context4.a(3, 1);
            case 3:
              num = parseInt(answer);
              if (!(isNaN(num) || num < 1 || num > choices.length)) {
                _context4.n = 4;
                break;
              }
              this.error("Please enter a number between 1 and ".concat(choices.length));
              return _context4.a(3, 1);
            case 4:
              return _context4.a(2, choices[num - 1]);
            case 5:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function select(_x4, _x5) {
        return _select.apply(this, arguments);
      }
      return select;
    }()
    /**
     * Show help for commands
     */
    )
  }, {
    key: "showHelp",
    value: function showHelp(commands) {
      var _this2 = this;
      var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (category) {
        this.header("".concat(category, " Commands"), 'gear');
      } else {
        this.header('Available Commands', 'gear');
      }
      commands.forEach(function (cmd) {
        var cmdName = "".concat(colors.yellow).concat(cmd.name).concat(colors.reset);
        var aliases = cmd.aliases ? " ".concat(colors.dim, "(").concat(cmd.aliases.join(', '), ")").concat(colors.reset) : '';
        var requiresAuth = cmd.requiresAuth ? " ".concat(colors.red).concat(icons.lock).concat(colors.reset) : '';
        var adminOnly = cmd.adminOnly ? " ".concat(colors.magenta).concat(icons.admin).concat(colors.reset) : '';
        console.log("  ".concat(cmdName).concat(aliases).concat(requiresAuth).concat(adminOnly));
        console.log("    ".concat(colors.dim).concat(cmd.description).concat(colors.reset));
        if (cmd.usage) {
          console.log("    ".concat(colors.cyan, "Usage: ").concat(cmd.usage).concat(colors.reset));
        }
        _this2.newLine();
      });
      console.log("".concat(colors.dim).concat(icons.lock, " = requires authentication  ").concat(icons.admin, " = admin only").concat(colors.reset));
    }
  }]);
}();