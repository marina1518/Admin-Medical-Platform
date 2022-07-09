import React, { useState } from "react";
import { Modal, Row,Col, Button, Form, ListGroup  } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {GiMedicines} from 'react-icons/gi';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import {patient_details , logout} from '../../actions';
const Pres=(props)=>{

        
        const token = JSON.parse(useSelector(state => state.auth));
        const pat = JSON.parse(useSelector(state => state.patient_reducer));
        console.log(pat);
        const dispatch = useDispatch();
        const config = {headers: {'Authorization': `Bearer ${token.token}`}};
        const [show, setShow] = useState(props.show);
        const [s,sets] = useState(false);
        const [med,setmed] = useState("");
        const handleClose = () => setShow(false);
        let navigate = useNavigate();
      
        const [show_med, setnew]=useState([])
        const medicine=[...show_med];
        const Write=()=>{
            if(med!=="")
            {
                medicine.push(med);
            sets(false);
            setnew(medicine);
            }
            
        }
        console.log(show_med)
        var today = new Date();
        today = String(today.getDate()).padStart(2, '0') + '-'+ String(today.getMonth() + 1).padStart(2, '0') + '-'  + today.getFullYear();
        const send_pres=()=>{
          navigate("/doctor");
          write_pres( medicine);
          dispatch(patient_details(""));
        }
        const close_pres=()=>{
          navigate("/doctor");
        }
        console.log(medicine);

        const write_pres = async (medicine)=>{
          try {
                const res = await axios.post('https://future-medical.herokuapp.com/doctor/prescription/save' ,
                {"user_email":pat.email,
                "medicines":medicine}
                ,config)
                  alert("Prescription is sent to the user.");
                console.log(res.data);
              
            } 
            catch (err) {
              if (err.response) {
                if(err.response.data === "not authorized, token is failed"){
                  dispatch(logout());
                  navigate("/")
                }
              }
          //console.error(error);
        }
        }
        var today = new Date();
        today = String(today.getDate()).padStart(2, '0') + '-'+ String(today.getMonth() + 1).padStart(2, '0') + '-'  + today.getFullYear();
        console.log(today);
        return (
          <>
            {/* <Button variant="primary" onClick={handleShow}>
              End Meeting
            </Button> */}
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header >
                <Modal.Title>Write Prescription</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Dr {token.username}</Form.Label>
                    <br/>
                    <Form.Label>Patient: {pat.name} - {pat.email}</Form.Label>
                    <br/>
                    <Form.Label>{today}</Form.Label>
                    <br/>

                  </Form.Group>
                  {/* <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Prescription</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group> */}
                  <Row>
               <Col>
               <p className="mb-0"><strong className="pr-1"> <GiMedicines /> Medicine: </strong> </p> 
                 </Col>
                 <Col>
                 <button type="button" style={{cursor:"pointer", borderRadius:"50%", background:"white", border:"None"}} onClick={(e)=>sets(true)}><AddCircleIcon/></button>
                 </Col>
               </Row>

                {s ? <div>
                <Row>
                <Col>
                <Form.Control
                    as="textarea"
                    placeholder="Add medicine here ..."
                    onChange={(e) => setmed(e.target.value)}
                    style={{ height: "30px", width: "300px"}}/>
                </Col>
                <Col>
                <button style={{cursor:"pointer",  borderRadius:"50%",background:"white", border:"None"}} type="button" onClick={Write}><SendIcon/></button>
                </Col>
                </Row>
                    <br/></div>
                    : ""}
                {show_med.map((r=>
                    <ListGroup variant="flush">
                        <div>
                        <ListGroup.Item> {r}</ListGroup.Item>
                        </div>
                        <br/>
                </ListGroup>))}
                </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={(e)=>{handleClose(); close_pres();}}>
                  Close
                </Button>
                <Button variant="primary" onClick={(e)=>{handleClose(); send_pres();}}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      
}
export default Pres;