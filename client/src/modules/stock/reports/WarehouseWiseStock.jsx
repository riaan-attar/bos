import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';
import {
  ResponsiveContainer as ChartContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip
} from 'recharts';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_WAREHOUSES = [
  { id: 'WH-001', name: 'Main Warehouse - BID', stockValue: 2150000 },
  { id: 'WH-002', name: 'Gangapur Site Store', stockValue: 980000 },
  { id: 'WH-003', name: 'Nashik Road Store', stockValue: 620000 },
  { id: 'WH-004', name: 'Satpur Site Store', stockValue: 340000 },
  { id: 'WH-005', name: 'Finished Goods - BID', stockValue: 460000 },
];

const FALLBACK_ITEMS = [
  { itemName: 'Portland Cement', warehouse: 'Gangapur Site Store', uom: 'Bag', currentStock: 380, rate: 380 },
  { itemName: 'Steel TMT Bars 12mm', warehouse: 'Gangapur Site Store', uom: 'KG', currentStock: 2200, rate: 65 },
  { itemName: 'Red Clay Bricks', warehouse: 'Nashik Road Store', uom: 'Nos', currentStock: 18000, rate: 8 },
  { itemName: 'River Sand', warehouse: 'Satpur Site Store', uom: 'CFT', currentStock: 750, rate: 45 },
  { itemName: 'Ceramic Floor Tiles', warehouse: 'Nashik Road Store', uom: 'SqFt', currentStock: 3200, rate: 55 },
  { itemName: 'PVC Pipes 4 inch', warehouse: 'Gangapur Site Store', uom: 'Nos', currentStock: 45, rate: 320 },
  { itemName: 'Electrical Wire 4mm', warehouse: 'Main Warehouse - BID', uom: 'Mtr', currentStock: 1800, rate: 28 },
  { itemName: 'Granite Slabs', warehouse: 'Main Warehouse - BID', uom: 'SqFt', currentStock: 1100, rate: 120 },
  { itemName: 'Paint - Exterior', warehouse: 'Nashik Road Store', uom: 'Litre', currentStock: 320, rate: 180 },
  { itemName: 'Plywood 19mm', warehouse: 'Main Warehouse - BID', uom: 'Sheet', currentStock: 95, rate: 1800 },
];

function StatCard({ title, value }) {
  return (
    <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
      <h3 style={{ fontSize: '13px', color: 'var(--text-secondary, #6b7280)', margin: '0 0 8px 0', fontWeight: 500 }}>{title}</h3>
      <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary, #1a1a2e)' }}>{value}</div>
    </div>
  );
}

const formatY = (value) => {
  if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)} K`;
  return value;
};

export default function WarehouseWiseStock() {
  const [warehouses, setWarehouses] = useState(FALLBACK_WAREHOUSES);
  const [items, setItems] = useState(FALLBACK_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [whRes, itemsRes] = await Promise.all([
        axios.get(`${API_BASE}/api/stock/warehouses`),
        axios.get(`${API_BASE}/api/stock/items`),
      ]);
      if (Array.isArray(whRes.data) && whRes.data.length > 0) setWarehouses(whRes.data);
      if (Array.isArray(itemsRes.data) && itemsRes.data.length > 0) setItems(itemsRes.data);
    } catch {
      // use fallbacks
    } finally {
      setLoading(false);
    }
  };

  const chartData = warehouses.map(w => ({
    warehouse: (w.name || '').split(' - ')[0].substring(0, 12),
    value: parseFloat(w.stockValue) || 0,
  }));

  const totalValue = warehouses.reduce((sum, w) => sum + (parseFloat(w.stockValue) || 0), 0);

  const tableData = items.map(item => {
    const qty = parseFloat(item.currentStock) || 0;
    const rate = parseFloat(item.rate) || 0;
    const value = qty * rate;
    return {
      warehouse: item.warehouse || item.defaultWarehouse || '—',
      item: item.itemName || item.name || '—',
      uom: item.uom || '—',
      qty,
      rate,
      value,
      percent: totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : '0.0',
    };
  });

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#6b7280', fontSize: 13, gap: 8 }}>
      <div style={{ width: 20, height: 20, border: '2px solid #e5e7eb', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      Loading...
    </div>
  );

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Warehouse Wise Stock Value</h1>
        <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
          <Download size={14} /> Export
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Total Warehouses" value={warehouses.length} />
        <StatCard title="Total Items" value={items.length} />
        <StatCard title="Total Value" value={`₹${totalValue.toLocaleString('en-IN')}`} />
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        <ChartContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border-color, #e5e7eb)" />
            <XAxis dataKey="warehouse" tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="value" fill="#e879a0" radius={[2, 2, 0, 0]}>
              <LabelList dataKey="value" position="top" formatter={formatY} style={{ fontSize: '11px', fill: 'var(--text-secondary, #6b7280)' }} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Warehouse</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>UOM</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Value</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>% of Total</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.warehouse}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.item}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.uom}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>{row.qty.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>₹{row.rate.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 500 }}>₹{row.value.toLocaleString('en-IN')}</td>
                <td style={{ padding: '12px 16px', color: '#6b7280', textAlign: 'right' }}>{row.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
