import { Router } from "express";
import PaymentController from "./payment.controller.js";
import {
  authenticate,
  authorize,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC PAYMENT ROUTES ====================

/**
 * POST /api/payments/initialize
 * Initialize a new payment
 * Public access (voters don't need auth)
 */
router.post(
  "/initialize",
  PaymentController.initialize.bind(PaymentController)
);

/**
 * GET /api/payments/verify/:reference
 * Verify payment status
 * Public access
 */
router.get(
  "/verify/:reference",
  PaymentController.verify.bind(PaymentController)
);

/**
 * POST /api/payments/webhook
 * Handle Paystack webhook
 * Public access (from Paystack)
 */
router.post(
  "/webhook",
  PaymentController.webhook.bind(PaymentController)
);

/**
 * POST /api/payments/validate-vote-code
 * Validate a vote code
 * Public access
 */
router.post(
  "/validate-vote-code",
  PaymentController.validateVoteCode.bind(PaymentController)
);

/**
 * GET /api/payments/vote-code/:code/status
 * Get vote code status and remaining votes
 * Public access
 */
router.get(
  "/vote-code/:code/status",
  PaymentController.getVoteCodeStatus.bind(PaymentController)
);

/**
 * GET /api/payments/vote-code/:code
 * Get payment by vote code
 * Public access
 */
router.get(
  "/vote-code/:code",
  PaymentController.getByVoteCode.bind(PaymentController)
);

/**
 * GET /api/payments/reference/:reference
 * Get payment by transaction reference
 * Public access (for payment confirmation)
 */
router.get(
  "/reference/:reference",
  PaymentController.getByReference.bind(PaymentController)
);

// ==================== ADMIN STATISTICS ROUTES ====================

/**
 * GET /api/payments/stats/:eventId
 * Get payment statistics for an event
 * Requires: Admin
 */
router.get(
  "/stats/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  PaymentController.getStats.bind(PaymentController)
);

/**
 * GET /api/payments/revenue/:eventId
 * Get revenue by bundle for an event
 * Requires: Admin
 */
router.get(
  "/revenue/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  PaymentController.getRevenueByBundle.bind(PaymentController)
);

/**
 * GET /api/payments/daily-revenue/:eventId
 * Get daily revenue for an event
 * Requires: Admin
 */
router.get(
  "/daily-revenue/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  PaymentController.getDailyRevenue.bind(PaymentController)
);

// ==================== ADMIN QUERY ROUTES ====================

/**
 * GET /api/payments/event/:eventId
 * Get payments by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  PaymentController.getByEvent.bind(PaymentController)
);

/**
 * GET /api/payments/bundle/:bundleId
 * Get payments by bundle
 * Requires: Admin
 */
router.get(
  "/bundle/:bundleId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  PaymentController.getByBundle.bind(PaymentController)
);

/**
 * GET /api/payments/voter/:email
 * Get voter's payment history
 * Requires: Admin
 */
router.get(
  "/voter/:email",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  PaymentController.getVoterHistory.bind(PaymentController)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * GET /api/payments
 * List all payments with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  PaymentController.list.bind(PaymentController)
);

/**
 * GET /api/payments/:id
 * Get payment by ID
 * Requires: Admin
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  PaymentController.getById.bind(PaymentController)
);

// ==================== REFUND MANAGEMENT ====================

/**
 * POST /api/payments/:id/refund
 * Refund a payment
 * Requires: Admin
 */
router.post(
  "/:id/refund",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.PAYMENT_REFUNDED, ENTITY_TYPE.PAYMENT, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Refunded payment ${req.params.id}`,
    severity: "warning",
  }),
  PaymentController.refund.bind(PaymentController)
);

export default router;
