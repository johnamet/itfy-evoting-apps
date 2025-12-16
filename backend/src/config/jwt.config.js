/**
 * JWT Configuration
 * Central configuration for JSON Web Token settings
 */

// eslint-disable-next-line no-undef
const getEnv = (key, defaultValue) => process.env[key] || defaultValue;

export const JWT_CONFIG = {
  // Secret key for signing tokens - MUST be set in production
  SECRET_KEY: getEnv("JWT_SECRET", "your-super-secret-key-change-in-production"),
  
  // Refresh token secret (separate for added security)
  REFRESH_SECRET_KEY: getEnv("JWT_REFRESH_SECRET", "your-refresh-secret-key-change-in-production"),
  
  // Algorithm for signing
  ALGORITHM: "HS256",
  
  // Token issuer
  ISSUER: getEnv("JWT_ISSUER", "itfy-evoting"),
  
  // Token audience
  AUDIENCE: getEnv("JWT_AUDIENCE", "itfy-evoting-app"),
  
  // Default token options
  TOKEN_OPTIONS: {
    // Additional options passed to jwt.sign()
  },
  
  // Custom claims configuration
  CUSTOM_CLAIMS: {
    includeStatus: true,
    permissions: true,
  },
  
  // Token expiration times (in seconds or string format)
  EXPIRATION: {
    ACCESS_TOKEN: getEnv("JWT_ACCESS_EXPIRATION", "15m"),
    REFRESH_TOKEN: getEnv("JWT_REFRESH_EXPIRATION", "7d"),
    RESET_TOKEN: getEnv("JWT_RESET_EXPIRATION", "1h"),
    VERIFICATION_TOKEN: getEnv("JWT_VERIFICATION_EXPIRATION", "24h"),
  },
};

export default JWT_CONFIG;
