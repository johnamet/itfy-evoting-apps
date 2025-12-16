/**
 * Bundle Service
 * Handles business logic for vote bundle management
 */

import { BaseService } from "../../shared/base.service";
import BundleRepository from "./bundle.repository";
import EventRepository from "../../event/event.repository";
import CategoryRepository from "../../category/category.repository";
import PaymentRepository from "../../payment/payment.repository";
import ActivityService from "../../activity/activity.service";
import BundleValidation from "./bundle.validation.js";
import { BUNDLE_STATUS as STATUS } from "../../../utils/constants/vote.constants";
import { ENTITY_TYPE, ACTION_TYPE } from "../../../utils/constants/activity.constants";
import { EVENT_STATUS } from "../../../utils/constants/event.constants";
import { slugify } from "../../../utils/helpers/string.helper";

class BundleService extends BaseService {
  constructor() {
    super(BundleRepository);
    this.eventRepository = EventRepository;
    this.categoryRepository = CategoryRepository;
    this.paymentRepository = PaymentRepository;
  }

  /**
   * Create a new bundle
   * @param {Object} bundleData - Bundle data
   * @param {string} adminId - Admin creating the bundle
   * @returns {Promise<Object>} - Created bundle
   */
  async createBundle(bundleData, adminId) {
    try {
      // Validate input data
      const { error, value } = BundleValidation.createBundleSchema.validate(
        { ...bundleData, created_by: adminId },
        { abortEarly: false, stripUnknown: true }
      );

      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      const validatedData = value;
      // Validate event exists
      const event = await this.eventRepository.findById(bundleData.event);
      if (!event) {
        throw new Error("Event not found");
      }

      // Generate unique slug
      let slug = slugify(bundleData.name);
      let counter = 1;
      let existingBundle = await this.repository.findBySlug(slug);
      
      while (existingBundle) {
        slug = `${slugify(bundleData.name)}-${counter}`;
        existingBundle = await this.repository.findBySlug(slug);
        counter++;
      }

      // Validate categories if provided
      if (bundleData.categories && bundleData.categories.length > 0) {
        const categories = await this.categoryRepository.findAll(
          { _id: { $in: bundleData.categories }, event: bundleData.event },
          1,
          bundleData.categories.length
        );

        if (categories.data.length !== bundleData.categories.length) {
          throw new Error("One or more categories not found or do not belong to this event");
        }
      }

      // Calculate price per vote for validation
      const pricePerVote = bundleData.price / bundleData.vote_count;
      if (pricePerVote <= 0) {
        throw new Error("Price per vote must be greater than 0");
      }

      // Set original price if discount is provided
      if (bundleData.discount_percentage && bundleData.discount_percentage > 0) {
        if (!bundleData.original_price) {
          bundleData.original_price = bundleData.price / (1 - bundleData.discount_percentage / 100);
        }
      }

      // Validate validity dates
      if (bundleData.validity_start && bundleData.validity_end) {
        if (new Date(bundleData.validity_start) >= new Date(bundleData.validity_end)) {
          throw new Error("Validity start date must be before end date");
        }
      }

      const bundleToCreate = {
        ...bundleData,
        slug,
        status: bundleData.status || STATUS.ACTIVE,
      };

      const bundle = await this.repository.create(bundleToCreate);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundle._id,
        eventId: bundle.event,
        description: `Created bundle: ${bundle.name}`,
        metadata: {
          bundleName: bundle.name,
          voteCount: bundle.vote_count,
          price: bundle.price,
          currency: bundle.currency,
        },
      });

