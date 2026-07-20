export const SIDEBAR_CONFIG = {
  main: [
    {
      key: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      route: '/notifications',
      badge: 7,
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      route: '/crm',
    },
    {
      key: 'leads',
      label: 'Leads',
      icon: 'Users',
      route: '/crm/leads',
    },
    {
      key: 'deals',
      label: 'Deals',
      icon: 'Handshake',
      route: '/crm/deals',
    },
    {
      key: 'contacts',
      label: 'Contacts',
      icon: 'UserCircle',
      route: '/crm/contacts',
    },
    {
      key: 'organizations',
      label: 'Organizations',
      icon: 'Building2',
      route: '/crm/organizations',
    },
    {
      key: 'notes',
      label: 'Notes',
      icon: 'StickyNote',
      route: '/crm/notes',
    },
    {
      key: 'tasks',
      label: 'Tasks',
      icon: 'CheckSquare',
      route: '/crm/tasks',
    },
    {
      key: 'callLogs',
      label: 'Call Logs',
      icon: 'Phone',
      route: '/crm/call-logs',
    },
    {
      key: 'emailTemplates',
      label: 'Email Templates',
      icon: 'Mail',
      route: '/crm/email-templates',
    },
  ],

  publicViews: [
    {
      key: 'myLeads',
      label: 'My Leads',
      icon: 'User',
      route: '/crm/leads?filter=mine',
    },
    {
      key: 'myDeals',
      label: 'My Deals',
      icon: 'User',
      route: '/crm/deals?filter=mine',
    },
  ],

  pinnedViews: [
    {
      key: 'incomingCalls',
      label: 'Incoming Calls',
      icon: 'PhoneIncoming',
      route: '/crm/incoming-calls',
    },
  ],
};

export const PROJECTS_SIDEBAR_CONFIG = {
  main: [
    {
      key: 'notifications',
      label: 'Notification',
      icon: 'Bell',
      route: '/notifications',
    },
  ],
  erp: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      route: '/projects',
    },
    {
      key: 'project',
      label: 'Project',
      icon: 'Folder',
      route: '/projects/project',
    },
    {
      key: 'task',
      label: 'Task',
      icon: 'CheckSquare',
      route: '/projects/task',
    },
    {
      key: 'timesheet',
      label: 'Timesheet',
      icon: 'Clock',
      route: '/projects/timesheet',
    },
  ],
  setup: [
    {
      key: 'activityType',
      label: 'Activity Type',
      icon: 'Activity',
      route: '/projects/setup/activity-type',
    },
    {
      key: 'activityCost',
      label: 'Activity Cost',
      icon: 'DollarSign',
      route: '/projects/setup/activity-cost',
    },
    {
      key: 'projectTemplate',
      label: 'Project Template',
      icon: 'LayoutGrid',
      route: '/projects/setup/project-template',
    },
    {
      key: 'projectType',
      label: 'Project Type',
      icon: 'Tag',
      route: '/projects/setup/project-type',
    },
    {
      key: 'projectUpdate',
      label: 'Project Update',
      icon: 'RefreshCw',
      route: '/projects/setup/project-update',
    },
  ],
  reports: [
    {
      key: 'projectSummary',
      label: 'Project Summary',
      icon: 'FileText',
      route: '/projects/reports/project-summary',
    },
    {
      key: 'dailyTimesheetSummary',
      label: 'Daily Timesheet Summary',
      icon: 'Calendar',
      route: '/projects/reports/daily-timesheet-summary',
    },
    {
      key: 'timesheetBillingSummary',
      label: 'Timesheet Billing Summary',
      icon: 'Receipt',
      route: '/projects/reports/timesheet-billing-summary',
    },
    {
      key: 'projectWiseStockTracking',
      label: 'Project wise Stock Tracking',
      icon: 'Package',
      route: '/projects/reports/project-wise-stock-tracking',
    },
    {
      key: 'delayedTasksSummary',
      label: 'Delayed Tasks Summary',
      icon: 'AlarmClock',
      route: '/projects/reports/delayed-tasks-summary',
    },
  ],
  settings: [
    {
      key: 'projectsSettings',
      label: 'Projects Settings',
      icon: 'Settings',
      route: '/projects/settings',
    },
  ],
  footer: [
    {
      key: 'gettingStarted',
      label: 'Getting Started',
      icon: 'Compass',
      route: '/projects/getting-started',
    },
  ],
};

