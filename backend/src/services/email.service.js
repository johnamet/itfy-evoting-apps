/* eslint-disable no-undef */
/**
 * Email Service
 * Handles email sending for ITFY E-Voting platform using Nodemailer with:
 * - SMTP configuration (Gmail, SendGrid, AWS SES)
 * - HTML email templates (Handlebars)
 * - Integration with notification system
 * - Email verification, password reset, vote confirmations, event notifications
 */

import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";
import handlebars from "handlebars";
import { EMAIL_TEMPLATES, EMAIL_SUBJECTS } from "../utils/constants/email.constants.js";
import { NOTIFICATION_CHANNEL } from "../utils/constants/notification.constants.js";
import { configDotenv } from "dotenv";

configDotenv(); // Load .env variables

class EmailService {
  constructor() {
    this.transporter = null;
    this.from = process.env.EMAIL_FROM || "ITFY E-Voting <noreply@itfy-evoting.com>";
    this.templatesDir = path.join(process.cwd(), "src", "templates", "emails");
    this.isReady = false;

    // Register Handlebars helpers
    this.registerHandlebarsHelpers();

    // Initialize transporter
    this.initialize();
  }

  /**
   * Register custom Handlebars helpers
   * @private
   */
  registerHandlebarsHelpers() {
    // Equality helper for comparisons
    handlebars.registerHelper("eq", function (a, b) {
      return a === b;
    });

    // Not equal helper
    handlebars.registerHelper("ne", function (a, b) {
      return a !== b;
    });

    // Greater than helper
    handlebars.registerHelper("gt", function (a, b) {
      return a > b;
    });

    // Less than helper
    handlebars.registerHelper("lt", function (a, b) {
      return a < b;
    });

    // Logical OR helper
    handlebars.registerHelper("or", function () {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    });

    // Logical AND helper
    handlebars.registerHelper("and", function () {
      return Array.prototype.slice.call(arguments, 0, -1).every(Boolean);
    });

    // Format date helper
    handlebars.registerHelper("formatDate", function (date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    });

    // Format date and time helper
    handlebars.registerHelper("formatDateTime", function (date) {
      if (!date) return "";
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    // Format currency helper
    handlebars.registerHelper("formatCurrency", function (amount, currency = "NGN") {
      if (!amount && amount !== 0) return "";
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency,
      }).format(amount);
    });

    // Format number helper
    handlebars.registerHelper("formatNumber", function (num) {
      if (!num && num !== 0) return "";
      return new Intl.NumberFormat("en-US").format(num);
    });

    // Capitalize helper
    handlebars.registerHelper("capitalize", function (str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // Uppercase helper
    handlebars.registerHelper("uppercase", function (str) {
      if (!str) return "";
      return str.toUpperCase();
    });

    // Lowercase helper
    handlebars.registerHelper("lowercase", function (str) {
      if (!str) return "";
      return str.toLowerCase();
    });

    // Truncate helper
    handlebars.registerHelper("truncate", function (str, length = 100) {
      if (!str) return "";
      return str.length > length ? str.substring(0, length) + "..." : str;
    });

    // Default value helper
    handlebars.registerHelper("default", function (value, defaultValue) {
      return value || defaultValue;
    });
  }

  /**
   * Initialize email transporter
   * @private
   */
  async initialize() {
    try {
      const emailProvider = process.env.EMAIL_PROVIDER || "gmail";

      console.log(`📧 Initializing email service with provider: ${emailProvider}`);

      switch (emailProvider.toLowerCase()) {
        case "gmail":
          this.transporter = this.createGmailTransporter();
          break;
        case "sendgrid":
          this.transporter = this.createSendGridTransporter();
          break;
        case "ses":
          this.transporter = this.createSESTransporter();
          break;
        case "smtp":
        default:
          this.transporter = this.createSMTPTransporter();
      }

      // Verify transporter configuration
      await this.transporter.verify();
      this.isReady = true;
      console.log("✅ Email service initialized successfully");
    } catch (error) {
      console.error("❌ Email service initialization failed:", error.message);
      this.isReady = false;

      // Fallback to console logging in development
      if (process.env.NODE_ENV !== "production") {
        console.warn("⚠️  Using console email preview in development");
        this.transporter = this.createTestTransporter();
        this.isReady = true;
      }
    }
  }

  // ========================================
  // TRANSPORTER CONFIGURATIONS
  // ========================================

  /**
   * Create Gmail transporter
   * Requires: EMAIL_USER, EMAIL_PASSWORD (app password)
   */
  createGmailTransporter() {
    console.log(`Using Gmail transporter for ${process.env.EMAIL_USER}`);
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Create SendGrid transporter
   * Requires: SENDGRID_API_KEY
   */
  createSendGridTransporter() {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  /**
   * Create AWS SES transporter
   * Requires: AWS_SES_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
   */
  createSESTransporter() {
    return nodemailer.createTransport({
      host: `email.${process.env.AWS_SES_REGION || "us-east-1"}.amazonaws.com`,
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_ACCESS_KEY_ID,
        pass: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * Create generic SMTP transporter
   * Requires: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
   */
  createSMTPTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /**
   * Create test transporter (logs to console)
   * Used in development when SMTP is not configured
   */
  createTestTransporter() {
    return {
      sendMail: async (mailOptions) => {
        console.log("\n╔════════════════════════════════════════╗");
        console.log("║       📧 EMAIL PREVIEW (DEV MODE)     ║");
        console.log("╠════════════════════════════════════════╣");
        console.log("  To:", mailOptions.to);
        console.log("  Subject:", mailOptions.subject);
        console.log("  Text:", mailOptions.text?.substring(0, 150) + "...");
        console.log("╚════════════════════════════════════════╝\n");
        return { messageId: "test-" + Date.now() };
      },
      verify: async () => true,
    };
  }

  // ========================================
  // CORE EMAIL SENDING
  // ========================================

  /**
   * Send email
   * @param {Object} options - { to, subject, text, html, attachments }
   * @returns {Promise<Object>}
   */
  async sendEmail(options) {
    try {
      if (!this.isReady && process.env.NODE_ENV === "production") {
        throw new Error("Email service not ready");
      }

      const mailOptions = {
        from: options.from || this.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);

      console.log(`✅ Email sent: ${info.messageId} to ${options.to}`);
      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
      };
    } catch (error) {
      console.error("❌ Email send failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Send email using template
   * @param {Object} options - { to, subject, template, context }
   * @returns {Promise<Object>}
   */
  async sendTemplateEmail(options) {
    try {
      console.log(`📧 Preparing to send template email: ${options.template} to ${options.to}`);
      const { to, subject, template, context } = options;

      // Load and compile template
      const html = await this.renderTemplate(template, context);
      const text = this.htmlToText(html);

      return await this.sendEmail({
        to,
        subject: subject || EMAIL_SUBJECTS[template] || "ITFY E-Voting Notification",
        html,
        text,
      });
    } catch (error) {
      console.error("❌ Template email send failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // ========================================
  // EMAIL TEMPLATES
  // ========================================

  /**
   * Load and render email template
   * @param {string} templateName - Template file name (without .hbs)
   * @param {Object} context - Template variables
   * @returns {Promise<string>} - Rendered HTML
   */
  async renderTemplate(templateName, context = {}) {
    try {
      const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);
      const templateSource = await fs.readFile(templatePath, "utf-8");
      const template = handlebars.compile(templateSource);

      // Add common context variables
      const fullContext = {
        ...context,
        appName: "ITFY E-Voting",
        appUrl: process.env.APP_URL || "http://localhost:3000",
        currentYear: new Date().getFullYear(),
        supportEmail: process.env.SUPPORT_EMAIL || "support@itfy-evoting.com",
        logoUrl: `${process.env.APP_URL || "http://localhost:3000"}/logo.png`,
        primaryColor: "#4F46E5",
        secondaryColor: "#10B981",
      };

      return template(fullContext);
    } catch (error) {
      console.error(`❌ Template render failed for ${templateName}:`, error.message);
      // Return basic fallback HTML
      return this.getFallbackTemplate(context);
    }
  }

  /**
   * Fallback template when template file is missing
   * @param {Object} context
   * @returns {string}
   * @private
   */
  getFallbackTemplate(context) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ITFY E-Voting</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">ITFY E-Voting</h1>
          </div>
          <div style="padding: 30px;">
            ${context.message || context.title || ""}
            ${context.content || ""}
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} ITFY E-Voting. All rights reserved.
            </p>
            <p style="color: #999; font-size: 11px; margin: 10px 0 0;">
              Need help? Contact us at ${process.env.SUPPORT_EMAIL || "support@itfy-evoting.com"}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Convert HTML to plain text
   * @param {string} html
   * @returns {string}
   * @private
   */
  htmlToText(html) {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // ========================================
  // AUTHENTICATION & ACCOUNT EMAILS
  // ========================================

  /**
   * Send welcome email
   * @param {Object} data - { to, name, email, verificationUrl }
   * @returns {Promise<Object>}
   */
  async sendWelcomeEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.WELCOME,
      context: {
        name: data.name,
        email: data.to || data.email,
        verificationUrl: data.verificationUrl,
      },
    });
  }

  /**
   * Send email verification
   * @param {Object} data - { to, name, verificationUrl, verificationCode }
   * @returns {Promise<Object>}
   */
  async sendVerificationEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.EMAIL_VERIFICATION,
      context: {
        name: data.name,
        verificationUrl: data.verificationUrl,
        verificationCode: data.verificationCode,
      },
    });
  }

  /**
   * Send email verification (simplified signature for auth service)
   * @param {string} email - User email
   * @param {string} name - User name
   * @param {string} verificationUrl - Verification URL with token
   * @returns {Promise<Object>}
   */
  async sendEmailVerificationEmail(email, name, verificationUrl) {
    return await this.sendVerificationEmail({
      to: email,
      name,
      verificationUrl,
    });
  }

  /**
   * Send password reset email
   * @param {string|Object} emailOrData - Email address or data object
   * @param {string} [name] - User name (if first param is email)
   * @param {string} [resetUrl] - Reset URL (if first param is email)
   * @returns {Promise<Object>}
   */
  async sendPasswordResetEmail(emailOrData, name, resetUrl) {
    // Support both object and individual parameters
    if (typeof emailOrData === 'object') {
      const data = emailOrData;
      return await this.sendTemplateEmail({
        to: data.to || data.email,
        template: EMAIL_TEMPLATES.PASSWORD_RESET,
        context: {
          name: data.name,
          resetUrl: data.resetUrl,
          resetToken: data.resetToken,
          expiresIn: data.expiresIn || "1 hour",
        },
      });
    } else {
      // Individual parameters (email, name, resetUrl)
      return await this.sendTemplateEmail({
        to: emailOrData,
        template: EMAIL_TEMPLATES.PASSWORD_RESET,
        context: {
          name,
          resetUrl,
          expiresIn: "1 hour",
        },
      });
    }
  }

  /**
   * Send password changed confirmation
   * @param {string|Object} emailOrData - Email address or data object
   * @param {string} [name] - User name (if first param is email)
   * @returns {Promise<Object>}
   */
  async sendPasswordChangedEmail(emailOrData, name) {
    // Support both object and individual parameters
    if (typeof emailOrData === 'object') {
      const data = emailOrData;
      return await this.sendTemplateEmail({
        to: data.to || data.email,
        template: EMAIL_TEMPLATES.PASSWORD_CHANGED,
        context: {
          name: data.name,
          changeDate: data.changeDate || new Date().toLocaleString(),
          ipAddress: data.ipAddress,
        },
      });
    } else {
      // Individual parameters (email, name)
      return await this.sendTemplateEmail({
        to: emailOrData,
        template: EMAIL_TEMPLATES.PASSWORD_CHANGED,
        context: {
          name,
          changeDate: new Date().toLocaleString(),
        },
      });
    }
  }

  /**
   * Send account locked notification
   * @param {string|Object} emailOrData - Email address or data object
   * @param {string} [name] - User name (if first param is email)
   * @param {string|number} [duration] - Lock duration in minutes (if first param is email)
   * @returns {Promise<Object>}
   */
  async sendAccountLockedEmail(emailOrData, name, duration) {
    // Support both object and individual parameters
    if (typeof emailOrData === 'object') {
      const data = emailOrData;
      return await this.sendTemplateEmail({
        to: data.to || data.email,
        template: EMAIL_TEMPLATES.ACCOUNT_LOCKED,
        context: {
          name: data.name,
          duration: data.duration || "15 minutes",
          reason: data.reason || "Multiple failed login attempts",
        },
      });
    } else {
      // Individual parameters (email, name, duration)
      return await this.sendTemplateEmail({
        to: emailOrData,
        template: EMAIL_TEMPLATES.ACCOUNT_LOCKED,
        context: {
          name,
          duration: `${duration} minutes`,
          reason: "Multiple failed login attempts",
        },
      });
    }
  }

  // ========================================
  // VOTE-RELATED EMAILS
  // ========================================

  /**
   * Send vote confirmation email
   * @param {Object} data - { to, name, eventName, candidateName, voteCount, voteCode, amount, paymentDate }
   * @returns {Promise<Object>}
   */
  async sendVoteConfirmationEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.VOTE_CONFIRMATION,
      context: {
        name: data.name,
        eventName: data.eventName,
        candidateName: data.candidateName,
        categoryName: data.categoryName,
        voteCount: data.voteCount || 1,
        voteCode: data.voteCode,
        amount: data.amount,
        currency: data.currency || "NGN",
        paymentDate: data.paymentDate || new Date(),
        receiptUrl: data.receiptUrl,
      },
    });
  }

  /**
   * Send vote receipt email
   * @param {Object} data - { to, name, eventName, votes, totalAmount, paymentReference, paymentDate }
   * @returns {Promise<Object>}
   */
  async sendVoteReceiptEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.VOTE_RECEIPT,
      context: {
        name: data.name,
        eventName: data.eventName,
        votes: data.votes, // Array of { candidateName, categoryName, voteCount, amount }
        totalAmount: data.totalAmount,
        currency: data.currency || "NGN",
        paymentReference: data.paymentReference,
        voteCode: data.voteCode,
        paymentDate: data.paymentDate || new Date(),
      },
    });
  }

  /**
   * Send voting started notification
   * @param {Object} data - { to, name, eventName, eventUrl, startDate, endDate }
   * @returns {Promise<Object>}
   */
  async sendVotingStartedEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.VOTING_STARTED,
      context: {
        name: data.name,
        eventName: data.eventName,
        eventDescription: data.eventDescription,
        eventUrl: data.eventUrl,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });
  }

  /**
   * Send voting ending soon reminder
   * @param {Object} data - { to, name, eventName, eventUrl, endDate, hoursRemaining }
   * @returns {Promise<Object>}
   */
  async sendVotingEndingSoonEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.VOTING_ENDING_SOON,
      context: {
        name: data.name,
        eventName: data.eventName,
        eventUrl: data.eventUrl,
        endDate: data.endDate,
        hoursRemaining: data.hoursRemaining,
      },
    });
  }

  /**
   * Send results published notification
   * @param {Object} data - { to, name, eventName, resultsUrl, winners }
   * @returns {Promise<Object>}
   */
  async sendResultsPublishedEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.RESULTS_PUBLISHED,
      context: {
        name: data.name,
        eventName: data.eventName,
        resultsUrl: data.resultsUrl,
        winners: data.winners, // Array of { categoryName, candidateName, voteCount }
      },
    });
  }

  // ========================================
  // PAYMENT-RELATED EMAILS
  // ========================================

  /**
   * Send payment success email
   * @param {Object} data - { to, name, amount, currency, reference, paymentDate, description }
   * @returns {Promise<Object>}
   */
  async sendPaymentSuccessEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.PAYMENT_SUCCESS,
      context: {
        name: data.name,
        amount: data.amount,
        currency: data.currency || "NGN",
        reference: data.reference,
        paymentDate: data.paymentDate || new Date(),
        description: data.description,
        receiptUrl: data.receiptUrl,
      },
    });
  }

  /**
   * Send refund processed email
   * @param {Object} data - { to, name, amount, currency, reason, refundDate }
   * @returns {Promise<Object>}
   */
  async sendRefundProcessedEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.REFUND_PROCESSED,
      context: {
        name: data.name,
        amount: data.amount,
        currency: data.currency || "NGN",
        reason: data.reason,
        refundDate: data.refundDate || new Date(),
        reference: data.reference,
      },
    });
  }

  // ========================================
  // NOMINATION/FORM EMAILS
  // ========================================

  /**
   * Send nomination confirmation email
   * @param {Object} data - { to, name, nomineeName, categoryName, eventName }
   * @returns {Promise<Object>}
   */
  async sendNominationConfirmationEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.NOMINATION_CONFIRMATION,
      context: {
        name: data.name,
        nomineeName: data.nomineeName,
        categoryName: data.categoryName,
        eventName: data.eventName,
        submissionDate: data.submissionDate || new Date(),
      },
    });
  }

  /**
   * Send nomination approved email
   * @param {Object} data - { to, name, nomineeName, categoryName, eventName }
   * @returns {Promise<Object>}
   */
  async sendNominationApprovedEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.NOMINATION_APPROVED,
      context: {
        name: data.name,
        nomineeName: data.nomineeName,
        categoryName: data.categoryName,
        eventName: data.eventName,
        approvalDate: data.approvalDate || new Date(),
      },
    });
  }

  // ========================================
  // CANDIDATE PORTAL EMAILS
  // ========================================

  /**
   * Send candidate welcome email with credentials
   * @param {string} email - Candidate email
   * @param {string} name - Candidate name
   * @param {string} candidateCode - Generated candidate code
   * @param {string} [eventName] - Optional event name
   * @returns {Promise<Object>}
   */
  async sendCandidateWelcomeEmail(email, name, candidateCode, eventName = null) {
    return await this.sendTemplateEmail({
      to: email,
      template: EMAIL_TEMPLATES.CANDIDATE_WELCOME,
      context: {
        name,
        candidateCode,
        eventName,
        loginUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/candidate/login`,
      },
    });
  }

  /**
   * Send candidate profile approved email
   * @param {string} email - Candidate email
   * @param {string} name - Candidate name
   * @param {Object} event - Event object with title
   * @returns {Promise<Object>}
   */
  async sendCandidateProfileApprovedEmail(email, name, event) {
    return await this.sendTemplateEmail({
      to: email,
      template: EMAIL_TEMPLATES.CANDIDATE_PROFILE_APPROVED,
      context: {
        name,
        eventName: event.title || "the event",
        eventUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/events/${event._id}`,
        profileUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/candidate/profile`,
        approvalDate: new Date(),
      },
    });
  }

  /**
   * Send candidate profile rejected email
   * @param {string} email - Candidate email
   * @param {string} name - Candidate name
   * @param {string} reason - Rejection reason
   * @returns {Promise<Object>}
   */
  async sendCandidateProfileRejectedEmail(email, name, reason) {
    return await this.sendTemplateEmail({
      to: email,
      template: EMAIL_TEMPLATES.CANDIDATE_PROFILE_REJECTED,
      context: {
        name,
        reason,
        supportEmail: process.env.SUPPORT_EMAIL || "support@itfy-evoting.com",
        profileUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/candidate/profile`,
      },
    });
  }

  /**
   * Send admin alert for candidate profile update
   * @param {string} adminEmail - Admin email
   * @param {string} candidateName - Candidate name
   * @param {string} eventTitle - Event title
   * @param {Array<string>} changedFields - Fields that were changed
   * @returns {Promise<Object>}
   */
  async sendAdminProfileUpdateAlertEmail(adminEmail, candidateName, eventTitle, changedFields) {
    return await this.sendTemplateEmail({
      to: adminEmail,
      template: EMAIL_TEMPLATES.ADMIN_PROFILE_UPDATE_ALERT,
      context: {
        candidateName,
        eventTitle,
        changedFields: changedFields.join(", "),
        changedFieldsList: changedFields,
        reviewUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/candidates/pending`,
        updatedAt: new Date(),
      },
    });
  }

  // ========================================
  // EVENT-RELATED EMAILS
  // ========================================

  /**
   * Send event reminder email
   * @param {Object} data - { to, name, eventName, eventUrl, reminderType, eventDate }
   * @returns {Promise<Object>}
   */
  async sendEventReminderEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.EVENT_REMINDER,
      context: {
        name: data.name,
        eventName: data.eventName,
        eventDescription: data.eventDescription,
        eventUrl: data.eventUrl,
        reminderType: data.reminderType, // 'starting', 'ending'
        eventDate: data.eventDate,
      },
    });
  }

  // ========================================
  // SECURITY EMAILS
  // ========================================

  /**
   * Send candidate account locked email
   * @param {Object} data - { to, name, eventName, reason, lockedAt }
   * @returns {Promise<Object>}
   */
  async sendCandidateAccountLockedEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to,
      subject: `🔒 Your Candidate Account Has Been Locked`,
      template: EMAIL_TEMPLATES.ACCOUNT_LOCKED,
      context: {
        name: data.name,
        eventName: data.eventName,
        reason: data.reason || "Your account has been locked",
        lockedAt: data.lockedAt,
        supportEmail: process.env.SUPPORT_EMAIL || "support@itfy-evoting.com",
        currentYear: new Date().getFullYear(),
      },
    });
  }

  /**
   * Send login alert email
   * @param {Object} data - { to, name, ipAddress, location, device, loginTime }
   * @returns {Promise<Object>}
   */
  async sendLoginAlertEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.LOGIN_ALERT,
      context: {
        name: data.name,
        ipAddress: data.ipAddress,
        location: data.location,
        device: data.device,
        loginTime: data.loginTime || new Date(),
      },
    });
  }

  /**
   * Send suspicious activity alert
   * @param {Object} data - { to, name, activityType, details, detectedAt }
   * @returns {Promise<Object>}
   */
  async sendSuspiciousActivityEmail(data) {
    return await this.sendTemplateEmail({
      to: data.to || data.email,
      template: EMAIL_TEMPLATES.SUSPICIOUS_ACTIVITY,
      context: {
        name: data.name,
        activityType: data.activityType,
        details: data.details,
        detectedAt: data.detectedAt || new Date(),
      },
    });
  }

  // ========================================
  // BULK EMAIL SENDING
  // ========================================

  /**
   * Send email to multiple recipients
   * @param {Array} recipients - Array of email addresses or objects with { email, context }
   * @param {Object} options - { subject, template, context }
   * @returns {Promise<Object>}
   */
  async sendBulkEmail(recipients, options) {
    try {
      const results = {
        sent: [],
        failed: [],
      };

      for (const recipient of recipients) {
        const recipientEmail = typeof recipient === "string" ? recipient : recipient.email;
        const recipientContext =
          typeof recipient === "object" ? { ...options.context, ...recipient.context } : options.context;

        const result = await this.sendTemplateEmail({
          to: recipientEmail,
          subject: options.subject,
          template: options.template,
          context: recipientContext,
        });

        if (result.success) {
          results.sent.push(recipientEmail);
        } else {
          results.failed.push({ email: recipientEmail, error: result.error });
        }

        // Add small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      console.log(`📊 Bulk email sent: ${results.sent.length} success, ${results.failed.length} failed`);

      return {
        success: true,
        sent: results.sent.length,
        failed: results.failed.length,
        details: results,
      };
    } catch (error) {
      console.error("❌ Bulk email failed:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  /**
   * Verify email service configuration
   * @returns {Promise<boolean>}
   */
  async verify() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("❌ Email verification failed:", error);
      return false;
    }
  }

  /**
   * Get email service health status
   * @returns {Promise<Object>}
   */
  async healthCheck() {
    try {
      const isVerified = await this.verify();
      return {
        status: isVerified ? "healthy" : "unhealthy",
        channel: NOTIFICATION_CHANNEL.EMAIL,
        provider: process.env.EMAIL_PROVIDER || "smtp",
        isReady: this.isReady,
        from: this.from,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error.message,
      };
    }
  }

  /**
   * Create test email for development
   * @param {string} to - Test recipient
   * @returns {Promise<Object>}
   */
  async sendTestEmail(to) {
    return await this.sendEmail({
      to,
      subject: "Test Email from ITFY E-Voting Platform",
      html: this.getFallbackTemplate({
        message: `
          <h3>🧪 Test Email</h3>
          <p>This is a test email from the ITFY E-Voting platform.</p>
          <p>If you received this, the email service is working correctly! ✅</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || "development"}</p>
        `,
      }),
    });
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;
