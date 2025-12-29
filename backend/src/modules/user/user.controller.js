/**
 * User Controller
 * Handles HTTP requests for user management operations
 */

import BaseController from "../shared/base.controller.js";
import UserService from "./user.service.js";
import UserValidation from "./user.validation.js";

class UserController extends BaseController {
  constructor(dependencies = {}) {
    super({
      userService: dependencies.userService || UserService,
    });
  }

  // ==================== USER CRUD ====================

  /**
   * Create a new user (admin only)
   * POST /api/users
   */
  async create(req, res) {
    const validated = this.validate(req.body, UserValidation.createUserSchema);
    const adminId = this.getUserId(req);
    const user = await this.service("userService").createUser(validated, adminId);

    return this.created(res, {
      data: user,
      message: "User created successfully",
    });
  }

  /**
   * Get all users with pagination and filters
   * GET /api/users
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["status", "role", "email_verified"]);
    const sort = this.getSort(req);
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      this.service("userService").findAll(filters, { skip, limit, sort }),
      this.service("userService").count(filters),
    ]);

    return this.paginated(res, {
      data: users,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get user by ID
   * GET /api/users/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const user = await this.service("userService").getUserById(id);

    if (!user) {
      return this.notFound(res, { resource: "User" });
    }

    return this.success(res, {
      data: user,
    });
  }

  /**
   * Update user
   * PUT /api/users/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, UserValidation.updateUserSchema);
    const adminId = this.getUserId(req);
    const user = await this.service("userService").updateUser(id, validated, adminId);

    return this.success(res, {
      data: user,
      message: "User updated successfully",
    });
  }

  /**
   * Delete user (soft delete)
   * DELETE /api/users/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    await this.service("userService").deleteUser(id, adminId);

    return this.success(res, {
      message: "User deleted successfully",
    });
  }

  // ==================== USER PROFILE ====================

  /**
   * Get current user profile
   * GET /api/users/profile
   */
  async getProfile(req, res) {
    const userId = this.getUserId(req);
    const user = await this.service("userService").getUserById(userId);

    return this.success(res, {
      data: user,
    });
  }

  /**
   * Update current user profile
   * PUT /api/users/profile
   */
  async updateProfile(req, res) {
    const userId = this.getUserId(req);
    const validated = this.validate(req.body, UserValidation.updateUserSchema);
    const user = await this.service("userService").updateUser(userId, validated, userId);

    return this.success(res, {
      data: user,
      message: "Profile updated successfully",
    });
  }

  // ==================== ROLE & PERMISSIONS ====================

  /**
   * Update user role (admin only)
   * PUT /api/users/:id/role
   */
  async updateRole(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, UserValidation.updateRoleSchema);
    const adminId = this.getUserId(req);
    const user = await this.service("userService").updateUserRole(id, validated.role, adminId);

    return this.success(res, {
      data: user,
      message: "User role updated successfully",
    });
  }

  /**
   * Update user permissions (admin only)
   * PUT /api/users/:id/permissions
   */
  async updatePermissions(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, UserValidation.updatePermissionsSchema);
    const adminId = this.getUserId(req);
    const user = await this.service("userService").updateUserPermissions(id, validated.permissions, adminId);

    return this.success(res, {
      data: user,
      message: "User permissions updated successfully",
    });
  }

  // ==================== USER STATUS ====================

  /**
   * Activate user (admin only)
   * PUT /api/users/:id/activate
   */
  async activate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const user = await this.service("userService").activateUser(id, adminId);

    return this.success(res, {
      data: user,
      message: "User activated successfully",
    });
  }

  /**
   * Deactivate user (admin only)
   * PUT /api/users/:id/deactivate
   */
  async deactivate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const user = await this.service("userService").deactivateUser(id, adminId);

    return this.success(res, {
      data: user,
      message: "User deactivated successfully",
    });
  }

  /**
   * Suspend user (admin only)
   * PUT /api/users/:id/suspend
   */
  async suspend(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, UserValidation.suspendUserSchema);
    const adminId = this.getUserId(req);
    const user = await this.service("userService").suspendUser(id, validated.reason, adminId);

    return this.success(res, {
      data: user,
      message: "User suspended successfully",
    });
  }

  /**
   * Reactivate user (admin only)
   * PUT /api/users/:id/reactivate
   */
  async reactivate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const user = await this.service("userService").reactivateUser(id, adminId);

    return this.success(res, {
      data: user,
      message: "User reactivated successfully",
    });
  }

  /**
   * Force verify user email (admin only)
   * PUT /api/users/:id/verify-email
   */
  async forceVerifyEmail(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const user = await this.service("userService").forceVerifyEmail(id, adminId);

    return this.success(res, {
      data: user,
      message: "User email verified successfully",
    });
  }

  // ==================== BULK OPERATIONS ====================

  /**
   * Bulk update user status (admin only)
   * POST /api/users/bulk/status
   */
  async bulkUpdateStatus(req, res) {
    const validated = this.validate(req.body, UserValidation.bulkStatusUpdateSchema);
    const adminId = this.getUserId(req);
    const result = await this.service("userService").bulkUpdateStatus(
      validated.userIds,
      validated.status,
      adminId
    );

    return this.success(res, {
      data: result,
      message: `${result.modifiedCount} users updated successfully`,
    });
  }

  // ==================== STATISTICS ====================

  /**
   * Get user statistics (admin only)
   * GET /api/users/stats
   */
  async getStats(req, res) {
    const stats = await this.service("userService").getUserStats();

    return this.success(res, {
      data: stats,
    });
  }

  /**
 * List soft-deleted users (super admin only)
 * GET /api/users/deleted
 */
