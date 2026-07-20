import React, { useState } from 'react';

const formatINR = (num) => {
  if (num === 0) return '—';
  return '₹' + Math.abs(num).toLocaleString('en-IN');
};

const LEDGER_DATA = [
  { date: '01/04/2026', account: 'Bank', party: '', voucher: 'Opening Entry', voucherNo: 'JE-2026-00003', debit: 10000000, credit: 0, balance: 10000000, remarks: 'Opening balance' },
  { date: '01/04/2026', account: 'Capital', party: '', voucher: 'Opening Entry', voucherNo: 'JE-2026-00003', debit: 0, credit: 10000000, balance: 10000000, remarks: 'Opening balance' },
  { date: '28/03/2026', account: 'Bank', party: 'Mohan Kulkarni', voucher: 'Payment Entry', voucherNo: 'PAY-2026-00008', debit: 250000, credit: 0, balance: 250000, remarks: 'Parking slot payment' },
  { date: '01/04/2026', account: 'Accounts Receivable', party: 'Mohan Kulkarni', voucher: 'Sales Invoice', voucherNo: 'SINV-2026-00001', debit: 4800000, credit: 0, balance: 4800000, remarks: 'Flat 302 Tower A' },
  { date: '01/04/2026', account: 'Sales', party: '', voucher: 'Sales Invoice', voucherNo: 'SINV-2026-00001', debit: 0, credit: 4800000, balance: 4800000, remarks: '' },
  { date: '28/03/2026', account: 'Bank', party: 'Mohan Kulkarni', voucher: 'Payment Entry', voucherNo: 'PAY-2026-00001', debit: 4800000, credit: 0, balance: 5050000, remarks: 'Flat 302 payment received' },
  { date: '05/06/2026', account: 'Cash', party: '', voucher: 'Journal Entry', voucherNo: 'JE-2026-00001', debit: 500000, credit: 0, balance: 500000, remarks: '' },
  { date: '05/06/2026', account: 'Sales', party: '', voucher: 'Journal Entry', voucherNo: 'JE-2026-00001', debit: 0, credit: 500000, balance: 500000, remarks: '' },
  { date: '08/06/2026', account: 'Bank', party: 'Asian Paints', voucher: 'Payment Entry', voucherNo: 'PAY-2026-00004', debit: 0, credit: 90000, balance: 4960000, remarks: 'Paint payment' },
  { date: '10/06/2026', account: 'Bank', party: 'Rajesh Sharma', voucher: 'Payment Entry', voucherNo: 'PAY-2026-00005', debit: 4250000, credit: 0, balance: 9210000, remarks: '3BHK partial payment' },
  { date: '10/06/2026', account: 'Expenses', party: '', voucher: 'Journal Entry', voucherNo: 'JE-2026-00004', debit: 85000, credit: 0, balance: 85000, remarks: '' },
  { date: '10/06/2026', account: 'Cash', party: '', voucher: 'Journal Entry', voucherNo: 'JE-2026-00004', debit: 0, credit: 85000, balance: 415000, remarks: '' },
  { date: '15/06/2026', account: 'Accounts Receivable', party: 'Rajesh Sharma', voucher: 'Sales Invoice', voucherNo: 'SINV-2026-00005', debit: 8500000, credit: 0, balance: 8500000, remarks: '3BHK Gangapur Road' },
  { date: '18/06/2026', account: 'Bank', party: 'Shree Cement Ltd', voucher: 'Payment Entry', voucherNo: 'PAY-2026-00003', debit: 0, credit: 190000, balance: 9020000, remarks: 'Cement bill paid' },
  { date: '20/06/2026', account: 'Bank', party: 'Tata Steel', voucher: 'Payment Entry', voucherNo: 'PAY-2026-00006', debit: 0, credit: 162500, balance: 8857500, remarks: 'TMT bars partial' },
];

export default function GeneralLedger() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>General Ledger</h1>

      {/* Filters */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Account</label>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '7px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option value="">All Accounts</option>
              <option>Bank</option><option>Cash</option><option>Accounts Receivable</option><option>Sales</option><option>Expenses</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Party</label>
            <input type="text" placeholder="Party name..." style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '7px 10px', fontSize: '13px', outline: 'none', width: '160px', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>From Date</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '7px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>To Date</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '7px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '7px 18px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
        {[
          { label: 'Opening Balance', value: '₹2,85,00,000', color: '#1a1a2e' },
          { label: 'Total Debit', value: '₹1,24,00,000', color: '#dc2626' },
          { label: 'Total Credit', value: '₹77,05,000', color: '#15803d' },
        ].map(card => (
          <div key={card.label} style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>{card.label}</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Ledger Table */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Date', 'Account', 'Party', 'Voucher Type', 'Voucher No.', 'Debit', 'Credit', 'Balance', 'Remarks'].map(h => (
                <th key={h} style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEDGER_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '10px 12px', fontSize: '12px', color: '#374151', whiteSpace: 'nowrap' }}>{row.date}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{row.account}</td>
                <td style={{ padding: '10px 12px', fontSize: '12px', color: '#6b7280' }}>{row.party || '—'}</td>
                <td style={{ padding: '10px 12px', fontSize: '12px', color: '#374151' }}>{row.voucher}</td>
                <td style={{ padding: '10px 12px', fontSize: '12px', color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{row.voucherNo}</td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#dc2626', textAlign: 'right' }}>
                  {row.debit > 0 ? formatINR(row.debit) : '—'}
                </td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#15803d', textAlign: 'right' }}>
                  {row.credit > 0 ? formatINR(row.credit) : '—'}
                </td>
                <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', textAlign: 'right' }}>
                  {formatINR(row.balance)}
                </td>
                <td style={{ padding: '10px 12px', fontSize: '12px', color: '#9ca3af' }}>{row.remarks || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
