/**
 * Vote Service
 * Handles business logic for vote casting and management
 */

import mongoose from "mongoose";
import BaseService from "../../shared/base.service.js";
import VoteRepository from "./vote.repository.js";
import PaymentService from "../../payment/payment.service.js";
import CandidateRepository from "../../candidate/candidate.repository.js";
import CategoryRepository from "../../category/category.repository.js";
import EventRepository from "../../event/event.repository.js";
import ActivityService from "../../activity/activity.service.js";
import NotificationService from "../../../services/notification.service.js";
import agendaManager from "../../../services/agenda.service.js";
import VoteValidation from "./vote.validation.js";
import { VOTE_STATUS as STATUS } from "../../../utils/constants/vote.constants.js";
import { STATUS as CATEGORY_STATUS } from "../../../utils/constants/category.constants.js";
import { STATUS as CANDIDATE_STATUS } from "../../../utils/constants/candidate.constants.js";
import { ENTITY_TYPE, ACTION_TYPE } from "../../../utils/constants/activity.constants.js";
import { IPHelper } from "../../../utils/helpers/ip.helper.js";

// Set validation schemas for BaseService.validate()
BaseService.setValidation(VoteValidation);

class VoteService extends BaseService {
  constructor(dependencies = {}) {
    super();
    this.repository = dependencies.repository || VoteRepository;
    this.candidateRepository = dependencies.candidateRepository || CandidateRepository;
    this.categoryRepository = dependencies.categoryRepository || CategoryRepository;
    this.eventRepository = dependencies.eventRepository || EventRepository;
    this.activityService = dependencies.activityService || ActivityService;
    this.paymentService = dependencies.paymentService || PaymentService;
  }

  /**
   * Cast a vote
   * @param {Object} voteData - Vote data
   * @returns {Promise<Object>} - Created vote
   */
  async castVote(voteData) {
    try {
      // Validate input data using BaseService.validate()
      const validatedData = this.validate(
        {
          vote_code: voteData.voteCode,
          candidate: voteData.candidateId,
          category: voteData.categoryId,
          event: voteData.eventId,
          payment: voteData.paymentId,
          ip_hash: voteData.ipAddress,
          user_agent: voteData.userAgent,
          metadata: voteData.metadata || {},
        },
        VoteValidation.createVoteSchema
      );

      const { voteCode, candidateId, categoryId, ipAddress, userAgent, metadata = {} } = voteData;

      // Validate vote code and payment
      const voteCodeValidation = await this.paymentService.validateVoteCode(voteCode);
      if (!voteCodeValidation.isValid) {
        throw new Error(voteCodeValidation.reason);
      }

      const payment = voteCodeValidation.payment;

      // Validate candidate
      const candidate = await this.candidateRepository.findById(candidateId);
      if (!candidate) {
        throw new Error("Candidate not found");
      }

      if (candidate.status !== CANDIDATE_STATUS.APPROVED) {
        throw new Error("Candidate is not available for voting");
      }

      // Validate category
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      if (category.status !== CATEGORY_STATUS.VOTING_OPEN) {
        throw new Error("Voting is not open for this category");
      }

      // Verify candidate belongs to category
      if (!candidate.categories.some(cat => cat.toString() === categoryId)) {
        throw new Error("Candidate does not belong to this category");
      }

      // Verify category belongs to event
      if (category.event.toString() !== payment.event.toString()) {
        throw new Error("Category does not belong to the event");
      }

      // Check for duplicate vote in this category
      const existingVote = await this.repository.findDuplicateVote(
        voteCode,
        categoryId,
        payment._id
      );

      if (existingVote) {
        throw new Error("You have already voted in this category");
      }

      // Hash IP address for privacy using standardized utility
      const ipHash = IPHelper.hash(ipAddress);

      // Create vote
      const vote = await this.repository.create({
        candidate: candidateId,
        category: categoryId,
        event: payment.event,
        payment: payment._id,
        vote_code: voteCode.toUpperCase(),
        status: STATUS.ACTIVE,
        ip_hash: ipHash,
        user_agent: userAgent,
        metadata,
        cast_at: new Date(),
      });

      // Decrement remaining votes in payment
      await this.paymentService.useVote(voteCode);

      // Increment candidate vote count
      await this.candidateRepository.incrementVoteCount(candidateId);

      // Get populated vote
      const populatedVote = await this.repository.findById(vote._id, {
        populate: ["candidate", "category", "event"],
      });

      // Queue vote confirmation email via Agenda (non-blocking)
      await agendaManager.now("send-vote-confirmation-email", {
        voteId: vote._id.toString(),
        voterEmail: payment.voter_email,
        voterName: payment.voter_name || payment.voter_email,
        eventName: populatedVote.event.name,
        categoryName: populatedVote.category.name,
        candidateName: populatedVote.candidate.name,
        voteCode,
        votesRemaining: payment.votes_remaining - 1,
        castedAt: vote.cast_at,
      });

      // Send notification
      await NotificationService.sendNotification({
        recipientEmail: payment.voter_email,
        type: "VOTE_CAST",
        title: "Vote Confirmed",
        message: `Your vote for ${populatedVote.candidate.name} in ${populatedVote.category.name} has been recorded`,
        metadata: {
          voteId: vote._id,
          candidateId,
          categoryId,
        },
      });

      // Log activity (fire-and-forget)
      this.activityService.logVote(
        null, // No userId for anonymous voting
        vote._id,
        payment.event,
        {
          candidateId,
          categoryId,
          voteCode,
          candidateName: populatedVote.candidate.name,
          categoryName: populatedVote.category.name,
        },
        ipAddress
      ).catch(err => console.error("Activity log error:", err));

      return populatedVote;
    } catch (error) {
      throw new Error(`Failed to cast vote: ${error.message}`);
    }
  }

