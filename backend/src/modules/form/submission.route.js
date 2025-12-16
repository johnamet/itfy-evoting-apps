import { Router } from "express";
import SubmissionController from "./submission.controller.js";
import {
  authenticate,
  authorize,
  optionalAuth,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC SUBMISSION ====================

/**
 * POST /api/submissions
 * Submit a form (public or authenticated)
 * Optional auth - allows anonymous submissions if form settings allow
 */
router.post(
  "/",
  optionalAuth,
  SubmissionController.submit.bind(SubmissionController)
);

// ==================== USER SUBMISSIONS ====================

/**
 * GET /api/submissions/me
 * Get current user's submissions
 * Requires: Authentication
 */
router.get(
  "/me",
  authenticate,
  SubmissionController.getMySubmissions.bind(SubmissionController)
);

// ==================== ADMIN LIST & QUERY ROUTES ====================

/**
 * GET /api/submissions
 * List all submissions with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SubmissionController.list.bind(SubmissionController)
);

/**
 * GET /api/submissions/form/:formId
 * Get submissions by form
 * Requires: Admin
 */
router.get(
  "/form/:formId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SubmissionController.getByForm.bind(SubmissionController)
);

/**
 * GET /api/submissions/form/:formId/duplicates
 * Get suspected duplicates for a form
 * Requires: Admin
 */
router.get(
  "/form/:formId/duplicates",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  SubmissionController.getSuspectedDuplicates.bind(SubmissionController)
);

/**
 * GET /api/submissions/event/:eventId
 * Get submissions by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SubmissionController.getByEvent.bind(SubmissionController)
);

/**
 * GET /api/submissions/nominee/:identifier
 * Get submissions by nominee identifier (multi-category nominations)
 * Requires: Admin
 */
router.get(
  "/nominee/:identifier",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SubmissionController.getByNominee.bind(SubmissionController)
);

/**
 * GET /api/submissions/user/:userId
 * Get submissions by user
 * Requires: Admin
 */
router.get(
  "/user/:userId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SubmissionController.getByUser.bind(SubmissionController)
);

// ==================== SINGLE SUBMISSION ROUTES ====================

/**
 * GET /api/submissions/:id
 * Get submission by ID
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  SubmissionController.getById.bind(SubmissionController)
);

/**
 * PUT /api/submissions/:id
 * Update submission
 * Requires: Admin
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SUBMISSION_UPDATED, ENTITY_TYPE.FORM_SUBMISSION, {
    getEntityId: (req) => req.params.id,
  }),
  SubmissionController.update.bind(SubmissionController)
);

// ==================== APPROVAL WORKFLOW ====================

/**
 * POST /api/submissions/:id/approve
 * Approve submission (and optionally create candidate)
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/approve",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SUBMISSION_APPROVED, ENTITY_TYPE.FORM_SUBMISSION, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Approved submission ${req.params.id}`,
  }),
  SubmissionController.approve.bind(SubmissionController)
);

/**
 * POST /api/submissions/:id/reject
 * Reject submission
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/reject",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.SUBMISSION_REJECTED, ENTITY_TYPE.FORM_SUBMISSION, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Rejected submission ${req.params.id}`,
  }),
  SubmissionController.reject.bind(SubmissionController)
);

/**
 * POST /api/submissions/:id/resolve-duplicate
 * Resolve duplicate submission
 * Requires: Admin, Organiser
 */
router.post(
  "/:id/resolve-duplicate",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.DUPLICATE_RESOLVED, ENTITY_TYPE.FORM_SUBMISSION, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Resolved duplicate for submission ${req.params.id}`,
  }),
  SubmissionController.resolveDuplicate.bind(SubmissionController)
);

// ==================== DUPLICATE DETECTION ====================

/**
 * POST /api/submissions/:id/check-duplicates
 * Manually trigger duplicate check for a submission
 * Requires: Admin
 */
router.post(
  "/:id/check-duplicates",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  SubmissionController.checkDuplicates.bind(SubmissionController)
);

export default router;
