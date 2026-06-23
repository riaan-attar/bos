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

