import React, { useState } from 'react';
import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';

export default function ItemGroup() {
  const [showModal, setShowModal] = useState(false);
  
  const mockGroups = [
    { name: 'Construction Material', itemsCount: 45, desc: 'Cement, Bricks, Blocks, Sand, Aggregate' },
    { name: 'Steel', itemsCount: 12, desc: 'TMT Bars, Structural Steel, Binding Wire' },
    { name: 'Aggregates', itemsCount: 8, desc: 'Crushed Stone, River Sand, M-Sand' },
    { name: 'Finishing', itemsCount: 120, desc: 'Tiles, Paint, Granite, Marble' },
    { name: 'Plumbing', itemsCount: 85, desc: 'Pipes, Fittings, Fixtures, Pumps' },
    { name: 'Electrical', itemsCount: 150, desc: 'Wires, Switches, Conduits, Lighting' },
    { name: 'Wood & Timber', itemsCount: 30, desc: 'Plywood, Flush Doors, Teak Wood' },
    { name: 'Other', itemsCount: 50, desc: 'Safety Gear, Tools, Consumables' },
  ];

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Item Group</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', fontWeight: '500', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e2e2e2'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          <Plus size={14} color="#111111" /> + Add Item Group
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}>
          <LayoutList size={13} color="#6b7280" /> List View
        </button>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 12px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
          <MoreHorizontal size={13} color="#6b7280" />
        </button>
        
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
            <RefreshCw size={13} color="#6b7280" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}>
            <Filter size={13} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}>
            <ArrowUpDown size={13} /> Sort
          </button>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
            <Columns size={13} color="#6b7280" />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
            <MoreHorizontal size={13} color="#6b7280" />
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Group Name</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Items Count</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {mockGroups.map((grp, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{grp.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{grp.itemsCount}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{grp.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Item Group</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Group Name *</label>
                <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Parent Group</label>
                <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                  <option value="">None</option>
                  {mockGroups.map((g, i) => <option key={i} value={g.name}>{g.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Description</label>
                <textarea rows={3} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', resize: 'vertical', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}></textarea>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#f9fafb', borderRadius: '0 0 8px 8px' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
