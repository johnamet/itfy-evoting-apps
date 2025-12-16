#!/usr/bin/env node

/**
 * The Event model for the application.
 * This file defines the Event class which extends the BaseModel class.
 */

import mongoose from "mongoose";
import { BaseModel } from "../shared/base.model.js";
import { STATUS, EVENT_TYPE, VISIBILITY, CURRENCY } from "../../utils/constants/event.constants.js";

class Event extends BaseModel {
  constructor() {
    const schemaDefinition = {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          address: {
            type: String,
            required: true,
            trim: false,
          },
          city: {
            type: String,
            required: true,
            trim: true,
          },
          coordinates: {
            type: {
              lat: {
                type: Number,
                required: true,
              },
              lng: {
                type: Number,
                required: true,
              },
            },
            required: false,
          },
          country: {
            type: String,
            required: false,
            trim: true,
          },
          zipCode: {
            type: String,
            required: false,
            trim: true,
          },
          website: {
            type: String,
            required: false,
            trim: true,
          },
          phone: {
            type: String,
            required: false,
            trim: true,
          },
          venueInfo: {
            type: [String],
            required: false,
            trim: true,
          },
          directions: {
            type: [String],
            required: false,
            trim: true,
          },
        },
        required: true,
        default: {},
      },

      gallery: {
        type: [String],
        default: [],
      },
      start_date: {
        type: Date,
        required: true,
        default: () => Date.now(),
      },
      end_date: {
        type: Date,
        required: true,
        default: () => Date.now(),
      },
      speakers: {
        type: [Object],
        default: [],
      },
      guestOfHonor: {
        type: [Object],
        default: [],
      },
      sponsors: {
        type: [Object],
        default: [],
      },
      related_events: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          default: [],
        },
      ],
      categories: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Categories",
          default: [],
        },
      ],
      timeline: {
        type: [
          {
            title: {
              type: String,
              required: true,
              trim: true,
            },
            description: {
              type: String,
              required: false,
              trim: true,
            },
            time: {
              type: Date,
              required: true,
            },
          },
        ],
      },
      registration_form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
        required: false,
      },

      status: {
        type: String,
        default: STATUS.PENDING,
        enum: Object.values(STATUS),
      },

      is_featured: {
        type: Boolean,
        default: false,
        index: true,
      },

      is_published: {
        type: Boolean,
        default: false,
        index: true,
      },

      max_attendees: {
        type: Number,
        required: false,
        min: 0,
      },

      current_attendees: {
        type: Number,
        default: 0,
        min: 0,
      },

      registration_deadline: {
        type: Date,
        required: false,
      },

      registration_fee: {
        type: {
          amount: {
            type: Number,
            required: true,
            min: 0,
          },
          currency: {
            type: String,
            default: CURRENCY.GHS,
            trim: true,
          },
          is_free: {
            type: Boolean,
            default: true,
          },
        },
        required: false,
      },

      tags: {
        type: [String],
        default: [],
        index: true,
      },

      organizer: {
        type: {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          email: {
            type: String,
            required: false,
            trim: true,
            lowercase: true,
          },
          phone: {
            type: String,
            required: false,
            trim: true,
          },
        },
        required: false,
      },

      contact_email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },

      event_type: {
        type: String,
        enum: Object.values(EVENT_TYPE),
        required: false,
      },

      visibility: {
        type: String,
        enum: Object.values(VISIBILITY),
        default: VISIBILITY.PUBLIC,
      },

      cover_image: {
        type: String,
        required: false,
      },

      social_links: {
        type: {
          facebook: String,
          twitter: String,
          linkedin: String,
          instagram: String,
        },
        required: false,
      },

      requirements: {
        type: [String],
        default: [],
      },

      cancellation_policy: {
        type: String,
        required: false,
        trim: true,
      },

      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: null,
      },
    };

    const options = {
      timestamps: true,
    };

    super(schemaDefinition, options);

    // Create index for unique event names
    this.schema.index({ name: 1 }, { unique: true });

    // Create compound indexes for common queries
    this.schema.index({ status: 1, start_date: 1 });
    this.schema.index({ is_featured: 1, is_published: 1 });
    this.schema.index({ categories: 1, status: 1 });

    // Pre-save hook to handle date validation and status management
    this.schema.pre("save", async function (next) {
      try {
        const now = new Date();
        
        // Validate that end_date is after start_date
        if (this.end_date <= this.start_date) {
          throw new Error("End date must be after start date");
        }

        // Auto-manage status based on dates (only if status is not manually set to specific values)
        // Skip auto-status if status is CANCELLED or manually set
        const autoManageStatus = ![STATUS.CANCELLED].includes(this.status);

        if (autoManageStatus) {
          if (this.end_date < now) {
            // Event has ended - archive it
            this.status = STATUS.ARCHIVED;
          } else if (this.start_date <= now && this.end_date >= now) {
            // Event is currently happening
            this.status = STATUS.ACTIVE;
          } else if (this.start_date > now) {
            // Event hasn't started yet
            this.status = STATUS.UPCOMING;
          }
        }

        // Validate registration deadline is before start_date
        if (this.registration_deadline && this.registration_deadline > this.start_date) {
          throw new Error("Registration deadline must be before event start date");
        }

        // Validate current_attendees doesn't exceed max_attendees
        if (this.max_attendees && this.current_attendees > this.max_attendees) {
          throw new Error("Current attendees cannot exceed maximum attendees");
        }

        // Validate timeline events are within event date range
        if (this.timeline && this.timeline.length > 0) {
          for (const item of this.timeline) {
            if (item.time < this.start_date || item.time > this.end_date) {
              throw new Error("Timeline events must be within event start and end dates");
            }
          }
          
          // Sort timeline by time
          this.timeline.sort((a, b) => a.time - b.time);
        }

        next();
      } catch (error) {
        next(error);
      }
    });

    // Virtual: Check if registration is open
    this.schema.virtual("isRegistrationOpen").get(function () {
      if (!this.registration_deadline) return true;
      const now = new Date();
      return now < this.registration_deadline && now < this.start_date;
    });

    // Virtual: Check if event is full
    this.schema.virtual("isFull").get(function () {
      if (!this.max_attendees) return false;
      return this.current_attendees >= this.max_attendees;
    });

    // Virtual: Get event duration in milliseconds
    this.schema.virtual("duration").get(function () {
      return this.end_date - this.start_date;
    });

    // Virtual: Get event duration in hours
    this.schema.virtual("durationInHours").get(function () {
      return Math.round((this.end_date - this.start_date) / (1000 * 60 * 60));
    });

    // Virtual: Get spots remaining
    this.schema.virtual("spotsRemaining").get(function () {
      if (!this.max_attendees) return null;
      return Math.max(0, this.max_attendees - this.current_attendees);
    });

    // Virtual: Check if event is upcoming
    this.schema.virtual("isUpcoming").get(function () {
      const now = new Date();
      return this.start_date > now;
    });

    // Virtual: Check if event is active/ongoing
    this.schema.virtual("isActive").get(function () {
      const now = new Date();
      return this.start_date <= now && this.end_date >= now;
    });

    // Virtual: Check if event has ended
    this.schema.virtual("hasEnded").get(function () {
      const now = new Date();
      return this.end_date < now;
    });

    // Virtual: Days until event starts
    this.schema.virtual("daysUntilStart").get(function () {
      const now = new Date();
      if (this.start_date <= now) return 0;
      return Math.ceil((this.start_date - now) / (1000 * 60 * 60 * 24));
    });

    // Static method: Find upcoming events
    this.schema.statics.findUpcoming = async function (limit = 10) {
      const now = new Date();
      return this.find({
        start_date: { $gt: now },
        is_published: true,
      })
        .sort({ start_date: 1 })
        .limit(limit)
        .exec();
    };

    // Static method: Find featured events
    this.schema.statics.findFeatured = async function (limit = 5) {
      return this.find({
        is_featured: true,
        is_published: true,
      })
        .sort({ start_date: 1 })
        .limit(limit)
        .exec();
    };

    // Static method: Find active events
    this.schema.statics.findActive = async function () {
      const now = new Date();
      return this.find({
        start_date: { $lte: now },
        end_date: { $gte: now },
        is_published: true,
      })
        .sort({ start_date: 1 })
        .exec();
    };

    // Instance method: Register attendee
    this.schema.methods.registerAttendee = async function () {
      if (this.isFull) {
        throw new Error("Event is full");
      }
      if (!this.isRegistrationOpen) {
        throw new Error("Registration is closed");
      }
      this.current_attendees += 1;
      return this.save();
    };

    // Instance method: Unregister attendee
    this.schema.methods.unregisterAttendee = async function () {
      if (this.current_attendees <= 0) {
        throw new Error("No attendees to unregister");
      }
      this.current_attendees -= 1;
      return this.save();
    };

    // Ensure virtuals are included in JSON and Object outputs
    this.schema.set("toJSON", { virtuals: true });
    this.schema.set("toObject", { virtuals: true });
  }
}

export default new Event().getModel("Event");