/**
 * Category Controller
 * Handles HTTP requests for voting category management
 */

import BaseController from "../shared/base.controller.js";
import CategoryService from "./category.service.js";
import CategoryValidation from "./category.validation.js";

class CategoryController extends BaseController {
  constructor(dependencies = {}) {
    super({
      categoryService: dependencies.categoryService || CategoryService,
    });
  }

  // ==================== CATEGORY CRUD ====================

  /**
   * Create a new category
   * POST /api/categories
   */
  async create(req, res) {
    const validated = this.validate(req.body, CategoryValidation.createCategorySchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").createCategory(validated, adminId);

    return this.created(res, {
      data: category,
      message: "Category created successfully",
    });
  }

  /**
   * Get all categories with pagination and filters
   * GET /api/categories
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["status", "event", "is_featured"]);
    const sort = this.getSort(req, "display_order");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [categories, total] = await Promise.all([
      this.service("categoryService").findAll(filters, { skip, limit, sort }),
      this.service("categoryService").count(filters),
    ]);

    return this.paginated(res, {
      data: categories,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get category by ID
   * GET /api/categories/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const category = await this.service("categoryService").getCategoryById(id);

    if (!category) {
      return this.notFound(res, { resource: "Category" });
    }

    return this.success(res, {
      data: category,
    });
  }

  /**
   * Update category
   * PUT /api/categories/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CategoryValidation.updateCategorySchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").updateCategory(id, validated, adminId);

    return this.success(res, {
      data: category,
      message: "Category updated successfully",
    });
  }

  /**
   * Delete category (soft delete)
   * DELETE /api/categories/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    await this.service("categoryService").deleteCategory(id, adminId);

    return this.success(res, {
      message: "Category deleted successfully",
    });
  }

  // ==================== VOTING LIFECYCLE ====================

  /**
   * Open voting for category
   * PUT /api/categories/:id/open-voting
   */
  async openVoting(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").openVoting(id, adminId);

    return this.success(res, {
      data: category,
      message: "Voting opened for category",
    });
  }

  /**
   * Close voting for category
   * PUT /api/categories/:id/close-voting
   */
  async closeVoting(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").closeVoting(id, adminId);

    return this.success(res, {
      data: category,
      message: "Voting closed for category",
    });
  }

  /**
   * Update voting deadline
   * PUT /api/categories/:id/deadline
   */
  async updateDeadline(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CategoryValidation.updateDeadlineSchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").updateVotingDeadline(
      id,
      validated.voting_deadline,
      adminId
    );

    return this.success(res, {
      data: category,
      message: "Voting deadline updated",
    });
  }

  /**
   * Extend voting deadline
   * PUT /api/categories/:id/extend-deadline
   */
  async extendDeadline(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CategoryValidation.extendDeadlineSchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").extendVotingDeadline(
      id,
      validated.hours,
      adminId
    );

    return this.success(res, {
      data: category,
      message: `Voting deadline extended by ${validated.hours} hours`,
    });
  }

  // ==================== CANDIDATE MANAGEMENT ====================

  /**
   * Get category candidates
   * GET /api/categories/:id/candidates
   */
  async getCandidates(req, res) {
    const { id } = req.params;
    const { page, limit, skip } = this.getPagination(req);
    const sort = this.getSort(req);

    const [candidates, total] = await Promise.all([
      this.service("categoryService").getCategoryCandidates(id, { skip, limit, sort }),
      this.service("categoryService").countCategoryCandidates(id),
    ]);

    return this.paginated(res, {
      data: candidates,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Add candidates to category
   * POST /api/categories/:id/candidates
   */
  async addCandidates(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CategoryValidation.addCandidatesSchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").addCandidates(
      id,
      validated.candidateIds,
      adminId
    );

    return this.success(res, {
      data: category,
      message: "Candidates added to category",
    });
  }

  /**
   * Remove candidates from category
   * DELETE /api/categories/:id/candidates
   */
  async removeCandidates(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CategoryValidation.removeCandidatesSchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").removeCandidates(
      id,
      validated.candidateIds,
      adminId
    );

    return this.success(res, {
      data: category,
      message: "Candidates removed from category",
    });
  }

  // ==================== FEATURED CATEGORIES ====================

  /**
   * Toggle featured status
   * PUT /api/categories/:id/featured
   */
  async toggleFeatured(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").toggleFeatured(id, adminId);

    return this.success(res, {
      data: category,
      message: category.is_featured ? "Category featured" : "Category unfeatured",
    });
  }

  /**
   * Get featured categories
   * GET /api/categories/featured
   */
  async getFeatured(req, res) {
    const eventId = req.query.event;
    const categories = await this.service("categoryService").getFeaturedCategories(eventId);

    return this.success(res, {
      data: categories,
    });
  }

  // ==================== DISPLAY ORDER ====================

  /**
   * Update display order
   * PUT /api/categories/:id/order
   */
  async updateOrder(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CategoryValidation.updateOrderSchema);
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").updateDisplayOrder(
      id,
      validated.display_order,
      adminId
    );

    return this.success(res, {
      data: category,
      message: "Display order updated",
    });
  }

  /**
   * Reorder categories
   * PUT /api/categories/reorder
   */
  async reorder(req, res) {
    const validated = this.validate(req.body, CategoryValidation.reorderSchema);
    const adminId = this.getUserId(req);
    await this.service("categoryService").reorderCategories(validated.categoryOrders, adminId);

    return this.success(res, {
      message: "Categories reordered successfully",
    });
  }

  // ==================== STATISTICS & RESULTS ====================

  /**
   * Get category statistics
   * GET /api/categories/:id/stats
   */
  async getStats(req, res) {
    const { id } = req.params;
    const stats = await this.service("categoryService").getCategoryStats(id);

    return this.success(res, {
      data: stats,
    });
  }

  /**
   * Get category results
   * GET /api/categories/:id/results
   */
  async getResults(req, res) {
    const { id } = req.params;
    const results = await this.service("categoryService").getCategoryResults(id);

    return this.success(res, {
      data: results,
    });
  }

  /**
   * Publish category results
   * PUT /api/categories/:id/results/publish
   */
  async publishResults(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const category = await this.service("categoryService").publishResults(id, adminId);

    return this.success(res, {
      data: category,
      message: "Results published successfully",
    });
  }

  /**
   * Get vote counts by candidate
   * GET /api/categories/:id/vote-counts
   */
  async getVoteCounts(req, res) {
    const { id } = req.params;
    const voteCounts = await this.service("categoryService").getVoteCountsByCandidate(id);

    return this.success(res, {
      data: voteCounts,
    });
  }

  // ==================== EVENT-SPECIFIC ====================

  /**
   * Get categories by event
   * GET /api/events/:eventId/categories
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit, skip } = this.getPagination(req);
    const filters = { event: eventId, ...this.getFilters(req, ["status", "is_featured"]) };
    const sort = this.getSort(req, "display_order");

    const [categories, total] = await Promise.all([
      this.service("categoryService").findAll(filters, { skip, limit, sort }),
      this.service("categoryService").count(filters),
    ]);

    return this.paginated(res, {
      data: categories,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get public categories for voting (active only)
   * GET /api/events/:eventId/categories/public
   */
  async getPublicByEvent(req, res) {
    const { eventId } = req.params;
    const categories = await this.service("categoryService").getPublicCategories(eventId);

    return this.success(res, {
      data: categories,
    });
  }
}

// Export both class and singleton instance
export { CategoryController };
export default new CategoryController();
