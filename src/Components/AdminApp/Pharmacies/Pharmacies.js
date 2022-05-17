import  React,{useEffect} from 'react';
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import Table from '../../Table/Table';
import axios from 'axios';
import AddPharmacy from './AddPharmacy';
import EditPharmacy from './EditPharmacy';
import { useSelector } from 'react-redux';
import AlertDelete from "../AlertDelete/AlertDelete"

export default function Pharmacies() {

     const token = JSON.parse(useSelector(state => state.auth)); //state of token  
    const [data,setdata] = useState([]) //FROM API PHARMACIES LIST 
    var pharmacies_list = JSON.parse(JSON.stringify(data));
    const [alert_delete , set_alert_delete] = useState(false);
    const [clicked_pharma , set_clicked_pharma] = useState({});
let pharmacy = {} ;

const Dectivate_Pharmacy_Api = async (hospital_name)=>{
 try {
        const res = await axios.patch('https://future-medical.herokuapp.com/admin/pharmcy/deactivate',{
          name : hospital_name 
        },{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        Get_Pharmacies_Api() ; //IT WILL GET THE ACTIVE Pharmacies
        console.log(data)
      }
    catch (err) {
        console.error(err);
    }
}
const Get_Pharmacies_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/pharmacies')
        const data = await res.data;
        let i = 1;
        pharmacies_list =[];
        data.forEach((x) => {
                console.log(x.name)
                pharmacy.pharmacyname = x.name;
                pharmacy.id = i;
                pharmacy.number = x.telephone[0];
                pharmacy.Admin = x.admin.username;
                pharmacy.Email = x.admin.email;
                pharmacy.Location = x.address;
                pharmacies_list.push(pharmacy);
                pharmacy={}
                ++i;
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
    const changeadd = (newhospital)=>{
      //WHEN SUBMIT ADD Pharmacy FORM 
      var lastid = 0 ; 
        var updatedlist = JSON.parse(JSON.stringify(data));
        if (updatedlist.length == 0){ lastid = 0} //To make the first has id = 1
        else{lastid = updatedlist[updatedlist.length - 1].id;}        
        console.log(lastid);
        newhospital.id=(parseInt(lastid)+1).toString();
        updatedlist.push(newhospital);
        //Static update list       
        setdata(updatedlist); 
        setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO PHARMACIES LIST]
  }     
    console.log(data)

   const handleDelete = (clicked_Pharmacy_row)=>{
     //API DELETE Hospital
     //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
     set_clicked_pharma(clicked_Pharmacy_row)
     console.log(clicked_Pharmacy_row);
     set_alert_delete(true)
     //setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }

  const Close_Alert_yes = (clicked_Pharmacy_row) =>{
    Dectivate_Pharmacy_Api(clicked_Pharmacy_row.pharmacyname);
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
    width: 220,
    
  },
  {
    field: 'pharmacyname',
    headerName: 'Pharmacy Name',
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
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Pharmacy</Button>  }
    {!viewedit && <EditPharmacy editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd && <AddPharmacy changeadd={changeadd}  goback={goback}/>}
    {alert_delete && <AlertDelete open={alert_delete} Close_Alert_No={Close_Alert_No} Close_Alert_yes={Close_Alert_yes} clicked_hos={clicked_pharma} parent={"pharmacy"}></AlertDelete>}
    </div>
    </div>
  );
}