export const STOCK_SIDEBAR_CONFIG = {
  main: [
    {
      key: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      route: '/notifications',
    },
  ],
  erp: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      route: '/stock/dashboard',
    },
    {
      key: 'stockEntry',
      label: 'Stock Entry',
      icon: 'PackagePlus',
      route: '/stock/stock-entry',
    },
    {
      key: 'purchaseReceipt',
      label: 'Purchase Receipt',
      icon: 'Receipt',
      route: '/stock/purchase-receipt',
    },
    {
      key: 'deliveryNote',
      label: 'Delivery Note',
      icon: 'Truck',
      route: '/stock/delivery-note',
    },
    {
      key: 'materialRequest',
      label: 'Material Request',
      icon: 'ClipboardList',
      route: '/stock/material-request',
    },
    {
      key: 'pickList',
      label: 'Pick List',
      icon: 'ListChecks',
      route: '/stock/pick-list',
    },
  ],
  tools: [
    {
      key: 'serialNo',
      label: 'Serial No',
      icon: 'Hash',
      route: '/stock/tools/serial-no',
    },
    {
      key: 'batch',
      label: 'Batch',
      icon: 'Layers',
      route: '/stock/tools/batch',
    },
    {
      key: 'qualityInspection',
      label: 'Quality Inspection',
      icon: 'CheckSquare',
      route: '/stock/tools/quality',
    },
  ],
  setup: [
    {
      key: 'warehouse',
      label: 'Warehouse',
      icon: 'Building',
      route: '/stock/setup/warehouse',
    },
    {
      key: 'item',
      label: 'Item',
      icon: 'Box',
      route: '/stock/setup/item',
    },
    {
      key: 'itemGroup',
      label: 'Item Group',
      icon: 'FolderTree',
      route: '/stock/setup/item-group',
    },
    {
      key: 'uom',
      label: 'Unit of Measure',
      icon: 'Scale',
      route: '/stock/setup/uom',
    },
  ],
  reports: [
    {
      key: 'stockLedger',
      label: 'Stock Ledger',
      icon: 'BookOpen',
      route: '/stock/reports/stock-ledger',
    },
    {
      key: 'stockBalance',
      label: 'Stock Balance',
      icon: 'BarChart2',
      route: '/stock/reports/stock-balance',
    },
    {
      key: 'warehouseWiseStock',
      label: 'Warehouse-wise Stock',
      icon: 'PieChart',
      route: '/stock/reports/warehouse-wise-stock',
    },
    {
      key: 'itemPrices',
      label: 'Item Prices',
      icon: 'DollarSign',
      route: '/stock/reports/item-prices',
    },
  ],
  settings: [
    {
      key: 'stockSettings',
      label: 'Stock Settings',
      icon: 'Settings',
      route: '/stock/settings',
    },
  ],
  footer: [
    {
      key: 'gettingStarted',
      label: 'Getting Started',
      icon: 'Compass',
      route: '/stock/getting-started',
    },
  ],
};

