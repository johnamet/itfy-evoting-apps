/**
 * Coupon Service
 * Handles business logic for coupon management and validation
 */

import { BaseService } from "../../shared/base.service";
import CouponRepository from "./coupon.repository";
import BundleRepository from "../bundle/bundle.repository";
import EventRepository from "../../event/event.repository";
import ActivityService from "../../activity/activity.service";
import CouponValidation from "./coupon.validation.js";
import { COUPON_STATUS as STATUS, DISCOUNT_TYPE } from "../../../utils/constants/vote.constants";
import { ENTITY_TYPE, ACTION_TYPE } from "../../../utils/constants/activity.constants";
import crypto from "crypto";

class CouponService extends BaseService {
  constructor() {
    super(CouponRepository);
    this.bundleRepository = BundleRepository;
    this.eventRepository = EventRepository;
  }

  /**
   * Generate unique coupon code
   * @param {string} prefix - Optional prefix
   * @returns {Promise<string>} - Unique coupon code
   */
  async generateCouponCode(prefix = "") {
    try {
      let code;
      let exists = true;

      while (exists) {
        const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
        code = prefix ? `${prefix}-${randomPart}` : randomPart;

        const existing = await this.repository.findByCode(code);
        exists = !!existing;
      }

      return code;
    } catch (error) {
      throw new Error(`Failed to generate coupon code: ${error.message}`);
    }
  }

  /**
   * Create a new coupon
   * @param {Object} couponData - Coupon data
   * @param {string} adminId - Admin creating the coupon
   * @returns {Promise<Object>} - Created coupon
   */
  async createCoupon(couponData, adminId) {
    try {
      // Validate input data
      const { error, value } = CouponValidation.createCouponSchema.validate(
        { ...couponData, created_by: adminId },
        { abortEarly: false, stripUnknown: true }
      );

      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      const validatedData = value;
      
      // Validate event exists
      const event = await this.eventRepository.findById(validatedData.event);
      if (!event) {
        throw new Error("Event not found");
      }

      // Generate code if not provided
      if (!validatedData.code) {
        validatedData.code = await this.generateCouponCode();
      } else {
        // Ensure code is uppercase and check uniqueness
        validatedData.code = validatedData.code.toUpperCase();
        const existing = await this.repository.findByCode(validatedData.code);
        if (existing) {
          throw new Error("Coupon code already exists");
        }
      }

      // Validate applicable bundles if provided
      if (validatedData.applicable_bundles && validatedData.applicable_bundles.length > 0) {
        const bundles = await this.bundleRepository.findAll(
          { _id: { $in: validatedData.applicable_bundles }, event: validatedData.event },
          1,
          validatedData.applicable_bundles.length
        );

        if (bundles.data.length !== validatedData.applicable_bundles.length) {
          throw new Error("One or more bundles not found or do not belong to this event");
        }
      }

      // Note: Validation schema already validates discount_value ranges
      const couponToCreate = {
        ...validatedData,
        current_redemptions: 0,
      };

      const coupon = await this.repository.create(couponToCreate);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: coupon._id,
        eventId: coupon.event,
        description: `Created coupon: ${coupon.code}`,
        metadata: {
          couponCode: coupon.code,
          discountType: coupon.discount_type,
          discountValue: coupon.discount_value,
        },
      });

