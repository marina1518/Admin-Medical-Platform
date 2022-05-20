import React,{useState,useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import OrderImage from './OrderImage';
import OneMed from './OneMed'
import Grid from '@mui/material/Grid';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import VaccinesIcon from '@mui/icons-material/Vaccines';
function OrderDetails(props) {
  var order_list = [] ; 
  if (props.flag == "text")
  {
    order_list = JSON.parse(props.order);
    console.log(order_list)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{'color':'#064e68'}}>
          Order Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {props.flag == "image" && <OrderImage pic={props.order}/>}
          {props .flag == "text" && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
          <p style={{'color':'#064e68'}}><strong><VaccinesIcon htmlColor='#064e68'/>Medicine</strong></p>
          </Grid>
          <Grid item xs={6}>
            <p style={{'color':'#064e68'}}><strong><ProductionQuantityLimitsIcon htmlColor='#064e68'/>Quantity</strong></p>
         </Grid> 
          {props .flag == "text" &&  
            order_list.map(            
             (one_med) => (
               <>
                         <Grid item xs={6}>
          <p style={{'marginLeft':'1rem'}}>{one_med.medicine}</p>
          </Grid>
          <Grid item xs={6}>
         <p style={{'marginLeft':'1rem'}}>{one_med.quanity}</p>
         </Grid>
                  
                  
                  </>
                )
            )
        }
            </Grid>}
          <br></br>
          <span> <strong>User Address :</strong></span> <span>{props.address}</span>
          <br></br>
          <span> <strong> User Phone :</strong></span> <span>{props.phone}</span>
       <br></br>
      </Modal.Body>
     {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
  </Modal.Footer>*/}
    </Modal>
  );
}
export default OrderDetails