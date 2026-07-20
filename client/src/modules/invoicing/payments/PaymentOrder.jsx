import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const formatINR = (num) => '₹' + num.toLocaleString('en-IN');

const PAYMENT_ORDERS = [
  { id: 'PO-2026-00001', account: 'Bank - HDFC', amount: 190000, date: '17/06/2026', status: 'Submitted' },
  { id: 'PO-2026-00002', account: 'Bank - HDFC', amount: 90000, date: '07/06/2026', status: 'Submitted' },
  { id: 'PO-2026-00003', account: 'Cash', amount: 45000, date: '02/06/2026', status: 'Draft' },
];

const STATUS_STYLES = {
  Submitted: { bg: '#dcfce7', color: '#15803d' },
  Draft: { bg: '#f3f4f6', color: '#6b7280' },
};

export default function PaymentOrder() {
  const [selected, setSelected] = useState([]);
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Payment Order</h1>
        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={14} /> Add Payment Order
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['', 'ID', 'Account', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: h === '' ? 'center' : 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENT_ORDERS.map((po) => {
              const st = STATUS_STYLES[po.status] || STATUS_STYLES.Draft;
              return (
                <tr key={po.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                    <input type="checkbox" checked={selected.includes(po.id)} onChange={() => toggleSelect(po.id)} style={{ cursor: 'pointer' }} />
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 600, color: '#3b82f6', fontFamily: 'monospace', cursor: 'pointer' }}>{po.id}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{po.account}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{formatINR(po.amount)}</td>
                  <td style={{ padding: '12px 14px', fontSize: '13px', color: '#374151' }}>{po.date}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '10px', background: st.bg, color: st.color }}>{po.status}</span>
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
