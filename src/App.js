import "./App.css";
import Image from "./Components/image";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppAdmin from "./Pages/AppAdminPage/AppAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import Adminhospital from "./Pages/HospitalAdminPage/HospitalAdmin";
import Login from "./Pages/login/login_f";
import Header from "./Components/Header/Header";
import Clinic_admin from "./Pages/Clinic_PHAdmin/clinicadmin";
import DoctorProfile from "./Pages/DR_profile/Dr_profile";
import Pharmacy_admin from "./Pages/Clinic_PHAdmin/pharmacy_admin";
import Privatedoctor from "./Components/PrivateRoutes/PrivateDoctor";
import PrivateAdmin from "./Components/PrivateRoutes/PrivateAdmin";
import PrivatePharmacy from "./Components/PrivateRoutes/PrivatePharmacy";
import PrivateEntity from "./Components/PrivateRoutes/PrivateEntity";
import { useSelector, useDispatch } from "react-redux";
import OrderImage from "./Components/AdminApp/Orders/OrderImage";
import VideoCall from "./Components/Meeting_room/Video_chat/VideoCall";
import ProfileUi from "./Pages/User_profile/ProfileUI";
import { MyMap } from "./Components/AdminEntity/Map";
import { useLocation } from "react-router-dom";
import Scrol from "./Components/Scrol/Scrol";
import AlertDelete from "./Components/AdminApp/AlertDelete/AlertDelete";
import Customchart from "./Components/AdminApp/Dashboard/Customchart";
import Complaints from "./Components/AdminApp/Complaints/Complaints";
function App() {
  const token = JSON.parse(useSelector((state) => state.auth)); //state of token
  const location = useLocation();
  return (
    <div>
      <Scrol>
        {token.token && location.pathname !== "/doctor/meetingroom" && (
          <Header />
        )}

        {/*<Routes>
        <Route path="/" element={<Login/>}> </Route>
  </Routes>*/}
        <div
          className={
            location.pathname === "/doctor/meetingroom"
              ? "body-without-top"
              : "body"
          }
        >
          <Routes>
            {<Route path="/map" element={<MyMap />}></Route>}
            {<Route path="/" element={<Login />}></Route>}
            {<Route path="/user" element={<ProfileUi />}></Route>}
            <Route
              path="/AppAdmin"
              element={
                <PrivateAdmin>
                  <AppAdmin style={{ marginTop: "200px" }} />
                </PrivateAdmin>
              }
            ></Route>
            <Route
              path="/HospitalAdmin"
              element={
                <PrivateEntity>
                  <Adminhospital />
                </PrivateEntity>
              }
            ></Route>
            {
              <Route
                path="/ClinicAdmin"
                element={
                  <PrivateEntity>
                    <Adminhospital />{" "}
                  </PrivateEntity>
                }
              ></Route>
            }
            <Route
              path="/PharmacyAdmin"
              element={
                <PrivatePharmacy>
                  <Pharmacy_admin />
                </PrivatePharmacy>
              }
            ></Route>
            <Route
              path="/Doctor"
              element={
                <Privatedoctor>
                  <DoctorProfile />
                </Privatedoctor>
              }
            ></Route>
            <Route path="/doctor/meetingroom" element={<VideoCall />}></Route>
          </Routes>
        </div>
      </Scrol>
    </div>
  );
}

export default App;
