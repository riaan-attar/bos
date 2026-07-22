const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Purchase Invoice line items.
 * CASCADE deleted when parent PurchaseInvoice is deleted.
 */
const PurchaseInvoiceItem = sequelize.define('PurchaseInvoiceItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  purchaseInvoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'purchase_invoices', key: 'id' },
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
  tableName: 'purchase_invoice_items',
  timestamps: false,
});

module.exports = PurchaseInvoiceItem;
