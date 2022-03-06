import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../Firebase';
export default function AddEntity(props) {
   
    const [FormValues, setFormvalues ] = useState({}); //FORM VALUES 
    const [Formerrors, setFormerrors ] = useState({}); //ERROR 
    const [issubmit, setissubmit ] = useState(false);  //SUBMITTED OR NOT 
    

const Add_hospital_api = ()=>{
        console.log(FormValues.Admin)  
            axios.post('https://future-medical.herokuapp.com/register/hospitalAdmin',
         {
                   
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    profilePic : FormValues.imageurl,
                    hospitalname : FormValues.Hospitalname,
                    address : FormValues.Location ,
                    telephone : FormValues.number ,
                   
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all hospitals
           //return errors;           
         })
         .catch(function (error) {
       if (error.response) {
      //Formerrors.Admin = "the hospital or doctor already exist" ;
      console.log(error.response.data);
      console.log(error.response.status);      
      const errors = {};
      errors.hospitalname = "the hospital or admin already exist"
      setFormerrors(errors);
    }
})
    }  

const Add_pharmacy_api = ()=>{
            axios.post('https://future-medical.herokuapp.com/register/pharmacyAdmin',
         {
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    profilePic : FormValues.imageurl,
                    pharmacyname : FormValues.pharmacyname,
                    address : FormValues.Location ,
                    telephone : FormValues.number
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all pharmacies
                    
         }).catch(function (error) {
    if (error.response) {      
      console.log(error.response.data);
      console.log(error.response.status);
      const errors = {};            
      errors.pharmacyname = "the pharmacy or admin already exist"
      setFormerrors(errors);
      
    }
})
    }

const Add_clinic_api = ()=>{
     
            axios.post('https://future-medical.herokuapp.com/register/clinicAdmin',
         {
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    profilePic : FormValues.imageurl,
                    clinicname : FormValues.clinicname,
                    address : FormValues.Location ,
                    telephone : FormValues.number
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all clinics
          
         }).catch(function (error) {
    if (error.response) {    
      console.log(error.response.data);
      console.log(error.response.status);
      const errors = {};  
      errors.clinicname = "the clinic or admin already exist"
      setFormerrors(errors);
      //return errors;
    }
})
    }

    //console.log(props);
    
    const handlechange = (e)=>{
         const name = e.target.name ;
         const value = e.target.value ;
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
             //if it already submitted , so if change happen make the validation to remove the error
            setFormerrors(validate({...FormValues, [name] : value}))
         }       
    }
    function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (props.entity === "hospitals" )
        {
          if (!values.Hospitalname)
             {
                errors.hospitalname="Hospital Name is required!";  
             }
        }
        else if (props.entity === "clinics" )
        {
          if (!values.clinicname)
             {
                errors.clinicname="Clinic Name is required!";  
             }
        }
        else if (props.entity === "pharmacies" )
        {
          if (!values.pharmacyname)
             {
                errors.pharmacyname="Pharmacy Name is required!";  
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
       if (values.Gender ==="Select Admin Gender" || !values.Gender )
            {
                
                errors.Gender="Admin Gender is required!";  
            }     
        //console.log(values.Gender)
        return errors ;
    }
const uploadFiles =  (file) =>{
if (!file) return
const storageRef = ref(storage,`/files/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef,file);
 uploadTask.on("state_changed",()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url); // saved in database
        FormValues.imageurl = url; 
        
        if (props.entity === 'hospitals')
        {Add_hospital_api();  }//API ADD HOSPITAL
        else if (props.entity === 'clinics') 
        {Add_clinic_api() ;} //API ADD CLINIC
        else if (props.entity === 'pharmacies')
        {Add_pharmacy_api() ;} //API ADD PHARMACY
    }).catch((err)=>{console.log(err)})
})
}


        const submithandle = async (e)=>{
        //when submit the form     
        e.preventDefault();
        console.log(e);
        setFormerrors(validate(FormValues)) //check the errors 
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            //setfile(e.target[7].files[0]); //The image
            if (FormValues.Image)
            {uploadFiles(e.target[7].files[0])} //The image[Calling The Api(ada entity)]
            else {
                      if (props.entity === 'hospitals')
                      {Add_hospital_api() ; }//API ADD HOSPITAL
                       else if (props.entity === 'clinics') 
                      {Add_clinic_api() ;} //API ADD CLINIC
                       else if (props.entity === 'pharmacies')
                       {Add_pharmacy_api() ;} //API ADD PHARMACY
            }
            setissubmit(true);            
            console.log(FormValues)
            
            
        }
      }
    return (
        <div>
    <Form onSubmit={(e)=>submithandle(e)} className="rounded p-4" style={{ margin : '80px 20px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
  <Row>
      
    {props.entity === 'hospitals' && <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Hospital </p>}
    {props.entity === 'clinics' && <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Clinic </p>}
    {props.entity === 'pharmacies' && <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Pharmacy </p>}
    <Col>
    {props.entity === 'hospitals' && <h6><strong>Hospital Information</strong></h6>}
    {props.entity === 'clinics' && <h6><strong>Clinic Information</strong></h6>}
    {props.entity === 'pharmacies' && <h6><strong>Pharmacy Information</strong></h6>}
    <Form.Group className="mb-3" controlId="formGridName">
      {props.entity === 'hospitals' &&<Form.Label>Hospital Name</Form.Label>}
      {props.entity === 'clinics' &&<Form.Label>Clinic Name</Form.Label>}
      {props.entity === 'pharmacies' &&<Form.Label>Pharmacy Name</Form.Label>}

    {props.entity === 'hospitals' &&  <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.hospitalname} name="Hospitalname" type="text" placeholder="Enter Hospital name" />}
    {props.entity === 'clinics' &&  <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.clinicname} name="clinicname" type="text" placeholder="Enter Clinic name" />}
    {props.entity === 'pharmacies' &&  <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.pharmacyname} name="pharmacyname" type="text" placeholder="Enter Pharmacy name" />}
      
    {props.entity === 'hospitals' &&  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.hospitalname}</p>}
    {props.entity === 'clinics' &&  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.clinicname}</p>}
    {props.entity === 'pharmacies' &&  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.pharmacyname}</p>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridNumber">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.number} name="number" type="number" placeholder="Enter Contact number" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
    </Form.Group>
  

  <Form.Group  className="mb-3" controlId="formGridAdmin">
    <Form.Label>Admin Name</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Admin} name="Admin" type="string" placeholder="Enter Admin name " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Admin}</p>
  </Form.Group>

    <Form.Group  className="mb-3" controlId="formGridLocation">
    <Form.Label>Location</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Location} name="Location" type="string" placeholder="Enter the locaion of the clinic " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Location}</p>
  </Form.Group>
  </Col>
  <Col>
      <h6><strong>Admin Account Information</strong></h6>
      <Form.Group  className="mb-3" controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Email} name="Email" type="email" placeholder="Enter Admin's Email " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Email}</p>
  </Form.Group>

  <Form.Group  className="mb-3" controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Password} name="Password" type="password" placeholder="Enter Admin's Password " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Password}</p>
  </Form.Group>

<Form.Group  className="mb-3" controlId="formGridGender">
    <Form.Label>Gender</Form.Label>
  <Form.Select aria-label="Default select example" defaultValue="Select Admin Gender" name="Gender" value={FormValues.Gender} onChange={(e)=>handlechange(e)}>      
  <option>Select Admin Gender</option>
  <option >Male</option>
  <option >Female</option>
</Form.Select>
<p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.Gender}</p>
  </Form.Group>
 <Form.Group  className="mb-3" controlId="formGridimage">
    <Form.Label>Admin Image</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.Image} name="Image" type="file" placeholder="Enter Admin image " />
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
