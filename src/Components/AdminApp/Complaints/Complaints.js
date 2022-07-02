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
import { useSelector } from 'react-redux';

export default function ControlledAccordions() {
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
        console.error(err);
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
        {/*<OneComplaint id={1}/>
        <OneComplaint id={2}/>*/}
      {/*<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>General settings</Typography>
          <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Users</Typography>
          <Typography className={classes.secondaryHeading}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Advanced settings</Typography>
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
  </Accordion>*/}

    </div>
  );
}