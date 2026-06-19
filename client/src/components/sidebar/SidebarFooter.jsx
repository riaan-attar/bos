import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';

export default function SidebarFooter({ isCollapsed }) {
  const [profileHovered, setProfileHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  return (
    <div
      style={{
        borderTop: '1px solid #1c1c1c',
        padding: '8px 6px',
        flexShrink: 0,
      }}
    >
      <div
        onMouseEnter={() => setProfileHovered(true)}
        onMouseLeave={() => setProfileHovered(false)}
        style={{
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          padding: isCollapsed ? '0' : '0 10px',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: '8px',
          borderRadius: '6px',
          cursor: 'pointer',
          background: profileHovered ? '#171717' : 'transparent',
          transition: 'background 0.1s',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#388AE5',
            fontSize: '10px',
            fontWeight: 600,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          AB
        </div>
        {!isCollapsed && (
          <>
            <span style={{ fontSize: '12px', color: '#7c7c7c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Admin User
            </span>
            <Settings size={13} color="#383838" style={{ marginLeft: 'auto', flexShrink: 0 }} />
          </>
        )}
      </div>

      {!isCollapsed && (
        <div
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
          style={{
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            gap: '8px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '2px',
            background: searchHovered ? '#171717' : 'transparent',
            transition: 'background 0.1s',
          }}
        >
          <Search size={13} color="#383838" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: '#383838', flex: 1, whiteSpace: 'nowrap' }}>
            Search
          </span>
          <div
            style={{
              background: '#1c1c1c',
              border: '1px solid #2b2b2b',
              borderRadius: '4px',
              fontSize: '10px',
              padding: '1px 5px',
              color: '#383838',
              flexShrink: 0,
            }}
          >
            Ctrl K
          </div>
        </div>
      )}
    </div>
  );
}
