/**
 * Category Service
 * Handles business logic for voting category management
 * 
 * Features:
 * - CRUD operations for categories
 * - Voting lifecycle (open/close voting, manage deadlines)
 * - Candidate management (add/remove candidates from categories)
 * - Featured categories
 * - Category statistics and analytics
 * - Display order management
 * - Vote counting and results
 */

import BaseService from "../shared/base.service.js";
import CategoryRepository from "./category.repository.js";
import CategoryValidation from "./category.validation.js";
import CandidateRepository from "../candidate/candidate.repository.js";
import EventRepository from "../event/event.repository.js";
import agendaManager from "../../services/agenda.service.js";
import { STATUS, RESULTS_VISIBILITY } from "../../utils/constants/category.constants.js";
import { NOTIFICATION_TYPE } from "../../utils/constants/notification.constants.js";
import NotificationService from "../../services/notification.service.js";

BaseService.setValidation(CategoryValidation);

class CategoryService extends BaseService {
  constructor() {
    super();
    this.repository = CategoryRepository;
    this.candidateRepository = CandidateRepository;
    this.eventRepository = EventRepository;
  }

  // ==================== CRUD OPERATIONS ====================

  /**
   * Create a new category
   * @param {Object} data - Category data
   * @param {string} userId - User ID creating the category
   * @returns {Promise<Object>} - Created category
   */
  async createCategory(data, userId) {
    try {
      // Validate input
      const validated = this.validate(data, CategoryValidation.createCategorySchema);

      // Verify event exists
      const event = await this.eventRepository.findById(validated.event);
      if (!event) {
        throw new Error("Event not found");
      }

      // Check for duplicate name in same event
      const existing = await this.repository.findOne({
        event: validated.event,
        name: validated.name,
      });

      if (existing) {
        throw new Error("A category with this name already exists for this event");
      }

      // Create category
      const category = await this.repository.create({
        ...validated,
        created_by: userId,
        total_votes: 0,
      });

      // Create notification for event admin
      await NotificationService.create({
        userId: event.created_by,
        type: NOTIFICATION_TYPE.CATEGORY_CREATED,
        title: "New Category Created",
        message: `Category "${category.name}" was created for event "${event.title}"`,
        eventId: event._id,
        categoryId: category._id,
        actionUrl: `/admin/events/${event._id}/categories/${category._id}`,
      });

      return category;
    } catch (error) {
      throw new Error(`Create category failed: ${error.message}`);
    }
  }

