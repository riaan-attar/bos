/**
 * Configuration for the main sidebar navigation.
 * Add new modules and sub-items here.
 */
import { Briefcase, Boxes, Settings } from 'lucide-react';

export const sidebarConfig = [
  {
    id: 'crm',
    label: 'CRM',
    icon: Briefcase,
    path: '/crm',
    subItems: [
      { label: 'Lead', path: '/crm/leads' },
      { label: 'Opportunity', path: '/crm/opportunities' },
      { label: 'Customer', path: '/crm/customers' },
      { label: 'Contact', path: '/crm/contacts' },
      { label: 'Communication', path: '/crm/communications' },
      { label: 'Campaign', path: '/crm/campaigns' },
      { label: 'Sales Pipeline', path: '/crm/pipeline' },
      { label: 'Reports', path: '/crm/reports' },
      { label: 'Maintenance', path: '/crm/maintenance' },
    ]
  },
  {
    id: 'erp',
    label: 'ERP',
    icon: Boxes,
    path: '/erp',
    subItems: [
      { label: 'Accounts', path: '/erp/accounts' },
      { label: 'Stock', path: '/erp/stock' },
      { label: 'HR', path: '/erp/hr' },
      { label: 'Payroll', path: '/erp/payroll' },
      { label: 'Purchase', path: '/erp/purchase' },
      { label: 'Assets', path: '/erp/assets' },
      { label: 'Projects', path: '/erp/projects' },
      { label: 'Reports', path: '/erp/reports' },
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    subItems: [
      { label: 'Users & Permissions', path: '/settings/users' },
      { label: 'System Settings', path: '/settings/system' },
      { label: 'Email Settings', path: '/settings/email' },
      { label: 'Notification Settings', path: '/settings/notifications' },
      { label: 'Data Import', path: '/settings/import' },
      { label: 'Backup', path: '/settings/backup' },
    ]
  }
];
