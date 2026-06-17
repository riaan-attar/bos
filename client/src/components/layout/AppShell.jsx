/**
 * AppShell Component
 * Root layout wrapper — sidebar + main content area.
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Topbar from './Topbar';

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? 48 : 240;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        style={{
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.2s ease',
          minHeight: '100vh',
          flex: 1,
          backgroundColor: 'var(--bg-color)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Topbar />

        {/* Page content */}
        <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
