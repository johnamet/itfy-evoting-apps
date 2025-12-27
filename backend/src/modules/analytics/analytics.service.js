/**
 * Analytics Service
 * Cross-module reporting, dashboards, and time-series analysis
 */

import EventRepository from "../event/event.repository.js";
import CandidateRepository from "../candidate/candidate.repository.js";
import CategoryRepository from "../category/category.repository.js";
import VoteRepository from "../vote/vote/vote.repository.js";
import BundleRepository from "../vote/bundle/bundle.repository.js";
import CouponRepository from "../vote/coupon/coupon.repository.js";
import FormRepository from "../form/form.repository.js";
import FormSubmissionRepository from "../form/submission.repository.js";
import ActivityRepository from "../activity/activity.repository.js";
import PaymentModel from "../payment/payment.model.js";
import UserModel from "../user/user.model.js";
import { healthService } from "../../services/health.service.js";

class AnalyticsService {
  /**
   * Get comprehensive event analytics dashboard
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Complete event analytics
   */
  async getEventDashboard(eventId) {
    try {
      const [
        candidates,
        categories,
        votes,
        bundles,
        coupons,
        forms,
        submissions,
        payments,
      ] = await Promise.all([
        CandidateRepository.getStatisticsByEvent(eventId),
        CategoryRepository.getStatisticsByEvent(eventId),
        VoteRepository.getStatisticsByEvent(eventId),
        BundleRepository.getStatisticsByEvent(eventId),
        CouponRepository.getStatisticsByEvent(eventId),
        FormRepository.getStatistics(eventId),
        FormSubmissionRepository.getEventStatistics(eventId),
        PaymentModel.getStatistics(eventId),
      ]);

      // Calculate derived metrics
      const conversionRate =
        submissions.total > 0 ? (votes.totalVotes / submissions.total) * 100 : 0;

      const averageRevenuePerVote =
        votes.totalVotes > 0 ? payments.totalRevenue / votes.totalVotes : 0;

      const roi = {
        revenue: payments.totalRevenue,
        votesCast: votes.totalVotes,
        bundlesSold: bundles.totalPurchases,
        averageRevenuePerVote: Math.round(averageRevenuePerVote * 100) / 100,
      };

      return {
        eventId,
        candidates,
        categories,
        votes,
        bundles,
        coupons,
        forms,
        submissions,
        payments,
        metrics: {
          conversionRate: Math.round(conversionRate * 100) / 100,
          roi,
        },
        generatedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`Get event dashboard failed: ${error.message}`);
    }
  }

