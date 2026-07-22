const express = require('express');
const router = express.Router();

const accountController = require('../controllers/invoicing/account.controller');
const customerController = require('../controllers/invoicing/customer.controller');
const supplierController = require('../controllers/invoicing/supplier.controller');
const salesInvoiceController = require('../controllers/invoicing/salesInvoice.controller');
const purchaseInvoiceController = require('../controllers/invoicing/purchaseInvoice.controller');
const creditNoteController = require('../controllers/invoicing/creditNote.controller');
const debitNoteController = require('../controllers/invoicing/debitNote.controller');
const journalEntryController = require('../controllers/invoicing/journalEntry.controller');
const accountsReceivableController = require('../controllers/invoicing/accountsReceivable.controller');
const accountsPayableController = require('../controllers/invoicing/accountsPayable.controller');
const generalLedgerController = require('../controllers/invoicing/generalLedger.controller');
const trialBalanceController = require('../controllers/invoicing/trialBalance.controller');
const financialReportsController = require('../controllers/invoicing/financialReports.controller');

// ─── Chart of Accounts ───────────────────────────────────────────
router.get('/accounts', accountController.getAll);
router.get('/accounts/:id', accountController.getById);
router.post('/accounts', accountController.create);
router.put('/accounts/:id', accountController.update);
router.delete('/accounts/:id', accountController.remove);

// ─── Customers ───────────────────────────────────────────────────
router.get('/customers', customerController.getAll);
router.get('/customers/:id', customerController.getById);
router.post('/customers', customerController.create);
router.put('/customers/:id', customerController.update);
router.delete('/customers/:id', customerController.remove);

// ─── Suppliers ───────────────────────────────────────────────────
router.get('/suppliers', supplierController.getAll);
router.get('/suppliers/:id', supplierController.getById);
router.post('/suppliers', supplierController.create);
router.put('/suppliers/:id', supplierController.update);
router.delete('/suppliers/:id', supplierController.remove);

// ─── Sales Invoices ──────────────────────────────────────────────
router.get('/sales-invoices', salesInvoiceController.getAll);
router.get('/sales-invoices/:id', salesInvoiceController.getById);
router.post('/sales-invoices', salesInvoiceController.create);
router.put('/sales-invoices/:id', salesInvoiceController.update);
router.delete('/sales-invoices/:id', salesInvoiceController.remove);

// ─── Purchase Invoices ───────────────────────────────────────────
router.get('/purchase-invoices', purchaseInvoiceController.getAll);
router.get('/purchase-invoices/:id', purchaseInvoiceController.getById);
router.post('/purchase-invoices', purchaseInvoiceController.create);
router.put('/purchase-invoices/:id', purchaseInvoiceController.update);
router.delete('/purchase-invoices/:id', purchaseInvoiceController.remove);

// ─── Credit Notes ────────────────────────────────────────────────
router.get('/credit-notes', creditNoteController.getAll);
router.get('/credit-notes/:id', creditNoteController.getById);
router.post('/credit-notes', creditNoteController.create);
router.put('/credit-notes/:id', creditNoteController.update);
router.delete('/credit-notes/:id', creditNoteController.remove);

// ─── Debit Notes ─────────────────────────────────────────────────
router.get('/debit-notes', debitNoteController.getAll);
router.get('/debit-notes/:id', debitNoteController.getById);
router.post('/debit-notes', debitNoteController.create);
router.put('/debit-notes/:id', debitNoteController.update);
router.delete('/debit-notes/:id', debitNoteController.remove);

// ─── Journal Entries ─────────────────────────────────────────────
router.get('/journal-entries', journalEntryController.getAll);
router.get('/journal-entries/:id', journalEntryController.getById);
router.post('/journal-entries', journalEntryController.create);
router.put('/journal-entries/:id', journalEntryController.update);
router.delete('/journal-entries/:id', journalEntryController.remove);

// ─── Reports ─────────────────────────────────────────────────────
router.get('/reports/accounts-receivable', accountsReceivableController.getReport);
router.get('/reports/accounts-payable', accountsPayableController.getReport);
router.get('/reports/general-ledger', generalLedgerController.getLedger);
router.get('/reports/trial-balance', trialBalanceController.getTrialBalance);
router.get('/reports/balance-sheet', financialReportsController.getBalanceSheet);
router.get('/reports/profit-loss', financialReportsController.getProfitLoss);

module.exports = router;
