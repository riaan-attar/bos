import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const BAR_DATA = [
  { name: 'Ozar Township', delayed: 8 },
  { name: 'Satpur Complex', delayed: 3 },
  { name: 'Gangapur Heights', delayed: 2 },
  { name: 'Nashik Villas', delayed: 0 },
];

const PIE_DATA = [
  { name: '1-3 days', value: 4, color: '#f59e0b' },
  { name: '4-7 days', value: 3, color: '#ef4444' },
  { name: '>7 days', value: 4, color: '#7c3aed' },
];

const TABLE_DATA = [
  { task: 'Excavation Work', proj: 'Ozar Township', assign: 'Amit Kulkarni', due: '05/06/2026', delay: 11, status: 'In Progress', prio: 'High' },
  { task: 'Foundation Pouring', proj: 'Ozar Township', assign: 'Rahul Desai', due: '08/06/2026', delay: 8, status: 'Open', prio: 'Urgent' },
  { task: 'Steel Procurement', proj: 'Satpur Commercial Complex', assign: 'Sneha Patil', due: '10/06/2026', delay: 6, status: 'In Progress', prio: 'High' },
  { task: 'PCC Work', proj: 'Ozar Township', assign: 'Vikram Agarwal', due: '12/06/2026', delay: 4, status: 'Open', prio: 'Medium' },
  { task: 'Plumbing Layout', proj: 'Gangapur Heights Phase 1', assign: 'Priya Mehta', due: '12/06/2026', delay: 4, status: 'In Progress', prio: 'High' },
  { task: 'Electrical Wiring', proj: 'Satpur Commercial Complex', assign: 'Amit Kulkarni', due: '14/06/2026', delay: 2, status: 'Open', prio: 'Medium' },
  { task: 'Brickwork 1st Floor', proj: 'Ozar Township', assign: 'Rahul Desai', due: '15/06/2026', delay: 1, status: 'Open', prio: 'Low' },
  { task: 'Waterproofing', proj: 'Gangapur Heights Phase 1', assign: 'Sneha Patil', due: '15/06/2026', delay: 1, status: 'In Progress', prio: 'High' },
  { task: 'Lift Installation', proj: 'Satpur Commercial Complex', assign: 'Vikram Agarwal', due: '01/06/2026', delay: 15, status: 'Blocked', prio: 'Urgent' },
  { task: 'Painting Phase 1', proj: 'Ozar Township', assign: 'Priya Mehta', due: '05/06/2026', delay: 11, status: 'Blocked', prio: 'Medium' },
  { task: 'Flooring', proj: 'Ozar Township', assign: 'Amit Kulkarni', due: '13/06/2026', delay: 3, status: 'Open', prio: 'High' },
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

export default function DelayedTasksSummary() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Delayed Tasks Summary</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Export</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <StatCard label="Total Delayed" value="11" />
        <StatCard label="Critical (>7 days)" value="4" />
        <StatCard label="Avg Delay" value="5.2 days" />
        <StatCard label="Affected Projects" value="3" />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <ChartCard title="Delays by Project" height="260px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} angle={-20} textAnchor="end" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="delayed" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Delay Duration" height="260px">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {PIE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Task', 'Project', 'Assigned To', 'Due Date', 'Days Delayed', 'Status', 'Priority'].map(col => (
                <th key={col} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e5e7eb' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => {
              const delayColor = row.delay > 7 ? '#7c3aed' : row.delay >= 4 ? '#ef4444' : '#f59e0b';
              return (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.task}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.proj}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.assign}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#6b7280' }}>{row.due}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: delayColor, fontWeight: 600 }}>{row.delay} days</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.status}</td>
                  <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.prio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
