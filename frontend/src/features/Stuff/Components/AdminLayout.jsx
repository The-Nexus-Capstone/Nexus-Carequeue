import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Pages/AdminLayout.css';

const AdminLayout = ({ children, activeTab }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/staff-login');

  return (
    <div className="admin-container">
      
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <span className="icon">💙</span>
          <div className="logo-text">
            <h2>CareQueue</h2>
            <p>Smart clinic access for everyone.</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}>
            Dashboard
          </button>
          <button className={`nav-btn ${activeTab === 'queue' ? 'active' : ''}`}>
            Queue Management
          </button>
        </nav>

        <button className="logout-link" onClick={() => setShowLogoutModal(true)}>
          Logout
        </button>
      </aside>

     
      <main className="admin-main">
        <header className="admin-top-bar">
          <span className="role-label">Hospital Staff</span>
          <button className="top-logout" onClick={() => setShowLogoutModal(true)}>Logout</button>
        </header>
        <div className="admin-content-inner">
          {children}
        </div>
      </main>

    
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;