import BaseService from "../shared/base.service.js";
import FormRepository from "./form.repository.js";
import FormValidation from "./form.validation.js";
import { FORM_TYPE, FORM_STATUS } from "../../utils/constants/form.constants.js";

BaseService.setValidation(FormValidation);

/**
 * Form Service
 * Handles business logic for dynamic form management including field mapping for candidate creation
 */
class FormService extends BaseService {
  constructor() {
    super();
    this.repository = FormRepository;
  }

  // ==================== FORM CRUD ====================

  /**
   * Create a new form
   * @param {Object} formData - Form data
   * @param {string|mongoose.Types.ObjectId} createdBy - User ID who created the form
   * @returns {Promise<Object>} - Created form
   */
  async createForm(formData, createdBy) {
    try {
      // Validate input
      const validated = this.validate(formData, FormValidation.createFormSchema);

      const data = {
        ...validated,
        created_by: createdBy,
      };

      // Validate nomination form field mappings if provided
      if (
        validated.form_type === FORM_TYPE.NOMINATION &&
        validated.candidate_field_mapping?.enabled
      ) {
        this.validateFieldMapping(validated.candidate_field_mapping.mappings);
      }

      return await this.repository.create(data);
    } catch (error) {
      throw new Error(`Create form failed: ${error.message}`);
    }
  }

  /**
   * Update form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} updateData - Update data
   * @param {string|mongoose.Types.ObjectId} updatedBy - User ID who updated the form
   * @returns {Promise<Object>} - Updated form
   */
  async updateForm(formId, updateData, updatedBy) {
    try {
      // Validate input
      const validated = this.validate(updateData, FormValidation.updateFormSchema);

      // Validate field mappings if being updated
      if (validated.candidate_field_mapping?.enabled) {
        this.validateFieldMapping(validated.candidate_field_mapping.mappings);
      }

      const data = {
        ...validated,
        updated_by: updatedBy,
      };

      return await this.repository.updateById(formId, data);
    } catch (error) {
      throw new Error(`Update form failed: ${error.message}`);
    }
  }

  /**
   * Get form by ID with all details
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Form with details
   */
  async getFormById(formId, options = {}) {
    try {
      return await this.repository.findById(formId, {
        ...options,
        populate: ["event", "categories", "created_by", "updated_by"],
      });
    } catch (error) {
      throw new Error(`Get form failed: ${error.message}`);
    }
  }

  /**
   * Get form by slug
   * @param {string} slug - Form slug
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Form
   */
  async getFormBySlug(slug, options = {}) {
    try {
      return await this.repository.findOne({ slug }, options);
    } catch (error) {
      throw new Error(`Get form by slug failed: ${error.message}`);
    }
  }

  /**
   * Get forms by event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [filters] - Additional filters
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Items per page
   * @returns {Promise<Object>} - Paginated forms
   */
  async getFormsByEvent(eventId, filters = {}, page = 1, limit = 10) {
    try {
      const query = { event: eventId, ...filters };
      return await this.repository.findAll(query, page, limit, {
        populate: ["categories", "created_by"],
        sort: { created_at: -1 },
      });
    } catch (error) {
      throw new Error(`Get forms by event failed: ${error.message}`);
    }
  }

  /**
   * Get nomination forms by event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [filters] - Additional filters
   * @returns {Promise<Array>} - Nomination forms
   */
  async getNominationForms(eventId, filters = {}) {
    try {
      const query = {
        event: eventId,
        form_type: FORM_TYPE.NOMINATION,
        ...filters,
      };

      return await this.repository.findAll(query, 1, 100, {
        populate: ["categories"],
        sort: { created_at: -1 },
      });
    } catch (error) {
      throw new Error(`Get nomination forms failed: ${error.message}`);
    }
  }

  // ==================== FIELD MAPPING ====================

  /**
   * Update candidate field mapping for nomination form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @param {Object} mappingData - Mapping configuration
   * @param {Array} mappingData.mappings - Array of field mappings
   * @param {boolean} mappingData.auto_create_candidate - Auto create candidate on approval
   * @param {boolean} mappingData.send_welcome_email - Send welcome email
   * @returns {Promise<Object>} - Updated form
   */
  async updateFieldMapping(formId, mappingData) {
    try {
      // Validate input
      const validated = this.validate(mappingData, FormValidation.updateFieldMappingSchema);

      // Validate the form is a nomination form
      const form = await this.repository.findById(formId);

      if (!form) {
        throw new Error("Form not found");
      }

      if (form.form_type !== FORM_TYPE.NOMINATION) {
        throw new Error("Field mapping is only available for nomination forms");
      }

      // Validate mappings
      this.validateFieldMapping(validated.mappings);

      // Update the field mapping
      return await this.repository.updateById(formId, {
        candidate_field_mapping: {
          enabled: true,
          mappings: validated.mappings,
          auto_create_candidate: validated.auto_create_candidate ?? true,
          send_welcome_email: validated.send_welcome_email ?? true,
        },
      });
    } catch (error) {
      throw new Error(`Update field mapping failed: ${error.message}`);
    }
  }

