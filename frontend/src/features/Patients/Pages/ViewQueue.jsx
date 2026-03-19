import React from "react";
import BackButton from "../../../Shared/Components/BackButton";
import { useLocation } from "react-router-dom";

function ViewQueue() {
  const location = useLocation();
  const data = location.state || {};

  const {
    position       = '?',
    estimated_wait = 'Unknown',
    clinic         = 'Clinic',
    patient_name   = 'Patient',
    reason         = 'General Consultation',
  } = data;

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "2rem" }}>
      <BackButton />

      <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "1.5rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>Queue Status</h1>
        <p style={{ color: "#777", marginBottom: "2rem" }}>Live updates on your position</p>

        <div style={{ backgroundColor: "#f6d7b0", color: "#9a5b00", padding: "1rem", borderRadius: "8px", marginBottom: "2.5rem" }}>
          <strong>You're in the queue!</strong>
          <div style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
            You'll receive an SMS 30 minutes before your turn.
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "70px", height: "70px", borderRadius: "50%", border: "6px solid #d97706", margin: "0 auto", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "#d97706" }}>
            ⏰
          </div>
          <h2 style={{ marginBottom: "0.5rem" }}>Waiting in the Queue</h2>
          <p style={{ color: "#777" }}>
            Position in line <span style={{ color: "#2563eb", fontWeight: "600" }}>#{position}</span>
          </p>
        </div>

        <div style={{ backgroundColor: "white", padding: "1.8rem", borderRadius: "10px", textAlign: "center", marginBottom: "2.5rem" }}>
          <h3 style={{ marginBottom: "0.8rem", color: "#555" }}>Estimated wait time</h3>
          <h2 style={{ marginBottom: "0.5rem" }}>{estimated_wait}</h2>
          <p style={{ fontSize: "0.9rem", color: "#888" }}>This time may change based on queue movement</p>
        </div>

        <div style={{ display: "grid", rowGap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#777" }}>Patient name:</span>
            <strong>{patient_name}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#777" }}>Reason for visit:</span>
            <strong>{reason}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#777" }}>Clinic:</span>
            <strong>{clinic}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewQueue;
