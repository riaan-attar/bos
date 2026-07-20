import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';

const STEPS = [
  { num: 1, title: 'Set up your Company', desc: 'Add company details and GSTIN', completed: true, path: '/invoicing/settings' },
  { num: 2, title: 'Configure Chart of Accounts', desc: 'Set up your account hierarchy', completed: false, path: '/invoicing/chart-of-accounts' },
  { num: 3, title: 'Add your Customers', desc: 'Add customers for sales invoicing', completed: false, path: '/invoicing/receivables/customer' },
  { num: 4, title: 'Add your Suppliers', desc: 'Add vendors you purchase from', completed: false, path: '/invoicing/payables/supplier' },
  { num: 5, title: 'Create your first Sales Invoice', desc: 'Bill your customers for properties sold', completed: false, path: '/invoicing/receivables/sales-invoice' },
  { num: 6, title: 'Record a Payment', desc: 'Log incoming and outgoing payments', completed: false, path: '/invoicing/payments/payment-entry' },
];

const QUICK_LINKS = [
  { title: 'Sales Invoice', path: '/invoicing/receivables/sales-invoice' },
  { title: 'Purchase Invoice', path: '/invoicing/payables/purchase-invoice' },
  { title: 'Payment Entry', path: '/invoicing/payments/payment-entry' },
  { title: 'Journal Entry', path: '/invoicing/payments/journal-entry' },
  { title: 'General Ledger', path: '/invoicing/reports/general-ledger' },
  { title: 'Chart of Accounts', path: '/invoicing/chart-of-accounts' },
];

export default function InvoicingGettingStarted() {
  const navigate = useNavigate();
  const completedCount = STEPS.filter(s => s.completed).length;

  const StepCard = ({ step }) => (
    <div
      onClick={() => navigate(step.path)}
      style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px', display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
    >
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: step.completed ? '#dcfce7' : '#f9fafb', border: `1px solid ${step.completed ? '#22c55e' : '#e5e7eb'}`, color: step.completed ? '#22c55e' : '#6b7280', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>
        {step.completed ? <Check size={14} /> : step.num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e', marginBottom: '2px' }}>{step.title}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>{step.desc}</div>
      </div>
      <div>
        {step.completed
          ? <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: 500 }}>Done</span>
          : <ChevronRight size={16} color="#d1d5db" />
        }
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

        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px 0' }}>Get Started with Invoicing</h1>
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>Set up your accounting system step by step</div>

        {/* Progress */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>{completedCount} of {STEPS.length} steps completed</div>
          <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(completedCount / STEPS.length) * 100}%`, height: '100%', background: '#3b82f6', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: '40px' }}>
          {STEPS.map(step => <StepCard key={step.num} step={step} />)}
        </div>

        {/* Quick Links */}
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0' }}>Quick Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {QUICK_LINKS.map(link => <QuickLink key={link.title} title={link.title} path={link.path} />)}
          </div>
        </div>

      </div>
    </div>
  );
}
