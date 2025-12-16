/**
 * Coupon Controller
 * Handles HTTP requests for coupon management and validation
 */

import BaseController from "../../shared/base.controller.js";
import CouponService from "./coupon.service.js";
import CouponValidation from "./coupon.validation.js";

class CouponController extends BaseController {
  constructor(dependencies = {}) {
    super({
      couponService: dependencies.couponService || CouponService,
    });
  }

  // ==================== COUPON CRUD ====================

  /**
   * Create a new coupon
   * POST /api/coupons
   */
  async create(req, res) {
    const validated = this.validate(req.body, CouponValidation.createCouponSchema);
    const adminId = this.getUserId(req);
    const coupon = await this.service("couponService").createCoupon(validated, adminId);

    return this.created(res, {
      data: coupon,
      message: "Coupon created successfully",
    });
  }

  /**
   * Get all coupons with pagination and filters
   * GET /api/coupons
   */
  async list(req, res) {
    const { page, limit, skip } = this.getPagination(req);
    const filters = this.getFilters(req, ["event", "status", "discount_type", "is_public"]);
    const sort = this.getSort(req, "-created_at");
    const search = this.getSearch(req);

    if (search) {
      filters.$or = [
        { code: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const result = await this.service("couponService").repository.findAll(
      filters,
      page,
      limit,
      { sort }
    );

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get coupon by ID
   * GET /api/coupons/:id
   */
  async getById(req, res) {
    const { id } = req.params;
    const coupon = await this.service("couponService").getCouponById(id);

    return this.success(res, {
      data: coupon,
    });
  }

  /**
   * Get coupon by code
   * GET /api/coupons/code/:code
   */
  async getByCode(req, res) {
    const { code } = req.params;
    const coupon = await this.service("couponService").getCouponByCode(code.toUpperCase());

    return this.success(res, {
      data: coupon,
    });
  }

  /**
   * Update coupon
   * PUT /api/coupons/:id
   */
  async update(req, res) {
    const { id } = req.params;
    const validated = this.validate(req.body, CouponValidation.updateCouponSchema);
    const adminId = this.getUserId(req);
    const coupon = await this.service("couponService").updateCoupon(id, validated, adminId);

    return this.success(res, {
      data: coupon,
      message: "Coupon updated successfully",
    });
  }

  /**
   * Delete coupon (soft delete)
   * DELETE /api/coupons/:id
   */
  async delete(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    await this.service("couponService").deleteCoupon(id, adminId);

    return this.success(res, {
      message: "Coupon deleted successfully",
    });
  }

  // ==================== STATUS MANAGEMENT ====================

  /**
   * Activate coupon
   * PUT /api/coupons/:id/activate
   */
  async activate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const coupon = await this.service("couponService").activateCoupon(id, adminId);

    return this.success(res, {
      data: coupon,
      message: "Coupon activated successfully",
    });
  }

  /**
   * Deactivate coupon
   * PUT /api/coupons/:id/deactivate
   */
  async deactivate(req, res) {
    const { id } = req.params;
    const adminId = this.getUserId(req);
    const coupon = await this.service("couponService").deactivateCoupon(id, adminId);

    return this.success(res, {
      data: coupon,
      message: "Coupon deactivated successfully",
    });
  }

  // ==================== VALIDATION & REDEMPTION ====================

  /**
   * Validate coupon for a bundle
   * POST /api/coupons/validate
   */
  async validateCoupon(req, res) {
    const validated = this.validate(req.body, CouponValidation.validateCouponSchema);
    const userEmail = req.user?.email || req.body.user_email;

    const result = await this.service("couponService").validateCouponForBundle(
      validated.code,
      validated.bundle_id,
      userEmail
    );

    return this.success(res, {
      data: result,
    });
  }

  /**
   * Apply coupon to a purchase
   * POST /api/coupons/apply
   */
  async applyCoupon(req, res) {
    const validated = this.validate(req.body, CouponValidation.applyCouponSchema);
    const userEmail = req.user?.email || req.body.user_email;

    // First validate the coupon
    const validationResult = await this.service("couponService").validateCouponForBundle(
      validated.code,
      validated.bundle_id,
      userEmail
    );

    if (!validationResult.isValid) {
      return this.badRequest(res, { message: validationResult.reason });
    }

    // Calculate discount
    const coupon = validationResult.coupon;
    let discountAmount = 0;

    switch (coupon.discount_type) {
      case "PERCENTAGE":
        discountAmount = (validated.purchase_amount * coupon.discount_value) / 100;
        if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
          discountAmount = coupon.max_discount_amount;
        }
        break;
      case "FIXED":
        discountAmount = Math.min(coupon.discount_value, validated.purchase_amount);
        break;
      case "BONUS_VOTES":
        // Bonus votes don't reduce the price
        discountAmount = 0;
        break;
    }

    const finalAmount = validated.purchase_amount - discountAmount;

    return this.success(res, {
      data: {
        coupon_code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
        discount_amount: discountAmount,
        original_amount: validated.purchase_amount,
        final_amount: finalAmount,
        bonus_votes: coupon.discount_type === "BONUS_VOTES" ? coupon.discount_value : 0,
      },
      message: "Coupon applied successfully",
    });
  }

  // ==================== EVENT-BASED QUERIES ====================

  /**
   * Get coupons by event
   * GET /api/coupons/event/:eventId
   */
  async getByEvent(req, res) {
    const { eventId } = req.params;
    const { page, limit } = this.getPagination(req);
    const result = await this.service("couponService").getCouponsByEvent(eventId, page, limit);

    return this.paginated(res, {
      data: result.data,
      page,
      limit,
      total_items: result.total,
    });
  }

  /**
   * Get active coupons for event
   * GET /api/coupons/event/:eventId/active
   */
  async getActiveByEvent(req, res) {
    const { eventId } = req.params;
    const coupons = await this.service("couponService").getActiveCoupons(eventId);

    return this.success(res, {
      data: coupons,
    });
  }

  /**
   * Get public coupons
   * GET /api/coupons/public
   */
  async getPublic(req, res) {
    const eventId = req.query.event || null;
    const coupons = await this.service("couponService").getPublicCoupons(eventId);

    return this.success(res, {
      data: coupons,
    });
  }

  // ==================== STATISTICS ====================

  /**
   * Get coupon statistics
   * GET /api/coupons/:id/stats
   */
  async getStats(req, res) {
    const { id } = req.params;
    const stats = await this.service("couponService").getCouponStats(id);

    return this.success(res, {
      data: stats,
    });
  }

  /**
   * Get user's redemption count for a coupon
   * GET /api/coupons/:id/user-redemptions
   */
  async getUserRedemptions(req, res) {
    const { id } = req.params;
    const userEmail = req.query.email || req.user?.email;

    if (!userEmail) {
      return this.badRequest(res, { message: "User email is required" });
    }

    const count = await this.service("couponService").getUserRedemptionCount(id, userEmail);

    return this.success(res, {
      data: {
        coupon_id: id,
        user_email: userEmail,
        redemption_count: count,
      },
    });
  }

  // ==================== UTILITY ====================

  /**
   * Generate a unique coupon code
   * POST /api/coupons/generate-code
   */
  async generateCode(req, res) {
    const prefix = req.body.prefix || "";
    const code = await this.service("couponService").generateCouponCode(prefix);

    return this.success(res, {
      data: { code },
    });
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { CouponController };
export default new CouponController();
