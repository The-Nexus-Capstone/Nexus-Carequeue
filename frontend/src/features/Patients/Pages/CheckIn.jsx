import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../Shared/Components/BackButton";
import Button from "../../../Shared/Components/Button";

function CheckIn() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <BackButton />

      <h1 style={{ marginTop: "1rem" }}>Patients Check-In</h1>
      <p style={{ color: "#777" }}>
        Choose a clinic, view their status, and join the queue
      </p>

      {/* Clinic */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Community Health Center, Ikeja ⌄</h3>
        <p style={{ color: "#777" }}>📍 Ikeja, Lagos</p>
      </div>

      {/* Status Card */}
      <div
        style={{
          marginTop: "2rem",
          padding: "2rem",
          background: "#f4f4f4",
          borderRadius: "10px",
        }}
      >
        <h2>Current Status</h2>

        <div
          style={{
            background: "#cde9df",
            display: "inline-block",
            padding: "0.5rem 1.5rem",
            borderRadius: "20px",
            marginTop: "1rem",
            color: "#0f766e",
            fontWeight: "600",
          }}
        >
          Not Busy
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h3>People Waiting</h3>
          <h2>2 People</h2>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <h3>Expected Wait Time</h3>
          <h2>53 minutes</h2>
        </div>
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          background: "#e0e7ff",
          padding: "1rem",
          borderRadius: "8px",
          color: "#1e3a8a",
        }}
      >
        Join the queue now and go about your day. We will notify you when it is almost your turn.
      </div>

      <Button
        style={{ marginTop: "2rem", width: "100%" }}
        onClick={() => navigate("/patient/checkin/form")}
      >
        Join Queue
      </Button>
    </div>
  );
}

export default CheckIn;