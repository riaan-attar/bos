import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const formatINR = (num) => {
  if (num === 0) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
};

const SUPPLIERS = [
  { id: 'SUPP-INV-001', name: 'Shree Cement Ltd', group: 'Raw Material', country: 'India', taxId: '27AABCS1234F1Z5', outstanding: 0, status: 'Active' },
  { id: 'SUPP-INV-002', name: 'Tata Steel', group: 'Raw Material', country: 'India', taxId: '27AAACT1234F1Z5', outstanding: 162500, status: 'Active' },
  { id: 'SUPP-INV-003', name: 'Kajaria Ceramics', group: 'Raw Material', country: 'India', taxId: '27AAACK1234F1Z5', outstanding: 275000, status: 'Active' },
  { id: 'SUPP-INV-004', name: 'Asian Paints', group: 'Raw Material', country: 'India', taxId: '27AAACA1234F1Z5', outstanding: 0, status: 'Active' },
  { id: 'SUPP-INV-005', name: 'Finolex Cables', group: 'Equipment', country: 'India', taxId: '27AAACF1234F1Z5', outstanding: 84000, status: 'Active' },
  { id: 'SUPP-INV-006', name: 'Local Sand Supplier', group: 'Raw Material', country: 'India', taxId: 'AAALS1234B', outstanding: 0, status: 'Active' },
];

function Modal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '600px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>New Supplier</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div style={{ gridColumn: 'span 3' }}>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Supplier Name *</label>
            <input type="text" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Supplier Group</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Raw Material</option><option>Services</option><option>Equipment</option><option>Subcontractor</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Country</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>India</option><option>Other</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Tax ID / GSTIN</label>
            <input type="text" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Email</label>
            <input type="email" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Phone</label>
            <input type="tel" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div style={{ gridColumn: 'span 3' }}>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Address</label>
            <textarea rows={2} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', resize: 'vertical', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', background: '#ffffff', color: '#374151' }}>Cancel</button>
          <button style={{ padding: '8px 20px', background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default function Supplier() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Supplier</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Supplier
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'Supplier Name', 'Supplier Group', 'Country', 'Tax ID', 'Outstanding', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUPPLIERS.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} style={{ cursor: 'pointer' }} />
                </td>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{s.name}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{s.group}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{s.country}</td>
                <td style={{ padding: '12px 14px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{s.taxId}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: s.outstanding === 0 ? '#15803d' : '#dc2626' }}>
                  {formatINR(s.outstanding)}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: '#dcfce7', color: '#15803d' }}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
