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
          <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent' }}>
            <option>Last Year</option>
          </select>
          <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent' }}>
            <option>Monthly</option>
          </select>
          <MoreHorizontal size={16} style={{ color: 'var(--text-muted, #9ca3af)', cursor: 'pointer' }} />
        </div>
      </div>
      <div style={{ flex: 1, minHeight: '220px' }}>
        <ChartContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid vertical={false} stroke="var(--border-color, #e5e7eb)" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
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
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Filter size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
          </button>
          <MoreHorizontal size={16} style={{ color: 'var(--text-muted, #9ca3af)', cursor: 'pointer' }} />
        </div>
      </div>
      <div style={{ flex: 1, minHeight: '220px', display: 'flex', alignItems: 'flex-end', paddingBottom: '20px' }}>
         <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#a3d1ff', borderRadius: '2px' }}></div><span style={{ fontSize: '12px', color: '#1a1a2e', fontWeight: 500 }}>{'<0'}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#ff9bc2', borderRadius: '2px' }}></div><span style={{ fontSize: '12px', color: '#1a1a2e', fontWeight: 500 }}>0-30</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#2b7cd3', borderRadius: '2px' }}></div><span style={{ fontSize: '12px', color: '#1a1a2e', fontWeight: 500 }}>31-60</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', backgroundColor: '#48c774', borderRadius: '2px' }}></div><span style={{ fontSize: '12px', color: '#1a1a2e', fontWeight: 500 }}>61-90</span></div>
         </div>
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
  const trendsData = monthlyDates.map(date => ({ date, value: 0 }));

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #ffffff)', minHeight: '100%', fontFamily: 'var(--font-family), Inter, sans-serif' }}>
      
      {/* Breadcrumb / Title area */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
         <span>Home</span> / <span>Dashboard</span> / <span style={{ fontWeight: 600, color: '#1a1a2e' }}>Payments</span>
      </div>

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
          subtitle="Last synced 5 minutes ago" 
          data={trendsData} 
          color="#e879a0" 
        />
        <TrendsChart 
          title="Outgoing Bills (Sales Invoice)" 
          subtitle="Last synced 5 minutes ago" 
          data={trendsData} 
          color="#007be0" 
        />
      </div>

      {/* Ageing Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <AgeingChart title="Accounts Receivable Ageing" />
        <AgeingChart title="Accounts Payable Ageing" />
      </div>

      {/* Bank Balance Error Panel */}
      <div style={{
        backgroundColor: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--border-color, #e5e7eb)',
        borderRadius: '8px',
        padding: '20px'
      }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Bank Balance</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Filter size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
            </button>
            <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent' }}>
              <option>Last Year</option>
            </select>
            <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent' }}>
              <option>Monthly</option>
            </select>
            <MoreHorizontal size={16} style={{ color: 'var(--text-muted, #9ca3af)', cursor: 'pointer' }} />
          </div>
        </div>
        <div style={{ 
          height: '180px', 
          backgroundColor: '#f9fafa', 
          borderRadius: '4px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#d14343',
          fontSize: '13px'
        }}>
          <span>Account is not set for the dashboard chart <a href="#" style={{ color: '#d14343', textDecoration: 'underline' }}>Bank Balance</a></span>
        </div>
      </div>

    </div>
  );
}
