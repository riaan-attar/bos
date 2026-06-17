/**
 * LeadList — client/src/modules/crm/leads/LeadList.jsx
 * Lead list page for BOS CRM module.
 * Renders: filter bar + content only.
 * Topbar actions are injected via TopbarContext.
 *
 * Dropdowns use ReactDOM.createPortal so they escape the
 * overflowX:auto filter bar and are never clipped.
 */
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  LayoutList,
  Bookmark,
  RefreshCw,
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronsUpDown,
  FileText,
} from 'lucide-react';
import AddLeadModal from './AddLeadModal';
import FilterPanel from './FilterPanel';
import { TopbarContext } from '../../../context/TopbarContext';

/* ─── Status badge config ─────────────────────────────────────── */
const STATUS_STYLES = {
  'New':            { background: '#0e2037', color: '#5aaef2' },
  'Contacted':      { background: '#232323', color: '#afafaf' },
  'Replied':        { background: '#371e06', color: '#e79913' },
  'Interested':     { background: '#0b2e1c', color: '#30a66d' },
  'Converted':      { background: '#173b2c', color: '#28a745' },
  'Do Not Contact': { background: '#361515', color: '#e03636' },
  'Junk':           { background: '#232323', color: '#7c7c7c' },
};

/* ─── Operator lists ──────────────────────────────────────────── */
const TEXT_OPERATORS   = ['Equals', 'Like'];
const STATUS_OPERATORS = ['Equals', 'Not Equals', 'Is Empty', 'Is Not Empty'];

/* ─── useHover ────────────────────────────────────────────────── */
function useHover() {
  const [hovered, setHovered] = useState(false);
  return [hovered, { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) }];
}

/* ─── TopbarBtn ───────────────────────────────────────────────── */
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

/* ─── Add Lead primary button ─────────────────────────────────── */
function AddLeadBtn({ onClick }) {
  const [hov, hoverProps] = useHover();
  return (
    <button
      {...hoverProps}
      onClick={onClick}
      style={{
        background: hov ? '#e5e7eb' : '#f3f4f6',
        border: 'none',
        borderRadius: '6px',
        padding: '4px 12px',
        height: '28px',
        fontSize: '12px',
        fontWeight: '500',
        color: '#111111',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.15s',
      }}
    >
      <Plus size={13} color="#111111" />
      Add Lead
    </button>
  );
}

/* ─── Portal dropdown (escapes overflow container) ───────────── */
function PortalDropdown({ anchorRect, operators, onSelect, onClose }) {
  if (!anchorRect) return null;

  const style = {
    position: 'fixed',
    top: anchorRect.bottom + 4,
    left: anchorRect.left,
    background: '#1c1c1c',
    border: '1px solid #343434',
    borderRadius: '6px',
    padding: '4px 0',
    zIndex: 9999,
    minWidth: '130px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
    fontFamily: 'Inter, sans-serif',
  };

  return ReactDOM.createPortal(
    <div className="operator-dropdown" style={style}>
      {operators.map(op => (
        <OperatorOption key={op} label={op} onSelect={() => { onSelect(op); onClose(); }} />
      ))}
    </div>,
    document.body
  );
}

