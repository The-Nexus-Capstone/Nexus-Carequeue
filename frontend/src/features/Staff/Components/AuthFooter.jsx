import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthFooter({ 
  text = "Already have an account?", 
  linkText = "Login", 
  linkPath = "/staff-login" 
}) {
  const navigate = useNavigate();
  return (
    <p className="auth-footer-text">
      {text} <span className="signup-trigger" onClick={() => navigate(linkPath)}>{linkText}</span>
    </p>
  );
}

export default AuthFooter;