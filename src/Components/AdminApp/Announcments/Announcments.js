import  React,{useEffect,useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Announcements } from '../../../Dummyvalues' ; 
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import AddAnnouncment from './AddAnnouncment';
import EditAnnouncment from './EditAnnouncment';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';
import AlertDelete from "../AlertDelete/AlertDelete"
import { logout } from '../../../actions';
import { Link, useNavigate } from "react-router-dom";

export default function Announcemts() {
      const navigate = useNavigate();
      const dispatch = useDispatch(); 
      const token = JSON.parse(useSelector(state => state.auth)); //state of token 
      //console.log(token)
    const [data,setdata] = useState([]) //FROM API Announcments LIST 
        const [alert_delete , set_alert_delete] = useState(false);
    const [clicked_announcment , set_clicked_announcment] = useState({});

    const [viewedit,setedit]=useState(true)  //WHEN FALSE SHOW COMPONENT EDIT ANNOUNCMENT
    const [viewadd,setadd]=useState(true) //WHEN FALSE SHOW COMPONENT ADD ANNOUNCMENT

    const [editdata,seteditdata]=useState({}); 
let announcments_list = [];
let announce = {};
const Get_Announcments_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/admin/getAnnouncements',{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        announcments_list=[];
        let i = 1;
        data.forEach((x) => {
                announce.announcmentname = x.announce.title;
                announce.id =  i;
                announce.Description = x.announce.description;
                announcments_list.push(announce);
                announce={}
                ++i;
          });
        setdata(announcments_list);  
    } 
    catch (err) {
        console.log(err);
                if (err.response) {
          console.log(err.response.data);
          if (err.response.data === "not authorized, token is failed") {
            dispatch(logout())
            navigate("/")
          }
    
    }
}
}
const Delete_Announcments_Api = async (title,id)=>{
 try {
       const res = await axios.delete('https://future-medical.herokuapp.com/admin/announcement/delete', {
  headers: {
   'Authorization': `Bearer ${token.token}`
      },
       data: {
              title: title 
        }
});
      
       
        const res_data = await res.data;
        console.log(res_data)
        
        Get_Announcments_Api(); //Call to get announcments again 
    } 
    catch (err) {
        console.error(err);
                 if (err.response) {
          console.log(err.response.data);
          if (err.response.data === "not authorized, token is failed") {
            dispatch(logout())
            navigate("/")
          }
    
    }
    }
}

useEffect(()=>{
  Get_Announcments_Api();
},[])

    const goback=()=>{
    setedit(true);
    setadd(true);
  }

    const handleEdit = (props)=>{
        seteditdata(props); //DATA OF ANNOUNCMENT
        console.log(props);
        setedit(false); //GO TO EDIT PAGE 
        
    }
  const changeedit = (editedannouncment)=>{
     //WHEN SUBMIT EDIT ANNOUNCMENT FORM 
     var requiredid = editedannouncment.id ;
     console.log(requiredid);
     var updatedlist = JSON.parse(JSON.stringify(data));
     updatedlist = updatedlist.filter((item) => item.id !== requiredid) //delete first
     //console.log(updatedlist);
     updatedlist.push(editedannouncment); //add edited one 
    // console.log(updatedlist);
     //Static update list       
     setdata(updatedlist); 
     setedit(true); //AFTER SUBMIT EDIT FORM [GET BACK TO announcments LIST]

  }
    const changeadd = (newannouncment)=>{
           //WHEN SUBMIT ADD HOSPITAL FORM 
        var updatedlist = JSON.parse(JSON.stringify(data));
        const lastid = updatedlist[updatedlist.length - 1].id;
        console.log(lastid);
        newannouncment.id=(parseInt(lastid)+1).toString();
        updatedlist.push(newannouncment);
        //Static update list       
        setdata(updatedlist); 
        setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO announcments LIST]   
    
  }   
    
      /*const handleDelete = (id)=>{
        //API DELETE ANNOUNCMENT
        console.log(id)
        let req = data.filter((item) => item.id === id)
        //console.log(req)
        //console.log(req[0].announcmentname)
        Delete_Announcments_Api(req[0].announcmentname,id);
     
  }*/
     const handleDelete = (clicked_Announce_row)=>{
     //API DELETE Hospital
     //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
     set_clicked_announcment(clicked_Announce_row)
     console.log(clicked_Announce_row);
     set_alert_delete(true)
     //setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }

  const Close_Alert_yes = (clicked_Announce_row) =>{
    let req = data.filter((item) => item.id === clicked_Announce_row.id)
    Delete_Announcments_Api(req[0].announcmentname,clicked_Announce_row.id);
    //Dectivate_Hospital_Api(clicked_Hos.Hospitalname);
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
    width: 140,
    
  },
  {
    field: 'announcmentname',
    headerName: 'Announcment Name',
    width: 200,
    
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 500,
    
  },
  /*{
    field: 'Image',
    headerName: 'Announcment Image',
    width: 250,
    editable: true,
    renderCell: (params) => {
        return (
          <div className="userListUser">
            <img style={{ }} src={params.row.Image} alt="" />
        </div>
        );
      },
  },*/
  
   {
      field: "action",
      headerName: "Action" ,
      width: 150,
      renderCell: (params) => {
        return (
          <>       
              <Button variant="outline-primary" onClick={() => handleEdit(params.row)}>Edit</Button>
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
      {viewedit && viewadd && <DataGrid 
        rows={data}
        disableSelectionOnClick
        columns={columns} 
        pageSize={8}
        
      />}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Announcment</Button>  }
    {!viewedit && <EditAnnouncment get_announcments ={Get_Announcments_Api} editdata={editdata} changeedit={changeedit} goback={goback}/>}
    {!viewadd && <AddAnnouncment changeadd={changeadd} goback={goback}/>}
    {alert_delete && <AlertDelete open={alert_delete} Close_Alert_No={Close_Alert_No} Close_Alert_yes={Close_Alert_yes} clicked_hos={clicked_announcment} parent={"announcment"}></AlertDelete>}
    </div>
    </div>
  );
}

