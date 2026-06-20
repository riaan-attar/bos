import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const CallLogsContext = createContext(null);

const DEMO_CALLLOGS = [
  {
    id: 'CALL-0001',
    to: 'Rajesh Sharma',
    from: 'Amit Kulkarni',
    duration: '8 mins',
    status: 'Completed',
    outcome: 'Completed',
    notes: 'Discussed 3BHK pricing. Customer interested, wants site visit.',
    recordingUrl: '',
    linkedTo: 'Rajesh Sharma',
    linkedId: 'LEAD-0001',
    linkedType: 'lead',
    callType: 'outbound',
    createdBy: 'Amit Kulkarni',
    createdOn: '13/06/2026',
  },
  {
    id: 'CALL-0002',
    to: 'Priya Mehta',
    from: 'Sneha Patil',
    duration: '12 mins',
    status: 'Completed',
    outcome: 'Completed',
    notes: 'Villa details discussed. Priya wants 3D walkthrough.',
    recordingUrl: '',
    linkedTo: 'Priya Mehta',
    linkedId: 'LEAD-0002',
    linkedType: 'lead',
    callType: 'outbound',
    createdBy: 'Sneha Patil',
    createdOn: '11/06/2026',
  },
  {
    id: 'CALL-0003',
    to: 'Amit Kulkarni',
    from: 'Anita Desai',
    duration: '5 mins',
    status: 'Completed',
    outcome: 'Completed',
    notes: 'Inbound — Anita called to ask about penthouse availability.',
    recordingUrl: '',
    linkedTo: 'Anita Desai',
    linkedId: 'LEAD-0004',
    linkedType: 'lead',
    callType: 'inbound',
    createdBy: 'Amit Kulkarni',
    createdOn: '15/06/2026',
  },
  {
    id: 'CALL-0004',
    to: 'Suresh Patil',
    from: 'Rahul Desai',
    duration: '0 mins',
    status: 'No Answer',
    outcome: 'No Answer',
    notes: 'Called twice, no answer.',
    recordingUrl: '',
    linkedTo: 'Suresh Patil',
    linkedId: 'LEAD-0003',
    linkedType: 'lead',
    callType: 'outbound',
    createdBy: 'Rahul Desai',
    createdOn: '14/06/2026',
  },
];

export function CallLogsProvider({ children }) {
  const [callLogs, setCallLogs] = useState(() =>
    loadFromStorage('bos_calllogs', DEMO_CALLLOGS)
  );

  useEffect(() => {
    saveToStorage('bos_calllogs', callLogs);
  }, [callLogs]);

  const addCallLog = (callLog) =>
    setCallLogs(prev => [callLog, ...prev]);

  const deleteCallLog = (id) =>
    setCallLogs(prev => prev.filter(c => c.id !== id));

  return (
    <CallLogsContext.Provider value={{ callLogs, addCallLog, deleteCallLog }}>
      {children}
    </CallLogsContext.Provider>
  );
}

export const useCallLogs = () => useContext(CallLogsContext);