export const INVOICING_SIDEBAR_CONFIG = {
  main: [
    {
      key: 'invHome',
      label: 'Home',
      icon: 'Home',
      route: '/invoicing',
    },
    {
      key: 'invDashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      route: '/invoicing/dashboard',
    },
    {
      key: 'chartOfAccounts',
      label: 'Chart of Accounts',
      icon: 'BookOpen',
      route: '/invoicing/chart-of-accounts',
    },
  ],
  receivables: [
    {
      key: 'invCustomer',
      label: 'Customer',
      icon: 'Users',
      route: '/invoicing/receivables/customer',
    },
    {
      key: 'salesInvoice',
      label: 'Sales Invoice',
      icon: 'FileText',
      route: '/invoicing/receivables/sales-invoice',
    },
    {
      key: 'creditNote',
      label: 'Credit Note',
      icon: 'FileMinus',
      route: '/invoicing/receivables/credit-note',
    },
    {
      key: 'accountsReceivable',
      label: 'Accounts Receivable',
      icon: 'TrendingUp',
      route: '/invoicing/receivables/accounts-receivable',
    },
  ],
  payables: [
    {
      key: 'invSupplier',
      label: 'Supplier',
      icon: 'Truck',
      route: '/invoicing/payables/supplier',
    },
    {
      key: 'purchaseInvoice',
      label: 'Purchase Invoice',
      icon: 'FileInput',
      route: '/invoicing/payables/purchase-invoice',
    },
    {
      key: 'debitNote',
      label: 'Debit Note',
      icon: 'FilePlus',
      route: '/invoicing/payables/debit-note',
    },
    {
      key: 'accountsPayable',
      label: 'Accounts Payable',
      icon: 'TrendingDown',
      route: '/invoicing/payables/accounts-payable',
    },
  ],
  payments: [
    {
      key: 'invPaymentEntry',
      label: 'Payment Entry',
      icon: 'CreditCard',
      route: '/invoicing/payments/payment-entry',
    },
    {
      key: 'invJournalEntry',
      label: 'Journal Entry',
      icon: 'BookOpen',
      route: '/invoicing/payments/journal-entry',
    },
    {
      key: 'invPaymentRequest',
      label: 'Payment Request',
      icon: 'ClipboardList',
      route: '/invoicing/payments/payment-request',
    },
    {
      key: 'invPaymentOrder',
      label: 'Payment Order',
      icon: 'FileCheck',
      route: '/invoicing/payments/payment-order',
    },
    {
      key: 'invPaymentReconciliation',
      label: 'Payment Reconciliation',
      icon: 'RefreshCw',
      route: '/invoicing/payments/payment-reconciliation',
    },
    {
      key: 'invUnreconcilePayment',
      label: 'Unreconcile Payment',
      icon: 'XCircle',
      route: '/invoicing/payments/unreconcile-payment',
    },
    {
      key: 'invProcessPaymentReco',
      label: 'Process Payment Reco...',
      icon: 'Settings',
      route: '/invoicing/payments/process-payment-reco',
    },
    {
      key: 'invRepostAccountingLedger',
      label: 'Repost Accounting Led...',
      icon: 'RotateCcw',
      route: '/invoicing/payments/repost-accounting-ledger',
    },
    {
      key: 'invRepostPaymentLedger',
      label: 'Repost Payment Ledger',
      icon: 'RotateCcw',
      route: '/invoicing/payments/repost-payment-ledger',
    },
  ],
  reports: [
    {
      key: 'generalLedger',
      label: 'General Ledger',
      icon: 'BookOpen',
      route: '/invoicing/reports/general-ledger',
    },
    {
      key: 'trialBalance',
      label: 'Trial Balance',
      icon: 'Scale',
      route: '/invoicing/reports/trial-balance',
    },
    {
      key: 'financialReports',
      label: 'Financial Reports',
      icon: 'BarChart2',
      route: '/invoicing/reports/financial-reports',
    },
  ],
  settings: [
    {
      key: 'invSettings',
      label: 'Settings',
      icon: 'Settings',
      route: '/invoicing/settings',
    },
  ],
  footer: [
    {
      key: 'invGettingStarted',
      label: 'Getting Started',
      icon: 'Compass',
      route: '/invoicing/getting-started',
    },
  ],
};

export const PAYMENTS_SIDEBAR_CONFIG = {
  main: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      route: '/payments',
    },
  ],
  payments: [
    {
      key: 'paymentEntry',
      label: 'Payment Entry',
      icon: 'FileText',
      route: '/payments/payment-entry',
    },
    {
      key: 'journalEntry',
      label: 'Journal Entry',
      icon: 'BookOpen',
      route: '/payments/journal-entry',
    },
    {
      key: 'paymentRequest',
      label: 'Payment Request',
      icon: 'ClipboardList',
      route: '/payments/payment-request',
    },
    {
      key: 'paymentOrder',
      label: 'Payment Order',
      icon: 'FileCheck',
      route: '/payments/payment-order',
    },
    {
      key: 'paymentReconciliation',
      label: 'Payment Reconciliation',
      icon: 'RefreshCw',
      route: '/payments/payment-reconciliation',
    },
    {
      key: 'unreconcilePayment',
      label: 'Unreconcile Payment',
      icon: 'XCircle',
      route: '/payments/unreconcile-payment',
    },
    {
      key: 'processPaymentReconciliation',
      label: 'Process Payment Reconc...',
      icon: 'Settings',
      route: '/payments/process-payment-reconciliation',
    },
    {
      key: 'repostAccountingLedger',
      label: 'Repost Accounting Ledger',
      icon: 'RotateCcw',
      route: '/payments/repost-accounting-ledger',
    },
    {
      key: 'repostPaymentLedger',
      label: 'Repost Payment Ledger',
      icon: 'RotateCcw',
      route: '/payments/repost-payment-ledger',
    },
  ],
  reports: [
    {
      key: 'reports',
      label: 'Reports',
      icon: 'BarChart2',
      route: '/payments/reports',
    },
  ],
  footer: [
    {
      key: 'gettingStarted',
      label: 'Getting Started',
      icon: 'Compass',
      route: '/payments/getting-started',
    },
  ],
};
