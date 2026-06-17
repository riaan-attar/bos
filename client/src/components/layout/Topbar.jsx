/**
 * Topbar Component
 */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, MoreHorizontal } from 'lucide-react';
import { sidebarConfig } from '../sidebar/sidebar.config';

export default function Topbar() {
  const [moreHovered, setMoreHovered] = useState(false);
  const location = useLocation();

  const currentModule = sidebarConfig.find(item =>
    location.pathname.startsWith(item.path)
  );
  
  const moduleName = currentModule ? currentModule.label : '';

  const sep = <span style={{ color: '#383838', margin: '0 4px' }}>/</span>;

  return (
    <header style={{
      backgroundColor: '#000000',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      borderBottom: '1px solid #232323',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', fontSize: '15px', color: '#7c7c7c' }}>
        <Home size={14} style={{ color: '#7c7c7c', marginRight: '4px' }} />
        {sep}
        <span style={{ color: '#7c7c7c', fontWeight: 400 }}>Dashboard</span>
        {moduleName && (
          <>
            {sep}
            <span style={{ color: '#f8f8f8', fontWeight: 600 }}>{moduleName}</span>
          </>
        )}
      </nav>

      <button
        onMouseEnter={() => setMoreHovered(true)}
        onMouseLeave={() => setMoreHovered(false)}
        style={{
          background: moreHovered ? '#232323' : 'none',
          border: 'none',
          borderRadius: '6px',
          padding: '4px',
          cursor: 'pointer',
          color: moreHovered ? '#7c7c7c' : '#383838',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.1s',
        }}
      >
        <MoreHorizontal size={16} />
      </button>
    </header>
  );
}
