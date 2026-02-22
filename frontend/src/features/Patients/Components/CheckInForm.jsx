import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../Shared/Components/BackButton";

function CheckInForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/patient/queue-status");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <BackButton />

      <h1 style={{ marginTop: "1rem" }}>Join Queue</h1>
      <p style={{ color: "#777" }}>
        Fill in your details to join the queue
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
            placeholder="Enter your full name"
            style={{ width: "100%", padding: "0.8rem" }}
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            placeholder="+234 812 345 6789"
            style={{ width: "100%", padding: "0.8rem" }}
          />
        </div>

        <div>
          <label>Reason for Visit</label>
          <select style={{ width: "100%", padding: "0.8rem" }}>
            <option>General Consultation</option>
            <option>Follow-up</option>
            <option>Vaccination</option>
          </select>
        </div>

        <div
          style={{
            background: "#fef3c7",
            padding: "1rem",
            borderRadius: "8px",
            color: "#92400e",
          }}
        >
          ⚠️ Please keep your phone nearby. We will send you an SMS when it is almost your turn.
        </div>

        <button
          type="submit"
          style={{
            background: "#1565c0",
            color: "white",
            padding: "1rem",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Complete Check In
        </button>
      </form>
    </div>
  );
}

export default CheckInForm;