import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Folder, Package } from 'lucide-react';

export default function SidebarBrand({ isCollapsed, onToggleCollapse }) {
  const location = useLocation();
  const isProjects = location.pathname.startsWith('/projects');
  const isStock = location.pathname.startsWith('/stock');

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1c1c1c',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '4px',
        flexShrink: 0,
        height: '52px',
        boxSizing: 'border-box',
      }}
    >
      <Link
        to={isProjects ? "/projects" : isStock ? "/stock" : "/"}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          overflow: 'hidden',
          flex: 1,
        }}
      >
        {isProjects ? (
          <div
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#0289f7',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Folder size={15} color="#ffffff" />
          </div>
        ) : isStock ? (
           <div
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#e879a0',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Package size={15} color="#ffffff" />
          </div>
        ) : (
          <div
            style={{
              width: '28px',
              height: '28px',
              backgroundColor: '#171717',
              border: '1px solid #2b2b2b',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              color: '#f8f8f8',
              flexShrink: 0,
            }}
          >
            B
          </div>
        )}

        {!isCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#f8f8f8', whiteSpace: 'nowrap' }}>
                {isProjects ? 'Projects' : isStock ? 'Stock' : 'BOS'}
              </span>
              {(isProjects || isStock) && <ChevronDown size={12} color="#7c7c7c" style={{ marginTop: '2px' }} />}
            </div>
            {(isProjects || isStock) && (
              <span style={{ fontSize: '11px', color: '#7c7c7c', whiteSpace: 'nowrap', marginTop: '-2px' }}>
                ERPNext
              </span>
            )}
          </div>
        )}
      </Link>

      {!isCollapsed && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleCollapse();
          }}
          aria-label="Collapse sidebar"
          style={{
            marginLeft: 'auto',
            color: '#424242',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '4px',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.1s',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#7c7c7c'}
          onMouseLeave={e => e.currentTarget.style.color = '#424242'}
        >
          <ChevronLeft size={14} />
        </button>
      )}
    </div>
  );
}

