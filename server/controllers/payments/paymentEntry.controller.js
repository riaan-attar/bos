const { PaymentEntry, InvCustomer, InvSupplier, sequelize } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/payment-entries
exports.getAll = async (req, res) => {
  try {
    const entries = await PaymentEntry.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching payment entries:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/payment-entries/:id
exports.getById = async (req, res) => {
  try {
    const entry = await PaymentEntry.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Payment Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Error fetching payment entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/payment-entries
exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const paymentId = await generateDocId(PaymentEntry, 'PAY', 'paymentId');

    const payment = await PaymentEntry.create({
      ...req.body,
      paymentId,
      status: req.body.status || 'Draft',
    }, { transaction: t });

    // If submitted, update party outstanding amount
    if (payment.status === 'Submitted') {
      if (payment.partyType === 'Customer') {
        await InvCustomer.decrement('outstandingAmount', {
          by: parseFloat(payment.paidAmount),
          where: { name: payment.party },
          transaction: t,
        });
      } else if (payment.partyType === 'Supplier') {
        await InvSupplier.decrement('outstandingAmount', {
          by: parseFloat(payment.paidAmount),
          where: { name: payment.party },
          transaction: t,
        });
      }
    }

    await t.commit();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentEntry', action: 'create', data: payment });

    res.status(201).json(payment);
  } catch (error) {
    await t.rollback();
    console.error('Error creating payment entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/payment-entries/:id
exports.update = async (req, res) => {
  try {
    const entry = await PaymentEntry.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Payment Entry not found' });
    await entry.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentEntry', action: 'update', data: entry });

    res.json(entry);
  } catch (error) {
    console.error('Error updating payment entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/payment-entries/:id
exports.remove = async (req, res) => {
  try {
    const entry = await PaymentEntry.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Payment Entry not found' });
    const id = entry.id;
    await entry.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentEntry', action: 'delete', data: { id } });

    res.json({ message: 'Payment Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment entry:', error);
    res.status(500).json({ error: error.message });
  }
};
