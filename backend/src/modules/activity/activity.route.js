/**
 * Activity Routes
 * Activity logging and audit trail endpoints
 */
import express from "express";
import activityController from "./activity.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";

const router = express.Router();

// ==================== PUBLIC/AUTHENTICATED ROUTES ====================

/**
 * Get recent activities
 * GET /api/activities/recent
 */
router.get(
  "/recent",
  authenticate,
  (req, res) => activityController.getRecent(req, res)
);

/**
 * Get my activity (current user)
 * GET /api/activities/me
 */
router.get(
  "/me",
  authenticate,
  (req, res) => activityController.getMyActivity(req, res)
);

// ==================== ADMIN/ORGANIZER ROUTES ====================

/**
 * Get all activities with filters
 * GET /api/activities
 */
router.get(
  "/",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.list(req, res)
);

/**
 * Get activity by ID
 * GET /api/activities/:id
 */
router.get(
  "/:id",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getById(req, res)
);

/**
 * Get user activity history
 * GET /api/activities/user/:userId
 */
router.get(
  "/user/:userId",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getUserHistory(req, res)
);

/**
 * Get event activity
 * GET /api/activities/event/:eventId
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getEventActivity(req, res)
);

/**
 * Get entity activity
 * GET /api/activities/entity/:entityType/:entityId
 */
router.get(
  "/entity/:entityType/:entityId",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getEntityActivity(req, res)
);

/**
 * Get security events
 * GET /api/activities/security
 */
router.get(
  "/security",
  authenticate,
  authorize([ROLES.ADMIN]),
  (req, res) => activityController.getSecurityEvents(req, res)
);

/**
 * Get failed login attempts
 * GET /api/activities/failed-logins
 */
router.get(
  "/failed-logins",
  authenticate,
  authorize([ROLES.ADMIN]),
  (req, res) => activityController.getFailedLogins(req, res)
);

/**
 * Get event summary
 * GET /api/activities/summary/:eventId
 */
router.get(
  "/summary/:eventId",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getEventSummary(req, res)
);

/**
 * Get activity timeline
 * GET /api/activities/timeline/:eventId
 */
router.get(
  "/timeline/:eventId",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getTimeline(req, res)
);

/**
 * Get activities by action type
 * GET /api/activities/action/:action
 */
router.get(
  "/action/:action",
  authenticate,
  authorize([ROLES.ADMIN, ROLES.ORGANISER]),
  (req, res) => activityController.getByAction(req, res)
);

export default router;
