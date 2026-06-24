import React, { useState } from 'react';
import { Plus, X, List, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';

export default function Batch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const mockData = [
    { id: 'BATCH-2026-01', item: 'Portland Cement', qty: 500, mfgDate: '01/05/2026', expiry: '01/11/2026', status: 'Active' },
    { id: 'BATCH-2026-02', item: 'Exterior Paint', qty: 200, mfgDate: '15/04/2026', expiry: '15/04/2028', status: 'Active' },
    { id: 'BATCH-2025-11', item: 'Waterproofing Compound', qty: 50, mfgDate: '10/11/2025', expiry: '10/05/2026', status: 'Expired' },
    { id: 'BATCH-2026-03', item: 'Adhesive', qty: 100, mfgDate: '05/06/2026', expiry: '05/06/2027', status: 'Active' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', color: '#15803d' };
      case 'Expired': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Batch</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Batch
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
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Batch ID</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Manufacturing Date</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Expiry Date</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{row.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)' }}>{row.item}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>{row.qty}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.mfgDate}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{row.expiry}</td>
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
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Batch</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Batch ID *</label>
                <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Item</label>
                <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Mfg Date</label>
                  <input type="date" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Expiry Date</label>
                  <input type="date" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
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
