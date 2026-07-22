const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Sales Invoice header record.
 * Line items are in SalesInvoiceItem (CASCADE delete).
 */
const SalesInvoice = sequelize.define('SalesInvoice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoiceId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'inv_customers', key: 'id' },
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invoiceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  paymentTerms: {
    type: DataTypes.ENUM('Immediate', '30 Days', '60 Days', 'Custom'),
    defaultValue: '30 Days',
  },
  subtotal: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  taxAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  outstandingAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Unpaid', 'Partly Paid', 'Paid', 'Cancelled'),
    defaultValue: 'Draft',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'sales_invoices',
  timestamps: true,
});

module.exports = SalesInvoice;
