/**
 * ContactsContext — client/src/context/ContactsContext.jsx
 * Shared contacts state. Same pattern as LeadsContext.
 */
import React, { createContext, useContext, useState } from 'react';

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);

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
