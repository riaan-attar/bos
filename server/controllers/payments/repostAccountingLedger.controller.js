const { RepostAccountingLedger } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/repost-accounting-ledgers
exports.getAll = async (req, res) => {
  try {
    const items = await RepostAccountingLedger.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching repost accounting ledgers:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/repost-accounting-ledgers/:id
exports.getById = async (req, res) => {
  try {
    const item = await RepostAccountingLedger.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Repost Accounting Ledger not found' });
    res.json(item);
  } catch (error) {
    console.error('Error fetching repost accounting ledger:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/repost-accounting-ledgers
exports.create = async (req, res) => {
  try {
    const repostId = await generateDocId(RepostAccountingLedger, 'RAL', 'repostId');
    const item = await RepostAccountingLedger.create({
      ...req.body,
      repostId,
      status: req.body.status || 'Queued',
    });

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'repostAccountingLedger', action: 'create', data: item });

    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating repost accounting ledger:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/repost-accounting-ledgers/:id
exports.update = async (req, res) => {
  try {
    const item = await RepostAccountingLedger.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Repost Accounting Ledger not found' });
    await item.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'repostAccountingLedger', action: 'update', data: item });

    res.json(item);
  } catch (error) {
    console.error('Error updating repost accounting ledger:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/repost-accounting-ledgers/:id
exports.remove = async (req, res) => {
  try {
    const item = await RepostAccountingLedger.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Repost Accounting Ledger not found' });
    const id = item.id;
    await item.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'repostAccountingLedger', action: 'delete', data: { id } });

    res.json({ message: 'Repost Accounting Ledger deleted successfully' });
  } catch (error) {
    console.error('Error deleting repost accounting ledger:', error);
    res.status(500).json({ error: error.message });
  }
};
