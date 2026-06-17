/**
 * LeadDetail — client/src/modules/crm/leads/LeadDetail.jsx
 * Full detail page for a single CRM lead.
 * Two-column layout: LeadSidebar (left) + ActivityTimeline (right).
 * Topbar actions: Delete, Convert to Opportunity, Edit/Save toggle.
 */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRightCircle, Pencil, Check } from 'lucide-react';
import { useLeads } from '../../../context/LeadsContext';
import { TopbarContext } from '../../../context/TopbarContext';
import LeadSidebar from './components/LeadSidebar';
import ActivityTimeline from './components/ActivityTimeline';
import AddNoteModal from './components/AddNoteModal';
import LogCallModal from './components/LogCallModal';

/* ─── useHover ────────────────────────────────────────────────── */
function useHover() {
  const [hov, setHov] = useState(false);
  return [hov, { onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) }];
}

/* ─── Topbar buttons ──────────────────────────────────────────── */
function DeleteBtn({ onClick }) {
  const [hov, hoverProps] = useHover();
  return (
    <button
      {...hoverProps}
      onClick={onClick}
      style={{
        background: hov ? '#361515' : 'transparent',
        border: '1px solid #343434',
        borderRadius: '6px',
        padding: '4px 12px',
        fontSize: '12px',
        color: '#e03636',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.15s',
      }}
    >
      <Trash2 size={13} />
      Delete
    </button>
  );
}

function ConvertBtn() {
  const [hov, hoverProps] = useHover();
  return (
    <button
      {...hoverProps}
      style={{
        background: hov ? '#232323' : 'transparent',
        border: '1px solid #343434',
        borderRadius: '6px',
        padding: '4px 12px',
        fontSize: '12px',
        color: hov ? '#f8f8f8' : '#afafaf',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      <ArrowRightCircle size={13} />
      Convert to Opportunity
    </button>
  );
}

function EditSaveBtn({ isEditing, onClick }) {
  const [hov, hoverProps] = useHover();
  return (
    <button
      {...hoverProps}
      onClick={onClick}
      style={{
        background: isEditing
          ? (hov ? '#2d7ad4' : '#388AE5')
          : (hov ? '#e5e7eb' : '#f3f4f6'),
        border: 'none',
        borderRadius: '6px',
        padding: '4px 12px',
        fontSize: '12px',
        fontWeight: '500',
        color: isEditing ? '#ffffff' : '#111111',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.15s',
      }}
    >
      {isEditing ? <Check size={13} /> : <Pencil size={13} />}
      {isEditing ? 'Save' : 'Edit'}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Component                                                     */
/* ═══════════════════════════════════════════════════════════════ */
export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, updateLead, deleteLead } = useLeads();
  const { setRightActions } = useContext(TopbarContext);

  const lead = leads.find(l => l.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [activities, setActivities] = useState([]);

  /* Sync editData when lead changes */
  useEffect(() => {
    if (lead) setEditData({ ...lead });
  }, [lead]);

  /* Add activity helper */
  const addActivity = useCallback((type, content) => {
    setActivities(prev => [{
      id: Date.now(),
      type,
      content,
      timestamp: new Date().toLocaleString('en-IN'),
    }, ...prev]);
  }, []);

  /* Save edits */
  const handleSave = useCallback(() => {
    updateLead(id, editData);
    setIsEditing(false);
    addActivity('status', 'Lead details updated');
  }, [id, editData, updateLead, addActivity]);

  /* Delete lead */
  const handleDelete = useCallback(() => {
    if (window.confirm('Delete this lead? This cannot be undone.')) {
      deleteLead(id);
      navigate('/crm/leads');
    }
  }, [id, deleteLead, navigate]);

  /* Toggle edit mode */
  const toggleEdit = useCallback(() => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  }, [isEditing, handleSave]);

  /* Inject topbar actions */
  useEffect(() => {
    setRightActions(
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <DeleteBtn onClick={handleDelete} />
        <ConvertBtn />
        <EditSaveBtn isEditing={isEditing} onClick={toggleEdit} />
      </div>
    );
    return () => setRightActions(null);
  }, [isEditing, setRightActions, handleDelete, toggleEdit]);

  /* Field update handler */
  const handleFieldUpdate = useCallback((field, val) => {
    setEditData(prev => ({ ...prev, [field]: val }));
  }, []);

  /* ── Not found ──────────────────────────────────────────────── */
  if (!lead) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: '#0f0f0f',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: '14px', color: '#6b6b6b', marginBottom: '16px' }}>
          Lead not found
        </div>
        <button
          onClick={() => navigate('/crm/leads')}
          style={{
            background: '#1c1c1c',
            border: '1px solid #2b2b2b',
            borderRadius: '20px',
            padding: '8px 22px',
            fontSize: '13px',
            color: '#f8f8f8',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#232323')}
          onMouseLeave={e => (e.currentTarget.style.background = '#1c1c1c')}
        >
          ← Back to Leads
        </button>
      </div>
    );
  }

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <LeadSidebar
        lead={isEditing ? editData : lead}
        isEditing={isEditing}
        onUpdate={handleFieldUpdate}
        activities={activities}
      />
      <ActivityTimeline
        activities={activities}
        onAddNote={() => setShowNoteModal(true)}
        onLogCall={() => setShowCallModal(true)}
        addActivity={addActivity}
      />
      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSave={(text) => {
          addActivity('note', text);
          setShowNoteModal(false);
        }}
      />
      <LogCallModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        onSave={(data) => {
          addActivity('call', data);
          setShowCallModal(false);
        }}
      />
    </div>
  );
}