      return bundle;
    } catch (error) {
      throw new Error(`Failed to create bundle: ${error.message}`);
    }
  }

  /**
   * Update a bundle
   * @param {string} bundleId - Bundle ID
   * @param {Object} updateData - Update data
   * @param {string} adminId - Admin updating the bundle
   * @returns {Promise<Object>} - Updated bundle
   */
  async updateBundle(bundleId, updateData, adminId) {
    try {
      // Validate input data
      const { error, value } = BundleValidation.updateBundleSchema.validate(
        { ...updateData, updated_by: adminId },
        { abortEarly: false, stripUnknown: true }
      );

      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      const validatedData = value;
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      // Prevent updating slug directly
      if (updateData.slug) {
        delete updateData.slug;
      }

      // Prevent changing event
      if (updateData.event && updateData.event.toString() !== bundle.event.toString()) {
        throw new Error("Cannot change bundle event");
      }

      // Validate categories if provided
      if (updateData.categories && updateData.categories.length > 0) {
        const categories = await this.categoryRepository.findAll(
          { _id: { $in: updateData.categories }, event: bundle.event },
          1,
          updateData.categories.length
        );

        if (categories.data.length !== updateData.categories.length) {
          throw new Error("One or more categories not found or do not belong to this event");
        }
      }

      // Validate price per vote if price or vote_count changed
      const newPrice = updateData.price !== undefined ? updateData.price : bundle.price;
      const newVoteCount = updateData.vote_count !== undefined ? updateData.vote_count : bundle.vote_count;
      const pricePerVote = newPrice / newVoteCount;

      if (pricePerVote <= 0) {
        throw new Error("Price per vote must be greater than 0");
      }

      // Recalculate original price if discount changes
      if (updateData.discount_percentage !== undefined) {
        if (updateData.discount_percentage > 0 && !updateData.original_price) {
          updateData.original_price = newPrice / (1 - updateData.discount_percentage / 100);
        }
      }

      // Validate validity dates
      const validityStart = updateData.validity_start !== undefined ? updateData.validity_start : bundle.validity_start;
      const validityEnd = updateData.validity_end !== undefined ? updateData.validity_end : bundle.validity_end;

      if (validityStart && validityEnd) {
        if (new Date(validityStart) >= new Date(validityEnd)) {
          throw new Error("Validity start date must be before end date");
        }
      }

      const updatedBundle = await this.repository.updateById(bundleId, updateData);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundleId,
        eventId: bundle.event,
        description: `Updated bundle: ${bundle.name}`,
        metadata: {
          bundleName: bundle.name,
          changes: Object.keys(updateData),
        },
      });

      return updatedBundle;
    } catch (error) {
      throw new Error(`Failed to update bundle: ${error.message}`);
    }
  }

  /**
   * Delete a bundle (soft delete)
   * @param {string} bundleId - Bundle ID
   * @param {string} adminId - Admin deleting the bundle
   * @returns {Promise<Object>} - Deleted bundle
   */
  async deleteBundle(bundleId, adminId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      // Check if bundle has been purchased
      const purchaseCount = await this.paymentRepository.countByBundle(bundleId);
      if (purchaseCount > 0) {
        throw new Error("Cannot delete bundle with existing purchases. Deactivate it instead.");
      }

      const deletedBundle = await this.repository.delete({ _id: bundleId });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.DELETE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundleId,
        eventId: bundle.event,
        description: `Deleted bundle: ${bundle.name}`,
        metadata: {
          bundleName: bundle.name,
          voteCount: bundle.vote_count,
          price: bundle.price,
        },
      });

      return deletedBundle;
    } catch (error) {
      throw new Error(`Failed to delete bundle: ${error.message}`);
    }
  }

  /**
   * Activate a bundle
   * @param {string} bundleId - Bundle ID
   * @param {string} adminId - Admin activating the bundle
   * @returns {Promise<Object>} - Activated bundle
   */
  async activateBundle(bundleId, adminId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      if (bundle.status === STATUS.ACTIVE) {
        throw new Error("Bundle is already active");
      }

      // Validate event is not archived
      const event = await this.eventRepository.findById(bundle.event);
      if (event.status === EVENT_STATUS.ARCHIVED) {
        throw new Error("Cannot activate bundle for archived event");
      }

      const activatedBundle = await this.repository.updateById(bundleId, { status: STATUS.ACTIVE });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundleId,
        eventId: bundle.event,
        description: `Activated bundle: ${bundle.name}`,
        metadata: { bundleName: bundle.name },
      });

      return activatedBundle;
    } catch (error) {
      throw new Error(`Failed to activate bundle: ${error.message}`);
    }
  }

  /**
   * Deactivate a bundle
   * @param {string} bundleId - Bundle ID
   * @param {string} adminId - Admin deactivating the bundle
   * @returns {Promise<Object>} - Deactivated bundle
   */
  async deactivateBundle(bundleId, adminId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      if (bundle.status === STATUS.INACTIVE) {
        throw new Error("Bundle is already inactive");
      }

      const deactivatedBundle = await this.repository.updateById(bundleId, { status: STATUS.INACTIVE });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundleId,
        eventId: bundle.event,
        description: `Deactivated bundle: ${bundle.name}`,
        metadata: { bundleName: bundle.name },
      });

      return deactivatedBundle;
    } catch (error) {
      throw new Error(`Failed to deactivate bundle: ${error.message}`);
    }
  }

  /**
   * Toggle featured status
   * @param {string} bundleId - Bundle ID
   * @param {string} adminId - Admin toggling featured status
   * @returns {Promise<Object>} - Updated bundle
   */
  async toggleFeatured(bundleId, adminId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      const updatedBundle = await this.repository.toggleFeatured(bundleId);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundleId,
        eventId: bundle.event,
        description: `${updatedBundle.is_featured ? "Featured" : "Unfeatured"} bundle: ${bundle.name}`,
        metadata: { bundleName: bundle.name, isFeatured: updatedBundle.is_featured },
      });

      return updatedBundle;
    } catch (error) {
      throw new Error(`Failed to toggle featured status: ${error.message}`);
    }
  }

  /**
   * Toggle popular status
   * @param {string} bundleId - Bundle ID
   * @param {string} adminId - Admin toggling popular status
   * @returns {Promise<Object>} - Updated bundle
   */
  async togglePopular(bundleId, adminId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      const updatedBundle = await this.repository.togglePopular(bundleId);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: bundleId,
        eventId: bundle.event,
        description: `${updatedBundle.is_popular ? "Marked popular" : "Unmarked popular"} bundle: ${bundle.name}`,
        metadata: { bundleName: bundle.name, isPopular: updatedBundle.is_popular },
      });

      return updatedBundle;
    } catch (error) {
      throw new Error(`Failed to toggle popular status: ${error.message}`);
    }
  }

  /**
   * Get bundle by ID
   * @param {string} bundleId - Bundle ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Bundle
   */
  async getBundleById(bundleId, options = {}) {
    try {
      const bundle = await this.repository.findById(bundleId, options);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      return bundle;
    } catch (error) {
      throw new Error(`Failed to get bundle: ${error.message}`);
    }
  }

  /**
   * Get bundle by slug
   * @param {string} slug - Bundle slug
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Bundle
   */
  async getBundleBySlug(slug, options = {}) {
    try {
      const bundle = await this.repository.findBySlug(slug, options);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      return bundle;
    } catch (error) {
      throw new Error(`Failed to get bundle: ${error.message}`);
    }
  }

  /**
   * Get all bundles for an event
   * @param {string} eventId - Event ID
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated bundles
   */
  async getBundlesByEvent(eventId, page = 1, limit = 10, options = {}) {
    try {
      const bundles = await this.repository.findAll(
        { event: eventId },
        page,
        limit,
        { ...options, sort: { display_order: 1, price: 1 } }
      );

      return bundles;
    } catch (error) {
      throw new Error(`Failed to get bundles: ${error.message}`);
    }
  }

  /**
   * Get available bundles for an event (active and within validity)
   * @param {string} eventId - Event ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Available bundles
   */
  async getAvailableBundles(eventId, options = {}) {
    try {
      const bundles = await this.repository.findAvailableByEvent(eventId, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get available bundles: ${error.message}`);
    }
  }

  /**
   * Get featured bundles
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Featured bundles
   */
  async getFeaturedBundles(eventId = null, options = {}) {
    try {
      const bundles = await this.repository.findFeatured(eventId, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get featured bundles: ${error.message}`);
    }
  }

  /**
   * Get popular bundles (most purchased)
   * @param {string} eventId - Optional event ID filter
   * @param {number} limit - Maximum number to return
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Popular bundles
   */
  async getPopularBundles(eventId = null, limit = 5, options = {}) {
    try {
      const bundles = await this.repository.findPopular(eventId, limit, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get popular bundles: ${error.message}`);
    }
  }

  /**
   * Get best value bundles (lowest price per vote)
   * @param {string} eventId - Event ID
   * @param {number} limit - Maximum number to return
   * @returns {Promise<Array>} - Best value bundles
   */
  async getBestValueBundles(eventId, limit = 5) {
    try {
      const bundles = await this.repository.findBestValue(eventId, limit);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get best value bundles: ${error.message}`);
    }
  }

  /**
   * Get bundles applicable to a category
   * @param {string} categoryId - Category ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Applicable bundles
   */
  async getBundlesByCategory(categoryId, options = {}) {
    try {
      // Validate category exists
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      const bundles = await this.repository.findByCategory(categoryId, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get bundles by category: ${error.message}`);
    }
  }

  /**
   * Get bundles by price range
   * @param {number} minPrice - Minimum price
   * @param {number} maxPrice - Maximum price
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Bundles in price range
   */
  async getBundlesByPriceRange(minPrice, maxPrice, eventId = null, options = {}) {
    try {
      if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
        throw new Error("Invalid price range");
      }

      const bundles = await this.repository.findByPriceRange(minPrice, maxPrice, eventId, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get bundles by price range: ${error.message}`);
    }
  }

  /**
   * Get bundles expiring soon
   * @param {number} days - Number of days threshold
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Bundles expiring soon
   */
  async getExpiringSoonBundles(days = 7, eventId = null, options = {}) {
    try {
      const bundles = await this.repository.findExpiringSoon(days, eventId, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get expiring bundles: ${error.message}`);
    }
  }

  /**
   * Get expired bundles
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Expired bundles
   */
  async getExpiredBundles(eventId = null, options = {}) {
    try {
      const bundles = await this.repository.findExpired(eventId, options);
      return bundles;
    } catch (error) {
      throw new Error(`Failed to get expired bundles: ${error.message}`);
    }
  }

  /**
   * Validate bundle availability for purchase
   * @param {string} bundleId - Bundle ID
   * @returns {Promise<Object>} - Validation result with bundle
   */
  async validateBundleAvailability(bundleId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        return { isAvailable: false, reason: "Bundle not found" };
      }

      // Check if bundle is active
      if (bundle.status !== STATUS.ACTIVE) {
        return { isAvailable: false, reason: "Bundle is not active", bundle };
      }

      // Check validity dates
      const now = new Date();
      if (bundle.validity_start && new Date(bundle.validity_start) > now) {
        return { 
          isAvailable: false, 
          reason: `Bundle will be available from ${bundle.validity_start}`,
          bundle 
        };
      }

      if (bundle.validity_end && new Date(bundle.validity_end) < now) {
        return { 
          isAvailable: false, 
          reason: "Bundle has expired",
          bundle 
        };
      }

      // Check event status
      const event = await this.eventRepository.findById(bundle.event);
      if (!event || event.status === EVENT_STATUS.ARCHIVED) {
        return { 
          isAvailable: false, 
          reason: "Event is not available",
          bundle 
        };
      }

      return { isAvailable: true, bundle };
    } catch (error) {
      throw new Error(`Failed to validate bundle availability: ${error.message}`);
    }
  }

  /**
   * Calculate final price with discount
   * @param {string} bundleId - Bundle ID
   * @param {Object} coupon - Optional coupon data
   * @returns {Promise<Object>} - Price breakdown
   */
  async calculatePrice(bundleId, coupon = null) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      let basePrice = bundle.price;
      let discount = 0;
      let bonusVotes = 0;
      let finalPrice = basePrice;
      const breakdown = {
        basePrice,
        bundleDiscount: bundle.discount_percentage,
        originalPrice: bundle.original_price || basePrice,
      };

      // Apply bundle discount if exists
      if (bundle.discount_percentage > 0) {
        discount = basePrice * (bundle.discount_percentage / 100);
      }

      // Apply coupon if provided
      if (coupon) {
        breakdown.couponCode = coupon.code;
        
        if (coupon.discount_type === "PERCENTAGE") {
          const couponDiscount = basePrice * (coupon.discount_value / 100);
          discount += couponDiscount;
          breakdown.couponDiscount = couponDiscount;
          breakdown.couponType = "percentage";
          breakdown.couponValue = coupon.discount_value;
        } else if (coupon.discount_type === "FIXED") {
          discount += coupon.discount_value;
          breakdown.couponDiscount = coupon.discount_value;
          breakdown.couponType = "fixed";
          breakdown.couponValue = coupon.discount_value;
        } else if (coupon.discount_type === "BONUS_VOTES") {
          bonusVotes = coupon.discount_value;
          breakdown.bonusVotes = bonusVotes;
          breakdown.couponType = "bonus_votes";
        }
      }

      finalPrice = Math.max(basePrice - discount, 0);

      return {
        ...breakdown,
        totalDiscount: discount,
        finalPrice,
        totalVotes: bundle.vote_count + bonusVotes,
        currency: bundle.currency,
        pricePerVote: finalPrice / (bundle.vote_count + bonusVotes),
      };
    } catch (error) {
      throw new Error(`Failed to calculate price: ${error.message}`);
    }
  }

  /**
   * Record a purchase for a bundle
   * @param {string} bundleId - Bundle ID
   * @param {number} amount - Amount paid
   * @returns {Promise<Object>} - Updated bundle
   */
  async recordPurchase(bundleId, amount) {
    try {
      const bundle = await this.repository.recordPurchase(bundleId, amount);
      return bundle;
    } catch (error) {
      throw new Error(`Failed to record purchase: ${error.message}`);
    }
  }

  /**
   * Reorder bundles for an event
   * @param {string} eventId - Event ID
   * @param {Array<{bundleId: string, displayOrder: number}>} orderData - New order
   * @param {string} adminId - Admin reordering bundles
   * @returns {Promise<Array>} - Updated bundles
   */
  async reorderBundles(eventId, orderData, adminId) {
    try {
      // Validate event exists
      const event = await this.eventRepository.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      // Validate all bundles belong to the event
      const bundleIds = orderData.map(item => item.bundleId);
      const bundles = await this.repository.findAll(
        { _id: { $in: bundleIds }, event: eventId },
        1,
        bundleIds.length
      );

      if (bundles.data.length !== bundleIds.length) {
        throw new Error("One or more bundles not found or do not belong to this event");
      }

      // Update display orders
      const updatePromises = orderData.map(item =>
        this.repository.updateById(item.bundleId, { display_order: item.displayOrder })
      );

      const updatedBundles = await Promise.all(updatePromises);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.BUNDLE,
        eventId,
        description: `Reordered ${bundleIds.length} bundles`,
        metadata: {
          bundleCount: bundleIds.length,
          bundleIds,
        },
      });

      return updatedBundles;
    } catch (error) {
      throw new Error(`Failed to reorder bundles: ${error.message}`);
    }
  }

  /**
   * Clone a bundle
   * @param {string} bundleId - Bundle ID to clone
   * @param {Object} overrides - Override data
   * @param {string} adminId - Admin cloning the bundle
   * @returns {Promise<Object>} - Cloned bundle
   */
  async cloneBundle(bundleId, overrides = {}, adminId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      // Create clone data
      const cloneData = {
        name: overrides.name || `${bundle.name} (Copy)`,
        description: bundle.description,
        event: overrides.event || bundle.event,
        categories: overrides.categories || bundle.categories,
        vote_count: overrides.vote_count || bundle.vote_count,
        price: overrides.price || bundle.price,
        currency: bundle.currency,
        discount_percentage: bundle.discount_percentage,
        original_price: bundle.original_price,
        is_featured: false,
        is_popular: false,
        status: overrides.status || STATUS.INACTIVE, // Clone as inactive by default
        validity_start: overrides.validity_start || null,
        validity_end: overrides.validity_end || null,
      };

      const clonedBundle = await this.createBundle(cloneData, adminId);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.BUNDLE,
        entityId: clonedBundle._id,
        eventId: clonedBundle.event,
        description: `Cloned bundle from: ${bundle.name}`,
        metadata: {
          originalBundleId: bundleId,
          originalBundleName: bundle.name,
          newBundleName: clonedBundle.name,
        },
      });

      return clonedBundle;
    } catch (error) {
      throw new Error(`Failed to clone bundle: ${error.message}`);
    }
  }

  /**
   * Get bundle statistics
   * @param {string} bundleId - Bundle ID
   * @returns {Promise<Object>} - Bundle statistics
   */
  async getBundleStats(bundleId) {
    try {
      const bundle = await this.repository.findById(bundleId);
      if (!bundle) {
        throw new Error("Bundle not found");
      }

      // Get purchase count and revenue
      const purchaseStats = await this.paymentRepository.getStatsByBundle(bundleId);

      // Calculate metrics
      const pricePerVote = bundle.price / bundle.vote_count;
      const totalRevenue = purchaseStats.totalRevenue || 0;
      const totalPurchases = bundle.total_purchases || 0;
      const totalVotesSold = totalPurchases * bundle.vote_count;

      return {
        bundleId: bundle._id,
        bundleName: bundle.name,
        voteCount: bundle.vote_count,
        price: bundle.price,
        currency: bundle.currency,
        pricePerVote,
        totalPurchases,
        totalRevenue,
        totalVotesSold,
        discountPercentage: bundle.discount_percentage,
        isFeatured: bundle.is_featured,
        isPopular: bundle.is_popular,
        status: bundle.status,
        validityStart: bundle.validity_start,
        validityEnd: bundle.validity_end,
        createdAt: bundle.created_at,
      };
    } catch (error) {
      throw new Error(`Failed to get bundle statistics: ${error.message}`);
    }
  }

  /**
   * Get bundle performance comparison for an event
   * @param {string} eventId - Event ID
   * @returns {Promise<Array>} - Bundle performance data
   */
  async getBundlePerformance(eventId) {
    try {
      const bundles = await this.repository.findByEvent(eventId, { lean: true });

      const performanceData = await Promise.all(
        bundles.map(async bundle => {
          const purchaseStats = await this.paymentRepository.getStatsByBundle(bundle._id);
          
          return {
            bundleId: bundle._id,
            bundleName: bundle.name,
            voteCount: bundle.vote_count,
            price: bundle.price,
            pricePerVote: bundle.price / bundle.vote_count,
            totalPurchases: bundle.total_purchases,
            totalRevenue: purchaseStats.totalRevenue || 0,
            totalVotesSold: bundle.total_purchases * bundle.vote_count,
            conversionRate: 0, // Would need view tracking
            isFeatured: bundle.is_featured,
            isPopular: bundle.is_popular,
          };
        })
      );

      // Sort by revenue
      performanceData.sort((a, b) => b.totalRevenue - a.totalRevenue);

      return performanceData;
    } catch (error) {
      throw new Error(`Failed to get bundle performance: ${error.message}`);
    }
  }
}

export default new BundleService();
