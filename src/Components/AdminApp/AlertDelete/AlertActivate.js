import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertActivate(props) {
    console.log(props)
    //const [clicked, setclicked] = React.useState(props.clicked_hos);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose_no = () => {
    props.Close_Alert_No_activate();
  };
   const handleClose_yes = () => {
    props.Close_Alert_yes_activate(props.clicked_item);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        //onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{(props.parent == "clinic") && "Clinic Activation "}
        {(props.parent == "hospital") && "Hospital Activation "}
        {(props.parent == "pharmacy") && "Pharmacy Activation "}
         {(props.parent == "doctor") && "Doctor Activation "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">              
            Are you sure that you want to Activate
              
            {(props.parent == "hospital") && " " + props.clicked_item.Hospitalname}
            {(props.parent == "clinic") && " " + props.clicked_item.clinicname} 
            {(props.parent == "pharmacy") && " " + props.clicked_item.pharmacyname}
             {(props.parent == "announcment") && " " + props.clicked_item.announcmentname}
             {(props.parent == "doctor") &&  "Doctor "}
               {(props.parent == "doctor") &&  props.clicked_item.name}? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose_no}>No</Button>
          <Button onClick={handleClose_yes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
