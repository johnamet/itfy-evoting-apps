/**
 * Form Repository
 * This file defines the FormRepository class which extends the BaseRepository
 * It contains form-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository.js";
import FormModel from "./form.model.js";
import { FORM_TYPE, FORM_STATUS as STATUS } from "../../utils/constants/form.constants.js";

class FormRepository extends BaseRepository {
  constructor() {
    super(FormModel);
  }

  /**
   * Create a new form
   * @param {Object} formData - Form data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created form
   */
  async create(formData, options = {}) {
    try {
      // Validate required fields
      if (!formData.name) {
        throw new Error("Form name is required");
      }
      if (!formData.event) {
        throw new Error("Event ID is required");
      }
      if (!formData.form_type) {
        throw new Error("Form type is required");
      }

      return await super.create(formData, options);
    } catch (error) {
      throw new Error(`Create form failed: ${error.message}`);
    }
  }

  /**
   * Update a form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} updates - Update data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Updated form
   */
  async update(formId, updates, options = {}) {
    try {
      return await this.updateById(formId, updates, options);
    } catch (error) {
      throw new Error(`Update form failed: ${error.message}`);
    }
  }

  /**
   * Soft delete a form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Deleted form
   */
  async delete(formId, options = {}) {
    try {
      return await super.delete({ _id: formId }, options);
    } catch (error) {
      throw new Error(`Delete form failed: ${error.message}`);
    }
  }

  /**
   * Restore a soft-deleted form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Restored form
   */
  async restore(formId, options = {}) {
    try {
      return await super.restore({ _id: formId }, options);
    } catch (error) {
      throw new Error(`Restore form failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Force deleted form
   */
  async forceDelete(formId, options = {}) {
    try {
      return await super.forceDelete({ _id: formId }, options);
    } catch (error) {
      throw new Error(`Force delete form failed: ${error.message}`);
    }
  }

  /**
   * Find all forms for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model.find({ event: eventId }).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find forms by event failed: ${error.message}`);
    }
  }

  /**
   * Find forms by type
   * @param {string} formType - Form type
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms
   */
  async findByType(formType, eventId = null, options = {}) {
    try {
      if (!Object.values(FORM_TYPE).includes(formType)) {
        throw new Error(`Invalid form type: ${formType}`);
      }

      const filter = { form_type: formType };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find forms by type failed: ${error.message}`);
    }
  }

  /**
   * Find active forms (open and accepting submissions)
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of active forms
   */
  async findActive(eventId = null, options = {}) {
    try {
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

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find active forms failed: ${error.message}`);
    }
  }

  /**
   * Find published forms
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of published forms
   */
  async findPublished(eventId = null, options = {}) {
    try {
      const filter = { is_published: true };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find published forms failed: ${error.message}`);
    }
  }

  /**
   * Find draft forms
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of draft forms
   */
  async findDraft(eventId = null, options = {}) {
    try {
      const filter = { status: STATUS.DRAFT };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find draft forms failed: ${error.message}`);
    }
  }

  /**
   * Find closed forms
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of closed forms
   */
  async findClosed(eventId = null, options = {}) {
    try {
      const now = new Date();
      const filter = {
        $or: [{ status: STATUS.CLOSED }, { close_date: { $lte: now } }],
      };

      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ close_date: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find closed forms failed: ${error.message}`);
    }
  }

  /**
   * Find form by slug
   * @param {string} slug - Form slug
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Form or null
   */
  async findBySlug(slug, options = {}) {
    try {
      const query = this.model.findOne({ slug });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find form by slug failed: ${error.message}`);
    }
  }

  /**
   * Find forms by status
   * @param {string} status - Form status
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms
   */
  async findByStatus(status, eventId = null, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const filter = { status };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find forms by status failed: ${error.message}`);
    }
  }

  /**
   * Find forms for a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms
   */
  async findByCategory(categoryId, options = {}) {
    try {
      const query = this.model
        .find({
          categories: categoryId,
          status: STATUS.ACTIVE,
          is_published: true,
        })
        .sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find forms by category failed: ${error.message}`);
    }
  }

  /**
   * Find nomination forms
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of nomination forms
   */
  async findNominationForms(eventId = null, options = {}) {
    try {
      return await this.findByType(FORM_TYPE.NOMINATION, eventId, options);
    } catch (error) {
      throw new Error(`Find nomination forms failed: ${error.message}`);
    }
  }

  /**
   * Find registration forms
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of registration forms
   */
  async findRegistrationForms(eventId = null, options = {}) {
    try {
      return await this.findByType(FORM_TYPE.REGISTRATION, eventId, options);
    } catch (error) {
      throw new Error(`Find registration forms failed: ${error.message}`);
    }
  }

  /**
   * Find forms with multi-category nomination enabled
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms
   */
  async findMultiCategoryForms(eventId = null, options = {}) {
    try {
      const filter = {
        "multi_category_nomination.enabled": true,
        form_type: FORM_TYPE.NOMINATION,
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find multi-category forms failed: ${error.message}`);
    }
  }

  /**
   * Find forms with duplicate detection enabled
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms
   */
  async findWithDuplicateDetection(eventId = null, options = {}) {
    try {
      const filter = { "duplicate_detection.enabled": true };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find forms with duplicate detection failed: ${error.message}`);
    }
  }

  /**
   * Find forms closing soon
   * @param {number} [daysThreshold=7] - Number of days to check
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of forms closing soon
   */
  async findClosingSoon(daysThreshold = 7, eventId = null, options = {}) {
    try {
      const now = new Date();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + daysThreshold);

      const filter = {
        close_date: { $gte: now, $lte: futureDate },
        status: STATUS.ACTIVE,
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ close_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find forms closing soon failed: ${error.message}`);
    }
  }

  /**
   * Get form statistics
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @returns {Promise<Object>} - Form statistics
   */
  async getStatistics(eventId = null) {
    try {
      const matchStage = eventId ? { event: eventId } : {};

      const [stats] = await this.model.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            draft: [{ $match: { status: STATUS.DRAFT } }, { $count: "count" }],
            closed: [{ $match: { status: STATUS.CLOSED } }, { $count: "count" }],
            archived: [{ $match: { status: STATUS.ARCHIVED } }, { $count: "count" }],
            published: [{ $match: { is_published: true } }, { $count: "count" }],
            byType: [
              {
                $group: {
                  _id: "$form_type",
                  count: { $sum: 1 },
                },
              },
              { $sort: { count: -1 } },
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
            avgSubmissionsPerForm: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$total_submissions" },
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
        archived: stats?.archived[0]?.count || 0,
        published: stats?.published[0]?.count || 0,
        byType: stats?.byType || [],
        totalSubmissions: stats?.totalSubmissions[0]?.total || 0,
        totalApproved: stats?.totalApproved[0]?.total || 0,
        totalDuplicates: stats?.totalDuplicates[0]?.total || 0,
        averageSubmissionsPerForm:
          Math.round((stats?.avgSubmissionsPerForm[0]?.average || 0) * 10) / 10,
      };
    } catch (error) {
      throw new Error(`Get form statistics failed: ${error.message}`);
    }
  }

  /**
   * Get form with submission stats
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Form with detailed statistics
   */
  async getWithStats(formId) {
    try {
      const [result] = await this.model.aggregate([
        { $match: { _id: formId } },
        {
          $lookup: {
            from: "formsubmissions",
            localField: "_id",
            foreignField: "form",
            as: "submissions",
          },
        },
        {
          $addFields: {
            stats: {
              total: { $size: "$submissions" },
              pending: {
                $size: {
                  $filter: {
                    input: "$submissions",
                    as: "sub",
                    cond: { $eq: ["$$sub.status", "pending"] },
                  },
                },
              },
              approved: {
                $size: {
                  $filter: {
                    input: "$submissions",
                    as: "sub",
                    cond: { $eq: ["$$sub.status", "approved"] },
                  },
                },
              },
              rejected: {
                $size: {
                  $filter: {
                    input: "$submissions",
                    as: "sub",
                    cond: { $eq: ["$$sub.status", "rejected"] },
                  },
                },
              },
              duplicates: {
                $size: {
                  $filter: {
                    input: "$submissions",
                    as: "sub",
                    cond: { $eq: ["$$sub.duplicate_check.is_duplicate", true] },
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            submissions: 0,
          },
        },
      ]);

      return result;
    } catch (error) {
      throw new Error(`Get form with stats failed: ${error.message}`);
    }
  }

  /**
   * Update form field
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {string} fieldId - Field ID
   * @param {Object} updates - Field updates
   * @returns {Promise<Object>} - Updated form
   */
  async updateField(formId, fieldId, updates) {
    try {
      const form = await this.model.findById(formId);

      if (!form) {
        throw new Error("Form not found");
      }

      const fieldIndex = form.fields.findIndex((f) => f.field_id === fieldId);

      if (fieldIndex === -1) {
        throw new Error("Field not found");
      }

      form.fields[fieldIndex] = {
        ...form.fields[fieldIndex].toObject(),
        ...updates,
      };

      return await form.save();
    } catch (error) {
      throw new Error(`Update form field failed: ${error.message}`);
    }
  }

  /**
   * Add field to form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} fieldData - Field data
   * @returns {Promise<Object>} - Updated form
   */
  async addField(formId, fieldData) {
    try {
      const form = await this.model.findById(formId);

      if (!form) {
        throw new Error("Form not found");
      }

      return await form.addField(fieldData);
    } catch (error) {
      throw new Error(`Add form field failed: ${error.message}`);
    }
  }

  /**
   * Remove field from form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {string} fieldId - Field ID
   * @returns {Promise<Object>} - Updated form
   */
  async removeField(formId, fieldId) {
    try {
      const form = await this.model.findById(formId);

      if (!form) {
        throw new Error("Form not found");
      }

      return await form.removeField(fieldId);
    } catch (error) {
      throw new Error(`Remove form field failed: ${error.message}`);
    }
  }

  /**
   * Publish form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Updated form
   */
  async publish(formId) {
    try {
      return await this.updateById(formId, {
        is_published: true,
        status: STATUS.ACTIVE,
      });
    } catch (error) {
      throw new Error(`Publish form failed: ${error.message}`);
    }
  }

  /**
   * Unpublish form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Updated form
   */
  async unpublish(formId) {
    try {
      return await this.updateById(formId, {
        is_published: false,
      });
    } catch (error) {
      throw new Error(`Unpublish form failed: ${error.message}`);
    }
  }

  /**
   * Close form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Updated form
   */
  async close(formId) {
    try {
      return await this.updateById(formId, {
        status: STATUS.CLOSED,
      });
    } catch (error) {
      throw new Error(`Close form failed: ${error.message}`);
    }
  }

  /**
   * Auto-close expired forms
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @returns {Promise<Object>} - Update result
   */
  async autoCloseExpired(eventId = null) {
    try {
      const now = new Date();
      const filter = {
        close_date: { $lt: now },
        status: STATUS.ACTIVE,
      };

      if (eventId) filter.event = eventId;

      const result = await this.model.updateMany(filter, {
        $set: { status: STATUS.CLOSED },
      });

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Auto close expired forms failed: ${error.message}`);
    }
  }
}

export default new FormRepository();
