import { Router } from "express";
import FormController from "./form.controller.js";
import {
  authenticate,
  authorize,
  optionalAuth,
} from "../../middleware/auth.middleware.js";
import { logActivity } from "../../middleware/activity-logger.middleware.js";
import { ROLES } from "../../utils/constants/user.constants.js";
import { ACTION_TYPE, ENTITY_TYPE } from "../../utils/constants/activity.constants.js";

const router = Router();

// ==================== PUBLIC ROUTES ====================

/**
 * GET /api/forms/slug/:slug
 * Get form by slug (public for published forms)
 */
router.get("/slug/:slug", FormController.getBySlug.bind(FormController));

// ==================== ADMIN CRUD ROUTES ====================

/**
 * POST /api/forms
 * Create a new form
 * Requires: Admin, Organiser
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.FORM_CREATED, ENTITY_TYPE.FORM),
  FormController.create.bind(FormController)
);

/**
 * GET /api/forms
 * List all forms with filters
 * Requires: Admin
 */
router.get(
  "/",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  FormController.list.bind(FormController)
);

/**
 * GET /api/forms/:id
 * Get form by ID
 * Optional auth - public for published, auth for unpublished
 */
router.get(
  "/:id",
  optionalAuth,
  FormController.getById.bind(FormController)
);

/**
 * PUT /api/forms/:id
 * Update form
 * Requires: Admin, Organiser
 */
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.FORM_UPDATED, ENTITY_TYPE.FORM, {
    getEntityId: (req) => req.params.id,
  }),
  FormController.update.bind(FormController)
);

/**
 * DELETE /api/forms/:id
 * Soft delete form
 * Requires: Admin
 */
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN),
  logActivity(ACTION_TYPE.FORM_DELETED, ENTITY_TYPE.FORM, {
    getEntityId: (req) => req.params.id,
  }),
  FormController.delete.bind(FormController)
);

// ==================== EVENT-BASED QUERIES ====================

/**
 * GET /api/forms/event/:eventId
 * Get forms by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  FormController.getByEvent.bind(FormController)
);

/**
 * GET /api/forms/event/:eventId/nominations
 * Get nomination forms by event
 * Requires: Admin
 */
router.get(
  "/event/:eventId/nominations",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER, ROLES.MODERATOR),
  FormController.getNominationForms.bind(FormController)
);

// ==================== FORM STATUS MANAGEMENT ====================

/**
 * PUT /api/forms/:id/publish
 * Publish form
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/publish",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.FORM_PUBLISHED, ENTITY_TYPE.FORM, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Published form ${req.params.id}`,
  }),
  FormController.publish.bind(FormController)
);

/**
 * PUT /api/forms/:id/close
 * Close form
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/close",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.FORM_CLOSED, ENTITY_TYPE.FORM, {
    getEntityId: (req) => req.params.id,
    getDescription: (req) => `Closed form ${req.params.id}`,
  }),
  FormController.close.bind(FormController)
);

// ==================== FIELD MAPPING ====================

/**
 * GET /api/forms/:id/field-mapping
 * Get field mapping configuration
 * Requires: Admin, Organiser
 */
router.get(
  "/:id/field-mapping",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  FormController.getFieldMapping.bind(FormController)
);

/**
 * PUT /api/forms/:id/field-mapping
 * Update field mapping configuration
 * Requires: Admin, Organiser
 */
router.put(
  "/:id/field-mapping",
  authenticate,
  authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANISER),
  logActivity(ACTION_TYPE.FORM_FIELD_MAPPING_UPDATED, ENTITY_TYPE.FORM, {
    getEntityId: (req) => req.params.id,
  }),
  FormController.updateFieldMapping.bind(FormController)
);

export default router;
