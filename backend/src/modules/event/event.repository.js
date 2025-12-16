/**
 * Event Repository
 * This file defines the EventRepository class which extends the BaseRepository
 * It contains event-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository";
import EventModel from "../models/event.model";
import { STATUS } from "../../utils/constants/event.constants";

class EventRepository extends BaseRepository {
  constructor() {
    super(EventModel);
  }

  /**
   * Find upcoming events
   * @param {number} [limit=10] - Maximum number of events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of upcoming events
   */
  async findUpcoming(limit = 10, options = {}) {
    try {
      const now = new Date();
      const query = this.model
        .find({
          start_date: { $gt: now },
          is_published: true,
          status: STATUS.UPCOMING,
        })
        .sort({ start_date: 1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find upcoming events failed: ${error.message}`);
    }
  }

  /**
   * Find featured events
   * @param {number} [limit=5] - Maximum number of events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of featured events
   */
  async findFeatured(limit = 5, options = {}) {
    try {
      const query = this.model
        .find({
          is_featured: true,
          is_published: true,
        })
        .sort({ start_date: 1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find featured events failed: ${error.message}`);
    }
  }

  /**
   * Find active/ongoing events
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of active events
   */
  async findActive(options = {}) {
    try {
      const now = new Date();
      const query = this.model
        .find({
          start_date: { $lte: now },
          end_date: { $gte: now },
          is_published: true,
          status: STATUS.ACTIVE,
        })
        .sort({ start_date: 1 });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find active events failed: ${error.message}`);
    }
  }

  /**
   * Find archived events
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated archived events
   */
  async findArchived(page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        { status: STATUS.ARCHIVED },
        page,
        limit,
        { ...options, sort: { end_date: -1 } }
      );
    } catch (error) {
      throw new Error(`Find archived events failed: ${error.message}`);
    }
  }

  /**
   * Find events by category
   * @param {string|mongoose.Types.ObjectId} categoryId - Category ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
   */
  async findByCategory(categoryId, page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        { categories: categoryId, is_published: true },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find events by category failed: ${error.message}`);
    }
  }

  /**
   * Find events by date range
   * @param {Date} startDate - Start of date range
   * @param {Date} endDate - End of date range
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
   */
  async findByDateRange(startDate, endDate, page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        {
          start_date: { $gte: startDate, $lte: endDate },
          is_published: true,
        },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find events by date range failed: ${error.message}`);
    }
  }

  /**
   * Find events by location (city)
   * @param {string} city - City name
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
   */
  async findByLocation(city, page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        { "location.city": city, is_published: true },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find events by location failed: ${error.message}`);
    }
  }

  /**
   * Find events by tags
   * @param {string|Array<string>} tags - Tag(s) to search for
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
   */
  async findByTags(tags, page = 1, limit = 10, options = {}) {
    try {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      return await this.findAll(
        { tags: { $in: tagArray }, is_published: true },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find events by tags failed: ${error.message}`);
    }
  }

  /**
   * Find events by event type
   * @param {string} eventType - Event type
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
   */
  async findByType(eventType, page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        { event_type: eventType, is_published: true },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find events by type failed: ${error.message}`);
    }
  }

  /**
   * Search events by name or description
   * @param {string} searchTerm - Search term
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated search results
   */
  async search(searchTerm, page = 1, limit = 10, options = {}) {
    try {
      const regex = new RegExp(searchTerm, "i");
      return await this.findAll(
        {
          $or: [
            { name: regex },
            { description: regex },
            { tags: regex },
          ],
          is_published: true,
        },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Search events failed: ${error.message}`);
    }
  }

  /**
   * Find events created by a specific user
   * @param {string|mongoose.Types.ObjectId} userId - User ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events
   */
  async findByCreator(userId, page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        { created_by: userId },
        page,
        limit,
        { ...options, sort: { created_at: -1 } }
      );
    } catch (error) {
      throw new Error(`Find events by creator failed: ${error.message}`);
    }
  }

  /**
   * Find events with available spots
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated events with spots
   */
  async findWithAvailableSpots(page = 1, limit = 10, options = {}) {
    try {
      const now = new Date();
      return await this.findAll(
        {
          is_published: true,
          start_date: { $gt: now },
          $expr: { $lt: ["$current_attendees", "$max_attendees"] },
        },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find events with available spots failed: ${error.message}`);
    }
  }

  /**
   * Find free events
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Limit per page
   * @param {Object} [options] - Query options
   * @returns {Promise<{data: Array, metadata: Object}>} - Paginated free events
   */
  async findFreeEvents(page = 1, limit = 10, options = {}) {
    try {
      return await this.findAll(
        {
          "registration_fee.is_free": true,
          is_published: true,
        },
        page,
        limit,
        { ...options, sort: { start_date: 1 } }
      );
    } catch (error) {
      throw new Error(`Find free events failed: ${error.message}`);
    }
  }

  /**
   * Register an attendee for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object|null>} - Updated event
   */
  async registerAttendee(eventId) {
    try {
      const event = await this.model.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      return await event.registerAttendee();
    } catch (error) {
      throw new Error(`Register attendee failed: ${error.message}`);
    }
  }

  /**
   * Unregister an attendee from an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @returns {Promise<Object|null>} - Updated event
   */
  async unregisterAttendee(eventId) {
    try {
      const event = await this.model.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      return await event.unregisterAttendee();
    } catch (error) {
      throw new Error(`Unregister attendee failed: ${error.message}`);
    }
  }

  /**
   * Update event status
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string} status - New status
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated event
   */
  async updateStatus(eventId, status, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      return await this.updateById(eventId, { status }, options);
    } catch (error) {
      throw new Error(`Update status failed: ${error.message}`);
    }
  }

  /**
   * Toggle featured status
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated event
   */
  async toggleFeatured(eventId, options = {}) {
    try {
      const event = await this.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      return await this.updateById(
        eventId,
        { is_featured: !event.is_featured },
        options
      );
    } catch (error) {
      throw new Error(`Toggle featured failed: ${error.message}`);
    }
  }

  /**
   * Toggle published status
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Updated event
   */
  async togglePublished(eventId, options = {}) {
    try {
      const event = await this.findById(eventId);
      
      if (!event) {
        throw new Error("Event not found");
      }

      return await this.updateById(
        eventId,
        { is_published: !event.is_published },
        options
      );
    } catch (error) {
      throw new Error(`Toggle published failed: ${error.message}`);
    }
  }

  /**
   * Get event statistics
   * @returns {Promise<Object>} - Event statistics
   */
  async getStatistics() {
    try {
      const [stats] = await this.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            published: [
              { $match: { is_published: true } },
              { $count: "count" },
            ],
            upcoming: [
              {
                $match: {
                  status: STATUS.UPCOMING,
                  is_published: true,
                },
              },
              { $count: "count" },
            ],
            active: [
              {
                $match: {
                  status: STATUS.ACTIVE,
                  is_published: true,
                },
              },
              { $count: "count" },
            ],
            archived: [
              { $match: { status: STATUS.ARCHIVED } },
              { $count: "count" },
            ],
            featured: [
              {
                $match: {
                  is_featured: true,
                  is_published: true,
                },
              },
              { $count: "count" },
            ],
            totalAttendees: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$current_attendees" },
                },
              },
            ],
          },
        },
        {
          $project: {
            total: { $arrayElemAt: ["$total.count", 0] },
            published: { $arrayElemAt: ["$published.count", 0] },
            upcoming: { $arrayElemAt: ["$upcoming.count", 0] },
            active: { $arrayElemAt: ["$active.count", 0] },
            archived: { $arrayElemAt: ["$archived.count", 0] },
            featured: { $arrayElemAt: ["$featured.count", 0] },
            totalAttendees: {
              $arrayElemAt: ["$totalAttendees.total", 0],
            },
          },
        },
      ]);

      return {
        total: stats?.total || 0,
        published: stats?.published || 0,
        upcoming: stats?.upcoming || 0,
        active: stats?.active || 0,
        archived: stats?.archived || 0,
        featured: stats?.featured || 0,
        totalAttendees: stats?.totalAttendees || 0,
      };
    } catch (error) {
      throw new Error(`Get statistics failed: ${error.message}`);
    }
  }

  /**
   * Get popular events by attendee count
   * @param {number} [limit=10] - Maximum number of events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of popular events
   */
  async findPopular(limit = 10, options = {}) {
    try {
      const query = this.model
        .find({ is_published: true })
        .sort({ current_attendees: -1 })
        .limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find popular events failed: ${error.message}`);
    }
  }

  /**
   * Find events by proximity to coordinates
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} [maxDistance=50000] - Maximum distance in meters (default 50km)
   * @param {number} [limit=10] - Maximum number of events to return
   * @param {Object} [options] - Query options
   * @returns {Promise<Array>} - Array of nearby events
   */
  async findNearby(lat, lng, maxDistance = 50000, limit = 10, options = {}) {
    try {
      const query = this.model.find({
        "location.coordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: maxDistance,
          },
        },
        is_published: true,
      }).limit(limit);

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find nearby events failed: ${error.message}`);
    }
  }
}

export default new EventRepository();