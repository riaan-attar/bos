/**
 * AddLeadModal — client/src/modules/crm/leads/AddLeadModal.jsx
 * Modal for creating a new CRM lead.
 * Props: isOpen, onClose, onSave
 */
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const STATUS_OPTIONS = [
  'New', 'Contacted', 'Replied', 'Interested',
  'Converted', 'Do Not Contact', 'Junk',
];

const SOURCE_OPTIONS = [
  'Walk-in', '99acres', 'MagicBricks', 'Housing.com',
  'Instagram', 'Facebook', 'WhatsApp', 'Referral',
  'Cold Call', 'Other',
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  jobTitle: '',
  organization: '',
  status: 'New',
  leadSource: 'Walk-in',
  notes: '',
};

/* ─── Shared styles ─────────────────────────────────────────── */
const inputStyle = {
  width: '100%',
  background: '#232323',
  border: '1px solid #343434',
  borderRadius: '6px',
  padding: '7px 11px',
  fontSize: '13px',
  color: '#f8f8f8',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '500',
  color: '#7c7c7c',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '5px',
};

function FieldGroup({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function FocusInput({ as: Tag = 'input', style: extraStyle, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <Tag
      {...props}
      style={{
        ...inputStyle,
        ...extraStyle,
        borderColor: focused ? '#388AE5' : '#343434',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function AddLeadModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const overlayRef = useRef(null);

  /* Reset form when modal opens */
  useEffect(() => {
    if (isOpen) setForm(INITIAL_FORM);
  }, [isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleSave() {
    onSave(form);
    onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Modal box */}
      <div
        style={{
          background: '#1a1a1a',
          border: '1px solid #2b2b2b',
          borderRadius: '10px',
          width: '500px',
          maxWidth: '94vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '22px',
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#f8f8f8' }}>
            New Lead
          </span>
          <button
            onClick={onClose}
            title="Close"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              color: '#6b6b6b',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f8f8f8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b6b6b')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Row 1 — First Name / Last Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FieldGroup label="First Name">
              <FocusInput
                type="text"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
              />
            </FieldGroup>
            <FieldGroup label="Last Name">
              <FocusInput
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
              />
            </FieldGroup>
          </div>

          {/* Row 2 — Email */}
          <FieldGroup label="Email">
            <FocusInput
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </FieldGroup>

          {/* Row 3 — Mobile / Job Title */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FieldGroup label="Mobile No">
              <FocusInput
                type="tel"
                name="mobile"
                placeholder="+91 98765 43210"
                value={form.mobile}
                onChange={handleChange}
              />
            </FieldGroup>
            <FieldGroup label="Job Title">
              <FocusInput
                type="text"
                name="jobTitle"
                placeholder="e.g. Director"
                value={form.jobTitle}
                onChange={handleChange}
              />
            </FieldGroup>
          </div>

          {/* Row 4 — Organization */}
          <FieldGroup label="Organization">
            <FocusInput
              type="text"
              name="organization"
              placeholder="Company or builder name"
              value={form.organization}
              onChange={handleChange}
            />
          </FieldGroup>

          {/* Row 5 — Status / Lead Source */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FieldGroup label="Status">
              <FocusInput
                as="select"
                name="status"
                value={form.status}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt} value={opt} style={{ background: '#232323' }}>
                    {opt}
                  </option>
                ))}
              </FocusInput>
            </FieldGroup>
            <FieldGroup label="Lead Source">
              <FocusInput
                as="select"
                name="leadSource"
                value={form.leadSource}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              >
                {SOURCE_OPTIONS.map(opt => (
                  <option key={opt} value={opt} style={{ background: '#232323' }}>
                    {opt}
                  </option>
                ))}
              </FocusInput>
            </FieldGroup>
          </div>

          {/* Row 6 — Notes */}
          <FieldGroup label="Notes">
            <FocusInput
              as="textarea"
              name="notes"
              rows={3}
              placeholder="Additional notes..."
              value={form.notes}
              onChange={handleChange}
              style={{ resize: 'vertical' }}
            />
          </FieldGroup>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '22px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #343434',
              borderRadius: '6px',
              padding: '7px 16px',
              fontSize: '13px',
              color: '#afafaf',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#232323';
              e.currentTarget.style.color = '#f8f8f8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#afafaf';
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '6px',
              padding: '7px 16px',
              fontSize: '13px',
              fontWeight: '500',
              color: '#111111',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e5e7eb')}
            onMouseLeave={e => (e.currentTarget.style.background = '#f3f4f6')}
          >
            Save Lead
          </button>
        </div>
      </div>
    </div>
  );
}
