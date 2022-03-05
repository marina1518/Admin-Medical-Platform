import React from 'react'
import Chart from "react-google-charts";
import { Card } from 'react-bootstrap';
import './piechart.css'
export default function Piechart() {
    return (
        
          <Card className='PIE' >
            <div   >
          <h3 style={{color:'#06a3da',fontSize:'20px'}}> Application Contacts</h3>
          
   <Chart 
  width={'400px'}
  height={'300px'}
  
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Number'],
    ['Hospitals', 40],
    ['Clinics', 50],
    ['Pharmacy', 20],
    
  ]}
  
  rootProps={{ 'data-testid': '1' }}
/>

</div>

        
        </Card>

    )
}
