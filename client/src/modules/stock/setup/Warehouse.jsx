import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns, Building2, AlertTriangle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_WAREHOUSE_DATA = [];

const mapItem = (item) => ({
  id: item.id || item._id || item.name || '—',
  name: item.name || item.warehouse_name || '—',
  type: item.type || item.warehouse_type || '—',
  city: item.city || item.location || '—',
  stockValue: item.stockValue || item.stock_value || item.total_value || 0,
  status: item.status || 'Active',
});

const getTypeStyle = (type) => {
  switch (type) {
    case 'Stores': return { bg: '#dbeafe', color: '#1d4ed8' };
    case 'Work In Progress': return { bg: '#fef9c3', color: '#a16207' };
    case 'Finished Goods': return { bg: '#dcfce7', color: '#15803d' };
    case 'Transit': return { bg: '#f3e8ff', color: '#7e22ce' };
    default: return { bg: '#f3f4f6', color: '#6b7280' };
  }
};

export default function Warehouse() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Stores', city: '', address: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `${API_BASE}/api/stock/warehouses`;
      console.log('Fetching from:', apiUrl);
      
      const res = await axios.get(apiUrl);
      
      console.log('Response status:', res.status);
      console.log('Response data:', res.data);
      console.log('Data type:', typeof res.data);
      console.log('Is array:', Array.isArray(res.data));
      
      let fetchedItems = [];
      
      if (Array.isArray(res.data)) {
        fetchedItems = res.data;
      } else if (res.data?.data) {
        fetchedItems = res.data.data;
      } else if (res.data?.warehouses) {
        fetchedItems = res.data.warehouses;
      } else if (res.data?.result) {
        fetchedItems = res.data.result;
      }
      
      console.log('Parsed items:', fetchedItems);
      console.log('Items count:', fetchedItems.length);
      
      if (fetchedItems.length > 0) {
        setData(fetchedItems.map(mapItem));
      } else {
        console.log('No data from API');
        setData(FALLBACK_WAREHOUSE_DATA);
      }
      
    } catch (err) {
      console.error('API Error:', err.message);
      console.error('Error details:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setData(FALLBACK_WAREHOUSE_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE}/api/stock/warehouses`, form);
      setShowModal(false);
      setForm({ name: '', type: 'Stores', city: '', address: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#6b7280', fontSize: 13, gap: 8 }}>
      <div style={{ width: 20, height: 20, border: '2px solid #e5e7eb', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      Loading...
    </div>
  );

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Warehouse</h1>
        <button
          onClick={() => setShowModal(true)}
          style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', fontWeight: '500', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e2e2e2'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          <Plus size={14} color="#111111" /> + Add Warehouse
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
          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}>
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
        </div>
      </div>

      {data.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '280px', gap: 16 }}>
          <Building2 size={48} color="#d1d5db" strokeWidth={1} />
          <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>No warehouses found</p>
          <button onClick={() => setShowModal(true)} style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 18px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
            + Add Warehouse
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
                <th style={{ padding: '12px 16px', width: 40 }}><input type="checkbox" /></th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Warehouse Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>City</th>
                <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Stock Value</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((wh) => (
                <tr key={wh.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '12px 16px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{wh.name}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: getTypeStyle(wh.type).bg, color: getTypeStyle(wh.type).color }}>
                      {wh.type || '—'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{wh.city || '—'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>
                    ₹{(parseFloat(wh.stockValue) || 0).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: '#dcfce7', color: '#15803d' }}>
                      {wh.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Warehouse</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Warehouse Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                  <option>Stores</option>
                  <option>Work In Progress</option>
                  <option>Finished Goods</option>
                  <option>Transit</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>City</label>
                <input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Address</label>
                <textarea rows={2} value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '12px', backgroundColor: '#f9fafb', borderRadius: '0 0 8px 8px' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSubmit} style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
