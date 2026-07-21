import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Journal Entry',
  entityPlural: 'Journal Entries',
  routeBase: '/payments/journal-entry',
  idPrefix: 'JE',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
    { key: 'company', label: 'Company', showApprox: false },
    { key: 'entryType', label: 'Entry Type', showChevron: true },
    { key: 'title', label: 'Title', showApprox: true },
  ],

  filterFields: ['ID', 'Company', 'Entry Type', 'Title', 'Status', 'Created On'],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'entryType', label: 'Entry Type', type: 'badge' },
    { key: 'debitAccount', label: 'Debit Account' },
    { key: 'creditAccount', label: 'Credit Account' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],

  statusColors: {
    'Draft':               { bg: '#232323', color: '#afafaf' },
    'Submitted':           { bg: '#0b2e1c', color: '#30a66d' },
    'Cancelled':           { bg: '#361515', color: '#e03636' },
    'Journal Entry':       { bg: '#0d1e3b', color: '#4a8edd' },
    'Bank Entry':          { bg: '#0d1e3b', color: '#4a8edd' },
    'Credit Card Entry':   { bg: '#371e06', color: '#e79913' },
    'Debit Note':          { bg: '#361515', color: '#e03636' },
    'Credit Note':         { bg: '#0b2e1c', color: '#30a66d' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Journal Entry yet",
  emptyButtonText: 'Create your first Journal Entry',
  addButtonLabel: '+ Add Journal Entry',
};

const FALLBACK_DATA = [];

export default function JournalEntry() {
  const [items, setItems] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={(data) =>
        setItems(prev => [
          ...prev,
          { ...data, id: `JE-2026-${String(prev.length + 1).padStart(5, '0')}` },
        ])
      }
    />
  );
}
