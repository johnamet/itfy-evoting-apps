/**
 * User Service
 * Business logic for user management
 */

import BaseService from "../shared/base.service.js";
import UserRepository from "./user.repository.js";
import ActivityService from "../activity/activity.service.js";
import EmailService from "../../services/email.service.js";
import NotificationService from "../../services/notification.service.js";
import { AuthHelpers } from "../../utils/helpers/auth.helper.js";
import { ROLES, PERMISSIONS, STATUS } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";
import { NOTIFICATION_TYPE } from "../../utils/constants/notification.constants.js";

class UserService extends BaseService {
  constructor() {
    super(UserRepository);
  }

  // ==================== USER MANAGEMENT ====================

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string|mongoose.Types.ObjectId} [creatorId] - ID of admin creating the user
   * @returns {Promise<Object>} - Created user
   */
  async createUser(userData, creatorId = null) {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error("Invalid email format");
      }

      // Validate role
      if (!Object.values(ROLES).includes(userData.role)) {
        throw new Error(`Invalid role: ${userData.role}`);
      }

      // Hash password if provided as plain text
      if (userData.password && !userData.password_hash) {
        userData.password_hash = await AuthHelpers.hashPassword(userData.password);
        delete userData.password;
      }

      // Set default permissions based on role
      if (!userData.permissions || userData.permissions.length === 0) {
        userData.permissions = this._getDefaultPermissions(userData.role);
      }

      // Set default status
      if (!userData.status) {
        userData.status = STATUS.ACTIVE;
      }

      // Create user
      const user = await this.repository.create(userData);

      // Send welcome email
      await EmailService.sendEmail({
        to: user.email,
        subject: "Welcome to ITFY E-Voting Platform",
        template: "welcome",
        context: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

      // Log activity
      if (creatorId) {
        await ActivityService.log({
          userId: creatorId,
          action: ACTION_TYPE.USER_CREATED,
          entityType: ENTITY_TYPE.USER,
          entityId: user._id,
          description: `Created user: ${user.email} with role ${user.role}`,
          metadata: { userEmail: user.email, userRole: user.role },
        });
      }

      return user;
    } catch (error) {
      throw new Error(`Create user failed: ${error.message}`);
    }
  }

  /**
   * Update user profile
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {Object} updateData - Update data
   * @param {string|mongoose.Types.ObjectId} [updaterId] - ID of admin updating the user
   * @returns {Promise<Object>} - Updated user
   */
  async updateUser(userId, updateData, updaterId = null) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      // Prevent email changes (security)
      if (updateData.email && updateData.email !== user.email) {
        throw new Error("Email cannot be changed. Contact administrator.");
      }

      // Prevent direct password_hash updates
      if (updateData.password_hash) {
        delete updateData.password_hash;
      }

      // Prevent direct role updates (use updateUserRole)
      if (updateData.role) {
        delete updateData.role;
      }

      const updated = await this.repository.updateById(userId, updateData);

      // Log activity
      if (updaterId) {
        await ActivityService.log({
          userId: updaterId,
          action: ACTION_TYPE.USER_UPDATED,
          entityType: ENTITY_TYPE.USER,
          entityId: userId,
          description: `Updated user: ${user.email}`,
          metadata: { changes: Object.keys(updateData) },
        });
      }

      return updated;
    } catch (error) {
      throw new Error(`Update user failed: ${error.message}`);
    }
  }

  /**
   * Update user role
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string} newRole - New role
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID performing the action
   * @returns {Promise<Object>} - Updated user
   */
  async updateUserRole(userId, newRole, adminId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      // Validate new role
      if (!Object.values(ROLES).includes(newRole)) {
        throw new Error(`Invalid role: ${newRole}`);
      }

      // Prevent self role change for super admins
      if (userId.toString() === adminId.toString() && user.role === ROLES.SUPER_ADMIN) {
        throw new Error("Super admins cannot change their own role");
      }

      // Update role and permissions
      const newPermissions = this._getDefaultPermissions(newRole);
      
      const updated = await this.repository.updateById(userId, {
        role: newRole,
        permissions: newPermissions,
      });

      // Notify user of role change
      await NotificationService.sendNotification({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_ROLE_UPDATED,
        title: "Your Role Has Been Updated",
        message: `Your role has been changed from ${user.role} to ${newRole}`,
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_ROLE_UPDATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Changed user role from ${user.role} to ${newRole}`,
        metadata: { oldRole: user.role, newRole, userEmail: user.email },
      });

      return updated;
    } catch (error) {
      throw new Error(`Update user role failed: ${error.message}`);
    }
  }

  /**
   * Change user password
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} - Updated user
   */
  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await this.repository.findById(userId, { select: "+password_hash" });
      
      if (!user) {
        throw new Error("User not found");
      }

      // Verify old password
      const isValid = await AuthHelpers.comparePassword(oldPassword, user.password_hash);
      
      if (!isValid) {
        throw new Error("Current password is incorrect");
      }

      // Validate new password strength
      if (newPassword.length < 8) {
        throw new Error("New password must be at least 8 characters long");
      }

      // Hash new password
      const newPasswordHash = await AuthHelpers.hashPassword(newPassword);

      // Update password
      const updated = await this.repository.updateById(userId, {
        password_hash: newPasswordHash,
      });

      // Send security notification
      await EmailService.sendEmail({
        to: user.email,
        subject: "Password Changed Successfully",
        template: "password-changed",
        context: {
          name: user.name,
          email: user.email,
          changeDate: new Date(),
        },
      });

      // Log activity
      await ActivityService.log({
        userId: userId,
        action: ACTION_TYPE.PASSWORD_CHANGED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: "User changed their password",
      });

      return updated;
    } catch (error) {
      throw new Error(`Change password failed: ${error.message}`);
    }
  }

  /**
   * Reset user password (admin action)
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string} newPassword - New password
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated user
   */
  async resetPassword(userId, newPassword, adminId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      // Hash new password
      const newPasswordHash = await AuthHelpers.hashPassword(newPassword);

      // Update password
      const updated = await this.repository.updateById(userId, {
        password_hash: newPasswordHash,
      });

      // Send notification
      await EmailService.sendEmail({
        to: user.email,
        subject: "Your Password Has Been Reset",
        template: "password-reset",
        context: {
          name: user.name,
          email: user.email,
          temporaryPassword: newPassword,
        },
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.PASSWORD_RESET,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Admin reset password for user: ${user.email}`,
        metadata: { userEmail: user.email },
      });

      return updated;
    } catch (error) {
      throw new Error(`Reset password failed: ${error.message}`);
    }
  }

  /**
   * Deactivate user account
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @param {string} [reason] - Reason for deactivation
   * @returns {Promise<Object>} - Updated user
   */
  async deactivateUser(userId, adminId, reason = null) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      if (user.status === STATUS.INACTIVE) {
        throw new Error("User is already inactive");
      }

      const updated = await this.repository.updateById(userId, {
        status: STATUS.INACTIVE,
      });

      // Notify user
      await NotificationService.sendNotification({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_DEACTIVATED,
        title: "Account Deactivated",
        message: reason || "Your account has been deactivated. Contact support for more information.",
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_DEACTIVATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Deactivated user: ${user.email}`,
        metadata: { reason, userEmail: user.email },
      });

      return updated;
    } catch (error) {
      throw new Error(`Deactivate user failed: ${error.message}`);
    }
  }

  /**
   * Activate user account
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated user
   */
  async activateUser(userId, adminId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      if (user.status === STATUS.ACTIVE) {
        throw new Error("User is already active");
      }

      const updated = await this.repository.updateById(userId, {
        status: STATUS.ACTIVE,
      });

      // Notify user
      await NotificationService.sendNotification({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_ACTIVATED,
        title: "Account Activated",
        message: "Your account has been activated. You can now access the platform.",
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_ACTIVATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Activated user: ${user.email}`,
        metadata: { userEmail: user.email },
      });

      return updated;
    } catch (error) {
      throw new Error(`Activate user failed: ${error.message}`);
    }
  }

  // ==================== QUERY METHODS ====================

  /**
   * Get user by ID
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - User
   */
  async getUserById(userId, options = {}) {
    try {
      return await this.repository.findById(userId, options);
    } catch (error) {
      throw new Error(`Get user by ID failed: ${error.message}`);
    }
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - User
   */
  async getUserByEmail(email, options = {}) {
    try {
      return await this.repository.findByEmail(email, options);
    } catch (error) {
      throw new Error(`Get user by email failed: ${error.message}`);
    }
  }

  /**
   * Search users
   * @param {string} searchTerm - Search term
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated users
   */
  async searchUsers(searchTerm, page = 1, limit = 20, options = {}) {
    try {
      return await this.repository.searchUsers(searchTerm, page, limit, options);
    } catch (error) {
      throw new Error(`Search users failed: ${error.message}`);
    }
  }

  /**
   * Get users by role
   * @param {string} role - User role
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated users
   */
  async getUsersByRole(role, page = 1, limit = 20, options = {}) {
    try {
      return await this.repository.findAll(
        { role },
        page,
        limit,
        { ...options, sort: { created_at: -1 } }
      );
    } catch (error) {
      throw new Error(`Get users by role failed: ${error.message}`);
    }
  }

  /**
   * Get user statistics
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @returns {Promise<Object>} - User statistics
   */
  async getUserStatistics(userId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      // Get activity count
      const activityCount = await ActivityService.repository.count({ userId });

      // Return statistics
      return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        emailVerified: user.email_verified,
        lastLogin: user.last_login,
        loginAttempts: user.login_attempts,
        activityCount,
        createdAt: user.created_at,
      };
    } catch (error) {
      throw new Error(`Get user statistics failed: ${error.message}`);
    }
  }

  // ==================== HELPER METHODS ====================

  /**
   * Get default permissions for a role
   * @private
   * @param {string} role - User role
   * @returns {Array<string>} - Default permissions
   */
  _getDefaultPermissions(role) {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return Object.values(PERMISSIONS);
      case ROLES.ADMIN:
        return [
          PERMISSIONS.READ,
          PERMISSIONS.WRITE,
          PERMISSIONS.UPDATE,
          PERMISSIONS.DELETE,
        ];
      case ROLES.MODERATOR:
        return [PERMISSIONS.READ, PERMISSIONS.WRITE, PERMISSIONS.UPDATE];
      case ROLES.USER:
      default:
        return [PERMISSIONS.READ];
    }
  }
}

export default new UserService();
