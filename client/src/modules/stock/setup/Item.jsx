import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, X, AlertTriangle, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_DATA = [
  { id: 'ITEM-001', itemCode: 'ITEM-001', itemName: 'Portland Cement', itemGroup: 'Construction Material', uom: 'Bag', rate: 380, currentStock: 180, reorderLevel: 100, warehouse: 'Gangapur Site Store' },
  { id: 'ITEM-002', itemCode: 'ITEM-002', itemName: 'Steel TMT Bars 12mm', itemGroup: 'Steel', uom: 'KG', rate: 65, currentStock: 2200, reorderLevel: 1000, warehouse: 'Gangapur Site Store' },
  { id: 'ITEM-003', itemCode: 'ITEM-003', itemName: 'Red Clay Bricks', itemGroup: 'Construction Material', uom: 'Nos', rate: 8, currentStock: 18000, reorderLevel: 10000, warehouse: 'Nashik Road Store' },
  { id: 'ITEM-004', itemCode: 'ITEM-004', itemName: 'River Sand', itemGroup: 'Aggregates', uom: 'CFT', rate: 45, currentStock: 750, reorderLevel: 500, warehouse: 'Satpur Site Store' },
  { id: 'ITEM-005', itemCode: 'ITEM-005', itemName: 'Ceramic Floor Tiles', itemGroup: 'Finishing', uom: 'SqFt', rate: 55, currentStock: 3200, reorderLevel: 1000, warehouse: 'Nashik Road Store' },
  { id: 'ITEM-006', itemCode: 'ITEM-006', itemName: 'PVC Pipes 4 inch', itemGroup: 'Plumbing', uom: 'Nos', rate: 320, currentStock: 45, reorderLevel: 50, warehouse: 'Gangapur Site Store' },
  { id: 'ITEM-007', itemCode: 'ITEM-007', itemName: 'Electrical Wire 4mm', itemGroup: 'Electrical', uom: 'Mtr', rate: 28, currentStock: 1800, reorderLevel: 500, warehouse: 'Main Warehouse - BID' },
  { id: 'ITEM-008', itemCode: 'ITEM-008', itemName: 'Granite Slabs', itemGroup: 'Finishing', uom: 'SqFt', rate: 120, currentStock: 1100, reorderLevel: 500, warehouse: 'Main Warehouse - BID' },
  { id: 'ITEM-009', itemCode: 'ITEM-009', itemName: 'Paint - Exterior', itemGroup: 'Finishing', uom: 'Litre', rate: 180, currentStock: 320, reorderLevel: 200, warehouse: 'Nashik Road Store' },
  { id: 'ITEM-010', itemCode: 'ITEM-010', itemName: 'Plywood 19mm', itemGroup: 'Wood & Timber', uom: 'Sheet', rate: 1800, currentStock: 95, reorderLevel: 50, warehouse: 'Main Warehouse - BID' },
];

const ITEM_GROUPS = ['Construction Material', 'Steel', 'Aggregates', 'Finishing', 'Plumbing', 'Electrical', 'Wood & Timber'];
const UOMS = ['Bag', 'KG', 'Nos', 'CFT', 'SqFt', 'Mtr', 'Litre', 'Sheet'];

const mapItem = (item) => ({
  id: item.id || item._id || item.name || '—',
  itemCode: item.itemCode || item.item_code || item.name || '—',
  itemName: item.itemName || item.item_name || item.name || '—',
  itemGroup: item.itemGroup || item.item_group || '—',
  uom: item.uom || item.stock_uom || '—',
  rate: item.rate || item.standard_rate || 0,
  currentStock: item.currentStock || item.current_stock || item.actual_qty || 0,
  reorderLevel: item.reorderLevel || item.reorder_level || 0,
  warehouse: item.warehouse || item.default_warehouse || '—',
});

const getStockColor = (current, reorder) => {
  const c = parseFloat(current) || 0;
  const r = parseFloat(reorder) || 0;
  if (c <= r * 0.5) return '#dc2626';
  if (c <= r) return '#f59e0b';
  return '#15803d';
};

