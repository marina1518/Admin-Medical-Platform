import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase';
import Spinner from "react-bootstrap/Spinner";
export default function Adddoctor(props) {
      const [loading, setloading] = useState(false);
      const [Image_Value,setImageValue] = useState("");
const Add_doctor_api = ()=>{
   //console.log("in api")
            axios.post('https://future-medical.herokuapp.com/register/doctor',
         {
                    username: FormValues.name,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    telephone: FormValues.number,
                    meeting_price: FormValues.price ,
                    university :FormValues.university,
                    specialization : FormValues.specialization,
                    entityName: props.entityname ,//Added
                    profilePic: FormValues.imageurl,
                    arabic_username:FormValues.arabicname,
                    arabic_specialization:FormValues.arabicdep
         }).then((res)=>{
           //setloading(true) 
           console.log(res.data);
           console.log(props.changeadd)
           //props.changeadd(FormValues);  //go to the list
           props.setloading_true(); // to make loading till get doctors done
           props.goback();
           props.Get_Doctors_Api(props.entityname);
                     
         }).catch(function (err) {
            
    if (err.response) {   
        setloading(false)   
      if (err.response.data==="email already exist")
      {
      const errors = {};      
      errors.Email = "Doctor email already exist"
      setFormerrors(errors);}
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
        if (name === 'specialization')
        {
            switch(value){
                case 'Psychiatry' :
                    FormValues.arabicdep = '???????? ????????????'
                break;
                case 'Dermatology (Skin)' :
                    FormValues.arabicdep = '??????????????'
                break;
                case 'Cardiologist' :
                    FormValues.arabicdep = '??????????'
                break;
                case 'Respiratory(Chest) Medicine' :
                    FormValues.arabicdep = '?????????? ?? ????????????'
                break;
                case 'Dietetics' :
                    FormValues.arabicdep = '??????????????'
                break;
                case 'Urology' :
                    FormValues.arabicdep = '?????????? ??????????'
                break;
                case 'Pediatrics' :
                    FormValues.arabicdep = '???? ??????????????'
                break;

            }
        } 
         setFormvalues({...FormValues, [name] : value});
         if (name === "Image")
         {
             console.log(e.target.files[0]);
             setImageValue(e.target.files[0])
              //setFormvalues({...FormValues, [name] : value});
         }

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
                errors.name="Doctor English Name is required!";  
            }
        if (!values.arabicname)
            {
                errors.arabicname="Doctor Arabic Name is required!";  
            }    
        
        if (!values.number)
            {
                errors.number="Number is required!";  
            }
        if (!values.price)
            {
                errors.price="Meeting Price is required!";  
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
       if (!values.university )
            {
                
                errors.university="Doctor university is required!";  
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
            setloading(true)
            //empty
            if(FormValues.Image)
            {
            uploadFiles(Image_Value) }//The image
            else{Add_doctor_api()}
            console.log(FormValues)
            setissubmit(true);

            //Add_doctor_api();     
            
        }
      }
    return (
        
 <>
     
          {!loading?(
    <div>
    <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 80px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
  <Row>
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Doctor </p>
     <Col>
    
    <Form.Group className="mb-3" controlId="formGridName">
      <Form.Label>Doctor Name English</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.name} name="name" type="text" placeholder="Enter Doctor English name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.name}</p>
    </Form.Group>

        <Form.Group className="mb-3" controlId="formGridArabicName">
      <Form.Label>Doctor Name Arabic</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.arabicname} name="arabicname" type="text" placeholder="Enter Doctor Arabic name" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.arabicname}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridNumber">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="number" placeholder="Enter Contact number" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
    </Form.Group>

      <Form.Group className="mb-3" controlId="formGridspecial">
      <Form.Label>Specialization</Form.Label>
  <Form.Select aria-label="Default select example2" defaultValue="Select Doctor Specialization" name="specialization" value={FormValues.specialization} onChange={(e)=>handlechange(e)}>      
  <option selected disabled hidden>Select Doctor Specialization</option>
  <option >Psychiatry</option>
  <option >Dermatology (Skin)</option>
  <option >Cardiologist</option>
  <option >Respiratory(Chest) Medicine</option>
  <option >Dietetics</option>
   <option >Urology</option>
  <option >Pediatrics</option>
</Form.Select>     
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.specialization}</p>
    </Form.Group>
 <Form.Group  className="mb-3" controlId="formGridimage">
    <Form.Label>Doctor Image</Form.Label>
    
         <Form.Control onChange={(e)=>handlechange(e)}  name="Image" type="file" placeholder="Enter Doctor image " />
    {/*(Image_Value==="") ?(
    <Form.Control onChange={(e)=>handlechange(e)}  name="Image" type="file" placeholder="Enter Admin image " />):
    ( <><Form.Control onChange={(e)=>handlechange(e)}  name="Image" type="file" placeholder="Enter Admin image " />*/}
   { !(Image_Value==="") && <p style={{padding:'0',marginTop:'6px'}} >{Image_Value.name}</p> }
  
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

        <Form.Group className="mb-3" controlId="formGridprice">
      <Form.Label>Meeting Price</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.price} name="price" type="number" placeholder="Enter Meeting Price" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.price}</p>
    </Form.Group>
    
<Form.Group  className="mb-3" controlId="formGridGender">
    <Form.Label>Gender</Form.Label>
  <Form.Select aria-label="Default select example" defaultValue="Select Doctor Gender" name="Gender" value={FormValues.Gender} onChange={(e)=>handlechange(e)}>      
  <option>Select Doctor Gender</option>
  <option >Male</option>
  <option >Female</option>
</Form.Select>
<p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Gender}</p>

        <Form.Group className="mb-9" controlId="formGriduniversity">
      <Form.Label>Doctor University</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.university} name="university" type="text" placeholder="Enter Doctor University" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.university}</p>
    </Form.Group>


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
   </div>):(
         <div style={{ 'position': 'absolute',  'top': '50%', 'left': '60%',  'margin': '-25px 0 0 -25px'}}>
                <Spinner animation="border" variant="primary" />
              </div>
   )}
  </>
       
    )
}
