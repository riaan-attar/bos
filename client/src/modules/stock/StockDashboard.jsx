import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Filter } from 'lucide-react';
import {
  ResponsiveContainer as ChartContainer,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList
} from 'recharts';
import { fetchDashboardData } from '../../services/stockApi';

const formatY = (value) => {
  if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)} K`;
  return value;
};

// ─── Reusable Components ──────────────────────────────────────────────────
function StatCard({ title, value, subtext }) {
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
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary, #1a1a2e)', marginTop: '8px' }}>
        {value}
      </div>
      {subtext && (
        <div style={{ fontSize: '12px', color: 'var(--text-muted, #9ca3af)', marginTop: '4px' }}>
          {subtext}
        </div>
      )}
    </div>
  );
}

function TrendsChart({ title, data }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-bg, #ffffff)',
      border: '1px solid var(--border-color, #e5e7eb)',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>{title}</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent' }}>
            <option>Last Year</option>
          </select>
          <select style={{ fontSize: '12px', color: 'var(--text-secondary, #6b7280)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 8px', outline: 'none', backgroundColor: 'transparent' }}>
            <option>Monthly</option>
          </select>
          <MoreHorizontal size={16} style={{ color: 'var(--text-muted, #9ca3af)', cursor: 'pointer' }} />
        </div>
      </div>
      <ChartContainer width="100%" height={220}>
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid vertical={false} stroke="var(--border-color, #e5e7eb)" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: 'var(--text-secondary, #6b7280)' }} axisLine={false} tickLine={false} />
          <RechartsLine type="monotone" dataKey="value" stroke="#e879a0" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </RechartsLineChart>
      </ChartContainer>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
export default function StockDashboard() {
  const [data, setData] = useState({
    totalItems: 0,
    totalWarehouses: 0,
    totalStockValue: 0,
    warehouseChartData: []
  });

  useEffect(() => {
    fetchDashboardData().then(setData).catch(console.error);
  }, []);

  const chartData = data.warehouseChartData.length > 0 ? data.warehouseChartData : [
    { warehouse: 'No Data', value: 0 }
  ];

  const monthlyDates = ['Jun 2025', 'Aug 2025', 'Oct 2025', 'Dec 2025', 'Feb 2026', 'Apr 2026', 'Jun 2026'];
  const trendsData = monthlyDates.map(date => ({ date, value: 0 }));

  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
        <StatCard title="Total Active Items" value={data.totalItems} />
        <StatCard title="Total Warehouses" value={data.totalWarehouses} />
        <StatCard title="Total Stock Value" value={formatY(data.totalStockValue)} subtext="0 % since yesterday" />
      </div>

      {/* Warehouse Wise Stock Value Chart */}
      <div style={{
        backgroundColor: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--border-color, #e5e7eb)',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: '0 0 2px 0' }}>Warehouse wise Stock Value</h2>
            <div style={{ fontSize: '12px', color: 'var(--text-muted, #9ca3af)' }}>Last synced just now</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Filter size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
            </button>
            <button style={{ background: 'none', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoreHorizontal size={14} style={{ color: 'var(--text-secondary, #6b7280)' }} />
            </button>
          </div>
        </div>

        <ChartContainer width="100%" height={280}>
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

      {/* Trends Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <TrendsChart title="Purchase Receipt Trends" data={trendsData} />
        <TrendsChart title="Delivery Trends" data={trendsData} />
      </div>

    </div>
  );
}
