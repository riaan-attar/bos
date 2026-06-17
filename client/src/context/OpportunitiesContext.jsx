/**
 * OpportunitiesContext — client/src/context/OpportunitiesContext.jsx
 * Shared opportunities state. Same pattern as LeadsContext.
 */
import React, { createContext, useContext, useState } from 'react';

const OpportunitiesContext = createContext(null);

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState([]);

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
