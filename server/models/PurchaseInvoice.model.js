const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Purchase Invoice header record.
 */
const PurchaseInvoice = sequelize.define('PurchaseInvoice', {
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
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'inv_suppliers', key: 'id' },
  },
  supplierName: {
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
  tableName: 'purchase_invoices',
  timestamps: true,
});

module.exports = PurchaseInvoice;
