const { RepostPaymentLedger } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/repost-payment-ledgers
exports.getAll = async (req, res) => {
  try {
    const items = await RepostPaymentLedger.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching repost payment ledgers:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/repost-payment-ledgers/:id
exports.getById = async (req, res) => {
  try {
    const item = await RepostPaymentLedger.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Repost Payment Ledger not found' });
    res.json(item);
  } catch (error) {
    console.error('Error fetching repost payment ledger:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/repost-payment-ledgers
exports.create = async (req, res) => {
  try {
    const repostId = await generateDocId(RepostPaymentLedger, 'RPL', 'repostId');
    const item = await RepostPaymentLedger.create({
      ...req.body,
      repostId,
      status: req.body.status || 'Queued',
    });

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'repostPaymentLedger', action: 'create', data: item });

    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating repost payment ledger:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/repost-payment-ledgers/:id
exports.update = async (req, res) => {
  try {
    const item = await RepostPaymentLedger.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Repost Payment Ledger not found' });
    await item.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'repostPaymentLedger', action: 'update', data: item });

    res.json(item);
  } catch (error) {
    console.error('Error updating repost payment ledger:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/repost-payment-ledgers/:id
exports.remove = async (req, res) => {
  try {
    const item = await RepostPaymentLedger.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Repost Payment Ledger not found' });
    const id = item.id;
    await item.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'repostPaymentLedger', action: 'delete', data: { id } });

    res.json({ message: 'Repost Payment Ledger deleted successfully' });
  } catch (error) {
    console.error('Error deleting repost payment ledger:', error);
    res.status(500).json({ error: error.message });
  }
};
