/**
 * Sidebar Component
 * Fixed left sidebar container.
 */
import React from 'react';
import SidebarBrand from './SidebarBrand';
import SidebarNav from './SidebarNav';
import SidebarFooter from './SidebarFooter';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isCollapsed ? '48px' : '240px',
        height: '100vh',
        backgroundColor: 'var(--surface-menu-bar)',
        borderRight: '1px solid var(--sidebar-border-color)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.2s ease',
        zIndex: 40,
      }}
    >
      <SidebarBrand
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(prev => !prev)}
      />
      <SidebarNav isCollapsed={isCollapsed} />
      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  );
}
