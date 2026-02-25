import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing"; 
import StaffLogin from "./features/Stuff/Pages/Login"; 
import CheckIn from "./features/Patients/Pages/CheckIn"; // Added her route back
import CheckInForm from "./features/Patients/Components/CheckInForm";
import QueueStatus from './features/Patients/Pages/QueueStatus';
import ViewQueue from "./features/Patients/Pages/ViewQueue";
import JoinHospital from "./features/Stuff/Pages/JoinHospital";
import AdminDashboard from "./features/Stuff/Pages/Dashboard";
import HospitalSignup from './features/Stuff/Pages/HospitalSignup';
import QueueManagement from "./features/Stuff/Pages/QueueManagement";

import "./Shared/Styles/Global.css"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/patient/checkin" element={<CheckIn />} /> 
        <Route path="/patient/checkin/form" element={<CheckInForm />} />
        <Route path="/patient/queue-status" element={<QueueStatus />} />
        <Route path="/patient/view-queue" element={<ViewQueue />} />
         <Route path="/Join-Hospital" element={<JoinHospital/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/queue-status" element={<QueueStatus />} /> 
       <Route path="/admin/queue-management" element={<QueueManagement />} />
        <Route path="/hospital-signup" element={<HospitalSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;