  /**
   * Refund a vote (admin only)
   * @param {string} voteId - Vote ID
   * @param {string} reason - Refund reason
   * @param {string} adminId - Admin ID
   * @returns {Promise<Object>} - Refunded vote
   */
  async refundVote(voteId, reason, adminId) {
    try {
      const vote = await this.repository.findById(voteId, {
        populate: ["candidate", "category", "event", "payment"],
      });

      if (!vote) {
        throw new Error("Vote not found");
      }

      if (vote.status === STATUS.REFUNDED) {
        throw new Error("Vote already refunded");
      }

      // Update vote status
      const refundedVote = await this.repository.updateById(voteId, {
        status: STATUS.REFUNDED,
        refunded_at: new Date(),
        refund_reason: reason,
      });

      // Restore vote in payment
      await this.paymentService.restoreVote(vote.vote_code);

      // Decrement candidate vote count
      await this.candidateRepository.decrementVoteCount(vote.candidate._id);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.VOTE,
        entityId: voteId,
        eventId: vote.event._id,
        description: `Refunded vote for ${vote.candidate.name}`,
        metadata: {
          candidateId: vote.candidate._id,
          categoryId: vote.category._id,
          voteCode: vote.vote_code,
          reason,
        },
      }).catch(err => console.error("Activity log error:", err));

