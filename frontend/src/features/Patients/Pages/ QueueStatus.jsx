// Patients/pages/QueueStatus.jsx
import React from 'react';
// Shared components
import BackButton from '../../shared/BackButton';
import Button from '../../shared/Button';
// Feature components
import QueueStatusCard from '../components/QueueStatusCard';

// You can replace this with props or state later
const patientInfo = {
  name: 'Alice Johnson',
  reason: 'Consultation',
  clinic: 'Clinic A',
};

function QueueStatus() {
  return (
    <div className="queue-status-page">
      {/* Back button */}
      <BackButton />

      {/* Big check/tick icon in the center */}
      <div className="queue-status-icon" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <span style={{ fontSize: '4rem', color: 'green' }}>✔️</span>
      </div>

      {/* Heading */}
      <h2 style={{ textAlign: 'center' }}>You’re in the queue</h2>

      {/* Queue status card showing estimated wait time */}
      <QueueStatusCard
        status="Busy"
        waiting={5}
        waitTime="20 mins"
      />

      {/* Patient information */}
      <div className="patient-info" style={{ margin: '1rem 0' }}>
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Reason for Visit:</strong> {patientInfo.reason}</p>
        <p><strong>Clinic:</strong> {patientInfo.clinic}</p>
      </div>

      {/* Action buttons */}
      <div className="queue-status-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button>View Queue</Button>
        <Button variant="secondary">Back to Home</Button>
      </div>
    </div>
  );
}

export default QueueStatus;