  /**
   * Get category by ID
   * @param {string} categoryId - Category ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Category
   */
  async getCategoryById(categoryId, options = {}) {
    try {
      const category = await this.repository.findById(categoryId, {
        ...options,
        populate: ["event", "candidates", "created_by", "updated_by"],
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    } catch (error) {
      throw new Error(`Get category failed: ${error.message}`);
    }
  }

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Category
   */
  async getCategoryBySlug(slug, options = {}) {
    try {
      const category = await this.repository.findBySlug(slug, {
        ...options,
        populate: ["event", "candidates"],
      });

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    } catch (error) {
      throw new Error(`Get category by slug failed: ${error.message}`);
    }
  }

  /**
   * Get all categories for an event
   * @param {string} eventId - Event ID
   * @param {Object} filters - Query filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} - Paginated categories
   */
  async getCategoriesByEvent(eventId, filters = {}, page = 1, limit = 20) {
    try {
      const query = { event: eventId, ...filters };
      
      return await this.repository.findAll(query, page, limit, {
        populate: ["candidates"],
        sort: { display_order: 1, name: 1 },
      });
    } catch (error) {
      throw new Error(`Get categories by event failed: ${error.message}`);
    }
  }

  /**
   * Update category
   * @param {string} categoryId - Category ID
   * @param {Object} data - Update data
   * @param {string} userId - User ID performing update
   * @returns {Promise<Object>} - Updated category
   */
  async updateCategory(categoryId, data, userId) {
    try {
      // Validate input
      const validated = this.validate(data, CategoryValidation.updateCategorySchema);

      // Check if category exists
      const category = await this.repository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      // Check for duplicate name if name is being changed
      if (validated.name && validated.name !== category.name) {
        const existing = await this.repository.findOne({
          event: category.event,
          name: validated.name,
          _id: { $ne: categoryId },
        });

        if (existing) {
          throw new Error("A category with this name already exists for this event");
        }
      }

      // Update category
      const updated = await this.repository.updateById(categoryId, {
        ...validated,
        updated_by: userId,
      });

      return updated;
    } catch (error) {
      throw new Error(`Update category failed: ${error.message}`);
    }
  }

  /**
   * Delete category (soft delete)
   * @param {string} categoryId - Category ID
   * @returns {Promise<Object>} - Deleted category
   */
  async deleteCategory(categoryId) {
    try {
      const category = await this.repository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      // Check if voting is open
      if (category.is_voting_open) {
        throw new Error("Cannot delete a category with active voting");
      }

      // Soft delete
      return await this.repository.delete({ _id: categoryId });
    } catch (error) {
      throw new Error(`Delete category failed: ${error.message}`);
    }
  }

  // ==================== VOTING MANAGEMENT ====================

  /**
   * Open voting for a category
   * @param {string} categoryId - Category ID
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async openVoting(categoryId, userId) {
    try {
      const category = await this.repository.findById(categoryId, {
        populate: ["event", "candidates"],
      });

      if (!category) {
        throw new Error("Category not found");
      }

      // Validate voting can be opened
      if (category.is_voting_open) {
        throw new Error("Voting is already open");
      }

      if (category.status !== STATUS.ACTIVE) {
        throw new Error(`Cannot open voting for ${category.status} category`);
      }

      if (!category.candidates || category.candidates.length < category.min_candidates) {
        throw new Error(`Category must have at least ${category.min_candidates} candidates`);
      }

      // Open voting
      const updated = await this.repository.openVoting(categoryId);

      // Create notifications for voters
      await NotificationService.create({
        type: NOTIFICATION_TYPE.VOTING_STARTED,
        title: "Voting Started",
        message: `Voting is now open for "${category.name}"`,
        eventId: category.event._id || category.event,
        categoryId: category._id,
        actionUrl: `/events/${category.event._id || category.event}/categories/${category._id}/vote`,
      });

      return updated;
    } catch (error) {
      throw new Error(`Open voting failed: ${error.message}`);
    }
  }

  /**
   * Close voting for a category
   * @param {string} categoryId - Category ID
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async closeVoting(categoryId, userId) {
    try {
      const category = await this.repository.findById(categoryId, {
        populate: ["event"],
      });

      if (!category) {
        throw new Error("Category not found");
      }

      if (!category.is_voting_open) {
        throw new Error("Voting is not open");
      }

      // Close voting
      const updated = await this.repository.closeVoting(categoryId);

      // Update status to closed
      await this.repository.updateStatus(categoryId, STATUS.CLOSED);

      // Queue results publishing job
      await agendaManager.now("publish-category-results", {
        categoryId: category._id,
        eventId: category.event._id || category.event,
      });

      // Create notification
      await NotificationService.create({
        type: NOTIFICATION_TYPE.VOTING_ENDED,
        title: "Voting Closed",
        message: `Voting has closed for "${category.name}"`,
        eventId: category.event._id || category.event,
        categoryId: category._id,
        actionUrl: `/events/${category.event._id || category.event}/categories/${category._id}/results`,
      });

      return updated;
    } catch (error) {
      throw new Error(`Close voting failed: ${error.message}`);
    }
  }

  /**
   * Get active voting categories
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Active voting categories
   */
  async getActiveVoting(eventId = null, options = {}) {
    try {
      return await this.repository.findActiveVoting(eventId, {
        ...options,
        populate: ["event", "candidates"],
      });
    } catch (error) {
      throw new Error(`Get active voting failed: ${error.message}`);
    }
  }

  /**
   * Get upcoming voting categories
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Upcoming voting categories
   */
  async getUpcomingVoting(eventId = null, options = {}) {
    try {
      return await this.repository.findUpcomingVoting(eventId, {
        ...options,
        populate: ["event", "candidates"],
      });
    } catch (error) {
      throw new Error(`Get upcoming voting failed: ${error.message}`);
    }
  }

  /**
   * Get closed voting categories
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Closed voting categories
   */
  async getClosedVoting(eventId = null, options = {}) {
    try {
      return await this.repository.findClosedVoting(eventId, {
        ...options,
        populate: ["event", "candidates"],
      });
    } catch (error) {
      throw new Error(`Get closed voting failed: ${error.message}`);
    }
  }

  // ==================== CANDIDATE MANAGEMENT ====================

  /**
   * Add candidate to category
   * @param {string} categoryId - Category ID
   * @param {string} candidateId - Candidate ID
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async addCandidate(categoryId, candidateId, userId) {
    try {
      const category = await this.repository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      // Verify candidate exists
      const candidate = await this.candidateRepository.findById(candidateId);
      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Check if candidate is from same event
      if (candidate.event.toString() !== category.event.toString()) {
        throw new Error("Candidate must be from the same event");
      }

      // Check max candidates limit
      if (category.max_candidates && category.candidates.length >= category.max_candidates) {
        throw new Error(`Category has reached maximum of ${category.max_candidates} candidates`);
      }

      // Add candidate
      const updated = await this.repository.addCandidate(categoryId, candidateId);

      // Update candidate's categories
      if (!candidate.categories.includes(categoryId)) {
        await this.candidateRepository.updateById(candidateId, {
          $addToSet: { categories: categoryId },
        });
      }

      return updated;
    } catch (error) {
      throw new Error(`Add candidate failed: ${error.message}`);
    }
  }

  /**
   * Remove candidate from category
   * @param {string} categoryId - Category ID
   * @param {string} candidateId - Candidate ID
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async removeCandidate(categoryId, candidateId, userId) {
    try {
      const category = await this.repository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      // Check if voting is open
      if (category.is_voting_open) {
        throw new Error("Cannot remove candidates while voting is open");
      }

      // Remove candidate
      const updated = await this.repository.removeCandidate(categoryId, candidateId);

      // Update candidate's categories
      await this.candidateRepository.updateById(candidateId, {
        $pull: { categories: categoryId },
      });

      return updated;
    } catch (error) {
      throw new Error(`Remove candidate failed: ${error.message}`);
    }
  }

  // ==================== FEATURED CATEGORIES ====================

  /**
   * Get featured categories
   * @param {string} eventId - Optional event ID filter
   * @param {number} limit - Maximum number to return
   * @returns {Promise<Array>} - Featured categories
   */
  async getFeaturedCategories(eventId = null, limit = 5) {
    try {
      return await this.repository.findFeatured(eventId, limit, {
        populate: ["event", "candidates"],
      });
    } catch (error) {
      throw new Error(`Get featured categories failed: ${error.message}`);
    }
  }

  /**
   * Toggle featured status
   * @param {string} categoryId - Category ID
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async toggleFeatured(categoryId, userId) {
    try {
      return await this.repository.toggleFeatured(categoryId);
    } catch (error) {
      throw new Error(`Toggle featured failed: ${error.message}`);
    }
  }

  // ==================== DISPLAY ORDER ====================

  /**
   * Update category display order
   * @param {string} categoryId - Category ID
   * @param {number} order - New display order
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async updateDisplayOrder(categoryId, order, userId) {
    try {
      return await this.repository.updateDisplayOrder(categoryId, order);
    } catch (error) {
      throw new Error(`Update display order failed: ${error.message}`);
    }
  }

  /**
   * Bulk update display orders
   * @param {Array<{id: string, order: number}>} updates - Array of updates
   * @param {string} userId - User ID performing action
   * @returns {Promise<Array>} - Updated categories
   */
  async bulkUpdateDisplayOrder(updates, userId) {
    try {
      return await this.repository.bulkUpdateDisplayOrder(updates);
    } catch (error) {
      throw new Error(`Bulk update display order failed: ${error.message}`);
    }
  }

  // ==================== STATUS MANAGEMENT ====================

  /**
   * Update category status
   * @param {string} categoryId - Category ID
   * @param {string} status - New status
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async updateStatus(categoryId, status, userId) {
    try {
      const category = await this.repository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      // Validate status transition
      if (status === STATUS.CLOSED && category.is_voting_open) {
        throw new Error("Close voting first before changing status to closed");
      }

      return await this.repository.updateStatus(categoryId, status);
    } catch (error) {
      throw new Error(`Update status failed: ${error.message}`);
    }
  }

  /**
   * Archive category
   * @param {string} categoryId - Category ID
   * @param {string} userId - User ID performing action
   * @returns {Promise<Object>} - Updated category
   */
  async archiveCategory(categoryId, userId) {
    try {
      const category = await this.repository.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      if (category.is_voting_open) {
        throw new Error("Cannot archive a category with active voting");
      }

      return await this.repository.updateById(categoryId, {
        status: STATUS.ARCHIVED,
        is_featured: false,
        archived_at: new Date(),
        updated_by: userId,
      });
    } catch (error) {
      throw new Error(`Archive category failed: ${error.message}`);
    }
  }

  // ==================== STATISTICS & ANALYTICS ====================

  /**
   * Get category statistics for an event
   * @param {string} eventId - Event ID
   * @returns {Promise<Object>} - Category statistics
   */
  async getStatisticsByEvent(eventId) {
    try {
      return await this.repository.getStatisticsByEvent(eventId);
    } catch (error) {
      throw new Error(`Get statistics failed: ${error.message}`);
    }
  }

  /**
   * Get category results
   * @param {string} categoryId - Category ID
   * @param {string} userId - Optional user ID for permission check
   * @returns {Promise<Object>} - Category results
   */
  async getCategoryResults(categoryId, userId = null) {
    try {
      const category = await this.repository.findById(categoryId, {
        populate: ["event", "candidates"],
      });

      if (!category) {
        throw new Error("Category not found");
      }

      // Check visibility permissions
      if (category.results_visibility === RESULTS_VISIBILITY.ADMIN_ONLY && !userId) {
        throw new Error("Authentication required to view results");
      }

      // Check if results should be shown before deadline
      if (category.is_voting_open && !category.show_results_before_deadline) {
        throw new Error("Results are not available until voting closes");
      }

      // Get vote counts for each candidate
      const { default: VoteRepository } = await import("../vote/vote/vote.repository.js");
      
      const results = await VoteRepository.aggregate([
        {
          $match: {
            category: categoryId,
            status: "completed",
          },
        },
        {
          $group: {
            _id: "$candidate",
            total_votes: { $sum: "$vote_count" },
            unique_voters: { $addToSet: "$voter" },
            total_amount: { $sum: "$amount" },
          },
        },
        {
          $lookup: {
            from: "candidates",
            localField: "_id",
            foreignField: "_id",
            as: "candidate",
          },
        },
        {
          $unwind: "$candidate",
        },
        {
          $project: {
            candidate_id: "$_id",
            candidate_name: "$candidate.name",
            candidate_code: "$candidate.candidate_code",
            total_votes: 1,
            unique_voters: { $size: "$unique_voters" },
            total_amount: 1,
          },
        },
        {
          $sort: { total_votes: -1, candidate_name: 1 },
        },
      ]);

      return {
        category: {
          _id: category._id,
          name: category.name,
          total_votes: category.total_votes,
          is_voting_open: category.is_voting_open,
          voting_deadline: category.voting_deadline,
          status: category.status,
        },
        results,
        updated_at: new Date(),
      };
    } catch (error) {
      throw new Error(`Get category results failed: ${error.message}`);
    }
  }

  /**
   * Search categories
   * @param {string} searchTerm - Search term
   * @param {string} eventId - Optional event ID filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Matching categories
   */
  async searchCategories(searchTerm, eventId = null, options = {}) {
    try {
      return await this.repository.search(searchTerm, eventId, {
        ...options,
        populate: ["event", "candidates"],
      });
    } catch (error) {
      throw new Error(`Search categories failed: ${error.message}`);
    }
  }

  /**
   * Increment vote count
   * @param {string} categoryId - Category ID
   * @param {number} count - Number of votes to add
   * @returns {Promise<Object>} - Updated category
   */
  async incrementVotes(categoryId, count = 1) {
    try {
      return await this.repository.incrementVotes(categoryId, count);
    } catch (error) {
      throw new Error(`Increment votes failed: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { CategoryService };
export default new CategoryService();
