import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const STATUS_STYLES = {
  Submitted: { bg: '#dcfce7', color: '#15803d' },
  Draft: { bg: '#f3f4f6', color: '#6b7280' },
  Cancelled: { bg: '#fee2e2', color: '#dc2626' },
};

const CREDIT_NOTES = [
  { id: 'CRN-2026-00001', customer: 'Vikram Industries', returnAgainst: 'SINV-2026-00002', amount: 50000, date: '18/06/2026', status: 'Submitted' },
  { id: 'CRN-2026-00002', customer: 'Mohan Kulkarni', returnAgainst: 'SINV-2026-00001', amount: 25000, date: '05/04/2026', status: 'Submitted' },
  { id: 'CRN-2026-00003', customer: 'Rajesh Sharma', returnAgainst: 'SINV-2026-00005', amount: 15000, date: '12/06/2026', status: 'Draft' },
];

const CUSTOMERS = ['Mohan Kulkarni', 'Vikram Industries', 'Sunita Bhosale', 'Anita Desai', 'Rajesh Sharma'];

function Modal({ onClose }) {
  const [items, setItems] = useState([{ desc: '', qty: 1, rate: 0 }]);
  const addItem = () => setItems(p => [...p, { desc: '', qty: 1, rate: 0 }]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '620px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>New Credit Note</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Customer</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                {CUSTOMERS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Return Against Invoice</label>
              <input type="text" placeholder="SINV-2026-..." style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Items</div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Item / Description', 'Qty', 'Rate (₹)'].map(h => (
                      <th key={h} style={{ padding: '8px 10px', fontSize: '11px', color: '#6b7280', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 10px' }}><input style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" defaultValue={1} style={{ width: '60px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" defaultValue={0} style={{ width: '90px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addItem} style={{ margin: '8px 10px', padding: '4px 10px', border: '1px dashed #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#6b7280', cursor: 'pointer', background: 'none' }}>+ Add Item</button>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Reason</label>
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

export default function CreditNote() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Credit Note</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Credit Note
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'ID', 'Customer', 'Return Against', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CREDIT_NOTES.map((cn) => {
              const st = STATUS_STYLES[cn.status] || STATUS_STYLES.Draft;
              return (
                <tr key={cn.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <input type="checkbox" checked={selected.includes(cn.id)} onChange={() => toggleSelect(cn.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{cn.id}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{cn.customer}</td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{cn.returnAgainst}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{formatINR(cn.amount)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{cn.date}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: st.bg, color: st.color }}>{cn.status}</span>
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
