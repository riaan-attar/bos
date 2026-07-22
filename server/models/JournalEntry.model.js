const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Journal Entry header — double-entry bookkeeping record.
 * Line items are in JournalEntryAccount (CASCADE delete).
 */
const JournalEntry = sequelize.define('JournalEntry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  entryId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  entryType: {
    type: DataTypes.ENUM(
      'Journal Entry',
      'Opening Entry',
      'Depreciation',
      'Bank Entry',
      'Cash Entry',
      'Credit Card Entry'
    ),
    defaultValue: 'Journal Entry',
  },
  postingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  totalDebit: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  totalCredit: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  },
  userRemark: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Submitted', 'Cancelled'),
    defaultValue: 'Draft',
  },
}, {
  tableName: 'journal_entries',
  timestamps: true,
});

module.exports = JournalEntry;
