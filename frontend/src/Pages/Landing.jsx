import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import heroImg from "../assets/hero.png";
import { 
  FaClock, 
  FaMapMarkerAlt, 
  FaSmile, 
  FaClipboardList, 
  FaUserMd, 
  FaRegHeart 
} from "react-icons/fa";

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Navigation Header */}
      <div className="nav-wrapper">
        <header className="navbar">
          <div className="nav-container">
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>

            <div className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
              <div className="logo-icon">
                <FaRegHeart />
              </div>
              <div className="logo-text">
                <h3>CareQueue</h3>
                <span>Smart clinic access for everyone.</span>
              </div>
            </div>

            <nav className="nav-links">
              <button className="nav-btn active">Home</button>
            
              <button className="nav-btn outline" onClick={() => navigate("/queue-status")}>
                Queue Status
              </button>
            
              <button className="nav-btn outline" onClick={() => navigate("/staff-dashbord")}>
                Staff dashboard
              </button>
            </nav>
          </div>
        </header>

     
        {menuOpen && (
          <div className="mobile-menu">
            <button className="nav-btn active">Home</button>
            <button className="nav-btn outline" onClick={() => navigate("/queue-status")}>
              Queue Status
            </button>
            <button className="nav-btn outline" onClick={() => navigate("/staff-login")}>
              Staff Login
            </button>
          </div>
        )}
      </div>

  
      <section className="hero-section">
        <img src={heroImg} alt="Clinic" className="hero-img" />
        <div className="hero-overlay">
          <h1>Welcome to CareQueue</h1>
          <p>
            Skip the line. 
            <span 
              className="hero-link" 
              onClick={() => navigate("/patient/checkin")}
              style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
            >
              Check in from anywhere.
            </span>
            <br />
            Get real-time updates on your queue position.
          </p>
        </div>
      </section>

     
      <section className="action-section">
     
        <div className="action-card">
          <div className="action-cardinfo">
            <div className="card-icon blue">
              <FaClipboardList />
            </div>
            <h3>Patient Check-In</h3>
          </div>
          <p>
            Join the queue for your clinic visit.
            Quick and easy registration.
          </p>
          <button 
            className="primary-btn" 
            onClick={() => navigate("/patient/checkin")}
          >
            Check-In
          </button>
        </div>

       
        <div className="action-card">
          <div className="action-cardinfo">
            <div className="card-icon green">
              <FaUserMd />
            </div>
            <h3>Staff Portal</h3>
          </div>
          <p>
            Authorized staff only. Login to 
            manage clinic queues and patients.
          </p>
          <button 
            className="secondary-btn" 
            onClick={() => navigate("/staff-login")}
          >
            Staff Login
          </button>
        </div>
      </section>

    
      <section className="why-section">
        <h2>Why CareQueue?</h2>
        <div className="why-grid">
          <div className="why-item">
            <div className="circle blue"><FaClock /></div>
            <h4>Save Time</h4>
            <p>No more waiting in crowded rooms. Check in from anywhere.</p>
          </div>
          <div className="why-item">
            <div className="circle green"><FaMapMarkerAlt /></div>
            <h4>Real-Time Updates</h4>
            <p>Get notified when it's your turn. Track your queue position live.</p>
          </div>
          <div className="why-item">
            <div className="circle orange"><FaSmile /></div>
            <h4>Better Care</h4>
            <p>Organized queues mean better service and happier patients.</p>
          </div>
        </div>

        <footer className="footer">
          <p>
            CareQueue – Making healthcare accessible for everyone.
            <br />
            Optimized for low data connections
          </p>
          <span>© 2026</span>
        </footer>
      </section>
    </div>
  );
}

export default Landing;