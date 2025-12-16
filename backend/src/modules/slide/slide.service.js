 /**
 * Slide Service
 * Handles business logic for slide management (hero/banner sections)
 */

import BaseService from "../shared/base.service.js";
import SlideRepository from "./slide.repository.js";
import EventRepository from "../event/event.repository.js";
import ActivityService from "../activity/activity.service.js";
import FileService from "../../services/file.service.js";
import SlideValidation from "./slide.validation.js";
import { SLIDE_STATUS, SLIDE_TYPE } from "../../utils/constants/slide.constants.js";
import { ENTITY_TYPE, ACTION_TYPE } from "../../utils/constants/activity.constants.js";

// Set validation schemas for BaseService.validate()
BaseService.setValidation(SlideValidation);

class SlideService extends BaseService {
  constructor(dependencies = {}) {
    super();
    this.repository = dependencies.repository || SlideRepository;
    this.eventRepository = dependencies.eventRepository || EventRepository;
    this.activityService = dependencies.activityService || ActivityService;
  }

  /**
   * Create a new slide
   * @param {Object} slideData - Slide data
   * @param {string} adminId - Admin creating the slide
   * @returns {Promise<Object>} - Created slide
   */
  async createSlide(slideData, adminId) {
    try {
      // Validate input data using BaseService.validate()
      const validatedData = this.validate(slideData, SlideValidation.createSlideSchema);
      
      // Validate event if provided
      if (validatedData.event) {
        const event = await this.eventRepository.findById(validatedData.event);
        if (!event) {
          throw new Error("Event not found");
        }
      }

      // Set default display_order if not provided (already handled by validation schema)
      if (!validatedData.display_order && validatedData.display_order !== 0) {
        const existingSlides = await this.repository.findByType(
          validatedData.slide_type || SLIDE_TYPE.HERO
        );
        validatedData.display_order = existingSlides.length;
      }

      const slideToCreate = {
        ...validatedData,
        created_by: adminId,
      };

      const slide = await this.repository.create(slideToCreate);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slide._id,
        eventId: slide.event,
        description: `Created slide: ${slide.title}`,
        metadata: {
          slideTitle: slide.title,
          slideType: slide.slide_type,
          status: slide.status,
        },
      }).catch(err => console.error("Activity log error:", err));

