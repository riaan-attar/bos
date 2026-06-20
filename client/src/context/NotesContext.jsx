import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const NotesContext = createContext(null);

const DEMO_NOTES = [
  {
    id: 'NOTE-0001',
    title: 'Site visit feedback - Rajesh',
    content: 'Rajesh visited Gangapur Road site. Very interested in 3BHK corner flat. Needs car parking. Follow up on Monday.',
    linkedTo: 'Rajesh Sharma',
    linkedId: 'LEAD-0001',
    linkedType: 'lead',
    createdBy: 'Amit Kulkarni',
    createdOn: '13/06/2026',
    updatedOn: '13/06/2026',
  },
  {
    id: 'NOTE-0002',
    title: 'Negotiation notes - Anita Desai',
    content: 'Client wants 5% discount on penthouse. Offered 2% + free parking. She will discuss with family. Expected decision by end of week.',
    linkedTo: 'Anita Desai',
    linkedId: 'LEAD-0004',
    linkedType: 'lead',
    createdBy: 'Sneha Patil',
    createdOn: '15/06/2026',
    updatedOn: '16/06/2026',
  },
  {
    id: 'NOTE-0003',
    title: 'Commercial deal requirements',
    content: 'Vikram Industries needs warehouse space. Minimum 5000 sq ft. Road access mandatory. Budget flexible if location is right.',
    linkedTo: 'Vikram Industries',
    linkedId: 'OPP-0003',
    linkedType: 'deal',
    createdBy: 'Amit Kulkarni',
    createdOn: '10/06/2026',
    updatedOn: '10/06/2026',
  },
];

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() =>
    loadFromStorage('bos_notes', DEMO_NOTES)
  );

  useEffect(() => {
    saveToStorage('bos_notes', notes);
  }, [notes]);

  const addNote = (note) =>
    setNotes(prev => [note, ...prev]);

  const updateNote = (id, updates) =>
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...updates } : n))
    );

  const deleteNote = (id) =>
    setNotes(prev => prev.filter(n => n.id !== id));

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
