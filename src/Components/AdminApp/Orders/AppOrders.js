import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import Table from '../../Table/Table'
import { Button } from 'react-bootstrap';
import OrderDetails from './OrderDetails';
import OrderImage from './OrderImage'
function AppOrders() {
       const token = JSON.parse(useSelector(state => state.auth)) //state of token      
       console.log(token) 
 
var [data,setdata] = useState([]) //FROM API appointments LIST 
let click_order ={};
const [clicked_order , set_clicked_order]=useState({});
var orders_list = JSON.parse(JSON.stringify(data));
let order = {} ;

const [modalShow, setModalShow] = React.useState(false);

const handle_details = (props)=>{
console.log(props)
setModalShow(true)
click_order.phone = props.phone;
click_order.photo = props.photo ;
click_order.address = props.address;
console.log(click_order)
set_clicked_order(click_order);
//console.log(orders_list)
//const result = orders_list.filter(order => order.id == props.id );
//console.log(result)

}
const Orders_Api = async ()=>{
 try {
        const res = await axios.get('https://future-medical.herokuapp.com/admin/orders',
   {headers: {
          'Authorization': `Bearer ${token.token}`
          }})
        const data = await res.data;
        if (data === 'no orders available') 
        {return }
        let i = 1 ;
        data.forEach((x) => {
                
                 order.adminname = x.pharmacy.admin.username;
                 order.adminemail = x.pharmacy.admin.email;
                 order.entity = x.pharmacy.name;
                 order.id = i;          
                 order.photo = x.order_data.form ;
                 order.address = x.order_data.address ;
                 order.phone = x.order_data.phone ;      
                 order.date = x.order_data.Date ;
                 order.username = x.user.username;
                 order.useremail = x.user.email;
                 if (x.price == null){
                     order.price = "not detected yet" ;
                 }
                 else {order.price = x.price ;}
                 orders_list.push( order);
                 order={}
                ++i;
          });
        setdata( orders_list); 
        console.log(orders_list)     
    } 
    catch (error) {
            if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);}
        console.error(error);
    }
}
useEffect(()=>{Orders_Api()},[])
const columns = [

  {
    field: 'id',
    headerName: 'Number',
    width: 150,
  
  },
  {
    field: 'date',
    headerName: 'Order date',
    width: 190,
 
  },
   
      {
    field: 'entity',
    headerName: 'Pharmacy name',
    width: 190,
    
  },
  {
    field: 'adminname',
    headerName: 'admin name',
   
    width: 180,

  },
    {
    field: 'adminemail',
    headerName: 'admin email',
  
    width: 180,

  },
    {
    field: 'username',
    headerName: 'User name',
   
    width: 170,

  },
    {
    field: 'useremail',
    headerName: 'User email',
    
    width: 180,

  },
      {
    field: 'price',
    headerName: 'price ',
  
    width: 210,

  },
    {
      field: "action",
      headerName: "Details" ,
      width: 150,
      renderCell: (params) => {
        return (
          <>       
              {<Button variant="outline-primary" onClick={() => handle_details(params.row)}>Order Details</Button>}
             {/*<DeleteOutline htmlColor='red' style={{cursor:'pointer' , marginLeft:'30px'}} onClick={() => handleDelete(params.row.id)}*/}
               <OrderDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        pic ={clicked_order.photo}
        address={clicked_order.address}
        phone={clicked_order.phone}
      />
                        
           
          </>
        );
      },
    }

];
  return (     
          
    <div style={{ height: 560, width: '95%' , margin: '1rem 2rem' ,marginBottom:'60px' }}>
     { <Table rows={data} columns={columns}></Table> }
     </div>
  )
}

export default AppOrders