/**
 * DealList — client/src/modules/crm/deals/DealList.jsx
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListPage from '../../../components/shared/ListPage/ListPage';
import { useOpportunities } from '../../../context/OpportunitiesContext';
import AddDealModal from './AddDealModal';

const config = {
  entity: 'Deal',
  entityPlural: 'Deals',
  routeBase: '/crm/deals',
  idPrefix: 'DEAL',

  breadcrumbs: [
    { label: 'CRM', to: '/crm' },
    { label: 'Deal' },
  ],

  filterChips: [
    { key: 'id',              label: 'ID',               showApprox: true  },
    { key: 'opportunityFrom', label: 'Deal From',        showApprox: false },
    { key: 'party',           label: 'Party',            showApprox: false },
    { key: 'status',          label: 'Status',           showChevron: true },
    { key: 'stage',           label: 'Stage',            showChevron: true },
    { key: 'title',           label: 'Title',            showApprox: true  },
  ],

  filterFields: [
    'ID', 'Deal From', 'Party',
    'Status', 'Stage', 'Title', 'Amount', 'Created On',
  ],

  columns: [
    { key: 'id',              label: 'ID'               },
    { key: 'opportunityFrom', label: 'Deal From'        },
    { key: 'party',           label: 'Party'            },
    { key: 'stage',           label: 'Stage', type: 'badge' },
    { key: 'status',          label: 'Status', type: 'badge' },
    { key: 'title',           label: 'Title'            },
    { key: 'amount',          label: 'Amount'           },
    { key: 'createdOn',       label: 'Created On'       },
  ],

  statusColors: {
    'Qualification':  { bg: '#232323', color: '#7c7c7c' },
    'Demo':           { bg: '#0e2037', color: '#5aaef2' },
    'Proposal':       { bg: '#371e06', color: '#e79913' },
    'Negotiation':    { bg: '#2d1a4a', color: '#9c45e3' },
    'Ready to Close': { bg: '#0b2e1c', color: '#30a66d' },
    'Won':            { bg: '#173b2c', color: '#28a745' },
    'Lost':           { bg: '#361515', color: '#e03636' },
    'Open':           { bg: '#0e2037', color: '#5aaef2' },
    'Replied':        { bg: '#371e06', color: '#e79913' },
    'Interested':     { bg: '#0b2e1c', color: '#30a66d' },
    'Do Not Contact': { bg: '#232323', color: '#7c7c7c' },
  },

  emptyIcon: 'FileText',
  emptyTitle: 'No deals yet',
  emptyButtonText: 'Create your first Deal',
  addButtonLabel: '+ Add Deal',
};

export default function DealList() {
  const { opportunities, addOpportunity } = useOpportunities();
  const navigate = useNavigate();

  return (
    <ListPage
      config={config}
      items={opportunities}
      onAdd={(data) =>
        addOpportunity({
          ...data,
          id: `OPP-${String(opportunities.length + 1).padStart(4, '0')}`,
          createdOn: new Date().toLocaleDateString('en-IN'),
          stage: 'Qualification',
        })
      }
      onRowClick={(item) => navigate(`/crm/deals/${item.id}`)}
      AddModal={AddDealModal}
    />
  );
}
