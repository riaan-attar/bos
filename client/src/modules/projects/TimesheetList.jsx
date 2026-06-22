import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { 
  Search, Filter, RefreshCw, MoreHorizontal, ChevronDown, Plus, FileText, Home, ChevronRight
} from 'lucide-react';

export default function TimesheetList() {
  const navigate = useNavigate();
  const { timesheets } = useProjects();

  // Filter states
  const [filterId, setFilterId] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [sortBy, setSortBy] = useState('createdOn');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter logic
  const filteredTimesheets = (timesheets || []).filter(ts => {
    const matchesId = (ts.id || '').toLowerCase().includes(filterId.toLowerCase());
    const matchesEmployee = (ts.employee || '').toLowerCase().includes(filterEmployee.toLowerCase());
    const matchesStatus = filterStatus ? ts.status === filterStatus : true;
    const matchesProject = filterProject ? (ts.project || '').toLowerCase().includes(filterProject.toLowerCase()) : true;
    return matchesId && matchesEmployee && matchesStatus && matchesProject;
  });

  // Sort logic
  const sortedTimesheets = [...filteredTimesheets].sort((a, b) => {
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
    setFilterEmployee('');
    setFilterStatus('');
    setFilterProject('');
  };

  const handleAddTimesheet = () => {
    navigate('/projects/timesheet/new');
  };

  // Styles
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
          <span style={{ color: 'var(--text-color, #1a1a1a)', fontWeight: 500 }}>Timesheet</span>
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
          <button onClick={handleAddTimesheet} style={{ backgroundColor: 'var(--gray-900, #111827)', border: '1px solid var(--gray-900, #111827)', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Plus size={14} /> Add Timesheet
          </button>
        </div>
      </div>

      {/* ─── Main Content Area ─── */}
      {!timesheets || timesheets.length === 0 ? (
        /* Empty State (Screenshot 1) */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <FileText size={56} strokeWidth={1} style={{ color: 'var(--text-muted, #9ca3af)' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted, #6b7280)' }}>
              You haven't created a Timesheet yet
            </p>
            <button 
              onClick={handleAddTimesheet}
              style={{
                backgroundColor: 'var(--btn-default-bg, #f3f4f6)',
                border: '1px solid var(--border-color, #e5e7eb)',
                color: 'var(--text-color, #1a1a1a)',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-2, #e5e7eb)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--btn-default-bg, #f3f4f6)'}
            >
              Create your first Timesheet
            </button>
          </div>
        </div>
      ) : (
        /* Filters & Table View */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Filter Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', backgroundColor: 'var(--surface-gray-1, #f9fafb)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '8px', padding: '8px 12px', marginBottom: '24px', alignItems: 'center' }}>
            <input 
              placeholder="ID"
              value={filterId}
              onChange={e => setFilterId(e.target.value)}
              style={inputStyle}
            />
            <input 
              placeholder="Employee"
              value={filterEmployee}
              onChange={e => setFilterEmployee(e.target.value)}
              style={inputStyle}
            />
            <input 
              placeholder="Project"
              value={filterProject}
              onChange={e => setFilterProject(e.target.value)}
              style={inputStyle}
            />
            <select 
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={inputStyle}
            >
              <option value="">Status (All)</option>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
            </select>
            <button 
              onClick={clearFilters}
              style={{ ...buttonStyle, width: '100%', justifyContent: 'center' }}
            >
              <Filter size={13} /> Clear
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
              <option value="totalWorkingHours:desc">Working Hrs ↓</option>
              <option value="totalWorkingHours:asc">Working Hrs ↑</option>
            </select>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', backgroundColor: 'var(--card-bg, #ffffff)', borderRadius: '8px', border: '1px solid var(--border-color, #e5e7eb)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-muted, #6b7280)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Employee</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Project</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Working Hours</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 500 }}>Created On</th>
                </tr>
              </thead>
              <tbody>
                {sortedTimesheets.map(ts => (
                  <tr 
                    key={ts.id} 
                    onClick={() => navigate(`/projects/timesheet/${ts.id}`)}
                    style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', cursor: 'pointer', transition: 'background-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-1, #f9fafb)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--blue-500, #0289f7)', fontWeight: 500 }}>{ts.id}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color, #1a1a1a)' }}>{ts.employee || '—'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #6b7280)' }}>{ts.project || '—'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color, #1a1a1a)' }}>{(ts.totalWorkingHours || 0).toFixed(3)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ 
                        backgroundColor: ts.status === 'Draft' ? '#fff7ed' : '#f0fdf4',
                        color: ts.status === 'Draft' ? '#b45309' : '#15803d',
                        padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 500 
                      }}>
                        {ts.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #6b7280)' }}>{ts.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
