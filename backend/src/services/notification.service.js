/**
 * Notification Service
 * Handles notification creation and multi-channel delivery for ITFY E-Voting platform
 * Integrates with:
 * - NotificationRepository for database operations
 * - EmailService for email delivery
 * - Future: SMS, Push notifications, WebSocket
 */

import NotificationRepository from "../modules/notification/notification.repository";
import emailService from "./email.service";
import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_STATUS,
  NOTIFICATION_PRIORITY,
} from "../utils/constants/notification.constants";
import { EMAIL_TEMPLATES } from "../utils/constants/email.constants";

class NotificationService {
  constructor() {
    this.repository = NotificationRepository;
    this.emailService = emailService;
  }

  // ========================================
  // CORE NOTIFICATION METHODS
  // ========================================

  /**
   * Create and send notification
   * @param {Object} data - Notification data
   * @returns {Promise<Object>}
   */
  async create(data) {
    try {
      // Create notification in database
      const notification = await this.repository.create({
        user: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        channel: data.channel || NOTIFICATION_CHANNEL.IN_APP,
        priority: data.priority || NOTIFICATION_PRIORITY.NORMAL,
        status: NOTIFICATION_STATUS.PENDING,
        event: data.eventId,
        candidate: data.candidateId,
        category: data.categoryId,
        vote: data.voteId,
        payment: data.paymentId,
        form: data.formId,
        submission: data.submissionId,
        action_url: data.actionUrl,
        action_text: data.actionText,
        metadata: data.metadata,
        batch_id: data.batchId,
      });

      // Send notification based on channel
      if (data.channel === NOTIFICATION_CHANNEL.EMAIL && data.emailData) {
        await this.sendEmailNotification(notification, data.emailData);
      }

      return notification;
    } catch (error) {
      console.error("❌ Notification creation failed:", error);
      throw new Error(`Notification creation failed: ${error.message}`);
    }
  }

  /**
   * Send email notification
   * @param {Object} notification - Notification object
   * @param {Object} emailData - Email-specific data (to, template, context)
   * @returns {Promise<Object>}
   * @private
   */
  async sendEmailNotification(notification, emailData) {
    try {
      const result = await this.emailService.sendTemplateEmail({
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.template,
        context: emailData.context,
      });

      if (result.success) {
        await this.repository.markAsSent(notification._id, result.messageId);
      } else {
        await this.repository.markAsFailed(notification._id, result.error);
      }

      return result;
    } catch (error) {
      console.error("❌ Email notification send failed:", error);
      await this.repository.markAsFailed(notification._id, error.message);
      throw error;
    }
  }

  // ========================================
  // VOTE-RELATED NOTIFICATIONS
  // ========================================

