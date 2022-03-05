import React from 'react'
import AddEntity from '../Entity/AddEntity';
import axios from 'axios'
function AddPharmacy(props) {

 const Add_pharmacy_api = (FormValues)=>{
   //console.log("in api")
   const errors = {};
            axios.post('https://future-medical.herokuapp.com/registration/pharmacyAdmin',
         {
                    username: FormValues.Admin,
                    email : FormValues.Email,
                    password : FormValues.Password,
                    gender : FormValues.Gender,
                    pharmacyname : FormValues.pharmacyname,
                    address : FormValues.Location ,
                    telephone : FormValues.number
         }).then((res)=>{
           console.log(res.data);
           props.changeadd(FormValues);  //go to all pharmacies
           return errors          
         }).catch(function (error) {
    if (error.response) {      
      console.log(error.response.data);
      console.log(error.response.status);
            
      errors.pharmacyname = "the pharmacy or admin already exist"
      //setFormerrors(errors);
      return errors;
    }
})
    }  
  return (
    <div>
     <AddEntity Add_pharmacy_api={Add_pharmacy_api} entity='pharmacies' goback={props.goback}/>
    </div>
  )
}

export default AddPharmacy