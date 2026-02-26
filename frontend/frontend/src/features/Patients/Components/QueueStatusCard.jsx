// Patients/components/QueueStatusCard.jsx
import React from 'react';

function QueueStatusCard({ status = 'Not Busy', waiting = 0, waitTime = '0 mins' }) {
  return (
    <div className="queue-status-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      textAlign: 'center',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      {/* Clinic status badge */}
      <span className="status-badge" style={{
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        backgroundColor: status === 'Busy' ? '#f8d7da' : '#d4edda',
        color: status === 'Busy' ? '#721c24' : '#155724',
        marginBottom: '0.5rem'
      }}>
        {status}
      </span>

      {/* People waiting */}
      <p>{waiting} people waiting</p>

      {/* Estimated wait time */}
      <p>Estimated wait: {waitTime}</p>
    </div>
  );
}

export default QueueStatusCard;
