const { InvCustomer } = require('../../models');

// Helper to generate customer ID
const generateCustomerId = async () => {
  try {
    const latest = await InvCustomer.findOne({ order: [['id', 'DESC']] });
    if (!latest) return 'CUST-INV-001';
    const parts = latest.customerId.split('-');
    const lastNum = parseInt(parts[parts.length - 1], 10);
    if (isNaN(lastNum)) return 'CUST-INV-001';
    return `CUST-INV-${String(lastNum + 1).padStart(3, '0')}`;
  } catch {
    return 'CUST-INV-001';
  }
};

// GET /api/invoicing/customers
exports.getAll = async (req, res) => {
  try {
    const customers = await InvCustomer.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/customers/:id
exports.getById = async (req, res) => {
  try {
    const customer = await InvCustomer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/customers
exports.create = async (req, res) => {
  try {
    const customerId = req.body.customerId || await generateCustomerId();
    const customer = await InvCustomer.create({ ...req.body, customerId });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'customer', action: 'create', data: customer });

    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/customers/:id
exports.update = async (req, res) => {
  try {
    const customer = await InvCustomer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    await customer.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'customer', action: 'update', data: customer });

    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/customers/:id
exports.remove = async (req, res) => {
  try {
    const customer = await InvCustomer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    const id = customer.id;
    await customer.destroy();

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'customer', action: 'delete', data: { id } });

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: error.message });
  }
};
