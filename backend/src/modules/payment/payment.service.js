/**
 * Payment Service
 * Handles business logic for payment processing with Paystack
 * 
 * Production Features:
 * - Retry logic with exponential backoff
 * - Circuit breaker pattern for external API calls
 * - Request timeout handling
 * - Idempotency support
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
import { configDotenv } from "dotenv";
import voteService from "../vote/vote/vote.service.js";
import logger from "../../utils/logger.js";

// Set up validation module for this service
BaseService.setValidation(PaymentValidation);

configDotenv();

// Circuit breaker state
const circuitBreaker = {
  failures: 0,
  lastFailure: null,
  isOpen: false,
  threshold: 5, // Open circuit after 5 failures
  resetTimeout: 60000, // Reset after 60 seconds
};

/**
 * Check if circuit breaker allows request
 * @returns {boolean}
 */
function isCircuitClosed() {
  if (!circuitBreaker.isOpen) return true;
  
  // Check if enough time has passed to reset
  const timeSinceLastFailure = Date.now() - circuitBreaker.lastFailure;
  if (timeSinceLastFailure >= circuitBreaker.resetTimeout) {
    circuitBreaker.isOpen = false;
    circuitBreaker.failures = 0;
    logger.info("Circuit breaker reset - allowing requests");
    return true;
  }
  
  return false;
}

/**
 * Record circuit breaker failure
 */
function recordFailure() {
  circuitBreaker.failures++;
  circuitBreaker.lastFailure = Date.now();
  
  if (circuitBreaker.failures >= circuitBreaker.threshold) {
    circuitBreaker.isOpen = true;
    logger.error("Circuit breaker opened - blocking Paystack requests", {
      failures: circuitBreaker.failures,
    });
  }
}

/**
 * Record circuit breaker success
 */
function recordSuccess() {
  circuitBreaker.failures = 0;
  circuitBreaker.isOpen = false;
}

/**
 * Sleep utility for retry delays
 * @param {number} ms - Milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Make HTTP request with retry logic
 * @param {Function} requestFn - Async function that makes the request
 * @param {Object} options - Retry options
 * @returns {Promise<any>}
 */
async function withRetry(requestFn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    retryOn = [408, 429, 500, 502, 503, 504],
  } = options;

  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Check circuit breaker before attempt
      if (!isCircuitClosed()) {
        throw new Error("Payment service temporarily unavailable. Please try again later.");
      }

      const result = await requestFn();
      recordSuccess();
      return result;
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      const statusCode = error.response?.status;
      const isRetryable = retryOn.includes(statusCode) || 
                         error.code === 'ECONNABORTED' ||
                         error.code === 'ETIMEDOUT';

      if (attempt < maxRetries && isRetryable) {
        // Calculate delay with exponential backoff and jitter
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
          maxDelay
        );
        
        logger.warn("Paystack request failed, retrying", {
          attempt: attempt + 1,
          maxRetries,
          delay,
          statusCode,
          error: error.message,
        });
        
        await sleep(delay);
        continue;
      }

      // Record failure for circuit breaker
      if (statusCode >= 500 || !statusCode) {
        recordFailure();
      }

      throw error;
    }
  }

  throw lastError;
}

class PaymentService extends BaseService {
  constructor(dependencies = {
    votingService: voteService
  }) {
    super();
    this.repository = dependencies.repository || PaymentRepository;
    this.bundleRepository = dependencies.bundleRepository || BundleRepository;
    this.eventRepository = dependencies.eventRepository || EventRepository;
    this.couponRepository = dependencies.couponRepository || CouponRepository;
    this.bundleService = dependencies.bundleService || BundleService;
    this.couponService = dependencies.couponService || CouponService;
    this.activityService = dependencies.activityService || ActivityService;
    this.voteService = dependencies.votingService || voteService;
    this.notificationService = dependencies.notificationService || NotificationService;
    this.emailService = dependencies.emailService || EmailService;
    this.paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    this.paystackBaseUrl = "https://api.paystack.co";
    this.requestTimeout = parseInt(process.env.PAYSTACK_TIMEOUT_MS, 10) || 30000;
  }

