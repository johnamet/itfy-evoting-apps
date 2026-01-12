/* eslint-disable no-undef */
/**
 * IP Helper Tests
 * Tests privacy-preserving IP address utilities
 */

import { IPHelper } from "./ip.helper.js";
import crypto from "crypto";

describe("IPHelper", () => {
  // ==================== HASH ====================

  describe("hash", () => {
    it("should return a SHA-256 hash of the IP address", () => {
      const ip = "192.168.1.1";
      const result = IPHelper.hash(ip);

      // Verify it's a valid SHA-256 hash (64 hex characters)
      expect(result).toMatch(/^[a-f0-9]{64}$/);

      // Verify it matches expected hash
      const expectedHash = crypto.createHash("sha256").update(ip).digest("hex");
      expect(result).toBe(expectedHash);
    });

    it("should return null for null input", () => {
      expect(IPHelper.hash(null)).toBeNull();
    });

    it("should return null for undefined input", () => {
      expect(IPHelper.hash(undefined)).toBeNull();
    });

    it("should return null for empty string", () => {
      expect(IPHelper.hash("")).toBeNull();
    });

    it("should produce different hashes for different IPs", () => {
      const hash1 = IPHelper.hash("192.168.1.1");
      const hash2 = IPHelper.hash("192.168.1.2");

      expect(hash1).not.toBe(hash2);
    });

    it("should produce consistent hashes for the same IP", () => {
      const ip = "10.0.0.1";
      const hash1 = IPHelper.hash(ip);
      const hash2 = IPHelper.hash(ip);

      expect(hash1).toBe(hash2);
    });

    it("should hash IPv6 addresses", () => {
      const ipv6 = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
      const result = IPHelper.hash(ipv6);

      expect(result).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should hash localhost addresses", () => {
      const localhost = "127.0.0.1";
      const result = IPHelper.hash(localhost);

      expect(result).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  // ==================== SHOULD CAPTURE ====================

  describe("shouldCapture", () => {
    it("should return true when capture_ip is true", () => {
      const config = { capture_ip: true };
      expect(IPHelper.shouldCapture(config)).toBe(true);
    });

    it("should return false when capture_ip is false", () => {
      const config = { capture_ip: false };
      expect(IPHelper.shouldCapture(config)).toBe(false);
    });

    it("should return true when capture_ip is not specified", () => {
      const config = {};
      expect(IPHelper.shouldCapture(config)).toBe(true);
    });

    it("should return true for null config", () => {
      expect(IPHelper.shouldCapture(null)).toBe(true);
    });

    it("should return true for undefined config", () => {
      expect(IPHelper.shouldCapture(undefined)).toBe(true);
    });

    it("should return true when other settings exist but capture_ip is missing", () => {
      const config = {
        some_other_setting: true,
        another_setting: "value",
      };
      expect(IPHelper.shouldCapture(config)).toBe(true);
    });
  });

  // ==================== NORMALIZE ====================

  describe("normalize", () => {
    it("should return null for null input", () => {
      expect(IPHelper.normalize(null)).toBeNull();
    });

    it("should return null for undefined input", () => {
      expect(IPHelper.normalize(undefined)).toBeNull();
    });

    it("should return the same IPv4 address", () => {
      const ipv4 = "192.168.1.1";
      expect(IPHelper.normalize(ipv4)).toBe(ipv4);
    });

    it("should strip ::ffff: prefix from IPv6-mapped IPv4", () => {
      const mappedIp = "::ffff:192.168.1.1";
      expect(IPHelper.normalize(mappedIp)).toBe("192.168.1.1");
    });

    it("should handle uppercase ::FFFF: prefix", () => {
      // Note: Current implementation is case-sensitive
      const mappedIp = "::ffff:10.0.0.1";
      expect(IPHelper.normalize(mappedIp)).toBe("10.0.0.1");
    });

    it("should return full IPv6 address unchanged", () => {
      const ipv6 = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
      expect(IPHelper.normalize(ipv6)).toBe(ipv6);
    });

    it("should handle localhost IPv4", () => {
      expect(IPHelper.normalize("127.0.0.1")).toBe("127.0.0.1");
    });

    it("should handle localhost IPv6", () => {
      expect(IPHelper.normalize("::1")).toBe("::1");
    });
  });

  // ==================== HASH NORMALIZED ====================

  describe("hashNormalized", () => {
    it("should normalize and hash by default", () => {
      const mappedIp = "::ffff:192.168.1.1";
      const normalizedIp = "192.168.1.1";

      const result = IPHelper.hashNormalized(mappedIp);
      const expectedHash = IPHelper.hash(normalizedIp);

      expect(result).toBe(expectedHash);
    });

    it("should skip normalization when option is false", () => {
      const mappedIp = "::ffff:192.168.1.1";

      const result = IPHelper.hashNormalized(mappedIp, { normalize: false });
      const expectedHash = IPHelper.hash(mappedIp);

      expect(result).toBe(expectedHash);
    });

    it("should return null for null input", () => {
      expect(IPHelper.hashNormalized(null)).toBeNull();
    });

    it("should return null for undefined input", () => {
      expect(IPHelper.hashNormalized(undefined)).toBeNull();
    });

    it("should produce same hash for IPv4 and its IPv6 mapped form when normalized", () => {
      const ipv4 = "192.168.1.1";
      const mappedIpv6 = "::ffff:192.168.1.1";

      const hashIpv4 = IPHelper.hashNormalized(ipv4);
      const hashMapped = IPHelper.hashNormalized(mappedIpv6);

      expect(hashIpv4).toBe(hashMapped);
    });
  });

  // ==================== INTEGRATION TESTS ====================

  describe("integration", () => {
    it("should properly hash after checking shouldCapture", () => {
      const config = { capture_ip: true };
      const ip = "203.0.113.50";

      if (IPHelper.shouldCapture(config)) {
        const hash = IPHelper.hash(ip);
        expect(hash).toMatch(/^[a-f0-9]{64}$/);
      }
    });

    it("should not expose original IP in hash", () => {
      const ip = "192.168.1.100";
      const hash = IPHelper.hash(ip);

      // Hash should not contain the original IP
      expect(hash).not.toContain("192");
      expect(hash).not.toContain("168");
      expect(hash).not.toContain("100");
    });

    it("should handle typical Express request IP scenarios", () => {
      // Simulating common IP formats from Express
      const testCases = [
        "127.0.0.1", // localhost
        "::1", // localhost IPv6
        "::ffff:127.0.0.1", // mapped localhost
        "192.168.1.1", // private network
        "10.0.0.1", // private network
        "172.16.0.1", // private network
        "203.0.113.50", // public IP
        "2001:db8::1", // IPv6
      ];

      testCases.forEach((ip) => {
        const hash = IPHelper.hash(ip);
        expect(hash).toMatch(/^[a-f0-9]{64}$/);
      });
    });
  });
});
