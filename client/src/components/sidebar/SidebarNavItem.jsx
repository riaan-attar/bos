import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function SidebarNavItem({ item, isCollapsed, onClick }) {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  
  const routePath = item.route.split('?')[0];
  const Icon = Icons[item.icon] || Icons.Circle;

  const Wrapper = onClick ? 'div' : NavLink;
  
  // If we have an onClick, it's not a real route link, so it's not "active" in the routing sense.
  // We can just rely on the click behavior.
  const isRouteActive = !onClick && location.pathname.startsWith(routePath) && 
    (item.route.includes('?') ? location.search === `?${item.route.split('?')[1]}` : true);

  const wrapperProps = onClick 
    ? { onClick }
    : {
        to: item.route,
        className: ({ isActive }) => isActive ? 'active' : ''
      };

  const styleObj = {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '0' : '0 12px',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    margin: '1px 6px',
    borderRadius: '6px',
    cursor: 'pointer',
    gap: isCollapsed ? '0' : '8px',
    textDecoration: 'none',
    transition: 'background 0.1s',
  };

  const renderContent = (isActive) => {
    const iconColor = isActive ? '#f8f8f8' : hovered ? '#afafaf' : '#6b6b6b';
    const labelColor = isActive ? '#f8f8f8' : hovered ? '#afafaf' : '#7c7c7c';
    const fontWeight = isActive ? 500 : 400;

    return (
      <>
        <Icon size={15} color={iconColor} style={{ flexShrink: 0 }} />
        {!isCollapsed && (
          <>
            <span
              style={{
                fontSize: '13px',
                color: labelColor,
                fontWeight: fontWeight,
                flex: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.label}
            </span>
            {item.badge && (
              <span
                style={{
                  marginLeft: 'auto',
                  background: '#e03636',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 600,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 5px',
                }}
              >
                {item.badge}
              </span>
            )}
          </>
        )}
      </>
    );
  };

  if (onClick) {
    return (
      <div
        {...wrapperProps}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...styleObj, background: hovered ? '#171717' : 'transparent' }}
      >
        {renderContent(false)}
      </div>
    );
  }

  return (
    <NavLink
      {...wrapperProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive }) => {
        const active = location.pathname.startsWith(routePath) && 
          (item.route.includes('?') ? location.search === `?${item.route.split('?')[1]}` : true);
        return {
          ...styleObj,
          background: active ? '#1c1c1c' : hovered ? '#171717' : 'transparent',
        };
      }}
    >
      {({ isActive }) => {
        const active = location.pathname.startsWith(routePath) && 
          (item.route.includes('?') ? location.search === `?${item.route.split('?')[1]}` : true);
        return renderContent(active);
      }}
    </NavLink>
  );
}
