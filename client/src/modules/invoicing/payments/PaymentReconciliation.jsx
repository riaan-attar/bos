import React, { useState } from 'react';

export default function PaymentReconciliation() {
  const [partyType, setPartyType] = useState('Customer');

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>Payment Reconciliation</h1>

      {/* Form Card */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '24px', marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Party Type</label>
            <select value={partyType} onChange={e => setPartyType(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Customer</option><option>Supplier</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Party</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              {partyType === 'Customer'
                ? ['Mohan Kulkarni', 'Vikram Industries', 'Sunita Bhosale', 'Anita Desai', 'Rajesh Sharma'].map(c => <option key={c}>{c}</option>)
                : ['Shree Cement Ltd', 'Tata Steel', 'Kajaria Ceramics', 'Asian Paints', 'Finolex Cables', 'Local Sand Supplier'].map(s => <option key={s}>{s}</option>)
              }
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Account</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Accounts Receivable</option>
              <option>Accounts Payable</option>
            </select>
          </div>
        </div>
        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Get Unreconciled Entries
        </button>
      </div>

      {/* Unreconciled Payments Table */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>Unreconciled Payments</h2>
        <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', padding: '32px', border: '1px dashed #e5e7eb', borderRadius: '6px' }}>
          Select party and click "Get Unreconciled Entries" to load payments
        </div>
      </div>

      {/* Invoices Table */}
      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 12px 0' }}>Invoices</h2>
        <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'center', padding: '32px', border: '1px dashed #e5e7eb', borderRadius: '6px' }}>
          Outstanding invoices will appear here
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Reconcile
        </button>
      </div>
    </div>
  );
}
