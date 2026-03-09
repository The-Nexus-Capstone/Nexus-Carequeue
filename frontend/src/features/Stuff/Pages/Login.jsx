import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import Branding from '../../../Shared/Components/Branding';
import BackButton from '../../../Shared/Components/BackButton';
import Input from '../../../Shared/Components/Input';
import Button from '../../../Shared/Components/Button';
import Card from '../../../Shared/Components/Card';
import './Auth.css';

function StaffLogin() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [loginData, setLoginData] = useState({ 
    inviteCode: '', 
    identifier: '', 
    password: '' 
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const payload = {
      invite_code: loginData.inviteCode.trim(),
      email: loginData.identifier.trim(), 
      password: loginData.password.trim()
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        const userData = {
          ...data.user,
          fullName: data.user.name, 
          hospital_name: data.user.hospital || data.user.hospital_name || "Nexus Clinic"
        };
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/admin/dashboard'); 
      } else {
        alert(data.error || data.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Cannot connect to backend. Is the Python server running on port 5000?");
    }
  };

  return (
    <div className="auth-page">
      <BackButton onClick={() => navigate(-1)} />

      <div className="auth-central-box">
        <Branding />
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
              label="Work Email" 
              placeholder="Enter your work email"
              value={loginData.identifier}
              onChange={(e) => setLoginData({...loginData, identifier: e.target.value})}
              required
            />
            
            <div className="password-input-wrapper" style={{ position: 'relative' }}>
              <Input 
                label="Password"  
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <span 
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '60%', 
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#666',
                  zIndex: 10
                }}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </Card>

          <Button variant="primary" type="submit" className="login-submit-btn">
            Login
          </Button>
          
          <p className="auth-footer-text">
            Don't have an account? <span className="signup-trigger" onClick={() => setShowPopup(true)}>Sign Up</span>
          </p>
        </form>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={e => e.stopPropagation()}>
            <h2 className="popup-title">How do you want to Sign up?</h2>
            <div className="popup-actions">
              <Button 
                className="btn-solid-blue" 
                onClick={() => {
                  setShowPopup(false); 
                  navigate('/hospital-signup'); 
                }}
              >
                Sign up a new hospital
              </Button>
              <button 
                className="popup-btn outline-blue"
                onClick={() => {
                  setShowPopup(false);
                  navigate('/join-hospital');
                }}
              >
                Join an existing hospital
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffLogin;
