import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import Table from '../../Components/Table/Table';
import { logout } from '../../actions';
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function Appointments() {
   const navigate = useNavigate();
      const dispatch = useDispatch(); 
      const [loading,setloading]=useState(true)
       const token = JSON.parse(useSelector(state => state.auth)) //state of token      
       console.log(token) 
 
var [data,setdata] = useState([]) //FROM API appointments LIST 
var appointments_list = JSON.parse(JSON.stringify(data));
let appointment = {} ;

const Get_state_meeting = (date) =>{
   const current = new Date();

// Get the State of the meeting 
    var state = "Pending"
    const day = date.split("-");
    if (parseInt(day[2]) < current.getFullYear()) state = "Done"; //year check
    else if (parseInt(day[2]) > current.getFullYear())
      state = "Pending"; //next year
    else if ( parseInt(day[1]) === current.getMonth() + 1 &&  parseInt(day[0]) === current.getDate() && parseInt(day[2]) === current.getFullYear() )
      state = "Today";
    else if (parseInt(day[1]) < current.getMonth() + 1)
      state = "Done"; //month check
    else if (
      parseInt(day[1]) === current.getMonth() + 1 && parseInt(day[0]) < current.getDate()
    )
      state = "Done"; //month check
    else state = "Pending";
    //meetings_api[i].state = state;
  return state ;

}

const Appointments_Entity_Api = async ()=>{
 try {
        const res = await axios.get(`https://future-medical.herokuapp.com/admin/appointments/${token.entity.name}`,
   {headers: {
          'Authorization': `Bearer ${token.token}`
          }})
        const data = await res.data;
        if (data === 'no appointments available') 
        {return }
        let i = 1 ;
         var meet_date = "";
        var meet_day = "";
        var meeting_date = "";
        data.forEach((x) => {
                
                appointment.doctorname = x.doctor.username;
                appointment.doctoremail = x.doctor.email;
                appointment.id = i;  
                meet_date = x.Date.split('-');
                meet_day = meet_date[2].split('T')
                meeting_date =  meet_day[0]+'-'+meet_date[1]+'-' +meet_date[0] ;              
                appointment.date = x.day + " "+ meeting_date ;
                appointment.slot = x.slot ;
                appointment.patientname = x.user.username;
                appointment.patientemail = x.user.email;
                appointment.status = Get_state_meeting(meeting_date) ;
                appointments_list.push(appointment);
                appointment={}
                ++i;
          });
        setdata(appointments_list); 
        setloading(false)
        console.log(appointments_list)     
    } 
    catch (err) {
             if (err.response) {
          console.log(err.response.data);
          if (err.response.data === "not authorized, token is failed") {
            dispatch(logout())
            navigate("/")
          }
    
    }
    }
}
useEffect(()=>{Appointments_Entity_Api()},[])
const columns = [

  {
    field: 'id',
    headerName: 'Number',
    width: 150,
  
  },
  {
    field: 'date',
    headerName: 'Appointment day',
    width: 190,
 
  },
    {
    field: 'slot',
    headerName: 'Appointment slot',
    width: 190,
    
  },
  {
    field: 'doctorname',
    headerName: 'Doctor name',
   
    width: 180,

  },
    {
    field: 'doctoremail',
    headerName: 'Doctor email',
  
    width: 180,

  },
    {
    field: 'patientname',
    headerName: 'Patient name',
   
    width: 170,

  },
    {
    field: 'patientemail',
    headerName: 'Patient email',
    
    width: 180,

  },
      {
    field: 'status',
    headerName: 'status ',
  
    width: 210,

  },

];
  return (     
           <>
             <h3  style={{'color': '#06a3da' ,'font-size': '20px' ,margin: '1rem 2rem' }}>
            Appointments</h3>
            {loading?(
               <div style={{ 'position': 'absolute',  'top': '50%', 'left': '60%',  'margin': '-25px 0 0 -25px'}}>
                <Spinner animation="border" variant="primary" />
            </div>
            ):( 
    <div style={{ height: 560, width: '90%' , margin: '1rem 2rem' ,marginBottom:'60px' }}>
     { <Table rows={data} columns={columns}></Table> }
     </div>)}
     </>
  )
}

export default Appointments