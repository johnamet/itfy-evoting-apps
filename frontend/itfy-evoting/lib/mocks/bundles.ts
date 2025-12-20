// src/lib/mocks/bundles.ts
import type { Bundle, Coupon } from '@/types';

export const mockBundles: Bundle[] = [
  {
    _id: 'bundle1',
    name: 'Starter Pack',
    description: 'Perfect for trying out the voting experience',
    slug: 'starter-pack',
    event: 'event1',
    categories: [],
    vote_count: 5,
    price: 5.00,
    currency: 'GHS',
    discount_percentage: 0,
    original_price: 5.00,
    is_featured: false,
    is_popular: false,
    display_order: 1,
    status: 'active',
    valid_from: '2025-01-01T00:00:00Z',
    valid_until: '2025-12-31T23:59:59Z',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    _id: 'bundle2',
    name: 'Basic Bundle',
    description: 'Great value for supporting your favorite nominee',
    slug: 'basic-bundle',
    event: 'event1',
    categories: [],
    vote_count: 10,
    price: 9.00,
    currency: 'GHS',
    discount_percentage: 10,
    original_price: 10.00,
    is_featured: false,
    is_popular: true,
    display_order: 2,
    status: 'active',
    valid_from: '2025-01-01T00:00:00Z',
    valid_until: '2025-12-31T23:59:59Z',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    _id: 'bundle3',
    name: 'Popular Pack',
    description: 'Our most popular choice! Best value for dedicated supporters',
    slug: 'popular-pack',
    event: 'event1',
    categories: [],
    vote_count: 25,
    price: 20.00,
    currency: 'GHS',
    discount_percentage: 20,
    original_price: 25.00,
    is_featured: true,
    is_popular: true,
    display_order: 3,
    status: 'active',
    valid_from: '2025-01-01T00:00:00Z',
    valid_until: '2025-12-31T23:59:59Z',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    _id: 'bundle4',
    name: 'Super Supporter',
    description: 'Show maximum support with this premium bundle',
    slug: 'super-supporter',
    event: 'event1',
    categories: [],
    vote_count: 50,
    price: 35.00,
    currency: 'GHS',
    discount_percentage: 30,
    original_price: 50.00,
    is_featured: true,
    is_popular: false,
    display_order: 4,
    status: 'active',
    valid_from: '2025-01-01T00:00:00Z',
    valid_until: '2025-12-31T23:59:59Z',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    _id: 'bundle5',
    name: 'Ultimate Fan',
    description: 'The ultimate package for die-hard fans. Maximum votes, maximum impact!',
    slug: 'ultimate-fan',
    event: 'event1',
    categories: [],
    vote_count: 100,
    price: 60.00,
    currency: 'GHS',
    discount_percentage: 40,
    original_price: 100.00,
    is_featured: true,
    is_popular: false,
    display_order: 5,
    status: 'active',
    valid_from: '2025-01-01T00:00:00Z',
    valid_until: '2025-12-31T23:59:59Z',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
];

export const mockCoupons: Coupon[] = [
  {
    _id: 'coupon1',
    code: 'WELCOME10',
    description: 'Welcome discount for new voters',
    event: 'event1',
    applicable_bundles: [],
    discount_type: 'percentage',
    discount_value: 10,
    max_discount_amount: 10,
    min_purchase_amount: 5,
    status: 'active',
    max_total_uses: 1000,
    max_uses_per_user: 1,
    current_redemptions: 150,
    validity_start: '2025-01-01T00:00:00Z',
    validity_end: '2025-12-31T23:59:59Z',
    is_public: true,
    terms_and_conditions: 'Valid for first-time purchases only. Cannot be combined with other offers.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    _id: 'coupon2',
    code: 'VOTE2025',
    description: 'Special 2025 voting season discount',
    event: 'event1',
    applicable_bundles: ['bundle3', 'bundle4', 'bundle5'],
    discount_type: 'percentage',
    discount_value: 15,
    max_discount_amount: 20,
    min_purchase_amount: 15,
    status: 'active',
    max_total_uses: 500,
    max_uses_per_user: 2,
    current_redemptions: 89,
    validity_start: '2025-01-01T00:00:00Z',
    validity_end: '2025-06-30T23:59:59Z',
    is_public: true,
    terms_and_conditions: 'Valid on select bundles only. Limited time offer.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    _id: 'coupon3',
    code: 'FLAT5OFF',
    description: 'Flat GHS 5 off on any purchase',
    event: 'event1',
    applicable_bundles: [],
    discount_type: 'fixed',
    discount_value: 5,
    min_purchase_amount: 10,
    status: 'active',
    max_total_uses: 200,
    max_uses_per_user: 1,
    current_redemptions: 45,
    validity_start: '2025-01-01T00:00:00Z',
    validity_end: '2025-03-31T23:59:59Z',
    is_public: false,
    terms_and_conditions: 'Minimum purchase of GHS 10 required.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
];

// Helper function to get bundles by event
export function getBundlesByEvent(eventId: string): Bundle[] {
  return mockBundles.filter(bundle => bundle.event === eventId && bundle.status === 'active');
}

// Helper function to get featured bundles
export function getFeaturedBundles(): Bundle[] {
  return mockBundles.filter(bundle => bundle.is_featured && bundle.status === 'active');
}

// Helper function to get popular bundles
export function getPopularBundles(): Bundle[] {
  return mockBundles.filter(bundle => bundle.is_popular && bundle.status === 'active');
}

// Helper function to validate coupon
export function validateCoupon(
  code: string, 
  bundleId: string, 
  amount: number
): { valid: boolean; coupon?: Coupon; message?: string } {
  const coupon = mockCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
  
  if (!coupon) {
    return { valid: false, message: 'Invalid coupon code' };
  }
  
  if (coupon.status !== 'active') {
    return { valid: false, message: 'This coupon is no longer active' };
  }
  
  const now = new Date();
  if (coupon.validity_end && new Date(coupon.validity_end) < now) {
    return { valid: false, message: 'This coupon has expired' };
  }
  
  if (coupon.validity_start && new Date(coupon.validity_start) > now) {
    return { valid: false, message: 'This coupon is not yet valid' };
  }
  
  if (coupon.max_total_uses && coupon.current_redemptions >= coupon.max_total_uses) {
    return { valid: false, message: 'This coupon has reached its maximum usage limit' };
  }
  
  if (amount < coupon.min_purchase_amount) {
    return { 
      valid: false, 
      message: `Minimum purchase of GHS ${coupon.min_purchase_amount} required for this coupon` 
    };
  }
  
  if (coupon.applicable_bundles && coupon.applicable_bundles.length > 0) {
    if (!coupon.applicable_bundles.includes(bundleId)) {
      return { valid: false, message: 'This coupon is not valid for the selected bundle' };
    }
  }
  
  return { valid: true, coupon };
}

// Helper function to apply coupon discount
export function applyCouponDiscount(
  coupon: Coupon, 
  originalAmount: number
): { discountAmount: number; finalAmount: number } {
  let discountAmount = 0;
  
  if (coupon.discount_type === 'percentage') {
    discountAmount = (originalAmount * coupon.discount_value) / 100;
    if (coupon.max_discount_amount) {
      discountAmount = Math.min(discountAmount, coupon.max_discount_amount);
    }
  } else {
    discountAmount = coupon.discount_value;
  }
  
  const finalAmount = Math.max(0, originalAmount - discountAmount);
  
  return { discountAmount, finalAmount };
}
