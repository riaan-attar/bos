import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus } from 'lucide-react';

const formatINR = (num) => {
  if (!num) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
};

const ACCOUNT_TREE = [
  {
    id: 'assets', name: 'Assets', type: 'Group', balance: null,
    children: [
      {
        id: 'current-assets', name: 'Current Assets', type: 'Group', balance: null,
        children: [
          { id: 'cash', name: 'Cash', type: 'Asset', balance: 520000, children: [] },
          { id: 'bank-hdfc', name: 'Bank - HDFC', type: 'Asset', balance: 2850000, children: [] },
          { id: 'ar', name: 'Accounts Receivable', type: 'Asset', balance: 7700000, children: [] },
        ],
      },
      {
        id: 'fixed-assets', name: 'Fixed Assets', type: 'Group', balance: null,
        children: [
          { id: 'land', name: 'Land & Building', type: 'Asset', balance: 50000000, children: [] },
          { id: 'machinery', name: 'Machinery', type: 'Asset', balance: 1250000, children: [] },
        ],
      },
      {
        id: 'stock-assets', name: 'Stock Assets', type: 'Group', balance: null,
        children: [
          { id: 'closing-stock', name: 'Closing Stock', type: 'Asset', balance: 4550000, children: [] },
        ],
      },
    ],
  },
  {
    id: 'liabilities', name: 'Liabilities', type: 'Group', balance: null,
    children: [
      {
        id: 'current-liab', name: 'Current Liabilities', type: 'Group', balance: null,
        children: [
          { id: 'ap', name: 'Accounts Payable', type: 'Liability', balance: -606500, children: [] },
          { id: 'gst-payable', name: 'GST Payable', type: 'Liability', balance: -125000, children: [] },
        ],
      },
      {
        id: 'lt-liab', name: 'Long Term Liabilities', type: 'Group', balance: null,
        children: [
          { id: 'bank-loan', name: 'Bank Loan', type: 'Liability', balance: -25000000, children: [] },
        ],
      },
    ],
  },
  {
    id: 'income', name: 'Income', type: 'Group', balance: null,
    children: [
      { id: 'sales-income', name: 'Sales Income', type: 'Income', balance: 7705000, children: [] },
      { id: 'other-income', name: 'Other Income', type: 'Income', balance: 250000, children: [] },
    ],
  },
  {
    id: 'expenses', name: 'Expenses', type: 'Group', balance: null,
    children: [
      { id: 'cogs', name: 'Cost of Goods Sold', type: 'Expense', balance: 2100000, children: [] },
      { id: 'operating', name: 'Operating Expenses', type: 'Expense', balance: 850000, children: [] },
      { id: 'finance-charges', name: 'Finance Charges', type: 'Expense', balance: 120000, children: [] },
    ],
  },
];

const typeColors = {
  Asset: { bg: '#dbeafe', color: '#1d4ed8' },
  Liability: { bg: '#fee2e2', color: '#dc2626' },
  Income: { bg: '#dcfce7', color: '#15803d' },
  Expense: { bg: '#fef9c3', color: '#a16207' },
  Group: { bg: '#f3f4f6', color: '#6b7280' },
};

function AccountRow({ node, level = 0, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = node.children && node.children.length > 0;
  const indent = level * 20;
  const colors = typeColors[node.type] || typeColors.Group;
  const isNegative = node.balance !== null && node.balance < 0;

  return (
    <>
      <div
        onClick={() => hasChildren && setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderBottom: '1px solid #f9fafb',
          cursor: hasChildren ? 'pointer' : 'default',
          backgroundColor: level === 0 ? '#fafafa' : 'transparent',
          paddingLeft: `${16 + indent}px`,
          transition: 'background 0.1s',
        }}
        onMouseEnter={e => { if (!level === 0) e.currentTarget.style.background = '#f9fafb'; }}
        onMouseLeave={e => { e.currentTarget.style.background = level === 0 ? '#fafafa' : 'transparent'; }}
      >
        <div style={{ width: '18px', marginRight: '4px', display: 'flex', alignItems: 'center' }}>
          {hasChildren ? (
            open
              ? <ChevronDown size={14} color="#9ca3af" />
              : <ChevronRight size={14} color="#9ca3af" />
          ) : null}
        </div>

        <span style={{
          fontSize: level === 0 ? '13px' : '13px',
          fontWeight: level === 0 ? 600 : 400,
          color: '#374151',
          flex: 1,
        }}>
          {node.name}
        </span>

        {node.type !== 'Group' && (
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: '10px',
            background: colors.bg,
            color: colors.color,
            marginRight: '16px',
          }}>
            {node.type}
          </span>
        )}

        {node.balance !== null && (
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: isNegative ? '#dc2626' : '#15803d',
            minWidth: '100px',
            textAlign: 'right',
          }}>
            {formatINR(Math.abs(node.balance))}
          </span>
        )}
      </div>

      {hasChildren && open && (
        <div>
          {node.children.map(child => (
            <AccountRow key={child.id} node={child} level={level + 1} defaultOpen={level < 1} />
          ))}
        </div>
      )}
    </>
  );
}

export default function ChartOfAccounts() {
  return (
    <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Chart of Accounts</h1>
        <button
          style={{
            background: '#000000',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Plus size={14} />
          Add Account
        </button>
      </div>

      {/* Filter/Search bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <input
          placeholder="Search accounts..."
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '7px 12px',
            fontSize: '13px',
            color: '#374151',
            outline: 'none',
            width: '240px',
            backgroundColor: 'var(--control-bg, #ffffff)',
          }}
        />
        <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '7px 12px', fontSize: '13px', color: '#374151', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)' }}>
          <option value="">All Types</option>
          <option>Asset</option>
          <option>Liability</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>

      {/* Tree Card */}
      <div style={{
        backgroundColor: 'var(--card-bg, #ffffff)',
        border: '1px solid var(--border-color, #e5e7eb)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'flex',
          padding: '10px 16px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
        }}>
          <span style={{ flex: 1, fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Name</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '16px', minWidth: '80px', textAlign: 'right' }}>Type</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: '100px', textAlign: 'right' }}>Balance</span>
        </div>

        {/* Tree Rows */}
        {ACCOUNT_TREE.map(node => (
          <AccountRow key={node.id} node={node} level={0} defaultOpen />
        ))}
      </div>
    </div>
  );
}
