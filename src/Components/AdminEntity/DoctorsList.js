import  React,{useState,useEffect} from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Components/Table/Table';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux'
import Adddoctor from '../Doctors/AddDoctor';
import Editdoctor from '../Doctors/EditDoctor';
import AlertDelete from '../AdminApp/AlertDelete/AlertDelete';
import EditModal from './EditModal';
import { async } from '@firebase/util';
import AlertActivate from '../AdminApp/AlertDelete/AlertActivate';
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
const [alert_delete , set_alert_delete] = useState(false);
const [alert_active , set_alert_active] = useState(false);

const [clicked_doc , set_clicked_doc] = useState({});
const [modalShow, setModalShow] = React.useState(false);
const [doctor_data , set_doctor_data] = useState({});
const Dectivate_Doctor_Api = async (doc_email)=>{
 try {
        const res = await axios.patch('https://future-medical.herokuapp.com/admin/doctor/deactivate',{
          email : doc_email 
        },{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        Get_Doctors_Api(token.entity.name) ; //IT WILL GET THE ACTIVE Doctors
        console.log(data)
      }
    catch (err) {
        console.error(err);
    }
}

const Activate_Doctor_Api = async (doctor_email)=>{
 try {
        const res = await axios.patch('https://future-medical.herokuapp.com/admin/doctor/activate',{
          email : doctor_email
        },{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        Get_Doctors_Api(token.entity.name) ; //IT WILL GET THE ACTIVE Doctors
        console.log(data)
      }
    catch (err) {
        console.error(err);
    }
} 

const Get_Doctors_Api = async (hospitalname)=>{
 try {
        const res = await axios.get(`https://future-medical.herokuapp.com/entity/${hospitalname}/doctors`)
        const data = await res.data;
        console.log(data)
        if (data === 'this entity has no doctors right now') 
        {
         Get_Doctors__Deactivated_Api(token.entity.name,[])
         return }
        let i = 1 
        doctors_list=[];
        data.forEach((x) => {
                
                doctor.name = x.username;
                doctor.id = i;                
                doctor.Email = x.email;
                doctor.specialization = x.specialization;
                doctor.number = x.telephone[0];
                doctor.price = x.meeting_price;
                doctor.active = true;
                doctors_list.push(doctor);
                doctor={}
                ++i;
          });
        setdata(doctors_list);  
        Get_Doctors__Deactivated_Api(token.entity.name,doctors_list)
    } 
    catch (error) {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);}
    }
} 

const Get_Doctors__Deactivated_Api = async (hospitalname , activateList)=>{
  console.log(activateList)
 try {
        const res = await axios.get(`https://future-medical.herokuapp.com/admin/doctors/deactivated/${hospitalname}`,
        {
            headers: {
          'Authorization': `Bearer ${token.token}`
          }
        }
          )
        const data = await res.data;
        console.log(data)
        if (data === 'this entity has no deactivated doctors') 
        {return }
        let i = 0 ;
        if (activateList.length == 0){i = 1}
        else {i = (activateList[activateList.length-1].id) + 1}
        
        doctors_list=[];
        data.forEach((x) => {
                
                doctor.name = x.username;
                doctor.id = i;                
                doctor.Email = x.email;
                doctor.specialization = x.specialization;
                doctor.active = false 
                doctor.number = x.telephone[0];
                doctor.price = x.meeting_price;
                doctors_list.push(doctor);
                doctor={}
                ++i;
          });
          
        setdata(activateList.concat(doctors_list));  
    } 
    catch (error) {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);}
    }
} 

useEffect(()=>{
 Get_Doctors_Api(token.entity.name);
 
},[])  

const [viewedit,setedit]=useState(true) //WHEN FALSE SHOW COMPONENT ADD HOSPITAL 
    const [viewadd,setadd]=useState(true)  //WHEN FALSE SHOW COMPONENT EDIT HOSPITAL
    const [editdata,seteditdata]=useState({}); //EDITED DATA FOR HOSPITAL 

    const handleEdit = (props)=>{
        /*seteditdata(props); //DATA OF HOSPITAL
        console.log(props);
        setedit(false); //GO TO EDIT PAGE*/
        setModalShow(true)
        set_doctor_data(props)
  }
  
  const goback=()=>{
    setedit(true);
    setadd(true);
  }
  const changeedit = (editeddoctor)=>{
    //WHEN SUBMIT EDIT HOSPITAL FORM 
     var requiredid = editeddoctor.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editeddoctor); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     //setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO HOSPITALS LIST]
   //setModalShow(true)
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
   
   /*const handleDelete = (id)=>{
     //API DELETE Hospital
     console.log(id);
     setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }*/

     const handleDelete = (clicked_Doc)=>{
     //API DELETE Hospital
     //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    
     set_clicked_doc(clicked_Doc)
     console.log(clicked_Doc);
     set_alert_delete(true)
     //setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }

  const Close_Alert_yes = (clicked_Doc) =>{
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_delete(false)
     Dectivate_Doctor_Api(clicked_Doc.Email)
  }
   const Close_Alert_No = () =>{
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_delete(false)
  }

      const handleActive = (clicked_Item)=>{
     //API DELETE Hospital
     //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    
     set_clicked_doc(clicked_Item)
     console.log(clicked_Item);
     set_alert_active(true)
     //setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }

  const Close_Alert_yes_activate = (clicked_Item) =>{
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_active(false)
     Activate_Doctor_Api(clicked_Item.Email)
  }
   const Close_Alert_No_activate = () =>{
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_active(false)
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
    field: 'price',
    headerName: 'Meeting Price',
    
    width: 180,

  },
   {
      field: "action",
      headerName: "Action" ,
      width: 180,
      renderCell: (params) => {
        return (
          <>       
          {(params.row.active == false) && <Button variant="outline-success" style = {{marginLeft:'2rem'}}onClick={() => handleActive(params.row)}>Activate </Button>}
              {(params.row.active == true) && <Button variant="outline-primary" onClick={() => handleEdit(params.row)}>Edit price </Button>}
             {(params.row.active == true) &&<DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row)}
                                    
            />}
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
    {/*!viewedit && <Editdoctor editdata={editdata} changeedit={changeedit} goback={goback}/>*/}
    {!viewadd && <Adddoctor changeadd={changeadd} goback={goback} Get_Doctors_Api={Get_Doctors_Api} entityname={token.entity.name}/>}      
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{marginTop:'10px'}}>Add Doctor</Button>  }
     {alert_delete && <AlertDelete open={alert_delete} Close_Alert_No={Close_Alert_No} Close_Alert_yes={Close_Alert_yes} clicked_hos={clicked_doc} parent={"doctor"}></AlertDelete>}
     <EditModal show={modalShow} onHide={() => setModalShow(false)} Doctor={doctor_data}  Get_Doctors_Api={Get_Doctors_Api} Entity_Name={token.entity.name} 
                />
     {alert_active && <AlertActivate open={alert_active} Close_Alert_No_activate={Close_Alert_No_activate} Close_Alert_yes_activate={Close_Alert_yes_activate} clicked_item={clicked_doc} parent={"doctor"}></AlertActivate>}           
    </div>
    </div>
  )
}



export default DoctorsList