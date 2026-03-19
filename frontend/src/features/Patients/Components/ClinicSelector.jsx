import React from 'react';

function ClinicSelector({ clinics = [], selected, onSelect }) {
  return (
    <div className="clinic-selector" style={{ margin: "1.5rem 0" }}>
      <h2>Choose a Clinic</h2>

      {clinics.length === 0 ? (
        <p style={{ color: "#777" }}>No clinics available.</p>
      ) : (
        <select
          value={selected?.id || ''}
          onChange={(e) => {
            const clinic = clinics.find(c => c.id === parseInt(e.target.value));
            onSelect(clinic);
          }}
          style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid #ddd" }}
        >
          {clinics.map(clinic => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default ClinicSelector;
