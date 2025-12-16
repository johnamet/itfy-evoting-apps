/**
 * Bundle Controller
 * Handles HTTP requests for vote bundle management
 */

import BaseController from "../../shared/base.controller.js";
import BundleService from "./bundle.service.js";
import BundleValidation from "./bundle.validation.js";

class BundleController extends BaseController {
  constructor(dependencies = {}) {
    super({
      bundleService: dependencies.bundleService || BundleService,
    });
  }

  // ==================== BUNDLE CRUD ====================

  /**
   * Create a new bundle
   * POST /api/bundles
   */
  async create(req, res) {
    const validated = this.validate(req.body, BundleValidation.createBundleSchema);
    const adminId = this.getUserId(req);
    const bundle = await this.service("bundleService").createBundle(validated, adminId);

    return this.created(res, {
      data: bundle,
      message: "Bundle created successfully",
    });
  }

  /**
   * Get all bundles with pagination and filters
   * GET /api/bundles
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["event", "status", "is_featured", "is_popular"]);
    const sort = this.getSort(req, "display_order");
    const search = this.getSearch(req);

    // Price range filters
    if (req.query.min_price) {
      filters.price = { ...filters.price, $gte: parseFloat(req.query.min_price) };
    }
    if (req.query.max_price) {
      filters.price = { ...filters.price, $lte: parseFloat(req.query.max_price) };
    }

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const result = await this.service("bundleService").repository.findAll(
      filters,
      page,
      limit,
      { sort }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get bundle by ID
   * GET /api/bundles/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const bundle = await this.service("bundleService").getBundleById(id);

    return this.success(res, {
      data: bundle,
    });
  }

  /**
   * Get bundle by slug
   * GET /api/bundles/slug/:slug
   */
  async getBySlug(req, res) {
    const { slug } = req.params;
    const bundle = await this.service("bundleService").getBundleBySlug(slug);

    return this.success(res, {
      data: bundle,
    });
  }

  /**
   * Update bundle
   * PUT /api/bundles/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, BundleValidation.updateBundleSchema);
    const adminId = this.getUserId(req);
    const bundle = await this.service("bundleService").updateBundle(id, validated, adminId);

    return this.success(res, {
      data: bundle,
      message: "Bundle updated successfully",
    });
  }

  /**
   * Delete bundle (soft delete)
   * DELETE /api/bundles/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    await this.service("bundleService").deleteBundle(id, adminId);

    return this.success(res, {
      message: "Bundle deleted successfully",
    });
  }

  // ==================== STATUS MANAGEMENT ====================

  /**
   * Activate bundle
   * PUT /api/bundles/:id/activate
   */
  async activate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const bundle = await this.service("bundleService").activateBundle(id, adminId);

    return this.success(res, {
      data: bundle,
      message: "Bundle activated successfully",
    });
  }

  /**
   * Deactivate bundle
   * PUT /api/bundles/:id/deactivate
   */
  async deactivate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const bundle = await this.service("bundleService").deactivateBundle(id, adminId);

    return this.success(res, {
      data: bundle,
      message: "Bundle deactivated successfully",
    });
  }

  /**
   * Toggle featured status
   * PUT /api/bundles/:id/toggle-featured
   */
  async toggleFeatured(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const bundle = await this.service("bundleService").toggleFeatured(id, adminId);

    return this.success(res, {
      data: bundle,
      message: `Bundle ${bundle.is_featured ? "featured" : "unfeatured"} successfully`,
    });
  }

  /**
   * Toggle popular status
   * PUT /api/bundles/:id/toggle-popular
   */
  async togglePopular(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const bundle = await this.service("bundleService").togglePopular(id, adminId);

    return this.success(res, {
      data: bundle,
      message: `Bundle ${bundle.is_popular ? "marked" : "unmarked"} as popular successfully`,
    });
  }

  // ==================== EVENT-BASED QUERIES ====================

  /**
   * Get bundles by event
   * GET /api/bundles/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const result = await this.service("bundleService").getBundlesByEvent(eventId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get available bundles for event (active and within validity)
   * GET /api/bundles/event/:eventId/available
   */
  async getAvailableByEvent(req, res) {
    const { eventId } = req.params;
    const bundles = await this.service("bundleService").getAvailableBundles(eventId);

    return this.success(res, {
      data: bundles,
    });
  }

  // ==================== SPECIAL QUERIES ====================

  /**
   * Get featured bundles
   * GET /api/bundles/featured
   */
  async getFeatured(req, res) {
    const eventId = req.query.event || null;
    const bundles = await this.service("bundleService").getFeaturedBundles(eventId);

    return this.success(res, {
      data: bundles,
    });
  }

  /**
   * Get popular bundles
   * GET /api/bundles/popular
   */
  async getPopular(req, res) {
    const eventId = req.query.event || null;
    const limit = parseInt(req.query.limit, 10) || 5;
    const bundles = await this.service("bundleService").getPopularBundles(eventId, limit);

    return this.success(res, {
      data: bundles,
    });
  }

  /**
   * Get best value bundles
   * GET /api/bundles/best-value
   */
  async getBestValue(req, res) {
    const { event: eventId } = req.query;
    const limit = parseInt(req.query.limit, 10) || 5;

    if (!eventId) {
      return this.badRequest(res, { message: "event query parameter is required" });
    }

    const bundles = await this.service("bundleService").getBestValueBundles(eventId, limit);

    return this.success(res, {
      data: bundles,
    });
  }

  /**
   * Get bundles by category
   * GET /api/bundles/category/:categoryId
   */
  async getByCategory(req, res) {
    const { categoryId } = req.params;
    const bundles = await this.service("bundleService").getBundlesByCategory(categoryId);

    return this.success(res, {
      data: bundles,
    });
  }

  /**
   * Get bundles by price range
   * GET /api/bundles/price-range
   */
  async getByPriceRange(req, res) {
    const { min_price, max_price, event: eventId } = req.query;

    if (!min_price || !max_price) {
      return this.badRequest(res, { message: "min_price and max_price query parameters are required" });
    }

    const bundles = await this.service("bundleService").getBundlesByPriceRange(
      parseFloat(min_price),
      parseFloat(max_price),
      eventId || null
    );

    return this.success(res, {
      data: bundles,
    });
  }

  /**
   * Get bundles expiring soon
   * GET /api/bundles/expiring-soon
   */
  async getExpiringSoon(req, res) {
    const days = parseInt(req.query.days, 10) || 7;
    const eventId = req.query.event || null;
    const bundles = await this.service("bundleService").getExpiringSoonBundles(days, eventId);

    return this.success(res, {
      data: bundles,
    });
  }

  /**
   * Get expired bundles
   * GET /api/bundles/expired
   */
  async getExpired(req, res) {
    const eventId = req.query.event || null;
    const bundles = await this.service("bundleService").getExpiredBundles(eventId);

    return this.success(res, {
      data: bundles,
    });
  }

  // ==================== VALIDATION ====================

  /**
   * Validate bundle availability for purchase
   * GET /api/bundles/:id/validate
   */
  async validateAvailability(req, res) {
    const { id } = req.params;
    const result = await this.service("bundleService").validateBundleAvailability(id);

    return this.success(res, {
      data: result,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { BundleController };
export default new BundleController();