  /**
   * Get comprehensive dashboard overview with system health
   * This is the main endpoint for admin dashboard statistics
   * @param {Object} params - Query parameters
   * @param {string} [params.period] - Time period for comparison (e.g., 'day', 'week', 'month')
   * @returns {Promise<Object>} - Dashboard overview data
   */
  async getDashboardOverview(params = {}) {
    try {
      // Fetch all required data in parallel
      const [
        eventStats,
        userCount,
        candidateCount,
        categoryCount,
        voteStats,
        paymentStats,
        systemHealth,
      ] = await Promise.all([
        EventRepository.getStatistics(),
        UserModel.countDocuments({ deleted_at: null }),
        CandidateRepository.model.countDocuments({ deleted_at: null }),
        CategoryRepository.model.countDocuments({ deleted_at: null }),
        this._getVoteStatistics(),
        this._getPaymentStatistics(),
        healthService.getSystemHealth(),
      ]);

      // Calculate growth rates (comparing to previous period)
      const growthRate = await this._calculateGrowthRates(params.period);

      // Calculate overall participation rate
      // (total votes / (total candidates * average voters per event))
      const overallParticipationRate = this._calculateParticipationRate(
        voteStats.totalVotes,
        eventStats.active,
        candidateCount
      );

      return {
        totalUsers: userCount,
        totalEvents: eventStats.total,
        totalVotes: voteStats.totalVotes,
        totalRevenue: paymentStats.totalRevenue,
        activeEvents: eventStats.active,
        completedEvents: eventStats.archived,
        upcomingEvents: eventStats.upcoming,
        totalCandidates: candidateCount,
        totalCategories: categoryCount,
        overallParticipationRate,
        systemHealthScore: systemHealth.score,
        systemHealth: {
          status: systemHealth.status,
          score: systemHealth.score,
          services: systemHealth.services,
          uptime: systemHealth.uptime,
        },
        growthRate,
        voteStats: {
          totalVotes: voteStats.totalVotes,
          totalAmount: voteStats.totalAmount,
          averagePerEvent: voteStats.averagePerEvent,
        },
        paymentStats: {
          totalRevenue: paymentStats.totalRevenue,
          totalTransactions: paymentStats.totalTransactions,
          averageTransaction: paymentStats.averageTransaction,
          successRate: paymentStats.successRate,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new Error(`Get dashboard overview failed: ${error.message}`);
    }
  }

  /**
   * Get vote statistics
   * @private
   */
  async _getVoteStatistics() {
    try {
      const stats = await VoteRepository.model.aggregate([
        { $match: { deleted_at: null } },
        {
          $group: {
            _id: null,
            totalVotes: { $sum: "$votes" },
            totalAmount: { $sum: "$amount" },
            count: { $sum: 1 },
          },
        },
      ]);

      const result = stats[0] || { totalVotes: 0, totalAmount: 0, count: 0 };
      
      // Get average per event
      const eventCount = await EventRepository.model.countDocuments({ deleted_at: null });
      
      return {
        totalVotes: result.totalVotes || 0,
        totalAmount: result.totalAmount || 0,
        transactionCount: result.count || 0,
        averagePerEvent: eventCount > 0 ? Math.round(result.totalVotes / eventCount) : 0,
      };
    } catch (error) {
      console.error("Failed to get vote statistics:", error);
      return { totalVotes: 0, totalAmount: 0, transactionCount: 0, averagePerEvent: 0 };
    }
  }

  /**
   * Get payment statistics
   * @private
   */
  async _getPaymentStatistics() {
    try {
      const stats = await PaymentModel.aggregate([
        { $match: { deleted_at: null } },
        {
          $group: {
            _id: "$status",
            total: { $sum: "$amount_paid" },
            count: { $sum: 1 },
          },
        },
      ]);

      const successfulPayments = stats.find(s => s._id === "completed") || { total: 0, count: 0 };
      const totalTransactions = stats.reduce((acc, s) => acc + s.count, 0);
      const totalSuccessful = successfulPayments.count;

      return {
        totalRevenue: successfulPayments.total || 0,
        totalTransactions,
        averageTransaction: totalSuccessful > 0 
          ? Math.round(successfulPayments.total / totalSuccessful) 
          : 0,
        successRate: totalTransactions > 0 
          ? Math.round((totalSuccessful / totalTransactions) * 100) 
          : 0,
      };
    } catch (error) {
      console.error("Failed to get payment statistics:", error);
      return { totalRevenue: 0, totalTransactions: 0, averageTransaction: 0, successRate: 0 };
    }
  }

  /**
   * Calculate growth rates compared to previous period
   * @private
   */
  async _calculateGrowthRates(period = "month") {
    try {
      const now = new Date();
      let currentStart, previousStart, previousEnd;

      switch (period) {
        case "day":
          currentStart = new Date(now.setHours(0, 0, 0, 0));
          previousEnd = new Date(currentStart);
          previousStart = new Date(previousEnd.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "week":
          currentStart = new Date(now.setDate(now.getDate() - now.getDay()));
          currentStart.setHours(0, 0, 0, 0);
          previousEnd = new Date(currentStart);
          previousStart = new Date(previousEnd.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
        default:
          currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
          previousEnd = new Date(currentStart);
          previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          break;
      }

      // Get current period counts
      const [currentUsers, currentEvents, currentVotes, currentRevenue] = await Promise.all([
        UserModel.countDocuments({ created_at: { $gte: currentStart }, deleted_at: null }),
        EventRepository.model.countDocuments({ created_at: { $gte: currentStart }, deleted_at: null }),
        VoteRepository.model.aggregate([
          { $match: { created_at: { $gte: currentStart }, deleted_at: null } },
          { $group: { _id: null, total: { $sum: "$votes" } } },
        ]),
        PaymentModel.aggregate([
          { $match: { created_at: { $gte: currentStart }, status: "completed", deleted_at: null } },
          { $group: { _id: null, total: { $sum: "$amount_paid" } } },
        ]),
      ]);

      // Get previous period counts
      const [previousUsers, previousEvents, previousVotes, previousRevenue] = await Promise.all([
        UserModel.countDocuments({ created_at: { $gte: previousStart, $lt: previousEnd }, deleted_at: null }),
        EventRepository.model.countDocuments({ created_at: { $gte: previousStart, $lt: previousEnd }, deleted_at: null }),
        VoteRepository.model.aggregate([
          { $match: { created_at: { $gte: previousStart, $lt: previousEnd }, deleted_at: null } },
          { $group: { _id: null, total: { $sum: "$votes" } } },
        ]),
        PaymentModel.aggregate([
          { $match: { created_at: { $gte: previousStart, $lt: previousEnd }, status: "completed", deleted_at: null } },
          { $group: { _id: null, total: { $sum: "$amount_paid" } } },
        ]),
      ]);

      const calculateGrowth = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100 * 10) / 10;
      };

      return {
        users: calculateGrowth(currentUsers, previousUsers),
        events: calculateGrowth(currentEvents, previousEvents),
        votes: calculateGrowth(
          currentVotes[0]?.total || 0, 
          previousVotes[0]?.total || 0
        ),
        revenue: calculateGrowth(
          currentRevenue[0]?.total || 0, 
          previousRevenue[0]?.total || 0
        ),
      };
    } catch (error) {
      console.error("Failed to calculate growth rates:", error);
      return { users: 0, events: 0, votes: 0, revenue: 0 };
    }
  }

  /**
   * Calculate overall participation rate
   * @private
   */
  _calculateParticipationRate(totalVotes, activeEvents, totalCandidates) {
    // Simple metric: votes per candidate (as percentage)
    // This represents how engaged voters are with the candidates
    if (totalCandidates === 0) return 0;
    
    // Normalize to percentage (assuming 100 votes per candidate is 100% participation)
    const votesPerCandidate = totalVotes / totalCandidates;
    const targetVotesPerCandidate = 100; // Baseline target
    
    const rate = Math.min((votesPerCandidate / targetVotesPerCandidate) * 100, 100);
    return Math.round(rate * 10) / 10;
  }

  /**
   * Get platform-wide analytics
   * @returns {Promise<Object>} - Platform analytics
   */
  async getPlatformDashboard() {
    try {
      const [events, forms, bundles, categories, coupons] = await Promise.all([
        EventRepository.getStatistics(),
        FormRepository.getStatistics(),
        BundleRepository.getOverallStatistics(),
        CategoryRepository.getOverallStatistics(),
        CouponRepository.getOverallStatistics(),
      ]);

      return {
        events,
        forms,
        bundles,
        categories,
        coupons,
        generatedAt: new Date(),
      };
    } catch (error) {
      throw new Error(`Get platform dashboard failed: ${error.message}`);
    }
  }

  /**
   * Get comprehensive voting analytics
   * @param {Object} params - Query parameters
   * @param {string} [params.period] - Time period
   * @param {Date} [params.startDate] - Start date
   * @param {Date} [params.endDate] - End date
   * @param {string} [params.eventId] - Optional event filter
   * @returns {Promise<Object>} - Voting analytics
   */
  async getVotingAnalytics(params = {}) {
    try {
      const { startDate, endDate, eventId } = params;
      
      // Default date range
      const end = endDate || new Date();
      const start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      const matchFilter = {
        created_at: { $gte: start, $lte: end },
      };
      if (eventId) matchFilter.event = eventId;

      // Get voting trends by day
      const votesByDay = await VoteRepository.model.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            count: { $sum: "$votes" },
            amount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            date: "$_id",
            count: 1,
            amount: 1,
            _id: 0,
          },
        },
      ]);

