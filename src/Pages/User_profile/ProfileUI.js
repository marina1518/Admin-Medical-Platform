import React, { useState, useEffect } from "react";
import "./profileui.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {Row,Col,Alert,CardGroup, Card} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import Avatar from "@material-ui/core/Avatar";
import { BsInfoCircleFill } from "react-icons/bs";
import { blueGrey } from "@material-ui/core/colors";
import { BiMessageDetail } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import {GiMedicines} from 'react-icons/gi';
import {MdOutlineDone,MdCancel} from 'react-icons/md';
import { signin } from "../../actions";
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { storage } from '../../firebase';
import { info, history , prescription} from "../../actions";
import History from "./History";
import {Link, useLocation, useNavigate} from "react-router-dom";
import SideBarUI from '../../Components/SideBarUi/Sidebar'
//import VideoChat from '../../components/Meeting_room/Video_chat/VideoChat'

const ProfileUI = () => {

  const dispatch = useDispatch();  
  const location = useLocation();
  const sidebar_profile = useSelector((state) => state.profile_reducer); //state of token
  
  let user_Api = {};
  const[user, setuser]=useState({prescription:[]});
  const get_user_info = async (username)=>{
    try {
      const res = await axios.get(`https://future-medical.herokuapp.com/profile/user/${username}`);
      console.log(res.data);
      const data = await res.data;
      user_Api.username = data.username ; 
      user_Api.email = data.email ;
      user_Api.profilePic = data.profilePic ;
      user_Api.dob = data.dateOfBirth;
      user_Api.gender = data.gender;   
      user_Api.blood = data.blood;
      user_Api.phone = data.phone;
      user_Api.address = data.address;
      // user_Api.surgeries = data.history.surgeries;
      // user_Api.diseases = data.history.diseases;
      // user_Api.family_history = data.history.family_history;
      // user_Api.medications = data.history.medications;
      user_Api.history = data.history;
      user_Api.prescription = data.prescriptions;
      setuser(user_Api);   
    } 
    catch (err) {
      console.error(err);
    }
  }
  useEffect(()=>{
    get_user_info(location.state.user_id);
  },[])
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
 console.log(user.prescription)
  return (
    <div className="main-container">
   <SideBarUI compact={compact} oncompact={compacthandler}>
      <div>
         <div className="image-container">
            <Avatar
            className="profile_img"
            src={user.profilePic}
             style={{ height: "70px", width: "70px" }}
                    sx={{ bgcolor: blueGrey[400] }}
            />
            <h3>{user.username}</h3>
         </div>
      </div>
      <div className="sidebar-links">
      {compact ? (
            <>
              <Tooltip title="Personnal Info" placement="right">
                <li onClick={() => dispatch(info())}>
                  <i class="bi bi-info-circle-fill"></i>
                </li>
              </Tooltip>
            
              <Tooltip title="History" placement="right">
                <li onClick={() => dispatch(history())}>
                  <i class="bi bi-clock-fill"></i>
                </li>
              </Tooltip>
              <Tooltip title="Prescriptions " placement="right">
                <li onClick={() => dispatch(prescription())}>
                  <i class="bi bi-bandaid-fill"></i>
                </li>
              </Tooltip>
            </>
          ) : (
            <>
              <li onClick={() => dispatch(info())}>
                <i class="bi bi-info-circle-fill"></i>
                <span> Personal Info </span>
              </li>
              <li onClick={() => dispatch(history())}>
                <i class="bi bi-chat-left-text-fill"></i>
                <span> History </span>
              </li>
              <li onClick={() => dispatch(prescription())}>
                <i class="bi bi-clock-fill"></i>
                <span> Prescriptions </span>
              </li>
            </>
          )}
      </div>
   </SideBarUI>
   <main>
      <div className="profile-container">
         {(sidebar_profile === "info")  ? (
         <div className="card">
            <div className="card-header bg-transparent">
               <h3 className="mb-0">
                  <BsInfoCircleFill />
                  Personal Information
               </h3>
            </div>
            <div className="card-body pt-0">
               <div className="row personnal-image">
                  <Avatar
                     className="profile_img"
                     src={user.profilePic}
                     style={{ height: "150px", width: "150px" }}
                    sx={{ bgcolor: blueGrey[400] }}
                  />
                  <h3 style={{textAlign:'center'}}>{user.username}</h3>
               </div>
               <div class="row mt-3">
                  <div class="col-sm-3">
                     <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">                     
                     {user.email}
                  </div>
               </div>
               <hr id="profile-hr" />
               <div class="row mt-3">
                  <div class="col-sm-3">
                     <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.address}</div>
               </div>
               <hr id="profile-hr" />
               <div class="row mt-3">
                  <div class="col-sm-3">
                     <h6 class="mb-0">Date of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                     {user.dob ? user.dob.split('T')[0].split('-').reverse().join('-') : user.dob}
                     </div>
               </div>
               <hr id="profile-hr" />
               <div class="row mt-3">
                  <div class="col-sm-3">
                     <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.gender}</div>
               </div>
               <hr id="profile-hr" />
               <div class="row mt-3">
                  <div class="col-sm-3">
                     <h6 class="mb-0">Phone</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.phone}</div>
               </div>
               <hr id="profile-hr" />
               <div class="row mt-3">
                  <div class="col-sm-3">
                     <h6 class="mb-0">Blood</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.blood}</div>
               </div>
            </div>
         </div>
         ) : (
         ""
         )}
         {(sidebar_profile === "history")  ? (
         <History user={user.history}/>
         ) : ("")} 
      </div>
      {(sidebar_profile === "prescription") ? 
      (user.prescription.length === 0) ? 
      <>
      <Alert key="primary" variant="primary">
         There are no prescriptions yet.
      </Alert>
      </>
      :
      <>
     <Row xs={1} md={3} className="g-4">
              {user.prescription.map((p) => (
                <Col>
                  <Card className="pres-container">
                    <Card.Body>
                      <Card.Title>Prescriptions</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {p.Date.split("T")[0].split("-").reverse().join("-")}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        Dr {p.doctor.username}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">
                        {p.doctor.email}
                      </Card.Subtitle>
                      <Card.Text>
                        {p.medicines.map((m) => (
                          <li>{m}</li>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            </>
            : ""
      
      }  
   </main>
</div>
);
};
export default ProfileUI;