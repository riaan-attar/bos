import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { 
  Search, Filter, RefreshCw, MoreHorizontal, ChevronDown, Plus, CheckSquare, X, Home, ChevronRight
} from 'lucide-react';

export default function TaskList() {
  const navigate = useNavigate();
  const { projects, projectTasks, addProjectTask } = useProjects();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    subject: '',
    project: '',
    priority: 'Low'
  });

  // Filter states
  const [filterId, setFilterId] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterStatus, setFilterStatus] = useState('Open');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortBy, setSortBy] = useState('createdOn');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modal handlers
  const handleOpenModal = () => {
    setModalForm({
      subject: '',
      project: projects.length > 0 ? projects[0].projectName : '',
      priority: 'Low'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    if (!modalForm.subject) {
      alert('Subject is required');
      return;
    }
    addProjectTask({
      subject: modalForm.subject,
      project: modalForm.project,
      priority: modalForm.priority,
      status: 'Open'
    });
    setIsModalOpen(false);
  };

  const handleEditFullForm = () => {
    navigate('/projects/task/new', { state: { initialValues: modalForm } });
  };

  // Filter logic
  const filteredTasks = (projectTasks || []).filter(task => {
    const matchesId = task.id.toLowerCase().includes(filterId.toLowerCase());
    const matchesSubject = task.subject.toLowerCase().includes(filterSubject.toLowerCase());
    const matchesProject = filterProject ? task.project === filterProject : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesPriority = filterPriority ? task.priority === filterPriority : true;
    return matchesId && matchesSubject && matchesProject && matchesStatus && matchesPriority;
  });

  // Sort logic
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let fieldA = a[sortBy] || '';
    let fieldB = b[sortBy] || '';
    if (sortBy === 'createdOn') {
      const partsA = fieldA.split('/');
      const partsB = fieldB.split('/');
      if (partsA.length === 3 && partsB.length === 3) {
        fieldA = new Date(partsA[2], partsA[1] - 1, partsA[0]).getTime();
        fieldB = new Date(partsB[2], partsB[1] - 1, partsB[0]).getTime();
      }
    }
    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const clearFilters = () => {
    setFilterId('');
    setFilterSubject('');
    setFilterProject('');
    setFilterStatus('');
    setFilterPriority('');
  };

  // Input styles helper
  const inputStyle = {
    backgroundColor: 'var(--control-bg, #ffffff)',
    border: '1px solid var(--border-color, #e5e7eb)',
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: '13px',
    color: 'var(--text-color, #1a1a1a)',
    outline: 'none',
    fontFamily: 'var(--font-family, Inter, sans-serif)',
    width: '100%',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    backgroundColor: 'var(--btn-default-bg, #f3f4f6)',
    border: '1px solid var(--border-color, #e5e7eb)',
    color: 'var(--text-color, #1a1a1a)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    fontFamily: 'var(--font-family, Inter, sans-serif)',
    transition: 'background-color 0.15s'
  };

  return (
    <div style={{ padding: '16px 24px', fontFamily: 'var(--font-family, Inter, sans-serif)', color: 'var(--text-color, #1a1a1a)', backgroundColor: 'var(--bg-color, #ffffff)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* ─── Breadcrumbs & Header Controls ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted, #6b7280)' }}>
          <Link to="/projects" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted, #6b7280)', textDecoration: 'none' }}>
            <Home size={15} style={{ marginRight: '6px' }} />
            Projects
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--border-color, #e5e7eb)' }} />
          <span style={{ color: 'var(--text-color, #1a1a1a)', fontWeight: 500 }}>Task</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={buttonStyle}>
            List View <ChevronDown size={14} style={{ color: 'var(--text-muted, #6b7280)' }} />
          </button>
          <button style={buttonStyle}>
            Saved Filters <ChevronDown size={14} style={{ color: 'var(--text-muted, #6b7280)' }} />
          </button>
          <button onClick={() => window.location.reload()} style={{ ...buttonStyle, padding: '8px' }}>
            <RefreshCw size={14} />
          </button>
          <button style={{ ...buttonStyle, padding: '8px' }}>
            <MoreHorizontal size={14} />
          </button>
          <button onClick={handleOpenModal} style={{ backgroundColor: 'var(--gray-900, #111827)', border: '1px solid var(--gray-900, #111827)', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Plus size={14} /> Add Task
          </button>
        </div>
      </div>

      {/* ─── Filter Bar ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', backgroundColor: 'var(--surface-gray-1, #f9fafb)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '8px 12px', marginBottom: '24px', alignItems: 'center' }}>
        <input 
          placeholder="ID"
          value={filterId}
          onChange={e => setFilterId(e.target.value)}
          style={inputStyle}
        />
        <input 
          placeholder="Subject"
          value={filterSubject}
          onChange={e => setFilterSubject(e.target.value)}
          style={inputStyle}
        />
        <select 
          value={filterProject}
          onChange={e => setFilterProject(e.target.value)}
          style={inputStyle}
        >
          <option value="">Project (All)</option>
          {projects.map(p => (
            <option key={p.id} value={p.projectName}>{p.projectName}</option>
          ))}
        </select>
        <select 
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="">Status (All)</option>
          <option value="Open">Open</option>
          <option value="Working">Working</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select 
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
          style={inputStyle}
        >
          <option value="">Priority (All)</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
        <button 
          onClick={clearFilters}
          style={{ ...buttonStyle, width: '100%', justifyContent: 'center' }}
        >
          <Filter size={13} /> Filter <span style={{ color: 'var(--text-muted, #6b7280)', fontSize: '11px' }}>x</span>
        </button>
        <select 
          value={`${sortBy}:${sortOrder}`}
          onChange={e => {
            const [field, order] = e.target.value.split(':');
            setSortBy(field);
            setSortOrder(order);
          }}
          style={inputStyle}
        >
          <option value="createdOn:desc">Created On ↓</option>
          <option value="createdOn:asc">Created On ↑</option>
          <option value="subject:asc">Subject A-Z</option>
          <option value="subject:desc">Subject Z-A</option>
        </select>
      </div>

      {/* ─── Main Content / Task List ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {sortedTasks.length === 0 ? (
          /* Empty state view */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', backgroundColor: 'var(--surface-gray-1, #f9fafb)', borderRadius: '8px', border: '1px dashed var(--border-color, #e5e7eb)', padding: '40px' }}>
            <CheckSquare size={48} strokeWidth={1} style={{ color: 'var(--gray-400, #9ca3af)', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted, #6b7280)', marginBottom: '16px', textAlign: 'center' }}>
              No Task found with matching filters. Clear filters to see all Task.
            </p>
            <button 
              onClick={handleOpenModal}
              style={{ backgroundColor: 'var(--control-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-color, #1a1a1a)', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-2, #f3f4f6)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--control-bg, #ffffff)'}
            >
              Create a new Task
            </button>
          </div>
        ) : (
          /* List Table view */
          <div style={{ overflowX: 'auto', backgroundColor: 'var(--card-bg, #ffffff)', borderRadius: '8px', border: '1px solid var(--border-color, #e5e7eb)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-muted, #6b7280)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Subject</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Project</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Priority</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Created On</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map(task => (
                  <tr 
                    key={task.id} 
                    onClick={() => navigate(`/projects/task/${task.id}`)}
                    style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', cursor: 'pointer', transition: 'background-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-1, #f9fafb)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--blue-500, #0289f7)', fontWeight: 500 }}>{task.id}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color, #1a1a1a)' }}>{task.subject}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color, #1a1a1a)' }}>{task.project || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ 
                        backgroundColor: task.status === 'Open' ? '#fff7ed' : task.status === 'Completed' ? '#f0fdf4' : task.status === 'Working' ? '#eff6ff' : '#fef2f2',
                        color: task.status === 'Open' ? '#b45309' : task.status === 'Completed' ? '#15803d' : task.status === 'Working' ? '#1d4ed8' : '#b91c1c',
                        padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 
                      }}>
                        {task.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        color: task.priority === 'High' || task.priority === 'Urgent' ? 'var(--danger, #e03636)' : task.priority === 'Medium' ? 'var(--warning, #ffc107)' : 'var(--blue-500, #0289f7)',
                        fontSize: '13px'
                      }}>
                        {task.priority}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #6b7280)' }}>{task.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── New Task Modal ─── */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(1px)' }}>
          <div style={{ backgroundColor: '#ffffff', color: '#111827', borderRadius: '10px', width: '520px', maxWidth: '90%', display: 'flex', flexDirection: 'column', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', border: '1px solid #e5e7eb' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#111827' }}>New Task</h2>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSave} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  Subject <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Task Subject"
                  value={modalForm.subject}
                  onChange={e => setModalForm(prev => ({ ...prev, subject: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  Project
                </label>
                <select 
                  value={modalForm.project}
                  onChange={e => setModalForm(prev => ({ ...prev, project: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                >
                  <option value="">Select Project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.projectName}>{p.projectName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  Priority
                </label>
                <select 
                  value={modalForm.priority}
                  onChange={e => setModalForm(prev => ({ ...prev, priority: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <button 
                  type="button"
                  onClick={handleEditFullForm}
                  style={{ backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
                >
                  Edit Full Form
                </button>
                <button 
                  type="submit"
                  style={{ backgroundColor: '#111827', border: '1px solid #111827', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', fontWeight: 600, color: '#ffffff', cursor: 'pointer' }}
                >
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
