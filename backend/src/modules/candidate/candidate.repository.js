/**
 * Candidate Repository
 * This file defines the CandidateRepository class which extends the BaseRepository
 * It contains candidate-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository.js";
import CandidateModel from "./candidate.model.js";
import { STATUS } from "../../utils/constants/candidate.constants.js";
import { th } from "@faker-js/faker";

class CandidateRepository extends BaseRepository {
  constructor() {
    super(CandidateModel);
  }

  /**
   * Find all candidates for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of candidates
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model
        .find({ event: eventId })
        .sort({ display_order: 1, vote_count: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidates by event failed: ${error.message}`);
    }
  }

  /**
   * Find all candidates in a specific category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of candidates
   */
  async findByCategory(categoryId, options = {}) {
    try {
      const query = this.model
        .find({ categories: categoryId })
        .sort({ display_order: 1, vote_count: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidates by category failed: ${error.message}`);
    }
  }

  /**
   * Find candidates by event and category
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of candidates
   */
  async findByEventAndCategory(eventId, categoryId, options = {}) {
    try {
      const query = this.model
        .find({ event: eventId, categories: categoryId })
        .sort({ display_order: 1, vote_count: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidates by event and category failed: ${error.message}`);
    }
  }

  /**
   * Find approved candidates
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of approved candidates
   */
  async findApproved(eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.APPROVED, is_published: true };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ vote_count: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find approved candidates failed: ${error.message}`);
    }
  }

  /**
   * Find pending candidates (awaiting approval)
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of pending candidates
   */
  async findPending(eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.PENDING };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ nomination_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find pending candidates failed: ${error.message}`);
    }
  }

  /**
   * Find rejected candidates
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of rejected candidates
   */
  async findRejected(eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.REJECTED };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ updated_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find rejected candidates failed: ${error.message}`);
    }
  }

  /**
   * Find featured candidates
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [limit=5] - Maximum number to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of featured candidates
   */
  async findFeatured(eventId = null, limit = 5, options = {}) {
    try {
      const filter = { is_featured: true, is_published: true, status: STATUS.APPROVED };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ vote_count: -1 }).limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find featured candidates failed: ${error.message}`);
    }
  }

  /**
   * Find candidate by slug
   * @param {string} slug - Candidate slug
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Candidate or null
   */
  async findBySlug(slug, options = {}) {
    try {
      const query = this.model.findOne({ slug });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidate by slug failed: ${error.message}`);
    }
  }

  /**
   * Find candidates by status
   * @param {string} status - Candidate status
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of candidates
   */
  async findByStatus(status, eventId = null, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const filter = { status };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ nomination_date: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidates by status failed: ${error.message}`);
    }
  }

  /**
   * Search candidates by name, bio, or tags
   * @param {string} searchTerm - Search term
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of matching candidates
   */
  async search(searchTerm, eventId = null, options = {}) {
    try {
      const regex = new RegExp(searchTerm, "i");
      const filter = {
        $or: [
          { first_name: regex },
          { last_name: regex },
          { bio: regex },
          { tags: regex },
        ],
        is_published: true,
        status: STATUS.APPROVED,
      };

      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ vote_count: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Search candidates failed: ${error.message}`);
    }
  }

  /**
   * Find candidates by tags
   * @param {string|Array<string>} tags - Tag(s) to search for
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of candidates
   */
  async findByTags(tags, eventId = null, options = {}) {
    try {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      const filter = {
        tags: { $in: tagArray },
        is_published: true,
        status: STATUS.APPROVED,
      };

      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ vote_count: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidates by tags failed: ${error.message}`);
    }
  }

  /**
   * Find top candidates by vote count
   * @param {number} [limit=10] - Maximum number to return
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {string|mongoose.Types.ObjectId} [categoryId] - Optional category ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Top candidates by votes
   */
  async findTopByVotes(limit = 10, eventId = null, categoryId = null, options = {}) {
    try {
      const filter = { is_published: true, status: STATUS.APPROVED };
      if (eventId) filter.event = eventId;
      if (categoryId) filter.categories = categoryId;

      const query = this.model.find(filter).sort({ vote_count: -1 }).limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find top candidates by votes failed: ${error.message}`);
    }
  }

  /**
   * Find trending candidates (by recent votes/views)
   * @param {number} [limit=10] - Maximum number to return
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Trending candidates
   */
  async findTrending(limit = 10, eventId = null, options = {}) {
    try {
      const filter = { is_published: true, status: STATUS.APPROVED };
      if (eventId) filter.event = eventId;

      const query = this.model
        .find(filter)
        .sort({ view_count: -1, vote_count: -1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find trending candidates failed: ${error.message}`);
    }
  }

  /**
   * Approve a candidate
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async approve(candidateId) {
    try {
      const candidate = await this.model.findById(candidateId);

      console.log("Approving candidate:", candidateId, candidate);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      await this.updateById(candidateId, { status: STATUS.APPROVED });

      return await candidate.approve();
    } catch (error) {
      throw new Error(`Approve candidate failed: ${error.message}`);
    }
  }

  /**
   * Reject a candidate
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string} reason - Rejection reason
   * @returns {Promise<Object>} - Updated candidate
   */
  async reject(candidateId, reason) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.reject(reason);
    } catch (error) {
      throw new Error(`Reject candidate failed: ${error.message}`);
    }
  }

  /**
   * Increment vote count for a candidate
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {number} [count=1] - Number of votes to add
   * @returns {Promise<Object>} - Updated candidate
   */
  async incrementVotes(candidateId, count = 1) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.incrementVotes(count);
    } catch (error) {
      throw new Error(`Increment votes failed: ${error.message}`);
    }
  }

  /**
   * Decrement vote count for a candidate
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {number} [count=1] - Number of votes to remove
   * @returns {Promise<Object>} - Updated candidate
   */
  async decrementVotes(candidateId, count = 1) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.decrementVotes(count);
    } catch (error) {
      throw new Error(`Decrement votes failed: ${error.message}`);
    }
  }

  /**
   * Increment view count for a candidate
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async incrementViews(candidateId) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.incrementViews();
    } catch (error) {
      throw new Error(`Increment views failed: ${error.message}`);
    }
  }

  /**
   * Add candidate to a category
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async addToCategory(candidateId, categoryId) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.addToCategory(categoryId);
    } catch (error) {
      throw new Error(`Add to category failed: ${error.message}`);
    }
  }

  /**
   * Remove candidate from a category
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async removeFromCategory(candidateId, categoryId) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.removeFromCategory(categoryId);
    } catch (error) {
      throw new Error(`Remove from category failed: ${error.message}`);
    }
  }

  /**
   * Update candidate status
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string} status - New status
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated candidate
   */
  async updateStatus(candidateId, status, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      return await this.updateById(candidateId, { status }, options);
    } catch (error) {
      throw new Error(`Update status failed: ${error.message}`);
    }
  }

  /**
   * Toggle featured status
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated candidate
   */
  async toggleFeatured(candidateId, options = {}) {
    try {
      const candidate = await this.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await this.updateById(
        candidateId,
        { is_featured: !candidate.is_featured },
        options
      );
    } catch (error) {
      throw new Error(`Toggle featured failed: ${error.message}`);
    }
  }

  /**
   * Toggle published status
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated candidate
   */
  async togglePublished(candidateId, options = {}) {
    try {
      const candidate = await this.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await this.updateById(
        candidateId,
        { is_published: !candidate.is_published },
        options
      );
    } catch (error) {
      throw new Error(`Toggle published failed: ${error.message}`);
    }
  }

  /**
   * Update display order
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {number} order - New display order
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated candidate
   */
  async updateDisplayOrder(candidateId, order, options = {}) {
    try {
      return await this.updateById(candidateId, { display_order: order }, options);
    } catch (error) {
      throw new Error(`Update display order failed: ${error.message}`);
    }
  }

  /**
   * Bulk update display orders
   * @param {Array<{id: string, order: number}>} updates - Array of {id, order} objects
   * @returns {Promise<Array>} - Updated candidates
   */
  async bulkUpdateDisplayOrder(updates) {
    try {
      const bulkOps = updates.map(({ id, order }) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { display_order: order, updated_at: Date.now() } },
        },
      }));

      await this.model.bulkWrite(bulkOps);

      // Return updated candidates
      const ids = updates.map((u) => u.id);
      return await this.model.find({ _id: { $in: ids } }).sort({ display_order: 1 }).exec();
    } catch (error) {
      throw new Error(`Bulk update display order failed: ${error.message}`);
    }
  }

  /**
   * Get candidate statistics for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Candidate statistics
   */
  async getStatisticsByEvent(eventId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            approved: [
              { $match: { status: STATUS.APPROVED } },
              { $count: "count" },
            ],
            pending: [
              { $match: { status: STATUS.PENDING } },
              { $count: "count" },
            ],
            rejected: [
              { $match: { status: STATUS.REJECTED } },
              { $count: "count" },
            ],
            published: [
              { $match: { is_published: true } },
              { $count: "count" },
            ],
            featured: [
              { $match: { is_featured: true } },
              { $count: "count" },
            ],
            totalVotes: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$vote_count" },
                },
              },
            ],
            totalViews: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$view_count" },
                },
              },
            ],
            avgVotes: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$vote_count" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            approved: { $arrayElemAt: ["$approved.count", 0] },
            pending: { $arrayElemAt: ["$pending.count", 0] },
            rejected: { $arrayElemAt: ["$rejected.count", 0] },
            published: { $arrayElemAt: ["$published.count", 0] },
            featured: { $arrayElemAt: ["$featured.count", 0] },
            totalVotes: { $arrayElemAt: ["$totalVotes.total", 0] },
            totalViews: { $arrayElemAt: ["$totalViews.total", 0] },
            averageVotes: { $arrayElemAt: ["$avgVotes.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        approved: stats?.approved || 0,
        pending: stats?.pending || 0,
        rejected: stats?.rejected || 0,
        published: stats?.published || 0,
        featured: stats?.featured || 0,
        totalVotes: stats?.totalVotes || 0,
        totalViews: stats?.totalViews || 0,
        averageVotes: Math.round(stats?.averageVotes || 0),
      };
    } catch (error) {
      throw new Error(`Get statistics by event failed: ${error.message}`);
    }
  }

  /**
   * Get candidate statistics for a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Candidate statistics
   */
  async getStatisticsByCategory(categoryId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { categories: categoryId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            approved: [
              { $match: { status: STATUS.APPROVED } },
              { $count: "count" },
            ],
            published: [
              { $match: { is_published: true } },
              { $count: "count" },
            ],
            totalVotes: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$vote_count" },
                },
              },
            ],
            avgVotes: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$vote_count" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            approved: { $arrayElemAt: ["$approved.count", 0] },
            published: { $arrayElemAt: ["$published.count", 0] },
            totalVotes: { $arrayElemAt: ["$totalVotes.total", 0] },
            averageVotes: { $arrayElemAt: ["$avgVotes.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        approved: stats?.approved || 0,
        published: stats?.published || 0,
        totalVotes: stats?.totalVotes || 0,
        averageVotes: Math.round(stats?.averageVotes || 0),
      };
    } catch (error) {
      throw new Error(`Get statistics by category failed: ${error.message}`);
    }
  }

  /**
   * Find candidate by email
   * @param {string} email - Candidate email
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Candidate or null
   */
  async findByEmail(email, eventId = null, options = {}) {
    try {
      const filter = { email: email.toLowerCase() };
      if (eventId) filter.event = eventId;

      const query = this.model.findOne(filter);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidate by email failed: ${error.message}`);
    }
  }

  /**
   * Find candidate by candidate code
   * @param {string} candidateCode - Candidate code
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Candidate or null
   */
  async findByCandidateCode(candidateCode, options = {}) {
    try {
      const query = this.model.findOne({ candidate_code: candidateCode.toUpperCase() });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidate by code failed: ${error.message}`);
    }
  }

  /**
   * Find candidate with password (for authentication)
   * @param {string} email - Candidate email
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @returns {Promise<Object|null>} - Candidate with password or null
   */
  async findByEmailWithPassword(email, eventId = null) {
    try {
      const filter = { email: email.toLowerCase() };
      if (eventId) filter.event = eventId;

      return await this.model.findOne(filter).select("+password_hash").exec();
    } catch (error) {
      throw new Error(`Find candidate with password failed: ${error.message}`);
    }
  }

  /**
   * Find candidate by code with password (for authentication)
   * @param {string} candidateCode - Candidate code
   * @returns {Promise<Object|null>} - Candidate with password or null
   */
  async findByCandidateCodeWithPassword(candidateCode) {
    try {
      return await this.model
        .findOne({ candidate_code: candidateCode.toUpperCase() })
        .select("+password_hash")
        .exec();
    } catch (error) {
      throw new Error(`Find candidate by code with password failed: ${error.message}`);
    }
  }

  /**
   * Find candidates needing review (pending for more than X days)
   * @param {number} [days=7] - Number of days threshold
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Candidates needing review
   */
  async findNeedingReview(days = 7, eventId = null, options = {}) {
    try {
      const threshold = new Date();
      threshold.setDate(threshold.getDate() - days);

      const filter = {
        status: STATUS.PENDING,
        nomination_date: { $lte: threshold },
      };

      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ nomination_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find candidates needing review failed: ${error.message}`);
    }
  }

  /**
   * Find candidates with profile updates pending
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Candidates with profile updates
   */
  async findProfileUpdatesPending(eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.PROFILE_UPDATE_PENDING };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ updated_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find profile updates pending failed: ${error.message}`);
    }
  }

  /**
   * Update candidate password
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string} passwordHash - Hashed password
   * @returns {Promise<Object|null>} - Updated candidate
   */
  async updatePassword(candidateId, passwordHash) {
    try {
      return await this.updateById(candidateId, { password_hash: passwordHash });
    } catch (error) {
      throw new Error(`Update password failed: ${error.message}`);
    }
  }

  /**
   * Request re-approval after profile update
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Array<string>} changedFields - Fields that were changed
   * @param {string} reason - Reason for update
   * @returns {Promise<Object>} - Updated candidate
   */
  async requestReApproval(candidateId, changedFields = [], reason = "Profile update") {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      return await candidate.requestReApproval(changedFields, reason);
    } catch (error) {
      throw new Error(`Request re-approval failed: ${error.message}`);
    }
  }

  /**
   * Update last login timestamp
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async updateLastLogin(candidateId) {
    try {
      return await this.updateById(candidateId, { last_login: new Date() });
    } catch (error) {
      throw new Error(`Update last login failed: ${error.message}`);
    }
  }

  /**
   * Admin-only: Remove category from candidate (including admin-verified)
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object|null>} - Updated candidate
   */
  async adminRemoveCategory(candidateId, categoryId) {
    try {
      const candidate = await this.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      if (candidate.categories.length <= 1) {
        throw new Error("Candidate must belong to at least one category");
      }

      // Remove from both categories and admin_verified_categories
      candidate.categories = candidate.categories.filter(
        cat => cat.toString() !== categoryId.toString()
      );
      
      candidate.admin_verified_categories = candidate.admin_verified_categories.filter(
        cat => cat.toString() !== categoryId.toString()
      );

      return await candidate.save();
    } catch (error) {
      throw new Error(`Admin remove category failed: ${error.message}`);
    }
  }

  /**
   * Get leaderboard (top candidates by votes)
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} [categoryId] - Optional category ID filter
   * @param {number} [limit=20] - Maximum number to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Leaderboard
   */
  async getLeaderboard(eventId, categoryId = null, limit = 20, options = {}) {
    try {
      const filter = {
        event: eventId,
        status: STATUS.APPROVED,
        is_published: true,
      };

      if (categoryId) filter.categories = categoryId;

      const query = this.model
        .find(filter)
        .sort({ vote_count: -1, view_count: -1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Get leaderboard failed: ${error.message}`);
    }
  }
}

export default new CandidateRepository();