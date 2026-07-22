const { InvAccount } = require('../../models');

// GET /api/invoicing/reports/balance-sheet
exports.getBalanceSheet = async (req, res) => {
  try {
    const accounts = await InvAccount.findAll({
      order: [['accountName', 'ASC']],
    });

    const assets = accounts.filter(a => a.rootType === 'Assets');
    const liabilities = accounts.filter(a => a.rootType === 'Liabilities');
    const equity = accounts.filter(a => a.rootType === 'Equity');

    const totalAssets = assets.reduce((sum, a) => sum + parseFloat(a.balance || 0), 0);
    const totalLiabilities = liabilities.reduce((sum, a) => sum + parseFloat(a.balance || 0), 0);
    const totalEquity = equity.reduce((sum, a) => sum + parseFloat(a.balance || 0), 0);

    res.json({
      assets,
      liabilities,
      equity,
      totalAssets,
      totalLiabilities,
      totalEquity,
      // Assets = Liabilities + Equity (accounting equation)
      balanced: Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01,
    });
  } catch (error) {
    console.error('Error generating balance sheet:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/reports/profit-loss
exports.getProfitLoss = async (req, res) => {
  try {
    const accounts = await InvAccount.findAll({
      order: [['accountName', 'ASC']],
    });

    const income = accounts.filter(a => a.rootType === 'Income');
    const expenses = accounts.filter(a => a.rootType === 'Expenses');

    const totalIncome = income.reduce((sum, a) => sum + parseFloat(a.balance || 0), 0);
    const totalExpenses = expenses.reduce((sum, a) => sum + parseFloat(a.balance || 0), 0);
    const netProfit = totalIncome - totalExpenses;

    res.json({
      income,
      expenses,
      totalIncome,
      totalExpenses,
      netProfit,
      profitMargin: totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(2) : 0,
    });
  } catch (error) {
    console.error('Error generating profit & loss:', error);
    res.status(500).json({ error: error.message });
  }
};