  /**
   * Validate field mapping configuration
   * @param {Array} mappings - Array of field mappings
   * @throws {Error} - If validation fails
   */
  validateFieldMapping(mappings) {
    if (!mappings || !Array.isArray(mappings)) {
      throw new Error("Mappings must be an array");
    }

    // Required candidate fields
    const requiredFields = ["first_name", "last_name", "email"];
    const mappedFields = mappings.map((m) => m.candidate_field);

    // Check if all required fields are mapped
    const missingFields = requiredFields.filter((field) => !mappedFields.includes(field));

    if (missingFields.length > 0) {
      throw new Error(`Missing required field mappings: ${missingFields.join(", ")}`);
    }

    // Check for duplicate mappings
    const duplicates = mappedFields.filter(
      (field, index) => mappedFields.indexOf(field) !== index
    );

    if (duplicates.length > 0) {
      throw new Error(`Duplicate field mappings found: ${duplicates.join(", ")}`);
    }

    // Validate each mapping has required properties
    for (const mapping of mappings) {
      if (!mapping.form_field_id) {
        throw new Error("Each mapping must have form_field_id");
      }

      if (!mapping.candidate_field) {
        throw new Error("Each mapping must have candidate_field");
      }
    }
  }

  /**
   * Get field mapping for form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Field mapping configuration
   */
  async getFieldMapping(formId) {
    try {
      const form = await this.repository.findById(formId, {
        select: "candidate_field_mapping fields form_type",
      });

      if (!form) {
        throw new Error("Form not found");
      }

      if (form.form_type !== FORM_TYPE.NOMINATION) {
        throw new Error("Field mapping is only available for nomination forms");
      }

      return {
        enabled: form.candidate_field_mapping?.enabled || false,
        mappings: form.candidate_field_mapping?.mappings || [],
        auto_create_candidate: form.candidate_field_mapping?.auto_create_candidate ?? true,
        send_welcome_email: form.candidate_field_mapping?.send_welcome_email ?? true,
        form_fields: form.fields || [],
      };
    } catch (error) {
      throw new Error(`Get field mapping failed: ${error.message}`);
    }
  }

  /**
   * Extract candidate data from submission using field mapping
   * @param {Object} submissionData - Submission data (Map or Object)
   * @param {Array} mappings - Field mappings
   * @returns {Object} - Extracted candidate data
   */
  extractCandidateData(submissionData, mappings) {
    const candidateData = {};

    // Convert Map to Object if needed
    const data =
      submissionData instanceof Map ? Object.fromEntries(submissionData) : submissionData;

    for (const mapping of mappings) {
      const { form_field_id, candidate_field, transform } = mapping;
      let value = data[form_field_id];

      if (value !== undefined && value !== null && value !== "") {
        // Apply transformation
        value = this.applyTransform(value, transform);

        // Handle nested fields (e.g., social_links.linkedin)
        if (candidate_field.includes(".")) {
          const [parent, child] = candidate_field.split(".");
          if (!candidateData[parent]) {
            candidateData[parent] = {};
          }
          candidateData[parent][child] = value;
        } else {
          candidateData[candidate_field] = value;
        }
      }
    }

    return candidateData;
  }

  /**
   * Apply transformation to field value
   * @param {any} value - Field value
   * @param {string} transform - Transform type
   * @returns {any} - Transformed value
   */
  applyTransform(value, transform) {
    if (typeof value !== "string") return value;

    switch (transform) {
      case "uppercase":
        return value.toUpperCase();
      case "lowercase":
        return value.toLowerCase();
      case "trim":
        return value.trim();
      case "capitalize":
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      default:
        return value;
    }
  }

  // ==================== FORM MANAGEMENT ====================

  /**
   * Publish form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Updated form
   */
  async publishForm(formId) {
    try {
      return await this.repository.updateById(formId, {
        status: FORM_STATUS.ACTIVE,
        is_published: true,
      });
    } catch (error) {
      throw new Error(`Publish form failed: ${error.message}`);
    }
  }

  /**
   * Close form
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Updated form
   */
  async closeForm(formId) {
    try {
      return await this.repository.updateById(formId, {
        status: FORM_STATUS.CLOSED,
      });
    } catch (error) {
      throw new Error(`Close form failed: ${error.message}`);
    }
  }

  /**
   * Delete form (soft delete)
   * @param {string|mongoose.Types.ObjectId} formId - Form ID
   * @returns {Promise<Object>} - Deleted form
   */
  async deleteForm(formId) {
    try {
      return await this.repository.delete({ _id: formId });
    } catch (error) {
      throw new Error(`Delete form failed: ${error.message}`);
    }
  }
}

// Export both for testability (class) and convenience (singleton instance)
export { FormService };
export default new FormService();
