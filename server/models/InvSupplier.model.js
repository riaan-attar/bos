const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Invoicing Supplier Master
 */
const InvSupplier = sequelize.define('InvSupplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  supplierId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supplierGroup: {
    type: DataTypes.ENUM('Raw Material', 'Services', 'Equipment', 'Subcontractor'),
    defaultValue: 'Raw Material',
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: 'India',
  },
  taxId: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'inv_suppliers',
  timestamps: true,
});

module.exports = InvSupplier;
