import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaArrowLeft, FaRegEyeSlash } from 'react-icons/fa';
import './JoinHospital.css';
import Input from "../../../Shared/Components/Input";
import Button from "../../../Shared/Components/Button";
import AuthFooter from "../Components/AuthFooter";
import BackButton from "../../../Shared/Components/BackButton";

function JoinHospital() {
  const navigate = useNavigate();
  const [view, setView] = useState('selection'); // 'selection' or 'createAccount'
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');

  const handleContinue = () => {
    if (inviteCode) {
      // Logic for 1st Option: Show Invite Sent Popup
      setShowInvitePopup(true);
    } else if (selectedHospital) {
      // Logic for 2nd Option: Move to Account Creation
      setView('createAccount');
    }
  };

  if (view === 'createAccount') {
    return (
      <div className="auth-page">
        <button className="back-link" onClick={() => setView('selection')}>
         <BackButton />
        </button>
        <div className="auth-central-box">
          <div className="brand-header-inline">
            <div className="brand-icon-box"><FaRegHeart /></div>
            <div className="brand-text-stack">
               <h1>CareQueue</h1>
               <p>Smart clinic access for everyone.</p>
            </div>
          </div>
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
            <Button className="login-submit-btn" onClick={() => navigate('/dashboard')}>
              Join Hospital
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="auth-central-box">
        <div className="brand-header-inline">
          <div className="brand-icon-box"><FaRegHeart /></div>
          <div className="brand-text-stack">
             <h1>CareQueue</h1>
             <p>Smart clinic access for everyone.</p>
          </div>
        </div>
        <p className="auth-sub-label">Join existing Hospital</p>

        <div className="auth-form">
          <div className="join-section-box">
            <Input 
              label="Join with Hospital Invite Code" 
              placeholder="Enter invite code" 
              value={inviteCode}
              onChange={(e) => { setInviteCode(e.target.value); setSelectedHospital(''); }}
            />
          </div>

          <div className="join-divider"><span>OR</span></div>

          <div className="join-section-box">
            <label className="input-label">Search for Hospital</label>
            <select 
              className="hospital-select"
              value={selectedHospital}
              onChange={(e) => { setSelectedHospital(e.target.value); setInviteCode(''); }}
            >
              <option value="">Select a hospital</option>
              <option value="community">Community Health Center, Ikeja</option>
            </select>
          </div>

          <Button className="login-submit-btn" onClick={handleContinue}>
            Continue
          </Button>

        </div>
         <p className="auth-footer-text">
                  <AuthFooter /> </p>
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