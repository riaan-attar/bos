const { Op } = require('sequelize');
const { InvCustomer, SalesInvoice } = require('../../models');

// GET /api/invoicing/reports/accounts-receivable
exports.getReport = async (req, res) => {
  try {
    const customers = await InvCustomer.findAll({
      where: { outstandingAmount: { [Op.gt]: 0 } },
      include: [{
        model: SalesInvoice,
        where: { outstandingAmount: { [Op.gt]: 0 } },
        required: false,
      }],
      order: [['name', 'ASC']],
    });

    const totalReceivable = customers.reduce(
      (sum, c) => sum + parseFloat(c.outstandingAmount || 0), 0
    );

    // Aging buckets (days past due date)
    const today = new Date();
    const aging = { '0-30': 0, '31-60': 0, '61-90': 0, '90+': 0 };

    customers.forEach(customer => {
      (customer.SalesInvoices || []).forEach(inv => {
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

    res.json({ totalReceivable, aging, customers });
  } catch (error) {
    console.error('Error generating accounts receivable report:', error);
    res.status(500).json({ error: error.message });
  }
};
