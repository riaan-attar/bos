/**
 * AppShell Component
 * Root layout wrapper — sidebar + topbar + scrollable content.
 */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Topbar from './Topbar';
import { TopbarProvider } from '../../context/TopbarContext';

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TopbarProvider>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>

        {/* Sidebar — fixed left */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Right column — topbar + scrollable content */}
        <div
          style={{
            marginLeft: isCollapsed ? '48px' : '240px',
            transition: 'margin-left 0.2s ease',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Topbar — fixed at top of right side */}
          <Topbar />

          {/* Page content — scrollable area below topbar */}
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              background: '#0f0f0f',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </main>
        </div>

      </div>
    </TopbarProvider>
  );
}
