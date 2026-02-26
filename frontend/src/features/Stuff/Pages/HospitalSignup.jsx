import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import Input from '../../../Shared/Components/Input';
import Button from '../../../Shared/Components/Button';
import './Auth.css';
import AuthFooter from '../Components/AuthFooter';
import BackButton from '../../../Shared/Components/BackButton';
import Branding from '../../../Shared/Components/Branding';

function HospitalSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // States for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '', 
    workEmail: '',
    password: '',
    confirmPassword: '',
    hospitalName: '', 
    hospitalType: '',
    location: '',
    contactNumber: ''
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2); 
  };

  const handleFinalSignup = (e) => {
    e.preventDefault();
    setShowSuccessPopup(true);
  };

  // Centralized back navigation
  const goBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="auth-page">
      {/* Positioned outside the box for consistency */}
      <BackButton onClick={goBack} />

      <div className="auth-central-box">
        <Branding />
        <p className="auth-sub-label">Hospital Sign up</p>

        {step === 1 ? (
          /* --- STEP 1: PERSONAL DETAILS --- */
          <form className="auth-form" onSubmit={handleNext}>
            <Input 
              label="Full Name" 
              placeholder="Enter your full name" 
              value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
              required 
            />
            <Input 
              label="Work Email" 
              placeholder="Enter your work email" 
              value={formData.workEmail} 
              onChange={(e) => setFormData({...formData, workEmail: e.target.value})} 
              required 
            />
            
            {/* Password with Toggle */}
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Input 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
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
                  color: '#666'
                }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            {/* Confirm Password with Toggle */}
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Input 
                label="Confirm Password" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm your password" 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                required 
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
                  color: '#666'
                }}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            <Button variant="primary" type="submit" className="login-submit-btn">
              Continue
            </Button>
            {/* The duplicate footer link was removed from here */}
          </form>
        ) : (
          /* --- STEP 2: HOSPITAL DETAILS --- */
          <form className="auth-form" onSubmit={handleFinalSignup}>
            <Input 
              label="Hospital Name" 
              placeholder="Enter the hospital name" 
              value={formData.hospitalName} 
              onChange={(e) => setFormData({...formData, hospitalName: e.target.value})} 
              required 
            />
            <Input 
              label="Hospital Type" 
              placeholder="e.g Clinic, General Hospital" 
              value={formData.hospitalType} 
              onChange={(e) => setFormData({...formData, hospitalType: e.target.value})} 
              required 
            />
            <Input 
              label="Location" 
              placeholder="Enter the hospital location (City & State)" 
              value={formData.location} 
              onChange={(e) => setFormData({...formData, location: e.target.value})} 
              required 
            />
            <Input 
              label="Hospital Contact Number (Optional)" 
              placeholder="Enter the hospital contact number" 
              value={formData.contactNumber} 
              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} 
            />
            
            <Button variant="primary" type="submit" className="login-submit-btn">
              Sign up hospital
            </Button>
          </form>
        )}

        {/* Global Footer handles the "Login" link for both steps */}
        <div className="auth-footer-wrapper">
          <AuthFooter /> 
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-card hospital-success-card">
            <h2 className="popup-title-bold">Your hospital has been created.</h2>
            <p className="popup-subtitle">You can now invite staff to manage.</p>
            
            <div className="invite-code-display">
              <span>Invite Code: 823454KB</span>
              <button 
                className="copy-btn-icon" 
                onClick={() => navigator.clipboard.writeText('823454KB')}
              >
                <FaCopy />
              </button>
            </div>

            <div className="popup-vertical-actions">
              <Button 
                className="btn-solid-blue" 
                onClick={() => navigate('/staff-dashboard')}
              >
                Invite Staff
              </Button>
               <button className="nav-btn outline" onClick={() => navigate("/admin/dashboard")}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HospitalSignup;