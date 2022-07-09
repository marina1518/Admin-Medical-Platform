import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OneComplaint from './OneComplaint';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';
import { logout } from '../../../actions';
import { Link, useNavigate } from "react-router-dom";

export default function ControlledAccordions() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
const token = JSON.parse(useSelector(state => state.auth)); //state of token 
const [compalints,setcomplaints]=useState([]); 
const Get_complaints_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/admin/getComplaints',{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        setcomplaints(data);
        console.log(data)
        /*announcments_list=[];
        let i = 1;
        data.forEach((x) => {
                announce.announcmentname = x.announce.title;
                announce.id =  i;
                announce.Description = x.announce.description;
                announcments_list.push(announce);
                announce={}
                ++i;
          });
        setdata(announcments_list);  */
    } 
    catch (err) {
             if (err.response) {
               if (err.response.data === "not authorized, token is failed") {
            dispatch(logout())
            navigate("/")
          }

    }
    }
}
useEffect(()=>{
    Get_complaints_Api();
},[])
  return (
    <div style={{'width':'100%'}}>
         
        <h3  style={{'color': '#06a3da' ,'font-size': '20px'}}>
            <UpcomingIcon htmlColor="#06a3da" /> Users complaints</h3>
       {compalints.map((onecomplaint)=>(
    
        <OneComplaint item={onecomplaint} key={onecomplaint.id}/>
        
       ))}
      
    </div>
  );
}