      return coupon;
    } catch (error) {
      throw new Error(`Failed to create coupon: ${error.message}`);
    }
  }

  /**
   * Update a coupon
   * @param {string} couponId - Coupon ID
   * @param {Object} updateData - Update data
   * @param {string} adminId - Admin updating the coupon
   * @returns {Promise<Object>} - Updated coupon
   */
  async updateCoupon(couponId, updateData, adminId) {
    try {
      // Validate input data
      const { error, value } = CouponValidation.updateCouponSchema.validate(
        { ...updateData, updated_by: adminId },
        { abortEarly: false, stripUnknown: true }
      );

      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      const validatedData = value;

      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      // Validate applicable bundles if provided
      if (updateData.applicable_bundles && updateData.applicable_bundles.length > 0) {
        const bundles = await this.bundleRepository.findAll(
          { _id: { $in: updateData.applicable_bundles }, event: coupon.event },
          1,
          updateData.applicable_bundles.length
        );

        if (bundles.data.length !== updateData.applicable_bundles.length) {
          throw new Error("One or more bundles not found or do not belong to this event");
        }
      }

      // Validate discount value if changed
      const discountType = updateData.discount_type || coupon.discount_type;
      const discountValue = updateData.discount_value !== undefined ? updateData.discount_value : coupon.discount_value;

      if (discountType === DISCOUNT_TYPE.PERCENTAGE && (discountValue < 0 || discountValue > 100)) {
        throw new Error("Percentage discount must be between 0 and 100");
      } else if (discountType === DISCOUNT_TYPE.FIXED && discountValue <= 0) {
        throw new Error("Fixed discount must be greater than 0");
      } else if (discountType === DISCOUNT_TYPE.BONUS_VOTES && (discountValue <= 0 || !Number.isInteger(discountValue))) {
        throw new Error("Bonus votes must be a positive integer");
      }

      // Validate validity dates
      const validityStart = updateData.validity_start !== undefined ? updateData.validity_start : coupon.validity_start;
      const validityEnd = updateData.validity_end !== undefined ? updateData.validity_end : coupon.validity_end;

      if (validityStart && validityEnd && new Date(validityStart) >= new Date(validityEnd)) {
        throw new Error("Validity start date must be before end date");
      }

      const updatedCoupon = await this.repository.updateById(couponId, updateData);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: couponId,
        eventId: coupon.event,
        description: `Updated coupon: ${coupon.code}`,
        metadata: {
          couponCode: coupon.code,
          changes: Object.keys(updateData),
        },
      });

      return updatedCoupon;
    } catch (error) {
      throw new Error(`Failed to update coupon: ${error.message}`);
    }
  }

  /**
   * Delete a coupon (soft delete)
   * @param {string} couponId - Coupon ID
   * @param {string} adminId - Admin deleting the coupon
   * @returns {Promise<Object>} - Deleted coupon
   */
  async deleteCoupon(couponId, adminId) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      const deletedCoupon = await this.repository.delete({ _id: couponId });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.DELETE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: couponId,
        eventId: coupon.event,
        description: `Deleted coupon: ${coupon.code}`,
        metadata: {
          couponCode: coupon.code,
          discountType: coupon.discount_type,
          discountValue: coupon.discount_value,
        },
      });

      return deletedCoupon;
    } catch (error) {
      throw new Error(`Failed to delete coupon: ${error.message}`);
    }
  }

  /**
   * Activate a coupon
   * @param {string} couponId - Coupon ID
   * @param {string} adminId - Admin activating the coupon
   * @returns {Promise<Object>} - Activated coupon
   */
  async activateCoupon(couponId, adminId) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      if (coupon.status === STATUS.ACTIVE) {
        throw new Error("Coupon is already active");
      }

      const activatedCoupon = await this.repository.updateById(couponId, { status: STATUS.ACTIVE });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: couponId,
        eventId: coupon.event,
        description: `Activated coupon: ${coupon.code}`,
        metadata: { couponCode: coupon.code },
      });

      return activatedCoupon;
    } catch (error) {
      throw new Error(`Failed to activate coupon: ${error.message}`);
    }
  }

  /**
   * Deactivate a coupon
   * @param {string} couponId - Coupon ID
   * @param {string} adminId - Admin deactivating the coupon
   * @returns {Promise<Object>} - Deactivated coupon
   */
  async deactivateCoupon(couponId, adminId) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      if (coupon.status === STATUS.INACTIVE) {
        throw new Error("Coupon is already inactive");
      }

      const deactivatedCoupon = await this.repository.updateById(couponId, { status: STATUS.INACTIVE });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: couponId,
        eventId: coupon.event,
        description: `Deactivated coupon: ${coupon.code}`,
        metadata: { couponCode: coupon.code },
      });

      return deactivatedCoupon;
    } catch (error) {
      throw new Error(`Failed to deactivate coupon: ${error.message}`);
    }
  }

  /**
   * Validate coupon for a bundle
   * @param {string} code - Coupon code
   * @param {string} bundleId - Bundle ID
   * @param {string} userEmail - User email (for per-user limit check)
   * @returns {Promise<Object>} - Validation result
   */
  async validateCouponForBundle(code, bundleId, userEmail) {
    try {
      const coupon = await this.repository.findByCode(code);
      if (!coupon) {
        return { isValid: false, reason: "Invalid coupon code" };
      }

      // Check if coupon is active
      if (coupon.status !== STATUS.ACTIVE) {
        return { isValid: false, reason: "Coupon is not active", coupon };
      }

      // Check validity dates
      const now = new Date();
      if (coupon.validity_start && new Date(coupon.validity_start) > now) {
        return {
          isValid: false,
          reason: `Coupon will be valid from ${coupon.validity_start}`,
          coupon,
        };
      }

      if (coupon.validity_end && new Date(coupon.validity_end) < now) {
        return { isValid: false, reason: "Coupon has expired", coupon };
      }

      // Check total redemptions limit
      if (coupon.max_total_uses && coupon.current_redemptions >= coupon.max_total_uses) {
        return { isValid: false, reason: "Coupon usage limit reached", coupon };
      }

      // Check per-user redemptions limit
      if (userEmail) {
        const userRedemptions = await this.repository.getUserRedemptionCount(
          coupon._id,
          userEmail
        );

        if (userRedemptions >= coupon.max_uses_per_user) {
          return { isValid: false, reason: "You have reached the usage limit for this coupon", coupon };
        }
      }

      // Check if coupon is applicable to the bundle
      if (coupon.applicable_bundles && coupon.applicable_bundles.length > 0) {
        const isApplicable = coupon.applicable_bundles.some(
          bundle => bundle.toString() === bundleId
        );

        if (!isApplicable) {
          return { isValid: false, reason: "Coupon is not applicable to this bundle", coupon };
        }
      }

      // Check minimum purchase amount if exists
      if (coupon.min_purchase_amount > 0) {
        const bundle = await this.bundleRepository.findById(bundleId);
        if (bundle && bundle.price < coupon.min_purchase_amount) {
          return {
            isValid: false,
            reason: `Minimum purchase amount of ${coupon.min_purchase_amount} required`,
            coupon,
          };
        }
      }

      return { isValid: true, coupon };
    } catch (error) {
      throw new Error(`Failed to validate coupon: ${error.message}`);
    }
  }

  /**
   * Redeem a coupon (increment redemption count)
   * @param {string} couponId - Coupon ID
   * @param {string} userEmail - User email
   * @returns {Promise<Object>} - Updated coupon
   */
  async redeemCoupon(couponId, userEmail) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      // Increment redemption count
      const updatedCoupon = await this.repository.incrementRedemptions(couponId, userEmail);

      // Log activity
      await ActivityService.log({
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: couponId,
        eventId: coupon.event,
        description: `Coupon redeemed: ${coupon.code}`,
        metadata: {
          couponCode: coupon.code,
          userEmail,
          totalRedemptions: updatedCoupon.current_redemptions,
        },
      });

      return updatedCoupon;
    } catch (error) {
      throw new Error(`Failed to redeem coupon: ${error.message}`);
    }
  }

  /**
   * Reverse coupon redemption (for payment refunds)
   * @param {string} couponId - Coupon ID
   * @param {string} userEmail - User email
   * @returns {Promise<Object>} - Updated coupon
   */
  async reverseCouponRedemption(couponId, userEmail) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      // Decrement redemption count
      const updatedCoupon = await this.repository.decrementRedemptions(couponId, userEmail);

      // Log activity
      await ActivityService.log({
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: couponId,
        eventId: coupon.event,
        description: `Coupon redemption reversed: ${coupon.code}`,
        metadata: {
          couponCode: coupon.code,
          userEmail,
          totalRedemptions: updatedCoupon.current_redemptions,
        },
      });

      return updatedCoupon;
    } catch (error) {
      throw new Error(`Failed to reverse coupon redemption: ${error.message}`);
    }
  }

  /**
   * Get coupon by ID
   * @param {string} couponId - Coupon ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Coupon
   */
  async getCouponById(couponId, options = {}) {
    try {
      const coupon = await this.repository.findById(couponId, options);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      return coupon;
    } catch (error) {
      throw new Error(`Failed to get coupon: ${error.message}`);
    }
  }

  /**
   * Get coupon by code
   * @param {string} code - Coupon code
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Coupon
   */
  async getCouponByCode(code, options = {}) {
    try {
      const coupon = await this.repository.findByCode(code, options);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      return coupon;
    } catch (error) {
      throw new Error(`Failed to get coupon: ${error.message}`);
    }
  }

  /**
   * Get all coupons for an event
   * @param {string} eventId - Event ID
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated coupons
   */
  async getCouponsByEvent(eventId, page = 1, limit = 10, options = {}) {
    try {
      const coupons = await this.repository.findAll(
        { event: eventId },
        page,
        limit,
        { ...options, sort: { created_at: -1 } }
      );

      return coupons;
    } catch (error) {
      throw new Error(`Failed to get coupons: ${error.message}`);
    }
  }

  /**
   * Get active coupons for an event
   * @param {string} eventId - Event ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Active coupons
   */
  async getActiveCoupons(eventId, options = {}) {
    try {
      const coupons = await this.repository.findActiveByEvent(eventId, options);
      return coupons;
    } catch (error) {
      throw new Error(`Failed to get active coupons: ${error.message}`);
    }
  }

  /**
   * Get public coupons
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Public coupons
   */
  async getPublicCoupons(eventId = null, options = {}) {
    try {
      const coupons = await this.repository.findPublic(eventId, options);
      return coupons;
    } catch (error) {
      throw new Error(`Failed to get public coupons: ${error.message}`);
    }
  }

  /**
   * Get coupon statistics
   * @param {string} couponId - Coupon ID
   * @returns {Promise<Object>} - Coupon statistics
   */
  async getCouponStats(couponId) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      const stats = await this.repository.getCouponStats(couponId);

      return {
        couponId: coupon._id,
        couponCode: coupon.code,
        discountType: coupon.discount_type,
        discountValue: coupon.discount_value,
        currentRedemptions: coupon.current_redemptions,
        maxTotalUses: coupon.max_total_uses,
        maxUsesPerUser: coupon.max_uses_per_user,
        isActive: coupon.status === STATUS.ACTIVE,
        validityStart: coupon.validity_start,
        validityEnd: coupon.validity_end,
        ...stats,
      };
    } catch (error) {
      throw new Error(`Failed to get coupon statistics: ${error.message}`);
    }
  }

  /**
   * Get user's redemption count for a coupon
   * @param {string} couponId - Coupon ID
   * @param {string} userEmail - User email
   * @returns {Promise<number>} - Redemption count
   */
  async getUserRedemptionCount(couponId, userEmail) {
    try {
      const count = await this.repository.getUserRedemptionCount(couponId, userEmail);
      return count;
    } catch (error) {
      throw new Error(`Failed to get user redemption count: ${error.message}`);
    }
  }

  /**
   * Clone a coupon
   * @param {string} couponId - Coupon ID to clone
   * @param {Object} overrides - Override data
   * @param {string} adminId - Admin cloning the coupon
   * @returns {Promise<Object>} - Cloned coupon
   */
  async cloneCoupon(couponId, overrides = {}, adminId) {
    try {
      const coupon = await this.repository.findById(couponId);
      if (!coupon) {
        throw new Error("Coupon not found");
      }

      // Create clone data
      const cloneData = {
        description: coupon.description,
        event: overrides.event || coupon.event,
        applicable_bundles: overrides.applicable_bundles || coupon.applicable_bundles,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        max_discount_amount: coupon.max_discount_amount,
        min_purchase_amount: coupon.min_purchase_amount,
        status: overrides.status || STATUS.INACTIVE, // Clone as inactive by default
        max_total_uses: overrides.max_total_uses || coupon.max_total_uses,
        max_uses_per_user: coupon.max_uses_per_user,
        validity_start: overrides.validity_start || null,
        validity_end: overrides.validity_end || null,
        is_public: coupon.is_public,
        terms_and_conditions: coupon.terms_and_conditions,
      };

      const clonedCoupon = await this.createCoupon(cloneData, adminId);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.COUPON,
        entityId: clonedCoupon._id,
        eventId: clonedCoupon.event,
        description: `Cloned coupon from: ${coupon.code}`,
        metadata: {
          originalCouponId: couponId,
          originalCouponCode: coupon.code,
          newCouponCode: clonedCoupon.code,
        },
      });

      return clonedCoupon;
    } catch (error) {
      throw new Error(`Failed to clone coupon: ${error.message}`);
    }
  }
}

export default new CouponService();
