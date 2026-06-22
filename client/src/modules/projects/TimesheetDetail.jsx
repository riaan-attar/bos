import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { Home, ChevronRight, Plus, Trash2, Clock } from 'lucide-react';

export default function TimesheetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timesheets, addTimesheet, updateTimesheet, projects } = useProjects();

  const isNew = id === 'new';

  // Form State
  const [formData, setFormData] = useState({
    series: 'TS-.YYYY.-',
    status: 'Draft',
    company: 'bootstack (Demo)',
    project: '',
    customer: '',
    currency: 'INR',
    exchangeRate: '1.000',
    employee: '',
    timeSheets: [
      { activityType: 'Development', fromTime: '', hrs: 0, project: '', isBillable: true }
    ],
    totalWorkingHours: 0,
    totalBillableHours: 0,
    totalBillableAmount: 0,
    totalCostingAmount: 0,
    note: ''
  });

  const [activeTab, setActiveTab] = useState('Details');
  const [isSaved, setIsSaved] = useState(!isNew);

  // Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Load existing timesheet
  useEffect(() => {
    if (!isNew) {
      const existing = (timesheets || []).find(t => t.id === id);
      if (existing) {
        setFormData(existing);
        setIsSaved(true);
      } else {
        navigate('/projects/timesheet');
      }
    }
  }, [id, timesheets]);

  // Calculations
  useEffect(() => {
    const totalHrs = formData.timeSheets.reduce((sum, row) => sum + parseFloat(row.hrs || 0), 0);
    const billableHrs = formData.timeSheets.reduce((sum, row) => sum + (row.isBillable ? parseFloat(row.hrs || 0) : 0), 0);
    
    // Assume a mock rate of ₹1500 / hr for billing and ₹800 / hr for costing
    const billableAmt = billableHrs * 1500;
    const costingAmt = totalHrs * 800;

    setFormData(prev => ({
      ...prev,
      totalWorkingHours: totalHrs,
      totalBillableHours: billableHrs,
      totalBillableAmount: billableAmt,
      totalCostingAmount: costingAmt
    }));
  }, [formData.timeSheets]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formData.timeSheets];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setFormData(prev => ({ ...prev, timeSheets: updatedRows }));
    setIsSaved(false);
  };

  const addRow = () => {
    setFormData(prev => ({
      ...prev,
      timeSheets: [...prev.timeSheets, { activityType: 'Development', fromTime: '', hrs: 0, project: '', isBillable: true }]
    }));
    setIsSaved(false);
  };

  const deleteRow = (index) => {
    const updatedRows = formData.timeSheets.filter((_, idx) => idx !== index);
    setFormData(prev => ({ ...prev, timeSheets: updatedRows }));
    setIsSaved(false);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();

    if (isNew) {
      const created = addTimesheet(formData);
      navigate(`/projects/timesheet/${created.id}`);
    } else {
      updateTimesheet(id, formData);
      setIsSaved(true);
    }
  };

  const handleStartTimer = () => {
    if (timerRunning) {
      // Stop timer and add hours to first row
      const hrsFromTimer = parseFloat((timerSeconds / 3600).toFixed(4));
      const updatedRows = [...formData.timeSheets];
      if (updatedRows.length > 0) {
        updatedRows[0].hrs = parseFloat((parseFloat(updatedRows[0].hrs || 0) + hrsFromTimer).toFixed(3));
      }
      setFormData(prev => ({ ...prev, timeSheets: updatedRows }));
      setTimerRunning(false);
      setTimerSeconds(0);
      setIsSaved(false);
    } else {
      setTimerRunning(true);
    }
  };

  const formatTimerTime = (totalSecs) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Styles
  const inputStyle = {
    width: '100%',
    backgroundColor: 'var(--control-bg, #ffffff)',
    border: '1px solid var(--border-color, #e5e7eb)',
    borderRadius: '6px',
    padding: '8px 12px',
    color: 'var(--text-color, #1a1a1a)',
    fontSize: '14px',
    fontFamily: 'var(--font-family, Inter, sans-serif)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-muted, #4b5563)',
    display: 'block',
    marginBottom: '6px'
  };

  const headerButtonStyle = {
    border: '1px solid var(--border-color, #e5e7eb)',
    borderRadius: '6px',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-family, Inter, sans-serif)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  return (
    <div style={{ padding: '16px 24px', fontFamily: 'var(--font-family, Inter, sans-serif)', color: 'var(--text-color, #1a1a1a)', backgroundColor: 'var(--bg-color, #ffffff)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* ─── Breadcrumbs & Actions ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-muted, #6b7280)' }}>
          <Link to="/projects" style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted, #6b7280)', textDecoration: 'none' }}>
            <Home size={15} style={{ marginRight: '6px' }} />
            Projects
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--border-color, #e5e7eb)' }} />
          <Link to="/projects/timesheet" style={{ color: 'var(--text-muted, #6b7280)', textDecoration: 'none' }}>
            Timesheet
          </Link>
          <ChevronRight size={14} style={{ color: 'var(--border-color, #e5e7eb)' }} />
          <span style={{ color: 'var(--text-color, #1a1a1a)', fontWeight: 500 }}>{isNew ? 'New Timesheet' : id}</span>
          
          <span style={{ 
            marginLeft: '12px',
            backgroundColor: isSaved ? '#f0fdf4' : '#fff7ed',
            color: isSaved ? '#15803d' : '#b45309',
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '11px', 
            fontWeight: 600,
            textTransform: 'uppercase'
          }}>
            {isSaved ? 'Saved' : 'Not Saved'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={handleStartTimer}
            style={{ 
              ...headerButtonStyle, 
              backgroundColor: timerRunning ? '#fef2f2' : '#f3f4f6', 
              color: timerRunning ? '#ef4444' : '#374151' 
            }}
          >
            <Clock size={14} />
            {timerRunning ? `Stop Timer (${formatTimerTime(timerSeconds)})` : 'Start Timer'}
          </button>
          <button 
            onClick={handleSave} 
            style={{ ...headerButtonStyle, backgroundColor: 'var(--gray-900, #111827)', color: '#ffffff', border: '1px solid var(--gray-900, #111827)' }}
          >
            Save
          </button>
        </div>
      </div>

      {/* ─── Pagination Tabs ─── */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color, #e5e7eb)', marginBottom: '24px', gap: '24px' }}>
        {['Details', 'Billing'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 4px',
              fontSize: '14px',
              fontWeight: activeTab === tab ? 600 : 400,
              color: activeTab === tab ? 'var(--text-color, #1a1a1a)' : 'var(--text-muted, #6b7280)',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--blue-500, #0289f7)' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              marginBottom: '-1px'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Form Content ─── */}
      <div style={{ flex: 1 }}>
        {activeTab === 'Details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Grid 1: Basic details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Series *</label>
                  <select 
                    value={formData.series} 
                    onChange={e => handleInputChange('series', e.target.value)} 
                    style={inputStyle}
                  >
                    <option value="TS-.YYYY.-">TS-.YYYY.-</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Company</label>
                  <input 
                    type="text" 
                    value={formData.company} 
                    onChange={e => handleInputChange('company', e.target.value)} 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Customer</label>
                  <input 
                    type="text" 
                    value={formData.customer} 
                    placeholder="Customer Name"
                    onChange={e => handleInputChange('customer', e.target.value)} 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Currency</label>
                  <input 
                    type="text" 
                    value={formData.currency} 
                    onChange={e => handleInputChange('currency', e.target.value)} 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Exchange Rate</label>
                  <input 
                    type="text" 
                    value={formData.exchangeRate} 
                    onChange={e => handleInputChange('exchangeRate', e.target.value)} 
                    style={inputStyle} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Status</label>
                  <input 
                    type="text" 
                    disabled 
                    value={formData.status} 
                    style={{ ...inputStyle, backgroundColor: 'var(--surface-gray-1, #f9fafb)', cursor: 'not-allowed' }} 
                  />
                </div>
                <div>
                  <label style={labelStyle}>Project</label>
                  <select 
                    value={formData.project} 
                    onChange={e => handleInputChange('project', e.target.value)} 
                    style={inputStyle}
                  >
                    <option value="">Select Project...</option>
                    {(projects || []).map(p => (
                      <option key={p.id} value={p.projectName}>{p.projectName} ({p.id})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Details Section */}
            <div style={{ borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Employee Detail</h3>
              <div style={{ width: '50%' }}>
                <label style={labelStyle}>Employee</label>
                <input 
                  type="text" 
                  placeholder="e.g. EMP-001"
                  value={formData.employee} 
                  onChange={e => handleInputChange('employee', e.target.value)} 
                  style={inputStyle} 
                />
              </div>
            </div>

            {/* Time Sheets Table */}
            <div style={{ borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Time Sheets</h3>
              
              <div style={{ border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--card-bg, #ffffff)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--surface-gray-1, #f9fafb)', borderBottom: '1px solid var(--border-color, #e5e7eb)', textAlign: 'left' }}>
                      <th style={{ padding: '10px', width: '40px' }}>No.</th>
                      <th style={{ padding: '10px', width: '25%' }}>Activity Type</th>
                      <th style={{ padding: '10px', width: '25%' }}>From Time</th>
                      <th style={{ padding: '10px', width: '15%' }}>Hrs</th>
                      <th style={{ padding: '10px', width: '25%' }}>Project</th>
                      <th style={{ padding: '10px', width: '10%', textAlign: 'center' }}>Is Billable</th>
                      <th style={{ padding: '10px', width: '40px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.timeSheets.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                        <td style={{ padding: '10px', textAlign: 'center', color: 'var(--text-muted, #6b7280)' }}>{idx + 1}</td>
                        <td style={{ padding: '10px' }}>
                          <input 
                            type="text" 
                            value={row.activityType} 
                            onChange={e => handleRowChange(idx, 'activityType', e.target.value)}
                            style={{ ...inputStyle, padding: '4px 8px', fontSize: '13px' }}
                          />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <input 
                            type="datetime-local" 
                            value={row.fromTime} 
                            onChange={e => handleRowChange(idx, 'fromTime', e.target.value)}
                            style={{ ...inputStyle, padding: '4px 8px', fontSize: '13px' }}
                          />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <input 
                            type="number" 
                            step="0.001"
                            value={row.hrs} 
                            onChange={e => handleRowChange(idx, 'hrs', parseFloat(e.target.value) || 0)}
                            style={{ ...inputStyle, padding: '4px 8px', fontSize: '13px' }}
                          />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <select 
                            value={row.project} 
                            onChange={e => handleRowChange(idx, 'project', e.target.value)}
                            style={{ ...inputStyle, padding: '4px 8px', fontSize: '13px' }}
                          >
                            <option value="">Select Project...</option>
                            {(projects || []).map(p => (
                              <option key={p.id} value={p.projectName}>{p.projectName}</option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={row.isBillable} 
                            onChange={e => handleRowChange(idx, 'isBillable', e.target.checked)}
                            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <button 
                            type="button" 
                            onClick={() => deleteRow(idx)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button 
                type="button" 
                onClick={addRow}
                style={{ 
                  marginTop: '12px', 
                  backgroundColor: 'var(--btn-default-bg, #f3f4f6)', 
                  border: '1px solid var(--border-color, #e5e7eb)',
                  borderRadius: '6px', 
                  padding: '6px 16px', 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Plus size={14} /> Add row
              </button>
            </div>

            {/* Total Working Hours */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '20px' }}>
              <div>
                <label style={labelStyle}>Total Working Hours</label>
                <input 
                  type="text" 
                  disabled 
                  value={formData.totalWorkingHours.toFixed(3)} 
                  style={{ ...inputStyle, backgroundColor: 'var(--surface-gray-1, #f9fafb)', cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Billing' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '-8px' }}>Billing Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Total Billable Hours</label>
                  <input 
                    type="text" 
                    disabled 
                    value={formData.totalBillableHours.toFixed(3)} 
                    style={{ ...inputStyle, backgroundColor: 'var(--surface-gray-1, #f9fafb)', cursor: 'not-allowed' }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Total Billable Amount (INR)</label>
                  <input 
                    type="text" 
                    disabled 
                    value={`₹ ${formData.totalBillableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    style={{ ...inputStyle, backgroundColor: 'var(--surface-gray-1, #f9fafb)', cursor: 'not-allowed' }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Total Costing Amount (INR)</label>
                  <input 
                    type="text" 
                    disabled 
                    value={`₹ ${formData.totalCostingAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    style={{ ...inputStyle, backgroundColor: 'var(--surface-gray-1, #f9fafb)', cursor: 'not-allowed' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>Note</h3>
              <textarea 
                value={formData.note}
                onChange={e => handleInputChange('note', e.target.value)}
                placeholder="Write any comments or billing details here..."
                style={{ ...inputStyle, height: '150px', resize: 'vertical' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
