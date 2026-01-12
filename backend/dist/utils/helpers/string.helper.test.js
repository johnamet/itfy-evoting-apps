/* eslint-disable no-undef */
/**
 * String Helper Tests
 * Tests common string manipulation utilities
 */

import { slugify, generateRandomString, capitalize, truncate } from "./string.helper.js";
describe("StringHelper", () => {
  // ==================== SLUGIFY ====================

  describe("slugify", () => {
    it("should convert a simple string to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
    });
    it("should convert spaces to hyphens", () => {
      expect(slugify("this is a test")).toBe("this-is-a-test");
    });
    it("should convert to lowercase", () => {
      expect(slugify("HELLO WORLD")).toBe("hello-world");
      expect(slugify("HeLLo WoRLd")).toBe("hello-world");
    });
    it("should remove special characters", () => {
      expect(slugify("Hello! World@")).toBe("hello-world");
      expect(slugify("Test#$%^&*()")).toBe("test");
    });
    it("should handle multiple spaces", () => {
      expect(slugify("hello    world")).toBe("hello-world");
    });
    it("should handle multiple hyphens", () => {
      expect(slugify("hello---world")).toBe("hello-world");
    });
    it("should trim leading and trailing hyphens", () => {
      expect(slugify("-hello world-")).toBe("hello-world");
      expect(slugify("---hello---")).toBe("hello");
    });
    it("should handle empty string", () => {
      expect(slugify("")).toBe("");
    });
    it("should handle null", () => {
      expect(slugify(null)).toBe("");
    });
    it("should handle undefined", () => {
      expect(slugify(undefined)).toBe("");
    });
    it("should handle numbers", () => {
      expect(slugify("Event 2026")).toBe("event-2026");
      expect(slugify(123)).toBe("123");
    });
    it("should handle unicode characters", () => {
      expect(slugify("Café Résumé")).toBe("caf-rsum");
    });
    it("should handle mixed content", () => {
      expect(slugify("Annual Awards 2026!")).toBe("annual-awards-2026");
      expect(slugify("Best & Greatest")).toBe("best-greatest");
    });
    it("should trim whitespace", () => {
      expect(slugify("  hello world  ")).toBe("hello-world");
    });
  });

  // ==================== GENERATE RANDOM STRING ====================

  describe("generateRandomString", () => {
    it("should generate a string of default length (10)", () => {
      const result = generateRandomString();
      expect(result).toHaveLength(10);
    });
    it("should generate a string of specified length", () => {
      expect(generateRandomString(5)).toHaveLength(5);
      expect(generateRandomString(20)).toHaveLength(20);
      expect(generateRandomString(1)).toHaveLength(1);
    });
    it("should generate alphanumeric characters only", () => {
      const result = generateRandomString(100);
      expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });
    it("should generate different strings on each call", () => {
      const results = new Set();
      for (let i = 0; i < 100; i++) {
        results.add(generateRandomString(10));
      }
      // With 62 possible chars and length 10, collisions should be extremely rare
      expect(results.size).toBeGreaterThan(95);
    });
    it("should handle zero length", () => {
      expect(generateRandomString(0)).toBe("");
    });
    it("should handle large lengths", () => {
      const result = generateRandomString(1000);
      expect(result).toHaveLength(1000);
    });
  });

  // ==================== CAPITALIZE ====================

  describe("capitalize", () => {
    it("should capitalize first letter of a word", () => {
      expect(capitalize("hello")).toBe("Hello");
    });
    it("should lowercase the rest of the string", () => {
      expect(capitalize("HELLO")).toBe("Hello");
      expect(capitalize("hELLO")).toBe("Hello");
    });
    it("should handle single character", () => {
      expect(capitalize("a")).toBe("A");
      expect(capitalize("A")).toBe("A");
    });
    it("should handle empty string", () => {
      expect(capitalize("")).toBe("");
    });
    it("should handle null", () => {
      expect(capitalize(null)).toBe("");
    });
    it("should handle undefined", () => {
      expect(capitalize(undefined)).toBe("");
    });
    it("should handle strings with spaces", () => {
      expect(capitalize("hello world")).toBe("Hello world");
    });
    it("should handle strings starting with numbers", () => {
      expect(capitalize("123abc")).toBe("123abc");
    });
    it("should handle strings with special characters", () => {
      expect(capitalize("@hello")).toBe("@hello");
    });
  });

  // ==================== TRUNCATE ====================

  describe("truncate", () => {
    it("should truncate long strings", () => {
      const longText = "This is a very long string that needs to be truncated";
      const result = truncate(longText, 20);
      expect(result).toBe("This is a very lo...");
      expect(result.length).toBe(20);
    });
    it("should not truncate strings shorter than max length", () => {
      const shortText = "Hello";
      expect(truncate(shortText, 100)).toBe("Hello");
    });
    it("should not truncate strings equal to max length", () => {
      const text = "Hello";
      expect(truncate(text, 5)).toBe("Hello");
    });
    it("should use default length of 100", () => {
      const shortText = "Short text";
      expect(truncate(shortText)).toBe("Short text");
      const longText = "A".repeat(150);
      const result = truncate(longText);
      expect(result).toHaveLength(100);
    });
    it("should use custom suffix", () => {
      const text = "This is a long text";
      const result = truncate(text, 15, "…");
      expect(result).toBe("This is a long…");
      expect(result.length).toBe(15);
    });
    it("should handle empty suffix", () => {
      const text = "This is a long text";
      const result = truncate(text, 10, "");
      expect(result).toBe("This is a ");
      expect(result.length).toBe(10);
    });
    it("should handle empty string", () => {
      expect(truncate("", 10)).toBe("");
    });
    it("should handle null", () => {
      expect(truncate(null, 10)).toBe("");
    });
    it("should handle undefined", () => {
      expect(truncate(undefined, 10)).toBe("");
    });
    it("should handle very short max length", () => {
      const text = "Hello World";
      const result = truncate(text, 5);
      expect(result).toBe("He...");
      expect(result.length).toBe(5);
    });
    it("should handle max length shorter than suffix", () => {
      const text = "Hello World";
      const result = truncate(text, 2, "...");
      // When max length is shorter than suffix, behavior may vary
      // This tests the edge case
      expect(result.length).toBeLessThanOrEqual(text.length);
    });
  });

  // ==================== INTEGRATION TESTS ====================

  describe("integration", () => {
    it("should work together for slug generation with truncation", () => {
      const longTitle = "This is a Very Long Event Title That Should Be Truncated for URL";
      const truncated = truncate(longTitle, 30, "");
      const slug = slugify(truncated);
      expect(slug.length).toBeLessThanOrEqual(30);
      expect(slug).toMatch(/^this-is-a-very-long-event/);
    });
    it("should generate unique codes with random strings", () => {
      const codes = [];
      for (let i = 0; i < 10; i++) {
        const code = `EVENT-${generateRandomString(6).toUpperCase()}`;
        codes.push(code);
      }
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(10);
    });
    it("should format display names with capitalize", () => {
      const names = ["john", "JANE", "bOB"];
      const formatted = names.map(capitalize);
      expect(formatted).toEqual(["John", "Jane", "Bob"]);
    });
  });
});