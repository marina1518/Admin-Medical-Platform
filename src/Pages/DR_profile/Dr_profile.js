import React , {useState, useEffect} from "react";
import './profile.css';
import { Alert ,Button,ButtonGroup,ListGroup, Stack , Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import BackupIcon from '@material-ui/icons/Backup';
import {BsInfoCircleFill} from 'react-icons/bs';
//import {AiOutlineComment} from 'react-icons/bi';
import {AiFillClockCircle,AiOutlineComment} from 'react-icons/ai';
import {MdAdd} from 'react-icons/md';
import {MdOutlineDoneOutline,MdOutlineDone,MdCancel} from 'react-icons/md';
import {RiSubtractLine} from 'react-icons/ri';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {GiNotebook} from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { signin } from "../../actions";


const DoctorProfile =()=>{
  
  const location = useLocation();
  const [Docid, setdoctorid] = useState(location.state ? location.state : "");
  console.log(Docid);
  const token = JSON.parse(useSelector(state => state.auth));
  console.log(token);
  const dispatch = useDispatch();

  const config = {headers: {'Authorization': `Bearer ${token.token}`}};

  const Set_timetable = async (data)=>{
    try {
          const res = await axios.patch(`https://future-medical.herokuapp.com/doctor/timetable`, data, config)
          const data = await res.data;
          console.log(data);
          
      } 
      catch (err) {
          console.error(err);
      }

  }


   const [add,setadd] = useState(0);
   const [day, setday] = useState("");
   var [from , setfrom] =useState(0);
   var [to, setto] = useState(0);
   

   const inc1 = ()=>{
     from+=1;
     if (from <=24)
     {
      setfrom(from);
      console.log(from)
     }
     else if (from === 24 || from > 24 )
     {
      from =24; 
      setfrom(24);
       
       console.log(from)
     }
     
   };
   const inc2 = ()=>{
    to+=1;
    if (to <=24)
    {
     setto(to);
     console.log(to)
    }
    else  if (to === 24 || to > 24 )
    {
      to =24; 
      setto(24);
      console.log(to)
    }
    
  };

  const dec1 = ()=>{
    from-=1;
    if (from >=0)
    {
     setfrom(from);
    }
    else if (from ===0 || from <0 )
    {
     from =0;
      setfrom(0);
    }
    
  };

  const dec2 = ()=>{
    to-=1;
    if (to >=0)
    {
     setto(to);
    }
    else  if (to ===0 || to <0 )
    {
      to = 0;
      setto(0);
    }
    
  };
  
  var token_copy = token;
  const add_slot = ()=>{
    const data = {day:`${day}`, from:`${from}:00`, to:`${to}:00`};
    Set_timetable(data);
    token_copy.timetable.push({day:`${day}`, from:`${from}:00`, to:`${to}:00`});
    dispatch(signin(token_copy));  //update the state
    }



    //edit
    let user_data={};
    let user_data2={};
    const [clinic_add, setclinic] = useState(null);
    const [clinic_name,setclinic_name] = useState(null);
    const [spec, setspec] = useState(null);
    const [hos, sethosp] = useState(null);
    const [uni, setuni] = useState(null);
    const [gender, setGender] = useState(null);
    const [date, setDob] = useState(null);
    const [c_ph, setc_ph] = useState(null);
    const [p_ph, setp_ph] = useState(null);
    //const [history, setHistory] = useState(null);
   const [edit,setEdit]=useState(false);
 
  const [edit_photo,setEdit_photo]=useState(false);

  const [edit_data,seteditdata]=useState(user_data2);
 
 
   const editted = {...user_data2};
  
   const setdata=()=>{
       
        editted.clinic_add=clinic_add;
        editted.clinic_name=clinic_name;
        editted.edu=spec;
        editted.gender=gender;
        editted.name_hospital=hos;
        editted.university=uni;
        editted.date=date;
        editted.clinic_phone=c_ph;
        editted.personal_phone=p_ph;
        
       
        
        if (editted.clinic_add!==null) user_data.clinic_add=editted.clinic_add;
        if (editted.edu!==null) user_data.edu=editted.edu;
        if (editted.date!==null) user_data.date=editted.date;
        if (editted.gender!==null) user_data.gender=editted.gender;
        if (editted.name_hospital!==null) user_data.name_hospital=editted.name_hospital;
        if (editted.university!==null) user_data.university=editted.university;
        if (editted.clinic_phone!==null) user_data.clinic_phone=editted.clinic_phone;
        if (editted.personal_phone!==null) user_data.personal_phone=editted.personal_phone;
        console.log(user_data);
        console.log(editted);
        //edit=false;
        seteditdata(user_data); //edit in database
        setEdit(false);
   }

    return(

        <div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
             
          <div className="card-header bg-transparent text-center">

           
           <Avatar style={{ cursor: "pointer"}} className="profile_img" src={token.profilePic} onClick={(e)=>{setEdit_photo(true)}}/>
           
                     
           {edit_photo ? <input type="file"></input>:""}
          
          
            <h3>Dr {token.username}</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Email: </strong>{token.email}</p>
            
          </div>
          </div>



         





          <br/>
          <div styled="height: 26px"></div>
          <div className="card shadow-sm">
             
             <div className="card-header bg-transparent">
             <p className="mb-0"><strong className="pr-1"> <AiOutlineComment /> Reviews: </strong></p>
             <br/>
             {
                 token.reviews.map((r=>
                    <ListGroup variant="flush">
                        <div>
                        <ListGroup.Item> {r}</ListGroup.Item>
                        </div>
                        <br/>
                    
                   
                  </ListGroup>
                    ))
             }
           
              
              

</div>


        </div>
      </div>
     

      <br/>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><BsInfoCircleFill /> Personal Information 
            
              <EditIcon style={{ cursor: "pointer"}} onClick={(e)=>setEdit(true)}></EditIcon>
            
            </h3>  
            {/* <Button variant="outline-secondary">Secondary</Button> 
            <svg data-testid="EditIcon"></svg>
            */}
            
          </div>
          <div className="card-body pt-0">
            <table className="table table-bordered">
              <tr>
                <th width="30%">Specialization   </th>
                <td width="2%">:</td>
                <td>{edit ? <input type="text" placeholder={token.specialization} onChange={(e)=>setspec(e.target.value)}></input>:token.specialization}</td>
              </tr>
              <tr>
                <th width="30%">University	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.university} type="text" onChange={(e)=>setuni(e.target.value)}></input>:edit_data.university}</td>
              </tr>
              <tr>
                {token.entity_id.flag === 'H' && <th width="30%">Hospital	Name</th>}
                {token.entity_id.flag === 'C' && <th width="30%">Clinic	Name</th>}
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={token.entity_id.name} type="text" onChange={(e)=>sethosp(e.target.value)}></input>:token.entity_id.name}</td>
              </tr>
              
            
                <tr>
                <th width="30%">Personal Phone Number	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={token.telephone[0]} type="text" onChange={(e)=>setp_ph(e.target.value)}></input>:token.telephone[0]}</td>
              </tr>
              <tr>
                <th width="30%">Date of Birth	</th>
                <td width="2%">:</td>
                <td>{edit ? <input style={{ cursor: "pointer"}} placeholder={edit_data.date} type="date" onChange={(e)=>setDob(e.target.value)}></input>:edit_data.date}</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>{edit ? <div>
                    <input style={{ cursor: "pointer"}} type="radio" id="gender1" name="gender" value="Male" onChange={(e)=>setGender(e.target.value)} />
                    <label for="gender1"> Male</label><br/>
                    <input style={{ cursor: "pointer"}} type="radio" id="gender2" name="gender" value="Female"  onChange={(e)=>setGender(e.target.value)}></input>
                    <label for="gender2"> Female</label>
                </div>:token.gender}</td>
              </tr>
              
              
              <br/>
              
            </table>
            {edit ? 
              <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={setdata}>Submit</Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>
              </ButtonGroup>
              :""} 
              {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
             
          </div>
        </div>
       
         <div>
                              <br/>
                              
                              
                              <div styled="height: 26px"></div>
                              
                            <div className="card shadow-sm">
                              <div className="card-header bg-transparent border-0">
                                
                                <h3 className="mb-0"><AiFillClockCircle /> Appointments</h3>
                              </div>
                              <div className="card-body pt-0">



                              <div>






                      <Table responsive="sm">
                      <thead>
                      <tr>
                                    <th width="30%">Date</th>
                                    <th width="30%">Time</th>
                                    <th width="30%">Patient Name</th>
                                    
                                    <th width="30%">State</th>
                                    
                                  </tr>
                      </thead>
                      <tbody>

                      {
                                      token.meetings.map((item)=>
                                        <tr key={item.id}>
                                        <td width="33%">{item.Date}</td>
                                        <td width="33%">{item.slot}</td>
                                        <td width="33%">{item.user}</td>
                                        <td width="33%">{item.status}</td>
                                        {/* <td width="33%">{item.status==="pending" ? 
                                          <Button variant="outline-danger" ><CancelIcon/></Button>
                                       
                                        
                                        :item.state==="today" ? 
                                        <Alert variant="danger" >
                                        Today
                                      </Alert>
                                        :"Done"}</td> */}
                                        
                                      </tr>
                                      )
                                  }

                      </tbody>
                      </Table>
                      </div>

                              </div>
                            </div> 



                            
       <br/>
         
        
         <div styled="height: 26px"></div>
         
       <div className="card shadow-sm">
         <div className="card-header bg-transparent border-0">
           
           <h3 className="mb-0"><AiFillClockCircle /> Set Timetable  <button onClick={(e)=>setadd(1)}>  <MdAdd/></button>  </h3>
         </div>
         <div className="card-body pt-0">
         <div>


         {
                add === 1 ? 
                <ListGroup variant="flush" >
                <div>
                <ListGroup.Item > 
                <tr key="0">
                   <td width="33%"><div>
                    <select onChange={(e)=>setday(e.target.value)} className="ll">
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                       
                    </select>
                </div></td>
                   <td width="33%"><button onClick={inc1}><MdAdd/></button><label>{from}</label><button onClick={dec1}><RiSubtractLine/></button></td>
                   <td width="33%"><button onClick={inc2}><MdAdd/></button><label>{to}</label><button onClick={dec2}><RiSubtractLine/></button></td>
                   <td width="33%">
                   <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>{setadd(0); add_slot()}}><MdOutlineDone/></Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setadd(0)} ><MdCancel/></Button>
              </ButtonGroup>
                   </td>
                   </tr>
                </ListGroup.Item>
                </div>
                <br/>
            
           
          </ListGroup>

              
             : ""
              }

        

  <Table responsive="sm">
    <thead>
    <tr>
         <th width="35%">Day</th>
               {/* <th width="30%">Date</th> */}
               <th width="33%">From</th>
               <th width="33%">To</th> </tr>
    </thead>
    <tbody>
      {
        token.timetable.length ===0 ?  
        <Alert  variant="danger">
       Please enter your weekly timetable.
      </Alert> :""
      }
    {
                 token.timetable.map((item)=>
                   <tr key={item.id}>
                   <td width="33%">{item.day}</td>
                   <td width="33%">{item.from}</td>
                   <td width="33%">{item.to}</td>
                    <td width="33%"> <Button variant="outline-danger" ><CancelIcon/></Button></td>
                   {/* <td width="33%">{item.state==="pending" ? <Button variant="outline-danger" onClick={(e)=>remove(e,item.id)}><CancelIcon/></Button>
                   
                   :item.state==="today" ? 
                   <Alert variant="danger" >
                  Today
                 </Alert>
                   :"Done"}</td> */}
                  
                 </tr>
                 )
             }
      
    </tbody>
  </Table>
  </div>
 
         </div>
       </div>
                            </div>
                            

 

      </div>
    </div>
  </div>
</div>

    )
}
export default DoctorProfile;