import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const PAYMENT_TYPE_STYLES = {
  Receive: { bg: '#dcfce7', color: '#15803d' },
  Pay: { bg: '#fee2e2', color: '#dc2626' },
  'Internal Transfer': { bg: '#dbeafe', color: '#1d4ed8' },
};

const STATUS_STYLES = {
  Submitted: { bg: '#dcfce7', color: '#15803d' },
  Draft: { bg: '#f3f4f6', color: '#6b7280' },
};

const PAYMENT_ENTRIES = [
  { id: 'PAY-2026-00001', type: 'Receive', party: 'Mohan Kulkarni', amount: 4800000, mode: 'Bank Transfer', date: '28/03/2026', status: 'Submitted' },
  { id: 'PAY-2026-00002', type: 'Receive', party: 'Vikram Industries', amount: 12500000, mode: 'Cheque', date: '15/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00003', type: 'Pay', party: 'Shree Cement Ltd', amount: 190000, mode: 'Bank Transfer', date: '18/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00004', type: 'Pay', party: 'Asian Paints', amount: 90000, mode: 'Bank Transfer', date: '08/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00005', type: 'Receive', party: 'Rajesh Sharma', amount: 4250000, mode: 'Bank Transfer', date: '10/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00006', type: 'Pay', party: 'Tata Steel', amount: 162500, mode: 'Cheque', date: '20/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00007', type: 'Pay', party: 'Local Sand Supplier', amount: 45000, mode: 'Cash', date: '03/06/2026', status: 'Submitted' },
  { id: 'PAY-2026-00008', type: 'Receive', party: 'Mohan Kulkarni', amount: 250000, mode: 'Bank Transfer', date: '25/02/2026', status: 'Submitted' },
];

function Modal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '640px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>New Payment Entry</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Payment Type</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                <option>Receive</option><option>Pay</option><option>Internal Transfer</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Payment Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Party Type</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                <option>Customer</option><option>Supplier</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Party</label>
              <input type="text" placeholder="Select or type party..." style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Paid Amount *</label>
              <input type="number" placeholder="0.00" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Mode of Payment</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                <option>Cash</option><option>Bank Transfer</option><option>Cheque</option><option>UPI</option><option>NEFT</option><option>RTGS</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Account Paid From</label>
              <input type="text" placeholder="e.g. Bank - HDFC" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Account Paid To</label>
              <input type="text" placeholder="e.g. Accounts Receivable" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Reference / Cheque No.</label>
              <input type="text" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Remarks</label>
              <textarea rows={2} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
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

export default function PaymentEntry() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Payment Entry</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Payment Entry
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'ID', 'Payment Type', 'Party', 'Amount', 'Mode', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENT_ENTRIES.map((pe) => {
              const pt = PAYMENT_TYPE_STYLES[pe.type] || PAYMENT_TYPE_STYLES.Receive;
              const st = STATUS_STYLES[pe.status] || STATUS_STYLES.Draft;
              return (
                <tr key={pe.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <input type="checkbox" checked={selected.includes(pe.id)} onChange={() => toggleSelect(pe.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{pe.id}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: pt.bg, color: pt.color }}>{pe.type}</span>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{pe.party}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{formatINR(pe.amount)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#6b7280' }}>{pe.mode}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{pe.date}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: st.bg, color: st.color }}>{pe.status}</span>
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
