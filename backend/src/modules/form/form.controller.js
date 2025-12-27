/**
 * Form Controller
 * Handles HTTP requests for dynamic form management
 */

import BaseController from "../shared/base.controller.js";
import FormService from "./form.service.js";
import FormValidation from "./form.validation.js";

class FormController extends BaseController {
  constructor(dependencies = {}) {
    super({
      formService: dependencies.formService || FormService,
    });
  }

  // ==================== FORM CRUD ====================

  /**
   * Create a new form
   * POST /api/forms
   */
  async create(req, res) {
    const validated = this.validate(req.body, FormValidation.createFormSchema);
    const adminId = this.getUserId(req);
    const form = await this.service("formService").createForm(validated, adminId);

    return this.created(res, {
      data: form,
      message: "Form created successfully",
    });
  }

  /**
   * Get all forms with pagination and filters
   * GET /api/forms
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["event", "form_type", "status", "is_published"]);
    const sort = this.getSort(req, "-created_at");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const result = await this.service("formService").repository.findAll(
      filters,
      page,
      limit,
      { sort, populate: ["event", "categories", "created_by"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get form by ID
   * GET /api/forms/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const form = await this.service("formService").getFormById(id);

    if (!form) {
      return this.notFound(res, { resource: "Form" });
    }

    return this.success(res, {
      data: form,
    });
  }

  /**
   * Get form by slug
   * GET /api/forms/slug/:slug
   */
  async getBySlug(req, res) {
    const { slug } = req.params;
    const form = await this.service("formService").getFormBySlug(slug, {
      populate: ["event", "categories"],
    });

    if (!form) {
      return this.notFound(res, { resource: "Form" });
    }

    return this.success(res, {
      data: form,
    });
  }

  /**
   * Update form
   * PUT /api/forms/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, FormValidation.updateFormSchema);
    const adminId = this.getUserId(req);
    const form = await this.service("formService").updateForm(id, validated, adminId);

    return this.success(res, {
      data: form,
      message: "Form updated successfully",
    });
  }

  /**
   * Delete form (soft delete)
   * DELETE /api/forms/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    await this.service("formService").deleteForm(id);

    return this.success(res, {
      message: "Form deleted successfully",
    });
  }

  // ==================== PUBLIC QUERIES ====================

  /**
   * Get all published, active nomination forms (public)
   * GET /api/forms/public/nominations
   */
  async getPublicNominationForms(req, res) {
    const forms = await this.service("formService").getPublicNominationForms();

    return this.success(res, {
      data: forms,
    });
  }

  // ==================== EVENT-BASED QUERIES ====================

  /**
   * Get forms by event
   * GET /api/forms/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const filters = this.getFilters(req, ["form_type", "status", "is_published"]);

    const result = await this.service("formService").getFormsByEvent(eventId, filters, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get nomination forms by event
   * GET /api/forms/event/:eventId/nominations
   */
  async getNominationForms(req, res) {
    const { eventId } = req.params;
    const filters = this.getFilters(req, ["status", "is_published"]);

    const result = await this.service("formService").getNominationForms(eventId, filters);

    return this.success(res, {
      data: result.data,
    });
  }

  // ==================== FORM STATUS MANAGEMENT ====================

  /**
   * Publish form
   * PUT /api/forms/:id/publish
   */
  async publish(req, res) {
    const { id } = req.params;
    const form = await this.service("formService").publishForm(id);

    return this.success(res, {
      data: form,
      message: "Form published successfully",
    });
  }

  /**
   * Close form
   * PUT /api/forms/:id/close
   */
  async close(req, res) {
    const { id } = req.params;
    const form = await this.service("formService").closeForm(id);

    return this.success(res, {
      data: form,
      message: "Form closed successfully",
    });
  }

  // ==================== FIELD MAPPING ====================

  /**
   * Get field mapping configuration
   * GET /api/forms/:id/field-mapping
   */
  async getFieldMapping(req, res) {
    const { id } = req.params;
    const mapping = await this.service("formService").getFieldMapping(id);

    return this.success(res, {
      data: mapping,
    });
  }

  /**
   * Update field mapping configuration
   * PUT /api/forms/:id/field-mapping
   */
  async updateFieldMapping(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, FormValidation.updateFieldMappingSchema);
    const form = await this.service("formService").updateFieldMapping(id, validated);

    return this.success(res, {
      data: form,
      message: "Field mapping updated successfully",
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { FormController };
export default new FormController();
