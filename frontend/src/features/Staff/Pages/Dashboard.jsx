/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import { FaUsers, FaClock, FaUserMd } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalWaiting: 0,
    avgWaitTime: "0 mins",
    activeDoctors: 0
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !savedUser) {
      navigate('/'); 
      return;
    }

    try {
      const parsed = JSON.parse(savedUser);
      if (parsed) {
        // Using functional update to avoid the "cascading render" lint error
        setUserData(() => parsed);
      }
    } catch {
      console.error("Failed to parse user data");
    }

    // FETCH LIVE STATS
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(() => console.log(`Check if server is running at ${API_URL}`));
  }, [navigate, API_URL]);

  return (
    <AdminLayout activeTab="dashboard">
      <div className="dashboard-title-box">
        <h1>{userData?.fullName || userData?.name || "Noluthando"}</h1>
        <p>
          {userData?.hospital_name || 
           userData?.hospitalName || 
           userData?.hospital || 
           "Nexus CareQueue Clinic"}
        </p>
      </div>

      <div className="status-container">
        <h3>Current Status</h3>
        <div className="status-pill">Live</div>

        <div className="stat-row">
          <div className="stat-icon blue"><FaUsers /></div>
          <div className="stat-info">
            <p className="stat-label">Total Patients Waiting</p>
            <p className="stat-value">{stats.totalWaiting} Patients</p>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-icon orange"><FaClock /></div>
          <div className="stat-info">
            <p className="stat-label">Average Wait Time</p>
            <p className="stat-value">{stats.avgWaitTime}</p>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-icon green"><FaUserMd /></div>
          <div className="stat-info">
            <p className="stat-label">Active Staff</p>
            <p className="stat-value">Online</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;