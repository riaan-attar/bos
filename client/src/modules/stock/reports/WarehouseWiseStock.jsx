import React from 'react';
import { Download } from 'lucide-react';
import {
  ResponsiveContainer as ChartContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList
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
  if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)} K`;
  return value;
};

export default function WarehouseWiseStock() {
  
  const chartData = MOCK_WAREHOUSES.map(w => ({
    warehouse: w.name,
    value: w.stockValue
  }));

  const totalValue = MOCK_WAREHOUSES.reduce((sum, w) => sum + w.stockValue, 0);

  const mockTableData = MOCK_ITEMS.map(item => {
    const value = item.currentStock * item.rate;
    return {
      ...item,
      value: value,
      percent: ((value / totalValue) * 100).toFixed(2)
    };
  });

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Warehouse Wise Stock Value</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Total Warehouses" value="5" />
        <StatCard title="Total Items" value="10" />
        <StatCard title="Total Value" value="₹45,50,000" />
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        <ChartContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--border-color, #e5e7eb)" />
            <XAxis dataKey="warehouse" tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
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
            {mockTableData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.warehouse}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.uom}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>{row.currentStock.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>₹{row.rate.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right', fontWeight: 500 }}>₹{row.value.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>{row.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
