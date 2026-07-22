const { PaymentRequest } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/payment-requests
exports.getAll = async (req, res) => {
  try {
    const requests = await PaymentRequest.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching payment requests:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/payment-requests/:id
exports.getById = async (req, res) => {
  try {
    const request = await PaymentRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ error: 'Payment Request not found' });
    res.json(request);
  } catch (error) {
    console.error('Error fetching payment request:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/payment-requests
exports.create = async (req, res) => {
  try {
    const requestId = await generateDocId(PaymentRequest, 'PREQ', 'requestId');
    const request = await PaymentRequest.create({
      ...req.body,
      requestId,
      status: req.body.status || 'Draft',
    });

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentRequest', action: 'create', data: request });

    res.status(201).json(request);
  } catch (error) {
    console.error('Error creating payment request:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/payment-requests/:id
exports.update = async (req, res) => {
  try {
    const request = await PaymentRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ error: 'Payment Request not found' });
    await request.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentRequest', action: 'update', data: request });

    res.json(request);
  } catch (error) {
    console.error('Error updating payment request:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/payment-requests/:id
exports.remove = async (req, res) => {
  try {
    const request = await PaymentRequest.findByPk(req.params.id);
    if (!request) return res.status(404).json({ error: 'Payment Request not found' });
    const id = request.id;
    await request.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentRequest', action: 'delete', data: { id } });

    res.json({ message: 'Payment Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment request:', error);
    res.status(500).json({ error: error.message });
  }
};
