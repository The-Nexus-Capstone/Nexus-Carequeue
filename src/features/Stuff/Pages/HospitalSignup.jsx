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
  const [formData, setFormData] = useState({
    hospitalName: '',
    adminEmail: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // For submission: Basic validation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Hospital Registered:", formData.hospitalName);
    // Navigate to dashboard after "registering"
    navigate('/staff-dashboard');
  };

  return (
    <div className="auth-page">
      <div className="back-link-container">
        <BackButton onClick={() => navigate(-1)} />
      </div>

      <div className="auth-central-box">
        <Branding />
        
        <div className="auth-header-group">
          <p className="auth-sub-label">Register Your Hospital</p>
          <p className="auth-description">Create a digital queue for your facility</p>
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
          <Input 
            label="Hospital Name" 
            placeholder="e.g. General Hospital, Lagos"
            value={formData.hospitalName}
            onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
            required
          />

          <Input 
            label="Official Work Email" 
            type="email"
            placeholder="admin@hospital.com"
            value={formData.adminEmail}
            onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
            required
          />

          <Input 
            label="Hospital Physical Address" 
            placeholder="Enter full address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />

          <div className="input-with-icon">
            <Input 
              label="Admin Password" 
              type="password" 
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            <FaRegEyeSlash className="input-eye-icon" />
          </div>

          <div className="input-with-icon">
            <Input 
              label="Confirm Password" 
              type="password" 
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
            <FaRegEyeSlash className="input-eye-icon" />
          </div>

          <Button variant="primary" type="submit" className="login-submit-btn">
            Create Hospital Account
          </Button>

          <p className="auth-footer-text">
            Already have an account? <span className="signup-trigger" onClick={() => navigate('/staff-login')}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}


export default HospitalSignup;