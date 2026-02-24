import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye, FaArrowLeft } from 'react-icons/fa'; // Added FaRegEye
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

  // States for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            
            {/* Password Field with Eye Toggle */}
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Input 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
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
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            {/* Confirm Password Field with Eye Toggle */}
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Input 
                label="Confirm Password" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm your password" 
              />
              <span 
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '60%', 
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
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

          <div className="join-section-box">
            <label className="join-input-label">Search for Hospital</label>
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

          <Button variant="primary" className="login-submit-btn" onClick={handleContinue}>
            Continue
          </Button>
        </div>

        <AuthFooter /> 
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