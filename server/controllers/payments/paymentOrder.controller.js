const { PaymentOrder } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/payments/payment-orders
exports.getAll = async (req, res) => {
  try {
    const orders = await PaymentOrder.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching payment orders:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/payments/payment-orders/:id
exports.getById = async (req, res) => {
  try {
    const order = await PaymentOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Payment Order not found' });
    res.json(order);
  } catch (error) {
    console.error('Error fetching payment order:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/payments/payment-orders
exports.create = async (req, res) => {
  try {
    const orderId = await generateDocId(PaymentOrder, 'PORD', 'orderId');
    const order = await PaymentOrder.create({
      ...req.body,
      orderId,
      status: req.body.status || 'Draft',
    });

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentOrder', action: 'create', data: order });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/payments/payment-orders/:id
exports.update = async (req, res) => {
  try {
    const order = await PaymentOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Payment Order not found' });
    await order.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentOrder', action: 'update', data: order });

    res.json(order);
  } catch (error) {
    console.error('Error updating payment order:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/payments/payment-orders/:id
exports.remove = async (req, res) => {
  try {
    const order = await PaymentOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Payment Order not found' });
    const id = order.id;
    await order.destroy();

    const io = req.app.get('io');
    if (io) io.emit('payments:update', { model: 'paymentOrder', action: 'delete', data: { id } });

    res.json({ message: 'Payment Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment order:', error);
    res.status(500).json({ error: error.message });
  }
};
