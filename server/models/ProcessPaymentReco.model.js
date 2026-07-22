const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Process Payment Reconciliation — triggers reconciliation of bank transactions
 * against payment entries for a given account and date range.
 */
const ProcessPaymentReco = sequelize.define('ProcessPaymentReco', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  processId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    defaultValue: 'Avenue Builders',
  },
  account: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fromDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  toDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Processing', 'Completed'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'process_payment_recos',
  timestamps: true,
});

module.exports = ProcessPaymentReco;
