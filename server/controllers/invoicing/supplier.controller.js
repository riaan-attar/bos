const { InvSupplier } = require('../../models');

// Helper to generate supplier ID
const generateSupplierId = async () => {
  try {
    const latest = await InvSupplier.findOne({ order: [['id', 'DESC']] });
    if (!latest) return 'SUPP-INV-001';
    const parts = latest.supplierId.split('-');
    const lastNum = parseInt(parts[parts.length - 1], 10);
    if (isNaN(lastNum)) return 'SUPP-INV-001';
    return `SUPP-INV-${String(lastNum + 1).padStart(3, '0')}`;
  } catch {
    return 'SUPP-INV-001';
  }
};

// GET /api/invoicing/suppliers
exports.getAll = async (req, res) => {
  try {
    const suppliers = await InvSupplier.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/suppliers/:id
exports.getById = async (req, res) => {
  try {
    const supplier = await InvSupplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    res.json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/suppliers
exports.create = async (req, res) => {
  try {
    const supplierId = req.body.supplierId || await generateSupplierId();
    const supplier = await InvSupplier.create({ ...req.body, supplierId });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'supplier', action: 'create', data: supplier });

    res.status(201).json(supplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/suppliers/:id
exports.update = async (req, res) => {
  try {
    const supplier = await InvSupplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    await supplier.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'supplier', action: 'update', data: supplier });

    res.json(supplier);
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/suppliers/:id
exports.remove = async (req, res) => {
  try {
    const supplier = await InvSupplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });
    const id = supplier.id;
    await supplier.destroy();

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'supplier', action: 'delete', data: { id } });

    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ error: error.message });
  }
};
