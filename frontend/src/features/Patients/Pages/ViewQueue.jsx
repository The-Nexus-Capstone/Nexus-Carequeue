import React from "react";
import BackButton from "../../../Shared/Components/BackButton";

function ViewQueue() {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "2rem"
      }}
    >
      <BackButton />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: "1.5rem"
        }}
      >
        {/* Title */}
        <h1 style={{ marginBottom: "0.5rem" }}>Queue Status</h1>
        <p style={{ color: "#777", marginBottom: "2rem" }}>
          Live updates on your position
        </p>

        {/* Orange Alert Banner */}
        <div
          style={{
            backgroundColor: "#f6d7b0",
            color: "#9a5b00",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2.5rem"
          }}
        >
          <strong>You’re in the queue!</strong>
          <div style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
            You’ll receive an SMS 30 minutes before your turn.
          </div>
        </div>

        {/* Center Section */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          {/* Circle Icon */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "6px solid #d97706",
              margin: "0 auto",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: "#d97706"
            }}
          >
            ⏰
          </div>

          <h2 style={{ marginBottom: "0.5rem" }}>Waiting in the Queue</h2>

          <p style={{ color: "#777" }}>
            Position in line{" "}
            <span style={{ color: "#2563eb", fontWeight: "600" }}>#12</span>.
            Total in Queue{" "}
            <span style={{ color: "#2563eb", fontWeight: "600" }}>28</span>
          </p>
        </div>

        {/* Estimated Wait Card */}
        <div
          style={{
            backgroundColor: "white",
            padding: "1.8rem",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            textAlign: "center",
            marginBottom: "2.5rem"
          }}
        >
          <h3 style={{ marginBottom: "0.8rem", color: "#555" }}>
            Estimated wait time
          </h3>
          <h2 style={{ marginBottom: "0.5rem" }}>1 hour</h2>
          <p style={{ fontSize: "0.9rem", color: "#888" }}>
            This time may change based on queue movement
          </p>
        </div>

        {/* Patient Details */}
        <div style={{ display: "grid", rowGap: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#777" }}>Patient name:</span>
            <strong>John Doe</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#777" }}>Reason for visit:</span>
            <strong>General consultation</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#777" }}>Clinic:</span>
            <strong>Community Health Center, Ikeja</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewQueue;