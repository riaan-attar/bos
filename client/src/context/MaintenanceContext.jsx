/**
 * MaintenanceContext — client/src/context/MaintenanceContext.jsx
 * Shared maintenance state. Same pattern as LeadsContext.
 */
import React, { createContext, useContext, useState } from 'react';

const MaintenanceContext = createContext(null);

export function MaintenanceProvider({ children }) {
  const [maintenanceItems, setMaintenanceItems] = useState([]);

  const addMaintenance = (item) =>
    setMaintenanceItems(prev => [item, ...prev]);

  const updateMaintenance = (id, updates) =>
    setMaintenanceItems(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updates } : m))
    );

  const deleteMaintenance = (id) =>
    setMaintenanceItems(prev => prev.filter(m => m.id !== id));

  return (
    <MaintenanceContext.Provider
      value={{ maintenanceItems, setMaintenanceItems, addMaintenance, updateMaintenance, deleteMaintenance }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
}

export const useMaintenance = () => useContext(MaintenanceContext);
