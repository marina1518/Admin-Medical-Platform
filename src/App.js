import './App.css';
import Image from './Components/image';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppAdmin from './Pages/AppAdminPage/AppAdmin';
import {useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminhospital from './Pages/HospitalAdminPage/HospitalAdmin';
function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<AppAdmin />}> </Route>
        <Route path="/HospitalAdmin" element={<Adminhospital />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
