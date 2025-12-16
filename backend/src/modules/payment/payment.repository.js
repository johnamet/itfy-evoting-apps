/**
 * Payment Repository
 * This file defines the PaymentRepository class which extends the BaseRepository
 * It contains payment-specific data access methods
 */

import { BaseRepository } from "../shared/base.repository.js";
import PaymentModel from "./payment.model.js";
import { STATUS, PAYMENT_METHOD } from "../../utils/constants/payment.constants.js";

class PaymentRepository extends BaseRepository {
  constructor() {
    super(PaymentModel);
  }

  /**
   * Create a new payment
   * @param {Object} paymentData - Payment data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Created payment
   */
  async create(paymentData, options = {}) {
    try {
      // Validate required fields
      if (!paymentData.bundle) {
        throw new Error("Bundle ID is required");
      }
      if (!paymentData.event) {
        throw new Error("Event ID is required");
      }
      if (!paymentData.voter_email) {
        throw new Error("Voter email is required");
      }
      if (!paymentData.amount_paid || paymentData.amount_paid <= 0) {
        throw new Error("Valid payment amount is required");
      }
      if (!paymentData.votes_purchased || paymentData.votes_purchased <= 0) {
        throw new Error("Valid votes purchased count is required");
      }

      return await super.create(paymentData, options);
    } catch (error) {
      throw new Error(`Create payment failed: ${error.message}`);
    }
  }

  /**
   * Update a payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {Object} updates - Update data
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Updated payment
   */
  async update(paymentId, updates, options = {}) {
    try {
      return await this.updateById(paymentId, updates, options);
    } catch (error) {
      throw new Error(`Update payment failed: ${error.message}`);
    }
  }

  /**
   * Soft delete a payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Deleted payment
   */
  async delete(paymentId, options = {}) {
    try {
      return await super.delete({ _id: paymentId }, options);
    } catch (error) {
      throw new Error(`Delete payment failed: ${error.message}`);
    }
  }

  /**
   * Restore a soft-deleted payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Restored payment
   */
  async restore(paymentId, options = {}) {
    try {
      return await super.restore({ _id: paymentId }, options);
    } catch (error) {
      throw new Error(`Restore payment failed: ${error.message}`);
    }
  }

  /**
   * Permanently delete a payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Force deleted payment
   */
  async forceDelete(paymentId, options = {}) {
    try {
      return await super.forceDelete({ _id: paymentId }, options);
    } catch (error) {
      throw new Error(`Force delete payment failed: ${error.message}`);
    }
  }

