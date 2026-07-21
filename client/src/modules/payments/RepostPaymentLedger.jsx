import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Repost Payment Ledger',
  entityPlural: 'Repost Payment Ledgers',
  routeBase: '/payments/repost-payment-ledger',
  idPrefix: 'RPL',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
  ],

  filterFields: ['ID', 'Company', 'Created On'],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'voucherType', label: 'Voucher Type' },
    { key: 'voucherNo', label: 'Voucher No' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'createdOn', label: 'Created On' },
  ],

  statusColors: {
    'Queued':    { bg: '#371e06', color: '#e79913' },
    'Completed': { bg: '#0b2e1c', color: '#30a66d' },
    'Failed':    { bg: '#361515', color: '#e03636' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Repost Payment Ledger yet",
  emptyButtonText: 'Create your first Repost Payment Ledger',
  addButtonLabel: '+ Add Repost Payment Ledger',
};

const FALLBACK_DATA = [];

export default function RepostPaymentLedger() {
  const [items, setItems] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={(data) =>
        setItems(prev => [
          ...prev,
          { ...data, id: `RPL-2026-${String(prev.length + 1).padStart(5, '0')}` },
        ])
      }
    />
  );
}
