const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Journal Entry line items — double-entry debit/credit rows.
 * CASCADE deleted when parent JournalEntry is deleted.
 */
const JournalEntryAccount = sequelize.define('JournalEntryAccount', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  journalEntryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'journal_entries', key: 'id' },
    onDelete: 'CASCADE',
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  debit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  credit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
  costCenter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'journal_entry_accounts',
  timestamps: false,
});

module.exports = JournalEntryAccount;
