/**
 * Vote Service
 * Handles business logic for vote casting and management
 * Updated to support aggregated vote records
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
import { STATUS as PAYMENT_STATUS } from "../../../utils/constants/payment.constants.js";

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
   * Cast a single vote (manual voting after payment)
   * This is for when users manually click to vote
   * @param {Object} voteData - Vote data
   * @returns {Promise<Object>} - Created vote
   */
  async castVote(voteData) {
    try {
      const { voteCode, candidateId, categoryId, ipAddress, userAgent, metadata = {} } = voteData;

      // Validate vote code and payment
      const payment = await this.paymentService.getPaymentByVoteCode(voteCode, {
        populate: ["bundles.bundle", "event", "votes_by_category.category"],
      });

      if (!payment) {
        throw new Error("Invalid vote code");
      }

      if (payment.payment_status !== PAYMENT_STATUS.COMPLETED) {
        throw new Error("Payment not completed");
      }

      // Check if there are votes available for this category
      const availableVotes = payment.getAvailableVotesForCategory(categoryId);
      if (availableVotes <= 0) {
        // Check if there are unrestricted votes that can be used
        const unrestrictedVotes = payment.votes_remaining - payment.votes_cast;
        if (unrestrictedVotes <= 0) {
          throw new Error("No votes remaining for this category");
        }
        // Check if any bundle allows voting in this category
        const canVoteInCategory = payment.bundles.some((b) => {
          if (!b.applicable_categories || b.applicable_categories.length === 0) {
            return true; // Unrestricted bundle
          }
          return b.applicable_categories.some(
            (cat) => cat.toString() === categoryId.toString()
          );
        });

        if (!canVoteInCategory) {
          throw new Error("Your vote bundles are not valid for this category");
        }
      }

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

      if (!category.is_voting_open) {
        throw new Error("Voting is not open for this category");
      }

      // Verify candidate belongs to category
      if (!candidate.categories.some(cat => cat.toString() === categoryId)) {
        throw new Error("Candidate does not belong to this category");
      }

      // Verify category belongs to event
      if (category.event.toString() !== payment.event._id.toString()) {
        throw new Error("Category does not belong to the event");
      }

      // Hash IP address for privacy
      const ipHash = IPHelper.hash(ipAddress);

      // Create individual vote (vote_count = 1, is_bulk = false)
      const vote = await this.repository.castVote({
        candidate: candidateId,
        category: categoryId,
        event: payment.event,
        payment: payment._id,
        vote_code: voteCode.toUpperCase(),
        status: STATUS.ACTIVE,
        ip_hash: ipHash,
        user_agent: userAgent,
        metadata: {
          ...metadata,
          manual_cast: true,
        },
        cast_at: new Date(),
      });

      // Use votes for this category in the payment
      await payment.useVotesForCategory(categoryId, 1);

      // Get populated vote
      const populatedVote = await this.repository.findById(vote._id, {
        populate: ["candidate", "category", "event"],
      });

      // Get updated voting summary
      const votingSummary = payment.getVotingSummary();

      // Queue vote confirmation email via Agenda (non-blocking)
      await agendaManager.now("send-vote-confirmation-email", {
        voteId: vote._id.toString(),
        voterEmail: payment.voter_email,
        voterName: payment.voter_name || payment.voter_email,
        eventName: populatedVote.event.name,
        categoryName: populatedVote.category.name,
        candidateName: populatedVote.candidate.name,
        voteCode,
        votesRemaining: votingSummary.votes_remaining,
        categoryVotesRemaining: votingSummary.categories.find(
          c => c.category_id.toString() === categoryId.toString()
        )?.votes_remaining || 0,
        castedAt: vote.cast_at,
      });

      // Log activity (fire-and-forget)
      this.activityService.logVote(
        null,
        vote._id,
        payment.event,
        {
          candidateId,
          categoryId,
          voteCode,
          candidateName: populatedVote.candidate.name,
          categoryName: populatedVote.category.name,
          votesRemaining: votingSummary.votes_remaining,
        },
        ipAddress
      ).catch(err => console.error("Activity log error:", err));

      return {
        ...populatedVote.toObject(),
        voting_summary: votingSummary,
      };
    } catch (error) {
      throw new Error(`Failed to cast vote: ${error.message}`);
    }
  }

  /**
   * NEW: Cast aggregated votes (for auto-cast after payment)
   * Creates aggregated vote documents (one per category)
   * @param {Object} params - Aggregated vote parameters
   * @param {string|mongoose.Types.ObjectId} params.paymentId - Payment ID
   * @param {string|mongoose.Types.ObjectId} params.candidateId - Candidate ID
   * @param {Array} params.bundleCategoryMap - Array of {bundle_id, category_id, quantity}
   * @param {string} [params.ipAddress] - IP address
   * @param {string} [params.userAgent] - User agent
   * @returns {Promise<Object>} - Result with created votes
   */
  async castAggregatedVotes(params) {
    try {
      const { paymentId, candidateId, bundleCategoryMap, ipAddress, userAgent } = params;

      // Get payment with populated bundles
      const payment = await this.paymentService.getPaymentById(paymentId, {
        populate: [
          {
            path: "bundles.bundle",
            select: "name vote_count"
          },
          {
            path: "event",
            select: "name"
          }
        ]
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      if (payment.payment_status !== PAYMENT_STATUS.COMPLETED) {
        throw new Error("Payment not completed");
      }

      // Validate candidate once
      const candidate = await this.candidateRepository.findById(candidateId);
      if (!candidate) {
        throw new Error("Candidate not found");
      }

      if (candidate.status !== CANDIDATE_STATUS.APPROVED) {
        throw new Error("Candidate is not available for voting");
      }

      // Group votes by category to create aggregated records
      const votesByCategory = new Map();
      const categoryValidation = new Map();

      for (const mapping of bundleCategoryMap) {
        const { bundle_id: bundleId, category_id: categoryId, quantity } = mapping;

        // Find bundle data
        const bundleData = payment.bundles.find(
          b => b.bundle._id.toString() === bundleId.toString()
        );

        if (!bundleData) {
          console.error(`Bundle ${bundleId} not found in payment bundles`);
          continue;
        }

        // Validate category (cache validation results)
        if (!categoryValidation.has(categoryId.toString())) {
          const category = await this.categoryRepository.findById(categoryId);

          if (!category || !category.is_voting_open) {
            console.error(`Category ${categoryId} not found or voting not open`);
            categoryValidation.set(categoryId.toString(), null);
            continue;
          }

          // Verify candidate belongs to category
          if (!candidate.categories.some(cat => cat.toString() === categoryId.toString())) {
            console.error(`Candidate does not belong to category ${categoryId}`);
            categoryValidation.set(categoryId.toString(), null);
            continue;
          }

          // Verify category belongs to event
          if (category.event.toString() !== payment.event._id.toString()) {
            console.error(`Category ${categoryId} does not belong to event`);
            categoryValidation.set(categoryId.toString(), null);
            continue;
          }

          categoryValidation.set(categoryId.toString(), category);
        }

        const category = categoryValidation.get(categoryId.toString());
        if (!category) continue;

        // Calculate votes for this bundle
        const voteCountPerBundle = bundleData.bundle.vote_count;
        const quantityPurchased = parseInt(quantity) || 1;
        const votesForThisBundle = voteCountPerBundle * quantityPurchased;

        // Aggregate votes by category
        const categoryKey = categoryId.toString();
        if (!votesByCategory.has(categoryKey)) {
          votesByCategory.set(categoryKey, {
            category: categoryId,
            candidate: candidateId,
            total_votes: 0,
            bundle_sources: []
          });
        }

        const categoryData = votesByCategory.get(categoryKey);
        categoryData.total_votes += votesForThisBundle;
        categoryData.bundle_sources.push({
          bundle_id: bundleId,
          bundle_name: bundleData.bundle.name,
          votes: votesForThisBundle,
          quantity: quantityPurchased
        });
      }

      if (votesByCategory.size === 0) {
        throw new Error("No valid categories found for voting");
      }

      // Hash IP address
      const ipHash = ipAddress ? IPHelper.hash(ipAddress) : null;

      // Create aggregated vote documents (one per category)
      const createdVotes = [];
      const categoryVoteCounts = [];

      for (const [categoryKey, voteData] of votesByCategory.entries()) {
        const aggregatedVote = await this.repository.createAggregatedVote({
          candidate: candidateId,
          category: voteData.category,
          event: payment.event._id,
          payment: payment._id,
          vote_code: payment.vote_code,
          vote_count: voteData.total_votes,
          ip_hash: ipHash,
          user_agent: userAgent || 'Paystack-Webhook',
          metadata: {
            auto_cast: true,
            bundle_sources: voteData.bundle_sources,
            aggregated: true
          }
        });

        createdVotes.push(aggregatedVote);
        categoryVoteCounts.push({
          category_id: voteData.category,
          votes_cast: voteData.total_votes
        });

        // Update payment vote tracking for this category
        await payment.useVotesForCategory(voteData.category, voteData.total_votes);
      }

      // Calculate totals
      const totalVotesCast = createdVotes.reduce((sum, v) => sum + v.vote_count, 0);

      console.log(`✅ Created ${createdVotes.length} aggregated vote document(s) representing ${totalVotesCast} total votes`);

      return {
        success: true,
        votes_created: createdVotes,
        total_vote_documents: createdVotes.length,
        total_votes_cast: totalVotesCast,
        categories_affected: categoryVoteCounts,
        candidate: `${candidate.first_name} ${candidate.last_name}`,
      };
    } catch (error) {
      throw new Error(`Failed to cast aggregated votes: ${error.message}`);
    }
  }

  /**
   * Validate vote eligibility - Updated for category-based voting
   * @param {string} voteCode - Vote code
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} - Validation result
   */
  async validateVoteEligibility(voteCode, categoryId) {
    try {
      // Validate vote code
      const payment = await this.paymentService.getPaymentByVoteCode(voteCode, {
        populate: ["bundles.bundle", "event", "votes_by_category.category"],
      });

      if (!payment) {
        return { isEligible: false, reason: "Invalid vote code" };
      }

      if (payment.payment_status !== PAYMENT_STATUS.COMPLETED) {
        return { isEligible: false, reason: "Payment not completed", payment };
      }

      // Validate category
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        return { isEligible: false, reason: "Category not found" };
      }

      if (!category.is_voting_open) {
        return { isEligible: false, reason: "Voting is not open for this category" };
      }

      // Check if there are votes available for this category
      const availableVotes = payment.getAvailableVotesForCategory(categoryId);

      // If no category-specific votes, check if unrestricted votes can be used
      if (availableVotes <= 0) {
        const hasUnrestrictedVotes = payment.bundles.some((b) => {
          return (!b.applicable_categories || b.applicable_categories.length === 0) &&
            (b.votes_allocated - b.votes_used) > 0;
        });

        if (!hasUnrestrictedVotes) {
          return {
            isEligible: false,
            reason: "No votes available for this category",
            payment,
          };
        }
      }

      const votingSummary = payment.getVotingSummary();

      return {
        isEligible: true,
        payment,
        category,
        votesRemaining: payment.votes_remaining,
        categoryVotesAvailable: availableVotes,
        votingSummary,
      };
    } catch (error) {
      throw new Error(`Failed to validate vote eligibility: ${error.message}`);
    }
  }

  /**
   * Refund a vote (admin only)
   * Works for both individual and aggregated votes
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

      const voteCount = vote.vote_count || 1;

      // Update vote status
      const refundedVote = await this.repository.updateById(voteId, {
        status: STATUS.REFUNDED,
        refunded_at: new Date(),
        refund_reason: reason,
      });

      // Restore votes in payment (based on vote_count)
      for (let i = 0; i < voteCount; i++) {
        await this.paymentService.restoreVote(vote.vote_code);
      }

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.VOTE,
        entityId: voteId,
        eventId: vote.event._id,
        description: `Refunded ${voteCount} vote(s) for ${vote.candidate.name}`,
        metadata: {
          candidateId: vote.candidate._id,
          categoryId: vote.category._id,
          voteCode: vote.vote_code,
          voteCount,
          isBulk: vote.is_bulk,
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
   * NEW: Returns sum of vote_count field
   * @param {string} candidateId - Candidate ID
   * @returns {Promise<number>} - Vote count
   */
  async getVoteCountByCandidate(candidateId) {
    try {
      const count = await this.repository.countForCandidate(candidateId);
      return count;
    } catch (error) {
      throw new Error(`Failed to get vote count: ${error.message}`);
    }
  }

  /**
   * Get vote count by category
   * NEW: Returns sum of vote_count field
   * @param {string} categoryId - Category ID
   * @returns {Promise<number>} - Vote count
   */
  async getVoteCountByCategory(categoryId) {
    try {
      const count = await this.repository.countForCategory(categoryId);
      return count;
    } catch (error) {
      throw new Error(`Failed to get vote count: ${error.message}`);
    }
  }

  /**
   * Get vote count by event
   * NEW: Returns sum of vote_count field
   * @param {string} eventId - Event ID
   * @returns {Promise<number>} - Vote count
   */
  async getVoteCountByEvent(eventId) {
    try {
      const count = await this.repository.countForEvent(eventId);
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

      const results = await this.repository.getCategoryStatistics(categoryId);
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

      const results = await this.repository.getEventStatistics(eventId);
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
      const stats = await this.repository.getEventStatistics(eventId);
      return stats.byCategory;
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
      const stats = await this.repository.getEventStatistics(eventId);
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
      const patterns = await this.repository.detectSuspiciousActivity(eventId, threshold);

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
   * Get voter history by vote code
   * NEW: Shows breakdown of individual vs bulk votes
   * @param {string} voteCode - Vote code
   * @returns {Promise<Object>} - Voter history
   */
  async getVoterHistory(voteCode) {
    try {
      const payment = await this.paymentService.getPaymentByVoteCode(voteCode, {
        populate: ["bundles.bundle", "event"]
      });

      if (!payment) {
        throw new Error("Invalid vote code");
      }

      const votes = await this.repository.findByVoteCode(voteCode, {
        populate: ["candidate", "category"],
      });

      // Separate bulk and individual votes
      const bulkVotes = votes.filter(v => v.is_bulk);
      const individualVotes = votes.filter(v => !v.is_bulk);

      const totalVoteCount = votes.reduce((sum, v) => sum + (v.vote_count || 1), 0);
      const bulkVoteCount = bulkVotes.reduce((sum, v) => sum + (v.vote_count || 1), 0);
      const individualVoteCount = individualVotes.reduce((sum, v) => sum + (v.vote_count || 1), 0);

      return {
        voteCode,
        voterEmail: payment.voter_email,
        eventName: payment.event.name,
        bundleCount: payment.bundles.length,
        votesPurchased: payment.votes_purchased,
        votesCast: payment.votes_cast,
        votesRemaining: payment.votes_remaining,
        voteSummary: {
          total_vote_documents: votes.length,
          total_votes_cast: totalVoteCount,
          bulk_vote_documents: bulkVotes.length,
          bulk_votes_cast: bulkVoteCount,
          individual_vote_documents: individualVotes.length,
          individual_votes_cast: individualVoteCount,
        },
        votes: votes.map(vote => ({
          candidateName: vote.candidate.name,
          categoryName: vote.category.name,
          voteCount: vote.vote_count || 1,
          isBulk: vote.is_bulk,
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
   * NEW: Uses SUM(vote_count) instead of COUNT(*)
   * @param {string} [eventId] - Event ID (optional, aggregates all if not provided)
   * @returns {Promise<Object>} - Aggregation results
   */
  async aggregateVoteCounts(eventId) {
    try {
      const matchStage = { status: STATUS.ACTIVE };
      if (eventId) {
        matchStage.event = new mongoose.Types.ObjectId(eventId);
      }

      // Aggregate vote counts per candidate (sum vote_count field)
      const candidateCounts = await this.repository.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: "$candidate",
            vote_count: { $sum: "$vote_count" },
          },
        },
      ]);

      // Aggregate vote counts per category (sum vote_count field)
      const categoryCounts = await this.repository.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: "$category",
            total_votes: { $sum: "$vote_count" },
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
        candidatesUpdate: candidateUpdates.filter(Boolean).length,
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
