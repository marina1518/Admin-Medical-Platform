import sidebarstate_reducer from "./sidebarcomp";

import auth_reducer from "./islogged";
import profile_reducer from "./Profilesidebar";
import {combineReducers} from 'redux'

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   profile_reducer:profile_reducer,
   auth:auth_reducer
})

export default allreducers ;