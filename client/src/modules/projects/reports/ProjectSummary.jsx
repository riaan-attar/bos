import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const PIE_DATA = [
  { name: 'Completed', value: 1, color: '#22c55e' },
  { name: 'In Progress', value: 2, color: '#3b82f6' },
  { name: 'On Hold', value: 0, color: '#f59e0b' },
  { name: 'Overdue', value: 1, color: '#ef4444' }
];

const BAR_DATA = [
  { name: 'Gangapur Heights', progress: 65 },
  { name: 'Nashik Rd Villas', progress: 90 },
  { name: 'Satpur Complex', progress: 35 },
  { name: 'Ozar Township', progress: 20 }
];

const TABLE_DATA = [
  { project: 'Gangapur Heights Phase 1', type: 'Residential', status: 'In Progress', start: '01/01/2026', end: '31/12/2026', comp: 65, tasks: 45, overdue: 2 },
  { project: 'Nashik Road Villas', type: 'Residential', status: 'Completed', start: '15/05/2025', end: '10/06/2026', comp: 100, tasks: 32, overdue: 0 },
  { project: 'Satpur Commercial Complex', type: 'Commercial', status: 'Overdue', start: '10/01/2026', end: '01/06/2026', comp: 35, tasks: 28, overdue: 5 },
  { project: 'Ozar Township', type: 'Residential', status: 'In Progress', start: '01/03/2026', end: '31/12/2027', comp: 20, tasks: 120, overdue: 0 },
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

export default function ProjectSummary() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Project Summary</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', outline: 'none' }} />
          <input type="date" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', outline: 'none' }} />
          <button style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Export</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <StatCard label="Total Projects" value={4} />
        <StatCard label="Completed" value={1} />
        <StatCard label="In Progress" value={2} />
        <StatCard label="Overdue" value={1} />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <ChartCard title="Project Status" height="280px">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                {PIE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#6b7280' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Project Progress" height="280px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BAR_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} angle={-25} textAnchor="end" />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#1a1a2e' }} cursor={{ fill: '#f3f4f6' }} />
              <Bar dataKey="progress" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              {['Project Name', 'Type', 'Status', 'Start Date', 'End Date', '% Complete', 'Tasks', 'Overdue Tasks'].map(col => (
                <th key={col} style={{ padding: '10px 14px', fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #e5e7eb' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>{row.project}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.type}</td>
                <td style={{ padding: '10px 14px' }}>
                  <span style={{ 
                    background: row.status === 'In Progress' ? '#dbeafe' : row.status === 'Completed' ? '#dcfce7' : '#fee2e2', 
                    color: row.status === 'In Progress' ? '#1d4ed8' : row.status === 'Completed' ? '#15803d' : '#dc2626',
                    padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 500 
                  }}>{row.status}</span>
                </td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.start}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.end}</td>
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '80px', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${row.comp}%`, height: '100%', background: row.comp > 80 ? '#22c55e' : row.comp > 50 ? '#3b82f6' : row.comp > 25 ? '#f59e0b' : '#ef4444' }} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>{row.comp}%</span>
                  </div>
                </td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: '#374151' }}>{row.tasks}</td>
                <td style={{ padding: '10px 14px', fontSize: '13px', color: row.overdue > 0 ? '#dc2626' : '#374151', fontWeight: row.overdue > 0 ? 600 : 400 }}>{row.overdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
