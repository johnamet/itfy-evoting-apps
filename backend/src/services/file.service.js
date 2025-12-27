/* eslint-disable no-undef */
/**
 * File Upload Service
 * Handles file uploads for ITFY E-Voting platform using Multer with support for:
 * - Local storage (development)
 * - Cloud storage (production - S3/Cloudinary)
 * - Image optimization and validation
 * - File type and size restrictions
 * - Automatic cleanup of temporary files
 * 
 * @class FileService
 * @singleton
 */

import multer from "multer";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import {
  MAX_FILE_SIZE_MB,
  FILE_SIZE_LIMITS,
  ALLOWED_FILE_TYPES,
  UPLOAD_DIRECTORIES,
  IMAGE_OPTIMIZATION,
  FILE_VALIDATION,
  CLOUD_STORAGE,
  CLEANUP_SETTINGS,
  FILE_ERROR_CODES,
} from "../utils/constants/file.constants.js";
import { ERROR_MESSAGES } from "../utils/constants/error.constants.js";

class FileService {
  constructor() {
    this.uploadDir = process.env.UPLOAD_DIR || "uploads";
    this.maxFileSize = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert MB to bytes
    this.cloudProvider = CLOUD_STORAGE.PROVIDER;
    this.isReady = false;

    // Initialize upload directories
    this.initializeDirectories();
  }

  /**
   * Initialize upload directories
   * Creates all necessary upload subdirectories
   * @private
   * @returns {Promise<void>}
   */
  async initializeDirectories() {
    const directories = Object.values(UPLOAD_DIRECTORIES).map(
      (dir) => path.join(this.uploadDir, dir)
    );

    try {
      for (const dir of directories) {
        await fs.mkdir(dir, { recursive: true });
      }
      this.isReady = true;
      console.log("✅ Upload directories initialized");
    } catch (error) {
      console.error("❌ Failed to create upload directories:", error);
      throw new Error("Failed to initialize file service");
    }
  }

  // ========================================
  // MULTER STORAGE CONFIGURATION
  // ========================================

