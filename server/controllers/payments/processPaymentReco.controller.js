const { ProcessPaymentReco } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/process-payment-reconciliations
exports.getAll = async (req, res) => {
  try {
    const items = await ProcessPaymentReco.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching process payment reconciliations:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/process-payment-reconciliations/:id
exports.getById = async (req, res) => {
  try {
    const item = await ProcessPaymentReco.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Process Payment Reconciliation not found' });
    res.json(item);
  } catch (error) {
    console.error('Error fetching process payment reconciliation:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/process-payment-reconciliations
exports.create = async (req, res) => {
  try {
    const processId = await generateDocId(ProcessPaymentReco, 'PPR', 'processId');
    const item = await ProcessPaymentReco.create({
      ...req.body,
      processId,
      status: req.body.status || 'Draft',
    });

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'processPaymentReco', action: 'create', data: item });

    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating process payment reconciliation:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/process-payment-reconciliations/:id
exports.update = async (req, res) => {
  try {
    const item = await ProcessPaymentReco.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Process Payment Reconciliation not found' });
    await item.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'processPaymentReco', action: 'update', data: item });

    res.json(item);
  } catch (error) {
    console.error('Error updating process payment reconciliation:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/process-payment-reconciliations/:id
exports.remove = async (req, res) => {
  try {
    const item = await ProcessPaymentReco.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Process Payment Reconciliation not found' });
    const id = item.id;
    await item.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'processPaymentReco', action: 'delete', data: { id } });

    res.json({ message: 'Process Payment Reconciliation deleted successfully' });
  } catch (error) {
    console.error('Error deleting process payment reconciliation:', error);
    res.status(500).json({ error: error.message });
  }
};
