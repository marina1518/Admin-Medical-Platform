import React,{useState,useEffect} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
//import {Form,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux';


function EditModal(props) {
 

    useEffect(()=>{
        //INITIAL STATES
        setFormvalues({ price:props.Doctor.price})
        setFormerrors({});      
        setissubmit(false);
    },[props.show])
    const token = JSON.parse(useSelector(state => state.auth)) //state of token 

        const Edit_Price_api = (doctor_email , entity_name)=>{
        console.log(FormValues.Adminl)  
            axios.patch('https://future-medical.herokuapp.com/admin/doctor/edit/price',
         {
                   
                    email: doctor_email,
                    price : FormValues.price,
         },{
            headers: {
          'Authorization': `Bearer ${token.token}`
          }
         }).then((res)=>{
           console.log(res.data);
           props.onHide(); //CLOSE 
           props.Get_Doctors_Api(entity_name)
           //var copy_doc = props.Doctor ;
           //copy_doc.price = FormValues.price;
           //props.changeedit(copy_doc);
                     
         })
         .catch(function (error) {
       if (error.response) {
      //Formerrors.Admin = "the hospital or doctor already exist" ;
      console.log(error.response.data);
      console.log(error.response.status);      
    }
})
    }


    const [FormValues, setFormvalues ] = useState({price:props.Doctor.price});
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
               if (!values.price )
            {
                
                errors.price="Meeting Price is required!";  
            }  
        return errors ;
    }

        const submithandle =(e)=>{
        e.preventDefault();
        console.log(e)
        
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty

            //Add_doctor_api()
            console.log(FormValues)
            setissubmit(true);
            Edit_Price_api(props.Doctor.Email,props.Entity_Name); 
            //Add_doctor_api();     
            
        }
    }

    console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            
          Edit Meeting Price 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
<Form onSubmit={submithandle} className="rounded p-4" style={{padding:'0'}} >
              <Form.Group className="mb-3" controlId="formGridName">
      <Form.Label>Meeting Price For Doctor {props.Doctor.name}</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.price} name="price" type="text" placeholder="Enter Meeting Price" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.price}</p>
    </Form.Group>
<Button variant="outline-primary" type='submit' >Submit </Button>
</Form>
      </Modal.Body>
     {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
  </Modal.Footer>*/}
    </Modal>
  );
}
export default EditModal