/**
 * Auth Controller
 * Handles HTTP requests for authentication operations
 */

import BaseController from "../shared/base.controller.js";
import AuthService from "./auth.service.js";
import AuthValidation from "./auth.validation.js";

class AuthController extends BaseController {
  constructor(dependencies = {}) {
    super({
      authService: dependencies.authService || AuthService,
    });
  }

  // ==================== USER AUTHENTICATION ====================

  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register(req, res) {
    const validated = this.validate(req.body, AuthValidation.registerSchema);
    const result = await this.service("authService").registerUser(validated);

    return this.created(res, {
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
      },
      message: result.message,
    });
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  async login(req, res) {
    const validated = this.validate(req.body, AuthValidation.loginSchema);
    const result = await this.service("authService").loginUser(validated, {
      ipAddress: this.getClientIP(req),
      userAgent: req.headers["user-agent"],
    });

    return this.success(res, {
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
      },
      message: "Login successful",
    });
  }

  /**
   * Logout user
   * POST /api/auth/logout
   */
  async logout(req, res) {
    const userId = this.getUserId(req);
    const refreshToken = req.body.refreshToken;

    await this.service("authService").logoutUser(userId, refreshToken);

    return this.success(res, {
      message: "Logged out successfully",
    });
  }

  /**
   * Refresh access token
   * POST /api/auth/refresh-token
   */
  async refreshToken(req, res) {
    const validated = this.validate(req.body, AuthValidation.refreshTokenSchema);
    const result = await this.service("authService").refreshAccessToken(validated.refreshToken);

    return this.success(res, {
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
      },
      message: "Token refreshed successfully",
    });
  }

  /**
   * Verify email
   * POST /api/auth/verify-email
   */
  async verifyEmail(req, res) {
    const validated = this.validate(req.body, AuthValidation.verifyEmailSchema);
    await this.service("authService").verifyEmail(validated.token);

    return this.success(res, {
      message: "Email verified successfully",
    });
  }

  /**
   * Resend verification email
   * POST /api/auth/resend-verification
   */
  async resendVerification(req, res) {
    const validated = this.validate(req.body, AuthValidation.resendVerificationSchema);
    await this.service("authService").resendVerificationEmail(validated.email);

    return this.success(res, {
      message: "Verification email sent",
    });
  }

  /**
   * Request password reset
   * POST /api/auth/forgot-password
   */
  async forgotPassword(req, res) {
    const validated = this.validate(req.body, AuthValidation.forgotPasswordSchema);
    await this.service("authService").requestPasswordReset(validated, "user");

    return this.success(res, {
      message: "If an account exists with this email, a password reset link has been sent",
    });
  }

  /**
   * Reset password
   * POST /api/auth/reset-password
   */
  async resetPassword(req, res) {
    const validated = this.validate(req.body, AuthValidation.resetPasswordSchema);
    await this.service("authService").resetPassword(validated, "user");

    return this.success(res, {
      message: "Password reset successfully",
    });
  }

  /**
   * Change password (authenticated)
   * POST /api/auth/change-password
   */
  async changePassword(req, res) {
    const userId = this.getUserId(req);
    const validated = this.validate(req.body, AuthValidation.changePasswordSchema);
    await this.service("authService").changePassword(userId, validated, "user");

    return this.success(res, {
      message: "Password changed successfully",
    });
  }

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  async me(req, res) {
    const userId = this.getUserId(req);
    const user = await this.service("authService").getCurrentUser(userId, "user");

    return this.success(res, {
      data: user,
    });
  }

  // ==================== CANDIDATE AUTHENTICATION ====================

  /**
   * Candidate login
   * POST /api/auth/candidate/login
   */
  async candidateLogin(req, res) {
    const validated = this.validate(req.body, AuthValidation.candidateLoginSchema);
    const result = await this.service("authService").loginCandidate(validated, {
      ipAddress: this.getClientIP(req),
      userAgent: req.headers["user-agent"],
    });

    return this.success(res, {
      data: {
        candidate: result.candidate,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
      },
      message: "Login successful",
    });
  }

  /**
   * Candidate logout
   * POST /api/auth/candidate/logout
   */
  async candidateLogout(req, res) {
    const candidateId = this.getUserId(req);
    const refreshToken = req.body.refreshToken;

    await this.service("authService").logoutCandidate(candidateId, refreshToken);

    return this.success(res, {
      message: "Logged out successfully",
    });
  }

  /**
   * Candidate forgot password
   * POST /api/auth/candidate/forgot-password
   */
  async candidateForgotPassword(req, res) {
    const validated = this.validate(req.body, AuthValidation.forgotPasswordSchema);
    await this.service("authService").requestPasswordReset(validated, "candidate");

    return this.success(res, {
      message: "If an account exists with this email, a password reset link has been sent",
    });
  }

  /**
   * Candidate reset password
   * POST /api/auth/candidate/reset-password
   */
  async candidateResetPassword(req, res) {
    const validated = this.validate(req.body, AuthValidation.resetPasswordSchema);
    await this.service("authService").resetPassword(validated, "candidate");

    return this.success(res, {
      message: "Password reset successfully",
    });
  }

  /**
   * Get current candidate profile
   * GET /api/auth/candidate/me
   */
  async candidateMe(req, res) {
    const candidateId = this.getUserId(req);
    const candidate = await this.service("authService").getCurrentUser(candidateId, "candidate");

    return this.success(res, {
      data: candidate,
    });
  }
}

// Export both class and singleton instance
export { AuthController };
export default new AuthController();
