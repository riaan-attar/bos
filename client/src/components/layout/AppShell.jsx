import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import { TopbarProvider } from '../../context/TopbarContext';

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <TopbarProvider>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <main
          style={{
            marginLeft: isCollapsed ? '48px' : '220px',
            transition: 'margin-left 0.2s ease',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            background: '#0f0f0f',
            flex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>
    </TopbarProvider>
  );
}
