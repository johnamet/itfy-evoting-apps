/**
 * Candidate Routes
 * Defines all candidate management endpoints for admins and candidates
 */

import { Router } from "express";
import CandidateController from "./candidate.controller.js";
import FileService from "../../services/file.service.js";
import {
  authenticate,
  authenticateCandidate,
  authorize,
  adminOnly,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";
import { ROLES } from "../../utils/constants/user.constants.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

/**
 * @route   GET /api/candidates/public
 * @desc    Get all published and approved candidates (public)
 * @access  Public
 */
router.get(
  "/public",
  (req, res) => CandidateController.listPublic(req, res)
);

/**
 * @route   GET /api/candidates/slug/:slug
 * @desc    Get candidate by slug (public)
 * @access  Public
 */
router.get(
  "/slug/:slug",
  (req, res) => CandidateController.getBySlug(req, res)
);

/**
 * @route   GET /api/candidates/code/:code
 * @desc    Get candidate by unique code (public)
 * @access  Public
 */
router.get(
  "/code/:code",
  (req, res) => CandidateController.getByCode(req, res)
);

// ==================== CANDIDATE SELF-SERVICE ROUTES ====================

/**
 * @route   GET /api/candidates/profile
 * @desc    Get own profile (authenticated candidate)
 * @access  Private (candidate)
 */
router.get(
  "/profile",
  authenticateCandidate,
  (req, res) => CandidateController.getProfile(req, res)
);

/**
 * @route   PUT /api/candidates/profile
 * @desc    Update own profile (authenticated candidate)
 * @access  Private (candidate)
 */
router.put(
  "/profile",
  authenticateCandidate,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE),
  (req, res) => CandidateController.updateProfile(req, res)
);

/**
 * @route   GET /api/candidates/profile/history
 * @desc    Get profile update history (authenticated candidate)
 * @access  Private (candidate)
 */
router.get(
  "/profile/history",
  authenticateCandidate,
  (req, res) => CandidateController.getProfileHistory(req, res)
);

/**
 * @route   GET /api/candidates/profile/stats
 * @desc    Get own statistics (authenticated candidate)
 * @access  Private (candidate)
 */
router.get(
  "/profile/stats",
  authenticateCandidate,
  (req, res) => CandidateController.getMyStats(req, res)
);

/**
 * @route   POST /api/candidates/profile/image
 * @desc    Upload profile image (authenticated candidate)
 * @access  Private (candidate)
 */
router.post(
  "/profile/image",
  authenticateCandidate,
  FileService.uploadCandidatePhoto,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: () => "Uploaded profile image",
  }),
  (req, res) => CandidateController.uploadProfileImage(req, res)
);

/**
 * @route   DELETE /api/candidates/profile/image
 * @desc    Delete profile image (authenticated candidate)
 * @access  Private (candidate)
 */
router.delete(
  "/profile/image",
  authenticateCandidate,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: () => "Deleted profile image",
  }),
  (req, res) => CandidateController.deleteProfileImage(req, res)
);

/**
 * @route   POST /api/candidates/profile/cover
 * @desc    Upload cover image (authenticated candidate)
 * @access  Private (candidate)
 */
router.post(
  "/profile/cover",
  authenticateCandidate,
  FileService.uploadCandidatePhoto,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: () => "Uploaded cover image",
  }),
  (req, res) => CandidateController.uploadCoverImage(req, res)
);

/**
 * @route   POST /api/candidates/profile/gallery
 * @desc    Upload gallery images (authenticated candidate)
 * @access  Private (candidate)
 */
router.post(
  "/profile/gallery",
  authenticateCandidate,
  FileService.uploadMultipleImages,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Uploaded ${req.files?.length || 0} gallery images`,
  }),
  (req, res) => CandidateController.uploadGalleryImages(req, res)
);

/**
 * @route   DELETE /api/candidates/profile/gallery
 * @desc    Delete gallery image (authenticated candidate)
 * @access  Private (candidate)
 */
router.delete(
  "/profile/gallery",
  authenticateCandidate,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: () => "Deleted gallery image",
  }),
  (req, res) => CandidateController.deleteGalleryImage(req, res)
);

/**
 * @route   POST /api/candidates/profile/categories
 * @desc    Request to be added to additional category (authenticated candidate)
 * @access  Private (candidate)
 */
router.post(
  "/profile/categories",
  authenticateCandidate,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Requested addition to category ${req.body.categoryId}`,
  }),
  (req, res) => CandidateController.requestCategoryAddition(req, res)
);

// ==================== BULK OPERATIONS (ADMIN) ====================

/**
 * @route   POST /api/candidates/bulk/approve
 * @desc    Bulk approve candidates
 * @access  Private (admin)
 */
