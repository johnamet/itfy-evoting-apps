/* eslint-disable no-undef */
/**
 * User Service
 * Business logic for user management
 */

import BaseService from "../shared/base.service.js";
import UserRepository from "./user.repository.js";
import UserValidation from "./user.validation.js";
import ActivityService from "../activity/activity.service.js";
import EmailService from "../../services/email.service.js";
import NotificationService from "../../services/notification.service.js";
import { AuthHelpers } from "../../utils/helpers/auth.helper.js";
import { ROLES, PERMISSIONS, STATUS } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";
import { NOTIFICATION_TYPE } from "../../utils/constants/notification.constants.js";
import agendaManager from "../../services/agenda.service.js";

// Register validation class with BaseService
BaseService.setValidation(UserValidation);

class UserService extends BaseService {
  constructor(dependencies = {}) {
    super();
    this.repository = dependencies.repository || UserRepository;
    this.activityService = dependencies.activityService || ActivityService;
    this.emailService = dependencies.emailService || EmailService;
    this.notificationService = dependencies.notificationService || NotificationService;
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
      // Validate input data
      const validated = this.validate(userData, UserValidation.createUserSchema);

      // Hash password
      validated.password_hash = await AuthHelpers.hashPassword(validated.password);
      delete validated.password;

      // Set default permissions based on role if not provided
      if (!validated.permissions || validated.permissions.length === 0) {
        validated.permissions = this._getDefaultPermissions(validated.role);
      }

      // Create user
      const user = await this.repository.create(validated);

      // Send welcome email via agenda job
      await agendaManager.now('send email', {
        to: user.email,
        subject: "Welcome to ITFY E-Voting Platform",
        template: "welcome",
        context: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

      // Log activity (fire-and-forget)
      if (creatorId) {
        this.activityService.log({
          userId: creatorId,
          action: ACTION_TYPE.USER_CREATED,
          entityType: ENTITY_TYPE.USER,
          entityId: user._id,
          description: `Created user: ${user.email} with role ${user.role}`,
          metadata: { userEmail: user.email, userRole: user.role },
        }).catch(err => console.error("Activity log failed:", err));
      }

      return user;
    } catch (error) {
      throw new Error(`Create user failed: ${error.message}`);
    }
  }

  /**
   * Find all users with filters and options
   * @param {Object} filters - Query filters
   * @param {Object} options - Query options (skip, limit, sort, etc.)
   * @returns {Promise<Array>} - List of users
   */
  async findAll(filters = {}, options = {}) {
    try {
      const { skip = 0, limit = 10, sort = '-created_at', ...queryOptions } = options;
      const page = Math.floor(skip / limit) + 1;
      
      const result = await this.repository.findAll(filters, page, limit, { sort, ...queryOptions });
      return result.data;
    } catch (error) {
      throw new Error(`Find all users failed: ${error.message}`);
    }
  }

  /**
   * Count users matching filters
   * @param {Object} filters - Query filters
   * @returns {Promise<number>} - Count of users
   */
  async count(filters = {}) {
    try {
      return await this.repository.count(filters);
    } catch (error) {
      throw new Error(`Count users failed: ${error.message}`);
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
      // Validate input data
      const validated = this.validate(updateData, UserValidation.updateUserSchema);

      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      const updated = await this.repository.updateById(userId, validated);

      // Log activity (fire-and-forget)
      if (updaterId) {
        this.activityService.log({
          userId: updaterId,
          action: ACTION_TYPE.USER_UPDATED,
          entityType: ENTITY_TYPE.USER,
          entityId: userId,
          description: `Updated user: ${user.email}`,
          metadata: { changes: Object.keys(updateData) },
        }).catch(err => console.error("Activity log failed:", err));
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
      // Validate input
      const { role } = this.validate({ role: newRole }, UserValidation.updateRoleSchema);

      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      // Prevent self role change for super admins
      if (userId.toString() === adminId.toString() && user.role === ROLES.SUPER_ADMIN) {
        throw new Error("Super admins cannot change their own role");
      }

      // Update role and permissions
      const newPermissions = this._getDefaultPermissions(role);
      
      const updated = await this.repository.updateById(userId, {
        role,
        permissions: newPermissions,
      });

      // Notify user of role change
      await NotificationService.create({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_ROLE_UPDATED,
        title: "Your Role Has Been Updated",
        message: `Your role has been changed from ${user.role} to ${role}`,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_ROLE_UPDATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Changed user role from ${user.role} to ${role}`,
        metadata: { oldRole: user.role, newRole: role, userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

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
      // Validate input
      const validated = this.validate(
        { current_password: oldPassword, new_password: newPassword, confirm_password: newPassword },
        UserValidation.changePasswordSchema
      );

      const user = await this.repository.findById(userId, { select: "+password_hash" });
      
      if (!user) {
        throw new Error("User not found");
      }

      // Verify old password
      const isValid = await AuthHelpers.comparePassword(validated.current_password, user.password_hash);
      
      if (!isValid) {
        throw new Error("Current password is incorrect");
      }

      // Hash new password
      const newPasswordHash = await AuthHelpers.hashPassword(validated.new_password);

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

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: userId,
        action: ACTION_TYPE.PASSWORD_CHANGED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: "User changed their password",
      }).catch(err => console.error("Activity log failed:", err));

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
      // Validate input
      const validated = this.validate({ new_password: newPassword }, UserValidation.resetPasswordSchema);

      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      // Hash new password
      const newPasswordHash = await AuthHelpers.hashPassword(validated.new_password);

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

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.PASSWORD_RESET,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Admin reset password for user: ${user.email}`,
        metadata: { userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

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
      // Validate input
      const validated = this.validate({ reason }, UserValidation.deactivateUserSchema);

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
      await NotificationService.create({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_DEACTIVATED,
        title: "Account Deactivated",
        message: validated.reason || "Your account has been deactivated. Contact support for more information.",
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_DEACTIVATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Deactivated user: ${user.email}`,
        metadata: { reason: validated.reason, userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

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
      await NotificationService.create({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_ACTIVATED,
        title: "Account Activated",
        message: "Your account has been activated. You can now access the platform.",
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_ACTIVATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Activated user: ${user.email}`,
        metadata: { userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

      return updated;
    } catch (error) {
      throw new Error(`Activate user failed: ${error.message}`);
    }
  }

  /**
   * Suspend user account
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string} reason - Suspension reason
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated user
   */
  async suspendUser(userId, reason, adminId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      if (user.status === STATUS.SUSPENDED) {
        throw new Error("User is already suspended");
      }

      const updated = await this.repository.updateById(userId, {
        status: STATUS.SUSPENDED,
      });

      // Notify user
      await NotificationService.create({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_SUSPENDED,
        title: "Account Suspended",
        message: reason || "Your account has been suspended. Contact support for more information.",
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_SUSPENDED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Suspended user: ${user.email}`,
        metadata: { reason, userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

      return updated;
    } catch (error) {
      throw new Error(`Suspend user failed: ${error.message}`);
    }
  }

  /**
   * Reactivate suspended user account
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated user
   */
  async reactivateUser(userId, adminId) {
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
      await NotificationService.create({
        userId: userId,
        type: NOTIFICATION_TYPE.USER_ACTIVATED,
        title: "Account Reactivated",
        message: "Your account has been reactivated. You can now access the platform.",
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_ACTIVATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Reactivated user: ${user.email}`,
        metadata: { userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

      return updated;
    } catch (error) {
      throw new Error(`Reactivate user failed: ${error.message}`);
    }
  }

  /**
   * Force verify user email (admin action)
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated user
   */
  async forceVerifyEmail(userId, adminId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      if (user.email_verified) {
        throw new Error("User email is already verified");
      }

      const updated = await this.repository.updateById(userId, {
        email_verified: true,
        email_verified_at: new Date(),
      });

      // Notify user
      await NotificationService.create({
        userId: userId,
        type: NOTIFICATION_TYPE.SYSTEM,
        title: "Email Verified",
        message: "Your email has been verified by an administrator.",
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_UPDATED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Force verified email for user: ${user.email}`,
        metadata: { userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

      return updated;
    } catch (error) {
      throw new Error(`Force verify email failed: ${error.message}`);
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
      // Validate search parameters
      const validated = this.validate(
        { search_term: searchTerm, page, limit },
        UserValidation.searchSchema
      );

      return await this.repository.searchUsers(
        validated.search_term,
        validated.page,
        validated.limit,
        options
      );
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
   * Get overall user statistics (admin dashboard)
   * @returns {Promise<Object>} - Aggregate user statistics
   */
  async getUserStats() {
    try {
      // Get total counts by status
      const totalUsers = await this.repository.count({});
      const activeUsers = await this.repository.count({ status: STATUS.ACTIVE });
      const inactiveUsers = await this.repository.count({ status: STATUS.INACTIVE });
      const suspendedUsers = await this.repository.count({ status: STATUS.SUSPENDED });

      // Get counts by role
      const superAdmins = await this.repository.count({ role: ROLES.SUPER_ADMIN });
      const admins = await this.repository.count({ role: ROLES.ADMIN });
      const moderators = await this.repository.count({ role: ROLES.MODERATOR });
      const voters = await this.repository.count({ role: ROLES.VOTER || ROLES.USER });

      // Get verified vs unverified
      const verifiedUsers = await this.repository.count({ email_verified: true });
      const unverifiedUsers = await this.repository.count({ email_verified: false });

      // Get recent registrations (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentRegistrations = await this.repository.count({
        created_at: { $gte: sevenDaysAgo }
      });

      // Get recent logins (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const recentLogins = await this.repository.count({
        last_login: { $gte: oneDayAgo }
      });

      return {
        total: totalUsers,
        byStatus: {
          active: activeUsers,
          inactive: inactiveUsers,
          suspended: suspendedUsers,
        },
        byRole: {
          superAdmin: superAdmins,
          admin: admins,
          moderator: moderators,
          voter: voters,
        },
        verification: {
          verified: verifiedUsers,
          unverified: unverifiedUsers,
        },
        activity: {
          recentRegistrations,
          recentLogins,
        },
      };
    } catch (error) {
      throw new Error(`Get user stats failed: ${error.message}`);
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

  /**
   * Delete user by ID (soft delete)
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Deleted user
   */
  async deleteUser(userId, adminId) {
    try {
      const user = await this.repository.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }

      const deleted = await this.repository.deleteUser(userId);

      // Notify user of deletion
      await agendaManager.now('send email', {
        to: user.email,
        subject: "Account Deleted",
        template: "account-deleted",
        context: {
          name: user.name,
          email: user.email,
        },
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_DELETED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Deleted user: ${user.email}`,
        metadata: { userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

      return deleted;
    } catch (error) {
      throw new Error(`Delete user failed: ${error.message}`);
    }
  }

  /**
   * Restore soft-deleted user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Restored user
   */
  async restoreUser(userId, adminId) {
    try {
      const user = await this.repository.findById(userId, { includeDeleted: true });
      
      if (!user) {
        throw new Error("User not found");
      }

      const restored = await this.repository.restoreUser(userId);

      //Email user of restoration
      await agendaManager.now('send email', {
        to: user.email,
        subject: "Account Restored",
        template: "account-restored",
        context: {
          name: user.name,
          email: user.email,
        },
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.USER_RESTORED,
        entityType: ENTITY_TYPE.USER,
        entityId: userId,
        description: `Restored user: ${user.email}`,
        metadata: { userEmail: user.email },
      }).catch(err => console.error("Activity log failed:", err));

      return restored;
    } catch (error) {
      throw new Error(`Restore user failed: ${error.message}`);
    } 
  }

  /**
 * Enhanced User Service Methods
 * Add these to your existing UserService class
 */

// ==================== SERVICE METHODS ====================

/**
 * Hard delete user - permanently remove from database (super admin only)
 */
async hardDeleteUser(userId, adminId) {
  try {
    const user = await this.repository.findById(userId, { includeDeleted: true });
    
    if (!user) {
      throw new Error("User not found");
    }

    // Log this critical action before deletion
    await this.activityService.log({
      userId: adminId,
      action: ACTION_TYPE.USER_HARD_DELETED,
      entityType: ENTITY_TYPE.USER,
      entityId: userId,
      description: `PERMANENTLY deleted user: ${user.email}`,
      metadata: { userEmail: user.email, userRole: user.role },
      severity: "critical",
    }).catch(err => console.error("Activity log failed:", err));

    // Perform hard delete
    const result = await this.repository.hardDelete(userId);

    return result;
  } catch (error) {
    throw new Error(`Hard delete user failed: ${error.message}`);
  }
}

/**
 * Bulk perform action on users
 */
async bulkAction(userIds, action, adminId, reason = null) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (const userId of userIds) {
      try {
        switch (action) {
          case "activate":
            await this.activateUser(userId, adminId);
            break;
          case "deactivate":
            await this.deactivateUser(userId, adminId, reason);
            break;
          case "suspend":
            await this.suspendUser(userId, reason, adminId);
            break;
          case "delete":
            await this.deleteUser(userId, adminId);
            break;
          case "verify_email":
            await this.forceVerifyEmail(userId, adminId);
            break;
          default:
            throw new Error(`Unknown action: ${action}`);
        }
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          userId,
          error: error.message,
        });
      }
    }

    // Log bulk action
    this.activityService.log({
      userId: adminId,
      action: ACTION_TYPE.USERS_BULK_ACTION,
      entityType: ENTITY_TYPE.USER,
      description: `Performed bulk ${action} on ${userIds.length} users`,
      metadata: { action, totalUsers: userIds.length, results },
    }).catch(err => console.error("Activity log failed:", err));

    return results;
  } catch (error) {
    throw new Error(`Bulk action failed: ${error.message}`);
  }
}

/**
 * Bulk delete users
 */
async bulkDelete(userIds, adminId) {
  try {
    let deletedCount = 0;
    const errors = [];

    for (const userId of userIds) {
      try {
        await this.deleteUser(userId, adminId);
        deletedCount++;
      } catch (error) {
        errors.push({ userId, error: error.message });
      }
    }

    // Log bulk delete
    this.activityService.log({
      userId: adminId,
      action: ACTION_TYPE.USERS_BULK_DELETED,
      entityType: ENTITY_TYPE.USER,
      description: `Bulk deleted ${deletedCount} users`,
      metadata: { deletedCount, totalAttempted: userIds.length, errors },
      severity: "warning",
    }).catch(err => console.error("Activity log failed:", err));

    return { deletedCount, errors };
  } catch (error) {
    throw new Error(`Bulk delete failed: ${error.message}`);
  }
}

/**
 * Bulk restore deleted users (super admin only)
 */
async bulkRestore(userIds, adminId) {
  try {
    let restoredCount = 0;
    const errors = [];

    for (const userId of userIds) {
      try {
        await this.restoreUser(userId, adminId);
        restoredCount++;
      } catch (error) {
        errors.push({ userId, error: error.message });
      }
    }

    // Log bulk restore
    this.activityService.log({
      userId: adminId,
      action: ACTION_TYPE.USERS_BULK_RESTORED,
      entityType: ENTITY_TYPE.USER,
      description: `Bulk restored ${restoredCount} users`,
      metadata: { restoredCount, totalAttempted: userIds.length, errors },
      severity: "warning",
    }).catch(err => console.error("Activity log failed:", err));

    return { restoredCount, errors };
  } catch (error) {
    throw new Error(`Bulk restore failed: ${error.message}`);
  }
}

/**
 * Advanced user search
 */
async advancedSearch(searchTerm, filters = {}) {
  try {
    const query = {};

    // Text search
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Role filters
    if (filters.roles && filters.roles.length > 0) {
      query.role = { $in: filters.roles };
    }

    // Status filters
    if (filters.statuses && filters.statuses.length > 0) {
      query.status = { $in: filters.statuses };
    }

    // Email verification filter
    if (filters.emailVerified !== undefined) {
      query.email_verified = filters.emailVerified;
    }

    // Include deleted filter (super admin only)
    if (!filters.includeDeleted) {
      query.deleted_at = null;
    }

    const users = await this.repository.findAll(query, 1, 100, {
      sort: { created_at: -1 },
    });

    return users.data;
  } catch (error) {
    throw new Error(`Advanced search failed: ${error.message}`);
  }
}

/**
 * Export users to CSV
 */
exportToCSV(users) {
  const headers = ["ID", "Name", "Email", "Role", "Status", "Email Verified", "Created At"];
  const rows = users.map(user => [
    user._id,
    user.name,
    user.email,
    user.role,
    user.status,
    user.email_verified ? "Yes" : "No",
    new Date(user.created_at).toISOString(),
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(","))
    .join("\n");

  return csv;
}

/**
 * Export users to Excel (requires xlsx package)
 */
async exportToExcel(users) {
  // This requires the 'xlsx' package
  const XLSX = require("xlsx");

  const data = users.map(user => ({
    ID: user._id,
    Name: user.name,
    Email: user.email,
    Role: user.role,
    Status: user.status,
    "Email Verified": user.email_verified ? "Yes" : "No",
    "Last Login": user.last_login ? new Date(user.last_login).toISOString() : "Never",
    "Created At": new Date(user.created_at).toISOString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

/**
 * Send password reset by admin
 */
async sendPasswordResetByAdmin(userId, adminId) {
  try {
    const user = await this.repository.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    // Generate password reset token (implement this in your auth service)
    const resetToken = await AuthHelpers.generateAndStoreResetToken(userId);

    // Send reset email via Agenda
    await agendaManager.now('send email', {
      to: user.email,
      subject: "Password Reset Request (Admin Initiated)",
      template: "admin-password-reset",
      context: {
        name: user.name,
        resetToken,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
      },
    });

    // Log activity
    this.activityService.log({
      userId: adminId,
      action: ACTION_TYPE.PASSWORD_RESET_SENT,
      entityType: ENTITY_TYPE.USER,
      entityId: userId,
      description: `Admin sent password reset for user: ${user.email}`,
      metadata: { userEmail: user.email },
    }).catch(err => console.error("Activity log failed:", err));

    return true;
  } catch (error) {
    throw new Error(`Send password reset failed: ${error.message}`);
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

// Export both for testability (class) and convenience (singleton instance)
export { UserService };
export default new UserService();