      return refundedVote;
    } catch (error) {
      throw new Error(`Failed to refund vote: ${error.message}`);
    }
  }

  /**
   * Get vote by ID
   * @param {string} voteId - Vote ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Vote
   */
  async getVoteById(voteId, options = {}) {
    try {
      const vote = await this.repository.findById(voteId, options);
      if (!vote) {
        throw new Error("Vote not found");
      }

      return vote;
    } catch (error) {
      throw new Error(`Failed to get vote: ${error.message}`);
    }
  }

  /**
   * Get votes by candidate
   * @param {string} candidateId - Candidate ID
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated votes
   */
  async getVotesByCandidate(candidateId, page = 1, limit = 10, options = {}) {
    try {
      const votes = await this.repository.findAll(
        { candidate: candidateId, status: STATUS.ACTIVE },
        page,
        limit,
        { ...options, sort: { cast_at: -1 } }
      );

      return votes;
    } catch (error) {
      throw new Error(`Failed to get votes: ${error.message}`);
    }
  }

  /**
   * Get votes by category
   * @param {string} categoryId - Category ID
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated votes
   */
  async getVotesByCategory(categoryId, page = 1, limit = 10, options = {}) {
    try {
      const votes = await this.repository.findAll(
        { category: categoryId, status: STATUS.ACTIVE },
        page,
        limit,
        { ...options, sort: { cast_at: -1 } }
      );

      return votes;
    } catch (error) {
      throw new Error(`Failed to get votes: ${error.message}`);
    }
  }

  /**
   * Get votes by event
   * @param {string} eventId - Event ID
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated votes
   */
  async getVotesByEvent(eventId, page = 1, limit = 10, options = {}) {
    try {
      const votes = await this.repository.findAll(
        { event: eventId, status: STATUS.ACTIVE },
        page,
        limit,
        { ...options, sort: { cast_at: -1 } }
      );

      return votes;
    } catch (error) {
      throw new Error(`Failed to get votes: ${error.message}`);
    }
  }

  /**
   * Get votes by vote code
   * @param {string} voteCode - Vote code
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Votes
   */
  async getVotesByVoteCode(voteCode, options = {}) {
    try {
      const votes = await this.repository.findByVoteCode(voteCode, options);
      return votes;
    } catch (error) {
      throw new Error(`Failed to get votes: ${error.message}`);
    }
  }

  /**
   * Get vote count by candidate
   * @param {string} candidateId - Candidate ID
   * @returns {Promise<number>} - Vote count
   */
  async getVoteCountByCandidate(candidateId) {
    try {
      const count = await this.repository.countByCandidate(candidateId);
      return count;
    } catch (error) {
      throw new Error(`Failed to get vote count: ${error.message}`);
    }
  }

  /**
   * Get vote count by category
   * @param {string} categoryId - Category ID
   * @returns {Promise<number>} - Vote count
   */
  async getVoteCountByCategory(categoryId) {
    try {
      const count = await this.repository.countByCategory(categoryId);
      return count;
    } catch (error) {
      throw new Error(`Failed to get vote count: ${error.message}`);
    }
  }

  /**
   * Get vote count by event
   * @param {string} eventId - Event ID
   * @returns {Promise<number>} - Vote count
   */
  async getVoteCountByEvent(eventId) {
    try {
      const count = await this.repository.countByEvent(eventId);
      return count;
    } catch (error) {
      throw new Error(`Failed to get vote count: ${error.message}`);
    }
  }

  /**
   * Get real-time results for a category
   * @param {string} categoryId - Category ID
   * @returns {Promise<Array>} - Candidate results
   */
  async getCategoryResults(categoryId) {
    try {
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      const results = await this.repository.getCategoryResults(categoryId);
      return results;
    } catch (error) {
      throw new Error(`Failed to get category results: ${error.message}`);
    }
  }

  /**
   * Get real-time results for an event
   * @param {string} eventId - Event ID
   * @returns {Promise<Object>} - Event results by category
   */
  async getEventResults(eventId) {
    try {
      const event = await this.eventRepository.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      const results = await this.repository.getEventResults(eventId);
      return results;
    } catch (error) {
      throw new Error(`Failed to get event results: ${error.message}`);
    }
  }

  /**
   * Get voting trends over time
   * @param {string} eventId - Event ID
   * @param {string} interval - Time interval (hour, day, week)
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Array>} - Voting trends
   */
  async getVotingTrends(eventId, interval = "day", startDate, endDate) {
    try {
      const trends = await this.repository.getVotingTrends(eventId, interval, startDate, endDate);
      return trends;
    } catch (error) {
      throw new Error(`Failed to get voting trends: ${error.message}`);
    }
  }

  /**
   * Get vote distribution by category
   * @param {string} eventId - Event ID
   * @returns {Promise<Array>} - Vote distribution
   */
  async getVoteDistribution(eventId) {
    try {
      const distribution = await this.repository.getVoteDistribution(eventId);
      return distribution;
    } catch (error) {
      throw new Error(`Failed to get vote distribution: ${error.message}`);
    }
  }

  /**
   * Get top candidates across all categories
   * @param {string} eventId - Event ID
   * @param {number} limit - Number of candidates to return
   * @returns {Promise<Array>} - Top candidates
   */
  async getTopCandidates(eventId, limit = 10) {
    try {
      const topCandidates = await this.repository.getTopCandidates(eventId, limit);
      return topCandidates;
    } catch (error) {
      throw new Error(`Failed to get top candidates: ${error.message}`);
    }
  }

  /**
   * Get voting statistics for an event
   * @param {string} eventId - Event ID
   * @returns {Promise<Object>} - Voting statistics
   */
  async getVotingStats(eventId) {
    try {
      const stats = await this.repository.getVotingStatsByEvent(eventId);
      return stats;
    } catch (error) {
      throw new Error(`Failed to get voting statistics: ${error.message}`);
    }
  }

  /**
   * Detect suspicious voting patterns
   * @param {string} eventId - Event ID
   * @param {number} threshold - Threshold for suspicious activity
   * @param {number} minutes - Time window in minutes
   * @returns {Promise<Array>} - Suspicious patterns
   */
  async detectSuspiciousPatterns(eventId, threshold = 10, minutes = 5) {
    try {
      const patterns = await this.repository.detectSuspiciousPatterns(
        eventId,
        threshold,
        minutes
      );

      // Log suspicious activity (fire-and-forget)
      if (patterns.length > 0) {
        this.activityService.log({
          action: ACTION_TYPE.WARNING,
          entityType: ENTITY_TYPE.VOTE,
          eventId,
          description: `Detected ${patterns.length} suspicious voting pattern(s)`,
          metadata: {
            threshold,
            minutes,
            patternsCount: patterns.length,
            patterns: patterns.slice(0, 5), // Log first 5 patterns
          },
        }).catch(err => console.error("Activity log error:", err));
      }

      return patterns;
    } catch (error) {
      throw new Error(`Failed to detect suspicious patterns: ${error.message}`);
    }
  }

  /**
   * Validate if user can vote in a category
   * @param {string} voteCode - Vote code
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} - Validation result
   */
  async validateVoteEligibility(voteCode, categoryId) {
    try {
      // Validate vote code
      const voteCodeValidation = await this.paymentService.validateVoteCode(voteCode);
      if (!voteCodeValidation.isValid) {
        return { isEligible: false, reason: voteCodeValidation.reason };
      }

      const payment = voteCodeValidation.payment;

      // Validate category
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        return { isEligible: false, reason: "Category not found" };
      }

      if (category.status !== CATEGORY_STATUS.VOTING_OPEN) {
        return { isEligible: false, reason: "Voting is not open for this category" };
      }

      // Check for duplicate vote
      const existingVote = await this.repository.findDuplicateVote(
        voteCode,
        categoryId,
        payment._id
      );

      if (existingVote) {
        return { isEligible: false, reason: "You have already voted in this category" };
      }

      return {
        isEligible: true,
        payment,
        category,
        votesRemaining: payment.votes_remaining,
      };
    } catch (error) {
      throw new Error(`Failed to validate vote eligibility: ${error.message}`);
    }
  }

  /**
   * Get voter history by vote code
   * @param {string} voteCode - Vote code
   * @returns {Promise<Object>} - Voter history
   */
  async getVoterHistory(voteCode) {
    try {
      const validation = await this.paymentService.validateVoteCode(voteCode);
      if (!validation.payment) {
        throw new Error("Invalid vote code");
      }

      const payment = validation.payment;
      const votes = await this.repository.findByVoteCode(voteCode, {
        populate: ["candidate", "category"],
      });

      return {
        voteCode,
        voterEmail: payment.voter_email,
        eventName: payment.event.name,
        bundleName: payment.bundle.name,
        votesPurchased: payment.votes_purchased,
        votesCast: payment.votes_cast,
        votesRemaining: payment.votes_remaining,
        votes: votes.map(vote => ({
          candidateName: vote.candidate.name,
          categoryName: vote.category.name,
          castAt: vote.cast_at,
          status: vote.status,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to get voter history: ${error.message}`);
    }
  }

  /**
   * Aggregate vote counts and update candidate/category totals
   * Used by scheduled job to keep vote counts in sync
   * @param {string} [eventId] - Event ID (optional, aggregates all if not provided)
   * @returns {Promise<Object>} - Aggregation results
   */
  async aggregateVoteCounts(eventId) {
    try {
      const matchStage = { status: STATUS.ACTIVE };
      if (eventId) {
        matchStage.event = new mongoose.Types.ObjectId(eventId);
      }

      // Aggregate vote counts per candidate
      const candidateCounts = await this.repository.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: "$candidate",
            vote_count: { $sum: 1 },
          },
        },
      ]);

      // Aggregate vote counts per category
      const categoryCounts = await this.repository.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: "$category",
            total_votes: { $sum: 1 },
          },
        },
      ]);

      // Update candidate vote counts
      const candidateUpdates = await Promise.all(
        candidateCounts.map(async ({ _id, vote_count }) => {
          return this.candidateRepository.updateById(_id, { vote_count });
        })
      );

      // Update category vote counts
      const categoryUpdates = await Promise.all(
        categoryCounts.map(async ({ _id, total_votes }) => {
          return this.categoryRepository.updateById(_id, { total_votes });
        })
      );

      const result = {
        candidatesUpdated: candidateUpdates.filter(Boolean).length,
        categoriesUpdated: categoryUpdates.filter(Boolean).length,
        aggregatedAt: new Date(),
      };

      console.log(`✅ Vote counts aggregated: ${result.candidatesUpdated} candidates, ${result.categoriesUpdated} categories`);

      return result;
    } catch (error) {
      throw new Error(`Failed to aggregate vote counts: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { VoteService };
export default new VoteService();
