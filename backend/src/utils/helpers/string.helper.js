/**
 * String Helper Utility
 * Common string manipulation functions
 */

/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - The text to slugify
 * @returns {string} The slugified string
 */
export function slugify(text) {
  if (!text) return "";
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with -
    .replace(/[^\w-]+/g, "")        // Remove all non-word chars
    .replace(/-+/g, "-")            // Replace multiple - with single -
    .replace(/^-+/, "")             // Trim - from start of text
    .replace(/-+$/, "");            // Trim - from end of text
}

/**
 * Generate a random string
 * @param {number} length - The length of the string
 * @returns {string} Random string
 */
export function generateRandomString(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Capitalize first letter of a string
 * @param {string} text - The text to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(text) {
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
export function truncate(text, length = 100, suffix = "...") {
  if (!text || text.length <= length) return text || "";
  return text.substring(0, length - suffix.length) + suffix;
}

export default {
  slugify,
  generateRandomString,
  capitalize,
  truncate,
};