async listDeleted(req, res) {
  const { page, limit, skip } = this.getPagination(req);
  const sort = this.getSort(req);
  const search = this.getSearch(req);

  const filters = { deleted_at: { $ne: null } };

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [users, total] = await Promise.all([
    this.service("userService").findAll(filters, { skip, limit, sort, includeDeleted: true }),
    this.service("userService").count(filters),
  ]);

  return this.paginated(res, {
    data: users,
    page,
    limit,
    total_items: total,
  });
}

/**
 * Restore a soft-deleted user (super admin only)
 * POST /api/users/:id/restore
 */
async restoreUser(req, res) {
  const { id } = req.params;
  const adminId = this.getUserId(req);
  const user = await this.service("userService").restoreUser(id, adminId);

  return this.success(res, {
    data: user,
    message: "User restored successfully",
  });
}

/**
 * Hard delete user - permanent (super admin only)
 * DELETE /api/users/:id/hard
 */
async hardDeleteUser(req, res) {
  const { id } = req.params;
  const adminId = this.getUserId(req);

  // Extra security check - ensure user is super admin
  const admin = await this.service("userService").getUserById(adminId);
  if (admin.role !== "super_admin") {
    return this.forbidden(res, {
      message: "Only super admins can permanently delete users",
    });
  }

  await this.service("userService").hardDeleteUser(id, adminId);

  return this.success(res, {
    message: "User permanently deleted",
  });
}

/**
 * Bulk perform action on users
 * POST /api/users/bulk/action
 */
async bulkAction(req, res) {
  const validated = this.validate(req.body, UserValidation.bulkActionSchema);
  const adminId = this.getUserId(req);

  const result = await this.service("userService").bulkAction(
    validated.userIds,
    validated.action,
    adminId,
    validated.reason
  );

  return this.success(res, {
    data: result,
    message: `Bulk action ${validated.action} completed. Success: ${result.success}, Failed: ${result.failed}`,
  });
}

/**
 * Bulk delete users
 * POST /api/users/bulk/delete
 */
async bulkDelete(req, res) {
  const validated = this.validate(req.body, UserValidation.bulkDeleteSchema);
  const adminId = this.getUserId(req);

  const result = await this.service("userService").bulkDelete(
    validated.userIds,
    adminId
  );

  return this.success(res, {
    data: result,
    message: `${result.deletedCount} users deleted successfully`,
  });
}

/**
 * Bulk restore users (super admin only)
 * POST /api/users/bulk/restore
 */
async bulkRestore(req, res) {
  const validated = this.validate(req.body, UserValidation.bulkRestoreSchema);
  const adminId = this.getUserId(req);

  // Extra security check
  const admin = await this.service("userService").getUserById(adminId);
  if (admin.role !== "super_admin") {
    return this.forbidden(res, {
      message: "Only super admins can restore deleted users",
    });
  }

  const result = await this.service("userService").bulkRestore(
    validated.userIds,
    adminId
  );

  return this.success(res, {
    data: result,
    message: `${result.restoredCount} users restored successfully`,
  });
}

/**
 * Advanced user search
 * POST /api/users/search
 */
async searchUsers(req, res) {
  const validated = this.validate(req.body, UserValidation.advancedSearchSchema);
  
  const result = await this.service("userService").advancedSearch(
    validated.searchTerm,
    validated.filters
  );

  return this.success(res, {
    data: result,
  });
}

/**
 * Export users to CSV/Excel
 * GET /api/users/export
 */
async exportUsers(req, res) {
  const format = req.query.format || "csv";
  const filters = this.getFilters(req, ["status", "role", "email_verified"]);
  const search = this.getSearch(req);

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await this.service("userService").findAll(filters, {
    limit: 10000, // Max export limit
  });

  if (format === "csv") {
    const csv = this.service("userService").exportToCSV(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    return res.send(csv);
  } else {
    const excel = await this.service("userService").exportToExcel(users);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
    return res.send(excel);
  }
}

/**
 * Get user activity log
 * GET /api/users/:id/activity
 */
async getUserActivity(req, res) {
  const { id } = req.params;
  const { page, limit, skip } = this.getPagination(req);

  const activities = await this.service("activityService").getUserActivities(
    id,
    { skip, limit }
  );

  return this.paginated(res, {
    data: activities.data,
    page,
    limit,
    total_items: activities.total,
  });
}

/**
 * Send password reset email (admin action)
 * POST /api/users/:id/send-password-reset
 */
async sendPasswordReset(req, res) {
  const { id } = req.params;
  const adminId = this.getUserId(req);

  await this.service("userService").sendPasswordResetByAdmin(id, adminId);

  return this.success(res, {
    message: "Password reset email sent successfully",
  });
}

/**
 * Get individual user statistics
 * GET /api/users/:id/statistics
 */
async getUserStatistics(req, res) {
  const { id } = req.params;
  const stats = await this.service("userService").getUserStatistics(id);

  return this.success(res, {
    data: stats,
  });
}
}



// Export both class and singleton instance
export { UserController };
export default new UserController();
