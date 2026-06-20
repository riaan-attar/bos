import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const OrganizationsContext = createContext(null);

const DEMO_ORGS = [
  {
    id: 'ORG-0001',
    name: 'Vikram Industries',
    website: 'https://vikramindustries.com',
    industry: 'Manufacturing',
    territory: 'Satpur MIDC',
    noOfEmployees: '201-500',
    annualRevenue: 50000000,
    phone: '+91 92345 67890',
    email: 'info@vikramindustries.com',
    address: 'Plot 45, Satpur MIDC, Nashik',
    description: 'Leading manufacturing firm in Nashik',
    linkedContacts: ['CON-0004'],
    linkedDeals: ['OPP-0003'],
    createdOn: '15/01/2026',
  },
  {
    id: 'ORG-0002',
    name: 'City Hospital',
    website: 'https://cityhospital.in',
    industry: 'Healthcare',
    territory: 'Nashik Road',
    noOfEmployees: '51-200',
    annualRevenue: 20000000,
    phone: '+91 97654 32109',
    email: 'admin@cityhospital.in',
    address: 'Near Railway Station, Nashik Road',
    description: 'Multi-specialty hospital',
    linkedContacts: [],
    linkedDeals: [],
    createdOn: '10/02/2026',
  },
];

export function OrganizationsProvider({ children }) {
  const [organizations, setOrganizations] = useState(() =>
    loadFromStorage('bos_organizations', DEMO_ORGS)
  );

  useEffect(() => {
    saveToStorage('bos_organizations', organizations);
  }, [organizations]);

  const addOrganization = (org) =>
    setOrganizations(prev => [org, ...prev]);

  const updateOrganization = (id, updates) =>
    setOrganizations(prev =>
      prev.map(o => (o.id === id ? { ...o, ...updates } : o))
    );

  const deleteOrganization = (id) =>
    setOrganizations(prev => prev.filter(o => o.id !== id));

  return (
    <OrganizationsContext.Provider value={{ organizations, addOrganization, updateOrganization, deleteOrganization }}>
      {children}
    </OrganizationsContext.Provider>
  );
}

export const useOrganizations = () => useContext(OrganizationsContext);
