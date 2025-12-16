/* eslint-disable no-undef */
import BaseService from "../shared/base.service.js";
import CandidateRepository from "./candidate.repository.js";
import { STATUS, ADMIN_ONLY_FIELDS, PROFILE_UPDATE_REASONS } from "../../utils/constants/candidate.constants.js";
import { NOTIFICATION_TYPE } from "../../utils/constants/notification.constants.js";
import NotificationService from "../../services/notification.service.js";
import agendaManager from "../../services/agenda.service.js";
import EmailService from "../../services/email.service.js";
import AuthHelpers from "../../utils/helpers/auth.helper.js";
import crypto from "crypto";

/**
 * Candidate Service
 * Handles business logic for candidate profile management, categories, and admin operations
 * 
 * NOTE: Authentication is handled by AuthService (auth.service.js)
 * - Use AuthService.registerCandidate() for registration
 * - Use AuthService.loginCandidate() for login
 * - Use AuthService.changePassword() for password changes
 * - Use AuthService.requestPasswordReset() and AuthService.resetPassword() for password resets
 */
class CandidateService extends BaseService {
  constructor() {
    super();
    this.repository = CandidateRepository;
  }

  /**
   * AUTHENTICATION METHODS MOVED TO AuthService
   * 
   * For authentication operations, use:
   * - AuthService.registerCandidate(data) - Register new candidate
   * - AuthService.loginCandidate(data, metadata) - Login candidate
   * - AuthService.changePassword(candidateId, data, 'candidate') - Change password
   * - AuthService.requestPasswordReset(data, 'candidate') - Request password reset
   * - AuthService.resetPassword(data, 'candidate') - Reset password with token
   */

  // ==================== PROFILE MANAGEMENT ====================

  /**
   * Get candidate profile
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Candidate profile
   */
  async getProfile(candidateId, options = {}) {
    try {
      return await this.repository.findById(candidateId, {
        ...options,
        populate: ["event", "categories", "created_by"],
      });
    } catch (error) {
      throw new Error(`Get profile failed: ${error.message}`);
    }
  }

  /**
   * Get candidate profile update history
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Array>} - Profile update history
   */
  async getProfileUpdateHistory(candidateId) {
    try {
      const candidate = await this.repository.findById(candidateId, {
        select: "profile_update_history",
      });

      return candidate?.profile_update_history || [];
    } catch (error) {
      throw new Error(`Get profile update history failed: ${error.message}`);
    }
  }

  /**
   * Update candidate profile (candidate self-update)
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} - Updated candidate
   */
  async updateProfileByCandidate(candidateId, updateData) {
    try {
      // Validate that candidate isn't updating admin-only fields
      const attemptedFields = Object.keys(updateData);
      const forbiddenFields = attemptedFields.filter((field) =>
        ADMIN_ONLY_FIELDS.includes(field)
      );

      if (forbiddenFields.length > 0) {
        throw new Error(
          `Cannot update admin-only fields: ${forbiddenFields.join(", ")}`
        );
      }

      // Get current candidate to compare changes
      const candidate = await this.repository.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Track changed fields
      const changedFields = [];
      for (const field of attemptedFields) {
        if (JSON.stringify(candidate[field]) !== JSON.stringify(updateData[field])) {
          changedFields.push(field);
        }
      }

      // If no changes, return as-is
      if (changedFields.length === 0) {
        return candidate;
      }

      // Update candidate
      const updated = await this.repository.updateById(candidateId, updateData);

      // Request re-approval if candidate was previously approved
      if (candidate.status === STATUS.APPROVED || candidate.status === STATUS.PROFILE_UPDATE_PENDING) {
        await this.repository.requestReApproval(
          candidateId,
          changedFields,
          PROFILE_UPDATE_REASONS.CORRECTION
        );

        // Notify admins
        await this.notifyAdminsOfProfileUpdate(candidateId, changedFields);
      }

      return updated;
    } catch (error) {
      throw new Error(`Update profile by candidate failed: ${error.message}`);
    }
  }

  /**
   * Update candidate profile (admin update)
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} - Updated candidate
   */
  async updateProfileByAdmin(candidateId, updateData) {
    try {
      // Admins can update any field
      return await this.repository.updateById(candidateId, updateData);
    } catch (error) {
      throw new Error(`Update profile by admin failed: ${error.message}`);
    }
  }