      // Get votes by category
      const votesByCategory = await VoteRepository.model.aggregate([
        { $match: matchFilter },
        {
          $lookup: {
            from: "candidates",
            localField: "candidate",
            foreignField: "_id",
            as: "candidateInfo",
          },
        },
        { $unwind: "$candidateInfo" },
        {
          $lookup: {
            from: "categories",
            localField: "candidateInfo.category",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        { $unwind: "$categoryInfo" },
        {
          $group: {
            _id: "$categoryInfo.name",
            count: { $sum: "$votes" },
          },
        },
        { $sort: { count: -1 } },
        {
          $project: {
            category: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ]);

      // Calculate percentages
      const totalVotes = votesByCategory.reduce((sum, cat) => sum + cat.count, 0);
      const votesByCategoryWithPercentage = votesByCategory.map(cat => ({
        ...cat,
        percentage: totalVotes > 0 ? Math.round((cat.count / totalVotes) * 100) : 0,
      }));

      // Get top candidates
      const topCandidates = await VoteRepository.model.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: "$candidate",
            votes: { $sum: "$votes" },
          },
        },
        { $sort: { votes: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: "candidates",
            localField: "_id",
            foreignField: "_id",
            as: "candidateInfo",
          },
        },
        { $unwind: "$candidateInfo" },
        {
          $lookup: {
            from: "events",
            localField: "candidateInfo.event",
            foreignField: "_id",
            as: "eventInfo",
          },
        },
        { $unwind: "$eventInfo" },
        {
          $project: {
            candidateId: "$_id",
            name: "$candidateInfo.name",
            code: "$candidateInfo.code",
            votes: 1,
            event: "$eventInfo.name",
            _id: 0,
          },
        },
      ]);

