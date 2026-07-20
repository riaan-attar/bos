import React from 'react';
import { MoreHorizontal, Filter, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const plData = [
  { name: 'Apr', income: 0, expense: 0 },
  { name: 'May', income: 0, expense: 0 },
  { name: 'Jun', income: 0, expense: 0 },
  { name: 'Jul', income: 0, expense: 0 },
  { name: 'Aug', income: 0, expense: 0 },
  { name: 'Sep', income: 0, expense: 0 },
  { name: 'Oct', income: 0, expense: 0 },
  { name: 'Nov', income: 0, expense: 0 },
  { name: 'Dec', income: 0, expense: 0 },
  { name: 'Jan', income: 0, expense: 0 },
  { name: 'Feb', income: 0, expense: 0 },
  { name: 'Mar', income: 0, expense: 0 },
];

function StatCard({ title, value }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg, #ffffff)',
      border: '1px solid var(--border-color, #e5e7eb)',
      borderRadius: '8px',
      padding: '16px 20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '13px', color: 'var(--text-muted, #6b7280)', margin: 0, fontWeight: 400 }}>{title}</h3>
        <MoreHorizontal size={15} style={{ color: '#9ca3af', cursor: 'pointer' }} />
      </div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary, #1a1a2e)', marginTop: '8px' }}>
        {value}
      </div>
    </div>
  );
}

function MasterLink({ label, to, navigate }) {
  return (
    <div
      onClick={() => navigate(to)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 0',
        borderBottom: '1px solid #f3f4f6',
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.querySelector('span').style.color = '#3b82f6'}
      onMouseLeave={e => e.currentTarget.querySelector('span').style.color = '#374151'}
    >
      <span style={{ fontSize: '13px', color: '#374151', transition: 'color 0.15s' }}>{label}</span>
      <ArrowUpRight size={13} color="#9ca3af" />
    </div>
  );
}

export default function InvoicingDashboard() {
  const navigate = useNavigate();

  const accountingMasters = [
    { label: 'Company', to: '/invoicing/settings' },
    { label: 'Chart of Accounts', to: '/invoicing/chart-of-accounts' },
    { label: 'Accounts Settings', to: '/invoicing/settings' },
    { label: 'Fiscal Year', to: '/invoicing/settings' },
    { label: 'Accounting Dimension', to: '/invoicing/settings' },
    { label: 'Finance Book', to: '/invoicing/settings' },
  ];

  const paymentLinks = [
    { label: 'Payment Entry', to: '/invoicing/payments/payment-entry' },
    { label: 'Journal Entry', to: '/invoicing/payments/journal-entry' },
    { label: 'Journal Entry Template', to: '/invoicing/settings' },
    { label: 'Terms and Conditions', to: '/invoicing/settings' },
    { label: 'Mode of Payment', to: '/invoicing/settings' },
  ];

  const taxMasters = [
    { label: 'Sales Taxes and Charges Template', to: '/invoicing/settings' },
    { label: 'Purchase Taxes and Charges Template', to: '/invoicing/settings' },
    { label: 'Item Tax Template', to: '/invoicing/settings' },
    { label: 'Tax Category', to: '/invoicing/settings' },
    { label: 'Tax Rule', to: '/invoicing/settings' },
    { label: 'Tax Withholding Category', to: '/invoicing/settings' },
  ];

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* Profit & Loss Chart */}
      <div style={{
        backgroundColor: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--border-color, #e5e7eb)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Profit and Loss</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Filter size={13} color="#6b7280" />
            </button>
            <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <MoreHorizontal size={13} color="#6b7280" />
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={plData} margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 1]} ticks={[0]} />
            <Area type="monotone" dataKey="income" stroke="#22c55e" fill="url(#incomeGrad)" strokeWidth={1.5} dot={false} />
            <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="url(#expenseGrad)" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '-4px' }}>2026-2027</div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '3px', background: '#22c55e', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Income</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '3px', background: '#ef4444', borderRadius: '2px' }} />
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Expense</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Outgoing Bills" value="₹0.00" />
        <StatCard title="Incoming Bills" value="₹0.00" />
        <StatCard title="Incoming Payment" value="₹0.00" />
        <StatCard title="Outgoing Payment" value="₹0.00" />
      </div>

      {/* Reports & Masters */}
      <div>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted, #6b7280)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Reports &amp; Masters
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {/* Accounting Masters */}
          <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>Accounting Masters</h3>
            {accountingMasters.map(m => (
              <MasterLink key={m.label} label={m.label} to={m.to} navigate={navigate} />
            ))}
          </div>

          {/* Payments */}
          <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>Payments</h3>
            {paymentLinks.map(m => (
              <MasterLink key={m.label} label={m.label} to={m.to} navigate={navigate} />
            ))}
          </div>

          {/* Tax Masters */}
          <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>Tax Masters</h3>
            {taxMasters.map(m => (
              <MasterLink key={m.label} label={m.label} to={m.to} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
