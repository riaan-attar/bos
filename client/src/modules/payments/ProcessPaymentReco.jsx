import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Process Payment Reconciliation',
  entityPlural: 'Process Payment Reconciliations',
  routeBase: '/payments/process-payment-reco',
  idPrefix: 'PPR',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
    { key: 'company', label: 'Company', showApprox: false },
  ],

  filterFields: ['ID', 'Company', 'Created On'],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'company', label: 'Company' },
    { key: 'account', label: 'Account' },
    { key: 'fromDate', label: 'From Date' },
    { key: 'toDate', label: 'To Date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],

  statusColors: {
    'Draft':      { bg: '#232323', color: '#afafaf' },
    'Processing': { bg: '#371e06', color: '#e79913' },
    'Completed':  { bg: '#0b2e1c', color: '#30a66d' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Process Payment Reconciliation yet",
  emptyButtonText: 'Create your first Process Payment Reconciliation',
  addButtonLabel: '+ Add Process Payment Reconciliation',
};

const FALLBACK_DATA = [];

export default function ProcessPaymentReco() {
  const [items, setItems] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={(data) =>
        setItems(prev => [
          ...prev,
          { ...data, id: `PPR-2026-${String(prev.length + 1).padStart(5, '0')}` },
        ])
      }
    />
  );
}
