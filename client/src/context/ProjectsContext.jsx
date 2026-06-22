import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../utils/socket';

const ProjectsContext = createContext(null);
const API_BASE = `${import.meta.env.VITE_API_URL}/api/projects`;
const PROJECT_API = `${API_BASE}/project`;
const TASK_API = `${API_BASE}/task`;
const TIMESHEET_API = `${API_BASE}/timesheet`;

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [timesheets, setTimesheets] = useState([]);

  // Fetch initial data from backend API with local fallbacks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProj = await axios.get(PROJECT_API);
        setProjects(resProj.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        const saved = localStorage.getItem('erp_projects');
        if (saved) setProjects(JSON.parse(saved));
      }

      try {
        const resTasks = await axios.get(TASK_API);
        setProjectTasks(resTasks.data);
      } catch (err) {
        console.error('Error fetching project tasks:', err);
        const saved = localStorage.getItem('erp_project_tasks');
        if (saved) setProjectTasks(JSON.parse(saved));
      }

      try {
        const resTS = await axios.get(TIMESHEET_API);
        setTimesheets(resTS.data);
      } catch (err) {
        console.error('Error fetching timesheets:', err);
        const saved = localStorage.getItem('erp_timesheets');
        if (saved) setTimesheets(JSON.parse(saved));
      }
    };
    fetchData();
  }, []);

  // Sync to local storage as fallback when offline
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('erp_projects', JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (projectTasks.length > 0) {
      localStorage.setItem('erp_project_tasks', JSON.stringify(projectTasks));
    }
  }, [projectTasks]);

  useEffect(() => {
    if (timesheets.length > 0) {
      localStorage.setItem('erp_timesheets', JSON.stringify(timesheets));
    }
  }, [timesheets]);

  // Listen to WebSocket updates
  useEffect(() => {
    const handleProjectsUpdate = (update) => {
      const { model, action, data } = update;
      
      if (model === 'project') {
        setProjects((prev) => {
          switch (action) {
            case 'create':
              if (prev.some((item) => item.id === data.id)) return prev;
              return [data, ...prev];
            case 'update':
              return prev.map((item) => (item.id === data.id ? data : item));
            case 'delete':
              return prev.filter((item) => item.id !== data.id);
            default:
              return prev;
          }
        });
      } else if (model === 'task') {
        setProjectTasks((prev) => {
          switch (action) {
            case 'create':
              if (prev.some((item) => item.id === data.id)) return prev;
              return [data, ...prev];
            case 'update':
              return prev.map((item) => (item.id === data.id ? data : item));
            case 'delete':
              return prev.filter((item) => item.id !== data.id);
            default:
              return prev;
          }
        });
      } else if (model === 'timesheet') {
        setTimesheets((prev) => {
          switch (action) {
            case 'create':
              if (prev.some((item) => item.id === data.id)) return prev;
              return [data, ...prev];
            case 'update':
              return prev.map((item) => (item.id === data.id ? data : item));
            case 'delete':
              return prev.filter((item) => item.id !== data.id);
            default:
              return prev;
          }
        });
      }
    };

    socket.on('projects:update', handleProjectsUpdate);
    return () => {
      socket.off('projects:update', handleProjectsUpdate);
    };
  }, []);

  // CRUD actions using Axios API calls
  const addProject = async (projectData) => {
    try {
      const res = await axios.post(PROJECT_API, projectData);
      setProjects((prev) => {
        if (prev.some((p) => p.id === res.data.id)) return prev;
        return [res.data, ...prev];
      });
      return res.data;
    } catch (err) {
      console.error('Error adding project:', err);
      // Local fallback in case server fails
      const formattedId = `PROJ-${String(projects.length + 1).padStart(4, '0')}`;
      const fallback = { id: formattedId, createdOn: new Date().toLocaleDateString('en-GB'), ...projectData };
      setProjects((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateProject = async (id, updates) => {
    try {
      const res = await axios.put(`${PROJECT_API}/${id}`, updates);
      setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      console.error('Error updating project:', err);
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${PROJECT_API}/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const addProjectTask = async (taskData) => {
    try {
      const res = await axios.post(TASK_API, taskData);
      setProjectTasks((prev) => {
        if (prev.some((t) => t.id === res.data.id)) return prev;
        return [res.data, ...prev];
      });
      return res.data;
    } catch (err) {
      console.error('Error adding project task:', err);
      const formattedId = `TASK-${String(projectTasks.length + 1).padStart(4, '0')}`;
      const fallback = { id: formattedId, createdOn: new Date().toLocaleDateString('en-GB'), ...taskData };
      setProjectTasks((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateProjectTask = async (id, updates) => {
    try {
      const res = await axios.put(`${TASK_API}/${id}`, updates);
      setProjectTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error('Error updating project task:', err);
      setProjectTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    }
  };

  const deleteProjectTask = async (id) => {
    try {
      await axios.delete(`${TASK_API}/${id}`);
      setProjectTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting project task:', err);
      setProjectTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const addTimesheet = async (timesheetData) => {
    try {
      const res = await axios.post(TIMESHEET_API, timesheetData);
      setTimesheets((prev) => {
        if (prev.some((t) => t.id === res.data.id)) return prev;
        return [res.data, ...prev];
      });
      return res.data;
    } catch (err) {
      console.error('Error adding timesheet:', err);
      const formattedId = `TS-${String(timesheets.length + 1).padStart(4, '0')}`;
      const fallback = { id: formattedId, createdOn: new Date().toLocaleDateString('en-GB'), ...timesheetData };
      setTimesheets((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const updateTimesheet = async (id, updates) => {
    try {
      const res = await axios.put(`${TIMESHEET_API}/${id}`, updates);
      setTimesheets((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      return res.data;
    } catch (err) {
      console.error('Error updating timesheet:', err);
      setTimesheets((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    }
  };

  const deleteTimesheet = async (id) => {
    try {
      await axios.delete(`${TIMESHEET_API}/${id}`);
      setTimesheets((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting timesheet:', err);
      setTimesheets((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      addProject, 
      updateProject, 
      deleteProject,
      projectTasks,
      addProjectTask,
      updateProjectTask,
      deleteProjectTask,
      timesheets,
      addTimesheet,
      updateTimesheet,
      deleteTimesheet
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
