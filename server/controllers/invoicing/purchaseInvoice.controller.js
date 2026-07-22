const { PurchaseInvoice, PurchaseInvoiceItem, InvSupplier, sequelize } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/invoicing/purchase-invoices
exports.getAll = async (req, res) => {
  try {
    const invoices = await PurchaseInvoice.findAll({
      include: [
        { model: PurchaseInvoiceItem },
        { model: InvSupplier, attributes: ['id', 'name', 'supplierId'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching purchase invoices:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/purchase-invoices/:id
exports.getById = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByPk(req.params.id, {
      include: [PurchaseInvoiceItem, InvSupplier],
    });
    if (!invoice) return res.status(404).json({ error: 'Purchase Invoice not found' });
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching purchase invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/purchase-invoices
exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items = [], ...invoiceData } = req.body;

    const invoiceId = await generateDocId(PurchaseInvoice, 'PINV', 'invoiceId');

    // Calculate totals from items
    const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.qty) * parseFloat(item.rate)), 0);
    const taxAmount = items.reduce(
      (sum, item) => sum + (parseFloat(item.qty) * parseFloat(item.rate) * (parseFloat(item.taxPercent) || 18) / 100),
      0
    );
    const totalAmount = subtotal + taxAmount;

    const invoice = await PurchaseInvoice.create({
      ...invoiceData,
      invoiceId,
      subtotal,
      taxAmount,
      totalAmount,
      outstandingAmount: invoiceData.outstandingAmount !== undefined ? invoiceData.outstandingAmount : totalAmount,
      status: invoiceData.status || 'Draft',
    }, { transaction: t });

    if (items.length > 0) {
      const itemsToCreate = items.map(item => ({
        ...item,
        purchaseInvoiceId: invoice.id,
        amount: parseFloat(item.qty) * parseFloat(item.rate),
      }));
      await PurchaseInvoiceItem.bulkCreate(itemsToCreate, { transaction: t });
    }

    // Update supplier outstanding amount when not a draft
    if (invoiceData.supplierId && invoiceData.status && invoiceData.status !== 'Draft') {
      await InvSupplier.increment('outstandingAmount', {
        by: totalAmount,
        where: { id: invoiceData.supplierId },
        transaction: t,
      });
    }

    await t.commit();

    const fullInvoice = await PurchaseInvoice.findByPk(invoice.id, {
      include: [PurchaseInvoiceItem, InvSupplier],
    });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'purchaseInvoice', action: 'create', data: fullInvoice });

    res.status(201).json(fullInvoice);
  } catch (error) {
    await t.rollback();
    console.error('Error creating purchase invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/purchase-invoices/:id
exports.update = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Purchase Invoice not found' });
    await invoice.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'purchaseInvoice', action: 'update', data: invoice });

    res.json(invoice);
  } catch (error) {
    console.error('Error updating purchase invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/purchase-invoices/:id
exports.remove = async (req, res) => {
  try {
    const invoice = await PurchaseInvoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Purchase Invoice not found' });
    const id = invoice.id;
    await invoice.destroy(); // CASCADE deletes items

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'purchaseInvoice', action: 'delete', data: { id } });

    res.json({ message: 'Purchase Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase invoice:', error);
    res.status(500).json({ error: error.message });
  }
};
