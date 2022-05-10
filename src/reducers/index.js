import sidebarstate_reducer from "./sidebarcomp";
import meeting_reducer from "./meeting";
import auth_reducer from "./islogged";

import patient_reducer from './patient'
import {combineReducers} from 'redux';

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer,
  meeting_reducer:meeting_reducer,
  patient_reducer:patient_reducer

})

export default allreducers ;