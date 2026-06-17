/**
 * SidebarNavItem Component
 * Single top-level nav item with hover flyout.
 */
import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, LayoutGrid, Settings, ChevronRight } from 'lucide-react';
import SidebarFlyout from './SidebarFlyout';

// Icon map per spec (overrides sidebar.config icons)
const ICON_MAP = {
  crm: Users,
  erp: LayoutGrid,
  settings: Settings,
};

export default function SidebarNavItem({ item, isCollapsed }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const rowRef = useRef(null);
  const [topPos, setTopPos] = useState(0);
  const location = useLocation();

  const isActive = location.pathname.startsWith(item.path);
  const Icon = ICON_MAP[item.id] ?? item.icon;

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    if (rowRef.current) {
      setTopPos(rowRef.current.getBoundingClientRect().top);
    }
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const rowStyle = {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    margin: '1px 4px',
    borderRadius: '6px',
    cursor: 'pointer',
    gap: '8px',
    fontSize: '15px',
    fontWeight: 400,
    transition: 'background 0.1s',
    textDecoration: 'none',
    color: isActive || open ? '#f8f8f8' : '#afafaf',
    backgroundColor: isActive
      ? 'var(--sidebar-active-color)'
      : open
        ? 'var(--sidebar-hover-color)'
        : 'transparent',
    userSelect: 'none',
  };

  return (
    <div
      ref={rowRef}
      style={{ position: 'relative' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link to={item.path} style={rowStyle}>
        <Icon
          size={16}
          style={{ flexShrink: 0, color: 'inherit' }}
        />

        {!isCollapsed && (
          <>
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {item.label}
            </span>
            <ChevronRight
              size={12}
              style={{ marginLeft: 'auto', color: '#383838', flexShrink: 0 }}
            />
          </>
        )}
      </Link>

      {/* Collapsed tooltip */}
      {isCollapsed && open && (
        <div
          style={{
            position: 'fixed',
            left: '56px',
            top: `${topPos + 6}px`,
            backgroundColor: 'var(--surface-gray-2)',
            border: '1px solid var(--surface-gray-3)',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '14.5px',
            color: '#f8f8f8',
            whiteSpace: 'nowrap',
            zIndex: 1001,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          {item.label}
        </div>
      )}

      <SidebarFlyout
        items={item.subItems}
        isVisible={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        label={item.label}
        topPos={topPos}
        isCollapsed={isCollapsed}
      />
    </div>
  );
}
