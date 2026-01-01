"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports["default"] = void 0;
exports.generateRandomString = generateRandomString;
exports.slugify = slugify;
exports.truncate = truncate;
/**
 * String Helper Utility
 * Common string manipulation functions
 */

/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to slugify
 * @returns {string} The slugified string
 */
function slugify(text) {
  if (!text) return "";
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-") // Replace spaces with -
  .replace(/[^\w-]+/g, "") // Remove all non-word chars
  .replace(/-+/g, "-") // Replace multiple - with single -
  .replace(/^-+/, "") // Trim - from start of text
  .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Generate a random string
 * @param {number} length - The length of the string
 * @returns {string} Random string
 */
function generateRandomString() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Capitalize first letter of a string
 * @param {string} text - The text to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Truncate a string to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length
 * @param {string} suffix - Suffix to add if truncated (default: "...")
 * @returns {string} Truncated string
 */
function truncate(text) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
  if (!text || text.length <= length) return text || "";
  return text.substring(0, length - suffix.length) + suffix;
}
var _default = exports["default"] = {
  slugify: slugify,
  generateRandomString: generateRandomString,
  capitalize: capitalize,
  truncate: truncate
};