  /**
   * Send vote confirmation notification
   * @param {Object} data - { userId, userEmail, userName, eventName, candidateName, categoryName, voteCount, voteCode, amount, paymentId, voteId }
   * @returns {Promise<Object>}
   */
  async sendVoteConfirmation(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.VOTE_CAST,
      title: "Vote Confirmed! ✓",
      message: `Your ${data.voteCount} vote(s) for ${data.candidateName} in ${data.eventName} have been confirmed.`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.HIGH,
      eventId: data.eventId,
      candidateId: data.candidateId,
      voteId: data.voteId,
      paymentId: data.paymentId,
      actionUrl: `/events/${data.eventId}`,
      actionText: "View Event",
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.VOTE_CONFIRMATION,
        context: {
          name: data.userName,
          eventName: data.eventName,
          candidateName: data.candidateName,
          categoryName: data.categoryName,
          voteCount: data.voteCount,
          voteCode: data.voteCode,
          amount: data.amount,
          currency: data.currency || "NGN",
          paymentDate: new Date(),
        },
      },
    });
  }

  /**
   * Send voting started notification
   * @param {Object} data - { userId, userEmail, userName, eventId, eventName, eventDescription, startDate, endDate }
   * @returns {Promise<Object>}
   */
  async sendVotingStarted(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.VOTING_STARTED,
      title: "Voting Has Started! 🗳️",
      message: `Voting has started for ${data.eventName}. Cast your vote now!`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.NORMAL,
      eventId: data.eventId,
      actionUrl: `/events/${data.eventId}`,
      actionText: "Vote Now",
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.VOTING_STARTED,
        context: {
          name: data.userName,
          eventName: data.eventName,
          eventDescription: data.eventDescription,
          eventUrl: `${process.env.APP_URL}/events/${data.eventId}`,
          startDate: data.startDate,
          endDate: data.endDate,
        },
      },
    });
  }

  /**
   * Send voting ending soon notification
   * @param {Object} data - { userId, userEmail, userName, eventId, eventName, endDate, hoursRemaining }
   * @returns {Promise<Object>}
   */
  async sendVotingEndingSoon(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.VOTING_ENDING_SOON,
      title: "Voting Ends Soon! ⏰",
      message: `Only ${data.hoursRemaining} hours left to vote in ${data.eventName}. Don't miss out!`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.HIGH,
      eventId: data.eventId,
      actionUrl: `/events/${data.eventId}`,
      actionText: "Vote Now",
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.VOTING_ENDING_SOON,
        context: {
          name: data.userName,
          eventName: data.eventName,
          eventUrl: `${process.env.APP_URL}/events/${data.eventId}`,
          endDate: data.endDate,
          hoursRemaining: data.hoursRemaining,
        },
      },
    });
  }

  /**
   * Send results published notification
   * @param {Object} data - { userId, userEmail, userName, eventId, eventName, winners }
   * @returns {Promise<Object>}
   */
  async sendResultsPublished(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.RESULTS_PUBLISHED,
      title: "Results Are Out! 🏆",
      message: `Results for ${data.eventName} have been published. Check out the winners!`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.NORMAL,
      eventId: data.eventId,
      actionUrl: `/events/${data.eventId}/results`,
      actionText: "View Results",
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.RESULTS_PUBLISHED,
        context: {
          name: data.userName,
          eventName: data.eventName,
          resultsUrl: `${process.env.APP_URL}/events/${data.eventId}/results`,
          winners: data.winners,
        },
      },
    });
  }

  // ========================================
  // PAYMENT-RELATED NOTIFICATIONS
  // ========================================

  /**
   * Send payment success notification
   * @param {Object} data - { userId, userEmail, userName, amount, currency, reference, paymentId, description }
   * @returns {Promise<Object>}
   */
  async sendPaymentSuccess(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.PAYMENT_SUCCESS,
      title: "Payment Successful ✓",
      message: `Your payment of ${data.currency} ${data.amount} was successful.`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.HIGH,
      paymentId: data.paymentId,
      actionUrl: `/payments/${data.paymentId}`,
      actionText: "View Receipt",
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.PAYMENT_SUCCESS,
        context: {
          name: data.userName,
          amount: data.amount,
          currency: data.currency,
          reference: data.reference,
          paymentDate: new Date(),
          description: data.description,
        },
      },
    });
  }

  /**
   * Send refund processed notification
   * @param {Object} data - { userId, userEmail, userName, amount, currency, reason, refundDate, paymentId }
   * @returns {Promise<Object>}
   */
  async sendRefundProcessed(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.REFUND_PROCESSED,
      title: "Refund Processed ✓",
      message: `Your refund of ${data.currency} ${data.amount} has been processed.`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.NORMAL,
      paymentId: data.paymentId,
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.REFUND_PROCESSED,
        context: {
          name: data.userName,
          amount: data.amount,
          currency: data.currency,
          reason: data.reason,
          refundDate: data.refundDate || new Date(),
        },
      },
    });
  }

  // ========================================
  // NOMINATION/FORM NOTIFICATIONS
  // ========================================

  /**
   * Send nomination confirmation notification
   * @param {Object} data - { userId, userEmail, userName, nomineeName, categoryName, eventName, eventId, submissionId }
   * @returns {Promise<Object>}
   */
  async sendNominationConfirmation(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.FORM_SUBMITTED,
      title: "Nomination Received ✓",
      message: `Your nomination for ${data.nomineeName} in ${data.categoryName} has been received.`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.NORMAL,
      eventId: data.eventId,
      submissionId: data.submissionId,
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.NOMINATION_CONFIRMATION,
        context: {
          name: data.userName,
          nomineeName: data.nomineeName,
          categoryName: data.categoryName,
          eventName: data.eventName,
          submissionDate: new Date(),
        },
      },
    });
  }

  /**
   * Send nomination approved notification
   * @param {Object} data - { userId, userEmail, userName, nomineeName, categoryName, eventName, eventId, candidateId }
   * @returns {Promise<Object>}
   */
  async sendNominationApproved(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.NOMINATION_APPROVED,
      title: "Nomination Approved! 🎉",
      message: `Your nomination for ${data.nomineeName} in ${data.categoryName} has been approved.`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.NORMAL,
      eventId: data.eventId,
      candidateId: data.candidateId,
      actionUrl: `/events/${data.eventId}/candidates/${data.candidateId}`,
      actionText: "View Candidate",
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.NOMINATION_APPROVED,
        context: {
          name: data.userName,
          nomineeName: data.nomineeName,
          categoryName: data.categoryName,
          eventName: data.eventName,
          approvalDate: new Date(),
        },
      },
    });
  }

  /**
   * Send nomination rejected notification
   * @param {Object} data - { userId, userEmail, userName, nomineeName, categoryName, eventName, reason }
   * @returns {Promise<Object>}
   */
  async sendNominationRejected(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.NOMINATION_REJECTED,
      title: "Nomination Update",
      message: `Your nomination for ${data.nomineeName} could not be approved.`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.NORMAL,
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.NOMINATION_REJECTED,
        context: {
          name: data.userName,
          nomineeName: data.nomineeName,
          categoryName: data.categoryName,
          eventName: data.eventName,
          reason: data.reason,
        },
      },
    });
  }

  // ========================================
  // SECURITY NOTIFICATIONS
  // ========================================

  /**
   * Send login alert notification
   * @param {Object} data - { userId, userEmail, userName, ipAddress, location, device }
   * @returns {Promise<Object>}
   */
  async sendLoginAlert(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.LOGIN_ALERT,
      title: "New Login Detected 🔐",
      message: `A new login was detected from ${data.location || data.ipAddress}`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.HIGH,
      metadata: {
        ipAddress: data.ipAddress,
        location: data.location,
        device: data.device,
      },
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.LOGIN_ALERT,
        context: {
          name: data.userName,
          ipAddress: data.ipAddress,
          location: data.location,
          device: data.device,
          loginTime: new Date(),
        },
      },
    });
  }

  /**
   * Send suspicious activity alert
   * @param {Object} data - { userId, userEmail, userName, activityType, details }
   * @returns {Promise<Object>}
   */
  async sendSuspiciousActivityAlert(data) {
    return await this.create({
      userId: data.userId,
      type: NOTIFICATION_TYPE.SUSPICIOUS_ACTIVITY,
      title: "Suspicious Activity Detected ⚠️",
      message: `Suspicious activity detected: ${data.activityType}`,
      channel: NOTIFICATION_CHANNEL.EMAIL,
      priority: NOTIFICATION_PRIORITY.URGENT,
      metadata: {
        activityType: data.activityType,
        details: data.details,
      },
      emailData: {
        to: data.userEmail,
        template: EMAIL_TEMPLATES.SUSPICIOUS_ACTIVITY,
        context: {
          name: data.userName,
          activityType: data.activityType,
          details: data.details,
          detectedAt: new Date(),
        },
      },
    });
  }

  // ========================================
  // BULK NOTIFICATIONS
  // ========================================

  /**
   * Send bulk notifications to multiple users
   * @param {Array} users - Array of user objects { userId, userEmail, userName }
   * @param {Object} data - { type, title, message, template, context, eventId, priority }
   * @returns {Promise<Object>}
   */
  async sendBulkNotifications(users, data) {
    try {
      const batchId = `batch_${Date.now()}`;
      const results = {
        created: [],
        failed: [],
      };

      for (const user of users) {
        try {
          const notification = await this.create({
            userId: user.userId,
            type: data.type,
            title: data.title,
            message: data.message,
            channel: NOTIFICATION_CHANNEL.EMAIL,
            priority: data.priority || NOTIFICATION_PRIORITY.NORMAL,
            eventId: data.eventId,
            batchId,
            emailData: {
              to: user.userEmail,
              template: data.template,
              context: {
                ...data.context,
                name: user.userName,
              },
            },
          });

          results.created.push(notification);
        } catch (error) {
          results.failed.push({
            userId: user.userId,
            error: error.message,
          });
        }

        // Add small delay to avoid overwhelming the system
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      console.log(`📊 Bulk notifications: ${results.created.length} created, ${results.failed.length} failed`);

      return {
        success: true,
        batchId,
        created: results.created.length,
        failed: results.failed.length,
        details: results,
      };
    } catch (error) {
      console.error("❌ Bulk notification failed:", error);
      throw new Error(`Bulk notification failed: ${error.message}`);
    }
  }

  // ========================================
  // NOTIFICATION RETRIEVAL
  // ========================================

  /**
   * Get user notifications
   * @param {string} userId - User ID
   * @param {number} page - Page number
   * @param {number} limit - Limit
   * @returns {Promise<Object>}
   */
  async getUserNotifications(userId, page = 1, limit = 20) {
    return await this.repository.findByUser(userId, page, limit);
  }

  /**
   * Get unread notifications
   * @param {string} userId - User ID
   * @param {number} limit - Limit
   * @returns {Promise<Array>}
   */
  async getUnreadNotifications(userId, limit = 20) {
    return await this.repository.findUnread(userId, limit);
  }

  /**
   * Get unread count
   * @param {string} userId - User ID
   * @returns {Promise<number>}
   */
  async getUnreadCount(userId) {
    return await this.repository.getUnreadCount(userId);
  }

  /**
   * Mark notification as read
   * @param {string} notificationId - Notification ID
   * @returns {Promise<Object>}
   */
  async markAsRead(notificationId) {
    return await this.repository.markAsRead(notificationId);
  }

  /**
   * Mark all notifications as read
   * @param {string} userId - User ID
   * @returns {Promise<Object>}
   */
  async markAllAsRead(userId) {
    return await this.repository.markAllAsRead(userId);
  }

  /**
   * Delete notification
   * @param {string} notificationId - Notification ID
   * @returns {Promise<Object>}
   */
  async deleteNotification(notificationId) {
    return await this.repository.delete(notificationId);
  }

  // ========================================
  // CLEANUP & MAINTENANCE
  // ========================================

  /**
   * Clean up old notifications
   * @param {number} daysOld - Days threshold
   * @returns {Promise<Object>}
   */
  async cleanupOldNotifications(daysOld = 90) {
    return await this.repository.deleteOld(daysOld);
  }

  /**
   * Process pending email notifications
   * @param {number} limit - Limit
   * @returns {Promise<Object>}
   */
  async processPendingEmails(limit = 100) {
    try {
      const pending = await this.repository.findPendingForDelivery(NOTIFICATION_CHANNEL.EMAIL, limit);

      const results = {
        sent: [],
        failed: [],
      };

      for (const notification of pending) {
        try {
          // Reconstruct email data from notification
          const emailData = {
            to: notification.email_to,
            subject: notification.email_subject,
            template: notification.email_template_id,
            context: notification.metadata,
          };

          await this.sendEmailNotification(notification, emailData);
          results.sent.push(notification._id);
        } catch (error) {
          results.failed.push({
            notificationId: notification._id,
            error: error.message,
          });
        }
      }

      return {
        success: true,
        sent: results.sent.length,
        failed: results.failed.length,
      };
    } catch (error) {
      console.error("❌ Process pending emails failed:", error);
      throw new Error(`Process pending emails failed: ${error.message}`);
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
export default notificationService;
