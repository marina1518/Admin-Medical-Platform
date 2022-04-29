import React from 'react'
import Slidebar from '../../Components/AdminApp/Sidebar/Sidebar'
import { useSelector } from 'react-redux';
import Piechart from '../../Components/AdminApp/Dashboard/piechart';
import Chart from '../../Components/AdminApp/Dashboard/chart';
import { data } from '../../Dummyvalues';
import { Clinic } from '../../Dummyvalues';
import { pharmacy } from '../../Dummyvalues';
import './AppAdmin.css'
import Hospitals from '../../Components/AdminApp/Hospitals/Hospitals';
import Clinics from '../../Components/AdminApp/Clinics/Clinics';
import Pharmacies from '../../Components/AdminApp/Pharmacies/Pharmacies';
import Announcemts from '../../Components/AdminApp/Announcments/Announcments';
function AppAdmin() {
  const chosencomp = useSelector(state => state.sidebarcomp)
   console.log(chosencomp);
const token = JSON.parse(useSelector(state => state.auth)); //state of token 
console.log(token)
  return (
   
         <div  style={{display:'flex' , margin:'0'}}>       
        <Slidebar/>
        <div className='otherpages'>
           { (chosencomp==='chart') && <Piechart/>}
          { (chosencomp==='chart') && <Chart data={data} dataKey={"Active Hospital profit"} title={"Hospital Analytics"}/>}
        { (chosencomp==='chart') &&  <Chart data={Clinic} dataKey={"Active Clinic profit"} title={"Clinic Analytics"}/>}
        { (chosencomp==='chart') && <Chart data={pharmacy} dataKey={"Active Pharmacy profit"} title={"Pharmacy Analytics"}/>}
        { (chosencomp==='hospitals') && <Hospitals/>}
        { (chosencomp==='clinics') && <Clinics/>}
        { (chosencomp==='pharmacies') && <Pharmacies/>}
        { (chosencomp==='announcments') && <Announcemts/>}
         </div>
         </div>
   
  )
}

export default AppAdmin