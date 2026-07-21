import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Payment Order',
  entityPlural: 'Payment Orders',
  routeBase: '/payments/payment-order',
  idPrefix: 'PORD',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
  ],

  filterFields: ['ID', 'Company', 'Status', 'Created On'],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'account', label: 'Account' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],

  statusColors: {
    'Draft':     { bg: '#232323', color: '#afafaf' },
    'Submitted': { bg: '#0b2e1c', color: '#30a66d' },
    'Cancelled': { bg: '#361515', color: '#e03636' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Payment Order yet",
  emptyButtonText: 'Create your first Payment Order',
  addButtonLabel: '+ Add Payment Order',
};

const FALLBACK_DATA = [
  { id: 'PORD-2026-00001', account: 'Bank - HDFC',  amount: 190000, date: '18/06/2026', status: 'Submitted' },
  { id: 'PORD-2026-00002', account: 'Bank - HDFC',  amount: 84000,  date: '20/06/2026', status: 'Draft' },
  { id: 'PORD-2026-00003', account: 'Bank - ICICI', amount: 275000, date: '22/06/2026', status: 'Submitted' },
];

export default function PaymentOrder() {
  const [items, setItems] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={(data) =>
        setItems(prev => [
          ...prev,
          { ...data, id: `PORD-2026-${String(prev.length + 1).padStart(5, '0')}` },
        ])
      }
    />
  );
}
