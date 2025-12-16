/**
 * FormSubmission Repository
 * This file defines the FormSubmissionRepository class which extends the BaseRepository
 * It contains submission-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository";
import FormSubmissionModel from "../models/submission.model";
import { SUBMISSION_STATUS as STATUS } from "../../utils/constants/form.constants";

class FormSubmissionRepository extends BaseRepository {
  constructor() {
    super(FormSubmissionModel);
  }

  /**
   * Create a new submission
   * @param {Object} submissionData - Submission data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created submission
   */
  async create(submissionData, options = {}) {
    try {
      // Validate required fields
      if (!submissionData.form) {
        throw new Error("Form ID is required");
      }
      if (!submissionData.event) {
        throw new Error("Event ID is required");
      }
      if (!submissionData.submission_data) {
        throw new Error("Submission data is required");
      }

      return await super.create(submissionData, options);
    } catch (error) {
      throw new Error(`Create submission failed: ${error.message}`);
    }
  }

  /**
   * Update a submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {Object} updates - Update data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Updated submission
   */
  async update(submissionId, updates, options = {}) {
    try {
      return await this.updateById(submissionId, updates, options);
    } catch (error) {
      throw new Error(`Update submission failed: ${error.message}`);
    }
  }

  /**
   * Soft delete a submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Deleted submission
   */
  async delete(submissionId, options = {}) {
    try {
      return await super.delete({ _id: submissionId }, options);
    } catch (error) {
      throw new Error(`Delete submission failed: ${error.message}`);
    }
  }

  /**
   * Restore a soft-deleted submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Restored submission
   */
  async restore(submissionId, options = {}) {
    try {
      return await super.restore({ _id: submissionId }, options);
    } catch (error) {
      throw new Error(`Restore submission failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Force deleted submission
   */
  async forceDelete(submissionId, options = {}) {
    try {
      return await super.forceDelete({ _id: submissionId }, options);
    } catch (error) {
      throw new Error(`Force delete submission failed: ${error.message}`);
    }
  }

  /**
   * Find all submissions for a specific form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated submissions
   */
  async findByForm(formId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll({ form: formId }, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find submissions by form failed: ${error.message}`);
    }
  }

  /**
   * Find all submissions for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated submissions
   */
  async findByEvent(eventId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll({ event: eventId }, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find submissions by event failed: ${error.message}`);
    }
  }

  /**
   * Find submissions by status
   * @param {string} status - Submission status
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated submissions
   */
  async findByStatus(status, formId = null, page = 1, limit = 20, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const filter = { status };
      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find submissions by status failed: ${error.message}`);
    }
  }

  /**
   * Find all submissions by nominee identifier (multi-category nominations)
   * @param {string} nomineeIdentifier - Nominee identifier hash
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of submissions
   */
  async findByNominee(nomineeIdentifier, options = {}) {
    try {
      const query = this.model
        .find({ nominee_identifier: nomineeIdentifier })
        .sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find submissions by nominee failed: ${error.message}`);
    }
  }

  /**
   * Find submissions by category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated submissions
   */
  async findByCategory(categoryId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll({ category: categoryId }, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find submissions by category failed: ${error.message}`);
    }
  }

  /**
   * Find submissions by submission number
   * @param {string} submissionNumber - Submission number
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Submission or null
   */
  async findBySubmissionNumber(submissionNumber, options = {}) {
    try {
      const query = this.model.findOne({ submission_number: submissionNumber });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find submission by number failed: ${error.message}`);
    }
  }

  /**
   * Find duplicate submissions
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated duplicate submissions
   */
  async findDuplicates(formId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll(
        {
          form: formId,
          "duplicate_check.is_duplicate": true,
        },
        page,
        limit,
        {
          sort: { "duplicate_check.similarity_score": -1 },
          ...options,
        }
      );
    } catch (error) {
      throw new Error(`Find duplicate submissions failed: ${error.message}`);
    }
  }

  /**
   * Find submissions pending review
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated pending submissions
   */
  async findPendingReview(formId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = { status: STATUS.PENDING };
      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: 1 }, // Oldest first for FIFO review
        ...options,
      });
    } catch (error) {
      throw new Error(`Find pending submissions failed: ${error.message}`);
    }
  }

  /**
   * Find submissions under review
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated submissions under review
   */
  async findUnderReview(formId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = { status: STATUS.UNDER_REVIEW };
      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: 1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find submissions under review failed: ${error.message}`);
    }
  }

  /**
   * Find approved submissions
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated approved submissions
   */
  async findApproved(formId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = { status: STATUS.APPROVED };
      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { "approval.approved_at": -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find approved submissions failed: ${error.message}`);
    }
  }

  /**
   * Find rejected submissions
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated rejected submissions
   */
  async findRejected(formId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = { status: STATUS.REJECTED };
      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { "approval.approved_at": -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find rejected submissions failed: ${error.message}`);
    }
  }

  /**
   * Find submissions converted to candidates
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated converted submissions
   */
  async findConverted(formId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = { converted_to_candidate: true };
      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { "approval.approved_at": -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find converted submissions failed: ${error.message}`);
    }
  }

  /**
   * Group submissions by nominee identifier
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Array>} - Grouped submissions
   */
  async groupByNominee(formId) {
    try {
      const grouped = await this.model.aggregate([
        { $match: { form: formId, nominee_identifier: { $ne: null } } },
        {
          $group: {
            _id: "$nominee_identifier",
            submissions: { $push: "$$ROOT" },
            count: { $sum: 1 },
            categories: { $addToSet: "$category" },
            statuses: { $addToSet: "$status" },
            hasDuplicates: { $max: "$duplicate_check.is_duplicate" },
            avgSimilarity: { $avg: "$duplicate_check.similarity_score" },
          },
        },
        { $sort: { count: -1 } },
      ]);

      return grouped;
    } catch (error) {
      throw new Error(`Group submissions by nominee failed: ${error.message}`);
    }
  }

  /**
   * Get submission statistics for a form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Submission statistics
   */
  async getFormStatistics(formId) {
    try {
      const [stats] = await this.model.aggregate([
        { $match: { form: formId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            byStatus: [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
            byCategory: [
              {
                $group: {
                  _id: "$category",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
            duplicates: [
              { $match: { "duplicate_check.is_duplicate": true } },
              { $count: "count" },
            ],
            converted: [{ $match: { converted_to_candidate: true } }, { $count: "count" }],
            avgSimilarity: [
              { $match: { "duplicate_check.is_duplicate": true } },
              {
                $group: {
                  _id: null,
                  average: { $avg: "$duplicate_check.similarity_score" },
                },
              },
            ],
            uniqueNominees: [
              { $match: { nominee_identifier: { $ne: null } } },
              {
                $group: {
                  _id: "$nominee_identifier",
                },
              },
              { $count: "count" },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        byStatus: stats?.byStatus || [],
        byCategory: stats?.byCategory || [],
        duplicates: stats?.duplicates[0]?.count || 0,
        converted: stats?.converted[0]?.count || 0,
        avgDuplicateSimilarity:
          Math.round((stats?.avgSimilarity[0]?.average || 0) * 10) / 10,
        uniqueNominees: stats?.uniqueNominees[0]?.count || 0,
      };
    } catch (error) {
      throw new Error(`Get form statistics failed: ${error.message}`);
    }
  }

  /**
   * Get event-wide submission statistics
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Event statistics
   */
  async getEventStatistics(eventId) {
    try {
      const [stats] = await this.model.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            byStatus: [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
            byForm: [
              {
                $group: {
                  _id: "$form",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
            byCategory: [
              {
                $group: {
                  _id: "$category",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
            ],
            duplicates: [
              { $match: { "duplicate_check.is_duplicate": true } },
              { $count: "count" },
            ],
            converted: [{ $match: { converted_to_candidate: true } }, { $count: "count" }],
            uniqueNominees: [
              { $match: { nominee_identifier: { $ne: null } } },
              {
                $group: {
                  _id: "$nominee_identifier",
                },
              },
              { $count: "count" },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        byStatus: stats?.byStatus || [],
        byForm: stats?.byForm || [],
        byCategory: stats?.byCategory || [],
        duplicates: stats?.duplicates[0]?.count || 0,
        converted: stats?.converted[0]?.count || 0,
        uniqueNominees: stats?.uniqueNominees[0]?.count || 0,
      };
    } catch (error) {
      throw new Error(`Get event statistics failed: ${error.message}`);
    }
  }

  /**
   * Check for duplicates for a new submission
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} submissionData - Submission data to check
   * @param {number} [threshold=80] - Similarity threshold (0-100)
   * @returns {Promise<Array>} - Potential duplicates with similarity scores
   */
  async checkDuplicates(formId, submissionData, threshold = 80) {
    try {
      const form = await this.model.db
        .collection("forms")
        .findOne({ _id: formId });

      if (!form || !form.duplicate_detection?.enabled) {
        return [];
      }

      const duplicates = await FormSubmissionModel.checkForDuplicates(
        formId,
        submissionData,
        threshold
      );

      return duplicates;
    } catch (error) {
      throw new Error(`Check duplicates failed: ${error.message}`);
    }
  }

  /**
   * Approve submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
   * @param {string} [notes] - Optional approval notes
   * @returns {Promise<Object>} - Updated submission
   */
  async approve(submissionId, reviewerId, notes = "") {
    try {
      const submission = await this.model.findById(submissionId);

      if (!submission) {
        throw new Error("Submission not found");
      }

      return await submission.approve(reviewerId, notes);
    } catch (error) {
      throw new Error(`Approve submission failed: ${error.message}`);
    }
  }

  /**
   * Reject submission
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
   * @param {string} reason - Rejection reason
   * @returns {Promise<Object>} - Updated submission
   */
  async reject(submissionId, reviewerId, reason) {
    try {
      const submission = await this.model.findById(submissionId);

      if (!submission) {
        throw new Error("Submission not found");
      }

      return await submission.reject(reviewerId, reason);
    } catch (error) {
      throw new Error(`Reject submission failed: ${error.message}`);
    }
  }

  /**
   * Mark submission as duplicate
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
   * @param {Array<string|mongoose.Types.ObjectId>} matchedSubmissions - IDs of matched submissions
   * @param {number} similarityScore - Similarity score (0-100)
   * @returns {Promise<Object>} - Updated submission
   */
  async markAsDuplicate(submissionId, reviewerId, matchedSubmissions, similarityScore) {
    try {
      const submission = await this.model.findById(submissionId);

      if (!submission) {
        throw new Error("Submission not found");
      }

      return await submission.markAsDuplicate(
        reviewerId,
        matchedSubmissions,
        similarityScore
      );
    } catch (error) {
      throw new Error(`Mark as duplicate failed: ${error.message}`);
    }
  }

  /**
   * Convert submission to candidate
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} userId - User performing conversion
   * @param {Object} [additionalData] - Additional candidate data
   * @returns {Promise<Object>} - Created candidate
   */
  async convertToCandidate(submissionId, userId, additionalData = {}) {
    try {
      const submission = await this.model.findById(submissionId);

      if (!submission) {
        throw new Error("Submission not found");
      }

      return await submission.convertToCandidate(userId, additionalData);
    } catch (error) {
      throw new Error(`Convert to candidate failed: ${error.message}`);
    }
  }

  /**
   * Bulk approve submissions
   * @param {Array<string|mongoose.Types.ObjectId>} submissionIds - Submission IDs
   * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
   * @param {string} [notes] - Optional approval notes
   * @returns {Promise<Object>} - Bulk update result
   */
  async bulkApprove(submissionIds, reviewerId, notes = "") {
    try {
      const result = await this.model.updateMany(
        {
          _id: { $in: submissionIds },
          status: { $in: [STATUS.PENDING, STATUS.UNDER_REVIEW] },
        },
        {
          $set: {
            status: STATUS.APPROVED,
            "approval.approved_by": reviewerId,
            "approval.approved_at": new Date(),
            "approval.notes": notes,
          },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Bulk approve submissions failed: ${error.message}`);
    }
  }

  /**
   * Bulk reject submissions
   * @param {Array<string|mongoose.Types.ObjectId>} submissionIds - Submission IDs
   * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
   * @param {string} reason - Rejection reason
   * @returns {Promise<Object>} - Bulk update result
   */
  async bulkReject(submissionIds, reviewerId, reason) {
    try {
      const result = await this.model.updateMany(
        {
          _id: { $in: submissionIds },
          status: { $in: [STATUS.PENDING, STATUS.UNDER_REVIEW] },
        },
        {
          $set: {
            status: STATUS.REJECTED,
            "approval.approved_by": reviewerId,
            "approval.approved_at": new Date(),
            "approval.notes": reason,
          },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Bulk reject submissions failed: ${error.message}`);
    }
  }

  /**
   * Set submission under review
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} reviewerId - Reviewer user ID
   * @returns {Promise<Object>} - Updated submission
   */
  async setUnderReview(submissionId, reviewerId) {
    try {
      return await this.updateById(submissionId, {
        status: STATUS.UNDER_REVIEW,
        "approval.approved_by": reviewerId,
      });
    } catch (error) {
      throw new Error(`Set under review failed: ${error.message}`);
    }
  }

  /**
   * Find submissions by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {string|mongoose.Types.ObjectId} [formId] - Optional form ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated submissions
   */
  async findByDateRange(
    startDate,
    endDate,
    formId = null,
    page = 1,
    limit = 20,
    options = {}
  ) {
    try {
      const filter = {
        created_at: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      if (formId) filter.form = formId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find submissions by date range failed: ${error.message}`);
    }
  }

  /**
   * Get submissions aggregated by time period
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {string} period - Time period ('day', 'week', 'month', 'year')
   * @returns {Promise<Array>} - Aggregated data
   */
  async aggregateByTimePeriod(formId, period = "day") {
    try {
      const groupFormats = {
        day: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
        week: { $isoWeek: "$created_at" },
        month: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
        year: { $year: "$created_at" },
      };

      if (!groupFormats[period]) {
        throw new Error(`Invalid period: ${period}. Use: day, week, month, year`);
      }

      const aggregated = await this.model.aggregate([
        { $match: { form: formId } },
        {
          $group: {
            _id: groupFormats[period],
            count: { $sum: 1 },
            approved: {
              $sum: {
                $cond: [{ $eq: ["$status", STATUS.APPROVED] }, 1, 0],
              },
            },
            rejected: {
              $sum: {
                $cond: [{ $eq: ["$status", STATUS.REJECTED] }, 1, 0],
              },
            },
            pending: {
              $sum: {
                $cond: [{ $eq: ["$status", STATUS.PENDING] }, 1, 0],
              },
            },
            duplicates: {
              $sum: {
                $cond: ["$duplicate_check.is_duplicate", 1, 0],
              },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      return aggregated;
    } catch (error) {
      throw new Error(`Aggregate by time period failed: ${error.message}`);
    }
  }

  /**
   * Export submissions for a form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [filters] - Optional filters
   * @returns {Promise<Array>} - Submissions data for export
   */
  async exportSubmissions(formId, filters = {}) {
    try {
      const query = { form: formId, ...filters };

      const submissions = await this.model
        .find(query)
        .populate("category", "name")
        .populate("approval.approved_by", "name email")
        .sort({ created_at: -1 })
        .lean()
        .exec();

      return submissions.map((sub) => ({
        submission_number: sub.submission_number,
        category: sub.category?.name || "N/A",
        status: sub.status,
        submitted_at: sub.created_at,
        approved_at: sub.approval?.approved_at || null,
        approved_by: sub.approval?.approved_by?.name || "N/A",
        is_duplicate: sub.duplicate_check?.is_duplicate || false,
        similarity_score: sub.duplicate_check?.similarity_score || 0,
        converted_to_candidate: sub.converted_to_candidate,
        ...Object.fromEntries(sub.submission_data || new Map()),
      }));
    } catch (error) {
      throw new Error(`Export submissions failed: ${error.message}`);
    }
  }
}

export default new FormSubmissionRepository();
