/**
 * Agenda.js Service for E-Voting Platform
 * Handles asynchronous job processing for:
 * - Vote processing and verification
 * - Payment verification (Paystack/Flutterwave webhooks)
 * - Email notifications (vote confirmation, results, reminders)
 * - Scheduled tasks (event closing, results publishing, analytics)
 * - Fraud detection and vote counting
 */

import Agenda from "agenda";
import EmailService from "./email.service.js";

class AgendaManager {
  constructor() {
    this.agenda = null;
    this.isReady = false;
    this.startTime = null;
  }

  /**
   * Initialize Agenda with MongoDB connection
   */
  async initialize() {
    try {
      const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/itfy-evoting";

      this.agenda = new Agenda({
        db: {
          address: mongoUri,
          collection: "agenda_jobs",
          options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
        },
        processEvery: process.env.AGENDA_PROCESS_EVERY || "10 seconds",
        maxConcurrency: parseInt(process.env.AGENDA_MAX_CONCURRENCY, 10) || 20,
        defaultConcurrency: 5,
        defaultLockLifetime: 10000, // 10 seconds
        lockLimit: 0,
        ensureIndex: true,
      });

      // Event listeners
      this.agenda.on("ready", () => {
        console.log("✅ Agenda.js is ready and connected to MongoDB");
        this.isReady = true;
        this.startTime = new Date();
      });

      this.agenda.on("error", (error) => {
        console.error("❌ Agenda.js connection error:", error);
        this.isReady = false;
      });

      this.agenda.on("start", (job) => {
        console.log(`🚀 Job started: ${job.attrs.name} [${job.attrs._id}]`);
      });

      this.agenda.on("complete", (job) => {
        console.log(`✅ Job completed: ${job.attrs.name} [${job.attrs._id}]`);
      });

      this.agenda.on("fail", (error, job) => {
        console.error(`❌ Job failed: ${job.attrs.name} [${job.attrs._id}]`, error);
      });

      // Define all jobs
      this._defineJobs();

      // Start processing
      await this.agenda.start();
      console.log("✅ Agenda.js started processing jobs");
    } catch (error) {
      console.error("❌ Failed to initialize Agenda:", error);
      throw error;
    }
  }

