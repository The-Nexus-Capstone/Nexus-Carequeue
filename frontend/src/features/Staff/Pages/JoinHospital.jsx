import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
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
  const [hospitals, setHospitals] = useState([]); // Real hospitals from DB

  // Create Account States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    password: '',
    confirmPassword: ''
  });

  // Fetch real hospitals when page loads
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/hospitals/`)
      .then(res => res.json())
      .then(data => setHospitals(data))
      .catch(err => console.log("Using fallback hospitals"));
  }, []);

  const handleContinue = () => {
    if (inviteCode.trim()) {
      // In a real app, you'd verify the code with the backend here
      setShowInvitePopup(true);
    } else if (selectedHospital) {
      setView('createAccount');
    } else {
      alert("Please enter an invite code or select a hospital.");
    }
  };

  const handleJoinHospital = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const hospitalId = selectedHospital.split('|')[0];
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/auth/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.workEmail,
          password: formData.password,
          hospital_id: parseInt(hospitalId),
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify({
          ...data.user,
          fullName: data.user.name,
        }));
        navigate("/admin/dashboard");
      } else {
        alert(data.error || "Failed to join hospital.");
      }
    } catch (error) {
      alert("Cannot connect to backend.");
    }
  };

  if (view === 'createAccount') {
    return (
      <div className="auth-page">
        <BackButton onClick={() => setView('selection')} />
        <div className="auth-central-box">
          <Branding />
          <p className="auth-sub-label">Create Staff Account</p>
          <form className="auth-form" onSubmit={handleJoinHospital}>
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
                style={{ position: 'absolute', right: '15px', top: '60%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

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
                style={{ position: 'absolute', right: '15px', top: '60%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666' }}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>

            <Button variant="primary" type="submit" className="login-submit-btn">
               Join Hospital
            </Button>
          </form>
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
              {hospitals.length > 0 ? (
                hospitals.map(h => (
                  <option key={h.id} value={`${h.id}|${h.name}`}>{h.name}</option>
                ))
              ) : (
                <>
                  <option value="1|Community Health Center, Ikeja">Community Health Center, Ikeja</option>
                  <option value="2|Korle Bu Teaching Hospital">Korle Bu Teaching Hospital</option>
                </>
              )}
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
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinHospital;