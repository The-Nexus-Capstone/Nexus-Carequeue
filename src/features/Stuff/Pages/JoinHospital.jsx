import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, FaArrowLeft } from 'react-icons/fa';
import Branding from '../../../Shared/Components/Branding';
import BackButton from '../../../Shared/Components/BackButton';
import Input from '../../../Shared/Components/Input';
import Button from '../../../Shared/Components/Button';
import AuthFooter from '../Components/AuthFooter';
import './Auth.css';
import './JoinHospital.css'; 

function JoinHospital() {
  const navigate = useNavigate();
  const [view, setView] = useState('selection'); 
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  const handleContinue = () => {
    if (inviteCode.trim()) {
      setShowInvitePopup(true);
    } else if (selectedHospital) {
      setView('createAccount');
    } else {
      alert("Please enter an invite code or select a hospital.");
    }
  };

  if (view === 'createAccount') {
    return (
      <div className="auth-page">
        <BackButton onClick={() => setView('selection')} />
        <div className="auth-central-box">
          <Branding />
          <p className="auth-sub-label">Create Staff Account</p>
          <div className="auth-form">
            <Input label="Full Name" placeholder="Enter your full name" />
            <Input label="Work Email" placeholder="Enter your work email" />
            <div className="input-with-icon">
              <Input label="Password" type="password" placeholder="Enter your password" />
              <FaRegEyeSlash className="input-eye-icon" />
            </div>
            <div className="input-with-icon">
              <Input label="Confirm Password" type="password" placeholder="Confirm your password" />
              <FaRegEyeSlash className="input-eye-icon" />
            </div>
            <Button variant="primary" className="login-submit-btn" onClick={() => navigate('/staff-dashboard')}>
              Join Hospital
            </Button>
          </div>
          <AuthFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <BackButton onClick={() => navigate(-1)} />

      <div className="auth-central-box">
        <Branding />
        <p className="auth-sub-label">Join existing Hospital</p>

        <div className="auth-form">
          {/* Section 1: Invite Code */}
          <div className="join-section-box">
            <Input 
              label="Join with Hospital Invite Code" 
              placeholder="Enter invite code" 
              value={inviteCode}
              onChange={(e) => { 
                setInviteCode(e.target.value); 
                setSelectedHospital(''); 
              }}
            />
          </div>

          <div className="join-divider"><span>OR</span></div>

          {/* Section 2: Search */}
          <div className="join-section-box">
            <label className="input-label" style={{textAlign: 'left', display: 'block', fontWeight: '700', marginBottom: '8px'}}>Search for Hospital</label>
            <select 
              className="hospital-select"
              value={selectedHospital}
              onChange={(e) => { 
                setSelectedHospital(e.target.value); 
                setInviteCode(''); 
              }}
            >
              <option value="">Select a hospital</option>
              <option value="community-ikeja">Community Health Center, Ikeja</option>
              <option value="korle-bu">Korle Bu Teaching Hospital</option>
              <option value="kenyatta">Kenyatta National Hospital</option>
            </select>
          </div>

          <Button variant="primary" className="login-submit-btn" style={{marginTop: '20px'}} onClick={handleContinue}>
            Continue
          </Button>
          
          <p className="auth-footer-text" style={{marginTop: '15px'}}>
            Already have an account? <span className="signup-trigger" onClick={() => navigate('/staff-login')}>Login</span>
          </p>
        </div>

        <div className="auth-footer-wrapper">
          <AuthFooter /> 
        </div>
      </div>

      {showInvitePopup && (
        <div className="popup-overlay" onClick={() => setShowInvitePopup(false)}>
          <div className="popup-card invite-sent-card" onClick={e => e.stopPropagation()}>
            <h2 className="success-title">Invite Sent!</h2>
            <p className="invite-sent-text">
              An invite has been sent to the Hospital Admin. Once the invite is accepted, you'll be able to manage hospital queue.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinHospital;