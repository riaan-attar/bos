import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Download, AlertTriangle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_DATA = [];

const FALLBACK_ITEMS = [];
const FALLBACK_WAREHOUSES = [];

export default function StockLedger() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState(FALLBACK_ITEMS);
  const [warehouses, setWarehouses] = useState(FALLBACK_WAREHOUSES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [itemsRes, whRes] = await Promise.all([
        axios.get(`${API_BASE}/api/stock/items`),
        axios.get(`${API_BASE}/api/stock/warehouses`),
      ]);
      if (Array.isArray(itemsRes.data) && itemsRes.data.length > 0) {
        setItems(itemsRes.data.map(i => i.itemName || i.name));
      }
      if (Array.isArray(whRes.data) && whRes.data.length > 0) {
        setWarehouses(whRes.data.map(w => w.name));
      }
      setData(FALLBACK_DATA);
    } catch {
      setData(FALLBACK_DATA);
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

  if (error) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#dc2626', fontSize: 13, gap: 8 }}>
      <AlertTriangle size={24} />
      {error}
      <button onClick={fetchData} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 14px', fontSize: 12, color: '#374151', cursor: 'pointer' }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Stock Ledger</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="date" defaultValue="2026-06-01" style={{ padding: '6px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)' }} />
          <input type="date" defaultValue="2026-06-30" style={{ padding: '6px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)' }} />
          <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <select style={{ padding: '8px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', minWidth: '180px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)' }}>
          <option value="">All Items</option>
          {items.map(i => <option key={i}>{i}</option>)}
        </select>
        <select style={{ padding: '8px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', minWidth: '180px', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)' }}>
          <option value="">All Warehouses</option>
          {warehouses.map(w => <option key={w}>{w}</option>)}
        </select>
        <button style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} /> Apply Filter
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
            {data.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.date}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.item}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.voucherType}</td>
                <td style={{ padding: '12px 16px', color: '#3b82f6', cursor: 'pointer' }}>{row.voucherNo}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: row.qtyIn > 0 ? '#15803d' : '#9ca3af', fontWeight: row.qtyIn > 0 ? 600 : 400 }}>
                  {row.qtyIn > 0 ? `+${row.qtyIn}` : '—'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right', color: row.qtyOut > 0 ? '#dc2626' : '#9ca3af', fontWeight: row.qtyOut > 0 ? 600 : 400 }}>
                  {row.qtyOut > 0 ? `-${row.qtyOut}` : '—'}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 500 }}>{(row.balanceQty || 0).toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>₹{row.rate}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{(row.value || 0).toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
