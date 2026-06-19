/**
 * OpportunitiesContext — client/src/context/OpportunitiesContext.jsx
 * Shared opportunities state. Same pattern as LeadsContext.
 * Persists to localStorage with Avenue Builders demo data on first load.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const OpportunitiesContext = createContext(null);

const DEMO_OPPORTUNITIES = [
  {
    id: 'OPP-0001',
    title: '3BHK at Gangapur Road',
    opportunityFrom: 'Lead',
    party: 'Rajesh Sharma',
    status: 'Negotiation',
    amount: 8500000,
    propertyType: 'Flat',
    preferredArea: 'Gangapur Road',
    configuration: '3BHK',
    budgetRange: '80L - 1Cr',
    source: 'MagicBricks',
    expectedCloseDate: '2026-07-15',
    assignedTo: 'Amit Kulkarni',
    priority: 'High',
    linkedLeadId: 'LEAD-0001',
    createdOn: '13/06/2026',
  },
  {
    id: 'OPP-0002',
    title: 'Villa at Nashik Road',
    opportunityFrom: 'Lead',
    party: 'Priya Mehta',
    status: 'Proposal',
    amount: 15000000,
    propertyType: 'Villa',
    preferredArea: 'Nashik Road',
    configuration: 'Villa',
    budgetRange: '1.5Cr - 2Cr',
    source: 'Referral',
    expectedCloseDate: '2026-07-30',
    assignedTo: 'Sneha Patil',
    priority: 'Urgent',
    linkedLeadId: 'LEAD-0002',
    createdOn: '11/06/2026',
  },
  {
    id: 'OPP-0003',
    title: 'Commercial Plot Satpur',
    opportunityFrom: 'Customer',
    party: 'Vikram Industries',
    status: 'Interested',
    amount: 25000000,
    propertyType: 'Commercial',
    preferredArea: 'Satpur MIDC',
    configuration: 'Plot',
    budgetRange: '2.5Cr+',
    source: 'Walk-in',
    expectedCloseDate: '2026-08-01',
    assignedTo: 'Amit Kulkarni',
    priority: 'High',
    linkedLeadId: null,
    createdOn: '09/06/2026',
  },
  {
    id: 'OPP-0004',
    title: 'Penthouse Trimbak Road',
    opportunityFrom: 'Lead',
    party: 'Anita Desai',
    status: 'Open',
    amount: 32000000,
    propertyType: 'Penthouse',
    preferredArea: 'Trimbak Road',
    configuration: 'Penthouse',
    budgetRange: '3Cr+',
    source: 'Instagram',
    expectedCloseDate: '2026-09-01',
    assignedTo: 'Sneha Patil',
    priority: 'Urgent',
    linkedLeadId: 'LEAD-0004',
    createdOn: '09/06/2026',
  },
];

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState(() =>
    loadFromStorage('bos_opportunities', DEMO_OPPORTUNITIES)
  );

  useEffect(() => {
    saveToStorage('bos_opportunities', opportunities);
  }, [opportunities]);

  const addOpportunity = (opp) =>
    setOpportunities(prev => [opp, ...prev]);

  const updateOpportunity = (id, updates) =>
    setOpportunities(prev =>
      prev.map(o => (o.id === id ? { ...o, ...updates } : o))
    );

  const deleteOpportunity = (id) =>
    setOpportunities(prev => prev.filter(o => o.id !== id));

  return (
    <OpportunitiesContext.Provider
      value={{ opportunities, setOpportunities, addOpportunity, updateOpportunity, deleteOpportunity }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
}

export const useOpportunities = () => useContext(OpportunitiesContext);
