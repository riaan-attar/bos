const { InvAccount } = require('../../models');
const generateDocId = require('../../utils/generateDocId');

// GET /api/invoicing/accounts
exports.getAll = async (req, res) => {
  try {
    const accounts = await InvAccount.findAll({
      order: [['rootType', 'ASC'], ['accountName', 'ASC']],
    });
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/invoicing/accounts/:id
exports.getById = async (req, res) => {
  try {
    const account = await InvAccount.findByPk(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/invoicing/accounts
exports.create = async (req, res) => {
  try {
    const account = await InvAccount.create(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'account', action: 'create', data: account });

    res.status(201).json(account);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/invoicing/accounts/:id
exports.update = async (req, res) => {
  try {
    const account = await InvAccount.findByPk(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    await account.update(req.body);

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'account', action: 'update', data: account });

    res.json(account);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/invoicing/accounts/:id
exports.remove = async (req, res) => {
  try {
    const account = await InvAccount.findByPk(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    const id = account.id;
    await account.destroy();

    const io = req.app.get('io');
    if (io) io.emit('invoicing:update', { model: 'account', action: 'delete', data: { id } });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: error.message });
  }
};
