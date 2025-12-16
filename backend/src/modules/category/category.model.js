/**
 * The category model definition for the category module
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model";
import { STATUS, RESULTS_VISIBILITY } from "../../utils/constants/category.constants";

class Category extends BaseModel {
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
      icon: {
        type: String,
        default: null,
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
      candidates: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Candidate",
        default: [],
      },
      status: {
        type: String,
        required: true,
        default: STATUS.ACTIVE,
        enum: Object.values(STATUS),
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },
      is_voting_open: {
        type: Boolean,
        default: false,
        index: true,
      },
      voting_start_date: {
        type: Date,
        default: null,
      },
      voting_deadline: {
        type: Date,
        default: null,
      },
      total_votes: {
        type: Number,
        default: 0,
        min: 0,
      },
      min_candidates: {
        type: Number,
        default: 2,
        min: 1,
      },
      max_candidates: {
        type: Number,
        default: null,
        min: 1,
      },
      display_order: {
        type: Number,
        default: 0,
      },
      is_featured: {
        type: Boolean,
        default: false,
        index: true,
      },
      voting_rules: {
        type: String,
        trim: true,
      },
      allow_write_in: {
        type: Boolean,
        default: false,
      },
      require_authentication: {
        type: Boolean,
        default: true,
      },
      results_visibility: {
        type: String,
        enum: Object.values(RESULTS_VISIBILITY),
        default: RESULTS_VISIBILITY.PUBLIC,
      },
      show_results_before_deadline: {
        type: Boolean,
        default: false,
      },
      color_theme: {
        type: String,
        default: null,
      },
      image: {
        type: String,
        default: null,
      },
      nomination_form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
        default: null,
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
    this.schema.index({ event: 1, name: 1 });
    this.schema.index({ event: 1, is_voting_open: 1 });
    this.schema.index({ slug: 1 }, { unique: true, sparse: true });
    this.schema.index({ display_order: 1 });

    // Pre-save hook for validation and auto-management
    this.schema.pre("save", async function (next) {
      try {
        const now = new Date();

        // Generate slug from name if not provided
        if (!this.slug && this.name) {
          this.slug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        }

        // Validate voting dates
        if (this.voting_start_date && this.voting_deadline) {
          if (this.voting_deadline <= this.voting_start_date) {
            throw new Error("Voting deadline must be after voting start date");
          }
        }

        // Auto-manage voting status based on dates
        if (this.voting_start_date && this.voting_deadline) {
          const votingHasStarted = this.voting_start_date <= now;
          const votingHasEnded = this.voting_deadline <= now;

          if (votingHasEnded) {
            // Voting has ended
            this.is_voting_open = false;
            if (this.status !== STATUS.ARCHIVED) {
              this.status = STATUS.CLOSED;
            }
          } else if (votingHasStarted && !votingHasEnded) {
            // Voting is currently open
            if (this.status === STATUS.ACTIVE) {
              this.is_voting_open = true;
            }
          } else {
            // Voting hasn't started yet
            this.is_voting_open = false;
          }
        }

        // Validate is_voting_open can only be true if status is ACTIVE
        if (this.is_voting_open && this.status !== STATUS.ACTIVE) {
          throw new Error("Voting can only be open when category status is ACTIVE");
        }

        // Validate voting_deadline is set if is_voting_open is true
        if (this.is_voting_open && !this.voting_deadline) {
          throw new Error("Voting deadline is required when voting is open");
        }

        // Validate candidate count constraints
        if (this.max_candidates && this.min_candidates) {
          if (this.max_candidates < this.min_candidates) {
            throw new Error("Maximum candidates cannot be less than minimum candidates");
          }
        }

        // Validate candidate count against constraints
        if (this.candidates && this.candidates.length > 0) {
          if (this.candidates.length < this.min_candidates) {
            throw new Error(`Category must have at least ${this.min_candidates} candidate(s)`);
          }
          if (this.max_candidates && this.candidates.length > this.max_candidates) {
            throw new Error(`Category cannot have more than ${this.max_candidates} candidates`);
          }
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Check if voting is currently active
    this.schema.virtual("isVotingActive").get(function () {
      if (!this.is_voting_open) return false;
      if (!this.voting_deadline) return this.is_voting_open;
      const now = new Date();
      return this.is_voting_open && this.voting_deadline > now;
    });

    // Virtual: Check if voting has ended
    this.schema.virtual("hasVotingEnded").get(function () {
      if (!this.voting_deadline) return false;
      const now = new Date();
      return this.voting_deadline <= now;
    });

    // Virtual: Check if voting hasn't started yet
    this.schema.virtual("isVotingUpcoming").get(function () {
      if (!this.voting_start_date) return false;
      const now = new Date();
      return this.voting_start_date > now;
    });

    // Virtual: Days until voting starts
    this.schema.virtual("daysUntilVotingStarts").get(function () {
      if (!this.voting_start_date) return null;
      const now = new Date();
      if (this.voting_start_date <= now) return 0;
      return Math.ceil((this.voting_start_date - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Days until voting deadline
    this.schema.virtual("daysUntilDeadline").get(function () {
      if (!this.voting_deadline) return null;
      const now = new Date();
      if (this.voting_deadline <= now) return 0;
      return Math.ceil((this.voting_deadline - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Hours until voting deadline
    this.schema.virtual("hoursUntilDeadline").get(function () {
      if (!this.voting_deadline) return null;
      const now = new Date();
      if (this.voting_deadline <= now) return 0;
      return Math.ceil((this.voting_deadline - now) / (1000 * 60 * 60));
    });

    // Virtual: Voting duration in days
    this.schema.virtual("votingDurationInDays").get(function () {
      if (!this.voting_start_date || !this.voting_deadline) return null;
      return Math.ceil((this.voting_deadline - this.voting_start_date) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Candidate count
    this.schema.virtual("candidateCount").get(function () {
      return this.candidates ? this.candidates.length : 0;
    });

    // Virtual: Check if category has enough candidates
    this.schema.virtual("hasMinimumCandidates").get(function () {
      const count = this.candidates ? this.candidates.length : 0;
      return count >= this.min_candidates;
    });

    // Virtual: Check if category is at max candidates
    this.schema.virtual("isAtMaxCandidates").get(function () {
      if (!this.max_candidates) return false;
      const count = this.candidates ? this.candidates.length : 0;
      return count >= this.max_candidates;
    });

    // Virtual: Remaining candidate slots
    this.schema.virtual("remainingCandidateSlots").get(function () {
      if (!this.max_candidates) return null;
      const count = this.candidates ? this.candidates.length : 0;
      return Math.max(0, this.max_candidates - count);
    });

    // Virtual: Check if results can be viewed
    this.schema.virtual("canViewResults").get(function () {
      if (this.results_visibility === "public") return true;
      if (this.show_results_before_deadline) return true;
      return this.hasVotingEnded;
    });

    // Virtual: Average votes per candidate
    this.schema.virtual("averageVotesPerCandidate").get(function () {
      const count = this.candidates ? this.candidates.length : 0;
      if (count === 0) return 0;
      return Math.round(this.total_votes / count);
    });

    // Static method: Find categories by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ display_order: 1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find active voting categories
    this.schema.statics.findActiveVoting = async function (eventId = null) {
      const now = new Date();
      const filter = {
        is_voting_open: true,
        status: STATUS.ACTIVE,
        voting_deadline: { $gt: now },
      };
      if (eventId) filter.event = eventId;
      
      return await this.find(filter).sort({ voting_deadline: 1 }).exec();
    };

    // Static method: Find upcoming voting categories
    this.schema.statics.findUpcomingVoting = async function (eventId = null) {
      const now = new Date();
      const filter = {
        voting_start_date: { $gt: now },
        status: STATUS.ACTIVE,
      };
      if (eventId) filter.event = eventId;
      
      return await this.find(filter).sort({ voting_start_date: 1 }).exec();
    };

    // Static method: Find closed voting categories
    this.schema.statics.findClosedVoting = async function (eventId = null) {
      const now = new Date();
      const filter = {
        $or: [
          { voting_deadline: { $lte: now } },
          { status: STATUS.CLOSED },
        ],
      };
      if (eventId) filter.event = eventId;
      
      return await this.find(filter).sort({ voting_deadline: -1 }).exec();
    };

    // Instance method: Open voting
    this.schema.methods.openVoting = async function () {
      if (!this.voting_deadline) {
        throw new Error("Voting deadline must be set before opening voting");
      }
      if (!this.hasMinimumCandidates) {
        throw new Error(`Category must have at least ${this.min_candidates} candidate(s) to open voting`);
      }
      if (this.status !== STATUS.ACTIVE) {
        throw new Error("Category must be active to open voting");
      }
      
      const now = new Date();
      if (this.voting_deadline <= now) {
        throw new Error("Voting deadline has already passed");
      }

      this.is_voting_open = true;
      if (!this.voting_start_date) {
        this.voting_start_date = now;
      }
      return await this.save();
    };

    // Instance method: Close voting
    this.schema.methods.closeVoting = async function () {
      this.is_voting_open = false;
      this.status = STATUS.CLOSED;
      return await this.save();
    };

    // Instance method: Add candidate
    this.schema.methods.addCandidate = async function (candidateId) {
      if (this.isAtMaxCandidates) {
        throw new Error(`Category has reached maximum of ${this.max_candidates} candidates`);
      }
      if (this.candidates.includes(candidateId)) {
        throw new Error("Candidate already exists in this category");
      }
      
      this.candidates.push(candidateId);
      return await this.save();
    };

    // Instance method: Remove candidate
    this.schema.methods.removeCandidate = async function (candidateId) {
      if (this.is_voting_open) {
        throw new Error("Cannot remove candidates while voting is open");
      }
      
      const index = this.candidates.indexOf(candidateId);
      if (index === -1) {
        throw new Error("Candidate not found in this category");
      }
      
      this.candidates.splice(index, 1);
      return await this.save();
    };

    // Instance method: Increment total votes
    this.schema.methods.incrementVotes = async function (count = 1) {
      this.total_votes += count;
      return await this.save();
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Category().getModel("Category");