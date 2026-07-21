import React, { useState } from 'react';
import { MoreHorizontal, Filter } from 'lucide-react';
import {
  ResponsiveContainer as ChartContainer,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

// ─── Reusable Components ──────────────────────────────────────────────────
function StatCard({ title, value, prefix = '₹ ' }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg, #ffffff)',
      border: '1px solid var(--border-color, #e5e7eb)',
      borderRadius: '8px',
      padding: '16px 20px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '13px', color: 'var(--text-secondary, #6b7280)', margin: 0, fontWeight: 500 }}>{title}</h3>
        <MoreHorizontal size={16} style={{ color: 'var(--text-muted, #9ca3af)', cursor: 'pointer' }} />
      </div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary, #1a1a2e)', marginTop: '8px' }}>
        {prefix}{value}
      </div>
    </div>
  );
}

function TrendsChart({ title, subtitle, data, color }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg, #ffffff)',
      border: '1px solid var(--border-color, #e5e7eb)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: '0 0 4px 0' }}>{title}</h3>
          <div style={{ fontSize: '11px', color: 'var(--text-muted, #9ca3af)' }}>{subtitle}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Filter size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
          </button>
          <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            <option>Last Year</option>
          </select>
          <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
            <option>Monthly</option>
          </select>
          <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MoreHorizontal size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
          </button>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: '220px' }}>
        <ChartContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--border-color, #f3f4f6)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary, #9ca3af)' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: 'var(--text-secondary, #9ca3af)' }} axisLine={false} tickLine={false} dx={-10} />
            <RechartsLine type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
          </RechartsLineChart>
        </ChartContainer>
      </div>
    </div>
  );
}

function AgeingChart({ title }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg, #ffffff)',
      border: '1px solid var(--border-color, #e5e7eb)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '260px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Filter size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
          </button>
          <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <MoreHorizontal size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
          </button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
         {/* Empty container as per screenshot */}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
export default function PaymentsDashboard() {
  const [data] = useState({
    totalOutgoingBills: '0.00',
    totalIncomingBills: '0.00',
    totalIncomingPayment: '0.00',
    totalOutgoingPayment: '0.00'
  });

  const monthlyDates = ['Jul 2025', 'Sep 2025', 'Nov 2025', 'Jan 2026', 'Mar 2026', 'May 2026', 'Jul 2026'];
  const trendsData = monthlyDates.map(date => ({ date, value: 0 })); // empty/zero state for now

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard title="Total Outgoing Bills" value={data.totalOutgoingBills} />
        <StatCard title="Total Incoming Bills" value={data.totalIncomingBills} />
        <StatCard title="Total Incoming Payment" value={data.totalIncomingPayment} />
        <StatCard title="Total Outgoing Payment" value={data.totalOutgoingPayment} />
      </div>

      {/* Line Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <TrendsChart 
          title="Incoming Bills (Purchase Invoice)" 
          subtitle="Last synced just now" 
          data={trendsData} 
          color="#3b82f6" 
        />
        <TrendsChart 
          title="Outgoing Bills (Sales Invoice)" 
          subtitle="Last synced just now" 
          data={trendsData} 
          color="#3b82f6" 
        />
      </div>

      {/* Ageing Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <AgeingChart title="Accounts Receivable Ageing" />
        <AgeingChart title="Accounts Payable Ageing" />
      </div>

    </div>
  );
}
