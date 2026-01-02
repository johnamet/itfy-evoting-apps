/**
 * Candidate Controller
 * Handles HTTP requests for candidate management operations
 */

import BaseController from "../shared/base.controller.js";
import CandidateService from "./candidate.service.js";
import CandidateValidation from "./candidate.validation.js";

class CandidateController extends BaseController {
  constructor(dependencies = {}) {
    super({
      candidateService: dependencies.candidateService || CandidateService,
    });
  }

  // ==================== CANDIDATE SELF-SERVICE ====================

  /**
   * Request to be added to additional category (candidate self-service)
   * POST /api/candidates/profile/categories
   */
  async requestCategoryAddition(req, res) {
    const candidateId = req.candidate._id;
    const { categoryId } = req.body;

    if (!categoryId) {
      return this.badRequest(res, "Category ID is required");
    }

    const candidate = await this.service("candidateService").addCategory(candidateId, categoryId);

    return this.success(res, {
      data: candidate,
      message: "Category addition request submitted successfully. Awaiting admin approval.",
    });
  }

  // ==================== PUBLIC ROUTES ====================

  /**
   * Get all published and approved candidates (public)
   * GET /api/candidates/public
   */
  async listPublic(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = {
      is_published: true,
      status: "approved",
      ...this.getFilters(req, ["event", "categories"]),
    };
    const sort = this.getSort(req, "-vote_count");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
        { candidate_code: { $regex: search, $options: "i" } },
      ];
    }

    const [candidates, total] = await Promise.all([
      this.service("candidateService").findAll(filters, { skip, limit, sort }),
      this.service("candidateService").count(filters),
    ]);

    return this.paginated(res, {
      data: candidates,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get candidate by slug (public)
   * GET /api/candidates/slug/:slug
   */
  async getBySlug(req, res) {
    const { slug } = req.params;
    const candidate = await this.service("candidateService").getCandidateBySlug(slug);

    if (!candidate) {
      return this.notFound(res, { resource: "Candidate" });
    }

    // Only return if published and approved
    if (!candidate.is_published || candidate.status !== "approved") {
      return this.notFound(res, { resource: "Candidate" });
    }

    return this.success(res, {
      data: candidate,
    });
  }

  // ==================== CANDIDATE CRUD (ADMIN) ====================

  /**
   * Create a new candidate (admin)
   * POST /api/candidates
   */
  async create(req, res) {
    const validated = this.validate(req.body, CandidateValidation.createCandidateSchema);
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").createCandidate(validated, adminId);

    return this.created(res, {
      data: candidate,
      message: "Candidate created successfully",
    });
  }

  /**
   * Get all candidates with pagination and filters
   * GET /api/candidates
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["status", "event", "categories"]);
    const sort = this.getSort(req);
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const [candidates, total] = await Promise.all([
      this.service("candidateService").findAll(filters, { skip, limit, sort }),
      this.service("candidateService").count(filters),
    ]);

    return this.paginated(res, {
      data: candidates,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get candidate by ID
   * GET /api/candidates/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const candidate = await this.service("candidateService").getProfile(id);

    if (!candidate) {
      return this.notFound(res, { resource: "Candidate" });
    }

    return this.success(res, {
      data: candidate,
    });
  }

  /**
   * Get candidate by code (public)
   * GET /api/candidates/code/:code
   */
  async getByCode(req, res) {
    const { code } = req.params;
    const candidate = await this.service("candidateService").getCandidateByCode(code);

    if (!candidate) {
      return this.notFound(res, { resource: "Candidate" });
    }

    return this.success(res, {
      data: candidate,
    });
  }

  /**
   * Update candidate (admin)
   * PUT /api/candidates/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").updateProfileByAdmin(id, req.body, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate updated successfully",
    });
  }

  /**
   * Delete candidate (soft delete)
   * DELETE /api/candidates/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    await this.service("candidateService").deleteCandidate(id, adminId);

    return this.success(res, {
      message: "Candidate deleted successfully",
    });
  }

  // ==================== CANDIDATE PROFILE (SELF) ====================

  /**
   * Get own profile (candidate authenticated)
   * GET /api/candidates/profile
   */
  async getProfile(req, res) {
    const candidateId = this.getUserId(req);
    const candidate = await this.service("candidateService").getProfile(candidateId);

    return this.success(res, {
      data: candidate,
    });
  }

  /**
   * Update own profile (candidate authenticated)
   * PUT /api/candidates/profile
   */
  async updateProfile(req, res) {
    const candidateId = this.getUserId(req);
    const validated = this.validate(req.body, CandidateValidation.updateProfileSchema);
    const candidate = await this.service("candidateService").updateProfileByCandidate(candidateId, validated);

    return this.success(res, {
      data: candidate,
      message: "Profile updated successfully",
    });
  }

  /**
   * Get profile update history (candidate authenticated)
   * GET /api/candidates/profile/history
   */
  async getProfileHistory(req, res) {
    const candidateId = this.getUserId(req);
    const history = await this.service("candidateService").getProfileUpdateHistory(candidateId);

    return this.success(res, {
      data: history,
    });
  }

  /**
   * Get own statistics (candidate authenticated)
   * GET /api/candidates/profile/stats
   */
  async getMyStats(req, res) {
    const candidateId = this.getUserId(req);
    const stats = await this.service("candidateService").getCandidateStats(candidateId);

    return this.success(res, {
      data: stats,
    });
  }

  /**
   * Upload profile image (candidate authenticated)
   * POST /api/candidates/profile/image
   */
  async uploadProfileImage(req, res) {
    const candidateId = this.getUserId(req);
    
    if (!req.file) {
      return this.badRequest(res, { message: "No image file provided" });
    }

    const imagePath = req.file.path || `uploads/${req.file.filename}`;
    const candidate = await this.service("candidateService").updateProfileImage(candidateId, imagePath);

    // Convert path to URL before sending response
    const FileService = (await import("../../services/file.service.js")).default;
    const imageUrl = FileService.getFileUrl(candidate.profile_image);

    return this.success(res, {
      data: { image_url: imageUrl },
      message: "Profile image uploaded successfully",
    });
  }

  /**
   * Delete profile image (candidate authenticated)
   * DELETE /api/candidates/profile/image
   */
  async deleteProfileImage(req, res) {
    const candidateId = this.getUserId(req);
    await this.service("candidateService").deleteProfileImage(candidateId);

    return this.success(res, {
      message: "Profile image deleted successfully",
    });
  }

  /**
   * Upload cover image (candidate authenticated)
   * POST /api/candidates/profile/cover
   */
  async uploadCoverImage(req, res) {
    const candidateId = this.getUserId(req);
    
    if (!req.file) {
      return this.badRequest(res, { message: "No image file provided" });
    }

    const imagePath = req.file.path || `uploads/${req.file.filename}`;
    const candidate = await this.service("candidateService").updateCoverImage(candidateId, imagePath);

    // Convert path to URL before sending response
    const FileService = (await import("../../services/file.service.js")).default;
    const imageUrl = FileService.getFileUrl(candidate.cover_image);

    return this.success(res, {
      data: { image_url: imageUrl },
      message: "Cover image uploaded successfully",
    });
  }

  /**
   * Upload gallery images (candidate authenticated)
   * POST /api/candidates/profile/gallery
   */
  async uploadGalleryImages(req, res) {
    const candidateId = this.getUserId(req);
    
    if (!req.files || req.files.length === 0) {
      return this.badRequest(res, { message: "No image files provided" });
    }

    const imagePaths = req.files.map(file => file.path || `uploads/${file.filename}`);
    const candidate = await this.service("candidateService").addGalleryImages(candidateId, imagePaths);

    // Convert paths to URLs before sending response
    const FileService = (await import("../../services/file.service.js")).default;
    const galleryUrls = FileService.getFileUrls(candidate.gallery);

    return this.success(res, {
      data: { gallery: galleryUrls },
      message: "Gallery images uploaded successfully",
    });
  }

  /**
   * Delete gallery image (candidate authenticated)
   * DELETE /api/candidates/profile/gallery
   */
  async deleteGalleryImage(req, res) {
    const candidateId = this.getUserId(req);
    const { image_url } = req.query;

    if (!image_url) {
      return this.badRequest(res, { message: "Image URL is required" });
    }

    await this.service("candidateService").removeGalleryImage(candidateId, image_url);

    return this.success(res, {
      message: "Gallery image deleted successfully",
    });
  }

  // ==================== CANDIDATE STATUS (ADMIN) ====================

  /**
   * Approve candidate
   * PUT /api/candidates/:id/approve
   */
  async approve(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").approveProfile(id, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate approved successfully",
    });
  }

  /**
   * Reject candidate
   * PUT /api/candidates/:id/reject
   */
  async reject(req, res) {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").rejectCandidate(id, reason, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate rejected",
    });
  }

  /**
   * Suspend candidate
   * PUT /api/candidates/:id/suspend
   */
  async suspend(req, res) {
    const { id } = req.params;
    const { reason } = req.body;
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").suspendCandidate(id, reason, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate suspended",
    });
  }

  /**
   * Reinstate candidate
   * PUT /api/candidates/:id/reinstate
   */
  async reinstate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").reinstateCandidate(id, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate reinstated",
    });
  }

  // ==================== CATEGORY MANAGEMENT ====================

  /**
   * Add candidate to categories
   * POST /api/candidates/:id/categories
   */
  async addToCategories(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CandidateValidation.addCategoriesSchema);
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").addToCategories(id, validated.categories, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate added to categories",
    });
  }

  /**
   * Remove candidate from categories
   * DELETE /api/candidates/:id/categories
   */
  async removeFromCategories(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CandidateValidation.removeCategoriesSchema);
    const adminId = this.getUserId(req);
    const candidate = await this.service("candidateService").removeFromCategories(id, validated.categories, adminId);

    return this.success(res, {
      data: candidate,
      message: "Candidate removed from categories",
    });
  }

  /**
   * Get candidate's categories
   * GET /api/candidates/:id/categories
   */
  async getCategories(req, res) {
    const { id } = req.params;
    const categories = await this.service("candidateService").getCandidateCategories(id);

    return this.success(res, {
      data: categories,
    });
  }

  // ==================== CANDIDATE STATISTICS ====================

  /**
   * Get candidate statistics
   * GET /api/candidates/:id/stats
   */
  async getStats(req, res) {
    const { id } = req.params;
    const stats = await this.service("candidateService").getCandidateStats(id);

    return this.success(res, {
      data: stats,
    });
  }

  /**
   * Get candidate vote count
   * GET /api/candidates/:id/votes
   */
  async getVotes(req, res) {
    const { id } = req.params;
    const votes = await this.service("candidateService").getCandidateVotes(id);

    return this.success(res, {
      data: votes,
    });
  }

  // ==================== BULK OPERATIONS ====================

  /**
   * Bulk approve candidates
   * POST /api/candidates/bulk/approve
   */
  async bulkApprove(req, res) {
    const validated = this.validate(req.body, CandidateValidation.bulkOperationSchema);
    const adminId = this.getUserId(req);
    const result = await this.service("candidateService").bulkApprove(validated.candidateIds, adminId);

    return this.success(res, {
      data: result,
      message: `${result.modifiedCount} candidates approved`,
    });
  }

  /**
   * Bulk reject candidates
   * POST /api/candidates/bulk/reject
   */
  async bulkReject(req, res) {
    const validated = this.validate(req.body, CandidateValidation.bulkRejectSchema);
    const adminId = this.getUserId(req);
    const result = await this.service("candidateService").bulkReject(
      validated.candidateIds,
      validated.reason,
      adminId
    );

    return this.success(res, {
      data: result,
      message: `${result.modifiedCount} candidates rejected`,
    });
  }

  // ==================== EVENT-SPECIFIC ====================

  /**
   * Get candidates by event
   * GET /api/events/:eventId/candidates
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit, skip } = this.getPagination(req);
    const filters = { event: eventId, ...this.getFilters(req, ["status", "categories"]) };
    const sort = this.getSort(req);

    const [candidates, total] = await Promise.all([
      this.service("candidateService").findAll(filters, { skip, limit, sort }),
      this.service("candidateService").count(filters),
    ]);

    return this.paginated(res, {
      data: candidates,
      page,
      limit,
      total_items: total,
    });
  }

  /**
   * Get public candidates for voting (approved only)
   * GET /api/events/:eventId/candidates/public
   */
  async getPublicByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit, skip } = this.getPagination(req);
    const categoryId = req.query.category;

    const [candidates, total] = await Promise.all([
      this.service("candidateService").getPublicCandidates(eventId, categoryId, { skip, limit }),
      this.service("candidateService").countPublicCandidates(eventId, categoryId),
    ]);

    return this.paginated(res, {
      data: candidates,
      page,
      limit,
      total_items: total,
    });
  }
}

// Export both class and singleton instance
export { CandidateController };
export default new CandidateController();
