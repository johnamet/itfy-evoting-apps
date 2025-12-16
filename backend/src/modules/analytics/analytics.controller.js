/**
 * Analytics Controller
 * Handles HTTP requests for cross-module reporting and dashboards
 */

import BaseController from "../shared/base.controller.js";
import AnalyticsService from "./analytics.service.js";

class AnalyticsController extends BaseController {
  constructor(dependencies = {}) {
    super({
      analyticsService: dependencies.analyticsService || AnalyticsService,
    });
  }

  // ==================== DASHBOARDS ====================

  /**
   * Get comprehensive event dashboard analytics
   * GET /api/analytics/event/:eventId/dashboard
   */
  async getEventDashboard(req, res) {
    const { eventId } = req.params;
    const dashboard = await this.service("analyticsService").getEventDashboard(eventId);

    return this.success(res, {
      data: dashboard,
    });
  }

  /**
   * Get platform-wide dashboard analytics
   * GET /api/analytics/platform/dashboard
   */
  async getPlatformDashboard(req, res) {
    const dashboard = await this.service("analyticsService").getPlatformDashboard();

    return this.success(res, {
      data: dashboard,
    });
  }

  // ==================== TRENDS ====================

  /**
   * Get voting trends for an event
   * GET /api/analytics/event/:eventId/voting-trends
   */
  async getVotingTrends(req, res) {
    const { eventId } = req.params;
    const { interval, start_date, end_date } = req.query;

    const trends = await this.service("analyticsService").getVotingTrends(
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
   * Get revenue trends for an event
   * GET /api/analytics/event/:eventId/revenue-trends
   */
  async getRevenueTrends(req, res) {
    const { eventId } = req.params;
    const { interval, start_date, end_date } = req.query;

    // Defaults for date range
    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date
      ? new Date(start_date)
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    const trends = await this.service("analyticsService").getRevenueTrends(
      eventId,
      startDate,
      endDate,
      interval || "day"
    );

    return this.success(res, {
      data: trends,
    });
  }

  // ==================== ENGAGEMENT ====================

  /**
   * Get user engagement metrics for an event
   * GET /api/analytics/event/:eventId/engagement
   */
  async getUserEngagement(req, res) {
    const { eventId } = req.params;
    const { start_date, end_date } = req.query;

    // Defaults for date range
    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date
      ? new Date(start_date)
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    const engagement = await this.service("analyticsService").getUserEngagement(
      eventId,
      startDate,
      endDate
    );

    return this.success(res, {
      data: engagement,
    });
  }

  // ==================== COMPARISONS ====================

  /**
   * Compare multiple events
   * POST /api/analytics/compare-events
   */
  async compareEvents(req, res) {
    const { event_ids } = req.body;

    if (!event_ids || !Array.isArray(event_ids) || event_ids.length === 0) {
      return this.badRequest(res, { message: "event_ids array is required" });
    }

    if (event_ids.length > 10) {
      return this.badRequest(res, { message: "Cannot compare more than 10 events at once" });
    }

    const comparison = await this.service("analyticsService").compareEvents(event_ids);

    return this.success(res, {
      data: comparison,
    });
  }

  // ==================== RANKINGS ====================

  /**
   * Get candidate performance ranking
   * GET /api/analytics/event/:eventId/candidate-ranking
   */
  async getCandidateRanking(req, res) {
    const { eventId } = req.params;
    const { category_id, limit } = req.query;

    const ranking = await this.service("analyticsService").getCandidateRanking(
      eventId,
      category_id || null,
      parseInt(limit, 10) || 20
    );

    return this.success(res, {
      data: ranking,
    });
  }

  // ==================== FUNNEL ANALYSIS ====================

  /**
   * Get conversion funnel analysis
   * GET /api/analytics/event/:eventId/funnel
   */
  async getConversionFunnel(req, res) {
    const { eventId } = req.params;
    const funnel = await this.service("analyticsService").getConversionFunnel(eventId);

    return this.success(res, {
      data: funnel,
    });
  }

  // ==================== ACTIVITY ANALYSIS ====================

  /**
   * Get activity heatmap (hourly distribution by day)
   * GET /api/analytics/event/:eventId/heatmap
   */
  async getActivityHeatmap(req, res) {
    const { eventId } = req.params;
    const { start_date, end_date } = req.query;

    // Defaults for date range
    const endDate = end_date ? new Date(end_date) : new Date();
    const startDate = start_date
      ? new Date(start_date)
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);

    const heatmap = await this.service("analyticsService").getActivityHeatmap(
      eventId,
      startDate,
      endDate
    );

    return this.success(res, {
      data: heatmap,
    });
  }

  // ==================== REAL-TIME METRICS ====================

  /**
   * Get real-time event metrics
   * GET /api/analytics/event/:eventId/realtime
   */
  async getRealTimeMetrics(req, res) {
    const { eventId } = req.params;
    const { minutes } = req.query;

    const metrics = await this.service("analyticsService").getRealTimeMetrics(
      eventId,
      parseInt(minutes, 10) || 15
    );

    return this.success(res, {
      data: metrics,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { AnalyticsController };
export default new AnalyticsController();
