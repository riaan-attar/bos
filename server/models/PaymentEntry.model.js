const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Payment Entry — records money received from customers or paid to suppliers.
 */
const PaymentEntry = sequelize.define('PaymentEntry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  paymentType: {
    type: DataTypes.ENUM('Receive', 'Pay', 'Internal Transfer'),
    allowNull: false,
  },
  postingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  partyType: {
    type: DataTypes.ENUM('Customer', 'Supplier'),
    allowNull: true,
  },
  party: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paidAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  modeOfPayment: {
    type: DataTypes.ENUM('Cash', 'Bank Transfer', 'Cheque', 'UPI', 'NEFT', 'RTGS'),
    defaultValue: 'Bank Transfer',
  },
  accountPaidFrom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountPaidTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  referenceNo: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Cheque number, UPI ref, transaction ID etc.',
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Submitted', 'Cancelled'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'payment_entries',
  timestamps: true,
});

module.exports = PaymentEntry;
