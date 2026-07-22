const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Invoicing Customer Master
 * Separate from CRM Customer — this is the finance/accounting customer record.
 */
const InvCustomer = sequelize.define('InvCustomer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerGroup: {
    type: DataTypes.ENUM('Individual', 'Company', 'Builder', 'Investor'),
    defaultValue: 'Individual',
  },
  territory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taxId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creditLimit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  outstandingAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
}, {
  tableName: 'inv_customers',
  timestamps: true,
});

module.exports = InvCustomer;
