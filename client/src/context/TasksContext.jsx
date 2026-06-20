import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const TasksContext = createContext(null);

const DEMO_TASKS = [
  {
    id: 'TASK-0001',
    title: 'Follow up call with Rajesh Sharma',
    description: 'Call regarding 3BHK availability and pricing at Gangapur Road.',
    status: 'Open',
    assignedTo: 'Amit Kulkarni',
    dueDate: '2026-06-22',
    priority: 'High',
    linkedTo: 'Rajesh Sharma',
    linkedId: 'LEAD-0001',
    linkedType: 'lead',
    done: false,
    createdOn: '16/06/2026',
  },
  {
    id: 'TASK-0002',
    title: 'Send proposal to Vikram Industries',
    description: 'Prepare and send commercial plot proposal with pricing.',
    status: 'Open',
    assignedTo: 'Amit Kulkarni',
    dueDate: '2026-06-20',
    priority: 'Urgent',
    linkedTo: 'Vikram Industries',
    linkedId: 'OPP-0003',
    linkedType: 'deal',
    done: false,
    createdOn: '14/06/2026',
  },
  {
    id: 'TASK-0003',
    title: 'Site visit arrangement for Priya',
    description: 'Arrange villa site visit at Nashik Road property.',
    status: 'Replied',
    assignedTo: 'Sneha Patil',
    dueDate: '2026-06-21',
    priority: 'Medium',
    linkedTo: 'Priya Mehta',
    linkedId: 'LEAD-0002',
    linkedType: 'lead',
    done: false,
    createdOn: '12/06/2026',
  },
  {
    id: 'TASK-0004',
    title: 'Send agreement to Mohan Kulkarni',
    description: 'Send signed agreement copy for flat 302.',
    status: 'Closed',
    assignedTo: 'Rahul Desai',
    dueDate: '2026-06-10',
    priority: 'Low',
    linkedTo: 'Mohan Kulkarni',
    linkedId: 'CUST-0001',
    linkedType: 'customer',
    done: true,
    createdOn: '08/06/2026',
  },
];

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() =>
    loadFromStorage('bos_tasks', DEMO_TASKS)
  );

  useEffect(() => {
    saveToStorage('bos_tasks', tasks);
  }, [tasks]);

  const addTask = (task) =>
    setTasks(prev => [task, ...prev]);

  const updateTask = (id, updates) =>
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const toggleTask = (id) =>
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => useContext(TasksContext);
