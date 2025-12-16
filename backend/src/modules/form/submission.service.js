import BaseService from "../shared/base.service.js";
import SubmissionRepository from "./submission.repository.js";
import FormRepository from "./form.repository.js";
import FormService from "./form.service.js";
import CandidateService from "../candidate/candidate.service.js";
import ActivityService from "../activity/activity.service.js";
import { IPHelper } from "../../utils/helpers/ip.helper.js";
import { SUBMISSION_STATUS as STATUS, FORM_TYPE } from "../../utils/constants/form.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";
import crypto from "crypto";

/**
 * Submission Service
 * Handles nomination/registration form submissions, duplicate detection, and approval workflows
 */
class SubmissionService extends BaseService {
  constructor(dependencies = {}) {
    super();
    this.repository = dependencies.repository || SubmissionRepository;
    this.formRepository = dependencies.formRepository || FormRepository;
    this.formService = dependencies.formService || FormService;
    this.candidateService = dependencies.candidateService || CandidateService;
    this.activityService = dependencies.activityService || ActivityService;
  }

  // ==================== SUBMISSION MANAGEMENT ====================

  /**
   * Submit a form (nomination or registration)
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} submissionData - Form field data (key-value pairs)
   * @param {Object} metadata - Submission metadata (ip_address, user_agent, submitted_by, etc.)
   * @returns {Promise<Object>} - Created submission with duplicate check results
   */
  async submitForm(formId, submissionData, metadata = {}) {
    try {
      // Get form with configuration
      const form = await this.formRepository.findById(formId, {
        populate: ["event", "categories"],
      });

      if (!form) {
        throw new Error("Form not found");
      }

      // Check if form is open
      if (form.status !== "active" || !form.is_published) {
        throw new Error("Form is not currently accepting submissions");
      }

      // Validate submission data against form fields
      const validation = form.validateSubmission(submissionData);
      if (!validation.valid) {
        throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
      }

      // Normalize submission data for duplicate detection
      const normalizedData = this.normalizeSubmissionData(submissionData, form.fields);

      // Generate nominee identifier if multi-category nomination
      let nomineeIdentifier = null;
      if (form.multi_category_nomination?.enabled) {
        const identifierFields = form.fields
          .filter((f) => f.is_identifier_field)
          .map((f) => submissionData[f.field_id] || "")
          .join("|");

        nomineeIdentifier = crypto
          .createHash("sha256")
          .update(identifierFields.toLowerCase())
          .digest("hex");
      }

      // Hash IP address for privacy using IPHelper
      const ipHash = IPHelper.hash(metadata.ip_address);

      // Generate submission number
      const submissionNumber = await this.generateSubmissionNumber(formId);

      // Create submission
      const submission = await this.repository.create({
        form: formId,
        event: form.event._id || form.event,
        categories: metadata.categories || form.categories,
        submission_data: submissionData,
        normalized_data: normalizedData,
        status: form.settings.auto_approve ? STATUS.APPROVED : STATUS.PENDING,
        submitted_by: metadata.submitted_by || null,
        ip_address: metadata.ip_address,
        ip_hash: ipHash,
        user_agent: metadata.user_agent,
        session_id: metadata.session_id,
        nominee_identifier: nomineeIdentifier,
        submission_number: submissionNumber,
      });

      // Run duplicate detection if enabled
      let duplicateCheckResult = null;
      if (form.duplicate_detection?.enabled) {
        duplicateCheckResult = await this.checkDuplicates(submission._id);
      }

      // Increment form submission count
      await form.incrementSubmissions(submission.status);

      // Send confirmation email if enabled
      if (form.settings.send_confirmation_email && !form.settings.auto_approve) {
        // TODO: Send confirmation email
      }

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: metadata.submitted_by || null,
        action: ACTION_TYPE.FORM_SUBMISSION,
        entityType: ENTITY_TYPE.FORM_SUBMISSION,
        entityId: submission._id,
        eventId: form.event._id || form.event,
        description: `Submitted ${form.form_type} form: ${form.name}`,
        metadata: {
          formId: formId,
          submissionNumber: submissionNumber,
          hasDuplicates: duplicateCheckResult?.is_duplicate || false,
        },
        ipAddress: metadata.ip_address,
      }).catch(err => console.error("Activity log failed:", err));

