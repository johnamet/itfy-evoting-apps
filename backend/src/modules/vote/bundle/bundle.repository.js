/**
 * Bundle Repository
 * This file defines the BundleRepository class which extends the BaseRepository
 * It contains bundle-specific data access methods
 */

import { BaseRepository } from "../../shared/base.repository.js";
import BundleModel from "./bundle.model.js";
import { BUNDLE_STATUS as STATUS } from "../../../utils/constants/vote.constants.js";

class BundleRepository extends BaseRepository {
  constructor() {
    super(BundleModel);
  }

  /**
   * Find all bundles for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of bundles
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model.find({ event: eventId }).sort({ display_order: 1, price: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find bundles by event failed: ${error.message}`);
    }
  }

  /**
   * Find available bundles for an event (active and within validity)
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of available bundles
   */
  async findAvailableByEvent(eventId, options = {}) {
    try {
      const now = new Date();
      const query = this.model
        .find({
          event: eventId,
          status: STATUS.ACTIVE,
          $or: [
            { validity_start: null, validity_end: null },
            { validity_start: { $lte: now }, validity_end: { $gte: now } },
            { validity_start: null, validity_end: { $gte: now } },
            { validity_start: { $lte: now }, validity_end: null },
          ],
        })
        .sort({ display_order: 1, price: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find available bundles by event failed: ${error.message}`);
    }
  }

  /**
   * Find featured bundles
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of featured bundles
   */
  async findFeatured(eventId = null, options = {}) {
    try {
      const filter = { is_featured: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ display_order: 1, price: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find featured bundles failed: ${error.message}`);
    }
  }

  /**
   * Find popular bundles (most purchased)
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [limit=5] - Maximum number to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of popular bundles
   */
  async findPopular(eventId = null, limit = 5, options = {}) {
    try {
      const filter = { is_popular: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ total_purchases: -1 }).limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find popular bundles failed: ${error.message}`);
    }
  }

  /**
   * Find bundle by slug
   * @param {string} slug - Bundle slug
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Bundle or null
   */
  async findBySlug(slug, options = {}) {
    try {
      const query = this.model.findOne({ slug });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find bundle by slug failed: ${error.message}`);
    }
  }

  /**
   * Find bundles by status
   * @param {string} status - Bundle status
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of bundles
   */
  async findByStatus(status, eventId = null, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const filter = { status };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ display_order: 1, price: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find bundles by status failed: ${error.message}`);
    }
  }

  /**
   * Find bundles applicable to a category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of bundles
   */
  async findByCategory(categoryId, options = {}) {
    try {
      const query = this.model
        .find({
          $or: [
            { categories: categoryId },
            { categories: { $size: 0 } }, // Unrestricted bundles
          ],
          status: STATUS.ACTIVE,
        })
        .sort({ display_order: 1, price: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find bundles by category failed: ${error.message}`);
    }
  }

  /**
   * Find bundles by price range
   * @param {number} minPrice - Minimum price
   * @param {number} maxPrice - Maximum price
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of bundles
   */
  async findByPriceRange(minPrice, maxPrice, eventId = null, options = {}) {
    try {
      const filter = {
        price: { $gte: minPrice, $lte: maxPrice },
        status: STATUS.ACTIVE,
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ price: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find bundles by price range failed: ${error.message}`);
    }
  }

  /**
   * Find bundles expiring soon
   * @param {number} [days=7] - Number of days threshold
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Bundles expiring soon
   */
  async findExpiringSoon(days = 7, eventId = null, options = {}) {
    try {
      const now = new Date();
      const threshold = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

      const filter = {
        status: STATUS.ACTIVE,
        validity_end: {
          $gte: now,
          $lte: threshold,
        },
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ validity_end: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find bundles expiring soon failed: ${error.message}`);
    }
  }

  /**
   * Find expired bundles
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Expired bundles
   */
  async findExpired(eventId = null, options = {}) {
    try {
      const now = new Date();
      const filter = {
        validity_end: { $lt: now },
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ validity_end: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find expired bundles failed: ${error.message}`);
    }
  }

  /**
   * Get best value bundles (lowest price per vote)
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [limit=5] - Maximum number to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Best value bundles
   */
  async findBestValue(eventId, limit = 5, options = {}) {
    try {
      const bundles = await this.aggregate([
        {
          $match: {
            event: eventId,
            status: STATUS.ACTIVE,
          },
        },
        {
          $addFields: {
            pricePerVote: { $divide: ["$price", "$vote_count"] },
          },
        },
        { $sort: { pricePerVote: 1 } },
        { $limit: limit },
      ]);

      return bundles;
    } catch (error) {
      throw new Error(`Find best value bundles failed: ${error.message}`);
    }
  }

  /**
   * Record a purchase for a bundle
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {number} amount - Amount paid
   * @returns {Promise<Object>} - Updated bundle
   */
  async recordPurchase(bundleId, amount) {
    try {
      const bundle = await this.model.findById(bundleId);

      if (!bundle) {
        throw new Error("Bundle not found");
      }

      return await bundle.recordPurchase(amount);
    } catch (error) {
      throw new Error(`Record purchase failed: ${error.message}`);
    }
  }

  /**
   * Toggle featured status
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated bundle
   */
  async toggleFeatured(bundleId, options = {}) {
    try {
      const bundle = await this.findById(bundleId);

      if (!bundle) {
        throw new Error("Bundle not found");
      }

      return await this.updateById(bundleId, { is_featured: !bundle.is_featured }, options);
    } catch (error) {
      throw new Error(`Toggle featured failed: ${error.message}`);
    }
  }

  /**
   * Toggle popular status
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated bundle
   */
  async togglePopular(bundleId, options = {}) {
    try {
      const bundle = await this.findById(bundleId);

      if (!bundle) {
        throw new Error("Bundle not found");
      }

      return await this.updateById(bundleId, { is_popular: !bundle.is_popular }, options);
    } catch (error) {
      throw new Error(`Toggle popular failed: ${error.message}`);
    }
  }

  /**
   * Update bundle status
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {string} status - New status
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated bundle
   */
  async updateStatus(bundleId, status, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      return await this.updateById(bundleId, { status }, options);
    } catch (error) {
      throw new Error(`Update status failed: ${error.message}`);
    }
  }

  /**
   * Update display order
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {number} order - New display order
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated bundle
   */
  async updateDisplayOrder(bundleId, order, options = {}) {
    try {
      return await this.updateById(bundleId, { display_order: order }, options);
    } catch (error) {
      throw new Error(`Update display order failed: ${error.message}`);
    }
  }

  /**
   * Bulk update display orders
   * @param {Array<{id: string, order: number}>} updates - Array of {id, order} objects
   * @returns {Promise<Array>} - Updated bundles
   */
  async bulkUpdateDisplayOrder(updates) {
    try {
      const bulkOps = updates.map(({ id, order }) => ({
        updateOne: {
          filter: { _id: id },
          update: { $set: { display_order: order, updated_at: Date.now() } },
        },
      }));

      await this.model.bulkWrite(bulkOps);

      const ids = updates.map((u) => u.id);
      return await this.model.find({ _id: { $in: ids } }).sort({ display_order: 1 }).exec();
    } catch (error) {
      throw new Error(`Bulk update display order failed: ${error.message}`);
    }
  }

  /**
   * Get bundle statistics for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Bundle statistics
   */
  async getStatisticsByEvent(eventId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            inactive: [{ $match: { status: STATUS.INACTIVE } }, { $count: "count" }],
            totalRevenue: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_revenue" },
                },
              },
            ],
            totalPurchases: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_purchases" },
                },
              },
            ],
            avgPrice: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$price" },
                },
              },
            ],
            avgPurchases: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$total_purchases" },
                },
              },
            ],
            mostPopular: [
              { $sort: { total_purchases: -1 } },
              { $limit: 1 },
              {
                $project: {
                  name: 1,
                  total_purchases: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            inactive: { $arrayElemAt: ["$inactive.count", 0] },
            totalRevenue: { $arrayElemAt: ["$totalRevenue.total", 0] },
            totalPurchases: { $arrayElemAt: ["$totalPurchases.total", 0] },
            averagePrice: { $arrayElemAt: ["$avgPrice.average", 0] },
            averagePurchases: { $arrayElemAt: ["$avgPurchases.average", 0] },
            mostPopular: { $arrayElemAt: ["$mostPopular", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        inactive: stats?.inactive || 0,
        totalRevenue: Math.round((stats?.totalRevenue || 0) * 100) / 100,
        totalPurchases: stats?.totalPurchases || 0,
        averagePrice: Math.round((stats?.averagePrice || 0) * 100) / 100,
        averagePurchases: Math.round((stats?.averagePurchases || 0) * 10) / 10,
        mostPopular: stats?.mostPopular || null,
      };
    } catch (error) {
      throw new Error(`Get statistics by event failed: ${error.message}`);
    }
  }

  /**
   * Get overall bundle statistics
   * @returns {Promise<Object>} - Overall statistics
   */
  async getOverallStatistics() {
    try {
      const [stats] = await this.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            totalRevenue: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_revenue" },
                },
              },
            ],
            totalPurchases: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$total_purchases" },
                },
              },
            ],
            avgPrice: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$price" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            totalRevenue: { $arrayElemAt: ["$totalRevenue.total", 0] },
            totalPurchases: { $arrayElemAt: ["$totalPurchases.total", 0] },
            averagePrice: { $arrayElemAt: ["$avgPrice.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        totalRevenue: Math.round((stats?.totalRevenue || 0) * 100) / 100,
        totalPurchases: stats?.totalPurchases || 0,
        averagePrice: Math.round((stats?.averagePrice || 0) * 100) / 100,
      };
    } catch (error) {
      throw new Error(`Get overall statistics failed: ${error.message}`);
    }
  }

  /**
   * Get bundle performance comparison
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Array>} - Bundle performance data
   */
  async getBundlePerformance(eventId) {
    try {
      const performance = await this.aggregate([
        { $match: { event: eventId } },
        {
          $project: {
            name: 1,
            price: 1,
            vote_count: 1,
            total_purchases: 1,
            total_revenue: 1,
            pricePerVote: { $divide: ["$price", "$vote_count"] },
            revenuePerPurchase: {
              $cond: {
                if: { $eq: ["$total_purchases", 0] },
                then: 0,
                else: { $divide: ["$total_revenue", "$total_purchases"] },
              },
            },
          },
        },
        { $sort: { total_revenue: -1 } },
      ]);

      return performance;
    } catch (error) {
      throw new Error(`Get bundle performance failed: ${error.message}`);
    }
  }

  /**
   * Check if bundle applies to category
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<boolean>} - True if applies
   */
  async appliesToCategory(bundleId, categoryId) {
    try {
      const bundle = await this.model.findById(bundleId);

      if (!bundle) {
        throw new Error("Bundle not found");
      }

      return bundle.appliesToCategory(categoryId);
    } catch (error) {
      throw new Error(`Check bundle category application failed: ${error.message}`);
    }
  }

  /**
   * Create a new bundle
   * @param {Object} bundleData - Bundle data
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} - Created bundle
   */
  async createBundle(bundleData, options = {}) {
    try {
      return await this.create(bundleData, options);
    } catch (error) {
      throw new Error(`Create bundle failed: ${error.message}`);
    }
  }

  /**
   * Update a bundle
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} updateData - Data to update
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Updated bundle
   */
  async updateBundle(bundleId, updateData, options = {}) {
    try {
      return await this.updateById(bundleId, updateData, options);
    } catch (error) {
      throw new Error(`Update bundle failed: ${error.message}`);
    }
  }

  /**
   * Delete a bundle (soft delete)
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Deleted bundle
   */
  async deleteBundle(bundleId, options = {}) {
    try {
      return await this.delete({ _id: bundleId }, options);
    } catch (error) {
      throw new Error(`Delete bundle failed: ${error.message}`);
    }
  }

  /**
   * Restore a deleted bundle
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Restored bundle
   */
  async restoreBundle(bundleId, options = {}) {
    try {
      return await this.restore({ _id: bundleId }, options);
    } catch (error) {
      throw new Error(`Restore bundle failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a bundle
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Deleted bundle
   */
  async permanentlyDeleteBundle(bundleId, options = {}) {
    try {
      return await this.forceDelete({ _id: bundleId }, options);
    } catch (error) {
      throw new Error(`Permanently delete bundle failed: ${error.message}`);
    }
  }

  /**
   * Duplicate a bundle (useful for creating similar bundles)
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID to duplicate
   * @param {Object} [overrides] - Fields to override in the duplicate
   * @returns {Promise<Object>} - Created duplicate bundle
   */
  async duplicateBundle(bundleId, overrides = {}) {
    try {
      const originalBundle = await this.findById(bundleId);

      if (!originalBundle) {
        throw new Error("Bundle not found");
      }

      // Remove fields that should not be duplicated
      const bundleData = {
        name: `${originalBundle.name} (Copy)`,
        description: originalBundle.description,
        event: originalBundle.event,
        categories: originalBundle.categories,
        vote_count: originalBundle.vote_count,
        price: originalBundle.price,
        currency: originalBundle.currency,
        discount_percentage: originalBundle.discount_percentage,
        is_featured: false, // Reset featured status
        is_popular: false, // Reset popular status
        display_order: originalBundle.display_order,
        validity_start: originalBundle.validity_start,
        validity_end: originalBundle.validity_end,
        features: originalBundle.features,
        ...overrides,
      };

      return await this.create(bundleData);
    } catch (error) {
      throw new Error(`Duplicate bundle failed: ${error.message}`);
    }
  }
}

export default new BundleRepository();