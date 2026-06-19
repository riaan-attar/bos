import React, { useState } from 'react';
import { CheckSquare, Plus, Check, Calendar, User } from 'lucide-react';
import NewTaskModal from '../modals/NewTaskModal';

export default function TasksTab({ lead }) {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return '#e03636';
      case 'High': return '#e03636';
      case 'Medium': return '#e79913';
      case 'Low': return '#7c7c7c';
      default: return '#7c7c7c';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{ background: '#171717', border: '1px solid #2b2b2b', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', color: '#afafaf', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <Plus size={12} /> New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
          <CheckSquare size={36} color="#232323" strokeWidth={1} />
          <p style={{ fontSize: '13px', color: '#383838', marginTop: '12px' }}>No tasks yet</p>
        </div>
      ) : (
        <div>
          {tasks.map((task, i) => {
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.done;
            return (
              <div key={i} style={{ background: '#171717', border: '1px solid #1c1c1c', borderRadius: '8px', padding: '12px 14px', marginBottom: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <button
                  onClick={() => setTasks(tasks.map((t, idx) => idx === i ? { ...t, done: !t.done } : t))}
                  style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #2b2b2b', background: task.done ? '#388AE5' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', padding: 0 }}
                >
                  {task.done && <Check size={10} color="#fff" />}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: task.done ? '#424242' : '#f8f8f8', textDecoration: task.done ? 'line-through' : 'none' }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {task.dueDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: isOverdue ? '#e03636' : '#383838' }}>
                        <Calendar size={11} /> {task.dueDate}
                      </div>
                    )}
                    {task.assignedTo && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#383838' }}>
                        <User size={11} /> {task.assignedTo}
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: getPriorityColor(task.priority), fontWeight: task.priority === 'Urgent' ? 700 : 400 }}>
                      {task.priority}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <NewTaskModal
          onClose={() => setShowModal(false)}
          onSave={(task) => {
            setTasks([...tasks, { ...task, done: false }]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
