/**
 * IP Address Helper Utility
 * Provides standardized IP address hashing and configuration checking
 * for privacy-preserving IP storage across the application
 */

import crypto from "crypto";

export class IPHelper {
  /**
   * Hash an IP address using SHA-256 for privacy-preserving storage
   * @param {string} ip - The IP address to hash
   * @returns {string|null} - The hashed IP or null if no IP provided
   */
  static hash(ip) {
    if (!ip) return null;
    return crypto.createHash("sha256").update(ip).digest("hex");
  }

  /**
   * Check if IP should be captured based on configuration
   * @param {Object} config - Event or form configuration object
   * @returns {boolean} - Whether IP should be captured
   */
  static shouldCapture(config) {
    return config?.capture_ip !== false;
  }

  /**
   * Normalize IP address (handle IPv6 mapped IPv4, etc.)
   * @param {string} ip - The IP address to normalize
   * @returns {string|null} - The normalized IP or null
   */
  static normalize(ip) {
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
  static hashNormalized(ip, options = { normalize: true }) {
    if (!ip) return null;
    const normalizedIp = options.normalize ? this.normalize(ip) : ip;
    return this.hash(normalizedIp);
  }
}

export default IPHelper;