      // Calculate trends - compare with previous period
      const periodLength = end.getTime() - start.getTime();
      const previousStart = new Date(start.getTime() - periodLength);
      const previousEnd = start;

      const previousMatchFilter = {
        created_at: { $gte: previousStart, $lt: previousEnd },
      };
      if (eventId) previousMatchFilter.event = eventId;

      const previousVotes = await VoteRepository.model.aggregate([
        { $match: previousMatchFilter },
        {
          $group: {
            _id: "$candidate",
            votes: { $sum: "$votes" },
          },
        },
      ]);

      // Create a map of previous votes
      const previousVotesMap = new Map();
      previousVotes.forEach(pv => {
        previousVotesMap.set(pv._id.toString(), pv.votes);
      });

      // Add trend calculation to top candidates
      const topCandidatesWithTrend = topCandidates.map(candidate => {
        const previousVoteCount = previousVotesMap.get(candidate.candidateId.toString()) || 0;
        const currentVotes = candidate.votes;
        
        let trend = 0;
        if (previousVoteCount > 0) {
          trend = ((currentVotes - previousVoteCount) / previousVoteCount) * 100;
        } else if (currentVotes > 0) {
          trend = 100; // New candidate with votes
        }
        
        return {
          name: candidate.name,
          code: candidate.code,
          votes: currentVotes,
          event: candidate.event,
          trend: Math.round(trend * 10) / 10, // Round to 1 decimal place
        };
      });

