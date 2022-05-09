import sidebarstate_reducer from "./sidebarcomp";
import meeting_reducer from "./meeting";
import auth_reducer from "./islogged";
<<<<<<< HEAD
import patient_reducer from './patient'
import {combineReducers} from 'redux';

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer,
  meeting_reducer:meeting_reducer,
  patient_reducer:patient_reducer
=======
import profile_reducer from "./Profilesidebar";
import {combineReducers} from 'redux'

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   profile_reducer:profile_reducer,
   auth:auth_reducer
>>>>>>> b5b89da1d4c4750cf6fe5cf0635e8ab196b18f24
})

export default allreducers ;