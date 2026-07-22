const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Chart of Accounts — Invoicing module
 * Named InvAccount to avoid collision with future Account models.
 */
const InvAccount = sequelize.define('InvAccount', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountType: {
    type: DataTypes.ENUM('Asset', 'Liability', 'Income', 'Expense', 'Equity'),
    allowNull: false,
  },
  parentAccount: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rootType: {
    type: DataTypes.ENUM('Assets', 'Liabilities', 'Income', 'Expenses', 'Equity'),
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  company: {
    type: DataTypes.STRING,
    defaultValue: 'Avenue Builders',
  },
}, {
  tableName: 'inv_accounts',
  timestamps: true,
});

module.exports = InvAccount;