      return {
        totalVotes,
        votesByDay,
        votesByCategory: votesByCategoryWithPercentage,
        topCandidates: topCandidatesWithTrend,
        period: { startDate: start, endDate: end },
      };
    } catch (error) {
      throw new Error(`Get voting analytics failed: ${error.message}`);
    }
  }

  /**
   * Get comprehensive payment analytics
   * @param {Object} params - Query parameters
   * @param {string} [params.period] - Time period
   * @param {Date} [params.startDate] - Start date
   * @param {Date} [params.endDate] - End date
   * @param {string} [params.eventId] - Optional event filter
   * @returns {Promise<Object>} - Payment analytics
   */
  async getPaymentAnalytics(params = {}) {
    try {
      const { startDate, endDate, eventId } = params;
      
      // Default date range
      const end = endDate || new Date();
      const start = startDate || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

      const matchFilter = {
        created_at: { $gte: start, $lte: end },
        status: "completed",
      };
      if (eventId) matchFilter.event = eventId;

      // Get revenue by day
      const revenueByDay = await PaymentModel.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            amount: { $sum: "$amount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            date: "$_id",
            amount: 1,
            count: 1,
            _id: 0,
          },
        },
      ]);

      // Get payment methods breakdown
      const paymentMethods = await PaymentModel.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: "$payment_method",
            count: { $sum: 1 },
            amount: { $sum: "$amount" },
          },
        },
        { $sort: { count: -1 } },
        {
          $project: {
            method: "$_id",
            count: 1,
            amount: 1,
            _id: 0,
          },
        },
      ]);

      // Get total statistics
      const totalStats = await PaymentModel.aggregate([
        { $match: matchFilter },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            totalTransactions: { $sum: 1 },
          },
        },
      ]);

      const stats = totalStats[0] || { totalRevenue: 0, totalTransactions: 0 };
      const averageTransactionValue = stats.totalTransactions > 0 
        ? stats.totalRevenue / stats.totalTransactions 
        : 0;

      return {
        totalRevenue: stats.totalRevenue,
        totalTransactions: stats.totalTransactions,
        averageTransactionValue: Math.round(averageTransactionValue * 100) / 100,
        revenueByDay,
        paymentMethods,
        period: { startDate: start, endDate: end },
      };
    } catch (error) {
      throw new Error(`Get payment analytics failed: ${error.message}`);
    }
  }

  /**
   * Get time-series voting trends for an event
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {string} [interval='day'] - Time interval (hour, day, week)
   * @param {Date} [startDate] - Start date (defaults to event start)
   * @param {Date} [endDate] - End date (defaults to now)
   * @returns {Promise<Array>} - Time-series vote data
   */
  async getVotingTrends(eventId, interval = "day", startDate = null, endDate = null) {
    try {
      if (!endDate) endDate = new Date();
      if (!startDate) {
        // Default to 30 days ago if no start date
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      return await VoteRepository.getVotingTrends(eventId, startDate, endDate, interval);
    } catch (error) {
      throw new Error(`Get voting trends failed: ${error.message}`);
    }
  }

  /**
   * Get revenue trends over time
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {string} [interval='day'] - Time interval
   * @returns {Promise<Array>} - Revenue time-series data
   */
  async getRevenueTrends(eventId, startDate, endDate, interval = "day") {
    try {
      let dateFormat;
      switch (interval) {
        case "hour":
          dateFormat = "%Y-%m-%d %H:00";
          break;
        case "week":
          dateFormat = "%Y-W%U";
          break;
        case "month":
          dateFormat = "%Y-%m";
          break;
        default:
          dateFormat = "%Y-%m-%d";
      }

      const pipeline = [
        {
          $match: {
            event: eventId,
            created_at: { $gte: startDate, $lte: endDate },
            status: "completed",
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: dateFormat, date: "$created_at" } },
            revenue: { $sum: "$amount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ];

      return await PaymentModel.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Get revenue trends failed: ${error.message}`);
    }
  }

  /**
   * Get user engagement metrics
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Object>} - Engagement metrics
   */
  async getUserEngagement(eventId, startDate, endDate) {
    try {
      const activities = await ActivityRepository.findByTimeRange(
        startDate,
        endDate,
        { event: eventId },
        1,
        10000
      );

      // Calculate unique users
      const uniqueUsers = new Set(activities.data.map((a) => a.user?.toString()));

      // Calculate actions per user
      const actionsPerUser = activities.data.length / uniqueUsers.size || 0;

      // Get action breakdown
      const actionBreakdown = activities.data.reduce((acc, activity) => {
        acc[activity.action] = (acc[activity.action] || 0) + 1;
        return acc;
      }, {});

      return {
        totalActions: activities.data.length,
        uniqueUsers: uniqueUsers.size,
        averageActionsPerUser: Math.round(actionsPerUser * 100) / 100,
        actionBreakdown,
        period: { startDate, endDate },
      };
    } catch (error) {
      throw new Error(`Get user engagement failed: ${error.message}`);
    }
  }

  /**
   * Compare event performance
   * @param {Array<mongoose.Types.ObjectId>} eventIds - Array of event IDs
   * @returns {Promise<Array>} - Comparative event data
   */
  async compareEvents(eventIds) {
    try {
      const comparisons = await Promise.all(
        eventIds.map(async (eventId) => {
          const [votes, payments, candidates, submissions] = await Promise.all([
            VoteRepository.getStatisticsByEvent(eventId),
            PaymentModel.getStatistics(eventId),
            CandidateRepository.getStatisticsByEvent(eventId),
            FormSubmissionRepository.getEventStatistics(eventId),
          ]);

          return {
            eventId,
            votes: votes.totalVotes,
            revenue: payments.totalRevenue,
            candidates: candidates.total,
            submissions: submissions.total,
            conversionRate:
              submissions.total > 0 ? (votes.totalVotes / submissions.total) * 100 : 0,
          };
        })
      );

      return comparisons;
    } catch (error) {
      throw new Error(`Compare events failed: ${error.message}`);
    }
  }

  /**
   * Get candidate performance ranking
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {mongoose.Types.ObjectId} [categoryId] - Optional category filter
   * @param {number} [limit=20] - Number of top candidates
   * @returns {Promise<Array>} - Ranked candidates with vote counts
   */
  async getCandidateRanking(eventId, categoryId = null, limit = 20) {
    try {
      return await VoteRepository.getCandidateLeaderboard(eventId, categoryId, limit);
    } catch (error) {
      throw new Error(`Get candidate ranking failed: ${error.message}`);
    }
  }

  /**
   * Get conversion funnel analysis
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Funnel metrics
   */
  async getConversionFunnel(eventId) {
    try {
      const [submissions, votes, payments] = await Promise.all([
        FormSubmissionRepository.getEventStatistics(eventId),
        VoteRepository.getStatisticsByEvent(eventId),
        PaymentModel.getStatistics(eventId),
      ]);

      const funnel = {
        submissions: submissions.total,
        conversions: submissions.converted,
        votes: votes.totalVotes,
        payments: payments.completed,
        dropoff: {
          submissionToConversion:
            submissions.total > 0
              ? ((submissions.total - submissions.converted) / submissions.total) * 100
              : 0,
          conversionToVote:
            submissions.converted > 0
              ? ((submissions.converted - votes.totalVotes) / submissions.converted) * 100
              : 0,
          voteToPayment:
            votes.totalVotes > 0
              ? ((votes.totalVotes - payments.completed) / votes.totalVotes) * 100
              : 0,
        },
      };

      return funnel;
    } catch (error) {
      throw new Error(`Get conversion funnel failed: ${error.message}`);
    }
  }

  /**
   * Get activity heatmap (hourly activity distribution)
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Object>} - Heatmap data
   */
  async getActivityHeatmap(eventId, startDate, endDate) {
    try {
      const timeline = await ActivityRepository.getTimeline(
        startDate,
        endDate,
        "hour",
        { event: eventId }
      );

      // Group by day of week and hour
      const heatmap = timeline.reduce((acc, item) => {
        const date = new Date(item._id.date);
        const dayOfWeek = date.getDay();
        const hour = date.getHours();

        if (!acc[dayOfWeek]) acc[dayOfWeek] = {};
        acc[dayOfWeek][hour] = (acc[dayOfWeek][hour] || 0) + item.count;

        return acc;
      }, {});

      return heatmap;
    } catch (error) {
      throw new Error(`Get activity heatmap failed: ${error.message}`);
    }
  }

  /**
   * Get real-time event metrics (last N minutes)
   * @param {mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [minutes=15] - Time window in minutes
   * @returns {Promise<Object>} - Real-time metrics
   */
  async getRealTimeMetrics(eventId, minutes = 15) {
    try {
      const timeWindow = new Date(Date.now() - minutes * 60 * 1000);

      const [voteVelocity, recentActivities] = await Promise.all([
        VoteRepository.getVoteVelocity(eventId, minutes),
        ActivityRepository.findByTimeRange(timeWindow, new Date(), { event: eventId }, 1, 100),
      ]);

      return {
        voteVelocity, // votes per minute
        recentActivities: recentActivities.data.length,
        timestamp: new Date(),
        timeWindow: minutes,
      };
    } catch (error) {
      throw new Error(`Get real-time metrics failed: ${error.message}`);
    }
  }

  /**
   * Get device analytics (device types, browsers, OS)
   * @param {Object} params - Query parameters
   * @param {string} [params.period] - Time period (7d, 30d, 90d, 1y)
   * @param {Date} [params.start_date] - Start date
   * @param {Date} [params.end_date] - End date
   * @param {mongoose.Types.ObjectId} [params.event_id] - Filter by event
   * @returns {Promise<Object>} - Device analytics
   */
  async getDeviceAnalytics(params = {}) {
    try {
      const ActivityModel = ActivityRepository.model;
      
      // Build date range query
      const dateQuery = {};
      if (params.start_date && params.end_date) {
        dateQuery.timestamp = {
          $gte: new Date(params.start_date),
          $lte: new Date(params.end_date),
        };
      }
      
      // Build event filter
      const eventQuery = params.event_id ? { event: params.event_id } : {};
      
      // Aggregate device types
      const deviceTypes = await ActivityModel.aggregate([
        {
          $match: {
            ...dateQuery,
            ...eventQuery,
            "device.device_type": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: "$device.device_type",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
      
      // Aggregate browsers
      const browsers = await ActivityModel.aggregate([
        {
          $match: {
            ...dateQuery,
            ...eventQuery,
            "device.browser.name": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: "$device.browser.name",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10, // Top 10 browsers
        },
      ]);
      
      // Aggregate operating systems
      const operatingSystems = await ActivityModel.aggregate([
        {
          $match: {
            ...dateQuery,
            ...eventQuery,
            "device.os.name": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: "$device.os.name",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10, // Top 10 operating systems
        },
      ]);
      
      // Calculate total and percentages
      const totalActivities = deviceTypes.reduce((sum, item) => sum + item.count, 0);
      
      const deviceTypesWithPercentage = deviceTypes.map(item => ({
        type: item._id,
        count: item.count,
        percentage: totalActivities > 0 ? ((item.count / totalActivities) * 100).toFixed(1) : 0,
      }));
      
      const browsersWithPercentage = browsers.map(item => ({
        name: item._id,
        count: item.count,
        percentage: totalActivities > 0 ? ((item.count / totalActivities) * 100).toFixed(1) : 0,
      }));
      
      const osWithPercentage = operatingSystems.map(item => ({
        name: item._id,
        count: item.count,
        percentage: totalActivities > 0 ? ((item.count / totalActivities) * 100).toFixed(1) : 0,
      }));
      
      return {
        totalActivities,
        deviceTypes: deviceTypesWithPercentage,
        browsers: browsersWithPercentage,
        operatingSystems: osWithPercentage,
        period: {
          startDate: params.start_date,
          endDate: params.end_date,
        },
      };
    } catch (error) {
      throw new Error(`Get device analytics failed: ${error.message}`);
    }
  }

  /**
   * Get region analytics (countries, cities)
   * @param {Object} params - Query parameters
   * @param {string} [params.period] - Time period (7d, 30d, 90d, 1y)
   * @param {Date} [params.start_date] - Start date
   * @param {Date} [params.end_date] - End date
   * @param {mongoose.Types.ObjectId} [params.event_id] - Filter by event
   * @returns {Promise<Object>} - Region analytics
   */
  async getRegionAnalytics(params = {}) {
    try {
      const ActivityModel = ActivityRepository.model;
      
      // Build date range query
      const dateQuery = {};
      if (params.start_date && params.end_date) {
        dateQuery.timestamp = {
          $gte: new Date(params.start_date),
          $lte: new Date(params.end_date),
        };
      }
      
      // Build event filter
      const eventQuery = params.event_id ? { event: params.event_id } : {};
      
      // Aggregate by country
      const countries = await ActivityModel.aggregate([
        {
          $match: {
            ...dateQuery,
            ...eventQuery,
            "location.country": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: "$location.country",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 20, // Top 20 countries
        },
      ]);
      
      // Aggregate by region/state
      const regions = await ActivityModel.aggregate([
        {
          $match: {
            ...dateQuery,
            ...eventQuery,
            "location.region": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: {
              country: "$location.country",
              region: "$location.region",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 15, // Top 15 regions
        },
      ]);
      
      // Aggregate by city
      const cities = await ActivityModel.aggregate([
        {
          $match: {
            ...dateQuery,
            ...eventQuery,
            "location.city": { $exists: true, $ne: null },
          },
        },
        {
          $group: {
            _id: {
              country: "$location.country",
              city: "$location.city",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 15, // Top 15 cities
        },
      ]);
      
      // Calculate total and percentages
      const totalActivities = countries.reduce((sum, item) => sum + item.count, 0);
      
      const countriesWithPercentage = countries.map(item => ({
        country: item._id,
        count: item.count,
        percentage: totalActivities > 0 ? ((item.count / totalActivities) * 100).toFixed(1) : 0,
      }));
      
      const regionsWithPercentage = regions.map(item => ({
        country: item._id.country,
        region: item._id.region,
        count: item.count,
        percentage: totalActivities > 0 ? ((item.count / totalActivities) * 100).toFixed(1) : 0,
      }));
      
      const citiesWithPercentage = cities.map(item => ({
        country: item._id.country,
        city: item._id.city,
        count: item.count,
        percentage: totalActivities > 0 ? ((item.count / totalActivities) * 100).toFixed(1) : 0,
      }));
      
      return {
        totalActivities,
        countries: countriesWithPercentage,
        regions: regionsWithPercentage,
        cities: citiesWithPercentage,
        period: {
          startDate: params.start_date,
          endDate: params.end_date,
        },
      };
    } catch (error) {
      throw new Error(`Get region analytics failed: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { AnalyticsService };
export default new AnalyticsService();
