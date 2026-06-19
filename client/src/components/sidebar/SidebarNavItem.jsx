import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function SidebarNavItem({ item, isCollapsed }) {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  
  const routePath = item.route.split('?')[0];
  const Icon = Icons[item.icon] || Icons.Circle;

  return (
    <NavLink
      to={item.route}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={({ isActive: navIsActive }) => {
        const active = location.pathname.startsWith(routePath) && 
          (item.route.includes('?') ? location.search === `?${item.route.split('?')[1]}` : true);

        return {
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
          background: active ? '#1c1c1c' : hovered ? '#171717' : 'transparent',
        };
      }}
    >
      {({ isActive: navIsActive }) => {
        const active = location.pathname.startsWith(routePath) && 
          (item.route.includes('?') ? location.search === `?${item.route.split('?')[1]}` : true);

        const iconColor = active ? '#f8f8f8' : hovered ? '#afafaf' : '#6b6b6b';
        const labelColor = active ? '#f8f8f8' : hovered ? '#afafaf' : '#7c7c7c';
        const fontWeight = active ? 500 : 400;

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
      }}
    </NavLink>
  );
}
