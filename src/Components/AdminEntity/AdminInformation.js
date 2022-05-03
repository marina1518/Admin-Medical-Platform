import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import './Adminentity.css';
import {  Button, ButtonGroup } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { BsInfoCircleFill } from "react-icons/bs";
import { signin } from '../../actions';
import {useSelector,useDispatch} from 'react-redux'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {storage} from '../../Firebase'
function AdminInformation() {

       const token = JSON.parse(useSelector(state => state.auth)) //state of token 
       var Copy_token = token ; //Toupdate redux state 
       console.log(token) 
       const dispatch = useDispatch();

const Edit_Admin_Api = async ()=>{
 try {
     console.log(FormValues)
        const res = await axios.patch('https://future-medical.herokuapp.com/admin/edit',
        {
              admin_username:FormValues.username,
              admin_email:FormValues.email,
              admin_profilePic:FormValues.imageurl,
              entity_name:FormValues.entityname,
              arabic_entity_name:FormValues.entitynamearabic,
              entity_address:FormValues.entityaddress,
              entity_telephone:FormValues.contactnumber,
              role:token.role
        } ,{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        console.log(data)
        if (data === "you edited your profile successfully")
        {
            setedit(false)
            Update_redux()
        }
//مستشفى الراعى الصالح        
        //set_model_response(data.response); //response out of model 
        //handle_response(data.response); //handle model response 
       
    } 
    catch (error) {
            if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);}
        console.error(error);
    }
} 
    
   
    const initial_state = {username:token.username , contactnumber : token.entity.telephone[0], entityname : token.entity.name,entityaddress: token.entity.address[0],email:token.email , entitynamearabic:token.entity.arabic_name ,imageurl : token.profilePic}
    const [edit,setedit]=useState(false)
    const [FormValues, setFormvalues ] = useState(initial_state);
    const [updatedpic,setupdatedpic] = useState({});
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);

const uploadFiles = (file) =>{
if (!file) return
const storageRef = ref(storage,`/files/admins/${file.name}`);
const uploadTask = uploadBytesResumable(storageRef,file);
uploadTask.on("state_changed",()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        console.log(url); // saved in database
        FormValues.imageurl = url; 
        Edit_Admin_Api();
        //Add_doctor_api(); 
    }).catch((err)=>{console.log(err)})
})
}
       const handlechange = (e)=>{
         
         const name = e.target.name ;
         const value = e.target.value ;
        // console.log(value);
         setFormvalues({...FormValues, [name] : value});
         if (name == "Image") {
             console.log(e.target.files[0])
             setupdatedpic(e.target.files[0])
    }
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
            console.log("yes")
        }
         
         //console.log(FormValues);
    }
