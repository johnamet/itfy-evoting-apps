/**
 * The coupon model definition for the vote module
 */

import mongoose from "mongoose";
import { BaseModel } from "../../shared/base.model";
import { COUPON_STATUS as STATUS , DISCOUNT_TYPE } from "../../../utils/constants/vote.constants";

class Coupon extends BaseModel {
  constructor() {
    const schemaDefinition = {
      code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true,
      },
      description: {
        type: String,
        trim: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true,
      },
      applicable_bundles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bundle",
        },
      ],
      discount_type: {
        type: String,
        required: true,
        enum: Object.values(DISCOUNT_TYPE),
      },
      discount_value: {
        type: Number,
        required: true,
        min: 0,
      },
      max_discount_amount: {
        type: Number,
        required: false,
        min: 0,
      },
      min_purchase_amount: {
        type: Number,
        default: 0,
        min: 0,
      },
      status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE,
        index: true,
      },
      max_total_uses: {
        type: Number,
        required: false,
        min: 1,
      },
      max_uses_per_user: {
        type: Number,
        default: 1,
        min: 1,
      },
      current_redemptions: {
        type: Number,
        default: 0,
        min: 0,
      },
      validity_start: {
        type: Date,
        default: null,
      },
      validity_end: {
        type: Date,
        default: null,
      },
      is_public: {
        type: Boolean,
        default: false,
      },
      terms_and_conditions: {
        type: String,
        trim: true,
      },
      metadata: {
        type: Map,
        of: String,
        default: {},
      },
      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    };

    const options = {
      softDelete: true,
      timestamps: true,
    };

    super(schemaDefinition, options);

    // Create indexes
    this.schema.index({ event: 1, status: 1 });
    this.schema.index({ code: 1 }, { unique: true });
    this.schema.index({ validity_end: 1 });
    this.schema.index({ is_public: 1, status: 1 });

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Ensure code is uppercase
        if (this.code) {
          this.code = this.code.toUpperCase();
        }

        // Validate validity dates
        if (this.validity_start && this.validity_end) {
          if (this.validity_end <= this.validity_start) {
            throw new Error("Validity end date must be after start date");
          }
        }

        // Validate discount value based on type
        if (this.discount_type === DISCOUNT_TYPE.PERCENTAGE) {
          if (this.discount_value > 100) {
            throw new Error("Percentage discount cannot exceed 100%");
          }
        }

        // Validate bundles belong to the event
        if (this.applicable_bundles && this.applicable_bundles.length > 0) {
          const Bundle = mongoose.model("Bundle");
          const bundles = await Bundle.find({
            _id: { $in: this.applicable_bundles },
          });

          for (const bundle of bundles) {
            if (bundle.event.toString() !== this.event.toString()) {
              throw new Error("All bundles must belong to the coupon's event");
            }
          }
        }

        // Auto-expire if max uses reached
        if (this.max_total_uses && this.current_redemptions >= this.max_total_uses) {
          this.status = STATUS.EXPIRED;
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Is valid (within validity period)
    this.schema.virtual("isValid").get(function () {
      if (this.status !== STATUS.ACTIVE) return false;

      const now = new Date();

      if (this.validity_start && now < this.validity_start) return false;
      if (this.validity_end && now > this.validity_end) return false;

      // Check if max uses reached
      if (this.max_total_uses && this.current_redemptions >= this.max_total_uses) {
        return false;
      }

      return true;
    });

    // Virtual: Is expired
    this.schema.virtual("isExpired").get(function () {
      if (this.status === STATUS.EXPIRED) return true;

      const now = new Date();
      if (this.validity_end && now > this.validity_end) return true;

      if (this.max_total_uses && this.current_redemptions >= this.max_total_uses) {
        return true;
      }

      return false;
    });

    // Virtual: Remaining uses
    this.schema.virtual("remainingUses").get(function () {
      if (!this.max_total_uses) return null;
      return Math.max(0, this.max_total_uses - this.current_redemptions);
    });

    // Virtual: Usage percentage
    this.schema.virtual("usagePercentage").get(function () {
      if (!this.max_total_uses) return 0;
      return Math.round((this.current_redemptions / this.max_total_uses) * 100);
    });

    // Virtual: Days until expiry
    this.schema.virtual("daysUntilExpiry").get(function () {
      if (!this.validity_end) return null;
      const now = new Date();
      if (this.validity_end <= now) return 0;
      return Math.ceil((this.validity_end - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Is percentage discount
    this.schema.virtual("isPercentageDiscount").get(function () {
      return this.discount_type === DISCOUNT_TYPE.PERCENTAGE;
    });

    // Virtual: Is fixed discount
    this.schema.virtual("isFixedDiscount").get(function () {
      return this.discount_type === DISCOUNT_TYPE.FIXED_AMOUNT;
    });

    // Virtual: Is bonus votes
    this.schema.virtual("isBonusVotes").get(function () {
      return this.discount_type === DISCOUNT_TYPE.BONUS_VOTES;
    });

    // Static method: Find coupons by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find active coupons for event
    this.schema.statics.findActiveByEvent = async function (eventId, options = {}) {
      const now = new Date();
      const query = this.find({
        event: eventId,
        status: STATUS.ACTIVE,
        $or: [
          { validity_start: null, validity_end: null },
          { validity_start: { $lte: now }, validity_end: { $gte: now } },
          { validity_start: null, validity_end: { $gte: now } },
          { validity_start: { $lte: now }, validity_end: null },
        ],
      }).sort({ created_at: -1 });

      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find public coupons
    this.schema.statics.findPublic = async function (eventId = null, options = {}) {
      const filter = { is_public: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find coupon by code
    this.schema.statics.findByCode = async function (code, options = {}) {
      const query = this.findOne({ code: code.toUpperCase() });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Get coupon statistics
    this.schema.statics.getStatistics = async function (eventId = null) {
      const matchStage = eventId ? { event: eventId } : {};

      const [stats] = await this.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            expired: [{ $match: { status: STATUS.EXPIRED } }, { $count: "count" }],
            totalRedemptions: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$current_redemptions" },
                },
              },
            ],
            avgRedemptions: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$current_redemptions" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            expired: { $arrayElemAt: ["$expired.count", 0] },
            totalRedemptions: { $arrayElemAt: ["$totalRedemptions.total", 0] },
            averageRedemptions: { $arrayElemAt: ["$avgRedemptions.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        expired: stats?.expired || 0,
        totalRedemptions: stats?.totalRedemptions || 0,
        averageRedemptions: Math.round((stats?.averageRedemptions || 0) * 10) / 10,
      };
    };

    // Instance method: Validate coupon for bundle
    this.schema.methods.validateForBundle = function (bundleId, bundlePrice) {
      // Check if coupon is valid
      if (!this.isValid) {
        return { valid: false, message: "Coupon is not valid or has expired" };
      }

      // Check if bundle restriction applies
      if (this.applicable_bundles && this.applicable_bundles.length > 0) {
        const applies = this.applicable_bundles.some(
          (bid) => bid.toString() === bundleId.toString()
        );
        if (!applies) {
          return { valid: false, message: "Coupon does not apply to this bundle" };
        }
      }

      // Check minimum purchase amount
      if (this.min_purchase_amount > 0 && bundlePrice < this.min_purchase_amount) {
        return {
          valid: false,
          message: `Minimum purchase amount of ${this.min_purchase_amount} required`,
        };
      }

      return { valid: true, message: "Coupon is valid" };
    };

    // Instance method: Calculate discount
    this.schema.methods.calculateDiscount = function (bundlePrice, bundleVotes) {
      let discountAmount = 0;
      let bonusVotes = 0;
      let finalPrice = bundlePrice;
      let finalVotes = bundleVotes;

      switch (this.discount_type) {
        case DISCOUNT_TYPE.PERCENTAGE:
          discountAmount = (bundlePrice * this.discount_value) / 100;
          if (this.max_discount_amount && discountAmount > this.max_discount_amount) {
            discountAmount = this.max_discount_amount;
          }
          finalPrice = bundlePrice - discountAmount;
          break;

        case DISCOUNT_TYPE.FIXED_AMOUNT:
          discountAmount = Math.min(this.discount_value, bundlePrice);
          finalPrice = bundlePrice - discountAmount;
          break;

        case DISCOUNT_TYPE.BONUS_VOTES:
          bonusVotes = this.discount_value;
          finalVotes = bundleVotes + bonusVotes;
          break;

        case DISCOUNT_TYPE.FREE_BUNDLE:
          discountAmount = bundlePrice;
          finalPrice = 0;
          break;

        default:
          break;
      }

      return {
        originalPrice: bundlePrice,
        discountAmount: Math.round(discountAmount * 100) / 100,
        finalPrice: Math.max(0, Math.round(finalPrice * 100) / 100),
        originalVotes: bundleVotes,
        bonusVotes,
        finalVotes,
      };
    };

    // Instance method: Redeem coupon
    this.schema.methods.redeem = async function () {
      if (!this.isValid) {
        throw new Error("Coupon is not valid or has expired");
      }

      this.current_redemptions += 1;

      // Auto-expire if max uses reached
      if (this.max_total_uses && this.current_redemptions >= this.max_total_uses) {
        this.status = STATUS.EXPIRED;
      }

      return await this.save();
    };

    // Instance method: Check if user can use coupon
    this.schema.methods.canUserRedeem = async function (userIdentifier) {
      // For anonymous voting, check redemptions by session/device
      // This would need to be implemented in the service layer
      // with session tracking or device fingerprinting
      return this.current_redemptions < (this.max_total_uses || Infinity);
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Coupon().getModel("Coupon");