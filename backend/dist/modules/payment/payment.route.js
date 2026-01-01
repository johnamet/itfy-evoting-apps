"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _paymentController = _interopRequireDefault(require("./payment.controller.js"));
var _authMiddleware = require("../../middleware/auth.middleware.js");
var _activityLoggerMiddleware = require("../../middleware/activity-logger.middleware.js");
var _userConstants = require("../../utils/constants/user.constants.js");
var _activityConstants = require("../../utils/constants/activity.constants.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = (0, _express.Router)();

// ==================== PUBLIC PAYMENT ROUTES ====================

/**
 * POST /api/payments/initialize
 * Initialize a new payment
 * Public access (voters don't need auth)
 */
router.post("/initialize", _paymentController["default"].initialize.bind(_paymentController["default"]));

/**
 * GET /api/payments/verify/:reference
 * Verify payment status
 * Public access
 */
router.get("/verify/:reference", _paymentController["default"].verify.bind(_paymentController["default"]));

/**
 * POST /api/payments/webhook
 * Handle Paystack webhook
 * Public access (from Paystack)
 */
router.post("/webhook", _paymentController["default"].webhook.bind(_paymentController["default"]));

/**
 * POST /api/payments/validate-vote-code
 * Validate a vote code
 * Public access
 */
router.post("/validate-vote-code", _paymentController["default"].validateVoteCode.bind(_paymentController["default"]));

/**
 * GET /api/payments/vote-code/:code/status
 * Get vote code status and remaining votes
 * Public access
 */
router.get("/vote-code/:code/status", _paymentController["default"].getVoteCodeStatus.bind(_paymentController["default"]));

/**
 * GET /api/payments/vote-code/:code
 * Get payment by vote code
 * Public access
 */
router.get("/vote-code/:code", _paymentController["default"].getByVoteCode.bind(_paymentController["default"]));

/**
 * GET /api/payments/reference/:reference
 * Get payment by transaction reference
 * Public access (for payment confirmation)
 */
router.get("/reference/:reference", _paymentController["default"].getByReference.bind(_paymentController["default"]));

// ==================== ADMIN STATISTICS ROUTES ====================

/**
 * GET /api/payments/stats/:eventId
 * Get payment statistics for an event
 * Requires: Admin
 */
router.get("/stats/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _paymentController["default"].getStats.bind(_paymentController["default"]));

/**
 * GET /api/payments/revenue/:eventId
 * Get revenue by bundle for an event
 * Requires: Admin
 */
router.get("/revenue/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _paymentController["default"].getRevenueByBundle.bind(_paymentController["default"]));

/**
 * GET /api/payments/daily-revenue/:eventId
 * Get daily revenue for an event
 * Requires: Admin
 */
router.get("/daily-revenue/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _paymentController["default"].getDailyRevenue.bind(_paymentController["default"]));

// ==================== ADMIN QUERY ROUTES ====================

/**
 * GET /api/payments/event/:eventId
 * Get payments by event
 * Requires: Admin
 */
router.get("/event/:eventId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _paymentController["default"].getByEvent.bind(_paymentController["default"]));

/**
 * GET /api/payments/bundle/:bundleId
 * Get payments by bundle
 * Requires: Admin
 */
router.get("/bundle/:bundleId", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _paymentController["default"].getByBundle.bind(_paymentController["default"]));

/**
 * GET /api/payments/voter/:email
 * Get voter's payment history
 * Requires: Admin
 */
router.get("/voter/:email", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER), _paymentController["default"].getVoterHistory.bind(_paymentController["default"]));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * GET /api/payments
 * List all payments with filters
 * Requires: Admin
 */
router.get("/", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _paymentController["default"].list.bind(_paymentController["default"]));

/**
 * GET /api/payments/:id
 * Get payment by ID
 * Requires: Admin
 */
router.get("/:id", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN, _userConstants.ROLES.ORGANISER, _userConstants.ROLES.MODERATOR), _paymentController["default"].getById.bind(_paymentController["default"]));

// ==================== REFUND MANAGEMENT ====================

/**
 * POST /api/payments/:id/refund
 * Refund a payment
 * Requires: Admin
 */
router.post("/:id/refund", _authMiddleware.authenticate, (0, _authMiddleware.authorize)(_userConstants.ROLES.SUPER_ADMIN, _userConstants.ROLES.ADMIN), (0, _activityLoggerMiddleware.logActivity)(_activityConstants.ACTION_TYPE.PAYMENT_REFUNDED, _activityConstants.ENTITY_TYPE.PAYMENT, {
  getEntityId: function getEntityId(req) {
    return req.params.id;
  },
  getDescription: function getDescription(req) {
    return "Refunded payment ".concat(req.params.id);
  },
  severity: "warning"
}), _paymentController["default"].refund.bind(_paymentController["default"]));
var _default = exports["default"] = router;