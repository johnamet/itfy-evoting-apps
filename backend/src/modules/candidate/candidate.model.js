/**
 * The candidate model definition for the candidate module
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model";
import { STATUS } from "../../utils/constants/candidate.constants";

class Candidate extends BaseModel {
  constructor() {
    const schemaDefinition = {
      first_name: {
        type: String,
        required: true,
        trim: true,
      },
      last_name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      password_hash: {
        type: String,
        required: true,
        select: false, // Don't include in queries by default
      },
      candidate_code: {
        type: String,
        unique: true,
        uppercase: true,
        index: true,
      },
      phone_number: {
        type: String,
        required: false,
        trim: true,
      },
      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },
      bio: {
        type: String,
        trim: true,
      },
      profile_image: {
        type: String,
        default: null,
      },
      cover_image: {
        type: String,
        default: null,
      },
      gallery: {
        type: [String],
        default: [],
      },
      video_url: {
        type: String,
        trim: true,
      },
      projects: {
        type: [
          {
            title: {
              type: String,
              required: true,
              trim: true,
            },
            description: {
              type: String,
              trim: true,
            },
            url: {
              type: String,
              trim: true,
            },
            image: {
              type: String,
            },
            date: {
              type: Date,
            },
          },
        ],
        default: [],
      },
      skills: {
        type: [String],
        default: [],
      },
      education: {
        type: [
          {
            institution: {
              type: String,
              required: true,
              trim: true,
            },
            qualification: {
              type: String,
              required: true,
              trim: true,
            },
            field: {
              type: String,
              trim: true,
            },
            start_date: {
              type: Date,
            },
            end_date: {
              type: Date,
            },
            current: {
              type: Boolean,
              default: false,
            },
            description: {
              type: String,
              trim: true,
            },
          },
        ],
        default: [],
      },
      experience: {
        type: [
          {
            company: {
              type: String,
              required: true,
              trim: true,
            },
            position: {
              type: String,
              required: true,
              trim: true,
            },
            start_date: {
              type: Date,
            },
            end_date: {
              type: Date,
            },
            current: {
              type: Boolean,
              default: false,
            },
            description: {
              type: String,
              trim: true,
            },
          },
        ],
        default: [],
      },
      achievements: {
        type: [
          {
            title: {
              type: String,
              required: true,
              trim: true,
            },
            description: {
              type: String,
              trim: true,
            },
            date: {
              type: Date,
            },
            organization: {
              type: String,
              trim: true,
            },
          },
        ],
        default: [],
      },
      social_links: {
        type: {
          linkedin: String,
          twitter: String,
          github: String,
          portfolio: String,
          facebook: String,
          instagram: String,
        },
        default: {},
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
          required: true,
        },
      ],
      admin_verified_categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
      ],
      profile_update_history: [
        {
          updated_at: {
            type: Date,
            default: Date.now,
          },
          updated_by_candidate: {
            type: Boolean,
            default: false,
          },
          reason: {
            type: String,
            trim: true,
          },
          fields_changed: {
            type: [String],
            default: [],
          },
          previous_status: {
            type: String,
          },
          new_status: {
            type: String,
          },
        },
      ],
      status: {
        type: String,
        required: true,
        enum: Object.values(STATUS),
        default: STATUS.PENDING,
        index: true,
      },
      is_featured: {
        type: Boolean,
        default: false,
        index: true,
      },
      is_published: {
        type: Boolean,
        default: false,
        index: true,
      },
      display_order: {
        type: Number,
        default: 0,
      },
      vote_count: {
        type: Number,
        default: 0,
        min: 0,
        index: true,
      },
      view_count: {
        type: Number,
        default: 0,
        min: 0,
      },
      why_nominate_me: {
        type: String,
        trim: true,
      },
      impact_statement: {
        type: String,
        trim: true,
      },
      endorsements: {
        type: [
          {
            name: {
              type: String,
              required: true,
              trim: true,
            },
            position: {
              type: String,
              trim: true,
            },
            message: {
              type: String,
              trim: true,
            },
            image: {
              type: String,
            },
          },
        ],
        default: [],
      },
      nomination_date: {
        type: Date,
        default: Date.now,
      },
      approval_date: {
        type: Date,
        default: null,
      },
      rejection_reason: {
        type: String,
        trim: true,
      },
      tags: {
        type: [String],
        default: [],
      },
      metadata: {
        type: Map,
        of: String,
        default: {},
      },
      nomination_submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FormSubmission",
        default: null,
      },
      profile_completed_at: {
        type: Date,
        default: null,
      },
      published_at: {
        type: Date,
        default: null,
      },
      last_login: {
        type: Date,
        default: null,
      },
      password_reset_token: {
        type: String,
        select: false,
      },
      password_reset_expires: {
        type: Date,
        select: false,
      },
      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null, // Nullable for candidates created from public nominations
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
    this.schema.index({ event: 1, categories: 1 });
    this.schema.index({ event: 1, status: 1 });
    this.schema.index({ event: 1, is_published: 1 });
    this.schema.index({ slug: 1 }, { unique: true, sparse: true });
    this.schema.index({ email: 1, event: 1 }, { unique: true });
    this.schema.index({ first_name: 1, last_name: 1 });
    this.schema.index({ vote_count: -1 });
    this.schema.index({ tags: 1 });

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Generate candidate code if not provided
        if (!this.candidate_code && this.event) {
          const CandidateModel = this.constructor;
          const count = await CandidateModel.countDocuments({ event: this.event });
          const eventIdShort = this.event.toString().slice(-4).toUpperCase();
          this.candidate_code = `CAN-${eventIdShort}-${String(count + 1).padStart(4, "0")}`;
        }

        // Generate slug if not provided
        if (!this.slug && this.first_name && this.last_name) {
          const baseSlug = `${this.first_name}-${this.last_name}`
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
          
          // Add event ID to make slug unique per event
          this.slug = `${baseSlug}-${this.event.toString().slice(-6)}`;
        }

        // Set approval date when status changes to approved
        if (this.isModified("status") && this.status === STATUS.APPROVED && !this.approval_date) {
          this.approval_date = new Date();
          // Sync admin-verified categories on first approval
          if (!this.admin_verified_categories || this.admin_verified_categories.length === 0) {
            this.admin_verified_categories = [...this.categories];
          }
        }

        // Clear rejection reason if status is not rejected
        if (this.isModified("status") && this.status !== STATUS.REJECTED) {
          this.rejection_reason = null;
        }

        // Prevent removal of admin-verified categories
        if (this.isModified("categories") && this.admin_verified_categories && this.admin_verified_categories.length > 0) {
          const adminCategoryIds = this.admin_verified_categories.map(cat => cat.toString());
          const currentCategoryIds = this.categories.map(cat => cat.toString());
          
          // Check if any admin-verified category was removed
          const removedAdminCategories = adminCategoryIds.filter(id => !currentCategoryIds.includes(id));
          
          if (removedAdminCategories.length > 0) {
            // Re-add admin-verified categories
            const uniqueCategories = [...new Set([...this.categories, ...this.admin_verified_categories])];
            this.categories = uniqueCategories;
          }
        }

        // Validate that candidate has at least one category
        if (this.categories.length === 0) {
          throw new Error("Candidate must belong to at least one category");
        }

        // Validate education dates
        if (this.education && this.education.length > 0) {
          for (const edu of this.education) {
            if (edu.start_date && edu.end_date && !edu.current) {
              if (edu.end_date <= edu.start_date) {
                throw new Error("Education end date must be after start date");
              }
            }
          }
        }

        // Validate experience dates
        if (this.experience && this.experience.length > 0) {
          for (const exp of this.experience) {
            if (exp.start_date && exp.end_date && !exp.current) {
              if (exp.end_date <= exp.start_date) {
                throw new Error("Experience end date must be after start date");
              }
            }
          }
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Full name
    this.schema.virtual("full_name").get(function () {
      return `${this.first_name} ${this.last_name}`;
    });

    // Virtual: Initials
    this.schema.virtual("initials").get(function () {
      return `${this.first_name[0]}${this.last_name[0]}`.toUpperCase();
    });

    // Virtual: Is approved
    this.schema.virtual("isApproved").get(function () {
      return this.status === STATUS.APPROVED;
    });

    // Virtual: Is pending
    this.schema.virtual("isPending").get(function () {
      return this.status === STATUS.PENDING;
    });

    // Virtual: Is rejected
    this.schema.virtual("isRejected").get(function () {
      return this.status === STATUS.REJECTED;
    });

    // Virtual: Can receive votes
    this.schema.virtual("canReceiveVotes").get(function () {
      return this.status === STATUS.APPROVED && this.is_published;
    });

    // Virtual: Profile completion percentage
    this.schema.virtual("profileCompleteness").get(function () {
      let completed = 0;
      let total = 0;

      // Required fields (always count)
      total += 5;
      if (this.first_name) completed++;
      if (this.last_name) completed++;
      if (this.email) completed++;
      if (this.bio) completed++;
      if (this.profile_image) completed++;

      // Optional but recommended fields
      total += 8;
      if (this.phone_number) completed++;
      if (this.why_nominate_me) completed++;
      if (this.impact_statement) completed++;
      if (this.skills && this.skills.length > 0) completed++;
      if (this.projects && this.projects.length > 0) completed++;
      if (this.education && this.education.length > 0) completed++;
      if (this.experience && this.experience.length > 0) completed++;
      if (this.achievements && this.achievements.length > 0) completed++;

      return Math.round((completed / total) * 100);
    });

    // Virtual: Years of experience
    this.schema.virtual("yearsOfExperience").get(function () {
      if (!this.experience || this.experience.length === 0) return 0;

      let totalMonths = 0;
      const now = new Date();

      for (const exp of this.experience) {
        if (exp.start_date) {
          const endDate = exp.current ? now : exp.end_date || now;
          const months = (endDate - exp.start_date) / (1000 * 60 * 60 * 24 * 30);
          totalMonths += months;
        }
      }

      return Math.round((totalMonths / 12) * 10) / 10;
    });

    // Virtual: Current position
    this.schema.virtual("currentPosition").get(function () {
      if (!this.experience || this.experience.length === 0) return null;
      const current = this.experience.find((exp) => exp.current);
      return current ? `${current.position} at ${current.company}` : null;
    });

    // Virtual: Days since nomination
    this.schema.virtual("daysSinceNomination").get(function () {
      if (!this.nomination_date) return 0;
      const now = new Date();
      return Math.floor((now - this.nomination_date) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Has social links
    this.schema.virtual("hasSocialLinks").get(function () {
      if (!this.social_links) return false;
      return Object.values(this.social_links).some((link) => link && link.trim() !== "");
    });

    // Virtual: Project count
    this.schema.virtual("projectCount").get(function () {
      return this.projects ? this.projects.length : 0;
    });

    // Virtual: Endorsement count
    this.schema.virtual("endorsementCount").get(function () {
      return this.endorsements ? this.endorsements.length : 0;
    });

    // Static method: Find by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ display_order: 1, vote_count: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find by category
    this.schema.statics.findByCategory = async function (categoryId, options = {}) {
      const query = this.find({ categories: categoryId }).sort({ display_order: 1, vote_count: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find approved candidates
    this.schema.statics.findApproved = async function (eventId = null, options = {}) {
      const filter = { status: STATUS.APPROVED, is_published: true };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ vote_count: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find pending candidates
    this.schema.statics.findPending = async function (eventId = null, options = {}) {
      const filter = { status: STATUS.PENDING };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ nomination_date: 1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find featured candidates
    this.schema.statics.findFeatured = async function (eventId = null, limit = 5, options = {}) {
      const filter = { is_featured: true, is_published: true, status: STATUS.APPROVED };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ vote_count: -1 }).limit(limit);
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Instance method: Approve candidate
    this.schema.methods.approve = async function () {
      if (this.status === STATUS.APPROVED) {
        throw new Error("Candidate is already approved");
      }

      this.status = STATUS.APPROVED;
      this.approval_date = new Date();
      this.rejection_reason = null;
      
      // Sync admin-verified categories
      this.admin_verified_categories = [...this.categories];
      
      return await this.save();
    };

    // Instance method: Request re-approval after profile update
    this.schema.methods.requestReApproval = async function (changedFields = [], reason = "Profile update") {
      const previousStatus = this.status;
      
      // Set status to profile update pending
      this.status = STATUS.PROFILE_UPDATE_PENDING;
      this.is_published = false;
      
      // Track update in history
      this.profile_update_history.push({
        updated_at: new Date(),
        updated_by_candidate: true,
        reason,
        fields_changed: changedFields,
        previous_status: previousStatus,
        new_status: STATUS.PROFILE_UPDATE_PENDING,
      });
      
      return await this.save();
    };

    // Instance method: Reject candidate
    this.schema.methods.reject = async function (reason) {
      if (this.status === STATUS.REJECTED) {
        throw new Error("Candidate is already rejected");
      }

      this.status = STATUS.REJECTED;
      this.rejection_reason = reason;
      this.approval_date = null;
      return await this.save();
    };

    // Instance method: Increment vote count
    this.schema.methods.incrementVotes = async function (count = 1) {
      if (!this.canReceiveVotes) {
        throw new Error("Candidate cannot receive votes");
      }

      this.vote_count += count;
      return await this.save();
    };

    // Instance method: Decrement vote count
    this.schema.methods.decrementVotes = async function (count = 1) {
      if (this.vote_count <= 0) {
        throw new Error("Vote count cannot be negative");
      }

      this.vote_count = Math.max(0, this.vote_count - count);
      return await this.save();
    };

    // Instance method: Increment view count
    this.schema.methods.incrementViews = async function () {
      this.view_count += 1;
      return await this.save();
    };

    // Instance method: Add to category
    this.schema.methods.addToCategory = async function (categoryId) {
      if (this.categories.includes(categoryId)) {
        throw new Error("Candidate already in this category");
      }

      this.categories.push(categoryId);
      return await this.save();
    };

    // Instance method: Remove from category (only non-admin-verified)
    this.schema.methods.removeFromCategory = async function (categoryId) {
      if (this.categories.length <= 1) {
        throw new Error("Candidate must belong to at least one category");
      }

      // Check if category is admin-verified
      const isAdminVerified = this.admin_verified_categories.some(
        cat => cat.toString() === categoryId.toString()
      );
      
      if (isAdminVerified) {
        throw new Error("Cannot remove admin-verified category. Please contact administrator.");
      }

      const index = this.categories.findIndex(
        cat => cat.toString() === categoryId.toString()
      );
      
      if (index === -1) {
        throw new Error("Candidate not in this category");
      }

      this.categories.splice(index, 1);
      return await this.save();
    };

    // Instance method: Update login timestamp
    this.schema.methods.updateLastLogin = async function () {
      this.last_login = new Date();
      return await this.save();
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Candidate().getModel("Candidate");