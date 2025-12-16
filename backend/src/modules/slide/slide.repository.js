/**
 * Slide Repository
 * This file defines the SlideRepository class which extends the BaseRepository
 * It contains slide-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository";
import SlideModel from "../models/slide.model";
import { SLIDE_STATUS, SLIDE_TYPE } from "../../utils/constants/slide.constants";

class SlideRepository extends BaseRepository {
  constructor() {
    super(SlideModel);
  }

  /**
   * Create a new slide
   * @param {Object} slideData - Slide data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created slide
   */
  async create(slideData, options = {}) {
    try {
      // Validate required fields
      if (!slideData.title) {
        throw new Error("Slide title is required");
      }
      if (!slideData.image || !slideData.image.url) {
        throw new Error("Slide image is required");
      }

      return await super.create(slideData, options);
    } catch (error) {
      throw new Error(`Create slide failed: ${error.message}`);
    }
  }

  /**
   * Update a slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @param {Object} updates - Update data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Updated slide
   */
  async update(slideId, updates, options = {}) {
    try {
      return await this.updateById(slideId, updates, options);
    } catch (error) {
      throw new Error(`Update slide failed: ${error.message}`);
    }
  }

  /**
   * Soft delete a slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Deleted slide
   */
  async delete(slideId, options = {}) {
    try {
      return await super.delete({ _id: slideId }, options);
    } catch (error) {
      throw new Error(`Delete slide failed: ${error.message}`);
    }
  }

  /**
   * Restore a soft-deleted slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Restored slide
   */
  async restore(slideId, options = {}) {
    try {
      return await super.restore({ _id: slideId }, options);
    } catch (error) {
      throw new Error(`Restore slide failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Force deleted slide
   */
  async forceDelete(slideId, options = {}) {
    try {
      return await super.forceDelete({ _id: slideId }, options);
    } catch (error) {
      throw new Error(`Force delete slide failed: ${error.message}`);
    }
  }

  /**
   * Find active slides
   * @param {string} [slideType] - Optional slide type filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of active slides
   */
  async findActive(slideType = null, options = {}) {
    try {
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

      const query = this.model.find(filter).sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find active slides failed: ${error.message}`);
    }
  }

  /**
   * Find published slides
   * @param {string} [slideType] - Optional slide type filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of published slides
   */
  async findPublished(slideType = null, options = {}) {
    try {
      const filter = { is_published: true };
      if (slideType) filter.slide_type = slideType;

      const query = this.model.find(filter).sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find published slides failed: ${error.message}`);
    }
  }

  /**
   * Find draft slides
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of draft slides
   */
  async findDraft(options = {}) {
    try {
      const query = this.model.find({ status: SLIDE_STATUS.DRAFT }).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find draft slides failed: ${error.message}`);
    }
  }

  /**
   * Find scheduled slides
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of scheduled slides
   */
  async findScheduled(options = {}) {
    try {
      const now = new Date();
      const query = this.model
        .find({
          status: SLIDE_STATUS.SCHEDULED,
          start_date: { $gt: now },
        })
        .sort({ start_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find scheduled slides failed: ${error.message}`);
    }
  }

  /**
   * Find slides by type
   * @param {string} slideType - Slide type
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of slides
   */
  async findByType(slideType, options = {}) {
    try {
      if (!Object.values(SLIDE_TYPE).includes(slideType)) {
        throw new Error(`Invalid slide type: ${slideType}`);
      }

      const query = this.model.find({ slide_type: slideType }).sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find slides by type failed: ${error.message}`);
    }
  }

  /**
   * Find slides by status
   * @param {string} status - Slide status
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of slides
   */
  async findByStatus(status, options = {}) {
    try {
      if (!Object.values(SLIDE_STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const query = this.model.find({ status }).sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find slides by status failed: ${error.message}`);
    }
  }

  /**
   * Find slides by event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of slides
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model
        .find({ event: eventId, is_published: true })
        .sort({ display_order: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find slides by event failed: ${error.message}`);
    }
  }

  /**
   * Find hero slides
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of hero slides
   */
  async findHeroSlides(options = {}) {
    try {
      return await this.findActive(SLIDE_TYPE.HERO, options);
    } catch (error) {
      throw new Error(`Find hero slides failed: ${error.message}`);
    }
  }

  /**
   * Find banner slides
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of banner slides
   */
  async findBannerSlides(options = {}) {
    try {
      return await this.findActive(SLIDE_TYPE.BANNER, options);
    } catch (error) {
      throw new Error(`Find banner slides failed: ${error.message}`);
    }
  }

  /**
   * Find expired slides
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of expired slides
   */
  async findExpired(options = {}) {
    try {
      const now = new Date();
      const query = this.model
        .find({
          end_date: { $lt: now },
          status: { $ne: SLIDE_STATUS.INACTIVE },
        })
        .sort({ end_date: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find expired slides failed: ${error.message}`);
    }
  }

  /**
   * Find slides expiring soon
   * @param {number} [daysThreshold=7] - Days threshold
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of slides expiring soon
   */
  async findExpiringSoon(daysThreshold = 7, options = {}) {
    try {
      const now = new Date();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + daysThreshold);

      const query = this.model
        .find({
          end_date: { $gte: now, $lte: futureDate },
          status: SLIDE_STATUS.ACTIVE,
        })
        .sort({ end_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find expiring slides failed: ${error.message}`);
    }
  }

  /**
   * Get slide statistics
   * @param {string} [slideType] - Optional slide type filter
   * @returns {Promise<Object>} - Slide statistics
   */
  async getStatistics(slideType = null) {
    try {
      const matchStage = slideType ? { slide_type: slideType } : {};

      const [stats] = await this.model.aggregate([
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
    } catch (error) {
      throw new Error(`Get slide statistics failed: ${error.message}`);
    }
  }

  /**
   * Increment view count
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @param {number} [count=1] - Increment count
   * @returns {Promise<Object>} - Updated slide
   */
  async incrementViews(slideId, count = 1) {
    try {
      const slide = await this.model.findById(slideId);

      if (!slide) {
        throw new Error("Slide not found");
      }

      return await slide.incrementViews(count);
    } catch (error) {
      throw new Error(`Increment slide views failed: ${error.message}`);
    }
  }

  /**
   * Increment click count
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @param {number} [count=1] - Increment count
   * @returns {Promise<Object>} - Updated slide
   */
  async incrementClicks(slideId, count = 1) {
    try {
      const slide = await this.model.findById(slideId);

      if (!slide) {
        throw new Error("Slide not found");
      }

      return await slide.incrementClicks(count);
    } catch (error) {
      throw new Error(`Increment slide clicks failed: ${error.message}`);
    }
  }

  /**
   * Publish slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @returns {Promise<Object>} - Updated slide
   */
  async publish(slideId) {
    try {
      const slide = await this.model.findById(slideId);

      if (!slide) {
        throw new Error("Slide not found");
      }

      return await slide.publish();
    } catch (error) {
      throw new Error(`Publish slide failed: ${error.message}`);
    }
  }

  /**
   * Unpublish slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @returns {Promise<Object>} - Updated slide
   */
  async unpublish(slideId) {
    try {
      const slide = await this.model.findById(slideId);

      if (!slide) {
        throw new Error("Slide not found");
      }

      return await slide.unpublish();
    } catch (error) {
      throw new Error(`Unpublish slide failed: ${error.message}`);
    }
  }

  /**
   * Activate slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @returns {Promise<Object>} - Updated slide
   */
  async activate(slideId) {
    try {
      const slide = await this.model.findById(slideId);

      if (!slide) {
        throw new Error("Slide not found");
      }

      return await slide.activate();
    } catch (error) {
      throw new Error(`Activate slide failed: ${error.message}`);
    }
  }

  /**
   * Deactivate slide
   * @param {string|mongoose.Types.ObjectId} slideId - Slide ID
   * @returns {Promise<Object>} - Updated slide
   */
  async deactivate(slideId) {
    try {
      const slide = await this.model.findById(slideId);

      if (!slide) {
        throw new Error("Slide not found");
      }

      return await slide.deactivate();
    } catch (error) {
      throw new Error(`Deactivate slide failed: ${error.message}`);
    }
  }

  /**
   * Reorder slides
   * @param {Array<{id: string, order: number}>} slideOrders - Array of slide IDs and their new orders
   * @returns {Promise<Object>} - Update result
   */
  async reorderSlides(slideOrders) {
    try {
      const bulkOps = slideOrders.map(({ id, order }) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { display_order: order } },
        },
      }));

      const result = await this.model.bulkWrite(bulkOps);

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Reorder slides failed: ${error.message}`);
    }
  }

  /**
   * Auto-deactivate expired slides
   * @returns {Promise<Object>} - Update result
   */
  async autoDeactivateExpired() {
    try {
      const now = new Date();
      const result = await this.model.updateMany(
        {
          end_date: { $lt: now },
          status: SLIDE_STATUS.ACTIVE,
        },
        {
          $set: { status: SLIDE_STATUS.INACTIVE },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Auto deactivate expired slides failed: ${error.message}`);
    }
  }

  /**
   * Auto-activate scheduled slides
   * @returns {Promise<Object>} - Update result
   */
  async autoActivateScheduled() {
    try {
      const now = new Date();
      const result = await this.model.updateMany(
        {
          status: SLIDE_STATUS.SCHEDULED,
          start_date: { $lte: now },
        },
        {
          $set: { status: SLIDE_STATUS.ACTIVE },
        }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Auto activate scheduled slides failed: ${error.message}`);
    }
  }

  /**
   * Bulk update slide status
   * @param {Array<string|mongoose.Types.ObjectId>} slideIds - Slide IDs
   * @param {string} status - New status
   * @returns {Promise<Object>} - Update result
   */
  async bulkUpdateStatus(slideIds, status) {
    try {
      if (!Object.values(SLIDE_STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const result = await this.model.updateMany(
        { _id: { $in: slideIds } },
        { $set: { status } }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Bulk update slide status failed: ${error.message}`);
    }
  }
}

export default new SlideRepository();
