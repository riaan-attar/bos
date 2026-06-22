/**
 * Projects Dashboard — client/src/modules/projects/index.jsx
 * Replicates the Projects home page layout with live context/mock data.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer as ChartContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid
} from 'recharts';
import './projects.css';
import StatCard from '../crm/StatCard';
import ChartCard from '../crm/ChartCard';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const monthlyDates = [
  'Jun 2025', 'Aug 2025', 'Oct 2025', 'Dec 2025', 'Feb 2026', 'Apr 2026', 'Jun 2026'
];
const monthlyData = monthlyDates.map(date => ({ date, value: 0 }));

// ─── Shared line chart component ──────────────────────────────────────────────
function ProjectsLineChart({ data }) {
  return (
    <ChartContainer width="100%" height={220}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
        <RechartsCartesianGrid vertical={false} stroke="#232323" />
        <RechartsXAxis
          dataKey="date"
          tick={{ fontSize: 13, fill: '#7c7c7c', fontFamily: 'Inter, sans-serif' }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <RechartsYAxis
          domain={[0, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fontSize: 13, fill: '#7c7c7c', fontFamily: 'Inter, sans-serif' }}
          axisLine={false}
          tickLine={false}
        />
        <RechartsLine
          type="monotone"
          dataKey="value"
          stroke="#e83e8c" // Pink line matching the screenshot
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
}

// ─── Reusable Master/Settings Link Card ───────────────────────────────────────
function MasterCard({ title, links }) {
  return (
    <div
      style={{
        backgroundColor: '#1c1c1c',
        border: '1px solid #232323',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#7c7c7c',
          marginBottom: '12px',
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.route}
            style={{
              fontSize: '14px',
              color: '#f8f8f8',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2px 0',
              transition: 'color 0.1s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#0289f7';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#f8f8f8';
            }}
          >
            <span>{link.label}</span>
            {link.arrow && (
              <ArrowUpRight size={13} style={{ color: '#7c7c7c', marginLeft: '6px' }} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectsDashboard() {
  const projectsLinks = [
    { label: 'Project', route: '/projects/project', arrow: true },
    { label: 'Task', route: '/projects/task', arrow: true },
    { label: 'Project Template', route: '/projects/setup/project-template', arrow: true },
    { label: 'Project Type', route: '/projects/setup/project-type', arrow: true },
    { label: 'Project Update', route: '/projects/setup/project-update', arrow: false },
  ];

  const timeTrackingLinks = [
    { label: 'Timesheet', route: '/projects/timesheet', arrow: true },
    { label: 'Activity Type', route: '/projects/setup/activity-type', arrow: true },
    { label: 'Activity Cost', route: '/projects/setup/activity-cost', arrow: true },
  ];

  const reportsLinks = [
    { label: 'Daily Timesheet Summary', route: '/projects/reports/daily-timesheet-summary', arrow: false },
    { label: 'Project wise Stock Tracking', route: '/projects/reports/project-wise-stock-tracking', arrow: false },
    { label: 'Timesheet Billing Summary', route: '/projects/reports/timesheet-billing-summary', arrow: false },
    { label: 'Delayed Tasks Summary', route: '/projects/reports/delayed-tasks-summary', arrow: false },
  ];

  const settingsLinks = [
    { label: 'Projects Settings', route: '/projects/settings', arrow: true },
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--font-family)', backgroundColor: 'var(--bg-color)', minHeight: '100%' }}>
      
      {/* Completed Projects Chart */}
      <ChartCard
        title="Completed Projects"
        lastSynced="Last synced 9 minutes ago"
        showPeriod={true}
        periodValue="Last Year"
        showInterval={true}
        intervalValue="Monthly"
      >
        <ProjectsLineChart data={monthlyData} />
      </ChartCard>

      {/* Row of stats cards */}
      <div
        className="projects-stat-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <StatCard title="Open Projects" value={0} />
        <StatCard title="Non Completed Tasks" value={0} />
        <StatCard title="Working Hours" value="0.000" />
      </div>

      {/* Reports & Masters Section */}
      <h2
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#afafaf',
          marginBottom: '16px',
          marginTop: '8px',
        }}
      >
        Reports & Masters
      </h2>

      <div
        className="projects-masters-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {/* Column 1: Projects & Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <MasterCard title="Projects" links={projectsLinks} />
          <MasterCard title="Settings" links={settingsLinks} />
        </div>

        {/* Column 2: Time Tracking */}
        <div>
          <MasterCard title="Time Tracking" links={timeTrackingLinks} />
        </div>

        {/* Column 3: Reports */}
        <div>
          <MasterCard title="Reports" links={reportsLinks} />
        </div>
      </div>
    </div>
  );
}
