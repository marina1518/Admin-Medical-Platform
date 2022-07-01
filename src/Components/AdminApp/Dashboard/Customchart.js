import React from 'react'
import { useState, useEffect } from 'react';
import Chart from "react-google-charts";
import { Container , Row , Col ,Card , Alert ,Form , Button} from 'react-bootstrap'
import axios, * as others from 'axios';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
} from "recharts";
import './chart.css'

function generateRandomColor(Colors_list) {
    console.log("color_list",Colors_list);
  var letters = '0123456789ABCDEF';
  var color = '#';
  var flag = true ;
  while (flag){
    flag = false ;
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  for (var i = 0 ; i < Colors_list.length ; i++)
  {
    if (color === Colors_list[i])
    {
        flag = true;
        break ;
    }
  }
}
  return color;
}



export default function Customchart(props) {

 const token = JSON.parse(useSelector(state => state.auth)); //state of token 

 const [data1,setdata1]=useState([]);
 const [show,setshow]=useState(false);
 const [no_profit_flag,set_no_profit]=useState(false);
 let hospitals_list = [];
 let clinics_list = [];
 let pharmacies_list = [];
 let color_list = [];
 let col = "";
 let temp_list = [];
   let start = new Date;
   let end = new Date ;

 const Profit_hospitals_Api = async ()=>{
    start = FormValues.startdate;
    end = FormValues.enddate;
    console.log("start date" , start);
    console.log("end date" , end);

 try {
        const res = await axios.get(`https://future-medical.herokuapp.com/admin/dashboard/profit/${start}/${end}`,{
          headers: {
          'Authorization': `Bearer ${token.token}`
          }
        })
        const data = await res.data;
        console.log(data);
        
        //console.log(hospitals)
        clinics_list.push([
             'Element',
             'Profit',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ]);

        pharmacies_list.push([
             'Element',
             'Profit',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ]);

        hospitals_list.push([
             'Element',
             'Profit',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ]);
        for(let x in data.hospitals){            
            col = generateRandomColor(color_list);
            color_list.push(col)
            temp_list=[x,data.hospitals[x],col,null];         
            console.log("temp list", temp_list )
            hospitals_list.push(temp_list);
            temp_list=[]
            col=""
            
        }
        color_list=[];
         for(let x in data.clinics){
            col = generateRandomColor(color_list);
            color_list.push(col)
            temp_list=[x,data.clinics[x],col,null];
         
            console.log("temp list", temp_list )
            clinics_list.push(temp_list);
            temp_list=[]
            col =""
        }
        color_list=[];
          for(let x in data.pharmacies){
             col = generateRandomColor(color_list);
            color_list.push(col)
            temp_list=[x,data.pharmacies[x],col,null];
         
            console.log("temp list", temp_list )
            pharmacies_list.push(temp_list);
            temp_list=[]
            col=""
        }
        color_list=[];
        //['Women', 24, generateRandomColor(), null]
        console.log("hospitals_list",hospitals_list)

        if (props.parent === "hospitals" )
        {
          setdata1(hospitals_list)
          if(hospitals_list.length>1){
            setshow(true);
          }
          else {
            set_no_profit(true)
          }
        }
        else if (props.parent === "clinics")
        {
             setdata1(clinics_list)
            if(clinics_list.length>1){
            setshow(true);
          }
           else {
            set_no_profit(true)
          }
        }
        else if (props.parent === "pharmacies")
        {
             setdata1(pharmacies_list)
                if(pharmacies_list.length>1){
            setshow(true);
          }
           else {
            set_no_profit(true)
          }
        }
        
    } 
    catch (err) {
        console.error(err);
    }
}
const [FormValues,setFormvalues]= useState({});
const [issubmit,setissubmit]= useState(false);
const [Formerrors,setFormerrors]= useState({});
const handlechange = (e)=>{
         console.log(e.target)
         //const { name , value} = e.target;
         const name = e.target.name ;
         const value = e.target.value ;
         console.log(value);
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
         }
         set_no_profit(false); //in change the date 
         setshow(false); //in change the date  
        // console.log(FormValues);
    }
    function validate (values)
    {
        const errors = {};
        

        if (!values.startdate)
            {
                errors.startdate="start date is required!";  
            }
        
        if (!values.enddate)
            {
                errors.enddate="end date is required!";  
            }
         
        return errors ;
    }    
const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        //setshow(true)
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            //POST
             Profit_hospitals_Api()  
        }
      }


/*useEffect(()=>{
    Profit_hospitals_Api();
},[])*/

    return(
       <Card className="chart">
        <div>
        <h3 className="chartTitle">{props.title}</h3>
        
          <Form onSubmit={submithandle} className="rounded p-4" style={{width:'50%' , margin:'0 25%'}}>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Start date</Form.Label>
      <Form.Control type='date' name='startdate'  value={FormValues.startdate} onChange={handlechange}/>
      <p style={{padding:'0',color:'red' , marginTop:'6px'}} >{Formerrors.startdate}</p> 
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>End date </Form.Label>
      <Form.Control type='date' name='enddate' value={FormValues.enddate} onChange={handlechange}/>
      <p style={{padding:'0',color:'red', marginTop:'6px'}} >{Formerrors.enddate}</p>     
    </Form.Group>
  </Row>

  <Button style={{marginLeft:'27%' , marginTop:'15px' , width:'40%'}} variant="primary" type="submit">
   Show
  </Button>
</Form>
     
     { no_profit_flag && <p style={{fontSize:'25px'}}>No profit in this period</p>}
     { show && <Chart style={{marginBottom:'100px'}}
  width={'500px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={data1}
  options={{
    title: `Profit of ${props.parent}`,
    width: 900,
    height: 400,
    scales: {
            y: {
                beginAtZero: true
            } },
    bar: { groupWidth: '60%' },
    legend: { position: 'none' },
  }}
/>}

  </div>
  
      </Card>
    )
}