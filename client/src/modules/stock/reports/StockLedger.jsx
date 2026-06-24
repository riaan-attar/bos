import React from 'react';
import { Filter, Download } from 'lucide-react';
import { MOCK_ITEMS, MOCK_WAREHOUSES } from '../stockData';

export default function StockLedger() {
  
  // Generate mock ledger entries
  const mockEntries = [];
  const dates = ['01/06/2026', '05/06/2026', '10/06/2026', '12/06/2026', '15/06/2026', '18/06/2026'];
  const types = ['Purchase Receipt', 'Material Transfer', 'Material Issue', 'Delivery Note'];
  
  for(let i=0; i<20; i++) {
    const item = MOCK_ITEMS[i % MOCK_ITEMS.length];
    const type = types[Math.floor(Math.random() * types.length)];
    const isOut = type === 'Material Issue' || type === 'Delivery Note';
    const qtyIn = isOut ? 0 : Math.floor(Math.random() * 100) + 10;
    const qtyOut = isOut ? Math.floor(Math.random() * 50) + 5 : 0;
    const balance = item.currentStock + (qtyIn - qtyOut);
    
    mockEntries.push({
      date: dates[Math.floor(Math.random() * dates.length)],
      item: item.name,
      type: type,
      voucher: `${type.substring(0,2).toUpperCase()}-2026-${(i+1).toString().padStart(3, '0')}`,
      qtyIn: qtyIn,
      qtyOut: qtyOut,
      balance: balance,
      rate: item.rate,
      value: (qtyIn > 0 ? qtyIn : qtyOut) * item.rate,
      warehouse: MOCK_WAREHOUSES[i % MOCK_WAREHOUSES.length].name
    });
  }

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Stock Ledger</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
           <input type="date" defaultValue="2026-06-01" style={{ padding: '6px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', outline: 'none' }} />
           <input type="date" defaultValue="2026-06-30" style={{ padding: '6px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', outline: 'none' }} />
           <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <select style={{ padding: '8px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', minWidth: '180px', outline: 'none' }}>
          <option value="">All Items</option>
          {MOCK_ITEMS.map(i => <option key={i.id}>{i.name}</option>)}
        </select>
        <select style={{ padding: '8px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', minWidth: '180px', outline: 'none' }}>
          <option value="">All Warehouses</option>
           {MOCK_WAREHOUSES.map(w => <option key={w.id}>{w.name}</option>)}
        </select>
        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} /> Filter
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Voucher Type</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Voucher No</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Qty In</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Qty Out</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Balance Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Value</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Warehouse</th>
            </tr>
          </thead>
          <tbody>
            {mockEntries.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.date}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.item}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.type}</td>
                <td style={{ padding: '12px 16px', color: '#3b82f6', cursor: 'pointer' }}>{row.voucher}</td>
                <td style={{ padding: '12px 16px', color: '#15803d', textAlign: 'right', fontWeight: 500 }}>{row.qtyIn > 0 ? `+${row.qtyIn}` : ''}</td>
                <td style={{ padding: '12px 16px', color: '#dc2626', textAlign: 'right', fontWeight: 500 }}>{row.qtyOut > 0 ? `-${row.qtyOut}` : ''}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 500 }}>{row.balance.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>₹{row.rate}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{row.value.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
