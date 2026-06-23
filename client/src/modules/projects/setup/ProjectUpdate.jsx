import React, { useState } from 'react';
import { Plus, X, ChevronDown, RefreshCw, MoreHorizontal, Filter, FileText, List, ArrowUpDown, Columns, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DATA = [
  { project: 'Gangapur Heights Phase 1', type: 'Progress', description: 'Foundation work completed. 3rd floor slab casting done.', date: '15/06/2026', sentTo: 'CEO', createdBy: 'Amit Kulkarni' },
  { project: 'Nashik Road Villas', type: 'Milestone', description: 'Handover completed for Unit 5,6,7.', date: '10/06/2026', sentTo: 'Vikram Agarwal', createdBy: 'Rahul Desai' },
  { project: 'Satpur Commercial Complex', type: 'Issue', description: 'Steel delivery delayed by 2 weeks.', date: '12/06/2026', sentTo: 'CEO', createdBy: 'Sneha Patil' },
];

export default function ProjectUpdate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProject, setFilterProject] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredData = MOCK_DATA.filter(item => {
    return item.project.toLowerCase().includes(filterProject.toLowerCase()) &&
           (filterType ? item.type === filterType : true);
  });

  const clearFilters = () => { setFilterProject(''); setFilterType(''); };

  const buttonStyle = { backgroundColor: 'var(--control-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-muted, #4b5563)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.15s' };
  const inputStyle = { backgroundColor: 'var(--control-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', color: 'var(--text-color, #1a1a1a)', width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ fontFamily: 'var(--font-family, Inter, sans-serif)', color: 'var(--text-color, #1a1a1a)', backgroundColor: 'var(--bg-color, #ffffff)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* ─── Top Action Bar ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ ...buttonStyle, color: 'var(--text-color, #1a1a1a)', fontWeight: 500 }}>
            <List size={14} /> List View <ChevronDown size={14} style={{ color: 'var(--text-muted, #9ca3af)' }} />
          </button>
          <button style={{ ...buttonStyle, padding: '6px 8px' }}><MoreHorizontal size={14} /></button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => window.location.reload()} style={{ ...buttonStyle, padding: '6px 8px' }}><RefreshCw size={14} /></button>
          <button onClick={() => setShowFilters(!showFilters)} style={{ ...buttonStyle, backgroundColor: showFilters ? 'var(--surface-gray-2, #f3f4f6)' : 'var(--control-bg, #ffffff)' }}>
            <Filter size={14} /> Filter
          </button>
          <button style={buttonStyle}><ArrowUpDown size={14} /> Sort</button>
          <button style={buttonStyle}><Columns size={14} /> Columns</button>
          <button style={{ ...buttonStyle, padding: '6px 8px' }}><MoreHorizontal size={14} /></button>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'var(--gray-900, #111827)', border: '1px solid var(--gray-900, #111827)', color: '#ffffff', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
            <Plus size={14} /> Add Update
          </button>
        </div>
      </div>

      {/* ─── Expandable Filter Bar ─── */}
      {showFilters && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', backgroundColor: 'var(--surface-gray-1, #f9fafb)', borderBottom: '1px solid var(--border-color, #e5e7eb)', padding: '12px 24px', alignItems: 'center' }}>
          <input placeholder="Project Name" value={filterProject} onChange={e => setFilterProject(e.target.value)} style={inputStyle} />
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={inputStyle}>
            <option value="">Update Type (All)</option><option value="Progress">Progress</option><option value="Milestone">Milestone</option><option value="Issue">Issue</option><option value="General">General</option>
          </select>
          <button onClick={clearFilters} style={{ ...buttonStyle, width: '100%', justifyContent: 'center' }}>
            <Filter size={13} /> Clear Filters
          </button>
          <select style={inputStyle}>
            <option value="date:desc">Date ↓</option><option value="date:asc">Date ↑</option>
          </select>
        </div>
      )}

      {/* ─── Main Content / Table ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color, #ffffff)' }}>
        {filteredData.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', padding: '40px' }}>
            <FileText size={48} strokeWidth={1} style={{ color: 'var(--gray-400, #9ca3af)', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: 'var(--text-muted, #6b7280)', marginBottom: '16px', textAlign: 'center' }}>No Project Update found.</p>
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'var(--control-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-color, #1a1a1a)', padding: '8px 18px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
              Create a new Project Update
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', padding: '0 24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-muted, #6b7280)' }}>
                  <th style={{ padding: '12px 0 12px 8px', width: '30px', textAlign: 'center' }}><input type="checkbox" style={{ cursor: 'pointer', accentColor: 'var(--gray-900, #111827)' }} /></th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROJECT</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPDATE TYPE</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DESCRIPTION</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DATE</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SENT TO</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CREATED BY</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #f3f4f6)', cursor: 'pointer', transition: 'background-color 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-gray-1, #f9fafb)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '12px 0 12px 8px', textAlign: 'center' }}><input type="checkbox" style={{ cursor: 'pointer', accentColor: 'var(--gray-900, #111827)' }} /></td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color, #1a1a1a)', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--surface-gray-1, #f9fafb)', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MessageSquare size={12} color="var(--text-muted, #6b7280)" />
                        </div>
                        {row.project}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #4b5563)' }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #4b5563)', maxWidth: '250px' }}>{row.description}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #4b5563)' }}>{row.date}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #4b5563)' }}>{row.sentTo}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted, #4b5563)' }}>{row.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--control-bg, #ffffff)', borderRadius: '10px', width: '500px', maxWidth: '90%', border: '1px solid var(--border-color, #e5e7eb)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, color: 'var(--text-color, #1a1a1a)' }}>New Project Update</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted, #6b7280)' }}><X size={18} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted, #4b5563)', display: 'block', marginBottom: '6px' }}>Project *</label><input type="text" style={inputStyle} /></div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}><label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted, #4b5563)', display: 'block', marginBottom: '6px' }}>Update Type</label><select style={inputStyle}><option>Progress</option><option>Issue</option><option>Milestone</option><option>General</option></select></div>
                <div style={{ flex: 1 }}><label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted, #4b5563)', display: 'block', marginBottom: '6px' }}>Date</label><input type="date" defaultValue={new Date().toISOString().split('T')[0]} style={inputStyle} /></div>
              </div>
              <div><label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted, #4b5563)', display: 'block', marginBottom: '6px' }}>Sent To</label><input type="text" style={inputStyle} /></div>
              <div><label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted, #4b5563)', display: 'block', marginBottom: '6px' }}>Description *</label><textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} /></div>
            </div>
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color, #e5e7eb)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'var(--control-bg, #ffffff)', border: '1px solid var(--border-color, #e5e7eb)', color: 'var(--text-muted, #4b5563)', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: 'var(--gray-900, #111827)', border: 'none', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
