// Patients/components/ClinicSelector.jsx
import React from 'react';
import Select from '../../shared/Select';

function ClinicSelector() {
  return (
    <div className="clinic-selector">
      {/* Section title */}
      <h2>Choose a Clinic</h2>

      {/* Optional location text */}
      <p>Location: Main Branch</p>

      {/* Dropdown component for selecting clinic */}
      <Select options={['Clinic A', 'Clinic B', 'Clinic C']} />
    </div>
  );
}

export default ClinicSelector;
