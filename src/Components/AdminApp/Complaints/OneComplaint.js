import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { makeStyles } from '@material-ui/core/styles';
import UpcomingIcon from '@mui/icons-material/Upcoming';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function OneComplaint(props) {
    console.log(props)
                var comp_date = props.item.complaint.issuedAt.split('T');
                var comp_day = comp_date[0].split('-')
                
                var complaint_date =  comp_day[2]+'-'+comp_day[1]+'-' +comp_day[0] ;
      const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
        <Accordion expanded={expanded === `panel${props.id}`} onChange={handleChange(`panel${props.id}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${props.id}bh-content`}
          id={`panel${props.id}bh-header`}
        >
          <Typography className={classes.heading}>{complaint_date }</Typography>
          <Typography className={classes.secondaryHeading}>
            {props.item.owner.username}
          </Typography>
        </AccordionSummary>
        
         <AccordionDetails>
                      <Typography style={{'margin':'0 auto'}}>
          <UpcomingIcon htmlColor="#06a3da"/>
           {"     "}complaint : {props.item.complaint.form}
          </Typography>
         </AccordionDetails>
<AccordionDetails >
            <Typography style={{'margin':'0 auto'}}>
          <MarkEmailReadIcon htmlColor="#06a3da"/>
           {"     "}Contact email : {props.item.complaint.contact_mail}
          </Typography>
         
          </AccordionDetails>
          <AccordionDetails>
                      <Typography style={{'margin':'0 auto'}}>
          <PhoneInTalkIcon htmlColor="#06a3da"/>
           {"     "}Contact phone : {props.item.complaint.contact_number}
          </Typography>
         </AccordionDetails>


         

      </Accordion>
    </div>
  )
}

export default OneComplaint