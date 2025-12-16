/**
 * Vote Controller
 * Handles HTTP requests for vote casting and management
 */

import BaseController from "../../shared/base.controller.js";
import VoteService from "./vote.service.js";
import VoteValidation from "./vote.validation.js";

class VoteController extends BaseController {
  constructor(dependencies = {}) {
    super({
      voteService: dependencies.voteService || VoteService,
    });
  }

  // ==================== VOTE CASTING ====================

  /**
   * Cast a vote
   * POST /api/votes
   */
  async cast(req, res) {
    const { vote_code, candidate_id, category_id, event_id } = req.body;
    const ipAddress = this.getClientIP(req);
    const userAgent = req.headers["user-agent"];

    const vote = await this.service("voteService").castVote({
      voteCode: vote_code,
      candidateId: candidate_id,
      categoryId: category_id,
      eventId: event_id,
      ipAddress,
      userAgent,
      metadata: req.body.metadata || {},
    });

    return this.created(res, {
      data: vote,
      message: "Vote cast successfully",
    });
  }

  /**
   * Validate vote eligibility before casting
   * POST /api/votes/validate-eligibility
   */
  async validateEligibility(req, res) {
    const { vote_code, category_id } = req.body;

    if (!vote_code || !category_id) {
      return this.badRequest(res, { message: "vote_code and category_id are required" });
    }

    const result = await this.service("voteService").validateVoteEligibility(vote_code, category_id);

    return this.success(res, {
      data: result,
    });
  }

  // ==================== VOTE QUERIES ====================

  /**
   * Get all votes with pagination and filters
   * GET /api/votes
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["event", "candidate", "category", "payment", "status", "vote_code"]);
    const sort = this.getSort(req, "-cast_at");

    // Date range filters
    if (req.query.cast_at_from) {
      filters.cast_at = { ...filters.cast_at, $gte: new Date(req.query.cast_at_from) };
    }
    if (req.query.cast_at_to) {
      filters.cast_at = { ...filters.cast_at, $lte: new Date(req.query.cast_at_to) };
    }

    const result = await this.service("voteService").repository.findAll(
      filters,
      page,
      limit,
      { sort, populate: ["candidate", "category"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get vote by ID
   * GET /api/votes/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const vote = await this.service("voteService").getVoteById(id, {
      populate: ["candidate", "category", "event"],
    });

    return this.success(res, {
      data: vote,
    });
  }

  /**
   * Get votes by vote code
   * GET /api/votes/code/:code
   */
  async getByVoteCode(req, res) {
    const { code } = req.params;
    const votes = await this.service("voteService").getVotesByVoteCode(code.toUpperCase(), {
      populate: ["candidate", "category"],
    });

    return this.success(res, {
      data: votes,
    });
  }

