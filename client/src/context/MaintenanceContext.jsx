/**
 * MaintenanceContext — client/src/context/MaintenanceContext.jsx
 * Shared maintenance state. Same pattern as LeadsContext.
 * Persists to localStorage with Avenue Builders demo data on first load.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const MaintenanceContext = createContext(null);

const DEMO_MAINTENANCE = [
  {
    id: 'MNT-0001',
    subject: 'Water leakage in bathroom',
    customer: 'Mohan Kulkarni',
    maintenanceType: 'Plumbing',
    status: 'In Progress',
    priority: 'High',
    assignedTo: 'Maintenance Team',
    scheduledDate: '2026-06-20',
    completedDate: '',
    propertyUnit: 'Tower A, Flat 302',
    notes: 'Reported water leakage near bathroom pipe.',
    createdOn: '16/06/2026',
  },
  {
    id: 'MNT-0002',
    subject: 'Main door lock issue',
    customer: 'Sunita Bhosale',
    maintenanceType: 'Carpentry',
    status: 'Scheduled',
    priority: 'Medium',
    assignedTo: 'Maintenance Team',
    scheduledDate: '2026-06-22',
    completedDate: '',
    propertyUnit: 'B-12 Panchavati',
    notes: 'Door lock not working properly.',
    createdOn: '15/06/2026',
  },
  {
    id: 'MNT-0003',
    subject: 'Electrical wiring check',
    customer: 'Vikram Industries',
    maintenanceType: 'Electrical',
    status: 'Open',
    priority: 'Urgent',
    assignedTo: 'Electrical Team',
    scheduledDate: '2026-06-19',
    completedDate: '',
    propertyUnit: 'Plot 45 Satpur MIDC',
    notes: 'Frequent power trips reported.',
    createdOn: '14/06/2026',
  },
];

export function MaintenanceProvider({ children }) {
  const [maintenanceItems, setMaintenanceItems] = useState(() =>
    loadFromStorage('bos_maintenance', DEMO_MAINTENANCE)
  );

  useEffect(() => {
    saveToStorage('bos_maintenance', maintenanceItems);
  }, [maintenanceItems]);

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
