const { Op } = require('sequelize');
const { InvSupplier, PurchaseInvoice } = require('../../models');

// GET /api/invoicing/reports/accounts-payable
exports.getReport = async (req, res) => {
  try {
    const suppliers = await InvSupplier.findAll({
      where: { outstandingAmount: { [Op.gt]: 0 } },
      include: [{
        model: PurchaseInvoice,
        where: { outstandingAmount: { [Op.gt]: 0 } },
        required: false,
      }],
      order: [['name', 'ASC']],
    });

    const totalPayable = suppliers.reduce(
      (sum, s) => sum + parseFloat(s.outstandingAmount || 0), 0
    );

    // Aging buckets (days past due date)
    const today = new Date();
    const aging = { '0-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };

    suppliers.forEach(supplier => {
      (supplier.PurchaseInvoices || []).forEach(inv => {
        const daysDiff = Math.floor(
          (today - new Date(inv.dueDate)) / (1000 * 60 * 60 * 24)
        );
        const amt = parseFloat(inv.outstandingAmount || 0);
        if (daysDiff <= 30) aging['0-30'] += amt;
        else if (daysDiff <= 60) aging['31-60'] += amt;
        else if (daysDiff <= 90) aging['61-90'] += amt;
        else aging['90+'] += amt;
      });
    });

    res.json({ totalPayable, aging, suppliers });
  } catch (error) {
    console.error('Error generating accounts payable report:', error);
    res.status(500).json({ error: error.message });
  }
};
