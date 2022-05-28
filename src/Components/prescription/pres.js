import React, { useState } from "react";
import { Modal, Row,Col, Button, Form, ListGroup  } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {GiMedicines} from 'react-icons/gi';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from 'axios';
const Pres=(props)=>{

        
        const token = JSON.parse(useSelector(state => state.auth));
        const config = {headers: {'Authorization': `Bearer ${token.token}`}};
        const [show, setShow] = useState(props.show);
        const [s,sets] = useState(false);
        const [med,setmed] = useState("");
        const handleClose = () => setShow(false);
        let navigate = useNavigate();
        const patient_email = JSON.parse(
          JSON.stringify(localStorage.getItem("patient_email"))
        );
        const date = JSON.parse(
          JSON.stringify(localStorage.getItem("date"))
        );
        const patient_name = JSON.parse(
          JSON.stringify(localStorage.getItem("patient_name"))
        );
        //const handleShow = () => setShow(props.show);
      
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
        const send_pres=()=>{
          navigate("/doctor");
          write_pres(patient_email, medicine);
          localStorage.removeItem("date");
          localStorage.removeItem("patient_email");
          localStorage.removeItem("patient_name");
        }
        const close_pres=()=>{
          navigate("/doctor");
        }
        console.log(medicine);
        var today = new Date();
        today = String(today.getDate()).padStart(2, '0') + '-'+ String(today.getMonth() + 1).padStart(2, '0') + '-'  + today.getFullYear();
        
        const write_pres = async (patient_email,medicine)=>{
          try {
                const res = await axios.post('https://future-medical.herokuapp.com/doctor/prescription/save' ,
                {"user_email":patient_email,
                "medicines":medicine}
                ,config)
                  alert("Prescription is sent to the user.");
                console.log(res.data);
              
            } 
            catch (err) {
                console.error(err);
            }
        }

      
        return (
          <>
            {/* <Button variant="primary" onClick={handleShow}>
              End Meeting
            </Button> */}
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Write Prescription</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Dr {token.username}</Form.Label>
                    <br/>
                    <Form.Label>Patient: {patient_name} - {patient_email}</Form.Label>
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