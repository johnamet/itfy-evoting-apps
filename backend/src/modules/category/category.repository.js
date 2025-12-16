/**
 * Category Repository
 * This file defines the CategoryRepository class which extends the BaseRepository
 * It contains category-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository.js";
import CategoryModel from "./category.model.js";
import { STATUS } from "../../utils/constants/category.constants.js";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(CategoryModel);
  }

  /**
   * Find all categories for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of categories
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model
        .find({ event: eventId })
        .sort({ display_order: 1, name: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find categories by event failed: ${error.message}`);
    }
  }

  /**
   * Find categories with active voting
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of categories with active voting
   */
  async findActiveVoting(eventId = null, options = {}) {
    try {
      const now = new Date();
      const filter = {
        is_voting_open: true,
        status: STATUS.ACTIVE,
        voting_deadline: { $gt: now },
      };
      
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ voting_deadline: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find active voting categories failed: ${error.message}`);
    }
  }

  /**
   * Find categories with upcoming voting
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of categories with upcoming voting
   */
  async findUpcomingVoting(eventId = null, options = {}) {
    try {
      const now = new Date();
      const filter = {
        voting_start_date: { $gt: now },
        status: STATUS.ACTIVE,
      };
      
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ voting_start_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find upcoming voting categories failed: ${error.message}`);
    }
  }

  /**
   * Find categories with closed voting
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of categories with closed voting
   */
  async findClosedVoting(eventId = null, options = {}) {
    try {
      const now = new Date();
      const filter = {
        $or: [
          { voting_deadline: { $lte: now } },
          { status: STATUS.CLOSED },
        ],
      };
      
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ voting_deadline: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find closed voting categories failed: ${error.message}`);
    }
  }

  /**
   * Find featured categories
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [limit=5] - Maximum number to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of featured categories
   */
  async findFeatured(eventId = null, limit = 5, options = {}) {
    try {
      const filter = { is_featured: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.model
        .find(filter)
        .sort({ display_order: 1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find featured categories failed: ${error.message}`);
    }
  }

  /**
   * Find category by slug
   * @param {string} slug - Category slug
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Category or null
   */
  async findBySlug(slug, options = {}) {
    try {
      const query = this.model.findOne({ slug });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find category by slug failed: ${error.message}`);
    }
  }

  /**
   * Find categories by status
   * @param {string} status - Category status
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of categories
   */
  async findByStatus(status, eventId = null, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const filter = { status };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find categories by status failed: ${error.message}`);
    }
  }

  /**
   * Search categories by name or description
   * @param {string} searchTerm - Search term
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of matching categories
   */
  async search(searchTerm, eventId = null, options = {}) {
    try {
      const regex = new RegExp(searchTerm, "i");
      const filter = {
        $or: [{ name: regex }, { description: regex }],
      };
      
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Search categories failed: ${error.message}`);
    }
  }

  /**
   * Open voting for a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated category
   */
  async openVoting(categoryId) {
    try {
      const category = await this.model.findById(categoryId);
      
      if (!category) {
        throw new Error("Category not found");
      }

      return await category.openVoting();
    } catch (error) {
      throw new Error(`Open voting failed: ${error.message}`);
    }
  }

  /**
   * Close voting for a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated category
   */
  async closeVoting(categoryId) {
    try {
      const category = await this.model.findById(categoryId);
      
      if (!category) {
        throw new Error("Category not found");
      }

      return await category.closeVoting();
    } catch (error) {
      throw new Error(`Close voting failed: ${error.message}`);
    }
  }

  /**
   * Add a candidate to a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated category
   */
  async addCandidate(categoryId, candidateId) {
    try {
      const category = await this.model.findById(categoryId);
      
      if (!category) {
        throw new Error("Category not found");
      }

      return await category.addCandidate(candidateId);
    } catch (error) {
      throw new Error(`Add candidate failed: ${error.message}`);
    }
  }

  /**
   * Remove a candidate from a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated category
   */
  async removeCandidate(categoryId, candidateId) {
    try {
      const category = await this.model.findById(categoryId);
      
      if (!category) {
        throw new Error("Category not found");
      }

      return await category.removeCandidate(candidateId);
    } catch (error) {
      throw new Error(`Remove candidate failed: ${error.message}`);
    }
  }

  /**
   * Increment vote count for a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {number} [count=1] - Number of votes to add
   * @returns {Promise<Object>} - Updated category
   */
  async incrementVotes(categoryId, count = 1) {
    try {
      const category = await this.model.findById(categoryId);
      
      if (!category) {
        throw new Error("Category not found");
      }

      return await category.incrementVotes(count);
    } catch (error) {
      throw new Error(`Increment votes failed: ${error.message}`);
    }
  }

  /**
   * Update category status
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {string} status - New status
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated category
   */
  async updateStatus(categoryId, status, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      return await this.updateById(categoryId, { status }, options);
    } catch (error) {
      throw new Error(`Update status failed: ${error.message}`);
    }
  }

  /**
   * Toggle featured status
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated category
   */
  async toggleFeatured(categoryId, options = {}) {
    try {
      const category = await this.findById(categoryId);
      
      if (!category) {
        throw new Error("Category not found");
      }

      return await this.updateById(
        categoryId,
        { is_featured: !category.is_featured },
        options
      );
    } catch (error) {
      throw new Error(`Toggle featured failed: ${error.message}`);
    }
  }

  /**
   * Update display order
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {number} order - New display order
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated category
   */
  async updateDisplayOrder(categoryId, order, options = {}) {
    try {
      return await this.updateById(categoryId, { display_order: order }, options);
    } catch (error) {
      throw new Error(`Update display order failed: ${error.message}`);
    }
  }

  /**
   * Bulk update display orders
   * @param {Array<{id: string, order: number}>} updates - Array of {id, order} objects
   * @returns {Promise<Array>} - Updated categories
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

      // Return updated categories
      const ids = updates.map(u => u.id);
      return await this.model.find({ _id: { $in: ids } }).sort({ display_order: 1 }).exec();
    } catch (error) {
      throw new Error(`Bulk update display order failed: ${error.message}`);
    }
  }

  /**
   * Get category statistics for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Category statistics
   */
  async getStatisticsByEvent(eventId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [
              { $match: { status: STATUS.ACTIVE } },
              { $count: "count" },
            ],
            closed: [
              { $match: { status: STATUS.CLOSED } },
              { $count: "count" },
            ],
            archived: [
              { $match: { status: STATUS.ARCHIVED } },
              { $count: "count" },
            ],
            votingOpen: [
              { $match: { is_voting_open: true } },
              { $count: "count" },
            ],
            featured: [
              { $match: { is_featured: true } },
              { $count: "count" },
            ],
            totalCandidates: [
              {
                $project: {
                  candidateCount: { $size: "$candidates" },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$candidateCount" },
                },
              },
            ],
            totalVotes: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_votes" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            closed: { $arrayElemAt: ["$closed.count", 0] },
            archived: { $arrayElemAt: ["$archived.count", 0] },
            votingOpen: { $arrayElemAt: ["$votingOpen.count", 0] },
            featured: { $arrayElemAt: ["$featured.count", 0] },
            totalCandidates: { $arrayElemAt: ["$totalCandidates.total", 0] },
            totalVotes: { $arrayElemAt: ["$totalVotes.total", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        closed: stats?.closed || 0,
        archived: stats?.archived || 0,
        votingOpen: stats?.votingOpen || 0,
        featured: stats?.featured || 0,
        totalCandidates: stats?.totalCandidates || 0,
        totalVotes: stats?.totalVotes || 0,
      };
    } catch (error) {
      throw new Error(`Get statistics by event failed: ${error.message}`);
    }
  }

  /**
   * Get overall category statistics
   * @returns {Promise<Object>} - Overall statistics
   */
  async getOverallStatistics() {
    try {
      const [stats] = await this.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [
              { $match: { status: STATUS.ACTIVE } },
              { $count: "count" },
            ],
            closed: [
              { $match: { status: STATUS.CLOSED } },
              { $count: "count" },
            ],
            archived: [
              { $match: { status: STATUS.ARCHIVED } },
              { $count: "count" },
            ],
            votingOpen: [
              { $match: { is_voting_open: true } },
              { $count: "count" },
            ],
            featured: [
              { $match: { is_featured: true } },
              { $count: "count" },
            ],
            totalCandidates: [
              {
                $project: {
                  candidateCount: { $size: "$candidates" },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$candidateCount" },
                  average: { $avg: "$candidateCount" },
                },
              },
            ],
            totalVotes: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_votes" },
                  average: { $avg: "$total_votes" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            closed: { $arrayElemAt: ["$closed.count", 0] },
            archived: { $arrayElemAt: ["$archived.count", 0] },
            votingOpen: { $arrayElemAt: ["$votingOpen.count", 0] },
            featured: { $arrayElemAt: ["$featured.count", 0] },
            totalCandidates: { $arrayElemAt: ["$totalCandidates.total", 0] },
            averageCandidates: { $arrayElemAt: ["$totalCandidates.average", 0] },
            totalVotes: { $arrayElemAt: ["$totalVotes.total", 0] },
            averageVotes: { $arrayElemAt: ["$totalVotes.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        closed: stats?.closed || 0,
        archived: stats?.archived || 0,
        votingOpen: stats?.votingOpen || 0,
        featured: stats?.featured || 0,
        totalCandidates: stats?.totalCandidates || 0,
        averageCandidates: Math.round(stats?.averageCandidates || 0),
        totalVotes: stats?.totalVotes || 0,
        averageVotes: Math.round(stats?.averageVotes || 0),
      };
    } catch (error) {
      throw new Error(`Get overall statistics failed: ${error.message}`);
    }
  }

  /**
   * Find categories with voting ending soon
   * @param {number} [hours=24] - Number of hours threshold
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Categories with voting ending soon
   */
  async findVotingEndingSoon(hours = 24, eventId = null, options = {}) {
    try {
      const now = new Date();
      const threshold = new Date(now.getTime() + hours * 60 * 60 * 1000);

      const filter = {
        is_voting_open: true,
        voting_deadline: {
          $gt: now,
          $lte: threshold,
        },
      };
      
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ voting_deadline: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find voting ending soon failed: ${error.message}`);
    }
  }

  /**
   * Find categories that need to auto-close (deadline passed)
   * @returns {Promise<Array>} - Categories to auto-close
   */
  async findNeedingAutoClosure() {
    try {
      const now = new Date();
      return await this.model
        .find({
          is_voting_open: true,
          voting_deadline: { $lte: now },
        })
        .exec();
    } catch (error) {
      throw new Error(`Find categories needing auto-closure failed: ${error.message}`);
    }
  }

  /**
   * Find categories that need to auto-open (start date reached)
   * @returns {Promise<Array>} - Categories to auto-open
   */
  async findNeedingAutoOpening() {
    try {
      const now = new Date();
      return await this.model
        .find({
          is_voting_open: false,
          status: STATUS.ACTIVE,
          voting_start_date: { $lte: now },
          voting_deadline: { $gt: now },
        })
        .exec();
    } catch (error) {
      throw new Error(`Find categories needing auto-opening failed: ${error.message}`);
    }
  }

  /**
   * Get top categories by vote count
   * @param {number} [limit=10] - Maximum number to return
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Top categories by votes
   */
  async findTopByVotes(limit = 10, eventId = null, options = {}) {
    try {
      const filter = {};
      if (eventId) filter.event = eventId;

      const query = this.model
        .find(filter)
        .sort({ total_votes: -1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find top categories by votes failed: ${error.message}`);
    }
  }
}

export default new CategoryRepository();