const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Payment Request — a request to process payment against a reference document.
 */
const PaymentRequest = sequelize.define('PaymentRequest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  requestId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  referenceDoctype: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'e.g. Sales Invoice',
  },
  referenceName: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'e.g. SINV-2026-00001',
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Requested', 'Paid', 'Cancelled'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'payment_requests',
  timestamps: true,
});

module.exports = PaymentRequest;