router.post(
  "/bulk/approve",
  authenticate,
  adminOnly,
  logActivity(ACTION_TYPE.CANDIDATE_APPROVE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Bulk approved ${req.body.candidateIds?.length || 0} candidates`,
  }),
  (req, res) => CandidateController.bulkApprove(req, res)
);

/**
 * @route   POST /api/candidates/bulk/reject
 * @desc    Bulk reject candidates
 * @access  Private (admin)
 */
router.post(
  "/bulk/reject",
  authenticate,
  adminOnly,
  logActivity(ACTION_TYPE.CANDIDATE_REJECT, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Bulk rejected ${req.body.candidateIds?.length || 0} candidates`,
  }),
  (req, res) => CandidateController.bulkReject(req, res)
);

// ==================== ADMIN CRUD ROUTES ====================

/**
 * @route   GET /api/candidates
 * @desc    Get all candidates with pagination and filters
 * @access  Private (admin, organiser)
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  (req, res) => CandidateController.list(req, res)
);

/**
 * @route   POST /api/candidates
 * @desc    Create a new candidate
 * @access  Private (admin, organiser)
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATE_CREATE, ENTITY_TYPE.CANDIDATE),
  (req, res) => CandidateController.create(req, res)
);

/**
 * @route   GET /api/candidates/:id
 * @desc    Get candidate by ID
 * @access  Private (admin, organiser)
 */
router.get(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  (req, res) => CandidateController.getById(req, res)
);

/**
 * @route   PUT /api/candidates/:id
 * @desc    Update candidate
 * @access  Private (admin, organiser)
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE),
  (req, res) => CandidateController.update(req, res)
);

/**
 * @route   DELETE /api/candidates/:id
 * @desc    Delete candidate (soft delete)
 * @access  Private (admin)
 */
router.delete(
  "/:id",
  authenticate,
  adminOnly,
  logActivity(ACTION_TYPE.CANDIDATE_DELETE, ENTITY_TYPE.CANDIDATE),
  (req, res) => CandidateController.delete(req, res)
);

// ==================== STATUS MANAGEMENT (ADMIN) ====================

/**
 * @route   PUT /api/candidates/:id/approve
 * @desc    Approve candidate
 * @access  Private (admin, organiser)
 */
router.put(
  "/:id/approve",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATE_APPROVE, ENTITY_TYPE.CANDIDATE),
  (req, res) => CandidateController.approve(req, res)
);

/**
 * @route   PUT /api/candidates/:id/reject
 * @desc    Reject candidate
 * @access  Private (admin, organiser)
 */
router.put(
  "/:id/reject",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATE_REJECT, ENTITY_TYPE.CANDIDATE),
  (req, res) => CandidateController.reject(req, res)
);

/**
 * @route   PUT /api/candidates/:id/suspend
 * @desc    Suspend candidate
 * @access  Private (admin)
 */
router.put(
  "/:id/suspend",
  authenticate,
  adminOnly,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Suspended candidate ${req.params.id}`,
  }),
  (req, res) => CandidateController.suspend(req, res)
);

/**
 * @route   PUT /api/candidates/:id/reinstate
 * @desc    Reinstate suspended candidate
 * @access  Private (admin)
 */
router.put(
  "/:id/reinstate",
  authenticate,
  adminOnly,
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Reinstated candidate ${req.params.id}`,
  }),
  (req, res) => CandidateController.reinstate(req, res)
);

// ==================== CATEGORY MANAGEMENT ====================

/**
 * @route   GET /api/candidates/:id/categories
 * @desc    Get candidate's categories
 * @access  Private (admin, organiser)
 */
router.get(
  "/:id/categories",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  (req, res) => CandidateController.getCategories(req, res)
);

/**
 * @route   POST /api/candidates/:id/categories
 * @desc    Add candidate to categories
 * @access  Private (admin, organiser)
 */
router.post(
  "/:id/categories",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Added candidate ${req.params.id} to categories`,
  }),
  (req, res) => CandidateController.addToCategories(req, res)
);

/**
 * @route   DELETE /api/candidates/:id/categories
 * @desc    Remove candidate from categories
 * @access  Private (admin, organiser)
 */
router.delete(
  "/:id/categories",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.CANDIDATE_UPDATE, ENTITY_TYPE.CANDIDATE, {
    getDescription: (req) => `Removed candidate ${req.params.id} from categories`,
  }),
  (req, res) => CandidateController.removeFromCategories(req, res)
);

// ==================== STATISTICS ====================

/**
 * @route   GET /api/candidates/:id/stats
 * @desc    Get candidate statistics
 * @access  Private (admin, organiser, or candidate owner)
 */
router.get(
  "/:id/stats",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  (req, res) => CandidateController.getStats(req, res)
);

/**
 * @route   GET /api/candidates/:id/votes
 * @desc    Get candidate vote count
 * @access  Private (admin, organiser)
 */
router.get(
  "/:id/votes",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  (req, res) => CandidateController.getVotes(req, res)
);

export default router;