  /**
   * Make authenticated request to Paystack API with retry logic
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @returns {Promise<Object>}
   * @private
   */
  async _makePaystackRequest(method, endpoint, data = null) {
    return withRetry(async () => {
      const config = {
        method,
        url: `${this.paystackBaseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${this.paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        timeout: this.requestTimeout,
      };

      if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.data = data;
      }

      const response = await axios(config);
      return response.data;
    });
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
   * Payment Service - Initialize Payment Method (Updated for Multiple Bundles)
   * This is part 1 - the initializePayment method
   */

  /**
   * Initialize payment with Paystack - Updated for multiple bundles
   * @param {Object} paymentData - Payment data
   * @param {Array} paymentData.bundles - Array of {bundle_id, quantity}
   * @returns {Promise<Object>} - Payment initialization response
   */
  async initializePayment(paymentData) {
    try {
      // Validate input data using BaseService validation
      const validatedData = this.validate(paymentData, PaymentValidation.initializePaymentSchema);

      const {
        bundles: bundleItems,
        event_id: eventId,
        voter_email: voterEmail,
        voter_phone: voterPhone,
        voter_name: voterName,
        coupon_code: couponCode = null,
        callback_url: callbackUrl,
        candidate_id: candidateId,
        metadata = {},
      } = validatedData;



      // Validate event
      const event = await this.eventRepository.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      // Fetch and validate all bundles
      const bundleValidations = [];
      const bundlesData = [];
      let totalVotes = 0;
      let subtotal = 0;
      let currency = null;

      for (const item of bundleItems) {
        const bundleValidation = await this.bundleService.validateBundleAvailability(item.bundle_id);
        if (!bundleValidation.isAvailable) {
          throw new Error(`Bundle ${item.bundle_id}: ${bundleValidation.reason}`);
        }

        const bundle = bundleValidation.bundle;

        // Ensure all bundles are from the same event
        const bundleEventId = typeof bundle.event === 'object' ? bundle.event._id : bundle.event;
        if (bundleEventId.toString() !== eventId.toString()) {
          throw new Error(`Bundle ${bundle.name} does not belong to this event`);
        }

        // Ensure currency consistency
        if (currency === null) {
          currency = bundle.currency;
        } else if (currency !== bundle.currency) {
          throw new Error("All bundles must have the same currency");
        }

        const quantity = item.quantity || 1;
        const bundlePrice = bundle.price * quantity;
        const votesAllocated = bundle.vote_count * quantity;

        bundlesData.push({
          bundle: bundle._id,
          bundleDetails: bundle,
          quantity,
          votes_allocated: votesAllocated,
          votes_used: 0,
          price_per_unit: bundle.price,
          total_price: bundlePrice,
          applicable_categories: bundle.categories || [],
        });

        totalVotes += votesAllocated;
        subtotal += bundlePrice;
        bundleValidations.push(bundleValidation);
      }

      // Validate and apply coupon if provided
      let coupon = null;
      let discountAmount = 0;
      if (couponCode) {
        // Use the first bundle for coupon validation
        const primaryBundle = bundlesData[0].bundleDetails;
        const couponValidation = await this.couponService.validateCouponForBundle(
          couponCode,
          primaryBundle._id,
          voterEmail
        );

        if (!couponValidation.isValid) {
          throw new Error(couponValidation.reason);
        }
        coupon = couponValidation.coupon;

        // Calculate discount based on coupon type
        if (coupon.discount_type === "PERCENTAGE") {
          discountAmount = (subtotal * coupon.discount_value) / 100;
          if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
            discountAmount = coupon.max_discount_amount;
          }
        } else if (coupon.discount_type === "FIXED") {
          discountAmount = Math.min(coupon.discount_value, subtotal);
        } else if (coupon.discount_type === "BONUS_VOTES") {
          // Bonus votes will be added to the first bundle
          bundlesData[0].votes_allocated += coupon.discount_value;
          totalVotes += coupon.discount_value;
        }
      }

      const finalAmount = Math.max(subtotal - discountAmount, 0);

      // Build votes_by_category structure
      const categoryVotesMap = new Map();

      bundlesData.forEach((bundleData) => {
        const categories = bundleData.applicable_categories;

        // If bundle has no specific categories, it applies to all event categories
        if (!categories || categories.length === 0) {
          // This bundle can be used for any category - we'll handle this dynamically
          // For now, we'll create a general pool
          const generalKey = 'unrestricted';
          if (!categoryVotesMap.has(generalKey)) {
            categoryVotesMap.set(generalKey, {
              category: null, // Unrestricted
              votes_available: 0,
              votes_used: 0,
              bundle_sources: [],
            });
          }
          const entry = categoryVotesMap.get(generalKey);
          entry.votes_available += bundleData.votes_allocated;
          entry.bundle_sources.push({
            bundle: bundleData.bundle,
            votes_allocated: bundleData.votes_allocated,
            votes_used: 0,
          });
        } else {
          // Bundle is restricted to specific categories
          categories.forEach((categoryId) => {
            const catId = categoryId.toString();
            if (!categoryVotesMap.has(catId)) {
              categoryVotesMap.set(catId, {
                category: categoryId,
                votes_available: 0,
                votes_used: 0,
                bundle_sources: [],
              });
            }
            const entry = categoryVotesMap.get(catId);
            entry.votes_available += bundleData.votes_allocated;
            entry.bundle_sources.push({
              bundle: bundleData.bundle,
              votes_allocated: bundleData.votes_allocated,
              votes_used: 0,
            });
          });
        }
      });

      const bundleCategoryMap = bundleItems.map(item => ({
        bundle_id: item.bundle_id.toString(),
        category_id: item.category?.toString() || null,
        quantity: item.quantity || 1
      }));


      const votesByCategory = Array.from(categoryVotesMap.values()).filter(
        (item) => item.category !== null
      );

      // Generate transaction reference and vote code
      const transactionReference = this.generateTransactionReference();
      const voteCode = await this.generateVoteCode();

      // Create payment record with PENDING status
      const payment = await this.repository.create({
        transaction_reference: transactionReference,
        bundles: bundlesData.map((bd) => ({
          bundle: bd.bundle,
          quantity: bd.quantity,
          votes_allocated: bd.votes_allocated,
          votes_used: bd.votes_used,
          price_per_unit: bd.price_per_unit,
          total_price: bd.total_price,
          applicable_categories: bd.applicable_categories,

        })),
        event: eventId,
        coupon: coupon ? coupon._id : null,
        vote_code: voteCode,
        votes_purchased: totalVotes,
        votes_cast: 0,
        votes_remaining: totalVotes,
        votes_by_category: votesByCategory,
        amount_paid: finalAmount,
        original_amount: subtotal,
        discount_amount: discountAmount,
        currency: currency || 'GHS',
        voter_email: voterEmail,
        voter_phone: voterPhone,
        voter_name: voterName,
        payment_status: PAYMENT_STATUS.PENDING,
        metadata: {
          ...metadata,
          bundleCount: bundlesData.length,
          eventName: event.name,
        },
      });

      // Initialize Paystack transaction
      const paystackPayload = {
        email: voterEmail,
        amount: Math.round(finalAmount * 100), // Convert to kobo/pesewas
        metadata: {
          payment_id: payment._id.toString(),
          event_id: eventId,
          vote_code: voteCode,
          voter_name: voterName,
          voter_phone: voterPhone,
          bundle_count: bundlesData.length,
          candidate_id: candidateId,
          bundleCategoryMap,
          custom_fields: [
            {
              display_name: "Event",
              variable_name: "event_name",
              value: event.name,
            },
            {
              display_name: "Vote Code",
              variable_name: "vote_code",
              value: voteCode,
            },
            {
              display_name: "Total Votes",
              variable_name: "total_votes",
              value: totalVotes.toString(),
            },
          ],
        },
      };

      // Log payload for debugging (without sensitive data)
      if (process.env.NODE_ENV === 'development') {
        logger.debug("Paystack Payload (sanitized):", {
          email: paystackPayload.email,
          amount: paystackPayload.amount,
          bundleCount: bundlesData.length,
        });
      }

      // Use resilient Paystack request with retry and circuit breaker
      const paystackResponse = await this._makePaystackRequest(
        'POST',
        '/transaction/initialize',
        paystackPayload
      );

      if (!paystackResponse.status) {
        throw new Error(paystackResponse.message || "Paystack initialization failed");
      }

      // Update payment with Paystack details
      await this.repository.updatePaymentById(payment._id, {
        paystack_reference: paystackResponse.data.reference,
        paystack_access_code: paystackResponse.data.access_code,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.PAYMENT_INITIATED,
        entityType: ENTITY_TYPE.PAYMENT,
        entityId: payment._id,
        eventId,
        description: `Initialized payment for ${bundlesData.length} bundle(s)`,
        metadata: {
          voterEmail,
          amount: finalAmount,
          voteCode,
          bundleCount: bundlesData.length,
          totalVotes,
        },
      }).catch(err => logger.error("Activity log failed:", { error: err.message }));

      return {
        payment_id: payment._id,
        transaction_reference: transactionReference,
        vote_code: voteCode,
        authorization_url: paystackResponse.data.authorization_url,
        access_code: paystackResponse.data.access_code,
        amount: finalAmount,
        total_votes: totalVotes,
        bundle_count: bundlesData.length,
      };
    } catch (error) {
      // Log error with context (without sensitive data)
      logger.error("Payment initialization failed", {
        error: error.message,
        eventId,
        voterEmail: voterEmail?.substring(0, 3) + '***', // Partially mask email
      });
      
      if (error.response?.data) {
        const message = error.response.data.message || error.message;
        throw new Error(`Failed to initialize payment: ${message}`);
      }
      throw new Error(`Failed to initialize payment: ${error.message}`);
    }
  }

  /**
   * Initialize payment with Paystack
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} - Payment initialization response
   */
  async initializePayment_deprecated(paymentData) {
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
        metadata: {
          payment_id: payment._id.toString(),
          event_id: eventId,
          bundle_id: bundleId,
          vote_code: voteCode,
          voter_name: voterName,
          voter_phone: voterPhone,
          bundleCategoryMap,
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
      console.log(`Starting verification for reference: ${reference}`);

      // Find payment by reference
      let payment = null;
      payment = await this.repository.findByTransactionReference(reference);

      if (!payment) {
        console.log("Not found by txn ref, trying paystack ref");
        payment = await this.repository.findByPaystackReference(reference, {
          lean: true,
          populate: {
            path: "votes_by_category.category",
            select: "name"
          }
        });
      }

      if (!payment) {
        throw new Error("Payment not found");
      }


      console.log(`Payment found: ${payment._id}, Status: ${payment.payment_status}, Bundles count: ${payment.bundles?.length}`);

      // Skip if already completed
      if (payment.payment_status === PAYMENT_STATUS.COMPLETED) {
        console.log("Payment already verified", payment);
        return {
          success: true,
          payment,
          message: "Payment already verified",
        };
      }

      // Verify with Paystack
      console.log("Verifying with Paystack...");
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
      console.log(`Paystack status: ${paystackData.status}`);

      // Check if payment was successful
      if (paystackData.status !== "success") {
        // Mark as failed
        await this.repository.updateById(payment._id, {
          payment_status: PAYMENT_STATUS.FAILED,
          failure_reason: paystackData.gateway_response || "Payment not successful",
          paid_at: new Date(paystackData.paid_at || Date.now()),
        });

        throw new Error(`Payment failed: ${paystackData.gateway_response}`);
      }

      // Verify amount matches
      const amountPaid = paystackData.amount / 100; // Convert from kobo/pesewas
      console.log(`Amount paid: ${amountPaid}, Expected: ${payment.amount_paid}`);

      if (Math.abs(amountPaid - payment.amount_paid) > 0.01) {
        await this.repository.updateById(payment._id, {
          payment_status: PAYMENT_STATUS.FAILED,
          failure_reason: "Amount mismatch",
        });

        throw new Error("Payment amount mismatch");
      }

      // Mark payment as completed
      await this.repository.updatePaymentById(payment._id, {
        paystack_reference: paystackData.reference,
        paystack_access_code: paystackData.access_code,
        authorization: paystackData.authorization,
        customer: paystackData.customer,
        paystack_metadata: paystackData.metadata,
        payment_status: PAYMENT_STATUS.COMPLETED,
        paid_at: new Date(paystackData.paid_at || Date.now()),
      });

      // Redeem coupon if used
      if (payment.coupon) {
        console.log("Redeeming coupon...");
        await CouponService.redeemCoupon(payment.coupon.toString(), payment.voter_email);
      }

      // Record bundle purchase(s)
      console.log("Recording bundle purchases...");
      if (payment.bundles && payment.bundles.length > 0) {
        for (const item of payment.bundles) {
          if (!item.bundle) {
            console.warn("Found bundle item without bundle ID, skipping:", item);
            continue;
          }
          console.log(`Recording purchase for bundle ${item.bundle} amount ${item.total_price}`);
          await BundleService.recordPurchase(item.bundle.toString(), item.total_price);
        }
      } else if (payment.bundle) {
        // Legacy fallback
        console.log(`Legacy bundle record: ${payment.bundle}`);
        await BundleService.recordPurchase(payment.bundle.toString(), payment.amount_paid);
      }

      // Get updated payment
      const updatedPayment = await this.repository.findById(payment._id, {
        populate: [
          "bundles.bundle",
          "event",
          "coupon",
          {
            path: "votes_by_category.category",
            select: "name"
          }
        ],
      });

      const bundleNames = updatedPayment.bundles
        ? updatedPayment.bundles.map(b => b.bundle?.name || "Unknown").join(", ")
        : (updatedPayment.bundle?.name || "Unknown Bundle");

      console.log("Queueing email...");

      // Queue confirmation email via Agenda (non-blocking)
      await agendaManager.now("send-payment-success-email", {
        voterEmail: payment.voter_email,
        voterName: payment.voter_name || payment.voter_email,
        eventName: updatedPayment.event.name,
        bundleName: bundleNames,
        voteCode: payment.vote_code,
        votesCount: payment.votes_purchased,
        amountPaid: payment.amount_paid,
        currency: payment.currency === "GH₵" ? "GHS" : currency,
        transactionReference: payment.transaction_reference,
        paidAt: updatedPayment.paid_at,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        action: ACTION_TYPE.UPDATE, // Check regular constant name
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

      console.log("Payment verified successfully", updatedPayment);

      return {
        success: true,
        payment: updatedPayment,
        message: "Payment verified successfully",
      };
    } catch (error) {
      console.error("Critical Verification Error:", error);
      console.error("Stack:", error.stack);
      throw new Error(`Failed to verify payment: ${error.message}`);
    }
  }

  async handleWebhook(payload, signature) {
    console.log("Received webhook payload:", payload);
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
  * Handle successful charge - UPDATED FOR AGGREGATED VOTING
  * @param {Object} data - Charge data
  * @returns {Promise<Object>} - Processing result
  */
  async handleChargeSuccess(data) {
    try {
      const reference = data.reference;
      let payment = await this.repository.findByTransactionReference(reference);
      if (!payment) {
        payment = await this.repository.findByPaystackReference(reference, {
          populate: [
            {
              path: "votes_by_category.category",
              select: "name"
            },
            {
              path: "bundles.bundle",
              select: "name vote_count"
            }
          ]
        });
      }

      if (!payment) {
        return { success: false, message: "Payment not found" };
      }

      if (payment.payment_status === PAYMENT_STATUS.COMPLETED) {
        return { success: true, message: "Payment already processed" };
      }

      // Verify and complete payment
      const result = await this.verifyPayment(reference);

      if (!result.success) {
        throw new Error("Payment verification failed");
      }

      // Get fresh payment data after verification with populated bundles
      payment = await this.repository.findById(payment._id, {
        populate: [
          {
            path: "bundles.bundle",
            select: "name vote_count"
          },
          {
            path: "event",
            select: "name"
          }
        ]
      });

      console.log("Payment data after verification:", payment.paystack_metadata);

      // Check if auto-voting should be performed
      const candidateId = payment.paystack_metadata?.get("candidate_id");
      const bundleCategoryMap = payment.paystack_metadata?.get("bundleCategoryMap");

      console.log("Auto-vote data:", {
        candidateId,
        bundleCategoryMap,
      });

      if (!candidateId || !bundleCategoryMap || bundleCategoryMap.length === 0) {
        console.log("No auto-vote data found in payment metadata");
        return { success: true, message: "Charge processed successfully - no auto-vote" };
      }

      // Check if auto-vote was already cast
      if (payment.auto_vote_cast) {
        console.log("Auto-vote already cast for this payment");
        return { success: true, message: "Charge processed successfully - auto-vote already cast" };
      }

      console.log(`Starting aggregated vote casting for ${bundleCategoryMap.length} bundle-category mappings...`);

      // Use the NEW aggregated voting method
      const votingSvc = this.voteService || voteService;
      if (!votingSvc) {
        throw new Error("Vote service is not available for auto-voting");
      }


      try {
        const voteResult = await votingSvc.castAggregatedVotes({
          paymentId: payment._id,
          candidateId: candidateId,
          bundleCategoryMap: bundleCategoryMap,
          ipAddress: data.ip_address || '0.0.0.0',
          userAgent: 'Paystack-Webhook'
        });

        console.log(`✅ Aggregated voting successful:`, voteResult);

        payment = payment.toObject();

        // Mark auto-vote as cast
        await this.repository.updatePaymentById(payment._id, {
          auto_vote_cast: true,
          metadata: {
            ...payment.metadata,
            auto_vote_results: {
              successful: true,
              vote_documents_created: voteResult.total_vote_documents,
              total_votes_cast: voteResult.total_votes_cast,
              categories_affected: voteResult.categories_affected,
              cast_at: new Date()
            }
          }
        });

        // Get candidate name for activity log
        const candidateName = voteResult.candidate;

        // Log activity
        await this.activityService.log({
          action: ACTION_TYPE.PAYMENT_AUTO_VOTE_CAST,
          entityType: ENTITY_TYPE.PAYMENT,
          entityId: payment._id,
          eventId: payment.event._id,
          description: `Auto-cast ${voteResult.total_votes_cast} aggregated votes for ${candidateName}`,
          metadata: {
            candidateId,
            totalVotesCast: voteResult.total_votes_cast,
            voteDocumentsCreated: voteResult.total_vote_documents,
            categoriesAffected: voteResult.categories_affected.length,
            bundleCount: bundleCategoryMap.length
          }
        }).catch(err => console.error("Activity log error:", err));

        // Queue bulk vote confirmation email (single email for all votes)
        await agendaManager.now("send-bulk-vote-confirmation-email", {
          voterEmail: payment.voter_email,
          voterName: payment.voter_name || payment.voter_email,
          eventName: payment.event.name,
          candidateName: candidateName,
          totalVotesCast: voteResult.total_votes_cast,
          voteCode: payment.vote_code,
          categoriesAffected: voteResult.categories_affected,
          castedAt: new Date()
        }).catch(err => console.error("Email queue error:", err));

        return {
          success: true,
          message: "Charge processed successfully with aggregated auto-vote",
          auto_vote_summary: {
            total_votes_cast: voteResult.total_votes_cast,
            vote_documents_created: voteResult.total_vote_documents,
            categories_affected: voteResult.categories_affected.length,
            candidate: candidateName
          }
        };

      } catch (voteError) {
        console.error("❌ Aggregated voting failed:", voteError.message);
        console.error("Stack:", voteError.stack);

        // Mark auto-vote as attempted but failed
        await this.repository.updatePaymentById(payment._id, {
          auto_vote_cast: false, // Mark as not cast so it can be retried
          metadata: {
            ...payment.metadata,
            auto_vote_error: {
              failed: true,
              error_message: voteError.message,
              attempted_at: new Date()
            }
          }
        });

        // Log the error but don't fail the webhook
        await this.activityService.log({
          action: ACTION_TYPE.ERROR,
          entityType: ENTITY_TYPE.PAYMENT,
          entityId: payment._id,
          eventId: payment.event._id,
          description: `Auto-vote failed: ${voteError.message}`,
          metadata: {
            candidateId,
            error: voteError.message,
            bundleCategoryMap
          }
        }).catch(err => console.error("Activity log error:", err));

        // Return success for webhook processing but indicate vote failure
        return {
          success: true,
          message: "Charge processed but auto-vote failed",
          auto_vote_error: voteError.message
        };
      }

    } catch (error) {
      console.error("Critical error in handleChargeSuccess:", error);
      console.error("Stack:", error.stack);
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