  /**
   * Get votes by candidate
   * GET /api/votes/candidate/:candidateId
   */
  async getByCandidate(req, res) {
    const { candidateId } = req.params;
    const { page, limit } = this.getPagination(req);
    const result = await this.service("voteService").getVotesByCandidate(candidateId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get votes by category
   * GET /api/votes/category/:categoryId
   */
  async getByCategory(req, res) {
    const { categoryId } = req.params;
    const { page, limit } = this.getPagination(req);
    const result = await this.service("voteService").getVotesByCategory(categoryId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get votes by event
   * GET /api/votes/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const result = await this.service("voteService").getVotesByEvent(eventId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== VOTE MANAGEMENT (ADMIN) ====================

  /**
   * Refund a vote (admin only)
   * POST /api/votes/:id/refund
   */
  async refund(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, VoteValidation.refundVoteSchema);
    const adminId = this.getUserId(req);

    const vote = await this.service("voteService").refundVote(id, validated.refund_reason, adminId);

    return this.success(res, {
      data: vote,
      message: "Vote refunded successfully",
    });
  }

  // ==================== VOTE COUNTS ====================

  /**
   * Get vote count by candidate
   * GET /api/votes/count/candidate/:candidateId
   */
  async countByCandidate(req, res) {
    const { candidateId } = req.params;
    const count = await this.service("voteService").getVoteCountByCandidate(candidateId);

    return this.success(res, {
      data: { candidate_id: candidateId, vote_count: count },
    });
  }

  /**
   * Get vote count by category
   * GET /api/votes/count/category/:categoryId
   */
  async countByCategory(req, res) {
    const { categoryId } = req.params;
    const count = await this.service("voteService").getVoteCountByCategory(categoryId);

    return this.success(res, {
      data: { category_id: categoryId, vote_count: count },
    });
  }

  /**
   * Get vote count by event
   * GET /api/votes/count/event/:eventId
   */
  async countByEvent(req, res) {
    const { eventId } = req.params;
    const count = await this.service("voteService").getVoteCountByEvent(eventId);

    return this.success(res, {
      data: { event_id: eventId, vote_count: count },
    });
  }

  // ==================== RESULTS & ANALYTICS ====================

  /**
   * Get category results
   * GET /api/votes/results/category/:categoryId
   */
  async getCategoryResults(req, res) {
    const { categoryId } = req.params;
    const results = await this.service("voteService").getCategoryResults(categoryId);

    return this.success(res, {
      data: results,
    });
  }

  /**
   * Get event results
   * GET /api/votes/results/event/:eventId
   */
  async getEventResults(req, res) {
    const { eventId } = req.params;
    const results = await this.service("voteService").getEventResults(eventId);

    return this.success(res, {
      data: results,
    });
  }

  /**
   * Get voting trends
   * GET /api/votes/trends/:eventId
   */
  async getVotingTrends(req, res) {
    const { eventId } = req.params;
    const { interval, start_date, end_date } = req.query;

    const trends = await this.service("voteService").getVotingTrends(
      eventId,
      interval || "day",
      start_date ? new Date(start_date) : undefined,
      end_date ? new Date(end_date) : undefined
    );

    return this.success(res, {
      data: trends,
    });
  }

  /**
   * Get vote distribution by category
   * GET /api/votes/distribution/:eventId
   */
  async getVoteDistribution(req, res) {
    const { eventId } = req.params;
    const distribution = await this.service("voteService").getVoteDistribution(eventId);

    return this.success(res, {
      data: distribution,
    });
  }

  /**
   * Get top candidates
   * GET /api/votes/top-candidates/:eventId
   */
  async getTopCandidates(req, res) {
    const { eventId } = req.params;
    const limit = parseInt(req.query.limit, 10) || 10;
    const topCandidates = await this.service("voteService").getTopCandidates(eventId, limit);

    return this.success(res, {
      data: topCandidates,
    });
  }

  /**
   * Get voting statistics
   * GET /api/votes/stats/:eventId
   */
  async getVotingStats(req, res) {
    const { eventId } = req.params;
    const stats = await this.service("voteService").getVotingStats(eventId);

    return this.success(res, {
      data: stats,
    });
  }

  // ==================== SECURITY & MONITORING ====================

  /**
   * Detect suspicious voting patterns
   * GET /api/votes/suspicious/:eventId
   */
  async detectSuspicious(req, res) {
    const { eventId } = req.params;
    const threshold = parseInt(req.query.threshold, 10) || 10;
    const minutes = parseInt(req.query.minutes, 10) || 5;

    const patterns = await this.service("voteService").detectSuspiciousPatterns(
      eventId,
      threshold,
      minutes
    );

    return this.success(res, {
      data: patterns,
    });
  }

  // ==================== VOTER HISTORY ====================

  /**
   * Get voter history by vote code
   * GET /api/votes/history/:code
   */
  async getVoterHistory(req, res) {
    const { code } = req.params;
    const history = await this.service("voteService").getVoterHistory(code.toUpperCase());

    return this.success(res, {
      data: history,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { VoteController };
export default new VoteController();
