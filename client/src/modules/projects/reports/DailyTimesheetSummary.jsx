import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const EMP_DATA = [
  { name: 'Amit', hours: 8.5 },
  { name: 'Sneha', hours: 7.0 },
  { name: 'Rahul', hours: 6.5 },
  { name: 'Priya', hours: 5.5 },
  { name: 'Vikram', hours: 5.0 },
];

const PROJ_DATA = [
  { name: 'Gangapur Heights', hours: 12 },
  { name: 'Nashik Villas', hours: 9 },
  { name: 'Satpur Complex', hours: 7 },
  { name: 'Ozar Township', hours: 4.5 },
];

const TABLE_DATA = [
  { emp: 'Amit Kulkarni', proj: 'Gangapur Heights Phase 1', act: 'Site Inspection', hrs: 4.5, rate: '₹2,000', amt: '₹9,000', date: '16/06/2026' },
  { emp: 'Amit Kulkarni', proj: 'Nashik Road Villas', act: 'Client Meeting', hrs: 4.0, rate: '₹1,500', amt: '₹6,000', date: '16/06/2026' },
  { emp: 'Sneha Patil', proj: 'Gangapur Heights Phase 1', act: 'Design & Planning', hrs: 7.0, rate: '₹1,800', amt: '₹12,600', date: '16/06/2026' },
  { emp: 'Rahul Desai', proj: 'Satpur Commercial Complex', act: 'Construction Work', hrs: 6.5, rate: '₹1,200', amt: '₹7,800', date: '16/06/2026' },
  { emp: 'Priya Mehta', proj: 'Nashik Road Villas', act: 'Design & Planning', hrs: 5.5, rate: '₹1,800', amt: '₹9,900', date: '16/06/2026' },
  { emp: 'Vikram Agarwal', proj: 'Ozar Township', act: 'Site Inspection', hrs: 4.5, rate: '₹2,000', amt: '₹9,000', date: '16/06/2026' },
  { emp: 'Vikram Agarwal', proj: 'Satpur Commercial Complex', act: 'Client Meeting', hrs: 0.5, rate: '₹1,500', amt: '₹750', date: '16/06/2026' },
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

export default function DailyTimesheetSummary() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Daily Timesheet Summary</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', outline: 'none' }} />
          <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', outline: 'none' }} />
          <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Export</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <StatCard label="Total Hours Today" value="32.5" />
        <StatCard label="Total Billing" value="₹65,000" />
        <StatCard label="Active Employees" value="8" />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <ChartCard title="Hours by Employee" height="260px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={EMP_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Hours by Project" height="260px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PROJ_DATA} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="hours" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Employee', 'Project', 'Activity', 'Hours', 'Billing Rate', 'Amount', 'Date'].map(col => (
                <th key={col} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e5e7eb' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.emp}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.proj}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.act}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.hrs}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.rate}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.amt}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#6b7280' }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
