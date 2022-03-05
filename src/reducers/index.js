import sidebarstate_reducer from "./sidebarcomp";

import auth_reducer from "./islogged";

import {combineReducers} from 'redux'

const allreducers = combineReducers ({
   sidebarcomp:sidebarstate_reducer,
   auth:auth_reducer
})

export default allreducers ;