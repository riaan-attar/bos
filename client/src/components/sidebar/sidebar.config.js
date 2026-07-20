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
