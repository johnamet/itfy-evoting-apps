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
}

// Export both class and singleton instance
export { UserController };
export default new UserController();
