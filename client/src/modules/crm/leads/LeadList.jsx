/**
 * LeadList — client/src/modules/crm/leads/LeadList.jsx
 * Lead list page, now powered by the reusable ListPage system.
 * All filter bar, table, empty state, and topbar logic lives
 * in shared/ListPage — this file is just config + wiring.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListPage from '../../../components/shared/ListPage/ListPage';
import { useLeads } from '../../../context/LeadsContext';
import AddLeadModal from './AddLeadModal';

/* ─── Lead-specific config for ListPage ───────────────────────── */
const leadConfig = {
  entity: 'Lead',
  entityPlural: 'Leads',
  routeBase: '/crm/leads',
  idPrefix: 'LEAD',

  breadcrumbs: [
    { label: 'CRM', to: '/crm' },
    { label: 'Lead' },
  ],

  filterChips: [
    { key: 'id',        label: 'ID',               showApprox: true  },
    { key: 'jobTitle',  label: 'Job Title',         showApprox: true  },
    { key: 'status',    label: 'Status',            showChevron: true },
    { key: 'orgName',   label: 'Organization Na…',  showApprox: true,
      fullLabel: 'Organization Name', style: { maxWidth: '140px' }    },
    { key: 'territory', label: 'Territory',         showApprox: false },
    { key: 'title',     label: 'Title',             showApprox: true  },
  ],

  filterFields: [
    'ID', 'First Name', 'Last Name', 'Job Title',
    'Status', 'Organization Name', 'Territory',
    'Mobile No', 'Lead Source', 'Created On',
  ],

  columns: [
    { key: 'id',           label: 'ID' },
    { key: 'name',         label: 'Name',
      render: (row) => [row.firstName, row.lastName].filter(Boolean).join(' ') || '—' },
    { key: 'jobTitle',     label: 'Job Title' },
    { key: 'status',       label: 'Status', type: 'badge' },
    { key: 'organization', label: 'Organization' },
    { key: 'mobile',       label: 'Mobile' },
    { key: 'leadSource',   label: 'Source' },
    { key: 'createdOn',    label: 'Created On' },
  ],

  statusColors: {
    'New':            { bg: '#0e2037', color: '#5aaef2' },
    'Contacted':      { bg: '#232323', color: '#afafaf' },
    'Replied':        { bg: '#371e06', color: '#e79913' },
    'Interested':     { bg: '#0b2e1c', color: '#30a66d' },
    'Converted':      { bg: '#173b2c', color: '#28a745' },
    'Do Not Contact': { bg: '#361515', color: '#e03636' },
    'Junk':           { bg: '#232323', color: '#7c7c7c' },
  },

  emptyIcon: 'FileText',
  emptyTitle: "You haven't created a Lead yet",
  emptyButtonText: 'Create your first Lead',
  addButtonLabel: 'Add Lead',
};

/* ═══════════════════════════════════════════════════════════════ */
export default function LeadList() {
  const { leads, addLead } = useLeads();
  const navigate = useNavigate();

  const handleSave = (formData) => {
    const newLead = {
      ...formData,
      id: `LEAD-${String(leads.length + 1).padStart(4, '0')}`,
      createdOn: new Date().toLocaleDateString('en-IN'),
    };
    addLead(newLead);
  };

  return (
    <ListPage
      config={leadConfig}
      items={leads}
      onAdd={handleSave}
      onRowClick={(item) => navigate(`/crm/leads/${item.id}`)}
      AddModal={AddLeadModal}
    />
  );
}
