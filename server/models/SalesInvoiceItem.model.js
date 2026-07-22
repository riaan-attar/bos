const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Sales Invoice line items.
 * CASCADE deleted when parent SalesInvoice is deleted.
 */
const SalesInvoiceItem = sequelize.define('SalesInvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  salesInvoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'sales_invoices', key: 'id' },
    onDelete: 'CASCADE',
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qty: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1,
  },
  rate: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  taxPercent: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 18,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'sales_invoice_items',
  timestamps: false,
});

module.exports = SalesInvoiceItem;
