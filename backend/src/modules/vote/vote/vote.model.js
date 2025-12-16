/**
 * The vote model definition for the vote module
 */

import mongoose from "mongoose";
import { BaseModel } from "../../shared/base.model.js";
import { VOTE_STATUS as STATUS } from "../../../utils/constants/vote.constants.js";

class Vote extends BaseModel {
  constructor() {
    const schemaDefinition = {
      candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true,
        index: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true,
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true,
      },
      payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
        index: true,
      },
      vote_code: {
        type: String,
        required: true,
        index: true,
        trim: true,
      },
      status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE,
        index: true,
      },
      ip_hash: {
        type: String,
        required: false,
        index: true,
      },
      user_agent: {
        type: String,
        required: false,
      },
      metadata: {
        type: Map,
        of: String,
        default: {},
      },
      cast_at: {
        type: Date,
        default: Date.now,
        index: true,
      },
      refunded_at: {
        type: Date,
        default: null,
      },
      refund_reason: {
        type: String,
        trim: true,
      },
    };

    const options = {
      softDelete: true,
      timestamps: true,
    };

    super(schemaDefinition, options);

    // Create compound indexes for common queries
    this.schema.index({ event: 1, candidate: 1 });
    this.schema.index({ event: 1, category: 1 });
    this.schema.index({ candidate: 1, status: 1 });
    this.schema.index({ payment: 1, status: 1 });
    this.schema.index({ vote_code: 1, candidate: 1 });
    this.schema.index({ cast_at: -1 });

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Validate that voting is open for this category
        const Category = mongoose.model("Category");
        const category = await Category.findById(this.category);

        if (!category) {
          throw new Error("Category not found");
        }

        if (!category.is_voting_open) {
          throw new Error("Voting is not open for this category");
        }

        // Validate that candidate can receive votes
        const Candidate = mongoose.model("Candidate");
        const candidate = await Candidate.findById(this.candidate);

        if (!candidate) {
          throw new Error("Candidate not found");
        }

        if (!candidate.canReceiveVotes) {
          throw new Error("Candidate cannot receive votes");
        }

        // Validate candidate belongs to the category
        if (!candidate.categories.includes(this.category.toString())) {
          throw new Error("Candidate does not belong to this category");
        }

        // Set refunded_at when status changes to refunded
        if (this.isModified("status") && this.status === STATUS.REFUNDED && !this.refunded_at) {
          this.refunded_at = new Date();
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Post-save hook to increment candidate vote count
    this.schema.post("save", async function (doc) {
      try {
        if (doc.status === STATUS.ACTIVE) {
          const Candidate = mongoose.model("Candidate");
          await Candidate.findByIdAndUpdate(doc.candidate, {
            $inc: { vote_count: 1 },
          });

          const Category = mongoose.model("Category");
          await Category.findByIdAndUpdate(doc.category, {
            $inc: { total_votes: 1 },
          });
        }
      } catch (error) {
        console.error("Error incrementing vote count:", error);
      }
    });

    // Virtual: Is active
    this.schema.virtual("isActive").get(function () {
      return this.status === STATUS.ACTIVE;
    });

    // Virtual: Is refunded
    this.schema.virtual("isRefunded").get(function () {
      return this.status === STATUS.REFUNDED;
    });

    // Virtual: Days since cast
    this.schema.virtual("daysSinceCast").get(function () {
      if (!this.cast_at) return 0;
      const now = new Date();
      return Math.floor((now - this.cast_at) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find votes by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId, status: STATUS.ACTIVE }).sort({ cast_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find votes by candidate
    this.schema.statics.findByCandidate = async function (candidateId, options = {}) {
      const query = this.find({ candidate: candidateId, status: STATUS.ACTIVE }).sort({
        cast_at: -1,
      });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find votes by category
    this.schema.statics.findByCategory = async function (categoryId, options = {}) {
      const query = this.find({ category: categoryId, status: STATUS.ACTIVE }).sort({
        cast_at: -1,
      });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find votes by payment
    this.schema.statics.findByPayment = async function (paymentId, options = {}) {
      const query = this.find({ payment: paymentId }).sort({ cast_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find votes by vote code
    this.schema.statics.findByVoteCode = async function (voteCode, options = {}) {
      const query = this.find({ vote_code: voteCode }).sort({ cast_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Count votes for candidate
    this.schema.statics.countForCandidate = async function (candidateId) {
      return await this.countDocuments({ candidate: candidateId, status: STATUS.ACTIVE }).exec();
    };

    // Static method: Get vote statistics for event
    this.schema.statics.getEventStatistics = async function (eventId) {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            refunded: [{ $match: { status: STATUS.REFUNDED } }, { $count: "count" }],
            byDate: [
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$cast_at" },
                  },
                  count: { $sum: 1 },
                },
              },
              { $sort: { _id: 1 } },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        active: stats?.active[0]?.count || 0,
        refunded: stats?.refunded[0]?.count || 0,
        byDate: stats?.byDate || [],
      };
    };

    // Instance method: Refund vote
    this.schema.methods.refund = async function (reason) {
      if (this.status === STATUS.REFUNDED) {
        throw new Error("Vote is already refunded");
      }

      // Decrement candidate vote count
      const Candidate = mongoose.model("Candidate");
      await Candidate.findByIdAndUpdate(this.candidate, {
        $inc: { vote_count: -1 },
      });

      // Decrement category vote count
      const Category = mongoose.model("Category");
      await Category.findByIdAndUpdate(this.category, {
        $inc: { total_votes: -1 },
      });

      this.status = STATUS.REFUNDED;
      this.refunded_at = new Date();
      this.refund_reason = reason;

      return await this.save();
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Vote().getModel("Vote");