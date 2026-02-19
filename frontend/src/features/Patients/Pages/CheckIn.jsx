// Patients/pages/CheckIn.jsx
import React from 'react';
// Shared components
import BackButton from '../../Shared/Components/BackButton';
import Button from '../../Shared/Components/Button';
// Feature components
import ClinicSelector from '../Components/ClinicSelector';
import QueueStatusCard from '../Components/QueueStatusCard';


function CheckIn() {
  return (
    <div className="checkin-page">
      {/* Back button to go to previous page */}
      <BackButton />

      {/* Page title and description */}
      <h1>Patients Check-In</h1>
      <p>Choose a clinic ,view their status and join the queue</p>

      {/* Feature components */}
      <ClinicSelector /> {/* Dropdown to select clinic */}
      <QueueStatusCard /> {/* Shows clinic status and wait info */}

      {/* Button to join queue */}
      <Button>Check-In</Button>
    </div>
  );
}

export default CheckIn;
