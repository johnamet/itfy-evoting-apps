/**
 * Vote Repository
 * This file defines the VoteRepository class which extends the BaseRepository
 * It contains vote-specific data access methods
 * Updated to support aggregated vote records
 */

import { BaseRepository } from "../../shared/base.repository.js";
import VoteModel from "./vote.model.js";
import { VOTE_STATUS as STATUS } from "../../../utils/constants/vote.constants.js";

class VoteRepository extends BaseRepository {
  constructor() {
    super(VoteModel);
  }

  /**
   * Find all votes for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of votes
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model
        .find({ event: eventId, status: STATUS.ACTIVE })
        .sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by event failed: ${error.message}`);
    }
  }

  /**
   * Find all votes for a specific candidate
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of votes
   */
  async findByCandidate(candidateId, options = {}) {
    try {
      const query = this.model
        .find({ candidate: candidateId, status: STATUS.ACTIVE })
        .sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by candidate failed: ${error.message}`);
    }
  }

  /**
   * Find all votes for a specific category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of votes
   */
  async findByCategory(categoryId, options = {}) {
    try {
      const query = this.model
        .find({ category: categoryId, status: STATUS.ACTIVE })
        .sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by category failed: ${error.message}`);
    }
  }

  /**
   * Find all votes for a specific payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of votes
   */
  async findByPayment(paymentId, options = {}) {
    try {
      const query = this.model.find({ payment: paymentId }).sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by payment failed: ${error.message}`);
    }
  }

  /**
   * Find all votes by vote code
   * @param {string} voteCode - Vote code
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of votes
   */
  async findByVoteCode(voteCode, options = {}) {
    try {
      const query = this.model.find({ vote_code: voteCode.toUpperCase() }).sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by vote code failed: ${error.message}`);
    }
  }

  /**
   * Count votes for a candidate
   * NEW: Sums vote_count instead of counting documents
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<number>} - Vote count
   */
  async countForCandidate(candidateId) {
    try {
      const result = await this.model.aggregate([
        { $match: { candidate: candidateId, status: STATUS.ACTIVE } },
        { $group: { _id: null, total: { $sum: "$vote_count" } } },
      ]);
      return result[0]?.total || 0;
    } catch (error) {
      throw new Error(`Count votes for candidate failed: ${error.message}`);
    }
  }

  /**
   * Count votes for a category
   * NEW: Sums vote_count instead of counting documents
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<number>} - Vote count
   */
  async countForCategory(categoryId) {
    try {
      const result = await this.model.aggregate([
        { $match: { category: categoryId, status: STATUS.ACTIVE } },
        { $group: { _id: null, total: { $sum: "$vote_count" } } },
      ]);
      return result[0]?.total || 0;
    } catch (error) {
      throw new Error(`Count votes for category failed: ${error.message}`);
    }
  }

  /**
   * Count votes for an event
   * NEW: Sums vote_count instead of counting documents
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<number>} - Vote count
   */
  async countForEvent(eventId) {
    try {
      const result = await this.model.aggregate([
        { $match: { event: eventId, status: STATUS.ACTIVE } },
        { $group: { _id: null, total: { $sum: "$vote_count" } } },
      ]);
      return result[0]?.total || 0;
    } catch (error) {
      throw new Error(`Count votes for event failed: ${error.message}`);
    }
  }

  /**
   * Find refunded votes
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of refunded votes
   */
  async findRefunded(eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.REFUNDED };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ refunded_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find refunded votes failed: ${error.message}`);
    }
  }

  /**
   * Find recent votes
   * @param {number} [limit=50] - Maximum number to return
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Recent votes
   */
  async findRecent(limit = 50, eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ cast_at: -1 }).limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find recent votes failed: ${error.message}`);
    }
  }

  /**
   * Find votes by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Votes in date range
   */
  async findByDateRange(startDate, endDate, eventId = null, options = {}) {
    try {
      const filter = {
        cast_at: { $gte: startDate, $lte: endDate },
        status: STATUS.ACTIVE,
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by date range failed: ${error.message}`);
    }
  }

  /**
   * Find votes by IP hash (for fraud detection)
   * @param {string} ipHash - IP hash
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Votes from this IP
   */
  async findByIpHash(ipHash, options = {}) {
    try {
      const query = this.model.find({ ip_hash: ipHash }).sort({ cast_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find votes by IP hash failed: ${error.message}`);
    }
  }

  /**
   * Get vote statistics for an event
   * NEW: Uses vote_count for accurate totals
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Vote statistics
   */
  async getEventStatistics(eventId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            active: [
              { $match: { status: STATUS.ACTIVE } },
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            refunded: [
              { $match: { status: STATUS.REFUNDED } },
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            bulkVotes: [
              { $match: { status: STATUS.ACTIVE, is_bulk: true } },
              { $group: { _id: null, count: { $sum: "$vote_count" }, documents: { $sum: 1 } } }
            ],
            individualVotes: [
              { $match: { status: STATUS.ACTIVE, is_bulk: false } },
              { $group: { _id: null, count: { $sum: "$vote_count" }, documents: { $sum: 1 } } }
            ],
            byCandidate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: "$candidate",
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { count: -1 } },
              { $limit: 10 },
            ],
            byCategory: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: "$category",
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { count: -1 } },
            ],
            byDate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$cast_at" },
                  },
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { _id: 1 } },
            ],
            byHour: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d %H:00", date: "$cast_at" },
                  },
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        active: stats?.active[0]?.count || 0,
        refunded: stats?.refunded[0]?.count || 0,
        bulkVotes: {
          count: stats?.bulkVotes[0]?.count || 0,
          documents: stats?.bulkVotes[0]?.documents || 0,
        },
        individualVotes: {
          count: stats?.individualVotes[0]?.count || 0,
          documents: stats?.individualVotes[0]?.documents || 0,
        },
        byCandidate: stats?.byCandidate || [],
        byCategory: stats?.byCategory || [],
        byDate: stats?.byDate || [],
        byHour: stats?.byHour || [],
      };
    } catch (error) {
      throw new Error(`Get event statistics failed: ${error.message}`);
    }
  }

  /**
   * Get vote statistics for a candidate
   * NEW: Uses vote_count for accurate totals
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Candidate vote statistics
   */
  async getCandidateStatistics(candidateId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { candidate: candidateId } },
        {
          $facet: {
            total: [
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            active: [
              { $match: { status: STATUS.ACTIVE } },
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            refunded: [
              { $match: { status: STATUS.REFUNDED } },
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            byDate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$cast_at" },
                  },
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { _id: 1 } },
            ],
            recentVotes: [
              { $match: { status: STATUS.ACTIVE } },
              { $sort: { cast_at: -1 } },
              { $limit: 10 },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        active: stats?.active[0]?.count || 0,
        refunded: stats?.refunded[0]?.count || 0,
        byDate: stats?.byDate || [],
        recentVotes: stats?.recentVotes || [],
      };
    } catch (error) {
      throw new Error(`Get candidate statistics failed: ${error.message}`);
    }
  }

  /**
   * Get vote statistics for a category
   * NEW: Uses vote_count for accurate totals
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Category vote statistics
   */
  async getCategoryStatistics(categoryId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { category: categoryId } },
        {
          $facet: {
            total: [
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            active: [
              { $match: { status: STATUS.ACTIVE } },
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            refunded: [
              { $match: { status: STATUS.REFUNDED } },
              { $group: { _id: null, count: { $sum: "$vote_count" } } }
            ],
            byCandidate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: "$candidate",
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { count: -1 } },
            ],
            byDate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$cast_at" },
                  },
                  count: { $sum: "$vote_count" },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        active: stats?.active[0]?.count || 0,
        refunded: stats?.refunded[0]?.count || 0,
        byCandidate: stats?.byCandidate || [],
        byDate: stats?.byDate || [],
      };
    } catch (error) {
      throw new Error(`Get category statistics failed: ${error.message}`);
    }
  }

  /**
   * Refund a vote
   * @param {string|mongoose.Types.ObjectId} voteId - Vote ID
   * @param {string} reason - Refund reason
   * @returns {Promise<Object>} - Refunded vote
   */
  async refund(voteId, reason) {
    try {
      const vote = await this.model.findById(voteId);

      if (!vote) {
        throw new Error("Vote not found");
      }

      return await vote.refund(reason);
    } catch (error) {
      throw new Error(`Refund vote failed: ${error.message}`);
    }
  }

  /**
   * Bulk refund votes by payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {string} reason - Refund reason
   * @returns {Promise<Array>} - Refunded votes
   */
  async bulkRefundByPayment(paymentId, reason) {
    try {
      const votes = await this.model.find({ payment: paymentId, status: STATUS.ACTIVE });

      const refundedVotes = [];
      for (const vote of votes) {
        const refunded = await vote.refund(reason);
        refundedVotes.push(refunded);
      }

      return refundedVotes;
    } catch (error) {
      throw new Error(`Bulk refund by payment failed: ${error.message}`);
    }
  }

  /**
   * Get voting trends (votes per day/hour)
   * NEW: Uses vote_count for accurate trends
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string} [period='day'] - 'day' or 'hour'
   * @returns {Promise<Array>} - Voting trends
   */
  async getVotingTrends(eventId, period = "day") {
    try {
      const dateFormat = period === "hour" ? "%Y-%m-%d %H:00" : "%Y-%m-%d";

      const trends = await this.aggregate([
        { $match: { event: eventId, status: STATUS.ACTIVE } },
        {
          $group: {
            _id: {
              $dateToString: { format: dateFormat, date: "$cast_at" },
            },
            count: { $sum: "$vote_count" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      return trends;
    } catch (error) {
      throw new Error(`Get voting trends failed: ${error.message}`);
    }
  }

  /**
   * Get top candidates by votes in event
   * NEW: Uses vote_count for accurate rankings
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [limit=10] - Maximum number to return
   * @returns {Promise<Array>} - Top candidates
   */
  async getTopCandidates(eventId, limit = 10) {
    try {
      const topCandidates = await this.aggregate([
        { $match: { event: eventId, status: STATUS.ACTIVE } },
        {
          $group: {
            _id: "$candidate",
            voteCount: { $sum: "$vote_count" },
          },
        },
        { $sort: { voteCount: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "candidates",
            localField: "_id",
            foreignField: "_id",
            as: "candidate",
          },
        },
        { $unwind: "$candidate" },
      ]);

      return topCandidates;
    } catch (error) {
      throw new Error(`Get top candidates failed: ${error.message}`);
    }
  }

  /**
   * Get top categories by votes in event
   * NEW: Uses vote_count for accurate rankings
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [limit=10] - Maximum number to return
   * @returns {Promise<Array>} - Top categories
   */
  async getTopCategories(eventId, limit = 10) {
    try {
      const topCategories = await this.aggregate([
        { $match: { event: eventId, status: STATUS.ACTIVE } },
        {
          $group: {
            _id: "$category",
            voteCount: { $sum: "$vote_count" },
          },
        },
        { $sort: { voteCount: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
      ]);

      return topCategories;
    } catch (error) {
      throw new Error(`Get top categories failed: ${error.message}`);
    }
  }

  /**
   * Detect suspicious voting patterns (fraud detection)
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [threshold=10] - Votes threshold from same IP
   * @returns {Promise<Array>} - Suspicious IPs
   */
  async detectSuspiciousActivity(eventId, threshold = 10) {
    try {
      const suspicious = await this.aggregate([
        { $match: { event: eventId, status: STATUS.ACTIVE, ip_hash: { $exists: true } } },
        {
          $group: {
            _id: "$ip_hash",
            voteCount: { $sum: "$vote_count" },
            candidates: { $addToSet: "$candidate" },
            votes: { $push: "$$ROOT" },
          },
        },
        { $match: { voteCount: { $gte: threshold } } },
        { $sort: { voteCount: -1 } },
      ]);

      return suspicious;
    } catch (error) {
      throw new Error(`Detect suspicious activity failed: ${error.message}`);
    }
  }

  /**
   * Get vote velocity (votes per minute) for event
   * NEW: Uses vote_count for accurate velocity
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [minutes=60] - Time window in minutes
   * @returns {Promise<number>} - Votes per minute
   */
  async getVoteVelocity(eventId, minutes = 60) {
    try {
      const since = new Date(Date.now() - minutes * 60 * 1000);

      const result = await this.aggregate([
        {
          $match: {
            event: eventId,
            status: STATUS.ACTIVE,
            cast_at: { $gte: since },
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$vote_count" }
          }
        }
      ]);

      const count = result[0]?.total || 0;
      return Math.round((count / minutes) * 10) / 10;
    } catch (error) {
      throw new Error(`Get vote velocity failed: ${error.message}`);
    }
  }

  /**
   * Cast a single vote (for manual voting after payment)
   * @param {Object} voteData - Vote data
   * @returns {Promise<Object>} - Created vote
   */
  async castVote(voteData) {
    try {
      return await this.create({
        ...voteData,
        vote_count: 1,
        is_bulk: false,
      });
    } catch (error) {
      throw new Error(`Cast vote failed: ${error.message}`);
    }
  }

  /**
   * NEW: Create aggregated vote (for bulk auto-cast)
   * Creates a single vote document representing multiple votes
   * @param {Object} voteData - Vote data
   * @param {string|mongoose.Types.ObjectId} voteData.candidate - Candidate ID
   * @param {string|mongoose.Types.ObjectId} voteData.category - Category ID
   * @param {string|mongoose.Types.ObjectId} voteData.event - Event ID
   * @param {string|mongoose.Types.ObjectId} voteData.payment - Payment ID
   * @param {string} voteData.vote_code - Vote code
   * @param {number} voteData.vote_count - Number of votes this document represents
   * @param {string} [voteData.ip_hash] - IP hash
   * @param {string} [voteData.user_agent] - User agent
   * @param {Object} [voteData.metadata] - Additional metadata
   * @returns {Promise<Object>} - Created aggregated vote
   */
  async createAggregatedVote(voteData) {
    try {
      const {
        candidate,
        category,
        event,
        payment,
        vote_code,
        vote_count,
        ip_hash,
        user_agent,
        metadata = {}
      } = voteData;

      if (!vote_count || vote_count < 1) {
        throw new Error("vote_count must be at least 1");
      }

      // Create aggregated vote document
      const aggregatedVote = await this.create({
        candidate,
        category,
        event,
        payment,
        vote_code: vote_code.toUpperCase(),
        vote_count,
        is_bulk: true,
        status: STATUS.ACTIVE,
        ip_hash,
        user_agent,
        metadata: {
          ...metadata,
          aggregated: true,
          created_via: 'auto_cast'
        },
        cast_at: new Date(),
      });

      return aggregatedVote;
    } catch (error) {
      throw new Error(`Create aggregated vote failed: ${error.message}`);
    }
  }

  /**
   * NEW: Bulk create aggregated votes for multiple categories
   * @param {Array} votesData - Array of vote data objects
   * @returns {Promise<Array>} - Array of created aggregated votes
   */
  async bulkCreateAggregatedVotes(votesData) {
    try {
      if (!votesData || votesData.length === 0) {
        throw new Error("votesData array cannot be empty");
      }

      const createdVotes = [];
      
      for (const voteData of votesData) {
        const vote = await this.createAggregatedVote(voteData);
        createdVotes.push(vote);
      }

      return createdVotes;
    } catch (error) {
      throw new Error(`Bulk create aggregated votes failed: ${error.message}`);
    }
  }

  /**
   * Verify votes by vote code
   * NEW: Returns total vote count including aggregated votes
   * @param {string} voteCode - Vote code
   * @returns {Promise<Object>} - Verification details
   */
  async verifyVotes(voteCode) {
    try {
      const votes = await this.findByVoteCode(voteCode, {
        populate: "candidate category",
      });

      if (!votes || votes.length === 0) {
        return {
          verified: false,
          message: "No votes found with this code",
        };
      }

      // Calculate totals
      const activeVotes = votes.filter((v) => v.status === STATUS.ACTIVE);
      const refundedVotes = votes.filter((v) => v.status === STATUS.REFUNDED);
      
      const totalVoteCount = votes.reduce((sum, v) => sum + (v.vote_count || 1), 0);
      const activeVoteCount = activeVotes.reduce((sum, v) => sum + (v.vote_count || 1), 0);
      const refundedVoteCount = refundedVotes.reduce((sum, v) => sum + (v.vote_count || 1), 0);

      return {
        verified: true,
        total_vote_documents: votes.length,
        total_votes: totalVoteCount,
        active_vote_documents: activeVotes.length,
        active_votes: activeVoteCount,
        refunded_vote_documents: refundedVotes.length,
        refunded_votes: refundedVoteCount,
        votes: votes,
        cast_at: votes[0].cast_at,
      };
    } catch (error) {
      throw new Error(`Verify votes failed: ${error.message}`);
    }
  }
}

export default new VoteRepository();