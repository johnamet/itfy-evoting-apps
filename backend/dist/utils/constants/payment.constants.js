"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATUS = exports.PAYMENT_METHOD = void 0;
// payment.constants.js
var STATUS = exports.STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded"
};
var PAYMENT_METHOD = exports.PAYMENT_METHOD = {
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",
  USSD: "ussd",
  MOBILE_MONEY: "mobile_money",
  QR: "qr"
};