const { UnreconcilePayment } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/unreconcile-payments
exports.getAll = async (req, res) => {
  try {
    const items = await UnreconcilePayment.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching unreconcile payments:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/unreconcile-payments/:id
exports.getById = async (req, res) => {
  try {
    const item = await UnreconcilePayment.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Unreconcile Payment not found' });
    res.json(item);
  } catch (error) {
    console.error('Error fetching unreconcile payment:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/unreconcile-payments
exports.create = async (req, res) => {
  try {
    const unreconcileId = await generateDocId(UnreconcilePayment, 'UNREC', 'unreconcileId');
    const item = await UnreconcilePayment.create({
      ...req.body,
      unreconcileId,
      status: req.body.status || 'Draft',
    });

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'unreconcilePayment', action: 'create', data: item });

    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating unreconcile payment:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/unreconcile-payments/:id
exports.update = async (req, res) => {
  try {
    const item = await UnreconcilePayment.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Unreconcile Payment not found' });
    await item.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'unreconcilePayment', action: 'update', data: item });

    res.json(item);
  } catch (error) {
    console.error('Error updating unreconcile payment:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/unreconcile-payments/:id
exports.remove = async (req, res) => {
  try {
    const item = await UnreconcilePayment.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Unreconcile Payment not found' });
    const id = item.id;
    await item.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'unreconcilePayment', action: 'delete', data: { id } });

    res.json({ message: 'Unreconcile Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting unreconcile payment:', error);
    res.status(500).json({ error: error.message });
  }
};
