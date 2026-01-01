"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authRoute = _interopRequireDefault(require("../modules/auth/auth.route.js"));
var _userRoute = _interopRequireDefault(require("../modules/user/user.route.js"));
var _eventRoute = _interopRequireDefault(require("../modules/event/event.route.js"));
var _categoryRoute = _interopRequireDefault(require("../modules/category/category.route.js"));
var _candidateRoute = _interopRequireDefault(require("../modules/candidate/candidate.route.js"));
var _formRoute = _interopRequireDefault(require("../modules/form/form.route.js"));
var _submissionRoute = _interopRequireDefault(require("../modules/form/submission.route.js"));
var _voteRoute = _interopRequireDefault(require("../modules/vote/vote/vote.route.js"));
var _bundleRoute = _interopRequireDefault(require("../modules/vote/bundle/bundle.route.js"));
var _couponRoute = _interopRequireDefault(require("../modules/vote/coupon/coupon.route.js"));
var _slideRoute = _interopRequireDefault(require("../modules/slide/slide.route.js"));
var _notificationRoute = _interopRequireDefault(require("../modules/notification/notification.route.js"));
var _paymentRoute = _interopRequireDefault(require("../modules/payment/payment.route.js"));
var _analyticsRoute = _interopRequireDefault(require("../modules/analytics/analytics.route.js"));
var _activityRoute = _interopRequireDefault(require("../modules/activity/activity.route.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * The index router that combines all modules routes
 */

// Auth

// Core modules

// Form & submissions

// Vote modules

// Supporting modules

var router = _express["default"].Router();

// ==================== AUTH ====================
router.use("/auth", _authRoute["default"]);

// ==================== CORE MODULES ====================
router.use("/users", _userRoute["default"]);
router.use("/events", _eventRoute["default"]);
router.use("/categories", _categoryRoute["default"]);
router.use("/candidates", _candidateRoute["default"]);

// ==================== FORM & SUBMISSIONS ====================
router.use("/forms", _formRoute["default"]);
router.use("/submissions", _submissionRoute["default"]);

// ==================== VOTE MODULES ====================
router.use("/votes", _voteRoute["default"]);
router.use("/bundles", _bundleRoute["default"]);
router.use("/coupons", _couponRoute["default"]);

// ==================== SUPPORTING MODULES ====================
router.use("/slides", _slideRoute["default"]);
router.use("/notifications", _notificationRoute["default"]);
router.use("/payments", _paymentRoute["default"]);
router.use("/analytics", _analyticsRoute["default"]);
router.use("/activities", _activityRoute["default"]);
var _default = exports["default"] = router;