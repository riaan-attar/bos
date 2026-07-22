const { DebitNote, InvSupplier } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/invoicing/debit-notes
exports.getAll = async (req, res) => {
  try {
    const notes = await DebitNote.findAll({
      include: [{ model: InvSupplier, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching debit notes:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/debit-notes/:id
exports.getById = async (req, res) => {
  try {
    const note = await DebitNote.findByPk(req.params.id, {
      include: [InvSupplier],
    });
    if (!note) return res.status(404).json({ error: 'Debit Note not found' });
    res.json(note);
  } catch (error) {
    console.error('Error fetching debit note:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/debit-notes
exports.create = async (req, res) => {
  try {
    const debitNoteId = await generateDocId(DebitNote, 'DBN', 'debitNoteId');
    const note = await DebitNote.create({
      ...req.body,
      debitNoteId,
      status: req.body.status || 'Draft',
    });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'debitNote', action: 'create', data: note });

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating debit note:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/debit-notes/:id
exports.update = async (req, res) => {
  try {
    const note = await DebitNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Debit Note not found' });
    await note.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'debitNote', action: 'update', data: note });

    res.json(note);
  } catch (error) {
    console.error('Error updating debit note:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/debit-notes/:id
exports.remove = async (req, res) => {
  try {
    const note = await DebitNote.findByPk(req.params.id);
    if (!note) return res.status(404).json({ error: 'Debit Note not found' });
    const id = note.id;
    await note.destroy();

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'debitNote', action: 'delete', data: { id } });

    res.json({ message: 'Debit Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting debit note:', error);
    res.status(500).json({ error: error.message });
  }
};
