const { CreditNote, InvCustomer } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/invoicing/credit-notes
exports.getAll = async (req, res) => {
  try {
    const notes = await CreditNote.findAll({
      include: [{ model: InvCustomer, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching credit notes:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/credit-notes/:id
exports.getById = async (req, res) => {
  try {
    const note = await CreditNote.findByPk(req.params.id, {
      include: [InvCustomer],
    });
    if (!note) return res.status(404).json({ error: 'Credit Note not found' });
    res.json(note);
  } catch (error) {
    console.error('Error fetching credit note:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/credit-notes
exports.create = async (req, res) => {
  try {
    const creditNoteId = await generateDocId(CreditNote, 'CRN', 'creditNoteId');
    const note = await CreditNote.create({
      ...req.body,
      creditNoteId,
      status: req.body.status || 'Draft',
    });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'creditNote', action: 'create', data: note });

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating credit note:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/credit-notes/:id
exports.update = async (req, res) => {
  try {
    const note = await CreditNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Credit Note not found' });
    await note.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'creditNote', action: 'update', data: note });

    res.json(note);
  } catch (error) {
    console.error('Error updating credit note:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/credit-notes/:id
exports.remove = async (req, res) => {
  try {
    const note = await CreditNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Credit Note not found' });
    const id = note.id;
    await note.destroy();

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'creditNote', action: 'delete', data: { id } });

    res.json({ message: 'Credit Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting credit note:', error);
    res.status(500).json({ error: error.message });
  }
};
