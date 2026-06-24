import React from 'react';
import { Download } from 'lucide-react';
import {
  ResponsiveContainer as ChartContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { MOCK_ITEMS, MOCK_WAREHOUSES } from '../stockData';

function StatCard({ title, value }) {
  return (
    <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '16px 20px' }}>
      <h3 style={{ fontSize: '13px', color: 'var(--text-secondary, #6b7280)', margin: '0 0 8px 0', fontWeight: 500 }}>{title}</h3>
      <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary, #1a1a2e)' }}>{value}</div>
    </div>
  );
}

const formatY = (value) => {
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};

export default function StockBalance() {
  
  const chartData = MOCK_WAREHOUSES.map(w => ({
    warehouse: w.name.split(' - ')[0],
    opening: w.stockValue * 0.8,
    closing: w.stockValue
  }));

  const mockData = MOCK_ITEMS.map(item => {
    const inQty = Math.floor(item.openingStock * 0.4);
    const outQty = Math.floor(item.openingStock * 0.2);
    return {
      ...item,
      inQty,
      outQty,
      closingQty: item.openingStock + inQty - outQty,
      closingValue: (item.openingStock + inQty - outQty) * item.rate
    };
  });

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Stock Balance</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
           <input type="month" defaultValue="2026-06" style={{ padding: '6px 12px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', outline: 'none' }} />
           <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Opening Value" value="₹38,50,000" />
        <StatCard title="Incoming Value" value="₹12,40,000" />
        <StatCard title="Outgoing Value" value="₹7,30,000" />
        <StatCard title="Closing Value" value="₹43,60,000" />
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: '0 0 20px 0' }}>Opening vs Closing by Warehouse</h3>
        <ChartContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border-color, #e5e7eb)" />
            <XAxis dataKey="warehouse" tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            <Bar dataKey="opening" name="Opening" fill="#9ca3af" radius={[2, 2, 0, 0]} />
            <Bar dataKey="closing" name="Closing" fill="#e879a0" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>UOM</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Opening Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>In Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Out Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Closing Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Closing Value</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Warehouse</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.uom}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>{row.openingStock.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: '#15803d', textAlign: 'right' }}>{row.inQty.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: '#dc2626', textAlign: 'right' }}>{row.outQty.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 600 }}>{row.closingQty.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{row.closingValue.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
