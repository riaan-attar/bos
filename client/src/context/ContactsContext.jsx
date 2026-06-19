/**
 * ContactsContext — client/src/context/ContactsContext.jsx
 * Shared contacts state. Same pattern as LeadsContext.
 * Persists to localStorage with Avenue Builders demo data on first load.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const ContactsContext = createContext(null);

const DEMO_CONTACTS = [
  {
    id: 'CON-0001',
    firstName: 'Amit',
    lastName: 'Kulkarni',
    email: 'amit.kulkarni@avenubuilders.com',
    mobile: '+91 98765 43210',
    jobTitle: 'Sales Manager',
    company: 'Avenue Builders',
    status: 'Active',
    source: 'Internal',
    createdOn: '01/01/2026',
  },
  {
    id: 'CON-0002',
    firstName: 'Sneha',
    lastName: 'Patil',
    email: 'sneha.patil@avenuebuilders.com',
    mobile: '+91 97654 32109',
    jobTitle: 'Sales Executive',
    company: 'Avenue Builders',
    status: 'Active',
    source: 'Internal',
    createdOn: '01/01/2026',
  },
  {
    id: 'CON-0003',
    firstName: 'Rahul',
    lastName: 'Desai',
    email: 'rahul.desai@avenuebuilders.com',
    mobile: '+91 96543 21098',
    jobTitle: 'Sales Executive',
    company: 'Avenue Builders',
    status: 'Active',
    source: 'Internal',
    createdOn: '01/01/2026',
  },
  {
    id: 'CON-0004',
    firstName: 'Vikram',
    lastName: 'Agarwal',
    email: 'vikram@vikramindustries.com',
    mobile: '+91 92345 67890',
    jobTitle: 'Director',
    company: 'Vikram Industries',
    status: 'Active',
    source: 'Walk-in',
    createdOn: '15/01/2026',
  },
];

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() =>
    loadFromStorage('bos_contacts', DEMO_CONTACTS)
  );

  useEffect(() => {
    saveToStorage('bos_contacts', contacts);
  }, [contacts]);

  const addContact = (contact) =>
    setContacts(prev => [contact, ...prev]);

  const updateContact = (id, updates) =>
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );

  const deleteContact = (id) =>
    setContacts(prev => prev.filter(c => c.id !== id));

  return (
    <ContactsContext.Provider
      value={{ contacts, setContacts, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export const useContacts = () => useContext(ContactsContext);
