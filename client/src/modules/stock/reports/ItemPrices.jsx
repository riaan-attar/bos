import React from 'react';
import { Download } from 'lucide-react';
import { MOCK_ITEMS } from '../stockData';

export default function ItemPrices() {
  
  const mockData = MOCK_ITEMS.map(item => {
    // Generate some mock price changes
    const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
    const lastRate = item.rate * (1 - (change/100));
    
    return {
      ...item,
      lastRate: lastRate.toFixed(2),
      change: change,
      updated: '10/06/2026'
    };
  });

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Item Prices</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item Group</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>UOM</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Standard Rate</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Last Purchase Rate</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Price Change %</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.group}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.uom}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 500 }}>₹{row.rate.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>₹{row.lastRate}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: row.change > 0 ? '#dc2626' : row.change < 0 ? '#15803d' : '#6b7280', fontWeight: row.change !== 0 ? 500 : 400 }}>
                  {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
