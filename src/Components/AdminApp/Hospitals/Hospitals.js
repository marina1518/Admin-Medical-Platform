import  React,{useEffect} from 'react';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Table/Table';
import axios from 'axios'
import AddHospital from './AddHospital';
import EditHospitals from './EditHospitals';
import { useSelector } from 'react-redux';
import AlertDelete from "../AlertDelete/AlertDelete"

export default function Hospitals() {

 const token = JSON.parse(useSelector(state => state.auth)); //state of token  
const [data,setdata] = useState([]) //FROM API HOSPITALS LIST
const [alert_delete , set_alert_delete] = useState(false);
const [clicked_hos , set_clicked_hos] = useState({});
var hospitals_list = JSON.parse(JSON.stringify(data));
let hospital = {} ;


const Dectivate_Hospital_Api = async (hospital_name)=>{
 try {
        const res = await axios.patch('https://future-medical.herokuapp.com/admin/entity/deactivate',{
          name : hospital_name 
        },{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        Get_Hospitals_Api() ; //IT WILL GET THE ACTIVE HOSPITALS 
        console.log(data)
      }
    catch (err) {
        console.error(err);
    }
}
const Get_Hospitals_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/hospitals')
        const data = await res.data;
        let i = 1;
        hospitals_list = [];  
        data.forEach((x) => {
                console.log(x.name)
                hospital.Hospitalname = x.name;
                hospital.id =  i;
                hospital.number = x.telephone[0];
                hospital.Admin = x.admin.username;
                hospital.Email = x.admin.email;
                hospital.Location = x.address;
                hospitals_list.push(hospital);
                hospital={}
                ++i;
          });
        setdata(hospitals_list);  
    } 
    catch (err) {
        console.error(err);
    }
}

    /*const Get_Hospitals_Api = ()=>{
      return new Promise ((resolve,reject)=>{
      axios.get('https://future-medical.herokuapp.com/hospitals').then((res)=>{

            console.log(res.data)
            for(var i = 0 ; i < res.data.length ; i++ )
            {
                console.log(res.data[i].name)
                hospital.Hospitalname = res.data[i].name;
                hospital.id = res.data[i].name; //ID
                hospital.number = res.data[i].telephone[0];
                hospital.Admin = res.data[i].admin.username;
                hospital.Email = res.data[i].admin.email;
                hospital.Location = res.data[i].address;
                hospitals_list.push(hospital);
                hospital={}
                //setdata(hospitals_list);
            }
            resolve(hospitals_list);
            
            //console.log(hospitals_list)
            
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
      })

      
    }*/

    useEffect(()=>{
      //Get_Hospitals_Api().then((res)=>{ setdata(res)}).catch((err)=>{console.log(err)})  
       Get_Hospitals_Api()    
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
   
   const handleDelete = (clicked_Hos)=>{
     //API DELETE Hospital
     //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
     set_clicked_hos(clicked_Hos)
     console.log(clicked_Hos);
     set_alert_delete(true)
     //setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }

  const Close_Alert_yes = (clicked_Hos) =>{
    Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_delete(false)
  }
   const Close_Alert_No = () =>{
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
    set_alert_delete(false)
  }
  const columns = [
      {
    field: 'id',
    headerName: 'Number',
    width: 170,
    
  },
  {
    field: 'Hospitalname',
    headerName: 'Hospital Name',
    width: 220,
    
  },
  {
    field: 'number',
    headerName: 'Contact Number',
    width: 190,
   
  },
  {
    field: 'Admin',
    headerName: 'Admain Name',
    width: 190,
    
  },
    {
    field: 'Email',
    headerName: 'Admain Email',
    width: 190,
  
  },
  {
    field: 'Location',
    headerName: 'Location',
   
    width: 190,

  },
   {
      field: "action",
      headerName: "Action" ,
      width: 150,
      renderCell: (params) => {
        return (
          <>       
              {/*<Button variant="outline-primary" onClick={() => handleEdit(params.row)}>Edit</Button>*/}
             <DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row)}
                           
            />
          </>
        );
      },
    }
];

  return (
        <div>
     <div style={{ height: 540, width: '90%' , margin: '1rem 2rem' ,marginBottom:'60px' }}>
    {viewedit && viewadd && <Table rows={data} columns={columns}></Table>}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Hospital</Button>  }
    {!viewedit && <EditHospitals editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd &&  <AddHospital changeadd={changeadd} goback={goback} />} 
    {alert_delete && <AlertDelete open={alert_delete} Close_Alert_No={Close_Alert_No} Close_Alert_yes={Close_Alert_yes} clicked_hos={clicked_hos} parent={"hospital"}></AlertDelete>}
    </div>
    </div>
  );
}
