import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
export default function Editdoctor(props) {
     const [FormValues, setFormvalues ] = useState(props.editdata);
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
    console.log(props);
    const handlechange = (e)=>{
         
         const name = e.target.name ;
         const value = e.target.value ;
        // console.log(value);
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
         }
         
         //console.log(FormValues);
    }
    function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!values.name)
            {
                errors.name="Doctor Name is required!";  
            }
        
        if (!values.number)
            {
                errors.number="Number is required!";  
            }
        else if (values.number.length !== 11)
        {
            errors.number = "This is not a valid phone number ";
        }      
        /*else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }*/
        
        if (!values.specialization)
            {
                errors.specialization="specialization is required!";  
            }
        if (!values.Email)
            {
                errors.Email="Doctor's Email is required!";  
            }
        else if (!regx.test(values.Email))
        {
            errors.email = "This is not a valid email format";
        }    
        if (!values.Password)
            {
                errors.Password="Doctor's new Password is required!";  
            }    

        return errors ;
    }
        const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            props.changeedit(FormValues);
            //APIEDIT
            //sendpostRequest2();
            //POST
           
            
        }
      }
    return (
       <div>
 <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 80px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
  <Row>
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Edit Doctor </p>
     <Col>
    
    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>Doctor Name</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.name} name="name" type="text" placeholder="Enter Doctor name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.name}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="number" placeholder="Enter Contact number" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
    </Form.Group>
      <Form.Group className="mb-3" controlId="formGridspecial">
      <Form.Label>Specialization</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.specialization} name="specialization" type="text" placeholder="Enter Doctor Specialization" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.specialization}</p>
    </Form.Group>
  </Col>
  <Col>
     
      <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Email} name="Email" type="email" placeholder="Enter Doctor's Email " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Email}</p>
  </Form.Group>

  <Form.Group  className="mb-3" controlId="formGridAddress3">
      <Form.Label> New Password</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Password} name="Password" type="password" placeholder="Enter Doctor's Password " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Password}</p>
  </Form.Group>
  </Col>
  </Row>
  <Row>
      <Col>
      <Button style={{width:'100%'}} variant="primary" type="submit">
    Submit
  </Button>
  </Col>
  <Col>
    <Button style={{width:'100%'}} variant="primary" onClick={props.goback}>
   Go back
  </Button>
  </Col>
  </Row>
  </Form>
        </div>
    )
}
