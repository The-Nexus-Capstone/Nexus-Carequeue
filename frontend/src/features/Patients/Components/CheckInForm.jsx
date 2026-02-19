// Patients/components/CheckInForm.jsx
import React from 'react';
import Input from '../../Shared/Components/Input';
import Select from '../../Shared/Components/Select';

function CheckInForm() {
  return (
    <form className="checkin-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Full Name input */}
      <Input label="Full Name" placeholder="Enter your full name" />

      {/* Phone input */}
      <Input label="Phone" placeholder="Enter your phone number" />

      {/* Reason for visit dropdown */}
      <Select
        label="Reason for Visit"
        options={['Consultation', 'Follow-up', 'Vaccination']}
      />
    </form>
  );
}

export default CheckInForm;
