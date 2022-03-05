import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Announcements } from '../../../Dummyvalues' ; 
import { useState } from 'react';
import { DeleteOutline } from "@material-ui/icons";
import { Button } from 'react-bootstrap';
import AddAnnouncment from './AddAnnouncment';
import EditAnnouncment from './EditAnnouncment';

export default function Announcemts() {
    const [data,setdata] = useState(Announcements) //FROM API Announcments LIST 

    const [viewedit,setedit]=useState(true)  //WHEN FALSE SHOW COMPONENT EDIT ANNOUNCMENT
    const [viewadd,setadd]=useState(true) //WHEN FALSE SHOW COMPONENT ADD ANNOUNCMENT

    const [editdata,seteditdata]=useState({}); 
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
       /* var updatedlist = JSON.parse(JSON.stringify(data));
        const lastid = updatedlist[updatedlist.length - 1].id;
        console.log(lastid);
        newannouncment.id=(parseInt(lastid)+1).toString();
        updatedlist.push(newannouncment);
        //Static update list       
        setdata(updatedlist); */
        setadd(true); //AFTER SUBMIT ADD FORM [GET BACK TO announcments LIST]   
    
  }   
    
      const handleDelete = (id)=>{
        //API DELETE ANNOUNCMENT
     setdata(data.filter((item) => item.id !== id)) //DELETE STATIC
  }
  const columns = [

  {
    field: 'announcmentname',
    headerName: 'Announcment Name',
    width: 220,
    editable: true,
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 250,
    editable: true,
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
             <DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row.id)}
              
                        
            />
          </>
        );
      },
    }
];

  return (
    <div style={{ height: '75%', width: '100%' }}>
      {viewedit && viewadd && <DataGrid rowHeight={250}
        rows={data}
        disableSelectionOnClick
        columns={columns} 
        pageSize={8}
        checkboxSelection
      />}
    {viewedit && viewadd &&<Button variant="primary" onClick={()=>{setadd(false)}} style={{margin:'15px'}}>Add Announcment</Button>  }
    {!viewedit && <EditAnnouncment editdata={editdata} changeedit={changeedit}/>}
    {!viewadd && <AddAnnouncment changeadd={changeadd}/>}
    </div>
  );
}

