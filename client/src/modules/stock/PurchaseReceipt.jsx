import React, { useState } from 'react';
import { Plus, List, MoreHorizontal, RefreshCw, Filter, ArrowUpDown, Columns, X } from 'lucide-react';
import { MOCK_PURCHASE_RECEIPTS, MOCK_WAREHOUSES } from './stockData';

export default function PurchaseReceipt() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsRows, setItemsRows] = useState([{ item: '', qty: 1, rate: 0, amount: 0 }]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Draft': return { bg: '#fef9c3', color: '#a16207' };
      case 'Submitted': return { bg: '#dcfce7', color: '#15803d' };
      case 'Cancelled': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const handleItemChange = (index, field, value) => {
    const newRows = [...itemsRows];
    newRows[index][field] = value;
    if (field === 'qty' || field === 'rate') {
      newRows[index].amount = (parseFloat(newRows[index].qty) || 0) * (parseFloat(newRows[index].rate) || 0);
    }
    setItemsRows(newRows);
  };

  return (
    <div style={{ padding: '24px 32px', backgroundColor: 'var(--bg-color, #f8f9fa)', minHeight: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary, #1a1a2e)', margin: 0 }}>Purchase Receipt</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Purchase Receipt
        </button>
      </div>

      {/* Toolbar */}
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
              <th style={{ padding: '12px 16px', width: '40px' }}><input type="checkbox" /></th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Supplier</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Items</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Total Qty</th>
              <th style={{ padding: '12px 16px', fontWeight: 500, textAlign: 'right' }}>Total Amount</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PURCHASE_RECEIPTS.map((receipt) => (
              <tr key={receipt.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '12px 16px' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', fontWeight: 500 }}>{receipt.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)' }}>{receipt.supplier}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{receipt.items}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>{receipt.totalQty}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-primary, #1a1a2e)', textAlign: 'right' }}>₹{receipt.totalAmount.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary, #6b7280)' }}>{receipt.date}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: getStatusStyle(receipt.status).bg, color: getStatusStyle(receipt.status).color }}>
                    {receipt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>New Purchase Receipt</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '24px', flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Supplier *</label>
                  <input type="text" style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Date</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>Warehouse</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }}>
                    <option value="">Select warehouse</option>
                    {MOCK_WAREHOUSES.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</h3>
                  <button onClick={() => setItemsRows([...itemsRows, { item: '', qty: 1, rate: 0, amount: 0 }])} style={{ background: '#ffffff', color: '#1a1a2e', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>+ Add Item</button>
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280' }}>
                      <th style={{ textAlign: 'left', padding: '8px', fontWeight: 500 }}>Item</th>
                      <th style={{ textAlign: 'right', padding: '8px', fontWeight: 500, width: '100px' }}>Qty</th>
                      <th style={{ textAlign: 'right', padding: '8px', fontWeight: 500, width: '120px' }}>Rate</th>
                      <th style={{ textAlign: 'right', padding: '8px', fontWeight: 500, width: '120px' }}>Amount</th>
                      <th style={{ width: '40px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsRows.map((row, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '8px' }}><input type="text" value={row.item} onChange={e => handleItemChange(index, 'item', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} /></td>
                        <td style={{ padding: '8px' }}><input type="number" value={row.qty} onChange={e => handleItemChange(index, 'qty', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', textAlign: 'right', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} /></td>
                        <td style={{ padding: '8px' }}><input type="number" value={row.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} style={{ width: '100%', padding: '6px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '13px', textAlign: 'right', backgroundColor: 'var(--control-bg, #ffffff)', color: 'var(--text-color, #1a1a2e)', outline: 'none' }} /></td>
                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 500 }}>{row.amount.toLocaleString()}</td>
                        <td style={{ padding: '8px', textAlign: 'center' }}><button onClick={() => { const r = [...itemsRows]; r.splice(index, 1); setItemsRows(r); }} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={16} /></button></td>
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
                Total Amount: ₹{itemsRows.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setIsModalOpen(false)} style={{ background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => setIsModalOpen(false)} style={{ background: '#ffffff', color: '#1a1a2e', border: '1px solid #1a1a2e', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Save Draft</button>
                <button onClick={() => setIsModalOpen(false)} style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
