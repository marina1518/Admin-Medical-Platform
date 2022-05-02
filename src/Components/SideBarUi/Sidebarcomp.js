import React,{useState,useEffect} from 'react'
import SideBarUI from './Sidebar';
import './Sidebarcomp.css'
import './Sidebar.css'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiFillClockCircle ,AiFillCarryOut} from "react-icons/ai";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

//import { blueGrey } from "@material-ui/core/colors";

import {useSelector,useDispatch} from 'react-redux'
import { hospitals,clinics,announcments,pharmacies,chart,appointments, orders } from '../../actions'

export default function Sidebarcomp(props) {
    const dispatch = useDispatch();
        const token = JSON.parse(useSelector(state => state.auth)) //state of token 
console.log(token)  
     const [compact, setCompact] = useState(false);

  const compacthandler = () => {
    setCompact(!compact);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setCompact(true);
      } else if (window.innerWidth > 1065) {
        setCompact(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <SideBarUI compact={compact} oncompact={compacthandler}>
        {<div>
          <div className="image-container">
            {/*<Avatar
              className="profile_img"
              src={token.profilePic}
              sx={{ width: 50, height: 50 }}
        />*/}
         <Avatar className="profile_img" style={{height:'70px',width:'70px'}} src={token.profilePic}  />
            
              <h3>{token.username}</h3>
            
          </div>
  </div>}
  { props.page === "entity" &&
        <div className="sidebar-links">
          
          <li onClick={() => props.sideBarhandler("Info")}>
            <i > <AnnouncementIcon htmlColor='#06a3da' /></i>
            {compact ? "" : <span> Personnal Info</span>}
          </li>
          <li onClick={() => props.sideBarhandler("Doctors")}>
            <i ><MedicalServicesIcon/></i>
            {compact ? "" : <span> Doctors</span>}
          </li>
          <li onClick={() => props.sideBarhandler("Appointments")}>
          <i ><AccessTimeIcon/></i>          
            {compact ? "" :  <span> Appointments</span>}           
          </li>
  
        </div>
        }
      { props.page === "app" &&
        <div className="sidebar-links">
          
          <li onClick={()=>{dispatch(chart())}}>
            <i > <DashboardIcon htmlColor='#06a3da' />
                </i>
            {compact ? "" : <span> Dashboard</span>}
          </li>
          <li onClick={()=>{dispatch(hospitals())}}>
            <i > <LocalHospitalIcon htmlColor='#06a3da' /></i>
            {compact ? "" : <span> Hospitals</span>}
          </li>
         
          <li onClick={()=>{dispatch(clinics())}}>
            <i > <LocalHospitalIcon htmlColor='#06a3da' /></i>
            {compact ? "" : <span> Clinics</span>}
          </li>

           <li onClick={()=>{dispatch(pharmacies())}}>              
          <i ><LocalPharmacyIcon htmlColor='#06a3da' /></i>          
            {compact ? "" :  <span> Pharmacies</span>}                      
          </li>

              <li onClick={()=>{dispatch(announcments())}}>              
          <i > <AnnouncementIcon htmlColor='#06a3da' /></i>          
            {compact ? "" :  <span> Announcements</span>}           
          </li>
             <li onClick={()=>{dispatch(appointments())}}>
          <i ><AccessTimeIcon/></i>          
            {compact ? "" :  <span> Appointments</span>}           
          </li>
               <li onClick={()=>{dispatch(orders())}}>
          <i ><VaccinesIcon htmlColor='#06a3da'/></i>          
            {compact ? "" :  <span> orders </span>}           
          </li>
        </div>
        }    
      </SideBarUI>
  )
}
