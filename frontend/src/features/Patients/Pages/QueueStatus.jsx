// Patients/pages/QueueStatus.jsx
import React from 'react';
import BackButton from '../../../Shared/Components/BackButton';
import Button from '../../../Shared/Components/Button';
import QueueStatusCard from '../Components/QueueStatusCard';
import { useNavigate } from "react-router-dom";

const patientInfo = {
  name: 'Alice Johnson',
  reason: 'Consultation',
  clinic: 'Clinic A',
};

function QueueStatus() {

  const navigate = useNavigate(); 

  return (
    <div className="queue-status-page">
      <BackButton />

      <div className="queue-status-icon" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <span style={{ fontSize: '4rem', color: 'green' }}>✔️</span>
      </div>

      <h2 style={{ textAlign: 'center' }}>You’re in the queue</h2>

      <QueueStatusCard
        status="Busy"
        waiting={5}
        waitTime="20 mins"
      />

      <div className="patient-info" style={{ margin: '1rem 0' }}>
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Reason for Visit:</strong> {patientInfo.reason}</p>
        <p><strong>Clinic:</strong> {patientInfo.clinic}</p>
      </div>

      <div className="queue-status-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        <Button onClick={() => navigate("/patient/view-queue")}>
  View Queue
</Button>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Home
        </Button>

      </div>
    </div>
  );
}

export default QueueStatus;
