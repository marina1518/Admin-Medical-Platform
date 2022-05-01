import React , {useEffect, useState} from "react";
import './profile.css';
import { Button,ButtonGroup, Stack , Tab, Tabs, Accordion ,Col,Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MdOutlineDoneOutline,MdOutlineDone,MdCancel} from 'react-icons/md';
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from 'react-redux'
import axios from "axios";
// import { Bar} from "react-chartjs-2";


const Ph_admin =()=>{
    const token = JSON.parse(useSelector(state => state.auth));
    const [state,setstate] = useState(null);
    const [edit_photo,setEdit_photo]=useState(false);
   
   // const [neworders,setneworders]=useState(orders);
    var[phorder,setphorder]=useState([]);
    const[order2_details,setorder2_details]=useState([]);
    const[pending_orders,setpending_details]=useState([]);
    var order_list = JSON.parse(JSON.stringify(phorder));
    var order_details = {};
    
    const config = {headers: {'Authorization': `Bearer ${token.token}`}};

    const Get_orders_Api = async ()=>{
      try {
             const res = await axios.get(`https://future-medical.herokuapp.com/admin/orders/new`, config)
             const data = await res.data;
             console.log(data);
             data.forEach((x) => {
              order_details.form = x.order_data.form;
              let b=x.order_data.Date.split("T")
              order_details.Date =b[0];
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.email = x.user.email;
              order_details.id = x._id;
              order_list.push(order_details); 
              console.log(order_details);   
              order_details={};   
              console.log(order_details);
               });
              setorder2_details(order_list); 
         } 
         catch (err) {
             console.error(err);
         }

     }
     const[phorder2,setphorder2]=useState([]);
     var order_list2 = JSON.parse(JSON.stringify(phorder2));
     order_details={};
     
     const Get_pending_Api = async ()=>{
      try {
             const res = await axios.get(`https://future-medical.herokuapp.com/admin/orders/pending`,config)
             const data = await res.data;
             console.log(order_list2);
             console.log(data);
              if(data == "there is no pending orders") 
             {return}
             data.forEach((x) => {
              order_details.form = x.order_data.form;
              let b=x.order_data.Date.split("T")
              order_details.Date =b[0];
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.email = x.user.email;
              order_details.id = x._id;
              order_list2.push(order_details); 
              console.log(order_details);   
              order_details={};   
              console.log(order_details);
               });
              setpending_details(order_list2);  
              console.log(pending_orders);
         } 
         catch (err) {
             console.error(err);
         }

     }
     const[approved,setapproved]=useState([]);
     const[phorder3,setphorder3]=useState([]);
     var order_list3 = JSON.parse(JSON.stringify(phorder3));
     order_details={};
     const Get_approved_Api = async ()=>{
      try {
             const res = await axios.get(`https://future-medical.herokuapp.com/admin/orders/approved`,config)
             const data = await res.data;
             console.log(order_list3);
             console.log(data);
              if(data == "there is no approved orders") 
             {return}
             data.forEach((x) => {
              order_details.form = x.order_data.form;
              let b=x.order_data.Date.split("T")
              order_details.Date =b[0];
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.id = x._id;
              order_details.email = x.user.email;
              order_list3.push(order_details); 
              console.log(order_details);   
              order_details={};   
              console.log(order_details);
               });
              setapproved(order_list3);  
              console.log(approved);
         } 
         catch (err) {
             console.error(err);
         }

     }

     const[history,sethistory]=useState([]);
     const[phorder4,setphorder4]=useState([]);
     var order_list4 = JSON.parse(JSON.stringify(phorder4));
     order_details={};
     const Get_history_Api = async ()=>{
      try {
             const res = await axios.get(`https://future-medical.herokuapp.com/admin/orders/history`,config)
             const data = await res.data;
             console.log(order_list4);
             console.log(data);
              if(data == "there is no delivered orders") 
             {return}
             data.forEach((x) => {
              order_details.form = x.order_data.form;
              let b=x.order_data.Date.split("T")
              order_details.Date =b[0];
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.email = x.user.email;
              order_details.id = x._id;
              order_list3.push(order_details); 
              console.log(order_details);   
              order_details={};   
              console.log(order_details);
               });
              sethistory(order_list4);  
              console.log(history);
         } 
         catch (err) {
             console.error(err);
         }

     }
 
  useEffect(()=>{
    Get_orders_Api();
    Get_approved_Api();
    Get_history_Api();
    Get_pending_Api();
    
    },[]) 

    const[price,setPrice]=useState("");
 
  const [report,setreport] = useState(false);
const [approve_data, setapprove_data] = useState("");
const [done_id, setdone_id] = useState("");
const [comment, setComment] = useState("")
  const Approve_api = async ()=>{
    try {
           const res = await axios.patch(`https://future-medical.herokuapp.com/admin/order/approve`, approve_data, config )
           const data = await res.data;
           console.log(data);
            
           
            
       } 
       catch (err) {
           console.error(err);
       }

   }

   const Done_Api = async ()=>{
    try {
           const res = await axios.patch(`https://future-medical.herokuapp.com/admin/order/done`, done_id, config )
           const data = await res.data;
           console.log(data);  
       } 
       catch (err) {
           console.error(err);
       }

   }
   const disapprove_order = async (e,id)=>{
    try {
           const res = await axios.patch(`https://future-medical.herokuapp.com/admin/order/disapprove`, {id:id}, config )
           const data = await res.data;
           console.log(data);
           alert('Order disapproved');
           var new_orders=[];
           for(var i=0;i<order2_details.length;i++)
           {
             if(order2_details[i].id !== id) new_orders.push(order2_details[i]);
           }
           console.log(new_orders);
           setorder2_details(new_orders);
           console.log(order2_details);
       } 
       catch (err) {
           console.error(err);
       }

   }
  const approve=(e,id)=>{
 
    const o={id:id, price:price}; //comment 
   
    setapprove_data(o);
    console.log(approve_data)
   Approve_api();
  }

  const Done=(e,id)=>{
    const o={id:id};
    setdone_id(o);
    Done_Api();
  }
    return(

        <div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
             
          <div className="card-header bg-transparent text-center">
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
        defaultActiveKey="Orders"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Orders" title="Orders" >
          {(order2_details.length === 0) ?  "No Notifications":
          <Accordion defaultActiveKey="0" flush>
          {
                  order2_details.map((item)=>
                 
        <Accordion.Item eventKey={item}>
            <Accordion.Header> 
            <Col>{item.username} </Col>
            <Col>{item.Date} </Col>
            </Accordion.Header>
            <Accordion.Body>
           
           <img src={item.form} width="300px" height="300px"/>
           <h3>Address : {item.address}</h3>
           <h3>Phone : {item.phone}</h3>
           <h3>Email : {item.email}</h3>
           <br/>
           <Row>
           <Col>
            <input type="text" placeholder="Price" onChange={(e)=>{setPrice(parseFloat(e.target.value))}}/>
            <input type="text" placeholder="Comment" onChange={(e)=>{setComment(e.target.value)}}/>
           </Col>
          <Col>
            <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>approve(e,item.id)} ><MdOutlineDone/></Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>disapprove_order(e,item.id)}><MdCancel/></Button>
            </ButtonGroup>
          </Col>
          </Row>
            </Accordion.Body>
        </Accordion.Item>
       
                  )
              }
               </Accordion>
}


        </Tab>
        <Tab eventKey="Pending Orders" title="Pending Orders">
          {/* <Sonnet /> */}
             {(pending_orders.length === 0) ?  "No Pending Orders":
             <Accordion defaultActiveKey="0" flush>
             {
                     pending_orders.map((item)=>

                       
                       <Accordion.Item eventKey={item}>
               <Accordion.Header> 
            <Col>{item.username} </Col>
            <Col>{item.Date} </Col>
            </Accordion.Header>
               <Accordion.Body>
               <img src={item.form} width="300px" height="300px"/>
                <h3>Address : {item.address}</h3>
                <h3>Phone : {item.phone}</h3>
                <h3>Email : {item.email}</h3>
                <h3>Price : {item.price} LE</h3>
               </Accordion.Body>
             
           </Accordion.Item>
             )
            }
          
                  </Accordion>
               
            }
         

        </Tab>

         <Tab eventKey="Approved Orders" title="Approved Orders">
          {/* <Sonnet /> */}
          {(approved.length === 0) ?  "No Orders":
          <Accordion defaultActiveKey="0" flush>
             {
                    approved.map((item)=>
                    
            <Accordion.Item eventKey={item}>
               <Accordion.Header> 
            <Col>{item.username} </Col>
            <Col>{item.Date} </Col>
            </Accordion.Header>
            <Accordion.Body>
               <img src={item.form} width="300px" height="300px"/>
                <h3>Address : {item.address}</h3>
                <h3>Phone : {item.phone}</h3>
                <h3>Email : {item.email}</h3>
                <h3>Price : {item.price} LE</h3>

               <br/>
             <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>Done(e,item.id)} >Done <MdOutlineDoneOutline/></Button>
               </Accordion.Body>
           </Accordion.Item>
          
                     )
                 }
                  </Accordion>
}

        </Tab> 


        <Tab eventKey="History" title="History">
          {/* <Sonnet /> */}
          {(history.length === 0) ?  "No History":
          <Accordion defaultActiveKey="0" flush>
          {
                  history.map((item)=>
                 
        <Accordion.Item eventKey={item}>
             <Accordion.Header> 
            <Col>{item.username} </Col>
            <Col>{item.Date} </Col>
            </Accordion.Header>
            <Accordion.Body>
               <img src={item.form} width="300px" height="300px"/>
                <h3>Address : {item.address}</h3>
                <h3>Phone : {item.phone}</h3>
                <h3>Email : {item.email}</h3>
                <h3>Price : {item.price} LE</h3>
               </Accordion.Body>
        </Accordion.Item>
       
                  )
              }


        <br/>

{/* <Button variant="primary" onClick={(e)=>setreport(true)}>Get Report</Button> */}

{/* 
{
  report ? 
  <Stack gap={3} className="p-2"> 
			<div className="bg-light border rounded-md border-gray-400 max-w-screen-md  p-4 chart" id="rep1">
			<h1 className="text-center text-3xl p-2 text-blue-900 font-bold">Monthly Report</h1>
			<Bar className="bg-white"
			title="Monthly Report" 
			
			data={data}
			
			
			></Bar>
		
			
				</div>
				</Stack> :""
} */}

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