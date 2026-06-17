/**
 * CustomersContext — client/src/context/CustomersContext.jsx
 */
import React, { createContext, useContext, useState } from 'react';

const CustomersContext = createContext(null);

export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState([]);

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
