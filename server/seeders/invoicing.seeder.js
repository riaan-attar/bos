/**
 * Invoicing Seeder
 * Populates demo data for: Chart of Accounts, Customers, Suppliers,
 * Sales Invoices, Purchase Invoices, Credit Notes, Debit Notes, Journal Entries.
 *
 * Run: node seeders/invoicing.seeder.js
 */
const {
  sequelize,
  InvAccount,
  InvCustomer,
  InvSupplier,
  SalesInvoice,
  SalesInvoiceItem,
  PurchaseInvoice,
  PurchaseInvoiceItem,
  CreditNote,
  DebitNote,
  JournalEntry,
  JournalEntryAccount,
} = require('../models');

const seed = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    // ── Clear existing data (order matters for FK constraints) ──
    console.log('Clearing existing invoicing data...');
    await JournalEntryAccount.destroy({ where: {} });
    await JournalEntry.destroy({ where: {} });
    await SalesInvoiceItem.destroy({ where: {} });
    await SalesInvoice.destroy({ where: {} });
    await PurchaseInvoiceItem.destroy({ where: {} });
    await PurchaseInvoice.destroy({ where: {} });
    await CreditNote.destroy({ where: {} });
    await DebitNote.destroy({ where: {} });
    await InvAccount.destroy({ where: {} });
    await InvCustomer.destroy({ where: {} });
    await InvSupplier.destroy({ where: {} });

    // ── Chart of Accounts ────────────────────────────────────────
    console.log('Seeding Chart of Accounts...');
    const accounts = await InvAccount.bulkCreate([
      // Assets
      { accountName: 'Current Assets', accountType: 'Asset', rootType: 'Assets', isGroup: true, balance: 0 },
      { accountName: 'Cash', accountType: 'Asset', parentAccount: 'Current Assets', rootType: 'Assets', balance: 1250000 },
      { accountName: 'Bank - Avenue Builders', accountType: 'Asset', parentAccount: 'Current Assets', rootType: 'Assets', balance: 4850000 },
      { accountName: 'Accounts Receivable', accountType: 'Asset', parentAccount: 'Current Assets', rootType: 'Assets', balance: 2340000 },
      { accountName: 'Fixed Assets', accountType: 'Asset', rootType: 'Assets', isGroup: true, balance: 0 },
      { accountName: 'Land', accountType: 'Asset', parentAccount: 'Fixed Assets', rootType: 'Assets', balance: 15000000 },
      { accountName: 'Building & Construction', accountType: 'Asset', parentAccount: 'Fixed Assets', rootType: 'Assets', balance: 8500000 },
      { accountName: 'Equipment & Machinery', accountType: 'Asset', parentAccount: 'Fixed Assets', rootType: 'Assets', balance: 3200000 },
      // Liabilities
      { accountName: 'Current Liabilities', accountType: 'Liability', rootType: 'Liabilities', isGroup: true, balance: 0 },
      { accountName: 'Accounts Payable', accountType: 'Liability', parentAccount: 'Current Liabilities', rootType: 'Liabilities', balance: 1870000 },
      { accountName: 'Taxes Payable', accountType: 'Liability', parentAccount: 'Current Liabilities', rootType: 'Liabilities', balance: 425000 },
      { accountName: 'Long-Term Liabilities', accountType: 'Liability', rootType: 'Liabilities', isGroup: true, balance: 0 },
      { accountName: 'Bank Loan', accountType: 'Liability', parentAccount: 'Long-Term Liabilities', rootType: 'Liabilities', balance: 12000000 },
      // Equity
      { accountName: 'Equity', accountType: 'Equity', rootType: 'Equity', isGroup: true, balance: 0 },
      { accountName: 'Share Capital', accountType: 'Equity', parentAccount: 'Equity', rootType: 'Equity', balance: 5000000 },
      { accountName: 'Retained Earnings', accountType: 'Equity', parentAccount: 'Equity', rootType: 'Equity', balance: 16745000 },
      // Income
      { accountName: 'Revenue', accountType: 'Income', rootType: 'Income', isGroup: true, balance: 0 },
      { accountName: 'Sales Revenue', accountType: 'Income', parentAccount: 'Revenue', rootType: 'Income', balance: 8750000 },
      { accountName: 'Service Income', accountType: 'Income', parentAccount: 'Revenue', rootType: 'Income', balance: 1250000 },
      { accountName: 'Other Income', accountType: 'Income', parentAccount: 'Revenue', rootType: 'Income', balance: 320000 },
      // Expenses
      { accountName: 'Expenses', accountType: 'Expense', rootType: 'Expenses', isGroup: true, balance: 0 },
      { accountName: 'Cost of Materials', accountType: 'Expense', parentAccount: 'Expenses', rootType: 'Expenses', balance: 4200000 },
      { accountName: 'Labour Charges', accountType: 'Expense', parentAccount: 'Expenses', rootType: 'Expenses', balance: 1850000 },
      { accountName: 'Administrative Expenses', accountType: 'Expense', parentAccount: 'Expenses', rootType: 'Expenses', balance: 620000 },
      { accountName: 'Depreciation', accountType: 'Expense', parentAccount: 'Expenses', rootType: 'Expenses', balance: 480000 },
      { accountName: 'Interest Expense', accountType: 'Expense', parentAccount: 'Expenses', rootType: 'Expenses', balance: 960000 },
    ]);
    console.log(`  ✓ ${accounts.length} accounts seeded`);

    // ── Customers ────────────────────────────────────────────────
    console.log('Seeding Customers...');
    const customers = await InvCustomer.bulkCreate([
      {
        customerId: 'CUST-INV-001',
        name: 'Mohan Kulkarni',
        customerGroup: 'Individual',
        territory: 'Nashik',
        taxId: 'ABCPK1234D',
        creditLimit: 500000,
        outstandingAmount: 189000,
        email: 'mohan.kulkarni@email.com',
        phone: '9876543210',
        address: '12, Panchvati, Nashik - 422003',
        status: 'Active',
      },
      {
        customerId: 'CUST-INV-002',
        name: 'Vikram Industries',
        customerGroup: 'Company',
        territory: 'Mumbai',
        taxId: 'GSTIN27VIKRM0001Z3',
        creditLimit: 2000000,
        outstandingAmount: 472500,
        email: 'accounts@vikramindustries.com',
        phone: '9123456780',
        address: 'Plot 45, MIDC, Thane - 400601',
        status: 'Active',
      },
      {
        customerId: 'CUST-INV-003',
        name: 'Sunita Bhosale',
        customerGroup: 'Individual',
        territory: 'Pune',
        taxId: 'BQTPS5678H',
        creditLimit: 300000,
        outstandingAmount: 0,
        email: 'sunita.bhosale@gmail.com',
        phone: '9845671230',
        address: '78, Kothrud, Pune - 411038',
        status: 'Active',
      },
      {
        customerId: 'CUST-INV-004',
        name: 'Anita Desai',
        customerGroup: 'Investor',
        territory: 'Nashik',
        taxId: 'CKRPA9012F',
        creditLimit: 1000000,
        outstandingAmount: 945000,
        email: 'anita.desai@outlook.com',
        phone: '9765432100',
        address: '3, Gangapur Road, Nashik - 422013',
        status: 'Active',
      },
      {
        customerId: 'CUST-INV-005',
        name: 'Rajesh Sharma',
        customerGroup: 'Builder',
        territory: 'Aurangabad',
        taxId: 'DLYRS3456G',
        creditLimit: 5000000,
        outstandingAmount: 1575000,
        email: 'rajesh.sharma@rsconstruction.com',
        phone: '9654321080',
        address: 'RS Construction, CIDCO, Aurangabad - 431003',
        status: 'Active',
      },
    ]);
    console.log(`  ✓ ${customers.length} customers seeded`);

    // ── Suppliers ────────────────────────────────────────────────
    console.log('Seeding Suppliers...');
    const suppliers = await InvSupplier.bulkCreate([
      {
        supplierId: 'SUPP-INV-001',
        name: 'Shree Cement Ltd',
        supplierGroup: 'Raw Material',
        country: 'India',
        taxId: 'GSTIN08SHREE0001C1',
        outstandingAmount: 385000,
        email: 'supply@shreecement.com',
        phone: '1800112233',
        address: 'Bangur Nagar, Beawar, Rajasthan - 305901',
        status: 'Active',
      },
      {
        supplierId: 'SUPP-INV-002',
        name: 'Tata Steel',
        supplierGroup: 'Raw Material',
        country: 'India',
        taxId: 'GSTIN33TATAST0001T2',
        outstandingAmount: 672000,
        email: 'vendors@tatasteel.com',
        phone: '18002093636',
        address: 'Bombay House, Homi Mody Street, Mumbai - 400001',
        status: 'Active',
      },
      {
        supplierId: 'SUPP-INV-003',
        name: 'Kajaria Ceramics',
        supplierGroup: 'Raw Material',
        country: 'India',
        taxId: 'GSTIN06KAJAR0001K3',
        outstandingAmount: 198000,
        email: 'trade@kajaria.com',
        phone: '18001234567',
        address: 'SF-11, DLF City Phase I, Gurgaon - 122002',
        status: 'Active',
      },
      {
        supplierId: 'SUPP-INV-004',
        name: 'Asian Paints',
        supplierGroup: 'Raw Material',
        country: 'India',
        taxId: 'GSTIN27ASIAN0001A4',
        outstandingAmount: 94500,
        email: 'b2b@asianpaints.com',
        phone: '18002090340',
        address: '6A, Shantinagar, Santacruz East, Mumbai - 400055',
        status: 'Active',
      },
      {
        supplierId: 'SUPP-INV-005',
        name: 'Finolex Cables',
        supplierGroup: 'Equipment',
        country: 'India',
        taxId: 'GSTIN27FINOL0001F5',
        outstandingAmount: 126000,
        email: 'supply@finolex.com',
        phone: '18001037979',
        address: '26-27, Mumbai - Pune Road, Pimpri, Pune - 411018',
        status: 'Active',
      },
      {
        supplierId: 'SUPP-INV-006',
        name: 'Local Sand Supplier',
        supplierGroup: 'Raw Material',
        country: 'India',
        taxId: null,
        outstandingAmount: 47250,
        email: null,
        phone: '9876500011',
        address: 'Village Satpur, Nashik - 422007',
        status: 'Active',
      },
    ]);
    console.log(`  ✓ ${suppliers.length} suppliers seeded`);

    // ── Sales Invoices ───────────────────────────────────────────
    console.log('Seeding Sales Invoices...');
    const salesInvoiceData = [
      {
        invoiceId: 'SINV-2026-00001',
        customerId: customers[0].id,
        customerName: 'Mohan Kulkarni',
        invoiceDate: '2026-01-15',
        dueDate: '2026-02-14',
        paymentTerms: '30 Days',
        subtotal: 160169.49,
        taxAmount: 28830.51,
        totalAmount: 189000,
        outstandingAmount: 189000,
        status: 'Unpaid',
        notes: 'Flat booking advance — Unit 2B',
      },
      {
        invoiceId: 'SINV-2026-00002',
        customerId: customers[1].id,
        customerName: 'Vikram Industries',
        invoiceDate: '2026-02-01',
        dueDate: '2026-04-02',
        paymentTerms: '60 Days',
        subtotal: 400423.73,
        taxAmount: 72076.27,
        totalAmount: 472500,
        outstandingAmount: 472500,
        status: 'Partly Paid',
        notes: 'Commercial space — Phase 2',
      },
      {
        invoiceId: 'SINV-2026-00003',
        customerId: customers[2].id,
        customerName: 'Sunita Bhosale',
        invoiceDate: '2026-01-20',
        dueDate: '2026-01-20',
        paymentTerms: 'Immediate',
        subtotal: 212288.14,
        taxAmount: 38211.86,
        totalAmount: 250500,
        outstandingAmount: 0,
        status: 'Paid',
        notes: 'Final payment — Flat 5A',
      },
      {
        invoiceId: 'SINV-2026-00004',
        customerId: customers[3].id,
        customerName: 'Anita Desai',
        invoiceDate: '2026-03-10',
        dueDate: '2026-04-09',
        paymentTerms: '30 Days',
        subtotal: 800847.46,
        taxAmount: 144152.54,
        totalAmount: 945000,
        outstandingAmount: 945000,
        status: 'Unpaid',
        notes: 'Investment plot — Sector 7',
      },
      {
        invoiceId: 'SINV-2026-00005',
        customerId: customers[4].id,
        customerName: 'Rajesh Sharma',
        invoiceDate: '2026-03-22',
        dueDate: '2026-05-21',
        paymentTerms: '60 Days',
        subtotal: 1334745.76,
        taxAmount: 240254.24,
        totalAmount: 1575000,
        outstandingAmount: 787500,
        status: 'Partly Paid',
        notes: 'Construction contract — Block C',
      },
      {
        invoiceId: 'SINV-2026-00006',
        customerId: customers[0].id,
        customerName: 'Mohan Kulkarni',
        invoiceDate: '2026-04-05',
        dueDate: '2026-04-05',
        paymentTerms: 'Immediate',
        subtotal: 63559.32,
        taxAmount: 11440.68,
        totalAmount: 75000,
        outstandingAmount: 75000,
        status: 'Draft',
        notes: 'Additional work — balcony extension',
      },
    ];

    for (const inv of salesInvoiceData) {
      const created = await SalesInvoice.create(inv);
      await SalesInvoiceItem.bulkCreate([
        {
          salesInvoiceId: created.id,
          description: 'Construction work — primary billing',
          qty: 1,
          rate: inv.subtotal * 0.6,
          taxPercent: 18,
          amount: inv.subtotal * 0.6,
        },
        {
          salesInvoiceId: created.id,
          description: 'Material supply and labour',
          qty: 1,
          rate: inv.subtotal * 0.4,
          taxPercent: 18,
          amount: inv.subtotal * 0.4,
        },
      ]);
    }
    console.log(`  ✓ ${salesInvoiceData.length} sales invoices seeded`);

    // ── Purchase Invoices ────────────────────────────────────────
    console.log('Seeding Purchase Invoices...');
    const purchaseInvoiceData = [
      {
        invoiceId: 'PINV-2026-00001',
        supplierId: suppliers[0].id,
        supplierName: 'Shree Cement Ltd',
        invoiceDate: '2026-01-10',
        dueDate: '2026-02-09',
        paymentTerms: '30 Days',
        subtotal: 326271.19,
        taxAmount: 58728.81,
        totalAmount: 385000,
        outstandingAmount: 385000,
        status: 'Unpaid',
      },
      {
        invoiceId: 'PINV-2026-00002',
        supplierId: suppliers[1].id,
        supplierName: 'Tata Steel',
        invoiceDate: '2026-01-18',
        dueDate: '2026-03-19',
        paymentTerms: '60 Days',
        subtotal: 569491.53,
        taxAmount: 102508.47,
        totalAmount: 672000,
        outstandingAmount: 336000,
        status: 'Partly Paid',
      },
      {
        invoiceId: 'PINV-2026-00003',
        supplierId: suppliers[2].id,
        supplierName: 'Kajaria Ceramics',
        invoiceDate: '2026-02-05',
        dueDate: '2026-03-07',
        paymentTerms: '30 Days',
        subtotal: 167796.61,
        taxAmount: 30203.39,
        totalAmount: 198000,
        outstandingAmount: 0,
        status: 'Paid',
      },
      {
        invoiceId: 'PINV-2026-00004',
        supplierId: suppliers[3].id,
        supplierName: 'Asian Paints',
        invoiceDate: '2026-02-20',
        dueDate: '2026-02-20',
        paymentTerms: 'Immediate',
        subtotal: 80084.75,
        taxAmount: 14415.25,
        totalAmount: 94500,
        outstandingAmount: 94500,
        status: 'Unpaid',
      },
      {
        invoiceId: 'PINV-2026-00005',
        supplierId: suppliers[4].id,
        supplierName: 'Finolex Cables',
        invoiceDate: '2026-03-01',
        dueDate: '2026-04-30',
        paymentTerms: '60 Days',
        subtotal: 106779.66,
        taxAmount: 19220.34,
        totalAmount: 126000,
        outstandingAmount: 126000,
        status: 'Unpaid',
      },
      {
        invoiceId: 'PINV-2026-00006',
        supplierId: suppliers[5].id,
        supplierName: 'Local Sand Supplier',
        invoiceDate: '2026-03-15',
        dueDate: '2026-03-15',
        paymentTerms: 'Immediate',
        subtotal: 40042.37,
        taxAmount: 7207.63,
        totalAmount: 47250,
        outstandingAmount: 0,
        status: 'Paid',
      },
    ];

    for (const inv of purchaseInvoiceData) {
      const created = await PurchaseInvoice.create(inv);
      await PurchaseInvoiceItem.bulkCreate([
        {
          purchaseInvoiceId: created.id,
          description: 'Material supply — primary',
          qty: 1,
          rate: inv.subtotal,
          taxPercent: 18,
          amount: inv.subtotal,
        },
      ]);
    }
    console.log(`  ✓ ${purchaseInvoiceData.length} purchase invoices seeded`);

    // ── Credit Notes ─────────────────────────────────────────────
    console.log('Seeding Credit Notes...');
    await CreditNote.bulkCreate([
      {
        creditNoteId: 'CRN-2026-00001',
        customerId: customers[0].id,
        customerName: 'Mohan Kulkarni',
        returnAgainstInvoice: 'SINV-2026-00001',
        amount: 25000,
        date: '2026-02-10',
        reason: 'Quality issue — bathroom tiles',
        status: 'Submitted',
      },
      {
        creditNoteId: 'CRN-2026-00002',
        customerId: customers[1].id,
        customerName: 'Vikram Industries',
        returnAgainstInvoice: 'SINV-2026-00002',
        amount: 47250,
        date: '2026-03-05',
        reason: 'Excess billing adjustment',
        status: 'Submitted',
      },
      {
        creditNoteId: 'CRN-2026-00003',
        customerId: customers[4].id,
        customerName: 'Rajesh Sharma',
        returnAgainstInvoice: 'SINV-2026-00005',
        amount: 15750,
        date: '2026-04-12',
        reason: 'Scope reduction — parking area',
        status: 'Draft',
      },
    ]);
    console.log('  ✓ 3 credit notes seeded');

    // ── Debit Notes ──────────────────────────────────────────────
    console.log('Seeding Debit Notes...');
    await DebitNote.bulkCreate([
      {
        debitNoteId: 'DBN-2026-00001',
        supplierId: suppliers[0].id,
        supplierName: 'Shree Cement Ltd',
        returnAgainstInvoice: 'PINV-2026-00001',
        amount: 38500,
        date: '2026-01-25',
        reason: 'Damaged cement bags — 110 bags rejected',
        status: 'Submitted',
      },
      {
        debitNoteId: 'DBN-2026-00002',
        supplierId: suppliers[1].id,
        supplierName: 'Tata Steel',
        returnAgainstInvoice: 'PINV-2026-00002',
        amount: 67200,
        date: '2026-02-12',
        reason: 'Substandard steel rods — grade mismatch',
        status: 'Submitted',
      },
    ]);
    console.log('  ✓ 2 debit notes seeded');

    // ── Journal Entries ──────────────────────────────────────────
    console.log('Seeding Journal Entries...');
    const journalData = [
      {
        entry: {
          entryId: 'JE-2026-00001',
          entryType: 'Opening Entry',
          postingDate: '2026-01-01',
          totalDebit: 35000000,
          totalCredit: 35000000,
          userRemark: 'Opening balances for FY 2026',
          status: 'Submitted',
        },
        accounts: [
          { account: 'Cash', debit: 1250000, credit: 0, remarks: 'Opening cash balance' },
          { account: 'Bank - Avenue Builders', debit: 4850000, credit: 0, remarks: 'Opening bank balance' },
          { account: 'Land', debit: 15000000, credit: 0 },
          { account: 'Building & Construction', debit: 8500000, credit: 0 },
          { account: 'Equipment & Machinery', debit: 3200000, credit: 0 },
          { account: 'Accounts Payable', debit: 0, credit: 1870000 },
          { account: 'Bank Loan', debit: 0, credit: 12000000 },
          { account: 'Share Capital', debit: 0, credit: 5000000 },
          { account: 'Retained Earnings', debit: 0, credit: 13930000 },
        ],
      },
      {
        entry: {
          entryId: 'JE-2026-00002',
          entryType: 'Journal Entry',
          postingDate: '2026-01-15',
          totalDebit: 189000,
          totalCredit: 189000,
          userRemark: 'SINV-2026-00001 — Mohan Kulkarni',
          status: 'Submitted',
        },
        accounts: [
          { account: 'Accounts Receivable', debit: 189000, credit: 0 },
          { account: 'Sales Revenue', debit: 0, credit: 160169.49 },
          { account: 'Taxes Payable', debit: 0, credit: 28830.51 },
        ],
      },
      {
        entry: {
          entryId: 'JE-2026-00003',
          entryType: 'Bank Entry',
          postingDate: '2026-02-15',
          totalDebit: 250500,
          totalCredit: 250500,
          userRemark: 'Payment received — Sunita Bhosale (SINV-2026-00003)',
          status: 'Submitted',
        },
        accounts: [
          { account: 'Bank - Avenue Builders', debit: 250500, credit: 0 },
          { account: 'Accounts Receivable', debit: 0, credit: 250500 },
        ],
      },
      {
        entry: {
          entryId: 'JE-2026-00004',
          entryType: 'Journal Entry',
          postingDate: '2026-03-01',
          totalDebit: 385000,
          totalCredit: 385000,
          userRemark: 'PINV-2026-00001 — Shree Cement Ltd',
          status: 'Submitted',
        },
        accounts: [
          { account: 'Cost of Materials', debit: 326271.19, credit: 0 },
          { account: 'Taxes Payable', debit: 58728.81, credit: 0 },
          { account: 'Accounts Payable', debit: 0, credit: 385000 },
        ],
      },
      {
        entry: {
          entryId: 'JE-2026-00005',
          entryType: 'Depreciation',
          postingDate: '2026-03-31',
          totalDebit: 80000,
          totalCredit: 80000,
          userRemark: 'Q1 2026 — Equipment depreciation',
          status: 'Submitted',
        },
        accounts: [
          { account: 'Depreciation', debit: 80000, credit: 0 },
          { account: 'Equipment & Machinery', debit: 0, credit: 80000 },
        ],
      },
    ];

    for (const { entry, accounts } of journalData) {
      const created = await JournalEntry.create(entry);
      await JournalEntryAccount.bulkCreate(
        accounts.map(a => ({ ...a, journalEntryId: created.id }))
      );
    }
    console.log(`  ✓ ${journalData.length} journal entries seeded`);

    console.log('\n✅ Invoicing seeder completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Invoicing seeder failed:', error);
    process.exit(1);
  }
};

seed();
