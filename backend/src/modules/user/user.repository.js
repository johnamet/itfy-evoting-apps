/**
 * The user repository for the user module
 * This file provides data access functions for user-related operations
 * It extends BaseRepository and adds user-specific business logic
 */

import { BaseRepository } from "../shared/base.repository";
import User from "./user.model";
import { ERROR_MESSAGES } from "../../utils/constants/error.constants";
import { STATUS } from "../../utils/constants/user.constants";


class UserRepository extends BaseRepository{
    constructor(){
        super(User);
    }

    /**
     * Create a new user
     * @param {Object} data - User data to save
     * @param {Object} [options] - Options like {lean: true}
     * @returns {Promise<Object>} - The created user document
     * @throws {Error} If user creation fails or email is duplicate
     */
    async createUser(data, options={}) {
        try{

            if (!data.email || !data.password_hash || !data.role){
                throw new Error(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS)
            }

            return await this.create(data, options)
        }catch(error){
           if (error.message.includes("Duplicate key")) {
        throw new Error(ERROR_MESSAGES.DUPLICATE_EMAIL);
      }
      throw new Error(`User creation failed: ${error.message}`); 
        }
    }

     /**
   * Update a user by id
   * @param {string} id - The user's ID
   * @param {Object} data - Fields to update
   * @param {Object} [options] - Options like { lean: true, includeDeleted: true }
   * @returns {Promise<Object|null>} - The updated user document or null if not found
   * @throws {Error} If update fails  
   */
  async updateById(id, data, options = {}) {
    try {
      return await this.update({ _id: id }, data, options);
    } catch (error) {
      throw new Error(`Update user failed: ${error.message}`);
    }
  }

  /**
   * Find a user by id
   * @param {string} id - The user's ID
   * @param {Object} [options] - Options like { lean: true, select: 'email role' }
   * @returns {Promise<Object|null>} - The user document or null if not found
   * @throws {Error} If query fails
   */
  async findById(id, options = {}) {
    try {
      return await this.findOne({ _id: id }, options);
    } catch (error) {
      throw new Error(`Find user by ID failed: ${error.message}`);
    }
  }

  /**
   * Find a user by email address
   * @param {string} email - The user's email address
   * @param {Object} [options] - Options like { lean: true, select: 'password_hash status' }
   * @returns {Promise<Object|null>} - The user document or null if not found
   * @throws {Error} If query fails
   */
  async findByEmail(email, options = {}) {
    try {
      const select = options.select || "-photo_url -created_at -updated_at";
      return await this.findOne({ email }, { ...options, select });
    } catch (error) {
      throw new Error(`Find user by email failed: ${error.message}`);
    }
  }

  /**
   * Verify user credentials (email + password)
   * @param {string} email - User's email
   * @param {string} password - Plain text password
   * @returns {Promise<Object|null>} - User if valid, null if not
   * @throws {Error} If query fails
   */
  async verifyCredentials(email, password) {
    try {
      const user = await this.findByEmail(email, { select: "+password_hash" });
      if (!user || !user.verifyPassword) return null;
      const isValid = await user.verifyPassword(password);
      return isValid ? user : null;
    } catch (error) {
      throw new Error(`Credential verification failed: ${error.message}`);
    }
  }

   /**
   * Search users across roles with profile name matching
   * @param {string} searchTerm - Term to search in email, name
   * @param {number} [page=1] - Page number
   * @param {number} [limit=10] - Results per page
   * @param {Object} [options] - Options: lean, select, sort, populate, includeDeleted
   * @returns {Promise<{ data: Array, metadata: Object }>}
   * @throws {Error} If search fails
   */
  async searchUsers(searchTerm, page = 1, limit = 10, options = {}) {
    try {
      const { select, sort = { created_at: -1 } } = options;

      const pipeline = [
        // Join profiles
        {
          $lookup: {
            from: "users",
            localField: "_id",
            as: "admin"
          },
        },
        
        // Build searchable fields
        {
          $addFields: {
            searchable: {
              $concatArrays: [
                ["$email"],
                {
                  $cond: [
                    { $gt: [{ $size: "$admin" }, 0] },
                    [
                      { $getField: { field: "name", input: { $arrayElemAt: ["$admin", 0] } } },
                    ],
                    [],
                  ],
                },
              ],
            },
          },
        },

        // Match search term
        {
          $match: {
            $or: [
              { email: { $regex: searchTerm, $options: "i" } },
              { searchable: { $regex: searchTerm, $options: "i" } },
            ],
            ...(options.includeDeleted ? {} : { deleted_at: null }),
          },
        },

        // Project unified profile
        {
          $addFields: {
            profile: { $arrayElemAt: ['admin', 0]

                        },
          },
        },

        // Final projection
        {
          $project: {
            email: 1,
            role: 1,
            is_active: 1,
            status: 1,
            photo_url: 1,
            created_at: 1,
            updated_at: 1,
            profile: {
              $cond: [
                { $ne: ["$profile", null] },
                {
                  _id: "$profile._id",
                  name: "$profile.name",
                  bio: "$profile.bio",
                  role: "$profile.role",
                  permissions: "$profile.permissions"
                },
                null,
              ],
            },
          },
        },

        // Apply select
        ...(select
          ? [
              {
                $project: this._parseSelectFields(select),
              },
            ]
          : []),

        // Facet for pagination
        {
          $facet: {
            data: [{ $sort: sort }, { $skip: (page - 1) * limit }, { $limit: limit }],
            metadata: [{ $count: "total" }],
          },
        },
        {
          $project: {
            data: 1,
            metadata: {
              page: { $literal: page },
              limit: { $literal: limit },
              total: { $ifNull: [{ $arrayElemAt: ["$metadata.total", 0] }, 0] },
              pages: {
                $ceil: {
                  $divide: [
                    { $ifNull: [{ $arrayElemAt: ["$metadata.total", 0] }, 0] },
                    limit,
                  ],
                },
              },
            },
          },
        },
      ];

      const result = await this.aggregate(pipeline, { allowDiskUse: true });
      const { data = [], metadata = {} } = result[0] || {};

      return { data, metadata: metadata[0] || { page: Number(page), limit: Number(limit), total: 0, pages: 0 } };
    } catch (error) {
      throw new Error(`User search failed: ${error.message}`);
    }
  }

  /**
   * Soft delete a user (override to cascade to profile if needed)
   * @param {string} id - User ID
   * @returns {Promise<Object|null>}
   */
  async deleteUser(id) {
    return this.delete({_id:id});
  }

  /**
   * Restore a soft-deleted user
   * @param {string} id - User ID
   * @param {Object} [options]
   * @returns {Promise<Object|null>}
   */
  async restoreUser(id, options = {}) {
    return this.restore({_id: id}, options);
  }

   /**
   * Get users eligible for token generation
   * @param {Object} [options]
   * @returns {Promise<Array>}
   */
  async getEligibleUsers(options = {}) {
    const filters = {
      status: STATUS.ACTIVE,
      deleted_at: null,
    };
    return (await this.findAll(filters, 1, 1000, options)).data;
  }

  /**
   * Hard delete user
   * @param {string} id - User ID
   * @returns {Promise<Object|null>}
   * @param {Object} [options]
   * @returns {Promise<Object|null>}
   */
  async hardDelete(id, options = {}) {
    return this.forceDelete({_id:id}, options);
  }

  // === PRIVATE HELPER ===
  _parseSelectFields(selectStr) {
    return Object.fromEntries(
      selectStr
        .split(" ")
        .filter(Boolean)
        .map((field) => [field.replace(/^-/, ""), field.startsWith("-") ? 0 : 1])
    );
  }
}

export const userRepository = new UserRepository();
export default userRepository;

