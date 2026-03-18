import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Branding from "../../../Shared/Components/Branding";
import { FaUsers, FaClock, FaUserMd, FaBars, FaTimes } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalWaiting: 0,
    avgWaitTime: "0 mins",
    activeDoctors: 0
  });

  const navigate = useNavigate();

  // Define API URL using environment variables for DevOps readiness
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !savedUser) {
      navigate('/'); 
      return;
    }

    // FIX: Parse JSON separately as requested by DevOps
    try {
      const parsed = JSON.parse(savedUser);
      setUserData(parsed);
    } catch (_err) {
      console.error("Failed to parse user data");
    }

    // FETCH LIVE STATS FROM BACKEND using the dynamic API_URL
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(_err => console.log(`Check if server is running at ${API_URL}`));
  }, [navigate, API_URL]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-card">
            <h2>Are you sure you want to logout?</h2>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="confirm-logout-btn" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}

      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header-label">
            {userData?.role === 'admin' ? 'Hospital Admin' : 'Staff Member'}
        </div>

        <nav className="sidebar-nav">
          <button className="nav-btn active" onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          <button className="nav-btn" onClick={() => navigate("/admin/queue-management")}>Queue Management</button>
        </nav>

        <button className="logout-link-mobile" onClick={handleLogoutClick}>Logout</button>
      </aside>

      <div className="main-viewport">
        <header className="dash-top-nav">
          <div className="header-left">
            <button className="hamburger-menu" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Branding />
          </div>

          <div className="header-right-desktop">
            <span className="admin-name">Staff Dashboard</span>
            <button className="logout-link-desktop" onClick={handleLogoutClick}>Logout</button>
          </div>
        </header>

        <div className="admin-content-inner">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;