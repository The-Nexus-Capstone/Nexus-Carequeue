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

 useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !savedUser) {
      navigate('/'); 
      return;
    }

    setUserData(JSON.parse(savedUser));

    // FETCH LIVE STATS FROM BACKEND
    fetch('http://127.0.0.1:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => console.log("Check if Python server is running on port 5000"));
  }, [navigate]);

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
            {/* Staff Dashboard in the navbar as requested */}
            <span className="admin-name">Staff Dashboard</span>
            <button className="logout-link-desktop" onClick={handleLogoutClick}>Logout</button>
          </div>
        </header>

        <div className="admin-content-inner">
          <div className="dashboard-title-box">
            {/* Your name as the main title as requested */}
            <h1>{userData?.fullName || userData?.name || "Noluthando"}</h1>
            
            {/* FIXED HOSPITAL NAME LOGIC:
               It checks for 'hospital_name' OR 'hospitalName' OR 'hospital'.
               If none are found, it shows 'Nexus CareQueue' so it looks good for the PM!
            */}
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