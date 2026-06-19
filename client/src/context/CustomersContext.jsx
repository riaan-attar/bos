/**
 * CustomersContext — client/src/context/CustomersContext.jsx
 * Persists to localStorage with Avenue Builders demo data on first load.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const CustomersContext = createContext(null);

const DEMO_CUSTOMERS = [
  {
    id: 'CUST-0001',
    customerName: 'Mohan Kulkarni',
    customerGroup: 'Individual',
    territory: 'Nashik',
    contactPerson: 'Mohan Kulkarni',
    email: 'mohan.kulkarni@gmail.com',
    mobile: '+91 93212 34567',
    address: 'Flat 302, Suyog Nagar, Nashik',
    gstin: '',
    panNumber: 'ABCPK1234D',
    assignedTo: 'Rahul Desai',
    status: 'Active',
    totalDeals: 1,
    totalValue: 4800000,
    createdOn: '01/03/2026',
  },
  {
    id: 'CUST-0002',
    customerName: 'Vikram Industries',
    customerGroup: 'Company',
    territory: 'Satpur',
    contactPerson: 'Vikram Agarwal',
    email: 'vikram@vikramindustries.com',
    mobile: '+91 92345 67890',
    address: 'Plot 45, Satpur MIDC, Nashik',
    gstin: '27AABCV1234F1Z5',
    panNumber: 'AABCV1234F',
    assignedTo: 'Amit Kulkarni',
    status: 'Active',
    totalDeals: 2,
    totalValue: 35000000,
    createdOn: '15/01/2026',
  },
  {
    id: 'CUST-0003',
    customerName: 'Sunita Bhosale',
    customerGroup: 'Individual',
    territory: 'Nashik Road',
    contactPerson: 'Sunita Bhosale',
    email: 'sunita.bhosale@yahoo.com',
    mobile: '+91 91234 56789',
    address: 'B-12, Panchavati, Nashik',
    gstin: '',
    panNumber: 'BCDPB5678G',
    assignedTo: 'Sneha Patil',
    status: 'Active',
    totalDeals: 1,
    totalValue: 6500000,
    createdOn: '20/02/2026',
  },
];

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState(() =>
    loadFromStorage('bos_customers', DEMO_CUSTOMERS)
  );

  useEffect(() => {
    saveToStorage('bos_customers', customers);
  }, [customers]);

  const addCustomer = (customer) =>
    setCustomers(prev => [customer, ...prev]);

  const updateCustomer = (id, updates) =>
    setCustomers(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );

  const deleteCustomer = (id) =>
    setCustomers(prev => prev.filter(c => c.id !== id));

  return (
    <CustomersContext.Provider
      value={{ customers, setCustomers, addCustomer, updateCustomer, deleteCustomer }}
    >
      {children}
    </CustomersContext.Provider>
  );
}

export const useCustomers = () => useContext(CustomersContext);
