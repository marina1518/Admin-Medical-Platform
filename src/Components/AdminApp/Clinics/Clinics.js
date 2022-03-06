import  React,{useEffect} from 'react';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Table/Table';
import axios from 'axios';
import AddClinic from './AddClinic';
import EditClinic from './EditClinic';
export default function Clinics() {

const [data,setdata] = useState([]) //FROM API CLINICS LIST
var clinics_list = JSON.parse(JSON.stringify(data));
let clinic = {} ;
const Get_Clinics_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/clinics')
        const data = await res.data;
        data.forEach((x) => {
                console.log(x.name)
                clinic.clinicname = x.name; 
                clinic.id = x.admin.email;
                clinic.number = x.telephone[0];
                clinic.Admin = x.admin.username;
                clinic.Email = x.admin.email;
                clinic.Location = x.address;
                clinics_list.push(clinic);
                clinic={}
          });
        setdata(clinics_list);  
    } 
    catch (err) {
        console.error(err);
    }
}

    useEffect(()=>{
      //Get_Clinics_Api().then((res)=>{ setdata(res)}).catch((err)=>{console.log(err)})
      Get_Clinics_Api()      
    },[])
    
    const [viewedit,setedit]=useState(true) //WHEN FALSE SHOW COMPONENT EDIT CLINIC
    const [viewadd,setadd]=useState(true) //WHEN FALSE SHOW COMPONENT ADD CLINIC

    const [editdata,seteditdata]=useState({});
    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF CLINIC
        console.log(props);
        setedit(false); //GO TO EDIT PAGE 
    }

    const goback=()=>{
    setedit(true);
    setadd(true);
  }

  const changeedit = (editedclinic)=>{
    //WHEN SUBMIT EDIT CLINIC FORM 
     var requiredid = editedclinic.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editedclinic); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO CLINICS LIST]
  }
    const changeadd = (newclinic)=>{
       //WHEN SUBMIT ADD PHARMACY FORM 
       var updatedlist = JSON.parse(JSON.stringify(data));
       const lastid = updatedlist[updatedlist.length - 1].id;
       console.log(lastid);
       newclinic.id=(parseInt(lastid)+1).toString();
       updatedlist.push(newclinic);
       //Static update list       
       setdata(updatedlist);    
     setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO CLINICS LIST]
    
  }   
    
      const handleDelete = (id)=>{
        //API DELETE CLINIC
     setdata(data.filter((item) => item.id !== id)) //static delete
  }
  const columns = [

  {
    field: 'clinicname',
    headerName: 'Clinic Name',
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
    field: 'Admin',
    headerName: 'Admain Name',
    width: 190,
    editable: true,
  },
    {
    field: 'Email',
    headerName: 'Admain Email',
    width: 190,
    editable: true,
  },
  {
    field: 'Location',
    headerName: 'Location',
    editable: true,
    width: 220,

  },
   {
      field: "action",
      headerName: "Action" ,
      width: 150,
      renderCell: (params) => {
        return (
          <>       
              <Button variant="outline-primary" onClick={() => handleEdit(params.row)}>Edit</Button>
             <DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row.id)}
              
                        
            />
          </>
        );
      },
    }
];

  return (
    <div style={{ height: '75%', width: '100%' }}>
      {viewedit && viewadd &&<Table rows={data} columns={columns}></Table>}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Clinic</Button>  }
    {!viewedit && <EditClinic editdata={editdata} changeedit={changeedit}  goback={goback}/>}
    {!viewadd && <AddClinic changeadd={changeadd}  goback={goback}/>}
    </div>
  );
}
