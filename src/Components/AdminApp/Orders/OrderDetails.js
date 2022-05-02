import React,{useState,useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import OrderImage from './OrderImage';
function OrderDetails(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <OrderImage pic={props.pic}/>
          <br></br>
          <span> <strong>User Address :</strong></span> <span>{props.phone}</span>
          <br></br>
          <span> <strong> User Phone :</strong></span> <span>{props.address}</span>
       <br></br>
      </Modal.Body>
     {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
  </Modal.Footer>*/}
    </Modal>
  );
}
export default OrderDetails