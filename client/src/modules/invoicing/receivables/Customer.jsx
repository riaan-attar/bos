import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const formatINR = (num) => {
  if (num === 0) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
};

const CUSTOMERS = [
  { id: 'CUST-INV-001', name: 'Mohan Kulkarni', group: 'Individual', territory: 'Nashik', taxId: 'ABCPK1234D', outstanding: 0, creditLimit: 5000000, status: 'Active' },
  { id: 'CUST-INV-002', name: 'Vikram Industries', group: 'Company', territory: 'Satpur', taxId: '27AABCV1234F1Z5', outstanding: 12500000, creditLimit: 30000000, status: 'Active' },
  { id: 'CUST-INV-003', name: 'Sunita Bhosale', group: 'Individual', territory: 'Nashik Road', taxId: 'BCDPB5678G', outstanding: 6500000, creditLimit: 7000000, status: 'Active' },
  { id: 'CUST-INV-004', name: 'Anita Desai', group: 'Individual', territory: 'Nashik', taxId: 'CDEPA9012H', outstanding: 32000000, creditLimit: 35000000, status: 'Active' },
  { id: 'CUST-INV-005', name: 'Rajesh Sharma', group: 'Individual', territory: 'Nashik', taxId: 'DEFPB3456I', outstanding: 4250000, creditLimit: 9000000, status: 'Active' },
];

function Modal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '600px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>New Customer</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Customer Name *', type: 'text', span: 3 },
          ].map(f => (
            <div key={f.label} style={{ gridColumn: f.span ? `span ${f.span}` : undefined }}>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>{f.label}</label>
              <input type={f.type} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Customer Group</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Individual</option><option>Company</option><option>Builder</option><option>Investor</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Territory</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Nashik</option><option>Pune</option><option>Mumbai</option><option>Other</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Tax ID / PAN</label>
            <input type="text" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Credit Limit</label>
            <input type="number" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
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
            <textarea rows={2} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box', resize: 'vertical', backgroundColor: 'var(--control-bg, #ffffff)' }} />
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

export default function Customer() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Customer</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Customer
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'Customer Name', 'Customer Group', 'Territory', 'Tax ID', 'Outstanding Amount', 'Credit Limit', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} style={{ cursor: 'pointer' }} />
                </td>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{c.name}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{c.group}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{c.territory}</td>
                <td style={{ padding: '12px 14px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{c.taxId}</td>
                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: c.outstanding === 0 ? '#15803d' : '#dc2626' }}>
                  {formatINR(c.outstanding)}
                </td>
                <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{formatINR(c.creditLimit)}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: '#dcfce7', color: '#15803d' }}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
