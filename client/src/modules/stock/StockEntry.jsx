import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, LayoutList, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns, X } from 'lucide-react';
import { warehousesApi, itemsApi } from '../../services/stockApi';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_STOCK_ENTRIES = [
  {
    id: 'STE-2026-00001',
    stockEntryType: 'Material Transfer',
    fromWarehouse: 'Main Warehouse - BID',
    toWarehouse: 'Gangapur Site Store',
    totalValue: 85000,
    postingDate: '10/06/2026',
    status: 'Submitted',
  },
  {
    id: 'STE-2026-00002',
    stockEntryType: 'Material Issue',
    fromWarehouse: 'Gangapur Site Store',
    toWarehouse: '—',
    totalValue: 42000,
    postingDate: '12/06/2026',
    status: 'Submitted',
  },
  {
    id: 'STE-2026-00003',
    stockEntryType: 'Material Receipt',
    fromWarehouse: '—',
    toWarehouse: 'Main Warehouse - BID',
    totalValue: 156000,
    postingDate: '14/06/2026',
    status: 'Submitted',
  },
  {
    id: 'STE-2026-00004',
    stockEntryType: 'Material Transfer',
    fromWarehouse: 'Main Warehouse - BID',
    toWarehouse: 'Nashik Road Store',
    totalValue: 63000,
    postingDate: '15/06/2026',
    status: 'Submitted',
  },
  {
    id: 'STE-2026-00005',
    stockEntryType: 'Stock Reconciliation',
    fromWarehouse: '—',
    toWarehouse: 'Satpur Site Store',
    totalValue: 28000,
    postingDate: '16/06/2026',
    status: 'Draft',
  },
  {
    id: 'STE-2026-00006',
    stockEntryType: 'Material Issue',
    fromWarehouse: 'Nashik Road Store',
    toWarehouse: '—',
    totalValue: 18500,
    postingDate: '17/06/2026',
    status: 'Draft',
  },
  {
    id: 'STE-2026-00007',
    stockEntryType: 'Material Transfer',
    fromWarehouse: 'Gangapur Site Store',
    toWarehouse: 'Main Warehouse - BID',
    totalValue: 12000,
    postingDate: '18/06/2026',
    status: 'Submitted',
  },
  {
    id: 'STE-2026-00008',
    stockEntryType: 'Material Receipt',
    fromWarehouse: '—',
    toWarehouse: 'Gangapur Site Store',
    totalValue: 95000,
    postingDate: '19/06/2026',
    status: 'Draft',
  },
];

const mapItem = (item) => ({
  id: item.id || item._id || item.name,
  stockEntryType: 
    item.stockEntryType || 
    item.stock_entry_type || 
    item.type || '—',
  fromWarehouse: 
    item.fromWarehouse || 
    item.from_warehouse || 
    item.source_warehouse || '—',
  toWarehouse: 
    item.toWarehouse || 
    item.to_warehouse || 
    item.target_warehouse || '—',
  totalValue: 
    item.totalValue || 
    item.total_value || 
    item.total_amount || 0,
  postingDate: 
    item.postingDate || 
    item.posting_date || 
    item.date || '—',
  status: 
    item.status || 'Draft',
});

