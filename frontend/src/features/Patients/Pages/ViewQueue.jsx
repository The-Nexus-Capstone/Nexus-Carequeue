import React from "react";
import BackButton from "../../../Shared/Components/BackButton";

function ViewQueue() {
  return (
    <div className="queue-page">
      <BackButton />

      <h1>Waiting in Queue</h1>

      {/* Queue Status Section */}
      <div className="queue-status-card" style={{
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "2rem"
      }}>
        <h2>Queue Position</h2>
        <p><strong>12th</strong> in line</p>

        <h3>Estimated Waiting Time</h3>
        <p>45 minutes</p>
      </div>

      {/* Patient Details Card */}
      <div className="patient-card" style={{
        padding: "1.5rem",
        border: "1px solid #ddd",
        borderRadius: "8px"
      }}>
        <h3>Patient Details</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Reason:</strong> General Consultation</p>
        <p><strong>Clinic:</strong> Community Health Center, Ikeja</p>
      </div>
    </div>
  );
}

export default ViewQueue;