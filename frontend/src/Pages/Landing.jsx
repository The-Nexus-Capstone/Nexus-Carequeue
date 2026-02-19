import { useState } from "react";
import "./Landing.css";
import heroImg from "../assets/hero.png";
 import { FaClock, FaMapMarkerAlt, FaSmile } from "react-icons/fa";
 import { FaClipboardList, FaUserMd } from "react-icons/fa";
 import { FaRegHeart } from 'react-icons/fa';
 import { useNavigate } from "react-router-dom";




function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="landing">

      
      <div className="nav-wrapper">
  <header className="navbar">
    <div className="nav-container">
      {/* Hamburger only shows on small screens */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className="logo">
        <div className="logo-icon">
          <FaRegHeart /> 
        </div>
        <div className="logo-text">
          <h3>CareQueue</h3>
          <span>Smart clinic access for everyone.</span>
        </div>
      </div>

      {/* Desktop Links: Home is blue, others are outlined */}
      <nav className="nav-links">
        <button className="nav-btn active">Home</button>
        <button className="nav-btn outline">Queue Status</button>
        <button className="nav-btn outline">Staff Dashboard</button>
      </nav>
    </div>
  </header>

  {/* Mobile Dropdown: Visible when menuOpen is true */}
  {menuOpen && (
    <div className="mobile-menu">
      <button className="nav-btn active">Home</button>
      <button className="nav-btn outline">Queue Status</button>
      <button className="nav-btn outline">Staff Dashboard</button>
    </div>
  )}
</div>

      
      <section className="hero-section">
        <img src={heroImg} alt="Clinic" className="hero-img" />

        <div className="hero-overlay">
          <h1>Welcome to CareQueue</h1>
          <p>
            Skip the line. Check in from anywhere.
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
   <h3>Staff Dashboard</h3>
   </div>
 
  <p>
    Manage clinic queue, call patients,
    and track daily operations.
  </p>
  <button className="secondary-btn">Staff Login</button>
</div>


      </section>

    
      <section className="why-section">

        <h2>Why CareQueue?</h2>

        <div className="why-grid">

         <div className="why-item">
  <div className="circle blue">
    <FaClock />
  </div>
  <h4>Save Time</h4>
  <p>
    No more waiting in crowded rooms.
    Check in from anywhere.
  </p>
</div>

<div className="why-item">
  <div className="circle green">
    <FaMapMarkerAlt />
  </div>
  <h4>Real-Time Updates</h4>
  <p>
    Get notified when it's your turn.
    Track your queue position live.
  </p>
</div>

<div className="why-item">
  <div className="circle orange">
    <FaSmile />
  </div>
  <h4>Better Care</h4>
  <p>
    Organized queues mean better service
    and happier patients.
  </p>
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
