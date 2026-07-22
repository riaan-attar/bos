const express = require('express');
const router = express.Router();

const paymentEntryController = require('../controllers/payments/paymentEntry.controller');
const paymentRequestController = require('../controllers/payments/paymentRequest.controller');
const paymentOrderController = require('../controllers/payments/paymentOrder.controller');
const unreconcilePaymentController = require('../controllers/payments/unreconcilePayment.controller');
const processPaymentRecoController = require('../controllers/payments/processPaymentReco.controller');
const repostAccountingLedgerController = require('../controllers/payments/repostAccountingLedger.controller');
const repostPaymentLedgerController = require('../controllers/payments/repostPaymentLedger.controller');

// ─── Payment Entries ─────────────────────────────────────────────
router.get('/payment-entries', paymentEntryController.getAll);
router.get('/payment-entries/:id', paymentEntryController.getById);
router.post('/payment-entries', paymentEntryController.create);
router.put('/payment-entries/:id', paymentEntryController.update);
router.delete('/payment-entries/:id', paymentEntryController.remove);

// ─── Payment Requests ────────────────────────────────────────────
router.get('/payment-requests', paymentRequestController.getAll);
router.get('/payment-requests/:id', paymentRequestController.getById);
router.post('/payment-requests', paymentRequestController.create);
router.put('/payment-requests/:id', paymentRequestController.update);
router.delete('/payment-requests/:id', paymentRequestController.remove);

// ─── Payment Orders ──────────────────────────────────────────────
router.get('/payment-orders', paymentOrderController.getAll);
router.get('/payment-orders/:id', paymentOrderController.getById);
router.post('/payment-orders', paymentOrderController.create);
router.put('/payment-orders/:id', paymentOrderController.update);
router.delete('/payment-orders/:id', paymentOrderController.remove);

// ─── Unreconcile Payments ────────────────────────────────────────
router.get('/unreconcile-payments', unreconcilePaymentController.getAll);
router.get('/unreconcile-payments/:id', unreconcilePaymentController.getById);
router.post('/unreconcile-payments', unreconcilePaymentController.create);
router.put('/unreconcile-payments/:id', unreconcilePaymentController.update);
router.delete('/unreconcile-payments/:id', unreconcilePaymentController.remove);

// ─── Process Payment Reconciliations ────────────────────────────
router.get('/process-payment-reconciliations', processPaymentRecoController.getAll);
router.get('/process-payment-reconciliations/:id', processPaymentRecoController.getById);
router.post('/process-payment-reconciliations', processPaymentRecoController.create);
router.put('/process-payment-reconciliations/:id', processPaymentRecoController.update);
router.delete('/process-payment-reconciliations/:id', processPaymentRecoController.remove);

// ─── Repost Accounting Ledgers ───────────────────────────────────
router.get('/repost-accounting-ledgers', repostAccountingLedgerController.getAll);
router.get('/repost-accounting-ledgers/:id', repostAccountingLedgerController.getById);
router.post('/repost-accounting-ledgers', repostAccountingLedgerController.create);
router.put('/repost-accounting-ledgers/:id', repostAccountingLedgerController.update);
router.delete('/repost-accounting-ledgers/:id', repostAccountingLedgerController.remove);

// ─── Repost Payment Ledgers ──────────────────────────────────────
router.get('/repost-payment-ledgers', repostPaymentLedgerController.getAll);
router.get('/repost-payment-ledgers/:id', repostPaymentLedgerController.getById);
router.post('/repost-payment-ledgers', repostPaymentLedgerController.create);
router.put('/repost-payment-ledgers/:id', repostPaymentLedgerController.update);
router.delete('/repost-payment-ledgers/:id', repostPaymentLedgerController.remove);

module.exports = router;
