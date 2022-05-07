import  React,{useState,useEffect} from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Components/Table/Table';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import Adddoctor from '../Doctors/AddDoctor';
import Editdoctor from '../Doctors/EditDoctor';
//import './HospitalAdmin.css'
function DoctorsList() {

      const token = JSON.parse(useSelector(state => state.auth)) //state of token 
console.log(token)
   //const { decodedToken, isExpired } = useJwt(token.token);
    //console.log(decodedToken);
  var [data,setdata] = useState([]) //FROM API HOSPITALS LIST 

//const [data,setdata] = useState([]) 
let admin = {};
var doctors_list = JSON.parse(JSON.stringify(data));
let doctor = {} ;

const Get_Doctors_Api = async (hospitalname)=>{
 try {
        const res = await axios.get(`https://future-medical.herokuapp.com/entity/${hospitalname}/doctors`)
        const data = await res.data;
        console.log(data)
        if (data === 'this entity has no doctors right now') 
        {return }
        let i = 1 
        data.forEach((x) => {
                
                doctor.name = x.username;
                doctor.id = i;                
                doctor.Email = x.email;
                doctor.specialization = x.specialization;
                doctor.number = x.telephone[0];
                doctors_list.push(doctor);
                doctor={}
                ++i;
          });
        setdata(doctors_list);  
    } 
    catch (err) {
        console.error(err);
    }
} 

useEffect(()=>{
 Get_Doctors_Api(token.entity.name);
},[])  

const [viewedit,setedit]=useState(true) //WHEN FALSE SHOW COMPONENT ADD HOSPITAL 
    const [viewadd,setadd]=useState(true)  //WHEN FALSE SHOW COMPONENT EDIT HOSPITAL
    const [editdata,seteditdata]=useState({}); //EDITED DATA FOR HOSPITAL 

    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF HOSPITAL
        console.log(props);
        setedit(false); //GO TO EDIT PAGE
  }
  
  const goback=()=>{
    setedit(true);
    setadd(true);
  }
  const changeedit = (editedhospital)=>{
    //WHEN SUBMIT EDIT HOSPITAL FORM 
     var requiredid = editedhospital.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editedhospital); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO HOSPITALS LIST]
  }
    const changeadd = (newhospital)=>{
      //WHEN SUBMIT ADD HOSPITAL FORM 
      var lastid = 0 ; 
        var updatedlist = JSON.parse(JSON.stringify(data));
        if (updatedlist.length == 0){ lastid = 0} //To make the first has id = 1
        else{lastid = updatedlist[updatedlist.length - 1].id;}        
        console.log(lastid);
        newhospital.id=(parseInt(lastid)+1).toString();
        updatedlist.push(newhospital);
        //Static update list       
        setdata(updatedlist); 
        setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO HOSPITALS LIST]
  }     
   
   const handleDelete = (id)=>{
     //API DELETE Hospital
     console.log(id);
     setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }
  const columns = [
    {
    field: 'id',
    headerName: 'Number',
    width: 130,
   
  },
  {
    field: 'name',
    headerName: 'Doctor Name',
    width: 200,
    
  },
  {
    field: 'number',
    headerName: 'Contact Number',
    width: 190,
    
  },
    {
    field: 'Email',
    headerName: 'Doctor Email',
    width: 220,
   
  },
  {
    field: 'specialization',
    headerName: 'Specialization',
    
    width: 200,

  },
   {
      field: "action",
      headerName: "Action" ,
      width: 150,
      renderCell: (params) => {
        return (
          <>       
              {/*<Button variant="outline-primary" onClick={() => handleEdit(params.row)}>Edit</Button>*/}
             <DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row.id)}
                               
            />
          </>
        );
      },
    }
];
  return (
    <div>
     {/*viewedit && viewadd && <h3 className="spec-title" style={{color:'#06a3da' , marginTop:'15px' , textAlign:'center' }}><strong>Doctors List</strong></h3>*/}
      
    <div style={{ height: 540, width: '90%' , margin: '1rem 2rem' ,marginBottom:'60px' }}>
     {viewedit && viewadd && <Table rows={data} columns={columns}></Table> }
    {!viewedit && <Editdoctor editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd && <Adddoctor changeadd={changeadd} goback={goback} entityname={token.entity.name}/>}      
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{marginTop:'10px'}}>Add Doctor</Button>  }

    </div>
    </div>
  )
}



export default DoctorsList