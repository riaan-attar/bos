/**
 * Payments Seeder
 * Populates demo data for: Payment Entries, Payment Requests, Payment Orders,
 * and initializes empty collections for Unreconcile, Process Reco, Repost Ledgers.
 *
 * Run: node seeders/payments.seeder.js
 */
const {
  sequelize,
  PaymentEntry,
  PaymentRequest,
  PaymentOrder,
  UnreconcilePayment,
  ProcessPaymentReco,
  RepostAccountingLedger,
  RepostPaymentLedger,
} = require('../models');

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    // ── Clear existing data ──────────────────────────────────────
    console.log('Clearing existing payments data...');
    await UnreconcilePayment.destroy({ where: {} });
    await ProcessPaymentReco.destroy({ where: {} });
    await RepostAccountingLedger.destroy({ where: {} });
    await RepostPaymentLedger.destroy({ where: {} });
    await PaymentEntry.destroy({ where: {} });
    await PaymentRequest.destroy({ where: {} });
    await PaymentOrder.destroy({ where: {} });

    // ── Payment Entries ──────────────────────────────────────────
    console.log('Seeding Payment Entries...');
    await PaymentEntry.bulkCreate([
      {
        paymentId: 'PAY-2026-00001',
        paymentType: 'Receive',
        postingDate: '2026-01-20',
        partyType: 'Customer',
        party: 'Sunita Bhosale',
        paidAmount: 250500,
        modeOfPayment: 'Bank Transfer',
        accountPaidFrom: 'Accounts Receivable',
        accountPaidTo: 'Bank - Avenue Builders',
        referenceNo: 'NEFT2026012001',
        remarks: 'Full payment for SINV-2026-00003',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00002',
        paymentType: 'Receive',
        postingDate: '2026-02-10',
        partyType: 'Customer',
        party: 'Vikram Industries',
        paidAmount: 236250,
        modeOfPayment: 'RTGS',
        accountPaidFrom: 'Accounts Receivable',
        accountPaidTo: 'Bank - Avenue Builders',
        referenceNo: 'RTGS2026021001',
        remarks: 'Partial payment — SINV-2026-00002',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00003',
        paymentType: 'Pay',
        postingDate: '2026-02-15',
        partyType: 'Supplier',
        party: 'Kajaria Ceramics',
        paidAmount: 198000,
        modeOfPayment: 'NEFT',
        accountPaidFrom: 'Bank - Avenue Builders',
        accountPaidTo: 'Accounts Payable',
        referenceNo: 'NEFT2026021501',
        remarks: 'Full payment — PINV-2026-00003',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00004',
        paymentType: 'Receive',
        postingDate: '2026-03-01',
        partyType: 'Customer',
        party: 'Rajesh Sharma',
        paidAmount: 787500,
        modeOfPayment: 'Cheque',
        accountPaidFrom: 'Accounts Receivable',
        accountPaidTo: 'Bank - Avenue Builders',
        referenceNo: 'CHQ 004521',
        remarks: 'Partial payment — SINV-2026-00005',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00005',
        paymentType: 'Pay',
        postingDate: '2026-03-10',
        partyType: 'Supplier',
        party: 'Local Sand Supplier',
        paidAmount: 47250,
        modeOfPayment: 'Cash',
        accountPaidFrom: 'Cash',
        accountPaidTo: 'Accounts Payable',
        referenceNo: null,
        remarks: 'Cash payment — PINV-2026-00006',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00006',
        paymentType: 'Pay',
        postingDate: '2026-03-20',
        partyType: 'Supplier',
        party: 'Tata Steel',
        paidAmount: 336000,
        modeOfPayment: 'RTGS',
        accountPaidFrom: 'Bank - Avenue Builders',
        accountPaidTo: 'Accounts Payable',
        referenceNo: 'RTGS2026032001',
        remarks: 'Partial payment — PINV-2026-00002',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00007',
        paymentType: 'Internal Transfer',
        postingDate: '2026-04-01',
        partyType: null,
        party: 'Internal',
        paidAmount: 500000,
        modeOfPayment: 'Bank Transfer',
        accountPaidFrom: 'Bank - Avenue Builders',
        accountPaidTo: 'Cash',
        referenceNo: 'INT2026040101',
        remarks: 'Site petty cash replenishment — Q2 2026',
        status: 'Submitted',
      },
      {
        paymentId: 'PAY-2026-00008',
        paymentType: 'Receive',
        postingDate: '2026-04-15',
        partyType: 'Customer',
        party: 'Mohan Kulkarni',
        paidAmount: 50000,
        modeOfPayment: 'UPI',
        accountPaidFrom: 'Accounts Receivable',
        accountPaidTo: 'Bank - Avenue Builders',
        referenceNo: 'UPI2026041501',
        remarks: 'Advance against SINV-2026-00006',
        status: 'Draft',
      },
    ]);
    console.log('  ✓ 8 payment entries seeded');

    // ── Payment Requests ─────────────────────────────────────────
    console.log('Seeding Payment Requests...');
    await PaymentRequest.bulkCreate([
      {
        requestId: 'PREQ-2026-00001',
        referenceDoctype: 'Purchase Invoice',
        referenceName: 'PINV-2026-00001',
        amount: 385000,
        status: 'Requested',
      },
      {
        requestId: 'PREQ-2026-00002',
        referenceDoctype: 'Purchase Invoice',
        referenceName: 'PINV-2026-00004',
        amount: 94500,
        status: 'Requested',
      },
      {
        requestId: 'PREQ-2026-00003',
        referenceDoctype: 'Purchase Invoice',
        referenceName: 'PINV-2026-00005',
        amount: 126000,
        status: 'Draft',
      },
    ]);
    console.log('  ✓ 3 payment requests seeded');

    // ── Payment Orders ────────────────────────────────────────────
    console.log('Seeding Payment Orders...');
    await PaymentOrder.bulkCreate([
      {
        orderId: 'PORD-2026-00001',
        account: 'Bank - Avenue Builders',
        amount: 385000,
        date: '2026-04-20',
        status: 'Submitted',
      },
      {
        orderId: 'PORD-2026-00002',
        account: 'Bank - Avenue Builders',
        amount: 220500,
        date: '2026-04-25',
        status: 'Draft',
      },
      {
        orderId: 'PORD-2026-00003',
        account: 'Cash',
        amount: 47250,
        date: '2026-04-28',
        status: 'Draft',
      },
    ]);
    console.log('  ✓ 3 payment orders seeded');

    // Unreconcile Payments, Process Payment Reco,
    // Repost Ledgers left empty (matching frontend fallback empty state)
    console.log('  ✓ Unreconcile payments: empty (no records)');
    console.log('  ✓ Process payment reconciliations: empty (no records)');
    console.log('  ✓ Repost accounting ledgers: empty (no records)');
    console.log('  ✓ Repost payment ledgers: empty (no records)');

    console.log('\n✅ Payments seeder completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Payments seeder failed:', error);
    process.exit(1);
  }
};

seed();
