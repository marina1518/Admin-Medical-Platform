import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import Table from '../../Components/Table/Table';
import { logout } from '../../actions';
import { Link, useNavigate } from "react-router-dom";

function Appointments() {
   const navigate = useNavigate();
      const dispatch = useDispatch(); 
       const token = JSON.parse(useSelector(state => state.auth)) //state of token      
       console.log(token) 
 
var [data,setdata] = useState([]) //FROM API appointments LIST 
var appointments_list = JSON.parse(JSON.stringify(data));
let appointment = {} ;

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
                appointment.status = x.status ;
                appointments_list.push(appointment);
                appointment={}
                ++i;
          });
        setdata(appointments_list); 
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
          
    <div style={{ height: 560, width: '90%' , margin: '1rem 2rem' ,marginBottom:'60px' }}>
     { <Table rows={data} columns={columns}></Table> }
     </div>
  )
}

export default Appointments