const { InvAccount, JournalEntryAccount } = require('../../models');

// GET /api/invoicing/reports/trial-balance
exports.getTrialBalance = async (req, res) => {
  try {
    const accounts = await InvAccount.findAll({
      order: [['rootType', 'ASC'], ['accountName', 'ASC']],
    });

    // For each account, sum debits and credits from journal entry lines
    const trialBalance = await Promise.all(
      accounts.map(async (acc) => {
        const debits = parseFloat(
          await JournalEntryAccount.sum('debit', { where: { account: acc.accountName } }) || 0
        );
        const credits = parseFloat(
          await JournalEntryAccount.sum('credit', { where: { account: acc.accountName } }) || 0
        );

        return {
          account: acc.accountName,
          accountType: acc.accountType,
          rootType: acc.rootType,
          openingDebit: debits,
          openingCredit: credits,
          closingDebit: debits > credits ? debits - credits : 0,
          closingCredit: credits > debits ? credits - debits : 0,
        };
      })
    );

    const totalDebit = trialBalance.reduce((sum, r) => sum + r.closingDebit, 0);
    const totalCredit = trialBalance.reduce((sum, r) => sum + r.closingCredit, 0);

    res.json({ trialBalance, totalDebit, totalCredit });
  } catch (error) {
    console.error('Error generating trial balance:', error);
    res.status(500).json({ error: error.message });
  }
};
