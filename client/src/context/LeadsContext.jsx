/**
 * LeadsContext — client/src/context/LeadsContext.jsx
 * Shared leads state so LeadList and LeadDetail can access the same data.
 */
import React, { createContext, useContext, useState } from 'react';

const LeadsContext = createContext(null);

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([]);

  const addLead = (lead) => setLeads(prev => [lead, ...prev]);

  const updateLead = (id, updates) =>
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)));

  const deleteLead = (id) =>
    setLeads(prev => prev.filter(l => l.id !== id));

  return (
    <LeadsContext.Provider value={{ leads, setLeads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadsContext.Provider>
  );
}

export const useLeads = () => useContext(LeadsContext);
