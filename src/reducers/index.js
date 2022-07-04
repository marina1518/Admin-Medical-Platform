import sidebarstate_reducer from "./sidebarcomp";
import meeting_reducer from "./meeting";
import auth_reducer from "./islogged";

import patient_reducer from './patient'
import {combineReducers} from 'redux';
import Admin_Entity_reducer from './AdminEntity';
import Doctor_reducer from "./DoctorReducer";
import Pharmacy_reducer from "./PharmacyReducer";
import profile_reducer from './Profilesidebar';
import page_reducer from './page';
import timetable_reducer from './timetable'

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer,
    meeting_reducer:meeting_reducer,
    patient_reducer:patient_reducer,
    Admin_Entity_reducer:Admin_Entity_reducer,
    Doctor_reducer:Doctor_reducer,
    Pharmacy_reducer:Pharmacy_reducer,
    profile_reducer :profile_reducer,
    page_reducer : page_reducer ,
    timetable_reducer : timetable_reducer
})

export default allreducers ;