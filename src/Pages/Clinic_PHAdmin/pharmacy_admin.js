import React , {useEffect, useState} from "react";
import './profile.css';
import { Alert ,Button,ButtonGroup,ListGroup, Stack , Tab, Tabs, Accordion ,Col,Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MdOutlineDoneOutline,MdOutlineDone,MdCancel} from 'react-icons/md';
import Avatar from '@material-ui/core/Avatar';
import {useSelector,useDispatch} from 'react-redux'
import axios from "axios";

//import { Chart as ChartJS } from 'chart.js/auto';

import { Bar,Line, Pie, Chart } from "react-chartjs-2";


const Ph_admin =()=>{
    const token = JSON.parse(useSelector(state => state.auth));
    const [state,setstate] = useState(null);
    const [edit_photo,setEdit_photo]=useState(false);
    const orders =[
        {id:"1", username:"kk" , order:"- m , - g " },
        {id:"2",username:"jj" , order:"- k , - p " }
    ];
    const [neworders,setneworders]=useState(orders);
    var[phorder,setphorder]=useState([]);
    const[order2_details,setorder2_details]=useState([]);
    const[pending_orders,setpending_details]=useState([]);
    var order_list = JSON.parse(JSON.stringify(phorder));
    var order_details = {};
    console.log(token.token);
    const config = {headers: {
    
      'Authorization': `Bearer ${token.token}`}};
    const Get_orders_Api = async ()=>{
      try {
             const res = await axios.get(`https://future-medical.herokuapp.com/admin/orders/new`,config)
             const data = await res.data;
             console.log(data.order_data);
             data.forEach((x) => {
              order_details.form = x.order_data.form;
              order_details.Date = x.order_data.Date;
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.email = x.user.email;
              order_list.push(order_details); 
              console.log(order_details);   
              order_details={};   
            
              console.log(order_details);
               });
              setorder2_details(order_list); 
              
              Get_pending_Api();
              Get_approved_Api();
              Get_history_Api();
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
              order_details.Date = x.order_data.Date;
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.email = x.user.email;
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
              order_details.Date = x.order_data.Date;
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
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
              order_details.Date = x.order_data.Date;
              order_details.address = x.order_data.address;
              order_details.phone = x.order_data.phone;
              order_details.price = x.price;
              order_details.username = x.user.username;
              order_details.email = x.user.email;
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


//   const approved =[
//     {id:"1", username:"kk" , order:"- m , - g " },
//     {id:"2",username:"jj" , order:"- k , - p " }
// ];
//const [done_list,setdone]=useState(approved);
//var history=[];
//let [history,sethistory]=useState([]);
// const done=(e,id)=>{
//     const newp = done_list.filter((item)=> item.id !== id );
//     setdone(newp);

//     const newpp = done_list.filter((item)=> item.id === id );
   
   
//     for (let i = 0; i < newpp.length; i++) {
//      history.push(newpp[i])
//     }
//    sethistory(history);
//    }

   


  const labels= ['Jan','Feb','Mar','April','May','June','July','Aug','Sep', 'Oct','Nov','Dec'];

   const  data={
		labels: labels,
		  datasets: [{
			label: 'Price',
			data: [65, 59, 80, 81, 56, 55, 40,90,25,45,89,20],
			backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(0, 77, 64)',
        'rgb(210,129,64)',
        'rgb(183, 28, 28)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(73,95,117)',
        'rgb(54, 162, 235)',
        'rgb(106,62,115)',
        'rgb(153, 102, 255)',
        'rgb(144, 164, 174)',
        'rgb(0, 0, 0)'


			  
			],
			hoverOffset: 4
		  }, 
      {
        label: 'Quantity',
        data: [65, 59, 80, 81, 56, 55, 40,90,25,45,89,20],
        backgroundColor: [
         
			  'rgba(255, 99, 132, 0.5)',
        'rgba(0, 77, 64,0.5)',
        'rgba(210,129,64, 0.5)',
        'rgba(183, 28, 28,0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(73,95,117,0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(106,62,115,0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(144, 164, 174, 0.5)',
        'rgba(0, 0, 0, 0.5)'
          
        ],
        hoverOffset: 4
        }
    
    ]
	};
  // const order_api =() =>{
  //   Get_orders_Api();
  // }
  useEffect(()=>{
    /*Get_Admin_info().then((res)=>{console.log(res); setinfo(res)})   */
    Get_orders_Api();
    
    },[]) 
    const[price,setPrice]=useState("");
  const [report,setreport] = useState(false);
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
        <Tab eventKey="Orders" title="Orders" >
          {/* <Sonnet /> */}
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
           <br/>
           <Row>
           <Col>
            <input type="text" placeholder="Price" onChange={(e)=>{setPrice(e.event.target)}}/>
           </Col>
          <Col>
            <ButtonGroup>
              <Button variant="outline-success" className="col-md-12 text-right" onClick={(e)=>pending(e,item.id)}><MdOutlineDone/></Button>
              <Button variant="outline-danger" className="col-md-12 text-right" onClick={(e)=>remove(e,item.id)}><MdCancel/></Button>
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
                <h3>Price : {item.price}</h3>
               <br/>
             <Button variant="outline-success" className="col-md-12 text-right" >Done <MdOutlineDoneOutline/></Button>
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
                <h3>Price : {item.price}</h3>
               </Accordion.Body>
        </Accordion.Item>
       
                  )
              }


        <br/>

<Button variant="primary" onClick={(e)=>setreport(true)}>Get Report</Button>


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