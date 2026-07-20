import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const STATUS_STYLES = {
  Paid: { bg: '#dcfce7', color: '#15803d' },
  'Partly Paid': { bg: '#fef9c3', color: '#a16207' },
  Unpaid: { bg: '#fee2e2', color: '#dc2626' },
  Draft: { bg: '#f3f4f6', color: '#6b7280' },
  Cancelled: { bg: '#f3f4f6', color: '#9ca3af' },
};

const SALES_INVOICES = [
  { id: 'SINV-2026-00001', customer: 'Mohan Kulkarni', items: 'Flat 302 - Tower A', amount: 4800000, outstanding: 0, dueDate: '01/04/2026', status: 'Paid' },
  { id: 'SINV-2026-00002', customer: 'Vikram Industries', items: 'Commercial Plot - Satpur', amount: 25000000, outstanding: 12500000, dueDate: '30/06/2026', status: 'Partly Paid' },
  { id: 'SINV-2026-00003', customer: 'Sunita Bhosale', items: 'Villa B-12 Panchavati', amount: 6500000, outstanding: 6500000, dueDate: '31/07/2026', status: 'Unpaid' },
  { id: 'SINV-2026-00004', customer: 'Anita Desai', items: 'Penthouse - Trimbak Road', amount: 32000000, outstanding: 32000000, dueDate: '31/08/2026', status: 'Unpaid' },
  { id: 'SINV-2026-00005', customer: 'Rajesh Sharma', items: '3BHK - Gangapur Road', amount: 8500000, outstanding: 4250000, dueDate: '15/07/2026', status: 'Partly Paid' },
  { id: 'SINV-2026-00006', customer: 'Mohan Kulkarni', items: 'Parking Slot - Tower A', amount: 250000, outstanding: 0, dueDate: '01/03/2026', status: 'Paid' },
];

const CUSTOMERS = ['Mohan Kulkarni', 'Vikram Industries', 'Sunita Bhosale', 'Anita Desai', 'Rajesh Sharma'];

function InvoiceModal({ onClose }) {
  const [items, setItems] = useState([{ desc: '', qty: 1, rate: 0, tax: 18, amount: 0 }]);

  const addItem = () => setItems(prev => [...prev, { desc: '', qty: 1, rate: 0, tax: 18, amount: 0 }]);
  const updateItem = (i, field, val) => {
    setItems(prev => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      next[i].amount = (parseFloat(next[i].qty) || 0) * (parseFloat(next[i].rate) || 0);
      return next;
    });
  };

  const subtotal = items.reduce((s, it) => s + (it.amount || 0), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#ffffff', borderRadius: '10px', width: '720px', maxHeight: '92vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>New Sales Invoice</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Customer</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                {CUSTOMERS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Invoice Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Due Date</label>
              <input type="date" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Payment Terms</label>
              <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
                <option>Immediate</option><option>30 Days</option><option>60 Days</option><option>Custom</option>
              </select>
            </div>
          </div>

          {/* Items table */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Items</div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Item / Description', 'Qty', 'Rate (₹)', 'Tax %', 'Amount'].map(h => (
                      <th key={h} style={{ padding: '8px 10px', fontSize: '11px', color: '#6b7280', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '8px 10px' }}><input value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} style={{ width: '60px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" value={item.rate} onChange={e => updateItem(i, 'rate', e.target.value)} style={{ width: '90px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px' }}><input type="number" value={item.tax} onChange={e => updateItem(i, 'tax', e.target.value)} style={{ width: '50px', border: 'none', outline: 'none', fontSize: '13px', backgroundColor: 'transparent' }} /></td>
                      <td style={{ padding: '8px 10px', fontSize: '13px', fontWeight: 500 }}>₹{item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={addItem} style={{ margin: '8px 10px', padding: '4px 10px', border: '1px dashed #d1d5db', borderRadius: '4px', fontSize: '12px', color: '#6b7280', cursor: 'pointer', background: 'none' }}>+ Add Item</button>
            </div>
          </div>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ minWidth: '240px' }}>
              {[
                { label: 'Subtotal', val: subtotal },
                { label: 'Tax (18%)', val: tax },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '13px', color: '#6b7280' }}>
                  <span>{r.label}</span>
                  <span>₹{r.val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 4px', fontSize: '14px', fontWeight: 700, color: '#1a1a2e', borderTop: '1px solid #e5e7eb', marginTop: '4px' }}>
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Notes</label>
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

export default function SalesInvoice() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {showModal && <InvoiceModal onClose={() => setShowModal(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Sales Invoice</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Sales Invoice
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'ID', 'Customer', 'Items', 'Amount', 'Outstanding', 'Due Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SALES_INVOICES.map((inv) => {
              const st = STATUS_STYLES[inv.status] || STATUS_STYLES.Draft;
              return (
                <tr key={inv.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <input type="checkbox" checked={selected.includes(inv.id)} onChange={() => toggleSelect(inv.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{inv.id}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{inv.customer}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151', maxWidth: '200px' }}>{inv.items}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{formatINR(inv.amount)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: inv.outstanding === 0 ? '#9ca3af' : '#dc2626' }}>
                    {inv.outstanding === 0 ? '—' : formatINR(inv.outstanding)}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{inv.dueDate}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: st.bg, color: st.color }}>{inv.status}</span>
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
