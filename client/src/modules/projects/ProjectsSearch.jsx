import React from 'react';
import { Home, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectsSearch() {
  return (
    <div style={{ padding: '0', fontFamily: 'Inter, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
      
      <div style={{ width: '600px', maxWidth: '90vw', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '12px 16px', display: 'flex', gap: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', alignItems: 'center' }}>
        <Search size={18} color="#9ca3af" />
        <input 
          type="text" 
          placeholder="Search projects, tasks..." 
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: '#1a1a2e' }} 
          autoFocus
        />
      </div>

      <div style={{ width: '600px', maxWidth: '90vw', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', marginTop: '8px', overflow: 'hidden', maxHeight: '400px', overflowY: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        
        <div style={{ padding: '8px 14px 4px', fontSize: '10px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Recent Projects</div>
        
        <div style={{ padding: '10px 14px', display: 'flex', gap: '10px', cursor: 'pointer', transition: 'background-color 0.1s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px' }}>🏢</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>Gangapur Heights Phase 1</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Project • Residential</div>
          </div>
        </div>

        <div style={{ padding: '10px 14px', display: 'flex', gap: '10px', cursor: 'pointer', transition: 'background-color 0.1s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px' }}>🏡</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>Nashik Road Villas</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Project • Residential</div>
          </div>
        </div>

        <div style={{ padding: '8px 14px 4px', fontSize: '10px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginTop: '8px' }}>Recent Tasks</div>
        
        <div style={{ padding: '10px 14px', display: 'flex', gap: '10px', cursor: 'pointer', transition: 'background-color 0.1s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>☑️</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>Foundation work - Gangapur</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Task • In Progress</div>
          </div>
        </div>

        <div style={{ padding: '10px 14px', display: 'flex', gap: '10px', cursor: 'pointer', transition: 'background-color 0.1s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
          <div style={{ width: '28px', height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>☑️</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>Slab casting - Satpur</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Task • Open</div>
          </div>
        </div>

      </div>

    </div>
  );
}
