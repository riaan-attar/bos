import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Users, Box, Briefcase } from 'lucide-react';

export default function Desk() {
  const navigate = useNavigate();

  const handleCrmClick = () => {
    navigate('/crm');
  };

  const handleProjectsClick = () => {
    navigate('/projects');
  };


  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-family), sans-serif',
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
          padding: '0 20px',
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#5e666e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Box size={18} color="#ffffff" strokeWidth={2} />
          </div>
        </div>

        {/* Center: Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 2,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#8c98a5',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search"
              disabled
              style={{
                width: '100%',
                height: '32px',
                padding: '0 12px 0 34px',
                backgroundColor: '#f4f5f7',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#1a1a1a',
                outline: 'none',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '11px',
                color: '#8c98a5',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                padding: '1px 6px',
              }}
            >
              Ctrl+K
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '16px',
            flex: 1,
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
            }}
          >
            <Bell size={20} strokeWidth={1.5} />
          </button>
          
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#a352cc',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              fontSize: '13px',
              userSelect: 'none',
              cursor: 'pointer',
            }}
          >
            RA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Module Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '32px',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '600px',
            }}
          >
            {/* CRM Module Card */}
            <div
              onClick={handleCrmClick}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  backgroundColor: '#007be0',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 123, 224, 0.2)',
                  marginBottom: '10px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <Users size={32} color="#ffffff" strokeWidth={1.5} />
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                CRM
              </span>
            </div>

            {/* Projects Module Card */}
            <div
              onClick={handleProjectsClick}
              className="group"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  backgroundColor: '#6200ee',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(98, 0, 238, 0.2)',
                  marginBottom: '10px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <Briefcase size={32} color="#ffffff" strokeWidth={1.5} />
              </div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1a1a1a',
                  textAlign: 'center',
                }}
              >
                Projects
              </span>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
