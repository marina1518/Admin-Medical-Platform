import  React,{useState,useEffect} from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Components/Table/Table';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import Adddoctor from '../../Components/Doctors/AddDoctor';
import Editdoctor from '../../Components/Doctors/EditDoctor';
import './HospitalAdmin.css'
import { useJwt } from 'react-jwt';
import Sidebarcomp from '../../Components/SideBarUi/Sidebarcomp';
import AdminInformation from '../../Components/AdminEntity/AdminInformation';
import DoctorsList from '../../Components/AdminEntity/DoctorsList';
import Appointments from '../../Components/AdminEntity/Appointments';
export default function Adminhospital() {
  const initstate = {username :"" , email : "" , number : '' , hospitalname : "" , image:""};
  var [admindata,setadmindata] = useState(initstate)
  const [chosencomp,setchosencomp]=useState("Info")
  const sideBarhandler = (comp)=>{
      setchosencomp(comp)
  }
  
  return (
        <>
          <div className="main-container">

          
          {<Sidebarcomp sideBarhandler={sideBarhandler} page="entity"/>}
          <main>
        <div className="profile-container">
          {(chosencomp === "Info")&&<AdminInformation/>}
           {(chosencomp === "Doctors")&&<DoctorsList/>}
           {(chosencomp === "Appointments")&&<Appointments/> }
           </div>
          </main>
          </div>

    </>
  );
}