  /**
   * Define all job types and their handlers
   * @private
   */
  _defineJobs() {
    // ========================================
    // 1. VOTE PROCESSING JOBS
    // ========================================

    /**
     * Verify payment for vote purchase
     */
    this.agenda.define(
      "verify-vote-payment",
      { priority: "high", concurrency: 10 },
      async (job) => {
        const { voteId, paymentReference } = job.attrs.data;

        try {
          console.log("🔍 Verifying vote payment:", { voteId, paymentReference });

          const { default: VoteService } = await import("../modules/vote/vote.service.js");

          // Verify payment with payment gateway
          const paymentVerified = await VoteService.verifyPayment(voteId, paymentReference);

          if (paymentVerified) {
            // Queue vote confirmation email
            await this.now("send-vote-confirmation-email", { voteId });
          } else {
            console.warn("⚠️ Payment verification failed for vote:", voteId);
          }
        } catch (error) {
          console.error("❌ Failed to verify vote payment:", error);
          throw error;
        }
      }
    );

    /**
     * Process vote counting and aggregation
     */
    this.agenda.define(
      "aggregate-vote-counts",
      { priority: "normal", concurrency: 5 },
      async (job) => {
        const { eventId } = job.attrs.data;

        try {
          console.log("📊 Aggregating vote counts for event:", eventId);

          const { default: VoteService } = await import("../modules/vote/vote/vote.service.js");

          await VoteService.aggregateVoteCounts(eventId);

          console.log("✅ Vote counts aggregated successfully");
        } catch (error) {
          console.error("❌ Failed to aggregate vote counts:", error);
          throw error;
        }
      }
    );

    /**
     * Detect suspicious voting patterns (fraud detection)
     */
    this.agenda.define(
      "detect-fraud-patterns",
      { priority: "normal", concurrency: 3 },
      async (job) => {
        const { eventId } = job.attrs.data;

        try {
          console.log("🔍 Detecting fraud patterns for event:", eventId);

          const { default: ActivityService } = await import("../modules/activity/activity.service.js");

          // Detect suspicious patterns (same IP, rapid votes, etc.)
          await ActivityService.detectSuspiciousPatterns();

          console.log("✅ Fraud detection completed");
        } catch (error) {
          console.error("❌ Failed to detect fraud patterns:", error);
        }
      }
    );

    // ========================================
    // 2. EMAIL NOTIFICATION JOBS
    // ========================================

    /**
     * Send vote confirmation email
     */
    this.agenda.define(
      "send-vote-confirmation-email",
      { priority: "low", concurrency: 20 },
      async (job) => {
        const { voteId } = job.attrs.data;

        try {
          console.log("📧 Sending vote confirmation email for vote:", voteId);

          const { default: VoteRepository } = await import("../modules/vote/vote.repository.js");

          const vote = await VoteRepository.findById(voteId, {
            populate: ["voter", "candidate", "event", "category"],
          });

          if (!vote) {
            console.warn("⚠️ Vote not found:", voteId);
            return;
          }

          await EmailService.sendVoteConfirmationEmail({
            to: vote.voter?.email,
            name: vote.voter?.name,
            eventName: vote.event?.title,
            candidateName: vote.candidate?.name,
            categoryName: vote.category?.name,
            voteCount: vote.vote_count || 1,
            voteCode: vote.vote_code,
            amount: vote.amount,
            currency: vote.currency,
            paymentDate: vote.payment_date,
          });

          console.log("✅ Vote confirmation email sent");
        } catch (error) {
          console.error("❌ Failed to send vote confirmation email:", error);
        }
      }
    );

    /**
     * Send email verification
     */
    this.agenda.define(
      "send-email-verification",
      { priority: "high", concurrency: 20 },
      async (job) => {
        const { email, name, verificationUrl } = job.attrs.data;

        try {
          console.log("📧 Sending email verification to:", email);

          await EmailService.sendEmailVerificationEmail(email, name, verificationUrl);

          console.log("✅ Verification email sent");
        } catch (error) {
          console.error("❌ Failed to send verification email:", error);
        }
      }
    );

    /**
     * Send password reset email
     */
    this.agenda.define(
      "send-password-reset-email",
      { priority: "high", concurrency: 20 },
      async (job) => {
        const { email, name, resetUrl } = job.attrs.data;

        try {
          console.log("📧 Sending password reset email to:", email);

          await EmailService.sendPasswordResetEmail(email, name, resetUrl);

          console.log("✅ Password reset email sent");
        } catch (error) {
          console.error("❌ Failed to send password reset email:", error);
        }
      }
    );

    /**
     * Send password changed confirmation
     */
    this.agenda.define(
      "send-password-changed-email",
      { priority: "normal", concurrency: 20 },
      async (job) => {
        const { email, name } = job.attrs.data;

        try {
          console.log("📧 Sending password changed confirmation to:", email);

          await EmailService.sendPasswordChangedEmail(email, name);

          console.log("✅ Password changed email sent");
        } catch (error) {
          console.error("❌ Failed to send password changed email:", error);
        }
      }
    );

    /**
     * Send account locked notification
     */
    this.agenda.define(
      "send-account-locked-email",
      { priority: "high", concurrency: 20 },
      async (job) => {
        const { email, name, duration } = job.attrs.data;

        try {
          console.log("📧 Sending account locked email to:", email);

          await EmailService.sendAccountLockedEmail(email, name, duration);

          console.log("✅ Account locked email sent");
        } catch (error) {
          console.error("❌ Failed to send account locked email:", error);
        }
      }
    );

    /**
     * Generic send email job
     * Handles any email with template and context
     */
    this.agenda.define(
      "send email",
      { priority: "normal", concurrency: 20 },
      async (job) => {
        const { to, subject, template, context } = job.attrs.data;

        try {
          console.log(`📧 Sending ${template} email to:`, to);

          await EmailService.sendTemplateEmail({
            to,
            subject,
            template,
            context,
          });

          console.log(`✅ ${template} email sent to ${to}`);
        } catch (error) {
          console.error(`❌ Failed to send ${template} email:`, error);
          throw error;
        }
      }
    );

    /**
     * Send candidate welcome email
     */
    this.agenda.define(
      "send-candidate-welcome-email",
      { priority: "normal", concurrency: 20 },
      async (job) => {
        const { email, name, candidateCode, eventName } = job.attrs.data;

        try {
          console.log("📧 Sending candidate welcome email to:", email);

          await EmailService.sendCandidateWelcomeEmail(email, name, candidateCode, eventName);

          console.log("✅ Candidate welcome email sent");
        } catch (error) {
          console.error("❌ Failed to send candidate welcome email:", error);
        }
      }
    );

    /**
     * Send event reminder emails
     */
    this.agenda.define(
      "send-event-reminder-emails",
      { priority: "low", concurrency: 10 },
      async (job) => {
        const { eventId, reminderType } = job.attrs.data;

        try {
          console.log("📧 Sending event reminder emails:", { eventId, reminderType });

          const { default: EventRepository } = await import("../modules/event/event.repository.js");
          const { default: UserRepository } = await import("../modules/user/user.repository.js");

          const event = await EventRepository.findById(eventId);
          if (!event) {
            console.warn("⚠️ Event not found:", eventId);
            return;
          }

          // Get all voters (adjust query based on your user model)
          const users = await UserRepository.findAll({}, 1, 1000);

          for (const user of users.data) {
            await EmailService.sendEventReminderEmail({
              to: user.email,
              name: user.name,
              eventName: event.title,
              eventEndDate: event.end_date,
              reminderType,
            });
          }

          console.log("✅ Event reminder emails sent");
        } catch (error) {
          console.error("❌ Failed to send event reminder emails:", error);
        }
      }
    );

    /**
     * Send candidate profile approved email
     */
    this.agenda.define(
      "send-candidate-profile-approved-email",
      { priority: "normal", concurrency: 20 },
      async (job) => {
        const { email, name, eventId } = job.attrs.data;

        try {
          console.log("📧 Sending profile approved email to:", email);

          const { default: EventRepository } = await import("../modules/event/event.repository.js");
          const event = await EventRepository.findById(eventId);

          await EmailService.sendCandidateProfileApprovedEmail(email, name, event);

          console.log("✅ Profile approved email sent");
        } catch (error) {
          console.error("❌ Failed to send profile approved email:", error);
        }
      }
    );

    /**
     * Send candidate profile rejected email
     */
    this.agenda.define(
      "send-candidate-profile-rejected-email",
      { priority: "normal", concurrency: 20 },
      async (job) => {
        const { email, name, reason } = job.attrs.data;

        try {
          console.log("📧 Sending profile rejected email to:", email);

          await EmailService.sendCandidateProfileRejectedEmail(email, name, reason);

          console.log("✅ Profile rejected email sent");
        } catch (error) {
          console.error("❌ Failed to send profile rejected email:", error);
        }
      }
    );

    /**
     * Send admin profile update alert email
     */
    this.agenda.define(
      "send-admin-profile-update-alert-email",
      { priority: "normal", concurrency: 20 },
      async (job) => {
        const { adminEmail, candidateName, eventTitle, changedFields } = job.attrs.data;

        try {
          console.log("📧 Sending admin alert email to:", adminEmail);

          await EmailService.sendAdminProfileUpdateAlertEmail(
            adminEmail,
            candidateName,
            eventTitle,
            changedFields
          );

          console.log("✅ Admin alert email sent");
        } catch (error) {
          console.error("❌ Failed to send admin alert email:", error);
        }
      }
    );

    // ========================================
    // 3. SCHEDULED TASKS
    // ========================================

    /**
     * Close expired events (runs hourly)
     * Triggers cascading cleanup jobs
     */
    this.agenda.define(
      "close-expired-events",
      { priority: "normal", concurrency: 1 },
      async () => {
        try {
          console.log("🔒 Closing expired events...");

          const { default: EventRepository } = await import("../modules/event/event.repository.js");

          const expiredEvents = await EventRepository.findAll(
            {
              status: "active",
              end_date: { $lt: new Date() },
            },
            1,
            100
          );

          let count = 0;
          for (const event of expiredEvents.data) {
            // Close the event
            await EventRepository.updateById(event._id, { status: "closed" });
            
            // Trigger immediate cascading cleanup
            await this.now("close-event-cascade", { eventId: event._id });
            
            count++;
          }

          console.log(`✅ Closed ${count} expired events`);
        } catch (error) {
          console.error("❌ Failed to close expired events:", error);
        }
      }
    );

    /**
     * Handle immediate cascading actions when event closes
     * 1. Unfeature event
     * 2. Archive categories
     * 3. Publish results
     * 4. Schedule delayed candidate archival (1 week)
     */
    this.agenda.define(
      "close-event-cascade",
      { priority: "high", concurrency: 5 },
      async (job) => {
        const { eventId } = job.attrs.data;

        try {
          console.log("🔄 Processing event closure cascade for:", eventId);

          const { default: EventRepository } = await import("../modules/event/event.repository.js");
          const { default: CategoryRepository } = await import("../modules/category/category.repository.js");

          // 1. Unfeature the event if it's featured
          await EventRepository.updateById(eventId, { 
            is_featured: false,
            featured_at: null 
          });
          console.log("✅ Event unfeatured");

          // 2. Archive and unfeature all categories for this event
          const categories = await CategoryRepository.findAll(
            { event_id: eventId },
            1,
            1000
          );

          for (const category of categories.data) {
            await CategoryRepository.updateById(category._id, { 
              status: "archived",
              archived_at: new Date(),
              is_featured: false,
              featured_at: null
            });
          }
          console.log(`✅ Archived and unfeatured ${categories.data.length} categories`);

          // 3. Queue results publishing
          await this.now("publish-event-results", { eventId });

          // 4. Schedule candidate archival for 1 week from now
          const oneWeekFromNow = new Date();
          oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

          await this.schedule("archive-event-candidates", { eventId }, oneWeekFromNow);
          console.log(`📅 Scheduled candidate archival for ${oneWeekFromNow.toISOString()}`);

          console.log("✅ Event closure cascade completed");
        } catch (error) {
          console.error("❌ Failed to process event closure cascade:", error);
          throw error;
        }
      }
    );

    /**
     * Archive candidates and lock accounts (1 week after event closes)
     */
    this.agenda.define(
      "archive-event-candidates",
      { priority: "normal", concurrency: 5 },
      async (job) => {
        const { eventId } = job.attrs.data;

        try {
          console.log("📦 Archiving candidates for closed event:", eventId);

          const { default: CandidateRepository } = await import("../modules/candidate/candidate.repository.js");

          // Get all candidates for this event
          const candidates = await CandidateRepository.findAll(
            { event_id: eventId },
            1,
            1000
          );

          let archivedCount = 0;
          let lockedCount = 0;

          for (const candidate of candidates.data) {
            // Lock candidate account
            await CandidateRepository.updateById(candidate._id, {
              status: "locked",
              locked_at: new Date(),
              locked_reason: "Event has ended"
            });
            lockedCount++;

            // Archive candidate
            await CandidateRepository.updateById(candidate._id, {
              is_archived: true,
              archived_at: new Date()
            });
            archivedCount++;

            // Optional: Send notification email to candidate
            await this.now("send-candidate-account-locked-email", {
              candidateId: candidate._id,
              reason: "event_ended"
            });
          }

          console.log(`✅ Locked ${lockedCount} and archived ${archivedCount} candidates`);

          // Optionally archive the event itself
          const { default: EventRepository } = await import("../modules/event/event.repository.js");
          await EventRepository.updateById(eventId, {
            is_archived: true,
            archived_at: new Date()
          });
          console.log("✅ Event archived");

        } catch (error) {
          console.error("❌ Failed to archive event candidates:", error);
          throw error;
        }
      }
    );

    /**
     * Send candidate account locked notification
     */
    this.agenda.define(
      "send-candidate-account-locked-email",
      { priority: "low", concurrency: 20 },
      async (job) => {
        const { candidateId, reason } = job.attrs.data;

        try {
          console.log("📧 Sending account locked email to candidate:", candidateId);

          const { default: CandidateRepository } = await import("../modules/candidate/candidate.repository.js");

          const candidate = await CandidateRepository.findById(candidateId, {
            populate: ["event"]
          });

          if (!candidate) {
            console.warn("⚠️ Candidate not found:", candidateId);
            return;
          }

          await EmailService.sendCandidateAccountLockedEmail({
            to: candidate.email,
            name: candidate.name,
            eventName: candidate.event?.title,
            reason: reason === "event_ended" 
              ? "The voting event has ended and your account has been archived."
              : "Your account has been locked.",
            lockedAt: candidate.locked_at
          });

          console.log("✅ Account locked email sent");
        } catch (error) {
          console.error("❌ Failed to send account locked email:", error);
        }
      }
    );

    /**
     * Publish event results
     */
    this.agenda.define(
      "publish-event-results",
      { priority: "high", concurrency: 5 },
      async (job) => {
        const { eventId } = job.attrs.data;

        try {
          console.log("📊 Publishing results for event:", eventId);

          const { default: EventRepository } = await import("../modules/event/event.repository.js");
          const { default: AnalyticsService } = await import("../modules/analytics/analytics.service.js");

          // Calculate final results
          const results = await AnalyticsService.getEventDashboard(eventId);

          // Update event with results
          await EventRepository.updateById(eventId, {
            results_published: true,
            results_published_at: new Date(),
          });

          console.log("✅ Event results published");
        } catch (error) {
          console.error("❌ Failed to publish event results:", error);
        }
      }
    );

    /**
     * Generate daily analytics (runs at midnight)
     */
    this.agenda.define(
      "generate-daily-analytics",
      { priority: "low", concurrency: 1 },
      async () => {
        try {
          console.log("📊 Generating daily analytics...");

          const { default: AnalyticsService } = await import("../modules/analytics/analytics.service.js");

          await AnalyticsService.getPlatformDashboard();

          console.log("✅ Daily analytics generated");
        } catch (error) {
          console.error("❌ Failed to generate daily analytics:", error);
        }
      }
    );

    /**
     * Clean up old agenda jobs (runs weekly)
     */
    this.agenda.define(
      "cleanup-old-jobs",
      { priority: "low", concurrency: 1 },
      async () => {
        try {
          console.log("🧹 Cleaning up old agenda jobs...");

          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

          const numRemoved = await this.agenda.cancel({
            lastFinishedAt: { $lt: oneMonthAgo },
            nextRunAt: null,
          });

          console.log(`✅ Cleaned up ${numRemoved} old jobs`);
        } catch (error) {
          console.error("❌ Failed to clean up old jobs:", error);
        }
      }
    );

    /**
     * Clean up expired tokens (runs daily)
     */
    this.agenda.define(
      "cleanup-expired-tokens",
      { priority: "low", concurrency: 1 },
      async () => {
        try {
          console.log("🧹 Cleaning up expired tokens...");

          const { cache } = await import("../utils/cache/cache.utils.js");

          // Redis automatically expires keys with TTL, but we can clean up manually if needed
          console.log("✅ Expired tokens cleaned up (handled by Redis TTL)");
        } catch (error) {
          console.error("❌ Failed to clean up tokens:", error);
        }
      }
    );

    /**
     * Send voting deadline reminders
     */
    this.agenda.define(
      "send-voting-deadline-reminders",
      { priority: "normal", concurrency: 1 },
      async () => {
        try {
          console.log("📧 Sending voting deadline reminders...");

          const { default: EventRepository } = await import("../modules/event/event.repository.js");

          // Find events ending in 24 hours
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const dayAfter = new Date(tomorrow);
          dayAfter.setDate(dayAfter.getDate() + 1);

          const endingSoon = await EventRepository.findAll(
            {
              status: "active",
              end_date: { $gte: tomorrow, $lt: dayAfter },
            },
            1,
            100
          );

          for (const event of endingSoon.data) {
            await this.now("send-event-reminder-emails", {
              eventId: event._id,
              reminderType: "24_hours_left",
            });
          }

          console.log(`✅ Sent reminders for ${endingSoon.data.length} events`);
        } catch (error) {
          console.error("❌ Failed to send voting deadline reminders:", error);
        }
      }
    );

    // ========================================
    // 7. ACTIVITY LOGGING JOBS
    // ========================================

    /**
     * Log user activity (async, non-blocking)
     * High concurrency for minimal latency impact
     */
    this.agenda.define(
      "log-activity",
      { priority: "low", concurrency: 50 },
      async (job) => {
        const {
          userId,
          action,
          entityType,
          entityId,
          eventId,
          description,
          severity,
          ipAddress,
          userAgent,
          metadata,
          changes,
          sessionId,
        } = job.attrs.data;

        try {
          const { default: ActivityRepository } = await import(
            "../modules/activity/activity.repository.js"
          );

          await ActivityRepository.create({
            user: userId || null,
            action,
            entity_type: entityType,
            entity_id: entityId || null,
            event: eventId || null,
            description,
            severity: severity || "info",
            ip_address: ipAddress || null,
            user_agent: userAgent || null,
            metadata: metadata || {},
            changes: changes || null,
            session_id: sessionId || null,
            timestamp: new Date(),
          });
        } catch (error) {
          // Don't throw - activity logging should never break main flow
          console.error(`❌ Activity logging failed for action ${action}:`, error.message);
        }
      }
    );

    /**
     * Batch log multiple activities (for bulk operations)
     * Use when logging many activities at once (e.g., bulk imports)
     */
    this.agenda.define(
      "batch-log-activities",
      { priority: "low", concurrency: 10 },
      async (job) => {
        const { activities } = job.attrs.data;

        try {
          if (!Array.isArray(activities) || activities.length === 0) {
            console.warn("⚠️ No activities provided for batch logging");
            return;
          }

          const { default: ActivityRepository } = await import(
            "../modules/activity/activity.repository.js"
          );

          // Prepare activities with timestamps
          const activitiesWithTimestamps = activities.map((activity) => ({
            user: activity.userId || null,
            action: activity.action,
            entity_type: activity.entityType,
            entity_id: activity.entityId || null,
            event: activity.eventId || null,
            description: activity.description,
            severity: activity.severity || "info",
            ip_address: activity.ipAddress || null,
            user_agent: activity.userAgent || null,
            metadata: activity.metadata || {},
            changes: activity.changes || null,
            session_id: activity.sessionId || null,
            timestamp: new Date(),
          }));

          // Bulk insert for performance
          await ActivityRepository.model.insertMany(activitiesWithTimestamps, {
            ordered: false,
          });

          console.log(`✅ Batch logged ${activitiesWithTimestamps.length} activities`);
        } catch (error) {
          console.error("❌ Batch activity logging failed:", error.message);
        }
      }
    );

    /**
     * Archive old activities (runs monthly)
     * Move activities older than retention period to cold storage
     */
    this.agenda.define(
      "archive-old-activities",
      { priority: "low", concurrency: 1 },
      async (job) => {
        const { retentionMonths = 24 } = job.attrs.data;

        try {
          console.log(`🗄️ Archiving activities older than ${retentionMonths} months...`);

          const { default: ActivityRepository } = await import(
            "../modules/activity/activity.repository.js"
          );

          const cutoffDate = new Date();
          cutoffDate.setMonth(cutoffDate.getMonth() - retentionMonths);

          // Count old activities
          const count = await ActivityRepository.model.countDocuments({
            timestamp: { $lt: cutoffDate },
          });

          if (count === 0) {
            console.log("✅ No old activities to archive");
            return;
          }

          // Option 1: Soft delete (mark as archived)
          const result = await ActivityRepository.model.updateMany(
            { timestamp: { $lt: cutoffDate } },
            { $set: { is_archived: true, archived_at: new Date() } }
          );

          console.log(`✅ Archived ${result.modifiedCount} old activities`);

          // Option 2: Export to file/cold storage before deletion (future enhancement)
          // const oldActivities = await ActivityRepository.model.find({ timestamp: { $lt: cutoffDate } }).lean();
          // await exportToS3(oldActivities);
          // await ActivityRepository.model.deleteMany({ timestamp: { $lt: cutoffDate } });
        } catch (error) {
          console.error("❌ Failed to archive old activities:", error);
          throw error;
        }
      }
    );

    /**
     * Detect and log suspicious activity patterns
     * Runs periodically to identify fraud/security issues
     */
    this.agenda.define(
      "detect-suspicious-activities",
      { priority: "normal", concurrency: 3 },
      async (job) => {
        const { eventId, thresholdMinutes = 5, threshold = 10 } = job.attrs.data;

        try {
          console.log("🔍 Detecting suspicious activity patterns...");

          const { default: ActivityRepository } = await import(
            "../modules/activity/activity.repository.js"
          );

          // Detect suspicious patterns (same IP, rapid actions)
          const suspiciousActivities = await ActivityRepository.detectSuspiciousPatterns(
            threshold,
            thresholdMinutes
          );

          if (suspiciousActivities.length > 0) {
            console.warn(`⚠️ Found ${suspiciousActivities.length} suspicious patterns`);

            // Log each suspicious pattern
            for (const pattern of suspiciousActivities) {
              await this.now("log-activity", {
                userId: null,
                action: "SUSPICIOUS_ACTIVITY",
                entityType: "SYSTEM",
                description: `Suspicious pattern detected: ${pattern.count} actions from IP ${pattern._id} in ${thresholdMinutes} minutes`,
                severity: "warning",
                ipAddress: pattern._id,
                metadata: {
                  pattern,
                  threshold,
                  thresholdMinutes,
                },
              });
            }

            // Optional: Send alert to admins
            await this.now("send-security-alert-email", {
              alertType: "suspicious_activity",
              patterns: suspiciousActivities,
            });
          } else {
            console.log("✅ No suspicious patterns detected");
          }
        } catch (error) {
          console.error("❌ Failed to detect suspicious activities:", error);
        }
      }
    );
  }

