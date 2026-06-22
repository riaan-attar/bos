import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { 
  Search, Filter, RefreshCw, MoreHorizontal, ChevronDown, Plus, FileText, X, Home, ChevronRight
} from 'lucide-react';

export default function ProjectList() {
  const navigate = useNavigate();
  const { projects, addProject } = useProjects();
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    series: 'PROJ-.####',
    projectName: '',
    fromTemplate: '',
    company: 'bootstack (Demo)'
  });

  // Filter states
  const [filterId, setFilterId] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('Open');
  const [filterType, setFilterType] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortBy, setSortBy] = useState('createdOn');
  const [sortOrder, setSortOrder] = useState('desc');

  // Modal handlers
  const handleOpenModal = () => {
    setModalForm({
      series: 'PROJ-.####',
      projectName: '',
      fromTemplate: '',
      company: 'bootstack (Demo)'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    if (!modalForm.projectName) {
      alert('Project Name is required');
      return;
    }
    addProject({
      projectName: modalForm.projectName,
      series: modalForm.series,
      fromTemplate: modalForm.fromTemplate,
      company: modalForm.company,
      status: 'Open'
    });
    setIsModalOpen(false);
  };

  const handleEditFullForm = () => {
    navigate('/projects/project/new', { state: { initialValues: modalForm } });
  };

  // Filter logic
  const filteredProjects = projects.filter(proj => {
    const matchesId = proj.id.toLowerCase().includes(filterId.toLowerCase());
    const matchesName = proj.projectName.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus = filterStatus ? proj.status === filterStatus : true;
    const matchesType = filterType ? proj.projectType?.toLowerCase().includes(filterType.toLowerCase()) : true;
    const matchesPriority = filterPriority ? proj.priority === filterPriority : true;
    return matchesId && matchesName && matchesStatus && matchesType && matchesPriority;
  });

  // Sort logic
  const sortedProjects = [...filteredProjects].sort((a, b) => {
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
    setFilterName('');
    setFilterStatus('');
    setFilterType('');
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
          <span style={{ color: 'var(--text-color, #1a1a1a)', fontWeight: 500 }}>Project</span>
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
            <Plus size={14} /> Add Project
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
          placeholder="Project Name"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
          style={inputStyle}
        />
        <select 
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="">Status (All)</option>
          <option value="Open">Open</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input 
          placeholder="Project Type"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          style={inputStyle}
        />
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
          <option value="projectName:asc">Name A-Z</option>
          <option value="projectName:desc">Name Z-A</option>
        </select>
      </div>

      {/* ─── Main Content / Project List ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {sortedProjects.length === 0 ? (
          /* Empty state view matching Screenshot 1 */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', backgroundColor: 'var(--surface-gray-1, #f9fafb)', borderRadius: '8px', border: '1px dashed var(--border-color, #e5e7eb)', padding: '40px' }}>
            <FileText size={48} strokeWidth={1} style={{ color: 'var(--gray-400, #9ca3af)', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted, #6b7280)', marginBottom: '16px', textAlign: 'center' }}>
              No Project found with matching filters. Clear filters to see all Project.
            </p>
            <button 
              onClick={handleOpenModal}
              style={{ backgroundColor: 'var(--control-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-color, #1a1a1a)', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-2, #f3f4f6)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--control-bg, #ffffff)'}
            >
              Create a new Project
            </button>
          </div>
        ) : (
          /* List Table view */
          <div style={{ overflowX: 'auto', backgroundColor: 'var(--card-bg, #ffffff)', borderRadius: '8px', border: '1px solid var(--border-color, #e5e7eb)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-muted, #6b7280)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Project Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Project Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Priority</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Created On</th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map(proj => (
                  <tr 
                    key={proj.id} 
                    onClick={() => navigate(`/projects/project/${proj.id}`)}
                    style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', cursor: 'pointer', transition: 'background-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-1, #f9fafb)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--blue-500, #0289f7)', fontWeight: 500 }}>{proj.id}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color, #1a1a1a)' }}>{proj.projectName}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ 
                        backgroundColor: proj.status === 'Open' ? '#fff7ed' : proj.status === 'Completed' ? '#f0fdf4' : '#fef2f2',
                        color: proj.status === 'Open' ? '#b45309' : proj.status === 'Completed' ? '#15803d' : '#b91c1c',
                        padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 
                      }}>
                        {proj.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #6b7280)' }}>{proj.projectType || '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        color: proj.priority === 'High' || proj.priority === 'Urgent' ? 'var(--danger, #e03636)' : proj.priority === 'Medium' ? 'var(--warning, #ffc107)' : 'var(--blue-500, #0289f7)',
                        fontSize: '13px'
                      }}>
                        {proj.priority}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #6b7280)' }}>{proj.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── New Project Modal (Screenshot 2) ─── */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(1px)' }}>
          <div style={{ backgroundColor: '#ffffff', color: '#111827', borderRadius: '10px', width: '520px', maxWidth: '90%', display: 'flex', flexDirection: 'column', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)', border: '1px solid #e5e7eb' }}>
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: '#111827' }}>New Project</h2>
              <button onClick={handleCloseModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSave} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  Series <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select 
                  value={modalForm.series}
                  onChange={e => setModalForm(prev => ({ ...prev, series: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                >
                  <option value="PROJ-.####">PROJ-.####</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  Project Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder=""
                  value={modalForm.projectName}
                  onChange={e => setModalForm(prev => ({ ...prev, projectName: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  From Template
                </label>
                <input 
                  type="text"
                  placeholder=""
                  value={modalForm.fromTemplate}
                  onChange={e => setModalForm(prev => ({ ...prev, fromTemplate: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', display: 'block', marginBottom: '6px' }}>
                  Company <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder=""
                  value={modalForm.company}
                  onChange={e => setModalForm(prev => ({ ...prev, company: e.target.value }))}
                  style={{ ...inputStyle, backgroundColor: '#ffffff', color: '#111827', borderColor: '#d1d5db', padding: '8px 12px' }}
                />
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
