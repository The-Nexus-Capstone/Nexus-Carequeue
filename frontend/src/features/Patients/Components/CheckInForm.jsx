// Patients/components/CheckInForm.jsx
import React from 'react';
import Input from '../../../Shared/Components/Input';
import Select from '../../../Shared/Components/Select';
import { useNavigate } from "react-router-dom";

function CheckInForm() {

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    navigate("/patient/queue-status");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="checkin-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <Input label="Full Name" placeholder="Enter your full name" />
      <Input label="Phone" placeholder="Enter your phone number" />

      <Select
        label="Reason for Visit"
        options={['Consultation', 'Follow-up', 'Vaccination']}
      />

      <button type="submit">
        Complete checkIn
      </button>
    </form>
  );
}

export default CheckInForm;