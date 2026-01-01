/**
 * The payment model definition for the vote module
 * Updated to support multiple bundles per payment
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
      // Changed from single bundle to array of bundles
      bundles: [
        {
          bundle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bundle",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
          },
          votes_allocated: {
            type: Number,
            required: true,
            min: 1,
          },
          votes_used: {
            type: Number,
            default: 0,
            min: 0,
          },
          price_per_unit: {
            type: Number,
            required: true,
            min: 0,
          },
          total_price: {
            type: Number,
            required: true,
            min: 0,
          },
          applicable_categories: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Category",
            },
          ],
          _id: false,
        },
      ],
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
      // Track votes by category
      votes_by_category: [
        {
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
          },
          votes_available: {
            type: Number,
            required: true,
            min: 0,
          },
          votes_used: {
            type: Number,
            default: 0,
            min: 0,
          },
          bundle_sources: [
            {
              bundle: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bundle",
              },
              votes_allocated: Number,
              votes_used: Number,
            },
          ],
          _id: false,
        },
      ],
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
        default: null,
        required: false,
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
        of: mongoose.Schema.Types.Mixed,
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
    this.schema.index({ "bundles.bundle": 1 });
    this.schema.index({ "votes_by_category.category": 1 });

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

        // Calculate total votes remaining
        this.votes_remaining = this.votes_purchased - this.votes_cast;

        // Update bundle-level votes used/remaining
        this.bundles.forEach((bundleItem) => {
          bundleItem.votes_used = Math.min(
            bundleItem.votes_allocated,
            bundleItem.votes_allocated - (this.votes_remaining > 0 ? Math.min(this.votes_remaining, bundleItem.votes_allocated) : 0)
          );
        });

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

    // Instance method: Get available votes for a specific category
    this.schema.methods.getAvailableVotesForCategory = function (categoryId) {
      const categoryVotes = this.votes_by_category.find(
        (vc) => vc.category.toString() === categoryId.toString()
      );
      return categoryVotes ? categoryVotes.votes_available - categoryVotes.votes_used : 0;
    };

    // Instance method: Use votes for a specific category
    this.schema.methods.useVotesForCategory = async function (categoryId, votesToUse = 1) {
      console.log("useVotesForCategory", categoryId, votesToUse, this.votes_by_category);
      const categoryIndex = this.votes_by_category.findIndex(
        (vc) => vc.category._id.toString() === categoryId.toString()
      );

      if (categoryIndex === -1) {
        throw new Error("Category not available for voting with this payment");
      }

      const categoryVotes = this.votes_by_category[categoryIndex];
      const availableVotes = categoryVotes.votes_available - categoryVotes.votes_used;

      if (availableVotes < votesToUse) {
        throw new Error(`Insufficient votes for this category. Available: ${availableVotes}, Requested: ${votesToUse}`);
      }

      // Update category votes
      categoryVotes.votes_used += votesToUse;

      // Update bundle-level tracking
      let remainingToAllocate = votesToUse;
      for (const bundleSource of categoryVotes.bundle_sources) {
        if (remainingToAllocate <= 0) break;

        const bundleAvailable = bundleSource.votes_allocated - bundleSource.votes_used;
        const toUse = Math.min(bundleAvailable, remainingToAllocate);

        if (toUse > 0) {
          bundleSource.votes_used += toUse;
          remainingToAllocate -= toUse;

          // Update main bundles array
          const mainBundleIndex = this.bundles.findIndex(
            (b) => b.bundle.toString() === bundleSource.bundle.toString()
          );
          if (mainBundleIndex !== -1) {
            this.bundles[mainBundleIndex].votes_used += toUse;
          }
        }
      }

      // Update overall votes cast
      this.votes_cast += votesToUse;
      this.votes_remaining = this.votes_purchased - this.votes_cast;

      return await this.save();
    };

    // Instance method: Get voting summary
    this.schema.methods.getVotingSummary = function () {
      return {
        vote_code: this.vote_code,
        total_votes: this.votes_purchased,
        votes_used: this.votes_cast,
        votes_remaining: this.votes_remaining,
        bundles: this.bundles.map((b) => ({
          bundle_id: b.bundle,
          quantity: b.quantity,
          votes_allocated: b.votes_allocated,
          votes_used: b.votes_used,
          votes_remaining: b.votes_allocated - b.votes_used,
          applicable_categories: b.applicable_categories,
        })),
        categories: this.votes_by_category.map((vc) => ({
          category_id: vc.category,
          votes_available: vc.votes_available,
          votes_used: vc.votes_used,
          votes_remaining: vc.votes_available - vc.votes_used,
        })),
      };
    };

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

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Payment().getModel("Payment");