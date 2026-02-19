import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
//import CheckIn from "./features/Patients/Pages/CheckIn";
import "./Shared/Styles/Global.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
    {/* <Route path="/patient/checkin" element={<CheckIn />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
