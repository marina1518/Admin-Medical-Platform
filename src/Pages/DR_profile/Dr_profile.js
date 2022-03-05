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
import { Icon123 } from "react-bootstrap-icons";
import axios from 'axios';
import { useSelector } from "react-redux";
import {GiNotebook} from 'react-icons/gi';
import { useLocation } from 'react-router-dom'


const Clinicdoctor =()=>{
  
  const location = useLocation();
  const [Docid, setdoctorid] = useState(location.state ? location.state : "");
  console.log(Docid);
//   var user_data = {
//     email:"",
//     username:"",
//     gender:"",
//     date:"",
//     pic:"https://source.unsplash.com/600x300/?student",
//    personal_phone:"",
//    name_hospital:"",
//     edu:"",
//     university:"",
//     clinic_add:"",
//     clinic_phone:"",

// };
const [user_data, setuser_data] = useState(
   
    {email:"",
    username:"",
    gender:"",
    date:"",
    pic:"https://source.unsplash.com/600x300/?student",
   personal_phone:"",
   name_hospital:"",
    edu:"",
    university:"",
    clinic_name:"",
    clinic_add:"",
    clinic_phone:"",}


);
// const [app,setapp] = useState(
//  [ {id:"",date:"",time:"", dr_name:"",state:""} ]
       
// );
let user_data2 = {};
let app3 = {};
let app2 = [];
  const token = useSelector(state => state.auth);
  console.log(token.token);
  const Get_info_api=()=>{
    return new Promise ((resolve,reject)=> {
      axios.get("https://future-medical.herokuapp.com/profile",
      {
       headers: {
        'Authorization': `Bearer ${token.token}`
      }
    }
     ).then((res)=>{
       console.log(res.data);
      // setuser_data()
       user_data2.email = res.data.email;
       user_data2.username = res.data.username;
       user_data2.spec = res.data.specialization;
       user_data2.name_hospital = res.data.entity_name;
      //  for(var i=0; i<res.data.meetings; i++)
      //  {
      //     app3.id = i;
      //     app3.date = 
      //  }
      //  for(var i=0; i<res.data.timetable; i++)
      //  {
         
      //  }
      // user_data2.gender = res.data.admin.gender;
      //  user_data2.clinic_name = res.data.entity.name;
      //  user_data2.clinic_add = res.data.entity.address[0];
      //  user_data2.clinic_phone = res.data.entity.telephone[0];
       user_data2.pic = res.data.icon;

       //setuser_data(user_data);
       resolve(user_data2);
     }).catch((err) =>{
       console.log(err);
       reject(err);
     });
    })
    
  };
  useEffect(()=>{
    Get_info_api().then((res)=>{console.log(res); setuser_data(res);})   
   },[]) 




 
    
    const app=[
        {id:"0",date:"25/12/2021",time:"10:00", dr_name:"kk",state:""},
        {id:"1",date:"15/2/2022", time:"10:00" , dr_name:"mm",state:""},
        {id:"2",date:"16/2/2022", time:"10:00", dr_name:"ll",state:""},
        {id:"3",date:"25/3/2022", time:"10:00", dr_name:"ll",state:""},
        {id:"4",date:"29/2/2022", time:"10:00", dr_name:"ll",state:""}
    ];
    const reviews=[
      {id:"0", review:"gllllllllllllllll iiiiiiiiiiiiiiiiiiiiiiii bbbbbbbbbbbbbbbbbbbbbbbbbbbbb"},
      {id:"1", review:"c"},
    ];
    const current = new Date();
    console.log(current.getFullYear());
    const today_date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    console.log(today_date);
    // for (var i = 0; i < Object.keys(app).length; i++) {
    //    if(app.date[i]>=today_date) app.state="pending";
    //    else app.state="done";
    //   }
    //   console.log(app);
   
    for(let a in app){
        console.log(`${app[a].date} `);
        const day = (app[a].date).split('/');
        console.log(day[2]);
        // if (app[a].date === today_date) app[a].state="today";
        // else if(app[a].date < today_date) app[a].state="done";
        // //else if(today_date.isAfter(app[a].date)) app[a].state="done";
        // else app[a].state="pending";
        if (parseInt(day[0]) === parseInt(current.getDate()) && parseInt(day[1]) === parseInt(current.getMonth()+1) && parseInt(day[2]) === parseInt(current.getFullYear()) ) app[a].state="today";
        else if(parseInt(day[0]) < parseInt(current.getDate()) && parseInt(day[1]) <= parseInt(current.getMonth()+1) || parseInt(day[2]) < parseInt(current.getFullYear()) ) app[a].state="done";
       
        else app[a].state="pending";
     }
     console.log(app);
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
   const [newapp,setnewapp]=useState(app);
   
   console.log(newapp);
   const remove=(e,id)=>{
    const newp = newapp.filter((item)=> item.id !== id );
    setnewapp(newp);
   }

   const my_timetable = [
     {id:"0",day:"sun" , from:"12:00", to:"13:00"},
     {id:"1",day:"sun" , from:"12:00", to:"13:00"}
   ];
   const [newtime, setnew_time] = useState(my_timetable);
   const remove_time =(e,id)=>{
    const newp = newtime.filter((item)=> item.id !== id );
    setnew_time(newp);
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
  const [enlarge, setenlarge] = useState(false);
  const add_slot = ()=>{
    const len = newtime.length;
   var get_id = parseInt(newtime[len-1].id);
   get_id+=1;
   newtime.push({id:`${get_id}` , day:`${day}`, from:`${from}:00`, to:`${to}:00`});
   console.log(newtime);

  }

    return(

        <div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
             
          <div className="card-header bg-transparent text-center">

            {/* <img className="profile_img" src={user_data.pic} alt="student dp"/> */}
            {/* <Avatar className="profile_img"  alt="Remy Sharp" src="/broken-image.jpg" >
                B
            </Avatar> */}
           {/* <div>
               
           <Avatar className="profile_img" src="/broken-image.jpg" />
           <Button onClick={(e)=>setEdit_photo(true)}>
           <BackupIcon ></BackupIcon> upload
           </Button>
           {edit_photo ? <input type="file"></input>:""}
           
           </div> */}
           <Avatar style={{ cursor: "pointer"}} className="profile_img" src="/broken-image.jpg" onClick={(e)=>{
             if (token.usertype === "user") 
             {
               setenlarge(true);
             }
             else 
            { setEdit_photo(true);}

            } } />
           
           {edit_photo ? <input type="file"></input>:""}
           { enlarge ? 
           
                 <div id="myModal" class="modal">


<span class="close">&times;</span>


<img class="modal-content" id="img01"/>


<div id="caption"></div>
              </div>  :""
          }
            
          
          { (token.usertype=== "doctor") ? <h3>Dr {user_data.username}</h3> : <h3>Dr</h3>}
          </div>
          <div className="card-body">
            { (token.usertype=== "doctor") ?<p className="mb-0"><strong className="pr-1">Email: </strong>{user_data.email}</p> : <p className="mb-0"><strong className="pr-1">Email: </strong></p>}    
            
          </div>
          </div>



         





          <br/>
          <div styled="height: 26px"></div>
          <div className="card shadow-sm">
             
             <div className="card-header bg-transparent">
             <p className="mb-0"><strong className="pr-1"> <AiOutlineComment /> Reviews: </strong></p>
             <br/>
             {
                 reviews.map((r=>
                    <ListGroup variant="flush">
                        <div>
                        <ListGroup.Item> {r.review}</ListGroup.Item>
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
            {
              token.usertype === "patient" ? "" : <EditIcon style={{ cursor: "pointer"}} onClick={(e)=>setEdit(true)}></EditIcon>
            }
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
                <td>{edit ? <input type="text" placeholder={edit_data.edu} onChange={(e)=>setspec(e.target.value)}></input>:edit_data.edu}</td>
              </tr>
              <tr>
                <th width="30%">University	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.university} type="text" onChange={(e)=>setuni(e.target.value)}></input>:edit_data.university}</td>
              </tr>
              <tr>
                <th width="30%">Hospital	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.name_hospital} type="text" onChange={(e)=>sethosp(e.target.value)}></input>:edit_data.name_hospital}</td>
              </tr>
              {
                token.usertype === "doctor" ? 
                
                <tr>
                <th width="30%">Clinic Name	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.clinic_name} type="text" onChange={(e)=>setclinic_name(e.target.value)}></input>:edit_data.clinic_name}</td>
              </tr>

                :""
              }
               {
                token.usertype === "doctor" ? 
                
                <tr>
                <th width="30%">Clinic Address	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.clinic_add} type="text" onChange={(e)=>setclinic(e.target.value)}></input>:edit_data.clinic_add}</td>
              </tr>

                :""
              }

              {
                token.usertype === "doctor" ? 
                
                <tr>
                <th width="30%">Clinic Phone Number	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.clinic_phone}  type="tel" name="telefono" pattern="\([0-9]{3}\) [0-9]{3}[ -][0-9]{4}" onChange={(e)=>setc_ph(e.target.value)}></input>:edit_data.clinic_phone}</td>
              </tr>

                :""
              }


            
                <tr>
                <th width="30%">Personal Phone Number	</th>
                <td width="2%">:</td>
                <td>{edit ? <input placeholder={edit_data.personal_phone} type="text" onChange={(e)=>setp_ph(e.target.value)}></input>:edit_data.personal_phone}</td>
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
                </div>:edit_data.gender}</td>
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
       {
         token.usertype === "user" ? "" :
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
                                      newapp.map((item)=>
                                        <tr key={item.id}>
                                        <td width="33%">{item.date}</td>
                                        <td width="33%">{item.time}</td>
                                        <td width="33%">{item.dr_name}</td>
                                        <td width="33%">{item.state==="pending" ? 
                                          <Button variant="outline-danger" onClick={(e)=>remove(e,item.id)}><CancelIcon/></Button>
                                        // <Button variant="outline-danger" onClick={(e)=>remove(e,item.id)}><CancelIcon/></Button>
                                        
                                        :item.state==="today" ? 
                                        <Alert variant="danger" >
                                        Today
                                      </Alert>
                                        :"Done"}</td>
                                        
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
        newtime.length ===0 ?  
        <Alert  variant="danger">
       Please enter your weekly timetable.
      </Alert> :""
      }
    {
                 newtime.map((item)=>
                   <tr key={item.id}>
                   <td width="33%">{item.day}</td>
                   <td width="33%">{item.from}</td>
                   <td width="33%">{item.to}</td>
                    <td width="33%"> <Button variant="outline-danger" onClick={(e)=>remove_time(e,item.id)}><CancelIcon/></Button></td>
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
                            }


       

   {
     token.usertype === "user" ? 
     
<div>

<br/>
  
 
  <div styled="height: 26px"></div>
  
<div className="card shadow-sm">
  <div className="card-header bg-transparent border-0">
    
    <h3 className="mb-0"><GiNotebook/> Reserve your meeting </h3>
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
          newtime.map((item)=>
            <tr key={item.id}>
            <td width="33%">{item.day}</td>
            <td width="33%">{item.from}</td>
            <td width="33%">{item.to}</td>
             <td width="33%"> <Button variant="outline-success" className="col-md-12 text-right" >Reserve</Button></td>
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
</div> :""
   }

      </div>
    </div>
  </div>
</div>

    )
}
export default Clinicdoctor;