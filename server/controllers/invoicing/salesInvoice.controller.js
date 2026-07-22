const { SalesInvoice, SalesInvoiceItem, InvCustomer, sequelize } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/invoicing/sales-invoices
exports.getAll = async (req, res) => {
  try {
    const invoices = await SalesInvoice.findAll({
      include: [
        { model: SalesInvoiceItem },
        { model: InvCustomer, attributes: ['id', 'name', 'customerId'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching sales invoices:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/sales-invoices/:id
exports.getById = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findByPk(req.params.id, {
      include: [SalesInvoiceItem, InvCustomer],
    });
    if (!invoice) return res.status(404).json({ error: 'Sales Invoice not found' });
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching sales invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/sales-invoices
exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { items = [], ...invoiceData } = req.body;

    const invoiceId = await generateDocId(SalesInvoice, 'SINV', 'invoiceId');

    // Calculate totals from items
    const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.qty) * parseFloat(item.rate)), 0);
    const taxAmount = items.reduce(
      (sum, item) => sum + (parseFloat(item.qty) * parseFloat(item.rate) * (parseFloat(item.taxPercent) || 18) / 100),
      0
    );
    const totalAmount = subtotal + taxAmount;

    const invoice = await SalesInvoice.create({
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
        salesInvoiceId: invoice.id,
        amount: parseFloat(item.qty) * parseFloat(item.rate),
      }));
      await SalesInvoiceItem.bulkCreate(itemsToCreate, { transaction: t });
    }

    // Update customer outstanding amount when not a draft
    if (invoiceData.customerId && invoiceData.status && invoiceData.status !== 'Draft') {
      await InvCustomer.increment('outstandingAmount', {
        by: totalAmount,
        where: { id: invoiceData.customerId },
        transaction: t,
      });
    }

    await t.commit();

    const fullInvoice = await SalesInvoice.findByPk(invoice.id, {
      include: [SalesInvoiceItem, InvCustomer],
    });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'salesInvoice', action: 'create', data: fullInvoice });

    res.status(201).json(fullInvoice);
  } catch (error) {
    await t.rollback();
    console.error('Error creating sales invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/sales-invoices/:id
exports.update = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Sales Invoice not found' });
    await invoice.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'salesInvoice', action: 'update', data: invoice });

    res.json(invoice);
  } catch (error) {
    console.error('Error updating sales invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/sales-invoices/:id
exports.remove = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findByPk(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Sales Invoice not found' });
    const id = invoice.id;
    await invoice.destroy(); // CASCADE deletes items

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'salesInvoice', action: 'delete', data: { id } });

    res.json({ message: 'Sales Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting sales invoice:', error);
    res.status(500).json({ error: error.message });
  }
};
