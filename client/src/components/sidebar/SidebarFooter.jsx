/**
 * SidebarFooter Component
 * Search and Notifications rows pinned to the sidebar bottom.
 */
import React from 'react';
import { Search, Bell } from 'lucide-react';

const rowStyle = {
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  margin: '1px 4px',
  borderRadius: '6px',
  gap: '8px',
  cursor: 'pointer',
  color: '#afafaf',
  fontSize: '14.5px',
  background: 'none',
  border: 'none',
  width: 'calc(100% - 8px)',
  fontFamily: 'inherit',
  transition: 'background 0.1s',
  textAlign: 'left',
};

function FooterRow({ icon: Icon, label, isCollapsed, right }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      style={{
        ...rowStyle,
        backgroundColor: hovered ? 'var(--sidebar-hover-color)' : 'transparent',
        color: hovered ? '#f8f8f8' : '#afafaf',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={14} style={{ flexShrink: 0, color: 'inherit' }} />
      {!isCollapsed && (
        <>
          <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{label}</span>
          {right}
        </>
      )}
    </button>
  );
}

export default function SidebarFooter({ isCollapsed }) {
  const kbdStyle = {
    backgroundColor: 'var(--surface-gray-3)',
    border: '1px solid #424242',
    borderRadius: '4px',
    fontSize: '12px',
    padding: '1px 5px',
    color: '#7c7c7c',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={{
        borderTop: '1px solid var(--divider-color)',
        padding: '8px 4px',
        flexShrink: 0,
      }}
    >
      <FooterRow
        icon={Search}
        label="Search"
        isCollapsed={isCollapsed}
        right={<kbd style={kbdStyle}>Ctrl K</kbd>}
      />
      <FooterRow
        icon={Bell}
        label="Notifications"
        isCollapsed={isCollapsed}
        right={
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--blue-500)',
              flexShrink: 0,
            }}
          />
        }
      />
    </div>
  );
}
