/**
 * SidebarFlyout Component
 * Fixed-positioned submenu panel rendered via React portal.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

// Per-module flyout structure with dividers
const FLYOUT_GROUPS = {
  crm: [
    ['Lead', '/crm/leads'],
    ['Opportunity', '/crm/opportunities'],
    ['Customer', '/crm/customers'],
    ['Contact', '/crm/contacts'],
    ['Communication', '/crm/communications'],
    ['Campaign', '/crm/campaigns'],
    ['Sales Pipeline', '/crm/pipeline'],
    '---',
    ['Reports', '/crm/reports'],
    ['Maintenance', '/crm/maintenance'],
  ],
  erp: [
    ['Accounts', '/erp/accounts'],
    ['Stock', '/erp/stock'],
    ['HR', '/erp/hr'],
    ['Payroll', '/erp/payroll'],
    ['Purchase', '/erp/purchase'],
    ['Assets', '/erp/assets'],
    ['Projects', '/erp/projects'],
    '---',
    ['Reports', '/erp/reports'],
  ],
  settings: [
    ['Users & Permissions', '/settings/users'],
    ['System Settings', '/settings/system'],
    ['Email Settings', '/settings/email'],
    ['Notification Settings', '/settings/notifications'],
    '---',
    ['Data Import', '/settings/import'],
    ['Backup', '/settings/backup'],
  ],
};

// Derive module id from the first item path
function getModuleId(items) {
  if (!items || items.length === 0) return null;
  const first = items[0];
  if (!first || !first.path) return null;
  const seg = first.path.split('/')[1];
  return seg || null;
}

export default function SidebarFlyout({ items, isVisible, onMouseEnter, onMouseLeave, topPos, isCollapsed }) {
  const location = useLocation();

  if (!isVisible) return null;

  const moduleId = getModuleId(items);
  const groups = moduleId && FLYOUT_GROUPS[moduleId] ? FLYOUT_GROUPS[moduleId] : items.map(i => [i.label, i.path]);
  const leftPos = isCollapsed ? 52 : 244;

  const flyout = (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'fixed',
        top: `${topPos}px`,
        left: `${leftPos}px`,
        width: '200px',
        backgroundColor: 'var(--surface-gray-2)',
        border: '1px solid var(--surface-gray-3)',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        padding: '4px',
        zIndex: 1000,
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
      }}
    >
      {groups.map((entry, idx) => {
        if (entry === '---') {
          return (
            <div
              key={`div-${idx}`}
              style={{
                borderTop: '1px solid var(--divider-color)',
                margin: '4px 0',
              }}
            />
          );
        }

        const [label, path] = entry;
        const isActive = location.pathname === path;

        return (
          <Link
            key={path}
            to={path}
            style={{
              height: '30px',
              padding: '0 10px',
              borderRadius: '5px',
              fontSize: '14.5px',
              color: isActive ? '#f8f8f8' : '#afafaf',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.1s',
              backgroundColor: isActive ? 'var(--surface-gray-3)' : 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--surface-gray-3)';
              e.currentTarget.style.color = '#f8f8f8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = isActive ? 'var(--surface-gray-3)' : 'transparent';
              e.currentTarget.style.color = isActive ? '#f8f8f8' : '#afafaf';
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );

  return createPortal(flyout, document.body);
}
