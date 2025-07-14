import React, { useState } from 'react';
import './SupervisorDashboard.css';
import './CommonForm.css';
import Sidebar from './Sidebar';
import { FiCalendar, FiUsers, FiClock, FiPlus } from 'react-icons/fi';

const SupervisorDashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [tasks, setTasks] = useState([
    {
      title: 'Foundation Work',
      project: 'Residential Tower',
      assignedTo: 'John Smith',
      progress: 65,
      status: 'in progress',
    },
    {
      title: 'Electrical Wiring',
      project: 'Office Complex',
      assignedTo: 'Chris Wilson',
      progress: 0,
      status: 'not started',
    },
    {
      title: 'Material Delivery',
      project: 'Shopping Mall',
      assignedTo: 'David Brown',
      progress: 30,
      status: 'in progress',
    },
  ]);

  const [employees] = useState(['John Smith', 'Chris Wilson', 'David Brown']);

  const [formData, setFormData] = useState({
    employee: '',
    task: '',
    hours: '',
    description: '',
  });

  const [updates, setUpdates] = useState([]);

  const [newTask, setNewTask] = useState({
    title: '',
    project: '',
    assignedTo: '',
    status: 'Not Started',
    progress: 0,
    dueDate: '',
    description: '',
  });

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, newTask]);
    setNewTask({
      title: '',
      project: '',
      assignedTo: '',
      status: 'Not Started',
      progress: 0,
      dueDate: '',
      description: '',
    });
    setShowTaskForm(false);
  };

  const handleLogWork = () => {
    if (!formData.employee || !formData.task || !formData.hours) return;
    const newUpdate = {
      ...formData,
      timestamp: new Date().toLocaleString(),
    };
    setUpdates([newUpdate, ...updates]);
    setFormData({ employee: '', task: '', hours: '', description: '' });
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeSection="supervisor" />
      <div className="dashboard-main">
        <h1 className="heading">Supervisor Dashboard</h1>
        <p className="subtext">Manage labor work, assign tasks, and track progress</p>

        <div className="top-cards">
          <div className="top-card">
            <div className="icon-container"><FiCalendar /></div>
            <h3>Active Tasks</h3>
            <p className="card-value">{tasks.length}</p>
            <span className="card-sub">
              In progress: {tasks.filter(t => t.status === 'in progress').length}
            </span>
          </div>

          <div className="top-card">
            <div className="icon-container"><FiUsers /></div>
            <h3>Team Members</h3>
            <p className="card-value">{employees.length}</p>
            <span className="card-sub">3 present today</span>
          </div>

          <div className="top-card">
            <div className="icon-container"><FiClock /></div>
            <h3>Labor Hours</h3>
            <p className="card-value">
              {updates.reduce((sum, u) => sum + Number(u.hours || 0), 0)}
            </p>
            <span className="card-sub">Hours logged today</span>
          </div>
        </div>

        <div className="task-log-grid">
          <div className="task-section">
            <div className="task-header">
              <h2>Task Management</h2>
              <p>Assign and track construction tasks</p>
              <button className="add-task-btn" onClick={() => setShowTaskForm(true)}>
                <FiPlus /> New Task
              </button>
            </div>
            {tasks.map((task, index) => (
              <div className="task-card" key={index}>
                <h4>{task.title}</h4>
                <p className="task-sub">{task.project}</p>
                <span className="task-assign">Assigned to: {task.assignedTo}</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${task.progress}%` }}></div>
                </div>
                <span className="task-status">{task.status}</span>
              </div>
            ))}
          </div>


          <div className="log-work-section">
            <h2>Update Labor Work</h2>
            <p className="log-subtext">Log hours and update work progress</p>

            <form className="common-form" onSubmit={(e) => { e.preventDefault(); handleLogWork(); }}>
              <div className="form-row">
                <label>Employee</label>
                <div className="input-box">
                  <select
                    value={formData.employee}
                    onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                  >
                    <option value="">Select employee</option>
                    {employees.map((emp, i) => (
                      <option key={i}>{emp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <label>Task</label>
                <div className="input-box">
                  <select
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  >
                    <option value="">Select task</option>
                    {tasks.map((t, i) => (
                      <option key={i}>{t.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <label>Hours Worked</label>
                <div className="input-box">
                  <input
                    type="number"
                    placeholder="Enter hours"
                    value={formData.hours}
                    onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <label>Work Description</label>
                <div className="input-box">
                  <textarea
                    placeholder="Describe the work completed"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-btns">
                <button type="submit" className="submit-btn">Log Work</button>
              </div>
            </form>

            <div className="recent-updates-box">
              <h3>Recent Labor Updates</h3>
              {updates.length === 0 ? (
                <p className="no-updates">No labor updates logged yet</p>
              ) : (
                updates.map((u, i) => (
                  <div className="update-card" key={i}>
                    <strong>{u.employee}</strong> logged <strong>{u.hours} hrs</strong> for <strong>{u.task}</strong>
                    <div className="desc">{u.description}</div>
                    <small>{u.timestamp}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>


        {showTaskForm && (
          <div className="form-modal">
            <div className="form-box">
              <span className="form-close" onClick={() => setShowTaskForm(false)}>×</span>
              <form className="common-form" onSubmit={handleNewTaskSubmit}>
                <h2>Add New Task</h2>
                <p>Create a new construction task</p>

                <div className="form-row">
                  <label>Task Title</label>
                  <div className="input-box">
                    <input type="text" required value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
                  </div>
                </div>

                <div className="form-row">
                  <label>Project</label>
                  <div className="input-box">
                    <input type="text" required value={newTask.project} onChange={(e) => setNewTask({ ...newTask, project: e.target.value })} />
                  </div>
                </div>

                <div className="form-row">
                  <label>Assign To</label>
                  <div className="input-box">
                    <select required value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}>
                      <option value="">Select</option>
                      {employees.map((emp, i) => (
                        <option key={i}>{emp}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label>Status</label>
                  <div className="input-box">
                    <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                      <option>Not Started</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label>Progress: {newTask.progress}%</label>
                  <div className="input-box">
                    <input type="range" min="0" max="100" value={newTask.progress} onChange={(e) => setNewTask({ ...newTask, progress: e.target.value })} />
                  </div>
                </div>

                <div className="form-row">
                  <label>Due Date</label>
                  <div className="input-box">
                    <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
                  </div>
                </div>

                <div className="form-row">
                  <label>Description</label>
                  <div className="input-box">
                    <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
                  </div>
                </div>

                <div className="form-btns">
                  <button type="button" className="cancel-btn" onClick={() => setShowTaskForm(false)}>Cancel</button>
                  <button type="submit" className="submit-btn">Create Task</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorDashboard;
