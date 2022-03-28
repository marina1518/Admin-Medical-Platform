import './App.css';
import Image from './Components/image';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppAdmin from './Pages/AppAdminPage/AppAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminhospital from './Pages/HospitalAdminPage/HospitalAdmin';
import Login from './Pages/login/login_f';
import Header from './Components/Header/Header';
import Clinic_admin from './Pages/Clinic_PHAdmin/clinicadmin'
import DoctorProfile from './Pages/DR_profile/Dr_profile'
import { useSelector, useDispatch } from "react-redux";
function App() {
const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  return (
    <div >
      {token.token && <Header/>}
      
        {/*<Routes>
        <Route path="/" element={<Login/>}> </Route>
  </Routes>*/}
         <div className='body'>
      <Routes>
        <Route path="/" element={<Login/>}> </Route>
        <Route path="/AppAdmin" element={<AppAdmin style={{marginTop:'200px'}}/>}> </Route>
        <Route path="/HospitalAdmin" element={<Adminhospital />}> </Route>
        <Route path='/ClinicAdmin' element={<Clinic_admin />}> </Route>
        <Route path='/Doctor' element={<DoctorProfile />}> </Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