  /**
   * Create new candidate (admin-only, without password)
   * For candidate self-registration with password, use AuthService.registerCandidate()
   * @param {Object} candidateData - Candidate data
   * @returns {Promise<Object>} - Created candidate
   */
  async createCandidate(candidateData) {
    try {
      // Create candidate (admin creates without password - password set via email invite)
      const candidate = await this.repository.create(candidateData);

      // Remove sensitive fields from response
      const candidateObj = candidate.toObject();
      delete candidateObj.password_hash;

      return candidateObj;
    } catch (error) {
      throw new Error(`Create candidate failed: ${error.message}`);
    }
  }

  // ==================== CATEGORY MANAGEMENT ====================

  /**
   * Add category to candidate (candidate self-service)
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async addCategory(candidateId, categoryId) {
    try {
      const candidate = await this.repository.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Check if already in category
      if (candidate.categories.some((cat) => cat.toString() === categoryId.toString())) {
        throw new Error("Candidate already in this category");
      }

      // Add category
      const updated = await this.repository.addToCategory(candidateId, categoryId);

      // Request re-approval if previously approved
      if (candidate.status === STATUS.APPROVED || candidate.status === STATUS.PROFILE_UPDATE_PENDING) {
        await this.repository.requestReApproval(
          candidateId,
          ["categories"],
          PROFILE_UPDATE_REASONS.CATEGORY_CHANGE
        );

        // Notify admins
        await this.notifyAdminsOfProfileUpdate(candidateId, ["categories"]);
      }

      return updated;
    } catch (error) {
      throw new Error(`Add category failed: ${error.message}`);
    }
  }

  /**
   * Remove category from candidate (candidate self-service)
   * This will fail if trying to remove admin-verified category
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async removeCategory(candidateId, categoryId) {
    try {
      // Use model method which validates admin-verified categories
      const candidate = await this.repository.model.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // This will throw if category is admin-verified
      await candidate.removeFromCategory(categoryId);

      // Request re-approval if previously approved
      if (candidate.status === STATUS.APPROVED || candidate.status === STATUS.PROFILE_UPDATE_PENDING) {
        await this.repository.requestReApproval(
          candidateId,
          ["categories"],
          PROFILE_UPDATE_REASONS.CATEGORY_CHANGE
        );

        // Notify admins
        await this.notifyAdminsOfProfileUpdate(candidateId, ["categories"]);
      }

      return candidate;
    } catch (error) {
      throw new Error(`Remove category failed: ${error.message}`);
    }
  }

  /**
   * Admin removes category from candidate (can remove admin-verified)
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async adminRemoveCategory(candidateId, categoryId) {
    try {
      return await this.repository.adminRemoveCategory(candidateId, categoryId);
    } catch (error) {
      throw new Error(`Admin remove category failed: ${error.message}`);
    }
  }

  /**
   * Update admin-verified categories
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Array<string|mongoose.Types.ObjectId>} categoryIds - Category IDs
   * @returns {Promise<Object>} - Updated candidate
   */
  async updateAdminVerifiedCategories(candidateId, categoryIds) {
    try {
      return await this.repository.updateById(candidateId, {
        admin_verified_categories: categoryIds,
      });
    } catch (error) {
      throw new Error(`Update admin verified categories failed: ${error.message}`);
    }
  }

  // ==================== ADMIN OPERATIONS ====================

  /**
   * Approve candidate profile
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
   * @returns {Promise<Object>} - Approved candidate
   */
  async approveProfile(candidateId, adminId) {
    try {
      // Approve candidate (this syncs admin_verified_categories)
      const candidate = await this.repository.approve(candidateId, adminId);

      // Queue approval email
      await agendaManager.now("send-candidate-profile-approved-email", {
        email: candidate.email,
        name: candidate.name,
        eventId: candidate.event._id || candidate.event,
      });

      return candidate;
    } catch (error) {
      throw new Error(`Approve profile failed: ${error.message}`);
    }
  }

