import React, { useState } from "react";
import { Modal, Row,Col, Button, Form, Carousel,Card,Alert  } from "react-bootstrap";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {GiMedicines} from 'react-icons/gi';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {logout} from '../../actions'
import { useDispatch } from "react-redux";

const Choose_pres=()=>{

        const dispatch = useDispatch();
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const token = JSON.parse(useSelector((state) => state.auth));
        console.log(token.token);
        const config = {headers: {
            'Authorization': `Bearer ${token.token}`}};

        const[pres, setpres]=useState([]);

        const get_pres = async ()=>{
         try {
                const res = await axios.get('https://future-medical.herokuapp.com/user/prescriptions' ,
                
                 config
                )
     
                console.log(res.data);
                if (res.data==="you have no prescriptions yet") return
                setpres(res.data);
              
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
     const[medicine,setmedicine]=useState([]);
     console.log(medicine);
        
      
        return (
          <>
            <Button variant="primary" onClick={(e)=>{handleShow(); get_pres();}}>
              choose 
            </Button>

      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Choose from your Prescriptions</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  
                  </Form.Group>
                  
            <div style={{width:"350px", height:"350px"}}>
                {
                    pres.length ===0 ? 
                    <>
                      <Alert key="primary" variant="primary">
                        There are no prescriptions yet.
                      </Alert>
                  </>
                  :
               
            <Carousel variant="dark">
                    {
                        pres.map((p)=>
                            <Carousel.Item>
        <div style={{ textAlign:"center"}}>
            <Card>
            <Card.Body>
              <Card.Title>Prescription</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{p.Date}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">Dr {p.doctor.username}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{p.doctor.email}</Card.Subtitle>
              <Card.Text>
              <div key={`default-checkbox`} className="mb-3">
                {
                    p.medicines.map((m)=>
                //     <Form.Check 
                //     type="checkbox"
                //     id={`default-checkbox`}
                //     label={m}
                // />
                <>
                <input type="checkbox" id={m} name={m} value={m} onChange={(e)=>setmedicine(e.target.value)}/>
                <label for={m}>  {" "+ m}</label><br></br></>
                    )
                }
                </div>
                <ul></ul>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
  </Carousel.Item>
                        )
                    }
            </Carousel>}
            </div>
                 
                </Form>
              

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Order Now
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      
}
export default Choose_pres;