import React,{useState,useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';

function Deactivate(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <BatteryAlertIcon htmlColor="#B58B00" ></BatteryAlertIcon>
          Deactivation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p> Your entity {props.entity} is deactivated , if it's a problem please contact with Application admin </p>
      </Modal.Body>
     {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
  </Modal.Footer>*/}
    </Modal>
  );
}
export default Deactivate