  /**
   * Reject candidate profile
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin user ID
   * @param {string} [reason] - Rejection reason
   * @returns {Promise<Object>} - Rejected candidate
   */
  async rejectProfile(candidateId, adminId, reason = "") {
    try {
      const candidate = await this.repository.reject(candidateId, adminId, reason);

      // Queue rejection email
      await agendaManager.now("send-candidate-profile-rejected-email", {
        email: candidate.email,
        name: candidate.name,
        reason,
      });

      return candidate;
    } catch (error) {
      throw new Error(`Reject profile failed: ${error.message}`);
    }
  }

  /**
   * Get candidates with pending profile updates
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event filter
   * @returns {Promise<Array>} - Candidates with pending updates
   */
  async getProfileUpdatesPending(eventId = null) {
    try {
      return await this.repository.findProfileUpdatesPending(eventId, {
        populate: ["event", "categories"],
      });
    } catch (error) {
      throw new Error(`Get profile updates pending failed: ${error.message}`);
    }
  }

  // ==================== NOTIFICATIONS ====================

  /**
   * Notify admins of candidate profile update
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Array<string>} changedFields - Changed fields
   * @returns {Promise<void>}
   */
  async notifyAdminsOfProfileUpdate(candidateId, changedFields = []) {
    try {
      const candidate = await this.repository.findById(candidateId, {
        populate: ["event"],
      });

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Create notification for event admins
      await NotificationService.create({
        user: candidate.event.created_by, // Event creator
        type: NOTIFICATION_TYPE.CANDIDATE_PROFILE_UPDATED,
        title: "Candidate Profile Updated",
        message: `${candidate.name} has updated their profile and requires review.`,
        data: {
          candidateId: candidate._id,
          candidateName: candidate.name,
          eventId: candidate.event._id,
          eventTitle: candidate.event.title,
          changedFields,
          profileUpdateHistory: candidate.profile_update_history.slice(-1), // Latest update
        },
        link: `/admin/events/${candidate.event._id}/candidates/${candidate._id}`,
      });

      // Queue email notification to admin
      await agendaManager.now("send-admin-profile-update-alert-email", {
        adminEmail: candidate.event.created_by.email,
        candidateName: candidate.name,
        eventTitle: candidate.event.title,
        changedFields,
      });
    } catch (error) {
      // Log error but don't fail the operation
      console.error(`Failed to notify admins of profile update: ${error.message}`);
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Find candidate by candidate code
   * @param {string} candidateCode - Candidate code
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Candidate or null
   */
  async findByCandidateCode(candidateCode, options = {}) {
    try {
      return await this.repository.findByCandidateCode(candidateCode, options);
    } catch (error) {
      throw new Error(`Find by candidate code failed: ${error.message}`);
    }
  }

  /**
   * Find candidate by email
   * @param {string} email - Email
   * @param {string|mongoose.Types.ObjectId} [eventId] - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Candidate or null
   */
  async findByEmail(email, eventId = null, options = {}) {
    try {
      return await this.repository.findByEmail(email, eventId, options);
    } catch (error) {
      throw new Error(`Find by email failed: ${error.message}`);
    }
  }

  /**
   * Find all candidates for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Candidates
   */
  async findByEvent(eventId, page = 1, limit = 20, options = {}) {
    try {
      return await this.repository.findByEvent(eventId, page, limit, options);
    } catch (error) {
      throw new Error(`Find by event failed: ${error.message}`);
    }
  }

  /**
   * Search candidates
   * @param {string} query - Search query
   * @param {Object} [filters] - Additional filters
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Matching candidates
   */
  async search(query, filters = {}, page = 1, limit = 20, options = {}) {
    try {
      return await this.repository.search(query, filters, page, limit, options);
    } catch (error) {
      throw new Error(`Search candidates failed: ${error.message}`);
    }
  }

  // ==================== NOMINATION WORKFLOW ====================

  /**
   * Create candidate from nomination submission
   * This creates a placeholder profile that the nominee must complete
   * @param {Object} nominationData - Extracted data from nomination form
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Array<string|mongoose.Types.ObjectId>} categoryIds - Category IDs
   * @param {string|mongoose.Types.ObjectId} submissionId - Submission ID
   * @param {string|mongoose.Types.ObjectId} [adminId] - ID of admin who approved the nomination
   * @returns {Promise<Object>} - Created candidate with temporary credentials
   */
  async createFromNomination(nominationData, eventId, categoryIds, submissionId, adminId = null) {
    try {
      // Validate required fields
      if (!nominationData.first_name || !nominationData.last_name || !nominationData.email) {
        throw new Error("first_name, last_name, and email are required for candidate creation");
      }

      // Check if candidate with this email already exists for this event
      const existingCandidate = await this.repository.findByEmail(nominationData.email, eventId);

      if (existingCandidate) {
        // Update existing candidate instead of creating new one
        const updateData = {
          ...nominationData,
          categories: [...new Set([...existingCandidate.categories.map(c => c.toString()), ...categoryIds.map(c => c.toString())])],
          nomination_submission: submissionId,
        };

        // If candidate was rejected, reset to pending profile completion
        if (existingCandidate.status === STATUS.REJECTED) {
          updateData.status = STATUS.PENDING_PROFILE_COMPLETION;
          updateData.rejection_reason = null;
        }

        return await this.repository.updateById(existingCandidate._id, updateData);
      }

      // Generate temporary password
      const temporaryPassword = this.generateTemporaryPassword();
      const passwordHash = await AuthHelpers.hashPassword(temporaryPassword);

      // Generate unique candidate code
      const candidateCode = await this.generateUniqueCandidateCode();

      // Generate slug
      const slug = await this.generateUniqueSlug(
        `${nominationData.first_name}-${nominationData.last_name}`
      );

      // Create candidate with pending profile completion status
      const candidateData = {
        ...nominationData,
        password_hash: passwordHash,
        candidate_code: candidateCode,
        slug,
        event: eventId,
        categories: categoryIds,
        status: STATUS.PENDING_PROFILE_COMPLETION,
        is_published: false,
        nomination_submission: submissionId,
        created_by: adminId, // Admin who approved the nomination
      };

      const candidate = await this.repository.create(candidateData);

      // Store temporary password (will be sent via email)
      candidate._temporaryPassword = temporaryPassword;

      return candidate;
    } catch (error) {
      throw new Error(`Create from nomination failed: ${error.message}`);
    }
  }

  /**
   * Send welcome email to newly created candidate from nomination
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<void>}
   */
  async sendWelcomeEmail(candidateId) {
    try {
      const candidate = await this.repository.findById(candidateId, {
        populate: ["event"],
      });

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Check if temporary password exists (for newly created candidates)
      let temporaryPassword = candidate._temporaryPassword;

      // If no temporary password, generate a password reset token instead
      if (!temporaryPassword) {
        temporaryPassword = this.generateTemporaryPassword();
        const passwordHash = await AuthHelpers.hashPassword(temporaryPassword);
        await this.repository.updateById(candidateId, { password_hash: passwordHash });
      }

      // Send welcome email with credentials
      await EmailService.sendEmail({
        to: candidate.email,
        subject: `You've Been Nominated for ${candidate.event.name} - Complete Your Profile`,
        template: "nomination-credentials",
        context: {
          candidateName: `${candidate.first_name} ${candidate.last_name}`,
          eventName: candidate.event.name,
          email: candidate.email,
          temporaryPassword,
          loginUrl: `${process.env.APP_URL || 'http://localhost:3000'}/candidate/login`,
          profileUrl: `${process.env.APP_URL || 'http://localhost:3000'}/candidate/profile`,
        },
      });

      // Queue reminder if profile not completed within 7 days
      await agendaManager.schedule("in 7 days", "send-profile-completion-reminder", {
        candidateId: candidate._id,
        email: candidate.email,
        name: `${candidate.first_name} ${candidate.last_name}`,
      });
    } catch (error) {
      throw new Error(`Send welcome email failed: ${error.message}`);
    }
  }

  /**
   * Candidate completes their pending profile
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @param {Object} profileData - Complete profile data
   * @returns {Promise<Object>} - Updated candidate
   */
  async completePendingProfile(candidateId, profileData) {
    try {
      const candidate = await this.repository.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      if (candidate.status !== STATUS.PENDING_PROFILE_COMPLETION) {
        throw new Error("Candidate profile is not in pending completion state");
      }

      // Validate that candidate isn't updating admin-only fields
      const attemptedFields = Object.keys(profileData);
      const forbiddenFields = attemptedFields.filter((field) =>
        ADMIN_ONLY_FIELDS.includes(field)
      );

      if (forbiddenFields.length > 0) {
        throw new Error(
          `Cannot update admin-only fields: ${forbiddenFields.join(", ")}`
        );
      }

      // Update profile with completed data
      const updated = await this.repository.updateById(candidateId, {
        ...profileData,
        status: STATUS.PENDING, // Move to pending approval
        profile_completed_at: new Date(),
      });

      // Notify admins for approval
      await this.notifyAdminsOfProfileCompletion(candidateId);

      return updated;
    } catch (error) {
      throw new Error(`Complete pending profile failed: ${error.message}`);
    }
  }

  /**
   * Publish candidate profile (make visible to public)
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async publishProfile(candidateId) {
    try {
      const candidate = await this.repository.findById(candidateId);

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      if (candidate.status !== STATUS.APPROVED) {
        throw new Error("Only approved candidates can be published");
      }

      return await this.repository.updateById(candidateId, {
        is_published: true,
        published_at: new Date(),
      });
    } catch (error) {
      throw new Error(`Publish profile failed: ${error.message}`);
    }
  }

  /**
   * Unpublish candidate profile
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<Object>} - Updated candidate
   */
  async unpublishProfile(candidateId) {
    try {
      return await this.repository.updateById(candidateId, {
        is_published: false,
      });
    } catch (error) {
      throw new Error(`Unpublish profile failed: ${error.message}`);
    }
  }

  /**
   * Notify admins that a candidate has completed their profile
   * @param {string|mongoose.Types.ObjectId} candidateId - Candidate ID
   * @returns {Promise<void>}
   */
  async notifyAdminsOfProfileCompletion(candidateId) {
    try {
      const candidate = await this.repository.findById(candidateId, {
        populate: ["event"],
      });

      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Create notification for event admins
      await NotificationService.create({
        user: candidate.event.created_by,
        type: NOTIFICATION_TYPE.CANDIDATE_PROFILE_COMPLETED,
        title: "Candidate Profile Completed",
        message: `${candidate.first_name} ${candidate.last_name} has completed their nomination profile and is ready for review.`,
        data: {
          candidateId: candidate._id,
          candidateName: `${candidate.first_name} ${candidate.last_name}`,
          eventId: candidate.event._id,
          eventTitle: candidate.event.name,
        },
        link: `/admin/events/${candidate.event._id}/candidates/${candidate._id}`,
      });

      // Queue email notification to admin
      await agendaManager.now("send-nomination-approved-email", {
        adminEmail: candidate.event.contact_email || candidate.event.organizer?.email,
        candidateName: `${candidate.first_name} ${candidate.last_name}`,
        eventName: candidate.event.name,
        profileUrl: `${process.env.APP_URL || 'http://localhost:3000'}/admin/events/${candidate.event._id}/candidates/${candidate._id}`,
      });
    } catch (error) {
      // Log error but don't fail the operation
      console.error(`Failed to notify admins of profile completion: ${error.message}`);
    }
  }

  /**
   * Generate temporary password for new candidates
   * @returns {string} - Temporary password
   */
  generateTemporaryPassword() {
    // Generate a secure random password: 12 characters with mixed case, numbers, and symbols
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }

    return password;
  }

  /**
   * Generate unique candidate code
   * @returns {Promise<string>} - Unique candidate code
   */
  async generateUniqueCandidateCode() {
    let code;
    let exists = true;

    while (exists) {
      // Generate format: CAN-XXXXXX (6 random alphanumeric characters)
      const random = crypto.randomBytes(3).toString("hex").toUpperCase();
      code = `CAN-${random}`;

      // Check if exists
      const existing = await this.repository.findByCandidateCode(code);
      exists = !!existing;
    }

    return code;
  }

  /**
   * Generate unique slug for candidate
   * @param {string} baseName - Base name for slug
   * @returns {Promise<string>} - Unique slug
   */
  async generateUniqueSlug(baseName) {
    let slug = baseName
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    let exists = true;
    let counter = 0;

    while (exists) {
      const testSlug = counter > 0 ? `${slug}-${counter}` : slug;
      const existing = await this.repository.findOne({ slug: testSlug });
      
      if (!existing) {
        slug = testSlug;
        exists = false;
      } else {
        counter++;
      }
    }

    return slug;
  }
}

export default new CandidateService();