      return {
        submission,
        duplicateCheck: duplicateCheckResult,
      };
    } catch (error) {
      throw new Error(`Submit form failed: ${error.message}`);
    }
  }

  /**
   * Check for duplicates for a submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {number} [threshold] - Optional custom threshold (overrides form setting)
   * @returns {Promise<Object>} - Duplicate check result
   */
  async checkDuplicates(submissionId, threshold = null) {
    try {
      const submission = await this.repository.findById(submissionId, {
        populate: ["form"],
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      const form = submission.form;
      if (!form.duplicate_detection?.enabled) {
        return { is_duplicate: false, matched_submissions: [], similarity_score: 0 };
      }

      const checkThreshold = threshold || form.duplicate_detection.threshold || 85;

      // Run duplicate check
      const duplicates = await this.repository.checkDuplicates(
        form._id,
        submission.submission_data,
        checkThreshold
      );

      const isDuplicate = duplicates.length > 0;
      const highestScore = Math.max(...duplicates.map((d) => d.similarity), 0);

      // Update submission with duplicate check results
      await this.repository.updateById(submissionId, {
        "duplicate_check.is_duplicate": isDuplicate,
        "duplicate_check.similarity_score": highestScore,
        "duplicate_check.matched_submissions": duplicates.map((d) => ({
          submission_id: d.submission_id,
          similarity: d.similarity,
          matched_fields: d.matched_fields || [],
        })),
        "duplicate_check.checked_at": new Date(),
        status: isDuplicate && form.duplicate_detection.auto_flag ? STATUS.DUPLICATE : submission.status,
      });

      // Update form duplicate count if needed
      if (isDuplicate && form.duplicate_detection.auto_flag) {
        await form.incrementSubmissions(STATUS.DUPLICATE);
      }

      return {
        is_duplicate: isDuplicate,
        similarity_score: highestScore,
        matched_submissions: duplicates,
      };
    } catch (error) {
      throw new Error(`Check duplicates failed: ${error.message}`);
    }
  }

  /**
   * Get suspected duplicates for admin review
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [filters] - Additional filters
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @returns {Promise<Object>} - Paginated duplicates with grouping
   */
  async getSuspectedDuplicates(formId, page = 1, limit = 20) {
    try {
      // Get duplicates
      const duplicates = await this.repository.findDuplicates(formId, page, limit, {
        populate: ["submitted_by", "categories"],
      });

      // Group by nominee identifier if available
      const grouped = await this.repository.groupByNominee(formId);

      return {
        duplicates,
        grouped,
      };
    } catch (error) {
      throw new Error(`Get suspected duplicates failed: ${error.message}`);
    }
  }

  // ==================== APPROVAL WORKFLOW ====================

  /**
   * Approve submission and create candidate profile if nomination form
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
   * @param {Object} options - Approval options
   * @param {string} options.notes - Approval notes
   * @param {boolean} options.createCandidate - Whether to create candidate (default: true for nomination forms)
   * @param {boolean} options.sendEmail - Whether to send welcome email (default: true)
   * @param {Object} options.candidateOverrides - Override data for candidate creation
   * @returns {Promise<Object>} - Approval result with candidate if created
   */
  async approveSubmission(submissionId, adminId, options = {}) {
    try {
      // Get submission with form
      const submission = await this.repository.findById(submissionId, {
        populate: ["form", "event", "categories"],
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      if (submission.status === STATUS.APPROVED) {
        throw new Error("Submission already approved");
      }

      const form = submission.form;

      // Approve submission
      const approved = await this.repository.approve(submissionId, adminId, options.notes || "");

      let candidate = null;

      // Create candidate if it's a nomination form and field mapping is enabled
      if (
        form.form_type === FORM_TYPE.NOMINATION &&
        form.candidate_field_mapping?.enabled &&
        (options.createCandidate ?? form.candidate_field_mapping.auto_create_candidate)
      ) {
        // Extract candidate data using field mapping
        const candidateData = FormService.extractCandidateData(
          submission.submission_data,
          form.candidate_field_mapping.mappings
        );

        // Merge with overrides
        const finalCandidateData = {
          ...candidateData,
          ...options.candidateOverrides,
        };

        // Create placeholder candidate
        candidate = await CandidateService.createFromNomination(
          finalCandidateData,
          submission.event._id || submission.event,
          submission.categories.map((c) => c._id || c),
          submissionId,
          adminId // Track which admin approved and created the candidate
        );

        // Link candidate to submission
        await this.repository.updateById(submissionId, {
          candidate: candidate._id,
        });

        // Send welcome email if enabled
        if (options.sendEmail ?? form.candidate_field_mapping.send_welcome_email) {
          await CandidateService.sendWelcomeEmail(candidate._id);
        }
      }

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.SUBMISSION_APPROVED,
        entityType: ENTITY_TYPE.FORM_SUBMISSION,
        entityId: submissionId,
        eventId: submission.event._id || submission.event,
        description: `Approved ${form.form_type} submission ${submission.submission_number}`,
        metadata: {
          formId: form._id,
          candidateCreated: !!candidate,
          candidateId: candidate?._id,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return {
        submission: approved,
        candidate,
        emailSent: !!candidate && (options.sendEmail ?? form.candidate_field_mapping.send_welcome_email),
      };
    } catch (error) {
      throw new Error(`Approve submission failed: ${error.message}`);
    }
  }

  /**
   * Reject submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
   * @param {string} reason - Rejection reason
   * @returns {Promise<Object>} - Rejected submission
   */
  async rejectSubmission(submissionId, adminId, reason) {
    try {
      const submission = await this.repository.findById(submissionId, {
        populate: ["form", "event"],
      });

      if (!submission) {
        throw new Error("Submission not found");
      }

      const rejected = await this.repository.reject(submissionId, adminId, reason);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.SUBMISSION_REJECTED,
        entityType: ENTITY_TYPE.FORM_SUBMISSION,
        entityId: submissionId,
        eventId: submission.event._id || submission.event,
        description: `Rejected ${submission.form.form_type} submission ${submission.submission_number}`,
        metadata: {
          formId: submission.form._id,
          reason,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return rejected;
    } catch (error) {
      throw new Error(`Reject submission failed: ${error.message}`);
    }
  }

  /**
   * Resolve duplicate submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
   * @param {Object} resolution - Resolution details
   * @param {string} resolution.action - "approve", "reject", "merge"
   * @param {string|mongoose.Types.ObjectId} [resolution.mergeWith] - ID to merge with (if action="merge")
   * @param {string} [resolution.notes] - Resolution notes
   * @returns {Promise<Object>} - Resolution result
   */
  async resolveDuplicate(submissionId, adminId, resolution) {
    try {
      const submission = await this.repository.findById(submissionId);

      if (!submission) {
        throw new Error("Submission not found");
      }

      if (!submission.duplicate_check?.is_duplicate) {
        throw new Error("Submission is not flagged as duplicate");
      }

      let result = null;

      switch (resolution.action) {
        case "approve":
          // Approve as separate submission
          result = await this.approveSubmission(submissionId, adminId, {
            notes: resolution.notes || "Approved despite duplicate flag",
          });
          break;

        case "reject":
          // Reject as duplicate
          result = await this.rejectSubmission(
            submissionId,
            adminId,
            resolution.notes || "Rejected as duplicate"
          );
          break;

        case "merge":
          // Mark as duplicate of another submission
          if (!resolution.mergeWith) {
            throw new Error("mergeWith is required for merge action");
          }

          result = await this.repository.markAsDuplicate(
            submissionId,
            adminId,
            [resolution.mergeWith],
            submission.duplicate_check.similarity_score
          );

          // Log merge activity (fire-and-forget)
          this.activityService.log({
            userId: adminId,
            action: ACTION_TYPE.SUBMISSION_MERGED,
            entityType: ENTITY_TYPE.FORM_SUBMISSION,
            entityId: submissionId,
            description: `Merged duplicate submission with ${resolution.mergeWith}`,
            metadata: {
              mergedWith: resolution.mergeWith,
              notes: resolution.notes,
            },
          }).catch(err => console.error("Activity log failed:", err));
          break;

        default:
          throw new Error(`Invalid resolution action: ${resolution.action}`);
      }

      return result;
    } catch (error) {
      throw new Error(`Resolve duplicate failed: ${error.message}`);
    }
  }

  // ==================== QUERY METHODS ====================

  /**
   * Get submission by ID
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Submission
   */
  async getSubmissionById(submissionId, options = {}) {
    try {
      return await this.repository.findById(submissionId, {
        ...options,
        populate: ["form", "event", "categories", "submitted_by", "candidate", "approval.reviewed_by"],
      });
    } catch (error) {
      throw new Error(`Get submission failed: ${error.message}`);
    }
  }

  /**
   * Get submissions for a form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [filters] - Additional filters (status, duplicate, etc.)
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @returns {Promise<Object>} - Paginated submissions
   */
  async getFormSubmissions(formId, filters = {}, page = 1, limit = 20) {
    try {
      const query = { form: formId, ...filters };
      return await this.repository.findAll(query, page, limit, {
        populate: ["submitted_by", "categories", "candidate"],
        sort: { created_at: -1 },
      });
    } catch (error) {
      throw new Error(`Get form submissions failed: ${error.message}`);
    }
  }

  /**
   * Get pending submissions for review
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @returns {Promise<Object>} - Paginated pending submissions
   */
  async getPendingSubmissions(formId = null, page = 1, limit = 20) {
    try {
      return await this.repository.findPendingReview(formId, page, limit, {
        populate: ["form", "submitted_by", "categories"],
      });
    } catch (error) {
      throw new Error(`Get pending submissions failed: ${error.message}`);
    }
  }

  /**
   * Get submissions by nominee (multi-category nominations)
   * @param {string} nomineeIdentifier - Nominee identifier hash
   * @returns {Promise<Array>} - All submissions for this nominee
   */
  async getSubmissionsByNominee(nomineeIdentifier) {
    try {
      return await this.repository.findByNominee(nomineeIdentifier, {
        populate: ["form", "categories", "submitted_by"],
      });
    } catch (error) {
      throw new Error(`Get submissions by nominee failed: ${error.message}`);
    }
  }

  /**
   * Get form statistics
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Form submission statistics
   */
  async getFormStatistics(formId) {
    try {
      return await this.repository.getFormStatistics(formId);
    } catch (error) {
      throw new Error(`Get form statistics failed: ${error.message}`);
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Generate unique submission number
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<string>} - Submission number
   */
  async generateSubmissionNumber(formId) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const formShort = formId.toString().substring(formId.toString().length - 4).toUpperCase();

    return `SUB-${formShort}-${timestamp}-${random}`;
  }

  /**
   * Normalize submission data for duplicate detection
   * @param {Object} submissionData - Raw submission data
   * @param {Array} formFields - Form field definitions
   * @returns {Map} - Normalized data
   */
  normalizeSubmissionData(submissionData, formFields) {
    const normalized = {};

    for (const field of formFields) {
      const value = submissionData[field.field_id];

      if (value !== undefined && value !== null && value !== "") {
        let normalizedValue = value;

        // Normalize based on field type
        if (typeof value === "string") {
          normalizedValue = value.toLowerCase().trim();

          // Remove special characters for duplicate checking
          if (field.is_duplicate_check_field) {
            normalizedValue = normalizedValue.replace(/[^\w\s]/g, "");
          }
        }

        normalized[field.field_id] = normalizedValue;
      }
    }

    return normalized;
  }

  /**
   * Bulk approve submissions
   * @param {Array<string>} submissionIds - Submission IDs
   * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
   * @param {Object} [options] - Approval options
   * @returns {Promise<Object>} - Bulk approval result
   */
  async bulkApproveSubmissions(submissionIds, adminId, options = {}) {
    try {
      const result = await this.repository.bulkApprove(submissionIds, adminId, options.notes || "");

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.BULK_SUBMISSION_APPROVAL,
        entityType: ENTITY_TYPE.FORM_SUBMISSION,
        description: `Bulk approved ${result.modified} submissions`,
        metadata: {
          count: result.modified,
          submissionIds,
        },
      }).catch(err => console.error("Activity log failed:", err));

      return result;
    } catch (error) {
      throw new Error(`Bulk approve submissions failed: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { SubmissionService };
export default new SubmissionService();