export default function StockEntry() {
  const [stockEntries, setStockEntries] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    warehousesApi.getAll().then(res => setWarehouses(Array.isArray(res.data) ? res.data : [])).catch(console.error);
    itemsApi.getAll().then(res => setItems(Array.isArray(res.data) ? res.data : [])).catch(console.error);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const apiUrl = `${API_BASE}/api/stock/stock-entries`;
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
      } else if (res.data?.stock_entries) {
        fetchedItems = res.data.stock_entries;
      } else if (res.data?.result) {
        fetchedItems = res.data.result;
      }
      
      console.log('Parsed items:', fetchedItems);
      console.log('Items count:', fetchedItems.length);
      
      if (fetchedItems.length > 0) {
        setStockEntries(fetchedItems.map(mapItem));
      } else {
        console.log('No data from API, using fallback');
        setStockEntries(FALLBACK_STOCK_ENTRIES);
      }
      
    } catch (err) {
      console.error('API Error:', err.message);
      console.error('Error details:', err.response?.data);
      console.error('Error status:', err.response?.status);
      setStockEntries(FALLBACK_STOCK_ENTRIES);
    } finally {
      setLoading(false);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [itemsRows, setItemsRows] = useState([{ item: '', qty: 1, rate: 0, amount: 0 }]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Draft': return { bg: '#fef9c3', color: '#a16207' };
      case 'Submitted': return { bg: '#dcfce7', color: '#15803d' };
      case 'Cancelled': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const handleAddItemRow = () => {
    setItemsRows([...itemsRows, { item: '', qty: 1, rate: 0, amount: 0 }]);
  };

  const handleRemoveItemRow = (index) => {
    const newRows = [...itemsRows];
    newRows.splice(index, 1);
    setItemsRows(newRows);
  };

  const handleItemChange = (index, field, value) => {
    const newRows = [...itemsRows];
    newRows[index][field] = value;
    
    if (field === 'item') {
      const selectedItem = items.find(i => i.name === value);
      if (selectedItem) {
        newRows[index].rate = selectedItem.rate;
      }
    }
    
    if (field === 'qty' || field === 'rate' || field === 'item') {
      newRows[index].amount = (parseFloat(newRows[index].qty) || 0) * (parseFloat(newRows[index].rate) || 0);
    }
    
    setItemsRows(newRows);
  };

  const totalAmount = itemsRows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Stock Entry</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#f3f4f6', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '13px', fontWeight: '500', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'background 0.1s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#e2e2e2'}
          onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
        >
          <Plus size={14} color="#111111" /> + Add Stock Entry
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
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Stock Entry Type</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>From Warehouse</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>To Warehouse</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Total Value</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Posting Date</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {stockEntries.map((entry) => (
              <tr key={entry.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{entry.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)' }}>{entry.stockEntryType}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{entry.fromWarehouse}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{entry.toWarehouse}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{(parseFloat(entry.totalValue) || 0).toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{entry.postingDate}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 500,
                    backgroundColor: getStatusStyle(entry.status).bg,
                    color: getStatusStyle(entry.status).color
                  }}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Stock Entry</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '24px', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Stock Entry Type *</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option>Material Transfer</option>
                    <option>Material Issue</option>
                    <option>Material Receipt</option>
                    <option>Stock Reconciliation</option>
                    <option>Send to Subcontractor</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Posting Date</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>From Warehouse</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select warehouse</option>
                    {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>To Warehouse</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select warehouse</option>
                    {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</h3>
                  <button onClick={handleAddItemRow} style={{ background: '#ffffff', color: '#1a1a2e', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>+ Add Item</button>
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                      <th style={{ textAlign: 'left', padding: '8px', fontWeight: 500 }}>Item</th>
                      <th style={{ textAlign: 'right', padding: '8px', fontWeight: 500, width: '100px' }}>Qty</th>
                      <th style={{ textAlign: 'right', padding: '8px', fontWeight: 500, width: '120px' }}>Rate (₹)</th>
                      <th style={{ textAlign: 'right', padding: '8px', fontWeight: 500, width: '120px' }}>Amount (₹)</th>
                      <th style={{ width: '40px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsRows.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '8px' }}>
                          <select 
                            value={row.item}
                            onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                            style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}
                          >
                            <option value="">Select item...</option>
                            {items.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input 
                            type="number" 
                            value={row.qty}
                            onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                            style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', textAlign: 'right', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} 
                          />
                        </td>
                        <td style={{ padding: '8px' }}>
                          <input 
                            type="number" 
                            value={row.rate}
                            onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                            style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', textAlign: 'right', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} 
                          />
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 500 }}>
                          {row.amount.toLocaleString()}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>
                          <button onClick={() => handleRemoveItemRow(index)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Remarks</label>
                <textarea rows={2} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', resize: 'vertical', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}></textarea>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>
                Total Amount: ₹{totalAmount.toLocaleString()}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowModal(false)} style={{ background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => setShowModal(false)} style={{ background: '#ffffff', color: '#1a1a2e', border: '1px solid #1a1a2e', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Save as Draft</button>
                <button onClick={() => setShowModal(false)} style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