  // ========================================
  // PUBLIC API METHODS
  // ========================================

  /**
   * Schedule a job to run immediately
   * @param {string} jobName - Name of the job
   * @param {Object} data - Job data
   * @returns {Promise<Job>}
   */
  async now(jobName, data) {
    if (!this.isReady) {
      console.warn("⚠️ Agenda not ready. Queuing job:", jobName);
    }

    try {
      const job = this.agenda.create(jobName, data);
      job.schedule(new Date());
      await job.save();
      console.log(`📅 Job scheduled: ${jobName}`);
      return job;
    } catch (error) {
      console.error(`❌ Failed to schedule job ${jobName}:`, error);
      throw error;
    }
  }

  /**
   * Schedule a job to run at a specific time
   * @param {string} jobName - Name of the job
   * @param {Object} data - Job data
   * @param {Date|string} when - When to run (Date or cron expression)
   * @returns {Promise<Job>}
   */
  async schedule(jobName, data, when = new Date()) {
    if (!this.isReady) {
      console.warn("⚠️ Agenda not ready. Job may not be scheduled:", jobName);
    }

    try {
      const job = this.agenda.create(jobName, data);
      job.schedule(when);
      await job.save();
      console.log(`📅 Job scheduled: ${jobName} at ${when}`);
      return job;
    } catch (error) {
      console.error(`❌ Failed to schedule job ${jobName}:`, error);
      throw error;
    }
  }

