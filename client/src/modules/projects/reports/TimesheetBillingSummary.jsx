import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const BAR_DATA = [
  { name: 'Gangapur', billing: 180000, cost: 140000 },
  { name: 'Nashik', billing: 150000, cost: 112000 },
  { name: 'Satpur', billing: 95000, cost: 74000 },
  { name: 'Ozar', billing: 60000, cost: 42000 },
];

const LINE_DATA = [
  { name: 'Jan', billing: 65000 },
  { name: 'Feb', billing: 78000 },
  { name: 'Mar', billing: 92000 },
  { name: 'Apr', billing: 85000 },
  { name: 'May', billing: 95000 },
  { name: 'Jun', billing: 70000 },
];

const TABLE_DATA = [
  { emp: 'Amit Kulkarni', proj: 'Gangapur Heights Phase 1', hrs: 45, rate: '₹2,000', bill: '₹90,000', cost: '₹67,500', prof: '₹22,500' },
  { emp: 'Amit Kulkarni', proj: 'Nashik Road Villas', hrs: 20, rate: '₹2,000', bill: '₹40,000', cost: '₹30,000', prof: '₹10,000' },
  { emp: 'Sneha Patil', proj: 'Satpur Commercial Complex', hrs: 35, rate: '₹1,500', bill: '₹52,500', cost: '₹35,000', prof: '₹17,500' },
  { emp: 'Rahul Desai', proj: 'Ozar Township', hrs: 40, rate: '₹1,200', bill: '₹48,000', cost: '₹36,000', prof: '₹12,000' },
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

export default function TimesheetBillingSummary() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Timesheet Billing Summary</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', outline: 'none' }} />
          <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', outline: 'none' }} />
          <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Export</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <StatCard label="Total Billed" value="₹4,85,000" />
        <StatCard label="Total Cost" value="₹3,68,000" />
        <StatCard label="Profit" value="₹1,17,000" />
        <StatCard label="Margin" value="24.1%" />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <ChartCard title="Billing vs Cost" height="280px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BAR_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} cursor={{ fill: '#f3f4f6' }} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
              <Bar dataKey="billing" name="Billing" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="cost" name="Cost" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Billing Trend" height="280px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LINE_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} />
              <Line type="monotone" dataKey="billing" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: '#22c55e' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Employee', 'Project', 'Total Hours', 'Billing Rate', 'Total Billing', 'Total Cost', 'Profit'].map(col => (
                <th key={col} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e5e7eb' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.emp}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.proj}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.hrs}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.rate}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>{row.bill}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.cost}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#22c55e', fontWeight: 500 }}>{row.prof}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
