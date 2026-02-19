import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing"; 
import StaffLogin from "./features/Stuff/Pages/ Login"; 
import CheckIn from "./features/Patients/Pages/CheckIn"; // Added her route back
import "./Shared/Styles/Global.css"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/patient/checkin" element={<CheckIn />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;