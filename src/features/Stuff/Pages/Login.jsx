import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import './Auth.css'; 
import Card from '../../../Shared/Components/Card';
import Input from '../../../Shared/Components/Input';
import Button from '../../../Shared/Components/Button';
import BackButton from '../../../Shared/Components/BackButton';

function StaffLogin() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [loginData, setLoginData] = useState({ inviteCode: '', identifier: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
   
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
      <BackButton onClick={() => setView('selection')} />


      <div className="auth-central-box">
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
            <Input label="Password"  type="password" placeholder="Enter your password" value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
          </Card>

          <Button variant="primary" type="submit" className="login-submit-btn">Login</Button>
          
          
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
          onClick={() => navigate('/join-hospital')}
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