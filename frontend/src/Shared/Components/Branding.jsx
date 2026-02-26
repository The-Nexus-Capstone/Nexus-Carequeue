import React from 'react';
import { FaRegHeart } from 'react-icons/fa';

const Branding = ({ showTagline = true }) => {
  return (
    <div className="brand-header-inline">
      <div className="brand-icon-box">
        <FaRegHeart />
      </div>
      <div className="brand-text-stack">
        <h1>CareQueue</h1>
        {showTagline && <p>Smart clinic access for everyone.</p>}
      </div>
    </div>
  );
};

export default Branding;