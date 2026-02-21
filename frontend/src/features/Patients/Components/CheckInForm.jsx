import React from 'react';
import Input from '../../../Shared/Components/Input';
import Select from '../../../Shared/Components/Select';
import BackButton from '../../../Shared/Components/BackButton';
import { useNavigate } from "react-router-dom";

function CheckInForm() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/patient/queue-status");
  };

  return (
    <div 
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >

      {/* Back Button Top Left */}
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <BackButton />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#fff"
        }}
      >
        <h2 style={{ textAlign: "center" }}>Patient Check-In</h2>

        <Input label="Full Name" placeholder="Enter your full name" />
        <Input label="Phone" placeholder="Enter your phone number" />

        <Select
          label="Reason for Visit"
          options={['Consultation', 'Follow-up', 'Vaccination']}
        />

        <button type="submit">
          Complete Check In
        </button>

      </form>
    </div>
  );
}

export default CheckInForm;