  /**
   * Schedule a recurring job
   * @param {string} interval - Cron expression
   * @param {string} jobName - Name of the job
   * @param {Object} data - Job data
   * @returns {Promise<void>}
   */
  async every(interval, jobName, data = {}) {
    if (!this.isReady) {
      throw new Error("Agenda is not ready. Call initialize() first.");
    }

    try {
      await this.agenda.every(interval, jobName, data);
      console.log(`🔄 Recurring job scheduled: ${jobName} (${interval})`);
    } catch (error) {
      console.error(`❌ Failed to schedule recurring job ${jobName}:`, error);
      throw error;
    }
  }

  /**
   * Cancel jobs matching query
   * @param {Object} query - MongoDB query
   * @returns {Promise<number>}
   */
  async cancel(query) {
    if (!this.isReady) {
      throw new Error("Agenda is not ready.");
    }

    try {
      const numRemoved = await this.agenda.cancel(query);
      console.log(`🗑️ Canceled ${numRemoved} jobs`);
      return numRemoved;
    } catch (error) {
      console.error("❌ Failed to cancel jobs:", error);
      throw error;
    }
  }

  /**
   * Get jobs matching query
   * @param {Object} query - MongoDB query
   * @returns {Promise<Array>}
   */
  async getJobs(query) {
    if (!this.isReady) {
      throw new Error("Agenda is not ready.");
    }

    return await this.agenda.jobs(query);
  }

