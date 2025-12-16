/**
 * The form submission model definition for the form module
 * Handles submissions from dynamic forms with duplicate detection
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model.js";
import { SUBMISSION_STATUS as STATUS } from "../../utils/constants/form.constants.js";

class FormSubmission extends BaseModel {
  constructor() {
    const schemaDefinition = {
      form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
        required: true,
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
      submission_data: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true,
      },
      normalized_data: {
        type: Map,
        of: String,
        default: {},
      },
      status: {
        type: String,
        enum: Object.values(STATUS),
        default: STATUS.PENDING,
        index: true,
      },
      submitted_by: {
        type: Object,
        required: true,
        default: {},
      },
      ip_address: {
        type: String,
        index: true,
      },
      ip_hash: {
        type: String,
        index: true,
      },
      user_agent: {
        type: String,
      },
      session_id: {
        type: String,
        index: true,
      },
      duplicate_check: {
        is_duplicate: {
          type: Boolean,
          default: false,
          index: true,
        },
        similarity_score: {
          type: Number,
          min: 0,
          max: 100,
          default: 0,
        },
        matched_submissions: [
          {
            submission_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "FormSubmission",
            },
            similarity: Number,
            matched_fields: [String],
          },
        ],
        checked_at: Date,
      },
      nominee_identifier: {
        type: String,
        index: true,
      },
      approval: {
        reviewed_by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reviewed_at: Date,
        review_notes: String,
        rejection_reason: String,
      },
      candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        default: null,
      },
      attachments: [
        {
          field_id: String,
          filename: String,
          url: String,
          size: Number,
          mime_type: String,
          uploaded_at: Date,
        },
      ],
      metadata: {
        type: Map,
        of: String,
        default: {},
      },
      submission_number: {
        type: String,
        unique: true,
        index: true,
      },
      confirmation_sent: {
        type: Boolean,
        default: false,
      },
      confirmation_sent_at: {
        type: Date,
      },
    };

    const options = {
      softDelete: true,
      timestamps: true,
    };

    super(schemaDefinition, options);

    // Create compound indexes
    this.schema.index({ form: 1, status: 1 });
    this.schema.index({ event: 1, status: 1 });
    this.schema.index({ form: 1, nominee_identifier: 1 });
    this.schema.index({ "duplicate_check.is_duplicate": 1, status: 1 });
    this.schema.index({ ip_hash: 1, form: 1 });
    this.schema.index({ submitted_by: 1, form: 1 });

    // Pre-save hook
    this.schema.pre("save", async function (next) {
      try {
        // Generate submission number if new
        if (this.isNew && !this.submission_number) {
          const count = await this.constructor.countDocuments({ form: this.form });
          const formDoc = await mongoose.model("Form").findById(this.form);
          const prefix = formDoc?.slug?.substring(0, 3).toUpperCase() || "SUB";
          this.submission_number = `${prefix}-${Date.now()}-${count + 1}`;
        }

        // Normalize data for duplicate checking
        if (this.submission_data) {
          this.normalized_data = new Map();
          for (const [key, value] of this.submission_data.entries()) {
            if (typeof value === "string") {
              this.normalized_data.set(
                key,
                value
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, " ")
              );
            }
          }
        }

        // Generate nominee identifier for multi-category tracking
        if (!this.nominee_identifier && this.submission_data) {
          const identifierFields = ["email", "phone", "first_name", "last_name", "name"];
          const identifierParts = [];

          for (const field of identifierFields) {
            const value = this.submission_data.get(field);
            if (value) {
              identifierParts.push(
                String(value)
                  .toLowerCase()
                  .trim()
              );
            }
          }

          if (identifierParts.length > 0) {
            const crypto = await import("crypto");
            this.nominee_identifier = crypto
              .createHash("sha256")
              .update(identifierParts.join("|"))
              .digest("hex")
              .substring(0, 16);
          }
        }

        // Update approval metadata when status changes
        if (this.isModified("status")) {
          if (this.status === STATUS.APPROVED && !this.approval.reviewed_at) {
            this.approval.reviewed_at = new Date();
          } else if (this.status === STATUS.REJECTED && !this.approval.reviewed_at) {
            this.approval.reviewed_at = new Date();
          }
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Post-save hook to update form statistics
    this.schema.post("save", async function (doc) {
      try {
        const Form = mongoose.model("Form");
        const form = await Form.findById(doc.form);

        if (form) {
          // Update submission counts
          const totalSubmissions = await doc.constructor.countDocuments({ form: doc.form });
          const approvedSubmissions = await doc.constructor.countDocuments({
            form: doc.form,
            status: STATUS.APPROVED,
          });
          const rejectedSubmissions = await doc.constructor.countDocuments({
            form: doc.form,
            status: STATUS.REJECTED,
          });
          const duplicateSubmissions = await doc.constructor.countDocuments({
            form: doc.form,
            "duplicate_check.is_duplicate": true,
          });

          await Form.findByIdAndUpdate(doc.form, {
            total_submissions: totalSubmissions,
            approved_submissions: approvedSubmissions,
            rejected_submissions: rejectedSubmissions,
            duplicate_submissions: duplicateSubmissions,
          });
        }
      } catch (error) {
        console.error("Error updating form statistics:", error);
      }
    });

    // Virtual: Is pending
    this.schema.virtual("isPending").get(function () {
      return this.status === STATUS.PENDING || this.status === STATUS.UNDER_REVIEW;
    });

    // Virtual: Is approved
    this.schema.virtual("isApproved").get(function () {
      return this.status === STATUS.APPROVED;
    });

    // Virtual: Is rejected
    this.schema.virtual("isRejected").get(function () {
      return this.status === STATUS.REJECTED;
    });

    // Virtual: Days since submission
    this.schema.virtual("daysSinceSubmission").get(function () {
      const now = new Date();
      return Math.floor((now - this.created_at) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find submissions by form
    this.schema.statics.findByForm = async function (formId, options = {}) {
      const query = this.find({ form: formId }).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find submissions by event
    this.schema.statics.findByEvent = async function (eventId, options = {}) {
      const query = this.find({ event: eventId }).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find submissions by status
    this.schema.statics.findByStatus = async function (status, formId = null, options = {}) {
      const filter = { status };
      if (formId) filter.form = formId;

      const query = this.find(filter).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find submissions by nominee identifier
    this.schema.statics.findByNominee = async function (nomineeIdentifier, options = {}) {
      const query = this.find({ nominee_identifier: nomineeIdentifier }).sort({ created_at: -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Find duplicate submissions
    this.schema.statics.findDuplicates = async function (formId = null, options = {}) {
      const filter = { "duplicate_check.is_duplicate": true };
      if (formId) filter.form = formId;

      const query = this.find(filter).sort({ "duplicate_check.similarity_score": -1 });
      if (options.populate) query.populate(options.populate);
      return await query.exec();
    };

    // Static method: Check for duplicates
    this.schema.statics.checkForDuplicates = async function (
      formId,
      submissionData,
      checkFields,
      threshold = 85
    ) {
      const Form = mongoose.model("Form");
      const form = await Form.findById(formId);

      if (!form || !form.duplicate_detection.enabled) {
        return { hasDuplicates: false, matches: [] };
      }

      const fieldsToCheck = checkFields || form.duplicate_detection.check_fields;

      if (!fieldsToCheck || fieldsToCheck.length === 0) {
        return { hasDuplicates: false, matches: [] };
      }

      // Get all submissions for this form
      const existingSubmissions = await this.find({
        form: formId,
        status: { $ne: STATUS.REJECTED },
      }).lean();

      const matches = [];

      for (const existing of existingSubmissions) {
        let matchedFields = [];
        let totalSimilarity = 0;

        for (const fieldId of fieldsToCheck) {
          const newValue = submissionData.get
            ? submissionData.get(fieldId)
            : submissionData[fieldId];
          const existingValue = existing.submission_data.get
            ? existing.submission_data.get(fieldId)
            : existing.submission_data[fieldId];

          if (newValue && existingValue) {
            const similarity = calculateSimilarity(String(newValue), String(existingValue));

            if (similarity >= threshold) {
              matchedFields.push(fieldId);
              totalSimilarity += similarity;
            }
          }
        }

        if (matchedFields.length > 0) {
          const avgSimilarity = totalSimilarity / matchedFields.length;

          matches.push({
            submission_id: existing._id,
            similarity: Math.round(avgSimilarity),
            matched_fields: matchedFields,
          });
        }
      }

      // Sort by similarity score
      matches.sort((a, b) => b.similarity - a.similarity);

      return {
        hasDuplicates: matches.length > 0,
        matches: matches.slice(0, 10), // Return top 10 matches
      };
    };

    // Instance method: Approve submission
    this.schema.methods.approve = async function (reviewedBy, notes = "") {
      this.status = STATUS.APPROVED;
      this.approval.reviewed_by = reviewedBy;
      this.approval.reviewed_at = new Date();
      this.approval.review_notes = notes;

      return await this.save();
    };

    // Instance method: Reject submission
    this.schema.methods.reject = async function (reviewedBy, reason = "") {
      this.status = STATUS.REJECTED;
      this.approval.reviewed_by = reviewedBy;
      this.approval.reviewed_at = new Date();
      this.approval.rejection_reason = reason;

      return await this.save();
    };

    // Instance method: Mark as duplicate
    this.schema.methods.markAsDuplicate = async function (matches) {
      this.status = STATUS.DUPLICATE;
      this.duplicate_check.is_duplicate = true;
      this.duplicate_check.matched_submissions = matches;
      this.duplicate_check.checked_at = new Date();

      if (matches.length > 0) {
        this.duplicate_check.similarity_score = Math.max(...matches.map((m) => m.similarity));
      }

      return await this.save();
    };

    // Instance method: Convert to candidate
    this.schema.methods.convertToCandidate = async function () {
      if (this.candidate) {
        throw new Error("Submission already converted to candidate");
      }

      if (this.status !== STATUS.APPROVED) {
        throw new Error("Only approved submissions can be converted to candidates");
      }

      const Candidate = mongoose.model("Candidate");

      // Map submission data to candidate fields
      const candidateData = {
        first_name: this.submission_data.get("first_name") || "",
        last_name: this.submission_data.get("last_name") || "",
        email: this.submission_data.get("email") || "",
        phone_number: this.submission_data.get("phone") || this.submission_data.get("phone_number"),
        bio: this.submission_data.get("bio") || this.submission_data.get("description"),
        event: this.event,
        categories: this.categories,
        status: "pending",
        nomination_date: this.created_at,
      };

      // Create candidate
      const candidate = await Candidate.create(candidateData);

      // Update submission
      this.candidate = candidate._id;
      await this.save();

      return candidate;
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

// Helper function to calculate string similarity
function calculateSimilarity(str1, str2) {
  const s1 = String(str1)
    .toLowerCase()
    .trim();
  const s2 = String(str2)
    .toLowerCase()
    .trim();

  // Exact match
  if (s1 === s2) return 100;

  // Levenshtein distance based similarity
  const len1 = s1.length;
  const len2 = s2.length;

  if (len1 === 0 || len2 === 0) return 0;

  const matrix = Array(len2 + 1)
    .fill(null)
    .map(() => Array(len1 + 1).fill(null));

  for (let i = 0; i <= len1; i++) matrix[0][i] = i;
  for (let j = 0; j <= len2; j++) matrix[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + cost
      );
    }
  }

  const distance = matrix[len2][len1];
  const maxLen = Math.max(len1, len2);
  const similarity = ((maxLen - distance) / maxLen) * 100;

  return Math.round(similarity);
}

export default new FormSubmission().getModel("FormSubmission");
