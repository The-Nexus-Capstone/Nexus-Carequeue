import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../../Shared/Components/BackButton";

function CheckInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const clinic = location.state?.clinic || null;

  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    reason: 'General Consultation',
  });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/queues/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: formData.patient_name,
          phone: formData.phone,
          reason: formData.reason,
          clinic_id: clinic?.id || 1,
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/patient/queue-status", { state: {
          queue_id:       data.queue_id,
          position:       data.position,
          estimated_wait: data.estimated_wait,
          clinic:         data.clinic,
          patient_name:   formData.patient_name,
          phone:          formData.phone,
          reason:         formData.reason,
        }});
      } else {
        alert(data.error || "Failed to join queue.");
        setLoading(false);
      }
    } catch (error) {
      alert("Cannot connect to backend.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <BackButton />

      <h1 style={{ marginTop: "1rem" }}>Join Queue</h1>
      <p style={{ color: "#777" }}>
        Fill in your details to join the queue
        {clinic && <strong> at {clinic.name}</strong>}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "2rem",
          background: "#f4f4f4",
          padding: "2rem",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div>
          <label>Full Name</label>
          <input
            required
            placeholder="Enter your full name"
            value={formData.patient_name}
            onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
            style={{ width: "100%", padding: "0.8rem" }}
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            required
            placeholder="+234 812 345 6789"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            style={{ width: "100%", padding: "0.8rem" }}
          />
        </div>

        <div>
          <label>Reason for Visit</label>
          <select
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            style={{ width: "100%", padding: "0.8rem" }}
          >
            <option>General Consultation</option>
            <option>Follow-up</option>
            <option>Vaccination</option>
          </select>
        </div>

        <div style={{ background: "#fef3c7", padding: "1rem", borderRadius: "8px", color: "#92400e" }}>
          Please keep your phone nearby. We will send you an SMS when it is almost your turn.
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#999" : "#1565c0",
            color: "white",
            padding: "1rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Joining queue..." : "Complete Check In"}
        </button>
      </form>
    </div>
  );
}

export default CheckInForm;
