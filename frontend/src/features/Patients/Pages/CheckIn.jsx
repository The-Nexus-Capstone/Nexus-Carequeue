import React, { useState, useEffect } from 'react';
import BackButton from "../../../Shared/Components/BackButton";
import Button from "../../../Shared/Components/Button";
import ClinicSelector from "../Components/ClinicSelector";
import QueueStatusCard from "../Components/QueueStatusCard";
import { useNavigate } from "react-router-dom";

function CheckIn() {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/hospitals/`)
      .then(res => res.json())
      .then(data => {
        setClinics(data);
        if (data.length > 0) setSelectedClinic(data[0]);
        setLoading(false);
      })
      .catch(() => {
        setClinics([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="checkin-page" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <BackButton />

      <h1>Patients Check-In</h1>
      <p>Choose a clinic, view their status and join the queue</p>

      {loading ? (
        <p>Loading clinics...</p>
      ) : (
        <>
          <ClinicSelector
            clinics={clinics}
            selected={selectedClinic}
            onSelect={setSelectedClinic}
          />

          {selectedClinic && (
            <QueueStatusCard
              status="Available"
              waiting={0}
              waitTime="Estimated on check-in"
            />
          )}

          <Button onClick={() => navigate("/patient/checkin/form", { state: { clinic: selectedClinic } })}>
            Check-In
          </Button>
        </>
      )}
    </div>
  );
}

export default CheckIn;
