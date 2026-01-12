/* eslint-disable no-undef */
/**
 * Auth Helper Tests
 * Tests JWT token management, password hashing, and authentication utilities
 */

// Mock cache module before importing AuthHelpers
// Define inline because jest.mock is hoisted
jest.mock("../../utils/cache/cache.utils.js", () => ({
  get: jest.fn(),
  set: jest.fn().mockResolvedValue("OK"),
  del: jest.fn().mockResolvedValue(1)
}));

// Mock JWT config
jest.mock("../../config/jwt.config.js", () => ({
  JWT_CONFIG: {
    SECRET_KEY: "test-secret-key-for-testing-purposes-only-must-be-long",
    ALGORITHM: "HS256",
    ISSUER: "test-issuer",
    AUDIENCE: "test-audience",
    TOKEN_OPTIONS: {},
    CUSTOM_CLAIMS: {
      includeStatus: true,
      permissions: true
    }
  }
}));
import { AuthHelpers } from "./auth.helper.js";
import cache from "../../utils/cache/cache.utils.js";
describe("AuthHelpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==================== TOKEN GENERATION ====================

  describe("generateToken", () => {
    it("should generate a valid JWT access token", () => {
      const userId = "user123";
      const role = "voter";
      const token = AuthHelpers.generateToken(userId, role, "access");
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      // JWT format: header.payload.signature
      expect(token.split(".")).toHaveLength(3);
    });
    it("should generate different tokens for different users", () => {
      const token1 = AuthHelpers.generateToken("user1", "voter", "access");
      const token2 = AuthHelpers.generateToken("user2", "voter", "access");
      expect(token1).not.toBe(token2);
    });
    it("should generate different tokens for different roles", () => {
      const token1 = AuthHelpers.generateToken("user1", "voter", "access");
      const token2 = AuthHelpers.generateToken("user1", "admin", "access");
      expect(token1).not.toBe(token2);
    });
    it("should generate different tokens for different types", () => {
      const accessToken = AuthHelpers.generateToken("user1", "voter", "access");
      const refreshToken = AuthHelpers.generateToken("user1", "voter", "refresh");
      expect(accessToken).not.toBe(refreshToken);
    });
    it("should support all token types", () => {
      const tokenTypes = ["access", "refresh", "reset", "verification"];
      tokenTypes.forEach(type => {
        const token = AuthHelpers.generateToken("user1", "voter", type);
        expect(token).toBeDefined();
        expect(token.split(".")).toHaveLength(3);
      });
    });
  });

  // ==================== TOKEN VERIFICATION ====================

  describe("verifyToken", () => {
    it("should verify a valid token", () => {
      const userId = "user123";
      const role = "voter";
      const token = AuthHelpers.generateToken(userId, role, "access");
      const payload = AuthHelpers.verifyToken(token);
      expect(payload.sub).toBe(userId);
      expect(payload.role).toBe(role);
    });
    it("should throw error for invalid token", () => {
      expect(() => {
        AuthHelpers.verifyToken("invalid.token.here");
      }).toThrow("Token verification failed");
    });
    it("should throw error for tampered token", () => {
      const token = AuthHelpers.generateToken("user123", "voter", "access");
      const tamperedToken = token.slice(0, -5) + "xxxxx";
      expect(() => {
        AuthHelpers.verifyToken(tamperedToken);
      }).toThrow("Token verification failed");
    });
    it("should include custom claims in payload", () => {
      const token = AuthHelpers.generateToken("user123", "admin", "access");
      const payload = AuthHelpers.verifyToken(token);
      expect(payload.status).toBe("active");
      expect(payload.permissions).toBeDefined();
    });
  });

  // ==================== PASSWORD HASHING ====================

  describe("hashPassword", () => {
    it("should hash a password", async () => {
      const password = "SecurePass@123";
      const hash = await AuthHelpers.hashPassword(password);
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      // bcrypt hashes start with $2b$
      expect(hash).toMatch(/^\$2[aby]?\$/);
    });
    it("should produce different hashes for same password", async () => {
      const password = "SecurePass@123";
      const hash1 = await AuthHelpers.hashPassword(password);
      const hash2 = await AuthHelpers.hashPassword(password);

      // Due to salt, hashes should be different
      expect(hash1).not.toBe(hash2);
    });
    it("should produce different hashes for different passwords", async () => {
      const hash1 = await AuthHelpers.hashPassword("Password1!");
      const hash2 = await AuthHelpers.hashPassword("Password2!");
      expect(hash1).not.toBe(hash2);
    });
  });
  describe("comparePassword", () => {
    it("should return true for matching password", async () => {
      const password = "SecurePass@123";
      const hash = await AuthHelpers.hashPassword(password);
      const result = await AuthHelpers.comparePassword(password, hash);
      expect(result).toBe(true);
    });
    it("should return false for non-matching password", async () => {
      const password = "SecurePass@123";
      const hash = await AuthHelpers.hashPassword(password);
      const result = await AuthHelpers.comparePassword("WrongPassword!", hash);
      expect(result).toBe(false);
    });
    it("should handle empty password comparison", async () => {
      const hash = await AuthHelpers.hashPassword("SecurePass@123");
      const result = await AuthHelpers.comparePassword("", hash);
      expect(result).toBe(false);
    });
  });

  // ==================== REFRESH TOKEN MANAGEMENT ====================

  describe("storeRefreshToken", () => {
    it("should store refresh token in cache", async () => {
      const userId = "user123";
      const refreshToken = "refresh-token-value";
      await AuthHelpers.storeRefreshToken(userId, refreshToken);
      expect(cache.set).toHaveBeenCalledWith(`refresh:${userId}`, refreshToken, "EX", expect.any(Number));
    });
  });
  describe("getStoredRefreshToken", () => {
    it("should retrieve stored refresh token", async () => {
      cache.get.mockResolvedValueOnce("stored-refresh-token");
      const result = await AuthHelpers.getStoredRefreshToken("user123");
      expect(result).toBe("stored-refresh-token");
      expect(cache.get).toHaveBeenCalledWith("refresh:user123");
    });
    it("should return null for non-existent token", async () => {
      cache.get.mockResolvedValueOnce(null);
      const result = await AuthHelpers.getStoredRefreshToken("nonexistent");
      expect(result).toBeNull();
    });
  });
  describe("deleteRefreshToken", () => {
    it("should delete refresh token from cache", async () => {
      await AuthHelpers.deleteRefreshToken("user123");
      expect(cache.del).toHaveBeenCalledWith("refresh:user123");
    });
  });

  // ==================== PASSWORD RESET TOKEN ====================

  describe("generateAndStoreResetToken", () => {
    it("should generate and store a reset token", async () => {
      const userId = "user123";
      const token = await AuthHelpers.generateAndStoreResetToken(userId);
      expect(token).toBeDefined();
      expect(cache.set).toHaveBeenCalledWith(expect.stringContaining("reset:"), userId, "EX", expect.any(Number));
    });
  });
  describe("getUserIdFromResetToken", () => {
    it("should retrieve user ID from reset token", async () => {
      cache.get.mockResolvedValueOnce("user123");
      const result = await AuthHelpers.getUserIdFromResetToken("reset-token");
      expect(result).toBe("user123");
      expect(cache.get).toHaveBeenCalledWith("reset:reset-token");
    });
  });
  describe("deleteResetToken", () => {
    it("should delete reset token", async () => {
      await AuthHelpers.deleteResetToken("reset-token");
      expect(cache.del).toHaveBeenCalledWith("reset:reset-token");
    });
  });

  // ==================== EMAIL VERIFICATION TOKEN ====================

  describe("generateAndStoreVerificationToken", () => {
    it("should generate and store verification token", async () => {
      const userId = "user123";
      const token = await AuthHelpers.generateAndStoreVerificationToken(userId);
      expect(token).toBeDefined();
      expect(cache.set).toHaveBeenCalledWith(expect.stringContaining("verify:"), userId, "EX", expect.any(Number));
    });
  });
  describe("getUserIdFromVerificationToken", () => {
    it("should retrieve user ID from verification token", async () => {
      cache.get.mockResolvedValueOnce("user123");
      const result = await AuthHelpers.getUserIdFromVerificationToken("verify-token");
      expect(result).toBe("user123");
      expect(cache.get).toHaveBeenCalledWith("verify:verify-token");
    });
  });
  describe("deleteVerificationToken", () => {
    it("should delete verification token", async () => {
      await AuthHelpers.deleteVerificationToken("verify-token");
      expect(cache.del).toHaveBeenCalledWith("verify:verify-token");
    });
  });

  // ==================== TOKEN BLACKLISTING ====================

  describe("blacklistToken", () => {
    it("should blacklist a token with default TTL", async () => {
      const token = "token-to-blacklist";
      await AuthHelpers.blacklistToken(token);
      expect(cache.set).toHaveBeenCalledWith(`blacklist:${token}`, "1", "EX", 7 * 24 * 60 * 60 // 7 days in seconds
      );
    });
    it("should blacklist a token with custom TTL", async () => {
      const token = "token-to-blacklist";
      const customTtl = 3600; // 1 hour

      await AuthHelpers.blacklistToken(token, customTtl);
      expect(cache.set).toHaveBeenCalledWith(`blacklist:${token}`, "1", "EX", customTtl);
    });
  });
  describe("isTokenBlacklisted", () => {
    it("should return true for blacklisted token", async () => {
      cache.get.mockResolvedValueOnce("1");
      const result = await AuthHelpers.isTokenBlacklisted("blacklisted-token");
      expect(result).toBe(true);
    });
    it("should return false for non-blacklisted token", async () => {
      cache.get.mockResolvedValueOnce(null);
      const result = await AuthHelpers.isTokenBlacklisted("valid-token");
      expect(result).toBe(false);
    });
    it("should return false on cache error", async () => {
      cache.get.mockRejectedValueOnce(new Error("Cache error"));
      const result = await AuthHelpers.isTokenBlacklisted("any-token");
      expect(result).toBe(false);
    });
  });

  // ==================== PRIVATE HELPERS ====================

  describe("_parseJwtExpiry", () => {
    it("should parse seconds", () => {
      expect(AuthHelpers._parseJwtExpiry("30s")).toBe(30);
    });
    it("should parse minutes", () => {
      expect(AuthHelpers._parseJwtExpiry("15m")).toBe(15 * 60);
    });
    it("should parse hours", () => {
      expect(AuthHelpers._parseJwtExpiry("1h")).toBe(3600);
      expect(AuthHelpers._parseJwtExpiry("24h")).toBe(24 * 3600);
    });
    it("should parse days", () => {
      expect(AuthHelpers._parseJwtExpiry("7d")).toBe(7 * 86400);
    });
    it("should return default for invalid format", () => {
      expect(AuthHelpers._parseJwtExpiry("invalid")).toBe(3600);
      expect(AuthHelpers._parseJwtExpiry("")).toBe(3600);
    });
  });
  describe("_getDefaultPermissions", () => {
    it("should return correct permissions for admin", () => {
      const permissions = AuthHelpers._getDefaultPermissions("admin");
      expect(permissions).toEqual(["read", "write", "update"]);
    });
    it("should return correct permissions for organiser", () => {
      const permissions = AuthHelpers._getDefaultPermissions("organiser");
      expect(permissions).toEqual(["read", "write", "update"]);
    });
    it("should return correct permissions for moderator", () => {
      const permissions = AuthHelpers._getDefaultPermissions("moderator");
      expect(permissions).toEqual(["read", "update"]);
    });
    it("should return correct permissions for super_admin", () => {
      const permissions = AuthHelpers._getDefaultPermissions("super_admin");
      expect(permissions).toEqual(["super"]);
    });
    it("should return default permissions for unknown role", () => {
      const permissions = AuthHelpers._getDefaultPermissions("unknown");
      expect(permissions).toEqual(["read"]);
    });
    it("should return default permissions for voter", () => {
      const permissions = AuthHelpers._getDefaultPermissions("voter");
      expect(permissions).toEqual(["read"]);
    });
  });

  // ==================== INTEGRATION TESTS ====================

  describe("integration", () => {
    it("should complete full authentication flow", async () => {
      const userId = "user123";
      const role = "voter";

      // 1. Generate tokens
      const accessToken = AuthHelpers.generateToken(userId, role, "access");
      const refreshToken = AuthHelpers.generateToken(userId, role, "refresh");

      // 2. Store refresh token
      await AuthHelpers.storeRefreshToken(userId, refreshToken);

      // 3. Verify access token
      const payload = AuthHelpers.verifyToken(accessToken);
      expect(payload.sub).toBe(userId);

      // 4. Get stored refresh token
      cache.get.mockResolvedValueOnce(refreshToken);
      const storedToken = await AuthHelpers.getStoredRefreshToken(userId);
      expect(storedToken).toBe(refreshToken);

      // 5. Logout - delete and blacklist
      await AuthHelpers.deleteRefreshToken(userId);
      await AuthHelpers.blacklistToken(accessToken);
      expect(cache.del).toHaveBeenCalledWith(`refresh:${userId}`);
      expect(cache.set).toHaveBeenCalledWith(`blacklist:${accessToken}`, "1", "EX", expect.any(Number));
    });
    it("should complete password reset flow", async () => {
      const userId = "user123";

      // 1. Generate reset token
      const resetToken = await AuthHelpers.generateAndStoreResetToken(userId);
      expect(resetToken).toBeDefined();

      // 2. Verify reset token retrieves user ID
      cache.get.mockResolvedValueOnce(userId);
      const retrievedUserId = await AuthHelpers.getUserIdFromResetToken(resetToken);
      expect(retrievedUserId).toBe(userId);

      // 3. Hash new password
      const newPassword = "NewSecurePass@456";
      const hash = await AuthHelpers.hashPassword(newPassword);
      expect(hash).toBeDefined();

      // 4. Verify new password matches
      const matches = await AuthHelpers.comparePassword(newPassword, hash);
      expect(matches).toBe(true);

      // 5. Delete reset token after use
      await AuthHelpers.deleteResetToken(resetToken);
      expect(cache.del).toHaveBeenCalled();
    });
  });
});