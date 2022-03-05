import React,{useState} from 'react'
import './Sidebar.css'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import DashboardIcon from '@material-ui/icons/Dashboard';

import {useSelector,useDispatch} from 'react-redux'
import { hospitals,clinics,announcments,pharmacies,chart } from '../../../actions'
export default function Slidebar() {

    const dispatch = useDispatch(); // to execute the action to change the state of sidebar comonent
    return (
        <div className='SIDEBAR'>
            
            <ul style={{padding:'0 25px' ,marginTop:'80px'}}>
                 <li className='item' onClick={()=>{dispatch(chart())}} >
                    <DashboardIcon htmlColor='#06a3da' />
                    Dashboard
                </li>
                <li className='item'  onClick={()=>{dispatch(hospitals())}}>
                    <LocalHospitalIcon htmlColor='#06a3da' />
                    Hospitals
                </li>
                <li className='item' onClick={()=>{dispatch(clinics())}}>
                    <LocalHospitalIcon htmlColor='#06a3da'/>
                    Clinics
                </li>
                <li className='item'onClick={()=>{dispatch(pharmacies())}}>
                    <LocalPharmacyIcon htmlColor='#06a3da' />
                   Pharmacies
                </li>
                
                 <li className='item' onClick={()=>{dispatch(announcments())}}>
                     <AnnouncementIcon htmlColor='#06a3da' />
                   Announcements
                </li>
            </ul>
        </div>
    )
}