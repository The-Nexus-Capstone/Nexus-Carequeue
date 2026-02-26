import React, { useState } from 'react';
import BackButton from "../../../Shared/Components/BackButton";
import Button from "../../../Shared/Components/Button";
import ClinicSelector from "../Components/ClinicSelector";
import QueueStatusCard from "../Components/QueueStatusCard";
import { useNavigate } from "react-router-dom";

function CheckIn() {

  const [selectedClinic, setSelectedClinic] = useState("Clinic A");
  const navigate = useNavigate();

  const clinicData = {
    "Clinic A": { status: "Not Busy", waiting: 2, waitTime: "15 mins" },
    "Clinic B": { status: "Busy", waiting: 10, waitTime: "45 mins" },
    "Clinic C": { status: "Busy", waiting: 6, waitTime: "30 mins" },
  };

  return (
    <div className="checkin-page" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <BackButton />

      <h1>Patients Check-In</h1>
      <p>Choose a clinic, view their status and join the queue</p>

      <ClinicSelector
        selected={selectedClinic}
        onSelect={setSelectedClinic}
      />

      <QueueStatusCard
        status={clinicData[selectedClinic].status}
        waiting={clinicData[selectedClinic].waiting}
        waitTime={clinicData[selectedClinic].waitTime}
      />

      <Button onClick={() => navigate("/patient/checkin/form")}>
        Check-In
      </Button>
    </div>
  );
}

export default CheckIn;