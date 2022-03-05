import React , {useState} from "react";
import './profile.css';
import { Alert ,Button,ButtonGroup,ListGroup, Stack , Tab, Tabs, Accordion} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MdOutlineDoneOutline,MdOutlineDone,MdCancel} from 'react-icons/md';
import Avatar from '@material-ui/core/Avatar';

const Ph_admin =()=>{
   
    const [state,setstate] = useState(null);
    const [edit_photo,setEdit_photo]=useState(false);
    const orders =[
        {id:"1", username:"kk" , order:"- m , - g " },
        {id:"2",username:"jj" , order:"- k , - p " }
    ];
    const [neworders,setneworders]=useState(orders);
   
  // console.log(neworders);
   const remove=(e,id)=>{
    const newp = neworders.filter((item)=> item.id !== id );
    setneworders(newp);
   }

   let [app_orders,setapp_orders]=useState([]);
 //  const [new_app_orders,setnew_app_orders]=useState(app_orders);
  
   const pending=(e,id)=>{
     
       const newp = orders.filter((item)=> item.id === id );
      
       //const order = app_orders.push(newp);
      //app_orders.push(newp);
    //  console.log(newp);
      //app_orders.push({id:"1",username:"kk",order:"hh"});
      for (let i = 0; i < newp.length; i++) {
       app_orders.push(newp[i])
      }
      //app_orders = [...app_orders, [... newp]]
        setapp_orders(app_orders);
        remove(e,id);
     //  setnew_app_orders(app_orders);
       
    
   };
   console.log(app_orders);
  // console.log(new_app_orders);


  const approved =[
    {id:"1", username:"kk" , order:"- m , - g " },
    {id:"2",username:"jj" , order:"- k , - p " }
];
const [done_list,setdone]=useState(approved);
const done=(e,id)=>{
    const newp = done_list.filter((item)=> item.id !== id );
    setdone(newp);
   }
   //console.log(done_list);

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
           <Avatar className="profile_img" src="/broken-image.jpg" onClick={(e)=>setEdit_photo(true)} />
           {edit_photo ? <input type="file"></input>:""}
         
            
          
            <h3>Pharmacy </h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Email: </strong>gh</p>
            
            
          </div>
          </div>
          
      </div>
     

      <br/>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Pharmacy </h3>  
            {/* <Button variant="outline-secondary">Secondary</Button> 
            <svg data-testid="EditIcon"></svg>
            */}
            <br/>
              
        <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Orders" title="Orders">
          {/* <Sonnet /> */}
          {(neworders.length === 0) ?  "No Notifications":
          <Accordion defaultActiveKey="0" flush>
          {
                  neworders.map((item)=>
                 
        <Accordion.Item eventKey={item}>
            <Accordion.Header> {item.username}</Accordion.Header>
            <Accordion.Body>
           {item.order}
           <br/>
            <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>pending(e,item.id)}><MdOutlineDone/></Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>remove(e,item.id)}><MdCancel/></Button>
              </ButtonGroup>
            </Accordion.Body>
        </Accordion.Item>
       
                  )
              }
               </Accordion>
}


        </Tab>
        <Tab eventKey="Pending Orders" title="Pending Orders">
          {/* <Sonnet /> */}
             {(app_orders.length === 0) ?  "No Pending Orders":
             <Accordion defaultActiveKey="0" flush>
             {
                     app_orders.map((item)=>

                       
                       <Accordion.Item eventKey={item}>
               <Accordion.Header> {item.username}</Accordion.Header>
               <Accordion.Body>
              {item.order}
             
               </Accordion.Body>
             
           </Accordion.Item>
             )
            }
          
                  </Accordion>
               
            }
         

        </Tab>

        <Tab eventKey="Approved Orders" title="Approved Orders">
          {/* <Sonnet /> */}
          {(done_list.length === 0) ?  "No Orders":
          <Accordion defaultActiveKey="0" flush>
             {
                     done_list.map((item)=>
                    
           <Accordion.Item eventKey={item}>
               <Accordion.Header> {item.username}</Accordion.Header>
               <Accordion.Body>
              {item.order}
             <br/>
             <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>done(e,item.id)}>Done <MdOutlineDoneOutline/></Button>
               </Accordion.Body>
           </Accordion.Item>
          
                     )
                 }
                  </Accordion>
}

        </Tab>
       
      </Tabs>

          </div>
         
        </div>
        
      </div>
    </div>
  </div>
</div>

    )
}
export default Ph_admin;