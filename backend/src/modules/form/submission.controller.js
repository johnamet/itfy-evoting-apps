/**
 * Submission Controller
 * Handles HTTP requests for form submission management
 */

import BaseController from "../shared/base.controller.js";
import SubmissionService from "./submission.service.js";
import SubmissionValidation from "./submission.validation.js";

class SubmissionController extends BaseController {
  constructor(dependencies = {}) {
    super({
      submissionService: dependencies.submissionService || SubmissionService,
    });
  }

  // ==================== SUBMISSION MANAGEMENT ====================

  /**
   * Submit a form
   * POST /api/submissions
   */
  async submit(req, res) {
    const { form_id, submission_data, categories } = req.body;
    const ipAddress = this.getClientIP(req);
    const userAgent = req.headers["user-agent"];
    const userId = this.getUserId(req);

    const result = await this.service("submissionService").submitForm(form_id, submission_data, {
      ip_address: ipAddress,
      user_agent: userAgent,
      submitted_by: userId,
      session_id: req.sessionID,
      categories,
    });

    return this.created(res, {
      data: result,
      message: "Form submitted successfully",
    });
  }

  /**
   * Get all submissions with pagination and filters
   * GET /api/submissions
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["form", "event", "status", "submitted_by", "nominee_identifier"]);
    const sort = this.getSort(req, "-created_at");
    const search = this.getSearch(req);

    // Handle is_duplicate filter
    if (req.query.is_duplicate !== undefined) {
      filters["duplicate_check.is_duplicate"] = req.query.is_duplicate === "true";
    }

    // Date range filters
    if (req.query.created_at_from) {
      filters.created_at = { ...filters.created_at, $gte: new Date(req.query.created_at_from) };
    }
    if (req.query.created_at_to) {
      filters.created_at = { ...filters.created_at, $lte: new Date(req.query.created_at_to) };
    }

    const result = await this.service("submissionService").repository.findAll(
      filters,
      page,
      limit,
      { sort, populate: ["form", "event", "categories", "submitted_by", "candidate"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get submission by ID
   * GET /api/submissions/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const submission = await this.service("submissionService").repository.findById(id, {
      populate: ["form", "event", "categories", "submitted_by", "candidate", "approval.reviewed_by"],
    });

    if (!submission) {
      return this.notFound(res, { resource: "Submission" });
    }

    return this.success(res, {
      data: submission,
    });
  }

  /**
   * Update submission
   * PUT /api/submissions/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, SubmissionValidation.updateSubmissionSchema);
    const submission = await this.service("submissionService").repository.updateById(id, validated);

    return this.success(res, {
      data: submission,
      message: "Submission updated successfully",
    });
  }

  // ==================== APPROVAL WORKFLOW ====================

  /**
   * Approve submission
   * POST /api/submissions/:id/approve
   */
  async approve(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const options = {
      notes: req.body.review_notes,
      createCandidate: req.body.create_candidate !== false,
      sendEmail: req.body.send_email !== false,
      candidateOverrides: req.body.candidate_overrides,
    };

    const result = await this.service("submissionService").approveSubmission(id, adminId, options);

    return this.success(res, {
      data: result,
      message: "Submission approved successfully",
    });
  }

  /**
   * Reject submission
   * POST /api/submissions/:id/reject
   */
  async reject(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, SubmissionValidation.rejectSubmissionSchema);
    const adminId = this.getUserId(req);

    const submission = await this.service("submissionService").rejectSubmission(
      id,
      adminId,
      validated.rejection_reason
    );

    return this.success(res, {
      data: submission,
      message: "Submission rejected",
    });
  }

  /**
   * Resolve duplicate submission
   * POST /api/submissions/:id/resolve-duplicate
   */
  async resolveDuplicate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const { action, merge_with, notes } = req.body;

    if (!["approve", "reject", "merge"].includes(action)) {
      return this.badRequest(res, { message: "action must be 'approve', 'reject', or 'merge'" });
    }

    const result = await this.service("submissionService").resolveDuplicate(id, adminId, {
      action,
      mergeWith: merge_with,
      notes,
    });

    return this.success(res, {
      data: result,
      message: `Duplicate submission ${action}d successfully`,
    });
  }

  // ==================== DUPLICATE DETECTION ====================

  /**
   * Check duplicates for a submission
   * POST /api/submissions/:id/check-duplicates
   */
  async checkDuplicates(req, res) {
    const { id } = req.params;
    const threshold = req.body.threshold;

    const result = await this.service("submissionService").checkDuplicates(id, threshold);

    return this.success(res, {
      data: result,
    });
  }

  /**
   * Get suspected duplicates for a form
   * GET /api/submissions/form/:formId/duplicates
   */
  async getSuspectedDuplicates(req, res) {
    const { formId } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("submissionService").getSuspectedDuplicates(formId, page, limit);

    return this.success(res, {
      data: result,
    });
  }

  // ==================== FORM-BASED QUERIES ====================

  /**
   * Get submissions by form
   * GET /api/submissions/form/:formId
   */
  async getByForm(req, res) {
    const { formId } = req.params;
    const { page, limit } = this.getPagination(req);
    const filters = this.getFilters(req, ["status"]);

    const result = await this.service("submissionService").repository.findAll(
      { form: formId, ...filters },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["submitted_by", "categories"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get submissions by event
   * GET /api/submissions/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const filters = this.getFilters(req, ["status", "form"]);

    const result = await this.service("submissionService").repository.findAll(
      { event: eventId, ...filters },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["form", "submitted_by", "categories"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get submissions by nominee identifier (multi-category nominations)
   * GET /api/submissions/nominee/:identifier
   */
  async getByNominee(req, res) {
    const { identifier } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("submissionService").repository.findAll(
      { nominee_identifier: identifier },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["form", "categories"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== USER SUBMISSIONS ====================

  /**
   * Get submissions by user
   * GET /api/submissions/user/:userId
   */
  async getByUser(req, res) {
    const { userId } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("submissionService").repository.findAll(
      { submitted_by: userId },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["form", "event", "categories"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get my submissions (current user)
   * GET /api/submissions/me
   */
  async getMySubmissions(req, res) {
    const userId = this.getUserId(req);

    if (!userId) {
      return this.unauthorized(res);
    }

    const { page, limit } = this.getPagination(req);

    const result = await this.service("submissionService").repository.findAll(
      { submitted_by: userId },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["form", "event", "categories", "candidate"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { SubmissionController };
export default new SubmissionController();
