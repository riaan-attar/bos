import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Payment Request',
  entityPlural: 'Payment Requests',
  routeBase: '/payments/payment-request',
  idPrefix: 'PREQ',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
    { key: 'referenceDoctype', label: 'Reference Doctype', showApprox: false },
    { key: 'referenceName', label: 'Reference Name', showApprox: false },
    { key: 'status', label: 'Status', showChevron: true },
  ],

  filterFields: ['ID', 'Reference Doctype', 'Reference Name', 'Status', 'Created On'],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'referenceDoctype', label: 'Reference Doctype' },
    { key: 'referenceName', label: 'Reference Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'createdOn', label: 'Created On' },
  ],

  statusColors: {
    'Draft':     { bg: '#232323', color: '#afafaf' },
    'Requested': { bg: '#371e06', color: '#e79913' },
    'Paid':      { bg: '#0b2e1c', color: '#30a66d' },
    'Cancelled': { bg: '#361515', color: '#e03636' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Payment Request yet",
  hideEmptyButton: true,
  hideAddButton: true,
};

const FALLBACK_DATA = [];

export default function PaymentRequest() {
  const [items] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={() => {}}
    />
  );
}
