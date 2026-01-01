"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VOTE_STATUS = exports.DISCOUNT_TYPE = exports.COUPON_STATUS = exports.BUNDLE_STATUS = void 0;
// vote.constants.js
var VOTE_STATUS = exports.VOTE_STATUS = {
  ACTIVE: "active",
  REFUNDED: "refunded"
};

// bundle.constants.js
var BUNDLE_STATUS = exports.BUNDLE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived"
};

// coupon.constants.js
var COUPON_STATUS = exports.COUPON_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  EXPIRED: "expired"
};
var DISCOUNT_TYPE = exports.DISCOUNT_TYPE = {
  PERCENTAGE: "percentage",
  FIXED_AMOUNT: "fixed_amount",
  BONUS_VOTES: "bonus_votes",
  FREE_BUNDLE: "free_bundle"
};