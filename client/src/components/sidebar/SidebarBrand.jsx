/**
 * SidebarBrand Component
 * BOS logo, name, subtitle and collapse toggle.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SidebarBrand({ isCollapsed, onToggleCollapse }) {
  return (
    <div
      style={{
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid var(--divider-color)',
        flexShrink: 0,
        minHeight: '52px',
      }}
    >
      <Link
        to="/"
        style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', overflow: 'hidden' }}
      >
        {/* Brand icon */}
        <div
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: '#171717',
            border: '1px solid #383838',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '15px',
            color: '#f8f8f8',
            letterSpacing: '-0.5px',
            flexShrink: 0,
          }}
        >
          B
        </div>

        {/* Brand text */}
        {!isCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3, overflow: 'hidden' }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#f8f8f8', whiteSpace: 'nowrap' }}>
              BOS
            </span>
            <span style={{ fontSize: '13px', color: '#7c7c7c', whiteSpace: 'nowrap' }}>
              Avenue Builders
            </span>
          </div>
        )}
      </Link>

      {/* Collapse chevron */}
      {!isCollapsed && (
        <button
          onClick={onToggleCollapse}
          aria-label="Collapse sidebar"
          style={{
            marginLeft: 'auto',
            color: '#7c7c7c',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.1s',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sidebar-hover-color)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Expand button when collapsed — centred below the icon */}
      {isCollapsed && (
        <button
          onClick={onToggleCollapse}
          aria-label="Expand sidebar"
          style={{
            marginLeft: 'auto',
            color: '#7c7c7c',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.1s',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--sidebar-hover-color)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
