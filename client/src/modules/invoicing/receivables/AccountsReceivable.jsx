import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const STAT_CARDS = [
  { label: 'Total Receivable', value: '₹1,12,50,000', color: '#1a1a2e' },
  { label: 'Overdue', value: '₹0', color: '#dc2626' },
  { label: 'Due This Month', value: '₹1,12,50,000', color: '#a16207' },
  { label: 'Collected', value: '₹50,50,000', color: '#15803d' },
];

const AGING_DATA = [
  { bucket: '0-30 days', amount: 7700000, fill: '#22c55e' },
  { bucket: '31-60 days', amount: 3550000, fill: '#f59e0b' },
  { bucket: '61-90 days', amount: 0, fill: '#ef4444' },
  { bucket: '90+ days', amount: 0, fill: '#7c3aed' },
];

const AR_DATA = [
  { customer: 'Vikram Industries', invoice: 'SINV-2026-00002', amount: 25000000, outstanding: 12500000, dueDate: '30/06/2026', age: 20, status: 'Partly Paid' },
  { customer: 'Sunita Bhosale', invoice: 'SINV-2026-00003', amount: 6500000, outstanding: 6500000, dueDate: '31/07/2026', age: 0, status: 'Unpaid' },
  { customer: 'Anita Desai', invoice: 'SINV-2026-00004', amount: 32000000, outstanding: 32000000, dueDate: '31/08/2026', age: 0, status: 'Unpaid' },
  { customer: 'Rajesh Sharma', invoice: 'SINV-2026-00005', amount: 8500000, outstanding: 4250000, dueDate: '15/07/2026', age: 35, status: 'Partly Paid' },
];

const getAgeColor = (age) => {
  if (age <= 30) return '#15803d';
  if (age <= 60) return '#a16207';
  if (age <= 90) return '#dc2626';
  return '#7c3aed';
};

const STATUS_STYLES = {
  'Partly Paid': { bg: '#fef9c3', color: '#a16207' },
  Unpaid: { bg: '#fee2e2', color: '#dc2626' },
  Paid: { bg: '#dcfce7', color: '#15803d' },
};

export default function AccountsReceivable() {
  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 4px 0' }}>Accounts Receivable</h1>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Outstanding customer invoices report</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
        {STAT_CARDS.map(card => (
          <div key={card.label} style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{card.label}</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Aging Chart */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0' }}>Aging Analysis</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={AGING_DATA} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="bucket" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => v >= 1000000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [formatINR(value), 'Outstanding']} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {AGING_DATA.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AR Table */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Customer', 'Invoice', 'Amount', 'Outstanding', 'Due Date', 'Age (days)', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AR_DATA.map((row, i) => {
              const st = STATUS_STYLES[row.status] || STATUS_STYLES.Unpaid;
              return (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{row.customer}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{row.invoice}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{formatINR(row.amount)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#dc2626' }}>{formatINR(row.outstanding)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{row.dueDate}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 600, color: getAgeColor(row.age) }}>{row.age}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: st.bg, color: st.color }}>{row.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
