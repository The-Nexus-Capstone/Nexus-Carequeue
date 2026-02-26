import React from 'react';
import Select from "../../../Shared/Components/Select";

function ClinicSelector({ selected, onSelect }) {
  return (
    <div className="clinic-selector" style={{ margin: "1.5rem 0" }}>
      <h2>Choose a Clinic</h2>

      <p>Location: {selected}</p>

      <Select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        options={['Clinic A', 'Clinic B', 'Clinic C']}
      />
    </div>
  );
}

export default ClinicSelector;
