/**
 * Payment Service
 * Handles business logic for payment processing with Paystack
 */

import BaseService from "../shared/base.service.js";
import PaymentRepository from "./payment.repository.js";
import BundleRepository from "../vote/bundle/bundle.repository.js";
import EventRepository from "../event/event.repository.js";
import CouponRepository from "../vote/coupon/coupon.repository.js";
import BundleService from "../vote/bundle/bundle.service.js";
import CouponService from "../vote/coupon/coupon.service.js";
import ActivityService from "../activity/activity.service.js";
import NotificationService from "../../services/notification.service.js";
import EmailService from "../../services/email.service.js";
import agendaManager from "../../services/agenda.service.js";
import * as PaymentValidation from "./payment.validation.js";
import { STATUS as PAYMENT_STATUS } from "../../utils/constants/payment.constants.js";
import { ENTITY_TYPE, ACTION_TYPE } from "../../utils/constants/activity.constants.js";
import crypto from "crypto";
import axios from "axios";

// Set up validation module for this service
BaseService.setValidation(PaymentValidation);

class PaymentService extends BaseService {
  constructor(dependencies = {}) {
    super();
    this.repository = dependencies.repository || PaymentRepository;
    this.bundleRepository = dependencies.bundleRepository || BundleRepository;
    this.eventRepository = dependencies.eventRepository || EventRepository;
    this.couponRepository = dependencies.couponRepository || CouponRepository;
    this.bundleService = dependencies.bundleService || BundleService;
    this.couponService = dependencies.couponService || CouponService;
    this.activityService = dependencies.activityService || ActivityService;
    this.notificationService = dependencies.notificationService || NotificationService;
    this.emailService = dependencies.emailService || EmailService;
    this.paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    this.paystackBaseUrl = "https://api.paystack.co";
  }

  /**
   * Generate unique vote code
   * @returns {Promise<string>} - Unique vote code
   */
  async generateVoteCode() {
    try {
      let voteCode;
      let exists = true;

      while (exists) {
        // Generate random 8-character code: VOTE-XXXXXXXX
        const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
        voteCode = `VOTE-${randomPart}`;

        // Check if code already exists
        const existing = await this.repository.findByVoteCode(voteCode);
        exists = !!existing;
      }

      return voteCode;
    } catch (error) {
      throw new Error(`Failed to generate vote code: ${error.message}`);
    }
  }

  /**
   * Generate unique transaction reference
   * @returns {string} - Unique transaction reference
   */
  generateTransactionReference() {
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString("hex").toUpperCase();
    return `TXN-${timestamp}-${random}`;
  }

