import React, { useState } from 'react';
import { Plus, X, AlertTriangle, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';
import { MOCK_ITEMS, MOCK_WAREHOUSES } from '../stockData';

export default function Item() {
  const [showModal, setShowModal] = useState(false);
  
  const getStockColor = (current, reorder) => {
    if (current <= reorder * 0.5) return '#dc2626';
    if (current <= reorder) return '#f59e0b';
    return '#15803d';
  };

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Item</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', fontWeight: '500', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e2e2e2'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          <Plus size={14} color="#111111" /> + Add Item
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
              <th style={{ padding: '12px 16px', width: '40px' }}><input type="checkbox" /></th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item Code</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item Name</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Item Group</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>UOM</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Current Stock</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Reorder Level</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Warehouse</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ITEMS.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{item.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)' }}>{item.name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{item.group}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{item.uom}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{item.rate.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                    {item.currentStock <= item.reorderLevel && <AlertTriangle size={12} color="#f59e0b" />}
                    <span style={{ color: getStockColor(item.currentStock, item.reorderLevel), fontWeight: 500 }}>
                      {item.currentStock.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>{item.reorderLevel.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{item.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Item</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Item Code *</label>
                  <input type="text" placeholder="ITEM-011" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Item Name *</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                 <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Item Group</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option>Construction Material</option>
                    <option>Steel</option>
                    <option>Aggregates</option>
                    <option>Finishing</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Wood & Timber</option>
                    <option>Other</option>
                  </select>
                </div>
                 <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Unit of Measure</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option>Bag</option>
                    <option>KG</option>
                    <option>Nos</option>
                    <option>CFT</option>
                    <option>SqFt</option>
                    <option>Litre</option>
                    <option>Mtr</option>
                    <option>Sheet</option>
                    <option>MT</option>
                    <option>Ton</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Standard Rate</label>
                  <input type="number" placeholder="Rate in ₹" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Reorder Level</label>
                  <input type="number" placeholder="Min stock level" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Opening Stock</label>
                  <input type="number" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Default Warehouse</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select warehouse</option>
                    {MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Description</label>
                <textarea rows={2} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', resize: 'vertical', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}></textarea>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#f9fafb', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setShowModal(false)} style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
