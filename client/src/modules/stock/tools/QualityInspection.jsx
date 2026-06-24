import React, { useState } from 'react';
import { Plus, X, List, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';

export default function QualityInspection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mockData = [
    { id: 'QI-2026-001', item: 'Portland Cement', type: 'Inward', inspector: 'Suresh Kumar', status: 'Accepted', date: '06/06/2026' },
    { id: 'QI-2026-002', item: 'River Sand', type: 'Inward', inspector: 'Suresh Kumar', status: 'Rejected', date: '12/06/2026' },
    { id: 'QI-2026-003', item: 'TMT Bars 12mm', type: 'Inward', inspector: 'Ramesh Singh', status: 'Accepted', date: '14/06/2026' },
    { id: 'QI-2026-004', item: 'Ceramic Floor Tiles', type: 'Inward', inspector: 'Suresh Kumar', status: 'Pending', date: '20/06/2026' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Accepted': return { bg: '#dcfce7', color: '#15803d' };
      case 'Rejected': return { bg: '#fee2e2', color: '#dc2626' };
      case 'Pending': return { bg: '#fef9c3', color: '#a16207' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Quality Inspection</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Inspection
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <List size={14} /> List View
          </button>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <MoreHorizontal size={14} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <RefreshCw size={14} />
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <Filter size={14} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', fontSize: '13px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <ArrowUpDown size={14} /> Sort
          </button>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <Columns size={14} />
          </button>
          <button style={{ padding: '6px 8px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', color: 'var(--text-secondary, #6b7280)', cursor: 'pointer' }}>
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Inspection Type</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Inspector</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)' }}>{row.item}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.type}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.inspector}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.date}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: getStatusStyle(row.status).bg, color: getStatusStyle(row.status).color }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Quality Inspection</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Item *</label>
                <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
              </div>
               <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Inspection Type</label>
                <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                  <option>Inward</option>
                  <option>Outward</option>
                  <option>In Process</option>
                </select>
              </div>
               <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Status</label>
                <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                  <option>Accepted</option>
                  <option>Rejected</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#f9fafb', borderRadius: '0 0 8px 8px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsModalOpen(false)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
