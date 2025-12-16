/**
 * File Upload Constants
 * Defines file upload limits, allowed types, and storage configurations
 */

// ========================================
// FILE SIZE LIMITS (in MB)
// ========================================
export const FILE_SIZE_LIMITS = {
  PROFILE_PHOTO: 5, // 5MB for profile photos
  LOGO: 2, // 2MB for event/category logos
  DOCUMENT: 10, // 10MB for general documents
  IMAGE: 5, // 5MB for general images
  CANDIDATE_PHOTO: 5, // 5MB for candidate photos
  SLIDE_IMAGE: 3, // 3MB for slide images
};

// Default max file size (used as fallback)
export const MAX_FILE_SIZE_MB = 10;

// ========================================
// ALLOWED FILE TYPES (MIME types)
// ========================================
export const ALLOWED_FILE_TYPES = {
  // Images
  IMAGES: [
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/webp",
    "image/gif",
  ],

  // Documents
  DOCUMENTS: [
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  ],

  // All allowed types combined
  ALL: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
};

// ========================================
// FILE UPLOAD DIRECTORIES
// ========================================
export const UPLOAD_DIRECTORIES = {
  PROFILES: "profiles", // User profile photos
  LOGOS: "logos", // Event/category logos
  CANDIDATES: "candidates", // Candidate photos
  SLIDES: "slides", // Event slide images
  DOCUMENTS: "documents", // General documents
  TEMP: "temp", // Temporary uploads
};

// ========================================
// IMAGE OPTIMIZATION SETTINGS
// ========================================
export const IMAGE_OPTIMIZATION = {
  // Profile photos
  PROFILE: {
    width: 500,
    height: 500,
    quality: 85,
    format: "jpeg",
    fit: "cover",
  },

  // Logos (square)
  LOGO: {
    width: 300,
    height: 300,
    quality: 90,
    format: "png",
    fit: "inside",
  },

  // Candidate photos
  CANDIDATE: {
    width: 600,
    height: 800,
    quality: 85,
    format: "jpeg",
    fit: "cover",
  },

  // Slide images (landscape)
  SLIDE: {
    width: 1920,
    height: 1080,
    quality: 80,
    format: "jpeg",
    fit: "inside",
  },

  // Thumbnails
  THUMBNAIL: {
    width: 150,
    height: 150,
    quality: 70,
    format: "jpeg",
    fit: "cover",
  },
};

// ========================================
// FILE VALIDATION RULES
// ========================================
export const FILE_VALIDATION = {
  // Maximum number of files per upload
  MAX_FILES: {
    SINGLE: 1,
    MULTIPLE: 5,
    BATCH: 10,
  },

  // Minimum image dimensions (width x height)
  MIN_IMAGE_DIMENSIONS: {
    PROFILE: { width: 200, height: 200 },
    LOGO: { width: 100, height: 100 },
    CANDIDATE: { width: 300, height: 400 },
    SLIDE: { width: 800, height: 600 },
  },

  // Maximum image dimensions
  MAX_IMAGE_DIMENSIONS: {
    PROFILE: { width: 4000, height: 4000 },
    LOGO: { width: 2000, height: 2000 },
    CANDIDATE: { width: 6000, height: 8000 },
    SLIDE: { width: 4096, height: 2160 },
  },
};

// ========================================
// CLOUD STORAGE SETTINGS
// ========================================
export const CLOUD_STORAGE = {
  PROVIDER: process.env.CLOUD_STORAGE_PROVIDER || "local", // 'local', 's3', 'cloudinary'
  
  // S3 Configuration
  S3: {
    BUCKET: process.env.AWS_S3_BUCKET,
    REGION: process.env.AWS_REGION || "us-east-1",
    ACL: "public-read",
  },

  // Cloudinary Configuration
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    FOLDER: process.env.CLOUDINARY_FOLDER || "itfy-evoting",
  },
};

// ========================================
// FILE CLEANUP SETTINGS
// ========================================
export const CLEANUP_SETTINGS = {
  TEMP_FILES_RETENTION_DAYS: 7, // Delete temp files older than 7 days
  ORPHANED_FILES_RETENTION_DAYS: 30, // Delete orphaned files after 30 days
  CLEANUP_SCHEDULE: "0 2 * * *", // Run cleanup at 2 AM daily (cron format)
};

// ========================================
// FILE ERROR CODES
// ========================================
export const FILE_ERROR_CODES = {
  FILE_TOO_LARGE: "FILE_TOO_LARGE",
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",
  UPLOAD_FAILED: "UPLOAD_FAILED",
  FILE_NOT_FOUND: "FILE_NOT_FOUND",
  DELETE_FAILED: "DELETE_FAILED",
  OPTIMIZATION_FAILED: "OPTIMIZATION_FAILED",
  DIMENSIONS_INVALID: "DIMENSIONS_INVALID",
  TOO_MANY_FILES: "TOO_MANY_FILES",
};

// Default export for primary constant
export default FILE_SIZE_LIMITS;
