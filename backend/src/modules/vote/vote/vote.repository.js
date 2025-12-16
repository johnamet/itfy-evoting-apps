/**
 * Vote Repository
 * This file defines the VoteRepository class which extends the BaseRepository
 * It contains vote-specific data access methods
 */

import { BaseRepository } from "../../shared/base.repository";
import VoteModel from "../models/vote.model";
import { STATUS } from "../../../utils/constants/vote.constants";

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
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<number>} - Vote count
   */
  async countForCandidate(candidateId) {
    try {
      return await this.model
        .countDocuments({ candidate: candidateId, status: STATUS.ACTIVE })
        .exec();
    } catch (error) {
      throw new Error(`Count votes for candidate failed: ${error.message}`);
    }
  }

  /**
   * Count votes for a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<number>} - Vote count
   */
  async countForCategory(categoryId) {
    try {
      return await this.model
        .countDocuments({ category: categoryId, status: STATUS.ACTIVE })
        .exec();
    } catch (error) {
      throw new Error(`Count votes for category failed: ${error.message}`);
    }
  }

  /**
   * Count votes for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<number>} - Vote count
   */
  async countForEvent(eventId) {
    try {
      return await this.model.countDocuments({ event: eventId, status: STATUS.ACTIVE }).exec();
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
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Vote statistics
   */
  async getEventStatistics(eventId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            refunded: [{ $match: { status: STATUS.REFUNDED } }, { $count: "count" }],
            byCandidate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: "$candidate",
                  count: { $sum: 1 },
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
                  count: { $sum: 1 },
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
                  count: { $sum: 1 },
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
                  count: { $sum: 1 },
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
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Candidate vote statistics
   */
  async getCandidateStatistics(candidateId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { candidate: candidateId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            refunded: [{ $match: { status: STATUS.REFUNDED } }, { $count: "count" }],
            byDate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$cast_at" },
                  },
                  count: { $sum: 1 },
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
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Category vote statistics
   */
  async getCategoryStatistics(categoryId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { category: categoryId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            refunded: [{ $match: { status: STATUS.REFUNDED } }, { $count: "count" }],
            byCandidate: [
              { $match: { status: STATUS.ACTIVE } },
              {
                $group: {
                  _id: "$candidate",
                  count: { $sum: 1 },
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
                  count: { $sum: 1 },
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
            count: { $sum: 1 },
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
            voteCount: { $sum: 1 },
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
            voteCount: { $sum: 1 },
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
            voteCount: { $sum: 1 },
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
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [minutes=60] - Time window in minutes
   * @returns {Promise<number>} - Votes per minute
   */
  async getVoteVelocity(eventId, minutes = 60) {
    try {
      const since = new Date(Date.now() - minutes * 60 * 1000);

      const count = await this.model
        .countDocuments({
          event: eventId,
          status: STATUS.ACTIVE,
          cast_at: { $gte: since },
        })
        .exec();

      return Math.round((count / minutes) * 10) / 10;
    } catch (error) {
      throw new Error(`Get vote velocity failed: ${error.message}`);
    }
  }

  /**
   * Cast a single vote
   * @param {Object} voteData - Vote data
   * @param {string|mongoose.Types.ObjectId} voteData.candidate - Candidate ID
   * @param {string|mongoose.Types.ObjectId} voteData.category - Category ID
   * @param {string|mongoose.Types.ObjectId} voteData.event - Event ID
   * @param {string|mongoose.Types.ObjectId} voteData.payment - Payment ID
   * @param {string} voteData.vote_code - Vote code
   * @param {string} [voteData.ip_address] - IP address
   * @param {string} [voteData.user_agent] - User agent
   * @returns {Promise<Object>} - Created vote
   */
  async castVote(voteData) {
    try {
      return await this.create(voteData);
    } catch (error) {
      throw new Error(`Cast vote failed: ${error.message}`);
    }
  }

  /**
   * Cast multiple votes in bulk (for bundle purchases)
   * @param {Object} params - Bulk vote parameters
   * @param {string|mongoose.Types.ObjectId} params.candidate - Candidate ID
   * @param {string|mongoose.Types.ObjectId} params.category - Category ID
   * @param {string|mongoose.Types.ObjectId} params.event - Event ID
   * @param {string|mongoose.Types.ObjectId} params.payment - Payment ID
   * @param {string} params.vote_code - Vote code
   * @param {number} params.count - Number of votes to cast
   * @param {string} [params.ip_address] - IP address
   * @param {string} [params.user_agent] - User agent
   * @param {Object} [params.metadata] - Additional metadata
   * @returns {Promise<Array>} - Array of created votes
   */
  async castVotes(params) {
    try {
      const { candidate, category, event, payment, vote_code, count, ip_address, user_agent, metadata } = params;

      if (!count || count < 1) {
        throw new Error("Vote count must be at least 1");
      }

      // Prepare bulk vote data
      const votesData = [];
      const now = new Date();
      
      // Hash IP address if provided
      let ip_hash = null;
      if (ip_address) {
        const crypto = require("crypto");
        ip_hash = crypto.createHash("sha256").update(ip_address).digest("hex");
      }

      for (let i = 0; i < count; i++) {
        votesData.push({
          candidate,
          category,
          event,
          payment,
          vote_code,
          status: STATUS.ACTIVE,
          ip_hash,
          user_agent,
          metadata: metadata || {},
          cast_at: now,
        });
      }

      // Bulk insert votes
      const createdVotes = await this.model.insertMany(votesData);

      // Update candidate vote count
      const Candidate = require("mongoose").model("Candidate");
      await Candidate.findByIdAndUpdate(candidate, {
        $inc: { vote_count: count },
      });

      // Update category vote count
      const Category = require("mongoose").model("Category");
      await Category.findByIdAndUpdate(category, {
        $inc: { total_votes: count },
      });

      return createdVotes;
    } catch (error) {
      throw new Error(`Cast votes in bulk failed: ${error.message}`);
    }
  }

  /**
   * Cast votes for multiple candidates (distributed voting)
   * @param {Object} params - Parameters
   * @param {string|mongoose.Types.ObjectId} params.event - Event ID
   * @param {string|mongoose.Types.ObjectId} params.payment - Payment ID
   * @param {string} params.vote_code - Vote code
   * @param {Array} params.votes - Array of vote distributions
   * @param {string|mongoose.Types.ObjectId} params.votes[].candidate - Candidate ID
   * @param {string|mongoose.Types.ObjectId} params.votes[].category - Category ID
   * @param {number} params.votes[].count - Number of votes for this candidate
   * @param {string} [params.ip_address] - IP address
   * @param {string} [params.user_agent] - User agent
   * @returns {Promise<Array>} - Array of all created votes
   */
  async castDistributedVotes(params) {
    try {
      const { event, payment, vote_code, votes, ip_address, user_agent } = params;

      const allCreatedVotes = [];

      for (const voteDistribution of votes) {
        const createdVotes = await this.castVotes({
          candidate: voteDistribution.candidate,
          category: voteDistribution.category,
          event,
          payment,
          vote_code,
          count: voteDistribution.count,
          ip_address,
          user_agent,
        });

        allCreatedVotes.push(...createdVotes);
      }

      return allCreatedVotes;
    } catch (error) {
      throw new Error(`Cast distributed votes failed: ${error.message}`);
    }
  }

  /**
   * Verify votes by vote code
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

      const activeVotes = votes.filter((v) => v.status === STATUS.ACTIVE);
      const refundedVotes = votes.filter((v) => v.status === STATUS.REFUNDED);

      return {
        verified: true,
        total_votes: votes.length,
        active_votes: activeVotes.length,
        refunded_votes: refundedVotes.length,
        votes: votes,
        cast_at: votes[0].cast_at,
      };
    } catch (error) {
      throw new Error(`Verify votes failed: ${error.message}`);
    }
  }
}

export default new VoteRepository();