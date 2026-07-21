import React, { useState } from 'react';
import ListPage from '../../components/shared/ListPage/ListPage';

const config = {
  entity: 'Payment Entry',
  entityPlural: 'Payment Entries',
  routeBase: '/payments/payment-entry',
  idPrefix: 'PAY',

  filterChips: [
    { key: 'id', label: 'ID', showApprox: true },
    { key: 'paymentType', label: 'Payment Type', showChevron: true },
    { key: 'postingDate', label: 'Posting Date', showApprox: false },
    { key: 'partyType', label: 'Party Type', showApprox: false },
    { key: 'party', label: 'Party', showApprox: false },
    { key: 'chequeRef', label: 'Cheque/Referer', showApprox: true },
  ],

  filterFields: [
    'ID', 'Payment Type', 'Posting Date', 'Party Type', 'Party',
    'Cheque/Referer', 'Title', 'Status', 'Created On',
  ],

  columns: [
    { key: 'id', label: 'ID' },
    { key: 'paymentType', label: 'Payment Type', type: 'badge' },
    { key: 'party', label: 'Party' },
    { key: 'paidAmount', label: 'Paid Amount' },
    { key: 'modeOfPayment', label: 'Mode' },
    { key: 'postingDate', label: 'Posting Date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],

  statusColors: {
    'Receive':           { bg: '#0b2e1c', color: '#30a66d' },
    'Pay':               { bg: '#361515', color: '#e03636' },
    'Internal Transfer': { bg: '#0d1e3b', color: '#4a8edd' },
    'Draft':             { bg: '#232323', color: '#afafaf' },
    'Submitted':         { bg: '#0b2e1c', color: '#30a66d' },
    'Cancelled':         { bg: '#361515', color: '#e03636' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Payment Entry yet",
  emptyButtonText: 'Create your first Payment Entry',
  addButtonLabel: '+ Add Payment Entry',
};

const FALLBACK_DATA = [
  { id: 'PAY-2026-00001', paymentType: 'Receive', party: 'Mohan Kulkarni',   paidAmount: '₹48,00,000', modeOfPayment: 'Bank Transfer', postingDate: '28/03/2026', status: 'Submitted' },
  { id: 'PAY-2026-00002', paymentType: 'Receive', party: 'Vikram Industries', paidAmount: '₹1,25,00,000', modeOfPayment: 'Cheque',        postingDate: '15/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00003', paymentType: 'Pay',     party: 'Shree Cement Ltd',  paidAmount: '₹1,90,000',  modeOfPayment: 'Bank Transfer', postingDate: '18/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00004', paymentType: 'Pay',     party: 'Asian Paints',      paidAmount: '₹90,000',    modeOfPayment: 'Bank Transfer', postingDate: '08/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00005', paymentType: 'Receive', party: 'Rajesh Sharma',     paidAmount: '₹42,50,000', modeOfPayment: 'Bank Transfer', postingDate: '10/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00006', paymentType: 'Pay',     party: 'Tata Steel',        paidAmount: '₹1,62,500',  modeOfPayment: 'Cheque',        postingDate: '20/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00007', paymentType: 'Pay',     party: 'Local Sand Supplier',paidAmount: '₹45,000',   modeOfPayment: 'Cash',          postingDate: '03/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00008', paymentType: 'Receive', party: 'Mohan Kulkarni',   paidAmount: '₹2,50,000',  modeOfPayment: 'Bank Transfer', postingDate: '25/02/2026', status: 'Submitted' },
];

export default function PaymentEntry() {
  const [items, setItems] = useState(FALLBACK_DATA);

  return (
    <ListPage
      config={config}
      items={items}
      onAdd={(data) =>
        setItems(prev => [
          ...prev,
          { ...data, id: `PAY-2026-${String(prev.length + 1).padStart(5, '0')}` },
        ])
      }
    />
  );
}