  /**
   * Configure Multer storage for local uploads
   * @param {string} subfolder - Subfolder within uploads directory
   * @returns {multer.StorageEngine}
   * @private
   */
  createLocalStorage(subfolder = UPLOAD_DIRECTORIES.TEMP) {
    return multer.diskStorage({
      destination: async (req, file, cb) => {
        const uploadPath = path.join(this.uploadDir, subfolder);

        try {
          await fs.mkdir(uploadPath, { recursive: true });
          cb(null, uploadPath);
        } catch (error) {
          console.error(`Failed to create upload directory: ${uploadPath}`, error);
          cb(error, uploadPath);
        }
      },
      filename: (req, file, cb) => {
        try {
          const userId = req.user?._id || req.user?.id || "anonymous";
          const timestamp = Date.now();
          const uniqueId = uuidv4().split("-")[0];
          const ext = path.extname(file.originalname).toLowerCase();
          const nameWithoutExt = path
            .basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, "_")
            .substring(0, 30);

          const filename = `${userId}_${timestamp}_${uniqueId}_${nameWithoutExt}${ext}`;
          cb(null, filename);
        } catch (error) {
          console.error("Failed to generate filename:", error);
          cb(error, null);
        }
      },
    });
  }

  // ========================================
  // FILE FILTERS
  // ========================================

  /**
   * File filter for images only
   * @param {Object} req - Express request
   * @param {Object} file - Multer file object
   * @param {Function} cb - Callback
   * @private
   */
  imageFilter(req, file, cb) {
    if (ALLOWED_FILE_TYPES.IMAGES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const allowedTypes = ALLOWED_FILE_TYPES.IMAGES.join(", ");
      cb(
        new Error(
        `Invalid image type. Allowed types: ${allowedTypes}`
        ),
        false
      );
    }
  }

  /**
   * File filter for documents (PDFs, Word docs, Excel)
   * @param {Object} req - Express request
   * @param {Object} file - Multer file object
   * @param {Function} cb - Callback
   * @private
   */
  documentFilter(req, file, cb) {
    if (ALLOWED_FILE_TYPES.DOCUMENTS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid document type. Allowed: PDF, DOC, DOCX, XLS, XLSX"
        ),
        false
      );
    }
  }

  /**
   * Generic file filter (images + documents)
   * @param {Object} req - Express request
   * @param {Object} file - Multer file object
   * @param {Function} cb - Callback
   * @private
   */
  genericFileFilter(req, file, cb) {
    if (ALLOWED_FILE_TYPES.ALL.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(ERROR_MESSAGES.INVALID_FILE_TYPE),
        false
      );
    }
  }

  // ========================================
  // MULTER UPLOAD CONFIGURATIONS
  // ========================================

  /**
   * Profile photo upload middleware (single image)
   * Usage: router.post('/upload-photo', fileService.uploadProfilePhoto, controller)
   * @returns {multer.Multer}
   */
  get uploadProfilePhoto() {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.PROFILES),
      fileFilter: this.imageFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.PROFILE_PHOTO * 1024 * 1024,
        files: FILE_VALIDATION.MAX_FILES.SINGLE,
      },
    }).single("photo");
  }

  /**
   * Logo upload middleware (event/category logos)
   * @returns {multer.Multer}
   */
  get uploadLogo() {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.LOGOS),
      fileFilter: this.imageFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.LOGO * 1024 * 1024,
        files: FILE_VALIDATION.MAX_FILES.SINGLE,
      },
    }).single("logo");
  }

  /**
   * Candidate photo upload middleware
   * @returns {multer.Multer}
   */
  get uploadCandidatePhoto() {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.CANDIDATES),
      fileFilter: this.imageFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.CANDIDATE_PHOTO * 1024 * 1024,
        files: FILE_VALIDATION.MAX_FILES.SINGLE,
      },
    }).single("image");
  }

  /**
   * Slide image upload middleware
   * @returns {multer.Multer}
   */
  get uploadSlideImage() {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.SLIDES),
      fileFilter: this.imageFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.SLIDE_IMAGE * 1024 * 1024,
        files: FILE_VALIDATION.MAX_FILES.SINGLE,
      },
    }).single("image");
  }

  /**
   * Document upload middleware (single file)
   * @returns {multer.Multer}
   */
  get uploadDocument() {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.DOCUMENTS),
      fileFilter: this.documentFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.DOCUMENT * 1024 * 1024,
        files: FILE_VALIDATION.MAX_FILES.SINGLE,
      },
    }).single("document");
  }

  /**
   * Multiple documents upload middleware
   * @param {number} maxCount - Maximum number of files (default: 5)
   * @returns {multer.Multer}
   */
  uploadDocuments(maxCount = FILE_VALIDATION.MAX_FILES.MULTIPLE) {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.DOCUMENTS),
      fileFilter: this.documentFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.DOCUMENT * 1024 * 1024,
        files: maxCount,
      },
    }).array("documents", maxCount);
  }

  /**
   * Multiple images upload middleware (for gallery uploads)
   * @returns {multer.Multer}
   */
  get uploadMultipleImages() {
    return multer({
      storage: this.createLocalStorage(UPLOAD_DIRECTORIES.CANDIDATES),
      fileFilter: this.imageFilter.bind(this),
      limits: {
        fileSize: FILE_SIZE_LIMITS.CANDIDATE_PHOTO * 1024 * 1024,
        files: FILE_VALIDATION.MAX_FILES.MULTIPLE,
      },
    }).array("images", FILE_VALIDATION.MAX_FILES.MULTIPLE);
  }

  /**
   * Generic single file upload
   * @param {string} fieldName - Form field name (default: 'file')
   * @param {string} subfolder - Upload subfolder (default: 'temp')
   * @returns {multer.Multer}
   */
  uploadFile(fieldName = "file", subfolder = UPLOAD_DIRECTORIES.TEMP) {
    return multer({
      storage: this.createLocalStorage(subfolder),
      fileFilter: this.genericFileFilter.bind(this),
      limits: {
        fileSize: this.maxFileSize,
        files: FILE_VALIDATION.MAX_FILES.SINGLE,
      },
    }).single(fieldName);
  }

  // ========================================
  // IMAGE PROCESSING
  // ========================================

  /**
   * Optimize and resize image using Sharp
   * @param {string} filePath - Path to image file
   * @param {Object} options - Optimization options
   * @param {number} options.width - Target width
   * @param {number} options.height - Target height
   * @param {number} options.quality - Image quality (1-100)
   * @param {string} options.format - Output format ('jpeg', 'png', 'webp')
   * @param {string} options.fit - Resize fit ('cover', 'contain', 'fill', 'inside', 'outside')
   * @returns {Promise<string>} - Path to optimized image
   */
  async optimizeImage(filePath, options = {}) {
    const {
      width = 800,
      height = 800,
      quality = 80,
      format = "jpeg",
      fit = "inside",
    } = options;

    try {
      const ext = `.${format}`;
      const optimizedPath = filePath.replace(
        path.extname(filePath),
        `_optimized${ext}`
      );

      const sharpInstance = sharp(filePath).resize(width, height, {
        fit,
        withoutEnlargement: true,
      });

      // Apply format-specific processing
      switch (format) {
        case "jpeg":
          await sharpInstance.jpeg({ quality }).toFile(optimizedPath);
          break;
        case "png":
          await sharpInstance.png({ quality }).toFile(optimizedPath);
          break;
        case "webp":
          await sharpInstance.webp({ quality }).toFile(optimizedPath);
          break;
        default:
          await sharpInstance.toFile(optimizedPath);
      }

      // Delete original unoptimized file
      await this.deleteFile(filePath);

      console.log(`✅ Image optimized: ${path.basename(optimizedPath)}`);
      return optimizedPath;
    } catch (error) {
      console.error("Image optimization failed:", error);
      throw new Error(`${FILE_ERROR_CODES.OPTIMIZATION_FAILED}: ${error.message}`);
    }
  }

  /**
   * Optimize image with preset configurations
   * @param {string} filePath - Path to image file
   * @param {string} preset - Preset name ('PROFILE', 'LOGO', 'CANDIDATE', 'SLIDE', 'THUMBNAIL')
   * @returns {Promise<string>} - Path to optimized image
   */
  async optimizeWithPreset(filePath, preset = "PROFILE") {
    const presetConfig = IMAGE_OPTIMIZATION[preset];
    
    if (!presetConfig) {
      throw new Error(`Invalid optimization preset: ${preset}`);
    }

    return this.optimizeImage(filePath, presetConfig);
  }

  /**
   * Create thumbnail from image
   * @param {string} filePath - Path to image file
   * @param {number} size - Thumbnail size (width/height)
   * @returns {Promise<string>} - Path to thumbnail
   */
  async createThumbnail(filePath, size = 150) {
    try {
      const ext = path.extname(filePath);
      const thumbnailPath = filePath.replace(ext, `_thumb${ext}`);

      await sharp(filePath)
        .resize(size, size, { fit: "cover" })
        .jpeg({ quality: IMAGE_OPTIMIZATION.THUMBNAIL.quality })
        .toFile(thumbnailPath);

      console.log(`✅ Thumbnail created: ${path.basename(thumbnailPath)}`);
      return thumbnailPath;
    } catch (error) {
      console.error("Thumbnail creation failed:", error);
      throw new Error(`Failed to create thumbnail: ${error.message}`);
    }
  }

  /**
   * Get image dimensions and metadata
   * @param {string} filePath - Path to image file
   * @returns {Promise<Object>} - Image metadata
   */
  async getImageMetadata(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size,
        hasAlpha: metadata.hasAlpha,
        orientation: metadata.orientation,
      };
    } catch (error) {
      console.error("Failed to read image metadata:", error);
      throw new Error(`Failed to read image metadata: ${error.message}`);
    }
  }

  /**
   * Validate image dimensions
   * @param {string} filePath - Path to image file
   * @param {string} validationType - Validation type ('PROFILE', 'LOGO', 'CANDIDATE', 'SLIDE')
   * @returns {Promise<boolean>}
   */
  async validateImageDimensions(filePath, validationType = "PROFILE") {
    try {
      const metadata = await this.getImageMetadata(filePath);
      const rules = FILE_VALIDATION.MIN_IMAGE_DIMENSIONS[validationType];

      if (!rules) {
        throw new Error(`Invalid validation type: ${validationType}`);
      }

      const isValid = metadata.width >= rules.width && metadata.height >= rules.height;

      if (!isValid) {
        throw new Error(
          `Image dimensions too small. Minimum: ${rules.width}x${rules.height}px, ` +
          `got: ${metadata.width}x${metadata.height}px`
        );
      }

      return true;
    } catch (error) {
      console.error("Image dimension validation failed:", error);
      throw error;
    }
  }

  // ========================================
  // FILE OPERATIONS
  // ========================================

  /**
   * Delete file from local storage
   * @param {string} filePath - Path to file (relative or absolute)
   * @returns {Promise<boolean>}
   */
  async deleteFile(filePath) {
    if (!filePath) {
      console.warn("deleteFile called with empty path");
      return false;
    }

    try {
      // Handle both absolute and relative paths
      const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.join(process.cwd(), filePath.replace(/^\//, ""));

      // Check if file exists before attempting deletion
      const exists = await this.fileExists(absolutePath);
      if (!exists) {
        console.warn(`File does not exist: ${filePath}`);
        return false;
      }

      await fs.unlink(absolutePath);
      console.log(`🗑️  File deleted: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete file ${filePath}:`, error.message);
      throw new Error(`${FILE_ERROR_CODES.DELETE_FAILED}: ${error.message}`);
    }
  }

  /**
   * Delete multiple files
   * @param {string[]} filePaths - Array of file paths
   * @returns {Promise<{success: number, failed: number}>}
   */
  async deleteFiles(filePaths) {
    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      return { success: 0, failed: 0 };
    }

    let successCount = 0;
    let failedCount = 0;

    for (const filePath of filePaths) {
      try {
        const deleted = await this.deleteFile(filePath);
        if (deleted) successCount++;
        else failedCount++;
      } catch (error) {
        console.error(`Failed to delete ${filePath}:`, error.message);
        failedCount++;
      }
    }

    return { success: successCount, failed: failedCount };
  }

  /**
   * Move file to different directory
   * @param {string} sourcePath - Current file path
   * @param {string} destinationPath - New file path
   * @returns {Promise<string>} - New file path
   */
  async moveFile(sourcePath, destinationPath) {
    try {
      // Ensure destination directory exists
      const destDir = path.dirname(destinationPath);
      await fs.mkdir(destDir, { recursive: true });

      // Move file
      await fs.rename(sourcePath, destinationPath);
      
      console.log(`📦 File moved: ${sourcePath} → ${destinationPath}`);
      return destinationPath;
    } catch (error) {
      console.error("File move failed:", error);
      throw new Error(`Failed to move file: ${error.message}`);
    }
  }

  /**
   * Copy file to different location
   * @param {string} sourcePath - Source file path
   * @param {string} destinationPath - Destination file path
   * @returns {Promise<string>} - Destination file path
   */
  async copyFile(sourcePath, destinationPath) {
    try {
      // Ensure destination directory exists
      const destDir = path.dirname(destinationPath);
      await fs.mkdir(destDir, { recursive: true });

      // Copy file
      await fs.copyFile(sourcePath, destinationPath);
      
      console.log(`📋 File copied: ${sourcePath} → ${destinationPath}`);
      return destinationPath;
    } catch (error) {
      console.error("File copy failed:", error);
      throw new Error(`Failed to copy file: ${error.message}`);
    }
  }

  /**
   * Get file metadata and stats
   * @param {string} filePath - Path to file
   * @returns {Promise<Object|null>}
   */
  async getFileMetadata(filePath) {
    try {
      const stats = await fs.stat(filePath);
      const ext = path.extname(filePath).toLowerCase();
      
      return {
        filename: path.basename(filePath),
        path: filePath,
        size: stats.size,
        sizeInMB: (stats.size / (1024 * 1024)).toFixed(2),
        sizeInKB: (stats.size / 1024).toFixed(2),
        extension: ext,
        mimeType: this.getMimeType(ext),
        created_at: stats.birthtime,
        updated_at: stats.mtime,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
      };
    } catch (error) {
      console.error("Failed to get file metadata:", error);
      return null;
    }
  }

  /**
   * Check if file exists
   * @param {string} filePath - Path to file
   * @returns {Promise<boolean>}
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get MIME type from file extension
   * @param {string} ext - File extension (with or without dot)
   * @returns {string}
   * @private
   */
  getMimeType(ext) {
    const extension = ext.startsWith(".") ? ext : `.${ext}`;
    
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".xls": "application/vnd.ms-excel",
      ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };

    return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
  }

  // ========================================
  // CLOUD STORAGE (Placeholder for S3/Cloudinary)
  // ========================================

  /**
   * Upload file to cloud storage (S3, Cloudinary, etc.)
   * @param {Object} file - Multer file object
   * @param {string} folder - Cloud storage folder
   * @returns {Promise<Object>} - { url, publicId, cloudProvider }
   * 
   * TODO: Implement based on CLOUD_STORAGE.PROVIDER
   * For AWS S3: Use @aws-sdk/client-s3
   * For Cloudinary: Use cloudinary package
   */
  async uploadToCloud(file, folder = "uploads") {
    if (this.cloudProvider === "local") {
      // Return local file path in development
      return {
        url: `/${this.uploadDir}/${folder}/${file.filename}`,
        publicId: file.filename,
        cloudProvider: "local",
      };
    }

    // TODO: Implement cloud upload for production
    if (this.cloudProvider === "s3") {
      // Example S3 implementation:
      // const s3Client = new S3Client({ region: CLOUD_STORAGE.S3.REGION });
      // const command = new PutObjectCommand({
      //   Bucket: CLOUD_STORAGE.S3.BUCKET,
      //   Key: \`\${folder}/\${file.filename}\`,
      //   Body: await fs.readFile(file.path),
      //   ACL: CLOUD_STORAGE.S3.ACL,
      // });
      // await s3Client.send(command);
      throw new Error("S3 upload not implemented yet");
    }

    if (this.cloudProvider === "cloudinary") {
      // Example Cloudinary implementation:
      // const cloudinary = require('cloudinary').v2;
      // const result = await cloudinary.uploader.upload(file.path, {
      //   folder: \`\${CLOUD_STORAGE.CLOUDINARY.FOLDER}/\${folder}\`,
      // });
      // return { url: result.secure_url, publicId: result.public_id };
      throw new Error("Cloudinary upload not implemented yet");
    }

    throw new Error(`Unknown cloud provider: ${this.cloudProvider}`);
  }

  /**
   * Delete file from cloud storage
   * @param {string} publicId - Cloud storage file identifier
   * @returns {Promise<boolean>}
   */
  async deleteFromCloud(publicId) {
    if (this.cloudProvider === "local") {
      return this.deleteFile(publicId);
    }

    // TODO: Implement cloud deletion
    if (this.cloudProvider === "s3") {
      // Example S3 deletion:
      // const command = new DeleteObjectCommand({
      //   Bucket: CLOUD_STORAGE.S3.BUCKET,
      //   Key: publicId,
      // });
      // await s3Client.send(command);
      console.warn("S3 deletion not implemented for:", publicId);
      throw new Error("S3 deletion not implemented yet");
    }

    if (this.cloudProvider === "cloudinary") {
      // Example Cloudinary deletion:
      // await cloudinary.uploader.destroy(publicId);
      console.warn("Cloudinary deletion not implemented for:", publicId);
      throw new Error("Cloudinary deletion not implemented yet");
    }

    return false;
  }

  // ========================================
  // ERROR HANDLING MIDDLEWARE
  // ========================================

  /**
   * Multer error handler middleware
   * Use after multer middleware: app.use(fileService.handleUploadError)
   * 
   * @param {Error} err - Error object
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Next middleware
   */
  handleUploadError(err, req, res, next) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          error: FILE_ERROR_CODES.FILE_TOO_LARGE,
          message: `File size must not exceed ${MAX_FILE_SIZE_MB}MB`,
        });
      }
      
      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          success: false,
          error: FILE_ERROR_CODES.TOO_MANY_FILES,
          message: err.message,
        });
      }
      
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          error: FILE_ERROR_CODES.INVALID_FILE_TYPE,
          message: "Unexpected file field in request",
        });
      }

      return res.status(400).json({
        success: false,
        error: FILE_ERROR_CODES.UPLOAD_FAILED,
        message: err.message,
      });
    }

    // Custom file validation errors
    if (err) {
      return res.status(400).json({
        success: false,
        error: FILE_ERROR_CODES.UPLOAD_FAILED,
        message: err.message || ERROR_MESSAGES.FILE_UPLOAD_FAILED,
      });
    }

    next();
  }

  // ========================================
  // CLEANUP UTILITIES
  // ========================================

  /**
   * Clean up old temporary files
   * @param {number} olderThanDays - Delete files older than N days
   * @returns {Promise<number>} - Number of files deleted
   */
  async cleanupTempFiles(olderThanDays = CLEANUP_SETTINGS.TEMP_FILES_RETENTION_DAYS) {
    try {
      const tempDir = path.join(this.uploadDir, UPLOAD_DIRECTORIES.TEMP);
      const files = await fs.readdir(tempDir);
      const cutoffDate = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;

      let deletedCount = 0;

      for (const file of files) {
        const filePath = path.join(tempDir, file);
        const stats = await fs.stat(filePath);

        if (stats.mtimeMs < cutoffDate) {
          await fs.unlink(filePath);
          deletedCount++;
        }
      }

      console.log(`🧹 Cleaned up ${deletedCount} temporary files (older than ${olderThanDays} days)`);
      return deletedCount;
    } catch (error) {
      console.error("Cleanup failed:", error);
      return 0;
    }
  }

  /**
   * Clean up orphaned files (files not referenced in database)
   * @param {Array<string>} referencedFiles - List of files currently referenced in DB
   * @param {string} directory - Directory to clean (default: all upload directories)
   * @returns {Promise<number>} - Number of orphaned files deleted
   */
  async cleanupOrphanedFiles(referencedFiles = [], directory = null) {
    try {
      const directories = directory
        ? [directory]
        : Object.values(UPLOAD_DIRECTORIES).filter(d => d !== UPLOAD_DIRECTORIES.TEMP);

      let deletedCount = 0;

      for (const dir of directories) {
        const dirPath = path.join(this.uploadDir, dir);
        const files = await fs.readdir(dirPath);

        for (const file of files) {
          const filePath = path.join(dirPath, file);
          const relativeFilePath = `/${this.uploadDir}/${dir}/${file}`;

          // Check if file is referenced in database
          const isReferenced = referencedFiles.some(ref =>
            ref.includes(file) || ref.includes(relativeFilePath)
          );

          if (!isReferenced) {
            // Additional check: only delete files older than retention period
            const stats = await fs.stat(filePath);
            const fileAge = Date.now() - stats.mtimeMs;
            const retentionPeriod = CLEANUP_SETTINGS.ORPHANED_FILES_RETENTION_DAYS * 24 * 60 * 60 * 1000;

            if (fileAge > retentionPeriod) {
              await fs.unlink(filePath);
              deletedCount++;
              console.log(`🗑️  Deleted orphaned file: ${relativeFilePath}`);
            }
          }
        }
      }

      console.log(`🧹 Cleaned up ${deletedCount} orphaned files`);
      return deletedCount;
    } catch (error) {
      console.error("Orphaned files cleanup failed:", error);
      return 0;
    }
  }

  /**
   * Get storage usage statistics
   * @returns {Promise<Object>}
   */
  async getStorageStats() {
    try {
      const directories = Object.values(UPLOAD_DIRECTORIES);
      const stats = {};
      let totalSize = 0;
      let totalFiles = 0;

      for (const dir of directories) {
        const dirPath = path.join(this.uploadDir, dir);
        
        try {
          const files = await fs.readdir(dirPath);
          let dirSize = 0;

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = await fs.stat(filePath);
            
            if (stat.isFile()) {
              dirSize += stat.size;
            }
          }

          stats[dir] = {
            fileCount: files.length,
            totalSize: dirSize,
            totalSizeMB: (dirSize / (1024 * 1024)).toFixed(2),
            totalSizeGB: (dirSize / (1024 * 1024 * 1024)).toFixed(4),
          };

          totalSize += dirSize;
          totalFiles += files.length;
        } catch (error) {
          console.warn(`Failed to read directory ${dir}:`, error.message);
          stats[dir] = { fileCount: 0, totalSize: 0, totalSizeMB: "0.00", totalSizeGB: "0.0000" };
        }
      }

      stats.total = {
        fileCount: totalFiles,
        totalSize,
        totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
        totalSizeGB: (totalSize / (1024 * 1024 * 1024)).toFixed(4),
      };

      return stats;
    } catch (error) {
      console.error("Failed to get storage stats:", error);
      return null;
    }
  }

  /**
   * Convert file path to URL
   * @param {string} filePath - Local file path (e.g., 'uploads/profiles/image.jpg')
   * @returns {string} - Full URL to access the file
   */
  getFileUrl(filePath) {
    if (!filePath) return null;
    
    // If already a URL, return as is
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    
    // Remove leading slash if present
    const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    
    // Get base URL from environment
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
    
    // Return full URL
    return `${baseUrl}/${cleanPath}`;
  }

  /**
   * Convert multiple file paths to URLs
   * @param {string[]} filePaths - Array of local file paths
   * @returns {string[]} - Array of full URLs
   */
  getFileUrls(filePaths) {
    if (!filePaths || !Array.isArray(filePaths)) return [];
    return filePaths.map(path => this.getFileUrl(path)).filter(Boolean);
  }

  /**
   * Get detailed file list for a directory
   * @param {string} directory - Directory name (from UPLOAD_DIRECTORIES)
   * @param {Object} options - Pagination and sorting options
   * @returns {Promise<Object>}
   */
  async getDirectoryFiles(directory, options = {}) {
    const { page = 1, limit = 50, sortBy = "created_at", sortOrder = "desc" } = options;

    try {
      const dirPath = path.join(this.uploadDir, directory);
      const files = await fs.readdir(dirPath);
      const fileDetails = [];

      for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
          fileDetails.push({
            filename: file,
            path: `/${this.uploadDir}/${directory}/${file}`,
            size: stats.size,
            sizeInMB: (stats.size / (1024 * 1024)).toFixed(2),
            created_at: stats.birthtime,
            updated_at: stats.mtime,
          });
        }
      }

      // Sort files
      fileDetails.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedFiles = fileDetails.slice(startIndex, endIndex);

      return {
        files: paginatedFiles,
        pagination: {
          total: fileDetails.length,
          page,
          limit,
          totalPages: Math.ceil(fileDetails.length / limit),
          hasNextPage: endIndex < fileDetails.length,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      console.error(`Failed to get directory files for ${directory}:`, error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }
}

// Export singleton instance
const fileService = new FileService();
export default fileService;
