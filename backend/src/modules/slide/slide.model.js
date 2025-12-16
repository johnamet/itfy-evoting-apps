/**
 * The Slide model definition for frontend hero/banner sections
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model";
import {
  SLIDE_STATUS,
  SLIDE_TYPE,
  SLIDE_POSITION,
  ANIMATION_TYPE,
  BUTTON_STYLE,
} from "../../utils/constants/slide.constants";

class Slide extends BaseModel {
  constructor() {
    const schemaDefinition = {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      subtitle: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      slide_type: {
        type: String,
        enum: Object.values(SLIDE_TYPE),
        default: SLIDE_TYPE.HERO,
        index: true,
      },
      status: {
        type: String,
        enum: Object.values(SLIDE_STATUS),
        default: SLIDE_STATUS.DRAFT,
        index: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: null,
        index: true,
      },
      image: {
        type: {
          url: {
            type: String,
            required: true,
          },
          alt: {
            type: String,
            default: "",
          },
          public_id: {
            type: String,
          },
        },
        required: true,
      },
      mobile_image: {
        type: {
          url: {
            type: String,
          },
          alt: {
            type: String,
            default: "",
          },
          public_id: {
            type: String,
          },
        },
        default: null,
      },
      background_color: {
        type: String,
        default: null,
      },
      text_color: {
        type: String,
        default: "#ffffff",
      },
      overlay_opacity: {
        type: Number,
        min: 0,
        max: 100,
        default: 40,
      },
      button: {
        type: {
          text: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          style: {
            type: String,
            enum: Object.values(BUTTON_STYLE),
            default: BUTTON_STYLE.PRIMARY,
          },
          opens_in_new_tab: {
            type: Boolean,
            default: false,
          },
        },
        default: null,
      },
      secondary_button: {
        type: {
          text: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          style: {
            type: String,
            enum: Object.values(BUTTON_STYLE),
            default: BUTTON_STYLE.SECONDARY,
          },
          opens_in_new_tab: {
            type: Boolean,
            default: false,
          },
        },
        default: null,
      },
      position: {
        type: String,
        enum: Object.values(SLIDE_POSITION),
        default: SLIDE_POSITION.MIDDLE,
      },
      animation: {
        type: String,
        enum: Object.values(ANIMATION_TYPE),
        default: ANIMATION_TYPE.FADE,
      },
      animation_duration: {
        type: Number,
        min: 0,
        max: 10000,
        default: 5000,
      },
      display_order: {
        type: Number,
        default: 0,
        index: true,
      },
      start_date: {
        type: Date,
        default: null,
      },
      end_date: {
        type: Date,
        default: null,
      },
      is_published: {
        type: Boolean,
        default: false,
        index: true,
      },
      view_count: {
        type: Number,
        default: 0,
        min: 0,
      },
      click_count: {
        type: Number,
        default: 0,
        min: 0,
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
    this.schema.index({ slide_type: 1, status: 1, is_published: 1 });
    this.schema.index({ event: 1, is_published: 1 });
    this.schema.index({ display_order: 1 });
    this.schema.index({ start_date: 1, end_date: 1 });
    this.schema.index({ created_at: -1 });

    // Virtual: Is active
    this.schema.virtual("isActive").get(function () {
      if (!this.is_published) return false;
      if (this.status !== SLIDE_STATUS.ACTIVE) return false;

      const now = new Date();

      // Check if slide is within active date range
      if (this.start_date && now < this.start_date) return false;
      if (this.end_date && now > this.end_date) return false;

      return true;
    });

    // Virtual: Is scheduled
    this.schema.virtual("isScheduled").get(function () {
      if (!this.start_date) return false;
      const now = new Date();
      return this.status === SLIDE_STATUS.SCHEDULED && now < this.start_date;
    });

    // Virtual: Is expired
    this.schema.virtual("isExpired").get(function () {
      if (!this.end_date) return false;
      const now = new Date();
      return now > this.end_date;
    });

    // Virtual: Click-through rate
    this.schema.virtual("clickThroughRate").get(function () {
      if (this.view_count === 0) return 0;
      return Math.round((this.click_count / this.view_count) * 10000) / 100;
    });

    // Virtual: Days until start
    this.schema.virtual("daysUntilStart").get(function () {
      if (!this.start_date) return null;
      const now = new Date();
      if (now >= this.start_date) return 0;
      return Math.ceil((this.start_date - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Days until end
    this.schema.virtual("daysUntilEnd").get(function () {
      if (!this.end_date) return null;
      const now = new Date();
      if (now >= this.end_date) return 0;
      return Math.ceil((this.end_date - now) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find active slides
    this.schema.statics.findActive = async function (slideType = null, options = {}) {
      const now = new Date();
      const filter = {
        is_published: true,
        status: SLIDE_STATUS.ACTIVE,
        $or: [
          { start_date: null, end_date: null },
          { start_date: { $lte: now }, end_date: { $gte: now } },
          { start_date: null, end_date: { $gte: now } },
          { start_date: { $lte: now }, end_date: null },
        ],
      };

      if (slideType) filter.slide_type = slideType;

      const query = this.find(filter).sort({ display_order: 1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId, is_published: true }).sort({
        display_order: 1,
      });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find scheduled slides
    this.schema.statics.findScheduled = async function (options = {}) {
      const now = new Date();
      const query = this.find({
        status: SLIDE_STATUS.SCHEDULED,
        start_date: { $gt: now },
      }).sort({ start_date: 1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Get statistics
    this.schema.statics.getStatistics = async function (slideType = null) {
      const matchStage = slideType ? { slide_type: slideType } : {};

      const [stats] = await this.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: SLIDE_STATUS.ACTIVE } }, { $count: "count" }],
            inactive: [{ $match: { status: SLIDE_STATUS.INACTIVE } }, { $count: "count" }],
            draft: [{ $match: { status: SLIDE_STATUS.DRAFT } }, { $count: "count" }],
            scheduled: [{ $match: { status: SLIDE_STATUS.SCHEDULED } }, { $count: "count" }],
            published: [{ $match: { is_published: true } }, { $count: "count" }],
            totalViews: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$view_count" },
                },
              },
            ],
            totalClicks: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$click_count" },
                },
              },
            ],
            byType: [
              {
                $group: {
                  _id: "$slide_type",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
          },
        },
      ]);

      const totalViews = stats?.totalViews[0]?.total || 0;
      const totalClicks = stats?.totalClicks[0]?.total || 0;

      return {
        total: stats?.total[0]?.count || 0,
        active: stats?.active[0]?.count || 0,
        inactive: stats?.inactive[0]?.count || 0,
        draft: stats?.draft[0]?.count || 0,
        scheduled: stats?.scheduled[0]?.count || 0,
        published: stats?.published[0]?.count || 0,
        totalViews,
        totalClicks,
        averageCTR: totalViews > 0 ? Math.round((totalClicks / totalViews) * 10000) / 100 : 0,
        byType: stats?.byType || [],
      };
    };

    // Instance method: Increment view count
    this.schema.methods.incrementViews = async function (count = 1) {
      this.view_count += count;
      return await this.save();
    };

    // Instance method: Increment click count
    this.schema.methods.incrementClicks = async function (count = 1) {
      this.click_count += count;
      return await this.save();
    };

    // Instance method: Publish slide
    this.schema.methods.publish = async function () {
      this.is_published = true;
      if (this.status === SLIDE_STATUS.DRAFT) {
        this.status = SLIDE_STATUS.ACTIVE;
      }
      return await this.save();
    };

    // Instance method: Unpublish slide
    this.schema.methods.unpublish = async function () {
      this.is_published = false;
      return await this.save();
    };

    // Instance method: Activate slide
    this.schema.methods.activate = async function () {
      this.status = SLIDE_STATUS.ACTIVE;
      return await this.save();
    };

    // Instance method: Deactivate slide
    this.schema.methods.deactivate = async function () {
      this.status = SLIDE_STATUS.INACTIVE;
      return await this.save();
    };

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Auto-publish scheduled slides that have reached their start date
        if (
          this.status === SLIDE_STATUS.SCHEDULED &&
          this.start_date &&
          new Date() >= this.start_date
        ) {
          this.status = SLIDE_STATUS.ACTIVE;
        }

        // Auto-deactivate slides that have passed their end date
        if (
          this.status === SLIDE_STATUS.ACTIVE &&
          this.end_date &&
          new Date() > this.end_date
        ) {
          this.status = SLIDE_STATUS.INACTIVE;
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Slide().getModel("Slide");
