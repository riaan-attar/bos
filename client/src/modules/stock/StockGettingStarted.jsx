import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';

export default function StockGettingStarted() {
  const navigate = useNavigate();

  const StepCard = ({ num, title, desc, completed, onClick }) => (
    <div 
      onClick={onClick}
      style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px', display: 'flex', gap: '16px', alignItems: 'center', cursor: onClick ? 'pointer' : 'default', transition: 'border-color 0.2s' }}
      onMouseEnter={e => { if(onClick) e.currentTarget.style.borderColor = '#3b82f6'; }}
      onMouseLeave={e => { if(onClick) e.currentTarget.style.borderColor = '#e5e7eb'; }}
    >
      <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: completed ? '#dcfce7' : '#f9fafb', border: `1px solid ${completed ? '#22c55e' : '#e5e7eb'}`, color: completed ? '#22c55e' : '#6b7280', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>
        {completed ? <Check size={14} /> : num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e', marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>{desc}</div>
      </div>
      <div>
        {completed ? <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 500 }}>Done</span> : <ChevronRight size={16} color="#d1d5db" />}
      </div>
    </div>
  );

  const QuickLink = ({ title, path }) => (
    <div 
      onClick={() => navigate(path)}
      style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#1a1a2e', textAlign: 'center', transition: 'all 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(59,130,246,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {title}
    </div>
  );

  return (
    <div style={{ padding: '32px 20px', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>Get Started with Stock</h1>
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>Set up your inventory management system</div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>1 of 5 steps completed</div>
          <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '20%', height: '100%', background: '#3b82f6' }} />
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <StepCard num={1} completed title="Add your Warehouses" desc="Create storage locations for your stock" onClick={() => navigate('/stock/setup/warehouse')} />
          <StepCard num={2} title="Create Item Groups" desc="Organize items into categories" onClick={() => navigate('/stock/setup/item-group')} />
          <StepCard num={3} title="Add your Items" desc="Add construction materials and supplies" onClick={() => navigate('/stock/setup/item')} />
          <StepCard num={4} title="Record Opening Stock" desc="Enter current stock levels via Stock Entry" onClick={() => navigate('/stock/stock-entry')} />
          <StepCard num={5} title="Create a Material Request" desc="Request materials for your project sites" onClick={() => navigate('/stock/material-request')} />
        </div>

        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0' }}>Quick Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <QuickLink title="Stock Entry" path="/stock/stock-entry" />
            <QuickLink title="Purchase Receipt" path="/stock/purchase-receipt" />
            <QuickLink title="Delivery Note" path="/stock/delivery-note" />
            <QuickLink title="Material Request" path="/stock/material-request" />
            <QuickLink title="Reports" path="/stock/reports/stock-balance" />
            <QuickLink title="Settings" path="/stock/settings" />
          </div>
        </div>

      </div>
    </div>
  );
}
