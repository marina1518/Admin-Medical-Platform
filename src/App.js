import './App.css';
import Image from './Components/image';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppAdmin from './Pages/AppAdminPage/AppAdmin';
import {useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminhospital from './Pages/HospitalAdminPage/HospitalAdmin';
import Login from './Pages/login/login_f';
import ClinicAdmin from './Pages/Clinic_PHAdmin/clinicadmin';
import PHAdmin from './Pages/Clinic_PHAdmin/pharmacy_admin';
import DrProfile from './Pages/DR_profile/Dr_profile';
function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<AppAdmin />}> </Route>
        <Route path="/HospitalAdmin" element={<Adminhospital />}> </Route>
        <Route path="/Login" element={<Login/> }></Route>
        <Route path="/Clinicadmin" element={<ClinicAdmin/> }></Route>
        <Route path="/PHAdmin" element={<PHAdmin/> }></Route>
        <Route path="/Drprofile" element={<DrProfile/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
