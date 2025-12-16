/**
 * Event Controller
 * Handles HTTP requests for event management operations
 */

import BaseController from "../shared/base.controller.js";
import EventService from "./event.service.js";
import EventValidation, {
  createEventSchema,
  updateEventSchema,
  updateEventStatusSchema,
} from "./event.validation.js";

class EventController extends BaseController {
  constructor(dependencies = {}) {
    super({
      eventService: dependencies.eventService || EventService,
    });
  }

  // ==================== EVENT CRUD ====================

  /**
   * Create a new event
   * POST /api/events
   */
  async create(req, res) {
    const validated = this.validate(req.body, createEventSchema);
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").createEvent(validated, adminId);

    return this.created(res, {
      data: event,
      message: "Event created successfully",
    });
  }

  /**
   * Get all events with pagination and filters
   * GET /api/events
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, [
      "status",
      "is_published",
      "is_featured",
      "event_type",
      "visibility",
      "created_by",
    ]);
    const sort = this.getSort(req, "-created_at");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const [events, total] = await Promise.all([
      this.service("eventService").listEvents(filters, { skip, limit, sort }),
      this.service("eventService").countEvents(filters),
    ]);

    return this.paginated(res, {
      data: events,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get published events (public)
   * GET /api/events/public
   */
  async listPublic(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = {
      is_published: true,
      visibility: "public",
      ...this.getFilters(req, ["status", "is_featured", "event_type"]),
    };
    const sort = this.getSort(req, "-start_date");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [events, total] = await Promise.all([
      this.service("eventService").listEvents(filters, { skip, limit, sort }),
      this.service("eventService").countEvents(filters),
    ]);

    return this.paginated(res, {
      data: events,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get event by ID
   * GET /api/events/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const event = await this.service("eventService").getEventById(id);

    if (!event) {
      return this.notFound(res, { resource: "Event" });
    }

    return this.success(res, {
      data: event,
    });
  }

  /**
   * Get event by slug (public)
   * GET /api/events/slug/:slug
   */
  async getBySlug(req, res) {
    const { slug } = req.params;
    const event = await this.service("eventService").getEventBySlug(slug);

    if (!event) {
      return this.notFound(res, { resource: "Event" });
    }

    return this.success(res, {
      data: event,
    });
  }

  /**
   * Update event
   * PUT /api/events/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, updateEventSchema);
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").updateEvent(id, validated, adminId);

    return this.success(res, {
      data: event,
      message: "Event updated successfully",
    });
  }

  /**
   * Delete event (soft delete)
   * DELETE /api/events/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    await this.service("eventService").deleteEvent(id, adminId);

    return this.success(res, {
      message: "Event deleted successfully",
    });
  }

  // ==================== EVENT LIFECYCLE ====================

  /**
   * Publish event
   * PUT /api/events/:id/publish
   */
  async publish(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").publishEvent(id, adminId);

    return this.success(res, {
      data: event,
      message: "Event published successfully",
    });
  }

  /**
   * Unpublish event
   * PUT /api/events/:id/unpublish
   */
  async unpublish(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").unpublishEvent(id, adminId);

    return this.success(res, {
      data: event,
      message: "Event unpublished successfully",
    });
  }

  /**
   * Update event status
   * PUT /api/events/:id/status
   */
  async updateStatus(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, updateEventStatusSchema);
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").updateEventStatus(id, validated.status, adminId);

    return this.success(res, {
      data: event,
      message: "Event status updated successfully",
    });
  }

  /**
   * Cancel event
   * PUT /api/events/:id/cancel
   */
  async cancel(req, res) {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").cancelEvent(id, reason, adminId);

    return this.success(res, {
      data: event,
      message: "Event cancelled successfully",
    });
  }

  /**
   * Complete event
   * PUT /api/events/:id/complete
   */
  async complete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").completeEvent(id, adminId);

    return this.success(res, {
      data: event,
      message: "Event completed successfully",
    });
  }

  // ==================== EVENT FEATURES ====================

  /**
   * Toggle featured status
   * PUT /api/events/:id/featured
   */
  async toggleFeatured(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").toggleFeatured(id, adminId);

    return this.success(res, {
      data: event,
      message: event.is_featured ? "Event featured" : "Event unfeatured",
    });
  }

  /**
   * Get featured events (public)
   * GET /api/events/featured
   */
  async getFeatured(req, res) {
    const { limit } = this.getPagination(req);
    const events = await this.service("eventService").getFeaturedEvents(limit);

    return this.success(res, {
      data: events,
    });
  }

  /**
   * Get upcoming events (public)
   * GET /api/events/upcoming
   */
  async getUpcoming(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const events = await this.service("eventService").getUpcomingEvents(limit, { skip });
    const total = await this.service("eventService").countUpcomingEvents();

    return this.paginated(res, {
      data: events,
      page,
      limit,
      total_items: total,
    });
  }

  // ==================== EVENT CATEGORIES ====================

  /**
   * Get event categories
   * GET /api/events/:id/categories
   */
  async getCategories(req, res) {
    const { id } = req.params;
    const categories = await this.service("eventService").getEventCategories(id);

    return this.success(res, {
      data: categories,
    });
  }

  // ==================== EVENT CANDIDATES ====================

  /**
   * Get event candidates
   * GET /api/events/:id/candidates
   */
  async getCandidates(req, res) {
    const { id } = req.params;
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["status", "category"]);

    const [candidates, total] = await Promise.all([
      this.service("eventService").getEventCandidates(id, filters, { skip, limit }),
      this.service("eventService").countEventCandidates(id, filters),
    ]);

    return this.paginated(res, {
      data: candidates,
      page,
      limit,
      total_items: total,
    });
  }

  // ==================== EVENT STATISTICS ====================

  /**
   * Get event statistics
   * GET /api/events/:id/stats
   */
  async getStats(req, res) {
    const { id } = req.params;
    const stats = await this.service("eventService").getEventStatistics(id);

    return this.success(res, {
      data: stats,
    });
  }

  /**
   * Get event vote summary
   * GET /api/events/:id/votes/summary
   */
  async getVoteSummary(req, res) {
    const { id } = req.params;
    const summary = await this.service("eventService").getEventVoteSummary(id);

    return this.success(res, {
      data: summary,
    });
  }

  // ==================== EVENT RESULTS ====================

  /**
   * Get event results (public if published)
   * GET /api/events/:id/results
   */
  async getResults(req, res) {
    const { id } = req.params;
    const results = await this.service("eventService").getEventResults(id);

    return this.success(res, {
      data: results,
    });
  }

  /**
   * Publish event results
   * PUT /api/events/:id/results/publish
   */
  async publishResults(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").publishResults(id, adminId);

    return this.success(res, {
      data: event,
      message: "Results published successfully",
    });
  }

  // ==================== ADMIN OPERATIONS ====================

  /**
   * Get all events for admin (including unpublished)
   * GET /api/admin/events
   */
  async adminList(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, [
      "status",
      "is_published",
      "is_featured",
      "created_by",
    ]);
    const sort = this.getSort(req, "-created_at");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [events, total] = await Promise.all([
      this.service("eventService").listEvents(filters, { skip, limit, sort }),
      this.service("eventService").countEvents(filters),
    ]);

    return this.paginated(res, {
      data: events,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Duplicate event
   * POST /api/events/:id/duplicate
   */
  async duplicate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const event = await this.service("eventService").cloneEvent(id, adminId);

    return this.created(res, {
      data: event,
      message: "Event duplicated successfully",
    });
  }
}

// Export both class and singleton instance
export { EventController };
export default new EventController();
