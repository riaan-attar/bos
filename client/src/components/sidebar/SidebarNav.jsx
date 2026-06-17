/**
 * SidebarNav Component
 * Scrollable list of top-level nav items.
 */
import React from 'react';
import { sidebarConfig } from './sidebar.config';
import SidebarNavItem from './SidebarNavItem';

export default function SidebarNav({ isCollapsed }) {
  return (
    <nav
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '8px 0',
      }}
    >
      {sidebarConfig.map(item => (
        <SidebarNavItem key={item.id} item={item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  );
}
