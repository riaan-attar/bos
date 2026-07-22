const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Repost Accounting Ledger — queues a voucher for accounting ledger reposting.
 */
const RepostAccountingLedger = sequelize.define('RepostAccountingLedger', {
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
  tableName: 'repost_accounting_ledgers',
  timestamps: true,
});

module.exports = RepostAccountingLedger;
