/**
 * CampaignsContext — client/src/context/CampaignsContext.jsx
 */
import React, { createContext, useContext, useState } from 'react';

const CampaignsContext = createContext(null);

export function CampaignsProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);

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
