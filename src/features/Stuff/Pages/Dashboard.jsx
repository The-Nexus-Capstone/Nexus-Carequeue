import React from 'react';
import AdminLayout from '../Components/AdminLayout';
import { FaUsers, FaClock, FaUserMd } from 'react-icons/fa';
import './Dashboard.css'; 

const Dashboard = () => {
  const patients = 6;

  const getStatus = (count) => {
    if (count > 15) return { text: "Busy", color: "#fed7d7", textCol: "#c53030" };
    return { text: "Not Busy", color: "#e6fffa", textCol: "#38b2ac" };
  };

  const status = getStatus(patients);

  return (
    <AdminLayout activeTab="dashboard">
      <div className="dash-header">
        <h1>Staff Dashboard</h1>
        <p>Community Health Center, Ikeja</p>
      </div>

      <div className="status-container">
        <h3>Current Status</h3>
        <span className="status-pill" style={{ backgroundColor: status.color, color: status.textCol }}>
          {status.text}
        </span>

        <div className="stat-item">
          <div className="stat-icon blue"><FaUsers /></div>
          <div>
            <p className="stat-label">Total Patients Waiting</p>
            <p className="stat-value">{patients} Patients</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon orange"><FaClock /></div>
          <div>
            <p className="stat-label">Average Wait Time</p>
            <p className="stat-value">53 minutes</p>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon green"><FaUserMd /></div>
          <div>
            <p className="stat-label">Active Doctors</p>
            <p className="stat-value">13 Doctors</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;