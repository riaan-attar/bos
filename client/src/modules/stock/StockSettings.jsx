import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Toggle({ isOn, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      style={{ width: '40px', height: '22px', borderRadius: '11px', background: isOn ? '#000000' : '#e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 2px', transition: 'background 0.2s', boxSizing: 'border-box' }}
    >
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ffffff', transform: `translateX(${isOn ? '18px' : '0'})`, transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
    </div>
  );
}

export default function StockSettings() {
  const [autoReorder, setAutoReorder] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [budgetAlert, setBudgetAlert] = useState(true);
  const [linkProjects, setLinkProjects] = useState(true);
  const [autoMaterialReq, setAutoMaterialReq] = useState(false);

  return (
    <div style={{ padding: '24px 20px', fontFamily: 'Inter, sans-serif', color: '#1a1a2e', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', marginBottom: '24px' }}>Stock Settings</h1>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>General</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#374151' }}>Default Warehouse</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Select the primary storage location</div>
            </div>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}>
              <option>Main Warehouse - BID</option>
              <option>Nashik Road Store</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#374151' }}>Auto Reorder</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Automatically generate purchase requests</div>
            </div>
            <Toggle isOn={autoReorder} onToggle={() => setAutoReorder(!autoReorder)} />
          </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#374151' }}>Reorder Method</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>How reorder quantities are calculated</div>
            </div>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}>
              <option>Fixed Reorder Qty</option>
              <option>Min Max</option>
            </select>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>Valuation</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Stock Valuation Method</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Accounting method for inventory</div></div>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}>
              <option>FIFO</option>
              <option>Moving Average</option>
              <option>LIFO</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Currency</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Base currency (Locked)</div></div>
            <div style={{ padding: '6px 10px', fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>INR</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>Alerts</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Low Stock Alert</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Notify when stock reaches threshold</div></div>
            <Toggle isOn={lowStockAlert} onToggle={() => setLowStockAlert(!lowStockAlert)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Alert Threshold %</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Percentage above reorder level to alert</div></div>
            <input type="number" defaultValue={20} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', width: '80px', textAlign: 'right' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Alert Recipients</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Comma separated emails</div></div>
             <input type="text" defaultValue="store@avenue.com" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', width: '200px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Budget Deviation Alert</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Notify if purchase exceeds budget</div></div>
            <Toggle isOn={budgetAlert} onToggle={() => setBudgetAlert(!budgetAlert)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Budget Deviation %</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Acceptable deviation percentage</div></div>
            <input type="number" defaultValue={10} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', width: '80px', textAlign: 'right' }} />
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>Integrations</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Link to Projects</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Enable project-wise stock tracking</div></div>
            <Toggle isOn={linkProjects} onToggle={() => setLinkProjects(!linkProjects)} />
          </div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Auto create Material Request</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Create MR from Project Tasks</div></div>
            <Toggle isOn={autoMaterialReq} onToggle={() => setAutoMaterialReq(!autoMaterialReq)} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
