import  React,{useEffect} from 'react';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Table/Table';
import axios from 'axios';
import AddPharmacy from './AddPharmacy';
import EditPharmacy from './EditPharmacy';

export default function Pharmacies() {

    const [data,setdata] = useState([]) //FROM API PHARMACIES LIST 
    var pharmacies_list = JSON.parse(JSON.stringify(data));
let pharmacy = {} ;

const Get_Pharmacies_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/pharmacies')
        const data = await res.data;
        data.forEach((x) => {
                console.log(x.name)
                pharmacy.pharmacyname = x.name;
                pharmacy.id = x.admin.email;
                pharmacy.number = x.telephone[0];
                pharmacy.Admin = x.admin.username;
                pharmacy.Email = x.admin.email;
                pharmacy.Location = x.address;
                pharmacies_list.push(pharmacy);
                pharmacy={}
          });
        setdata(pharmacies_list);  
    } 
    catch (err) {
        console.error(err);
    }
}
    /*const Get_Pharmacies_Api = ()=>{
      return new Promise ((resolve,reject)=>{
      axios.get('https://future-medical.herokuapp.com/pharmacies').then((res)=>{

            console.log(res.data)
            for(var i = 0 ; i < res.data.length ; i++ )
            {
                console.log(res.data[i].name)
               pharmacy.pharmacyname = res.data[i].name;
                pharmacy.id = res.data[i]._id;
                pharmacy.number = res.data[i].telephone[0];
                pharmacy.Admin = res.data[i].admin.username;
                pharmacy.Email = res.data[i].admin.email;
                pharmacy.Location = res.data[i].address;
                pharmacies_list.push(pharmacy);
                pharmacy={}
                //setdata(hospitals_list);
            }
            resolve(pharmacies_list);
            
            //console.log(hospitals_list)
            
      }).catch((err)=>{
        console.log(err)
        reject(err)
      })
      })

      
    }*/

    useEffect(()=>{
      //Get_Pharmacies_Api().then((res)=>{ setdata(res)}).catch((err)=>{console.log(err)})
      Get_Pharmacies_Api()      
    },[])

    const [viewedit,setedit]=useState(true) //WHEN FALSE SHOW COMPONENT EDIT PHARMACY
    const [viewadd,setadd]=useState(true) //WHEN FALSE SHOW COMPONENT ADD PHARMACY

    const [editdata,seteditdata]=useState({}); //EDITED DATA FOR PHARMACY 
    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF PHARMACY
        console.log(props);
        setedit(false); //GO TO EDIT PAGE
        
    }

     const goback=()=>{
    setedit(true);
    setadd(true);
  }
  const changeedit = (editedpharmacy)=>{
            //WHEN SUBMIT EDIT PHARMACY FORM 
     var requiredid = editedpharmacy.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editedpharmacy); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO PHARMACIES LIST]
     
  }
    const changeadd = (newpharmacy)=>{
       //WHEN SUBMIT ADD PHARMACY FORM 
       var updatedlist = JSON.parse(JSON.stringify(data));
       const lastid = updatedlist[updatedlist.length - 1].id;
       console.log(lastid);
       newpharmacy.id=(parseInt(lastid)+1).toString();
       updatedlist.push(newpharmacy);
       //Static update list       
       setdata(updatedlist);    
     setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO PHARMACIES LIST]
  }   
    console.log(data)
  const handleDelete = (id)=>{
        //API DELETE PHARMACY 
     setdata(data.filter((item) => item.id !== id)) //STATIC DELETE
  }
  const columns = [

  {
    field: 'pharmacyname',
    headerName: 'Pharmacy Name',
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
      {viewedit && viewadd && <Table rows={data} columns={columns}></Table>}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Pharmacy</Button>  }
    {!viewedit && <EditPharmacy editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd && <AddPharmacy changeadd={changeadd}  goback={goback}/>}
    </div>
  );
}
