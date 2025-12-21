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
}

// Export both for testability (class) and convenience (singleton instance)
export { AnalyticsService };
export default new AnalyticsService();
