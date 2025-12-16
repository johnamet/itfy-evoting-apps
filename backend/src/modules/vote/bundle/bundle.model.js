/**
 * The bundle model definition for the vote module
 */

import mongoose from "mongoose";
import { BaseModel } from "../../shared/base.model.js";
import { BUNDLE_STATUS as STATUS} from "../../../utils/constants/vote.constants.js";
import { CURRENCY } from "../../../utils/constants/event.constants.js";

class Bundle extends BaseModel {
  constructor() {
    const schemaDefinition = {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true,
      },
      categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      vote_count: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        default: CURRENCY.GHS,
        uppercase: true,
        enum: Object.values(CURRENCY),
      },
      discount_percentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      original_price: {
        type: Number,
        required: false,
        min: 0,
      },
      is_featured: {
        type: Boolean,
        default: false,
        index: true,
      },
      is_popular: {
        type: Boolean,
        default: false,
        index: true,
      },
      display_order: {
        type: Number,
        default: 0,
      },
      status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE,
        index: true,
      },
      validity_start: {
        type: Date,
        default: null,
      },
      validity_end: {
        type: Date,
        default: null,
      },
      total_purchases: {
        type: Number,
        default: 0,
        min: 0,
      },
      total_revenue: {
        type: Number,
        default: 0,
        min: 0,
      },
      icon: {
        type: String,
        default: null,
      },
      color_theme: {
        type: String,
        default: null,
      },
      features: {
        type: [String],
        default: [],
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
    this.schema.index({ event: 1, is_featured: 1 });
    this.schema.index({ slug: 1 }, { unique: true, sparse: true });
    this.schema.index({ display_order: 1 });
    this.schema.index({ price: 1 });

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Generate slug if not provided
        if (!this.slug && this.name) {
          const baseSlug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

          this.slug = `${baseSlug}-${this.event.toString().slice(-6)}`;
        }

        // Calculate original price if discount is applied
        if (this.discount_percentage > 0 && !this.original_price) {
          this.original_price = this.price / (1 - this.discount_percentage / 100);
        }

        // Validate validity dates
        if (this.validity_start && this.validity_end) {
          if (this.validity_end <= this.validity_start) {
            throw new Error("Validity end date must be after start date");
          }
        }

        // Validate categories belong to the event
        if (this.categories && this.categories.length > 0) {
          const Category = mongoose.model("Category");
          const categories = await Category.find({
            _id: { $in: this.categories },
          });

          for (const category of categories) {
            if (category.event.toString() !== this.event.toString()) {
              throw new Error("All categories must belong to the bundle's event");
            }
          }
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Is valid (within validity period)
    this.schema.virtual("isValid").get(function () {
      if (!this.validity_start && !this.validity_end) return true;

      const now = new Date();

      if (this.validity_start && now < this.validity_start) return false;
      if (this.validity_end && now > this.validity_end) return false;

      return true;
    });

    // Virtual: Is available (active and valid)
    this.schema.virtual("isAvailable").get(function () {
      return this.status === STATUS.ACTIVE && this.isValid;
    });

    // Virtual: Price per vote
    this.schema.virtual("pricePerVote").get(function () {
      return this.vote_count > 0 ? this.price / this.vote_count : 0;
    });

    // Virtual: Savings amount
    this.schema.virtual("savingsAmount").get(function () {
      if (!this.original_price) return 0;
      return this.original_price - this.price;
    });

    // Virtual: Is restricted (category-specific)
    this.schema.virtual("isRestricted").get(function () {
      return this.categories && this.categories.length > 0;
    });

    // Virtual: Days until expiry
    this.schema.virtual("daysUntilExpiry").get(function () {
      if (!this.validity_end) return null;
      const now = new Date();
      if (this.validity_end <= now) return 0;
      return Math.ceil((this.validity_end - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Average revenue per purchase
    this.schema.virtual("averageRevenuePerPurchase").get(function () {
      if (this.total_purchases === 0) return 0;
      return this.total_revenue / this.total_purchases;
    });

    // Static method: Find bundles by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ display_order: 1, price: 1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find available bundles for event
    this.schema.statics.findAvailableByEvent = async function (eventId, options = {}) {
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
      }).sort({ display_order: 1, price: 1 });

      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find featured bundles
    this.schema.statics.findFeatured = async function (eventId = null, options = {}) {
      const filter = { is_featured: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ display_order: 1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find popular bundles
    this.schema.statics.findPopular = async function (eventId = null, options = {}) {
      const filter = { is_popular: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ total_purchases: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find bundle by slug
    this.schema.statics.findBySlug = async function (slug, options = {}) {
      const query = this.findOne({ slug });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find bundles for category
    this.schema.statics.findByCategory = async function (categoryId, options = {}) {
      const query = this.find({
        $or: [{ categories: categoryId }, { categories: { $size: 0 } }],
        status: STATUS.ACTIVE,
      }).sort({ display_order: 1, price: 1 });

      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Get bundle statistics
    this.schema.statics.getStatistics = async function (eventId = null) {
      const matchStage = eventId ? { event: eventId } : {};

      const [stats] = await this.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            totalRevenue: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_revenue" },
                },
              },
            ],
            totalPurchases: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_purchases" },
                },
              },
            ],
            avgPrice: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$price" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            totalRevenue: { $arrayElemAt: ["$totalRevenue.total", 0] },
            totalPurchases: { $arrayElemAt: ["$totalPurchases.total", 0] },
            averagePrice: { $arrayElemAt: ["$avgPrice.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        totalRevenue: stats?.totalRevenue || 0,
        totalPurchases: stats?.totalPurchases || 0,
        averagePrice: Math.round((stats?.averagePrice || 0) * 100) / 100,
      };
    };

    // Instance method: Record purchase
    this.schema.methods.recordPurchase = async function (amount) {
      this.total_purchases += 1;
      this.total_revenue += amount;
      return await this.save();
    };

    // Instance method: Check if bundle applies to category
    this.schema.methods.appliesToCategory = function (categoryId) {
      // If no categories specified, applies to all
      if (!this.categories || this.categories.length === 0) return true;

      // Otherwise, check if category is in the list
      return this.categories.some((cat) => cat.toString() === categoryId.toString());
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Bundle().getModel("Bundle");