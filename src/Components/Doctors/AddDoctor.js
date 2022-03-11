
import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase';
export default function Adddoctor(props) {

const Add_doctor_api = ()=>{
   //console.log("in api")
            axios.post('https://future-medical.herokuapp.com/register/doctor',
         {
                    username: FormValues.name,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    telephone: FormValues.number,
                    specialization : FormValues.specialization,
                    entityName: props.entityname ,//Added
                    profilePic: FormValues.imageurl
         }).then((res)=>{
           console.log(res.data);
           console.log(props.changeadd)
           props.changeadd(FormValues);  //go to the list
                     
         }).catch(function (error) {
    if (error.response) {      
      console.log(error.response.data);
      console.log(error.response.status);
      /*const errors = {};      
      errors.pharmacyname = "the pharmacy or admin already exist"
      setFormerrors(errors);*/
    }
})
    }  


    const [FormValues, setFormvalues ] = useState({});
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
    
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
        
        if (values.specialization ==="Select Doctor Specialization" ||!values.specialization)
            {
                errors.specialization="Specialization is required!";  
            }
        if (!values.Email)
            {
                errors.Email="Doctor's Email is required!";  
            }
        else if (!regx.test(values.Email))
        {
            errors.Email = "This is not a valid email format";
        }    
        if (!values.Password)
            {
                errors.Password="Doctor's Password is required!";  
            }   
        else if (values.Password.length<8)
            {
                errors.Password="Password shouldn't be less than 8 characters";  
            }       
       if (values.Gender ==="Select Doctor Gender" || !values.Gender )
            {
                
                errors.Gender="Doctor Gender is required!";  
            }  
        return errors ;
    }
const uploadFiles = (file) =>{
if (!file) return
const storageRef = ref(storage,`/files/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef,file);
uploadTask.on("state_changed",()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url); // saved in database
        FormValues.imageurl = url; 
        Add_doctor_api(); 
    }).catch((err)=>{console.log(err)})
})
}
        const submithandle =(e)=>{
        e.preventDefault();
        console.log(e)
        
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            if(FormValues.Image)
            {
            uploadFiles(e.target[3].files[0]) }//The image
            else{Add_doctor_api()}
            console.log(FormValues)
            setissubmit(true);

            //Add_doctor_api();     
            
        }
      }
    return (
        <div>
 <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 80px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
  <Row>
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Doctor </p>
     <Col>
    
    <Form.Group className="mb-3" controlId="formGridName">
      <Form.Label>Doctor Name</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.name} name="name" type="text" placeholder="Enter Doctor name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.name}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridNumber">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="number" placeholder="Enter Contact number" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
    </Form.Group>
      <Form.Group className="mb-3" controlId="formGridspecial">
      <Form.Label>Specialization</Form.Label>
  <Form.Select aria-label="Default select example2" defaultValue="Select Doctor Specialization" name="specialization" value={FormValues.specialization} onChange={(e)=>handlechange(e)}>      
  <option>Select Doctor Specialization</option>
  <option >Emergency Medicine</option>
  <option >Obstetrics & Gynecology</option>
  <option >Dermatology (Skin)</option>
  <option >Cardiologist</option>
  <option >Chest/Respiratory Medicine</option>
  <option >Dietetics</option>
   <option >Gastroenterology (Bowel)</option>
  <option >Pediatrics</option>
  <option >Urology</option>
  <option >Psychiatry</option>
  <option >Plastic Surgery</option>
</Form.Select>     
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.specialization}</p>
    </Form.Group>
 <Form.Group  className="mb-3" controlId="formGridimage">
    <Form.Label>Doctor Image</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Image} name="Image" type="file" placeholder="Enter Admin image " />
  </Form.Group>


  </Col>
  <Col>
     
      <Form.Group  className="mb-3" controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Email} name="Email" type="email" placeholder="Enter Doctor's Email " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Email}</p>
  </Form.Group>

  <Form.Group  className="mb-3" controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Password} name="Password" type="password" placeholder="Enter Doctor's Password " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Password}</p>
  </Form.Group>

<Form.Group  className="mb-3" controlId="formGridGender">
    <Form.Label>Gender</Form.Label>
  <Form.Select aria-label="Default select example" defaultValue="Select Doctor Gender" name="Gender" value={FormValues.Gender} onChange={(e)=>handlechange(e)}>      
  <option>Select Doctor Gender</option>
  <option >Male</option>
  <option >Female</option>
</Form.Select>
<p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Gender}</p>
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
