import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Branding from '../../../Shared/Components/Branding';
import { FaUsers, FaClock, FaUserMd, FaBars, FaTimes } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const navigate = useNavigate(); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoutClick = () => {
    setIsMenuOpen(false); 
    setShowLogoutModal(true);
  };

 
  const confirmLogout = () => {
   
    
    setShowLogoutModal(false);
    navigate('/'); 
  };

  return (
    <div className="admin-layout">
      
     
      {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>}

      
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-card">
            <h2>Are you sure you want to logout?</h2>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="confirm-logout-btn" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      
      <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header-label">Hospital Admin</div>
        
        <nav className="sidebar-nav">
          <button className="nav-btn active">Dashboard</button>
          <button className="nav-btn">Queue Management</button>
        </nav>

        <button className="logout-link-mobile" onClick={handleLogoutClick}>
          Logout
        </button>
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
            <span className="admin-name">Hospital Admin</span>
            
            <button className="logout-link-desktop" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </header>

        <div className="admin-content-inner">
          <div className="dashboard-title-box">
            <h1>Staff Dashboard</h1>
            <p>Community Health Center, Ikeja</p>
          </div>

          <div className="status-container">
            <h3>Current Status</h3>
            <div className="status-pill">Not Busy</div>

            <div className="stat-row">
              <div className="stat-icon blue"><FaUsers /></div>
              <div className="stat-info">
                <p className="stat-label">Total Patients Waiting</p>
                <p className="stat-value">6 Patients</p>
              </div>
            </div>

            <div className="stat-row">
              <div className="stat-icon orange"><FaClock /></div>
              <div className="stat-info">
                <p className="stat-label">Average Wait Time</p>
                <p className="stat-value">53 minutes</p>
              </div>
            </div>

            <div className="stat-row">
              <div className="stat-icon green"><FaUserMd /></div>
              <div className="stat-info">
                <p className="stat-label">Active Doctors</p>
                <p className="stat-value">13 Doctors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;