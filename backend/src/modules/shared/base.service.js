/**
 * Base Service Class
 *
 * Provides:
 * - Repository injection (no global imports)
 * - Centralized validation (Joi)
 * - Transaction wrapper
 * - Error normalization
 * - Logging hooks
 * - Async local context (for request tracing)
 * - Success/error response standardization
 *
 * Usage:
 * ```javascript
 * import BaseService from '../shared/base.service';
 * import UserRepository from './user.repository';
 *
 * class UserService extends BaseService {
 *   constructor() {
 *     super({ userRepo: UserRepository });
 *   }
 *
 *   async createUser(data) {
 *     const validated = this.validate(data, createUserSchema);
 *     return await this.repo('userRepo').create(validated);
 *   }
 * }
 *
 * export default new UserService();
 * ```
 */

import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

/**
 * @abstract
 * @class BaseService
 */
class BaseService {
  /**
   * @param {Object} repositories - Injected repositories (e.g., { userRepo, eventRepo })
   * @param {Object} [options] - Optional configuration
   * @param {boolean} [options.enableLogging=true] - Enable console logging
   */
  constructor(repositories = {}, options = {}) {
    if (new.target === BaseService) {
      throw new Error(
        "BaseService is abstract and cannot be instantiated directly"
      );
    }

    this.repos = { ...repositories };
    this.options = {
      enableLogging: true,
      ...options,
    };

    // Bind context methods to preserve 'this'
    this.runInContext = this.runInContext.bind(this);
    this.getContext = this.getContext.bind(this);
  }

  // ========================================
  // 1. CONTEXT & TRACING
  // ========================================

  /**
   * Run a callback within async local context (for request ID, user, etc.)
   * Useful for correlation in logs/traces
   *
   * @param {Object} context - { requestId, userId, ipAddress, etc. }
   * @param {Function} callback - Async function to execute
   * @returns {Promise<any>}
   *
   * @example
   * await service.runInContext({ requestId: '123', userId: 'xyz' }, async () => {
   *   await service.someMethod(); // Context accessible via this.getContext()
   * });
   */
  runInContext(context, callback) {
    return asyncLocalStorage.run(context, callback);
  }

  /**
   * Get current async local storage context
   * @returns {Object|null} - Context object or null
   */
  getContext() {
    return asyncLocalStorage.getStore() || null;
  }

  // ========================================
  // 2. VALIDATION
  // ========================================

  /**
   * Validate input using Joi schema
   * Must call BaseService.setValidation(Joi) once at app startup
   *
   * @param {Object} data - Data to validate
   * @param {import('joi').Schema} schema - Joi schema
   * @returns {Object} - Clean, validated data
   * @throws {Error} - Validation error with detailed message
   *
   * @example
   * const schema = Joi.object({ name: Joi.string().required() });
   * const validated = this.validate({ name: 'John' }, schema);
   */
  validate(data, schema) {
    if (!this.constructor.validation) {
      throw new Error(
        "Validation library not attached. Call BaseService.setValidation(Joi) at app startup."
      );
    }

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((d) => d.message).join(", ");
      throw new Error(`Validation failed: ${details}`);
    }

    return value;
  }

  /**
   * Attach validation library (Joi) - call once per app
   * @param {any} validationLibrary - Joi instance
   *
   * @example
   * import Joi from 'joi';
   * BaseService.setValidation(Joi);
   */
  static setValidation(validationLibrary) {
    if (this.validation) {
      console.warn(
        "Validation library already attached to BaseService. Overwriting..."
      );
    }
    this.validation = validationLibrary;
  }

  // ========================================
  // 3. TRANSACTION HELPER
  // ========================================

  /**
   * Execute callback in MongoDB transaction
   * Uses first available repository with .transaction() method
   *
   * @param {Function} callback - Async function receiving session
   * @returns {Promise<any>} - Result from callback
   * @throws {Error} If no repository supports transactions
   *
   * @example
   * await this.transaction(async (session) => {
   *   await this.repo('userRepo').create(data, { session });
   *   await this.repo('eventRepo').update(id, update, { session });
   * });
   */
  async transaction(callback) {
    const repoWithTx = Object.values(this.repos).find(
      (repo) => repo && typeof repo.transaction === "function"
    );

    if (!repoWithTx) {
      throw new Error(
        "No repository with transaction support injected. Ensure at least one repository extends BaseRepository."
      );
    }

    return await repoWithTx.transaction(callback);
  }

  // ========================================
  // 4. LOGGING & ERROR HANDLING
  // ========================================

  /**
   * Log action with context (replace with Winston/Pino in production)
   * Automatically includes async context (requestId, userId, etc.)
   *
   * @param {string} action - Action name (e.g., 'createUser', 'deleteEvent')
   * @param {Object} [meta={}] - Additional metadata
   *
   * @example
   * this.log('createUser', { userId: '123', email: 'user@example.com' });
   */
  log(action, meta = {}) {
    if (!this.options.enableLogging) return;

    const context = this.getContext() || {};
    const logEntry = {
      timestamp: new Date().toISOString(),
      service: this.constructor.name,
      action,
      ...context,
      ...meta,
    };

    // Replace with structured logger (Winston/Pino) in production
    console.log(JSON.stringify(logEntry));
  }

  /**
   * Normalize error response (hides internals in production)
   *
   * @param {Error} error - Caught error
   * @param {string} [fallbackMessage='Operation failed'] - User-facing message
   * @returns {Object} - { success: false, error: string, stack?: string }
   *
   * @example
   * try {
   *   await this.repo('userRepo').create(data);
   * } catch (error) {
   *   return this.error(error, 'Failed to create user');
   * }
   */
  error(error, fallbackMessage = "Operation failed") {
    const isDev = process.env.NODE_ENV !== "production";

    this.log("error", {
      message: error.message,
      stack: isDev ? error.stack : undefined,
    });

    // Show validation errors but hide internal DB errors in production
    const isValidationError =
      error.message.includes("Validation failed") ||
      error.message.includes("required") ||
      error.message.includes("invalid");

    const message = isValidationError ? error.message : fallbackMessage;

    return {
      success: false,
      error: isDev ? error.message : message,
      ...(isDev && { stack: error.stack }),
    };
  }

  /**
   * Normalize success response
   *
   * @param {any} data - The data to return
   * @param {Object} [meta={}] - Optional metadata (pagination, counts, etc.)
   * @returns {Object} - { success: true, data: any, ...meta }
   *
   * @example
   * return this.success(user, { created: true });
   * return this.success(users, { page: 1, total: 100 });
   */
  success(data, meta = {}) {
    return {
      success: true,
      data,
      ...meta,
    };
  }

  // ========================================
  // 5. UTILITY: REPOSITORY ACCESS
  // ========================================

  /**
   * Get repository by name (type-safe access)
   *
   * @param {string} name - Repository key from constructor
   * @returns {any} - Repository instance
   * @throws {Error} If repository not injected
   *
   * @example
   * const userRepo = this.repo('userRepo');
   * const user = await userRepo.findById(id);
   */
  repo(name) {
    const repo = this.repos[name];
    if (!repo) {
      throw new Error(
        `Repository '${name}' not injected into ${this.constructor.name}. Available: ${Object.keys(this.repos).join(", ")}`
      );
    }
    return repo;
  }
}

export default BaseService;