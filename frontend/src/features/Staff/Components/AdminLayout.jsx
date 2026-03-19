/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Branding from '../../../Shared/Components/Branding';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import '../Pages/AdminLayout.css';

const AdminLayout = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="admin-container">
      <header className="admin-top-bar">
        <div className="top-bar-left-wrapper">
          <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="branding-container">
            <Branding showTagline={true} />
          </div>
        </div>
        
        <div className="top-bar-right desktop-only">
          <span className="role-label">Hospital Staff</span>
          <button className="top-logout-link" onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-layout-body">
        <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-mobile-header mobile-only">
             <span className="role-label">Hospital Staff</span>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => { 
                navigate('/admin/dashboard'); 
                setIsMobileMenuOpen(false); 
              }}
            >
              Dashboard
            </button>
            
            <button 
              className={`nav-btn ${activeTab === 'queue' ? 'active' : ''}`}
              onClick={() => { 
                navigate('/admin/queue-management'); 
                setIsMobileMenuOpen(false); 
              }}
            >
              Queue Management
            </button>
          </nav>

          <button className="sidebar-bottom-logout mobile-only" onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </aside>

        <main className="admin-main-content">
          <div className="admin-content-inner">
            {children}
          </div>
        </main>
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal-card">
            <h3>Are you sure you want to logout?</h3>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button className="modal-logout-btn" onClick={() => navigate('/')}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;