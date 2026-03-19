import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing"; 
import StaffLogin from "./features/Staff/Pages/Login"; 
import CheckIn from "./features/Patients/Pages/CheckIn"; 
import CheckInForm from "./features/Patients/Components/CheckInForm";
import QueueStatus from './features/Patients/Pages/QueueStatus';
import ViewQueue from "./features/Patients/Pages/ViewQueue";
import JoinHospital from "./features/Staff/Pages/JoinHospital";
import AdminDashboard from "./features/Staff/Pages/Dashboard";
import HospitalSignup from './features/Staff/Pages/HospitalSignup';
import QueueManagement from "./features/Staff/Pages/QueueManagement";

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
        
    
        <Route path="/join-hospital" element={<JoinHospital/>} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        
        <Route path="/admin/queue-management" element={<QueueManagement />} />
        <Route path="/hospital-signup" element={<HospitalSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;