  /**
   * Setup all recurring tasks
   */
  async setupRecurringTasks() {
    try {
      console.log("⚙️ Setting up recurring tasks...");

      // Close expired events every hour
      await this.every("0 * * * *", "close-expired-events");

      // Aggregate vote counts every 5 minutes
      await this.every("*/5 * * * *", "aggregate-vote-counts", {});

      // Detect fraud patterns every hour
      await this.every("0 * * * *", "detect-fraud-patterns", {});

      // Generate daily analytics at midnight
      await this.every("0 0 * * *", "generate-daily-analytics");

      // Clean up old jobs weekly on Sunday at 3 AM
      await this.every("0 3 * * 0", "cleanup-old-jobs");

      // Clean up expired tokens daily at 4 AM
      await this.every("0 4 * * *", "cleanup-expired-tokens");

      // Send voting deadline reminders daily at 10 AM
      await this.every("0 10 * * *", "send-voting-deadline-reminders");

      // Activity-related recurring tasks
      // Detect suspicious activities every hour
      await this.every("0 * * * *", "detect-suspicious-activities", {
        thresholdMinutes: 5,
        threshold: 10,
      });

      // Archive old activities monthly on 1st at 2 AM
      await this.every("0 2 1 * *", "archive-old-activities", {
        retentionMonths: 24,
      });

      console.log("✅ Recurring tasks configured");
    } catch (error) {
      console.error("❌ Failed to setup recurring tasks:", error);
    }
  }

  /**
   * Get Agenda health status
   * @returns {Object}
   */
  getStatus() {
    return {
      isReady: this.isReady,
      uptime: this.startTime ? Date.now() - this.startTime.getTime() : 0,
      startTime: this.startTime,
    };
  }

  /**
   * Graceful shutdown
   */
  async stop() {
    if (this.agenda) {
      console.log("🛑 Stopping Agenda.js...");
      await this.agenda.stop();
      this.isReady = false;
      console.log("✅ Agenda.js stopped gracefully");
    }
  }
}

// Export singleton instance
export const agendaManager = new AgendaManager();
export default agendaManager;