function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!values.username)
            {
                errors.username="Admin Name is required!";  
            }
        
        if (!values.contactnumber)
            {
                errors.contactnumber="Contact Number is required!";  
            }
        else if (values.contactnumber.length !== 11)
        {
            errors.contactnumber = "This is not a valid phone number ";
        }      
        /*else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }*/
        
        if (!values.entityname)
            {
                errors.entityname="Entity name is required!";  
            }
        if (!values.email)
            {
                errors.email="Admin's Email is required!";  
            }
        else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }    
        if (!values.entitynamearabic)
            {
                errors.entitynamearabic="Entity name arabic is required!";  
            }   
        if (!values.entityaddress)
            {
                errors.entityaddress="Entity address is required!";  
            }       
        return errors ;
    }
    const Submit_edit=()=>{
        
        setFormerrors(validate(FormValues))
        console.log(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
             if(FormValues.Image){
                 
                 uploadFiles(updatedpic)
             }
             else{ Edit_Admin_Api(); }
        
        setissubmit(true);
        }
    }
    const Update_redux = ()=>{
        Copy_token.username = FormValues.username;
        Copy_token.profilePic=FormValues.imageurl;
        Copy_token.entity.telephone[0] = FormValues.contactnumber;
        Copy_token.entity.name = FormValues.entityname;
        Copy_token.entity.arabic_name = FormValues.entitynamearabic;
        Copy_token.entity.address[0] =FormValues.entityaddress;
        Copy_token.email = FormValues.email ;
        dispatch(signin(Copy_token));
    } 
    
    const handle_Cancel = ()=>{
         setedit(false)
         setFormerrors({}); //RETURN
         setFormvalues(initial_state);
    } 

  return (
    
           <div className="student-profile py-4" style={{width:'95%',margin:'0 1rem'}}>
  <div className="container">       
        <div className="card shadow-sm">             
        <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Information
                   
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setedit(true)} //edit
                    ></EditIcon>
                  
                </h3>
               
              </div>
          <div className="card-header bg-transparent text-center">
           <Avatar className="profile_img" style={{height:'150px',width:'150px'}} src={token.profilePic}  />
           {edit ? (<><span>Update profile pic </span><input type="file" onChange={(e)=>handlechange(e)}  name="Image"></input> </>) : ""} 
           {edit? <><br></br> 
           <br></br> </> :""}        
          { edit ? ( <input type="text" className='input-form' onChange={(e)=>handlechange(e)} defaultValue={FormValues.username} name="username" placeholder="Enter Doctor name"/>) : <h3> {token.username} </h3> } 
          <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.username}</p>
          </div>
          <div className="card-body">
            <span className="mb-0"><strong className="pr-1">Contact Number: </strong> </span> 
            {edit ? ( <input   className='input-form' type="number" onChange={(e)=>handlechange(e)} defaultValue={FormValues.contactnumber} name="contactnumber" placeholder="Enter Contact Number"/>) :<span> {token.entity.telephone[0]} </span>}  
            <p style={{padding:'0',margin:'0',color:'red',marginTop:'6px'}} >{Formerrors.contactnumber}</p>
            <br></br>            
            <span className="mb-0"><strong className="pr-1">{token.role === "h_admin" ?"Hospital Name English :" : "Clinic Name English:"} </strong></span>
            {edit ? ( <input  className='input-form' type="text" onChange={(e)=>handlechange(e)} defaultValue={FormValues.entityname} name="entityname" placeholder="Enter Entity name"/>) : <span> {token.entity.name} </span>}
            <p style={{padding:'0',margin:'0',color:'red',marginTop:'6px'}} >{Formerrors.entityname}</p>
            <br></br> 
            <span className="mb-0"><strong className="pr-1">{token.role === "h_admin" ?"Hospital Name Arabic :" : "Clinic Name Arabic:"} </strong></span>
            {edit ? ( <input  className='input-form' type="text" onChange={(e)=>handlechange(e)} defaultValue={FormValues.entitynamearabic} name="entitynamearabic" placeholder="Enter Entity name"/>) : <span> {token.entity.arabic_name} </span>}
            <p style={{padding:'0',margin:'0',color:'red',marginTop:'6px'}} >{Formerrors.entitynamearabic}</p>
            <br></br> 
            <span className="mb-0"><strong className="pr-1">{token.role === "h_admin" ?"Hospital Address :" : "Clinic Address :"} </strong> </span>
            {edit ? ( <input  className='input-form' type="text" onChange={(e)=>handlechange(e)} defaultValue={FormValues.entityaddress} name="entityaddress" placeholder="Enter Entity Address"/>) : <span> {token.entity.address[0]} </span>}   
            <p style={{padding:'0',margin:'0',color:'red',marginTop:'6px'}} >{Formerrors.entityaddress}</p>
            <br></br> 
            <span className="mb-0"><strong className="pr-1">Email:  </strong></span>    
            {edit ? ( <input className='input-form' type="text" onChange={(e)=>handlechange(e)} defaultValue={FormValues.email} name="email" placeholder="Enter Admin email"/>) : <span> {token.email}</span>}       
            <p style={{padding:'0',margin:'0',color:'red',marginTop:'6px'}} >{Formerrors.email}</p> 
          <br></br> 
         {edit && 
                  <ButtonGroup>
                    <Button variant="outline-success"  className="col-md-12 text-right" onClick={Submit_edit} >
                      Submit
                    </Button>
                    <Button variant="outline-danger" className="col-md-12 text-right" onClick={ handle_Cancel}>
                      Cancel
                    </Button>
                  </ButtonGroup>
               }
         
         </div>     
      </div>
     </div>
      </div>
  
  )
}

export default AdminInformation