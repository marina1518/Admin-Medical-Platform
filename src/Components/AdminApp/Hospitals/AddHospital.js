import React from 'react'
import AddEntity from '../Entity/AddEntity';
import axios from 'axios'
function AddHospital(props) {

    const Add_hospital_api = (FormValues)=>{
        const errors = {};
            axios.post('https://future-medical.herokuapp.com/registration/hospitalAdmin',
         {
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    hospitalname : FormValues.Hospitalname,
                    address : FormValues.Location ,
                    telephone : FormValues.number
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all hospitals
           return errors;           
         })
         .catch(function (error) {
       if (error.response) {
      //Formerrors.Admin = "the hospital or doctor already exist" ;
      console.log(error.response.data);
      console.log(error.response.status);      
      errors.hospitalname = "the hospital or admin already exist"
      return errors ; 
      //setFormerrors(errors);
    }
})
    }  
  return (
    <div>
     <AddEntity Add_hospital_api={Add_hospital_api} entity='hospitals' goback={props.goback}/>
    </div>
  )
}

export default AddHospital