import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Unreconcile Payment',
  entityPlural: 'Unreconcile Payments',
  routeBase: '/payments/unreconcile-payment',
  idPrefix: 'UNRC',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
  ],

  filterFields: ['ID', 'Company', 'Created On'],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'paymentEntry', label: 'Payment Entry' },
    { key: 'party', label: 'Party' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],

  statusColors: {
    'Draft':     { bg: '#232323', color: '#afafaf' },
    'Submitted': { bg: '#0b2e1c', color: '#30a66d' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Unreconcile Payment yet",
  emptyButtonText: 'Create your first Unreconcile Payment',
  addButtonLabel: '+ Add Unreconcile Payment',
};

const FALLBACK_DATA = [];

export default function UnreconcilePayment() {
  const [items, setItems] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={(data) =>
        setItems(prev => [
          ...prev,
          { ...data, id: `UNRC-2026-${String(prev.length + 1).padStart(5, '0')}` },
        ])
      }
    />
  );
}
