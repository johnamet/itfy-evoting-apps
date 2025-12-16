/**
 * Event Service
 * Business logic for event management
 */

import BaseService from "../shared/base.service.js";
import EventRepository from "./event.repository.js";
import CategoryRepository from "../category/category.repository.js";
import FormRepository from "../form/form.repository.js";
import ActivityService from "../activity/activity.service.js";
import NotificationService from "../../services/notification.service.js";
import agendaManager from "../../services/agenda.service.js";
import EventValidation from "./event.validation.js";
import { STATUS, VISIBILITY } from "../../utils/constants/event.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

class EventService extends BaseService {
  constructor() {
    super(EventRepository);
    this.categoryRepository = new CategoryRepository();
    this.formRepository = new FormRepository();
  }

  // ==================== EVENT LIFECYCLE ====================

  /**
   * Create a new event
   * @param {Object} eventData - Event data
   * @param {string|mongoose.Types.ObjectId} adminId - Creating admin ID
   * @returns {Promise<Object>} - Created event
   */
  async createEvent(eventData, adminId) {
    try {
      // Validate input data
      const { error, value } = EventValidation.createEventSchema.validate(eventData, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      // Use validated data
      const validatedData = value;

      // Set created_by
      validatedData.created_by = adminId;

      // Set initial status based on dates
      const now = new Date();
      const startDate = new Date(validatedData.start_date);
      
      if (!validatedData.status) {
        validatedData.status = startDate > now ? STATUS.UPCOMING : STATUS.ACTIVE;
      }

      // Create event
      const event = await this.repository.create(validatedData);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.EVENT_CREATED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: event._id,
        eventId: event._id,
        description: `Created event: ${event.name}`,
        metadata: { eventName: event.name },
      });

      return event;
    } catch (error) {
      throw new Error(`Create event failed: ${error.message}`);
    }
  }

  /**
   * Update an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} updateData - Update data
   * @param {string|mongoose.Types.ObjectId} adminId - Updating admin ID
   * @returns {Promise<Object>} - Updated event
   */
  async updateEvent(eventId, updateData, adminId) {
    try {
      // Validate input data
      const { error, value } = EventValidation.updateEventSchema.validate(updateData, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errorMessages = error.details.map(detail => detail.message).join(", ");
        throw new Error(`Validation failed: ${errorMessages}`);
      }

      const validatedData = value;

      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      // Update event with validated data
      const updated = await this.repository.updateById(eventId, validatedData);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.EVENT_UPDATED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Updated event: ${updated.name}`,
        metadata: { changes: Object.keys(updateData) },
      });

      return updated;
    } catch (error) {
      throw new Error(`Update event failed: ${error.message}`);
    }
  }

  /**
   * Publish an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Published event
   */
  async publishEvent(eventId, adminId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      if (event.is_published) {
        throw new Error("Event is already published");
      }

      // Validate event has required data
      if (!event.name || !event.description || !event.start_date || !event.end_date) {
        throw new Error("Event must have name, description, and dates before publishing");
      }

      const published = await this.repository.updateById(eventId, {
        is_published: true,
        published_at: new Date(),
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.EVENT_PUBLISHED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Published event: ${event.name}`,
      });

      // Schedule event reminder emails
      const eventDate = new Date(event.end_date);
      const oneDayBefore = new Date(eventDate);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);

      if (oneDayBefore > new Date()) {
        await agendaManager.schedule(oneDayBefore, "send-event-reminder-emails", {
          eventId: eventId.toString(),
          reminderType: "24_hours_left",
        });
      }

      return published;
    } catch (error) {
      throw new Error(`Publish event failed: ${error.message}`);
    }
  }

  /**
   * Unpublish an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Unpublished event
   */
  async unpublishEvent(eventId, adminId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      const unpublished = await this.repository.updateById(eventId, {
        is_published: false,
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.EVENT_UNPUBLISHED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Unpublished event: ${event.name}`,
      });

      return unpublished;
    } catch (error) {
      throw new Error(`Unpublish event failed: ${error.message}`);
    }
  }

  /**
   * Archive an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Archived event
   */
  async archiveEvent(eventId, adminId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      if (event.status === STATUS.ARCHIVED) {
        throw new Error("Event is already archived");
      }

      const archived = await this.repository.updateById(eventId, {
        status: STATUS.ARCHIVED,
        is_published: false,
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.EVENT_ARCHIVED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Archived event: ${event.name}`,
      });

      // Schedule results publishing if not already published
      if (!event.results_published) {
        await agendaManager.now("publish-event-results", {
          eventId: eventId.toString(),
        });
      }

      return archived;
    } catch (error) {
      throw new Error(`Archive event failed: ${error.message}`);
    }
  }

  /**
   * Clone an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID to clone
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @param {Object} [overrides] - Data to override in cloned event
   * @returns {Promise<Object>} - Cloned event
   */
  async cloneEvent(eventId, adminId, overrides = {}) {
    try {
      const originalEvent = await this.repository.findById(eventId, { lean: true });
      
      if (!originalEvent) {
        throw new Error("Event not found");
      }

      // Remove fields that shouldn't be cloned
      const {
        _id,
        created_at,
        updated_at,
        deleted_at,
        published_at,
        current_attendees,
        total_revenue,
        __v,
        ...cloneData
      } = originalEvent;

      // Apply overrides
      const newEventData = {
        ...cloneData,
        ...overrides,
        name: overrides.name || `${originalEvent.name} (Copy)`,
        slug: overrides.slug || `${originalEvent.slug}-copy-${Date.now()}`,
        is_published: false,
        status: STATUS.DRAFT,
        created_by: adminId,
      };

      const clonedEvent = await this.repository.create(newEventData);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.EVENT_CREATED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: clonedEvent._id,
        eventId: clonedEvent._id,
        description: `Cloned event from: ${originalEvent.name}`,
        metadata: { originalEventId: eventId, originalEventName: originalEvent.name },
      });

      return clonedEvent;
    } catch (error) {
      throw new Error(`Clone event failed: ${error.message}`);
    }
  }

  // ==================== VOTING MANAGEMENT ====================

  /**
   * Start voting for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated event
   */
  async startVoting(eventId, adminId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      if (event.voting_active) {
        throw new Error("Voting is already active");
      }

      const now = new Date();
      const votingStart = event.voting_start || now;

      const updated = await this.repository.updateById(eventId, {
        voting_active: true,
        voting_start: votingStart,
      });

      // Notify all candidates
      await NotificationService.notifyEventVotingStarted(eventId);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.VOTING_STARTED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Started voting for event: ${event.name}`,
      });

      return updated;
    } catch (error) {
      throw new Error(`Start voting failed: ${error.message}`);
    }
  }

  /**
   * Stop voting for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated event
   */
  async stopVoting(eventId, adminId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      if (!event.voting_active) {
        throw new Error("Voting is not active");
      }

      const updated = await this.repository.updateById(eventId, {
        voting_active: false,
        voting_end: new Date(),
      });

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.VOTING_ENDED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Stopped voting for event: ${event.name}`,
      });

      return updated;
    } catch (error) {
      throw new Error(`Stop voting failed: ${error.message}`);
    }
  }

  /**
   * Publish results for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string|mongoose.Types.ObjectId} adminId - Admin ID
   * @returns {Promise<Object>} - Updated event
   */
  async publishResults(eventId, adminId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      if (event.results_published) {
        throw new Error("Results are already published");
      }

      if (event.voting_active) {
        throw new Error("Cannot publish results while voting is active. Stop voting first.");
      }

      const updated = await this.repository.updateById(eventId, {
        results_published: true,
        results_published_at: new Date(),
      });

      // Notify all participants
      await NotificationService.notifyEventResultsPublished(eventId);

      // Log activity
      await ActivityService.log({
        userId: adminId,
        action: ACTION_TYPE.RESULTS_PUBLISHED,
        entityType: ENTITY_TYPE.EVENT,
        entityId: eventId,
        eventId,
        description: `Published results for event: ${event.name}`,
      });

      return updated;
    } catch (error) {
      throw new Error(`Publish results failed: ${error.message}`);
    }
  }

  // ==================== QUERY METHODS ====================

  /**
   * Get event by ID with full details
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Event
   */
  async getEventById(eventId, options = {}) {
    try {
      return await this.repository.findById(eventId, {
        ...options,
        populate: [
          { path: "created_by", select: "first_name last_name email role" },
          { path: "registration_form", select: "name form_type" },
        ],
      });
    } catch (error) {
      throw new Error(`Get event by ID failed: ${error.message}`);
    }
  }

  /**
   * Get event by slug
   * @param {string} slug - Event slug
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Event
   */
  async getEventBySlug(slug, options = {}) {
    try {
      return await this.repository.findOne(
        { slug },
        {
          ...options,
          populate: [
            { path: "created_by", select: "first_name last_name email role" },
            { path: "registration_form", select: "name form_type" },
          ],
        }
      );
    } catch (error) {
      throw new Error(`Get event by slug failed: ${error.message}`);
    }
  }

  /**
   * Get upcoming events
   * @param {number} [limit=10] - Max events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Upcoming events
   */
  async getUpcomingEvents(limit = 10, options = {}) {
    try {
      return await this.repository.findUpcoming(limit, options);
    } catch (error) {
      throw new Error(`Get upcoming events failed: ${error.message}`);
    }
  }

  /**
   * Get active/ongoing events
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Active events
   */
  async getActiveEvents(options = {}) {
    try {
      return await this.repository.findActive(options);
    } catch (error) {
      throw new Error(`Get active events failed: ${error.message}`);
    }
  }

  /**
   * Get featured events
   * @param {number} [limit=5] - Max events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Featured events
   */
  async getFeaturedEvents(limit = 5, options = {}) {
    try {
      return await this.repository.findFeatured(limit, options);
    } catch (error) {
      throw new Error(`Get featured events failed: ${error.message}`);
    }
  }

  /**
   * Search events
   * @param {string} query - Search query
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated results
   */
  async searchEvents(query, page = 1, limit = 10, options = {}) {
    try {
      return await this.repository.search(query, page, limit, options);
    } catch (error) {
      throw new Error(`Search events failed: ${error.message}`);
    }
  }

  // ==================== REGISTRATION MANAGEMENT ====================

  /**
   * Check if event registration is open
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<boolean>} - True if registration is open
   */
  async isRegistrationOpen(eventId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      const now = new Date();
      const registrationStart = event.registration_start || event.start_date;
      const registrationEnd = event.registration_end || event.end_date;

      return (
        event.is_published &&
        event.registration_enabled &&
        now >= new Date(registrationStart) &&
        now <= new Date(registrationEnd) &&
        event.current_attendees < event.max_attendees
      );
    } catch (error) {
      throw new Error(`Check registration open failed: ${error.message}`);
    }
  }

  /**
   * Check if event voting is active
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<boolean>} - True if voting is active
   */
  async isVotingActive(eventId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      if (!event.voting_active) {
        return false;
      }

      const now = new Date();
      const votingStart = event.voting_start;
      const votingEnd = event.voting_end;

      if (votingStart && now < new Date(votingStart)) {
        return false;
      }

      if (votingEnd && now > new Date(votingEnd)) {
        return false;
      }

      return true;
    } catch (error) {
      throw new Error(`Check voting active failed: ${error.message}`);
    }
  }

  /**
   * Get event statistics
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object>} - Event statistics
   */
  async getEventStatistics(eventId) {
    try {
      const event = await this.repository.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      // Get category count
      const categoryCount = await this.categoryRepository.count({ event: eventId });

      // Get forms count
      const formsCount = await this.formRepository.count({ event: eventId });

      return {
        eventId: event._id,
        eventName: event.name,
        status: event.status,
        isPublished: event.is_published,
        votingActive: event.voting_active,
        resultsPublished: event.results_published,
        categories: categoryCount,
        forms: formsCount,
        currentAttendees: event.current_attendees || 0,
        maxAttendees: event.max_attendees || 0,
        totalRevenue: event.total_revenue || 0,
        startDate: event.start_date,
        endDate: event.end_date,
        votingStart: event.voting_start,
        votingEnd: event.voting_end,
      };
    } catch (error) {
      throw new Error(`Get event statistics failed: ${error.message}`);
    }
  }
}

export default new EventService();
