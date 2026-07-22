const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Payment Order — an instruction to the bank to process a payment.
 */
const PaymentOrder = sequelize.define('PaymentOrder', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Submitted', 'Cancelled'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'payment_orders',
  timestamps: true,
});

module.exports = PaymentOrder;
