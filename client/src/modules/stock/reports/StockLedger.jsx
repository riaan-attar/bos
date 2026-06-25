import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, Download, AlertTriangle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_DATA = [
  { date: '01/06/2026', item: 'Portland Cement', voucherType: 'Purchase Receipt', voucherNo: 'PRC-2026-00001', qtyIn: 200, qtyOut: 0, balanceQty: 380, rate: 380, value: 76000, warehouse: 'Gangapur Site Store' },
  { date: '03/06/2026', item: 'Portland Cement', voucherType: 'Stock Entry', voucherNo: 'STE-2026-00002', qtyIn: 0, qtyOut: 50, balanceQty: 330, rate: 380, value: 19000, warehouse: 'Gangapur Site Store' },
  { date: '05/06/2026', item: 'Steel TMT Bars 12mm', voucherType: 'Purchase Receipt', voucherNo: 'PRC-2026-00002', qtyIn: 2000, qtyOut: 0, balanceQty: 4200, rate: 65, value: 130000, warehouse: 'Gangapur Site Store' },
  { date: '07/06/2026', item: 'Ceramic Floor Tiles', voucherType: 'Purchase Receipt', voucherNo: 'PRC-2026-00003', qtyIn: 2000, qtyOut: 0, balanceQty: 5200, rate: 55, value: 110000, warehouse: 'Nashik Road Store' },
  { date: '08/06/2026', item: 'Ceramic Floor Tiles', voucherType: 'Delivery Note', voucherNo: 'DN-2026-00001', qtyIn: 0, qtyOut: 500, balanceQty: 4700, rate: 55, value: 27500, warehouse: 'Nashik Road Store' },
  { date: '09/06/2026', item: 'River Sand', voucherType: 'Purchase Receipt', voucherNo: 'PRC-2026-00004', qtyIn: 500, qtyOut: 0, balanceQty: 1250, rate: 45, value: 22500, warehouse: 'Satpur Site Store' },
  { date: '10/06/2026', item: 'Portland Cement', voucherType: 'Stock Entry', voucherNo: 'STE-2026-00001', qtyIn: 0, qtyOut: 100, balanceQty: 230, rate: 380, value: 38000, warehouse: 'Main Warehouse - BID' },
  { date: '12/06/2026', item: 'Plywood 19mm', voucherType: 'Delivery Note', voucherNo: 'DN-2026-00002', qtyIn: 0, qtyOut: 20, balanceQty: 280, rate: 1800, value: 36000, warehouse: 'Main Warehouse - BID' },
  { date: '14/06/2026', item: 'Paint - Exterior', voucherType: 'Purchase Receipt', voucherNo: 'PRC-2026-00005', qtyIn: 200, qtyOut: 0, balanceQty: 520, rate: 180, value: 36000, warehouse: 'Nashik Road Store' },
  { date: '15/06/2026', item: 'Steel TMT Bars 12mm', voucherType: 'Stock Entry', voucherNo: 'STE-2026-00004', qtyIn: 0, qtyOut: 800, balanceQty: 3400, rate: 65, value: 52000, warehouse: 'Gangapur Site Store' },
  { date: '16/06/2026', item: 'Electrical Wire 4mm', voucherType: 'Purchase Receipt', voucherNo: 'PRC-2026-00006', qtyIn: 1000, qtyOut: 0, balanceQty: 2800, rate: 28, value: 28000, warehouse: 'Main Warehouse - BID' },
  { date: '17/06/2026', item: 'Granite Slabs', voucherType: 'Delivery Note', voucherNo: 'DN-2026-00003', qtyIn: 0, qtyOut: 300, balanceQty: 800, rate: 120, value: 36000, warehouse: 'Nashik Road Store' },
  { date: '18/06/2026', item: 'PVC Pipes 4 inch', voucherType: 'Stock Entry', voucherNo: 'STE-2026-00006', qtyIn: 0, qtyOut: 10, balanceQty: 35, rate: 320, value: 3200, warehouse: 'Nashik Road Store' },
  { date: '19/06/2026', item: 'Portland Cement', voucherType: 'Stock Entry', voucherNo: 'STE-2026-00008', qtyIn: 150, qtyOut: 0, balanceQty: 380, rate: 380, value: 57000, warehouse: 'Gangapur Site Store' },
  { date: '20/06/2026', item: 'Red Clay Bricks', voucherType: 'Stock Entry', voucherNo: 'STE-2026-00003', qtyIn: 5000, qtyOut: 0, balanceQty: 23000, rate: 8, value: 40000, warehouse: 'Main Warehouse - BID' },
];

const FALLBACK_ITEMS = ['Portland Cement', 'Steel TMT Bars 12mm', 'Red Clay Bricks', 'River Sand', 'Ceramic Floor Tiles', 'PVC Pipes 4 inch', 'Electrical Wire 4mm', 'Granite Slabs', 'Paint - Exterior', 'Plywood 19mm'];
const FALLBACK_WAREHOUSES = ['Main Warehouse - BID', 'Gangapur Site Store', 'Nashik Road Store', 'Satpur Site Store', 'Finished Goods - BID'];

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
