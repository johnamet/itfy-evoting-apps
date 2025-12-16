/**
 * Payment Controller
 * Handles HTTP requests for payment processing and management
 */

import BaseController from "../shared/base.controller.js";
import PaymentService from "./payment.service.js";
import PaymentValidation from "./payment.validation.js";

class PaymentController extends BaseController {
  constructor(dependencies = {}) {
    super({
      paymentService: dependencies.paymentService || PaymentService,
    });
  }

  // ==================== PAYMENT INITIALIZATION ====================

  /**
   * Initialize a new payment
   * POST /api/payments/initialize
   */
  async initialize(req, res) {
    const validated = this.validate(req.body, PaymentValidation.initializePaymentSchema);
    const ipAddress = this.getClientIP(req);
    const userAgent = req.headers["user-agent"];

    const result = await this.service("paymentService").initializePayment({
      ...validated,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    return this.success(res, {
      data: result,
      message: "Payment initialized successfully",
    });
  }

  /**
   * Verify payment status
   * GET /api/payments/verify/:reference
   */
  async verify(req, res) {
    const { reference } = req.params;
    const result = await this.service("paymentService").verifyPayment(reference);

    return this.success(res, {
      data: result,
      message: result.message,
    });
  }

  /**
   * Handle Paystack webhook
   * POST /api/payments/webhook
   */
  async webhook(req, res) {
    const signature = req.headers["x-paystack-signature"];
    const payload = req.body;

    try {
      const result = await this.service("paymentService").handleWebhook(payload, signature);
      return this.success(res, { data: result });
    } catch (error) {
      // Always return 200 to Paystack to acknowledge receipt
      console.error("Webhook error:", error.message);
      return this.success(res, { message: "Webhook received" });
    }
  }

  // ==================== PAYMENT QUERIES ====================

  /**
   * Get all payments with pagination and filters
   * GET /api/payments
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, [
      "event", "bundle", "payment_status", "payment_method",
      "voter_email", "vote_code", "transaction_reference", "webhook_received"
    ]);
    const sort = this.getSort(req, "-created_at");

    // Date range filters
    if (req.query.created_at_from) {
      filters.created_at = { ...filters.created_at, $gte: new Date(req.query.created_at_from) };
    }
    if (req.query.created_at_to) {
      filters.created_at = { ...filters.created_at, $lte: new Date(req.query.created_at_to) };
    }

    const result = await this.service("paymentService").repository.findAll(
      filters,
      page,
      limit,
      { sort, populate: ["bundle", "event", "coupon"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get payment by ID
   * GET /api/payments/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const payment = await this.service("paymentService").repository.findById(id, {
      populate: ["bundle", "event", "coupon"],
    });

    if (!payment) {
      return this.notFound(res, { resource: "Payment" });
    }

    return this.success(res, {
      data: payment,
    });
  }

  /**
   * Get payment by transaction reference
   * GET /api/payments/reference/:reference
   */
  async getByReference(req, res) {
    const { reference } = req.params;
    const payment = await this.service("paymentService").repository.findByTransactionReference(reference);

    if (!payment) {
      return this.notFound(res, { resource: "Payment" });
    }

    return this.success(res, {
      data: payment,
    });
  }

  /**
   * Get payment by vote code
   * GET /api/payments/vote-code/:code
   */
  async getByVoteCode(req, res) {
    const { code } = req.params;
    const payment = await this.service("paymentService").repository.findByVoteCode(code.toUpperCase());

    if (!payment) {
      return this.notFound(res, { resource: "Payment" });
    }

    return this.success(res, {
      data: payment,
    });
  }

  // ==================== EVENT-BASED QUERIES ====================

  /**
   * Get payments by event
   * GET /api/payments/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const filters = this.getFilters(req, ["payment_status", "payment_method"]);

    const result = await this.service("paymentService").repository.findAll(
      { event: eventId, ...filters },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["bundle", "coupon"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get payments by bundle
   * GET /api/payments/bundle/:bundleId
   */
  async getByBundle(req, res) {
    const { bundleId } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("paymentService").repository.findAll(
      { bundle: bundleId },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["event"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  // ==================== VOTE CODE MANAGEMENT ====================

  /**
   * Validate vote code
   * POST /api/payments/validate-vote-code
   */
  async validateVoteCode(req, res) {
    const { vote_code } = req.body;

    if (!vote_code) {
      return this.badRequest(res, { message: "vote_code is required" });
    }

    const result = await this.service("paymentService").validateVoteCode(vote_code.toUpperCase());

    return this.success(res, {
      data: result,
    });
  }

  /**
   * Get vote code status and remaining votes
   * GET /api/payments/vote-code/:code/status
   */
  async getVoteCodeStatus(req, res) {
    const { code } = req.params;
    const payment = await this.service("paymentService").repository.findByVoteCode(code.toUpperCase());

    if (!payment) {
      return this.notFound(res, { message: "Invalid vote code" });
    }

    return this.success(res, {
      data: {
        vote_code: payment.vote_code,
        votes_purchased: payment.votes_purchased,
        votes_cast: payment.votes_cast,
        votes_remaining: payment.votes_remaining,
        status: payment.status,
        event_id: payment.event,
      },
    });
  }

  // ==================== REFUND MANAGEMENT ====================

  /**
   * Refund payment
   * POST /api/payments/:id/refund
   */
  async refund(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, PaymentValidation.refundPaymentSchema);
    const adminId = this.getUserId(req);

    const payment = await this.service("paymentService").refundPayment(id, validated.refund_reason, adminId);

    return this.success(res, {
      data: payment,
      message: "Payment refunded successfully",
    });
  }

  // ==================== STATISTICS ====================

  /**
   * Get payment statistics for an event
   * GET /api/payments/stats/:eventId
   */
  async getStats(req, res) {
    const { eventId } = req.params;
    const stats = await this.service("paymentService").getPaymentStats(eventId);

    return this.success(res, {
      data: stats,
    });
  }

  /**
   * Get revenue by bundle for an event
   * GET /api/payments/revenue/:eventId
   */
  async getRevenueByBundle(req, res) {
    const { eventId } = req.params;
    const revenue = await this.service("paymentService").getRevenueByBundle(eventId);

    return this.success(res, {
      data: revenue,
    });
  }

  /**
   * Get daily revenue for an event
   * GET /api/payments/daily-revenue/:eventId
   */
  async getDailyRevenue(req, res) {
    const { eventId } = req.params;
    const { start_date, end_date } = req.query;

    const revenue = await this.service("paymentService").getDailyRevenue(
      eventId,
      start_date ? new Date(start_date) : undefined,
      end_date ? new Date(end_date) : undefined
    );

    return this.success(res, {
      data: revenue,
    });
  }

  // ==================== VOTER HISTORY ====================

  /**
   * Get voter's payment history
   * GET /api/payments/voter/:email
   */
  async getVoterHistory(req, res) {
    const { email } = req.params;
    const { page, limit } = this.getPagination(req);

    const result = await this.service("paymentService").repository.findAll(
      { voter_email: email.toLowerCase() },
      page,
      limit,
      { sort: { created_at: -1 }, populate: ["bundle", "event"] }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { PaymentController };
export default new PaymentController();
