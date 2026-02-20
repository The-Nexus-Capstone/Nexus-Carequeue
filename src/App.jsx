import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import StaffLogin from "./features/Stuff/Pages/Login"; 
import CheckIn from "./features/Patients/Pages/CheckIn"; 
import HospitalSignup from './features/Stuff/Pages/HospitalSignup';
import JoinHospital from "./features/Stuff/Pages/JoinHospital";
import AdminDashboard from "./features/Stuff/Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/patient/checkin" element={<CheckIn />} /> 
        <Route path="/hospital-signup" element={<HospitalSignup />} />
        <Route path="/Join-Hospital" element={<JoinHospital/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
