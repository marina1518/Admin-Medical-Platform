import React from 'react'
import AddEntity from '../Entity/AddEntity';
import axios from 'axios'
function AddClinic(props) {

 const Add_clinic_api = (FormValues)=>{
     const errors ={};
            axios.post('https://future-medical.herokuapp.com/registration/clinicAdmin',
         {
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    clinicname : FormValues.clinicname,
                    address : FormValues.Location ,
                    telephone : FormValues.number
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all clinics
           return errors;
         }).catch(function (error) {
    if (error.response) {    
      console.log(error.response.data);
      console.log(error.response.status);
      //const errors = {};  
      errors.clinicname = "the clinic or admin already exist"
      //setFormerrors(errors);
      return errors;
    }
})
    }   
  return (
    <div>
     <AddEntity Add_clinic_api={Add_clinic_api} entity='clinics' goback={props.goback}/>
    </div>
  )
}

export default AddClinic