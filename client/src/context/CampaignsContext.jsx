/**
 * CampaignsContext — client/src/context/CampaignsContext.jsx
 * Persists to localStorage with Avenue Builders demo data on first load.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const CampaignsContext = createContext(null);

const DEMO_CAMPAIGNS = [
  {
    id: 'CMP-0001',
    campaignName: 'Monsoon Offer 2026',
    campaignType: 'Email',
    status: 'Active',
    startDate: '2026-06-01',
    endDate: '2026-07-31',
    budget: 50000,
    leads: 24,
    description: 'Special monsoon discounts on 2BHK flats.',
    createdOn: '01/06/2026',
  },
  {
    id: 'CMP-0002',
    campaignName: 'Instagram Summer Deals',
    campaignType: 'Social Media',
    status: 'Active',
    startDate: '2026-05-15',
    endDate: '2026-06-30',
    budget: 30000,
    leads: 18,
    description: 'Instagram ads for premium villas.',
    createdOn: '15/05/2026',
  },
  {
    id: 'CMP-0003',
    campaignName: 'Referral Bonus Program',
    campaignType: 'Referral',
    status: 'Active',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    budget: 100000,
    leads: 12,
    description: 'Existing customers get ₹25,000 on referral.',
    createdOn: '01/01/2026',
  },
];

export function CampaignsProvider({ children }) {
  const [campaigns, setCampaigns] = useState(() =>
    loadFromStorage('bos_campaigns', DEMO_CAMPAIGNS)
  );

  useEffect(() => {
    saveToStorage('bos_campaigns', campaigns);
  }, [campaigns]);

  const addCampaign = (campaign) =>
    setCampaigns(prev => [campaign, ...prev]);

  const updateCampaign = (id, updates) =>
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );

  const deleteCampaign = (id) =>
    setCampaigns(prev => prev.filter(c => c.id !== id));

  return (
    <CampaignsContext.Provider
      value={{ campaigns, setCampaigns, addCampaign, updateCampaign, deleteCampaign }}
    >
      {children}
    </CampaignsContext.Provider>
  );
}

export const useCampaigns = () => useContext(CampaignsContext);
