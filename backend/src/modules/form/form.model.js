/**
 * The form model definition for the form module
 * Handles dynamic forms for nominations and event registrations
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model.js";
import {
  FORM_TYPE,
  FORM_STATUS as STATUS,
  FIELD_TYPE,
  VALIDATION_RULE,
  SUBMISSION_STATUS,
  DUPLICATE_CHECK_METHOD,
} from "../../utils/constants/form.constants.js";

class Form extends BaseModel {
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
        index: true,
      },
      form_type: {
        type: String,
        required: true,
        enum: Object.values(FORM_TYPE),
        index: true,
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
      fields: [
        {
          field_id: {
            type: String,
            required: true,
          },
          label: {
            type: String,
            required: true,
            trim: true,
          },
          field_type: {
            type: String,
            required: true,
            enum: Object.values(FIELD_TYPE),
          },
          placeholder: {
            type: String,
            trim: true,
          },
          help_text: {
            type: String,
            trim: true,
          },
          default_value: {
            type: mongoose.Schema.Types.Mixed,
          },
          options: [
            {
              label: String,
              value: String,
            },
          ],
          validation: {
            required: {
              type: Boolean,
              default: false,
            },
            min_length: Number,
            max_length: Number,
            min_value: Number,
            max_value: Number,
            pattern: String,
            custom_message: String,
          },
          conditional: {
            show_if: {
              field_id: String,
              operator: {
                type: String,
                enum: ["equals", "not_equals", "contains", "greater_than", "less_than"],
              },
              value: mongoose.Schema.Types.Mixed,
            },
          },
          display_order: {
            type: Number,
            default: 0,
          },
          is_duplicate_check_field: {
            type: Boolean,
            default: false,
          },
          is_identifier_field: {
            type: Boolean,
            default: false,
          },
          metadata: {
            type: Map,
            of: String,
            default: {},
          },
        },
      ],
      duplicate_detection: {
        enabled: {
          type: Boolean,
          default: true,
        },
        method: {
          type: String,
          enum: Object.values(DUPLICATE_CHECK_METHOD),
          default: DUPLICATE_CHECK_METHOD.FIELD_SIMILARITY,
        },
        threshold: {
          type: Number,
          min: 0,
          max: 100,
          default: 85,
        },
        check_fields: [String],
        auto_flag: {
          type: Boolean,
          default: true,
        },
      },
      multi_category_nomination: {
        enabled: {
          type: Boolean,
          default: false,
        },
        max_categories: {
          type: Number,
          min: 1,
          default: 3,
        },
        require_same_nominee: {
          type: Boolean,
          default: true,
        },
      },
      candidate_field_mapping: {
        enabled: {
          type: Boolean,
          default: false,
        },
        mappings: [
          {
            form_field_id: {
              type: String,
              required: true,
            },
            candidate_field: {
              type: String,
              required: true,
              enum: [
                "first_name",
                "last_name",
                "email",
                "phone_number",
                "bio",
                "profile_image",
                "cover_image",
                "video_url",
                "skills",
                "social_links.linkedin",
                "social_links.twitter",
                "social_links.github",
                "social_links.portfolio",
                "social_links.facebook",
                "social_links.instagram",
              ],
            },
            transform: {
              type: String,
              enum: ["none", "uppercase", "lowercase", "trim", "capitalize"],
              default: "none",
            },
            is_required: {
              type: Boolean,
              default: false,
            },
          },
        ],
        default: [],
        auto_create_candidate: {
          type: Boolean,
          default: true,
        },
        send_welcome_email: {
          type: Boolean,
          default: true,
        },
      },
      settings: {
        allow_multiple_submissions: {
          type: Boolean,
          default: false,
        },
        require_authentication: {
          type: Boolean,
          default: false,
        },
        capture_ip: {
          type: Boolean,
          default: true,
        },
        enable_captcha: {
          type: Boolean,
          default: true,
        },
        auto_approve: {
          type: Boolean,
          default: false,
        },
        send_confirmation_email: {
          type: Boolean,
          default: true,
        },
        confirmation_email_template: String,
        redirect_url: String,
        custom_css: String,
      },
      submission_limits: {
        max_submissions: {
          type: Number,
          default: null,
        },
        max_submissions_per_user: {
          type: Number,
          default: 1,
        },
        max_submissions_per_ip: {
          type: Number,
          default: 3,
        },
        rate_limit: {
          window_minutes: {
            type: Number,
            default: 60,
          },
          max_requests: {
            type: Number,
            default: 10,
          },
        },
      },
      status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.DRAFT,
        index: true,
      },
      open_date: {
        type: Date,
        default: null,
      },
      close_date: {
        type: Date,
        default: null,
      },
      is_published: {
        type: Boolean,
        default: false,
        index: true,
      },
      total_submissions: {
        type: Number,
        default: 0,
        min: 0,
      },
      approved_submissions: {
        type: Number,
        default: 0,
        min: 0,
      },
      rejected_submissions: {
        type: Number,
        default: 0,
        min: 0,
      },
      duplicate_submissions: {
        type: Number,
        default: 0,
        min: 0,
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
    this.schema.index({ event: 1, form_type: 1 });
    this.schema.index({ event: 1, status: 1 });
    this.schema.index({ slug: 1 }, { unique: true, sparse: true });
    this.schema.index({ is_published: 1, status: 1 });
    this.schema.index({ open_date: 1, close_date: 1 });

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

        // Validate categories belong to event
        if (this.categories && this.categories.length > 0) {
          const Category = mongoose.model("Category");
          const categories = await Category.find({
            _id: { $in: this.categories },
          });

          for (const category of categories) {
            if (category.event.toString() !== this.event.toString()) {
              throw new Error("All categories must belong to the form's event");
            }
          }
        }

        // Validate date range
        if (this.open_date && this.close_date) {
          if (this.close_date <= this.open_date) {
            throw new Error("Close date must be after open date");
          }
        }

        // Ensure duplicate check fields are valid
        if (this.duplicate_detection.enabled && this.duplicate_detection.check_fields.length === 0) {
          const checkFields = this.fields
            .filter((f) => f.is_duplicate_check_field)
            .map((f) => f.field_id);

          if (checkFields.length > 0) {
            this.duplicate_detection.check_fields = checkFields;
          }
        }

        // Validate multi-category nomination settings
        if (
          this.multi_category_nomination.enabled &&
          this.form_type !== FORM_TYPE.NOMINATION
        ) {
          throw new Error("Multi-category nomination only available for nomination forms");
        }

        // Auto-publish if status is active and not published
        if (this.status === STATUS.ACTIVE && !this.is_published) {
          this.is_published = true;
        }

        // Auto-close if past close date
        if (this.close_date && new Date() > this.close_date && this.status === STATUS.ACTIVE) {
          this.status = STATUS.CLOSED;
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Is open
    this.schema.virtual("isOpen").get(function () {
      if (this.status !== STATUS.ACTIVE || !this.is_published) return false;

      const now = new Date();

      if (this.open_date && now < this.open_date) return false;
      if (this.close_date && now > this.close_date) return false;

      // Check submission limits
      if (
        this.submission_limits.max_submissions &&
        this.total_submissions >= this.submission_limits.max_submissions
      ) {
        return false;
      }

      return true;
    });

    // Virtual: Is closed
    this.schema.virtual("isClosed").get(function () {
      if (this.status === STATUS.CLOSED) return true;

      const now = new Date();
      if (this.close_date && now > this.close_date) return true;

      if (
        this.submission_limits.max_submissions &&
        this.total_submissions >= this.submission_limits.max_submissions
      ) {
        return true;
      }

      return false;
    });

    // Virtual: Days until close
    this.schema.virtual("daysUntilClose").get(function () {
      if (!this.close_date) return null;
      const now = new Date();
      if (this.close_date <= now) return 0;
      return Math.ceil((this.close_date - now) / (1000 * 60 * 60 * 24));
    });

    // Virtual: Submission rate
    this.schema.virtual("submissionRate").get(function () {
      if (!this.open_date) return 0;
      const now = new Date();
      const daysSinceOpen = Math.max(
        1,
        Math.ceil((now - this.open_date) / (1000 * 60 * 60 * 24))
      );
      return Math.round((this.total_submissions / daysSinceOpen) * 10) / 10;
    });

    // Virtual: Approval rate
    this.schema.virtual("approvalRate").get(function () {
      if (this.total_submissions === 0) return 0;
      return Math.round((this.approved_submissions / this.total_submissions) * 100);
    });

    // Virtual: Duplicate rate
    this.schema.virtual("duplicateRate").get(function () {
      if (this.total_submissions === 0) return 0;
      return Math.round((this.duplicate_submissions / this.total_submissions) * 100);
    });

    // Virtual: Required fields
    this.schema.virtual("requiredFields").get(function () {
      return this.fields.filter((f) => f.validation.required).map((f) => f.field_id);
    });

    // Virtual: Identifier fields
    this.schema.virtual("identifierFields").get(function () {
      return this.fields.filter((f) => f.is_identifier_field).map((f) => f.field_id);
    });

    // Static method: Find forms by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find forms by type
    this.schema.statics.findByType = async function (formType, eventId = null, options = {}) {
      const filter = { form_type: formType };
      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find active forms
    this.schema.statics.findActive = async function (eventId = null, options = {}) {
      const now = new Date();
      const filter = {
        status: STATUS.ACTIVE,
        is_published: true,
        $or: [
          { open_date: null, close_date: null },
          { open_date: { $lte: now }, close_date: { $gte: now } },
          { open_date: null, close_date: { $gte: now } },
          { open_date: { $lte: now }, close_date: null },
        ],
      };

      if (eventId) filter.event = eventId;

      const query = this.find(filter).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find form by slug
    this.schema.statics.findBySlug = async function (slug, options = {}) {
      const query = this.findOne({ slug });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Get form statistics
    this.schema.statics.getStatistics = async function (eventId = null) {
      const matchStage = eventId ? { event: eventId } : {};

      const [stats] = await this.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            draft: [{ $match: { status: STATUS.DRAFT } }, { $count: "count" }],
            closed: [{ $match: { status: STATUS.CLOSED } }, { $count: "count" }],
            byType: [
              {
                $group: {
                  _id: "$form_type",
                  count: { $sum: 1 },
                },
              },
            ],
            totalSubmissions: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_submissions" },
                },
              },
            ],
            totalApproved: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$approved_submissions" },
                },
              },
            ],
            totalDuplicates: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$duplicate_submissions" },
                },
              },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        active: stats?.active[0]?.count || 0,
        draft: stats?.draft[0]?.count || 0,
        closed: stats?.closed[0]?.count || 0,
        byType: stats?.byType || [],
        totalSubmissions: stats?.totalSubmissions[0]?.total || 0,
        totalApproved: stats?.totalApproved[0]?.total || 0,
        totalDuplicates: stats?.totalDuplicates[0]?.total || 0,
      };
    };

    // Instance method: Add field
    this.schema.methods.addField = function (fieldData) {
      const fieldId =
        fieldData.field_id || `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      this.fields.push({
        ...fieldData,
        field_id: fieldId,
        display_order: fieldData.display_order || this.fields.length,
      });

      return this.save();
    };

    // Instance method: Remove field
    this.schema.methods.removeField = function (fieldId) {
      this.fields = this.fields.filter((f) => f.field_id !== fieldId);
      return this.save();
    };

    // Instance method: Update field
    this.schema.methods.updateField = function (fieldId, updates) {
      const fieldIndex = this.fields.findIndex((f) => f.field_id === fieldId);

      if (fieldIndex === -1) {
        throw new Error("Field not found");
      }

      this.fields[fieldIndex] = {
        ...this.fields[fieldIndex].toObject(),
        ...updates,
      };

      return this.save();
    };

    // Instance method: Reorder fields
    this.schema.methods.reorderFields = function (fieldOrder) {
      fieldOrder.forEach((fieldId, index) => {
        const field = this.fields.find((f) => f.field_id === fieldId);
        if (field) {
          field.display_order = index;
        }
      });

      this.fields.sort((a, b) => a.display_order - b.display_order);
      return this.save();
    };

    // Instance method: Increment submission count
    this.schema.methods.incrementSubmissions = async function (status = SUBMISSION_STATUS.PENDING) {
      this.total_submissions += 1;

      if (status === SUBMISSION_STATUS.APPROVED) {
        this.approved_submissions += 1;
      } else if (status === SUBMISSION_STATUS.REJECTED) {
        this.rejected_submissions += 1;
      } else if (status === SUBMISSION_STATUS.DUPLICATE) {
        this.duplicate_submissions += 1;
      }

      return await this.save();
    };

    // Instance method: Validate submission data
    this.schema.methods.validateSubmission = function (submissionData) {
      const errors = [];

      this.fields.forEach((field) => {
        const value = submissionData[field.field_id];

        // Check required fields
        if (field.validation.required && (value === null || value === undefined || value === "")) {
          errors.push({
            field_id: field.field_id,
            message: field.validation.custom_message || `${field.label} is required`,
          });
        }

        // Validate field type
        if (value !== null && value !== undefined && value !== "") {
          switch (field.field_type) {
            case FIELD_TYPE.EMAIL:
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                errors.push({
                  field_id: field.field_id,
                  message: `${field.label} must be a valid email`,
                });
              }
              break;

            case FIELD_TYPE.PHONE:
              if (!/^\+?[1-9]\d{1,14}$/.test(value.replace(/\s/g, ""))) {
                errors.push({
                  field_id: field.field_id,
                  message: `${field.label} must be a valid phone number`,
                });
              }
              break;

            case FIELD_TYPE.URL:
              try {
                new URL(value);
              } catch {
                errors.push({
                  field_id: field.field_id,
                  message: `${field.label} must be a valid URL`,
                });
              }
              break;

            case FIELD_TYPE.NUMBER:
              if (isNaN(value)) {
                errors.push({
                  field_id: field.field_id,
                  message: `${field.label} must be a number`,
                });
              }
              break;
          }

          // Length validation
          if (field.validation.min_length && value.length < field.validation.min_length) {
            errors.push({
              field_id: field.field_id,
              message: `${field.label} must be at least ${field.validation.min_length} characters`,
            });
          }

          if (field.validation.max_length && value.length > field.validation.max_length) {
            errors.push({
              field_id: field.field_id,
              message: `${field.label} must not exceed ${field.validation.max_length} characters`,
            });
          }

          // Value validation
          if (
            field.validation.min_value !== undefined &&
            Number(value) < field.validation.min_value
          ) {
            errors.push({
              field_id: field.field_id,
              message: `${field.label} must be at least ${field.validation.min_value}`,
            });
          }

          if (
            field.validation.max_value !== undefined &&
            Number(value) > field.validation.max_value
          ) {
            errors.push({
              field_id: field.field_id,
              message: `${field.label} must not exceed ${field.validation.max_value}`,
            });
          }

          // Pattern validation
          if (field.validation.pattern) {
            const regex = new RegExp(field.validation.pattern);
            if (!regex.test(value)) {
              errors.push({
                field_id: field.field_id,
                message:
                  field.validation.custom_message ||
                  `${field.label} does not match required format`,
              });
            }
          }
        }
      });

      return {
        valid: errors.length === 0,
        errors,
      };
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Form().getModel("Form");
