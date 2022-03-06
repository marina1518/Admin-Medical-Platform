
import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddAnnouncment(props) {

         const token = useSelector(state => state.auth) //state of token 
     const [FormValues, setFormvalues ] = useState({});
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
    
    const Add_Announcment_api = ()=>{
        console.log(FormValues.Adminl)  
            axios.post('https://future-medical.herokuapp.com/admin/announcement',
         {
                   
                    title: FormValues.announcmentname,
                    description : FormValues.Description,
         },{
            headers: {
          'Authorization': `Bearer ${token.token}`
          }
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all hospitals
                     
         })
         .catch(function (error) {
       if (error.response) {
      //Formerrors.Admin = "the hospital or doctor already exist" ;
      console.log(error.response.data);
      console.log(error.response.status);      
    }
})
    } 
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
            Add_Announcment_api();
            //props.changeadd();//SEARCH FOR PICTURE
           
            
        }
      }
    return (
        <div>
    <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '0 auto' ,marginTop:'120px',borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'540px'} }>
  
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Announcment </p>
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
<Row>
    <Col>
      <Button style={{width:'100%'}} variant="primary" type="submit">
    Submit
  </Button>
  </Col>
  <Col>
 <Button style={{width:'100%'}} variant="primary" onClick={props.goback}>
    Go Back
  </Button>
  </Col>
  </Row>
</Form>
        </div>
    )
}