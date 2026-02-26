// Patients/pages/CompleteCheckIn.jsx
import React from 'react';

// Shared components (UI elements used across the app)
import BackButton from '../../../Shared/Components/BackButton';
import Button from '../../../Shared/Components/Button';

// Feature components (specific to Patients feature)
import CheckInForm from '../Components/CheckInForm';
import ClinicSelector from '../Components/ClinicSelector';


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
