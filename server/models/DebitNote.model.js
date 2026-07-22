const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Debit Note — issued to supplier as deduction/return against a Purchase Invoice.
 */
const DebitNote = sequelize.define('DebitNote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  debitNoteId: {
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
  returnAgainstInvoice: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Reference to PurchaseInvoice.invoiceId',
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
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Submitted', 'Cancelled'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'debit_notes',
  timestamps: true,
});

module.exports = DebitNote;
