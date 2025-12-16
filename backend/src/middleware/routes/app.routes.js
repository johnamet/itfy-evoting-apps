/**
 * The index router that combines all modules routes
 */
import express from "express";

// Auth
import authRouter from "../../modules/auth/auth.route.js";

// Core modules
import userRouter from "../../modules/user/user.route.js";
import eventRouter from "../../modules/event/event.route.js";
import categoryRouter from "../../modules/category/category.route.js";
import candidateRouter from "../../modules/candidate/candidate.route.js";

// Form & submissions
import formRouter from "../../modules/form/form.route.js";
import submissionRouter from "../../modules/form/submission.route.js";

// Vote modules
import voteRouter from "../../modules/vote/vote/vote.route.js";
import bundleRouter from "../../modules/vote/bundle/bundle.route.js";
import couponRouter from "../../modules/vote/coupon/coupon.route.js";

// Supporting modules
import slideRouter from "../../modules/slide/slide.route.js";
import notificationRouter from "../../modules/notification/notification.route.js";
import paymentRouter from "../../modules/payment/payment.route.js";

const router = express.Router();

// ==================== AUTH ====================
router.use("/auth", authRouter);

// ==================== CORE MODULES ====================
router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/categories", categoryRouter);
router.use("/candidates", candidateRouter);

// ==================== FORM & SUBMISSIONS ====================
router.use("/forms", formRouter);
router.use("/submissions", submissionRouter);

// ==================== VOTE MODULES ====================
router.use("/votes", voteRouter);
router.use("/bundles", bundleRouter);
router.use("/coupons", couponRouter);

// ==================== SUPPORTING MODULES ====================
router.use("/slides", slideRouter);
router.use("/notifications", notificationRouter);
router.use("/payments", paymentRouter);

export default router;