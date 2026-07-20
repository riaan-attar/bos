import React from 'react';

export default function UnreconcilePayment() {
  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>Unreconcile Payment</h1>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Voucher Type</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Payment Entry</option>
              <option>Journal Entry</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Voucher No.</label>
            <input type="text" placeholder="e.g. PAY-2026-00001" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
        </div>
        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Get Allocated Entries
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>Allocated Entries</h2>
        <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', padding: '32px', border: '1px dashed #e5e7eb', borderRadius: '6px' }}>
          Select a voucher and click "Get Allocated Entries" to view linked invoices
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ background: '#dc2626', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Unreconcile
        </button>
      </div>
    </div>
  );
}
