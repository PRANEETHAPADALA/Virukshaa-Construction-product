import './DailyAttendance.css';
import Sidebar from './Sidebar';
import AddEmployeeForm from './EmployeeForm';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import React, { useState } from 'react';



const DailyAttendance = () => {
  const [employees, setEmployees] = useState([
    { name: 'John Smith', role: 'Foreman', rate: 150, status: 'Present', hours: 8 },
    { name: 'Mike Johnson', role: 'Carpenter', rate: 120, status: 'Present', hours: 8 },
    { name: 'David Brown', role: 'Laborer', rate: 100, status: 'Absent', hours: 0 },
    { name: 'Chris Wilson', role: 'Electrician', rate: 140, status: 'Present', hours: 6 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = (data) => {
    const updated = [...employees];
    if (editIndex !== null) {
      updated[editIndex] = data;
    } else {
      updated.push(data);
    }
    setEmployees(updated);
    setShowForm(false);
    setEditIndex(null);
  };

  const handleToggle = (index) => {
    const updated = [...employees];
    updated[index].status = updated[index].status === 'Present' ? 'Absent' : 'Present';
    setEmployees(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const today = new Date().toLocaleDateString('en-GB');

  return (
    <div className="attendance-page">
      <Sidebar />
      <div className="attendance-main">
        <div className="top-header">
          <div>
            <h1>Attendance</h1>
            <p>Track daily employee attendance</p>
          </div>
          <button className="add-btn" onClick={() => { setShowForm(true); setEditIndex(null); }}>
  <FiPlus style={{ marginRight: '6px' }} /> Add Employee
</button>
         </div>

        <div className="attendance-box">
          <div className="box-header">
            <div>
              <h2>Employee Attendance - {today}</h2>
              <p>Mark attendance and track working hours</p>
            </div>
          </div>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Status</th>
                <th>Hours Worked</th>
                <th>Daily Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr key={i} className={i === employees.length - 1 ? 'last-row' : ''}>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button
                      className={`status-btn ${emp.status === 'Present' ? 'present' : 'absent'}`}
                      onClick={() => handleToggle(i)}
                    >
                      {emp.status.toLowerCase()}
                    </button>
                  </td>
                  <td>{emp.hours}h</td>
                  <td>${emp.rate}</td>
                  <td>
                    <button className="icon-btn" onClick={() => handleEdit(i)}><FiEdit2 /></button>
                    <button className="icon-btn" onClick={() => handleDelete(i)}><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="popup-overlay">
            <div className="popup-box">
              <AddEmployeeForm
                onClose={() => { setShowForm(false); setEditIndex(null); }}
                onSubmit={handleSave}
                initialData={editIndex !== null ? employees[editIndex] : null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyAttendance;