function OperatorOption({ label, onSelect }) {
  const [hov, hoverProps] = useHover();
  return (
    <div
      {...hoverProps}
      onMouseDown={e => { e.preventDefault(); e.stopPropagation(); onSelect(); }}
      style={{
        padding: '6px 14px',
        fontSize: '12.5px',
        color: hov ? '#f8f8f8' : '#afafaf',
        background: hov ? '#2b2b2b' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.1s, color 0.1s',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  );
}

/* ─── Portal tooltip (escapes overflow container) ────────────── */
function PortalTooltip({ anchorRect, text }) {
  if (!anchorRect) return null;
  const left = anchorRect.left + anchorRect.width / 2;
  const top = anchorRect.bottom + 6;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top,
        left,
        transform: 'translateX(-50%)',
        background: '#1c1c1c',
        border: '1px solid #343434',
        borderRadius: '6px',
        padding: '4px 10px',
        fontSize: '12px',
        color: '#f8f8f8',
        whiteSpace: 'nowrap',
        zIndex: 9998,
        pointerEvents: 'none',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {text}
    </div>,
    document.body
  );
}

/* ─── FilterChip ─────────────────────────────────────────────── */
function FilterChip({
  label,
  fullLabel,
  showApprox,
  showChevron,
  chipKey,
  openOperator,
  onIconClick,
  style,
}) {
  const [chipHov, setChipHov] = useState(false);
  const [iconHov, setIconHov]   = useState(false);
  const [showTip, setShowTip]   = useState(false);
  const [chipRect, setChipRect] = useState(null);
  const [iconRect, setIconRect] = useState(null);
  const chipRef = useRef(null);
  const iconRef = useRef(null);

  const hasIcon = showApprox || showChevron;
  const isOpen  = openOperator === chipKey;
  const operators = showChevron ? STATUS_OPERATORS : TEXT_OPERATORS;

  const updateChipRect = useCallback(() => {
    if (chipRef.current) setChipRect(chipRef.current.getBoundingClientRect());
  }, []);
  const updateIconRect = useCallback(() => {
    if (iconRef.current) setIconRect(iconRef.current.getBoundingClientRect());
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flex: 1 }}>
      {/* Chip body */}
      <div
        ref={chipRef}
        onMouseEnter={() => { setChipHov(true); setShowTip(true); updateChipRect(); }}
        onMouseLeave={() => { setChipHov(false); setShowTip(false); }}
        style={{
          height: '26px',
          background: '#171717',
          border: `1px solid ${chipHov ? '#383838' : '#2b2b2b'}`,
          borderRadius: '5px',
          padding: hasIcon ? '0 0 0 8px' : '0 8px',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          minWidth: 0,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'border-color 0.15s',
          color: chipHov ? '#afafaf' : '#6b6b6b',
          ...style,
        }}
      >
        <span
          style={{
            flex: 1,
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>

        {hasIcon && (
          <div
            ref={iconRef}
            onMouseEnter={() => { setIconHov(true); setShowTip(false); updateIconRect(); }}
            onMouseLeave={() => { setIconHov(false); }}
            onClick={e => {
              e.stopPropagation();
              updateIconRect();
              onIconClick(chipKey);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '0 8px',
              borderLeft: `1px solid ${chipHov ? '#383838' : '#2b2b2b'}`,
              borderRadius: '0 4px 4px 0',
              background: iconHov ? '#343434' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            {showApprox && (
              <span
                style={{
                  color: iconHov ? '#f8f8f8' : '#5a5a5a',
                  fontSize: '14px',
                  lineHeight: 1,
                  transition: 'color 0.15s',
                }}
              >
                ≈
              </span>
            )}
            {showChevron && (
              <ChevronDown
                size={11}
                color={iconHov ? '#f8f8f8' : '#6b6b6b'}
                style={{ transition: 'color 0.15s' }}
              />
            )}
          </div>
        )}
      </div>

      {/* Tooltip — via portal */}
      {showTip && !isOpen && chipRect && (
        <PortalTooltip anchorRect={chipRect} text={fullLabel || label} />
      )}

      {/* Operator dropdown — via portal */}
      {isOpen && iconRect && (
        <PortalDropdown
          anchorRect={iconRect}
          operators={operators}
          onSelect={() => {}}
          onClose={() => onIconClick(null)}
        />
      )}
    </div>
  );
}

/* ─── Clear chip ──────────────────────────────────────────────── */
function ClearChip() {
  const [hov, hoverProps] = useHover();
  return (
    <div
      {...hoverProps}
      style={{
        height: '26px',
        background: '#171717',
        border: `1px solid ${hov ? '#383838' : '#2b2b2b'}`,
        borderRadius: '5px',
        width: '26px',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: hov ? '#afafaf' : '#7c7c7c',
        transition: 'border-color 0.15s, color 0.15s',
      }}
    >
      <X size={11} />
    </div>
  );
}

/* ─── Filter toggle button ────────────────────────────────────── */
function FilterBtn({ active, onClick }) {
  const [hov, hoverProps] = useHover();
  return (
    <div
      {...hoverProps}
      onClick={onClick}
      className="filter-bar-filter-btn"
      style={{
        height: '26px',
        background: active ? '#232323' : '#171717',
        border: `1px solid ${active || hov ? '#383838' : '#2b2b2b'}`,
        borderRadius: '5px',
        padding: '0 8px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        color: active ? '#f8f8f8' : hov ? '#afafaf' : '#6b6b6b',
        transition: 'border-color 0.15s, color 0.15s, background 0.15s',
        flexShrink: 0,
      }}
    >
      <SlidersHorizontal size={11} />
      Filter
    </div>
  );
}

/* ─── Created On sort chip ────────────────────────────────────── */
function SortChip() {
  const [hov, hoverProps] = useHover();
  return (
    <div
      {...hoverProps}
      style={{
        height: '26px',
        background: '#171717',
        border: `1px solid ${hov ? '#383838' : '#2b2b2b'}`,
        borderRadius: '5px',
        padding: '0 8px',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        color: hov ? '#afafaf' : '#6b6b6b',
        transition: 'border-color 0.15s, color 0.15s',
        marginLeft: 'auto',
        flexShrink: 0,
      }}
    >
      Created On
      <ChevronDown size={11} />
    </div>
  );
}

/* ─── Status Badge ────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES['Contacted'];
  return (
    <span
      style={{
        ...s,
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '11px',
        fontWeight: '500',
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  );
}

/* ─── Empty State ─────────────────────────────────────────────── */
function EmptyState({ onAdd }) {
  const [hov, hoverProps] = useHover();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        background: '#0f0f0f',
      }}
    >
      <FileText size={52} color="#2b2b2b" strokeWidth={1} />
      <p
        style={{
          fontSize: '14px',
          color: '#6b6b6b',
          margin: '16px 0 0',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        You haven't created a Lead yet
      </p>
      <button
        {...hoverProps}
        onClick={onAdd}
        style={{
          marginTop: '14px',
          background: hov ? '#232323' : '#1c1c1c',
          border: '1px solid #2b2b2b',
          borderRadius: '20px',
          padding: '8px 22px',
          fontSize: '13px',
          color: '#f8f8f8',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          transition: 'background 0.15s',
        }}
      >
        Create your first Lead
      </button>
    </div>
  );
}

/* ─── Data Table ──────────────────────────────────────────────── */
const TABLE_COLS = [
  { key: 'id',           label: 'ID' },
  { key: 'name',         label: 'Name' },
  { key: 'jobTitle',     label: 'Job Title' },
  { key: 'status',       label: 'Status' },
  { key: 'organization', label: 'Organization' },
  { key: 'mobile',       label: 'Mobile' },
  { key: 'leadSource',   label: 'Lead Source' },
  { key: 'createdOn',    label: 'Created On' },
];

function LeadRow({ lead }) {
  const [hov, hoverProps] = useHover();
  return (
    <tr
      {...hoverProps}
      style={{
        background: hov ? '#171717' : '#0a0a0a',
        borderBottom: '1px solid #1c1c1c',
        cursor: 'pointer',
        transition: 'background 0.1s',
      }}
    >
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>{lead.id}</td>
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>
        {[lead.firstName, lead.lastName].filter(Boolean).join(' ') || '—'}
      </td>
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>{lead.jobTitle || '—'}</td>
      <td style={{ padding: '10px 14px' }}>
        <StatusBadge status={lead.status} />
      </td>
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>{lead.organization || '—'}</td>
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>{lead.mobile || '—'}</td>
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>{lead.leadSource}</td>
      <td style={{ padding: '10px 14px', color: '#e2e2e2' }}>{lead.createdOn}</td>
    </tr>
  );
}

function LeadTable({ leads }) {
  return (
    <div style={{ overflowX: 'auto', flex: 1, background: '#0f0f0f' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12.5px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <thead>
          <tr style={{ background: '#0f0f0f', borderBottom: '1px solid #232323' }}>
            {TABLE_COLS.map(col => (
              <th
                key={col.key}
                style={{
                  padding: '10px 14px',
                  color: '#7c7c7c',
                  fontWeight: '500',
                  textAlign: 'left',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export default function LeadList() {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [openOperator, setOpenOperator] = useState(null);
  const { setRightActions } = useContext(TopbarContext);

  /* Close operator dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.operator-dropdown')) {
        setOpenOperator(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleIconClick = useCallback((key) => {
    setOpenOperator(prev => prev === key ? null : key);
  }, []);

  /* Inject action buttons into the Topbar right side */
  useEffect(() => {
    const actions = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <TopbarBtn>
          <LayoutList size={13} />
          List View
          <ChevronsUpDown size={11} color="#424242" />
        </TopbarBtn>
        <TopbarBtn>
          <Bookmark size={13} />
          Saved Filters
          <ChevronsUpDown size={11} color="#424242" />
        </TopbarBtn>
        <TopbarBtn style={{ padding: '4px 7px' }}>
          <RefreshCw size={13} color="#7c7c7c" />
        </TopbarBtn>
        <TopbarBtn style={{ padding: '4px 7px' }}>
          <MoreHorizontal size={13} color="#7c7c7c" />
        </TopbarBtn>
        <AddLeadBtn onClick={() => setShowModal(true)} />
      </div>
    );
    setRightActions(actions);
    return () => setRightActions(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRightActions(prev => {
      if (!prev) return prev;
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TopbarBtn>
            <LayoutList size={13} />
            List View
            <ChevronsUpDown size={11} color="#424242" />
          </TopbarBtn>
          <TopbarBtn>
            <Bookmark size={13} />
            Saved Filters
            <ChevronsUpDown size={11} color="#424242" />
          </TopbarBtn>
          <TopbarBtn style={{ padding: '4px 7px' }}>
            <RefreshCw size={13} color="#7c7c7c" />
          </TopbarBtn>
          <TopbarBtn style={{ padding: '4px 7px' }}>
            <MoreHorizontal size={13} color="#7c7c7c" />
          </TopbarBtn>
          <AddLeadBtn onClick={() => setShowModal(true)} />
        </div>
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleSave = (formData) => {
    const newLead = {
      ...formData,
      id: `LEAD-${String(leads.length + 1).padStart(4, '0')}`,
      createdOn: new Date().toLocaleDateString('en-IN'),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0f0f0f',
        position: 'relative',
      }}
    >
      {/* ── FILTER BAR ────────────────────────────────────────── */}
      <div
        style={{
          height: '40px',
          minHeight: '40px',
          background: '#0a0a0a',
          borderBottom: '1px solid #1c1c1c',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          flexShrink: 0,
          /* overflow:auto clips absolute children — dropdowns use portals instead */
        }}
      >
        <FilterChip chipKey="id"        label="ID"               fullLabel="ID"                showApprox   openOperator={openOperator} onIconClick={handleIconClick} />
        <FilterChip chipKey="jobTitle"  label="Job Title"        fullLabel="Job Title"         showApprox   openOperator={openOperator} onIconClick={handleIconClick} />
        <FilterChip chipKey="status"    label="Status"           fullLabel="Status"            showChevron  openOperator={openOperator} onIconClick={handleIconClick} />
        <FilterChip chipKey="orgName"   label="Organization Na…" fullLabel="Organization Name" showApprox   openOperator={openOperator} onIconClick={handleIconClick} style={{ maxWidth: '140px' }} />
        <FilterChip chipKey="territory" label="Territory"        fullLabel="Territory"                      openOperator={openOperator} onIconClick={handleIconClick} />
        <FilterChip chipKey="title"     label="Title"            fullLabel="Title"             showApprox   openOperator={openOperator} onIconClick={handleIconClick} />

        <FilterBtn
          active={showFilterPanel}
          onClick={() => setShowFilterPanel(prev => !prev)}
        />

        <ClearChip />
        <SortChip />
      </div>

      {/* ── FILTER PANEL ──────────────────────────────────────── */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
      />

      {/* ── CONTENT ───────────────────────────────────────────── */}
      {leads.length === 0
        ? <EmptyState onAdd={() => setShowModal(true)} />
        : <LeadTable leads={leads} />
      }

      {/* ── ADD LEAD MODAL ────────────────────────────────────── */}
      <AddLeadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}
