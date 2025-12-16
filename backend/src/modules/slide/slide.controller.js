/**
 * Slide Controller
 * Handles HTTP requests for slide/banner management
 */

import BaseController from "../shared/base.controller.js";
import SlideService from "./slide.service.js";
import SlideValidation from "./slide.validation.js";

class SlideController extends BaseController {
  constructor(dependencies = {}) {
    super({
      slideService: dependencies.slideService || SlideService,
    });
  }

  // ==================== SLIDE CRUD ====================

  /**
   * Create a new slide
   * POST /api/slides
   */
  async create(req, res) {
    const validated = this.validate(req.body, SlideValidation.createSlideSchema);
    const adminId = this.getUserId(req);
    const slide = await this.service("slideService").createSlide(validated, adminId);

    return this.created(res, {
      data: slide,
      message: "Slide created successfully",
    });
  }

  /**
   * Get all slides with pagination and filters
   * GET /api/slides
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["slide_type", "status", "event", "is_active", "position"]);
    const sort = this.getSort(req, "display_order");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const result = await this.service("slideService").getAllSlides(page, limit, filters, { sort });

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get slide by ID
   * GET /api/slides/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const slide = await this.service("slideService").getSlideById(id);

    return this.success(res, {
      data: slide,
    });
  }

  /**
   * Update slide
   * PUT /api/slides/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, SlideValidation.updateSlideSchema);
    const adminId = this.getUserId(req);
    const slide = await this.service("slideService").updateSlide(id, validated, adminId);

    return this.success(res, {
      data: slide,
      message: "Slide updated successfully",
    });
  }

  /**
   * Delete slide (soft delete)
   * DELETE /api/slides/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const deleteImages = req.query.delete_images === "true";
    await this.service("slideService").deleteSlide(id, adminId, deleteImages);

    return this.success(res, {
      message: "Slide deleted successfully",
    });
  }

  // ==================== STATUS MANAGEMENT ====================

  /**
   * Publish slide
   * PUT /api/slides/:id/publish
   */
  async publish(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const slide = await this.service("slideService").publishSlide(id, adminId);

    return this.success(res, {
      data: slide,
      message: "Slide published successfully",
    });
  }

  /**
   * Unpublish slide (revert to draft)
   * PUT /api/slides/:id/unpublish
   */
  async unpublish(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const slide = await this.service("slideService").unpublishSlide(id, adminId);

    return this.success(res, {
      data: slide,
      message: "Slide unpublished successfully",
    });
  }

  /**
   * Archive slide
   * PUT /api/slides/:id/archive
   */
  async archive(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const slide = await this.service("slideService").archiveSlide(id, adminId);

    return this.success(res, {
      data: slide,
      message: "Slide archived successfully",
    });
  }

  /**
   * Toggle slide active status
   * PUT /api/slides/:id/toggle-active
   */
  async toggleActive(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, SlideValidation.toggleActiveSchema);
    const adminId = this.getUserId(req);
    const slide = await this.service("slideService").updateSlide(id, validated, adminId);

    return this.success(res, {
      data: slide,
      message: `Slide ${validated.is_active ? "activated" : "deactivated"} successfully`,
    });
  }

  // ==================== FILTERING ENDPOINTS ====================

  /**
   * Get slides by type
   * GET /api/slides/type/:type
   */
  async getByType(req, res) {
    const { type } = req.params;
    const slides = await this.service("slideService").getSlidesByType(type);

    return this.success(res, {
      data: slides,
    });
  }

  /**
   * Get slides by position
   * GET /api/slides/position/:position
   */
  async getByPosition(req, res) {
    const { position } = req.params;
    const slides = await this.service("slideService").getSlidesByPosition(position);

    return this.success(res, {
      data: slides,
    });
  }

  /**
   * Get active (published) slides
   * GET /api/slides/active
   */
  async getActive(req, res) {
    const slideType = req.query.slide_type || null;
    const slides = await this.service("slideService").getActiveSlides(slideType);

    return this.success(res, {
      data: slides,
    });
  }

  /**
   * Get slides by event
   * GET /api/slides/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const slides = await this.service("slideService").getSlidesByEvent(eventId);

    return this.success(res, {
      data: slides,
    });
  }

  /**
   * Get scheduled slides (within validity period)
   * GET /api/slides/scheduled
   */
  async getScheduled(req, res) {
    const slideType = req.query.slide_type || null;
    const slides = await this.service("slideService").getScheduledSlides(slideType);

    return this.success(res, {
      data: slides,
    });
  }

  // ==================== ORDERING & ORGANIZATION ====================

  /**
   * Reorder slides
   * PUT /api/slides/reorder
   */
  async reorder(req, res) {
    const validated = this.validate(req.body, SlideValidation.reorderSlidesSchema);
    const adminId = this.getUserId(req);
    const slideType = req.query.slide_type;

    // Transform validation schema format to service format
    const orderData = validated.slide_orders.map(item => ({
      slideId: item.id,
      displayOrder: item.display_order,
    }));

    const slides = await this.service("slideService").reorderSlides(orderData, slideType, adminId);

    return this.success(res, {
      data: slides,
      message: "Slides reordered successfully",
    });
  }

  // ==================== IMAGE MANAGEMENT ====================

  /**
   * Upload slide image
   * POST /api/slides/:id/image
   */
  async uploadImage(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const isMobile = req.query.mobile === "true";

    if (!req.file) {
      return this.badRequest(res, { message: "No image file provided" });
    }

    const slide = await this.service("slideService").uploadSlideImage(id, req.file, adminId, isMobile);

    return this.success(res, {
      data: slide,
      message: `${isMobile ? "Mobile" : "Desktop"} image uploaded successfully`,
    });
  }

  // ==================== CLONING & BULK OPERATIONS ====================

  /**
   * Clone a slide
   * POST /api/slides/:id/clone
   */
  async clone(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const overrides = req.body || {};

    const clonedSlide = await this.service("slideService").cloneSlide(id, overrides, adminId);

    return this.created(res, {
      data: clonedSlide,
      message: "Slide cloned successfully",
    });
  }

  /**
   * Bulk update slide status
   * PUT /api/slides/bulk/status
   */
  async bulkUpdateStatus(req, res) {
    const { slide_ids, status } = req.body;
    const adminId = this.getUserId(req);

    if (!Array.isArray(slide_ids) || slide_ids.length === 0) {
      return this.badRequest(res, { message: "slide_ids must be a non-empty array" });
    }

    const slides = await this.service("slideService").bulkUpdateStatus(slide_ids, status, adminId);

    return this.success(res, {
      data: slides,
      message: `${slides.length} slides updated to ${status}`,
    });
  }

  // ==================== ANALYTICS ====================

  /**
   * Increment view count
   * POST /api/slides/:id/view
   */
  async incrementViewCount(req, res) {
    const { id } = req.params;
    const slide = await this.service("slideService").updateSlide(id, { $inc: { view_count: 1 } });

    return this.success(res, {
      data: { view_count: slide.view_count },
      message: "View count incremented",
    });
  }

  /**
   * Increment click count
   * POST /api/slides/:id/click
   */
  async incrementClickCount(req, res) {
    const { id } = req.params;
    const slide = await this.service("slideService").updateSlide(id, { $inc: { click_count: 1 } });

    return this.success(res, {
      data: { click_count: slide.click_count },
      message: "Click count incremented",
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { SlideController };
export default new SlideController();