  /**
   * Find payment by vote code
   * @param {string} voteCode - Vote code
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Payment or null
   */
  async findByVoteCode(voteCode, options = {}) {
    try {
      const query = this.model.findOne({ vote_code: voteCode.toUpperCase() });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find payment by vote code failed: ${error.message}`);
    }
  }

  /**
   * Find payment by transaction reference
   * @param {string} transactionReference - Transaction reference
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Payment or null
   */
  async findByTransactionReference(transactionReference, options = {}) {
    try {
      const query = this.model.findOne({ transaction_reference: transactionReference });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find payment by transaction reference failed: ${error.message}`);
    }
  }

  /**
   * Find payment by Paystack reference
   * @param {string} paystackReference - Paystack reference
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Payment or null
   */
  async findByPaystackReference(paystackReference, options = {}) {
    try {
      const query = this.model.findOne({ paystack_reference: paystackReference });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find payment by paystack reference failed: ${error.message}`);
    }
  }

  /**
   * Find payment by Paystack access code
   * @param {string} accessCode - Paystack access code
   * @param {Object} [options] - Query options
   * @returns {Promise<Object|null>} - Payment or null
   */
  async findByAccessCode(accessCode, options = {}) {
    try {
      const query = this.model.findOne({ paystack_access_code: accessCode });

      this._applyOptions(query, options);
      return await query.lean(options.lean).exec();
    } catch (error) {
      throw new Error(`Find payment by access code failed: ${error.message}`);
    }
  }

  /**
   * Find all payments for a specific event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async findByEvent(eventId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll({ event: eventId }, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments by event failed: ${error.message}`);
    }
  }

  /**
   * Find all payments by email
   * @param {string} email - Voter email
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async findByEmail(email, eventId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = { voter_email: email.toLowerCase() };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments by email failed: ${error.message}`);
    }
  }

  /**
   * Find payments by bundle
   * @param {string|mongoose.Types.ObjectId} bundleId - Bundle ID
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async findByBundle(bundleId, page = 1, limit = 20, options = {}) {
    try {
      return await this.findAll({ bundle: bundleId }, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments by bundle failed: ${error.message}`);
    }
  }

  /**
   * Find payments by status
   * @param {string} status - Payment status
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async findByStatus(status, eventId = null, page = 1, limit = 20, options = {}) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const filter = { payment_status: status };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments by status failed: ${error.message}`);
    }
  }

  /**
   * Find pending payments
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated pending payments
   */
  async findPending(eventId = null, page = 1, limit = 20, options = {}) {
    try {
      return await this.findByStatus(STATUS.PENDING, eventId, page, limit, options);
    } catch (error) {
      throw new Error(`Find pending payments failed: ${error.message}`);
    }
  }

  /**
   * Find completed payments
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated completed payments
   */
  async findCompleted(eventId = null, page = 1, limit = 20, options = {}) {
    try {
      return await this.findByStatus(STATUS.COMPLETED, eventId, page, limit, {
        sort: { confirmed_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find completed payments failed: ${error.message}`);
    }
  }

  /**
   * Find failed payments
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated failed payments
   */
  async findFailed(eventId = null, page = 1, limit = 20, options = {}) {
    try {
      return await this.findByStatus(STATUS.FAILED, eventId, page, limit, {
        sort: { failed_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find failed payments failed: ${error.message}`);
    }
  }

  /**
   * Find refunded payments
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated refunded payments
   */
  async findRefunded(eventId = null, page = 1, limit = 20, options = {}) {
    try {
      return await this.findByStatus(STATUS.REFUNDED, eventId, page, limit, {
        sort: { refunded_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find refunded payments failed: ${error.message}`);
    }
  }

  /**
   * Find payments with unused votes
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments with unused votes
   */
  async findWithUnusedVotes(eventId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = {
        payment_status: STATUS.COMPLETED,
        $expr: { $gt: ["$votes_remaining", 0] },
      };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { votes_remaining: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments with unused votes failed: ${error.message}`);
    }
  }

  /**
   * Find payments without webhooks
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments without webhooks
   */
  async findWithoutWebhook(eventId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = {
        payment_status: STATUS.COMPLETED,
        webhook_received: false,
      };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: 1 }, // Oldest first
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments without webhook failed: ${error.message}`);
    }
  }

  /**
   * Find payments by payment method
   * @param {string} paymentMethod - Payment method
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async findByPaymentMethod(paymentMethod, eventId = null, page = 1, limit = 20, options = {}) {
    try {
      if (!Object.values(PAYMENT_METHOD).includes(paymentMethod)) {
        throw new Error(`Invalid payment method: ${paymentMethod}`);
      }

      const filter = { payment_method: paymentMethod };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments by method failed: ${error.message}`);
    }
  }

  /**
   * Find payments by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated payments
   */
  async findByDateRange(startDate, endDate, eventId = null, page = 1, limit = 20, options = {}) {
    try {
      const filter = {
        created_at: {
          $gte: startDate,
          $lte: endDate,
        },
      };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: -1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find payments by date range failed: ${error.message}`);
    }
  }

  /**
   * Get payment statistics for an event
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @returns {Promise<Object>} - Payment statistics
   */
  async getStatistics(eventId = null) {
    try {
      const matchStage = eventId ? { event: eventId } : {};

      const [stats] = await this.model.aggregate([
        { $match: matchStage },
        {
          $facet: {
            total: [{ $count: "count" }],
            completed: [{ $match: { payment_status: STATUS.COMPLETED } }, { $count: "count" }],
            pending: [{ $match: { payment_status: STATUS.PENDING } }, { $count: "count" }],
            failed: [{ $match: { payment_status: STATUS.FAILED } }, { $count: "count" }],
            refunded: [{ $match: { payment_status: STATUS.REFUNDED } }, { $count: "count" }],
            totalRevenue: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$amount_paid" },
                },
              },
            ],
            totalRefunded: [
              { $match: { payment_status: STATUS.REFUNDED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$refund_amount" },
                },
              },
            ],
            totalDiscounts: [
              {
                $group: {
                  _id: null,
                  total: { $sum: "$discount_amount" },
                },
              },
            ],
            totalVotesPurchased: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$votes_purchased" },
                },
              },
            ],
            totalVotesCast: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$votes_cast" },
                },
              },
            ],
            avgAmount: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: null,
                  average: { $avg: "$amount_paid" },
                },
              },
            ],
            byPaymentMethod: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: "$payment_method",
                  count: { $sum: 1 },
                  total: { $sum: "$amount_paid" },
                },
              },
              { $sort: { total: -1 } },
            ],
            uniqueVoters: [
              { $match: { payment_status: STATUS.COMPLETED } },
              {
                $group: {
                  _id: "$voter_email",
                },
              },
              { $count: "count" },
            ],
            withUnusedVotes: [
              {
                $match: {
                  payment_status: STATUS.COMPLETED,
                  $expr: { $gt: ["$votes_remaining", 0] },
                },
              },
              { $count: "count" },
            ],
          },
        },
      ]);

      return {
        total: stats?.total[0]?.count || 0,
        completed: stats?.completed[0]?.count || 0,
        pending: stats?.pending[0]?.count || 0,
        failed: stats?.failed[0]?.count || 0,
        refunded: stats?.refunded[0]?.count || 0,
        totalRevenue: Math.round((stats?.totalRevenue[0]?.total || 0) * 100) / 100,
        totalRefunded: Math.round((stats?.totalRefunded[0]?.total || 0) * 100) / 100,
        totalDiscounts: Math.round((stats?.totalDiscounts[0]?.total || 0) * 100) / 100,
        netRevenue:
          Math.round(
            ((stats?.totalRevenue[0]?.total || 0) - (stats?.totalRefunded[0]?.total || 0)) * 100
          ) / 100,
        totalVotesPurchased: stats?.totalVotesPurchased[0]?.total || 0,
        totalVotesCast: stats?.totalVotesCast[0]?.total || 0,
        totalVotesRemaining:
          (stats?.totalVotesPurchased[0]?.total || 0) - (stats?.totalVotesCast[0]?.total || 0),
        averageAmount: Math.round((stats?.avgAmount[0]?.average || 0) * 100) / 100,
        byPaymentMethod: stats?.byPaymentMethod || [],
        uniqueVoters: stats?.uniqueVoters[0]?.count || 0,
        paymentsWithUnusedVotes: stats?.withUnusedVotes[0]?.count || 0,
      };
    } catch (error) {
      throw new Error(`Get payment statistics failed: ${error.message}`);
    }
  }

  /**
   * Get revenue aggregated by time period
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {string} period - Time period ('day', 'week', 'month', 'year')
   * @returns {Promise<Array>} - Aggregated revenue data
   */
  async aggregateRevenueByTimePeriod(eventId, period = "day") {
    try {
      const groupFormats = {
        day: { $dateToString: { format: "%Y-%m-%d", date: "$confirmed_at" } },
        week: { $isoWeek: "$confirmed_at" },
        month: { $dateToString: { format: "%Y-%m", date: "$confirmed_at" } },
        year: { $year: "$confirmed_at" },
      };

      if (!groupFormats[period]) {
        throw new Error(`Invalid period: ${period}. Use: day, week, month, year`);
      }

      const aggregated = await this.model.aggregate([
        {
          $match: {
            event: eventId,
            payment_status: STATUS.COMPLETED,
          },
        },
        {
          $group: {
            _id: groupFormats[period],
            count: { $sum: 1 },
            revenue: { $sum: "$amount_paid" },
            votesPurchased: { $sum: "$votes_purchased" },
            votesCast: { $sum: "$votes_cast" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      return aggregated;
    } catch (error) {
      throw new Error(`Aggregate revenue by time period failed: ${error.message}`);
    }
  }

  /**
   * Mark payment as completed
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {Object} paystackData - Paystack webhook data
   * @returns {Promise<Object>} - Updated payment
   */
  async markAsCompleted(paymentId, paystackData = {}) {
    try {
      const payment = await this.model.findById(paymentId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      return await payment.markAsCompleted(paystackData);
    } catch (error) {
      throw new Error(`Mark payment as completed failed: ${error.message}`);
    }
  }

  /**
   * Mark payment as failed
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {string} reason - Failure reason
   * @returns {Promise<Object>} - Updated payment
   */
  async markAsFailed(paymentId, reason) {
    try {
      const payment = await this.model.findById(paymentId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      return await payment.markAsFailed(reason);
    } catch (error) {
      throw new Error(`Mark payment as failed failed: ${error.message}`);
    }
  }

  /**
   * Process refund for a payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {string} reason - Refund reason
   * @param {number} [amount] - Optional partial refund amount
   * @returns {Promise<Object>} - Updated payment
   */
  async processRefund(paymentId, reason, amount = null) {
    try {
      const payment = await this.model.findById(paymentId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      return await payment.processRefund(reason, amount);
    } catch (error) {
      throw new Error(`Process refund failed: ${error.message}`);
    }
  }

  /**
   * Increment votes cast for a payment
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @param {number} [count=1] - Number of votes to increment
   * @returns {Promise<Object>} - Updated payment
   */
  async incrementVotesCast(paymentId, count = 1) {
    try {
      const payment = await this.model.findById(paymentId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      return await payment.incrementVotesCast(count);
    } catch (error) {
      throw new Error(`Increment votes cast failed: ${error.message}`);
    }
  }

  /**
   * Record webhook attempt
   * @param {string|mongoose.Types.ObjectId} paymentId - Payment ID
   * @returns {Promise<Object>} - Updated payment
   */
  async recordWebhook(paymentId) {
    try {
      const payment = await this.model.findById(paymentId);

      if (!payment) {
        throw new Error("Payment not found");
      }

      return await payment.recordWebhook();
    } catch (error) {
      throw new Error(`Record webhook failed: ${error.message}`);
    }
  }

  /**
   * Find stale pending payments (pending for more than specified hours)
   * @param {number} [hoursThreshold=24] - Hours threshold
   * @param {string|mongoose.Types.ObjectId} [eventId] - Optional event ID filter
   * @param {number} [page=1] - Page number
   * @param {number} [limit=20] - Items per page
   * @param {Object} [options] - Query options
   * @returns {Promise<Object>} - Paginated stale pending payments
   */
  async findStalePending(hoursThreshold = 24, eventId = null, page = 1, limit = 20, options = {}) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setHours(cutoffDate.getHours() - hoursThreshold);

      const filter = {
        payment_status: STATUS.PENDING,
        created_at: { $lt: cutoffDate },
      };
      if (eventId) filter.event = eventId;

      return await this.findAll(filter, page, limit, {
        sort: { created_at: 1 },
        ...options,
      });
    } catch (error) {
      throw new Error(`Find stale pending payments failed: ${error.message}`);
    }
  }

  /**
   * Bulk update payment status
   * @param {Array<string|mongoose.Types.ObjectId>} paymentIds - Payment IDs
   * @param {string} status - New status
   * @returns {Promise<Object>} - Bulk update result
   */
  async bulkUpdateStatus(paymentIds, status) {
    try {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error(`Invalid status: ${status}`);
      }

      const result = await this.model.updateMany(
        { _id: { $in: paymentIds } },
        { $set: { payment_status: status } }
      );

      return {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      };
    } catch (error) {
      throw new Error(`Bulk update payment status failed: ${error.message}`);
    }
  }

  /**
   * Export payments for an event
   * @param {string|mongoose.Types.ObjectId} eventId - Event ID
   * @param {Object} [filters] - Optional filters
   * @returns {Promise<Array>} - Payments data for export
   */
  async exportPayments(eventId, filters = {}) {
    try {
      const query = { event: eventId, ...filters };

      const payments = await this.model
        .find(query)
        .populate("bundle", "name vote_count price")
        .populate("coupon", "code discount_type discount_value")
        .sort({ created_at: -1 })
        .lean()
        .exec();

      return payments.map((payment) => ({
        transaction_reference: payment.transaction_reference,
        paystack_reference: payment.paystack_reference || "N/A",
        vote_code: payment.vote_code,
        voter_email: payment.voter_email,
        voter_name: payment.voter_name || "N/A",
        voter_phone: payment.voter_phone || "N/A",
        bundle: payment.bundle?.name || "N/A",
        votes_purchased: payment.votes_purchased,
        votes_cast: payment.votes_cast,
        votes_remaining: payment.votes_remaining,
        original_amount: payment.original_amount,
        discount_amount: payment.discount_amount,
        amount_paid: payment.amount_paid,
        currency: payment.currency,
        payment_method: payment.payment_method,
        payment_status: payment.payment_status,
        coupon_used: payment.coupon?.code || "N/A",
        created_at: payment.created_at,
        confirmed_at: payment.confirmed_at || "N/A",
        webhook_received: payment.webhook_received,
      }));
    } catch (error) {
      throw new Error(`Export payments failed: ${error.message}`);
    }
  }
}

export default new PaymentRepository();
