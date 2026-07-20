import React, { useState } from 'react';
import { Scale, TrendingUp, ArrowLeftRight, Clock, BookOpen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const REPORTS = [
  {
    id: 'balance-sheet',
    title: 'Balance Sheet',
    desc: 'View assets, liabilities & equity',
    icon: Scale,
    iconBg: '#dbeafe',
    iconColor: '#1d4ed8',
  },
  {
    id: 'pnl',
    title: 'Profit & Loss Statement',
    desc: 'Income vs expenses overview',
    icon: TrendingUp,
    iconBg: '#dcfce7',
    iconColor: '#15803d',
  },
  {
    id: 'cashflow',
    title: 'Cash Flow Statement',
    desc: 'Cash inflows and outflows',
    icon: ArrowLeftRight,
    iconBg: '#f3e8ff',
    iconColor: '#7c3aed',
  },
  {
    id: 'ar-aging',
    title: 'Accounts Receivable Aging',
    desc: 'Outstanding customer invoices',
    icon: Clock,
    iconBg: '#fef9c3',
    iconColor: '#a16207',
    navigate: '/invoicing/receivables/accounts-receivable',
  },
  {
    id: 'ap-aging',
    title: 'Accounts Payable Aging',
    desc: 'Outstanding supplier invoices',
    icon: Clock,
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    navigate: '/invoicing/payables/accounts-payable',
  },
  {
    id: 'general-ledger',
    title: 'General Ledger',
    desc: 'Complete transaction history',
    icon: BookOpen,
    iconBg: '#f0fdf4',
    iconColor: '#15803d',
    navigate: '/invoicing/reports/general-ledger',
  },
];

function BalanceSheetModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '640px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>Balance Sheet</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontSize: '12px', color: '#6b7280' }}>As on</label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Assets */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ASSETS</h3>
              {[
                { label: 'Current Assets', value: 3420000 },
                { label: 'Fixed Assets', value: 51250000 },
                { label: 'Stock', value: 4550000 },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#374151' }}>{item.label}</span>
                  <span style={{ fontWeight: 500, color: '#15803d' }}>{formatINR(item.value)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', fontWeight: 700, color: '#1a1a2e', borderTop: '2px solid #e5e7eb', marginTop: '4px' }}>
                <span>TOTAL ASSETS</span>
                <span>{formatINR(59220000)}</span>
              </div>
            </div>

            {/* Liabilities + Equity */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LIABILITIES + EQUITY</h3>
              {[
                { label: 'Current Liabilities', value: 731500 },
                { label: 'Long Term Liabilities', value: 25000000 },
                { label: 'Equity / Capital', value: 33488500 },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#374151' }}>{item.label}</span>
                  <span style={{ fontWeight: 500, color: '#dc2626' }}>{formatINR(item.value)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '14px', fontWeight: 700, color: '#1a1a2e', borderTop: '2px solid #e5e7eb', marginTop: '4px' }}>
                <span>TOTAL</span>
                <span>{formatINR(59220000)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px solid #bbf7d0' }}>
            <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 500 }}>✓ Balance Sheet is balanced — Assets = Liabilities + Equity</span>
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#ffffff', color: '#374151' }}>Close</button>
          <button style={{ padding: '8px 20px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Export PDF</button>
        </div>
      </div>
    </div>
  );
}

function PnLModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '560px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>Profit & Loss Statement</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>INCOME</h3>
            {[{ label: 'Sales Income', value: 7705000 }, { label: 'Other Income', value: 250000 }].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                <span style={{ color: '#374151' }}>{item.label}</span>
                <span style={{ fontWeight: 500, color: '#15803d' }}>{formatINR(item.value)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', borderTop: '1px solid #e5e7eb', marginTop: '4px' }}>
              <span>Total Income</span><span style={{ color: '#15803d' }}>{formatINR(7955000)}</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>EXPENSES</h3>
            {[{ label: 'Cost of Goods Sold', value: 2100000 }, { label: 'Operating Expenses', value: 850000 }, { label: 'Finance Charges', value: 120000 }, { label: 'Depreciation', value: 125000 }].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                <span style={{ color: '#374151' }}>{item.label}</span>
                <span style={{ fontWeight: 500, color: '#dc2626' }}>{formatINR(item.value)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', borderTop: '1px solid #e5e7eb', marginTop: '4px' }}>
              <span>Total Expenses</span><span style={{ color: '#dc2626' }}>{formatINR(3195000)}</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#15803d' }}>NET PROFIT</span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#15803d' }}>{formatINR(4760000)}</span>
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#ffffff', color: '#374151' }}>Close</button>
          <button style={{ padding: '8px 20px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Export PDF</button>
        </div>
      </div>
    </div>
  );
}

export default function FinancialReports() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const handleClick = (report) => {
    if (report.navigate) {
      navigate(report.navigate);
    } else {
      setModal(report.id);
    }
  };

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {modal === 'balance-sheet' && <BalanceSheetModal onClose={() => setModal(null)} />}
      {modal === 'pnl' && <PnLModal onClose={() => setModal(null)} />}
      {modal === 'cashflow' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#ffffff', borderRadius: '10px', width: '480px', padding: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>Cash Flow Statement</h2>
              <button onClick={() => setModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
            </div>
            {[
              { label: 'Operating Activities', value: 4250000, positive: true },
              { label: 'Investing Activities', value: -1250000, positive: false },
              { label: 'Financing Activities', value: -452500, positive: false },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                <span style={{ color: '#374151' }}>{item.label}</span>
                <span style={{ fontWeight: 500, color: item.positive ? '#15803d' : '#dc2626' }}>{formatINR(Math.abs(item.value))}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', fontWeight: 700, color: '#1a1a2e', borderTop: '2px solid #e5e7eb', marginTop: '4px' }}>
              <span>Net Cash Flow</span><span style={{ color: '#15803d' }}>{formatINR(2547500)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setModal(null)} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#ffffff', color: '#374151' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>Financial Reports</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {REPORTS.map(report => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              onClick={() => handleClick(report)}
              style={{
                backgroundColor: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--border-color, #e5e7eb)',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(59,130,246,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: report.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Icon size={18} color={report.iconColor} />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e', marginBottom: '4px' }}>{report.title}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{report.desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
