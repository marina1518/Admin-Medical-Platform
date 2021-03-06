import React,{useState,useEffect} from 'react'
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
import Sidebarcomp from '../../Components/SideBarUi/Sidebarcomp';
import AppAppointments from '../../Components/AdminApp/Appointments/AppAppointments';
import AppOrders from '../../Components/AdminApp/Orders/AppOrders';
import Info from '../../Components/AdminApp/PersonalInfo/Info';
import { useNavigate } from 'react-router-dom';
import Barchart from '../../Components/AdminApp/Dashboard/Barchart';
import Customchart from '../../Components/AdminApp/Dashboard/Customchart'
import Complaints from '../../Components/AdminApp/Complaints/Complaints'
function AppAdmin() {
  
/*const [ locationKeys, setLocationKeys ] = useState([])
const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
  return history.listen(location => {
    if (history.action === 'PUSH') {
      setLocationKeys([ location.key ])
    }

    if (history.action === 'POP') {
      if (locationKeys[1] === location.key) {
        setLocationKeys(([ _, ...keys ]) => keys)

        // Handle forward event

      } else {
        setLocationKeys((keys) => [ location.key, ...keys ])

        // Handle back event
        console.log("Back done ")

      }
    }
  })
}, [ locationKeys, ])*/
const [pressed, setPressed] = React.useState(false)
const navigate = useNavigate();
  React.useEffect(() => {
    window.onpopstate = e => {
      setPressed(true)
      navigate("/appadmin")
    };
  });

  const chosencomp = useSelector(state => state.sidebarcomp)
   console.log(chosencomp);
const token = JSON.parse(useSelector(state => state.auth)); //state of token 
console.log(token)
  return (
   <>
         <div className="main-container">

          
          {<Sidebarcomp page="app"/>}
          <main>
        <div className="profile-container">
        <div className='otherpages'>
           { (chosencomp==='chart') && <Barchart/>}
          { (chosencomp==='chart') && <Customchart  title={"Hospital Analytics"} parent={"hospitals"}/> }
        { (chosencomp==='chart') &&  <Customchart   title={"Clinic Analytics"} parent={"clinics"}/>}
        { (chosencomp==='chart') && <Customchart   title={"Pharmacy Analytics"} parent={"pharmacies"}/>}
        { (chosencomp==='hospitals') && <Hospitals/>}
        { (chosencomp==='clinics') && <Clinics/>}
        { (chosencomp==='pharmacies') && <Pharmacies/>}
        { (chosencomp==='announcments') && <Announcemts/>}
        { (chosencomp==='appointments') && <AppAppointments/>}
        { (chosencomp==='orders') && <AppOrders/>}
        { (chosencomp==='info') && <Info/>}
        { (chosencomp==='complaints') && <Complaints/>} 
    
 
         </div>
         </div>
         </main>
         </div>
   </>
  )
}

export default AppAdmin