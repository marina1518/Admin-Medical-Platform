import  React,{useState,useEffect} from 'react';

import { DeleteOutline } from "@material-ui/icons";
import Table from '../../Components/Table/Table';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'; 
import {Button,ButtonGroup,Row,Col,Form} from 'react-bootstrap';
import Adddoctor from '../../Components/Doctors/AddDoctor';
import Editdoctor from '../../Components/Doctors/EditDoctor';

const Clinic_admin =()=>{
  const token = useSelector(state => state.auth);
  console.log(token);
  var [dr,setdr] = useState([])


const[dr_details,setDr_details]=useState([]);
var doctors_list = JSON.parse(JSON.stringify(dr));
let doctor = {} ;
    /*const Get_Doctors_Api = (clinic_name)=>{
      return new Promise ((resolve,reject)=>{
      axios.get(`https://future-medical.herokuapp.com/doctors/${clinic_name}`).then((res)=>{

            console.log(res.data)
            for(var i = 0 ; i < res.data.length ; i++ )
            {
                
                doctor.username = res.data[i].username;
                doctor.id = i;                
                doctor.email = res.data[i].email;
                doctor.specialization = res.data[i].specialization;
                doctors_list.push(doctor);
                doctor={}
               
            }
            resolve(doctors_list);
            
          
            
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
      })

      
    }*/
    const Get_Doctors_Api = async (clinicname)=>{
      try {
             const res = await axios.get(`https://future-medical.herokuapp.com/entity/${clinicname}/doctors`)
             const data = await res.data;
             console.log(data)
             if (data === 'this entity has no doctors right now') 
             {return }
             data.forEach((x) => {
                     
                     doctor.name = x.username;
                     doctor.id = x.email;                
                     doctor.Email = x.email;
                     doctor.specialization = x.specialization;
                     doctor.number = x.telephone[0];
                     doctors_list.push(doctor);
                     doctor={}
               });
               setDr_details(doctors_list);  
         } 
         catch (err) {
             console.error(err);
         }
     } 

const [info , setinfo] = useState({
  email:"",
  username:"",
  gender:"",
  clinic_name:"",
  clinic_phone:"",
  pic:"https://source.unsplash.com/600x300/?student",
  address:""
});

let admin_data={};
/*const Get_Admin_info =()=>{  

//console.log(token.token)
return new Promise ((resolve,reject)=>{
axios.get('https://future-medical.herokuapp.com/profile', {
 headers: {
  'Authorization': `Bearer ${token.token}`
}
})
.then((res) => {  
console.log(res.data)
admin_data.username = res.data.admin.username;
admin_data.clinic_phone = res.data.entity.telephone[0];
admin_data.email = res.data.admin.email;
admin_data.gender = res.data.admin.gender;
admin_data.clinic_name = res.data.entity.name;
admin_data.clinic_add = res.data.entity.address[0];
resolve(admin_data);
Get_Doctors_Api(res.data.entity.name).then((res)=>{console.log(res); setdr(res) }); 
console.log(dr);
})
.catch((error) => {
console.error(error)
reject(error);
})})}*/

useEffect(()=>{
/*Get_Admin_info().then((res)=>{console.log(res); setinfo(res)})   */
Get_Doctors_Api(token.entity.name);
},[])   


const [edit_photo,setEdit_photo]=useState(false);
const [edit,setEdit] = useState(false);
const [clinic_add, setclinic] = useState(null);
const [clinic_name,setclinic_name] = useState(null);
const [gender, setGender] = useState(null);
const [p_ph, setp_ph] = useState(null);
const [edit_data,seteditdata]=useState(admin_data);
const editted = {...admin_data};
const setdata=()=>{
       
  editted.clinic_add=clinic_add;
  editted.clinic_name=clinic_name;
  editted.gender=gender;
 
  editted.personal_phone=p_ph;
  
 
  
  if (editted.clinic_add!==null) info.clinic_add=editted.clinic_add;
  
  if (editted.gender!==null) info.gender=editted.gender;
 
  if (editted.personal_phone!==null) info.personal_phone=editted.personal_phone;
 
  console.log(info);
  console.log(editted);
  //edit=false;
  seteditdata(info); //edit in database
  setEdit(false);
}

const [add_dr, setadd_dr] =useState(false);
const [view, setview] =useState(true);


const data = [
  {email: "", password : "" , specialization:"", gender:"", phone:"",  username:"",id:""}
];

/*const Add_doctor_api = ()=>{

axios.post('https://future-medical.herokuapp.com/registration/doctor',
{
           username: data.username,
           email : data.email,
           password : data.password,
           gender : data.gender,
           specialization : data.specialization,
           entityName:"joy clinic"
          
}).then((res)=>{
  console.log(res.data);
  //Get_Doctors_Api(res.data.entity.name).then((res)=>{console.log(res); setdr(res) });
 
            
}).catch(function (error) {
if (error.response) {      
console.log(error.response.data);
console.log(error.response.status);

}
})
}  */
/*const changeadd = () =>{
  setview(true);
  setadd_dr(false);
}*/
const changeadd = (newhospital)=>{
  //WHEN SUBMIT ADD HOSPITAL FORM 
    var updatedlist = JSON.parse(JSON.stringify(dr_details));
    const lastid = updatedlist[updatedlist.length - 1].id;
    console.log(lastid);
    newhospital.id=(parseInt(lastid)+1).toString();
    updatedlist.push(newhospital);
    //Static update list       
    setDr_details(updatedlist); 
    setview(true);
    setadd_dr(false); //AFTER SUBMIT ADD FORM [GET BACK TO HOSPITALS LIST]
} 
const goback = () =>{
  setview(true);
  setadd_dr(false);
}
const changeedit = (editedhospital)=>{
  //WHEN SUBMIT EDIT HOSPITAL FORM 
   var requiredid = editedhospital.id ;
   console.log(requiredid);
   var updatedlist = JSON.parse(JSON.stringify(dr_details));
   updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
   //console.log(updatedlist);
   updatedlist.push(editedhospital); //add edited one 
  // console.log(updatedlist);
   //Static update list       
   setDr_details(updatedlist); 
   setview(true);
    setadd_dr(false); //AFTER SUBMIT EDIT FORM [GET BACK TO HOSPITALS LIST]
}


const [email_d, setEmail_d] = useState("");
const [password_d, setPassword_d] = useState("");
const [phone_d,setphone_d]=useState("");
const [username_d,setusername_d]=useState("");
const [spec_d,setspec_d] = useState("");
const [gender_d, setgender_d] = useState("");
const [e_u,sete_u] = useState("");
const [e_p,sete_p] = useState("");
const [e_s,sete_s] = useState("");
const [e_g,sete_g] = useState("");
const [e_e,sete_e] = useState("");
const [e_ph,sete_ph] = useState("");
// const [flag,setflag] = useState("false");
//const [newdata,setnewdata] = useState(doctors_list);
var newdata2=[...dr];
const submit_value =(e) => {
    e.preventDefault();
    var flag = 0;
    //submit(email,password); 
    if (username_d === "")
    {
      flag=1;
      sete_u("!! required username");
      
    }
    if (spec_d === "")
    {
      flag=1;
      sete_s("!! required specialization");
      
    }
    if (gender_d === "")
    {
      flag=1;
      sete_g("!! required gender");
      
    }
    if (email_d === "")
    {
      flag=1;
      sete_e("!! required Email");
      
    }
    if (password_d === "")
    {
      flag=1;
      sete_p("!! required Password");
      //setflag("true");
      console.log(flag);
    }
    if (password_d.length < 8 && password_d != "")
    {
      flag=1;
      sete_p("!! at least 8 numbers or charaters");
      //setflag("true");
      console.log(flag);
    }
    if (phone_d.length < 8 && phone_d != "")
    {
      flag=1;
      sete_ph("!! required 11 numbers");
      //setflag("true");
      console.log(flag);
    }
    
    if (phone_d === "")
    {
      flag=1;
      sete_ph("!! required Phone Number");
      //setflag("true");
    }
    console.log(flag);
    if (flag === 0)
    {
     
      data.email=email_d;
        data.password=password_d;
        data.phone=phone_d;
        data.specialization=spec_d;
        data.gender=gender_d;
        data.username=username_d;
        var id1 = doctors_list.length -1;
        data.id = id1;
        newdata2.push(data);
        setdr(newdata2);
       setview(true);
       setadd_dr(false);
      // seteditdata(false);
      
        //Add_doctor_api();
        
    }      
    
   
};
const [f,setf]=useState(0);
const submit_edit =(e) => {
  e.preventDefault();
  var flag = 0;
 
 
  
  if (phone_d.length < 8 && phone_d != "")
  {
    flag=1;
    sete_ph("!! required 11 numbers");
    //setflag("true");
    console.log(flag);
  }
  
  
  console.log(flag);
  if (flag === 0)
  {
   
    data.email=email_d;
      
      data.phone=phone_d;
      data.specialization=spec_d;
      data.gender=gender_d;
      data.username=username_d;
     // var id1 = doctors_list.length -1;
     // data.id = id1;
     // newdata2.push(data);
      //setdr(newdata2);
     setview(true);
     setadd_dr(false);
     seteditdr(false);
    setf(1);
    //  Add_doctor_api();}

    if (data.username !== ""){
      rowdata.username = data.username;}
      if (data.email !== ""){
        rowdata.email = data.email;}
        if (data.phone !== ""){
          rowdata.phone = data.phone;}
          if (data.specialization !== ""){
            rowdata.specialization = data.specialization;}
            if (data.gender !== ""){
              rowdata.gender = data.gender;}
              console.log(rowdata);
              console.log(data);
      
  }      
  
 
};


const [editdr,seteditdr] = useState(false);
const [rowdata, setrow] =useState("");
const edit_dr=(row)=>{
  console.log(row);
  setrow(row);
  // if (f===1)
  // {
   
  //             setf(0);
  // }
    seteditdr(true);
    setview(false);
}

const remove=(id)=>{
  const newp = dr.filter((item)=> item.id !== id );
    setdr(newp);
}



const columns = [

  {
    field: 'name',
    headerName: 'Doctor Name',
    width: 220,
    editable: true,
  },
  {
    field: 'number',
    headerName: 'Contact Number',
    width: 190,
    editable: true,
  },
    {
    field: 'Email',
    headerName: 'Doctor Email',
    width: 230,
    editable: true,
  },
  {
    field: 'specialization',
    headerName: 'Specialization',
    editable: true,
    width: 210,

  },
   {
      field: "action",
      headerName: "Action" ,
      width: 150,
      renderCell: (paramas) => {
        return (
          <>       
              <Button variant="outline-primary" onClick={()=>edit_dr(paramas.row)} >Edit</Button>
             <DeleteOutline htmlColor='red' onClick={()=>remove(paramas.row.id)} style={{cursor:'pointer' , marginLeft:'30px'}}
                               
            />
          </>
        );
      },
    }
];

  return (
    <>
   <div className="student-profile py-4" style={{width:'50%' ,margin: '0 auto'}}>
  <div className="container">       
        <div className="card shadow-sm">             
          <div className="card-header bg-transparent text-center">
          <Avatar style={{ cursor: "pointer" , height:'150px' , width: '150px'}} className="profile_img" src={token.profilePic} onClick={(e)=>setEdit_photo(true)} />
           {!token.profilePic ? <input type="file"></input>:""}
                
          <h3>{token.username} </h3>
          </div>
          <div className="card-body">
          <EditIcon style={{ cursor: "pointer" }} onClick={(e)=>setEdit(true)}></EditIcon>
       
          <p className="mb-0"><strong className="pr-1">Email:  </strong> {token.email} </p>  
          <p className="mb-0"><strong className="pr-1">Clinic Name: </strong>
          {edit ? <input type="text" placeholder={token.entity.name} onChange={(e)=>setclinic_name(e.target.value)}></input>
          : token.entity.name }</p>
            <p className="mb-0"><strong className="pr-1">Clinic Phone Number: </strong>  {edit ? <input type="text" placeholder={token.entity.telephone[0]} onChange={(e)=>setp_ph(e.target.value)}></input>
          : token.entity.telephone[0] } </p>               
           
            <p className="mb-0"><strong className="pr-1">Clinic Address: </strong> {edit ? <input type="text" placeholder={token.entity.address[0]} onChange={(e)=>setclinic(e.target.value)}></input>
          : token.entity.address[0] }</p>
                     <p className="mb-0"><strong className="pr-1">Gender: </strong> 
                     {edit ? <div>
                    <input style={{ cursor: "pointer"}} type="radio" id="gender1" name="gender" value="Male" onChange={(e)=>setGender(e.target.value)} />
                    <label for="gender1"> Male</label><br/>
                    <input style={{ cursor: "pointer"}} type="radio" id="gender2" name="gender" value="Female"  onChange={(e)=>setGender(e.target.value)}></input>
                    <label for="gender2"> Female</label>
                </div>:token.gender}
                      </p>  
                      <br/>
                      {edit ? 
              <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={setdata}>Submit</Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>
              </ButtonGroup>
              :""} 
          </div>     
      </div>
     </div>
      </div>
      
      
    
    {/* {viewedit && viewadd && <h3 className="spec-title" style={{color:'#06a3da' , marginTop:'15px' , textAlign:'center' }}><strong>Doctors List</strong></h3>} */}
      
    <div style={{ height: 540, width: '80%' , margin: '0 auto' ,marginBottom:'60px' }}>


    
      
     {view ? 
     
     <>
        <Table rows={dr_details} columns={columns}></Table>
        <Button variant="primary" onClick={(e)=>{setadd_dr(true); setview(false);}} style={{marginTop:'10px'}}>Add Doctor</Button>
         </>
     :""}

    {
        add_dr ? 
        
       /* <div>
        <Form className="rounded p-4" style={{ margin : '80px 80px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
         <Row>
           <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Add Doctor </p>
            <Col>
           
           <Form.Group className="mb-3" controlId="formGridEmail">
             <Form.Label>Doctor Name</Form.Label>
             <Form.Control onChange={(e)=>{setusername_d(e.target.value); sete_u("");}} value={data.username} name="name" type="text" placeholder="Enter Doctor name" />
             <h6 style={{color:"red"}}>{e_u}</h6>
           </Form.Group>
       
           <Form.Group className="mb-3" controlId="formGridPassword">
             <Form.Label>Contact Number</Form.Label>
             <Form.Control onChange={(e)=>{setphone_d(e.target.value); sete_ph("");}} value={data.phone} name="number" type="number" placeholder="Enter Contact number" />
             <h6 style={{color:"red"}}>{e_ph}</h6>
           </Form.Group>
             <Form.Group className="mb-3" controlId="formGridspecial">
             <Form.Label>Specialization</Form.Label>
         <Form.Select aria-label="Default select example2" defaultValue="Select Doctor Specialization" name="specialization" value={data.specialization} onChange={(e)=>{setspec_d(e.target.value); sete_s("");}}>      
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
       <h6 style={{color:"red"}}>{e_s}</h6>
           </Form.Group>
         </Col>
         <Col>
            
             <Form.Group  className="mb-3" controlId="formGridAddress1">
           <Form.Label>Email</Form.Label>
           <Form.Control onChange={(e)=>{setEmail_d(e.target.value); sete_e("");}} value={data.email} name="Email" type="email" placeholder="Enter Doctor's Email " />
           <h6 style={{color:"red"}}>{e_e}</h6>
         </Form.Group>
       
         <Form.Group  className="mb-3" controlId="formGridAddress3">
             <Form.Label>Password</Form.Label>
           <Form.Control onChange={(e)=>{setPassword_d(e.target.value); sete_p("");}} value={data.password} name="Password" type="password" placeholder="Enter Doctor's Password " />
           <h6 style={{color:"red"}}>{e_p}</h6>
         </Form.Group>
       
       <Form.Group  className="mb-3" controlId="formGridAddress2">
           <Form.Label>Gender</Form.Label>
         <Form.Select aria-label="Default select example" defaultValue="Select Doctor Gender" name="Gender" value={data.gender} onChange={(e)=>{setgender_d(e.target.value); sete_g('');}}>      
         <option>Select Doctor Gender</option>
         <option >Male</option>
         <option >Female</option>
       </Form.Select>
       <h6 style={{color:"red"}}>{e_g}</h6>
         </Form.Group>
       
         </Col>
         </Row>
         <Row>
             <Col>
             <Button style={{width:'100%'}} variant="primary" type="submit" onClick={(e)=>{submit_value(e); }}> 
           Submit
         </Button>
         </Col>
         <Col>
           <Button style={{width:'100%'}} variant="primary" onClick={()=>{setadd_dr(false); setview(true);}}>
          Go back
         </Button>
         </Col>
         </Row>
         </Form>
               </div>*/
               <Adddoctor changeadd={changeadd} goback={goback} entityname={token.entity.name} />
        : ""}
        


        {
        editdr ? 
        
        /*<div>
        <Form className="rounded p-4" style={{ margin : '80px 80px' ,borderWidth:'1px',borderColor:'#06a3da' , borderStyle:'solid',width:'90%'} }>
         <Row>
           <p style={{textAlign: 'center',fontSize:'27px' , color :'#06a3da'} }> Edit Doctor </p>
            <Col>
           
           <Form.Group className="mb-3" controlId="formGridEmail">
             <Form.Label>Doctor Name</Form.Label>
             <Form.Control onChange={(e)=>{setusername_d(e.target.value);}} value={data.username} name="name" type="text" placeholder={rowdata.username}/>
            
           </Form.Group>
       
           <Form.Group className="mb-3" controlId="formGridPassword">
             <Form.Label>Contact Number</Form.Label>
             <Form.Control onChange={(e)=>{setphone_d(e.target.value); sete_ph("");}} value={data.phone} name="number" type="number" placeholder={rowdata.phone} />
           
           </Form.Group>
             <Form.Group className="mb-3" controlId="formGridspecial">
             <Form.Label>Specialization</Form.Label>
         <Form.Select aria-label="Default select example2" defaultValue={rowdata.specialization} name="specialization" value={data.specialization} onChange={(e)=>{setspec_d(e.target.value); sete_s("");}}>      
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
       
           </Form.Group>
         </Col>
         <Col>
            
             <Form.Group  className="mb-3" controlId="formGridAddress1">
           <Form.Label>Email</Form.Label>
           <Form.Control onChange={(e)=>{setEmail_d(e.target.value); }} value={data.email} name="Email" type="email" placeholder={rowdata.email} />
         
         </Form.Group>
       
        
       
       <Form.Group  className="mb-3" controlId="formGridAddress2">
           <Form.Label>Gender</Form.Label>
         <Form.Select aria-label="Default select example" defaultValue={rowdata.gender} name="Gender" value={data.gender} onChange={(e)=>{setgender_d(e.target.value); }}>      
         <option>Select Doctor Gender</option>
         <option >Male</option>
         <option >Female</option>
       </Form.Select>
      
         </Form.Group>
       
         </Col>
         </Row>
         <Row>
             <Col>
             <Button style={{width:'100%'}} variant="primary" type="submit" onClick={(e)=>{submit_edit(e); }}> 
           Submit
         </Button>
         </Col>
         <Col>
           <Button style={{width:'100%'}} variant="primary" onClick={()=>{seteditdr(false); setview(true);}}>
          Go back
         </Button>
         </Col>
         </Row>
         </Form>
               </div>*/
               <Editdoctor editdata={rowdata} changeedit={changeedit} goback={goback}/>
        
        : ""}
        
    
    </div>
    </>
  );
}
export default Clinic_admin;
