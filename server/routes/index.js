/**
 * API Routes Index
 * Mounts all module routes.
 */
const express = require('express');
const router = express.Router();

// Import route modules
const crmRoutes = require('./crm.routes');
const projectsRoutes = require('./projects.routes');
const stockRoutes = require('./stock.routes');

// Mount routes
router.use('/crm', crmRoutes);
router.use('/projects', projectsRoutes);
router.use('/stock', stockRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'BOS API is running' });
});

module.exports = router;
