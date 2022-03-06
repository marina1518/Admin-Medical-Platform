import './App.css';
import Image from './Components/image';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppAdmin from './Pages/AppAdminPage/AppAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminhospital from './Pages/HospitalAdminPage/HospitalAdmin';
import Login from './Pages/login/login_f';
import Header from './Components/Header/Header';
import { useSelector, useDispatch } from "react-redux";
function App() {
const token = useSelector((state) => state.auth); //state of token
  return (
    <div >
      {token.token && <Header/>}
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/AppAdmin" element={<AppAdmin />}> </Route>
        <Route path="/HospitalAdmin" element={<Adminhospital />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
