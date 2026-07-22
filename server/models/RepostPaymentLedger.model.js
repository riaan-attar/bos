const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Repost Payment Ledger — queues a voucher for payment ledger reposting.
 */
const RepostPaymentLedger = sequelize.define('RepostPaymentLedger', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  repostId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  voucherType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  voucherNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Queued', 'Completed', 'Failed'),
    defaultValue: 'Queued',
  },
}, {
  tableName: 'repost_payment_ledgers',
  timestamps: true,
});

module.exports = RepostPaymentLedger;
