const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Credit Note — issued to customer as refund/credit against a Sales Invoice.
 */
const CreditNote = sequelize.define('CreditNote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  creditNoteId: {
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
  returnAgainstInvoice: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Reference to SalesInvoice.invoiceId',
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
  tableName: 'credit_notes',
  timestamps: true,
});

module.exports = CreditNote;
