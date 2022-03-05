import React,{useState} from 'react'
import {Form,Button,Col,Row} from 'react-bootstrap'
export default function EntityEdit(props) {
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
        if (props.entity = 'pharmacies')        
        { if (!values.pharmacyname)
            {
                errors.pharmacyname="Pharmacy Name is required!";  
            }
        }
        else if (props.entity = 'clinics')        
        { if (!values.clinicname)
            {
                errors.clinicname="Clinic Name is required!";  
            }
        }
        else if (props.entity = 'hospitals')        
        { if (!values.Hospitalname)
            {
                errors.Hospitalname="Hospital Name is required!";  
            }
        }
        if (!values.number)
            {
                errors.number="Number is required!";  
            }
        else if (values.number.length !== 11)
        {
            errors.number = "This is not a valid phone number ";
        }      
        if (!values.Admin)
            {
                errors.Admin="Admin Name is required!";  
            }
        if (!values.Location)
            {
                errors.Location="Location is required!";  
            }
        if (!values.Email)
            {
                errors.Email="Admin's Email is required!";  
            }
        else if (!regx.test(values.Email))
        {
            errors.email = "This is not a valid email format";
        }    
        if (!values.Password)
            {
                errors.Password="Admin's Password is required!";  
            } 
        else if (values.Password.length < 8)
        {
            errors.Password="Password shouldn't be less than 8 characters";  
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
      <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 20px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
  <Row>
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Edit Information </p>
        <Col>
    { props.entity === 'pharmacies' && <h6>Pharmacy Information</h6>}
    { props.entity === 'clinics' && <h6>Clinic Information</h6>}
    { props.entity === 'hospitals' && <h6>Hospital Information</h6>}
    <Form.Group className="mb-3" controlId="formGridEmail">
      { props.entity === 'clinics' && <Form.Label>Clinic Name</Form.Label>}
      { props.entity === 'pharmacies' && <Form.Label>Pharmacy Name</Form.Label>}
      { props.entity === 'hospitals' && <Form.Label>Hospital Name</Form.Label>}

    { props.entity === 'pharmacies' &&  <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.pharmacyname} name="pharmacyname" type="text" placeholder="Enter Pharmacy name" />}
    { props.entity === 'clinics' &&  <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.clinicname} name="clinicname" type="text" placeholder="Enter Clinic name" />}
    { props.entity === 'hospitals' &&  <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Hospitalname} name="Hospitalname" type="text" placeholder="Enter Hospital name" />}

      { props.entity === 'pharmacies' && <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.pharmacyname}</p>}
      { props.entity === 'clinics' && <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.clinicname}</p>}
      { props.entity === 'hospitals' && <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Hospitalname}</p>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="number" placeholder="Enter Contact number" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
    </Form.Group>
  

  <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Admin Name</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Admin} name="Admin" type="string" placeholder="Enter Admin name " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Admin}</p>
  </Form.Group>

    <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Location</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Location} name="Location" type="string" placeholder="Enter the locaion of the clinic " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Location}</p>
  </Form.Group>
    </Col>
  <Col>
      <h6>Admin Account Information</h6>
      <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Email} name="Email" type="email" placeholder="Enter Admin's Email " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Email}</p>
  </Form.Group>

  <Form.Group  className="mb-3" controlId="formGridAddress3">
      <Form.Label>New Password</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Password} name="Password" type="password" placeholder="Enter Admin's Password " />
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