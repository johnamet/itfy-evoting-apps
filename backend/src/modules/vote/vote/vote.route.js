import { Router } from "express";
import VoteController from "./vote.controller.js";
import {
  authenticate,
  authorize,
  optionalAuth,
} from "../../../middleware/auth.middleware.js";
import { logActivity } from "../../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC VOTING ROUTES ====================

/**
 * POST /api/votes
 * Cast a vote
 * Public access (vote code based)
 */
router.post(
  "/",
  optionalAuth,
  logActivity(ACTION_TYPE.VOTE_CAST, ENTITY_TYPE.VOTE),
  VoteController.cast.bind(VoteController)
);

/**
 * POST /api/votes/validate-eligibility
 * Validate vote eligibility before casting
 * Public access
 */
router.post(
  "/validate-eligibility",
  optionalAuth,
  VoteController.validateEligibility.bind(VoteController)
);

/**
 * GET /api/votes/code/:code
 * Get votes by vote code
 * Public access (voter can check their votes)
 */
router.get("/code/:code", optionalAuth, VoteController.getByVoteCode.bind(VoteController));

/**
 * GET /api/votes/history/:code
 * Get voter history by vote code
 * Public access (voter can check their history)
 */
router.get("/history/:code", optionalAuth, VoteController.getVoterHistory.bind(VoteController));

// ==================== PUBLIC RESULTS (Event-dependent visibility) ====================

/**
 * GET /api/votes/results/category/:categoryId
 * Get category results
 * Public access (visibility depends on event settings)
 */
router.get(
  "/results/category/:categoryId",
  optionalAuth,
  VoteController.getCategoryResults.bind(VoteController)
);

/**
 * GET /api/votes/results/event/:eventId
 * Get event results
 * Public access (visibility depends on event settings)
 */
router.get(
  "/results/event/:eventId",
  optionalAuth,
  VoteController.getEventResults.bind(VoteController)
);

// ==================== PUBLIC VOTE COUNTS ====================

/**
 * GET /api/votes/count/candidate/:candidateId
 * Get vote count by candidate
 * Public access (visibility depends on event settings)
 */
router.get(
  "/count/candidate/:candidateId",
  optionalAuth,
  VoteController.countByCandidate.bind(VoteController)
);

/**
 * GET /api/votes/count/category/:categoryId
 * Get vote count by category
 * Public access
 */
router.get(
  "/count/category/:categoryId",
  optionalAuth,
  VoteController.countByCategory.bind(VoteController)
);

/**
 * GET /api/votes/count/event/:eventId
 * Get vote count by event
 * Public access
 */
router.get(
  "/count/event/:eventId",
  optionalAuth,
  VoteController.countByEvent.bind(VoteController)
);

// ==================== ADMIN ANALYTICS ====================

/**
 * GET /api/votes/trends/:eventId
 * Get voting trends
 * Requires: Admin
 */
router.get(
  "/trends/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  VoteController.getVotingTrends.bind(VoteController)
);

/**
 * GET /api/votes/distribution/:eventId
 * Get vote distribution by category
 * Requires: Admin
 */
router.get(
  "/distribution/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  VoteController.getVoteDistribution.bind(VoteController)
);

/**
 * GET /api/votes/top-candidates/:eventId
 * Get top candidates
 * Requires: Admin
 */
router.get(
  "/top-candidates/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  VoteController.getTopCandidates.bind(VoteController)
);

/**
 * GET /api/votes/stats/:eventId
 * Get voting statistics
 * Requires: Admin
 */
router.get(
  "/stats/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  VoteController.getVotingStats.bind(VoteController)
);

// ==================== SECURITY & MONITORING ====================

/**
 * GET /api/votes/suspicious/:eventId
 * Detect suspicious voting patterns
 * Requires: Admin
 */
router.get(
  "/suspicious/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  VoteController.detectSuspicious.bind(VoteController)
);

// ==================== ADMIN VOTE QUERIES ====================

/**
 * GET /api/votes
 * List all votes with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  VoteController.list.bind(VoteController)
);

/**
 * GET /api/votes/candidate/:candidateId
 * Get votes by candidate
 * Requires: Admin
 */
router.get(
  "/candidate/:candidateId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  VoteController.getByCandidate.bind(VoteController)
);

/**
 * GET /api/votes/category/:categoryId
 * Get votes by category
 * Requires: Admin
 */
router.get(
  "/category/:categoryId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  VoteController.getByCategory.bind(VoteController)
);

/**
 * GET /api/votes/event/:eventId
 * Get votes by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  VoteController.getByEvent.bind(VoteController)
);

/**
 * GET /api/votes/:id
 * Get vote by ID
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  VoteController.getById.bind(VoteController)
);

// ==================== VOTE MANAGEMENT ====================

/**
 * POST /api/votes/:id/refund
 * Refund a vote
 * Requires: Admin
 */
router.post(
  "/:id/refund",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.VOTE_REFUNDED, ENTITY_TYPE.VOTE, {
    getEntityId: (req) => req.params.id,
    severity: "warning",
  }),
  VoteController.refund.bind(VoteController)
);

export default router;