export default function Item() {
  const [data, setData] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ itemCode: '', itemName: '', itemGroup: '', uom: '', rate: '', reorderLevel: '', openingStock: '', warehouse: '', description: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = `${API_BASE}/api/stock/items`;
      console.log('Fetching from:', apiUrl);
      
      const [itemsRes, whRes] = await Promise.all([
        axios.get(apiUrl),
        axios.get(`${API_BASE}/api/stock/warehouses`),
      ]);
      
      console.log('Response status:', itemsRes.status);
      console.log('Response data:', itemsRes.data);
      console.log('Data type:', typeof itemsRes.data);
      console.log('Is array:', Array.isArray(itemsRes.data));
      
      let fetchedItems = [];
      
      if (Array.isArray(itemsRes.data)) {
        fetchedItems = itemsRes.data;
      } else if (itemsRes.data?.data) {
        fetchedItems = itemsRes.data.data;
      } else if (itemsRes.data?.items) {
        fetchedItems = itemsRes.data.items;
      } else if (itemsRes.data?.result) {
        fetchedItems = itemsRes.data.result;
      }
      
      console.log('Parsed items:', fetchedItems);
      console.log('Items count:', fetchedItems.length);
      
      if (fetchedItems.length > 0) {
        setData(fetchedItems.map(mapItem));
      } else {
        console.log('No data from API, using fallback');
        setData(FALLBACK_DATA);
      }
      
      setWarehouses(Array.isArray(whRes.data) ? whRes.data : []);
    } catch (err) {
      console.error('API Error:', err.message);
      console.error('Error details:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setData(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE}/api/stock/items`, form);
      setShowModal(false);
      setForm({ itemCode: '', itemName: '', itemGroup: '', uom: '', rate: '', reorderLevel: '', openingStock: '', warehouse: '', description: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#6b7280', fontSize: 13, gap: 8 }}>
      <div style={{ width: 20, height: 20, border: '2px solid #e5e7eb', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      Loading...
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#dc2626', fontSize: 13, gap: 8 }}>
      <AlertTriangle size={24} />
      {error}
      <button onClick={fetchData} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 14px', fontSize: 12, color: '#374151', cursor: 'pointer' }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Item</h1>
        <button onClick={() => setShowModal(true)} style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', fontWeight: '500', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e2e2e2'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}>
          <Plus size={14} color="#111111" /> + Add Item
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#374151', cursor: 'pointer' }}><LayoutList size={13} color="#6b7280" /> List View</button>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}><RefreshCw size={13} color="#6b7280" /></button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}><Filter size={13} /> Filter</button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', color: '#6b7280', cursor: 'pointer' }}><ArrowUpDown size={13} /> Sort</button>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }}><Columns size={13} color="#6b7280" /></button>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: 'var(--table-header-bg, #f9fafb)', color: 'var(--text-secondary, #6b7280)' }}>
              <th style={{ padding: '12px 16px', width: 40 }}><input type="checkbox" /></th>
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
            {data.map((item) => {
              const stockColor = getStockColor(item.currentStock, item.reorderLevel);
              const isLow = (parseFloat(item.currentStock) || 0) <= (parseFloat(item.reorderLevel) || 0);
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '12px 16px' }}><input type="checkbox" /></td>
                  <td style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: 500 }}>{item.itemCode || item.id}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{item.itemName || item.name}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{item.itemGroup || '—'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{item.uom || '—'}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{(parseFloat(item.rate) || 0).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: stockColor, fontWeight: isLow ? 600 : 400 }}>
                    {isLow && <AlertTriangle size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />}
                    {(parseFloat(item.currentStock) || 0).toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)', textAlign: 'right' }}>{(parseFloat(item.reorderLevel) || 0).toLocaleString('en-IN')}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{item.warehouse || item.defaultWarehouse || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Item</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {[
                  { label: 'Item Code *', key: 'itemCode', type: 'text' },
                  { label: 'Item Name *', key: 'itemName', type: 'text' },
                  { label: 'Standard Rate', key: 'rate', type: 'number' },
                  { label: 'Reorder Level', key: 'reorderLevel', type: 'number' },
                  { label: 'Opening Stock', key: 'openingStock', type: 'number' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Item Group</label>
                  <select value={form.itemGroup} onChange={e => setForm({ ...form, itemGroup: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select group</option>
                    {ITEM_GROUPS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>UOM</label>
                  <select value={form.uom} onChange={e => setForm({ ...form, uom: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select UOM</option>
                    {UOMS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Default Warehouse</label>
                  <select value={form.warehouse} onChange={e => setForm({ ...form, warehouse: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select warehouse</option>
                    {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Description</label>
                <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
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
