"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authController = _interopRequireDefault(require("./auth.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Authentication Routes
 * Defines all authentication-related endpoints for users and candidates
 */

var router = (0, _express.Router)();

// ==================== USER AUTHENTICATION ====================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post("/register", (0, _authMiddleware.authRateLimit)(10, 60),
// 10 attempts per hour
function (req, res) {
  return _authController["default"].register(req, res);
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user with email and password
 * @access  Public
 */
router.post("/login", (0, _authMiddleware.authRateLimit)(5, 15),
// 5 attempts per 15 minutes
(0, _activityLoggerMiddleware.logAuth)(_activityConstants.ACTION_TYPE.LOGIN), function (req, res) {
  return _authController["default"].login(req, res);
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and invalidate tokens
 * @access  Private (authenticated)
 */
router.post("/logout", _authMiddleware.authenticate, (0, _activityLoggerMiddleware.logAuth)(_activityConstants.ACTION_TYPE.LOGOUT), function (req, res) {
  return _authController["default"].logout(req, res);
});

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token using refresh token
 * @access  Public (with valid refresh token)
 */
router.post("/refresh-token", function (req, res) {
  return _authController["default"].refreshToken(req, res);
});

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify user email with token
 * @access  Public
 */
router.post("/verify-email", function (req, res) {
  return _authController["default"].verifyEmail(req, res);
});

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend email verification link
 * @access  Public
 */
router.post("/resend-verification", (0, _authMiddleware.authRateLimit)(3, 15),
// 3 attempts per 15 minutes
function (req, res) {
  return _authController["default"].resendVerification(req, res);
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
router.post("/forgot-password", (0, _authMiddleware.authRateLimit)(3, 15),
// 3 attempts per 15 minutes
function (req, res) {
  return _authController["default"].forgotPassword(req, res);
});

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password using token
 * @access  Public
 */
router.post("/reset-password", (0, _authMiddleware.authRateLimit)(5, 15),
// 5 attempts per 15 minutes
function (req, res) {
  return _authController["default"].resetPassword(req, res);
});

/**
 * @route   POST /api/auth/change-password
 * @desc    Change password (authenticated user)
 * @access  Private (authenticated)
 */
router.post("/change-password", _authMiddleware.authenticate, function (req, res) {
  return _authController["default"].changePassword(req, res);
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user profile
 * @access  Private (authenticated)
 */
router.get("/me", _authMiddleware.authenticate, function (req, res) {
  return _authController["default"].me(req, res);
});

// ==================== CANDIDATE AUTHENTICATION ====================

/**
 * @route   POST /api/auth/candidate/login
 * @desc    Login candidate with code/email and password
 * @access  Public
 */
router.post("/candidate/login", (0, _authMiddleware.authRateLimit)(5, 15), (0, _activityLoggerMiddleware.logAuth)(_activityConstants.ACTION_TYPE.LOGIN), function (req, res) {
  return _authController["default"].candidateLogin(req, res);
});

/**
 * @route   POST /api/auth/candidate/logout
 * @desc    Logout candidate and invalidate tokens
 * @access  Private (authenticated candidate)
 */
router.post("/candidate/logout", _authMiddleware.authenticateCandidate, (0, _activityLoggerMiddleware.logAuth)(_activityConstants.ACTION_TYPE.LOGOUT), function (req, res) {
  return _authController["default"].candidateLogout(req, res);
});

/**
 * @route   POST /api/auth/candidate/change-password
 * @desc    Change password for authenticated candidate
 * @access  Private (authenticated candidate)
 */
router.post("/candidate/change-password", _authMiddleware.authenticateCandidate, function (req, res) {
  return _authController["default"].candidateChangePassword(req, res);
});

/**
 * @route   POST /api/auth/candidate/forgot-password
 * @desc    Request password reset for candidate
 * @access  Public
 */
router.post("/candidate/forgot-password", (0, _authMiddleware.authRateLimit)(3, 15), function (req, res) {
  return _authController["default"].candidateForgotPassword(req, res);
});

/**
 * @route   POST /api/auth/candidate/reset-password
 * @desc    Reset candidate password using token
 * @access  Public
 */
router.post("/candidate/reset-password", (0, _authMiddleware.authRateLimit)(5, 15), function (req, res) {
  return _authController["default"].candidateResetPassword(req, res);
});

/**
 * @route   GET /api/auth/candidate/me
 * @desc    Get current authenticated candidate profile
 * @access  Private (authenticated candidate)
 */
router.get("/candidate/me", _authMiddleware.authenticateCandidate, function (req, res) {
  return _authController["default"].candidateMe(req, res);
});
var _default = exports["default"] = router;