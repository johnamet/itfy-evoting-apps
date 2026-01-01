"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IPHelper = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * IP Address Helper Utility
 * Provides standardized IP address hashing and configuration checking
 * for privacy-preserving IP storage across the application
 */
var IPHelper = exports.IPHelper = /*#__PURE__*/function () {
  function IPHelper() {
    _classCallCheck(this, IPHelper);
  }
  return _createClass(IPHelper, null, [{
    key: "hash",
    value:
    /**
     * Hash an IP address using SHA-256 for privacy-preserving storage
     * @param {string} ip - The IP address to hash
     * @returns {string|null} - The hashed IP or null if no IP provided
     */
    function hash(ip) {
      if (!ip) return null;
      return _crypto["default"].createHash("sha256").update(ip).digest("hex");
    }

    /**
     * Check if IP should be captured based on configuration
     * @param {Object} config - Event or form configuration object
     * @returns {boolean} - Whether IP should be captured
     */
  }, {
    key: "shouldCapture",
    value: function shouldCapture(config) {
      return (config === null || config === void 0 ? void 0 : config.capture_ip) !== false;
    }

    /**
     * Normalize IP address (handle IPv6 mapped IPv4, etc.)
     * @param {string} ip - The IP address to normalize
     * @returns {string|null} - The normalized IP or null
     */
  }, {
    key: "normalize",
    value: function normalize(ip) {
      if (!ip) return null;

      // Handle IPv6 mapped IPv4 addresses (e.g., ::ffff:192.168.1.1)
      if (ip.startsWith("::ffff:")) {
        return ip.substring(7);
      }
      return ip;
    }

    /**
     * Hash IP with optional normalization
     * @param {string} ip - The IP address to hash
     * @param {Object} options - Options object
     * @param {boolean} options.normalize - Whether to normalize before hashing (default: true)
     * @returns {string|null} - The hashed IP or null
     */
  }, {
    key: "hashNormalized",
    value: function hashNormalized(ip) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        normalize: true
      };
      if (!ip) return null;
      var normalizedIp = options.normalize ? this.normalize(ip) : ip;
      return this.hash(normalizedIp);
    }
  }]);
}();
var _default = exports["default"] = IPHelper;