import React,{useEffect,useState} from 'react'
import {  Alert,  Button,  ButtonGroup,  ListGroup,  Stack,  Table,  Card,  Row,  Col} from "react-bootstrap";
import { AiFillClockCircle, AiOutlineComment } from "react-icons/ai";
import { logout } from "../../actions";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
//import "./profileui.css";
import { Link, useNavigate } from "react-router-dom";
import VideoChat from "../../Components/Meeting_room/Video_chat/VideoChat";
import { channel_name } from "../../actions";
import Spinner from "react-bootstrap/Spinner";

function Doctorapp() {
   const dispatch = useDispatch();
   const [loading,setloading]=useState(true)
  dispatch(channel_name(""));
  let navigate = useNavigate();
  const navigation = (userid) => {
    navigate("/user", { state: { user_id: userid } });
  };
    const token = JSON.parse(useSelector((state) => state.auth));
  console.log(token.token);

  const config = { headers: { Authorization: `Bearer ${token.token}` } };
  useEffect(() => {
    get_meetings();
  }, []);

  const [meetings_api, setmeetings] = useState([]);
  const get_meetings = async () => {
    try {
      const res = await axios.get(
        "https://future-medical.herokuapp.com/doctor/meetings",
        config
      );

      console.log(res.data);
      if (res.data === "you have no meetings yet"){ 
        setloading(false)
      return;}
      setloading(false)
      setmeetings(res.data);
    } catch (err) {
      if (err.response) {
        if(err.response.data === "not authorized, token is failed"){
          dispatch(logout());
          navigate("/")
        }
      }
  //console.error(error);
}
  };

  var meetings = [];
  const current = new Date();
  let state;
  for (var i = 0; i < meetings_api.length; i++) {
    const day = meetings_api[i].Date.split('T')[0].split("-").reverse().join("-").split("-");
    if (parseInt(day[2]) < current.getFullYear()) state = "Done"; //year check
    else if (parseInt(day[2]) > current.getFullYear())
      state = "Pending"; //next year
    else if (parseInt(day[1]) < current.getMonth() + 1)
      state = "Done"; //month check
    else if (
      parseInt(day[1]) === current.getMonth() + 1 &&
      parseInt(day[0]) < current.getDate()
    )
      state = "Done"; //month check
    else if (
      parseInt(day[1]) === current.getMonth() + 1 &&
      parseInt(day[0]) === current.getDate() &&
      parseInt(day[2]) === current.getFullYear()
    )
      state = "Today";
    else state = "Pending";
    meetings.push({
      id: i,
      patient: meetings_api[i].user.username,
      slot: meetings_api[i].slot,
      date: meetings_api[i].Date,
      state: state,
      patient_email: meetings_api[i].user.email,
    });
  }

  meetings.sort((a, b) => {
    const c = new Date(a.date.split("-").reverse().join("-"));
    const d = new Date(b.date.split("-").reverse().join("-"));
    return c - d;
  });

  
  //meeting button
  const local_date = new Date();
  var utc_offset = local_date.getTimezoneOffset()/60;
  console.log(utc_offset)
  var utc = (2+utc_offset)*60;
  var hour = local_date.getHours();
  var min = local_date.getMinutes();
  local_date.setMinutes(min+utc);
  hour = local_date.getHours();
  min = local_date.getMinutes();
  console.log(hour, min);
  console.log(local_date);
  

  const check_button_state=(item)=>{
    if(item.state === "Today" && hour === parseInt(item.slot.split('-')[0].split(':')[0]) ) 
    {
      if(min < 30 &&  parseInt(item.slot.split('-')[0].split(':')[1]) === 0)
      {
        return(
          <VideoChat
          dr_email={token.email}
          button_state={true}
          patient_email={item.patient_email}
          patient_name={item.patient}
          slot={item.slot}
        />
        )
      }
      else if(min >= 30 &&  parseInt(item.slot.split('-')[0].split(':')[1]) === 30)
      {
        return(
          <VideoChat
          dr_email={token.email}
          button_state={true}
          patient_email={item.patient_email}
          patient_name={item.patient}
          slot={item.slot}
        />
        )
      }
      else {
        return(
          <VideoChat
          dr_email={token.email}
          button_state={false}
          patient_email={item.patient_email}
          patient_name={item.patient}
          slot={item.slot}
        />
        )
      }
    }
    else {
      return(
        <VideoChat
        dr_email={token.email}
        button_state={false}
        patient_email={item.patient_email}
        patient_name={item.patient}
        slot={item.slot}
      />
      )
    }
  }

  return (
     <div className="card">
            <div className="card-header bg-transparent border-0">
              <h3 className="mb-0">
                <AiFillClockCircle /> Appointments
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <Table responsive="sm">
                  <thead>
                    <tr>
                      <th width="20%">Date</th>
                      <th width="20%">Time</th>
                      <th width="20%">Patient Name</th>
                      <th width="20%">Meeting</th>
                      <th width="20%">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.lenght === 0 ? (
                       loading?(
                 <div style={{'margin':'auto'}}>
                <Spinner animation="border" variant="primary" />
              </div>  
                 ):(
                        <>
                          <Alert
                           key="primary"
                           variant="primary"
                           style={{ margin: "1rem 2rem" }}
                          >
                     There are no meetings yet.
                     </Alert>
            </>)
                      
                    ) : (
                       loading?(
                 <div style={{'margin':'auto'}}>
                <Spinner animation="border" variant="primary" />
              </div>  
                 ):(
                      <>
                        {meetings.reverse().map((item) => (
                          <tr
                            key={item.id}
                            style={
                              item.state === "Pending"
                                ? { opacity: "1" }
                                : item.state === "Today"
                                ? { background: "#B9D9EB" }
                                : { opacity: "0.5" }
                            }
                          >
                            <td width="20%">{item.date.split('T')[0].split("-").reverse().join("-")}</td>
                            <td width="20%">{item.slot}</td>
                            <td
                              style={{ cursor: "pointer" }}
                              width="20%"
                              onClick={() => {
                                navigation(item.patient_email);
                              }}
                            >
                              <Link to={`/user/`}>{item.patient}</Link>
                            </td>
                            <td width="20%">
                              {check_button_state(item)}
                            </td>
                            <td width="20%">{item.state}</td>
                          </tr>
                        ))}
                      </>)
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
  )
}

export default Doctorapp