// form.constants.js

export const FORM_TYPE = {
  NOMINATION: "nomination",
  REGISTRATION: "registration",
  SURVEY: "survey",
  FEEDBACK: "feedback",
};

export const FORM_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  CLOSED: "closed",
  ARCHIVED: "archived",
};

export const FIELD_TYPE = {
  TEXT: "text",
  EMAIL: "email",
  PHONE: "phone",
  NUMBER: "number",
  TEXTAREA: "textarea",
  SELECT: "select",
  MULTI_SELECT: "multi_select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  DATE: "date",
  TIME: "time",
  DATETIME: "datetime",
  FILE: "file",
  IMAGE: "image",
  URL: "url",
  RATING: "rating",
  SLIDER: "slider",
  COLOR: "color",
  LOCATION: "location",
};

export const VALIDATION_RULE = {
  REQUIRED: "required",
  MIN_LENGTH: "min_length",
  MAX_LENGTH: "max_length",
  MIN_VALUE: "min_value",
  MAX_VALUE: "max_value",
  PATTERN: "pattern",
  EMAIL: "email",
  PHONE: "phone",
  URL: "url",
  CUSTOM: "custom",
};

export const SUBMISSION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  DUPLICATE: "duplicate",
  UNDER_REVIEW: "under_review",
};

export const DUPLICATE_CHECK_METHOD = {
  EXACT_MATCH: "exact_match",
  FUZZY_MATCH: "fuzzy_match",
  FIELD_SIMILARITY: "field_similarity",
  EMAIL_MATCH: "email_match",
  PHONE_MATCH: "phone_match",
};

export { FORM_TYPE as default, FORM_STATUS, FIELD_TYPE, VALIDATION_RULE, SUBMISSION_STATUS, DUPLICATE_CHECK_METHOD };
