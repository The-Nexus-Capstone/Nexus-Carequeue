import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold"
      }}
    >
      ← Back
    </button>
  );
}

export default BackButton;