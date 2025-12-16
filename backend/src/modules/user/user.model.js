/**
 * The user model definition for the user module
 */

import { AuthHelpers } from "../../utils/helpers/auth.helper.js";
import { BaseModel } from "../shared/base.model.js";
import { ROLES, PERMISSIONS, STATUS } from "../../utils/constants/user.constants.js";

class User extends BaseModel {
    constructor() {
        const schemaDefinition = {
            name : {
                type: String,
                required: true,
                trim: true
            },
            role: {
                type: String,
                required: true,
                enum: Object.values(ROLES)
            },
            permissions: {
                type: [String],
                required: true,
                default: [PERMISSIONS.READ],
                enum: Object.values(PERMISSIONS)
            },
            email: {
                type: String,
                required: true,
            },
            password_hash: {
                type: String,
                required: true,
                select: false // Prevent password_hash from being returned by default
            },
            email_verified: {
                type: Boolean,
                default: false
            },

            last_login: {
                type: Date,
                default: null
            },
            email_verified_at: {
                type: Date,
                default: null
            },
            login_attempts: {
                type: Number,
                default: 0
            },
            bio: {
                type: String,
                trim: true,
            },
            photo_url: {
                type: String,
                default: null
            },
            status: {
                type: String,
                enum: Object.values(STATUS)
            },
            other_info: {
                type: Object,
                default: {}
            }

        }

        const options = {
            timestamps: true
        }

        super(schemaDefinition, options)

        this.schema.searchIndex({ email: 1}, {unique: true})

        // Custom pre-save hook
        this.schema.pre("save", async function (next) {
            try{
                if (this.isModified("password_hash")){
                    if (!this.password_hash.startsWith("$2$")){
                    this.password_hash = await AuthHelpers.hashPassword(this.password_hash)

                    }
                }
                next()
            }catch(error){
                next(error)
            }
        })

        this.schema.methods.setPassword = async (password) => {
            this.password_hash = await AuthHelpers.hashPassword(password)
            return this.save()   
        }

         // Custom method to verify password
    this.schema.methods.verifyPassword = async function (password) {
      return await AuthHelpers.comparePassword(password, this.password_hash)
    };
    }
}

export default new User().getModel("User")