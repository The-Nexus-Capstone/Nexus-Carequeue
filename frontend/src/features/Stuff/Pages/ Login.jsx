import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import './Auth.css'; 
import Card from '../../../Shared/Components/Card';
import Input from '../../../Shared/Components/Input';
import Button from '../../../Shared/Components/Button';

function StaffLogin() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [loginData, setLoginData] = useState({ inviteCode: '', identifier: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // Trim checks for "empty spaces"
    const invite = loginData.inviteCode.trim();
    const user = loginData.identifier.trim();
    const pass = loginData.password.trim();

    if (!invite && (!user || !pass)) {
      alert("Please enter valid login details.");
      return;
    }
    console.log("Login Success");
  };

  return (
    <div className="auth-page">
      <div className="auth-central-box">
        {/* Header: Logo and Title on the same line */}
        <div className="brand-header-inline">
          <div className="brand-icon-box"><FaRegHeart /></div>
          <div className="brand-text-stack">
             <h1>CareQueue</h1>
             <p>Smart clinic access for everyone.</p>
          </div>
        </div>
        
        <p className="auth-sub-label">Staff Login</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <Input 
            label="Login with Hospital Invite Code" 
            placeholder="Enter invite code"
            value={loginData.inviteCode}
            onChange={(e) => setLoginData({...loginData, inviteCode: e.target.value})}
          />
          
          <div className="auth-divider"><span>OR</span></div>

          <Card>
            <Input 
              label="Full Name or Work Email" 
              placeholder="Enter your full name or work email"
              value={loginData.identifier}
              onChange={(e) => setLoginData({...loginData, identifier: e.target.value})}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
          </Card>

          <Button variant="primary" type="submit">Login</Button>
          
          {/* Made "Sign Up" clickable and bold */}
          <p className="auth-footer-text">
            Don't have an account? <span className="signup-trigger" onClick={() => setShowPopup(true)}>Sign Up</span>
          </p>
        </form>
      </div>

      {/* POPUP IMPLEMENTATION */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={e => e.stopPropagation()}>
            <h3>How do you want to Sign up?</h3>
            <Button variant="primary" onClick={() => navigate('/hospital-signup')}>Sign up a new hospital</Button>
            <Button variant="outline" onClick={() => navigate('/join-hospital')}>Join an existing hospital</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffLogin;