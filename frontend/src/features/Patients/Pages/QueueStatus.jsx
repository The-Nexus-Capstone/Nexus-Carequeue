import React from 'react';
import BackButton from '../../../Shared/Components/BackButton';
import { useNavigate, useLocation } from "react-router-dom";

function QueueStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const {
    position       = '?',
    estimated_wait = 'Unknown',
    clinic         = 'Clinic',
    patient_name   = 'Patient',
    phone          = '',
    reason         = 'General Consultation',
    queue_id       = null,
  } = data;

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <BackButton />

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div style={{ fontSize: "4rem", color: "green" }}>✔</div>
        <h2>You're in the Queue</h2>
        {phone && (
          <p style={{ color: "#777" }}>
            Confirmation sent to {phone}
          </p>
        )}
      </div>

      <div style={{ marginTop: "2rem", padding: "2rem", background: "#f4f4f4", borderRadius: "10px" }}>
        <h3>Estimated wait time</h3>
        <h2>{estimated_wait}</h2>
        <p>You're currently <strong>#{position}</strong> in line</p>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <p><strong>Patient name:</strong> {patient_name}</p>
        <p><strong>Reason for visit:</strong> {reason}</p>
        <p><strong>Clinic:</strong> {clinic}</p>
      </div>

      <div style={{ marginTop: "1.5rem", background: "#e0e7ff", padding: "1rem", borderRadius: "8px", color: "#1e3a8a" }}>
        You'll receive an SMS 30 minutes before your turn. Please arrive at the clinic in time.
      </div>

      <button
        style={{ marginTop: "2rem", width: "100%", background: "#1565c0", color: "white", padding: "1rem", border: "none", borderRadius: "8px" }}
        onClick={() => navigate("/patient/view-queue", { state: data })}
      >
        View Queue
      </button>

      <button
        style={{ marginTop: "1rem", width: "100%", background: "transparent", border: "1px solid #1565c0", padding: "1rem", borderRadius: "8px" }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}

export default QueueStatus;
