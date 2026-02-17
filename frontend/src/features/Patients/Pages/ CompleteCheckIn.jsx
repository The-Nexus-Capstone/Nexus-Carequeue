// Patients/pages/CompleteCheckIn.jsx
import React from 'react';
// Shared components
import BackButton from '../../shared/BackButton';
import Button from '../../shared/Button';
// Feature components
import CheckInForm from '../components/CheckInForm';
import ClinicSelector from '../components/ClinicSelector';

function CompleteCheckIn() {
  return (
    <div className="complete-checkin-page">
      {/* Back button */}
      <BackButton />

      {/* Page title */}
      <h1>Complete Check-In</h1>

      {/* Dropdown for selecting clinic/location */}
      <ClinicSelector />

      {/* Form for entering patient details */}
      <CheckInForm />

      {/* Button to submit the check-in */}
      <Button>Complete Check-In</Button>
    </div>
  );
}

export default CompleteCheckIn;

