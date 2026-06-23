import React, { useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Toggle({ isOn, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      style={{ width: '40px', height: '22px', borderRadius: '11px', background: isOn ? '#3b82f6' : '#e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 2px', transition: 'background 0.2s', boxSizing: 'border-box' }}
    >
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ffffff', transform: `translateX(${isOn ? '18px' : '0'})`, transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
    </div>
  );
}

export default function ProjectsSettings() {
  const [limitTS, setLimitTS] = useState(false);
  const [autoClose, setAutoClose] = useState(true);
  const [taskAlerts, setTaskAlerts] = useState(true);

  return (
    <div style={{ padding: '24px 20px', fontFamily: 'Inter, sans-serif', color: '#1a1a2e', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '24px' }}></div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>General</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#374151' }}>Holiday List</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Select the default holiday list for projects</div>
            </div>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}><option>Standard Corporate</option><option>Factory Shift</option></select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#374151' }}>Limit Timesheet Creation</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Only allow timesheets for active tasks</div>
            </div>
            <Toggle isOn={limitTS} onToggle={() => setLimitTS(!limitTS)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#374151' }}>Auto Close Tasks</div>
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Close tasks when 100% complete</div>
            </div>
            <Toggle isOn={autoClose} onToggle={() => setAutoClose(!autoClose)} />
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>Billing</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Default Billing Rate</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Fallback hourly rate</div></div>
            <input type="number" defaultValue={1000} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', width: '100px', textAlign: 'right' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Currency</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>System currency</div></div>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}><option>INR</option><option>USD</option><option>EUR</option></select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Tax Rate %</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Default GST/Tax</div></div>
            <input type="number" defaultValue={18} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', width: '100px', textAlign: 'right' }} />
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>Notifications</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Task Overdue Alerts</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Email alerts for late tasks</div></div>
            <Toggle isOn={taskAlerts} onToggle={() => setTaskAlerts(!taskAlerts)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Update Frequency</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>When to send summaries</div></div>
            <select style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}><option>Daily</option><option>Weekly</option><option>Monthly</option></select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
            <div><div style={{ fontSize: '13px', color: '#374151' }}>Alert Recipients</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>Comma separated emails</div></div>
            <input type="text" defaultValue="admin@avenue.com" style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', width: '200px' }} />
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>Data</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', color: '#374151', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Export Data</button>
            <button style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Clear Cache</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{ background: '#111111', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
