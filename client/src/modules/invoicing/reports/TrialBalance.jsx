import React, { useState } from 'react';

const formatINR = (num) => {
  if (!num) return '—';
  return '₹' + Math.abs(num).toLocaleString('en-IN');
};

const TRIAL_BALANCE = [
  {
    section: 'Assets',
    accounts: [
      { name: 'Cash', openDebit: 415000, openCredit: 0, debit: 500000, credit: 85000, closingDebit: 830000, closingCredit: 0 },
      { name: 'Bank - HDFC', openDebit: 0, openCredit: 0, debit: 10000000, credit: 452500, closingDebit: 9547500, closingCredit: 0 },
      { name: 'Accounts Receivable', openDebit: 0, openCredit: 0, debit: 46750000, credit: 0, closingDebit: 46750000, closingCredit: 0 },
      { name: 'Land & Building', openDebit: 50000000, openCredit: 0, debit: 0, credit: 0, closingDebit: 50000000, closingCredit: 0 },
      { name: 'Machinery', openDebit: 1250000, openCredit: 0, debit: 0, credit: 125000, closingDebit: 1125000, closingCredit: 0 },
      { name: 'Closing Stock', openDebit: 4550000, openCredit: 0, debit: 0, credit: 0, closingDebit: 4550000, closingCredit: 0 },
    ],
  },
  {
    section: 'Liabilities',
    accounts: [
      { name: 'Accounts Payable', openDebit: 0, openCredit: 325000, debit: 280000, credit: 606500, closingDebit: 0, closingCredit: 651500 },
      { name: 'GST Payable', openDebit: 0, openCredit: 0, debit: 0, credit: 125000, closingDebit: 0, closingCredit: 125000 },
      { name: 'Bank Loan', openDebit: 0, openCredit: 25000000, debit: 0, credit: 0, closingDebit: 0, closingCredit: 25000000 },
    ],
  },
  {
    section: 'Income',
    accounts: [
      { name: 'Sales Income', openDebit: 0, openCredit: 0, debit: 0, credit: 7705000, closingDebit: 0, closingCredit: 7705000 },
      { name: 'Other Income', openDebit: 0, openCredit: 0, debit: 0, credit: 250000, closingDebit: 0, closingCredit: 250000 },
    ],
  },
  {
    section: 'Expenses',
    accounts: [
      { name: 'Cost of Goods Sold', openDebit: 2100000, openCredit: 0, debit: 0, credit: 0, closingDebit: 2100000, closingCredit: 0 },
      { name: 'Operating Expenses', openDebit: 850000, openCredit: 0, debit: 85000, credit: 0, closingDebit: 935000, closingCredit: 0 },
      { name: 'Finance Charges', openDebit: 120000, openCredit: 0, debit: 0, credit: 0, closingDebit: 120000, closingCredit: 0 },
      { name: 'Depreciation', openDebit: 0, openCredit: 0, debit: 125000, credit: 0, closingDebit: 125000, closingCredit: 0 },
    ],
  },
  {
    section: 'Equity',
    accounts: [
      { name: 'Capital', openDebit: 0, openCredit: 33488500, debit: 0, credit: 10000000, closingDebit: 0, closingCredit: 43488500 },
    ],
  },
];

const TOTAL = {
  openDebit: TRIAL_BALANCE.flatMap(s => s.accounts).reduce((s, a) => s + a.openDebit, 0),
  openCredit: TRIAL_BALANCE.flatMap(s => s.accounts).reduce((s, a) => s + a.openCredit, 0),
  debit: TRIAL_BALANCE.flatMap(s => s.accounts).reduce((s, a) => s + a.debit, 0),
  credit: TRIAL_BALANCE.flatMap(s => s.accounts).reduce((s, a) => s + a.credit, 0),
  closingDebit: TRIAL_BALANCE.flatMap(s => s.accounts).reduce((s, a) => s + a.closingDebit, 0),
  closingCredit: TRIAL_BALANCE.flatMap(s => s.accounts).reduce((s, a) => s + a.closingCredit, 0),
};

const TH = ({ children, right }) => (
  <th style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: right ? 'right' : 'left', whiteSpace: 'nowrap' }}>
    {children}
  </th>
);

const TD = ({ children, bold, red, right }) => (
  <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: bold ? 700 : 400, color: red ? '#dc2626' : '#374151', textAlign: right ? 'right' : 'left' }}>
    {children}
  </td>
);

export default function TrialBalance() {
  const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Trial Balance</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '12px', color: '#6b7280' }}>As on Date</label>
          <input type="date" value={asOnDate} onChange={e => setAsOnDate(e.target.value)} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '7px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }} />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <TH>Account</TH>
              <TH right>Opening Debit</TH>
              <TH right>Opening Credit</TH>
              <TH right>Debit</TH>
              <TH right>Credit</TH>
              <TH right>Closing Debit</TH>
              <TH right>Closing Credit</TH>
            </tr>
          </thead>
          <tbody>
            {TRIAL_BALANCE.map(section => (
              <>
                {/* Section Header */}
                <tr key={`hdr-${section.section}`} style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                  <td colSpan={7} style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {section.section}
                  </td>
                </tr>
                {/* Accounts */}
                {section.accounts.map((acc, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 12px 10px 24px', fontSize: '13px', color: '#374151' }}>{acc.name}</td>
                    <TD right>{formatINR(acc.openDebit)}</TD>
                    <TD right>{formatINR(acc.openCredit)}</TD>
                    <TD right red={acc.debit > 0}>{formatINR(acc.debit)}</TD>
                    <TD right>{formatINR(acc.credit)}</TD>
                    <TD right bold={acc.closingDebit > 0}>{formatINR(acc.closingDebit)}</TD>
                    <TD right bold={acc.closingCredit > 0}>{formatINR(acc.closingCredit)}</TD>
                  </tr>
                ))}
              </>
            ))}

            {/* Total Row */}
            <tr style={{ backgroundColor: '#f3f4f6', borderTop: '2px solid #e5e7eb' }}>
              <td style={{ padding: '12px', fontSize: '13px', fontWeight: 700, color: '#1a1a2e' }}>TOTAL</td>
              {[TOTAL.openDebit, TOTAL.openCredit, TOTAL.debit, TOTAL.credit, TOTAL.closingDebit, TOTAL.closingCredit].map((val, i) => (
                <td key={i} style={{ padding: '12px', fontSize: '13px', fontWeight: 700, color: '#1a1a2e', textAlign: 'right' }}>
                  {formatINR(val)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
