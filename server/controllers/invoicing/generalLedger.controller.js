const { Op } = require('sequelize');
const { JournalEntryAccount, JournalEntry } = require('../../models');

// GET /api/invoicing/reports/general-ledger
// Query params: account, fromDate, toDate
exports.getLedger = async (req, res) => {
  try {
    const { account, fromDate, toDate } = req.query;

    const entryWhere = {};
    if (fromDate && toDate) {
      entryWhere.postingDate = { [Op.between]: [fromDate, toDate] };
    } else if (fromDate) {
      entryWhere.postingDate = { [Op.gte]: fromDate };
    } else if (toDate) {
      entryWhere.postingDate = { [Op.lte]: toDate };
    }

    const lineWhere = {};
    if (account) {
      lineWhere.account = account;
    }

    const journalLines = await JournalEntryAccount.findAll({
      where: lineWhere,
      include: [{
        model: JournalEntry,
        where: Object.keys(entryWhere).length > 0 ? entryWhere : undefined,
        required: true,
      }],
      order: [[JournalEntry, 'postingDate', 'ASC']],
    });

    // Build unified ledger format
    let runningBalance = 0;
    const ledger = journalLines.map(line => {
      const debit = parseFloat(line.debit || 0);
      const credit = parseFloat(line.credit || 0);
      runningBalance += debit - credit;
      return {
        date: line.JournalEntry.postingDate,
        account: line.account,
        voucherType: 'Journal Entry',
        voucherNo: line.JournalEntry.entryId,
        remarks: line.remarks || line.JournalEntry.userRemark || '',
        debit,
        credit,
        balance: runningBalance,
      };
    });

    res.json({ ledger, totalLines: ledger.length });
  } catch (error) {
    console.error('Error generating general ledger:', error);
    res.status(500).json({ error: error.message });
  }
};
