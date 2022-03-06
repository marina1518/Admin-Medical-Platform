import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
export default function EditAnnouncment(props) {
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
    {const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!values.announcmentname)
            {
                errors.announcmentname="Announcment Name is required!";  
            }
        
        if (!values.Description)
            {
                errors.Description="Description is required!";  
            }
              
        /*else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }*/

        
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
      <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 20px' ,borderWidth:'1px',borderColor:'#1775ee' , borderStyle:'solid',width:'540px'} }>
  
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#7672ca'} }> Edit Announcment </p>
    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>Announcment Name</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.announcmentname} name="announcmentname" type="text" placeholder="Enter Announcment name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.announcmentname}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Description</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Description} name="Description" type="text" placeholder="Enter Description" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Description}</p>
    </Form.Group>
  

  {/*<Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Announcment Image</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Image} name="Image" type="file" placeholder="Enter Admin name " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Image}</p>
    </Form.Group>*/}
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