      return slide;
    } catch (error) {
      throw new Error(`Failed to create slide: ${error.message}`);
    }
  }

  /**
   * Update a slide
   * @param {string} slideId - Slide ID
   * @param {Object} updateData - Update data
   * @param {string} adminId - Admin updating the slide
   * @returns {Promise<Object>} - Updated slide
   */
  async updateSlide(slideId, updateData, adminId) {
    try {
      // Validate input data using BaseService.validate()
      const validatedData = this.validate(updateData, SlideValidation.updateSlideSchema);

      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      // Validate event if being changed
      if (validatedData.event && validatedData.event !== slide.event?.toString()) {
        const event = await this.eventRepository.findById(validatedData.event);
        if (!event) {
          throw new Error("Event not found");
        }
      }

      const updatedSlide = await this.repository.updateById(slideId, validatedData);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slideId,
        eventId: slide.event,
        description: `Updated slide: ${slide.title}`,
        metadata: {
          slideTitle: slide.title,
          changes: Object.keys(updateData),
        },
      }).catch(err => console.error("Activity log error:", err));

      return updatedSlide;
    } catch (error) {
      throw new Error(`Failed to update slide: ${error.message}`);
    }
  }

  /**
   * Delete a slide (soft delete)
   * @param {string} slideId - Slide ID
   * @param {string} adminId - Admin deleting the slide
   * @param {boolean} deleteImages - Whether to delete associated images
   * @returns {Promise<Object>} - Deleted slide
   */
  async deleteSlide(slideId, adminId, deleteImages = false) {
    try {
      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      // Delete images if requested
      if (deleteImages) {
        if (slide.image?.public_id) {
          await FileService.deleteFile(slide.image.public_id);
        }
        if (slide.mobile_image?.public_id) {
          await FileService.deleteFile(slide.mobile_image.public_id);
        }
      }

      const deletedSlide = await this.repository.delete({ _id: slideId });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.DELETE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slideId,
        eventId: slide.event,
        description: `Deleted slide: ${slide.title}`,
        metadata: {
          slideTitle: slide.title,
          slideType: slide.slide_type,
          imagesDeleted: deleteImages,
        },
      }).catch(err => console.error("Activity log error:", err));

      return deletedSlide;
    } catch (error) {
      throw new Error(`Failed to delete slide: ${error.message}`);
    }
  }

  /**
   * Publish a slide
   * @param {string} slideId - Slide ID
   * @param {string} adminId - Admin publishing the slide
   * @returns {Promise<Object>} - Published slide
   */
  async publishSlide(slideId, adminId) {
    try {
      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      if (slide.status === SLIDE_STATUS.PUBLISHED) {
        throw new Error("Slide is already published");
      }

      const publishedSlide = await this.repository.updateById(slideId, {
        status: SLIDE_STATUS.PUBLISHED,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slideId,
        eventId: slide.event,
        description: `Published slide: ${slide.title}`,
        metadata: { slideTitle: slide.title },
      }).catch(err => console.error("Activity log error:", err));

      return publishedSlide;
    } catch (error) {
      throw new Error(`Failed to publish slide: ${error.message}`);
    }
  }

  /**
   * Unpublish a slide (revert to draft)
   * @param {string} slideId - Slide ID
   * @param {string} adminId - Admin unpublishing the slide
   * @returns {Promise<Object>} - Unpublished slide
   */
  async unpublishSlide(slideId, adminId) {
    try {
      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      if (slide.status === SLIDE_STATUS.DRAFT) {
        throw new Error("Slide is already in draft");
      }

      const unpublishedSlide = await this.repository.updateById(slideId, {
        status: SLIDE_STATUS.DRAFT,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slideId,
        eventId: slide.event,
        description: `Unpublished slide: ${slide.title}`,
        metadata: { slideTitle: slide.title },
      }).catch(err => console.error("Activity log error:", err));

      return unpublishedSlide;
    } catch (error) {
      throw new Error(`Failed to unpublish slide: ${error.message}`);
    }
  }

  /**
   * Archive a slide
   * @param {string} slideId - Slide ID
   * @param {string} adminId - Admin archiving the slide
   * @returns {Promise<Object>} - Archived slide
   */
  async archiveSlide(slideId, adminId) {
    try {
      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      if (slide.status === SLIDE_STATUS.ARCHIVED) {
        throw new Error("Slide is already archived");
      }

      const archivedSlide = await this.repository.updateById(slideId, {
        status: SLIDE_STATUS.ARCHIVED,
      });

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slideId,
        eventId: slide.event,
        description: `Archived slide: ${slide.title}`,
        metadata: { slideTitle: slide.title },
      }).catch(err => console.error("Activity log error:", err));

      return archivedSlide;
    } catch (error) {
      throw new Error(`Failed to archive slide: ${error.message}`);
    }
  }

  /**
   * Reorder slides
   * @param {Array<{slideId: string, displayOrder: number}>} orderData - New order
   * @param {string} slideType - Slide type to reorder
   * @param {string} adminId - Admin reordering slides
   * @returns {Promise<Array>} - Updated slides
   */
  async reorderSlides(orderData, slideType, adminId) {
    try {
      // Validate all slides exist and belong to the same type
      const slideIds = orderData.map(item => item.slideId);
      const slides = await this.repository.findAll(
        { _id: { $in: slideIds }, slide_type: slideType },
        1,
        slideIds.length
      );

      if (slides.data.length !== slideIds.length) {
        throw new Error("One or more slides not found or do not match the specified type");
      }

      // Update display orders
      const updatePromises = orderData.map(item =>
        this.repository.updateById(item.slideId, { display_order: item.displayOrder })
      );

      const updatedSlides = await Promise.all(updatePromises);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        description: `Reordered ${slideIds.length} ${slideType} slides`,
        metadata: {
          slideType,
          slideCount: slideIds.length,
          slideIds,
        },
      }).catch(err => console.error("Activity log error:", err));

      return updatedSlides;
    } catch (error) {
      throw new Error(`Failed to reorder slides: ${error.message}`);
    }
  }

  /**
   * Get slide by ID
   * @param {string} slideId - Slide ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Slide
   */
  async getSlideById(slideId, options = {}) {
    try {
      const slide = await this.repository.findById(slideId, options);
      if (!slide) {
        throw new Error("Slide not found");
      }

      return slide;
    } catch (error) {
      throw new Error(`Failed to get slide: ${error.message}`);
    }
  }

  /**
   * Get all slides
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} filters - Filter criteria
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated slides
   */
  async getAllSlides(page = 1, limit = 10, filters = {}, options = {}) {
    try {
      const slides = await this.repository.findAll(
        filters,
        page,
        limit,
        { ...options, sort: { display_order: 1, created_at: -1 } }
      );

      return slides;
    } catch (error) {
      throw new Error(`Failed to get slides: ${error.message}`);
    }
  }

  /**
   * Get slides by type
   * @param {string} slideType - Slide type
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Slides
   */
  async getSlidesByType(slideType, options = {}) {
    try {
      const slides = await this.repository.findByType(slideType, options);
      return slides;
    } catch (error) {
      throw new Error(`Failed to get slides by type: ${error.message}`);
    }
  }

  /**
   * Get slides by position
   * @param {string} position - Slide position
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Slides
   */
  async getSlidesByPosition(position, options = {}) {
    try {
      const slides = await this.repository.findByPosition(position, options);
      return slides;
    } catch (error) {
      throw new Error(`Failed to get slides by position: ${error.message}`);
    }
  }

  /**
   * Get active (published) slides
   * @param {string} slideType - Optional slide type filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Active slides
   */
  async getActiveSlides(slideType = null, options = {}) {
    try {
      const slides = await this.repository.findActive(slideType, options);
      return slides;
    } catch (error) {
      throw new Error(`Failed to get active slides: ${error.message}`);
    }
  }

  /**
   * Get slides by event
   * @param {string} eventId - Event ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Event slides
   */
  async getSlidesByEvent(eventId, options = {}) {
    try {
      const slides = await this.repository.findByEvent(eventId, options);
      return slides;
    } catch (error) {
      throw new Error(`Failed to get event slides: ${error.message}`);
    }
  }

  /**
   * Get scheduled slides (within validity period)
   * @param {string} slideType - Optional slide type filter
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Scheduled slides
   */
  async getScheduledSlides(slideType = null, options = {}) {
    try {
      const slides = await this.repository.findScheduled(slideType, options);
      return slides;
    } catch (error) {
      throw new Error(`Failed to get scheduled slides: ${error.message}`);
    }
  }

  /**
   * Upload slide image
   * @param {string} slideId - Slide ID
   * @param {Object} file - Image file
   * @param {string} adminId - Admin uploading the image
   * @param {boolean} isMobile - Whether this is a mobile image
   * @returns {Promise<Object>} - Updated slide
   */
  async uploadSlideImage(slideId, file, adminId, isMobile = false) {
    try {
      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      // Delete old image if exists
      const existingImage = isMobile ? slide.mobile_image : slide.image;
      if (existingImage?.public_id) {
        await FileService.deleteFile(existingImage.public_id);
      }

      // Upload new image
      const uploadResult = await FileService.uploadFile(file, {
        folder: `slides/${slide._id}`,
        transformation: [
          { width: isMobile ? 768 : 1920, height: isMobile ? 1024 : 1080, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      // Update slide
      const updateData = isMobile
        ? {
            mobile_image: {
              url: uploadResult.secure_url,
              public_id: uploadResult.public_id,
              alt: slide.title,
            },
          }
        : {
            image: {
              url: uploadResult.secure_url,
              public_id: uploadResult.public_id,
              alt: slide.title,
            },
          };

      const updatedSlide = await this.repository.updateById(slideId, updateData);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: slideId,
        eventId: slide.event,
        description: `Uploaded ${isMobile ? "mobile" : "desktop"} image for slide: ${slide.title}`,
        metadata: {
          slideTitle: slide.title,
          imageType: isMobile ? "mobile" : "desktop",
          publicId: uploadResult.public_id,
        },
      }).catch(err => console.error("Activity log error:", err));

      return updatedSlide;
    } catch (error) {
      throw new Error(`Failed to upload slide image: ${error.message}`);
    }
  }

  /**
   * Clone a slide
   * @param {string} slideId - Slide ID to clone
   * @param {Object} overrides - Override data
   * @param {string} adminId - Admin cloning the slide
   * @returns {Promise<Object>} - Cloned slide
   */
  async cloneSlide(slideId, overrides = {}, adminId) {
    try {
      const slide = await this.repository.findById(slideId);
      if (!slide) {
        throw new Error("Slide not found");
      }

      // Create clone data
      const cloneData = {
        title: overrides.title || `${slide.title} (Copy)`,
        subtitle: slide.subtitle,
        description: slide.description,
        slide_type: slide.slide_type,
        status: overrides.status || SLIDE_STATUS.DRAFT, // Clone as draft by default
        event: overrides.event || slide.event,
        image: slide.image,
        mobile_image: slide.mobile_image,
        background_color: slide.background_color,
        text_color: slide.text_color,
        overlay_opacity: slide.overlay_opacity,
        button: slide.button,
        position: slide.position,
        animation_type: slide.animation_type,
        animation_duration: slide.animation_duration,
        is_fullscreen: slide.is_fullscreen,
        validity_start: overrides.validity_start || null,
        validity_end: overrides.validity_end || null,
      };

      const clonedSlide = await this.createSlide(cloneData, adminId);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.CREATE,
        entityType: ENTITY_TYPE.SLIDE,
        entityId: clonedSlide._id,
        eventId: clonedSlide.event,
        description: `Cloned slide from: ${slide.title}`,
        metadata: {
          originalSlideId: slideId,
          originalSlideTitle: slide.title,
          newSlideTitle: clonedSlide.title,
        },
      }).catch(err => console.error("Activity log error:", err));

      return clonedSlide;
    } catch (error) {
      throw new Error(`Failed to clone slide: ${error.message}`);
    }
  }

  /**
   * Bulk update slide status
   * @param {Array<string>} slideIds - Array of slide IDs
   * @param {string} status - New status
   * @param {string} adminId - Admin updating slides
   * @returns {Promise<Array>} - Updated slides
   */
  async bulkUpdateStatus(slideIds, status, adminId) {
    try {
      // Validate status
      if (!Object.values(SLIDE_STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      // Validate all slides exist
      const slides = await this.repository.findAll(
        { _id: { $in: slideIds } },
        1,
        slideIds.length
      );

      if (slides.data.length !== slideIds.length) {
        throw new Error("One or more slides not found");
      }

      // Update all slides
      const updatePromises = slideIds.map(slideId =>
        this.repository.updateById(slideId, { status })
      );

      const updatedSlides = await Promise.all(updatePromises);

      // Log activity (fire-and-forget)
      this.activityService.log({
        userId: adminId,
        action: ACTION_TYPE.UPDATE,
        entityType: ENTITY_TYPE.SLIDE,
        description: `Bulk updated ${slideIds.length} slides to ${status}`,
        metadata: {
          slideCount: slideIds.length,
          slideIds,
          newStatus: status,
        },
      }).catch(err => console.error("Activity log error:", err));

      return updatedSlides;
    } catch (error) {
      throw new Error(`Failed to bulk update slides: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { SlideService };
export default new SlideService();