  /**
   * Initialize payment with Paystack
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} - Payment initialization response
   */
  async initializePayment(paymentData) {
    try {
      // Validate input data using BaseService validation
      const validatedData = this.validate(paymentData, PaymentValidation.initializePaymentSchema);

      const {
        bundle_id: bundleId,
        event_id: eventId,
        voter_email: voterEmail,
        voter_phone: voterPhone,
        voter_name: voterName,
        coupon_code: couponCode = null,
        callback_url: callbackUrl,
        metadata = {},
      } = validatedData;

      // Validate bundle availability
      const bundleValidation = await this.bundleService.validateBundleAvailability(bundleId);
      if (!bundleValidation.isAvailable) {
        throw new Error(bundleValidation.reason);
      }

      const bundle = bundleValidation.bundle;

      // Validate event
      const event = await this.eventRepository.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      // Validate and apply coupon if provided
      let coupon = null;
      if (couponCode) {
        coupon = await this.couponService.validateCouponForBundle(couponCode, bundleId, voterEmail);
        if (!coupon.isValid) {
          throw new Error(coupon.reason);
        }
        coupon = coupon.coupon;
      }

      // Calculate final price
      const priceBreakdown = await this.bundleService.calculatePrice(bundleId, coupon);

      // Generate transaction reference and vote code
      const transactionReference = this.generateTransactionReference();
      const voteCode = await this.generateVoteCode();

      // Create payment record with PENDING status
      const payment = await this.repository.create({
        transaction_reference: transactionReference,
        bundle: bundleId,
        event: eventId,
        coupon: coupon ? coupon._id : null,
        vote_code: voteCode,
        votes_purchased: priceBreakdown.totalVotes,
        votes_cast: 0,
        votes_remaining: priceBreakdown.totalVotes,
        amount_paid: priceBreakdown.finalPrice,
        original_amount: priceBreakdown.basePrice,
        discount_amount: priceBreakdown.totalDiscount || 0,
        currency: bundle.currency,
        voter_email: voterEmail,
        voter_phone: voterPhone,
        voter_name: voterName,
        status: PAYMENT_STATUS.PENDING,
        payment_method: "PAYSTACK",
        metadata: {
          ...metadata,
          bundleName: bundle.name,
          eventName: event.name,
          priceBreakdown,
        },
      });

      // Initialize Paystack transaction
      const paystackPayload = {
        email: voterEmail,
        amount: Math.round(priceBreakdown.finalPrice * 100), // Convert to kobo/pesewas
        reference: transactionReference,
        currency: bundle.currency,
        callback_url: callbackUrl,
        metadata: {
          payment_id: payment._id.toString(),
          event_id: eventId,
          bundle_id: bundleId,
          vote_code: voteCode,
          voter_name: voterName,
          voter_phone: voterPhone,
          custom_fields: [
            {
              display_name: "Event",
              variable_name: "event_name",
              value: event.name,
            },
            {
              display_name: "Bundle",
              variable_name: "bundle_name",
              value: bundle.name,
            },
            {
              display_name: "Vote Code",
              variable_name: "vote_code",
              value: voteCode,
            },
          ],
        },
      };

      const paystackResponse = await axios.post(
        `${this.paystackBaseUrl}/transaction/initialize`,
        paystackPayload,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!paystackResponse.data.status) {
        throw new Error(paystackResponse.data.message || "Paystack initialization failed");
      }

      // Update payment with Paystack details
      await this.repository.updateById(payment._id, {
        paystack_reference: paystackResponse.data.data.reference,
        paystack_access_code: paystackResponse.data.data.access_code,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: payment._id,
        eventId,
        description: `Initialized payment for ${bundle.name}`,
        metadata: {
          voterEmail,
          amount: priceBreakdown.finalPrice,
          currency: bundle.currency,
          voteCode,
          bundleName: bundle.name,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return {
        paymentId: payment._id,
        transactionReference,
        voteCode,
        authorizationUrl: paystackResponse.data.data.authorization_url,
        accessCode: paystackResponse.data.data.access_code,
        amount: priceBreakdown.finalPrice,
        currency: bundle.currency,
        priceBreakdown,
      };
    } catch (error) {
      throw new Error(`Failed to initialize payment: ${error.message}`);
    }
  }

  /**
   * Verify payment with Paystack
   * @param {string} reference - Transaction reference
   * @returns {Promise<Object>} - Verification result
   */
  async verifyPayment(reference) {
    try {
      // Find payment by reference
      const payment = await this.repository.findByTransactionReference(reference);
      if (!payment) {
        throw new Error("Payment not found");
      }

      // Skip if already completed
      if (payment.status === PAYMENT_STATUS.COMPLETED) {
        return {
          success: true,
          payment,
          message: "Payment already verified",
        };
      }

      // Verify with Paystack
      const paystackResponse = await axios.get(
        `${this.paystackBaseUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
          },
        }
      );

      if (!paystackResponse.data.status) {
        throw new Error(paystackResponse.data.message || "Paystack verification failed");
      }

      const paystackData = paystackResponse.data.data;

      // Check if payment was successful
      if (paystackData.status !== "success") {
        // Mark as failed
        await this.repository.updateById(payment._id, {
          status: PAYMENT_STATUS.FAILED,
          failure_reason: paystackData.gateway_response || "Payment not successful",
          paid_at: new Date(paystackData.paid_at || Date.now()),
        });

        throw new Error(`Payment failed: ${paystackData.gateway_response}`);
      }

      // Verify amount matches
      const amountPaid = paystackData.amount / 100; // Convert from kobo/pesewas
      if (Math.abs(amountPaid - payment.amount_paid) > 0.01) {
        await this.repository.updateById(payment._id, {
          status: PAYMENT_STATUS.FAILED,
          failure_reason: "Amount mismatch",
        });

        throw new Error("Payment amount mismatch");
      }

      // Mark payment as completed
      await this.repository.markAsCompleted(payment._id, {
        reference: paystackData.reference,
        authorization: paystackData.authorization,
        customer: paystackData.customer,
        metadata: paystackData.metadata,
      });

      // Redeem coupon if used
      if (payment.coupon) {
        await CouponService.redeemCoupon(payment.coupon.toString(), payment.voter_email);
      }

      // Record bundle purchase
      await BundleService.recordPurchase(payment.bundle.toString(), payment.amount_paid);

      // Get updated payment
      const updatedPayment = await this.repository.findById(payment._id, {
        populate: ["bundle", "event", "coupon"],
      });

      // Queue confirmation email via Agenda (non-blocking)
      await agendaManager.now("send-payment-success-email", {
        voterEmail: payment.voter_email,
        voterName: payment.voter_name || payment.voter_email,
        eventName: updatedPayment.event.name,
        bundleName: updatedPayment.bundle.name,
        voteCode: payment.vote_code,
        votesCount: payment.votes_purchased,
        amountPaid: payment.amount_paid,
        currency: payment.currency,
        transactionReference: payment.transaction_reference,
        paidAt: updatedPayment.paid_at,
      });

      // Send notification
      await NotificationService.sendNotification({
        recipientEmail: payment.voter_email,
        type: "PAYMENT_SUCCESS",
        title: "Payment Successful",
        message: `Your payment of ${payment.currency} ${payment.amount_paid} was successful. Your vote code is ${payment.vote_code}`,
        metadata: {
          paymentId: payment._id,
          voteCode: payment.vote_code,
        },
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: payment._id,
        eventId: payment.event,
        description: `Payment verified: ${payment.transaction_reference}`,
        metadata: {
          voterEmail: payment.voter_email,
          amount: payment.amount_paid,
          currency: payment.currency,
          voteCode: payment.vote_code,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return {
        success: true,
        payment: updatedPayment,
        message: "Payment verified successfully",
      };
    } catch (error) {
      throw new Error(`Failed to verify payment: ${error.message}`);
    }
  }

  /**
   * Handle Paystack webhook
   * @param {Object} payload - Webhook payload
   * @param {string} signature - Paystack signature
   * @returns {Promise<Object>} - Processing result
   */
  async handleWebhook(payload, signature) {
    try {
      // Verify webhook signature
      const hash = crypto
        .createHmac("sha512", this.paystackSecretKey)
        .update(JSON.stringify(payload))
        .digest("hex");

      if (hash !== signature) {
        throw new Error("Invalid webhook signature");
      }

      const { event, data } = payload;

      // Handle different webhook events
      switch (event) {
        case "charge.success":
          return await this.handleChargeSuccess(data);

        case "charge.failed":
          return await this.handleChargeFailed(data);

        case "transfer.success":
          return await this.handleTransferSuccess(data);

        case "transfer.failed":
          return await this.handleTransferFailed(data);

        default:
          return { success: true, message: `Unhandled event: ${event}` };
      }
    } catch (error) {
      throw new Error(`Failed to handle webhook: ${error.message}`);
    }
  }

  /**
   * Handle successful charge
   * @param {Object} data - Charge data
   * @returns {Promise<Object>} - Processing result
   */
  async handleChargeSuccess(data) {
    try {
      const reference = data.reference;
      const payment = await this.repository.findByTransactionReference(reference);

      if (!payment) {
        return { success: false, message: "Payment not found" };
      }

      if (payment.status === PAYMENT_STATUS.COMPLETED) {
        return { success: true, message: "Payment already processed" };
      }

      // Verify and complete payment
      await this.verifyPayment(reference);

      return { success: true, message: "Charge processed successfully" };
    } catch (error) {
      throw new Error(`Failed to handle charge success: ${error.message}`);
    }
  }

  /**
   * Handle failed charge
   * @param {Object} data - Charge data
   * @returns {Promise<Object>} - Processing result
   */
  async handleChargeFailed(data) {
    try {
      const reference = data.reference;
      const payment = await this.repository.findByTransactionReference(reference);

      if (!payment) {
        return { success: false, message: "Payment not found" };
      }

      // Mark payment as failed
      await this.repository.updateById(payment._id, {
        status: PAYMENT_STATUS.FAILED,
        failure_reason: data.gateway_response || "Charge failed",
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: payment._id,
        eventId: payment.event,
        description: `Payment failed: ${payment.transaction_reference}`,
        metadata: {
          voterEmail: payment.voter_email,
          reason: data.gateway_response,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return { success: true, message: "Failed charge processed" };
    } catch (error) {
      throw new Error(`Failed to handle charge failure: ${error.message}`);
    }
  }

  /**
   * Handle successful transfer (refund)
   * @param {Object} data - Transfer data
   * @returns {Promise<Object>} - Processing result
   */
  async handleTransferSuccess(data) {
    try {
      // Find payment by transfer reference in metadata
      const paymentId = data.reason || data.metadata?.payment_id;
      if (!paymentId) {
        return { success: false, message: "Payment ID not found in transfer" };
      }

      const payment = await this.repository.findById(paymentId);
      if (!payment) {
        return { success: false, message: "Payment not found" };
      }

      // Update refund status
      await this.repository.updateById(payment._id, {
        status: PAYMENT_STATUS.REFUNDED,
        refund_reference: data.transfer_code,
        refunded_at: new Date(data.transferred_at || Date.now()),
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: payment._id,
        eventId: payment.event,
        description: `Refund successful: ${payment.transaction_reference}`,
        metadata: {
          voterEmail: payment.voter_email,
          amount: payment.amount_paid,
          transferCode: data.transfer_code,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return { success: true, message: "Refund processed successfully" };
    } catch (error) {
      throw new Error(`Failed to handle transfer success: ${error.message}`);
    }
  }

  /**
   * Handle failed transfer (refund)
   * @param {Object} data - Transfer data
   * @returns {Promise<Object>} - Processing result
   */
  async handleTransferFailed(data) {
    try {
      const paymentId = data.reason || data.metadata?.payment_id;
      if (!paymentId) {
        return { success: false, message: "Payment ID not found in transfer" };
      }

      // Log refund failure (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.ERROR,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: paymentId,
        description: `Refund failed: ${data.transfer_code}`,
        metadata: {
          reason: data.reason,
          transferCode: data.transfer_code,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return { success: true, message: "Refund failure logged" };
    } catch (error) {
      throw new Error(`Failed to handle transfer failure: ${error.message}`);
    }
  }

  /**
   * Process refund for a payment
   * @param {string} paymentId - Payment ID
   * @param {string} reason - Refund reason
   * @param {string} adminId - Admin processing refund
   * @returns {Promise<Object>} - Refund result
   */
  async processRefund(paymentId, reason, adminId) {
    try {
      const payment = await this.repository.findById(paymentId, {
        populate: ["event", "bundle"],
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      if (payment.status !== PAYMENT_STATUS.COMPLETED) {
        throw new Error("Only completed payments can be refunded");
      }

      if (payment.status === PAYMENT_STATUS.REFUNDED) {
        throw new Error("Payment already refunded");
      }

      // Check if any votes have been cast
      if (payment.votes_cast > 0) {
        throw new Error(`Cannot refund: ${payment.votes_cast} vote(s) already cast`);
      }

      // Initiate Paystack refund
      const refundPayload = {
        transaction: payment.transaction_reference,
        amount: Math.round(payment.amount_paid * 100), // Full refund in kobo/pesewas
        currency: payment.currency,
        customer_note: reason,
        merchant_note: `Refund requested by admin: ${adminId}`,
      };

      const paystackResponse = await axios.post(
        `${this.paystackBaseUrl}/refund`,
        refundPayload,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!paystackResponse.data.status) {
        throw new Error(paystackResponse.data.message || "Paystack refund failed");
      }

      // Update payment status
      await this.repository.updateById(paymentId, {
        status: PAYMENT_STATUS.REFUNDED,
        refund_reference: paystackResponse.data.data.transaction?.reference,
        refund_reason: reason,
        refunded_at: new Date(),
        refunded_by: adminId,
      });

      // Reverse coupon redemption if used
      if (payment.coupon) {
        await CouponService.reverseCouponRedemption(payment.coupon.toString(), payment.voter_email);
      }

      // Send refund notification
      await EmailService.sendEmail(
        payment.voter_email,
        "Refund Processed",
        "refund-processed", // Template name
        {
          voterName: payment.voter_name || payment.voter_email,
          eventName: payment.event.name,
          bundleName: payment.bundle.name,
          amount: payment.amount_paid,
          currency: payment.currency,
          reason,
          transactionReference: payment.transaction_reference,
        }
      );

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: paymentId,
        eventId: payment.event._id,
        description: `Refund processed: ${payment.transaction_reference}`,
        metadata: {
          voterEmail: payment.voter_email,
          amount: payment.amount_paid,
          currency: payment.currency,
          reason,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return {
        success: true,
        message: "Refund processed successfully",
        payment,
      };
    } catch (error) {
      throw new Error(`Failed to process refund: ${error.message}`);
    }
  }

  /**
   * Get payment by ID
   * @param {string} paymentId - Payment ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Payment
   */
  async getPaymentById(paymentId, options = {}) {
    try {
      const payment = await this.repository.findById(paymentId, options);
      if (!payment) {
        throw new Error("Payment not found");
      }

      return payment;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }

  /**
   * Get payment by vote code
   * @param {string} voteCode - Vote code
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Payment
   */
  async getPaymentByVoteCode(voteCode, options = {}) {
    try {
      const payment = await this.repository.findByVoteCode(voteCode, options);
      if (!payment) {
        throw new Error("Invalid vote code");
      }

      return payment;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }

  /**
   * Get payment by transaction reference
   * @param {string} reference - Transaction reference
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Payment
   */
  async getPaymentByReference(reference, options = {}) {
    try {
      const payment = await this.repository.findByTransactionReference(reference, options);
      if (!payment) {
        throw new Error("Payment not found");
      }

      return payment;
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }

  /**
   * Get payments by voter email
   * @param {string} voterEmail - Voter email
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async getPaymentsByVoter(voterEmail, page = 1, limit = 10, options = {}) {
    try {
      const payments = await this.repository.findAll(
        { voter_email: voterEmail.toLowerCase() },
        page,
        limit,
        { ...options, sort: { created_at: -1 } }
      );

      return payments;
    } catch (error) {
      throw new Error(`Failed to get payments: ${error.message}`);
    }
  }

  /**
   * Get payments by event
   * @param {string} eventId - Event ID
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async getPaymentsByEvent(eventId, page = 1, limit = 10, options = {}) {
    try {
      const payments = await this.repository.findAll(
        { event: eventId },
        page,
        limit,
        { ...options, sort: { created_at: -1 } }
      );

      return payments;
    } catch (error) {
      throw new Error(`Failed to get payments: ${error.message}`);
    }
  }

  /**
   * Get payment statistics
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Object>} - Payment statistics
   */
  async getPaymentStats(filters = {}) {
    try {
      const stats = await this.repository.getPaymentStats(filters);
      return stats;
    } catch (error) {
      throw new Error(`Failed to get payment statistics: ${error.message}`);
    }
  }

  /**
   * Validate vote code for casting votes
   * @param {string} voteCode - Vote code
   * @returns {Promise<Object>} - Validation result
   */
  async validateVoteCode(voteCode) {
    try {
      const payment = await this.repository.findByVoteCode(voteCode, {
        populate: ["bundle", "event"],
      });

      if (!payment) {
        return { isValid: false, reason: "Invalid vote code" };
      }

      if (payment.status !== PAYMENT_STATUS.COMPLETED) {
        return { isValid: false, reason: "Payment not completed", payment };
      }

      if (payment.votes_remaining <= 0) {
        return { isValid: false, reason: "No votes remaining", payment };
      }

      return { isValid: true, payment };
    } catch (error) {
      throw new Error(`Failed to validate vote code: ${error.message}`);
    }
  }

  /**
   * Decrement remaining votes after casting a vote
   * @param {string} voteCode - Vote code
   * @returns {Promise<Object>} - Updated payment
   */
  async useVote(voteCode) {
    try {
      const payment = await this.repository.findByVoteCode(voteCode);
      if (!payment) {
        throw new Error("Invalid vote code");
      }

      if (payment.votes_remaining <= 0) {
        throw new Error("No votes remaining");
      }

      const updatedPayment = await this.repository.useVote(payment._id);
      return updatedPayment;
    } catch (error) {
      throw new Error(`Failed to use vote: ${error.message}`);
    }
  }

  /**
   * Increment remaining votes (for vote refund)
   * @param {string} voteCode - Vote code
   * @returns {Promise<Object>} - Updated payment
   */
  async restoreVote(voteCode) {
    try {
      const payment = await this.repository.findByVoteCode(voteCode);
      if (!payment) {
        throw new Error("Invalid vote code");
      }

      if (payment.votes_cast <= 0) {
        throw new Error("No votes to restore");
      }

      const updatedPayment = await this.repository.restoreVote(payment._id);
      return updatedPayment;
    } catch (error) {
      throw new Error(`Failed to restore vote: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { PaymentService };
export default new PaymentService();
