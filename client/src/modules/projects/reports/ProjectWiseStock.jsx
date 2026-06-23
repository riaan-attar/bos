import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const CHART_DATA = [
  { name: 'Gangapur Phase 1', Cement: 400, Steel: 250, Bricks: 300, Sand: 200, Tiles: 150 },
  { name: 'Nashik Villas', Cement: 200, Steel: 150, Bricks: 100, Sand: 120, Tiles: 300 },
  { name: 'Satpur Complex', Cement: 600, Steel: 400, Bricks: 500, Sand: 350, Tiles: 200 },
  { name: 'Ozar Township', Cement: 150, Steel: 100, Bricks: 200, Sand: 100, Tiles: 50 },
];

const TABLE_DATA = [
  { item: 'UltraTech Cement 50kg', proj: 'Gangapur Heights Phase 1', unit: 'Bags', open: 500, in: 200, out: 300, close: 400, val: '₹1,60,000', status: 'OK' },
  { item: 'TMT Steel Bars 12mm', proj: 'Satpur Commercial Complex', unit: 'Tonnes', open: 50, in: 20, out: 40, close: 30, val: '₹18,00,000', status: 'OK' },
  { item: 'Red Bricks Standard', proj: 'Nashik Road Villas', unit: 'Thousands', open: 150, in: 0, out: 100, close: 50, val: '₹3,50,000', status: 'Low' },
  { item: 'River Sand', proj: 'Gangapur Heights Phase 1', unit: 'Brass', open: 20, in: 10, out: 25, close: 5, val: '₹25,000', status: 'Critical' },
  { item: 'Kajaria Floor Tiles', proj: 'Nashik Road Villas', unit: 'Boxes', open: 400, in: 100, out: 200, close: 300, val: '₹2,40,000', status: 'OK' },
  { item: 'Jindal PVC Pipes', proj: 'Satpur Commercial Complex', unit: 'Meters', open: 1000, in: 500, out: 1200, close: 300, val: '₹45,000', status: 'Low' },
  { item: 'Birla White Putty', proj: 'Ozar Township', unit: 'Bags', open: 100, in: 0, out: 95, close: 5, val: '₹4,000', status: 'Critical' },
  { item: 'Teak Wood Doors', proj: 'Nashik Road Villas', unit: 'Nos', open: 50, in: 0, out: 30, close: 20, val: '₹4,00,000', status: 'OK' },
  { item: 'Asian Paints Apex', proj: 'Gangapur Heights Phase 1', unit: 'Liters', open: 200, in: 100, out: 250, close: 50, val: '₹15,000', status: 'Low' },
  { item: 'Electrical Wire 2.5mm', proj: 'Satpur Commercial Complex', unit: 'Coils', open: 100, in: 50, out: 140, close: 10, val: '₹12,000', status: 'Critical' },
];

const StatCard = ({ label, value }) => (
  <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px 20px', flex: 1 }}>
    <div style={{ fontSize: '24px', fontWeight: 700, color: '#1a1a2e' }}>{value}</div>
    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{label}</div>
  </div>
);

const ChartCard = ({ title, children, height }) => (
  <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px 20px', flex: 1 }}>
    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', marginBottom: '16px' }}>{title}</div>
    <div style={{ height }}>{children}</div>
  </div>
);

export default function ProjectWiseStock() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Project Wise Stock Tracking</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Export</button>
        </div>
      </div>

      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <AlertTriangle color="#dc2626" size={16} />
        <span style={{ color: '#dc2626', fontSize: '13px', fontWeight: 500 }}>3 items are running low on stock</span>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <StatCard label="Total Items" value="24" />
        <StatCard label="Low Stock Alerts" value="3" />
        <StatCard label="Total Value" value="₹12,40,000" />
        <StatCard label="Used This Month" value="8" />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <ChartCard title="Stock by Project" height="280px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} cursor={{ fill: '#f3f4f6' }} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
              <Bar dataKey="Cement" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Steel" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Bricks" stackId="a" fill="#ef4444" />
              <Bar dataKey="Sand" stackId="a" fill="#22c55e" />
              <Bar dataKey="Tiles" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Item', 'Project', 'Unit', 'Opening', 'Inward', 'Outward', 'Closing', 'Value', 'Status'].map(col => (
                <th key={col} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e5e7eb' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.item}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.proj}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#6b7280' }}>{row.unit}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.open}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#22c55e', fontWeight: 500 }}>{row.in > 0 ? `+${row.in}` : row.in}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#ef4444', fontWeight: 500 }}>{row.out > 0 ? `-${row.out}` : row.out}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 600 }}>{row.close}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.val}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ 
                    background: row.status === 'OK' ? '#dcfce7' : row.status === 'Low' ? '#fef9c3' : '#fee2e2', 
                    color: row.status === 'OK' ? '#15803d' : row.status === 'Low' ? '#a16207' : '#dc2626',
                    padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 500 
                  }}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
