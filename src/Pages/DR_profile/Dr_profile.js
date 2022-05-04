import React , {useState, useEffect} from "react";
import { Alert ,Button,ButtonGroup,ListGroup, Stack , Table,Card, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from '@material-ui/core/Avatar';
import BackupIcon from '@material-ui/icons/Backup';
import {BsInfoCircleFill} from 'react-icons/bs';
//import {AiOutlineComment} from 'react-icons/bi';
import {AiFillClockCircle,AiOutlineComment} from 'react-icons/ai';
import {MdAdd} from 'react-icons/md';
import {MdOutlineDoneOutline,MdOutlineDone,MdCancel,MdDelete} from 'react-icons/md';
import {RiSubtractLine} from 'react-icons/ri';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { signin } from "../../actions";
import SideBarUI from "../../Components/SideBarUI/SideBar";
import "./profileui.css";
import { blueGrey } from "@material-ui/core/colors";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Time from '../../Components/inc_dec/file';
const DoctorProfile =()=>{
  const dispatch = useDispatch();  

  const [showinfo, setShowinfo] = useState(false);
  const [showreviews, setShowReviews] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const [showtimetable, setshowTimetable] = useState(false);
  

  const sideBarhandler = (btn) => {
    if (btn === "info") {
      setShowinfo(true);
      setShowReviews(false);
      setShowAppointment(false);
      setshowTimetable(false);
      
    } else if (btn === "reviews") {
      setShowinfo(false);
      setShowReviews(true);
      setShowAppointment(false);
      setshowTimetable(false);
     
    } else if (btn === "appointment") {
      setShowinfo(false);
      setShowReviews(false);
      setShowAppointment(true);
      setshowTimetable(false);
     
    }
    else if (btn === "timetable") {
      
      setShowinfo(false);
      setShowReviews(false);
      setShowAppointment(false);
      setshowTimetable(true);
     
    }
    
  };

  const [compact, setCompact] = useState(false);

  const compacthandler = () => {
    setCompact(!compact);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setCompact(true);
      } else if (window.innerWidth > 1065) {
        setCompact(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


const location = useLocation();
  const [Docid, setdoctorid] = useState(location.state ? location.state : "");
  console.log(Docid);
  const token = JSON.parse(useSelector(state => state.auth));
  console.log(token);
  

  const config = {headers: {'Authorization': `Bearer ${token.token}`}};

  

   const [add,setadd] = useState(0);
   const [day, setday] = useState("");
   var [from , setfrom] =useState(0);
   var [to, setto] = useState(0);
  
  var token_copy = token;
  const add_slot = ()=>{
    const data = {day:`${day}`, from:`${from}:00`, to:`${to}:00`};
    Set_timetable(data);
    token_copy.timetable.push({day:`${day}`, from:`${from}:00`, to:`${to}:00`});
    dispatch(signin(token_copy));  //update the state
    }

    const Set_timetable = async (slot)=>{
      try {
            const res = await axios.patch(`https://future-medical.herokuapp.com/doctor/timetable`, slot, config)
            const data = await res.data;
            console.log(data);
            
        } 
        catch (err) {
            console.error(err);
        }
  
    }
  
    
  var meetings=[];
  const current = new Date();
  let state;
  for(var i=0;i<token.meetings.length;i++)
  {
    const day = (token.meetings[i].Date).split('-');
    if(parseInt(day[2])<current.getFullYear()) state = 'Done'; //year check
    else if (parseInt(day[2])>current.getFullYear()) state = 'Pending'; //next year
    else if ((parseInt(day[1])<current.getMonth()+1) ) state = 'Done'; //month check
    else if ((parseInt(day[1])===current.getMonth()+1) && (parseInt(day[0])<current.getDate()) ) state = 'Done'; //month check
    else if ((parseInt(day[1])===current.getMonth()+1) && (parseInt(day[0])===current.getDate()) && (parseInt(day[2])===current.getFullYear())) state= 'Today'; 
    else state = 'Pending';
    meetings.push({id:i, patient:token.meetings[i].user.username, slot:token.meetings[i].slot, date:token.meetings[i].Date, state:state})
 
  }



    //edit
    const Edit_personal_info = async (info)=>{
      try {
             const res = await axios.patch('https://future-medical.herokuapp.com/doctor/edit/info' ,info,config)
              alert(res.data);
             console.log(res.data);
           
         } 
         catch (err) {
             console.error(err);
         }
     }

     const Edit_profile_pic = async (url)=>{
      try {
             const res = await axios.patch('https://future-medical.herokuapp.com/doctor/edit/photo' ,{profilePic:url},config)
              alert(res.data);
             console.log(res.data);
           
         } 
         catch (err) {
             console.error(err);
         }
     }

  
    
    const [username, setusername] = useState(null);
    const [email, setemail] = useState(null);
    const [gender, setGender] = useState(null);
    const [date, setDob] = useState(null);
    const [phone, setphone] = useState("");
    const [bio2, setbio] = useState(null);
   const [edit,setEdit]=useState(false);
  const [edit_photo,setEdit_photo]=useState(false);
     const [ phone_error, setphone_error]=useState("");
   const editted = {};
  var Edit_data={};
   const setdata=()=>{
        editted.username=username;
        editted.gender=gender;
        editted.bio=bio2;
        editted.date=date;
        editted.phone=phone;
        editted.email=email;
       
        
    if (editted.username !== null) {
      Edit_data.username=editted.username; 
      token_copy.username = editted.username;
    }
    if (editted.bio !== null) {
      Edit_data.bio=editted.bio;
      token_copy.bio = editted.bio;
     
    }
    if (editted.email !== null) {
      Edit_data.email=editted.email;
      token_copy.email = editted.email;
     
    }
    if (editted.date !== null)  
    {Edit_data.dateOfBirth=editted.date; 
    token_copy.dateOfBirth=editted.date;
    
  }
    if (editted.gender !== null)
    { Edit_data.gender=editted.gender; 
    token_copy.gender=editted.gender;
    
    }
    if (editted.phone !== null)
    { 
      if(editted.phone.length === 11 )
      {Edit_data.telephone=editted.phone; 
    token_copy.telephone.push(editted.phone);}
    else{
      setphone_error("invalid phone number")
    }
    
    }
    console.log(Edit_data);
    dispatch(signin(token_copy));
    Edit_personal_info(Edit_data);
    Edit_data={};
        setEdit(false);
        setphone_error("");
   }
   const [temp,edit_pic_temp]=useState("");
   const edit_pic =  (file) =>{
    if (!file) return
    console.log(file)
    console.log(file.name)
    const storageRef = ref(storage,`/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file);
     uploadTask.on("state_changed",()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          Edit_profile_pic(url);
           token_copy.profilePic=url;
           dispatch(signin(token_copy));
        }).catch((err)=>{console.log(err)})
    })
    }



  return (
    <div className="main-container">
      <SideBarUI compact={compact} oncompact={compacthandler}>
        <div>
          <div className="image-container">
            <Avatar
              className="profile_img"
              src={token.profilePic}
              sx={{ width: 50, height: 50, bgcolor: blueGrey[400] }}
            />
            
              <h3>{token.username}</h3>
            
          </div>
          </div>
        <div className="sidebar-links">
          <li onClick={() => sideBarhandler("info")}>
          <i class="bi bi-info-circle-fill"></i>
            {compact ? "" : <span> Personnal Info</span>}
          </li>
          <li onClick={() => sideBarhandler("reviews")}>
            <i class="bi bi-chat-left-text-fill"></i>
            {compact ? "" : <span> Reviews</span>}
          </li>
          <li onClick={() => sideBarhandler("appointment")}>
            <i class="bi bi-clock-fill"></i>
            {compact ? "" : <span> Appointments</span>}
          </li>
          <li onClick={() => sideBarhandler("timetable")}>
          <i class="bi bi-bandaid-fill"></i>
            {compact ? "" :  <span> Timetable</span>}
          </li>
        </div>
      </SideBarUI>
      <main>
        <div className="profile-container">
          {showinfo ? (
            <div className="card">
              <div className="card-header bg-transparent">
                <h3 className="mb-0">
                  <BsInfoCircleFill /> Personal Information
                   
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={(e) => setEdit(true)}
                    ></EditIcon>
                  
                </h3>
               
              </div>
              <div className="card-body pt-0">
                <div className="row personnal-image">
                  <Avatar
                    className="profile_img"
                    src={token.profilePic}
                    onClick={(e) => setEdit_photo(!edit_photo)}
                    sx={{ width: 70, height: 70, bgcolor: blueGrey[400] }}
                  />
                  {edit_photo ? (
                    <>
                    <input className="edit-photo" type="file"  onChange={(e)=>edit_pic_temp(e.target.files[0])}></input>
                   
                      <ButtonGroup>
                        <Button
                          variant="outline-success"
                          className="col-md-12 text-right"
                          onClick={(e)=>{edit_pic(temp);setEdit_photo(false);}}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="col-md-12 text-right"
                          onClick={(e) => setEdit_photo(false)}
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>
                      </>
                  ) : (
                    ""
                  )}
                  {edit ? 
                  <input
                  style={{ cursor: "pointer" }}
                  placeholder={token.username}
                  type="text"
                  onChange={(e) => setusername(e.target.value)}
                ></input>
               : 
                <h3 style={{textAlign:'center'}}>{token.username}</h3>
                }
                   
                </div>
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">                     
                  {edit ? 
                  <input
                  style={{ cursor: "pointer" }}
                  placeholder={token.email}
                  type="text"
                  onChange={(e) => setemail(e.target.value)}
                ></input>
               : 
                token.email
                }
                  </div>
                </div>
                {/* <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Address</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        placeholder={token.address}
                        onChange={(e) => setadd(e.target.value)}
                      ></input>
                    ) : (
                      token.address
                    )}
                  </div>
                </div> */}
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">University</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  {token.university}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Specialization</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  {token.specialization}
                  </div>
                </div>
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">
                      
                    {token.entity_id.flag === 'H' && "Hospital	Name"}
                {token.entity_id.flag === 'C' && "Clinic	Name"}
                    </h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  {token.entity_id.name}
                  </div>
                </div>

                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Phone Number</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                  {edit ? <input placeholder={token.telephone[0]} type="text" onChange={(e)=>{
                    setphone(e.target.value);
                    if ((phone.length !== 11 && phone.length !==0 && edit)) setphone_error("invalid phone number");
                  
                  }}></input>:
                token.telephone.map(t=> <>{t}</>)}
               {(phone.length !== 11 && phone.length !==0 && edit)  ? <h6 style={{color:"red"}}>{phone_error}</h6> :"" }
                  </div>
                </div>
                
                {/* <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Data of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <input
                        style={{ cursor: "pointer" }}
                        placeholder={token.dateOfBirth.split('T')[0]}
                        type="date"
                        onChange={(e) => setDob(e.target.value)}
                      ></input>
                    ) : (
                      token.dateOfBirth.split('T')[0]
                    )}
                  </div>
                </div> */}
                <hr id="profile-hr" />
                <div class="row mt-3">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">
                    {edit ? (
                      <div>
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          id="gender1"
                          name="gender"
                          value="Male"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label for="gender1"> Male</label>
                        <br />
                        <input
                          style={{ cursor: "pointer" }}
                          type="radio"
                          id="gender2"
                          name="gender"
                          value="Female"
                          onChange={(e) => setGender(e.target.value)}
                        ></input>
                        <label for="gender2"> Female</label>
                      </div>
                    ) : (
                      token.gender
                    )}
                  </div>
                </div>
              
               
                {edit ? (
                  <ButtonGroup>
                    <Button
                      variant="outline-success"
                      className="col-md-12 text-right"
                      onClick={setdata}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="col-md-12 text-right"
                      onClick={(e) => setEdit(false)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  ""
                )}
                {/* {edit ? <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>setEdit(false)}>Cancel</Button>:""} */}
              </div>
            </div>
          ) : (
            ""
          )}
          {showreviews ? 
          
          
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
     
          : 
            ""
          }
        </div>
        {showAppointment ? (
          <div className="card">
            <div className="card-header bg-transparent border-0">
              <h3 className="mb-0">
                <AiFillClockCircle /> Appointments
              </h3>
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
                      meetings.lenght === 0 ? "":
                      <>
                      {meetings.map((item) => (
                        <tr key={item.id}>
                          <td width="33%">{item.date}</td>
                          <td width="33%">{item.slot}</td>
                          <td width="33%">{item.patient}</td>
                          <td width="33%">{item.state}</td>
                          </tr>
                      ))}
                      </>
                    }
                    
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}



{showtimetable ? 
          <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            
            <h3 className="mb-0"><AiFillClockCircle /> Set Timetable  
            <button style={{cursor:"pointer", borderRadius:"50%", background:"white", border:"None"}} onClick={()=>setadd(1)}><AddCircleIcon/></button>
              </h3>
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
                    <td width="33%"><Time setfrom={setfrom}/></td>
                    <td width="33%"><Time setto={setto}/></td>
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
                    <tr key={item._id}>
                    <td width="33%">{item.day}</td>
                    <td width="33%">{item.from}</td>
                    <td width="33%">{item.to}</td>
                     <td width="33%"> <Button variant="outline-danger" ><MdDelete/></Button></td>
                  </tr>
                  )
              }
       
     </tbody>
   </Table>
   </div>
  
          </div>
        </div>
                           


         : 
          ""
        }

      </main>
    </div>
  );
};

export default DoctorProfile;
