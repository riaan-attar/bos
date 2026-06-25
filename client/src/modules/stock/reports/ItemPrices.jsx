import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_DATA = [];

const getPriceChangeDisplay = (change) => {
  if (change > 0) return { text: `↑ +${change}%`, color: '#dc2626' };
  if (change < 0) return { text: `↓ ${change}%`, color: '#15803d' };
  return { text: '— 0%', color: '#9ca3af' };
};

export default function ItemPrices() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/stock/items`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        // Map API items to the expected format
        const mapped = res.data.map(item => ({
          item: item.itemName || item.name || '—',
          itemGroup: item.itemGroup || '—',
          uom: item.uom || '—',
          standardRate: parseFloat(item.rate) || 0,
          lastPurchaseRate: parseFloat(item.lastPurchaseRate) || parseFloat(item.rate) || 0,
          priceChange: parseFloat(item.priceChange) || 0,
          lastUpdated: item.lastUpdated || item.updatedAt?.split('T')[0] || '—',
        }));
        setData(mapped);
      }
    } catch {
      // use fallback
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#6b7280', fontSize: 13, gap: 8 }}>
      <div style={{ width: 20, height: 20, border: '2px solid #e5e7eb', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      Loading...
    </div>
  );

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Item Prices</h1>
        <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
          <Download size={14} /> Export
        </button>
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
            {data.map((row, i) => {
              const { text, color } = getPriceChangeDisplay(row.priceChange);
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.item}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.itemGroup}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.uom}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 500 }}>
                    ₹{(parseFloat(row.standardRate) || 0).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>
                    ₹{(parseFloat(row.lastPurchaseRate) || 0).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color, fontWeight: row.priceChange !== 0 ? 600 : 400 }}>
                    {text}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.lastUpdated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
