import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaCopy, FaArrowLeft, FaRegEyeSlash } from 'react-icons/fa';
import Input from '../../../Shared/Components/Input';
import Button from '../../../Shared/Components/Button';
import './Auth.css';
import AuthFooter from '../Components/AuthFooter';
import BackButton from '../../../Shared/Components/BackButton';

function HospitalSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

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
        
        <p className="auth-sub-label">Hospital Sign up</p>

        {step === 1 ? (
          <div className="auth-form">
            <Input label="Full Name" placeholder="Enter your full name" />
            <Input label="Work Email" placeholder="Enter your work email" />
            {/* Added relative wrapper for the eye icon */}
            <div className="input-with-icon">
              <Input label="Password" type="password" placeholder="Enter your password" />
              <FaRegEyeSlash className="input-eye-icon" />
            </div>
            <div className="input-with-icon">
              <Input label="Confirm Password" type="password" placeholder="Confirm your password" />
              <FaRegEyeSlash className="input-eye-icon" />
            </div>
            
            <Button className="login-submit-btn" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        ) : (
          <div className="auth-form">
            <Input label="Hospital Name" placeholder="Enter the hospital name" />
            <Input label="Hospital Type" placeholder="Clinic, General, Teaching, etc." />
            <Input label="Location" placeholder="Enter the hospital location (City & State)" />
            <Input label="Hospital Contact Number (Optional)" placeholder="Enter the hospital contact number" />
            
            <Button className="login-submit-btn" onClick={() => setShowSuccess(true)}>
              Sign up hospital
            </Button>
          </div>
        )}

        <p className="auth-footer-text">
                  <AuthFooter /> </p>
      </div>

      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup-card success-card">
            <h2 className="success-title">Your hospital has been created.</h2>
            <p className="success-subtitle">You can now invite staff to manage.</p>
            
            <div className="invite-code-box">
              <span>Invite Code: 823454KB</span>
              <FaCopy className="copy-icon" onClick={() => {
                navigator.clipboard.writeText("823454KB");
                alert("Code copied!");
              }} />
            </div>

            <div className="popup-actions">
              <Button className="btn-solid-blue">Invite Staff</Button>
              <Button className="btn-outline-blue" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalSignup;