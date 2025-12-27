/**
 * Analytics Routes
 * Cross-module reporting and dashboard endpoints
 */
import express from "express";
import analyticsController from "./analytics.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";

const router = express.Router();

router.use(authenticate);

// ==================== PROTECTED ROUTES (Admin/Organizer) ====================

// Dashboard overview with system health
router.get(
  "/platform/overview",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getDashboardOverview(req, res)
);

// Platform-wide dashboard
router.get(
  "/platform/dashboard",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getPlatformDashboard(req, res)
);

// Comprehensive voting analytics
router.get(
  "/voting",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getVotingAnalytics(req, res)
);

// Comprehensive payment analytics
router.get(
  "/payments",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getPaymentAnalytics(req, res)
);

// Device analytics
router.get(
  "/devices",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getDeviceAnalytics(req, res)
);

// Region analytics
router.get(
  "/regions",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getRegionAnalytics(req, res)
);

// Event-specific dashboard
router.get(
  "/event/:eventId/dashboard",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getEventDashboard(req, res)
);

// Voting trends
router.get(
  "/event/:eventId/voting-trends",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getVotingTrends(req, res)
);

// Revenue trends
router.get(
  "/event/:eventId/revenue-trends",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getRevenueTrends(req, res)
);

// User engagement
router.get(
  "/event/:eventId/engagement",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getUserEngagement(req, res)
);

// Candidate ranking
router.get(
  "/event/:eventId/candidate-ranking",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getCandidateRanking(req, res)
);

// Conversion funnel
router.get(
  "/event/:eventId/funnel",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getConversionFunnel(req, res)
);

// Activity heatmap
router.get(
  "/event/:eventId/heatmap",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getActivityHeatmap(req, res)
);

// Real-time metrics
router.get(
  "/event/:eventId/realtime",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.getRealTimeMetrics(req, res)
);

// Compare events
router.post(
  "/compare-events",
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => analyticsController.compareEvents(req, res)
);

export default router;
