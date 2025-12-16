/**
 * Coupon Repository
 * This file defines the CouponRepository class which extends the BaseRepository
 * It contains coupon-specific data access methods
 */

import { BaseRepository } from "../../shared/base.repository.js";
import CouponModel from "./coupon.model.js";
import { COUPON_STATUS as STATUS } from "../../../utils/constants/vote.constants.js";

class CouponRepository extends BaseRepository {
  constructor() {
    super(CouponModel);
  }

  /**
   * Find all coupons for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of coupons
   */
  async findByEvent(eventId, options = {}) {
    try {
      const query = this.model.find({ event: eventId }).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find coupons by event failed: ${error.message}`);
    }
  }

  /**
   * Find active coupons for an event (within validity period)
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of active coupons
   */
  async findActiveByEvent(eventId, options = {}) {
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
          $expr: {
            $or: [
              { $eq: ["$max_total_uses", null] },
              { $lt: ["$current_redemptions", "$max_total_uses"] },
            ],
          },
        })
        .sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find active coupons by event failed: ${error.message}`);
    }
  }

  /**
   * Find public coupons (visible to all users)
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of public coupons
   */
  async findPublic(eventId = null, options = {}) {
    try {
      const filter = { is_public: true, status: STATUS.ACTIVE };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find public coupons failed: ${error.message}`);
    }
  }

  /**
   * Find coupon by code
   * @param {string} code - Coupon code
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Coupon or null
   */
  async findByCode(code, options = {}) {
    try {
      const query = this.model.findOne({ code: code.toUpperCase() });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find coupon by code failed: ${error.message}`);
    }
  }

  /**
   * Find coupons by status
   * @param {string} status - Coupon status
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of coupons
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
      throw new Error(`Find coupons by status failed: ${error.message}`);
    }
  }

  /**
   * Find expired coupons
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of expired coupons
   */
  async findExpired(eventId = null, options = {}) {
    try {
      const now = new Date();
      const filter = {
        $or: [
          { status: STATUS.EXPIRED },
          { validity_end: { $lt: now } },
          { $expr: { $gte: ["$current_redemptions", "$max_total_uses"] } },
        ],
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ validity_end: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find expired coupons failed: ${error.message}`);
    }
  }

  /**
   * Find coupons expiring soon
   * @param {number} [days=7] - Number of days threshold
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Coupons expiring soon
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
      throw new Error(`Find coupons expiring soon failed: ${error.message}`);
    }
  }

  /**
   * Find coupons applicable to a bundle
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of applicable coupons
   */
  async findByBundle(bundleId, options = {}) {
    try {
      const query = this.model
        .find({
          $or: [
            { applicable_bundles: bundleId },
            { applicable_bundles: { $size: 0 } }, // Unrestricted coupons
          ],
          status: STATUS.ACTIVE,
        })
        .sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find coupons by bundle failed: ${error.message}`);
    }
  }

  /**
   * Find most used coupons
   * @param {number} [limit=10] - Maximum number to return
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Most used coupons
   */
  async findMostUsed(limit = 10, eventId = null, options = {}) {
    try {
      const filter = {};
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ current_redemptions: -1 }).limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find most used coupons failed: ${error.message}`);
    }
  }

  /**
   * Find unused coupons (zero redemptions)
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Unused coupons
   */
  async findUnused(eventId = null, options = {}) {
    try {
      const filter = { current_redemptions: 0 };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ created_at: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find unused coupons failed: ${error.message}`);
    }
  }

  /**
   * Find coupons near usage limit
   * @param {number} [percentage=90] - Usage percentage threshold
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Coupons near limit
   */
  async findNearLimit(percentage = 90, eventId = null, options = {}) {
    try {
      const filter = {
        max_total_uses: { $ne: null },
        $expr: {
          $gte: [
            { $multiply: [{ $divide: ["$current_redemptions", "$max_total_uses"] }, 100] },
            percentage,
          ],
        },
        status: STATUS.ACTIVE,
      };
      if (eventId) filter.event = eventId;

      const query = this.model.find(filter).sort({ current_redemptions: -1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find coupons near limit failed: ${error.message}`);
    }
  }

  /**
   * Validate coupon for use
   * @param {string} code - Coupon code
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {number} bundlePrice - Bundle price
   * @returns {Promise<Object>} - Validation result
   */
  async validateCoupon(code, bundleId, bundlePrice) {
    try {
      const coupon = await this.model.findOne({ code: code.toUpperCase() });

      if (!coupon) {
        return { valid: false, message: "Coupon not found" };
      }

      return coupon.validateForBundle(bundleId, bundlePrice);
    } catch (error) {
      throw new Error(`Validate coupon failed: ${error.message}`);
    }
  }

  /**
   * Calculate discount for coupon
   * @param {string} code - Coupon code
   * @param {number} bundlePrice - Bundle price
   * @param {number} bundleVotes - Bundle votes
   * @returns {Promise<Object>} - Discount calculation
   */
  async calculateDiscount(code, bundlePrice, bundleVotes) {
    try {
      const coupon = await this.model.findOne({ code: code.toUpperCase() });

      if (!coupon) {
        throw new Error("Coupon not found");
      }

      return coupon.calculateDiscount(bundlePrice, bundleVotes);
    } catch (error) {
      throw new Error(`Calculate discount failed: ${error.message}`);
    }
  }

  /**
   * Redeem a coupon
   * @param {string} code - Coupon code
   * @returns {Promise<Object>} - Updated coupon
   */
  async redeem(code) {
    try {
      const coupon = await this.model.findOne({ code: code.toUpperCase() });

      if (!coupon) {
        throw new Error("Coupon not found");
      }

      return await coupon.redeem();
    } catch (error) {
      throw new Error(`Redeem coupon failed: ${error.message}`);
    }
  }

  /**
   * Update coupon status
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
   * @param {string} status - New status
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated coupon
   */
  async updateStatus(couponId, status, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      return await this.updateById(couponId, { status }, options);
    } catch (error) {
      throw new Error(`Update status failed: ${error.message}`);
    }
  }

  /**
   * Toggle public visibility
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated coupon
   */
  async togglePublic(couponId, options = {}) {
    try {
      const coupon = await this.findById(couponId);

      if (!coupon) {
        throw new Error("Coupon not found");
      }

      return await this.updateById(couponId, { is_public: !coupon.is_public }, options);
    } catch (error) {
      throw new Error(`Toggle public failed: ${error.message}`);
    }
  }

  /**
   * Get coupon statistics for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Coupon statistics
   */
  async getStatisticsByEvent(eventId) {
    try {
      const [stats] = await this.aggregate([
        { $match: { event: eventId } },
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            expired: [{ $match: { status: STATUS.EXPIRED } }, { $count: "count" }],
            public: [{ $match: { is_public: true } }, { $count: "count" }],
            totalRedemptions: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$current_redemptions" },
                },
              },
            ],
            avgRedemptions: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$current_redemptions" },
                },
              },
            ],
            mostUsed: [
              { $sort: { current_redemptions: -1 } },
              { $limit: 1 },
              {
                $project: {
                  code: 1,
                  current_redemptions: 1,
                },
              },
            ],
            byDiscountType: [
              {
                $group: {
                  _id: "$discount_type",
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            expired: { $arrayElemAt: ["$expired.count", 0] },
            public: { $arrayElemAt: ["$public.count", 0] },
            totalRedemptions: { $arrayElemAt: ["$totalRedemptions.total", 0] },
            averageRedemptions: { $arrayElemAt: ["$avgRedemptions.average", 0] },
            mostUsed: { $arrayElemAt: ["$mostUsed", 0] },
            byDiscountType: "$byDiscountType",
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        expired: stats?.expired || 0,
        public: stats?.public || 0,
        totalRedemptions: stats?.totalRedemptions || 0,
        averageRedemptions: Math.round((stats?.averageRedemptions || 0) * 10) / 10,
        mostUsed: stats?.mostUsed || null,
        byDiscountType: stats?.byDiscountType || [],
      };
    } catch (error) {
      throw new Error(`Get statistics by event failed: ${error.message}`);
    }
  }

  /**
   * Get overall coupon statistics
   * @returns {Promise<Object>} - Overall statistics
   */
  async getOverallStatistics() {
    try {
      const [stats] = await this.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            active: [{ $match: { status: STATUS.ACTIVE } }, { $count: "count" }],
            expired: [{ $match: { status: STATUS.EXPIRED } }, { $count: "count" }],
            totalRedemptions: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$current_redemptions" },
                },
              },
            ],
            avgRedemptions: [
              {
                $group: {
                  _id: null,
                  average: { $avg: "$current_redemptions" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            expired: { $arrayElemAt: ["$expired.count", 0] },
            totalRedemptions: { $arrayElemAt: ["$totalRedemptions.total", 0] },
            averageRedemptions: { $arrayElemAt: ["$avgRedemptions.average", 0] },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        active: stats?.active || 0,
        expired: stats?.expired || 0,
        totalRedemptions: stats?.totalRedemptions || 0,
        averageRedemptions: Math.round((stats?.averageRedemptions || 0) * 10) / 10,
      };
    } catch (error) {
      throw new Error(`Get overall statistics failed: ${error.message}`);
    }
  }

  /**
   * Get coupon performance (redemption rate)
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Array>} - Coupon performance data
   */
  async getCouponPerformance(eventId) {
    try {
      const performance = await this.aggregate([
        { $match: { event: eventId } },
        {
          $project: {
            code: 1,
            discount_type: 1,
            discount_value: 1,
            current_redemptions: 1,
            max_total_uses: 1,
            redemptionRate: {
              $cond: {
                if: { $eq: ["$max_total_uses", null] },
                then: null,
                else: {
                  $multiply: [{ $divide: ["$current_redemptions", "$max_total_uses"] }, 100],
                },
              },
            },
          },
        },
        { $sort: { current_redemptions: -1 } },
      ]);

      return performance;
    } catch (error) {
      throw new Error(`Get coupon performance failed: ${error.message}`);
    }
  }

  /**
   * Auto-expire coupons that have passed their validity or reached max uses
   * @returns {Promise<number>} - Number of coupons expired
   */
  async autoExpireCoupons() {
    try {
      const now = new Date();

      const result = await this.model.updateMany(
        {
          status: STATUS.ACTIVE,
          $or: [
            { validity_end: { $lt: now } },
            { $expr: { $gte: ["$current_redemptions", "$max_total_uses"] } },
          ],
        },
        {
          $set: { status: STATUS.EXPIRED },
        }
      );

      return result.modifiedCount;
    } catch (error) {
      throw new Error(`Auto-expire coupons failed: ${error.message}`);
    }
  }

  /**
   * Create a new coupon
   * @param {Object} couponData - Coupon data
   * @param {Object} [options] - Options
   * @returns {Promise<Object>} - Created coupon
   */
  async createCoupon(couponData, options = {}) {
    try {
      return await this.create(couponData, options);
    } catch (error) {
      throw new Error(`Create coupon failed: ${error.message}`);
    }
  }

  /**
   * Update a coupon
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
   * @param {Object} updateData - Data to update
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Updated coupon
   */
  async updateCoupon(couponId, updateData, options = {}) {
    try {
      return await this.updateById(couponId, updateData, options);
    } catch (error) {
      throw new Error(`Update coupon failed: ${error.message}`);
    }
  }

  /**
   * Delete a coupon (soft delete)
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Deleted coupon
   */
  async deleteCoupon(couponId, options = {}) {
    try {
      return await this.delete({ _id: couponId }, options);
    } catch (error) {
      throw new Error(`Delete coupon failed: ${error.message}`);
    }
  }

  /**
   * Restore a deleted coupon
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Restored coupon
   */
  async restoreCoupon(couponId, options = {}) {
    try {
      return await this.restore({ _id: couponId }, options);
    } catch (error) {
      throw new Error(`Restore coupon failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a coupon
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID
   * @param {Object} [options] - Options
   * @returns {Promise<Object|null>} - Deleted coupon
   */
  async permanentlyDeleteCoupon(couponId, options = {}) {
    try {
      return await this.forceDelete({ _id: couponId }, options);
    } catch (error) {
      throw new Error(`Permanently delete coupon failed: ${error.message}`);
    }
  }

  /**
   * Generate a random unique coupon code
   * @param {number} [length=8] - Code length
   * @returns {Promise<string>} - Generated code
   */
  async generateUniqueCouponCode(length = 8) {
    try {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      let isUnique = false;

      while (!isUnique) {
        code = "";
        for (let i = 0; i < length; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Check if code already exists
        const existing = await this.model.findOne({ code });
        if (!existing) {
          isUnique = true;
        }
      }

      return code;
    } catch (error) {
      throw new Error(`Generate unique coupon code failed: ${error.message}`);
    }
  }

  /**
   * Duplicate a coupon (useful for creating similar coupons)
   * @param {string|mongoose.Types.ObjectId} couponId - Coupon ID to duplicate
   * @param {Object} [overrides] - Fields to override in the duplicate
   * @returns {Promise<Object>} - Created duplicate coupon
   */
  async duplicateCoupon(couponId, overrides = {}) {
    try {
      const originalCoupon = await this.findById(couponId);

      if (!originalCoupon) {
        throw new Error("Coupon not found");
      }

      // Generate new unique code
      const newCode = await this.generateUniqueCouponCode();

      // Remove fields that should not be duplicated
      const couponData = {
        code: newCode,
        description: originalCoupon.description,
        event: originalCoupon.event,
        applicable_bundles: originalCoupon.applicable_bundles,
        discount_type: originalCoupon.discount_type,
        discount_value: originalCoupon.discount_value,
        max_discount_amount: originalCoupon.max_discount_amount,
        min_purchase_amount: originalCoupon.min_purchase_amount,
        status: STATUS.ACTIVE,
        max_total_uses: originalCoupon.max_total_uses,
        max_uses_per_user: originalCoupon.max_uses_per_user,
        current_redemptions: 0, // Reset redemptions
        validity_start: originalCoupon.validity_start,
        validity_end: originalCoupon.validity_end,
        is_public: originalCoupon.is_public,
        terms_and_conditions: originalCoupon.terms_and_conditions,
        ...overrides,
      };

      return await this.create(couponData);
    } catch (error) {
      throw new Error(`Duplicate coupon failed: ${error.message}`);
    }
  }

  /**
   * Bulk create coupons (useful for generating multiple codes at once)
   * @param {Object} templateData - Template data for all coupons
   * @param {number} count - Number of coupons to create
   * @param {string} [codePrefix] - Optional prefix for codes
   * @returns {Promise<Array>} - Array of created coupons
   */
  async bulkCreateCoupons(templateData, count, codePrefix = "") {
    try {
      const coupons = [];

      for (let i = 0; i < count; i++) {
        const code = codePrefix + (await this.generateUniqueCouponCode());

        const couponData = {
          ...templateData,
          code,
          current_redemptions: 0,
        };

        const coupon = await this.create(couponData);
        coupons.push(coupon);
      }

      return coupons;
    } catch (error) {
      throw new Error(`Bulk create coupons failed: ${error.message}`);
    }
  }
}

export default new CouponRepository();