import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function RepostAccountingLedger() {
  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 20px 0' }}>Repost Accounting Ledger</h1>

      <div style={{ backgroundColor: '#fef9c3', border: '1px solid #fde047', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <AlertTriangle size={16} color="#a16207" style={{ marginTop: '1px', flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: '13px', color: '#a16207', lineHeight: '1.5' }}>
          This will repost accounting entries. Use with caution. Reposting may take time for large datasets. 
          Please ensure no transactions are being processed during this operation.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Document Type</label>
            <select style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
              <option>Sales Invoice</option>
              <option>Purchase Invoice</option>
              <option>Payment Entry</option>
              <option>Journal Entry</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Document Name</label>
            <input type="text" placeholder="e.g. SINV-2026-00001" style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', backgroundColor: 'var(--control-bg, #ffffff)' }} />
          </div>
        </div>
        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Repost
        </button>
      </div>
    </div>
  );
}
