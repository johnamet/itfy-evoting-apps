/**
 * Authentication Routes
 * Defines all authentication-related endpoints for users and candidates
 */

import { Router } from "express";
import AuthController from "./auth.controller.js";
import {
  authenticate,
  authenticateCandidate,
  authRateLimit,
} from "../../middleware/auth.middleware.js";
import { logAuth } from "../../middleware/activity-logger.middleware.js";
import { ACTION_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== USER AUTHENTICATION ====================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
router.post(
  "/register",
  authRateLimit(10, 60), // 10 attempts per hour
  (req, res) => AuthController.register(req, res)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user with email and password
 * @access  Public
 */
router.post(
  "/login",
  authRateLimit(5, 15), // 5 attempts per 15 minutes
  logAuth(ACTION_TYPE.LOGIN),
  (req, res) => AuthController.login(req, res)
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and invalidate tokens
 * @access  Private (authenticated)
 */
router.post(
  "/logout",
  authenticate,
  logAuth(ACTION_TYPE.LOGOUT),
  (req, res) => AuthController.logout(req, res)
);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token using refresh token
 * @access  Public (with valid refresh token)
 */
router.post(
  "/refresh-token",
  (req, res) => AuthController.refreshToken(req, res)
);

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify user email with token
 * @access  Public
 */
router.post(
  "/verify-email",
  (req, res) => AuthController.verifyEmail(req, res)
);

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend email verification link
 * @access  Public
 */
router.post(
  "/resend-verification",
  authRateLimit(3, 15), // 3 attempts per 15 minutes
  (req, res) => AuthController.resendVerification(req, res)
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset email
 * @access  Public
 */
router.post(
  "/forgot-password",
  authRateLimit(3, 15), // 3 attempts per 15 minutes
  (req, res) => AuthController.forgotPassword(req, res)
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password using token
 * @access  Public
 */
router.post(
  "/reset-password",
  authRateLimit(5, 15), // 5 attempts per 15 minutes
  (req, res) => AuthController.resetPassword(req, res)
);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change password (authenticated user)
 * @access  Private (authenticated)
 */
router.post(
  "/change-password",
  authenticate,
  (req, res) => AuthController.changePassword(req, res)
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user profile
 * @access  Private (authenticated)
 */
router.get(
  "/me",
  authenticate,
  (req, res) => AuthController.me(req, res)
);

// ==================== CANDIDATE AUTHENTICATION ====================

/**
 * @route   POST /api/auth/candidate/login
 * @desc    Login candidate with code/email and password
 * @access  Public
 */
router.post(
  "/candidate/login",
  authRateLimit(5, 15),
  logAuth(ACTION_TYPE.LOGIN),
  (req, res) => AuthController.candidateLogin(req, res)
);

/**
 * @route   POST /api/auth/candidate/logout
 * @desc    Logout candidate and invalidate tokens
 * @access  Private (authenticated candidate)
 */
router.post(
  "/candidate/logout",
  authenticateCandidate,
  logAuth(ACTION_TYPE.LOGOUT),
  (req, res) => AuthController.candidateLogout(req, res)
);

/**
 * @route   POST /api/auth/candidate/change-password
 * @desc    Change password for authenticated candidate
 * @access  Private (authenticated candidate)
 */
router.post(
  "/candidate/change-password",
  authenticateCandidate,
  (req, res) => AuthController.candidateChangePassword(req, res)
);


/**
 * @route   POST /api/auth/candidate/forgot-password
 * @desc    Request password reset for candidate
 * @access  Public
 */
router.post(
  "/candidate/forgot-password",
  authRateLimit(3, 15),
  (req, res) => AuthController.candidateForgotPassword(req, res)
);

/**
 * @route   POST /api/auth/candidate/reset-password
 * @desc    Reset candidate password using token
 * @access  Public
 */
router.post(
  "/candidate/reset-password",
  authRateLimit(5, 15),
  (req, res) => AuthController.candidateResetPassword(req, res)
);

/**
 * @route   GET /api/auth/candidate/me
 * @desc    Get current authenticated candidate profile
 * @access  Private (authenticated candidate)
 */
router.get(
  "/candidate/me",
  authenticateCandidate,
  (req, res) => AuthController.candidateMe(req, res)
);

export default router;
