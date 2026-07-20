import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const STATUS_STYLES = {
  Submitted: { bg: '#dcfce7', color: '#15803d' },
  Draft: { bg: '#f3f4f6', color: '#6b7280' },
};

const JOURNAL_ENTRIES = [
  { id: 'JE-2026-00001', type: 'Journal Entry', debitAccount: 'Cash', creditAccount: 'Sales', amount: 500000, date: '01/06/2026', status: 'Submitted' },
  { id: 'JE-2026-00002', type: 'Depreciation', debitAccount: 'Depreciation', creditAccount: 'Fixed Assets', amount: 125000, date: '30/05/2026', status: 'Submitted' },
  { id: 'JE-2026-00003', type: 'Opening Entry', debitAccount: 'Bank', creditAccount: 'Capital', amount: 10000000, date: '01/04/2026', status: 'Submitted' },
  { id: 'JE-2026-00004', type: 'Journal Entry', debitAccount: 'Expenses', creditAccount: 'Cash', amount: 85000, date: '10/06/2026', status: 'Submitted' },
  { id: 'JE-2026-00005', type: 'Journal Entry', debitAccount: 'Accounts Receivable', creditAccount: 'Sales', amount: 8500000, date: '15/06/2026', status: 'Draft' },
];

function Modal({ onClose }) {
  const [rows, setRows] = useState([
    { account: '', debit: '', credit: '', costCenter: '', remarks: '' },
    { account: '', debit: '', credit: '', costCenter: '', remarks: '' },
  ]);

  const addRow = () => setRows(prev => [...prev, { account: '', debit: '', credit: '', costCenter: '', remarks: '' }]);
  const updateRow = (i, field, val) => setRows(prev => { const n = [...prev]; n[i] = { ...n[i], [field]: val }; return n; });

  const totalDebit = rows.reduce((s, r) => s + (parseFloat(r.debit) || 0), 0);
  const totalCredit = rows.reduce((s, r) => s + (parseFloat(r.credit) || 0), 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '800px', maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>New Journal Entry</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Entry Type</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                <option>Journal Entry</option>
                <option>Opening Entry</option>
                <option>Depreciation</option>
                <option>Bank Entry</option>
                <option>Cash Entry</option>
                <option>Credit Card Entry</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
          </div>

          {/* Accounts Table */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Accounting Entries</div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Account', 'Debit (₹)', 'Credit (₹)', 'Cost Center', 'Remarks'].map(h => (
                      <th key={h} style={{ padding: '8px 10px', fontSize: '11px', color: '#6b7280', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 10px' }}><input value={row.account} onChange={e => updateRow(i, 'account', e.target.value)} placeholder="Account name" style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" value={row.debit} onChange={e => updateRow(i, 'debit', e.target.value)} style={{ width: '90px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" value={row.credit} onChange={e => updateRow(i, 'credit', e.target.value)} style={{ width: '90px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input value={row.costCenter} onChange={e => updateRow(i, 'costCenter', e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input value={row.remarks} onChange={e => updateRow(i, 'remarks', e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                    </tr>
                  ))}
                  {/* Totals row */}
                  <tr style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px 10px', fontSize: '12px', fontWeight: 600, color: '#374151' }}>Total</td>
                    <td style={{ padding: '8px 10px', fontSize: '13px', fontWeight: 600, color: '#dc2626' }}>₹{totalDebit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td style={{ padding: '8px 10px', fontSize: '13px', fontWeight: 600, color: '#15803d' }}>₹{totalCredit.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td colSpan={2} style={{ padding: '8px 10px' }}>
                      {!balanced && totalDebit > 0 && <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: 500 }}>⚠ Debit and Credit must be equal</span>}
                      {balanced && totalDebit > 0 && <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 500 }}>✓ Balanced</span>}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button onClick={addRow} style={{ margin: '8px 10px', padding: '4px 10px', border: '1px dashed #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#6b7280', cursor: 'pointer', background: 'none' }}>+ Add Row</button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>User Remark</label>
            <textarea rows={2} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#ffffff', color: '#374151' }}>Cancel</button>
          <button style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#f3f4f6', color: '#374151' }}>Save Draft</button>
          <button style={{ padding: '8px 20px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default function JournalEntry() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Journal Entry</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Journal Entry
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'ID', 'Entry Type', 'Debit Account', 'Credit Account', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JOURNAL_ENTRIES.map((je) => {
              const st = STATUS_STYLES[je.status] || STATUS_STYLES.Draft;
              return (
                <tr key={je.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <input type="checkbox" checked={selected.includes(je.id)} onChange={() => toggleSelect(je.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{je.id}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{je.type}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{je.debitAccount}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{je.creditAccount}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{formatINR(je.amount)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{je.date}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: st.bg, color: st.color }}>{je.status}</span>
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
