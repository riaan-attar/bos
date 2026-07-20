import React, { useState } from 'react';

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

function Section({ title, children }) {
  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e', margin: '0 0 16px 0', paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>{title}</h2>
      {children}
    </div>
  );
}

function SettingRow({ label, desc, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f9fafb' }}>
      <div>
        <div style={{ fontSize: '13px', color: '#374151' }}>{label}</div>
        {desc && <div style={{ fontSize: '11px', color: '#9ca3af' }}>{desc}</div>}
      </div>
      {children}
    </div>
  );
}

const inputStyle = { border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: '#1a1a2e', outline: 'none', backgroundColor: 'var(--control-bg, #ffffff)', minWidth: '200px' };
const selectStyle = { ...inputStyle };

export default function InvoicingSettings() {
  const [enableTDS, setEnableTDS] = useState(false);
  const [enableTCS, setEnableTCS] = useState(false);
  const [autoSendInvoice, setAutoSendInvoice] = useState(false);

  return (
    <div style={{ padding: '24px 20px', fontFamily: 'Inter, sans-serif', color: '#1a1a2e', backgroundColor: '#f8f9fa', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e', marginBottom: '24px' }}>Invoicing Settings</h1>

        <Section title="Company Info">
          <SettingRow label="Company Name" desc="Legal name of your organization">
            <input type="text" defaultValue="Avenue Builders" style={inputStyle} />
          </SettingRow>
          <SettingRow label="GSTIN" desc="GST Identification Number">
            <input type="text" placeholder="27AAAAA0000A1Z5" style={inputStyle} />
          </SettingRow>
          <SettingRow label="PAN" desc="Permanent Account Number">
            <input type="text" placeholder="AAAAA0000A" style={inputStyle} />
          </SettingRow>
          <SettingRow label="Address" desc="Registered office address">
            <textarea rows={2} placeholder="Enter address..." style={{ ...inputStyle, resize: 'vertical' }} />
          </SettingRow>
          <SettingRow label="Financial Year Start" desc="Month when your financial year begins">
            <select style={selectStyle}>
              <option>April</option>
              <option>January</option>
            </select>
          </SettingRow>
        </Section>

        <Section title="Accounting">
          <SettingRow label="Default Currency" desc="Base currency (Locked)">
            <div style={{ padding: '6px 10px', fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>INR</div>
          </SettingRow>
          <SettingRow label="Accounts Receivable Account" desc="Default AR account">
            <input type="text" defaultValue="Accounts Receivable" style={inputStyle} />
          </SettingRow>
          <SettingRow label="Accounts Payable Account" desc="Default AP account">
            <input type="text" defaultValue="Accounts Payable" style={inputStyle} />
          </SettingRow>
          <SettingRow label="Default Bank Account" desc="Primary bank account for payments">
            <input type="text" defaultValue="Bank - HDFC" style={inputStyle} />
          </SettingRow>
        </Section>

        <Section title="Tax">
          <SettingRow label="Default GST Rate (%)" desc="Applied to new sales/purchase invoices">
            <input type="number" defaultValue={18} style={{ ...inputStyle, minWidth: '80px' }} />
          </SettingRow>
          <SettingRow label="Enable TDS" desc="Tax Deducted at Source">
            <Toggle isOn={enableTDS} onToggle={() => setEnableTDS(!enableTDS)} />
          </SettingRow>
          <SettingRow label="Enable TCS" desc="Tax Collected at Source">
            <Toggle isOn={enableTCS} onToggle={() => setEnableTCS(!enableTCS)} />
          </SettingRow>
        </Section>

        <Section title="Invoice Settings">
          <SettingRow label="Invoice Prefix" desc="Prefix for auto-generated invoice IDs">
            <input type="text" defaultValue="SINV" style={{ ...inputStyle, minWidth: '100px' }} />
          </SettingRow>
          <SettingRow label="Auto Send Invoice" desc="Automatically email invoice on submit">
            <Toggle isOn={autoSendInvoice} onToggle={() => setAutoSendInvoice(!autoSendInvoice)} />
          </SettingRow>
          <SettingRow label="Default Payment Terms" desc="Applied to new invoices">
            <select style={selectStyle}>
              <option>Immediate</option>
              <option>30 Days</option>
              <option>60 Days</option>
              <option>Custom</option>
            </select>
          </SettingRow>
        </Section>

        <button style={{ background: '#000000', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '10px 24px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
