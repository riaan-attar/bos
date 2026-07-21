import React, { useState, useContext, useEffect, useCallback } from 'react';
import { LayoutList, Bookmark, RefreshCw, MoreHorizontal } from 'lucide-react';
import { TopbarContext } from '../../context/TopbarContext';

/* ─── Topbar actions for this form page (no Add button) ─────── */
function useHover() {
  const [hov, setHov] = useState(false);
  return [hov, { onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) }];
}

function TopbarBtn({ children, style, ...props }) {
  const [hov, hoverProps] = useHover();
  return (
    <button
      {...props}
      {...hoverProps}
      style={{
        background: hov ? '#2b2b2b' : '#1c1c1c',
        border: '1px solid #2b2b2b',
        borderRadius: '6px',
        padding: '4px 10px',
        height: '28px',
        fontSize: '12px',
        color: hov ? '#f8f8f8' : '#afafaf',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.15s, color 0.15s',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function FormActions() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TopbarBtn>
        <LayoutList size={13} />
        List View
      </TopbarBtn>
      <TopbarBtn>
        <Bookmark size={13} />
        Saved Filters
      </TopbarBtn>
      <TopbarBtn style={{ padding: '4px 7px' }}>
        <RefreshCw size={13} color="#7c7c7c" />
      </TopbarBtn>
      <TopbarBtn style={{ padding: '4px 7px' }}>
        <MoreHorizontal size={13} color="#7c7c7c" />
      </TopbarBtn>
    </div>
  );
}

/* ─── Label helper ─────────────────────────────────────────── */
function FieldLabel({ text, required }) {
  return (
    <label style={{ display: 'block', fontSize: '13px', color: '#374151', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>
      {text}
      {required && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
    </label>
  );
}

const selectStyle = {
  width: '100%',
  maxWidth: '500px',
  background: '#f3f4f6',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  padding: '8px 12px',
  fontSize: '13px',
  color: '#374151',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  cursor: 'pointer',
};

/* ═══════════════════════════════════════════════════════════ */
export default function PaymentReconciliation() {
  const { setRightActions } = useContext(TopbarContext);
  const [company, setCompany] = useState('');
  const [partyType, setPartyType] = useState('');
  const [showResults, setShowResults] = useState(false);

  const injectActions = useCallback(() => {
    setRightActions(<FormActions />);
  }, [setRightActions]);

  useEffect(() => {
    injectActions();
    return () => setRightActions(null);
  }, [injectActions]);

  const canSearch = company && partyType;

  return (
    <div style={{ flex: 1, background: '#0f0f0f', overflowY: 'auto' }}>
      {/* Not Saved banner row */}
      <div style={{
        background: '#0a0a0a',
        borderBottom: '1px solid #1c1c1c',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minHeight: '40px',
      }}>
        <span style={{ fontSize: '13px', color: '#7c7c7c', fontFamily: 'Inter, sans-serif' }}>
          Payment Reconciliation
        </span>
        <span style={{
          background: '#2a1a00',
          color: '#e79913',
          borderRadius: '10px',
          padding: '2px 10px',
          fontSize: '11px',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
        }}>
          Not Saved
        </span>
      </div>

      {/* Form body */}
      <div style={{ padding: '24px 20px', maxWidth: '600px' }}>

        {/* Company */}
        <div>
          <FieldLabel text="Company" required />
          <select
            value={company}
            onChange={e => { setCompany(e.target.value); setShowResults(false); }}
            style={selectStyle}
          >
            <option value="">Select Company</option>
            <option value="Avenue Builders">Avenue Builders</option>
          </select>
        </div>

        {/* Party Type */}
        <div style={{ marginTop: '20px' }}>
          <FieldLabel text="Party Type" required />
          <select
            value={partyType}
            onChange={e => { setPartyType(e.target.value); setShowResults(false); }}
            style={selectStyle}
          >
            <option value="">Select Party Type</option>
            <option value="Customer">Customer</option>
            <option value="Supplier">Supplier</option>
          </select>
        </div>

        {/* Get Entries button — appears once both fields filled */}
        {canSearch && !showResults && (
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={() => setShowResults(true)}
              style={{
                background: '#1c1c1c',
                border: '1px solid #2b2b2b',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '13px',
                color: '#f8f8f8',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'background 0.15s',
              }}
            >
              Get Unreconciled Entries
            </button>
          </div>
        )}

        {/* Empty results once searched */}
        {showResults && (
          <>
            <div style={{ marginTop: '28px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#afafaf', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                Unreconciled Payments
              </p>
              <div style={{
                background: '#141414',
                border: '1px solid #232323',
                borderRadius: '6px',
                padding: '24px',
                textAlign: 'center',
                color: '#4b4b4b',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}>
                No unreconciled payments found.
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#afafaf', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                Invoices
              </p>
              <div style={{
                background: '#141414',
                border: '1px solid #232323',
                borderRadius: '6px',
                padding: '24px',
                textAlign: 'center',
                color: '#4b4b4b',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}>
                No outstanding invoices found.
              </div>
            </div>
            <button
              style={{
                marginTop: '20px',
                background: '#1c1c1c',
                border: '1px solid #2b2b2b',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '13px',
                color: '#afafaf',
                cursor: 'not-allowed',
                fontFamily: 'Inter, sans-serif',
                opacity: 0.5,
              }}
              disabled
            >
              Reconcile
            </button>
          </>
        )}
      </div>
    </div>
  );
}
