/**
 * Centralized Authentication Service
 * Handles authentication for both users and candidates
 * Supports login, registration, password management, and token operations
 */

import bcrypt from "bcryptjs";
import BaseService from "../shared/base.service.js";
import UserRepository from "../user/user.repository.js";
import CandidateRepository from "../candidate/candidate.repository.js";
import AuthValidation from "./auth.validation.js";
import { AuthHelpers } from "../../utils/helpers/auth.helper.js";
import { cache } from "../../utils/cache/cache.utils.js";
import agendaManager from "../../services/agenda.service.js";
import FileService from "../../services/file.service.js";
import { STATUS } from "../../utils/constants/candidate.constants.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import {
  ERROR_MESSAGES,
  MAX_LOGIN_ATTEMPTS,
  ACCOUNT_LOCK_DURATION_MINUTES,
  JWT_EXPIRATION,
} from "../../utils/constants/auth.constants.js";

BaseService.setValidation(AuthValidation);

class AuthService extends BaseService {
  constructor() {
    super();
    this.userRepository = UserRepository;
    this.candidateRepository = CandidateRepository;
  }

  // ==================== USER AUTHENTICATION ====================

  /**
   * Register a new user
   * @param {Object} data - { name, email, password, confirmPassword, role }
   * @returns {Promise<Object>} - { user, accessToken, refreshToken }
   */
  async registerUser(data) {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.registerSchema);

      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(validated.email);
      if (existingUser) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS);
      }

      // Hash password
      const passwordHash = await AuthHelpers.hashPassword(validated.password);

      // Create user
      const user = await this.userRepository.create({
        name: validated.name,
        email: validated.email,
        password_hash: passwordHash,
        role: validated.role || ROLES.VOTER,
        email_verified: false,
      });

      // Generate verification token
      const verificationToken = await AuthHelpers.generateAndStoreVerificationToken(
        user._id.toString()
      );

      // Queue verification email
      const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
      await agendaManager.now("send-email-verification", {
        email: user.email,
        name: user.name,
        verificationUrl,
      });

      // Generate auth tokens
      const accessToken = AuthHelpers.generateToken(user._id.toString(), user.role, "access");
      const refreshToken = AuthHelpers.generateToken(user._id.toString(), user.role, "refresh");

      // Store refresh token
      await AuthHelpers.storeRefreshToken(user._id.toString(), refreshToken);

      return {
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          email_verified: user.email_verified,
        },
        accessToken,
        refreshToken,
        expiresIn: JWT_EXPIRATION.ACCESS_TOKEN,
        message: "Registration successful. Please check your email to verify your account.",
      };
    } catch (error) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  /**
   * Login user
   * @param {Object} data - { email, password }
   * @param {Object} metadata - { ip, userAgent }
   * @returns {Promise<Object>} - { user, accessToken, refreshToken }
   */
  async loginUser(data, metadata = {}) {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.loginSchema);

      // Rate limiting
      const rateLimitKey = `login_attempts:${metadata.ip || "unknown"}:${validated.email}`;
      const attempts = await cache.get(rateLimitKey);

      if (attempts && parseInt(attempts) >= MAX_LOGIN_ATTEMPTS) {
        throw new Error(`Too many login attempts. Please try again in ${ACCOUNT_LOCK_DURATION_MINUTES} minutes.`);
      }

      // Find user with password
      const user = await this.userRepository.model
        .findOne({ email: validated.email })
        .select("+password_hash +login_attempts +locked_until");

      // Use dummy hash if user doesn't exist (prevent timing attacks)
      const passwordHash =
        user?.password_hash ||
        "$2b$10$X/invalid/hash/that/will/never/match/anythingXXXXXXXXXXXXXXXXX";

      const isValid = await bcrypt.compare(validated.password, passwordHash);

      // Check if user exists AFTER password comparison (constant time)
      if (!user) {
        await this._incrementRateLimit(rateLimitKey);
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Check account lock
      if (user.locked_until && user.locked_until > new Date()) {
        const minutesLeft = Math.ceil((user.locked_until - new Date()) / 60000);
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED.replace("{duration}", minutesLeft));
      }

      // Verify password
      if (!isValid) {
        await this._handleFailedLogin(user, this.userRepository);
        await this._incrementRateLimit(rateLimitKey);
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Reset login attempts on successful login
      if (user.login_attempts > 0) {
        await this.userRepository.updateById(user._id, {
          login_attempts: 0,
          locked_until: null,
        });
      }

      // Clear rate limit
      await cache.del(rateLimitKey);

      // Update last login
      await this.userRepository.updateById(user._id, {
        last_login: new Date(),
      });

      // Generate tokens
      const accessToken = AuthHelpers.generateToken(user._id.toString(), user.role, "access");
      const refreshToken = AuthHelpers.generateToken(user._id.toString(), user.role, "refresh");

      // Store refresh token
      await AuthHelpers.storeRefreshToken(user._id.toString(), refreshToken);

      // Store device info if provided
      if (metadata.userAgent) {
        await cache.set(
          `device:${user._id}`,
          JSON.stringify({
            userAgent: metadata.userAgent,
            ip: metadata.ip,
            lastLogin: new Date(),
          }),
          "EX",
          30 * 24 * 60 * 60 // 30 days
        );
      }

      return {
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          email_verified: user.email_verified,
        },
        accessToken,
        refreshToken,
        expiresIn: JWT_EXPIRATION.ACCESS_TOKEN,
      };
    } catch (error) {
      throw new Error(`User login failed: ${error.message}`);
    }
  }

  // ==================== CANDIDATE AUTHENTICATION ====================

  /**
   * Register a new candidate (with password)
   * @param {Object} data - { name, email, password, eventId, categories, bio, phone, social_media }
   * @returns {Promise<Object>} - { candidate, accessToken, refreshToken }
   */
  async registerCandidate(data) {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.candidateRegisterSchema);

      // Check if candidate already exists
      const existingCandidate = await this.candidateRepository.findByEmail(
        validated.email,
        validated.eventId
      );
      if (existingCandidate) {
        throw new Error("A candidate with this email already exists for this event");
      }

      // Hash password
      const passwordHash = await AuthHelpers.hashPassword(validated.password);

      // Create candidate
      const candidate = await this.candidateRepository.create({
        name: validated.name,
        email: validated.email,
        password_hash: passwordHash,
        event: validated.eventId,
        categories: validated.categories,
        bio: validated.bio,
        phone: validated.phone,
        social_media: validated.social_media,
        status: STATUS.PENDING,
        is_published: false,
      });

      // Queue welcome email with candidate code
      await agendaManager.now("send-candidate-welcome-email", {
        email: candidate.email,
        name: candidate.name,
        candidateCode: candidate.candidate_code,
      });

      // Generate auth tokens
      const accessToken = AuthHelpers.generateToken(
        candidate._id.toString(),
        "candidate",
        "access"
      );
      const refreshToken = AuthHelpers.generateToken(
        candidate._id.toString(),
        "candidate",
        "refresh"
      );

      // Store refresh token
      await AuthHelpers.storeRefreshToken(candidate._id.toString(), refreshToken);

      return {
        success: true,
        candidate: {
          _id: candidate._id,
          name: candidate.name,
          email: candidate.email,
          candidate_code: candidate.candidate_code,
          status: candidate.status,
          event: candidate.event,
        },
        accessToken,
        refreshToken,
        expiresIn: JWT_EXPIRATION.ACCESS_TOKEN,
        message: "Registration successful. Your profile will be reviewed by the administrator.",
      };
    } catch (error) {
      throw new Error(`Candidate registration failed: ${error.message}`);
    }
  }

  /**
   * Login candidate (by candidate code or email)
   * @param {Object} data - { identifier, password, eventId }
   * @param {Object} metadata - { ip, userAgent }
   * @returns {Promise<Object>} - { candidate, accessToken, refreshToken }
   */
  async loginCandidate(data, metadata = {}) {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.candidateLoginSchema);

      // Rate limiting
      const rateLimitKey = `login_attempts:${metadata.ip || "unknown"}:candidate:${validated.identifier}`;
      const attempts = await cache.get(rateLimitKey);

      if (attempts && parseInt(attempts) >= MAX_LOGIN_ATTEMPTS) {
        throw new Error(`Too many login attempts. Please try again in ${ACCOUNT_LOCK_DURATION_MINUTES} minutes.`);
      }

      let candidate;

      // Check if identifier is candidate code (format: CAN-XXX-XXXX)
      if (validated.identifier.toUpperCase().startsWith("CAN-")) {
        candidate = await this.candidateRepository.model
          .findOne({ candidate_code: validated.identifier.toUpperCase() })
          .select("+password_hash +login_attempts +locked_until");
      } else {
        // Treat as email
        if (!validated.eventId) {
          throw new Error("Event ID is required for email-based login");
        }
        candidate = await this.candidateRepository.model
          .findOne({
            email: validated.identifier.toLowerCase(),
            event: validated.eventId,
          })
          .select("+password_hash +login_attempts +locked_until");
      }

      console.log("Candidate found:", candidate);

      // Use dummy hash if candidate doesn't exist (prevent timing attacks)
      const passwordHash =
        candidate?.password_hash ||
        "$2b$10$X/invalid/hash/that/will/never/match/anythingXXXXXXXXXXXXXXXXX";

      console.log("Using password hash:", validated.password, passwordHash);
      const isValid = await AuthHelpers.comparePassword(validated.password, passwordHash);
      console.log("Password valid:", isValid);

      // Check if candidate exists AFTER password comparison (constant time)
      if (!candidate) {
        await this._incrementRateLimit(rateLimitKey);
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Check account lock
      if (candidate.locked_until && candidate.locked_until > new Date()) {
        const minutesLeft = Math.ceil((candidate.locked_until - new Date()) / 60000);
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED.replace("{duration}", minutesLeft));
      }

      // Verify password
      if (!isValid) {
        await this._handleFailedLogin(candidate, this.candidateRepository);
        await this._incrementRateLimit(rateLimitKey);
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Check if candidate is approved or has pending profile update
      if (
        candidate.status !== STATUS.APPROVED &&
        candidate.status !== STATUS.PROFILE_UPDATE_PENDING
      ) {
        throw new Error(
          `Account is ${candidate.status}. Please contact the event administrator.`
        );
      }

      // Reset login attempts on successful login
      if (candidate.login_attempts > 0) {
        await this.candidateRepository.updateById(candidate._id, {
          login_attempts: 0,
          locked_until: null,
        });
      }

      // Clear rate limit
      await cache.del(rateLimitKey);

      // Update last login
      await this.candidateRepository.updateLastLogin(candidate._id);

      // Generate tokens
      const accessToken = AuthHelpers.generateToken(
        candidate._id.toString(),
        "candidate",
        "access"
      );
      const refreshToken = AuthHelpers.generateToken(
        candidate._id.toString(),
        "candidate",
        "refresh"
      );

      // Store refresh token
      await AuthHelpers.storeRefreshToken(candidate._id.toString(), refreshToken);

      // Store device info if provided
      if (metadata.userAgent) {
        await cache.set(
          `device:candidate:${candidate._id}`,
          JSON.stringify({
            userAgent: metadata.userAgent,
            ip: metadata.ip,
            lastLogin: new Date(),
          }),
          "EX",
          30 * 24 * 60 * 60 // 30 days
        );
      }

      return {
        success: true,
        candidate: {
          _id: candidate._id,
          name: candidate.name,
          email: candidate.email,
          candidate_code: candidate.candidate_code,
          status: candidate.status,
          event: candidate.event,
          is_published: candidate.is_published,
          profile_image: FileService.getFileUrl(candidate.profile_image),
          cover_image: FileService.getFileUrl(candidate.cover_image),
          gallery: FileService.getFileUrls(candidate.gallery),
        },
        accessToken,
        refreshToken,
        expiresIn: JWT_EXPIRATION.ACCESS_TOKEN,
      };
    } catch (error) {
      throw new Error(`Candidate login failed: ${error.message}`);
    }
  }

  // ==================== PASSWORD MANAGEMENT ====================

  /**
   * Change password (for authenticated user or candidate)
   * @param {string} userId - User or candidate ID
   * @param {Object} data - { currentPassword, newPassword, confirmPassword }
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async changePassword(userId, data, userType = "user") {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.changePasswordSchema);

      const repository = userType === "candidate" ? this.candidateRepository : this.userRepository;

      // Get user/candidate with password
      const account = await repository.model.findById(userId).select("+password_hash");

      if (!account) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      // Verify current password
      const isValidPassword = await AuthHelpers.comparePassword(
        validated.currentPassword,
        account.password_hash
      )

      if (!isValidPassword) {
        throw new Error("Current password is incorrect");
      }

      // Check if new password is same as current
      const isSamePassword = await AuthHelpers.comparePassword(validated.newPassword, account.password_hash);

      if (isSamePassword) {
        throw new Error("New password must be different from current password");
      }

      // Hash new password
      const hashedPassword = await AuthHelpers.hashPassword(validated.newPassword);

      // Update password
      await repository.updateById(userId, {
        password_hash: hashedPassword,
      });

      // Invalidate all refresh tokens (force re-login on other devices)
      await AuthHelpers.deleteRefreshToken(userId);

      // Queue confirmation email
      await agendaManager.now("send-password-changed-email", {
        email: account.email,
        name: account.name,
      });

      return {
        success: true,
        message: "Password changed successfully. Please login with your new password.",
      };
    } catch (error) {
      throw new Error(`Change password failed: ${error.message}`);
    }
  }

  /**
   * Request password reset (forgot password)
   * @param {Object} data - { email }
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async requestPasswordReset(data, userType = "user") {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.forgotPasswordSchema);

      const repository = userType === "candidate" ? this.candidateRepository : this.userRepository;

      const account = await repository.findByEmail(validated.email);

      // Return success to prevent email enumeration
      if (!account) {
        // Still wait a bit to prevent timing attacks
        await new Promise((resolve) => setTimeout(resolve, 100));
        return {
          success: true,
          message: "If an account exists with this email, a reset link has been sent.",
        };
      }

      // Generate reset token
      const resetToken = await AuthHelpers.generateAndStoreResetToken(account._id.toString());
      const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/${userType === "candidate" ? "candidate" : "user"}/reset-password?token=${resetToken}`;

      // Queue reset email
      await agendaManager.now("send-password-reset-email", {
        email: account.email,
        name: account.name,
        resetUrl,
      });

      return {
        success: true,
        message: "If an account exists with this email, a reset link has been sent.",
      };
    } catch (error) {
      throw new Error(`Request password reset failed: ${error.message}`);
    }
  }

  /**
   * Reset password using token
   * @param {Object} data - { token, password, confirmPassword }
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async resetPassword(data, userType = "user") {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.resetPasswordSchema);

      // Get user ID from reset token
      const userId = await AuthHelpers.getUserIdFromResetToken(validated.token);

      if (!userId) {
        throw new Error(ERROR_MESSAGES.PASSWORD_RESET_TOKEN_EXPIRED);
      }

      // Verify JWT signature
      const payload = AuthHelpers.verifyToken(validated.token);

      if (!payload || payload.sub !== userId) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      const repository = userType === "candidate" ? this.candidateRepository : this.userRepository;

      const account = await repository.findById(userId);

      if (!account) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      // Hash new password
      const hashedPassword = await AuthHelpers.hashPassword(validated.password);

      // Update password
      await repository.updateById(userId, {
        password_hash: hashedPassword,
        login_attempts: 0,
        locked_until: null,
      });

      // Delete reset token
      await AuthHelpers.deleteResetToken(validated.token);

      // Invalidate all refresh tokens
      await AuthHelpers.deleteRefreshToken(userId);

      // Queue confirmation email
      await agendaManager.now("send-password-changed-email", {
        email: account.email,
        name: account.name,
      });

      return {
        success: true,
        message: "Password reset successfully. Please login with your new password.",
      };
    } catch (error) {
      throw new Error(`Reset password failed: ${error.message}`);
    }
  }

  // ==================== CURRENT USER ====================

  /**
   * Get current user or candidate profile
   * @param {string} userId - User or candidate ID
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async getCurrentUser(userId, userType = "user") {
    try {
      const repository = userType === "candidate" ? this.candidateRepository : this.userRepository;

      const account = await repository.findById(userId);

      if (!account) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      // Return sanitized user data
      if (userType === "candidate") {
        return {
          _id: account._id,
          name: account.name,
          email: account.email,
          candidate_code: account.candidate_code,
          status: account.status,
          event: account.event,
          categories: account.categories,
          bio: account.bio,
          phone: account.phone,
          social_media: account.social_media,
          profile_image: FileService.getFileUrl(account.profile_image),
          cover_image: FileService.getFileUrl(account.cover_image),
          gallery: FileService.getFileUrls(account.gallery),
          is_published: account.is_published,
          total_votes: account.total_votes,
          created_at: account.created_at,
          updated_at: account.updated_at,
        };
      }

      return {
        _id: account._id,
        name: account.name,
        email: account.email,
        role: account.role,
        email_verified: account.email_verified,
        profile_image: FileService.getFileUrl(account.profile_image),
        created_at: account.created_at,
        updated_at: account.updated_at,
      };
    } catch (error) {
      throw new Error(`Get current user failed: ${error.message}`);
    }
  }

  // ==================== TOKEN MANAGEMENT ====================

  /**
   * Refresh access token using refresh token
   * @param {Object} data - { refreshToken }
   * @returns {Promise<Object>} - { accessToken, refreshToken }
   */
  async refreshToken(data) {
    data.refresh_token = data.refreshToken; // Normalize key for validation
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.refreshTokenSchema);

      // Verify token signature
      const payload = AuthHelpers.verifyToken(validated.refreshToken);

      if (!payload) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      const userId = payload.sub;
      const role = payload.role;

      // Get stored refresh token
      const storedToken = await AuthHelpers.getStoredRefreshToken(userId);

      if (storedToken !== validated.refreshToken) {
        // Possible token theft - invalidate all tokens
        await AuthHelpers.deleteRefreshToken(userId);
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      // Determine repository
      const repository = role === "candidate" ? this.candidateRepository : this.userRepository;

      // Verify account still exists
      const account = await repository.findById(userId);

      if (!account) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      // Generate new tokens
      const newAccessToken = AuthHelpers.generateToken(userId, role, "access");
      const newRefreshToken = AuthHelpers.generateToken(userId, role, "refresh");

      // Store new refresh token
      await AuthHelpers.storeRefreshToken(userId, newRefreshToken);

      return {
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: JWT_EXPIRATION.ACCESS_TOKEN,
      };
    } catch (error) {
      throw new Error(`Refresh token failed: ${error.message}`);
    }
  }

  /**
   * Refresh access token using refresh token (alias for controller compatibility)
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<Object>} - { accessToken, refreshToken }
   */
  async refreshAccessToken(refreshToken) {
    return this.refreshToken({ refreshToken });
  }

  /**
   * Logout user or candidate
   * @param {string} userId - User or candidate ID
   * @param {Object} data - { refresh_token, access_token }
   * @returns {Promise<Object>}
   */
  async logout(userId, data = {}) {
    try {
      const validated = this.validate(data, AuthValidation.logoutSchema);

      // Delete refresh token
      if (validated.refresh_token) {
        await AuthHelpers.deleteRefreshToken(userId);
      }

      // Blacklist access token
      if (validated.access_token) {
        try {
          const payload = AuthHelpers.verifyToken(validated.access_token);
          const ttl = payload.exp - Math.floor(Date.now() / 1000);

          if (ttl > 0) {
            await AuthHelpers.blacklistToken(validated.accessToken, ttl);
          }
        } catch (error) {
          // Token already invalid, no need to blacklist
        }
      }

      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  /**
   * Logout user (alias for controller compatibility)
   * @param {string} userId - User ID
   * @param {string} refreshToken - Refresh token to invalidate
   * @returns {Promise<Object>}
   */
  async logoutUser(userId, refreshToken) {
    return this.logout(userId, { refresh_token: refreshToken });
  }

  /**
   * Logout candidate (alias for controller compatibility)
   * @param {string} candidateId - Candidate ID
   * @param {string} refreshToken - Refresh token to invalidate
   * @returns {Promise<Object>}
   */
  async logoutCandidate(candidateId, refreshToken) {
    return this.logout(candidateId, { refresh_token: refreshToken });
  }

  // ==================== EMAIL VERIFICATION ====================

  /**
   * Verify email using token
   * @param {Object} data - { token }
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async verifyEmail(data, userType = "user") {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.verifyEmailSchema);

      // Get user ID from verification token
      const userId = await AuthHelpers.getUserIdFromVerificationToken(validated.token);

      if (!userId) {
        throw new Error(ERROR_MESSAGES.TOKEN_EXPIRED);
      }

      // Verify JWT signature
      const payload = AuthHelpers.verifyToken(validated.token);

      if (!payload || payload.sub !== userId) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
      }

      const repository = userType === "candidate" ? this.candidateRepository : this.userRepository;

      const account = await repository.findById(userId);

      if (!account) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      if (account.email_verified) {
        throw new Error(ERROR_MESSAGES.EMAIL_ALREADY_VERIFIED);
      }

      // Update account
      await repository.updateById(userId, {
        email_verified: true,
        email_verified_at: new Date(),
      });

      // Delete verification token
      await AuthHelpers.deleteVerificationToken(validated.token);

      return {
        success: true,
        message: "Email verified successfully",
      };
    } catch (error) {
      throw new Error(`Email verification failed: ${error.message}`);
    }
  }

  /**
   * Resend verification email
   * @param {Object} data - { email }
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async resendVerification(data, userType = "user") {
    try {
      // Validate input
      const validated = this.validate(data, AuthValidation.resendVerificationSchema);

      const repository = userType === "candidate" ? this.candidateRepository : this.userRepository;

      const account = await repository.findByEmail(validated.email);

      // Return success to prevent email enumeration
      if (!account) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return {
          success: true,
          message: "If an account exists with this email, a verification link has been sent.",
        };
      }

      // Check if already verified
      if (account.email_verified) {
        return {
          success: true,
          message: "Email is already verified.",
        };
      }

      // Generate verification token
      const verificationToken = await AuthHelpers.generateAndStoreVerificationToken(
        account._id.toString()
      );
      const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/${userType === "candidate" ? "candidate" : "user"}/verify-email?token=${verificationToken}`;

      // Queue verification email
      await agendaManager.now("send-email-verification", {
        email: account.email,
        name: account.name,
        verificationUrl,
      });

      return {
        success: true,
        message: "If an account exists with this email, a verification link has been sent.",
      };
    } catch (error) {
      throw new Error(`Resend verification failed: ${error.message}`);
    }
  }

  /**
   * Resend verification email (alias for controller compatibility)
   * @param {string} email - User email
   * @param {string} userType - 'user' or 'candidate'
   * @returns {Promise<Object>}
   */
  async resendVerificationEmail(email, userType = "user") {
    return this.resendVerification({ email }, userType);
  }

  // ==================== PRIVATE HELPERS ====================

  /**
   * Handle failed login attempt
   * @param {Object} account - User or candidate document
   * @param {Object} repository - Repository instance
   * @private
   */
  async _handleFailedLogin(account, repository) {
    const attempts = (account.login_attempts || 0) + 1;
    const updates = { login_attempts: attempts };

    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      updates.locked_until = new Date(Date.now() + ACCOUNT_LOCK_DURATION_MINUTES * 60000);

      // Queue account locked email
      await agendaManager.now("send-account-locked-email", {
        email: account.email,
        name: account.name,
        duration: ACCOUNT_LOCK_DURATION_MINUTES,
      });
    }

    await repository.updateById(account._id, updates);
  }

  /**
   * Increment rate limit counter
   * @param {string} key - Cache key
   * @private
   */
  async _incrementRateLimit(key) {
    const current = await cache.get(key);

    if (!current) {
      await cache.set(key, "1", "EX", ACCOUNT_LOCK_DURATION_MINUTES * 60); // 15 minutes
    } else {
      await cache.incr(key);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { AuthService };
export default new AuthService();
