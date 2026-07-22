const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Unreconcile Payment — reverses a previously reconciled payment entry.
 */
const UnreconcilePayment = sequelize.define('UnreconcilePayment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  unreconcileId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  paymentEntryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'payment_entries', key: 'id' },
  },
  party: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Submitted'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'unreconcile_payments',
  timestamps: true,
});

module.exports = UnreconcilePayment;
