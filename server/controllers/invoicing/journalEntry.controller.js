const { JournalEntry, JournalEntryAccount, sequelize } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/invoicing/journal-entries
exports.getAll = async (req, res) => {
  try {
    const entries = await JournalEntry.findAll({
      include: [{ model: JournalEntryAccount }],
      order: [['createdAt', 'DESC']],
    });
    res.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/journal-entries/:id
exports.getById = async (req, res) => {
  try {
    const entry = await JournalEntry.findByPk(req.params.id, {
      include: [JournalEntryAccount],
    });
    if (!entry) return res.status(404).json({ error: 'Journal Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/journal-entries
exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { accounts = [], ...entryData } = req.body;

    // Double-entry validation: total debit must equal total credit
    const totalDebit = accounts.reduce((sum, a) => sum + (parseFloat(a.debit) || 0), 0);
    const totalCredit = accounts.reduce((sum, a) => sum + (parseFloat(a.credit) || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      await t.rollback();
      return res.status(400).json({
        error: `Total Debit (${totalDebit.toFixed(2)}) must equal Total Credit (${totalCredit.toFixed(2)})`,
      });
    }

    const entryId = await generateDocId(JournalEntry, 'JE', 'entryId');

    const entry = await JournalEntry.create({
      ...entryData,
      entryId,
      totalDebit,
      totalCredit,
      status: entryData.status || 'Draft',
    }, { transaction: t });

    if (accounts.length > 0) {
      const accountsToCreate = accounts.map(acc => ({
        ...acc,
        journalEntryId: entry.id,
        debit: parseFloat(acc.debit) || 0,
        credit: parseFloat(acc.credit) || 0,
      }));
      await JournalEntryAccount.bulkCreate(accountsToCreate, { transaction: t });
    }

    await t.commit();

    const fullEntry = await JournalEntry.findByPk(entry.id, {
      include: [JournalEntryAccount],
    });

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'journalEntry', action: 'create', data: fullEntry });

    res.status(201).json(fullEntry);
  } catch (error) {
    await t.rollback();
    console.error('Error creating journal entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/journal-entries/:id
exports.update = async (req, res) => {
  try {
    const entry = await JournalEntry.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Journal Entry not found' });
    await entry.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'journalEntry', action: 'update', data: entry });

    res.json(entry);
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/journal-entries/:id
exports.remove = async (req, res) => {
  try {
    const entry = await JournalEntry.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Journal Entry not found' });
    const id = entry.id;
    await entry.destroy(); // CASCADE deletes JournalEntryAccount rows

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'journalEntry', action: 'delete', data: { id } });

    res.json({ message: 'Journal Entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    res.status(500).json({ error: error.message });
  }
};
