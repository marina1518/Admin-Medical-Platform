export const hospitals = ()=>{
    return {type : "hospitals"} 
}

export const clinics = ()=>{
    return {type : "clinics"} 
}

export const chart = ()=>{
    return {type : "chart"} 
}

export const pharmacies = ()=>{
    return {type : "pharmacies"} 
}

export const announcments = ()=>{
    return {type : "announcments"} 
}
export const appointments = ()=>{
    return {type : "appointments"} 
}

export const orders = ()=>{
    return {type : "orders"} 
}

export const complaints = ()=>{
    return {type : "complaints"} 
}

export const info = ()=>{
    return {type : "info"} 
}
export const history = ()=>{
    return {type : "history"} 
}
export const prescription = ()=>{
    return {type : "prescription"} 
}
/*export const signin = (token,usertype)=>{
    return {type : "Signin" , token : token , usertype : usertype } 
}*/
export const signin = (state)=>{
    return {type : "Signin" , state : state } 
}

export const logout = ()=>{
    return {type : "logout"} 
}

//meeting room

export const channel_name = (state)=>{
    return {type : "channel_name", state:state} 
}
export const patient_details = (state)=>{
    return {type : "patient_details", state:state} 
}

export const join = ()=>{
    return {type : "join"} 
}
export const leave = ()=>{
    return {type : "leave"} 
}
/*********** ADMIN ENTITY */

export const entity_info = (state)=>{
    return {type : "entity_info", state:state} 
}
export const entity_appointments = (state)=>{
    return {type : "entity_appointments", state:state} 
}
export const entity_doctors = (state)=>{
    return {type : "entity_doctors", state:state} 
}   


///// DOCTOR PROFILE *///////// 

export const doctor_info = (state)=>{
    return {type : "doctor_info", state:state} 
}
export const doctor_review = (state)=>{
    return {type : "doctor_review", state:state} 
}
export const doctor_meeting = (state)=>{
    return {type : "doctor_meeting", state:state} 
}   
export const doctor_timetable = (state)=>{
    return {type : "doctor_timetable", state:state} 
} 


/********* Pharmacy Admin */
export const pharmacy_info = (state)=>{
    return {type : "pharmacy_info", state:state} 
}
export const orders_pharma = (state)=>{
    return {type : "orders_pharma", state:state} 
}
export const pending_orders_red = (state)=>{
    return {type : "pending_orders", state:state} 
}   
export const approved_orders = (state)=>{
    return {type : "approved_orders", state:state} 
} 
export const pharma_history = (state)=>{
    return {type : "pharma_history", state:state} 
} 

