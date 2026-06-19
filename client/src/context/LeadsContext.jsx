/**
 * LeadsContext — client/src/context/LeadsContext.jsx
 * Shared leads state so LeadList and LeadDetail can access the same data.
 * Persists to localStorage with Avenue Builders demo data on first load.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const LeadsContext = createContext(null);

const DEMO_LEADS = [
  {
    id: 'LEAD-0001',
    firstName: 'Rajesh',
    lastName: 'Sharma',
    email: 'rajesh.sharma@gmail.com',
    mobileNo: '+91 98234 56789',
    jobTitle: 'Business Owner',
    organization: 'Sharma Enterprises',
    status: 'Interested',
    leadSource: 'MagicBricks',
    territory: 'Nashik',
    propertyType: 'Flat',
    budgetRange: '80L - 1Cr',
    preferredArea: 'Gangapur Road',
    followUpDate: '2026-06-25',
    priority: 'High',
    notes: 'Looking for 3BHK. Site visit scheduled.',
    assignedTo: 'Amit Kulkarni',
    createdOn: '12/06/2026',
  },
  {
    id: 'LEAD-0002',
    firstName: 'Priya',
    lastName: 'Mehta',
    email: 'priya.mehta@yahoo.com',
    mobileNo: '+91 97654 32109',
    jobTitle: 'Doctor',
    organization: 'City Hospital',
    status: 'Contacted',
    leadSource: 'Referral',
    territory: 'Nashik Road',
    propertyType: 'Villa',
    budgetRange: '1.5Cr - 2Cr',
    preferredArea: 'Nashik Road',
    followUpDate: '2026-06-22',
    priority: 'Urgent',
    notes: 'Referred by existing customer Mohan Kulkarni.',
    assignedTo: 'Sneha Patil',
    createdOn: '10/06/2026',
  },
  {
    id: 'LEAD-0003',
    firstName: 'Suresh',
    lastName: 'Patil',
    email: 'suresh.patil@gmail.com',
    mobileNo: '+91 96543 21098',
    jobTitle: 'Engineer',
    organization: 'Mahindra',
    status: 'New',
    leadSource: '99acres',
    territory: 'Nashik',
    propertyType: 'Flat',
    budgetRange: '50L - 70L',
    preferredArea: 'College Road',
    followUpDate: '2026-06-28',
    priority: 'Medium',
    notes: 'Interested in 2BHK. Budget is fixed.',
    assignedTo: 'Rahul Desai',
    createdOn: '14/06/2026',
  },
  {
    id: 'LEAD-0004',
    firstName: 'Anita',
    lastName: 'Desai',
    email: 'anita.desai@hotmail.com',
    mobileNo: '+91 95432 10987',
    jobTitle: 'Architect',
    organization: 'Design Studio',
    status: 'Replied',
    leadSource: 'Instagram',
    territory: 'Trimbak Road',
    propertyType: 'Penthouse',
    budgetRange: '3Cr+',
    preferredArea: 'Trimbak Road',
    followUpDate: '2026-06-20',
    priority: 'Urgent',
    notes: 'Wants premium penthouse. Very serious buyer.',
    assignedTo: 'Sneha Patil',
    createdOn: '08/06/2026',
  },
  {
    id: 'LEAD-0005',
    firstName: 'Deepak',
    lastName: 'Joshi',
    email: 'deepak.joshi@gmail.com',
    mobileNo: '+91 94321 09876',
    jobTitle: 'Teacher',
    organization: 'Nashik School',
    status: 'New',
    leadSource: 'Walk-in',
    territory: 'Ozar',
    propertyType: 'Plot',
    budgetRange: '30L - 40L',
    preferredArea: 'Ozar',
    followUpDate: '2026-06-30',
    priority: 'Low',
    notes: 'Walk-in enquiry. Looking for plot.',
    assignedTo: 'Amit Kulkarni',
    createdOn: '15/06/2026',
  },
];

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState(() =>
    loadFromStorage('bos_leads', DEMO_LEADS)
  );

  useEffect(() => {
    saveToStorage('bos_leads', leads);
  }, [leads]);

  const addLead = (lead) =>
    setLeads(prev => [lead, ...prev]);

  const updateLead = (id, updates) =>
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, ...updates } : l))
    );

  const deleteLead = (id) =>
    setLeads(prev => prev.filter(l => l.id !== id));

  return (
    <LeadsContext.Provider value={{ leads, setLeads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadsContext.Provider>
  );
}

export const useLeads = () => useContext(LeadsContext);
