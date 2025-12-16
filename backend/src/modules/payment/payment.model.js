/**
 * The payment model definition for the vote module
 * Integrated with Paystack payment gateway
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model.js";
import { STATUS, PAYMENT_METHOD } from "../../utils/constants/payment.constants.js";
import crypto from "crypto";

class Payment extends BaseModel {
  constructor() {
    const schemaDefinition = {
      transaction_reference: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      paystack_reference: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
      },
      paystack_access_code: {
        type: String,
        index: true,
      },
      bundle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bundle",
        required: true,
        index: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true,
      },
      coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon",
        default: null,
      },
      vote_code: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      votes_purchased: {
        type: Number,
        required: true,
        min: 1,
      },
      votes_cast: {
        type: Number,
        default: 0,
        min: 0,
      },
      votes_remaining: {
        type: Number,
        default: 0,
        min: 0,
      },
      amount_paid: {
        type: Number,
        required: true,
        min: 0,
      },
      original_amount: {
        type: Number,
        required: true,
        min: 0,
      },
      discount_amount: {
        type: Number,
        default: 0,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        default: "GHS",
        uppercase: true,
      },
      voter_email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
      },
      voter_phone: {
        type: String,
        trim: true,
      },
      voter_name: {
        type: String,
        trim: true,
      },
      payment_method: {
        type: String,
        enum: Object.values(PAYMENT_METHOD),
        default: PAYMENT_METHOD.CARD,
      },
      payment_status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.PENDING,
        index: true,
      },
      webhook_received: {
        type: Boolean,
        default: false,
        index: true,
      },
      auto_vote_cast: {
        type: Boolean,
        default: false,
      },
      ip_address: {
        type: String,
      },
      ip_hash: {
        type: String,
        index: true,
      },
      user_agent: {
        type: String,
      },
      paystack_metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {},
      },
      authorization: {
        type: {
          authorization_code: String,
          card_type: String,
          last4: String,
          exp_month: String,
          exp_year: String,
          bin: String,
          bank: String,
          channel: String,
          signature: String,
          reusable: Boolean,
          country_code: String,
        },
        default: null,
      },
      customer: {
        type: {
          paystack_customer_id: String,
          customer_code: String,
        },
        default: null,
      },
      confirmed_at: {
        type: Date,
        default: null,
      },
      failed_at: {
        type: Date,
        default: null,
      },
      refunded_at: {
        type: Date,
        default: null,
      },
      refund_reason: {
        type: String,
        trim: true,
      },
      refund_amount: {
        type: Number,
        default: 0,
        min: 0,
      },
      failure_reason: {
        type: String,
        trim: true,
      },
      webhook_attempts: {
        type: Number,
        default: 0,
        min: 0,
      },
      last_webhook_at: {
        type: Date,
        default: null,
      },
      metadata: {
        type: Map,
        of: String,
        default: {},
      },
    };

    const options = {
      softDelete: true,
      timestamps: true,
    };

    super(schemaDefinition, options);

    // Create indexes
    this.schema.index({ event: 1, payment_status: 1 });
    this.schema.index({ voter_email: 1, event: 1 });
    this.schema.index({ payment_status: 1, webhook_received: 1 });
    this.schema.index({ created_at: -1 });
    this.schema.index({ confirmed_at: -1 });

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Generate vote code if not provided
        if (!this.vote_code) {
          this.vote_code = this.generateVoteCode();
        }

        // Generate transaction reference if not provided
        if (!this.transaction_reference) {
          this.transaction_reference = this.generateTransactionReference();
        }

        // Hash IP address for privacy
        if (this.ip_address && !this.ip_hash) {
          this.ip_hash = crypto.createHash("sha256").update(this.ip_address).digest("hex");
        }

        // Calculate votes remaining
        this.votes_remaining = this.votes_purchased - this.votes_cast;

        // Set confirmed_at when status changes to completed
        if (
          this.isModified("payment_status") &&
          this.payment_status === STATUS.COMPLETED &&
          !this.confirmed_at
        ) {
          this.confirmed_at = new Date();
        }

        // Set failed_at when status changes to failed
        if (
          this.isModified("payment_status") &&
          this.payment_status === STATUS.FAILED &&
          !this.failed_at
        ) {
          this.failed_at = new Date();
        }

        // Set refunded_at when status changes to refunded
        if (
          this.isModified("payment_status") &&
          this.payment_status === STATUS.REFUNDED &&
          !this.refunded_at
        ) {
          this.refunded_at = new Date();
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Is completed
    this.schema.virtual("isCompleted").get(function () {
      return this.payment_status === STATUS.COMPLETED;
    });

    // Virtual: Is pending
    this.schema.virtual("isPending").get(function () {
      return this.payment_status === STATUS.PENDING;
    });

    // Virtual: Is failed
    this.schema.virtual("isFailed").get(function () {
      return this.payment_status === STATUS.FAILED;
    });

    // Virtual: Is refunded
    this.schema.virtual("isRefunded").get(function () {
      return this.payment_status === STATUS.REFUNDED;
    });

    // Virtual: Has unused votes
    this.schema.virtual("hasUnusedVotes").get(function () {
      return this.votes_remaining > 0;
    });

    // Virtual: Vote usage percentage
    this.schema.virtual("voteUsagePercentage").get(function () {
      if (this.votes_purchased === 0) return 0;
      return Math.round((this.votes_cast / this.votes_purchased) * 100);
    });

    // Virtual: Days since payment
    this.schema.virtual("daysSincePayment").get(function () {
      if (!this.confirmed_at) return 0;
      const now = new Date();
      return Math.floor((now - this.confirmed_at) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Has discount
    this.schema.virtual("hasDiscount").get(function () {
      return this.discount_amount > 0;
    });

    // Virtual: Discount percentage
    this.schema.virtual("discountPercentage").get(function () {
      if (this.original_amount === 0) return 0;
      return Math.round((this.discount_amount / this.original_amount) * 100);
    });

    // Static method: Generate vote code
    this.schema.statics.generateVoteCode = function () {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const part1 = Array.from({ length: 5 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
      const part2 = Array.from({ length: 5 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
      return `VOTE-${part1}-${part2}`;
    };

    // Static method: Generate transaction reference
    this.schema.statics.generateTransactionReference = function () {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000000);
      return `TXN-${timestamp}-${random}`;
    };

    // Instance method: Generate vote code
    this.schema.methods.generateVoteCode = function () {
      return this.constructor.generateVoteCode();
    };

    // Instance method: Generate transaction reference
    this.schema.methods.generateTransactionReference = function () {
      return this.constructor.generateTransactionReference();
    };

    // Static method: Find by vote code
    this.schema.statics.findByVoteCode = async function (voteCode, options = {}) {
      const query = this.findOne({ vote_code: voteCode.toUpperCase() });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find by email
    this.schema.statics.findByEmail = async function (email, eventId = null, options = {}) {
      const filter = { voter_email: email.toLowerCase() };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find by paystack reference
    this.schema.statics.findByPaystackReference = async function (reference, options = {}) {
      const query = this.findOne({ paystack_reference: reference });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find pending payments
    this.schema.statics.findPending = async function (options = {}) {
      const query = this.find({ payment_status: STATUS.PENDING }).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find completed payments
    this.schema.statics.findCompleted = async function (eventId = null, options = {}) {
      const filter = { payment_status: STATUS.COMPLETED };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ confirmed_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Get payment statistics
    this.schema.statics.getStatistics = async function (eventId = null) {
      const matchStage = eventId ? { event: eventId } : {};

      const [stats] = await this.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            completed: [{ $match: { payment_status: STATUS.COMPLETED } }, { $count: "count" }],
            pending: [{ $match: { payment_status: STATUS.PENDING } }, { $count: "count" }],
            failed: [{ $match: { payment_status: STATUS.FAILED } }, { $count: "count" }],
            refunded: [{ $match: { payment_status: STATUS.REFUNDED } }, { $count: "count" }],
            totalRevenue: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$amount_paid" },
                },
              },
            ],
            totalVotesPurchased: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$votes_purchased" },
                },
              },
            ],
            totalVotesCast: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$votes_cast" },
                },
              },
            ],
            avgAmount: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  average: { $avg: "$amount_paid" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            completed: { $arrayElemAt: ["$completed.count", 0] },
            pending: { $arrayElemAt: ["$pending.count", 0] },
            failed: { $arrayElemAt: ["$failed.count", 0] },
            refunded: { $arrayElemAt: ["$refunded.count", 0] },
            totalRevenue: { $arrayElemAt: ["$totalRevenue.total", 0] },
            totalVotesPurchased: { $arrayElemAt: ["$totalVotesPurchased.total", 0] },
            totalVotesCast: { $arrayElemAt: ["$totalVotesCast.total", 0] },
            averageAmount: { $arrayElemAt: ["$avgAmount.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        completed: stats?.completed || 0,
        pending: stats?.pending || 0,
        failed: stats?.failed || 0,
        refunded: stats?.refunded || 0,
        totalRevenue: Math.round((stats?.totalRevenue || 0) * 100) / 100,
        totalVotesPurchased: stats?.totalVotesPurchased || 0,
        totalVotesCast: stats?.totalVotesCast || 0,
        totalVotesRemaining:
          (stats?.totalVotesPurchased || 0) - (stats?.totalVotesCast || 0),
        averageAmount: Math.round((stats?.averageAmount || 0) * 100) / 100,
      };
    };

    // Instance method: Mark as completed
    this.schema.methods.markAsCompleted = async function (paystackData = {}) {
      this.payment_status = STATUS.COMPLETED;
      this.confirmed_at = new Date();
      this.webhook_received = true;

      if (paystackData.reference) {
        this.paystack_reference = paystackData.reference;
      }

      if (paystackData.authorization) {
        this.authorization = paystackData.authorization;
      }

      if (paystackData.customer) {
        this.customer = paystackData.customer;
      }

      if (paystackData.metadata) {
        this.paystack_metadata = paystackData.metadata;
      }

      return await this.save();
    };

    // Instance method: Mark as failed
    this.schema.methods.markAsFailed = async function (reason) {
      this.payment_status = STATUS.FAILED;
      this.failed_at = new Date();
      this.failure_reason = reason;
      return await this.save();
    };

    // Instance method: Process refund
    this.schema.methods.processRefund = async function (reason, amount = null) {
      if (this.payment_status !== STATUS.COMPLETED) {
        throw new Error("Can only refund completed payments");
      }

      this.payment_status = STATUS.REFUNDED;
      this.refunded_at = new Date();
      this.refund_reason = reason;
      this.refund_amount = amount || this.amount_paid;

      return await this.save();
    };

    // Instance method: Increment votes cast
    this.schema.methods.incrementVotesCast = async function (count = 1) {
      if (this.votes_cast + count > this.votes_purchased) {
        throw new Error("Cannot cast more votes than purchased");
      }

      this.votes_cast += count;
      this.votes_remaining = this.votes_purchased - this.votes_cast;

      return await this.save();
    };

    // Instance method: Record webhook
    this.schema.methods.recordWebhook = async function () {
      this.webhook_attempts += 1;
      this.last_webhook_at = new Date();
      return await this.save();
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Payment().getModel("Payment");